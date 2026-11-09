# Guia de Bootstrap Prefixado e UI/UX Responsiva para Foundry VTT 🎨

## 1. Princípio Fundamental: Prefixo Obrigatório em TODAS as Classes
No Foundry VTT, múltiplos módulos, sistemas e a própria interface do Core (`ApplicationV2`, menus de configuração, sidebar) compartilham o mesmo DOM global.
> [!CRITICAL]
> **NUNCA injete classes puras do Bootstrap (como `.btn`, `.btn-primary`, `.card`, `.modal`, `.row`, `.col-12`) diretamente no Foundry VTT.** Isso quebra a interface do Core e colide com outros módulos.
> **TODAS as classes e variáveis do Bootstrap DEVEM receber o prefixo exclusivo do sistema ou módulo.**

### Exemplos de Nomenclatura com Prefixo:
- Se o sistema for **Year Zero Engine** (`year-zero-engine` / `yze`):
  - `.btn` ➔ `.yze-btn`
  - `.btn-primary` ➔ `.yze-btn-primary`
  - `.card` ➔ `.yze-card`
  - `.row` ➔ `.yze-row`
  - `.col-md-6` ➔ `.yze-col-md-6`
  - `.table` ➔ `.yze-table`
  - `.form-control` ➔ `.yze-form-control`
- Se for um módulo de armadilhas customizado (`dungeon-traps` / `dt`):
  - `.btn-danger` ➔ `.dt-btn-danger`
  - `.badge` ➔ `.dt-badge`

---

## 2. Gate Obrigatório: Paleta de Cores e Padrão Visual

### Paleta Padrão do Master of Foundry VTT (9 Tons Escala Fria / Azul Profundo)
Caso o usuário não especifique uma paleta personalizada ou prefira utilizar o padrão de excelência da skill, a **Paleta Padrão Oficial** a ser adotada é:

| Nível / Uso | Cor Hex | RGB | Papel na Interface |
|---|---|---|---|
| **L1 - Light Background** | `#F3F6FA` | `(243, 246, 250)` | Fundo claro, cards de contraste, textos sobre fundos escuros |
| **L2 - Surface Hover** | `#DAE1EF` | `(218, 225, 239)` | Bordas suaves, divisores, fundos alternados de linhas em tabelas |
| **L3 - Soft Accent** | `#869DCC` | `(134, 157, 204)` | Ícones secundários, tags desativadas, textos terciários |
| **L4 - Mid Tone** | `#5772AC` | `(87, 114, 172)` | Botões secundários, bordas ativas, tooltips |
| **L5 - Primary / Brand** | `#3B5998` | `(59, 89, 152)` | **Cor Primária Base**, cabeçalhos, botões principais de rolagem |
| **L6 - Dark Primary** | `#224389` | `(34, 67, 137)` | Estados de hover em botões, abas ativas |
| **L7 - Deep Shade** | `#14306B` | `(20, 48, 107)` | Barra de ferramentas, fundos de janelas semitransparentes |
| **L8 - Surface Dark** | `#102655` | `(16, 38, 85)` | Bordas externas de janelas, cabeçalho da janela da ficha |
| **L9 - Midnight Base** | `#091633` | `(9, 22, 51)` | Fundo escuro profundo (Dark Mode), sombra profunda de texto |

### Customização e Gate de Confirmação com o Usuário
Antes de desenvolver qualquer folha de personagem, diálogo, menu ou HUD:
1. **O Agente pode consultar o usuário:**
   - *"Deseja utilizar a paleta padrão de 9 tons da skill (`#091633` até `#F3F6FA`) ou prefere definir uma paleta própria (3 cores principais + 3 de destaque)?"*
