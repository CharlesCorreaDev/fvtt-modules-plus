import { MetamoedasManager } from "./MetamoedasManager.js";

/**
 * Banner flutuante no topo do Canvas avisando sobre a proximidade ou ativação do Siricótico.
 * Visível para todos os jogadores conectados.
 */
export class SiricoticoBanner {
  static ELEMENT_ID = "metamoedas-siricotico-banner";

  /**
   * Inicializa o banner escutando as mudanças de estado.
   */
  static init() {
    Hooks.on("ready", () => {
      this.updateBanner();
    });

    Hooks.on("canvasReady", () => {
      this.updateBanner();
    });

    Hooks.on("metamoedasUpdated", () => {
      this.updateBanner();
    });

    Hooks.on("metamoedasSceneChanged", () => {
      this.updateBanner();
    });

    Hooks.on("collapseSidebar", () => {
      setTimeout(() => this.updateBanner(), 150);
    });
  }

  /**
   * Atualiza ou remove o elemento visual no DOM conforme o número de infrações.
   */
  static updateBanner() {
    const infractions = MetamoedasManager.getSceneInfractions();
    let banner = document.getElementById(this.ELEMENT_ID);

    // Se infrações < 4, não há aviso flutuante
    if (infractions < 4) {
      if (banner) {
        banner.classList.remove("visible");
        setTimeout(() => banner.remove(), 400);
      }
      return;
    }

    // Se ainda não existe no DOM, cria e anexa
    if (!banner) {
      banner = document.createElement("div");
      banner.id = this.ELEMENT_ID;
      banner.className = "siricotico-floating-banner";
      
      const parent = document.getElementById("ui-middle") || document.body;
      parent.appendChild(banner);
    }

    // Estado 1: 4 Infrações (Falta 1 para o Siricótico despertar)
    if (infractions === 4) {
      banner.className = "siricotico-floating-banner warning-near";
      banner.innerHTML = `
        <div class="banner-content">
          <i class="fa-solid fa-exclamation banner-icon pulse"></i>
          <div class="banner-texts">
            <span class="banner-title">${game.i18n.localize("METAMOEDAS.Banner.ImminentTitle")}</span>
            <span class="banner-subtitle">${game.i18n.localize("METAMOEDAS.Banner.ImminentSubtitle")}</span>
          </div>
          <span class="banner-count">4 / 5</span>
        </div>
      `;
    } 
    // Estado 2: 5 ou mais Infrações (Siricótico ATIVO)
    else {
      banner.className = "siricotico-floating-banner danger-active";
      banner.innerHTML = `
        <div class="banner-content">
          <i class="fa-solid fa-triangle-exclamation banner-icon shake"></i>
          <div class="banner-texts">
            <span class="banner-title">${game.i18n.localize("METAMOEDAS.Banner.ActiveTitle")}</span>
            <span class="banner-subtitle">${game.i18n.localize("METAMOEDAS.Banner.ActiveSubtitle")}</span>
          </div>
          <span class="banner-count"><i class="fa-solid fa-fire"></i> ${infractions}</span>
        </div>
      `;
    }

    // Garante classe visível para transição suave
    requestAnimationFrame(() => {
      banner.classList.add("visible");
    });
  }
}
