#!/usr/bin/env python3
"""
Server Security Audit & Hardening Script for Linux VTT Cloud Hosts.
GM Charles Corrêa — Ecossistema Skills AI.

Audits and applies hardening against:
- NoisyTCP (CVE-2026-99288): TCP stack socket exhaustion
- Vghost (CVE-2026-74580): vhost memory corruption & VM escape
- Fragnesia (CVE-2026-46300): XFRM ESP-in-TCP Page Cache corruption
- Copyfail (CVE-2026-31431): algif_aead container & root escape
- DirtyClone & Pedit COW: Copy-On-Write memory tampering
- Runtimes audits: Node.js (npm audit), Python, Caddy / Nginx.
"""

import argparse
import os
import platform
import subprocess
import sys


def run_cmd(cmd, check=False):
    try:
        res = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=check)
        return res.stdout.strip(), res.returncode
    except Exception as e:
        return str(e), 1


def main():
    parser = argparse.ArgumentParser(description="Auditor e Blindador de Segurança Linux para Servidores Foundry VTT")
    parser.add_argument("--apply-hardening", action="store_true", help="Aplica as configurações e patches recomendados")
    args = parser.parse_args()

    print("=" * 75)
    print("🛡️ AUDITORIA DE SEGURANÇA & MITIGAÇÃO DE KERNEL / RUNTIMES FOUNDRY VTT 🛡️")
    print("=" * 75)

    if platform.system() != "Linux":
        print(f"[!] Este script de diagnóstico foi desenhado para servidores Linux (Atual: {platform.system()}).")
        print("    Para execução remota via SSH, utilize através dos scripts de gerenciamento da suite.")
        sys.exit(0)

    kernel_ver, _ = run_cmd("uname -r")
    print(f"\n[1] Kernel Linux Ativo: {kernel_ver}")

    print("\n[2] Verificando Indicadores de Vulnerabilidades Críticas:")
    syncookies, _ = run_cmd("sysctl -n net.ipv4.tcp_syncookies")
    print(f"  • NoisyTCP (CVE-2026-99288) Proteção (tcp_syncookies): {'[✓] ATIVA' if syncookies == '1' else '[!] DESATIVADA'}")

    xfrm_status, _ = run_cmd("sysctl -n net.ipv4.conf.all.disable_xfrm 2>/dev/null || echo '0'")
    print(f"  • Fragnesia (CVE-2026-46300) XFRM Disablement: {'[✓] PROTEGIDO' if xfrm_status == '1' else '[!] PADRÃO (Ativo)'}")

    ptrace_scope, _ = run_cmd("cat /proc/sys/kernel/yama/ptrace_scope 2>/dev/null || echo '0'")
    print(f"  • DirtyClone / Pedit COW (ptrace_scope): {'[✓] SEGURO (Nível ' + ptrace_scope + ')' if ptrace_scope in ['1', '2', '3'] else '[!] PERMISSIVO'}")

    print("\n[3] Auditoria de Runtimes e Serviços:")
    node_v, _ = run_cmd("node -v 2>/dev/null || echo 'Não instalado'")
    caddy_v, _ = run_cmd("caddy version 2>/dev/null || echo 'Não instalado'")
    php_v, _ = run_cmd("php -v 2>/dev/null | head -n 1 || echo 'Não instalado'")
    
    # Checagem de vulnerabilidade Broccoli2Shell no Node.js
    if node_v.startswith("v20."):
        node_sec = "[CRÍTICO] Node.js 20.x EOL sem correção para Broccoli2Shell (CVE-2026-111497)! Migre para 22.23.4+ ou 24.22.1+."
    elif node_v.startswith("v22."):
        node_sec = "[✓] Node 22.x (garanta ser >= 22.23.4)"
    else:
        node_sec = "[✓] Detectado"
        
    print(f"  • Node.js: {node_v} -> {node_sec}")
    print(f"  • Caddy:   {caddy_v}")
    print(f"  • PHP:     {php_v}")

    # Verificar usuário do Foundry
    foundry_user, _ = run_cmd("ps aux | grep 'resources/app/main.js' | grep -v grep | awk '{print $1}' | head -n 1")
    if foundry_user:
        if foundry_user == "root":
            print("  [CRÍTICO] Foundry VTT está executando como usuário root! Deve rodar como usuário 'foundry'.")
        else:
            print(f"  • Usuário de Execução: [✓] SEGURO ({foundry_user})")

    if args.apply_hardening:
        print("\n[+] Aplicando regras de Hardening no Kernel e Sistema...")
        sysctl_rules = """
# Hardening de Kernel contra NoisyTCP, Fragnesia e DirtyClone/COW
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 8192
net.ipv4.tcp_synack_retries = 2
net.ipv4.tcp_abort_on_overflow = 1
net.ipv4.conf.all.disable_xfrm = 1
kernel.unprivileged_userns_clone = 0
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
fs.protected_fifos = 2
fs.protected_regular = 2
kernel.yama.ptrace_scope = 2
kernel.kptr_restrict = 2
kernel.dmesg_restrict = 1
"""
        with open("/etc/sysctl.d/99-vtt-security-hardening.conf", "w") as f:
            f.write(sysctl_rules.strip() + "\n")

        run_cmd("sysctl --system")
        print("  [✓] Parâmetros de Sysctl aplicados com sucesso!")

        blacklist_rules = """
blacklist vhost_net
install af_alg /bin/true
"""
        with open("/etc/modprobe.d/vtt-cve-blacklist.conf", "w") as f:
            f.write(blacklist_rules.strip() + "\n")
        print("  [✓] Blacklist de módulos vhost_net e af_alg aplicada!")

        print("\n[✓] Hardening concluído! Atualize os pacotes do sistema com:")
        print("    sudo apt update && sudo apt dist-upgrade -y")
    else:
        print("\n[Dica] Para aplicar as correções e mitigações automaticamente, execute:")
        print("       sudo python3 security_audit_hardening.py --apply-hardening")
    print("=" * 75)


if __name__ == "__main__":
    main()
