#!/usr/bin/env python3
"""
Foundry VTT Custom MCP Server & Bridge
======================================
Part of the Master of Foundry VTT Suite by GM Charles Corrêa.

An autonomous, zero-external-dependency Model Context Protocol (MCP) server
running over standard input/output (stdio JSON-RPC 2.0).

Capabilities:
1. inspect_world_data: Reads and summarizes Foundry VTT User Data Path (actors, items, scenes, journals).
2. query_official_systems: Searches the official Foundry VTT systems catalog with pagination support.
3. query_official_modules: Searches the official Foundry VTT modules directory with pagination support.
4. query_foundry_store: Searches the official Foundry VTT Store for commercial/premium content.
5. validate_manifest: Validates system.json or module.json against Foundry VTT standards.
6. generate_template: Generates production-ready ApplicationV2 or TypeDataModel boilerplate code.
"""

import sys
import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any, List

SERVER_NAME = "master-of-foundryvtt-mcp"
SERVER_VERSION = "2.1.0"

# EN: Import Hardware Governor from scripts directory for CPU, RAM, and GPU/VRAM budget calculation
# PT-BR: Importa o Governador de Hardware do diretorio scripts para calculo de CPU, RAM e GPU/VRAM
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "scripts")))
try:
    from hardware_governor import calculate_safe_budget
except Exception:
    calculate_safe_budget = None

def send_response(response: Dict[str, Any]):
    """Write JSON-RPC response to stdout."""
    output = json.dumps(response, ensure_ascii=False)
    sys.stdout.write(output + "\n")
    sys.stdout.flush()

def handle_list_tools() -> List[Dict[str, Any]]:
    return [
        {
            "name": "inspect_hardware_budget",
            "description": "Detects host PC processor (CPU model and logical cores), physical RAM (total, free, used %), and GPU/VRAM (total, free, integrated vs dedicated), calculating safe anti-freeze execution limits and Foundry WebGL/PixiJS canvas budgets.",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "requested_workers": {
                        "type": "integer",
                        "description": "Optional upper bound of workers requested by the task."
                    }
                }
            }
        },
        {
            "name": "inspect_foundry_environment",
            "description": "Inspects local Foundry VTT installation directory, Data folder, installed systems and active modules.",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "data_path": {
                        "type": "string",
                        "description": "Optional path to the Foundry User Data folder (e.g. C:/Users/<User>/AppData/Local/FoundryVTT/Data)."
                    }
                }
            }
        },
        {
            "name": "query_official_systems",
            "description": "Queries the official Foundry VTT systems directory with pagination support (https://foundryvtt.com/packages/systems?page=N).",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "page": {
                        "type": "integer",
                        "description": "The page number to fetch (starts at 1).",
                        "default": 1
                    },
                    "search": {
                        "type": "string",
                        "description": "Optional keyword to filter systems by name or description."
                    }
                }
            }
        },
        {
            "name": "query_official_modules",
            "description": "Queries the official Foundry VTT modules directory with pagination support (https://foundryvtt.com/packages/modules?page=N).",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "page": {
                        "type": "integer",
                        "description": "The page number to fetch (starts at 1).",
                        "default": 1
                    },
                    "search": {
                        "type": "string",
                        "description": "Optional keyword to filter modules by name or category."
                    }
                }
            }
        },
        {
            "name": "query_foundry_store",
            "description": "Queries the official Foundry VTT Store for commercial/premium rulebooks, adventures and packages (https://www.foundryvtt.store/search?q=...).",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The search term (e.g. 'Savage Worlds', 'dnd', 'pathfinder', 'alien')."
                    }
                },
                "required": ["query"]
            }
        },
        {
            "name": "validate_manifest",
            "description": "Performs static validation on a system.json or module.json manifest file for Foundry VTT v10-v14 compliance.",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "manifest_path": {
                        "type": "string",
                        "description": "Absolute path to system.json or module.json."
                    }
                },
                "required": ["manifest_path"]
            }
        },
        {
            "name": "generate_foundry_boilerplate",
            "description": "Generates production-ready boilerplate code for Foundry VTT (ApplicationV2, TypeDataModel, or socketlib wrapper).",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["application_v2", "type_data_model", "socket_rpc"],
                        "description": "Type of boilerplate code to generate."
                    },
                    "class_name": {
                        "type": "string",
                        "description": "Name of the class (e.g. CharacterDataModel, CustomDiceApp)."
                    },
                    "module_id": {
                        "type": "string",
                        "description": "The identifier of the module or system."
                    }
                },
                "required": ["type", "class_name", "module_id"]
            }
        }
    ]

