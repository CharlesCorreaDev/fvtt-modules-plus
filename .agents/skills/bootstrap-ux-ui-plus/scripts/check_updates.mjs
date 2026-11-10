#!/usr/bin/env node
/**
 * Bootstrap & Skill Update Checker
 * Verificador de Atualizações do Bootstrap e da Skill
 * 
 * Capability:
 * 1. Queries upstream NPM registry for latest Bootstrap releases (v5.3.x, v6.x alpha/beta).
 * 2. Compares local skill installation with remote GitHub repository version.
 * 3. Enforces user permission gate before synchronizing or updating files.
 */

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const skillRootDir = path.resolve(__dirname, '..');

const REPO_OWNER = 'CharlesCorreaDev';
const REPO_NAME = 'skills-ai';
const SKILL_FOLDER_NAME = 'bootstrap-ux-ui-plus';
const REMOTE_VERSION_URL = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${SKILL_FOLDER_NAME}/VERSION`;
const NPM_BOOTSTRAP_URL = 'https://registry.npmjs.org/bootstrap';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NodeJS-BootstrapUXUIPlus-Agent' } }, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchJson(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP Status ${res.statusCode} for ${url}`));
      }
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data.trim());
        }
      });
    }).on('error', reject);
  });
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NodeJS-BootstrapUXUIPlus-Agent' } }, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchText(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP Status ${res.statusCode} for ${url}`));
      }
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data.trim()));
    }).on('error', reject);
  });
}

function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      const trimmed = answer.trim().toLowerCase();
      resolve(trimmed === 's' || trimmed === 'y' || trimmed === 'sim' || trimmed === 'yes');
    });
  });
}

function getLocalSkillVersion() {
  const versionPath = path.join(skillRootDir, 'VERSION');
  if (fs.existsSync(versionPath)) {
    return fs.readFileSync(versionPath, 'utf8').trim();
  }
  return '0.0.0';
}

function getUserInstalledSkillDir() {
  const home = process.env.USERPROFILE || process.env.HOME || '';
  const geminiSkillDir = path.join(home, '.gemini', 'config', 'skills', SKILL_FOLDER_NAME);
  return geminiSkillDir;
}

export async function checkBootstrapUpstream() {
  console.log('\n=============================================================');
  console.log('🔍 [1/2] Verificando Versão Upstream do Bootstrap (NPM / Docs)');
  console.log('=============================================================');
  try {
    const pkg = await fetchJson(NPM_BOOTSTRAP_URL);
    const distTags = pkg['dist-tags'] || {};
    const latestStable = distTags.latest || '5.3.x';
    const nextPreview = distTags.next || 'N/A';

    console.log(`📌 Bootstrap Latest (Estável): ${latestStable}`);
    if (nextPreview && nextPreview !== 'N/A') {
      console.log(`🚀 Bootstrap Next (Preview / v6): ${nextPreview}`);
    }

    return {
      latest: latestStable,
      next: nextPreview
    };
  } catch (err) {
    console.warn(`⚠️ Não foi possível consultar o NPM registry: ${err.message}`);
    return null;
  }
}

export async function checkSkillRepositoryVersion() {
  console.log('\n=============================================================');
  console.log('🔍 [2/2] Verificando Versão da Skill no Repositório Remoto');
  console.log('=============================================================');
  const localVersion = getLocalSkillVersion();
  console.log(`💻 Versão Local da Skill (Workspace): ${localVersion}`);

  let remoteVersion = null;
  try {
    remoteVersion = await fetchText(REMOTE_VERSION_URL);
    console.log(`🌐 Versão Remota (GitHub main):       ${remoteVersion}`);
  } catch (err) {
    console.warn(`⚠️ Não foi possível consultar versão remota no GitHub: ${err.message}`);
  }

  // Verificar se há instalação global no diretório de skills do usuário (.gemini/config/skills)
  const userInstallDir = getUserInstalledSkillDir();
  let installedVersion = null;
  if (fs.existsSync(userInstallDir)) {
    const userVersionFile = path.join(userInstallDir, 'VERSION');
    if (fs.existsSync(userVersionFile)) {
      installedVersion = fs.readFileSync(userVersionFile, 'utf8').trim();
      console.log(`📁 Versão Instalada no Sistema (~/.gemini/...): ${installedVersion}`);
    }
  } else {
    console.log(`📁 Instalação Global (~/.gemini/config/skills/${SKILL_FOLDER_NAME}): [Não instalada]`);
  }

  return {
    localVersion,
    remoteVersion,
    installedVersion,
    userInstallDir
  };
}

export async function run() {
  const isAutoYes = process.argv.includes('--yes') || process.argv.includes('-y');
  const shouldInstall = process.argv.includes('--install') || process.argv.includes('--sync');

  const bsInfo = await checkBootstrapUpstream();
  const skillInfo = await checkSkillRepositoryVersion();

  console.log('\n-------------------------------------------------------------');
  console.log('📊 Diagnóstico de Atualizações:');
  console.log('-------------------------------------------------------------');

  if (bsInfo) {
    console.log(`✨ Recomendação Bootstrap:`);
    console.log(`   - Modo Padrão: Bootstrap ${bsInfo.latest} (suporte a dark mode 'data-bs-theme', flexbox e grid).`);
    if (bsInfo.next && bsInfo.next !== 'N/A') {
      console.log(`   - Modo Experimental: Bootstrap ${bsInfo.next} (CSS Variables nativas sem jQuery).`);
    }
  }

  // Comparação de versão da Skill
  let updateAvailable = false;
  let targetVersion = skillInfo.remoteVersion;

  if (skillInfo.remoteVersion && skillInfo.installedVersion) {
    if (skillInfo.remoteVersion !== skillInfo.installedVersion) {
      updateAvailable = true;
      console.log(`\n🔔 ATENÇÃO: A versão instalada (${skillInfo.installedVersion}) difere da versão remota (${skillInfo.remoteVersion})!`);
    }
  } else if (!skillInfo.installedVersion && fs.existsSync(skillRootDir)) {
    // Caso ainda não tenha instalado no perfil do usuário
    console.log(`\n💡 A skill pode ser instalada ou sincronizada com ~/.gemini/config/skills/${SKILL_FOLDER_NAME}`);
  }

  if (updateAvailable || shouldInstall) {
    let proceed = isAutoYes;
    if (!proceed) {
      proceed = await askConfirmation(`\n❓ Deseja instalar/atualizar a skill no diretório de extensões do sistema (~/.gemini/config/skills/${SKILL_FOLDER_NAME})? [s/N]: `);
    }

    if (proceed) {
      console.log(`\n📦 Sincronizando arquivos da skill para: ${skillInfo.userInstallDir}...`);
      fs.cpSync(skillRootDir, skillInfo.userInstallDir, { recursive: true });
      console.log(`✅ Skill atualizada com sucesso no diretório de extensões do usuário!`);
    } else {
      console.log(`🛑 Atualização ignorada pelo usuário. Nenhuma alteração foi gravada.`);
    }
  } else {
    console.log(`\n✅ O ambiente local está em conformidade. Nenhuma ação pendente necessária.`);
  }

  console.log('=============================================================\n');
}

// Execução direta via CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run().catch(err => {
    console.error('❌ Erro durante a execução da verificação:', err);
    process.exit(1);
  });
}

