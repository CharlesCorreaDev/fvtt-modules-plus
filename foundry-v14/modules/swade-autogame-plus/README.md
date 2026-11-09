# SWADE AutoGame Plus (SWAG+)

[![Foundry v14](https://img.shields.io/badge/Foundry%20VTT-v14%20Stable-blue?style=flat-square)](https://foundryvtt.com)
[![SWADE System](https://img.shields.io/badge/System-SWADE-orange?style=flat-square)](https://gitlab.com/peginc/swade)
[![Version: 1.0.0-beta.1](https://img.shields.io/badge/Version-1.0.0--beta.1-yellow?style=flat-square)](VERSION)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Português](#português-pt-br) | [English](#english-en)

---

## Português (PT-BR)

SWADE AutoGame Plus (SWAG+) reúne recursos de automação de combate, cálculo de regras e interfaces para Savage Worlds Adventure Edition (SWADE) no Foundry VTT v14 (compatível com a v13).

O módulo consolida regras de combate, temporizador, HUDs flutuantes e novos modelos de ficha em uma arquitetura única com seletores independentes no menu de configurações.

### Recursos

- **Cálculo de elevações (`RaiseCalculator`)**: avalia rolagens contra o Número-Alvo (TN) ou Aparar, indicando falhas, sucessos e margem de elevações.
- **Dano automatizado (`DamageCalculator`)**: calcula dano contra alvos selecionados considerando Resistência, Armadura, Penetração de Armadura (AP), acúmulo de Abalado e Armas Pesadas.
- **Card de ação no chat**: card compacto com separação do Dado Selvagem, contagem de explosões (Áses) e botão de aplicação direta de dano aos alvos.
- **Temporizador de combate (`TurnTimer`)**: barra regressiva no topo da tela com avisos sonoros opcionais por turno.
- **HUDs em ApplicationV2**:
  - `QuickActionsHUD`: atalhos para rolagens de atributos, perícias e ações frequentes.
  - `VisualActiveEffectsHUD`: barra superior com condições ativas do token selecionado.
  - `SavageDiceTray`: bandeja inferior de dados com botão direto para o Dado Selvagem.
- **Fichas de personagem**:
  - Modelos registrados em `Actors.registerSheet`: `Modern` (Bento Grid) e `Minimal` (Tático).
  - 9 paletas prontas (`royal`, `cyber-dark`, `weird-west`, `sci-fi`, `fantasy`, `horror`, `dark-fantasy`, `super-hero`, `wars`) e modo personalizado com seletores hexadecimais para fundo, cards, bordas e destaque.
  - Suporte a upload de logotipo da mesa (280x70 px) posicionado no cabeçalho sem cobrir os logos oficiais.
- **Automação de tokens**: anéis coloridos atribuídos automaticamente a duplicatas de figurantes na cena.
- **API pública**: métodos expostos em `globalThis.SWAG.api` e `game.modules.get('swade-autogame-plus').api`.

### Exemplo de uso da API

```javascript
// Avaliar rolagem contra TN 4
const resultado = SWAG.api.calculateRaises(12, 4);
console.log(resultado);
// { isSuccess: true, raises: 2, margin: 8, isCriticalFailure: false }

// Obter dossiê completo de um personagem pelo ID ou UUID
const ficha = SWAG.api.inspectActor("Actor.abc123456");
console.log(ficha.attributes, ficha.skills, ficha.stats);
```

---

## English (EN)

SWADE AutoGame Plus (SWAG+) is an automation and interface suite for Savage Worlds Adventure Edition (SWADE) running on Foundry VTT v14 (with v13 fallback).

It integrates targeted damage, raise calculation, turn timers, floating HUDs, and custom character sheets with independent feature toggles in module settings.

### Features

- **Raise calculation (`RaiseCalculator`)**: evaluates rolls against Target Numbers (TN) or Parry, flagging failures, successes, and raise counts.
- **Targeted damage engine (`DamageCalculator`)**: resolves damage against targeted tokens taking Toughness, Armor, Armor Piercing (AP), Shaken stacking, and Heavy Armor into account.
- **Compact chat cards**: concise action cards showing Wild Die isolation, Ace explosion counters, and target damage application buttons.
- **Combat turn timer (`TurnTimer`)**: visual countdown bar at the top of the screen with optional audio alerts.
- **ApplicationV2 HUDs**:
  - `QuickActionsHUD`: quick action shortcuts and attribute rolls for controlled tokens.
  - `VisualActiveEffectsHUD`: top floating bar displaying active statuses and conditions.
  - `SavageDiceTray`: dice roller docked below chat with dedicated Wild Die support.
- **Character sheets**:
  - Registered sheets in `Actors.registerSheet`: `Modern` (Bento Grid) and `Minimal` (Tactical).
  - 9 presets (`royal`, `cyber-dark`, `weird-west`, `sci-fi`, `fantasy`, `horror`, `dark-fantasy`, `super-hero`, `wars`) plus a custom palette mode for backgrounds, card surfaces, borders, and accents.
  - Campaign logo upload (280x70 px) displayed in the header without obscuring official system logos.
- **Token management**: chromatic ring markers applied automatically to duplicate extras added to the scene.
- **Public API**: accessible through `globalThis.SWAG.api` and `game.modules.get('swade-autogame-plus').api`.

### API example

```javascript
// Evaluate roll against TN 4
const outcome = SWAG.api.calculateRaises(12, 4);
console.log(outcome);
// { isSuccess: true, raises: 2, margin: 8, isCriticalFailure: false }

// Retrieve complete actor dossier by ID or UUID
const actorData = SWAG.api.inspectActor("Actor.abc123456");
console.log(actorData.attributes, actorData.skills, actorData.stats);
```

---

## Licença / License

MIT - Charles Corrêa.
