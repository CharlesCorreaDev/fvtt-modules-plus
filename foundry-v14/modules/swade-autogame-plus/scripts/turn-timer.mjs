/**
 * @fileoverview Temporizador Visual e Sonoro de Turno em Combate para SWADE
 * [PT-BR] Exibe uma barra de progresso no topo da tela com contagem regressiva e som quando chega o turno do combatente.
 * [EN] Displays a progress bar at the top of the screen with countdown and sound when a combatant's turn starts.
 */

export class TurnTimer {
  static #timerInterval = null;
  static #timeRemaining = 0;
  static #totalDuration = 30;
  static #element = null;

  /**
   * [PT-BR] Inicia o temporizador para o combatente ativo da rodada.
   * [EN] Starts the timer for the active round combatant.
   *
   * @param {Combatant} combatant
   */
  static start(combatant) {
    this.stop();

    if (!combatant?.actor) {
      return;
    }

    this.#totalDuration = game.settings.get("swade-autogame-plus", "turnTimerDuration") ?? 30;
    this.#timeRemaining = this.#totalDuration;

    const isCurrentPlayer = combatant.actor.isOwner;

    // [PT-BR] Notificação sonora / alerta se for o turno do usuário ativo
    // [EN] Sound notification / alert if it's the active user's turn
    if (isCurrentPlayer && !game.user.isGM) {
      ui.notifications?.info(game.i18n.localize("SWAG.Timer.YourTurn") || "SEU TURNO!");
    }

    this.#render(combatant);

    this.#timerInterval = setInterval(() => {
      this.#timeRemaining--;
      this.#update();

      if (this.#timeRemaining <= 0) {
        this.stop();
        if (isCurrentPlayer) {
          ui.notifications?.warn(
            game.i18n.localize("SWAG.Timer.Timeout") || "Tempo de turno esgotado!"
          );
        }
      }
    }, 1000);
  }

  /**
   * [PT-BR] Interrompe e remove o temporizador visual.
   * [EN] Stops and removes the visual timer.
   */
  static stop() {
    if (this.#timerInterval) {
      clearInterval(this.#timerInterval);
      this.#timerInterval = null;
    }
    if (this.#element) {
      this.#element.remove();
      this.#element = null;
    }
  }

  static #render(combatant) {
    const html = `
      <div id="swag-turn-timer" class="SWAG-PLUS-panel" style="
        position: fixed;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        min-width: 320px;
        text-align: center;
        padding: 8px 16px;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="color: var(--swag-color-light); font-size: 0.95rem;">
            <i class="fas fa-hourglass-half"></i> ${combatant.name}
          </strong>
          <span id="swag-timer-seconds" class="SWAG-PLUS-badge raise">${this.#timeRemaining}s</span>
        </div>
        <div style="background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden; height: 8px;">
          <div id="swag-timer-bar" style="
            width: 100%;
            height: 100%;
            background: var(--swag-color-primary);
            transition: width 1s linear;
          "></div>
        </div>
      </div>
    `;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    this.#element = doc.body.firstElementChild;
    document.body.appendChild(this.#element);
  }

  static #update() {
    if (!this.#element) {
      return;
    }
    const secondsEl = this.#element.querySelector("#swag-timer-seconds");
    const barEl = this.#element.querySelector("#swag-timer-bar");

    if (secondsEl) {
      secondsEl.textContent = `${this.#timeRemaining}s`;
    }
    if (barEl) {
      const percentage = (this.#timeRemaining / this.#totalDuration) * 100;
      barEl.style.width = `${percentage}%`;

      if (percentage <= 25) {
        barEl.style.background = "#ef4444";
        if (secondsEl) {
          secondsEl.className = "SWAG-PLUS-badge critfail";
        }
      }
    }
  }
}
