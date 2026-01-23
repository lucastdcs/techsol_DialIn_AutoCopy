# 🧩 Módulos Core - Análise Profunda

## 1. Case Notes (`src/modules/notes/`)
O módulo mais complexo, responsável pela geração de notas padronizadas.

### Componentes Principais:
* **`notes-data.js`**: O "Banco de Dados". Contém os templates de texto (`SUBSTATUS_TEMPLATES`), tarefas (`TASKS_DB`) e traduções. É aqui que você edita o texto das notas.
* **`notes-bridge.js`**: A ponte com o CRM. Contém a função crítica `ensureNoteCardIsOpen`.
    * *Lógica:* Tenta encontrar o botão de "Nova Nota" por ícones ou seletores específicos. Após clicar, entra em um loop de verificação (`while`) monitorando o DOM até que um novo editor de texto (`contenteditable`) apareça na tela.
* **`step-tasks.js`**: O seletor visual de tarefas. Gerencia contadores, seleção de marcas (Ads, Analytics) e exibe inputs condicionais de screenshots.

### Fluxo de Geração:
1.  Usuário seleciona Status/Substatus.
2.  `updateFieldsFromScenarios` varre os *Scenario Snippets* ativos.
3.  O texto é montado substituindo placeholders (`{CAMPO}`) no template.
4.  O HTML final é inserido no editor do CRM via `document.execCommand('insertHTML')` para garantir que o Angular do CRM reconheça a mudança.

## 2. Quick Email (`src/modules/quick-email/`)
Automação de e-mails com detecção de contexto.

### O Problema do "Rascunho Fantasma"
O CRM frequentemente mantém rascunhos sujos em memória.
**Solução:** A função `openAndClearEmail` implementa um algoritmo agressivo:
1.  Verifica se há um botão "Descartar Rascunho" visível.
2.  Se houver, clica nele e confirma a exclusão.
3.  Aguarda a limpeza do DOM antes de prosseguir.

### Inserção de Conteúdo
Diferente das notas, o e-mail possui campos específicos para Assunto e Corpo.
* **Assunto:** Inserido via `Object.getOwnPropertyDescriptor(...).set` para disparar os eventos nativos do input.
* **Corpo:** Inserido manipulando diretamente o HTML do editor `contenteditable`.

## 3. Scrapers & Page Data (`src/modules/shared/page-data.js`)
Responsável por "ler" a tela e extrair informações contextuais (Nome do Cliente, URL, Agente).

* **Sherlock Holmes (`captureNameWithMagic`):** Uma função engenhosa que clica invisivelmente no avatar do usuário no canto superior direito, lê o nome/email no dropdown do Google e fecha o menu rapidamente. Isso evita dependência de APIs internas bloqueadas.
* **XPaths:** Utilizamos seletores XPath (ex: `//div[contains(text(), 'Website')]`) para encontrar campos que não possuem IDs fixos ou classes confiáveis.

## 4. Command Center (`src/modules/shared/command-center.js`)
A "Pílula" flutuante.
* Implementa uma física de arraste customizada que "imanta" o widget nas bordas laterais ao soltar (`onMouseUp`), garantindo que ele nunca fique no meio do texto.
* Gerencia o estado de "Processamento" (animação das bolinhas do Google) quando uma automação longa está rodando.