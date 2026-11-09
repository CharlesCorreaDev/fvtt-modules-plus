/**
 * @fileoverview Motor Unificado dos Compêndios Oficiais de SWADE para SWADE AutoGame Plus (SWAG+)
 * [PT-BR] Clona e expande todas as automações oficiais de Fantasia, Ficção Científica, Horror, Super Poderes, Pathfinder (SWPF) e Sprawlrunners, funcionando de forma 100% autônoma mesmo quando os módulos oficiais não estão instalados ou ativos.
 * [EN] Clones and expands all official automations from Fantasy, Sci-Fi, Horror, Super Powers, Pathfinder (SWPF), and Sprawlrunners, operating 100% standalone even when official modules are not installed or active.
 */

import { DamageCalculator } from "./damage-calculator.mjs";

export const MODULE_ID = "swade-autogame-plus";

/**
 * [PT-BR] Tabela Oficial de Super Força (Compêndio de Superpoderes p. 36) com suporte a Libras (Imperial) e Quilogramas (Métrico).
 * [EN] Official Super Strength Table (Super Powers Companion p. 36) with Imperial (lbs) and Metric (kg) support.
 */
export const SUPER_STRENGTH_TABLE = [
  { strength: "1", sides: 1, modifier: 0, loadLimitLbs: 0, maxWeightLbs: 0, loadLimitKg: 0, maxWeightKg: 0 },
  { strength: "d4", sides: 4, modifier: 0, loadLimitLbs: 20, maxWeightLbs: 80, loadLimitKg: 10, maxWeightKg: 40 },
  { strength: "d6", sides: 6, modifier: 0, loadLimitLbs: 40, maxWeightLbs: 160, loadLimitKg: 20, maxWeightKg: 80 },
  { strength: "d8", sides: 8, modifier: 0, loadLimitLbs: 60, maxWeightLbs: 240, loadLimitKg: 30, maxWeightKg: 120 },
  { strength: "d10", sides: 10, modifier: 0, loadLimitLbs: 80, maxWeightLbs: 320, loadLimitKg: 40, maxWeightKg: 160 },
  { strength: "d12", sides: 12, modifier: 0, loadLimitLbs: 100, maxWeightLbs: 400, loadLimitKg: 50, maxWeightKg: 200 },
  { strength: "d12+1", sides: 12, modifier: 1, loadLimitLbs: 125, maxWeightLbs: 500, loadLimitKg: 62, maxWeightKg: 250 },
  { strength: "d12+2", sides: 12, modifier: 2, loadLimitLbs: 250, maxWeightLbs: 1000, loadLimitKg: 125, maxWeightKg: 500 },
  { strength: "d12+3", sides: 12, modifier: 3, loadLimitLbs: 500, maxWeightLbs: 2000, loadLimitKg: 250, maxWeightKg: 1000 },
  { strength: "d12+4", sides: 12, modifier: 4, loadLimitLbs: 1000, maxWeightLbs: 4000, loadLimitKg: 500, maxWeightKg: 2000 },
  { strength: "d12+5", sides: 12, modifier: 5, loadLimitLbs: 2000, maxWeightLbs: 8000, loadLimitKg: 1000, maxWeightKg: 4000 },
  { strength: "d12+6", sides: 12, modifier: 6, loadLimitLbs: 4000, maxWeightLbs: 16000, loadLimitKg: 2000, maxWeightKg: 8000 },
  { strength: "d12+7", sides: 12, modifier: 7, loadLimitLbs: 8000, maxWeightLbs: 32000, loadLimitKg: 4000, maxWeightKg: 16000 },
  { strength: "d12+8", sides: 12, modifier: 8, loadLimitLbs: 16000, maxWeightLbs: 640000, loadLimitKg: 8000, maxWeightKg: 320000 },
  { strength: "d12+9", sides: 12, modifier: 9, loadLimitLbs: 32000, maxWeightLbs: 1280000, loadLimitKg: 16000, maxWeightKg: 640000 },
  { strength: "d12+10", sides: 12, modifier: 10, loadLimitLbs: 64000, maxWeightLbs: 5120000, loadLimitKg: 32000, maxWeightKg: 2560000 },
  { strength: "d12+11", sides: 12, modifier: 11, loadLimitLbs: 128000, maxWeightLbs: 10240000, loadLimitKg: 64000, maxWeightKg: 5120000 },
  { strength: "d12+12", sides: 12, modifier: 12, loadLimitLbs: 250000, maxWeightLbs: 1000000, loadLimitKg: 125000, maxWeightKg: 500000 },
  { strength: "d12+13", sides: 12, modifier: 13, loadLimitLbs: 500000, maxWeightLbs: 2000000, loadLimitKg: 250000, maxWeightKg: 1000000 },
  { strength: "d12+14", sides: 12, modifier: 14, loadLimitLbs: 1000000, maxWeightLbs: 2000000, loadLimitKg: 500000, maxWeightKg: 1000000 },
  { strength: "d12+15", sides: 12, modifier: 15, loadLimitLbs: 2000000, maxWeightLbs: 4000000, loadLimitKg: 1000000, maxWeightKg: 2000000 },
];

/**
 * [PT-BR] Ações Oficiais de Embate (Clash Tokens - Sci-Fi Companion p. 84).
 * [EN] Official Clash Token Actions (Sci-Fi Companion p. 84).
 */
export const CLASH_ACTIONS = {
  damage: {
    key: "damage",
    label: "Dano (+1 Ferimento)",
    flavor: "Embate: Dano (Ação Livre)",
    spend: 1,
    icon: "fa-solid fa-burst",
    message:
      "O piloto gasta <strong>1 Marcador de Embate (Clash Token)</strong> para aumentar em <strong>+1 o número de Ferimentos</strong> causados por um ataque originado de seu veículo (não transforma 'Sem Efeito' em Ferimento).",
  },
  evade: {
    key: "evade",
    label: "Evadir (-1 Ferimento)",
    flavor: "Embate: Evadir (Ação Livre)",
    spend: 1,
    icon: "fa-solid fa-plane-slash",
    message:
      "O piloto gasta <strong>1 Marcador de Embate (Clash Token)</strong> para <strong>negar automaticamente 1 Ferimento</strong> sofrido pelo veículo (antes ou depois de rolagens de Absorção).",
  },
  replenish: {
    key: "replenish",
    label: "Recarregar Escudos",
    flavor: "Embate: Recarregar Escudos (Ação Limitada)",
    spend: 1,
    icon: "fa-solid fa-shield",
    message:
      "O piloto gasta <strong>1 Marcador de Embate (Clash Token)</strong> para <strong>restaurar todas as cargas de escudo</strong> do seu veículo.",
  },
  escape: {
    key: "escape",
    label: "Escapar (3 Tokens)",
    flavor: "Embate: Escapar (Ação Limitada)",
    spend: 3,
    icon: "fa-solid fa-truck-fast",
    message:
      "O piloto gasta <strong>3 Marcadores de Embate</strong> e realiza uma rolagem resistida de manobra contra o melhor inimigo para escapar do encontro. Se falhar, recupera os 3 marcadores.",
  },
  intercept: {
    key: "intercept",
    label: "Interceptar (3 Tokens)",
    flavor: "Embate: Interceptar (Ação Limitada)",
    spend: 3,
    icon: "fa-solid fa-octagon-exclamation",
    message:
      "O piloto gasta <strong>3 Marcadores de Embate</strong> e realiza uma rolagem resistida de manobra para forçar outro veículo a parar ou encurralá-lo. Se falhar, recupera os 3 marcadores.",
  },
  objective: {
    key: "objective",
    label: "Objetivo (3 Tokens)",
    flavor: "Embate: Objetivo de Missão (Ação Limitada)",
    spend: 3,
    icon: "fa-solid fa-crown",
    message:
      "O piloto gasta <strong>3 Marcadores de Embate</strong> e realiza uma rolagem de manobra para concluir um objetivo crítico da missão (bombardear alvo, cruzar portal de salto, etc.).",
  },
};

/**
 * [PT-BR] Tabelas Embutidas de Psicose Menor e Maior (Horror Companion p. 22) para operação autônoma sem compêndio.
 * [EN] Built-in Minor and Major Psychosis Tables (Horror Companion p. 22) for standalone operation without compendium.
 */
