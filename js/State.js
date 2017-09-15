class State {
  constructor() {
    this.state = {
      showUseless: true,
      mode: 'item',
      locations: [],
      mapHeight: -1,

      twitch: {
        user: '',
        password: '',
      },

      items: State.emptyItems(),
      dungeons: State.emptyDungeons(),
    };
    this.locationListeners = [];
    this.itemListeners = [];
  }

  static emptyItems() {
    return {
      bow: 0,
      silverarrows: 0,
      boomerang: 0,
      'boomerang-red': 0,
      hookshot: 0,
      bomb: 0,
      mushroom: 0,
      powder: 0,
      firerod: 0,
      icerod: 0,
      bombos: 0,
      ether: 0,
      quake: 0,
      lantern: 0,
      hammer: 0,
      shovel: 0,
      flute: 0,
      net: 0,
      book: 0,
      bottle: 0,
      somaria: 0,
      byrna: 0,
      cape: 0,
      mirror: 0,
      boots: 0,
      glove: 0,
      flippers: 0,
      moonpearl: 0,
      agahnim: 0,
      mail: 0,
      sword: 0,
      shield: 0,
    };
  }

  static emptyDungeons() {
    return [
      {
        reward: 0,
        done: 0,
        count: 0,
        totalCount: 3,
      },
      {
        reward: 0,
        done: 0,
        count: 0,
        totalCount: 2,
      },
      {
        reward: 0,
        done: 0,
        count: 0,
        totalCount: 2,
      },
      {
        reward: 0,
        done: 0,
        count: 0,
        totalCount: 5,
      },
      {
        reward: 0,
        done: 0,
        count: 0,
        totalCount: 6,
      },
      {
        reward: 0,
        done: 0,
        count: 0,
        totalCount: 2,
      },
      {
        reward: 0,
        done: 0,
        count: 0,
        totalCount: 4,
      },
      {
        reward: 0,
        done: 0,
        count: 0,
        totalCount: 3,
      },
      {
        reward: 0,
        done: 0,
        count: 0,
        totalCount: 2,
      },
      {
        reward: 0,
        done: 0,
        count: 0,
        totalCount: 5,
      },
    ];
  }

  get mode() {
    return this.state.mode;
  }

  set mode(value) {
    this.state.mode = value;
    this.save();
  }

  get twitch() {
    return this.state.twitch;
  }

  set twitch(value) {
    this.state.twitch = value;
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
    this.state.items = State.emptyItems();
    this.state.dungeons = State.emptyDungeons();
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

  getItemList() {
    return Object.keys(this.state.items);
  }

  getItem(item) {
    return this.state.items[item];
  }

  setItem(item, value) {
    this.state.items[item] = value;
    this.triggerItemChanged(item);
    this.save();
  }

  getDungeonState(dungeonID, state) {
    return this.state.dungeons[dungeonID][state];
  }

  setDungeonState(dungeonID, state, value) {
    this.state.dungeons[dungeonID][state] = value;
    this.triggerItemChanged(`dungeon${dungeonID}`);
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

export default State;
