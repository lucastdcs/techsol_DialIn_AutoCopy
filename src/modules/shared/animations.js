// src/modules/shared/animations.js
import { injectGoogleAnimationStyles } from './utils.js'; // Certifique-se de exportar essa função no utils.js se não estiver!

// --- ESTILOS DE ANIMAÇÃO (Google Morph & Physics) ---
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
        transformOrigin: "bottom right",
        transition: "transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.2s linear",
    },

    // --- ESTADO ATIVO (CORREÇÃO: Pressionado) ---
    // Não mudamos a cor (background), apenas a física do botão
    btnActive: {
        transform: "scale(0.90)",   // Encolhe levemente (efeito de pressionado)
        filter: "brightness(0.9)",  // Escurece 10% para indicar "ativo"
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)", // Sombra interna
        pointerEvents: "auto",      // Permite clicar para fechar
        transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)" // Transição suave
    },
    
    // Estado Normal (Reset)
    btnVisible: {
        transform: "scale(1)",
        filter: "brightness(1)",    // Brilho original
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)", // Sombra flutuante original (estimada)
        opacity: "1",
        pointerEvents: "auto",
        transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)"
    }
};

/**
 * Gerencia a animação de abrir/fechar qualquer popup
 */
export function togglePopupAnimation(show, elements) {
    const { popup, btnContainer, googleLine, focusElement } = elements;
    const btn = btnContainer ? btnContainer.querySelector('button') : null;

    // Garante que o CSS da borda colorida exista na página
    // (Pode importar 'injectGoogleAnimationStyles' do utils ou chamar 'triggerGoogleAnimation' uma vez)
    // Se não conseguir importar, o CSS deve estar garantido pelo init do app.

    if (show) {
        // --- ABRIR ---
        if (btn) {
            Object.assign(btn.style, animationStyles.btnActive);
            // ADICIONA A CLASSE DA BORDA COLORIDA
            btn.classList.add('google-active-state'); 
        }
        
        popup.style.opacity = "1";
        popup.style.pointerEvents = "auto";
        popup.style.transform = "scale(1)";

        if (googleLine) {
            setTimeout(() => { googleLine.style.transform = "scaleX(1)"; }, 100);
        }
        if (focusElement) {
            setTimeout(() => focusElement.focus(), 100);
        }

    } else {
        // --- FECHAR ---
        if (googleLine) googleLine.style.transform = "scaleX(0)";

        popup.style.opacity = "0";
        popup.style.pointerEvents = "none";
        popup.style.transform = "scale(0.05)"; 

        if (btn) {
            // REMOVE A CLASSE DA BORDA COLORIDA
            btn.classList.remove('google-active-state');
            
            setTimeout(() => {
                 Object.assign(btn.style, animationStyles.btnVisible);
                 btn.style.boxShadow = ""; 
            }, 100);
        }
    }
}