// src/modules/notes/notes-assistant.js

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
    stylePopupVersion,
    styleCredit,
    styleExpandButton,
    typeBtnStyle,
    getRandomGoogleStyle
} from '../shared/utils.js'; 

import {
    TASKS_DB,
    SUBSTATUS_TEMPLATES,
    SUBSTATUS_SHORTCODES, // Importa o mapa de shortcodes de email
    textareaListFields,
    textareaParagraphFields,
    scenarioSnippets,
    translations
} from './notes-data.js';

// Importa a automação de email
import { runEmailAutomation } from '../email/email-automation.js'; 

export function initCaseNotesAssistant() {
    const CURRENT_VERSION = "v3.2.3"; // Versão com Email Checkbox
    
    // --- ESTADO GLOBAL DO MÓDULO ---
    let currentCaseType = 'bau';
    let currentLang = 'pt'; 
    let isPortugalCase = false;

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
        } catch (err) {
            showToast("Falha ao copiar", { error: true });
        }
        selection.removeAllRanges();
        document.body.removeChild(container);
    };

    // --- UI (Módulo 1) ---
    const btn = document.createElement("button");
    btn.id = "autofill-floating-btn";
    btn.textContent = "✎";
    Object.assign(btn.style, styleFloatingButton, { top: "60%" });
    btn.onmouseenter = () => {
        btn.style.background = "#1765c0";
        btn.style.transform = "scale(1.1)";
    };
    btn.onmouseleave = () => {
        btn.style.background = "#1a73e8";
        btn.style.transform = "scale(1)";
    };
    document.body.appendChild(btn);
    makeDraggable(btn);

    const popup = document.createElement("div");
    popup.id = "autofill-popup";
    Object.assign(popup.style, stylePopup, { right: "24px" });

    const header = document.createElement("div");
    Object.assign(header.style, stylePopupHeader);
    makeDraggable(popup, header); 

    const headerLeft = document.createElement("div");
    Object.assign(headerLeft.style, { display: 'flex', alignItems: 'center', gap: '10px' });
    
    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "24px", height: "24px" });
    
    const titleContainer = document.createElement("div");
    Object.assign(titleContainer.style, { display: 'flex', flexDirection: 'column' });

    const title = document.createElement("div");
    title.textContent = "Case Notes Assistant";
    Object.assign(title.style, stylePopupTitle);
    
    const versionDisplay = document.createElement("div");
    versionDisplay.textContent = CURRENT_VERSION;
    Object.assign(versionDisplay.style, stylePopupVersion);

    titleContainer.appendChild(title);
    titleContainer.appendChild(versionDisplay);
    headerLeft.appendChild(logo);
    headerLeft.appendChild(titleContainer);
    
    const headerRight = document.createElement("div");
    Object.assign(headerRight.style, { display: 'flex', alignItems: 'center' });

    const expandBtn = document.createElement("div");
    expandBtn.textContent = "↔";
    expandBtn.classList.add('no-drag'); 
    Object.assign(expandBtn.style, styleExpandButton);
    expandBtn.onmouseover = () => expandBtn.style.backgroundColor = '#e8eaed';
    expandBtn.onmouseout = () => expandBtn.style.backgroundColor = 'transparent';

    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✕";
    closeBtn.classList.add('no-drag'); 
    Object.assign(closeBtn.style, stylePopupCloseBtn);
    closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#e8eaed';
    closeBtn.onmouseout = () => closeBtn.style.backgroundColor = 'transparent';
    
    headerRight.appendChild(expandBtn);
    headerRight.appendChild(closeBtn);
 
    popup.appendChild(header);
    header.appendChild(headerLeft);
    header.appendChild(headerRight);

    let isExpanded = false;
    const initialWidth = parseInt(stylePopup.width, 10);
    const expandedWidth = initialWidth * 2;

    expandBtn.onclick = () => {
        isExpanded = !isExpanded;
        const newWidth = isExpanded ? expandedWidth : initialWidth;
        const widthDifference = expandedWidth - initialWidth;
        popup.style.width = `${newWidth}px`;
        
        if (popup.style.right && popup.style.right !== 'auto') {
            const currentRight = parseInt(popup.style.right, 10);
            if (!isNaN(currentRight)) {
                if (isExpanded) {
                    popup.style.right = `${currentRight - widthDifference}px`;
                } else {
                    popup.style.right = `${currentRight + widthDifference}px`;
                }
            }
        }
    };
    
    closeBtn.onclick = () => togglePopup(false);

    // --- Estilos Locais ---
    const styleInput = {
        width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0",
        fontSize: "14px", marginBottom: "12px", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease"
    };
    const styleTextarea = { ...styleInput, height: "100px", resize: "vertical" };
    const styleH3 = {
        fontSize: "14px", fontWeight: "600", color: "#202124", margin: "0 0 12px 0"
    };
    const styleCheckboxLabel = {
        display: "flex", alignItems: "center", marginBottom: "10px",
        fontSize: "14px", fontWeight: "400", cursor: "pointer",
        padding: "8px", background: "#f8f9fa", borderRadius: "6px",
        transition: "background-color 0.2s ease, box-shadow 0.2s ease",
        userSelect: "none"
    };
    const styleCheckboxInput = {
        width: "auto", marginRight: "10px", marginBottom: "0",
        cursor: "pointer",
        accentColor: "#1a73e8"
    };
     const styleButtonBase = {
        flex: "1 1 0", padding: "10px 0", color: "#fff", border: "none",
        borderRadius: "8px", fontSize: "14px", fontWeight: "500",
        cursor: "pointer", marginTop: "16px"
    };
    const styleStepper = {
        display: 'none', alignItems: 'center', gap: '5px', marginLeft: 'auto' 
    };
    const styleStepperBtn = {
        width: '24px', height: '24px', border: '1px solid #dadce0', borderRadius: '50%',
        backgroundColor: '#f8f9fa', color: '#3c4043', cursor: 'pointer', padding: '0',
        fontSize: '16px', lineHeight: '22px', textAlign: 'center', userSelect: 'none'
    };
    const styleStepperCount = {
        fontSize: '14px', fontWeight: '500', color: '#1a73e8', minWidth: '15px', textAlign: 'center'
    };
    const styleStepBlock = {
        borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px"
    };
    const styleRadioContainer = {
        display: 'flex', gap: '15px', marginBottom: '10px'
    };

    // Conteúdo principal do popup
    const popupContent = document.createElement("div");
    Object.assign(popupContent.style, {
        padding: "0 16px 16px 16px",
        overflowY: "auto",
        flexGrow: "1"
    });
    popup.appendChild(popupContent);

    // Crédito no final
    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, styleCredit);
    popup.appendChild(credit);

    // --- Variáveis da UI ---
    const langToggleDiv = document.createElement("div");
    const langLabel = document.createElement("label");
    const langPT = document.createElement("div");
    const langES = document.createElement("div");
    
    const step0Div = document.createElement("div"); 
    const typeLabel = document.createElement("label");
    const typeBAU = document.createElement("div");
    const typeLM = document.createElement("div");
    
    const step1Div = document.createElement("div");
    const mainStatusLabel = document.createElement("label");
    const subStatusLabel = document.createElement("label");
    
    const stepPortugalDiv = document.createElement("div");
    const portugalLabel = document.createElement("label");
    const portugalRadioSim = document.createElement("input");
    const portugalLabelSim = document.createElement("label");
    const portugalRadioNao = document.createElement("input");
    const portugalLabelNao = document.createElement("label");

    const stepConsentDiv = document.createElement("div");
    const consentLabel = document.createElement("label");
    const consentRadioSim = document.createElement("input");
    const consentLabelSim = document.createElement("label");
    const consentRadioNao = document.createElement("input");
    const consentLabelNao = document.createElement("label");
    
    const stepSnippetsDiv = document.createElement("div");
    const snippetContainer = document.createElement("div");
    const stepSnippetsTitle = document.createElement("h3");
    
    const step2Div = document.createElement("div");
    const taskCheckboxesContainer = document.createElement("div");
    const step2Title = document.createElement("h3");
    
    const step3Div = document.createElement("div");
    const dynamicFormFieldsContainer = document.createElement("div");
    const step3Title = document.createElement("h3");
    
    const mainStatusSelect = document.createElement("select");
    const subStatusSelect = document.createElement("select");
    
    // ===== NOVO: Container para o Checkbox de Email (Final) =====
    const emailAutomationDiv = document.createElement("div");
    const emailLabel = document.createElement("label");
    const emailCheckbox = document.createElement("input");
    // ============================================================
    
    const buttonContainer = document.createElement("div");
    const copyButton = document.createElement("button");
    const generateButton = document.createElement("button");

    // --- Funções de Tradução ---
    function t(key) {
        if (translations && translations[currentLang] && translations[currentLang][key]) {
            return translations[currentLang][key];
        }
        if (translations && translations['pt'] && translations['pt'][key]) {
            return translations['pt'][key];
        }
        return key; 
    }

    function updateUIText() {
        langLabel.textContent = t('idioma');
        typeLabel.textContent = t('fluxo');
        mainStatusLabel.textContent = t('status_principal');
        subStatusLabel.textContent = t('substatus');
        stepSnippetsTitle.textContent = t('cenarios_comuns');
        step2Title.textContent = t('selecione_tasks');
        step3Title.textContent = t('preencha_detalhes');
        copyButton.textContent = t('copiar');
        generateButton.textContent = t('preencher');
        
        if (mainStatusSelect.querySelector('option[value=""]'))
            mainStatusSelect.querySelector('option[value=""]').textContent = t('select_status');
        
        if (subStatusSelect.querySelector('option[value=""]'))
            subStatusSelect.querySelector('option[value=""]').textContent = t('select_substatus');

        portugalLabel.textContent = t('caso_portugal');
        portugalLabelSim.textContent = t('sim');
        portugalLabelNao.textContent = t('nao');
        consentLabel.textContent = t('consentiu_gravacao');
        consentLabelSim.textContent = t('sim');
        consentLabelNao.textContent = t('nao');
        
        dynamicFormFieldsContainer.querySelectorAll('label').forEach(label => {
            const fieldName = label.nextElementSibling.id.replace('field-', '');
            const translatedLabel = t(fieldName.toLowerCase());
            if (translatedLabel !== fieldName.toLowerCase()) {
                label.textContent = translatedLabel;
            } else {
                label.textContent = fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ':';
            }
        });
    }
    
    function setLanguage(lang) {
        currentLang = lang;
        const newActiveStyle = getRandomGoogleStyle();
        
        Object.assign(langPT.style, typeBtnStyle);
        Object.assign(langES.style, typeBtnStyle);
        
        if (lang === 'pt') {
            Object.assign(langPT.style, newActiveStyle);
            stepPortugalDiv.style.display = 'block'; 
            setPortugalCase(isPortugalCase); 
        } else {
            Object.assign(langES.style, newActiveStyle);
            stepPortugalDiv.style.display = 'none'; 
            stepConsentDiv.style.display = 'none';  
        }
        
        updateUIText();
        
        if (subStatusSelect.value) {
            subStatusSelect.dispatchEvent(new Event('change'));
        }
    }
    
    // --- Funções de Lógica dos Campos ---
    function updateFieldsFromScenarios() {
        // ... (código mantido, sem alterações na lógica)
        const activeScenarioInputs = snippetContainer.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
        const targetFieldsContent = {};
        const activeLinkedTasks = new Set();

        activeScenarioInputs.forEach(input => {
            const scenarioId = input.id;
            const snippets = scenarioSnippets[scenarioId];
            if (snippets) {
                for (const fieldId in snippets) {
                    if (fieldId !== 'linkedTask' && fieldId !== 'type') {
                        if (!targetFieldsContent[fieldId]) {
                            targetFieldsContent[fieldId] = [];
                        }
                         if (!targetFieldsContent[fieldId].includes(snippets[fieldId])) {
                            targetFieldsContent[fieldId].push(snippets[fieldId]);
                         }
                    } else if (fieldId === 'linkedTask') {
                         activeLinkedTasks.add(snippets.linkedTask);
                    }
                }
            }
        });

        const allPossibleTargetFields = new Set();
         Object.values(scenarioSnippets).forEach(snippets => {
             Object.keys(snippets).forEach(key => {
                 if(key !== 'linkedTask' && key !== 'type') allPossibleTargetFields.add(key);
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
                     enableAutoBullet(field);
                }
             }
        });

        const taskCheckboxes = taskCheckboxesContainer.querySelectorAll('.task-checkbox');
        taskCheckboxes.forEach(taskCheckbox => {
            taskCheckbox.checked = false;
            taskCheckbox.dispatchEvent(new Event('change')); 
            if (activeLinkedTasks.has(taskCheckbox.value)) {
                taskCheckbox.checked = true;
                taskCheckbox.dispatchEvent(new Event('change')); 
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
    
    // ===== ETAPA -1 - Seletor de Idioma (PT/ES) =====
    langToggleDiv.id = "step-lang-type";
    Object.assign(langLabel.style, styleLabel);
    langToggleDiv.appendChild(langLabel);

    const langContainer = document.createElement("div");
    Object.assign(langContainer.style, { display: 'flex', borderRadius: '8px', border: '1px solid #dadce0', overflow: 'hidden', marginBottom: '16px' });
    
    langPT.textContent = "Português";
    langPT.classList.add('no-drag');
    langES.textContent = "Español";
    langES.classList.add('no-drag');

    Object.assign(langPT.style, typeBtnStyle); 
    Object.assign(langES.style, typeBtnStyle);  
    
    langPT.onclick = () => setLanguage('pt');
    langES.onclick = () => setLanguage('es');
    
    langContainer.appendChild(langPT);
    langContainer.appendChild(langES);
    langToggleDiv.appendChild(langContainer);
    popupContent.appendChild(langToggleDiv);

    // ===== ETAPA 0 - Seletor de Tipo (BAU/LM) =====
    step0Div.id = "step-0-case-type";
    Object.assign(typeLabel.style, styleLabel);
    step0Div.appendChild(typeLabel);

    const typeContainer = document.createElement("div");
    Object.assign(typeContainer.style, { display: 'flex', borderRadius: '8px', border: '1px solid #dadce0', overflow: 'hidden', marginBottom: '16px' });
    
    typeBAU.textContent = "BAU";
    typeBAU.classList.add('no-drag');
    typeLM.textContent = "LM";
    typeLM.classList.add('no-drag');

    Object.assign(typeBAU.style, typeBtnStyle); 
    Object.assign(typeLM.style, typeBtnStyle);  
    
    function setCaseType(type) {
        currentCaseType = type; 
        const newActiveStyle = getRandomGoogleStyle();
        Object.assign(typeBAU.style, typeBtnStyle);
        Object.assign(typeLM.style, typeBtnStyle);
        
        if (type === 'bau') {
            Object.assign(typeBAU.style, newActiveStyle);
        } else {
            Object.assign(typeLM.style, newActiveStyle);
        }
        
        if (subStatusSelect.value) {
            subStatusSelect.dispatchEvent(new Event('change'));
        }
    }
    
    typeBAU.onclick = () => setCaseType('bau');
    typeLM.onclick = () => setCaseType('lm');
    
    typeContainer.appendChild(typeBAU);
    typeContainer.appendChild(typeLM);
    step0Div.appendChild(typeContainer);
    popupContent.appendChild(step0Div);
    
    setCaseType('bau'); 
    
    // ===== ETAPA 1 - Status/Substatus =====
    step1Div.id = "step-1-selection";
    Object.assign(mainStatusLabel.style, styleLabel);
    mainStatusSelect.id = "main-status";
    mainStatusSelect.innerHTML = `<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>`;
    Object.assign(mainStatusSelect.style, styleSelect);
    
    Object.assign(subStatusLabel.style, styleLabel);
    subStatusSelect.id = "sub-status";
    subStatusSelect.innerHTML = `<option value="">-- Selecione o Status --</option>`;
    Object.assign(subStatusSelect.style, styleSelect);
    subStatusSelect.disabled = true;
    
    step1Div.appendChild(mainStatusLabel);
    step1Div.appendChild(mainStatusSelect);
    step1Div.appendChild(subStatusLabel);
    step1Div.appendChild(subStatusSelect);
    popupContent.appendChild(step1Div);
    
    // ===== ETAPA 1.1 - Caso Portugal? =====
    stepPortugalDiv.id = "step-1-1-portugal";
    Object.assign(stepPortugalDiv.style, { ...styleStepBlock, display: 'none' });
    
    Object.assign(portugalLabel.style, styleLabel);
    stepPortugalDiv.appendChild(portugalLabel);
    
    const portugalRadioGroup = document.createElement('div');
    Object.assign(portugalRadioGroup.style, styleRadioContainer);
    
    const divPtSim = document.createElement('div');
    Object.assign(divPtSim.style, { display: 'flex', alignItems: 'center' });
    portugalRadioSim.type = 'radio';
    portugalRadioSim.id = 'portugal-sim';
    portugalRadioSim.name = 'portugal-group';
    portugalRadioSim.value = 'sim';
    Object.assign(portugalRadioSim.style, styleCheckboxInput);
    portugalLabelSim.htmlFor = 'portugal-sim';
    Object.assign(portugalLabelSim.style, { cursor: 'pointer' });
    divPtSim.appendChild(portugalRadioSim);
    divPtSim.appendChild(portugalLabelSim);
    
    const divPtNao = document.createElement('div');
    Object.assign(divPtNao.style, { display: 'flex', alignItems: 'center' });
    portugalRadioNao.type = 'radio';
    portugalRadioNao.id = 'portugal-nao';
    portugalRadioNao.name = 'portugal-group';
    portugalRadioNao.value = 'nao';
    portugalRadioNao.checked = true; 
    Object.assign(portugalRadioNao.style, styleCheckboxInput);
    portugalLabelNao.htmlFor = 'portugal-nao';
    Object.assign(portugalLabelNao.style, { cursor: 'pointer' });
    divPtNao.appendChild(portugalRadioNao);
    divPtNao.appendChild(portugalLabelNao);
    
    portugalRadioGroup.appendChild(divPtSim);
    portugalRadioGroup.appendChild(divPtNao);
    stepPortugalDiv.appendChild(portugalRadioGroup);
    popupContent.appendChild(stepPortugalDiv);

    function setPortugalCase(isPT) {
        isPortugalCase = isPT;
        if (isPT) {
            stepConsentDiv.style.display = 'block'; 
        } else {
            stepConsentDiv.style.display = 'none'; 
        }
    }
    portugalRadioSim.onchange = () => setPortugalCase(true);
    portugalRadioNao.onchange = () => setPortugalCase(false);
    
    // ===== ETAPA 1.2 - Consentimento =====
    stepConsentDiv.id = "step-1-2-consent";
    Object.assign(stepConsentDiv.style, { ...styleStepBlock, display: 'none' }); 
    
    Object.assign(consentLabel.style, styleLabel);
    stepConsentDiv.appendChild(consentLabel);
    
    const consentRadioGroup = document.createElement('div');
    Object.assign(consentRadioGroup.style, styleRadioContainer);
    
    const divSim = document.createElement('div');
    Object.assign(divSim.style, { display: 'flex', alignItems: 'center' });
    consentRadioSim.type = 'radio';
    consentRadioSim.id = 'consent-sim';
    consentRadioSim.name = 'consent-group';
    consentRadioSim.value = 'Sim';
    consentRadioSim.checked = true;
    Object.assign(consentRadioSim.style, styleCheckboxInput);
    consentLabelSim.htmlFor = 'consent-sim';
    Object.assign(consentLabelSim.style, { cursor: 'pointer' });
    divSim.appendChild(consentRadioSim);
    divSim.appendChild(consentLabelSim);
    
    const divNao = document.createElement('div');
    Object.assign(divNao.style, { display: 'flex', alignItems: 'center' });
    consentRadioNao.type = 'radio';
    consentRadioNao.id = 'consent-nao';
    consentRadioNao.name = 'consent-group';
    consentRadioNao.value = 'Não';
    Object.assign(consentRadioNao.style, styleCheckboxInput);
    consentLabelNao.htmlFor = 'consent-nao';
    Object.assign(consentLabelNao.style, { cursor: 'pointer' });
    divNao.appendChild(consentRadioNao);
    divNao.appendChild(consentLabelNao);
    
    consentRadioGroup.appendChild(divSim);
    consentRadioGroup.appendChild(divNao);
    stepConsentDiv.appendChild(consentRadioGroup);
    popupContent.appendChild(stepConsentDiv);

    // ===== ETAPA 1.5 - Cenários =====
    stepSnippetsDiv.id = "step-1-5-snippets";
    Object.assign(stepSnippetsDiv.style, { ...styleStepBlock, display: 'none' });
    Object.assign(stepSnippetsTitle.style, styleH3);
    snippetContainer.id = "snippet-container";
    stepSnippetsDiv.appendChild(stepSnippetsTitle);
    stepSnippetsDiv.appendChild(snippetContainer);
    popupContent.appendChild(stepSnippetsDiv);

    // ===== ETAPA 2 - Tasks =====
    step2Div.id = "step-2-tasks";
    Object.assign(step2Div.style, { ...styleStepBlock, display: 'none' });
    Object.assign(step2Title.style, styleH3);
    taskCheckboxesContainer.id = "task-checkboxes-container";
    step2Div.appendChild(step2Title);
    step2Div.appendChild(taskCheckboxesContainer);
    popupContent.appendChild(step2Div);

    // ===== ETAPA 3 - Campos Dinâmicos =====
    step3Div.id = "step-3-form";
    Object.assign(step3Div.style, { ...styleStepBlock, display: 'none' });
    Object.assign(step3Title.style, styleH3);
    dynamicFormFieldsContainer.id = "dynamic-form-fields-container";
    step3Div.appendChild(step3Title);
    step3Div.appendChild(dynamicFormFieldsContainer);
    popupContent.appendChild(step3Div);

    // ===== NOVO: CHECKBOX DE EMAIL (Segurança) =====
    emailAutomationDiv.id = "step-4-email";
    Object.assign(emailAutomationDiv.style, { 
        display: "none", // Escondido por padrão, só mostra se tiver template
        marginTop: "16px", 
        paddingTop: "12px", 
        borderTop: "1px solid #eee" 
    });
    
    emailLabel.style.display = "flex";
    emailLabel.style.alignItems = "center";
    emailLabel.style.cursor = "pointer";
    emailLabel.style.fontSize = "14px";
    
    emailCheckbox.type = "checkbox";
    emailCheckbox.checked = true; // Padrão marcado
    Object.assign(emailCheckbox.style, styleCheckboxInput);
    
    emailLabel.appendChild(emailCheckbox);
    emailLabel.appendChild(document.createTextNode("Preencher email automaticamente?"));
    emailAutomationDiv.appendChild(emailLabel);
    popupContent.appendChild(emailAutomationDiv);
    // ==============================================

    Object.assign(buttonContainer.style, { display: "none", gap: "8px", padding: "0" });
    popupContent.appendChild(buttonContainer);

    Object.assign(copyButton.style, { ...styleButtonBase, backgroundColor: "#5f6368" });
    copyButton.onmouseover = () => (copyButton.style.backgroundColor = "#4a4d50");
    copyButton.onmouseout = () => (copyButton.style.backgroundColor = "#5f6368");
    buttonContainer.appendChild(copyButton);

    Object.assign(generateButton.style, { ...styleButtonBase, backgroundColor: "#1a73e8" });
    generateButton.onmouseover = () => (generateButton.style.backgroundColor = "#1765c0");
    generateButton.onmouseout = () => (generateButton.style.backgroundColor = "#1a73e8");
    buttonContainer.appendChild(generateButton);

    document.body.appendChild(popup);

    // --- Inicializa a Linguagem Padrão ---
    setLanguage('pt'); 

    // --- Lógica de Eventos ---

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
            emailAutomationDiv.style.display = 'none'; // Reseta email
        }
    }

    mainStatusSelect.onchange = () => {
        const selectedStatus = mainStatusSelect.value;
        resetSteps(1.5);
        subStatusSelect.innerHTML = `<option value="">${t('select_substatus')}</option>`;
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

        const addSnippetInput = (scenario, type, container) => {
            const label = document.createElement('label');
            Object.assign(label.style, styleCheckboxLabel);
            label.onmouseover = () => label.style.backgroundColor = '#e8eaed';
            label.onmouseout = () => label.style.backgroundColor = '#f8f9fa';

            const input = document.createElement('input');
            input.type = type;
            input.id = scenario.id;
            Object.assign(input.style, styleCheckboxInput);
            label.appendChild(input);
            label.appendChild(document.createTextNode(` ${scenario.text}`));
            container.appendChild(label);
            return input;
        };
        
        let scenarios = [];
        let inputType = 'radio'; 

        if (selectedSubStatusKey === 'NI_Awaiting_Inputs') {
            scenarios = [
                { id: 'quickfill-ni-inicio-manual', text: 'Início 2/6 (Manual)'},
                { id: 'quickfill-ni-cms-access', text: 'Início 2/6 (ADV sem acesso ao CMS)' },
                { id: 'quickfill-ni-followup-bau', text: 'Follow-up 2/6 (BAU)' },
                { id: 'quickfill-ni-followup-lm', text: 'Follow-up 2/6 (LM)' } 
            ];
        } else if (selectedSubStatusKey.startsWith('SO_')) {
            inputType = 'checkbox';
            scenarios = [
                { id: 'quickfill-gtm-install', text: 'Instalação do GTM' },
                { id: 'quickfill-whatsapp', text: 'Conversão de WhatsApp' },
                { id: 'quickfill-form', text: 'Conversão de Formulário (Padrão)' },
                { id: 'quickfill-ecw4-close', text: 'Fechamento ECW4 (Pós 7 dias)' }
            ];
        } else if (selectedSubStatusKey.startsWith('AS_')) {
            inputType = 'checkbox'; 
            const reasonTitle = document.createElement('label');
            reasonTitle.textContent = t('cenarios_comuns'); // Traduzido
            Object.assign(reasonTitle.style, styleLabel);
            snippetContainer.appendChild(reasonTitle);
            
            scenarios = [
                { id: 'quickfill-as-no-show', text: 'Anunciante não compareceu (respondeu e-mail)' },
                { id: 'quickfill-as-insufficient-time', text: 'Tempo insuficiente' },
                { id: 'quickfill-as-no-access', text: 'Anunciante sem acessos necessários' }
            ];
        } else if (selectedSubStatusKey.startsWith('IN_')) {
             scenarios = [
                { id: 'quickfill-in-nrp-bau', text: 'NRP (BAU - 3 tentativas)' }, 
                { id: 'quickfill-in-nrp-lm', text: 'NRP (LM - Sem tentativas)' }, 
                { id: 'quickfill-in-no-show-bau', text: 'No-Show (BAU - 3 tentativas)' }, 
                { id: 'quickfill-in-2-6-final', text: 'Finalização 2/6 (Sem Resposta)' },
                { id: 'quickfill-in-manual', text: 'Outro (Manual)' }
             ];
        }

        const filteredScenarios = scenarios.filter(s => {
            const scenarioData = scenarioSnippets[s.id];
            if (!scenarioData) {
                console.warn(`Cenário "${s.id}" não encontrado em scenarioSnippets.`);
                return false;
            }
            return !scenarioData.type || scenarioData.type === 'all' || scenarioData.type === currentCaseType;
        });
         
        filteredScenarios.forEach((scenario, index) => {
            const input = addSnippetInput(scenario, inputType, snippetContainer);
            if (inputType === 'radio') {
                input.name = "scenario-radio-group"; 
                if (index === 0) input.checked = true;
            }
        });
        
        snippetAdded = filteredScenarios.length > 0;

        if (snippetAdded) {
            stepSnippetsDiv.style.display = 'block';
        }

        // Lógica do Stepper (Criação)
        if (templateData.requiresTasks) {
            taskCheckboxesContainer.innerHTML = '';
            for (const taskKey in TASKS_DB) {
                const task = TASKS_DB[taskKey];
                
                const label = document.createElement('label');
                Object.assign(label.style, styleCheckboxLabel);
                label.onmouseover = () => { if (!checkbox.checked) label.style.backgroundColor = '#e8eaed'; };
                label.onmouseout = () => { if (!checkbox.checked) label.style.backgroundColor = '#f8f9fa'; };

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = taskKey;
                checkbox.className = 'task-checkbox'; 
                Object.assign(checkbox.style, styleCheckboxInput);
                
                const taskName = document.createElement('span');
                taskName.textContent = task.name;
                Object.assign(taskName.style, { flexGrow: '1' }); 

                const stepperDiv = document.createElement('div');
                stepperDiv.className = 'stepper-container';
                Object.assign(stepperDiv.style, styleStepper);

                const btnMinus = document.createElement('button');
                btnMinus.type = 'button';
                btnMinus.textContent = '−';
                btnMinus.classList.add('no-drag');
                Object.assign(btnMinus.style, styleStepperBtn);

                const countSpan = document.createElement('span');
                countSpan.className = 'stepper-count';
                countSpan.textContent = '1';
                Object.assign(countSpan.style, styleStepperCount);

                const btnPlus = document.createElement('button');
                btnPlus.type = 'button';
                btnPlus.textContent = '+';
                btnPlus.classList.add('no-drag');
                Object.assign(btnPlus.style, styleStepperBtn);

                stepperDiv.appendChild(btnMinus);
                stepperDiv.appendChild(countSpan);
                stepperDiv.appendChild(btnPlus);

                label.appendChild(checkbox);
                label.appendChild(taskName);
                label.appendChild(stepperDiv);
                taskCheckboxesContainer.appendChild(label);

                checkbox.onchange = () => {
                    if (checkbox.checked) {
                        stepperDiv.style.display = 'flex';
                        countSpan.textContent = '1';
                        Object.assign(label.style, { background: '#e8f0fe' });
                    } else {
                        stepperDiv.style.display = 'none';
                        countSpan.textContent = '0';
                        Object.assign(label.style, { background: '#f8f9fa' });
                    }
                };

                btnMinus.onclick = (e) => {
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    let count = parseInt(countSpan.textContent);
                    if (count > 1) {
                        countSpan.textContent = count - 1;
                    } else {
                        checkbox.checked = false;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                };
                
                btnPlus.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    let count = parseInt(countSpan.textContent);
                    countSpan.textContent = count + 1;
                };
            }
            step2Div.style.display = 'block';
        }

        // Campos Dinâmicos
        dynamicFormFieldsContainer.innerHTML = '';
        const placeholders = templateData.template.match(/{([A-Z0-9_]+)}/g) || [];
        const uniquePlaceholders = [...new Set(placeholders)];
        
        uniquePlaceholders.forEach(placeholder => {
            if (placeholder === '{TAGS_IMPLEMENTED}' || 
                placeholder === '{SCREENSHOTS_LIST}' || 
                placeholder === '{CONSENTIU_GRAVACAO}' ||
                placeholder === '{CASO_PORTUGAL}') { 
                return;
            }
            
            const fieldName = placeholder.slice(1, -1);
            const label = document.createElement('label');
            
            const translatedLabel = t(fieldName.toLowerCase());
            label.textContent = (translatedLabel !== fieldName.toLowerCase()) ? translatedLabel : (fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ':');
            
            Object.assign(label.style, styleLabel);
            let field;
            if (textareaListFields.includes(fieldName)) {
                field = document.createElement('textarea');
                Object.assign(field.style, styleTextarea);
                field.classList.add('bullet-textarea');
                enableAutoBullet(field);
            } else if (textareaParagraphFields.includes(fieldName)) {
                field = document.createElement('textarea');
                Object.assign(field.style, styleTextarea);
            } else {
                field = document.createElement('input');
                field.type = 'text';
                Object.assign(field.style, styleInput);
                 if (fieldName === 'REASON_COMMENTS' && (selectedSubStatusKey === 'NI_Awaiting_Inputs' || selectedSubStatusKey.startsWith('IN_'))) {
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
        
        // ===== NOVO: MOSTRA CHECKBOX DE EMAIL SE TIVER SHORTCODE =====
        if (SUBSTATUS_SHORTCODES[selectedSubStatusKey]) {
            emailAutomationDiv.style.display = 'block';
        } else {
            emailAutomationDiv.style.display = 'none';
        }
        // ============================================================

        buttonContainer.style.display = 'flex';
    };


    function generateOutputHtml() {
        const selectedSubStatusKey = subStatusSelect.value;
        if (!selectedSubStatusKey) return null;
        const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
        let outputText = templateData.template.replace(/\n/g, "<br>");
        const ulStyle = "style=\"margin-bottom: 12px; padding-left: 30px;\"";

        // Lógica do Stepper (Saída)
        if (templateData.requiresTasks) {
            const selectedCheckboxes = taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked');
            let tagNames = [];
            let screenshotsText = '';
            const screenshotType = (selectedSubStatusKey.includes('Education')) ? 'education' : 'implementation';
            
            selectedCheckboxes.forEach(checkbox => {
                const taskKey = checkbox.value;
                const task = TASKS_DB[taskKey];
                
                const label = checkbox.closest('label');
                const countSpan = label.querySelector('.stepper-count');
                const count = parseInt(countSpan.textContent);

                if (count > 1) {
                    tagNames.push(`${task.name} (x${count})`);
                } else {
                    tagNames.push(task.name);
                }

                const screenshotList = task.screenshots[screenshotType] || [];
                if (screenshotList.length > 0) {
                    for (let i = 1; i <= count; i++) {
                        if (count > 1) {
                            screenshotsText += `<b>${task.name} - Implementação #${i}</b>`;
                        } else {
                            screenshotsText += `<b>${task.name}</b>`;
                        }
                        const screenItems = screenshotList.map(print => `<li>${print} - </li>`).join('');
                        screenshotsText += `<ul ${ulStyle}>${screenItems}</ul>`;
                    }
                }
            });
            
            outputText = outputText.replace(/{TAGS_IMPLEMENTED}/g, tagNames.join(', ') || 'N/A');
            outputText = outputText.replace(/{SCREENSHOTS_LIST}/g, screenshotsText ? `${screenshotsText}` : 'N/A');
        }

        // ===== Lógica dos Campos de Portugal =====
        if (currentLang === 'pt' && isPortugalCase) {
            const consentValue = consentRadioSim.checked ? t('sim') : t('nao');
            const consentHtml = `<br><b>${t('consentiu_gravacao')}</b> ${consentValue}<br><br>`;
            outputText = outputText.replace(/{CONSENTIU_GRAVACAO}/g, consentHtml);
            outputText = outputText.replace(/{CASO_PORTUGAL}/g, `<br><b>${t('caso_portugal')}</b> ${t('sim')}<br>`);
        } else if (currentLang === 'pt' && !isPortugalCase) {
            outputText = outputText.replace(/{CASO_PORTUGAL}/g, `<br><b>${t('caso_portugal')}</b> ${t('nao')}<br>`);
            outputText = outputText.replace(/{CONSENTIU_GRAVACAO}/g, ''); 
        } else {
            outputText = outputText.replace(/{CASO_PORTUGAL}/g, '');
            outputText = outputText.replace(/{CONSENTIU_GRAVACAO}/g, '');
        }

        const inputs = dynamicFormFieldsContainer.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const fieldName = input.id.replace('field-', '');
            const placeholder = new RegExp(`{${fieldName}}`, 'g');
            let value = input.value;
            
            if (fieldName === 'REASON_COMMENTS' && (selectedSubStatusKey.startsWith('NI_') || selectedSubStatusKey.startsWith('IN_'))) {
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
        
        outputText = outputText.replace(/{([A-Z0-9_]+)}/g, ''); 
        
        return outputText;
    }


    copyButton.onclick = () => {
        const htmlOutput = generateOutputHtml();
        if (htmlOutput) {
            copyHtmlToClipboard(htmlOutput);
            showToast(t('copiado_sucesso')); 
        } else {
            showToast(t('selecione_substatus'), { error: true }); 
        }
    };

  
generateButton.onclick = () => {
        // 1. Captura o valor AGORA, antes de qualquer reset
        const selectedSubStatusKey = subStatusSelect.value;

        const htmlOutput = generateOutputHtml();
        
        if (!htmlOutput) {
          showToast(t('selecione_substatus'), { error: true });
          return;
        }

        copyHtmlToClipboard(htmlOutput); 

        const campo = document.querySelector('div[contenteditable="true"]');

        if (campo) {
          campo.focus();
          if (campo.innerHTML.trim() !== '' && !campo.innerHTML.endsWith('<br><br>')) {
              document.execCommand('insertHTML', false, '<br><br>');
          }
          document.execCommand('insertHTML', false, htmlOutput);
          campo.dispatchEvent(new Event("input", { bubbles: true }));
          
          setTimeout(() => {
              showToast(t('inserido_copiado')); 
          }, 600); 

          // --- LÓGICA DE EMAIL (Movi para cá, antes do reset) ---
          console.log("--- DIAGNÓSTICO DE EMAIL ---");
          console.log("Substatus Capturado:", selectedSubStatusKey);
          
          if (selectedSubStatusKey && SUBSTATUS_SHORTCODES[selectedSubStatusKey] && emailCheckbox.checked) {
              const emailCode = SUBSTATUS_SHORTCODES[selectedSubStatusKey];
              console.log("Código de Email:", emailCode);
              
              setTimeout(() => {
                  runEmailAutomation(emailCode);
              }, 1000);
          } else {
              console.log("Email não disparado (Sem código ou checkbox desmarcado).");
          }
          // -------------------------------------------------------

          // 4. AGORA SIM, Fecha e Reseta
          togglePopup(false);
          resetSteps(1.5);
          mainStatusSelect.value = "";
          subStatusSelect.innerHTML = `<option value="">${t('select_substatus')}</option>`;
          subStatusSelect.disabled = true;

        } else {
          showToast(t('campo_nao_encontrado'), { error: true, duration: 3000 }); 
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
            
            isExpanded = false;
            popup.style.width = `${initialWidth}px`;
            
            if (popup.style.right !== 'auto') {
                 popup.style.right = "24px"; 
            }
        }
    }

    let visible = false;
    btn.onclick = () => {
        visible = !visible;
        togglePopup(visible);
    };
    
    // Inicia a UI com o idioma padrão
    setLanguage(currentLang);
}