export const BUILTIN_PSYCHOSIS_TABLES = {
  minor: [
    { name: "Ansioso (Psicose Menor)", desc: "Sofre -1 em todos os testes de Medo." },
    { name: "Paranoico (Psicose Menor)", desc: "Desconfia de aliados; não pode receber dados de Suporte de ninguém." },
    { name: "Supersticioso (Psicose Menor)", desc: "Apegado a um amuleto ou ritual; sem ele, sofre -1 em todas as rolagens de Característica." },
    { name: "Obsessivo (Psicose Menor)", desc: "Obcecado pela criatura ou evento que causou o trauma (-1 em Perceber/Astúcia para outros assuntos)." },
    { name: "Pesadelos Recorrentes (Psicose Menor)", desc: "Deve fazer rolagem de Espírito ao dormir ou começa o dia com 1 nível de Fadiga." },
    { name: "Fobia Menor (Psicose Menor)", desc: "Subtrai -1 de todas as rolagens de Característica na presença da fonte do terror." },
  ],
  major: [
    { name: "Aterrorizado (Psicose Maior)", desc: "Sofre -2 em todos os testes de Medo." },
    { name: "Delirante (Psicose Maior)", desc: "Acredita em alucinações constantes; sofre -2 em Perceber e Conhecimento Geral." },
    { name: "Fúria Homicida (Psicose Maior)", desc: "Ao sofrer Falha Crítica em combate, ataca a criatura mais próxima (aliado ou inimigo)." },
    { name: "Catatônico sob Estresse (Psicose Maior)", desc: "Ao sacar carta 5 ou menor em combate, deve passar em Espírito ou perde o turno paralisado." },
    { name: "Fobia Maior (Psicose Maior)", desc: "Subtrai -2 de todas as rolagens de Característica na presença da fonte do terror." },
    { name: "Dependência Química/Álcool (Psicose Maior)", desc: "Recorre ao vício para apagar as memórias do horror (Complicação Hábito Maior)." },
  ],
};

/**
 * [PT-BR] Tabela Embutida de Tesouros Mágicos (Fantasy Companion p. 170) para operação autônoma.
 * [EN] Built-in Magic Treasure Table (Fantasy Companion p. 170) for standalone operation.
 */
export const BUILTIN_FANTASY_LOOT_ITEMS = [
  "Poção de Cura Maior (Restaura até 2 Ferimentos)",
  "Pergaminho Arcano de Explosão (3d6 de Fogo)",
  "Anel de Proteção Mística (+1 Resistência e +1 Armadura)",
  "Arma Encantada Certeira (+1 em Lutar/Atirar e Dano Mágico)",
  "Manto Élfico das Sombras (+2 em Furtividade)",
  "Botas da Velocidade (+2 Movimentação e dado de corrida d8)",
  "Amuleto de Coragem Sagrada (+2 contra Medo)",
  "Varinha de Raios Arcanos (5 cargas, 2d6 de dano elétrico)",
];

export class CompanionRulesEngine {
  /**
   * [PT-BR] Verifica se um módulo oficial da Pinnacle está ativo no mundo.
   * [EN] Checks if an official Pinnacle module is active in the world.
   * @param {string} moduleId
   * @returns {boolean}
   */
  static isOfficialModuleActive(moduleId) {
    return Boolean(globalThis.game?.modules?.get(moduleId)?.active);
  }

  /* ========================================================================
   * 1. COMPÊNDIO DE SUPERPODERES (SPC) & PATHFINDER (SWPF)
   * ======================================================================== */

  /**
   * [PT-BR] Calcula a capacidade de carga de Super Força (suporta Libras e Quilogramas/Métrico).
   * [EN] Calculates Super Strength load limit (supports Pounds and Kilograms/Metric).
   * @param {object} params
   * @param {number} params.sides - Lados do dado de Força (4 a 12).
   * @param {number} [params.modifier=0] - Modificador do dado de Força (0 a 15+).
   * @param {number} [params.encumbranceSteps=0] - Passos adicionais de carga (ex: Musculoso).
   * @param {boolean} [params.isMetric=false] - Se usa quilogramas em vez de libras.
   * @returns {{ loadLimit: number, maxWeight: number, label: string }}
   */
  static calculateSuperStrengthLoad({ sides = 4, modifier = 0, encumbranceSteps = 0, isMetric = false }) {
    let effSides = (Number(sides) || 4) + Math.max((Number(encumbranceSteps) || 0) * 2, 0);
    let effMod = Number(modifier) || 0;

    if (effSides < 4 && effSides !== 1) {
      effSides = 4;
    } else if (effSides > 12) {
      const overflow = effSides - 12;
      effSides = 12;
      effMod += Math.floor(overflow / 2);
    }
    effMod = Math.max(effMod, 0);

    let entry;
    if (effSides === 1) {
      entry = SUPER_STRENGTH_TABLE[0];
    } else if (effSides < 12) {
      const idx = Math.min(5, Math.max(1, Math.ceil(effSides / 2) - 1));
      entry = SUPER_STRENGTH_TABLE[idx];
    } else {
      const cappedMod = Math.min(15, effMod);
      entry = SUPER_STRENGTH_TABLE[cappedMod + 5];
    }

    return {
      loadLimit: isMetric ? entry.loadLimitKg : entry.loadLimitLbs,
      maxWeight: isMetric ? entry.maxWeightKg : entry.maxWeightLbs,
      label: entry.strength,
    };
  }

  /**
   * [PT-BR] Aplica Super Força no hook swadeActorPrepareDerivedData (executa se o SPC oficial não estiver ativo ou se o mundo usar sistema métrico, que o SPC oficial não suporta).
   * [EN] Applies Super Strength in swadeActorPrepareDerivedData hook (runs if official SPC is inactive or if world uses metric, which official SPC fails on).
   * @param {Actor} actor
   */
  static applySuperStrengthToActor(actor) {
    if (!actor || ["vehicle", "group"].includes(actor.type)) {
      return;
    }
    if (!globalThis.game?.settings?.get(MODULE_ID, "enableSuperPowersSupport")) {
      return;
    }
    const isMetric = globalThis.game?.settings?.get("swade", "weightUnit") === "metric";
    // Se o módulo oficial estiver ativo e NÃO for métrico, deixa o oficial calcular; se for métrico ou o oficial estiver inativo, o SWAG+ assume!
    if (this.isOfficialModuleActive("swade-supers-companion") && !isMetric) {
      return;
    }

    const strAttr = actor.system?.attributes?.strength;
    if (!strAttr?.die) {
      return;
    }

    const calc = this.calculateSuperStrengthLoad({
      sides: strAttr.die.sides,
      modifier: strAttr.die.modifier,
      encumbranceSteps: strAttr.encumbranceSteps ?? 0,
      isMetric,
    });

    if (actor.system?.details?.encumbrance) {
      actor.system.details.encumbrance.max = calc.loadLimit;
    }
  }

  /**
   * [PT-BR] Rola a Projeção (Knockback) e eventual Dano de Colisão (2d6 + distância) no Chat.
   * [EN] Rolls Knockback distance and optional Collision Damage (2d6 + distance) in Chat.
   * @param {object} params
   * @param {number} params.damage
   * @param {number} [params.targetSize=0]
   * @param {string} [params.targetName="Alvo"]
   * @param {boolean} [params.hitObstacle=true]
   */
  static async rollKnockback({ damage, targetSize = 0, targetName = "Alvo", hitObstacle = true }) {
    const kb = DamageCalculator.calculateKnockback(damage, targetSize);
    if (!kb.triggered) {
      globalThis.ui?.notifications?.info?.(
        `O dano (${damage}) não atingiu o limiar de Projeção (${kb.threshold}) para ${targetName}.`
      );
      return null;
    }

    const distRoll = new Roll(kb.formula);
    await distRoll.evaluate();
    const squares = distRoll.total;

    let collisionDamage = 0;
    if (hitObstacle) {
      const colRoll = new Roll(`2d6x + ${squares}`);
      await colRoll.evaluate();
      collisionDamage = colRoll.total;
    }

    if (globalThis.SWAG?.api?.createShowcaseCard) {
      await globalThis.SWAG.api.createShowcaseCard("damage", {
        title: `Projeção (Knockback): ${targetName}`,
        subtitle: `Arremessado ${squares} quadros (${squares * 2}m) • Limiar ${kb.threshold}`,
        topBadge: { text: "PROJEÇÃO", class: "bg-warning text-dark fw-bold" },
        statusBadge: {
          text: `${squares} Quadros!`,
          class: "bg-danger",
          icon: "fa-solid fa-person-falling-burst",
        },
        description: `<strong>${targetName}</strong> foi projetado violentamente por <strong>${squares} quadros</strong> (${kb.formula}). Deve passar em <strong>Atletismo -2</strong> ou fica <strong>Prostrado (Prone)</strong>.${
          hitObstacle
            ? `<br><span class="text-warning"><i class="fa-solid fa-building-circle-exclamation"></i> Colisão com Obstáculo (2d6+${squares}): <strong>${collisionDamage} de Dano extra!</strong></span>`
            : ""
        }`,
        resultBox: {
          title: hitObstacle ? "DANO DE COLISÃO" : "DISTÂNCIA DE PROJEÇÃO",
          description: hitObstacle
            ? `${collisionDamage} de Dano por Impacto (${squares} quadros)`
            : `${squares} quadros (${squares * 2} metros)`,
          total: hitObstacle ? collisionDamage : squares,
          scoreClass: "text-warning",
          scoreColor: "#f59e0b",
        },
        calculatedWounds: hitObstacle ? Math.max(1, Math.floor((collisionDamage - 4) / 4)) : 0,
        showApplyDamageBtn: hitObstacle,
      });
    }

    return { squares, collisionDamage, threshold: kb.threshold };
  }

