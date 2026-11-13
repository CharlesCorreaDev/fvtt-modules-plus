# Technical Glossary: The 18 UX Laws & Bootstrap / Glossário Técnico de UX e Bootstrap 📖

> *Bootstrap UX/UI Plus by GM Charles Corrêa*

---

## 🇺🇸 English

Essential dictionary of Cognitive Psychology, Interaction Design, and Bootstrap Engineering:

- **1. Hick's Law (Hick-Hyman):** Logarithmic correlation between the number of choices and reaction/decision time. Applied in Bootstrap via *Progressive Disclosure*, accordions, and primary-secondary button hierarchy.
- **2. Fitts's Law:** Target acquisition time modeled as a function of target distance and size. Implemented using `.btn-lg`, enlarged touch targets ($\ge 44$px), `.stretched-link`, and sticky bottom action bars.
- **3. Jakob's Law:** Users spend most of their time on other sites, expecting your interface to conform to established mental models. Implemented via conventional layout standards: left logo (`.navbar-brand`), central/top search with `Ctrl+K`, right user profile.
- **4. Law of Proximity:** Gestalt principle stating elements positioned close together are perceived as belonging to a shared conceptual group. Applied using tight label-input spacing (`.form-label.mb-1`) and `.gap-2` between related actions.
- **5. Law of Similarity:** Gestalt principle where visual resemblance (color, shape, weight) dictates equivalent functionality. Maintained via strict semantic tokens (`.btn-danger` reserved exclusively for destructive tasks).
- **6. Law of Common Region:** Visual boundaries (borders, contrasting background containers) establish strong perceived groupings. Achieved via isolated `.card` surfaces, `.bg-body-tertiary`, and `.border-subtle`.
- **7. Uniform Connectedness:** Visual connection via lines, arrows, or frames creates a stronger association than proximity or similarity. Used in multi-step `.breadcrumb` and wizard progress trackers.
- **8. Miller's Law:** Working memory capacity is constrained to $7 \pm 2$ chunks of information. Applied by restricting metric dashboards to 3-4 cards per viewport and chunking long forms into step-by-step wizards.
- **9. Doherty Threshold:** Productivity soars when user and computer interact at a pace ($<400$ms) that ensures neither has to wait. Achieved via instant feedback spinners (`.spinner-border-sm`) and skeleton loaders (`.placeholder-glow`).
- **10. Von Restorff Effect (Isolation Effect):** When multiple similar items are present, the one that differs from the rest is most likely to be remembered. Applied to isolated primary CTAs, contrast badges, and highlighted pricing tiers.
- **11. Serial Position Effect:** Users best recall the first (Primacy) and last (Recency) items in a sequence. Applied by placing high-value navigation at the start and primary confirmation buttons at the end of toolbars.
- **12. Peak-End Rule:** Retrospective evaluations reflect the emotional climax ("peak") and final moments ("end") of an experience. Implemented via celebratory completion modals, instant feedback toasts, and clear success states.
- **13. Zeigarnik Effect:** Incomplete or interrupted tasks create cognitive tension, driving motivation toward completion. Utilized via progress meters (`.progress`), checklist trackers, and step counter badges ("Step 2 of 4").
- **14. Law of Prägnanz (Simplicity):** The human visual system interprets complex images in the simplest possible symmetrical form. Achieved with clean, balanced grid layouts (`.row-cols-md-3`) and unadorned typography.
- **15. Tesler's Law (Conservation of Complexity):** Every application possesses an inherent minimum complexity that cannot be removed, only transferred to code or user. Solved by shifting cognitive burden to the system (autocomplete, address auto-fill, smart defaults).
- **16. Postel's Law (Robustness Principle):** Be liberal in what you accept, and conservative in what you send. Applied by tolerating varied input formats (raw digits vs formatted phone/tax numbers) while validating and outputting canonical data.
- **17. Parkinson's Law:** Work expands to fill the time available for its completion. Mitigated through focused single-task wizards and rapid checkout flows that prevent decision drift.
- **18. Occam's Razor & Pareto Principle (80/20):** Select the simplest solution that accounts for all data; 80% of value comes from 20% of features. Implemented by tucking niche settings into collapsible drawers, delivering pristine out-of-the-box defaults.

