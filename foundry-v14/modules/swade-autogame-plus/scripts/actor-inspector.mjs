/**
 * @fileoverview Extrator de Dados e Inspetor Completo de Atores para SWADE
 * [PT-BR] Extrai dados estruturados de qualquer ator do Foundry pelo ID, UUID ou instância (atributos, perícias, itens, vantagens, poderes, efeitos, token e bio).
 * [EN] Extracts structured data from any Foundry actor by ID, UUID, or instance (attributes, skills, items, edges, powers, effects, token, and bio).
 */

import { getActorSuperPowers, extractSuperPowerMetadata, calculateActorSuperPowerSummary } from "./super-power-item.mjs";

export class ActorInspector {
  /**
   * [PT-BR] Obtém a instância do ator a partir de id, uuid ou objeto.
   * [EN] Resolves the actor instance from id, uuid, or object.
   *
   * @param {string|Actor} actorRef - ID, UUID ou objeto Actor.
   * @returns {Actor|null}
   */
  static resolveActor(actorRef) {
    if (!actorRef) {
      return null;
    }
    if (typeof actorRef === "object" && (actorRef.documentName === "Actor" || actorRef.system)) {
      return actorRef;
    }
    if (typeof actorRef === "string") {
      if (actorRef.includes(".")) {
        return typeof fromUuidSync === "function" ? fromUuidSync(actorRef) : null;
      }
      return globalThis.game?.actors?.get?.(actorRef) || null;
    }
    return null;
  }

