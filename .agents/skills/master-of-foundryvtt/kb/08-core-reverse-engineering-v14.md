# Engenharia Reversa do Core: Foundry Virtual Tabletop v14.369 Stable 🔬⚡
> **Fonte:** Análise estática byte-a-byte do código-fonte real localizado em `E:\RPG\VTT\FoundryVTT\App\resources\app`
> **Versão Auditada:** Foundry VTT 14.369.0 (Electron / Node.js ESM)
> **Autor da Análise:** GM Charles Corrêa & Antigravity Agent

---

## 📌 Sumário Executivo
Esta documentação consolida as regras, arquiteturas, assinaturas e métodos extraídos diretamente do core do **Foundry Virtual Tabletop v14.369**. Use este guia como referência absoluta para criar sistemas, módulos, macros, fichas com `ApplicationV2`, esquemas de dados estritos com `DataModel` e manipular cenas com o novo sistema de Regiões e Níveis.

---

## 1. Arquitetura de Documentos do Core (36 Tipos)
Tanto no cliente (`client/documents`) quanto no servidor/comum (`common/documents`), o Foundry v14 opera sobre 36 tipos de Documentos que herdam de `foundry.abstract.Document`:

| Documento | Localização | Propósito & Mecânica |
| :--- | :--- | :--- |
| `ActiveEffect` | `common/documents/active-effect.mjs` | Modificadores dinâmicos de dados em Atores ou Itens. |
| `Actor` | `common/documents/actor.mjs` | Entidade viva (PJ, NPC, Criatura, Veículo). |
| `ActorDelta` | `common/documents/actor-delta.mjs` | Modificações diferenciais para Tokens não vinculados. |
| `Adventure` | `common/documents/adventure.mjs` | Pacote composto de aventura (cenas, atores, itens, diários). |
| `AmbientLight` | `common/documents/ambient-light.mjs` | Fonte de iluminação na cena. |
| `AmbientSound` | `common/documents/ambient-sound.mjs` | Fonte de áudio posicional na cena. |
| `Card` | `common/documents/card.mjs` | Carta individual contida em baralho ou pilha. |
| `Cards` | `common/documents/cards.mjs` | Coleção de cartas (baralho, mão, descarte). |
| `ChatMessage` | `common/documents/chat-message.mjs` | Mensagem do chat, rolagens de dados e whispers. |
| `Combat` | `common/documents/combat.mjs` | Gerenciador de combate, rodadas e turnos. |
| `Combatant` | `common/documents/combatant.mjs` | Participante individual da iniciativa. |
| `CombatantGroup` | `common/documents/combatant-group.mjs` | Agrupamento de combatentes na iniciativa. |
| `Drawing` | `common/documents/drawing.mjs` | Formas vetoriais e desenhos livres na cena. |
| `FogExploration` | `common/documents/fog-exploration.mjs` | Estado de névoa de guerra por usuário/cena. |
| `Folder` | `common/documents/folder.mjs` | Pastas organizacionais na barra lateral. |
| `Item` | `common/documents/item.mjs` | Equipamento, magia, talento, perito, característica. |
| `JournalEntry` | `common/documents/journal-entry.mjs` | Artigo de diário composto por múltiplas páginas. |
| `JournalEntryCategory`| `common/documents/journal-entry-category.mjs` | Categorização e índice para diários. |
| `JournalEntryPage` | `common/documents/journal-entry-page.mjs` | Página individual (Texto, Imagem, PDF, Vídeo). |
| `Level` | `common/documents/level.mjs` | **Novo no v14:** Altura/elevação e planos na cena. |
| `Macro` | `common/documents/macro.mjs` | Script JavaScript ou comando de chat salvo. |
| `MeasuredTemplate` | `common/documents/measured-template.mjs` | Áreas de efeito (cone, raio, raio, linha). |
| `Note` | `common/documents/note.mjs` | Marcador de diário interativo no mapa. |
| `Playlist` | `common/documents/playlist.mjs` | Lista de reprodução de trilhas sonoras. |
| `PlaylistSound` | `common/documents/playlist-sound.mjs` | Faixa individual de áudio. |
| `Region` | `common/documents/region.mjs` | **Novo/Expandido:** Zonas geográficas poligonais na cena. |
| `RegionBehavior` | `common/documents/region-behavior.mjs` | Automação e scripts acionados por regiões. |
| `RollTable` | `common/documents/roll-table.mjs` | Tabela rolável de probabilidades. |
| `Scene` | `common/documents/scene.mjs` | Mapa de jogo com canvas, iluminação e camadas. |
| `Setting` | `common/documents/setting.mjs` | Configuração persistente do mundo ou cliente. |
| `TableResult` | `common/documents/table-result.mjs` | Entrada individual de uma tabela rolável. |
| `Tile` | `common/documents/tile.mjs` | Elemento gráfico estático ou animado sobreposto ao mapa. |
| `Token` | `common/documents/token.mjs` | Representação gráfica de um Ator no canvas. |
| `User` | `common/documents/user.mjs` | Conta de jogador ou mestre no mundo. |
| `Wall` | `common/documents/wall.mjs` | Barreira de visão, movimento, luz ou som. |