---

## 🇧🇷 Português (Brasil)

Dicionário essencial de conceitos de Psicologia Cognitiva, Design de Interação e Framework Bootstrap:

- **1. Lei de Hick (Hick-Hyman):** Relação logarítmica entre quantidade de escolhas e tempo de decisão. Aplicada via *Progressive Disclosure* no Bootstrap, accordions e hierarquia de botões primário/secundário.
- **2. Lei de Fitts:** Equação de distância e área de toque. Aplicada com `.btn-lg`, padding expandido ($\ge 44$px), `.stretched-link` e barras fixas no rodapé.
- **3. Lei de Jakob:** Princípio da familiaridade mental baseado na experiência prévia em outros sites. Aplicada com componentes padronizados: logotipo à esquerda (`.navbar-brand`), busca no topo com `Ctrl+K`, perfil à direita.
- **4. Lei da Proximidade:** Lei perceptual da Gestalt onde proximidade espacial induz percepção de grupo único. Aplicada com espaçamento compacto entre rótulo e input (`.form-label.mb-1`) e `.gap-2` em botões associados.
- **5. Lei da Semelhança:** Lei da Gestalt onde itens com mesmo estilo visual indicam função e relevância idêntica. Mantida com semântica cromática estrita (`.btn-danger` sempre para ações destrutivas).
- **6. Lei da Região Comum:** Agrupamento mental delimitado por bordas ou fundos contrastantes (`.card`, `.bg-body-tertiary`, `.border-subtle`).
- **7. Conectividade Uniforme:** Associação mental induzida por linhas, setas ou barras conectando elementos. Utilizada em `.breadcrumb` e barras de etapas de wizards.
- **8. Lei de Miller:** Limite da capacidade de retenção de curto prazo ($7 \pm 2$ blocos de informação). Respeitada ao limitar métricas a 3-4 cards por linha e quebrar formulários longos em etapas curtas.
- **9. Limiar de Doherty:** Resposta da interface em menos de 400ms para manter o fluxo de concentração ativo (Loaders `.spinner-border-sm` e Skeletons `.placeholder-glow`).
- **10. Efeito Von Restorff (Isolamento):** O elemento visual anômalo e contrastante é prioritariamente gravado na memória. Aplicado a botões CTA isolados e badges de atenção.
- **11. Efeito da Posição Serial:** Fenômeno de primazia e recência onde primeiro e último itens são mais retidos. Ação mais crítica no primeiro slot da navegação; botão de confirmação no último.
- **12. Regra do Pico-Fim:** A avaliação da experiência reflete o ponto alto emocional e o desfecho final. Implementada com telas comemorativas de sucesso e feedbacks visuais imediatos.
- **13. Efeito Zeigarnik:** Tarefas inacabadas geram urgência de término. Utilizado com barras de progresso (`.progress-bar`) e indicadores de conclusão de cadastro ("Etapa 2 de 4").
- **14. Lei de Prägnanz (Simetria/Simplicidade):** O cérebro reduz formas complexas à sua geometria mais simples e simétrica. Aplicada em grids uniformes e tipografia sem poluição.
- **15. Lei de Tesler (Conservação da Complexidade):** A complexidade inerente de um sistema deve ser absorvida pela automação do código, e não despejada no usuário (busca automática de CEP, auto-complete).
- **16. Lei de Postel (Princípio da Robustez):** Seja tolerante ao receber dados do usuário e estrito ao formatá-los para o banco (aceitar telefones com ou sem máscara).
- **17. Lei de Parkinson:** A tarefa se expande para ocupar todo o tempo disponível. Combatida com formulários divididos em micro-passos e fluxos de checkout rápidos.
- **18. Navalha de Occam & Princípio de Pareto (80/20):** Entre duas hipóteses válidas, escolha a mais simples; 80% do valor decorre de 20% das funções centrais. Esconda detalhes técnicos em `.collapse`.
