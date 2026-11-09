/**
 * @fileoverview Visual Active Effects HUD para SWADE
 * [PT-BR] Painel flutuante em ApplicationV2 exibindo os efeitos ativos e condições do token selecionado.
 * [EN] Floating ApplicationV2 panel displaying active effects and conditions of selected token.
 */

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class VisualActiveEffectsHUD extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "swag-visual-active-effects",
    classes: ["SWAG-PLUS-panel", "swag-vae-hud"],
    tag: "aside",
    window: {
      frame: false,
      minimizable: false,
      positioned: true,
      resizable: false,
    },
    position: {
      width: "auto",
      height: "auto",
      top: 15,
      left: null,
    },
    actions: {
      deleteEffect: VisualActiveEffectsHUD.#onDeleteEffect,
    },
  };

  static PARTS = {
    main: {
      template: "modules/swade-autogame-plus/templates/visual-active-effects.hbs",
    },
  };

  /**
   * [PT-BR] Prepara a lista de efeitos ativos e condições do token controlado.
   * [EN] Prepares active effects and conditions list of the controlled token.
   */
  async _prepareContext() {
    const actor = canvas.tokens?.controlled?.[0]?.actor ?? game.user.character;

    if (!actor) {
      if (this.element) {
        this.element.style.display = "none";
      }
      return { effects: [] };
    }

    const effects = [];
    const seenNames = new Set();

    // [PT-BR] Condições nativas de SWADE (Shaken, Incapacitated, etc.)
    // [EN] Native SWADE conditions (Shaken, Incapacitated, etc.)
    if (actor.statuses?.has("shaken")) {
      const shakenName = game.i18n.localize("SWAG.Combat.Shaken") || "Abalado";
      seenNames.add(shakenName.toLowerCase());
      seenNames.add("shaken");
      effects.push({
        id: "shaken",
        name: shakenName,
        icon: "icons/svg/daze.svg",
        isStatus: true,
      });
    }

    if (actor.statuses?.has("incapacitated")) {
      const incapName = game.i18n.localize("SWAG.Combat.Incapacitated") || "Incapacitado";
      seenNames.add(incapName.toLowerCase());
      seenNames.add("incapacitated");
      effects.push({
        id: "incapacitated",
        name: incapName,
        icon: "icons/svg/skull.svg",
        isStatus: true,
      });
    }

    // [PT-BR] Active Effects aplicados de itens ou magias (evitando duplicar condições nativas do SWADE)
    // [EN] Active Effects applied from items or spells (avoiding duplicating native SWADE conditions)
    for (const effect of actor.effects) {
      if (!effect.disabled) {
        const lowerName = (effect.name || "").trim().toLowerCase();
        const hasNativeStatus =
          seenNames.has(lowerName) ||
          (effect.statuses?.has?.("shaken") && seenNames.has("shaken")) ||
          (effect.statuses?.has?.("incapacitated") && seenNames.has("incapacitated"));
        if (hasNativeStatus) {
          continue;
        }
        seenNames.add(lowerName);
        effects.push({
          id: effect.id,
          name: effect.name,
          icon: effect.img || "icons/svg/aura.svg",
          duration: effect.duration?.remaining ? `${effect.duration.remaining}r` : null,
          isStatus: false,
        });
      }
    }

    // [PT-BR] Se não houver efeitos nem condições, oculta o elemento para não mostrar container vazio
    // [EN] If no effects or conditions, hide element to prevent showing an empty container
    if (this.element) {
      this.element.style.display = effects.length > 0 ? "block" : "none";
    }

    return { effects };
  }

  static async #onDeleteEffect(event, target) {
    const effectId = target.dataset.effectId;
    const actor = canvas.tokens?.controlled?.[0]?.actor ?? game.user.character;
    if (!actor || !effectId) {
      return;
    }

    if (effectId === "shaken" || effectId === "incapacitated") {
      await actor.toggleStatusEffect(effectId, { active: false });
    } else {
      const effect = actor.effects.get(effectId);
      if (effect) {
        await effect.delete();
      }
    }
  }
}
