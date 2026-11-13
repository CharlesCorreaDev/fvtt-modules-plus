# Manual de Padrões ARIA, Leitores de Tela (NVDA/JAWS/TalkBack) & WCAG 2.2 🔊⌨️

> **Objetivo:** Fornecer o guia definitivo de engenharia de acessibilidade técnica, abordando papéis ARIA (ARIA Roles, States & Properties), armadilhas de teclado (*Focus Traps*), compatibilidade com os principais leitores de tela do mercado e os novos critérios do **WCAG 2.2** para componentes do **Bootstrap 5.3+ e 6.0**.

---

## 🦻 1. Comportamento com Leitores de Tela (NVDA, JAWS, VoiceOver e TalkBack)

Leitores de tela não interpretam a estilização do CSS; eles leem a árvore de acessibilidade (**AOM - Accessibility Object Model**).

### 1.1 Ícones Decorativos vs. Informativos
* **Ícone Decorativo (Ao lado de texto visível):**
  - **Obrigatório:** Ocultar do leitor de tela para evitar poluição sonora repetitiva:
    ```html
    <button class="btn btn-primary">
      <i class="fa-solid fa-download" aria-hidden="true"></i> Baixar Relatório
    </button>
    ```
* **Ícone Funcional / Sozinho (Sem texto visível):**
  - **Obrigatório:** Fornecer um rótulo textual explícito via `aria-label`:
    ```html
    <button class="btn btn-outline-secondary" aria-label="Imprimir fatura">
      <i class="fa-solid fa-print" aria-hidden="true"></i>
    </button>
    ```

---

## 🏗️ 2. Regiões de Anúncio Dinâmico (`aria-live`) & Feedback Assíncrono

Quando uma página carrega novos dados via AJAX/Fetch sem recarregar a tela inteira, pessoas cegas não sabem que o conteúdo mudou, a menos que uma região `aria-live` seja utilizada:

### 2.1 Anúncio Educado (`aria-live="polite"`)
O leitor de tela aguarda o usuário terminar de ler o que está focado antes de anunciar a mudança:
```html
<div id="resultado-busca" aria-live="polite" aria-atomic="true" class="mt-3">
  <!-- O JS insere dinamicamente: -->
  <p class="text-muted">14 resultados encontrados para "Bootstrap".</p>
</div>
```

### 2.2 Anúncio Urgente (`aria-live="assertive"` ou `role="alert"`)
Interrompe imediatamente qualquer leitura para alertar sobre erros críticos ou expiração de sessão:
```html
<div class="alert alert-danger" role="alert" aria-live="assertive">
  <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
  Sua sessão expirará em 60 segundos. Por favor, salve seu trabalho.
</div>
```

---

## 🪟 3. Modais Acessíveis & Prevenção de Armadilha de Teclado (Focus Trap)

Um dos maiores erros de acessibilidade em modais do Bootstrap é permitir que a tecla `Tab` escape para trás da janela enquanto o modal está aberto:

### Estrutura Completa de Modal Acessível:
```html
<div class="modal fade" 
     id="meuModalAcessivel" 
     tabindex="-1" 
     role="dialog" 
     aria-modal="true" 
     aria-labelledby="tituloModal" 
     aria-describedby="descricaoModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="tituloModal">Confirmar Pagamento</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar janela"></button>
      </div>
      <div class="modal-body" id="descricaoModal">
        Você está prestes a autorizar a transferência de R$ 250,00. Esta ação não poderá ser desfeita.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary">Confirmar e Pagar</button>
      </div>
    </div>
  </div>
</div>
```

* **Regras de Foco no Modal:**
  1. Ao abrir: O foco DEVE ser enviado automaticamente para o título do modal ou para o primeiro botão interativo.
  2. Enquanto aberto: O ciclo do `Tab` deve ficar confinado dentro do modal (`Focus Trap`).
  3. Ao fechar: O foco DEVE retornar exatamente para o botão que disparou a abertura do modal.

---

## 🎯 4. Os Novos Critérios do WCAG 2.2 Relevantes para Bootstrap

O WCAG 2.2 introduziu critérios vitais para interfaces modernas:

### 4.1 Foco Não Coberto (2.4.11 / 2.4.12 - Focus Not Obscured)
- Quando um elemento recebe o foco do teclado via `Tab`, ele **NÃO PODE ficar escondido** atrás de barras de navegação fixas (`.fixed-top` ou `.fixed-bottom`) ou banners de cookies.
- **Solução no Bootstrap com CSS:**
  ```css
  /* Garante espaçamento automático quando o elemento é focado */
  :target, [tabindex="-1"]:focus {
    scroll-margin-top: 80px; /* Compensa a altura da navbar fixa */
  }
  ```

### 4.2 Alvo Mínimo de Toque (2.5.8 - Target Size Minimum)
- Em telas touch e mobile, o tamanho mínimo de qualquer controle clicável deve ser de pelo menos **24x24px** (recomendado **44x44px** pela Lei de Fitts e pela Apple/Google).
- **No Bootstrap:** Use `.btn-lg`, padding vertical `.py-2`, ou garanta área de clique expandida com `.stretched-link`.

### 4.3 Redução de Redigitação (3.3.7 - Redundant Entry)
- Em formulários com múltiplos passos (Wizards ou Checkouts), nunca exija que o usuário digite novamente informações já fornecidas (ex: endereço de cobrança igual ao de entrega). Forneça um checkbox de preenchimento automático.

---

## ♿ 5. Checklist de Testes de Acessibilidade Pré-Entrega

1. **Teste Sem Mouse (100% Teclado):** Desconecte o mouse e navegue por toda a tela usando apenas `Tab`, `Shift+Tab`, `Enter`, `Espaço` e `Esc`. Você conseguiu acessar e fechar todos os menus, modais e botões?
2. **Teste com Leitor de Tela:** Ative o NVDA (Windows: `Ctrl+Alt+N`) ou VoiceOver (Mac: `Cmd+F5`). Todos os botões e estados foram anunciados de forma clara?
3. **Teste de Zoom em 200%:** Dê zoom de 200% na página. Nenhum texto ou botão foi cortado ou sobreposto?
4. **Teste Monocromático:** Converta a tela para preto e branco. Os alertas de erro e sucesso continuam perfeitamente distinguíveis por texto e ícone?

