// src/modules/shared/header-factory.js

import { 
    stylePopupHeader, 
    stylePopupTitle, 
    styleIconBtn, 
    styleHelpOverlay,
    makeDraggable 
} from './utils.js';

import { animationStyles, togglePopupAnimation } from './animations.js';

/**
 * Cria um Header padrão Google Style (Branco, Limpo, Com Help Overlay).
 */
export function createStandardHeader(popupElement, titleText, versionText, animationRefs, onCloseCallback) {
    const header = document.createElement("div");
    Object.assign(header.style, stylePopupHeader);
    
    // 1. Aplica o Drag (Lógica de arrastar)
    makeDraggable(popupElement, header);
    
    // OBS: Removemos as linhas manuais de 'onmousedown' que quebravam o drag.
    // O cursor 'grab' já está definido no estilo do header no utils.js

    // 2. Linha Colorida
    const googleLine = document.createElement("div");
    Object.assign(googleLine.style, animationStyles.googleLine);
    header.appendChild(googleLine);
    
    if (animationRefs) animationRefs.googleLine = googleLine;

    // 3. Container Interno (Correção do Layout)
    const contentRow = document.createElement("div");
    Object.assign(contentRow.style, { 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        width: "100%", 
        padding: "12px 16px",
        boxSizing: "border-box" // <--- CORREÇÃO VITAL PARA O 'X' NÃO SUMIR
    });

    // --- LADO ESQUERDO ---
    const leftDiv = document.createElement("div");
    Object.assign(leftDiv.style, { display: 'flex', alignItems: 'center', gap: '12px' });

    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "22px", height: "22px", pointerEvents: "none" }); // pointerEvents none para não atrapalhar o drag no logo

    const title = document.createElement("span");
    title.textContent = titleText;
    Object.assign(title.style, stylePopupTitle, { fontSize: "16px", fontWeight: "500", color: "#202124", pointerEvents: "none" });

    leftDiv.appendChild(logo);
    leftDiv.appendChild(title);

    // --- LADO DIREITO ---
    const rightDiv = document.createElement("div");
    Object.assign(rightDiv.style, { display: 'flex', alignItems: 'center' });

    // Botão Ajuda
    const helpBtn = document.createElement("div");
    helpBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    Object.assign(helpBtn.style, styleIconBtn);
    helpBtn.title = "Sobre este módulo";
    
    // Botão Fechar
    const closeBtn = document.createElement("div");
    closeBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    Object.assign(closeBtn.style, styleIconBtn);
    closeBtn.title = "Fechar";

    // Efeitos Hover
    [helpBtn, closeBtn].forEach(btn => {
        btn.classList.add('no-drag'); // Garante que o drag não pegue aqui
        btn.onmouseenter = () => btn.style.backgroundColor = "#f1f3f4";
        btn.onmouseleave = () => btn.style.backgroundColor = "transparent";
        
        // Para permitir clicar sem arrastar, paramos a propagação do mousedown
        btn.onmousedown = (e) => e.stopPropagation();
    });

    closeBtn.onmouseenter = () => { closeBtn.style.backgroundColor = "#fee2e2"; closeBtn.style.color = "#c5221f"; };
    closeBtn.onmouseleave = () => { closeBtn.style.backgroundColor = "transparent"; closeBtn.style.color = "#5f6368"; };

    // Ações
    closeBtn.onclick = () => {
        if (animationRefs) togglePopupAnimation(false, animationRefs);
        if (onCloseCallback) onCloseCallback();
    };

    // --- HELP OVERLAY ---
    const overlay = createHelpOverlay(popupElement, titleText, versionText);
    
    helpBtn.onclick = () => {
        const isVisible = overlay.style.opacity === "1";
        if (isVisible) {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            helpBtn.style.color = "#5f6368";
            helpBtn.style.backgroundColor = "transparent";
        } else {
            overlay.style.opacity = "1";
            overlay.style.pointerEvents = "auto";
            helpBtn.style.color = "#1a73e8";
            helpBtn.style.backgroundColor = "#e8f0fe";
        }
    };

    rightDiv.appendChild(helpBtn);
    rightDiv.appendChild(closeBtn);

    contentRow.appendChild(leftDiv);
    contentRow.appendChild(rightDiv);
    header.appendChild(contentRow);

    return header;
}

function createHelpOverlay(parentPopup, title, version) {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, styleHelpOverlay);
    overlay.style.top = "50px"; 
    overlay.style.height = "calc(100% - 50px)";
    overlay.style.borderRadius = "0 0 12px 12px";

    overlay.innerHTML = `
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${title}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Versão ${version}</div>
        
        <div style="color: #5f6368; font-size: 13px; max-width: 80%; line-height: 1.6;">
            Ferramenta de produtividade para otimizar o fluxo de trabalho de consultoria.
        </div>

        <div style="margin-top: 32px; font-size: 12px; color: #9aa0a6;">
            created by <span style="color: #1a73e8; font-weight: 500;">@lucaste</span>
        </div>
        
        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #1a73e8; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            Voltar
        </button>
    `;
    
    setTimeout(() => {
        const btn = overlay.querySelector('#close-help-internal');
        if(btn) {
            btn.onmouseover = () => btn.style.backgroundColor = "#f8f9fa";
            btn.onmouseout = () => btn.style.backgroundColor = "white";
            btn.onclick = () => {
                overlay.style.opacity = "0";
                overlay.style.pointerEvents = "none";
            };
        }
    }, 0);

    parentPopup.appendChild(overlay);
    return overlay;
}