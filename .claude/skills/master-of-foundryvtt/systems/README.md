# Foundry VTT RPG Systems Knowledge Base 🎲📚
> **Comprehensive System Architecture & Development Directory**  
> *Base de Conhecimento de Sistemas de RPG para Foundry VTT por GM Charles Corrêa*

---

## 🇺🇸 English

### 📌 Overview & Architecture Directory

This knowledge base catalogs the technical architectures, official repositories, `Hooks`, `DataModel` peculiarities, roll evaluation pipelines, and developer pitfalls for **over 100 of the most popular RPG systems** in the Foundry Virtual Tabletop ecosystem.

Its purpose is to guide developers, module creators, and AI Agents in avoiding runtime conflicts, data migration errors, and license/policy infringements.

---

### 📂 System Guides by Category

| Category | Guide File | Major Systems Covered |
| :--- | :--- | :--- |
| **01. Heroic Fantasy, D20 & Duality Dice** | [`01-d20-and-fantasy.md`](01-d20-and-fantasy.md) | D&D 5e (Official + PT-BR), D&D 3.5e, Pathfinder 2e (Rule Elements), Level Up A5E, OSE, Swords & Wizardry, 13th Age (Archmage), Daggerheart, Tormenta 20, Old Dragon 2e, Draw Steel (MCDM), DC20 RPG, Shadowdark, Nimble 5e, Skyfall RPG & Fastplay, Beyond the Wall, Mini D20, ARS. |
| **02. Storyteller & World of Darkness** | [`02-storyteller-and-world-of-darkness.md`](02-storyteller-and-world-of-darkness.md) | WoD20 (Vampire, Werewolf, Mage), Vampire V5, WoD5E, WoD6E, Changeling 5E, KULT: Divinity Lost. |
| **03. Investigation & Cosmic Horror** | [`03-investigative-and-horror.md`](03-investigative-and-horror.md) | Call of Cthulhu 7e, Delta Green, GUMSHOE, Cthulhu Dark, Arkham Horror RPG, Ordem Paranormal RPG (v2 & 2e), Casos Insólitos. |
| **04. Year Zero Engine (Free League)** | [`04-year-zero-engine.md`](04-year-zero-engine.md) | Year Zero Roller, Alien RPG, Blade Runner, Vaesen, Twilight: 2000, Forbidden Lands, Coriolis (TGD, Overhaul, YZE), Mutant: Year Zero, Dragonbane, The Walking Dead Universe (TWDU), MÖRK BORG, CY_BORG. |
| **05. Sci-Fi, Cyberpunk, Mecha & Space** | [`05-pulp-scifi-and-cyberpunk.md`](05-pulp-scifi-and-cyberpunk.md) | Cyberpunk RED Core, Cyberpunk 2020, Shadowrun 5e/6e, CBR+PNK, Lancer Mech, Warhammer 40k (Wrath & Glory, Imperium Maledictum), OpenD6 Space, Fallout 2d20, CAIN, Wasteland, Cosmere RPG (+ Stormlight Compendium), Invincible, Triangle Agency, Star Wars FFG, Star Trek Adventures, Traveller Mongoose 2e, Starfinder 1e, Achtung! Cthulhu 2d20, Shadow City: Blood & Neon. |
| **06. Narrative, PbtA & FitD** | [`06-narrative-and-pbta-fitd.md`](06-narrative-and-pbta-fitd.md) | Blades in the Dark, PbtA Generic, Dungeon World, City of Mist, Fate Core/Accelerated, Perils & Princesses (*Perigos & Princesas*), Crônicas RPG, The Witch Is Dead. |
| **07. Generic, Classic & Rules-Light Systems** | [`07-generic-and-rules-light.md`](07-generic-and-rules-light.md) | GURPS 4e, Savage Worlds (SWADE), Basic RolePlaying (BRP), Tagmar & Tagmar 3.0, Warhammer Fantasy 4e (WFRP4e), Zweihänder & Reforged, Legend of the Five Rings (L5R 4e/5e), Mutants & Masterminds 3e, Cypher System, Symbaroum, Age of Sigmar Soulbound, ICRPG (Master Edition & Core), EZD6, True D6, Cordel RPG, Universal Tabletop System, 7th Sea 2e, Cortex Prime, Mausritter, TRPG (Tormenta clássico), Shinobi no Sho & Revamp, Ronin, Fabula Ultima (Project FU), Goblin Slayer TTRPG, Sword World 2.5 (sw25), Shinobigami, Wilderfeast, Mythic RPG / GME, HERO System 6e, CSB, Worldbuilding, 3D&T Alpha/Victory, ABEA, Ars Magica 5e, The One Ring 2e, The Witcher, Shadow of the Demon Lord / Weird Wizard, TinyD6. |

