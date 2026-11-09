/**
 * @fileoverview Gerenciador de Combate e Alvos em Tempo Real para SWADE
 * [PT-BR] Aplica danos, ferimentos, projeção (knockback), Heavy Metal, Traição, Vícios e status diretamente aos tokens e atores alvejados no canvas, emitindo cards no formato Bootstrap Dark Mode.
 * [EN] Applies damage, wounds, knockback, Heavy Metal, Betrayal, Vices, and statuses directly to targeted tokens and actors on the canvas, outputting Bootstrap Dark Mode cards.
 */

import { DamageCalculator } from "./damage-calculator.mjs";
import { CompanionRulesEngine } from "./companion-rules-engine.mjs";

export const MODULE_ID = "swade-autogame-plus";

export class TargetCombatManager {
  /**
   * [PT-BR] Aplica dano aos alvos selecionados pelo usuário atual ou passados explicitamente.
   * [EN] Applies damage to targets selected by current user or passed explicitly.
   *
   * @param {object} params
   * @param {number} params.damage - Total do dano rolado.
   * @param {number} [params.ap=0] - Penetração de Armadura (AP).
   * @param {TokenDocument[]} [params.targets] - Lista de alvos (padrão: game.user.targets).
   * @param {boolean} [params.isHeavyWeapon=false] - Se o ataque possui a propriedade Arma Pesada.
   * @param {boolean} [params.isTheDrop=false] - Se o ataque foi feito com Finalização (The Drop).
   * @param {string|number} [params.weaponClass=null] - Classe Heavy Metal da arma (I a VII).
   * @param {boolean} [params.isEmp=false] - Se a arma possui qualidade PEM (EMP).
   * @param {boolean} [params.isTemporal=false] - Se a arma possui qualidade Temporal.
   * @returns {Promise<Array<object>>} - Resumo dos efeitos aplicados em cada alvo.
   */
  static async applyDamageToTargets({
    damage,
    ap = 0,
    targets = null,
    isHeavyWeapon = false,
    isTheDrop = false,
    weaponClass = null,
    isEmp = false,
    isTemporal = false,
  }) {
    const targetTokens = targets || Array.from(globalThis.game?.user?.targets || []);

    if (!targetTokens.length) {
      globalThis.ui?.notifications?.warn?.(
        globalThis.game?.i18n?.localize?.("SWAG.Combat.NoTargetsSelected") ||
          "Nenhum alvo selecionado para aplicar o dano."
      );
      return [];
    }

    const ruleWoundCap = Boolean(globalThis.game?.settings?.get?.(MODULE_ID, "ruleWoundCap"));
    const ruleBetrayal = Boolean(globalThis.game?.settings?.get?.(MODULE_ID, "ruleBetrayal"));
    const enableKnockback =
      Boolean(globalThis.game?.settings?.get?.(MODULE_ID, "enableSuperPowersSupport")) ||
      Boolean(globalThis.game?.settings?.get?.(MODULE_ID, "ruleKnockback"));
    const ruleHeavyMetal = Boolean(globalThis.game?.settings?.get?.(MODULE_ID, "ruleHeavyMetal"));

    const results = [];

    for (const token of targetTokens) {
      const actor = token.actor;
      if (!actor) {
        continue;
      }

      // [PT-BR] Extrair estatísticas de combate do ator SWADE
      // [EN] Extract combat stats from SWADE actor
      const toughness = actor.system?.stats?.toughness?.value ?? 4;
      const armor = actor.system?.stats?.toughness?.armor ?? 0;
      const targetSize = actor.system?.stats?.size ?? 0;
      const isAlreadyShaken = actor.statuses?.has("shaken") ?? false;
      const hasHeavyArmor = Boolean(
        actor.system?.stats?.toughness?.heavyArmor ||
          actor.items?.some((i) => i.type === "armor" && (i.system?.heavyArmor || i.system?.isHeavyArmor) && i.system?.equipped)
      );

      const viceMarks =
        Number(actor.system?.additionalStats?.viceMarks?.value) ||
        Number(actor.getFlag?.(MODULE_ID, "viceMarks")) ||
        0;

      let resolvedTargetClass = null;
      let resolvedWeaponClass = weaponClass;
      if (ruleHeavyMetal && (actor.type === "vehicle" || hasHeavyArmor)) {
        resolvedTargetClass = DamageCalculator.calculateVehicleHeavyMetalClass(toughness).roman;
        if (!resolvedWeaponClass) {
          resolvedWeaponClass = DamageCalculator.calculateWeaponHeavyMetalClass({
            averageDamage: damage,
            ap,
            isHeavyWeapon,
          }).roman;
        }
      }

      const calc = DamageCalculator.calculate({
        damage,
        ap,
        toughness,
        armor,
        isAlreadyShaken,
        isHeavyWeapon,
        hasHeavyArmor,
        woundCap: ruleWoundCap ? 4 : null,
        isTheDrop,
        ruleBetrayal,
        viceMarks,
        weaponClass: resolvedWeaponClass,
        targetClass: resolvedTargetClass,
        isEmp,
        isTemporal,
        enableKnockback,
        targetSize,
      });

      // [PT-BR] Aplicar mutações de estado no ator
      // [EN] Apply state mutations on the actor
      const updates = {};
      const statusChanges = [];

      if (viceMarks > 0) {
        statusChanges.push(`+${viceMarks * 2} Dano (Marcas de Vício)`);
        if (actor.system?.additionalStats?.viceMarks) {
          updates["system.additionalStats.viceMarks.value"] = 0;
        }
        await actor.setFlag?.(MODULE_ID, "viceMarks", 0);
      }

      if (calc.inflictDistractedVulnerable && typeof actor.toggleStatusEffect === "function") {
        await actor.toggleStatusEffect("distracted", { active: true });
        await actor.toggleStatusEffect("vulnerable", { active: true });
        statusChanges.push("Distraído & Vulnerável (Arma Temporal)");
      }

      if (calc.isIgnoredHeavyArmor) {
        statusChanges.push("Ignorado (Armadura Pesada / Heavy Metal)");
      } else if (calc.isShakenInflicted && !isAlreadyShaken) {
        await actor.toggleStatusEffect?.("shaken", { active: true });
        statusChanges.push("Abalado");
      }

      if (calc.woundsInflicted > 0) {
        const currentWounds = Number(actor.system?.wounds?.value ?? 0);
        const maxWounds = Number(actor.system?.wounds?.max ?? 3);

        // [PT-BR] Subtrai ferimentos caso a ficha esteja usando o contador como "Ferimentos Restantes" (> 0),
        // [PT-BR] ou acumula até o limite e marca Incapacitado quando esgotar/atingir o limite.
        // [EN] Subtracts wounds if the sheet uses the counter as "Remaining Wounds" (> 0),
        // [EN] or accumulates up to the limit and marks Incapacitated when depleted/exceeded.
        let newWounds;
        let isIncapNow = false;

        if (currentWounds > 0) {
          newWounds = Math.max(0, currentWounds - calc.woundsInflicted);
          isIncapNow = newWounds === 0 && calc.woundsInflicted >= currentWounds;
        } else {
          newWounds = Math.min(maxWounds, currentWounds + calc.woundsInflicted);
          isIncapNow = (currentWounds + calc.woundsInflicted) >= maxWounds;
        }

        updates["system.wounds.value"] = newWounds;
        statusChanges.push(`-${calc.woundsInflicted} Ferimento(s)`);

        if (!calc.canSoak) {
          statusChanges.push("Proibido Absorver (Regra Traição)");
        }

        if (isIncapNow) {
          await actor.toggleStatusEffect?.("incapacitated", { active: true });
          statusChanges.push("Incapacitado");
        }
      }

      if (Object.keys(updates).length > 0 && typeof actor.update === "function") {
        await actor.update(updates);
      }

      // [PT-BR] Gerar card de feedback no chat usando o layout Bootstrap Dark Mode
      // [EN] Generate feedback card in chat using Bootstrap Dark Mode layout
      await this.sendCombatFeedbackChat(token, calc, statusChanges, targetSize);

      results.push({
        token,
        actor,
        calc,
        statusChanges,
      });
    }

    return results;
  }