  /**
   * [PT-BR] Verifica Interferência de Armadura (Pathfinder for Savage Worlds - SWPF): retorna -4 se o conjurador estiver usando armadura proibida.
   * [EN] Checks Armor Interference (Pathfinder for Savage Worlds - SWPF): returns -4 if caster wears restricted armor.
   * @param {Actor} actor
   * @returns {{ hasInterference: boolean, penalty: number, reason: string | null }}
   */
  static checkSwpfArmorInterference(actor) {
    if (!actor?.items) {
      return { hasInterference: false, penalty: 0, reason: null };
    }
    const hasInterferenceEdge = actor.items.some(
      (i) =>
        i.type === "edge" &&
        /wizard|mago|sorcerer|feiticeiro|armor interference|interferência de armadura/i.test(i.name)
    );
    const equippedArmorOrShield = actor.items.some(
      (i) =>
        (i.type === "armor" || i.type === "shield") &&
        (i.system?.equipStatus >= 2 || i.system?.equipped === true)
    );

    if (hasInterferenceEdge && equippedArmorOrShield) {
      return {
        hasInterference: true,
        penalty: -4,
        reason: "Interferência de Armadura (SWPF: -4 em Conjuração)",
      };
    }
    return { hasInterference: false, penalty: 0, reason: null };
  }

  /* ========================================================================
   * 2. COMPÊNDIO DE FANTASIA (MOCHILA, PAUSA / DOWNTIME, TESOUROS, TRAIÇÃO)
   * ======================================================================== */

  /**
   * [PT-BR] Calcula redução de peso da Mochila (equipStatus === -1 reduz 50% do peso) caso o módulo oficial de Fantasia não esteja ativo.
   * [EN] Calculates Backpack weight reduction (equipStatus === -1 reduces 50% weight) if official Fantasy module is inactive.
   * @param {Actor} actor
   */
  static applyFantasyBackpackEncumbrance(actor) {
    if (!actor || !["character", "npc"].includes(actor.type)) {
      return;
    }
    if (this.isOfficialModuleActive("swade-fantasy-companion")) {
      return;
    }
    if (!globalThis.game?.settings?.get(MODULE_ID, "enableFantasySupport")) {
      return;
    }

    // [PT-BR] Acesso direto a actor.flags para evitar erro de escopo do Foundry v14 quando swade-fantasy-companion não está ativo
    // [EN] Direct access to actor.flags to avoid Foundry v14 scope error when swade-fantasy-companion is inactive
    const savedMultiplier =
      actor.flags?.["swade-fantasy-companion"]?.backpackMultiplier ??
      actor.flags?.[MODULE_ID]?.backpackMultiplier ??
      actor.getFlag?.(MODULE_ID, "backpackMultiplier") ??
      0.5;
    const multiplier = 1 - savedMultiplier;
    const reduction = (actor.items || []).reduce((acc, item) => {
      if (!["armor", "weapon", "shield", "gear", "consumable"].includes(item.type)) {
        return acc;
      }
      if (item.system?.equipStatus !== -1) {
        return acc;
      }
      const weight = Number(item.system?.weight) || 0;
      const qty = Number(item.system?.quantity) || 1;
      return acc + weight * qty * multiplier;
    }, 0);

    const enc = actor.system?.details?.encumbrance;
    if (enc && reduction > 0) {
      const prevValue = enc.value;
      enc.value = Math.max(0, enc.value - reduction);
      if (
        enc.value <= enc.max &&
        prevValue > enc.max &&
        globalThis.game?.settings?.get("swade", "applyEncumbrance")
      ) {
        if (actor.system?.pace) {
          for (const key of Object.keys(actor.system.pace)) {
            if (typeof actor.system.pace[key] === "number") {
              actor.system.pace[key] += 2;
            }
          }
        }
      }
    }
  }

