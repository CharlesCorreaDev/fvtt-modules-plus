# Manual Mestre e Canônico de HTML5 & CSS3 Moderno 🌐🎨⚡

> **Objetivo Técnico:**  
> Estabelecer o manual técnico canônico, completo e aprofundado de **HTML5 Semântico** e **CSS3 Moderno** (sintetizando as especificações do W3C/WHATWG e a documentação clássica e de referência do **W3Schools HTML & CSS**), enriquecido com **diretrizes mandatórias de efeitos sofisticados de transição, hover, active, focus e microinterações** para todos os templates do ecossistema **Bootstrap 5.3+ e 6.0**, incorporando referências ao **Anime.js**, **Motion.dev**, **PureCSS-Animations**, **CodePen Hover Collections** e aos acervos nacionais **Recursos Frontend** e **Guia do Frontend Brasil**.

---

## 🇺🇸 Quick Summary & Golden Rules for AI Agents

1. **Strict HTML5 Semantic Structure:** Always produce valid semantic trees (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<time>`). Zero `<div>` soup. Only one `<main>` per page.
2. **Accessible Form Architecture:** Every `<input>` strictly paired with a `<label for="...">`, explicit `type`, `autocomplete`, client-side constraints (`required`, `pattern`, `min/max`), and accessible validation feedback (`aria-describedby`, `.invalid-feedback`).
3. **Responsive Grid & Flexbox Harmony:** Use Flexbox for 1D component flows and CSS Grid for 2D layouts and dashboard cards. Prefer `repeat(auto-fit, minmax(min, 1fr))` over rigid breakpoint clutter.
4. **Mandatory Visual Delights (Microinteractions):** All UI templates MUST include polished, GPU-accelerated transition, hover, active, and focus-visible states. Buttons, cards, and links must never feel static or dead.
5. **GPU Offloading & Reflow Defense:** Strictly animate `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
6. **Inviolable Accessibility Gate:** Respect `@media (prefers-reduced-motion: reduce)` on all animations and guarantee a visible 2px focus ring (`:focus-visible`) with 3px outline offset.

---

## 🏗️ PARTE 1: O COMPÊNDIO CANÔNICO DE HTML5 (PADRÕES W3SCHOOLS & WHATWG)

O HTML5 moderno não é apenas markup de exibição; ele projeta diretamente a árvore de acessibilidade (**Accessibility Object Model - AOM**) consumida por leitores de tela (NVDA, VoiceOver, JAWS) e motores de busca (SEO Semântico).

### 1.1 Estrutura Canônica de um Documento HTML5
Todo template HTML gerado pela skill deve iniciar rigorosamente com o esqueleto canônico:

```html
<!DOCTYPE html>
<html lang="pt-BR" data-bs-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  
  <!-- SEO e Descrição Semântica -->
  <title>Painel Administrativo Mazer | Gestão e Métricas Corporativas</title>
  <meta name="description" content="Dashboard administrativo moderno e acessível com métricas em tempo real, tabelas de dados e gestão financeira.">
  <meta name="author" content="Charles Corrêa">
  <meta name="robots" content="index, follow">

  <!-- Open Graph & Twitter Cards -->
  <meta property="og:title" content="Painel Administrativo Mazer">
  <meta property="og:description" content="Dashboard corporativo moderno, responsivo e 100% acessível WCAG 2.2 AA.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="assets/images/og-preview.png">
  <meta name="twitter:card" content="summary_large_image">

  <!-- Favicon Multiformato e PWA Theme -->
  <link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">
  <link rel="alternate icon" href="favicon.ico">
  <meta name="theme-color" content="#3b5998">

  <!-- Preconnect para Fontes de Alta Performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- CSS Framework (Bootstrap 5.3+ ou 6.0) e Estilos Customizados -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/main.css">
</head>
<body class="bg-light text-dark d-flex flex-column min-vh-100">

  <!-- Link de Acessibilidade Mandatório: Pular para Conteúdo Principal -->
  <a href="#main-content" class="visually-hidden-focusable p-3 bg-primary text-white position-absolute top-0 start-0 z-3">
    Pular para o conteúdo principal
  </a>

  <!-- Cabeçalho Global Institucional / Banner -->
  <header role="banner">
    <nav class="navbar navbar-expand-lg bg-white border-bottom shadow-sm" aria-label="Navegação Principal">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold text-primary d-flex align-items-center gap-2" href="#">
          <svg class="bi" width="24" height="24" fill="currentColor" aria-hidden="true"><use xlink:href="#bootstrap"/></svg>
          Mazer Admin
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Alternar navegação">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
          <!-- Links de Navegação -->
        </div>
      </div>
    </nav>
  </header>

  <!-- Ponto de Entrada Exclusivo do Conteúdo Principal -->
  <main id="main-content" class="flex-grow-1 py-4" role="main">
    <div class="container-fluid px-4">
      <!-- Seções, cards, tabelas e dados -->
    </div>
  </main>

  <!-- Rodapé Semântico -->
  <footer class="bg-white border-top py-3 mt-auto" role="contentinfo">
    <div class="container text-center text-muted small">
      &copy; 2026 Mazer UI. Desenvolvido com Bootstrap 5.3+ e Boas Práticas W3C.
    </div>
  </footer>

  <!-- Scripts com carregamento assíncrono ou no final do body -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
</body>
</html>
```

---

### 1.2 Tabela de Tags Semânticas e Diretrizes de Uso (W3Schools HTML Standard)

| Tag HTML5 | Papel Semântico & Função | O que NUNCA fazer (Erros Comuns) |
| :--- | :--- | :--- |
| `<header>` | Cabeçalho introdutório da página ou de um `<article>` / `<section>`. | Não confunda com a tag de metadados `<head>`. Não use múltiplos cabeçalhos de página sem contexto. |
| `<nav>` | Bloco contendo exclusivamente links de navegação principal ou paginação. | Não envolva todos os links do site em `<nav>` (ex: links soltos em parágrafos ou termos de uso do rodapé). |
| `<main>` | O conteúdo dominante e exclusivo da página atual. | **Apenas 1 `<main>` visível por documento.** NUNCA coloque dentro de `<header>`, `<nav>` ou `<footer>`. |
| `<article>` | Unidade independente de conteúdo que faz sentido se republicada isoladamente (notícia, post, card de produto, comentário). | Não use para agrupar simples listas de botões ou blocos sem independência de contexto. |
| `<section>` | Agrupamento temático de conteúdo que possui título próprio (`<h2>` a `<h6>`). | Não utilize como mero substituto estético de `<div>` para estilização CSS. |
| `<aside>` | Conteúdo secundário ou tangencial (barra lateral, widgets relacionados, glossários). | Não coloque informações cruciais do fluxo principal dentro de um `<aside>`. |
| `<figure>` / `<figcaption>` | Mídias, ilustrações, diagramas ou trechos de código com legenda explícita. | Não use para simples ícones decorativos ou avatares pequenos de usuário. |
| `<time>` | Datas, durações ou horários interpretáveis por robôs (`datetime="2026-11-13T14:30"`). | Não use texto puro sem atributo `datetime` para datas de publicações ou agendamentos. |
| `<mark>` | Texto destacado por relevância circunstancial (ex: termos encontrados em uma busca). | Não use apenas para sublinhar ou colorir texto esteticamente. |
| `<details>` & `<summary>` | Acordeão/divulgação nativa de conteúdo sem necessidade de JavaScript. | Não use quando a interação precisar de tracking complexo sem manipular eventos `toggle`. |
| `<dialog>` | Caixa de diálogo modal nativa com backdrop e métodos nativos `.showModal()` e `.close()`. | Não tente gerenciar z-index manualmente quando o navegador fornece a camada nativa de top layer. |

---

### 1.3 Formulários Profundos & Acessíveis (W3Schools Form Master Guide)

O formulário é o principal ponto de conversão e atrito de uma interface web. Todo formulário deve ser 100% resiliente:

```html
<form action="/api/v1/cadastro" method="POST" novalidate class="needs-validation">
  
  <fieldset class="border rounded p-3 mb-4">
    <legend class="float-none w-auto px-2 fs-6 fw-bold text-primary">Dados Pessoais</legend>

    <!-- Campo Nome Completo com Label Vinculada -->
    <div class="mb-3">
      <label for="userName" class="form-label fw-semibold">Nome Completo <span class="text-danger" aria-hidden="true">*</span></label>
      <input type="text" class="form-control" id="userName" name="userName" required autocomplete="name" minlength="3" maxlength="100" placeholder="Ex: Maria da Silva" aria-describedby="userNameHelp">
      <div id="userNameHelp" class="form-text">Informe seu nome social ou de registro.</div>
      <div class="invalid-feedback">Por favor, preencha seu nome completo (mínimo de 3 caracteres).</div>
    </div>

    <!-- Campo E-mail com Validação e Tipagem Específica -->
    <div class="mb-3">
      <label for="userEmail" class="form-label fw-semibold">E-mail Corporativo <span class="text-danger" aria-hidden="true">*</span></label>
      <input type="email" class="form-control" id="userEmail" name="userEmail" required autocomplete="email" placeholder="nome@empresa.com" aria-describedby="userEmailHelp">
      <div id="userEmailHelp" class="form-text">Utilizaremos seu e-mail para confirmação e autenticação em 2 etapas.</div>
      <div class="invalid-feedback">Informe um endereço de e-mail válido.</div>
    </div>

    <!-- Datalist para Autocomplete Nativo -->
    <div class="mb-3">
      <label for="userDepartment" class="form-label fw-semibold">Departamento</label>
      <input class="form-control" list="departmentOptions" id="userDepartment" name="department" placeholder="Selecione ou digite seu departamento">
      <datalist id="departmentOptions">
        <option value="Tecnologia da Informação">
        <option value="Design & Produto">
        <option value="Recursos Humanos">
        <option value="Financeiro & Contabilidade">
        <option value="Operações & Logística">
      </datalist>
    </div>

    <!-- Select com Optgroups -->
    <div class="mb-3">
      <label for="userRole" class="form-label fw-semibold">Função / Nível</label>
      <select class="form-select" id="userRole" name="role" required>
        <option value="" selected disabled>Escolha uma opção...</option>
        <optgroup label="Engenharia & Produto">
          <option value="dev_jr">Desenvolvedor(a) Júnior</option>
          <option value="dev_pl">Desenvolvedor(a) Pleno</option>
          <option value="dev_sr">Desenvolvedor(a) Sênior / Especialista</option>
          <option value="tech_lead">Tech Lead / Arquiteto</option>
        </optgroup>
        <optgroup label="Gestão">
          <option value="pm">Product Manager</option>
          <option value="scrum_master">Scrum Master</option>
          <option value="director">Diretor / C-Level</option>
        </optgroup>
      </select>
    </div>

    <!-- Checkbox de Aceite Legal -->
    <div class="form-check mb-3">
      <input class="form-check-input" type="checkbox" id="termsCheck" name="terms" required>
      <label class="form-check-label" for="termsCheck">
        Li e aceito os <a href="/termos" target="_blank" rel="noopener noreferrer">Termos de Serviço</a> e a <a href="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.
      </label>
      <div class="invalid-feedback">É obrigatório aceitar os termos para prosseguir.</div>
    </div>

  </fieldset>

  <!-- Botão de Ação com Efeito Tátil e Loading State -->
  <div class="d-flex justify-content-end gap-2">
    <button type="reset" class="btn btn-outline-secondary px-4 btn-interactive">Limpar</button>
    <button type="submit" class="btn btn-primary px-4 btn-interactive btn-glow">
      <span class="spinner-border spinner-border-sm me-2 d-none" role="status" aria-hidden="true"></span>
      Salvar Cadastro
    </button>
  </div>

</form>
```

---

### 1.4 Tabelas Acessíveis de Alta Densidade (Data Tables)

```html
<div class="table-responsive rounded shadow-sm border bg-white">
  <table class="table table-hover align-middle mb-0" aria-label="Tabela de Usuários Ativos">
    <caption class="p-3 text-muted small">Lista completa de colaboradores e suas permissões atualizadas em tempo real.</caption>
    <thead class="table-light">
      <tr>
        <th scope="col" class="py-3 px-3">Colaborador</th>
        <th scope="col" class="py-3 px-3">Departamento</th>
        <th scope="col" class="py-3 px-3">Status</th>
        <th scope="col" class="py-3 px-3">Último Acesso</th>
        <th scope="col" class="py-3 px-3 text-end">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="px-3">
          <div class="d-flex align-items-center gap-3">
            <img src="assets/images/avatar-1.jpg" alt="" class="rounded-circle" width="36" height="36" loading="lazy">
            <div>
              <div class="fw-bold">Carlos Mendes</div>
              <div class="text-muted small">carlos.mendes@empresa.com</div>
            </div>
          </div>
        </td>
        <td class="px-3">Engenharia de Software</td>
        <td class="px-3"><span class="badge bg-success-subtle text-success border border-success-subtle">Ativo</span></td>
        <td class="px-3"><time datetime="2026-11-13T10:15">Hoje às 10:15</time></td>
        <td class="px-3 text-end">
          <button class="btn btn-sm btn-outline-primary btn-interactive" aria-label="Editar Carlos Mendes">Editar</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

### 1.5 Mídia Rica, Gráficos & Vetores (Imagens Responsivas, SVG & Canvas)

```html
<!-- Imagem Responsiva com Picture Tag (W3Schools Images) -->
<picture>
  <source media="(min-width: 992px)" srcset="assets/images/hero-desktop.webp 1200w, assets/images/hero-desktop@2x.webp 2400w" type="image/webp">
  <source media="(min-width: 576px)" srcset="assets/images/hero-tablet.webp 800w" type="image/webp">
  <img src="assets/images/hero-mobile.webp" alt="Visão panorâmica do painel analítico com gráficos interativos" class="img-fluid rounded shadow-sm" width="1200" height="600" loading="lazy" decoding="async">
</picture>

<!-- SVG Inline com Acessibilidade Rigorosa -->
<svg class="icon-dashboard" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-labelledby="svgDashTitle svgDashDesc">
  <title id="svgDashTitle">Ícone de Métricas e Análise</title>
  <desc id="svgDashDesc">Um gráfico de linha indicando evolução positiva de indicadores corporativos.</desc>
  <line x1="18" y1="20" x2="18" y2="10"></line>
  <line x1="12" y1="20" x2="12" y2="4"></line>
  <line x1="6" y1="20" x2="6" y2="14"></line>
</svg>
```

---

## 🎨 PARTE 2: O COMPÊNDIO CANÔNICO DE CSS3 MODERNO (PADRÕES W3SCHOOLS & W3C)

### 2.1 Especificidade, Cascade Layers (`@layer`) e Seletores Avançados

O CSS moderno organiza o fluxo da cascata através de **Cascade Layers**, eliminando guerras de `!important`:

```css
/* Definição de Precedência das Camadas */
@layer reset, framework, components, utilities, overrides;

@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

@layer components {
  /* Seletores Modernos: :is(), :where(), :has() */
  
  /* :is() agrupa com especificidade da regra mais alta */
  :is(h1, h2, h3, h4) {
    font-family: var(--bs-font-heading);
    color: var(--bs-brand-900);
    letter-spacing: -0.02em;
  }

  /* :where() agrupa com especificidade ZERO (perfeito para estilos padrão substituíveis) */
  :where(a) {
    text-decoration: none;
    color: var(--bs-brand-500);
  }

  /* :has() - O Seletor de Pai Relacional */
  /* Estiliza o card caso ele contenha uma imagem de destaque */
  .card:has(img.card-hero) {
    overflow: hidden;
    border-color: var(--bs-brand-300);
  }

  /* Altera a borda do formulário quando há campos inválidos dentro dele */
  form:has(:invalid:not(:placeholder-shown)) {
    border-left: 4px solid var(--bs-danger);
  }
}
```

---

### 2.2 Design Tokens Canônicos & Variáveis CSS (`:root`)

Padronizados em conformidade com o Bootstrap 5.3+, a paleta corporativa `#90271` e tipografia `Google Sans Flex`:

```css
:root {
  /* Paleta Corporativa Primária (#90271 / Variações HSL Calibradas) */
  --bs-brand-100: #869dcc;
  --bs-brand-300: #5772ac;
  --bs-brand-500: #3b5998;
  --bs-brand-700: #224389;
  --bs-brand-900: #14306b;

  /* Cores Semânticas de Sistema */
  --color-success: #198754;
  --color-warning: #ffc107;
  --color-danger:  #dc3545;
  --color-info:    #0dcaf0;

  /* Tipografia Canônica */
  --bs-font-heading: 'Google Sans Flex', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --bs-font-sans-serif: 'Google Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --bs-font-monospace: 'Google Sans Code', SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Escala de Espaçamento Base 4px / 8px */
  --space-2xs: 0.125rem; /* 2px */
  --space-xs:  0.25rem;  /* 4px */
  --space-sm:  0.5rem;   /* 8px */
  --space-md:  1rem;     /* 16px */
  --space-lg:  1.5rem;   /* 24px */
  --space-xl:  2rem;     /* 32px */
  --space-2xl: 3rem;     /* 48px */

  /* Raios de Borda (Border Radius) */
  --radius-sm: 0.25rem;  /* 4px */
  --radius-md: 0.5rem;   /* 8px */
  --radius-lg: 0.75rem;  /* 12px */
  --radius-xl: 1rem;     /* 16px */
  --radius-pill: 50rem;

  /* Sombras Multicamadas Orgânicas (Soft Elevation) */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
  --shadow-glow: 0 0 20px rgba(59, 89, 152, 0.25);

  /* Curvas Canônicas de Transição (Easing Curves) */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-expo:  cubic-bezier(0.7, 0, 0.84, 0);
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;
}
```

---

### 2.3 Flexbox vs CSS Grid & Container Queries

- **Flexbox (`display: flex`):** Distribuição de componentes em **1 Dimensão** (linha ou coluna). Ideal para barras de navegação, alinhamento de ícones com texto, chips e grupos de botões.
- **CSS Grid (`display: grid`):** Estruturação em **2 Dimensões** (linhas E colunas simultâneas). Ideal para galerias de dashboards responsivas sem media queries:

```css
/* Dashboard Grid Auto-responsivo com minmax */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

/* Container Queries (@container) */
.card-wrapper {
  container-type: inline-size;
  container-name: cardContext;
}

@container cardContext (min-width: 480px) {
  .metric-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
```

---

## ✨ PARTE 3: EFEITOS VISUAIS SOFISTICADOS, TRANSIÇÕES, HOVER, FOCUS E MICROINTERAÇÕES

> 🚨 **DIRETRIZ MANDATÓRIA PARA TEMPLATES:**  
> Nenhum botão, link, card ou input deve parecer estático ou "morto". Toda interface produzida no ecossistema deve possuir **transições táteis, feedback de foco acessível e estados de hover elegantes**, utilizando aceleração via GPU.

### 3.1 Padrão de Focus Acessível & Feedback Tátil
```css
/* 1. Anel de Foco Acessível Universal (:focus-visible) */
:focus-visible {
  outline: 2px solid var(--bs-brand-500) !important;
  outline-offset: 3px !important;
  border-radius: var(--radius-sm);
  transition: outline-offset var(--duration-fast) var(--ease-out-expo);
}

/* 2. Feedback Tátil no Clique (:active) */
.btn-interactive,
button,
[role="button"] {
  transition: transform var(--duration-fast) var(--ease-out-expo), 
              box-shadow var(--duration-fast) var(--ease-out-expo), 
              background-color var(--duration-fast) var(--ease-out-expo);
  will-change: transform;
}

.btn-interactive:active,
button:active {
  transform: scale(0.97);
}
```

---

### 3.2 Os Melhores Efeitos de Hover para Componentes (Prismic & CodePen Inspirações)

#### 🌟 Efeito A: Underline Sweep / Expander em Links de Navegação
*(Inspirado nas coleções de hover do CodePen e Prismic Guide)*
```css
.nav-link-sweep {
  position: relative;
  text-decoration: none;
  color: var(--bs-brand-900);
  font-weight: 500;
  padding-bottom: 4px;
}

.nav-link-sweep::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--bs-brand-500), var(--bs-brand-300));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform var(--duration-normal) var(--ease-out-expo);
}

.nav-link-sweep:hover::after,
.nav-link-sweep:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

---

#### 🌟 Efeito B: Botão com Brilho Deslizante e Preenchimento Fluido (Glow / Shimmer)
*(Inspirado nos pens de Morgan Carbon Fourteen `mOxYjY` e Nathan Long `MwOpxj`)*
```css
.btn-glow {
  position: relative;
  overflow: hidden;
  background: var(--bs-brand-500);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(59, 89, 152, 0.2);
  transition: all var(--duration-normal) var(--ease-out-expo);
}

/* Efeito de Reflexo de Luz Shimmer em Hover */
.btn-glow::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.35), 
    transparent);
  transform: skewX(-20deg);
  transition: none;
}

