#!/usr/bin/env node
/**
 * ==============================================================================
 * Master of Foundry VTT - Git & GitLab Repository Visualizer & Diagrammer 📊⚡
 * 
 * PT: Disseca e gera diagramas de arquitetura (Mermaid.js, Markdown e ASCII)
 *     para repositórios remotos do GitLab (ex: https://gitlab.com/peginc/swade),
 *     GitHub ou repositórios locais. Suporta modo híbrido (GitLab REST API
 *     com fallback automático para git shallow clone seguro).
 * 
 * EN: Dissects and generates architecture diagrams (Mermaid.js, Markdown and ASCII)
 *     for remote GitLab repositories (e.g. https://gitlab.com/peginc/swade),
 *     GitHub, or local folders. Supports hybrid mode (GitLab REST API with
 *     automatic fallback to shallow git clone).
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync } from 'node:child_process';

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  bold: '\x1b[1m'
};

function logInfo(msg) { console.log(`${COLORS.cyan}ℹ️  ${msg}${COLORS.reset}`); }
function logSuccess(msg) { console.log(`${COLORS.green}✅ ${msg}${COLORS.reset}`); }
function logWarn(msg) { console.log(`${COLORS.yellow}⚠️  ${msg}${COLORS.reset}`); }
function logError(msg) { console.error(`${COLORS.red}${COLORS.bold}❌ ${msg}${COLORS.reset}`); }

/**
 * Normaliza e identifica se uma URL pertence ao GitLab, GitHub ou pasta local.
 */
function parseRepoUrl(inputUrl) {
  const clean = inputUrl.trim().replace(/\.git$/, '').replace(/\/$/, '');
  
  if (fs.existsSync(clean) && fs.statSync(clean).isDirectory()) {
    return {
      provider: 'local',
      owner: 'local',
      repo: path.basename(clean),
      fullPath: clean,
      url: clean
    };
  }

  const gitlabMatch = clean.match(/gitlab\.com\/([^/]+)\/(.+)/i);
  if (gitlabMatch) {
    return {
      provider: 'gitlab',
      owner: gitlabMatch[1],
      repo: gitlabMatch[2],
      fullPath: `${gitlabMatch[1]}/${gitlabMatch[2]}`,
      url: clean,
      cloneUrl: `https://gitlab.com/${gitlabMatch[1]}/${gitlabMatch[2]}.git`
    };
  }

  const githubMatch = clean.match(/github\.com\/([^/]+)\/(.+)/i);
  if (githubMatch) {
    return {
      provider: 'github',
      owner: githubMatch[1],
      repo: githubMatch[2],
      fullPath: `${githubMatch[1]}/${githubMatch[2]}`,
      url: clean,
      cloneUrl: `https://github.com/${githubMatch[1]}/${githubMatch[2]}.git`
    };
  }

  if (clean.includes('/')) {
    const parts = clean.split('/');
    return {
      provider: 'gitlab',
      owner: parts[0],
      repo: parts[1],
      fullPath: clean,
      url: `https://gitlab.com/${clean}`,
      cloneUrl: `https://gitlab.com/${clean}.git`
    };
  }

  throw new Error(`URL ou caminho de repositório inválido: ${inputUrl}`);
}

/**
 * Varre recursivamente uma pasta no disco ignorando .git e node_modules.
 */
function scanLocalDirectory(dirPath, rootDir = dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dirPath, entry.name);
    const rel = path.relative(rootDir, full).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      results.push(...scanLocalDirectory(full, rootDir));
    } else {
      results.push({ path: rel, type: 'blob' });
    }
  }

  return results;
}

/**
 * Obtém arquivos e metadados via Shallow Git Clone temporário.
 */
function fetchViaShallowClone(repoInfo) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fvtt-diag-'));
  logInfo(`Executando shallow clone temporário (--depth 1) em: ${tmpDir}...`);

  try {
    execSync(`git clone --depth 1 ${repoInfo.cloneUrl} .`, { cwd: tmpDir, stdio: 'pipe' });
    const items = scanLocalDirectory(tmpDir);

    let manifest = null;
    const candidates = ['src/system.json', 'system.json', 'src/module.json', 'module.json'];
    for (const cand of candidates) {
      const full = path.join(tmpDir, cand);
      if (fs.existsSync(full)) {
        try {
          manifest = JSON.parse(fs.readFileSync(full, 'utf8'));
          break;
        } catch {}
      }
    }

    return {
      project: { name: manifest?.title || repoInfo.repo, description: manifest?.description || '' },
      branch: 'default',
      items,
      manifest
    };
  } finally {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  }
}

