# Prompt curto — tarefa de Google Drive

> Use este prompt em outra janela só quando a tarefa for de integração de Drive.

```text
Estou no projeto /Users/fabianofrank/Desktop/Projetos/Julia Fonseca.

Importante:
- use AGENTS.md como contexto principal do projeto
- para esta tarefa, leia também DRIVE-SETUP.md
- ignore scripts e arquivos legados que não são a fonte da verdade
- não mexa em layout, design ou componentes visuais

Fonte da verdade desta tarefa:
- src/lib/drive.ts
- src/lib/drive-sync.ts
- scripts/sync-drive.ts
- content/projects/projects.json

Ignorar:
- scripts/sync-drive.js
- content/projects.json

Objetivo:
- validar a integração com Google Drive
- testar npm run sync-drive
- confirmar que content/projects/projects.json é atualizado corretamente
- ajustar documentação somente se o fluxo real tiver mudado

Não fazer:
- não redesenhar páginas
- não refatorar arquitetura do site
- não criar CMS
- não commitar credenciais
```
