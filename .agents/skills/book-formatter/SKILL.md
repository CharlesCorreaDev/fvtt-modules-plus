---
name: book-formatter
description: Book formatting and RPG book diagramming suite for AI agents. Installs any required document-reading toolchain (PDF with or without OCR, TXT, DOCX, DOC, CSV/TSV, XLSX/XLS, HTML, EPUB, images OCR) and orchestrates book diagramming delivering a TXT with the texts, a Markdown and a duly diagrammed PDF preserving the original layout. Orquestra 10 subagentes cobrindo Direção Editorial, Specs, PRs, SSD & Handoff SemVer, Ingestão PDF Oxide, Tipografia e Fontes, Regras RPG, Tradução em Lotes de 5 Páginas, Revisão Semântica, Diagramação Fiel, Auditoria de Páginas e Documentação Bilíngue.
---

# Book Formatter / Diagramador de Livros 📕➡️📄
> *by GM Charles Corrêa* • **Suíte Federada de 10 Subagentes de Diagramação Editorial (0.9.0-beta)**

---

## 🏛️ Topologia dos 10 Subagentes Especializados

Para erradicar omissões e garantir fidelidade tipográfica e visual idêntica ao original:

`mermaid
flowchart TD
    User([Usuário / Autor / GM]) --> Showrunner[1. Showrunner & Diretor Editorial]
    Showrunner --> SpecHandoff[2. Specs, PRs, SSD, Escopo & Handoff]
    SpecHandoff --> Extractor[3. Ingestão PDF Oxide/OCR]
    Extractor --> Typographer[4. Tipografia, Fontes & Margens]
    Extractor --> RpgAnalyst[5. Regras & Glossário RPG]
    Typographer & RpgAnalyst --> BatchTranslator[6. Tradutor em Lotes de 5 Páginas]
    BatchTranslator --> SemanticReviewer[7. Revisor Semântico & Fórmulas]
    SemanticReviewer --> Diagrammer[8. Diagramador PDF/MD/EPUB]
    Diagrammer --> QualityAuditor[9. Auditor Geral de Fidelidade Visual]
    QualityAuditor --> TechnicalWriter[10. Documentador Bilíngue EN/PT-BR]
    TechnicalWriter --> SpecHandoff
    SpecHandoff --> OutputFinal([Pacote Entregue: TXT, MD e PDF Fiel])
`

---

## ⚡ Regras Canônicas & Portões Obrigatórios (Fast Gates)

1. **PDF Oxide em 1º Lugar:** Para qualquer extração/leitura de PDF, use pdf_oxide (Rust/Python/Node). Demais ferramentas são fallback.
2. **Tradução em Lotes de 5 Páginas:** Nunca traduza o livro inteiro de uma vez; opere em micro-lotes para evitar alucinações e perda de termos.
3. **Glossário & Consistência:** Mantenha glossário bilíngue estrito (ver glossarys/) para mecânicas e termos de RPG.
4. **Preservação Visual de Página:** Mesma quantidade de páginas, fluxo de colunas e fidelidade às fontes originais do livro.
5. **SemVer 2.0.0 (PT-BR) & Padrão Bilíngue:** Releases e documentações estritamente em EN e PT-BR.
6. **Portão de Auditoria Visual:** O Auditor compara página a página antes da homologação final.

---

## 🔗 Protocolo de Skills Companheiras (SDD, Handoff, TDD & Rigor)
`ash
# Stack Supremo de Economia de Tokens & Otimizacao
npx skills@latest add headroomlabs-ai/headroom
npx skills@latest add rtk-ai/rtk
npx skills@latest add JuliusBrussee/caveman
npx skills@latest add dietrichgebert/ponytail

# Suite de Engenharia Rigorosa, SDD, TDD, Handoff & GodMode
npx skills@latest add noobygains/godmode
npx skills@latest add addyosmani/agent-skills --skill=spec-driven-development
npx skills@latest add mattpocock/skills --skill=grill-me
npx skills@latest add mattpocock/skills --skill=handoff
npx skills@latest add mattpocock/skills --skill=tdd
npx skills@latest add aihero-dev/skills-code-review
npx skills@latest add multica-ai/andrej-karpathy-skills
npx skills@latest add cloudflare/security-audit-skill
npx skills@latest add NVIDIA/auto-ontology
`

---

## 📚 Índice Modular de Referências (Carregamento Sob Demanda)

- [Metodologias SDD, Handoff, Grill-Me & TDD](references/sdd-handoff-grillme-tdd.md): Especificação rigorosa, alinhamento, TDD e handoff.
- [Arquitetura dos 10 Subagentes](references/arquitetura-subagentes-book-formatter.md): Perfis e fluxo de trabalho de cada agente.
- [Guia Completo de Diagramação (Português)](references/book-formatter-guide-ptbr.md): As 8 fases obrigatórias de diagramação, protocolos Karpathy e regras de tradução.
- [Complete Diagramming Guide (English)](references/book-formatter-guide-en.md): Full extraction matrix, SOTA AI engines, format matrix and quality checklists.
- [Guia do Motor PDF Oxide](pdf-oxide-guide.md): Instalação e uso de pdf-oxide para alta velocidade em Rust/Python/Node.
- [Cheatsheet Rápido](cheatsheet.md): Comandos e atalhos rápidos de conversão.
- [Design Systems](design-systems/): Paletas, fontes, ornamentos e tipografia para WoD, Fantasia e Sci-Fi.
- [Neurodiversidade](neurodiversity/): Diretrizes para acessibilidade visual, dislexia e contraste confortável.
- [Glossários de RPG](glossarys/): Dicionários de termos técnicos para World of Darkness e sistemas D20.
