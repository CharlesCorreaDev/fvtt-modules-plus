# Complete Guide: Active Effects & Status Conditions in Foundry VTT

> **Official Reference:** [https://foundryvtt.com/article/active-effects/](https://foundryvtt.com/article/active-effects/)

---

## 1. What are Active Effects?
Active Effects dynamically modify Actor and Item data properties during gameplay (e.g. Spells, Buffs, Debuffs, Poison, Wounds).

---

## 2. Change Modes Matrix
Each modification change has a target path, mode, and value:

| Mode | Identifier | Code | Description | Example |
|---|---|---|---|---|
| **CUSTOM** | `CONST.ACTIVE_EFFECT_MODES.CUSTOM` | `0` | Delegated to system-specific custom handler | Special script triggers |
| **MULTIPLY** | `CONST.ACTIVE_EFFECT_MODES.MULTIPLY` | `1` | Multiplies the base attribute by value | `* 2` (Haste double speed) |
| **ADD** | `CONST.ACTIVE_EFFECT_MODES.ADD` | `2` | Adds or subtracts numeric value | `+ 2` (Shield buff to AC) |
| **DOWNGRADE** | `CONST.ACTIVE_EFFECT_MODES.DOWNGRADE` | `3` | Caps attribute if lower than current | Max strength cap |
| **UPGRADE** | `CONST.ACTIVE_EFFECT_MODES.UPGRADE` | `4` | Sets attribute to value if greater than current | `Darkvision 60ft` |
| **OVERRIDE** | `CONST.ACTIVE_EFFECT_MODES.OVERRIDE` | `5` | Replaces the attribute completely | Hard set HP to 0 (Unconscious) |

---

## 3. Creating Active Effects Programmatically
```javascript
const effectData = {
  name: 'Blessing of Valor',
  icon: 'icons/svg/aura.svg',
  changes: [
    {
      key: 'system.attributes.hp.max',
      mode: CONST.ACTIVE_EFFECT_MODES.ADD,
      value: '10',
      priority: 20
    },
    {
      key: 'system.attributes.ac.value',
      mode: CONST.ACTIVE_EFFECT_MODES.ADD,
      value: '2',
      priority: 20
    }
  ],
  duration: {
    rounds: 10,
    seconds: 60,
    startRound: game.combat?.round ?? 0,
    startTurn: game.combat?.turn ?? 0
  },
  // Transfer effect from an Item to the Actor that owns it
  transfer: true
};

await actor.createEmbeddedDocuments('ActiveEffect', [effectData]);
```

---

## 4. Item Transfers & Temporary Effects
- **`transfer: true`**: When attached to an Item (weapon, armor, passive feat), the effect automatically transfers to the owning Actor upon equipping/adding.
- **`transfer: false`**: The effect represents an active toggle or spell duration applied on demand (e.g., Cast Spell -> Apply status to Target).

---

## 5. ActiveEffect V2 & v14 Specifics
- In v14, ActiveEffects utilize `TypeDataModel` schemas for system-specific effect subtypes.
- **Hooks:**
  - `applyActiveEffect(actor, change, current, delta, changes)`: Custom handler hook for `CONST.ACTIVE_EFFECT_MODES.CUSTOM (0)`.
  - `createActiveEffect` / `deleteActiveEffect`: Track when conditions are applied or removed (e.g., status overlays).
- **Status Effects Matrix:** Use `CONFIG.statusEffects` to customize default icons and token overlays.

