# Patterns - Bootstrap UX/UI Plus 🎨⚡

## 1. Padrão de Namespacing Estrito (Zero Leakage)
Nunca importe Bootstrap no escopo global `:root` ou `body`.
Use SCSS aninhado:

```scss
// styles/module.scss
.fvtt-bs, .meu-modulo-theme {
  @import "bootstrap/scss/functions";
  @import "bootstrap/scss/variables";
  @import "bootstrap/scss/mixins";
  @import "bootstrap/scss/utilities";
  @import "bootstrap/scss/grid";
  @import "bootstrap/scss/buttons";
  @import "bootstrap/scss/forms";
  @import "bootstrap/scss/card";
  @import "bootstrap/scss/badge";
  @import "bootstrap/scss/alert";
}
```

## 2. Padrão ApplicationV2 com Actions Nativas
No Foundry v14+, evite jQuery listeners em botões. Utilize `data-action`:

```javascript
export class MeuModuloSheet extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    tag: "form",
    actions: {
      saveSettings: MeuModuloSheet.#onSave,
      resetDefaults: MeuModuloSheet.#onReset
    }
  };

  static async #onSave(event, target) {
    event.preventDefault();
    ui.notifications.info("Configurações salvas!");
  }
}
```

