# Complete Guide: Macros, Rollable Tables & Compendiums

> **Official Reference:** [https://foundryvtt.com/article/macros/](https://foundryvtt.com/article/macros/)

---

## 1. Script Macros (Asynchronous JavaScript)
In Foundry VTT, script macros run in the client context with global access to:
- `game`: Game engine instance (`game.actors`, `game.scenes`, `game.users`).
- `canvas`: PIXI.js WebGL canvas layer (`canvas.tokens`, `canvas.walls`, `canvas.lighting`).
- `actor`: Currently selected actor sheet or assigned character.
- `token`: Currently controlled token on canvas.

### Example: Automated Damage Application Macro
```javascript
// Ensure at least one token is selected
const tokens = canvas.tokens.controlled;
if (!tokens.length) {
  ui.notifications.warn('Select at least one token first!');
  return;
}

const damageAmount = 15;
for (const token of tokens) {
  const currentHp = token.actor.system.attributes.hp.value;
  const newHp = Math.max(0, currentHp - damageAmount);
  await token.actor.update({ 'system.attributes.hp.value': newHp });
  ui.notifications.info(`${token.name} took ${damageAmount} damage. Current HP: ${newHp}`);
}
```

---

## 2. Rollable Tables Programmatic API
```javascript
// Fetch a table by name
const lootTable = game.tables.getName('Treasure Horde');
if (lootTable) {
  // Draw result and broadcast to chat
  const draw = await lootTable.draw({ displayChat: true });
  console.log('Drawn Results:', draw.results);
}
```

---

## 3. Compendium Management & Migration
```javascript
// Access compendium pack
const pack = game.packs.get('dnd5e.monsters');

// Query compendium index
const index = await pack.getIndex({ fields: ['system.details.cr', 'system.attributes.hp'] });
const dragons = index.filter(i => i.name.includes('Dragon'));
```
