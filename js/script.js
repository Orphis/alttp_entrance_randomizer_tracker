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
        mode: 'item',
        locations: [],
        items: {},
        mapHeight: -1,
      };
      this.locationListeners = [];
      this.itemListeners = [];
    }

    get mode() {
      return this.state.mode;
    }

    set mode(value) {
      this.state.mode = value;
      this.save();
    }

    get showUseless() {
      return this.state.showUseless;
    }

    set showUseless(value) {
      this.state.showUseless = value;
      this.save();
    }

    get locations() {
      return this.state.locations;
    }

    get mapHeight() {
      return this.state.mapHeight;
    }

    set mapHeight(value) {
      this.state.mapHeight = value;
      this.save();
    }

    reset() {
      const oldItems = this.state.items;
      this.state.items = {};
      for (const item of Object.keys(oldItems)) {
        this.triggerItemChanged(item);
      }

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

    findLocationReverse(door) {
      return this.state.locations.find(item => item.exit === door && item.cave !== 'Useless');
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
      this.locationListeners.push(listener);
    }

    triggerLocationChanged(locationName, what) {
      const location = this.findLocation(locationName);

      for (const listener of this.locationListeners) {
        listener({
          location: locationName,
          what,
          value: location,
        });
      }
    }

    clearLocationChanged() {
      this.locationListeners = [];
    }

    getItem(item) {
      return this.state.items[item];
    }

    setItem(item, value) {
      this.state.items[item] = value;
      this.triggerItemChanged(item);
      this.save();
    }

    addOnItemChanged(listener) {
      this.itemListeners.push(listener);
    }

    triggerItemChanged(item) {
      for (const listener of this.itemListeners) {
        listener({ item });
      }
    }

    load() {
      try {
        const savedState = window.localStorage.getItem('state');
        if (savedState) {
          const newState = JSON.parse(savedState);
          for (const key of Object.keys(this.state)) {
            if (newState[key]) this.state[key] = newState[key];
          }
        }
      } catch (e) {
        window.localStorage.removeItem('state');
      }
    }

    save() {
      window.localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  class LocationTracker {
    constructor(state, itemTracker) {
      this.annotateLocationName = null;
      this.state = state;
      this.itemTracker = itemTracker;
      this.doorLocations = {};
      this.ui = {
        resetButton: $('#reset_tracker'),
        saveOptionsButton: $('#save_options'),
        closeOptionsButton: $('#close_options'),
        optionModal: $('#option_modal'),

        tableContainer: $('#table_container'),
        tableLocations: $('#locations_table'),
        tableLocationsDT: null,
        tableUnvisitedLocations: $('#unvisited_doors_table'),
        tableUnvisitedLocationsDT: null,
        tableUnvisitedCaves: $('#unvisited_caves_table'),
        tableUnvisitedCavesDT: null,

        mapLW: $('#lw_map'),
        mapDW: $('#dw_map'),
        mapFooter: $('#map_footer'),
      };
      this.initForm();
      this.initTables();
      LocationTracker.initHelp();
      this.initMap();

      this.setupTracker();
    }

    setupTracker() {
      this.state.clearLocationChanged();
      this.loadLocations();
      this.initLocations();

      if (this.state.mode === 'item') {
        this.ui.tableContainer.addClass('hidden');
      } else {
        this.ui.tableContainer.removeClass('hidden');
      }

      this.refreshList();
    }

    loadLocations() {
      this.doorLocations = {};

      if (this.state.mode === 'entrance') {
        this.caves = window.caves;
        this.overworld_items = window.overworldLocations;
      } else if (this.state.mode === 'item') {
        this.caves = window.item_randomizer;
        this.overworld_items = window.overworldLocations;
      }

      for (const caveName of Object.keys(this.caves)) {
        const hasDrop =
          Object.entries(this.caves[caveName].entrance).find(i => i[1].drop === true) !== undefined;
        const isDungeon = this.caves[caveName].dungeon === true;
        const isMulti =
          isDungeon ||
          (!hasDrop &&
            caveName !== 'Useless' &&
            Object.keys(this.caves[caveName].entrance).length > 1);
        for (const doorName of Object.keys(this.caves[caveName].entrance)) {
          this.doorLocations[doorName] = this.caves[caveName].entrance[doorName];
          this.doorLocations[doorName].cave = caveName;
          this.doorLocations[doorName].multi = isMulti;
          if (!this.doorLocations[doorName].region) {
            this.doorLocations[doorName].region = this.caves[caveName].region;
          }
          if (!this.doorLocations[doorName].tag) {
            this.doorLocations[doorName].tag = this.caves[caveName].tag;
          }
        }
      }
      for (const name of Object.keys(this.overworld_items)) {
        if (this.state.mode === 'entrance' || !this.overworld_items[name].entranceOnly) {
          this.doorLocations[name] = this.overworld_items[name];
          this.doorLocations[name].overworld = true;
        }
      }
    }

    initForm() {
      this.ui.resetButton.click(() => {
        this.state.reset();
      });

      this.ui.saveOptionsButton.click(() => {
        const randomizerType = $('#option_modal input[name=randomizer_type]:checked');
        console.log(`Randomizer type:${randomizerType.val()}`);

        if (this.state.mode !== randomizerType.val()) {
          this.state.mode = randomizerType.val();
          this.state.reset();
          this.setupTracker();
        }
      });

      this.ui.optionModal.on('show.bs.modal', () => {
        const oldRandomizerType = $('#option_modal input[name=randomizer_type]:checked');
        oldRandomizerType.prop('checked', false);
        oldRandomizerType.parent().removeClass('active');
        const newRandomizerTypeButton = $(
          `#option_modal input[name=randomizer_type][value='${this.state.mode}']`,
        );
        newRandomizerTypeButton.prop('checked', true);
        newRandomizerTypeButton.parent().addClass('active');
      });
    }

    initTables() {
      this.ui.tableLocations.on('click', 'a.editor_remove', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const tr = $(event.currentTarget).closest('tr')[0];
        const td = tr.firstChild;
        const s = td.textContent;
        this.state.removeLocation(s);
      });
      this.ui.tableLocations.on('click', 'tbody tr', (event) => {
        const tr = event.currentTarget;
        const td = tr.firstChild;
        const locationName = td.textContent;

        const location = this.state.findLocation(locationName);
        if (!location) return;
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
              '<a class="editor_remove"><span class="glyphicon glyphicon-remove"></a>',
          },
        ],
        buttons: [
          {
            text: 'Hide Done',
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
              '<a class="editor_useless text-nowrap"><span title="Mark Useless" class="glyphicon glyphicon-remove"></span></a>',
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

    annotateLocation(locationName) {
      if (!this.doorLocations[locationName].cave === 'Useless') {
        this.annotateLocationName = null;
        return;
      }
      this.state.addLocation(
        this.annotateLocationName,
        this.doorLocations[locationName].cave,
        locationName,
        false,
      );
      this.state.annotateLocation(this.annotateLocationName, 'Marked');
      this.annotateLocationName = null;
    }

    initMap() {
      if (this.state.mapHeight > 0) {
        this.ui.mapLW.width(this.state.mapHeight);
        this.ui.mapLW.height(this.state.mapHeight);
        this.ui.mapDW.width(this.state.mapHeight);
        this.ui.mapDW.height(this.state.mapHeight);
      }
      this.ui.mapLW.resizable({
        aspectRatio: 1,
        minWidth: 100,
        alsoResize: '.resizable',
        stop: function resizeEvent(event, ui) {
          this.state.mapHeight = ui.size.height;
        }.bind(this),
      });
      this.ui.mapDW.resizable({
        aspectRatio: 1,
        minWidth: 100,
        alsoResize: '.resizable',
        stop: function resizeEvent(event, ui) {
          this.state.mapHeight = ui.size.height;
        }.bind(this),
      });

      this.state.addOnItemChanged(() => {
        for (const location of this.ui.mapLW.find('.location')) {
          this.refreshLocation($(location));
        }
        for (const location of this.ui.mapDW.find('.location')) {
          this.refreshLocation($(location));
        }
      });

      /* this.ui.mapLW.mousemove((event) => {
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
      }); */
    }

    initLocations() {
      this.ui.mapLW.find('.location').remove();
      this.ui.mapDW.find('.location').remove();

      for (const [name, door] of Object.entries(this.doorLocations)) {
        if (!door.x || !door.y) {
          console.log(`Location "${name}" is missing coordinates`);
          continue;
        }

        const mapDiv = door.tag.indexOf('lw') !== -1 ? this.ui.mapLW : this.ui.mapDW;
        let rectSize = 'small';
        if (this.state.mode === 'entrance') {
          if (door.tag.indexOf('large') !== -1) rectSize = 'large';
          else if (door.tag.indexOf('small') !== -1) rectSize = 'small';
        } else if (this.state.mode === 'item') {
          if (door.dungeon) rectSize = 'large';
          else rectSize = '';
        }
        let locationDiv;
        if (door.overworld) locationDiv = LocationTracker.createSVGCircle(rectSize);
        else if (door.drop) locationDiv = LocationTracker.createSVGTriangle(rectSize);
        else if (door.multi) locationDiv = LocationTracker.createSVGDiamond(rectSize);
        else locationDiv = LocationTracker.createSVGRect(rectSize);
        locationDiv.css('left', door.x);
        locationDiv.css('top', door.y);
        locationDiv.data('location', name);
        locationDiv.click((event) => {
          event.preventDefault();

          const locationName = $(event.currentTarget).data('location');
          console.log(`Clicked on: ${locationName}`);
          let location = this.state.findLocation(locationName);

          if (this.annotateLocationName) {
            this.annotateLocation(locationName);
            return;
          }

          if (!location) {
            location = this.state.addLocation(locationName, 'Useless', locationName, false);
          }

          if (location.isDone && !location.annotation) {
            this.state.removeLocation(locationName);
            location = null;
          } else this.state.doLocation(locationName, !location.isDone);
        });
        locationDiv.contextmenu((event) => {
          event.preventDefault();

          const locationName = $(event.currentTarget).data('location');
          const location = this.state.findLocation(locationName);

          if (this.annotateLocationName) {
            this.annotateLocation(locationName);
            return;
          }

          if (!location) {
            if (this.doorLocations[locationName].overworld || this.state.mode === 'item') {
              this.state.addLocation(locationName, locationName, locationName, false);
              this.state.annotateLocation(locationName, 'Marked');
            } else {
              this.annotateLocationName = locationName;
            }
            return;
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
        });
        locationDiv.mouseenter((event) => {
          const locationName = $(event.currentTarget).data('location');
          const caveName = this.doorLocations[locationName].cave;

          let text = locationName;
          if (this.annotateLocationName) {
            if (caveName && caveName !== 'Useless') {
              text = `Connect <span style="color: green">${this
                .annotateLocationName}</span> ➜ <span style="color: red">${locationName} (${caveName})</span>`;
            } else {
              text = `<span class="glyphicon glyphicon-warning-sign"></span> Can't connect <span style="color: green">${this
                .annotateLocationName}</span> ➜ <span style="color: red">${locationName} (NO REMARKABLE CAVE)</span> <span class="glyphicon glyphicon-warning-sign"></span>`;
            }
          } else if (this.state.mode === 'entrance') {
            const locationState = this.state.findLocation(locationName);
            if (locationState) {
              text = `<span style="color: green">${text}</span> ➜ <span style="color: red">${locationState.cave} (${locationState.exit})</span>`;
              for (const location of this.state.locations) {
                if (
                  location.cave !== 'Useless' &&
                  location.cave === locationState.cave &&
                  location.door !== locationState.door
                ) {
                  this.doorLocations[location.door].rect.addClass('highlighted');
                }
              }
            }
            const locationReverseState = this.state.findLocationReverse(locationName);
            if (locationReverseState && locationReverseState.cave !== 'Useless') {
              this.doorLocations[locationReverseState.door].rect.addClass('highlighted_reverse');
            }
          }
          this.ui.mapFooter.html(text);
        });
        locationDiv.mouseleave(() => {
          for (const location of this.state.locations) {
            this.doorLocations[location.door].rect.removeClass('highlighted');
            this.doorLocations[location.door].rect.removeClass('highlighted_reverse');
          }
        });

        this.refreshLocation(locationDiv);

        this.state.addOnLocationChanged(
          function locationChangedEvent(rectTarget, event) {
            const dataLocation = rectTarget.data('location');
            if (event.location !== dataLocation) {
              return;
            }
            this.refreshLocation(rectTarget);
          }.bind(this, locationDiv),
        );

        door.rect = locationDiv;
        mapDiv.append(locationDiv);
      }

      this.state.addOnLocationChanged(() => {
        this.state.save();
        this.refreshList();
      });
    }

    static initHelp() {
      $('.help-location').each(function initHelpLocations() {
        let locationShape;
        if (this.classList.contains('help-overworld')) {
          locationShape = LocationTracker.createSVGCircle();
        } else if (this.classList.contains('help-multi')) {
          locationShape = LocationTracker.createSVGDiamond();
        } else if (this.classList.contains('help-drop')) {
          locationShape = LocationTracker.createSVGTriangle();
        } else {
          locationShape = LocationTracker.createSVGRect();
        }

        if (this.classList.contains('help-available')) {
          locationShape.addClass('available');
        } else if (this.classList.contains('help-visible')) {
          locationShape.addClass('visible');
        } else if (this.classList.contains('help-marked')) {
          locationShape.addClass('marked');
        }
        if (this.classList.contains('help-highlighted')) {
          locationShape.addClass('highlighted');
        } else if (this.classList.contains('help-highlighted-reverse')) {
          locationShape.addClass('highlighted_reverse');
        }
        if (this.classList.contains('help-done')) {
          locationShape.addClass('done');
        }
        $(this).append(locationShape);
      });
    }

    refreshLocation(locationDiv) {
      const locationName = locationDiv.data('location');
      const location = this.state.findLocation(locationName);

      if (this.doorLocations[locationName].state) {
        const state = this.doorLocations[locationName].state(this.itemTracker);
        locationDiv.removeClass('available');
        locationDiv.removeClass('visible');
        if (state === 'available' || state === 'visible') {
          locationDiv.addClass(state);
        }
      } else {
        console.log(`Missing status function for '${locationName}'`);
      }

      if (!location) {
        locationDiv.removeClass('marked');
        locationDiv.removeClass('done');
        return;
      }

      if (location.annotation) locationDiv.addClass('marked');
      else locationDiv.removeClass('marked');
      if (location.isDone) locationDiv.addClass('done');
      else locationDiv.removeClass('done');
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
        if (this.state.showUseless || !(item.cave === 'Useless' || item.isDone)) {
          locationsArray.push(item);
        }
      }
      this.ui.tableLocationsDT.clear();
      this.ui.tableLocationsDT.rows.add(locationsArray);
      this.ui.tableLocationsDT
        .rows()
        .invalidate()
        .draw();

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
      this.ui.tableUnvisitedLocationsDT
        .rows()
        .invalidate()
        .draw();

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
      this.ui.tableUnvisitedCavesDT
        .rows()
        .invalidate()
        .draw();
    }

    static createSVGRect(className) {
      const outer = $(document.createElement('span'));
      outer.addClass('location');
      if (className) outer.addClass(className);

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      shapeElement.setAttribute('width', '100%');
      shapeElement.setAttribute('height', '100%');

      svgElement.appendChild(shapeElement);
      outer.append(svgElement);

      return outer;
    }

    static createSVGDiamond(className) {
      const outer = $(document.createElement('span'));
      outer.addClass('location');
      if (className) outer.addClass(className);

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElement.setAttribute('viewBox', '0 0 100 100');
      const shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      shapeElement.setAttribute('points', '50,5 95,50 50,95 5,50');

      svgElement.appendChild(shapeElement);
      outer.append(svgElement);

      return outer;
    }

    static createSVGCircle(className) {
      const outer = $(document.createElement('span'));
      outer.addClass('location');
      if (className) outer.addClass(className);

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      shapeElement.setAttribute('cx', '50%');
      shapeElement.setAttribute('cy', '50%');
      shapeElement.setAttribute('r', '40%');

      svgElement.appendChild(shapeElement);
      outer.append(svgElement);

      return outer;
    }

    static createSVGTriangle(className) {
      const outer = $(document.createElement('span'));
      outer.addClass('location');
      if (className) outer.addClass(className);

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElement.setAttribute('viewBox', '0 0 100 100');
      const shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      shapeElement.setAttribute('points', '5,5 95,5 50,95');

      svgElement.appendChild(shapeElement);
      outer.append(svgElement);

      return outer;
    }
  }

  class ItemTracker {
    constructor(state) {
      this.state = state;

      this.ui = {
        tracker: $('#item_tracker'),
        items: {},
      };

      this.items = {
        bow: {
          values: ['none', 'silverarrows', 'bow', 'bow-silverarrows'],
          type: 'item',
        },
        boomerang: {
          values: ['none', 'boomerang', 'boomerang-red', 'boomerang-both'],
          type: 'item',
        },
        hookshot: {
          values: ['none', 'hookshot'],
          type: 'item',
        },
        bomb: {
          values: ['none', 'bomb'],
          type: 'item',
        },
        'mushroom-powder': {
          values: ['none', 'mushroom', 'powder', 'mushroom-powder'],
          type: 'item',
        },
        firerod: {
          values: ['none', 'firerod'],
          type: 'item',
        },
        icerod: {
          values: ['none', 'icerod'],
          type: 'item',
        },
        bombos: {
          values: ['none', 'bombos'],
          type: 'item',
        },
        ether: {
          values: ['none', 'ether'],
          type: 'item',
        },
        quake: {
          values: ['none', 'quake'],
          type: 'item',
        },
        lantern: {
          values: ['none', 'lantern'],
          type: 'item',
        },
        hammer: {
          values: ['none', 'hammer'],
          type: 'item',
        },
        'shovel-flute': {
          values: ['none', 'shovel', 'flute', 'shovel-flute'],
          type: 'item',
        },
        net: {
          values: ['none', 'net'],
          type: 'item',
        },
        book: {
          values: ['none', 'book'],
          type: 'item',
        },
        bottle: {
          values: ['none', 'bottle'],
          type: 'item',
        },
        somaria: {
          values: ['none', 'somaria'],
          type: 'item',
        },
        byrna: {
          values: ['none', 'byrna'],
          type: 'item',
        },
        cape: {
          values: ['none', 'cape'],
          type: 'item',
        },
        mirror: {
          values: ['none', 'mirror'],
          type: 'item',
        },
        boots: {
          values: ['none', 'boots'],
          type: 'item',
        },
        glove: {
          values: ['none', 'glove', 'glove2'],
          type: 'item',
        },
        flippers: {
          values: ['none', 'flippers'],
          type: 'item',
        },
        moonpearl: {
          values: ['none', 'moonpearl'],
          type: 'item',
        },
        agahnim: {
          values: ['none', 'agahnim1', 'agahnim2', 'agahnim1-agahnim2'],
          type: 'bosses',
        },
        mail: {
          values: ['mail', 'mail2', 'mail3'],
          type: 'equipment',
        },
        sword: {
          values: ['none', 'sword1', 'sword2', 'sword2-tempered', 'sword2-butter'],
          type: 'equipment',
        },
        shield: {
          values: ['none', 'shield1', 'shield2', 'shield3'],
          type: 'equipment',
        },
      };
      const dungeonChestCount = [3, 2, 2, 5, 6, 2, 4, 3, 2, 5];
      for (let i = 0; i < 10; i += 1) {
        this.items[`boss${i}`] = {
          values: ['none', `boss${i}`],
          type: 'bosses',
        };
        this.items[`boss${i}reward`] = {
          values: [
            'reward-unknown',
            'reward-crystal',
            'reward-crystal56',
            'reward-pendant-green',
            'reward-pendant-bluered',
          ],
          type: 'bosses',
        };
	if (i == 8 || i == 9)
	{
          this.items[`boss${i}medallion`] = {
            values: [
              'medallion-unknown',
              'medallion-bombos',
              'medallion-ether',
              'medallion-quake',
            ],
            type: 'bosses',
          };
        }
        const dungeonChests = {
          values: [],
          type: 'bosses',
        };
        for (let j = dungeonChestCount[i]; j >= 0; j -= 1) {
          dungeonChests.values.push(`chest${j}`);
        }
        this.items[`boss${i}chest`] = dungeonChests;
      }
      this.typeMapping = {
        item: 'item-pretty',
        bosses: 'bosses',
        equipment: 'equipment',
      };

      this.initItems();
    }

    initItems() {
      if (this.state.mapHeight > 0) {
        this.ui.tracker.width(this.state.mapHeight);
        this.ui.tracker.height(this.state.mapHeight);
      }
      this.ui.tracker.resizable({
        aspectRatio: 1,
        minWidth: 100,
        alsoResize: '.resizable',
        stop: function resizeEvent(event, ui) {
          this.state.mapHeight = ui.size.height;
        }.bind(this),
      });

      for (const itemName of Object.keys(this.items)) {
        const div = $(document.createElement('div'));
        this.ui.items[itemName] = div;
        this.ui.tracker.append(div);

        div.addClass('item');
        div.addClass(this.typeMapping[this.items[itemName].type]);
        div.data('item', itemName);
        this.refreshItem(itemName);
        div.click((event) => {
          event.preventDefault();

          const clickedItemName = $(event.currentTarget).data('item');
          const clickedItemState = this.safeGetItem(clickedItemName);
          console.log(`Clicked on item: ${clickedItemName}`);

          const itemStates = this.items[clickedItemName].values;
          const newItemState =
            itemStates[(itemStates.indexOf(clickedItemState) + 1) % itemStates.length];
          this.state.setItem(clickedItemName, newItemState);
        });
        this.state.addOnItemChanged(
          function itemChanged(itemTracker, event) {
            const changedItemName = this.data('item');
            if (event.item !== changedItemName) {
              return;
            }
            itemTracker.refreshItem(changedItemName);
          }.bind(div, this),
        );
      }
    }

    safeGetItem(item) {
      let value = this.state.getItem(item);
      if (!value) {
        value = this.items[item].values[0];
        this.state.setItem(item, value);
      }
      return value;
    }

    refreshItem(item) {
      const div = this.ui.items[item];
      const itemState = this.safeGetItem(item);

      for (const value of this.items[item].values) {
        div.removeClass(value);
      }
      div.removeClass(item);

      if (item.endsWith('reward') || item.endsWith('chest') || item.endsWith('medallion')) {
        div.addClass(item);
        div.addClass(itemState);
      } else if (itemState === 'none') {
        div.addClass('item_missing');
        div.addClass(item);
      } else {
        div.removeClass('item_missing');
        div.addClass(itemState);
      }
    }

    has(item) {
      let itemSlot;
      let count = 0;

      switch (item) {
        case 'mushroom':
        case 'powder':
          itemSlot = 'mushroom-powder';
          break;
        case 'shovel':
        case 'flute':
          itemSlot = 'shovel-flute';
          break;
        case 'glove2':
          itemSlot = 'glove';
          break;
        case 'sword2':
          itemSlot = 'sword';
          break;
        case 'agahnim1':
        case 'agahnim2':
          itemSlot = 'agahnim';
          break;
        case 'crystal56':
          for (let i = 0; i < 10; i += 1) {
            const dungeonReward = this.safeGetItem(`boss${i}reward`);
            const dungeonCompleted = this.safeGetItem(`boss${i}`) !== 'none';
            if (dungeonReward === 'reward-crystal56' && dungeonCompleted) count += 1;
          }
          return count >= 2;
        case 'crystal-all':
          for (let i = 0; i < 10; i += 1) {
            const dungeonReward = this.safeGetItem(`boss${i}reward`);
            const dungeonCompleted = this.safeGetItem(`boss${i}`) !== 'none';
            if (dungeonReward.startsWith('reward-crystal') && dungeonCompleted) count += 1;
          }
          return count >= 7;
        case 'pendant-green':
          for (let i = 0; i < 10; i += 1) {
            const dungeonReward = this.safeGetItem(`boss${i}reward`);
            const dungeonCompleted = this.safeGetItem(`boss${i}`) !== 'none';
            if (dungeonReward === 'reward-pendant-green' && dungeonCompleted) count += 1;
          }
          return count >= 1;
        case 'pendant-all':
          for (let i = 0; i < 10; i += 1) {
            const dungeonReward = this.safeGetItem(`boss${i}reward`);
            const dungeonCompleted = this.safeGetItem(`boss${i}`) !== 'none';
            if (dungeonReward.startsWith('reward-pendant') && dungeonCompleted) count += 1;
          }
          return count >= 3;
        default:
          itemSlot = item;
      }

      return this.safeGetItem(itemSlot).indexOf(item) !== -1;
    }

    access(zone, zones) {
      if (zones && zones.includes(zone)) return false;
      let allZones;
      if (!zones) allZones = [zone];
      else {
        allZones = zones;
        zones.push(zone);
      }

      switch (zone) {
        case 'dm':
          return (
            this.has('flute') ||
            (this.state.mode === 'item' && this.has('glove') && this.has('lantern'))
          );
        case 'dmeast':
          return (
            (this.has('hookshot') && this.access('dm', allZones)) || this.access('dmne', allZones)
          );
        case 'dmnw':
          return (
            (this.has('mirror') && this.access('dm', allZones)) ||
            (this.has('hammer') && this.access('dmne', allZones))
          );
        case 'dmne':
          return (
            (this.has('hammer') && this.access('dmnw', allZones)) ||
            (this.state.mode === 'item' && this.access('dmeast', allZones))
          );
        case 'desertledge':
          return (
            (this.has('mirror') && this.access('mire', allZones)) ||
            (this.state.mode === 'item' && this.has('book'))
          );
        case 'hyruletop':
          return this.has('mirror') && this.access('dweast', allZones);
        case 'dweast':
          return (
            this.has('agahnim1') ||
            (this.has('glove') && this.has('hammer') && this.has('moonpearl')) ||
            ((this.has('hammer') || this.has('flippers')) && this.access('dwwest', allZones))
          );
        case 'dwne':
          return (
            this.has('moonpearl') &&
            ((this.has('flippers') || this.has('hammer') || this.has('glove')) &&
              this.access('dweast', allZones))
          );
        case 'dwwest':
          return (
            (this.has('moonpearl') &&
              (this.has('glove2') || (this.has('glove') && this.has('hammer')))) ||
            (this.has('hookshot') && this.access('dwne', allZones))
          );
        case 'dwsouth':
          return (
            this.has('moonpearl') &&
            ((this.has('glove') && this.has('hammer')) ||
              (this.has('hammer') && this.access('dweast', allZones)) ||
              this.access('dwwest', allZones))
          );
        case 'dwdmeast':
          return this.has('glove2') && this.access('dmeast', allZones);
        case 'dwdmne':
          return (
            (this.has('glove2') && this.has('hammer') && this.access('dwne', allZones)) ||
            (this.state.mode === 'item' && this.access('dwdmeast', allZones))
          );
        case 'mire':
          return this.has('glove2') && this.has('flute');
        case 'miredungeon':
          const needed_medallion8 = this.safeGetItem('boss8medallion').substring(10);
          return (
            this.access('mire', allZones) &&
            this.has('sword') &&
            (
              needed_medallion8 != 'unknown' && this.has(needed_medallion8) ||
              this.has('bombos') &&
              this.has('ether') &&
              this.has('quake')
            ) &&
            this.has('moonpearl')
          );
        case 'dwbumpexit':
          return this.state.mode === 'item' && this.has('cape') && this.access('dwwest', allZones);
        case 'dwdmisland':
          return (
            this.state.mode === 'item' &&
            this.has('glove') &&
            this.has('bomb') &&
            this.access('dwdmne')
          );
        case 'turtlerock':
          const needed_medallion9 = this.safeGetItem('boss9medallion').substring(10);
          return (
            this.access('dwdmne', allZones) &&
            this.has('hammer') &&
            this.has('sword') &&
            (
              needed_medallion9 != 'unknown' && this.has(needed_medallion9) ||
              this.has('bombos') &&
              this.has('ether') &&
              this.has('quake')
            ) &&
            this.has('moonpearl')
          );
        case 'dwdmledge':
          return this.state.mode === 'item' && this.access('turtlerock') && this.has('somaria');
        case 'swback':
        default:
          return false;
      }
    }
  }

  const state = new State();
  state.load();

  const itemTracker = new ItemTracker(state);
  const locationTracker = new LocationTracker(state, itemTracker);

  window.trackers = { itemTracker, locationTracker };
});
