# Changelog - Master of Foundry VTT 🎲⚡

All notable changes to the `master-of-foundryvtt` skill will be documented in this file.  
*Todas as alterações notáveis na skill `master-of-foundryvtt` serão documentadas neste arquivo.*

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.20.0-beta] - 2026-11-12

### Added / Adicionado
- **Guia de Ergonomia Sensorial e Acessibilidade Cognitiva em Foundry VTT (`guides/sensory-and-cognitive-accessibility.md`):**
  - Adaptação prática da Matriz dos 7 Vetores de Acessibilidade (UFPE 2025: Imagem, Texto, Navegação, Customização, Interação, Som e Interface) para janelas `ApplicationV2`, fichas e HUDs de módulos/sistemas.
  - Padrão de mitigação de sobrecarga acústica (*Interference Journal*): eliminação de reprodução automática hostil, sons suaves para dados e dados 3D, e chave de silenciamento rápido.
  - Implementação de classes SCSS de "Modo de Conforto Sensorial" com troca sob demanda para fontes clinicamente acessíveis (`Atkinson Hyperlegible`, `Lexend`), desativação de tremores luminosos e contraste não agressivo.
  - Proteção de ações destrutivas na ficha (`DialogV2.confirm`) e alvos táteis mínimos de 44px (Lei de Fitts).

---

## [0.19.0-beta] - 2026-11-09

### Added / Adicionado
- **Foundry Next Factory (FNF) como Scaffolder Oficial Mandatório:**
  - Integração do motor [Foundry Next Factory](https://github.com/CharlesCorreaDev/fvtt-modules-plus/tree/main/foundry-next-factory) (`CharlesCorreaDev/fvtt-modules-plus/foundry-next-factory`) para criação de novos módulos e sistemas do zero para Foundry VTT v13, v14.369 Stable e v15+.
  - Suporte completo aos presets `vite-ts-appv2` (Vite 6+, TypeScript estrito, `ApplicationV2` e `TypeDataModel`) e `vanilla-esm` (Zero-build, ESModules direto).

---

## [0.18.0-beta] - 2026-11-09

### Added / Adicionado
- **Instalação e Deploy do Foundry VTT em Nuvens e VPS (cloud-deployment-guide.md):** Guia mestre cobrindo Oracle Cloud (Always Free Tier - ARM Ampere 24GB), AWS (EC2), Google Cloud (GCP via github.com/google/skills), Microsoft Azure e Hostinger VPS (KVM Ubuntu), incluindo SSL automático via Caddy e UFW.
- **Auditoria Adversarial Cloudflare & Anti-Alucinação NVIDIA:** Diretrizes obrigatórias de segurança via cloudflare/security-audit-skill e blindagem contra números/modificadores inexistentes com NVIDIA/auto-ontology.

---

## [0.17.0-beta] - 2026-11-09

### Added / Adicionado
- **Prioridade Absoluta do PDF Oxide (`pdf-oxide-guide.md`):**
  - Integração do `pdf-oxide` (Node.js via N-API / Python) em **1º Lugar Obrigatório** para ingestão de PDFs de regras, aventuras, monstros, magias e itens em compêndios do Foundry VTT sem travar o event loop e com extração em ~0.8ms.
- **Motion Design para Sheets e Interfaces de Módulos (Claude-Motion):**
  - Adoção das diretrizes de `whaleyxbt/claude-motion` para animações táteis fluidas em janelas ApplicationV2, lançadores de dados e HUD.
- **Tríade Canônica: Impeccable Design, Systematic Debugging & Trail of Bits Security:**
  - Padrões visuais Impeccable contra poluição de fichas e compêndios.
  - Depuração sistemática em 4 etapas para isolar conflitos de hooks e módulos.
  - Segurança Trail of Bits para sanitização de dados e proteção de macros.