  /**
   * [PT-BR] Executa uma atividade de Pausa (Downtime - Compêndio de Fantasia p. 89):
   * 'carouse' (Festejar), 'earn' (Lucrar), 'rest' (Descansar), 'relax' (Relaxar), 'train' (Treinar), 'research' (Pesquisar).
   * [EN] Executes a Downtime activity (Fantasy Companion p. 89).
   * @param {Actor} actor
   * @param {string} [activity="carouse"]
   */
  static async executeDowntime(actor, activity = "carouse") {
    const targetActor =
      actor || globalThis.canvas?.tokens?.controlled?.[0]?.actor || globalThis.game?.user?.character;
    if (!targetActor) {
      globalThis.ui?.notifications?.warn?.("Selecione um personagem para realizar atividade de Pausa (Downtime).");
      return null;
    }

    const rankIndex = Math.max(
      0,
      (globalThis.CONFIG?.SWADE?.ranks || ["Novice", "Seasoned", "Veteran", "Heroic", "Legendary"]).indexOf(
        targetActor.system?.advances?.rank
      )
    );

    if (activity === "carouse") {
      const cost = 50 * Math.pow(2, rankIndex);
      const currency = Number(targetActor.system?.details?.currency) || 0;
      const success = currency >= cost;
      if (success) {
        await targetActor.update({ "system.details.currency": currency - cost });
      }
      return globalThis.SWAG?.api?.createShowcaseCard("lore", {
        title: `Pausa: Festejar (${targetActor.name})`,
        subtitle: `Custo de Estágio: $${cost} PO`,
        actorName: targetActor.name,
        actorImg: targetActor.img,
        topBadge: { text: "PAUSA", class: "bg-info text-dark fw-bold" },
        statusBadge: {
          text: success ? "Favor Obtido!" : "Ouro Insuficiente",
          class: success ? "bg-success" : "bg-danger",
          icon: success ? "fa-solid fa-beer-mug-empty" : "fa-solid fa-coins",
        },
        description: success
          ? `Após gastar <strong>$${cost} PO</strong> em tavernas e banquetes, <strong>${targetActor.name}</strong> conquista um <strong>Favor Local</strong> que pode acionar a qualquer momento na comunidade!`
          : `<strong>${targetActor.name}</strong> não possui moedas suficientes ($${cost} PO necessários) para Festejar.`,
      });
    }

    if (activity === "rest") {
      if (typeof targetActor.getBenny === "function") {
        await targetActor.getBenny();
      } else {
        const bennies = Number(targetActor.system?.bennies?.value) || 0;
        await targetActor.update({ "system.bennies.value": bennies + 1 });
      }
      return globalThis.SWAG?.api?.createShowcaseCard("lore", {
        title: `Pausa: Descansar (${targetActor.name})`,
        subtitle: "Recuperação Física & Cura Natural",
        actorName: targetActor.name,
        actorImg: targetActor.img,
        topBadge: { text: "PAUSA", class: "bg-success fw-bold" },
        statusBadge: { text: "+1 Bene!", class: "bg-warning text-dark", icon: "fa-solid fa-bed" },
        description: `<strong>${targetActor.name}</strong> repousa profundamente, recebendo direito a uma rolagem de <strong>Cura Natural</strong> com suporte de aliados e ganhando <strong>+1 Bene</strong> imediatamente.`,
      });
    }

    if (activity === "relax") {
      const currentConv = Number(targetActor.system?.details?.conviction?.value) || 0;
      await targetActor.update({ "system.details.conviction.value": currentConv + 1 });
      return globalThis.SWAG?.api?.createShowcaseCard("lore", {
        title: `Pausa: Relaxar (${targetActor.name})`,
        subtitle: "Paz Interior & Propósito",
        actorName: targetActor.name,
        actorImg: targetActor.img,
        topBadge: { text: "PAUSA", class: "bg-primary fw-bold" },
        statusBadge: { text: "+1 Convicção!", class: "bg-warning text-dark", icon: "fa-solid fa-sun" },
        description: `<strong>${targetActor.name}</strong> dedica a semana ao que lhe traz felicidade e paz interior, recebendo <strong>1 Ponto de Convicção</strong>!`,
      });
    }

    if (activity === "train") {
      await targetActor.setFlag?.(MODULE_ID, "trainedReroll", true);
      return globalThis.SWAG?.api?.createShowcaseCard("edge", {
        title: `Pausa: Treinar (${targetActor.name})`,
        subtitle: "Aperfeiçoamento Marcial ou Mental",
        actorName: targetActor.name,
        actorImg: targetActor.img,
        topBadge: { text: "TREINAMENTO", class: "bg-primary fw-bold" },
        statusBadge: { text: "Rerrolagem Gratuita", class: "bg-success", icon: "fa-solid fa-dumbbell" },
        description: `<strong>${targetActor.name}</strong> treinou intensamente e recebe <strong>1 Rerrolagem Gratuita</strong> quando falhar na Característica treinada durante um encontro inteiro!`,
      });
    }

    if (activity === "research") {
      return globalThis.SWAG?.api?.createShowcaseCard("arcane", {
        title: `Pausa: Pesquisar (${targetActor.name})`,
        subtitle: "Estudo Arcano & Investigação",
        actorName: targetActor.name,
        actorImg: targetActor.img,
        topBadge: { text: "PESQUISA", class: "bg-warning text-dark fw-bold" },
        statusBadge: { text: "Poder Preparado", class: "bg-info text-dark", icon: "fa-solid fa-book-journal-whills" },
        description: `<strong>${targetActor.name}</strong> pode usar temporariamente <strong>1 novo Poder de seu Estágio</strong> (com -2 na ativação) ou alterar a Manifestação de um poder conhecido por todo o próximo encontro, além de obter pistas cruciais do Mestre.`,
      });
    }

    // Default: 'earn' (Lucrar)
    const baseReward = 100 * (rankIndex + 1);
    const r = new Roll("{1d6x, 1d6x}kh");
    await r.evaluate();
    const isCritFail = r.dice.every((d) => d.total === 1);
    const isRaise = r.total >= 8;
    const isSuccess = r.total >= 4;

    let earned = 0;
    let desc = "";
    const currency = Number(targetActor.system?.details?.currency) || 0;

    if (isCritFail) {
      const fat = Number(targetActor.system?.fatigue?.value) || 0;
      await targetActor.update({ "system.fatigue.value": fat + 1 });
      desc = `<strong>Falha Crítica!</strong> ${targetActor.name} não ganha dinheiro e sofre <strong>+1 nível de Fadiga</strong> por Machucados e Escoriações.`;
    } else if (!isSuccess) {
      desc = `<strong>Falha (${r.total}):</strong> ${targetActor.name} não consegue lucrar nesta semana e passa por um contratempo embaraçoso.`;
    } else if (isRaise) {
      earned = baseReward * 2;
      await targetActor.update({ "system.details.currency": currency + earned });
      desc = `<strong>Sucesso com Ampliação (${r.total})!</strong> ${targetActor.name} realiza um trabalho exemplar e recebe <strong>$${earned} PO</strong>!`;
    } else {
      earned = baseReward;
      await targetActor.update({ "system.details.currency": currency + earned });
      desc = `<strong>Sucesso (${r.total}):</strong> ${targetActor.name} conclui o trabalho e recebe <strong>$${earned} PO</strong>.`;
    }

    return globalThis.SWAG?.api?.createShowcaseCard("lore", {
      title: `Pausa: Lucrar (${targetActor.name})`,
      subtitle: `Recompensa Base de Estágio: $${baseReward} PO`,
      actorName: targetActor.name,
      actorImg: targetActor.img,
      topBadge: { text: "LUCRAR", class: "bg-warning text-dark fw-bold" },
      statusBadge: {
        text: earned > 0 ? `+$${earned} PO` : "Sem Lucro",
        class: earned > 0 ? "bg-success" : "bg-danger",
        icon: "fa-solid fa-sack-dollar",
      },
      description: desc,
      resultBox: {
        title: "ROLAGEM DE TRABALHO",
        description: earned > 0 ? `Adicionado +$${earned} PO ao inventário` : "Nenhuma moeda recebida",
        total: r.total,
        scoreClass: earned > 0 ? "text-success" : "text-danger",
      },
    });
  }

  /**
   * [PT-BR] Abre seletor interativo de Pausa (Downtime) em DialogV2.
   * [EN] Opens interactive Downtime selector in DialogV2.
   * @param {Actor} [actor]
   */
  static async openDowntimeDialog(actor = null) {
    const targetActor =
      actor || globalThis.canvas?.tokens?.controlled?.[0]?.actor || globalThis.game?.user?.character;
    const DialogV2 = globalThis.foundry?.applications?.api?.DialogV2;
    if (!DialogV2) {
      return this.executeDowntime(targetActor, "carouse");
    }

    const choice = await DialogV2.wait({
      window: { title: "SWAG+ | Atividades de Pausa (Downtime)", icon: "fa-solid fa-campground" },
      content: `<p>Escolha a atividade de <strong>Pausa (Compêndio de Fantasia p. 89)</strong> para <strong>${targetActor?.name || "o personagem selecionado"}</strong>:</p>`,
      buttons: [
        { action: "carouse", label: "Festejar (Favor)", icon: "fa-solid fa-beer-mug-empty" },
        { action: "earn", label: "Lucrar (Ouro)", icon: "fa-solid fa-sack-dollar" },
        { action: "rest", label: "Descansar (+1 Bene)", icon: "fa-solid fa-bed" },
        { action: "relax", label: "Relaxar (+1 Convicção)", icon: "fa-solid fa-sun" },
        { action: "train", label: "Treinar (Rerrolagem)", icon: "fa-solid fa-dumbbell" },
        { action: "research", label: "Pesquisar (Magia/Lore)", icon: "fa-solid fa-book" },
      ],
      rejectClose: false,
    });

    if (choice) {
      return this.executeDowntime(targetActor, choice);
    }
    return null;
  }

  /**
   * [PT-BR] Gera Tesouro Aleatório (Compêndio de Fantasia p. 170): 'meager', 'substantial', 'rich', 'trove'.
   * [EN] Generates Random Loot (Fantasy Companion p. 170).
   * @param {string} [tier="substantial"]
   */
  static async generateFantasyLoot(tier = "substantial") {
    const tiers = {
      meager: { label: "Tesouro Escasso (Meager)", goldFormula: "1d10 * 100", itemsFormula: "max(1d6 - 4, 0)" },
      substantial: { label: "Tesouro Substancial", goldFormula: "1d10 * 1000", itemsFormula: "max(1d6 - 3, 0)" },
      rich: { label: "Tesouro Rico (Rich)", goldFormula: "1d10 * 5000", itemsFormula: "max(1d6 - 2, 0)" },
      trove: { label: "Tesouro Real / Covil (Trove)", goldFormula: "1d10 * 10000", itemsFormula: "max(1d6 - 1, 0)" },
    };

    const config = tiers[tier] || tiers.substantial;
    const goldRoll = new Roll(config.goldFormula);
    const itemsRoll = new Roll(config.itemsFormula);
    await goldRoll.evaluate();
    await itemsRoll.evaluate();

    const foundItems = [];
    for (let i = 0; i < itemsRoll.total; i++) {
      const idx = Math.floor(Math.random() * BUILTIN_FANTASY_LOOT_ITEMS.length);
      foundItems.push({
        name: `Relíquia #${i + 1}`,
        desc: BUILTIN_FANTASY_LOOT_ITEMS[idx],
        colorClass: "text-warning",
      });
    }

    if (globalThis.SWAG?.api?.createShowcaseCard) {
      await globalThis.SWAG.api.createShowcaseCard("lore", {
        title: config.label,
        subtitle: "Gerador de Tesouros (Compêndio de Fantasia)",
        iconClass: "fa-solid fa-gem text-warning",
        iconBgClass: "bg-dark",
        topBadge: { text: "TESOURO", class: "bg-warning text-dark fw-bold" },
        statusBadge: {
          text: `${goldRoll.total} PO`,
          class: "bg-success",
          icon: "fa-solid fa-coins",
        },
        description: `Moedas encontradas: <strong>${goldRoll.total} PO</strong> (${config.goldFormula}) • Itens Mágicos: <strong>${itemsRoll.total}</strong>.`,
        traitList: foundItems.length
          ? foundItems
          : [{ name: "Apenas Moedas", desc: "Nenhum item mágico neste tesouro.", colorClass: "text-secondary" }],
      });
    }

    return { gold: goldRoll.total, itemsCount: itemsRoll.total, items: foundItems };
  }

