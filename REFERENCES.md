# References

## Implementação licenciada

### SVG Mask Transitions on Scroll

- Repositório: https://github.com/Hiro-kiii/Scroll-Transition/
- Revisão fixada:
  `6bb67c598f767a014ac595c904d85b86119670ee` (2026-03-11).
- Artigo: https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/
- Demo aprovado: https://tympanus.net/Tutorials/SVGMaskScrollTransition/index4.html
- Papel: fonte da variante Column Grid (`index4`) usada na home, com máscaras
  SVG, GSAP e ScrollTrigger. A implementação preserva a progressão por colunas,
  sem incorporar a máscara triangular de outro experimento.
- Licença: MIT; preservar o aviso de copyright do Codrops nas cópias ou partes
  substanciais.
- Assets: as dez imagens WebP do demo foram incorporadas em versões otimizadas,
  sem upscale. Licença, mapeamento, dimensões e hashes estão em
  `THIRD_PARTY_NOTICES.md`.

### Wordmark Flamboyant

- Referência de categoria: https://bymonolog.com/
- Limite: o wordmark do Monolog é arte proprietária em SVG e foi estudado apenas
  como exemplo de assinatura de estúdio; nenhum path, fonte ou arquivo do site é
  redistribuído.
- Base aberta: https://github.com/Etcetera-Type-Co/Anybody
- Revisão fixada: `fe7b55cf9d1563348ad95ac8e05f43b81a420c31`.
- Licença: SIL Open Font License 1.1, copiada em
  `public/licenses/anybody-OFL-1.1.txt`.
- Implementação: contornos próprios de `FLAMBOYANT`, comprimidos e retrabalhados
  com contraformas de chama nos dois `A`; o resultado é SVG inline e não carrega
  a fonte no navegador.

### Visualizações complementares

- Ferramenta: geração de imagens da OpenAI.
- Termos aplicáveis: https://openai.com/policies/terms-of-use/
- Papel: completar cada estudo com sete imagens pós-hero, sem atribuir uma obra
  arquitetônica real ao projeto fictício.
- Limite: os prompts não citam edifícios reais, escritórios, fotógrafos ou
  pessoas; originais, prompts, dimensões e hashes estão em
  `GENERATED_ASSETS.md`.

## Referências visuais

### Mapa viário de Montes Claros

- Dados: © contribuidores do OpenStreetMap, sob ODbL.
- Renderização: Leaflet 1.9.4, sob BSD 2-Clause.
- Papel: fundo cartográfico local da página de contato, recuperado do baseline
  anterior à reconstrução e mantido sem marcador, endereço ou contato pessoal.
- Atribuição, hash e cópia da licença do renderer: `THIRD_PARTY_NOTICES.md`.

### Studio Arthur Casas

- URL: https://www.arthurcasas.com/pt/
- Papel: composição dual da página de escritório — mídia vertical de um lado e
  conteúdo institucional mínimo do outro. Em 390 × 844, a medição de referência
  mostrou mídia full-viewport e cartão branco com inset de 10px e altura próxima
  a 50% da viewport; essa proporção orienta o mobile próprio.
- Limite: absorver proporção e ritmo; não copiar texto, código ou imagens.

### OH Architecture

- URL: https://www.oharchitecture.com.au/
- Papel: índice de projetos, header, menu superior, navegação lateral e motion.
- Limite: traduzir os princípios para o sistema próprio; não clonar a interface.

### Mana Hotel — Guilherme Torres

- URL: https://www.guilhermetorres.com/manahotel
- Papel: ritmo e disposição editorial das imagens no detalhe de projeto.
- Limite: referência de composição; as fotografias não são assets do case.

## Fronteira de atribuição

- Citar Codrops/Hiroki pela técnica e pelo demo reutilizado.
- Citar os três estúdios apenas como referências visuais no case/README.
- Não sugerir parceria, endosso ou autoria compartilhada.
