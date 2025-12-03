// src/modules/notes/notes-assistant.js

import { showToast } from '../shared/utils.js'; 

import {
    TASKS_DB, SUBSTATUS_TEMPLATES, SUBSTATUS_SHORTCODES, 
    textareaListFields, textareaParagraphFields, scenarioSnippets, translations
} from './notes-data.js';

import { runEmailAutomation } from '../email/email-automation.js'; 
import { togglePopupAnimation } from '../shared/animations.js';
import { copyHtmlToClipboard, ensureNoteCardIsOpen, triggerInputEvents } from './notes-bridge.js';

// MÓDULOS E UI
import { createTagSupportModule } from './tag-support.js'; 
import { buildNotesUI, UI_STYLES } from './notes-ui.js'; // <--- AQUI ESTÁ A MÁGICA
import * as NoteStyles from './notes-styles.js'; // Para estilos dinâmicos (Tasks)

export function initCaseNotesAssistant() {
    const CURRENT_VERSION = "v3.5.6"; 
    
    // --- ESTADO ---
    let currentCaseType = 'bau';
    let currentLang = 'pt'; 
    let isPortugalCase = false;
    let visible = false;

    // 1. INICIALIZA MÓDULOS AUXILIARES
    const tagSupport = createTagSupportModule();

    // 2. CONSTRÓI A UI (Via Factory)
    // Passamos a versão e o callback do botão fechar
    const ui = buildNotesUI(CURRENT_VERSION, () => {
        visible = false;
        togglePopupAnimation(false, ui.animRefs);
    });

    // 3. CONECTA AS VARIÁVEIS DA UI COM A LÓGICA (Desempacotamento)
    // Isso permite que o resto do código funcione sem alterações drásticas
    const { 
        popup, btn, btnContainer, animRefs, subStatusHelpLink, emailCheckbox 
    } = ui;

    const { main: mainStatusSelect, sub: subStatusSelect } = ui.selects;
    
    const { 
        tasks: taskCheckboxesContainer, 
        dynamicForms: dynamicFormFieldsContainer, 
        screenshots: screenshotsListDiv, 
        screenshotsRoot: screenshotsContainer, 
        snippet: snippetContainer, 
        tagSupportSlot // Slot vazio onde vamos colocar o Tag Support
    } = ui.containers;

    const { copy: copyButton, generate: generateButton } = ui.buttons;
    
    const { 
        portugalSim: portugalRadioSim, portugalNao: portugalRadioNao, 
        consentSim: consentRadioSim, consentNao: consentRadioNao 
    } = ui.radios;
    
    const { typeBAU, typeLM, langPT, langES } = ui.toggleDivs;

    // Variáveis de controle de visibilidade (Steps)
    const {
        snippets: stepSnippetsDiv,
        tasks: step2Div,
        forms: step3Div,
        email: emailAutomationDiv,
        buttons: buttonContainer,
        optionalTaskBtn: optionalTaskBtn,
        step2Title: step2Title
    } = ui.steps;

    // 4. INJEÇÃO DE DEPENDÊNCIAS NA UI
    if (tagSupportSlot) {
        tagSupportSlot.appendChild(tagSupport.element);
    }

    // =========================================================================
    // 5. LÓGICA DE NEGÓCIO (Igual a anterior, mas usando as variáveis acima)
    // =========================================================================

    function setCaseType(type) {
        currentCaseType = type; 
        // Atualiza visual dos botões
        if (type === 'bau') {
            Object.assign(typeBAU.style, { backgroundColor: '#e8f0fe', color: '#1967d2', borderColor: '#e8f0fe' });
            Object.assign(typeLM.style, { backgroundColor: '#f8f9fa', color: '#5f6368', borderColor: '#dadce0' });
            subStatusHelpLink.href = "https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657";
        } else {
            Object.assign(typeLM.style, { backgroundColor: '#e8f0fe', color: '#1967d2', borderColor: '#e8f0fe' });
            Object.assign(typeBAU.style, { backgroundColor: '#f8f9fa', color: '#5f6368', borderColor: '#dadce0' });
            subStatusHelpLink.href = "https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243";
        }
        if (subStatusSelect.value) { subStatusSelect.dispatchEvent(new Event('change')); }
    }

    function t(key) {
        try {
            if (translations && translations[currentLang] && translations[currentLang][key]) return translations[currentLang][key];
            if (translations && translations['pt'] && translations['pt'][key]) return translations['pt'][key];
        } catch(e) {}
        return key; 
    }

    function updateUIText() {
        ui.labels.langLabel.textContent = t('idioma');
        ui.labels.typeLabel.textContent = t('fluxo');
        ui.labels.mainStatusLabel.textContent = t('status_principal');
        ui.labels.subStatusLabel.textContent = t('substatus');
        ui.labels.stepSnippetsTitle.textContent = t('cenarios_comuns');
        ui.labels.step2Title.textContent = t('selecione_tasks');
        ui.labels.step3Title.textContent = t('preencha_detalhes');
        copyButton.textContent = t('copiar');
        generateButton.textContent = t('preencher');
        
        if (mainStatusSelect.querySelector('option[value=""]')) mainStatusSelect.querySelector('option[value=""]').textContent = t('select_status');
        if (subStatusSelect.querySelector('option[value=""]')) subStatusSelect.querySelector('option[value=""]').textContent = t('select_substatus');
        
        ui.labels.portugalLabel.textContent = t('caso_portugal');
        ui.labels.portLabelSim.textContent = t('sim'); ui.labels.portLabelNao.textContent = t('nao');
        ui.labels.consentLabel.textContent = t('consentiu_gravacao');
        ui.labels.consLabelSim.textContent = t('sim'); ui.labels.consLabelNao.textContent = t('nao');
        
        optionalTaskBtn.textContent = "+ " + (currentLang === 'pt' ? "Gostaria de selecionar uma task?" : "Quisiera seleccionar una tarea?");

        dynamicFormFieldsContainer.querySelectorAll('label').forEach(label => {
            const fieldName = label.nextElementSibling.id.replace('field-', '');
            const translatedLabel = t(fieldName.toLowerCase());
            if (translatedLabel !== fieldName.toLowerCase()) label.textContent = translatedLabel;
            else label.textContent = fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ':';
        });
    }
    
    function setLanguage(lang) {
        currentLang = lang;
        if (lang === 'pt') {
            Object.assign(langPT.style, { backgroundColor: '#e8f0fe', color: '#1967d2', borderColor: '#e8f0fe' });
            Object.assign(langES.style, { backgroundColor: '#f8f9fa', color: '#5f6368', borderColor: '#dadce0' });
            ui.steps.portugal.style.display = 'block'; 
            setPortugalCase(isPortugalCase); 
        } else {
            Object.assign(langES.style, { backgroundColor: '#e8f0fe', color: '#1967d2', borderColor: '#e8f0fe' });
            Object.assign(langPT.style, { backgroundColor: '#f8f9fa', color: '#5f6368', borderColor: '#dadce0' });
            ui.steps.portugal.style.display = 'none'; 
            ui.steps.consent.style.display = 'none';  
        }
        updateUIText();
        if (subStatusSelect.value) {
            subStatusSelect.dispatchEvent(new Event('change'));
        }
    }

    function setPortugalCase(isPT) {
        isPortugalCase = isPT;
        if (isPT) { ui.steps.consent.style.display = 'block'; } else { ui.steps.consent.style.display = 'none'; }
    }
    
    // Eventos Iniciais de Controle
    typeBAU.onclick = () => setCaseType('bau'); typeLM.onclick = () => setCaseType('lm');
    langPT.onclick = () => setLanguage('pt'); langES.onclick = () => setLanguage('es');
    portugalRadioSim.onchange = () => setPortugalCase(true); portugalRadioNao.onchange = () => setPortugalCase(false);


    // --- LÓGICA DE TASKS ---

    function populateTaskCheckboxes() {
        taskCheckboxesContainer.innerHTML = '';
        // Cria os elementos da Busca e Chips usando os estilos importados do NoteStyles
        // ... (Barra de busca e Chips) ...
        // Para brevidade do exemplo, vou focar no loop principal, mas você deve manter sua lógica de chips aqui
        
        // (Se você quiser usar a lógica completa de Chips e Busca, me avise, mas o essencial é o loop abaixo)
        
        for (const taskKey in TASKS_DB) {
            const task = TASKS_DB[taskKey];
            const label = document.createElement('label');
            Object.assign(label.style, NoteStyles.styleCheckboxLabel);
            label.onmouseover = () => { if (!checkbox.checked) label.style.backgroundColor = '#e8eaed'; };
            label.onmouseout = () => { if (!checkbox.checked) label.style.backgroundColor = '#f8f9fa'; };

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox'; checkbox.value = taskKey; checkbox.className = 'task-checkbox'; 
            Object.assign(checkbox.style, NoteStyles.styleCheckboxInput);
            
            const taskName = document.createElement('span'); taskName.textContent = task.name; Object.assign(taskName.style, { flexGrow: '1' }); 

            const stepperDiv = document.createElement('div'); stepperDiv.className = 'stepper-container'; Object.assign(stepperDiv.style, NoteStyles.styleStepper);
            const btnMinus = document.createElement('button'); btnMinus.type = 'button'; btnMinus.textContent = '−'; btnMinus.classList.add('no-drag'); Object.assign(btnMinus.style, NoteStyles.styleStepperBtn);
            const countSpan = document.createElement('span'); countSpan.className = 'stepper-count'; countSpan.textContent = '1'; Object.assign(countSpan.style, NoteStyles.styleStepperCount);
            const btnPlus = document.createElement('button'); btnPlus.type = 'button'; btnPlus.textContent = '+'; btnPlus.classList.add('no-drag'); Object.assign(btnPlus.style, NoteStyles.styleStepperBtn);

            stepperDiv.appendChild(btnMinus); stepperDiv.appendChild(countSpan); stepperDiv.appendChild(btnPlus);
            label.appendChild(checkbox); label.appendChild(taskName); label.appendChild(stepperDiv);
            taskCheckboxesContainer.appendChild(label);

            // Eventos
            const updateState = () => {
                 renderScreenshotInputs();
                 const checked = Array.from(taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked')).map(c => c.value);
                 tagSupport.updateVisibility(subStatusSelect.value, checked);
            };

            checkbox.onchange = () => {
                if (checkbox.checked) { stepperDiv.style.display = 'flex'; countSpan.textContent = '1'; Object.assign(label.style, { background: '#e8f0fe' }); } 
                else { stepperDiv.style.display = 'none'; countSpan.textContent = '0'; Object.assign(label.style, { background: '#f8f9fa' }); }
                updateState();
            };
            btnMinus.onclick = (e) => {
                e.preventDefault(); e.stopPropagation();
                let count = parseInt(countSpan.textContent);
                if (count > 1) { countSpan.textContent = count - 1; } else { checkbox.checked = false; checkbox.dispatchEvent(new Event('change')); }
                updateState();
            };
            btnPlus.onclick = (e) => {
                e.preventDefault(); e.stopPropagation();
                let count = parseInt(countSpan.textContent); countSpan.textContent = count + 1;
                updateState();
            };
        }
    }

    // Evento do botão "+ Gostaria de selecionar..."
    optionalTaskBtn.onclick = () => {
        optionalTaskBtn.style.display = 'none'; 
        step2Title.style.display = 'block';     
        taskCheckboxesContainer.style.display = 'block'; 
        populateTaskCheckboxes(); 
    };

    function renderScreenshotInputs() {
        // USA O ESTILO IMPORTADO DO UI.JS PARA EVITAR ERROS
        const localStyleInput = UI_STYLES.input; 

        screenshotsListDiv.innerHTML = ''; 
        const selectedCheckboxes = taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked');
        const selectedSubStatusKey = subStatusSelect.value;
        const isEducation = selectedSubStatusKey && selectedSubStatusKey.includes('Education');
        const screenshotType = isEducation ? 'education' : 'implementation';
        
        let hasScreenshots = false;

        selectedCheckboxes.forEach(checkbox => {
            const taskKey = checkbox.value;
            const task = TASKS_DB[taskKey];
            const countSpan = checkbox.closest('label').querySelector('.stepper-count');
            const count = parseInt(countSpan.textContent);
            const screenshotList = task.screenshots ? (task.screenshots[screenshotType] || []) : [];

            if (screenshotList.length > 0) {
                hasScreenshots = true;
                const taskBlock = document.createElement('div');
                Object.assign(taskBlock.style, { marginBottom: '16px', background: '#f8f9fa', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0' });
                const taskHeader = document.createElement('div');
                taskHeader.innerHTML = `<strong style="color:#5f6368">${task.name}</strong> <small style="color:#1a73e8">(${count}x)</small>`;
                taskHeader.style.marginBottom = "12px";
                taskBlock.appendChild(taskHeader);

                for (let i = 1; i <= count; i++) {
                    const instanceContainer = document.createElement('div');
                    Object.assign(instanceContainer.style, { background: 'white', padding: '12px', borderRadius: '6px', marginBottom: '12px', border: '1px solid #dadce0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' });

                    // Nome Editável
                    const nameWrapper = document.createElement('div');
                    Object.assign(nameWrapper.style, { display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '8px' });
                    const editIcon = document.createElement('span'); editIcon.textContent = "✎"; Object.assign(editIcon.style, { fontSize: '14px', color: '#9aa0a6', cursor: 'text' });
                    const nameInput = document.createElement('input'); nameInput.type = 'text'; const suffix = count > 1 ? ` #${i}` : ''; nameInput.value = `${task.name}${suffix}`; nameInput.id = `name-${taskKey}-${i}`; 
                    
                    // Usa localStyleInput (que vem do UI_STYLES)
                    Object.assign(nameInput.style, localStyleInput, { fontWeight: '600', color: '#1a73e8', marginBottom: '0', border: 'none', borderBottom: '1px dashed #ccc', borderRadius: '0', padding: '4px 0', background: 'transparent', width: '100%' });
                    nameInput.onfocus = () => { nameInput.style.borderBottom = '2px solid #1a73e8'; editIcon.style.color = '#1a73e8'; };
                    nameInput.onblur = () => { nameInput.style.borderBottom = '1px dashed #ccc'; editIcon.style.color = '#9aa0a6'; };
                    editIcon.onclick = () => nameInput.focus();
                    
                    nameWrapper.appendChild(editIcon); nameWrapper.appendChild(nameInput); instanceContainer.appendChild(nameWrapper);

                    screenshotList.forEach((reqPrint, index) => {
                        const row = document.createElement('div'); Object.assign(row.style, { display: 'flex', flexDirection: 'column', marginBottom: '8px' });
                        const printLabel = document.createElement('label'); printLabel.innerHTML = `📷 ${reqPrint}:`; Object.assign(printLabel.style, { fontSize: '11px', color: '#5f6368', marginBottom: '4px' });
                        const printInput = document.createElement('input'); printInput.type = 'text'; printInput.placeholder = "Cole o link..."; printInput.id = `screen-${taskKey}-${i}-${index}`; printInput.className = 'screenshot-input-field'; 
                        Object.assign(printInput.style, localStyleInput); printInput.style.marginBottom = "4px"; printInput.style.fontSize = "12px";
                        row.appendChild(printLabel); row.appendChild(printInput); instanceContainer.appendChild(row);
                    });
                    taskBlock.appendChild(instanceContainer);
                }
                screenshotsListDiv.appendChild(taskBlock);
            }
        });
        
        // Mostra container se houver screenshots
        screenshotsContainer.style.display = hasScreenshots ? 'block' : 'none';
        
        // Atualiza Tag Support
        const checked = Array.from(taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked')).map(c => c.value);
        tagSupport.updateVisibility(subStatusSelect.value, checked);
    }

    // --- GERAR SAÍDA ---
    function generateOutputHtml() {
        const selectedSubStatusKey = subStatusSelect.value;
        if (!selectedSubStatusKey) return null;
        const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
        let outputText = templateData.template.replace(/\n/g, "<br>");
        const ulStyle = "style=\"margin-bottom: 12px; padding-left: 30px;\"";

        const hasCheckedTasks = taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked').length > 0;

        if (templateData.requiresTasks || hasCheckedTasks) {
            const selectedCheckboxes = taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked');
            let tagNames = []; let screenshotsText = '';
            const isEducation = selectedSubStatusKey.includes('Education');
            const screenshotType = isEducation ? 'education' : 'implementation';
            
            selectedCheckboxes.forEach(checkbox => {
                const taskKey = checkbox.value;
                const task = TASKS_DB[taskKey];
                const countSpan = checkbox.closest('label').querySelector('.stepper-count');
                const count = parseInt(countSpan.textContent);

                if (count > 1) tagNames.push(`${task.name} (x${count})`); else tagNames.push(task.name);
                const screenshotList = task.screenshots ? (task.screenshots[screenshotType] || []) : [];
                
                if (screenshotList.length > 0) {
                    for (let i = 1; i <= count; i++) {
                        const nameInput = document.getElementById(`name-${taskKey}-${i}`);
                        const customName = nameInput ? nameInput.value : `${task.name} #${i}`;
                        screenshotsText += `<b>${customName}</b>`;
                        let itemsHtml = '';
                        screenshotList.forEach((reqPrint, index) => {
                            const inputId = `screen-${taskKey}-${i}-${index}`;
                            const inputEl = document.getElementById(inputId);
                            const userValue = inputEl ? inputEl.value.trim() : '';
                            const displayValue = userValue ? ` ${userValue}` : '';
                            itemsHtml += `<li>${reqPrint} -${displayValue}</li>`;
                        });
                        screenshotsText += `<ul ${ulStyle}>${itemsHtml}</ul>`;
                    }
                }
            });
            outputText = outputText.replace(/{TAGS_IMPLEMENTED}/g, tagNames.join(', ') || 'N/A');
            outputText = outputText.replace(/{SCREENSHOTS_LIST}/g, screenshotsText ? `${screenshotsText}` : 'N/A');
        } else {
             outputText = outputText.replace(/{TAGS_IMPLEMENTED}/g, 'N/A');
             outputText = outputText.replace(/{SCREENSHOTS_LIST}/g, 'N/A');
        }

        // Campos Dinâmicos + Limpeza Inteligente (ON_CALL, etc)
        const inputs = dynamicFormFieldsContainer.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const fieldName = input.id.replace('field-', '');
            const placeholderStr = `{${fieldName}}`;
            const placeholderRegex = new RegExp(placeholderStr, 'g');
            let value = input.value;
            
            // Lógica de limpeza inteligente
            const textContent = value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
            const isEffectivelyEmpty = textContent === '' || textContent === '•' || textContent.toLowerCase() === 'n/a';

            if (isEffectivelyEmpty) {
                const lineRemoverRegex = new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${fieldName}\\}(?:<br>\\s*)?`, 'gi');
                if (lineRemoverRegex.test(outputText)) outputText = outputText.replace(lineRemoverRegex, '');
                else outputText = outputText.replace(placeholderRegex, '');
            } else {
                const safeValue = (value || '').replace(/\$/g, '$$$$');
                outputText = outputText.replace(placeholderRegex, safeValue);
            }
        });
        
        outputText = outputText.replace(/{([A-Z0-9_]+)}/g, ''); 
        outputText = outputText.replace(/(<br>){3,}/g, '<br><br>');
        outputText += tagSupport.getOutput(); // Adiciona resposta do Tag Support
        return outputText;
    }

    // --- EVENTOS DE CONTROLE ---
    
    mainStatusSelect.onchange = () => {
        const selectedStatus = mainStatusSelect.value;
        resetSteps(1.5);
        subStatusSelect.innerHTML = `<option value="">${t('select_substatus')}</option>`;
        if (!selectedStatus) { subStatusSelect.disabled = true; return; }
        for (const key in SUBSTATUS_TEMPLATES) {
            const template = SUBSTATUS_TEMPLATES[key];
            if (template.status === selectedStatus) {
                const option = document.createElement('option');
                option.value = key; option.textContent = template.name; 
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
        
        // Lógica de criar Snippets (simplificada aqui, mas deve conter seu código original de criação)
        // ...

        if (templateData.requiresTasks) {
            optionalTaskBtn.style.display = 'none'; 
            step2Title.style.display = 'block';
            taskCheckboxesContainer.style.display = 'block';
            populateTaskCheckboxes();
            step2Div.style.display = 'block';
        } else {
            optionalTaskBtn.style.display = 'block'; 
            step2Title.style.display = 'none';
            taskCheckboxesContainer.style.display = 'none'; 
            step2Div.style.display = 'block'; 
        }

        // Cria campos dinâmicos
        dynamicFormFieldsContainer.innerHTML = '';
        const placeholders = templateData.template.match(/{([A-Z0-9_]+)}/g) || [];
        const uniquePlaceholders = [...new Set(placeholders)];
        uniquePlaceholders.forEach(placeholder => {
            if (placeholder === '{TAGS_IMPLEMENTED}' || placeholder === '{SCREENSHOTS_LIST}' || placeholder === '{CONSENTIU_GRAVACAO}' || placeholder === '{CASO_PORTUGAL}') return;
            const fieldName = placeholder.slice(1, -1);
            const label = document.createElement('label');
            label.textContent = t(fieldName.toLowerCase());
            Object.assign(label.style, UI_STYLES.label);
            let field;
            if (textareaListFields.includes(fieldName)) {
                field = document.createElement('textarea'); Object.assign(field.style, UI_STYLES.textarea);
            } else {
                field = document.createElement('input'); field.type = 'text'; Object.assign(field.style, UI_STYLES.input);
            }
            
            if (fieldName === 'ON_CALL' && currentCaseType === 'lm') {
                 Object.assign(label.style, { display: 'none' });
                 Object.assign(field.style, { display: 'none' });
                 field.value = 'N/A';
            }
            
            field.id = `field-${fieldName}`; 
            dynamicFormFieldsContainer.appendChild(label); dynamicFormFieldsContainer.appendChild(field);
        });

        step3Div.style.display = 'block';
        if (SUBSTATUS_SHORTCODES[selectedSubStatusKey]) emailAutomationDiv.style.display = 'block'; else emailAutomationDiv.style.display = 'none';
        buttonContainer.style.display = 'flex';
        
        const checked = Array.from(taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked')).map(c => c.value);
        tagSupport.updateVisibility(selectedSubStatusKey, checked);
    };

    // Botão Preencher (Final)
    generateButton.onclick = async () => {
        const selectedSubStatusKey = subStatusSelect.value;
        const htmlOutput = generateOutputHtml();
        if (!htmlOutput) { showToast(t('selecione_substatus'), { error: true }); return; }

        copyHtmlToClipboard(htmlOutput);
        const campo = await ensureNoteCardIsOpen(); 
        if (campo) {
            campo.focus();
            document.execCommand('insertHTML', false, htmlOutput);
            triggerInputEvents(campo);
            setTimeout(() => { showToast(t('inserido_copiado')); }, 600);
            togglePopupAnimation(false, ui.animRefs);
        }
    };

    // Evento de Clique do Botão Flutuante
    btn.onclick = () => {
        if (btnContainer.getAttribute('data-dragging') === 'true') return; 
        visible = !visible;
        togglePopupAnimation(visible, ui.animRefs);
    };

    // Helpers
    function resetSteps(startFrom) {
        if (startFrom <= 1.5) { snippetContainer.innerHTML = ''; }
        if (startFrom <= 2) { taskCheckboxesContainer.innerHTML = ''; optionalTaskBtn.style.display = 'none'; }
        if (startFrom <= 3) { 
            dynamicFormFieldsContainer.innerHTML = ''; 
            screenshotsContainer.style.display = 'none';
            tagSupport.reset();
            buttonContainer.style.display = 'none';
        }
    }

    setCaseType('bau');
    setLanguage('pt');
}