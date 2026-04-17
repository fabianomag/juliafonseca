# Julia Fonseca Arquitetura — Guia Rápido

> Este arquivo é um espelho curto do contexto operacional.
> Se precisar de mais contexto, leia primeiro [`AGENTS.md`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/AGENTS.md).

## Regra principal

Este projeto **não precisa ser reinventado**.  
Ele já tem arquitetura, componentes e linguagem visual definidas.  
O trabalho normal aqui é de **ajuste fino**.

## Linguagem visual atual

- base branca
- estrutura preta / cinza escuro
- acentos em azul elétrico e ciano
- gradientes usados de forma pontual
- `font-display` como protagonista
- `font-serif` só como apoio pontual
- influência forte de:
  - Jacobsen Arquitetura
  - Arthur Casas

## Não assuma estas coisas antigas

Ignore direções antigas que falavam em:

- serif clássica como protagonista
- site puramente editorial/creme/minimalista clássico
- reconstrução completa do site
- `content/projects.json` como fonte principal
- `scripts/sync-drive.js` como fluxo real

## Fonte da verdade do projeto

### Shell global

- [`src/app/layout.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/layout.tsx)
- [`src/app/globals.css`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/globals.css)
- [`tailwind.config.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/tailwind.config.ts)

### Rotas principais

- home: [`src/app/page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/page.tsx)
- projetos: [`src/app/projetos/page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/projetos/page.tsx)
- detalhe de projeto: [`src/components/project-page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/project-page.tsx)
- sobre: [`src/app/sobre/page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/sobre/page.tsx)
- contato: [`src/app/contato/page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/contato/page.tsx)
- publicações: [`src/app/publicacoes/page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/publicacoes/page.tsx)

### Componentes mais importantes

- navegação: [`src/components/navigation.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/navigation.tsx)
- brand/logo: [`src/components/brand-mark.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/brand-mark.tsx)
- intro: [`src/components/site-intro.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/site-intro.tsx)
- footer global: [`src/components/footer.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/footer.tsx)
- footer detalhe: [`src/components/project-detail-footer.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/project-detail-footer.tsx)
- filtros: [`src/components/projects-filter.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/projects-filter.tsx)
- carrossel final do detalhe: [`src/components/project-strip-carousel.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/project-strip-carousel.tsx)

### Dados

- fonte principal: [`content/projects/projects.json`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/content/projects/projects.json)
- leitura dos projetos: [`src/lib/projects.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/projects.ts)
- idioma: [`src/lib/i18n.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/i18n.ts)
- metadata/SEO: [`src/lib/metadata.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/metadata.ts)

## Drive

Só entre no assunto Drive se a tarefa pedir isso.

Arquivos reais:

- [`src/lib/drive.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/drive.ts)
- [`src/lib/drive-sync.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/drive-sync.ts)
- [`scripts/sync-drive.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/scripts/sync-drive.ts)
- [`DRIVE-SETUP.md`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/DRIVE-SETUP.md)

## Regra prática para novas janelas

Leia este arquivo e depois abra **somente** os arquivos ligados à tarefa atual.
