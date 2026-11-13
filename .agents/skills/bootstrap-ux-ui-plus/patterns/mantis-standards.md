# Engenharia Reversa e Padrão Arquitetural: Mantis Dashboard 🐜⚡

> **Reverse Engineering & Canonical Architecture of Mantis Dashboard Template**  
> *Baseado na análise estrutural do Mantis Dashboard (Bootstrap 5.3 & 6.0) por Phoenixcoded / CodedThemes, inspirado em Ant Design / Material Design e adaptado aos padrões de Excelência, Acessibilidade WCAG 2.2 AA e Paleta Corporativa da Skill Bootstrap UX/UI Plus.*

---

## 🇺🇸 English

### 1. Reverse Engineering: Mantis DOM Structure & Visual Language
Mantis is heavily influenced by **Ant Design** (compact typography, subtle border lines, minimal drop shadows) and modern enterprise standards:

```text
┌────────────────────────────────────────────────────────┐
│  <body>                                                │
│    ├── <nav class="pc-sidebar mantis-theme">           │
│    │     ├── .navbar-wrapper                           │
│    │     │     ├── .m-header (Clean Ant-style Logo)    │
│    │     │     └── .navbar-content (Compact Tree)      │
│    │     │           ├── .pc-item.pc-caption (Labels)  │
│    │     │           ├── .pc-item > .pc-link           │
│    │     │           └── .pc-submenu                   │
│    │     └── .pc-badge-support (Pro Help Drawer)       │
│    │                                                   │
│    ├── <header class="pc-header">                      │
│    │     └── .header-wrapper (Global Search + Actions) │
│    │                                                   │
│    └── <div class="pc-container">                      │
│          └── <div class="pc-content">                  │
│                ├── .page-header (Breadcrumbs & Title)  │
│                └── [Bootstrap Living HTML Docs & Grid] │
└────────────────────────────────────────────────────────┘
```

### 2. Mantis vs Able Pro vs Mazer vs AdminKit

| Framework | Inspiração Visual | DOM Wrapper | Ponto Forte |
| :--- | :--- | :--- | :--- |
| **Mantis** | Ant Design / Material | `.pc-sidebar + .pc-header + .pc-container` | Minimalismo compacto, tipografia refinada e cards com borda sutil |
| **Able Pro** | Modern SaaS Enterprise | `.pc-sidebar + .pc-header + .pc-container` | Alta densidade, micro-ícones e paleta vibrante |
| **Mazer** | Clean Responsive Admin | `#app > #sidebar + #main` | Submenus sanfonados profundos e dashboards analíticos |
| **AdminKit** | Feather & Minimalist | `.wrapper > nav.sidebar + div.main` | Simplicidade extrema, zero ruído visual |

---

## 🇧🇷 Português (Brasil)

### 1. Desconstrução Estrutural do Mantis Dashboard
O **Mantis** destaca-se por seu visual inspirado no **Ant Design**:
1. **Tipografia Compacta e Hierárquica:** Ênfase em pesos `500` e `600`, linhas finas de tabela (`table-sm`) e badges discretos.
2. **Cores Neutras Frias:** Fundo cinza suave `#FAFAFB` e bordas `#F0F0F0`.
3. **Padrão da Skill Aplicado:**
   - Paleta corporativa `#90271` (`#224389`, `#3b5998`, `#5772ac`, `#869dcc`, `#14306b`).
   - Acessibilidade WCAG 2.2 AA com alvos de 44px e anéis de foco visíveis.
   - Painel de Conforto Sensorial para TEA/TDAH.

