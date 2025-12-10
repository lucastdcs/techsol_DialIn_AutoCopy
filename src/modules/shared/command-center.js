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
  orange: "#F9AB00", // Broadcast (NOVO)
  
};

// Helper interno de tempo
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export function initCommandCenter(actions) {
  // actions agora contém: { toggleNotes, toggleEmail, toggleScript, toggleLinks, broadcastControl }

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

            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 16px 8px;
                background: ${COLORS.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${COLORS.glassBorder}; border-radius: 50px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 2147483647;
                opacity: 0; transform: translateX(40px) scale(0.95);
                transition: opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
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

            /* Estados Ativos e Cores */
            .cw-btn.notes.active { color: ${COLORS.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${COLORS.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${COLORS.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${COLORS.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.broadcast.active { color: ${COLORS.orange} !important; background: rgba(249, 171, 0, 0.15); } /* NOVO */

            .cw-btn.notes:hover { color: ${COLORS.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${COLORS.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${COLORS.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${COLORS.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
            .cw-btn.broadcast:hover { color: ${COLORS.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); } /* NOVO */

            /* Indicador LED */
            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; 
                width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0);
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); pointer-events: none;
            }
            .cw-btn.active::before { transform: translateX(-50%) scale(1); }
            
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            /* BADGE DE NOTIFICAÇÃO (Bolinha Vermelha) */
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
                opacity: 0; transition: opacity 0.5s ease;
            }
            .cw-sep.visible { opacity: 1; }

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

/* ... seus estilos atuais ... */

/* --- NOVO: ESTILOS DA ILHA DINÂMICA --- */

/* 1. Transição Fluida para a Pílula (Sobrescreve a padrão para ficar igual Apple) */
.cw-pill {
    transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* 2. O Estado Central (Transformação) */
.cw-pill.processing-center {
    top: 50% !important; left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 320px !important; height: 110px !important;
    border-radius: 28px !important;
    background: #202124 !important; /* Fundo sólido para destaque */
    padding: 0 !important;
    box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important;
    
    /* Centraliza conteúdo */
    display: flex !important; flex-direction: column !important;
    justify-content: center !important; align-items: center !important;
}

/* 3. Esconde os botões velhos quando for para o centro */
.cw-pill.processing-center > *:not(.cw-center-stage) {
    display: none !important;
}

/* 4. O Palco Central (Onde as bolinhas vão viver) */
.cw-center-stage {
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.1s;
}

/* 5. AS BOLINHAS DO GOOGLE (Réplica exata da sua original) */
.cw-center-dots { display: flex; gap: 8px; }
.cw-center-dots span {
    width: 10px; height: 10px; border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
}
/* Usa as variáveis COLORS que já existem no seu arquivo */
.cw-center-dots span:nth-child(1) { background-color: ${COLORS.blue}; animation-delay: -0.32s; }
.cw-center-dots span:nth-child(2) { background-color: ${COLORS.red}; animation-delay: -0.16s; }
.cw-center-dots span:nth-child(3) { background-color: ${COLORS.green}; }

/* 6. Texto da Dica */
.cw-center-text {
    font-size: 13px; color: #E8EAED; text-align: center; max-width: 90%;
    font-weight: 400; line-height: 1.4;
}

/* 7. Sucesso */
.cw-center-success { display: none; color: ${COLORS.green}; }
.cw-center-success svg { width: 40px; height: 40px; }
.cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

@keyframes fadeIn { to { opacity: 1; } }
@keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
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
    broadcast: `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`
  };

  const pill = document.createElement("div");
  pill.className = "cw-pill side-right";
  
  // ESTRUTURA ATUALIZADA (Links Subiu, Broadcast Entrou)
  pill.innerHTML = `
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

    // INSERE OVERLAY E PILL
    const overlay = document.createElement('div');
    overlay.className = 'cw-focus-backdrop';
    document.body.appendChild(overlay);
    document.body.appendChild(pill);

  // 3. LISTENERS
  pill.querySelector(".notes").onclick = (e) => { e.stopPropagation(); actions.toggleNotes(); };
  pill.querySelector(".email").onclick = (e) => { e.stopPropagation(); actions.toggleEmail(); };
  pill.querySelector(".script").onclick = (e) => { e.stopPropagation(); actions.toggleScript(); };
  pill.querySelector(".links").onclick = (e) => { e.stopPropagation(); actions.toggleLinks(); };
  
  // Listener do Broadcast (Com Badge Logic)
  pill.querySelector(".broadcast").onclick = (e) => { 
      e.stopPropagation(); 
      
      // Remove a bolinha vermelha visualmente se existir
      const badge = e.currentTarget.querySelector('.cw-badge');
      if(badge) {
          badge.style.transform = "scale(0)";
          setTimeout(() => badge.remove(), 200);
      }
      
      if(actions.broadcastControl) actions.broadcastControl.toggle(); 
  };

  // INJETA O BADGE (Se houver não lidos)
  if (actions.broadcastControl && actions.broadcastControl.hasUnread) {
      const badge = document.createElement('div');
      badge.className = 'cw-badge';
      pill.querySelector('.broadcast').appendChild(badge);
  }

  // 4. SEQUÊNCIA DE ANIMAÇÃO
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
    await esperar(200);
    pill.classList.add("system-check");
  })();

  // 5. FÍSICA DE ARRASTO
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  const DRAG_THRESHOLD = 3;

  pill.onmousedown = (e) => {
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
    if (!isDragging && Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
      isDragging = true;
      pill.style.transition = "none";
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
      isDragging = false;
      pill.style.transition = "left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";
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
      const btn = e.target.closest("button");
      if (btn) {
        btn.style.transform = "scale(0.9)";
        setTimeout(() => (btn.style.transform = ""), 150);
      }
    }
  }
}

// Importe DataService no topo se ainda não tiver

export function triggerProcessingAnimation() {
    const pill = document.querySelector('.cw-pill');
    const overlay = document.querySelector('.cw-focus-backdrop');
    if (!pill) return () => {}; 

    // 1. CRIAR ELEMENTOS NOVOS (Isolados do resto)
    const stage = document.createElement('div');
    stage.className = 'cw-center-stage';
    
    // HTML Exato para as bolinhas funcionarem com o CSS acima
    stage.innerHTML = `
        <div class="cw-center-dots">
            <span></span><span></span><span></span>
        </div>
        <div class="cw-center-text">${DataService.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `;

    pill.appendChild(stage);

    // 2. ATIVAR MODO CENTRO
    const startTime = Date.now();
    pill.classList.add('processing-center');
    if(overlay) overlay.classList.add('active');

    // 3. RETORNAR FUNÇÃO DE FIM
    return function finish() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 2000 - elapsed); // Mínimo 2s

        setTimeout(() => {
            // Esconde bolinhas e texto, mostra sucesso
            const dots = stage.querySelector('.cw-center-dots');
            const text = stage.querySelector('.cw-center-text');
            const success = stage.querySelector('.cw-center-success');

            if(dots) dots.style.display = 'none';
            if(text) text.style.display = 'none';
            if(success) success.classList.add('show');
            
            // Adiciona borda verde na pílula
            pill.classList.add('success');

            // Viaja de volta
            setTimeout(() => {
                pill.classList.remove('processing-center'); // CSS faz a transição suave
                
                // Limpeza final (sincronizada com o CSS 0.6s)
                setTimeout(() => {
                    stage.remove(); // Remove o palco temporário
                    pill.classList.remove('success');
                    if(overlay) overlay.classList.remove('active');
                }, 600);

            }, 1000); // Tempo exibindo o check verde

        }, remaining);
    };
}