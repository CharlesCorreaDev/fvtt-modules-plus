#!/usr/bin/env node
/**
 * Foundry VTT Media Optimizer & Converter (Images to .webp, Videos to .webm, Audio to .ogg)
 * Includes Hardware Profiler (CPU, RAM, GPU/VRAM) to throttle threads and prevent host freezes.
 * Otimizador e Conversor de Midias para Foundry VTT com Perfilador de Hardware (CPU, RAM, GPU/VRAM)
 * para limitar threads e impedir travamentos na maquina operante.
 * Author: GM Charles Correa (Master of Foundry VTT)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { calculateSafeBudget, sleepAndGuardMemory } from './hardware_governor.mjs';

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.mkv', '.avi', '.wmv', '.m4v'];
const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.m4a', '.flac', '.aac', '.wma'];

function hasBinary(binName) {
  try {
    const cmd = process.platform === 'win32' ? `where ${binName}` : `which ${binName}`;
    execSync(cmd, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function convertImageToWebP(srcPath, destPath, quality = 95, safeThreads = 1) {
  // 1. Try sharp with bounded thread concurrency / Tenta sharp com concorrencia limitada de threads
  try {
    const sharp = (await import('sharp')).default;
    sharp.concurrency(safeThreads);
    sharp.cache(false);
    await sharp(srcPath).webp({ quality, effort: 4 }).toFile(destPath);
    return { success: true, method: `sharp (threads=${safeThreads})` };
  } catch {}

  // 2. Try cwebp CLI / Tenta cwebp CLI
  if (hasBinary('cwebp')) {
    try {
      const mtFlag = safeThreads > 1 ? '-mt' : '';
      execSync(`cwebp -q ${quality} ${mtFlag} "${srcPath}" -o "${destPath}"`, { stdio: 'pipe' });
      return { success: true, method: 'cwebp' };
    } catch {}
  }

  // 3. Try ffmpeg CLI with thread cap / Tenta ffmpeg CLI com limite de threads
  if (hasBinary('ffmpeg')) {
    try {
      execSync(`ffmpeg -y -threads ${safeThreads} -i "${srcPath}" -quality ${quality} "${destPath}"`, { stdio: 'pipe' });
      return { success: true, method: `ffmpeg (threads=${safeThreads})` };
    } catch {}
  }

  return { success: false, reason: 'Nenhum conversor de imagem disponivel (instale sharp, cwebp ou ffmpeg).' };
}

function convertVideoToWebM(srcPath, destPath, crf = 16, safeThreads = 1) {
  if (hasBinary('ffmpeg')) {
    try {
      // VP9 + Opus encoding with strict thread cap (-threads) and row-mt to prevent CPU lockup
      // Codificacao VP9 + Opus com limite estrito de threads (-threads) para evitar travamento de CPU
      const cmd = `ffmpeg -y -threads ${safeThreads} -i "${srcPath}" -c:v libvpx-vp9 -row-mt 1 -threads ${safeThreads} -b:v 0 -crf ${crf} -c:a libopus -b:a 192k -f webm "${destPath}"`;
      execSync(cmd, { stdio: 'pipe' });
      return { success: true, method: `ffmpeg (threads=${safeThreads})` };
    } catch (e) {
      return { success: false, reason: e.message };
    }
  }
  return { success: false, reason: 'ffmpeg nao encontrado no sistema para conversao de video.' };
}

function convertAudioToOgg(srcPath, destPath, bitrate = '192k', safeThreads = 1) {
  if (hasBinary('ffmpeg')) {
    try {
      const cmd = `ffmpeg -y -threads ${safeThreads} -i "${srcPath}" -c:a libvorbis -b:a ${bitrate} "${destPath}"`;
      execSync(cmd, { stdio: 'pipe' });
      return { success: true, method: `ffmpeg (threads=${safeThreads})` };
    } catch (e) {
      return { success: false, reason: e.message };
    }
  }
  return { success: false, reason: 'ffmpeg nao encontrado no sistema para conversao de audio.' };
}

async function processDirectory(dirPath, options = {}) {
  const budget = calculateSafeBudget();
  const safeThreads = budget.limits.ffmpeg_threads;
  const { dryRun = false, quality = 95, crf = 16, deleteOriginal = false } = options;

  console.log('=================================================================');
  console.log('[HARDWARE GOVERNOR] Orcamento Calculado para Conversao de Midia:');
  console.log(`  CPU : ${budget.cpu.model} (${budget.cpu.logical_cores} nucleos)`);
  console.log(`  RAM : ${budget.ram.available_gb} GB livres de ${budget.ram.total_gb} GB (${budget.ram.used_percent}% em uso)`);
  console.log(`  GPU : ${budget.primary_gpu.name} (${budget.primary_gpu.vram_total_mb} MB VRAM)`);
  console.log(`  Modo: ${budget.limits.profile_tier} | Threads FFmpeg/Sharp: ${safeThreads} | Pausa: ${budget.limits.batch_delay_ms}ms`);
  console.log('=================================================================\n');

  if (!fs.existsSync(dirPath)) {
    console.error(`[!] Caminho '${dirPath}' nao encontrado.`);
    process.exit(1);
  }

  const stat = fs.statSync(dirPath);
  const targets = [];

  if (stat.isFile()) {
    targets.push(dirPath);
  } else {
    function walk(dir) {
      for (const item of fs.readdirSync(dir)) {
        if (item === 'node_modules' || item === '.git') continue;
        const full = path.join(dir, item);
        const s = fs.statSync(full);
        if (s.isDirectory()) {
          walk(full);
        } else {
          targets.push(full);
        }
      }
    }
    walk(dirPath);
  }

  let convertedCount = 0;

  for (const filePath of targets) {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.svg') {
      console.log(`[PRESERVADO] ${filePath} (SVG nativo vetorial mantido intacto)`);
      continue;
    }

    if (IMAGE_EXTENSIONS.includes(ext)) {
      const destPath = filePath.slice(0, -ext.length) + '.webp';
      if (dryRun) {
        console.log(`[SIMULACAO] Imagem: ${filePath} -> ${destPath}`);
      } else {
        process.stdout.write(`[*] Convertendo imagem: ${path.basename(filePath)} -> .webp ... `);
        const res = await convertImageToWebP(filePath, destPath, quality, safeThreads);
        if (res.success) {
          convertedCount++;
          console.log(`OK (${res.method})`);
          if (deleteOriginal && fs.existsSync(destPath) && destPath !== filePath) {
            fs.unlinkSync(filePath);
          }
        } else {
          console.log(`FALHA: ${res.reason}`);
        }
        await sleepAndGuardMemory(budget);
      }
    } else if (VIDEO_EXTENSIONS.includes(ext)) {
      const destPath = filePath.slice(0, -ext.length) + '.webm';
      if (dryRun) {
        console.log(`[SIMULACAO] Video: ${filePath} -> ${destPath}`);
      } else {
        process.stdout.write(`[*] Convertendo video: ${path.basename(filePath)} -> .webm ... `);
        const res = convertVideoToWebM(filePath, destPath, crf, safeThreads);
        if (res.success) {
          convertedCount++;
          console.log(`OK (${res.method})`);
          if (deleteOriginal && fs.existsSync(destPath) && destPath !== filePath) {
            fs.unlinkSync(filePath);
          }
        } else {
          console.log(`FALHA: ${res.reason}`);
        }
        await sleepAndGuardMemory(budget);
      }
    } else if (AUDIO_EXTENSIONS.includes(ext)) {
      const destPath = filePath.slice(0, -ext.length) + '.ogg';
      if (dryRun) {
        console.log(`[SIMULACAO] Audio/Musica: ${filePath} -> ${destPath}`);
      } else {
        process.stdout.write(`[*] Convertendo audio: ${path.basename(filePath)} -> .ogg ... `);
        const res = convertAudioToOgg(filePath, destPath, '192k', safeThreads);
        if (res.success) {
          convertedCount++;
          console.log(`OK (${res.method})`);
          if (deleteOriginal && fs.existsSync(destPath) && destPath !== filePath) {
            fs.unlinkSync(filePath);
          }
        } else {
          console.log(`FALHA: ${res.reason}`);
        }
        await sleepAndGuardMemory(budget);
      }
    }
  }

  console.log(`\nConcluido. Itens processados: ${targets.length}. Convertidos: ${convertedCount}.`);
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const deleteOriginal = args.includes('--delete-original');
const target = args.find(a => !a.startsWith('--'));

if (!target) {
  console.log('Uso: node scripts/convert_media.js <arquivo-ou-pasta> [--dry-run] [--delete-original]');
  process.exit(0);
}

processDirectory(target, { dryRun, deleteOriginal }).catch(err => {
  console.error('[!] Erro:', err);
  process.exit(1);
});
