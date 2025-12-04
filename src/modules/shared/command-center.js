// src/modules/shared/command-center.js

// Ícones SVG
const ICONS = {
    notes: `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`
};

const COLORS = {
    // Dark Glass Profundo
    glassBg: 'rgba(28, 28, 30, 0.85)', 
    glassBorder: 'rgba(255, 255, 255, 0.15)',
    glassActive: 'rgba(45, 45, 48, 0.95)', // Mais sólido ao arrastar
    glassHighlight: 'rgba(255, 255, 255, 0.1)',
    
    iconIdle: '#E8EAED', 
    iconActive: '#FFFFFF',
    
    gripColor: '#5F6368',
    gripActive: '#8AB4F8', // Azul Google

    blue: '#8AB4F8', red: '#F28B82', purple: '#C58AF9', green: '#81C995',
    readyGlow: 'rgba(52, 168, 83, 0.8)'
};

const esperar = (ms) => new Promise(r => setTimeout(r, ms));

export function initCommandCenter(actions) {
    
    // 1. ESTILOS
    if (!document.getElementById('cw-command-center-style')) {
        const style = document.createElement('style');
        style.id = 'cw-command-center-style';
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 14px 6px 16px 6px;
                
                /* Glassmorphism Luxuoso */
                background: ${COLORS.glassBg};
                backdrop-filter: blur(16px) saturate(180%);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid ${COLORS.glassBorder}; 
                border-radius: 50px;
                
                /* Sombra de Alta Elevação */
                box-shadow: 0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
                
                z-index: 2147483647; cursor: grab;
                user-select: none; width: 54px; box-sizing: border-box;

                /* Estado Inicial */
                opacity: 0; transform: translateX(60px) scale(0.95);
                
                /* Transições Suaves (Quando NÃO está arrastando) */
                transition: 
                    background 0.3s ease,
                    box-shadow 0.3s ease,
                    opacity 0.4s ease-out,
                    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
                    top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), /* Snap elástico */
                    left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            /* ESTADOS VISUAIS */
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            /* SYSTEM READY (Pulso Verde) */
            .cw-pill.system-ready { animation: systemReadyPulse 0.8s ease-out forwards; }
            @keyframes systemReadyPulse {
                0% { border-color: ${COLORS.green}; box-shadow: 0 0 0 0 ${COLORS.readyGlow}; }
                100% { border-color: ${COLORS.glassBorder}; box-shadow: 0 0 0 15px rgba(0,0,0,0); }
            }

            /* DRAGGING (CRUCIAL: Mata transições de movimento para não travar) */
            .cw-pill.dragging {
                cursor: grabbing; 
                background: ${COLORS.glassActive}; 
                transform: scale(1.05) !important; 
                box-shadow: 0 20px 60px rgba(0,0,0,0.7);
                border-color: rgba(255,255,255,0.3);
                
                /* A mágica: desliga a animação de posição durante o arrasto */
                transition: background 0.2s, box-shadow 0.2s, transform 0.1s !important; 
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${COLORS.gripActive}; width: 18px; }

            /* O GRIP (Alça estilo Google) */
            .cw-grip-area { 
                width: 100%; height: 20px; 
                display: flex; align-items: center; justify-content: center; 
                cursor: grab; margin-bottom: 2px;
            }
            .cw-grip-bar { 
                width: 24px; height: 4px; 
                background-color: ${COLORS.gripColor}; 
                border-radius: 4px; 
                transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
            }
            .cw-grip-area:hover .cw-grip-bar { background-color: #E8EAED; }

            /* ÍCONES */
            .cw-btn {
                width: 42px; height: 42px; border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;
                color: ${COLORS.iconIdle};
                opacity: 0; transform: scale(0.5); /* Entrada cascata */
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }
            .cw-btn:hover { background: ${COLORS.glassHighlight}; color: ${COLORS.iconActive}; transform: scale(1.15); }
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; }
            
            /* Cores Marca */
            .cw-btn.notes:hover { color: ${COLORS.blue}; text-shadow: 0 0 10px ${COLORS.blue}; }
            .cw-btn.email:hover { color: ${COLORS.red}; text-shadow: 0 0 10px ${COLORS.red}; }
            .cw-btn.script:hover { color: ${COLORS.purple}; text-shadow: 0 0 10px ${COLORS.purple}; }
            .cw-btn.links:hover { color: ${COLORS.green}; text-shadow: 0 0 10px ${COLORS.green}; }

            /* Divisor */
            .cw-sep { width: 24px; height: 1px; background: rgba(255,255,255,0.1); margin: 2px 0; opacity: 0; transition: opacity 0.5s; }
            .cw-sep.visible { opacity: 1; }

            /* Tooltips */
            .cw-btn::after { 
                content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); padding: 6px 12px; border-radius: 6px; 
                background: #E8EAED; color: #202124; font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; opacity: 0; pointer-events: none; 
                transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1); box-shadow: 0 4px 12px rgba(0,0,0,0.4); white-space: nowrap; 
            }
            .cw-pill.side-right .cw-btn::after { right: 60px; transform-origin: right center; }
            .cw-pill.side-right .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
            .cw-pill.side-left .cw-btn::after { left: 60px; transform-origin: left center; }
            .cw-pill.side-left .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
        `;
        document.head.appendChild(style);
    }

    // 2. DOM
    const pill = document.createElement('div');
    pill.className = 'cw-pill side-right';
    
    // Grip agora é uma Barra (não ícone)
    pill.innerHTML = `
        <div class="cw-grip-area" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" data-label="Case Notes">${ICONS.notes}</button>
        <button class="cw-btn email" data-label="Quick Email">${ICONS.email}</button>
        <button class="cw-btn script" data-label="Call Script">${ICONS.script}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn links" data-label="Links">${ICONS.links}</button>
    `;
    document.body.appendChild(pill);

    // 3. EVENTOS
    pill.querySelector('.notes').onclick = (e) => { e.stopPropagation(); actions.toggleNotes(); };
    pill.querySelector('.email').onclick = (e) => { e.stopPropagation(); actions.toggleEmail(); };
    pill.querySelector('.script').onclick = (e) => { e.stopPropagation(); actions.toggleScript(); };
    pill.querySelector('.links').onclick = (e) => { e.stopPropagation(); actions.toggleLinks(); };

    // 4. ANIMAÇÃO DE ENTRADA
    async function animateEntry() {
        await esperar(2600); 

        // A. Docking
        pill.classList.add('docked');
        await esperar(300);

        // B. Cascata
        const items = pill.querySelectorAll('.cw-btn');
        const seps = pill.querySelectorAll('.cw-sep');
        seps.forEach(s => s.classList.add('visible'));
        
        for (let i = 0; i < items.length; i++) {
            items[i].classList.add('popped');
            await esperar(60);
        }

        // C. System Ready
        await esperar(200);
        pill.classList.add('system-ready');
    }
    animateEntry();

    // 5. DRAG ENGINE (Imantado & Seguro)
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    const DRAG_THRESHOLD = 3; 

    pill.onmousedown = (e) => {
        if (e.target.closest('button')) return;
        
        e.preventDefault();
        startX = e.clientX; startY = e.clientY;
        
        // Pega posição atual exata visualmente
        const rect = pill.getBoundingClientRect();
        initialLeft = rect.left; 
        initialTop = rect.top;

        // --- TRAVA DE SEGURANÇA ---
        // 1. Remove classes de animação CSS para não interferir
        pill.classList.remove('snapping', 'docked', 'system-ready');
        pill.classList.add('dragging');
        
        // 2. Trava o CSS Transition no estilo inline
        pill.style.transition = 'none'; 

        // 3. Define posição absoluta fixa (mata o transform e o right)
        pill.style.transform = 'none';
        pill.style.left = initialLeft + 'px';
        pill.style.top = initialTop + 'px';
        pill.style.right = 'auto';
        pill.style.bottom = 'auto';
        
        // 4. Força reflow para garantir que o navegador entendeu
        void pill.offsetWidth;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    function onMouseMove(e) {
        if (!isDragging && Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2)) > DRAG_THRESHOLD) {
            isDragging = true;
        }
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            pill.style.left = `${initialLeft + dx}px`;
            pill.style.top = `${initialTop + dy}px`;
        }
    }

    function onMouseUp(e) {
        if (isDragging) {
            isDragging = false;
            
            // --- REATIVA A FÍSICA ---
            pill.style.transition = ''; // Devolve o controle para o CSS
            pill.classList.remove('dragging');
            pill.classList.add('snapping'); // Ativa a curva elástica

            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const rect = pill.getBoundingClientRect();
            const centerX = rect.left + (rect.width / 2);

            // Magnetismo Horizontal (Direita/Esquerda)
            let targetLeft;
            if (centerX < screenW / 2) {
                targetLeft = 24;
                pill.classList.remove('side-right'); pill.classList.add('side-left');
            } else {
                targetLeft = screenW - rect.width - 24;
                pill.classList.remove('side-left'); pill.classList.add('side-right');
            }

            // Limites Verticais
            let targetTop = rect.top;
            if (targetTop < 24) targetTop = 24;
            if (targetTop > screenH - rect.height - 24) targetTop = screenH - rect.height - 24;

            pill.style.left = `${targetLeft}px`;
            pill.style.top = `${targetTop}px`;
            
            // Limpa o transform inline após a animação acabar (opcional, mas bom para limpeza)
            setTimeout(() => pill.style.transform = '', 600);
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}