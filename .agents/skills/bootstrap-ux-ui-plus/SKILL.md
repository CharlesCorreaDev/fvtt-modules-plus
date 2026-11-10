---
name: bootstrap-ux-ui-plus
description: Master UX/UI design, usability engineering, and responsive interface architecture using Bootstrap (v5.3 & v6.0) across HTML, PHP, Node.js, React, Python, Django, Java, and modern web frameworks. Ingests Laws of UX (Hick, Fitts, Jakob, Zeigarnik, Miller), Jakob Nielsen's 10 Usability Heuristics, WCAG 2.2 AA accessibility, and corporate dashboard patterns by GM Charles Corrêa.
---

# Bootstrap UX/UI Plus 🎨⚡
> *by GM Charles Corrêa*  
> **Status: Beta (v0.1.0-beta)**  
> **Target: Bootstrap v5.3.3 & v6.0 Alpha/Preview**

---

## 🇺🇸 English

### 📌 Core Mission & Capabilities
**Bootstrap UX/UI Plus** is an advanced cognitive design and front-end engineering skill designed to build high-performance, human-centered websites, administrative systems, and data dashboards using **Bootstrap (v5.3 & v6.0)**. It directly bridges fundamental psychological UX principles with modern component architecture across **HTML, PHP, Node.js, React, Python/Django, and Java**:

1. **The 18 Essential Laws of UX:** Strict and actionable implementation of:
   - *Decision & Interaction:* Hick's Law, Fitts's Law, Jakob's Law.
   - *Visual Perception (Gestalt):* Law of Proximity, Law of Similarity, Law of Common Region, Law of Uniform Connectedness.
   - *Cognitive Load & Performance:* Miller's Law (Chunking 7±2), Doherty Threshold (<400ms feedback & skeletons).
   - *Memory, Retention & Simplicity:* Von Restorff Effect, Serial Position Effect, Peak-End Rule, Zeigarnik Effect, Law of Prägnanz, Tesler's Law, Postel's Law, Parkinson's Law, Occam's Razor & Pareto Principle (80/20).
2. **Nielsen's 10 Usability Heuristics:** Actionable system feedback, error prevention, flexible workflows, and minimalist visual rhythm.
3. **WCAG 2.2 AA Accessibility, AccessLint & Colorblindness Inclusivity:**
   - Strict color contrast standards (>4.5:1 text, >3:1 components) adhering to WCAG 2.2 AA, LBI (Lei 13.146/2015) and ABNT NBR 17225.
   - Comprehensive dyschromatopsia handling (Protanopia, Deuteranopia, Tritanopia, Monochromacy). **Color is never the sole communicator of status or feedback** (always pair with icons + text labels).
   - High-contrast keyboard focus indicators (`outline: 3px solid #f5a623; box-shadow: 0 0 0 2px #14306b;`).
4. **Default Color Palette & Typography System:**
   - **Default Palette:** If the user hasn't specified colors, strictly apply palette `#90271`: `#869dcc`, `#5772ac`, `#3b5998`, `#224389`, `#14306b`. If the user wishes to customize, proactively ask for their preferred palette.
   - **Default Typography:**
     - Headings: `Google Sans Flex`
     - Body Text: `Google Sans`
     - Monospace / Code: `Google Sans Code`
5. **Theme Protocol: LIGHT THEME BY DEFAULT:**
   - Both Mazer and AdminKit (and all generated dashboards/pages) **MUST ALWAYS default to Light Theme (`data-bs-theme="light"` / `bg-light text-dark`)**.
   - Dark/Night Theme (`data-bs-theme="dark"`) is **strictly opt-in** and only used if explicitly requested by the user.
