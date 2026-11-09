# Changelog - SWADE AutoGame Plus (SWAG+)

Todas as alterações notáveis deste projeto são registradas neste arquivo.  
*All notable changes to this project are documented in this file.*

Padrão baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e [Versionamento Semântico](https://semver.org/lang/pt-BR/).  
*Based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).*

---

## [1.0.0-beta.1] - 2026-11-06

Versão preliminar para testes da comunidade e validação no Foundry VTT v14.  
*Pre-release build for community testing and Foundry VTT v14 validation.*

### Português (PT-BR)

#### Adicionado
- Motores de regras:
  - `RaiseCalculator`: cálculo de margem e elevações contra TN ou Aparar, com suporte a falha crítica e internacionalização.
  - `DamageCalculator`: cálculo de dano considerando Resistência, Armadura, AP, acúmulo de Abalado e regras de armas pesadas.
  - `RollInspector`: inspeção de dados rolados, identificação de faces máximas e contagem de explosões de Áses, com separação do Dado Selvagem.
  - `ActorInspector`: extração de dados completos de fichas pelo ID ou UUID (atributos, perícias, inventário, vantagens, poderes, efeitos e biografia).
- Interfaces em ApplicationV2:
  - `QuickActionsHUD`: atalhos de ações rápidas e rolagens para tokens controlados.
  - `VisualActiveEffectsHUD`: barra flutuante de monitoramento de condições ativas.
  - `TurnTimer`: barra visual de tempo de turno no combate com alertas de áudio.
  - `SavageDiceTray`: bandeja de dados com suporte ao Dado Selvagem abaixo do chat.
- Cards no chat:
  - Card compacto com dados detalhados, realce em faces máximas, contadores de Áses e botão de aplicação direta de dano aos alvos.
- Fichas de personagem:
  - Fichas registradas em `Actors.registerSheet`: `SWAG+ Modern Sheet` e `SWAG+ Minimal Sheet`.
  - 9 paletas de cores prontas (`royal`, `cyber-dark`, `weird-west`, `sci-fi`, `fantasy`, `horror`, `dark-fantasy`, `super-hero`, `wars`) e modo de personalização livre com seletores hexadecimais.
  - Campo para logotipo da mesa (280x70 px) posicionado no cabeçalho.
- Automação de cena:
  - `TokenColorMarker`: atribuição de anéis coloridos para figurantes repetidos.
  - `FxAdapter`: suporte opcional para integrações com Sequencer, Celebrate e Dice So Nice.
- API pública e testes:
  - Acesso via `globalThis.SWAG.api` e `game.modules.get('swade-autogame-plus').api`.
  - 21 testes unitários com o executor nativo do Node.js cobrindo regras de combate, dados e extração de dados de fichas.
  - Classes CSS isoladas com o prefixo `SWAG-PLUS-`.

---

### English (EN)

#### Added
- Rule calculation engines:
  - `RaiseCalculator`: resolves roll margins and raises against TN or Parry, with critical failure checks and bilingual strings.
  - `DamageCalculator`: resolves damage against Toughness, Armor, AP, Shaken stacking, and Heavy Armor rules.
  - `RollInspector`: analyzes rolled dice, flags maximum values, counts Ace explosions, and isolates the Wild Die.
  - `ActorInspector`: extracts actor dossiers by ID or UUID (attributes, skills, gear, edges, powers, active effects, and bio).
- ApplicationV2 interfaces:
  - `QuickActionsHUD`: floating action shortcuts and attribute rolls for controlled tokens.
  - `VisualActiveEffectsHUD`: top condition bar monitoring active statuses in real time.
  - `TurnTimer`: visual countdown timer for combat turns with audio alerts.
  - `SavageDiceTray`: polyhedral dice dock below chat with Wild Die support.
- Chat card formatting:
  - Compact cards with dice breakdown, max-face highlight, Ace counters, and one-click target damage application.
- Character sheets:
  - Registered sheets in `Actors.registerSheet`: `SWAG+ Modern Sheet` and `SWAG+ Minimal Sheet`.
  - 9 color presets (`royal`, `cyber-dark`, `weird-west`, `sci-fi`, `fantasy`, `horror`, `dark-fantasy`, `super-hero`, `wars`) plus a fully customizable color palette mode.
  - Campaign logo upload support (280x70 px) displayed in the header.
- Scene helpers:
  - `TokenColorMarker`: applies chromatic rings to duplicated NPC/extra tokens.
  - `FxAdapter`: optional hooks for Sequencer, Celebrate, and Dice So Nice.
- Public API and test suite:
  - Accessible via `globalThis.SWAG.api` and `game.modules.get('swade-autogame-plus').api`.
  - 21 unit tests running on Node.js native test runner covering core calculations and actor inspection.
  - Scoped CSS classes under the `SWAG-PLUS-` namespace.