2. **Definição das Variáveis Sass com a Paleta Padrão:**
   ```scss
   // assets/styles/palette.scss
   $prefix: "yze-"; // Prefixo exclusivo do sistema/módulo

   // Escala padrão oficial de 9 cores
   $color-l1: #f3f6fa;
   $color-l2: #dae1ef;
   $color-l3: #869dcc;
   $color-l4: #5772ac;
   $color-l5: #3b5998; // Primária
   $color-l6: #224389; // Primária Escura / Hover
   $color-l7: #14306b;
   $color-l8: #102655;
   $color-l9: #091633; // Fundo escuro

   // Mapeamento para variáveis CSS prefixadas
   .#{$prefix}app,
   .#{$prefix}sheet {
     --#{$prefix}c-l1: #{$color-l1};
     --#{$prefix}c-l2: #{$color-l2};
     --#{$prefix}c-l3: #{$color-l3};
     --#{$prefix}c-l4: #{$color-l4};
     --#{$prefix}c-l5: #{$color-l5};
     --#{$prefix}c-l6: #{$color-l6};
     --#{$prefix}c-l7: #{$color-l7};
     --#{$prefix}c-l8: #{$color-l8};
     --#{$prefix}c-l9: #{$color-l9};

     --#{$prefix}primary: var(--#{$prefix}c-l5);
     --#{$prefix}primary-hover: var(--#{$prefix}c-l6);
     --#{$prefix}bg: var(--#{$prefix}c-l9);
     --#{$prefix}surface: var(--#{$prefix}c-l8);
     --#{$prefix}text: var(--#{$prefix}c-l1);
     --#{$prefix}border: var(--#{$prefix}c-l4);
   }
   ```

---

## 3. Compilação e Geração de CSS com Prefixo
Para compilar o Bootstrap com prefixo customizado, use Sass e a diretiva `$prefix`:
```scss
// custom-bootstrap.scss
$prefix: "yze-"; // Altera automaticamente o prefixo do Bootstrap 5.3+

@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";

// Seletor raiz para isolamento
.yze-sheet {
  @import "bootstrap/scss/root";
  @import "bootstrap/scss/reboot";
  @import "bootstrap/scss/type";
  @import "bootstrap/scss/containers";
  @import "bootstrap/scss/grid";
  @import "bootstrap/scss/tables";
  @import "bootstrap/scss/forms";
  @import "bootstrap/scss/buttons";
  @import "bootstrap/scss/transitions";
  @import "bootstrap/scss/dropdown";
  @import "bootstrap/scss/button-group";
  @import "bootstrap/scss/nav";
  @import "bootstrap/scss/navbar";
  @import "bootstrap/scss/card";
  @import "bootstrap/scss/badge";
  @import "bootstrap/scss/alert";
  @import "bootstrap/scss/progress";
  @import "bootstrap/scss/close";
  @import "bootstrap/scss/toasts";
  @import "bootstrap/scss/modal";
  @import "bootstrap/scss/tooltip";
  @import "bootstrap/scss/popover";
  @import "bootstrap/scss/utilities/api";
}
```

---

## 4. Plugins e Componentes Recomendados para Foundry VTT
Estes plugins testados e validados melhoram a ergonomia de fichas e diálogos:

