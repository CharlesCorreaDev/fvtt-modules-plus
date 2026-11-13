# Engenharia Reversa e Padrão Arquitetural: Able Pro (Phoenixcoded) 💎⚡

> **Reverse Engineering & Canonical Architecture of Able Pro Dashboard Template**  
> *Baseado na análise estrutural do Able Pro (Bootstrap 5.3 & 6.0) por Phoenixcoded, adaptado aos padrões de Excelência, Acessibilidade WCAG 2.2 AA e Paleta Corporativa da Skill Bootstrap UX/UI Plus.*

---

## 🇺🇸 English

### 1. Reverse Engineering: Core DOM Architecture
Able Pro uses a distinct high-performance enterprise layout based on modular `.pc-*` namespaces:

```text
┌────────────────────────────────────────────────────────┐
│  <body>                                                │
│    ├── <nav class="pc-sidebar">                        │
│    │     ├── .navbar-wrapper                           │
│    │     │     ├── .m-header (Logo & Collapse toggle)  │
│    │     │     └── .navbar-content (Navigation tree)   │
│    │     │           ├── .pc-caption (Section Header)  │
│    │     │           ├── .pc-item (Navigation item)    │
│    │     │           └── .pc-submenu (Collapsible tree)│
│    │     └── .card.pc-user-card (Profile widget)       │
│    │                                                   │
│    ├── <header class="pc-header">                      │
│    │     └── .header-wrapper (Search & User Topbar)    │
│    │                                                   │
│    └── <div class="pc-container">                      │
│          └── <div class="pc-content">                  │
│                ├── .page-header (Breadcrumb & Titles)  │
│                └── [Grid Rows & Analytical Cards]      │
└────────────────────────────────────────────────────────┘
```

### 2. Able Pro UX Strengths & Our Enhancements
1. **Visual Density & Spacing Rhythm:** Able Pro excels at high data density while maintaining sleek visual air. We enforce strict base 4/8px spacing and subtle elevation (`box-shadow: 0 2px 6px rgba(0,0,0,0.02)`).
2. **Light Theme by Default:** Strictly enforces `data-bs-theme="light"` with corporate palette `#90271` (`#224389`, `#3b5998`, `#5772ac`, `#869dcc`, `#14306b`).
3. **Accessibility Integration (WCAG 2.2 AA):**
   - Visible high-contrast focus rings (`outline: 3px solid #f5a623`).
   - Touch targets $\ge 44$px for mobile navigation triggers.
   - Screen-reader tags (`aria-expanded`, `aria-controls`, `aria-label`).
4. **Neurodiversity & Sensory Comfort Panel (TEA/TDAH):** Built-in toggle to disable animations and soften high contrast.

---

## 🇧🇷 Português (Brasil)

### 1. Desconstrução Estrutural do Able Pro
Diferente do Mazer (`#app > #sidebar + #main`) e do AdminKit (`.wrapper > nav.sidebar + div.main`), o **Able Pro** estrutura sua interface em 3 elementos irmãos dentro do `body`:
1. `nav.pc-sidebar`: Barra de navegação lateral com cabeçalho de marca (`.m-header`), árvore de navegação com categorias (`.pc-caption`), itens (`.pc-item`), links (`.pc-link`) e submenus sanfonados (`.pc-submenu`).
2. `header.pc-header`: Topbar fixo com barra de pesquisa expandida, gatilho do menu hambúrguer para mobile e controles de perfil.
3. `div.pc-container > div.pc-content`: Área de visualização do conteúdo com compensação de margem esquerda e superior automática.

### 2. Aplicação das Regras Canônicas da Skill
- **Zero jQuery:** Manipulação 100% em Vanilla ES6 modular.
- **Tema Claro Mandatório:** Carregamento padrão em `data-bs-theme="light"`.
- **Prevenção de AI Slop:** Sem cards aninhados desnecessários, sem sombras pretas pesadas e sem gradientes agressivos.
- **Tipografia Oficial:** Google Sans (`Google Sans Flex` para títulos e `Google Sans` para textos).

