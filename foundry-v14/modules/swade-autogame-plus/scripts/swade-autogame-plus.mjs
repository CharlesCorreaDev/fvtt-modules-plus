/**
 * @fileoverview Ponto de entrada oficial do SWADE AutoGame Plus (SWAG+)
 * [PT-BR] Ponto de entrada ESModule compatível com Foundry v14 (ApplicationV2).
 * [EN] Official ESModule entrypoint compatible with Foundry v14 (ApplicationV2).
 */

import { RaiseCalculator } from "./raise-calculator.mjs";
import { t, tf } from "./i18n.mjs";
import { DamageCalculator } from "./damage-calculator.mjs";
import { TargetCombatManager } from "./target-combat-manager.mjs";
import { TurnTimer } from "./turn-timer.mjs";
import { QuickActionsHUD } from "./quick-actions-hud.mjs";
import { VisualActiveEffectsHUD } from "./visual-active-effects-hud.mjs";
import { RollInspector } from "./roll-inspector.mjs";
import { TokenColorMarker } from "./token-color-marker.mjs";
import { FxAdapter } from "./fx-adapter.mjs";
import { ActorInspector } from "./actor-inspector.mjs";
import { SettingsWizard } from "./settings-wizard.mjs";
import { CompanionRulesEngine } from "./companion-rules-engine.mjs";
import {
  RollModifiersEngine,
  RollModifiersModal,
  SWADE_MODIFIER_CATALOG,
} from "./roll-modifiers-modal.mjs";
import {
  isSuperPowerType,
  extractSuperPowerMetadata,
  getActorSuperPowers,
  calculateActorSuperPowerSummary,
  registerSuperPowerItemSupport,
} from "./super-power-item.mjs";

export const MODULE_ID = "swade-autogame-plus";

let quickActionsHudInstance = null;
let visualEffectsHudInstance = null;
let globalChatClickDelegated = false;

export class SwadeAutoGamePlus {
  static initialize() {
    console.log(
      "%cSWAG+ | Inicializando SWADE AutoGame Plus v1.0.0-beta.1 (Foundry v14)",
      "color: #869dcc; font-weight: bold;"
    );

    this.registerSettings();
    registerSuperPowerItemSupport();
    this.mountPublicApi();
    this.registerHooks();
  }

