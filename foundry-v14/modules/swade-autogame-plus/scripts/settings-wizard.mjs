/**
 * @fileoverview Configurator Wizard (ApplicationV2) para SWADE AutoGame Plus (SWAG+)
 * [PT-BR] Modal interativo de configuração passo-a-passo baseado no Bootstrap Wizard para mecânicas, combate e automações dos 5 Compêndios Oficiais de SWADE.
 * [EN] Step-by-step interactive configuration modal based on Bootstrap Wizard for mechanics, combat, and automations of the 5 Official SWADE Companions.
 */

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class SettingsWizard extends HandlebarsApplicationMixin(ApplicationV2) {
  #activeStep = 1;

  static DEFAULT_OPTIONS = {
    id: "swag-settings-wizard",
    classes: ["swag-app", "SWAG-PLUS-wizard-window"],
    tag: "div",
    window: {
      title: "SWADE AutoGame Plus | Assistente de Configuração",
      icon: "fas fa-magic",
      resizable: true,
    },
    position: {
      width: Math.min(Math.round(window.innerWidth * 0.8), 1200),
      height: Math.min(Math.round(window.innerHeight * 0.85), 850),
    },
  };

  static PARTS = {
    form: {
      template: "modules/swade-autogame-plus/templates/settings-wizard.hbs",
    },
  };

  /**
   * [PT-BR] Prepara o contexto de dados para renderizar a etapa ativa.
   * [EN] Prepares data context to render the active step.
   */
  async _prepareContext(_options) {
    const moduleId = "swade-autogame-plus";

    const settings = {
      enableCompactCard: game.settings.get(moduleId, "enableCompactCard"),
      enableRaiseCalculator: game.settings.get(moduleId, "enableRaiseCalculator"),
      enableTargetedDamage: game.settings.get(moduleId, "enableTargetedDamage"),
      enableTurnTimer: game.settings.get(moduleId, "enableTurnTimer"),
      turnTimerDuration: game.settings.get(moduleId, "turnTimerDuration"),
      enableQuickHUD: game.settings.get(moduleId, "enableQuickHUD"),
      enableVisualEffectsHUD: game.settings.get(moduleId, "enableVisualEffectsHUD"),
      enableTokenColorMarker: game.settings.get(moduleId, "enableTokenColorMarker"),
      enableCelebrateAces: game.settings.get(moduleId, "enableCelebrateAces"),
      ruleWoundCap: game.settings.get(moduleId, "ruleWoundCap"),
      ruleUnarmoredHero: game.settings.get(moduleId, "ruleUnarmoredHero"),
      ruleDumbLuck: game.settings.get(moduleId, "ruleDumbLuck"),
      ruleGrittyDamage: game.settings.get(moduleId, "ruleGrittyDamage"),
      autoAskCalledShots: game.settings.get(moduleId, "autoAskCalledShots"),
      autoWildAttack: game.settings.get(moduleId, "autoWildAttack"),
      autoGroupRolls: game.settings.get(moduleId, "autoGroupRolls"),
      enableSuperPowersSupport: game.settings.get(moduleId, "enableSuperPowersSupport"),
      autoGangUp: game.settings.get(moduleId, "autoGangUp"),
      autoScale: game.settings.get(moduleId, "autoScale"),
      autoCover: game.settings.get(moduleId, "autoCover"),
      autoDesperateAttack: game.settings.get(moduleId, "autoDesperateAttack"),
      ruleHeroesNeverDie: game.settings.get(moduleId, "ruleHeroesNeverDie"),
      ruleMoreBennies: game.settings.get(moduleId, "ruleMoreBennies"),
      ruleHardChoices: game.settings.get(moduleId, "ruleHardChoices"),
      ruleJokersWild: game.settings.get(moduleId, "ruleJokersWild"),
      enableSciFiSupport: game.settings.get(moduleId, "enableSciFiSupport"),
      enableHorrorSupport: game.settings.get(moduleId, "enableHorrorSupport"),
      enableFantasySupport: game.settings.get(moduleId, "enableFantasySupport"),
      ruleBetrayal: game.settings.get(moduleId, "ruleBetrayal"),
      ruleHeavyMetal: game.settings.get(moduleId, "ruleHeavyMetal"),
      ruleKnockback: game.settings.get(moduleId, "ruleKnockback"),
      ruleSlaughter: game.settings.get(moduleId, "ruleSlaughter"),
      ruleArmorInterference: game.settings.get(moduleId, "ruleArmorInterference"),
      measureWithGrid: game.settings.get(moduleId, "measureWithGrid"),
      measureFromEdge: game.settings.get(moduleId, "measureFromEdge"),
      suggestIlluminationPenalties: game.settings.get(moduleId, "suggestIlluminationPenalties"),
      autoSubtractAmmo: game.settings.get(moduleId, "autoSubtractAmmo"),
      autoSubtractPowerPoints: game.settings.get(moduleId, "autoSubtractPowerPoints"),
      hideTargetDefenseValues: game.settings.get(moduleId, "hideTargetDefenseValues"),
      showStatusRemovalCards: game.settings.get(moduleId, "showStatusRemovalCards"),
      checkExtraCriticalFailures: game.settings.get(moduleId, "checkExtraCriticalFailures"),
      defaultRoF: game.settings.get(moduleId, "defaultRoF") || "1",
      raiseCalculatorButtonRows: game.settings.get(moduleId, "raiseCalculatorButtonRows") ?? 6,
      resultCardVisibility: game.settings.get(moduleId, "resultCardVisibility") || "all",
    };

    const totalSteps = 3;
    if (this.#activeStep > totalSteps) {
      this.#activeStep = totalSteps;
    }

    const progressPercent = Math.round(((this.#activeStep - 1) / (totalSteps - 1)) * 100);

    return {
      activeStep: this.#activeStep,
      progressPercent,
      settings,
      canGoNext: this.#activeStep < totalSteps,
    };
  }

  /**
   * [PT-BR] Liga os ouvintes de eventos da interface do Wizard.
   * [EN] Attaches event listeners for the Wizard interface.
   */
  _onRender(context, options) {
    super._onRender(context, options);
    const html = this.element;

    // [PT-BR] Cliques nos passos do Stepper
    html.querySelectorAll(".wizard-step-item").forEach((stepEl) => {
      stepEl.addEventListener("click", () => {
        const step = parseInt(stepEl.dataset.step, 10);
        if (step) {
          this.#activeStep = step;
          this.render();
        }
      });
    });

    // [PT-BR] Botões Anterior / Próximo
    html.querySelector(".btn-wizard-prev")?.addEventListener("click", () => {
      if (this.#activeStep > 1) {
        this.#activeStep--;
        this.render();
      }
    });

    html.querySelector(".btn-wizard-next")?.addEventListener("click", () => {
      if (this.#activeStep < 3) {
        this.#activeStep++;
        this.render();
      }
    });

    // [PT-BR] Controle de visibilidade condicional do Temporizador de Turno
    const timerToggle = html.querySelector("input[name='enableTurnTimer']");
    const timerField = html.querySelector(".turn-timer-duration-container");
    if (timerToggle && timerField) {
      const updateTimerVisibility = () => {
        timerField.style.display = timerToggle.checked ? "block" : "none";
      };
      updateTimerVisibility();
      timerToggle.addEventListener("change", updateTimerVisibility);
    }

    // [PT-BR] Exportar Configurações (JSON)
    html.querySelector(".btn-wizard-export")?.addEventListener("click", () => {
      this.#exportSettings();
    });

    // [PT-BR] Importar Configurações (JSON)
    const fileInput = html.querySelector(".swag-import-file-input");
    html.querySelector(".btn-wizard-import")?.addEventListener("click", () => {
      fileInput?.click();
    });

    fileInput?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const data = JSON.parse(event.target.result);
            await this.#importSettings(data);
            ui.notifications.info("SWAG+ | Configurações importadas com sucesso!");
            this.render();
          } catch (err) {
            console.error("SWAG+ | Erro ao importar configurações:", err);
            ui.notifications.error("SWAG+ | Arquivo de configurações inválido.");
          }
        };
        reader.readAsText(file);
      }
    });

    // [PT-BR] Salvar e Aplicar
    html.querySelector(".btn-wizard-save")?.addEventListener("click", async () => {
      await this.#saveSettings(html);
      ui.notifications.info("SWAG+ | Configurações salvas e aplicadas com sucesso!");
      this.close();
    });
  }

  /**
   * [PT-BR] Exporta todas as configurações do SWAG+ para download em arquivo .json
   * [EN] Exports all SWAG+ settings for download as a .json file
   */
  #exportSettings() {
    const moduleId = "swade-autogame-plus";
    const exportData = {
      meta: {
        module: moduleId,
        version: "1.0.0-beta.1",
        exportedAt: new Date().toISOString(),
      },
      settings: {},
    };

    const keys = [
      "enableCompactCard",
      "enableRaiseCalculator",
      "enableTargetedDamage",
      "enableTurnTimer",
      "turnTimerDuration",
      "enableQuickHUD",
      "enableVisualEffectsHUD",
      "enableTokenColorMarker",
      "enableCelebrateAces",
      "ruleWoundCap",
      "ruleUnarmoredHero",
      "ruleDumbLuck",
      "ruleGrittyDamage",
      "autoAskCalledShots",
      "autoWildAttack",
      "autoGroupRolls",
      "enableSuperPowersSupport",
      "autoGangUp",
      "autoScale",
      "autoCover",
      "autoDesperateAttack",
      "ruleHeroesNeverDie",
      "ruleMoreBennies",
      "ruleHardChoices",
      "ruleJokersWild",
      "enableSciFiSupport",
      "enableHorrorSupport",
      "enableFantasySupport",
      "ruleBetrayal",
      "ruleHeavyMetal",
      "ruleKnockback",
      "ruleSlaughter",
      "ruleArmorInterference",
    ];

    for (const key of keys) {
      exportData.settings[key] = game.settings.get(moduleId, key);
    }

    const filename = `swade-autogame-plus-config-${Date.now()}.json`;
    if (typeof globalThis.saveDataToFile === "function") {
      globalThis.saveDataToFile(JSON.stringify(exportData, null, 2), "application/json", filename);
    } else {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
    ui.notifications.info("SWAG+ | Configurações exportadas com sucesso!");
  }

  /**
   * [PT-BR] Importa configurações validadas a partir de objeto JSON
   * [EN] Imports validated settings from JSON object
   */
  async #importSettings(importData) {
    const moduleId = "swade-autogame-plus";
    const settings = importData.settings || importData;
    for (const [key, val] of Object.entries(settings)) {
      if (game.settings.settings.has(`${moduleId}.${key}`)) {
        await game.settings.set(moduleId, key, val);
      }
    }
  }

  async #saveSettings(html) {
    const moduleId = "swade-autogame-plus";
    const form = html.querySelector(".SWAG-PLUS-wizard-form");
    if (!form) {
      return;
    }

    const formData = new FormData(form);

    const booleans = [
      "enableCompactCard",
      "enableRaiseCalculator",
      "enableTargetedDamage",
      "enableTurnTimer",
      "enableQuickHUD",
      "enableVisualEffectsHUD",
      "enableTokenColorMarker",
      "enableCelebrateAces",
      "ruleWoundCap",
      "ruleUnarmoredHero",
      "ruleDumbLuck",
      "ruleGrittyDamage",
      "autoAskCalledShots",
      "autoWildAttack",
      "autoGroupRolls",
      "enableSuperPowersSupport",
      "autoGangUp",
      "autoScale",
      "autoCover",
      "autoDesperateAttack",
      "ruleHeroesNeverDie",
      "ruleMoreBennies",
      "ruleHardChoices",
      "ruleJokersWild",
      "enableSciFiSupport",
      "enableHorrorSupport",
      "enableFantasySupport",
      "ruleBetrayal",
      "ruleHeavyMetal",
      "ruleKnockback",
      "ruleSlaughter",
      "ruleArmorInterference",
      "measureWithGrid",
      "measureFromEdge",
      "suggestIlluminationPenalties",
      "autoSubtractAmmo",
      "autoSubtractPowerPoints",
      "hideTargetDefenseValues",
      "showStatusRemovalCards",
      "checkExtraCriticalFailures",
    ];

    for (const key of booleans) {
      await game.settings.set(
        moduleId,
        key,
        form.querySelector(`input[name='${key}']`)?.checked ?? false
      );
    }

    const strings = ["defaultRoF", "resultCardVisibility"];

    for (const key of strings) {
      const val = formData.get(key);
      if (val !== null) {
        await game.settings.set(moduleId, key, String(val));
      }
    }

    const duration = parseInt(formData.get("turnTimerDuration"), 10);
    if (!isNaN(duration)) {
      await game.settings.set(moduleId, "turnTimerDuration", duration);
    }

    const rows = parseInt(formData.get("raiseCalculatorButtonRows"), 10);
    if (!isNaN(rows)) {
      await game.settings.set(moduleId, "raiseCalculatorButtonRows", rows);
    }
  }
}
