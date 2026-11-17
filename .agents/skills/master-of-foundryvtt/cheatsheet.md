# Foundry VTT - Developer & GM Cheatsheet / Guia de Referência Rápida

## 🇺🇸 English
### 1. Essential Lifecycle Hooks
```javascript
// Initialization (register settings, sheet classes, data models)
Hooks.once('init', async function() {
  console.log('MyPackage | Initializing...');
});

// Setup (after game data is loaded, before canvas is initialized)
Hooks.once('setup', function() { ... });

// Ready (canvas is ready, full world is loaded)
Hooks.once('ready', async function() { ... });

// Render Hook (triggers on UI window rendering - ApplicationV2 / Legacy)
Hooks.on('renderActorSheet', (app, html, data) => { ... });
```

### 2. Document CRUD Operations
```javascript
// Create an Actor
const actor = await Actor.create({ name: 'Elven Mage', type: 'character', img: 'icons/svg/mystery-man.svg' });

// Update embedded document
await actor.updateEmbeddedDocuments('Item', [{ _id: itemId, 'system.quantity': 5 }]);

// Delete embedded document
await actor.deleteEmbeddedDocuments('Item', [itemId]);
```

### 3. Canvas & Token Manipulation
```javascript
// Controlled tokens
const selectedTokens = canvas.tokens.controlled;

// Pan canvas
canvas.pan({ x: 1200, y: 900, zoom: 1.5 });
```

### 4. 12-Subagent Quick Delegation Commands
- `@showrunner`: Oversee project workflow and route tasks.
- `@specs-pr`: Generate SemVer 2.0.0 RFC, specs or release PR.
- `@frontend-ui`: Scaffold ApplicationV2 reactive sheets.
- `@backend-datamodel`: Implement TypeDataModel schema and migrations.
- `@qa-tests`: Generate Vitest / Jest test suites and mocks.
- `@auditor-supremo`: Perform strict code quality and security gate review.
- `@doc-bilingue`: Generate dual EN / PT-BR documentation and translations.

---

## 🇧🇷 Português
### 1. Hooks Fundamentais do Ciclo de Vida
- `Hooks.once('init')`: Registro de configurações, templates, DataModels e fichas.
- `Hooks.once('setup')`: Executado após a carga das configurações do mundo.
- `Hooks.once('ready')`: Executado quando o canvas e o mundo estão 100% prontos.
- `Hooks.on('render<App>')`: Disparado sempre que uma janela gráfica é renderizada.

### 2. Operações de CRUD de Documentos
- `Actor.create(...)` / `Item.create(...)`: Criação assíncrona persistida.
- `document.updateEmbeddedDocuments(type, data)`: Atualização atômica em lote de documentos filhos.
- `document.deleteEmbeddedDocuments(type, ids)`: Exclusão segura de documentos embutidos.

### 3. Comandos Rápidos da Suíte de 12 Subagentes
- `@showrunner`: Coordena o fluxo do projeto e aciona os agentes especializados.
- `@specs-pr`: Gera especificações e PRs no padrão SemVer 2.0.0 (PT-BR).
- `@frontend-ui`: Desenvolve fichas e dashboards em ApplicationV2.
- `@backend-datamodel`: Modela esquemas TypeDataModel e migrações seguras.
- `@qa-tests`: Escreve testes unitários e de integração (Vitest/Jest).
- `@auditor-supremo`: Portão de qualidade obrigatório antes de entregar código ao usuário.
- `@doc-bilingue`: Garante documentação e arquivos `languages/*.json` 100% bilíngues.
