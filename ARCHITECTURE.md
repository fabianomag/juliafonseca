# Studio Flamboyant — Arquitetura

## Produto e fronteira

Studio Flamboyant é um case público de frontend apresentado como experiência de
um escritório de arquitetura conceitual. A arquitetura, a marca e os três
projetos são fictícios e não construídos; o trabalho de design e engenharia do
site é real e creditado a Fabiano Frank.

O produto não capta clientes de arquitetura. O fechamento comercial leva a um
formulário para sites, sistemas frontend e produtos digitais.

## Runtime e organização

- Next.js 16 App Router, React 19 e TypeScript;
- Server Components por padrão e ilhas client somente para navegação, motion,
  sugestão de idioma e formulário;
- conteúdo localizado e contratos de rota centralizados em
  `src/content/site.ts`;
- estilos responsivos e tokens do sistema em `src/app/globals.css`;
- tipografia editorial baseada em fontes de sistema (`Helvetica Neue`/Helvetica/
  Arial e Georgia) e wordmark inline em SVG próprio, sem payload ou repintura
  tardia de webfont;
- assets locais processados por `next/image`;
- páginas de projeto pré-geradas por `generateStaticParams`, com
  `dynamicParams = false`;
- `global-not-found.tsx` como saída explícita para URLs fora do contrato.

## Contrato de URLs

O inglês é canônico e não recebe prefixo. O português brasileiro ocupa a árvore
`/pt`. Não há redirecionamento geográfico obrigatório.

| Inglês | Português |
| --- | --- |
| `/` | `/pt` |
| `/projects` | `/pt/projetos` |
| `/projects/horizon-pavilion` | `/pt/projetos/pavilhao-horizonte` |
| `/projects/mist-house` | `/pt/projetos/casa-neblina` |
| `/projects/courtyard-house` | `/pt/projetos/casa-patio` |
| `/studio` | `/pt/escritorio` |
| `/contact` | `/pt/contato` |
| `/privacy` | `/pt/privacidade` |

## Composição da interface

`LocaleRoot` monta o documento de cada idioma: `html[lang]`, skip link,
navegação, conteúdo principal, rodapé sensível à rota, sugestão de idioma,
dados estruturados, Analytics e Speed Insights. Home, Studio e detalhes de
projeto são superfícies imersivas sem rodapé; índice, contato e privacidade
mantêm o fechamento institucional.

- A home usa a variante Column Grid (`index4`) do demo MIT de Hiroki/Codrops,
  sem polígonos ou máscara triangular. Cada coluna da máscara SVG é revelada de
  cima/baixo em ordem embaralhada internamente, da esquerda para a direita, com
  grades responsivas de 14, 10 ou 6 colunas e a timeline original conduzida por
  GSAP/ScrollTrigger.
- `prefers-reduced-motion` remove a timeline de scroll e mantém uma leitura
  estática. Lenis também é desativado para movimento reduzido e ponteiro coarse.
- O índice entra diretamente nos três estudos, sem abertura editorial visível.
- O detalhe usa um hero contínuo de 175svh: título/metadados nos primeiros
  100svh e texto/fatos sobre a mesma imagem nos 75svh seguintes. A galeria
  percorre `feature-left`, `feature-right` e `triptych`, com razões 1.72/0.88 e
  o espaçamento assimétrico preservado.
- A página de escritório ocupa uma única viewport. No desktop, trilho de mídia e
  texto formam um 50/50 com rolagens internas; no mobile, a mídia preenche o
  fundo e o texto ocupa um cartão branco inset de 50svh. O loop visual tem pausa
  persistente, pausa durante interação, região rolável por teclado e fallback de
  movimento reduzido.
- No desktop, a navegação começa com wordmark, links centrais e pílula Contato;
  ao rolar, esses elementos cedem lugar à pílula Menu no canto direito. No
  mobile, Menu já é o estado inicial. O overlay preserva ciclo de foco,
  fechamento por Escape e troca de idioma para a contraparte exata da rota.

## Conteúdo e mídia

Existe uma única fonte tipada para conteúdo EN/PT, IDs, slugs, rotas e imagens.
Os projetos são:

- Horizon Pavilion / Pavilhão Horizonte;
- Mist House / Casa Neblina;
- Courtyard House / Casa Pátio.

Nenhum projeto declara localização, área, cliente, equipe, fotógrafo ou autoria
arquitetônica inexistente. Dez imagens-base vieram do repositório
`Hiro-kiii/Scroll-Transition` na revisão fixada em `REFERENCES.md`; outras
quatorze visualizações ficcionais foram geradas especificamente para completar
os três ciclos de galeria. Todos os arquivos foram processados sem upscale;
`THIRD_PARTY_NOTICES.md` registra a base MIT e `GENERATED_ASSETS.md` registra
origem, prompts, dimensões e hashes dos complementos. A cópia integral da
licença MIT permanece em `public/licenses/`.

