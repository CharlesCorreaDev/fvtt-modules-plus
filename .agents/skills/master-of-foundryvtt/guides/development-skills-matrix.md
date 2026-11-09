# Diretório de Especializações e Skills de Desenvolvimento para Foundry VTT 🎯🛠️
> *Catálogo de Competências Técnicas, Arquiteturas de Módulos e Padrões de Engenharia*
> *Master of Foundry VTT by GM Charles Corrêa*

---

## 📌 Visão Geral

Este documento consolida e mapeia os domínios de especialização técnica essenciais para desenvolvedores de módulos, sistemas e automações no Foundry Virtual Tabletop, baseando-se nos padrões de engenharia catalogados no ecossistema de ferramentas e MCPs do Foundry VTT.

---

## 🏗️ As Especializações de Engenharia no Foundry VTT

| Domínio de Especialização | Arquitetura & Responsabilidades Centrais | Referências & Guias Internos |
| :--- | :--- | :--- |
| **1. Applications & UI Modernization** | Desenvolvimento de janelas e interfaces utilizando a nova **`ApplicationV2`** (v12+ / v14+), renderização por Handlebars, formulários com `foundry.data.fields` e ciclo de vida reativo (`_renderHTML`, `_prepareContext`). | [`versions/v12-api-guide.md`](../versions/v12-api-guide.md), [`versions/v14-api-guide.md`](../versions/v14-api-guide.md) |
| **2. Sheet Development (Actor & Item)** | Criação e estilização de fichas de Atores e Itens (`ActorSheetV2`, `ItemSheetV2`), abas de navegação, sincronização bidirecional de dados com `FormDataExtended`, arrastar e soltar (drag-and-drop de itens e efeitos). | [`guides/creating-systems.md`](creating-systems.md), [`guides/creating-modules.md`](creating-modules.md) |
| **3. Hooks & Event Architecture** | Especialista no ciclo de ganchos do Foundry (`init`, `setup`, `ready`, `canvasReady`, `renderActorSheet`, `preCreateItem`, `updateActor`), interceptação segura sem sobrescrita direta e integração com `libWrapper`. | [`guides/troubleshooting.md`](troubleshooting.md), [`versions/v14-api-guide.md`](../versions/v14-api-guide.md) |
| **4. Active Effects & Statuses Management** | Modelagem de modificadores de atributos, duração em turnos ou segundos mundiais, transferência de efeitos de itens para atores, status proprietários (`CONFIG.statusEffects`) e integração com `ActiveEffectConfig`. | [`guides/active-effects.md`](active-effects.md) |
| **5. Combat Tracker & Automation** | Ciclos de combate (`Combat`, `Combatant`), cálculo de iniciativas personalizadas (`CONFIG.Combat.initiative`), controle de turnos/rodadas e automação de acertos, dano e reações. | [`guides/combat.md`](combat.md) |
| **6. Dice Rolling & Chat Management** | Avaliação segura de fórmulas de dados (`Roll.create()`, `roll.evaluate()`), termos customizados de dados (`Die`, `DiceTerm`), rolagens 3D (`Dice So Nice`) e formatação de mensagens de chat ricas. | [`kb/04-dice-rolling-and-chat.md`](../kb/04-dice-rolling-and-chat.md), [`guides/macros-and-tables.md`](macros-and-tables.md) |
| **7. Data Models & Schema Storage** | Implementação de esquemas fortes com `foundry.abstract.TypeDataModel`, validação de tipos com `foundry.data.fields` (StringField, NumberField, SchemaField) e eliminação completa do obsoleto `template.json`. | [`versions/v11-api-guide.md`](../versions/v11-api-guide.md), [`versions/v14-api-guide.md`](../versions/v14-api-guide.md) |
| **8. Data Migrations & Compatibility** | Scripts de migração de versões antigas do mundo para novos esquemas (`DataModel.migrateData()`), garantia de integridade de dados e rotinas de backup antes de atualizações destrutivas. | [`guides/cli-tools.md`](cli-tools.md), [`versions/v10-api-guide.md`](../versions/v10-api-guide.md) |
| **9. Compendium Pack Management** | Empacotamento e desempacotamento de compêndios no formato moderno **ClassicLevel / LevelDB** utilizando as ferramentas oficiais `@foundryvtt/foundryvtt-cli`, criação de índices de consulta rápida e metadados. | [`guides/cli-tools.md`](cli-tools.md), [`kb/06-compendiums-and-world-data.md`](../kb/06-compendiums-and-world-data.md) |
| **10. Socket & Multiplayer RPC** | Comunicação bidirecional cliente-servidor em tempo real através do barramento nativo `game.socket.emit("system.<id>", data)` ou da biblioteca comunitária `socketlib` com execução segura de funções no GM. | [`guides/sockets.md`](sockets.md) |
| **11. Canvas, Lighting & Vision** | Manipulação do palco PixiJS v8, camadas do Canvas (`PlaceablesLayer`, `PrimaryCanvasGroup`), fontes de luz dinâmicas, oclusão de visão (Fog of War) e efeitos visuais customizados. | [`kb/02-scenes-lighting-and-vision.md`](../kb/02-scenes-lighting-and-vision.md), [`versions/v14-api-guide.md`](../versions/v14-api-guide.md) |
| **12. Internationalization (i18n)** | Estruturação de arquivos de tradução em JSON (`lang/pt-BR.json`, `lang/en.json`), uso rigoroso de `game.i18n.localize` e `game.i18n.format` sem nenhum texto fixo (hardcoded) no código ou templates. | [`policies/branding.md`](../policies/branding.md) |
| **13. Error Handling & Safe Updates** | Tratamento defensivo de erros (`try/catch` em ganchos assíncronos), prevenção de descontinuações da API e procedimentos de isolamento de módulos conflitantes com modo de segurança. | [`guides/troubleshooting.md`](troubleshooting.md) |
| **14. Module & System Scaffolding** | Estruturação profissional de novos pacotes com manifestos corretos (`module.json` / `system.json`), compatibilidade de versões (`compatibility.minimum` e `verified`), builds modernos com Vite/TypeScript e linting. | [`guides/creating-modules.md`](creating-modules.md), [`guides/creating-systems.md`](creating-systems.md) |

---

## 🚀 Como Esta Base Auxilia Desenvolvedores e Agentes de IA

Sempre que uma demanda envolver um desses 14 domínios de especialização, o Agente de IA **deve consultar o guia correspondente** nesta base de conhecimento antes de gerar código ou propor alterações estruturais, garantindo total conformidade com a versão do Foundry VTT informada pelo desenvolvedor.
