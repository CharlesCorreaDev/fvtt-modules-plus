# Changelog - Bootstrap UX/UI Plus 🎨⚡

All notable changes to the `bootstrap-ux-ui-plus` skill will be documented in this file.  
*Todas as alterações notáveis na skill `bootstrap-ux-ui-plus` serão documentadas neste arquivo.*

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.7.0-beta] - 2026-11-13

### Added / Adicionado
- **Integração Mandatória com GoogleChrome/modern-web-guidance e WebMCP:**
  - Auditoria automatizada de templates e componentes com modern-web-guidance legacy-scan <path> para erradicar práticas obsoletas de HTML/CSS.
  - Adoção de padrões WebMCP (gentic-forms e gentic-javascript-tools) para permitir que agentes de IA interajam com formulários e interfaces ricas.

---

## [0.6.0-beta] - 2026-11-13

### Added / Adicionado
- **Manual Mestre Canônico de HTML5 & CSS3 Moderno (`standards/html5-css3-master-manual.md`):**
  - Síntese profunda baseada nos padrões W3C/WHATWG e na documentação clássica do **W3Schools HTML & CSS**.
  - Especificação completa de HTML5 Semântico, árvore AOM para leitores de tela e meta tags vitais (SEO, Open Graph, Favicon, PWA).
  - Guia mestre de formulários acessíveis (W3Schools Form Master): 14 tipos de inputs, `<fieldset>`, `<legend>`, `<datalist>`, `<optgroup>`, feedback visual de validação e restrições nativas.
  - Tabelas de dados de alta densidade com acessibilidade total (`<caption>`, `scope="col"`, cards responsivos).
  - CSS3 avançado: Cascade Layers (`@layer`), seletores `:is()`, `:where()`, `:has()`, Container Queries (`@container`), Design Tokens base 8px e paleta oficial `#90271`.
- **Efeitos Visuais Mandatórios, Transições, Hover, Active e Microinterações nos Templates:**
  - Diretriz obrigatória para que nenhum componente em templates gerados pela skill pareça estático ou sem vida.
  - Implementação de efeitos de hover de ponta: *Underline Sweep* em menus, *Botão Glow/Shimmer* com reflexo dinâmico de luz, *Card 3D Tilt* com elevação orgânica e *Image Zoom Reveal*.
  - Feedback tátil no clique (`:active { transform: scale(0.97); }`) e anel de foco acessível duplo (`:focus-visible`).
  - Benchmarks de bibliotecas de animação: **Anime.js** (timelines e SVG morphing), **Motion.dev** (spring physics e layout transitions), **PureCSS-Animations** (keyframes leves sem JS), **CodePen Hover Collections** (pens de Morgan Carbon Fourteen `mOxYjY` e Nathan Long `MwOpxj`) e **Prismic CSS Hover Effects**.
- **Acervos Canônicos e Comunidades do Frontend Brasileiro (`references/ui-inspiration-and-pattern-libraries.md`):**
  - Inclusão formal de **Recursos Frontend por Yuri Mutti** (`github.com/yurimutti/recursos-frontend`) e **Guia do Frontend Brasil** (`github.com/Guia-Dev-Brasil/guiadofrontend`).
- **Templates Atualizados com Microinterações e Transições GPU:**
  - `templates/admin-dashboard-template.html` e `templates/adminkit-dashboard-template.html` equipados com classes de interação, hover com elevação orgânica, efeito glow e respeito mandatório a `prefers-reduced-motion`.

---

## [0.5.0-beta] - 2026-11-12

### Added / Adicionado
- **Fundamentos Canônicos de UI Design & Princípios Visuais (undamentals/ui-design-core-principles.md):**
  - Definição completa e taxonomia de UI Design em relação ao UX (IxDF, Figma, RD Station, Alura, EBAC, Gabriel Silvestri, Salesforce).
  - Os 6 Princípios Canônicos do UI Design (Clareza, Consistência, Hierarquia Visual, Eficiência/Feedback, Tolerância a Erros e Ritmo Espacial Base 4/8px).
  - Metodologia de Design Atômico aplicada ao Bootstrap (Átomos, Moléculas e Organismos).
  - Diretrizes anti-slop visual para agentes de IA (proibição de cards dentro de cards, sombras pesadas e quebras de espaçamento).
