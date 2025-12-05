// src/modules/shared/command-center.js

const COLORS = {
  glassBg: "rgba(61, 61, 61, 0.77)", 
  glassBorder: "rgba(255, 255, 255, 0.15)",
  glassActive: "rgba(79, 79, 79, 0.89)", 
  glassHighlight: "rgba(255, 255, 255, 0.08)",
  iconIdle: "#c2c5c8ff",
  // Gradientes do Grip (Mantidos)
  gripColor: 'linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)',
  gripActive: "linear-gradient(to left, #4285F4, #EA4335, #FBBC05, #34A853)",
  
  iconActive: "#FFFFFF",
  blue: "#8AB4F8", red: "#F28B82", purple: "#C58AF9", green: "#81C995",
};

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export function initCommandCenter(actions) {

  // 1. ESTILOS (Seu CSS + Correções Funcionais)
  const styleId = "cw-command-center-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
   style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            /* --- A BASE (O Vidro) --- */
            .cw-pill {
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
                    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1); /* Curva Exponencial */
            }

            /* ESTADO FINAL */
            .cw-pill.docked {
                opacity: 1;
                transform: translateX(0) scale(1);
            }

            /* --- OS ÍCONES (As Ferramentas) --- */
            .cw-btn {
                width: 40px; height: 40px;
                display: flex; align-items: center; justify-content: center;
                color: ${COLORS.iconIdle};
                background: transparent; border: none; cursor: pointer; position: relative;
                
                /* Começam invisíveis e pequenos */
                opacity: 0;
                transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* Efeito de "Pop" elástico */
            }

            .cw-btn.popped {
                opacity: 1;
                transform: scale(1);
            }
            
            .cw-btn:hover { 
                background: ${COLORS.glassHighlight}; 
                color: ${COLORS.iconActive}; 
                transform: scale(1.15);
            }

            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            /* Cores de Marca */
            .cw-btn.notes:hover { color: ${COLORS.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${COLORS.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${COLORS.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${COLORS.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }

            /* --- O DIVISOR --- */
            .cw-sep {
                width: 20px; height: 1px; background: rgba(255,255,255,0.2);
                opacity: 0; transition: opacity 0.5s ease;
            }
            .cw-sep.visible { opacity: 1; }

            .cw-grip {
                width: 100%; 
                height: 24px; /* Área de toque confortável */
                display: flex; 
                align-items: center; 
                justify-content: center; 
                cursor: grab;
                /* Removemos padding excessivo para manter alinhamento ótico */
                margin-bottom: 2px; 
            }

            /* A Barra Visual */
            .cw-grip-bar { 
                width: 24px; /* Largura padrão Google */
                height: 4px; 
                background-color: ${COLORS.iconIdle}; 
                border-radius: 4px; /* Pílula perfeita */
                opacity: 0.4; /* Discreto em repouso */
                transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); /* Standard Easing */
            }

            /* Hover: Fica nítido e branco */
            .cw-grip:hover .cw-grip-bar { 
                opacity: 1; 
                background-color: #FFFFFF; 
                transform: scaleY(1.2); /* Engrossa levemente */
            }

            /* Active/Dragging: Feedback de "Agarrou" */
            .cw-grip:active { cursor: grabbing; }
            
            .cw-pill.dragging .cw-grip-bar { 
                background-color: ${COLORS.blue}; /* Azul Google de Ação */
                width: 16px; /* Encolhe horizontalmente (tensão física) */
                opacity: 1;
            }

            .cw-grip:active { cursor: grabbing; color: #fff; }
            
            /* Animação de "Sistema Pronto" (Luz verde corre) */
            .cw-pill.system-check {
                background: #81C995; /* Verde Suave */
                box-shadow: 0 0 8px #81C995;
            }
            
            /* Tooltips */
            .cw-btn::after { 
                content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); 
                padding: 6px 12px; border-radius: 6px; background: #202124; color: #fff; 
                font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; 
                opacity: 0; pointer-events: none; transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1); 
                box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap; border: 1px solid rgba(255,255,255,0.15);
            }
            .cw-pill.side-right .cw-btn::after { right: 60px; transform-origin: right center; }
            .cw-pill.side-right .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
            .cw-pill.side-left .cw-btn::after { left: 60px; transform-origin: left center; }
            .cw-pill.side-left .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
        `;
    document.head.appendChild(style);
  }


  // 2. CONSTRUÇÃO DO DOM (Seu HTML Mantido)
  const ICONS = {
    notes: `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`
  };

  const pill = document.createElement("div");
  pill.className = "cw-pill side-right";
  // Seu HTML com o Grip Bar
  pill.innerHTML = `
        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <div class="cw-sep"></div>
        <button class="cw-btn notes" data-label="Case Notes">${ICONS.notes}</button>
        <button class="cw-btn email" data-label="Quick Email">${ICONS.email}</button>
        <button class="cw-btn script" data-label="Call Script">${ICONS.script}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn links" data-label="Links">${ICONS.links}</button>
    `;
  document.body.appendChild(pill);

  // Eventos
  pill.querySelector(".notes").onclick = (e) => { e.stopPropagation(); actions.toggleNotes(); };
  pill.querySelector(".email").onclick = (e) => { e.stopPropagation(); actions.toggleEmail(); };
  pill.querySelector(".script").onclick = (e) => { e.stopPropagation(); actions.toggleScript(); };
  pill.querySelector(".links").onclick = (e) => { e.stopPropagation(); actions.toggleLinks(); };

  // 3. ANIMAÇÃO DE ENTRADA (System Ready)
  (async function startAnimation() {
    await esperar(2600);
    pill.classList.add("docked");
    await esperar(300);
    const items = pill.querySelectorAll(".cw-btn");
    const seps = pill.querySelectorAll(".cw-sep");
    seps.forEach((s) => s.classList.add("visible"));
    for (let i = 0; i < items.length; i++) {
      items[i].classList.add("popped");
      await esperar(60);
    }
    await esperar(200);
    pill.classList.add("system-check"); // Pulso verde
  })();

  // 4. FÍSICA DE ARRASTO (CORRIGIDA)
  let isDragging = false;
  let startX, startY, shiftX, shiftY;
  const DRAG_THRESHOLD = 3;

  pill.onmousedown = (e) => {
    if (e.target.closest("button")) return;
    e.preventDefault();

    startX = e.clientX; startY = e.clientY;
    const rect = pill.getBoundingClientRect();
    
    // Cálculo de Offset (Shift) para não pular
    shiftX = e.clientX - rect.left;
    shiftY = e.clientY - rect.top;

    // --- TRAVA DE SEGURANÇA ---
    pill.classList.add('dragging');
    pill.classList.remove('snapping', 'docked'); // Remove classes de animação
    
    // Mata transições
    pill.style.transition = 'none'; 
    pill.style.transform = 'none'; // Reseta transform
    
    // Fixa posição absoluta
    pill.style.left = rect.left + 'px';
    pill.style.top = rect.top + 'px';
    pill.style.right = 'auto'; 
    
    void pill.offsetWidth; // Reflow

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  function onMouseMove(e) {
    if (!isDragging && Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2)) > DRAG_THRESHOLD) {
        isDragging = true;
    }

    if (isDragging) {
        // Move usando o Offset
        let newLeft = e.clientX - shiftX;
        let newTop = e.clientY - shiftY;
        
        // Limites
        const maxLeft = window.innerWidth - pill.offsetWidth - 10;
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
        pill.style.transition = ''; // Restaura CSS
        pill.classList.remove('dragging');
        pill.classList.add('snapping');

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rect = pill.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;

        let targetLeft;
        if (centerX < screenW / 2) {
            targetLeft = 24; pill.classList.remove("side-right"); pill.classList.add("side-left");
        } else {
            targetLeft = screenW - rect.width - 24; pill.classList.remove("side-left"); pill.classList.add("side-right");
        }

        let targetTop = rect.top;
        if (targetTop < 24) targetTop = 24;
        if (targetTop > screenH - rect.height - 24) targetTop = screenH - rect.height - 24;

        pill.style.left = `${targetLeft}px`;
        pill.style.top = `${targetTop}px`;
        
        setTimeout(() => pill.style.transform = '', 600);
    }
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
}