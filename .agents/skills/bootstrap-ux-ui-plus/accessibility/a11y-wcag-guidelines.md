# Acessibilidade (a11y) & WCAG 2.2 AA no Bootstrap ♿

Orientações práticas de acessibilidade baseadas no [AccessLint](https://github.com/accesslint/claude-marketplace) e nas diretrizes WCAG 2.2 para interfaces Bootstrap:

---

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

