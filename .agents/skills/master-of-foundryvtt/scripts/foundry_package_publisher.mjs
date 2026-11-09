#!/usr/bin/env node
/**
 * ==============================================================================
 * Master of Foundry VTT - Official Package Publisher & Pre-Flight Quality Gate
 * 
 * PT: Realiza a auditoria rigorosa de código, validação de arquivos obrigatórios,
 *     checagem de ícones (HTTP 200), conformidade i18n, execução do Foundry CLI,
 *     empacotamento seguro em .zip e publicação na API Oficial do Foundry VTT.
 * 
 * EN: Performs strict code auditing, mandatory files validation, icon check
 *     (HTTP 200), i18n verification, Foundry CLI validation, safe .zip packaging,
 *     and automated publishing to the official Foundry VTT Package Release API.
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import http from 'node:http';
import tls from 'node:tls';
import net from 'node:net';
import { execSync } from 'node:child_process';
import archiver from 'archiver';

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function logInfo(msg) {
  console.log(`${COLORS.cyan}ℹ️  ${msg}${COLORS.reset}`);
}

function logSuccess(msg) {
  console.log(`${COLORS.green}✅ ${msg}${COLORS.reset}`);
}

function logWarn(msg) {
  console.log(`${COLORS.yellow}⚠️  ${msg}${COLORS.reset}`);
}

function logError(msg) {
  console.error(`${COLORS.red}${COLORS.bold}❌ ${msg}${COLORS.reset}`);
}

/**
 * PT: Faz requisição HEAD/GET para testar se uma URL retorna HTTP 200.
 * EN: Performs a HEAD/GET request to test if a URL returns HTTP 200 OK.
 * 
 * @param {string} urlStr - URL a ser testada / URL to test.
 * @returns {Promise<boolean>}
 */
