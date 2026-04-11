# Google Drive Integration — Setup Guide

Este guia te leva do zero até o site puxando imagens do Drive da Julia automaticamente.
Tempo estimado: 15-20 minutos.

---

## Pré-requisito

Julia precisa compartilhar a pasta de fotos com você (ou com o service account).

---

## Passo 1 — Criar projeto no Google Cloud Console

1. Abrir https://console.cloud.google.com
2. Criar novo projeto: `julia-fonseca-site` (ou usar um existente)
3. No menu lateral: **APIs & Services → Library**
4. Buscar **Google Drive API** → clicar **Enable**

## Passo 2 — Criar Service Account

1. No menu lateral: **IAM & Admin → Service Accounts**
2. Clicar **Create Service Account**
   - Nome: `julia-site-drive`
   - ID: `julia-site-drive` (auto-gerado)
   - Descrição: "Lê imagens do Drive da Julia para o site"
3. Pular permissões de projeto (não precisa)
4. Clicar **Done**
5. Na lista, clicar no service account recém-criado
6. Aba **Keys → Add Key → Create new key → JSON**
7. Vai baixar um arquivo `.json` — **guardar com segurança, não commitar**

## Passo 3 — Preparar a pasta do Drive da Julia

Estrutura esperada na pasta compartilhada:

```
📁 Julia Fonseca Site (pasta raiz)
├── 📁 residencial
│   ├── 📁 casa-serra
│   │   ├── fachada_01.jpg
│   │   ├── sala_02.jpg
│   │   └── meta.md (opcional)
│   └── 📁 residencia-jardins
│       ├── patio_01.jpg
│       └── ...
├── 📁 comercial
│   └── 📁 clinica-viva
│       └── ...
└── 📁 interiores
    └── 📁 apartamento-sabrina
        └── ...
```

**Regras de nomenclatura:**
- Nomes de pasta = slug do projeto (minúsculo, hífen)
- Nomes de imagem = `ambiente_numero.jpg` (a ordem vem do número)
- Imagens fora do padrão vão pro final da galeria (sem erro)

**meta.md opcional** — se Julia quiser controlar título, ano, etc:

```markdown
---
title: Casa Serra
year: 2024
location: Montes Claros, MG
area: 380m²
description: Uma residência que dialoga com a topografia natural...
featured: true
photographer: Studio Fotos
---
```

Se não existir meta.md, o site usa o nome da pasta como título e valores padrão.

## Passo 4 — Compartilhar a pasta com o Service Account

1. No Google Drive, ir até a pasta raiz (`Julia Fonseca Site`)
2. Clicar com botão direito → **Compartilhar**
3. Adicionar o email do service account (algo como `julia-site-drive@julia-fonseca-site.iam.gserviceaccount.com`)
4. Permissão: **Leitor** (read-only é suficiente)
5. Anotar o **Folder ID** — está na URL:
   ```
   https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOpQrStUvWxYz
                                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                          ESSE é o Folder ID
   ```

## Passo 5 — Configurar .env.local

Na pasta do projeto (`Desktop/Projetos/Julia Fonseca/`):

```bash
cp .env.example .env.local
```

Editar `.env.local`:

```env
# Colar o conteúdo INTEIRO do JSON da service account em UMA LINHA
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"julia-fonseca-site",...TODO CONTEÚDO DO JSON AQUI...}'

# Folder ID da pasta raiz do Drive
GOOGLE_DRIVE_FOLDER_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz
```

**Dica:** para colocar o JSON em uma linha:
```bash
cat chave-baixada.json | tr -d '\n' | pbcopy
```

## Passo 6 — Rodar o sync

```bash
cd "Desktop/Projetos/Julia Fonseca"
npm install
npm run sync-drive
```

Se tudo estiver certo, vai mostrar:
```
=== Julia Fonseca — Drive Sync ===

[sync] Building Drive manifest...
[sync] Found 8 projects in Drive.
[sync] Results:
  Added: 0
  Updated: 8
  Preserved: 0
[sync] Written to content/projects/projects.json

✅ Sync complete!
```

O `projects.json` agora tem URLs de imagem apontando para o Drive.

## Passo 7 — Verificar no dev

```bash
npm run dev
```

Abrir http://localhost:3000 — as imagens devem carregar do Drive via proxy.

## Passo 8 — Deploy (Vercel)

No Vercel dashboard do projeto:
1. **Settings → Environment Variables**
2. Adicionar `GOOGLE_SERVICE_ACCOUNT_JSON` (valor = JSON inteiro)
3. Adicionar `GOOGLE_DRIVE_FOLDER_ID` (valor = folder ID)
4. **Redeploy**

O `prebuild` script roda automaticamente antes de cada build, atualizando as imagens.

---

## Fluxo no dia a dia

Julia adiciona fotos no Drive → Vercel rebuild (manual ou webhook) → site atualizado.

**Para forçar atualização:**
```bash
npm run sync-drive && npm run build
```

**Para adicionar projeto novo:** Julia cria uma pasta nova dentro de `residencial/`, `comercial/` ou `interiores/` com fotos dentro. Na próxima sync, o projeto aparece automaticamente no site.

---

## Troubleshooting

| Problema | Solução |
|---|---|
| "GOOGLE_SERVICE_ACCOUNT_JSON not found" | Checar se `.env.local` existe e tem a variável |
| "Image not found or not shared" | Verificar se a pasta está compartilhada com o service account |
| Imagens não carregam no site | Verificar se `drive.google.com` está no `next.config.mjs` remotePatterns |
| "Permission denied" | Service account precisa de acesso de Leitor na pasta |
| Projeto não aparece | Verificar se a pasta está dentro de `residencial/`, `comercial/` ou `interiores/` |
| meta.md não funciona | Verificar formato: YAML entre `---` delimiters, chaves em minúsculo |

---

## Segurança

- `.env.local` está no `.gitignore` — NUNCA commitar
- Service account tem acesso READ-ONLY — não pode modificar o Drive
- O proxy endpoint (`/api/drive-image/`) só serve imagens, com cache immutable de 1 ano
- Nenhuma credencial é exposta ao client
