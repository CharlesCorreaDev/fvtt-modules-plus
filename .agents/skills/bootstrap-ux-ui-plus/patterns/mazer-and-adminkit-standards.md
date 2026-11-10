# Padrões Arquiteturais de Referência: Mazer & AdminKit 🏛️📊

Para criar sistemas administrativos, portais corporativos e dashboards de nível de produção com Bootstrap 5.3 & 6.0, esta skill estabelece como **referências canônicas oficiais** dois dos repositórios mais consagrados do ecossistema:

1. 🌟 **Mazer** ([github.com/zuramai/mazer](https://github.com/zuramai/mazer) • [docs](https://zuramai.github.io/mazer/docs/index.html) • [demo](https://zuramai.github.io/mazer/demo/index.html))
2. ⚡ **AdminKit** ([github.com/adminkit/adminkit](https://github.com/adminkit/adminkit) • [demo/site](https://adminkit.io/))

Ambos são **100% livres de jQuery**, utilizam **Vanilla ES6 modular**, possuem foco em alta usabilidade, acessibilidade WCAG 2.2 AA e **utilizam estritamente o tema claro (Light Theme) como padrão**. O tema escuro/noturno só é ativado se expressamente solicitado pelo usuário.

> [!IMPORTANT]
> **DIRETRIZ DE TEMA:** Tanto o Mazer quanto o AdminKit e qualquer layout gerado por esta skill devem sempre ser inicializados com `data-bs-theme="light"` e classes de fundo claro (`bg-light`, `bg-body-tertiary`). O tema noturno (`data-bs-theme="dark"`) é estritamente opcional sob demanda explícita do usuário.

---

## 1. Comparativo de Arquitetura: Mazer vs AdminKit

| Característica | Mazer (`zuramai/mazer`) | AdminKit (`adminkit/adminkit`) |
|---|---|---|
| **Contêiner Principal** | `<div id="app">` | `<div class="wrapper">` |
| **Sidebar Lateral** | `<div id="sidebar">` + `.sidebar-wrapper` | `<nav id="sidebar" class="sidebar js-sidebar">` |
| **Itens de Menu** | `.sidebar-item`, `.sidebar-link`, `.has-sub` | `.sidebar-item`, `.sidebar-link`, `.sidebar-header` |
| **Submenus Sanfonados** | `ul.submenu` + `li.submenu-item` | `ul.sidebar-dropdown.collapse` |
| **Área de Conteúdo** | `<div id="main">` | `<div class="main">` |
| **Navbar / Topbar** | Integrada no cabeçalho ou com `.layout-navbar` | `<nav class="navbar navbar-expand navbar-light navbar-bg">` |
| **Ponto Forte de UX** | Excelente para dashboards de dados com muitos submenus agrupados | Visual minimalista ultramoderno, tipografia refinada e cards com acabamento suave |

---

## 2. Estrutura Canônica Inspirada no AdminKit (`.wrapper` & `.main`)

```html
<div class="wrapper">
  <!-- Sidebar Lateral -->
  <nav id="sidebar" class="sidebar js-sidebar" aria-label="Menu Lateral">
    <div class="sidebar-content js-simplebar">
      <a class="sidebar-brand text-decoration-none" href="index.html">
        <span class="align-middle fw-bold">AdminKit Pro</span>
      </a>

      <ul class="sidebar-nav list-unstyled">
        <li class="sidebar-header text-uppercase text-muted small fw-semibold px-3 mb-2">
          Páginas
        </li>

        <li class="sidebar-item active">
          <a class="sidebar-link d-flex align-items-center" href="index.html">
            <i class="bi bi-sliders me-2"></i>
            <span class="align-middle">Dashboard</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link d-flex align-items-center" href="pages-profile.html">
            <i class="bi bi-person me-2"></i>
            <span class="align-middle">Perfil</span>
          </a>
        </li>

        <li class="sidebar-header text-uppercase text-muted small fw-semibold px-3 my-2">
          Módulos
        </li>

        <li class="sidebar-item">
          <a data-bs-target="#crmDropdown" data-bs-toggle="collapse" class="sidebar-link collapsed d-flex align-items-center" aria-expanded="false">
            <i class="bi bi-briefcase me-2"></i>
            <span class="align-middle">Vendas & CRM</span>
            <i class="bi bi-chevron-down ms-auto small"></i>
          </a>
          <ul id="crmDropdown" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li class="sidebar-item"><a class="sidebar-link ps-4" href="/leads">Leads</a></li>
            <li class="sidebar-item"><a class="sidebar-link ps-4" href="/pedidos">Pedidos</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Área Principal de Execução -->
  <div class="main d-flex flex-column min-vh-100 flex-grow-1">
    <nav class="navbar navbar-expand navbar-light bg-body border-bottom px-4 py-2 sticky-top">
      <a class="sidebar-toggle js-sidebar-toggle btn btn-light border-0 me-2" aria-label="Recolher Menu">
        <i class="bi bi-list fs-4"></i>
      </a>
      <div class="navbar-collapse collapse">
        <ul class="navbar-nav ms-auto align-items-center gap-2">
          <!-- Notificações, Modo Escuro e Perfil -->
        </ul>
      </div>
    </nav>

    <main class="content p-4">
      <div class="container-fluid p-0">
        <!-- Grid de Métricas e Gráficos -->
      </div>
    </main>
  </div>
</div>
```

---

## 3. Diretriz de Design e Composição para Agentes de IA

Sempre que a skill **Bootstrap-UX-UI-Plus** for solicitada para gerar uma nova tela de administração, painel de controle ou portal:
1. **Layout Canônico Obrigatório:** Escolha expressamente o padrão **Mazer** (`#app > #sidebar + #main`) ou o padrão **AdminKit** (`.wrapper > .sidebar + .main`).
2. **Zero Dependência de jQuery:** O colapso de menus, alternador de temas e modais devem usar estritamente o JavaScript nativo do Bootstrap 5.3+ (`data-bs-toggle="collapse"`, `data-bs-toggle="dropdown"`, etc.).
3. **Chunking & Hierarquia (Leis de Miller e Hick):** Agrupe informações correlatas em `.card.border-0.shadow-sm.rounded-3` ou `rounded-4`, com tipografia clara e sem superlotação visual.
4. **Alvos de Toque & Acessibilidade (Fitts & WCAG):** Alvos clicáveis mínimos de 44px, botões com `aria-label`, foco visível preservado e suporte a tema claro e escuro.

