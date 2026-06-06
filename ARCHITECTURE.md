# Julia Fonseca Arquitetura - Architecture Map

Leia este arquivo antes de alterar layout, copy, componentes, rotas, ingestao
de conteudo ou dados de projetos neste repositorio.

## Tese ativa

Este e um site ja implementado em Next.js para Julia Fonseca Arquitetura.

A fase atual e refinamento, nao reconstrucao. Preserve a arquitetura existente e
faca mudancas pequenas, precisas e locais.

Se uma nota antiga conflitar com o codigo atual, o codigo vence. So atualize o
harness quando a nova direcao for duravel.

## Sistema visual vigente

- base branca
- estrutura preta e cinza escuro
- acentos principais em azul eletrico e ciano
- `ambient.limao` como acento pontual de sistema
- gradientes usados de forma localizada
- `font-display` como voz tipografica principal
- `font-serif` apenas como apoio pontual
- referencia de linguagem: Jacobsen Arquitetura e Arthur Casas

## Comportamentos que devem ser preservados

- intro fullscreen com lockup horizontal unico
- `Julia Fonseca Arquitetura` com `JacobsenStar` grande inline
- menu fullscreen escuro, centralizado e bold
- vitrine principal unificada em `/projetos`
- footer global separado do footer de detalhe
- sistema modular de marca em `src/components/brand-mark.tsx`

## Frente ativa: detalhe de projeto

O template de detalhe esta em refinamento contra referencias de arquitetura
high-profile. Nao reconstruir o fluxo; ajustar proporcao, respiro e contraste.

Direcao aceita nesta frente:

- hero com imagem full bleed e faixa inferior de metadados alinhada no mesmo
  gutter da navegacao e do texto
- galeria estatica, sem parallax
- gap da galeria deve ler como extensao do fundo da pagina, nao como mascara
  preta
- fundo do detalhe deve ser grafite com grid unico e continuo
- nao sobrepor grid proprio em galeria e carrossel quando o grid-base da pagina
  ja estiver ativo
- carousel final pode encostar nas bordas; setas devem ser suaves, sem bloco
  preto pesado
- footer de detalhe usa o mesmo clima grafite/grid do detalhe, separado do
  footer global

Arquivos mais sensiveis desta frente:

- `src/components/project-page.tsx`
- `src/components/parallax-gallery.tsx`
- `src/components/project-strip-carousel.tsx`
- `src/components/project-detail-footer.tsx`
- `src/app/globals.css`

## Fonte da verdade por area

Shell global:

- `src/app/layout.tsx`
- `src/app/globals.css`
- `tailwind.config.ts`

Rotas principais:

- `src/app/page.tsx`
- `src/app/projetos/page.tsx`
- `src/app/sobre/page.tsx`
- `src/app/contato/page.tsx`
- `src/app/publicacoes/page.tsx`

Navegacao e identidade:

- `src/components/navigation.tsx`
- `src/components/ui/flip-links.tsx`
- `src/components/brand-mark.tsx`
- `src/components/site-intro.tsx`
- `src/components/footer.tsx`
- `src/components/project-detail-footer.tsx`

Projetos:

- `src/components/projects-filter.tsx`
- `src/components/project-card.tsx`
- `src/components/project-page.tsx`
- `src/components/parallax-gallery.tsx`
- `src/components/project-strip-carousel.tsx`
- `src/components/featured-project-showcase.tsx`

Conteudo, idioma e SEO:

- `content/projects/projects.json`
- `src/lib/projects.ts`
- `src/lib/i18n.ts`
- `src/lib/metadata.ts`
- `src/components/json-ld.tsx`
- `src/app/sitemap.ts`
- `src/app/opengraph-image.tsx`
- `src/app/icon.svg`

## Fluxo de conteudo e imagens

Imagens brutas entram em `_originals/[slug]/` e ficam ignoradas pelo git.

Imagens otimizadas entram em:

```text
public/images/projetos/[slug]/
```

Use:

```bash
npm run optimize _originals/[slug] [slug]
```

Fluxo esperado:

1. Julia manda fotos
2. Frank coloca em `_originals/[slug]/`
3. o script gera imagens otimizadas em `public/images/projetos/[slug]/`
4. atualizar `content/projects/projects.json`

Convencao atual:

- primeira imagem em ordem alfabetica vira `cover.webp`
- demais imagens viram `01.webp`, `02.webp` e assim por diante
- para trocar a capa, renomeie os arquivos em `public/images/projetos/[slug]/`

## Nao reabrir sem pedido claro

- nao reconstruir o site do zero
- nao voltar para uma direcao quente, editorial classica ou serifada como eixo
  principal
- nao tratar `content/projects.json` como fonte atual
- nao duplicar dados de projeto fora dos arquivos estabelecidos
- nao expandir automacao antiga de Drive, VPN ou servidor sem tarefa explicita
- nao remover arquivos legados apenas porque nao sao o caminho atual
- nao mudar intro, menu fullscreen ou footers sem pedido especifico

Arquivos legados para ignorar por padrao:

- `src/lib/drive.ts`
- `src/lib/drive-sync.ts`
- `scripts/sync-drive.ts`
- `SERVER-SETUP.md`

## Leitura pratica por tarefa

Depois deste arquivo, abra so o menor arquivo diretamente ligado a tarefa.

Atalhos comuns:

- layout global: `src/app/layout.tsx`, `src/app/globals.css`
- navegacao: `src/components/navigation.tsx`
- home: `src/app/page.tsx`
- vitrine de projetos: `src/app/projetos/page.tsx`
- detalhe de projeto: `src/components/project-page.tsx`
- dados de projeto: `content/projects/projects.json`

## Regra de trabalho

Faca a menor mudanca que preserve o sistema atual.
