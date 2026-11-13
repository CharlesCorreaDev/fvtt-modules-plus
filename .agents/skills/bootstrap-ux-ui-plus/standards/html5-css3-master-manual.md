# Manual Mestre e Preciso de HTML5 & CSS3 Moderno 🌐🎨

> **Objetivo:** Estabelecer o manual técnico canônico e rigoroso de **HTML5 Semântico**, **CSS3 Moderno** (Flexbox, CSS Grid, Custom Properties, Subgrid, Container Queries, Cascade Layers e Animações GPU) para ser utilizado por desenvolvedores e agentes de IA em conjunto com o **Bootstrap 5.3+ e 6.0**.

---

## 🏗️ PARTE 1: HTML5 SEMÂNTICO & ACESSÍVEL

O HTML5 moderno não é apenas visual; ele constrói a árvore de acessibilidade (**AOM - Accessibility Object Model**) consumida por leitores de tela e motores de busca (SEO).

### 1. Estrutura Canônica de um Documento HTML5
```html
<!DOCTYPE html>
<html lang="pt-BR" data-bs-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="description" content="Descrição concisa e objetiva da página para SEO e indexadores.">
  <title>Título Semântico e Descritivo | Nome da Aplicação</title>
  
  <!-- Preconnect para Fontes Externas (Performance) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-light text-dark d-flex flex-column min-vh-100">

  <!-- Link de Acessibilidade Obrigatório: Pular para o Conteúdo Principal -->
  <a href="#main-content" class="visually-hidden-focusable p-3 bg-primary text-white position-absolute top-0 start-0 z-3">
    Pular para o conteúdo principal
  </a>

  <!-- Cabeçalho Institucional / Barra de Navegação -->
  <header role="banner">
    <nav class="navbar navbar-expand-lg bg-white border-bottom shadow-sm" aria-label="Navegação Principal">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="/">Minha Marca</a>
        <!-- Links de Navegação -->
      </div>
    </nav>
  </header>

  <!-- Ponto de Entrada do Conteúdo Principal -->
  <main id="main-content" class="flex-grow-1 py-4" role="main">
    <div class="container">
      <!-- Artigos, seções e conteúdo -->
    </div>
  </main>

  <!-- Rodapé Semântico -->
  <footer class="bg-white border-top py-3 mt-auto" role="contentinfo">
    <div class="container text-center text-muted small">
      &copy; 2026 Minha Aplicação. Todos os direitos reservados.
    </div>
  </footer>

</body>
</html>
```

### 2. Tabela de Tags Semânticas e Quando Usar:
| Tag | Papel Semântico | O que NUNCA fazer |
| :--- | :--- | :--- |
| `<header>` | Cabeçalho introdutório da página ou de um `<article>` | Não confunda com `<head>` |
| `<nav>` | Conjunto de links de navegação primários ou paginação | Não use `<nav>` para listas de links de rodapé secundários |
| `<main>` | Conteúdo único e dominante da página | **Apenas 1 `<main>` por documento** |
| `<article>` | Bloco independente de conteúdo (ex: post, produto, notícia) | Não use se o conteúdo não fizer sentido isolado |
| `<section>` | Agrupamento temático de conteúdo com título próprio (`<h2>`-`<h6>`) | Não use como substituto genérico de `<div>` para estilização |
| `<aside>` | Conteúdo tangencial ou barra lateral (banners, links relacionados) | Não coloque conteúdo crítico dentro de `<aside>` |
| `<figure>` / `<figcaption>` | Ilustrações, diagramas ou códigos com legenda explícita | Não use para simples ícones decorativos |
| `<time>` | Datas e horários legíveis por máquina (`datetime="2026-11-12"`) | Não use texto solto para datas sem o atributo `datetime` |

---

## 🎨 PARTE 2: CSS3 MODERNO, TOKENS & ARQUITETURA

O CSS moderno substituiu a necessidade de hacks, floats e bibliotecas pesadas de animação em JavaScript.

---

