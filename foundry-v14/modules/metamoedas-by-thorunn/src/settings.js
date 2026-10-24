export const MODULE_ID = "metamoedas-by-thorunn";

export const SETTINGS = {
  COINS: "currentCoins",
  SCENE_INFRACTIONS: "sceneInfractions",
  VISIBILITY: "visibility",
  PLAY_SOUND: "playSound"
};

export function registerSettings() {
  // 1. Saldo de Metamoedas (Armazenado no Mundo)
  game.settings.register(MODULE_ID, SETTINGS.COINS, {
    name: "METAMOEDAS.Settings.Coins.Name",
    hint: "METAMOEDAS.Settings.Coins.Hint",
    scope: "world",
    config: false,
    type: Number,
    default: 0,
    onChange: () => {
      Hooks.callAll("metamoedasBalanceChanged");
    }
  });

  // 2. Infrações da Cena Atual
  game.settings.register(MODULE_ID, SETTINGS.SCENE_INFRACTIONS, {
    name: "METAMOEDAS.Settings.SceneInfractions.Name",
    hint: "METAMOEDAS.Settings.SceneInfractions.Hint",
    scope: "world",
    config: false,
    type: Number,
    default: 0,
    onChange: () => {
      Hooks.callAll("metamoedasSceneChanged");
    }
  });

  // 3. Visibilidade do Saldo
  game.settings.register(MODULE_ID, SETTINGS.VISIBILITY, {
    name: "METAMOEDAS.Settings.Visibility.Name",
    hint: "METAMOEDAS.Settings.Visibility.Hint",
    scope: "world",
    config: true,
    type: String,
    choices: {
      "gmOnly": "METAMOEDAS.Settings.Visibility.GMOnly",
      "public": "METAMOEDAS.Settings.Visibility.Public"
    },
    default: "gmOnly",
    onChange: () => {
      ui.controls?.render();
    }
  });

  // 4. Visibilidade do Card no Chat
  game.settings.register(MODULE_ID, "chatVisibility", {
    name: "METAMOEDAS.Settings.ChatVisibility.Name",
    hint: "METAMOEDAS.Settings.ChatVisibility.Hint",
    scope: "world",
    config: true,
    type: String,
    choices: {
      "whisperTarget": "METAMOEDAS.Settings.ChatVisibility.WhisperTarget",
      "gmOnly": "METAMOEDAS.Settings.ChatVisibility.GMOnly",
      "public": "METAMOEDAS.Settings.ChatVisibility.Public"
    },
    default: "whisperTarget"
  });

  // 5. Tocar Efeitos Sonoros
  game.settings.register(MODULE_ID, SETTINGS.PLAY_SOUND, {
    name: "METAMOEDAS.Settings.PlaySound.Name",
    hint: "METAMOEDAS.Settings.PlaySound.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
}
