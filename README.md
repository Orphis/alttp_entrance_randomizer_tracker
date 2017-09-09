# Orphis's Zelda 3 randomizer tracker

This is a "tracker" for Zelda: A Link to the Past Randomizer. Please use the
latest version available on [GitHub](https://orphis.github.io/alttp_entrance_randomizer_tracker/).

## Features

* Item tracker
* Dungeon tracker
* Entrance tracker (for Entrance Randomizer modes)
* Map showing availability of entrances / overworld items
* Tables for text based search
* State is automatically saved. No more accidental "back" press that loses everything!

## Map usage

Legend is as follow:

* Squares are doors. In entrance randomizer they will take you to "single entrance" locations.
* Diamonds are doors to "multi entrances" caves or dungeons in entrance randomizer.
* Triangle are drop locations (open holes or under a bush)
* Circle are overworld items or NPC's quests (Bottle Vendor or Sahasrahla's pendant).

Colors:

* Red: inaccessible location
* Yellow: item is visible somehow or can be checked with the book
* Green: location or item should be accessible
* Blue: location has been marked as important
* Gray: item has been taken, location has been checked or marked useless

Outline colors:

* Blue: location is marked
* Yellow: when pointing to a cave with the mouse, it shows where the matching vanilla cave is. If Eastern Palace points to Ice Palace, hovering over Ice Palace will make Easter Palace yellow
* Red: when pointing to a multiple entrance cave, it shows where the other entrances connected to the same cave take you

Left-click on a location or item to mark is as done or useless.

In entrance randomizer mode, when you right click on a location, you can click on
the matching vanilla entrance location to put a note.
For example, if the house in Kakariko that takes you to the sick kid takes you to
Sahasrahla, you can right click on the sick kids house and then Sahasrahla's house.
A note will appear when you hover on the square telling you "Sick Kid -> Sahasrahla".

## Future plans

* Networked mode: Could be useful for casters in tournaments to sync up all the entrances they have tracked, or the item trackers to embed in OBS directly.
* Twitch integration for chat to mark items
* Some kind of support for madness / insanity modes.
* Oh, and a regular item randomizer mode that's more simple
