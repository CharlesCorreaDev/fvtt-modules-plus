# Humanização de Conteúdo, Código Limpo & Anti-Detecção no Foundry VTT 🎲🛡️
> *Diretrizes Práticas para Eliminar Marcas de IA e Humanizar Textos, Macros, Atores e Módulos*  
> *Master of Foundry VTT by GM Charles Corrêa*

---

## 📌 Por que o Conteúdo de IA é Detectado no Foundry VTT?

Ao gerar macros, diários narrativos, itens, fichas de personagens ou módulos inteiros com LLMs, certos padrões artificiais denunciam a autoria sintética:

1. **Rastros Mecânicos e Metadados (Layer A):**
   - **Caracteres Unicode Invisíveis:** Codepoints como `U+200B` (Zero-Width Space), `U+200C` (ZWNJ), `U+FEFF` (BOM) e marcas de direção são inseridos silenciosamente por APIs e interfaces web de IA. No Foundry, eles podem causar erros misteriosos de sintaxe em macros ou quebrar indexação de compêndios.
   - **Aspas Tipográficas Curvas:** `“ ” ‘ ’` em vez de aspas ASCII retas `"` e `'`.
   - **Comentários de Rastreamento:** Comentários HTML ocultos como `<!-- cid:... -->` ou chaves de metadados geradores em JSON.

2. **Cacoetes de Código e Comentários Artificiais:**
   - Comentários infantis e redundantes em cada linha (`// Check if actor exists`, `// Log to console`).
   - Nomes de variáveis enciclopédicos que nenhum desenvolvedor real usa (ex: `targetActorDocumentInstanceCollection`).
   - Ausência de padrões idiomáticos do Foundry (como *early returns*, verificação de `canvas.tokens.controlled` e `game.user.isGM`).

3. **"Slop" Narrativo em Diários e Itens (Layer B):**
   - Clichês de abertura: *"No vasto e perigoso reino de..."*, *"Em um mundo onde a escuridão reina..."*.
   - Frases de efeito vazias: *"Não é apenas uma espada, é um símbolo de honra"*.
   - Tríades simétricas de adjetivos: *"uma relíquia sombria, misteriosa e imponente"*.
   - Conclusões solenes e moralistas: *"O destino dos aventureiros agora repousa em suas escolhas"*.

---

## 🛠️ Arquitetura em Duas Camadas de Humanização

```
[Conteúdo Bruto / Saída de IA]
       │
       ▼
┌────────────────────────────────────────────────────────┐
│  CAMADA A: Saneamento Determinístico (Unicode & Meta)   │
│  - Limpeza de zero-width codepoints (U+200B, U+FEFF)   │
│  - Normalização de aspas curvas para aspas retas       │
│  - Purga de marcas C2PA/EXIF em tokens/imagens         │
│  - Remoção de tags de gerador em manifests JSON        │
└────────────────────────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────────────────┐
│  CAMADA B: Humanização Estilística & Estrutural        │
│  - Código: Idiomático, early-returns, comentários úteis│
│  - Narrativa: Tom de mestre real, detalhes concretos   │
│  - Corte de AI-isms: sem tríades vazias, sem filler    │
└────────────────────────────────────────────────────────┘
       │
       ▼
[Documento Foundry VTT 100% Limpo e Autêntico]
```

---

## 💻 1. Humanização de Código & Macros JavaScript

### ❌ Antes (Típico Código Gerado por IA):
```javascript
// This macro checks if a token is currently selected by the user
// If a token is selected, it will apply damage to the selected actor
const selectedToken = canvas.tokens.controlled[0];

if (selectedToken) {
  // Get the actor from the token
  const targetActor = selectedToken.actor;
  if (targetActor) {
    // Define the damage amount
    const damageAmount = 10;
    // Calculate new HP
    const currentHp = targetActor.system.attributes.hp.value;
    const newHp = currentHp - damageAmount;
    // Update the actor
    await targetActor.update({ "system.attributes.hp.value": newHp });
    ui.notifications.info("Damage successfully applied to the actor!");
  } else {
    ui.notifications.warn("The selected token does not have an actor!");
  }
} else {
  ui.notifications.warn("Please select a token before executing this macro!");
}
```

### ✅ Depois (Código Humano, Idiomático e Conciso):
```javascript
const token = canvas.tokens.controlled[0];
if (!token?.actor) return ui.notifications.warn("Selecione um token com ator.");

const damage = 10;
const hp = token.actor.system.attributes?.hp?.value ?? 0;

await token.actor.update({ "system.attributes.hp.value": Math.max(0, hp - damage) });
ui.notifications.info(`${token.name} sofreu ${damage} de dano.`);
```

### Regras de Ouro no Código:
1. **Early Return:** Elimine aninhamentos profundos de `if/else`.
2. **Optional Chaining (`?.`):** Use encadeamento seguro em vez de múltiplos `if`.
3. **Comentários Estritamente Necessários e Bilíngues (EN + PT-BR):** Comente apenas decisões arquiteturais não óbvias ou workarounds de bugs do core. Nunca comente o que o código já expressa. **Quando necessários, os comentários DEVEM ser formulados sempre em Inglês e Português**:
   ```javascript
   // EN: Ensure default ownership is 0 (concealed from players) unless explicit
   // PT-BR: Garante ownership padrão 0 (oculto dos jogadores) salvo se explícito
   const ownership = options.ownership ?? { default: 0 };
   ```
