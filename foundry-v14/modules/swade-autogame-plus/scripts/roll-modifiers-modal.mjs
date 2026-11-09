/**
 * @fileoverview Motor de Modificadores de Regras de SWADE, Detector Automático de Ficha e Modal ApplicationV2
 * [PT-BR] Detecta automaticamente condições/ferimentos/vantagens da ficha do ator e provê catálogo completo de modificadores de regras de SWADE + Modal ApplicationV2.
 * [EN] Automatically detects actor sheet conditions/wounds/edges and provides a complete SWADE rule modifiers catalog + ApplicationV2 Modal.
 */

import { RaiseCalculator } from "./raise-calculator.mjs";
import { t, tf } from "./i18n.mjs";

/**
 * [PT-BR] Catálogo Completo de Modificadores de Regras do SWADE (Core + Compêndios)
 * [EN] Complete SWADE Rule Modifiers Catalog (Core + Companions)
 */
export const SWADE_MODIFIER_CATALOG = [
  {
    categoryId: "general",
    categoryTitle: "Gerais, Apoio & Ações",
    categoryIcon: "fa-solid fa-dice",
    items: [
      { id: "support-1", label: "+1 Apoio", value: 1, title: "Apoio bem-sucedido de aliado (+1)" },
      { id: "support-2", label: "+2 Apoio (Ampliação)", value: 2, title: "Apoio com Ampliação (+2)" },
      { id: "joker-bonus", label: "+2 Carta Coringa", value: 2, title: "Bônus de Coringa na rodada (+2 em Traços e Dano)" },
      { id: "edge-bonus", label: "+2 Vantagem", value: 2, title: "Bônus de Vantagem ou circunstância favorável (+2)" },
      { id: "multi-2", label: "-2 Ação Múltipla (2 Ações)", value: -2, title: "Realizando 2 ações no mesmo turno (-2 em cada)" },
      { id: "multi-3", label: "-4 Ação Múltipla (3 Ações)", value: -4, title: "Realizando 3 ações no mesmo turno (-4 em cada)" },
      { id: "unskilled", label: "-2 Sem Perícia (d4-2)", value: -2, title: "Tentativa sem treinamento na perícia (-2)" },
      { id: "unstable", label: "-2 Plataforma Instável", value: -2, title: "Em veículo em movimento, montaria ou terreno instável (-2)" },
    ],
  },
  {
    categoryId: "conditions",
    categoryTitle: "Condições, Ferimentos & Iluminação",
    categoryIcon: "fa-solid fa-heart-crack",
    items: [
      { id: "cond-distracted", label: "-2 Distraído", value: -2, title: "Condição Distraído (-2 em todas as rolagens de Traço)" },
      { id: "target-vulnerable", label: "+2 Alvo Vulnerável", value: 2, title: "Ações contra alvo Vulnerável recebem +2" },
      { id: "illum-dim", label: "-2 Penumbra (Iluminação)", value: -2, title: "Iluminação precária / Névoa leve (-2)" },
      { id: "illum-dark", label: "-4 Escuridão", value: -4, title: "Escuridão sem fonte de luz (-4)" },
      { id: "illum-pitch", label: "-6 Breu Total", value: -6, title: "Escuridão absoluta (-6)" },
      { id: "wound-1", label: "-1 Ferimento/Fadiga", value: -1, title: "1 nível de penalidade de Ferimento ou Fadiga (-1)" },
      { id: "wound-2", label: "-2 Ferimentos/Fadiga", value: -2, title: "2 níveis de penalidade de Ferimento ou Fadiga (-2)" },
      { id: "wound-3", label: "-3 Ferimentos/Fadiga", value: -3, title: "3 níveis de penalidade de Ferimento ou Fadiga (-3)" },
    ],
  },
  {
    categoryId: "combat",
    categoryTitle: "Combate, Mira, Cobertura & Alcance",
    categoryIcon: "fa-solid fa-crosshairs",
    items: [
      { id: "wild-attack", label: "+2 Ataque Selvagem", value: 2, title: "Ataque Selvagem (+2 Lutar e +2 Dano, fica Vulnerável)" },
      { id: "the-drop", label: "+4 Finalização (The Drop)", value: 4, title: "Alvo completamente indefeso (+4 Ataque e +4 Dano)" },
      { id: "aim", label: "+2 Mira (Aim)", value: 2, title: "Ação de Mirar no turno anterior (+2 Atirar/Arremessar)" },
      { id: "gang-up-1", label: "+1 Ataque em Bando", value: 1, title: "1 aliado adjacente ao mesmo alvo (+1 Lutar)" },
      { id: "gang-up-2", label: "+2 Ataque em Bando", value: 2, title: "2 aliados adjacentes ao mesmo alvo (+2 Lutar)" },
      { id: "gang-up-4", label: "+4 Ataque em Bando (Máx)", value: 4, title: "4+ aliados adjacentes ao mesmo alvo (+4 Lutar)" },
      { id: "cover-light", label: "-2 Cobertura Leve", value: -2, title: "Menos da metade do alvo coberta (-2)" },
      { id: "cover-medium", label: "-4 Cobertura Média", value: -4, title: "Mais da metade do alvo coberta (-4)" },
      { id: "cover-heavy", label: "-6 Cobertura Pesada", value: -6, title: "Apenas uma pequena parte exposta (-6)" },
      { id: "range-medium", label: "-2 Alcance Médio", value: -2, title: "Disparo em Alcance Médio (-2)" },
      { id: "range-long", label: "-4 Alcance Longo", value: -4, title: "Disparo em Alcance Longo (-4)" },
      { id: "called-limb", label: "-2 Golpe Mirado (Membro)", value: -2, title: "Ataque localizado em braço, mão ou perna (-2)" },
      { id: "called-head", label: "-4 Golpe Mirado (Cabeça)", value: -4, title: "Ataque localizado na cabeça/vital (-4 Ataque, +4 Dano)" },
      { id: "recoil", label: "-2 Recuo (CdT 2+)", value: -2, title: "Disparando mais de 1 tiro sem fogo sustentado (-2)" },
      { id: "off-hand", label: "-2 Mão Inábil", value: -2, title: "Ataque com a mão secundária sem Ambidestro (-2)" },
    ],
  },
  {
    categoryId: "companions",
    categoryTitle: "Poderes Arcanos & Compêndios",
    categoryIcon: "fa-solid fa-wand-magic-sparkles",
    items: [
      { id: "spc-synergy-pos", label: "+2 Sinergia (SPC)", value: 2, title: "Sinergia positiva de Manifestação de Superpoder (+2)" },
      { id: "spc-synergy-neg", label: "-2 Sinergia Neg. (SPC)", value: -2, title: "Sinergia negativa de Manifestação (-2)" },
      { id: "spc-combined", label: "+2 Ataque Combinado", value: 2, title: "Ataque Combinado de Super-Heróis (+2)" },
      { id: "desperate-2", label: "+2 Desesperado (-2 Dano)", value: 2, title: "Ataque Desesperado (+2 Lutar / -2 Dano)" },
      { id: "desperate-4", label: "+4 Desesperado (-4 Dano)", value: 4, title: "Ataque Desesperado (+4 Lutar / -4 Dano)" },
      { id: "fc-giant", label: "+2 Oponente Gigante", value: 2, title: "Bônus ao escalar criatura gigante (Compêndio Fantasia)" },
      { id: "swpf-armor", label: "-4 Interferência Armadura", value: -4, title: "Armadura acima do limite arcano (-4 Conjurar)" },
      { id: "scale-plus-2", label: "+2 Escala (Alvo Grande)", value: 2, title: "Diferença de Escala favorável (+2)" },
      { id: "scale-minus-2", label: "-2 Escala (Alvo Pequeno)", value: -2, title: "Diferença de Escala desfavorável (-2)" },
    ],
  },
];

