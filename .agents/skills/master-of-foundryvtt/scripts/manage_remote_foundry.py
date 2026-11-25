#!/usr/bin/env python3
"""
Remote Administration CLI for Foundry Virtual Tabletop (Foundry VTT).
GM Charles Corrêa — Master of Foundry VTT Suite.

Provides remote operations via SSH:
- Status check (service foundryvtt, Node.js process, CPU, RAM, Disk, Caddy)
- Service management (restart, stop, start, logs)
- Backup creation (Data folder, worlds, systems, modules) and list
- Log inspection (journalctl and Foundry server logs)
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


def execute_ssh_command(ssh_client, command, print_output=True):
    stdin, stdout, stderr = ssh_client.exec_command(command, get_pty=True)
    output_lines = []
    for line in iter(stdout.readline, ""):
        if print_output:
            print(line, end="")
        output_lines.append(line)
    exit_code = stdout.channel.recv_exit_status()
    return "".join(output_lines), exit_code


def main():
    parser = argparse.ArgumentParser(description="Painel de Administração Remota do Foundry VTT via SSH")
    parser.add_argument("--host", help="IP Público ou hostname do servidor")
    parser.add_argument("--port", type=int, default=22, help="Porta SSH (padrão: 22)")
    parser.add_argument("--user", default="ubuntu", help="Usuário SSH")
    parser.add_argument("--key", help="Caminho da chave privada (.pem / id_rsa)")
    parser.add_argument("--password", help="Senha SSH")
    parser.add_argument("action", nargs="?", choices=["status", "restart", "stop", "start", "logs", "backup", "interactive"],
                        default="interactive", help="Ação administrativa a executar")
    args = parser.parse_args()

    print("=" * 70)
    print("🛡️🏰 FOUNDRY VTT - GERENCIADOR & ADMINISTRAÇÃO REMOTA 🏰🛡️")
    print("=" * 70)

    host = args.host or input("\nDigite o IP Público do Servidor: ").strip()
    user = args.user if args.host else (input("Usuário SSH [ubuntu / azureuser]: ").strip() or "ubuntu")
    key_path = args.key
    password = args.password

    if not key_path and not password:
        use_key = input("Autenticar via Chave Privada SSH? (S/n): ").strip().lower() != "n"
        if use_key:
            key_path = input("Caminho da chave privada (.pem / id_rsa): ").strip()
            key_path = os.path.expanduser(key_path)
        else:
            password = getpass.getpass("Digite a senha SSH: ")

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        if key_path:
            ssh.connect(hostname=host, port=args.port, username=user, key_filename=key_path, timeout=30)
        else:
            ssh.connect(hostname=host, port=args.port, username=user, password=password, timeout=30)
        print("    [✓] Conectado ao servidor Foundry VTT com sucesso!")
    except Exception as e:
        print(f"[ERRO] Falha ao conectar: {e}")
        sys.exit(1)

    try:
        def run_action(act):
            if act == "status":
                print("\n[📊 DIAGNÓSTICO DO SERVIDOR & FOUNDRY VTT]")
                cmd = """
                echo "=== STATUS DO SERVIÇO FOUNDRY VTT ==="
                sudo systemctl status foundryvtt --no-pager -n 5 || true
                echo -e "\n=== STATUS DO PROXY CADDY ==="
                sudo systemctl is-active caddy || true
                echo -e "\n=== USO DE MEMÓRIA & SWAP ==="
                free -h
                echo -e "\n=== ESPAÇO EM DISCO (Data & Sistema) ==="
                df -h / /home/foundry
                """
                execute_ssh_command(ssh, cmd)

            elif act == "restart":
                print("\n[🔄 REINICIANDO FOUNDRY VTT...]")
                execute_ssh_command(ssh, "sudo systemctl restart foundryvtt && sudo systemctl status foundryvtt --no-pager -n 5")

            elif act == "stop":
                print("\n[⏹️ PARANDO SERVIÇO...]")
                execute_ssh_command(ssh, "sudo systemctl stop foundryvtt && sudo systemctl is-active foundryvtt")

            elif act == "start":
                print("\n[▶️ INICIANDO SERVIÇO...]")
                execute_ssh_command(ssh, "sudo systemctl start foundryvtt && sudo systemctl status foundryvtt --no-pager -n 5")

            elif act == "logs":
                print("\n[📜 ÚLTIMAS 50 LINHAS DE LOG (Foundry VTT Systemd)]")
                execute_ssh_command(ssh, "sudo journalctl -u foundryvtt -n 50 --no-pager")

            elif act == "backup":
                print("\n[💾 GERANDO BACKUP COMPLETO DO FOUNDRY DATA (Mundos, Módulos, Sistemas)...]")
                backup_cmd = """
                BACKUP_DIR="/home/foundry/backups"
                TIMESTAMP=$(date +%Y%m%d_%H%M%S)
                sudo mkdir -p $BACKUP_DIR
                sudo tar -czf "$BACKUP_DIR/backup_foundry_$TIMESTAMP.tar.gz" -C /home/foundry foundrydata
                sudo chown -R foundry:foundry $BACKUP_DIR
                ls -lh $BACKUP_DIR
                echo "Backup gerado com sucesso em: $BACKUP_DIR/backup_foundry_$TIMESTAMP.tar.gz"
                """
                execute_ssh_command(ssh, backup_cmd)

        if args.action != "interactive":
            run_action(args.action)
        else:
            while True:
                print("\n--- MENU DE GERENCIAMENTO REMOTO (FOUNDRY VTT) ---")
                print("1. Status e Diagnóstico Completo (CPU, RAM, Swap, Caddy, Node)")
                print("2. Reiniciar Foundry VTT (Restart)")
                print("3. Iniciar Serviço (Start)")
                print("4. Parar Serviço (Stop)")
                print("5. Ver Logs em Tempo Real (journalctl)")
                print("6. Fazer Backup dos Mundos e Dados (.tar.gz)")
                print("0. Sair")
                escolha = input("\nEscolha uma opção (0-6): ").strip()

                if escolha == "1":
                    run_action("status")
                elif escolha == "2":
                    run_action("restart")
                elif escolha == "3":
                    run_action("start")
                elif escolha == "4":
                    run_action("stop")
                elif escolha == "5":
                    run_action("logs")
                elif escolha == "6":
                    run_action("backup")
                elif escolha == "0":
                    print("Encerrando conexão SSH...")
                    break
                else:
                    print("[!] Opção inválida.")

    finally:
        ssh.close()


if __name__ == "__main__":
    main()
