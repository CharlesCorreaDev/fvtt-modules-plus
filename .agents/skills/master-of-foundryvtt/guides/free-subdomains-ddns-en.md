# Free Subdomains and DDNS Catalog for Foundry VTT

[Português (Brasil)](free-subdomains-ddns.md) · [Back to Guides](../README.md)

This reference documents the top 13 **free subdomain, dynamic DNS (DDNS), and mesh VPN services** recommended for hosting **Foundry Virtual Tabletop (Foundry VTT)** on free cloud instances (Oracle Cloud Always Free, AWS Free Tier, Azure Free, GCP Free) or on-premise home servers.

---

## 🏆 Comparison Matrix

| Service | Domains / Suffixes | Free Limit | Renewal Policy | API / Automation | Highlights |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DuckDNS** | `.duckdns.org` | 5 subdomains | Permanent | `curl` / Token URL | Simplest setup with Caddy or Nginx Certbot SSL |
| **Dynu** | `.ddns.free.nf` + dozens | Multiple | Permanent | REST API / Linux Client | Rock-solid stability, no monthly click needed |
| **FreeDNS (Afraid.org)** | 50,000+ community domains | Up to 5 subdomains | Permanent | Script / Wget / Curl | Huge domain variety |
| **dynv6** | `.dynv6.net`, `.v6.rocks`, etc. | Unlimited | Permanent | REST API, TSIG, DNSSEC | Full IPv4 + IPv6 support |
| **DDNS Grátis** | `.ddnsgratis.com.br`, etc. | Multiple | Permanent | Linux / Windows Client | Brazilian servers, ultra-low latency |
| **YDNS** | `.ydns.io` | Unlimited | Permanent | Clean REST API, DNSSEC | Privacy-first, open standards |
| **ClouDNS** | `.cloudns.net` + shared | 1 zone / 4 records | Permanent | Full REST API | Managed Anycast DNS |
| **deSEC** | `.dedyn.io` | 2 subdomains | Permanent | REST API / DNSSEC | Non-profit German provider, high security |
| **EU.org** | `.eu.org` | Multiple | Permanent | Full NS Delegation | Can be delegated directly to Cloudflare |
| **DNSExit** | `.dnsexit.com` | Several | Permanent | API / Clients | Legacy stability and URL redirection |
| **ChangeIP** | Multiple extensions | 1-7 hosts | Permanent | Router DDNS scripts | Broad router compatibility |
| **No-IP** | `.ddns.net`, `.zapto.org`, etc. | 3 subdomains | Manual 30-day renewal | DUC Client / Scripts | Famous pioneer (requires monthly email click) |
| **Tailscale / ZeroTier** | MagicDNS / Mesh IP | Free up to 100/25 nodes| Permanent | Native CLI | No open ports or public IP required |

---

## 1. Quick Integration with Foundry VTT (Caddy Reverse Proxy)

In `/etc/caddy/Caddyfile`:
```caddy
my-foundry.duckdns.org {
    reverse_proxy 127.0.0.1:30000
}
```

In Foundry VTT `Config/options.json`:
```json
{
  "port": 30000,
  "upnp": false,
  "fullscreen": false,
  "hostname": "my-foundry.duckdns.org",
  "routePrefix": null,
  "sslCert": null,
  "sslKey": null,
  "proxySSL": true,
  "proxyPort": 443
}
```
