import '../css/item_pretty.css';
import '../css/bosses.css';
import '../css/styles.css';

class ItemTracker {
  constructor(state) {
    this.state = state;

    this.ui = {
      tracker: $('#item_tracker'),
      items: {},
    };

    this.items = {
      bow: ['bow', 'silverarrows', 'bow', 'bow-silverarrows'],
      'boomerang-red': ['boomerang-both', 'boomerang', 'boomerang-red', 'boomerang-both'],
      powder: ['mushroom-powder', 'mushroom', 'powder', 'mushroom-powder'],
      flute: ['shovel-flute', 'shovel', 'flute', 'shovel-flute'],
      glove: ['glove', 'glove', 'glove2'],
      agahnim: ['agahnim', 'agahnim1', 'agahnim2', 'agahnim1-agahnim2'],
      mail: ['mail', 'mail2', 'mail3'],
      sword: ['none', 'sword1', 'sword2', 'sword2-tempered', 'sword2-butter'],
      shield: ['none', 'shield1', 'shield2', 'shield3'],
    };

    this.ignoredItems = ['silverarrows', 'boomerang', 'shovel', 'mushroom'];
    this.pluralItems = ['sword', 'mail', 'shield', 'glove', 'agahnim'];

    this.pairedItem = {
      bow: 'silverarrows',
      'boomerang-red': 'boomerang',
      powder: 'mushroom',
      flute: 'shovel',
    };
    this.rewardMapping = [
      'reward-unknown',
      'reward-crystal',
      'reward-crystal56',
      'reward-pendant-green',
      'reward-pendant-bluered',
    ];

    this.dungeonItems = {};
    for (let i = 0; i < 10; i += 1) {
      this.dungeonItems[`boss${i}`] = ['none', `boss${i}`];
      this.dungeonItems[`boss${i}reward`] = [
        'reward-unknown',
        'reward-crystal',
        'reward-crystal56',
        'reward-pendant-green',
        'reward-pendant-bluered',
      ];
      const dungeonChests = [];
      for (let j = this.state.getDungeonState(i, 'totalCount'); j >= 0; j -= 1) {
        dungeonChests.push(`chest${j}`);
      }
      this.dungeonItems[`boss${i}chest`] = dungeonChests;
    }

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

    for (const itemName of this.state.getItemList()) {
      if (this.ignoredItems.indexOf(itemName) >= 0) continue;

      const div = $(document.createElement('div'));
      this.ui.items[itemName] = div;
      this.ui.tracker.append(div);

      div.addClass('item');
      div.addClass('item-pretty');
      div.addClass(itemName);
      div.data('item', itemName);
      this.refreshItem(itemName);
      div.click((event) => {
        event.preventDefault();

        const clickedItemName = $(event.currentTarget).data('item');
        const clickedItemState = this.safeGetItem(clickedItemName);
        console.log(`Clicked on item: ${clickedItemName}`);

        if (this.pairedItem[clickedItemName]) {
          let pairedState = 0;
          pairedState += clickedItemState ? 2 : 0;
          pairedState += this.safeGetItem(this.pairedItem[clickedItemName]) ? 1 : 0;
          pairedState = (pairedState + 1) % 4;

          this.state.setItem(this.pairedItem[clickedItemName], pairedState & 1);
          this.state.setItem(clickedItemName, pairedState & 2 ? 1 : 0);
        } else if (this.pluralItems.indexOf(clickedItemName) >= 0) {
          this.state.setItem(
            clickedItemName,
            (clickedItemState + 1) % this.items[clickedItemName].length,
          );
        } else {
          let maxState = 2;
          if (this.pluralItems[clickedItemName]) maxState = this.pluralItems[clickedItemName];

          const newItemState = (clickedItemState + 1) % maxState;
          this.state.setItem(clickedItemName, newItemState);
        }
      });
      this.state.addOnItemChanged(
        function itemChanged(itemTracker) {
          const changedItemName = this.data('item');
          itemTracker.refreshItem(changedItemName);
        }.bind(div, this),
      );
    }

    for (const dungeonItem of Object.keys(this.dungeonItems)) {
      const div = $(document.createElement('div'));
      this.ui.items[dungeonItem] = div;
      this.ui.tracker.append(div);

      div.addClass('item');
      div.addClass('bosses');
      div.data('item', dungeonItem);
      this.refreshDungeonItem(dungeonItem);
      div.click((event) => {
        event.preventDefault();

        const clickedItemName = $(event.currentTarget).data('item');
        let key;
        if (clickedItemName.endsWith('reward')) key = 'reward';
        else if (clickedItemName.endsWith('chest')) key = 'count';
        else key = 'done';

        const dungeonID = Number.parseInt(clickedItemName.replace('boss', ''), 10);

        const clickedItemState = this.state.getDungeonState(dungeonID, key);
        console.log(`Clicked on item: ${clickedItemName}`);

        const maxState = this.dungeonItems[clickedItemName].length;

        const newItemState = (clickedItemState + 1) % maxState;
        this.state.setDungeonState(dungeonID, key, newItemState);
      });
      this.state.addOnItemChanged(
        function itemChanged(itemTracker) {
          const changedItemName = this.data('item');
          itemTracker.refreshDungeonItem(changedItemName);
        }.bind(div, this),
      );
    }
  }