---

### 🔍 Dynamic Discovery of Unlisted Systems

Whenever a developer or user asks about an RPG system that is **not** currently listed in this local catalog:
1. The AI Agent **MUST consult the official Foundry VTT Systems Directory with pagination support**: [**https://foundryvtt.com/packages/systems?page=1**](https://foundryvtt.com/packages/systems?page=1) (iterating through `?page=2`, `?page=3`, etc., as needed).
2. Locate the package identifier (`id`), supported core versions (`compatibility`), manifest URL (`manifest`), and source code repository (GitHub, GitLab, Gitea, etc.).
3. Inspect `system.json` and the system's schema/templates to understand the actor/item data models before generating code or scripts.

### 🧩 Module Recommendations & Official Store Protocol
When recommending companion modules or commercial content for any system (automation, UI enhancements, dice styling, maps, FX, rule compendiums, full adventure modules):
- **Official Modules Directory (Community/Open):** The AI Agent **MUST consult the official Foundry VTT Modules Directory with pagination support**: [**https://foundryvtt.com/packages/modules?page=1**](https://foundryvtt.com/packages/modules?page=1) (iterating through `?page=2`, `?page=3`, etc.).
- **Official Foundry VTT Store (Commercial/Premium Investment):** If the developer or user is willing to invest in premium modules, licensed rulebooks, art packs, or official adventures, the AI Agent **MUST search the official Foundry VTT Store**: [**https://www.foundryvtt.store/search?q=<QUERY>**](https://www.foundryvtt.store/search?q=Savage+Worlds) replacing the query string with the system or product name (e.g., `?q=Savage+Worlds`, `?q=dnd`, `?q=pathfinder`, `?q=warhammer`) and recommend the ideal official commercial content.
- Clarify whether recommended modules are on the official free directory, open-source on GitHub/GitLab, or premium/third-party (e.g. Foundry Store, Patreon, commercial partner sites).

---

### ⚠️ Common Pitfalls & Best Practices

1. **Avoid Direct Method Overwriting:** Never replace class methods (`Actor.prototype.prepareDerivedData` or `Item.prototype.roll`) directly. Always use the `libWrapper` library to ensure compatibility with other modules.
2. **Respect System DataModels:** Modern systems (v10+) use `TypeDataModel`. Do not inject undeclared properties directly into `system`; use module flags (`flags.<module-id>.<field>`) instead.
3. **Internationalization (i18n):** Never hardcode strings in UI templates or JavaScript logic. Always use `game.i18n.localize("KEY.PATH")` or `{{localize 'KEY.PATH'}}`.
4. **System-Specific Effect Pipelines:** Check whether the system uses standard Foundry `ActiveEffect` objects or custom modifier pipelines (e.g., PF2e Rule Elements).

---
---

## 🇧🇷 Português (Brasil)

### 📌 Visão Geral & Índice dos Sistemas

Esta base de conhecimento cataloga a arquitetura técnica, repositórios oficiais, ganchos (`Hooks`), particularidades de `DataModel`, tratamento de rolagens e armadilhas comuns para **mais de 100 dos sistemas mais populares** do ecossistema Foundry Virtual Tabletop.

Seu propósito é orientar desenvolvedores, criadores de módulos e Agentes de IA a evitar conflitos de execução, erros de migração de esquemas e violações de termos de licença.

---

### 📂 Guias de Sistemas por Categoria

| Categoria | Arquivo do Guia | Principais Sistemas Cobertos |
| :--- | :--- | :--- |
| **01. Fantasia Heroica, D20 & Duality Dice** | [`01-d20-and-fantasy.md`](01-d20-and-fantasy.md) | D&D 5e (Oficial + PT-BR), D&D 3.5e, Pathfinder 2e (Rule Elements), Level Up A5E, OSE, Swords & Wizardry, 13th Age (Archmage), Daggerheart, Tormenta 20, Old Dragon 2e, Draw Steel (MCDM), DC20 RPG, Shadowdark, Nimble 5e, Skyfall RPG & Fastplay, Beyond the Wall, Mini D20, ARS. |
| **02. Storyteller & Mundo das Trevas** | [`02-storyteller-and-world-of-darkness.md`](02-storyteller-and-world-of-darkness.md) | WoD20 (Vampiro, Lobisomem, Mago), Vampiro V5, WoD5E, WoD6E, Changeling 5E, KULT: Divinity Lost. |
| **03. Investigação & Horror Cósmico** | [`03-investigative-and-horror.md`](03-investigative-and-horror.md) | Call of Cthulhu 7e, Delta Green, GUMSHOE, Cthulhu Dark, Arkham Horror RPG, Ordem Paranormal RPG (v2 & 2e), Casos Insólitos. |
| **04. Year Zero Engine (Fria Ligan)** | [`04-year-zero-engine.md`](04-year-zero-engine.md) | Year Zero Roller, Alien RPG, Blade Runner, Vaesen, Twilight: 2000, Forbidden Lands, Coriolis (TGD, Overhaul, YZE), Mutant: Year Zero, Dragonbane, The Walking Dead Universe (TWDU), MÖRK BORG, CY_BORG. |
| **05. Sci-Fi, Cyberpunk, Mecha & Espaço** | [`05-pulp-scifi-and-cyberpunk.md`](05-pulp-scifi-and-cyberpunk.md) | Cyberpunk RED Core, Cyberpunk 2020, Shadowrun 5e/6e, CBR+PNK, Lancer Mech, Warhammer 40k (Wrath & Glory, Imperium Maledictum), OpenD6 Space, Fallout 2d20, CAIN, Wasteland, Cosmere RPG (+ Stormlight Compendium), Invincible, Triangle Agency, Star Wars FFG, Star Trek Adventures, Traveller Mongoose 2e, Starfinder 1e, Achtung! Cthulhu 2d20, Shadow City: Blood & Neon. |
| **06. Narrativos, PbtA & FitD** | [`06-narrative-and-pbta-fitd.md`](06-narrative-and-pbta-fitd.md) | Blades in the Dark, PbtA Genérico, Dungeon World, City of Mist, Fate Core/Accelerated, Perigos & Princesas (*Perils & Princesses*), Crônicas RPG, The Witch Is Dead. |
| **07. Genéricos, Clássicos & Regras Leves** | [`07-generic-and-rules-light.md`](07-generic-and-rules-light.md) | GURPS 4e, Savage Worlds (SWADE), Basic RolePlaying (BRP), Tagmar & Tagmar 3.0, Warhammer Fantasy 4e (WFRP4e), Zweihänder & Reforged, Legend of the Five Rings (L5R 4e/5e), Mutants & Masterminds 3e, Cypher System, Symbaroum, Age of Sigmar Soulbound, ICRPG (Master Edition & Core), EZD6, True D6, Cordel RPG, Universal Tabletop System, 7th Sea 2e, Cortex Prime, Mausritter, TRPG (Tormenta clássico), Shinobi no Sho & Revamp, Ronin, Fabula Ultima (Project FU), Goblin Slayer TTRPG, Sword World 2.5 (sw25), Shinobigami, Wilderfeast, Mythic RPG / GME, HERO System 6e, CSB, Worldbuilding, 3D&T Alpha/Victory, ABEA, Ars Magica 5e, The One Ring 2e, The Witcher, Shadow of the Demon Lord / Weird Wizard, TinyD6. |

---

### 🔍 Descoberta Dinâmica de Sistemas Não Catalogados

Sempre que o desenvolvedor ou usuário perguntar sobre um sistema de RPG que **não** conste nesta base de conhecimento local:
1. O Agente de IA **DEVE OBRIGATORIAMENTE consultar o Diretório Oficial de Sistemas do Foundry VTT com suporte a paginação**: [**https://foundryvtt.com/packages/systems?page=1**](https://foundryvtt.com/packages/systems?page=1) (iterando pelas páginas subsequentes `?page=2`, `?page=3`, etc., conforme necessário).
2. Localizar o identificador do pacote (`id`), versões suportadas do Foundry (`compatibility`), link do manifesto (`manifest`) e o repositório oficial de código-fonte (GitHub, GitLab, Gitea, etc.).
3. Inspecionar o `system.json` e os esquemas/templates do sistema para entender a árvore de dados antes de escrever código ou macros.

### 🧩 Protocolo de Recomendação de Módulos & Loja Oficial
Sempre que for solicitada recomendação de módulos ou materiais para enriquecer qualquer sistema (automação de regras, UI, dados 3D, efeitos sonoros, compêndios, iluminação, aventuras oficiais):
- **Diretório Oficial de Módulos (Comunitário/Geral):** O Agente de IA **DEVE OBRIGATORIAMENTE consultar a lista de módulos oficiais com paginação**: [**https://foundryvtt.com/packages/modules?page=1**](https://foundryvtt.com/packages/modules?page=1) (iterando por `?page=2`, `?page=3`, etc.).
- **Loja Oficial Foundry VTT Store (Investimento/Conteúdo Premium):** Caso o desenvolvedor queira investir dinheiro ou buscar compêndios oficiais de livros de regras, artes, mapas e campanhas prontas, o Agente **DEVE pesquisar na Loja Oficial**: [**https://www.foundryvtt.store/search?q=<PALAVRA_CHAVE>**](https://www.foundryvtt.store/search?q=Savage+Worlds) substituindo o termo de busca pelo sistema desejado (ex: `?q=Savage+Worlds`, `?q=dnd`, `?q=pathfinder`, `?q=warhammer`, `?q=alien`) para indicar os produtos comerciais recomendados.
- É indispensável informar ao desenvolvedor a origem dos módulos (gratuitos no diretório oficial, de código aberto no GitHub/GitLab, ou comerciais/pagos na Loja Oficial/Patreon).

---

### ⚠️ Armadilhas Comuns e Boas Práticas

1. **Evitar Sobrescrita Direta de Métodos:** Nunca substitua métodos de classe (`Actor.prototype.prepareDerivedData` ou `Item.prototype.roll`) com atribuição direta. Utilize sempre a biblioteca `libWrapper` para garantir compatibilidade com múltiplos módulos.
2. **Respeitar os DataModels do Sistema:** Em versões modernas do Foundry (v10+), sistemas utilizam `TypeDataModel`. Não tente injetar campos diretamente em `system` sem declarar um schema; use `flags.<seu-modulo>.<campo>`.
3. **Internacionalização (i18n):** Nunca utilize textos fixos diretamente no código JavaScript ou templates HTML. Use sempre `game.i18n.localize("CHAVE.CAMPO")` ou `{{localize 'CHAVE.CAMPO'}}`.
4. **Active Effects Específicos do Sistema:** Verifique se o sistema suporta Active Effects padrão do Foundry ou se implementa um pipeline proprietário de modificadores (ex: Rule Elements do PF2e).
