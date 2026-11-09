# Humanizer Plus 🧠🛡️✨
> *The Definitive Multi-Layer AI De-Watermarking, Unicode Sanitization & Text Humanization Suite*  
> *Author: Charles Corrêa*

---

## 🎯 Objetivo Universal

O **Humanizer Plus** é uma skill unificada e universal de alta performance projetada para auditar, desmarcar e humanizar **todo e qualquer arquivo ou conteúdo gerado por Inteligência Artificial**:
- **Códigos-Fonte e Scripts:** (JS, TS, Python, PHP, Shell, Rust, C#, Go) eliminando comentários infantis/didáticos e manias mecânicas de IA.
- **Textos, Artigos e Documentação:** (PT-BR, EN, ES, FR, DE) eliminando os 26 vícios canônicos do *WikiProject AI Cleanup* e *blader/humanizer v3.1.0*.
- **Metadados e Mídias:** Remoção de codepoints invisíveis (ZWSP, BOM), normalização de aspas tipográficas e purga de metadados C2PA/EXIF.
- **Comunicações e Respostas:** Purga de resíduos de chatbot (*"Espero ter ajudado!"*) e corte de explicações redundantes em threads.

A skill vigia continuamente o repositório upstream [`blader/humanizer`](https://github.com/blader/humanizer), alertando o desenvolvedor e solicitando autorização para absorver e adaptar novos padrões, **preservando eternamente a pasta de dados `humanizer_data/` no disco**.

---

## 🚀 Como Usar

### 1. No seu Agente (Prompt)
- *"Humanize este texto removendo qualquer rastro de IA."*
- *"Limpe as marcas de IA e normalize este script/macro."*
- *"Audite este documento e aponte os vícios de linguagem de IA."*

### 2. Via Linha de Comando (Scripts Utilitários)
A skill traz scripts prontos para rodar no seu ambiente ou via Docker/Node:

```bash
# Limpeza de arquivo único
node humanizer-plus/scripts/sanitize.js caminho/do/arquivo.md

# Varredura em lote com simulação (dry-run)
node humanizer-plus/scripts/sanitize.js pasta/do/projeto --dry-run
```

---

## 📚 Documentação Completa
Consulte as instruções completas, tabelas de substituição e matriz de pontuação no arquivo:
👉 [**SKILL.md**](SKILL.md)
