#!/usr/bin/env node
/**
 * Foundry Next Factory CLI (FNF)
 * 
 * [PT-BR] Scaffolder moderno de pacotes para Foundry VTT v13, v14.369 Stable & v15+.
 *         Cria módulos e sistemas com ApplicationV2, TypeDataModel e isolamento CSS.
 * 
 * [EN]    Modern package scaffolder for Foundry VTT v13, v14.369 Stable & v15+.
 *         Scaffolds modules and systems with ApplicationV2, TypeDataModel, and CSS isolation.
 * 
 * @author Mestre Charles Corrêa <contato@charlescorrea.com.br>
 * @license MIT
 */

import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

/**
 * [PT-BR] Exibe o banner inicial estilizado no terminal.
 * [EN] Displays the styled startup banner in the terminal.
 */
function printBanner() {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║  🏭 FOUNDRY NEXT FACTORY - Modern Scaffolder (v13/v14/v15)║
║  ApplicationV2 • TypeDataModel • CSS Isolation • Vite/ESM ║
╚═══════════════════════════════════════════════════════════╝
`);
}

/**
 * [PT-BR] Analisa e valida os argumentos passados via linha de comando.
 * [EN] Parses and validates command-line arguments.
 * 
 * @returns {object} Configuração extraída dos parâmetros / Parsed configuration object
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    name: "",
    type: "module", // module | system
    preset: "vite-ts-appv2", // vite-ts-appv2 | vanilla-esm | system-datamodel-v14
    author: "Charles Corrêa",
    version: "14",
    targetDir: ""
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--type" || arg === "-t") {
      config.type = args[++i];
    } else if (arg === "--preset" || arg === "-p") {
      config.preset = args[++i];
    } else if (arg === "--author" || arg === "-a") {
      config.author = args[++i];
    } else if (!arg.startsWith("-") && !config.name) {
      config.name = arg;
    }
  }

  return config;
}

/**
 * [PT-BR] Copia diretórios ou arquivos recursivamente substituindo placeholders no conteúdo.
 * [EN] Recursively copies directories or files, replacing template placeholders in text content.
 * 
 * @param {string} src - Caminho de origem / Source path
 * @param {string} dest - Caminho de destino / Destination path
 * @param {Record<string, string>} replacements - Dicionário de substituições / Replacements map
 */
function copyRecursiveSync(src, dest, replacements = {}) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      let resolvedChildName = childItemName;
      for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(`{{${key}}}`, "g");
        resolvedChildName = resolvedChildName.replace(regex, value);
      }

      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, resolvedChildName),
        replacements
      );
    });
  } else {
    let content = fs.readFileSync(src, "utf-8");
    for (const [key, value] of Object.entries(replacements)) {
      const regex = new RegExp(`{{${key}}}`, "g");
      content = content.replace(regex, value);
    }
    fs.writeFileSync(dest, content, "utf-8");
  }
}

/**
 * [PT-BR] Fluxo principal de execução do gerador.
 * [EN] Main execution workflow of the scaffolder.
 */
async function run() {
  printBanner();
  const config = parseArgs();

  if (!config.name) {
    console.log("[PT-BR] Uso / [EN] Usage:");
    console.log("  node ./bin/foundry-factory.mjs <package-name> [options]\n");
    console.log("Opções / Options:");
    console.log("  --type, -t     Tipo / Package type: 'module' | 'system' (Default: module)");
    console.log("  --preset, -p   Preset: 'vite-ts-appv2' | 'vanilla-esm' (Default: vite-ts-appv2)");
    console.log("  --author, -a   Nome do autor / Author name (Default: 'Charles Corrêa')\n");
    process.exit(1);
  }

  const packageId = config.name.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
  const destDir = path.resolve(process.cwd(), packageId);
  const presetDir = path.join(rootDir, "templates", "presets", config.preset);

  console.log(`📦 [PT-BR] Gerando / [EN] Generating ${config.type.toUpperCase()}: ${packageId}`);
  console.log(`🎨 [PT-BR] Preset selecionado / [EN] Selected preset: ${config.preset}`);
  console.log(`📂 [PT-BR] Destino / [EN] Destination: ${destDir}\n`);

  if (!fs.existsSync(presetDir)) {
    console.error(`❌ [PT-BR] Preset '${config.preset}' não encontrado em templates! / [EN] Preset '${config.preset}' not found in templates!`);
    process.exit(1);
  }

  // Placeholders para injeção nos templates / Placeholders for template injection
  const replacements = {
    PACKAGE_ID: packageId,
    PACKAGE_TITLE: config.name.replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    AUTHOR_NAME: config.author,
    FOUNDRY_VERIFIED: "14",
    FOUNDRY_MINIMUM: "12"
  };

  copyRecursiveSync(presetDir, destDir, replacements);

  console.log(`✅ [PT-BR] Sucesso! Pacote '${packageId}' gerado com padrões Foundry v14!`);
  console.log(`✅ [EN] Success! Package '${packageId}' scaffolded with Foundry v14 standards!`);
  console.log(`\nPróximos passos / Next steps:`);
  console.log(`  cd ${packageId}`);
  if (config.preset === "vite-ts-appv2") {
    console.log(`  npm install`);
    console.log(`  npm run build`);
  }
}

run();