- **Human Interface Guidelines (HIG) & Design Systems Comparados (standards/human-interface-guidelines-and-design-systems.md):**
  - Apple HIG: Os 3 Pilares (Deferência, Clareza, Profundidade), toque mínimo de 44px, raios de borda orgânicos (*squircle*) e efeito vidro fosco (*frosted glass* / ackdrop-filter).
  - Microsoft Fluent UI: Sistema de elevação em 5 camadas, luz Mica/Acrylic e foco acessível duplo.
  - GNOME & KDE HIG: Cabeçalhos unificados (*HeaderBars*), densidade de dados e ergonomia de teclado.
  - Síntese de design tokens e arquitetura de componentes de designsystems.surf e designsystems.one.
- **Catálogo de Inspiração, UI Patterns & Ferramental de Design (
eferences/ui-inspiration-and-pattern-libraries.md):**
  - Mapeamento analítico de UI Patterns, UI Design Daily, UI Skills, Figma UI Kits, Awwwards, Dribbble, Uizard, Pixso, Canva Whiteboard, Blush Design e Maze.
- **Mapeamento Expandido de Fontes (
eferences/ux-sources-and-inspirations.md):**
  - Inclusão formal de mais de 30 fontes internacionais e nacionais de UI design, design systems e diretrizes de plataforma.

---

## [0.4.0-beta] - 2026-11-12

### Added / Adicionado
- **Fundamentos Canônicos de UX Design & Negócios (`fundamentals/ux-design-fundamentals-and-business.md`):**
  - Integração da Colmeia de 7 Facetas do UX de Peter Morville (Útil, Usável, Desejável, Encontrável, Acessível, Confiável e Valioso).
  - Conceitos de UX moderno e Design Thinking (Duplo Diamante) referenciados por Figma, EBAC Online, Alura, Adobe Express, Catarinas e Tuia Design.
  - Alavancagem de vendas, retenção e CRO em e-commerce inspirado em dados e metodologias da Mandaê.
- **Acessibilidade no Espectro Autista (TEA) & Ergonomia Sensorial (`neurodiversity/autism-and-sensory-design.md`):**
  - Matriz dos 7 Vetores de Acessibilidade da Dissertação de Mestrado UFPE (2025) por Lucas Rafael Belmiro Firmino Silva (*Imagem, Texto, Navegação, Customização, Interação, Som e Interface*).
  - Práticas de redução de sobrecarga sensorial (*Interference Journal*), eliminação de autoplay e sons abruptos.
  - Princípios de comunicação literal, clareza e previsibilidade cognitiva baseados em relatos de UX designers autistas (*Brasil UX Design*, *Ladies That UX BR* e comunidade *Reddit r/UXDesign*).
- **TDAH & Ergonomia Cognitiva (`neurodiversity/adhd-cognitive-ergonomics.md`):**
  - Diretrizes para mitigação de paralisia de escolha, revelação progressiva atômica, combate a *time blindness* e checklists dopaminérgicos com micro-vitórias (*Fast Company*, *Projética/UEL*, *Homem Máquina*, *DIO.me* e *Medium*).
- **Psicologia das Cores & Semiótica Visual Expandida (`psychology/color-psychology-and-semiotics.md`):**
  - Síntese de teorias clássicas (Goethe, Eva Heller, Lüscher) e neuromarketing aplicado a UX/CRO (Regra 60-30-10, Culturally-Informed Design, modelos RGB/CMYK/HSL/LAB/XYZ, *Muzli*, *Buzzvel*, *Toptal*, *ESPM*, *Supercharge* e *TerraLab*).
- **Mapeamento de Fontes e Referências Externas (`references/ux-sources-and-inspirations.md`):**
  - Tabela canônica registrando todas as referências externas ingeridas na skill com links, conceitos-chave e correspondência com arquivos internos.
- **Catálogo de Componentes, Padrões HTML5/CSS3 e JavaScript/jQuery (`components/`, `standards/`):**
  - Documentação mestre de componentes acessíveis, padrões de animações CSS3 com aceleração por GPU, e manual mestre de JS Moderno, jQuery 3.7+ e jQuery UI 1.14+.
- **Leis de UX Expandidas & Discovery de Nichos (`laws/advanced-ux-laws-and-principles.md`, `discovery/niche-and-discovery-interview.md`):**
  - 8 Regras de Ouro de Shneiderman, Princípios de Don Norman, Thumb Zone de Hoober/Wroblewski e questionário socrático de discovery para agentes de IA.

---

## [0.3.0-beta] - 2026-11-09

