// src/modules/notes/notes-ui.js

import { 
    makeDraggable, 
    getRandomGoogleStyle,
    stylePopup, 
    stylePopupHeader, 
    stylePopupTitle, 
    stylePopupVersion 
} from '../shared/utils.js';

import { createStandardHeader } from '../shared/header-factory.js';
import { animationStyles } from '../shared/animations.js';

// Definimos estilos locais aqui para garantir que a UI sempre tenha acesso a eles
const UI_STYLES = {
    input: { width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif", transition: "border-color 0.2s ease, box-shadow 0.2s ease" },
    textarea: { width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif", transition: "border-color 0.2s ease, box-shadow 0.2s ease", height: "100px", resize: "vertical" },
    h3: { fontSize: "14px", fontWeight: "600", color: "#202124", margin: "0 0 12px 0" },
    checkboxLabel: { display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "14px", fontWeight: "400", cursor: "pointer", padding: "8px", background: "#f8f9fa", borderRadius: "6px", transition: "background-color 0.2s ease, box-shadow 0.2s ease", userSelect: "none" },
    checkboxInput: { width: "auto", marginRight: "10px", marginBottom: "0", cursor: "pointer", accentColor: "#1a73e8" },
    label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#3c4043", marginBottom: "8px", marginTop: "16px" },
    select: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dadce0", backgroundColor: "#fff", fontSize: "14px", color: "#3c4043", outline: "none" },
    buttonBase: { flex: "1 1 0", padding: "10px 0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: "pointer", marginTop: "16px" },
    floatingBtn: { width: "48px", height: "48px", borderRadius: "50%", background: "#1a73e8", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(26, 115, 232, 0.4)", transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)" },
    expandBtn: { fontSize: "20px", color: "#5f6368", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "4px", marginLeft: "auto", borderRadius: "50%", transition: "background 0.2s" },
    optionalBtn: { width: '100%', padding: '10px', background: 'white', border: '1px dashed #1a73e8', color: '#1a73e8', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px', marginBottom: '10px', transition: 'all 0.2s' },
    helpLink: { fontSize: "12px", color: "#1a73e8", textDecoration: "none", cursor: "pointer", fontWeight: "500", display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto" }
};

// Exportamos styles para o Controller usar se precisar (ex: renderScreenshotInputs)
export { UI_STYLES }; 

export function buildNotesUI(version, onCloseRequest) {
    
    // 1. BOTÃO FLUTUANTE
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, { position: "fixed", bottom: "40%", right: "24px", zIndex: "9999", display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px", cursor: "pointer" });

    const btn = document.createElement("button");
    btn.id = "notes-floating-btn";
    btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
    Object.assign(btn.style, UI_STYLES.floatingBtn);

    const tooltip = document.createElement("span");
    tooltip.textContent = "Case Note";
    Object.assign(tooltip.style, { background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", opacity: "0", pointerEvents: "none", transition: "opacity 0.2s", whiteSpace: "nowrap", fontWeight: "500" });

    btnContainer.onmouseenter = () => { btn.style.transform = "scale(1.1)"; tooltip.style.opacity = "1"; };
    btnContainer.onmouseleave = () => { btn.style.transform = "scale(1)"; tooltip.style.opacity = "0"; };
    btnContainer.appendChild(btn); btnContainer.appendChild(tooltip); document.body.appendChild(btnContainer); makeDraggable(btnContainer);

    // 2. POPUP
    const popup = document.createElement("div");
    popup.id = "autofill-popup";
    Object.assign(popup.style, stylePopup, { right: "80px", width: "380px", borderRadius: "12px", display: "flex", flexDirection: "column", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }, animationStyles.popupInitial);
    popup.style.transition += ", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";

    const animRefs = { popup, btnContainer, googleLine: null };

    // 3. HEADER (Factory)
    const header = createStandardHeader(
        popup,
        "Case Notes Assistant",
        version,
        "Gera notas padronizadas automaticamente...",
        animRefs,
        onCloseRequest // <--- Passando a função corretamente
    );

    // Botão Expandir
    const expandBtn = document.createElement("div");
    expandBtn.textContent = "↔";
    expandBtn.classList.add('no-drag'); 
    Object.assign(expandBtn.style, UI_STYLES.expandBtn);
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

    // --- STEP -1: Idioma ---
    const langToggleDiv = document.createElement("div");
    const langLabel = document.createElement("label"); Object.assign(langLabel.style, UI_STYLES.label); langToggleDiv.appendChild(langLabel);
    const langContainer = document.createElement("div"); Object.assign(langContainer.style, { display: 'flex', borderRadius: '8px', border: '1px solid #dadce0', overflow: 'hidden', marginBottom: '16px' });
    const langPT = document.createElement("div"); langPT.textContent = "PT"; Object.assign(langPT.style, { flex: 1, padding: '6px', textAlign: 'center', cursor: 'pointer' }); 
    const langES = document.createElement("div"); langES.textContent = "ES"; Object.assign(langES.style, { flex: 1, padding: '6px', textAlign: 'center', cursor: 'pointer' });
    langContainer.appendChild(langPT); langContainer.appendChild(langES); langToggleDiv.appendChild(langContainer); popupContent.appendChild(langToggleDiv);

    // --- STEP 0: Tipo ---
    const step0Div = document.createElement("div"); 
    const typeLabel = document.createElement("label"); Object.assign(typeLabel.style, UI_STYLES.label); step0Div.appendChild(typeLabel);
    const typeContainer = document.createElement("div"); Object.assign(typeContainer.style, langContainer.style);
    const typeBAU = document.createElement("div"); typeBAU.textContent = "BAU"; Object.assign(typeBAU.style, langPT.style);
    const typeLM = document.createElement("div"); typeLM.textContent = "LM"; Object.assign(typeLM.style, langPT.style);
    typeContainer.appendChild(typeBAU); typeContainer.appendChild(typeLM); step0Div.appendChild(typeContainer); popupContent.appendChild(step0Div);

    // --- STEP 1: Status ---
    const step1Div = document.createElement("div");
    const mainStatusLabel = document.createElement("label"); Object.assign(mainStatusLabel.style, UI_STYLES.label);
    const mainStatusSelect = document.createElement("select"); Object.assign(mainStatusSelect.style, UI_STYLES.select);
    mainStatusSelect.innerHTML = `<option value="">-- Selecione --</option><option value="NI">NI</option><option value="SO">SO</option><option value="IN">IN</option><option value="AS">AS</option>`;
    
    const subStatusHeader = document.createElement("div"); Object.assign(subStatusHeader.style, { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "16px", marginBottom: "8px" });
    const subStatusLabel = document.createElement("label"); Object.assign(subStatusLabel.style, UI_STYLES.label, { margin: 0 });
    const subStatusHelpLink = document.createElement("a"); subStatusHelpLink.target = "_blank"; subStatusHelpLink.textContent = "Guia"; Object.assign(subStatusHelpLink.style, UI_STYLES.helpLink);
    subStatusHeader.appendChild(subStatusLabel); subStatusHeader.appendChild(subStatusHelpLink);

    const subStatusSelect = document.createElement("select"); Object.assign(subStatusSelect.style, UI_STYLES.select); subStatusSelect.disabled = true;
    step1Div.append(mainStatusLabel, mainStatusSelect, subStatusHeader, subStatusSelect); popupContent.appendChild(step1Div);

    // --- STEPS OCULTOS (Portugal, Consent, Snippets) ---
    // (Simplificado para brevidade, mas seguindo a mesma lógica de criar divs e esconder)
    const stepPortugalDiv = document.createElement("div"); stepPortugalDiv.style.display = 'none'; popupContent.appendChild(stepPortugalDiv);
    const stepConsentDiv = document.createElement("div"); stepConsentDiv.style.display = 'none'; popupContent.appendChild(stepConsentDiv);
    
    const stepSnippetsDiv = document.createElement("div"); 
    Object.assign(stepSnippetsDiv.style, { borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px", display: 'none' });
    const stepSnippetsTitle = document.createElement("h3"); Object.assign(stepSnippetsTitle.style, UI_STYLES.h3);
    const snippetContainer = document.createElement("div");
    stepSnippetsDiv.append(stepSnippetsTitle, snippetContainer); popupContent.appendChild(stepSnippetsDiv);

    // --- STEP 2: Tasks ---
    const step2Div = document.createElement("div"); Object.assign(step2Div.style, { borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px", display: 'none' });
    const optionalTaskBtn = document.createElement("button"); Object.assign(optionalTaskBtn.style, UI_STYLES.optionalBtn);
    optionalTaskBtn.onmouseover = () => optionalTaskBtn.style.background = '#e8f0fe';
    optionalTaskBtn.onmouseout = () => optionalTaskBtn.style.background = 'white';
    const step2Title = document.createElement("h3"); Object.assign(step2Title.style, UI_STYLES.h3);
    const taskCheckboxesContainer = document.createElement("div");
    step2Div.append(optionalTaskBtn, step2Title, taskCheckboxesContainer); popupContent.appendChild(step2Div);

    // --- STEP 3: Forms ---
    const step3Div = document.createElement("div"); Object.assign(step3Div.style, { borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px", display: 'none' });
    const step3Title = document.createElement("h3"); Object.assign(step3Title.style, UI_STYLES.h3);
    const dynamicFormFieldsContainer = document.createElement("div");
    
    // SLOT PARA O TAG SUPPORT (O Controller vai preencher isso)
    const tagSupportSlot = document.createElement("div"); 
    
    const screenshotsContainer = document.createElement("div"); Object.assign(screenshotsContainer.style, { marginTop: "16px", display: "none" });
    const screenshotsTitle = document.createElement("h4"); Object.assign(screenshotsTitle.style, UI_STYLES.h3); screenshotsTitle.textContent = "Screenshots";
    const screenshotsListDiv = document.createElement("div");
    screenshotsContainer.append(screenshotsTitle, screenshotsListDiv);
    
    step3Div.append(step3Title, dynamicFormFieldsContainer, tagSupportSlot, screenshotsContainer); 
    popupContent.appendChild(step3Div);

    // --- STEP 4: Email & Botões ---
    const emailAutomationDiv = document.createElement("div"); Object.assign(emailAutomationDiv.style, { display: 'none' });
    const emailLabel = document.createElement("label"); Object.assign(emailLabel.style, { display: "flex", alignItems: "center", fontSize: "14px" });
    const emailCheckbox = document.createElement("input"); emailCheckbox.type = "checkbox"; emailCheckbox.checked = true;
    emailLabel.append(emailCheckbox, document.createTextNode(" Auto Email"));
    emailAutomationDiv.appendChild(emailLabel); popupContent.appendChild(emailAutomationDiv);

    const buttonContainer = document.createElement("div"); Object.assign(buttonContainer.style, { display: "none", gap: "8px", marginTop: "16px" });
    const copyButton = document.createElement("button"); Object.assign(copyButton.style, UI_STYLES.buttonBase, { backgroundColor: "#5f6368" }); copyButton.textContent = "Copiar";
    const generateButton = document.createElement("button"); Object.assign(generateButton.style, UI_STYLES.buttonBase, { backgroundColor: "#1a73e8" }); generateButton.textContent = "Preencher";
    buttonContainer.append(copyButton, generateButton); popupContent.appendChild(buttonContainer);

    document.body.appendChild(popup);

    // RETORNA TUDO QUE O CONTROLLER PRECISA
    return {
        popup, btn, btnContainer, animRefs,
        toggleDivs: { langPT, langES, typeBAU, typeLM },
        labels: { 
            langLabel, typeLabel, mainStatusLabel, subStatusLabel,
            portugalLabel, consentLabel, stepSnippetsTitle, step2Title, step3Title,
            copyButton, generateButton, optionalTaskBtn, subStatusHelpLink
        },
        selects: { main: mainStatusSelect, sub: subStatusSelect },
        // Precisamos retornar referência aos radios de Portugal se for usar, 
        // mas simplifiquei aqui. Se precisar, adicione no objeto de retorno.
        containers: {
            snippet: snippetContainer,
            tasks: taskCheckboxesContainer,
            dynamicForms: dynamicFormFieldsContainer,
            screenshots: screenshotsListDiv,
            screenshotsRoot: screenshotsContainer,
            tagSupportSlot: tagSupportSlot // O Controller vai usar isso!
        },
        steps: {
            snippets: stepSnippetsDiv,
            tasks: step2Div,
            forms: step3Div,
            email: emailAutomationDiv,
            buttons: buttonContainer,
            step2Title: step2Title,
            optionalTaskBtn: optionalTaskBtn,
            portugal: stepPortugalDiv, // Adicionei de volta
            consent: stepConsentDiv    // Adicionei de volta
        },
        inputs: { emailCheckbox },
        buttons: { copy: copyButton, generate: generateButton }
    };
}