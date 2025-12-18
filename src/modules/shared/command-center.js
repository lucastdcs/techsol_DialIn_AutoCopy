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

        /* --- ANIMAÇÕES (Spring Physics) --- */
        :root {
            /* Abertura com peso (Gravity) */
            --spring-open: cubic-bezier(0.25, 1, 0.5, 1);
            /* Fechamento rápido (Snap) */
            --spring-close: cubic-bezier(0.65, 0.05, 0.36, 1);
        }

        .cw-focus-backdrop {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.3); backdrop-filter: blur(4px);
            z-index: 2147483646; opacity: 0; pointer-events: none;
            transition: opacity 0.4s ease;
        }
        .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

        /* --- PÍLULA (Container Principal) --- */
        .cw-pill {
            position: fixed; top: 100px; right: 24px;
            display: flex; flex-direction: column; align-items: center; 
            
            /* -- DIMENSÕES DA PÍLULA -- */
            width: 48px;  /* Largura padrão */
            padding: 0;   /* Padding zero, gerenciado pelos filhos */
            
            background: ${COLORS.glassBg};
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid ${COLORS.glassBorder}; 
            
            /* Raio padrão (metade da largura) */
            border-radius: 24px; 
            
            box-shadow: 
                0 4px 12px rgba(0,0,0,0.15),
                0 12px 32px rgba(0,0,0,0.3);
            
            z-index: 2147483647;
            overflow: hidden;

            /* TRANSIÇÕES */
            transition: 
                max-height 0.6s var(--spring-open), /* Animação Principal */
                border-radius 0.4s ease,            /* Morph de forma */
                background 0.3s ease,
                opacity 0.4s ease,
                transform 0.1s linear, top 0.1s linear, left 0.1s linear; /* Drag */
            
            /* Estado Aberto (Altura suficiente) */
            max-height: 600px;
            opacity: 0; transform: translateX(20px);
        }
        
        .cw-pill.docked { opacity: 1; transform: translateX(0); }

        /* --- ESTADO COLAPSADO (A BOLINHA) --- */
        .cw-pill.collapsed {
            /* Altura = Largura = 48px */
            max-height: 48px !important; 
            
            /* Geometria de Bola Perfeita */
            border-radius: 50% !important; 
            
            background: rgba(30, 30, 30, 0.98); 
            border-color: rgba(255,255,255,0.15);
            transition: 
                max-height 0.5s var(--spring-close),
                border-radius 0.3s ease;
        }

        /* --- HEADER DA MARCA (Grip/Toggle) --- */
        .cw-brand-header {
            width: 48px;  /* Largura total */
            height: 48px; /* Altura total (importante para a bolinha) */
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            z-index: 20;
            cursor: grab;
            
            /* Separador visual apenas no modo aberto */
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            transition: background 0.3s ease, border-color 0.2s ease;
        }
        
        .cw-pill.collapsed .cw-brand-header {
            border-bottom-color: transparent; /* Remove linha na bolinha */
        }
        
        .cw-brand-header:active { cursor: grabbing; }
        .cw-brand-header:hover { background: rgba(255,255,255,0.08); }

        /* Ícone da Marca */
        .cw-brand-icon {
            width: 22px; height: 22px;
            color: #fff;
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
            transition: transform 0.5s var(--spring-open);
        }

        /* Animação do Ícone ao Interagir */
        .cw-brand-header:hover .cw-brand-icon {
            transform: scale(1.1);
            filter: drop-shadow(0 0 12px rgba(138, 180, 248, 0.6));
        }
        
        /* Gira ao fechar/abrir */
        .cw-pill.collapsed .cw-brand-icon {
            transform: rotate(-180deg);
        }

        /* --- CONTAINER DOS MÓDULOS (Conteúdo) --- */
        .cw-modules-container {
            display: flex; flex-direction: column; align-items: center; gap: 8px;
            width: 100%;
            padding: 8px 0 16px 0; /* Padding interno do conteúdo */
            
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.3s ease 0.15s, transform 0.5s var(--spring-open);
        }
        
        /* Ao Fechar: Some rápido */
        .cw-pill.collapsed .cw-modules-container {
            opacity: 0; 
            pointer-events: none;
            transform: translateY(-20px);
            transition: opacity 0.1s ease, transform 0.2s ease;
        }

        /* --- BOTÕES (Estilo Original) --- */
        .cw-btn {
            width: 36px; height: 36px; flex-shrink: 0;
            border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; 
            cursor: pointer; position: relative; 
            color: ${COLORS.iconIdle};
            transition: all 0.2s ease;
        }
        
        .cw-btn svg { width: 20px; height: 20px; fill: currentColor; pointer-events: none; }

        .cw-btn:hover { 
            background: rgba(255, 255, 255, 0.15); 
            color: #fff;
            transform: scale(1.1); 
        }

        /* Cores Ativas */
        .cw-btn.notes.active { color: ${COLORS.blue} !important; background: rgba(138, 180, 248, 0.15); }
        .cw-btn.email.active { color: ${COLORS.red} !important; background: rgba(242, 139, 130, 0.15); }
        .cw-btn.script.active { color: ${COLORS.purple} !important; background: rgba(197, 138, 249, 0.15); }
        .cw-btn.links.active { color: ${COLORS.green} !important; background: rgba(129, 201, 149, 0.15); }
        .cw-btn.broadcast.active { color: ${COLORS.orange} !important; background: rgba(249, 171, 0, 0.15); }

        /* Separador */
        .cw-sep { 
            width: 20px; height: 1px; 
            background: rgba(255,255,255,0.1); 
            margin: 4px 0; flex-shrink: 0;
        }

        /* Badge */
        .cw-badge {
            position: absolute; top: 0; right: 0; width: 9px; height: 9px;
            background-color: #ff453a; border-radius: 50%;
            border: 2px solid var(--glass-bg);
            pointer-events: none; z-index: 10;
            animation: popIn 0.4s var(--spring-open);
        }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

        /* Tooltips */
        .cw-tooltip {
            position: absolute; right: 54px; top: 50%; transform: translateY(-50%) translateX(10px);
            background: rgba(25, 25, 25, 0.95); 
            color: #fff; padding: 5px 10px; border-radius: 6px;
            font-size: 12px; font-weight: 500; font-family: 'Google Sans', sans-serif;
            opacity: 0; pointer-events: none; transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
            white-space: nowrap;
        }
        .cw-btn:hover .cw-tooltip, .cw-brand-header:hover .cw-tooltip {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        
        .cw-pill.side-left .cw-tooltip { right: auto; left: 54px; transform: translateY(-50%) translateX(-10px); }
        .cw-pill.side-left .cw-btn:hover .cw-tooltip { transform: translateY(-50%) translateX(0); }

        /* Processing Center */
        .cw-pill.processing-center {
            width: 280px !important; height: auto !important; max-height: 80px !important;
            padding: 20px !important; border-radius: 40px !important;
            flex-direction: row !important; gap: 16px !important;
            background: #111 !important;
        }
    `;   document.head.appendChild(style);
  }

  // 2. CONSTRUÇÃO DO DOM
const ICONS = {
    // Ícones Originais (Filled/Sólidos)
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    notes: `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
    broadcast: `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    
    // Novo Brand Icon (Nexus)
    nexus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3m-2.83-7.17l2.12-2.12M4.93 19.07l2.12-2.12M19.07 19.07l-2.12-2.12M7.05 4.93L4.93 7.05"/></svg>`
  };

  const pill = document.createElement("div");
  pill.className = "cw-pill side-right";
  
  pill.innerHTML = `
<div class="cw-brand-header" id="cw-header-trigger" title="Segure para mover, Clique para fechar">
        <div class="cw-brand-icon">${ICONS.nexus}</div>
    </div>
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
  // 5. FÍSICA DE ARRASTO E TOGGLE
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  const DRAG_THRESHOLD = 3;
  
  // Controle de estado do colapso
  let isCollapsed = false; 

  pill.onmousedown = (e) => {
    // Se clicar em um botão (módulos), NÃO arrasta (Comportamento original preservado)
    if (e.target.closest("button")) return;
    
    e.preventDefault();
    startX = e.clientX; 
    startY = e.clientY;
    
    const rect = pill.getBoundingClientRect();
    initialLeft = rect.left; 
    initialTop = rect.top;
    
    // Assumimos que não é drag até que mova
    isDragging = false; 

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    // Só ativa o modo "Drag" se mover mais que 3px (preservando lógica original)
    if (!isDragging && Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
      isDragging = true;
      pill.style.transition = "none"; // Remove transição durante arrasto para ficar rápido
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
    
    // Restaura a transição suave (incluindo max-height para o colapso)
    pill.style.transition = "max-height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

    if (isDragging) {
      // --- LÓGICA DE SOLTAR (DROP) ---
      isDragging = false;
      
      // Lógica de "Snap" original preservada
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const rect = pill.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      
      let targetLeft;
      if (centerX < screenW / 2) {
        targetLeft = 24;
        pill.classList.remove("side-right"); pill.classList.add("side-left");
      } else {
        targetLeft = screenW - rect.width - 24;
        pill.classList.remove("side-left"); pill.classList.add("side-right");
      }
      let targetTop = rect.top;
      if (targetTop < 24) targetTop = 24;
      if (targetTop > screenH - rect.height - 24) targetTop = screenH - rect.height - 24;

      pill.style.left = `${targetLeft}px`;
      pill.style.top = `${targetTop}px`;
      
    } else {
      // --- LÓGICA DE CLIQUE (TOGGLE) ---
      // Se chegamos no MouseUp e isDragging é falso, foi um clique limpo!
      
      // Verifica se o clique foi no Header (Brand Icon) antes de fechar
      // Isso impede que cliques acidentais na borda fechem
      if (e.target.closest('.cw-brand-header')) {
          toggleCollapse();
      }
    }
  }

  function toggleCollapse() {
      isCollapsed = !isCollapsed;
      if (isCollapsed) {
          pill.classList.add('collapsed');
      } else {
          pill.classList.remove('collapsed');
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