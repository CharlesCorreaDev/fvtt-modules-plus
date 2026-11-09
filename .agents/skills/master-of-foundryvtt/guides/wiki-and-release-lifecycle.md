# Guia Completo: Geração de Wiki Explicativa, Manuais de API e Governança de Release no Foundry VTT 📚🚀
> *Master of Foundry VTT by GM Charles Corrêa*

---

## 📌 1. Visão Geral do Ciclo de Wiki & Conclusão de Desenvolvimento

Sempre que o desenvolvimento, correção ou refatoração de um módulo ou sistema do Foundry Virtual Tabletop for dado como **concluído e aprovado pelo desenvolvedor**, (sempre pergunte ao dev) a skill `master-of-foundryvtt` ativa automaticamente o protocolo duplo:

1. **Protocolo de Documentação Exaustiva (Wiki / Manuais / API):**
   - Criação ou atualização de `WIKI.md` (ou pasta `wiki/` e GitHub Wiki) contendo a arquitetura interna, DataModels, hooks registrados, APIs expostas, classes de sheets (ApplicationV2), métodos de rolagem, compatibilidade e tutoriais passo a passo para Mestres e Jogadores.
2. **Protocolo Interativo de Release & Publicação (Git Tag, GitHub Release & API Foundry):**
   - Questionamento ativo ao desenvolvedor sobre bump de versão (SemVer: Patch, Minor, Major), geração de commit, criação de tag, publicação de GitHub Release e disparo da nova versão no diretório do Foundry VTT via API oficial.

---

## 📖 2. Estrutura Canônica da Wiki Explicativa (`WIKI.md` ou `wiki/`)

A documentação deve ser minuciosa, cobrindo tanto o lado do **Usuário Final (Mestre e Jogador)** quanto o lado do **Desenvolvedor / Integrador de Módulos (API & Hooks)**:

### 📑 Sumário Obrigatório de uma Wiki Completa:

```markdown
# Wiki Oficial: [Nome do Pacote / Sistema / Módulo]

## 1. Visão Geral e Propósito
- O que o pacote faz e qual problema resolve.
- Cenários de uso típicos e sistemas suportados.
- Versões compatíveis do Foundry VTT (v11, v12, v13, v14).

## 2. Guia do Mestre (Gamemaster Guide)
- Instalação e ativação no mundo.
- Configurações do Módulo / Sistema (`game.settings`).
- Permissões recomendadas e fluxo de jogo na mesa.
- Gerenciamento de compêndios, tabelas e cenas inclusas.

## 3. Guia dos Jogadores (Player Guide)
- Operação das fichas (Atores e Itens).
- Atalhos de rolagem, botões de ação e HUDs.
- Uso de efeitos ativos, condições e recursos.

## 4. Arquitetura Técnica & Estrutura de Pastas
- Diagrama ou árvore de diretórios do repositório.
- Padrão de importação ESModules (`main.mjs`).
- Estilos CSS/Sass com classes prefixadas obrigatórias.

## 5. Referência Completa de APIs Globais & Métodos
- Namespace global registrado no objeto `game` (ex: `game.modules.get('meu-modulo')?.api` ou `game.meuSistema`).
- Assinatura completa de métodos, tipos de parâmetros (JSDoc), retornos e exemplos de código executáveis.
- Exemplos de macros prontas para o console do Foundry.

## 6. Hooks e Eventos de Ciclo de Vida
- Hooks customizados disparados pelo pacote (ex: `Hooks.callAll("meuModuloReady", api)`).
- Hooks do Core do Foundry escutados e tratados (ex: `init`, `ready`, `renderActorSheet`, `createItem`).

## 7. Modelos de Dados (DataModels & Schemas)
- Subtipos de Actor e Item registrados em `CONFIG.Actor.dataModels` e `CONFIG.Item.dataModels`.
- Campos do esquema `foundry.data.fields` (StringField, NumberField, SchemaField, etc.).
- Como migrar dados de versões anteriores.

## 8. Solução de Problemas & FAQ (Troubleshooting)
- Conflitos conhecidos com outros módulos populares.
- Como ligar o modo de depuração / logs verbosos.
- Onde reportar bugs (Issue Templates do repositório).
```

---

## 🛠️ 3. Protocolo Interativo de Release (Perguntas Mandatórias ao Desenvolvedor)

Assim que o desenvolvedor aprova a conclusão da tarefa de código, o Agente de IA **NUNCA deve finalizar o atendimento sem antes apresentar o seguinte questionamento interativo**:

> 🎯 **Desenvolvimento Concluído e Aprovado!**  
> Deseja que eu prepare e publique a nova versão do pacote agora?
> 
> 1. **Gerar Nova Versão Semântica?**
>    - Qual o tipo de incremento? **Patch** (correções de bugs), **Minor** (novas features/compatibilidade) ou **Major** (mudança estrutural/breaking change)?
>    - Deseja atualizar o arquivo `VERSION`, o `module.json`/`system.json` e o `CHANGELOG.md`?
> 
> 2. **Publicar no Repositório Git (Commit, Tag e Release)?**
>    - Deseja que eu execute o commit com as mudanças, gere a tag `vX.Y.Z` e publique no GitHub/GitLab com os assets compactados (`module.zip` e `module.json`)?
> 
> 3. **Atualizar Diretório Oficial do Foundry VTT?**
>    - Deseja disparar a atualização na API de Release oficial (`https://foundryvtt.com/_api/packages/release_version/`) utilizando seu `FOUNDRY_API_TOKEN` cadastrado?
> 
> 4. **Gerar ou Atualizar a Wiki Explicativa Completa?**
>    - Devo consolidar a documentação de uso, APIs, métodos e hooks em `WIKI.md` agora?

---

## ⚙️ 4. Execução Técnica Automatizada da Release

Caso o desenvolvedor responda afirmativamente, o fluxo técnico executado é:

```bash
# 1. Bump nos arquivos
# Atualiza VERSION, manifesto (module.json ou system.json) e CHANGELOG.md

# 2. Executa a validação e empacotamento com o publisher oficial da skill
node scripts/foundry_package_publisher.mjs

# 3. Commit e Tag
git add .
git commit -m "chore(release): bump version to vX.Y.Z and update wiki"
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin main --tags

# 4. Disparo na API Oficial do Foundry VTT (se autorizado)
# Consome FOUNDRY_API_TOKEN do ambiente/secrets
node scripts/foundry_package_publisher.mjs --publish
```
