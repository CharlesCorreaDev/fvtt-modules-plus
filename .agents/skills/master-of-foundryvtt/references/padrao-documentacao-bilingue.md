# Padrão de Documentação Técnica Bilíngue (EN / PT-BR)
## Parte Integrante da Skill Master of Foundry VTT — by GM Charles Corrêa

A comunidade mundial do Foundry Virtual Tabletop é predominantemente anglófona, enquanto a comunidade brasileira e lusófona é uma das mais ativas e criativas do cenário. 

O **Redator Técnico & Documentador Bilíngue** garante que **100% da documentação de cada módulo, sistema, README, changelog e comentários de código seja entregue com paridade estrita em Inglês e Português Brasileiro**.

---

## 1. Estrutura Canônica de um README Bilíngue

O `README.md` de qualquer pacote deve adotar a estrutura espelhada ou com âncoras de idioma no topo:

```markdown
# [Nome do Módulo ou Sistema] 🎲⚡
> *[Breve descrição em Inglês]*  
> *[Breve descrição em Português Brasileiro]*

[![Foundry VTT Version](https://img.shields.io/badge/Foundry-v14.369-orange.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]()

[English](#english) | [Português Brasileiro](#português-brasileiro)

---

## English

### 🌟 Features
- Real-time token effect synchronization using ApplicationV2.
- Full compatibility with official v14 DataModels.
- Built-in integration with Dice So Nice! and Sequencer.

### 📦 Installation
1. In Foundry VTT Setup, go to **Add-on Modules** -> **Install Module**.
2. Paste the manifest link: `https://github.com/.../module.json`.
3. Launch your World and enable the module in **Manage Modules**.

---

## Português Brasileiro

### 🌟 Funcionalidades
- Sincronização em tempo real de efeitos de tokens utilizando ApplicationV2.
- Compatibilidade total com os DataModels oficiais da v14.
- Integração nativa com Dice So Nice! e Sequencer.

### 📦 Instalação
1. Na tela inicial do Foundry VTT, acesse **Módulos Adicionais** -> **Instalar Módulo**.
2. Cole o link do manifesto: `https://github.com/.../module.json`.
3. Inicie seu Mundo e ative o módulo em **Gerenciar Módulos**.
```

---

## 2. Padrão de Comentários de Código (JSDoc Bilíngue / Conciso)

Nas classes exportadas e métodos de API, os comentários JSDoc devem manter clareza profissional:

```typescript
/**
 * Calculates derived initiative bonus based on Agility and Alertness.
 * Calcula o bônus de iniciativa derivado baseado em Agilidade e Prontidão.
 *
 * @param {number} agilidade - The character's agility score / Valor de agilidade.
 * @param {boolean} temProntidao - Whether the actor possesses the Alertness feat / Possui o talento Prontidão.
 * @returns {number} The final initiative modifier / O modificador final de iniciativa.
 */
export function calcularIniciativa(agilidade: number, temProntidao: boolean): number {
  const base = Math.floor((agilidade - 10) / 2);
  return temProntidao ? base + 2 : base;
}
```

---

## 3. Padrão de Arquivos de Localização i18n (`languages/*.json`)

Todo módulo ou sistema deve registrar chaves consistentes para tradução imediata:

### `languages/en.json`:
```json
{
  "MEU_MODULO.Settings.AtivarEfeito.Name": "Enable Automatic Visual Effects",
  "MEU_MODULO.Settings.AtivarEfeito.Hint": "Plays attack animations automatically using Sequencer.",
  "MEU_MODULO.Dialogs.ConfirmDelete": "Are you sure you want to delete this custom item?"
}
```

### `languages/pt-BR.json`:
```json
{
  "MEU_MODULO.Settings.AtivarEfeito.Name": "Ativar Efeitos Visuais Automáticos",
  "MEU_MODULO.Settings.AtivarEfeito.Hint": "Reproduz animações de ataque automaticamente utilizando o Sequencer.",
  "MEU_MODULO.Dialogs.ConfirmDelete": "Tem certeza de que deseja excluir este item personalizado?"
}
```