.btn-glow:hover {
  background: var(--bs-brand-700);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 89, 152, 0.35);
}

.btn-glow:hover::before {
  left: 200%;
  transition: left 0.75s ease-in-out;
}
```

---

#### 🌟 Efeito C: Card 3D Tilt com Elevação Orgânica
```css
.card-tilt-hover {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-normal) var(--ease-out-expo), 
              box-shadow var(--duration-normal) var(--ease-out-expo), 
              border-color var(--duration-normal) var(--ease-out-expo);
  transform-style: preserve-3d;
  will-change: transform, box-shadow;
}

.card-tilt-hover:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: var(--shadow-lg), 0 0 15px rgba(59, 89, 152, 0.12);
  border-color: var(--bs-brand-300);
}
```

---

#### 🌟 Efeito D: Zoom Suave com Mascaramento em Imagens (Image Zoom Reveal)
```css
.img-zoom-container {
  overflow: hidden;
  border-radius: var(--radius-md);
  position: relative;
}

.img-zoom-container img {
  width: 100%;
  height: auto;
  transition: transform 0.5s var(--ease-out-expo), filter 0.5s var(--ease-out-expo);
  will-change: transform;
}

.img-zoom-container:hover img {
  transform: scale(1.07);
  filter: brightness(1.03) contrast(1.02);
}
```

---

### 3.3 Bibliotecas de Animação Recomendadas & Como Utilizar

| Biblioteca / Recurso | URL | Foco & Quando Utilizar |
| :--- | :--- | :--- |
| **PureCSS-Animations** | [github.com/sera619/PureCSS-Animations](https://github.com/sera619/PureCSS-Animations) | Animações 100% puras em CSS (keyframes leves) sem dependência de JavaScript. Ideal para entradas de página, badges, tooltips e spinners. |
| **Anime.js** | [animejs.com](https://animejs.com/) | Suíte JavaScript avançada de animação com suporte a timelines encadeadas, grids escalonados (*staggering*), morphing de vetores SVG e física numérica fluida. |
| **Motion (Framer Motion / Motion.dev)** | [motion.dev](https://motion.dev/examples?platform=js) | Biblioteca de alta performance para gestos, transições de layout compartilhadas (`layoutId`), scroll animations e física de molas (*spring physics*). |
| **CodePen Hover Collections** | [codepen.io/tag/hover-animation](https://codepen.io/tag/hover-animation) | Catálogo vivo de experimentos criativos de hover (atenção à paginação para explorar dezenas de variações de botões, menus e cards). |
| **Prismic CSS Hover Guide** | [prismic.io/blog/css-hover-effects](https://prismic.io/blog/css-hover-effects) | Guia prático de experiência do usuário focado em microinterações intencionais que guiam a atenção do visitante sem poluição visual. |

---

### 3.4 Respeito Mandatório a `prefers-reduced-motion`

Usuários com sensibilidade vestibular, autismo sensorial ou labirintite navegam com redução de movimento ativada. A regra abaixo é **obrigatória em todos os arquivos CSS**:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 📚 PARTE 4: FONTES DE INSPIRAÇÃO E REPOSITÓRIOS CANÔNICOS DE CONSULTA FRONTEND

O desenvolvedor e o agente de IA devem recorrer a esses repositórios oficiais e curadorias brasileiras consagradas antes de projetar novos layouts ou solucionar desafios de interface:

### 4.1 [Recursos Frontend — Yuri Mutti](https://github.com/yurimutti/recursos-frontend)
- **O que é:** O maior e mais qualificado acervo brasileiro de recursos para desenvolvedores e designers front-end.
- **O que consultar:**
  - **Ícones e Ilustrações:** Curadoria de SVGs abertos, Heroicons, Lucide e Phosphor.
  - **Geradores de CSS & Gradientes:** Ferramentas para geração de sombras realistas (*smooth shadow generators*), gradientes de malha (*mesh gradients*) e curvas de bezier.
  - **Fontes e Tipografia:** Guia de legibilidade e combinação de famílias tipográficas.
  - **Ferramentas de Acessibilidade:** Checadores de contraste, validadores WCAG e simuladores de daltonismo.

---

### 4.2 [Guia do Frontend Brasil](https://github.com/Guia-Dev-Brasil/guiadofrontend)
- **O que é:** Roadmap técnico consolidado e guia definitivo da comunidade brasileira de desenvolvimento Web Front-end.
- **O que consultar:**
  - **Arquitetura Web Moderna:** Padrões de Clean Code para CSS/JS, modularização e desempenho web (Core Web Vitals).
  - **Compatibilidade Cross-Browser:** Diretrizes para suporte estável entre Chromium, WebKit (Safari) e Gecko (Firefox).
  - **Comunidades e Boas Práticas:** Referências éticas, documentações traduzidas e padrões industriais adotados pelas principais tech companies do país.

---

## 📋 PARTE 5: CHECKLIST DE VALIDAÇÃO DE QUALIDADE (HTML5 & CSS3)

Antes de entregar qualquer arquivo ou template HTML5/CSS3, valide este checklist:

- [ ] **1. Semântica Estrita:** O código usa `<!DOCTYPE html>`, `<html lang="pt-BR">`, `<header>`, `<nav>`, apenas 1 `<main>` e `<footer>`?
- [ ] **2. Acessibilidade de Formulários:** Todos os `<input>` possuem `<label for="...">` correspondente e atributos de validação visíveis?
- [ ] **3. Efeitos de Transição e Hover:** Os botões possuem feedback visual em hover e feedback de escala no clique (`:active { transform: scale(0.97); }`)?
- [ ] **4. Foco Visível:** O `:focus-visible` está nítido com outline de pelo menos 2px e deslocamento de 3px?
- [ ] **5. Aceleração por GPU:** As animações e transições movimentam apenas `transform` e `opacity`, sem acionar recálculo de layout (*reflow*)?
- [ ] **6. Prefers-Reduced-Motion:** O bloco `@media (prefers-reduced-motion: reduce)` está presente e desativa movimentos rápidos para quem precisa?
- [ ] **7. Tema Claro Padrão:** O atributo `data-bs-theme="light"` está presente no elemento raiz `<html>`?
- [ ] **8. Contraste WCAG 2.2 AA:** Os textos em relação ao fundo atendem ao contraste mínimo de 4.5:1?
