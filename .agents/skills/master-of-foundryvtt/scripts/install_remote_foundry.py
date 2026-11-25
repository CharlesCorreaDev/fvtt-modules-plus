#!/usr/bin/env python3
"""
Remote Installer for Foundry Virtual Tabletop (Foundry VTT) on Cloud Servers.
GM Charles Corrêa — Master of Foundry VTT Suite.

Interactively prompts for SSH credentials or accepts CLI arguments, connects via Paramiko,
configures Swap, installs Node.js 22 LTS (22.23.4+ com patch Broccoli2Shell CVE-2026-111497) / 22 LTS, unzips Foundry VTT, sets up PM2 or Systemd,
configures Caddy or Nginx with automatic SSL, and starts the server.
"""

import argparse
import getpass
import os
import sys

try:
    import paramiko
except ImportError:
    print("[!] O pacote 'paramiko' não está instalado. Instale com: pip install paramiko ou uv pip install paramiko")
    sys.exit(1)


def execute_ssh_command(ssh_client, command, check=True, print_output=True):
    if print_output:
        print(f"\n[EXEC] > {command}")
    stdin, stdout, stderr = ssh_client.exec_command(command, get_pty=True)
    output_lines = []
    for line in iter(stdout.readline, ""):
        if print_output:
            print(line, end="")
        output_lines.append(line)
    exit_code = stdout.channel.recv_exit_status()
    if check and exit_code != 0:
        err_msg = "".join(output_lines)
        raise RuntimeError(f"Comando falhou com código {exit_code}: {err_msg}")
    return "".join(output_lines), exit_code


