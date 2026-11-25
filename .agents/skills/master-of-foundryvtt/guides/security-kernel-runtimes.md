# Diretriz de Segurança e Mitigação de Vulnerabilidades Críticas de Kernel e Runtimes

[English](security-kernel-runtimes-en.md) · [Voltar aos Guias](../README.md)

Este documento estabelece o protocolo de segurança, auditoria contínua e mitigação de vulnerabilidades críticas de **Kernel Linux** e runtimes (**Next.js, React, Node.js, Python, PHP, Redis**) para servidores de Foundry VTT na nuvem (Oracle Cloud, AWS, Azure, GCP e VPS).

---

## 1. Vulnerabilidades Críticas de Kernel Linux (Auditoria & Correção)

As instâncias de nuvem hospedando servidores de RPG com WebSockets e portas abertas para a internet devem ser imunizadas contra as seguintes vulnerabilidades conhecidas:

### 1.1. NoisyTCP (CVE-2026-99288)
- **Gravidade:** Crítica (CVSS 9.8).
- **Vetor:** Falha na pilha TCP do kernel que permite ataques remotos DoS esgotando sockets TCP.
- **Mitigação:** Atualização do kernel Linux e ativação de `net.ipv4.tcp_syncookies = 1`.

### 1.2. Vghost (CVE-2026-74580)
- **Gravidade:** Crítica (CVSS 9.3).
- **Vetor:** Falha no componente `vhost` em kernels entre 4.11 e 7.2 com escalação para `root` ou VM escape.
- **Mitigação:** Atualização do kernel e reinicialização ou blacklist do módulo `vhost_net`.

### 1.3. Erro de Digitação Use-After-Free no Firewall nf_tables (CVE-2026-23111)
- **Gravidade:** Alta (CVSS 7.8).
- **Vetor:** Erro do tipo *use-after-free* no subsistema de firewall `nf_tables` do kernel Linux, causado por um erro de digitação (ponto de exclamação `!` incorreto no código-fonte), permitindo root escalação.
- **Mitigação:** Atualização do kernel e restrição de user namespaces: `kernel.unprivileged_userns_clone = 0`.

### 1.4. Fragnesia (CVE-2026-46300)
- **Gravidade:** Alta (CVSS 7.8).
- **Vetor:** Falha no subsistema XFRM ESP-in-TCP com corrupção de Page Cache e root privilege escalation.
- **Mitigação:** Atualização do kernel e desativação de XFRM não utilizado (`net.ipv4.conf.all.disable_xfrm = 1`).

### 1.5. Copyfail (CVE-2026-31431)
- **Gravidade:** Alta (CVSS 7.8).
- **Vetor:** Falha criptográfica `authencesn` / `algif_aead` gravando dados forjados no Page Cache para root e container escape.
- **Mitigação:** Bloqueio do módulo criptográfico `af_alg` e atualização do kernel.

### 1.6. DirtyClone & Pedit COW
- **Gravidade:** Alta.
- **Vetor:** Corrupção de memória virtual e modificação de binários na RAM via Copy-On-Write.
- **Mitigação:** Proteção com `kernel.yama.ptrace_scope = 2`, `fs.protected_symlinks = 1` e restrição de ponteiros.

---

## 2. Hardening e Atualização de Runtimes & Frameworks Web

### 2.1. Next.js & React2Shell (CVE-2025-66478 / CVE-2025-55182 — CVSS 10.0 RCE Máxima)
- **O que acontece:** Desserialização insegura no protocolo React Server Components (RSC Flight), permitindo RCE sem autenticação em versões vulneráveis do App Router.
- **Novas Falhas no Next.js:**
  - RCE em Funções do Cache (`use cache`) retornando múltiplos arrays tipados.
  - RCE na Otimização de Imagens (SVG) via biblioteca `sharp`.
  - DoS com Server Actions consumindo 100% de CPU.
- **Correção Mandatória:**
  - **Next.js v16:** Atualizar para **`v16.4.1` ou superior**.
  - **Next.js v15:** Atualizar para **`v15.5.28` ou superior**.
  - **Biblioteca sharp:** Atualizar para **`0.35.5` ou superior**.

---

### 2.2. Node.js & Broccoli2Shell (CVE-2026-111497 — CVSS 9.8 RCE)
- **O que acontece:** Falha crítica de escrita fora dos limites (*out-of-bounds write*) no decodificador Brotli integrado ao Node.js.
- **Correção:** Atualizar imediatamente para **`22.23.4+`** ou **`24.22.1+`**. Node.js 20.x atingiu EOL sem patch e é proibido em produção.

---

### 2.3. Python & Brechas na Pillow (CVE-2026-112900 — CVSS 9.2 RCE)
- **O que acontece:** RCE em processamento de imagens EPS/Ghostscript sem sanitização.
- **Correção:** Atualizar Pillow para `>= 13.0.0` e desinstalar Ghostscript se desnecessário (`sudo apt purge -y ghostscript`).

---

### 2.4. PHP & Epidemia PHP2Shell (CVE-2026-109618 / 109619 / 115560)
- **O que acontece:** RCE crítico sem autenticação em PHP anterior a 8.5.12, 8.4.27, 8.3.36 e 8.2.35.
- **Correção:** Atualizar PHP e aplicar `session.upload_progress.enabled = 0` no `php.ini`.

---

### 2.5. Hardening do Servidor Foundry VTT (Node.js & Caddy/Nginx)
1. Executar o Foundry VTT exclusivamente sob o usuário de sistema isolado `foundry` sem privilégios de `sudo`.
2. Acesso público estritamente via Caddy ou Nginx com HTTPS / WSS terminados, sem expor a porta interna 30000.
