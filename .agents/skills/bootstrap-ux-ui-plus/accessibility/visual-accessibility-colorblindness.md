# Visual Accessibility & Colorblindness Guide for Bootstrap
# Manual de Acessibilidade Visual e Daltonismo no Bootstrap 🎨👁️
> *Bootstrap UX/UI Plus by GM Charles Corrêa*  
> **Normas Técnicas:** WCAG 2.2 AA, LBI (Lei 13.146/2015 Art. 63), Decreto 5.296/2004, eMAG e ABNT NBR 17225.

---

## 🇺🇸 English

### 1. Visual Deficiencies Spectrum & Colorblindness (Dyschromatopsia)
Visual accessibility is not binary; it spans total blindness to subtle contrast and color perception impairments:
1. **Protanopia / Protanomaly (Red-Deficiency):** Absence or deficiency of L-cones. Reds appear dark, brownish, or gray. Pinks may appear light blue.
2. **Deuteranopia / Deuteranomaly (Green-Deficiency):** Most common (affecting ~6-8% of males). Reds, greens, browns, and oranges become muddy mustard tones.
3. **Tritanopia / Tritanomaly (Blue-Deficiency):** Absence of S-cones. Confuses blue with green, and yellow with violet/pink.
4. **Monochromacy / Achromatopsia:** Complete color blindness. Perception relies 100% on **luminance** (brightness/darkness).
5. **Low Vision, Cataracts & Glaucoma:** Blurry vision, loss of peripheral field, or photophobia requiring robust contrast ratios (minimum 4.5:1 for body text, 3:1 for large text/UI components).

### 2. The Golden Rule: Color Must Never Be the Sole Communicator
- **Forms & Inputs:** Never use just a red or green border for errors/success. Always provide an explicit icon (`bi-exclamation-triangle`, `bi-check-circle`) and readable helper text.
- **Charts & Data Viz:** Avoid pie charts with adjacent similar hues. Use bar charts with direct numerical labels and distinguishable line patterns (solid, dashed, dotted).
- **Links & CTAs:** Maintain underlines on text links (`text-decoration: underline`). On hover/focus, change both color and weight or background.
- **Monochrome / Grayscale Test:** If the entire interface is converted to black & white (`filter: grayscale(100%)`), every button, alert, status, and chart must remain 100% distinguishable.

### 3. Palette Standards: Safe vs Dangerous Color Pairs
- 🚫 **Forbidden critical pairs:** Green vs Red, Green vs Brown, Blue vs Purple, Light Yellow vs Light Green.
- ✅ **Safe high-contrast pairs:** Dark Blue & Orange, Dark Blue & Yellow, Dark Navy & Off-White, Monochrome with a single high-luminance accent.

---

## 🇧🇷 Português (Brasil)

### 1. Entendendo os Tipos de Deficiência Visual e Daltonismo
A deficiência visual abrange desde a baixa visão até o daltonismo genético (ligado ao cromossomo X):
- **Protanopia / Protanomalia (Deficiência no Vermelho):** Ausência ou anomalia nos cones L. Vermelhos parecem escuros, marrons ou pretos. Rosa vira azul claro ou cinza.
- **Deuteranopia / Deuteranomalia (Deficiência no Verde):** O tipo mais comum (~6% a 8% dos homens). Vermelho, verde, marrom e laranja tornam-se tons indistinguíveis de bege ou mostarda.
- **Tritanopia / Tritanomalia (Deficiência no Azul):** Raro. Confunde azul com verde e amarelo com violeta.
- **Monocromatia / Acromatopsia:** Visão estritamente em preto, branco e cinza. A percepção depende exclusivamente da **luminância**.
- **Baixa Visão, Catarata e Glaucoma:** Redução de acuidade e contraste. Exige proporção mínima de contraste de 4.5:1 em textos normais e 3:1 em componentes interativos.

### 2. A Regra de Ouro: A Cor Nunca Deve Ser o Único Comunicador
1. **Formulários:** Jamais sinalize erro apenas com borda vermelha (`border-danger`). Adicione sempre um ícone (`bi-exclamation-circle-fill`) e texto explicativo (`.invalid-feedback`).
2. **Gráficos:** Não diferencie séries temporais apenas por cores verde/vermelho. Use estilos de linha (contínua, pontilhada, tracejada) e rótulos de dados anexados aos pontos.
3. **Hiperlinks:** Mantenha links com sublinhado ou contraste duplo em relação ao corpo de texto.
4. **O Teste do Preto e Branco:** Se a interface for renderizada em escala de cinza, todas as ações, estados e hierarquias devem continuar plenamente compreensíveis.

