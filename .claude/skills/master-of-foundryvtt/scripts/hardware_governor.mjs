#!/usr/bin/env node
/**
 * Hardware Profiler (CPU, RAM, GPU & VRAM) and Adaptive Resource Governor (Node.js ESM).
 * Perfilador de Hardware (CPU, RAM, GPU e VRAM) e Governador Adaptativo de Recursos (Node.js ESM).
 * Author: GM Charles Correa (Master of Foundry VTT)
 */
import os from 'os';
import { execSync } from 'child_process';

/**
 * Lowers OS process priority so Node.js/FFmpeg tasks never freeze the host PC.
 * Reduz a prioridade do processo no SO para que tarefas Node.js/FFmpeg nunca travem o PC.
 */
export function applyLowProcessPriority() {
  try {
    os.setPriority(process.pid, os.constants.priority.PRIORITY_BELOW_NORMAL);
  } catch {}
}

/**
 * Detects GPU model and VRAM in MB across Windows, Linux, and macOS.
 * Detecta o modelo da GPU e a VRAM em MB no Windows, Linux e macOS.
 */
export function detectGpuAndVram() {
  const gpus = [];

  // 1. Try nvidia-smi for exact NVIDIA VRAM metrics / Tenta nvidia-smi para metricas exatas NVIDIA
  try {
    const out = execSync(
      'nvidia-smi --query-gpu=name,memory.total,memory.free,memory.used --format=csv,noheader,nounits',
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 3000 }
    );
    for (const line of out.trim().split(/\r?\n/)) {
      const parts = line.split(',').map(s => s.trim());
      if (parts.length >= 4) {
        gpus.push({
          name: parts[0],
          vram_total_mb: parseInt(parts[1], 10) || 2048,
          vram_free_mb: parseInt(parts[2], 10) || null,
          vram_used_mb: parseInt(parts[3], 10) || null,
          is_integrated: false,
          source: 'nvidia-smi'
        });
      }
    }
  } catch {}

  // 2. Windows Registry / PowerShell fallback for AMD, Intel, or NVIDIA GPUs
  // Fallback no Windows via Registro para GPUs AMD, Intel ou NVIDIA
  if (gpus.length === 0 && process.platform === 'win32') {
    try {
      const psCmd = `powershell -NoProfile -Command "Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0*' -ErrorAction SilentlyContinue | Select-Object DriverDesc, 'HardwareInformation.qwMemorySize', 'HardwareInformation.MemorySize' | ConvertTo-Json -Compress"`;
      const raw = execSync(psCmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 4000 }).trim();
      if (raw) {
        const parsed = JSON.parse(raw);
        const list = Array.isArray(parsed) ? parsed : [parsed];
        for (const item of list) {
          if (!item || !item.DriverDesc) continue;
          const desc = String(item.DriverDesc).trim();
          const lower = desc.toLowerCase();
          if (lower.includes('microsoft basic') || lower.includes('virtual') || lower.includes('parsec')) continue;

          let bytes = Number(item['HardwareInformation.qwMemorySize']) || 0;
          if (!bytes && Array.isArray(item['HardwareInformation.MemorySize'])) {
            const arr = item['HardwareInformation.MemorySize'];
            if (arr.length === 4) {
              bytes = (arr[0] | (arr[1] << 8) | (arr[2] << 16) | (arr[3] * 0x1000000)) >>> 0;
            }
          } else if (!bytes && typeof item['HardwareInformation.MemorySize'] === 'number') {
            bytes = item['HardwareInformation.MemorySize'];
          }

          const vramMb = bytes > 0 ? Math.round(bytes / (1024 * 1024)) : 1024;
          const isIgpu = (
            lower.includes('uhd') ||
            lower.includes('iris') ||
            lower.includes('hd graphics') ||
            lower.includes('radeon(tm) graphics') ||
            lower.includes('vega')
          ) && vramMb <= 2048;

          gpus.push({
            name: desc,
            vram_total_mb: vramMb,
            vram_free_mb: null,
            vram_used_mb: null,
            is_integrated: isIgpu,
            source: 'winreg'
          });
        }
      }
    } catch {}
  }

  if (gpus.length === 0) {
    gpus.push({
      name: 'Standard Graphics Adapter',
      vram_total_mb: 1024,
      vram_free_mb: null,
      vram_used_mb: null,
      is_integrated: true,
      source: 'fallback'
    });
  }

  return gpus;
}

/**
 * Calculates safe execution budget based on CPU, RAM, and GPU/VRAM.
 * Calcula o orcamento seguro de execucao com base no processador, RAM e GPU/VRAM.
 */
