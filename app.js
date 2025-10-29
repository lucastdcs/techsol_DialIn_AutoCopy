javascript:(function() {
    "use strict";

    // --- 1. VERIFICAÇÕES GLOBAIS ---
    if (document.getElementById("autofill-floating-btn") || document.getElementById("call-script-floating-btn")) {
        console.log("Assistentes já carregados.");
        return;
    }

    const fontId = "poppins-google-font";
    if (!document.getElementById(fontId)) {
        const link = document.createElement("link");
        link.id = fontId;
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap";
        document.head.appendChild(link);
    }

    // --- 1.B. ESTILOS GLOBAIS PARA O CALL SCRIPT ASSISTANT (Req. 2 e 3) ---
    const csaStyleId = "call-script-assistant-styles";
    if (!document.getElementById(csaStyleId)) {
        const styleEl = document.createElement("style");
        styleEl.id = csaStyleId;
        styleEl.textContent = `
            /* Animação de conclusão de grupo (Borda e cor do título) */
            .csa-group-container {
                border-left: 3px solid transparent; /* Estado Padrão */
                padding-left: 5px;
                transition: all 0.3s ease-out;
            }
            .csa-group-title {
                transition: color 0.3s ease-out;
            }
            .csa-group-container.csa-group-completed {
                border-left: 3px solid #34a853; /* Verde Google */
                padding-left: 5px;
            }
            .csa-group-container.csa-group-completed .csa-group-title {
                color: #34a853; /* Verde Google */
            }

            /* Estilo e Animação dos Itens da Lista (Req. 2 e 3) */
            .csa-li {
                margin: 4px 0;
                padding: 8px 10px;
                border-radius: 6px;
                border: 2px solid transparent;
                transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
                font-size: 14px;
                cursor: pointer;
                user-select: none;
                background-color: #f8f9fa;
                color: #202124;
                line-height: 1.4;
                text-decoration: none; /* --- CORREÇÃO DO BUG (Req 2) --- */
                transform: scale(1);
            }
            .csa-li:hover {
                background-color: #f1f3f4;
            }
            .csa-li.csa-completed {
                text-decoration: line-through;
                color: #5f6368;
                transform: scale(0.98); /* --- ANIMAÇÃO DE CHECK (Req 3) --- */
            }
        `;
        document.head.appendChild(styleEl);
    }

    // --- 2. UTILITÁRIOS GLOBAIS E ESTILOS COMPARTILHADOS ---

    function showToast(message, opts = {}) {
        const toast = document.createElement("div");
        Object.assign(toast.style, {
            position: "fixed", bottom: "24px", left: "50%",
            transform: "translateX(-50%) translateY(20px)",
            background: opts.error ? "#d93025" : "#323232",
            color: "#fff", padding: "14px 24px", borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,.3)", fontFamily: "'Poppins', sans-serif",
            fontSize: "14px", lineHeight: "20px", zIndex: "9999999",
            opacity: "0", transition: "opacity .3s ease, transform .3s ease"
        });
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateX(-50%) translateY(0)";
        });
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(-50%) translateY(20px)";
            setTimeout(() => toast.remove(), 300);
        }, opts.duration || 4000);
    }

    function makeDraggable(element, handle) {
        const dragHandle = handle || element;
        let isDragging = false, initialMouseX, initialMouseY, initialElemX, initialElemY;
        dragHandle.onmousedown = function(e) {
            e.preventDefault(); isDragging = true;
            dragHandle.style.cursor = 'grabbing';
            initialMouseX = e.clientX; initialMouseY = e.clientY;
            const rect = element.getBoundingClientRect();
            initialElemX = rect.left; initialElemY = rect.top;
            element.style.top = initialElemY + 'px'; 
            element.style.left = initialElemX + 'px';
            element.style.right = 'auto'; 
            element.style.bottom = 'auto';
            if (element.id === 'autofill-popup' || element.id === 'call-script-popup') {
                element.style.transform = 'scale(1)';
            }
            document.onmousemove = onMouseMove; 
            document.onmouseup = onMouseUp;
        };
        function onMouseMove(e) {
            if (!isDragging) return;
            const deltaX = e.clientX - initialMouseX, deltaY = e.clientY - initialMouseY;
            let newElemX = initialElemX + deltaX, newElemY = initialElemY + deltaY;
            const vpWidth = window.innerWidth, vpHeight = window.innerHeight;
            const elemWidth = element.offsetWidth, elemHeight = element.offsetHeight;
            if (newElemX < 0) newElemX = 0; 
            if (newElemY < 0) newElemY = 0;
            if (newElemX + elemWidth > vpWidth) newElemX = vpWidth - elemWidth;
            if (newElemY + elemHeight > vpHeight) newElemY = vpHeight - elemHeight;
            element.style.top = newElemY + 'px'; 
            element.style.left = newElemX + 'px';
        }
        function onMouseUp() {
            isDragging = false; 
            dragHandle.style.cursor = 'grab';
            document.onmousemove = null; 
            document.onmouseup = null;
        }
    }

    const styleSelect = {
        width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0",
        fontSize: "14px", marginBottom: "16px", background: "#fff", color: "#202124",
        outline: "none", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif"
    };
    const styleLabel = {
        fontSize: "13px", fontWeight: "500", color: "#3c4043",
        marginBottom: "4px", display: "block"
    };
    const stylePopup = {
        position: "fixed", top: "24px", padding: "16px",
        background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,.2)",
        fontFamily: "'Poppins', sans-serif", zIndex: "999999", 
        width: "360px", border: "1px solid #dadce0",
        maxHeight: "90vh", overflowY: "auto", textAlign: "left",
        transition: "opacity .3s ease, transform .3s ease", opacity: "0",
        pointerEvents: "none", transform: "scale(0.95)"
    };
    const stylePopupHeader = {
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "8px", marginBottom: "16px", textAlign: "center", cursor: "grab"
    };
    const stylePopupTitle = {
        fontSize: "16px", fontWeight: "600", color: "#202124"
    };
    const stylePopupCloseBtn = {
        position: "absolute", top: "8px", right: "10px", fontSize: "18px",
        color: "#5f6368", cursor: "pointer"
    };
    const styleFloatingButton = {
        position: "fixed", right: "20px", width: "48px", height: "48px",
        borderRadius: "50%", border: "none", background: "#1a73e8", color: "#fff",
        fontSize: "22px", fontWeight: "500", boxShadow: "0 4px 10px rgba(0,0,0,.3)",
        cursor: "grab", zIndex: "999998", transition: "background .2s"
    };

    // ===================================================================
    // === MÓDULO 1: CASE NOTES ASSISTANT (Atualizado) ===
    // ===================================================================
    (function() {
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
                showToast("Texto copiado com sucesso");
            } catch (err) {
                showToast("Falha ao copiar", { error: true });
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
            // ===== NOVA TASK ADICIONADA ABAIXO =====
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
                    education: [] // Não foram fornecidos screenshots de educação
                }
            }
            // ======================================
        };

        // ===== ALTERAÇÃO REQ 1: Adicionado {GTM_GA4_VERIFICADO} =====
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
            'NI_Awaiting_Inputs_Initial': {
                status: 'NI', name: 'NI - Awaiting Inputs (Início 2/6)', requiresTasks: false,
                template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> Aguardando informações por parte do anunciante para concluir a implementação<br><br><b>OnCall Comments:</b><br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Contexto/O que foi feito:</b><br>  {CONTEXTO_CALL}<br>  <b>Impedimento / Próximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha Ação:</b><br>  {MINHA_ACAO}<br>  <b>Considerações adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
            },
            'NI_Awaiting_Inputs_Followup': {
                status: 'NI', name: 'NI - Awaiting Inputs (Follow-up 2/6)', requiresTasks: false,
                template: `<b>Speakeasy ID:</b> N/A<br><br><b>On Call (Call Started) signaled on time?</b> N/A<br><br><b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> Aguardando informações por parte do anunciante para concluir a implementação (2/6)<br><br><b>OnCall Comments:</b><br>No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas não obtive resposta. Envio na sequência o email referente ao dia respectivo.<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>Tentativa 1 -<br>Tentativa 2 -<br><br><b>Multiple CIDs:</b>`
            },
            'IN_Not_Reachable': {
                status: 'IN', name: 'IN - Not Reachable (NRP)', requiresTasks: false,
                template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> NRP<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>Tentativa 1 -<br>Tentativa 2 -<br>Tentativa 3 -<br><br><b>Multiple CIDs:</b> {CIDS}`
            },
            'AS_Reschedule_1': {
                status: 'AS', name: 'AS - Reschedule 1', requiresTasks: false,
                template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> N/A`
            }
        };

        // --- UI (Módulo 1) ---
        const btn = document.createElement("button");
        btn.id = "autofill-floating-btn";
        btn.textContent = "✎";
        Object.assign(btn.style, styleFloatingButton, { top: "60%" });
        btn.onmouseenter = () => (btn.style.background = "#1765c0");
        btn.onmouseleave = () => (btn.style.background = "#1a73e8");
        document.body.appendChild(btn);
        makeDraggable(btn);

        const popup = document.createElement("div");
        popup.id = "autofill-popup";
        Object.assign(popup.style, stylePopup, { right: "24px" });
        
        const header = document.createElement("div");
        Object.assign(header.style, stylePopupHeader);
        const logo = document.createElement("img");
        logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
        Object.assign(logo.style, { width: "24px", height: "24px" });
        const title = document.createElement("div");
        title.textContent = "Case Notes Assistant v2.4"; // Versão atualizada
        Object.assign(title.style, stylePopupTitle);
        header.appendChild(logo);
        header.appendChild(title);
        popup.appendChild(header);
        makeDraggable(popup, header);

        const closeBtn = document.createElement("div");
        closeBtn.textContent = "✕";
        Object.assign(closeBtn.style, stylePopupCloseBtn);
        closeBtn.onclick = () => togglePopup(false);
        popup.appendChild(closeBtn);

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
        
        function enableAutoBullet(textarea) {
            if(textarea.value === '') {
                textarea.value = '• ';
            }
            textarea.onkeydown = function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const start = this.selectionStart, end = this.selectionEnd, value = this.value;
                    this.value = value.substring(0, start) + '\n• ' + value.substring(end);
                    const newPos = start + 3;
                    this.selectionStart = newPos; this.selectionEnd = newPos;
                } else if (e.key === 'Backspace') {
                    const start = this.selectionStart;
                    if (start === this.selectionEnd && start > 0) {
                        const textBefore = this.value.substring(0, start);
                        if (textBefore.endsWith('\n• ') || textBefore.endsWith('• ')) {
                            e.preventDefault();
                            const isAtStart = textBefore.endsWith('• ');
                            const charsToRemove = isAtStart ? 2 : 3;
                            this.value = textBefore.substring(0, start - charsToRemove) + this.value.substring(this.selectionEnd);
                            const newPos = start - charsToRemove;
                            this.selectionStart = newPos; this.selectionEnd = newPos;
                        }
                    }
                }
            };
        }

        // ---------- ETAPA 1: SELEÇÃO DE STATUS ----------
        const step1Div = document.createElement("div");
        step1Div.id = "step-1-selection";
        const mainStatusLabel = document.createElement("label");
        Object.assign(mainStatusLabel.style, styleLabel);
        mainStatusLabel.textContent = "Status Principal:";
        const mainStatusSelect = document.createElement("select");
        mainStatusSelect.id = "main-status";
        mainStatusSelect.innerHTML = `<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>`;
        Object.assign(mainStatusSelect.style, styleSelect);
        const subStatusLabel = document.createElement("label");
        Object.assign(subStatusLabel.style, styleLabel);
        subStatusLabel.textContent = "Substatus:";
        const subStatusSelect = document.createElement("select");
        subStatusSelect.id = "sub-status";
        subStatusSelect.innerHTML = `<option value="">-- Selecione o Status --</option>`;
        Object.assign(subStatusSelect.style, styleSelect);
        subStatusSelect.disabled = true;
        step1Div.appendChild(mainStatusLabel);
        step1Div.appendChild(mainStatusSelect);
        step1Div.appendChild(subStatusLabel);
        step1Div.appendChild(subStatusSelect);
        popup.appendChild(step1Div);

        // ===== ALTERAÇÃO REQ 2: Adicionada ETAPA 1.5 (Snippets) =====
        const stepSnippetsDiv = document.createElement("div");
        stepSnippetsDiv.id = "step-1-5-snippets";
        Object.assign(stepSnippetsDiv.style, { ...styleStepBlock, display: 'none' });
        const stepSnippetsTitle = document.createElement("h3");
        stepSnippetsTitle.textContent = "Cenários Comuns";
        Object.assign(stepSnippetsTitle.style, styleH3);
        const snippetContainer = document.createElement("div");
        snippetContainer.id = "snippet-container";
        stepSnippetsDiv.appendChild(stepSnippetsTitle);
        stepSnippetsDiv.appendChild(snippetContainer);
        popup.appendChild(stepSnippetsDiv);
        // ==========================================================

        // ---------- ETAPA 2: SELEÇÃO DE TASKS (Oculto) ----------
        const step2Div = document.createElement("div");
        step2Div.id = "step-2-tasks";
        Object.assign(step2Div.style, { ...styleStepBlock, display: 'none' });
        const step2Title = document.createElement("h3");
        step2Title.textContent = "Selecione as Tasks";
        Object.assign(step2Title.style, styleH3);
        const taskCheckboxesContainer = document.createElement("div");
        taskCheckboxesContainer.id = "task-checkboxes-container";
        step2Div.appendChild(step2Title);
        step2Div.appendChild(taskCheckboxesContainer);
        popup.appendChild(step2Div);

        // ---------- ETAPA 3: FORMULÁRIO DINÂMICO (Oculto) ----------
        const step3Div = document.createElement("div");
        step3Div.id = "step-3-form";
        Object.assign(step3Div.style, { ...styleStepBlock, display: 'none' });
        const step3Title = document.createElement("h3");
        step3Title.textContent = "Preencha os Detalhes";
        Object.assign(step3Title.style, styleH3);
        const dynamicFormFieldsContainer = document.createElement("div");
        dynamicFormFieldsContainer.id = "dynamic-form-fields-container";
        step3Div.appendChild(step3Title);
        step3Div.appendChild(dynamicFormFieldsContainer);
        popup.appendChild(step3Div);
        
        const buttonContainer = document.createElement("div");
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

        // ===== ALTERAÇÃO REQ 2: resetSteps atualizado =====
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
            resetSteps(1.5); // Atualizado
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

        // ===== ALTERAÇÃO REQ 2: Fluxo do onchange invertido =====
        subStatusSelect.onchange = () => {
            const selectedSubStatusKey = subStatusSelect.value;
            resetSteps(1.5); // Atualizado
            if (!selectedSubStatusKey) return;

            const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];

            // --- ETAPA 1.5: Bloco de Snippets (Agora vem primeiro) ---
            const snippetContainer = document.getElementById("snippet-container");
            snippetContainer.innerHTML = ''; // Limpa o container
            let snippetAdded = false;

            if (selectedSubStatusKey === 'NI_Awaiting_Inputs_Initial') {
                const quickFillLabel = document.createElement('label');
                Object.assign(quickFillLabel.style, styleCheckboxLabel);
                const quickFillCheckbox = document.createElement('input');
                quickFillCheckbox.type = 'checkbox';
                quickFillCheckbox.id = 'quickfill-cms-access';
                Object.assign(quickFillCheckbox.style, styleCheckboxInput);
                quickFillLabel.appendChild(quickFillCheckbox);
                quickFillLabel.appendChild(document.createTextNode(" Cenário: ADV sem acesso ao CMS"));
                snippetContainer.appendChild(quickFillLabel);
                snippetAdded = true;
            }
            
            if (selectedSubStatusKey === 'SO_Implementation_Only') {
                const quickFillLabelWA = document.createElement('label');
                Object.assign(quickFillLabelWA.style, styleCheckboxLabel);
                const quickFillCheckboxWA = document.createElement('input');
                quickFillCheckboxWA.type = 'checkbox';
                quickFillCheckboxWA.id = 'quickfill-whatsapp';
                Object.assign(quickFillCheckboxWA.style, styleCheckboxInput);
                quickFillLabelWA.appendChild(quickFillCheckboxWA);
                quickFillLabelWA.appendChild(document.createTextNode(" Cenário: Conversão de WhatsApp"));
                snippetContainer.appendChild(quickFillLabelWA);

                // ===== NOVO CHECKBOX DE FORMULÁRIO =====
                const quickFillLabelForm = document.createElement('label');
                Object.assign(quickFillLabelForm.style, styleCheckboxLabel);
                const quickFillCheckboxForm = document.createElement('input');
                quickFillCheckboxForm.type = 'checkbox';
                quickFillCheckboxForm.id = 'quickfill-form';
                Object.assign(quickFillCheckboxForm.style, styleCheckboxInput);
                quickFillLabelForm.appendChild(quickFillCheckboxForm);
                quickFillLabelForm.appendChild(document.createTextNode(" Cenário: Conversão de Formulário (Padrão)"));
                snippetContainer.appendChild(quickFillLabelForm);
                // =======================================

                const quickFillLabelECW4 = document.createElement('label');
                Object.assign(quickFillLabelECW4.style, styleCheckboxLabel);
                const quickFillCheckboxECW4 = document.createElement('input');
                quickFillCheckboxECW4.type = 'checkbox';
                quickFillCheckboxECW4.id = 'quickfill-ecw4-close';
                Object.assign(quickFillCheckboxECW4.style, styleCheckboxInput);
                quickFillLabelECW4.appendChild(quickFillCheckboxECW4);
                quickFillLabelECW4.appendChild(document.createTextNode(" Cenário: Fechamento ECW4 (Pós 7 dias)"));
                snippetContainer.appendChild(quickFillLabelECW4);
                snippetAdded = true;
            }
            
            if (selectedSubStatusKey === 'AS_Reschedule_1') {
                const reasonTitle = document.createElement('label');
                reasonTitle.textContent = "Cenários Comuns (Motivo):";
                Object.assign(reasonTitle.style, styleLabel); 
                snippetContainer.appendChild(reasonTitle);
                const reasons = [
                    { id: 'quickfill-as-no-show', text: 'Anunciante não compareceu (respondeu e-mail)' },
                    { id: 'quickfill-as-insufficient-time', text: 'Tempo insuficiente' },
                    { id: 'quickfill-as-no-access', text: 'Anunciante sem acessos necessários' }
                ];
                reasons.forEach(reason => {
                    const quickFillLabel = document.createElement('label');
                    Object.assign(quickFillLabel.style, styleCheckboxLabel);
                    const quickFillCheckbox = document.createElement('input');
                    quickFillCheckbox.type = 'checkbox';
                    quickFillCheckbox.id = reason.id;
                    Object.assign(quickFillCheckbox.style, styleCheckboxInput);
                    quickFillLabel.appendChild(quickFillCheckbox);
                    quickFillLabel.appendChild(document.createTextNode(` ${reason.text}`));
                    snippetContainer.appendChild(quickFillLabel);
                });
                snippetAdded = true;
            }
            
            if (selectedSubStatusKey === 'IN_Not_Reachable') {
                const quickFillLabel = document.createElement('label');
                Object.assign(quickFillLabel.style, styleCheckboxLabel);
                const quickFillCheckbox = document.createElement('input');
                quickFillCheckbox.type = 'checkbox';
                quickFillCheckbox.id = 'quickfill-nrp-standard';
                Object.assign(quickFillCheckbox.style, styleCheckboxInput);
                quickFillLabel.appendChild(quickFillCheckbox);
                quickFillLabel.appendChild(document.createTextNode(" Cenário: NRP Padrão (3 tentativas)"));
                snippetContainer.appendChild(quickFillLabel);
                snippetAdded = true;
            }

            // Mostra a ETAPA 1.5 se houver snippets
            if (snippetAdded) {
                stepSnippetsDiv.style.display = 'block';
            }
            // --- Fim: Bloco de Snippets ---


            // --- ETAPA 2: Tasks (Agora vem em segundo) ---
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

            // --- ETAPA 3: Formulário Dinâmico (Agora vem em terceiro) ---
            dynamicFormFieldsContainer.innerHTML = ''; // Limpa o container do formulário
            
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
                }
                field.id = `field-${fieldName}`;
                dynamicFormFieldsContainer.appendChild(label);
                dynamicFormFieldsContainer.appendChild(field);
            });

            // --- Listeners dos Snippets (permanecem aqui, pois precisam que os campos do formulário existam) ---
            const quickFillCheckbox = document.getElementById('quickfill-cms-access');
            if (quickFillCheckbox) {
                quickFillCheckbox.onchange = (e) => {
                    const isChecked = e.target.checked;
                    const f = (id) => document.getElementById(id);
                    if (isChecked) {
                        if (f('field-TASKS_SOLICITADAS')) f('field-TASKS_SOLICITADAS').value = "• Instalação do GTM\n• Configuração de Conversões";
                        if (f('field-CONTEXTO_CALL')) f('field-CONTEXTO_CALL').value = "• Percebi que o(a) anunciante não tinha GTM Instalado.\n• Seguimos com a criação de conta no GTM.\n• Entretanto, a conta de acesso ao painel do site (ex: WordPress) não tinha permissão para instalar plugins ou editar o código.";
                        if (f('field-IMPEDIMENTO_CLIENTE')) f('field-IMPEDIMENTO_CLIENTE').value = "• Anunciante precisa conseguir acesso de administrador ao painel do site.\n• OU\n• Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.";
                        if (f('field-MINHA_ACAO')) f('field-MINHA_ACAO').value = "• Coloco o caso em 2/6.\n• Assim que o anunciante tiver o acesso ou a instalação for feita, abrirei um caso em BAU para dar continuidade.";
                        if (f('field-SCREENSHOTS')) f('field-SCREENSHOTS').value = "• Print do painel do CMS mostrando a falta de permissão (opcional).";
                    } else {
                        ['field-TASKS_SOLICITADAS', 'field-CONTEXTO_CALL', 'field-IMPEDIMENTO_CLIENTE', 'field-MINHA_ACAO', 'field-SCREENSHOTS'].forEach(id => {
                            if (f(id)) { f(id).value = ""; if (f(id).tagName === 'TEXTAREA') enableAutoBullet(f(id)); }
                        });
                    }
                };
            }
            
            const quickFillWhatsappCheckbox = document.getElementById('quickfill-whatsapp');
            if (quickFillWhatsappCheckbox) {
                quickFillWhatsappCheckbox.onchange = (e) => {
                    const isChecked = e.target.checked;
                    const taskCheckbox = document.querySelector('#step-2-tasks input[value="ads_conversion_tracking"]');
                    if (taskCheckbox) taskCheckbox.checked = isChecked;
                    const f = (id) => document.getElementById(id);
                    if (isChecked) {
                        if (f('field-TASKS_SOLICITADAS')) f('field-TASKS_SOLICITADAS').value = "• Criação de conversão para WHATSAPP";
                        if (f('field-PASSOS_EXECUTADOS')) f('field-PASSOS_EXECUTADOS').value = "• Fizemos a criação da conversão no Ads.\n• Criamos a Tag no GTM usando acionadores de clique (ex: Click URL / Click Text) para os botões de WhatsApp.\n• Realizamos os testes e validamos o funcionamento.";
                        if (f('field-RESULTADO')) f('field-RESULTADO').value = "• Task implementada com sucesso. Fecho o caso sem acompanhamento.";
                    } else {
                        if (taskCheckbox) taskCheckbox.checked = false;
                        ['field-TASKS_SOLICITADAS', 'field-PASSOS_EXECUTADOS', 'field-RESULTADO'].forEach(id => {
                             if (f(id)) { f(id).value = ""; enableAutoBullet(f(id)); }
                        });
                    }
                };
            }
            // ===== NOVO LISTENER PARA FORMULÁRIO =====
            const quickFillFormCheckbox = document.getElementById('quickfill-form');
            if (quickFillFormCheckbox) {
                quickFillFormCheckbox.onchange = (e) => {
                    const isChecked = e.target.checked;
                    // Marca a task 'ads_conversion_tracking' automaticamente
                    const taskCheckbox = document.querySelector('#step-2-tasks input[value="ads_conversion_tracking"]');
                    if (taskCheckbox) taskCheckbox.checked = isChecked;
                    
                    const f = (id) => document.getElementById(id);
                    
                    if (isChecked) {
                        if (f('field-TASKS_SOLICITADAS')) f('field-TASKS_SOLICITADAS').value = "• Criação de conversão para FORMULÁRIO (padrão, não-otimizada).";
                        if (f('field-PASSOS_EXECUTADOS')) f('field-PASSOS_EXECUTADOS').value = "• Fizemos a criação da conversão no Ads.\n• Criamos a Tag no GTM usando o acionador de envio de formulário (Form Submission) ou visualização de página de agradecimento (Thank You Page).\n• Realizamos os testes e validamos o funcionamento.";
                        if (f('field-RESULTADO')) f('field-RESULTADO').value = "• Task implementada com sucesso. Fecho o caso sem acompanhamento.";
                    } else {
                        // Limpa os campos se for desmarcado
                        if (taskCheckbox) taskCheckbox.checked = false;
                        ['field-TASKS_SOLICITADAS', 'field-PASSOS_EXECUTADOS', 'field-RESULTADO'].forEach(id => {
                             if (f(id)) { f(id).value = ""; enableAutoBullet(f(id)); }
                        });
                    }
                };
            }
            // =========================================

            const quickFillECW4Checkbox = document.getElementById('quickfill-ecw4-close');
            if (quickFillECW4Checkbox) {
                quickFillECW4Checkbox.onchange = (e) => {
                    const isChecked = e.target.checked;
                    const taskCheckbox = document.querySelector('#step-2-tasks input[value="ads_enhanced_conversions"]');
                    if (taskCheckbox) taskCheckbox.checked = isChecked;
                     const f = (id) => document.getElementById(id);
                    if (isChecked) {
                        if (f('field-TASKS_SOLICITADAS')) f('field-TASKS_SOLICITADAS').value = "• Acompanhamento da conversão otimizada (ECW4) após 7 dias.";
                        if (f('field-PASSOS_EXECUTADOS')) f('field-PASSOS_EXECUTADOS').value = "• Após o período de 7 dias de acompanhamento, verifiquei o painel do Ads.\n• A conversão está sendo registrada corretamente.";
                        if (f('field-RESULTADO')) f('field-RESULTADO').value = "• Valido o bom funcionamento da conversão otimizada.\n• Assim, fecho o caso.";
                    } else {
                        if (taskCheckbox) taskCheckbox.checked = false;
                        ['field-TASKS_SOLICITADAS', 'field-PASSOS_EXECUTADOS', 'field-RESULTADO'].forEach(id => {
                             if (f(id)) { f(id).value = ""; enableAutoBullet(f(id)); }
                        });
                    }
                };
            }
            
            const asCheckboxes = [
                { id: 'quickfill-as-no-show', text: '• Precisamos reagendar o caso, já que o anunciante não compareceu na meet, porém respondeu o e-mail pedindo o reagendamento' },
                { id: 'quickfill-as-insufficient-time', text: '• Precisamos reagendar o caso, já que o tempo foi insuficiente para terminar as Tasks\n• Implementamos [descrever o que foi feito]' },
                { id: 'quickfill-as-no-access', text: '• Precisamos reagendar o caso, já que o anunciante não tinha os acessos necessários para podermos implementar as tasks' }
            ];

            function updateAsMotivo() {
                const motivoField = document.getElementById('field-MOTIVO_REAGENDAMENTO');
                if (!motivoField) return;
                let combinedText = '';
                asCheckboxes.forEach(cbInfo => {
                    const checkbox = document.getElementById(cbInfo.id);
                    if (checkbox && checkbox.checked) {
                        combinedText += cbInfo.text + '\n';
                    }
                });
                combinedText = combinedText.trim(); 
                if (combinedText === '') {
                    motivoField.value = '• '; 
                    enableAutoBullet(motivoField);
                } else {
                    motivoField.value = combinedText + '\n• '; 
                }
            }
            asCheckboxes.forEach(cbInfo => {
                const checkbox = document.getElementById(cbInfo.id);
                if (checkbox) {
                    checkbox.onchange = updateAsMotivo;
                }
            });
            
            const nrpCheckbox = document.getElementById('quickfill-nrp-standard');
            if (nrpCheckbox) {
                nrpCheckbox.onchange = (e) => {
                    const isChecked = e.target.checked;
                    const comentariosField = document.getElementById('field-COMENTARIOS');
                    if (!comentariosField) return;
                    if (isChecked) {
                        comentariosField.value = "Duas ligações seguidas, e-mail \"Antes dos 10 minutos\" e uma terceira e ultima tentativa de ligação.\nNão houve resposta às tentativas de ligação ou e-mail, por isso o caso será inativado.";
                    } else {
                        comentariosField.value = "";
                    }
                };
            }

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
                if (textareaListFields.includes(fieldName) && value.trim() !== '') {
                    const lines = value.split('\n').map(line => line.trim()).filter(line => line !== '' && line !== '•').map(line => line.startsWith('• ') ? line.substring(2) : line).map(line => `<li>${line.trim()}</li>`).join('');
                    value = `<ul ${ulStyle}>${lines}</ul>`;
                } else if (textareaParagraphFields.includes(fieldName) && value.trim() !== '') {
                    value = value.split('\n').filter(line => line.trim() !== '').map(line => `<p style="margin: 0 0 8px 0;">${line}</p>`).join('');
                } else if (input.tagName === 'TEXTAREA') {
                    value = '';
                } else if (fieldName === 'ON_CALL' && value.trim() === '') {
                    value = 'N/A';
                
                // ===== ALTERAÇÃO REQ 1: Lógica do N/A para o novo campo =====
                } else if (fieldName === 'GTM_GA4_VERIFICADO' && value.trim() === '') {
                    value = 'N/A';
                // ==========================================================

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
              // SUCESSO: Campo encontrado
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
              // FALHA: Campo NÃO encontrado (ESTA É A LÓGICA ATUALIZADA)
              showToast("Campo de edição não encontrado. Copiando...", { error: true, duration: 2500 });
              // Chama a função de copiar. Ela já tem seu próprio toast de sucesso.
              copyHtmlToClipboard(htmlOutput); 
              // Não fechamos o popup e não limpamos os dados.
              // O usuário pode colar manualmente ou tentar clicar de novo.
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
    })();

    // ===================================================================
    // === MÓDULO 2: CALL SCRIPT ASSISTANT (Sem alterações) ===
    // ===================================================================
    (function() {
        // --- Dados e Estado (Módulo 2) ---
        const csaChecklistData = {
            "PT BAU": {
                color: "#6c1199",
                inicio: ["Apresentação (Nome e Time)", "A ligação poderá ser gravada para fins de treinamento e qualidade de acordo com nossa política de privacidade.", "Informar site registrado no caso", "Confirmar os 10 dígitos do CID e e-mail do anunciante.", "Confirmar a task e o AM", "Informar tempo da ligação", "Confirmar backup e acessos admin", "Fechar conteúdo sensível", ],
                fim: ["Resumo da chamada.", "Ajuda Adicional.", "Fechar compartilhamento de tela.", "Próximos passos (quanto tempo irá acompanhar o caso).", "Pesquisa de Satisfação.", "Durante esse tempo, nossa equipede qualidade poderá realizar um teste de conversão para validar a implementação. Você concorda com esse teste para garantirmos a efetividade da implementação?"]
            },
            "PT LT": {
                color: "#004f67",
                inicio: ["Apresentação (Nome e Time)", "Tempo de ligação", "Informar o site fornecido pelo AM", "Confirmar os 10 dígitos do CID e e-mail do anunciante.", "Confirmar a Task e o AM", "Termos e condições.", "Confirmar acessos Admin e Backup", "Fechar conteúdo sensível"],
                fim: ["Resumo da chamada", "Ajuda adicional", "Fechar compartilhamento de tela","Próximos passos (quanto tempo irá acompanhar)", "Pesquisa de satisfação", "Durante esse tempo, nossa equipe de qualidade poderá realizar um teste de conversão para validar a implementação. Você concorda com esse teste para garantirmos a efetividade da implemetação?"]
            },
            "ES BAU": {
                color: "#00bbff",
                inicio: ["Introducción (Nombre y  Equipo).", "La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra política de privacidad.", "Informar sitio web registrado en el caso.", "Confirmación: Solicitar al Anunciante que confirme los 10 dígitos del CID el email del anunciante.", "Confirmaciones: Tarea, AM", "Informar el tiempo que va a durar la reunión.", "Confirmación: Copia de seguridad y acceso de ADM", "Cerrar contenido sensible antes de compartir la pantalla.", ],
                fim: ["Resumen de la llamada.", "Ayuda adicional.", "Cerrar la pantalla compartida.", "Próximos passos (¿Cuánto tempo seguirá el caso?)", "Encuesta de satisfacción.", "Estaré monitoreando su caso durante XX días para asegurarme de que todo esté funcionando correctamente. Durante este tiempo, nuestro equipo de qualidade podría realizar una prueba de conversión para validar la implementación. ¿Estás de acuerdo con esta prueba para garantizar la efectividad de la implementación? Perfecto, ¡gracias!", ]
            },
            "ES LT": {
                color: "#f269ff",
                inicio: ["Presentación (Nombre y equipo).", "Informar al cliente sobre la llamada grabada.", "Tiempo de duración de la llamada.", "Solicitar al anunciante que confirme lo siguiente: \n A) 10 dígitos de la cuenta \n B) Correo electrónico \n C) Número de teléfono y \n D) Nombre del sitio web.", "autenticar la cuenta del anunciante en el cases, si corresponde.", "Términos y condiciones.", "Informar las Task solicitadas y AM.", "Cerrar contenido sensible.", "Confirmación de copia de seguridad y acceso de administrador a las ferramentas.", "Resumen de llamada."],
                fim: ["Ofrecer ayuda adicional.", "Dejar de compartir la pantalla.", "Pasos siguientes  (Si se le hará seguimiento al caso).", "Encuesta de Satisfacción.", "Informar al cliente que el equipo de QA irá a realizar pruebas en los siguientes dias."]
            },
            "EN BAU": { // Chave atualizada
                color: "#ff0011",
                inicio: ["Example 1", "Example 2"],
                fim: ["Example 3", "Example 4"]
            }
            // "EN LT" não existe, o que é esperado.
        };
        const csaCompletedTasks = {};
        let csaCurrentLang = "PT";
        let csaCurrentType = "BAU";

        // --- UI (Módulo 2) ---
        const csaBtn = document.createElement("button");
        csaBtn.id = "call-script-floating-btn";
        csaBtn.textContent = "📋";
        Object.assign(csaBtn.style, styleFloatingButton, { 
            top: "70%",
            background: "#5f6368"
        }); 
        csaBtn.onmouseenter = () => (csaBtn.style.background = "#4a4d50");
        csaBtn.onmouseleave = () => (csaBtn.style.background = "#5f6368");
        document.body.appendChild(csaBtn);
        makeDraggable(csaBtn);

        const csaPopup = document.createElement("div");
        csaPopup.id = "call-script-popup";
        Object.assign(csaPopup.style, stylePopup, { right: "80px" });
        
        const csaHeader = document.createElement("div");
        Object.assign(csaHeader.style, stylePopupHeader);
        const csaLogo = document.createElement("div");
        csaLogo.textContent = "📋";
        Object.assign(csaLogo.style, { fontSize: "20px" });
        const csaTitle = document.createElement("div");
        csaTitle.textContent = "Call Script Assistant v1.0";
        Object.assign(csaTitle.style, stylePopupTitle);
        csaHeader.appendChild(csaLogo);
        csaHeader.appendChild(csaTitle);
        csaPopup.appendChild(csaHeader);
        makeDraggable(csaPopup, csaHeader);

        const csaCloseBtn = document.createElement("div");
        csaCloseBtn.textContent = "✕";
        Object.assign(csaCloseBtn.style, stylePopupCloseBtn);
        csaCloseBtn.onclick = () => csaTogglePopup(false);
        csaPopup.appendChild(csaCloseBtn);

        const csaContent = document.createElement("div");
        csaContent.id = "csa-content";
        csaPopup.appendChild(csaContent);

        // --- NOVOS CONTROLES DE FILTRO (Req 1) ---
        const csaControlsDiv = document.createElement("div");
        Object.assign(csaControlsDiv.style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '8px' });

        // Seletor de TIPO (BAU/LT)
        const csaTypeContainer = document.createElement("div");
        Object.assign(csaTypeContainer.style, { display: 'flex', borderRadius: '8px', border: '1px solid #dadce0', overflow: 'hidden' });
        
        const csaTypeBAU = document.createElement("div");
        csaTypeBAU.textContent = "BAU";
        const csaTypeLT = document.createElement("div");
        csaTypeLT.textContent = "LT";
        
        const typeBtnStyle = { padding: '6px 12px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#5f6368', background: '#f8f9fa', transition: 'all 0.2s ease' };
        Object.assign(csaTypeBAU.style, typeBtnStyle);
        Object.assign(csaTypeLT.style, typeBtnStyle);
        
        csaTypeContainer.appendChild(csaTypeBAU);
        csaTypeContainer.appendChild(csaTypeLT);

        // Seletor de IDIOMA
        const csaLangSelect = document.createElement("select");
        Object.assign(csaLangSelect.style, styleSelect, { marginBottom: '0', width: 'auto', padding: '6px' }); // Estilo ajustado
        csaLangSelect.innerHTML = `<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>`;
        csaLangSelect.value = csaCurrentLang;
        
        csaControlsDiv.appendChild(csaTypeContainer);
        csaControlsDiv.appendChild(csaLangSelect);
        csaContent.appendChild(csaControlsDiv); // Adiciona os controles

        // Área do Checklist
        const csaChecklistArea = document.createElement("div");
        csaChecklistArea.id = "csa-checklist-area";
        Object.assign(csaChecklistArea.style, {
            maxHeight: "60vh",
            overflowY: "auto",
            paddingRight: "5px"
        });
        csaContent.appendChild(csaChecklistArea);
        document.body.appendChild(csaPopup);

        // --- Lógica (Módulo 2) ---

        function hexToRgba(hex, alpha) {
            const clean = hex.replace("#","");
            const r = parseInt(clean.substring(0,2),16);
            const g = parseInt(clean.substring(2,4),16);
            const b = parseInt(clean.substring(4,6),16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        function csaTogglePopup(show) {
            if (show) {
                csaPopup.style.opacity = "1";
                csaPopup.style.pointerEvents = "auto";
                csaPopup.style.transform = "scale(1)";
            } else {
                csaPopup.style.opacity = "0";
                csaPopup.style.pointerEvents = "none";
                csaPopup.style.transform = "scale(0.95)";
            }
        }

        // Nova função de estilo que usa classes e JS (Req 2 e 3)
        function csaSetLiStyle(li, isCompleted, color) {
            li.classList.toggle('csa-completed', isCompleted);
            
            if (isCompleted) {
                li.style.borderColor = color;
                li.style.backgroundColor = hexToRgba(color, 0.1);
            } else {
                li.style.borderColor = 'transparent';
                li.style.backgroundColor = '#f8f9fa';
            }
        }

        // Nova função para checar conclusão do grupo (Req 3)
        function checkGroupCompletion(combinedKey, groupKey, groupDiv) {
            const data = csaChecklistData[combinedKey];
            if (!data) return;

            const items = data[groupKey];
            if (!items || items.length === 0) return;

            let allDone = true;
            for (let i = 0; i < items.length; i++) {
                const key = `${combinedKey}-${groupKey}-${i}`;
                if (!csaCompletedTasks[key]) {
                    allDone = false;
                    break;
                }
            }
            groupDiv.classList.toggle('csa-group-completed', allDone);
        }

        // Função principal para construir o checklist (Atualizada)
        function csaBuildChecklist() {
            csaChecklistArea.innerHTML = "";
            const combinedKey = `${csaCurrentLang} ${csaCurrentType}`;
            const data = csaChecklistData[combinedKey];

            // Se a combinação não existir (ex: "EN LT")
            if (!data) {
                csaChecklistArea.innerHTML = `<div style="padding: 10px; color: #5f6368; font-family: 'Poppins', sans-serif;">Script não disponível para esta combinação.</div>`;
                return;
            }

            const color = data.color;

            ['inicio', 'fim'].forEach(groupKey => {
                const items = data[groupKey];
                if (!items || items.length === 0) return;

                const groupDiv = document.createElement('div');
                groupDiv.className = 'csa-group-container'; // Classe para animação
                Object.assign(groupDiv.style, { marginBottom: '16px' });
                
                const groupTitle = document.createElement('div');
                groupTitle.className = 'csa-group-title'; // Classe para animação
                let titleText = groupKey === 'inicio' ? 'Início' : 'Fim';
                if (csaCurrentLang.includes("ES")) titleText = groupKey === 'inicio' ? 'Inicio' : 'Fin';
                if (csaCurrentLang.includes("EN")) titleText = groupKey === 'inicio' ? 'Start' : 'End';
                
                groupTitle.textContent = titleText;
                Object.assign(groupTitle.style, styleLabel, {
                    fontWeight: "600",
                    fontSize: "14px",
                    textDecoration: "underline",
                    marginBottom: "8px"
                });
                groupDiv.appendChild(groupTitle);

                const list = document.createElement("ul");
                Object.assign(list.style, { listStyle: 'none', paddingLeft: '0', margin: '0' });
                
                items.forEach((item, index) => {
                    const li = document.createElement("li");
                    li.className = 'csa-li'; // Adiciona a classe base para estilo/animação
                    li.textContent = item;
                    
                    const key = `${combinedKey}-${groupKey}-${index}`;
                    const done = !!csaCompletedTasks[key];
                    
                    csaSetLiStyle(li, done, color); // Aplica o estilo
                    
                    li.addEventListener("click", () => {
                        const newDone = !csaCompletedTasks[key];
                        csaCompletedTasks[key] = newDone;
                        csaSetLiStyle(li, newDone, color);
                        // Verifica se o grupo todo foi concluído (Req 3)
                        checkGroupCompletion(combinedKey, groupKey, groupDiv);
                    });
                    list.appendChild(li);
                });
                groupDiv.appendChild(list);
                csaChecklistArea.appendChild(groupDiv);

                // Verifica o status de conclusão do grupo ao carregar (Req 3)
                checkGroupCompletion(combinedKey, groupKey, groupDiv);
            });
        }

        // --- Event Handlers (Módulo 2) ---
        let csaVisible = false;
        csaBtn.onclick = () => {
            csaVisible = !csaVisible;
            csaTogglePopup(csaVisible);
        };

        // Lógica dos botões de TIPO (BAU/LT) (Req 1)
        function setActiveType(type) {
             csaCurrentType = type;
             csaTypeBAU.style.background = (type === 'BAU') ? '#e8f0fe' : '#f8f9fa';
             csaTypeBAU.style.color = (type === 'BAU') ? '#1967d2' : '#5f6368';
             csaTypeLT.style.background = (type === 'LT') ? '#e8f0fe' : '#f8f9fa';
             csaTypeLT.style.color = (type === 'LT') ? '#1967d2' : '#5f6368';
             csaBuildChecklist(); // Recarrega a lista
        }
        
        csaTypeBAU.onclick = () => setActiveType('BAU');
        csaTypeLT.onclick = () => setActiveType('LT');

        // Lógica do seletor de IDIOMA (Req 1)
        csaLangSelect.addEventListener("change", (e) => {
            csaCurrentLang = e.target.value;
            csaBuildChecklist(); // Recarrega a lista
        });

        // Carregamento inicial
        setActiveType(csaCurrentType); // Define o estado inicial e chama csaBuildChecklist()

    })(); // Fim do Módulo 2
})(); // Fim do Bookmarklet
