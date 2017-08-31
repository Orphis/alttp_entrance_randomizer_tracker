window.overworldLocations = {
  Pedestal: {
    region: 'Lost Woods',
    tag: 'lw',
    x: '3.88%',
    y: '5.20%',
    isOverworld: true,
    state(items) {
      return items.has('book') ? 'visible' : '';
    },
  },
  Mushroom: {
    region: 'Lost Woods',
    tag: 'lw',
    x: '12.33%',
    y: '8.60%',
    state() {
      return 'available';
    },
  },
  'Spectacle Rock Item': {
    region: 'Death Mountain',
    tag: 'lw',
    x: '51.64%',
    y: '8.60%',
    state(items) {
      return items.access('dm') && items.has('mirror') ? 'available' : '';
    },
  },
  'Ether Tablet': {
    region: 'Death Mountain',
    tag: 'lw',
    x: '42.47%',
    y: '2.04%',
    state(items) {
      return items.has('book') && items.has('sword2') && items.access('dmnw') ? 'available' : '';
    },
  },
  'Floating Island': {
    region: 'Death Mountain',
    tag: 'lw',
    x: '81.96%',
    y: '2.26%',
    state(items) {
      if (items.has('mirror') && items.access('dwdmisland')) return 'available';
      return items.access('dmne') ? 'visible' : '';
    },
  },
  'Bottle Vendor': {
    region: 'Kakariko',
    tag: 'lw',
    x: '9.13%',
    y: '47.96%',
    state() {
      return 'available';
    },
  },
  'Race game reward': {
    region: 'Kakariko',
    tag: 'lw',
    x: '3.65%',
    y: '69.00%',
    state(items) {
      return items.has('mirror') && items.access('dwsouth') ? 'available' : 'visible';
    },
  },
  'Shovel dig': {
    region: 'Light World South',
    tag: 'lw',
    x: '29.45%',
    y: '66.29%',
    state(items) {
      return items.has('shovel') ? 'available' : '';
    },
  },
  'Dam sunken item': {
    region: 'Light World South',
    tag: 'lw',
    x: '44.98%',
    y: '91.40%',
    state() {
      return 'visible';
    },
  },
  'Desert Ledge': {
    region: 'Desert Area',
    tag: 'lw',
    x: '2.51%',
    y: '91.86%',
    state(items) {
      if (items.access('desertledge')) return 'available';
      return 'visible';
    },
  },
  'Bombos Tablet': {
    region: 'Desert Area',
    tag: 'lw',
    x: '22.15%',
    y: '92.53%',
    state(items) {
      return items.has('mirror') &&
      items.has('book') &&
      items.has('sword2') &&
      items.access('dwsouth')
        ? 'available'
        : '';
    },
  },
  'Lake Hylia Island': {
    region: 'Lake Hylia',
    tag: 'lw',
    x: '73.06%',
    y: '83.26%',
    state(items) {
      if (items.has('mirror') && items.has('flippers') && items.access('dweast')) {
        return 'available';
      }
      return items.has('flippers') ? 'visible' : '';
    },
  },
  'Hobo under the bridge': {
    region: 'Lake Hylia',
    tag: 'lw',
    x: '70.00%',
    y: '69.91%',
    state(items) {
      return items.has('flippers') ? 'available' : '';
    },
  },
  Zora: {
    region: 'Light World East',
    tag: 'lw',
    x: '96.80%',
    y: '14.93%',
    state(items) {
      return items.has('flippers') || items.has('glove') ? 'available' : '';
    },
  },
  'Zora Ledge': {
    region: 'Light World East',
    tag: 'lw',
    x: '96.80%',
    y: '17.93%',
    state(items) {
      if (items.has('flippers')) return 'available';
      return items.has('glove') ? 'visible' : '';
    },
  },
  'Digging game': {
    region: 'Village of Outcasts',
    tag: 'dw',
    x: '4.11%',
    y: '68.55%',
    state(items) {
      return items.access('dwsouth') ? 'available' : '';
    },
  },
  'Purple Chest': {
    region: 'Village of Outcasts',
    tag: 'dw',
    x: '29.91%',
    y: '53.17%',
    state(items) {
      return items.has('glove2') && items.access('dwwest') ? 'available' : '';
    },
  },
  'Blacksmith frog': {
    region: 'Village of Outcasts',
    tag: 'dw',
    x: '13.50%',
    y: '66.97%',
    state(items) {
      return items.has('glove2') && items.access('dwwest') ? 'available' : '';
    },
  },
  'Haunted Grove': {
    region: 'Dark World South',
    tag: 'dw',
    x: '29.91%',
    y: '69.00%',
    state(items) {
      return items.access('dwsouth') ? 'available' : '';
    },
  },
  'Pyramid Item': {
    region: 'Pyramid Area',
    tag: 'dw',
    x: '57.53%',
    y: '45.48%',
    state(items) {
      return items.access('dweast') ? 'available' : '';
    },
  },
  Catfish: {
    region: 'Dark World East',
    tag: 'dw',
    x: '91.32%',
    y: '17.87%',
    state(items) {
      return items.has('glove') && items.access('dwne') ? 'available' : '';
    },
  },
  'Bumper Cave Ledge Item': {
    region: 'Dark World North',
    tag: 'dw',
    x: '32.16%',
    y: '15.38%',
    state(items) {
      if (items.access('dwbumpexit')) return 'available';
      return items.access('dwwest') ? 'visible' : '';
    },
  },
};
