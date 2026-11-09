#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hardware Profiler (CPU, RAM, GPU & VRAM) and Adaptive Resource Governor for Master of Foundry VTT.
Perfilador de Hardware (CPU, RAM, GPU e VRAM) e Governador Adaptativo de Recursos para Master of Foundry VTT.
"""
import ctypes
import gc
import json
import os
import platform
import subprocess
import sys
import time

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")


def apply_low_process_priority():
    """
    Lowers OS scheduling priority so tasks never freeze the host machine or Foundry VTT.
    Reduz a prioridade de escalonamento no SO para que tarefas nunca travem a maquina ou o Foundry VTT.
    """
    try:
        if sys.platform == "win32":
            handle = ctypes.windll.kernel32.GetCurrentProcess()
            ctypes.windll.kernel32.SetPriorityClass(handle, 0x00004000)  # BELOW_NORMAL_PRIORITY_CLASS
        elif hasattr(os, "nice"):
            os.nice(10)
    except Exception:
        pass


def get_cpu_info() -> dict:
    """
    Detects CPU model name and logical core count across Windows, Linux, and macOS.
    Detecta o modelo do processador e contagem de nucleos logicos no Windows, Linux e macOS.
    """
    model = platform.processor() or "Generic Processor"
    cores = os.cpu_count() or 2

    try:
        if sys.platform == "win32":
            import winreg
            key = winreg.OpenKey(
                winreg.HKEY_LOCAL_MACHINE,
                r"HARDWARE\DESCRIPTION\System\CentralProcessor\0",
            )
            val, _ = winreg.QueryValueEx(key, "ProcessorNameString")
            winreg.CloseKey(key)
            if val:
                model = val.strip()
        elif sys.platform.startswith("linux"):
            with open("/proc/cpuinfo", "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    if "model name" in line:
                        model = line.split(":", 1)[1].strip()
                        break
        elif sys.platform == "darwin":
            out = subprocess.check_output(
                ["sysctl", "-n", "machdep.cpu.brand_string"],
                text=True,
                timeout=3,
                stderr=subprocess.DEVNULL,
            )
            if out:
                model = out.strip()
    except Exception:
        pass

    return {
        "model": model,
        "logical_cores": cores,
        "architecture": platform.machine(),
    }


def get_ram_info() -> dict:
    """
    Returns real-time physical RAM metrics in GB and usage percentage.
    Retorna metricas em tempo real da memoria RAM fisica em GB e percentual de uso.
    """
    try:
        if sys.platform == "win32":
            class MEMORYSTATUSEX(ctypes.Structure):
                _fields_ = [
                    ("dwLength", ctypes.c_ulong),
                    ("dwMemoryLoad", ctypes.c_ulong),
                    ("ullTotalPhys", ctypes.c_ulonglong),
                    ("ullAvailPhys", ctypes.c_ulonglong),
                    ("ullTotalPageFile", ctypes.c_ulonglong),
                    ("ullAvailPageFile", ctypes.c_ulonglong),
                    ("ullTotalVirtual", ctypes.c_ulonglong),
                    ("ullAvailVirtual", ctypes.c_ulonglong),
                    ("sullAvailExtendedVirtual", ctypes.c_ulonglong),
                ]
            stat = MEMORYSTATUSEX()
            stat.dwLength = ctypes.sizeof(MEMORYSTATUSEX)
            if ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(stat)):
                total_gb = stat.ullTotalPhys / (1024 ** 3)
                avail_gb = stat.ullAvailPhys / (1024 ** 3)
                used_gb = max(0.0, total_gb - avail_gb)
                return {
                    "total_gb": round(total_gb, 2),
                    "available_gb": round(avail_gb, 2),
                    "used_gb": round(used_gb, 2),
                    "used_percent": int(stat.dwMemoryLoad),
                }
        elif sys.platform.startswith("linux"):
            mem = {}
            with open("/proc/meminfo", "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    parts = line.split(":")
                    if len(parts) == 2:
                        mem[parts[0].strip()] = int(parts[1].strip().split()[0]) * 1024
            total = mem.get("MemTotal", 4 * 1024 ** 3)
            avail = mem.get("MemAvailable", mem.get("MemFree", 2 * 1024 ** 3))
            total_gb = total / (1024 ** 3)
            avail_gb = avail / (1024 ** 3)
            used_pct = int(round((1.0 - (avail / total)) * 100)) if total else 50
            return {
                "total_gb": round(total_gb, 2),
                "available_gb": round(avail_gb, 2),
                "used_gb": round(max(0.0, total_gb - avail_gb), 2),
                "used_percent": used_pct,
            }
    except Exception:
        pass

    return {
        "total_gb": 8.0,
        "available_gb": 4.0,
        "used_gb": 4.0,
        "used_percent": 50,
    }


def get_gpu_vram_info() -> list:
    """
    Detects installed GPUs and their VRAM capacity (total/free MB and integrated vs dedicated).
    Detecta GPUs instaladas e sua capacidade de VRAM (MB totais/livres e integrada vs dedicada).
    """
    gpus = []

    # 1. Try nvidia-smi for NVIDIA dedicated GPUs (provides exact total, free, and used VRAM)
    # Tenta nvidia-smi para GPUs dedicadas NVIDIA (fornece VRAM total, livre e em uso exata)
    try:
        out = subprocess.check_output(
            [
                "nvidia-smi",
                "--query-gpu=name,memory.total,memory.free,memory.used",
                "--format=csv,noheader,nounits",
            ],
            text=True,
            timeout=4,
            stderr=subprocess.DEVNULL,
        )
        for line in out.strip().splitlines():
            parts = [p.strip() for p in line.split(",")]
            if len(parts) >= 4:
                total_mb = int(float(parts[1]))
                free_mb = int(float(parts[2]))
                used_mb = int(float(parts[3]))
                gpus.append({
                    "name": parts[0],
                    "vram_total_mb": total_mb,
                    "vram_free_mb": free_mb,
                    "vram_used_mb": used_mb,
                    "is_integrated": False,
                    "source": "nvidia-smi",
                })
    except Exception:
        pass

    # 2. On Windows, inspect Registry Display Class (supports 64-bit qwMemorySize > 4GB)
    # No Windows, inspeciona a classe de Display no Registro (suporta qwMemorySize 64-bit > 4GB)
    if sys.platform == "win32" and not gpus:
        try:
            import winreg
            base_key = winreg.OpenKey(
                winreg.HKEY_LOCAL_MACHINE,
                r"SYSTEM\CurrentControlSet\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}",
            )
            idx = 0
            while True:
                try:
                    sub_name = winreg.EnumKey(base_key, idx)
                    idx += 1
                    if not sub_name.startswith("0"):
                        continue
                    sub_key = winreg.OpenKey(base_key, sub_name)
                    try:
                        desc, _ = winreg.QueryValueEx(sub_key, "DriverDesc")
                    except Exception:
                        winreg.CloseKey(sub_key)
                        continue

                    vram_bytes = 0
                    for field in ("HardwareInformation.qwMemorySize", "HardwareInformation.MemorySize"):
                        try:
                            val, _ = winreg.QueryValueEx(sub_key, field)
                            if isinstance(val, int) and val > 0:
                                vram_bytes = val
                                break
                            if isinstance(val, bytes) and len(val) in (4, 8):
                                vram_bytes = int.from_bytes(val, "little")
                                break
                        except Exception:
                            pass
                    winreg.CloseKey(sub_key)

                    lower_desc = desc.lower()
                    if "microsoft basic" in lower_desc or "parsec" in lower_desc or "virtual" in lower_desc:
                        continue

                    vram_mb = round(vram_bytes / (1024 * 1024)) if vram_bytes > 0 else 1024
                    is_igpu = any(
                        k in lower_desc
                        for k in ("uhd", "iris", "hd graphics", "radeon(tm) graphics", "vega", "integrated")
                    ) and vram_mb <= 2048

                    gpus.append({
                        "name": desc.strip(),
                        "vram_total_mb": vram_mb,
                        "vram_free_mb": None,
                        "vram_used_mb": None,
                        "is_integrated": is_igpu,
                        "source": "winreg",
                    })
                except OSError:
                    break
            winreg.CloseKey(base_key)
        except Exception:
            pass

    # 3. Linux DRM / lspci fallback / Fallback Linux via DRM / lspci
    if sys.platform.startswith("linux") and not gpus:
        try:
            out = subprocess.check_output(["lspci"], text=True, timeout=3, stderr=subprocess.DEVNULL)
            for line in out.splitlines():
                if "VGA compatible controller" in line or "3D controller" in line:
                    name = line.split(":", 2)[-1].strip()
                    is_igpu = "intel" in name.lower() and "arc" not in name.lower()
                    gpus.append({
                        "name": name,
                        "vram_total_mb": 1024 if is_igpu else 4096,
                        "vram_free_mb": None,
                        "vram_used_mb": None,
                        "is_integrated": is_igpu,
                        "source": "lspci",
                    })
        except Exception:
            pass

    if not gpus:
        gpus.append({
            "name": "Standard Display Adapter",
            "vram_total_mb": 1024,
            "vram_free_mb": None,
            "vram_used_mb": None,
            "is_integrated": True,
            "source": "fallback",
        })

    return gpus


def calculate_safe_budget(max_ram_percent: int = 78) -> dict:
    """
    Calculates safe execution limits (CPU threads, RAM heap, FFmpeg concurrency, and Foundry WebGL/VRAM caps)
    so no task ever freezes the operating machine.
    Calcula limites seguros de execucao (threads de CPU, heap de RAM, concorrencia FFmpeg e limites WebGL/VRAM)
    para que nenhuma tarefa trave a maquina operante.
    """
    apply_low_process_priority()
    cpu = get_cpu_info()
    ram = get_ram_info()
    gpus = get_gpu_vram_info()

    # Pick primary GPU (prefer dedicated with highest VRAM) / Seleciona GPU principal
    primary_gpu = sorted(gpus, key=lambda g: (not g["is_integrated"], g["vram_total_mb"]), reverse=True)[0]
    vram_mb = primary_gpu["vram_total_mb"]
    is_igpu = primary_gpu["is_integrated"]

    # If GPU is integrated, it shares physical system RAM; reserve extra system RAM margin!
    # Se a GPU for integrada, ela compartilha a RAM fisica do sistema; reserva margem extra de RAM!
    effective_avail_ram_gb = ram["available_gb"] - (0.75 if is_igpu else 0.0)
    cores = cpu["logical_cores"]

    if effective_avail_ram_gb < 2.5 or ram["used_percent"] >= max_ram_percent or cores <= 2:
        max_workers = 1
        ffmpeg_threads = 1
        batch_size = 15
        delay_ms = 80
        node_heap_mb = 1024
        profile_tier = "ECO-STRICT (Low Available RAM/CPU or High Load)"
    elif effective_avail_ram_gb < 5.5 or is_igpu or cores <= 6:
        max_workers = 2 if cores >= 4 and ram["used_percent"] < 70 else 1
        ffmpeg_threads = 2 if cores >= 4 else 1
        batch_size = 25
        delay_ms = 45
        node_heap_mb = 1536
        profile_tier = "ECO-BALANCED (Shared iGPU VRAM / Moderate Headroom)"
    else:
        max_workers = 2 if cores <= 12 else 3
        ffmpeg_threads = 3 if cores >= 8 else 2
        batch_size = 40
        delay_ms = 25
        node_heap_mb = 2048
        profile_tier = "ECO-ADAPTIVE (Dedicated GPU & High RAM Headroom, Capped at ~25% CPU)"

    # Calculate Foundry VTT Canvas / PixiJS / WebGL safe limits based on VRAM
    # Calcula limites seguros de Canvas / PixiJS / WebGL no Foundry VTT com base na VRAM
    if vram_mb <= 1536 or is_igpu:
        webgl_budget = {
            "vram_tier": "LOW_OR_SHARED_VRAM",
            "max_recommended_map_resolution_px": "4096x4096",
            "max_concurrent_webm_animated_tiles": 3,
            "recommended_webp_quality": 85,
            "pixi_performance_mode": "Low / Medium (Disable heavy fog/particle shaders during batch work)",
        }
    elif vram_mb <= 4096:
        webgl_budget = {
            "vram_tier": "MID_VRAM",
            "max_recommended_map_resolution_px": "8192x8192",
            "max_concurrent_webm_animated_tiles": 8,
            "recommended_webp_quality": 90,
            "pixi_performance_mode": "Medium / High",
        }
    else:
        webgl_budget = {
            "vram_tier": "HIGH_DEDICATED_VRAM",
            "max_recommended_map_resolution_px": "16384x16384",
            "max_concurrent_webm_animated_tiles": 16,
            "recommended_webp_quality": 95,
            "pixi_performance_mode": "Maximum",
        }

    return {
        "cpu": cpu,
        "ram": ram,
        "gpus": gpus,
        "primary_gpu": primary_gpu,
        "limits": {
            "profile_tier": profile_tier,
            "process_priority": "BELOW_NORMAL (Anti-Freeze Active)",
            "max_workers": max_workers,
            "ffmpeg_threads": ffmpeg_threads,
            "batch_size": batch_size,
            "batch_delay_ms": delay_ms,
            "max_ram_percent_ceiling": max_ram_percent,
            "node_max_old_space_size_mb": node_heap_mb,
        },
        "foundry_vram_canvas_budget": webgl_budget,
    }


def guard_resources(budget: dict = None):
    """
    Runtime guard called between batch operations to prevent RAM exhaustion or CPU lockups.
    Guarda de execucao chamada entre operacoes em lote para prevenir exaustao de RAM ou travamento de CPU.
    """
    gc.collect()
    ram = get_ram_info()
    max_pct = budget["limits"]["max_ram_percent_ceiling"] if budget else 78
    delay_ms = budget["limits"]["batch_delay_ms"] if budget else 40

    if ram["used_percent"] >= max_pct or ram["available_gb"] < 1.2:
        sys.stderr.write(
            f"[RESOURCE GUARD] RAM usage at {ram['used_percent']}% ({ram['available_gb']} GB free). "
            f"Pausing 1.5s and collecting garbage to protect host...\n"
        )
        gc.collect()
        time.sleep(1.5)
    elif delay_ms > 0:
        time.sleep(delay_ms / 1000.0)


def main():
    as_json = "--json" in sys.argv
    report = calculate_safe_budget()

    if as_json:
        print(json.dumps(report, indent=2, ensure_ascii=False))
        return

    c = report["cpu"]
    r = report["ram"]
    g = report["primary_gpu"]
    lim = report["limits"]
    wgl = report["foundry_vram_canvas_budget"]

    print("=================================================================")
    print("DIAGNOSTICO DE HARDWARE & ORCAMENTO DE RECURSOS (ANTI-TRAVAMENTO)")
    print("=================================================================")
    print(f"Processador (CPU) : {c['model']} ({c['logical_cores']} nucleos logicos | {c['architecture']})")
    print(f"Memoria RAM       : {r['available_gb']} GB livres de {r['total_gb']} GB ({r['used_percent']}% em uso)")
    print(
        f"Placa de Video    : {g['name']} | VRAM: {g['vram_total_mb']} MB "
        f"({'Integrada / Compartilhada com RAM' if g['is_integrated'] else 'Dedicada'})"
    )
    if g.get("vram_free_mb") is not None:
        print(f"VRAM Livre Real   : {g['vram_free_mb']} MB livres de {g['vram_total_mb']} MB")
    print("-----------------------------------------------------------------")
    print("Limites Calculados para Tarefas da Skill (Sem Travar a Maquina):")
    print(f"  - Perfil Aplicado         : {lim['profile_tier']}")
    print(f"  - Prioridade de Processo  : {lim['process_priority']}")
    print(f"  - Workers Simultaneos Max : {lim['max_workers']} worker(s)")
    print(f"  - Threads FFmpeg/Midia    : {lim['ffmpeg_threads']} thread(s)")
    print(f"  - Tamanho de Micro-Lote   : {lim['batch_size']} itens por lote")
    print(f"  - Pausa de Respiro (CPU)  : {lim['batch_delay_ms']} ms entre lotes")
    print(f"  - Teto de Seguranca RAM   : {lim['max_ram_percent_ceiling']}% (pausa + GC automatico)")
    print(f"  - Limite V8 Heap Node.js  : {lim['node_max_old_space_size_mb']} MB")
    print("-----------------------------------------------------------------")
    print("Orcamento WebGL / Canvas do Foundry VTT (Baseado na VRAM):")
    print(f"  - Classificacao VRAM      : {wgl['vram_tier']}")
    print(f"  - Resolucao Max de Cenas  : {wgl['max_recommended_map_resolution_px']} px")
    print(f"  - Tiles WebM Simultaneos  : ate {wgl['max_concurrent_webm_animated_tiles']} por cena")
    print(f"  - Qualidade WebP Sugerida : {wgl['recommended_webp_quality']}%")
    print(f"  - Modo Performance PixiJS : {wgl['pixi_performance_mode']}")
    print("=================================================================")


if __name__ == "__main__":
    main()