  /* ========================================================================
   * 3. COMPÊNDIO DE FICÇÃO CIENTÍFICA (EMBATE / CLASH, STRAIN, RESSONÂNCIA, SPRAWL)
   * ======================================================================== */

  /**
   * [PT-BR] Garante que os campos adicionais 'strain' (Tensão Cibernética), 'clashTokens' (Embate) e 'sanity' (Sanidade) existam em settingFields do SWADE mesmo sem os módulos oficiais.
   * [EN] Ensures 'strain', 'clashTokens', and 'sanity' additional stats exist in SWADE settingFields even without official modules.
   */
  static async ensureCompanionAdditionalStats() {
    if (!globalThis.game?.user?.isGM || !globalThis.game?.settings) {
      return;
    }
    try {
      const currentFields = globalThis.game.settings.get("swade", "settingFields");
      if (!currentFields) {
        return;
      }
      const cloned = foundry.utils.deepClone(currentFields);
      cloned.actor ??= {};

      let changed = false;
      if (globalThis.game.settings.get(MODULE_ID, "enableSciFiSupport")) {
        if (!cloned.actor.clashTokens) {
          cloned.actor.clashTokens = { label: "Clash Tokens (Embate)", dtype: "Number", hasMaxValue: false, default: 0 };
          changed = true;
        }
        if (!cloned.actor.strain) {
          cloned.actor.strain = { label: "Tensão (Strain)", dtype: "Number", hasMaxValue: true, default: 0 };
          changed = true;
        }
      }

      if (globalThis.game.settings.get(MODULE_ID, "enableHorrorSupport")) {
        if (!cloned.actor.sanity) {
          cloned.actor.sanity = { label: "Sanidade", dtype: "Number", hasMaxValue: true, default: 5 };
          changed = true;
        }
        if (!cloned.actor.viceMarks) {
          cloned.actor.viceMarks = { label: "Marcas de Vício", dtype: "Number", hasMaxValue: true, default: 0 };
          changed = true;
        }
      }

      if (changed) {
        await globalThis.game.settings.set("swade", "settingFields", cloned);
      }
    } catch (err) {
      console.warn("SWAG+ | Não foi possível atualizar settingFields do SWADE:", err);
    }
  }

  /**
   * [PT-BR] Gasta Marcadores de Embate (Clash Tokens - Sci-Fi Companion) ou abre diálogo se a ação não for informada.
   * [EN] Spends Clash Tokens (Sci-Fi Companion) or opens dialog if action is not provided.
   * @param {Actor} [actor]
   * @param {string} [actionKey] - 'damage', 'evade', 'replenish', 'escape', 'intercept', 'objective'
   */
  static async spendClashToken(actor = null, actionKey = null) {
    const targetActor =
      actor || globalThis.canvas?.tokens?.controlled?.[0]?.actor || globalThis.game?.user?.character;
    if (!targetActor) {
      globalThis.ui?.notifications?.warn?.("Selecione um piloto ou veículo para gastar Marcadores de Embate (Clash Tokens).");
      return null;
    }

    let chosenKey = actionKey;
    const DialogV2 = globalThis.foundry?.applications?.api?.DialogV2;
    if (!chosenKey && DialogV2) {
      chosenKey = await DialogV2.wait({
        window: { title: "SWAG+ | Marcadores de Embate (Clash Tokens)", icon: "fa-solid fa-jet-fighter" },
        content: `<p>Escolha a manobra de <strong>Embate (Compêndio de Ficção Científica)</strong> para <strong>${targetActor.name}</strong>:</p>`,
        buttons: Object.values(CLASH_ACTIONS).map((a) => ({
          action: a.key,
          label: `${a.label} (-${a.spend})`,
          icon: a.icon,
        })),
        rejectClose: false,
      });
    }

    const action = CLASH_ACTIONS[chosenKey] || CLASH_ACTIONS.damage;
    const currentTokens =
      Number(targetActor.system?.additionalStats?.clashTokens?.value) ||
      Number(targetActor.getFlag?.(MODULE_ID, "clashTokens")) ||
      0;

    if (currentTokens >= action.spend && targetActor.system?.additionalStats?.clashTokens) {
      await targetActor.update({
        "system.additionalStats.clashTokens.value": currentTokens - action.spend,
      });
    }

    if (globalThis.SWAG?.api?.createShowcaseCard) {
      await globalThis.SWAG.api.createShowcaseCard("item", {
        title: action.flavor,
        subtitle: `Piloto/Operador: ${targetActor.name} (-${action.spend} Clash Token)`,
        actorName: targetActor.name,
        actorImg: targetActor.img,
        iconClass: `${action.icon} text-info`,
        iconBgClass: "bg-dark",
        topBadge: { text: "EMBATE SCI-FI", class: "bg-info text-dark fw-bold" },
        statusBadge: { text: `-${action.spend} Token(s)`, class: "bg-primary", icon: action.icon },
        description: action.message,
      });
    }

    return action;
  }

  /**
   * [PT-BR] Saca Carta de Ressonância Harmônica (drawMysticCard - Sci-Fi Companion): Ouros dá +2 Foco, Paus custa +1 PP.
   * [EN] Draws Harmonic Resonance Card (Sci-Fi Companion): Diamonds gives +2 Focus, Clubs costs +1 PP.
   * @param {Actor} [actor]
   */
  static async drawHarmonicResonance(actor = null) {
    const targetActor =
      actor || globalThis.canvas?.tokens?.controlled?.[0]?.actor || globalThis.game?.user?.character;
    const suits = [
      { suit: "spades", name: "Espadas", effect: "Ressonância neutra: conjuração padrão.", badgeClass: "bg-secondary" },
      { suit: "hearts", name: "Copas", effect: "Ressonância neutra: conjuração padrão.", badgeClass: "bg-secondary" },
      {
        suit: "diamonds",
        name: "Ouros (Harmonia Cósmica)",
        effect: "<strong>Em ressonância com o universo!</strong> Adicione <strong>+2 na rolagem de Foco</strong>!",
        badgeClass: "bg-success",
      },
      {
        suit: "clubs",
        name: "Paus (Dissonância)",
        effect: "<strong>Em dissonância com o universo!</strong> O poder custa <strong>+1 Ponto de Poder adicional</strong>!",
        badgeClass: "bg-danger",
      },
    ];
    const picked = suits[Math.floor(Math.random() * suits.length)];

    if (globalThis.SWAG?.api?.createShowcaseCard) {
      await globalThis.SWAG.api.createShowcaseCard("arcane", {
        title: `Ressonância Harmônica: ${picked.name}`,
        subtitle: targetActor ? `Místico: ${targetActor.name}` : "Compêndio de Ficção Científica",
        actorName: targetActor?.name || "Místico",
        actorImg: targetActor?.img,
        topBadge: { text: "RESSONÂNCIA", class: "bg-info text-dark fw-bold" },
        statusBadge: { text: picked.name, class: picked.badgeClass, icon: "fa-solid fa-atom" },
        description: picked.effect,
      });
    }
    return picked;
  }

  /**
   * [PT-BR] Aplica configuração rápida de Sprawlrunners (Pontos de Logística = 10) sem precisar do módulo sprawl-core-rules-ptbr.
   * [EN] Applies Sprawlrunners quick setup (Logistic Points = 10) without requiring sprawl-core-rules-ptbr module.
   */
  static async applySprawlrunnersLogistics() {
    if (!globalThis.game?.user?.isGM) {
      return;
    }
    await globalThis.game.settings.set("swade", "currencyName", "Pontos de Logística");
    await globalThis.game.settings.set("swade", "pcStartingCurrency", 10);
    globalThis.ui?.notifications?.info?.("SWAG+ | Regra Sprawlrunners ativada: Moeda alterada para 'Pontos de Logística' (Inicial: 10).");
  }

  /* ========================================================================
   * 4. COMPÊNDIO DE HORROR (TABELA DE MEDO, SANIDADE, PSICOSE, MASSACRE, A VISÃO)
   * ======================================================================== */

