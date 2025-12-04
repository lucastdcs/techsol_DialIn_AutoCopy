// src/modules/shared/command-center.js

// Ícones SVG
const ICONS = {
    notes: `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`
};

const COLORS = {
    // TEMA DARK GLASS (Restaurado)
    glassBg: 'rgba(28, 28, 30, 0.90)', 
    glassBorder: 'rgba(255, 255, 255, 0.15)',
    glassActive: 'rgba(40, 40, 40, 0.95)', // Mais sólido ao arrastar
    glassHighlight: 'rgba(255, 255, 255, 0.1)',
    
    iconIdle: '#E8EAED', // Branco Gelo
    iconActive: '#FFFFFF',
    
    gripColor: '#5F6368',
    gripActive: '#8AB4F8', // Azul ao agarrar

    blue: '#8AB4F8', red: '#F28B82', purple: '#C58AF9', green: '#81C995',
    readyGlow: 'rgba(52, 168, 83, 0.8)'
};

const esperar = (ms) => new Promise(r => setTimeout(r, ms));

export function initCommandCenter(actions) {
    // actions = { toggleNotes, toggleEmail, toggleScript, toggleLinks }

    // 1. ESTILOS
    if (!document.getElementById('cw-command-center-style')) {
        const style = document.createElement('style');
        style.id = 'cw-command-center-style';
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 12px 6px 16px 6px;
                
                /* Dark Glass Theme */
                background: ${COLORS.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${COLORS.glassBorder}; 
                border-radius: 50px;
                
                /* Sombra Profunda */
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                
                z-index: 2147483647; cursor: grab;
                user-select: none;
                width: 54px; box-sizing: border-box;

                /* Estado Inicial */
                opacity: 0; transform: translateX(40px) scale(0.95);
                
                /* Transições de UI (Hover, Cor) */
                transition: 
                    background 0.3s ease,
                    box-shadow 0.3s ease,
                    border-color 0.3s ease,
                    /* Transições de Posição (Entrada/Saída) */
                    opacity 0.4s ease-out,
                    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
                    top 0.1s linear, left 0.1s linear;
            }

            /* DOCKED */
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            /* SYSTEM READY (Pulso Verde) */
            .cw-pill.system-ready { animation: systemReadyPulse 0.8s ease-out forwards; }
            @keyframes systemReadyPulse {
                0% { border-color: ${COLORS.green}; box-shadow: 0 0 0 0 ${COLORS.readyGlow}; }
                100% { border-color: ${COLORS.glassBorder}; box-shadow: 0 0 0 15px rgba(0,0,0,0); }
            }

            /* DRAGGING (Crucial: Remove transições de movimento) */
            .cw-pill.dragging {
                cursor: grabbing; 
                background: ${COLORS.glassActive}; 
                transform: scale(1.05) !important; 
                box-shadow: 0 20px 50px rgba(0,0,0,0.6);
                border-color: rgba(255,255,255,0.3);
                /* Desativa transição de top/left para ficar 1:1 com o mouse */
                transition: background 0.2s, box-shadow 0.2s; 
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${COLORS.gripActive}; width: 18px; }

            /* SNAPPING */
            .cw-pill.snapping { 
                transition: left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease; 
            }

            /* GRIP */
            .cw-grip-area { width: 100%; height: 16px; display: flex; align-items: center; justify-content: center; cursor: grab; margin-bottom: 4px; }
            .cw-grip-area:hover .cw-grip-bar { background-color: #E8EAED; }
            .cw-grip-bar { width: 20px; height: 4px; background-color: ${COLORS.gripColor}; border-radius: 4px; transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); }

            /* BUTTONS */
            .cw-btn {
                width: 42px; height: 42px; border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;
                color: ${COLORS.iconIdle};
                
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }

            .cw-btn:hover { background: ${COLORS.glassHighlight}; color: ${COLORS.iconActive}; transform: scale(1.15); }
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; }

            .cw-btn.notes:hover { color: ${COLORS.blue}; text-shadow: 0 0 10px ${COLORS.blue}; }
            .cw-btn.email:hover { color: ${COLORS.red}; text-shadow: 0 0 10px ${COLORS.red}; }
            .cw-btn.script:hover { color: ${COLORS.purple}; text-shadow: 0 0 10px ${COLORS.purple}; }
            .cw-btn.links:hover { color: ${COLORS.green}; text-shadow: 0 0 10px ${COLORS.green}; }

            /* SEP */
            .cw-sep { width: 24px; height: 1px; background: rgba(255,255,255,0.1); margin: 2px 0; opacity: 0; transition: opacity 0.5s; }
            .cw-sep.visible { opacity: 1; }

            /* TOOLTIPS (Dark Mode) */
            .cw-btn::after { 
                content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); padding: 6px 12px; border-radius: 6px; 
                background: #E8EAED; color: #202124; /* Fundo Claro p/ contraste */
                font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; opacity: 0; pointer-events: none; 
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
    pill.innerHTML = `
        <div class="cw-grip-area" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" data-label="Case Notes">${ICONS.notes}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn email" data-label="Quick Email">${ICONS.email}</button>
        <button class="cw-btn script" data-label="Call Script">${ICONS.script}</button>
        <button class="cw-btn links" data-label="Links">${ICONS.links}</button>
    `;
    document.body.appendChild(pill);

    // 3. EVENTOS
    pill.querySelector('.notes').onclick = (e) => { e.stopPropagation(); actions.toggleNotes(); };
    pill.querySelector('.email').onclick = (e) => { e.stopPropagation(); actions.toggleEmail(); };
    pill.querySelector('.script').onclick = (e) => { e.stopPropagation(); actions.toggleScript(); };
    pill.querySelector('.links').onclick = (e) => { e.stopPropagation(); actions.toggleLinks(); };

    // 4. PHYSICS ENGINE (Drag & Snap)
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    const DRAG_THRESHOLD = 3; 
    const grip = pill.querySelector('.cw-grip-area');

    // Drag em toda a barra (exceto botões)
    pill.onmousedown = (e) => {
        if (e.target.closest('button')) return;
        
        e.preventDefault();
        startX = e.clientX; startY = e.clientY;
        const rect = pill.getBoundingClientRect();
        initialLeft = rect.left; initialTop = rect.top;

        // --- FIX PARA NÃO SUMIR ---
        pill.classList.add('dragging');
        pill.classList.remove('snapping', 'docked');
        
        // Zera o transform para que left/top funcionem como coordenadas absolutas reais
        pill.style.transform = 'none'; 
        pill.style.left = initialLeft + 'px';
        pill.style.top = initialTop + 'px';
        pill.style.right = 'auto';

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
            pill.classList.remove('dragging');
            pill.classList.add('snapping');

            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const rect = pill.getBoundingClientRect();
            const centerX = rect.left + (rect.width / 2);

            // Snap Horizontal
            let targetLeft;
            if (centerX < screenW / 2) {
                targetLeft = 24;
                pill.classList.remove('side-right'); pill.classList.add('side-left');
            } else {
                targetLeft = screenW - rect.width - 24;
                pill.classList.remove('side-left'); pill.classList.add('side-right');
            }

            // Snap Vertical
            let targetTop = rect.top;
            if (targetTop < 24) targetTop = 24;
            if (targetTop > screenH - rect.height - 24) targetTop = screenH - rect.height - 24;

            pill.style.left = `${targetLeft}px`;
            pill.style.top = `${targetTop}px`;
            
            // Re-ativa transform para animações futuras (opcional, mas bom para consistência)
            setTimeout(() => {
                pill.style.transform = ''; 
            }, 600);
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // 5. ANIMAÇÃO DE ENTRADA
    async function animateEntry() {
        // Espera a Splash Screen (2.6s)
        await esperar(2600);

        // 1. Docking
        pill.classList.add('docked');
        await esperar(300);

        // 2. Cascata
        const items = pill.querySelectorAll('.cw-btn');
        const seps = pill.querySelectorAll('.cw-sep');
        seps.forEach(s => s.classList.add('visible'));
        
        for (let i = 0; i < items.length; i++) {
            items[i].classList.add('popped');
            await esperar(60);
        }

        // 3. System Ready
        await esperar(200);
        pill.classList.add('system-ready');
    }

    animateEntry();
}