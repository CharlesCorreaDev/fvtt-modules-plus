/**
 * [PT-BR] Ficha de Personagem moderna construída com ApplicationV2 e Handlebars
 * [EN] Modern Character Sheet engineered with ApplicationV2 and Handlebars
 */
const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export class ModernActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["fvtt-bs", "{{PACKAGE_ID}}-sheet", "actor-sheet"],
    position: {
      width: 600,
      height: 680
    },
    actions: {
      rollCheck: ModernActorSheet.#onRollCheck
    }
  };

  static PARTS = {
    header: {
      template: "systems/{{PACKAGE_ID}}/templates/actor/header.hbs"
    },
    body: {
      template: "systems/{{PACKAGE_ID}}/templates/actor/body.hbs"
    }
  };

  /**
   * [PT-BR] Prepara dados para o template Handlebars
   * [EN] Prepares context data for Handlebars template
   */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.system = this.actor.system;
    return context;
  }

  /**
   * [PT-BR] Ação de rolagem de teste simples
   * [EN] Simple dice roll action handler
   */
  static async #onRollCheck(event, target) {
    const roll = new Roll("1d20");
    await roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }) });
  }
}