  /**
   * [PT-BR] Resolve matematicamente o resultado da Tabela de Medo (1d20 + modificador) segundo o Compêndio de Horror (p. 21).
   * [EN] Mathematically resolves Fear Table result (1d20 + modifier) per Horror Companion (p. 21).
   * @param {number} total - Total de 1d20 + penalidade de medo.
   * @returns {{
   *   total: number,
   *   title: string,
   *   effectKey: string,
   *   statusToApply: string | null,
   *   psychosisSeverity: "minor" | "major" | null,
   *   triggerTotalSnap: boolean,
   *   grantJoker: boolean,
   *   description: string
   * }}
   */
  static resolveFearTableEntry(total) {
    const n = Number(total) || 1;
    if (n < 4) {
      return {
        total: n,
        title: "Adrenalina (1–3)",
        effectKey: "adrenaline",
        statusToApply: null,
        psychosisSeverity: null,
        triggerTotalSnap: false,
        grantJoker: true,
        description: "O herói age como se tivesse sacado um <strong>Coringa</strong> no seu próximo turno!",
      };
    }
    if (n < 7) {
      return {
        total: n,
        title: "Distraído (4–6)",
        effectKey: "distracted",
        statusToApply: "distracted",
        psychosisSeverity: null,
        triggerTotalSnap: false,
        grantJoker: false,
        description: "A vítima fica <strong>Distraída</strong> até o final do seu próximo turno.",
      };
    }
    if (n < 10) {
      return {
        total: n,
        title: "Vulnerável (7–9)",
        effectKey: "vulnerable",
        statusToApply: "vulnerable",
        psychosisSeverity: null,
        triggerTotalSnap: false,
        grantJoker: false,
        description: "A vítima fica <strong>Vulnerável</strong> até o final do seu próximo turno.",
      };
    }
    if (n < 13) {
      return {
        total: n,
        title: "Abalado (10–12)",
        effectKey: "shaken",
        statusToApply: "shaken",
        psychosisSeverity: null,
        triggerTotalSnap: false,
        grantJoker: false,
        description: "A vítima fica <strong>Abalada (Shaken)</strong> pelo terror.",
      };
    }
    if (n === 13) {
      return {
        total: n,
        title: "A Marca do Medo / Atordoado (13)",
        effectKey: "stunned",
        statusToApply: "stunned",
        psychosisSeverity: null,
        triggerTotalSnap: false,
        grantJoker: false,
        description: "A vítima fica <strong>Atordoada (Stunned)</strong> e sofre uma alteração cosmética de pavor (mecha branca, tique nervoso).",
      };
    }
    if (n < 16) {
      return {
        total: n,
        title: "Amedrontado (14–15)",
        effectKey: "frightened",
        statusToApply: "frightened",
        psychosisSeverity: null,
        triggerTotalSnap: false,
        grantJoker: false,
        description: "A vítima fica <strong>Amedrontada (Hesitante)</strong> pelo resto do encontro.",
      };
    }
    if (n < 18) {
      return {
        total: n,
        title: "Em Pânico! (16–17)",
        effectKey: "panicked",
        statusToApply: "shaken",
        psychosisSeverity: null,
        triggerTotalSnap: false,
        grantJoker: false,
        description: "A vítima foge imediatamente com Movimentação total + Dado de Corrida e fica <strong>Abalada</strong>.",
      };
    }
    if (n < 20) {
      return {
        total: n,
        title: "Psicose Menor (18–19)",
        effectKey: "minor_psychosis",
        statusToApply: "shaken",
        psychosisSeverity: "minor",
        triggerTotalSnap: false,
        grantJoker: false,
        description: "A mente da vítima trinca: adquire uma <strong>Psicose Menor</strong> permanente.",
      };
    }
    if (n < 22) {
      return {
        total: n,
        title: "Psicose Maior (20–21)",
        effectKey: "major_psychosis",
        statusToApply: "shaken",
        psychosisSeverity: "major",
        triggerTotalSnap: false,
        grantJoker: false,
        description: "Trauma profundo: a vítima adquire uma <strong>Psicose Maior</strong> permanente.",
      };
    }
    return {
      total: n,
      title: "Colapso Total / Ataque Cardíaco (22+)",
      effectKey: "total_snap",
      statusToApply: "stunned",
      psychosisSeverity: "major",
      triggerTotalSnap: true,
      grantJoker: false,
      description:
        "<strong>Colapso Total (Total Snap)!</strong> A vítima sofre um <strong>Ataque Cardíaco</strong> (rolar Vigor -2 ou fica Incapacitada e morre em 2d6 rodadas) ou um <strong>Surto Psicótico</strong>!",
    };
  }

  /**
   * [PT-BR] Rola na Tabela de Medo (1d20 + penalidade), aplica condições no ator, reduz Sanidade (se ativa) e gera Card Bootstrap no Chat.
   * [EN] Rolls on the Fear Table (1d20 + penalty), applies conditions to actor, reduces Sanity, and posts a Bootstrap Card in Chat.
   * @param {object} [params={}]
   * @param {Actor} [params.actor=null]
   * @param {number} [params.penalty=0] - Penalidade de Medo da criatura (somada à rolagem de 1d20 na Tabela de Medo).
   * @param {number} [params.sanityLoss=1] - Pontos de Sanidade perdidos pela falha no Medo.
   */
  static async rollFearTable({ actor = null, penalty = 0, sanityLoss = 1 } = {}) {
    const targetActor =
      actor || globalThis.canvas?.tokens?.controlled?.[0]?.actor || globalThis.game?.user?.character;
    const mod = Math.abs(Number(penalty) || 0);
    const roll = new Roll(`1d20 + ${mod}`);
    await roll.evaluate();

    const entry = this.resolveFearTableEntry(roll.total);
    let psychosisAdded = null;

    if (targetActor) {
      // Aplicar Status Effect
      if (entry.statusToApply && typeof targetActor.toggleStatusEffect === "function") {
        await targetActor.toggleStatusEffect(entry.statusToApply, { active: true });
      }
      // Se tirou <4 (Adrenalina), dá Coringa no combate ativo
      if (entry.grantJoker && globalThis.game?.combats?.active) {
        const combatant = globalThis.game.combats.active.getCombatantByActor?.(targetActor.id);
        await combatant?.setJoker?.(true);
      }
      // Reduzir Sanidade se o ator tiver o campo adicional sanity
      if (sanityLoss > 0 && targetActor.system?.additionalStats?.sanity) {
        const curSanity = Number(targetActor.system.additionalStats.sanity.value ?? 5);
        const newSanity = Math.max(0, curSanity - sanityLoss);
        await targetActor.update({ "system.additionalStats.sanity.value": newSanity });
      }
      // Adicionar Psicose se aplicável
      if (entry.psychosisSeverity) {
        const list = BUILTIN_PSYCHOSIS_TABLES[entry.psychosisSeverity];
        psychosisAdded = list[Math.floor(Math.random() * list.length)];
        if (typeof targetActor.createEmbeddedDocuments === "function") {
          await targetActor.createEmbeddedDocuments("Item", [
            {
              name: psychosisAdded.name,
              type: "hindrance",
              img: "icons/svg/terror.svg",
              system: {
                description: `<p>${psychosisAdded.desc}</p>`,
                major: entry.psychosisSeverity === "major",
              },
              flags: {
                "swade-horror-companion": { psychosis: true },
                [MODULE_ID]: { psychosis: true, severity: entry.psychosisSeverity },
              },
            },
          ]);
        }
      }
    }

    if (globalThis.SWAG?.api?.createShowcaseCard) {
      await globalThis.SWAG.api.createShowcaseCard("hindrance", {
        title: `Tabela de Medo: ${entry.title}`,
        subtitle: `${targetActor?.name || "Vítima"} • Rolagem 1d20+${mod}`,
        actorName: targetActor?.name || "Investigador",
        actorImg: targetActor?.img,
        iconClass: "fa-solid fa-ghost text-danger",
        iconBgClass: "bg-danger bg-opacity-25",
        topBadge: { text: "TABELA DE MEDO", class: "bg-danger fw-bold" },
        statusBadge: {
          text: `Resultado ${roll.total}`,
          class: "bg-warning text-dark fw-bold",
          icon: "fa-solid fa-skull-crossbones",
        },
        description: `${entry.description}${
          psychosisAdded
            ? `<br><strong class="text-danger">Psicose Adquirida:</strong> ${psychosisAdded.name} — <em>${psychosisAdded.desc}</em>`
            : ""
        }`,
        resultBox: {
          title: "RESULTADO NA TABELA DE MEDO",
          description: entry.title,
          total: roll.total,
          scoreClass: "text-danger",
          scoreColor: "#ef4444",
        },
      });
    }

    return { entry, psychosisAdded, total: roll.total };
  }