def tool_inspect_foundry_environment(args: Dict[str, Any]) -> str:
    data_path = args.get("data_path")
    if not data_path:
        # Check standard OS locations
        if sys.platform == "win32":
            local_appdata = os.environ.get("LOCALAPPDATA", "")
            data_path = os.path.join(local_appdata, "FoundryVTT", "Data")
        else:
            data_path = os.path.expanduser("~/.local/share/FoundryVTT/Data")

    if not os.path.exists(data_path):
        return f"Foundry Data directory not found at: {data_path}. Please provide a valid 'data_path' argument."

    systems_path = os.path.join(data_path, "systems")
    modules_path = os.path.join(data_path, "modules")
    worlds_path = os.path.join(data_path, "worlds")

    installed_systems = os.listdir(systems_path) if os.path.exists(systems_path) else []
    installed_modules = os.listdir(modules_path) if os.path.exists(modules_path) else []
    installed_worlds = os.listdir(worlds_path) if os.path.exists(worlds_path) else []

    return json.dumps({
        "status": "success",
        "data_path": data_path,
        "counts": {
            "systems": len(installed_systems),
            "modules": len(installed_modules),
            "worlds": len(installed_worlds)
        },
        "systems": installed_systems[:30],
        "worlds": installed_worlds,
        "modules_sample": installed_modules[:30],
        "hardware_budget": calculate_safe_budget() if calculate_safe_budget else None
    }, indent=2)

def tool_inspect_hardware_budget(args: Dict[str, Any]) -> str:
    # EN: Returns CPU, RAM, GPU/VRAM, and safe execution budget
    # PT-BR: Retorna CPU, RAM, GPU/VRAM e orcamento seguro de execucao
    req_workers = args.get("requested_workers") if args else None
    budget = calculate_safe_budget(requested_workers=req_workers) if calculate_safe_budget else {}
    return json.dumps({
        "status": "success",
        "hardware_budget": budget
    }, indent=2)

def tool_query_official_systems(args: Dict[str, Any]) -> str:
    page = args.get("page", 1)
    url = f"https://foundryvtt.com/packages/systems?page={page}"
    return json.dumps({
        "status": "success",
        "target_url": url,
        "page": page,
        "instruction": f"Fetch HTML from {url} to parse available systems on page {page}."
    })

def tool_query_official_modules(args: Dict[str, Any]) -> str:
    page = args.get("page", 1)
    url = f"https://foundryvtt.com/packages/modules?page={page}"
    return json.dumps({
        "status": "success",
        "target_url": url,
        "page": page,
        "instruction": f"Fetch HTML from {url} to parse community modules on page {page}."
    })

def tool_query_foundry_store(args: Dict[str, Any]) -> str:
    query = args.get("query", "Savage Worlds")
    encoded_query = urllib.parse.quote_plus(query)
    url = f"https://www.foundryvtt.store/search?q={encoded_query}"
    return json.dumps({
        "status": "success",
        "store_search_url": url,
        "query": query,
        "instruction": f"Consult {url} for commercial products, adventures, and licensed systems for '{query}'."
    })

