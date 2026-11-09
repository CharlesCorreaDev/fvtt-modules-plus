/**
 * @fileoverview Adaptador de Efeitos Audiovisuais (Sequencer, Celebrate, Dice So Nice)
 * [PT-BR] Dispara animações de projéteis e celebrações de ases sem quebrar caso os módulos não estejam instalados.
 * [EN] Triggers projectile animations and ace celebrations safely without breaking if modules are not installed.
 */

export class FxAdapter {
  /**
   * [PT-BR] Dispara confetes ou efeitos de celebração quando ocorre um Ás ou Acerto Crítico.
   * [EN] Triggers confetti or celebration effects when an Ace or Critical Success happens.
   *
   * @param {object} params
   * @param {boolean} [params.isAce=false]
   * @param {boolean} [params.isCritical=false]
   */
  static async triggerCelebration({ isAce = false, isCritical = false }) {
    if (!game.settings.get("swade-autogame-plus", "enableCelebrateAces")) {
      return;
    }

    // [PT-BR] Integração suave com o módulo Celebrate (se ativo)
    // [EN] Soft integration with Celebrate module (if active)
    if (game.modules.get("foundryvtt-celebrate")?.active) {
      if (typeof globalThis.Celebrate?.confetti === "function") {
        globalThis.Celebrate.confetti();
      }
    }

    // [PT-BR] Efeito de som de Ás ou Coringa
    // [EN] Ace or Joker sound effect
    if (isCritical || isAce) {
      this.showAceSplashOverlay();
      foundry.audio.AudioHelper.play({
        src: "sounds/fanfare.wav",
        volume: 0.6,
        autoplay: true,
        loop: false,
      });
    }
  }

  /**
   * [PT-BR] Exibe overlay escuro semi-transparente no canvas com a palavra 'SELVAGEM!' por 2 segundos.
   * [EN] Displays semi-transparent dark canvas overlay with 'SELVAGEM!' for 2 seconds.
   */
  static showAceSplashOverlay() {
    if (typeof document === "undefined") {
      return;
    }

    // Remove qualquer overlay existente anterior para não acumular
    document.querySelector(".swag-ace-splash-overlay")?.remove();

    const overlay = document.createElement("div");
    overlay.className = "swag-ace-splash-overlay";
    overlay.innerHTML = `
      <div class="swag-ace-splash-text">
        <i class="fa-solid fa-bolt me-2"></i>SELVAGEM!
      </div>
      <div class="swag-ace-splash-subtext">
        EXPLOSÃO DE DADOS (ÁS)
      </div>
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.remove();
    }, 2000);
  }

  /**
   * [PT-BR] Dispara animação do Sequencer entre o atacante e o alvo (se o Sequencer estiver ativo).
   * [EN] Triggers Sequencer animation between attacker and target (if Sequencer is active).
   *
   * @param {Token} originToken
   * @param {Token} targetToken
   * @param {string} [fxType="bullet"]
   */
  static async playAttackAnimation(originToken, targetToken, _fxType = "bullet") {
    if (!game.modules.get("sequencer")?.active) {
      return;
    }
    if (!globalThis.Sequence) {
      return;
    }

    if (!originToken || !targetToken) {
      return;
    }

    new globalThis.Sequence()
      .effect()
      .file("jb2a.bullet.01.orange")
      .atLocation(originToken)
      .stretchTo(targetToken)
      .play();
  }
}