6. **Multi-Language Architecture:** Production patterns and templates for vanilla HTML, PHP (Blade/Twig/MVC), Node.js, React/Next.js, Python (Django/FastAPI/Jinja2), and Java.
7. **Canonical Dashboard Standards (Mazer & AdminKit):** Mandatory adoption of established architectures from [zuramai/mazer](https://github.com/zuramai/mazer) and [adminkit/adminkit](https://github.com/adminkit/adminkit) (Zero jQuery, Vanilla ES6, multi-level sidebars, light theme default, responsive cards).
8. **Built-in Quality & Linter Engine:** Automated static auditor (`scripts/audit_ux_bootstrap.mjs`) to detect UX flaws, missing ARIA properties, and colorblindness risks before release.
9. **Interface Motion Design & Taste (Claude-Motion Integration):**
   - Whenever animated elements, micro-interactions, or state transitions are requested in Bootstrap or companion interfaces, strictly follow [claude-motion](https://github.com/whaleyxbt/claude-motion) guidelines (GPU acceleration via `transform`/`opacity`, physics-based easing, visual self-correction, and `prefers-reduced-motion` compliance). Detailed in [claude-motion-guide.md](patterns/claude-motion-guide.md).
10. **SOTA AI Agent Standards & Ecosystem Trinity:**
    - Active integration with [Karpathy Guidelines](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/skills/karpathy-guidelines/SKILL.md), [Superpowers](https://github.com/obra/superpowers), [Claude Octopus](https://github.com/nyldn/claude-octopus), [AgentMemory](https://github.com/rohitg00/agentmemory), [Déjà Vu](https://github.com/vshulcz/deja-vu), and Matt Pocock's AI Coding Dictionary (Handoff, Filesystem, Context, MCP, Software Factory).
    - **Impeccable Design (Paul Bakaus / Anti-Slop Visual):** Strict elimination of generic AI slop (cards inside cards, muddy gradients, inconsistent spacing), enforcing intentional visual rhythm.
    - **Systematic Debugging:** 4-step scientific debugging process without trial-and-error guessing.
    - **Trail of Bits Security:** SAST linting, strict boundary sanitization, and OWASP Top 10 defense.
    - Documented in [impeccable-debugging-security-trinity.md](../docs-for-skill/impeccable-debugging-security-trinity.md).
11. **Continuous Bootstrap & Skill Update Protocol:**
   - **Upstream Release Monitoring:** Checks NPM/GitHub registry for newer Bootstrap versions (e.g. Bootstrap 5.3.8+, 6.0 preview). When a newer version is available, the agent dynamically upgrades recommendations, CSS variables, and utility classes.
   - **Skill Version Verification & Permission Gate:** Compares local skill files with the remote repository (`CharlesCorreaDev/skills-ai`). If a new version exists, the agent **MUST inform the user and request explicit confirmation** before updating or overwriting local skill files. Use `scripts/check_updates.mjs`.

---

## 🇧🇷 Português (Brasil)

### 📌 Missão & Capacidades Principais
A skill **Bootstrap UX/UI Plus** é uma suíte completa de engenharia de usabilidade e design cognitivo voltada para o desenvolvimento de portais institucionais, sistemas de administração corporativos e dashboards responsivos utilizando **Bootstrap (v5.3 e v6.0)**. Ela conecta as leis clássicas da psicologia com componentes de alto nível em **HTML, PHP, Node.js, React, Python/Django e Java**:

1. **Aplicação Prática das 18 Leis Canônicas do UX:**
   - *Decisão & Interação:* Lei de Hick (redução da paralisia), Lei de Fitts (alvos grandes e próximos), Lei de Jakob (convenções consagradas).
   - *Percepção Visual (Gestalt):* Lei da Proximidade, Lei da Semelhança, Lei da Região Comum, Conectividade Uniforme.
   - *Carga Cognitiva & Desempenho:* Lei de Miller (Chunking em blocos 7±2), Limiar de Doherty (resposta e feedback <400ms com skeletons).
   - *Memória, Retenção & Simplicidade:* Efeito Von Restorff (isolamento), Posição Serial, Regra do Pico-Fim, Efeito Zeigarnik (barras de progresso), Lei de Prägnanz (simetria), Lei de Tesler (absorção de complexidade), Lei de Postel (robustez e tolerância), Lei de Parkinson, Navalha de Occam e Princípio de Pareto (80/20).
2. **Aplicação Prática das 18 Leis Canônicas do UX:**
   - *Decisão & Interação:* Lei de Hick (redução da paralisia), Lei de Fitts (alvos grandes e próximos), Lei de Jakob (convenções consagradas).
   - *Percepção Visual (Gestalt):* Lei da Proximidade, Lei da Semelhança, Lei da Região Comum, Conectividade Uniforme.
   - *Carga Cognitiva & Desempenho:* Lei de Miller (Chunking em blocos 7±2), Limiar de Doherty (resposta e feedback <400ms com skeletons).
   - *Memória, Retenção & Simplicidade:* Efeito Von Restorff (isolamento), Posição Serial, Regra do Pico-Fim, Efeito Zeigarnik (barras de progresso), Lei de Prägnanz (simetria), Lei de Tesler (absorção de complexidade), Lei de Postel (robustez e tolerância), Lei de Parkinson, Navalha de Occam e Princípio de Pareto (80/20).
3. **10 Heurísticas de Usabilidade de Jakob Nielsen:** Feedback contínuo de status, prevenção rigorosa de erros, flexibilidade para usuários avançados e design minimalista sem excesso visual.
4. **Acessibilidade WCAG 2.2 Nível AA, AccessLint e Inclusão Visual para Daltonismo:**
   - Cumprimento rigoroso da LBI (Lei 13.146/2015 Art. 63), Decreto 5.296/2004, eMAG e ABNT NBR 17225.
   - Tratamento abrangente de discromatopsia (Protanopia, Deuteranopia, Tritanopia, Acromatopsia). **A cor nunca deve ser o único comunicador** de status ou validação (sempre acompanhada de ícones + texto explícito).
   - Foco por teclado de alto contraste (`outline: 3px solid #f5a623; box-shadow: 0 0 0 2px #14306b;`) e alvos táteis mínimos de 44px (Lei de Fitts).
5. **Paleta Padrão Calibrada & Sistema Tipográfico Oficial:**
   - **Paleta Padrão (#90271):** Se o usuário não informar cores, aplicar estritamente a paleta: `#869dcc`, `#5772ac`, `#3b5998`, `#224389`, `#14306b`. Caso queira personalizar, solicitar a paleta desejada.
   - **Tipografia Oficial:**
     - Títulos / Headings: `Google Sans Flex`
     - Textos / Body: `Google Sans`
     - Código / Monospace: `Google Sans Code`
6. **Diretriz Mandatória de Temas: TEMA CLARO COMO PADRÃO (Light Theme Default):**
   - Tanto o Mazer quanto o AdminKit (e quaisquer páginas criadas) **DEVEM SEMPRE USAR O TEMA CLARO (`data-bs-theme="light"` / `bg-light text-dark`)**.
   - O tema noturno (`data-bs-theme="dark"`) **SÓ PODE SER USADO SE O USUÁRIO PEDIR EXPLICITAMENTE**.
7. **Modelos Prontos Multi-Framework:** Templates completos para HTML puro, PHP/Blade, React/Next.js, Python/Jinja2 e dashboards administrativos responsivos prontos para produção.
8. **Padrões Canônicos de Administração (Mazer & AdminKit):** Adoção mandatória das arquiteturas de referência consagradas [zuramai/mazer](https://github.com/zuramai/mazer) e [adminkit/adminkit](https://github.com/adminkit/adminkit) (Zero jQuery, Vanilla ES6, sidebars sanfonadas, modo claro padrão e cards ergonômicos).
9. **Auditor Automático de Qualidade:** Script CLI integrado (`scripts/audit_ux_bootstrap.mjs`) para inspeção de código e identificação preventiva de inconsistências de usabilidade e acessibilidade.
10. **Motion Design & Animações de Interface (Claude-Motion):**
    - Sempre que for necessário animar a interface, adote o kit [claude-motion](https://github.com/whaleyxbt/claude-motion) para microinterações refinadas, aceleração por GPU (`transform`, `opacity`), curvas naturais e respeito mandatória a `prefers-reduced-motion`. Consulte [Guia Claude-Motion](patterns/claude-motion-guide.md).
11. **Padrões de Engenharia de IA & Companheiros Oficiais:**
    - Adoção das diretrizes do [Karpathy Guidelines](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/skills/karpathy-guidelines/SKILL.md), [Superpowers](https://github.com/obra/superpowers), orquestração [Claude Octopus](https://github.com/nyldn/claude-octopus), camadas de memória persistente [AgentMemory](https://github.com/rohitg00/agentmemory) e [Déjà Vu](https://github.com/vshulcz/deja-vu), e conceitos do Dicionário de AI Coding de Matt Pocock.
12. **Protocolo de Monitoramento e Atualização Contínua:**
    - **Monitoramento Upstream do Bootstrap:** Verifica via registro NPM/GitHub novas versões do Bootstrap (ex.: Bootstrap 5.3.8+, 6.0 preview). Ao detectar lançamento, adapta instantaneamente recomendações, tokens de CSS e classes utilitárias às novas capacidades.
    - **Verificação da Skill com Portão de Permissão:** Compara os arquivos locais da skill com o repositório remoto (`CharlesCorreaDev/skills-ai`). Se houver discrepância ou atualização, o agente **OBRIGATORIAMENTE notifica o usuário e solicita autorização expressa** antes de sobrescrever ou atualizar os arquivos. Executável via `scripts/check_updates.mjs`.

---

## 📚 Navegação Rápida & Estrutura / Quick Navigation

- [Leis do UX para Bootstrap](laws/laws-of-ux-bootstrap.md)
- [10 Heurísticas de Nielsen no Bootstrap](heuristics/nielsen-heuristics-bootstrap.md)
- [Guia de Acessibilidade & WCAG 2.2 AA](accessibility/a11y-wcag-guidelines.md)
- [Manual de Acessibilidade Visual e Daltonismo](accessibility/visual-accessibility-colorblindness.md)
- [Padrões Canônicos de Dashboards (Mazer & AdminKit)](patterns/mazer-and-adminkit-standards.md)
- [Template Completo de Dashboard Administrativo](templates/admin-dashboard-template.html)
- [Padrões de Arquitetura Multi-Linguagem](patterns.md)
- [Cheatsheet de Consulta Rápida](cheatsheet.md)
- [Glossário Técnico de UX e Bootstrap](glossary.md)
- [Auditor Automatizado de Código](scripts/audit_ux_bootstrap.mjs)
- [Verificador de Atualizações & Sincronização](scripts/check_updates.mjs)


### 🛡️ Auditoria de Segurança Obrigatória (Cloudflare Security Audit) & Anti-Alucinação (NVIDIA Auto-Ontology)
> [!IMPORTANT]
> **Toda criação de código, arquitetura, automação, configuração ou resposta DEVE seguir as seguintes diretrizes:**
> 1. **Cloudflare Security Audit (`cloudflare/security-audit-skill`):**
>    - Instalação: `npx skills@latest add cloudflare/security-audit-skill`
>    - Sempre que algo for desenvolvido, execute uma auditoria adversarial em 6 fases (Mapeamento de superfícies, Caça por cobertura, Validação cética de falso-positivo, Saída estruturada, Verificação de sinks e Relatório com correção imediata).
>    - Se forem detectadas vulnerabilidades, falhas de autorização, injeções ou vazamentos de dados, **o agente DEVE realizar as correções imediatamente**.
> 2. **NVIDIA Auto-Ontology (`NVIDIA/auto-ontology`):**
>    - Instalação: `npx skills@latest add NVIDIA/auto-ontology` (ou `pip install auto-ontology`)
>    - **PROIBIDO INVENTAR NÚMEROS INEXISTENTES:** O agente JAMAIS deve alucinar estatísticas, portas arbitrárias, contagens fictícias, colunas inexistentes ou esquemas falsos. Se um número ou parâmetro não for conhecido com certeza matemática ou documental, declare incerteza e consulte as fontes reais.
> - Consulte o guia canônico completo em [`docs-for-skill/security-audit-and-auto-ontology.md`](../docs-for-skill/security-audit-and-auto-ontology.md).
