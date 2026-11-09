# Guia Oficial de Otimização e Conversão de Mídias para Foundry VTT 🎨🎬
> *Padrões Ouro de Imagens (.webp), Vídeos (.webm) e Vetores (.svg) a 95% de Qualidade*  
> *Master of Foundry VTT by GM Charles Corrêa*

---

## 📌 Visão Geral & Desempenho no Foundry VTT

O **Foundry Virtual Tabletop** roda como uma aplicação web moderna (alimentada por Chromium/Electron no cliente e PixiJS/WebGL no Game Canvas). Ao hospedar uma mesa, todos os assets de uma cena (mapas, tokens, iluminação, efeitos visuais animados e áudios) precisam ser **transmitidos pela rede para o navegador de cada jogador** e alocados na memória de vídeo (VRAM) da GPU.

O uso de formatos brutos e desatualizados (como PNGs de 40MB ou vídeos MP4 pesados sem canal alfa) causa:
- Telas de carregamento eternas para jogadores com conexões moderadas.
- Congelamentos e quedas bruscas de FPS no Canvas.
- Esgotamento de VRAM em notebooks e placas integradas.

Este guia estabelece os **padrões definitivos de conversão, codecs e qualidade** recomendados pela comunidade e pela arquitetura oficial do Foundry VTT.

---

## 🖼️ 1. Imagens: Padrão Ouro WebP (95% de Qualidade)

### Formatos Ráster Obrigatórios para Conversão:
- **Formatos que DEVEM ser convertidos:** `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.tiff`.
- **Formato de Destino:** **`.webp`**.

### Por que `.webp` a 95%?
1. **Compressão Superior:** O WebP reduz o peso em bytes entre **25% e 40%** comparado a PNGs e JPEGs sem sacrificar a legibilidade.
2. **Qualidade a 95% (`quality: 95`):**
   - É o limiar ideal para RPG de mesa: preserva a nitidez de textos em mapas de batalha (linhas de grade, detalhes arquitetônicos e numerações) e mantém a riqueza de tons de pele e iluminação em tokens e avatares.
3. **Canal Alfa (Transparência Completa):**
   - Diferente do JPEG clássico, o WebP suporta transparência total de 8 bits (como PNG), essencial para tokens circulares, auras, tiles de mobília e telhados com oclusão (*overhead tiles*).
4. **Remoção de Metadados e Rastreamento:**
   - A conversão para WebP expurga dados desnecessários de EXIF, C2PA e marcadores de prompts de IA geradores.

---

## 📐 2. As Imagens `.svg` Precisam de Conversão? (NÃO!)

**Arquivos `.svg` NUNCA devem ser convertidos para `.webp` ou formatos ráster.**

### Por quê?
- **Natureza Vetorial:** O SVG é composto por instruções vetoriais matemáticas em XML (`<path>`, `<rect>`, `<circle>`). Ele não possui resolução fixa.
- **Tamanho Irrisório:** Arquivos SVG pesam frequentemente entre **1 KB e 8 KB**, sendo infinitamente mais leves que qualquer imagem bitmap.
- **Nitidez Absoluta em Qualquer Zoom:** Renderiza com precisão cirúrgica em monitores Full HD, 4K ou ao aplicar zoom máximo no Canvas.
- **Nativo no Core do Foundry:** A própria equipe do Foundry VTT adota `.svg` como padrão oficial para sua biblioteca de interface, status e ícones de compêndio (`icons/svg/item-bag.svg`, `sword.svg`, `shield.svg`, etc.).

---

## 🎬 3. Vídeos no Foundry VTT: Padrão WebM (Codec VP9, Áudio Opus, CRF 16)

### Qual a melhor extensão de vídeo?
**O padrão ouro absoluto para o Foundry VTT é `.webm` com codec de vídeo VP9 e áudio Opus.**

| Característica | Formato `.mp4` (H.264) | Formato `.webm` (VP9) |
| :--- | :---: | :---: |
| **Canal Alfa (Transparência)** | ❌ Sem suporte na web | ✅ **Suporte Total Nativo** |
| **Loops no Canvas WebGL** | ⚠️ Pode ter travamentos | ✅ **Fluido e Perfeito** |
| **Tokens Animados Sem Fundo** | ❌ Fica com caixa preta | ✅ **Fundo transparente limpo** |
| **Compatibilidade no Foundry** | Básica (sem transparência) | **Nativa e Recomendada** |

### Configuração de Qualidade a 95% (CRF 16):
- **O que é CRF?** *Constant Rate Factor* mede o nível de perda de qualidade no encoding.
- Um **CRF de 16** no encoder VP9 equivale a aproximadamente **95% de fidelidade visual**, garantindo que partículas, chamas, água fluindo e feitiços mágicos não apresentem artefatos de bloco ou perda de nitidez durante o combate.
- **Codec de Áudio:** `libopus` a 128k–192k garante fidelidade cristalina para efeitos sonoros embutidos.

