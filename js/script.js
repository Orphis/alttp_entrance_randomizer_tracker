Set.prototype.difference = function(setB) {
  let difference = new Set(this);
  for (let elem of setB) {
    difference.delete(elem);
  }
  return difference;
}

$(function() {
  local_storage = window.localStorage;
  let locations = [];
  try {
    let saved_locations = local_storage.getItem("locations");
    if(saved_locations)
      locations = JSON.parse(saved_locations);
  } catch(e) {
    local_storage.removeItem("locations");
  }

  var config = {
    show_useless: true,
  };

  let randomizer_mode = "normal";
  let door_locations = window.door_locations;
  let caves = window.caves;

  $("#add_location_text_door").autocomplete({
    source: [],
    minLength: 0,
  });
  $("#add_location_text_door").click(function(item) {
    $(this).autocomplete("search", this.value);
  });

  $("#add_location_text_cave").autocomplete({
    source: Object.keys(caves).filter(function(item) { return item != "Useless"; }).sort(),
    minLength: 0,
  });
  $("#add_location_text_cave").click(function(item) {
    $(this).autocomplete("search", this.value);
  });

  $("#add_location_form").submit(function(event) {
    let text_door = $("#add_location_text_door").val();
    let text_cave = $("#add_location_text_cave").val();
    locations.push({
      "door": text_door,
      "cave": text_cave,
      "exit": text_door,
      "time": Date.now(),
    });
    refreshList();
    $("#add_location_text_door").val("");
    $("#add_location_text_cave").val("");
    $("#add_location_text_door").focus();
    event.preventDefault();
  });
  $("#add_location_clear").click(function(event) {
    $("#add_location_text_door").val("");
    $("#add_location_text_cave").val("");
    $("#add_location_text_door").focus();
  });
  $("#reset_tracker").click(function(event) {
    locations = [];
    refreshList();
  });

  $('#locations_table').on('click', 'a.editor_remove', function (e) {
    e.preventDefault();
    let tr = $(this).closest('tr')[0];
    let td = tr.firstChild;
    s = td.textContent;
    locations = locations.filter(function(item) {
      return item.door != s;
    });
    refreshList();
  });
  $('#locations_table tbody').on( 'click', 'tr', function () {
    $(this).toggleClass('selected');
    let tr = $(this).closest('tr')[0];
    let td = tr.firstChild;
    s = td.textContent;

    for(let location of locations) {
      if(location.door == s) {
        location.marked = $(this).hasClass('selected');
      }
    }
    saveState();
  });

  let locations_table = $('#locations_table').DataTable({
    paging: false,
    info: false,
    columns: [
      { "data": "door"},
      { "data": "cave"},
      { "data": "exit"},
      {
        "data": "time",
        "render": function (data, type, full, meta) {
          return new Date(data).toLocaleTimeString();
        },
      },
      {
        data: null,
        orderable: false,
        className: "center",
        defaultContent: '<a href="" class="editor_remove"><span class="glyphicon glyphicon-remove"></a>'
      },
    ],
    buttons: [
      {
        "text": "Hide Useless",
        "action": function(dt) {
          config.show_useless = !config.show_useless;
          refreshList();
        },
        "init": function(dt, node, config) {
          node.attr("data-toggle", "button");
        },
      },
    ],
    rowCallback: function(row, data) {
      for(let location of locations) {
        if(location.door == data.door) {
          if(location.marked)
            $(row).addClass('selected');
          break;
        }
      }
    },
  });
  locations_table.buttons().container()
    .appendTo('#locations_table_wrapper .col-sm-6:eq(0)');

  $('#unvisited_doors_table').on('click', 'a.editor_useless', function (e) {
    e.preventDefault();
    let tr = $(this).closest('tr')[0];
    let td = tr.firstChild;
    let s = td.textContent;
    locations.push({
      "door": s,
      "cave": "Useless",
      "exit": s,
      "time": Date.now(),
    });
    refreshList();
  });
  $('#unvisited_doors_table').DataTable({
    paging: false,
    info: false,
    columns: [
      { "data": "name"},
      { "data": "region"},
      {
        data: null,
        orderable: false,
        className: "center",
        defaultContent: '<a href="" class="editor_useless text-nowrap"><span title="Mark Useless" class="glyphicon glyphicon-remove"></span></a>'
      },
      {
        "data": "tag",
        "visible": false,
        "searchable": true,
      }
    ],
  });
  $('#unvisited_caves_table').DataTable({
    paging: false,
    info: false,
    columns: [
      { "data": "name"},
      { "data": "count"},
    ],
  });

  let lw_map = $("#lw_map");
  let dw_map = $("#dw_map");

  for(let [name, door] of Object.entries(door_locations)) {
    if(door.x) {
      console.log("Creating door for " + name);
      map_div = door.tag.indexOf("lw") !== -1 ? lw_map : dw_map;
      rect = createSVGRect("large");
      rect.css("left", door.x);
      rect.css("top", door.y);
      rect.data("location", name);
      rect.mouseup(function(item) {
        let s = $(this).data("location")
        $(this).addClass("done");
        console.log("Clicked on: " + s);
        locations.push({
          "door": s,
          "cave": "Useless",
          "exit": s,
          "time": Date.now(),
        });
        refreshList();
      });
      door.rect = map_div;
      map_div.append(rect);
    }
  }

  function refreshList() {
    let locations_table = $("#locations_table").dataTable().api();
    let unvisited_doors_table = $("#unvisited_doors_table").dataTable().api();
    let unvisited_caves_table = $("#unvisited_caves_table").dataTable().api();

    let all_doors = new Set();
    for(let name of Object.keys(door_locations)) {
      all_doors.add(name);
    }
    let found_door = new Set();

    let all_caves = new Set();
    for(let name of Object.keys(caves)) {
      if(name != "Useless")
        all_caves.add(name);
    }
    let found_caves = new Set();
    all_caves.delete(caves[0]);

    let locations_array = [];
    for(let item of locations) {
      found_door.add(item.door);
      found_caves.add(item.cave);
      if(config.show_useless || item.cave != "Useless") {
        locations_array.push({
          "door": item.door,
          "cave": item.cave,
          "exit": item.exit,
          "time": item.time,
        });
      }
    }
    locations_table.clear();
    locations_table.rows.add(locations_array);
    locations_table.rows().invalidate().draw();

    // Update the unvisited doors model
    let unvisited_doors = all_doors.difference(found_door);
    let unvisited_doors_array = [];
    for(let item of unvisited_doors) {
      let location = door_locations[item];
      unvisited_doors_array.push({
        "name": item,
        "region": location.region,
        "tag": "tag" in location ? location.tag : "",
      });
    }
    unvisited_doors_table.clear();
    unvisited_doors_table.rows.add(unvisited_doors_array);
    unvisited_doors_table.rows().invalidate().draw();
    $("#add_location_text_door").autocomplete("option", "source", Array.from(unvisited_doors).sort());

    // Update the unvisited caves model
    let unvisited_caves = all_caves.difference(found_caves);
    let unvisited_caves_array = [];
    for(let item of unvisited_caves) {
      unvisited_caves_array.push({
        "name": item,
        "count": caves[item].count,
      });
    }
    unvisited_caves_table.clear();
    unvisited_caves_table.rows.add(unvisited_caves_array);
    unvisited_caves_table.rows().invalidate().draw();

    saveState();
  }

  function saveState() {
    local_storage.setItem("locations", JSON.stringify(locations));
  }

  function createSVGRect(className) {
    let div = $(document.createElement("div"));
    div.addClass("location");
    if(className)
      div.addClass(className);

    let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("width", "100%");
    rectElement.setAttribute("height", "100%");

    svgElement.appendChild(rectElement);
    div.append(svgElement);

    return div;
  }

  refreshList();
});