  /**
   * [PT-BR] Extrai um dossiê completo e estruturado do Ator.
   * [EN] Extracts a complete and structured dossier of the Actor.
   *
   * @param {string|Actor} actorRef
   * @returns {object|null}
   */
  static inspect(actorRef) {
    const actor = this.resolveActor(actorRef);
    if (!actor) {
      return null;
    }

    const sys = actor.system || {};

    // [PT-BR] Atributos Centrais
    // [EN] Core Attributes
    const attributes = {};
    if (sys.attributes) {
      for (const [key, attr] of Object.entries(sys.attributes)) {
        attributes[key] = {
          die: attr.die?.sides ?? 4,
          modifier: attr.die?.modifier ?? 0,
          label:
            globalThis.game?.i18n?.localize?.(
              `SWADE.Attr${key.charAt(0).toUpperCase() + key.slice(1)}`
            ) || key,
        };
      }
    }

    // [PT-BR] Perícias
    // [EN] Skills
    const skills =
      actor.itemTypes?.skill?.map((i) => ({
        id: i.id,
        name: i.name,
        img: i.img,
        attribute: i.system?.attribute || "agility",
        die: i.system?.die?.sides ?? 4,
        modifier: i.system?.die?.modifier ?? 0,
      })) || [];

    // [PT-BR] Vantagens e Complicações
    // [EN] Edges and Hindrances
    const edges =
      actor.itemTypes?.edge?.map((i) => ({
        id: i.id,
        name: i.name,
        img: i.img,
        category: i.system?.category || "general",
        summary: i.system?.description || "",
      })) || [];

    const hindrances =
      actor.itemTypes?.hindrance?.map((i) => ({
        id: i.id,
        name: i.name,
        img: i.img,
        severity: i.system?.major ? "major" : "minor",
        summary: i.system?.description || "",
      })) || [];

    // [PT-BR] Poderes Arcanos e Super Poderes (SPC)
    // [EN] Arcane Powers and Super Powers (SPC)
    const powers =
      actor.itemTypes?.power?.map((i) => ({
        id: i.id,
        name: i.name,
        img: i.img,
        rank: i.system?.rank || "novice",
        powerPoints: i.system?.pp ?? 1,
        range: i.system?.range || "sm",
        duration: i.system?.duration || "instant",
        damage: i.system?.damage || "",
      })) || [];

    const superPowers = getActorSuperPowers(actor).map((i) => {
      const meta = extractSuperPowerMetadata(i);
      return {
        id: i.id,
        name: i.name,
        img: i.img,
        type: i.type,
        level: meta.level,
        buildCost: meta.buildCost,
        range: meta.range,
        duration: meta.duration,
        damage: meta.damage,
        ap: meta.ap,
        trapping: meta.trapping,
        modifiers: meta.modifiers,
      };
    });

    const superPowerSummary = calculateActorSuperPowerSummary(actor);

    // [PT-BR] Equipamentos e Armas
    // [EN] Equipment and Weapons
    const weapons =
      actor.itemTypes?.weapon?.map((i) => ({
        id: i.id,
        name: i.name,
        img: i.img,
        damage: i.system?.damage || "",
        ap: i.system?.ap ?? 0,
        range: i.system?.range || "",
        weight: i.system?.weight ?? 0,
        isHeavyWeapon: i.system?.heavyWeapon ?? false,
      })) || [];

    const gear =
      actor.itemTypes?.gear?.map((i) => ({
        id: i.id,
        name: i.name,
        img: i.img,
        quantity: i.system?.quantity ?? 1,
        weight: i.system?.weight ?? 0,
      })) || [];

    const armors =
      actor.itemTypes?.armor?.map((i) => ({
        id: i.id,
        name: i.name,
        img: i.img,
        armor: i.system?.armor ?? 0,
        weight: i.system?.weight ?? 0,
      })) || [];

    // [PT-BR] Habilidades Raciais e Especiais
    // [EN] Racial and Special Abilities
    const abilities =
      actor.itemTypes?.ability?.map((i) => ({
        id: i.id,
        name: i.name,
        img: i.img,
        subtype: i.system?.subtype || "special",
        description: i.system?.description || "",
      })) || [];

    // [PT-BR] Efeitos Ativos e Condições
    // [EN] Active Effects and Conditions
    const effects =
      actor.effects?.map((e) => ({
        id: e.id,
        name: e.name,
        img: e.img,
        disabled: e.disabled,
        duration: e.duration,
        origin: e.origin,
      })) || [];

    // [PT-BR] Características Derivadas e Estatísticas
    // [EN] Derived Stats and Status
    const stats = {
      pace: sys.stats?.speed?.running ?? sys.pace?.value ?? 6,
      parry: sys.stats?.parry?.value ?? 4,
      toughness: sys.stats?.toughness?.value ?? 4,
      armor: sys.stats?.toughness?.armor ?? 0,
      wounds: {
        value: sys.wounds?.value ?? 0,
        max: sys.wounds?.max ?? 3,
        ignored: sys.wounds?.ignored ?? 0,
      },
      fatigue: {
        value: sys.fatigue?.value ?? 0,
        max: sys.fatigue?.max ?? 2,
      },
      bennies: {
        value: sys.bennies?.value ?? 0,
        max: sys.bennies?.max ?? 3,
      },
      isShaken: sys.status?.isShaken ?? false,
      isDistracted: sys.status?.isDistracted ?? false,
      isVulnerable: sys.status?.isVulnerable ?? false,
      isBleedingOut: sys.status?.isBleedingOut ?? false,
      isIncapacitated: sys.status?.isIncapacitated ?? false,
    };

    // [PT-BR] Metadados de Token e Retrato
    // [EN] Token and Portrait Metadata
    const media = {
      portraitImg: actor.img,
      prototypeTokenImg: actor.prototypeToken?.texture?.src || actor.img,
      scale: actor.prototypeToken?.texture?.scaleX || 1,
      disposition: actor.prototypeToken?.disposition ?? 0,
    };

    // [PT-BR] Biografia e Detalhes Pessoais
    // [EN] Biography and Personal Details
    const bio = {
      name: actor.name,
      type: actor.type,
      wildCard: actor.isWildCard ?? false,
      race: sys.details?.race?.name || sys.details?.race || "Humano",
      archetype: sys.details?.archetype || "",
      rank: sys.advances?.rank || "Novice",
      advances: sys.advances?.value ?? 0,
      experience: sys.advances?.experience ?? 0,
      biographyHtml: sys.details?.biography?.value || "",
    };

    return {
      id: actor.id,
      uuid: actor.uuid,
      bio,
      media,
      stats,
      attributes,
      skills,
      edges,
      hindrances,
      powers,
      superPowers,
      superPowerSummary: {
        costTotal: superPowerSummary.costTotal,
        powerLevel: superPowerSummary.powerLevel,
      },
      inventory: {
        weapons,
        armors,
        gear,
      },
      abilities,
      effects,
    };
  }
}
