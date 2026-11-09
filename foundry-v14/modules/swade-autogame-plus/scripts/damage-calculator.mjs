/**
 * @fileoverview Motor de Dano, Metal Pesado, Projeção e Mitigação para Savage Worlds (SWADE + Compêndios)
 * [PT-BR] Calcula penetração de armadura (AP), dano efetivo, Resistência, Limite de Ferimentos, Metal Pesado (Sci-Fi), Projeção (Supers), Traição (Fantasia) e Marcas de Vício (Horror).
 * [EN] Calculates armor piercing (AP), effective damage, Toughness, Wound Cap, Heavy Metal (Sci-Fi), Knockback (Supers), Betrayal (Fantasy), and Vice Marks (Horror).
 */

export class DamageCalculator {
  /**
   * [PT-BR] Converte algarismo romano de Classe de Metal Pesado (I a VII) ou número para inteiro (1 a 7).
   * [EN] Converts Heavy Metal Class Roman numeral (I to VII) or number to integer (1 to 7).
   * @param {string|number} cls
   * @returns {number}
   */
  static parseHeavyMetalClass(cls) {
    if (typeof cls === "number" && Number.isFinite(cls)) {
      return Math.min(7, Math.max(1, Math.round(cls)));
    }
    const map = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7 };
    return map[String(cls || "").trim().toUpperCase()] || 0;
  }

  /**
   * [PT-BR] Converte inteiro (1 a 7) para algarismo romano de Classe de Metal Pesado.
   * [EN] Converts integer (1 to 7) to Heavy Metal Class Roman numeral.
   * @param {number} num
   * @returns {string}
   */
  static toRomanClass(num) {
    const romans = ["I", "II", "III", "IV", "V", "VI", "VII"];
    const idx = Math.min(7, Math.max(1, Math.round(num))) - 1;
    return romans[idx] || "I";
  }

  /**
   * [PT-BR] Calcula a Classe de Arma Pesada (I a VII) segundo o Compêndio de Ficção Científica (média do dano + PA).
   * [EN] Calculates Heavy Weapon Class (I to VII) per Science Fiction Companion (average damage + AP).
   * @param {object} params
   * @param {number} params.averageDamage - Média matemática dos dados de dano da arma.
   * @param {number} [params.ap=0] - Penetração de Armadura (AP).
   * @param {boolean} [params.isHeavyWeapon=true] - Se a arma possui a qualidade Arma Pesada.
   * @returns {{ classNumber: number, classRoman: string, score: number } | null}
   */
  static calculateWeaponHeavyMetalClass({ averageDamage, ap = 0, isHeavyWeapon = true }) {
    if (!isHeavyWeapon) {
      return null;
    }
    const score = Math.ceil(Number(averageDamage) || 0) + (Number(ap) || 0);
    const classNumber =
      score < 21 ? 1 : score < 31 ? 2 : score < 41 ? 3 : score < 51 ? 4 : score < 61 ? 5 : score < 71 ? 6 : 7;
    return {
      classNumber,
      classRoman: this.toRomanClass(classNumber),
      score,
    };
  }

  /**
   * [PT-BR] Calcula a Classe de Veículo/Armadura Pesada (I a VII) segundo a Resistência Total (Sci-Fi Companion).
   * [EN] Calculates Vehicle/Heavy Armor Class (I to VII) based on Total Toughness (Sci-Fi Companion).
   * @param {number} totalToughness
   * @returns {{ classNumber: number, classRoman: string }}
   */
  static calculateVehicleHeavyMetalClass(totalToughness) {
    const t = Number(totalToughness) || 0;
    const classNumber =
      t < 16 ? 1 : t < 26 ? 2 : t < 36 ? 3 : t < 46 ? 4 : t < 56 ? 5 : t < 66 ? 6 : 7;
    return {
      classNumber,
      classRoman: this.toRomanClass(classNumber),
    };
  }

  /**
   * [PT-BR] Calcula a Projeção (Knockback) do Compêndio de Superpoderes (p. 37) com base no dano e na Escala do alvo.
   * [EN] Calculates Knockback from the Super Powers Companion (p. 37) based on damage and target Scale.
   * Limiares por Tamanho/Escala: Pequeno/Minúsculo (<=-2): 10 | Normal (-1 a +3): 20 | Grande (+4 a +7): 30 | Enorme (+8 a +11): 40 | Colossal (>=+12): 50.
   *
   * @param {number} damage - Dano total causado.
   * @param {number} [targetSize=0] - Tamanho (Size) do alvo (-4 a +20).
   * @returns {{ triggered: boolean, threshold: number, diceCount: number, formula: string }}
   */
  static calculateKnockback(damage, targetSize = 0) {
    const size = Number(targetSize) || 0;
    let threshold = 20;
    if (size <= -2) {
      threshold = 10;
    } else if (size >= 12) {
      threshold = 50;
    } else if (size >= 8) {
      threshold = 40;
    } else if (size >= 4) {
      threshold = 30;
    }

    if (damage < threshold) {
      return {
        triggered: false,
        threshold,
        diceCount: 0,
        formula: "0",
      };
    }

    const extraTens = Math.floor((damage - threshold) / 10);
    const diceCount = 1 + extraTens;
    return {
      triggered: true,
      threshold,
      diceCount,
      formula: `${diceCount}d6`,
    };
  }

  /**
   * [PT-BR] Calcula o impacto de um dano contra a Resistência de um alvo de acordo com as regras oficiais de SWADE e Compêndios.
   * [EN] Calculates the impact of damage against a target's Toughness according to official SWADE and Companion rules.
   *
   * @param {object} params
   * @param {number} params.damage - Dano total rolado.
   * @param {number} [params.ap=0] - Penetração de Armadura (Armor Piercing) do ataque.
   * @param {number} params.toughness - Valor de Resistência base do alvo (já incluindo armadura).
   * @param {number} [params.armor=0] - Valor de Armadura inclusa na Resistência.
   * @param {boolean} [params.isAlreadyShaken=false] - Se o alvo já está no estado Abalado (Shaken).
   * @param {boolean} [params.isHeavyWeapon=false] - Se o ataque é uma Arma Pesada.
   * @param {boolean} [params.hasHeavyArmor=false] - Se o alvo possui Armadura Pesada.
   * @param {boolean} [params.woundCap=false] - Regra de Ambientação: Limite de Ferimentos (máximo 4 Ferimentos).
   * @param {boolean} [params.isTheDrop=false] - Se o ataque foi feito com Finalização (The Drop).
   * @param {boolean} [params.ruleBetrayal=false] - Regra de Ambientação (Fantasia): Traição (impede Absorção em Finalização).
   * @param {number} [params.viceMarks=0] - Regra de Ambientação (Horror): Marcas de Vício (+2 no dano sofrido por marca).
   * @param {string|number} [params.weaponClass=null] - Classe de Metal Pesado da arma (I–VII ou 1–7).
   * @param {string|number} [params.targetClass=null] - Classe de Metal Pesado do veículo/alvo (I–VII ou 1–7).
   * @param {boolean} [params.isEmp=false] - Qualidade Sci-Fi PEM (reduz Ferimentos reais em 1 e desativa eletrônicos).
   * @param {boolean} [params.isTemporal=false] - Qualidade Sci-Fi Temporal (aplica Distraído e Vulnerável se atingir).
   * @param {boolean} [params.enableKnockback=false] - Regra de Ambientação (Supers): Calcula Projeção (Knockback).
   * @param {number} [params.targetSize=0] - Tamanho do alvo para cálculo de Projeção.
   * @returns {{
   *   effectiveArmor: number,
   *   effectiveToughness: number,
   *   damageDealt: number,
   *   isShakenInflicted: boolean,
   *   woundsInflicted: number,
   *   isIncapacitated: boolean,
   *   isIgnoredHeavyArmor: boolean,
   *   canSoak: boolean,
   *   heavyMetalModifier: number,
   *   electronicsDisabled: boolean,
   *   inflictDistractedVulnerable: boolean,
   *   knockback: { triggered: boolean, threshold: number, diceCount: number, formula: string }
   * }}
   */
  static calculate({
    damage,
    ap = 0,
    toughness,
    armor = 0,
    isAlreadyShaken = false,
    isHeavyWeapon = false,
    hasHeavyArmor = false,
    woundCap = false,
    isTheDrop = false,
    ruleBetrayal = false,
    viceMarks = 0,
    weaponClass = null,
    targetClass = null,
    isEmp = false,
    isTemporal = false,
    enableKnockback = false,
    targetSize = 0,
  }) {
    const canSoak = !(ruleBetrayal && isTheDrop);
    const viceBonusDamage = Math.max(0, Number(viceMarks) || 0) * 2;
    const totalDamage = (Number(damage) || 0) + viceBonusDamage;

    const knockback = enableKnockback
      ? this.calculateKnockback(totalDamage, targetSize)
      : { triggered: false, threshold: 20, diceCount: 0, formula: "0" };

    // [PT-BR] Regra de Armadura Pesada: Se o alvo possui Armadura Pesada e a arma não é Pesada, o dano é ignorado
    // [EN] Heavy Armor Rule: If target has Heavy Armor and weapon is not Heavy, damage is ignored
    if (hasHeavyArmor && !isHeavyWeapon) {
      return {
        effectiveArmor: armor,
        effectiveToughness: toughness,
        damageDealt: totalDamage,
        isShakenInflicted: false,
        woundsInflicted: 0,
        isIncapacitated: false,
        isIgnoredHeavyArmor: true,
        canSoak,
        heavyMetalModifier: 0,
        electronicsDisabled: false,
        inflictDistractedVulnerable: false,
        knockback: { triggered: false, threshold: knockback.threshold, diceCount: 0, formula: "0" },
      };
    }

    // [PT-BR] A Penetração de Armadura (AP) só reduz pontos de armadura existentes, nunca a carcaça/vigor base
    // [EN] Armor Piercing (AP) only reduces existing armor points, never base vigor/chassis
    const effectiveArmor = Math.max(0, armor - ap);
    const armorReduction = armor - effectiveArmor;
    const effectiveToughness = Math.max(1, toughness - armorReduction);

    const margin = totalDamage - effectiveToughness;

    // [PT-BR] Se o dano não igualou nem superou a Resistência efetiva, nenhum efeito ocorre
    // [EN] If damage did not meet or exceed effective Toughness, no effect occurs
    if (margin < 0) {
      return {
        effectiveArmor,
        effectiveToughness,
        damageDealt: totalDamage,
        isShakenInflicted: false,
        woundsInflicted: 0,
        isIncapacitated: false,
        isIgnoredHeavyArmor: false,
        canSoak,
        heavyMetalModifier: 0,
        electronicsDisabled: false,
        inflictDistractedVulnerable: Boolean(isTemporal),
        knockback,
      };
    }

    // [PT-BR] Cálculo de Elevações de Dano (a cada 4 pontos acima da Resistência gera 1 Ferimento)
    // [EN] Damage Raise Calculation (every 4 points over Toughness causes 1 Wound)
    const damageRaises = Math.floor(margin / 4);

    let isShakenInflicted = false;
    let woundsInflicted = 0;

    if (damageRaises === 0) {
      // [PT-BR] Sucesso simples no dano
      if (isAlreadyShaken) {
        // [PT-BR] Regra Oficial: Alvo já Abalado sofre 1 Ferimento ao receber outro resultado Abalado
        // [EN] Official Rule: An already Shaken target suffers 1 Wound when receiving another Shaken result
        woundsInflicted = 1;
        isShakenInflicted = true;
      } else {
        isShakenInflicted = true;
        woundsInflicted = 0;
      }
    } else {
      // [PT-BR] 1 ou mais elevações causam Abalado + 1 Ferimento por elevação
      // [EN] 1 or more raises cause Shaken + 1 Wound per raise
      isShakenInflicted = true;
      woundsInflicted = damageRaises;
    }

    // [PT-BR] Regra Metal Pesado (Sci-Fi Companion): Diferença de Classe modifica os Ferimentos causados
    // [EN] Heavy Metal Rule (Sci-Fi Companion): Class difference modifies inflicted Wounds
    let heavyMetalModifier = 0;
    if (weaponClass !== null && targetClass !== null) {
      const wCls = this.parseHeavyMetalClass(weaponClass);
      const tCls = this.parseHeavyMetalClass(targetClass);
      if (wCls > 0 && tCls > 0) {
        heavyMetalModifier = wCls - tCls;
        if (woundsInflicted > 0 || heavyMetalModifier < 0) {
          woundsInflicted = Math.max(0, woundsInflicted + heavyMetalModifier);
        }
      }
    }

    // [PT-BR] Qualidade PEM (Eletromagnética - Sci-Fi Companion p. 52): Desativa eletrônicos e reduz Ferimentos reais em 1
    // [EN] EMP Quality (Sci-Fi Companion p. 52): Disables electronics and reduces real Wounds by 1
    const electronicsDisabled = Boolean(isEmp);
    if (isEmp && woundsInflicted > 0) {
      woundsInflicted = Math.max(0, woundsInflicted - 1);
    }

    // [PT-BR] Regra de Ambientação: Limite de Ferimentos (Wound Cap = 4)
    // [EN] Setting Rule: Wound Cap (max 4 Wounds per attack)
    if (woundCap && woundsInflicted > 4) {
      woundsInflicted = 4;
    }

    return {
      effectiveArmor,
      effectiveToughness,
      damageDealt: totalDamage,
      isShakenInflicted,
      woundsInflicted,
      isIncapacitated: false,
      isIgnoredHeavyArmor: false,
      canSoak,
      heavyMetalModifier,
      electronicsDisabled,
      inflictDistractedVulnerable: Boolean(isTemporal),
      knockback,
    };
  }
}
