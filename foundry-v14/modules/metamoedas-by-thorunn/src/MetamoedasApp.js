import { PUNISHMENT_TIERS, PUNISHMENTS } from "./data/punishments.js";
import { MetamoedasManager } from "./MetamoedasManager.js";

/**
 * Universal Application for Metamoedas by Thorunn.
 * Uses modern ApplicationV2 patterns with compatibility fallback for Foundry v12.
 */
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications?.api ?? {};
const BaseApplication = ApplicationV2 && HandlebarsApplicationMixin 
  ? HandlebarsApplicationMixin(ApplicationV2) 
  : Application;

export class MetamoedasApp extends BaseApplication {
  constructor(options = {}) {
    super(options);
    this._currentTierFilter = "all";
  }

  render(options = {}, _options = {}) {
    if (!game.user?.isGM) {
      ui.notifications.warn(game.i18n.localize("METAMOEDAS.Notifications.GMOnlyWarning") || "Apenas o Mestre pode abrir o painel de Metamoedas.");
      return this;
    }
    return super.render(options, _options);
  }

  // ApplicationV2 configuration (v12, v13, v14)
  static DEFAULT_OPTIONS = {
    id: "metamoedas-by-thorunn-app",
    classes: ["metamoedas-window"],
    tag: "div",
    window: {
      title: "METAMOEDAS.App.Title",
      icon: "fa-solid fa-skull",
      resizable: true
    },
    position: {
      width: 720,
      height: 780
    }
  };

  static PARTS = {
    form: {
      template: "modules/metamoedas-by-thorunn/templates/main-app.hbs"
    }
  };

