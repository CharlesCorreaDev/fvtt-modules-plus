#!/usr/bin/env node
/**
 * Foundry Next Factory - Universal Environment & Skills Installer
 * 
 * [PT-BR] Instala dependências do ambiente e sincroniza todas as skills essenciais.
 * [EN]    Installs environment dependencies and synchronizes all essential AI skills.
 * 
 * @author Mestre Charles Corrêa <contato@charlescorrea.com.br>
 * @license MIT
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("==========================================================");
console.log("🏭 Foundry Next Factory - Setup do Ambiente & Skills / Setup");
console.log("   Target: Foundry VTT v13, v14.369 Stable & v15+");
console.log("==========================================================\n");

// 1. Executar sincronização de skills / Execute AI skills synchronization
console.log("📦 1/2. [PT-BR] Sincronizando Skills de IA para .agents/skills/...");
console.log("        [EN]    Synchronizing AI Skills to .agents/skills/...");
try {
  const syncScript = path.join(__dirname, "sync_skills.py");
  execSync(`python "${syncScript}"`, { stdio: "inherit" });
} catch (err) {
  console.warn("⚠️ [PT-BR] Aviso na execução / [EN] Warning executing sync_skills.py:", err.message);
}

// 2. Checar ferramentas do sistema / Check required CLI system tools
console.log("\n🔍 2/2. [PT-BR] Verificando ferramentas do sistema / [EN] Checking system tools...");

/**
 * [PT-BR] Checa a versão instalada de um comando do sistema.
 * [EN] Checks the installed version of a system command.
 */
function checkCmd(cmd, label) {
  try {
    const version = execSync(`${cmd} --version`, { encoding: "utf-8" }).trim();
    console.log(`  ✅ ${label}: ${version.split("\n")[0]}`);
  } catch (e) {
    console.log(`  ⚠️ [PT-BR] ${label} não encontrado / [EN] ${label} not found or not in PATH.`);
  }
}

checkCmd("node", "Node.js");
checkCmd("npm", "NPM");
checkCmd("python", "Python");
checkCmd("git", "Git");
checkCmd("gh", "GitHub CLI");

console.log("\n🎉 [PT-BR] Ambiente preparado e skills instaladas com sucesso!");
console.log("   [EN]    Environment ready and skills installed successfully!");
console.log("\n[PT-BR] Para criar um novo módulo/sistema, execute:");
console.log("[EN]    To create a new module/system, run:");
console.log("  node ./bin/foundry-factory.mjs <my-package> --type module\n");
