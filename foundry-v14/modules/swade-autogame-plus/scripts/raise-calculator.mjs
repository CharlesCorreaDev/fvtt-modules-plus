/**
 * @fileoverview Calculadora de Elevações e Sucesso para SWADE
 * [PT-BR] Módulo isolado para determinação matemática de sucessos e elevações.
 * [EN] Isolated module for mathematical calculation of successes and raises.
 */

export class RaiseCalculator {
  /**
   * [PT-BR] Calcula o resultado de uma rolagem de Traço/Perícia contra um TN (Padrão: 4).
   * [EN] Calculates the result of a Trait/Skill roll against a Target Number (Default: 4).
   *
   * @param {number} total - O total final da rolagem (após modificadores).
   * @param {number} targetNumber - O número alvo a ser superado (Parry ou TN fixo).
   * @param {object} [options={}] - Opções extras (isCriticalFailure, diceTerms, etc).
   * @returns {{ isSuccess: boolean, raises: number, margin: number, isCriticalFailure: boolean, isCriticalSuccess: boolean }}
   */
  static calculate(total, targetNumber = 4, options = {}) {
    if (options.isCriticalFailure) {
      return {
        isSuccess: false,
        raises: 0,
        margin: total - targetNumber,
        isCriticalFailure: true,
        isCriticalSuccess: false,
      };
    }

    const margin = total - targetNumber;
    const isSuccess = margin >= 0;
    const raises = isSuccess ? Math.floor(margin / 4) : 0;
    const isCriticalSuccess = raises >= 3; // [PT-BR] 3 ou mais elevações é considerado Acerto Crítico extraordinário

    return {
      isSuccess,
      raises,
      margin,
      isCriticalFailure: false,
      isCriticalSuccess,
    };
  }

  /**
   * [PT-BR] Formata uma string amigável de resultado (ex: "Sucesso com 1 Elevação").
   * [EN] Formats a friendly result string (e.g., "Success with 1 Raise").
   *
   * @param {number} total
   * @param {number} targetNumber
   * @param {string} [lang="pt-BR"]
   * @returns {string}
   */
  static formatResult(total, targetNumber = 4, lang = "pt-BR") {
    const res = this.calculate(total, targetNumber);
    const isPt = lang.startsWith("pt");

    if (res.isCriticalFailure) {
      return isPt ? "Falha Crítica!" : "Critical Failure!";
    }
    if (!res.isSuccess) {
      return isPt ? "Falha" : "Failure";
    }
    if (res.raises === 0) {
      return isPt ? "Sucesso" : "Success";
    }
    if (res.raises === 1) {
      return isPt ? "Sucesso com 1 Elevação" : "Success with 1 Raise";
    }
    return isPt ? `Sucesso com ${res.raises} Elevações` : `Success with ${res.raises} Raises`;
  }
}
