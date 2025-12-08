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
    
    // --- CÁLCULO DA ROTA (DELTA) --
    // Precisamos saber a distância exata entre o centro da tela e o botão
    let deltaX = 0;
    let deltaY = 0;

    if (btn) {
        const btnRect = btn.getBoundingClientRect();
        const screenX = window.innerWidth / 2;
        const screenY = window.innerHeight / 2;
        
        // Centro do botão
        const btnX = btnRect.left + (btnRect.width / 2);
        const btnY = btnRect.top + (btnRect.height / 2);

        deltaX = btnX - screenX;
        deltaY = btnY - screenY;
    }

    if (show) {
        // --- ABRIR (Correção do Cold Start) ---

        // 1. GARANTE RENDERIZAÇÃO INICIAL (Invisível)
        // Primeiro, garantimos que o elemento ocupa espaço no layout, mas totalmente transparente
        popup.style.display = 'flex'; // Garante que não é 'none'
        popup.style.opacity = '0';
        popup.style.transition = 'none'; // Desliga animações para o teleporte
        
        // 2. TELEPORTE (Posição Inicial no Botão)
        // Movemos ele para cima do botão instantaneamente
        popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.05)`;

        // 3. FORÇA O REFLOW (Crucial!)
        // Isso obriga o navegador a "aceitar" a posição acima antes de continuar.
        // Acessar offsetWidth força o navegador a calcular o layout.
        void popup.offsetWidth; 

        // 4. A ANIMAÇÃO (Lançar)
        // Usamos requestAnimationFrame DUPLO para garantir que o frame inicial foi pintado
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Agora ligamos a física
                popup.style.transition = "opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)";
                popup.style.opacity = '1';
                popup.style.pointerEvents = 'auto';
                
                // Destino final (Centro)
                popup.style.transform = "translate(-50%, -50%) scale(1)";
                
                // Ativa estado visual do botão
                if (btn) btn.classList.add('active');
            });
        });

        // Liga listeners se existirem
        if (typeof setupIdleListener === 'function') setupIdleListener(popup, buttonId);

    } else {
        // --- FECHAR ---
        
        // 1. Configura saída
        popup.style.transition = "opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)";
        popup.style.pointerEvents = 'none';

        // 2. Anima de volta para o delta (Botão)
        requestAnimationFrame(() => {
            popup.style.opacity = '0';
            popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.1)`;
        });

        // 3. Limpeza
        if (btn) btn.classList.remove('active');
        
        // Remove listener
        if (typeof removeIdleListener === 'function') removeIdleListener(popup);

        // Aguarda animação terminar para esconder/limpar
        setTimeout(() => {
            // Só esconde display none se necessário pela sua lógica de app, 
            // mas manter opacity 0 é geralmente suficiente e mais performático.
            // popup.style.display = 'none'; 
            
            // Limpa estilos inline para não atrapalhar o Drag & Drop depois
            popup.style.transition = '';
            popup.style.transform = ''; 
        }, 300);
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