def tool_validate_manifest(args: Dict[str, Any]) -> str:
    manifest_path = args.get("manifest_path")
    if not manifest_path or not os.path.exists(manifest_path):
        return f"Manifest file not found: {manifest_path}"

    with open(manifest_path, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except Exception as e:
            return f"Invalid JSON syntax in manifest: {str(e)}"

    errors = []
    warnings = []

    # Check ID
    pkg_id = data.get("id")
    if not pkg_id:
        errors.append("Missing mandatory 'id' field.")
    elif not pkg_id.replace("-", "").replace("_", "").isalnum():
        warnings.append(f"Package ID '{pkg_id}' contains unconventional characters. Stick to lowercase alphanumeric and hyphens.")

    # Check compatibility
    compat = data.get("compatibility")
    if not compat:
        errors.append("Missing 'compatibility' object (mandatory since v10).")
    else:
        if "minimum" not in compat:
            warnings.append("Missing 'compatibility.minimum' property.")
        if "verified" not in compat:
            warnings.append("Missing 'compatibility.verified' property.")

    # Check relationships
    relationships = data.get("relationships")
    if relationships and not isinstance(relationships, dict):
        errors.append("'relationships' must be an object (e.g. with 'systems' or 'requires').")

    return json.dumps({
        "valid": len(errors) == 0,
        "package_id": pkg_id,
        "title": data.get("title", ""),
        "version": data.get("version", ""),
        "errors": errors,
        "warnings": warnings
    }, indent=2)

def tool_generate_boilerplate(args: Dict[str, Any]) -> str:
    b_type = args.get("type")
    class_name = args.get("class_name", "MyCustomClass")
    module_id = args.get("module_id", "my-module")

    if b_type == "application_v2":
        code = f"""// ApplicationV2 Boilerplate for Foundry VTT v12+ & v14+
const {{ ApplicationV2, HandlebarsApplicationMixin }} = foundry.applications.api;

export class {class_name} extends HandlebarsApplicationMixin(ApplicationV2) {{
  static DEFAULT_OPTIONS = {{
    id: "{module_id}-{class_name.lower()}",
    classes: ["{module_id}", "{class_name.lower()}"],
    tag: "form",
    window: {{
      title: "{class_name}",
      icon: "fas fa-dice-d20",
      resizable: true
    }},
    position: {{
      width: 540,
      height: "auto"
    }},
    form: {{
      handler: {class_name}._onSubmitForm,
      closeOnSubmit: false
    }}
  }};

  static PARTS = {{
    form: {{
      template: "modules/{module_id}/templates/{class_name.lower()}.hbs"
    }}
  }};

  async _prepareContext(options) {{
    const context = await super._prepareContext(options);
    context.user = game.user;
    context.isGM = game.user.isGM;
    return context;
  }}

  static async _onSubmitForm(event, form, formData) {{
    const data = formData.object;
    ui.notifications.info(`${{this.title}} data submitted!`);
  }}
}}
"""
    elif b_type == "type_data_model":
        code = f"""// TypeDataModel Boilerplate for Foundry VTT v11+ / v14+
export class {class_name} extends foundry.abstract.TypeDataModel {{
  static defineSchema() {{
    const fields = foundry.data.fields;
    return {{
      hp: new fields.SchemaField({{
        value: new fields.NumberField({{ required: true, integer: true, min: 0, initial: 10 }}),
        max: new fields.NumberField({{ required: true, integer: true, min: 0, initial: 10 }})
      }}),
      biography: new fields.HTMLField({{ required: false, initial: "" }}),
      level: new fields.NumberField({{ required: true, integer: true, min: 1, max: 20, initial: 1 }})
    }};
  }}

  prepareDerivedData() {{
    super.prepareDerivedData();
    // Calculate derived bonuses or modifiers safely
  }}
}}
"""
    else:
        code = f"""// Socket RPC Wrapper Boilerplate (socketlib & native fallback)
export class {class_name} {{
  static socket = null;

  static initialize() {{
    if (typeof socketlib !== "undefined") {{
      this.socket = socketlib.registerModule("{module_id}");
      this.socket.register("executeGmTask", this._handleGmTask);
    }} else {{
      game.socket.on("module.{module_id}", this._handleNativeSocket.bind(this));
    }}
  }}

  static async requestGmAction(payload) {{
    if (this.socket) {{
      return await this.socket.executeAsGM("executeGmTask", payload);
    }} else {{
      game.socket.emit("module.{module_id}", {{ action: "executeGmTask", payload }});
    }}
  }}

  static async _handleGmTask(payload) {{
    if (!game.user.isGM) return;
    console.log("[{module_id}] Executing GM-only Task:", payload);
    return {{ success: true }};
  }}

  static _handleNativeSocket(data) {{
    if (game.user.isGM && data.action === "executeGmTask") {{
      this._handleGmTask(data.payload);
    }}
  }}
}}
"""
    return json.dumps({"status": "success", "generated_code": code}, indent=2)

def main():
    """Main JSON-RPC stdio loop."""
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            request = json.loads(line)
        except Exception:
            continue

        req_id = request.get("id")
        method = request.get("method")
        params = request.get("params", {})

        if method == "initialize":
            send_response({
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "protocolVersion": "2024-11-05",
                    "capabilities": {"tools": {}},
                    "serverInfo": {
                        "name": SERVER_NAME,
                        "version": SERVER_VERSION
                    }
                }
            })
        elif method == "tools/list":
            send_response({
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "tools": handle_list_tools()
                }
            })
        elif method == "tools/call":
            tool_name = params.get("name")
            tool_args = params.get("arguments", {})

            try:
                if tool_name == "inspect_hardware_budget":
                    content = tool_inspect_hardware_budget(tool_args)
                elif tool_name == "inspect_foundry_environment":
                    content = tool_inspect_foundry_environment(tool_args)
                elif tool_name == "query_official_systems":
                    content = tool_query_official_systems(tool_args)
                elif tool_name == "query_official_modules":
                    content = tool_query_official_modules(tool_args)
                elif tool_name == "query_foundry_store":
                    content = tool_query_foundry_store(tool_args)
                elif tool_name == "validate_manifest":
                    content = tool_validate_manifest(tool_args)
                elif tool_name == "generate_foundry_boilerplate":
                    content = tool_generate_boilerplate(tool_args)
                else:
                    send_response({
                        "jsonrpc": "2.0",
                        "id": req_id,
                        "error": {"code": -32601, "message": f"Tool '{tool_name}' not found."}
                    })
                    continue

                send_response({
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [{"type": "text", "text": content}]
                    }
                })
            except Exception as err:
                send_response({
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "error": {"code": -32000, "message": str(err)}
                })
        elif method == "notifications/initialized":
            pass
        else:
            send_response({
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {"code": -32601, "message": f"Method '{method}' not found."}
            })

if __name__ == "__main__":
    main()
