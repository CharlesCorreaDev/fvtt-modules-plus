# 10 Heurísticas de Usabilidade de Jakob Nielsen com Bootstrap 🛡️📱
> *Jakob Nielsen's 10 Usability Heuristics mapped to Bootstrap 5.3 & 6.0 components*

---

### 1. Visibilidade do Status do Sistema (Visibility of System Status)
O sistema deve sempre manter os usuários informados sobre o que está acontecendo através de feedback oportuno.
- **Spinners & Loaders:** `.spinner-border`, `.spinner-grow` e botões de carregamento com `disabled`.
- **Skeletons (Placeholders):** `.placeholder-glow`, `.placeholder col-6` para conteúdo em carregamento inicial.
- **Alertas e Notificações:** `.alert .alert-info`, Toasts flutuantes com `.toast-container` e `.toast`.

```html
<button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
  <span role="status">Processando pagamento...</span>
</button>
```

---

### 2. Correspondência entre o Sistema e o Mundo Real (Match Between System & Real World)
Fale a língua do usuário, com palavras e conceitos familiares ao público-alvo em vez de termos técnicos ou jargões internos.
- Use ícones reconhecíveis da biblioteca Bootstrap Icons (`bi bi-cart` para carrinho, `bi bi-envelope` para e-mail).
- Formatação humana de datas (ex: "Há 10 minutos" em vez de `2026-11-08T21:30:00Z`).

---

### 3. Controle do Usuário e Liberdade (User Control & Freedom)
Usuários frequentemente cometem erros e precisam de uma "saída de emergência" clara sem passar por diálogos extensos.
- **Botões Desfazer (Undo):** Toasts com botão de ação rápida "Desfazer".
- **Modais de Confirmação:** `.modal` para ações destrutivas (ex: exclusão de registros), sempre com cancelamento evidente (`btn-secondary`).
- **Navegação Rastreada:** Breadcrumbs `.breadcrumb` para retornar facilmente a níveis anteriores.

---

### 4. Consistência e Padrões (Consistency & Standards)
Os usuários não devem se perguntar se palavras, situações ou ações diferentes significam a mesma coisa.
- Siga estritamente o sistema de cores do Bootstrap:
  - `primary`: ação principal do produto.
  - `success`: confirmação, sucesso, saldo positivo.
  - `danger`: exclusão, erro crítico, saldo negativo.
  - `warning`: advertência, expiração iminente.
- Mantenha tamanhos de botões e espaçamentos (`.gap-3`, `.mb-4`) coerentes em todas as telas.

---

### 5. Prevenção de Erros (Error Prevention)
Melhor que boas mensagens de erro é um design cuidadoso que evita que os erros aconteçam.
- Desative o botão de submissão enquanto dados obrigatórios não forem preenchidos.
- Confirmação em duas etapas para ações irreversíveis.
- Formatação automática de campos (máscaras de telefone, CPF, moedas).

---

### 6. Reconhecimento em vez de Memorização (Recognition Rather Than Recall)
Minimize a memória de trabalho do usuário tornando objetos, ações e opções visíveis.
- Dropdowns com autocomplete e pesquisa integrada.
- Histórico de itens recentes ou sugestões de preenchimento.
- Dicas flutuantes informativas: Tooltips (`data-bs-toggle="tooltip"`).

---

### 7. Flexibilidade e Eficiência de Uso (Flexibility & Efficiency of Use)
Atalhos desconhecidos para iniciantes podem acelerar a interação para o usuário avançado.
- Atalhos de teclado no dashboard (ex: `/` para focar na busca, `Ctrl+K` para comando rápido).
- Visualizações compactas de tabelas (`.table-sm`) versus visualização em cards.

---

### 8. Estética e Design Minimalista (Aesthetic & Minimalist Design)
Diálogos não devem conter informações irrelevantes ou raramente necessárias.
- Utilize espaços em branco generosos (`.py-5`, `.gap-4`, `.container-fluid px-4`).
- Elimine bordas desnecessárias com `.border-0` e adicione sombras suaves com `.shadow-sm`.

---

### 9. Ajudar os Usuários a Reconhecer, Diagnosticar e Recuperar-se de Erros
Mensagens de erro devem ser expressas em linguagem clara, indicar com precisão o problema e sugerir construtivamente uma solução.
- Validação nativa do Bootstrap: classes `.is-invalid` e elementos `.invalid-feedback`.
- Texto descritivo que ensina a consertar o erro.

```html
<div class="mb-3">
  <label for="userEmail" class="form-label">E-mail Corporativo</label>
  <input type="email" class="form-control is-invalid" id="userEmail" value="nome@invalido" aria-describedby="emailFeedback">
  <div id="emailFeedback" class="invalid-feedback">
    Por favor, insira um e-mail válido com domínio (ex: usuario@empresa.com.br).
  </div>
</div>
```

---

### 10. Ajuda e Documentação (Help & Documentation)
Mesmo que o sistema possa ser usado sem documentação, pode ser necessário fornecer ajuda e documentação fácil de pesquisar e focada na tarefa do usuário.
- Seções de FAQ colapsáveis com `.accordion`.
- Links de ajuda com ícone flutuante ou modais de onboarding.

