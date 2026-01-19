Guia para desenvolvedores que precisam alterar ou corrigir o código.

1. O Ambiente de Desenvolvimento
NÃO EXISTE LOCALHOST. Como o script interage com o DOM de um site seguro e autenticado, não podemos rodá-lo fora desse ambiente.

O Ciclo de Desenvolvimento:
Edite o código na sua máquina (VS Code).

Compile usando o comando de build (gera dist/bundle-dev.js).

Push para a branch refactor-structure (ou outra branch de dev).

Aguarde o GitHub Action (aprox. 40s) fazer o deploy no GitHub Pages.

Teste no CRM usando o Bookmarklet de DEV (que aponta para bundle-dev.js).

2. Comandos Build
O projeto usa npm e esbuild para empacotar os módulos.

Bash

# Instalar dependências
npm install

# Build Manual (Gera bundle.js na pasta dist)
./node_modules/.bin/esbuild src/app.js --bundle --outfile=dist/bundle.js --minify
Nota: O GitHub Actions faz isso automaticamente no push.

3. Regras de Ouro (Anti-Quebra)
Nunca use import absoluto: Sempre use caminhos relativos (./shared/utils.js). O navegador não sabe resolver imports absolutos no bundle final sem configuração extra.

Cuidado com z-index: O CRM tem modais com z-index alto. Nossos componentes usam 9999 ou 2147483647 (max int) para flutuar sobre tudo.

Não confie no DOM: O CRM é um SPA (Angular). Elementos aparecem e somem.

❌ Não use: document.querySelector('#btn').click()

✅ Use: await esperar(500); e verifique se o elemento existe antes de clicar.

AudioContext: Os navegadores bloqueiam áudio automático. O SoundManager só inicializa após a primeira interação do usuário (clique no bookmarklet).