import { DataService } from './data-service.js'; 

// src/modules/shared/command-center.js

const COLORS = {
  glassBg: "rgba(61, 61, 61, 0.90)", // Mais sólido para evitar fantasmas visuais
  glassBorder: "rgba(255, 255, 255, 0.12)",
  glassHighlight: "rgba(255, 255, 255, 0.1)",
  
  // Cores originais restauradas
  iconIdle: "#c2c5c8",  
  iconActive: "#FFFFFF",
  
  blue: "#8AB4F8",
  red: "#F28B82",
  purple: "#C58AF9",
  green: "#81C995",
  orange: "#F9AB00",
};

// Helper interno de tempo
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export function initCommandCenter(actions) {

  const styleId = "cw-command-center-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

        :root {
            /* Vertical: Pulo elástico forte (Dopamina) */
            --cw-spring-y: cubic-bezier(0.34, 1.56, 0.64, 1);
            
            /* Horizontal: Suave, sem balanço, para evitar o "samba" lateral */
            --cw-smooth-x: cubic-bezier(0.2, 0.8, 0.2, 1);
            
            --cw-fast-out: cubic-bezier(0.4, 0.0, 1, 1);
        }

        /* --- PÍLULA PRINCIPAL --- */
        .cw-pill {
            position: fixed; top: 30%; right: 24px;
            display: flex; flex-direction: column; align-items: center; 
            /* Padding calibrado: Topo menor por causa do Grip */
            padding: 8px 8px 16px 8px; 
            gap: 12px;
            
            background: ${COLORS.glassBg};
            backdrop-filter: blur(16px) saturate(180%);
            border: 1px solid ${COLORS.glassBorder}; 
            border-radius: 50px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.35);
            z-index: 2147483647;
            
            /* CRUCIAL: Esconde qualquer coisa que tente "sambar" fora da borda durante animação */
            overflow: hidden; 

            /* Transições Separadas para X e Y */
            transition: 
                width 0.5s var(--cw-smooth-x),       /* Largura sem elástico */
                height 0.6s var(--cw-spring-y),      /* Altura com elástico */
                padding 0.3s ease,                   /* Padding rápido */
                gap 0.3s ease,
                border-radius 0.5s ease,
                background 0.3s ease,
                top 0.1s linear, left 0.1s linear;   /* Drag linear */

            opacity: 0; transform: translateX(40px) scale(0.8);
        }
        
        .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

        /* --- ESTADO COLAPSADO --- */
        .cw-pill.collapsed {
            width: 56px !important; 
            height: 56px !important;
            padding: 0 !important; 
            gap: 0 !important;
            border-radius: 50% !important;
            background: rgba(32, 33, 36, 0.98); /* Quase preto */
            box-shadow: 0 8px 25px rgba(0,0,0,0.4);
            cursor: default; /* O cursor é controlado pelos botões internos */
        }

        /* --- GRIP (ALÇA) --- */
        .cw-grip {
            width: 100%; height: 16px; 
            display: flex; align-items: center; justify-content: center; 
            cursor: grab; margin-bottom: 2px; flex-shrink: 0;
            opacity: 0.5; transition: opacity 0.2s;
        }
        .cw-grip:hover { opacity: 1; }
        
        .cw-grip-bar { 
            width: 24px; height: 4px; 
            background-color: rgba(255,255,255,0.4); 
            border-radius: 4px; 
        }

        /* --- BOTÃO DA MARCA (NEXUS) --- */
        .cw-brand-btn {
            width: 44px; height: 44px; flex-shrink: 0;
            border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; position: relative; z-index: 25; /* Z-index alto para garantir clique */
            color: #fff;
            transition: transform 0.6s var(--cw-spring-y), background 0.3s;
        }
        
        /* Hover no modo aberto: Fundo sutil */
        .cw-brand-btn:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: scale(1.05);
        }
        
        .cw-brand-btn svg {
            width: 26px; height: 26px;
            filter: drop-shadow(0 0 4px rgba(255,255,255,0.4));
        }

        /* ESTADO DO BRAND BTN QUANDO COLAPSADO */
        .cw-pill.collapsed .cw-brand-btn {
            position: absolute; 
            top: 50%; left: 50%;
            /* Gira e centraliza perfeitamente */
            transform: translate(-50%, -50%) rotate(360deg);
            margin: 0;
            pointer-events: auto; /* GARANTE O CLIQUE PARA REABRIR */
        }
        
        /* Hover no modo fechado: Fundo mais evidente */
        .cw-pill.collapsed .cw-brand-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translate(-50%, -50%) rotate(360deg) scale(1.1);
        }

        /* --- BOTÕES DE AÇÃO --- */
        .cw-btn {
            width: 40px; height: 40px; flex-shrink: 0;
            border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; 
            cursor: pointer; position: relative; 
            color: ${COLORS.iconIdle};
            transition: all 0.3s var(--cw-spring-y);
        }
        
        .cw-btn svg { 
            width: 22px; height: 22px; 
            fill: none; stroke: currentColor; stroke-width: 2;
            pointer-events: none; 
        }

        .cw-btn:hover { 
            background: ${COLORS.glassHighlight}; 
            color: ${COLORS.iconActive}; 
            transform: scale(1.1); 
        }

        /* --- ITENS QUE DESAPARECEM (Animação de Saída Rápida) --- */
        .cw-pill.collapsed .cw-btn,
        .cw-pill.collapsed .cw-sep,
        .cw-pill.collapsed .cw-grip,
        .cw-pill.collapsed .cw-status-container {
            opacity: 0; 
            pointer-events: none;
            /* Zera dimensões instantaneamente após a opacidade */
            height: 0; margin: 0; width: 0; padding: 0; 
            
            /* Transição muito rápida para sumir antes da caixa encolher */
            transition: 
                opacity 0.1s ease-out,
                height 0.1s ease-out 0.1s, /* Delay leve no layout */
                margin 0.1s ease-out 0.1s;
        }

        /* Separador */
        .cw-sep {
            width: 20px; height: 1px; background: rgba(255,255,255,0.15); flex-shrink: 0;
            margin: 2px 0; transition: opacity 0.2s;
        }
        
        /* Estados Ativos */
        .cw-btn.notes.active { color: ${COLORS.blue}; background: rgba(138, 180, 248, 0.15); box-shadow: 0 0 12px rgba(138, 180, 248, 0.3); }
        .cw-btn.email.active { color: ${COLORS.red}; background: rgba(242, 139, 130, 0.15); box-shadow: 0 0 12px rgba(242, 139, 130, 0.3); }
        .cw-btn.script.active { color: ${COLORS.purple}; background: rgba(197, 138, 249, 0.15); box-shadow: 0 0 12px rgba(197, 138, 249, 0.3); }
        .cw-btn.links.active { color: ${COLORS.green}; background: rgba(129, 201, 149, 0.15); box-shadow: 0 0 12px rgba(129, 201, 149, 0.3); }
        .cw-btn.broadcast.active { color: ${COLORS.orange}; background: rgba(249, 171, 0, 0.15); box-shadow: 0 0 12px rgba(249, 171, 0, 0.3); }

        /* Tooltips */
        .cw-btn::after, .cw-brand-btn::after { 
            content: attr(data-label); position: absolute; top: 50%; 
            transform: translateY(-50%) scale(0.8); opacity: 0;
            padding: 5px 10px; border-radius: 6px; 
            background: rgba(0,0,0,0.9); color: #fff; 
            font-family: 'Google Sans', sans-serif; font-size: 11px; font-weight: 500; 
            pointer-events: none; transition: all 0.2s var(--cw-smooth-x); 
            white-space: nowrap; border: 1px solid rgba(255,255,255,0.15); z-index: 30;
        }
        .cw-pill.side-right *:hover::after { opacity: 1; transform: translateY(-50%) scale(1); right: 60px; }
        .cw-pill.side-left *:hover::after { opacity: 1; transform: translateY(-50%) scale(1); left: 60px; }

        /* Badge */
        .cw-badge {
            position: absolute; top: 6px; right: 6px; width: 8px; height: 8px;
            background-color: #FA5252; border-radius: 50%; border: 1px solid #fff; pointer-events: none;
            z-index: 10; animation: popIn 0.4s var(--cw-spring-y);
        }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
        
        /* Overlay */
        .cw-focus-backdrop {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
            z-index: 2147483646; opacity: 0; pointer-events: none;
            transition: opacity 0.5s ease;
        }
        .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

        /* --- PROCESSING CENTER (ILHA) --- */
        .cw-pill.processing-center {
            top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;
            width: 320px !important; height: 110px !important; border-radius: 32px !important;
            background: #18181b !important; padding: 0 !important; gap: 0 !important;
            box-shadow: 0 40px 100px rgba(0,0,0,0.6) !important;
            display: flex !important; flex-direction: column !important; justify-content: center !important;
        }
        .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
        .cw-center-stage { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.2s; }
        .cw-center-dots { display: flex; gap: 8px; }
        .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
        .cw-center-dots span:nth-child(1) { background-color: ${COLORS.blue}; animation-delay: -0.32s; }
        .cw-center-dots span:nth-child(2) { background-color: ${COLORS.red}; animation-delay: -0.16s; }
        .cw-center-dots span:nth-child(3) { background-color: ${COLORS.green}; }
        .cw-center-text { font-size: 13px; color: #E8EAED; opacity: 0; transform: translateY(10px); animation: textSlideUp 0.5s var(--cw-spring-y) forwards 0.3s; }
        .cw-center-success { display: none; color: ${COLORS.green}; }
        .cw-center-success svg { width: 42px; height: 42px; stroke: currentColor; }
        .cw-center-success.show { display: block; animation: popIn 0.5s var(--cw-spring-y); }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes googleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
  }

  // 2. DOM STRUCTURE
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
    <div class="cw-grip" title="Arrastar">
        <div class="cw-grip-bar"></div>
    </div>

    <button class="cw-brand-btn" id="cw-brand-toggle" data-label="Minimizar">
        ${ICONS.nexus}
    </button>
    
    <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${ICONS.notes}</button>
    <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${ICONS.email}</button>
    <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${ICONS.script}</button>
    <button class="cw-btn links" id="cw-btn-links" data-label="Links">${ICONS.links}</button>
    
    <div class="cw-sep"></div>
    
    <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${ICONS.broadcast}</button>

    <div class="cw-status-container"></div>
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
  let hasMoved = false;

  // Toggle Logic
  brandBtn.onclick = (e) => {
      if (hasMoved) return; 
      e.stopPropagation();
      
      isCollapsed = !isCollapsed;
      
      if (isCollapsed) {
          pill.classList.add("collapsed");
          brandBtn.setAttribute("data-label", "Expandir");
      } else {
          pill.classList.remove("collapsed");
          brandBtn.setAttribute("data-label", "Minimizar");
      }
  };

  // Drag Logic
  pill.onmousedown = (e) => {
      // Impede arrasto se clicar em botões, MAS permite se for o brand button fechado
      if (e.target.closest("button") && !e.target.closest("#cw-brand-toggle") && !isCollapsed) return;

      e.preventDefault();
      startX = e.clientX; startY = e.clientY;
      const rect = pill.getBoundingClientRect();
      initialLeft = rect.left; initialTop = rect.top;
      hasMoved = false; isDragging = false;

      // Desativa transições para resposta instantânea
      pill.style.transition = "none";

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
  };

  function onMouseMove(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!isDragging && Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
          isDragging = true;
          hasMoved = true;
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

      // Restaura transições elásticas verticais e suaves horizontais
      pill.style.transition = `
        width 0.5s var(--cw-smooth-x),
        height 0.6s var(--cw-spring-y),
        padding 0.4s ease,
        gap 0.3s ease,
        background 0.3s ease,
        top 0.5s var(--cw-spring-y), left 0.5s var(--cw-spring-y), 
        transform 0.4s var(--cw-spring-y)
      `;

      if (isDragging) {
          isDragging = false;
          
          const screenW = window.innerWidth;
          const screenH = window.innerHeight;
          const rect = pill.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          
          const margin = 24;
          let targetLeft, targetTop;

          if (centerX < screenW / 2) {
              targetLeft = margin;
              pill.classList.remove("side-right"); pill.classList.add("side-left");
          } else {
              targetLeft = screenW - rect.width - margin;
              pill.classList.remove("side-left"); pill.classList.add("side-right");
          }
          
          targetTop = rect.top;
          if (targetTop < margin) targetTop = margin;
          if (targetTop > screenH - rect.height - margin) targetTop = screenH - rect.height - margin;

          pill.style.left = `${targetLeft}px`;
          pill.style.top = `${targetTop}px`;
      } 
  }

  (async function startAnimation() {
    await esperar(2000); 
    pill.classList.add("docked");
  })();
}

// Processing Animation (Mantida)
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