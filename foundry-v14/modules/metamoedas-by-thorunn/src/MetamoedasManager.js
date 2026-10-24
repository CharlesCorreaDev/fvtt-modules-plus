import { PUNISHMENT_TIERS, PUNISHMENTS } from "./data/punishments.js";

/**
 * MetamoedasManager handles all state manipulation, infractions, inflation logic,
 * sound playback, and chat dispatching for "Guia de Metamoedas by Thorunn".
 */
export class MetamoedasManager {
  static MODULE_ID = "metamoedas-by-thorunn";

  /**
   * Get current coins held by GM.
   * @returns {number}
   */
  static getCoins() {
    return game.settings.get(this.MODULE_ID, "currentCoins") || 0;
  }

  /**
   * Get infraction count in current scene.
   * @returns {number}
   */
  static getSceneInfractions() {
    return game.settings.get(this.MODULE_ID, "sceneInfractions") || 0;
  }

  /**
   * Add metacoins to GM pool and check for 5th infraction inflation.
   * @param {number} amount
   * @param {string} reason
   * @returns {Promise<{coins: number, infractions: number, siricoticoTriggered: boolean}>}
   */
  static async addCoins(amount = 1, reason = "") {
    if (!game.user.isGM) {
      ui.notifications.warn(game.i18n.localize("METAMOEDAS.Chat.GMOnlyWarning") || "Apenas o GM pode manipular Metamoedas.");
      return null;
    }

    const current = this.getCoins();
    const newTotal = Math.max(0, current + amount);
    await game.settings.set(this.MODULE_ID, "currentCoins", newTotal);

    let infractions = this.getSceneInfractions() + 1;
    let siricoticoTriggered = false;

    // Regra da 5ª infração: acordou o Siricótico! Dobra o custo dos próximos metagames ou inflação ativa
    if (infractions >= 5) {
      siricoticoTriggered = true;
    }

    await game.settings.set(this.MODULE_ID, "sceneInfractions", infractions);

    // Tocar Som de Moeda se habilitado
    if (game.settings.get(this.MODULE_ID, "playSound")) {
      try {
        const audioHelper = foundry.audio?.AudioHelper ?? AudioHelper;
        audioHelper.play({
          src: "modules/metamoedas-by-thorunn/sounds/mario-coin.mp3",
          volume: 0.8,
          autoplay: true
        }, true);
      } catch (err) {
        console.warn("Metamoedas | Falha ao reproduzir áudio da moeda:", err);
      }
    }

    // Notificar UI
    const msg = game.i18n.format("METAMOEDAS.Notifications.CoinsAdded", {
      amount,
      total: newTotal
    });
    ui.notifications.info(msg);

    // Aviso iminente para todos no chat: 4ª infração (falta 1 para despertar o Siricótico)
    if (infractions === 4) {
      await this.broadcastSiricoticoWarning4();
    }

    // Chat log se Siricótico despertou na 5ª infração
    if (siricoticoTriggered && infractions === 5) {
      await this.broadcastSiricoticoAwakening();
    }

    // Disparar hook para atualizar janelas abertas
    Hooks.callAll("metamoedasUpdated", { coins: newTotal, infractions });

    return { coins: newTotal, infractions, siricoticoTriggered };
  }

  /**
   * Reset metacoins balance to 0 (com confirmação)
   */
  static async resetCoins() {
    if (!game.user.isGM) return;
    await game.settings.set(this.MODULE_ID, "currentCoins", 0);
    Hooks.callAll("metamoedasUpdated", { coins: 0, infractions: this.getSceneInfractions() });
    ui.notifications.info(game.i18n.localize("METAMOEDAS.Notifications.CoinsReset") || "Saldo de Metamoedas resetado para zero.");
  }

  /**
   * Reset scene infractions counter (e.g. nova cena iniciada)
   */
  static async resetSceneInfractions() {
    if (!game.user.isGM) return;
    await game.settings.set(this.MODULE_ID, "sceneInfractions", 0);
    Hooks.callAll("metamoedasUpdated", { coins: this.getCoins(), infractions: 0 });
    ui.notifications.info(game.i18n.localize("METAMOEDAS.Notifications.SceneReset") || "Contador de infrações da cena resetado.");
  }

