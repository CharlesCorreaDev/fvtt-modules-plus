# Catálogo e Guia de Subdomínios e DDNS Gratuitos para Foundry VTT

[English](free-subdomains-ddns-en.md) · [Voltar aos Guias](../README.md)

Este documento reúne os 13 principais serviços de **subdomínios gratuitos, DNS dinâmico (DDNS) e redes Mesh** recomendados para hospedar o **Foundry Virtual Tabletop (Foundry VTT)** em instâncias de nuvem gratuita (Oracle Cloud Always Free, AWS Free Tier, Azure Free, GCP Free) ou em servidores locais/residenciais.

---

## 🏆 Tabela Comparativa de Serviços

| Serviço | Domínio / Extensões | Limite Grátis | Renovação | API / Automação | Destaque |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DuckDNS** | `.duckdns.org` | 5 subdomínios | Permanente | `curl` / Token URL | Mais simples e direto com Certbot Let's Encrypt / Caddy |
| **Dynu** | `.ddns.free.nf` e dezenas de outras | Múltiplos | Permanente | API REST / Client Linux | Estabilidade, sem expiração manual |
| **FreeDNS (Afraid.org)** | Milhares da comunidade | Até 5 subdomínios | Permanente | Script / Wget / Curl | Variedade enorme de extensões |
| **dynv6** | `.dynv6.net`, `.v6.rocks`, etc. | Ilimitado | Permanente | API REST, TSIG, DNSSEC | Suporte IPv4 + IPv6 moderno |
| **DDNS Grátis** | `.ddnsgratis.com.br`, `.meudvr.space` | Múltiplos | Permanente | Cliente Linux/Windows | Serviço brasileiro, baixa latência |
| **YDNS** | `.ydns.io` | Ilimitado | Permanente | API Aberta, DNSSEC | Minimalista e focado em privacidade |
| **ClouDNS** | `.cloudns.net` e compartilhados | 1 zona / 4 registros | Permanente | API Completa | DNS gerenciado com Anycast |
| **deSEC** | `.dedyn.io` | 2 subdomínios | Permanente | API REST / DNSSEC nativo | Sem fins lucrativos, alta segurança |
| **EU.org** | `.eu.org` | Múltiplos | Permanente | Delegação completa NS | Permite usar Cloudflare como DNS com SSL |
| **DNSExit** | `.dnsexit.com` | Vários | Permanente | API / Clientes | Tradicional, redirecionamento de URL |
| **ChangeIP** | Várias extensões | 1 a 7 hosts | Permanente | Scripts de roteador | Tradicional e compatível com roteadores |
| **No-IP** | `.ddns.net`, `.zapto.org`, etc. | 3 subdomínios | Renovar a cada 30 dias | DUC Client / Script | Pioneiro (requer clique mensal) |
| **Tailscale / ZeroTier** | Nomes MagicDNS / Mesh IP | Grátis até 100/25 nós | Permanente | CLI Nativa | Não precisa abrir portas ou IP público |

---

## 1. Detalhamento dos Provedores e Scripts de Atualização

### 1.1. DuckDNS (duckdns.org)
- **Como funciona:** Login rápido via GitHub/Google, escolha do subdomínio (ex: `minhamesa-foundry.duckdns.org`) e geração de token único.
- **Script Cron de atualização de IP no Linux:**
  ```bash
  echo '*/5 * * * * curl -s "https://www.duckdns.org/update?domains=minhamesa-foundry&token=SEU_TOKEN_AQUI&ip=" >/dev/null 2>&1' | crontab -
  ```
- **Ideal para:** Caddy ou Nginx com emissão instantânea de certificado SSL HTTPS (obrigatório para áudio e vídeo WebRTC no Foundry VTT).

---

### 1.2. Dynu (dynu.com)
- **Vantagens:** Altíssima estabilidade, sem necessidade de revalidação manual a cada 30 dias.
- **Atualização via curl (API):**
  ```bash
  curl -s "https://api.dynu.com/nic/update?hostname=minhamesa.ddns.free.nf&myip=&username=SEU_USUARIO&password=SUA_SENHA_MD5"
  ```

---