/**
 * Consulta a API do GitLab v4 para obter metadados e árvore de arquivos.
 */
async function fetchGitLabTree(projectPath, repoInfo) {
  const encProject = encodeURIComponent(projectPath);
  logInfo(`Consultando GitLab REST API (v4) para: ${projectPath}...`);

  try {
    const projRes = await fetch(`https://gitlab.com/api/v4/projects/${encProject}`);
    if (projRes.status === 429) {
      logWarn('GitLab API rate-limit atingido (HTTP 429). Alternando para shallow git clone...');
      return fetchViaShallowClone(repoInfo);
    }
    if (!projRes.ok) {
      throw new Error(`GitLab API retornou HTTP ${projRes.status}`);
    }

    const project = await projRes.json();
    const targetBranch = project.default_branch || 'main';

    let page = 1;
    const allItems = [];
    while (page <= 10) {
      const treeRes = await fetch(`https://gitlab.com/api/v4/projects/${encProject}/repository/tree?recursive=true&per_page=100&page=${page}&ref=${targetBranch}`);
      if (treeRes.status === 429) {
        logWarn('Rate-limit durante paginação da árvore. Usando shallow clone como fallback...');
        return fetchViaShallowClone(repoInfo);
      }
      if (!treeRes.ok) break;
      const items = await treeRes.json();
      if (!Array.isArray(items) || items.length === 0) break;
      allItems.push(...items.filter(i => i.type === 'blob'));
      if (items.length < 100) break;
      page++;
    }

    let manifest = null;
    const manifestCandidates = ['src/system.json', 'system.json', 'src/module.json', 'module.json'];
    for (const cand of manifestCandidates) {
      try {
        const encPath = encodeURIComponent(cand);
        const rawRes = await fetch(`https://gitlab.com/api/v4/projects/${encProject}/repository/files/${encPath}/raw?ref=${targetBranch}`);
        if (rawRes.ok) {
          manifest = await rawRes.json();
          break;
        }
      } catch {}
    }

    return { project, branch: targetBranch, items: allItems, manifest };
  } catch (err) {
    logWarn(`GitLab API indisponível (${err.message}). Utilizando fallback via git clone...`);
    return fetchViaShallowClone(repoInfo);
  }
}

/**
 * Agrupa caminhos em categorias de arquitetura para Foundry VTT e desenvolvimento web.
 */
function analyzeArchitecture(items) {
  const categories = {
    core_apps: [],
    data_models: [],
    canvas_scene: [],
    sheets_ui: [],
    dice_rules: [],
    documents: [],
    styles: [],
    packs_compendiums: [],
    i18n: [],
    tooling_ci: []
  };

  for (const item of items) {
    const p = item.path;

    if (p.includes('/data/') || p.includes('DataModel') || p.includes('TypeDataModel') || p.includes('schema')) {
      categories.data_models.push(p);
    } else if (p.includes('/canvas/') || p.includes('/scene/') || p.includes('token') || p.includes('lighting')) {
      categories.canvas_scene.push(p);
    } else if (p.includes('/apps/') || p.includes('Application') || p.includes('dialog')) {
      categories.core_apps.push(p);
    } else if ((p.includes('/sheets/') || p.includes('template') || p.endsWith('.hbs') || p.endsWith('.html')) && !p.includes('.github') && !p.includes('.gitlab')) {
      categories.sheets_ui.push(p);
    } else if (p.includes('/dice/') || p.includes('roll') || p.includes('rules')) {
      categories.dice_rules.push(p);
    } else if (p.includes('/documents/') || p.includes('/document/') || p.includes('actor.') || p.includes('item.') || p.includes('combat.')) {
      categories.documents.push(p);
    } else if (p.endsWith('.css') || p.endsWith('.scss') || p.endsWith('.sass') || p.endsWith('.less')) {
      categories.styles.push(p);
    } else if (p.includes('/packs/') || p.includes('/compendium/') || p.includes('.db')) {
      categories.packs_compendiums.push(p);
    } else if (p.includes('/lang/') || p.includes('/i18n/') || p.endsWith('en.json') || p.endsWith('pt-BR.json')) {
      categories.i18n.push(p);
    } else if (p.startsWith('.gitlab') || p.startsWith('.github') || p.includes('tools/') || p.endsWith('.config.js') || p.endsWith('.json')) {
      categories.tooling_ci.push(p);
    }
  }

  return categories;
}

/**
 * Constrói o diagrama Mermaid.js com a arquitetura completa.
 */
