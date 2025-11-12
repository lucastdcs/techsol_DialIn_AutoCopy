// src/modules/feedback/feedback-assistant.js

// Importa as funções e estilos compartilhados
import { 
    makeDraggable,
    stylePopup,
    stylePopupHeader,
    stylePopupTitle,
    stylePopupCloseBtn,
    styleFloatingButton,
    stylePopupVersion,
    styleCredit,
    styleButtonBase // Vamos usar este para os nossos botões de link
} from '../shared/utils.js';

// --- URLs dos Formulários ---
const FORM_URL_1 = 'https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform';
const FORM_URL_2 = 'https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform';
const FORM_URL_3  = 'https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform';

export function initFeedbackAssistant() {
    const CURRENT_VERSION = "v1.0"; // Versão deste módulo

    // --- 1. Criar o Botão Flutuante ---
    const btn = document.createElement("button");
    btn.id = "feedback-floating-btn";
    btn.textContent = "📝"; // Ícone para "formulários/pesquisa"
    Object.assign(btn.style, styleFloatingButton, {
        top: "80%", // Posição abaixo dos outros
        background: "#0F9D58", // Verde do Google (Sheets/Forms)
        color: "white"
    });
    // Animações
    btn.onmouseenter = () => {
        btn.style.background = "#0A854A"; // Verde mais escuro
        btn.style.transform = "scale(1.1)";
    };
    btn.onmouseleave = () => {
        btn.style.background = "#0F9D58";
        btn.style.transform = "scale(1)";
    };
    document.body.appendChild(btn);
    makeDraggable(btn);

    // --- 2. Criar o Popup ---
    const popup = document.createElement("div");
    popup.id = "feedback-popup";
    // Um pouco mais estreito que os outros
    Object.assign(popup.style, stylePopup, { right: "120px", width: "300px" }); 

    // --- 3. Criar o Header ---
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
    title.textContent = "Links Rápidos";
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

    // --- 4. Criar o Conteúdo (Botões de Link) ---
    const popupContent = document.createElement("div");
    Object.assign(popupContent.style, {
        padding: "16px", 
        overflowY: "auto",
        flexGrow: "1"
    });
    popup.appendChild(popupContent);

    // Botão para o Formulário 1
    const btn1 = document.createElement('button');
    btn1.textContent = "Relatório de Ocorrências de Escala"; 
    Object.assign(btn1.style, styleButtonBase, { 
        background: '#4285F4', // Azul Google
        width: '100%',
        marginTop: '0' // Remove a margem do topo
    });
    btn1.onmouseover = () => btn1.style.backgroundColor = '#1a73e8';
    btn1.onmouseout = () => btn1.style.backgroundColor = '#4285F4';
    btn1.onclick = () => window.open(FORM_URL_1, '_blank');
    popupContent.appendChild(btn1);

    // Botão para o Formulário 2
    const btn2 = document.createElement('button');
    btn2.textContent = "Chamadas Excedidas >50min"; 
    Object.assign(btn2.style, styleButtonBase, { 
        background: '#34A853', // Verde Google
        width: '100%'
    });
    btn2.onmouseover = () => btn2.style.backgroundColor = '#1E8E3E';
    btn2.onmouseout = () => btn2.style.backgroundColor = '#34A853';
    btn2.onclick = () => window.open(FORM_URL_2, '_blank');
    popupContent.appendChild(btn2);

        // Botão para o Formulário 2
    const btn3 = document.createElement('button');
    btn3.textContent = "Relatório de Bugs (LM)"; 
    Object.assign(btn3.style, styleButtonBase, { 
        background: '#C5221F', 
        width: '100%'
    });
    btn3.onmouseover = () => btn3.style.backgroundColor = '#e13532ff';
    btn3.onmouseout = () => btn3.style.backgroundColor = '#C5221F';
    btn3.onclick = () => window.open(FORM_URL_3, '_blank');
    popupContent.appendChild(btn3);
    // --- 5. Rodapé (Crédito) ---
    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, styleCredit);
    popup.appendChild(credit);

    document.body.appendChild(popup);

    // --- 6. Lógica de Abrir/Fechar ---
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