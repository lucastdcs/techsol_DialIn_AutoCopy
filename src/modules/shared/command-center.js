import { DataService } from './data-service.js';

// src/modules/shared/command-center.js

const COLORS = {
  glassBg: "rgba(61, 61, 61, 0.95)", // Levemente mais opaco para o novo design
  glassBorder: "rgba(255, 255, 255, 0.15)",
  glassActive: "rgba(79, 79, 79, 0.89)",
  glassHighlight: "rgba(255, 255, 255, 0.08)",
  iconIdle: "#c2c5c8ff",
  iconActive: "#FFFFFF",
  blue: "#8AB4F8",
  red: "#F28B82",
  purple: "#C58AF9",
  green: "#81C995",
  orange: "#F9AB00",
};

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export function initCommandCenter(actions) {
  // 1. ESTILOS
  const styleId = "cw-command-center-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

        /* Animação Elástica Personalizada */
        :root { --cw-spring: cubic-bezier(0.34, 1.56, 0.64, 1); }

        .cw-focus-backdrop {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
            z-index: 2147483646; opacity: 0; pointer-events: none;
            transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
        }
        .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

        /* --- PÍLULA (CONTAINER) --- */
        .cw-pill {
            position: fixed; top: 30%; right: 24px;
            display: flex; flex-direction: column; align-items: center;
            
            /* Largura Fixa e Padding Ajustado */
            width: 56px; 
            padding: 8px 0 16px 0; 
            gap: 8px;
            
            background: ${COLORS.glassBg};
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            border: 1px solid ${COLORS.glassBorder};
            border-radius: 28px;
            box-shadow: 0 12px 32px rgba(0,0,0,0.3);
            overflow: hidden; /* Importante para cortar ao fechar */
            z-index: 2147483647;

            /* Transições: Altura Elástica, Resto Suave */
            transition: 
                max-height 0.6s var(--cw-spring),
                padding 0.4s ease,
                background 0.3s ease,
                opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                /* Note: top/left (drag) não estão aqui para serem instantâneos via JS */
            
            max-height: 600px; /* Aberto */
            opacity: 0; transform: translateX(40px) scale(0.95);
        }
        .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

        /* --- ESTADO COLAPSADO (BOLA) --- */
        .cw-pill.collapsed {
            max-height: 56px !important; /* Altura do botão */
            padding: 0 !important;       /* Remove padding */
            gap: 0 !important;
            border-radius: 50% !important;
            background: rgba(30, 30, 30, 1);
            justify-content: center; 
        }

        /* --- BOTÃO DA MARCA (NEXUS) --- */
        .cw-brand-btn {
            width: 44px; height: 44px; flex-shrink: 0;
            border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; position: relative; z-index: 20;
            color: #fff;
            transition: transform 0.6s var(--cw-spring);
        }
        
        /* Gradiente no Hover */
        .cw-brand-btn::before {
            content: ''; position: absolute; inset: 0; border-radius: 50%;
            background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0));
            opacity: 0; transition: opacity 0.3s ease; z-index: -1;
        }
        .cw-brand-btn:hover::before { opacity: 1; }
        .cw-brand-btn:hover { transform: scale(1.1); }
        .cw-brand-btn svg { width: 26px; height: 26px; filter: drop-shadow(0 0 4px rgba(255,255,255,0.3)); }

        /* Posição Absoluta quando Fechado (Centralização Perfeita) */
        .cw-pill.collapsed .cw-brand-btn {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%) rotate(-180deg);
            margin: 0;
        }

        /* Esconde itens internos ao fechar */
        .cw-pill.collapsed .cw-btn, 
        .cw-pill.collapsed .cw-sep,
        .cw-pill.collapsed .cw-grip,
        .cw-pill.collapsed .cw-status-container {
            opacity: 0; pointer-events: none;
            transition: opacity 0.1s ease;
        }

        /* --- OUTROS ITENS (MANTIDOS IGUAIS) --- */
        .cw-grip {
            width: 100%; height: 12px; display: flex; align-items: center; justify-content: center; 
            cursor: grab; margin-bottom: 2px; flex-shrink: 0; opacity: 0.3; transition: opacity 0.2s;
        }
        .cw-grip:hover { opacity: 1; }
        .cw-grip-bar { width: 20px; height: 3px; background-color: ${COLORS.iconIdle}; border-radius: 4px; }

        .cw-btn {
            width: 40px; height: 40px; border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; 
            color: ${COLORS.iconIdle}; transition: all 0.2s ease; flex-shrink: 0;
        }
        .cw-btn:hover { background: ${COLORS.glassHighlight}; color: ${COLORS.iconActive}; transform: scale(1.1); }
        .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

        .cw-btn.notes.active { color: ${COLORS.blue} !important; background: rgba(138, 180, 248, 0.15); }
        .cw-btn.email.active { color: ${COLORS.red} !important; background: rgba(242, 139, 130, 0.15); }
        .cw-btn.script.active { color: ${COLORS.purple} !important; background: rgba(197, 138, 249, 0.15); }
        .cw-btn.links.active { color: ${COLORS.green} !important; background: rgba(129, 201, 149, 0.15); }
        .cw-btn.broadcast.active { color: ${COLORS.orange} !important; background: rgba(249, 171, 0, 0.15); }

        .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); margin: 4px 0; flex-shrink: 0; }

        .cw-badge {
            position: absolute; top: 8px; right: 8px; width: 8px; height: 8px;
            background-color: #d93025; border-radius: 50%; border: 1px solid #fff; pointer-events: none;
            z-index: 10; animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

        /* Tooltips Internos (Label Flutuante) */
        .cw-dynamic-label {
            position: absolute; top: 18px; right: 64px;
            background: rgba(0,0,0,0.9); color: #fff; padding: 6px 12px;
            border-radius: 6px; font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500;
            pointer-events: none; opacity: 0; transform: translateX(10px);
            transition: all 0.2s ease; white-space: nowrap; border: 1px solid rgba(255,255,255,0.1);
        }
        .cw-dynamic-label.visible { opacity: 1; transform: translateX(0); }

        /* --- MODO ILHA DINÂMICA (ANIMAÇÃO) --- */
        .cw-pill.processing-center {
            top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;
            width: 320px !important; height: 110px !important; border-radius: 32px !important; max-height: unset !important;
            background: #202124 !important; padding: 0 !important;
            box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important;
            display: flex !important; flex-direction: column !important; justify-content: center !important;
        }
        .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
        .cw-center-stage { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.1s; }
        .cw-center-dots { display: flex; gap: 8px; }
        .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
        .cw-center-dots span:nth-child(1) { background-color: ${COLORS.blue}; animation-delay: -0.32s; }
        .cw-center-dots span:nth-child(2) { background-color: ${COLORS.red}; animation-delay: -0.16s; }
        .cw-center-dots span:nth-child(3) { background-color: ${COLORS.green}; }
        .cw-center-text { font-size: 13px; color: #E8EAED; opacity: 0; transform: translateY(10px); animation: textSlideUp 0.5s forwards 0.2s; }
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
    nexus: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>`
  };

  const pill = document.createElement("div");
  pill.className = "cw-pill side-right";
  
  pill.innerHTML = `
    <div class="cw-dynamic-label" id="cw-main-label">Menu</div>

    <div class="cw-grip" title="Arrastar">
        <div class="cw-grip-bar"></div>
    </div>

    <button class="cw-brand-btn" id="cw-brand-toggle" data-hint="Minimizar">
        ${ICONS.nexus}
    </button>
    
    <button class="cw-btn notes" id="cw-btn-notes" data-hint="Notas">${ICONS.notes}</button>
    <button class="cw-btn email" id="cw-btn-email" data-hint="Emails">${ICONS.email}</button>
    <button class="cw-btn script" id="cw-btn-script" data-hint="Script">${ICONS.script}</button>
    <button class="cw-btn links" id="cw-btn-links" data-hint="Links">${ICONS.links}</button>
    
    <div class="cw-sep"></div>
    
    <button class="cw-btn broadcast" id="cw-btn-broadcast" data-hint="Avisos">${ICONS.broadcast}</button>

    <div class="cw-status-container">
        <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
        <div class="cw-check" id="cw-success" style="display:none;">${ICONS.check}</div>
    </div>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'cw-focus-backdrop';
  document.body.appendChild(overlay);
  document.body.appendChild(pill);

  // 3. LISTENERS E LABELS
  const labelEl = pill.querySelector('#cw-main-label');
  const showLabel = (text) => { labelEl.textContent = text; labelEl.classList.add('visible'); };
  const hideLabel = () => { labelEl.classList.remove('visible'); };

  const allBtns = pill.querySelectorAll('button');
  allBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => showLabel(btn.getAttribute('data-hint')));
      btn.addEventListener('mouseleave', hideLabel);
  });

  pill.querySelector(".notes").onclick = (e) => { e.stopPropagation(); actions.toggleNotes(); };
  pill.querySelector(".email").onclick = (e) => { e.stopPropagation(); actions.toggleEmail(); };
  pill.querySelector(".script").onclick = (e) => { e.stopPropagation(); actions.toggleScript(); };
  pill.querySelector(".links").onclick = (e) => { e.stopPropagation(); actions.toggleLinks(); };
  
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

  // --- LÓGICA DE TOGGLE E ARRASTO ---
  const brandBtn = pill.querySelector("#cw-brand-toggle");
  let isCollapsed = false;
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  const DRAG_THRESHOLD = 3;

  // Toggle (Só se não estiver arrastando)
  brandBtn.onclick = (e) => {
      if (isDragging) return; 
      
      e.stopPropagation();
      isCollapsed = !isCollapsed;
      
      if (isCollapsed) {
          pill.classList.add("collapsed");
          brandBtn.setAttribute("data-hint", "Expandir");
          if(labelEl.classList.contains('visible')) showLabel("Expandir");
      } else {
          pill.classList.remove("collapsed");
          brandBtn.setAttribute("data-hint", "Minimizar");
          if(labelEl.classList.contains('visible')) showLabel("Minimizar");
      }
  };

  // Drag (Mousedown) - Lógica de Proteção
  pill.onmousedown = (e) => {
    const target = e.target;
    const isBrand = target.closest("#cw-brand-toggle");
    const isBtn = target.closest("button");
    
    // REGRA DE OURO:
    // 1. Botões internos -> Nunca arrastam.
    // 2. Botão da Marca -> Só arrasta se estiver FECHADO.
    if ((isBtn && !isBrand) || (isBrand && !isCollapsed)) return;

    e.preventDefault();
    startX = e.clientX; 
    startY = e.clientY;
    const rect = pill.getBoundingClientRect();
    initialLeft = rect.left; 
    initialTop = rect.top;
    
    isDragging = false; 
    pill.style.transition = "none"; // Remove transições para arrastar instantâneo

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    if (!isDragging && Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
      isDragging = true;
    }
    
    if (isDragging) {
      pill.style.left = `${initialLeft + dx}px`;
      pill.style.top = `${initialTop + dy}px`;
      pill.style.right = "auto"; pill.style.bottom = "auto"; pill.style.transform = "none";
    }
  }

  function onMouseUp(e) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    
    // Restaura transições para as propriedades animáveis
    pill.style.transition = `
        max-height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), 
        padding 0.4s ease, 
        background 0.3s ease, 
        border-radius 0.4s ease,
        opacity 0.4s ease, 
        top 0.1s linear, left 0.1s linear`;

    if (isDragging) {
      setTimeout(() => { isDragging = false; }, 50); // Timeout para evitar click acidental
      
      // Snap Logic (Opcional - mantida)
      const screenW = window.innerWidth;
      const rect = pill.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      
      if (centerX < screenW / 2) {
        pill.classList.remove("side-right"); pill.classList.add("side-left");
      } else {
        pill.classList.remove("side-left"); pill.classList.add("side-right");
      }
    } else {
      isDragging = false;
    }
  }

  // 4. ANIMAÇÃO DE ENTRADA
  (async function startAnimation() {
    await esperar(2800);
    pill.classList.add("docked");
    await esperar(300);
    const items = pill.querySelectorAll(".cw-btn");
    for (let i = 0; i < items.length; i++) {
      items[i].classList.add("popped");
      await esperar(90);
    }
    await esperar(200);
    pill.classList.add("system-check");
  })();
}

// Processing Animation (Ilha Dinâmica)
export function triggerProcessingAnimation() {
    const pill = document.querySelector('.cw-pill');
    const overlay = document.querySelector('.cw-focus-backdrop');
    if (!pill) return () => {}; 

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