function generateMermaidDiagram(repoInfo, data, categories) {
  const { project, manifest } = data;
  const title = manifest?.title || project?.name || repoInfo.repo;
  const pkgId = manifest?.id || repoInfo.repo;
  const version = manifest?.version || 'N/A';
  const fvttMin = manifest?.compatibility?.minimum || '11';
  const fvttVer = manifest?.compatibility?.verified || '14';

  let diagram = `\`\`\`mermaid
flowchart TD
  %% Master of Foundry VTT - Git Diagram
  subgraph PKG["📦 ${title} (${pkgId} v${version})"]
    direction TB
    subgraph META["📋 Metadata & Ruleset"]
      ID["ID: ${pkgId}"]
      VER["Version: ${version}"]
      COMP["Foundry Compat: v${fvttMin} - v${fvttVer}"]
    end
`;

  if (categories.core_apps.length > 0) {
    diagram += `
    subgraph APPS["🖥️ Application & Window Layer (ApplicationV2)"]
${categories.core_apps.slice(0, 5).map((f, i) => `      APP_${i}["📄 ${path.basename(f)}"]`).join('\n')}
    end
`;
  }

  if (categories.data_models.length > 0) {
    diagram += `
    subgraph DATA["🧬 DataModels & Schemas (TypeDataModel)"]
${categories.data_models.slice(0, 6).map((f, i) => `      DM_${i}["📐 ${path.basename(f)}"]`).join('\n')}
    end
`;
  }

  if (categories.documents.length > 0) {
    diagram += `
    subgraph DOCS["📜 Core Documents & Entities"]
${categories.documents.slice(0, 6).map((f, i) => `      DOC_${i}["🎭 ${path.basename(f)}"]`).join('\n')}
    end
`;
  }

  if (categories.sheets_ui.length > 0) {
    diagram += `
    subgraph UI["🎨 Templates & Sheets UI"]
${categories.sheets_ui.slice(0, 5).map((f, i) => `      UI_${i}["🖼️ ${path.basename(f)}"]`).join('\n')}
    end
`;
  }

  if (categories.canvas_scene.length > 0) {
    diagram += `
    subgraph CANVAS["🗺️ Canvas, Tokens & Lighting"]
${categories.canvas_scene.slice(0, 4).map((f, i) => `      CAN_${i}["✨ ${path.basename(f)}"]`).join('\n')}
    end
`;
  }

  if (categories.i18n.length > 0) {
    diagram += `
    subgraph I18N["🌐 Localization & Translations"]
${categories.i18n.slice(0, 4).map((f, i) => `      LANG_${i}["🌍 ${path.basename(f)}"]`).join('\n')}
    end
`;
  }

  diagram += `
    %% Architecture Relationships
    APPS --> DOCS
    DOCS --> DATA
    UI --> APPS
    UI -.-> I18N
  end

  classDef pkgStyle fill:#091633,stroke:#3B5998,stroke-width:2px,color:#F3F6FA;
  classDef appStyle fill:#14306B,stroke:#5772AC,stroke-width:1px,color:#F3F6FA;
  classDef dataStyle fill:#102655,stroke:#869DCC,stroke-width:1px,color:#F3F6FA;
  classDef uiStyle fill:#224389,stroke:#DAE1EF,stroke-width:1px,color:#F3F6FA;
  class PKG pkgStyle;
\`\`\``;

  return diagram;
}

/**
 * Gera documento Markdown consolidado com o diagrama, estatísticas e visão geral.
 */
