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
    transition: opacity 0.5s ease;
}
.cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

/* --- CONTAINER (PILL) --- */
.cw-pill {
    position: fixed; top: 30%; right: 24px;
    display: flex; flex-direction: column; align-items: center; gap: 12px;
    padding: 16px 8px;
    
    /* Vidro Intenso estilo iOS */
    background: rgba(40, 40, 40, 0.85);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    z-index: 2147483647;
    
    opacity: 0; min-width: 50px; overflow: hidden;

    /* ABRIR: Mola suave */
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

/* --- FECHADO --- */
.cw-pill.collapsed {
    width: 50px !important; height: 50px !important;
    padding: 0 !important; gap: 0 !important;
    border-radius: 50% !important; cursor: pointer;
    
    /* FECHAR: Delay de 0.1s no container para dar tempo do blur acontecer */
    transition: all 0.6s cubic-bezier(0.32, 0.72, 0, 1) 0.1s;
}

/* --- CONTEÚDO --- */
.cw-btn, .cw-grip, .cw-sep {
    opacity: 1; transform: scale(1); filter: blur(0px);
    transition: all 0.4s ease 0.2s; /* Delay ao abrir */
}

/* Quando fecha: Blur + Scale Down rápido */
.cw-pill.collapsed > *:not(.cw-main-logo) {
    opacity: 0; pointer-events: none;
    transform: scale(0.8);
    filter: blur(12px); /* O segredo: o ícone vira fumaça */
    transition: all 0.2s ease 0s; /* Sem delay, some na hora */
}

/* --- LOGO --- */
.cw-main-logo {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center; color: #fff;
    opacity: 0; transform: scale(0.5); filter: blur(4px);
    transition: all 0.2s ease;
}
.cw-pill.collapsed .cw-main-logo {
    opacity: 1; transform: scale(1); filter: blur(0px);
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) 0.2s;
}

/* --- ESTILOS PADRÃO DOS BOTÕES (Necessário manter) --- */
.cw-btn { width: 40px; height: 40px; border-radius: 50%; border: none; background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; color: ${COLORS.iconIdle}; position: relative; flex-shrink:0; }
.cw-btn:hover { background: rgba(255, 255, 255, 0.1); color: #FFF; transform: scale(1.15) !important; }
.cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }
.cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); margin: 4px 0; }
.cw-grip { width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; cursor: grab; }
.cw-grip-bar { width: 24px; height: 4px; background-color: ${COLORS.iconIdle}; border-radius: 4px; opacity: 0.4; }
.cw-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #d93025; border-radius: 50%; border: 2px solid rgba(40,40,40,0.8); }

/* --- processing center styles (mantidos simplificados) --- */
.cw-pill.processing-center { top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; width: 320px !important; height: 110px !important; background: #202124 !important; padding: 0 !important; }
.cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
.cw-center-stage { display: flex; flex-direction: column; align-items: center; width: 100%; opacity: 0; animation: fadeIn 0.4s forwards; }
@keyframes fadeIn { to { opacity: 1; } }
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