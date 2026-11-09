/**
 * @fileoverview Subtipo de Item Super Poder (superPower) e Integração de Fichas para SWADE AutoGame Plus (SWAG+)
 * [PT-BR] Clona e expande a categoria de itens 'superPower' do Compêndio de Superpoderes Oficial (SPC v14), funcionando tanto integrado ao módulo oficial quanto de forma 100% autônoma (standalone).
 * [EN] Clones and expands the 'superPower' item category from the Official Super Powers Companion (SPC v14), working both integrated with the official module and 100% standalone.
 */

export const MODULE_ID = "swade-autogame-plus";
export const OFFICIAL_SPC_ID = "swade-supers-companion";
export const SWAG_SUPER_POWER_TYPE = `${MODULE_ID}.superPower`;
export const OFFICIAL_SUPER_POWER_TYPE = `${OFFICIAL_SPC_ID}.superPower`;

/**
 * [PT-BR] Verifica se um tipo de item é um Super Poder (seja do módulo oficial da Pinnacle ou do SWAG+ autônomo).
 * [EN] Checks if an item type is a Super Power (either from Pinnacle's official module or standalone SWAG+).
 * @param {string} type
 * @returns {boolean}
 */
export function isSuperPowerType(type) {
  if (!type || typeof type !== "string") {
    return false;
  }
  return (
    type === SWAG_SUPER_POWER_TYPE ||
    type === OFFICIAL_SUPER_POWER_TYPE ||
    type.endsWith(".superPower") ||
    type === "superPower"
  );
}

/**
 * [PT-BR] Retorna todos os itens de Super Poder de um Ator (unificando 'swade-supers-companion.superPower' e 'swade-autogame-plus.superPower').
 * [EN] Returns all Super Power items from an Actor (unifying 'swade-supers-companion.superPower' and 'swade-autogame-plus.superPower').
 * @param {Actor} actor
 * @returns {Item[]}
 */
export function getActorSuperPowers(actor) {
  if (!actor) {
    return [];
  }
  if (actor.items && typeof actor.items.filter === "function") {
    return actor.items.filter((i) => isSuperPowerType(i.type));
  }
  const byTypes = [
    ...(actor.itemTypes?.[OFFICIAL_SUPER_POWER_TYPE] || []),
    ...(actor.itemTypes?.[SWAG_SUPER_POWER_TYPE] || []),
  ];
  return byTypes;
}

/**
 * [PT-BR] Calcula o Custo Total de Pontos de Superpoder (PSP) e o Nível de Poder sugerido (I a V) de um Ator.
 * [EN] Calculates Total Super Power Points (SPP) Cost and suggested Power Level (I to V) for an Actor.
 * @param {Actor} actor
 * @returns {{ superPowers: Item[], costTotal: number, calculatedLevel: string, powerLevel: string }}
 */
export function calculateActorSuperPowerSummary(actor) {
  const superPowers = getActorSuperPowers(actor);
  const costTotal = superPowers.reduce((acc, item) => {
    const baseCost = Number(item.system?.build?.cost) || Number(item.system?.level) || 0;
    return acc + baseCost;
  }, 0);

  const levelIndex = Math.min(Math.max(Math.ceil((costTotal || 1) / 15), 1), 5) - 1;
  const romanLevels = ["I", "II", "III", "IV", "V"];
  const calculatedLevel = romanLevels[levelIndex] || "I";
  // [PT-BR] Acesso seguro via actor.flags para evitar exceção de escopo no Foundry v14 caso o módulo oficial não esteja ativo
  // [EN] Safe access via actor.flags to avoid scope exception in Foundry v14 when official module is inactive
  const savedLevel =
    actor?.flags?.[OFFICIAL_SPC_ID]?.powerLevel ||
    actor?.flags?.[MODULE_ID]?.powerLevel ||
    actor?.getFlag?.(MODULE_ID, "powerLevel") ||
    calculatedLevel;

  return {
    superPowers,
    costTotal,
    calculatedLevel,
    powerLevel: savedLevel,
  };
}

/**
 * [PT-BR] Extrai metadados ricos de um item 'superPower' para exibição nos Cards Bootstrap do Chat e no Dossiê de Ator.
 * [EN] Extracts rich metadata from a 'superPower' item for display in Bootstrap Chat Cards and Actor Dossier.
 * @param {Item|object} item
 * @returns {{
 *   level: number,
 *   buildCost: number,
 *   range: string,
 *   duration: string,
 *   damage: string,
 *   ap: number,
 *   trapping: string,
 *   modifiers: Array<{ name: string, cost: number, description: string }>
 * }}
 */