---

## 2. A Arquitetura ApplicationV2 (Substituta definitiva do Application V1)
No v14, qualquer nova interface (fichas, diálogos, menus) **deve** estender `ApplicationV2` ou mixins derivados.

### Principais Classes da API
- `foundry.applications.api.ApplicationV2`: Classe base que estende `EventEmitterMixin()`.
- `foundry.applications.api.HandlebarsApplicationMixin(Base)`: Mixin para renderização via templates Handlebars (`.hbs`).
- `foundry.applications.api.DocumentSheetV2`: Classe especializada para fichas de Documentos (`ActorSheet`, `ItemSheet`).
- `foundry.applications.api.DialogV2`: Diálogos modais assíncronos (`DialogV2.wait`, `DialogV2.prompt`, `DialogV2.confirm`).

### Anatomia de uma Ficha com `DocumentSheetV2` + `HandlebarsApplicationMixin`
```javascript
const { ApplicationV2, HandlebarsApplicationMixin, DocumentSheetV2 } = foundry.applications.api;

export class MyCustomActorSheet extends HandlebarsApplicationMixin(DocumentSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["my-system", "sheet", "actor"],
    tag: "form",
    window: {
      title: "MY_SYSTEM.ActorSheetTitle",
      icon: "fa-solid fa-user",
      resizable: true
    },
    position: {
      width: 600,
      height: 700
    },
    actions: {
      rollCheck: MyCustomActorSheet.#onRollCheck,
      editItem: MyCustomActorSheet.#onEditItem
    },
    form: {
      handler: MyCustomActorSheet.#onSubmitForm,
      submitOnChange: true,
      closeOnSubmit: false
    }
  };

  static PARTS = {
    header: {
      template: "systems/my-system/templates/actor/header.hbs"
    },
    tabs: {
      template: "templates/generic/tab-navigation.hbs"
    },
    biography: {
      template: "systems/my-system/templates/actor/biography.hbs"
    }
  };

  async _prepareContext(options) {
    const context = {
      actor: this.document,
      system: this.document.system,
      isEditable: this.isEditable,
      user: game.user
    };
    return context;
  }

  static async #onRollCheck(event, target) {
    event.preventDefault();
    const stat = target.dataset.stat;
    const roll = new Roll("1d20 + @mod", { mod: this.document.system.attributes[stat].value });
    await roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.document }) });
  }

  static async #onSubmitForm(event, form, formData) {
    await this.document.update(formData.object);
  }
}
```

---

## 3. Catálogo de Campos de Esquema: `foundry.data.fields`
No v14, **o `template.json` foi completamente banido**. Todos os dados do sistema e modelos embutidos devem utilizar `foundry.abstract.TypeDataModel` e os campos em `foundry.data.fields.*`:

