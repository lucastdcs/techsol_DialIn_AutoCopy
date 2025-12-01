// src/modules/shared/animations.js

// --- ESTILOS DE ANIMAÇÃO (Google Morph) ---
export const animationStyles = {
    // A linha colorida do Google
    googleLine: {
        height: "3px",
        width: "100%",
        background: "linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",
        transform: "scaleX(0)", // Começa escondida
        transformOrigin: "left center",
        transition: "transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)"
    },
    // Estado inicial do Popup (Fechado e pequeno)
    popupInitial: {
        opacity: "0",
        pointerEvents: "none",
        transform: "scale(0.05)", 
        transformOrigin: "bottom right", // Cresce a partir do botão
        transition: "transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.2s linear",
        // Ajuste fino: a posição final é definida no CSS do módulo (bottom/right), 
        // aqui apenas garantimos a transição.
    },
    // Estados do Botão Flutuante
    btnHidden: {
        transform: "scale(0)",
        opacity: "0",
        pointerEvents: "none"
    },
    btnVisible: {
        transform: "scale(1)",
        opacity: "1",
        pointerEvents: "auto"
    }
};

/**
 * Gerencia a animação de abrir/fechar qualquer popup
 * @param {boolean} show - Se deve mostrar ou esconder
 * @param {object} elements - { popup, btnContainer, googleLine, focusElement? }
 */
export function togglePopupAnimation(show, elements) {
    const { popup, btnContainer, googleLine, focusElement } = elements;

    if (show) {
        // --- ABRIR ---
        
        // 1. Esconde o botão (ele "vira" o popup)
        if (btnContainer) Object.assign(btnContainer.style, animationStyles.btnHidden);
        
        // 2. Expande o Popup
        popup.style.opacity = "1";
        popup.style.pointerEvents = "auto";
        popup.style.transform = "scale(1)";

        // 3. Desenha a linha colorida (com leve delay para acompanhar a expansão)
        if (googleLine) {
            setTimeout(() => {
                googleLine.style.transform = "scaleX(1)";
            }, 100);
        }

        // 4. Foco opcional (ex: input de busca)
        if (focusElement) {
            setTimeout(() => focusElement.focus(), 100);
        }

    } else {
        // --- FECHAR ---

        // 1. Recolhe a linha
        if (googleLine) googleLine.style.transform = "scaleX(0)";

        // 2. Encolhe o Popup
        popup.style.opacity = "0";
        popup.style.pointerEvents = "none";
        popup.style.transform = "scale(0.05)"; // Volta a ser minúsculo

        // 3. Mostra o botão de volta
        if (btnContainer) {
            setTimeout(() => {
                 Object.assign(btnContainer.style, animationStyles.btnVisible);
            }, 200); // Espera o popup sumir um pouco
        }
    }
}