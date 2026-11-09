/**
 * [PT-BR] Entrypoint principal de {{PACKAGE_TITLE}} (Vite + TypeScript)
 *         Compatível com Foundry VTT v13, v14.369 Stable & v15+.
 * 
 * [EN]    Main entrypoint for {{PACKAGE_TITLE}} (Vite + TypeScript)
 *         Compatible with Foundry VTT v13, v14.369 Stable & v15+.
 */

import "./style.css";

const MODULE_ID = "{{PACKAGE_ID}}";

// [PT-BR] Acesso à API nativa do ApplicationV2 do Foundry v14+
// [EN] Native access to Foundry v14+ ApplicationV2 API
const { ApplicationV2, HandlebarsApplicationMixin } = (foundry as any).applications.api;

/**
 * [PT-BR] Janela principal reativa construída com ApplicationV2 e classes isoladas .fvtt-bs
 * [EN] Reactive main window built with ApplicationV2 and scoped .fvtt-bs CSS classes
 */
export class MainModuleApp extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-main-window`,
    classes: ["fvtt-bs", `${MODULE_ID}-window`],
    tag: "div",
    window: {
      title: "{{PACKAGE_TITLE}}",
      icon: "fa-solid fa-dice-d20",
      resizable: true
    },
    position: {
      width: 500,
      height: 380
    }
  };

  static PARTS = {
    body: {
      template: `modules/${MODULE_ID}/templates/main-view.hbs`
    }
  };

  /**
   * [PT-BR] Prepara o contexto de dados para renderização do template Handlebars
   * [EN] Prepares data context for Handlebars template rendering
   */
  async _prepareContext(options: any) {
    return {
      title: "{{PACKAGE_TITLE}}",
      version: "1.0.0",
      isReady: true
    };
  }
}

// [PT-BR] Gancho de inicialização do módulo no Foundry VTT
// [EN] Initialization hook for the module in Foundry VTT
(Hooks as any).once("init", async () => {
  console.log(`[${MODULE_ID}] Initializing next-gen module for Foundry VTT v14+`);
});

// [PT-BR] Gancho executado quando o mundo e sistema estão completamente carregados
// [EN] Hook fired once the world, systems, and active modules are ready
(Hooks as any).once("ready", async () => {
  console.log(`[${MODULE_ID}] System ready hook executed.`);
});