- `SchemaField`: Estrutura hierárquica contendo um grupo de campos.
- `BooleanField`: Valor booleano (`true`/`false`).
- `NumberField`: Número inteiro ou flutuante (`integer: true`, `min`, `max`, `step`, `initial`).
- `StringField`: Texto (`choices`, `blank: false`, `trim: true`).
- `ObjectField`: Objeto genérico não estruturado.
- `TypedObjectField`: Dicionário onde cada chave mapeia para um `DataField` fixo.
- `ArrayField`: Lista de valores de um `DataField` específico.
- `SetField`: Conjunto `Set` de elementos únicos.
- `EmbeddedDataField`: Modela um `DataModel` aninhado dentro de outro.
- `EmbeddedCollectionField`: Coleção embutida de documentos gerenciados.
- `DocumentIdField`: String validada como um ID de 16 caracteres de documento Foundry.
- `DocumentUUIDField`: String no formato `Actor.<id>.Item.<id>`.
- `ForeignDocumentField`: Referência cruzada direta para outro `DataModel` por ID.
- `ColorField`: String validada como cor hexadecimal CSS (ex: `#ff0000`).
- `FilePathField`: Caminho para asset com restrições (`categories: ["IMAGE", "AUDIO", "VIDEO"]`).
- `AngleField` / `AlphaField` / `HueField`: Campos numéricos otimizados para rotação, transparência e cor.
- `HTMLField`: String higienizada para código HTML seguro.
- `JavaScriptField`: Código executável com verificação de sintaxe.
- `JSONField`: Objeto serializado em JSON.
- `TypeDataField`: Usado pelo core para mapear a propriedade `document.system` de acordo com o `document.type`.
- `ShapesField`: Campo vetorial para regiões geométricas.

---

## 4. Regiões e Automações de Mapa (`RegionBehavior`)
O Foundry v14 substitui armadilhas manuais e scripts avulsos pelo sistema nativo de **Cenas com Regiões** (`Region` e `RegionBehavior`). Os tipos de comportamentos pré-construídos no core são:

1. `AdjustDarknessLevelRegionBehaviorType`: Modifica a iluminação local ao entrar.
2. `ApplyActiveEffectRegionBehaviorType`: Aplica condições ou efeitos ao token dentro da região.
3. `ChangeLevelRegionBehaviorType`: Altera o nível de altitude do token na cena.
4. `DefineSurfaceRegionBehaviorType`: Define atrito, tipo de terreno e sons de passos.
5. `DisplayScrollingTextRegionBehaviorType`: Exibe texto flutuante na tela do jogador.
6. `ExecuteMacroRegionBehaviorType`: Roda uma macro salva ao disparar gatilhos (`tokenEnter`, `tokenExit`, `tokenRoundStart`).
7. `ExecuteScriptRegionBehaviorType`: Executa script JS embutido diretamente na região.
8. `ModifyMovementCostRegionBehaviorType`: Modifica custo de movimento (terreno difícil, dobro de custo).
9. `PauseGameRegionBehaviorType`: Pausa o jogo automaticamente se um jogador entrar na zona.
10. `SuppressWeatherRegionBehaviorType`: Bloqueia chuva, neve ou fumaça dentro da área fechada.
11. `TeleportTokenRegionBehaviorType`: Teletransporta o token para coordenadas de destino.
12. `ToggleBehaviorRegionBehaviorType`: Liga ou desliga outro comportamento em cadeia.

---

## 5. Web Components Nativos do Core v14
O Foundry v14 renderiza elementos web nativos customizados na interface, que devem ser usados em templates `.hbs` em vez de inputs convencionais:
- `<color-picker>`: Seletor moderno de cores em paleta e espectro.
- `<file-picker>`: Seletor com botão de browse integrado e pré-visualização.
- `<range-picker>`: Slider numérico sincronizado com caixa de texto.
- `<string-tags>` & `<document-tags>`: Caixas de seleção com tags tipo 'chips' removíveis.
- `<prosemirror-editor>`: Editor de texto rico com suporte a segredos e links de compêndio.
- `<multi-select>`: Dropdown de seleção múltipla estilizado.
- `<secret-block>`: Bloco com visualização exclusiva para o GM.

---

## 6. Lista Canônica dos 105 Ganchos (Hooks) Oficiais do v14.369
O arquivo `client/hooks.mjs` define a ordem canônica do ciclo de vida da aplicação:

### Ciclo Inicial e Aplicação
1. `init` -> Disparado no primeiro instante da inicialização do Foundry.
2. `i18nInit` -> Quando as tabelas de tradução de idiomas são lidas.
3. `setup` -> Quando o núcleo está configurado, antes do mundo carregar.
4. `ready` -> Quando o mundo, banco de dados e telas estão 100% carregados.
5. `streamReady` -> Disponibilidade do canal de WebRTC/AV.
6. `error` -> Interceptador global de falhas da engine.
7. `pauseGame` -> Quando o GM aperta espaço para pausar o jogo.
8. `updateWorldTime` -> Avanço de relógio do mundo.

### Canvas e Cenas
9. `canvasConfig`, 10. `canvasInit`, 11. `canvasPan`, 12. `canvasReady`, 13. `canvasTearDown`, 14. `canvasDraw`, 15. `dropCanvasData`, 16. `highlightObjects`, 17. `initializeEdges`.

### Interfaces e Janelas (ApplicationV2)
18. `preRenderApplication`, 19. `renderApplicationV2`, 20. `renderApplicationV1`, 21. `getHeaderControlsApplicationV2`, 22. `getApplicationV1HeaderButtons`, 23. `closeApplicationV2`, 24. `closeApplicationV1`, 25. `getSceneControlButtons`, 26. `hotbarDrop`, 27. `getDocumentContextOptions`, 28. `getPlaceableContextOptions`, 29. `collapseSidebar`, 30. `changeSidebarTab`, 31. `collapseSceneNavigation`, 32. `openDetachedWindow`, 33. `closeDetachedWindow`.

### Camadas e Objetos
34. `drawGroup`, 35. `tearDownGroup`, 36. `drawLayer`, 37. `tearDownLayer`, 38. `pastePlaceableObject`, 39. `applyActiveEffect`, 40. `updateCompendium`.

### Ciclo CRUD de Documentos (Canceláveis com `return false`)
41. `preCreateDocument(doc, data, options, userId)`
42. `preUpdateDocument(doc, changes, options, userId)`
43. `preDeleteDocument(doc, options, userId)`
44. `createDocument(doc, options, userId)`
45. `updateDocument(doc, changes, options, userId)`
46. `deleteDocument(doc, options, userId)`

### Movimento e Tokens
47. `preMoveToken`, 48. `moveToken`, 49. `stopToken`, 50. `pauseToken`, 51. `planToken`, 52. `recordToken`, 53. `drawObject`, 54. `refreshObject`, 55. `destroyObject`, 56. `controlObject`, 57. `hoverObject`, 58. `applyTokenStatusEffect`, 59. `chatBubbleHTML`, 60. `modifyTokenAttribute`, 61. `targetToken`.

### Iluminação, Áudio e Visão
62. `activateNote`, 63. `initializeRenderedEffectSourceShaders`, 64. `dealCards`, 65. `passCards`, 66. `returnCards`, 67. `applyCompendiumArt`, 68. `dropActorSheetData`, 69. `activateLayer`, 70. `activateCanvasLayer`, 71. `deactivateLayer`, 72. `configureCanvasEnvironment`, 73. `initializeCanvasEnvironment`, 74. `initializeVisionMode`, 75. `initializeVisionSources`, 76. `lightingRefresh`, 77. `soundsRefresh`, 78. `visibilityRefresh`, 79. `initializeLightSources`, 80. `initializeSoundSources`, 81. `initializePriorityLightSources`, 82. `sightRefresh`, 83. `initializeWeatherEffects`.

### Combate, Cartas e Aventuras
84. `preImportAdventure`, 85. `importAdventure`, 86. `userConnected`, 87. `combatTurnChange`, 88. `combatStart`, 89. `combatTurn`, 90. `combatRound`, 91. `initializeCombatConfiguration`.

### Editor de Texto e Chat
92. `getProseMirrorMenuDropDowns`, 93. `getProseMirrorMenuItems`, 94. `createProseMirrorEditor`, 95. `hotReload`, 96. `chatInput`, 97. `renderChatInput`, 98. `chatMessage`, 99. `renderChatMessageHTML`, 100. `globalVolumeChanged`, 101. `rtcSettingsChanged`, 102. `clientSettingChanged`, 103. `dropRollTableSheetData`, 104. `initializeDynamicTokenRingConfig`, 105. `activateEditorLegacy`.
