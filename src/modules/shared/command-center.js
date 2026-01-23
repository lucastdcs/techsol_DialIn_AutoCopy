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
        transition: opacity 0.4s ease;
    }
    .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

    /* --- PILL PRINCIPAL --- */
    .cw-pill {
        position: fixed; top: 30%; right: 24px;
        display: flex; flex-direction: column; align-items: center; gap: 12px;
        padding: 16px 8px;
        
        background: ${COLORS.glassBg};
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        border: 1px solid ${COLORS.glassBorder}; border-radius: 50px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
        
        opacity: 0; 
        min-width: 50px; 
        
        overflow: visible;

        /* ABRIR: A pílula expande IMEDIATAMENTE (Delay 0s) */
        transition: 
            width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s, 
            height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
            padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
            gap 0.5s ease 0s,
            border-radius 0.5s ease 0s,
            opacity 0.3s ease 0s,
            transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s;
    }
    .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

    /* --- ESTADO COLAPSADO --- */
    .cw-pill.collapsed {
        width: 50px !important; 
        height: 50px !important;
        padding: 0 !important;
        gap: 0 !important; /* Importante para não somar altura */
        border-radius: 50% !important;
        cursor: pointer;
        
        overflow: hidden !important; 

        /* FECHAR: Delay de 0.4s em TUDO que afeta tamanho */
        /* Isso força a pílula a ficar "congelada" enquanto os ícones somem */
        transition: 
            width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s,
            height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s,
            padding 0.5s ease 0.4s,
            gap 0.5s ease 0.4s,
            border-radius 0.5s ease 0.4s,
            opacity 0.3s ease 0s,
            transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s !important;
    }
    
    /* --- LOGO DA BOLINHA (FIX DA COR PRETA) --- */
    .cw-main-logo {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; 
        
        transform: rotate(-180deg) scale(0.5);
        color: #fff; /* Garante branco */
        
        transition: all 0.2s ease 0s;
    }
    
    /* SVG Padrão (Branco) */
    .cw-main-logo svg { 
        fill: #fff; 
        width: 24px; height: 24px;
        transition: fill 0.3s;
    }
    
    /* Logo Entrando (Ao fechar) */
    .cw-pill.collapsed .cw-main-logo { 
        opacity: 1; 
        transform: rotate(0) scale(1);
        /* Delay alto (0.8s) para entrar só no finalzinho */
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s;
    }
    
    /* --- EFEITO GRADIENTE (SÓ NO HOVER) --- */
    .cw-pill.collapsed:hover .cw-main-logo svg {
        /* Esconde o SVG branco e mostra o fundo do container pai que terá o gradiente? */
        /* Melhor: Usar o SVG como mascara neste momento */
        fill: transparent;
    }
    
    /* No hover, aplicamos o gradiente no container do logo e usamos o SVG como mascara */
    .cw-pill.collapsed:hover .cw-main-logo {
        background-image: linear-gradient(135deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%);
        -webkit-mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E") center/24px no-repeat;
        mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E") center/24px no-repeat;
        transform: scale(1.1) rotate(0deg);
        transition-delay: 0s;
    }

    /* --- CONTEÚDO INTERNO --- */
    .cw-pill > *:not(.cw-main-logo) {
        opacity: 1;
        transform: scale(1);
        /* ABRIR: Slide-in com delay (0.3s) */
        transition: 
            opacity 0.4s ease 0.3s, 
            transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
    }

    /* --- EFEITO PUFF-OUT (SAÍDA IMEDIATA) --- */
    .cw-pill.collapsed > *:not(.cw-main-logo) {
        opacity: 0; 
        pointer-events: none; 
        
        /* Puff-Out: Aumenta e Desfoca */
        transform: scale(1.4); 
        filter: blur(8px);
        
        /* SAIR: Imediato (Delay 0s). Duration 0.3s. */
        /* Termina em 0.3s. A pílula começa a fechar em 0.4s. Margem segura. */
        transition: 
            opacity 0.3s ease 0s, 
            transform 0.3s ease 0s,
            filter 0.3s ease 0s;
    }

    /* --- CASCATA DE SAÍDA (BAIXO PARA CIMA) --- */
    .cw-pill.collapsed > *:nth-last-child(1) { transition-delay: 0.00s; }
    .cw-pill.collapsed > *:nth-last-child(2) { transition-delay: 0.04s; }
    .cw-pill.collapsed > *:nth-last-child(3) { transition-delay: 0.08s; }
    .cw-pill.collapsed > *:nth-last-child(4) { transition-delay: 0.12s; }
    .cw-pill.collapsed > *:nth-last-child(5) { transition-delay: 0.16s; }
    .cw-pill.collapsed > *:nth-last-child(6) { transition-delay: 0.20s; }
    .cw-pill.collapsed > *:nth-last-child(7) { transition-delay: 0.24s; }
    .cw-pill.collapsed > *:nth-last-child(8) { transition-delay: 0.28s; }
    .cw-pill.collapsed > *:nth-last-child(9) { transition-delay: 0.32s; }

    /* --- CASCATA DE ENTRADA (CIMA PARA BAIXO) --- */
    /* Soma-se ao delay base de 0.3s da abertura */
    .cw-pill:not(.collapsed) > *:nth-child(1) { transition-delay: 0.30s; }
    .cw-pill:not(.collapsed) > *:nth-child(2) { transition-delay: 0.35s; }
    .cw-pill:not(.collapsed) > *:nth-child(3) { transition-delay: 0.40s; }
    .cw-pill:not(.collapsed) > *:nth-child(4) { transition-delay: 0.45s; }
    .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.50s; }
    .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.55s; }
    .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.60s; }
    .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.65s; }
    .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.70s; }

    /* --- ESTILOS VISUAIS (Mantidos) --- */
    .cw-btn {
        width: 40px; height: 40px; 
        border-radius: 50%; border: none; background: transparent;
        display: flex; align-items: center; justify-content: center; 
        cursor: pointer; position: relative; color: ${COLORS.iconIdle};
        flex-shrink: 0;
    }
    .cw-btn:hover { background: ${COLORS.glassHighlight}; color: ${COLORS.iconActive}; transform: scale(1.1) !important; }

    .cw-btn.notes.active { color: ${COLORS.blue} !important; background: rgba(138, 180, 248, 0.15); }
    .cw-btn.email.active { color: ${COLORS.red} !important; background: rgba(242, 139, 130, 0.15); }
    .cw-btn.script.active { color: ${COLORS.purple} !important; background: rgba(197, 138, 249, 0.15); }
    .cw-btn.links.active { color: ${COLORS.green} !important; background: rgba(129, 201, 149, 0.15); }
    .cw-btn.broadcast.active { color: ${COLORS.orange} !important; background: rgba(249, 171, 0, 0.15); }
    .cw-btn.timezone.active { color: ${COLORS.teal} !important; background: rgba(0, 191, 165, 0.15); }

    /* LED e Tooltips (Hidden fix) */
    .cw-btn::before {
        content: ''; position: absolute; bottom: 2px; left: 50%; width: 4px; height: 4px; border-radius: 50%;
        background-color: currentColor; box-shadow: 0 0 6px currentColor;
        transform: translateX(-50%) scale(0);
        opacity: 0; visibility: hidden;
        transition: transform 0.3s, opacity 0.2s; pointer-events: none;
    }
    .cw-btn.active::before { transform: translateX(-50%) scale(1); opacity: 1; visibility: visible; }
    
    .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

    .cw-btn::after { 
        content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); 
        padding: 6px 12px; border-radius: 6px; background: #202124; color: #fff; 
        font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; 
        opacity: 0; visibility: hidden; pointer-events: none; 
        transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap; 
        border: 1px solid rgba(255,255,255,0.15); z-index: 2147483648; 
    }
    .cw-btn:hover::after { opacity: 1; visibility: visible; transform: translateY(-50%) scale(1); }
    .cw-pill.side-right .cw-btn::after { right: 55px; transform-origin: right center; }
    .cw-pill.side-left .cw-btn::after { left: 55px; transform-origin: left center; }

    .cw-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #d93025; border-radius: 50%; border: 1px solid #fff; pointer-events: none; box-shadow: 0 1px 2px rgba(0,0,0,0.2); z-index: 10; animation: popIn 0.3s; }
    @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

    .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); margin: 4px 0; }
    .cw-sep.visible { opacity: 1; }
    .cw-pill.collapsed .cw-sep { opacity: 0; transition: opacity 0.1s ease 0s; }

    .cw-grip { width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; cursor: grab; margin-bottom: 2px; }
    .cw-grip-bar { width: 24px; height: 4px; background-color: ${COLORS.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
    .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
    .cw-pill.dragging .cw-grip-bar { background-color: ${COLORS.blue}; width: 16px; opacity: 1; }

    /* Processing */
    .cw-pill.processing-center { top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; width: 320px !important; height: 110px !important; border-radius: 28px !important; background: #202124 !important; padding: 0 !important; box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important; display: flex !important; flex-direction: column !important; justify-content: center !important; }
    .cw-pill.processing-center.collapsed { background: #202124 !important; overflow: visible !important; }
    .cw-pill.processing-center .cw-main-logo { display: none !important; }
    .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
    .cw-center-stage { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.1s; position: relative; }
    .cw-center-dots { display: flex; gap: 8px; }
    .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
    .cw-center-dots span:nth-child(1) { background-color: ${COLORS.blue}; animation-delay: -0.32s; }
    .cw-center-dots span:nth-child(2) { background-color: ${COLORS.red}; animation-delay: -0.16s; }
    .cw-center-dots span:nth-child(3) { background-color: ${COLORS.green}; }
    .cw-center-text { font-size: 13px; color: #E8EAED; text-align: center; max-width: 90%; font-weight: 500; line-height: 1.4; opacity: 0; transform: translateY(10px); animation: textSlideUp 0.5s forwards 0.2s; }
    .cw-center-success { display: none; color: ${COLORS.green}; }
    .cw-center-success.show { display: block; animation: popIn 0.4s; }
    .cw-abort-btn { position: absolute; bottom: -32px; font-size: 10px; color: rgba(255, 255, 255, 0.2); cursor: pointer; text-transform: uppercase; font-weight: 600; transition: all 0.3s; }
    .cw-abort-btn:hover { color: #F28B82; opacity: 1; }
    @keyframes fadeIn { to { opacity: 1; } }
    @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes googleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }
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