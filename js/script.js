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
        locations: [],
        items: {},
        mapHeight: -1,
      };
      this.locationListeners = [];
      this.itemListeners = [];
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
      const oldLocations = this.state.locations;
      this.state.locations = [];
      for (const location of oldLocations) {
        this.triggerLocationChanged(location.door, 'delete');
      }

      const oldItems = this.state.items;
      this.state.items = {};
      for (const item of Object.keys(oldItems)) {
        this.triggerItemChanged(item);
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

    getItem(item) {
      if (!this.state.items[item]) {
        this.state.items[item] = 'none';
      }
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
      this.caves = window.caves;
      for (const name of Object.keys(window.doorLocations)) {
        this.doorLocations[name] = window.doorLocations[name];
        if (this.doorLocations[name].cave) {
          if (!this.caves[this.doorLocations[name].cave]) {
            console.warn(
              `Location '${name}' points to a non existing cave '${this.doorLocations[name].cave}'`,
            );
          }
        }
      }
      for (const name of Object.keys(window.overworldLocations)) {
        this.doorLocations[name] = window.overworldLocations[name];
        this.doorLocations[name].overworld = true;
      }
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
        mapFooter: $('#map_footer'),
      };

      this.initForm();
      this.initTables();
      this.initMap();

      this.state.addOnLocationChanged(() => {
        this.state.save();
        this.refreshList();
      });

      this.refreshList();
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
        this.clearForm();
        event.preventDefault();
      });
      this.ui.addLocationButtonClear.click(() => {
        this.clearForm();
      });
      this.ui.resetButton.click(() => {
        this.state.reset();
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
      });
      this.ui.tableLocations.find('tbody').on('click', 'tr', (event) => {
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
              '<a href="#" class="editor_remove"><span class="glyphicon glyphicon-remove"></a>',
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
              '<a href="#" class="editor_useless text-nowrap"><span title="Mark Useless" class="glyphicon glyphicon-remove"></span></a>',
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
      if (!this.doorLocations[locationName].cave) {
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
        alsoResize: '.resizable',
        stop: function resizeEvent(event, ui) {
          this.state.mapHeight = ui.size.height;
        }.bind(this),
      });
      this.ui.mapDW.resizable({
        aspectRatio: 1,
        alsoResize: '.resizable',
        stop: function resizeEvent(event, ui) {
          this.state.mapHeight = ui.size.height;
        }.bind(this),
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

      for (const [name, door] of Object.entries(this.doorLocations)) {
        if (!door.x || !door.y) {
          console.log(`Location "${name}" is missing coordinates`);
          continue;
        }

        const mapDiv = door.tag.indexOf('lw') !== -1 ? this.ui.mapLW : this.ui.mapDW;
        let rectSize = 'small';
        if (door.tag.indexOf('large') !== -1) rectSize = 'large';
        else if (door.tag.indexOf('small') !== -1) rectSize = 'small';
        let rect;
        if (door.overworld) rect = LocationTracker.createSVGCircle(rectSize);
        else if (door.drop) rect = LocationTracker.createSVGTriangle(rectSize);
        else rect = LocationTracker.createSVGRect(rectSize);
        rect.css('left', door.x);
        rect.css('top', door.y);
        rect.data('location', name);
        rect.click((event) => {
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
        rect.contextmenu((event) => {
          event.preventDefault();

          const locationName = $(event.currentTarget).data('location');
          const location = this.state.findLocation(locationName);

          if (this.annotateLocationName) {
            this.annotateLocation(locationName);
            return;
          }

          if (!location) {
            if (this.doorLocations[locationName].overworld) {
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
        rect.mouseenter((event) => {
          const locationName = $(event.currentTarget).data('location');
          const caveName = this.doorLocations[locationName].cave;
          let text;
          if (this.annotateLocationName) {
            if (caveName) {
              text = `Connect <span style="color: green">${this
                .annotateLocationName}</span> ➜ <span style="color: red">${locationName} (${caveName})</span>`;
            } else {
              text = `<span class="glyphicon glyphicon-warning-sign"></span> Can't connect <span style="color: green">${this
                .annotateLocationName}</span> ➜ <span style="color: red">${locationName} (NO REMARKABLE CAVE)</span> <span class="glyphicon glyphicon-warning-sign"></span>`;
            }
          } else {
            text = locationName;
            const location = this.state.findLocation(locationName);
            if (location) {
              text = `<span style="color: green">${text}</span> ➜ <span style="color: red">${location.cave} (${location.exit})</span>`;
            }
          }
          this.ui.mapFooter.html(text);
        });

        this.refreshRect(rect);

        this.state.addOnLocationChanged(
          function locationChangedEvent(rectTarget, event) {
            const dataLocation = rectTarget.data('location');
            if (event.location !== dataLocation) {
              return;
            }
            this.refreshRect(rectTarget);
          }.bind(this, rect),
        );

        this.state.addOnItemChanged(
          function itemChangedEvent(rectTarget) {
            this.refreshRect(rectTarget);
          }.bind(this, rect),
        );

        door.rect = mapDiv;
        mapDiv.append(rect);
      }
    }

    refreshRect(rect) {
      const locationName = rect.data('location');
      const location = this.state.findLocation(locationName);

      if (this.doorLocations[locationName].state) {
        const state = this.doorLocations[locationName].state(this.itemTracker);
        rect.removeClass('available');
        rect.removeClass('visible');
        if (state === 'available' || state === 'visible') {
          rect.addClass(state);
        }
      } else {
        console.log(`Missing status function for '${locationName}'`);
      }

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

    static createSVGCircle(className) {
      const div = $(document.createElement('div'));
      div.addClass('location');
      if (className) div.addClass(className);

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      rectElement.setAttribute('cx', '50%');
      rectElement.setAttribute('cy', '50%');
      rectElement.setAttribute('r', '40%');

      svgElement.appendChild(rectElement);
      div.append(svgElement);

      return div;
    }

    static createSVGTriangle(className) {
      const div = $(document.createElement('div'));
      div.addClass('location');
      if (className) div.addClass(className);

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElement.setAttribute('viewBox', '0 0 100 100');
      const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      rectElement.setAttribute('points', '0,0 100,0 50,100');

      svgElement.appendChild(rectElement);
      div.append(svgElement);

      return div;
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
        },
        boomerang: {
          values: ['none', 'boomerang', 'boomerang-red', 'boomerang-both'],
        },
        hookshot: {
          values: ['none', 'hookshot'],
        },
        bomb: {
          values: ['none', 'bomb'],
        },
        'mushroom-powder': {
          values: ['none', 'mushroom', 'powder', 'mushroom-powder'],
        },
        firerod: {
          values: ['none', 'firerod'],
        },
        icerod: {
          values: ['none', 'icerod'],
        },
        bombos: {
          values: ['none', 'bombos'],
        },
        ether: {
          values: ['none', 'ether'],
        },
        quake: {
          values: ['none', 'quake'],
        },
        lantern: {
          values: ['none', 'lantern'],
        },
        hammer: {
          values: ['none', 'hammer'],
        },
        'shovel-flute': {
          values: ['none', 'shovel', 'flute', 'shovel-flute'],
        },
        net: {
          values: ['none', 'net'],
        },
        book: {
          values: ['none', 'book'],
        },
        bottle: {
          values: ['none', 'bottle'],
        },
        somaria: {
          values: ['none', 'somaria'],
        },
        byrna: {
          values: ['none', 'byrna'],
        },
        cape: {
          values: ['none', 'cape'],
        },
        mirror: {
          values: ['none', 'mirror'],
        },
        boots: {
          values: ['none', 'boots'],
        },
        glove: {
          values: ['none', 'glove', 'glove2'],
        },
        flippers: {
          values: ['none', 'flippers'],
        },
        moonpearl: {
          values: ['none', 'moonpearl'],
        },
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
        div.addClass('item-pretty');
        div.data('item', itemName);
        div.data('item-state', this.state.getItem(itemName));
        this.refreshItem(itemName);
        div.click((event) => {
          event.preventDefault();

          const clickedItemName = $(event.currentTarget).data('item');
          const clickedItemState = this.state.getItem(clickedItemName);
          console.log(`Clicked on item: ${clickedItemName}`);
          console.log(this.items[clickedItemName].values);

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

    refreshItem(item) {
      const div = this.ui.items[item];
      const itemState = this.state.getItem(item);

      for (const value of this.items[item].values) {
        div.removeClass(value);
      }

      if (itemState === 'none') {
        div.addClass('item_missing');
        div.addClass(item);
      } else {
        div.removeClass('item_missing');
        div.addClass(itemState);
      }
    }

    has(item) {
      let itemSlot;
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
        default:
          itemSlot = item;
      }
      return this.state.getItem(itemSlot).indexOf(item) !== -1;
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
          return this.has('flute');
        case 'dmeast':
          return (
            (this.has('hookshot') && this.access('dm', allZones)) || this.access('dmne', allZones)
          );
        case 'dmnw':
          return this.has('mirror') && this.access('dm', allZones);
        case 'dmne':
          return this.has('hammer') && this.access('dmnw', allZones);
        case 'desertledge':
          return this.has('mirror') && this.access('mire', allZones);
        case 'hyruletop':
          return this.has('mirror') && this.access('dweast', allZones);
        case 'dweast':
          return (
            this.has('agahnim') ||
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
          return this.has('glove2') && this.has('hammer') && this.access('dwne', allZones);
        case 'mire':
          return this.has('glove2') && this.has('flute');
        case 'swback':
        case 'dwbumpexit':
        case 'dwdmisland':
        case 'dwdmledge':
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