function buildMarkdownReport(repoInfo, data, categories, mermaid) {
  const { project, branch, items, manifest } = data;
  const totalFiles = items.length;

  return `# Arquitetura & Diagrama do Repositório: ${project?.name || repoInfo.fullPath} 📊⚡
> **Origem / Source:** [${repoInfo.url}](${repoInfo.url}) (Provedor: **${repoInfo.provider.toUpperCase()}**)  
> **Branch Analisada:** \`${branch || 'main'}\` | **Total de Arquivos Analisados:** ${totalFiles}  
> **Gerado por:** Master of Foundry VTT (*GitLab & Git Diagrammer Engine*)

---

## 📌 Sumário Executivo & Metadados do Pacote
- **Identificador Técnico (ID):** \`${manifest?.id || repoInfo.repo}\`
- **Título do Pacote:** ${manifest?.title || project?.name}
- **Versão Semântica:** \`${manifest?.version || 'N/A'}\`
- **Compatibilidade Foundry VTT:** Mínimo: \`v${manifest?.compatibility?.minimum || '11'}\` | Verificado: \`v${manifest?.compatibility?.verified || '14'}\`
- **Descrição Oficial:** ${project?.description || manifest?.description || 'Nenhuma descrição fornecida.'}
- **Web Portal / Homepage:** ${manifest?.url || project?.web_url || repoInfo.url}

---

## 🗺️ Diagrama Visual de Arquitetura (Mermaid.js)

${mermaid}

---

## 📂 Visão Detalhada por Módulos & Camadas

| Camada Arquitetural | Qtd Arquivos | Arquivos em Destaque |
|---|---|---|
| **DataModels & Esquemas** | ${categories.data_models.length} | \`${categories.data_models.slice(0, 3).map(f => path.basename(f)).join('`, `') || 'N/A'}\` |
| **Aplicações (ApplicationV2 / UI)** | ${categories.core_apps.length} | \`${categories.core_apps.slice(0, 3).map(f => path.basename(f)).join('`, `') || 'N/A'}\` |
| **Documentos (Atores, Itens, Cenas)** | ${categories.documents.length} | \`${categories.documents.slice(0, 3).map(f => path.basename(f)).join('`, `') || 'N/A'}\` |
| **Templates e Folhas (HBS/HTML)** | ${categories.sheets_ui.length} | \`${categories.sheets_ui.slice(0, 3).map(f => path.basename(f)).join('`, `') || 'N/A'}\` |
| **Canvas & Tokens** | ${categories.canvas_scene.length} | \`${categories.canvas_scene.slice(0, 3).map(f => path.basename(f)).join('`, `') || 'N/A'}\` |
| **Estilos (CSS / SCSS)** | ${categories.styles.length} | \`${categories.styles.slice(0, 3).map(f => path.basename(f)).join('`, `') || 'N/A'}\` |
| **Idiomas & Localização (i18n)** | ${categories.i18n.length} | \`${categories.i18n.slice(0, 3).map(f => path.basename(f)).join('`, `') || 'N/A'}\` |
| **Compêndios & DBs** | ${categories.packs_compendiums.length} | \`${categories.packs_compendiums.slice(0, 3).map(f => path.basename(f)).join('`, `') || 'N/A'}\` |

---

## 🔗 Links Úteis para Inspeção Direta
- 📦 **GitLab Repository:** [${repoInfo.url}](${repoInfo.url})
- 🌿 **GitLab Tree:** [${repoInfo.url}/-/tree/${branch || 'develop'}](${repoInfo.url}/-/tree/${branch || 'develop'})
- 🌐 **GitLab Raw Manifest:** [${repoInfo.url}/-/raw/${branch || 'develop'}/src/system.json](${repoInfo.url}/-/raw/${branch || 'develop'}/src/system.json)
`;
}

/**
 * Função principal CLI
 */
async function main() {
  const args = process.argv.slice(2);
  const targetUrl = args[0] || 'https://gitlab.com/peginc/swade';
  const outArgIdx = args.indexOf('--output');
  const outFile = outArgIdx !== -1 && args[outArgIdx + 1] ? args[outArgIdx + 1] : null;

  console.log(`\n${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan} 📊 MASTER OF FOUNDRY VTT - GITLAB & GIT REPOSITORY DIAGRAMMER  ${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}\n`);

  try {
    const repoInfo = parseRepoUrl(targetUrl);
    logInfo(`Alvo detectado: ${repoInfo.fullPath} (${repoInfo.provider.toUpperCase()})`);

    let data;
    if (repoInfo.provider === 'gitlab') {
      data = await fetchGitLabTree(repoInfo.fullPath, repoInfo);
    } else if (repoInfo.provider === 'local') {
      const items = scanLocalDirectory(repoInfo.fullPath);
      data = { project: { name: repoInfo.repo }, branch: 'local', items, manifest: null };
    } else {
      data = fetchViaShallowClone(repoInfo);
    }

    const categories = analyzeArchitecture(data.items);
    const mermaid = generateMermaidDiagram(repoInfo, data, categories);
    const report = buildMarkdownReport(repoInfo, data, categories, mermaid);

    if (outFile) {
      fs.writeFileSync(outFile, report, 'utf8');
      logSuccess(`Diagrama e relatório salvos com sucesso em: ${outFile}`);
    } else {
      console.log('\n' + report);
    }

    logSuccess(`Dissecação do repositório ${repoInfo.fullPath} finalizada com sucesso!`);
  } catch (err) {
    logError(`Falha ao gerar diagrama do repositório: ${err.message}`);
    process.exit(1);
  }
}

main();