  /**
   * [PT-BR] Aplica a Regra de Ambientação 'Massacre' (Slaughter Rules - Horror Companion): novos personagens têm 1 Ferimento máximo.
   * [EN] Applies 'Slaughter Rules' Setting Rule (Horror Companion): newly created characters have 1 max Wound.
   * @param {Actor} actorDoc
   */
  static onPreCreateActorSlaughterRules(actorDoc) {
    if (!actorDoc || actorDoc.type !== "character") {
      return;
    }
    if (this.isOfficialModuleActive("swade-horror-companion")) {
      return;
    }
    if (!globalThis.game?.settings?.get(MODULE_ID, "ruleSlaughter")) {
      return;
    }
    actorDoc.updateSource?.({ "system.wounds.max": 1 });
  }

  /* ========================================================================
   * 5. REGRAS DE LIVROS NÃO AUTOMATIZADAS NOS MÓDULOS OFICIAIS (PROEZAS, CHAMAS DA GLÓRIA, VÍCIOS, A VISÃO, OPONENTES GIGANTES, HEAVY METAL)
   * ======================================================================== */

  /**
   * [PT-BR] Executa uma Proeza de Poder (Power Stunt - Super Powers Companion p. 35) gastando 1 Bene.
   * Opções: 'allOutAttack' (Ataque Total: d10 no dano extra), 'interrupt' (Interromper turno), 'overawe' (Deslumbrar/Amedrontar em Área), 'push' (Ir Além: +5 PSP), 'respec' (Reconfigurar poder), 'aimedKnockback' (Projeção Direcionada).
   * [EN] Executes a Power Stunt (Super Powers Companion p. 35) spending 1 Benny.
   * @param {Actor} [actor]
   * @param {string} [stuntKey]
   */
  static async executePowerStunt(actor = null, stuntKey = null) {
    const targetActor =
      actor || globalThis.canvas?.tokens?.controlled?.[0]?.actor || globalThis.game?.user?.character;
    if (!targetActor) {
      globalThis.ui?.notifications?.warn?.("Selecione um super-herói para executar uma Proeza de Poder (Power Stunt).");
      return null;
    }

    const stunts = {
      allOutAttack: {
        key: "allOutAttack",
        label: "Ataque Total (Dano Extra d10)",
        icon: "fa-solid fa-explosion",
        desc: "O herói canaliza força máxima no golpe! O dado de dano bônus por Ampliação aumenta de <strong>+1d6 para +1d10</strong> neste ataque.",
      },
      push: {
        key: "push",
        label: "Ir Além / Forçar Limite (+5 PSP)",
        icon: "fa-solid fa-bolt-lightning",
        desc: "O herói força seus limites e recebe <strong>+5 Pontos de Superpoder (PSP)</strong> temporários para adicionar Modificadores ou ampliar níveis de um poder existente nesta ação!",
      },
      interrupt: {
        key: "interrupt",
        label: "Interromper Ação",
        icon: "fa-solid fa-hand",
        desc: "Caso esteja em Espera (On Hold), o herói interrompe automaticamente qualquer ação inimiga sem precisar vencer rolagem resistida de Atletismo!",
      },
      overawe: {
        key: "overawe",
        label: "Deslumbrar / Amedrontar (MGA)",
        icon: "fa-solid fa-sun",
        desc: "Exibição espetacular de poder! Realiza um Teste de Provocar ou Intimidação em um <strong>Modelo Grande de Explosão (LBT)</strong> contra todos os oponentes na área.",
      },
      respec: {
        key: "respec",
        label: "Reconfigurar / Poder Alternativo",
        icon: "fa-solid fa-arrows-rotate",
        desc: "Reconfigura temporariamente os pontos de um Super Poder em outro poder tematicamente compatível por 1 ação (ou pelo resto da cena se sofrer 1 nível de Fadiga).",
      },
      aimedKnockback: {
        key: "aimedKnockback",
        label: "Projeção Direcionada",
        icon: "fa-solid fa-bullseye",
        desc: "O herói escolhe exatamente a direção e o obstáculo contra o qual o inimigo será arremessado na Projeção (Knockback)!",
      },
    };

    let chosenKey = stuntKey;
    const DialogV2 = globalThis.foundry?.applications?.api?.DialogV2;
    if (!chosenKey && DialogV2) {
      chosenKey = await DialogV2.wait({
        window: { title: "SWAG+ | Proezas de Poder (Power Stunts - 1 Bene)", icon: "fa-solid fa-mask" },
        content: `<p>Escolha a <strong>Proeza de Poder (Compêndio de Superpoderes p. 35)</strong> para <strong>${targetActor.name}</strong> (Custo: 1 Bene):</p>`,
        buttons: Object.values(stunts).map((s) => ({
          action: s.key,
          label: s.label,
          icon: s.icon,
        })),
        rejectClose: false,
      });
    }

    const stunt = stunts[chosenKey] || stunts.allOutAttack;
    const currentBennies = Number(targetActor.system?.bennies?.value ?? 0);
    if (currentBennies <= 0) {
      globalThis.ui?.notifications?.warn?.(`${targetActor.name} não possui Benes suficientes para realizar uma Proeza de Poder!`);
      return null;
    }

    if (typeof targetActor.spendBenny === "function") {
      await targetActor.spendBenny();
    } else {
      await targetActor.update({ "system.bennies.value": currentBennies - 1 });
    }

    if (globalThis.SWAG?.api?.createShowcaseCard) {
      await globalThis.SWAG.api.createShowcaseCard("arcane", {
        title: `Proeza de Poder: ${stunt.label}`,
        subtitle: `${targetActor.name} (-1 Bene • Super Powers Companion)`,
        actorName: targetActor.name,
        actorImg: targetActor.img,
        iconClass: `${stunt.icon} text-warning`,
        iconBgClass: "bg-dark",
        topBadge: { text: "PROEZA DE PODER", class: "bg-warning text-dark fw-bold" },
        statusBadge: { text: "-1 Bene", class: "bg-primary", icon: stunt.icon },
        description: stunt.desc,
      });
    }

    return stunt;
  }

  /**
   * [PT-BR] Rola a Tabela de Morte e Derrota / Chamas da Glória (Death & Defeat / Blaze of Glory - Super Powers Companion p. 35).
   * Em caso de Falha Crítica na rolagem de Vigor ao cair Incapacitado, o herói NÃO morre: ele entra em Chamas da Glória (+1 Convicção)!
   * [EN] Rolls Death & Defeat / Blaze of Glory (Super Powers Companion p. 35).
   * @param {Actor} [actor]
   */
  static async rollSuperheroIncapacitation(actor = null) {
    const targetActor =
      actor || globalThis.canvas?.tokens?.controlled?.[0]?.actor || globalThis.game?.user?.character;
    if (!targetActor) {
      return null;
    }

    const vigSides = targetActor.system?.attributes?.vigor?.die?.sides || 6;
    const vigMod = targetActor.system?.attributes?.vigor?.die?.modifier || 0;
    const r = new Roll(`{1d${vigSides}x, 1d6x}kh + ${vigMod}`);
    await r.evaluate();

    const isCritFail = r.dice.every((d) => d.total === 1);
    const isRaise = r.total >= 8;
    const isSuccess = r.total >= 4;

    let outcomeTitle = "";
    let outcomeDesc = "";
    let badgeClass = "bg-info text-dark";

    if (isCritFail) {
      outcomeTitle = "Chamas da Glória (Blaze of Glory)!";
      badgeClass = "bg-warning text-dark fw-bold";
      const curConv = Number(targetActor.system?.details?.conviction?.value) || 0;
      await targetActor.update({ "system.details.conviction.value": curConv + 1 });
      outcomeDesc = `<strong>Falha Crítica Heroica!</strong> Em vez de morrer ingloriamente, <strong>${targetActor.name}</strong> recebe imediatamente <strong>+1 Ponto de Convicção</strong> e permanece consciente para um último ato supremo de sacrifício ou cai em coma épico até ser resgatado!`;
    } else if (!isSuccess) {
      outcomeTitle = "Derrotado (Fora de Combate)";
      badgeClass = "bg-danger";
      outcomeDesc = `<strong>Falha (${r.total}):</strong> ${targetActor.name} cai inconsciente, sofre uma Lesão temporária e fica fora do restante do encontro (ou é capturado pelo vilão).`;
    } else if (isRaise) {
      outcomeTitle = "Atordoado, Mas Na Luta!";
      badgeClass = "bg-success";
      outcomeDesc = `<strong>Ampliação (${r.total})!</strong> ${targetActor.name} resiste ao golpe brutal! Permanece com 3 Ferimentos, mas um aliado pode reanimá-lo com um teste de Cura com -2 ou poder de cura.`;
    } else {
      outcomeTitle = "Ferido & Nocauteado Temporariamente";
      badgeClass = "bg-primary";
      outcomeDesc = `<strong>Sucesso (${r.total}):</strong> ${targetActor.name} sofre uma Lesão temporária que desaparece assim que recuperar 1 Ferimento.`;
    }

    if (globalThis.SWAG?.api?.createShowcaseCard) {
      await globalThis.SWAG.api.createShowcaseCard("edge", {
        title: `Morte e Derrota: ${outcomeTitle}`,
        subtitle: `${targetActor.name} • Rolagem de Vigor (${r.total})`,
        actorName: targetActor.name,
        actorImg: targetActor.img,
        topBadge: { text: "MORTE E DERROTA", class: "bg-danger fw-bold" },
        statusBadge: { text: outcomeTitle, class: badgeClass, icon: "fa-solid fa-fire-flame-curved" },
        description: outcomeDesc,
        resultBox: {
          title: "TESTE DE VIGOR (SUPERPOWERS)",
          description: outcomeTitle,
          total: r.total,
          scoreClass: isCritFail ? "text-warning" : isSuccess ? "text-success" : "text-danger",
        },
      });
    }

    return { total: r.total, isCritFail, isSuccess, isRaise, outcomeTitle };
  }

