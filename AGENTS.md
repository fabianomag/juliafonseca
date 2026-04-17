# Julia Fonseca Arquitetura — Contexto Atual do Projeto

> Este arquivo substitui o briefing antigo como fonte principal de contexto rápido.
> Leia este arquivo primeiro. Depois abra apenas os arquivos diretamente ligados à tarefa.

## 1. O que este projeto é hoje

- Este projeto **já está implementado** em Next.js e já passou por várias rodadas visuais.
- A prioridade atual é **ajuste fino**, não reconstrução.
- Não trate o site como “começar do zero”.
- Não trate o site como “portfólio editorial serifado minimalista clássico”.
- O foco é manter a arquitetura atual e mexer com precisão.

## 2. Conceito visual atual

### Direção

O site hoje está mais próximo de uma mistura entre:

- **Jacobsen Arquitetura** para:
  - home
  - página de projetos
  - menu fullscreen
  - footer global
- **Arthur Casas** para:
  - páginas individuais de projeto
  - ritmo de galeria
  - footer/carimbo especial do detalhe

### Linguagem

- fundo predominantemente **branco**
- estrutura em **preto / cinza escuro**
- acentos em **azul elétrico** e **ciano**
- gradientes usados de forma **pontual**, não espalhada
- presença visual bold, limpa, high-profile
- mais atitude visual do que “elegância clássica”

### Tipografia

O sistema tipográfico atual do código é:

- `font-sans`: **Barlow**
- `font-display`: **Barlow Condensed**
- `font-serif`: **Newsreader**
- `font-brand`: **Syncopate**

Regras práticas:

- `font-display` é a voz principal do site
- `font-serif` é apoio pontual, não protagonista
- **não voltar** para uma direção dominada por serif clássica
- **não usar** sans genérica sem critério

### Branding

- a marca é modular e vive em [`src/components/brand-mark.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/brand-mark.tsx)
- existe um símbolo chamado `JacobsenStar`
- a intro do site usa esse símbolo no final da palavra `ARQUITETURA`

## 3. Comportamentos visuais importantes

- existe uma **intro/splash** na abertura do site
- o menu é **fullscreen** e escuro
- `/projetos` é uma página **unificada**, com filtros
- páginas individuais têm:
  - hero grande
  - bloco meta
  - narrativa
  - galeria variável
  - carrossel horizontal de projetos relacionados
  - footer/carimbo especial

## 4. Rotas e arquitetura atual

Rotas principais:

- `/`
- `/projetos`
- `/residencial`
- `/comercial`
- `/interiores`
- `/residencial/[slug]`
- `/comercial/[slug]`
- `/interiores/[slug]`
- `/sobre`
- `/contato`
- `/publicacoes`
- `/galeria-trefle`
- `/produtos`

Observações:

- a vitrine principal de projetos está em **`/projetos`**
- as rotas de categoria continuam existindo
- o idioma é controlado por query param: `?lang=pt` ou `?lang=en`
- o helper disso está em [`src/lib/i18n.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/i18n.ts)

## 5. Fonte da verdade por área

### Shell global

Abra estes arquivos primeiro para qualquer tarefa global:

- [`src/app/layout.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/layout.tsx)
- [`src/app/globals.css`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/globals.css)
- [`tailwind.config.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/tailwind.config.ts)

### Intro de abertura

- [`src/components/site-intro.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/site-intro.tsx)
- [`src/components/TextType.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/TextType.tsx)
- [`src/components/TextType.css`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/TextType.css)
- [`src/components/brand-mark.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/brand-mark.tsx)

### Navegação

- [`src/components/navigation.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/navigation.tsx)
- [`src/components/brand-mark.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/brand-mark.tsx)

### Footer

- footer global: [`src/components/footer.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/footer.tsx)
- seleção do footer correto: [`src/components/footer-controller.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/footer-controller.tsx)
- footer do detalhe: [`src/components/project-detail-footer.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/project-detail-footer.tsx)

### Home

- [`src/app/page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/page.tsx)
- [`src/components/featured-project-showcase.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/featured-project-showcase.tsx)

### Página de projetos

