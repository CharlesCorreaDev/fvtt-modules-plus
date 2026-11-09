# Documentação da API Pública / Public API Documentation: SWADE AutoGame Plus (SWAG+)

[![Foundry v14](https://img.shields.io/badge/Foundry%20VTT-v14%20Stable-blue?style=flat-square)](https://foundryvtt.com)
[![Version: 1.0.0-beta.1](https://img.shields.io/badge/Version-1.0.0--beta.1-yellow?style=flat-square)](../VERSION)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](../LICENSE)

[Português](#português-pt-br) | [English](#english-en)

---

## Português (PT-BR)

O módulo expõe métodos para macros de mestres e desenvolvedores de módulos através de:
- `game.modules.get('swade-autogame-plus').api`
- `globalThis.SWAG.api`

### Métodos disponíveis

#### 1. Dossiê de personagem (`inspectActor`)
Extrai os dados organizados de um personagem a partir do ID, UUID ou instância de Actor.

```javascript
// Obter dados por UUID ou ID
const ficha = SWAG.api.inspectActor("Actor.abc123456");

console.log(ficha);
/*
{
  id: "abc123456",
  uuid: "Actor.abc123456",
  bio: { name: "Barak", type: "character", wildCard: true, race: "Humano", archetype: "Guerreiro", rank: "Novice" },
  media: { portraitImg: "tokens/barak.webp", prototypeTokenImg: "tokens/barak_token.webp" },
  stats: { pace: 6, parry: 6, toughness: 8, armor: 2, wounds: { value: 0, max: 3 } },
  attributes: {
    agility: { die: 8, modifier: 0, label: "Agilidade" },
    smarts: { die: 6, modifier: 0, label: "Astúcia" },
    spirit: { die: 8, modifier: 0, label: "Espírito" },
    strength: { die: 10, modifier: 0, label: "Força" },
    vigor: { die: 8, modifier: 0, label: "Vigor" }
  },
  skills: [
    { id: "s1", name: "Lutar", die: 10, modifier: 0, attribute: "agility" },
    { id: "s2", name: "Atirar", die: 6, modifier: 0, attribute: "agility" }
  ],
  edges: [{ id: "e1", name: "Golpe Poderoso", category: "combat", summary: "..." }],
  hindrances: [{ id: "h1", name: "Código de Honra", severity: "major", summary: "..." }],
  powers: [{ id: "p1", name: "Raio", rank: "novice", powerPoints: 2, damage: "2d6" }],
  inventory: {
    weapons: [{ id: "w1", name: "Espada Grande", damage: "For+d10", ap: 1 }],
    armors: [{ id: "a1", name: "Cota de Malha", armor: 2 }],
    gear: [{ id: "g1", name: "Cantil", quantity: 1 }]
  },
  abilities: [{ id: "b1", name: "Visão no Escuro", subtype: "special" }],
  effects: [{ id: "x1", name: "Invisível", disabled: false }]
}
*/
```

#### 2. Cálculo de elevações (`calculateRaises`)
```javascript
const resultado = SWAG.api.calculateRaises(12, 4);
// Retorno: { isSuccess: true, raises: 2, margin: 8, isCriticalFailure: false }

const texto = SWAG.api.formatRaiseResult(12, 4, "pt-BR");
// Retorno: "Sucesso com 2 Elevações (+8)"
```

#### 3. Dano em combate (`calculateDamage` e `applyTargetedDamage`)
```javascript
const calculo = SWAG.api.calculateDamage({
  damage: 18,
  toughness: 8,
  armor: 2,
  ap: 2,
  isShaken: false
});
// Retorno: { wounds: 2, becomesShaken: true, effectiveArmor: 0, effectiveToughness: 6 }

// Aplica aos alvos selecionados no mapa (game.user.targets)
await SWAG.api.applyTargetedDamage({
  damage: 14,
  ap: 1,
  isHeavyWeapon: false
});
```

#### 4. Inspeção de rolagens (`inspectRoll`)
```javascript
const roll = await new Roll("1d8x + 1d6x").evaluate();
const dados = SWAG.api.inspectRoll(roll);

console.log(dados.hasMaxFace);        // true se algum dado atingiu a face máxima
console.log(dados.diceBreakdown);     // lista com cada dado e contagem de explosões
console.log(dados.wildDieInfo);       // dados específicos do Dado Selvagem
```

#### 5. Controle de tempo e interfaces
```javascript
// Temporizador
SWAG.api.startTurnTimer(game.combat.combatant);
SWAG.api.stopTurnTimer();

// HUDs
SWAG.api.toggleQuickActionsHUD();
SWAG.api.toggleVisualEffectsHUD();
```

### Temas da ficha de personagem

Configurável em `sheetColorTheme`:
- Presets: `royal`, `cyber-dark`, `weird-west`, `sci-fi`, `fantasy`, `horror`, `dark-fantasy`, `super-hero`, `wars`.
- Modo customizável: `custom` com valores definidos nas configurações:
  - `customSheetBgColor`
  - `customSheetCardBgColor`
  - `customSheetBorderColor`
  - `customSheetAccentColor`
  - `customSheetHighlightColor`

---

## English (EN)

The module exposes methods for GM macros and other modules through:
- `game.modules.get('swade-autogame-plus').api`
- `globalThis.SWAG.api`

### Available methods

#### 1. Actor dossier (`inspectActor`)
Returns structured actor data given an ID, UUID, or Actor document.

```javascript
const actorData = SWAG.api.inspectActor("Actor.abc123456");
console.log(actorData.attributes, actorData.skills, actorData.inventory);
```

#### 2. Raise calculation (`calculateRaises`)
```javascript
const outcome = SWAG.api.calculateRaises(12, 4);
// Returns: { isSuccess: true, raises: 2, margin: 8, isCriticalFailure: false }

const label = SWAG.api.formatRaiseResult(12, 4, "en");
// Returns: "Success with 2 Raises (+8)"
```

#### 3. Targeted damage (`calculateDamage` and `applyTargetedDamage`)
```javascript
const outcome = SWAG.api.calculateDamage({
  damage: 18,
  toughness: 8,
  armor: 2,
  ap: 2,
  isShaken: false
});

await SWAG.api.applyTargetedDamage({
  damage: 14,
  ap: 1,
  isHeavyWeapon: false
});
```

#### 4. Dice inspection (`inspectRoll`)
```javascript
const roll = await new Roll("1d8x + 1d6x").evaluate();
const info = SWAG.api.inspectRoll(roll);
console.log(info.hasMaxFace, info.diceBreakdown, info.wildDieInfo);
```

#### 5. Timers and HUD toggles
```javascript
SWAG.api.startTurnTimer(game.combat.combatant);
SWAG.api.stopTurnTimer();

SWAG.api.toggleQuickActionsHUD();
SWAG.api.toggleVisualEffectsHUD();
```

### Character sheet themes

Configurable via `sheetColorTheme`:
- Presets: `royal`, `cyber-dark`, `weird-west`, `sci-fi`, `fantasy`, `horror`, `dark-fantasy`, `super-hero`, `wars`.
- Custom palette mode: `custom` driven by hex settings:
  - `customSheetBgColor`
  - `customSheetCardBgColor`
  - `customSheetBorderColor`
  - `customSheetAccentColor`
  - `customSheetHighlightColor`
