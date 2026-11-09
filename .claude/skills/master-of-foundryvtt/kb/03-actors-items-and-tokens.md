# Foundry VTT Knowledge Base: Actors, Items & Tokens

> Source: [https://foundryvtt.com/kb/](https://foundryvtt.com/kb/)

## 1. Actor Document vs Token Document
- **Actor:** Database template entity (Player, NPC, Monster, Vehicle).
- **Prototype Token:** Configuration template for size, sight, vision, bars, elevation, and disposition.
- **Linked vs Unlinked Tokens:**
  - *Linked:* Token shares single live HP pool with Actor (Player Characters).
  - *Unlinked:* Each token spawned creates synthetic Actor instance (Monsters/Minions).

## 2. Icon & Asset Resolution Hierarchy for Items & Abilities
When creating or generating Items, Weapons, Armor, Natural Weapons (claws, bites, horns), Shields, Accessories (boots, gloves), Consumables (potions, medicines), Powers, Spells, or Talents:
1. **Core Standard Icons First:** Look for appropriate icons in the core application icon directory:
   `%url-foundry-vtt%/App/resources/app/public/icons/` (served in client paths as `icons/...`, e.g., `icons/weapons/`, `icons/equipment/`, `icons/magic/`, `icons/consumables/`, `icons/commodities/`, `icons/tools/`, `icons/skills/`).
2. **System Icons Directory:** If no exact match exists in core icons, inspect and explore the active game system directory for dedicated icons (`systems/<system-id>/icons/`).
3. **Fallback Generic Core SVGs:** If neither has a specialized icon, fall back to a generic SVG from:
   `%url-foundry-vtt%/App/resources/app/public/icons/svg/` (served as `icons/svg/item-bag.svg`, `icons/svg/sword.svg`, `icons/svg/shield.svg`, `icons/svg/aura.svg`, `icons/svg/d20-black.svg`, `icons/svg/mystery-man.svg`).

