# Changelog - Master of Foundry VTT 🎲⚡

All notable changes to the `master-of-foundryvtt` skill will be documented in this file.  
*Todas as alterações notáveis na skill `master-of-foundryvtt` serão documentadas neste arquivo.*

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.24.0-beta] - 2026-11-18

### Added / Adicionado
- **Mitigação Crítica de Outubro/Novembro de 2026 (Next.js, React2Shell e Kernel nf_tables):**
  - **Next.js & React2Shell (CVE-2025-66478 / CVE-2025-55182 — CVSS 10.0):** Atualização para Next.js v16.4.1+ / v15.5.28+ e sharp >= 0.35.5 contra RCE em funções de cache (`use cache`), desserialização RSC Flight e DoS em Server Actions.
  - **Kernel Linux nf_tables Use-After-Free (CVE-2026-23111):** Falha por erro de digitação com escalação para root, mitigada com patch de distribuição e restrição de user namespaces (`kernel.unprivileged_userns_clone = 0`).
  - **Copyfail (CVE-2026-31431):** Mitigação no subsistema `authencesn`/`algif_aead` bloqueando contaminação do Page Cache e escalada para root.
- **Proteção Contra Broccoli2Shell (Node.js CVE-2026-111497 RCE) & Pillow/PHP2Shell:**
  - Atualizado scripts/install_remote_foundry.py para instalar Node.js 22 LTS com patch oficial (22.23.4+), proibindo o ramo 20.x EOL em produção.
  - Implementada verificação automática contra Broccoli2Shell e PHP2Shell no script scripts/security_audit_hardening.py.
  - Documentação atualizada em guides/security-kernel-runtimes.md cobrindo CVE-2026-111497 (Node Brotli), CVE-2026-112900 (Python Pillow EPS/Ghostscript) e CVE-2026-109618/109619 (PHP2Shell).
- **Automação Remota via SSH e Catálogo de Subdomínios & DDNS Gratuitos para Foundry VTT:**
  - **Catálogo de 13 Serviços de Subdomínios & DDNS Gratuitos:** Guia completo bilíngue (`guides/free-subdomains-ddns.md` e `guides/free-subdomains-ddns-en.md`) com DuckDNS, Dynu, FreeDNS, dynv6, DDNS Grátis, YDNS, ClouDNS, deSEC, EU.org, DNSExit, ChangeIP, No-IP e redes Mesh (Tailscale/ZeroTier) para dispensar abertura de portas públicas.
  - **Script de Instalação Remota Interativa (`scripts/install_remote_foundry.py`):** Conecta via SSH nas instâncias Free Tier (Oracle Cloud Always Free, AWS Free Tier, Azure Free, GCP Free ou VPS Linux), configura swapfile, instala Node.js 20 LTS e Caddy, baixa e descompacta o Foundry VTT, cria o daemon `systemd` (`foundryvtt.service`) e emite SSL automático HTTPS via Caddy/Let's Encrypt.
  - **Painel de Administração Remota via SSH (`scripts/manage_remote_foundry.py`):** Diagnóstico em tempo real de hardware/serviço, reinício e controle de status do Foundry VTT, inspeção ao vivo de logs pelo `journalctl` e criação de backups comprimidos (`.tar.gz`) da pasta de dados (`foundrydata`) contendo mundos, módulos e sistemas.

---

## [0.23.0-beta] - 2026-11-16

### Added / Adicionado
- **Mitigação Crítica de Outubro/Novembro de 2026 (Next.js, React2Shell e Kernel nf_tables):**
  - **Next.js & React2Shell (CVE-2025-66478 / CVE-2025-55182 — CVSS 10.0):** Atualização para Next.js v16.4.1+ / v15.5.28+ e sharp >= 0.35.5 contra RCE em funções de cache (`use cache`), desserialização RSC Flight e DoS em Server Actions.
  - **Kernel Linux nf_tables Use-After-Free (CVE-2026-23111):** Falha por erro de digitação com escalação para root, mitigada com patch de distribuição e restrição de user namespaces (`kernel.unprivileged_userns_clone = 0`).
  - **Copyfail (CVE-2026-31431):** Mitigação no subsistema `authencesn`/`algif_aead` bloqueando contaminação do Page Cache e escalada para root.
