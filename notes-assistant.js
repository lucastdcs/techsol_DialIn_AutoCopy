// notes-assistant.js

// Importa as funções e estilos necessários do utils.js
import { 
    showToast, 
    makeDraggable,
    styleSelect,
    styleLabel,
    stylePopup,
    stylePopupHeader,
    stylePopupTitle,
    stylePopupCloseBtn,
    styleFloatingButton
} from './utils.js';

// Envolve todo o módulo em uma função exportada
export function initCaseNotesAssistant() {
    
    // --- Funções e Dados (Apenas para o Módulo 1) ---
    function copyHtmlToClipboard(html) {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.innerHTML = html;
        document.body.appendChild(container);
        const range = document.createRange();
        range.selectNodeContents(container);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        try {
            document.execCommand('copy');
            showToast("Texto copiado com sucesso"); // showToast() é importada
        } catch (err) {
            showToast("Falha ao copiar", { error: true }); // showToast() é importada
        }
        selection.removeAllRanges();
        document.body.removeChild(container);
    }

    const TASKS_DB = {
       'gtm_installation': {
            name: 'GTM Installation',
            screenshots: { implementation: ['GTM Instalado', 'Vinculador de conversões'], education: [] }
        },
        'ads_conversion_tracking': {
            name: 'Ads Conversion Tracking',
            screenshots: {
                implementation: ['Tag criada', 'Teste GTM', 'Teste Ads', 'Versão Publicada', 'Status Ads'],
                education: ['Screenshot for TAG assistant of tag working...', 'Screenshot of conversion tracking status in Google Ads']
            }
        },
        'ads_enhanced_conversions': {
            name: 'Ads Enhanced Conversions (ECW4)',
            screenshots: {
                implementation: ['Termos aceitos no Ads', 'Tag implementada', 'Teste GTM', 'Teste Ads', 'Versão Publicada', 'Painel do Ads (após 7 dias)'],
                education: []
            }
        },
        'ga4_event_tracking': {
            name: 'Analytics Event Tracking (GA4)',
            screenshots: {
                implementation: ['Tag do evento GA4 implementado no GTM', 'Teste GTM (tagassistant.google.com)', 'Teste GA4 (DebugView - tagassistant.google.com)', 'Versão publicada no GTM', '(Se houver parâmetros) Dimensões customizadas criadas no GA4', 'Evento marcado como principal no GA4', 'GA4 e Google Ads vinculados corretamente', 'Evento principal GA4 importado no Google Ads (como secundário)', 'Métricas app & web ativadas no Google Ads', '(Opcional) Teste no Relatório do Tempo Real (GA4)'],
                education: []
            }
        },
        'upd_for_ga4': {
            name: 'UPD for GA4 (User-Provided Data)',
            screenshots: {
                implementation: ['Validação: Conta GA4 (somente fluxo web, não é setor de saúde)', '"Coleta de dados fornecidos pelo usuário" habilitado no GA4 (Admin > Coleta de Dados)', 'Confirmação de coleta de dados (UI)', 'Tag do evento GA4 otimizado (UPD) implementado no GTM', 'Teste GTM (tagassistant - parâmetro \'em\' sem erro)', 'Teste GA4 (DebugView - tagassistant)', 'Versão publicada no GTM', '(Treinamento) Evento principal importado no Google Ads como secundário'],
                education: []
            }
        },
        'ads_website_call_conversion': {
            name: 'Google Ads WEBSITE CALL CONVERSION',
            screenshots: {
                implementation: [
                    'Tag implementado no GTM',
                    'Versão publicada no GTM',
                    'Teste do disparo da etiqueta de configuração no tag assistant em mais de uma página, mostrando ID e rótulo',
                    'Teste usando o #google-wcc-debug, validando que o número de exibição foi substituído pelo número do Google (999999) em um cenário de teste',
                    'Mudança do status da conversão no Google Ads, de “Inativo” para “Não há conversões recentes” [Aguardar alguns minutos]'
                ],
                education: []
            }
        }
    };

    const SUBSTATUS_TEMPLATES = {
        'SO_Implementation_Only': {
            status: 'SO', name: 'SO - Implementation Only', requiresTasks: true,
            template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}`
        },
        'SO_Education_Only': {
            status: 'SO', name: 'SO - Education Only', requiresTasks: true,
            template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar dúvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>Dúvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resoluções/Explicações:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}`
        },
        'NI_Awaiting_Validations': {
            status: 'NI', name: 'NI - Awaiting Validations', requiresTasks: true,
            template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> NI - Awaiting Validations<br><br><b>Reason/comments:</b> Aguardando Validações no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Próximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considerações adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}`
        },
        'NI_Awaiting_Inputs': {
            status: 'NI', name: 'NI - Awaiting Inputs', requiresTasks: false,
            template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Contexto/O que foi feito:</b><br>  {CONTEXTO_CALL}<br>  <b>Impedimento / Próximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha Ação:</b><br>  {MINHA_ACAO}<br>  <b>Considerações adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplicável):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
        },
       'IN_Inactive': {
            status: 'IN', name: 'IN - Inactive', requiresTasks: false,
            template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> IN - Inactive<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
        },
        'AS_Assigned': {
            status: 'AS', name: 'AS - Assigned', requiresTasks: false,
            template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> AS - Assigned<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> N/A`
        }
    };

    // --- UI (Módulo 1) ---
    const btn = document.createElement("button");
    btn.id = "autofill-floating-btn";
    btn.textContent = "✎";
    Object.assign(btn.style, styleFloatingButton, { top: "60%" }); // styleFloatingButton é importado
    btn.onmouseenter = () => (btn.style.background = "#1765c0");
    btn.onmouseleave = () => (btn.style.background = "#1a73e8");
    document.body.appendChild(btn);
    makeDraggable(btn); // makeDraggable é importado

    const popup = document.createElement("div");
    popup.id = "autofill-popup";
    Object.assign(popup.style, stylePopup, { right: "24px" }); // stylePopup é importado

    const header = document.createElement("div");
    Object.assign(header.style, stylePopupHeader); // stylePopupHeader é importado
    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "24px", height: "24px" });
    const title = document.createElement("div");
    title.textContent = "Case Notes Assistant v2.6";
    Object.assign(title.style, stylePopupTitle); // stylePopupTitle é importado
    header.appendChild(logo);
    header.appendChild(title);
    popup.appendChild(header);
    makeDraggable(popup, header); // makeDraggable é importado

    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✕";
    Object.assign(closeBtn.style, stylePopupCloseBtn); // stylePopupCloseBtn é importado
    closeBtn.onclick = () => togglePopup(false);
    popup.appendChild(closeBtn);

    // Estilos locais do Módulo 1 (não precisam ser exportados)
    const styleInput = {
        width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0",
        fontSize: "14px", marginBottom: "12px", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif"
    };
    const styleTextarea = { ...styleInput, height: "100px", resize: "vertical" };
    const styleStepBlock = {
        borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px"
    };
    const styleH3 = {
        fontSize: "14px", fontWeight: "600", color: "#202124", margin: "0 0 12px 0"
    };
    const styleCheckboxLabel = {
        display: "flex", alignItems: "center", marginBottom: "10px",
        fontSize: "14px", fontWeight: "400", cursor: "pointer",
        padding: "8px", background: "#f8f9fa", borderRadius: "6px"
    };
    const styleCheckboxInput = {
        width: "auto", marginRight: "8px", marginBottom: "0"
    };
    const styleButtonBase = {
        flex: "1 1 0", padding: "10px 0", color: "#fff", border: "none",
        borderRadius: "8px", fontSize: "14px", fontWeight: "500",
        cursor: "pointer", marginTop: "16px"
    };

    const textareaListFields = [
        'TASKS_SOLICITADAS', 'PASSOS_EXECUTADOS', 'RESULTADO', 'DUVIDAS', 'RESOLUCOES',
        'TASKS_IMPLEMENTADAS_CALL', 'PROXIMOS_PASSOS', 'CONTEXTO_CALL',
        'IMPEDIMENTO_CLIENTE', 'MINHA_ACAO', 'SCREENSHOTS',
        'MOTIVO_REAGENDAMENTO'
    ];
    const textareaParagraphFields = ['CONSIDERACOES', 'COMENTARIOS'];
    
    const scenarioSnippets = {
        'quickfill-ni-inicio-manual': {
            'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Início 2/6)"
        },
        'quickfill-ni-cms-access': {
            'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Início 2/6 - Sem Acesso ao CMS)",
            'field-TASKS_SOLICITADAS': "• Instalação do GTM\n• Configuração de Conversões",
            'field-CONTEXTO_CALL': "• Percebi que o(a) anunciante não tinha GTM Instalado.\n• Seguimos com a criação de conta no GTM.\n• Entretanto, a conta de acesso ao painel do site (ex: WordPress) não tinha permissão para instalar plugins ou editar o código.",
            'field-IMPEDIMENTO_CLIENTE': "• Anunciante precisa conseguir acesso de administrador ao painel do site.\n• OU\n• Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.",
            'field-MINHA_ACAO': "• Coloco o caso em 2/6.\n• Assim que o anunciante tiver o acesso ou a instalação for feita, abrirei um caso em BAU para dar continuidade.",
            'field-SCREENSHOTS': "• Print do painel do CMS mostrando a falta de permissão (opcional)."
        },
        'quickfill-ni-followup': {
            'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Follow-up 2/6)",
            'field-SPEAKEASY_ID': "N/A",
            'field-ON_CALL': "N/A",
            'field-TASKS_SOLICITADAS': "• N/A",
            'field-CONTEXTO_CALL': "• No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas não obtive resposta. Envio na sequência o email referente ao dia respectivo.",
            'field-IMPEDIMENTO_CLIENTE': "• N/A",
            'field-MINHA_ACAO': "• N/A",
            'field-SCREENSHOTS': "• Tentativa 1 -\n• Tentativa 2 -"
        },
        'quickfill-whatsapp': {
            'field-TASKS_SOLICITADAS': "• Criação de conversão para WHATSAPP",
            'field-PASSOS_EXECUTADOS': "• Fizemos a criação da conversão no Ads.\n• Criamos a Tag no GTM usando acionadores de clique (ex: Click URL / Click Text) para os botões de WhatsApp.\n• Realizamos os testes e validamos o funcionamento.",
            'field-RESULTADO': "• Task implementada com sucesso. Fecho o caso sem acompanhamento.",
            linkedTask: 'ads_conversion_tracking'
        },
         'quickfill-form': {
            'field-TASKS_SOLICITADAS': "• Criação de conversão para FORMULÁRIO (padrão, não-otimizada).",
            'field-PASSOS_EXECUTADOS': "• Fizemos a criação da conversão no Ads.\n• Criamos a Tag no GTM usando o acionador de envio de formulário (Form Submission) ou visualização de página de agradecimento (Thank You Page).\n• Realizamos os testes e validamos o funcionamento.",
            'field-RESULTADO': "• Task implementada com sucesso. Fecho o caso sem acompanhamento.",
            linkedTask: 'ads_conversion_tracking'
        },
        'quickfill-ecw4-close': {
            'field-TASKS_SOLICITADAS': "• Acompanhamento da conversão otimizada (ECW4) após 7 dias.",
            'field-PASSOS_EXECUTADOS': "• Após o período de 7 dias de acompanhamento, verifiquei o painel do Ads.\n• A conversão está sendo registrada corretamente.",
            'field-RESULTADO': "• Valido o bom funcionamento da conversão otimizada.\n• Assim, fecho o caso.",
            linkedTask: 'ads_enhanced_conversions'
        },
        'quickfill-as-no-show': {
            'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o anunciante não compareceu na meet, porém respondeu o e-mail pedindo o reagendamento'
        },
        'quickfill-as-insufficient-time': {
            'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o tempo foi insuficiente para terminar as Tasks\n• Implementamos [descrever o que foi feito]'
        },
        'quickfill-as-no-access': {
             'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o anunciante não tinha os acessos necessários para podermos implementar as tasks'
        },
        'quickfill-in-nrp-standard': {
            'field-REASON_COMMENTS': "NRP",
            'field-COMENTARIOS': "• Duas ligações seguidas, e-mail \"Antes dos 10 minutos\" e uma terceira e ultima tentativa de ligação.\n• Não houve resposta às tentativas de ligação ou e-mail, por isso o caso será inativado.",
            'field-SCREENSHOTS': "• Tentativa 1 -\n• Tentativa 2 -\n• Tentativa 3 -"
        },
        'quickfill-in-no-show': {
            'field-REASON_COMMENTS': "Anunciante não compareceu à chamada (No-Show).",
            'field-ON_CALL': "N/A",
            'field-COMENTARIOS': "• O caso foi gerado e entrei na chamada no horário agendado.\n• O anunciante não compareceu à reunião.\n• Segui o protocolo de espera: realizei duas tentativas de ligação, aguardei os 10 minutos, e fiz uma terceira tentativa, sem sucesso.\n• Nenhuma das ligações foi atendida (ex: Caixa Postal).\n• Caso inativado por No-Show.",
            'field-SCREENSHOTS': "• Tentativa 1 (Caixa Postal) - https://screenshot.googleplex.com/BW3RLJNgf9SUVzx\n• Tentativa 2 (Caixa Postal) - https://screenshot.googleplex.com/9VEjdvGghueznHv\n• Tentativa 3 (Chamada desconectada) - https://screenshot.googleplex.com/C4yPjgvXN9kovcw"
        },
        'quickfill-in-manual': {
            'field-REASON_COMMENTS': "Outro (Manual)"
        }
    };

    // --- Declaração dos elementos da UI para que as funções internas os acessem ---
    // (Estas são as variáveis que eram "globais" dentro do módulo)
    const stepSnippetsDiv = document.createElement("div");
    const snippetContainer = document.createElement("div");
    const step2Div = document.createElement("div");
    const taskCheckboxesContainer = document.createElement("div");
    const step3Div = document.createElement("div");
    const dynamicFormFieldsContainer = document.createElement("div");
    const mainStatusSelect = document.createElement("select");
    const subStatusSelect = document.createElement("select");
    const buttonContainer = document.createElement("div");

    function updateFieldsFromScenarios() {
        const activeScenarioInputs = snippetContainer.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
        const targetFieldsContent = {};
        const activeLinkedTasks = new Set();

        activeScenarioInputs.forEach(input => {
            const scenarioId = input.id;
            const snippets = scenarioSnippets[scenarioId];
            if (snippets) {
                for (const fieldId in snippets) {
                    if (fieldId !== 'linkedTask') {
                        if (!targetFieldsContent[fieldId]) {
                            targetFieldsContent[fieldId] = [];
                        }
                         if (!targetFieldsContent[fieldId].includes(snippets[fieldId])) {
                            targetFieldsContent[fieldId].push(snippets[fieldId]);
                         }
                    } else {
                         activeLinkedTasks.add(snippets.linkedTask);
                    }
                }
            }
        });

        const allPossibleTargetFields = new Set();
         Object.values(scenarioSnippets).forEach(snippets => {
             Object.keys(snippets).forEach(key => {
                 if(key !== 'linkedTask') allPossibleTargetFields.add(key);
             });
         });

        allPossibleTargetFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                const combinedTextArray = targetFieldsContent[fieldId] || [];
                let finalValue = "";

                if (textareaListFields.includes(fieldId.replace('field-', ''))) {
                    finalValue = combinedTextArray
                        .map(line => line.startsWith('• ') ? line : '• ' + line)
                        .join('\n');

                    if (finalValue === '') {
                         finalValue = '• ';
                    } else if (!finalValue.endsWith('\n• ')) {
                         finalValue += '\n• ';
                    }
                } else {
                     finalValue = combinedTextArray.join('\n\n');
                }
                
                if (finalValue.trim() !== '•' && finalValue.trim() !== '') {
                    field.value = finalValue;
                } else if (textareaListFields.includes(fieldId.replace('field-', ''))) {
                     field.value = '• ';
                } else {
                    field.value = '';
                }

                if (field.tagName === 'TEXTAREA' && textareaListFields.includes(fieldId.replace('field-', ''))) {
                     if (field.value.trim() === '•' || field.value.trim() === '') enableAutoBullet(field);
                }
             }
        });

        const taskCheckboxes = taskCheckboxesContainer.querySelectorAll('input[type="checkbox"]');
        taskCheckboxes.forEach(taskCheckbox => {
            taskCheckbox.checked = false;
            if (activeLinkedTasks.has(taskCheckbox.value)) {
                taskCheckbox.checked = true;
            }
        });
    }

    function enableAutoBullet(textarea) {
        if(textarea.value.trim() === '' || textarea.value.trim() === '•') {
            textarea.value = '• ';
        }
        textarea.onkeydown = function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const start = this.selectionStart, end = this.selectionEnd, value = this.value;
                const lineStart = value.lastIndexOf('\n', start - 1) + 1;
                const currentLine = value.substring(lineStart, start);
                const insertText = (currentLine.trim() === '•' || currentLine.trim() === '') ? '\n' : '\n• ';

                this.value = value.substring(0, start) + insertText + value.substring(end);
                const newPos = start + insertText.length;
                this.selectionStart = newPos; this.selectionEnd = newPos;
            } else if (e.key === 'Backspace') {
                const start = this.selectionStart;
                if (start === this.selectionEnd && start > 0) {
                    const textBefore = this.value.substring(0, start);
                    if (textBefore.endsWith('\n• ')) {
                        e.preventDefault();
                        this.value = textBefore.substring(0, start - 3) + this.value.substring(this.selectionEnd);
                        this.selectionStart = start - 3; this.selectionEnd = start - 3;
                    } else if (textBefore === '• ') {
                         e.preventDefault();
                         this.value = '';
                         this.selectionStart = 0; this.selectionEnd = 0;
                    }
                }
            }
        };
    }

    // --- Montagem da UI (continuação) ---
    const step1Div = document.createElement("div");
    step1Div.id = "step-1-selection";
    const mainStatusLabel = document.createElement("label");
    Object.assign(mainStatusLabel.style, styleLabel); // styleLabel é importado
    mainStatusLabel.textContent = "Status Principal:";
    // mainStatusSelect já foi criado
    mainStatusSelect.id = "main-status";
    mainStatusSelect.innerHTML = `<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>`;
    Object.assign(mainStatusSelect.style, styleSelect); // styleSelect é importado
    const subStatusLabel = document.createElement("label");
    Object.assign(subStatusLabel.style, styleLabel); // styleLabel é importado
    subStatusLabel.textContent = "Substatus:";
    // subStatusSelect já foi criado
    subStatusSelect.id = "sub-status";
    subStatusSelect.innerHTML = `<option value="">-- Selecione o Status --</option>`;
    Object.assign(subStatusSelect.style, styleSelect); // styleSelect é importado
    subStatusSelect.disabled = true;
    step1Div.appendChild(mainStatusLabel);
    step1Div.appendChild(mainStatusSelect);
    step1Div.appendChild(subStatusLabel);
    step1Div.appendChild(subStatusSelect);
    popup.appendChild(step1Div);

    // ETAPA 1.5
    stepSnippetsDiv.id = "step-1-5-snippets";
    Object.assign(stepSnippetsDiv.style, { ...styleStepBlock, display: 'none' });
    const stepSnippetsTitle = document.createElement("h3");
    stepSnippetsTitle.textContent = "Cenários Comuns";
    Object.assign(stepSnippetsTitle.style, styleH3);
    snippetContainer.id = "snippet-container";
    stepSnippetsDiv.appendChild(stepSnippetsTitle);
    stepSnippetsDiv.appendChild(snippetContainer);
    popup.appendChild(stepSnippetsDiv);

    // ETAPA 2
    step2Div.id = "step-2-tasks";
    Object.assign(step2Div.style, { ...styleStepBlock, display: 'none' });
    const step2Title = document.createElement("h3");
    step2Title.textContent = "Selecione as Tasks";
    Object.assign(step2Title.style, styleH3);
    taskCheckboxesContainer.id = "task-checkboxes-container";
    step2Div.appendChild(step2Title);
    step2Div.appendChild(taskCheckboxesContainer);
    popup.appendChild(step2Div);

    // ETAPA 3
    step3Div.id = "step-3-form";
    Object.assign(step3Div.style, { ...styleStepBlock, display: 'none' });
    const step3Title = document.createElement("h3");
    step3Title.textContent = "Preencha os Detalhes";
    Object.assign(step3Title.style, styleH3);
    dynamicFormFieldsContainer.id = "dynamic-form-fields-container";
    step3Div.appendChild(step3Title);
    step3Div.appendChild(dynamicFormFieldsContainer);
    popup.appendChild(step3Div);

    // Botões
    Object.assign(buttonContainer.style, { display: "flex", gap: "8px", display: "none" });
    popup.appendChild(buttonContainer);

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copiar";
    Object.assign(copyButton.style, { ...styleButtonBase, backgroundColor: "#5f6368" });
    copyButton.onmouseover = () => (copyButton.style.backgroundColor = "#4a4d50");
    copyButton.onmouseout = () => (copyButton.style.backgroundColor = "#5f6368");
    buttonContainer.appendChild(copyButton);

    const generateButton = document.createElement("button");
    generateButton.textContent = "Preencher";
    Object.assign(generateButton.style, { ...styleButtonBase, backgroundColor: "#1a73e8" });
    generateButton.onmouseover = () => (generateButton.style.backgroundColor = "#1765c0");
    generateButton.onmouseout = () => (generateButton.style.backgroundColor = "#1a73e8");
    buttonContainer.appendChild(generateButton);

    document.body.appendChild(popup);

    // --- Lógica (Módulo 1) ---

    function resetSteps(startFrom = 1.5) {
        if (startFrom <= 1.5) {
            stepSnippetsDiv.style.display = 'none';
            snippetContainer.innerHTML = '';
        }
        if (startFrom <= 2) {
            step2Div.style.display = 'none';
            taskCheckboxesContainer.innerHTML = '';
        }
        if (startFrom <= 3) {
            step3Div.style.display = 'none';
            dynamicFormFieldsContainer.innerHTML = '';
            buttonContainer.style.display = 'none';
        }
    }

    mainStatusSelect.onchange = () => {
        const selectedStatus = mainStatusSelect.value;
        resetSteps(1.5);
        subStatusSelect.innerHTML = '<option value="">-- Selecione o Substatus --</option>';
        if (!selectedStatus) {
            subStatusSelect.disabled = true;
            return;
        }
        for (const key in SUBSTATUS_TEMPLATES) {
            const template = SUBSTATUS_TEMPLATES[key];
            if (template.status === selectedStatus) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = template.name;
                subStatusSelect.appendChild(option);
            }
        }
        subStatusSelect.disabled = false;
    };

    subStatusSelect.onchange = () => {
        const selectedSubStatusKey = subStatusSelect.value;
        resetSteps(1.5);
        if (!selectedSubStatusKey) return;

        const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
        snippetContainer.innerHTML = '';
        let snippetAdded = false;

        // --- ETAPA 1.5: Bloco de Snippets ---

        if (selectedSubStatusKey === 'NI_Awaiting_Inputs') {
            const radioName = "ni-scenario";
            const scenarios = [
                { id: 'quickfill-ni-inicio-manual', text: 'Início 2/6 (Manual)'},
                { id: 'quickfill-ni-cms-access', text: 'Início 2/6 (ADV sem acesso ao CMS)' },
                { id: 'quickfill-ni-followup', text: 'Follow-up 2/6' }
            ];
            
            scenarios.forEach((scenario, index) => {
                const label = document.createElement('label');
                Object.assign(label.style, styleCheckboxLabel);
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.id = scenario.id;
                radio.name = radioName;
                if (index === 0) radio.checked = true;
                Object.assign(radio.style, styleCheckboxInput);
                label.appendChild(radio);
                label.appendChild(document.createTextNode(` ${scenario.text}`));
                snippetContainer.appendChild(label);
            });
            snippetAdded = true;
        }
        
        if (selectedSubStatusKey === 'SO_Implementation_Only') {
            const scenarios = [
                { id: 'quickfill-whatsapp', text: 'Conversão de WhatsApp' },
                { id: 'quickfill-form', text: 'Conversão de Formulário (Padrão)' },
                { id: 'quickfill-ecw4-close', text: 'Fechamento ECW4 (Pós 7 dias)' }
            ];
            
            scenarios.forEach(scenario => {
                const label = document.createElement('label');
                Object.assign(label.style, styleCheckboxLabel);
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = scenario.id;
                Object.assign(checkbox.style, styleCheckboxInput);
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(` ${scenario.text}`));
                snippetContainer.appendChild(label);
            });
            snippetAdded = true;
        }
        
        if (selectedSubStatusKey === 'AS_Assigned') {
            const reasonTitle = document.createElement('label');
            reasonTitle.textContent = "Motivos Comuns:";
            Object.assign(reasonTitle.style, styleLabel);
            snippetContainer.appendChild(reasonTitle);
            const scenarios = [
                { id: 'quickfill-as-no-show', text: 'Anunciante não compareceu (respondeu e-mail)' },
                { id: 'quickfill-as-insufficient-time', text: 'Tempo insuficiente' },
                { id: 'quickfill-as-no-access', text: 'Anunciante sem acessos necessários' }
            ];
            
            scenarios.forEach(scenario => {
                const label = document.createElement('label');
                Object.assign(label.style, styleCheckboxLabel);
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = scenario.id;
                Object.assign(checkbox.style, styleCheckboxInput);
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(` ${scenario.text}`));
                snippetContainer.appendChild(label);
            });
            snippetAdded = true;
        }
        
       if (selectedSubStatusKey === 'IN_Inactive') {
             const radioName = "in-scenario";
             const scenarios = [
                { id: 'quickfill-in-nrp-standard', text: 'NRP Padrão (3 tentativas)' },
                { id: 'quickfill-in-no-show', text: 'No-Show (LM)' }, 
                { id: 'quickfill-in-manual', text: 'Outro (Manual)' }
             ];
             
             scenarios.forEach((scenario, index) => {
                const label = document.createElement('label');
                Object.assign(label.style, styleCheckboxLabel);
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.id = scenario.id;
                radio.name = radioName;
                if (index === 0) radio.checked = true;
                Object.assign(radio.style, styleCheckboxInput);
                label.appendChild(radio);
                label.appendChild(document.createTextNode(` ${scenario.text}`));
                snippetContainer.appendChild(label);
            });
            snippetAdded = true;
        }

        if (snippetAdded) {
            stepSnippetsDiv.style.display = 'block';
        }

        // --- ETAPA 2: Tasks ---
        if (templateData.requiresTasks) {
            taskCheckboxesContainer.innerHTML = '';
            for (const taskKey in TASKS_DB) {
                const task = TASKS_DB[taskKey];
                const label = document.createElement('label');
                Object.assign(label.style, styleCheckboxLabel);
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = taskKey;
                Object.assign(checkbox.style, styleCheckboxInput);
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(` ${task.name}`));
                taskCheckboxesContainer.appendChild(label);
            }
            step2Div.style.display = 'block';
        }

        // --- ETAPA 3: Formulário Dinâmico ---
        dynamicFormFieldsContainer.innerHTML = '';
        const placeholders = templateData.template.match(/{([A-Z_]+)}/g) || [];
        const uniquePlaceholders = [...new Set(placeholders)];
        
        uniquePlaceholders.forEach(placeholder => {
            if (placeholder === '{TAGS_IMPLEMENTED}' || placeholder === '{SCREENSHOTS_LIST}') {
                return;
            }
            const fieldName = placeholder.slice(1, -1);
            const label = document.createElement('label');
            label.textContent = fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ':';
            Object.assign(label.style, styleLabel);
            let field;
            if (textareaListFields.includes(fieldName)) {
                field = document.createElement('textarea');
                Object.assign(field.style, styleTextarea);
                enableAutoBullet(field);
            } else if (textareaParagraphFields.includes(fieldName)) {
                field = document.createElement('textarea');
                Object.assign(field.style, styleTextarea);
            } else {
                field = document.createElement('input');
                field.type = 'text';
                Object.assign(field.style, styleInput);
                 if (fieldName === 'REASON_COMMENTS' && (selectedSubStatusKey === 'NI_Awaiting_Inputs' || selectedSubStatusKey === 'IN_Inactive')) {
                    Object.assign(label.style, { display: 'none' });
                    Object.assign(field.style, { display: 'none' });
                }
            }
            field.id = `field-${fieldName}`;
            dynamicFormFieldsContainer.appendChild(label);
            dynamicFormFieldsContainer.appendChild(field);
        });

        // --- Adiciona o Listener Centralizado aos Snippets ---
        const snippetInputs = snippetContainer.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        if (snippetInputs.length > 0) {
            snippetInputs.forEach(input => {
                input.removeEventListener('change', updateFieldsFromScenarios);
                input.addEventListener('change', updateFieldsFromScenarios);
            });
             updateFieldsFromScenarios();
        }
        // ---------------------------------------------------

        step3Div.style.display = 'block';
        buttonContainer.style.display = 'flex';
    };


    function generateOutputHtml() {
        const selectedSubStatusKey = subStatusSelect.value;
        if (!selectedSubStatusKey) return null;
        const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
        let outputText = templateData.template.replace(/\n/g, "<br>");
        const ulStyle = "style=\"margin-bottom: 12px; padding-left: 30px;\"";

        if (templateData.requiresTasks) {
            const selectedCheckboxes = taskCheckboxesContainer.querySelectorAll('input[type="checkbox"]:checked');
            let tagNames = [];
            let screenshotsText = '';
            const screenshotType = (selectedSubStatusKey === 'SO_Education_Only') ? 'education' : 'implementation';
            selectedCheckboxes.forEach(checkbox => {
                const taskKey = checkbox.value;
                const task = TASKS_DB[taskKey];
                tagNames.push(task.name);
                const screenshotList = task.screenshots[screenshotType] || [];
                if (screenshotList.length > 0) {
                    screenshotsText += `<b>${task.name}</b>`;
                    const screenItems = screenshotList.map(print => `<li>${print} - </li>`).join('');
                    screenshotsText += `<ul ${ulStyle}>${screenItems}</ul>`;
                }
            });
            outputText = outputText.replace(/{TAGS_IMPLEMENTED}/g, tagNames.join(', ') || 'N/A');
            outputText = outputText.replace(/{SCREENSHOTS_LIST}/g, screenshotsText ? `${screenshotsText}` : 'N/A');
        }

        const inputs = dynamicFormFieldsContainer.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const fieldName = input.id.replace('field-', '');
            const placeholder = new RegExp(`{${fieldName}}`, 'g');
            let value = input.value;
            
            if (fieldName === 'REASON_COMMENTS' && (selectedSubStatusKey === 'NI_Awaiting_Inputs' || selectedSubStatusKey === 'IN_Inactive')) {
                const checkedRadio = snippetContainer.querySelector('input[type="radio"]:checked');
                if (checkedRadio && scenarioSnippets[checkedRadio.id] && scenarioSnippets[checkedRadio.id]['field-REASON_COMMENTS']) {
                     value = scenarioSnippets[checkedRadio.id]['field-REASON_COMMENTS'];
                }
            }

            if (textareaListFields.includes(fieldName) && value.trim() !== '') {
                const lines = value.split('\n')
                                 .map(line => line.trim())
                                 .filter(line => line !== '' && line !== '•')
                                 .map(line => line.startsWith('• ') ? line.substring(2).trim() : line.trim())
                                 .filter(line => line !== '')
                                 .map(line => `<li>${line}</li>`)
                                 .join('');
                value = lines ? `<ul ${ulStyle}>${lines}</ul>` : '';
            } else if (textareaParagraphFields.includes(fieldName) && value.trim() !== '') {
                value = value.split('\n').filter(line => line.trim() !== '').map(line => `<p style="margin: 0 0 8px 0;">${line}</p>`).join('');
            } else if (input.tagName === 'TEXTAREA' && !textareaListFields.includes(fieldName) && !textareaParagraphFields.includes(fieldName)) {
                 value = value.replace(/\n/g, '<br>');
            } else if (input.tagName === 'TEXTAREA' && value.trim() === '') {
                 value = '';
            } else if (fieldName === 'ON_CALL' && value.trim() === '') {
                value = 'N/A';
            } else if (fieldName === 'GTM_GA4_VERIFICADO' && value.trim() === '') {
                value = 'N/A';
            }
            const safeValue = (value || '').replace(/\$/g, '$$$$');
            outputText = outputText.replace(placeholder, safeValue);
        });
        outputText = outputText.replace(/{([A-Z_]+)}/g, '');
        return outputText;
    }


    copyButton.onclick = () => {
        const htmlOutput = generateOutputHtml();
        if (htmlOutput) {
            copyHtmlToClipboard(htmlOutput);
        } else {
            showToast("Nenhum substatus selecionado", { error: true });
        }
    };

   generateButton.onclick = () => {
        const htmlOutput = generateOutputHtml();
        if (!htmlOutput) {
          showToast("Nenhum substatus selecionado", { error: true });
          return;
        }
        const campo = document.querySelector('div[contenteditable="true"]');

        if (campo) {
          campo.focus();
          if (campo.innerHTML.trim() !== '' && !campo.innerHTML.endsWith('<br><br>')) {
              document.execCommand('insertHTML', false, '<br><br>');
          }
          document.execCommand('insertHTML', false, htmlOutput);
          campo.dispatchEvent(new Event("input", { bubbles: true }));
          showToast("Texto inserido com sucesso");
          togglePopup(false);
          resetSteps(1.5);
          mainStatusSelect.value = "";
          subStatusSelect.innerHTML = '<option value="">-- Selecione o Status --</option>';
          subStatusSelect.disabled = true;

        } else {
          showToast("Campo de edição não encontrado. Copiando...", { error: true, duration: 2500 });
          copyHtmlToClipboard(htmlOutput);
        }
    };


    function togglePopup(show) {
        if (show) {
            popup.style.opacity = "1";
            popup.style.pointerEvents = "auto";
            popup.style.transform = "scale(1)";
        } else {
            popup.style.opacity = "0";
            popup.style.pointerEvents = "none";
            popup.style.transform = "scale(0.95)";
        }
    }

    let visible = false;
    btn.onclick = () => {
        visible = !visible;
        togglePopup(visible);
    };
} // Fim do initCaseNotesAssistant()