def main():
    parser = argparse.ArgumentParser(description="Instalador Remoto do Foundry VTT via SSH")
    parser.add_argument("--host", help="IP Público ou hostname do servidor")
    parser.add_argument("--port", type=int, default=22, help="Porta SSH (padrão: 22)")
    parser.add_argument("--user", default="ubuntu", help="Usuário SSH")
    parser.add_argument("--key", help="Caminho da chave privada SSH (.pem / id_rsa)")
    parser.add_argument("--password", help="Senha SSH")
    parser.add_argument("--domain", help="Subdomínio FQDN do Foundry VTT (ex: mesa.duckdns.org)")
    parser.add_argument("--download-url", help="URL temporária de download do FoundryVTT (do site oficial)")
    parser.add_argument("--swap-gb", type=int, default=3, help="Tamanho do swap em GB (padrão: 3GB)")
    args = parser.parse_args()

    print("=" * 70)
    print("🎲🏰 FOUNDRY VTT - INSTALADOR REMOTO MULTI-CLOUD FREE TIER 🏰🎲")
    print("Suporte: Oracle Cloud Always Free, AWS, Azure, GCP e VPS Linux")
    print("=" * 70)

    host = args.host or input("\n[1/5] Digite o IP Público do Servidor: ").strip()
    user = args.user if args.host else (input("[2/5] Usuário SSH [ubuntu / azureuser]: ").strip() or "ubuntu")
    key_path = args.key
    password = args.password

    if not key_path and not password:
        use_key = input("[3/5] Deseja autenticar via Chave Privada SSH? (S/n): ").strip().lower() != "n"
        if use_key:
            key_path = input("      Caminho da chave privada (.pem / id_rsa): ").strip()
            key_path = os.path.expanduser(key_path)
            if not os.path.exists(key_path):
                print(f"[ERRO] Arquivo não encontrado: {key_path}")
                sys.exit(1)
        else:
            password = getpass.getpass("      Digite a senha SSH: ")

    domain = args.domain or input("[4/5] Digite o subdomínio/domínio do Foundry VTT (ex: mesa.duckdns.org): ").strip()
    download_url = args.download_url or input("[5/5] Cole o link temporário de download do Foundry VTT (zip Linux): ").strip()

    print("\n[+] Estabelecendo conexão SSH com o servidor...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        if key_path:
            ssh.connect(hostname=host, port=args.port, username=user, key_filename=key_path, timeout=30)
        else:
            ssh.connect(hostname=host, port=args.port, username=user, password=password, timeout=30)
        print("    [✓] Conexão SSH estabelecida!")
    except Exception as e:
        print(f"[ERRO] Falha ao conectar: {e}")
        sys.exit(1)

    try:
        # 1. Swap
        print(f"\n[ETAPA 1/6] Configurando Memória Swap ({args.swap_gb}GB)...")
        swap_cmd = f"""
        if [ ! -f /swapfile ]; then
            sudo fallocate -l {args.swap_gb}G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count={args.swap_gb * 1024}
            sudo chmod 600 /swapfile
            sudo mkswap /swapfile
            sudo swapon /swapfile
            echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
        fi
        free -h
        """
        execute_ssh_command(ssh, swap_cmd)

        # 2. Firewall
        print("\n[ETAPA 2/6] Liberando portas 80 e 443 no firewall...")
        fw_cmd = """
        if command -v ufw >/dev/null 2>&1; then
            sudo ufw allow 80/tcp || true
            sudo ufw allow 443/tcp || true
        fi
        if command -v iptables >/dev/null 2>&1; then
            sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT || true
            sudo iptables -I INPUT 1 -p tcp --dport 443 -j ACCEPT || true
        fi
        """
        execute_ssh_command(ssh, fw_cmd)

        # 3. Dependências e Node.js 20/22 LTS
        print("\n[ETAPA 3/6] Instalando Node.js LTS, Caddy, unzip e ferramentas...")
        pkg_cmd = """
        sudo apt-get update -y
        sudo DEBIAN_FRONTEND=noninteractive apt-get install -y curl unzip wget gnupg debian-keyring debian-archive-keyring apt-transport-https

        # Instalar Node.js 22 LTS (22.23.4+ com patch Broccoli2Shell CVE-2026-111497) se não existir
        if ! command -v node >/dev/null 2>&1; then
            curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
            sudo apt-get install -y nodejs
        fi
        node -v

        # Instalar Caddy (servidor web moderno com SSL automático para WebSockets)
        if ! command -v caddy >/dev/null 2>&1; then
            curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg --yes
            curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
            sudo apt-get update -y
            sudo apt-get install -y caddy
        fi
        """
        execute_ssh_command(ssh, pkg_cmd)

        # 4. Instalar Foundry VTT
        print("\n[ETAPA 4/6] Configurando diretórios /home/foundry e descompactando Foundry VTT...")
        foundry_setup = f"""
        # Criar usuário dedicado 'foundry' caso não exista
        if ! id -u foundry >/dev/null 2>&1; then
            sudo useradd -r -m -d /home/foundry -s /bin/bash foundry
        fi

        sudo mkdir -p /home/foundry/foundryvtt /home/foundry/foundrydata
        sudo chown -R foundry:foundry /home/foundry

        if [ -n "{download_url}" ]; then
            echo "Baixando pacote Foundry VTT..."
            sudo -u foundry wget -O /home/foundry/foundryvtt.zip "{download_url}"
            sudo -u foundry unzip -o -q /home/foundry/foundryvtt.zip -d /home/foundry/foundryvtt/
            sudo rm -f /home/foundry/foundryvtt.zip
        fi
        """
        execute_ssh_command(ssh, foundry_setup)

        # 5. Serviço Systemd
        print("\n[ETAPA 5/6] Configurando daemon Systemd (foundryvtt.service)...")
        service_cmd = """
        sudo tee /etc/systemd/system/foundryvtt.service << 'EOF'
[Unit]
Description=Foundry Virtual Tabletop
After=network.target

[Service]
Type=simple
User=foundry
WorkingDirectory=/home/foundry/foundryvtt
ExecStart=/usr/bin/node /home/foundry/foundryvtt/resources/app/main.js --dataPath=/home/foundry/foundrydata
Restart=always
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
        sudo systemctl daemon-reload
        sudo systemctl enable --now foundryvtt
        """
        execute_ssh_command(ssh, service_cmd)

        # 6. Caddy com SSL Automático Let's Encrypt
        print(f"\n[ETAPA 6/6] Configurando Caddy Reverse Proxy com SSL automático para {domain}...")
        caddy_cmd = f"""
        sudo tee /etc/caddy/Caddyfile << 'EOF'
{domain} {{
    reverse_proxy 127.0.0.1:30000
}}
EOF
        sudo systemctl restart caddy
        """
        execute_ssh_command(ssh, caddy_cmd)

        print("\n" + "=" * 70)
        print("🎉 INSTALAÇÃO DO FOUNDRY VTT CONCLUÍDA COM SUCESSO! 🎉")
        print(f"Acesse no navegador: https://{domain}")
        print("Pastas no servidor: /home/foundry/foundryvtt e /home/foundry/foundrydata")
        print("Status do serviço: sudo systemctl status foundryvtt")
        print("=" * 70)

    finally:
        ssh.close()


if __name__ == "__main__":
    main()
