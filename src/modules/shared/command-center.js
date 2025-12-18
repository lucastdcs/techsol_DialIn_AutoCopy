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

        /* Overlay do Sistema */
        .cw-focus-backdrop {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
            z-index: 2147483646; opacity: 0; pointer-events: none;
            transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
        }
        .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

        /* --- A PÍLULA (Container Principal) --- */
        .cw-pill {
            position: fixed; top: 30%; right: 24px;
            display: flex; flex-direction: column; align-items: center; 
            
            /* Largura Fixa e Padding Controlado */
            width: 56px; 
            padding: 0; /* Padding zero, controlado internamente */
            
            background: ${COLORS.glassBg};
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            border: 1px solid ${COLORS.glassBorder}; 
            border-radius: 50px; /* Borda redonda sempre */
            box-shadow: 0 8px 32px rgba(0,0,0,0.4); 
            z-index: 2147483647;
            
            overflow: hidden; /* Essencial para a animação vertical */

            /* Animação Elástica Vertical (Cubic Bezier) */
            /* Note que NÃO animamos width, left ou top aqui para não estragar o drag */
            transition: 
                max-height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), 
                opacity 0.4s ease-out, 
                transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);

            /* Estado Aberto (Altura suficiente para tudo) */
            max-height: 600px;
            
            opacity: 0; transform: translateX(40px) scale(0.95);
        }
        .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

        /* --- ESTADO COLAPSADO (Apenas o Header visível) --- */
        .cw-pill.collapsed {
            max-height: 64px !important; /* Altura exata do Header + Margens */
            background: rgba(61, 61, 61, 0.95); /* Levemente mais escuro */
        }

        /* --- HEADER DA MARCA (O Novo Grip) --- */
        .cw-brand-header {
            width: 100%;
            height: 64px; /* Altura fixa para o topo */
            display: flex; align-items: center; justify-content: center;
            cursor: grab; /* Cursor de mãozinha */
            flex-shrink: 0;
            z-index: 20;
            
            /* Separador Visual (Linha sutil abaixo) */
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 4px;
        }
        
        .cw-brand-header:active { cursor: grabbing; }

        /* O Ícone da Marca */
        .cw-brand-icon {
            width: 28px; height: 28px;
            color: #fff;
            /* Gradiente/Brilho no ícone */
            filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Feedback de Hover no Header */
        .cw-brand-header:hover .cw-brand-icon {
            transform: scale(1.1);
            filter: drop-shadow(0 0 10px rgba(138, 180, 248, 0.6)); /* Brilho azulado */
        }

        /* --- MÓDULOS (Container dos botões) --- */
        .cw-modules-container {
            display: flex; flex-direction: column; align-items: center; gap: 12px;
            padding-bottom: 16px;
            width: 100%;
            transition: opacity 0.2s ease;
        }
        
        /* Quando fecha, os módulos somem rápido */
        .cw-pill.collapsed .cw-modules-container {
            opacity: 0; pointer-events: none;
        }

        /* --- BOTÕES ORIGINAIS (Preservados) --- */
        .cw-btn {
            width: 40px; height: 40px; 
            border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; 
            cursor: pointer; position: relative; color: ${COLORS.iconIdle};
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            flex-shrink: 0;
        }
        /* ... (Mantenha o resto do CSS original dos botões, active, hover, badges etc) ... */
        .cw-btn:hover { background: ${COLORS.glassHighlight}; color: ${COLORS.iconActive}; transform: scale(1.1); }
        .cw-btn.notes.active { color: ${COLORS.blue} !important; background: rgba(138, 180, 248, 0.15); }
        .cw-btn.email.active { color: ${COLORS.red} !important; background: rgba(242, 139, 130, 0.15); }
        .cw-btn.script.active { color: ${COLORS.purple} !important; background: rgba(197, 138, 249, 0.15); }
        .cw-btn.links.active { color: ${COLORS.green} !important; background: rgba(129, 201, 149, 0.15); }
        .cw-btn.broadcast.active { color: ${COLORS.orange} !important; background: rgba(249, 171, 0, 0.15); }
        .cw-btn::before { content: ''; position: absolute; bottom: 2px; left: 50%; width: 4px; height: 4px; border-radius: 50%; background-color: currentColor; box-shadow: 0 0 6px currentColor; transform: translateX(-50%) scale(0); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); pointer-events: none; }
        .cw-btn.active::before { transform: translateX(-50%) scale(1); }
        .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }
        
        .cw-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background-color: #d93025; border-radius: 50%; border: 1px solid #fff; pointer-events: none; box-shadow: 0 1px 2px rgba(0,0,0,0.2); z-index: 10; animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
        
        .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); margin: 4px 0; }
        
        /* Tooltips */
        .cw-btn::after { content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); padding: 6px 12px; border-radius: 6px; background: #202124; color: #fff; font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; opacity: 0; pointer-events: none; transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1); box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap; border: 1px solid rgba(255,255,255,0.15); }
        .cw-pill.side-right .cw-btn::after { right: 60px; transform-origin: right center; }
        .cw-pill.side-right .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
        .cw-pill.side-left .cw-btn::after { left: 60px; transform-origin: left center; }
        .cw-pill.side-left .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
        
        /* Animation Classes */
        @keyframes successPop { 0% { box-shadow: 0 0 0 transparent; transform: scale(1); } 50% { box-shadow: 0 0 15px #81C995; transform: scale(1.05); border-color: #81C995; } 100% { box-shadow: 0 0 0 transparent; transform: scale(1); } }
        .cw-pill.system-check { animation: successPop 0.6s ease-out; }
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