# Architecture Reference Site — Architecture

## Produto

Case público de um site de arquitetura conceitual. O resultado deve demonstrar
senioridade pelo básico completo e verificável: direção visual coerente,
composição responsiva, acessibilidade, performance, SEO e manutenção clara.

## Rotas-alvo

- `/`: abertura visual e projetos em destaque
- `/projetos`: índice e navegação entre projetos
- `/projetos/[slug]`: narrativa visual de cada projeto
- `/escritorio`: composição dual entre mídia em movimento e texto minimalista
- `/contato`: fechamento conceitual, sem identidade ou endpoint da cliente

`/publicacoes` deixa de existir e não pode permanecer em superfícies de busca ou
navegação.

## Direção visual

- Manter o caráter bold, limpo e arquitetônico já conquistado.
- Usar a página de projeto como referência interna de tipografia, proporção e
  ritmo para reconstruir `/escritorio`.
- Preservar menu superior, navegação lateral e motion fortes, refinando
  inconsistências em vez de empilhar novos efeitos.
- Usar o efeito de máscara SVG da home como assinatura, com implementação
  responsiva, sem frestas de subpixel e com fallback de movimento reduzido.

## Conteúdo e mídia

- Nenhuma imagem ou informação da cliente deve permanecer na versão pública.
- Assets do demo `Hiro-kiii/Scroll-Transition` podem ser usados com a licença
  MIT e o aviso de copyright preservados.
- Outras imagens exigem licença explícita e registro de origem.
- Imagens brutas entram em `_originals/`; entregáveis otimizados entram em
  `public/images/`.
- O script de otimização existente deve ser auditado antes de ingestão em lote.

## Qualidade de entrega

- sem resíduos de Julia em UI, metadata, JSON-LD, APIs, e-mails ou nomes internos
- sem rota ou link quebrado de publicações
- HTML semântico e navegação por teclado
- `prefers-reduced-motion` respeitado
- imagens responsivas, dimensões estáveis e formatos eficientes
- metadata, canonical, sitemap, robots e dados estruturados coerentes
- build e testes relevantes passando
- revisão visual em desktop e mobile antes do merge em `main`
