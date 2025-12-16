// src/modules/shared/animations.js

import { SoundManager } from "./sound-manager.js";
// 1. INJEÇÃO DE ESTILOS (CSS do Módulo + Animações)
if (!document.getElementById('cw-module-styles')) {
    const style = document.createElement('style');
    style.id = 'cw-module-styles';
    style.innerHTML = `
        /* MÓDULO BASE (Estado Ativo/Normal) */
        .cw-module-window {
            transition: 
                opacity 0.3s ease,
                transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), 
                background 0.3s ease,
                backdrop-filter 0.3s ease,
                box-shadow 0.3s ease;
            
            opacity: 0; 
            pointer-events: none;
            transform: scale(0.05);
            
            /* Visual Ceramic Light (Sólido quando ativo para leitura fácil) */
            background: rgba(248, 249, 250, 0.95); /* Quase sólido */
            backdrop-filter: blur(20px) saturate(180%); /* Blur pesado (Apple Material) */
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            
            box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 16px;
            overflow: hidden;
            font-family: 'Google Sans', Roboto, sans-serif;
        }

        /* ESTADO ABERTO (Foco Total) */
        .cw-module-window.open {
            opacity: 1; 
            transform: scale(1); 
            pointer-events: auto;
            /* Sombra flutuante */
            box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.25);
            border-color: rgba(255, 255, 255, 0.8);
        }

        /* --- O EFEITO APPLE GLASS (IDLE) --- */
        .cw-module-window.idle {
            /* 1. Recua fisicamente */
            transform: scale(0.96) translateY(4px); 
            
            /* 2. Vidro Transparente */
            /* Aqui está o segredo: diminuímos a opacidade do BRANCO, não do elemento todo */
            background: rgba(255, 255, 255, 0.40); 
            
            /* 3. Aumentamos o Blur do fundo para destacar o que está atrás */
            backdrop-filter: blur(8px) saturate(100%);
            -webkit-backdrop-filter: blur(8px) saturate(100%);
            
            /* 4. Removemos a sombra pesada (encostou na mesa) */
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            
            /* 5. Borda sutil para definir o vidro */
            border: 1px solid rgba(255, 255, 255, 0.2);
            
            /* Opacidade geral cai um pouco para o texto ficar cinza */
            opacity: 0.85; 
            
            cursor: pointer;
            z-index: 100 !important; /* Garante que fique atrás */
        }

        /* Hover no Idle: Convida o usuário a clicar */
        .cw-module-window.idle:hover {
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0.97) translateY(4px);
            opacity: 0.95;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Gerencia a animação Genie e o Foco
 */
export function toggleGenieAnimation(show, popup, buttonId) {
    const btn = document.getElementById(buttonId);
    if (!popup) return;

    // Verifica se é a primeira vez (Centro) ou se já foi movido (Customizado)
    const isCustomPosition = popup.getAttribute("data-moved") === "true";

    // 1. ONDE ESTÁ O BOTÃO? (Origem)
    let btnCenter = { x: 0, y: 0 };
    if (btn) {
        const btnRect = btn.getBoundingClientRect();
        btnCenter.x = btnRect.left + (btnRect.width / 2);
        btnCenter.y = btnRect.top + (btnRect.height / 2);
    }

    // 2. ONDE É O DESTINO?
    let destX, destY;

    if (!isCustomPosition) {
        // CASO A: Primeira vez -> Centro da Tela
        destX = window.innerWidth / 2;
        destY = window.innerHeight / 2;
    } else {
        // CASO B: Já foi movido -> Posição Atual do DOM
        // Pegamos o boundingBox atual (mesmo oculto, ele guarda a posição top/left setada pelo drag)
        const rect = popup.getBoundingClientRect();
        
        // O centro do popup na posição onde ele foi deixado
        destX = rect.left + (rect.width / 2);
        destY = rect.top + (rect.height / 2);
        
        // Fallback de segurança: Se por algum motivo as coordenadas forem 0 (bug de display none)
        // forçamos voltar ao centro para não quebrar.
        if (destX === 0 && destY === 0) {
            destX = window.innerWidth / 2;
            destY = window.innerHeight / 2;
        }
    }

    // 3. CALCULA O DELTA (Distância do voo)
    const deltaX = btnCenter.x - destX;
    const deltaY = btnCenter.y - destY;

    if (show) {
        // --- ABRIR ---
        SoundManager.playGenieOpen();

        // A. RESET INSTANTÂNEO
        popup.style.transition = 'none';
        popup.style.opacity = '0';
        popup.style.pointerEvents = 'auto';

        // B. POSIÇÃO DE PARTIDA (NO BOTÃO)
        if (!isCustomPosition) {
            // Se for centralizado, precisamos manter o offset de -50%
            popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.05)`;
        } else {
            // Se for posição fixa (drag), NÃO usamos translate -50%
            popup.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.05)`;
        }

        // C. REFLOW
        void popup.offsetWidth;

        // D. ANIMAÇÃO DE ENTRADA
        requestAnimationFrame(() => {
            popup.classList.add('open'); // Suas classes de controle
            if (btn) btn.classList.add('active');

            // Física Apple
            popup.style.transition = "opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)";
            popup.style.opacity = '1';

            // POSIÇÃO FINAL (DESTINO)
            if (!isCustomPosition) {
                // Volta para o centro perfeito
                popup.style.transform = "translate(-50%, -50%) scale(1)";
            } else {
                // Fica onde o top/left mandam (sem offset de translate)
                popup.style.transform = "translate(0, 0) scale(1)";
            }
        });
        
        // Listeners (Idle, etc)
        if (typeof setupIdleListener === 'function') setupIdleListener(popup, buttonId);

    } else {
        // --- FECHAR ---
SoundManager.playSwoosh();
        // A. CONFIGURA SAÍDA
        popup.style.transition = "opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)";
        popup.style.pointerEvents = 'none';

        // B. ANIMAÇÃO DE SAÍDA (VOLTA PRO BOTÃO)
        requestAnimationFrame(() => {
            popup.style.opacity = '0';
            
            if (!isCustomPosition) {
                popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.1)`;
            } else {
                popup.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1)`;
            }
        });

        // C. LIMPEZA
        setTimeout(() => {
            popup.classList.remove('open');
            if (btn) btn.classList.remove('active');
            
            // Limpa estilos
            popup.style.transition = '';
            popup.style.transform = ''; 
            // IMPORTANTE: Não limpamos top/left aqui, para a memória persistir
        }, 300);

        if (typeof removeIdleListener === 'function') removeIdleListener(popup);
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