### 1. CSS Custom Properties (Variáveis de Tema)
Alinhadas aos padrões de design tokens do Bootstrap 5.3+:

```css
:root {
  /* Paleta Padrão Calibrada (#90271) */
  --bs-brand-100: #869dcc;
  --bs-brand-300: #5772ac;
  --bs-brand-500: #3b5998;
  --bs-brand-700: #224389;
  --bs-brand-900: #14306b;

  /* Tipografia Canônica */
  --bs-font-heading: 'Google Sans Flex', -apple-system, BlinkMacSystemFont, sans-serif;
  --bs-font-sans-serif: 'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --bs-font-monospace: 'Google Sans Code', monospace;

  /* Ritmo e Espaçamento (Escala de 8px) */
  --space-xs: 0.25rem; /* 4px */
  --space-sm: 0.5rem;  /* 8px */
  --space-md: 1rem;    /* 16px */
  --space-lg: 1.5rem;  /* 24px */
  --space-xl: 2rem;    /* 32px */
}
```

---

### 2. Flexbox Moderno vs CSS Grid: Quando Escolher?

- **Use Flexbox (`d-flex`)**: Para distribuição de itens em **uma dimensão** (linha OU coluna). Ideal para barras de navegação, alinhamento vertical de ícones com textos e grupos de botões.
- **Use CSS Grid (`d-grid` ou CSS nativo)**: Para layouts em **duas dimensões** (linhas E colunas simultâneas). Ideal para galerias de cards responsivas e painéis de dashboards.

#### Exemplo de Grid Responsivo Moderno sem Media Queries (`repeat(auto-fit)`):
```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md);
}
```

---

### 3. Container Queries (`@container`)
Diferente das Media Queries (que olham a tela inteira), as Container Queries permitem que um componente adapte seu estilo **com base na largura do seu pai imediato**:

```css
/* 1. Definir o contêiner */
.card-container {
  container-type: inline-size;
  container-name: cardContext;
}

/* 2. O card muda de visual automaticamente se tiver mais de 450px de largura */
@container cardContext (min-width: 450px) {
  .user-card {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
```

---

### 4. Cascade Layers (`@layer`)
Organize a especificidade do CSS para que estilos de utilitários nunca sejam sobrescritos acidentalmente por componentes:

```css
@layer reset, framework, components, utilities;

@layer framework {
  /* Estilos do Bootstrap */
}

@layer components {
  .btn-custom {
    padding: 10px 20px;
    border-radius: 8px;
  }
}

@layer utilities {
  .u-no-select {
    user-select: none;
  }
}
```

---

### 5. Guia Completo e Profundo de CSS Animations (@keyframes) & Transições GPU

Animações modernas de interface (UI Motion) devem ser funcionais, intencionais e fisicamente críveis, guiadas pelos princípios de **Claude-Motion** e pelas diretrizes de usabilidade cognitiva.

#### 🎬 5.1 Anatomia da Propriedade `animation` (Shorthand)
A propriedade `animation` é composta por 8 subpropriedades:

```css
.elemento-animado {
  /* Shorthand canônico: */
  /* animation: name duration timing-function delay iteration-count direction fill-mode play-state; */
  animation: slideFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.1s 1 normal forwards running;
}
```

| Subpropriedade | Valores Comuns | O que faz |
| :--- | :--- | :--- |
| `animation-name` | Nome declarado no `@keyframes` | Identifica qual bloco de keyframes executar |
| `animation-duration` | `0.2s`, `350ms` | Duração total de um ciclo da animação |
| `animation-timing-function` | `linear`, `ease`, `cubic-bezier(...)` | Curva de aceleração/desaceleração da interpolação |
| `animation-delay` | `0s`, `150ms`, `-50ms` | Tempo de espera antes do início (negativo inicia no meio) |
| `animation-iteration-count` | `1`, `3`, `infinite` | Quantidade de repetições |
| `animation-direction` | `normal`, `reverse`, `alternate` | Sentido da execução dos frames |
| `animation-fill-mode` | `none`, `forwards`, `backwards`, `both` | Mantém os estilos finais (`forwards`) ou iniciais (`backwards`) |
| `animation-play-state` | `running`, `paused` | Permite pausar/retomar animações dinamicamente |

