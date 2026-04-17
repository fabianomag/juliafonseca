# Prompt — Google Drive Integration (colar numa sessao futura)

> Cole este prompt inteiro numa nova conversa do Claude Code, dentro do diretorio do projeto Julia Fonseca.

---

## Contexto

Estou trabalhando no site da Julia Fonseca (arquiteta alto padrao). O site e Next.js 14 + Tailwind, e o conteudo de projetos vem de `content/projects/projects.json`. A estrutura ja existe — paginas de categoria, pagina unificada `/projetos` com filtros, paginas de detalhe por projeto.

O proximo passo e integrar o Google Drive como fonte de imagens. A Julia vai organizar fotos no Drive, e o site precisa puxa-las automaticamente.

## O que ja existe no codigo

- `src/lib/drive.ts` — modulo que conecta na Drive API e gera um manifest
- `src/lib/drive-sync.ts` — script de build-time que faz merge do Drive com o projects.json local
- `scripts/sync-drive.js` — script npm para rodar o sync
- `src/app/api/drive-image/[fileId]/route.ts` — proxy endpoint para servir imagens do Drive com cache
- `DRIVE-SETUP.md` — guia passo-a-passo para configurar o Google Cloud + Service Account
- `.env.example` com `GOOGLE_SERVICE_ACCOUNT_JSON` e `GOOGLE_DRIVE_FOLDER_ID`

## O que eu preciso que voce faca

### 1. Testar a integracao de ponta a ponta

Eu ja criei um projeto no Google Cloud Console e tenho as credenciais. Preciso que voce me guie para:
- Verificar se o modulo `drive.ts` funciona corretamente com credenciais reais
- Rodar `npm run sync-drive` e verificar que o `projects.json` e atualizado
- Subir uma foto nova no Drive e confirmar que aparece no site apos sync

### 2. Fluxo de foto nova → projeto novo (conceito para implementar)

A ideia central: quando a Julia sobe uma foto no Drive, ela pode criar um projeto novo automaticamente. A logica seria:

- A **primeira foto** dentro de uma pasta nova e o sinal de que esse projeto existe
- O nome da pasta vira o slug do projeto (ex: `casa-verde` → `/residencial/casa-verde`)
- A pasta pai determina a categoria (`residencial/`, `comercial/`, `interiores/`)
- Se tiver um `meta.md` dentro da pasta, usa os dados dele (titulo, ano, descricao, etc.)
- Se nao tiver `meta.md`, o site gera defaults a partir do nome da pasta

**Hierarquia de imagens dentro da pasta:**
```
casa-verde/
  fachada_01.jpg      ← cover (primeira na ordenacao)
  sala_02.jpg         ← galeria
  detalhe_03.jpg      ← galeria
  meta.md             ← opcional
```

A ordenacao vem do numero no nome (`_01`, `_02`, etc.). A primeira imagem na ordem e a cover do projeto.

### 3. Questoes em aberto (decidir durante a implementacao)

- **Estrutura de pastas vs pasta unica:** Ainda nao decidimos se cada projeto vai ter sua propria pasta ou se vai ser tudo numa pasta so com nomenclatura padrao. Comecar com a estrutura de subpastas (como descrito acima) e o mais natural.
- **Deteccao automatica vs sync manual:** Comecar com ISR (`revalidate: 3600`) — a cada hora o site verifica mudancas. Webhook do Drive e uma otimizacao futura.
- **Imagens proxy vs imagens diretas:** O endpoint `/api/drive-image/[fileId]` ja faz proxy com cache. Manter isso.
- **Fallback para dados locais:** Se o Drive nao estiver conectado (`DRIVE_ENABLED=false` no `.env`), o site usa os placeholders do `projects.json`. Esse comportamento ja existe.

### 4. O que NAO fazer

- Nao mudar layout, design ou componentes visuais
- Nao criar CMS ou interface admin
- Nao configurar o Drive automaticamente (eu faço manualmente seguindo o DRIVE-SETUP.md)
- Nao commitar credenciais ou chaves

### 5. Resultado esperado

Ao final dessa sessao, eu quero:
1. Confirmar que o sync funciona com meu Drive de teste
2. Entender exatamente o que preciso replicar quando for na casa da Julia
3. Ter confianca de que quando ela adicionar fotos no Drive, o site atualiza sozinho
4. Documentacao atualizada se algo mudou no processo

---

**Arquivos relevantes para ler primeiro:**
- `CLAUDE.md` (contexto completo do projeto)
- `DRIVE-SETUP.md` (guia de setup)
- `src/lib/drive.ts` (modulo de integracao)
- `src/lib/drive-sync.ts` (script de sync)
- `content/projects/projects.json` (dados atuais)