export function extractSuperPowerMetadata(item) {
  const sys = item?.system || {};
  const level = Number(sys.level) || Number(sys.build?.level) || 1;
  const buildCost = Number(sys.build?.cost) || level;
  const range = sys.range || "Automático";
  const duration = sys.duration || "Permanente / Instantâneo";
  const damage = sys.damage || "";
  const ap = Number(sys.ap) || 0;
  const trapping = sys.trapping || "";

  const rawEffects = Array.from(item?.effects || []);
  const modifiers = rawEffects
    .filter((e) => e && (e.type === "modifier" || e.system?.cost !== undefined) && !e.disabled)
    .map((e) => ({
      name: e.name,
      cost: Number(e.system?.cost) || 0,
      description: e.description || e.system?.description || "",
    }));

  return {
    level,
    buildCost,
    range,
    duration,
    damage,
    ap,
    trapping,
    modifiers,
  };
}

/**
 * [PT-BR] Registra dinamicamente o DataModel (`SwadeBaseItemData`), a Ficha de Item (`SwadeItemSheetV2`) e a Aba `Super Poderes` na Ficha de Personagem caso o Foundry VTT e o sistema SWADE estejam ativos.
 * [EN] Dynamically registers the DataModel (`SwadeBaseItemData`), Item Sheet (`SwadeItemSheetV2`), and `Super Powers` Tab on Character Sheet when Foundry VTT and SWADE system are active.
 */
