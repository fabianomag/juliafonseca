# Architecture Reference Site — Agent Map

Leia antes de alterar identidade, rotas, conteúdo, motion, imagens ou SEO.

## Leitura inicial

1. `DECISIONS.md`
2. `ARCHITECTURE.md`
3. `REFERENCES.md`
4. `NEXT.md`
5. somente então o menor arquivo ligado à tarefa

## Tese ativa

Este repositório está sendo convertido de um site de cliente em um case público
de frontend sênior para um estúdio de arquitetura conceitual.

- `julia` preserva o site anterior.
- `dev` é a linha de reconstrução.
- `main` recebe o novo site somente depois da validação final.

## Regras

- Não restaurar nome, marca, contatos, textos ou projetos de Julia em `dev`.
- Remover `publicacoes` de rotas, navegação, sitemap e metadata.
- Preservar e elevar os melhores sistemas atuais; não reconstruir por esporte.
- Tratar referências como direção, nunca como autorização para copiar conteúdo.
- Usar imagens somente quando a licença estiver registrada.
- Manter o efeito de máscara da home baseado no demo MIT do Codrops/Hiroki.
- Priorizar acessibilidade, responsividade, SEO técnico, performance e motion com
  fallback para `prefers-reduced-motion`.
- Não publicar nem fazer merge em `main` sem build, revisão visual e auditoria
  do conteúdo residual da cliente.

## Fonte da verdade

- estrutura e limites: `ARCHITECTURE.md`
- decisões: `DECISIONS.md`
- referências e licenças: `REFERENCES.md`
- sequência de execução: `NEXT.md`
- comportamento atual: código em `src/`