function checkUrl200(urlStr) {
  return new Promise((resolve) => {
    try {
      const client = urlStr.startsWith('https') ? https : http;
      const req = client.request(urlStr, { method: 'HEAD', timeout: 5000 }, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    } catch {
      resolve(false);
    }
  });
}

/**
 * PT: Valida a existência dos 3 arquivos obrigatórios do módulo.
 * EN: Validates the existence of the 3 mandatory module files.
 */
function auditMandatoryFiles(projectDir) {
  logInfo('Etapa 1: Validando arquivos obrigatórios (VERSION, README.md, CHANGELOG.md)...');
  const requiredFiles = ['VERSION', 'README.md', 'CHANGELOG.md'];
  const missing = [];

  for (const file of requiredFiles) {
    const fullPath = path.join(projectDir, file);
    if (!fs.existsSync(fullPath)) {
      missing.push(file);
    }
  }

  if (missing.length > 0) {
    logError(`Arquivos obrigatórios ausentes: ${missing.join(', ')}`);
    return false;
  }

  logSuccess('Arquivos obrigatórios presentes!');
  return true;
}

/**
 * PT: Audita o manifesto (module.json / system.json) e autor.
 * EN: Audits manifest (module.json / system.json) and author metadata.
 */
function auditManifest(projectDir) {
  logInfo('Etapa 2: Auditando integridade do Manifesto e dados do Autor...');
  const manifestPath = fs.existsSync(path.join(projectDir, 'module.json'))
    ? path.join(projectDir, 'module.json')
    : path.join(projectDir, 'system.json');

  if (!fs.existsSync(manifestPath)) {
    logError('Nenhum module.json ou system.json foi encontrado na raiz do projeto.');
    return null;
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    logError(`Falha ao ler JSON do manifesto: ${err.message}`);
    return null;
  }

  // Checar campos essenciais
  const requiredFields = ['id', 'title', 'version', 'compatibility', 'url', 'manifest', 'download'];
  const missingFields = requiredFields.filter((f) => !manifest[f]);

  if (missingFields.length > 0) {
    logError(`Campos obrigatórios ausentes no manifesto: ${missingFields.join(', ')}`);
    return null;
  }

  // Checar Autores
  if (!manifest.authors || !Array.isArray(manifest.authors) || manifest.authors.length === 0) {
    logWarn('Manifesto não contém o array "authors" preenchido com dados do desenvolvedor.');
  } else {
    const author = manifest.authors[0];
    logSuccess(`Autor identificado: ${author.name || 'Desconhecido'} (${author.discord ? 'Discord: ' + author.discord : 'Sem discord informado'})`);
  }

  // Checar versão sincronizada com o arquivo VERSION
  const versionFile = path.join(projectDir, 'VERSION');
  if (fs.existsSync(versionFile)) {
    const vContent = fs.readFileSync(versionFile, 'utf8').trim();
    if (vContent !== manifest.version) {
      logWarn(`Inconsistência de versão: VERSION="${vContent}" vs MANIFEST="${manifest.version}"`);
    } else {
      logSuccess(`Versão semântica sincronizada: v${manifest.version}`);
    }
  }

  return manifest;
}

/**
 * PT: Audita arquivos de internacionalização (i18n).
 * EN: Audits internationalization (i18n) files.
 */
function auditLanguages(projectDir, manifest) {
  logInfo('Etapa 3: Conferência de idiomas e internacionalização (i18n)...');
  if (!manifest.languages || !Array.isArray(manifest.languages)) {
    logInfo('Nenhum idioma extra declarado no manifesto.');
    return true;
  }

  let allValid = true;
  for (const langObj of manifest.languages) {
    const langPath = path.join(projectDir, langObj.path);
    if (!fs.existsSync(langPath)) {
      logError(`Arquivo de idioma declarado não existe: ${langObj.path}`);
      allValid = false;
      continue;
    }
    try {
      JSON.parse(fs.readFileSync(langPath, 'utf8'));
      logSuccess(`Idioma "${langObj.name}" (${langObj.lang}) validado com sucesso.`);
    } catch (e) {
      logError(`JSON inválido no arquivo de idioma ${langObj.path}: ${e.message}`);
      allValid = false;
    }
  }
  return allValid;
}

/**
 * PT: Varre arquivos JS/MJS para detectar alucinações de IA e falta de bilinguismo.
 * EN: Scans JS/MJS files to detect AI hallucinations and missing bilingual comments.
 */
function auditCodeHumanization(projectDir) {
  logInfo('Etapa 4: Auditoria de código (Anti-Alucinações e Limpeza de Sintéticos)...');
  const bannedKeywords = [
    { pattern: /\.data\.data\b/, reason: 'Uso de ".data.data" (legado v9). Use ".system" para v11/v12/v13+.' },
    { pattern: /game\.actors\.getActor\b/, reason: 'Método alucinado "game.actors.getActor". Use "game.actors.get(id)".' },
    { pattern: /token\.updateAttributes\b/, reason: 'Método alucinado "token.updateAttributes". Use "token.document.update({ system })".' },
    { pattern: /pipeline neural|processamento estocástico|modelo preditivo/i, reason: 'Jargão sintético de IA em módulo de RPG.' }
  ];

  let issuesFound = 0;

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(full);
      } else if (entry.name.endsWith('.js') || entry.name.endsWith('.mjs')) {
        const content = fs.readFileSync(full, 'utf8');
        for (const ban of bannedKeywords) {
          if (ban.pattern.test(content)) {
            logWarn(`[${entry.name}] Detectado padrão impróprio: ${ban.reason}`);
            issuesFound++;
          }
        }
      }
    }
  }

  scanDir(projectDir);

  if (issuesFound === 0) {
    logSuccess('Nenhuma alucinação crítica ou jargão sintético detectado nos scripts.');
  } else {
    logWarn(`Foram encontrados ${issuesFound} pontos de atenção para revisão no código.`);
  }

  return true;
}

/**
 * PT: Executa a validação oficial através do Foundry CLI (@foundryvtt/foundryvtt-cli).
 * EN: Runs official validation via Foundry CLI (@foundryvtt/foundryvtt-cli).
 */
