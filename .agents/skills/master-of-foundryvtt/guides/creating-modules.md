# Complete Guide: Module Development for Foundry Virtual Tabletop

> **Official Reference:** [https://foundryvtt.com/article/module-development/](https://foundryvtt.com/article/module-development/)

---

## 1. Module Manifest (`module.json`)
```json
{
  "id": "my-enhancement-module",
  "title": "My Enhancement Module",
  "description": "Adds tactical automation and custom UI overlays.",
  "version": "1.0.0",
  "compatibility": { "minimum": "11", "verified": "12" },
  "authors": [{ "name": "Charles Corrêa", "email": "charlescorreaweb@gmail.com" }],
  "esmodules": ["scripts/main.mjs"],
  "styles": ["styles/module.css"],
  "relationships": {
    "requires": [
      { "id": "lib-wrapper", "type": "module", "manifest": "https://github.com/ruipin/fvtt-lib-wrapper/releases/latest/download/module.json" }
    ]
  }
}
```

---

## 2. Registering Settings & Hooks (`scripts/main.mjs`)
```javascript
Hooks.once('init', () => {
  console.log('MyModule | Initializing settings...');

  game.settings.register('my-enhancement-module', 'enableFeature', {
    name: 'Enable Advanced Automation',
    hint: 'Toggles advanced combat calculations.',
    scope: 'world',      // 'world' (GM-only synced) or 'client' (per-user)
    config: true,
    type: Boolean,
    default: true,
    onChange: value => console.log(`Feature toggled: ${value}`)
  });
});

Hooks.on('renderChatMessage', (message, html, data) => {
  // Inject custom button into chat cards
  if (message.isRoll) {
    html.find('.message-content').append('<button class="apply-damage">Apply Damage</button>');
  }
});
```

---

## 3. Method Interception with `libWrapper`
```javascript
Hooks.once('setup', () => {
  if (typeof libWrapper !== 'function') return;

  libWrapper.register('my-enhancement-module', 'Token.prototype._onHoverIn', function(wrapped, ...args) {
    // Execute custom logic before standard hover
    console.log('Hovering token:', this.name);
    return wrapped(...args); // Call original method
  }, 'WRAPPER');
});
```
