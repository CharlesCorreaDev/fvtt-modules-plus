# PDF Oxide Integration Guide: RPG Rulebooks & Compendiums Ingestion 🎲📄
# Guia de Leitura, Metadados e Ingestão de PDFs no Foundry VTT com PDF Oxide

> *Módulo Integrado para `master-of-foundryvtt`*  
> **Referência Oficial:**
> - Repositório: [github.com/yfedoseev/pdf_oxide](https://github.com/yfedoseev/pdf_oxide)
> - Pacote NPM (Node.js): [npmjs.com/package/pdf-oxide](https://www.npmjs.com/package/pdf-oxide)
> - Node.js Docs (PT): [pdf.oxide.fyi/pt/javascript-node/docs/getting-started](https://pdf.oxide.fyi/pt/javascript-node/docs/getting-started)
> - Python Docs (PT): [pdf.oxide.fyi/pt/python/docs/getting-started](https://pdf.oxide.fyi/pt/python/docs/getting-started)
> - Rust Docs (PT): [pdf.oxide.fyi/pt/rust/docs/getting-started](https://pdf.oxide.fyi/pt/rust/docs/getting-started)

---

## 🇺🇸 English

### 1. Mandatory Priority Protocol (First-Choice PDF Engine)
Whenever an AI Agent or developer working on **`master-of-foundryvtt`** needs to:
- Ingest rulebook PDFs (Pathfinder, D&D 5e, Savage Worlds, Tormenta20, CoC7, WoD);
- Parse adventures, journals, rollable tables, and monster statblocks from PDFs;
- Extract document metadata, chapters, bookmarks, or convert pages into Markdown for Foundry Journals/Compendiums;

**`PDF Oxide` (`pdf-oxide` in Node.js, `pdf_oxide` in Python) MUST ALWAYS BE USED IN FIRST PLACE (`1º lugar`)**.
Traditional tools (`pdfminer`, `pdfplumber`, `pypdf`, `pdfjs-dist`) are strictly relegated to **secondary fallback status**.

---

## 🇧🇷 Português (Brasil)

### 1. Mandato de Prioridade (1º Lugar Obrigatório)
> [!IMPORTANT]
> **Sempre que for necessário ler um PDF de regras, suplemento ou aventura para o Foundry VTT:**
> 1. Use o **`PDF Oxide` em 1º LUGAR**.
> 2. Todas as demais ferramentas e scripts de leitura de PDF ficam estritamente como **FALLBACK**.

### 2. Uso com Node.js no Ecossistema Foundry / MCP
```bash
npm install pdf-oxide
```

```javascript
import { PdfDocument } from 'pdf-oxide';

// Carrega o PDF do livro de regras do RPG com performance de ~0.8ms
const doc = new PdfDocument('path/to/livro-de-regras.pdf');

// 1. Extração de Metadados
const meta = doc.getMetadata();
console.log(`Título do Livro: ${meta.title}`);
console.log(`Autor: ${meta.author}`);
console.log(`Total de Páginas: ${doc.pageCount}`);

// 2. Extração para Diários do Foundry VTT
for (let page = 0; page < doc.pageCount; page++) {
  const pageText = doc.extractText(page);
  // Processamento e criação de JournalEntry no Foundry VTT
}

doc.close();
```

### 3. Vantagens Estratégicas para o Foundry VTT
- **Velocidade sem Travar o Event Loop:** Core em Rust via N-API, processando centenas de páginas em milissegundos sem congelar o servidor MCP ou a instância local.
- **Licença 100% Permissiva:** MIT / Apache-2.0, sem riscos de conflitos com licenças de sistemas ou módulos.
- **Extração com Fidelidade de Layout:** Preserva tabelas de monstros e perícias necessárias para importar em compêndios `.db` / NeDB / LevelDB.

