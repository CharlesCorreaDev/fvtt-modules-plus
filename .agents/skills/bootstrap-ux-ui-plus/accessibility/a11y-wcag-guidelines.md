# Accessibility (a11y) & WCAG 2.2 AA in Bootstrap ♿
# Acessibilidade (a11y) & WCAG 2.2 AA no Bootstrap ♿

> *Bootstrap UX/UI Plus by GM Charles Corrêa*  
> **Standards / Normas:** WCAG 2.2 AA, AccessLint, Brazilian Inclusion Law (LBI Lei 13.146/2015 Art. 63), eMAG, ABNT NBR 17225.

---

## 🇺🇸 English

### 1. Color Contrast (WCAG 1.4.3 - Level AA)
- **Normal Text:** Minimum contrast ratio of **4.5:1** against the background.
- **Large Text (18pt+ or 14pt bold):** Minimum contrast ratio of **3:1**.
- **In Bootstrap 5.3 & 6.0:**
  - Prefer modern subtle contrast variables: `.text-primary-emphasis`, `.bg-primary-subtle`, `.text-danger-emphasis`.
  - Avoid yellow buttons (`.btn-warning`) with white text; always pair with `.text-dark`.

### 2. High-Contrast Focus Ring (WCAG 2.4.7 & 2.4.11)
- Never remove `:focus` outlines (`outline: none` or `outline: 0`) without providing an explicit accessible alternative.
- Bootstrap 5.3+ provides `.focus-ring`. Use the official corporate high-contrast ring:
  ```css
  :focus-visible {
    outline: 3px solid #f5a623 !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 4px #14306b !important;
  }
  ```

### 3. Accessible Forms & Form Controls (WCAG 3.3.2)
- Every `<input>`, `<select>` and `<textarea>` must have an explicit linked `<label>` via `for="id"`.
- Never use `placeholder` as a replacement for `<label>`. Screen readers do not reliably read placeholders.
- Pair validation errors with `aria-describedby="error-id"` and `aria-invalid="true"`.

### 4. Touch Targets & Interaction Areas (WCAG 2.5.8 - Level AA)
- Target size must be at least **44x44 CSS pixels** on mobile touchscreens.
- Use `.btn-lg`, generous vertical padding (`.py-2.px-3`), or `.stretched-link` on card containers.

### 5. Semantic Headings & Structural Landmarks
- Never skip heading levels (`<h1>` followed directly by `<h3>`).
- Use HTML5 landmark elements: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` with explicit `aria-label` when multiple instances exist.

---

## 🇧🇷 Português (Brasil)

## 1. Contraste de Cores (WCAG 1.4.3 - Nível AA)
- **Texto Normal:** Contraste mínimo de **4.5:1** contra o fundo.
- **Texto Grande (18pt+ ou 14pt bold):** Contraste mínimo de **3:1**.
- **No Bootstrap 5.3 & 6.0:**
  - Prefira as novas variáveis sutis com alto contraste: `.text-primary-emphasis`, `.bg-primary-subtle`, `.text-danger-emphasis`.
  - Evite botões amarelos (`.btn-warning`) com texto branco; use sempre `.text-dark` em botões amarelos claros.

---

## 2. Acessibilidade por Teclado e Foco Visível (WCAG 2.4.7)
- **Nunca remova o outline de foco:**
  ```css
  /* PROIBIDO / FORBIDDEN */
  *:focus { outline: none !important; }
  ```
- **Foco Estilizado com Bootstrap:**
  - Utilize os anéis de foco do Bootstrap: `.focus-ring`, `.focus-ring-primary`.
  - Garanta que todos os botões e links possam ser acionados via tecla `Tab` e executados com `Enter` ou `Espaço`.

---

## 3. Atributos ARIA Mandatórios em Componentes Interativos

| Componente | Atributos Obrigatórios | Exemplo |
|---|---|---|
| **Botão de Ícone** | `aria-label` descritivo | `<button class="btn btn-light" aria-label="Fechar janela"><i class="bi bi-x-lg" aria-hidden="true"></i></button>` |
| **Modal** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">` |
| **Dropdown** | `aria-expanded="false"`, `aria-haspopup="true"` | `<button class="dropdown-toggle" aria-expanded="false">` |
| **Alertas Dinâmicos** | `role="alert"` ou `aria-live="polite"` | `<div class="alert alert-success" role="alert">Salvo com sucesso!</div>` |
| **Abas (Tabs)** | `role="tablist"`, `role="tab"`, `role="tabpanel"` | Gerenciado pelo JS do Bootstrap com atributos `id` e `aria-controls` |

---

## 4. Formulários Acessíveis (WCAG 3.3.2)
- Todo `<input>`, `<select>` ou `<textarea>` deve ter um `<label>` correspondente com atributo `for` apontando para o `id` do campo.
- Para textos de ajuda, utilize `aria-describedby="idDoTextoDeAjuda"`.
- Em campos com erro, inclua `aria-invalid="true"` e vincule o erro com `aria-errormessage`.

