# Especificações Técnicas (Specs), Versionamento Semântico (SemVer), PRs e Handoff
## Parte Integrante da Skill Master of Foundry VTT — by GM Charles Corrêa

O desenvolvimento profissional de pacotes para o Foundry VTT exige rastreabilidade estrita: desde o momento em que uma funcionalidade é concebida até o momento em que a Pull Request é mesclada, versionada e o pacote publicado.

O **Engenheiro de Specs, PRs & Handoff** padroniza esses artefatos para garantir previsibilidade entre desenvolvedores, mestres, revisores e sistemas de CI/CD.

---

## 1. Versionamento Semântico Oficial ([SemVer 2.0.0 PT-BR](https://semver.org/lang/pt-BR/))

Todo módulo, sistema e compêndio de Foundry VTT **DEVE** seguir rigorosamente a especificação do [Semantic Versioning 2.0.0](https://semver.org/lang/pt-BR/):

```
                       X . Y . Z [-PRÉ-LANÇAMENTO] [+METADADOS]
                       │   │   │
  MAIOR (MAJOR) ───────┘   │   │  ➔ Quebra de compatibilidade de API / dados
  MENOR (MINOR) ───────────┘   │  ➔ Nova funcionalidade retrocompatível
  CORREÇÃO (PATCH) ────────────┘  ➔ Correção de bugs retrocompatível
```

### Regras Mandatórias de Incremento para Foundry VTT:

1. **Versão MAIOR (MAJOR - `X.0.0`)**:
   - Incrementada obrigatoriamente quando há **quebra de compatibilidade pública** (*breaking changes*).
   - *Exemplos no Foundry:*
     - Migração de `template.json` para `TypeDataModel` que exige conversão manual ou script destrutivo de compêndios.
     - Quebra de métodos públicos em `game.modules.get('id').api`.
     - Atualização que abandona suporte à versão anterior do Foundry (ex: módulo passa a exigir v14+ e não roda mais na v12).
2. **Versão MENOR (MINOR - `X.Y.0`)**:
   - Incrementada quando uma **nova funcionalidade é adicionada de forma retrocompatível**.
   - *Exemplos no Foundry:*
     - Adição de uma nova ficha em `ApplicationV2` sem alterar os esquemas de dados existentes.
     - Suporte a um novo módulo parceiro (ex: integração com *Dice So Nice!* ou *Sequencer*).
     - Novas macros ou tabelas adicionadas a compêndios existentes.
3. **Versão de CORREÇÃO (PATCH - `X.Y.Z`)**:
   - Incrementada quando são aplicadas **correções de bugs retrocompatíveis**.
   - *Exemplos no Foundry:*
     - Ajuste de cálculo matemático de modificador no `prepareDerivedData()`.
     - Correção de vazamento de memória em listeners de eventos (`Hooks.off`).
     - Correção de erro de digitação ou classes CSS desalinhadas.
4. **Rótulos de Pré-lançamento (*Pre-release*)**:
   - Devem ser adicionados imediatamente após o número do patch separados por hífen: `1.0.0-alpha`, `1.0.0-alpha.1`, `1.0.0-beta.2`, `1.0.0-rc.1`.
   - *Uso no Foundry:* Testes públicos de compatibilidade com versões de desenvolvimento do Foundry (ex: Protótipos e testes da v15).

---

## 2. Template de Especificação Técnica (Tech Spec / RFC)

Utilize este documento antes de iniciar a implementação de novos recursos:

```markdown
# RFC-001: [Título do Recurso / Sistema]
**Status:** [Rascunho | Em Revisão | Aprovado | Implementado]
**Versão-Alvo do Foundry:** [ex: v14.369 Stable]
**Versão SemVer Proposta:** [ex: 1.2.0 (MINOR - nova funcionalidade retrocompatível)]
**Tipo de Pacote:** [Módulo | Sistema de RPG]

### 1. Resumo & Objetivo
[Descrição em 2 parágrafos explicando qual problema este recurso resolve para o Mestre ou Jogador.]

### 2. Documentos & Modelos Afetados
- **Actors:** [Ex: Adição do campo 'mana' no TypeDataModel de Personagem]
- **Items:** [Ex: Novo subtipo de item 'feitico' com campos de custo e círculo]
- **Hooks Acionados:** [Ex: Hooks.on('renderChatMessage'), Hooks.on('combatTurn')]

### 3. Contratos de API & Dependências
- Dependências Obrigatórias: [Nenhuma | lib-wrapper | socketlib]
- Módulos com Integração Opcional: [Dice So Nice!, Sequencer]

### 4. Critérios de Aceitação (Definition of Done)
- [ ] O cálculo de atributos atualiza automaticamente sem recarregar a página.
- [ ] Testes unitários com Vitest cobrem 100% dos métodos de derivação de dados.
- [ ] Documentação de uso em Português e Inglês adicionada ao README.
- [ ] Zero erros de depreciação no console da versão-alvo.
```

---

## 3. Template Padrão de Pull Request (PR)

Toda entrega de código deve ser submetida com este modelo estruturado com vinculação SemVer:

```markdown
## 🎯 Tipo de Alteração & Impacto SemVer
- [ ] 💥 `feat!:`, `fix!:` Quebra de Compatibilidade (*Breaking Change*) ➔ **MAJOR (X.0.0)**
- [ ] ✨ `feat:` Nova Funcionalidade Retrocompatível ➔ **MINOR (x.Y.0)**
- [ ] 🐛 `fix:` Correção de Bug Retrocompatível ➔ **PATCH (x.y.Z)**
- [ ] ♻️ `refactor:` Refatoração interna sem alteração de comportamento
- [ ] ⚡ `perf:` Melhoria de performance
- [ ] 📝 `docs:` Alterações puramente em documentação

## 📋 Resumo das Mudanças
- Migrado o formulário de configuração para `foundry.applications.api.ApplicationV2`.
- Adicionado cálculo automático de bônus de ataque no `prepareDerivedData()`.
- Removido listener legado que causava vazamento de memória ao fechar a janela.

## 🧪 Como Testar (Roteiro de Homologação)
1. Abrir um mundo no Foundry VTT na versão [X].
2. Criar um novo Ator do tipo [X].
3. Alterar o valor do atributo 'Força' de 10 para 16.
4. **Resultado Esperado:** O modificador deve mudar instantaneamente de +0 para +3 na ficha e no chat.

## 🚨 Breaking Changes & Migração de Dados
- [X] Nenhuma breaking change (atualização segura).
- [ ] **BREAKING CHANGE:** Requer execução do script de migração de compêndios / Incremento de MAJOR.

## ✅ Checklist de Qualidade
- [X] Versão atualizada no `module.json` / `system.json` conforme SemVer 2.0.0.
- [X] Testes automatizados executados e passando (`npm test`).
- [X] Código revisado pelo Auditor Geral contra vazamento de memória.
- [X] Documentação atualizada em Inglês e Português.
```

---

## 4. Roteiro de Handoff (Transição para o Mestre / Usuário Final)

Ao entregar a versão final do módulo:
1. **Manifesto SemVer & Instalação Imediata**: URL direta do `manifest.json` com versão SemVer sincronizada para colagem no gerenciador de pacotes do Foundry.
2. **Primeiros Passos**: Checklist de 3 minutos explicando como ativar o módulo nas configurações do mundo e quais botões novos aparecem na barra de ferramentas.
3. **Resolução de Problemas (Troubleshooting Rápido)**: 3 perguntas e respostas frequentes para erros comuns de configuração.
