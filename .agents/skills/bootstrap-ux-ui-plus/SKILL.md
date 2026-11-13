---
name: bootstrap-ux-ui-plus
description: Master UX/UI design, usability engineering, responsive interface architecture, cognitive ergonomics, and neurodiversity (ADHD & Autism Spectrum) using Bootstrap (v5.3 & v6.0) across HTML, PHP, Node.js, React, Python, Django, Java, and modern web frameworks. Ingests Laws of UX (Hick, Fitts, Jakob, Zeigarnik, Miller), Jakob Nielsen's 10 Usability Heuristics, WCAG 2.2 AA accessibility, Peter Morville's UX Honeycomb, Eva Heller's Color Psychology, and corporate dashboard patterns by GM Charles Corrêa.
---

# Bootstrap UX/UI Plus 🎨⚡
> *by GM Charles Corrêa*  
> **Status: Beta (v0.5.0-beta)**  
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
2. **Nielsen's 10 Usability Heuristics & Advanced Interaction Laws:**
   - Shneiderman's 8 Golden Rules, Don Norman's Design Principles, and Hoober/Wroblewski Thumb Zone for ergonomics.
3. **Peter Morville's UX Honeycomb & Business Optimization:**
   - The 7 facets: Useful, Usable, Desirable, Findable, Accessible, Credible, and Valuable. Conversion Rate Optimization (CRO) with friction-reduction checkout workflows.
4. **Neurodiversity, ADHD & Autism (TEA) Accessibility:**
   - 7-Vector Accessibility Matrix (UFPE 2025: Image, Text, Navigation, Customization, Interaction, Sound, Interface).
   - Sensory ergonomics: Zero autoplay, soft audio frequencies, sensory calming toggles, and predictable, literal microcopy.
   - ADHD cognitive patterns: Atomic progressive disclosure, time-blindness counters, and dopamine-driven checklists.
5. **Color Psychology, Semiotics & Technical Color Models:**
   - Eva Heller, Goethe, Lüscher, 60-30-10 Rule, Culturally-Informed Design, and exact color model conversions (Hex, RGB, HSL, CMYK, XYZ, Yxy, LAB).
6. **WCAG 2.2 AA Accessibility, AccessLint & Colorblindness Inclusivity:**
   - Strict color contrast standards (>4.5:1 text, >3:1 components) adhering to WCAG 2.2 AA, LBI (Lei 13.146/2015) and ABNT NBR 17225.
   - Comprehensive dyschromatopsia handling (Protanopia, Deuteranopia, Tritanopia, Monochromacy). **Color is never the sole communicator of status or feedback** (always pair with icons + text labels).
   - Clinically tested accessible fonts (`Atkinson Hyperlegible`, `Lexend`, `OpenDyslexic`).
   - High-contrast keyboard focus indicators (`outline: 3px solid #f5a623; box-shadow: 0 0 0 2px #14306b;`).
7. **Default Color Palette & Typography System:**
   - **Default Palette:** If the user hasn't specified colors, strictly apply palette `#90271`: `#869dcc`, `#5772ac`, `#3b5998`, `#224389`, `#14306b`. If the user wishes to customize, proactively ask for their preferred palette.
   - **Default Typography:**
     - Headings: `Google Sans Flex`
     - Body Text: `Google Sans`
     - Monospace / Code: `Google Sans Code`
8. **Theme Protocol: LIGHT THEME BY DEFAULT:**
   - Both Mazer and AdminKit (and all generated dashboards/pages) **MUST ALWAYS default to Light Theme (`data-bs-theme="light"` / `bg-light text-dark`)**.
   - Dark/Night Theme (`data-bs-theme="dark"`) is **strictly opt-in** and only used if explicitly requested by the user.
