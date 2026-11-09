const fs = require('fs');
const path = require('path');

const targetDir = 'E:/RPG/VTT/FoundryVTT/Data/worlds/swade-dev/mcp_generated';
fs.mkdirSync(targetDir, { recursive: true });

const macroDoc = {
  name: "MCP - Carregar Documentos com Permissao Publica",
  type: "script",
  scope: "global",
  author: "mcp-api",
  img: "icons/svg/dice-target.svg",
  ownership: {
    default: 0 // 0 = None (Private/GM only), ensuring secure access control
  },
  command: `// Macro gerada pelo Master of Foundry VTT MCP
(async () => {
  const documentsToLoad = [
    { type: 'Actor', file: 'worlds/swade-dev/mcp_generated/actor_pistoleiro_cibern_tico___jack_zero.json', cls: Actor },
    { type: 'Item', file: 'worlds/swade-dev/mcp_generated/item_pistola_laser_pesada___modelo_pulsar_iv.json', cls: Item },
    { type: 'JournalEntry', file: 'worlds/swade-dev/mcp_generated/journal_dossie_secreto___alvo_primario.json', cls: JournalEntry },
    { type: 'RollTable', file: 'worlds/swade-dev/mcp_generated/table_encontros_aleatorios_no_ermo.json', cls: RollTable }
  ];

  let loaded = 0;
  for (const doc of documentsToLoad) {
    try {
      const resp = await fetch(doc.file);
      if (!resp.ok) continue;
      const data = await resp.json();
      data.ownership = { default: 0 }; // Acesso restrito ao Mestre (GM-only) por segurança
      
      const collection = game.collections.get(doc.type);
      const existing = collection.getName(data.name);
      if (!existing) {
        await doc.cls.create(data);
        ui.notifications.info(\`Documento [\${doc.type}] "\${data.name}" criado com sucesso!\`);
        loaded++;
      } else {
        await existing.update({ ownership: { default: 0 } });
        ui.notifications.info(\`Documento "\${data.name}" já existia - Permissões mantidas para GM!\`);
        loaded++;
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (loaded > 0) {
    ui.notifications.info("Todos os documentos do MCP agora estão visíveis nas abas laterais do Foundry!");
  }
})();`
};

fs.writeFileSync(path.join(targetDir, 'macro_carregar_documentos.json'), JSON.stringify(macroDoc, null, 2), 'utf8');
console.log("Macro file generated successfully!");
