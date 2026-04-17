# Google Drive — Setup Atual

> Leia este arquivo **somente** para tarefas de Drive.
> Para tarefas visuais, ignore este arquivo e use [`AGENTS.md`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/AGENTS.md).

## O que é fonte da verdade no fluxo de Drive

Arquivos reais do fluxo atual:

- integração: [`src/lib/drive.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/drive.ts)
- merge e escrita: [`src/lib/drive-sync.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/drive-sync.ts)
- comando real: [`scripts/sync-drive.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/scripts/sync-drive.ts)
- saída principal: [`content/projects/projects.json`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/content/projects/projects.json)

Ignorar no fluxo normal:

- [`scripts/sync-drive.js`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/scripts/sync-drive.js)
  - script antigo/mock
- [`content/projects.json`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/content/projects.json)
  - arquivo legado

## Estrutura esperada no Drive

```text
Julia Fonseca Site/
  residencial/
    casa-serra/
      fachada_01.jpg
      sala_02.jpg
      meta.md
  comercial/
    clinica-viva/
      fachada_01.jpg
  interiores/
    apartamento-sabrina/
      living_01.jpg
```

## Regras importantes

- a pasta de primeiro nível define a seção:
  - `residencial`
  - `comercial`
  - `interiores`
- a pasta do projeto vira o `slug`
- imagens são ordenadas por nome
- `meta.md` é opcional

## meta.md opcional

```md
---
title: Casa Serra
year: 2024
location: Montes Claros, MG
area: 380m²
description: Texto do projeto
featured: true
photographer: Nome
---
```

## Variáveis de ambiente

Usar `.env.local` com:

```env
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
GOOGLE_DRIVE_FOLDER_ID=xxxxxxxxxxxxxxxxx
```

O `.env.example` mostra o formato esperado.

## Passo a passo curto

1. criar projeto no Google Cloud
2. ativar Google Drive API
3. criar service account com acesso somente leitura
4. compartilhar a pasta raiz do Drive com o email da service account
5. copiar o JSON da chave para `GOOGLE_SERVICE_ACCOUNT_JSON`
6. copiar o folder id da pasta raiz para `GOOGLE_DRIVE_FOLDER_ID`
7. rodar:

```bash
npm run sync-drive
```

## Resultado esperado

O comando atualiza:

- [`content/projects/projects.json`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/content/projects/projects.json)
- `content/projects/drive-manifest.json`

## Verificação local

```bash
npm run sync-drive
npm run dev
```

## Troubleshooting rápido

- erro de credencial: checar `GOOGLE_SERVICE_ACCOUNT_JSON`
- erro de pasta: checar `GOOGLE_DRIVE_FOLDER_ID`
- projeto não aparece: checar se a pasta está dentro de `residencial`, `comercial` ou `interiores`
- imagens fora de ordem: corrigir nomes dos arquivos
