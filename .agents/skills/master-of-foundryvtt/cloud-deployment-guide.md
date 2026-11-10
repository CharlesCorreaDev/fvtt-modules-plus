# Guia Completo: Instalação e Deploy do Foundry VTT nas Principais Nuvens

Este guia fornece o passo a passo completo, scripts de automação, firewall e configurações de SSL (HTTPS via Caddy/Nginx) para rodar o **Foundry Virtual Tabletop (v8 a v14)** 24 horas por dia, 7 dias por semana, nas 4 maiores nuvens do mercado e em VPS dedicada da Hostinger:
1. **Oracle Cloud Infrastructure (OCI) - Always Free Tier** (A escolha favorita da comunidade: 100% gratuita, 4 OCPU ARM Ampere e 24GB RAM).
2. **Amazon Web Services (AWS)** (EC2 Ubuntu com Security Groups e IAM).
3. **Google Cloud Platform (GCP)** (Google Compute Engine com VPC Firewall via `github.com/google/skills`).
4. **Microsoft Azure** (Azure Virtual Machine Linux com Network Security Groups).
5. **Hostinger VPS** (KVM Linux de alta velocidade, NVMe e tráfego abundante).

---

## 🛠️ Skills Oficiais Recomendadas para Operações Cloud
Para automatizar o provisionamento de infraestrutura, IAM, redes e segurança em nuvem:
- **Google Cloud:** `npx skills@latest add github.com/google/skills` (oficial do Google para GCE, Cloud Run, IAM e Well-Architected).
- **Amazon Web Services (AWS):** `aws-skills` / AWS CLI oficial para EC2 e VPC.
- **Oracle Cloud (OCI):** OCI CLI oficial / Terraform OCI Provider.
- **Microsoft Azure:** Azure CLI (`az vm create`) e Azure MCP.

---

