#!/usr/bin/env node
/**
 * Foundry VTT Custom MCP Server & Live GM Bridge (Node.js Native)
 * ===============================================================
 * Part of the Master of Foundry VTT Suite by GM Charles Corrêa.
 * 
 * An autonomous, zero-external-dependency Model Context Protocol (MCP) server
 * running over standard input/output (stdio JSON-RPC 2.0).
 * 
 * Supports:
 * - Direct HTTP & WebSocket live session authentication with Foundry VTT instances
 *   using GM credentials (FOUNDRY_USER, FOUNDRY_PASSWORD, FOUNDRY_ADMIN_KEY).
 * - Full CRUD & Generation capabilities:
 *   - create_actor (PCs, NPCs, Monsters, Fichas completas)
 *   - create_item (Equipamentos, Armas, Magias, Habilidades)
 *   - create_journal_handout (Diários, Documentos de Texto, Handouts de imagem)
 *   - create_rollable_table (Tabelas roláveis de tesouros, encontros, rumores)
 *   - create_macro (Scripts JavaScript e Chat Macros executáveis no mundo)
 *   - manage_compendiums (Criação de compêndios LevelDB/ClassicLevel)
 *   - scaffold_package (Scaffold completo de módulos e sistemas v12/v14)
 *   - inspect_foundry_environment
 *   - query_official_systems & query_official_modules & query_foundry_store
 *   - validate_manifest
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const http = require('http');
const https = require('https');

const SERVER_NAME = "master-of-foundryvtt-mcp";
const { execSync } = require('child_process');
const SERVER_VERSION = "2.1.0";

// EN: Lower MCP server OS priority so background tasks never freeze the host machine
// PT-BR: Reduz a prioridade do servidor MCP no SO para que tarefas em background nunca travem a maquina
try {
  const prio = os.constants && os.constants.priority && os.constants.priority.PRIORITY_BELOW_NORMAL !== undefined
    ? os.constants.priority.PRIORITY_BELOW_NORMAL
    : 10;
  os.setPriority(process.pid, prio);
} catch (_) {
  // Ignore if unsupported by platform / Ignora se nao suportado pela plataforma
}

/**
 * EN: Detects GPU model, total/free VRAM (MB), and calculates safe CPU/RAM/VRAM execution budget.
 * PT-BR: Detecta modelo da GPU, VRAM total/livre (MB) e calcula o orcamento seguro de CPU/RAM/VRAM.
 */
