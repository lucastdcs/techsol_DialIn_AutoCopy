// src/modules/notes/notes-ui.js

import { 
    makeDraggable, 
    getRandomGoogleStyle 
} from '../shared/utils.js';

import { createStandardHeader } from '../shared/header-factory.js';
import { animationStyles } from '../shared/animations.js';

// =============================================================================
// 1. ESTILOS LOCAIS (Definição Garantida)
// =============================================================================
const STYLES = {
    // Inputs e Textos
    input: { width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif", transition: "border-color 0.2s ease, box-shadow 0.2s ease" },
    textarea: { width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif", transition: "border-color 0.2s ease, box-shadow 0.2s ease", height: "100px", resize: "vertical" },
    h3: { fontSize: "14px", fontWeight: "600", color: "#202124", margin: "0 0 12px 0" },
    label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#3c4043", marginBottom: "8px", marginTop: "16px" },
    
    // Controles
    checkboxLabel: { display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "14px", fontWeight: "400", cursor: "pointer", padding: "8px", background: "#f8f9fa", borderRadius: "6px", transition: "background-color 0.2s ease, box-shadow 0.2s ease", userSelect: "none" },
    checkboxInput: { width: "auto", marginRight: "10px", marginBottom: "0", cursor: "pointer", accentColor: "#1a73e8" },
    select: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dadce0", backgroundColor: "#fff", fontSize: "14px", color: "#3c4043", outline: "none" },
    radioContainer: { display: 'flex', gap: '15px', marginBottom: '10px' },
    
    // Botões
    buttonBase: { flex: "1 1 0", padding: "10px 0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: "pointer", marginTop: "16px" },
    floatingBtn: { width: "48px", height: "48px", borderRadius: "50%", background: "#1a73e8", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(26, 115, 232, 0.4)", transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)" },
    expandBtn: { fontSize: "20px", color: "#5f6368", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "4px", marginLeft: "auto", borderRadius: "50%", transition: "background 0.2s" },
    optionalBtn: { width: '100%', padding: '10px', background: 'white', border: '1px dashed #1a73e8', color: '#1a73e8', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px', marginBottom: '10px', transition: 'all 0.2s' },
    typeBtn: { padding: '6px 12px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#5f6368', background: '#f8f9fa', transition: 'all 0.2s ease', width: "100%", textAlign: "center" },

    // Layout
    popup: { position: "fixed", top: "calc(50% - 300px)", width: "380px", maxHeight: "90vh", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: "9999", display: "flex", flexDirection: "column", overflow: "hidden" },
    stepBlock: { borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px" },
    credit: { fontSize: "10px", color: "#9aa0a6", textAlign: "center", padding: "8px 16px", borderTop: "1px solid #eee", marginTop: "16px" },
    
    // Outros
    helpLink: { fontSize: "12px", color: "#1a73e8", textDecoration: "none", cursor: "pointer", fontWeight: "500", display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto", transition: "color 0.2s" },
    stepper: { display: 'none', alignItems: 'center', gap: '5px', marginLeft: 'auto' },
    stepperBtn: { width: '24px', height: '24px', border: '1px solid #dadce0', borderRadius: '50%', backgroundColor: '#f8f9fa', color: '#3c4043', cursor: 'pointer', padding: '0', fontSize: '16px', lineHeight: '22px', textAlign: 'center', userSelect: 'none' },
    stepperCount: { fontSize: '14px', fontWeight: '500', color: '#1a73e8', minWidth: '15px', textAlign: 'center' },
    
    // Tag Support Styles
    tagSupportContainer: { marginTop: "12px", marginBottom: "12px", padding: "10px", background: "#fff8e1", borderRadius: "6px", border: "1px solid #ffecb3", display: "none" },
    warningText: { fontSize: "12px", color: "#e37400", marginTop: "4px" }
};

// Exporta para o Controller poder usar
export { STYLES as UI_STYLES }; 

export function buildNotesUI(version, onCloseRequest) {
    
    // 1. BOTÃO FLUTUANTE
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, { position: "fixed", bottom: "40%", right: "24px", zIndex: "9999", display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px", cursor: "pointer" });

    const btn = document.createElement("button");
    btn.id = "notes-floating-btn";
    btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
    Object.assign(btn.style, STYLES.floatingBtn);

    const tooltip = document.createElement("span");
    tooltip.textContent = "Case Note";
    Object.assign(tooltip.style, { background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", opacity: "0", pointerEvents: "none", transition: "opacity 0.2s", whiteSpace: "nowrap", fontWeight: "500" });

    btnContainer.onmouseenter = () => { btn.style.transform = "scale(1.1)"; tooltip.style.opacity = "1"; };
    btnContainer.onmouseleave = () => { btn.style.transform = "scale(1)"; tooltip.style.opacity = "0"; };
    btnContainer.appendChild(btn); btnContainer.appendChild(tooltip); document.body.appendChild(btnContainer); makeDraggable(btnContainer);

    // 2. POPUP
    const popup = document.createElement("div");
    popup.id = "autofill-popup";
    Object.assign(popup.style, STYLES.popup, { right: "80px" }, animationStyles.popupInitial);
    popup.style.transition += ", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";

    const animRefs = { popup, btnContainer, googleLine: null };

    // 3. HEADER
    const header = createStandardHeader(
        popup,
        "Case Notes Assistant",
        version,
        "Gera notas padronizadas automaticamente...",
        animRefs,
        onCloseRequest
    );

    // Botão Expandir
    const expandBtn = document.createElement("div");
    expandBtn.textContent = "↔";
    expandBtn.classList.add('no-drag'); 
    expandBtn.title = "Expandir/Contrair Janela";
    Object.assign(expandBtn.style, STYLES.expandBtn);
    
    expandBtn.onmouseover = () => expandBtn.style.backgroundColor = '#e8eaed';
    expandBtn.onmouseout = () => expandBtn.style.backgroundColor = 'transparent';

    let isExpanded = false;
    expandBtn.onclick = () => {
        isExpanded = !isExpanded;
        popup.style.width = isExpanded ? "700px" : "380px";
    };

    const headerContainer = header.lastElementChild;
    if(headerContainer) headerContainer.insertBefore(expandBtn, headerContainer.lastElementChild);
    popup.appendChild(header);

    // 4. CONTEÚDO
    const popupContent = document.createElement("div");
    Object.assign(popupContent.style, { padding: "0 16px 16px 16px", overflowY: "auto", flexGrow: "1" });
    popup.appendChild(popupContent);

    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, STYLES.credit);
    popup.appendChild(credit);

    // --- STEPS ---
    const langToggleDiv = document.createElement("div"); langToggleDiv.id = "step-lang-type";
    Object.assign(langToggleDiv.style, { display: 'flex', flexDirection: 'column', marginBottom: '16px' });
    const langLabel = document.createElement("label"); Object.assign(langLabel.style, STYLES.label); langToggleDiv.appendChild(langLabel);
    const langContainer = document.createElement("div"); Object.assign(langContainer.style, { display: 'flex', borderRadius: '8px', border: '1px solid #dadce0', overflow: 'hidden' });
    const langPT = document.createElement("div"); langPT.textContent = "Português"; langPT.classList.add('no-drag'); Object.assign(langPT.style, STYLES.typeBtn);
    const langES = document.createElement("div"); langES.textContent = "Español"; langES.classList.add('no-drag'); Object.assign(langES.style, STYLES.typeBtn);
    langContainer.appendChild(langPT); langContainer.appendChild(langES);
    langToggleDiv.appendChild(langLabel); langToggleDiv.appendChild(langContainer); popupContent.appendChild(langToggleDiv);

    const step0Div = document.createElement("div"); step0Div.id = "step-0-case-type"; 
    const typeLabel = document.createElement("label"); Object.assign(typeLabel.style, STYLES.label); step0Div.appendChild(typeLabel);
    const typeContainer = document.createElement("div"); Object.assign(typeContainer.style, langContainer.style);
    const typeBAU = document.createElement("div"); typeBAU.textContent = "BAU"; typeBAU.classList.add('no-drag'); Object.assign(typeBAU.style, STYLES.typeBtn);
    const typeLM = document.createElement("div"); typeLM.textContent = "LM"; typeLM.classList.add('no-drag'); Object.assign(typeLM.style, STYLES.typeBtn);
    typeContainer.appendChild(typeBAU); typeContainer.appendChild(typeLM); step0Div.appendChild(typeLabel); step0Div.appendChild(typeContainer); popupContent.appendChild(step0Div);

    const step1Div = document.createElement("div"); step1Div.id = "step-1-selection";
    const mainStatusLabel = document.createElement("label"); Object.assign(mainStatusLabel.style, STYLES.label);
    const mainStatusSelect = document.createElement("select"); Object.assign(mainStatusSelect.style, STYLES.select);
    mainStatusSelect.innerHTML = `<option value="">-- Selecione --</option><option value="NI">NI</option><option value="SO">SO</option><option value="IN">IN</option><option value="AS">AS</option>`;
    
    const subStatusHeader = document.createElement("div"); Object.assign(subStatusHeader.style, { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "16px", marginBottom: "8px" });
    const subStatusLabel = document.createElement("label"); Object.assign(subStatusLabel.style, STYLES.label, { margin: 0 });
    const subStatusHelpLink = document.createElement("a"); subStatusHelpLink.target = "_blank"; subStatusHelpLink.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Guia`;
    Object.assign(subStatusHelpLink.style, STYLES.helpLink);
    subStatusHeader.appendChild(subStatusLabel); subStatusHeader.appendChild(subStatusHelpLink);

    const subStatusSelect = document.createElement("select"); Object.assign(subStatusSelect.style, STYLES.select); subStatusSelect.disabled = true;
    step1Div.append(mainStatusLabel, mainStatusSelect, subStatusHeader, subStatusSelect); popupContent.appendChild(step1Div);

    // STEPS OCULTOS (Helper de Radio)
    function createRadio(name, value, text, checked) {
        const div = document.createElement("div"); Object.assign(div.style, { display: 'flex', alignItems: 'center' });
        const input = document.createElement("input"); input.type = 'radio'; input.name = name; input.value = value; if(checked) input.checked = true; Object.assign(input.style, STYLES.checkboxInput);
        const lbl = document.createElement("label"); lbl.textContent = text; Object.assign(lbl.style, { cursor: 'pointer' });
        lbl.onclick = () => { input.checked = true; input.dispatchEvent(new Event('change')); };
        div.append(input, lbl); return { container: div, input: input, label: lbl };
    }

    const stepPortugalDiv = document.createElement("div"); Object.assign(stepPortugalDiv.style, STYLES.stepBlock, { display: 'none' });
    const portugalLabel = document.createElement("label"); Object.assign(portugalLabel.style, STYLES.label); stepPortugalDiv.appendChild(portugalLabel);
    const portugalRadioGroup = document.createElement("div"); Object.assign(portugalRadioGroup.style, STYLES.radioContainer);
    const portSim = createRadio("portugal-group", "sim", "Sim");
    const portNao = createRadio("portugal-group", "nao", "Não", true);
    portugalRadioGroup.append(portSim.container, portNao.container); stepPortugalDiv.appendChild(portugalRadioGroup); popupContent.appendChild(stepPortugalDiv);

    const stepConsentDiv = document.createElement("div"); Object.assign(stepConsentDiv.style, STYLES.stepBlock, { display: 'none' });
    const consentLabel = document.createElement("label"); Object.assign(consentLabel.style, STYLES.label); stepConsentDiv.appendChild(consentLabel);
    const consentRadioGroup = document.createElement("div"); Object.assign(consentRadioGroup.style, STYLES.radioContainer);
    const consSim = createRadio("consent-group", "Sim", "Sim", true);
    const consNao = createRadio("consent-group", "Não", "Não");
    consentRadioGroup.append(consSim.container, consNao.container); stepConsentDiv.appendChild(consentRadioGroup); popupContent.appendChild(stepConsentDiv);

    const stepSnippetsDiv = document.createElement("div"); Object.assign(stepSnippetsDiv.style, STYLES.stepBlock, { display: 'none' });
    const stepSnippetsTitle = document.createElement("h3"); Object.assign(stepSnippetsTitle.style, STYLES.h3);
    const snippetContainer = document.createElement("div"); snippetContainer.id = "snippet-container";
    stepSnippetsDiv.append(stepSnippetsTitle, snippetContainer); popupContent.appendChild(stepSnippetsDiv);

    const step2Div = document.createElement("div"); Object.assign(step2Div.style, STYLES.stepBlock, { display: 'none' });
    const optionalTaskBtn = document.createElement("button"); Object.assign(optionalTaskBtn.style, STYLES.optionalBtn);
    optionalTaskBtn.onmouseover = () => optionalTaskBtn.style.background = '#e8f0fe'; optionalTaskBtn.onmouseout = () => optionalTaskBtn.style.background = 'white';
    const step2Title = document.createElement("h3"); Object.assign(step2Title.style, STYLES.h3);
    const taskCheckboxesContainer = document.createElement("div"); taskCheckboxesContainer.id = "task-checkboxes-container";
    step2Div.append(optionalTaskBtn, step2Title, taskCheckboxesContainer); popupContent.appendChild(step2Div);

    const step3Div = document.createElement("div"); Object.assign(step3Div.style, STYLES.stepBlock, { display: 'none' });
    const step3Title = document.createElement("h3"); Object.assign(step3Title.style, STYLES.h3);
    const dynamicFormFieldsContainer = document.createElement("div"); dynamicFormFieldsContainer.id = "dynamic-form-fields-container";
    
    const tagSupportSlot = document.createElement("div");
    
    const screenshotsContainer = document.createElement("div"); Object.assign(screenshotsContainer.style, { marginTop: "16px", borderTop: "1px dashed #ccc", paddingTop: "12px", display: "none" });
    const screenshotsTitle = document.createElement("h4"); Object.assign(screenshotsTitle.style, STYLES.h3); screenshotsTitle.textContent = "Evidências / Screenshots";
    const screenshotsListDiv = document.createElement("div");
    screenshotsContainer.append(screenshotsTitle, screenshotsListDiv);
    step3Div.append(step3Title, dynamicFormFieldsContainer, tagSupportSlot, screenshotsContainer); popupContent.appendChild(step3Div);

    const emailAutomationDiv = document.createElement("div"); Object.assign(emailAutomationDiv.style, { display: 'none', marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #eee" });
    const emailLabel = document.createElement("label"); Object.assign(emailLabel.style, { display: "flex", alignItems: "center", cursor: "pointer", fontSize: "14px" });
    const emailCheckbox = document.createElement("input"); emailCheckbox.type = "checkbox"; emailCheckbox.checked = true; Object.assign(emailCheckbox.style, STYLES.checkboxInput);
    emailLabel.append(emailCheckbox, document.createTextNode(" Preencher email automaticamente?"));
    emailAutomationDiv.appendChild(emailLabel); popupContent.appendChild(emailAutomationDiv);

    const buttonContainer = document.createElement("div"); Object.assign(buttonContainer.style, { display: "none", gap: "8px", marginTop: "16px" });
    const copyButton = document.createElement("button"); Object.assign(copyButton.style, STYLES.buttonBase, { backgroundColor: "#5f6368" }); copyButton.textContent = "Copiar";
    const generateButton = document.createElement("button"); Object.assign(generateButton.style, STYLES.buttonBase, { backgroundColor: "#1a73e8" }); generateButton.textContent = "Preencher";
    buttonContainer.append(copyButton, generateButton); popupContent.appendChild(buttonContainer);

    document.body.appendChild(popup);

    return {
        popup, btn, btnContainer, animRefs,
        toggleDivs: { langPT, langES, typeBAU, typeLM },
        labels: { langLabel, typeLabel, mainStatusLabel, subStatusLabel, portugalLabel, consentLabel, stepSnippetsTitle, step2Title, step3Title, optionalTaskBtn, subStatusHelpLink, portLabelSim: portSim.label, portLabelNao: portNao.label, consLabelSim: consSim.label, consLabelNao: consNao.label, emailLabelText: emailLabel.lastChild, copyButton, generateButton },
        selects: { main: mainStatusSelect, sub: subStatusSelect },
        radios: { portugalSim: portSim.input, portugalNao: portNao.input, consentSim: consSim.input, consentNao: consNao.input },
        emailCheckbox,
        containers: { snippet: snippetContainer, tasks: taskCheckboxesContainer, dynamicForms: dynamicFormFieldsContainer, screenshots: screenshotsListDiv, screenshotsRoot: screenshotsContainer, tagSupportSlot },
        steps: { portugal: stepPortugalDiv, consent: stepConsentDiv, snippets: stepSnippetsDiv, tasks: step2Div, forms: step3Div, email: emailAutomationDiv, buttons: buttonContainer, optionalTaskBtn, step2Title, taskList: taskCheckboxesContainer },
        buttons: { copy: copyButton, generate: generateButton }
    };
}