export function calculateSafeBudget(maxRamPercent = 78) {
  applyLowProcessPriority();

  const cpus = os.cpus() || [];
  const cpuModel = cpus[0]?.model ? cpus[0].model.trim() : 'Generic CPU';
  const logicalCores = cpus.length || 2;

  const totalRamGb = Number((os.totalmem() / (1024 ** 3)).toFixed(2));
  const availRamGb = Number((os.freemem() / (1024 ** 3)).toFixed(2));
  const usedRamGb = Number(Math.max(0, totalRamGb - availRamGb).toFixed(2));
  const usedPercent = totalRamGb > 0 ? Math.round((usedRamGb / totalRamGb) * 100) : 50;

  const gpus = detectGpuAndVram();
  const primaryGpu = [...gpus].sort((a, b) => {
    if (a.is_integrated !== b.is_integrated) return a.is_integrated ? 1 : -1;
    return b.vram_total_mb - a.vram_total_mb;
  })[0];

  const vramMb = primaryGpu.vram_total_mb;
  const isIgpu = primaryGpu.is_integrated;
  const effectiveFreeRamGb = availRamGb - (isIgpu ? 0.75 : 0);

  let maxWorkers = 1;
  let ffmpegThreads = 1;
  let batchSize = 15;
  let delayMs = 80;
  let profileTier = 'ECO-STRICT (Low RAM/CPU or High Load)';

  if (effectiveFreeRamGb < 2.5 || usedPercent >= maxRamPercent || logicalCores <= 2) {
    maxWorkers = 1;
    ffmpegThreads = 1;
    batchSize = 15;
    delayMs = 80;
  } else if (effectiveFreeRamGb < 5.5 || isIgpu || logicalCores <= 6) {
    maxWorkers = logicalCores >= 4 && usedPercent < 70 ? 2 : 1;
    ffmpegThreads = logicalCores >= 4 ? 2 : 1;
    batchSize = 25;
    delayMs = 45;
    profileTier = 'ECO-BALANCED (Shared iGPU VRAM / Moderate Headroom)';
  } else {
    maxWorkers = logicalCores <= 12 ? 2 : 3;
    ffmpegThreads = logicalCores >= 8 ? 3 : 2;
    batchSize = 40;
    delayMs = 25;
    profileTier = 'ECO-ADAPTIVE (Dedicated GPU & High RAM Headroom, Capped at ~25% CPU)';
  }

  const webglBudget = (vramMb <= 1536 || isIgpu)
    ? {
        vram_tier: 'LOW_OR_SHARED_VRAM',
        max_recommended_map_resolution_px: '4096x4096',
        max_concurrent_webm_animated_tiles: 3,
        recommended_webp_quality: 85
      }
    : (vramMb <= 4096)
      ? {
          vram_tier: 'MID_VRAM',
          max_recommended_map_resolution_px: '8192x8192',
          max_concurrent_webm_animated_tiles: 8,
          recommended_webp_quality: 90
        }
      : {
          vram_tier: 'HIGH_DEDICATED_VRAM',
          max_recommended_map_resolution_px: '16384x16384',
          max_concurrent_webm_animated_tiles: 16,
          recommended_webp_quality: 95
        };

  return {
    cpu: {
      model: cpuModel,
      logical_cores: logicalCores,
      architecture: process.arch
    },
    ram: {
      total_gb: totalRamGb,
      available_gb: availRamGb,
      used_gb: usedRamGb,
      used_percent: usedPercent
    },
    primary_gpu: primaryGpu,
    gpus,
    limits: {
      profile_tier: profileTier,
      process_priority: 'BELOW_NORMAL (Anti-Freeze Active)',
      max_workers: maxWorkers,
      ffmpeg_threads: ffmpegThreads,
      batch_size: batchSize,
      batch_delay_ms: delayMs,
      max_ram_percent_ceiling: maxRamPercent
    },
    foundry_vram_canvas_budget: webglBudget
  };
}

/**
 * Async pause & memory pressure guard between batch items.
 * Pausa assincrona e guarda de pressao de memoria entre itens de lote.
 */
export async function sleepAndGuardMemory(budget) {
  const totalGb = os.totalmem() / (1024 ** 3);
  const availGb = os.freemem() / (1024 ** 3);
  const usedPct = totalGb > 0 ? Math.round(((totalGb - availGb) / totalGb) * 100) : 50;
  const maxPct = budget?.limits?.max_ram_percent_ceiling || 78;
  const delayMs = budget?.limits?.batch_delay_ms ?? 40;

  if (global.gc) {
    try { global.gc(); } catch {}
  }

  if (usedPct >= maxPct || availGb < 1.2) {
    process.stderr.write(
      `[RESOURCE GUARD] System RAM at ${usedPct}% (${availGb.toFixed(2)} GB free). Pausing 1.5s to prevent freeze...\n`
    );
    await new Promise(r => setTimeout(r, 1500));
  } else if (delayMs > 0) {
    await new Promise(r => setTimeout(r, delayMs));
  }
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('hardware_governor.mjs')) {
  const report = calculateSafeBudget();
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log('=================================================================');
    console.log('DIAGNOSTICO DE HARDWARE & ORCAMENTO DE RECURSOS (NODE.JS)');
    console.log('=================================================================');
    console.log(`CPU  : ${report.cpu.model} (${report.cpu.logical_cores} nucleos logicos)`);
    console.log(`RAM  : ${report.ram.available_gb} GB livres de ${report.ram.total_gb} GB (${report.ram.used_percent}% em uso)`);
    console.log(`GPU  : ${report.primary_gpu.name} | VRAM: ${report.primary_gpu.vram_total_mb} MB (${report.primary_gpu.is_integrated ? 'Integrada' : 'Dedicada'})`);
    console.log(`Modo : ${report.limits.profile_tier}`);
    console.log(`Limites: ${report.limits.max_workers} worker(s) | FFmpeg threads: ${report.limits.ffmpeg_threads} | Pausa: ${report.limits.batch_delay_ms}ms`);
    console.log('=================================================================');
  }
}