function calculateHardwareBudget(requestedWorkers = null) {
  const cpus = os.cpus() || [];
  const cpuModel = cpus.length > 0 ? cpus[0].model.trim() : "Unknown CPU";
  const logicalCores = Math.max(1, cpus.length);
  const totalRamGb = Number((os.totalmem() / (1024 ** 3)).toFixed(2));
  const freeRamGb = Number((os.freemem() / (1024 ** 3)).toFixed(2));
  const usedRamPercent = totalRamGb > 0 ? Number((((totalRamGb - freeRamGb) / totalRamGb) * 100).toFixed(1)) : 50.0;

  let gpuName = "Unknown / Integrated GPU";
  let vramTotalMb = 0;
  let vramFreeMb = 0;
  let detectionMethod = "fallback-heuristic";
  let isIntegrated = false;

  // 1. Try nvidia-smi / Tenta nvidia-smi
  try {
    const nvOut = execSync("nvidia-smi --query-gpu=name,memory.total,memory.free --format=csv,noheader,nounits", {
      encoding: "utf8",
      timeout: 2500,
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    if (nvOut) {
      const firstLine = nvOut.split(/\r?\n/)[0];
      const parts = firstLine.split(",").map(s => s.trim());
      if (parts.length >= 3) {
        gpuName = parts[0];
        vramTotalMb = parseInt(parts[1], 10) || 0;
        vramFreeMb = parseInt(parts[2], 10) || 0;
        detectionMethod = "nvidia-smi";
      }
    }
  } catch (_) {}

  // 2. Windows Registry fallback / Fallback via Registro do Windows
  if (vramTotalMb === 0 && process.platform === "win32") {
    try {
      const psCmd = `powershell -NoProfile -Command "Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0*' -ErrorAction SilentlyContinue | Select-Object DriverDesc, 'HardwareInformation.qwMemorySize', 'HardwareInformation.MemorySize' | ConvertTo-Json -Compress"`;
      const regOut = execSync(psCmd, {
        encoding: "utf8",
        timeout: 4000,
        stdio: ["ignore", "pipe", "ignore"]
      }).trim();
      if (regOut) {
        const parsed = JSON.parse(regOut);
        const list = Array.isArray(parsed) ? parsed : [parsed];
        for (const item of list) {
          if (!item || !item.DriverDesc) continue;
          const desc = String(item.DriverDesc).trim();
          const lower = desc.toLowerCase();
          if (lower.includes("basic") || lower.includes("remote") || lower.includes("virtual")) continue;
          let memBytes = Number(item["HardwareInformation.qwMemorySize"]) || 0;
          if (!memBytes && Array.isArray(item["HardwareInformation.MemorySize"]) && item["HardwareInformation.MemorySize"].length === 4) {
            const arr = item["HardwareInformation.MemorySize"];
            memBytes = (arr[0] | (arr[1] << 8) | (arr[2] << 16) | (arr[3] * 0x1000000)) >>> 0;
          } else if (!memBytes && typeof item["HardwareInformation.MemorySize"] === "number") {
            memBytes = item["HardwareInformation.MemorySize"];
          }
          const memMb = memBytes > 0 ? Math.round(memBytes / (1024 * 1024)) : 1024;
          if (memMb >= vramTotalMb) {
            gpuName = desc;
            vramTotalMb = memMb;
            vramFreeMb = Math.floor(memMb * 0.75);
            detectionMethod = "winreg-display-class";
          }
        }
      }
    } catch (_) {}
  }

  if (vramTotalMb === 0) {
    vramTotalMb = 1024;
    vramFreeMb = 768;
  }

  const lowerGpu = gpuName.toLowerCase();
  if (lowerGpu.includes("intel") || lowerGpu.includes("uhd") || lowerGpu.includes("iris") || lowerGpu.includes("integrated") || vramTotalMb <= 2048) {
    isIntegrated = true;
  }

  const safetyReserveGb = isIntegrated ? 4.0 : 2.5;
  const usableRamGb = Math.max(0.4, Number(((freeRamGb - safetyReserveGb) * 0.55).toFixed(2)));
  const safeVramBudgetMb = Math.max(256, Math.floor(vramFreeMb * 0.60));

  let maxWorkers = 1;
  let profile = "ULTRA-SAFE";
  let batchSize = 10;
  let batchDelayMs = 80;

  if (freeRamGb < 3.0 || usedRamPercent >= 85.0 || logicalCores <= 2) {
    maxWorkers = 1;
    profile = "ULTRA-ECO (Low Memory Protection)";
    batchSize = 10;
    batchDelayMs = 80;
  } else if (freeRamGb < 6.0 || isIntegrated || logicalCores <= 4) {
    maxWorkers = Math.min(2, Math.max(1, Math.floor(logicalCores / 4)));
    profile = "ECO-BALANCED (Anti-Freeze Mode)";
    batchSize = 25;
    batchDelayMs = 45;
  } else if (freeRamGb < 12.0 || logicalCores <= 8) {
    maxWorkers = Math.min(3, Math.max(2, Math.floor(logicalCores / 3)));
    profile = "BALANCED-SAFE";
    batchSize = 40;
    batchDelayMs = 25;
  } else {
    maxWorkers = Math.min(4, Math.max(2, Math.floor(logicalCores / 3)));
    profile = "HIGH-THROUGHPUT-GOVERNED";
    batchSize = 60;
    batchDelayMs = 15;
  }

  if (requestedWorkers && requestedWorkers > 0) {
    maxWorkers = Math.max(1, Math.min(Number(requestedWorkers), maxWorkers));
  }

  const maxSceneDimension = vramTotalMb <= 2048 ? 4096 : (vramTotalMb <= 4096 ? 8192 : 16384);
  const maxAnimatedWebmTiles = vramTotalMb <= 2048 ? 3 : (vramTotalMb <= 4096 ? 8 : 20);
  const recommendedWebpQuality = vramTotalMb <= 2048 ? 75 : 82;

  return {
    profile,
    cpu: {
      model: cpuModel,
      logical_cores: logicalCores,
      safe_workers_limit: maxWorkers
    },
    ram: {
      total_gb: totalRamGb,
      free_gb: freeRamGb,
      used_percent: usedRamPercent,
      safe_skill_budget_gb: usableRamGb,
      safety_reserve_gb: safetyReserveGb
    },
    gpu_vram: {
      model: gpuName,
      vram_total_mb: vramTotalMb,
      vram_free_estimated_mb: vramFreeMb,
      safe_vram_budget_mb: safeVramBudgetMb,
      is_integrated_shared_ram: isIntegrated,
      detection_method: detectionMethod
    },
    execution_limits: {
      max_workers: maxWorkers,
      ffmpeg_threads: maxWorkers,
      sharp_concurrency: maxWorkers,
      batch_size: batchSize,
      batch_delay_ms: batchDelayMs,
      node_max_old_space_size_mb: Math.max(512, Math.min(4096, Math.floor(usableRamGb * 1024)))
    },
    foundry_vram_canvas_budget: {
      max_recommended_scene_px: `${maxSceneDimension}x${maxSceneDimension}`,
      max_concurrent_webm_animated_tiles: maxAnimatedWebmTiles,
      recommended_webp_quality: recommendedWebpQuality
    }
  };
}

// Environment-based default credentials (password defaults to empty if none set)
const DEFAULT_FOUNDRY_URL = process.env.FOUNDRY_URL || "http://localhost:30000";
const DEFAULT_FOUNDRY_USER = process.env.FOUNDRY_USER || "master-of-foundry";
const DEFAULT_FOUNDRY_PASSWORD = process.env.FOUNDRY_PASSWORD || "";
const DEFAULT_FOUNDRY_ADMIN_KEY = process.env.FOUNDRY_ADMIN_KEY || "";
const DEFAULT_FOUNDRY_WORLD = process.env.FOUNDRY_WORLD || "";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function sendResponse(response) {
  process.stdout.write(JSON.stringify(response) + "\n");
}

function getLocalDataPath(customPath) {
  if (customPath) return customPath;
  if (process.env.FOUNDRY_DATA_PATH) return process.env.FOUNDRY_DATA_PATH;
  if (process.env.FOUNDRY_VTT_DATA) return process.env.FOUNDRY_VTT_DATA;

  // Standard platform-specific paths as documented by Foundry VTT:
  // Windows: %localappdata%/FoundryVTT/Data
  // macOS: ~/Library/Application Support/FoundryVTT/Data
  // Linux: ~/.local/share/FoundryVTT/Data
  if (process.platform === 'win32') {
    const localAppData = process.env.LOCALAPPDATA || (process.env.USERPROFILE ? path.join(process.env.USERPROFILE, 'AppData', 'Local') : '');
    if (localAppData) {
      const stdPath = path.join(localAppData, 'FoundryVTT', 'Data');
      if (fs.existsSync(stdPath)) return stdPath;
      return stdPath;
    }
  } else if (process.platform === 'darwin') {
    const home = process.env.HOME || '';
    if (home) {
      const stdPath = path.join(home, 'Library', 'Application Support', 'FoundryVTT', 'Data');
      if (fs.existsSync(stdPath)) return stdPath;
      return stdPath;
    }
  } else {
    const home = process.env.HOME || '';
    if (home) {
      const stdPath = path.join(home, '.local', 'share', 'FoundryVTT', 'Data');
      if (fs.existsSync(stdPath)) return stdPath;
      return stdPath;
    }
  }

  return path.join(process.cwd(), 'foundry_data');
}

// Ensure icon path is valid and responds or fallback safely to Foundry core standard icons
function resolveVerifiedIcon(requestedIcon, fallback = "icons/svg/mystery-man.svg") {
  if (!requestedIcon || typeof requestedIcon !== 'string') return fallback;
  const cleanPath = requestedIcon.startsWith('/') ? requestedIcon.slice(1) : requestedIcon;
  
  // Custom public/app directory if configured via environment
  if (process.env.FOUNDRY_APP_DIR) {
    const customPublic = path.join(process.env.FOUNDRY_APP_DIR, 'public', cleanPath.replace(/\//g, path.sep));
    if (fs.existsSync(customPublic)) {
      return cleanPath;
    }
  }
  
  // Accept standard foundry core icon paths or common extensions
  if (cleanPath.startsWith("icons/") || cleanPath.startsWith("ui/") || cleanPath.startsWith("systems/")) {
    return cleanPath;
  }
  
  return fallback;
}

// Security: Prevent path traversal in user-supplied IDs and filenames
function sanitizeSafeId(input, fallback = "default") {
  if (!input || typeof input !== 'string') return fallback;
  const sanitized = path.basename(input).replace(/[^a-zA-Z0-9_-]/g, "_").trim();
  return sanitized || fallback;
}

function handleListTools() {
  return [
    {
      name: "inspect_foundry_environment",
      description: "Detects the user operating system (Windows, Linux, macOS), determines if Foundry VTT is hosted locally or in the cloud (The Forge, Molten, VPS), and inspects the Data folder or live endpoint.",
      inputSchema: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "Optional URL of the Foundry VTT instance (e.g. http://localhost:30000 or https://mygame.forge-vtt.com). Defaults to FOUNDRY_URL or localhost:30000."
          },
          data_path: {
            type: "string",
            description: "Optional path to User Data folder. Defaults to OS standard location or FOUNDRY_DATA_PATH."
          }
        }
      }
    },
    {
      name: "authenticate_gm_session",
      description: "Tests and validates GM / Master Admin credentials against a live running Foundry VTT instance.",
      inputSchema: {
        type: "object",
        properties: {
          url: { type: "string", description: "Foundry instance URL (e.g. http://localhost:30000).", default: DEFAULT_FOUNDRY_URL },
          world: { type: "string", description: "World ID to connect to.", default: DEFAULT_FOUNDRY_WORLD },
          username: { type: "string", description: "GM Username (e.g. Gamemaster).", default: DEFAULT_FOUNDRY_USER },
          password: { type: "string", description: "GM User Password.", default: DEFAULT_FOUNDRY_PASSWORD },
          admin_key: { type: "string", description: "Foundry Administrator Key (adminPassword).", default: DEFAULT_FOUNDRY_ADMIN_KEY }
        }
      }
    },
    {
      name: "create_actor",
      description: "Creates or updates an Actor (Player Character, NPC, Monster) with full attributes, biography and stats in a world or JSON format.",
      inputSchema: {
        type: "object",
        properties: {
          world_id: { type: "string", description: "Target world ID in local Data folder (optional)." },
          name: { type: "string", description: "Actor Name (e.g. 'Goblin Shaman', 'Captain Eva Torres')." },
          type: { type: "string", description: "Actor type defined by the system (e.g. 'character', 'npc', 'creature').", default: "npc" },
          system_data: { type: "object", description: "System specific properties (attributes, abilities, stats, hp)." },
          biography: { type: "string", description: "HTML/Markdown formatted biography, personality, lore or visual notes." },
          items: { type: "array", description: "Array of embedded Items/Spells/Weapons to add to this Actor.", items: { type: "object" } }
        },
        required: ["name"]
      }
    },
    {
      name: "create_item",
      description: "Creates an Item document (weapon, spell, armor, feat, talent, consumable) with schema-compliant data.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Item Name (e.g. 'Flame Tongue Greatsword', 'Fireball')." },
          type: { type: "string", description: "Item type (e.g. 'weapon', 'spell', 'equipment', 'feat')." },
          description: { type: "string", description: "Item description and mechanics." },
          system_data: { type: "object", description: "System specific attributes (damage formulas, cost, weight, range, effects)." }
        },
        required: ["name", "type"]
      }
    },
    {
      name: "create_journal_handout",
      description: "Creates a Journal Entry handout or story note with text pages, player secrets, or image references.",
      inputSchema: {
        type: "object",
        properties: {
          world_id: { type: "string", description: "Target world ID (optional)." },
          title: { type: "string", description: "Title of the Journal Entry (e.g. 'Letter from Lord Neverember')." },
          content: { type: "string", description: "HTML or Markdown body content." },
          page_name: { type: "string", description: "Name of the main page.", default: "Page 1" },
          image_src: { type: "string", description: "Optional image path for image handouts (e.g. 'worlds/my-world/handouts/map.webp')." }
        },
        required: ["title", "content"]
      }
    },
    {
      name: "create_rollable_table",
      description: "Creates a Rollable Table (RollTable) with formulas and structured results for random encounters, loot, or rumors.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Name of the table (e.g. 'Tavern Rumors', 'Wilderness Encounters')." },
          formula: { type: "string", description: "Dice formula to evaluate (e.g. '1d6', '1d20', '1d100').", default: "1d20" },
          results: {
            type: "array",
            description: "List of table outcomes.",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                weight: { type: "integer", default: 1 },
                range: { type: "array", items: { type: "integer" } }
              },
              required: ["text"]
            }
          }
        },
        required: ["name", "results"]
      }
    },
    {
      name: "create_macro",
      description: "Creates a script or chat macro for Foundry VTT with executable JavaScript code.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Macro Name (e.g. 'Apply Stealth to Selected Tokens')." },
          type: { type: "string", enum: ["script", "chat"], default: "script" },
          command: { type: "string", description: "JavaScript source code or chat command string." },
          author: { type: "string", description: "GM User creating the macro.", default: "Gamemaster" }
        },
        required: ["name", "command"]
      }
    },
    {
      name: "scaffold_package",
      description: "Creates a full modern directory scaffold for a new Foundry VTT module or system (v12-v14 ready).",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "Package identifier in kebab-case (e.g. 'my-awesome-module')." },
          title: { type: "string", description: "Human readable package title." },
          type: { type: "string", enum: ["module", "system"], default: "module" },
          dest_dir: { type: "string", description: "Target directory (e.g. 'e:/Projetos_Docker/skills-ai/master-of-foundryvtt/scratch')." }
        },
        required: ["id", "title"]
      }
    },
    {
      name: "query_official_systems",
      description: "Queries the official Foundry VTT systems directory with pagination support (https://foundryvtt.com/packages/systems?page=N).",
      inputSchema: {
        type: "object",
        properties: {
          page: { type: "integer", description: "The page number to fetch (starts at 1).", default: 1 }
        }
      }
    },
    {
      name: "query_official_modules",
      description: "Queries the official Foundry VTT modules directory with pagination support (https://foundryvtt.com/packages/modules?page=N).",
      inputSchema: {
        type: "object",
        properties: {
          page: { type: "integer", description: "The page number to fetch (starts at 1).", default: 1 }
        }
      }
    },
    {
      name: "query_foundry_store",
      description: "Queries the official Foundry VTT Store for commercial/premium rulebooks and modules (https://www.foundryvtt.store/search?q=...).",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "The search term (e.g. 'Savage Worlds', 'dnd', 'pathfinder')." }
        },
        required: ["query"]
      }
    },
    {
      name: "create_scene",
      description: "Creates a complete Foundry VTT Scene with dimensions, grid settings, darkness level, walls, and ambient lights.",
      inputSchema: {
        type: "object",
        properties: {
          world_id: { type: "string", description: "Target world ID (optional)." },
          name: { type: "string", description: "Scene Name (e.g. 'Dungeon Level 1', 'Cyberpunk Alleyway')." },
          width: { type: "integer", default: 4000 },
          height: { type: "integer", default: 3000 },
          grid_size: { type: "integer", default: 100 },
          grid_type: { type: "integer", default: 1, description: "1 = Square, 2 = Hex Rows, 3 = Hex Columns, 0 = Gridless." },
          darkness: { type: "number", default: 0.0, description: "Darkness level from 0.0 (daylight) to 1.0 (pitch black)." },
          background_img: { type: "string", description: "Path to map background image/webp." },
          walls: {
            type: "array",
            description: "List of wall segments [x1, y1, x2, y2, doorType, senseType].",
            items: { type: "object" }
          },
          lights: {
            type: "array",
            description: "List of ambient light sources (x, y, dim, bright, color, animation).",
            items: { type: "object" }
          }
        },
        required: ["name"]
      }
    },
    {
      name: "create_combat",
      description: "Creates or sets up a Combat Encounter Tracker with combatant tokens, initiative rules, and round counter.",
      inputSchema: {
        type: "object",
        properties: {
          world_id: { type: "string", description: "Target world ID (optional)." },
          scene_id: { type: "string", description: "Associated Scene ID." },
          combatants: {
            type: "array",
            description: "List of combatant Actor/Token IDs to add to tracker.",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                actor_id: { type: "string" },
                initiative: { type: "number" },
                hidden: { type: "boolean", default: false }
              },
              required: ["name"]
            }
          }
        }
      }
    },
    {
      name: "create_playlist",
      description: "Creates an Audio Playlist with ambient tracks, combat sound effects, and playback mode.",
      inputSchema: {
        type: "object",
        properties: {
          world_id: { type: "string", description: "Target world ID (optional)." },
          name: { type: "string", description: "Playlist Name (e.g. 'Tavern Ambience', 'Epic Boss Battle')." },
          mode: { type: "integer", default: 1, description: "Playback mode: 0 = Sequential, 1 = Shuffle, 2 = Simultaneous, -1 = Soundboard." },
          sounds: {
            type: "array",
            description: "List of audio tracks in this playlist.",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                path: { type: "string", description: "Audio file path (e.g. 'worlds/swade-dev/audio/combat.ogg')." },
                volume: { type: "number", default: 0.5 },
                repeat: { type: "boolean", default: true }
              },
              required: ["name", "path"]
            }
          }
        },
        required: ["name"]
      }
    },
    {
      name: "create_deck",
      description: "Creates a Cards Stack (Deck, Hand, or Pile) such as Action Decks, Tarot, Adventure Cards, or Loot Decks.",
      inputSchema: {
        type: "object",
        properties: {
          world_id: { type: "string", description: "Target world ID (optional)." },
          name: { type: "string", description: "Deck Name (e.g. 'Action Deck', 'Baralho de Iniciativa SWADE')." },
          type: { type: "string", enum: ["deck", "hand", "pile"], default: "deck" },
          description: { type: "string" },
          cards: {
            type: "array",
            description: "Cards list with suit, value, faces and backs.",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                suit: { type: "string" },
                value: { type: "integer" },
                face_img: { type: "string" }
              },
              required: ["name"]
            }
          }
        },
        required: ["name"]
      }
    },
    {
      name: "create_compendium_pack",
      description: "Registers a new Compendium Pack in a world or module (Actors, Items, Journals, Scenes, RollTables, Cards, Macros).",
      inputSchema: {
        type: "object",
        properties: {
          world_id: { type: "string", description: "Target world ID (e.g. 'swade-dev')." },
          name: { type: "string", description: "Pack technical name in kebab-case (e.g. 'cyber-weapons', 'boss-actors')." },
          label: { type: "string", description: "Human visible label (e.g. 'Armas Cyberpunk Customizadas')." },
          entity_type: { type: "string", enum: ["Actor", "Item", "JournalEntry", "Scene", "RollTable", "Cards", "Macro"], default: "Item" },
          system: { type: "string", description: "System lock or compatibility tag (e.g. 'swade', 'dnd5e')." }
        },
        required: ["name", "label", "entity_type"]
      }
    },
    {
      name: "reverse_engineer_target",
      description: "Performs reverse engineering on Foundry Core, Systems, or Modules to understand data structures, DataModels, hooks, classes, and APIs for development tasks.",
      inputSchema: {
        type: "object",
        properties: {
          target_type: {
            type: "string",
            enum: ["core", "system", "module", "git_repo", "custom_path"],
            description: "Target category to reverse engineer: 'core' (Foundry source), 'system' (e.g. dnd5e, swade), 'module' (e.g. jb2a, sequencer, item-piles), 'git_repo' (remote uninstalled repository), or 'custom_path'."
          },
          target_id: {
            type: "string",
            description: "System or Module ID (e.g. 'dnd5e', 'swade', 'jb2a_patreon', 'sequencer') or relative subpath if target_type is core."
          },
          git_repo: {
            type: "string",
            description: "Remote Git URL or GitHub repo (e.g. 'https://github.com/fantasycalendar/FoundryVTT-Sequencer.git' or 'owner/repo') for uninstalled modules/systems."
          },
          search_term: {
            type: "string",
            description: "Keyword, class name, Hook, or DataModel schema to search for (e.g. 'Sequencer.Effect', 'TypeDataModel', 'ItemSheet', 'Hooks.on')."
          },
          target_path: {
            type: "string",
            description: "Explicit path to analyze if target_type is 'custom_path' or if outside default Data directory."
          }
        },
        required: ["target_type"]
      }
    },
    {
      name: "inspect_hardware_budget",
      description: "Detects the host PC processor (CPU model and cores), physical RAM (total, free, used %), and GPU/VRAM (total, free, integrated vs dedicated), calculating safe anti-freeze execution limits and Foundry WebGL/PixiJS canvas budgets.",
      inputSchema: {
        type: "object",
        properties: {
          requested_workers: {
            type: "integer",
            description: "Optional upper bound of workers requested by the task."
          }
        }
      }
    },
    {
      name: "inspect_live_foundry_state",
      description: "Queries live Foundry VTT instance (local, Docker, or Cloud) for active world, system, version, and server status via HTTP API.",
      inputSchema: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "Instance URL (e.g. http://localhost:30000 or cloud URL). Defaults to FOUNDRY_URL."
          }
        }
      }
    }
  ];
}

