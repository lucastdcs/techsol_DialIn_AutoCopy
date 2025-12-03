// src/modules/notes/notes-ui.js

import { 
    makeDraggable, 
    getRandomGoogleStyle 
} from '../shared/utils.js';

import { createStandardHeader } from '../shared/header-factory.js';
import { animationStyles } from '../shared/animations.js';
import * as Styles from './notes-styles.js'; // Importa todos os estilos

/**
 * Constrói toda a interface estática do Case Notes Assistant.
 * Retorna referências aos elementos para que o Controller possa ligar os eventos.
 * * @param {string} version - Versão atual para exibir no header
 * @param {function} onCloseRequest - Callback para quando o usuário clicar no X
 * @returns {object} Objeto contendo todos os elementos interativos da UI
 */
export function buildNotesUI(version, onCloseRequest) {
    
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
    
    // Estilo inicial do botão (pode ser sobrescrito por temas depois)
    Object.assign(btn.style, {
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

    // Hover no container
    btnContainer.onmouseenter = () => { 
        btn.style.transform = "scale(1.1)"; 
        tooltip.style.opacity = "1"; 
    };
    btnContainer.onmouseleave = () => { 
        btn.style.transform = "scale(1)"; 
        tooltip.style.opacity = "0"; 
    };

    btnContainer.appendChild(btn);
    btnContainer.appendChild(tooltip);
    document.body.appendChild(btnContainer);
    makeDraggable(btnContainer);

    // --- 2. POPUP PRINCIPAL ---
    const popup = document.createElement("div");
    popup.id = "autofill-popup";
    
    // Aplica estilos base + Animação inicial
    // Nota: stylePopup não é importado aqui, definimos inline ou importamos se necessário.
    // Assumindo que Styles.stylePopup não existe (era do utils), vamos definir o básico aqui ou importar do utils se preferir.
    // Para garantir, vou usar um estilo base aqui similar ao do utils.
    const basePopupStyle = {
        position: "fixed", top: "calc(50% - 300px)", width: "380px", maxHeight: "90vh",
        backgroundColor: "#fff", borderRadius: "12px", 
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: "9999",
        display: "flex", flexDirection: "column", overflow: "hidden"
    };

    Object.assign(popup.style, basePopupStyle, { right: "80px" }, animationStyles.popupInitial);
    
    // Adiciona transição de largura para o botão expandir
    popup.style.transition += ", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";

    // Objeto para animação
    const animRefs = { popup, btnContainer, googleLine: null };

    // --- 3. HEADER (Via Factory) ---
    const header = createStandardHeader(
        popup,
        "Case Notes Assistant",
        version,
        "Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",
        animRefs,
        onCloseCallback
    );

    // Botão Expandir (Injetado no Header)
    const expandBtn = document.createElement("div");
    expandBtn.textContent = "↔";
    expandBtn.classList.add('no-drag'); 
    expandBtn.title = "Expandir/Contrair Janela";
    Object.assign(expandBtn.style, { 
        fontSize: "20px", color: "#5f6368", cursor: "pointer", 
        padding: "8px", display: "flex", alignItems: "center", justifyContent: "center",
        marginRight: "4px", marginLeft: "auto", borderRadius: "50%", transition: "background 0.2s"
    });
    
    expandBtn.onmouseover = () => expandBtn.style.backgroundColor = '#e8eaed';
    expandBtn.onmouseout = () => expandBtn.style.backgroundColor = 'transparent';

    // Lógica visual de expandir (apenas UI)
    let isExpanded = false;
    expandBtn.onclick = () => {
        isExpanded = !isExpanded;
        popup.style.width = isExpanded ? "700px" : "380px";
    };

    const headerContainer = header.lastElementChild; // Onde ficam os botões
    if (headerContainer) {
        const closeBtn = headerContainer.lastElementChild;
        headerContainer.insertBefore(expandBtn, closeBtn);
    }
    popup.appendChild(header);

    // --- 4. CONTEÚDO (Scrollable) ---
    const popupContent = document.createElement("div");
    Object.assign(popupContent.style, { 
        padding: "0 16px 16px 16px", overflowY: "auto", flexGrow: "1" 
    });
    popup.appendChild(popupContent);

    // --- 5. CRÉDITOS ---
    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    // Estilo inline simples para não depender de import externo se falhar
    Object.assign(credit.style, { fontSize: "10px", color: "#9aa0a6", textAlign: "center", padding: "8px 16px", borderTop: "1px solid #eee", marginTop: "16px" });
    popup.appendChild(credit);

    // ============================================================
    //                MONTAGEM DOS PASSOS (STEPS)
    // ============================================================

    // --- STEP -1: Idioma ---
    const langToggleDiv = document.createElement("div");
    langToggleDiv.id = "step-lang-type";
    Object.assign(langToggleDiv.style, { display: 'flex', flexDirection: 'column', marginBottom: '16px' });
    
    const langLabel = document.createElement("label");
    Object.assign(langLabel.style, Styles.styleH3, { marginBottom: "8px", marginTop: "16px", display: "block", fontSize: "14px", fontWeight: "500", color: "#3c4043" });
    
    const langContainer = document.createElement("div");
    Object.assign(langContainer.style, { display: 'flex', borderRadius: '8px', border: '1px solid #dadce0', overflow: 'hidden' });
    
    const langPT = document.createElement("div");
    const langES = document.createElement("div");
    // Estilo base de botão de toggle
    const toggleBtnStyle = { flex: 1, padding: '6px 12px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#5f6368', background: '#f8f9fa', transition: 'all 0.2s ease', textAlign: 'center' };
    
    Object.assign(langPT.style, toggleBtnStyle);
    Object.assign(langES.style, toggleBtnStyle);
    langPT.textContent = "Português";
    langES.textContent = "Español";

    langContainer.appendChild(langPT);
    langContainer.appendChild(langES);
    langToggleDiv.appendChild(langLabel);
    langToggleDiv.appendChild(langContainer);
    popupContent.appendChild(langToggleDiv);

    // --- STEP 0: Tipo de Caso (BAU/LM) ---
    const step0Div = document.createElement("div");
    
    const typeLabel = document.createElement("label");
    Object.assign(typeLabel.style, langLabel.style); // Reusa estilo do label acima
    
    const typeContainer = document.createElement("div");
    Object.assign(typeContainer.style, langContainer.style); // Reusa container
    
    const typeBAU = document.createElement("div");
    const typeLM = document.createElement("div");
    Object.assign(typeBAU.style, toggleBtnStyle);
    Object.assign(typeLM.style, toggleBtnStyle);
    typeBAU.textContent = "BAU";
    typeLM.textContent = "LM";

    typeContainer.appendChild(typeBAU);
    typeContainer.appendChild(typeLM);
    step0Div.appendChild(typeLabel);
    step0Div.appendChild(typeContainer);
    popupContent.appendChild(step0Div);

    // --- STEP 1: Seleção de Status ---
    const step1Div = document.createElement("div");
    
    const mainStatusLabel = document.createElement("label");
    Object.assign(mainStatusLabel.style, langLabel.style);
    
    const mainStatusSelect = document.createElement("select");
    // Estilo Select
    const selectStyle = { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dadce0", backgroundColor: "#fff", fontSize: "14px", color: "#3c4043", outline: "none" };
    Object.assign(mainStatusSelect.style, selectStyle);
    mainStatusSelect.innerHTML = `<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>`;

    // Header do Substatus (Label + Link)
    const subStatusHeader = document.createElement("div");
    Object.assign(subStatusHeader.style, { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "16px", marginBottom: "8px" });
    
    const subStatusLabel = document.createElement("label");
    Object.assign(subStatusLabel.style, langLabel.style, { marginTop: "0", marginBottom: "0" });
    
    const subStatusHelpLink = document.createElement("a");
    subStatusHelpLink.target = "_blank";
    subStatusHelpLink.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Guia`;
    Object.assign(subStatusHelpLink.style, { fontSize: "12px", color: "#1a73e8", textDecoration: "none", cursor: "pointer", fontWeight: "500", display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto" });

    subStatusHeader.appendChild(subStatusLabel);
    subStatusHeader.appendChild(subStatusHelpLink);

    const subStatusSelect = document.createElement("select");
    Object.assign(subStatusSelect.style, selectStyle);
    subStatusSelect.disabled = true;

    step1Div.appendChild(mainStatusLabel);
    step1Div.appendChild(mainStatusSelect);
    step1Div.appendChild(subStatusHeader);
    step1Div.appendChild(subStatusSelect);
    popupContent.appendChild(step1Div);

    // --- STEP 1.1: Portugal (Oculto por padrão) ---
    const stepPortugalDiv = document.createElement("div");
    Object.assign(stepPortugalDiv.style, Styles.styleStepBlock, { display: 'none' });
    
    const portugalLabel = document.createElement("label");
    Object.assign(portugalLabel.style, langLabel.style);
    
    const portugalRadioGroup = document.createElement("div");
    Object.assign(portugalRadioGroup.style, Styles.styleRadioContainer);
    
    // Criação dos Radios (Sim/Não)
    // ... (A lógica de criação dos radios é repetitiva, podemos abstrair se quiser, mas vou manter explícita aqui)
    const portSim = createRadioOption("portugal-group", "sim", "Sim");
    const portNao = createRadioOption("portugal-group", "nao", "Não", true); // Default checked
    portugalRadioGroup.appendChild(portSim.container);
    portugalRadioGroup.appendChild(portNao.container);
    
    stepPortugalDiv.appendChild(portugalLabel);
    stepPortugalDiv.appendChild(portugalRadioGroup);
    popupContent.appendChild(stepPortugalDiv);

    // --- STEP 1.2: Consentimento (Oculto por padrão) ---
    const stepConsentDiv = document.createElement("div");
    Object.assign(stepConsentDiv.style, Styles.styleStepBlock, { display: 'none' });
    
    const consentLabel = document.createElement("label");
    Object.assign(consentLabel.style, langLabel.style);
    
    const consentRadioGroup = document.createElement("div");
    Object.assign(consentRadioGroup.style, Styles.styleRadioContainer);
    
    const consSim = createRadioOption("consent-group", "Sim", "Sim", true);
    const consNao = createRadioOption("consent-group", "Não", "Não");
    consentRadioGroup.appendChild(consSim.container);
    consentRadioGroup.appendChild(consNao.container);

    stepConsentDiv.appendChild(consentLabel);
    stepConsentDiv.appendChild(consentRadioGroup);
    popupContent.appendChild(stepConsentDiv);

    // --- STEP 1.5: Snippets (Cenários) ---
    const stepSnippetsDiv = document.createElement("div");
    Object.assign(stepSnippetsDiv.style, Styles.styleStepBlock, { display: 'none' });
    
    const stepSnippetsTitle = document.createElement("h3");
    Object.assign(stepSnippetsTitle.style, Styles.styleH3);
    
    const snippetContainer = document.createElement("div");
    
    stepSnippetsDiv.appendChild(stepSnippetsTitle);
    stepSnippetsDiv.appendChild(snippetContainer);
    popupContent.appendChild(stepSnippetsDiv);

    // --- STEP 2: Tasks ---
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

    // --- STEP 3: Campos Dinâmicos ---
    const step3Div = document.createElement("div");
    Object.assign(step3Div.style, Styles.styleStepBlock, { display: 'none' });
    
    const step3Title = document.createElement("h3");
    Object.assign(step3Title.style, Styles.styleH3);
    
    const dynamicFormFieldsContainer = document.createElement("div");
    
    // Slots para Módulos Externos (Tag Support e Screenshots)
    const tagSupportSlot = document.createElement("div"); // Onde o TagSupport vai entrar
    
    const screenshotsContainer = document.createElement("div");
    Object.assign(screenshotsContainer.style, { marginTop: "16px", borderTop: "1px dashed #ccc", paddingTop: "12px", display: "none" });
    const screenshotsTitle = document.createElement("h4");
    screenshotsTitle.textContent = "Evidências / Screenshots";
    Object.assign(screenshotsTitle.style, Styles.styleH3);
    const screenshotsListDiv = document.createElement("div");
    screenshotsContainer.appendChild(screenshotsTitle);
    screenshotsContainer.appendChild(screenshotsListDiv);

    step3Div.appendChild(step3Title);
    step3Div.appendChild(dynamicFormFieldsContainer);
    step3Div.appendChild(tagSupportSlot);
    step3Div.appendChild(screenshotsContainer);
    popupContent.appendChild(step3Div);

    // --- STEP 4: Email Checkbox ---
    const emailAutomationDiv = document.createElement("div");
    Object.assign(emailAutomationDiv.style, { display: "none", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #eee" });
    const emailLabel = document.createElement("label");
    Object.assign(emailLabel.style, { display: "flex", alignItems: "center", cursor: "pointer", fontSize: "14px" });
    const emailCheckbox = document.createElement("input");
    emailCheckbox.type = "checkbox";
    emailCheckbox.checked = true;
    Object.assign(emailCheckbox.style, Styles.styleCheckboxInput);
    emailLabel.appendChild(emailCheckbox);
    emailLabel.appendChild(document.createTextNode("Preencher email automaticamente?"));
    emailAutomationDiv.appendChild(emailLabel);
    popupContent.appendChild(emailAutomationDiv);

    // --- BOTÕES DE AÇÃO ---
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

    document.body.appendChild(popup);

    // --- Helper Interno de UI: Criação de Radios ---
    function createRadioOption(name, value, text, checked = false) {
        const div = document.createElement("div");
        Object.assign(div.style, { display: 'flex', alignItems: 'center' });
        const input = document.createElement("input");
        input.type = "radio";
        input.name = name;
        input.value = value;
        if(checked) input.checked = true;
        Object.assign(input.style, Styles.styleCheckboxInput);
        const label = document.createElement("label");
        label.textContent = text;
        Object.assign(label.style, { cursor: "pointer" });
        
        // Clique no label seleciona o input
        label.onclick = () => { input.checked = true; input.dispatchEvent(new Event('change')); };
        
        div.appendChild(input);
        div.appendChild(label);
        return { container: div, input: input };
    }

    // --- RETORNO (API DA UI) ---
    // Retorna todos os elementos que o Controller precisa ouvir ou manipular
    return {
        // Elementos principais
        popup,
        btn,
        btnContainer,
        animRefs,

        // Elementos de Controle
        toggleDivs: {
            langPT, langES,
            typeBAU, typeLM
        },
        
        // Labels para tradução
        labels: {
            langLabel, typeLabel, mainStatusLabel, subStatusLabel,
            stepSnippetsTitle, step2Title, step3Title,
            portugalLabel, consentLabel, 
            emailLabelText: emailLabel.lastChild, // Nó de texto
            copyButton, generateButton,
            optionalTaskBtn,
            portLabelSim: portSim.container.querySelector('label'),
            portLabelNao: portNao.container.querySelector('label'),
            consLabelSim: consSim.container.querySelector('label'),
            consLabelNao: consNao.container.querySelector('label'),
        },

        // Inputs e Selects
        selects: {
            main: mainStatusSelect,
            sub: subStatusSelect
        },
        radios: {
            portugalSim: portSim.input,
            portugalNao: portNao.input,
            consentSim: consSim.input,
            consentNao: consNao.input,
        },
        emailCheckbox,
        subStatusHelpLink,

        // Containers Dinâmicos (Onde o Controller injeta coisas)
        containers: {
            snippet: snippetContainer,
            tasks: taskCheckboxesContainer,
            dynamicForms: dynamicFormFieldsContainer,
            screenshots: screenshotsListDiv,
            screenshotsRoot: screenshotsContainer,
            tagSupportSlot: tagSupportSlot
        },
        
        // Containers de Visibilidade (Steps)
        steps: {
            portugal: stepPortugalDiv,
            consent: stepConsentDiv,
            snippets: stepSnippetsDiv,
            tasks: step2Div,
            forms: step3Div,
            email: emailAutomationDiv,
            buttons: buttonContainer,
            optionalTaskBtn: optionalTaskBtn, // Botão de redundância
            step2Title: step2Title,
            taskList: taskCheckboxesContainer
        },

        // Botões de Ação
        buttons: {
            copy: copyButton,
            generate: generateButton
        }
    };
}