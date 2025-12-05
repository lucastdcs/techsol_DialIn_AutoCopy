// src/modules/shared/animations.js

// Injeta os estilos do Módulo (Ceramic Glass & Genie Transitions)
// Isso garante que todos os módulos (Notes, Email, etc) tenham o mesmo visual
if (!document.getElementById('cw-module-styles')) {
    const style = document.createElement('style');
    style.id = 'cw-module-styles';
    style.innerHTML = `
        /* MÓDULO BASE (Comportamento Genie) */
        .cw-module-window {
            /* Animação Apple Spring */
            transition: 
                opacity 0.3s ease,
                transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), 
                filter 0.3s ease,
                box-shadow 0.3s ease;
            
            opacity: 0; 
            pointer-events: none;
            transform: scale(0.05); /* Começa minúsculo */
            
            /* Visual Ceramic Light */
            background: rgba(255, 255, 255, 0.96);
            backdrop-filter: blur(10px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 16px;
            overflow: hidden;
        }

        /* ESTADO ABERTO */
        .cw-module-window.open {
            opacity: 1; 
            transform: scale(1); 
            pointer-events: auto;
            filter: brightness(1);
        }

        /* ESTADO IDLE (Segundo Plano) */
        .cw-module-window.idle {
            transform: scale(0.97) translateY(2px);
            opacity: 0.95;
            filter: brightness(0.97) saturate(0.9); /* Levemente apagado, mas legível */
            box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.2);
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Gerencia a animação Genie (Ida e Volta)
 * @param {boolean} show - Abrir ou Fechar
 * @param {HTMLElement} popup - A janela do módulo
 * @param {string} buttonId - O ID do botão na pílula (ex: 'cw-btn-notes')
 */
export function toggleGenieAnimation(show, popup, buttonId) {
    const btn = document.getElementById(buttonId);
    if (!btn) {
        console.error(`Botão com ID '${buttonId}' não encontrado na Pílula.`);
        return; 
    }

    if (!popup.classList.contains('cw-module-window')) {
        popup.classList.add('cw-module-window');
    }

    const updateOrigin = () => {
        const btnRect = btn.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        
        const startX = btnRect.left + (btnRect.width / 2);
        const startY = btnRect.top + (btnRect.height / 2);
        
        const endX = popup.offsetLeft; 
        const endY = popup.offsetTop;
        
        const originX = startX - endX;
        const originY = startY - endY;
        
        popup.style.transformOrigin = `${originX}px ${originY}px`;
    };

    updateOrigin();
    void popup.offsetWidth; // Reflow

    if (show) {
        // --- FIX DO SUMIÇO ---
        // Removemos os estilos inline que forçam invisibilidade
        // para que a classe CSS '.open' possa assumir o controle.
        popup.style.opacity = ''; 
        popup.style.pointerEvents = ''; 
        popup.style.transform = ''; // Limpa escala inline antiga se houver
        
        popup.classList.add('open');
        popup.classList.remove('idle');
        btn.classList.add('active');
        
        setupIdleListener(popup, btn);
    } else {
        popup.classList.remove('open');
        btn.classList.remove('active');
        
        // Opcional: Se quiser garantir que fique oculto após a animação (timeout)
        // mas geralmente a classe CSS sem .open já resolve (opacity: 0)
    }
}

// Gerenciador de Foco (Singleton simples)
function setupIdleListener(popup, btn) {
    // Remove listener anterior se houver (para não duplicar)
    const handler = (e) => {
        if (!popup.classList.contains('open')) {
            document.removeEventListener('mousedown', handler);
            return;
        }

        const clickInModule = popup.contains(e.target);
        const clickInPill = document.getElementById('techsol-command-center')?.contains(e.target);

        if (clickInModule) {
            popup.classList.remove('idle');
            popup.style.zIndex = '2147483648'; // Traz p/ frente
        } else if (clickInPill) {
            // Nada (o click na pill gerencia o toggle)
        } else {
            popup.classList.add('idle');
            popup.style.zIndex = '2147483646'; // Recua
        }
    };
    
    // Adiciona apenas se não existir (ou remove e adiciona)
    document.removeEventListener('mousedown', popup._idleHandler);
    popup._idleHandler = handler;
    document.addEventListener('mousedown', handler);
}