---

## 🛠️ 4. Como Executar as Conversões Automaticamente

## 🎵 4. Áudio e Músicas no Foundry VTT: Padrão Ogg Vorbis / Opus (`.ogg`)

Para trilhas sonoras de fundo (BGM), playlists de combate, efeitos sonoros (SFX) e sons posicionais ambientes no Foundry VTT:

### Qual a melhor extensão de áudio?
**O padrão ouro absoluto para o Foundry VTT é `.ogg` (Vorbis ou Opus a ~192 kbps ou ~95% de fidelidade).**

| Característica | Formato `.mp3` | Formato `.wav` | Formato `.ogg` (Vorbis / Opus) |
| :--- | :---: | :---: | :---: |
| **Seamless Loop (Sem gap de silêncio)** | ❌ Insere silêncio de padding | ✅ Sem gap | ✅ **Perfeito sem micro-pausas** |
| **Consumo de Memória / RAM** | Moderado | ❌ Enorme (não comprimido) | ✅ **Mínimo e otimizado** |
| **Tamanho do Arquivo (Download)** | Médio (128-320 kbps) | ❌ Gigantesco (10x maior) | ✅ **Compactação extrema** |
| **Suporte Nativo no Web Audio API** | Sim (com limitações de loop) | Sim (pesado para streaming) | ✅ **Padrão oficial recomendado** |

### Por que NÃO usar `.mp3` para loops de música e ambiência?
1. **O problema do "Gap" de silêncio no MP3:**
   - A especificação técnica do MP3 insere automaticamente alguns milissegundos de **silêncio no início e no final** do arquivo (*encoder delay/padding*). Quando o Foundry tenta colocar uma música de combate ou som de chuva em loop (`repeat`), o jogador escuta um pequeno engasgo/corte a cada repetição.
2. **Ogg Vorbis / Opus não tem padding:**
   - O formato `.ogg` inicia e encerra nos pontos exatos das amostras (*sample-accurate loop*), permitindo **loops infinitos perfeitamente contínuos**.
3. **Por que NÃO usar `.wav`?**
   - Um arquivo `.wav` de 3 minutos tem cerca de 30 MB a 40 MB. Transmitir isso para 5 ou 6 jogadores simultaneamente congestiona a banda do mestre e pode causar travamentos. Um `.ogg` com qualidade 95% atinge a mesma percepção acústica pesando apenas 3 MB a 4 MB.

### Qualidade Definida para Áudios (95% de Fidelidade):
- **Trilhas Sonoras & Playlists:** `.ogg` a **192 kbps** (Vorbis `-q:a 6` a `7` ou Opus `160k-192k`).
- **Efeitos Sonoros Curtos (SFX de magias, espadas, passos):** `.ogg` a **128k–160k**.

---

## 🛠️ 5. Como Executar as Conversões Automaticamente

A skill disponibiliza o utilitário nativo em Node.js: [`scripts/convert_media.js`](../scripts/convert_media.js).

### Requisitos no Sistema:
O script seleciona automaticamente o conversor disponível na máquina (prioridade inteligente):
1. **sharp** (se instalado no Node.js).
2. **cwebp** (Google WebP CLI).
3. **ffmpeg** (utilitário universal de mídia, essencial para vídeos e áudios).

Para instalar ferramentas no Windows:
```powershell
# Instalar ffmpeg via winget:
winget install Gyan.FFmpeg
```

### Comandos de Uso:

#### 1. Simulação sem alterar nada (`--dry-run`):
Verifique quais arquivos serão convertidos e quais serão preservados:
```bash
node scripts/convert_media.js "caminho/para/pasta_assets" --dry-run
```

#### 2. Conversão Real (Imagens para `.webp` a 95%, Vídeos para `.webm` CRF 16 e Áudios para `.ogg`):
```bash
node scripts/convert_media.js "caminho/para/pasta_assets"
```

#### 3. Conversão com Remoção Automática dos Arquivos Antigos:
```bash
node scripts/convert_media.js "caminho/para/pasta_assets" --delete-original
```

---

## 📋 Resumo Rápido de Decisão

| Tipo de Arquivo Original | Ação Recomendada | Formato Final | Qualidade / Configuração |
| :--- | :--- | :---: | :---: |
| `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp` | **Converter** | **`.webp`** | Qualidade 95% (`quality: 95`) |
| `.svg` | **MANTER INTACTO** | **`.svg`** | Vetorial nativo sem alteração |
| `.mp4`, `.mov`, `.mkv`, `.avi` | **Converter** | **`.webm`** | Codec VP9, CRF 16 (~95%), Opus |
| `.mp3`, `.wav`, `.m4a`, `.flac`, `.aac` | **Converter** | **`.ogg`** | Vorbis / Opus a 192k (qualidade 95% sem gap de loop) |
