import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import tmi from 'tmi.js';

import State from './State';
import LocationTracker from './LocationTracker';
import ItemTracker from './ItemTracker';

const state = new State();
state.load();

const itemTracker = new ItemTracker(state);
// eslint-disable-next-line
const locationTracker = new LocationTracker(state, itemTracker);

const options = {
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: state.twitch.user,
    password: state.twitch.password,
  },
  channels: [`#${state.twitch.user}`],
};

// eslint-disable-next-line no-undef, new-cap
const client = new tmi.client(options);
client.on('message', (channel, userstate, message) => {
  const tokens = message
    .split(' ')
    .map(s => s.trim().toLowerCase())
    .filter(s => s !== '');

  if (tokens[0] !== '!tracker') return;

  const item = tokens[1];
  let itemValue;

  if (state.getItemList().indexOf(item) < 0) {
    console.log(`Ignoring tracker command for invalid item '${item}'`);
    return;
  }

  switch (tokens[2]) {
    case undefined:
    case 'on':
      itemValue = 1;
      break;
    case 'off':
      itemValue = 0;
      break;
    default:
      itemValue = tokens[2] ? Number.parseInt(tokens[2], 10) : 1;
  }

  const specialItems = { glove: 2, sword: 4, mail: 2, shield: 3, agahnim: 3 };
  if (specialItems[item]) {
    itemValue = Math.min(itemValue, specialItems[item]);
  }
  itemValue = Math.max(0, itemValue);

  state.setItem(item, itemValue);
});

if (options.identity.username && options.identity.password) client.connect();
