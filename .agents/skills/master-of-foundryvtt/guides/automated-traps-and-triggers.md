# Automated Traps & Interactive Triggers Guide ⚡🪤
> *Part of the Master of Foundry VTT Suite by GM Charles Corrêa*

---

## 🇺🇸 English

### 📌 Overview & Architecture
Building automated, interactive traps, teleportation runes, ambush triggers, and puzzle tiles in Foundry Virtual Tabletop is achieved through two industry-standard module ecosystems:

1. **Sequencer (`fantasycalendar/FoundryVTT-Sequencer`):**
   - Documentation: [fantasycomputer.works/FoundryVTT-Sequencer](https://fantasycomputer.works/FoundryVTT-Sequencer/#/)
   - Repository: [github.com/fantasycalendar/FoundryVTT-Sequencer](https://github.com/fantasycalendar/FoundryVTT-Sequencer)
   - Role: Coordinates visual effects (VFX), sound effects (SFX), screen shakes, animated assets, projectile rays, and timing sequences via a fluent JavaScript API.
2. **Monk's Active Tile Triggers (MATT - `ironmonk108/monks-active-tiles`):**
   - Wiki: [github.com/ironmonk108/monks-module-wiki/wiki/Monk's-Active-Tile-Triggers](https://github.com/ironmonk108/monks-module-wiki/wiki/Monk%27s-Active-Tile-Triggers)
   - Repository: [github.com/ironmonk108/monks-active-tiles](https://github.com/ironmonk108/monks-active-tiles)
   - Role: Detects token movement, clicks, or proximity entering an area, evaluating conditions (passive perception, saving throws) and triggering automated action sequences (damage, status effects, playing Sequencer animations, rolling tables, opening doors).

---

### 📦 Mandatory Dependencies & Recommended Add-ons
When guiding a user to configure automated traps, advise them to install:

| Module | Purpose | Essentiality |
| :--- | :--- | :--- |
| **Monk's Active Tile Triggers** | Visual tile trigger editor, step-by-step logic nodes (triggers on Enter, Leave, Click). | **Core Engine** |
| **Sequencer** | Fluent animation and sound pipeline orchestrator (`new Sequence()...`). | **Core VFX Engine** |
| **JB2A - Jules and Ben's Animated Assets** | Massive library of animated spell templates, explosions, trap darts, flames, and runes (`jb2a_patreon` or `JB2A_DnD5e`). | **Recommended VFX** |
| **Item Piles** | For container traps (mimics, trapped chests, poison needles on open). | Optional |
| **Automated Animations (A-A)** | Automatic trigger mapping for weapons and items. | Optional |
| **Token Magic FX** | Visual distortion filters, fire auras, and radioactive acid pools. | Optional |

---

### 💻 Sequencer Code Pattern for Traps
To trigger an explosive poison dart trap when a token steps on a tile:

```javascript
// Sequencer Trap Execution Script
const targetToken = args.token || canvas.tokens.controlled[0];
if (!targetToken) return;

new Sequence()
  // 1. Trap Click Sound
  .sound()
    .file("sounds/doors/creak.ogg")
    .volume(0.5)
  // 2. Play Dart Ray VFX towards token
  .effect()
    .file("jb2a.ray_of_frost.blue")
    .atLocation({ x: 1200, y: 1500 }) // Wall trap hole location
    .stretchTo(targetToken)
  // 3. Poison Cloud Explosion on Token
  .effect()
    .file("jb2a.cloud_of_daggers.01.poison")
    .atLocation(targetToken)
    .scale(0.8)
    .fadeIn(200)
    .fadeOut(500)
  // 4. Camera Screen Shake
  .canvasPan()
    .atLocation(targetToken)
    .shake({ duration: 500, strength: 5 })
  .play();
```

---
---

## 🇧🇷 Português (Brasil)

### 📌 Visão Geral & Arquitetura
A criação de armadilhas automáticas, runas arcanas, teletransportes, emboscadas e quebra-cabeças no Foundry Virtual Tabletop é sustentada por dois ecossistemas líderes:

1. **Sequencer (`fantasycalendar/FoundryVTT-Sequencer`):**
   - Documentação Oficial: [fantasycomputer.works/FoundryVTT-Sequencer](https://fantasycomputer.works/FoundryVTT-Sequencer/#/)
   - Repositório: [github.com/fantasycalendar/FoundryVTT-Sequencer](https://github.com/fantasycalendar/FoundryVTT-Sequencer)
   - Função: Orquestra efeitos visuais (VFX), sonoros (SFX), tremores de tela, feixes de projéteis e temporizações via API fluente em JavaScript.
2. **Monk's Active Tile Triggers (MATT - `ironmonk108/monks-active-tiles`):**
   - Wiki Oficial: [github.com/ironmonk108/monks-module-wiki/wiki/Monk's-Active-Tile-Triggers](https://github.com/ironmonk108/monks-module-wiki/wiki/Monk%27s-Active-Tile-Triggers)
   - Repositório: [github.com/ironmonk108/monks-active-tiles](https://github.com/ironmonk108/monks-active-tiles)
   - Função: Detecta movimentação de tokens (Entrar, Sair, Clicar), checa testes de atributos/percepção e dispara ações em cadeia (aplicar dano, abrir portas, trancar salas, rolar tabelas e disparar sequências do Sequencer).

---

### 📦 Dependências Obrigatórias & Módulos Recomendados
Ao orientar um Mestre ou desenvolvedor a montar armadilhas automatizadas, recomende a instalação dos seguintes módulos:

| Módulo | Finalidade | Nível |
| :--- | :--- | :--- |
| **Monk's Active Tile Triggers** | Editor visual de gatilhos em Tiles (pisou, clicou, passou perto). | **Motor Principal** |
| **Sequencer** | Motor fluente de animações visuais e áudio sincronizado. | **Motor de Efeitos (VFX)** |
| **JB2A (Animated Assets)** | Acervo de animações de magias, dardos, explosões e runas (`JB2A_DnD5e` gratuito ou versão Patreon). | **Biblioteca VFX Recomendada** |
| **Item Piles** | Para baús com armadilhas (baús trancados com agulha envenenada ou mímicos). | Opcional |
| **Automated Animations (A-A)** | Automação de ataques, magias e projéteis. | Opcional |
| **Token Magic FX** | Efeitos de distorção de mapa, poças de ácido e névoa venenosa. | Opcional |

---

### 💻 Exemplo de Script Sequencer para Disparo de Armadilha
Quando o jogador pisa no tile (via MATT executando macro):

```javascript
// Disparo de Armadilha com Sequencer
const tokenAlvo = args.token || canvas.tokens.controlled[0];
if (!tokenAlvo) return;

new Sequence()
  // 1. Som mecânico da armadilha desarmando
  .sound()
    .file("sounds/doors/creak.ogg")
    .volume(0.6)
  // 2. Dardo voando da parede em direção ao Token
  .effect()
    .file("jb2a.ray_of_frost.blue")
    .atLocation({ x: 1200, y: 1500 }) // Posição do buraco na parede
    .stretchTo(tokenAlvo)
  // 3. Explosão de fumaça ácida / venenosa no token
  .effect()
    .file("jb2a.cloud_of_daggers.01.poison")
    .atLocation(tokenAlvo)
    .scale(0.8)
    .fadeIn(250)
    .fadeOut(500)
  // 4. Tremor de tela dramático para todos os jogadores
  .canvasPan()
    .atLocation(tokenAlvo)
    .shake({ duration: 500, strength: 6 })
  .play();
```
