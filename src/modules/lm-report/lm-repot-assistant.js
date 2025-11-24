// src/modules/feedback/feedback-assistant.js

import { 
    makeDraggable,
    stylePopup,
    stylePopupHeader,
    stylePopupTitle,
    stylePopupCloseBtn,
    styleFloatingButton,
    stylePopupVersion,
    styleCredit,
    styleButtonBase,
    styleLabel // Importando styleLabel para os subtítulos
} from '../shared/utils.js';

// --- URLs dos Formulários ---
// LM
const URL_LM_OCORRENCIAS = 'https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform';
const URL_LM_CHAMADAS = 'https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform';
const URL_LM_BUGS = 'https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform';

// QA
const URL_QA_ELOGIOS = 'https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform';
const URL_QA_COMPLEXOS = 'https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw';

// Outros
const URL_GRAVACAO = 'https://support.google.com/policies/contact/sar';

export function initFeedbackAssistant() {
    const CURRENT_VERSION = "v1.4"; 

    // --- 1. Botão Flutuante ---
    const btn = document.createElement("button");
    btn.id = "feedback-floating-btn";
    btn.textContent = "📝"; 
    Object.assign(btn.style, styleFloatingButton, {
        top: "80%",
        background: "#0F9D58",
        color: "white"
    });
    btn.onmouseenter = () => {
        btn.style.background = "#0A854A";
        btn.style.transform = "scale(1.1)";
    };
    btn.onmouseleave = () => {
        btn.style.background = "#0F9D58";
        btn.style.transform = "scale(1)";
    };
    document.body.appendChild(btn);
    makeDraggable(btn);

    // --- 2. Popup ---
    const popup = document.createElement("div");
    popup.id = "feedback-popup";
    Object.assign(popup.style, stylePopup, { right: "120px", width: "300px" }); 

    // --- 3. Header ---
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
    title.textContent = "Links Úteis";
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

    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✕";
    closeBtn.classList.add('no-drag');
    Object.assign(closeBtn.style, stylePopupCloseBtn);
    closeBtn.onclick = () => togglePopup(false);
    closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#e8eaed';
    closeBtn.onmouseout = () => closeBtn.style.backgroundColor = 'transparent';
    headerRight.appendChild(closeBtn);
    
    popup.appendChild(header);
    header.appendChild(headerLeft);
    header.appendChild(headerRight);

    // --- 4. Conteúdo (Lista Categorizada) ---
    const popupContent = document.createElement("div");
    Object.assign(popupContent.style, {
        padding: "16px", 
        overflowY: "auto",
        flexGrow: "1",
        maxHeight: "450px"
    });
    popup.appendChild(popupContent);

    // Função auxiliar para criar botões
    function createLinkBtn(text, url, colorObj) {
        const btn = document.createElement('button');
        btn.textContent = text;
        Object.assign(btn.style, styleButtonBase, { 
            background: colorObj.bg,
            color: 'white',
            width: '100%',
            marginTop: '8px', // Espaço menor entre botões
            fontSize: '13px'
        });
        btn.onmouseover = () => btn.style.backgroundColor = colorObj.hover;
        btn.onmouseout = () => btn.style.backgroundColor = colorObj.bg;
        btn.onclick = () => window.open(url, '_blank');
        return btn;
    }

    // Função auxiliar para criar títulos de seção
    function createSectionTitle(text) {
        const div = document.createElement('div');
        div.textContent = text;
        Object.assign(div.style, styleLabel, {
            color: '#5f6368',
            borderBottom: '1px solid #eee',
            paddingBottom: '4px',
            marginTop: '16px',
            marginBottom: '4px'
        });
        // Remove margem do primeiro título
        if (popupContent.children.length === 0) div.style.marginTop = '0';
        return div;
    }

    // Cores
    const BLUE = { bg: '#4285F4', hover: '#3367D6' };
    const GREEN = { bg: '#34A853', hover: '#2D8F47' };
    const RED = { bg: '#EA4335', hover: '#C5221F' };
    const GREY = { bg: '#5f6368', hover: '#494c50' };

    // === SEÇÃO LM ===
    popupContent.appendChild(createSectionTitle('LM)'));
    popupContent.appendChild(createLinkBtn('Relatório de Ocorrências', URL_LM_OCORRENCIAS, BLUE));
    popupContent.appendChild(createLinkBtn('Chamadas Excedidas (>50min)', URL_LM_CHAMADAS, GREEN));
    popupContent.appendChild(createLinkBtn('Relatório de Bugs', URL_LM_BUGS, RED));

    // === SEÇÃO QA ===
    popupContent.appendChild(createSectionTitle('QA'));
    popupContent.appendChild(createLinkBtn('Elogios', URL_QA_ELOGIOS, BLUE));
    popupContent.appendChild(createLinkBtn('Casos Complexos', URL_QA_COMPLEXOS, GREEN));

    // === SEÇÃO OUTROS ===
    popupContent.appendChild(createSectionTitle('Outros'));
    popupContent.appendChild(createLinkBtn('Solicitar Gravação', URL_GRAVACAO, GREY));


    // --- 5. Rodapé ---
    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, styleCredit);
    popup.appendChild(credit);

    document.body.appendChild(popup);

    // --- 6. Lógica ---
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
}