  // Fallback para Application legado (v11/v12 sem mixin)
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "metamoedas-by-thorunn-app",
      classes: ["metamoedas-window"],
      template: "modules/metamoedas-by-thorunn/templates/main-app.hbs",
      title: "Guia de Metamoedas by Thorunn",
      width: 720,
      height: 780,
      resizable: true
    });
  }

  /**
   * Prepares context for rendering the Handlebars template.
   */
  async _prepareContext(options = {}) {
    const parentContext = super._prepareContext ? await super._prepareContext(options) : {};
    const coins = MetamoedasManager.getCoins();
    const infractions = MetamoedasManager.getSceneInfractions();
    const infractionPercent = Math.min(100, (infractions / 5) * 100);

    const tiers = Object.entries(PUNISHMENT_TIERS).map(([id, t]) => ({
      id,
      name: game.i18n.localize(t.labelKey || t.nameKey),
      range: t.priceRange || t.range
    }));

    const punishments = PUNISHMENTS.map(p => {
      const cost = p.price ?? p.cost ?? 1;
      return {
        ...p,
        cost,
        title: game.i18n.localize(p.nameKey || p.titleKey),
        effect: game.i18n.localize(p.effectKey),
        canAfford: coins >= cost
      };
    });

    // Lista de jogadores conectados / presentes no mundo
    const users = game.users.filter(u => !u.isGM).map(u => ({
      id: u.id,
      name: u.name
    }));

    return {
      coins,
      infractions,
      infractionPercent,
      siricoticoActive: infractions >= 5,
      tiers,
      punishments,
      users
    };
  }

  // Fallback para Application v12
  async getData() {
    return this._prepareContext();
  }

  /**
   * Activate listeners for both v12 and v13/v14 lifecycle.
   */
  activateListeners(html) {
    super.activateListeners?.(html);
    const root = html[0] || html;

    // Adicionar Moedas Rápidas (+1, +2)
    root.querySelectorAll('[data-action="add-coins"]').forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const amount = parseInt(e.currentTarget.dataset.amount, 10) || 1;
        await MetamoedasManager.addCoins(amount);
        this.render();
      });
    });

    // Adicionar Moedas Customizadas
    const addCustomBtn = root.querySelector('[data-action="add-custom-coins"]');
    if (addCustomBtn) {
      addCustomBtn.addEventListener("click", async () => {
        const input = root.querySelector('#custom-coin-amount');
        const amount = parseInt(input?.value, 10) || 1;
        await MetamoedasManager.addCoins(amount);
        this.render();
      });
    }

    // Resetar Contador da Cena
    const resetBtn = root.querySelector('[data-action="reset-scene"]');
    if (resetBtn) {
      resetBtn.addEventListener("click", async () => {
        await MetamoedasManager.resetSceneInfractions();
        this.render();
      });
    }

    // Resetar Saldo das Metamoedas (com confirmação)
    const resetCoinsBtn = root.querySelector('[data-action="reset-coins"]');
    if (resetCoinsBtn) {
      resetCoinsBtn.addEventListener("click", async () => {
        const confirmed = await foundry.applications?.api?.DialogV2?.confirm({
          window: { title: game.i18n.localize("METAMOEDAS.Dialog.ResetCoinsTitle") || "Resetar Saldo de Metamoedas" },
          content: `<p>${game.i18n.localize("METAMOEDAS.Dialog.ResetCoinsContent") || "Tem certeza de que deseja zerar todas as Metamoedas acumuladas no cofre?"}</p>`,
          rejectClose: false,
          modal: true
        }) ?? await new Promise(resolve => {
          new Dialog({
            title: game.i18n.localize("METAMOEDAS.Dialog.ResetCoinsTitle") || "Resetar Saldo de Metamoedas",
            content: `<p>${game.i18n.localize("METAMOEDAS.Dialog.ResetCoinsContent") || "Tem certeza de que deseja zerar todas as Metamoedas acumuladas no cofre?"}</p>`,
            buttons: {
              yes: {
                icon: '<i class="fas fa-trash"></i>',
                label: game.i18n.localize("Yes") || "Sim",
                callback: () => resolve(true)
              },
              no: {
                icon: '<i class="fas fa-times"></i>',
                label: game.i18n.localize("No") || "Não",
                callback: () => resolve(false)
              }
            },
            default: "no",
            close: () => resolve(false)
          }).render(true);
        });

        if (confirmed) {
          await MetamoedasManager.resetCoins();
          this.render();
        }
      });
    }

    // Filtro por Tier / Categoria
    const tabBtns = root.querySelectorAll(".tier-tab-btn");
    const cards = root.querySelectorAll(".punishment-card");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const tier = btn.dataset.tier;
        this._currentTierFilter = tier;

        cards.forEach(card => {
          if (tier === "all" || card.dataset.tier === tier) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    // Aplicar Castigo (Gastar Moedas)
    root.querySelectorAll('[data-action="spend-punishment"]').forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.currentTarget.dataset.id;
        const targetSelect = root.querySelector("#target-victim-select");
        const targetUserId = targetSelect ? targetSelect.value : "";
        const success = await MetamoedasManager.spendCoins(id, targetUserId);
        if (success) {
          this.render();
        }
      });
    });

    // Sorteio Aleatório de Castigo
    const randomBtn = root.querySelector('[data-action="roll-random-punishment"]');
    if (randomBtn) {
      randomBtn.addEventListener("click", async () => {
        const targetSelect = root.querySelector("#target-victim-select");
        const targetUserId = targetSelect ? targetSelect.value : "";
        const tier = this._currentTierFilter || "all";
        const success = await MetamoedasManager.spendRandomPunishment(tier, targetUserId);
        if (success) {
          this.render();
        }
      });
    }

    // Abrir Janela de Créditos e Tributo à Thorunn
    const creditsBtn = root.querySelector('[data-action="open-credits"]');
    if (creditsBtn) {
      creditsBtn.addEventListener("click", () => {
        this.openCreditsDialog();
      });
    }
  }

  // ApplicationV2 hook after render
  _onRender(context, options) {
    super._onRender?.(context, options);
    this.activateListeners(this.element);
  }

  /**
   * Abre o Diálogo de Tributo e Créditos
   */
  async openCreditsDialog() {
    const renderTpl = foundry.applications?.handlebars?.renderTemplate ?? renderTemplate;
    const content = await renderTpl("modules/metamoedas-by-thorunn/templates/credits-dialog.hbs", {});
    
    new Dialog({
      title: game.i18n.localize("METAMOEDAS.Credits.DialogTitle") || "Tributo à Mestra Thorunn",
      content,
      buttons: {
        close: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize("METAMOEDAS.App.Close") || "Fechar"
        }
      },
      default: "close"
    }, {
      width: 540,
      classes: ["metamoedas-dialog", "thorunn-tribute-dialog"]
    }).render(true);
  }
}