  safeGetItem(item) {
    const value = this.state.getItem(item);
    return value;
  }

  refreshDungeonItem(item) {
    const div = this.ui.items[item];

    const dungeonID = Number.parseInt(item.replace('boss', ''), 10);
    let key;
    if (item.endsWith('reward')) key = 'reward';
    else if (item.endsWith('chest')) key = 'count';
    else key = 'done';

    const itemState = this.dungeonItems[item][this.state.getDungeonState(dungeonID, key)];

    for (const value of this.dungeonItems[item]) {
      div.removeClass(value);
    }
    div.removeClass('item_missing');
    div.addClass(item);

    if (item.endsWith('reward') || item.endsWith('chest')) {
      div.addClass(item);
      div.addClass(itemState);
    } else if (itemState === 'none') {
      div.addClass(item);
      div.addClass('item_missing');
    } else {
      div.addClass(itemState);
    }
  }

  refreshItem(item) {
    const div = this.ui.items[item];
    let itemState = this.safeGetItem(item);

    div.removeClass('item_missing');

    if (this.pairedItem[item]) {
      for (const classState of this.items[item]) div.removeClass(classState);

      let pairedState = 0;
      pairedState += itemState ? 2 : 0;
      pairedState += this.safeGetItem(this.pairedItem[item]) ? 1 : 0;
      itemState = pairedState;

      div.addClass(this.items[item][pairedState]);
    } else if (this.pluralItems.indexOf(item) >= 0) {
      for (const classState of this.items[item]) div.removeClass(classState);
      div.addClass(this.items[item][itemState]);
    }
    if (itemState === 0 && item !== 'mail') {
      div.addClass('item_missing');
    }
  }

  has(item, value = 1) {
    let itemSlot;
    let count = 0;

    switch (item) {
      case 'agahnim1':
      case 'agahnim2':
        itemSlot = 'agahnim';
        break;
      case 'crystal56':
        for (let i = 0; i < 10; i += 1) {
          const dungeonReward = this.rewardMapping[this.state.getDungeonState(i, 'reward')];
          const dungeonCompleted = this.state.getDungeonState(i, 'done');
          if (dungeonReward === 'reward-crystal56' && dungeonCompleted) count += 1;
        }
        return count >= 2;
      case 'crystal-all':
        for (let i = 0; i < 10; i += 1) {
          const dungeonReward = this.rewardMapping[this.state.getDungeonState(i, 'reward')];
          const dungeonCompleted = this.state.getDungeonState(i, 'done');
          if (dungeonReward.startsWith('reward-crystal') && dungeonCompleted) count += 1;
        }
        return count >= 7;
      case 'pendant-green':
        for (let i = 0; i < 10; i += 1) {
          const dungeonReward = this.rewardMapping[this.state.getDungeonState(i, 'reward')];
          const dungeonCompleted = this.state.getDungeonState(i, 'done');
          if (dungeonReward === 'reward-pendant-green' && dungeonCompleted) count += 1;
        }
        return count >= 1;
      case 'pendant-all':
        for (let i = 0; i < 10; i += 1) {
          const dungeonReward = this.rewardMapping[this.state.getDungeonState(i, 'reward')];
          const dungeonCompleted = this.state.getDungeonState(i, 'done');
          if (dungeonReward.startsWith('reward-pendant') && dungeonCompleted) count += 1;
        }
        return count >= 3;
      default:
        itemSlot = item;
    }

    return this.safeGetItem(itemSlot) >= value;
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
            (this.has('glove', 2) || (this.has('glove') && this.has('hammer')))) ||
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
        return this.has('glove', 2) && this.access('dmeast', allZones);
      case 'dwdmne':
        return (
          (this.has('glove', 2) && this.has('hammer') && this.access('dwne', allZones)) ||
          (this.state.mode === 'item' && this.access('dwdmeast', allZones))
        );
      case 'mire':
        return this.has('glove', 2) && this.has('flute');
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
        return (
          this.access('dmne', allZones) &&
          this.has('hammer') &&
          this.has('sword') &&
          this.has('bombos') &&
          this.has('ether') &&
          this.has('quake') &&
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

export default ItemTracker;