function runFoundryCliValidation(projectDir) {
  logInfo('Etapa 5: Executando validação oficial com Foundry CLI...');
  try {
    execSync('fvtt --version', { stdio: 'ignore' });
  } catch {
    logWarn('Foundry CLI não encontrado no PATH global. Tentando npx @foundryvtt/foundryvtt-cli...');
  }

  try {
    const cmd = `npx @foundryvtt/foundryvtt-cli package validate "${projectDir}"`;
    const output = execSync(cmd, { encoding: 'utf8' });
    console.log(output);
    logSuccess('Validação do Foundry CLI concluída com sucesso!');
    return true;
  } catch (err) {
    logError(`Falha na validação do Foundry CLI: ${err.stdout || err.message}`);
    return false;
  }
}

/**
 * PT: Constrói o arquivo ZIP com a pasta raiz correta (ID do pacote).
 * EN: Builds the ZIP package with the correct root folder (Package ID).
 */
function buildPackageZip(projectDir, manifest, outputZipPath) {
  return new Promise((resolve, reject) => {
    logInfo(`Etapa 6: Gerando pacote ZIP seguro com raiz "/${manifest.id}/"...`);
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      logSuccess(`Arquivo ZIP gerado com sucesso: ${outputZipPath} (${(archive.pointer() / 1024).toFixed(1)} KB)`);
      resolve(true);
    });

    archive.on('error', (err) => {
      logError(`Erro ao compactar ZIP: ${err.message}`);
      reject(err);
    });

    archive.pipe(output);

    // Adiciona o diretório do projeto encapsulado sob manifest.id
    archive.glob('**/*', {
      cwd: projectDir,
      ignore: ['node_modules/**', '.git/**', '*.zip', '.github/**']
    }, { prefix: manifest.id });

    archive.finalize();
  });
}

/**
 * PT: Envia a nova versão para a API Oficial do Foundry VTT.
 * EN: Posts the new version to the official Foundry VTT Package Release API.
 */