  static registerSettings() {
    // [PT-BR] Regras de Ambientação e Combate Avançado (Inspirado em SWADE Tools & Better Rolls)
    // [EN] Setting Rules & Advanced Combat (Inspired by SWADE Tools & Better Rolls)
    game.settings.register(MODULE_ID, "ruleWoundCap", {
      name: "Limite de Ferimentos (Wound Cap)",
      hint: "Limita o número máximo de Ferimentos que um único ataque pode causar a 4 (Regra de Ambientação).",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "ruleUnarmoredHero", {
      name: "Herói Sem Armadura (Unarmored Hero)",
      hint: "Concede +2 de Aparar a personagens que não estejam usando nenhuma armadura corporal.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "ruleDumbLuck", {
      name: "Sorte de Principiante (Dumb Luck)",
      hint: "Permite gastar um Bene para rerolar uma Falha Crítica em testes de perícias ou atributos.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "ruleGrittyDamage", {
      name: "Dano Severo / Realista (Gritty Damage)",
      hint: "Ao sofrer um ou mais Ferimentos, rola automaticamente na tabela de Lesões para determinar sequelas imediatas.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "autoAskCalledShots", {
      name: "Perguntar Tiros Localizados (Called Shots)",
      hint: "Exibe diálogo de seleção de parte do corpo alvejada (Cabeça, Braços, Pernas) antes de rolar o ataque.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "autoWildAttack", {
      name: "Automação de Ataque Selvagem (Wild Attack)",
      hint: "Aplica automaticamente +2 no ataque e dano e atribui a condição Vulnerável ao atacante.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "autoGroupRolls", {
      name: "Rolagens em Grupo para Figurantes",
      hint: "Rola um único dado para grupos de figurantes idênticos compartilhando o mesmo turno.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "enableSuperPowersSupport", {
      name: "Suporte ao Super Powers Companion (SPC)",
      hint: "Ativa suporte a itens do tipo superPower, níveis de poder e integrações para campanhas de super-heróis.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "autoGangUp", {
      name: "Cálculo Automático de Ataque em Bando (Gang Up)",
      hint: "Calcula automaticamente bônus de até +4 no ataque corpo a corpo baseado no número de aliados adjacentes ao alvo.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "autoScale", {
      name: "Cálculo Automático de Modificadores de Escala (Scale)",
      hint: "Aplica automaticamente penalidades e bônus de acerto ao atacar criaturas de tamanhos diferentes.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "autoCover", {
      name: "Detecção Automática de Cobertura de Escudos",
      hint: "Aplica penalidade de cobertura contra ataques à distância caso o alvo esteja empunhando um escudo.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "autoDesperateAttack", {
      name: "Habilitar Ataque Desesperado (Desperate Attack)",
      hint: "Adiciona opção de ataque tático permitindo trocar dano por bônus no acerto (+2/-2 ou +4/-4).",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "ruleHeroesNeverDie", {
      name: "Regra: Heróis Jamais Morrem (Heroes Never Die)",
      hint: "Personagens derrotados ficam incapacitados e fora de combate, mas não sofrem morte definitiva.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "ruleMoreBennies", {
      name: "Regra: Mais Benes (More Bennies)",
      hint: "Personagens recebem +1 Bene adicional ao padrão no início de cada sessão.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "ruleHardChoices", {
      name: "Regra: Escolhas Difíceis (Hard Choices)",
      hint: "Apenas os jogadores recebem Benes quando cartas Coringas são sacadas na iniciativa.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "ruleJokersWild", {
      name: "Regra: Coringa Selvagem (Joker's Wild)",
      hint: "Distribui automaticamente 1 Bene para todos os aliados quando alguém sacar um Coringa na iniciativa.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "enableSciFiSupport", {
      name: "Suporte ao Sci-Fi Companion",
      hint: "Ativa suporte a Fadiga Cibernética (Strain) e regras de Combate Espacial (Clash).",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "enableHorrorSupport", {
      name: "Suporte ao Horror Companion",
      hint: "Ativa regras de Carnificina (Slaughter Rules) e medidores de Pavor e Sanidade.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    // [PT-BR] Regras Específicas dos 5 Compêndios Oficiais (Fantasia, Sci-Fi, Horror, Superpoderes, SWPF e Sprawlrunners)
    // [EN] Specific Rules from the 5 Official Companions (Fantasy, Sci-Fi, Horror, Super Powers, SWPF, and Sprawlrunners)
    game.settings.register(MODULE_ID, "enableFantasySupport", {
      name: "Suporte ao Compêndio de Fantasia (Mochila 50%, Pausa e Tesouros)",
      hint: "Ativa redução de 50% de peso em Mochilas, 6 atividades de Pausa (Downtime) e gerador de Tesouros mesmo sem o módulo oficial.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "ruleBetrayal", {
      name: "Regra: Traição (Compêndio de Fantasia)",
      hint: "Impede rolagens de Absorção (Soak) contra ferimentos causados com Finalização (The Drop).",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "ruleHeavyMetal", {
      name: "Regra: Heavy Metal Classes I a VII (Compêndio de Ficção Científica)",
      hint: "Calcula automaticamente a diferença de Classe Heavy Metal (I a VII) entre Armas e Veículos/Armaduras Pesadas.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "ruleKnockback", {
      name: "Regra: Projeção / Knockback Automático (Compêndio de Superpoderes)",
      hint: "Verifica limiares de Projeção por Escala (10/20/30/40/50) e rola distância em d6 + colisão contra obstáculos.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "ruleSlaughter", {
      name: "Regra: Massacre / Slaughter Rules (Compêndio de Horror)",
      hint: "Novos personagens de jogadores são criados com limite máximo de apenas 1 Ferimento.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "ruleArmorInterference", {
      name: "Regra: Interferência de Armadura Arcana (Pathfinder SWPF)",
      hint: "Aplica penalidade de -4 em Conjuração quando Magos/Feiticeiros vestem armaduras restritas.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    // [PT-BR] Configurações Avançadas de Medição, Iluminação, Munição/PP e Visibilidade (Inspiradas em Better Rolls, SWADE Tools, Illuminator & Targeted Damage)
    // [EN] Advanced Settings for Measurement, Illumination, Ammo/PP and Visibility
    game.settings.register(MODULE_ID, "measureWithGrid", {
      name: "Calcular a distância com o grid",
      hint: "Usa a medição da grade em vez da medição euclidiana real para penalidades de alcance.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "measureFromEdge", {
      name: "Medir a partir da borda (Measure from edge)",
      hint: "Medições de alcance e distância são calculadas a partir da borda do token em vez do centro.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "suggestIlluminationPenalties", {
      name: "Sugerir Penalidades de Iluminação (Illuminator)",
      hint: "Sugere penalidades automáticas de Iluminação (Penumbra, Escuridão, Breu) com base nas luzes da cena.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "autoSubtractAmmo", {
      name: "Subtrair munição por padrão",
      hint: "Subtrai automaticamente tiros/cargas de munição ao realizar rolagens de armas.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "autoSubtractPowerPoints", {
      name: "Controle de Pontos de Poder (Subtrair PP)",
      hint: "Subtrai automaticamente Pontos de Poder gastos ao ativar poderes arcanos.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "hideTargetDefenseValues", {
      name: "Ocultar Valores de Defesa do Alvo",
      hint: "Exclui a Resistência e Armadura do alvo do card de resultado do chat para evitar meta-jogo.",
      scope: "world",
      config: false,
      type: Boolean,
      default: false,
    });

    game.settings.register(MODULE_ID, "showStatusRemovalCards", {
      name: "Mostrar cartões de remoção de status",
      hint: "Mostra cartões automáticos para remoção de Abalado no início do combate.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "checkExtraCriticalFailures", {
      name: "Verificar Falhas Críticas Extras para Figurantes",
      hint: "Quando um figurante rolar 1 no dado de Traço, rola um d6 extra automaticamente para checar Falha Crítica.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "defaultRoF", {
      name: "Cadência de Tiros Padrão (RoF)",
      hint: "Cadência de tiros padrão para armas de fogo.",
      scope: "world",
      config: false,
      type: String,
      default: "1",
    });

    game.settings.register(MODULE_ID, "raiseCalculatorButtonRows", {
      name: "Linhas de Botões da Calculadora de Elevações",
      hint: "Quantidade de linhas de botões de elevação no painel (Padrão: 6).",
      scope: "world",
      config: false,
      type: Number,
      default: 6,
    });

    game.settings.register(MODULE_ID, "resultCardVisibility", {
      name: "Ver cartão de resultado",
      hint: "Define quem tem permissão para visualizar o cartão de resultado da rolagem.",
      scope: "world",
      config: false,
      type: String,
      default: "all",
    });
    // [EN] Interactive Configuration Menu (Bootstrap Wizard)
    game.settings.registerMenu(MODULE_ID, "settingsWizardMenu", {
      name: "Assistente de Configurações (SWAG+ Wizard)",
      label: "Abrir Assistente de Configurações",
      hint: "Abre o painel em formato Wizard para configurar mecânicas, combate, fichas e paleta de cores personalizada.",
      icon: "fas fa-magic",
      type: SettingsWizard,
      restricted: true,
    });

    game.settings.register(MODULE_ID, "enableCompactCard", {
      name: "Habilitar Card Compacto de Ação no Chat",
      hint: "Substitui as mensagens padrão de rolagem de combate por um card unificado e limpo com detalhamento de dados e ases.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "enableRaiseCalculator", {
      name: "SWAG.Settings.EnableRaiseCalculatorName",
      hint: "SWAG.Settings.EnableRaiseCalculatorHint",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "enableTargetedDamage", {
      name: "SWAG.Settings.EnableTargetedDamageName",
      hint: "SWAG.Settings.EnableTargetedDamageHint",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "enableTurnTimer", {
      name: "SWAG.Settings.EnableTurnTimerName",
      hint: "Habilita a barra visual e contagem de tempo para turnos de combate.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "turnTimerDuration", {
      name: "SWAG.Settings.TurnTimerDurationName",
      hint: "Segundos disponíveis para cada jogador agir durante seu turno.",
      scope: "world",
      config: false,
      type: Number,
      default: 30,
    });

    game.settings.register(MODULE_ID, "enableQuickHUD", {
      name: "SWAG.Settings.EnableQuickHUDName",
      hint: "Exibe o painel flutuante de ações rápidas ao controlar um token.",
      scope: "client",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "enableVisualEffectsHUD", {
      name: "Exibir HUD de Efeitos Ativos (Visual Active Effects)",
      hint: "Exibe barra no topo com condições ativas (Abalado, Ferimentos, etc.) do token selecionado.",
      scope: "client",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "enableTokenColorMarker", {
      name: "Diferenciação Automática de Cores para Tokens Repetidos",
      hint: "Atribui cores distintas no anel do token ao duplicar inimigos ou figurantes na mesma cena.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    
    game.settings.register(MODULE_ID, "enableCelebrateAces", {
      name: "SWAG.Settings.EnableCelebrateAcesName",
      hint: "Dispara celebrações e fanfarras quando um dado explode.",
      scope: "client",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "autoPostConditionCards", {
      name: "Exibir Explicação de Condições no Chat",
      hint: "Ao aplicar uma condição (Abalado, Distraído, Vulnerável, etc.) a um token, posta automaticamente um card no chat explicando as regras oficiais de SWADE para aquela condição.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_ID, "autoPostConditionCards", {
      name: "Exibir Explicação de Condições no Chat",
      hint: "Ao aplicar uma condição (Abalado, Distraído, Vulnerável, etc.) a um token, posta automaticamente um card no chat explicando as regras oficiais de SWADE para aquela condição.",
      scope: "world",
      config: false,
      type: Boolean,
      default: true,
    });
  }

  static mountPublicApi() {
    const automationHooks = new Map();
    const premadesRegistry = new Map();

    const api = {
      // [PT-BR] Mecânicas de Elevação e Sucesso
      // [EN] Raise & Success Mechanics
      calculateRaises: (total, targetNumber = 4, options = {}) => {
        return RaiseCalculator.calculate(total, targetNumber, options);
      },
      formatRaiseResult: (total, targetNumber = 4, lang = game.i18n.lang) => {
        return RaiseCalculator.formatResult(total, targetNumber, lang);
      },

      // [PT-BR] Mecânicas de Dano e Ferimentos
      // [EN] Damage & Wounds Mechanics
      calculateDamage: (params) => {
        return DamageCalculator.calculate(params);
      },
      applyTargetedDamage: async (params) => {
        return TargetCombatManager.applyDamageToTargets(params);
      },

      // [PT-BR] Inspeção de Dados e Áses
      // [EN] Dice & Aces Inspection
      inspectRoll: (roll, options = {}) => {
        return RollInspector.inspect(roll, options);
      },

      // [PT-BR] Inspeção Completa de Fichas (Dossiê de Ator)
      // [EN] Complete Actor Sheet Inspection (Actor Dossier)
      inspectActor: (actorRef) => {
        return ActorInspector.inspect(actorRef);
      },
      resolveActor: (actorRef) => {
        return ActorInspector.resolveActor(actorRef);
      },

      // [PT-BR] Assistente de Configurações Wizard
      // [EN] Settings Wizard Modal
      openSettingsWizard: () => {
        new SettingsWizard().render({ force: true });
      },

      // [PT-BR] Temporizador de Turno
      // [EN] Turn Timer Controls
      startTurnTimer: (combatant) => {
        TurnTimer.start(combatant);
      },
      stopTurnTimer: () => {
        TurnTimer.stop();
      },

      // [PT-BR] Interfaces e HUDs Flutuantes
      // [EN] Floating HUDs and Interfaces
      toggleQuickActionsHUD: () => {
        if (!quickActionsHudInstance) {
          quickActionsHudInstance = new QuickActionsHUD();
        }
        quickActionsHudInstance.render({ force: true });
      },
      toggleVisualEffectsHUD: () => {
        if (!visualEffectsHudInstance) {
          visualEffectsHudInstance = new VisualActiveEffectsHUD();
        }
        visualEffectsHudInstance.render({ force: true });
      },

      // [PT-BR] Efeitos Visuais e Celebrações
      // [EN] Visual FX and Celebrations
      triggerCelebration: (params) => {
        return FxAdapter.triggerCelebration(params);
      },

      // [PT-BR] Automações dos 5 Compêndios Oficiais + Super Poderes (SPC)
      // [EN] Automations for the 5 Official Companions + Super Powers (SPC)
      isSuperPowerType: (type) => isSuperPowerType(type),
      getActorSuperPowers: (actor) => getActorSuperPowers(actor),
      calculateActorSuperPowerSummary: (actor) => calculateActorSuperPowerSummary(actor),
      extractSuperPowerMetadata: (item) => extractSuperPowerMetadata(item),
      postSuperPowerCard: async (item, actor = null) => {
        const meta = extractSuperPowerMetadata(item);
        const owner = actor || item?.actor || null;
        return api.createShowcaseCard("arcane", {
          title: item?.name || "Super Poder",
          subtitle: meta.trapping
            ? `Super Poder (Nível ${meta.level} • ${meta.buildCost} PSP) • ${meta.trapping}`
            : `Super Poder (Nível ${meta.level} • Custo: ${meta.buildCost} PSP)`,
          actorId: owner?.id || null,
          actorName: owner?.name || "Super-Herói",
          actorImg: owner?.img || item?.img || "icons/svg/lightning.svg",
          itemImg: item?.img || "icons/svg/lightning.svg",
          topBadge: { text: `SUPER PODER [${meta.buildCost} PSP]`, class: "bg-warning text-dark fw-bold" },
          statusBadge: {
            text: `Nível ${meta.level}`,
            class: "bg-info text-dark fw-bold",
            icon: "fa-solid fa-mask",
          },
          metaGrid: [
            { label: "NÍVEL", value: `<strong>${meta.level}</strong>`, class: "text-info" },
            { label: "CUSTO PSP", value: `<strong>${meta.buildCost} PSP</strong>`, class: "text-warning" },
            { label: "ALCANCE", value: meta.range, class: "text-light" },
            { label: "DURAÇÃO", value: meta.duration, class: "text-light" },
          ],
          description: item?.system?.description || "Super Poder ativado.",
          tags: meta.modifiers.map((m) => ({
            text: `${m.name} (${m.cost >= 0 ? `+${m.cost}` : m.cost} PSP)`,
            icon: "fa-solid fa-bolt",
            iconColor: "text-warning",
          })),
          showPPBtn: false,
          showPowerStuntBtn: true,
          showRollDamageBtn: Boolean(meta.damage),
          itemId: item?.id || null,
        });
      },
      rollKnockback: (params) => CompanionRulesEngine.rollKnockback(params),
      executePowerStunt: (actor, stuntKey) => CompanionRulesEngine.executePowerStunt(actor, stuntKey),
      rollSuperheroIncapacitation: (actor) => CompanionRulesEngine.rollSuperheroIncapacitation(actor),
      openDowntimeDialog: (actor) => CompanionRulesEngine.openDowntimeDialog(actor),
      executeDowntime: (actor, activity) => CompanionRulesEngine.executeDowntime(actor, activity),
      generateFantasyLoot: (tier) => CompanionRulesEngine.generateFantasyLoot(tier),
      spendClashToken: (actor, actionKey) => CompanionRulesEngine.spendClashToken(actor, actionKey),
      drawHarmonicResonance: (actor) => CompanionRulesEngine.drawHarmonicResonance(actor),
      applySprawlrunnersLogistics: () => CompanionRulesEngine.applySprawlrunnersLogistics(),
      rollFearTable: (params) => CompanionRulesEngine.rollFearTable(params),
      grantViceBenny: (actor) => CompanionRulesEngine.grantViceBenny(actor),
      activateTheSight: (actor) => CompanionRulesEngine.activateTheSight(actor),

      // [PT-BR] Extensibilidade para Módulos de Terceiros e Premades
      // [EN] Extensibility for Third-party Modules & Premades
      registerAutomationHook: (id, triggerFn) => {
        if (typeof triggerFn !== "function") {
          throw new TypeError("triggerFn must be an executable function");
        }
        automationHooks.set(id, triggerFn);
        console.log(`SWAG+ | Automation hook registrado: ${id}`);
      },
      getAutomationHooks: () => automationHooks,

      registerPremade: (powerOrItemId, handlerClass) => {
        premadesRegistry.set(powerOrItemId, handlerClass);
        console.log(`SWAG+ | Premade registrado para item: ${powerOrItemId}`);
      },
      getPremade: (powerOrItemId) => premadesRegistry.get(powerOrItemId),
      getPremades: () => premadesRegistry,

      /**
       * [PT-BR] Cria um card de vitrine (Showcase Card) de alto impacto no Chat para demonstração e testes rápidos.
       * [EN] Creates a high-impact Showcase Card in Chat for quick testing and demonstration.
       * @param {string} [type="attack"] - Tipo de card: 'attack', 'damage', 'arcane', 'edge', 'hindrance', 'item', 'lore'
       * @param {object} [customOverrides={}] - Sobrescrita opcional de campos do template
       * @returns {Promise<ChatMessage>}
       */
      createShowcaseCard: async (type = "attack", customOverrides = {}) => {
        const cardId = `swag-card-${foundry.utils?.randomID ? foundry.utils.randomID() : Math.random().toString(36).substring(2, 9)}`;
        const samplePresets = {
          attack: {
            cardId,
            title: "Tiro com Arco Longo",
            subtitle: "Atirar (Agilidade) vs Aparar/Aparência",
            actorName: "Valeros, o Guardião",
            actorImg: "icons/svg/mystery-man.svg",
            topBadge: { text: "ATACAR", class: "bg-primary" },
            statusBadge: { text: "1 Elevação!", class: "bg-success", icon: "fa-solid fa-bolt" },
            timestamp: "Hoje às 14:32",
            isSuccess: true,
            isRaise: true,
            diceBreakdown: [
              { label: "Atirar d8", total: 10, faces: 8, isAce: true, icon: "fa-solid fa-dice-d8" },
              { label: "Selvagem d6", total: 4, faces: 6, isWild: true, icon: "fa-solid fa-paw" },
            ],
            aceDetails: [
              {
                dieLabel: "Atirar d8",
                explosionCount: 1,
                aceCountText: "1x Ás (2 rolagens)",
                rollsText: "8 + 2",
                total: 10,
                icon: "fa-solid fa-bolt",
                badgeClass: "bg-success-subtle",
              },
            ],
            bestDieLabel: "Melhor Dado: 10",
            modifiers: [
              { label: "+2 Alcance Curto", value: 2, title: "Bônus tático de alcance" },
              { label: "-2 Cobertura Leve", value: -2, title: "Penalidade por cobertura parcial" },
              { label: "+2 Mira", value: 2, title: "Ação de mirar no turno anterior" },
            ],
            description: "Valeros dispara uma flecha de ponta larga com precisão mortal visando o peito do adversário.",
            resultBox: {
              title: "RESULTADO FINAL",
              description: "10 (vs Número-Alvo 4)",
              total: 10,
              scoreClass: "text-success",
              scoreColor: "#10b981",
              borderColor: "rgba(16, 185, 129, 0.4)",
            },
            footerTarget: "Goblin Xamã (Resistência 6)",
            showBennyBtn: true,
            showRerollBtn: true,
            showRollDamageBtn: true,
            showMacroBtn: true,
            macroFormula: "/r {1d8x, 1d6x}kh + 2",
          },
          damage: {
            cardId,
            title: "Dano de Espada Larga",
            subtitle: "Força + d8 de Corte (Penetração 1)",
            actorName: "Valeros, o Guardião",
            actorImg: "icons/svg/mystery-man.svg",
            topBadge: { text: "DANO", class: "bg-danger" },
            statusBadge: { text: "2 Ferimentos!", class: "bg-danger", icon: "fa-solid fa-skull" },
            timestamp: "Hoje às 14:33",
            isDamage: true,
            diceBreakdown: [
              { label: "Força (d8)", total: 6, faces: 8, icon: "fa-solid fa-dice-d8" },
              { label: "Arma (d8)", total: 11, faces: 8, isAce: true, icon: "fa-solid fa-dice-d8" },
              { label: "Bônus Elevação (d6)", total: 5, faces: 6, icon: "fa-solid fa-dice-d6" },
            ],
            aceDetails: [
              {
                dieLabel: "Arma (d8)",
                explosionCount: 1,
                aceCountText: "1x Ás (2 rolagens)",
                rollsText: "8 + 3",
                total: 11,
                icon: "fa-solid fa-bolt",
                badgeClass: "bg-success-subtle",
              },
            ],
            bestDieLabel: "Total: 22",
            modifiers: [
              { label: "+2 Golpe Poderoso", value: 2, title: "Ataque com duas mãos" },
              { label: "-2 Armadura Pesada", value: -2, title: "Resistência do alvo" },
            ],
            description: "O golpe atinge com força esmagadora penetrando as defesas do oponente.",
            resultBox: {
              title: "DANO TOTAL",
              description: "22 (AP 1 vs Resistência 7)",
              total: 22,
              scoreClass: "text-warning",
              scoreColor: "#f59e0b",
              borderColor: "rgba(245, 158, 11, 0.4)",
            },
            footerTarget: "Ogro Chefe",
            calculatedWounds: 2,
            showApplyDamageBtn: true,
            showMacroBtn: true,
            macroFormula: "/r 2d8x + 1d6x",
          },
          arcane: {
            cardId,
            title: "Golpear (Smite)",
            subtitle: "Poder Arcano do Fogo Ancestral",
            actorName: "Seoni, a Conjuradora",
            actorImg: "icons/svg/mystery-man.svg",
            iconClass: "fa-solid fa-fire text-warning",
            iconBgClass: "bg-dark",
            topBadge: { text: "MAGIA", class: "bg-warning text-dark" },
            statusBadge: { text: "Ativo (3 Rodadas)", class: "bg-info text-dark", icon: "fa-solid fa-wand-magic-sparkles" },
            timestamp: "Hoje às 14:34",
            isArcane: true,
            metaGrid: [
              { label: "CUSTO", value: "<strong>2 PP</strong>", class: "text-warning" },
              { label: "ALCANCE", value: "Toque", class: "text-light" },
              { label: "DURAÇÃO", value: "5 Turnos", class: "text-light" },
              { label: "EFEITO", value: "+2 Dano (+4 Elevação)", class: "text-success" },
            ],
            description: "Chamas místicas e douradas envolvem a lâmina da espada, intensificando cada corte com chamas crepitantes.",
            tags: [
              { text: "Dano Mágico de Fogo", icon: "fa-solid fa-fire", iconColor: "text-danger" },
              { text: "Concentração", icon: "fa-solid fa-brain", iconColor: "text-info" },
            ],
            footerSource: { text: "Grimório Arcano de Seoni", icon: "fa-solid fa-book-open" },
            showPPBtn: true,
            ppCost: 2,
            showItemUseBtn: true,
            itemActionLabel: "Conjurar Magia",
            showMacroBtn: true,
            macroFormula: "/r {1d10x, 1d6x}kh",
          },
          edge: {
            cardId,
            title: "Bloqueio Aprimorado",
            subtitle: "Vantagem de Combate (Experiente)",
            actorName: "Valeros",
            iconClass: "fa-solid fa-shield-halved text-primary",
            iconBgClass: "bg-primary bg-opacity-25",
            topBadge: { text: "VANTAGEM", class: "bg-primary" },
            isEdge: true,
            description: "Personagens com Bloqueio Aprimorado são mestres da defesa com armas e escudos. Concede <strong>+2 em Aparar</strong> adicional e anula 2 pontos de bônus de Ataque em Bando de atacantes adjacentes.",
            tags: [
              { text: "Combate", icon: "fa-solid fa-hand-fist", iconColor: "text-warning" },
              { text: "+2 Aparar", icon: "fa-solid fa-shield", iconColor: "text-success" },
            ],
            showCompendiumBtn: true,
            compendiumUuid: "Compendium.swade.edges.Item.improvedBlock",
          },
          hindrance: {
            cardId,
            title: "Leal (Maior)",
            subtitle: "Complicação Social & Personalidade",
            actorName: "Kyra, a Clériga",
            iconClass: "fa-solid fa-heart text-danger",
            iconBgClass: "bg-danger bg-opacity-25",
            topBadge: { text: "COMPLICAÇÃO", class: "bg-danger" },
            statusBadge: { text: "Gatilho de Bene", class: "bg-warning text-dark", icon: "fa-solid fa-coins" },
            isHindrance: true,
            description: "Este personagem nunca abandona seus companheiros em perigo, mesmo que isso custe sua própria vida ou segurança.",
            hindranceTrigger: "Sempre que Kyra arriscar sua vida ou recursos para salvar um aliado, o Mestre deve conceder 1 Bene.",
            grantBennyReason: "Interpretação Heroica da Complicação Leal",
          },
          lore: {
            cardId,
            title: "Ancestralidade Sauriana",
            subtitle: "Raça / Povo dos Ermos Selvagens",
            actorName: "Krag-Tor",
            iconClass: "fa-solid fa-dragon text-indigo",
            iconBgClass: "bg-dark",
            topBadge: { text: "ANCESTRALIDADE", class: "bg-info text-dark" },
            isLore: true,
            description: "Humanoides reptilianos imponentes e resistentes nativos de pântanos inóspitos e selvas antigas.",
            traitList: [
              { name: "Armadura Natural (+2)", desc: "Escamas espessas fornecem +2 de Armadura.", colorClass: "text-success" },
              { name: "Garras / Mordida (For+d4)", desc: "Ataques naturais que causam dano letal.", colorClass: "text-warning" },
              { name: "Sangue Frio", desc: "Penalidade de -2 em Agilidade em climas de frio extremo.", colorClass: "text-danger" },
            ],
            showImportActorBtn: true,
            compendiumUuid: "Compendium.swade.ancestries.Item.saurian",
          },
        };

        const preset = samplePresets[type] || samplePresets.attack;
        const templateData = { ...preset, ...customOverrides };

        const renderFn =
          foundry.applications?.handlebars?.renderTemplate ||
          foundry.applications?.api?.HandlebarsApplicationMixin?.renderTemplate ||
          globalThis.renderTemplate;
        const cardHtml = await renderFn(
          "modules/swade-autogame-plus/templates/compact-action-card.hbs",
          templateData
        );

        return ChatMessage.create({
          content: cardHtml,
          speaker: ChatMessage.getSpeaker({ alias: templateData.actorName || "SWAG+ Showcase" }),
          flags: {
            [MODULE_ID]: {
              isShowcase: true,
              cardType: type,
              templateData,
            },
          },
        });
      },

      openRollModifiersModal: (cardEl, cardId) => {
        const modal = new RollModifiersModal({ cardEl, cardId });
        modal.render({ force: true });
        return modal;
      },
      modifierCatalog: SWADE_MODIFIER_CATALOG,
      version: "1.0.0-beta.1",
    };

    const module = game.modules.get(MODULE_ID);
    if (module) {
      module.api = api;
    }
    globalThis.SWAG = { api };
  }

  static registerHooks() {
    // [PT-BR] Hooks dos Compêndios Oficiais (Super Força Métrica/Imperial, Mochila 50%, Massacre e Heavy Metal)
    // [EN] Official Companion Hooks (Metric/Imperial Super Strength, 50% Backpack, Slaughter Rules, and Heavy Metal)
    Hooks.on("swadeActorPrepareDerivedData", (actor) => {
      CompanionRulesEngine.applySuperStrengthToActor(actor);
      CompanionRulesEngine.applyFantasyBackpackEncumbrance(actor);
    });

    Hooks.on("preCreateActor", (actorDoc) => {
      CompanionRulesEngine.onPreCreateActorSlaughterRules(actorDoc);
    });

    Hooks.on("renderSwadeItemSheetV2", (app, html) => {
      CompanionRulesEngine.injectHeavyMetalBadges(app, html);
    });

    Hooks.on("renderSwadeVehicleSheetV2", (app, html) => {
      CompanionRulesEngine.injectHeavyMetalBadges(app, html);
    });

    // [PT-BR] Marcador de cor em duplicatas de tokens
    Hooks.on("preCreateToken", (tokenDoc) => {
      TokenColorMarker.onPreCreateToken(tokenDoc);
    });

    // [PT-BR] Temporizador de turno no Combate
    Hooks.on("updateCombat", (combat, updates) => {
      if (!game.settings.get(MODULE_ID, "enableTurnTimer")) {
        return;
      }
      if (!combat.started) {
        return;
      }

      if ("round" in updates || "turn" in updates) {
        const combatant = combat.combatant;
        if (combatant) {
          TurnTimer.start(combatant);
        }
      }
    });

    Hooks.on("deleteCombat", () => {
      TurnTimer.stop();
    });

    // [PT-BR] Atualizar HUDs ao controlar tokens
    Hooks.on("controlToken", (token, controlled) => {
      if (game.settings.get(MODULE_ID, "enableVisualEffectsHUD")) {
        if (!visualEffectsHudInstance) {
          visualEffectsHudInstance = new VisualActiveEffectsHUD();
        }
        visualEffectsHudInstance.render({ force: true });
      }

      if (controlled && game.settings.get(MODULE_ID, "enableQuickHUD")) {
        if (quickActionsHudInstance) {
          quickActionsHudInstance.render({ force: false });
        }
      }
    });

    // [PT-BR] Postar Explicação de Condição Automaticamente no Chat quando adicionada a um Ator/Token
    // [EN] Automatically Post Condition Explanation Card in Chat when added to an Actor/Token
    Hooks.on("createActiveEffect", async (effect, _options, userId) => {
      if (game.user?.id !== userId) {
        return;
      }
      if (!game.settings.get(MODULE_ID, "autoPostConditionCards")) {
        return;
      }

      const actor = effect.parent;
      if (!actor || actor.documentName !== "Actor") {
        return;
      }

      // Identifica o ID da condição pelos statuses ou pelo nome
      const statusId =
        Array.from(effect.statuses || [])[0] ||
        (effect.name || "").toLowerCase().trim();

      const normalizedKey = statusId.toLowerCase().replace(/[^a-z]/g, "");
      const knownKeys = ["shaken", "distracted", "vulnerable", "entangled", "bound", "stunned", "incapacitated", "blind", "prone"];
      const matchedKey = knownKeys.find((k) => normalizedKey.includes(k) || (effect.name || "").toLowerCase().includes(k));

      if (!matchedKey) {
        return;
      }

      const condName = t(`SWAG.Combat.Conditions.${matchedKey}.name`, effect.name || "Condição");
      const condDesc = t(`SWAG.Combat.Conditions.${matchedKey}.desc`, "Condição de combate aplicada ao personagem.");

      const cardId = `swag-cond-${foundry.utils?.randomID ? foundry.utils.randomID() : Math.random().toString(36).substring(2, 9)}`;
      const renderFn =
        foundry.applications?.handlebars?.renderTemplate ||
        foundry.applications?.api?.HandlebarsApplicationMixin?.renderTemplate ||
        globalThis.renderTemplate;

      const templateData = {
        cardId,
        title: condName,
        subtitle: `${actor.name} &bull; ${t("SWAG.Combat.ConditionDescriptionHeader", "Regras da Condição (SWADE)")}`,
        actorName: actor.name,
        actorImg: actor.img,
        iconClass: effect.img ? null : "fa-solid fa-triangle-exclamation text-warning",
        itemImg: effect.img || "icons/svg/daze.svg",
        topBadge: { text: "CONDIÇÃO", class: "bg-warning text-dark fw-bold" },
        statusBadge: { text: condName, class: "bg-danger text-light fw-bold", icon: "fa-solid fa-bolt" },
        description: condDesc,
        isLore: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const cardHtml = await renderFn(
        "modules/swade-autogame-plus/templates/compact-action-card.hbs",
        templateData
      );

      await ChatMessage.create({
        content: cardHtml,
        speaker: ChatMessage.getSpeaker({ actor }),
        flags: {
          [MODULE_ID]: {
            isConditionCard: true,
            conditionKey: matchedKey,
          },
        },
      });
    });

    // [PT-BR] Renderização do Card Compacto, Interatividade de Botões e Celebrações de Ás
    // [EN] Compact Action Card Rendering, Button Interactivity & Ace Celebrations
    const handleChatMessage = async (message, html) => {
      const contentEl = html instanceof HTMLElement ? html : html[0];
      if (!contentEl) {
        return;
      }

      // [PT-BR] Registro de Listeners para botões interativos do Card (inclusive cards de vitrine e customizados)
      // [EN] Listeners registration for interactive Card buttons (including showcase & custom cards)
      if (contentEl.querySelector(".swag-card")) {
        contentEl.classList.add("swag-message-wrapper");
        this.attachCardActionListeners(contentEl, message);
        return;
      }

      const roll = message.rolls?.[0];
      const swadeFlags = message.flags?.swade || {};
      const itemData = swadeFlags.item || null;
      const domItemCard = contentEl.querySelector(".swade.chat-card.item-card");
      const itemUuid =
        message.system?.uuid ||
        domItemCard?.dataset?.itemUuid ||
        itemData?.uuid ||
        null;
      const isItemCard =
        message.type === "itemCard" ||
        Boolean(message.system?.uuid) ||
        Boolean(domItemCard) ||
        Boolean(itemData) ||
        (message.content && message.content.includes("chat-card item-card"));

      // Se não tiver rolagem e nem for exibição de item, não intercepta mensagens puramente textuais
      if (!roll && !isItemCard) {
        return;
      }

      // Se a mensagem já for um card gerado pelo módulo, evita re-renderizar em loop
      if (message.flags?.[MODULE_ID]?.isCompactCard) {
        contentEl.classList.add("swag-message-wrapper");
        this.attachCardActionListeners(contentEl, message, roll);
        return;
      }

      // Checar se houve explosão de dados (Ás) para celebrar
      let inspected = null;
      if (roll) {
        inspected = RollInspector.inspect(roll);
        const hasAce =
          inspected?.diceBreakdown?.some((d) => d.explosionCount > 0) ||
          (inspected?.wildDieInfo?.explosionCount ?? 0) > 0;
        if (hasAce) {
          FxAdapter.triggerCelebration({ isAce: true });
        }
      }

      if (!game.settings.get(MODULE_ID, "enableCompactCard")) {
        return;
      }

      // [PT-BR] Resolver Ator e Item (suporta tanto message.rolls quanto message.type === "itemCard" do SWADE v14)
      // [EN] Resolve Actor & Item (supports both message.rolls and SWADE v14 message.type === "itemCard")
      let resolvedDoc = message.system?._item || null;
      if (!resolvedDoc && itemUuid && typeof fromUuidSync === "function") {
        try {
          resolvedDoc = fromUuidSync(itemUuid);
        } catch {
          resolvedDoc = null;
        }
      }

      const actor =
        resolvedDoc?.parent ||
        (message.speaker?.actor ? game.actors?.get(message.speaker.actor) : null) ||
        (message.speaker?.token ? canvas.tokens?.get(message.speaker.token)?.actor : null);

      const domItemId = domItemCard?.dataset?.itemId || itemData?.id || null;
      const realItem =
        resolvedDoc ||
        (domItemId && actor?.items ? actor.items.get(domItemId) : null) ||
        itemData ||
        null;

      const itemType = realItem?.type || itemData?.type || null;
      const rollType = swadeFlags.rollType || (roll?.constructor?.name === "DamageRoll" ? "damage" : (roll ? "trait" : "item"));
      const isDamage =
        rollType === "damage" ||
        roll?.constructor?.name === "DamageRoll" ||
        Boolean(message.flavor && /^(dano|damage)\b/i.test(message.flavor.trim()));

      const isSuperPower = isSuperPowerType(itemType);
      const superMeta = isSuperPower ? extractSuperPowerMetadata(realItem || itemData) : null;
      const isArcane = isSuperPower || itemType === "power" || swadeFlags.animData?.type === "power";
      const isEdge = !roll && itemType === "edge";
      const isHindrance = !roll && itemType === "hindrance";
      const isLore = !roll && (itemType === "ability" || itemType === "ancestry");
      const isWeaponOrGear = !roll && !isArcane && !isEdge && !isHindrance && !isLore && isItemCard;
      const isAttack = Boolean(roll) && !isDamage;

      const targetNumber = swadeFlags.targetNumber ?? 4;

      const cardId =
        "swag-card-" +
        (message.id || (foundry.utils?.randomID ? foundry.utils.randomID() : Math.random().toString(36).substring(2, 9)));

      const actorDisplayName = actor?.name || message.speaker?.alias || "Personagem";
      const rawFlavor = (message.flavor || realItem?.name || itemData?.name || "").trim();

      const isBennyReroll =
        Boolean(message.flags?.[MODULE_ID]?.isBennyReroll) ||
        Boolean(message.flags?.swade?.isBennyReroll) ||
        /gasto de bene/i.test(message.flavor || "");
      const isReroll =
        !isBennyReroll &&
        (Boolean(message.flags?.[MODULE_ID]?.isReroll) ||
          Boolean(message.flags?.swade?.isReroll) ||
          /re-rolagem|reroll/i.test(message.flavor || ""));

      // [PT-BR] Limpar nome do traço para exibir igual ao showcase ("Agilidade", "Atletismo", "Lutar")
      // [EN] Clean trait name to display like showcase ("Agilidade", "Atletismo", "Lutar")
      const cleanTraitName = rawFlavor
        .replace(/\s*(teste de atributo|attribute roll|teste de per[ií]cia|skill roll|re-rolagem:|re-rolagem|reroll|\(gasto de bene\)|roll)\s*/gi, "")
        .replace(/^[:\-–•]+\s*|\s*[:\-–•]+$/g, "")
        .trim() || rawFlavor || (isDamage ? "Dano" : "Traço");

      const isAttributeRoll = Boolean(roll) && !isDamage && (/atributo|attribute/i.test(rawFlavor) || (!realItem && /^(agilidade|ast[uú]cia|esp[ií]rito|for[cç]a|vigor|agility|smarts|spirit|strength|vigor)/i.test(cleanTraitName)));
      const hasWeaponOrPowerDamage = Boolean(
        realItem?.system?.damage ||
        superMeta?.damage ||
        itemType === "weapon" ||
        (itemType === "power" && realItem?.system?.damage)
      );

      // [PT-BR] Detectar Modificadores Automáticos da Ficha + Pílulas Rápidas de Regra
      // [EN] Detect Automatic Sheet Modifiers + Quick Rule Pills
      let dynamicModifiers = null;
      let modLabel = "Modificadores de Regra:";
      let autoUnappliedDelta = 0;

      if (roll) {
        const modBuild = RollModifiersEngine.buildInitialModifiers({
          actor,
          roll,
          item: realItem,
          cleanTraitName,
          isDamage,
          isArcane,
          hasWeaponOrPowerDamage,
        });
        dynamicModifiers = modBuild.modifiers;
        modLabel = modBuild.modLabel;
        autoUnappliedDelta = modBuild.autoUnappliedDelta || 0;

        if (isAttack && game.settings.get(MODULE_ID, "autoDesperateAttack") && hasWeaponOrPowerDamage) {
          dynamicModifiers.push({
            id: "desperate_attack",
            label: "+2 Desesperado (-2 Dano)",
            value: 2,
            title: "Ataque Desesperado (+2 Lutar / -2 Dano)",
            activeClass: "",
          });
        }

        if (isAttack && isArcane && actor && game.settings.get(MODULE_ID, "ruleArmorInterference")) {
          const interference = CompanionRulesEngine.checkSwpfArmorInterference(actor);
          if (interference.hasInterference) {
            dynamicModifiers.push({
              id: "swpf_armor_interference",
              label: "-4 Armadura (SWPF)",
              value: -4,
              title: interference.reason,
              activeClass: "active-negative",
            });
            autoUnappliedDelta -= 4;
          }
        }
      }

      const effectiveTotal = roll ? roll.total + autoUnappliedDelta : 0;
      const attackResult = isAttack && roll ? RaiseCalculator.calculate(effectiveTotal, targetNumber) : null;
      const isRaise = (attackResult?.raises ?? 0) > 0;
      const isSuccess = attackResult?.isSuccess ?? (roll ? effectiveTotal >= targetNumber : false);

      // [PT-BR] Choque de Retorno Sombrio (Horror Companion): Falha Crítica Arcana reduz 1 de Sanidade
      // [EN] Dark Backlash (Horror Companion): Arcane Critical Failure deducts 1 Sanity
      if (isArcane && attackResult?.isCriticalFailure && actor && game.settings.get(MODULE_ID, "enableHorrorSupport")) {
        if (actor.system?.additionalStats?.sanity) {
          const curSanity = Number(actor.system.additionalStats.sanity.value ?? 5);
          await actor.update({ "system.additionalStats.sanity.value": Math.max(0, curSanity - 1) });
        }
      }

      // [PT-BR] Construção de Título e Subtítulo fiéis ao swag_chat_roll_cards_showcase.html
      // [EN] Title & Subtitle construction faithful to swag_chat_roll_cards_showcase.html
      const tnAbbr = t("SWAG.Card.TargetNumberAbbr", "NA");
      let title = rawFlavor || "Ação de Savage Worlds";
      let subtitle = "";
      let iconClass = null;
      let iconBgClass = "";

      if (roll) {
        const firstTraitDie = inspected?.diceBreakdown?.[0];
        const dieStr = firstTraitDie ? `d${firstTraitDie.faces}` : (roll.formula || "d6");
        if (isDamage) {
          const dmgPrefix = t("SWAG.Card.DamagePrefix", "Dano");
          title = rawFlavor.startsWith(dmgPrefix) || rawFlavor.startsWith("Dano") ? rawFlavor : `${dmgPrefix}: ${cleanTraitName}`;
          const apVal = realItem?.system?.ap || swadeFlags.ap || 0;
          subtitle = `${t("SWAG.Card.ByActor", "Por")} <strong>${actorDisplayName}</strong> &bull; ${t("SWAG.Card.Formula", "Fórmula")}: <strong>${roll.formula}</strong>${apVal ? ` &bull; ${t("SWAG.Combat.AP", "PA")} ${apVal}` : ""}`;
        } else if (isArcane) {
          title = `${actorDisplayName} &bull; ${cleanTraitName}`;
          subtitle = isSuperPower
            ? `Super Poder (${t("SPC.SuperPower.Level.label", "Nível")} ${superMeta.level} &bull; ${superMeta.buildCost} PSP)${superMeta.trapping ? " &bull; " + superMeta.trapping : ""}`
            : `${t("SWAG.Card.ArcaneRoll", "Conjuração Arcana")}: <strong class="text-purple">${cleanTraitName} (${dieStr})</strong> vs ${tnAbbr} ${targetNumber}`;
        } else if (hasWeaponOrPowerDamage && realItem) {
          title = `${actorDisplayName} &bull; ${realItem.name}`;
          subtitle = `${t("SWAG.Card.AttackRoll", "Ataque")}: <strong class="text-warning">${cleanTraitName} (${dieStr})</strong> vs ${tnAbbr} ${targetNumber}`;
        } else if (isAttributeRoll) {
          title = actorDisplayName;
          subtitle = `${t("SWAG.Card.AttributeRoll", "Teste de Atributo")}: <strong class="text-info">${cleanTraitName} (${dieStr})</strong> vs ${tnAbbr} ${targetNumber}`;
        } else {
          title = actorDisplayName;
          subtitle = `${t("SWAG.Card.SkillRoll", "Teste de Perícia")}: <strong class="text-success">${cleanTraitName} (${dieStr})</strong> vs ${tnAbbr} ${targetNumber}`;
        }
      } else if (isItemCard) {
        const itemName = realItem?.name || domItemCard?.querySelector(".item-name h3, .item-name")?.textContent?.trim() || rawFlavor || "Item";
        if (isEdge) {
          title = `${t("SWAG.Card.EdgePrefix", "Vantagem")}: ${itemName}`;
          const reqStr =
            domItemCard?.querySelector(".card-footer span")?.textContent?.trim() ||
            realItem?.system?.requirements?.value ||
            "Novato";
          subtitle = `${t("SWAG.Card.Requirements", "Requisitos")}: <strong>${reqStr}</strong> &bull; ${actorDisplayName}`;
          iconClass = "fa-solid fa-medal text-warning";
          iconBgClass = "bg-warning-subtle";
        } else if (isHindrance) {
          title = `${t("SWAG.Card.HindrancePrefix", "Complicação")}: ${itemName}`;
          subtitle = `${t("SWAG.Card.BelongsTo", "Pertence a")}: <strong>${actorDisplayName}</strong>`;
          iconClass = "fa-solid fa-triangle-exclamation text-danger";
          iconBgClass = "bg-danger-subtle";
        } else if (isLore) {
          title = `${t("SWAG.Card.AbilityPrefix", "Habilidade")}: ${itemName}`;
          const subTypeLabel = realItem?.system?.subtype === "ancestry" ? "Ancestralidade / Raça" : "Capacidade Especial";
          subtitle = `${subTypeLabel} &bull; <strong>${actorDisplayName}</strong>`;
          iconClass = "fa-solid fa-dna text-indigo";
          iconBgClass = "bg-primary-subtle";
        } else if (isArcane) {
          title = `${actorDisplayName} &bull; ${itemName}`;
          subtitle = isSuperPower
            ? `Super Poder (${t("SPC.SuperPower.Level.label", "Nível")} ${superMeta.level} &bull; ${superMeta.buildCost} PSP)`
            : `Poder Arcano &bull; ${t("SWAG.Card.Range", "Alcance")}: <strong>${realItem?.system?.range || "Toque"}</strong>`;
          iconClass = "fa-solid fa-wand-magic-sparkles text-purple";
          iconBgClass = "bg-purple-subtle";
        } else {
          title = itemName;
          const weightVal = realItem?.system?.weight ?? 0;
          const priceVal = realItem?.system?.price ?? 0;
          subtitle = `${t("SWAG.Card.Carrier", "Portador")}: <strong>${actorDisplayName}</strong>${weightVal ? ` &bull; ${t("SWAG.Card.Weight", "Peso")}: <strong>${weightVal}</strong>` : ""}${priceVal ? ` &bull; ${t("SWAG.Card.Value", "Valor")}: <strong>${priceVal}</strong>` : ""}`;
        }
      }

      // [PT-BR] Extrair Descrição, Chips/Tags e Botões de Ação de Item (para Vantagens, Habilidades e Armas do SWADE v14)
      // [EN] Extract Description, Chips/Tags & Item Action Buttons (for SWADE v14 Edges, Abilities, and Weapons)
      let descriptionHtml = null;
      const cardTags = [];
      const itemActions = [];

      if (!roll && isItemCard) {
        const domDesc = domItemCard?.querySelector(".card-content .container, .card-content")?.innerHTML?.trim();
        descriptionHtml = domDesc || realItem?.system?.description || null;

        if (domItemCard) {
          domItemCard.querySelectorAll(".card-footer span").forEach((chipEl) => {
            const text = chipEl.textContent?.trim();
            if (!text) {
              return;
            }

            const iconEl = chipEl.querySelector("i");
            const rawIcon = iconEl?.className || "";
            const nativeTooltip =
              chipEl.dataset?.tooltip ||
              chipEl.getAttribute("title") ||
              iconEl?.dataset?.tooltip ||
              iconEl?.getAttribute("title") ||
              "";

            let icon = "fa-solid fa-tag";
            let iconColor = "text-info";
            let tooltip = nativeTooltip;

            if (/fist|burst/i.test(rawIcon)) {
              icon = "fa-solid fa-hand-fist";
              iconColor = "text-warning";
              tooltip = `${t("SWAG.Card.TooltipDamage", "Dano da Arma / Poder")}: ${text}`;
            } else if (/shield/i.test(rawIcon)) {
              icon = "fa-solid fa-shield-halved";
              iconColor = "text-info";
              tooltip = `${t("SWAG.Card.TooltipAP", "PA (Penetração de Armadura — ignora pontos de Armadura do alvo)")}: ${text}`;
            } else if (/users|user/i.test(rawIcon)) {
              icon = "fa-solid fa-user-shield";
              iconColor = "text-primary";
              tooltip = `${t("SWAG.Card.TooltipParry", "Bônus de Aparar / Força Mínima")}: ${text}`;
            } else if (/dumbbell|weight/i.test(rawIcon)) {
              icon = "fa-solid fa-dumbbell";
              iconColor = "text-secondary";
              tooltip = `${t("SWAG.Card.TooltipMinStr", "Força Mínima Exigida")}: ${text}`;
            } else if (/ruler|bullseye|crosshairs/i.test(rawIcon)) {
              icon = "fa-solid fa-ruler";
              iconColor = "text-light";
              tooltip = `${t("SWAG.Card.TooltipRange", "Alcance (Curto / Médio / Longo)")}: ${text}`;
            } else if (/tachometer|gauge/i.test(rawIcon)) {
              icon = "fa-solid fa-gauge-high";
              iconColor = "text-success";
              tooltip = `${t("SWAG.Card.TooltipRoF", "CdT (Cadência de Tiro — Tiros por Ação)")}: ${text}`;
            } else if (/sticky-note|note/i.test(rawIcon)) {
              icon = "fa-solid fa-note-sticky";
              iconColor = "text-warning";
              tooltip = `${t("SWAG.Card.TooltipNotes", "Propriedades e Observações do Item")}: ${text}`;
            } else if (/box|cubes|layer/i.test(rawIcon)) {
              icon = "fa-solid fa-cubes";
              iconColor = "text-info";
              tooltip = `${t("SWAG.Card.TooltipShots", "Munição / Cargas")}: ${text}`;
            } else if (rawIcon) {
              icon = rawIcon;
              tooltip = nativeTooltip || text;
            } else if (isArcane || itemType === "power") {
              const lowerText = text.toLowerCase();
              if (/\b\d+\s*pp\b/i.test(text) || lowerText.includes("pp")) {
                icon = "fa-solid fa-bolt";
                iconColor = "text-purple";
                tooltip = `${t("SWAG.Card.TooltipCostPP", "Custo em Pontos de Poder (PP)")}: ${text}`;
              } else if (lowerText.includes("novato") || lowerText.includes("experiente") || lowerText.includes("veterano") || lowerText.includes("heroico") || lowerText.includes("lendário") || lowerText.includes("novice") || lowerText.includes("seasoned") || lowerText.includes("veteran") || lowerText.includes("heroic") || lowerText.includes("legendary")) {
                icon = "fa-solid fa-graduation-cap";
                iconColor = "text-info";
                tooltip = `${t("SWAG.Card.TooltipRequirements", "Estágio Mínimo Exigido")}: ${text}`;
              } else if (lowerText.includes("instantânea") || lowerText.includes("instant") || lowerText.includes("rodada") || lowerText.includes("turno") || lowerText.includes("minuto") || lowerText.includes("hora") || lowerText.includes("concentração")) {
                icon = "fa-solid fa-hourglass-half";
                iconColor = "text-light";
                tooltip = `${t("SWAG.Card.TooltipDuration", "Duração do Efeito")}: ${text}`;
              } else if (text === "0" || (realItem?.system?.ap !== undefined && String(realItem.system.ap) === text)) {
                icon = "fa-solid fa-shield-halved";
                iconColor = "text-info";
                tooltip = `${t("SWAG.Card.TooltipAP", "PA (Penetração de Armadura)")}: ${text}`;
              } else if (realItem?.system?.range && String(realItem.system.range) === text) {
                icon = "fa-solid fa-ruler";
                iconColor = "text-light";
                tooltip = `${t("SWAG.Card.TooltipRange", "Alcance do Poder")}: ${text}`;
              } else if (realItem?.system?.damage && String(realItem.system.damage) === text) {
                icon = "fa-solid fa-burst";
                iconColor = "text-warning";
                tooltip = `${t("SWAG.Card.TooltipDamage", "Dano do Poder")}: ${text}`;
              } else {
                icon = "fa-solid fa-sparkles";
                iconColor = "text-warning";
                tooltip = `Manifestação / Detalhe: ${text}`;
              }
            } else if (isEdge) {
              tooltip = `${t("SWAG.Card.RequirementsLabel", "Requisitos:")} ${text}`;
            } else {
              tooltip = `${t("SWAG.Card.TooltipNotes", "Propriedades e Observações do Item")}: ${text}`;
            }

            cardTags.push({
              text,
              icon,
              iconColor,
              tooltip,
            });
          });
        }

        const hasPowerOrWeaponAttack =
          realItem?.type === "weapon" ||
          realItem?.type === "power" ||
          isArcane ||
          Boolean(realItem?.system?.damage) ||
          Boolean(realItem?.system?.actions?.trait) ||
          Boolean(domItemCard?.querySelector(".trait-rolls, .damage-rolls"));

        if (hasPowerOrWeaponAttack) {
          const traitName =
            domItemCard?.querySelector('.trait-rolls button[data-action="formula"]')?.textContent?.trim() ||
            realItem?.system?.actions?.trait ||
            (isArcane ? (realItem?.system?.arcane || "Conjurar") : "Atacar");
          const dmgFormula =
            domItemCard?.querySelector('.damage-rolls button[data-action="damage"]')?.textContent?.trim() ||
            realItem?.system?.damage ||
            (isArcane && realItem?.name?.toLowerCase().includes("raio") ? "2d6x" : null);

          itemActions.push({
            label: `Rolar ${traitName}`,
            icon: isArcane ? "fa-solid fa-wand-magic-sparkles" : "fa-solid fa-crosshairs",
            btnClass: isArcane ? "btn-outline-purple text-light" : "btn-outline-info",
            swagAction: "item-card-roll-trait",
            swadeAction: "formula",
          });

          if (dmgFormula) {
            itemActions.push({
              label: `Dano (${dmgFormula})`,
              icon: "fa-solid fa-burst",
              btnClass: "btn-warning text-dark",
              swagAction: "roll-damage",
              swadeAction: "damage",
            });
          }
        }
      }

      if (isSuperPower && superMeta?.modifiers?.length) {
        for (const m of superMeta.modifiers) {
          cardTags.push({
            text: `${m.name} (${m.cost >= 0 ? `+${m.cost}` : m.cost} PSP)`,
            icon: "fa-solid fa-bolt",
            iconColor: "text-warning",
          });
        }
      }

      // [PT-BR] Metadados de Poder Arcano, Superpoder ou Arma (1 item por linha + Tooltips explicativos)
      // [EN] Metadata Grid for Arcane Power, Super Power, or Weapon (1 item per row + Explanatory Tooltips)
      let metaGrid = null;
      if (isSuperPower && superMeta) {
        metaGrid = [
          {
            label: "NÍVEL",
            value: `<strong>${superMeta.level}</strong>`,
            class: "text-info",
            tooltip: `Nível do Superpoder (${superMeta.level})`,
          },
          {
            label: "CUSTO PSP",
            value: `<strong>${superMeta.buildCost} PSP</strong>`,
            class: "text-warning",
            tooltip: t("SWAG.Card.TooltipCostPP", "Custo em Pontos de Poder (PP)"),
          },
          {
            label: t("SWAG.Card.MetaRange", "ALCANCE"),
            value: superMeta.range,
            class: "text-light",
            tooltip: t("SWAG.Card.TooltipRange", "Alcance (Curto / Médio / Longo)"),
          },
          {
            label: t("SWAG.Card.MetaDuration", "DURAÇÃO"),
            value: superMeta.duration,
            class: "text-light",
            tooltip: t("SWAG.Card.TooltipDuration", "Duração do Poder"),
          },
        ];
      } else if (itemType === "power" && realItem?.system) {
        metaGrid = [
          {
            label: t("SWAG.Card.MetaCost", "CUSTO"),
            value: `<strong>${realItem.system.pp || 1} PP</strong>`,
            class: "text-purple",
            tooltip: t("SWAG.Card.TooltipCostPP", "Custo em Pontos de Poder (PP)"),
          },
          {
            label: t("SWAG.Card.MetaRange", "ALCANCE"),
            value: realItem.system.range || "Toque",
            class: "text-light",
            tooltip: t("SWAG.Card.TooltipRange", "Alcance (Curto / Médio / Longo)"),
          },
          {
            label: t("SWAG.Card.MetaDuration", "DURAÇÃO"),
            value: realItem.system.duration || "Instantânea",
            class: "text-light",
            tooltip: t("SWAG.Card.TooltipDuration", "Duração do Poder"),
          },
          ...(realItem.system.damage
            ? [
                {
                  label: t("SWAG.Card.MetaDamage", "DANO"),
                  value: realItem.system.damage,
                  class: "text-warning",
                  tooltip: t("SWAG.Card.TooltipDamage", "Dano da Arma / Poder"),
                },
              ]
            : []),
        ];
      } else if (!roll && itemType === "weapon" && realItem?.system) {
        metaGrid = [
          {
            label: t("SWAG.Card.MetaDamage", "DANO"),
            value: `<strong>${realItem.system.damage || "—"}</strong>`,
            class: "text-warning",
            tooltip: t("SWAG.Card.TooltipDamage", "Dano da Arma / Poder"),
          },
          {
            label: t("SWAG.Card.MetaAP", "PA"),
            value: `<strong>${realItem.system.ap || 0}</strong>`,
            class: "text-info",
            tooltip: t("SWAG.Card.TooltipAP", "PA (Penetração de Armadura — ignora pontos de Armadura do alvo)"),
          },
          {
            label: t("SWAG.Card.MetaRange", "ALCANCE"),
            value: realItem.system.range || "Corpo a Corpo",
            class: "text-light",
            tooltip: t("SWAG.Card.TooltipRange", "Alcance (Curto / Médio / Longo)"),
          },
          {
            label: t("SWAG.Card.MetaRoF", "CDT"),
            value: String(realItem.system.rof || 1),
            class: "text-light",
            tooltip: t("SWAG.Card.TooltipRoF", "CdT (Cadência de Tiro — Tiros por Ação)"),
          },
        ];
      }

      const enableKnockback =
        Boolean(game.settings.get(MODULE_ID, "enableSuperPowersSupport")) ||
        Boolean(game.settings.get(MODULE_ID, "ruleKnockback"));

      // [PT-BR] Pílulas de dados com rótulos claros ("Agilidade d6: 4", "Selvagem d6: 2") e Detalhamento de Áses em box dedicado
      // [EN] Dice pills with clear labels ("Agilidade d6: 4", "Selvagem d6: 2") and Ace Breakdown in dedicated box
      const aceDetails = [];
      const diceBreakdown = [
        ...(inspected?.diceBreakdown || []).map((d, idx) => {
          const dieLabel = isDamage
            ? (idx === 0 && !realItem ? `Dano d${d.faces}` : (d.flavor || `d${d.faces}`))
            : `${cleanTraitName} d${d.faces}`;
          if (d.explosionCount > 0) {
            const rollsArr = d.values || d.rolls || [d.total];
            aceDetails.push({
              dieLabel,
              explosionCount: d.explosionCount,
              aceCountText: tf("SWAG.Card.AceCountFormat", { count: d.explosionCount, rolls: rollsArr.length }, `${d.explosionCount}x Ás (${rollsArr.length} rolagens)`),
              rollsText: rollsArr.join(" + "),
              total: d.total,
              icon: "fa-solid fa-bolt",
              badgeClass: "bg-success-subtle",
            });
          }
          return {
            label: dieLabel,
            total: d.total,
            details: null,
            faces: d.faces,
            isAce: d.explosionCount > 0,
            isWild: false,
            isArcane,
            tooltip: `Dado rolou ${(d.values || [d.total]).join(" + ")}`,
          };
        }),
        ...(inspected?.wildDieInfo
          ? (() => {
              const wd = inspected.wildDieInfo;
              const wdLabel = tf("SWAG.Card.WildDieFull", { faces: wd.faces }, `Dado Selvagem d${wd.faces}`);
              if (wd.explosionCount > 0) {
                const rollsArr = wd.values || [wd.total];
                aceDetails.push({
                  dieLabel: wdLabel,
                  explosionCount: wd.explosionCount,
                  aceCountText: tf("SWAG.Card.AceCountFormat", { count: wd.explosionCount, rolls: rollsArr.length }, `${wd.explosionCount}x Ás (${rollsArr.length} rolagens)`),
                  rollsText: rollsArr.join(" + "),
                  total: wd.total,
                  icon: "fa-solid fa-paw",
                  badgeClass: "bg-warning-subtle",
                });
              }
              return [
                {
                  label: tf("SWAG.Card.WildDie", { faces: wd.faces }, `Selvagem d${wd.faces}`),
                  total: wd.total,
                  details: null,
                  faces: wd.faces,
                  isAce: wd.explosionCount > 0,
                  isWild: true,
                  tooltip: wdLabel,
                },
              ];
            })()
          : []),
      ];

      // [PT-BR] Se for rolagem de dano e houver alvo selecionado, usa a Resistência efetiva real do alvo para calcular os Ferimentos exibidos no card
      // [EN] If damage roll and a target is selected, use target's real effective Toughness to calculate Wounds displayed on card
      const firstTargetToken = game.user?.targets ? Array.from(game.user.targets)[0] : null;
      const firstTargetActor = firstTargetToken?.actor || null;
      const damageAp = Number(realItem?.system?.ap ?? swadeFlags.ap ?? 0);
      const targetToughness = Number(firstTargetActor?.system?.stats?.toughness?.value ?? 4);
      const targetArmor = Number(firstTargetActor?.system?.stats?.toughness?.armor ?? 0);
      const effectiveTargetArmor = Math.max(0, targetArmor - damageAp);
      const effectiveTargetToughness = Math.max(1, targetToughness - (targetArmor - effectiveTargetArmor));
      const damageMargin = effectiveTotal - effectiveTargetToughness;
      const calculatedWounds =
        isDamage && roll
          ? damageMargin >= 4
            ? Math.floor(damageMargin / 4)
            : damageMargin >= 0 && firstTargetActor?.statuses?.has?.("shaken")
              ? 1
              : 0
          : 0;

      const templateData = {
        cardId,
        targetNumber: isDamage ? effectiveTargetToughness : targetNumber,
        actorId: actor?.id || null,
        actorName: actorDisplayName,
        actorImg: actor?.img || realItem?.img || itemData?.img || "icons/svg/mystery-man.svg",
        itemImg: realItem?.img || itemData?.img || "icons/svg/d20-grey.svg",
        iconClass,
        iconBgClass,
        title,
        subtitle,
        isReroll,
        isBennyReroll,
        timestamp: new Date(message.timestamp || Date.now()).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSuccess: isSuccess && !isRaise && !isDamage,
        isRaise: isRaise && !isDamage,
        isCriticalFailure: attackResult?.isCriticalFailure,
        isCriticalSuccess: attackResult?.isCriticalSuccess,
        isDamage,
        isArcane,
        isEdge,
        isHindrance,
        isLore,
        isItem: isWeaponOrGear,
        topBadge: isDamage
          ? { text: t("SWAG.Card.DamagePrefix", "DANO").toUpperCase(), class: "bg-warning text-dark fw-bold" }
          : isSuperPower
            ? { text: `SUPER PODER [${superMeta.buildCost} PSP]`, class: "bg-warning text-dark fw-bold" }
            : isEdge
              ? { text: t("SWAG.Card.EdgePrefix", "VANTAGEM").toUpperCase(), class: "bg-warning text-dark fw-bold" }
              : isHindrance
                ? { text: realItem?.system?.major ? t("SWAG.Card.Major", "MAIOR") : t("SWAG.Card.Minor", "MENOR"), class: "bg-danger text-light fw-bold" }
                : isLore
                  ? { text: t("SWAG.Card.AbilityPrefix", "HABILIDADE").toUpperCase(), class: "bg-purple text-light fw-bold" }
                  : isWeaponOrGear
                    ? {
                        text:
                          itemType === "weapon"
                            ? t("SWAG.Card.WeaponBadge", "ARMA")
                            : itemType === "armor"
                              ? t("SWAG.Card.ArmorBadge", "ARMADURA")
                              : itemType === "shield"
                                ? t("SWAG.Card.ShieldBadge", "ESCUDO")
                                : t("SWAG.Card.GearBadge", "EQUIPAMENTO"),
                        class: "bg-info-subtle",
                      }
                    : isArcane
                      ? { text: "ARCANO", class: "bg-purple text-light fw-bold" }
                      : null,
        statusBadge: isDamage && roll
          ? {
              text: calculatedWounds > 0
                ? tf("SWAG.Card.ShakenPlusWounds", { wounds: calculatedWounds }, `Abalado + ${calculatedWounds} Ferimento(s)`)
                : (damageMargin >= 0 ? t("SWAG.Combat.Shaken", "Abalado") : t("SWAG.Combat.NoDamageEffect", "Sem Efeito")),
              class: calculatedWounds > 0 ? "bg-danger text-light" : (damageMargin >= 0 ? "bg-warning-subtle" : "bg-secondary"),
              icon: calculatedWounds > 0 ? "fa-solid fa-heart-crack" : "fa-solid fa-burst",
            }
          : attackResult
            ? {
                text: attackResult.isCriticalFailure
                  ? t("SWAG.Roll.CriticalFailure", "Falha Crítica!")
                  : isRaise
                    ? tf("SWAG.Roll.SuccessWithRaise", { raises: attackResult.raises }, `Sucesso c/ ${attackResult.raises} Ampliação`)
                    : isSuccess
                      ? t("SWAG.Roll.SimpleSuccess", "Sucesso Simples")
                      : t("SWAG.Roll.Failure", "Falha"),
                class: attackResult.isCriticalFailure
                  ? "bg-danger text-light"
                  : isRaise
                    ? "bg-success-subtle"
                    : isSuccess
                      ? "bg-primary-subtle"
                      : "bg-danger-subtle",
                icon: attackResult.isCriticalFailure
                  ? "fa-solid fa-triangle-exclamation"
                  : isRaise
                    ? "fa-solid fa-circle-check"
                    : isSuccess
                      ? "fa-solid fa-check"
                      : "fa-solid fa-xmark",
              }
            : isSuperPower
              ? {
                  text: `${t("SPC.SuperPower.Level.label", "Nível")} ${superMeta.level}`,
                  class: "bg-info text-dark fw-bold",
                  icon: "fa-solid fa-mask",
                }
              : isHindrance
                ? { text: t("SWAG.Card.Roleplay", "Interpretação"), class: "bg-danger-subtle", icon: "fa-solid fa-theater-masks" }
                : isWeaponOrGear
                  ? { text: t("SWAG.Card.Equipped", "Equipado"), class: "bg-info-subtle", icon: "fa-solid fa-shield-halved" }
                  : null,
        metaGrid,
        tags: cardTags.length ? cardTags : null,
        itemActions: itemActions.length ? itemActions : null,
        description: descriptionHtml,
        hindranceTrigger: isHindrance
          ? t("SWAG.Card.BennyTriggerDesc", "Quando esta Complicação criar dificuldades reais para o grupo em cena, o Mestre concede +1 Bene.")
          : null,
        grantBennyReason: isHindrance ? `${t("SWAG.Card.HindrancePrefix", "Complicação")} ${realItem?.name || ""}` : null,
        diceBreakdown: diceBreakdown.length ? diceBreakdown : null,
        aceDetails: aceDetails.length ? aceDetails : null,
        bestDieLabel: roll
          ? (isDamage
              ? tf("SWAG.Card.BaseTotal", { total: roll.total }, `Total Base: ${roll.total}`)
              : tf("SWAG.Card.BestDie", { total: roll.total }, `Melhor Dado: ${roll.total}`))
          : null,
        modLabel,
        modifiers: dynamicModifiers,
        resultBox: roll
          ? {
              title: isDamage
                ? t("SWAG.Card.DamageCalcHeader", "CÁLCULO DE DANO")
                : (isRaise ? t("SWAG.Card.VictoryMarginHeader", "MARGEM DE VITÓRIA") : t("SWAG.Card.FinalResultHeader", "RESULTADO FINAL")),
              description: isDamage
                ? tf("SWAG.Card.DamageDesc", { total: effectiveTotal }, `Dano total <strong>${effectiveTotal}</strong> desferido contra o alvo!`)
                : isRaise
                  ? tf("SWAG.Card.RaiseDesc", { tn: targetNumber, raises: attackResult.raises }, `Superou o Alvo NA ${targetNumber} com <span class="text-success fw-bold">${attackResult.raises} Ampliação(ões)</span>!`)
                  : isSuccess
                    ? tf("SWAG.Card.SuccessDesc", { tn: targetNumber }, `Superou o Número-Alvo (NA ${targetNumber}). Ação bem-sucedida!`)
                    : tf("SWAG.Card.FailureDesc", { tn: targetNumber }, `Não atingiu o Número-Alvo (NA ${targetNumber}).`),
              total: effectiveTotal,
              scoreClass: isDamage
                ? "text-warning"
                : isRaise
                  ? "text-success"
                  : isSuccess
                    ? "text-primary"
                    : "text-danger",
              scoreColor: isDamage
                ? "#f59e0b"
                : isRaise
                  ? "#10b981"
                  : isSuccess
                    ? "#3b82f6"
                    : "#ef4444",
            }
          : null,
        footerSource: !roll && isItemCard
          ? {
              text: realItem?.system?.source || "SWADE Regras Oficiais",
              icon: "fa-solid fa-book-open",
            }
          : null,
        footerTarget: game.user?.targets?.size
          ? Array.from(game.user.targets)
              .map((t) => t.name)
              .join(", ")
          : null,
        showBennyBtn: Boolean(roll && actor),
        showRerollBtn: Boolean(roll),
        showPPBtn: Boolean(isArcane && !isSuperPower && realItem?.system?.pp),
        ppCost: realItem?.system?.pp || 1,
        showRollDamageBtn: Boolean(roll && !isDamage && hasWeaponOrPowerDamage),
        showApplyDamageBtn: isDamage,
        showKnockbackBtn: isDamage && enableKnockback && roll?.total >= 10,
        showPowerStuntBtn: isSuperPower,
        showCompendiumBtn: Boolean(!roll && (realItem?.uuid || itemUuid)),
        compendiumUuid: realItem?.uuid || itemUuid || null,
        calculatedWounds,
        itemId: realItem?.id || domItemId || null,
        itemUuid: realItem?.uuid || itemUuid || null,
        macroFormula: roll?.formula || null,
        showMacroBtn: Boolean(roll?.formula),
      };

      // [PT-BR] Aplicar classe de wrapper imediatamente antes do await para ocultar o cabeçalho bege nativo sem flicker
      // [EN] Apply wrapper class immediately before await to hide native beige header without flicker
      contentEl.classList.add("swag-message-wrapper");

      const renderFn =
        foundry.applications?.handlebars?.renderTemplate ||
        foundry.applications?.api?.HandlebarsApplicationMixin?.renderTemplate ||
        globalThis.renderTemplate;
      const cardHtml = await renderFn(
        "modules/swade-autogame-plus/templates/compact-action-card.hbs",
        templateData
      );

      const messageContent = contentEl.querySelector(".message-content");
      if (messageContent) {
        messageContent.innerHTML = cardHtml;
        this.attachCardActionListeners(contentEl, message, roll);
      }
    };

    // [PT-BR] No Foundry v13/v14, renderChatMessageHTML passa HTMLElement nativo (renderChatMessage está depreciado)
    // [EN] In Foundry v13/v14, renderChatMessageHTML passes native HTMLElement (renderChatMessage is deprecated)
    Hooks.on("renderChatMessageHTML", handleChatMessage);

    // [PT-BR] Delegação global de cliques nos cards do chat (garante funcionamento tanto na barra lateral quanto no popout)
    // [EN] Global click delegation on chat cards (ensures buttons work in both sidebar and popout chat)
    if (!globalChatClickDelegated && typeof document !== "undefined") {
      globalChatClickDelegated = true;
      document.addEventListener("click", (ev) => {
        const addModBtn = ev.target?.closest?.('[data-swag-action="open-modifiers-modal"]');
        if (addModBtn) {
          ev.preventDefault();
          ev.stopPropagation();
          const cardEl = addModBtn.closest(".swag-card");
          const cardId = addModBtn.getAttribute("data-card-id") || cardEl?.getAttribute("data-card-id");
          const modal = new RollModifiersModal({ cardEl, cardId });
          modal.setTargetCard?.(cardEl, cardId);
          modal.render({ force: true });
          return;
        }

        const pillBtn = ev.target?.closest?.('.mod-pill-btn:not([data-swag-action="open-modifiers-modal"])');
        if (pillBtn && pillBtn.dataset.swagBound !== "true") {
          ev.preventDefault();
          ev.stopPropagation();
          const modValue = Number.parseInt(pillBtn.getAttribute("data-mod-value"), 10) || 0;
          const cardEl = pillBtn.closest(".swag-card");
          const totalEl = cardEl?.querySelector(".result-score-number");
          if (cardEl && totalEl) {
            const isPositive = modValue >= 0;
            const activeClass = isPositive ? "active-positive" : "active-negative";
            const wasActive = pillBtn.classList.contains(activeClass) || pillBtn.classList.contains("active");
            const delta = wasActive ? -modValue : modValue;
            const currentVal = Number.parseInt(totalEl.textContent.trim(), 10) || 0;
            const newVal = currentVal + delta;
            pillBtn.classList.toggle(activeClass, !wasActive);
            pillBtn.classList.remove("active");
            RollModifiersEngine.updateCardOutcomeInDOM(cardEl, newVal);
          }
        }
      });
    }
  }

  /**
   * [PT-BR] Conecta todos os listeners interativos dos botões do card de ação
   * [EN] Attaches all interactive listeners to action card buttons
   * @param {HTMLElement} rootEl
   * @param {ChatMessage} message
   * @param {Roll} [roll]
   */
  static attachCardActionListeners(rootEl, message, roll = null) {
    if (!rootEl) {
      return;
    }

    // 1. Modificadores Rápidos (.mod-pill-btn exceto o botão "+ Modificadores")
    rootEl.querySelectorAll('.mod-pill-btn:not([data-swag-action="open-modifiers-modal"])').forEach((btn) => {
      if (btn.dataset.swagBound === "true") {
        return;
      }
      btn.dataset.swagBound = "true";
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const modValue = Number.parseInt(btn.getAttribute("data-mod-value"), 10) || 0;
        const targetCardId = btn.getAttribute("data-mod-target");
        const cardEl = btn.closest(".swag-card") || rootEl.querySelector(".swag-card") || rootEl;
        const totalEl = targetCardId
          ? rootEl.querySelector(`#${targetCardId}-total`)
          : cardEl.querySelector(".result-score-number");

        if (totalEl) {
          const isPositive = modValue >= 0;
          const activeClass = isPositive ? "active-positive" : "active-negative";
          const wasActive = btn.classList.contains(activeClass) || btn.classList.contains("active");
          const delta = wasActive ? -modValue : modValue;

          const currentVal = Number.parseInt(totalEl.textContent.trim(), 10) || 0;
          const newVal = currentVal + delta;

          btn.classList.toggle(activeClass, !wasActive);
          btn.classList.remove("active");

          RollModifiersEngine.updateCardOutcomeInDOM(cardEl, newVal);

          ui.notifications?.info?.(
            wasActive
              ? `Modificador de ${modValue >= 0 ? `+${modValue}` : modValue} removido.`
              : `Modificador de ${modValue >= 0 ? `+${modValue}` : modValue} aplicado ao resultado.`
          );
        }
      });
    });

    // 1A. Abrir Modal Completa de Modificadores de Regra (open-modifiers-modal)
    rootEl.querySelectorAll('[data-swag-action="open-modifiers-modal"]').forEach((btn) => {
      if (btn.dataset.swagBound === "true") {
        return;
      }
      btn.dataset.swagBound = "true";
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const cardEl = btn.closest(".swag-card") || rootEl.querySelector(".swag-card") || rootEl;
        const cardId = btn.getAttribute("data-card-id") || cardEl.getAttribute("data-card-id");
        const modal = new RollModifiersModal({ cardEl, cardId });
        modal.setTargetCard?.(cardEl, cardId);
        modal.render({ force: true });
      });
    });

    // 1B. Rolar Característica / Ataque a partir de Card de Item (item-card-roll-trait)
    rootEl.querySelectorAll('[data-swag-action="item-card-roll-trait"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const itemUuid = btn.getAttribute("data-item-uuid") || message?.system?.uuid;
        const itemId = btn.getAttribute("data-item-id");
        let itemDoc = message?.system?._item || null;
        if (!itemDoc && itemUuid && typeof fromUuid === "function") {
          itemDoc = await fromUuid(itemUuid);
        }
        const actorId = message?.speaker?.actor;
        const actor = itemDoc?.parent || (actorId ? game.actors?.get(actorId) : canvas.tokens?.controlled?.[0]?.actor);
        if (!itemDoc && actor && itemId) {
          itemDoc = actor.items?.get(itemId);
        }

        if (itemDoc && typeof itemDoc.rollFormula === "function") {
          await itemDoc.rollFormula();
        } else if (actor && itemDoc?.system?.actions?.trait) {
          const traitName = itemDoc.system.actions.trait;
          const skill = actor.items?.find((i) => i.type === "skill" && i.name.toLowerCase() === traitName.toLowerCase());
          if (skill && typeof actor.rollSkill === "function") {
            await actor.rollSkill(skill.id);
          } else if (typeof actor.rollAttribute === "function") {
            await actor.rollAttribute(traitName.toLowerCase());
          }
        }
      });
    });

    // 2. Gastar Bene (spend-benny) e Re-rolar Automaticamente
    // [EN] Spend Benny (spend-benny) & Automatically Reroll
    rootEl.querySelectorAll('[data-swag-action="spend-benny"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const actorId = btn.getAttribute("data-actor-id") || message?.speaker?.actor;
        const actor = actorId ? game.actors?.get(actorId) : canvas.tokens?.controlled[0]?.actor;

        if (!actor) {
          ui.notifications?.warn?.("Nenhum personagem associado encontrado para gastar Bene.");
          return;
        }

        const currentBennies = Number(actor.system?.bennies?.value ?? 0);
        if (currentBennies <= 0) {
          const alertMsg = `${actor.name} não possui Benes restantes para gastar!`;
          ui.notifications?.warn?.(alertMsg);
          await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `<div class="p-2 border border-danger rounded bg-black bg-opacity-40 text-danger small"><i class="fa-solid fa-triangle-exclamation me-1"></i> <strong>${alertMsg}</strong></div>`,
          });
          return;
        }

        // [PT-BR] Deduz o Bene da ficha
        // [EN] Deducts Benny from the actor sheet
        if (typeof actor.spendBenny === "function") {
          await actor.spendBenny();
        } else {
          await actor.update({ "system.bennies.value": currentBennies - 1 });
        }
        ui.notifications?.info?.(`1 Bene gasto para ${actor.name}! Restantes: ${currentBennies - 1}`);

        // [PT-BR] Se o card possuir uma rolagem, dispara a re-rolagem automática com o Bene
        // [EN] If the card contains a roll, trigger automatic reroll using the Benny
        const rollObj = roll || message?.rolls?.[0];
        if (rollObj) {
          const newRoll = await rollObj.reroll();
          const cleanFlavor = (message.flavor || "Teste de Característica")
            .replace(/\s*\(Gasto de Bene\)/gi, "")
            .trim();
          await newRoll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor }),
            flavor: `${cleanFlavor} (Gasto de Bene)`,
            flags: {
              ...(message.flags || {}),
              [MODULE_ID]: {
                ...(message.flags?.[MODULE_ID] || {}),
                isBennyReroll: true,
              },
              swade: {
                ...(message.flags?.swade || {}),
                isReroll: true,
                isBennyReroll: true,
              },
            },
          });
        }
      });
    });

    // 3. Conceder Bene (grant-benny)
    rootEl.querySelectorAll('[data-swag-action="grant-benny"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const actorId = btn.getAttribute("data-actor-id") || message?.speaker?.actor;
        const actor = actorId ? game.actors?.get(actorId) : canvas.tokens?.controlled[0]?.actor;
        const reason = btn.getAttribute("data-reason") || "Interpretação Heroica";

        if (actor) {
          const currentBennies = actor.system?.bennies?.value ?? 0;
          await actor.update({ "system.bennies.value": currentBennies + 1 });
          ui.notifications?.info?.(`1 Bene concedido a ${actor.name} (${reason})!`);
        } else {
          ui.notifications?.warn?.("Selecione um ator para conceder o Bene.");
        }
      });
    });

    // 4. Gastar Pontos de Poder (spend-pp)
    rootEl.querySelectorAll('[data-swag-action="spend-pp"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const cost = Number.parseInt(btn.getAttribute("data-pp-cost"), 10) || 1;
        const actorId = btn.getAttribute("data-actor-id") || message?.speaker?.actor;
        const actor = actorId ? game.actors?.get(actorId) : canvas.tokens?.controlled[0]?.actor;

        if (actor) {
          const currentPP = actor.system?.powerPoints?.value ?? 0;
          const newPP = Math.max(0, currentPP - cost);
          await actor.update({ "system.powerPoints.value": newPP });
          ui.notifications?.info?.(`${cost} Pontos de Poder gastos por ${actor.name}. Restantes: ${newPP}`);
        } else {
          ui.notifications?.warn?.("Nenhum ator encontrado para deduzir Pontos de Poder.");
        }
      });
    });

    // 5. Rolar Dano (roll-damage)
    rootEl.querySelectorAll('[data-swag-action="roll-damage"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const itemId = btn.getAttribute("data-item-id");
        const itemUuid = btn.getAttribute("data-item-uuid") || message?.system?.uuid;
        let item = message?.system?._item || null;
        if (!item && itemUuid && typeof fromUuid === "function") {
          item = await fromUuid(itemUuid);
        }
        const actorId = message?.speaker?.actor;
        const actor = item?.parent || (actorId ? game.actors?.get(actorId) : canvas.tokens?.controlled[0]?.actor);
        if (!item && actor && itemId) {
          item = actor?.items?.get(itemId);
        }

        if (item && typeof item.rollDamage === "function") {
          await item.rollDamage();
        } else if (actor) {
          const rollFormula = item?.system?.damage || "2d6x";
          const r = new Roll(rollFormula);
          await r.evaluate();
          await r.toMessage({
            speaker: ChatMessage.getSpeaker({ actor }),
            flavor: `Dano: ${item?.name || "Ataque"}`,
            flags: {
              swade: {
                rollType: "damage",
                item: { id: item?.id, name: item?.name, img: item?.img },
              },
            },
          });
        } else {
          ui.notifications?.info?.("Rolando dano genérico (2d6x)...");
          const r = new Roll("2d6x");
          await r.evaluate();
          await r.toMessage({ flavor: "Dano de Combate" });
        }
      });
    });

    // 6. Aplicar Dano / Ferimentos (apply-damage)
    rootEl.querySelectorAll('[data-swag-action="apply-damage"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const damageVal = Number.parseInt(btn.getAttribute("data-damage"), 10) || roll?.total || 0;
        await TargetCombatManager.applyDamageToTargets({
          damage: damageVal,
          ap: message?.flags?.swade?.ap ?? 0,
          isHeavyWeapon: message?.flags?.swade?.heavyWeapon ?? false,
        });
      });
    });

    // 7. Salvar Macro Rápida e Atribuir à Barra de Macros do Rodapé (save-macro)
    // [EN] Save Quick Macro & Assign to Bottom Hotbar (save-macro)
    rootEl.querySelectorAll('[data-swag-action="save-macro"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const rawTitle = btn.getAttribute("data-macro-name") || "Macro SWAG";
        const cleanTitle = rawTitle.replace(/&bull;/gi, "•").replace(/<[^>]+>/g, "").trim();
        const formula = btn.getAttribute("data-macro-formula") || "/r 1d8x";

        if (game.macros) {
          const macroDoc = await Macro.create({
            name: `SWAG: ${cleanTitle}`,
            type: "chat",
            command: formula.startsWith("/") ? formula : `/r ${formula}`,
            img: "icons/svg/dice-target.svg",
          });

          // [PT-BR] Encontra o primeiro slot livre na hotbar da página atual ou atribui ao primeiro slot disponível (1 a 50)
          // [EN] Finds first free slot on the current hotbar page or assigns to first available slot (1 to 50)
          if (game.user?.assignHotbarMacro) {
            const hotbarData = game.user.hotbar || {};
            const curPage = Number(ui.hotbar?.page ?? 1);
            const pageStart = (curPage - 1) * 10 + 1;
            const pageEnd = curPage * 10;
            let targetSlot = null;

            for (let slot = pageStart; slot <= pageEnd; slot++) {
              if (!hotbarData[slot]) {
                targetSlot = slot;
                break;
              }
            }
            if (!targetSlot) {
              for (let slot = 1; slot <= 50; slot++) {
                if (!hotbarData[slot]) {
                  targetSlot = slot;
                  break;
                }
              }
            }

            if (targetSlot) {
              await game.user.assignHotbarMacro(macroDoc, targetSlot);
              ui.notifications?.info?.(`Macro "${macroDoc.name}" salva no slot ${targetSlot % 10 || 10} da barra de macros!`);
            } else {
              ui.notifications?.info?.(`Macro "${macroDoc.name}" criada na lista de macros!`);
            }
          } else {
            ui.notifications?.info?.(`Macro "${macroDoc.name}" criada com sucesso!`);
          }
        }
      });
    });

    // 8. Re-rolar Card (reroll-card)
    rootEl.querySelectorAll('[data-swag-action="reroll-card"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const rollObj = roll || message?.rolls?.[0];
        if (rollObj) {
          const newRoll = await rollObj.reroll();
          await newRoll.toMessage({
            speaker: message.speaker,
            flavor: `Re-rolagem: ${message.flavor || "Ação de Combate"}`,
          });
        }
      });
    });

    // 9. Abrir Compêndio (open-compendium)
    rootEl.querySelectorAll('[data-swag-action="open-compendium"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const uuid = btn.getAttribute("data-uuid");
        if (uuid) {
          const doc = await fromUuid(uuid);
          doc?.sheet?.render(true);
        }
      });
    });

    // 10. Importar Ator / Arquétipo (import-archetype)
    rootEl.querySelectorAll('[data-swag-action="import-archetype"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const uuid = btn.getAttribute("data-uuid");
        if (uuid && game.actors) {
          const doc = await fromUuid(uuid);
          if (doc) {
            await Actor.create(doc.toObject());
            ui.notifications?.info?.(`Ator "${doc.name}" importado para a aba Atores com sucesso!`);
          }
        }
      });
    });

    // 11. Rolar Projeção / Knockback (roll-knockback)
    rootEl.querySelectorAll('[data-swag-action="roll-knockback"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const damageVal = Number.parseInt(btn.getAttribute("data-damage"), 10) || roll?.total || 0;
        const firstTarget = Array.from(game.user?.targets || [])[0];
        const targetSize = firstTarget?.actor?.system?.stats?.size ?? 0;
        const targetName = firstTarget?.name || "Alvo";
        await CompanionRulesEngine.rollKnockback({
          damage: damageVal,
          targetSize,
          targetName,
          hitObstacle: true,
        });
      });
    });

    // 12. Executar Proeza de Poder / Power Stunt (power-stunt)
    rootEl.querySelectorAll('[data-swag-action="power-stunt"]').forEach((btn) => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const actorId = btn.getAttribute("data-actor-id") || message?.speaker?.actor;
        const actor = actorId ? game.actors?.get(actorId) : canvas.tokens?.controlled?.[0]?.actor;
        await CompanionRulesEngine.executePowerStunt(actor);
      });
    });
  }
}

Hooks.once("init", () => {
  SwadeAutoGamePlus.initialize();
});

Hooks.once("ready", () => {
  CompanionRulesEngine.ensureCompanionAdditionalStats();
  console.log(
    "%cSWAG+ | Pronto e operacional! API disponível em game.modules.get('swade-autogame-plus').api e globalThis.SWAG.api",
    "color: #5772ac;"
  );
});
