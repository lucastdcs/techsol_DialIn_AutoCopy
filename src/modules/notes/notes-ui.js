// src/modules/notes/notes-ui.js

import { 
    makeDraggable, 
    getRandomGoogleStyle 
} from '../shared/utils.js';

import { createStandardHeader } from '../shared/header-factory.js';
import { animationStyles } from '../shared/animations.js';
import * as Styles from './notes-styles.js'; 

export function buildNotesUI(version, onCloseRequest) { // <--- Parâmetro correto
    
    // --- 1. BOTÃO FLUTUANTE ---
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
        position: "fixed", bottom: "40%", right: "24px", zIndex: "9999",
        display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px",
        cursor: "pointer"
    });

    const btn = document.createElement("button");
    btn.id = "notes-floating-btn";
    btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
    
    // Estilo inicial do botão 
    Object.assign(btn.style, Styles.styleFloatingButton || {
        width: "48px", height: "48px", borderRadius: "50%",
        background: "#1a73e8", color: "white", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 12px rgba(26, 115, 232, 0.4)",
        transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"
    });

    const tooltip = document.createElement("span");
    tooltip.textContent = "Case Note";
    Object.assign(tooltip.style, {
        background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 8px",
        borderRadius: "4px", fontSize: "12px", opacity: "0", pointerEvents: "none",
        transition: "opacity 0.2s", whiteSpace: "nowrap", fontWeight: "500"
    });

    btnContainer.onmouseenter = () => { btn.style.transform = "scale(1.1)"; tooltip.style.opacity = "1"; };
    btnContainer.onmouseleave = () => { btn.style.transform = "scale(1)"; tooltip.style.opacity = "0"; };

    btnContainer.appendChild(btn);
    btnContainer.appendChild(tooltip);
    document.body.appendChild(btnContainer);
    makeDraggable(btnContainer);

    // --- 2. POPUP PRINCIPAL ---
    const popup = document.createElement("div");
    popup.id = "autofill-popup";
    
    // Usa estilo do Styles ou fallback
    const basePopupStyle = Styles.stylePopup || {
        position: "fixed", top: "calc(50% - 300px)", width: "380px", maxHeight: "90vh",
        backgroundColor: "#fff", borderRadius: "12px", 
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: "9999",
        display: "flex", flexDirection: "column", overflow: "hidden"
    };

    Object.assign(popup.style, basePopupStyle, { right: "80px" }, animationStyles.popupInitial);
    popup.style.transition += ", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";

    const animRefs = { popup, btnContainer, googleLine: null };

    // --- 3. HEADER ---
    const header = createStandardHeader(
        popup,
        "Case Notes Assistant",
        version,
        "Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",
        animRefs,
        onCloseRequest // <--- CORRIGIDO (Usando o argumento da função)
    );

    // Botão Expandir
    const expandBtn = document.createElement("div");
    expandBtn.textContent = "↔";
    expandBtn.classList.add('no-drag'); 
    expandBtn.title = "Expandir/Contrair Janela";
    
    const expandStyle = Styles.styleExpandButton || { fontSize: "20px", color: "#5f6368", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "4px", marginLeft: "auto", borderRadius: "50%", transition: "background 0.2s" };
    Object.assign(expandBtn.style, expandStyle);
    
    expandBtn.onmouseover = () => expandBtn.style.backgroundColor = '#e8eaed';
    expandBtn.onmouseout = () => expandBtn.style.backgroundColor = 'transparent';

    let isExpanded = false;
    expandBtn.onclick = () => {
        isExpanded = !isExpanded;
        popup.style.width = isExpanded ? "700px" : "380px";
    };

    const headerContainer = header.lastElementChild;
    if (headerContainer) {
        const closeBtn = headerContainer.lastElementChild;
        headerContainer.insertBefore(expandBtn, closeBtn);
    }
    popup.appendChild(header);

    // --- 4. CONTEÚDO ---
    const popupContent = document.createElement("div");
    Object.assign(popupContent.style, { padding: "0 16px 16px 16px", overflowY: "auto", flexGrow: "1" });
    popup.appendChild(popupContent);

    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, Styles.styleCredit || { fontSize: "10px", color: "#9aa0a6", textAlign: "center", padding: "8px 16px", borderTop: "1px solid #eee", marginTop: "16px" });
    popup.appendChild(credit);

    // --- STEPS ---

    // Idioma
    const langToggleDiv = document.createElement("div");
    langToggleDiv.id = "step-lang-type";
    Object.assign(langToggleDiv.style, { display: 'flex', flexDirection: 'column', marginBottom: '16px' });
    
    const langLabel = document.createElement("label");
    Object.assign(langLabel.style, Styles.styleLabel, { marginBottom: "8px", marginTop: "16px", display: "block" });
    
    const langContainer = document.createElement("div");
    Object.assign(langContainer.style, { display: 'flex', borderRadius: '8px', border: '1px solid #dadce0', overflow: 'hidden' });
    
    const langPT = document.createElement("div");
    const langES = document.createElement("div");
    Object.assign(langPT.style, Styles.typeBtnStyle);
    Object.assign(langES.style, Styles.typeBtnStyle);
    langPT.textContent = "Português";
    langES.textContent = "Español";

    langContainer.appendChild(langPT);
    langContainer.appendChild(langES);
    langToggleDiv.appendChild(langLabel);
    langToggleDiv.appendChild(langContainer);
    popupContent.appendChild(langToggleDiv);

    // Tipo
    const step0Div = document.createElement("div");
    const typeLabel = document.createElement("label");
    Object.assign(typeLabel.style, Styles.styleLabel); 
    
    const typeContainer = document.createElement("div");
    Object.assign(typeContainer.style, langContainer.style); 
    
    const typeBAU = document.createElement("div");
    const typeLM = document.createElement("div");
    Object.assign(typeBAU.style, Styles.typeBtnStyle);
    Object.assign(typeLM.style, Styles.typeBtnStyle);
    typeBAU.textContent = "BAU";
    typeLM.textContent = "LM";

    typeContainer.appendChild(typeBAU);
    typeContainer.appendChild(typeLM);
    step0Div.appendChild(typeLabel);
    step0Div.appendChild(typeContainer);
    popupContent.appendChild(step0Div);

    // Status
    const step1Div = document.createElement("div");
    const mainStatusLabel = document.createElement("label");
    Object.assign(mainStatusLabel.style, Styles.styleLabel);
    const mainStatusSelect = document.createElement("select");
    Object.assign(mainStatusSelect.style, Styles.styleSelect);
    mainStatusSelect.innerHTML = `<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>`;

    const subStatusHeader = document.createElement("div");
    Object.assign(subStatusHeader.style, { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "16px", marginBottom: "8px" });
    const subStatusLabel = document.createElement("label");
    Object.assign(subStatusLabel.style, Styles.styleLabel, { marginTop: "0", marginBottom: "0" });
    
    const subStatusHelpLink = document.createElement("a");
    subStatusHelpLink.target = "_blank";
    subStatusHelpLink.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Guia`;
    // Estilo inline para garantir (ou importe se tiver no Styles)
    Object.assign(subStatusHelpLink.style, { fontSize: "12px", color: "#1a73e8", textDecoration: "none", cursor: "pointer", fontWeight: "500", display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto" });

    subStatusHeader.appendChild(subStatusLabel);
    subStatusHeader.appendChild(subStatusHelpLink);

    const subStatusSelect = document.createElement("select");
    Object.assign(subStatusSelect.style, Styles.styleSelect);
    subStatusSelect.disabled = true;

    step1Div.appendChild(mainStatusLabel);
    step1Div.appendChild(mainStatusSelect);
    step1Div.appendChild(subStatusHeader);
    step1Div.appendChild(subStatusSelect);
    popupContent.appendChild(step1Div);

    // Portugal
    const stepPortugalDiv = document.createElement("div");
    Object.assign(stepPortugalDiv.style, Styles.styleStepBlock, { display: 'none' });
    const portugalLabel = document.createElement("label");
    Object.assign(portugalLabel.style, Styles.styleLabel);
    stepPortugalDiv.appendChild(portugalLabel);
    const portugalRadioGroup = document.createElement("div");
    Object.assign(portugalRadioGroup.style, Styles.styleRadioContainer);
    
    function createRadio(name, value, text, checked) {
        const div = document.createElement("div");
        Object.assign(div.style, { display: 'flex', alignItems: 'center' });
        const input = document.createElement("input");
        input.type = 'radio'; input.name = name; input.value = value; if(checked) input.checked = true;
        Object.assign(input.style, Styles.styleCheckboxInput);
        const lbl = document.createElement("label");
        lbl.textContent = text; Object.assign(lbl.style, { cursor: 'pointer' });
        lbl.onclick = () => { input.checked = true; input.dispatchEvent(new Event('change')); };
        div.appendChild(input); div.appendChild(lbl);
        return { container: div, input: input, label: lbl };
    }

    const portSim = createRadio("portugal-group", "sim", "Sim");
    const portNao = createRadio("portugal-group", "nao", "Não", true);
    portugalRadioGroup.appendChild(portSim.container);
    portugalRadioGroup.appendChild(portNao.container);
    stepPortugalDiv.appendChild(portugalRadioGroup);
    popupContent.appendChild(stepPortugalDiv);

    // Consentimento
    const stepConsentDiv = document.createElement("div");
    Object.assign(stepConsentDiv.style, Styles.styleStepBlock, { display: 'none' });
    const consentLabel = document.createElement("label");
    Object.assign(consentLabel.style, Styles.styleLabel);
    stepConsentDiv.appendChild(consentLabel);
    const consentRadioGroup = document.createElement("div");
    Object.assign(consentRadioGroup.style, Styles.styleRadioContainer);
    const consSim = createRadio("consent-group", "Sim", "Sim", true);
    const consNao = createRadio("consent-group", "Não", "Não");
    consentRadioGroup.appendChild(consSim.container);
    consentRadioGroup.appendChild(consNao.container);
    stepConsentDiv.appendChild(consentRadioGroup);
    popupContent.appendChild(stepConsentDiv);

    // Snippets
    const stepSnippetsDiv = document.createElement("div");
    Object.assign(stepSnippetsDiv.style, Styles.styleStepBlock, { display: 'none' });
    const stepSnippetsTitle = document.createElement("h3");
    Object.assign(stepSnippetsTitle.style, Styles.styleH3);
    const snippetContainer = document.createElement("div");
    stepSnippetsDiv.appendChild(stepSnippetsTitle);
    stepSnippetsDiv.appendChild(snippetContainer);
    popupContent.appendChild(stepSnippetsDiv);

    // Tasks
    const step2Div = document.createElement("div");
    Object.assign(step2Div.style, Styles.styleStepBlock, { display: 'none' });
    const optionalTaskBtn = document.createElement("button");
    Object.assign(optionalTaskBtn.style, Styles.styleOptionalBtn);
    optionalTaskBtn.onmouseover = () => optionalTaskBtn.style.background = '#e8f0fe';
    optionalTaskBtn.onmouseout = () => optionalTaskBtn.style.background = 'white';
    const step2Title = document.createElement("h3");
    Object.assign(step2Title.style, Styles.styleH3);
    const taskCheckboxesContainer = document.createElement("div");
    step2Div.appendChild(optionalTaskBtn);
    step2Div.appendChild(step2Title);
    step2Div.appendChild(taskCheckboxesContainer);
    popupContent.appendChild(step2Div);

    // Forms
    const step3Div = document.createElement("div");
    Object.assign(step3Div.style, Styles.styleStepBlock, { display: 'none' });
    const step3Title = document.createElement("h3");
    Object.assign(step3Title.style, Styles.styleH3);
    const dynamicFormFieldsContainer = document.createElement("div");
    step3Div.appendChild(step3Title);
    step3Div.appendChild(dynamicFormFieldsContainer);

    // Slots (Tag Support e Screenshots são injetados aqui)
    const tagSupportSlot = document.createElement("div");
    step3Div.appendChild(tagSupportSlot);
    
    const screenshotsContainer = document.createElement("div");
    Object.assign(screenshotsContainer.style, { marginTop: "16px", borderTop: "1px dashed #ccc", paddingTop: "12px", display: "none" });
    const screenshotsTitle = document.createElement("h4");
    screenshotsTitle.textContent = "Evidências / Screenshots";
    Object.assign(screenshotsTitle.style, Styles.styleH3);
    const screenshotsListDiv = document.createElement("div");
    screenshotsContainer.appendChild(screenshotsTitle);
    screenshotsContainer.appendChild(screenshotsListDiv);
    step3Div.appendChild(screenshotsContainer);
    popupContent.appendChild(step3Div);

    // Email
    const emailAutomationDiv = document.createElement("div");
    Object.assign(emailAutomationDiv.style, { display: "none", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #eee" });
    const emailLabel = document.createElement("label");
    Object.assign(emailLabel.style, { display: "flex", alignItems: "center", cursor: "pointer", fontSize: "14px" });
    const emailCheckbox = document.createElement("input");
    emailCheckbox.type = "checkbox"; emailCheckbox.checked = true; Object.assign(emailCheckbox.style, Styles.styleCheckboxInput);
    emailLabel.appendChild(emailCheckbox);
    emailLabel.appendChild(document.createTextNode("Preencher email automaticamente?"));
    emailAutomationDiv.appendChild(emailLabel);
    popupContent.appendChild(emailAutomationDiv);

    // Botões
    const buttonContainer = document.createElement("div");
    Object.assign(buttonContainer.style, { display: "none", gap: "8px", padding: "0" });
    const copyButton = document.createElement("button");
    Object.assign(copyButton.style, Styles.styleButtonBase, { backgroundColor: "#5f6368" });
    copyButton.onmouseover = () => copyButton.style.backgroundColor = "#4a4d50";
    copyButton.onmouseout = () => copyButton.style.backgroundColor = "#5f6368";
    const generateButton = document.createElement("button");
    Object.assign(generateButton.style, Styles.styleButtonBase, { backgroundColor: "#1a73e8" });
    generateButton.onmouseover = () => generateButton.style.backgroundColor = "#1765c0";
    generateButton.onmouseout = () => generateButton.style.backgroundColor = "#1a73e8";
    buttonContainer.appendChild(copyButton);
    buttonContainer.appendChild(generateButton);
    popupContent.appendChild(buttonContainer);

    // --- Mapeamento de Retorno ---
    return {
        popup, btn, btnContainer, animRefs,
        toggleDivs: { langPT, langES, typeBAU, typeLM },
        labels: {
            langLabel, typeLabel, mainStatusLabel, subStatusLabel,
            stepSnippetsTitle, step2Title, step3Title,
            portugalLabel, consentLabel,
            portLabelSim: portSim.label, portLabelNao: portNao.label,
            consLabelSim: consSim.label, consLabelNao: consNao.label,
            copyButton, generateButton, optionalTaskBtn
        },
        selects: { main: mainStatusSelect, sub: subStatusSelect },
        radios: {
            portugalSim: portSim.input, portugalNao: portNao.input,
            consentSim: consSim.input, consentNao: consNao.input
        },
        emailCheckbox, subStatusHelpLink,
        containers: {
            snippet: snippetContainer,
            tasks: taskCheckboxesContainer,
            dynamicForms: dynamicFormFieldsContainer,
            screenshots: screenshotsListDiv,
            screenshotsRoot: screenshotsContainer,
            tagSupportSlot: tagSupportSlot
        },
        steps: {
            portugal: stepPortugalDiv,
            consent: stepConsentDiv,
            snippets: stepSnippetsDiv,
            tasks: step2Div,
            forms: step3Div,
            email: emailAutomationDiv,
            buttons: buttonContainer,
            optionalTaskBtn: optionalTaskBtn,
            step2Title: step2Title,
            taskList: taskCheckboxesContainer
        },
        buttons: { copy: copyButton, generate: generateButton }
    };
}