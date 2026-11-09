/**
 * [PT-BR] Módulo Puro em ESModules (Zero-Build) para Foundry VTT v14+
 * [EN] Pure ESModules (Zero-Build) Module for Foundry VTT v14+
 */

const MODULE_ID = "{{PACKAGE_ID}}";
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * [PT-BR] Janela Vanilla estendendo ApplicationV2 com template Handlebars
 * [EN] Vanilla Window extending ApplicationV2 with Handlebars templating
 */
export class {{PACKAGE_ID}}App extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-app`,
    classes: ["fvtt-bs", `${MODULE_ID}-view`],
    window: {
      title: "{{PACKAGE_TITLE}}",
      resizable: true
    },
    position: {
      width: 480,
      height: 320
    }
  };

  static PARTS = {
    content: {
      template: `modules/${MODULE_ID}/templates/view.hbs`
    }
  };
}

// [PT-BR] Gancho de inicialização do módulo
// [EN] Module initialization hook
Hooks.once("init", async () => {
  console.log(`[${MODULE_ID}] Initializing zero-build Vanilla ESModule.`);
});
