# Arquitetura de Dashboards e Admin Baseada no Mazer (Zuramai) 🏛️📊
> *Canonical Dashboard Architecture based on [zuramai/mazer](https://github.com/zuramai/mazer) with Bootstrap 5.3 & 6.0*

O **Mazer** ([zuramai.github.io/mazer/docs/](https://zuramai.github.io/mazer/docs/index.html) • [demo](https://zuramai.github.io/mazer/demo/index.html)) é o padrão canônico adotado pela skill **Bootstrap-UX-UI-Plus** para interfaces administrativas, portais e dashboards. Ele elimina jQuery, usa JavaScript ES6 modular nativo e implementa uma estrutura de layout altamente ergonômica e responsiva.

---

## 1. Estrutura Canônica de Layout do Mazer (`#app` & `#main`)

O Mazer organiza a tela em dois pilares fundamentais:
```html
<div id="app">
  <!-- 1. Sidebar Fixa/Offcanvas -->
  <div id="sidebar">
    <div class="sidebar-wrapper active">
      <div class="sidebar-header position-relative">...</div>
      <div class="sidebar-menu">
        <ul class="menu">
          <li class="sidebar-title">Menu Principal</li>
          <li class="sidebar-item active">
            <a href="index.html" class="sidebar-link">
              <i class="bi bi-grid-fill"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="sidebar-item has-sub">
            <a href="#" class="sidebar-link">
              <i class="bi bi-stack"></i>
              <span>Cadastros</span>
            </a>
            <ul class="submenu">
              <li class="submenu-item"><a href="/clientes" class="submenu-link">Clientes</a></li>
              <li class="submenu-item"><a href="/produtos" class="submenu-link">Produtos</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 2. Conteúdo Principal -->
  <div id="main" class="layout-navbar navbar-fixed">
    <header class="mb-3">
      <!-- Navbar com botão hambúrguer mobile, busca e perfil -->
      <a href="#" class="burger-btn d-block d-xl-none" aria-label="Abrir Menu">
        <i class="bi bi-justify fs-3"></i>
      </a>
    </header>
    <div class="page-heading">
      <h3>Título da Página</h3>
      <p class="text-subtitle text-muted">Descrição contextual da área de trabalho.</p>
    </div>
    <div class="page-content">
      <!-- Grid de Cards de Estatísticas e Tabelas -->
    </div>
    <footer>
      <!-- Rodapé padrão com direitos e versão -->
    </footer>
  </div>
</div>
```

---

## 2. Padrões de Componentes do Mazer com Leis do UX

### A. Sidebar com Submenus Sanfonados (Lei de Hick & Progressive Disclosure)
- Classes `sidebar-item has-sub` e `submenu` aninhada.
- Itens de menu agrupados por títulos de seção (`sidebar-title`).
- Rota ativa recebe a classe `.active` em `sidebar-item` e `submenu-item`.

### B. Cards de Métricas em Grade (Lei de Miller & Chunking)
- Uso de `.card`, `.card-body`, ícones em caixas com cantos arredondados e contraste sutil:
```html
<div class="col-6 col-lg-3 col-md-6">
  <div class="card border-0 shadow-sm rounded-4">
    <div class="card-body px-4 py-4-5">
      <div class="row align-items-center">
        <div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
          <div class="stats-icon purple mb-2 bg-primary-subtle text-primary p-3 rounded-3">
            <i class="bi bi-eye-fill fs-4"></i>
          </div>
        </div>
        <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
          <h6 class="text-muted font-semibold mb-1">Visualizações</h6>
          <h6 class="font-extrabold mb-0">112.000</h6>
        </div>
      </div>
    </div>
  </div>
</div>
```

### C. Alternador de Tema Claro / Escuro (Dark Mode)
O Mazer utiliza o seletor `data-bs-theme="dark"` integrado ao Bootstrap 5.3+ com persistência via `localStorage`.

