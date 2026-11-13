# Bootstrap UX/UI Plus 🎨⚡

> **Cognitive UX Laws, Nielsen Usability Heuristics, WCAG 2.2 AA & Neurodiversity for Bootstrap (v5.3 & v6.0)**  
> *Engenharia Cognitiva de Usabilidade, Leis de UX, Acessibilidade e Neurodiversidade para Bootstrap por GM Charles Corrêa*  
> **Status: Beta (v0.5.0-beta)**

---

## 🇺🇸 English

### 📌 Overview
**Bootstrap UX/UI Plus** bridges the scientific laws of human-computer interaction (HCI), Jakob Nielsen's usability principles, and accessibility standards (WCAG 2.2 AA) directly into **Bootstrap (v5.3 & v6.0)** front-end development. 

Whether building corporate administrative panels, SaaS dashboards, or high-conversion landing pages, this skill provides production-grade components, layouts, and automation tools across **HTML, PHP, Node.js, React, Python/Django, and Java**.

### 🌟 Core Highlights
- **Fundamentos Canônicos de UX Design & Negócios:** Ingests Peter Morville's 7-facet UX Honeycomb (Useful, Usable, Desirable, Findable, Accessible, Credible, Valuable), modern Double Diamond Design Thinking (Figma, EBAC, Alura, Adobe Express, Catarinas, Tuia), and Conversion Rate Optimization (CRO) with e-commerce friction reduction principles (Mandaê).
- **Acessibilidade no Espectro Autista (TEA) & Ergonomia Sensorial:** Ingests the 7-Vector Accessibility Matrix from the UFPE Master's Thesis (2025 by Lucas Silva: Image, Text, Navigation, Customization, Interaction, Sound, Interface), sensory overload avoidance (*Interference Journal*), zero-autoplay mandates, and literal, predictable microcopy (*Brasil UX Design*, *Ladies That UX BR*, *Reddit r/UXDesign*).
- **TDAH, Neurodiversidade & Ergonomia Cognitiva:** Specialized design patterns for ADHD and cognitive accessibility: combating task paralysis and wall-of-text, atomic progressive disclosure wizards with time-blindness indicators, dopamine-driven checklists, intelligent defaults to eliminate decision fatigue, and Zen Mode (*Fast Company*, *Projética/UEL*, *Homem Máquina*, *DIO.me*).
- **Screen Readers, ARIA Patterns & WCAG 2.2 Deep Guide:** Production standards for NVDA, JAWS, VoiceOver and TalkBack. Live regions (`aria-live`), strict accessible Modals with focus trapping and restoring, WCAG 2.2 focus-not-obscured rules, minimum 44px touch targets, and redundant entry reduction.
- **Psicologia das Cores, Modelos Cromáticos & Semiótica Visual:** Scientific psychological mapping of color spectrums (Goethe, Eva Heller, Lüscher), neuromarketing and CRO principles (60-30-10 Rule, Culturally-Informed Design), and technical color models (Hex, RGB, HSL, CMYK, XYZ, Yxy, LAB). Ingests insights from *Muzli*, *Buzzvel*, *Toptal*, *ESPM*, *Supercharge*, and *TerraLab*.
- **Nichos de Mercado & Questionário Socrático de Discovery:** Specialized design archetypes for Corporate/Finance, Healthcare, E-Commerce, SaaS/AI, and EdTech, accompanied by an actionable 4-step interview script for AI agents to profile client requirements.
- **Compêndio Avançado de Leis de UX & Design Cognitivo:** The 8 Golden Rules of Ben Shneiderman, Don Norman's Essential Principles (Affordance, Signifiers, Feedback, Mapping, Constraints), Steven Hoober's Thumb Zone & Mobile-first rules by Luke Wroblewski, IKEA Effect, Change Blindness and Halo Effect.
- **JavaScript Moderno, jQuery & jQuery UI Master Guide:** Complete patterns for ES6+ DOM manipulation, Event Delegation, Fetch API, Bootstrap 5.3/6.0 programmatic components, along with jQuery 3.7+ and jQuery UI 1.14+ (Draggable, Droppable, Sortable, Datepicker, Autocomplete) and direct migration cheat sheets.
- **HTML5 & CSS3 Master Manual:** Modern semantic architecture, AOM tree, Flexbox vs Grid guidelines, Container Queries, Cascade Layers (`@layer`), and GPU-accelerated motion.
- **The 18 Essential Laws of UX:** Concrete implementation of all 18 laws (Hick, Fitts, Jakob, Proximity, Similarity, Common Region, Uniform Connectedness, Miller, Doherty Threshold, Von Restorff, Serial Position, Peak-End, Zeigarnik, Prägnanz, Tesler, Postel, Parkinson, Occam's Razor & Pareto).
- **Nielsen's 10 Heuristics:** Actionable guidance for system feedback, user freedom (Undo), error recovery, and clean typography.
- **AccessLint & WCAG 2.2 AA:** Zero-compromise accessibility with keyboard focus rings (`.focus-ring`), ARIA labels, and touch targets (44px+).
- **Mazer & AdminKit Architectures:** Production-ready dashboard structures modeled directly after [zuramai/mazer](https://github.com/zuramai/mazer) and [adminkit/adminkit](https://github.com/adminkit/adminkit) with **Light Theme as mandatory default** (Night theme is strictly opt-in).
- **Visual Accessibility & Colorblindness:** Built-in safeguards for Protanopia, Deuteranopia, Tritanopia, and Achromatopsia. Clinically proven accessible typefaces (`Atkinson Hyperlegible`, `Lexend`, `OpenDyslexic`). Adheres to Brazilian Inclusion Law (LBI Lei 13.146/2015 Art. 63) and ABNT NBR 17225. Color is never the sole communicator.
- **Default Corporate Palette & Typography:** Standard palette `#90271` (`#869dcc`, `#5772ac`, `#3b5998`, `#224389`, `#14306b`) and Google Sans typography (`Google Sans Flex` for titles, `Google Sans` for text, `Google Sans Code` for mono).
- **Integrated Audit Engine:** Run `node scripts/audit_ux_bootstrap.mjs <file>` to automatically lint and detect accessibility/UX violations.
- **Continuous Update & Version Guard:** Automated dual check (`scripts/check_updates.mjs`) tracking upstream Bootstrap releases (NPM) and comparing local vs GitHub repository skill versions with mandatory user permission before sync.

### 🚀 Quick Start
```bash
# 1. Run UX & Accessibility linter on any HTML/PHP/JSX file:
node bootstrap-ux-ui-plus/scripts/audit_ux_bootstrap.mjs path/to/your-page.html

# 2. Check for new Bootstrap upstream versions & skill repository updates:
node bootstrap-ux-ui-plus/scripts/check_updates.mjs
```

---

## 🇧🇷 Português (Brasil)

### 📌 Visão Geral
O **Bootstrap UX/UI Plus** une as leis da psicologia cognitiva (Laws of UX), as heurísticas consagradas de Jakob Nielsen e as diretrizes internacionais de acessibilidade (WCAG 2.2 AA) ao poder do **Bootstrap (v5.3 e v6.0)**.

Projetada para desenvolvedores e arquitetos de software criarem interfaces elegantes, intuitivas e acessíveis para portais, dashboards analíticos e sistemas de gestão em **HTML, PHP, Node.js, React, Python/Django e Java**.

### 🌟 Destaques Principais
- **Fundamentos de UX Design & Impacto em Negócios:** A Colmeia de UX de Peter Morville (7 facetas), a metodologia do Duplo Diamante e otimização para e-commerce (CRO) inspirada em dados de conversão e frete da Mandaê.
- **Acessibilidade TEA & Ergonomia Sensorial:** A Matriz dos 7 Vetores da dissertação da UFPE (2025), controle rigoroso de sobrecarga sonora e visual (*Interference Journal*), microcópia literal e previsibilidade (*Brasil UX Design*).
- **TDAH & Ergonomia Cognitiva:** Interfaces que vencem a paralisia de escolha e sobrecarga de texto, formulários atômicos com revelação progressiva, contadores de tempo realistas e checklists dopaminérgicos (*Projética/UEL*, *DIO.me*, *Fast Company*).
- **Psicologia das Cores & Semiótica Visual:** Compêndio de Eva Heller, Goethe, Lüscher e Neuromarketing (Regra 60-30-10, modelos cromáticos RGB/CMYK/HSL/XYZ, paletas harmonizadas e significado cultural).
- **As 18 Leis Canônicas do UX:** Aplicação prática de todas as 18 leis (Hick, Fitts, Jakob, Proximidade, Semelhança, Região Comum, Conectividade Uniforme, Miller, Limiar de Doherty <400ms, Von Restorff, Posição Serial, Pico-Fim, Zeigarnik, Prägnanz, Tesler, Postel, Parkinson, Navalha de Occam e Pareto 80/20).
- **10 Heurísticas de Nielsen:** Componentes com feedback imediato de status, proteção contra erros destrutivos com modais de confirmação e linguagem humana.
- **Acessibilidade WCAG 2.2 Nível AA:** Navegação completa por teclado com `.focus-ring`, leitores de tela (NVDA, JAWS, VoiceOver), rótulos ARIA mandatórios e fontes adaptadas (`Atkinson Hyperlegible`, `Lexend`).
- **Arquiteturas de Referência Mazer & AdminKit:** Estruturas canônicas completas para painéis e administrações espelhadas em [zuramai/mazer](https://github.com/zuramai/mazer) e [adminkit/adminkit](https://github.com/adminkit/adminkit), com **Tema Claro (Light Theme) obrigatório por padrão**.
- **Acessibilidade Visual & Daltonismo:** Proteção técnica para Protanopia, Deuteranopia, Tritanopia e Acromatopsia. Em total conformidade com a LBI (Lei 13.146/2015 Art. 63), eMAG e ABNT NBR 17225. A cor nunca é o único comunicador.
- **Paleta Padrão Calibrada & Tipografia Oficial:** Aplicação automática da paleta `#90271` (`#869dcc`, `#5772ac`, `#3b5998`, `#224389`, `#14306b`) e fontes Google Sans (`Google Sans Flex`, `Google Sans`, `Google Sans Code`).
- **Auditor de Qualidade Integrado:** Script CLI nativo (`scripts/audit_ux_bootstrap.mjs`) para validação automática de código.
- **Verificador de Versão & Atualização com Portão de Permissão:** Sistema duplo de atualização (`scripts/check_updates.mjs`) que checa novas versões do Bootstrap (NPM) e sincroniza a skill com o repositório remoto apenas com autorização explícita do usuário.

---

## 📁 Estrutura de Arquivos / Folder Structure

```
bootstrap-ux-ui-plus/
├── SKILL.md                                 # Diretrizes e mandatos mestres para agentes de IA
├── README.md                                # Visão geral completa bilíngue (EN / PT-BR)
├── VERSION                                  # Versão semântica atual (0.4.0-beta)
├── CHANGELOG.md                             # Histórico detalhado de versões
├── cheatsheet.md                            # Guia rápido de classes e Leis de UX
├── glossary.md                              # Dicionário de termos técnicos de UX e UI
├── patterns.md                              # Padrões de arquitetura multi-linguagem
├── references/
│   └── ux-sources-and-inspirations.md       # Mapeamento formal de fontes, artigos e links ingeridos
├── fundamentals/
│   └── ux-design-fundamentals-and-business.md # Colmeia de Morville, Duplo Diamante e CRO
├── neurodiversity/
│   ├── adhd-cognitive-ergonomics.md         # Ergonomia cognitiva para TDAH
│   └── autism-and-sensory-design.md         # Acessibilidade TEA e conforto sensorial (UFPE 2025)
├── psychology/
│   └── color-psychology-and-semiotics.md    # Psicologia das cores, Eva Heller e 60-30-10
├── discovery/
│   └── niche-and-discovery-interview.md     # Questionário socrático de discovery e nichos
├── laws/
│   ├── advanced-ux-laws-and-principles.md   # Shneiderman, Don Norman e Thumb Zone
│   └── laws-of-ux-bootstrap.md              # Tradução técnica das 18 Leis de UX para Bootstrap
├── heuristics/
│   └── nielsen-heuristics-bootstrap.md      # 10 Heurísticas de Nielsen aplicadas
├── accessibility/
│   ├── a11y-wcag-guidelines.md              # Diretrizes WCAG 2.2 AA & AccessLint
│   ├── screen-readers-and-aria-patterns.md  # Leitores de tela, modais acessíveis e ARIA
│   └── visual-accessibility-colorblindness.md # Manual de Daltonismo, Baixa Visão e Fontes
├── standards/
│   ├── html5-css3-master-manual.md          # Manual mestre de HTML5 semântico e CSS3
│   └── javascript-jquery-master-guide.md    # Manual mestre de Vanilla JS, jQuery e jQuery UI
├── components/
│   └── ui-components-catalog.md             # Catálogo de componentes acessíveis Bootstrap
├── templates/
│   ├── admin-dashboard-template.html        # Dashboard administrativo canônico Mazer com docs vivas
│   ├── adminkit-dashboard-template.html     # Dashboard alternativo canônico AdminKit (.wrapper > .main)
│   ├── ablepro-dashboard-template.html      # Dashboard alternativo canônico Able Pro (.pc-sidebar + .pc-header + .pc-container)
│   └── mantis-dashboard-template.html       # Dashboard canônico Mantis (Ant Design style com bc_alert spec)
└── scripts/
    ├── audit_ux_bootstrap.mjs               # Motor CLI de auditoria e validação de código
    └── check_updates.mjs                    # Verificador de atualizações upstream e da skill
```

---

## 👨‍💻 Autor / Author
**GM Charles Corrêa**  
- 🌐 Website: [charlescorrea.com.br](https://rpg.charlescorrea.com.br)  
- 🐙 GitHub: [CharlesCorreaDev](https://github.com/CharlesCorreaDev)  
- ⚡ Skills AI: [github.com/CharlesCorreaDev/skills-ai](https://github.com/CharlesCorreaDev/skills-ai)
