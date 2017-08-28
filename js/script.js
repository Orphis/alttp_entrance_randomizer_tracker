$(() => {
  const setDifference = function setDifference(A, B) {
    const difference = new Set(A);
    for (const elem of B) {
      difference.delete(elem);
    }
    return difference;
  };

  class State {
    constructor() {
      this.state = {
        showUseless: true,
        showMaps: false,
        locations: [],
      };
      this.listeners = [];
    }

    get showUseless() {
      return this.state.showUseless;
    }

    set showUseless(value) {
      this.state.showUseless = value;
      this.save();
    }

    get showMaps() {
      return this.state.showMaps;
    }

    set showMaps(value) {
      this.state.showMaps = value;
      this.save();
    }

    get locations() {
      return this.state.locations;
    }

    reset() {
      const oldLocations = this.state.locations;
      this.state.locations = [];
      for (const location of oldLocations) {
        this.triggerLocationChanged(location.door, 'delete');
      }
      this.save();
    }

    findLocation(door) {
      return this.state.locations.find(item => item.door === door);
    }

    addLocation(door, cave, exit, isDone, annotation) {
      const location = this.findLocation(door);
      if (location) return location;

      this.state.locations.push({
        door,
        cave,
        exit,
        time: Date.now(),
        isDone,
        annotation,
      });
      this.triggerLocationChanged(door, 'add');
      return this.state.locations[this.state.locations.length - 1];
    }

    removeLocation(location) {
      this.state.locations = this.state.locations.filter(item => item.door !== location);
      this.triggerLocationChanged(location, 'delete');
    }

    doLocation(locationName, value) {
      const location = this.findLocation(locationName);
      if (!location) return;
      location.isDone = value;

      this.triggerLocationChanged(location.door, 'done');
    }

    annotateLocation(locationName, value) {
      const location = this.findLocation(locationName);
      if (location) location.annotation = value;
      console.log(`Annotate location ${locationName} ${value}`);
      this.triggerLocationChanged(location.door, 'annotate');
    }

    addOnLocationChanged(listener) {
      this.listeners.push(listener);
    }

    triggerLocationChanged(locationName, what) {
      const location = this.findLocation(locationName);

      for (const listener of this.listeners) {
        listener({
          location: locationName,
          what,
          value: location,
        });
      }
    }

    load() {
      try {
        const savedState = window.localStorage.getItem('state');
        if (savedState) {
          const newState = JSON.parse(savedState);
          this.state.showUseless = newState.showUseless;
          this.state.showMaps = newState.showMaps;
          this.state.locations = newState.locations;
        }
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
      this.doorLocations = {};
      for (const name of Object.keys(window.doorLocations)) {
        this.doorLocations[name] = window.doorLocations[name];
      }
      for (const name of Object.keys(window.overworldLocations)) {
        this.doorLocations[name] = window.overworldLocations[name];
      }
      this.caves = window.caves;
      this.ui = {
        addLocationInputDoor: $('#add_location_text_door'),
        addLocationInputCave: $('#add_location_text_cave'),
        addLocationButtonClear: $('#add_location_clear'),
        addLocationForm: $('#add_location_form'),
        resetButton: $('#reset_tracker'),
        enableMapsButton: $('#enable_maps'),

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

      this.state.addOnLocationChanged(() => {
        this.state.save();
      });
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
        this.state.addLocation(textDoor, textCave, textDoor, true);
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
        const locationName = td.textContent;

        const location = this.state.findLocation(locationName);
        if (location.annotation) {
          this.state.annotateLocation(locationName, null);
        } else {
          this.state.annotateLocation(locationName, 'Marked');
        }

        if (location.annotation) $(event.currentTarget).addClass('selected');
        else $(event.currentTarget).removeClass('selected');
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
          if (data.annotation) $(row).addClass('selected');
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
        this.state.addLocation(s, 'Useless', s, true);
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

    refreshMapsVisibility() {
      if (this.state.showMaps) {
        this.ui.mapLW.removeClass('hidden');
        this.ui.mapDW.removeClass('hidden');
      } else {
        this.ui.mapLW.addClass('hidden');
        this.ui.mapDW.addClass('hidden');
      }
    }

    initMap() {
      this.ui.enableMapsButton.click(() => {
        this.state.showMaps = !this.state.showMaps;
        this.refreshMapsVisibility();
      });

      if (this.state.showMaps) {
        this.ui.enableMapsButton.button('toggle');
      }
      this.refreshMapsVisibility();
      this.ui.mapLW.resizable({ aspectRatio: 1, alsoResize: '.resizable' });
      this.ui.mapDW.resizable({ aspectRatio: 1, alsoResize: '.resizable' });

      this.ui.mapLW.mousemove((event) => {
        let x = (event.pageX - this.ui.mapLW.offset().left) / this.ui.mapLW.width();
        let y = (event.pageY - this.ui.mapLW.offset().top) / this.ui.mapLW.height();
        x = (x * 100).toFixed(2);
        y = (y * 100).toFixed(2);
        $('#lw_coord').text(`(${x}, ${y})`);
      });
      this.ui.mapDW.mousemove((event) => {
        let x = (event.pageX - this.ui.mapDW.offset().left) / this.ui.mapDW.width();
        let y = (event.pageY - this.ui.mapDW.offset().top) / this.ui.mapDW.height();
        x = (x * 100).toFixed(2);
        y = (y * 100).toFixed(2);
        $('#dw_coord').text(`(${x}, ${y})`);
      });

      for (const [name, door] of Object.entries(this.doorLocations)) {
        if (!door.x || !door.y) {
          console.log(`Location "${name}" is missing coordinates`);
          continue;
        }

        const mapDiv = door.tag.indexOf('lw') !== -1 ? this.ui.mapLW : this.ui.mapDW;
        let rectSize = 'small';
        if (door.tag.indexOf('large') !== -1) rectSize = 'large';
        else if (door.tag.indexOf('small') !== -1) rectSize = 'small';
        const rect = Tracker.createSVGRect(rectSize);
        rect.css('left', door.x);
        rect.css('top', door.y);
        rect.data('location', name);
        rect.click((event) => {
          event.preventDefault();

          const locationName = $(event.currentTarget).data('location');
          console.log(`Clicked on: ${locationName}`);
          let location = this.state.findLocation(locationName);

          if (!location) {
            location = this.state.addLocation(locationName, 'Useless', locationName, false);
          }

          if (location.isDone && !location.annotation) {
            this.state.removeLocation(locationName);
            location = null;
          } else this.state.doLocation(locationName, !location.isDone);
          Tracker.refreshRect($(event.currentTarget), location);
          this.refreshList();
        });
        rect.contextmenu((event) => {
          event.preventDefault();

          const locationName = $(event.currentTarget).data('location');
          let location = this.state.findLocation(locationName);
          if (!location) {
            location = this.state.addLocation(locationName, 'Something?', locationName, false);
          }
          if (location.annotation) {
            if (location.isDone) {
              this.state.annotateLocation(locationName, null);
            } else {
              this.state.removeLocation(locationName);
            }
          } else {
            this.state.annotateLocation(locationName, 'Marked');
          }

          this.refreshList();
        });

        const location = this.state.findLocation(name);
        if (location) {
          Tracker.refreshRect(rect, location);
        }

        this.state.addOnLocationChanged(
          function locationChangedEvent(event) {
            const dataLocation = this.data('location');
            console.log(`Rect ${dataLocation} saw a change for ${event.location} ${event.what}`);
            if (event.location !== dataLocation) {
              return;
            }
            console.log(`Update rect ${dataLocation}`);
            Tracker.refreshRect(this, event.value);
          }.bind(rect),
        );

        door.rect = mapDiv;
        mapDiv.append(rect);
      }
    }

    static refreshRect(rect, location) {
      if (!location) {
        rect.removeClass('marked');
        rect.removeClass('done');
        return;
      }

      if (location.annotation) rect.addClass('marked');
      else rect.removeClass('marked');
      if (location.isDone) rect.addClass('done');
      else rect.removeClass('done');
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
      const unvisitedDoors = setDifference(allDoors, foundDoor);
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
      const unvisitedCaves = setDifference(allCaves, foundCaves);
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
