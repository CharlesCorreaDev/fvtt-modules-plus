# Padrões Arquiteturais de UX & UI com Bootstrap / UX Architecture Patterns 🏛️📐

Padrões de implementação e composição de interfaces para sistemas administrativos, portais institucionais e dashboards corporativos.

---

## 1. Padrão de Dashboard Corporativo (Sidebar + Topbar + Grid)

### Estrutura Semântica:
```
[HTML]
  └── [BODY (d-flex)]
        ├── [ASIDE (.sidebar .bg-body-tertiary .p-3)]  --> Navegação Lateral
        └── [MAIN (.content-area)]
              ├── [HEADER (.navbar .sticky-top)]      --> Busca Global & Perfil
              └── [DIV (.p-4)]
                    ├── [CABEÇALHO DA PÁGINA]         --> Título + Ação Primária
                    ├── [ROW DE MÉTRICAS (.g-4)]      --> 4 Cards de Resumo
                    └── [TABELA RESPONSIVA (.card)]   --> Dados Detalhados
```

---

## 2. Padrão de Integração Multi-Linguagem / Multi-Framework

### A. PHP / Blade / Twig
Em templates PHP modernos, isole o layout principal e injete seções com componentes reutilizáveis:
```php
<!-- component-stat-card.blade.php -->
<div class="col-12 col-md-6 col-xl-3">
  <div class="card border-0 shadow-sm rounded-3 h-100">
    <div class="card-body p-3 d-flex justify-content-between align-items-center">
      <div>
        <span class="text-secondary small fw-medium text-uppercase">{{ $label }}</span>
        <h2 class="h4 fw-bold mt-1 mb-0">{{ $value }}</h2>
        <small class="text-{{ $changeColor }} fw-medium">{{ $changeText }}</small>
      </div>
      <div class="bg-{{ $badgeColor }}-subtle text-{{ $badgeColor }} p-3 rounded-3">
        <i class="bi bi-{{ $icon }} fs-4"></i>
      </div>
    </div>
  </div>
</div>
```

### B. React / Next.js / JSX
Em ecossistemas React, utilize componentes declarativos com propriedades tipadas e classes utilitárias do Bootstrap:
```tsx
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  icon: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon }) => (
  <div className="card border-0 shadow-sm rounded-3 h-100">
    <div className="card-body p-3 d-flex justify-content-between align-items-center">
      <div>
        <span className="text-secondary small fw-medium text-uppercase">{label}</span>
        <div className="h4 fw-bold mt-1 mb-0">{value}</div>
        <small className="text-success fw-medium">{trend}</small>
      </div>
      <div className="bg-primary-subtle text-primary p-3 rounded-3">
        <i className={`bi bi-${icon} fs-4`} aria-hidden="true" />
      </div>
    </div>
  </div>
);
```

### C. Python / Django / Jinja2 / FastAPI
```html
<!-- dashboard_metric.html -->
<div class="card border-0 shadow-sm rounded-3">
  <div class="card-body p-3">
    <span class="text-secondary small">{{ metric.label }}</span>
    <h3 class="fw-bold">{{ metric.formatted_value }}</h3>
  </div>
</div>
```

---

## 3. Padrão de Formulários de Alta Conversão (Lei de Hick & Prevenção de Erros)
1. **Agrupamento Lógico de Campos:** Divida dados cadastrais, informações de cobrança e credenciais em seções numeradas ou abas.
2. **Autofoco & Tabulação Natural:** Garanta que a navegação com `Tab` siga rigorosamente a leitura ocidental (esquerda para a direita, cima para baixo).
3. **Validação em Tempo Real (Inline Feedback):** Utilize eventos de perda de foco (`blur`) para exibir feedback de sucesso (`.is-valid`) ou instruções claras de correção (`.is-invalid` + `.invalid-feedback`).

