# 🛠️ Guia de Desenvolvimento

Como o projeto roda injetado em um ambiente de produção de terceiros, **não existe localhost tradicional**.

## 1. O Ciclo de Desenvolvimento
1.  **Código:** Edite os arquivos na pasta `src/`.
2.  **Build:** O projeto usa `esbuild` para empacotar os módulos em um único arquivo.
    * Comando: `npm install` (primeira vez)
    * O GitHub Actions roda o build automaticamente no Push.
3.  **Deploy:**
    * Commits na branch `main` geram o `dist/bundle.js` (Produção).
    * Commits na branch `refactor-structure` geram o `dist/bundle-dev.js` (Desenvolvimento).
4.  **Teste:**
    * Vá até o CRM.
    * Use o **Bookmarklet de DEV** (veja `README.md`) para injetar a versão de teste.
    * O console do navegador mostrará "✅ TechSol DEV carregado!".

## 2. Adicionando Novos Recursos
### Criar um Novo Módulo
1.  Crie a pasta `src/modules/nome-do-modulo/`.
2.  Crie o arquivo principal `nome-assistant.js` exportando uma função `initNomeAssistant`.
3.  Importe e inicialize no `src/app.js`.
4.  Adicione o botão correspondente no `src/modules/shared/command-center.js`.

### Estilização
* Evite arquivos CSS externos (.css).
* Use objetos de estilo JavaScript (CSS-in-JS) em `src/modules/shared/utils.js` ou injete tags `<style>` dinamicamente se precisar de pseudo-seletores (`:hover`, `::before`).

## 3. Boas Práticas (Anti-Quebra)
* **Seletores:** O CRM muda classes frequentemente. Prefira buscar por atributos (`aria-label`, `debug-id`) ou texto interno via XPath.
* **Timers:** Nunca assuma que uma ação é instantânea. Use `await esperar(ms)` após cliques que abrem modais ou menus.
* **Erros:** Envolva interações com o DOM em blocos `try/catch` para que uma falha na automação não trave a interface inteira.