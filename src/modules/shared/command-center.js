import { DataService } from './data-service.js'; 

// src/modules/shared/command-center.js

const COLORS = {
  glassBg: "rgba(61, 61, 61, 0.77)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  glassActive: "rgba(79, 79, 79, 0.89)",
  glassHighlight: "rgba(255, 255, 255, 0.08)",
  iconIdle: "#c2c5c8ff",
  iconActive: "#FFFFFF",
  
  // Cores de Marca
  blue: "#8AB4F8",   // Notes
  red: "#F28B82",    // Email
  purple: "#C58AF9", // Script
  green: "#81C995",  // Links
  orange: "#F9AB00", // Broadcast
};

// Helper interno de tempo
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export function initCommandCenter(actions) {
  // 1. ESTILOS
  const styleId = "cw-command-center-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            /* --- SISTEMA DE COLAPSO (APPLE STYLE) --- */
            .cw-brand-btn {
                width: 40px; height: 40px;
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; position: relative;
                color: #fff; margin-right: 4px; z-index: 20;
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-brand-btn:hover { background: rgba(255, 255, 255, 0.1); transform: scale(1.1); }
            .cw-brand-btn svg { width: 24px; height: 24px; filter: drop-shadow(0 0 8px rgba(255,255,255,0.4)); }
            
            /* Estado Colapsado */
            .cw-pill.collapsed {
                width: 56px !important; height: 56px !important;
                padding: 0 !important; border-radius: 50% !important;
                justify-content: center; align-items: center; /* Garante centro absoluto */
                background: rgba(40, 40, 40, 0.95);
                border-color: rgba(255,255,255,0.2);
            }
            
            /* Esconde itens internos */
            .cw-pill.collapsed .cw-btn:not(.cw-brand-btn),
            .cw-pill.collapsed .cw-sep,
            .cw-pill.collapsed .cw-grip {
                opacity: 0; pointer-events: none; width: 0; margin: 0; padding: 0; transform: scale(0.5);
            }
            
            /* Transições dos itens */
            .cw-pill .cw-btn, .cw-pill .cw-sep, .cw-pill .cw-grip {
                transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                transform-origin: center left;
            }
            
            /* Animação do Brand Button ao fechar */
            .cw-pill.collapsed .cw-brand-btn { margin-right: 0; transform: rotate(360deg); }
            
            /* Tooltips Brand */
            .cw-brand-btn::after {
                content: attr(data-label); position: absolute; top: 50%; left: 60px; 
                transform: translateY(-50%) scale(0.9); padding: 6px 12px; border-radius: 6px; 
                background: #202124; color: #fff; font-size: 12px; font-weight: 500; 
                opacity: 0; pointer-events: none; transition: all 0.2s; white-space: nowrap;
                border: 1px solid rgba(255,255,255,0.15);
            }
            .cw-brand-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }

            /* --- ESTILOS PADRÃO --- */
            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                z-index: 2147483646; opacity: 0; pointer-events: none;
                transition: opacity 0.5s;
            }
            .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 16px 8px;
                background: ${COLORS.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${COLORS.glassBorder}; border-radius: 50px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 2147483647;
                opacity: 0; transform: translateX(40px) scale(0.95);
                transition: opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), 
                            width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${COLORS.iconIdle};
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }
            .cw-btn:hover { background: ${COLORS.glassHighlight}; color: ${COLORS.iconActive}; transform: scale(1.1); }

            /* Cores Ativas */
            .cw-btn.notes.active { color: ${COLORS.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${COLORS.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${COLORS.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${COLORS.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.broadcast.active { color: ${COLORS.orange} !important; background: rgba(249, 171, 0, 0.15); }

            /* Indicador LED */
            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; 
                width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0);
                transition: transform 0.3s; pointer-events: none;
            }
            .cw-btn.active::before { transform: translateX(-50%) scale(1); }
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            /* Badge */
            .cw-badge {
                position: absolute; top: 8px; right: 8px; width: 8px; height: 8px;
                background-color: #d93025; border-radius: 50%; border: 1px solid #fff; pointer-events: none;
                z-index: 10; animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

            .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); opacity: 0; transition: opacity 0.5s ease; }
            .cw-sep.visible { opacity: 1; }

            .cw-grip {
                width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; 
                cursor: grab; margin-bottom: 2px; 
            }
            .cw-grip-bar { 
                width: 24px; height: 4px; background-color: ${COLORS.iconIdle}; border-radius: 4px; 
                opacity: 0.4; transition: all 0.3s; 
            }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-grip:active { cursor: grabbing; }

            /* --- MODO ILHA DINÂMICA (ANIMAÇÃO) --- */
            .cw-pill.processing-center {
                top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;
                width: 320px !important; height: 110px !important; border-radius: 28px !important;
                background: #202124 !important; padding: 0 !important; box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important;
                display: flex !important; flex-direction: column !important; justify-content: center !important;
            }
            .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }

            .cw-center-stage { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.1s; }
            .cw-center-dots { display: flex; gap: 8px; }
            .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
            .cw-center-dots span:nth-child(1) { background-color: ${COLORS.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${COLORS.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${COLORS.green}; }
            
            .cw-center-text { font-size: 13px; color: #E8EAED; text-align: center; max-width: 90%; font-weight: 500; opacity: 0; transform: translateY(10px); animation: textSlideUp 0.5s forwards 0.2s; }
            .cw-center-success { display: none; color: ${COLORS.green}; }
            .cw-center-success svg { width: 40px; height: 40px; }
            .cw-center-success.show { display: block; animation: popIn 0.4s; }

            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes googleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
            @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
  }

  // 2. CONSTRUÇÃO DO DOM
  const ICONS = {
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    notes: `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
    broadcast: `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    nexus: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"></path></svg>`
  };

  const pill = document.createElement("div");
  pill.className = "cw-pill side-right";
  
  pill.innerHTML = `
    <button class="cw-brand-btn" id="cw-brand-toggle" data-label="Minimizar">
        ${ICONS.nexus}
    </button>

    <div class="cw-grip" title="Arrastar">
        <div class="cw-grip-bar"></div>
    </div>
    
    <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${ICONS.notes}</button>
    <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${ICONS.email}</button>
    <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${ICONS.script}</button>
    <button class="cw-btn links" id="cw-btn-links" data-label="Links">${ICONS.links}</button>
    <div class="cw-sep"></div>
    <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${ICONS.broadcast}</button>

    <div class="cw-status-container">
        <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
        <div class="cw-check" id="cw-success" style="display:none;">${ICONS.check}</div>
    </div>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'cw-focus-backdrop';
  document.body.appendChild(overlay);
  document.body.appendChild(pill);

  // 3. LISTENERS
  pill.querySelector(".notes").onclick = (e) => { e.stopPropagation(); actions.toggleNotes(); };
  pill.querySelector(".email").onclick = (e) => { e.stopPropagation(); actions.toggleEmail(); };
  pill.querySelector(".script").onclick = (e) => { e.stopPropagation(); actions.toggleScript(); };
  pill.querySelector(".links").onclick = (e) => { e.stopPropagation(); actions.toggleLinks(); };
  
  // Broadcast + Badge Logic
  pill.querySelector(".broadcast").onclick = (e) => { 
      e.stopPropagation(); 
      const badge = e.currentTarget.querySelector('.cw-badge');
      if(badge) {
          badge.style.transform = "scale(0)";
          setTimeout(() => badge.remove(), 200);
      }
      if(actions.broadcastControl) actions.broadcastControl.toggle(); 
  };

  if (actions.broadcastControl && actions.broadcastControl.hasUnread) {
      const badge = document.createElement('div');
      badge.className = 'cw-badge';
      pill.querySelector('.broadcast').appendChild(badge);
  }

  // --- LÓGICA UNIFICADA DE DRAG + COLAPSO ---
  const brandBtn = pill.querySelector("#cw-brand-toggle");
  let isCollapsed = false;
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  const DRAG_THRESHOLD = 3;
  let hasMoved = false;

  // Click do Brand Button (Lógica de Toggle)
  brandBtn.onclick = (e) => {
      // Se estava arrastando, não faz o toggle
      if (hasMoved) return;

      e.stopPropagation();
      isCollapsed = !isCollapsed;
      
      if (isCollapsed) {
          pill.classList.add("collapsed");
          brandBtn.setAttribute("data-label", "Expandir");
          brandBtn.style.color = COLORS.blue; 
      } else {
          pill.classList.remove("collapsed");
          brandBtn.setAttribute("data-label", "Minimizar");
          brandBtn.style.color = "#FFFFFF";
      }
  };

  // Mousedown UNIFICADO (Trata tanto arraste normal quanto arraste do botão quando fechado)
  pill.onmousedown = (e) => {
      // 1. Se clicou em um botão normal (expandido), deixa o clique passar e não arrasta
      if (e.target.closest("button") && !e.target.closest("#cw-brand-toggle") && !isCollapsed) return;

      // 2. Setup do arraste
      e.preventDefault();
      startX = e.clientX; 
      startY = e.clientY;
      const rect = pill.getBoundingClientRect();
      initialLeft = rect.left; 
      initialTop = rect.top;
      hasMoved = false; // Reset flag de movimento
      isDragging = false;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
  };

  function onMouseMove(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // Só inicia o arraste se mover mais que o threshold (evita cliques acidentais virarem arraste)
      if (!isDragging && Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
          isDragging = true;
          hasMoved = true; // Marca que houve movimento
          pill.style.transition = "none";
      }

      if (isDragging) {
          pill.style.left = `${initialLeft + dx}px`;
          pill.style.top = `${initialTop + dy}px`;
          // Remove alinhamentos conflitantes durante o arraste
          pill.style.right = "auto"; 
          pill.style.bottom = "auto"; 
          pill.style.transform = "none";
      }
  }

  function onMouseUp(e) {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      if (isDragging) {
          isDragging = false;
          // Restaura a transição suave 'Apple'
          pill.style.transition = "left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease, width 0.6s ease, height 0.6s ease";
          
          // Lógica de "Snap" (grudar nas bordas)
          const screenW = window.innerWidth;
          const screenH = window.innerHeight;
          const rect = pill.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          
          let targetLeft;
          // Se colapsado, gruda mais perto da borda; se expandido, respeita margem
          const margin = 24;

          if (centerX < screenW / 2) {
              targetLeft = margin;
              pill.classList.remove("side-right"); pill.classList.add("side-left");
          } else {
              targetLeft = screenW - rect.width - margin;
              pill.classList.remove("side-left"); pill.classList.add("side-right");
          }
          
          let targetTop = rect.top;
          if (targetTop < margin) targetTop = margin;
          if (targetTop > screenH - rect.height - margin) targetTop = screenH - rect.height - margin;

          pill.style.left = `${targetLeft}px`;
          pill.style.top = `${targetTop}px`;
      } else {
          // Efeito de clique simples (se não arrastou)
          const btn = e.target.closest("button");
          if (btn) {
              btn.style.transform = "scale(0.9)";
              setTimeout(() => (btn.style.transform = ""), 150);
          }
      }
  }

  // 4. SEQUÊNCIA DE ANIMAÇÃO DE ENTRADA
  (async function startAnimation() {
    await esperar(2800);
    pill.classList.add("docked");
    await esperar(300);
    
    const items = pill.querySelectorAll(".cw-btn");
    const seps = pill.querySelectorAll(".cw-sep");
    seps.forEach((s) => s.classList.add("visible"));

    for (let i = 0; i < items.length; i++) {
      items[i].classList.add("popped");
      await esperar(90);
    }
  })();
}

// 5. ANIMAÇÃO DE PROCESSAMENTO CENTRAL (Mantida igual)
export function triggerProcessingAnimation() {
    const pill = document.querySelector('.cw-pill');
    const overlay = document.querySelector('.cw-focus-backdrop');
    if (!pill) return () => {}; 

    // Se estiver colapsado, expande visualmente ou força a abertura para a animação
    // Para simplificar, vamos assumir que a animação central toma conta de tudo
    
    const stage = document.createElement('div');
    stage.className = 'cw-center-stage';
    stage.innerHTML = `
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-text">${DataService.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `;

    pill.appendChild(stage);
    const startTime = Date.now();
    pill.classList.add('processing-center');
    if(overlay) overlay.classList.add('active');

    return function finish() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 2000 - elapsed);

        setTimeout(() => {
            const dots = stage.querySelector('.cw-center-dots');
            const text = stage.querySelector('.cw-center-text');
            const success = stage.querySelector('.cw-center-success');

            if(dots) dots.style.display = 'none';
            if(text) text.style.display = 'none';
            if(success) success.classList.add('show');
            pill.classList.add('success');

            setTimeout(() => {
                pill.classList.remove('processing-center');
                setTimeout(() => {
                    stage.remove();
                    pill.classList.remove('success');
                    if(overlay) overlay.classList.remove('active');
                }, 400);
            }, 1000);
        }, remaining);
    };
}