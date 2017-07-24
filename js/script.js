Set.prototype.difference = function(setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

$( function() {
  var locations = [{
    "door": "Link's house",
    "cave": "Link's house",
    "exit": "Link's house exit"
  }];

  var randomizer_mode = "normal";

  var door_locations = [
    "none",
    "Forest chest game",
    "Thief's hideout drop",
    "Thief's hideout door",
    "Lumberjack cave drop",
    "Lumberjack cave door",
    "Lumberjack house",
    "Death Mountain Door front",
    "Death Mountain Door back",
    "Death Mountain Exit front",
    "Death Mountain Exit back",
  ];

  var caves = [
    "Link's house",
    "None",
    "Thief's hideout",
    "Death mountain door"
  ]

  $("#add_location_text_door").autocomplete({
    source: door_locations,
    minLength: 0,
  });

  $("#add_location_text_cave").autocomplete({
    source: caves,
    minLength: 0,
  });

  $( "#add_location_form" ).submit(function(event) {
    var text_door = $("#add_location_text_door").val();
    var text_cave = $("#add_location_text_cave").val();
    locations.push({
      "door": text_door,
      "cave": text_cave,
      "exit": "Foobar",
    });
    refreshList();
    event.preventDefault();
  });

  function refreshList() {
    var location_table = $("#location_table").children("tbody");
    var unvisited_doors_table = $("#unvisited_doors_table").children("tbody");
    location_table.empty();
    unvisited_doors_table.empty();

    var all_doors = new Set(door_locations);
    all_doors.delete("none");
    var found_door = new Set();


    locations.forEach(function(item) {
      found_door.add(item.door);

      location_table.append($('<tr>')
        .append($('<td>').text(item.door))
        .append($('<td>').text(item.cave))
        .append($('<td>').text(item.exit))
      );
    });

    var unvisited_doors = all_doors.difference(found_door);
    unvisited_doors.forEach(function(item) {
      unvisited_doors_table.append($('<tr>')
        .append($('<td>').text(item))
      );
    });
  }
});
