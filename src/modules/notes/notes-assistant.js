// src/modules/notes/notes-assistant.js

import { 
    showToast
} from '../shared/utils.js'; 

import {
    TASKS_DB, SUBSTATUS_TEMPLATES, SUBSTATUS_SHORTCODES, 
    textareaListFields, textareaParagraphFields, scenarioSnippets, translations
} from './notes-data.js';

import { runEmailAutomation } from '../email/email-automation.js'; 
import { togglePopupAnimation } from '../shared/animations.js';
import { copyHtmlToClipboard, ensureNoteCardIsOpen, triggerInputEvents } from './notes-bridge.js';
import { createTagSupportModule } from './tag-support.js'; 

// IMPORTA A NOVA UI FACTORY E ESTILOS
import { buildNotesUI, UI_STYLES } from './notes-ui.js';
import * as NoteStyles from './notes-styles.js'; // Para acesso aos estilos específicos (checkboxes, stepper)

export function initCaseNotesAssistant() {
    const CURRENT_VERSION = "v3.5.5"; 
    
    // --- ESTADO GLOBAL ---
    let currentCaseType = 'bau';
    let currentLang = 'pt'; 
    let isPortugalCase = false;
    let visible = false;

    // --- 1. INICIALIZAÇÃO DE MÓDULOS AUXILIARES ---
    const tagSupport = createTagSupportModule(); // Cria o módulo de Tag Support

    // --- 2. CONSTRUÇÃO DA UI (Via Factory) ---
    // Passamos a versão e o callback de fechar
    const ui = buildNotesUI(CURRENT_VERSION, () => {
        visible = false;
        togglePopupAnimation(false, ui.animRefs);
    });

    // --- 3. DESEMPACOTAMENTO (Mapeia a UI para as variáveis que a lógica usa) ---
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
        tagSupportSlot // O local reservado para o Tag Support
    } = ui.containers;

    const { copy: copyButton, generate: generateButton } = ui.buttons;
    
    const { 
        portugalSim: portugalRadioSim, portugalNao: portugalRadioNao, 
        consentSim: consentRadioSim, consentNao: consentRadioNao 
    } = ui.radios;
    
    const { typeBAU, typeLM, langPT, langES } = ui.toggleDivs;

    // Variáveis usadas no resetSteps
    const {
        snippets: stepSnippetsDiv,
        tasks: step2Div,
        forms: step3Div,
        email: emailAutomationDiv,
        buttons: buttonContainer,
        optionalTaskBtn: optionalTaskBtn,
        step2Title: step2Title
    } = ui.steps;
    
    // --- 4. INJEÇÃO DE MÓDULOS EXTERNOS ---
    // Injeta o Tag Support no slot criado pela UI
    if (tagSupportSlot) {
        tagSupportSlot.appendChild(tagSupport.element);
    }

    // =========================================================================
    // 5. LÓGICA FUNCIONAL
    // =========================================================================

    function setCaseType(type) {
        currentCaseType = type; 
        // Atualiza visual dos botões de tipo (Simples troca de cor baseada no estilo original)
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
        
        dynamicFormFieldsContainer.querySelectorAll('label').forEach(label => {
            const fieldName = label.nextElementSibling.id.replace('field-', '');
            const translatedLabel = t(fieldName.toLowerCase());
            if (translatedLabel !== fieldName.toLowerCase()) label.textContent = translatedLabel;
            else label.textContent = fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ':';
        });
        optionalTaskBtn.textContent = "+ " + (currentLang === 'pt' ? "Gostaria de selecionar uma task?" : "Quisiera seleccionar una tarea?");
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
    
    portugalRadioSim.onchange = () => setPortugalCase(true);
    portugalRadioNao.onchange = () => setPortugalCase(false);

    // --- LÓGICA DE TASKS ---

    function populateTaskCheckboxes() {
        taskCheckboxesContainer.innerHTML = '';
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

            const updateState = () => {
                 renderScreenshotInputs();
                 // Atualiza o módulo de Tag Support
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

    optionalTaskBtn.onclick = () => {
        optionalTaskBtn.style.display = 'none'; 
        step2Title.style.display = 'block';     
        taskCheckboxesContainer.style.display = 'block'; 
        populateTaskCheckboxes(); 
    };

    function renderScreenshotInputs() {
        // Usa o estilo do UI_STYLES
        const localStyleInput = UI_STYLES.input || { width: "100%" };

        screenshotsListDiv.innerHTML = ''; 
        const selectedCheckboxes = taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked');
        const selectedSubStatusKey = subStatusSelect.value;
        const isEducation = selectedSubStatusKey && selectedSubStatusKey.includes('Education');
        const screenshotType = isEducation ? 'education' : 'implementation';
        
        let hasScreenshots = false;
        selectedCheckboxes.forEach(checkbox => {
            const taskKey = checkbox.value;
            const task = TASKS_DB[taskKey];
            const label = checkbox.closest('label');
            const countSpan = label.querySelector('.stepper-count');
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

                    const nameWrapper = document.createElement('div');
                    Object.assign(nameWrapper.style, { display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '8px' });
                    const editIcon = document.createElement('span'); editIcon.textContent = "✎"; Object.assign(editIcon.style, { fontSize: '14px', color: '#9aa0a6', cursor: 'text' });
                    const nameInput = document.createElement('input'); nameInput.type = 'text'; const suffix = count > 1 ? ` #${i}` : ''; nameInput.value = `${task.name}${suffix}`; nameInput.id = `name-${taskKey}-${i}`; 
                    Object.assign(nameInput.style, localStyleInput, { fontWeight: '600', color: '#1a73e8', marginBottom: '0', border: 'none', borderBottom: '1px dashed #ccc', borderRadius: '0', padding: '4px 0', background: 'transparent', width: '100%' });
                    nameInput.onfocus = () => { nameInput.style.borderBottom = '2px solid #1a73e8'; editIcon.style.color = '#1a73e8'; };
                    nameInput.onblur = () => { nameInput.style.borderBottom = '1px dashed #ccc'; editIcon.style.color = '#9aa0a6'; };
                    nameInput.title = "Renomear esta ação"; editIcon.onclick = () => nameInput.focus();
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
        screenshotsContainer.style.display = hasScreenshots ? 'block' : 'none';
    }

    function enableAutoBullet(textarea) {
        if(textarea.value.trim() === '' || textarea.value.trim() === '•') { textarea.value = '• '; }
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

    function updateFieldsFromScenarios() {
        const activeScenarioInputs = snippetContainer.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
        const targetFieldsContent = {};
        const activeLinkedTasks = new Set();

        activeScenarioInputs.forEach(input => {
            const scenarioId = input.id;
            const snippets = scenarioSnippets[scenarioId];
            if (snippets) {
                for (const fieldId in snippets) {
                    if (fieldId !== 'linkedTask' && fieldId !== 'type') {
                        if (!targetFieldsContent[fieldId]) targetFieldsContent[fieldId] = [];
                        if (!targetFieldsContent[fieldId].includes(snippets[fieldId])) targetFieldsContent[fieldId].push(snippets[fieldId]);
                    } else if (fieldId === 'linkedTask') {
                         activeLinkedTasks.add(snippets.linkedTask);
                    }
                }
            }
        });

        const allPossibleTargetFields = new Set();
        Object.values(scenarioSnippets).forEach(snippets => { Object.keys(snippets).forEach(key => { if(key !== 'linkedTask' && key !== 'type') allPossibleTargetFields.add(key); }); });

        allPossibleTargetFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                const combinedTextArray = targetFieldsContent[fieldId] || [];
                let finalValue = "";
                if (textareaListFields.includes(fieldId.replace('field-', ''))) {
                    finalValue = combinedTextArray.map(line => line.startsWith('• ') ? line : '• ' + line).join('\n');
                    if (finalValue === '') { finalValue = '• '; } else if (!finalValue.endsWith('\n• ')) { finalValue += '\n• '; }
                } else { finalValue = combinedTextArray.join('\n\n'); }
                
                if (finalValue.trim() !== '•' && finalValue.trim() !== '') field.value = finalValue;
                else if (textareaListFields.includes(fieldId.replace('field-', ''))) field.value = '• ';
                else field.value = '';

                if (field.tagName === 'TEXTAREA' && textareaListFields.includes(fieldId.replace('field-', ''))) enableAutoBullet(field);
             }
        });

        const taskCheckboxes = taskCheckboxesContainer.querySelectorAll('.task-checkbox');
        taskCheckboxes.forEach(taskCheckbox => {
            if (activeLinkedTasks.has(taskCheckbox.value)) {
                taskCheckbox.checked = true;
                taskCheckbox.dispatchEvent(new Event('change')); 
            }
        });
    }

    mainStatusSelect.onchange = () => {
        const selectedStatus = mainStatusSelect.value;
        resetSteps(1.5);
        subStatusSelect.innerHTML = `<option value="">${t('select_substatus')}</option>`;
        if (!selectedStatus) { subStatusSelect.disabled = true; return; }
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
            const label = document.createElement('label'); Object.assign(label.style, NoteStyles.styleCheckboxLabel);
            label.onmouseover = () => label.style.backgroundColor = '#e8eaed'; label.onmouseout = () => label.style.backgroundColor = '#f8f9fa';
            const input = document.createElement('input'); input.type = type; input.id = scenario.id; Object.assign(input.style, NoteStyles.styleCheckboxInput);
            label.appendChild(input); label.appendChild(document.createTextNode(` ${scenario.text}`)); container.appendChild(label); return input;
        };
        
        let scenarios = []; let inputType = 'radio'; 
        if (selectedSubStatusKey === 'NI_Awaiting_Inputs') {
            scenarios = [ { id: 'quickfill-ni-inicio-manual', text: 'Início 2/6 (Manual)'}, { id: 'quickfill-ni-cms-access', text: 'Início 2/6 (ADV sem acesso ao CMS)' }, { id: 'quickfill-ni-followup-bau', text: 'Follow-up 2/6 (BAU)' }, { id: 'quickfill-ni-followup-lm', text: 'Follow-up 2/6 (LM)' } ];
        } else if (selectedSubStatusKey.startsWith('SO_')) {
            inputType = 'checkbox'; scenarios = [ { id: 'quickfill-gtm-install', text: 'Instalação do GTM' }, { id: 'quickfill-whatsapp', text: 'Conversão de WhatsApp' }, { id: 'quickfill-form', text: 'Conversão de Formulário (Padrão)' }, { id: 'quickfill-ecw4-close', text: 'Fechamento ECW4 (Pós 7 dias)' } ];
        } else if (selectedSubStatusKey.startsWith('AS_')) {
            inputType = 'checkbox'; const reasonTitle = document.createElement('label'); reasonTitle.textContent = t('cenarios_comuns'); Object.assign(reasonTitle.style, NoteStyles.styleLabel); snippetContainer.appendChild(reasonTitle);
            scenarios = [ { id: 'quickfill-as-no-show', text: 'Anunciante não compareceu (respondeu e-mail)' }, { id: 'quickfill-as-insufficient-time', text: 'Tempo insuficiente' }, { id: 'quickfill-as-no-access', text: 'Anunciante sem acessos necessários' } ];
        } else if (selectedSubStatusKey.startsWith('IN_')) {
             scenarios = [ { id: 'quickfill-in-nrp-bau', text: 'NRP (BAU - 3 tentativas)' }, { id: 'quickfill-in-nrp-lm', text: 'NRP (LM - Sem tentativas)' }, { id: 'quickfill-in-no-show-bau', text: 'No-Show (BAU - 3 tentativas)' }, { id: 'quickfill-in-2-6-final', text: 'Finalização 2/6 (Sem Resposta)' }, { id: 'quickfill-in-manual', text: 'Outro (Manual)' } ];
        }

        const filteredScenarios = scenarios.filter(s => { const sd = scenarioSnippets[s.id]; return !sd.type || sd.type === 'all' || sd.type === currentCaseType; });
        filteredScenarios.forEach((scenario, index) => { const input = addSnippetInput(scenario, inputType, snippetContainer); if (inputType === 'radio') { input.name = "scenario-radio-group"; if (index === 0) input.checked = true; } });
        snippetAdded = filteredScenarios.length > 0;

        if (snippetAdded) stepSnippetsDiv.style.display = 'block';

        populateTaskCheckboxes();

        if (templateData.requiresTasks) {
            optionalTaskBtn.style.display = 'none'; 
            step2Title.style.display = 'block';
            taskCheckboxesContainer.style.display = 'block';
            step2Div.style.display = 'block';
        } else {
            optionalTaskBtn.style.display = 'block'; 
            step2Title.style.display = 'none';
            taskCheckboxesContainer.style.display = 'none'; 
            step2Div.style.display = 'block'; 
        }

        dynamicFormFieldsContainer.innerHTML = '';
        const placeholders = templateData.template.match(/{([A-Z0-9_]+)}/g) || [];
        const uniquePlaceholders = [...new Set(placeholders)];
        uniquePlaceholders.forEach(placeholder => {
            if (placeholder === '{TAGS_IMPLEMENTED}' || placeholder === '{SCREENSHOTS_LIST}' || placeholder === '{CONSENTIU_GRAVACAO}' || placeholder === '{CASO_PORTUGAL}') return;
            const fieldName = placeholder.slice(1, -1);
            const label = document.createElement('label');
            const translatedLabel = t(fieldName.toLowerCase());
            label.textContent = (translatedLabel !== fieldName.toLowerCase()) ? translatedLabel : (fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ':');
            Object.assign(label.style, NoteStyles.styleLabel);
            let field;
            if (textareaListFields.includes(fieldName)) {
                field = document.createElement('textarea'); Object.assign(field.style, NoteStyles.styleTextarea); field.classList.add('bullet-textarea'); enableAutoBullet(field);
            } else if (textareaParagraphFields.includes(fieldName)) {
                field = document.createElement('textarea'); Object.assign(field.style, NoteStyles.styleTextarea);
            } else {
                field = document.createElement('input'); field.type = 'text'; Object.assign(field.style, NoteStyles.styleInput);
                 if (fieldName === 'REASON_COMMENTS' && (selectedSubStatusKey === 'NI_Awaiting_Inputs' || selectedSubStatusKey.startsWith('IN_'))) { Object.assign(label.style, { display: 'none' }); Object.assign(field.style, { display: 'none' }); }
            }
            
            // LÓGICA DE VISIBILIDADE DO ON_CALL
            if (fieldName === 'ON_CALL' && currentCaseType === 'lm') {
                Object.assign(label.style, { display: 'none' });
                Object.assign(field.style, { display: 'none' });
                field.value = 'N/A';
            }

            field.id = `field-${fieldName}`; dynamicFormFieldsContainer.appendChild(label); dynamicFormFieldsContainer.appendChild(field);
        });

        const snippetInputs = snippetContainer.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        if (snippetInputs.length > 0) {
            snippetInputs.forEach(input => { input.removeEventListener('change', updateFieldsFromScenarios); input.addEventListener('change', updateFieldsFromScenarios); });
             updateFieldsFromScenarios();
        }

        step3Div.style.display = 'block';
        if (SUBSTATUS_SHORTCODES[selectedSubStatusKey]) emailAutomationDiv.style.display = 'block'; else emailAutomationDiv.style.display = 'none';
        buttonContainer.style.display = 'flex';
        
        // Update Tag Support
        const checked = Array.from(taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked')).map(c => c.value);
        tagSupport.updateVisibility(subStatusSelect.value, checked);
    };

    function generateOutputHtml() {
        const selectedSubStatusKey = subStatusSelect.value;
        if (!selectedSubStatusKey) return null;
        const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
        let outputText = templateData.template.replace(/\n/g, "<br>");
        const ulStyle = "style=\"margin-bottom: 12px; padding-left: 30px;\"";

        if (templateData.requiresTasks || taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked').length > 0) {
            const selectedCheckboxes = taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked');
            let tagNames = [];
            let screenshotsText = '';
            const isEducation = selectedSubStatusKey.includes('Education');
            const screenshotType = isEducation ? 'education' : 'implementation';
            
            selectedCheckboxes.forEach(checkbox => {
                const taskKey = checkbox.value;
                const task = TASKS_DB[taskKey];
                const label = checkbox.closest('label');
                const countSpan = label.querySelector('.stepper-count');
                const count = parseInt(countSpan.textContent);

                if (count > 1) tagNames.push(`${task.name} (x${count})`);
                else tagNames.push(task.name);

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
            const placeholderStr = `{${fieldName}}`;
            const placeholderRegex = new RegExp(placeholderStr, 'g');
            let value = input.value;
            if (fieldName === 'REASON_COMMENTS' && (selectedSubStatusKey.startsWith('NI_') || selectedSubStatusKey.startsWith('IN_'))) {
                const checkedRadio = snippetContainer.querySelector('input[type="radio"]:checked');
                if (checkedRadio && scenarioSnippets[checkedRadio.id] && scenarioSnippets[checkedRadio.id]['field-REASON_COMMENTS']) {
                     value = scenarioSnippets[checkedRadio.id]['field-REASON_COMMENTS'];
                }
            }

            if (textareaListFields.includes(fieldName) && value.trim() !== '') {
                const lines = value.split('\n').map(line => line.trim()).filter(line => line !== '' && line !== '•').map(line => line.startsWith('• ') ? line.substring(2).trim() : line.trim()).filter(line => line !== '').map(line => `<li>${line}</li>`).join('');
                value = lines ? `<ul ${ulStyle}>${lines}</ul>` : '';
            } else if (textareaParagraphFields.includes(fieldName) && value.trim() !== '') {
                value = value.split('\n').filter(line => line.trim() !== '').map(line => `<p style="margin: 0 0 8px 0;">${line}</p>`).join('');
            } else if (input.tagName === 'TEXTAREA' && !textareaListFields.includes(fieldName) && !textareaParagraphFields.includes(fieldName)) {
                 value = value.replace(/\n/g, '<br>');
            } 
            
            if (input.tagName === 'TEXTAREA' && value.trim() === '') { value = ''; }
            else if (fieldName === 'ON_CALL' && value.trim() === '') { value = 'N/A'; }
            else if (fieldName === 'GTM_GA4_VERIFICADO' && value.trim() === '') { value = 'N/A'; }
            
            // === LIMPEZA INTELIGENTE ===
            const textContent = value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
            const isEffectivelyEmpty = textContent === '' || textContent === '•' || textContent.toLowerCase() === 'n/a' || textContent.toLowerCase() === 'na';

            if (isEffectivelyEmpty) {
                const lineRemoverRegex = new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${fieldName}\\}(?:<br>\\s*)?`, 'gi');
                if (lineRemoverRegex.test(outputText)) {
                    outputText = outputText.replace(lineRemoverRegex, '');
                } else {
                    outputText = outputText.replace(placeholderRegex, '');
                }
            } else {
                const safeValue = (value || '').replace(/\$/g, '$$$$');
                outputText = outputText.replace(placeholderRegex, safeValue);
            }
        });
        
        outputText = outputText.replace(/{([A-Z0-9_]+)}/g, ''); 
        outputText = outputText.replace(/(<br>){3,}/g, '<br><br>');
        
        // Output do Tag Support
        outputText += tagSupport.getOutput();

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

    generateButton.onclick = async () => {
        const selectedSubStatusKey = subStatusSelect.value;
        const htmlOutput = generateOutputHtml();

        if (!htmlOutput) {
            showToast(t('selecione_substatus'), { error: true });
            return;
        }

        copyHtmlToClipboard(htmlOutput);
        const campo = await ensureNoteCardIsOpen(); 

        if (campo) {
            try {
                campo.focus();
                
                const isEmpty = campo.innerHTML.trim() === '<p><br></p>' || campo.innerHTML.trim() === '<br>' || campo.innerText.trim() === '';

                if (isEmpty) {
                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNodeContents(campo);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    document.execCommand('delete', false, null);
                } else {
                    if (!campo.innerHTML.endsWith('<br><br>')) {
                         const selection = window.getSelection();
                         const range = document.createRange();
                         range.selectNodeContents(campo);
                         range.collapse(false);
                         selection.removeAllRanges();
                         selection.addRange(range);
                         document.execCommand('insertHTML', false, '<br><br>');
                    }
                }

                const success = document.execCommand('insertHTML', false, htmlOutput);
                if (!success) {
                    campo.innerHTML += htmlOutput;
                }

                triggerInputEvents(campo);
                setTimeout(() => { showToast(t('inserido_copiado')); }, 600);

                const emailEnabled = typeof emailCheckbox !== 'undefined' && emailCheckbox ? emailCheckbox.checked : true;
                if (selectedSubStatusKey && SUBSTATUS_SHORTCODES[selectedSubStatusKey] && emailEnabled) {
                    const emailCode = SUBSTATUS_SHORTCODES[selectedSubStatusKey];
                    setTimeout(() => { 
                        runEmailAutomation(emailCode); 
                    }, 1000);
                }

                togglePopup(false);
                resetSteps(1.5);
                mainStatusSelect.value = "";
                subStatusSelect.innerHTML = `<option value="">${t('select_substatus')}</option>`;
                subStatusSelect.disabled = true;

            } catch (err) {
                console.error("Erro ao inserir texto:", err);
                showToast("Erro ao inserir. Texto copiado.", { error: true });
            }
        } else {
            showToast(t('campo_nao_encontrado'), { error: true, duration: 4000 });
        }
    };

    function resetSteps(startFrom = 1.5) {
        if (startFrom <= 1.5) {
            stepSnippetsDiv.style.display = 'none';
            snippetContainer.innerHTML = '';
        }
        if (startFrom <= 2) {
            step2Div.style.display = 'none';
            taskCheckboxesContainer.innerHTML = '';
            optionalTaskBtn.style.display = 'none';
        }
        if (startFrom <= 3) {
            step3Div.style.display = 'none';
            dynamicFormFieldsContainer.innerHTML = '';
            if (typeof screenshotsContainer !== 'undefined') {
                screenshotsContainer.style.display = 'none';
                screenshotsListDiv.innerHTML = ''; 
            }
            tagSupport.reset(); // Reset módulo
            buttonContainer.style.display = 'none';
            emailAutomationDiv.style.display = 'none'; 
        }
    }
    
    function togglePopup(show) {
        visible = show;
        togglePopupAnimation(show, ui.animRefs);
        // Reset opcional
        if (!show) {
            setTimeout(() => { }, 300);
        }
    }

    // Eventos dos Botões do UI
    ui.toggleDivs.typeBAU.onclick = () => setCaseType('bau');
    ui.toggleDivs.typeLM.onclick = () => setCaseType('lm');
    ui.toggleDivs.langPT.onclick = () => setLanguage('pt');
    ui.toggleDivs.langES.onclick = () => setLanguage('es');

    ui.btn.onclick = () => {
        if (ui.btnContainer.getAttribute('data-dragging') === 'true') return; 
        visible = !visible;
        togglePopupAnimation(visible, ui.animRefs);
    };
    
    setLanguage(currentLang);
    setCaseType('bau');
}