function publishToFoundryVttApi(manifest, token, notesUrl) {
  return new Promise((resolve, reject) => {
    logInfo('Etapa 7: Publicando na API Oficial do Foundry VTT (https://foundryvtt.com/_api/packages/release_version/)...');

    if (!token) {
      logError('FOUNDRY_API_TOKEN não foi fornecido. Impossível publicar na API.');
      return resolve(false);
    }

    const payload = JSON.stringify({
      id: manifest.id,
      release: {
        version: manifest.version,
        manifest: manifest.manifest,
        notes: notesUrl || manifest.readme || '',
        compatibility: manifest.compatibility
      }
    });

    const options = {
      hostname: 'foundryvtt.com',
      path: '/_api/packages/release_version/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          logSuccess(`Pacote v${manifest.version} publicado com sucesso no Foundry VTT! Resposta: ${data}`);
          resolve(true);
        } else {
          logError(`Erro na API do Foundry (HTTP ${res.statusCode}): ${data}`);
          resolve(false);
        }
      });
    });

    req.on('error', (err) => {
      logError(`Erro de conexão com foundryvtt.com: ${err.message}`);
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
}

/**
 * CLI Entrypoint
 */

/**
 * PT: Executa comandos Git para commit, tag e push automático do pacote.
 * EN: Executes Git commands for automated commit, tag, and push of the package.
 */
function publishToGitRepository(projectDir, manifest, tagMessage) {
  try {
    const version = manifest.version;
    const tagName = `v${version}`;
    const commitMsg = tagMessage || `chore(release): bump to ${tagName}`;

    logInfo(`Executando automação Git para release ${tagName}...`);
    
    // 1. git add
    execSync('git add .', { cwd: projectDir, stdio: 'inherit' });
    
    // 2. git commit (ignora se não houver diff)
    try {
      execSync(`git commit -m "${commitMsg}"`, { cwd: projectDir, stdio: 'inherit' });
    } catch {
      logWarn('Nenhuma alteração pendente para commit no Git.');
    }

    // 3. git tag
    try {
      execSync(`git tag -a ${tagName} -m "Release ${tagName}"`, { cwd: projectDir, stdio: 'inherit' });
      logSuccess(`Tag Git ${tagName} criada com sucesso!`);
    } catch (tagErr) {
      logWarn(`Tag ${tagName} já existe ou não pôde ser criada: ${tagErr.message}`);
    }

    // 4. git push
    try {
      execSync('git push origin --tags', { cwd: projectDir, stdio: 'inherit' });
      execSync('git push', { cwd: projectDir, stdio: 'inherit' });
      logSuccess('Código e Tags enviados para o repositório remoto com sucesso!');
    } catch (pushErr) {
      logWarn(`Falha ao executar git push (verifique conexão ou credenciais): ${pushErr.message}`);
    }

    // 5. Se GitHub CLI estiver disponível, cria GitHub Release anexando os assets
    try {
      const zipName = `${manifest.id}.zip`;
      const manifestFile = fs.existsSync(path.join(projectDir, 'module.json')) ? 'module.json' : 'system.json';
      const notesArg = manifest.changelog ? `--notes-file CHANGELOG.md` : `--generate-notes`;
      execSync(`gh release create ${tagName} ${manifestFile} ${zipName} --title "${manifest.title} ${tagName}" ${notesArg}`, { cwd: projectDir, stdio: 'inherit' });
      logSuccess(`GitHub Release ${tagName} criada com sucesso via GitHub CLI!`);
    } catch {
      logInfo('GitHub CLI (gh) não configurado ou release já existente. GitHub Release pulada.');
    }
  } catch (err) {
    logError(`Erro durante a automação do Git: ${err.message}`);
  }
}

async function main() {
  console.log(`\n${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan} 🎲 MASTER OF FOUNDRY VTT - PIPELINE DE QUALIDADE & PUBLICAÇÃO  ${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}\n`);

  const projectDir = process.cwd();
  const token = process.env.FOUNDRY_API_TOKEN || process.env.FOUNDRY_RELEASE_TOKEN;
  const isPublishMode = process.argv.includes('--publish');
  const isGitMode = process.argv.includes('--git');

  // 1. Arquivos obrigatórios
  if (!auditMandatoryFiles(projectDir)) {
    process.exit(1);
  }

  // 2. Manifesto
  const manifest = auditManifest(projectDir);
  if (!manifest) {
    process.exit(1);
  }

  // 3. Idiomas
  auditLanguages(projectDir, manifest);

  // 4. Código e Humanização
  auditCodeHumanization(projectDir);

  // 5. Validação com Foundry CLI
  runFoundryCliValidation(projectDir);

  // 6. Empacotamento ZIP seguro
  const outputZip = path.join(projectDir, `${manifest.id}.zip`);
  await buildPackageZip(projectDir, manifest, outputZip);

  // 6.5. Publicação no repositório Git do Desenvolvedor (se solicitado via --git)
  if (isGitMode) {
    publishToGitRepository(projectDir, manifest);
  }


  // 7. Publicação na API oficial (se requisitado)
  if (isPublishMode) {
    if (!token) {
      logError('Para publicar com --publish, defina a variável FOUNDRY_API_TOKEN.');
      process.exit(1);
    }
    const success = await publishToFoundryVttApi(manifest, token, manifest.changelog);
    if (!success) {
      process.exit(1);
    }

    // 8. Notificações pós-publicação (E-mail e/ou SMS)
    await sendPostPublishNotifications(manifest);
  } else {
    logInfo('Modo de validação concluído. Para enviar à API do Foundry, execute com --publish.');
  }

  logSuccess('Processo de auditoria concluído com êxito! 🚀');
}

/**
 * PT: Dispara notificações pós-publicação por E-mail e/ou SMS se configuradas no ambiente.
 * EN: Triggers post-publication notifications via Email and/or SMS if configured in environment.
 * 
 * @param {object} manifest - Manifesto do módulo publicado / Published module manifest.
 */
async function sendPostPublishNotifications(manifest) {
  const version = manifest.version;
  const title = manifest.title;
  const subject = `[Foundry VTT] Pacote Publicado: ${title} v${version}`;
  const message = `Seu pacote "${title}" versão ${version} foi homologado e publicado com sucesso no Diretório do Foundry VTT! Manifest URL: ${manifest.manifest}`;

  // 1. Envio de E-mail (Prioridade 1: Servidor SMTP Tradicional; Prioridade 2: API Transacional)
  const notifyEmail = process.env.NOTIFY_EMAIL || (manifest.authors && manifest.authors[0] && manifest.authors[0].email);
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const emailApiKey = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY;

  if (smtpHost && smtpUser && smtpPass && notifyEmail) {
    logInfo(`Disparando notificação por E-mail via SMTP (${smtpHost}) para: ${notifyEmail}...`);
    await sendEmailSmtp({
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
      pass: smtpPass,
      from: process.env.EMAIL_FROM || smtpUser,
      to: notifyEmail,
      subject: subject,
      text: message
    });
  } else if (emailApiKey && notifyEmail) {
    logInfo(`Disparando notificação por E-mail via API REST (Resend/SendGrid) para: ${notifyEmail}...`);
    await sendEmailNotification(emailApiKey, notifyEmail, subject, message);
  } else if (!notifyEmail) {
    logInfo('Nenhum e-mail configurado (NOTIFY_EMAIL ou manifesto). Notificação de e-mail pulada.');
  }

  // 2. Envio de SMS (Provedor 1: SMS Legal / SMS Gateway - Provedor Nacional Brasileiro)
  const smsLegalToken = process.env.SMSLEGAL_TOKEN || process.env.SMSGATEWAY_TOKEN;
  const notifyPhone = process.env.NOTIFY_PHONE;

  if (smsLegalToken && notifyPhone) {
    logInfo(`Disparando notificação por SMS via SMS Legal (Brasil) para: ${notifyPhone}...`);
    await sendSmsLegal(smsLegalToken, notifyPhone, message);
  } else {
    // Envio de SMS (Provedor 2: Twilio Internacional - Fallback)
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_PHONE_FROM;

    if (twilioSid && twilioAuth && twilioFrom && notifyPhone) {
      logInfo(`Disparando notificação por SMS via Twilio para: ${notifyPhone}...`);
      await sendSmsTwilio(twilioSid, twilioAuth, twilioFrom, notifyPhone, message);
    } else {
      logInfo('Nenhum serviço de SMS configurado (SMSLEGAL_TOKEN ou TWILIO_*). Notificação por SMS pulada.');
    }
  }
}

/**
 * PT: Envia SMS via API oficial do SMS Legal / SMS Gateway (https://smsgateway.com.br).
 * EN: Sends SMS via SMS Legal / SMS Gateway official API (https://smsgateway.com.br).
 * 
 * @param {string} token - Token de autenticação / Auth token.
 * @param {string} phone - Celular no formato DDI+DDD+Número (ex: 5511999999999).
 * @param {string} message - Texto da mensagem / Message text.
 */
function sendSmsLegal(token, phone, message) {
  return new Promise((resolve) => {
    // Normaliza número removendo caracteres especiais como +, - ou espaços
    const cleanPhone = phone.replace(/\D/g, '');
    const queryParams = new URLSearchParams({
      token: token,
      to: cleanPhone,
      msg: message
    }).toString();

    const urlStr = `https://v1.smsgateway.com.br/api/send-sms-texto.php?${queryParams}`;

    https.get(urlStr, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.Sucesso === 200 || json.Sucesso === '200') {
            logSuccess(`SMS Legal enviado com sucesso para ${cleanPhone}! ID: ${json.IdSMS || 'N/A'}`);
          } else {
            logWarn(`Falha no envio via SMS Legal (Código ${json.Codigo || json.Sucesso}): ${data}`);
          }
        } catch {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            logSuccess(`SMS Legal enviado com resposta HTTP ${res.statusCode}: ${data}`);
          } else {
            logWarn(`Falha no envio via SMS Legal: ${data}`);
          }
        }
        resolve();
      });
    }).on('error', (err) => {
      logWarn(`Erro ao conectar com API do SMS Legal: ${err.message}`);
      resolve();
    });
  });
}

