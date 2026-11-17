# Integração com APIs de Módulos & Sistemas de Terceiros
## Parte Integrante da Skill Master of Foundry VTT — by GM Charles Corrêa

O ecossistema do Foundry VTT é altamente interoperável. Usuários raramente jogam apenas com o sistema puro; eles instalam suítes de automação de combate, animações visuais, dados 3D e interfaces aprimoradas.

O **Engenheiro de Integração & APIs de Módulos** garante que o seu pacote se comunique perfeitamente com os módulos mais populares da comunidade e exporte uma API limpa para terceiros.

---

## 1. Padrão Defensivo de Consumo de APIs Externas

Nunca presuma que um módulo de terceiros está instalado ou ativo. Todo consumo de API deve seguir o padrão **Defensive Inspection & Optional Chaining**:

```javascript
/**
 * Dispara uma animação visual usando o Sequencer, se ativo.
 * @param {Token} tokenOrigem - O token atacante.
 * @param {Token} tokenAlvo - O token defensor.
 */
export async function dispararAnimacaoAtaque(tokenOrigem, tokenAlvo) {
  // 1. Checagem defensiva de módulo ativo
  if (!game.modules.get("sequencer")?.active) {
    // Fallback silencioso: a ação mecânica continua mesmo sem animação
    return;
  }

  // 2. Execução segura da API do Sequencer
  new Sequence()
    .effect()
      .file("jb2a.arrow.physical.green")
      .atLocation(tokenOrigem)
      .reachTowards(tokenAlvo)
    .play();
}
```

---

## 2. As Principais APIs do Ecossistema Foundry

| Módulo | Finalidade | Ponto de Integração / Hook Principal |
| :--- | :--- | :--- |
| **Midi-QOL** | Automação completa de ataques, danos e salvaguardas (D&D 5e) | `Hooks.on("midi-qol.RollComplete", ...)` / flags em itens |
| **Sequencer** | Orquestração de animações, sons e efeitos especiais visuais | Classe global `Sequence()` |
| **Item Piles** | Pilhas de itens no chão, comércio, baús e saques de tokens | `game.itempiles.API` |
| **Token Action HUD** | Barra flutuante de ações rápidas para o token selecionado | Extensão de classes de provedor de sistema (`TokenActionHUD.SystemManager`) |
| **Dice So Nice!** | Rolagem e renderização física de dados 3D no canvas | `Hooks.on("diceSoNiceRollComplete", ...)` / `game.dice3d` |
| **Automated Animations (A-A)**| Gatilhos automáticos de som e animações por nome de item | Configuração de menus e hooks de ataque |
| **Dynamic Active Effects (DAE)**| Efeitos ativos avançados com macros e expirações | Flags `dae` em `ActiveEffect` |

---

## 3. Padrão Canônico para Exportar Sua Própria API

Se o seu módulo fornece utilitários ou cálculos que outros desenvolvedores possam querer reaproveitar em macros ou em outros módulos, registre uma API oficial no hook `init`:

```javascript
// No arquivo principal do módulo (client.mjs)
Hooks.once("init", () => {
  // Criação do objeto de API público
  const moduloAPI = {
    calcularDanoModificado: (base, fator) => base * fator,
    abrirPainelEspecial: () => new MeuPainelAppV2().render(true),
    versao: "1.0.0"
  };

  // Exposição na instância do módulo
  const meuModulo = game.modules.get("meu-modulo-id");
  if (meuModulo) {
    meuModulo.api = moduloAPI;
  }

  // Hook customizado avisando que sua API está pronta para terceiros
  Hooks.callAll("meuModuloReady", moduloAPI);
});
```