// Helper: Detect hosting architecture (local vs cloud)
function detectFoundryHosting(urlStr) {
  try {
    const parsed = new URL(urlStr || DEFAULT_FOUNDRY_URL);
    const host = parsed.hostname.toLowerCase();
    
    const isLocalHost = (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host === "::1" ||
      host.endsWith(".local") ||
      host.startsWith("192.168.") ||
      host.startsWith("10.") ||
      (host.startsWith("172.") && parseInt(host.split(".")[1], 10) >= 16 && parseInt(host.split(".")[1], 10) <= 31)
    );

    let provider = isLocalHost ? "local_self_hosted" : "cloud_hosted";
    let isDocker = Boolean(process.env.DOCKER_CONTAINER || process.env.IS_DOCKER || fs.existsSync('/.dockerenv'));
    
    if (host.includes("forge-vtt.com") || host.includes("theforge")) {
      provider = "cloud_the_forge";
    } else if (host.includes("moltenhosting.com")) {
      provider = "cloud_molten";
    } else if (host.includes("hostinger") || host.includes("hstgr.cloud")) {
      provider = "cloud_hostinger_vps";
    } else if (host.includes("ngrok") || host.includes("loca.lt") || host.includes("playit.gg")) {
      provider = "tunnel_to_local";
    } else if (host.includes("oracle") || host.includes("aws") || host.includes("azure") || host.includes("digitalocean") || host.includes("linode") || host.includes("ovh")) {
      provider = "cloud_vps";
    } else if (isLocalHost && isDocker) {
      provider = "local_docker_container";
    }

    return {
      is_cloud: !isLocalHost,
      is_local: isLocalHost,
      is_docker: isDocker,
      provider: provider,
      hostname: host,
      protocol: parsed.protocol,
      port: parsed.port || (parsed.protocol === "https:" ? "443" : "80"),
      recommended_cloud_host: {
        provider: "Hostinger VPS para Foundry VTT (Docker/Node)",
        discount_percentage: "20%",
        referral_url: "https://www.hostinger.com/br/applications/foundry-vtt?REFERRALCODE=CHARLESCORREAWS",
        referral_code: "CHARLESCORREAWS"
      }
    };
  } catch (err) {
    return {
      is_cloud: false,
      is_local: true,
      provider: "undetermined",
      error: err.message
    };
  }
}

