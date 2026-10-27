/**
 * Integração dos dados de Kimetsu no Yaiba com o módulo Dice So Nice!
 * Registra o sistema e as variações visuais (White, Red e Dark).
 */
Hooks.on('diceSoNiceReady', (dice3d) => {
  // Registra o sistema temático no Dice So Nice
  dice3d.addSystem({ id: "Kimetsu no Yaiba", name: "Kimetsu no Yaiba" }, "default");

  const fontScalePreset = {
    d100: 1.0,
    d20: 1.0,
    d12: 1.1,
    d10: 1.0,
    d8: 1.1,
    d6: 1.2,
    d4: 1.2,
    d2: 1.2
  };

  const themes = [
    {
      textureId: "kny_white",
      textureName: "🎴 Demon Slayer White",
      image: "modules/kimetsu-no-yaiba-dice-so-nice-foundry/img/WHITE.webp",
      colorset: {
        name: "Kimetsu no Yaiba - White Theme",
        description: "⚔️ Caçador de Demônios White",
        category: "Kimetsu no Yaiba",
        background: "#f5f5f5",
        foreground: "#ff010b",
        outline: "#8b0000",
        edge: "#c0b8b0",
        texture: "kny_white",
        material: "metal",
        fontScale: fontScalePreset,
        font: "Blood Crow"
      }
    },
    {
      textureId: "kny_red",
      textureName: "⚔️ Demon Slayer Red",
      image: "modules/kimetsu-no-yaiba-dice-so-nice-foundry/img/RED.webp",
      colorset: {
        name: "Kimetsu no Yaiba - Demon Slayer",
        description: "⚔️ Caçadores de Demônios Red",
        category: "Kimetsu no Yaiba",
        background: "#ff010b",
        foreground: "#ffffff",
        outline: "#000000",
        edge: "#cc0108",
        texture: "kny_red",
        material: "metal",
        fontScale: fontScalePreset,
        font: "Blood Crow"
      }
    },
    {
      textureId: "kny_dark",
      textureName: "🩸 Demon Slayer Dark",
      image: "modules/kimetsu-no-yaiba-dice-so-nice-foundry/img/DARK.webp",
      colorset: {
        name: "Kimetsu no Yaiba - Dark Theme",
        description: "🌙 Noite dos Demônios",
        category: "Kimetsu no Yaiba",
        background: "#1a1a1a",
        foreground: "#ffffff",
        outline: "#ff010b",
        edge: "#330000",
        texture: "kny_dark",
        material: "metal",
        fontScale: fontScalePreset,
        font: "Blood Crow"
      }
    },
    {
      textureId: "kny_dark_blue",
      textureName: "🌊 Demon Slayer Dark Blue",
      image: "modules/kimetsu-no-yaiba-dice-so-nice-foundry/img/DARK_BLUE.webp",
      colorset: {
        name: "Kimetsu no Yaiba - Dark Blue Theme",
        description: "🌊 Respiração da Água (Tomioka)",
        category: "Kimetsu no Yaiba",
        background: "#0c192c",
        foreground: "#00e1d9",
        outline: "#002b49",
        edge: "#0d3b66",
        texture: "kny_dark_blue",
        material: "metal",
        fontScale: fontScalePreset,
        font: "Blood Crow"
      }
    },
    {
      textureId: "kny_dark_green",
      textureName: "🍃 Demon Slayer Dark Green",
      image: "modules/kimetsu-no-yaiba-dice-so-nice-foundry/img/DARK_GREEN.webp",
      colorset: {
        name: "Kimetsu no Yaiba - Dark Green Theme",
        description: "🍃 Haori Tanjiro (Xadrez Verde)",
        category: "Kimetsu no Yaiba",
        background: "#0e2016",
        foreground: "#55ff99",
        outline: "#05140b",
        edge: "#1b4d2e",
        texture: "kny_dark_green",
        material: "metal",
        fontScale: fontScalePreset,
        font: "Blood Crow"
      }
    }
  ];

  // Carrega e ativa cada conjunto de textura e paleta de cores
  for (const theme of themes) {
    dice3d.addTexture(theme.textureId, {
      name: theme.textureName,
      composite: "multiply",
      source: theme.image,
      bump: theme.image
    }).then(() => {
      dice3d.addColorset(theme.colorset, "default");
    }).catch(err => {
      console.warn(`Kimetsu no Yaiba Dice | Erro ao registrar textura ${theme.textureId}:`, err);
    });
  }
});