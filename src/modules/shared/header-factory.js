// src/modules/shared/header-factory.js

import { 
    stylePopupHeader, 
    stylePopupTitle, 
    stylePopupCloseBtn, 
    stylePopupVersion,
    makeDraggable 
} from './utils.js';

import { animationStyles, togglePopupAnimation } from './animations.js';

/**
 * Cria um Header padrão Google Style com suporte a animação e drag.
 * * @param {HTMLElement} popupElement - O elemento pai (popup) para aplicar o Drag.
 * @param {string} titleText - Título do módulo (Ex: "Emails Rápidos").
 * @param {string} versionText - Versão do módulo.
 * @param {object} animationRefs - Objeto de referência para controlar a animação de fechar.
 * @param {function} onCloseCallback - (Opcional) Função extra para rodar ao fechar.
 * @returns {HTMLElement} O elemento header montado.
 */
export function createStandardHeader(popupElement, titleText, versionText, animationRefs, onCloseCallback) {
    const header = document.createElement("div");
    
    // Estilo base: Removemos padding e overflow hidden para a linha colorida ficar perfeita
    Object.assign(header.style, stylePopupHeader, { 
        padding: "0", 
        height: "auto", 
        flexDirection: "column", 
        alignItems: "stretch", 
        overflow: "hidden", 
        borderRadius: "12px 12px 0 0",
        flexShrink: "0" // Garante que o header nunca encolha
    });
    
    // Aplica a lógica de arrastar no header
    makeDraggable(popupElement, header);

    // 1. A Linha Colorida (Google Animation)
    const googleLine = document.createElement("div");
    Object.assign(googleLine.style, animationStyles.googleLine);
    header.appendChild(googleLine);
    
    // Salva a referência para a animação externa poder usar
    if (animationRefs) {
        animationRefs.googleLine = googleLine;
    }

    // 2. Container do Conteúdo (Logo, Título, Fechar)
    const headerContent = document.createElement("div");
    Object.assign(headerContent.style, { 
        padding: "16px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
    });

    // Lado Esquerdo (Logo + Textos)
    const leftDiv = document.createElement("div");
    Object.assign(leftDiv.style, { display: 'flex', alignItems: 'center', gap: '10px' });

    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "24px", height: "24px" });

    const textDiv = document.createElement("div");
    Object.assign(textDiv.style, { display: 'flex', flexDirection: 'column' });
    
    const title = document.createElement("span");
    title.textContent = titleText;
    Object.assign(title.style, stylePopupTitle);
    
    const version = document.createElement("span");
    version.textContent = versionText;
    Object.assign(version.style, stylePopupVersion);

    textDiv.appendChild(title);
    textDiv.appendChild(version);
    leftDiv.appendChild(logo);
    leftDiv.appendChild(textDiv);

    // Lado Direito (Botão Fechar)
    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✕";
    Object.assign(closeBtn.style, stylePopupCloseBtn);
    
    closeBtn.onclick = () => {
        // Chama a animação de fechar padrão
        if (animationRefs) {
            togglePopupAnimation(false, animationRefs);
        }
        // Executa callback extra (ex: atualizar estado 'visible' no arquivo pai)
        if (onCloseCallback) onCloseCallback();
    };

    headerContent.appendChild(leftDiv);
    headerContent.appendChild(closeBtn);
    
    header.appendChild(headerContent);

    return header;
}