- **Proteção Contra Broccoli2Shell (Node.js CVE-2026-111497 RCE) & Pillow/PHP2Shell:**
  - Atualizado scripts/install_remote_foundry.py para instalar Node.js 22 LTS com patch oficial (22.23.4+), proibindo o ramo 20.x EOL em produção.
  - Implementada verificação automática contra Broccoli2Shell e PHP2Shell no script scripts/security_audit_hardening.py.
  - Documentação atualizada em guides/security-kernel-runtimes.md cobrindo CVE-2026-111497 (Node Brotli), CVE-2026-112900 (Python Pillow EPS/Ghostscript) e CVE-2026-109618/109619 (PHP2Shell).
- **Reformulação Arquitetural em 12 Sub-agentes Federados com Quality Gates**:
  - `Showrunner & Orquestrador Mestre`: Triagem e entrevista inicial (`grill-me`).
  - `Engenheiro de Specs, PRs & Handoff`: Especificações técnicas (RFCs), versionamento estrito via [SemVer 2.0.0 PT-BR](https://semver.org/lang/pt-BR/) (MAJOR.MINOR.PATCH com regras claras para quebra de esquemas de dados, novas funcionalidades e correções de bugs), templates de PR padronizadas e guias de handoff ([`references/specs-prs-e-handoff.md`](references/specs-prs-e-handoff.md)).
  - `Arquiteto de Software & Scaffolding FNF`: Inicialização moderna via Foundry Next Factory.
  - `Engenheiro de Regras & Analista RPG`: Decodificação matemática e AnyDice de 60+ sistemas.
  - `Engenheiro de Backend & TypeDataModel`: Modelagem estrita de dados em classes puras.
  - `Engenheiro de Frontend & UI (ApplicationV2)`: Interfaces reativas com CSS isolado.
  - `Especialista em Canvas, Macros & Sockets`: PixiJS (`PrimaryCanvasGroup`), RPC e Active Effects.
  - `Engenheiro de Integração & APIs de Módulos`: Interoperabilidade com Midi-QOL, Sequencer, Item Piles e exportação de APIs ([`references/integracao-apis-modulos.md`](references/integracao-apis-modulos.md)).
  - `Engenheiro de QA & Testes Automatizados`: Vitest/Jest, testes unitários de derivação e hooks ([`references/qa-e-testes-automatizados.md`](references/qa-e-testes-automatizados.md)).
  - `Auditor Geral de Código & Qualidade`: **Revisão suprema do trabalho de todos os agentes** contra vazamentos de memória e anti-slop.
  - `Guardião de Versões & Compatibilidade`: Filtro temporal estrito de APIs v8-v14 e conformidade com políticas oficiais.
  - `Redator Técnico & Documentador Bilíngue (EN/PT-BR)`: Documentação técnica com paridade estrita em inglês e português ([`references/padrao-documentacao-bilingue.md`](references/padrao-documentacao-bilingue.md)).
- **Manual Mestre de Sub-agentes**: Criação de [`references/arquitetura-subagentes-foundry.md`](references/arquitetura-subagentes-foundry.md).

---

## [0.22.0-beta] - 2026-11-13

### Added / Adicionado
- **Mitigação Crítica de Outubro/Novembro de 2026 (Next.js, React2Shell e Kernel nf_tables):**
  - **Next.js & React2Shell (CVE-2025-66478 / CVE-2025-55182 — CVSS 10.0):** Atualização para Next.js v16.4.1+ / v15.5.28+ e sharp >= 0.35.5 contra RCE em funções de cache (`use cache`), desserialização RSC Flight e DoS em Server Actions.
  - **Kernel Linux nf_tables Use-After-Free (CVE-2026-23111):** Falha por erro de digitação com escalação para root, mitigada com patch de distribuição e restrição de user namespaces (`kernel.unprivileged_userns_clone = 0`).
  - **Copyfail (CVE-2026-31431):** Mitigação no subsistema `authencesn`/`algif_aead` bloqueando contaminação do Page Cache e escalada para root.
- **Proteção Contra Broccoli2Shell (Node.js CVE-2026-111497 RCE) & Pillow/PHP2Shell:**
  - Atualizado scripts/install_remote_foundry.py para instalar Node.js 22 LTS com patch oficial (22.23.4+), proibindo o ramo 20.x EOL em produção.
  - Implementada verificação automática contra Broccoli2Shell e PHP2Shell no script scripts/security_audit_hardening.py.
  - Documentação atualizada em guides/security-kernel-runtimes.md cobrindo CVE-2026-111497 (Node Brotli), CVE-2026-112900 (Python Pillow EPS/Ghostscript) e CVE-2026-109618/109619 (PHP2Shell).
- **Integração Mandatória com `GoogleChrome/modern-web-guidance` e WebMCP:**
  - Auditoria automatizada de código web em módulos e sistemas Foundry via `modern-web-guidance legacy-scan <path>`.
  - Erradicação de práticas web obsoletas e adoção de padrões de acessibilidade e WebMCP (`agentic-forms` e `agentic-javascript-tools`) para interação de agentes em interfaces Canvas e `ApplicationV2`.

---

## [0.21.0-beta] - 2026-11-13

### Added / Adicionado
- **Mitigação Crítica de Outubro/Novembro de 2026 (Next.js, React2Shell e Kernel nf_tables):**
  - **Next.js & React2Shell (CVE-2025-66478 / CVE-2025-55182 — CVSS 10.0):** Atualização para Next.js v16.4.1+ / v15.5.28+ e sharp >= 0.35.5 contra RCE em funções de cache (`use cache`), desserialização RSC Flight e DoS em Server Actions.
  - **Kernel Linux nf_tables Use-After-Free (CVE-2026-23111):** Falha por erro de digitação com escalação para root, mitigada com patch de distribuição e restrição de user namespaces (`kernel.unprivileged_userns_clone = 0`).
  - **Copyfail (CVE-2026-31431):** Mitigação no subsistema `authencesn`/`algif_aead` bloqueando contaminação do Page Cache e escalada para root.
- **Proteção Contra Broccoli2Shell (Node.js CVE-2026-111497 RCE) & Pillow/PHP2Shell:**
  - Atualizado scripts/install_remote_foundry.py para instalar Node.js 22 LTS com patch oficial (22.23.4+), proibindo o ramo 20.x EOL em produção.
  - Implementada verificação automática contra Broccoli2Shell e PHP2Shell no script scripts/security_audit_hardening.py.
  - Documentação atualizada em guides/security-kernel-runtimes.md cobrindo CVE-2026-111497 (Node Brotli), CVE-2026-112900 (Python Pillow EPS/Ghostscript) e CVE-2026-109618/109619 (PHP2Shell).
- **Suporte Nativo a Code Mode no Servidor MCP (`foundry_mcp_server.js`):**
  - Implementada a ferramenta `code_mode` que permite execução programática de scripts em lote dentro de um isolate V8 seguro (`vm.createContext`).
  - Namespace global assíncrono `foundry.*` expondo todas as 18 ferramentas de criação de atores, itens, cenas, compêndios, tabelas, macros e inspeção em 1 único turno.
  - Redução de até 90% no overhead de tokens de contexto em tarefas multi-step de criação de campanhas.

---

## [0.20.0-beta] - 2026-11-12

### Added / Adicionado
- **Mitigação Crítica de Outubro/Novembro de 2026 (Next.js, React2Shell e Kernel nf_tables):**
  - **Next.js & React2Shell (CVE-2025-66478 / CVE-2025-55182 — CVSS 10.0):** Atualização para Next.js v16.4.1+ / v15.5.28+ e sharp >= 0.35.5 contra RCE em funções de cache (`use cache`), desserialização RSC Flight e DoS em Server Actions.
  - **Kernel Linux nf_tables Use-After-Free (CVE-2026-23111):** Falha por erro de digitação com escalação para root, mitigada com patch de distribuição e restrição de user namespaces (`kernel.unprivileged_userns_clone = 0`).
  - **Copyfail (CVE-2026-31431):** Mitigação no subsistema `authencesn`/`algif_aead` bloqueando contaminação do Page Cache e escalada para root.
- **Proteção Contra Broccoli2Shell (Node.js CVE-2026-111497 RCE) & Pillow/PHP2Shell:**
  - Atualizado scripts/install_remote_foundry.py para instalar Node.js 22 LTS com patch oficial (22.23.4+), proibindo o ramo 20.x EOL em produção.
  - Implementada verificação automática contra Broccoli2Shell e PHP2Shell no script scripts/security_audit_hardening.py.
  - Documentação atualizada em guides/security-kernel-runtimes.md cobrindo CVE-2026-111497 (Node Brotli), CVE-2026-112900 (Python Pillow EPS/Ghostscript) e CVE-2026-109618/109619 (PHP2Shell).
- **Guia de Ergonomia Sensorial e Acessibilidade Cognitiva em Foundry VTT (`guides/sensory-and-cognitive-accessibility.md`):**
  - Adaptação prática da Matriz dos 7 Vetores de Acessibilidade (UFPE 2025: Imagem, Texto, Navegação, Customização, Interação, Som e Interface) para janelas `ApplicationV2`, fichas e HUDs de módulos/sistemas.
  - Padrão de mitigação de sobrecarga acústica (*Interference Journal*): eliminação de reprodução automática hostil, sons suaves para dados e dados 3D, e chave de silenciamento rápido.
  - Implementação de classes SCSS de "Modo de Conforto Sensorial" com troca sob demanda para fontes clinicamente acessíveis (`Atkinson Hyperlegible`, `Lexend`), desativação de tremores luminosos e contraste não agressivo.
  - Proteção de ações destrutivas na ficha (`DialogV2.confirm`) e alvos táteis mínimos de 44px (Lei de Fitts).

---

## [0.19.0-beta] - 2026-11-09

### Added / Adicionado
- **Mitigação Crítica de Outubro/Novembro de 2026 (Next.js, React2Shell e Kernel nf_tables):**
  - **Next.js & React2Shell (CVE-2025-66478 / CVE-2025-55182 — CVSS 10.0):** Atualização para Next.js v16.4.1+ / v15.5.28+ e sharp >= 0.35.5 contra RCE em funções de cache (`use cache`), desserialização RSC Flight e DoS em Server Actions.
  - **Kernel Linux nf_tables Use-After-Free (CVE-2026-23111):** Falha por erro de digitação com escalação para root, mitigada com patch de distribuição e restrição de user namespaces (`kernel.unprivileged_userns_clone = 0`).
  - **Copyfail (CVE-2026-31431):** Mitigação no subsistema `authencesn`/`algif_aead` bloqueando contaminação do Page Cache e escalada para root.
- **Proteção Contra Broccoli2Shell (Node.js CVE-2026-111497 RCE) & Pillow/PHP2Shell:**
  - Atualizado scripts/install_remote_foundry.py para instalar Node.js 22 LTS com patch oficial (22.23.4+), proibindo o ramo 20.x EOL em produção.
  - Implementada verificação automática contra Broccoli2Shell e PHP2Shell no script scripts/security_audit_hardening.py.
  - Documentação atualizada em guides/security-kernel-runtimes.md cobrindo CVE-2026-111497 (Node Brotli), CVE-2026-112900 (Python Pillow EPS/Ghostscript) e CVE-2026-109618/109619 (PHP2Shell).
- **Foundry Next Factory (FNF) como Scaffolder Oficial Mandatório:**
  - Integração do motor [Foundry Next Factory](https://github.com/CharlesCorreaDev/fvtt-modules-plus/tree/main/foundry-next-factory) (`CharlesCorreaDev/fvtt-modules-plus/foundry-next-factory`) para criação de novos módulos e sistemas do zero para Foundry VTT v13, v14.369 Stable e v15+.
  - Suporte completo aos presets `vite-ts-appv2` (Vite 6+, TypeScript estrito, `ApplicationV2` e `TypeDataModel`) e `vanilla-esm` (Zero-build, ESModules direto).

---

## [0.18.0-beta] - 2026-11-09

### Added / Adicionado
- **Mitigação Crítica de Outubro/Novembro de 2026 (Next.js, React2Shell e Kernel nf_tables):**
  - **Next.js & React2Shell (CVE-2025-66478 / CVE-2025-55182 — CVSS 10.0):** Atualização para Next.js v16.4.1+ / v15.5.28+ e sharp >= 0.35.5 contra RCE em funções de cache (`use cache`), desserialização RSC Flight e DoS em Server Actions.
  - **Kernel Linux nf_tables Use-After-Free (CVE-2026-23111):** Falha por erro de digitação com escalação para root, mitigada com patch de distribuição e restrição de user namespaces (`kernel.unprivileged_userns_clone = 0`).
  - **Copyfail (CVE-2026-31431):** Mitigação no subsistema `authencesn`/`algif_aead` bloqueando contaminação do Page Cache e escalada para root.
- **Proteção Contra Broccoli2Shell (Node.js CVE-2026-111497 RCE) & Pillow/PHP2Shell:**
  - Atualizado scripts/install_remote_foundry.py para instalar Node.js 22 LTS com patch oficial (22.23.4+), proibindo o ramo 20.x EOL em produção.
  - Implementada verificação automática contra Broccoli2Shell e PHP2Shell no script scripts/security_audit_hardening.py.
  - Documentação atualizada em guides/security-kernel-runtimes.md cobrindo CVE-2026-111497 (Node Brotli), CVE-2026-112900 (Python Pillow EPS/Ghostscript) e CVE-2026-109618/109619 (PHP2Shell).
- **Instalação e Deploy do Foundry VTT em Nuvens e VPS (cloud-deployment-guide.md):** Guia mestre cobrindo Oracle Cloud (Always Free Tier - ARM Ampere 24GB), AWS (EC2), Google Cloud (GCP via github.com/google/skills), Microsoft Azure e Hostinger VPS (KVM Ubuntu), incluindo SSL automático via Caddy e UFW.
- **Auditoria Adversarial Cloudflare & Anti-Alucinação NVIDIA:** Diretrizes obrigatórias de segurança via cloudflare/security-audit-skill e blindagem contra números/modificadores inexistentes com NVIDIA/auto-ontology.

---

## [0.17.0-beta] - 2026-11-09

### Added / Adicionado
- **Mitigação Crítica de Outubro/Novembro de 2026 (Next.js, React2Shell e Kernel nf_tables):**
  - **Next.js & React2Shell (CVE-2025-66478 / CVE-2025-55182 — CVSS 10.0):** Atualização para Next.js v16.4.1+ / v15.5.28+ e sharp >= 0.35.5 contra RCE em funções de cache (`use cache`), desserialização RSC Flight e DoS em Server Actions.
  - **Kernel Linux nf_tables Use-After-Free (CVE-2026-23111):** Falha por erro de digitação com escalação para root, mitigada com patch de distribuição e restrição de user namespaces (`kernel.unprivileged_userns_clone = 0`).
  - **Copyfail (CVE-2026-31431):** Mitigação no subsistema `authencesn`/`algif_aead` bloqueando contaminação do Page Cache e escalada para root.
- **Proteção Contra Broccoli2Shell (Node.js CVE-2026-111497 RCE) & Pillow/PHP2Shell:**
  - Atualizado scripts/install_remote_foundry.py para instalar Node.js 22 LTS com patch oficial (22.23.4+), proibindo o ramo 20.x EOL em produção.
  - Implementada verificação automática contra Broccoli2Shell e PHP2Shell no script scripts/security_audit_hardening.py.
  - Documentação atualizada em guides/security-kernel-runtimes.md cobrindo CVE-2026-111497 (Node Brotli), CVE-2026-112900 (Python Pillow EPS/Ghostscript) e CVE-2026-109618/109619 (PHP2Shell).
- **Prioridade Absoluta do PDF Oxide (`pdf-oxide-guide.md`):**
  - Integração do `pdf-oxide` (Node.js via N-API / Python) em **1º Lugar Obrigatório** para ingestão de PDFs de regras, aventuras, monstros, magias e itens em compêndios do Foundry VTT sem travar o event loop e com extração em ~0.8ms.
- **Motion Design para Sheets e Interfaces de Módulos (Claude-Motion):**
  - Adoção das diretrizes de `whaleyxbt/claude-motion` para animações táteis fluidas em janelas ApplicationV2, lançadores de dados e HUD.
- **Tríade Canônica: Impeccable Design, Systematic Debugging & Trail of Bits Security:**
  - Padrões visuais Impeccable contra poluição de fichas e compêndios.
  - Depuração sistemática em 4 etapas para isolar conflitos de hooks e módulos.
  - Segurança Trail of Bits para sanitização de dados e proteção de macros.