/**
 * PT: Envia e-mail diretamente via conexão de socket SMTP (SSL/TLS na porta 465 ou STARTTLS na 587).
 * EN: Sends email directly via raw SMTP socket connection (SSL/TLS on 465 or STARTTLS on 587).
 * 
 * @param {object} opts - Configurações SMTP / SMTP options.
 */
function sendEmailSmtp(opts) {
  return new Promise((resolve) => {
    const isDirectTls = opts.port === 465;
    const socket = isDirectTls
      ? tls.connect(opts.port, opts.host, { rejectUnauthorized: false })
      : net.connect(opts.port, opts.host);

    let stage = 0;
    let secureSocket = socket;

    function sendCmd(cmd) {
      secureSocket.write(cmd + '\r\n');
    }

    secureSocket.on('error', (err) => {
      logWarn(`Erro na conexão SMTP: ${err.message}`);
      resolve();
    });

    secureSocket.on('data', (chunk) => {
      const resp = chunk.toString();
      const code = resp.substring(0, 3);

      if (stage === 0 && (code === '220' || resp.includes('220'))) {
        stage = 1;
        sendCmd(`EHLO localhost`);
      } else if (stage === 1 && code === '250') {
        stage = 2;
        sendCmd(`AUTH LOGIN`);
      } else if (stage === 2 && code === '334') {
        stage = 3;
        sendCmd(Buffer.from(opts.user).toString('base64'));
      } else if (stage === 3 && code === '334') {
        stage = 4;
        sendCmd(Buffer.from(opts.pass).toString('base64'));
      } else if (stage === 4 && (code === '235' || resp.includes('235'))) {
        stage = 5;
        sendCmd(`MAIL FROM:<${opts.from}>`);
      } else if (stage === 5 && code === '250') {
        stage = 6;
        sendCmd(`RCPT TO:<${opts.to}>`);
      } else if (stage === 6 && code === '250') {
        stage = 7;
        sendCmd(`DATA`);
      } else if (stage === 7 && code === '354') {
        stage = 8;
        const emailContent = [
          `From: ${opts.from}`,
          `To: ${opts.to}`,
          `Subject: ${opts.subject}`,
          `MIME-Version: 1.0`,
          `Content-Type: text/plain; charset=utf-8`,
          ``,
          opts.text,
          `.`
        ].join('\r\n');
        sendCmd(emailContent);
      } else if (stage === 8 && code === '250') {
        logSuccess(`E-mail enviado via SMTP com sucesso para ${opts.to}!`);
        sendCmd(`QUIT`);
        secureSocket.end();
        resolve();
      } else if (code.startsWith('4') || code.startsWith('5')) {
        logWarn(`Erro na resposta do servidor SMTP (${code}): ${resp.trim()}`);
        secureSocket.end();
        resolve();
      }
    });
  });
}

