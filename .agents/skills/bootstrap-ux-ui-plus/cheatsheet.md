# Cheatsheet: The 18 UX Laws & Bootstrap 5.3 & 6.0 ⚡📐
# Cheatsheet: As 18 Leis do UX no Bootstrap 5.3 & 6.0 ⚡📐

> *Bootstrap UX/UI Plus by GM Charles Corrêa*

---

## 🇺🇸 English

Quick operational reference correlating the **18 Canonical UX Laws** with Bootstrap classes, components, and utilities:

| # | UX Law | Human Principle | Bootstrap Solution & Classes |
|---|---|---|---|
| **1** | **Hick's Law** | Fewer options = faster decision | Primary action `.btn-primary` vs `.btn-outline-secondary`; `.accordion`, `.nav-pills` |
| **2** | **Fitts's Law** | Critical buttons large and close | Minimum 44px touch targets; `.btn-lg`, `.py-2.px-3`, `.stretched-link`, `.fixed-bottom` |
| **3** | **Jakob's Law** | Behave like other familiar sites | Logo on left (`.navbar-brand`), search on top with `Ctrl+K`, profile on right (`.ms-auto`) |
| **4** | **Law of Proximity** | Eyes group nearby elements | `<label>` adjacent to input (`.form-label.mb-1`); button groups (`.btn-group`, `.gap-2`) |
| **5** | **Law of Similarity** | Same visual style = same function | Semantic color consistency (`.btn-danger` always for destruction; uniform `.nav-link`) |
| **6** | **Law of Common Region** | Enclosed borders form mental groups | Isolated cards (`.card.border-0.shadow-sm.rounded-3`), neutral backgrounds (`.bg-body-tertiary`) |
| **7** | **Uniform Connectedness** | Visual connections reinforce relationships | Stepper trails (`.breadcrumb`), connected wizard steps with lines and numbers |
| **8** | **Miller's Law** | 7±2 items in working memory (Chunking) | Metric cards limited to 3-4 per row (`.row.g-3`); input masks for document/phone/card |
| **9** | **Doherty Threshold** | Respond in <400ms | Instant spinner on click (`.spinner-border-sm`); skeletons with `.placeholder-glow` |
| **10** | **Von Restorff Effect** | Distinct item grabs instant focus | Primary CTA with saturated color (`#224389`), `.badge.bg-danger`, `.border-primary` |
| **11** | **Serial Position Effect** | First and last items remembered most | Most critical item in first navbar slot; Save/Checkout button in last slot |
| **12** | **Peak-End Rule** | Memory judges peak and conclusion | Celebratory confirmation screen with `.alert-success` and icon, smooth finish |
| **13** | **Zeigarnik Effect** | Unfinished tasks demand closure | Progress bars (`.progress-bar`), completion percentage ("Step 2 of 4") |
| **14** | **Law of Prägnanz** | Brain interprets simplest form | Symmetrical grids (`.row.row-cols-1.row-cols-md-3`), clean icons without clutter |
| **15** | **Tesler's Law** | Inherent complexity must be absorbed by code | Automatic zip/address lookup, smart search autocomplete, pre-selected defaults |
| **16** | **Postel's Law** | Liberal in input, conservative in output | Flexible phone/date parsing (`(11) 99999-9999` or `11999999999`), sanitized output |
| **17** | **Parkinson's Law** | Task expands to fill available time | Concise wizard steps, real-time feedback, frictionless 1-click checkouts |
| **18** | **Occam's Razor & Pareto** | Simplest solution is best (80/20) | Hide advanced settings in collapsible accordion (`.collapse`); 80% use defaults |

---

## 🇧🇷 Português (Brasil)

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
| **10** | **Efeito Von Restorff** | Elemento destoante atrai atenção imediata | Botão CTA isolado com cor primária viva (`#224389`), `.badge.bg-danger`, borda ativa |
| **11** | **Efeito da Posição Serial** | Primeiro e último itens são mais lembrados | Ação crucial no primeiro slot do menu; botão Salvar/Comprar no último slot da barra |
| **12** | **Regra do Pico-Fim** | Usuário lembra do ponto alto e do final | Tela de sucesso comemorativa com `.alert-success` e ícone marcante |
| **13** | **Efeito Zeigarnik** | Tarefas inacabadas geram urgência de término | Barra de progresso com `.progress-bar`, status de etapa ("Etapa 2 de 4") |
| **14** | **Lei de Prägnanz** | Cérebro reduz imagens à forma mais simples | Grids simétricos (`.row.row-cols-1.row-cols-md-3`), ícones limpos sem ornamentos |
| **15** | **Lei de Tesler** | Complexidade inevitável deve ser absorvida | Preenchimento automático de CEP, busca com autocomplete, opções padrão prontas |
| **16** | **Lei de Postel** | Seja liberal ao receber, conservador ao enviar | Aceitar telefones com ou sem máscara (`11999999999` ou `(11) 99999-9999`), sanitizar |
| **17** | **Lei de Parkinson** | A tarefa se expande pelo tempo disponível | Formulários divididos em micro-passos, sem menus com dezenas de campos soltos |
| **18** | **Navalha de Occam & Pareto** | A hipótese mais simples é a melhor (80/20) | Ocultar configurações avançadas em `.collapse`; 80% usam os padrões recomendados |