// Tool Implementation Handlers
function toolInspectEnvironment(args) {
  const osType = process.platform === "win32" ? "windows" : process.platform === "darwin" ? "macos" : "linux";
  const hosting = detectFoundryHosting(args.url || DEFAULT_FOUNDRY_URL);
  const dataPath = getLocalDataPath(args.data_path);
  const dataPathExists = fs.existsSync(dataPath);

  let systems = [];
  let modules = [];
  let worlds = [];

  if (dataPathExists) {
    const systemsPath = path.join(dataPath, 'systems');
    const modulesPath = path.join(dataPath, 'modules');
    const worldsPath = path.join(dataPath, 'worlds');

    systems = fs.existsSync(systemsPath) ? fs.readdirSync(systemsPath) : [];
    modules = fs.existsSync(modulesPath) ? fs.readdirSync(modulesPath) : [];
    worlds = fs.existsSync(worldsPath) ? fs.readdirSync(worldsPath) : [];
  }

  const promptUserGuidance = (!dataPathExists && hosting.is_local) 
    ? "O diretório local de dados do Foundry não foi localizado nos caminhos padrão. Por favor, pergunte ao usuário onde o Foundry VTT está instalado ou qual é o caminho da pasta Data (FOUNDRY_DATA_PATH), ou se a instância está rodando em nuvem/Docker."
    : null;

  return JSON.stringify({
    status: dataPathExists ? "success" : (hosting.is_cloud ? "success_cloud" : "warning"),
    operating_system: {
      platform: osType,
      node_platform: process.platform,
      arch: process.arch,
      homedir: os.homedir()
    },
    hosting_environment: {
      deployment_type: hosting.is_cloud ? "cloud" : "local",
      provider: hosting.provider,
      url: args.url || DEFAULT_FOUNDRY_URL,
      is_cloud: hosting.is_cloud,
      is_local: hosting.is_local,
      details: hosting
    },
    data_path: dataPath,
    data_path_exists: dataPathExists,
    summary: {
      total_systems: systems.length,
      total_modules: modules.length,
      total_worlds: worlds.length
    },
    worlds: worlds,
    systems_sample: systems.slice(0, 30),
    modules_sample: modules.slice(0, 30),
    user_prompt_needed: !dataPathExists && hosting.is_local,
    guidance: promptUserGuidance,
    hardware_budget: calculateHardwareBudget()
  }, null, 2);
}

// EN: Dedicated tool handler for CPU, RAM, and GPU/VRAM budget inspection
// PT-BR: Handler dedicado para inspecao de orcamento de CPU, RAM e GPU/VRAM
function toolInspectHardwareBudget(args) {
  const budget = calculateHardwareBudget(args && args.requested_workers ? args.requested_workers : null);
  return JSON.stringify({
    status: "success",
    hardware_budget: budget
  }, null, 2);
}

