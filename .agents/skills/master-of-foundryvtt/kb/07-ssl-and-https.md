# Foundry VTT Knowledge Base: SSL and HTTPS (Let's Encrypt & Self-Signed)

Enabling SSL (HTTPS) is **mandatory** for using WebRTC audio/video features and the Clipboard API in Foundry VTT, and it is highly recommended for overall security. Starting with Version 14, Foundry VTT natively supports SSL certificate generation.

Here is how you can set up SSL for different hosting environments.

### 🖥️ OS-Specific Configuration Paths
Whether you use Native Let's Encrypt or manual certificates, SSL settings are typically saved in `options.json`. The location of this file depends on your Operating System:
- **Windows:** `%localappdata%\FoundryVTT\Config\options.json`
- **macOS:** `~/Library/Application Support/FoundryVTT/Config/options.json`
- **Linux:** `~/.local/share/FoundryVTT/Config/options.json` (or `/home/ubuntu/foundryuserdata` depending on your VPS setup)

*(Note: The Native V14 SSL UI in the Setup Menu automatically writes to these paths regardless of your OS).* 

## 1. Cloud Hosting with a Registered Domain (Recommended)
This is the most robust setup and the primary use case for **Let's Encrypt**.

### Native V14+ Approach (Let's Encrypt)
Foundry V14 natively supports provisioning Let's Encrypt certificates if the server is accessible externally.
1. Open your `options.json` or Configuration menu within Foundry.
2. Provide your **Hostname / Domain Name** (e.g., `foundry.mydomain.com`).
3. Configure Foundry to request certificates via Let's Encrypt. Foundry will automatically contact Let's Encrypt, answer the HTTP-01 challenge, and bind the certificates.
*(Note: Ensure your router/firewall forwards port 80 to Foundry for the Let's Encrypt validation challenge).*

### Reverse Proxy Approach (Nginx / Caddy / Cloudflare)
If you prefer a Reverse Proxy (useful for running multiple apps or advanced caching):
- **Caddy:** Automatically handles Let's Encrypt provisioning. A single Caddyfile rule is enough: `foundry.mydomain.com { reverse_proxy localhost:30000 }`
- **Nginx:** Use `certbot --nginx` to generate the certificates and automatically configure Nginx.
- **Cloudflare Tunnels:** You can use cloudflare tunnels to handle SSL edge-termination without opening ports.

## 2. Local Hosting or Cloud Hosting with Bare IP Address
Let's Encrypt **does not** issue certificates for `localhost` or bare IP addresses (e.g., `123.45.67.89`). For these scenarios, you have two primary options:

### Option A: Self-Signed Certificates (Native V14+)
Foundry V14 can automatically generate self-signed certificates for local or IP connections.
- **How it works:** Foundry creates local `cert.pem` and `key.pem` files and serves them. You just need to enable SSL in `options.json`.
- **Caveat:** Browsers will show a "Your connection is not private" (NET::ERR_CERT_AUTHORITY_INVALID) warning because the certificate authority isn't recognized globally. Players must click "Advanced -> Proceed to [IP]" to connect.

### Option B: Free Domains & Dynamic DNS (DDNS)
If you are hosting locally (or on a cloud VPS) but want a valid Let's Encrypt certificate to avoid browser warnings without buying a premium domain:
1. Register for a free domain or Dynamic DNS service. Below are popular options:
   - [DuckDNS](https://www.duckdns.org/) (Highly recommended for home hosting)
   - [No-IP](https://www.noip.com/pt-BR)
   - [Desec.io](https://desec.io/)
   - [Winco DDNS](https://ddns.winco.com.br/dns-dinamico-free)
   - [DigitalPlat](https://domain.digitalplat.org/)
   - [DNS.he.net](https://www.dnshe.com/)
   - [isroot.in](https://isroot.in/)
   - [is-a.dev](https://is-a.dev/)
   - [nic.eu.org](https://nic.eu.org/)
   - [nic.ua](https://nic.ua/)
   - [Freenom / Dot.tk](https://www.freenom.com/pt/index.html?lang=pt) *(Availability varies)*
   - [InfinityFree](https://www.infinityfree.com/)
2. Point the registered domain/subdomain to your Public IP address.
3. Configure your router to port-forward ports `80` and `443` (or `30000`) to your host machine.
4. Use the **Native V14+ Let's Encrypt** feature by supplying your free domain name in the configuration. Let's Encrypt treats the DDNS/Free address as a valid domain and issues a globally trusted certificate!

## 3. Partner Hosting Services (The Forge, Molten Hosting, etc.)
If you use a dedicated Foundry hosting partner, you **do not** need to generate SSL certificates yourself. The service provider handles Reverse Proxy and Let's Encrypt provisioning automatically for both default subdomains and custom domains.

---
### 🛠️ Troubleshooting Let's Encrypt / SSL
- **Port 80 Requirement:** The Let's Encrypt HTTP-01 challenge requires port `80` to be open and forwarded to your Foundry server for the initial generation and periodic 90-day renewal.
- **WSS Protocol:** When SSL is enabled, WebSocket connections automatically upgrade from `ws://` to `wss://`. Ensure your proxy (if using one) supports WebSocket upgrades.
- **Cache:** If you recently updated your certificate, players experiencing connection drops may need to hard-refresh (`Ctrl+F5`).