### 1.3. FreeDNS - Afraid.org (freedns.afraid.org)
- **Vantagens:** Ativo desde 2001, conta com dezenas de milhares de domínios comunitários compartilhados.
- **Atualização via cron:** O painel disponibiliza uma URL de sincronização direta:
  ```bash
  curl -s "https://sync.afraid.org/u/SUA_HASH_UNICA/"
  ```

---

### 1.4. dynv6 (dynv6.com)
- **Vantagens:** Plataforma alemã moderna com suporte nativo a IPv6 e IPv4, DNSSEC e sem limites de hosts para uso pessoal.
- **Atualização via API:**
  ```bash
  curl -s "https://dynv6.com/api/update?zone=minhamesa.dynv6.net&token=SEU_TOKEN_AQUI&ipv4=auto"
  ```

---

### 1.5. DDNS Grátis (ddnsgratis.com.br)
- **Vantagens:** Provedor nacional voltado para o público do Brasil. Servidores locais com resolução ultra rápida de DNS.
- **Extensões disponíveis:** `.ddnsgratis.com.br`, `.acessoremoto.space`, `.meudvr.space`, `.ipfixo.top`.

---

### 1.6. YDNS (ydns.io)
- **Vantagens:** Minimalista, seguro, open standards, sem rastreadores. Suporte nativo a DNSSEC.
- **Atualização via HTTP Basic Auth:**
  ```bash
  curl --user "seu-email@dominio.com:SUA_SENHA_API" "https://ydns.io/api/v1/update/?host=minhamesa.ydns.io"
  ```

---

### 1.7. ClouDNS (cloudns.net)
- **Vantagens:** Plataforma Anycast DNS com 1 zona gratuita, monitoramento e atualização de DDNS via requisição HTTP simples.

---

### 1.8. deSEC (desec.io)
- **Vantagens:** Associação alemã sem fins lucrativos focada em segurança máxima. Suporte a certificados Let's Encrypt com validação via `DNS-01` hook automatizado.
- **Extensão:** `.dedyn.io`.
- **Atualização:**
  ```bash
  curl -s "https://update.dedyn.io/?username=minhamesa.dedyn.io&password=SEU_TOKEN"
  ```

---

### 1.9. EU.org (nic.eu.org)
- **Vantagens:** Oferece subdomínios permanentes `.eu.org` e permite **delegação total de Nameservers (NS)** para a **Cloudflare**, usufruindo de proteção contra DDoS, proxy reverso e SSL gratuitos.

---

### 1.10. DNSExit (dnsexit.com) & ChangeIP (changeip.com)
- **Vantagens:** Serviços pioneiros de DNS dinâmico e redirecionamento de IP para servidores Linux e roteadores.

---

### 1.11. No-IP (noip.com)
- **Vantagens:** Tradicional e muito documentado.
- **Ponto de atenção:** Exige renovação manual clicando no link do e-mail a cada 30 dias no plano gratuito.

---

### 1.12. Alternativa Sem Port Forwarding: Tailscale & ZeroTier (Redes Mesh)
Para quem não pode ou não quer expor portas públicas na internet:
1. Instale o **Tailscale** no servidor Foundry e nas máquinas dos jogadores (`curl -fsSL https://tailscale.com/install.sh | sh`).
2. Acesse pelo MagicDNS interno ou IP da VPN (`https://foundry-vtt.tailnet.ts.net:30000`).
3. Criptografia WireGuard ponta a ponta sem necessidade de IP público.

---

## 2. Como Usar no Foundry VTT (Caddy / Nginx)

No arquivo de configuração do seu proxy reverso (ex: `/etc/caddy/Caddyfile`):
```caddy
minhamesa.duckdns.org {
    reverse_proxy 127.0.0.1:30000
}
```
O Caddy emite e renova os certificados SSL automaticamente. No Foundry VTT, configure em `Config/options.json`:
```json
{
  "port": 30000,
  "upnp": false,
  "fullscreen": false,
  "hostname": "minhamesa.duckdns.org",
  "routePrefix": null,
  "sslCert": null,
  "sslKey": null,
  "proxySSL": true,
  "proxyPort": 443
}
```
