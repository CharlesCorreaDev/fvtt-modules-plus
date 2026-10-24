import { registerSettings } from "./settings.js";
import { MetamoedasManager } from "./MetamoedasManager.js";
import { MetamoedasApp } from "./MetamoedasApp.js";
import { SiricoticoBanner } from "./SiricoticoBanner.js";

/**
 * Entry point for "Guia de Metamoedas by Thorunn"
 */
Hooks.once("init", async () => {
  console.log("Metamoedas by Thorunn | Inicializando módulo...");

  // Registrar configurações do mundo / cliente
  registerSettings();

  // Inicializar o banner flutuante do Siricótico
  SiricoticoBanner.init();

  // Pré-carregar templates Handlebars (Compatível com v12 e namespacing da v13/v14)
  const loadTpls = foundry.applications?.handlebars?.loadTemplates ?? loadTemplates;
  await loadTpls([
    "modules/metamoedas-by-thorunn/templates/main-app.hbs",
    "modules/metamoedas-by-thorunn/templates/chat-card.hbs",
    "modules/metamoedas-by-thorunn/templates/credits-dialog.hbs"
  ]);
});

Hooks.once("ready", () => {
  console.log("Metamoedas by Thorunn | Pronto para espalhar o caos!");

  // Expor API global no objeto do Foundry para macros ou integrações
  game.metamoedas = {
    manager: MetamoedasManager,
    app: null,
    open: () => {
      if (!game.user?.isGM) {
        ui.notifications.warn(game.i18n.localize("METAMOEDAS.Notifications.GMOnlyWarning") || "Apenas o Mestre pode abrir o painel de Metamoedas.");
        return null;
      }
      if (!game.metamoedas.app) {
        game.metamoedas.app = new MetamoedasApp();
      }
      game.metamoedas.app.render(true);
      return game.metamoedas.app;
    }
  };
});

/**
 * Adicionar botão de controle na barra lateral de controles de cena (Compatível com v12, v13 e v14)
 */
Hooks.on("getSceneControlButtons", (controls) => {
  // Apenas GMs têm acesso ao painel de punições e Metamoedas
  if (!game.user?.isGM) return;

  // Configuração moderna para v13/v14 (ApplicationV2)
  const toolConfigV14 = {
    name: "metamoedas",
    title: "METAMOEDAS.OpenPanel",
    icon: "fa-solid fa-skull",
    button: true,
    visible: true,
    onChange: () => game.metamoedas.open()
  };

  // Se controls for Array (v12 e anteriores)
  if (Array.isArray(controls)) {
    const tokenControls = controls.find(c => c.name === "token" || c.name === "tokens");
    if (tokenControls) {
      const toolConfigV12 = {
        name: "metamoedas",
        title: "METAMOEDAS.OpenPanel",
        icon: "fa-solid fa-skull",
        button: true,
        visible: true,
        onClick: () => game.metamoedas.open()
      };
      if (Array.isArray(tokenControls.tools)) {
        tokenControls.tools.push(toolConfigV12);
      } else if (tokenControls.tools && typeof tokenControls.tools === "object") {
        tokenControls.tools.metamoedas = toolConfigV12;
      }
    }
    return;
  }

  // Se controls for Record / Object (v13 e v14 ApplicationV2)
  if (controls && typeof controls === "object") {
    const tokenGroup = controls.tokens || controls.token;
    if (tokenGroup) {
      if (Array.isArray(tokenGroup.tools)) {
        tokenGroup.tools.push(toolConfigV14);
      } else if (tokenGroup.tools && typeof tokenGroup.tools === "object") {
        tokenGroup.tools.metamoedas = toolConfigV14;
      }
    }
  }
});