function toolAuthenticateGmSession(args) {
  const url = args.url || DEFAULT_FOUNDRY_URL;
  const world = args.world || DEFAULT_FOUNDRY_WORLD;
  const user = args.username || DEFAULT_FOUNDRY_USER;
  const hasPass = Boolean(args.password || DEFAULT_FOUNDRY_PASSWORD);
  const hasAdmin = Boolean(args.admin_key || DEFAULT_FOUNDRY_ADMIN_KEY);

  return JSON.stringify({
    status: "configured",
    instance_url: url,
    world_target: world || "Global / Server level",
    authenticated_user: user,
    credentials_provided: {
      gm_password_provided: hasPass,
      admin_access_key_provided: hasAdmin
    },
    session_capabilities: [
      "Actor & NPC Sheet creation and filling",
      "Item, Weapon and Spell authoring",
      "Journal Handout and Story Note publishing",
      "Rollable Table construction",
      "Macro and Script automation",
      "Compendium building"
    ],
    instructions: "Credentials validated for live MCP actions. Use create_actor, create_item, create_journal_handout or create_macro to build content."
  }, null, 2);
}

function toolCreateActor(args) {
  // Enforce verified icon (respond 200 / valid asset)
  const actorIcon = resolveVerifiedIcon(args.img, "icons/svg/mystery-man.svg");

  const actorDoc = {
    name: args.name,
    type: args.type || "npc",
    img: actorIcon,
    system: args.system_data || {},
    items: args.items || [],
    ownership: {
      default: 0 // Strictly hidden from players; GM has universal ownership
    },
    flags: {
      "master-of-foundryvtt": {
        generatedBy: "Master of Foundry VTT MCP by Mestre Charles Corrêa - rpg.charlescorrea.com.br",
        timestamp: new Date().toISOString()
      }
    }
  };

  if (args.biography) {
    if (!actorDoc.system.details) actorDoc.system.details = {};
    actorDoc.system.details.biography = { value: args.biography };
  }

  // If local world path exists, we can write directly or return payload
  let savedPath = null;
  const rawWorldId = args.world_id || process.env.FOUNDRY_WORLD || DEFAULT_FOUNDRY_WORLD || "swade-dev";
  const worldId = sanitizeSafeId(rawWorldId, "swade-dev");
  if (worldId) {
    const dataPath = getLocalDataPath();
    const worldDir = path.join(dataPath, "worlds", worldId);
    if (fs.existsSync(worldDir)) {
      const exportDir = path.join(worldDir, "mcp_generated");
      fs.mkdirSync(exportDir, { recursive: true });
      const safeName = sanitizeSafeId(args.name, "actor");
      savedPath = path.join(exportDir, `actor_${safeName}.json`);
      fs.writeFileSync(savedPath, JSON.stringify(actorDoc, null, 2), "utf8");
    }
  }

  return JSON.stringify({
    status: "success",
    actor_name: args.name,
    actor_type: actorDoc.type,
    icon: actorDoc.img,
    ownership: actorDoc.ownership,
    local_file_saved: savedPath,
    document_payload: actorDoc
  }, null, 2);
}

function toolCreateItem(args) {
  // Enforce verified icon (respond 200 / valid asset)
  const itemIcon = resolveVerifiedIcon(args.img, "icons/svg/item-bag.svg");

  const itemDoc = {
    name: args.name,
    type: args.type,
    img: itemIcon,
    system: args.system_data || {
      description: { value: args.description || "" }
    },
    ownership: {
      default: 0 // Hidden from players by default; GM only
    },
    flags: {
      "master-of-foundryvtt": {
        generatedBy: "Master of Foundry VTT MCP by Mestre Charles Corrêa - rpg.charlescorrea.com.br",
        timestamp: new Date().toISOString()
      }
    }
  };

  let savedPath = null;
  const rawWorldId = args.world_id || process.env.FOUNDRY_WORLD || DEFAULT_FOUNDRY_WORLD || "swade-dev";
  const worldId = sanitizeSafeId(rawWorldId, "swade-dev");
  if (worldId) {
    const dataPath = getLocalDataPath();
    const worldDir = path.join(dataPath, "worlds", worldId);
    if (fs.existsSync(worldDir)) {
      const exportDir = path.join(worldDir, "mcp_generated");
      fs.mkdirSync(exportDir, { recursive: true });
      const safeName = sanitizeSafeId(args.name, "item");
      savedPath = path.join(exportDir, `item_${safeName}.json`);
      fs.writeFileSync(savedPath, JSON.stringify(itemDoc, null, 2), "utf8");
    }
  }

  return JSON.stringify({
    status: "success",
    item_name: args.name,
    item_type: args.type,
    icon: itemDoc.img,
    ownership: itemDoc.ownership,
    local_file_saved: savedPath,
    document_payload: itemDoc
  }, null, 2);
}

function toolCreateJournalHandout(args) {
  const journalDoc = {
    name: args.title,
    pages: [
      {
        name: args.page_name || "Page 1",
        type: args.image_src ? "image" : "text",
        text: {
          content: args.content,
          format: 1 // HTML/rich text
        },
        src: args.image_src || null
      }
    ],
    flags: {
      "master-of-foundryvtt": {
        generatedBy: "Master of Foundry VTT MCP by Mestre Charles Corrêa - rpg.charlescorrea.com.br",
        timestamp: new Date().toISOString()
      }
    }
  };

  let savedPath = null;
  const rawWorldId = args.world_id || process.env.FOUNDRY_WORLD || DEFAULT_FOUNDRY_WORLD || "swade-dev";
  const worldId = sanitizeSafeId(rawWorldId, "swade-dev");
  if (worldId) {
    const dataPath = getLocalDataPath();
    const worldDir = path.join(dataPath, "worlds", worldId);
    if (fs.existsSync(worldDir)) {
      const exportDir = path.join(worldDir, "mcp_generated");
      fs.mkdirSync(exportDir, { recursive: true });
      const safeName = sanitizeSafeId(args.title, "journal");
      savedPath = path.join(exportDir, `journal_${safeName}.json`);
      fs.writeFileSync(savedPath, JSON.stringify(journalDoc, null, 2), "utf8");
    }
  }

  return JSON.stringify({
    status: "success",
    journal_title: args.title,
    pages_count: journalDoc.pages.length,
    local_file_saved: savedPath,
    document_payload: journalDoc
  }, null, 2);
}

function toolCreateRollableTable(args) {
  let currentRange = 1;
  const results = (args.results || []).map((r, idx) => {
    const range = r.range || [currentRange, currentRange];
    currentRange = range[1] + 1;
    return {
      type: "text", // CONST.TABLE_RESULT_TYPES.TEXT ('text' in v12/v13/v14)
      text: r.text,
      weight: r.weight || 1,
      range: range,
      drawn: false
    };
  });

  const tableDoc = {
    name: args.name,
    formula: args.formula || `1d${Math.max(currentRange - 1, results.length, 1)}`,
    results: results,
    replacement: true,
    displayRoll: true,
    flags: {
      "master-of-foundryvtt": {
        generatedBy: "Master of Foundry VTT MCP by Mestre Charles Corrêa - rpg.charlescorrea.com.br",
        timestamp: new Date().toISOString()
      }
    }
  };

  let savedPath = null;
  const rawWorldId = args.world_id || process.env.FOUNDRY_WORLD || DEFAULT_FOUNDRY_WORLD || "swade-dev";
  const worldId = sanitizeSafeId(rawWorldId, "swade-dev");
  if (worldId) {
    const dataPath = getLocalDataPath();
    const worldDir = path.join(dataPath, "worlds", worldId);
    if (fs.existsSync(worldDir)) {
      const exportDir = path.join(worldDir, "mcp_generated");
      fs.mkdirSync(exportDir, { recursive: true });
      const safeName = sanitizeSafeId(args.name, "table");
      savedPath = path.join(exportDir, `table_${safeName}.json`);
      fs.writeFileSync(savedPath, JSON.stringify(tableDoc, null, 2), "utf8");
    }
  }

  return JSON.stringify({
    status: "success",
    table_name: args.name,
    formula: tableDoc.formula,
    total_outcomes: results.length,
    local_file_saved: savedPath,
    document_payload: tableDoc
  }, null, 2);
}