export function registerSuperPowerItemSupport() {
  const swadeSys = globalThis.swade;
  const foundryGlobal = globalThis.foundry;
  if (!swadeSys?.data?.item?.base?.SwadeBaseItemData || !foundryGlobal?.data?.fields) {
    return;
  }

  // 1. Definir a classe SuperPowerData idêntica ao módulo oficial da Pinnacle
  const BaseItemData = swadeSys.data.item.base.SwadeBaseItemData;
  class SwagSuperPowerData extends BaseItemData {
    static defineSchema() {
      const fields = foundryGlobal.data.fields;
      const swadeFields = swadeSys.data.fields;
      const common = swadeSys.data.item.common;
      const schema = super.defineSchema();

      return Object.assign(schema, {
        ...(typeof common.actions === "function" ? common.actions() : {}),
        ...(typeof common.activities === "function" ? common.activities() : {}),
        ...(typeof common.favorite === "function" ? common.favorite() : {}),
        ...(typeof common.templates === "function" ? common.templates() : {}),
        ...(typeof common.builder === "function" ? common.builder() : {}),
        damage: new swadeFields.FormulaField({
          initial: "",
          blank: true,
          label: "SWADE.Dmg",
        }),
        ap: new fields.NumberField({
          initial: 0,
          label: "SWADE.Ap",
        }),
        range: new swadeFields.FormulaField({
          initial: "@sma",
          blank: true,
          label: "SWADE.Range._name",
        }),
        duration: new fields.StringField({
          initial: "",
          label: "SWADE.Dur",
        }),
        trapping: new fields.StringField({
          initial: "",
          textSearch: true,
          label: "SWADE.Trap",
        }),
        level: new fields.NumberField({
          initial: 1,
          positive: true,
          integer: true,
          nullable: false,
          label: "SPC.SuperPower.Level.label",
        }),
      });
    }

    async _preCreate(data, options, user) {
      if ((await super._preCreate(data, options, user)) === false) {
        return false;
      }
      if (!data.img) {
        this.parent?.updateSource?.({ img: "icons/svg/lightning.svg" });
      }
    }

    async toEmbed(config, options) {
      const TextEditorImpl = foundryGlobal.applications?.ux?.TextEditor?.implementation;
      config.caption = false;
      const enrichedDescription = TextEditorImpl
        ? await TextEditorImpl.enrichHTML(this.description || "", { ...options })
        : this.description || "";
      const modifiers = await Promise.all(
        (this.parent?.effects || [])
          .filter((e) => e.type === "modifier")
          .map(async (e) => ({
            name: e.name,
            cost: e.system?.cost ?? 0,
            description: TextEditorImpl
              ? await TextEditorImpl.enrichHTML(e.description || "", { ...options })
              : e.description || "",
          }))
      );

      const renderFn =
        foundryGlobal.applications?.handlebars?.renderTemplate || globalThis.renderTemplate;
      const html = await renderFn(
        "modules/swade-autogame-plus/templates/super-power-embed.hbs",
        {
          ...this,
          parentName: this.parent?.name || "Super Poder",
          enrichedDescription,
          modifiers,
        }
      );
      const container = document.createElement("div");
      container.className = "item-embed power";
      container.innerHTML = html;
      return container;
    }
  }

  // [PT-BR] Registrar DataModel para swade-autogame-plus.superPower (e também para swade-supers-companion.superPower apenas se o módulo oficial estiver instalado)
  // [EN] Register DataModel for swade-autogame-plus.superPower (and for swade-supers-companion.superPower only if the official module is installed)
  if (globalThis.CONFIG?.Item?.dataModels) {
    globalThis.CONFIG.Item.dataModels[SWAG_SUPER_POWER_TYPE] = SwagSuperPowerData;
    if (
      globalThis.game?.modules?.get(OFFICIAL_SPC_ID)?.active &&
      !globalThis.CONFIG.Item.dataModels[OFFICIAL_SUPER_POWER_TYPE]
    ) {
      globalThis.CONFIG.Item.dataModels[OFFICIAL_SUPER_POWER_TYPE] = SwagSuperPowerData;
    }
  }

  if (
    Array.isArray(globalThis.CONFIG?.Item?.compendiumIndexFields) &&
    !globalThis.CONFIG.Item.compendiumIndexFields.includes("system.build.cost")
  ) {
    globalThis.CONFIG.Item.compendiumIndexFields.push("system.build.cost");
  }

  // 2. Registrar a Ficha de Item SwadeItemSheetV2 para o tipo superPower
  const BaseItemSheet = globalThis.game?.swade?.sheets?.SwadeItemSheetV2;
  const ItemsCollection = foundryGlobal.documents?.collections?.Items || globalThis.Items;

  if (BaseItemSheet && ItemsCollection) {
    class SwagSuperPowerSheet extends BaseItemSheet {
      static DEFAULT_OPTIONS = {
        classes: ["swade-item-sheet", "swade", "swade-app"],
        position: { width: 650, height: 600 },
      };

      static PARTS = {
        ...super.PARTS,
        [SWAG_SUPER_POWER_TYPE]: {
          template: "modules/swade-autogame-plus/templates/super-power-sheet.hbs",
          templates: ["templates/generic/tab-navigation.hbs"],
          scrollable: [
            ".properties",
            ".actions",
            ".charges",
            ".editor-container .editor-content",
          ],
        },
        [OFFICIAL_SUPER_POWER_TYPE]: {
          template: "modules/swade-autogame-plus/templates/super-power-sheet.hbs",
          templates: ["templates/generic/tab-navigation.hbs"],
          scrollable: [
            ".properties",
            ".actions",
            ".charges",
            ".editor-container .editor-content",
          ],
        },
      };

      async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.bonusDamageDieSideOptions = [
          { key: 4, label: "d4" },
          { key: 6, label: "d6" },
          { key: 8, label: "d8" },
          { key: 10, label: "d10" },
          { key: 12, label: "d12" },
        ];
        return context;
      }
    }

    Hooks.once("i18nInit", () => {
      const typesToRegister = [SWAG_SUPER_POWER_TYPE];
      if (globalThis.game?.modules?.get(OFFICIAL_SPC_ID)?.active) {
        typesToRegister.push(OFFICIAL_SUPER_POWER_TYPE);
      }
      ItemsCollection.registerSheet("swade", SwagSuperPowerSheet, {
        makeDefault: true,
        types: typesToRegister,
        label: "SWAG+ | Ficha de Super Poder (Super Power)",
      });
    });
  }

  // 3. Se o módulo oficial swade-supers-companion NÃO estiver ativo, injetar a aba "Super Poderes" na CharacterSheet nativa do SWADE
  const CharacterSheet = globalThis.game?.swade?.sheets?.CharacterSheet;
  if (CharacterSheet && !globalThis.game?.modules?.get(OFFICIAL_SPC_ID)?.active) {
    const superPowersTabDef = {
      id: "superPowers",
      group: "primary",
      label: "SPC.SuperPower.plural",
      cssClass: "item",
      tabCssClass: "",
    };

    const origPrepareContext = CharacterSheet.prototype._prepareContext;
    CharacterSheet.prototype._prepareContext = async function _prepareContextSwagSupers(options) {
      const context = await origPrepareContext.call(this, options);
      if (!context?.tabs) {
        return context;
      }
      const spcEnabled = globalThis.game?.settings?.get(MODULE_ID, "enableSuperPowersSupport");
      const hasSuperPowers = getActorSuperPowers(this.document).length > 0;
      if (!spcEnabled && !hasSuperPowers) {
        delete context.tabs.superPowers;
        return context;
      }
      const entries = Object.entries(context.tabs).filter(([k]) => k !== "superPowers");
      const invIdx = entries.findIndex(([k]) => k === "inventory");
      const insertAt = invIdx >= 0 ? invIdx + 1 : entries.length;
      entries.splice(insertAt, 0, ["superPowers", superPowersTabDef]);
      context.tabs = Object.fromEntries(entries);
      return context;
    };

    let isSuperTabActive = false;
    const origOnRender = CharacterSheet.prototype._onRender;
    CharacterSheet.prototype._onRender = async function _onRenderSwagSupers(context, options) {
      await origOnRender.call(this, context, options);
      const spcEnabled = globalThis.game?.settings?.get(MODULE_ID, "enableSuperPowersSupport");
      const allSuperPowers = getActorSuperPowers(this.document);
      if (!spcEnabled && allSuperPowers.length === 0) {
        return;
      }
      if (this.element.querySelector('section[data-tab="superPowers"]')) {
        return;
      }

      const TextEditorImpl = foundryGlobal.applications?.ux?.TextEditor?.implementation;
      const enrichedPowers = await Promise.all(
        allSuperPowers.map(async (item) => {
          const clone = foundryGlobal.utils.deepClone(item);
          const modEffects = Array.from(item.effects || []).filter(
            (e) => e && e.type === "modifier" && !e.disabled
          );
          clone.enabledEffects = await Promise.all(
            modEffects
              .filter((e) => e.name)
              .map(async (e) => ({
                name: e.name,
                tooltip: TextEditorImpl
                  ? await TextEditorImpl.enrichHTML(e.description || "", { async: true })
                  : e.description || "",
              }))
          );
          return clone;
        })
      );

      const summary = calculateActorSuperPowerSummary(this.document);
      const renderFn =
        foundryGlobal.applications?.handlebars?.renderTemplate || globalThis.renderTemplate;
      const tabHtml = await renderFn(
        "modules/swade-autogame-plus/templates/super-power-tab.hbs",
        {
          cssClass: isSuperTabActive ? "active" : "",
          superPowers: enrichedPowers,
          costTotal: summary.costTotal,
          powerLevel: summary.powerLevel,
          createItemType: SWAG_SUPER_POWER_TYPE,
          powerLevelOptions: [
            { value: "I", label: "I (15 PSP / Limite 5)" },
            { value: "II", label: "II (30 PSP / Limite 10)" },
            { value: "III", label: "III (45 PSP / Limite 15)" },
            { value: "IV", label: "IV (60 PSP / Limite 20)" },
            { value: "V", label: "V (75 PSP / Limite 25)" },
          ],
        }
      );

      const effectsTab = this.element.querySelector('section[data-tab="effects"]');
      if (effectsTab) {
        effectsTab.insertAdjacentHTML("beforebegin", tabHtml);
      }

      // Favoritos no Quick Access da aba Resumo
      const quickAccess = this.element.querySelector("section.summary.tab .quickaccess div.note-main");
      if (quickAccess && !quickAccess.querySelector("[data-spc-super-power-favorites]")) {
        const favList = document.createElement("ol");
        favList.classList.add("quick-list");
        favList.dataset.spcSuperPowerFavorites = "";
        for (const sp of allSuperPowers) {
          if (!sp.system?.favorite) {
            continue;
          }
          const cardHtml = await renderFn("swade.character-item-card", sp);
          favList.insertAdjacentHTML("beforeend", cardHtml);
        }
        quickAccess.append(favList);
      }

      // Listeners da aba Super Poderes
      const levelSelect = this.element.querySelector('section[data-tab="superPowers"] select.power-level');
      levelSelect?.addEventListener("change", async (ev) => {
        await this.document.setFlag(MODULE_ID, "powerLevel", ev.target.value);
      });

      const stuntBtn = this.element.querySelector('section[data-tab="superPowers"] [data-action="powerStunt"]');
      stuntBtn?.addEventListener("click", (ev) => {
        ev.preventDefault();
        globalThis.SWAG?.api?.executePowerStunt?.(this.document);
      });

      this.element.querySelector(".main-grid > nav.tabs")?.addEventListener("click", (ev) => {
        if (ev.target.tagName === "A") {
          isSuperTabActive = ev.target.dataset.tab === "superPowers";
        }
      });
    };
  }

  // 4. Hook swadeActorEmbed para listar Super Poderes nos embeds de Atores/NPCs
  Hooks.on("swadeActorEmbed", (embedElement, actor) => {
    if (globalThis.game?.modules?.get(OFFICIAL_SPC_ID)?.active) {
      return;
    }
    if (!["character", "npc"].includes(actor?.type)) {
      return;
    }
    const powers = getActorSuperPowers(actor);
    if (!powers.length) {
      return;
    }
    if (!embedElement.querySelector("section.embed-section.abilities")) {
      const label = globalThis.game?.i18n?.localize("SWADE.SpecialAbilities") || "Habilidades Especiais";
      embedElement.insertAdjacentHTML(
        "beforeend",
        `<section class="embed-section abilities"><br><h4>${label}</h4><ul class="items-list"></ul></section>`
      );
    }
    const list = embedElement.querySelector("section.embed-section.abilities .items-list");
    for (const sp of powers) {
      list?.insertAdjacentHTML(
        "beforeend",
        `<li class="marker-star"><strong>${sp.name}</strong>: ${sp.system?.trapping || ""}</li>`
      );
    }
  });
}