| Categoria | Plugin | Link | Uso Recomendado em Foundry |
|---|---|---|---|
| **Layout & Altura** | `jquery-match-height` | [liabru/jquery-match-height](https://github.com/liabru/jquery-match-height) | Alinhamento de cards de armas, magias e inventário em grid. |
| **Diálogos Modernos** | `use-bootstrap-dialog` | [use-bootstrap/use-bootstrap-dialog](https://github.com/use-bootstrap/use-bootstrap-dialog) | Modais de confirmação, testes de atributo e rolagem customizada. |
| **Progresso Circular** | `jquery-bs-circle-progress`| [ThomasDev-de/jquery-bs-circle-progress](https://github.com/ThomasDev-de/jquery-bs-circle-progress) | Círculos de HP, Mana, Sobrecarga, Stress e Estamina. |
| **Wizards & Criação** | `bootstrap-form-wizard` | [xonipatino/bootstrap-form-wizard](https://github.com/xonipatino/bootstrap-form-wizard) | Assistentes passo-a-passo de criação de personagem ou sessão zero. |
| **Notificações** | `bootstrap5-notify` / `toast`| [chrisgo/bootstrap5-toast](https://github.com/chrisgo/bootstrap5-toast) | Notificações visuais de iniciativa, danos e itens adquiridos. |
| **Selects & Tags** | `dselect` / `bootstrap-select`| [jarstone/dselect](https://github.com/jarstone/dselect) | Seleção de perícias, talentos e filtros com busca integrada. |
| **Abas Verticais** | `bootstrap-5-vertical-tabs` | [tromgy/bootstrap-5-vertical-tabs](https://github.com/tromgy/bootstrap-5-vertical-tabs) | Navegação lateral em fichas complexas (Bio, Stats, Inventário, Magias). |
| **Tabelas de Dados** | `bootstrap-table` | [wenzhixin/bootstrap-table](https://github.com/wenzhixin/bootstrap-table) | Listagens dinâmicas de equipamentos com ordenação e paginação. |
| **Árvore Hierárquica**| `bs5treeview` | [nhmvienna/bs5treeview](https://github.com/nhmvienna/bs5treeview) | Árvores genealógicas, facções, compêndios e hierarquia de talentos. |
| **Avatares** | `bootstrap-avatar` | [ghoststead/bootstrap-avatar](https://github.com/ghoststead/bootstrap-avatar) | Retratos circulares de personagens e tokens na ficha. |

---

## 5. Recursos de Design e Templates para Inspiração
- **Documentação Oficial:** [Bootstrap Docs](https://getbootstrap.com/docs/6.0/)
- **Templates e UI Kits:**
  - [UIdeck App Templates](https://uideck.com/app-templates?filter=bootstrap)
  - [BootstrapMade Free Templates](https://bootstrapmade.com/)
  - [ThemeWagon Bootstrap 5 Themes](https://themewagon.com/theme-price/free/?swoof=1&pa_frameworks=bootstrap-5)
  - [Bootstrap 5 Design Resources](https://github.com/jqueryscript/Bootstrap-5-Design-Resources)

---

## 6. Bibliotecas de Ícones & Fontes Aprovadas para Foundry VTT 🗡️
Ao construir folhas de personagens, botões de ação, itens de inventário e menus, utilize as bibliotecas oficiais aprovadas:

| Biblioteca / Repositório | Link Oficial | Tipo / Formato | Uso Recomendado em Foundry |
|---|---|---|---|
| **Game-Icons.net** | [game-icons.net](https://game-icons.net/) | SVG / PNG (4000+ ícones) | **Fonte principal para itens, magias, armas, talentos e ações de combate.** Baixe o SVG ou use versões em pacote. |
| **RPG Awesome** | [nagoshiashumari/Rpg-Awesome](https://nagoshiashumari.github.io/Rpg-Awesome/) ([GitHub](https://github.com/nagoshiashumari/Rpg-Awesome)) | Icon Font / CSS (`ra ra-*`) | Ícones de fantasia, dados, poções, escudos e status de combate. |
| **Font Awesome** | [fontawesome.com](https://fontawesome.com/) | Web Fonts / SVG / JS (`fa-solid`, etc.) | Ícones de navegação, controles de mídia, engrenagens, usuários e GM tools. |
| **Bootstrap Icons** | [icons.getbootstrap.com](https://icons.getbootstrap.com/) ([GitHub](https://github.com/twbs/icons)) | SVG / Icon Font (`bi bi-*`) | Ícones limpos de sistema, setas, formulários, grids e modais. |
| **Get Social Font** | [HaeckDesign/Get-Social](https://github.com/HaeckDesign/Get-Social-Social-Media-Font) | Icon Font | Ícones de redes sociais, Discord, Patreon, Twitch e links de comunidade em journals/menus. |

> [!TIP]
> **Regra de Download e Ativos Locais:** Caso precise baixar ícones do **Game-Icons.net** para um sistema ou módulo, sempre salve os arquivos em formato **SVG** limpo na pasta de ativos locais (`assets/icons/` ou `icons/`) e confirme se estão acessíveis via HTTP 200 antes de entregar a ficha ou item.
