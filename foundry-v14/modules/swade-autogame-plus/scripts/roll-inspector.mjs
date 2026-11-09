/**
 * @fileoverview Analisador e Formatador de Rolagens de SWADE (Traço, Dado Selvagem, Ases)
 * [PT-BR] Inspeciona termos e resultados de dados para detectar dados explodidos (Ases), Dado Selvagem e sucessos máximos.
 * [EN] Inspects roll terms and results to detect exploded dice (Aces), Wild Die, and maximum roll values.
 */

export class RollInspector {
  /**
   * [PT-BR] Inspeciona uma rolagem de SWADE e extrai informações detalhadas para o card compacto.
   * [EN] Inspects a SWADE roll and extracts detailed breakdown for the compact chat card.
   *
   * @param {Roll} roll - Instância da rolagem do Foundry.
   * @param {object} [options={}] - Configurações extras (targetNumber, isDamage, etc).
   * @returns {object} Detalhes estruturados da rolagem.
   */
  static inspect(roll, _options = {}) {
    if (!roll) {
      return null;
    }

    const diceTerms = roll.dice || [];
    const diceBreakdown = [];
    let wildDieInfo = null;

    for (const die of diceTerms) {
      const faces = die.faces;
      const flavorStr = (die.options?.flavor || die.flavor || "").trim();
      const lowerFlavor = flavorStr.toLowerCase();
      const isWild =
        die.constructor?.name === "WildDie" ||
        die.constructor?.DENOMINATION === "w" ||
        (typeof die.denomination === "string" && die.denomination.startsWith("dw")) ||
        lowerFlavor.includes("wild") ||
        lowerFlavor.includes("selvagem") ||
        Boolean(die.options?.isWildDie);

      // [PT-BR] Extrair cada resultado individual e detectar explosões (Ases)
      // [EN] Extract each individual result and detect explosions (Aces)
      const results = die.results || [];
      const values = results.map((r) => r.result);
      const total = die.total;

      // [PT-BR] Contagem de explosões consecutivas (valores iguais às faces do dado ou results.length > 1)
      // [EN] Count of consecutive explosions (values equal to die faces or results.length > 1)
      const explosionCount = values.filter(
        (v, idx) => v === faces && idx < values.length - 1
      ).length || (results.some((r) => r.exploded) ? 1 : 0);
      const hasMaxFace = values.some((v) => v === faces);

      const dieData = {
        faces,
        total,
        values,
        flavor: flavorStr || null,
        isWild,
        hasMaxFace,
        explosionCount,
      };

      if (isWild) {
        wildDieInfo = dieData;
      } else {
        diceBreakdown.push(dieData);
      }
    }

    return {
      total: roll.total,
      formula: roll.formula,
      diceBreakdown,
      wildDieInfo,
    };
  }
}
