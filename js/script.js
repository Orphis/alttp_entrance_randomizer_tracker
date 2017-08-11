Set.prototype.difference = function (setB) {
  const difference = new Set(this);
  for (const elem of setB) {
    difference.delete(elem);
  }
  return difference;
};

$(() => {
  class State {
    constructor() {
      this.state = {
        showUseless: true,
        locations: [],
      };
    }

    get showUseless() {
      return this.state.showUseless;
    }

    set showUseless(value) {
      this.state.showUseless = value;
    }

    get locations() {
      return this.state.locations;
    }

    reset() {
      this.state.locations = [];
    }

    findLocation(door) {
      return this.state.locations.find(item => item.door === door);
    }

    addLocation(door, cave, exit) {
      if (this.findLocation(door)) return;

      this.state.locations.push({
        door,
        cave,
        exit,
        time: Date.now(),
      });
    }

    removeLocation(location) {
      this.state.locations = this.state.locations.filter(item => item.door !== location);
    }

    load() {
      try {
        const savedState = window.localStorage.getItem('state');
        if (savedState) this.state = JSON.parse(savedState);
      } catch (e) {
        window.localStorage.removeItem('state');
      }
    }

    save() {
      window.localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  class Tracker {
    constructor(state) {
      this.state = state;
      this.doorLocations = window.doorLocations;
      this.caves = window.caves;
      this.ui = {
        addLocationInputDoor: $('#add_location_text_door'),
        addLocationInputCave: $('#add_location_text_cave'),
        addLocationButtonClear: $('#add_location_clear'),
        addLocationForm: $('#add_location_form'),
        resetButton: $('#reset_tracker'),

        tableLocations: $('#locations_table'),
        tableLocationsDT: null,
        tableUnvisitedLocations: $('#unvisited_doors_table'),
        tableUnvisitedLocationsDT: null,
        tableUnvisitedCaves: $('#unvisited_caves_table'),
        tableUnvisitedCavesDT: null,

        mapLW: $('#lw_map'),
        mapDW: $('#dw_map'),
      };

      this.initForm();
      this.initTables();
      this.initMap();
    }

    initForm() {
      this.ui.addLocationInputDoor.autocomplete({
        source: [],
        minLength: 0,
      });
      this.ui.addLocationInputDoor.click((event) => {
        $(event.target).autocomplete('search', event.target.value);
      });

      this.ui.addLocationInputCave.autocomplete({
        source: Object.keys(this.caves).filter(item => item !== 'Useless').sort(),
        minLength: 0,
      });
      this.ui.addLocationInputCave.click((event) => {
        $(event.target).autocomplete('search', event.target.value);
      });

      this.ui.addLocationForm.submit((event) => {
        const textDoor = this.ui.addLocationInputDoor.val();
        const textCave = this.ui.addLocationInputCave.val();
        this.state.addLocation(textDoor, textCave, textDoor);
        this.refreshList();
        this.clearForm();
        event.preventDefault();
      });
      this.ui.addLocationButtonClear.click(() => {
        this.clearForm();
      });
      this.ui.resetButton.click(() => {
        this.state.reset();
        this.refreshList();
      });
    }

    clearForm() {
      this.ui.addLocationInputDoor.val('');
      this.ui.addLocationInputCave.val('');
      this.ui.addLocationInputDoor.focus();
    }

    initTables() {
      this.ui.tableLocations.on('click', 'a.editor_remove', (event) => {
        event.preventDefault();
        const tr = $(event.currentTarget).closest('tr')[0];
        const td = tr.firstChild;
        const s = td.textContent;
        this.state.removeLocation(s);
        this.refreshList();
      });
      this.ui.tableLocations.find('tbody').on('click', 'tr', (event) => {
        const tr = event.currentTarget;
        const td = tr.firstChild;
        const s = td.textContent;

        for (const location of this.state.locations) {
          if (location.door === s) {
            location.marked = $(event.currentTarget).hasClass('selected');
            $(event.currentTarget).toggleClass('selected');
            break;
          }
        }
        this.state.save();
      });

      this.ui.tableLocationsDT = this.ui.tableLocations.DataTable({
        paging: false,
        info: false,
        columns: [
          { data: 'door' },
          { data: 'cave' },
          { data: 'exit' },
          {
            data: 'time',
            render(data) {
              return new Date(data).toLocaleTimeString();
            },
          },
          {
            data: null,
            orderable: false,
            className: 'center',
            defaultContent:
              '<a href="" class="editor_remove"><span class="glyphicon glyphicon-remove"></a>',
          },
        ],
        buttons: [
          {
            text: 'Hide Useless',
            action: function toggleUseless() {
              this.state.showUseless = !this.state.showUseless;
              this.refreshList();
            }.bind(this),
            init(dt, node) {
              node.attr('data-toggle', 'button');
            },
          },
        ],
        rowCallback: function rowCallback(row, data) {
          if (data.marked) $(row).addClass('selected');
        },
      });
      this.ui.tableLocationsDT
        .buttons()
        .container()
        .appendTo('#locations_table_wrapper .col-sm-6:eq(0)');

      this.ui.tableUnvisitedLocations.on('click', 'a.editor_useless', (event) => {
        event.preventDefault();
        const tr = $(event.target).closest('tr')[0];
        const td = tr.firstChild;
        const s = td.textContent;
        this.state.addLocation(s, 'Useless', s);
        this.refreshList();
      });
      this.ui.tableUnvisitedLocationsDT = this.ui.tableUnvisitedLocations.DataTable({
        paging: false,
        info: false,
        columns: [
          { data: 'name' },
          { data: 'region' },
          {
            data: null,
            orderable: false,
            className: 'center',
            defaultContent:
              '<a href="" class="editor_useless text-nowrap"><span title="Mark Useless" class="glyphicon glyphicon-remove"></span></a>',
          },
          {
            data: 'tag',
            visible: false,
            searchable: true,
          },
        ],
      });
      this.ui.tableUnvisitedCavesDT = this.ui.tableUnvisitedCaves.DataTable({
        paging: false,
        info: false,
        columns: [{ data: 'name' }, { data: 'count' }],
      });
    }

    initMap() {
      for (const [name, door] of Object.entries(this.doorLocations)) {
        if (door.x) {
          const mapDiv = door.tag.indexOf('lw') !== -1 ? this.ui.mapLW : this.ui.mapDW;
          const rect = Tracker.createSVGRect('large');
          rect.css('left', door.x);
          rect.css('top', door.y);
          rect.data('location', name);
          rect.mouseup((event) => {
            const s = $(event.currentTarget).data('location');
            const wasDone = $(event.currentTarget).hasClass('done');

            console.log(`Clicked on: ${s}`);
            if (wasDone) {
              $(event.currentTarget).removeClass('done');
              this.state.removeLocation(s);
            } else {
              $(event.currentTarget).addClass('done');
              this.state.addLocation(s, 'Useless', s);
            }
            this.refreshList();
          });
          if (this.state.findLocation(name)) {
            rect.addClass('done');
          }
          door.rect = mapDiv;
          mapDiv.append(rect);
        }
      }
    }

    refreshList() {
      const allDoors = new Set();
      for (const name of Object.keys(this.doorLocations)) {
        allDoors.add(name);
      }
      const foundDoor = new Set();

      const allCaves = new Set();
      for (const name of Object.keys(this.caves)) {
        if (name !== 'Useless') allCaves.add(name);
      }
      const foundCaves = new Set();
      allCaves.delete(this.caves[0]);

      const locationsArray = [];
      for (const item of this.state.locations) {
        foundDoor.add(item.door);
        foundCaves.add(item.cave);
        if (this.state.showUseless || item.cave !== 'Useless') {
          locationsArray.push(item);
        }
      }
      this.ui.tableLocationsDT.clear();
      this.ui.tableLocationsDT.rows.add(locationsArray);
      this.ui.tableLocationsDT.rows().invalidate().draw();

      // Update the unvisited doors model
      const unvisitedDoors = allDoors.difference(foundDoor);
      const unvisitedDoorsArray = [];
      for (const item of unvisitedDoors) {
        const location = this.doorLocations[item];
        unvisitedDoorsArray.push({
          name: item,
          region: location.region,
          tag: location.tag,
        });
      }
      this.ui.tableUnvisitedLocationsDT.clear();
      this.ui.tableUnvisitedLocationsDT.rows.add(unvisitedDoorsArray);
      this.ui.tableUnvisitedLocationsDT.rows().invalidate().draw();
      this.ui.addLocationInputDoor.autocomplete(
        'option',
        'source',
        Array.from(unvisitedDoors).sort(),
      );

      // Update the unvisited caves model
      const unvisitedCaves = allCaves.difference(foundCaves);
      const unvisitedCavesArray = [];
      for (const item of unvisitedCaves) {
        unvisitedCavesArray.push({
          name: item,
          count: this.caves[item].count,
        });
      }
      this.ui.tableUnvisitedCavesDT.clear();
      this.ui.tableUnvisitedCavesDT.rows.add(unvisitedCavesArray);
      this.ui.tableUnvisitedCavesDT.rows().invalidate().draw();

      this.state.save();
    }

    static createSVGRect(className) {
      const div = $(document.createElement('div'));
      div.addClass('location');
      if (className) div.addClass(className);

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rectElement.setAttribute('width', '100%');
      rectElement.setAttribute('height', '100%');

      svgElement.appendChild(rectElement);
      div.append(svgElement);

      return div;
    }
  }

  const state = new State();
  state.load();

  const tracker = new Tracker(state);
  tracker.refreshList();
});
