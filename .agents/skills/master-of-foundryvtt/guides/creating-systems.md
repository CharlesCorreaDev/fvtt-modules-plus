# Complete Guide: Game System Development for Foundry Virtual Tabletop

> **Official Reference:** [https://foundryvtt.com/article/system-development/](https://foundryvtt.com/article/system-development/)

---

## 1. System Manifest (`system.json`)
The manifest file defines identity, compatibility, scripts, stylesheets, and compendium packs.

```json
{
  "id": "my-custom-system",
  "title": "My Custom RPG System",
  "description": "A bespoke RPG system for Foundry Virtual Tabletop.",
  "version": "1.0.0",
  "compatibility": {
    "minimum": "11",
    "verified": "12",
    "maximum": "13"
  },
  "authors": [{ "name": "Charles Corrêa", "email": "charlescorreaweb@gmail.com" }],
  "esmodules": ["src/module/system.mjs"],
  "styles": ["styles/system.css"],
  "packs": []
}
```

---

## 2. TypeDataModel Schema Definition (v10+)
Modern Foundry systems define typed schemas replacing legacy `template.json`.

```javascript
const { StringField, NumberField, SchemaField, ArrayField, BooleanField } = foundry.data.fields;

export class CharacterDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      biography: new StringField({ required: true, blank: true }),
      attributes: new SchemaField({
        level: new NumberField({ required: true, integer: true, min: 1, initial: 1 }),
        hp: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField({ required: true, integer: true, min: 0, initial: 10 })
        }),
        mana: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 5 }),
          max: new NumberField({ required: true, integer: true, min: 0, initial: 5 })
        })
      }),
      skills: new ArrayField(new SchemaField({
        name: new StringField({ required: true }),
        rank: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
      }))
    };
  }

  // Derived data calculation
  prepareDerivedData() {
    this.attributes.hp.max = 10 + (this.attributes.level * 5);
  }
}
```

---

## 3. Registering Models & Sheets (`system.mjs`)
```javascript
import { CharacterDataModel } from './data/character-data.mjs';
import { CustomActorSheet } from './sheets/actor-sheet.mjs';

Hooks.once('init', async function() {
  console.log('MyCustomSystem | Initializing System...');

  // 1. Assign DataModels
  CONFIG.Actor.dataModels.character = CharacterDataModel;

  // 2. Register Custom Sheets
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('my-custom-system', CustomActorSheet, {
    types: ['character'],
    makeDefault: true,
    label: 'Custom Character Sheet'
  });

  // 3. Preload Handlebars Templates
  await loadTemplates([
    'systems/my-custom-system/templates/actor/actor-sheet.hbs',
    'systems/my-custom-system/templates/actor/parts/actor-stats.hbs'
  ]);
});
```

---

## 4. Custom Sheet Implementation (Handlebars / ApplicationV2)
```javascript
export class CustomActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['my-system', 'sheet', 'actor'],
      template: 'systems/my-custom-system/templates/actor/actor-sheet.hbs',
      width: 600,
      height: 680,
      tabs: [{ navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'attributes' }]
    });
  }

  getData(options) {
    const context = super.getData(options);
    context.system = this.actor.system;
    context.flags = this.actor.flags;
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable) return;

    html.find('.roll-check').click(this._onRollCheck.bind(this));
  }

  async _onRollCheck(event) {
    event.preventDefault();
    const roll = new Roll('1d20 + @level', { level: this.actor.system.attributes.level });
    await roll.evaluate();
    await roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }) });
  }
}
```
