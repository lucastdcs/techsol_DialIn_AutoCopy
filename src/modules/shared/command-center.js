// src/modules/shared/command-center.js

const COLORS = {
    glassBg: 'rgba(20, 20, 20, 0.85)', // Vidro escuro e sólido
    glassBorder: 'rgba(255, 255, 255, 0.15)',
    iconIdle: '#9AA0A6',
    // Cores para o "System Check"
    blue: '#8AB4F8', red: '#F28B82', purple: '#C58AF9', green: '#81C995'
};

const esperar = (ms) => new Promise(r => setTimeout(r, ms));

// Ícones (Notes, Email, Script, Links)
const ICONS = {
    grip: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
    notes: `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`
};

export function initCommandCenter(actions) {
    // 1. ESTILOS (Exatamente igual ao console)
    const styleId = 'entry-animation-demo';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            /* --- A BASE (O Vidro) --- */
            .cw-pill-entry {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 16px 8px;
                
                background: ${COLORS.glassBg};
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${COLORS.glassBorder};
                border-radius: 50px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                z-index: 2147483647;

                /* ESTADO INICIAL: Fora da tela (Direita) e levemente menor */
                opacity: 0;
                transform: translateX(40px) scale(0.95);
                
                /* A Transição de Entrada "Firme" */
                transition: 
                    opacity 0.4s ease-out,
                    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1); /* Curva Exponencial (Freada brusca mas suave) */
            }

            /* ESTADO FINAL */
            .cw-pill-entry.docked {
                opacity: 1;
                transform: translateX(0) scale(1);
            }

            /* --- OS ÍCONES (As Ferramentas) --- */
            .cw-btn-entry {
                width: 40px; height: 40px;
                display: flex; align-items: center; justify-content: center;
                color: ${COLORS.iconIdle};
                
                /* Começam invisíveis e pequenos */
                opacity: 0;
                transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* Efeito de "Pop" elástico */
            }

            .cw-btn-entry.popped {
                opacity: 1;
                transform: scale(1);
            }

            .cw-btn-entry svg { width: 22px; height: 22px; fill: currentColor; }

            /* --- O DIVISOR --- */
            .cw-sep-entry {
                width: 20px; height: 1px; background: rgba(255,255,255,0.2);
                opacity: 0; transition: opacity 0.5s ease;
            }
            .cw-sep-entry.visible { opacity: 1; }

            /* --- O GRIP (System Check) --- */
            .cw-grip-entry {
                display: flex; gap: 4px; opacity: 0.5;
                cursor: grab; /* Cursor de arrastar no Grip */
            }
            .cw-dot-entry {
                width: 4px; height: 4px; border-radius: 50%;
                background: #5f6368;
                transition: background 0.3s, box-shadow 0.3s;
            }
            
            /* Animação de "Sistema Pronto" (Luz verde corre) */
            .cw-dot-entry.system-check {
                background: #81C995; /* Verde Suave */
                box-shadow: 0 0 8px #81C995;
            }
        `;
        document.head.appendChild(style);
    }

    // 2. CONSTRUÇÃO
    const pill = document.createElement('div');
    pill.className = 'cw-pill-entry';
    pill.innerHTML = `
        <div class="cw-grip-entry" title="Arrastar">
            <div class="cw-dot-entry" id="dot1"></div><div class="cw-dot-entry" id="dot2"></div>
        </div>
        <div class="cw-sep-entry"></div>
        <button class="cw-btn-entry notes" data-label="Case Notes">${ICONS.notes}</button>
        <button class="cw-btn-entry email" data-label="Quick Email">${ICONS.email}</button>
        <button class="cw-btn-entry script" data-label="Call Script">${ICONS.script}</button>
        <div class="cw-sep-entry"></div>
        <button class="cw-btn-entry links" data-label="Links">${ICONS.links}</button>
    `;
    document.body.appendChild(pill);

    // 3. EVENTOS DE CLIQUE (Ligando aos módulos reais)
    pill.querySelector('.notes').onclick = (e) => { e.stopPropagation(); actions.toggleNotes(); };
    pill.querySelector('.email').onclick = (e) => { e.stopPropagation(); actions.toggleEmail(); };
    pill.querySelector('.script').onclick = (e) => { e.stopPropagation(); actions.toggleScript(); };
    pill.querySelector('.links').onclick = (e) => { e.stopPropagation(); actions.toggleLinks(); };


    // 4. A COREOGRAFIA (Docking Sequence)
    async function animateEntry() {
        // Simula o fim da splash screen (2600ms é o tempo da splash)
        await esperar(2600); 

        // ETAPA 1: A Base "Atraca" (Dock)
        pill.classList.add('docked');
        
        await esperar(300); // A base se estabiliza

        // ETAPA 2: Ferramentas Carregam (Cascata)
        const items = pill.querySelectorAll('.cw-btn-entry');
        const seps = pill.querySelectorAll('.cw-sep-entry');
        
        // Mostra divisores
        seps.forEach(s => s.classList.add('visible'));

        // Loop de "Pop" dos botões (Rápido: 50ms entre cada)
        for (let i = 0; i < items.length; i++) {
            items[i].classList.add('popped');
            await esperar(60); // O ritmo "tec-tec-tec-tec"
        }

        // ETAPA 3: Confirmação (Luz Verde)
        await esperar(200);
        const d1 = document.getElementById('dot1');
        const d2 = document.getElementById('dot2');

        if (d1) d1.classList.add('system-check');
        await esperar(100);
        if (d2) d2.classList.add('system-check');
        
        await esperar(400);
        // Apaga a luz (volta ao estado idle)
        if (d1) d1.classList.remove('system-check');
        if (d2) d2.classList.remove('system-check');

        // Ativa Drag (Só depois da animação acabar)
        enableDrag();
    }

    // Inicia a animação
    animateEntry();


    // 5. FÍSICA DE DRAG (Simplificada para não quebrar)
    function enableDrag() {
        const grip = pill.querySelector('.cw-grip-entry');
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        grip.onmousedown = (e) => {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            
            const rect = pill.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;
            
            // Desliga transição para arrasto liso
            pill.style.transition = 'none';
            
            // Fixa posição absoluta
            pill.style.left = initialLeft + 'px';
            pill.style.top = initialTop + 'px';
            pill.style.right = 'auto'; // Remove âncora direita
            pill.style.transform = 'scale(1)'; // Reseta transform (remove o scale(0.95) inicial)
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        function onMouseMove(e) {
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
                
                // Restaura transição CSS suave
                pill.style.transition = 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)'; 
                
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        }
    }
}