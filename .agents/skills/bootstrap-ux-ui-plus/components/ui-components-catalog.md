# Catálogo Canônico de Componentes Bootstrap 5.3+ & 6.0 🎨⚡

> **Princípio Central:** Componentes projetados para eliminar "AI Slop", com conformidade estrita a **WCAG 2.2 AA**, alvos táteis mínimos de **44x44px (Lei de Fitts)**, suporte para **daltonismo** (ícone + texto + cor) e **Tema Claro por Padrão**.

---

## 🔘 1. Botões & Ações Interativas (Lei de Fitts & Von Restorff)

### 🚫 Anti-Pattern Proibido:
Botão apenas com ícone sem `aria-label`, ou botão cinza claro em fundo branco com contraste < 3:1.

### ✅ Padrão Acessível Recomendado:
```html
<!-- Botão Primário de Alta Intenção (Von Restorff Effect) -->
<button type="button" class="btn btn-primary d-inline-flex align-items-center gap-2 px-3 py-2 focus-ring">
  <i class="fa-solid fa-floppy-disk" aria-hidden="true"></i>
  <span>Salvar Alterações</span>
</button>

<!-- Botão de Exclusão Destrutiva com Confirmação e Prevenção de Erros (Nielsen #5) -->
<button type="button" 
        class="btn btn-outline-danger d-inline-flex align-items-center gap-2 px-3 py-2 focus-ring"
        data-bs-toggle="modal" 
        data-bs-target="#confirmDeleteModal"
        aria-label="Excluir item permanentemente">
  <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
  <span>Excluir</span>
</button>

<!-- Botão Ícone Único com Tooltip e Rótulo ARIA Acessível -->
<button type="button" 
        class="btn btn-light border d-inline-flex align-items-center justify-content-center p-2 focus-ring"
        style="min-width: 44px; min-height: 44px;"
        data-bs-toggle="tooltip" 
        data-bs-placement="top" 
        title="Imprimir relatório em PDF"
        aria-label="Imprimir relatório em PDF">
  <i class="fa-solid fa-print" aria-hidden="true"></i>
</button>
```

---

## 🪟 2. Cards & Contêineres Sem AI-Slop (Lei da Região Comum & Miller)

### 🚫 Anti-Pattern Proibido:
`card` dentro de `card` dentro de `card` com múltiplas bordas acumuladas.

### ✅ Padrão Limpo (Single Elevation):
```html
<div class="card border-0 shadow-sm rounded-3 bg-white">
  <div class="card-header bg-transparent border-bottom py-3 d-flex justify-content-between align-items-center">
    <h5 class="card-title m-0 fw-bold d-flex align-items-center gap-2">
      <i class="fa-solid fa-chart-pie text-primary" aria-hidden="true"></i>
      Métricas de Desempenho
    </h5>
    <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
      <i class="fa-solid fa-arrow-trend-up me-1" aria-hidden="true"></i> +14.2%
    </span>
  </div>
  <div class="card-body p-4">
    <p class="text-secondary mb-3">Visão consolidada do tráfego das últimas 24 horas.</p>
    <!-- Conteúdo limpo sem sub-cards infinitos -->
  </div>
</div>
```

---

## 📝 3. Formulários Fluidos & Acessíveis (Lei de Hick & Postel)

```html
<form novalidate class="needs-validation">
  <div class="mb-3">
    <label for="userEmail" class="form-label fw-semibold">
      E-mail Corporativo <span class="text-danger" aria-hidden="true">*</span>
    </label>
    <div class="input-group">
      <span class="input-group-text bg-light text-secondary">
        <i class="fa-solid fa-envelope" aria-hidden="true"></i>
      </span>
      <input type="email" 
             class="form-control focus-ring" 
             id="userEmail" 
             placeholder="nome@empresa.com" 
             required
             aria-describedby="emailHelp">
    </div>
    <div id="emailHelp" class="form-text text-muted">
      Nunca compartilharemos seu e-mail com terceiros.
    </div>
    <div class="invalid-feedback d-flex align-items-center gap-1 mt-1">
      <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
      Por favor, informe um endereço de e-mail válido.
    </div>
  </div>
</form>
```

---

## ⚠️ 4. Alertas & Mensagens Inclusivas para Daltonismo

> **Regra de Ouro:** A cor NUNCA pode ser o único identificador de sucesso, erro ou alerta.

```html
<!-- Sucesso: Verde + Ícone de Check + Texto Explícito -->
<div class="alert alert-success d-flex align-items-center gap-3 border-start border-success border-4 shadow-sm" role="alert">
  <i class="fa-solid fa-circle-check fs-4 text-success" aria-hidden="true"></i>
  <div>
    <strong>Sucesso:</strong> Seus dados foram salvos e sincronizados com segurança.
  </div>
</div>

<!-- Erro Crítico: Vermelho + Ícone de Alerta + Ação de Recuperação (Nielsen #9) -->
<div class="alert alert-danger d-flex align-items-center gap-3 border-start border-danger border-4 shadow-sm" role="alert">
  <i class="fa-solid fa-circle-exclamation fs-4 text-danger" aria-hidden="true"></i>
  <div>
    <strong>Erro de Conexão:</strong> Não foi possível conectar ao banco de dados. 
    <a href="javascript:location.reload();" class="alert-link ms-2 text-decoration-underline">Tentar novamente</a>.
  </div>
</div>
```

---

## ⏳ 5. Feedback Visual & Skeletons (Limiar de Doherty < 400ms)

Para evitar que a tela pareça travada durante requisições assíncronas (AJAX / Fetch):

```html
<!-- Skeleton Loader para Cards de Dados -->
<div class="card border-0 shadow-sm p-4" aria-hidden="true">
  <div class="placeholder-glow">
    <span class="placeholder col-6 bg-secondary-subtle rounded py-2 mb-3"></span>
    <span class="placeholder col-12 bg-light rounded py-1 mb-2"></span>
    <span class="placeholder col-8 bg-light rounded py-1 mb-3"></span>
    <div class="d-flex gap-2">
      <span class="placeholder col-4 bg-primary-subtle rounded py-2"></span>
    </div>
  </div>
</div>
```

