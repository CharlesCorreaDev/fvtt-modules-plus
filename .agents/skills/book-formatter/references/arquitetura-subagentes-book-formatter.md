# Arquitetura dos 10 Subagentes Especializados — Book Formatter 📕➡️📄
## 10 Specialized Subagents Architecture — Book Formatter 📕➡️📄

A suíte **Book Formatter** opera sob o padrão de Engenharia Federada em Linha de Montagem com Quality Gates, espelhando o fluxo de uma editora profissional especializada em livros complexos de RPG (World of Darkness, Vampire: The Masquerade, D&D, Tormenta20).

The **Book Formatter** suite operates under a federated assembly line engineering model with Quality Gates, reflecting the workflow of a professional publishing house specialized in complex RPG rulebooks (World of Darkness, Vampire: The Masquerade, D&D, Tormenta20).

`mermaid
flowchart TD
    User([Usuário / Autor / GM / User]) --> Showrunner[1. Showrunner & Diretor Editorial]
    Showrunner --> SpecHandoff[2. Specs, Escopo & SemVer]
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

## 🇧🇷 Português (Brasil) — Papéis e Responsabilidades dos 10 Subagentes

1. **Showrunner & Diretor Editorial:** Entrevista o autor via grill-me, define o estilo editorial, metas de páginas e orquestra as fases da esteira.
2. **Engenheiro de Specs, PRs, SSD, Escopo & Handoff:** Mapeia a estrutura editorial, especificações de lote, diagramas de fluxo SSD, documentação de PRs e guias de handoff de artefatos conforme  Mapeia a estrutura do livro (capítulos, apêndices), critérios de aceitação e versionamento de artefatos conforme [SemVer 2.0.0 PT-BR](https://semver.org/lang/pt-BR/).
3. **Engenheiro de Ingestão & PDF Oxide:** Executa extração ultraveloz com pdf_oxide (Rust) ou OCR avançado (docling/
ougat em scans antigos) sem quebrar colunas.
4. **Analista Tipográfico, Fontes & Margens:** Mapeia fontes exatas (serifas, títulos góticos, capitulares), pesos, entrelinhas e caixas de texto decoradas.
5. **Especialista em Regras & Glossário RPG:** Ingesta glossários canônicos de sistemas (WoD, D20, YZE) e garante coerência mecânica e terminológica.
6. **Tradutor em Lotes Estritos de 5 Páginas:** Tradução progressiva em micro-lotes (5 a 10 páginas por vez), impedindo alucinações ou omissão de parágrafos.
7. **Revisor Semântico, Fórmulas & Fidedignidade:** Compara o texto traduzido contra o original em inglês linha por linha, validando tabelas e cálculos.
8. **Diagramador & Compositor de PDF/MD/EPUB:** Reconstrói o layout original (duas colunas, caixas de citação, ornamentos de borda e posicionamento de imagens).
9. **Auditor Geral de Fidelidade Visual (Portão Obrigatório):** Compara página por página do PDF gerado com o original, garantindo o mesmo número exato de páginas (page count).
10. **Redator Técnico & Documentador Bilíngue:** Produz documentação técnica do livro, glossários gerados e relatórios de conformidade em EN e PT-BR.

---

## 🇺🇸 English — Roles and Responsibilities of the 10 Subagents

1. **Showrunner & Editorial Director:** Interviews the author via grill-me, establishes editorial styles, page count budgets, and pipeline stages.
2. **Specs, PRs, SSD, Scope & Handoff Engineer:** Outlines publication architecture, batch specs, SSD sequence flows, PR descriptions, and artifact handoff manuals per  Outlines publication architecture (chapters, tables, sidebars), acceptance criteria, and SemVer release tagging.
3. **Ingestion & PDF Oxide Engineer:** Executes ultra-fast text/bounding-box extraction via Rust-powered pdf_oxide (or docling/
ougat OCR on legacy scans).
4. **Typography, Fonts & Margins Analyst:** Identifies original typefaces (serifs, gothic headers, drop caps), tracking, leading, and ornate decorative callouts.
5. **RPG Rules & Systems Glossary Specialist:** Ingests canonical system glossaries (WoD, D20, YZE) to guarantee 100% mechanical and terminology fidelity.
6. **Strict 5-Page Batch Translator:** Translates content in disciplined micro-batches (5 to 10 pages per turn) preventing token degradation and omitted blocks.
7. **Semantic & Mechanics Reviewer:** Conducts line-by-line verification between target translation and source text, auditing math, tables, and dice rolls.
8. **PDF/MD/EPUB Layout Compositor:** Faithfully reconstructs original layouts (two-column flow, sidebars, borders, flourishes, and visual assets).
9. **Visual Fidelity Auditor (Mandatory Quality Gate):** Compares generated PDF pages side-by-side with the original document, verifying exact page-count alignment.
10. **Bilingual Technical Writer (EN / PT-BR):** Generates technical publication notes, extracted glossary packages, and bilingual release logs.
