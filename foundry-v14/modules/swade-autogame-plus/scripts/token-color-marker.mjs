/**
 * @fileoverview Auto Token Color Marker para Savage Worlds (SWADE)
 * [PT-BR] Atribui automaticamente um anel/marcador cromático distinto ao duplicar figurantes ou inimigos na cena.
 * [EN] Automatically assigns a distinct chromatic ring/marker when duplicating extras or enemies on the scene.
 */

export class TokenColorMarker {
  static #colorPalette = [
    { name: "Red", hex: "#ef4444" },
    { name: "Blue", hex: "#3b82f6" },
    { name: "Green", hex: "#10b981" },
    { name: "Yellow", hex: "#f59e0b" },
    { name: "Purple", hex: "#8b5cf6" },
    { name: "Orange", hex: "#f97316" },
    { name: "Teal", hex: "#14b8a6" },
    { name: "Pink", hex: "#ec4899" },
  ];

  /**
   * [PT-BR] Manipula a criação de um token verificando se é um duplicado do mesmo ator na cena.
   * [EN] Handles token creation checking if it's a duplicate of the same actor on scene.
   *
   * @param {TokenDocument} tokenDoc
   */
  static async onPreCreateToken(tokenDoc) {
    if (!game.settings.get("swade-autogame-plus", "enableTokenColorMarker")) {
      return;
    }

    const scene = tokenDoc.parent;
    if (!scene) {
      return;
    }

    const actorId = tokenDoc.actorId;
    if (!actorId) {
      return;
    }

    // [PT-BR] Encontrar outros tokens vinculados ao mesmo ator nesta cena
    // [EN] Find other tokens linked to the same actor in this scene
    const matchingTokens = scene.tokens.filter((t) => t.actorId === actorId);

    if (matchingTokens.length > 0) {
      const index = matchingTokens.length % this.#colorPalette.length;
      const color = this.#colorPalette[index];

      // [PT-BR] Aplicar cor na borda (ring color) ou tonalização do token
      // [EN] Apply color on token ring / tint
      tokenDoc.updateSource({
        ring: {
          enabled: true,
          colors: {
            ring: color.hex,
            background: "#14306b",
          },
        },
        name: `${tokenDoc.name} (${color.name})`,
      });
    }
  }
}
