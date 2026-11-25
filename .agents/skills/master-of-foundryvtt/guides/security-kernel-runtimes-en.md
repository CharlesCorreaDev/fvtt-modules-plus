# Security Directive: Kernel Critical CVEs and Runtime Hardening

[Português (Brasil)](security-kernel-runtimes.md) · [Back to Guides](../README.md)

This directive establishes the security protocol and remediation procedures for critical Linux Kernel vulnerabilities and runtimes (Node.js, Python, PHP, Redis) running Foundry VTT in cloud environments.

---

## 1. Critical Kernel CVEs Remediated

- **NoisyTCP (CVE-2026-99288):** TCP stack remote DoS vulnerability. Remediated via kernel updates and TCP syncookies.
- **Vghost (CVE-2026-74580):** Virtualization vhost memory corruption and VM escape. Remediated via kernel update.
- **Fragnesia (CVE-2026-46300):** XFRM Page Cache corruption and root escalation. Remediated via kernel patch and XFRM disablement.
- **Copyfail (CVE-2026-31431):** Crypto `algif_aead` container escape. Remediated via module blocking and kernel update.
- **DirtyClone & Pedit COW:** Copy-On-Write RAM binary alteration. Remediated via Yama ptrace scope and memory restriction sysctl settings.

---

## 2. Runtime Best Practices

- Node.js 20/22 LTS running strictly under unprivileged `foundry` system user.
- Local loopback proxying via Caddy/Nginx with automatic Let's Encrypt SSL.
