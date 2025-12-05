// src/modules/shared/command-center.js

const ICONS = {
    notes: `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
};

const COLORS = {
    glassBg: 'rgba(20, 20, 22, 0.85)', // Mais escuro para contraste
    glassBorder: 'rgba(255, 255, 255, 0.12)',
    glassActive: 'rgba(35, 35, 35, 0.95)',
    glassHighlight: 'rgba(255, 255, 255, 0.08)',
    
    iconIdle: '#9AA0A6', 
    iconActive: '#FFFFFF',
    
    gripColor: '#5F6368',
    gripActive: '#8AB4F8',

    blue: '#8AB4F8', red: '#F28B82', purple: '#C58AF9', green: '#81C995',
    readyGlow: 'rgba(138, 180, 248, 0.6)' // Glow azulado mais tecnológico
};

// --- MINI SHERLOCK (Database de Frases) ---
const CONTEXT_PHRASES = {
    dawn:     ["Turno da madrugada?", "O mundo dorme, nós codamos.", "Café reforçado necessário."], // 00h - 05h
    morning:  ["Bom dia. Vamos produzir.", "Foco total hoje.", "Dia de resolver problemas."],        // 06h - 11h
    lunch:    ["Hora da pausa?", "Recarregando energias.", "Mantenha o ritmo."],                     // 12h - 13h
    afternoon:["Tarde produtiva.", "Na reta final.", "Ainda há muito a fazer."],                      // 14h - 18h
    evening:  ["Encerrando por hoje?", "A noite é uma criança.", "Modo noturno ativado."],            // 19h - 23h
    weekend:  ["Trabalhando no finde?", "A dedicação compensa.", "Não esqueça de viver um pouco."]
};

const esperar = (ms) => new Promise(r => setTimeout(r, ms));

export function initCommandCenter(actions) {
    
    // 1. LÓGICA DO CONTEXTO (SHERLOCK)
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Domingo, 6 = Sábado
    
    let timeKey = 'morning';
    if (day === 0 || day === 6) timeKey = 'weekend';
    else if (hour < 6) timeKey = 'dawn';
    else if (hour < 12) timeKey = 'morning';
    else if (hour < 14) timeKey = 'lunch';
    else if (hour < 19) timeKey = 'afternoon';
    else timeKey = 'evening';

    // Escolhe frase aleatória do array
    const phrases = CONTEXT_PHRASES[timeKey];
    const greeting = phrases[Math.floor(Math.random() * phrases.length)];

    // Guardamos isso para usar nos emails depois
    window.sherlockContext = {
        greeting: greeting,
        timeOfDay: timeKey,
        timestamp: now
    };

    // 2. ESTILOS (Reforçados)
    if (!document.getElementById('cw-command-center-style')) {
        const style = document.createElement('style');
        style.id = 'cw-command-center-style';
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 10px;
                padding: 10px 6px 14px 6px;
                
                background: ${COLORS.glassBg};
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid ${COLORS.glassBorder}; 
                border-radius: 50px;
                
                /* Sombra mais difusa e elegante */
                box-shadow: 
                    0 20px 40px -10px rgba(0,0,0,0.6),
                    0 0 1px rgba(255,255,255,0.2) inset;
                
                z-index: 2147483647; 
                user-select: none; width: 52px; box-sizing: border-box;

                opacity: 0; transform: translateX(60px) scale(0.95);
                
                transition: 
                    opacity 0.4s ease-out,
                    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
                    top 0.1s linear, left 0.1s linear;
            }

            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            /* --- CORREÇÃO DO BUG DE SUMIÇO --- */
            /* Quando estiver arrastando, FORÇAMOS a opacidade */
            .cw-pill.dragging {
                opacity: 1 !important; 
                cursor: grabbing; 
                background: ${COLORS.glassActive}; 
                transform: scale(1.02) !important; 
                box-shadow: 0 25px 50px rgba(0,0,0,0.8);
                border-color: rgba(255,255,255,0.2);
                transition: none !important; /* Remove delay ao arrastar */
            }

            /* GRIP BARRA (Visual Clean) */
            .cw-grip-area { 
                width: 100%; height: 24px; 
                display: flex; align-items: center; justify-content: center; 
                cursor: grab; margin-bottom: 2px;
                opacity: 0.5; transition: opacity 0.2s;
            }
            .cw-pill.dragging .cw-grip-area { cursor: grabbing; opacity: 1; }
            .cw-grip-area:hover { opacity: 1; }
            
            .cw-grip-bar { 
                width: 20px; height: 3px; 
                background-color: ${COLORS.gripColor}; 
                border-radius: 4px;
                box-shadow: 0 1px 2px rgba(0,0,0,0.3);
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${COLORS.gripActive}; width: 24px; box-shadow: 0 0 8px ${COLORS.gripActive}; }

            /* ÍCONES */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%;
                border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative;
                color: ${COLORS.iconIdle};
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }
            .cw-btn:hover { 
                background: ${COLORS.glassHighlight}; 
                color: ${COLORS.iconActive}; 
                transform: scale(1.15);
            }
            .cw-btn svg { width: 20px; height: 20px; fill: currentColor; }

            /* Separador */
            .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.1); margin: 4px 0; opacity: 0; }
            .cw-sep.visible { opacity: 1; }

            /* Tooltips Inteligentes */
            .cw-btn::after { 
                content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); 
                padding: 6px 12px; border-radius: 8px; 
                background: rgba(20,20,20, 0.9); border: 1px solid rgba(255,255,255,0.1);
                color: #fff; font-family: 'Google Sans', sans-serif; font-size: 11px; font-weight: 500; 
                opacity: 0; pointer-events: none; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.5); 
                white-space: nowrap; backdrop-filter: blur(4px);
            }
            .cw-pill.side-right .cw-btn::after { right: 55px; transform-origin: right center; }
            .cw-pill.side-left .cw-btn::after { left: 55px; transform-origin: left center; }
            .cw-pill.side-right .cw-btn:hover::after, .cw-pill.side-left .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
        `;
        document.head.appendChild(style);
    }

    // 3. CRIAÇÃO DO ELEMENTO
    const pill = document.createElement('div');
    pill.className = 'cw-pill side-right';
    
    // Injetamos a frase do Sherlock no título do grip
    pill.innerHTML = `
        <div class="cw-grip-area" title="${greeting}">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" data-label="Notas">${ICONS.notes}</button>
        <button class="cw-btn email" data-label="Email">${ICONS.email}</button>
        <button class="cw-btn script" data-label="Script">${ICONS.script}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn links" data-label="Links Úteis">${ICONS.links}</button>
    `;
    document.body.appendChild(pill);

    // Eventos de clique
    pill.querySelector('.notes').onclick = (e) => { e.stopPropagation(); actions.toggleNotes(); };
    pill.querySelector('.email').onclick = (e) => { e.stopPropagation(); actions.toggleEmail(); };
    pill.querySelector('.script').onclick = (e) => { e.stopPropagation(); actions.toggleScript(); };
    pill.querySelector('.links').onclick = (e) => { e.stopPropagation(); actions.toggleLinks(); };

    // 4. ANIMAÇÃO DE ENTRADA (Sequenciada)
    async function animateEntry() {
        await esperar(500); // Pequeno delay inicial
        pill.classList.add('docked');
        
        await esperar(200);
        const items = pill.querySelectorAll('.cw-btn, .cw-sep');
        for (let el of items) {
            el.classList.add('visible', 'popped');
            await esperar(50); // Efeito cascata rápido
        }
    }
    animateEntry();

    // 5. SISTEMA DE ARRASTO (DRAG & SNAP)
    let isDragging = false;
    let startX, startY, shiftX, shiftY;
    const DRAG_THRESHOLD = 3; 

    // O Grip é a área segura para arrastar
    const gripArea = pill.querySelector('.cw-grip-area');

    gripArea.onmousedown = (e) => {
        e.preventDefault(); // Previne seleção de texto
        
        startX = e.clientX; 
        startY = e.clientY;
        
        const rect = pill.getBoundingClientRect();
        shiftX = e.clientX - rect.left;
        shiftY = e.clientY - rect.top;

        // Prepara o elemento para arrasto
        pill.classList.add('dragging');
        pill.classList.remove('snapping', 'docked'); // Remove docked, mas o CSS .dragging segura a opacity
        
        // Fixa a posição atual via JS para não pular
        pill.style.left = rect.left + 'px';
        pill.style.top = rect.top + 'px';
        pill.style.transform = 'none'; // Reseta transforms para controle total via top/left
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    function onMouseMove(e) {
        if (!isDragging && Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2)) > DRAG_THRESHOLD) {
            isDragging = true;
        }

        if (isDragging) {
            let newLeft = e.clientX - shiftX;
            let newTop = e.clientY - shiftY;
            
            // Limites da Tela (IMPORTANTE: Não deixa sair)
            const maxLeft = window.innerWidth - pill.offsetWidth - 10; // 10px de margem
            const maxTop = window.innerHeight - pill.offsetHeight - 10;
            
            newLeft = Math.max(10, Math.min(newLeft, maxLeft));
            newTop = Math.max(10, Math.min(newTop, maxTop));

            pill.style.left = newLeft + 'px';
            pill.style.top = newTop + 'px';
        }
    }

    function onMouseUp(e) {
        if (isDragging) {
            isDragging = false;
            
            pill.classList.remove('dragging');
            pill.classList.add('snapping', 'docked'); // Devolve o docked ao soltar

            // Lógica do Ímã (Snapping Lateral)
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const rect = pill.getBoundingClientRect();
            const centerX = rect.left + (rect.width / 2);

            let targetLeft;
            
            // Decide se vai para esquerda ou direita
            if (centerX < screenW / 2) {
                targetLeft = 20; // Margem esquerda
                pill.classList.remove('side-right'); pill.classList.add('side-left');
            } else {
                targetLeft = screenW - rect.width - 20; // Margem direita
                pill.classList.remove('side-left'); pill.classList.add('side-right');
            }

            // Garante que não fique preso no topo ou rodapé
            let targetTop = rect.top;
            if (targetTop < 20) targetTop = 20;
            if (targetTop > screenH - rect.height - 20) targetTop = screenH - rect.height - 20;

            pill.style.left = `${targetLeft}px`;
            pill.style.top = `${targetTop}px`;
            
            // Limpa o transform após a animação de snap
            setTimeout(() => pill.style.transform = '', 600);
        }
        
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}