## ⚡ Pré-Requisitos Universais para Qualquer Nuvem
1. **Sistema Operacional:** Ubuntu 24.04 LTS ou Ubuntu 22.04 LTS (x86_64 ou ARM64/aarch64).
2. **Portas de Rede/Firewall Necessárias:**
   - `22/TCP` (SSH para administração)
   - `80/TCP` (HTTP para validação Let's Encrypt SSL)
   - `443/TCP` (HTTPS obrigatório para Foundry VTT permitir áudio, vídeo WebRTC e microfone dos jogadores)
   - `30000/TCP` (Porta interna padrão do Node.js do Foundry - não precisa abrir publicamente se usar Reverse Proxy Caddy/Nginx).
3. **Domínio ou Dynamic DNS:** Recomenda-se apontar um subdomínio (ex: `rpg.seudominio.com` ou `seunome.duckdns.org`) para o IP Público da máquina.

---

## ☁️ 1. Oracle Cloud Infrastructure (OCI) - Always Free Tier (Recomendado)

A Oracle oferece o melhor Always Free do mercado:
- Instância `VM.Standard.A1.Flex` (Processador ARM Ampere, escolha 2 OCPUs e 12GB de RAM, ou até 4 OCPUs e 24GB de RAM).
- 50 GB a 200 GB de volume de inicialização gratuito.
- 10 TB de tráfego de saída gratuito por mês.

### Passo a Passo no Console OCI:
1. Acesse o console da Oracle Cloud e vá em **Compute > Instances > Create Instance**.
2. Escolha imagem **Ubuntu 24.04 (aarch64/ARM)** e Shape **Ampere (A1.Flex)**.
3. Cole sua chave pública SSH.
4. Na VCN (Virtual Cloud Network) associada, acesse **Security Lists > Default Security List** e adicione **Ingress Rules**:
   - Source: `0.0.0.0/0`, Protocol: TCP, Destination Port Range: `80,443`.
5. Abra o firewall interno do Ubuntu via SSH:
   ```bash
   sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
   sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
   sudo netfilter-persistent save
   ```

---

## ☁️ 2. Amazon Web Services (AWS - EC2)

1. No console AWS, acesse **EC2 > Launch Instance**.
2. Escolha **Ubuntu 24.04 LTS** (instância `t3.small` ou `t3.medium` recomendada; `t2.micro` / `t3.micro` possui apenas 1GB de RAM, que pode ficar apertado com mundos pesados e muitos módulos).
3. Em **Security Group**, libere:
   - SSH (Porta 22) a partir do seu IP.
   - HTTP (Porta 80) para `0.0.0.0/0`.
   - HTTPS (Porta 443) para `0.0.0.0/0`.
4. Aloque um **Elastic IP** e associe à sua instância para que o IP público não mude ao reiniciar.

---

## ☁️ 3. Google Cloud Platform (GCP - Compute Engine)

Utilize a skill `github.com/google/skills` ou o `gcloud CLI`:
1. No console do GCP, acesse **Compute Engine > VM Instances > Create Instance**.
2. Escolha série **E2** (`e2-medium` ou `e2-standard-2`).
3. Marque as opções:
   - ☑️ **Allow HTTP traffic**
   - ☑️ **Allow HTTPS traffic**
4. Reserve um **External IP Address** estático em **VPC Network > External IP Addresses**.

---

## ☁️ 4. Microsoft Azure (Virtual Machine)

1. No Portal Azure, vá em **Virtual Machines > Create**.
2. Selecione imagem **Ubuntu Server 24.04 LTS** e tamanho `Standard_B2s` (2 vCPUs, 4 GB RAM).
3. No **Network Security Group (NSG)** de entrada, crie regras liberando as portas `80` e `443`.
4. Defina o IP público como **Estático** nas propriedades da placa de rede da VM.

---

## ⚡ 5. Hostinger VPS (KVM Ubuntu)

A Hostinger oferece VPS KVM com armazenamento NVMe ultrarrápido, excelente estabilidade e suporte nativo a Ubuntu 22.04 / 24.04 LTS:

### Passo a Passo no Painel Hostinger (hPanel):
1. Acesse o **hPanel da Hostinger > VPS > Gerenciar**.
2. Garanta que o SO instalado seja **Ubuntu 22.04 LTS** ou **Ubuntu 24.04 LTS** (se necessário, faça a reinstalação rápida pelo painel em 1 clique).
3. Na seção **Segurança > Firewall da VPS**, crie ou edite o perfil de firewall liberando as portas:
   - `22/TCP` (SSH)
   - `80/TCP` (HTTP)
   - `443/TCP` (HTTPS)
   - *(Opcional)* `30000/TCP` se for testar diretamente sem domínio/reverse proxy.
4. Conecte-se via terminal SSH:
   ```bash
   ssh root@ip_do_seu_vps_hostinger
   ```
5. Siga o script de instalação canônico abaixo com Caddy (SSL automático) ou Nginx + Certbot.

---

## 🚀 Script Canônico de Instalação do Foundry VTT no Linux (Ubuntu)

Execute estes comandos via SSH em qualquer uma das VMs configuradas acima:

```bash
# 1. Atualizar o sistema
sudo apt update && sudo apt upgrade -y

# 2. Instalar Node.js 20.x ou 22.x LTS (compatível com Foundry VTT v11–v14)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs unzip curl caddy ufw

# 3. Criar usuário dedicado seguro para o Foundry
sudo useradd -m -s /bin/bash foundry
sudo mkdir -p /home/foundry/foundryvtt /home/foundry/foundrydata
sudo chown -R foundry:foundry /home/foundry

# 4. Baixar o Foundry VTT (Substitua a URL temporária do seu download oficial no site do Foundry)
# Exemplo manual de download e descompactação:
# cd /home/foundry/foundryvtt
# sudo -u foundry wget -O foundryvtt.zip "SUA_URL_TEMPORARIA_DO_FOUNDRYVTT"
# sudo -u foundry unzip foundryvtt.zip && rm foundryvtt.zip

# 5. Instalar o PM2 para manter o Foundry rodando 24/7 em background
sudo npm install -g pm2
sudo -u foundry pm2 start "node /home/foundry/foundryvtt/resources/app/main.js --dataPath=/home/foundry/foundrydata" --name "foundryvtt"
sudo -u foundry pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u foundry --hp /home/foundry
```

---

## 🔒 Configuração de SSL Automático com Caddy (HTTPS)

O Foundry VTT exige HTTPS para habilitar streaming de vídeo, permissão de microfone e conexões seguras. O **Caddy** gera e renova certificados SSL automaticamente (Let's Encrypt / ZeroSSL) sem necessidade de scripts cron:

Edite o arquivo `/etc/caddy/Caddyfile`:
```caddy
rpg.seudominio.com {
    reverse_proxy localhost:30000 {
        header_up Host {upstream_hostport}
        header_up X-Forwarded-Host {host}
    }
}
```

Reinicie o Caddy:
```bash
sudo systemctl restart caddy
```

Pronto! Seu Foundry VTT estará acessível com SSL seguro no endereço `https://rpg.seudominio.com`.
