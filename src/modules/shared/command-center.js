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

        /* --- FÍSICA DA ANIMAÇÃO (Apple Spring) --- */
        :root {
            /* Abertura: Rápida no início, freio suave no final (Bounce sutil) */
            --spring-open: cubic-bezier(0.175, 0.885, 0.32, 1.1); 
            /* Fechamento: Rápido e preciso (Sem bounce) */
            --spring-close: cubic-bezier(0.6, -0.28, 0.735, 0.045);
            /* Padrão de Vidro Apple */
            --glass-bg: rgba(30, 30, 30, 0.85);
            --glass-border: rgba(255, 255, 255, 0.12);
        }

        .cw-focus-backdrop {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.3); backdrop-filter: blur(4px);
            z-index: 2147483646; opacity: 0; pointer-events: none;
            transition: opacity 0.4s ease;
        }
        .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

        /* --- PÍLULA (Container) --- */
        .cw-pill {
            position: fixed; top: 100px; right: 24px;
            display: flex; flex-direction: column; align-items: center; 
            
            /* Largura Fixa e Padding Rítmico (8px grid) */
            width: 56px; 
            padding: 8px; /* Padding uniforme cria a moldura */
            gap: 12px;    /* Espaço confortável entre ícones */
            
            background: var(--glass-bg);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid var(--glass-border); 
            
            /* Borda Arredondada (Squircle visual) */
            border-radius: 28px; 
            
            /* Sombra "Elevada" do iOS */
            box-shadow: 
                0 4px 8px rgba(0,0,0,0.1),
                0 16px 40px rgba(0,0,0,0.3);
            
            z-index: 2147483647;
            overflow: hidden;

            /* ANIMAÇÃO DE ALTURA (A Mágica) */
            /* Usamos max-height para animar de "auto" para "fixo" */
            transition: 
                max-height 0.6s cubic-bezier(0.25, 1, 0.5, 1), /* Curva ultra suave */
                background 0.3s ease,
                opacity 0.4s ease,
                transform 0.1s linear, top 0.1s linear, left 0.1s linear; /* Drag linear */
            
            max-height: 600px; /* Estado Aberto */
            opacity: 0; transform: translateX(20px);
        }
        
        .cw-pill.docked { opacity: 1; transform: translateX(0); }

        /* --- ESTADO COLAPSADO (Pílula Curta) --- */
        .cw-pill.collapsed {
            /* Altura = (Padding Top 8px) + (Icon 40px) + (Padding Bottom 8px) = 56px */
            max-height: 56px !important; 
            background: rgba(20, 20, 20, 0.95); /* Mais escuro para foco */
            border-color: rgba(255,255,255,0.2);
            /* Nota: Não mudamos width nem border-radius, mantendo a estabilidade */
        }

        /* --- HEADER DA MARCA (Grip) --- */
        .cw-brand-header {
            width: 40px; height: 40px; /* Tamanho igual aos botões */
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            z-index: 20;
            cursor: grab; /* Cursor correto */
            
            /* Separador Visual Sutil (Apenas Margem) */
            margin-bottom: 4px;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .cw-brand-header:active { cursor: grabbing; transform: scale(0.95); }
        .cw-brand-header:hover { background: rgba(255,255,255,0.1); }

        /* Ícone da Marca */
        .cw-brand-icon {
            width: 24px; height: 24px;
            color: #fff;
            /* Glow Suave */
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
            transition: transform 0.5s var(--spring-open);
        }

        /* Rotação e Feedback ao Hover */
        .cw-brand-header:hover .cw-brand-icon {
            transform: rotate(15deg) scale(1.1);
            filter: drop-shadow(0 0 15px rgba(138, 180, 248, 0.6));
        }

        /* Quando colapsado, o ícone gira para indicar mudança de estado */
        .cw-pill.collapsed .cw-brand-icon {
            transform: rotate(-180deg);
        }

        /* --- CONTAINER DOS MÓDULOS (Conteúdo que some) --- */
        .cw-modules-container {
            display: flex; flex-direction: column; align-items: center; gap: 12px;
            width: 100%;
            padding-bottom: 8px; /* Padding inferior extra para equilíbrio */
            
            /* Animação de Opacidade e Posição */
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.3s ease 0.2s, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        /* Ao Fechar: Some RÁPIDO e sobe (Slide Up) */
        .cw-pill.collapsed .cw-modules-container {
            opacity: 0; 
            pointer-events: none;
            transform: translateY(-30px); /* Efeito de gaveta */
            transition: opacity 0.1s ease, transform 0.2s ease; /* Sem delay ao fechar */
        }

        /* --- BOTÕES --- */
        .cw-btn {
            width: 40px; height: 40px; flex-shrink: 0;
            border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; 
            cursor: pointer; position: relative; 
            color: ${COLORS.iconIdle};
            transition: all 0.2s ease;
        }
        
        .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

        .cw-btn:hover { 
            background: rgba(255, 255, 255, 0.15); 
            color: #fff;
            transform: scale(1.05); /* Zoom sutil */
        }

        /* Cores Ativas (Glow Background) */
        .cw-btn.active { color: #fff !important; }
        .cw-btn.notes.active { background: ${COLORS.blue}33; box-shadow: 0 0 12px ${COLORS.blue}40; }
        .cw-btn.email.active { background: ${COLORS.red}33; box-shadow: 0 0 12px ${COLORS.red}40; }
        .cw-btn.script.active { background: ${COLORS.purple}33; box-shadow: 0 0 12px ${COLORS.purple}40; }
        .cw-btn.links.active { background: ${COLORS.green}33; box-shadow: 0 0 12px ${COLORS.green}40; }
        .cw-btn.broadcast.active { background: ${COLORS.orange}33; box-shadow: 0 0 12px ${COLORS.orange}40; }

        /* Separador */
        .cw-sep { 
            width: 24px; height: 1px; 
            background: rgba(255,255,255,0.1); 
            margin: 2px 0; flex-shrink: 0;
        }

        /* Badge */
        .cw-badge {
            position: absolute; top: 0; right: 0; width: 10px; height: 10px;
            background-color: #ff453a; border-radius: 50%;
            border: 2px solid #2c2c2e; /* Borda escura para recorte */
            pointer-events: none; z-index: 10;
            animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

        /* Label Interno (Tooltip dentro da pill não cabe bem, mantemos lateral estilo Apple) */
        .cw-tooltip {
            position: absolute; right: 70px; top: 50%; transform: translateY(-50%) translateX(10px);
            background: rgba(20, 20, 20, 0.9); backdrop-filter: blur(8px);
            color: #fff; padding: 6px 12px; border-radius: 8px;
            font-size: 13px; font-weight: 500; font-family: -apple-system, system-ui, sans-serif;
            opacity: 0; pointer-events: none; transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
            white-space: nowrap;
        }
        .cw-btn:hover .cw-tooltip, .cw-brand-header:hover .cw-tooltip {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        
        /* Ajuste de lado */
        .cw-pill.side-left .cw-tooltip { right: auto; left: 70px; transform: translateY(-50%) translateX(-10px); }
        .cw-pill.side-left .cw-btn:hover .cw-tooltip { transform: translateY(-50%) translateX(0); }

        /* Processing Center */
        .cw-pill.processing-center {
            /* Mantém a lógica de transformação total */
            width: 280px !important; height: auto !important; max-height: 80px !important;
            padding: 20px !important; border-radius: 40px !important;
            flex-direction: row !important; gap: 16px !important;
            background: #000 !important;
        }
    `;    document.head.appendChild(style);
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