# Guia de Engenharia Full Stack (JavaScript, CSS, Sass, Node.js) no Foundry VTT 🚀

Este guia estabelece os padrões técnicos que o agente especialista deve dominar para criar sistemas, módulos e ferramentas de nível profissional para Foundry VTT.

---

## 1. JavaScript Moderno no Foundry VTT (v12 / v13 / v14)

### Padrão ApplicationV2 e DataModel
No Foundry VTT v14+, todo sistema ou módulo profissional utiliza `foundry.applications.api.ApplicationV2` ou `foundry.applications.sheets.ActorSheetV2` em conjunto com `foundry.abstract.TypeDataModel`.

```javascript
// Exemplo: Sistema Year Zero Engine com ApplicationV2
const { ActorSheetV2 } = foundry.applications.sheets;

export class YzeActorSheet extends ActorSheetV2 {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["yze-sheet", "yze-actor-sheet"],
    tag: "form",
    window: {
      resizable: true,
      title: "YZE.ActorSheetTitle"
    },
    position: {
      width: 720,
      height: 640
    },
    actions: {
      rollSkill: YzeActorSheet.#onRollSkill,
      pushRoll: YzeActorSheet.#onPushRoll
    }
  };

  /** @override */
  static PARTS = {
    header: {
      template: "systems/yze/templates/parts/header.hbs"
    },
    tabs: {
      template: "templates/generic/tab-navigation.hbs"
    },
    attributes: {
      template: "systems/yze/templates/parts/attributes.hbs"
    },
    inventory: {
      template: "systems/yze/templates/parts/inventory.hbs"
    }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.system = this.actor.system;
    context.isGM = game.user.isGM;
    return context;
  }

  static async #onRollSkill(event, target) {
    const skillName = target.dataset.skill;
    // Dispara rolagem de dados
  }
}
```

### Boas Práticas JS:
- **Zero AI Watermarks & Slop:** Código conciso, limpo e idiomático (sem comentários óbvios redundantes).
- **Comentários Obrigatórios em Inglês e Português:** Sempre que for estritamente necessário inserir comentários de código (como decisões arquiteturais complexas, workarounds do core ou lógicas de regras não óbvias), **os comentários DEVEM ser escritos em Inglês e Português** no formato bilíngue:
  ```javascript
  // EN: Core workaround: prevent initiative reset when rerolling push dice
  // PT-BR: Workaround do core: evita reset de iniciativa ao rerolar dados de push
  if (isPush) return rollResult;
  ```
- **Early Returns:** `if (!actor) return;` ao invés de aninhamento excessivo de `if/else`.
- **Hooks e Eventos:** Sempre registre hooks com callbacks bem estruturados: `Hooks.on("ready", () => {})`.

---

## 2. CSS Moderno, CSS Variables e Sass para Foundry VTT

### Escopo e Não-Poluição do DOM
Todas as folhas de estilo do sistema ou módulo devem ser aninhadas na classe raiz da aplicação:

```scss
// assets/styles/system.scss
.yze-sheet {
  // Variáveis escopadas
  --yze-font-main: "Signika", sans-serif;
  --yze-primary: #8b0000;
  --yze-secondary: #2b2b2b;
  --yze-bg: #141416;
  --yze-accent: #e28743;
  --yze-border-radius: 6px;

  font-family: var(--yze-font-main);
  background: var(--yze-bg);
  color: #f0f0f0;

  // Grid responsivo prefixado
  .yze-row {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
  }

  .yze-col-6 {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 0.5rem;
  }

  // Botões customizados
  .yze-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--yze-border-radius);
    padding: 0.4rem 0.8rem;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &.yze-btn-primary {
      background-color: var(--yze-primary);
      color: #fff;
      border: 1px solid lighten(#8b0000, 10%);

      &:hover {
        background-color: lighten(#8b0000, 15%);
      }
    }
  }
}
```

---

## 3. Node.js e Ferramental de Build

Para compilação profissional de pacotes do Foundry VTT:
- **Compilador Sass:** `sass assets/styles/main.scss dist/styles/bundle.css --style=compressed`
- **Validação de Manifests:** `node -e "JSON.parse(fs.readFileSync('module.json'))"`
- **CLI Oficial do Foundry:** `@foundryvtt/foundryvtt-cli` para empacotamento de compêndios ClassicLevel/LevelDB (`fvtt package pack`, `fvtt package unpack`).
- **Automação de Scripts:** Uso de `package.json` limpo com scripts `build`, `watch`, e `validate`.

---

## 4. Recursos Úteis da Comunidade Dev Brasil e Web
- [Guia do Front-end Brasileiro](https://github.com/Guia-Dev-Brasil/guiadofrontend)
- [Padrões de Commits Semânticos](https://github.com/iuricode/padroes-de-commits)
- [Geradores e Ferramentas CSS](https://github.com/Guia-Dev-Brasil/guiadevbrasil#-geradores-de-css)
- [Design Front-End & UI/UX](https://github.com/Guia-Dev-Brasil/guiadevbrasil#-design-front-end)