export class RollModifiersEngine {
  /**
   * [PT-BR] Detecta automaticamente modificadores já presentes na ficha do ator, no combate ou na rolagem do SWADE
   * e retorna a lista inicial de pílulas para o card (com as da ficha marcadas como ativas).
   * [EN] Automatically detects modifiers already present on the actor sheet, combat, or SWADE roll
   * and returns the initial pill list for the card (with sheet modifiers marked as active).
   *
   * @param {object} params
   * @param {Actor} [params.actor]
   * @param {Roll} [params.roll]
   * @param {Item} [params.item]
   * @param {string} [params.cleanTraitName]
   * @param {boolean} [params.isDamage]
   * @param {boolean} [params.isArcane]
   * @param {boolean} [params.hasWeaponOrPowerDamage]
   * @param {Array} [params.targets]
   * @param {Combat} [params.combat]
   * @returns {{ modifiers: Array, autoUnappliedDelta: number }}
   */
  static buildInitialModifiers({
    actor = null,
    roll = null,
    item: _item = null,
    cleanTraitName = "",
    isDamage = false,
    isArcane = false,
    hasWeaponOrPowerDamage = false,
    targets = [],
    combat = null,
  } = {}) {
    const pills = [];
    const addedIds = new Set();
    let autoUnappliedDelta = 0;

    // 1. Verificar se a fórmula da rolagem já embutiu modificadores numéricos (ex: Ferimentos, Distraído, Bônus de Perícia)
    const formulaStr = String(roll?.formula || "");
    const rollAlreadyHasNegativeMod = /-\s*\d+/.test(formulaStr);
    const rollAlreadyHasPositiveMod = /\+\s*\d+/.test(formulaStr);

    if (actor?.system) {
      const status = actor.system.status || {};
      const activeStatuses = actor.statuses || new Set();

      // A. Condição Distraído na ficha/token (apenas para rolagens de Traço, não de Dano)
      const isDistracted = Boolean(status.isDistracted || activeStatuses.has?.("distracted"));
      if (!isDamage && isDistracted) {
        addedIds.add("cond-distracted");
        const alreadyInRoll = rollAlreadyHasNegativeMod;
        if (!alreadyInRoll) {
          autoUnappliedDelta += -2;
        }
        pills.push({
          id: "cond-distracted",
          label: "-2 Distraído (Ficha)",
          value: -2,
          title: "Detectado automaticamente da condição Distraído na ficha/token",
          active: true,
          activeClass: "active-negative",
          fromSheet: true,
        });
      }

      // B. Condição Atordoado / Abalado informativa ou Ferimentos + Fadiga
      const woundsVal = Number(actor.system.wounds?.value ?? 0);
      const woundsIgnored = Number(actor.system.wounds?.ignored ?? 0);
      const fatigueVal = Number(actor.system.fatigue?.value ?? 0);
      const fatigueIgnored = Number(actor.system.fatigue?.ignored ?? 0);
      const netWoundFatigue = Math.max(0, woundsVal - woundsIgnored) + Math.max(0, fatigueVal - fatigueIgnored);

      if (!isDamage && netWoundFatigue > 0) {
        const penalty = -Math.min(6, netWoundFatigue);
        const pillId = `sheet-wounds-${Math.abs(penalty)}`;
        addedIds.add(pillId);
        if (!rollAlreadyHasNegativeMod) {
          autoUnappliedDelta += penalty;
        }
        pills.push({
          id: pillId,
          label: `${penalty} Ferimentos/Fadiga (Ficha)`,
          value: penalty,
          title: `Penalidade líquida detectada na ficha (${woundsVal} Ferimento(s), ${fatigueVal} Fadiga)`,
          active: true,
          activeClass: "active-negative",
          fromSheet: true,
        });
      }

      // C. Carta Coringa (Joker) no combate ativo
      const activeCombat = combat || globalThis.game?.combat;
      if (activeCombat?.started && Array.isArray(activeCombat.combatants?.contents || activeCombat.combatants)) {
        const list = activeCombat.combatants?.contents || activeCombat.combatants;
        const combatant = list.find((c) => c.actorId === actor.id || c.actor?.id === actor.id);
        if (combatant?.hasJoker) {
          addedIds.add("joker-bonus");
          if (!rollAlreadyHasPositiveMod) {
            autoUnappliedDelta += 2;
          }
          pills.push({
            id: "joker-bonus",
            label: "+2 Coringa (Combate)",
            value: 2,
            title: "Personagem sacou um Coringa nesta rodada (+2 em Traços e Dano)",
            active: true,
            activeClass: "active-positive",
            fromSheet: true,
          });
        }
      }

      // D. Vantagens (Edges) na ficha que dão +2 direto na perícia/atributo rolado
      const lowerTrait = (cleanTraitName || "").toLowerCase();
      const actorItems = actor.items?.contents || (Array.isArray(actor.items) ? actor.items : []);
      for (const edge of actorItems) {
        if (edge?.type !== "edge") {
          continue;
        }
        const edgeName = (edge.name || "").toLowerCase();
        const matchesAlertness =
          (edgeName.includes("alerta") || edgeName.includes("alertness")) &&
          (lowerTrait.includes("perceber") || lowerTrait.includes("notice"));
        const matchesAcrobat =
          (edgeName.includes("acróbata") || edgeName.includes("acrobata") || edgeName.includes("acrobat")) &&
          (lowerTrait.includes("agilidade") || lowerTrait.includes("atletismo") || lowerTrait.includes("agility") || lowerTrait.includes("athletics"));
        const matchesCharismatic =
          (edgeName.includes("carismático") || edgeName.includes("charismatic")) &&
          (lowerTrait.includes("persuasão") || lowerTrait.includes("persuasion") || lowerTrait.includes("performance"));

        if (matchesAlertness || matchesAcrobat || matchesCharismatic) {
          const edgeId = `edge-${edge.id || edgeName}`;
          addedIds.add(edgeId);
          if (!rollAlreadyHasPositiveMod) {
            autoUnappliedDelta += 2;
          }
          pills.push({
            id: edgeId,
            label: `+2 ${edge.name} (Ficha)`,
            value: 2,
            title: `Vantagem "${edge.name}" detectada na ficha do personagem`,
            active: true,
            activeClass: "active-positive",
            fromSheet: true,
          });
        }
      }
    }

    // E. Alvo Vulnerável (se houver token alvejado com condição Vulnerável)
    const targetList = targets?.length
      ? targets
      : (globalThis.game?.user?.targets ? Array.from(globalThis.game.user.targets) : []);
    const firstTargetActor = targetList[0]?.actor;
    const isTargetVulnerable = Boolean(
      firstTargetActor?.system?.status?.isVulnerable ||
      firstTargetActor?.statuses?.has?.("vulnerable")
    );
    if (!isDamage && isTargetVulnerable && !addedIds.has("target-vulnerable")) {
      addedIds.add("target-vulnerable");
      autoUnappliedDelta += 2;
      pills.push({
        id: "target-vulnerable",
        label: "+2 Alvo Vulnerável",
        value: 2,
        title: `Alvo (${targetList[0]?.name || "Alvo"}) está Vulnerável (+2 nas ações contra ele)`,
        active: true,
        activeClass: "active-positive",
        fromSheet: true,
      });
    }

    // F. Atalhos Rápidos Contextuais (inativos por padrão para clique rápido)
    const quickDefaults = isDamage
      ? [
          { id: "wild-attack", label: "+2 Ataque Selvagem", value: 2, title: "Ataque Selvagem (+2 Dano)" },
          { id: "the-drop", label: "+4 Finalização (The Drop)", value: 4, title: "Finalização (+4 Dano)" },
          { id: "cover-light", label: "-2 Redução", value: -2, title: "Redução de Dano (-2)" },
        ]
      : hasWeaponOrPowerDamage
        ? [
            { id: "wild-attack", label: "+2 Ataque Selvagem", value: 2, title: "Ataque Selvagem (+2 Lutar e +2 Dano)" },
            { id: "support-1", label: "+1 Apoio / Bando", value: 1, title: "Apoio ou Ataque em Bando (+1)" },
            { id: "cond-distracted", label: "-2 Distraído", value: -2, title: "Condição Distraído (-2)" },
            { id: "multi-2", label: "-2 Ação Múltipla", value: -2, title: "2 Ações no turno (-2)" },
          ]
        : isArcane
          ? [
              { id: "support-1", label: "+1 Apoio", value: 1, title: "Apoio de Aliado (+1)" },
              { id: "spc-synergy-pos", label: "+2 Vantagem / Sinergia", value: 2, title: "Bônus ou Sinergia (+2)" },
              { id: "cond-distracted", label: "-2 Distraído", value: -2, title: "Condição Distraído (-2)" },
              { id: "multi-2", label: "-2 Ação Múltipla", value: -2, title: "2 Ações no turno (-2)" },
            ]
          : [
              { id: "support-1", label: "+1 Apoio", value: 1, title: "Apoio de Aliado (+1)" },
              { id: "edge-bonus", label: "+2 Vantagem", value: 2, title: "Vantagem ou Bônus (+2)" },
              { id: "cond-distracted", label: "-2 Distraído", value: -2, title: "Condição Distraído (-2)" },
              { id: "multi-2", label: "-2 Ação Múltipla", value: -2, title: "2 Ações no turno (-2)" },
            ];

    for (const q of quickDefaults) {
      if (!addedIds.has(q.id)) {
        addedIds.add(q.id);
        pills.push({
          ...q,
          active: false,
          activeClass: "",
          fromSheet: false,
        });
      }
    }

    const modLabel = isDamage
      ? t("SWAG.Card.DamageModifiersLabel", "Bônus Adicionais de Dano:")
      : hasWeaponOrPowerDamage
        ? t("SWAG.Card.TacticalOptionsLabel", "Opções Táticas de SWADE:")
        : isArcane
          ? t("SWAG.Card.PowerModifiersLabel", "Modificadores de Poder:")
          : t("SWAG.Card.RuleModifiersLabel", "Modificadores de Regra:");

    return {
      modLabel,
      modifiers: pills,
      autoUnappliedDelta,
    };
  }