  /**
   * Spend metacoins to trigger an official punishment effect on a target player.
   * @param {string} punishmentId
   * @param {string} targetUserId
   * @returns {Promise<boolean>}
   */
  static async spendCoins(punishmentId, targetUserId = "") {
    if (!game.user.isGM) return false;

    const punishment = PUNISHMENTS.find(p => p.id === punishmentId);
    if (!punishment) {
      ui.notifications.error("Castigo não encontrado: " + punishmentId);
      return false;
    }

    const cost = punishment.price ?? punishment.cost ?? 1;
    const currentCoins = this.getCoins();
    if (currentCoins < cost) {
      ui.notifications.warn(game.i18n.localize("METAMOEDAS.Notifications.NotEnoughCoins") || "Saldo de Metamoedas insuficiente!");
      return false;
    }

    // Subtrair moedas
    const newTotal = currentCoins - cost;
    await game.settings.set(this.MODULE_ID, "currentCoins", newTotal);

    // Localizar textos do castigo
    const title = game.i18n.localize(punishment.nameKey || punishment.titleKey);
    const effect = game.i18n.localize(punishment.effectKey);
    const tier = PUNISHMENT_TIERS[punishment.tier] ? game.i18n.localize(PUNISHMENT_TIERS[punishment.tier].labelKey || PUNISHMENT_TIERS[punishment.tier].nameKey) : punishment.tier;

    // Alvo
    let targetUser = null;
    let targetName = game.i18n.localize("METAMOEDAS.App.AllPlayers") || "Mesa Inteira";
    if (targetUserId) {
      targetUser = game.users.get(targetUserId);
      if (targetUser) targetName = targetUser.name;
    }

    // Tocar Som se habilitado
    if (game.settings.get(this.MODULE_ID, "playSound")) {
      try {
        const audioHelper = foundry.audio?.AudioHelper ?? AudioHelper;
        audioHelper.play({
          src: "modules/metamoedas-by-thorunn/sounds/risada-macabra.mp3",
          volume: 0.8,
          autoplay: true
        }, true); // true = broadcast to all connected players
      } catch (err) {
        console.warn("Metamoedas | Falha ao reproduzir áudio:", err);
      }
    }

    // Criar Mensagem no Chat
    await this.postPunishmentToChat({
      punishment,
      title,
      effect,
      tier,
      targetName,
      targetUser
    });

    Hooks.callAll("metamoedasUpdated", { coins: newTotal, infractions: this.getSceneInfractions() });
    return true;
  }

  /**
   * Sorteia aleatoriamente e aplica um castigo da categoria escolhida (ou de todas).
   * @param {string} tierFilter ("all" ou id do tier)
   * @param {string} targetUserId
   * @returns {Promise<boolean>}
   */
  static async spendRandomPunishment(tierFilter = "all", targetUserId = "") {
    if (!game.user.isGM) return false;

    const currentCoins = this.getCoins();
    if (currentCoins <= 0) {
      ui.notifications.warn(game.i18n.localize("METAMOEDAS.Notifications.NoCoinsAtAll") || "Você não tem nenhuma Metamoeda no cofre para sortear um castigo!");
      return false;
    }

    // Filtrar punições elegíveis pela categoria e que o saldo permita pagar
    let candidates = PUNISHMENTS.filter(p => {
      const cost = p.price ?? p.cost ?? 1;
      const matchesTier = tierFilter === "all" || p.tier === tierFilter;
      return matchesTier && currentCoins >= cost;
    });

    if (candidates.length === 0) {
      ui.notifications.warn(game.i18n.localize("METAMOEDAS.Notifications.NoAffordableInTier") || "Nenhum castigo desta categoria cabe no seu saldo atual de Metamoedas!");
      return false;
    }

    // Sortear um candidato aleatório
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const chosen = candidates[randomIndex];

    return await this.spendCoins(chosen.id, targetUserId);
  }