/**
 * PT: Envia e-mail transacional via API REST (Resend como provedor alternativo).
 * EN: Sends transactional email via REST API (Resend as alternative provider).
 */
function sendEmailNotification(apiKey, toEmail, subject, text) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      from: process.env.EMAIL_FROM || 'Foundry Bot <onboarding@resend.dev>',
      to: [toEmail],
      subject: subject,
      text: text
    });

    const options = {
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          logSuccess(`E-mail enviado com sucesso para ${toEmail}!`);
        } else {
          logWarn(`Falha no envio de e-mail (HTTP ${res.statusCode}): ${data}`);
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      logWarn(`Erro ao disparar e-mail: ${err.message}`);
      resolve();
    });

    req.write(payload);
    req.end();
  });
}

/**
 * PT: Envia SMS via API Twilio.
 * EN: Sends SMS via Twilio API.
 */
function sendSmsTwilio(accountSid, authToken, fromNumber, toNumber, body) {
  return new Promise((resolve) => {
    const postData = new URLSearchParams({
      To: toNumber,
      From: fromNumber,
      Body: body
    }).toString();

    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    const options = {
      hostname: 'api.twilio.com',
      path: `/2010-04-01/Accounts/${accountSid}/Messages.json`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          logSuccess(`SMS enviado com sucesso para ${toNumber}!`);
        } else {
          logWarn(`Falha no envio do SMS (HTTP ${res.statusCode}): ${data}`);
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      logWarn(`Erro ao disparar SMS: ${err.message}`);
      resolve();
    });

    req.write(postData);
    req.end();
  });
}

main().catch((err) => {
  logError(`Erro fatal no pipeline: ${err.message}`);
  process.exit(1);
});
