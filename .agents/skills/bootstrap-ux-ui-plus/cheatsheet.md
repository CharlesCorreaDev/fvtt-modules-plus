# Cheatsheet: As 18 Leis do UX no Bootstrap 5.3 & 6.0 ⚡📐

Tabela rápida de referência operacional correlacionando as **18 Leis Canônicas do UX** com classes, componentes e utilitários do Bootstrap:

| # | Lei de UX | Princípio Humano | Solução & Classes no Bootstrap |
|---|---|---|---|
| **1** | **Lei de Hick** | Menos opções = decisão mais rápida | Ação primária com `.btn-primary` vs `.btn-outline-secondary`; `.accordion`, `.nav-pills` |
| **2** | **Lei de Fitts** | Botão importante grande e perto | Mínimo 44px touch targets; `.btn-lg`, `.py-2`, `.py-3`, `.stretched-link`, `.fixed-bottom` |
| **3** | **Lei de Jakob** | Funcione como os outros sites que já conhecem | Logotipo na esquerda (`.navbar-brand`), busca no topo com `Ctrl+K`, perfil à direita (`.ms-auto`) |
| **4** | **Lei da Proximidade** | Olho agrupa o que está perto | `<label>` colado com `.form-label.mb-1`; grupos de botões com `.btn-group` e `.d-flex.gap-2` |
| **5** | **Lei da Semelhança** | Estilo visual igual = mesma função | Cores semânticas padronizadas (`.btn-danger` sempre para exclusão; `.nav-link` consistente) |
| **6** | **Lei da Região Comum** | Bordas delimitadas formam um grupo mental | Cards isolados (`.card.border-0.shadow-sm.rounded-3`), fundos neutros com `.bg-body-tertiary` |
| **7** | **Conectividade Uniforme** | Conexões visuais reforçam relacionamentos | Trilhas com `.breadcrumb`, wizards de etapas conectadas com linhas e numerações |
| **8** | **Lei de Miller** | 7±2 itens na memória de trabalho (Chunking) | Grids de métricas limitadas a 3-4 cards (`.row.g-3`); máscaras de CPF, telefone e cartão |
| **9** | **Limiar de Doherty** | Responda em menos de 400ms | Spinner instantâneo no clique (`.spinner-border-sm`); Skeletons com `.placeholder-glow` |
| **10** | **Efeito Von Restorff** | O diferente é o mais lembrado | Destaque do plano principal em tabelas (`.border-primary.shadow.scale`); CTA com cor vibrante |
| **11** | **Posição Serial** | Lembra-se do primeiro e do último item | Rota mais importante no início da navbar; botão de conversão na extrema direita |
| **12** | **Regra do Pico-Fim** | Julga pelo momento mais intenso e pelo final | Telas de sucesso memoráveis (`.alert-success` rico); telas de erro com saída amigável |
| **13** | **Efeito Zeigarnik** | Lembra com força de tarefas incompletas | Barras de progresso (`.progress`, `.progress-bar`); badges de pendências (`.badge.bg-warning-subtle`) |
| **14** | **Lei de Prägnanz** | O cérebro prefere simetria e ordem | Grid simétrico de 12 colunas (`.col-12.col-md-6.col-lg-4`); cards alinhados com `.h-100` |
| **15** | **Lei de Tesler** | O sistema deve absorver a complexidade | Preenchimento automático por CEP; dropdowns com busca preditiva (autocomplete) |
| **16** | **Lei de Postel** | Liberal no que aceita, rígido no que produz | Sanitização tolerante de dados digitados; mensagens de correção com `.invalid-feedback` |
| **17** | **Lei de Parkinson** | A tarefa se expande no tempo disponível | Formulários ágeis em página única (Single Page Checkout); badges de contagem regressiva |
| **18** | **Occam & Pareto (80/20)** | Menos pressupostos; foco nos 20% vitais | Eliminação de poluição visual; destaque das 3 a 5 ações que cobrem 80% do uso diário |

---

## 🎨 Cores Sutis com Alto Contraste (WCAG 2.2 AA)
```html
<!-- Badges Sutis -->
<span class="badge bg-primary-subtle text-primary-emphasis border border-primary-subtle rounded-pill px-3 py-2">Primário</span>
<span class="badge bg-success-subtle text-success-emphasis border border-success-subtle rounded-pill px-3 py-2">Concluído</span>
<span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-3 py-2">Pendente</span>
<span class="badge bg-danger-subtle text-danger-emphasis border border-danger-subtle rounded-pill px-3 py-2">Crítico</span>
```
