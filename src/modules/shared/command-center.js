// src/modules/shared/command-center.js

// Ícones SVG (Notes, Email, Script, Links)
const ICONS = {
    notes: `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`
};

const COLORS = {
    glassBg: 'rgba(20, 20, 20, 0.65)', 
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassActive: 'rgba(40, 40, 40, 0.85)',
    iconIdle: '#9AA0A6',
    iconHover: '#FFFFFF',
    blue: '#8AB4F8', red: '#F28B82', purple: '#C58AF9', green: '#81C995'
};

export function initCommandCenter(actions) {
    // actions = { toggleNotes, toggleEmail, toggleScript, toggleLinks }

    // 1. INJEÇÃO DE ESTILOS
    if (!document.getElementById('cw-command-center-style')) {
        const style = document.createElement('style');
        style.id = 'cw-command-center-style';
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');
            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 16px;
                padding: 20px 8px;
                background: ${COLORS.glassBg}; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${COLORS.glassBorder}; border-radius: 50px;
                box-shadow: 0 4px 24px rgba(0,0,0,0.25); z-index: 2147483647; cursor: grab;
                transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s cubic-bezier(0.2, 0, 0, 1);
                user-select: none;
                opacity: 0; transform: translateX(60px); /* Estado inicial escondido */
            }
            .cw-pill.visible { opacity: 1; transform: translateX(0); }
            .cw-pill.dragging { cursor: grabbing; background: ${COLORS.glassActive}; transform: scale(1.05); box-shadow: 0 20px 40px rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.2); }
            .cw-pill.snapping { transition: left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease; }
            
            .cw-grip { display: flex; gap: 4px; color: ${COLORS.iconIdle}; opacity: 0.5; pointer-events: none; }
            .cw-dot { width: 4px; height: 4px; background: currentColor; border-radius: 50%; }
            
            .cw-btn { width: 42px; height: 42px; border-radius: 50%; border: none; background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; color: ${COLORS.iconIdle}; transition: all 0.2s ease; }
            .cw-btn:hover { background: rgba(255,255,255,0.1); color: ${COLORS.iconHover}; transform: scale(1.1); }
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; }
            
            .cw-btn.notes:hover { color: ${COLORS.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${COLORS.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${COLORS.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${COLORS.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
            
            .cw-btn::after { content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); padding: 6px 12px; border-radius: 8px; background: #202124; color: #fff; font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; opacity: 0; pointer-events: none; transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1); border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap; }
            .cw-pill.side-right .cw-btn::after { right: 60px; transform-origin: right center; }
            .cw-pill.side-right .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
            .cw-pill.side-left .cw-btn::after { left: 60px; transform-origin: left center; }
            .cw-pill.side-left .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
            
            .cw-divider { width: 24px; height: 1px; background: rgba(255,255,255,0.1); margin: 4px 0; }
        `;
        document.head.appendChild(style);
    }

    // 2. CRIAÇÃO DO DOM
    const pill = document.createElement('div');
    pill.className = 'cw-pill side-right';
    pill.innerHTML = `
        <div class="cw-grip"><div class="cw-dot"></div><div class="cw-dot"></div></div>
        <div class="cw-divider"></div>
        <button class="cw-btn notes" data-label="Case Notes">${ICONS.notes}</button>
        <button class="cw-btn email" data-label="Quick Email">${ICONS.email}</button>
        <button class="cw-btn script" data-label="Call Script">${ICONS.script}</button>
        <div class="cw-divider"></div>
        <button class="cw-btn links" data-label="Links">${ICONS.links}</button>
    `;
    document.body.appendChild(pill);

    // 3. EVENTOS DE CLIQUE (Ligando aos módulos)
    pill.querySelector('.notes').onclick = (e) => { e.stopPropagation(); actions.toggleNotes(); };
    pill.querySelector('.email').onclick = (e) => { e.stopPropagation(); actions.toggleEmail(); };
    pill.querySelector('.script').onclick = (e) => { e.stopPropagation(); actions.toggleScript(); };
    pill.querySelector('.links').onclick = (e) => { e.stopPropagation(); actions.toggleLinks(); };

    // 4. PHYSICS ENGINE (Drag & Snap)
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    const DRAG_THRESHOLD = 3; 

    pill.onmousedown = (e) => {
        // Se clicar num botão, não inicia drag imediato
        if (e.target.closest('button')) return;
        
        e.preventDefault();
        startX = e.clientX; startY = e.clientY;
        const rect = pill.getBoundingClientRect();
        initialLeft = rect.left; initialTop = rect.top;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    function onMouseMove(e) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (!isDragging && Math.sqrt(dx*dx + dy*dy) > DRAG_THRESHOLD) {
            isDragging = true;
            pill.classList.add('dragging');
            pill.classList.remove('snapping');
        }
        if (isDragging) {
            pill.style.left = `${initialLeft + dx}px`;
            pill.style.top = `${initialTop + dy}px`;
            pill.style.right = 'auto'; pill.style.bottom = 'auto';
        }
    }

    function onMouseUp(e) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (isDragging) {
            isDragging = false;
            pill.classList.remove('dragging');
            pill.classList.add('snapping');
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const rect = pill.getBoundingClientRect();
            const centerX = rect.left + (rect.width / 2);
            let targetLeft = (centerX < screenW / 2) ? 24 : screenW - rect.width - 24;
            if (centerX < screenW / 2) { pill.classList.remove('side-right'); pill.classList.add('side-left'); }
            else { pill.classList.remove('side-left'); pill.classList.add('side-right'); }
            let targetTop = rect.top;
            if (targetTop < 24) targetTop = 24;
            if (targetTop > screenH - rect.height - 24) targetTop = screenH - rect.height - 24;
            pill.style.left = `${targetLeft}px`;
            pill.style.top = `${targetTop}px`;
        }
    }

    // Entrada Suave (Pós Splash)
    // Aguarda um pouco e mostra
    setTimeout(() => pill.classList.add('visible'), 5000);
}