  /**
   * [PT-BR] Concede 1 Bene por ceder ao Vício (Horror Companion) e adiciona +1 Marca de Vício (máx 3 por sessão; cada marca soma +2 no próximo dano sofrido).
   * [EN] Grants 1 Benny for indulging in a Vice (Horror Companion) and adds +1 Vice Mark (max 3/session; each mark adds +2 to next damage taken).
   * @param {Actor} [actor]
   */
  static async grantViceBenny(actor = null) {
    const targetActor =
      actor || globalThis.canvas?.tokens?.controlled?.[0]?.actor || globalThis.game?.user?.character;
    if (!targetActor) {
      globalThis.ui?.notifications?.warn?.("Selecione um personagem para aplicar a regra de Vícios (Horror).");
      return null;
    }

    const curMarks =
      Number(targetActor.system?.additionalStats?.viceMarks?.value) ||
      Number(targetActor.getFlag?.(MODULE_ID, "viceMarks")) ||
      0;

    if (curMarks >= 3) {
      globalThis.ui?.notifications?.warn?.(`${targetActor.name} já atingiu o limite máximo de 3 Marcas de Vício nesta sessão!`);
      return null;
    }

    const newMarks = curMarks + 1;
    if (typeof targetActor.getBenny === "function") {
      await targetActor.getBenny();
    } else {
      const b = Number(targetActor.system?.bennies?.value) || 0;
      await targetActor.update({ "system.bennies.value": b + 1 });
    }

    if (targetActor.system?.additionalStats?.viceMarks) {
      await targetActor.update({ "system.additionalStats.viceMarks.value": newMarks });
    }
    await targetActor.setFlag?.(MODULE_ID, "viceMarks", newMarks);

    if (globalThis.SWAG?.api?.createShowcaseCard) {
      await globalThis.SWAG.api.createShowcaseCard("hindrance", {
        title: `Vício Satisfeito (${targetActor.name})`,
        subtitle: `Compêndio de Horror • Marcas de Vício: ${newMarks}/3`,
        actorName: targetActor.name,
        actorImg: targetActor.img,
        topBadge: { text: "VÍCIO", class: "bg-danger fw-bold" },
        statusBadge: {
          text: `+1 Bene (${newMarks}ª Marca)`,
          class: "bg-warning text-dark fw-bold",
          icon: "fa-solid fa-wine-bottle",
        },
        description: `<strong>${targetActor.name}</strong> cedeu ao seu Vício para acalmar os nervos e recebeu <strong>+1 Bene</strong>. Em troca, acumula <strong>${newMarks} Marca(s) de Vício</strong> (+${newMarks * 2} de dano extra no próximo golpe sofrido)!`,
      });
    }

    return { newMarks, bonusDamagePenalty: newMarks * 2 };
  }

  /**
   * [PT-BR] Ativa 'A Visão' (Cartomante - Horror Companion): gasta 1 Bene para redistribuir Cartas de Ação entre aliados no combate ativo.
   * [EN] Activates 'The Sight' (Fortune Teller - Horror Companion): spends 1 Benny to redistribute Action Cards among allies in active combat.
   * @param {Actor} [actor]
   */
  static async activateTheSight(actor = null) {
    const targetActor =
      actor || globalThis.canvas?.tokens?.controlled?.[0]?.actor || globalThis.game?.user?.character;
    const combat = globalThis.game?.combats?.active;
    if (!combat) {
      globalThis.ui?.notifications?.warn?.("A Visão requer um Combate ativo com Cartas de Ação distribuídas.");
      return null;
    }

    if (targetActor) {
      if (typeof targetActor.spendBenny === "function") {
        await targetActor.spendBenny();
      } else {
        const b = Number(targetActor.system?.bennies?.value) || 0;
        if (b > 0) {
          await targetActor.update({ "system.bennies.value": b - 1 });
        }
      }
    }

    // Ordena as iniciativas dos combatentes aliados de forma otimizada
    const friendly = combat.combatants?.filter((c) => c.token?.disposition === 1) || [];
    if (friendly.length >= 2) {
      const inits = friendly.map((c) => c.initiative).sort((a, b) => (b || 0) - (a || 0));
      for (let i = 0; i < friendly.length; i++) {
        await friendly[i].update?.({ initiative: inits[i] });
      }
    }

    if (globalThis.SWAG?.api?.createShowcaseCard) {
      await globalThis.SWAG.api.createShowcaseCard("arcane", {
        title: "A Visão (Cartomante)",
        subtitle: targetActor ? `${targetActor.name} (-1 Bene)` : "Compêndio de Horror",
        actorName: targetActor?.name || "Cartomante",
        actorImg: targetActor?.img,
        topBadge: { text: "CARTOMANTE", class: "bg-info text-dark fw-bold" },
        statusBadge: { text: "Iniciativa Reordenada", class: "bg-success", icon: "fa-solid fa-eye" },
        description: `Através de um presságio místico, <strong>${targetActor?.name || "o Cartomante"}</strong> gasta <strong>1 Bene</strong> e redistribui as Cartas de Ação entre os aliados na rodada!`,
      });
    }

    return { redistributedCount: friendly.length };
  }

  /**
   * [PT-BR] Injeção autônoma de Badges de Classe Heavy Metal (Classe I a VII) nas fichas de Armas e Veículos quando 'ruleHeavyMetal' está ativo.
   * [EN] Standalone injection of Heavy Metal Class Badges (Class I to VII) on Weapon and Vehicle sheets when 'ruleHeavyMetal' is active.
   * @param {Application} app
   * @param {HTMLElement} html
   */
  static injectHeavyMetalBadges(app, html) {
    if (this.isOfficialModuleActive("swade-scifi-companion")) {
      return;
    }
    if (!globalThis.game?.settings?.get(MODULE_ID, "ruleHeavyMetal")) {
      return;
    }
    const rootEl = html instanceof HTMLElement ? html : html?.[0];
    if (!rootEl || !app?.document) {
      return;
    }

    const doc = app.document;
    if (doc.documentName === "Item" && doc.type === "weapon") {
      const isHW = Boolean(doc.system?.isHeavyWeapon || doc.system?.heavyWeapon);
      const ap = Number(doc.system?.ap) || 0;
      const hm = DamageCalculator.calculateWeaponHeavyMetalClass({
        averageDamage: isHW ? 18 : 8,
        ap,
        isHeavyWeapon: isHW,
      });
      if (hm.classNum > 0 && !rootEl.querySelector(".swag-hm-badge")) {
        const header = rootEl.querySelector(".window-title, header.sheet-header h1, input[name='name']");
        header?.insertAdjacentHTML?.(
          "afterend",
          `<span class="swag-hm-badge badge bg-warning text-dark ms-2">Heavy Metal: Classe ${hm.roman}</span>`
        );
      }
    } else if (doc.documentName === "Actor" && doc.type === "vehicle") {
      const tough = Number(doc.system?.stats?.toughness?.value) || 10;
      const hm = DamageCalculator.calculateVehicleHeavyMetalClass(tough);
      if (hm.classNum > 0 && !rootEl.querySelector(".swag-hm-badge")) {
        const header = rootEl.querySelector(".window-title, header.sheet-header h1, input[name='name']");
        header?.insertAdjacentHTML?.(
          "afterend",
          `<span class="swag-hm-badge badge bg-info text-dark ms-2">Heavy Metal: Classe ${hm.roman}</span>`
        );
      }
    }
  }
}
