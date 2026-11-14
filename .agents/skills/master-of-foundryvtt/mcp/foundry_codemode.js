import vm from "node:vm";

/**
 * Foundry Code Mode Dispatcher
 * Maps high-level JavaScript calls to internal Foundry MCP tool implementations in a sandboxed isolate.
 */
export function runFoundryCodeMode(code, toolsContext) {
  const sandbox = {
    foundry: {
      createActor: async (params) => JSON.parse(toolsContext.toolCreateActor(params)),
      createItem: async (params) => JSON.parse(toolsContext.toolCreateItem(params)),
      createJournal: async (params) => JSON.parse(toolsContext.toolCreateJournalHandout(params)),
      createTable: async (params) => JSON.parse(toolsContext.toolCreateRollableTable(params)),
      createMacro: async (params) => JSON.parse(toolsContext.toolCreateMacro(params)),
      createScene: async (params) => JSON.parse(toolsContext.toolCreateScene(params)),
      createCombat: async (params) => JSON.parse(toolsContext.toolCreateCombat(params)),
      createPlaylist: async (params) => JSON.parse(toolsContext.toolCreatePlaylist(params)),
      createDeck: async (params) => JSON.parse(toolsContext.toolCreateDeck(params)),
      inspectEnvironment: async (params) => JSON.parse(toolsContext.toolInspectEnvironment(params)),
      inspectHardwareBudget: async (params) => JSON.parse(toolsContext.toolInspectHardwareBudget(params)),
      inspectLiveState: async (params) => JSON.parse(toolsContext.toolInspectLiveFoundryState(params)),
      reverseEngineer: async (params) => JSON.parse(toolsContext.toolReverseEngineerTarget(params)),
      querySystems: async (params) => JSON.parse(toolsContext.toolQueryOfficialSystems(params)),
      queryModules: async (params) => JSON.parse(toolsContext.toolQueryOfficialModules(params)),
      queryStore: async (params) => JSON.parse(toolsContext.toolQueryStore(params))
    },
    console: {
      log: (...args) => {},
      error: (...args) => {}
    }
  };

  const script = new vm.Script(`(async () => { ${code} })()`);
  const context = vm.createContext(sandbox);
  return script.runInContext(context, { timeout: 30000 });
}

