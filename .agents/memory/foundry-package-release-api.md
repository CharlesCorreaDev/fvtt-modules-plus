# Foundry VTT — Package Release API & Guia de Publicação

Guia prático para publicação e atualização automatizada de módulos no diretório oficial do Foundry VTT via API oficial.

---

## 1. Visão Geral da API

- **Endpoint Oficial:** `https://foundryvtt.com/_api/packages/release_version/`
- **Método HTTP:** `POST`
- **Content-Type:** `application/json`
- **Autenticação:** Header `Authorization: {release_token}` (iniciando com prefixo `fvttp_`).
- **Documentação de Referência:** [Foundry Package Release API](https://foundryvtt.com/article/package-release-api/)

---

## 2. Onde Obter o Token de Release

1. Faça login na sua conta em [foundryvtt.com](https://foundryvtt.com).
2. Acesse a página de edição do pacote já cadastrado:
   `https://foundryvtt.com/packages/<package-id>/edit/`
3. No final da página (logo acima do botão **Save Package**), localize o campo **Package Release Token**.
4. Copie o token (`fvttp_...`).
5. **Segurança:** Nunca comite este token no git! Guarde-o em secrets de CI/CD (ex.: GitHub Secrets `FOUNDRY_RELEASE_TOKEN`) ou variáveis de ambiente locais.

---

## 3. Estrutura do Payload JSON

```json
{
  "id": "metamoedas-by-thorunn",
  "dry-run": false,
  "release": {
    "version": "1.0.0",
    "manifest": "https://raw.githubusercontent.com/CharlesCorreaDev/fvtt-modules-plus/main/foundry-v14/modules/metamoedas-by-thorunn/module.json",
    "notes": "https://github.com/CharlesCorreaDev/fvtt-modules-plus/blob/main/foundry-v14/modules/metamoedas-by-thorunn/CHANGELOG.md",
    "compatibility": {
      "minimum": "12",
      "verified": "14",
      "maximum": ""
    }
  }
}
```

### Detalhes dos Campos:
- `id` *(obrigatório)*: Identificador exato do pacote conforme no `module.json`.
- `dry-run` *(opcional, boolean)*: Quando `true`, valida e simula a requisição sem persistir alterações.
- `release.version` *(obrigatório)*: Versão semântica (ex.: `"1.0.0"`).
- `release.manifest` *(obrigatório)*: URL direta para o manifesto desta versão específica.
- `release.notes` *(opcional)*: URL para as notas de atualização (Changelog ou Release no GitHub).
- `release.compatibility.minimum` *(obrigatório)*: Versão mínima do Foundry (ex.: `"12"`).
- `release.compatibility.verified` *(obrigatório)*: Versão verificada do Foundry (ex.: `"14"`).
- `release.compatibility.maximum` *(opcional)*: Versão máxima compatível antes de quebrar.

---

## 4. Script de Publicação Local (PowerShell)

```powershell
# Script para disparo manual ou via pipeline local no Windows
$token = $env:FOUNDRY_RELEASE_TOKEN # ou "fvttp_SEU_TOKEN_AQUI"

$body = @{
    id = "metamoedas-by-thorunn"
    "dry-run" = $false
    release = @{
        version = "1.0.0"
        manifest = "https://raw.githubusercontent.com/CharlesCorreaDev/fvtt-modules-plus/main/foundry-v14/modules/metamoedas-by-thorunn/module.json"
        notes = "https://github.com/CharlesCorreaDev/fvtt-modules-plus/blob/main/foundry-v14/modules/metamoedas-by-thorunn/CHANGELOG.md"
        compatibility = @{
            minimum = "12"
            verified = "14"
        }
    }
} | ConvertTo-Json -Depth 5

$headers = @{
    "Content-Type"  = "application/json"
    "Authorization" = $token
}

$response = Invoke-RestMethod -Uri "https://foundryvtt.com/_api/packages/release_version/" -Method Post -Headers $headers -Body $body
$response
```

---

## 5. Automação com GitHub Actions (.github/workflows)

Workflow de exemplo para disparar sempre que uma tag de versão for criada no GitHub:

```yaml
name: Release Package to Foundry VTT

on:
  push:
    tags:
      - 'metamoedas-v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Publish version to Foundry VTT API
        run: |
          curl -X POST "https://foundryvtt.com/_api/packages/release_version/" \
            -H "Content-Type: application/json" \
            -H "Authorization: ${{ secrets.FOUNDRY_RELEASE_TOKEN }}" \
            -d '{
              "id": "metamoedas-by-thorunn",
              "dry-run": false,
              "release": {
                "version": "${{ github.ref_name }}",
                "manifest": "https://raw.githubusercontent.com/CharlesCorreaDev/fvtt-modules-plus/main/foundry-v14/modules/metamoedas-by-thorunn/module.json",
                "notes": "https://github.com/CharlesCorreaDev/fvtt-modules-plus/blob/main/foundry-v14/modules/metamoedas-by-thorunn/CHANGELOG.md",
                "compatibility": {
                  "minimum": "12",
                  "verified": "14"
                }
              }
            }'
```

---

## 6. Respostas da API e Troubleshooting

- **200 OK (Sucesso):**
  ```json
  {
    "status": "success",
    "page": "https://foundryvtt.com/packages/metamoedas-by-thorunn/edit/"
  }
  ```
- **400 Bad Request:** Dados inválidos (ex.: versão duplicada, campo obrigatório ausente ou URL inacessível).
- **429 Too Many Requests:** Limite de taxa atingido. O header `Retry-After` indica o tempo de espera (mínimo de 60s entre requisições para o mesmo pacote).
