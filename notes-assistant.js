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
    styleFloatingButton,
    stylePopupVersion, // NOVO: Estilo para a versão
    styleCredit,       // NOVO: Estilo para o crédito
    styleExpandButton  // NOVO: Estilo para o botão de expansão
} from 'utils';

// Importa dados
import {
    TASKS_DB,
    SUBSTATUS_TEMPLATES,
    textareaListFields,
    textareaParagraphFields,
    scenarioSnippets
} from 'notes-data';

export function initCaseNotesAssistant() {
    const CURRENT_VERSION = "v2.7.1"; // Atualize sua versão aqui!

    function copyHtmlToClipboard(html) { /* ... mantido ... */ }
    function enableAutoBullet(textarea) { /* ... mantido ... */ }

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
    const titleContainer = document.createElement("div"); // Container para título e versão
    Object.assign(titleContainer.style, { display: 'flex', flexDirection: 'column', flexGrow: '1' });

    const title = document.createElement("div");
    title.textContent = "Case Notes Assistant"; // Título sem a versão
    Object.assign(title.style, stylePopupTitle);
    titleContainer.appendChild(title);

    const versionDisplay = document.createElement("div"); // Elemento da versão
    versionDisplay.textContent = CURRENT_VERSION;
    Object.assign(versionDisplay.style, stylePopupVersion);
    titleContainer.appendChild(versionDisplay);

    header.appendChild(logo);
    header.appendChild(titleContainer); // Adiciona o container de título/versão
    popup.appendChild(header);
    makeDraggable(popup, header);

    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✕";
    Object.assign(closeBtn.style, stylePopupCloseBtn);
    closeBtn.onclick = () => togglePopup(false);
    popup.appendChild(closeBtn);

    // NOVO: Botão de Expansão
    const expandBtn = document.createElement("div");
    expandBtn.textContent = "↔"; // Unicode para setas horizontais
    Object.assign(expandBtn.style, styleExpandButton);
    popup.appendChild(expandBtn);

    let isExpanded = false;
    const initialWidth = parseInt(stylePopup.width, 10); // Obtém a largura inicial do estilo
    const expandedWidth = initialWidth * 2; // Dobro da largura

    expandBtn.onclick = () => {
        isExpanded = !isExpanded;
        popup.style.width = isExpanded ? `${expandedWidth}px` : `${initialWidth}px`;
        
        // Ajusta a largura dos campos de texto dentro do pop-up
        const fields = popup.querySelectorAll('input[type="text"], textarea, select');
        fields.forEach(field => {
            field.style.width = '100%'; // Sempre 100% do container pai
        });

        // Adapta o posicionamento do pop-up para manter a centralização ou a âncora à direita
        // Se ancorado à direita, ajusta `right` para manter a posição
        const currentRight = parseInt(popup.style.right, 10);
        if (isExpanded) {
            popup.style.right = `${currentRight - (expandedWidth - initialWidth)}px`;
        } else {
            popup.style.right = `${currentRight + (expandedWidth - initialWidth)}px`;
        }
    };
    // FIM NOVO: Botão de Expansão

    // Estilos locais do Módulo 1 (pequenas mudanças para animacões)
    const styleInput = {
        width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0",
        fontSize: "14px", marginBottom: "12px", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease" // Adicionado transição
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
        padding: "8px", background: "#f8f9fa", borderRadius: "6px",
        transition: "background-color 0.2s ease, box-shadow 0.2s ease", // Adicionado transição
        userSelect: "none" // Evita seleção de texto ao clicar
    };
    styleCheckboxLabel[':hover'] = { // Efeito de hover no JS (simulado)
        backgroundColor: "#e0e0e0"
    };
    const styleCheckboxInput = {
        width: "auto", marginRight: "8px", marginBottom: "0",
        cursor: "pointer",
        accentColor: "#1a73e8" // Cor do checkbox
    };
    // styleButtonBase já é importado e tem transições

    // Conteúdo principal do popup
    const popupContent = document.createElement("div");
    Object.assign(popupContent.style, {
        padding: "0 16px 16px 16px", // Ajuste para o padding lateral e inferior
        overflowY: "auto", // Scroll para o conteúdo
        flexGrow: "1" // Permite que o conteúdo ocupe o espaço restante
    });
    popup.appendChild(popupContent); // Todos os steps agora vão para popupContent

    // Adiciona o crédito no final do popup
    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, styleCredit);
    popup.appendChild(credit); // Adiciona o crédito diretamente ao popup, abaixo do conteúdo

    // ... (restante do seu código da UI, mas todos os steps agora são appendChildren de popupContent)
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
    popupContent.appendChild(step1Div); // Mudança aqui!

    // ETAPA 1.5
    stepSnippetsDiv.id = "step-1-5-snippets";
    Object.assign(stepSnippetsDiv.style, { ...styleStepBlock, display: 'none' });
    const stepSnippetsTitle = document.createElement("h3");
    stepSnippetsTitle.textContent = "Cenários Comuns";
    Object.assign(stepSnippetsTitle.style, styleH3);
    snippetContainer.id = "snippet-container";
    stepSnippetsDiv.appendChild(stepSnippetsTitle);
    stepSnippetsDiv.appendChild(snippetContainer);
    popupContent.appendChild(stepSnippetsDiv); // Mudança aqui!

    // ETAPA 2
    step2Div.id = "step-2-tasks";
    Object.assign(step2Div.style, { ...styleStepBlock, display: 'none' });
    const step2Title = document.createElement("h3");
    step2Title.textContent = "Selecione as Tasks";
    Object.assign(step2Title.style, styleH3);
    taskCheckboxesContainer.id = "task-checkboxes-container";
    step2Div.appendChild(step2Title);
    step2Div.appendChild(taskCheckboxesContainer);
    popupContent.appendChild(step2Div); // Mudança aqui!

    // ETAPA 3
    step3Div.id = "step-3-form";
    Object.assign(step3Div.style, { ...styleStepBlock, display: 'none' });
    const step3Title = document.createElement("h3");
    step3Title.textContent = "Preencha os Detalhes";
    Object.assign(step3Title.style, styleH3);
    dynamicFormFieldsContainer.id = "dynamic-form-fields-container";
    step3Div.appendChild(step3Title);
    step3Div.appendChild(dynamicFormFieldsContainer);
    popupContent.appendChild(step3Div); // Mudança aqui!

    // Botões
    Object.assign(buttonContainer.style, { display: "flex", gap: "8px", padding: "0 0 16px 0", display: "none" }); // Ajuste de padding
    popupContent.appendChild(buttonContainer); // Mudança aqui!

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

    // --- Lógica (Módulo 1) --- (Mantida)

    function resetSteps(startFrom = 1.5) { /* ... mantido ... */ }
    mainStatusSelect.onchange = () => { /* ... mantido ... */ }
    subStatusSelect.onchange = () => {
        const selectedSubStatusKey = subStatusSelect.value;
        resetSteps(1.5);
        if (!selectedSubStatusKey) return;

        const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
        snippetContainer.innerHTML = '';
        let snippetAdded = false;

        // --- ETAPA 1.5: Bloco de Snippets ---
        // ... (seu código atual aqui, mas adicione os listeners de hover para os checkboxes/radios)
        const addSnippetInput = (scenario, type, container) => {
            const label = document.createElement('label');
            Object.assign(label.style, styleCheckboxLabel); // Aplica o estilo base
            label.onmouseover = () => label.style.backgroundColor = '#e8eaed'; // Efeito de hover
            label.onmouseout = () => label.style.backgroundColor = '#f8f9fa'; // Retorna ao normal

            const input = document.createElement('input');
            input.type = type;
            input.id = scenario.id;
            Object.assign(input.style, styleCheckboxInput);
            label.appendChild(input);
            label.appendChild(document.createTextNode(` ${scenario.text}`));
            container.appendChild(label);
            return input; // Retorna o input para configurar name/checked
        };

        if (selectedSubStatusKey === 'NI_Awaiting_Inputs') {
            const radioName = "ni-scenario";
            const scenarios = [
                { id: 'quickfill-ni-inicio-manual', text: 'Início 2/6 (Manual)'},
                { id: 'quickfill-ni-cms-access', text: 'Início 2/6 (ADV sem acesso ao CMS)' },
                { id: 'quickfill-ni-followup', text: 'Follow-up 2/6' }
            ];
            scenarios.forEach((scenario, index) => {
                const radio = addSnippetInput(scenario, 'radio', snippetContainer);
                radio.name = radioName;
                if (index === 0) radio.checked = true;
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
                addSnippetInput(scenario, 'checkbox', snippetContainer);
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
                addSnippetInput(scenario, 'checkbox', snippetContainer);
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
                const radio = addSnippetInput(scenario, 'radio', snippetContainer);
                radio.name = radioName;
                if (index === 0) radio.checked = true;
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
                Object.assign(label.style, styleCheckboxLabel); // Aplica o estilo base
                label.onmouseover = () => label.style.backgroundColor = '#e8eaed'; // Efeito de hover
                label.onmouseout = () => label.style.backgroundColor = '#f8f9fa'; // Retorna ao normal
                
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
                field.classList.add('bullet-textarea'); // Adiciona classe para estilo da scrollbar
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

        const snippetInputs = snippetContainer.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        if (snippetInputs.length > 0) {
            snippetInputs.forEach(input => {
                input.removeEventListener('change', updateFieldsFromScenarios);
                input.addEventListener('change', updateFieldsFromScenarios);
            });
             updateFieldsFromScenarios();
        }

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
            
            // NOVO: Reseta o estado de expansão ao fechar
            isExpanded = false;
            popup.style.width = `${initialWidth}px`;
            popup.style.right = "24px"; // Volta para a posição original se estava expandido
        }
    }

    let visible = false;
    btn.onclick = () => {
        visible = !visible;
        togglePopup(visible);
    };
}