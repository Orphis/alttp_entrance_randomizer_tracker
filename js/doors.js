window.doorLocations = {
  // Light World
  'Forest Chest Game': {
    region: 'Lost Woods',
    tag: 'lw',
    x: '19.18%',
    y: '3.17%',
    state() {
      return 'available';
    },
  },
  "Thief's Hideout Drop": {
    region: 'Lost Woods',
    cave: "Thief's Hideout",
    drop: true,
    tag: 'lw',
    x: '19.41%',
    y: '13.12%',
    state() {
      return 'available';
    },
  },
  "Thief's Hideout Door": {
    region: 'Lost Woods',
    cave: "Thief's Hideout",
    tag: 'lw',
    x: '17.12%',
    y: '16.74%',
    state() {
      return 'available';
    },
  },
  'Lumberjack Cave Drop': {
    region: 'Light World North',
    cave: 'Lumberjack Cave',
    drop: true,
    tag: 'lw',
    x: '30.37%',
    y: '7.92%',
    state(items) {
      return items.has('agahnim1') && items.has('boots') ? 'available' : '';
    },
  },
  'Lumberjack Cave Door': {
    region: 'Light World North',
    cave: 'Lumberjack Cave',
    tag: 'lw',
    x: '34.25%',
    y: '3.62%',
    state() {
      return 'available';
    },
  },
  'Lumberjack House': {
    region: 'Light World North',
    tag: 'lw',
    x: '34.25%',
    y: '7.00%',
    state() {
      return 'available';
    },
  },
  'Death Mountain Entrance Front': {
    region: 'Light World North',
    cave: 'Death Mountain upwards',
    tag: 'lw',
    x: '35.16%',
    y: '19.23%',
    state(items) {
      return items.has('glove') ? 'available' : '';
    },
  },
  'Death Mountain Exit Back': {
    region: 'Light World North',
    cave: 'Death Mountain downwards',
    tag: 'lw',
    x: '35.16%',
    y: '15.38%',
    state(items) {
      return items.access('dmexit') || (items.has('mirror') && items.access('dwbumpexit'))
        ? 'available'
        : '';
    },
  },
  'Sanctuary Bonk Rocks': {
    region: 'Light World North',
    cave: 'Bonk Cave',
    tag: 'lw',
    x: '38.36%',
    y: '29.19%',
    state(items) {
      return items.has('boots') ? 'available' : '';
    },
  },
  Sanctuary: {
    region: 'Light World North',
    cave: 'Sanctuary',
    tag: 'lw',
    x: '46.35%',
    y: '26.70%',
    state() {
      return 'available';
    },
  },
  'Sewer Grave Drop': {
    region: 'Light World North',
    cave: 'Sewer Grave',
    tag: 'lw',
    drop: true,
    x: '52.74%',
    y: '28.96%',
    state(items) {
      return items.has('glove') ? 'available' : '';
    },
  },
  'Graveyard Cliff': {
    region: 'Light World North',
    cave: 'Graveyard Cliff',
    tag: 'lw',
    x: '57.53%',
    y: '27.38%',
    state(items) {
      return items.has('mirror') && items.access('dwwest') ? 'available' : '';
    },
  },
  "King's Tomb": {
    region: 'Light World North',
    cave: "King's Tomb",
    tag: 'lw',
    x: '60.27%',
    y: '28.96%',
    state(items) {
      return items.has('boots') &&
      (items.has('glove2') || (items.has('mirror') && items.access('dwwest')))
        ? 'available'
        : '';
    },
  },
  'East of Graveyard Drop': {
    region: 'Light World North',
    cave: 'East of Graveyard',
    drop: true,
    tag: 'lw',
    x: '64.61%',
    y: '30.54%',
    state() {
      return 'available';
    },
  },
  'East of Graveyard Door': {
    region: 'Light World North',
    cave: 'East of Graveyard',
    tag: 'lw',
    x: '67.61%',
    y: '27.54%',
    state() {
      return 'available';
    },
  },
  'Death Mountain Entrance Back': {
    region: 'Death Mountain',
    cave: 'Death Mountain upwards',
    tag: 'lw',
    x: '40.64%',
    y: '19.23%',
    state(items) {
      return items.access('dm') ? 'available' : '';
    },
  },
  'Death Mountain Exit Front': {
    region: 'Death Mountain',
    cave: 'Death Mountain downwards',
    tag: 'lw',
    x: '39.50%',
    y: '14.03%',
    state(items) {
      return items.access('dm') ? 'available' : '';
    },
  },
  "Old Man's Cave Front": {
    region: 'Death Mountain',
    cave: "Old Man's Cave",
    tag: 'lw',
    x: '45.43%',
    y: '22.62%',
    state(items) {
      return items.access('dm') ? 'available' : '';
    },
  },
  "Old Man's Cave Back": {
    region: 'Death Mountain',
    cave: "Old Man's Cave",
    tag: 'lw',
    x: '53.65%',
    y: '15.84%',
    state(items) {
      return items.access('dm') ? 'available' : '';
    },
  },
  'Spectacle Rock Item Peak': {
    region: 'Death Mountain',
    cave: 'Spectacle Rock Cave',
    tag: 'lw',
    x: '48.63%',
    y: '10.41%',
    state(items) {
      return items.access('dm') ? 'available' : '';
    },
  },
  'Spectacle Rock Item Get': {
    region: 'Death Mountain',
    cave: 'Spectacle Rock Cave',
    tag: 'lw',
    x: '45.89%',
    y: '14.25%',
    state(items) {
      return items.access('dm') ? 'available' : '';
    },
  },
  'Spectacle Rock Exit': {
    region: 'Death Mountain',
    cave: 'Spectacle Rock Cave',
    tag: 'lw',
    x: '48.63%',
    y: '14.71%',
    state(items) {
      return items.access('dm') ? 'available' : '';
    },
  },
  'Paradox Cave Top': {
    region: 'Death Mountain',
    cave: 'Death Mountain Hype Cave',
    tag: 'lw',
    x: '86.53%',
    y: '6.11%',
    state(items) {
      return items.access('dmne') ? 'available' : '';
    },
  },
  'Paradox Cave Bottom': {
    region: 'Death Mountain',
    cave: 'Death Mountain Hype Cave',
    tag: 'lw',
    x: '86.99%',
    y: '21.49%',
    state(items) {
      return items.access('dmeast') ? 'available' : '';
    },
  },
  'Mimic Cave': {
    region: 'Death Mountain',
    cave: 'Mimic Cave',
    tag: 'lw',
    x: '84.93%',
    y: '9.28%',
    state(items) {
      return items.has('mirror') && items.access('dwdmledge') ? 'available' : '';
    },
  },
  'Spiral Cave Top': {
    region: 'Death Mountain',
    cave: 'Spiral Cave',
    tag: 'lw',
    x: '79.00%',
    y: '9.28%',
    state(items) {
      return items.access('dmne') ? 'available' : '';
    },
  },
  'Spiral Cave Bottom': {
    region: 'Death Mountain',
    cave: 'Spiral Cave',
    tag: 'lw',
    x: '79.00%',
    y: '13.35%',
    state(items) {
      return items.access('dmeast') ? 'available' : '';
    },
  },
  'Light World Bitch Door Front': {
    region: 'Death Mountain',
    cave: 'Turtle Rock Safety Cave',
    tag: 'lw',
    x: '82%',
    y: '14.71%',
    state(items) {
      return items.access('dmeast') ? 'available' : '';
    },
  },
  'Light World Bitch Door Exit': {
    region: 'Death Mountain',
    cave: 'Turtle Rock Safety Cave',
    tag: 'lw',
    x: '82%',
    y: '11.31%',
    state(items) {
      return items.access('dmne') ? 'available' : '';
    },
  },
  'Twin Cave Left': {
    region: 'Death Mountain',
    tag: 'lw',
    x: '85.00%',
    y: '14.71%',
    state(items) {
      return items.access('dmeast') ? 'available' : '';
    },
  },
  'Twin Cave Right': {
    region: 'Death Mountain',
    cave: 'Death Mountain Hype Cave',
    tag: 'lw',
    x: '88.00%',
    y: '14.71%',
    state(items) {
      return items.access('dmeast') ? 'available' : '';
    },
  },
  "Witch's Hut": {
    region: 'Light World East',
    cave: "Witch's Hut",
    tag: 'lw',
    x: '82.65%',
    y: '31.90%',
    state() {
      return 'available';
    },
  },
  'Waterfall Fairy': {
    region: 'Light World East',
    cave: 'Waterfall fairy',
    tag: 'lw',
    x: '90.64%',
    y: '14.25%',
    state(items) {
      return items.has('flippers') ? 'available' : '';
    },
  },
  'Tree Cave by Eastern Palace': {
    // definitely
    region: 'Light World East',
    tag: 'lw',
    x: '83.11%',
    y: '64.25%',
    state() {
      return 'available';
    },
  },
  'Cave by Eastern Palace Portal': {
    region: 'Light World East',
    tag: 'lw',
    x: '98.40%',
    y: '70.14%',
    state() {
      return 'available';
    },
  },
  "Sahasrahla's Hut": {
    region: 'Light World East',
    cave: "Sahasrahla's Hut",
    tag: 'lw',
    x: '81.96%',
    y: '43.30%',
    state(items) {
      return 'available';
    },
  },
  'Kakariko Fortune Teller North': {
    region: 'Kakariko',
    tag: 'lw',
    x: '18.72%',
    y: '31.90%',
    state() {
      return 'available';
    },
  },
  "Old Woman's House Left": {
    region: 'Kakariko',
    cave: "Old Woman's House",
    tag: 'lw',
    x: '16.00%',
    y: '41.63%',
    state() {
      return 'available';
    },
  },
  "Old Woman's House Right": {
    region: 'Kakariko',
    cave: "Old Woman's House",
    tag: 'lw',
    x: '19.00%',
    y: '41.63%',
    state() {
      return 'available';
    },
  },
  "Blind's Hut": {
    region: 'Kakariko',
    cave: "Blind's Hut",
    tag: 'lw',
    x: '13.00%',
    y: '41.63%',
    state() {
      return 'available';
    },
  },
  'Kakariko Well Drop': {
    region: 'Kakariko',
    cave: 'Kakariko Well',
    drop: true,
    tag: 'lw',
    x: '2.50%',
    y: '42.53%',
    state() {
      return 'available';
    },
  },
  'Kakariko Well Door': {
    region: 'Kakariko',
    cave: 'Kakariko Well',
    tag: 'lw',
    x: '5.50%',
    y: '42.53%',
    state() {
      return 'available';
    },
  },
  'House West of Bottle Vendor': {
    // definitely
    region: 'Kakariko',
    tag: 'lw',
    x: '5.25%',
    y: '46.61%',
    state() {
      return 'available';
    },
  },
  'House East of Bottle Vendor': {
    // definitely
    region: 'Kakariko',
    tag: 'lw',
    x: '21.23%',
    y: '47.96%',
    state() {
      return 'available';
    },
  },
  'Chicken House': {
    region: 'Kakariko',
    cave: 'Chicken House',
    tag: 'lw',
    x: '9.82%',
    y: '52.94%',
    state() {
      return 'available';
    },
  },
  "Sick Kid's House": {
    region: 'Kakariko',
    cave: 'Sick Kid',
    tag: 'lw',
    x: '15.98%',
    y: '52.94%',
    state() {
      return 'available';
    },
  },
  'House right of sick Kid': {
    region: 'Kakariko',
    tag: 'lw',
    x: '20.32%',
    y: '52.94%',
    state() {
      return 'available';
    },
  },
  'Tavern Back Entrance': {
    region: 'Kakariko',
    cave: 'Back of Tavern',
    tag: 'lw',
    x: '15.75%',
    y: '57.00%',
    state() {
      return 'available';
    },
  },
  'Tavern Front Entrance': {
    region: 'Kakariko',
    tag: 'lw',
    x: '15.75%',
    y: '60.00%',
    state() {
      return 'available';
    },
  },
  'Shop beside Tavern': {
    // definitely
    region: 'Kakariko',
    tag: 'lw',
    x: '11.42%',
    y: '57.24%',
    state() {
      return 'available';
    },
  },
  'Doorless Shed': {
    region: 'Kakariko',
    tag: 'lw',
    x: '2.28%',
    y: '58.82%',
    state(items) {
      return items.has('bomb') ? 'available' : '';
    },
  },
  "Blacksmiths's House": {
    region: 'Kakariko',
    cave: 'Blacksmiths',
    tag: 'lw',
    x: '30.37%',
    y: '52.94%',
    state() {
      return 'available';
    },
  },
  'Bat Cave Drop': {
    region: 'Kakariko',
    cave: 'Bat Cave',
    drop: true,
    tag: 'lw',
    x: '34.05%',
    y: '55.88%',
    state(items) {
      return items.has('hammer') ||
      (items.has('mirror') && items.has('glove2') && items.access('dwwest'))
        ? 'available'
        : '';
    },
  },
  'Bat Cave Door': {
    region: 'Kakariko',
    cave: 'Bat Cave',
    tag: 'lw',
    x: '31.05%',
    y: '55.88%',
    state() {
      return 'available';
    },
  },
  Library: {
    region: 'Kakariko',
    cave: 'Library',
    tag: 'lw',
    x: '15.75%',
    y: '65.38%',
    state() {
      return 'available';
    },
  },
  'Race Game Right': {
    region: 'Kakariko',
    cave: 'Race Game Brothers',
    tag: 'lw',
    x: '14.16%',
    y: '71.27%',
    state() {
      return 'available';
    },
  },
  'Race Game Left': {
    region: 'Kakariko',
    cave: 'Race Game Brothers',
    tag: 'lw',
    x: '10.50%',
    y: '71.27%',
    state(items) {
      return items.has('mirror') && items.access('dwsouth') ? 'available' : '';
    },
  },
  'Kakariko Fortune Teller South': {
    region: 'Kakariko',
    tag: 'lw',
    x: '21.92%',
    y: '70.36%',
    state() {
      return 'available';
    },
  },
  'Lake Hylia Fortune Teller': {
    region: 'Lake Hylia',
    tag: 'lw',
    x: '65.53%',
    y: '80.09%',
    state() {
      return 'available';
    },
  },
  'Cave North of Lake Hylia': {
    region: 'Lake Hylia',
    tag: 'lw',
    x: '73.52%',
    y: '76.47%',
    state() {
      return 'available';
    },
  },
  'Lake Hylia Fairy Cave': {
    region: 'Lake Hylia',
    tag: 'lw',
    x: '80.37%',
    y: '85.07%',
    state(items) {
      return items.has('flippers') ? 'available' : '';
    },
  },
  'Ice Bomb Cave': {
    region: 'Lake Hylia',
    cave: 'Ice Rod Cave',
    tag: 'lw',
    x: '89.95%',
    y: '76.47%',
    state(items) {
      return items.has('bomb') ? 'available' : '';
    },
  },
  'Ice Fairy Cave': {
    region: 'Lake Hylia',
    tag: 'lw',
    x: '92.95%',
    y: '76.47%',
    state() {
      return 'available';
    },
  },
  'Ice Rock Cave': {
    region: 'Lake Hylia',
    cave: 'Small Rupee Farm',
    tag: 'lw',
    x: '91.45%',
    y: '79.47%',
    state(items) {
      return items.has('glove') ? 'available' : '';
    },
  },
  'Mini Moldorm Cave': {
    region: 'Lake Hylia',
    cave: 'Mini Moldorm Cave',
    tag: 'lw',
    x: '65.30%',
    y: '93.67%',
    state(items) {
      return items.has('bomb') ? 'available' : '';
    },
  },
  'South of Grove': {
    region: 'Light World South',
    cave: 'South of Grove',
    tag: 'lw',
    x: '26.48%',
    y: '82.58%',
    state(items) {
      return items.has('mirror') && items.access('dwsouth') ? 'available' : '';
    },
  },
  "Link's House Bonk Rocks": {
    region: 'Light World South',
    tag: 'lw',
    x: '47.72%',
    y: '65.38%',
    state(items) {
      return items.has('boots') ? 'available' : '';
    },
  },
  "Link's House": {
    region: 'Light World South',
    cave: "Link's House",
    tag: 'lw',
    x: '55.25%',
    y: '68.78%',
    state() {
      return 'available';
    },
  },
  'Light World Hype Cave Spot': {
    // maybe
    region: 'Light World South',
    tag: 'lw',
    x: '60.27%',
    y: '77.60%',
    state(items) {
      return items.has('bomb') ? 'available' : '';
    },
  },
  Dam: {
    region: 'Light World South',
    cave: 'Dam',
    tag: 'lw',
    x: '47.26%',
    y: '93.67%',
    state() {
      return 'available';
    },
  },
  'Rock Rupee Cave by Desert': {
    // maybe
    region: 'Desert Area',
    cave: 'Desert Rupee Farm',
    tag: 'lw',
    x: '31.05%',
    y: '95.70%',
    state(items) {
      return items.has('glove') ? 'available' : '';
    },
  },
  'Regular Cave by Desert': {
    // maybe
    region: 'Desert Area',
    tag: 'lw',
    x: '27.63%',
    y: '89.14%',
    state() {
      return 'available';
    },
  },
  "Aginah's Cave": {
    region: 'Desert Area',
    cave: "Aginah's Cave",
    tag: 'lw',
    x: '19.86%',
    y: '82.58%',
    state() {
      return 'available';
    },
  },
  'Checkerboard Cave': {
    region: 'Desert Area',
    cave: 'Checkerboard Cave',
    tag: 'lw',
    x: '17.58%',
    y: '78.05%',
    state(items) {
      return items.access('mire') && items.has('mirror') && items.has('glove') ? 'available' : '';
    },
  },
  'Uncle Drop': {
    region: 'Hyrule Castle',
    cave: 'Uncle',
    tag: 'lw',
    drop: true,
    x: '60.27%',
    y: '41.18%',
    state() {
      return 'available';
    },
  },
  'Uncle Door': {
    region: 'Hyrule Castle',
    cave: 'Uncle',
    tag: 'lw',
    x: '55.48%',
    y: '42.76%',
    state() {
      return 'available';
    },
  },

  // Dark World
  'DW Lumberjack House': {
    region: 'Dark World North',
    tag: 'dw',
    x: '34.25%',
    y: '7.00%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  'Bumper Cave Bottom': {
    region: 'Dark World North',
    cave: 'Bumper Cave',
    tag: 'dw',
    x: '35.16%',
    y: '19.23%',
    state(items) {
      return items.has('glove') && items.access('dwwest') ? 'available' : '';
    },
  },
  'Bumper Cave Top': {
    region: 'Dark World North',
    cave: 'Bumper Cave',
    tag: 'dw',
    x: '35.16%',
    y: '15.38%',
    state() {
      return '';
    },
  },
  'DW Sanctuary Spot': {
    region: 'Dark World North',
    tag: 'dw',
    x: '46.35%',
    y: '26.70%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  'Fire Shield Shop': {
    region: 'Dark World North',
    tag: 'dw',
    x: '33.11%',
    y: '45.25%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  "DW Witch's Hut": {
    region: 'Dark World East',
    tag: 'dw',
    x: '80.37%',
    y: '33.03%',
    state(items) {
      return items.access('dwne') ? 'available' : '';
    },
  },
  'Tree Cave by Palace of Darkness': {
    // maybe
    region: 'Dark World East',
    tag: 'dw',
    x: '83.11%',
    y: '64.25%',
    state(items) {
      return items.access('dweast') ? 'available' : '';
    },
  },
  'DW Cave by Eastern Palace Portal': {
    // maybe
    region: 'Dark World East',
    tag: 'dw',
    x: '98.40%',
    y: '70.14%',
    state(items) {
      return items.access('dweast') ? 'available' : '';
    },
  },
  'Monkey Hut': {
    region: 'Dark World East',
    tag: 'dw',
    x: '84.70%',
    y: '50.68%',
    state(items) {
      return items.access('dweast') ? 'available' : '';
    },
  },
  'Village of Outcasts Fortune Teller': {
    region: 'Village of Outcasts',
    tag: 'dw',
    x: '18.72%',
    y: '31.90%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  'Chest Game': {
    region: 'Village of Outcasts',
    cave: 'Chest Game',
    tag: 'dw',
    x: '5.25%',
    y: '46.61%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  'C House': {
    region: 'Village of Outcasts',
    cave: 'C House',
    tag: 'dw',
    x: '21.23%',
    y: '47.96%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  'Peg House': {
    region: 'Village of Outcasts',
    tag: 'dw',
    x: '20.32%',
    y: '52.94%',
    state(items) {
      return items.has('hammer') && items.access('dwwest') ? 'available' : '';
    },
  },
  'Doorless Hut': {
    region: 'Village of Outcasts',
    cave: 'Doorless Hut',
    tag: 'dw',
    x: '11.42%',
    y: '57.24%',
    state(items) {
      return items.has('bomb') && items.access('dwwest') ? 'available' : '';
    },
  },
  'Peg Cave': {
    region: 'Village of Outcasts',
    cave: 'Peg Cave',
    tag: 'dw',
    x: '31.05%',
    y: '60.63%',
    state(items) {
      return items.has('hammer') && items.has('glove2') && items.access('dwwest')
        ? 'available'
        : '';
    },
  },
  'Bow Game House': {
    region: 'Dark World South',
    tag: 'dw',
    x: '21.92%',
    y: '70.36%',
    state(items) {
      return items.access('dwsouth') ? 'available' : '';
    },
  },
  'Bonk Rocks by Bomb Shop': {
    region: 'Dark World South',
    tag: 'dw',
    x: '47.72%',
    y: '65.38%',
    state(items) {
      return items.has('boots') && items.access('dwsouth') ? 'available' : '';
    },
  },
  'Bomb Shop': {
    region: 'Dark World South',
    cave: 'Bomb Shop',
    tag: 'dw',
    x: '55.25%',
    y: '68.78%',
    state(items) {
      return items.access('dwsouth') ? 'available' : '';
    },
  },
  'Hype Cave': {
    region: 'Dark World South',
    cave: 'Hype Cave',
    tag: 'dw',
    x: '60.27%',
    y: '77.60%',
    state(items) {
      return items.has('bomb') && items.access('dwsouth') ? 'available' : '';
    },
  },
  'DW Lake Hylia House': {
    region: 'Dark World Lake Hylia',
    tag: 'dw',
    x: '65.53%',
    y: '80.09%',
    state(items) {
      return items.access('dwsouth') ? 'available' : '';
    },
  },
  'DW Ice Bomb Cave': {
    region: 'Dark World Lake Hylia',
    tag: 'dw',
    x: '89.95%',
    y: '76.47%',
    state(items) {
      return items.has('moonpearl') &&
      items.has('flippers') &&
      items.has('bomb') &&
      items.access('dweast')
        ? 'available'
        : '';
    },
  },
  'DW Ice Fairy Cave': {
    region: 'Dark World Lake Hylia',
    tag: 'dw',
    x: '92.95%',
    y: '76.47%',
    state(items) {
      return items.has('moonpearl') && items.has('flippers') && items.access('dweast')
        ? 'available'
        : '';
    },
  },
  'DW Ice Rock Cave': {
    region: 'Dark World Lake Hylia',
    tag: 'dw',
    x: '91.45%',
    y: '79.47%',
    state(items) {
      return items.has('moonpearl') &&
      items.has('flippers') &&
      items.has('glove') &&
      items.access('dweast')
        ? 'available'
        : '';
    },
  },
  'Left Mire Head': {
    region: 'Misery Mire Area',
    cave: 'West of Mire',
    tag: 'dw',
    x: '3.67%',
    y: '80.32%',
    state(items) {
      return items.access('mire') ? 'available' : '';
    },
  },
  'Right Mire Head': {
    region: 'Misery Mire Area',
    tag: 'dw',
    x: '10.47%',
    y: '80.32%',
    state(items) {
      return items.access('mire') ? 'available' : '';
    },
  },
  'Mire Cave': {
    region: 'Misery Mire Area',
    tag: 'dw',
    x: '19.86%',
    y: '82.58%',
    state(items) {
      return items.access('mire') ? 'available' : '';
    },
  },
  'Pyramid Fairy': {
    region: 'Pyramid Area',
    cave: 'Fat Fairy',
    tag: 'dw',
    x: '46.80%',
    y: '48.87%',
    state(items) {
      return items.has('crystal56') && items.access('dweast') ? 'available' : '';
    },
  },
  'Ganon Drop': {
    region: 'Pyramid Area',
    cave: "Ganon's Arena",
    drop: true,
    tag: 'dw',
    x: '49.32%',
    y: '41.40%',
    state(items) {
      return items.has('agahnim2') ? 'available' : '';
    },
  },
  'Ganon Door': {
    region: 'Pyramid Area',
    cave: "Ganon's Fall Escape",
    tag: 'dw',
    x: '43.80%',
    y: '48.87%',
    state() {
      return '';
    },
  },
  'Spike Cave': {
    region: 'Dark World Death Mountain',
    cave: 'Spike Cave',
    tag: 'dw',
    x: '57.31%',
    y: '14.93%',
    state(items) {
      return items.access('dm') ? 'available' : '';
    },
  },
  'West DM Fairy Cave': {
    // maybe
    region: 'Dark World Death Mountain',
    tag: 'dw',
    x: '39.95%',
    y: '19.46%',
    state(items) {
      return items.access('dm') ? 'available' : '';
    },
  },
  'DW Twin Cave Left': {
    region: 'Dark World Death Mountain',
    cave: 'Super Bunny Cave',
    tag: 'dw',
    x: '84.02%',
    y: '14.93%',
    state(items) {
      return items.access('dwdmeast') ? 'available' : '';
    },
  },
  'DW Twin Cave Right': {
    region: 'Dark World Death Mountain',
    tag: 'dw',
    x: '87.02%',
    y: '14.93%',
    state(items) {
      return items.access('dwdmeast') ? 'available' : '';
    },
  },
  'DW East DM Upper Exit': {
    region: 'Dark World Death Mountain',
    cave: 'Super Bunny Cave',
    tag: 'dw',
    x: '86.53%',
    y: '6.56%',
    state(items) {
      return items.access('dwdmne') ? 'available' : '';
    },
  },
  'Hookshot Cave Front': {
    region: 'Dark World Death Mountain',
    cave: 'Hookshot Cave',
    tag: 'dw',
    x: '82.88%',
    y: '6.33%',
    state(items) {
      return items.access('dwdmne') ? 'available' : '';
    },
  },
  'Hookshot Cave Back': {
    region: 'Dark World Death Mountain',
    cave: 'Hookshot Cave',
    tag: 'dw',
    x: '80.14%',
    y: '2.04%',
    state(items) {
      return items.access('dwdmisland') ? 'available' : '';
    },
  },

  // Light world dungeons
  'Hyrule Castle Main Entrance': {
    region: 'Hyrule Castle',
    cave: 'Hyrule Castle',
    tag: 'lw',
    x: '50.46%',
    y: '44.12%',
    state() {
      return 'available';
    },
  },
  'Hyrule Castle Left': {
    region: 'Hyrule Castle',
    cave: 'Hyrule Castle',
    tag: 'lw',
    x: '45.53%',
    y: '38.46%',
    state(items) {
      return items.access('hyruletop') ? 'available' : '';
    },
  },
  'Hyrule Castle Right': {
    region: 'Hyrule Castle',
    cave: 'Hyrule Castle',
    tag: 'lw',
    x: '55.48%',
    y: '38.46%',
    state(items) {
      return items.access('hyruletop') ? 'available' : '';
    },
  },
  'Hyrule Castle Agahnim': {
    region: 'Hyrule Castle',
    cave: "Hyrule Castle Aganihm's Tower",
    tag: 'lw',
    x: '50.46%',
    y: '40.05%',
    state(items) {
      return (items.has('sword2') || items.has('cape')) && items.access('hyruletop')
        ? 'available'
        : '';
    },
  },
  'Eastern Palace': {
    region: 'Light World East',
    cave: 'Eastern Palace',
    tag: 'lw',
    x: '96.58%',
    y: '38.69%',
    state() {
      return 'available';
    },
  },
  'Desert Palace Main Entrance': {
    region: 'Desert Area',
    cave: 'Desert Palace Front',
    tag: 'lw',
    x: '7.31%',
    y: '81.22%',
    state(items) {
      return items.has('book') || (items.access('mire') && items.has('mirror')) ? 'available' : '';
    },
  },
  'Desert Palace West': {
    region: 'Desert Area',
    cave: 'Desert Palace Front',
    tag: 'lw',
    x: '3.20%',
    y: '79.19%',
    state(items) {
      return items.access('desertledge') ? 'available' : '';
    },
  },
  'Desert Palace East': {
    region: 'Desert Area',
    cave: 'Desert Palace Front',
    tag: 'lw',
    x: '11.42%',
    y: '79.19%',
    state() {
      return '';
    },
  },
  'Desert Palace Back': {
    region: 'Desert Area',
    cave: 'Desert Palace Back',
    tag: 'lw',
    x: '7.31%',
    y: '76.47%',
    state(items) {
      return items.access('desertledge') && items.has('glove') ? 'available' : '';
    },
  },
  'Tower of Hera': {
    region: 'Death Mountain',
    cave: 'Tower of Hera',
    tag: 'lw',
    x: '56.62%',
    y: '3.85%',
    state(items) {
      return items.access('dmnw') ? 'available' : '';
    },
  },

  // Dark world dungeons
  'Palace of Darkness': {
    region: 'Dark World East',
    cave: 'Palace of Darkness',
    tag: 'dw',
    x: '96.58%',
    y: '38.69%',
    state(items) {
      return items.has('moonpearl') && items.access('dweast') ? 'available' : '';
    },
  },
  'Swamp Palace': {
    region: 'Dark World South',
    cave: 'Swamp Palace',
    tag: 'dw',
    x: '47.26%',
    y: '93.67%',
    state(items) {
      return items.access('dwsouth') ? 'available' : '';
    },
  },
  'Skull Woods Drop Left': {
    region: 'Skull Woods',
    cave: 'Skull Woods First Part',
    drop: true,
    tag: 'dw',
    x: '14.87%',
    y: '17.42%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  'Skull Woods Drop Right': {
    region: 'Skull Woods',
    cave: 'Skull Woods First Part',
    drop: true,
    tag: 'dw',
    x: '19.21%',
    y: '17.19%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  'Skull Woods Drop Back': {
    region: 'Skull Woods',
    cave: 'Skull Woods Second Part',
    drop: true,
    tag: 'dw',
    x: '10.99%',
    y: '8.82%',
    state(items) {
      return items.access('swback') ? 'available' : '';
    },
  },
  'Skull Woods Drop Big Chest': {
    region: 'Skull Woods',
    cave: 'Skull Woods First Part',
    drop: true,
    tag: 'dw',
    x: '19.41%',
    y: '13.12%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  'Skull Woods Front Entrance': {
    region: 'Skull Woods',
    cave: 'Skull Woods First Part',
    tag: 'dw',
    x: '17.12%',
    y: '15.00%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  'Skull Woods Second Entrance': {
    region: 'Skull Woods',
    cave: 'Skull Woods Second Part',
    tag: 'dw',
    x: '13.73%',
    y: '13.80%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  'Skull Woods Exit to Back': {
    region: 'Skull Woods',
    cave: 'Skull Woods Second Part',
    tag: 'dw',
    x: '5.05%',
    y: '12.22%',
    state(items) {
      return items.access('swback') ? 'available' : '';
    },
  },
  'Skull Woods Big Skull': {
    region: 'Skull Woods',
    cave: 'Skull Woods Boss Part',
    tag: 'dw',
    x: '3.00%',
    y: '4.52%',
    state(items) {
      return items.has('firerod') && items.access('swback') ? 'available' : '';
    },
  },
  "Thieve's Town": {
    region: 'Village of Outcasts',
    cave: "Thieve's Town",
    tag: 'dw',
    x: '11.90%',
    y: '47.74%',
    state(items) {
      return items.access('dwwest') ? 'available' : '';
    },
  },
  'Ice Palace': {
    region: 'Dark World Lake Hylia',
    cave: 'Ice Palace',
    tag: 'dw',
    x: '80.37%',
    y: '85.07%',
    state(items) {
      return items.has('flippers') && items.has('glove2') ? 'available' : '';
    },
  },
  'Misery Mire': {
    region: 'Misery Mire Area',
    cave: 'Misery Mire',
    tag: 'dw',
    x: '6.97%',
    y: '81.22%',
    state(items) {
      return items.access('mire') &&
      items.has('sword') &&
      items.has('bombos') &&
      items.has('ether') &&
      items.has('quake') &&
      items.has('moonpearl')
        ? 'available'
        : '';
    },
  },
  'Turtle Rock Main Entrance': {
    region: 'Dark World Death Mountain',
    cave: 'Turtle Rock Main Entrance',
    tag: 'dw',
    x: '93.86%',
    y: '7.47%',
    state(items) {
      return items.access('dwdmne') &&
      items.has('sword') &&
      items.has('bombos') &&
      items.has('ether') &&
      items.has('quake') &&
      items.has('moonpearl')
        ? 'available'
        : '';
    },
  },
  'Turtle Rock Laser Wall': {
    region: 'Dark World Death Mountain',
    cave: 'Turtle Rock Laser Wall',
    tag: 'dw',
    x: '79.00%',
    y: '9.68%',
    state(items) {
      return items.access('dwdmledge') ? 'available' : '';
    },
  },
  'Turtle Rock Big Chest': {
    region: 'Dark World Death Mountain',
    cave: 'Turtle Rock Big Chest',
    tag: 'dw',
    x: '84.93%',
    y: '9.68%',
    state(items) {
      return items.access('dwdmledge') ? 'available' : '';
    },
  },
  'Turtle Rock Boss Entrance': {
    region: 'Dark World Death Mountain',
    cave: 'Turtle Rock Boss Entrance',
    tag: 'dw',
    x: '82.00%',
    y: '11.61%',
    state() {
      return '';
    },
  },
  "Ganon's Tower": {
    region: 'Dark World Death Mountain',
    cave: "Ganon's Tower",
    tag: 'dw',
    x: '56.62%',
    y: '3.85%',
    state(items) {
      return items.has('crystal-all') && items.access('dwdmne') ? 'available' : '';
    },
  },
};
