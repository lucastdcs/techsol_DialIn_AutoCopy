// src/modules/shared/animations.js
import { SoundManager } from "./sound-manager.js";

// ============================================================
// 1. INJEÇÃO DE ESTILOS (Hot-Reload Safe)
// ============================================================
const styleId = 'cw-module-styles';
const existingStyle = document.getElementById(styleId);
if (existingStyle) existingStyle.remove(); // Garante que o CSS atualize

const style = document.createElement('style');
style.id = styleId;
style.innerHTML = `
    /* MÓDULO BASE (Estado Ativo/Normal) */
    .cw-module-window {
        /* Transição Suave para Background e Filtros (Idle) */
        transition: 
            opacity 0.3s ease,
            transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), 
            background 0.3s ease,
            backdrop-filter 0.3s ease,
            box-shadow 0.3s ease;
        
        opacity: 0; 
        pointer-events: none;
        transform: scale(0.05);
        
        /* Visual Ceramic Light (Sólido quando ativo) */
        background: rgba(248, 249, 250, 0.98); 
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        
        box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 16px;
        overflow: hidden;
        font-family: 'Google Sans', Roboto, sans-serif;
        z-index: 9999;
    }

    /* ESTADO ABERTO (Foco Total) */
    .cw-module-window.open {
        opacity: 1; 
        transform: scale(1); 
        pointer-events: auto;
        box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.25);
    }

    /* --- O EFEITO APPLE GLASS (IDLE) --- */
    .cw-module-window.idle {
        /* Recua e fica translúcido */
        transform: scale(0.96) translateY(4px) !important; 
        
        /* Vidro Transparente */
        background: rgba(255, 255, 255, 0.40) !important; 
        
        /* Desfoque de fundo mais suave para integrar */
        backdrop-filter: blur(8px) saturate(100%) !important;
        -webkit-backdrop-filter: blur(8px) saturate(100%) !important;
        
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        opacity: 0.85 !important;
        
        cursor: pointer;
        z-index: 9900 !important; /* Vai para trás de outros módulos */
    }

    .cw-module-window.idle:hover {
        background: rgba(255, 255, 255, 0.6) !important;
        transform: scale(0.97) translateY(4px) !important;
        opacity: 0.95 !important;
    }
`;
document.head.appendChild(style);


/**
 * Gerencia a animação Genie e o Foco
 */
export function toggleGenieAnimation(show, popup, buttonId) {
    const btn = document.getElementById(buttonId);
    if (!popup) return;

    // IMPORTANTE: Se o popup não tiver a classe, adicionamos agora por segurança
    if (!popup.classList.contains('cw-module-window')) {
        popup.classList.add('cw-module-window');
    }

    const isCustomPosition = popup.getAttribute("data-moved") === "true";

    // 1. ORIGEM
    let btnCenter = { x: 0, y: 0 };
    if (btn) {
        const btnRect = btn.getBoundingClientRect();
        btnCenter.x = btnRect.left + (btnRect.width / 2);
        btnCenter.y = btnRect.top + (btnRect.height / 2);
    }

    // 2. DESTINO
    let destX, destY;
    if (!isCustomPosition) {
        destX = window.innerWidth / 2;
        destY = window.innerHeight / 2;
    } else {
        const rect = popup.getBoundingClientRect();
        destX = rect.left + (rect.width / 2);
        destY = rect.top + (rect.height / 2);
        if (destX === 0) { // Fallback
            destX = window.innerWidth / 2;
            destY = window.innerHeight / 2;
        }
    }

    const deltaX = btnCenter.x - destX;
    const deltaY = btnCenter.y - destY;

    if (show) {
        // --- ABRIR ---
        SoundManager.playGenieOpen();

        // Remove IDLE imediatamente ao abrir
        popup.classList.remove('idle');

        // Reset Instantâneo
        popup.style.transition = 'none';
        popup.style.opacity = '0';
        popup.style.pointerEvents = 'auto';

        if (!isCustomPosition) {
            popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.05)`;
        } else {
            popup.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.05)`;
        }

        void popup.offsetWidth; // Reflow

        requestAnimationFrame(() => {
            popup.classList.add('open');
            if (btn) btn.classList.add('active');

            // Define transição de PULO (Genie)
            popup.style.transition = "opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)";
            popup.style.opacity = '1';

            if (!isCustomPosition) {
                popup.style.transform = "translate(-50%, -50%) scale(1)";
            } else {
                popup.style.transform = "translate(0, 0) scale(1)";
            }

            // [PULO DO GATO] Limpa a transição inline após o pulo terminar.
            // Isso devolve o controle para o CSS (.cw-module-window), permitindo
            // que a transição de background/blur do IDLE funcione depois.
            setTimeout(() => {
                popup.style.transition = ""; 
            }, 500);
        });
        
        setupIdleListener(popup, buttonId);

    } else {
        // --- FECHAR ---
        SoundManager.playSwoosh();
        
        // Remove Idle ao fechar também
        popup.classList.remove('idle');

        // Transição de Saída
        popup.style.transition = "opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)";
        popup.style.pointerEvents = 'none';

        requestAnimationFrame(() => {
            popup.style.opacity = '0';
            popup.classList.remove('open'); // Remove classe open para ajudar CSS
            
            if (!isCustomPosition) {
                popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.1)`;
            } else {
                popup.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1)`;
            }
        });

        setTimeout(() => {
            if (btn) btn.classList.remove('active');
            popup.style.transition = '';
            popup.style.transform = ''; 
        }, 300);

        removeIdleListener(popup);
    }
}

// --- IDLE SYSTEM ---
function setupIdleListener(popup, buttonId) {
    removeIdleListener(popup);

    const handler = (e) => {
        if (!popup.classList.contains('open')) return;

        const clickInModule = popup.contains(e.target);
        const pill = document.querySelector('.cw-pill');
        const clickInPill = pill && pill.contains(e.target);

        // Se clicar no módulo ou arrastando, foca
        if (clickInModule) {
            popup.classList.remove('idle');
            popup.style.zIndex = '10000'; 
        } else if (!clickInPill) {
            // Se clicar fora (e não for na pílula), ativa Idle Glass
            popup.classList.add('idle');
            // Z-index é controlado pelo CSS do .idle
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