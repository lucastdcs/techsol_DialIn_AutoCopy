// src/modules/notes/notes-assistant.js

import { 
    showToast, makeDraggable, styleSelect, styleLabel, stylePopup, 
    stylePopupHeader, stylePopupTitle, stylePopupCloseBtn, 
    styleFloatingButton, stylePopupVersion, styleCredit, 
    styleExpandButton, typeBtnStyle, getRandomGoogleStyle
} from '../shared/utils.js'; 

import {
    TASKS_DB, SUBSTATUS_TEMPLATES, SUBSTATUS_SHORTCODES, 
    textareaListFields, textareaParagraphFields, scenarioSnippets, translations
} from './notes-data.js';

import { runEmailAutomation } from '../email/email-automation.js'; 

// NOVOS IMPORTS
import * as NoteStyles from './notes-styles.js';
import { copyHtmlToClipboard, getVisibleEditor, triggerInputEvents } from './notes-bridge.js';

export function initCaseNotesAssistant() {
    const CURRENT_VERSION = "v3.5.1"; // Versão Corrigida e Final
    
    let currentCaseType = 'bau';
    let currentLang = 'pt'; 
    let isPortugalCase = false;

    // --- HELPERS LOCAIS ---
    const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function simularCliqueReal(elemento) {
        if (!elemento) return;
        const opts = { bubbles: true, cancelable: true, view: window };
        ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(evt => 
            elemento.dispatchEvent(new MouseEvent(evt, opts))
        );
    }

    // --- LÓGICA DE ABERTURA AUTOMÁTICA (SNIPER) ---
    async function ensureNoteCardIsOpen() {
        // 1. Verifica se já está aberta
        let editor = getVisibleEditor();
        if (editor) return editor;

        console.log("Nota fechada. Tentando abrir...");

        // 2. Busca o botão 'description' (Nota)
        const icones = Array.from(document.querySelectorAll('i.material-icons-extended'));
        const iconeNota = icones.find(el => el.innerText.trim() === 'description');

        if (iconeNota) {
            // Pega o botão pai
            const btnAlvo = iconeNota.closest('material-fab') || iconeNota.closest('material-button');
            
            if (btnAlvo) {
                console.log("🎯 Botão encontrado. Forçando visibilidade e clicando...");
                // Hack de Visibilidade
                btnAlvo.classList.remove('hidden'); 
                btnAlvo.style.display = 'block';
                btnAlvo.style.visibility = 'visible';
                btnAlvo.style.pointerEvents = 'auto'; 

                simularCliqueReal(btnAlvo);
            } else {
                simularCliqueReal(iconeNota);
            }
        } else {
            // Fallback: Menu (+)
            console.warn("⚠️ Ícone 'description' não achado. Tentando via Menu (+)...");
            const speedDial = document.querySelector('material-fab-speed-dial');
            if (speedDial) {
                const trigger = speedDial.querySelector('.trigger');
                if(trigger) {
                    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                    simularCliqueReal(trigger);
                } else {
                    speedDial.click();
                }
                await esperar(800);
                const iconesAgora = Array.from(document.querySelectorAll('i.material-icons-extended'));
                const btnAgora = iconesAgora.find(el => el.innerText.trim() === 'description');
                if(btnAgora) simularCliqueReal(btnAgora);
            }
        }

        // 3. Aguarda o editor aparecer (Polling)
        let tentativas = 0;
        while (!editor && tentativas < 20) {
            await esperar(300);
            editor = getVisibleEditor();
            tentativas++;
        }
        
        return editor;
    }

    // --- CONSTRUÇÃO DA UI ---

    const btnContainer = document.createElement("div"); 
    Object.assign(btnContainer.style, { position: "fixed", top: "15%", right: "24px", zIndex: "9999", display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px" });
    const btn = document.createElement("button");
    btn.id = "notes-floating-btn";
    btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
    Object.assign(btn.style, NoteStyles.styleFloatingButtonLocal || { width: "48px", height: "48px", borderRadius: "50%", background: "#1a73e8", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(26, 115, 232, 0.4)" });
    
    const tooltip = document.createElement("span"); tooltip.textContent = "Case Note";
    Object.assign(tooltip.style, { background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", opacity: "0", pointerEvents: "none", transition: "opacity 0.2s", whiteSpace: "nowrap", fontWeight: "500" });
    btn.onmouseenter = () => { btn.style.transform = "scale(1.1)"; tooltip.style.opacity = "1"; };
    btn.onmouseleave = () => { btn.style.transform = "scale(1)"; tooltip.style.opacity = "0"; };
    btnContainer.appendChild(btn); btnContainer.appendChild(tooltip); document.body.appendChild(btnContainer); makeDraggable(btnContainer); 

    const popup = document.createElement("div"); popup.id = "autofill-popup"; Object.assign(popup.style, stylePopup, { right: "24px" });
    const header = document.createElement("div"); Object.assign(header.style, stylePopupHeader); makeDraggable(popup, header); 
    const headerLeft = document.createElement("div"); Object.assign(headerLeft.style, { display: 'flex', alignItems: 'center', gap: '10px' });
    const logo = document.createElement("img"); logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"; Object.assign(logo.style, { width: "24px", height: "24px" });
    const titleContainer = document.createElement("div"); Object.assign(titleContainer.style, { display: 'flex', flexDirection: 'column' });
    const title = document.createElement("div"); title.textContent = "Case Notes Assistant"; Object.assign(title.style, stylePopupTitle);
    const versionDisplay = document.createElement("div"); versionDisplay.textContent = CURRENT_VERSION; Object.assign(versionDisplay.style, stylePopupVersion);
    titleContainer.appendChild(title); titleContainer.appendChild(versionDisplay); headerLeft.appendChild(logo); headerLeft.appendChild(titleContainer);
    const headerRight = document.createElement("div"); Object.assign(headerRight.style, { display: 'flex', alignItems: 'center' });
    const expandBtn = document.createElement("div"); expandBtn.textContent = "↔"; expandBtn.classList.add('no-drag'); Object.assign(expandBtn.style, styleExpandButton);
    const closeBtn = document.createElement("div"); closeBtn.textContent = "✕"; closeBtn.classList.add('no-drag'); Object.assign(closeBtn.style, stylePopupCloseBtn);
    closeBtn.onclick = () => togglePopup(false);
    headerRight.appendChild(expandBtn); headerRight.appendChild(closeBtn); popup.appendChild(header); header.appendChild(headerLeft); header.appendChild(headerRight);
    let isExpanded = false; const initialWidth = parseInt(stylePopup.width, 10); const expandedWidth = initialWidth * 2;
    expandBtn.onclick = () => { isExpanded = !isExpanded; popup.style.width = isExpanded ? `${expandedWidth}px` : `${initialWidth}px`; };

    const popupContent = document.createElement("div"); Object.assign(popupContent.style, { padding: "0 16px 16px 16px", overflowY: "auto", flexGrow: "1" }); popup.appendChild(popupContent);
    const credit = document.createElement("div"); credit.textContent = "created by lucaste@"; Object.assign(credit.style, styleCredit); popup.appendChild(credit);

    // UI Elements
    const langToggleDiv = document.createElement("div"); langToggleDiv.id = "step-lang-type"; Object.assign(langToggleDiv.style, { display: 'flex', flexDirection: 'column', marginBottom: '16px' });
    const langLabel = document.createElement("label"); Object.assign(langLabel.style, NoteStyles.styleLabel || styleLabel); langToggleDiv.appendChild(langLabel);
    const langContainer = document.createElement("div"); Object.assign(langContainer.style, { display: 'flex', borderRadius: '8px', border: '1px solid #dadce0', overflow: 'hidden' });
    const langPT = document.createElement("div"); langPT.textContent = "Português"; langPT.classList.add('no-drag'); Object.assign(langPT.style, typeBtnStyle);
    const langES = document.createElement("div"); langES.textContent = "Español"; langES.classList.add('no-drag'); Object.assign(langES.style, typeBtnStyle);
    langPT.onclick = () => setLanguage('pt'); langES.onclick = () => setLanguage('es');
    langContainer.appendChild(langPT); langContainer.appendChild(langES); langToggleDiv.appendChild(langContainer); popupContent.appendChild(langToggleDiv);

    const step0Div = document.createElement("div"); step0Div.id = "step-0-case-type"; 
    const typeLabel = document.createElement("label"); Object.assign(typeLabel.style, NoteStyles.styleLabel || styleLabel); step0Div.appendChild(typeLabel);
    const typeContainer = document.createElement("div"); Object.assign(typeContainer.style, { display: 'flex', borderRadius: '8px', border: '1px solid #dadce0', overflow: 'hidden', marginBottom: '16px' });
    const typeBAU = document.createElement("div"); typeBAU.textContent = "BAU"; typeBAU.classList.add('no-drag'); Object.assign(typeBAU.style, typeBtnStyle);
    const typeLM = document.createElement("div"); typeLM.textContent = "LM"; typeLM.classList.add('no-drag'); Object.assign(typeLM.style, typeBtnStyle);
    typeBAU.onclick = () => setCaseType('bau'); typeLM.onclick = () => setCaseType('lm');
    typeContainer.appendChild(typeBAU); typeContainer.appendChild(typeLM); step0Div.appendChild(typeContainer); popupContent.appendChild(step0Div); setCaseType('bau');

    const step1Div = document.createElement("div"); step1Div.id = "step-1-selection";
    const mainStatusLabel = document.createElement("label"); Object.assign(mainStatusLabel.style, NoteStyles.styleLabel || styleLabel);
    const mainStatusSelect = document.createElement("select"); mainStatusSelect.id = "main-status"; Object.assign(mainStatusSelect.style, styleSelect);
    mainStatusSelect.innerHTML = `<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>`;
    const subStatusLabel = document.createElement("label"); Object.assign(subStatusLabel.style, NoteStyles.styleLabel || styleLabel);
    const subStatusSelect = document.createElement("select"); subStatusSelect.id = "sub-status"; Object.assign(subStatusSelect.style, styleSelect); subStatusSelect.disabled = true;
    step1Div.appendChild(mainStatusLabel); step1Div.appendChild(mainStatusSelect); step1Div.appendChild(subStatusLabel); step1Div.appendChild(subStatusSelect); popupContent.appendChild(step1Div);

    const stepPortugalDiv = document.createElement("div"); stepPortugalDiv.id = "step-1-1-portugal"; Object.assign(stepPortugalDiv.style, { borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px", display: 'none' });
    const portugalLabel = document.createElement("label"); Object.assign(portugalLabel.style, NoteStyles.styleLabel || styleLabel); stepPortugalDiv.appendChild(portugalLabel);
    const portugalRadioGroup = document.createElement('div'); Object.assign(portugalRadioGroup.style, NoteStyles.styleRadioContainer);
    const divPtSim = document.createElement('div'); Object.assign(divPtSim.style, { display: 'flex', alignItems: 'center' });
    const portugalRadioSim = document.createElement("input"); portugalRadioSim.type = 'radio'; portugalRadioSim.name = 'portugal-group'; portugalRadioSim.value = 'sim'; Object.assign(portugalRadioSim.style, NoteStyles.styleCheckboxInput);
    const portugalLabelSim = document.createElement("label"); portugalLabelSim.htmlFor = 'portugal-sim'; Object.assign(portugalLabelSim.style, { cursor: 'pointer' });
    divPtSim.appendChild(portugalRadioSim); divPtSim.appendChild(portugalLabelSim);
    const divPtNao = document.createElement('div'); Object.assign(divPtNao.style, { display: 'flex', alignItems: 'center' });
    const portugalRadioNao = document.createElement("input"); portugalRadioNao.type = 'radio'; portugalRadioNao.name = 'portugal-group'; portugalRadioNao.value = 'nao'; portugalRadioNao.checked = true; Object.assign(portugalRadioNao.style, NoteStyles.styleCheckboxInput);
    const portugalLabelNao = document.createElement("label"); portugalLabelNao.htmlFor = 'portugal-nao'; Object.assign(portugalLabelNao.style, { cursor: 'pointer' });
    divPtNao.appendChild(portugalRadioNao); divPtNao.appendChild(portugalLabelNao);
    portugalRadioGroup.appendChild(divPtSim); portugalRadioGroup.appendChild(divPtNao); stepPortugalDiv.appendChild(portugalRadioGroup); popupContent.appendChild(stepPortugalDiv);
    function setPortugalCase(isPT) { isPortugalCase = isPT; if (isPT) { stepConsentDiv.style.display = 'block'; } else { stepConsentDiv.style.display = 'none'; } }
    portugalRadioSim.onchange = () => setPortugalCase(true); portugalRadioNao.onchange = () => setPortugalCase(false);

    const stepConsentDiv = document.createElement("div"); stepConsentDiv.id = "step-1-2-consent"; Object.assign(stepConsentDiv.style, { borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px", display: 'none' });
    const consentLabel = document.createElement("label"); Object.assign(consentLabel.style, NoteStyles.styleLabel || styleLabel); stepConsentDiv.appendChild(consentLabel);
    const consentRadioGroup = document.createElement('div'); Object.assign(consentRadioGroup.style, NoteStyles.styleRadioContainer);
    const divCSim = document.createElement('div'); Object.assign(divCSim.style, { display: 'flex', alignItems: 'center' });
    const consentRadioSim = document.createElement("input"); consentRadioSim.type = 'radio'; consentRadioSim.name = 'consent-group'; consentRadioSim.value = 'Sim'; consentRadioSim.checked = true; Object.assign(consentRadioSim.style, NoteStyles.styleCheckboxInput);
    const consentLabelSim = document.createElement("label"); consentLabelSim.htmlFor = 'consent-sim'; Object.assign(consentLabelSim.style, { cursor: 'pointer' });
    divCSim.appendChild(consentRadioSim); divCSim.appendChild(consentLabelSim);
    const divCNao = document.createElement('div'); Object.assign(divCNao.style, { display: 'flex', alignItems: 'center' });
    const consentRadioNao = document.createElement("input"); consentRadioNao.type = 'radio'; consentRadioNao.name = 'consent-group'; consentRadioNao.value = 'Não'; Object.assign(consentRadioNao.style, NoteStyles.styleCheckboxInput);
    const consentLabelNao = document.createElement("label"); consentLabelNao.htmlFor = 'consent-nao'; Object.assign(consentLabelNao.style, { cursor: 'pointer' });
    divCNao.appendChild(consentRadioNao); divCNao.appendChild(consentLabelNao);
    consentRadioGroup.appendChild(divCSim); consentRadioGroup.appendChild(divCNao); stepConsentDiv.appendChild(consentRadioGroup); popupContent.appendChild(stepConsentDiv);

    const stepSnippetsDiv = document.createElement("div"); stepSnippetsDiv.id = "step-1-5-snippets"; Object.assign(stepSnippetsDiv.style, { borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px", display: 'none' });
    const stepSnippetsTitle = document.createElement("h3"); Object.assign(stepSnippetsTitle.style, NoteStyles.styleH3); snippetContainer.id = "snippet-container"; stepSnippetsDiv.appendChild(stepSnippetsTitle); stepSnippetsDiv.appendChild(snippetContainer); popupContent.appendChild(stepSnippetsDiv);

    const step2Div = document.createElement("div"); step2Div.id = "step-2-tasks"; Object.assign(step2Div.style, { borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px", display: 'none' });
    const optionalTaskBtn = document.createElement("button"); optionalTaskBtn.textContent = "+ Gostaria de selecionar uma task?"; Object.assign(optionalTaskBtn.style, NoteStyles.styleOptionalBtn);
    optionalTaskBtn.onmouseover = () => { optionalTaskBtn.style.background = '#e8f0fe'; }; optionalTaskBtn.onmouseout = () => { optionalTaskBtn.style.background = 'white'; };
    const taskCheckboxesContainer = document.createElement("div"); taskCheckboxesContainer.id = "task-checkboxes-container";
    const step2Title = document.createElement("h3"); Object.assign(step2Title.style, NoteStyles.styleH3);
    step2Div.appendChild(optionalTaskBtn); step2Div.appendChild(step2Title); step2Div.appendChild(taskCheckboxesContainer); popupContent.appendChild(step2Div);

    const step3Div = document.createElement("div"); step3Div.id = "step-3-form"; Object.assign(step3Div.style, { borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px", display: 'none' });
    const step3Title = document.createElement("h3"); Object.assign(step3Title.style, NoteStyles.styleH3); step3Div.appendChild(step3Title);
    const dynamicFormFieldsContainer = document.createElement("div"); dynamicFormFieldsContainer.id = "dynamic-form-fields-container"; step3Div.appendChild(dynamicFormFieldsContainer);
    
    // Tag Support
    const tagSupportDiv = document.createElement("div"); tagSupportDiv.id = "tag-support-container"; Object.assign(tagSupportDiv.style, NoteStyles.styleTagSupportContainer || { display: 'none' });
    const tsLabel = document.createElement("label"); tsLabel.textContent = "Utilizou o Tag Support para criar/verificar?"; Object.assign(tsLabel.style, NoteStyles.styleLabel || styleLabel, { marginTop: "0" });
    const tsRadioContainer = document.createElement("div"); Object.assign(tsRadioContainer.style, NoteStyles.styleRadioContainer);
    const tsSim = document.createElement("input"); tsSim.type = "radio"; tsSim.name = "ts_usage"; tsSim.value = "Sim"; Object.assign(tsSim.style, NoteStyles.styleCheckboxInput);
    const tsNao = document.createElement("input"); tsNao.type = "radio"; tsNao.name = "ts_usage"; tsNao.value = "Não"; tsNao.checked = true; Object.assign(tsNao.style, NoteStyles.styleCheckboxInput);
    const lblSim = document.createElement("label"); lblSim.textContent = "Sim"; const lblNao = document.createElement("label"); lblNao.textContent = "Não";
    const divTsSim = document.createElement("div"); Object.assign(divTsSim.style, { display: 'flex', alignItems: 'center' }); divTsSim.appendChild(tsSim); divTsSim.appendChild(lblSim);
    const divTsNao = document.createElement("div"); Object.assign(divTsNao.style, { display: 'flex', alignItems: 'center' }); divTsNao.appendChild(tsNao); divTsNao.appendChild(lblNao);
    tsRadioContainer.appendChild(divTsSim); tsRadioContainer.appendChild(divTsNao);
    const tsReasonContainer = document.createElement("div"); tsReasonContainer.style.display = "block"; 
    const tsReasonLabel = document.createElement("label"); tsReasonLabel.textContent = "Qual foi o Motivo?"; Object.assign(tsReasonLabel.style, NoteStyles.styleLabel || styleLabel, { fontSize: "12px" });
    const tsReasonInput = document.createElement("input"); tsReasonInput.type = "text"; Object.assign(tsReasonInput.style, NoteStyles.styleInput);
    const tsWarning = document.createElement("div"); tsWarning.innerHTML = `⚠️ <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400">Link aqui</a>`; Object.assign(tsWarning.style, NoteStyles.styleWarningText || { color: 'orange' });
    tsReasonContainer.appendChild(tsReasonLabel); tsReasonContainer.appendChild(tsReasonInput); tsReasonContainer.appendChild(tsWarning);
    tagSupportDiv.appendChild(tsLabel); tagSupportDiv.appendChild(tsRadioContainer); tagSupportDiv.appendChild(tsReasonContainer);
    tsSim.onchange = () => { tsReasonContainer.style.display = "none"; }; tsNao.onchange = () => { tsReasonContainer.style.display = "block"; };
    step3Div.appendChild(tagSupportDiv);

    const screenshotsContainer = document.createElement("div"); screenshotsContainer.id = "screenshots-input-container"; Object.assign(screenshotsContainer.style, { marginTop: "16px", borderTop: "1px dashed #ccc", paddingTop: "12px", display: "none" });
    const screenshotsTitle = document.createElement("h4"); screenshotsTitle.textContent = "Evidências / Screenshots"; Object.assign(screenshotsTitle.style, NoteStyles.styleH3);
    screenshotsContainer.appendChild(screenshotsTitle);
    const screenshotsListDiv = document.createElement("div"); screenshotsContainer.appendChild(screenshotsListDiv);
    step3Div.appendChild(screenshotsContainer);
    popupContent.appendChild(step3Div);

    const emailAutomationDiv = document.createElement("div"); emailAutomationDiv.id = "step-4-email"; Object.assign(emailAutomationDiv.style, { display: "none", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #eee" });
    const emailLabel = document.createElement("label"); emailLabel.style.display = "flex"; emailLabel.style.alignItems = "center"; emailLabel.style.cursor = "pointer"; emailLabel.style.fontSize = "14px";
    const emailCheckbox = document.createElement("input"); emailCheckbox.type = "checkbox"; emailCheckbox.checked = true; Object.assign(emailCheckbox.style, NoteStyles.styleCheckboxInput);
    emailLabel.appendChild(emailCheckbox); emailLabel.appendChild(document.createTextNode("Preencher email automaticamente?")); emailAutomationDiv.appendChild(emailLabel); popupContent.appendChild(emailAutomationDiv);

    Object.assign(buttonContainer.style, { display: "none", gap: "8px", padding: "0" }); popupContent.appendChild(buttonContainer);
    Object.assign(copyButton.style, { ...NoteStyles.styleButtonBase, backgroundColor: "#5f6368" }); buttonContainer.appendChild(copyButton);
    Object.assign(generateButton.style, { ...NoteStyles.styleButtonBase, backgroundColor: "#1a73e8" }); buttonContainer.appendChild(generateButton);

    document.body.appendChild(popup);

    // --- FUNÇÕES LÓGICAS ---

    function checkTagSupportVisibility() {
        const selectedSubStatusKey = subStatusSelect.value;
        if (!selectedSubStatusKey) { tagSupportDiv.style.display = 'none'; return; }
        const checkedBoxes = Array.from(taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked'));
        const tasks = checkedBoxes.map(cb => cb.value);
        const isEducation = selectedSubStatusKey.includes('Education');
        const hasEnhanced = tasks.some(t => t.includes('enhanced') || t === 'ec_google_ads');
        const hasAdsConv = tasks.some(t => t.includes('conversion'));
        const hasAnalytics = tasks.some(t => t.includes('ga4') || t.includes('analytics'));
        const hasMerchant = tasks.some(t => t.includes('merchant') || t.includes('gmc'));
        const isOnlyAds = hasAdsConv && !hasAnalytics && !hasMerchant && !hasEnhanced;
        if (!isEducation && (hasEnhanced || isOnlyAds)) { tagSupportDiv.style.display = 'block'; } else { tagSupportDiv.style.display = 'none'; }
    }

    function populateTaskCheckboxes() {
        taskCheckboxesContainer.innerHTML = '';
        for (const taskKey in TASKS_DB) {
            const task = TASKS_DB[taskKey];
            const label = document.createElement('label');
            Object.assign(label.style, NoteStyles.styleCheckboxLabel);
            label.onmouseover = () => { if (!checkbox.checked) label.style.backgroundColor = '#e8eaed'; };
            label.onmouseout = () => { if (!checkbox.checked) label.style.backgroundColor = '#f8f9fa'; };
            const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.value = taskKey; checkbox.className = 'task-checkbox'; Object.assign(checkbox.style, NoteStyles.styleCheckboxInput);
            const taskName = document.createElement('span'); taskName.textContent = task.name; Object.assign(taskName.style, { flexGrow: '1' }); 
            const stepperDiv = document.createElement('div'); stepperDiv.className = 'stepper-container'; Object.assign(stepperDiv.style, NoteStyles.styleStepper);
            const btnMinus = document.createElement('button'); btnMinus.type = 'button'; btnMinus.textContent = '−'; btnMinus.classList.add('no-drag'); Object.assign(btnMinus.style, NoteStyles.styleStepperBtn);
            const countSpan = document.createElement('span'); countSpan.className = 'stepper-count'; countSpan.textContent = '1'; Object.assign(countSpan.style, NoteStyles.styleStepperCount);
            const btnPlus = document.createElement('button'); btnPlus.type = 'button'; btnPlus.textContent = '+'; btnPlus.classList.add('no-drag'); Object.assign(btnPlus.style, NoteStyles.styleStepperBtn);

            stepperDiv.appendChild(btnMinus); stepperDiv.appendChild(countSpan); stepperDiv.appendChild(btnPlus);
            label.appendChild(checkbox); label.appendChild(taskName); label.appendChild(stepperDiv);
            taskCheckboxesContainer.appendChild(label);

            checkbox.onchange = () => {
                if (checkbox.checked) { stepperDiv.style.display = 'flex'; countSpan.textContent = '1'; Object.assign(label.style, { background: '#e8f0fe' }); } 
                else { stepperDiv.style.display = 'none'; countSpan.textContent = '0'; Object.assign(label.style, { background: '#f8f9fa' }); }
                renderScreenshotInputs(); checkTagSupportVisibility();
            };
            btnMinus.onclick = (e) => {
                e.preventDefault(); e.stopPropagation();
                let count = parseInt(countSpan.textContent);
                if (count > 1) { countSpan.textContent = count - 1; } else { checkbox.checked = false; checkbox.dispatchEvent(new Event('change')); }
                renderScreenshotInputs(); checkTagSupportVisibility();
            };
            btnPlus.onclick = (e) => {
                e.preventDefault(); e.stopPropagation();
                let count = parseInt(countSpan.textContent); countSpan.textContent = count + 1;
                renderScreenshotInputs(); checkTagSupportVisibility();
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
        // --- FALLBACK DE ESTILO (Segurança) ---
        const localStyleInput = (typeof NoteStyles.styleInput !== 'undefined') ? NoteStyles.styleInput : {
            width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif", transition: "border-color 0.2s ease, box-shadow 0.2s ease"
        };

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
            const count = countSpan ? parseInt(countSpan.textContent) : 1;
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
                        const printLabel = document.createElement('label'); printLabel.innerHTML = `📷 ${reqPrint}:`; Object.assign(printLabel.style, { fontSize: '11px', color: '#5f6368', marginBottom: '4px', fontWeight: '500' });
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
        checkTagSupportVisibility();
    }

    function enableAutoBullet(textarea) {
        if(textarea.value.trim() === '' || textarea.value.trim() === '•') textarea.value = '• ';
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

    function generateOutputHtml() {
        const selectedSubStatusKey = subStatusSelect.value;
        if (!selectedSubStatusKey) return null;
        const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
        let outputText = templateData.template.replace(/\n/g, "<br>");
        const ulStyle = "style=\"margin-bottom: 12px; padding-left: 30px;\"";

        const hasCheckedTasks = taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked').length > 0;

        if (templateData.requiresTasks || hasCheckedTasks) {
            const selectedCheckboxes = taskCheckboxesContainer.querySelectorAll('.task-checkbox:checked');
            let tagNames = [];
            let screenshotsText = '';
            const isEducation = selectedSubStatusKey.includes('Education');
            const screenshotType = isEducation ? 'education' : 'implementation';
            
            selectedCheckboxes.forEach(checkbox => {
                const taskKey = checkbox.value;
                const task = TASKS_DB[taskKey];
                const countSpan = checkbox.closest('label').querySelector('.stepper-count');
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

        if (tagSupportDiv.style.display !== 'none') {
            const usedTs = tsSim.checked ? "Sim" : "Não";
            outputText += `<br><b>Utilizou Tag Support?</b> ${usedTs}`;
            if (!tsSim.checked && tsReasonInput.value.trim() !== "") {
                 outputText += `<br><b>Motivo:</b> ${tsReasonInput.value}`;
            }
            outputText += `<br>`;
        }
        
        return outputText;
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
        
        checkTagSupportVisibility();
    };

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
        
        // 1. Abertura Automática
        const campo = await ensureNoteCardIsOpen(); 

        if (campo) {
            try {
                campo.focus();
                
                // 2. Limpeza Segura
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

                // 3. Inserção
                const success = document.execCommand('insertHTML', false, htmlOutput);
                if (!success) {
                    campo.innerHTML += htmlOutput;
                }

                // 4. Notifica Angular
                triggerInputEvents(campo);
                setTimeout(() => { showToast(t('inserido_copiado')); }, 600);

                // 5. Dispara Email
                const emailEnabled = typeof emailCheckbox !== 'undefined' && emailCheckbox ? emailCheckbox.checked : true;
                if (selectedSubStatusKey && SUBSTATUS_SHORTCODES[selectedSubStatusKey] && emailEnabled) {
                    const emailCode = SUBSTATUS_SHORTCODES[selectedSubStatusKey];
                    setTimeout(() => { runEmailAutomation(emailCode); }, 1000);
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
            tagSupportDiv.style.display = 'none';
            buttonContainer.style.display = 'none';
            emailAutomationDiv.style.display = 'none'; 
        }
    }
    
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
            if (popup.style.right !== 'auto') { popup.style.right = "24px"; }
        }
    }

    let visible = false;
    btn.onclick = () => {
        visible = !visible;
        togglePopup(visible);
    };
    
    setLanguage(currentLang);
}