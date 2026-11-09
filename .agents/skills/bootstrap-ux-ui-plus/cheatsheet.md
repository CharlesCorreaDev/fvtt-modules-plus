# Cheatsheet - Bootstrap UX/UI Plus 🎨⚡

## Classes Prefixadas Seguras (.fvtt-bs)

| Elemento | Uso no Foundry VTT | Classe Segura |
| :--- | :--- | :--- |
| **Container Janela** | Janela de Configuração / Sheet | `.fvtt-bs.window-content` |
| **Grid** | Layout em colunas dentro de Sheets | `.fvtt-bs .row`, `.fvtt-bs .col-md-6` |
| **Botões** | Ações de salvar, rolar dados, resetar | `.fvtt-bs .btn.btn-primary`, `.fvtt-bs .btn-danger` |
| **Formulários** | Configurações, inputs, switches | `.fvtt-bs .form-check-input`, `.fvtt-bs .form-control` |
| **Alertas & Avisos** | Mensagens de validação e status | `.fvtt-bs .alert.alert-info`, `.fvtt-bs .alert-warning` |
| **Badges** | Tags de itens, status de buffs | `.fvtt-bs .badge.bg-success`, `.fvtt-bs .badge.bg-secondary` |

---

## Estrutura Básica em Handlebars (HBS)
```html
<div class="fvtt-bs p-3">
  <div class="card bg-dark text-light border-secondary">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="m-0"><i class="fa-solid fa-dice-d20 me-2"></i>{{title}}</h5>
      <span class="badge bg-primary">v{{version}}</span>
    </div>
    <div class="card-body">
      <p class="card-text">{{description}}</p>
      <button type="button" class="btn btn-outline-info w-100" data-action="roll">
        <i class="fa-solid fa-play me-1"></i> Rolar Teste
      </button>
    </div>
  </div>
</div>
```

