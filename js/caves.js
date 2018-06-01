window.caves = {
  Useless: {
    count: 0,
    entrance: {
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
      'Lumberjack House': {
        region: 'Light World North',
        tag: 'lw',
        x: '34.25%',
        y: '7.00%',
        state() {
          return 'available';
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
      'Kakariko Fortune Teller North': {
        region: 'Kakariko',
        tag: 'lw',
        x: '18.72%',
        y: '31.90%',
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
      'House right of sick Kid': {
        region: 'Kakariko',
        tag: 'lw',
        x: '20.32%',
        y: '52.94%',
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
      'Ice Fairy Cave': {
        region: 'Lake Hylia',
        tag: 'lw',
        x: '92.95%',
        y: '76.47%',
        state() {
          return 'available';
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
      'Peg House': {
        region: 'Village of Outcasts',
        tag: 'dw',
        x: '20.32%',
        y: '52.94%',
        state(items) {
          return items.has('hammer') && items.access('dwwest') ? 'available' : '';
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
      'DW Twin Cave Right': {
        region: 'Dark World Death Mountain',
        tag: 'dw',
        x: '87.02%',
        y: '14.93%',
        state(items) {
          return items.access('dwdmeast') ? 'available' : '';
        },
      },
    },
  },
  'Death Mountain Hype Cave': {
    count: 7,
    region: 'Death Mountain',
    tag: 'lw',
    entrance: {
      'Paradox Cave Top': {
        x: '86.53%',
        y: '6.11%',
        state(items) {
          return items.access('dmne') ? 'available' : '';
        },
      },
      'Paradox Cave Bottom': {
        x: '86.99%',
        y: '21.49%',
        state(items) {
          return items.access('dmeast') ? 'available' : '';
        },
      },
      'Twin Cave Right': {
        x: '88.00%',
        y: '14.71%',
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
      'Kakariko Well Door': {
        x: '5.50%',
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
      'Hookshot Cave Back': {
        x: '80.14%',
        y: '2.04%',
        state(items) {
          return items.access('dwdmisland') ? 'available' : '';
        },
      },
    },
  },
  "Sahasrahla's Hut": {
    count: 4,
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
      'DW East DM Upper Exit': {
        x: '86.53%',
        y: '6.56%',
        state(items) {
          return items.access('dwdmne') ? 'available' : '';
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
      'Uncle Door': {
        x: '55.48%',
        y: '42.76%',
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
      "Thief's Hideout Door": {
        x: '17.12%',
        y: '16.74%',
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
      'Lumberjack Cave Door': {
        x: '34.25%',
        y: '3.62%',
        state() {
          return 'available';
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
        state() {
          return 'available';
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
      'Spectacle Rock Item Peak': {
        x: '48.63%',
        y: '10.41%',
        state(items) {
          return items.access('dm') ? 'available' : '';
        },
      },
      'Spectacle Rock Item Get': {
        x: '45.89%',
        y: '14.25%',
        state(items) {
          return items.access('dm') ? 'available' : '';
        },
      },
      'Spectacle Rock Exit': {
        x: '48.63%',
        y: '14.71%',
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
          return items.access('dm') ? 'available' : '';
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
      'Spiral Cave Bottom': {
        x: '79.00%',
        y: '13.35%',
        state(items) {
          return items.access('dmeast') ? 'available' : '';
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
          return items.has('mirror') && items.access('dwdmledge') ? 'available' : '';
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
  Blacksmiths: {
    count: 1,
    region: 'Kakariko',
    tag: 'lw',
    entrance: {
      "Blacksmiths's House": {
        x: '30.37%',
        y: '52.94%',
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
      'Bat Cave Door': {
        x: '31.05%',
        y: '55.88%',
        state() {
          return 'available';
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
        state() {
          return 'available';
        },
      },
    },
  },
  'Death Mountain upwards': {
    count: 1,
    tag: 'lw',
    entrance: {
      'Death Mountain Entrance Front': {
        region: 'Light World North',
        x: '35.16%',
        y: '19.23%',
        state(items) {
          return items.has('glove') ? 'available' : '';
        },
      },
      'Death Mountain Entrance Back': {
        region: 'Death Mountain',
        x: '40.64%',
        y: '19.23%',
        state(items) {
          return items.access('dm') ? 'available' : '';
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
  'Bomb Shop': {
    count: 0,
    region: 'Dark World South',
    tag: 'dw',
    entrance: {
      'Bomb Shop': {
        x: '55.25%',
        y: '68.78%',
        state(items) {
          return items.access('dwsouth') ? 'available' : '';
        },
      },
    },
  },
  'Small Rupee Farm': {
    count: 0,
    region: 'Lake Hylia',
    tag: 'lw',
    entrance: {
      'Ice Rock Cave': {
        x: '91.45%',
        y: '79.47%',
        state(items) {
          return items.has('glove') ? 'available' : '';
        },
      },
    },
  },
  'Desert Rupee Farm': {
    count: 0,
    region: 'Desert Area',
    tag: 'lw',
    entrance: {
      'Rock Rupee Cave by Desert': {
        x: '31.05%',
        y: '95.70%',
        state(items) {
          return items.has('glove') ? 'available' : '';
        },
      },
    },
  },

  // Multiple Entrances but no chests
  'Death Mountain downwards': {
    count: 0,
    tag: 'lw',
    entrance: {
      'Death Mountain Exit Back': {
        region: 'Light World North',
        x: '35.16%',
        y: '15.38%',
        state(items) {
          return items.access('dmexit') || (items.has('mirror') && items.access('dwbumpexit'))
            ? 'available'
            : '';
        },
      },
      'Death Mountain Exit Front': {
        region: 'Death Mountain',
        x: '39.50%',
        y: '14.03%',
        state(items) {
          return items.access('dm') ? 'available' : '';
        },
      },
    },
  },
  "Old Woman's House": {
    count: 0,
    region: 'Kakariko',
    tag: 'lw',
    entrance: {
      "Old Woman's House Left": {
        x: '16.00%',
        y: '41.63%',
        state() {
          return 'available';
        },
      },
      "Old Woman's House Right": {
        x: '19.00%',
        y: '41.63%',
        state() {
          return 'available';
        },
      },
    },
  },
  'Race Game Brothers': {
    count: 0,
    region: 'Kakariko',
    tag: 'lw',
    entrance: {
      'Race Game Right': {
        x: '14.16%',
        y: '71.27%',
        state() {
          return 'available';
        },
      },
      'Race Game Left': {
        x: '10.50%',
        y: '71.27%',
        state(items) {
          return items.has('mirror') && items.access('dwsouth') ? 'available' : '';
        },
      },
    },
  },
  'East of Graveyard': {
    count: 0,
    region: 'Light World North',
    tag: 'lw',
    entrance: {
      'East of Graveyard Drop': {
        drop: true,
        x: '64.61%',
        y: '30.54%',
        state() {
          return 'available';
        },
      },
      'East of Graveyard Door': {
        x: '67.61%',
        y: '27.54%',
        state() {
          return 'available';
        },
      },
    },
  },
  'Bumper Cave': {
    count: 0,
    region: 'Dark World North',
    tag: 'dw',
    entrance: {
      'Bumper Cave Bottom': {
        x: '35.16%',
        y: '19.23%',
        state(items) {
          return items.has('glove') && items.access('dwwest') ? 'available' : '';
        },
      },
      'Bumper Cave Top': {
        x: '35.16%',
        y: '15.38%',
        state() {
          return '';
        },
      },
    },
  },
  "Old Man's Cave": {
    count: 0,
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
      "Old Man's Cave Back": {
        x: '53.65%',
        y: '15.84%',
        state(items) {
          return items.access('dm') ? 'available' : '';
        },
      },
    },
  },
  'Turtle Rock Safety Cave': {
    count: 0,
    region: 'Death Mountain',
    tag: 'lw',
    entrance: {
      'Light World Bitch Door Front': {
        x: '82%',
        y: '14.71%',
        state(items) {
          return items.access('dmeast') ? 'available' : '';
        },
      },
      'Light World Bitch Door Exit': {
        x: '82%',
        y: '11.31%',
        state(items) {
          return items.access('dmne') ? 'available' : '';
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
      'Hyrule Castle Left': {
        x: '45.53%',
        y: '38.46%',
        state(items) {
          return items.access('hyruletop') ? 'available' : '';
        },
      },
      'Hyrule Castle Right': {
        x: '55.48%',
        y: '38.46%',
        state(items) {
          return items.access('hyruletop') ? 'available' : '';
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
          return (items.has('sword2') || items.has('cape')) && items.access('hyruletop')
            ? 'available'
            : '';
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
      'Desert Palace West': {
        x: '3.20%',
        y: '79.19%',
        state(items) {
          return items.access('desertledge') ? 'available' : '';
        },
      },
      'Desert Palace East': {
        x: '11.42%',
        y: '79.19%',
        state() {
          return '';
        },
      },
    },
  },
  'Desert Palace Back': {
    count: 1,
    region: 'Desert Area',
    tag: 'lw',
    dungeon: true,
    entrance: {
      'Desert Palace Back': {
        x: '7.31%',
        y: '76.47%',
        state(items) {
          return items.access('desertledge') && items.has('glove') ? 'available' : '';
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
          return items.access('dwsouth') ? 'available' : '';
        },
      },
    },
  },
  'Skull Woods First Part': {
    count: 2,
    region: 'Skull Woods',
    tag: 'dw',
    dungeon: true,
    entrance: {
      'Skull Woods Drop Left': {
        drop: true,
        x: '14.87%',
        y: '17.42%',
        state(items) {
          return items.access('dwwest') ? 'available' : '';
        },
      },
      'Skull Woods Drop Right': {
        drop: true,
        x: '19.21%',
        y: '17.19%',
        state(items) {
          return items.access('dwwest') ? 'available' : '';
        },
      },
      'Skull Woods Drop Big Chest': {
        drop: true,
        x: '19.41%',
        y: '13.12%',
        state(items) {
          return items.access('dwwest') ? 'available' : '';
        },
      },
      'Skull Woods Front Entrance': {
        x: '17.12%',
        y: '15.00%',
        state(items) {
          return items.access('dwwest') ? 'available' : '';
        },
      },
    },
  },
  'Skull Woods Second Part': {
    count: 1,
    region: 'Skull Woods',
    tag: 'dw',
    dungeon: true,
    entrance: {
      'Skull Woods Drop Back': {
        drop: true,
        x: '10.99%',
        y: '8.82%',
        state(items) {
          return items.access('swback') ? 'available' : '';
        },
      },
      'Skull Woods Second Entrance': {
        x: '13.73%',
        y: '13.80%',
        state(items) {
          return items.access('dwwest') ? 'available' : '';
        },
      },
      'Skull Woods Exit to Back': {
        x: '5.05%',
        y: '12.22%',
        state(items) {
          return items.access('swback') ? 'available' : '';
        },
      },
    },
  },
  'Skull Woods Boss Part': {
    count: 2,
    region: 'Skull Woods',
    tag: 'dw',
    dungeon: true,
    entrance: {
      'Skull Woods Big Skull': {
        x: '3.00%',
        y: '4.52%',
        state(items) {
          return items.has('firerod') && items.access('swback') ? 'available' : '';
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
          return items.access('miredungeon')
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
          if (
            items.access('turtlerock')
          ) { return 'available'; }

          return items.access('dwdmne') ? 'visible' : '';
        },
      },
      'Turtle Rock Laser Wall': {
        x: '79.00%',
        y: '9.68%',
        state(items) {
          return items.access('dwdmledge') ? 'available' : '';
        },
      },
      'Turtle Rock Big Chest': {
        x: '84.93%',
        y: '9.68%',
        state(items) {
          return items.access('dwdmledge') ? 'available' : '';
        },
      },
      'Turtle Rock Boss Entrance': {
        x: '82.00%',
        y: '11.61%',
        state() {
          return '';
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
  "Ganon's Fall Escape": {
    count: 0,
    region: 'Pyramid Area',
    tag: 'dw',
    entrance: {
      'Ganon Door': {
        x: '43.80%',
        y: '48.87%',
        state() {
          return '';
        },
      },
    },
  },
};
