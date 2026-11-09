---
name: bootstrap-ux-ui-plus
description: Suíte de UI/UX Moderna e Segura com Bootstrap 5.3+ isolado para Foundry VTT (v12, v13, v14.369 Stable e v15+) e ecossistemas web. Enforça namespacing CSS rigoroso (.fvtt-bs / prefixos de pacote) para prevenir contaminação visual, reatividade com ApplicationV2 e HandlebarsApplicationMixin, componentes modulares, acessibilidade (WCAG AA), e temas dinâmicos (Dark/Light).
license: MIT
version: 1.0.0
tags: [foundryvtt, bootstrap, ui, ux, applicationv2, css-isolation, design-system]
---

# Bootstrap UX/UI Plus 🎨⚡

> **Missão:** Fornecer aos desenvolvedores de Foundry VTT e aplicações web modernas uma biblioteca arquitetural de componentes de interface refinados baseados em **Bootstrap 5.3+**, blindados com **Namespacing Estrito de CSS** (evitando qualquer vazamento para o canvas do Foundry ou outros módulos) e compatibilidade total com **`foundry.applications.api.ApplicationV2`**.

---

## 🛡️ O Mandamento Supremo: Isolamento CSS (.fvtt-bs)

No Foundry VTT, carregar CSS global como `.btn`, `.modal` ou `.card` sem prefixo quebra o Foundry, a sidebar, o chat e módulos de terceiros.
**Regra de ouro:** Todo estilo Bootstrap DEVE ser envelopado sob um container específico ou prefixado:

```scss
// Exemplo de isolamento seguro no SCSS do seu módulo
.fvtt-bs, .meu-modulo-container {
  @import "bootstrap/scss/bootstrap";
  
  // Customizações para bater com a estética de Foundry VTT
  font-family: var(--font-primary, "Signika", sans-serif);
}
```

---

## 🧩 Integração com ApplicationV2 (Foundry v13 / v14)

```javascript
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ModernModuleConfigSheet extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "meu-modulo-config",
    classes: ["fvtt-bs", "meu-modulo-window"],
    tag: "form",
    window: {
      title: "Meu Módulo - Painel de Configuração",
      icon: "fa-solid fa-cogs",
      resizable: true
    },
    position: {
      width: 620,
      height: "auto"
    }
  };

  static PARTS = {
    form: {
      template: "modules/meu-modulo/templates/config-sheet.hbs"
    }
  };

  async _prepareContext(options) {
    return {
      settings: game.settings.get("meu-modulo", "config")
    };
  }
}
```

---

## 🎨 Componentes Padrão Recomendados

1. **Badge Indicadores Dopaminérgicos:** Status claro de ativação/desativação.
2. **Cards de Ação Rápida:** Botões grandes e clicáveis para ações críticas.
3. **Accordions Expansíveis:** Evitam poluição visual mantendo configurações avançadas recolhidas.
4. **Form Controls Acessíveis:** Labels associados a inputs para navegação fluida por teclado e leitores de tela.

