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
            background: #F8F9FA;
            backdrop-filter: blur(12px);
            box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
            border: 1px solid rgba(0, 0, 0, 0.12);
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
            filter: brightness(0.96) saturate(0.5);
            border-color: rgba(0, 0, 0, 0.2);
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
    
    // 1. Cálculos de Geometria (Onde estou vs Onde vou)
    // Precisamos disso para saber a rota de voo exata
    let deltaX = 0;
    let deltaY = 0;

    if (btn) {
        const btnRect = btn.getBoundingClientRect();
        const btnCenter = {
            x: btnRect.left + (btnRect.width / 2),
            y: btnRect.top + (btnRect.height / 2)
        };
        const screenCenter = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
        // A distância que o módulo precisa "viajar" do centro até o botão
        deltaX = btnCenter.x - screenCenter.x;
        deltaY = btnCenter.y - screenCenter.y;
    }

    if (show) {
        // --- ABRIR (Liquid Expansion) ---
        
        // 1. PREPARAÇÃO (Reset Instantâneo)
        // Removemos a transição para "teletransportar" o módulo para dentro do botão
        // sem que o usuário veja o movimento.
        popup.style.transition = 'none';
        popup.style.pointerEvents = 'auto';
        popup.style.opacity = '0';

        // 2. POSICIONAMENTO INICIAL (No Botão)
        // Mantemos o translate(-50%, -50%) do CSS (que centraliza) e SOMAMOS a distância do botão
        // Resultado: O módulo começa desenhado exatamente em cima do botão
        popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.05)`;

        // 3. REFLOW (O "Pulo do Gato")
        // Obriga o navegador a processar o frame "pequeno" AGORA. 
        // Sem isso, ele pularia direto para o frame final.
        void popup.offsetWidth;

        // 4. A ANIMAÇÃO (Lançar ao Centro)
        // Adicionamos a classe 'open' para controles lógicos, mas forçamos o estilo inline
        // para garantir a curva física da Apple.
        popup.classList.add('open');
        popup.classList.remove('idle');
        if (btn) btn.classList.add('active');

        requestAnimationFrame(() => {
            // Curva Líquida: Rápida no início, suave no final (Friction)
            popup.style.transition = "opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)";
            popup.style.opacity = '1';
            // Posição final: Centro da tela (Tamanho normal)
            popup.style.transform = "translate(-50%, -50%) scale(1)";
        });

        // 5. Liga listeners (Mantendo sua lógica original)
        if (typeof setupIdleListener === 'function') {
            setupIdleListener(popup, buttonId);
        }

    } else {
        // --- FECHAR (Suck Back) ---
        
        // 1. Configuração de Saída
        // Curva mais agressiva para dar a sensação de sucção rápida para dentro do botão
        popup.style.transition = "opacity 0.3s ease, transform 0.30s cubic-bezier(0.5, 0, 1, 1)";
        popup.style.pointerEvents = 'none';

        // 2. A Animação
        requestAnimationFrame(() => {
            popup.style.opacity = '0';
            // Volta exatamente para as coordenadas do botão
            popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.1)`;
        });

        // 3. Limpeza Final (Após a animação acabar)
        setTimeout(() => {
            popup.classList.remove('open');
            popup.classList.remove('idle');
            if (btn) btn.classList.remove('active');
            
            // Limpa estilos inline para não poluir
            popup.style.transition = '';
            popup.style.transform = ''; 
        }, 300);

        // 4. Mata listeners
        if (typeof removeIdleListener === 'function') {
            removeIdleListener(popup);
        }
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