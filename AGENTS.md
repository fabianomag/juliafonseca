# Julia Fonseca Arquitetura — Contexto do Projeto

> Leia este arquivo inteiro antes de fazer qualquer coisa neste projeto.

## Quem é a cliente

**Julia Fonseca** — Arquiteta, residencial e comercial alto padrão e interiores  
Site atual: https://www.juliafonsecaarq.com/ (Webador — será substituído)  
Instagram: @juliafonseca.arq  
Contato: juliafonseca.arquiteta@gmail.com / WhatsApp +55 38 99266-5556  
Localização: Minas Gerais (Brasil) — atende alto padrão

**Projetos mapeados (do site atual):**
- Residencial: 20+ projetos, renderings 3D, fachadas, interiores
- Comercial: 8+ projetos, fachadas e espaços
- Interiores: Andrade, Clemilde, Cris e Odair, Sabrina, Rosiris, João e Estela, Angela, Ariane, Livia e Mark, Socorro, Tia Mara, Espaço Gourmet, Quarto Augusto, Angeline, Quarto Sofia

## O que é esse site

**NÃO é** um portfolio digital estático com galerias de fotos. Não é Webador com carrossel.

**É** um showroom online que converte. Visitante entra, sente que é o nível certo para ele, e entra em contato. Cada projeto é uma narrativa visual — não uma série de fotos sem contexto.

**A ideia central:** arquitetura alto padrão se vende por aspiração e confiança. O site precisa transmitir ambos em 10 segundos. O visitante chegou por indicação ou Google — o site valida que a indicação faz sentido.

## Direção de design

**Estilo:** minimal artístico, editorial, alto padrão. Muito espaço em branco (ou fundo creme/off-white). Imagens grandes e respirando. Nada de cluttered, nada de bordas coloridas, nada de elementos decorativos genéricos.

**Tipografia:** display com caráter — serif elegante (Playfair Display, Cormorant Garamond, ou similar) para títulos, sans-serif refinado para corpo. O contraste tipográfico é parte da identidade.

**Cores:** neutros puros — branco, preto, creme. Sem cor de destaque chamativa. A cor vem das fotos dos projetos.

**Layout:** assimétrico e editorial. Imagens que "quebram" o grid. Hero full-bleed. Navegação discreta. Rodapé minimalista.

**Motion:** scroll reveal suave nos projetos. Transições de página elegantes. Nada brusco.

**Referências:** Studio MK27, Triptyque, Bjarke Ingels Group (como apresentam projetos), Archilovers portfolios premium.

## Estrutura de rotas

```
/                          → Hero full-bleed + 3 verticais (residencial/comercial/interiores) + CTA contato
/residencial               → Grid de projetos como cards narrativos (foto + nome + ano + tipologia)
/residencial/[slug]        → Projeto individual: hero + meta (ano, local, área) + texto narrativo + galeria + ficha técnica
/comercial                 → idem
/comercial/[slug]          → idem
/interiores                → idem
/interiores/[slug]         → idem
/sobre                     → Julia, filosofia, formação, abordagem
/contato                   → WhatsApp + email + formulário simples
```

## Template de projeto individual (IMPORTANTE)

Cada página `/[categoria]/[slug]` segue esta estrutura narrativa:
1. **Hero** full-bleed com foto principal do projeto
2. **Meta**: ano, localização (cidade/estado), área m², tipologia
3. **Narrativa** curta (3 parágrafos): problema do cliente → conceito da Julia → resultado
4. **Galeria** cronológica com reveal on scroll
5. **Ficha técnica**: colaboradores, fotógrafo (se houver)
6. **Navegação**: projeto anterior / próximo projeto

## Google Drive como banco de dados (CRÍTICO)

**O objetivo final:** quando Frank for à casa da Julia, ela compartilha a pasta do Google Drive e o site atualiza automaticamente. Frank só "pluga" o Drive — não precisa de CMS, não precisa de deploy manual.

**Como funciona:**
1. Julia organiza o Drive: `/Julia-Fonseca-Site/residencial/casa-serra/`, `/comercial/escritorio-bh/`, etc.
2. Cada pasta de projeto pode ter um `meta.md` opcional com frontmatter (ano, local, area_m2, texto)
3. O indexer Next.js lê o Drive via API no build time → gera `content/projects.json`
4. ISR `revalidate: 3600` — site atualiza em até 1h quando ela mexe no Drive

**Convenção de nomenclatura de arquivos:**
```
[projeto]_[ambiente]_[sequencia].jpg
casa-serra_fachada_01.jpg
escritorio-bh_recepcao_02.jpg
quarto-sofia_detalhe_01.jpg
```

**O que construir:**
- `src/lib/drive.ts` — módulo que conecta na Drive API e gera o manifest
- `content/projects.json` — gerado pelo indexer (gitignore em produção, placeholder local)
- `DRIVE-SETUP.md` — passo-a-passo EXATO e completo para Frank conectar o Drive da Julia

