"use strict";

Set.prototype.difference = function(setB) {
  let difference = new Set(this);
  for (let elem of setB) {
    difference.delete(elem);
  }
  return difference;
};

$(function() {
  var state = {
    showUseless: true,
    locations: []
  };

  var global = {
    doorLocations: window.doorLocations,
    caves: window.caves,
    ui: {
      addLocationInputDoor: $("#add_location_text_door"),
      addLocationInputCave: $("#add_location_text_cave"),
      addLocationButtonClear: $("#add_location_clear"),
      addLocationForm: $("#add_location_form"),
      resetButton: $("reset_tracker"),

      tableLocations: $("#locations_table"),
      tableLocationsDT: null,
      tableUnvisitedLocations: $("#unvisited_doors_table"),
      tableUnvisitedLocationsDT: null,
      tableUnvisitedCaves: $("#unvisited_caves_table"),
      tableUnvisitedCavesDT: null,

      mapLW: $("#lw_map"),
      mapDW: $("#dw_map")
    }
  };

  const initForm = function initForm() {
    global.ui.addLocationInputDoor.autocomplete({
      source: [],
      minLength: 0
    });
    global.ui.addLocationInputDoor.click(event => {
      $(event.target).autocomplete("search", event.target.value);
    });

    global.ui.addLocationInputCave.autocomplete({
      source: Object.keys(global.caves)
        .filter(function(item) {
          return item != "Useless";
        })
        .sort(),
      minLength: 0
    });
    global.ui.addLocationInputCave.click(function(item) {
      $(this).autocomplete("search", this.value);
    });

    global.ui.addLocationForm.submit(function(event) {
      let text_door = global.ui.addLocationInputDoor.val();
      let text_cave = global.ui.addLocationInputCave.val();
      state.locations.push({
        door: text_door,
        cave: text_cave,
        exit: text_door,
        time: Date.now()
      });
      refreshList();
      clearForm();
      event.preventDefault();
    });
    global.ui.addLocationButtonClear.click(function(event) {
      clearForm();
    });
    global.ui.resetButton.click(function(event) {
      state.locations = [];
      refreshList();
    });
  };

  function clearForm() {
    global.ui.addLocationInputDoor.val("");
    global.ui.addLocationInputCave.val("");
    global.ui.addLocationInputDoor.focus();
  }

  function initTables() {
    global.ui.tableLocations.on("click", "a.editor_remove", function(e) {
      e.preventDefault();
      let tr = $(this).closest("tr")[0];
      let td = tr.firstChild;
      let s = td.textContent;
      state.locations = state.locations.filter(function(item) {
        return item.door != s;
      });
      refreshList();
    });
    global.ui.tableLocations.find("tbody").on("click", "tr", function() {
      let tr = $(this).closest("tr")[0];
      let td = tr.firstChild;
      let s = td.textContent;

      for (let location of state.locations) {
        if (location.door == s) {
          location.marked = $(this).hasClass("selected");
          $(this).toggleClass("selected");
          break;
        }
      }
      saveState();
    });

    global.ui.tableLocationsDT = global.ui.tableLocations.DataTable({
      paging: false,
      info: false,
      columns: [
        { data: "door" },
        { data: "cave" },
        { data: "exit" },
        {
          data: "time",
          render: function(data, type, full, meta) {
            return new Date(data).toLocaleTimeString();
          }
        },
        {
          data: null,
          orderable: false,
          className: "center",
          defaultContent:
            '<a href="" class="editor_remove"><span class="glyphicon glyphicon-remove"></a>'
        }
      ],
      buttons: [
        {
          text: "Hide Useless",
          action: function(dt) {
            state.showUseless = !state.showUseless;
            refreshList();
          },
          init: function(dt, node, config) {
            node.attr("data-toggle", "button");
          }
        }
      ],
      rowCallback: function(row, data) {
        for (let location of state.locations) {
          if (location.door == data.door) {
            if (location.marked) $(row).addClass("selected");
            break;
          }
        }
      }
    });
    global.ui.tableLocationsDT
      .buttons()
      .container()
      .appendTo("#locations_table_wrapper .col-sm-6:eq(0)");

    global.ui.tableUnvisitedLocations.on("click", "a.editor_useless", function(
      e
    ) {
      e.preventDefault();
      let tr = $(this).closest("tr")[0];
      let td = tr.firstChild;
      let s = td.textContent;
      state.locations.push({
        door: s,
        cave: "Useless",
        exit: s,
        time: Date.now()
      });
      refreshList();
    });
    global.ui.tableUnvisitedLocationsDT = global.ui.tableUnvisitedLocations.DataTable(
      {
        paging: false,
        info: false,
        columns: [
          { data: "name" },
          { data: "region" },
          {
            data: null,
            orderable: false,
            className: "center",
            defaultContent:
              '<a href="" class="editor_useless text-nowrap"><span title="Mark Useless" class="glyphicon glyphicon-remove"></span></a>'
          },
          {
            data: "tag",
            visible: false,
            searchable: true
          }
        ]
      }
    );
    global.ui.tableUnvisitedCavesDT = global.ui.tableUnvisitedCaves.DataTable({
      paging: false,
      info: false,
      columns: [{ data: "name" }, { data: "count" }]
    });
  }

  function initMap() {
    for (let [name, door] of Object.entries(global.doorLocations)) {
      if (door.x) {
        console.log("Creating door for " + name);
        let map_div =
          door.tag.indexOf("lw") !== -1 ? global.ui.mapLW : global.ui.mapDW;
        let rect = createSVGRect("large");
        rect.css("left", door.x);
        rect.css("top", door.y);
        rect.data("location", name);
        rect.mouseup(function(item) {
          let s = $(this).data("location");
          let isDone = $(this).hasClass("done");
          $(this).toggleClass("done");
          console.log("Clicked on: " + s);
          state.locations.push({
            door: s,
            cave: "Useless",
            exit: s,
            time: Date.now()
          });
          refreshList();
        });
        door.rect = map_div;
        map_div.append(rect);
      }
    }
  }

  function refreshList() {
    let all_doors = new Set();
    for (let name of Object.keys(global.doorLocations)) {
      all_doors.add(name);
    }
    let found_door = new Set();

    let all_caves = new Set();
    for (let name of Object.keys(global.caves)) {
      if (name != "Useless") all_caves.add(name);
    }
    let found_caves = new Set();
    all_caves.delete(global.caves[0]);

    let locations_array = [];
    for (let item of state.locations) {
      found_door.add(item.door);
      found_caves.add(item.cave);
      if (state.showUseless || item.cave != "Useless") {
        locations_array.push({
          door: item.door,
          cave: item.cave,
          exit: item.exit,
          time: item.time
        });
      }
    }
    global.ui.tableLocationsDT.clear();
    global.ui.tableLocationsDT.rows.add(locations_array);
    global.ui.tableLocationsDT.rows().invalidate().draw();

    // Update the unvisited doors model
    let unvisited_doors = all_doors.difference(found_door);
    let unvisited_doors_array = [];
    for (let item of unvisited_doors) {
      let location = global.doorLocations[item];
      unvisited_doors_array.push({
        name: item,
        region: location.region,
        tag: "tag" in location ? location.tag : ""
      });
    }
    global.ui.tableUnvisitedLocationsDT.clear();
    global.ui.tableUnvisitedLocationsDT.rows.add(unvisited_doors_array);
    global.ui.tableUnvisitedLocationsDT.rows().invalidate().draw();
    global.ui.addLocationInputDoor.autocomplete(
      "option",
      "source",
      Array.from(unvisited_doors).sort()
    );

    // Update the unvisited caves model
    let unvisited_caves = all_caves.difference(found_caves);
    let unvisited_caves_array = [];
    for (let item of unvisited_caves) {
      unvisited_caves_array.push({
        name: item,
        count: global.caves[item].count
      });
    }
    global.ui.tableUnvisitedCavesDT.clear();
    global.ui.tableUnvisitedCavesDT.rows.add(unvisited_caves_array);
    global.ui.tableUnvisitedCavesDT.rows().invalidate().draw();

    saveState();
  }

  function loadState() {
    try {
      let savedState = window.localStorage.getItem("state");
      if (savedState) state = JSON.parse(savedState);
    } catch (e) {
      window.localStorage.removeItem("state");
    }
  }

  function saveState() {
    window.localStorage.setItem("state", JSON.stringify(state));
  }

  function createSVGRect(className) {
    let div = $(document.createElement("div"));
    div.addClass("location");
    if (className) div.addClass(className);

    let svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    let rectElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rectElement.setAttribute("width", "100%");
    rectElement.setAttribute("height", "100%");

    svgElement.appendChild(rectElement);
    div.append(svgElement);

    return div;
  }

  loadState();
  initForm();
  initTables();
  initMap();
  refreshList();
});
