# Julia Fonseca Arquitetura — Guia Rápido

> Este arquivo é um espelho curto do contexto operacional.
> Se precisar de mais contexto, leia primeiro [AGENTS.md](AGENTS.md).

## Regra principal

Este projeto não precisa ser reinventado.
Ele já tem arquitetura, componentes e linguagem visual definidas.
O trabalho normal aqui é de ajuste fino.

## Linguagem visual atual

- base branca
- estrutura preta e cinza escuro
- acentos principais em azul elétrico e ciano
- `ambient.limao` como acento pontual de sistema
- gradientes usados de forma localizada
- `font-display` como protagonista
- `font-serif` só como apoio pontual
- influência forte de:
  - Jacobsen Arquitetura
  - Arthur Casas

## Comportamentos que já existem

- intro full-screen com lockup horizontal único:
  - `Julia Fonseca Arquitetura`
  - `JacobsenStar` grande inline
- menu fullscreen escuro, centralizado e bold
- `/projetos` como vitrine principal unificada
- footer global e footer de detalhe separados

## Não assuma estas coisas antigas

Ignore direções antigas que falavam em:

- serif clássica como protagonista
- site puramente editorial/creme/minimalista clássico
- reconstrução completa do site
- intro em duas linhas como versão vigente
- bloco `Navegação` e redes sociais dentro do menu fullscreen
- `content/projects.json` como fonte principal
- `scripts/sync-drive.js` como fluxo real

## Fonte da verdade do projeto

### Shell global

- [src/app/layout.tsx](src/app/layout.tsx)
- [src/app/globals.css](src/app/globals.css)
- [tailwind.config.ts](tailwind.config.ts)

### Rotas principais

- home: [src/app/page.tsx](src/app/page.tsx)
- projetos: [src/app/projetos/page.tsx](src/app/projetos/page.tsx)
- detalhe de projeto: [src/components/project-page.tsx](src/components/project-page.tsx)
- sobre: [src/app/sobre/page.tsx](src/app/sobre/page.tsx)
- contato: [src/app/contato/page.tsx](src/app/contato/page.tsx)
- publicações: [src/app/publicacoes/page.tsx](src/app/publicacoes/page.tsx)

### Componentes mais importantes

- navegação: [src/components/navigation.tsx](src/components/navigation.tsx)
- animação dos links do menu: [src/components/ui/flip-links.tsx](src/components/ui/flip-links.tsx)
- brand/logo: [src/components/brand-mark.tsx](src/components/brand-mark.tsx)
- intro: [src/components/site-intro.tsx](src/components/site-intro.tsx)
- footer global: [src/components/footer.tsx](src/components/footer.tsx)
- footer detalhe: [src/components/project-detail-footer.tsx](src/components/project-detail-footer.tsx)
- filtros: [src/components/projects-filter.tsx](src/components/projects-filter.tsx)
- carrossel final do detalhe: [src/components/project-strip-carousel.tsx](src/components/project-strip-carousel.tsx)

### Dados, idioma e metadata

- fonte principal: [content/projects/projects.json](content/projects/projects.json)
- leitura dos projetos: [src/lib/projects.ts](src/lib/projects.ts)
- idioma: [src/lib/i18n.ts](src/lib/i18n.ts)
- metadata/SEO: [src/lib/metadata.ts](src/lib/metadata.ts)
- favicon/tab icon: [src/app/icon.svg](src/app/icon.svg)
- Open Graph: [src/app/opengraph-image.tsx](src/app/opengraph-image.tsx)

## Fluxo de imagens

Julia manda fotos → Fabiano coloca em `_originals/[slug]/` → roda o script → imagens WebP caem em `public/images/projetos/[slug]/` → atualiza `projects.json`.

```bash
npm run optimize _originals/[slug] [slug]
```

- Primeira foto (ordem alfabética) → `cover.webp`
- Demais → `01.webp`, `02.webp` ...
- Para trocar a capa: renomeie os arquivos diretamente em `public/images/projetos/[slug]/`

Detalhes completos do fluxo: seção 8 do [AGENTS.md](AGENTS.md)

Arquivos legados (ignorar):
- `src/lib/drive.ts`, `src/lib/drive-sync.ts`, `scripts/sync-drive.ts`, `SERVER-SETUP.md`

## Regra prática para novas janelas

Leia este arquivo e depois abra somente os arquivos ligados à tarefa atual.