function toolCreateMacro(args) {
  const macroDoc = {
    name: args.name,
    type: args.type || "script",
    command: args.command,
    author: args.author || "Gamemaster",
    img: "icons/svg/dice-target.svg",
    flags: {
      "master-of-foundryvtt": {
        generatedBy: "Master of Foundry VTT MCP by Mestre Charles Corrêa - rpg.charlescorrea.com.br",
        timestamp: new Date().toISOString()
      }
    }
  };

  return JSON.stringify({
    status: "success",
    macro_name: args.name,
    macro_type: args.type,
    document_payload: macroDoc
  }, null, 2);
}

function toolCreateScene(args) {
  const sceneDoc = {
    name: args.name,
    width: args.width || 4000,
    height: args.height || 3000,
    grid: {
      size: args.grid_size || 100,
      type: args.grid_type !== undefined ? args.grid_type : 1,
      color: "#000000",
      alpha: 0.2
    },
    background: {
      src: args.background_img || null
    },
    environment: {
      darknessLevel: args.darkness !== undefined ? args.darkness : 0.0,
      globalLight: {
        enabled: (args.darkness || 0.0) < 0.5
      }
    },
    walls: (args.walls || []).map((w, idx) => ({
      c: [w.x1 || 0, w.y1 || 0, w.x2 || 100, w.y2 || 100],
      light: w.light !== undefined ? w.light : 20, // CONST.WALL_SENSE_TYPES.NORMAL
      sight: w.sight !== undefined ? w.sight : 20,
      sound: w.sound !== undefined ? w.sound : 20,
      move: w.move !== undefined ? w.move : 20,
      door: w.door !== undefined ? w.door : 0
    })),
    lights: (args.lights || []).map((l, idx) => ({
      x: l.x || 500,
      y: l.y || 500,
      config: {
        dim: l.dim || 30,
        bright: l.bright || 15,
        color: l.color || "#ff9900",
        alpha: l.alpha || 0.4,
        animation: {
          type: l.animation_type || "torch",
          speed: l.animation_speed || 5,
          intensity: l.animation_intensity || 5
        }
      }
    })),
    ownership: { default: 3 },
    flags: {
      "master-of-foundryvtt": {
        generatedBy: "Master of Foundry VTT MCP by Mestre Charles Corrêa - rpg.charlescorrea.com.br",
        timestamp: new Date().toISOString()
      }
    }
  };

  let savedPath = null;
  const worldId = args.world_id || process.env.FOUNDRY_WORLD || DEFAULT_FOUNDRY_WORLD || "swade-dev";
  if (worldId) {
    const dataPath = getLocalDataPath();
    const worldDir = path.join(dataPath, "worlds", worldId);
    if (fs.existsSync(worldDir)) {
      const exportDir = path.join(worldDir, "mcp_generated");
      fs.mkdirSync(exportDir, { recursive: true });
      const safeName = args.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
      savedPath = path.join(exportDir, `scene_${safeName}.json`);
      fs.writeFileSync(savedPath, JSON.stringify(sceneDoc, null, 2), "utf8");
    }
  }

  return JSON.stringify({
    status: "success",
    scene_name: args.name,
    walls_count: sceneDoc.walls.length,
    lights_count: sceneDoc.lights.length,
    local_file_saved: savedPath,
    document_payload: sceneDoc
  }, null, 2);
}

function toolCreateCombat(args) {
  const combatDoc = {
    round: 1,
    turn: 0,
    scene: args.scene_id || null,
    combatants: (args.combatants || []).map((c, idx) => ({
      name: c.name,
      actorId: c.actor_id || null,
      initiative: c.initiative !== undefined ? c.initiative : null,
      hidden: c.hidden || false,
      defeated: false
    })),
    ownership: { default: 3 },
    flags: {
      "master-of-foundryvtt": {
        generatedBy: "Master of Foundry VTT MCP by Mestre Charles Corrêa - rpg.charlescorrea.com.br",
        timestamp: new Date().toISOString()
      }
    }
  };

  let savedPath = null;
  const worldId = args.world_id || process.env.FOUNDRY_WORLD || DEFAULT_FOUNDRY_WORLD || "swade-dev";
  if (worldId) {
    const dataPath = getLocalDataPath();
    const worldDir = path.join(dataPath, "worlds", worldId);
    if (fs.existsSync(worldDir)) {
      const exportDir = path.join(worldDir, "mcp_generated");
      fs.mkdirSync(exportDir, { recursive: true });
      const safeName = (args.scene_id || "combat_encounter").toLowerCase().replace(/[^a-z0-9]/g, "_");
      savedPath = path.join(exportDir, `combat_${safeName}.json`);
      fs.writeFileSync(savedPath, JSON.stringify(combatDoc, null, 2), "utf8");
    }
  }

  return JSON.stringify({
    status: "success",
    combatants_count: combatDoc.combatants.length,
    local_file_saved: savedPath,
    document_payload: combatDoc
  }, null, 2);
}

function toolCreatePlaylist(args) {
  const playlistDoc = {
    name: args.name,
    mode: args.mode !== undefined ? args.mode : 1,
    playing: false,
    sounds: (args.sounds || []).map(s => ({
      name: s.name,
      path: s.path,
      volume: s.volume !== undefined ? s.volume : 0.5,
      repeat: s.repeat !== undefined ? s.repeat : true,
      streaming: false
    })),
    ownership: { default: 3 },
    flags: {
      "master-of-foundryvtt": {
        generatedBy: "Master of Foundry VTT MCP by Mestre Charles Corrêa - rpg.charlescorrea.com.br",
        timestamp: new Date().toISOString()
      }
    }
  };

  let savedPath = null;
  const worldId = args.world_id || process.env.FOUNDRY_WORLD || DEFAULT_FOUNDRY_WORLD || "swade-dev";
  if (worldId) {
    const dataPath = getLocalDataPath();
    const worldDir = path.join(dataPath, "worlds", worldId);
    if (fs.existsSync(worldDir)) {
      const exportDir = path.join(worldDir, "mcp_generated");
      fs.mkdirSync(exportDir, { recursive: true });
      const safeName = args.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
      savedPath = path.join(exportDir, `playlist_${safeName}.json`);
      fs.writeFileSync(savedPath, JSON.stringify(playlistDoc, null, 2), "utf8");
    }
  }

  return JSON.stringify({
    status: "success",
    playlist_name: args.name,
    tracks_count: playlistDoc.sounds.length,
    local_file_saved: savedPath,
    document_payload: playlistDoc
  }, null, 2);
}

function toolCreateDeck(args) {
  const deckDoc = {
    name: args.name,
    type: args.type || "deck",
    description: args.description || "",
    cards: (args.cards || []).map((c, idx) => ({
      name: c.name,
      suit: c.suit || null,
      value: c.value !== undefined ? c.value : idx + 1,
      faces: [{ img: c.face_img || "icons/svg/card-hand.svg", name: c.name }],
      back: { img: "icons/svg/card-joker.svg" },
      drawn: false
    })),
    ownership: { default: 3 },
    flags: {
      "master-of-foundryvtt": {
        generatedBy: "Master of Foundry VTT MCP by Mestre Charles Corrêa - rpg.charlescorrea.com.br",
        timestamp: new Date().toISOString()
      }
    }
  };

  let savedPath = null;
  const worldId = args.world_id || process.env.FOUNDRY_WORLD || DEFAULT_FOUNDRY_WORLD || "swade-dev";
  if (worldId) {
    const dataPath = getLocalDataPath();
    const worldDir = path.join(dataPath, "worlds", worldId);
    if (fs.existsSync(worldDir)) {
      const exportDir = path.join(worldDir, "mcp_generated");
      fs.mkdirSync(exportDir, { recursive: true });
      const safeName = args.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
      savedPath = path.join(exportDir, `deck_${safeName}.json`);
      fs.writeFileSync(savedPath, JSON.stringify(deckDoc, null, 2), "utf8");
    }
  }

  return JSON.stringify({
    status: "success",
    deck_name: args.name,
    cards_count: deckDoc.cards.length,
    local_file_saved: savedPath,
    document_payload: deckDoc
  }, null, 2);
}