  /**
   * Post formatted Punishment Card to Chat.
   */
  static async postPunishmentToChat({ punishment, title, effect, tier, targetName, targetUser }) {
    const visibility = game.settings.get(this.MODULE_ID, "chatVisibility") || "whisperTarget";

    let whisper = [];
    if (visibility === "gmOnly") {
      whisper = ChatMessage.getWhisperRecipients("GM");
    } else if (visibility === "whisperTarget") {
      whisper = ChatMessage.getWhisperRecipients("GM");
      if (targetUser) {
        whisper.push(targetUser);
      }
    } else {
      // public
      whisper = [];
    }

    const templateData = {
      title,
      effect,
      tier,
      cost: punishment.cost,
      targetName,
      isWhisper: whisper.length > 0,
      soundPlayed: game.settings.get(this.MODULE_ID, "playSound")
    };

    const renderTpl = foundry.applications?.handlebars?.renderTemplate ?? renderTemplate;
    const content = await renderTpl("modules/metamoedas-by-thorunn/templates/chat-card.hbs", templateData);

    const chatData = {
      user: game.user.id,
      speaker: { alias: "O Conselho do Infortúnio (Mestra Thorunn)" },
      content,
      whisper: whisper.map(u => u.id || u),
      flags: {
        "metamoedas-by-thorunn": {
          punishmentId: punishment.id,
          cost: punishment.cost,
          tier: punishment.tier
        }
      }
    };

    await ChatMessage.create(chatData);
  }

  /**
   * Broadcast message when 4th infraction is reached (1 coin left before Siricótico)
   */
  static async broadcastSiricoticoWarning4() {
    const title = game.i18n.localize("METAMOEDAS.Chat.SiricoticoNearTitle") || "⚠️ SIRICÓTICO IMINENTE! (4/5)";
    const text = game.i18n.localize("METAMOEDAS.Chat.SiricoticoNearWarning") || "Atenção jogadores: 4 infrações de metagame foram cometidas nesta cena! Falta apenas 1 infração para despertar o Siricótico e inflacionar os custos do universo!";

    const content = `
      <div class="metamoedas-chat-card siricotico-warning-near">
        <div class="card-header">
          <i class="fa-solid fa-exclamation" style="color: #f7ca62; font-size: 1.3rem;"></i>
          <h3>${title}</h3>
        </div>
        <div class="card-body">
          <p class="siricotico-desc">${text}</p>
        </div>
        <div class="card-footer">
          <em>"Mais um pio fora de cena e o caos será definitivo..."</em>
        </div>
      </div>
    `;

    await ChatMessage.create({
      user: game.user.id,
      speaker: { alias: "Alerta de Metagame" },
      content
    });
  }

  /**
   * Broadcast message when the 5th infraction awakens Siricótico
   */
  static async broadcastSiricoticoAwakening() {
    const title = game.i18n.localize("METAMOEDAS.Chat.SiricoticoTitle") || "⚠️ O SIRICÓTICO DESPERTOU!";
    const text = game.i18n.localize("METAMOEDAS.Chat.SiricoticoWarning") || "A 5ª infração metagame desta cena foi atingida! A inflação cósmica cobrou seu preço. O Siricótico foi convocado para a mesa e os custos foram inflacionados!";

    const content = `
      <div class="metamoedas-chat-card siricotico-alert">
        <div class="card-header">
          <i class="fas fa-skull-crossbones"></i>
          <h3>${title}</h3>
        </div>
        <div class="card-body">
          <p class="siricotico-desc">${text}</p>
        </div>
        <div class="card-footer">
          <em>"A paciência do mestre tem limite, e o Siricótico não perdoa."</em>
        </div>
      </div>
    `;

    await ChatMessage.create({
      user: game.user.id,
      speaker: { alias: "Alerta de Metagame" },
      content
    });
  }
}