9. **Canonical Dashboard Standards (Mazer & AdminKit):** Mandatory adoption of established architectures from [zuramai/mazer](https://github.com/zuramai/mazer) and [adminkit/adminkit](https://github.com/adminkit/adminkit) (Zero jQuery, Vanilla ES6, multi-level sidebars, light theme default, responsive cards).
10. **Built-in Quality & Linter Engine:** Automated static auditor (`scripts/audit_ux_bootstrap.mjs`) to detect UX flaws, missing ARIA properties, and colorblindness risks before release.
11. **Interface Motion Design & Taste (Claude-Motion Integration):**
    - Strictly follow [claude-motion](https://github.com/whaleyxbt/claude-motion) guidelines (GPU acceleration via `transform`/`opacity`, physics-based easing, and `prefers-reduced-motion` compliance).
12. **Continuous Bootstrap & Skill Update Protocol:**
    - Checks upstream NPM for newer Bootstrap versions and compares local vs remote skill releases with mandatory user confirmation gate.

---

## 🇧🇷 Português (Brasil)

### 📌 Missão & Capacidades Principais
A skill **Bootstrap UX/UI Plus** é uma suíte completa de engenharia de usabilidade e design cognitivo voltada para o desenvolvimento de portais institucionais, sistemas de administração corporativos e dashboards responsivos utilizando **Bootstrap (v5.3 e v6.0)**. Ela conecta as leis clássicas da psicologia com componentes de alto nível em **HTML, PHP, Node.js, React, Python/Django e Java**:

1. **Aplicação Prática das 18 Leis Canônicas do UX:**
   - *Decisão & Interação:* Lei de Hick (redução da paralisia), Lei de Fitts (alvos grandes e próximos), Lei de Jakob (convenções consagradas).
   - *Percepção Visual (Gestalt):* Lei da Proximidade, Lei da Semelhança, Lei da Região Comum, Conectividade Uniforme.
   - *Carga Cognitiva & Desempenho:* Lei de Miller (Chunking em blocos 7±2), Limiar de Doherty (resposta e feedback <400ms com skeletons).
   - *Memória, Retenção & Simplicidade:* Efeito Von Restorff (isolamento), Posição Serial, Regra do Pico-Fim, Efeito Zeigarnik (barras de progresso), Lei de Prägnanz (simetria), Lei de Tesler (absorção de complexidade), Lei de Postel (robustez e tolerância), Lei de Parkinson, Navalha de Occam e Princípio de Pareto (80/20).
2. **10 Heurísticas de Usabilidade de Jakob Nielsen & Princípios Avançados:**
   - 8 Regras de Ouro de Shneiderman, Princípios de Don Norman (Affordance, Signifiers, Constraints) e Thumb Zone de Hoober/Wroblewski.
3. **Colmeia de UX de Peter Morville & Otimização de Negócios:**
   - As 7 facetas do UX (Útil, Usável, Desejável, Encontrável, Acessível, Confiável e Valioso). Metodologia de CRO para redução de atrito e aumento de conversões.
4. **Neurodiversidade, TDAH & Acessibilidade no Espectro Autista (TEA):**
   - Matriz dos 7 Vetores de Acessibilidade TEA (UFPE 2025: Imagem, Texto, Navegação, Customização, Interação, Som, Interface).
   - Conforto sensorial: Zero autoplay, sons suaves opcionais, toggles de conforto e microcópia direta sem ambiguidades.
   - Padrões cognitivos para TDAH: Revelação progressiva atômica, combate a *time blindness* e checklists dopaminérgicos.
5. **Psicologia das Cores & Semiótica Visual Científica:**
   - Estudos de Eva Heller, Goethe, Lüscher, Neuromarketing e CRO (Regra 60-30-10, Design Informado Culturalmente, modelos RGB/CMYK/HSL/XYZ/LAB).
6. **Acessibilidade WCAG 2.2 Nível AA, AccessLint e Inclusão Visual para Daltonismo:**
   - Cumprimento rigoroso da LBI (Lei 13.146/2015 Art. 63), Decreto 5.296/2004, eMAG e ABNT NBR 17225.
   - Tratamento de discromatopsia (Protanopia, Deuteranopia, Tritanopia, Acromatopsia). **A cor nunca deve ser o único comunicador** (sempre ícone + texto).
   - Fontes acessíveis integradas (`Atkinson Hyperlegible`, `Lexend`, `OpenDyslexic`).
   - Foco por teclado de alto contraste (`outline: 3px solid #f5a623; box-shadow: 0 0 0 2px #14306b;`) e alvos táteis mínimos de 44px.
7. **Paleta Padrão Calibrada & Sistema Tipográfico Oficial:**
   - **Paleta Padrão (#90271):** Se o usuário não informar cores, aplicar estritamente a paleta: `#869dcc`, `#5772ac`, `#3b5998`, `#224389`, `#14306b`.
   - **Tipografia Oficial:** `Google Sans Flex` (títulos), `Google Sans` (corpo) e `Google Sans Code` (código).
8. **Diretriz Mandatória de Temas: TEMA CLARO COMO PADRÃO (Light Theme Default):**
   - Tanto o Mazer quanto o AdminKit **DEVEM SEMPRE USAR O TEMA CLARO (`data-bs-theme="light"` / `bg-light text-dark`)**. O modo noturno é estritamente opt-in.
9. **Padrões Canônicos de Administração (Mazer & AdminKit):** Arquiteturas consagradas [zuramai/mazer](https://github.com/zuramai/mazer) e [adminkit/adminkit](https://github.com/adminkit/adminkit) (Zero jQuery, Vanilla ES6, sidebars sanfonadas).
10. **Auditor Automático de Qualidade:** Script CLI (`scripts/audit_ux_bootstrap.mjs`) para inspeção de código e identificação preventiva de inconsistências.
11. **Motion Design & Animações de Interface (Claude-Motion):** Microinterações fluidas com GPU (`transform`, `opacity`) e respeito a `prefers-reduced-motion`.
12. **Protocolo de Atualização Contínua com Portão de Permissão:** Monitora novas versões do Bootstrap e sincroniza com o repositório remoto apenas com consentimento expresso do usuário.

---

## 📚 Navegação Rápida & Estrutura / Quick Navigation

- [Fundamentos Canônicos de UI Design & Princípios Visuais](fundamentals/ui-design-core-principles.md)
- [Human Interface Guidelines (HIG) & Design Systems Comparados](standards/human-interface-guidelines-and-design-systems.md)
- [Repositórios de Inspiração, UI Patterns & Ferramental](references/ui-inspiration-and-pattern-libraries.md)
- [Mapeamento Canônico de Fontes & Referências Ingeridas](references/ux-sources-and-inspirations.md)
- [Fundamentos de UX Design & Negócios (Morville & CRO)](fundamentals/ux-design-fundamentals-and-business.md)
- [Acessibilidade TEA & Ergonomia Sensorial (UFPE 2025)](neurodiversity/autism-and-sensory-design.md)
- [TDAH, Neurodiversidade & Ergonomia Cognitiva](neurodiversity/adhd-cognitive-ergonomics.md)
- [Psicologia das Cores, Modelos Cromáticos & Semiótica](psychology/color-psychology-and-semiotics.md)
- [Leitores de Tela, ARIA Patterns & WCAG 2.2](accessibility/screen-readers-and-aria-patterns.md)
- [Guia de Acessibilidade & WCAG 2.2 AA](accessibility/a11y-wcag-guidelines.md)
- [Acessibilidade Visual, Daltonismo & Tipografia](accessibility/visual-accessibility-colorblindness.md)
- [Guia de Nichos de Mercado & Questionário de Discovery](discovery/niche-and-discovery-interview.md)
- [Compêndio Avançado de Leis do UX (Shneiderman & Norman)](laws/advanced-ux-laws-and-principles.md)
- [As 18 Leis Canônicas do UX para Bootstrap](laws/laws-of-ux-bootstrap.md)
- [10 Heurísticas de Nielsen no Bootstrap](heuristics/nielsen-heuristics-bootstrap.md)
- [Manual Mestre de JavaScript Moderno, jQuery & jQuery UI](standards/javascript-jquery-master-guide.md)
- [Manual Mestre de HTML5 & CSS3 Moderno](standards/html5-css3-master-manual.md)
- [Catálogo Canônico de Componentes Acessíveis](components/ui-components-catalog.md)
- [Padrões Canônicos de Dashboards (Mazer & AdminKit)](patterns/mazer-and-adminkit-standards.md)
- [Template Completo de Dashboard Administrativo](templates/admin-dashboard-template.html)
- [Padrões de Arquitetura Multi-Linguagem](patterns.md)
- [Cheatsheet de Consulta Rápida](cheatsheet.md)
- [Glossário Técnico de UX e Bootstrap](glossary.md)
- [Auditor Automatizado de Código](scripts/audit_ux_bootstrap.mjs)
- [Verificador de Atualizações & Sincronização](scripts/check_updates.mjs)

---

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