  /**
   * [PT-BR] Recalcula o Resultado Final, o Badge de Status (acima do Resultado Final) e a Borda Semântica do Card no DOM.
   * [EN] Recalculates the Final Score, the Status Badge (above Final Result), and the Card Semantic Border in DOM.
   *
   * @param {HTMLElement} cardEl - Elemento `.swag-card`
   * @param {number} newTotal - Novo total calculado
   */
  static updateCardOutcomeInDOM(cardEl, newTotal) {
    if (!cardEl) {
      return;
    }

    const totalEl = cardEl.querySelector(".result-score-number");
    if (totalEl) {
      totalEl.textContent = String(newTotal);
    }

    const isDamage = cardEl.getAttribute("data-is-damage") === "true";
    const isCriticalFailure = cardEl.getAttribute("data-crit-fail") === "true";
    const targetNumber = Number.parseInt(cardEl.getAttribute("data-tn") || "4", 10) || 4;

    const statusBadgeEl = cardEl.querySelector(".swag-outcome-badge");
    const descEl = cardEl.querySelector(".swag-result-description");

    if (isDamage) {
      const dmgMargin = newTotal - targetNumber;
      const wounds = dmgMargin >= 4 ? Math.floor(dmgMargin / 4) : 0;
      if (statusBadgeEl) {
        statusBadgeEl.className = `badge swag-outcome-badge swag-fullwidth-badge ${
          wounds > 0 ? "bg-danger text-light" : dmgMargin >= 0 ? "bg-warning-subtle" : "bg-secondary"
        }`;
        statusBadgeEl.innerHTML =
          wounds > 0
            ? `<i class="fa-solid fa-heart-crack me-1"></i> <span>${tf("SWAG.Card.ShakenPlusWounds", { wounds }, `Abalado + ${wounds} Ferimento(s)`)}</span>`
            : dmgMargin >= 0
              ? `<i class="fa-solid fa-burst me-1"></i> <span>${t("SWAG.Combat.Shaken", "Abalado")}</span>`
              : `<i class="fa-solid fa-shield me-1"></i> <span>${t("SWAG.Combat.NoDamageEffect", "Sem Efeito")}</span>`;
      }
      if (descEl) {
        descEl.innerHTML = tf("SWAG.Card.DamageDesc", { total: newTotal }, `Dano total <strong>${newTotal}</strong> desferido contra o alvo!`);
      }
      const applyBtn = cardEl.querySelector('[data-swag-action="apply-damage"]');
      if (applyBtn) {
        applyBtn.setAttribute("data-damage", String(newTotal));
        applyBtn.setAttribute("data-wounds", String(wounds));
        applyBtn.innerHTML = `<i class="fa-solid fa-skull me-1"></i> ${t("SWAG.Combat.Wounds", "Ferimento(s)")} (${wounds})`;
      }
      return;
    }

    const calc = RaiseCalculator.calculate(newTotal, targetNumber, { isCriticalFailure });
    const isRaise = calc.raises > 0;
    const isSuccess = calc.isSuccess;

    // 1. Atualizar Borda Semântica do Card
    cardEl.classList.remove("border-swag-raise", "border-swag-success", "border-swag-critical", "border-swag-item");
    if (calc.isCriticalFailure) {
      cardEl.classList.add("border-swag-critical");
    } else if (isRaise) {
      cardEl.classList.add("border-swag-raise");
    } else if (isSuccess) {
      cardEl.classList.add("border-swag-success");
    } else {
      cardEl.classList.add("border-swag-critical");
    }

    // 2. Atualizar Cor do Número no Resultado Final
    if (totalEl) {
      totalEl.classList.remove("text-success", "text-primary", "text-danger", "text-warning");
      if (isRaise) {
        totalEl.classList.add("text-success");
        totalEl.style.color = "#10b981";
      } else if (isSuccess) {
        totalEl.classList.add("text-primary");
        totalEl.style.color = "#3b82f6";
      } else {
        totalEl.classList.add("text-danger");
        totalEl.style.color = "#ef4444";
      }
    }

    // 3. Atualizar Texto da Caixa de Resultado Final
    if (descEl) {
      descEl.innerHTML = calc.isCriticalFailure
        ? t("SWAG.Card.CritFailureDesc", "Falha Crítica! A ação falhou automaticamente.")
        : isRaise
          ? tf("SWAG.Card.RaiseDesc", { tn: targetNumber, raises: calc.raises }, `Superou o Alvo NA ${targetNumber} com <span class="text-success fw-bold">${calc.raises} Ampliação(ões)</span>!`)
          : isSuccess
            ? tf("SWAG.Card.SuccessDesc", { tn: targetNumber }, `Superou o Número-Alvo (NA ${targetNumber}). Ação bem-sucedida!`)
            : tf("SWAG.Card.FailureDesc", { tn: targetNumber }, `Não atingiu o Número-Alvo (NA ${targetNumber}).`);
    }

    // 4. Atualizar o Badge de Resultado da Rolagem (empilhado e ocupando 100% da largura do box)
    if (statusBadgeEl) {
      const badgeClass = calc.isCriticalFailure
        ? "bg-danger text-light"
        : isRaise
          ? "bg-success-subtle"
          : isSuccess
            ? "bg-primary-subtle"
            : "bg-danger-subtle";
      const badgeIcon = calc.isCriticalFailure
        ? "fa-solid fa-triangle-exclamation"
        : isRaise
          ? "fa-solid fa-circle-check"
          : isSuccess
            ? "fa-solid fa-check"
            : "fa-solid fa-xmark";
      const badgeText = calc.isCriticalFailure
        ? t("SWAG.Roll.CriticalFailure", "Falha Crítica!")
        : isRaise
          ? tf("SWAG.Roll.SuccessWithRaise", { raises: calc.raises }, `Sucesso c/ ${calc.raises} Ampliação`)
          : isSuccess
            ? t("SWAG.Roll.SimpleSuccess", "Sucesso Simples")
            : t("SWAG.Roll.Failure", "Falha");

      statusBadgeEl.className = `badge swag-outcome-badge swag-fullwidth-badge ${badgeClass}`;
      statusBadgeEl.innerHTML = `<i class="${badgeIcon} me-1"></i> <span>${badgeText}</span>`;
    }
  }
}

