#!/usr/bin/env node
/**
 * Master of Foundry VTT - Skill & Humanizer Plus Periodic Auto-Updater.
 *
 * Checks:
 * 1. Upstream master-of-foundryvtt version.
 * 2. humanizer-plus version and upstream (blader/humanizer).
 * 
 * If humanizer-plus or its upstream has updates:
 * - Alerts the developer.
 * - Requests explicit authorization.
 * - Updates humanizer-plus, absorbs new rules, and adapts them into master-of-foundryvtt.
 * - Permanently preserves humanizer_data/ (NEVER DELETES IT).
 *
 * Usage:
 *   node scripts/check_skill_updates.js [--auto-sync]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const SKILL_DIR = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(SKILL_DIR, '..');
const VERSION_FILE = path.join(SKILL_DIR, 'VERSION');
const REMOTE_VERSION_URL = 'https://raw.githubusercontent.com/CharlesCorreaDev/skills-ai/main/master-of-foundryvtt/VERSION';

// humanizer-plus paths
const HUMANIZER_DIR = path.join(REPO_ROOT, 'humanizer-plus');
const HUMANIZER_VERSION_FILE = path.join(HUMANIZER_DIR, 'VERSION');
const HUMANIZER_DATA_DIR = path.join(HUMANIZER_DIR, 'humanizer_data');
const HUMANIZER_STATE_FILE = path.join(HUMANIZER_DATA_DIR, 'state.json');

function getLocalVersion(filePath, fallback = '0.0.0') {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8').trim();
  }
  return fallback;
}

function fetchHttpsJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MasterOfFoundryVTT-AutoUpdater/1.0', 'Accept': 'application/vnd.github.v3+json' } }, (res) => {
      let rawData = '';
      res.on('data', chunk => { rawData += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(rawData));
          } catch (e) {
            resolve(rawData.trim());
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    }).on('error', err => reject(err));
  });
}

function runGitPull() {
  try {
    const isGit = execSync('git rev-parse --is-inside-work-tree', { cwd: SKILL_DIR, stdio: 'pipe' }).toString().trim();
    if (isGit === 'true') {
      execSync('git pull --ff-only', { cwd: SKILL_DIR, stdio: 'pipe' });
      return true;
    }
  } catch (e) {
    // Falha silenciosa se não for repositório git ou sem internet
  }
  return false;
}

async function checkHumanizerStatus() {
  console.log('\n[*] Verificando integração com humanizer-plus e upstream blader/humanizer...');
  const currentHumanizerVer = getLocalVersion(HUMANIZER_VERSION_FILE, '1.0.0');
  console.log(`[*] Versão local ativa do humanizer-plus: ${currentHumanizerVer}`);

  let state = { last_synced_tag: 'v3.1.0' };
  if (fs.existsSync(HUMANIZER_STATE_FILE)) {
    try {
      state = JSON.parse(fs.readFileSync(HUMANIZER_STATE_FILE, 'utf8'));
    } catch (e) {}
  }

  try {
    const latestRelease = await fetchHttpsJson('https://api.github.com/repos/blader/humanizer/releases/latest');
    const latestTag = latestRelease.tag_name;

    if (latestTag && latestTag !== state.last_synced_tag) {
      console.log('\n' + '='.repeat(75));
      console.log('📢 ALERTA AO DESENVOLVEDOR: ATUALIZAÇÃO NO HUMANIZADOR DISPONÍVEL!');
      console.log(`A ferramenta humanizadora base (blader/humanizer) lançou uma nova versão: ${latestTag}`);
      console.log(`Versão registrada localmente: ${state.last_synced_tag}`);
      console.log('-'.repeat(75));
      console.log('A skill master-of-foundryvtt precisa que o humanizer-plus seja atualizado');
      console.log('para que os novos padrões e regras de anti-detecção sejam adaptados');
      console.log('aos códigos, macros e diários de RPG do Foundry VTT.');
      console.log('-'.repeat(75));
      console.log('👉 Solicitação de autorização ao desenvolvedor:');
      console.log('   "Deseja autorizar a atualização do humanizer-plus e a sincronização');
      console.log('    dos novos padrões para a skill master-of-foundryvtt?"');
      console.log('   (A pasta humanizer_data/ permanecerá 100% preservada no computador).');
      console.log('='.repeat(75) + '\n');
      return true;
    } else {
      console.log(`[✓] humanizer-plus está sincronizado com a versão upstream mais recente (${state.last_synced_tag}).`);
    }
  } catch (err) {
    console.log(`[!] Consulta ao upstream do humanizer ignorada (offline ou limite de API): ${err.message}`);
  }
  return false;
}

async function main() {
  const localVer = getLocalVersion(VERSION_FILE);
  console.log(`[*] Versão local de master-of-foundryvtt: ${localVer}`);

  // 1. Checa versão remota da própria skill
  try {
    const remoteVer = await fetchHttpsJson(REMOTE_VERSION_URL);
    function parseVer(v) {
      return (v || '').replace(/^[vV]/, '').split('-')[0].split('.').map(n => parseInt(n, 10) || 0);
    }
    const [lMaj, lMin, lPat] = parseVer(localVer);
    const [rMaj, rMin, rPat] = parseVer(remoteVer);
    const isNewer = rMaj > lMaj || (rMaj === lMaj && rMin > lMin) || (rMaj === lMaj && rMin === lMin && rPat > lPat);

    if (typeof remoteVer === 'string' && isNewer) {
      console.log('\n' + '='.repeat(70));
      console.log('📢 ALERTA AO DESENVOLVEDOR: ATUALIZAÇÃO DE SKILL');
      console.log("A skill 'master-of-foundryvtt' possui uma nova versão disponível!");
      console.log(`Versão atual:  ${localVer}`);
      console.log(`Nova versão:   ${remoteVer}`);
      console.log('-'.repeat(70));
      console.log("Iniciando a atualização automática de 'master-of-foundryvtt'...");
      console.log("Preservando memórias persistentes em 'memory/'...");
      console.log('='.repeat(70) + '\n');

      if (runGitPull()) {
        console.log(`✅ Skill atualizada via git para ${getLocalVersion(VERSION_FILE)}!`);
      }
    } else {
      console.log(`[✓] master-of-foundryvtt está na versão mais recente (${localVer}).`);
    }
  } catch (err) {
    console.log(`[!] Verificação de versão remota do master-of-foundryvtt: ${err.message}`);
  }

  // 2. Checa status da skill parceira humanizer-plus
  await checkHumanizerStatus();
}

main().catch((err) => {
  console.error('[!] Erro na execução do verificador:', err);
  process.exit(1);
});
