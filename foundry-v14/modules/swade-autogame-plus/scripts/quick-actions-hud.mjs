/**
 * @fileoverview Quick Actions HUD para Savage Worlds Adventure Edition (SWADE)
 * [PT-BR] Painel ergonômico em ApplicationV2 para disparar ações rápidas de combate (Ataques, Poderes Arcanos, Super Poderes, Perícias e Regras de Compêndios).
 * [EN] Ergonomic ApplicationV2 panel to trigger quick combat actions (Attacks, Arcane Powers, Super Powers, Skills, and Companion Rules).
 */

import { isSuperPowerType, getActorSuperPowers, calculateActorSuperPowerSummary } from "./super-power-item.mjs";
import { CompanionRulesEngine } from "./companion-rules-engine.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class QuickActionsHUD extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "swag-quick-actions-hud",
    classes: ["SWAG-PLUS-panel", "swag-quick-hud"],
    tag: "aside",
    window: {
      frame: true,
      title: "SWAG+ Quick Actions",
      icon: "fas fa-bolt",
      resizable: true,
    },
    position: {
      width: 420,
      height: 560,
      top: 100,
      left: 120,
    },
    actions: {
      rollItem: QuickActionsHUD.#onRollItem,
      rollSkill: QuickActionsHUD.#onRollSkill,
      companionAction: QuickActionsHUD.#onCompanionAction,
    },
  };

  static PARTS = {
    main: {
      template: "modules/swade-autogame-plus/templates/quick-actions-hud.hbs",
    },
  };

  /**
   * [PT-BR] Prepara o contexto de dados do ator controlado para o template.
   * [EN] Prepares controlled actor data context for template rendering.
   */
  async _prepareContext() {
    const actor = canvas.tokens?.controlled?.[0]?.actor ?? game.user?.character;

    if (!actor) {
      return {
        hasActor: false,
        actorName: null,
        weapons: [],
        powers: [],
        superPowers: [],
        superPowerSummary: null,
        skills: [],
      };
    }

    const weapons = actor.items.filter((i) => i.type === "weapon");
    const powers = actor.items.filter((i) => i.type === "power");
    const superPowers = getActorSuperPowers(actor);
    const superPowerSummary = superPowers.length > 0 ? calculateActorSuperPowerSummary(actor) : null;
    const skills = actor.items.filter((i) => i.type === "skill");

    return {
      hasActor: true,
      actorName: actor.name,
      weapons,
      powers,
      superPowers,
      superPowerSummary,
      skills,
    };
  }

  static async #onRollItem(event, target) {
    const itemId = target.dataset.itemId;
    const actor = canvas.tokens?.controlled?.[0]?.actor ?? game.user?.character;
    if (!actor || !itemId) {
      return;
    }

    const item = actor.items.get(itemId);
    if (!item) {
      return;
    }

    if (typeof item.roll === "function") {
      await item.roll();
    } else if (typeof item.show === "function") {
      await item.show();
    } else if (isSuperPowerType(item.type) && globalThis.SWAG?.api?.postSuperPowerCard) {
      await globalThis.SWAG.api.postSuperPowerCard(item, actor);
    }
  }

  static async #onRollSkill(event, target) {
    const skillId = target.dataset.skillId;
    const actor = canvas.tokens?.controlled?.[0]?.actor ?? game.user?.character;
    if (!actor || !skillId) {
      return;
    }

    const skill = actor.items.get(skillId);
    if (skill && typeof skill.roll === "function") {
      await skill.roll();
    }
  }

  static async #onCompanionAction(event, target) {
    const actionType = target.dataset.companionAction;
    const actor = canvas.tokens?.controlled?.[0]?.actor ?? game.user?.character;

    switch (actionType) {
      case "downtime":
        await CompanionRulesEngine.openDowntimeDialog(actor);
        break;
      case "loot":
        await CompanionRulesEngine.generateFantasyLoot("substantial");
        break;
      case "clash":
        await CompanionRulesEngine.spendClashToken(actor);
        break;
      case "resonance":
        await CompanionRulesEngine.drawHarmonicResonance(actor);
        break;
      case "fear":
        await CompanionRulesEngine.rollFearTable({ actor, penalty: 0 });
        break;
      case "vice":
        await CompanionRulesEngine.grantViceBenny(actor);
        break;
      case "theSight":
        await CompanionRulesEngine.activateTheSight(actor);
        break;
      case "powerStunt":
        await CompanionRulesEngine.executePowerStunt(actor);
        break;
      case "blazeOfGlory":
        await CompanionRulesEngine.rollSuperheroIncapacitation(actor);
        break;
      default:
        break;
    }
  }
}