  /**
   * [PT-BR] Envia mensagem estilizada de resultado de dano no chat usando o template Bootstrap compact-action-card.hbs.
   * [EN] Sends stylized damage result message in chat using Bootstrap compact-action-card.hbs template.
   */
  static async sendCombatFeedbackChat(token, calc, statusChanges, targetSize = 0) {
    const hideDefense = Boolean(globalThis.game?.settings?.get?.(MODULE_ID, "hideTargetDefenseValues"));
    const changesText = statusChanges.length
      ? statusChanges.join(" • ")
      : globalThis.game?.i18n?.localize?.("SWAG.Combat.NoDamageEffect") ||
        "Sem Efeito (Não superou a Resistência)";

    if (globalThis.SWAG?.api?.createShowcaseCard) {
      await globalThis.SWAG.api.createShowcaseCard("damage", {
        title: `Alvo Atingido: ${token.name}`,
        subtitle: hideDefense
          ? `Dano Aplicado: ${calc.damageDealt}`
          : `Dano Efetivo: ${calc.damageDealt} vs Resistência Efetiva ${calc.effectiveToughness} (Armadura Ef. ${calc.effectiveArmor})`,
        actorId: token.actor?.id || null,
        actorName: token.name,
        actorImg: token.actor?.img || token.texture?.src,
        topBadge: {
          text: calc.woundsInflicted > 0 ? `${calc.woundsInflicted} FERIMENTO(S)` : "IMPACTO",
          class: calc.woundsInflicted > 0 ? "bg-danger fw-bold" : "bg-warning text-dark fw-bold",
        },
        statusBadge: {
          text: changesText,
          class: calc.woundsInflicted > 0 ? "bg-danger" : calc.isShakenInflicted ? "bg-warning text-dark" : "bg-secondary",
          icon: calc.woundsInflicted > 0 ? "fa-solid fa-skull" : "fa-solid fa-shield-halved",
        },
        diceBreakdown: null,
        aceDetails: null,
        bestDieLabel: null,
        modifiers: null,
        description: `Resultado do Impacto contra <strong>${token.name}</strong>: <strong>${changesText}</strong>.${
          calc.knockback?.triggered
            ? `<br><span class="text-warning"><i class="fa-solid fa-person-falling-burst"></i> <strong>Projeção (Knockback) Ativada!</strong> Distância: <code>${calc.knockback.formula}</code> quadros (Limiar ${calc.knockback.threshold}).</span>`
            : ""
        }`,
        resultBox: {
          title: "FERIMENTOS APLICADOS",
          description: changesText,
          total: calc.woundsInflicted,
          scoreClass: calc.woundsInflicted > 0 ? "text-danger" : "text-secondary",
          scoreColor: calc.woundsInflicted > 0 ? "#ef4444" : "#94a3b8",
        },
        footerTarget: token.name,
        showApplyDamageBtn: false,
        showMacroBtn: false,
        macroFormula: null,
        showBennyBtn: calc.woundsInflicted > 0 && calc.canSoak,
      });

      if (calc.knockback?.triggered) {
        await CompanionRulesEngine.rollKnockback({
          damage: calc.damageDealt,
          targetSize,
          targetName: token.name,
          hitObstacle: true,
        });
      }
      return;
    }

    const content = `
      <div class="swag-card border-swag-damage p-3" style="background-color: #1e222a; border-radius: 8px; color: #e2e8f0;">
        <h6 class="fw-bold text-light mb-1"><i class="fa-solid fa-crosshairs text-danger me-1"></i> ${token.name}</h6>
        <div class="small text-secondary mb-2">Dano: <strong>${calc.damageDealt}</strong></div>
        <span class="badge ${calc.woundsInflicted > 0 ? "bg-danger" : "bg-secondary"}">${changesText}</span>
      </div>
    `;

    await ChatMessage.create({
      content,
      speaker: ChatMessage.getSpeaker({ token }),
    });
  }
}
