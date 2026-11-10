# Motion Design & Animation Toolkit: Claude-Motion 🎬✨
# Guia de Animação e Motion Design para Interfaces com Claude-Motion

> *Módulo Integrado para `bootstrap-ux-ui-plus`, `master-of-foundryvtt`, `php-dev-expert` e `python-dev-expert`*  
> **Repositório Oficial:** [github.com/whaleyxbt/claude-motion](https://github.com/whaleyxbt/claude-motion)  
> **Finalidade:** Guiar Agentes de IA na criação de animações fluidas, refinadas, com autocorreção visual e bom gosto estético para interfaces web, dashboards e sistemas interativos.

---

## 🇺🇸 English

### 1. Overview & Core Mission
**Claude-Motion** (`whaleyxbt/claude-motion`) is an open-source motion design toolkit tailored for AI coding agents. It provides principles, APIs, and self-correction loops to turn static UI components into dynamic, emotionally resonant, and accessible micro-interactions:
1. **Self-Correction & Taste Engine:** Agents evaluate rendered animation frames for visual pacing, easing, and layout balance before finalizing code.
2. **Framework Compatibility:** Works seamlessly across Bootstrap, vanilla CSS/JS, React, Remotion, and Canvas/WebGL rendering.
3. **Performance & Ergonomics:** Enforces GPU-accelerated properties (`transform`, `opacity`) avoiding layout thrashing.
4. **Reduced Motion Safety:** Fully respects `prefers-reduced-motion` media queries for accessibility.

### 2. Practical Application Patterns

#### Smooth Micro-interactions & Status Pacing:
```css
/* Transições com curvas de aceleração naturais (Cubic-Bezier / Ease-Out) */
.motion-card {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.motion-card:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 12px 24px -6px rgba(20, 48, 107, 0.12);
}

/* Respeito rigoroso a acessibilidade motora / vestibular */
@media (prefers-reduced-motion: reduce) {
  .motion-card, * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 🇧🇷 Português (Brasil)

### 1. Quando e Como Usar o Claude-Motion
Sempre que o usuário ou o projeto demandar animações de interface (transições de páginas, abertura de gavetas/sidebars, alertas pulsantes, loaders, cartões táteis ou visualizações de dados):
- **Adote as diretrizes do `claude-motion`:** Pacing suave, desaceleração natural (*ease-out*), ausência de movimentos bruscos ou trêmulos e feedback abaixo do limiar de 400ms (Limiar de Doherty).
- **GPU Acceleration:** Sempre anime propriedades compostas pela GPU (`transform: translate3d`, `opacity`, `scale`). Nunca anime `top`, `left`, `width` ou `height` diretamente.
- **Acessibilidade:** Garanta que todas as animações sejam suprimidas ou simplificadas quando `prefers-reduced-motion: reduce` estiver ativo no sistema operacional.

