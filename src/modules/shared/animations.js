// src/modules/shared/animations.js

// --- ESTILOS DE ANIMAÇÃO ---
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
        transformOrigin: "bottom right", // Nasce do canto (onde fica o Command Center)
        transition: "transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.2s linear",
    }
};

/**
 * Gerencia a animação de abrir/fechar a JANELA (Popup) apenas.
 * A animação do botão agora é responsabilidade do Command Center.
 */
export function togglePopupAnimation(show, elements) {
    const { popup, googleLine, focusElement } = elements;

    if (show) {
        // --- ABRIR ---
        
        // 1. Expande o Popup
        popup.style.opacity = "1";
        popup.style.pointerEvents = "auto";
        popup.style.transform = "scale(1)";

        // 2. Desenha a linha (com leve delay para acompanhar a expansão)
        if (googleLine) {
            setTimeout(() => {
                googleLine.style.transform = "scaleX(1)";
            }, 100);
        }

        // 3. Foco (Acessibilidade e UX)
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
        popup.style.transform = "scale(0.05)"; 
    }
}