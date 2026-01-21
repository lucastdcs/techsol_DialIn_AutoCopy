import { DataService } from './data-service.js'; 
import { showToast } from './utils.js';

// src/modules/shared/command-center.js

// --- 1. CONFIGURAÇÃO VISUAL (Original do Repositório) ---
const COLORS = {
  glassBg: "rgba(61, 61, 61, 0.77)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  glassActive: "rgba(79, 79, 79, 0.89)",
  glassHighlight: "rgba(255, 255, 255, 0.08)",
  iconIdle: "#c2c5c8ff", // Cinza original
  iconActive: "#FFFFFF",
  
  // Cores de Marca
  blue: "#8AB4F8",   
  red: "#F28B82",    
  purple: "#C58AF9", 
  green: "#81C995",  
  orange: "#F9AB00", 
teal: "#00BFA5",

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

            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                z-index: 2147483646; opacity: 0; pointer-events: none;
                transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            }
            .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

            /* --- ESTADO ABERTO (A Mágica acontece aqui) --- */
            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 16px 8px;
                
                background: ${COLORS.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${COLORS.glassBorder}; border-radius: 50px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.2); z-index: 2147483647;
                
                opacity: 0; 
                min-width: 50px; 
                overflow: hidden;

                /* SEQUÊNCIA DE ABERTURA: Container PRIMEIRO (Delay 0s) */
                transition: 
                    width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s, 
                    height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                    padding 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                    border-radius 0.4s ease 0s,
                    opacity 0.3s ease 0s,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s;
            }
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            /* --- ESTADO COLAPSADO (A Bolinha) --- */
            .cw-pill.collapsed {
                width: 50px !important; 
                height: 50px !important;
                padding: 0 !important;
                border-radius: 50% !important;
                gap: 0;
                cursor: pointer;

                /* SEQUÊNCIA DE FECHAMENTO: Container DEPOIS (Delay 0.2s) */
                /* Espera o conteúdo sumir para não "mastigar" os ícones */
                transition: 
                    width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s,
                    height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 1s,
                    padding 0.5s ease 0.2s,
                    border-radius 0.5s ease 1s,
                    opacity 0.3s ease 0s,
                    transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 1s !important;
            }
            
            /* --- CONTEÚDO INTERNO (Botões) --- */
            .cw-btn, .cw-grip, .cw-sep, .cw-status-container {
                opacity: 1;
                transform: scale(1);
                
                /* ABERTURA: Conteúdo aparece DEPOIS (Delay 0.3s) */
                /* Dá tempo da pílula esticar antes de mostrar o recheio */
                transition: 
                    opacity 0.3s ease 0.3s, 
                    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
            }

            /* --- CONTEÚDO QUANDO FECHADO --- */
            .cw-pill.collapsed .cw-btn, 
            .cw-pill.collapsed .cw-grip, 
            .cw-pill.collapsed .cw-sep, 
            .cw-pill.collapsed .cw-status-container {
                opacity: 0; 
                pointer-events: none; 
                transform: scale(0.5); /* Encolhe para o fundo */
                
                /* FECHAMENTO: Conteúdo some PRIMEIRO (Delay 0s) */
                transition: 
                    opacity 0.15s ease 0s, 
                    transform 0.15s ease 0s;
            }

            /* --- LOGO PRINCIPAL --- */
            .cw-main-logo {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                opacity: 0; pointer-events: none; 
                transform: scale(0.5) rotate(-90deg);
                color: #fff;
                
                /* Some rápido ao abrir */
                transition: all 0.2s ease 0s;
            }
            .cw-main-logo svg { width: 24px; height: 24px; fill: currentColor; }
            
            .cw-pill.collapsed .cw-main-logo { 
                opacity: 1; 
                transform: scale(1) rotate(0deg);
                /* Aparece suavemente DEPOIS que virou bolinha (Delay 0.3s) */
                transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
            }

            /* --- RESTO DOS ESTILOS (Mantidos) --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${COLORS.iconIdle};
            }
            .cw-btn:hover { background: ${COLORS.glassHighlight}; color: ${COLORS.iconActive}; transform: scale(1.1) !important; }

            .cw-btn.notes.active { color: ${COLORS.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${COLORS.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${COLORS.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${COLORS.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.broadcast.active { color: ${COLORS.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${COLORS.teal} !important; background: rgba(0, 191, 165, 0.15); }
.cw-btn.timezone:hover { color: ${COLORS.teal}; filter: drop-shadow(0 0 5px rgba(0, 191, 165, 0.5)); }

            .cw-btn.notes:hover { color: ${COLORS.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${COLORS.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${COLORS.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${COLORS.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
            .cw-btn.broadcast:hover { color: ${COLORS.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); }

            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; 
                width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0);
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); pointer-events: none;
            }
            .cw-btn.active::before { transform: translateX(-50%) scale(1); }
            
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            .cw-badge {
                position: absolute; top: 8px; right: 8px;
                width: 8px; height: 8px;
                background-color: #d93025; border-radius: 50%;
                border: 1px solid #fff; pointer-events: none;
                box-shadow: 0 1px 2px rgba(0,0,0,0.2);
                z-index: 10;
                animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

            .cw-sep {
                width: 20px; height: 1px; background: rgba(255,255,255,0.2);
                transition: opacity 0.3s ease 0.3s; /* Delay também no separador */
            }
            .cw-sep.visible { opacity: 1; }
            .cw-pill.collapsed .cw-sep { opacity: 0; transition: opacity 0.1s ease 0s; }

            .cw-grip {
                width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; 
                cursor: grab; margin-bottom: 2px; 
            }
            .cw-grip-bar { 
                width: 24px; height: 4px; background-color: ${COLORS.iconIdle}; border-radius: 4px; 
                opacity: 0.4; transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); 
            }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-grip:active { cursor: grabbing; }
            .cw-pill.dragging .cw-grip-bar { background-color: ${COLORS.blue}; width: 16px; opacity: 1; }

            @keyframes successPop {
                0% { box-shadow: 0 0 0 transparent; transform: scale(1); }
                50% { box-shadow: 0 0 15px #81C995; transform: scale(1.05); border-color: #81C995; }
                100% { box-shadow: 0 0 0 transparent; transform: scale(1); }
            }
            .cw-pill.system-check { animation: successPop 0.6s ease-out; }
            
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

            /* Processing Center */
            .cw-pill.processing-center {
                top: 50% !important; left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 320px !important; height: 110px !important;
                border-radius: 28px !important;
                background: #202124 !important;
                padding: 0 !important;
                box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important;
                display: flex !important; flex-direction: column !important;
                justify-content: center !important; align-items: center !important;
            }
            .cw-pill.processing-center.collapsed { background: #202124 !important; overflow: visible !important; }
            .cw-pill.processing-center .cw-main-logo { display: none !important; }
            .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
            .cw-center-stage {
                display: flex; flex-direction: column; align-items: center; gap: 14px;
                width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.1s;
                position: relative;
            }
            .cw-center-dots { display: flex; gap: 8px; }
            .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
            .cw-center-dots span:nth-child(1) { background-color: ${COLORS.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${COLORS.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${COLORS.green}; }
            .cw-center-text {
                font-size: 13px; color: #E8EAED; text-align: center; max-width: 90%;
                font-weight: 500; line-height: 1.4; opacity: 0; transform: translateY(10px);
                animation: textSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.2s;
            }
            .cw-center-success { display: none; color: ${COLORS.green}; }
            .cw-center-success svg { width: 40px; height: 40px; }
            .cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .cw-abort-btn {
                position: absolute; bottom: -32px; font-size: 10px; color: rgba(255, 255, 255, 0.2);
                cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; 
                transition: all 0.3s ease; user-select: none; margin-bottom: 8px;
            }
            .cw-abort-btn:hover { color: #F28B82; opacity: 1; }
            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
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
    main: `<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
    timezone: `<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`,
  };

  const pill = document.createElement("div");
  // Começa Fechado (Collapsed)
  pill.className = "cw-pill side-right collapsed";
  
  pill.innerHTML = `
        <div class="cw-main-logo">${ICONS.main}</div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${ICONS.notes}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${ICONS.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${ICONS.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${ICONS.links}</button>

<button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${ICONS.timezone}</button>
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

  // 3. LISTENERS INTELIGENTES
  const toggleModule = (btnClass, actionFn) => {
      const btn = pill.querySelector(`.${btnClass}`);
      pill.querySelectorAll('.cw-btn').forEach(b => {
          if (b !== btn) b.classList.remove('active');
      });
      btn.classList.toggle('active');
      actionFn();
  };

  pill.querySelector(".notes").onclick = (e) => { e.stopPropagation(); toggleModule('notes', actions.toggleNotes); };
  pill.querySelector(".email").onclick = (e) => { e.stopPropagation(); toggleModule('email', actions.toggleEmail); };
  pill.querySelector(".script").onclick = (e) => { e.stopPropagation(); toggleModule('script', actions.toggleScript); };
  pill.querySelector(".links").onclick = (e) => { e.stopPropagation(); toggleModule('links', actions.toggleLinks); };
  pill.querySelector(".timezone").onclick = (e) => { e.stopPropagation(); toggleModule('timezone', actions.toggleTimezone); };
  
  pill.querySelector(".broadcast").onclick = (e) => { 
      e.stopPropagation(); 
      toggleModule('broadcast', () => {
        const badge = e.currentTarget.querySelector('.cw-badge');
        if(badge) badge.remove();
        if(actions.broadcastControl) actions.broadcastControl.toggle(); 
      });
  };

  if (actions.broadcastControl && actions.broadcastControl.hasUnread) {
      const badge = document.createElement('div');
      badge.className = 'cw-badge';
      pill.querySelector('.broadcast').appendChild(badge);
  }

  // --- LÓGICA DE FECHAMENTO AUTOMÁTICO ---
  let closeTimer = null;

  pill.onmouseleave = () => {
      // Verifica se tem algum botão ativo
      const isAnyActive = pill.querySelector('.cw-btn.active');
      if (isAnyActive || pill.classList.contains('processing-center')) return; 

      closeTimer = setTimeout(() => {
          pill.classList.add('collapsed');
      }, 700); 
  };

  pill.onmouseenter = () => {
      if (closeTimer) clearTimeout(closeTimer);
      // Mantivemos sem lógica de abrir aqui (só clique)
  };

  // 4. ANIMAÇÃO INICIAL
  (async function startAnimation() {
    await esperar(2800); pill.classList.add("docked");
    await esperar(300);
    const items = pill.querySelectorAll(".cw-btn");
    pill.querySelectorAll(".cw-sep").forEach((s) => s.classList.add("visible"));
    for (let i = 0; i < items.length; i++) { items[i].classList.add("popped"); await esperar(90); }
    await esperar(200); pill.classList.add("system-check");
  })();

  // 5. DRAG & DROP ORIGINAL (Com Lógica Collapsed)
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  const DRAG_THRESHOLD = 3;

  pill.onmousedown = (e) => {
    // Permite clicar nos botões se estiver aberto (e previne drag no clique do botão)
    if (e.target.closest("button")) return;
    
    e.preventDefault();
    startX = e.clientX; startY = e.clientY;
    const rect = pill.getBoundingClientRect();
    initialLeft = rect.left; initialTop = rect.top;
    
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    // Detecta intenção de arrasto
    if (!isDragging && Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
      isDragging = true;
      pill.style.transition = "none"; // Remove transição para o drag ficar 1:1
      if(closeTimer) clearTimeout(closeTimer);
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
    
    if (isDragging) {
      // --- ARRASTO ---
      isDragging = false;
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
      let targetTop = Math.max(24, Math.min(rect.top, screenH - rect.height - 24));

      // 1. Aplica o movimento do arrasto com prioridade
      setTimeout(() => {
          pill.style.setProperty(
              'transition', 
              'left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', 
              'important'
          );
          pill.style.left = `${targetLeft}px`;
          pill.style.top = `${targetTop}px`;
          pill.style.bottom = "auto";
          pill.style.transform = ""; 
      }, 10);

      // 2. Limpa para o CSS "Coreografado" voltar a funcionar
      setTimeout(() => { 
          pill.style.transition = ""; 
          pill.style.removeProperty('transition');
      }, 700);

    } else {
      // --- CLIQUE ---
      const isAnyActive = pill.querySelector('.cw-btn.active');
      const isBtnClick = e.target.closest('button');

      if (pill.classList.contains('collapsed')) {
          // ABRIR: Smart Docking
          const rect = pill.getBoundingClientRect();
          const screenH = window.innerHeight;
          const isBottomHalf = rect.top > (screenH / 2);

          pill.style.setProperty('transition', 'none', 'important');

          if (isBottomHalf) {
              const currentBottom = screenH - rect.bottom;
              pill.style.top = 'auto';
              pill.style.bottom = `${currentBottom}px`;
          } else {
              pill.style.bottom = 'auto';
              pill.style.top = `${rect.top}px`;
          }

          void pill.offsetWidth;
          pill.style.removeProperty('transition');

          pill.classList.remove('collapsed');

      } else {
          // FECHAR
          if (!isAnyActive && !isBtnClick) {
             pill.classList.add('collapsed');
          }
      }

      if (isBtnClick) {
        isBtnClick.style.transform = "scale(0.9)";
        setTimeout(() => (isBtnClick.style.transform = ""), 150);
      }
    }
  }
}

// --- FUNÇÃO DE PROCESSAMENTO COM CANCELAMENTO (MANTIDA IGUAL) ---
export function triggerProcessingAnimation() {
    const pill = document.querySelector('.cw-pill');
    const overlay = document.querySelector('.cw-focus-backdrop');
    if (!pill) return () => {}; 

    pill.classList.remove('collapsed'); // Garante aberto
    window._CW_ABORT_PROCESS = false;

    const stage = document.createElement('div');
    stage.className = 'cw-center-stage';
    stage.innerHTML = `
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-text">${DataService.getRandomTip()}</div>
        <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
    `;

    const abortBtn = document.createElement('div');
    abortBtn.className = 'cw-abort-btn';
    abortBtn.textContent = 'Cancelar';
    abortBtn.onclick = (e) => {
        e.stopPropagation();
        window._CW_ABORT_PROCESS = true; 
        showToast("Cancelado!", { duration: 3000 });
        stage.remove();
        pill.classList.remove('processing-center');
        pill.classList.remove('success');
        pill.classList.add('collapsed');
        if(overlay) overlay.classList.remove('active');
    };
    stage.appendChild(abortBtn);
    pill.appendChild(stage);

    const startTime = Date.now();
    pill.classList.add('processing-center');
    if(overlay) overlay.classList.add('active');

    return function finish() {
        if (window._CW_ABORT_PROCESS || !pill.contains(stage)) return;
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 2000 - elapsed); 

        setTimeout(() => {
            if (window._CW_ABORT_PROCESS || !pill.contains(stage)) return;
            const dots = stage.querySelector('.cw-center-dots');
            const text = stage.querySelector('.cw-center-text');
            const success = stage.querySelector('.cw-center-success');
            const abort = stage.querySelector('.cw-abort-btn');
            
            if(dots) dots.style.display = 'none';
            if(text) text.style.display = 'none';
            if(abort) abort.style.display = 'none';
            if(success) success.classList.add('show');
            
            pill.classList.add('success');
            setTimeout(() => {
                pill.classList.remove('processing-center');
                setTimeout(() => {
                    stage.remove();
                    pill.classList.remove('success');
                    pill.classList.add('collapsed'); 
                    if(overlay) overlay.classList.remove('active');
                }, 400);
            }, 1000); 
        }, remaining);
    };
}