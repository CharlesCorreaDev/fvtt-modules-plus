# Foundry VTT - Developer & GM Cheatsheet

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

// Render Hook (triggers on UI window rendering)
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

---

## 🇧🇷 Português
### 1. Hooks Fundamentais do Ciclo de Vida
- `Hooks.once('init')`: Registro de configurações, templates, DataModels e fichas.
- `Hooks.once('setup')`: Executado após a carga das configurações do mundo.
- `Hooks.once('ready')`: Executado quando o canvas e o mundo estão 100% prontos.
- `Hooks.on('render<App>')`: Disparado sempre que uma janela gráfica é renderizada.