### Added / Adicionado
- **Auditoria Adversarial Cloudflare & Anti-Alucinação NVIDIA:** Diretrizes obrigatórias de segurança via cloudflare/security-audit-skill e blindagem contra números inexistentes com NVIDIA/auto-ontology.

---

## [0.2.0-beta] - 2026-11-09

### Added / Adicionado
- **Motion Design & Animação de Interfaces (`patterns/claude-motion-guide.md`):**
  - Integração oficial com `whaleyxbt/claude-motion` para animações táteis fluidas, aceleração por GPU (`transform`, `opacity`), auto-avaliação estética de quadros e respeito a `prefers-reduced-motion`.
- **Tríade Canônica: Impeccable Design, Systematic Debugging & Trail of Bits Security:**
  - Diretrizes Impeccable de Paul Bakaus eliminando generic AI slop (proibição de cards dentro de cards desnecessários, gradientes caóticos e quebras tipográficas).
  - Depuração Sistemática em 4 etapas e segurança preventiva de sanitização de inputs.
- **Padrões de Engenharia de IA SOTA:**
  - Integração com Karpathy Guidelines, Superpowers, Claude Octopus e persistência de sessão com AgentMemory e Déjà Vu.

---

## [0.1.0-beta] - 2026-11-08

### Added / Adicionado
- **Lançamento Inicial da Skill (`bootstrap-ux-ui-plus` v0.1.0-beta):**
  - **Mapeamento Prático das 18 Leis do UX (`laws/laws-of-ux-bootstrap.md`):**
    - Tradução detalhada de todas as 18 Leis Canônicas do UX (Hick, Fitts, Jakob, Proximidade, Semelhança, Região Comum, Conectividade Uniforme, Miller, Doherty, Von Restorff, Posição Serial, Pico-Fim, Zeigarnik, Prägnanz, Tesler, Postel, Parkinson, Occam & Pareto) em componentes e utilitários do Bootstrap (v5.3 & v6.0).
  - **10 Heurísticas de Usabilidade de Jakob Nielsen (`heuristics/nielsen-heuristics-bootstrap.md`):**
    - Aplicação prática de visibilidade de status, prevenção de erros, saídas de emergência (Undo) e design minimalista no framework.
  - **Diretrizes de Acessibilidade & WCAG 2.2 AA (`accessibility/a11y-wcag-guidelines.md`):**
    - Padrões de conformidade baseados em AccessLint com atributos ARIA mandatórios, preservação de anéis de foco (`.focus-ring`), contraste sutil e alvos de toque mobile.
  - **Template Completo de Dashboard Administrativo (`templates/admin-dashboard-template.html`):**
    - Painel corporativo com navegação lateral (Sidebar), barra superior de busca, cards de métricas (Chunking), tabela responsiva e alternador dinâmico de tema claro/escuro.
  - **Padrões Canônicos de Dashboards Mazer & AdminKit (`patterns/mazer-and-adminkit-standards.md`):**
    - Estruturação baseada em [zuramai/mazer](https://github.com/zuramai/mazer) (`#app > #sidebar + #main`) e [adminkit/adminkit](https://github.com/adminkit/adminkit) (`.wrapper > .sidebar + .main`) com zero dependência de jQuery e Vanilla JS nativo.
  - **Motor CLI de Auditoria e Validação (`scripts/audit_ux_bootstrap.mjs`):**
    - Linter automatizado para verificar inconformidades de acessibilidade e usabilidade em arquivos HTML, PHP, JSX e templates.
  - **Verificador de Atualizações & Sincronização de Versão (`scripts/check_updates.mjs`):**
    - Monitoramento duplo: checagem de releases upstream do Bootstrap (NPM) e comparação de versão local com repositório remoto GitHub, com portão mandatória de autorização do usuário antes de qualquer sincronização de arquivos.
  - **Manual Técnico de Acessibilidade Visual e Daltonismo (`accessibility/visual-accessibility-colorblindness.md`):**
    - Guia completo para Protanopia, Deuteranopia, Tritanopia e Acromatopsia, proibição da cor como comunicador único, conformidade com LBI (Lei 13.146/2015 Art. 63), eMAG e ABNT NBR 17225.
  - **Definição de Paleta Corporativa Padrão (#90271) & Tipografia Oficial:**
    - Paleta Padrão `#90271` (`#869dcc`, `#5772ac`, `#3b5998`, `#224389`, `#14306b`) e tipografia oficial Google Sans (`Google Sans Flex`, `Google Sans`, `Google Sans Code`).
