Explicação detalhada dos módulos críticos para quem vai mexer na lógica.

1. Módulo: Case Notes (src/modules/notes/)
Este é o coração da ferramenta. Ele gera notas padronizadas baseadas em inputs.

Fluxo de Dados:
notes-data.js: Contém os Templates (strings com placeholders {CAMPO}) e o banco de dados de Tasks.

notes-assistant.js: Gerencia a lógica da UI (Steps 1, 2, 3).

Quando o usuário muda o Status, ele chama updateFieldsFromScenarios().

Essa função varre os scenarioSnippets ativos e preenche os input e textarea correspondentes.

step-tasks.js: Componente visual de seleção de tarefas (Accordion/Hero).

notes-bridge.js: A ponte perigosa. Contém a função ensureNoteCardIsOpen().

Lógica: Ela tenta clicar no botão de "Nova Nota" do CRM. Como o CRM pode mudar o ID do botão, ela usa heurísticas (procura ícones, texto 'description') e monitora se um novo editor de texto apareceu na tela.

Como adicionar um novo Status?
Vá em notes-data.js.

Adicione a chave em SUBSTATUS_TEMPLATES.

Se precisar de email automático, adicione o shortcode em SUBSTATUS_SHORTCODES.

2. Módulo: Quick Email (src/modules/quick-email/)
Automação que escreve emails e insere Canned Responses.

O Problema do Rascunho Fantasma
O CRM frequentemente guarda "lixo" de rascunhos anteriores.

Solução: A função openAndClearEmail() em email-automation.js é agressiva. Ela procura botões de "Descartar Rascunho", clica neles, espera confirmação e só então libera o editor para escrita.

Inserção de Texto
Não usamos input.value = ... pois o editor do CRM é um div contenteditable complexo.

Método: Usamos document.execCommand('insertHTML', ...) após focar no elemento. Isso simula uma digitação real e garante que o Angular detecte a mudança.

3. Módulo: Command Center (src/modules/shared/command-center.js)
É a pílula flutuante que controla tudo.

Estado: Mantém referências às funções de toggle de cada módulo (toggleNotes, toggleEmail, etc.).

Animação: Ao carregar, executa uma sequência de "brotar" ícones (startAnimation).

Drag & Drop: Implementa uma física customizada. Ao soltar, ele "imanta" para a borda mais próxima (esquerda ou direita) para não atrapalhar a leitura.

4. Scrapers (src/modules/shared/page-data.js)
Responsável por ler quem é o cliente, qual o site e quem é o agente logado.

captureNameWithMagic: Clica na foto de perfil do agente (invisivelmente e muito rápido) para ler o nome e email no dropdown do Google, depois fecha.

XPath: Usamos XPath em vez de CSS Selectors para encontrar elementos pelo texto (ex: "Given name"), já que as classes do CRM são ofuscadas/dinâmicas.

💡 Dica para quem está chegando agora:
Se você precisa alterar algo visual, procure primeiro em src/modules/shared/utils.js (estilos globais) ou no arquivo do componente específico (ex: header-factory.js). Evite criar arquivos CSS separados; mantenha o estilo junto ao componente para garantir que o bundle final seja um arquivo único e coeso.