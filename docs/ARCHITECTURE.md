# 🏛️ Arquitetura do Sistema (TechSol Operations Assistant)

## 1. Visão Geral
O projeto é uma **Overlay Application** (Aplicação de Sobreposição) injetada via **Bookmarklet**. Diferente de extensões de navegador, ela não possui armazenamento persistente próprio além do `localStorage` e roda no contexto da página alvo (CRM), compartilhando o mesmo DOM e objeto `window`.

### 1.1 O Mecanismo de Injeção
Para contornar a *Content Security Policy (CSP)* estrita do CRM, o bookmarklet de instalação utiliza a API `trustedTypes`.
* **Política:** Cria uma política chamada `default` que autoriza a execução de scripts vindos do domínio `lucastdcs.github.io`.
* **Cache Busting:** Anexa um timestamp (`?t=...`) na URL do script para forçar o navegador a baixar a versão mais recente a cada execução.

## 2. Estrutura de Inicialização (`src/app.js`)
O ponto de entrada é o arquivo `app.js`. Ele orquestra o "boot" da aplicação em uma ordem específica para garantir estabilidade visual e funcional:

1.  **Bloqueio de Múltiplas Instâncias:** Verifica `window.techSolInitialized` para impedir que o script rode duas vezes na mesma aba.
2.  **Styles & Fonts:** Injeta estilos globais e a fonte Roboto/Google Sans no `<head>` via `initGlobalStylesAndFont`.
3.  **Audio Engine:** Inicializa o `SoundManager` e adiciona listeners globais para feedback tátil (sons de hover/click).
4.  **Data Fetching:** Dispara a busca assíncrona de dicas e broadcasts (`DataService.fetchTips`).
5.  **Module Init:** Instancia cada módulo (Notes, Email, Script, etc.), que retornam suas funções de controle (ex: `toggleNotes`).
6.  **Command Center:** Injeta a pílula flutuante principal, passando as funções de controle dos módulos para os botões.

## 3. Fluxo de Dados (Backend Serverless)
Como não possuímos um backend tradicional, utilizamos o **Google Apps Script** como API.

* **Interface:** `src/modules/shared/data-service.js`.
* **Leitura (GET via JSONP):** Para evitar bloqueios de CORS em requisições GET, utilizamos a técnica de **JSONP**.
    * O script cria uma tag `<script>` apontando para a macro do Google.
    * A macro retorna o JSON embrulhado em uma função de callback (`cw_cb_12345(...)`).
    * O frontend executa essa função e resolve a Promise com os dados.
* **Escrita (POST no-cors):** Para logs e envio de broadcasts.
    * Utilizamos `fetch` com `mode: 'no-cors'`.
    * **Limitação:** Não recebemos resposta de sucesso/erro (Opaque Response), mas os dados são processados pelo servidor.

## 4. Design System & UI
A interface não usa frameworks (React/Vue). É construída com **Vanilla JS** e **CSS-in-JS**.
* **Header Factory:** Padroniza as janelas com efeito "Glassmorphism" (vidro), barra de gradiente Google e botões de controle.
* **Genie Effect:** O sistema de animação (`animations.js`) calcula a posição do botão flutuante e do centro da tela para criar o efeito de "gênio da lâmpada" ao abrir/fechar módulos.