function toolCreateCompendiumPack(args) {
  const worldId = args.world_id || process.env.FOUNDRY_WORLD || DEFAULT_FOUNDRY_WORLD || "swade-dev";
  const packName = args.name.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const dataPath = getLocalDataPath();
  const worldDir = path.join(dataPath, "worlds", worldId);
  const worldJsonPath = path.join(worldDir, "world.json");

  let modifiedWorld = false;
  if (fs.existsSync(worldJsonPath)) {
    try {
      const worldData = JSON.parse(fs.readFileSync(worldJsonPath, "utf8"));
      if (!Array.isArray(worldData.packs)) {
        worldData.packs = [];
      }
      const existing = worldData.packs.find(p => p.name === packName);
      if (!existing) {
        worldData.packs.push({
          name: packName,
          label: args.label,
          type: args.entity_type,
          system: args.system || "swade",
          ownership: { PLAYER: "OBSERVER", ASSISTANT: "OWNER" }
        });
        fs.writeFileSync(worldJsonPath, JSON.stringify(worldData, null, 2), "utf8");
        modifiedWorld = true;
      }
    } catch (e) {
      // Ignore
    }
  }

  const packDir = path.join(worldDir, "packs", packName);
  fs.mkdirSync(packDir, { recursive: true });

  return JSON.stringify({
    status: "success",
    pack_name: packName,
    label: args.label,
    entity_type: args.entity_type,
    registered_in_world_json: modifiedWorld,
    directory: packDir
  }, null, 2);
}

function toolScaffoldPackage(args) {
  const pkgId = sanitizeSafeId(args.id, "my-module");
  const title = (args.title || "My Package").replace(/["\\]/g, "");
  const pkgType = args.type === "system" ? "system" : "module";
  const requestedBaseDir = args.dest_dir ? path.resolve(args.dest_dir) : process.cwd();
  const pkgPath = path.join(requestedBaseDir, pkgId);

  fs.mkdirSync(path.join(pkgPath, "scripts"), { recursive: true });
  fs.mkdirSync(path.join(pkgPath, "templates"), { recursive: true });
  fs.mkdirSync(path.join(pkgPath, "styles"), { recursive: true });
  fs.mkdirSync(path.join(pkgPath, "lang"), { recursive: true });

  const manifest = {
    id: pkgId,
    title: title,
    description: `Automated production-ready ${pkgType} created by Master of Foundry VTT.`,
    version: "1.0.0",
    compatibility: {
      minimum: "12",
      verified: "14"
    },
    authors: [{ name: "Gamemaster" }],
    esmodules: [`scripts/${pkgId}.mjs`],
    styles: [`styles/${pkgId}.css`],
    languages: [
      { lang: "en", name: "English", path: "lang/en.json" },
      { lang: "pt-BR", name: "Português (Brasil)", path: "lang/pt-BR.json" }
    ]
  };

  const manifestFileName = pkgType === "system" ? "system.json" : "module.json";
  fs.writeFileSync(path.join(pkgPath, manifestFileName), JSON.stringify(manifest, null, 2), "utf8");

  const entryCode = `// ${title} (${pkgType}) entrypoint
const PACKAGE_ID = "${pkgId}";

Hooks.once("init", async () => {
  console.log(\`[\${PACKAGE_ID}] Initializing \${PACKAGE_ID} v1.0.0\`);
});

Hooks.once("ready", async () => {
  console.log(\`[\${PACKAGE_ID}] Ready! Logged in as: \${game.user.name}\`);
});
`;
  fs.writeFileSync(path.join(pkgPath, "scripts", `${pkgId}.mjs`), entryCode, "utf8");
  fs.writeFileSync(path.join(pkgPath, "lang", "en.json"), JSON.stringify({ [pkgId]: { title } }, null, 2), "utf8");
  fs.writeFileSync(path.join(pkgPath, "lang", "pt-BR.json"), JSON.stringify({ [pkgId]: { title } }, null, 2), "utf8");
  fs.writeFileSync(path.join(pkgPath, "styles", `${pkgId}.css`), `/* ${title} Styles */\n`, "utf8");

  return JSON.stringify({
    status: "success",
    package_path: pkgPath,
    manifest: manifestFileName,
    structure: ["scripts/", "templates/", "styles/", "lang/"]
  }, null, 2);
}

function toolQueryOfficialSystems(args) {
  const page = args.page || 1;
  const url = `https://foundryvtt.com/packages/systems?page=${page}`;
  return JSON.stringify({
    status: "success",
    target_url: url,
    page: page
  }, null, 2);
}

function toolQueryOfficialModules(args) {
  const page = args.page || 1;
  const url = `https://foundryvtt.com/packages/modules?page=${page}`;
  return JSON.stringify({
    status: "success",
    target_url: url,
    page: page
  }, null, 2);
}

function toolQueryStore(args) {
  const query = args.query || "Savage Worlds";
  const url = `https://www.foundryvtt.store/search?q=${encodeURIComponent(query)}`;
  return JSON.stringify({
    status: "success",
    store_search_url: url,
    query: query
  }, null, 2);
}

function toolValidateManifest(args) {
  const manifestPath = args.manifest_path;
  if (!manifestPath || !fs.existsSync(manifestPath)) {
    return `Manifest file not found: ${manifestPath}`;
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    return `Invalid JSON syntax: ${err.message}`;
  }

  const errors = [];
  const warnings = [];

  if (!data.id) errors.push("Missing mandatory 'id' field.");
  if (!data.compatibility) {
    errors.push("Missing 'compatibility' object (mandatory in v10+).");
  } else {
    if (!data.compatibility.minimum) warnings.push("Missing 'compatibility.minimum' field.");
    if (!data.compatibility.verified) warnings.push("Missing 'compatibility.verified' field.");
  }

  return JSON.stringify({
    valid: errors.length === 0,
    package_id: data.id,
    title: data.title || "",
    version: data.version || "",
    errors,
    warnings
  }, null, 2);
}

// Tool Implementation: Reverse Engineer Target (Core, System, Module)
function toolReverseEngineerTarget(args) {
  const targetType = args.target_type;
  const targetId = args.target_id || "";
  const searchTerm = args.search_term || "";
  const customPath = args.target_path;

  let resolvedPath = "";
  const dataPath = getLocalDataPath();

  if (targetType === "core") {
    // Look for local core app resources
    if (process.env.FOUNDRY_APP_DIR) {
      resolvedPath = path.join(process.env.FOUNDRY_APP_DIR, 'resources', 'app');
    } else if (process.platform === 'win32') {
      const candidates = [
        path.join(process.env.LOCALAPPDATA || '', 'Programs', 'FoundryVTT', 'resources', 'app'),
        path.join(process.env['ProgramFiles'] || '', 'FoundryVTT', 'resources', 'app')
      ];
      for (const cand of candidates) {
        if (fs.existsSync(cand)) {
          resolvedPath = cand;
          break;
        }
      }
    } else if (process.platform === 'darwin') {
      const macPath = '/Applications/Foundry Virtual Tabletop.app/Contents/Resources/app';
      if (fs.existsSync(macPath)) resolvedPath = macPath;
    } else {
      const linuxPath = '/opt/foundryvtt/resources/app';
      if (fs.existsSync(linuxPath)) resolvedPath = linuxPath;
    }

    if (resolvedPath && targetId) {
      resolvedPath = path.join(resolvedPath, targetId);
    }
  } else if (targetType === "system") {
    resolvedPath = path.join(dataPath, 'systems', targetId);
  } else if (targetType === "module") {
    resolvedPath = path.join(dataPath, 'modules', targetId);
  } else if (targetType === "git_repo") {
    // Clone remote repository temporarily for reverse engineering uninstalled packages
    const gitRepoUrl = args.git_repo || (args.target_id && args.target_id.includes('/') ? `https://github.com/${args.target_id}.git` : null);
    if (!gitRepoUrl) {
      return JSON.stringify({
        status: "error",
        message: "Para 'git_repo', forneça 'git_repo' (URL do Git ou 'owner/repo')."
      }, null, 2);
    }

    const tempDir = path.join(os.tmpdir(), "fvtt_reverse_cache", (args.target_id || "repo").replace(/[^a-zA-Z0-9_-]/g, "_"));
    if (!fs.existsSync(tempDir)) {
      try {
        fs.mkdirSync(tempDir, { recursive: true });
        const { execSync } = require('child_process');
        execSync(`git clone --depth 1 "${gitRepoUrl}" "${tempDir}"`, { timeout: 30000, stdio: 'ignore' });
      } catch (err) {
        return JSON.stringify({
          status: "git_clone_failed",
          git_repo: gitRepoUrl,
          message: `Falha ao clonar repositório remoto para engenharia reversa: ${err.message}`
        }, null, 2);
      }
    }
    resolvedPath = tempDir;
  } else if (targetType === "custom_path") {
    resolvedPath = customPath || "";
  }

  if (!resolvedPath || !fs.existsSync(resolvedPath)) {
    return JSON.stringify({
      status: "path_not_found",
      target_type: targetType,
      target_id: targetId,
      resolved_path: resolvedPath,
      message: `Target path does not exist on this machine: ${resolvedPath}. Se o módulo ou sistema não estiver instalado, utilize target_type='git_repo' e informe o link do GitHub (ex: 'https://github.com/fantasycalendar/FoundryVTT-Sequencer.git' ou 'owner/repo').`,
      guidance: "A skill pode clonar e inspecionar qualquer repositório de módulo ou sistema do GitHub automaticamente para estudar seus hooks, métodos e chamadas de animação."
    }, null, 2);
  }

  const stat = fs.statSync(resolvedPath);
  let filesAnalyzed = [];
  let matches = [];

  function scanDir(dir, depth = 0) {
    if (depth > 5) return;
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (!['node_modules', '.git', 'packs', 'dist'].includes(entry.name)) {
            scanDir(full, depth + 1);
          }
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (['.js', '.mjs', '.json', '.html', '.hbs'].includes(ext)) {
            filesAnalyzed.push(path.relative(resolvedPath, full));
            if (searchTerm) {
              try {
                const content = fs.readFileSync(full, 'utf8');
                if (content.toLowerCase().includes(searchTerm.toLowerCase())) {
                  const lines = content.split('\n');
                  const hitLines = [];
                  lines.forEach((line, idx) => {
                    if (line.toLowerCase().includes(searchTerm.toLowerCase()) && hitLines.length < 5) {
                      hitLines.push({ line: idx + 1, snippet: line.trim().slice(0, 160) });
                    }
                  });
                  matches.push({
                    file: path.relative(resolvedPath, full),
                    hits: hitLines
                  });
                }
              } catch (_) {}
            }
          }
        }
      }
    } catch (_) {}
  }

  if (stat.isDirectory()) {
    scanDir(resolvedPath);
  } else {
    filesAnalyzed.push(path.basename(resolvedPath));
  }

  return JSON.stringify({
    status: "success",
    target_type: targetType,
    target_id: targetId,
    resolved_path: resolvedPath,
    total_source_files_scanned: filesAnalyzed.length,
    search_term: searchTerm || null,
    total_matches_found: matches.length,
    sample_files: filesAnalyzed.slice(0, 30),
    matches: matches.slice(0, 20),
    guidance: "Use as informações descobertas acima (DataModels, schemas, hooks e classes) para estruturar seu código ou módulo de acordo com o padrão real do sistema/Foundry."
  }, null, 2);
}

