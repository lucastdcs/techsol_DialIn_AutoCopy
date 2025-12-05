// src/modules/shared/animations.js

// 1. INJEÇÃO DE ESTILOS (CSS do Módulo + Animações)
if (!document.getElementById('cw-module-styles')) {
    const style = document.createElement('style');
    style.id = 'cw-module-styles';
    style.innerHTML = `
        /* MÓDULO BASE */
        .cw-module-window {
            /* Animação Apple Spring (Ida e Volta) */
            transition: 
                opacity 0.3s ease,
                transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), 
                filter 0.3s ease,
                box-shadow 0.3s ease;
            
            opacity: 0; 
            pointer-events: none;
            transform: scale(0.05); /* Começa dentro do botão */
            
            /* Visual Ceramic Light */
            background: rgba(255, 255, 255, 0.98); /* Quase sólido */
            backdrop-filter: blur(12px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 16px;
            overflow: hidden;
            
            /* Fonte Base */
            font-family: 'Google Sans', Roboto, sans-serif;
        }

        /* ESTADO ABERTO (Ativo) */
        .cw-module-window.open {
            opacity: 1; 
            transform: scale(1); 
            pointer-events: auto;
            filter: brightness(1);
            /* Sombra alta */
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }

        /* ESTADO IDLE (Segundo Plano) */
        .cw-module-window.idle {
            /* FIX DO DESLOCAMENTO: */
            /* Scale muito sutil (0.99) para não "puxar" para o lado */
            transform: scale(0.99); 
            
            /* O efeito vem daqui: */
            opacity: 0.9;
            filter: grayscale(0.1); /* Perde um pouco a cor */
            box-shadow: 0 5px 15px rgba(0,0,0,0.1); /* Sombra cai (encostou na mesa) */
            
            cursor: pointer; /* Indica clicável */
        }
    `;
    document.head.appendChild(style);
}

/**
 * Gerencia a animação Genie e o Foco
 */
export function toggleGenieAnimation(show, popup, buttonId) {
    const btn = document.getElementById(buttonId);
    
    // Adiciona classe base se faltar
    if (!popup.classList.contains('cw-module-window')) {
        popup.classList.add('cw-module-window');
    }

    // Função matemática da origem
    const updateOrigin = () => {
        if (!btn) return;
        const btnRect = btn.getBoundingClientRect();
        
        const startX = btnRect.left + (btnRect.width / 2);
        const startY = btnRect.top + (btnRect.height / 2);
        
        const endX = popup.offsetLeft; 
        const endY = popup.offsetTop;
        
        const originX = startX - endX;
        const originY = startY - endY;
        
        popup.style.transformOrigin = `${originX}px ${originY}px`;
    };

    if (show) {
        // --- ABRIR ---
        
        // 1. Calcula origem fresca
        updateOrigin();
        
        // 2. Limpa estilos inline que possam bloquear (ex: opacity: 0 manual)
        popup.style.opacity = ''; 
        popup.style.pointerEvents = ''; 
        popup.style.transform = ''; 

        // 3. Aplica Classes
        // Força reflow
        void popup.offsetWidth;
        popup.classList.add('open');
        popup.classList.remove('idle');
        
        if (btn) btn.classList.add('active');
        
        // 4. Liga o detector de Idle
        setupIdleListener(popup, buttonId);

    } else {
        // --- FECHAR ---
        
        // 1. Recalcula origem (caso a pílula tenha movido)
        updateOrigin();
        
        // 2. Limpa TUDO (Fix do botão não fechar)
        popup.classList.remove('open');
        popup.classList.remove('idle'); // Remove idle para não conflitar
        
        if (btn) btn.classList.remove('active');

        // 3. Mata o listener de idle
        removeIdleListener(popup);
    }
}

// --- GERENCIAMENTO DE FOCO (IDLE SYSTEM) ---

function setupIdleListener(popup, buttonId) {
    // Remove anterior para não acumular
    removeIdleListener(popup);

    const handler = (e) => {
        // Se o popup já fechou, aborta
        if (!popup.classList.contains('open')) return;

        const clickInModule = popup.contains(e.target);
        // Verifica se clicou na Pílula inteira (para não dar idle enquanto arrasta ou clica em outro)
        const pill = document.querySelector('.cw-pill');
        const clickInPill = pill && pill.contains(e.target);

        if (clickInModule) {
            // Clicou no módulo: FOCA
            popup.classList.remove('idle');
            popup.style.zIndex = '2147483648'; // Traz pra frente
        } else if (clickInPill) {
            // Clicou na pílula: 
            // NÃO faz nada aqui. O evento de click do botão vai cuidar de fechar.
            // Se colocarmos 'idle' aqui, ele briga com o toggle de fechar.
        } else {
            // Clicou no vazio: IDLE
            popup.classList.add('idle');
            popup.style.zIndex = '2147483646'; // Recua
        }
    };
    
    popup._idleHandler = handler;
    document.addEventListener('mousedown', handler);
}

function removeIdleListener(popup) {
    if (popup._idleHandler) {
        document.removeEventListener('mousedown', popup._idleHandler);
        popup._idleHandler = null;
    }
}