4. **Sem Cabeçalhos de IA:** Nunca inclua cabeçalhos como `// Macro created by Assistant`.

---

## 📜 2. Humanização de Diários, Lore e Descrições de Itens

### ❌ Antes (Linguagem Artificial de IA):
> *A Lâmina dos Condenados serve como um testemunho vivo do poder das artes arcanas. Além disso, ela oferece um corte afiado, elegante e mortífero — garantindo que qualquer oponente seja subjugado com facilidade. Não se trata apenas de uma arma militar, mas de um lembrete das eras sombrias que moldaram o império. Dizem que poucos conseguem dominar seu peso, e aqueles que o fazem encontram um poder além da imaginação.*

### ✅ Depois (Voz Natural de Mestre / Narrador Real):
> *Forjada em aço fosco com o pomo entalhado em dente de wyrm. A lâmina mantém o fio mesmo contra armaduras de placas. Quando acerta um golpe crítico, drena 1d6 de vida do alvo e transfere para quem empunha. Pesa 1,8 kg e exige Força 13.*

### Lista de AI-isms Banidos em RPG:
| Expressão Artificial de IA | Substituição Natural / Ação |
| :--- | :--- |
| "Serve como um testemunho de..." | Corte direto. Descreva o fato ou material. |
| "Além disso," / "Vale ressaltar que" | Corte a muleta. Inicie com a informação direta. |
| "Não é apenas X, mas sim Y" | Diga o que é, sem encenação de suspense. |
| "Afiado, elegante e mortífero" (tríades) | Use um detalhe tático ou sensorial concreto. |
| "- garantindo que..." (gerúndio explicativo) | Divida em duas frases ou vá direto ao efeito mecânico. |
| "Deixe isso assentar." / "Let that sink in" | Banido totalmente. |
| "Um mundo de possibilidades se abre" | Diga quais mecânicas ou opções o jogador ganha. |

---

## 🛡️ 3. Otimização e Saneamento de Mídias (Imagens, SVGs e Vídeos)

Ao incluir mídias para mapas de cena, tokens, itens, efeitos visuais ou sons no Foundry VTT:

### 🖼️ Imagens: Por que `.webp` é o Padrão Ouro?
1. **Formatos Ráster Obrigatórios para Conversão (`.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`):**
   - Imagens rasterizadas devem ser convertidas para **`.webp` com ~95% de qualidade (`quality: 95`)**. O WebP a 95% preserva todos os detalhes visuais finos (texturas de mapas, arte de tokens e contrastes) enquanto reduz significativamente o peso em bytes e o consumo de VRAM no navegador dos jogadores.
2. **As imagens `.svg` precisam de conversão? NÃO!**
   - **Arquivos `.svg` NÃO devem ser convertidos para `.webp`**.
   - O SVG é um formato puramente **vetorial baseado em código XML**. Ele possui tamanho minúsculo (geralmente poucos kilobytes), renderiza em qualquer resolução com nitidez infinita (ótimo para ícones de habilidades e itens da interface) e tem suporte nativo total no Foundry VTT (tanto que o core do Foundry utiliza SVGs para a maioria de seus ícones de interface e status em `icons/svg/`).
3. **Purga de Metadados EXIF/C2PA:**
   - A conversão para `.webp` remove por padrão metadados de geração de IA embutidos em arquivos JPEG/PNG.
4. **Nomes de Arquivo Limpos:**
   - Evite nomes gerados por IA (ex: `DALL-E_2026-10-24_15.30.22_sword.png`). Renomeie para identificadores descritivos e humanos: `espada-runica.webp`.

### 🎬 Vídeos no Foundry VTT: Qual a Extensão e Padrão Ideal?
1. **O Formato Padrão Ouro para Vídeos no Foundry é `.webm` (Codec VP9, CRF 16 ~95% de fidelidade visual, áudio Opus):**
   - O Foundry VTT roda dentro de navegadores web (Chromium/Electron). Arquivos **`.webm`** com codec **VP9** possuem:
     - **Suporte Nativo a Canal Alfa (Transparência):** Essencial para efeitos de magias, explosões do *Sequencer*, *JB2A* e tokens animados flutuantes sem fundo preto. O MP4 não suporta transparência nativa na web.
     - **Desempenho de Loop Perfeito:** Execução contínua sem engasgos no WebGL/PixiJS Canvas do Foundry.
     - **Qualidade a 95% (CRF 16):** Fidelidade quase sem perdas perceptíveis mantendo fluxo de dados leve.
2. **Conversão de Outros Formatos (`.mp4`, `.mov`, `.mkv`, `.avi`):**
   - Devem ser transcodificados para `.webm` sempre que forem usados como mapas animados, fundos de cena ou efeitos sobrepostos.

### 🛠️ Script Utilitário de Conversão no Repositório
A skill conta com o utilitário [`scripts/convert_media.js`](../scripts/convert_media.js):
```bash
# Simulação da conversão em uma pasta de assets
node scripts/convert_media.js caminho/para/assets --dry-run

# Conversão real de imagens para .webp e vídeos para .webm (preservando SVGs)
node scripts/convert_media.js caminho/para/assets

# Conversão com deleção dos arquivos originais antigos
node scripts/convert_media.js caminho/para/assets --delete-original
```
