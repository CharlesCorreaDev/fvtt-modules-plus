/**
 * [PT-BR] Entrypoint principal do Sistema {{PACKAGE_TITLE}} para Foundry VTT v14+
 * [EN] Main system entrypoint for {{PACKAGE_TITLE}} on Foundry VTT v14+
 */

import { CharacterDataModel } from "./src/models/character-data.mjs";
import { ItemDataModel } from "./src/models/item-data.mjs";
import { ModernActorSheet } from "./src/sheets/actor-sheet.mjs";

const SYSTEM_ID = "{{PACKAGE_ID}}";

Hooks.once("init", async () => {
  console.log(`[${SYSTEM_ID}] Initializing Modern System (TypeDataModel & ApplicationV2)...`);

  // 1. Registrar os DataModels tipados para Actors e Items
  CONFIG.Actor.dataModels["character"] = CharacterDataModel;
  CONFIG.Actor.dataModels["npc"] = CharacterDataModel;
  CONFIG.Item.dataModels["gear"] = ItemDataModel;
  CONFIG.Item.dataModels["feature"] = ItemDataModel;

  // 2. Registrar as Fichas ApplicationV2 modernas
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(SYSTEM_ID, ModernActorSheet, {
    types: ["character", "npc"],
    makeDefault: true,
    label: "{{PACKAGE_TITLE}} Character Sheet"
  });
});

Hooks.once("ready", async () => {
  console.log(`[${SYSTEM_ID}] System ready for gaming session.`);
});