Arthur Casas, OH Architecture e Mana Hotel são referências de composição e
interação; nenhum asset, texto, marca ou código desses sites foi incorporado.

## Idioma e sugestão regional

O seletor manual grava `studio-flamboyant-locale` em `localStorage`. Para uma
primeira visita em inglês, `GET /api/locale-hint` lê apenas o header
`x-vercel-ip-country` e devolve `{ suggestPortuguese: boolean }`. O cliente mostra
uma sugestão descartável quando o país é BR; a decisão nunca bloqueia nem
redireciona a navegação.

O endpoint não devolve o país ou IP, usa cache privado curto e marca a resposta
como `noindex`.

## Captação de leads

`ContactView` restaura a composição full-bleed com mapa viário de Montes Claros,
card de formulário e dock animado. Leaflet renderiza localmente um recorte
GeoJSON do OpenStreetMap; a página exibe atribuição ODbL e não envia posição,
endereço ou dado cartográfico do visitante.

`POST /api/leads` é um Route Handler Node.js. O fluxo é:

1. limitar o corpo JSON a 16 KiB e validar `Content-Type` e origem;
2. aplicar honeypot, tempo mínimo de preenchimento e expiração do formulário;
3. validar e normalizar os campos com Zod;
4. renderizar versões HTML e texto do aviso com React Email;
5. enviar pelo Resend com chave de idempotência derivada do `submissionId`;
6. responder com mensagens localizadas em inglês ou português.

O cliente valida os campos nativos antes da requisição e registra
`lead_submitted` somente após sucesso, com idioma e tipo de projeto. Não existe
banco de leads. Os logs do servidor contêm apenas resultado técnico,
`submissionId`, duração e eventual status do provedor; nome, e-mail, empresa e
mensagem não entram no log.

As credenciais são carregadas apenas durante a requisição. Em produção, o
endpoint retorna erro de serviço indisponível quando `NEXT_PUBLIC_SITE_URL`,
`RESEND_API_KEY`, `CONTACT_TO_EMAIL` ou `CONTACT_FROM_EMAIL` não estão
configuradas corretamente. Rate limiting no edge permanece requisito de deploy.

## SEO e descoberta

- `NEXT_PUBLIC_SITE_URL` define a origem canônica; os fallbacks de ambiente da
  Vercel e `localhost` existem para build e desenvolvimento;
- cada página publica canonical e alternates `en`, `pt-BR` e `x-default`;
- projetos usam título, descrição e imagem social próprios;
- imagens Open Graph estáticas e localizadas evitam dependência de resolução de
  metadata em múltiplos root layouts;
- `sitemap.xml` lista as contrapartes EN/PT de home, índice, estúdio e projetos;
- `robots.txt` libera páginas, bloqueia `/api/` e aponta para o sitemap;
- JSON-LD usa apenas tipos verdadeiros: `WebSite`, `CollectionPage` e
  `CreativeWork`.

Não há schema de `Architect`, `LocalBusiness`, endereço, telefone ou equipe
fictícia.

## Acessibilidade, performance e segurança

A implementação inclui landmarks, skip link, labels, estados `aria-live`,
navegação por teclado, foco preso no menu, textos alternativos localizados e
fallback para movimento reduzido. Imagens têm dimensões estáveis por
`next/image`; smooth scroll é evitado em dispositivos coarse.

O Next configura compressão, formatos AVIF/WebP e headers de segurança para
MIME sniffing, referrer, framing e permissões de câmera, microfone e
geolocalização.

O `package.json` aplica um override transitivo de PostCSS 8.5.19 ao Next.js
16.2.10. Isso remove a versão vulnerável empacotada pelo framework sem aceitar o
downgrade destrutivo sugerido pelo audit; build, typecheck, lint e a suíte de
produção validam a compatibilidade. O override deve ser reavaliado quando o
Next incorporar uma versão corrigida diretamente.

O harness de qualidade contém:

- ESLint flat config para Next 16 e TypeScript;
- typecheck e build;
- Playwright com matriz Chromium desktop, mobile e tablet, incluindo execução
  isolada contra `next start`;
- smoke das rotas EN/PT e das rotas retiradas;
- navegação/localização, responsividade, formulário e movimento reduzido;
- testes diretos do contrato seguro de `/api/leads` sem envio de e-mail;
- Axe nas páginas principais, bloqueando violações serious e critical;
- Lighthouse mobile nas cinco superfícies críticas.

O README registra a baseline de laboratório do build; métricas de campo só são
afirmadas depois do deploy.

## Deploy e branches

- `dev` contém o case e sua validação;
- a branch de publicação recebe o case somente depois de configuração do
  ambiente, verificação no Vercel e aprovação explícita;
- repositório, projeto Vercel e domínio públicos precisam ser neutros e próprios
  do Studio Flamboyant/Fabiano Frank.

As únicas pendências operacionais ficam em `NEXT.md`.
