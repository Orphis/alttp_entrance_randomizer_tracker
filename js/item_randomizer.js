window.item_randomizer = {
  'Death Mountain Hype Cave': {
    count: 7,
    region: 'Death Mountain',
    tag: 'lw',
    entrance: {
      'Paradox Cave Bottom': {
        x: '86.99%',
        y: '21.49%',
        state(items) {
          return items.access('dmeast') ? 'available' : '';
        },
      },
    },
  },
  "Blind's Hut": {
    count: 5,
    region: 'Kakariko',
    tag: 'lw',
    entrance: {
      "Blind's Hut": {
        x: '13.00%',
        y: '41.63%',
        state() {
          return 'available';
        },
      },
    },
  },
  'Mini Moldorm Cave': {
    count: 5,
    region: 'Lake Hylia',
    tag: 'lw',
    entrance: {
      'Mini Moldorm Cave': {
        x: '65.30%',
        y: '93.67%',
        state(items) {
          return items.has('bomb') ? 'available' : '';
        },
      },
    },
  },
  'Hype Cave': {
    count: 5,
    region: 'Dark World South',
    tag: 'dw',
    entrance: {
      'Hype Cave': {
        x: '60.27%',
        y: '77.60%',
        state(items) {
          return items.has('bomb') && items.access('dwsouth') ? 'available' : '';
        },
      },
    },
  },
  'Kakariko Well': {
    count: 5,
    region: 'Kakariko',
    tag: 'lw',
    entrance: {
      'Kakariko Well Drop': {
        drop: true,
        x: '2.50%',
        y: '42.53%',
        state() {
          return 'available';
        },
      },
    },
  },
  'Hookshot Cave': {
    count: 4,
    region: 'Dark World Death Mountain',
    tag: 'dw',
    entrance: {
      'Hookshot Cave Front': {
        x: '82.88%',
        y: '6.33%',
        state(items) {
          return items.access('dwdmne') ? 'available' : '';
        },
      },
    },
  },
  "Sahasrahla's Hut": {
    count: 3,
    region: 'Light World East',
    tag: 'lw',
    entrance: {
      "Sahasrahla's Hut": {
        x: '81.96%',
        y: '43.30%',
        state() {
          return 'available';
        },
      },
    },
  },
  'Sewer Grave': {
    count: 3,
    region: 'Light World North',
    tag: 'lw',
    entrance: {
      'Sewer Grave Drop': {
        drop: true,
        x: '52.74%',
        y: '28.96%',
        state(items) {
          return items.has('glove') ? 'available' : '';
        },
      },
    },
  },
  'Fat Fairy': {
    count: 2,
    region: 'Pyramid Area',
    tag: 'dw',
    entrance: {
      'Pyramid Fairy': {
        x: '46.80%',
        y: '48.87%',
        state(items) {
          return items.has('crystal56') && items.access('dweast') ? 'available' : '';
        },
      },
    },
  },
  'Waterfall fairy': {
    count: 2,
    region: 'Light World East',
    tag: 'lw',
    entrance: {
      'Waterfall Fairy': {
        x: '90.64%',
        y: '14.25%',
        state(items) {
          return items.has('flippers') ? 'available' : '';
        },
      },
    },
  },
  'West of Mire': {
    count: 2,
    region: 'Misery Mire Area',
    tag: 'dw',
    entrance: {
      'Left Mire Head': {
        x: '3.67%',
        y: '80.32%',
        state(items) {
          return items.access('mire') ? 'available' : '';
        },
      },
    },
  },
  'Super Bunny Cave': {
    count: 2,
    region: 'Dark World Death Mountain',
    tag: 'dw',
    entrance: {
      'DW Twin Cave Left': {
        x: '84.02%',
        y: '14.93%',
        state(items) {
          return items.access('dwdmeast') ? 'available' : '';
        },
      },
    },
  },
  Uncle: {
    count: 2,
    region: 'Hyrule Castle',
    tag: 'lw',
    entrance: {
      'Uncle Drop': {
        drop: true,
        x: '60.27%',
        y: '41.18%',
        state() {
          return 'available';
        },
      },
    },
  },
  Sanctuary: {
    count: 1,
    region: 'Light World North',
    tag: 'lw',
    entrance: {
      Sanctuary: {
        x: '46.35%',
        y: '26.70%',
        state() {
          return 'available';
        },
      },
    },
  },
  "Link's House": {
    count: 1,
    region: 'Light World South',
    tag: 'lw',
    entrance: {
      "Link's House": {
        x: '55.25%',
        y: '68.78%',
        state() {
          return 'available';
        },
      },
    },
  },
  "Thief's Hideout": {
    count: 1,
    region: 'Lost Woods',
    tag: 'lw',
    entrance: {
      "Thief's Hideout Drop": {
        drop: true,
        x: '19.41%',
        y: '13.12%',
        state() {
          return 'available';
        },
      },
    },
  },
  'Lumberjack Cave': {
    count: 1,
    region: 'Light World North',
    tag: 'lw',
    entrance: {
      'Lumberjack Cave Drop': {
        drop: true,
        x: '30.37%',
        y: '7.92%',
        state(items) {
          return items.has('agahnim1') && items.has('boots') ? 'available' : '';
        },
      },
    },
  },
  'Ice Rod Cave': {
    count: 1,
    region: 'Lake Hylia',
    tag: 'lw',
    entrance: {
      'Ice Bomb Cave': {
        x: '89.95%',
        y: '76.47%',
        state(items) {
          return items.has('bomb') ? 'available' : '';
        },
      },
    },
  },
  'Checkerboard Cave': {
    count: 1,
    region: 'Desert Area',
    tag: 'lw',
    entrance: {
      'Checkerboard Cave': {
        x: '17.58%',
        y: '78.05%',
        state(items) {
          return items.access('mire') && items.has('mirror') && items.has('glove')
            ? 'available'
            : '';
        },
      },
    },
  },
  "Aginah's Cave": {
    count: 1,
    region: 'Desert Area',
    tag: 'lw',
    entrance: {
      "Aginah's Cave": {
        x: '19.86%',
        y: '82.58%',
        state(items) {
          return items.has('bomb') ? 'available' : '';
        },
      },
    },
  },
  'South of Grove': {
    count: 1,
    region: 'Light World South',
    tag: 'lw',
    entrance: {
      'South of Grove': {
        x: '26.48%',
        y: '82.58%',
        state(items) {
          return items.has('mirror') && items.access('dwsouth') ? 'available' : '';
        },
      },
    },
  },
  'Chicken House': {
    count: 1,
    region: 'Kakariko',
    tag: 'lw',
    entrance: {
      'Chicken House': {
        x: '9.82%',
        y: '52.94%',
        state() {
          return 'available';
        },
      },
    },
  },
  'Back of Tavern': {
    count: 1,
    region: 'Kakariko',
    tag: 'lw',
    entrance: {
      'Tavern Back Entrance': {
        x: '15.75%',
        y: '57.00%',
        state() {
          return 'available';
        },
      },
    },
  },
  Dam: {
    count: 1,
    region: 'Light World South',
    tag: 'lw',
    entrance: {
      Dam: {
        x: '47.26%',
        y: '93.67%',
        state() {
          return 'available';
        },
      },
    },
  },
  'Peg Cave': {
    count: 1,
    region: 'Village of Outcasts',
    tag: 'dw',
    entrance: {
      'Peg Cave': {
        x: '31.05%',
        y: '60.63%',
        state(items) {
          return items.has('hammer') && items.has('glove2') && items.access('dwwest')
            ? 'available'
            : '';
        },
      },
    },
  },
  'Bonk Cave': {
    count: 1,
    region: 'Light World North',
    tag: 'lw',
    entrance: {
      'Sanctuary Bonk Rocks': {
        x: '38.36%',
        y: '29.19%',
        state(items) {
          return items.has('boots') ? 'available' : '';
        },
      },
    },
  },
  "King's Tomb": {
    count: 1,
    region: 'Light World North',
    tag: 'lw',
    entrance: {
      "King's Tomb": {
        x: '60.27%',
        y: '28.96%',
        state(items) {
          return items.has('boots') &&
          (items.has('glove2') || (items.has('mirror') && items.access('dwwest')))
            ? 'available'
            : '';
        },
      },
    },
  },
  'Spectacle Rock Cave': {
    count: 1,
    region: 'Death Mountain',
    tag: 'lw',
    entrance: {
      'Spectacle Rock Item Get': {
        x: '45.89%',
        y: '14.25%',
        state(items) {
          return items.access('dm') ? 'available' : '';
        },
      },
    },
  },
  'C House': {
    count: 1,
    region: 'Village of Outcasts',
    tag: 'dw',
    entrance: {
      'C House': {
        x: '21.23%',
        y: '47.96%',
        state(items) {
          return items.access('dwwest') ? 'available' : '';
        },
      },
    },
  },
  'Doorless Hut': {
    count: 1,
    region: 'Village of Outcasts',
    tag: 'dw',
    entrance: {
      'Doorless Hut': {
        x: '11.42%',
        y: '57.24%',
        state(items) {
          return items.has('bomb') && items.access('dwwest') ? 'available' : '';
        },
      },
    },
  },
  'Chest Game': {
    count: 1,
    region: 'Village of Outcasts',
    tag: 'dw',
    entrance: {
      'Chest Game': {
        x: '5.25%',
        y: '46.61%',
        state(items) {
          return items.access('dwwest') ? 'available' : '';
        },
      },
    },
  },
  'Spike Cave': {
    count: 1,
    region: 'Dark World Death Mountain',
    tag: 'dw',
    entrance: {
      'Spike Cave': {
        x: '57.31%',
        y: '14.93%',
        state(items) {
          if (items.state.mode === 'entrance') return items.access('dm') ? 'available' : '';
          return items.access('dm') &&
          items.has('moonpearl') &&
          items.has('hammer') &&
          items.has('glove')
            ? 'available'
            : '';
        },
      },
    },
  },
  'Spiral Cave': {
    count: 1,
    region: 'Death Mountain',
    tag: 'lw',
    entrance: {
      'Spiral Cave Top': {
        x: '79.00%',
        y: '9.28%',
        state(items) {
          return items.access('dmne') ? 'available' : '';
        },
      },
    },
  },
  'Mimic Cave': {
    count: 1,
    region: 'Death Mountain',
    tag: 'lw',
    entrance: {
      'Mimic Cave': {
        x: '84.93%',
        y: '9.28%',
        state(items) {
          return items.has('mirror') && items.has('hammer') && items.access('dwdmledge')
            ? 'available'
            : '';
        },
      },
    },
  },
  'Graveyard Cliff': {
    count: 1,
    region: 'Light World North',
    tag: 'lw',
    entrance: {
      'Graveyard Cliff': {
        x: '57.53%',
        y: '27.38%',
        state(items) {
          return items.has('mirror') && items.access('dwwest') ? 'available' : '';
        },
      },
    },
  },
  Library: {
    count: 1,
    region: 'Kakariko',
    tag: 'lw',
    entrance: {
      Library: {
        x: '15.75%',
        y: '65.38%',
        state() {
          return 'available';
        },
      },
    },
  },
  'Bat Cave': {
    count: 1,
    region: 'Kakariko',
    tag: 'lw',
    entrance: {
      'Bat Cave Drop': {
        drop: true,
        x: '34.05%',
        y: '55.88%',
        state(items) {
          return items.has('hammer') ||
          (items.has('mirror') && items.has('glove2') && items.access('dwwest'))
            ? 'available'
            : '';
        },
      },
    },
  },
  'Sick Kid': {
    count: 1,
    region: 'Kakariko',
    tag: 'lw',
    entrance: {
      "Sick Kid's House": {
        x: '15.98%',
        y: '52.94%',
        state(items) {
          return items.has('bottle') ? 'available' : '';
        },
      },
    },
  },
  "Witch's Hut": {
    count: 1,
    region: 'Light World East',
    tag: 'lw',
    entrance: {
      "Witch's Hut": {
        x: '82.65%',
        y: '31.90%',
        state() {
          return 'available';
        },
      },
    },
  },
  "Old Man's Cave": {
    count: 1,
    region: 'Death Mountain',
    tag: 'lw',
    entrance: {
      "Old Man's Cave Front": {
        x: '45.43%',
        y: '22.62%',
        state(items) {
          return items.access('dm') ? 'available' : '';
        },
      },
    },
  },

  // Light world dungeons
  'Hyrule Castle': {
    count: 4,
    region: 'Hyrule Castle',
    tag: 'lw',
    dungeon: true,
    entrance: {
      'Hyrule Castle Main Entrance': {
        x: '50.46%',
        y: '44.12%',
        state() {
          return 'available';
        },
      },
    },
  },
  "Hyrule Castle Aganihm's Tower": {
    count: 0,
    region: 'Hyrule Castle',
    tag: 'lw',
    dungeon: true,
    entrance: {
      'Hyrule Castle Agahnim': {
        x: '50.46%',
        y: '40.05%',
        state(items) {
          return items.has('sword2') || items.has('cape') ? 'available' : '';
        },
      },
    },
  },
  'Eastern Palace': {
    count: 3,
    region: 'Light World East',
    tag: 'lw',
    dungeon: true,
    entrance: {
      'Eastern Palace': {
        x: '96.58%',
        y: '38.69%',
        state() {
          return 'available';
        },
      },
    },
  },
  'Desert Palace Front': {
    count: 2,
    region: 'Desert Area',
    tag: 'lw',
    dungeon: true,
    entrance: {
      'Desert Palace Main Entrance': {
        x: '7.31%',
        y: '81.22%',
        state(items) {
          return items.has('book') || (items.access('mire') && items.has('mirror'))
            ? 'available'
            : '';
        },
      },
    },
  },
  'Tower of Hera': {
    count: 2,
    region: 'Death Mountain',
    tag: 'lw',
    dungeon: true,
    entrance: {
      'Tower of Hera': {
        x: '56.62%',
        y: '3.85%',
        state(items) {
          return items.access('dmnw') ? 'available' : '';
        },
      },
    },
  },

  // Dark world dungeons
  'Palace of Darkness': {
    count: 5,
    region: 'Dark World East',
    tag: 'dw',
    dungeon: true,
    entrance: {
      'Palace of Darkness': {
        x: '96.58%',
        y: '38.69%',
        state(items) {
          return items.has('moonpearl') && items.access('dweast') ? 'available' : '';
        },
      },
    },
  },
  'Swamp Palace': {
    count: 6,
    region: 'Dark World South',
    tag: 'dw',
    dungeon: true,
    entrance: {
      'Swamp Palace': {
        x: '47.26%',
        y: '93.67%',
        state(items) {
          return items.access('dwsouth') && items.has('mirror') && items.has('flippers') ? 'available' : '';
        },
      },
    },
  },
  'Skull Woods': {
    count: 2,
    region: 'Skull Woods',
    tag: 'dw',
    dungeon: true,
    entrance: {
      'Skull Woods Front Entrance': {
        x: '17.12%',
        y: '15.00%',
        state(items) {
          return items.access('dwwest') ? 'available' : '';
        },
      },
    },
  },
  "Thieve's Town": {
    count: 4,
    region: 'Village of Outcasts',
    tag: 'dw',
    dungeon: true,
    entrance: {
      "Thieve's Town": {
        x: '11.90%',
        y: '47.74%',
        state(items) {
          return items.access('dwwest') ? 'available' : '';
        },
      },
    },
  },
  'Ice Palace': {
    count: 3,
    region: 'Dark World Lake Hylia',
    tag: 'dw',
    dungeon: true,
    entrance: {
      'Ice Palace': {
        x: '80.37%',
        y: '85.07%',
        state(items) {
          return items.has('flippers') && items.has('glove2') ? 'available' : '';
        },
      },
    },
  },
  'Misery Mire': {
    count: 2,
    region: 'Misery Mire Area',
    tag: 'dw',
    dungeon: true,
    entrance: {
      'Misery Mire': {
        x: '6.97%',
        y: '81.22%',
        state(items) {
          if (!items.access('mire')) return '';
          return items.has('sword') &&
          items.has('bombos') &&
          items.has('ether') &&
          items.has('quake') &&
          items.has('moonpearl')
            ? 'available'
            : 'visible';
        },
      },
    },
  },
  'Turtle Rock': {
    count: 5,
    region: 'Dark World Death Mountain',
    tag: 'dw',
    dungeon: true,
    entrance: {
      'Turtle Rock Main Entrance': {
        x: '93.86%',
        y: '7.47%',
        state(items) {
          if (items.access('turtlerock')) return 'available';
          return items.access('dwdmne') ? 'visible' : '';
        },
      },
    },
  },
  "Ganon's Tower": {
    count: 20,
    region: 'Dark World Death Mountain',
    tag: 'dw',
    dungeon: true,
    entrance: {
      "Ganon's Tower": {
        x: '56.62%',
        y: '3.85%',
        state(items) {
          return items.has('crystal-all') && items.access('dwdmne') ? 'available' : '';
        },
      },
    },
  },
  "Ganon's Arena": {
    count: 0,
    region: 'Pyramid Area',
    tag: 'dw',
    entrance: {
      'Ganon Drop': {
        drop: true,
        x: '49.32%',
        y: '41.40%',
        state(items) {
          return items.has('agahnim2') ? 'available' : '';
        },
      },
    },
  },
};