/**
 * [PT-BR] Modal ApplicationV2 para Seleção e Adição de Modificadores de Regras de SWADE ao Card do Chat
 * [EN] ApplicationV2 Modal for Selecting and Adding SWADE Rule Modifiers to the Chat Card
 */
const BaseAppV2 = globalThis.foundry?.applications?.api?.ApplicationV2;
const HandlebarsMixin = globalThis.foundry?.applications?.api?.HandlebarsApplicationMixin;

export class RollModifiersModal extends (HandlebarsMixin && BaseAppV2 ? HandlebarsMixin(BaseAppV2) : class {}) {
  #cardEl = null;
  #cardId = "";

  constructor(options = {}) {
    const { cardEl, cardId, ...appOptions } = options;
    super(appOptions);
    this.#cardEl = cardEl || null;
    this.#cardId = cardId || "";
  }

  /**
   * [PT-BR] Atualiza o card alvo caso a modal já esteja instanciada
   * [EN] Updates target card if modal is already instantiated
   */
  setTargetCard(cardEl, cardId) {
    this.#cardEl = cardEl || null;
    this.#cardId = cardId || "";
  }

  static DEFAULT_OPTIONS = {
    id: "swag-roll-modifiers-modal",
    classes: ["swag-app", "SWAG-PLUS-modifiers-modal"],
    tag: "div",
    window: {
      title: "SWAG+ | Modificadores de Regras de SWADE",
      icon: "fa-solid fa-sliders",
      resizable: true,
    },
    position: {
      width: 620,
      height: 560,
    },
  };

