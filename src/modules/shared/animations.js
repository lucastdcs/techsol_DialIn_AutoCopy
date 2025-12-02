// src/modules/shared/animations.js

// --- ESTILOS DE ANIMAÇÃO (Google Morph) ---
export const animationStyles = {
    // A linha colorida do Google
    googleLine: {
        height: "3px",
        width: "100%",
        background: "linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",
        transform: "scaleX(0)", 
        transformOrigin: "left center",
        transition: "transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)"
    },
    
    // Estado inicial do Popup
    popupInitial: {
        opacity: "0",
        pointerEvents: "none",
        transform: "scale(0.05)", 
        transformOrigin: "bottom right", // Nasce perto do botão
        transition: "transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.2s linear",
        // Nota: A posição (top/left/right) é controlada pelo módulo, aqui cuidamos da transição
    },

    // --- ESTADO ATIVO DO BOTÃO (A MUDANÇA ESTÁ AQUI) ---
    // Em vez de sumir, ele vira um botão "pressionado" ou "ativo"
    btnActive: {
        transform: "scale(1)",      // Mantém o tamanho
        backgroundColor: "#ffffff", // Fundo Branco
        color: "#5f6368",           // Ícone Cinza Escuro
        boxShadow: "inset 0 0 0 1px #dadce0", // Borda interna sutil
        pointerEvents: "auto"       // Continua clicável (para fechar)
    },
    
    // Estado Normal (Reset)
    // Nota: Não forçamos cor aqui para respeitar a cor original de cada módulo (azul/vermelho/roxo)
    // Apenas resetamos as propriedades transformadas
    btnVisible: {
        transform: "scale(1)",
        opacity: "1",
        pointerEvents: "auto",
        backgroundColor: "", // Reseta para o CSS original do módulo
        color: "",           // Reseta
        boxShadow: ""        // Reseta
    }
};

/**
 * Gerencia a animação de abrir/fechar qualquer popup
 */
export function togglePopupAnimation(show, elements) {
    const { popup, btnContainer, googleLine, focusElement } = elements;

    // Pega o botão real dentro do container para aplicar a cor
    const btn = btnContainer ? btnContainer.querySelector('button') : null;

    if (show) {
        // --- ABRIR ---
        
        // 1. Transforma o botão em "Ativo" (Branco/Cinza)
        if (btn) Object.assign(btn.style, animationStyles.btnActive);
        
        // 2. Expande o Popup
        popup.style.opacity = "1";
        popup.style.pointerEvents = "auto";
        popup.style.transform = "scale(1)";

        // 3. Desenha a linha
        if (googleLine) {
            setTimeout(() => {
                googleLine.style.transform = "scaleX(1)";
            }, 100);
        }

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

        // 3. Restaura o botão para a cor original do módulo
        if (btn) {
            // Usamos setTimeout para sincronizar com o fechamento do popup
            setTimeout(() => {
                 // Remove os estilos inline de 'active' para voltar ao CSS definido no módulo
                 btn.style.backgroundColor = "";
                 btn.style.color = "";
                 btn.style.boxShadow = "";
                 // Reaplica transform scale(1) só pra garantir
                 Object.assign(btn.style, animationStyles.btnVisible);
            }, 100);
        }
    }
}