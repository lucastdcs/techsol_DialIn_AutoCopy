Este documento descreve a engenharia reversa e a arquitetura do TechSol Operations Assistant.

1. O Conceito (Overlay Injection)
O projeto não é uma extensão de navegador tradicional. É uma Single Script Application (SSA) injetada via Bookmarklet.

O Host: O CRM Corporativo (Google).

O Invasor: Nosso script (bundle.js).

O Método: O usuário clica em um favorito. O navegador executa um código JavaScript que cria uma tag <script> no corpo da página atual, apontando para o nosso servidor (GitHub Pages).

O Desafio de Segurança (CSP Bypass)
O CRM possui uma Content Security Policy (CSP) estrita que bloqueia scripts externos. Solução: Utilizamos a API trustedTypes no código do bookmarklet para criar uma política chamada "default" que autoriza a injeção da nossa URL do GitHub Pages.

2. Fluxo de Dados
O aplicativo é majoritariamente Client-Side, rodando na memória do navegador do agente.

Frontend (A Interface)
Tecnologia: Vanilla JavaScript (ES6+). Sem frameworks (React/Vue) para manter o bundle leve e evitar conflitos com o Angular do CRM.

Estilização: CSS-in-JS (Objetos de estilo em utils.js e notes-styles.js) + Tags <style> injetadas dinamicamente no <head>.

UI System: Uma implementação customizada do Material Design e Glassmorphism (Apple-like), gerenciada por header-factory.js e animations.js.

Backend (Broadcast & Logs)
Como não temos um servidor Node.js, usamos Google Apps Script como Backend Serverless.

Leitura (GET): Usamos JSONP (JSON with Padding) em data-service.js.

Por que? O Google Script bloqueia requisições fetch (CORS) de origens desconhecidas. O JSONP injeta um script que executa uma função de callback global (cw_cb_...) com os dados.

Escrita (POST): Usamos fetch com mode: 'no-cors'. Não recebemos resposta de sucesso (opaque response), mas os dados são enviados (Fire-and-forget).

3. Estrutura de Diretórios
Plaintext

src/
├── app.js                  # Ponto de entrada. Inicializa todos os módulos.
├── modules/
│   ├── shared/             # O "Kernel". Utilitários usados por tudo.
│   │   ├── command-center.js # A pílula flutuante (Menu Principal).
│   │   ├── utils.js        # Helpers de DOM, Drag&Drop, Toast.
│   │   ├── sound-manager.js# Engine de áudio (Sons em Base64).
│   │   └── page-data.js    # Scrapers que leem o DOM do CRM.
│   ├── notes/              # O módulo mais complexo (Gerador de Notas).
│   ├── quick-email/        # Automação de Templates de Email.
│   ├── broadcast/          # Sistema de Avisos (Feed de notícias).
│   ├── call-script/        # Checklist interativo.
│   └── lm-report/          # Hub de Links.
└── ...