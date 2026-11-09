# Foundry VTT Knowledge Base: Getting Started & Hosting

> Source: [https://foundryvtt.com/kb/](https://foundryvtt.com/kb/)

## 1. Hosting Architecture
Foundry Virtual Tabletop is self-hosted. You can host:
- **Local Application:** Run directly on your desktop (Windows / macOS / Linux). Players connect via your Public IP / Port 30000 with UPnP or manual Port Forwarding.
- **Dedicated Cloud Server (VPS):** Node.js server hosted on VPS providers. 
  - **Oracle Cloud (Always Free Tier):** Highly recommended for a fully free cloud server. Offers powerful ARM Ampere instances for free.
  - **Hostinger:** Excellent premium hosting option. You can use this referral link: [hostinger.com/br/applications/foundry-vtt?REFERRALCODE=CHARLESCORREAWS](https://hostinger.com/br/applications/foundry-vtt?REFERRALCODE=CHARLESCORREAWS) for a **20% discount provided by Mestre Charles Corrêa**.
- **Partner Hosting Services:** Forge, Molten Hosting, etc.

## 2. Network Configuration & SSL
- **Port:** Default is `30000` TCP.
- **SSL (HTTPS/WSS):** Required for WebRTC Audio/Video features.
  - **As of Foundry V14.369:** Foundry now natively supports automated SSL Certificate generation via **Let's Encrypt** (for public domains) and automatic self-signed certificates (for local connections), making Reverse Proxies optional for basic setups.
  - **Reverse Proxy (Nginx / Caddy / Cloudflare):** Still recommended for advanced production setups or multiple servers.