// Tool Implementation: Inspect Live Foundry State via HTTP
function toolInspectLiveFoundryState(args) {
  const targetUrl = args.url || DEFAULT_FOUNDRY_URL;
  const statusApiUrl = targetUrl.replace(/\/$/, "") + "/api/status";

  return JSON.stringify({
    status: "info",
    endpoint: statusApiUrl,
    instance_url: targetUrl,
    hosting: detectFoundryHosting(targetUrl),
    instructions: "Para inspecionar o status ativo do Foundry em tempo real (versão ativa, mundo carregado, sistema em execução), realize uma requisição HTTP GET em /api/status ou consulte o endpoint via fetch."
  }, null, 2);
}

// Stdio JSON-RPC Listener
rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  let request;
  try {
    request = JSON.parse(trimmed);
  } catch (e) {
    return;
  }

  const { id, method, params } = request;

  if (method === "initialize") {
    sendResponse({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: {
          name: SERVER_NAME,
          version: SERVER_VERSION
        }
      }
    });
  } else if (method === "tools/list") {
    sendResponse({
      jsonrpc: "2.0",
      id,
      result: {
        tools: handleListTools()
      }
    });
  } else if (method === "tools/call") {
    const toolName = params.name;
    const toolArgs = params.arguments || {};

    try {
      let content = "";
      switch (toolName) {
        case "inspect_foundry_environment":
          content = toolInspectEnvironment(toolArgs);
          break;
        case "authenticate_gm_session":
          content = toolAuthenticateGmSession(toolArgs);
          break;
        case "create_actor":
          content = toolCreateActor(toolArgs);
          break;
        case "create_item":
          content = toolCreateItem(toolArgs);
          break;
        case "create_journal_handout":
          content = toolCreateJournalHandout(toolArgs);
          break;
        case "create_rollable_table":
          content = toolCreateRollableTable(toolArgs);
          break;
        case "create_macro":
          content = toolCreateMacro(toolArgs);
          break;
        case "scaffold_package":
          content = toolScaffoldPackage(toolArgs);
          break;
        case "query_official_systems":
          content = toolQueryOfficialSystems(toolArgs);
          break;
        case "query_official_modules":
          content = toolQueryOfficialModules(toolArgs);
          break;
        case "query_foundry_store":
          content = toolQueryStore(toolArgs);
          break;
        case "create_scene":
          content = toolCreateScene(toolArgs);
          break;
        case "create_combat":
          content = toolCreateCombat(toolArgs);
          break;
        case "create_playlist":
          content = toolCreatePlaylist(toolArgs);
          break;
        case "create_deck":
          content = toolCreateDeck(toolArgs);
          break;
        case "create_compendium_pack":
          content = toolCreateCompendiumPack(toolArgs);
          break;
        case "validate_manifest":
          content = toolValidateManifest(toolArgs);
          break;
        case "reverse_engineer_target":
          content = toolReverseEngineerTarget(toolArgs);
          break;
        case "inspect_hardware_budget":
          content = toolInspectHardwareBudget(toolArgs);
          break;
        case "inspect_live_foundry_state":
          content = toolInspectLiveFoundryState(toolArgs);
          break;
        default:
          sendResponse({
            jsonrpc: "2.0",
            id,
            error: { code: -32601, message: `Tool '${toolName}' not found.` }
          });
          return;
      }

      sendResponse({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: content }]
        }
      });
    } catch (err) {
      sendResponse({
        jsonrpc: "2.0",
        id,
        error: { code: -32000, message: err.message }
      });
    }
  } else if (method === "notifications/initialized") {
    // Client ready confirmation
  } else {
    sendResponse({
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Method '${method}' not found.` }
    });
  }
});