---

## 🎨 Paleta Padrão da Skill (Default Palette) & Tipografia Oficial

Quando o usuário **não informar** uma paleta de cores ou tipografia específica, a skill aplica estritamente a paleta corporativa azul calibrada para alto contraste e as fontes Google Sans:

### 1. Paleta Padrão Calibrada (Color-Hex #90271)
```css
:root {
  /* Escala de Azuis Oficiais (Hex & RGB) */
  --ux-color-50:  #869dcc; /* RGB(134, 157, 204) - Destaques suaves, badges e bordas sutis */
  --ux-color-100: #5772ac; /* RGB(87, 114, 172)  - Focos secundários e ícones de apoio */
  --ux-color-200: #3b5998; /* RGB(59, 89, 152)   - Azul primário equilibrado / Links */
  --ux-color-300: #224389; /* RGB(34, 67, 137)   - Botões primários, CTAs e headers */
  --ux-color-400: #14306b; /* RGB(20, 48, 107)   - Texto de alto contraste e brand core */

  /* Mapeamento Semântico Bootstrap */
  --bs-primary: #224389;
  --bs-primary-rgb: 34, 67, 137;
  --bs-link-color: #224389;
  --bs-link-hover-color: #14306b;
  
  /* Contraste Acessível para Daltônicos (Substitutos de Sucesso / Alerta) */
  --ux-safe-orange: #d96b27; /* Em vez de verde puro para sucesso/destaque comparativo */
  --ux-safe-yellow: #f5a623; /* Alta luminância */
}
```

### 2. Tipografia Oficial Obrigatória
```html
<!-- Importação das Fontes Google no <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:wght@400;600&family=Google+Sans+Flex:opsz,wght@9..144,400;500;600;700;800&family=Google+Sans:wght@400;500;700&display=swap" rel="stylesheet">
```

```css
/* Regras Tipográficas da Skill */
:root {
  --ux-font-headings: 'Google Sans Flex', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --ux-font-body: 'Google Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --ux-font-mono: 'Google Sans Code', SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

body {
  font-family: var(--ux-font-body);
  color: #1a1e28;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6, .navbar-brand, .h1, .h2, .h3, .h4, .h5, .h6 {
  font-family: var(--ux-font-headings);
  font-weight: 700;
  letter-spacing: -0.02em;
}

code, kbd, pre, samp, .font-monospace {
  font-family: var(--ux-font-mono);
}
```

---

## ☀️ Diretriz Mandatória de Temas: LIGHT THEME DEFAULT

> [!IMPORTANT]
> **O tema padrão de toda interface gerada pela skill (seja Mazer, AdminKit ou customizada) DEVE SER SEMPRE O TEMA CLARO (`theme light` / `data-bs-theme="light"`).**  
> O tema escuro / noturno (`theme night` / `data-bs-theme="dark"`) **SÓ PODE SER UTILIZADO OU ATIVADO SE O USUÁRIO PEDIR EXPLICITAMENTE.**

### Implementação HTML/Bootstrap:
```html
<!DOCTYPE html>
<html lang="pt-BR" data-bs-theme="light">
<head>
  <meta charset="UTF-8">
  <title>Admin Dashboard - Light Mode Padrão</title>
</head>
<body class="bg-light text-dark">
  <!-- Layout Claro Padrão -->
</body>
</html>
```

---

## ♿ Classes Auxiliares de Daltonismo & Alto Contraste para Bootstrap

```css
/* Borda de foco de alto contraste para teclado (WCAG 2.2 AA) */
.focus-ring-accessible:focus-visible {
  outline: 3px solid #f5a623 !important;
  outline-offset: 3px !important;
  box-shadow: 0 0 0 2px #14306b !important;
}

/* Modo Daltonismo Opcional (ativável por botão de acessibilidade) */
.a11y-colorblind-mode {
  filter: contrast(1.15) saturate(1.25);
}

/* Modo Alto Contraste Monocromático */
.a11y-high-contrast {
  filter: grayscale(100%) contrast(1.6);
}

/* Rótulos Visuais para Leitores de Tela e Usuários de Teclado */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 🛠️ Ferramentas Recomendadas para Testes de Acessibilidade Visual
1. **Figma / Design:** Stark, Color Blind plugin.
2. **Chrome DevTools (Nativo):** `F12` > `More Tools` > `Rendering` > `Emulate vision deficiencies` (Protanopia, Deuteranopia, Tritanopia, Achromatopsia).
3. **Web Simulators:** [Coblis Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/) e [WhoCanUse](https://www.whocanuse.com/).
4. **Desktop:** Color Oracle (Windows / Mac / Linux).