---

#### 📐 5.2 Curvas de Timing de Alta Fidelidade (Timing Functions & Easing)
Evite o genérico `linear` ou `ease` em elementos de interface humana:
- **Entrada de Elementos (Deceleration / Ease-Out Natural):**
  ```css
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  ```
- **Saída de Elementos (Acceleration / Ease-In Natural):**
  ```css
  --ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);
  ```
- **Movimento Fluido de Deslocamento (Smooth Spring / Elastic Touch):**
  ```css
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  ```

---

#### 🚀 5.3 Biblioteca Canônica de Keyframes Prontos para Uso

```css
/* 1. Entrada Suave de Modais, Menus e Cards (Slide + Fade) */
@keyframes slideFadeIn {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 2. Pulso Sutil de Notificação ou Alerta (Sem distorcer layout) */
@keyframes attentionPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 89, 152, 0.5);
  }
  70% {
    transform: scale(1.03);
    box-shadow: 0 0 0 10px rgba(59, 89, 152, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 89, 152, 0);
  }
}

/* 3. Spinner Rotacional Infinito para Loading */
@keyframes spinSmooth {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 4. Skeleton Shimmer (Efeito de brilho em placeholders) */
@keyframes shimmerWave {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-shimmer {
  background: linear-gradient(90deg, 
    rgba(230, 235, 245, 0.4) 25%, 
    rgba(255, 255, 255, 0.8) 50%, 
    rgba(230, 235, 245, 0.4) 75%);
  background-size: 200% 100%;
  animation: shimmerWave 1.6s infinite linear;
}
```

---

#### 🛡️ 5.4 Regras de Ouro de Performance e GPU Offloading

1. **A Regra dos Dois Eleitos (`transform` e `opacity`):**
   - ❌ **PROIBIDO:** Animar `width`, `height`, `top`, `left`, `margin`, `padding` ou `border-width`. Isso dispara o cálculo de *Reflow* (recálculo da geometria da página inteira) a cada frame (60fps/120fps), causando travamentos em notebooks e celulares.
   - ✅ **CORRETO:** Animar `transform: translate3d() / scale() / rotate()` e `opacity`. Ambas são compostas diretamente na placa de vídeo (GPU Compositor Thread), garantindo 60/120 FPS cravados.
2. **Uso Consciente de `will-change`:**
   - Adicione `will-change: transform, opacity;` apenas em elementos animados ativamente para sugerir a criação de uma camada na GPU.
   - **Cuidado:** Remova ou não aplique em centenas de elementos simultâneos para evitar esgotar a memória VRAM da GPU.

---

#### ♿ 5.5 Acessibilidade Mandatória: Respeito a `prefers-reduced-motion`

Usuários com distúrbios vestibulares, labirintite ou epilepsia fotossensível navegam com a opção de redução de movimento ligada no sistema operacional. É mandatório honrar essa configuração:

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
```

---

## 📋 Checklist de Validação para IAs e Desenvolvedores

Antes de entregar qualquer código HTML5/CSS3:
1. ✅ **Semântica:** O documento possui `<!DOCTYPE html>`, `<html lang="...">`, `<header>`, `<main>` e `<footer>`?
2. ✅ **Acessibilidade:** Todas as imagens possuem `alt`? Todos os botões apenas com ícone possuem `aria-label`?
3. ✅ **Responsividade:** O viewport está configurado e o layout não quebra em telas móveis (360px a 1920px)?
4. ✅ **Contraste & Cores:** O texto possui contraste superior a 4.5:1 (WCAG AA) e a paleta padrão `#90271` ou definida pelo usuário está ativa?
5. ✅ **Tema Claro Padronizado:** O `data-bs-theme="light"` está ativo por padrão?

