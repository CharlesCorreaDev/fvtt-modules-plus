# Complete Guide: Combat Tracker, Turns, Initiative & Automation in Foundry VTT

> **Official API Reference:**  
> - [`Combat`](https://foundryvtt.com/api/classes/client.Combat.html)  
> - [`Combatant`](https://foundryvtt.com/api/classes/client.Combatant.html)  
> - [`CombatTracker`](https://foundryvtt.com/api/classes/client.CombatTracker.html)

---

## 1. Overview & Architecture
In Foundry Virtual Tabletop, encounters are driven by the `Combat` document and individual `Combatant` embedded documents.

- **Current Active Encounter:** Accessed via `game.combat` (or `game.combats.active`).
- **All World Encounters:** Accessed via `game.combats`.
- **Combat Tracker UI:** The sidebar tab rendering the encounter is `ui.combat`.

---

## 2. Managing Combat Programmatically

### 2.1. Creating and Starting Combat
```javascript
// 1. Create a new Combat encounter in the current scene
const combat = await Combat.create({ scene: canvas.scene.id });

// 2. Activate the combat
await combat.activate();

// 3. Add selected tokens to combat
const combatantsData = canvas.tokens.controlled.map(token => ({
  tokenId: token.id,
  actorId: token.actor.id,
  sceneId: canvas.scene.id
}));
await combat.createEmbeddedDocuments("Combatant", combatantsData);

// 4. Roll initiative for all combatants without an initiative value
await combat.rollAll();

// 5. Start the encounter (Round 1, Turn 1)
await combat.startCombat();
```

### 2.2. Advancing Turns and Rounds
```javascript
// Advance to next turn
await game.combat.nextTurn();

// Advance directly to next round
await game.combat.nextRound();

// Rewind turn or round
await game.combat.previousTurn();
await game.combat.previousRound();

// End combat
await game.combat.endCombat();
```

---

## 3. Combat Hooks & Event Lifecycle
Modules can intercept and react to combat transitions:

| Hook Name | Parameters | Purpose |
|---|---|---|
| `combatStart` | `(combat, updateData)` | Fires when combat is officially started |
| `combatRound` | `(combat, updateData, updateOptions)` | Fires when the round changes (Buff durations tick down) |
| `combatTurn` | `(combat, updateData, updateOptions)` | Fires on every turn change |
| `deleteCombat` | `(combat, options, userId)` | Fires when combat is ended/deleted |

### Example: Auto-Pan and Token Activation on Turn Change
```javascript
Hooks.on("combatTurn", async (combat, updateData, updateOptions) => {
  const currentCombatant = combat.combatant;
  if (!currentCombatant || !currentCombatant.token) return;

  const token = canvas.tokens.get(currentCombatant.token.id);
  if (!token) return;

  // Pan canvas smoothly to active combatant
  canvas.animatePan({ x: token.x, y: token.y, duration: 500 });

  // Trigger start-of-turn effects
  console.log(`It is now ${currentCombatant.name}'s turn!`);
});
```

---

## 4. Custom Initiative Formulas
Systems or modules can customize the initiative formula in `CONFIG.Combat.initiative`:

```javascript
Hooks.once("init", () => {
  // Replace formula: 1d20 + Dexterity modifier + Tiebreaker
  CONFIG.Combat.initiative = {
    formula: "1d20 + @attributes.dex.mod + (@attributes.dex.value / 100)",
    decimals: 2
  };
});
```