  static PARTS = {
    content: {
      template: "modules/swade-autogame-plus/templates/roll-modifiers-modal.hbs",
    },
  };

  async _prepareContext(_options) {
    // [PT-BR] Ler quais modificadores já estão ativos no card atual
    // [EN] Read which modifiers are currently active on the card
    const activeIds = new Set();
    if (this.#cardEl) {
      this.#cardEl.querySelectorAll(".mod-pill-btn").forEach((btn) => {
        const modId = btn.getAttribute("data-mod-id");
        const isActive =
          btn.classList.contains("active-positive") ||
          btn.classList.contains("active-negative") ||
          btn.classList.contains("active");
        if (modId && isActive) {
          activeIds.add(modId);
        }
      });
    }

    const categories = SWADE_MODIFIER_CATALOG.map((cat) => ({
      ...cat,
      items: cat.items.map((item) => ({
        ...item,
        checked: activeIds.has(item.id),
        isPositive: item.value > 0,
      })),
    }));

    return {
      cardId: this.#cardId,
      categories,
    };
  }

  _onRender(context, options) {
    super._onRender?.(context, options);
    const html = this.element;
    if (!html) {
      return;
    }

    // [PT-BR] Ao clicar/alternar qualquer checkbox da modal, aplica ou remove imediatamente no card do chat!
    // [EN] When clicking/toggling any checkbox in the modal, immediately applies or removes it on the chat card!
    html.querySelectorAll(".swag-modal-mod-item").forEach((labelEl) => {
      const checkbox = labelEl.querySelector('input[type="checkbox"]');
      checkbox?.addEventListener("change", () => {
        labelEl.classList.toggle("selected", checkbox.checked);
        this.#applySelectedToCard(html, { includeCustom: false });
      });
    });

    // Botão Adicionar Modificador Personalizado imediatamente
    html.querySelector('[data-action="add-custom-modifier"]')?.addEventListener("click", (ev) => {
      ev.preventDefault();
      this.#applySelectedToCard(html, { includeCustom: true });
      const nameInput = html.querySelector("#swag-custom-mod-name");
      const valInput = html.querySelector("#swag-custom-mod-val");
      if (nameInput) {
        nameInput.value = "";
      }
      if (valInput) {
        valInput.value = "";
      }
    });

    // Botão Aplicar Selecionados ao Card (topo e rodapé)
    html.querySelectorAll('[data-action="apply-modifiers"]').forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        this.#applySelectedToCard(html, { includeCustom: true });
        this.close();
      });
    });

    // Botão Cancelar / Fechar
    html.querySelectorAll('[data-action="close-modal"]').forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        this.close();
      });
    });
  }

  #resolveCardElement() {
    if (this.#cardEl && document.body?.contains(this.#cardEl)) {
      return this.#cardEl;
    }
    if (this.#cardId) {
      return (
        document.querySelector(`.swag-card[data-card-id="${this.#cardId}"]`) ||
        document.getElementById(this.#cardId)
      );
    }
    return this.#cardEl;
  }

  #applySelectedToCard(modalEl, { includeCustom = true } = {}) {
    const cardEl = this.#resolveCardElement();
    if (!cardEl) {
      return;
    }

    const pillsContainer = cardEl.querySelector(".swag-mod-pills-container");
    const addBtn = cardEl.querySelector('[data-swag-action="open-modifiers-modal"]');
    if (!pillsContainer) {
      return;
    }

    let delta = 0;

    // 1. Processar todos os checkboxes da modal
    modalEl.querySelectorAll('input.swag-mod-checkbox[type="checkbox"]').forEach((cb) => {
      const modId = cb.getAttribute("data-mod-id");
      const modLabel = cb.getAttribute("data-mod-label");
      const modTitle = cb.getAttribute("data-mod-title") || modLabel;
      const modValue = Number.parseInt(cb.getAttribute("data-mod-value"), 10) || 0;
      const shouldBeActive = cb.checked;
      const activeClass = modValue >= 0 ? "active-positive" : "active-negative";

      const existingBtn = pillsContainer.querySelector(`.mod-pill-btn[data-mod-id="${modId}"]`);
      if (existingBtn) {
        const wasActive =
          existingBtn.classList.contains("active-positive") ||
          existingBtn.classList.contains("active-negative") ||
          existingBtn.classList.contains("active");

        if (shouldBeActive && !wasActive) {
          existingBtn.classList.add(activeClass);
          delta += modValue;
        } else if (!shouldBeActive && wasActive) {
          existingBtn.classList.remove("active-positive", "active-negative", "active");
          delta -= modValue;
        }
      } else if (shouldBeActive) {
        // Criar nova pílula ativa no card antes do botão "+ Modificadores"
        const newBtn = document.createElement("button");
        newBtn.type = "button";
        newBtn.className = `mod-pill-btn ${activeClass}`;
        newBtn.setAttribute("data-mod-id", modId);
        newBtn.setAttribute("data-mod-value", String(modValue));
        newBtn.setAttribute("data-mod-target", this.#cardId);
        newBtn.setAttribute("title", modTitle);
        newBtn.textContent = modLabel;

        // Listener de clique individual para a pílula recém-adicionada
        newBtn.addEventListener("click", (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          const isNowActive = newBtn.classList.contains(activeClass);
          const stepDelta = isNowActive ? -modValue : modValue;
          newBtn.classList.toggle(activeClass, !isNowActive);
          const totalEl = cardEl.querySelector(".result-score-number");
          const cur = Number.parseInt(totalEl?.textContent?.trim() || "0", 10) || 0;
          RollModifiersEngine.updateCardOutcomeInDOM(cardEl, cur + stepDelta);
        });

        if (addBtn && addBtn.parentElement === pillsContainer) {
          pillsContainer.insertBefore(newBtn, addBtn);
        } else {
          pillsContainer.appendChild(newBtn);
        }
        delta += modValue;
      }
    });

    // 2. Processar Modificador Personalizado (se preenchido)
    if (includeCustom) {
      const customName = modalEl.querySelector("#swag-custom-mod-name")?.value?.trim();
      const customValRaw = modalEl.querySelector("#swag-custom-mod-val")?.value;
      const customVal = Number.parseInt(customValRaw, 10);

      if (!Number.isNaN(customVal) && customVal !== 0) {
        const signStr = customVal > 0 ? `+${customVal}` : String(customVal);
        const customLabel = `${signStr} ${customName || "Personalizado"}`;
        const activeClass = customVal >= 0 ? "active-positive" : "active-negative";
        const customId = `custom-${Date.now()}`;

        const newBtn = document.createElement("button");
        newBtn.type = "button";
        newBtn.className = `mod-pill-btn ${activeClass}`;
        newBtn.setAttribute("data-mod-id", customId);
        newBtn.setAttribute("data-mod-value", String(customVal));
        newBtn.setAttribute("data-mod-target", this.#cardId);
        newBtn.setAttribute("title", customLabel);
        newBtn.textContent = customLabel;

        newBtn.addEventListener("click", (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          const isNowActive = newBtn.classList.contains(activeClass);
          const stepDelta = isNowActive ? -customVal : customVal;
          newBtn.classList.toggle(activeClass, !isNowActive);
          const totalEl = cardEl.querySelector(".result-score-number");
          const cur = Number.parseInt(totalEl?.textContent?.trim() || "0", 10) || 0;
          RollModifiersEngine.updateCardOutcomeInDOM(cardEl, cur + stepDelta);
        });

        if (addBtn && addBtn.parentElement === pillsContainer) {
          pillsContainer.insertBefore(newBtn, addBtn);
        } else {
          pillsContainer.appendChild(newBtn);
        }
        delta += customVal;
      }
    }

    if (delta !== 0) {
      const totalEl = cardEl.querySelector(".result-score-number");
      const currentTotal = Number.parseInt(totalEl?.textContent?.trim() || "0", 10) || 0;
      RollModifiersEngine.updateCardOutcomeInDOM(cardEl, currentTotal + delta);
      globalThis.ui?.notifications?.info?.(
        `Modificadores aplicados (${delta >= 0 ? `+${delta}` : delta}). Novo resultado: ${currentTotal + delta}`
      );
    }
  }
}