**Para desenvolvimento** (sem credenciais reais): usar `content/projects.json` com dados mock baseados nos projetos já identificados. O módulo `drive.ts` deve ter um flag `DRIVE_ENABLED=true/false` no `.env`.

## SEO e GEO (embutir no código desde o início)

- JSON-LD home: `LocalBusiness` + `Architect` + `ProfessionalService`
- JSON-LD por projeto: `CreativeWork` com `author`, `dateCreated`, `locationCreated`
- Meta title/description únicos por rota (gerados do manifest)
- OG image = foto de capa do projeto
- `sitemap.ts` dinâmico a partir do manifest
- Alt text: `{tipologia} {projeto} — {ambiente} por Julia Fonseca Arquitetura`
- Redirects 301 das URLs do Webador: `/residencial` → `/residencial`, etc.
- Performance: LCP < 2s, `next/image` com responsive sizes, fetchpriority=high só no hero

## Conteúdo placeholder

Usa imagens de arquitetura do Unsplash (leves, alta qualidade, sem watermark).  
Projetos seed baseados no scraping:
- Residencial: usar nomes genéricos (Casa Serra, Casa Jardins, etc.) até Julia nomear
- Interiores: usar nomes já identificados (Andrade, Sabrina, Quarto Sofia, etc.)
- Textos narrativos: gerar baseados no estilo dos projetos (residencial = living + fachada; interiores = ambiente + cliente)

## Stack

Next.js 14 (App Router) + Tailwind CSS + TypeScript  
Deploy: Vercel  
Imagens: `next/image` + Vercel Image Optimization  
Conteúdo: Google Drive API → JSON manifest (+ MDX local como fallback)  
Sem CMS externo

## Contexto operacional

Frank é o responsável pelo projeto. A Julia ainda não viu o novo site.  
O site atual (Webador) continua no ar até Frank validar o novo com a Julia.  
Domínio final: `juliafonsecaarq.com` (apontar para Vercel quando pronto).  
GBP (Google Business Profile): Frank faz manualmente, fora do código.  
Ticket médio: a confirmar com Julia (influencia tom — premium vs ultra-luxo).
---

## ATUALIZAÇÃO — Diretriz de Design High-Profile Refinada (Experiência Sensorial e Material)

**Esta seção é adicional e não substitui nenhuma parte anterior.**  
Ela refina e atualiza os conceitos já mencionados nas seções “Direção de design”, “Tipografia”, “Cores” e “Layout”, com base na nova compreensão do posicionamento high-profile da Julia Fonseca.

### Nova Direção de Design
O site não deve tentar ser elegante ou sofisticado através de tipografia clássica ou elementos decorativos.  
A sofisticação deve vir da **experiência sensorial e material**, da mesma forma que se constrói uma casa de alto padrão: através de tons, texturas, luz, espaço e delicadeza nos detalhes.

- **Tipografia**: Deve ser neutra, discreta e funcional. Evitar serifs clássicas (como Sun Serif ou similares) que tentam parecer “classy”. A tipografia não é o protagonista — ela serve apenas para informar de forma clara e elegante, sem chamar atenção excessiva. Pode haver uso pontual de uma palavra ou título em bold forte quando for necessário dar visibilidade (ex: nome do projeto em grande escala na abertura da página), mas sempre de forma pontual e impactante, nunca como elemento central.

- **Cores e Paleta**: Abandonar o minimalismo branco/preto puro. Usar uma paleta inspirada na arquitetura contemporânea de alto padrão:
  - Terra cotta suave
  - Verde cânion (canyon green)
  - Cinza claro de microcimento
  - Tons quentes e naturais de madeira
  - Transições sutis entre tons terrosos e neutros quentes

  O site deve transmitir calor, ambient light e sensação de materiais nobres (madeira como elemento premium, concreto leve, amplitude).

- **Layout e Espaço**: Muito respiro, amplitude generosa e thoughtfulness nos detalhes. O layout deve evocar a sensação de uma casa bem projetada: espaço entre elementos, hierarquia silenciosa, transições suaves entre páginas e seções.  
  Animações e movimentos devem ser sutis, elegantes e nunca chamativos — priorizando sensação de luz, calor e fluidez.

- **Elementos Visuais**: 
  - Abertura de projetos com nome da casa/projeto em destaque bold (grande escala) combinado com belas transições de cor e ambient light.
  - Uso cuidadoso de cor e luz para criar profundidade e calor.
  - O design deve fazer o visitante sentir que está “passeando” por um espaço refinado, não navegando em um site comum.

### Objetivo da Experiência
O site deve ser tão bem resolvido em sua sutileza, materialidade e delicadeza que o próprio cliente high-profile tenha orgulho de compartilhar o link do projeto (“olha como ficou o site deste projeto”).  
Ele funciona como uma extensão natural da identidade da Julia — discreto, sofisticado e com a mesma qualidade dos projetos que ela entrega.

Esta atualização reforça que a elegância vem dos ingredientes (cores, luz, espaço, transições) e não da tipografia ou de elementos decorativos. O foco é criar uma experiência sensorial silenciosa e memorável, alinhada ao estilo de vida e ao círculo social da Julia.

---