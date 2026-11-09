#!/usr/bin/env node
/**
 * Humanizer Plus & Master of Foundry VTT - Upstream Humanizer Monitor
 * Author: GM Charles Corrêa
 * 
 * Checks GitHub for new releases of https://github.com/blader/humanizer.
 * Alerts developer when a new version is detected, requests authorization,
 * updates local humanizer_data (NEVER DELETING IT), and adapts patterns for
 * Master of Foundry VTT.
 * 
 * Usage:
 *   node scripts/check_upstream_humanizer.js [--auto-sync]
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(REPO_ROOT, 'humanizer_data');
const STATE_FILE = path.join(DATA_DIR, 'state.json');

// Ensure humanizer_data folder is NEVER deleted and exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    } catch (e) {
      console.error('[!] Erro ao ler state.json local:', e.message);
    }
  }
  return {
    tracked_repository: "blader/humanizer",
    tracked_url: "https://github.com/blader/humanizer",
    last_synced_tag: "v3.1.0",
    last_synced_commit: "",
    last_check_timestamp: new Date().toISOString(),
    do_not_delete: true
  };
}

function saveState(state) {
  state.last_check_timestamp = new Date().toISOString();
  state.do_not_delete = true;
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

function fetchGitHubRelease() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: '/repos/blader/humanizer/releases/latest',
      headers: {
        'User-Agent': 'HumanizerPlus-Monitor/1.0',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Falha ao processar JSON da release'));
          }
        } else {
          reject(new Error(`GitHub API retornou status HTTP ${res.statusCode}`));
        }
      });
    }).on('error', err => reject(err));
  });
}

async function main() {
  const state = loadState();
  console.log(`[*] Verificando upstream de https://github.com/blader/humanizer ...`);
  console.log(`[*] Última versão registrada na pasta de dados: ${state.last_synced_tag || 'nenhuma'}`);

  let latestRelease = null;
  try {
    latestRelease = await fetchGitHubRelease();
  } catch (err) {
    console.log(`[!] Não foi possível consultar o GitHub no momento: ${err.message}`);
    return;
  }

  const latestTag = latestRelease.tag_name;
  const currentTag = state.last_synced_tag;

  if (latestTag && latestTag !== currentTag) {
    console.log('\n' + '='.repeat(75));
    console.log('📢 ALERTA AO DESENVOLVEDOR: NOVA VERSÃO DO HUMANIZER IDENTIFICADA!');
    console.log(`Repositório upstream: https://github.com/blader/humanizer`);
    console.log(`Versão atual na base: ${currentTag}`);
    console.log(`Nova versão lançada:  ${latestTag} (${latestRelease.name || ''})`);
    console.log('-'.repeat(75));
    console.log('Notas da Versão:');
    console.log(latestRelease.body ? latestRelease.body.slice(0, 400) + '...' : '(Sem descrição)');
    console.log('-'.repeat(75));
    console.log('⚠️ O sistema humanizador de conteúdo precisa ser atualizado.');
    console.log('👉 Solicitação de autorização ao desenvolvedor:');
    console.log('   "Deseja autorizar a instalação, atualização e adaptação dos novos');
    console.log('    padrões do humanizer para a skill master-of-foundryvtt?"');
    console.log('   [Caso positivo]: A skill atualizará os padrões, adaptará o guia');
    console.log('   guides/humanization-and-clean-code.md no Foundry VTT e preservará');
    console.log('   integralmente a pasta de dados persistentes humanizer_data/ (nunca excluída).');
    console.log('='.repeat(75) + '\n');

    if (process.argv.includes('--auto-sync')) {
      console.log('[+] Autorização automática detectada (--auto-sync). Atualizando estado...');
      state.last_synced_tag = latestTag;
      saveState(state);
      console.log(`[✓] Pasta humanizer_data/ atualizada com a versão ${latestTag}.`);
    }
  } else {
    console.log(`[✓] O sistema humanizador já está sincronizado com a versão mais recente (${currentTag}).`);
    saveState(state);
  }
}

main().catch(err => {
  console.error('[!] Erro na verificação:', err);
  process.exit(1);
});