- rota: [`src/app/projetos/page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/projetos/page.tsx)
- filtros: [`src/components/projects-filter.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/projects-filter.tsx)
- cards: [`src/components/project-card.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/project-card.tsx)

### Páginas individuais de projeto

- template principal: [`src/components/project-page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/project-page.tsx)
- galeria: [`src/components/parallax-gallery.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/parallax-gallery.tsx)
- carrossel final: [`src/components/project-strip-carousel.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/project-strip-carousel.tsx)
- footer especial: [`src/components/project-detail-footer.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/project-detail-footer.tsx)

### Sobre / Contato / Publicações

- escritório: [`src/app/sobre/page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/sobre/page.tsx)
- contato: [`src/app/contato/page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/contato/page.tsx)
- ações do contato: [`src/components/contact-action-rows.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/contact-action-rows.tsx)
- publicações: [`src/app/publicacoes/page.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/app/publicacoes/page.tsx)
- galeria de publicações: [`src/components/publications-gallery.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/publications-gallery.tsx)

### Dados / SEO / idioma

- projetos carregados: [`src/lib/projects.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/projects.ts)
- dados atuais: [`content/projects/projects.json`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/content/projects/projects.json)
- metadados: [`src/lib/metadata.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/metadata.ts)
- JSON-LD: [`src/components/json-ld.tsx`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/components/json-ld.tsx)
- idioma: [`src/lib/i18n.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/i18n.ts)

## 6. Verdades importantes para não se confundir

### O que é verdade hoje

- o sistema visual atual é **bold + clean + branco/preto + azul/ciano**
- `font-display` é central
- `/projetos` já está unificado e funcional
- o footer global e o footer do detalhe são **diferentes**
- a intro já existe
- o menu fullscreen já existe

### O que NÃO fazer sem pedido explícito

- não refatorar a arquitetura do site
- não trocar o sistema de fontes inteiro
- não voltar para um visual dominado por serif clássica
- não recriar páginas do zero se já existe um componente responsável
- não duplicar lógica de projetos fora de `src/lib/projects.ts`
- não mexer em Drive se a tarefa for visual

## 7. Legado / armadilhas / arquivos para ignorar na maioria das tarefas

Esses pontos antigos geram confusão se forem lidos sem contexto:

- briefing antigo falando em:
  - serif como protagonista
  - neutros quentes como direção principal
  - experiência editorial clássica como eixo principal
- isso **não é mais a direção principal do projeto**

Arquivos legados ou secundários:

- [`content/projects.json`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/content/projects.json)
  - arquivo legado
  - **não é a fonte principal de dados**
- [`scripts/sync-drive.js`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/scripts/sync-drive.js)
  - script antigo/mock
  - **não é o fluxo principal**

## 8. Drive: estado atual

Só olhar os arquivos de Drive se a tarefa for sobre conteúdo / sync / integração.

Fluxo principal atual:

- integração: [`src/lib/drive.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/drive.ts)
- merge com dados locais: [`src/lib/drive-sync.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/src/lib/drive-sync.ts)
- script real: [`scripts/sync-drive.ts`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/scripts/sync-drive.ts)
- arquivo gerado principal: [`content/projects/projects.json`](/Users/fabianofrank/Desktop/Projetos/Julia%20Fonseca/content/projects/projects.json)

## 9. Como trabalhar em outra janela sem se perder

Passo mínimo recomendado:

1. ler este arquivo
2. identificar a área da tarefa
3. abrir só os arquivos daquela área
4. editar de forma cirúrgica

Prompt curto recomendado para outra janela:

```text
Use AGENTS.md como fonte principal de contexto.
Ignore pressupostos antigos de briefing visual que não batem com o código atual.
Não refatore arquitetura.
Leia só os arquivos diretamente ligados à tarefa.
Preserve a linguagem visual atual do projeto.
```

## 10. Resumo em uma frase

Este projeto hoje é um site high-profile para Julia Fonseca, com linguagem visual bold e limpa, estrutura já implementada em Next.js, e deve ser mantido por ajustes finos guiados pelos arquivos reais do app — não por briefings antigos.


<TextType 
  text={["Text typing effect", "for your websites", "Happy coding!"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor
  cursorCharacter="_"
  texts={["Welcome to React Bits! Good to see you!","Build some amazing experiences!"]}
  deletingSpeed={50}
  variableSpeedEnabled={false}
  variableSpeedMin={60}
  variableSpeedMax={120}
  cursorBlinkDuration={0.5}
/>