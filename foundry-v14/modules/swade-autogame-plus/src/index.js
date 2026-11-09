/**
 * SWADE AutoGame Plus
 * Ponto de entrada do módulo / Module entry point
 */

Hooks.once("init", () => {
  console.log("SWADE AutoGame Plus (Beta) | Inicializando módulo...");
});

Hooks.once("ready", () => {
  if (game.system.id !== "swade") {
    console.warn("SWADE AutoGame Plus | O sistema ativo não é SWADE. Módulo operando em modo reduzido.");
    return;
  }
  console.log("SWADE AutoGame Plus (Beta) | Pronto e ativo no sistema SWADE.");
});
