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
} from 'utils';

import {
    TASKS_DB,
    SUBSTATUS_TEMPLATES,
    textareaListFields,
    textareaParagraphFields,
    scenarioSnippets
} from 'notes-data';

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
            showToast("Texto copiado com sucesso"); 
        } catch (err) {
            showToast("Falha ao copiar", { error: true });
        }
        selection.removeAllRanges();
        document.body.removeChild(container);
    }

    // ===== OBJETOS DE DADOS REMOVIDOS DAQUI (AGORA SÃO IMPORTADOS) =====
    // const TASKS_DB = { ... };
    // const SUBSTATUS_TEMPLATES = { ... };
    // const textareaListFields = [ ... ];
    // const textareaParagraphFields = [ ... ];
    // const scenarioSnippets = { ... };
    // =================================================================

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
    title.textContent = "Case Notes Assistant v2.7";
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

    // Estilos locais do Módulo 1
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

    // --- Declaração dos elementos da UI ---
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
            const snippets = scenarioSnippets[scenarioId]; // scenarioSnippets é importado
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
         Object.values(scenarioSnippets).forEach(snippets => { // scenarioSnippets é importado
             Object.keys(snippets).forEach(key => {
                 if(key !== 'linkedTask') allPossibleTargetFields.add(key);
             });
         });

        allPossibleTargetFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                const combinedTextArray = targetFieldsContent[fieldId] || [];
                let finalValue = "";

                if (textareaListFields.includes(fieldId.replace('field-', ''))) { // textareaListFields é importado
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
                } else if (textareaListFields.includes(fieldId.replace('field-', ''))) { // textareaListFields é importado
                     field.value = '• ';
                } else {
                    field.value = '';
                }

                if (field.tagName === 'TEXTAREA' && textareaListFields.includes(fieldId.replace('field-', ''))) { // textareaListFields é importado
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
    Object.assign(mainStatusLabel.style, styleLabel); 
    mainStatusLabel.textContent = "Status Principal:";
    mainStatusSelect.id = "main-status";
    mainStatusSelect.innerHTML = `<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>`;
    Object.assign(mainStatusSelect.style, styleSelect); 
    const subStatusLabel = document.createElement("label");
    Object.assign(subStatusLabel.style, styleLabel); 
    subStatusLabel.textContent = "Substatus:";
    subStatusSelect.id = "sub-status";
    subStatusSelect.innerHTML = `<option value="">-- Selecione o Status --</option>`;
    Object.assign(subStatusSelect.style, styleSelect); 
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
        for (const key in SUBSTATUS_TEMPLATES) { // SUBSTATUS_TEMPLATES é importado
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

        const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey]; // SUBSTATUS_TEMPLATES é importado
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
            for (const taskKey in TASKS_DB) { // TASKS_DB é importado
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
            if (textareaListFields.includes(fieldName)) { // textareaListFields é importado
                field = document.createElement('textarea');
                Object.assign(field.style, styleTextarea);
                enableAutoBullet(field);
            } else if (textareaParagraphFields.includes(fieldName)) { // textareaParagraphFields é importado
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
        const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey]; // SUBSTATUS_TEMPLATES é importado
        let outputText = templateData.template.replace(/\n/g, "<br>");
        const ulStyle = "style=\"margin-bottom: 12px; padding-left: 30px;\"";

        if (templateData.requiresTasks) {
            const selectedCheckboxes = taskCheckboxesContainer.querySelectorAll('input[type="checkbox"]:checked');
            let tagNames = [];
            let screenshotsText = '';
            const screenshotType = (selectedSubStatusKey === 'SO_Education_Only') ? 'education' : 'implementation';
            selectedCheckboxes.forEach(checkbox => {
                const taskKey = checkbox.value;
                const task = TASKS_DB[taskKey]; // TASKS_DB é importado
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
                if (checkedRadio && scenarioSnippets[checkedRadio.id] && scenarioSnippets[checkedRadio.id]['field-REASON_COMMENTS']) { // scenarioSnippets é importado
                     value = scenarioSnippets[checkedRadio.id]['field-REASON_COMMENTS'];
                }
            }

            if (textareaListFields.includes(fieldName) && value.trim() !== '') { // textareaListFields é importado
                const lines = value.split('\n')
                                 .map(line => line.trim())
                                 .filter(line => line !== '' && line !== '•')
                                 .map(line => line.startsWith('• ') ? line.substring(2).trim() : line.trim())
                                 .filter(line => line !== '')
                                 .map(line => `<li>${line}</li>`)
                                 .join('');
                value = lines ? `<ul ${ulStyle}>${lines}</ul>` : '';
            } else if (textareaParagraphFields.includes(fieldName) && value.trim() !== '') { // textareaParagraphFields é importado
                value = value.split('\n').filter(line => line.trim() !== '').map(line => `<p style="margin: 0 0 8px 0;">${line}</p>`).join('');
            } else if (input.tagName === 'TEXTAREA' && !textareaListFields.includes(fieldName) && !textareaParagraphFields.includes(fieldName)) { // textareaListFields é importado
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