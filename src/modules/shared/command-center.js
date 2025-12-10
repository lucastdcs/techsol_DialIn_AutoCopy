import { DataService } from './data-service.js';

const COLORS = {
  glassBg: "rgba(32, 33, 36, 0.95)", // Fundo mais sólido e premium
  glassBorder: "rgba(255, 255, 255, 0.1)",
  iconIdle: "#9aa0a6",
  iconActive: "#FFFFFF",
  
  // Cores Oficiais Google (Do seu código original)
  blue: "#8AB4F8",
  red: "#F28B82", 
  green: "#81C995",
  yellow: "#FDD663",
  orange: "#F9AB00"
};

// Helper de tempo
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export function initCommandCenter(actions) {

  // 1. ESTILOS (CSS)
  const styleId = "cw-command-center-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    // CSS OTIMIZADO
    style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500&display=swap');

            /* --- BASE DA PÍLULA (A Física Apple) --- */
            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 14px 8px;
                background: rgba(45, 45, 45, 0.9);
                backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
                border: 1px solid ${COLORS.glassBorder}; 
                border-radius: 50px;
                box-shadow: 0 12px 40px rgba(0,0,0,0.3); 
                z-index: 2147483647;
                
                /* A Mágica da Fluidez: Transição unificada para tudo */
                transition: 
                    top 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
                    left 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
                    transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
                    width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
                    height 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
                    border-radius 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
                    background-color 0.4s ease;
            }

            /* --- ESTADO 1: FLUTUANDO NA LATERAL (Padrão) --- */
            .cw-pill.docked { opacity: 1; transform: translateX(0); }
            
            /* --- ESTADO 2: DYNAMIC ISLAND (No Centro) --- */
            .cw-pill.processing-center {
                /* Geometria */
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 320px !important;
                height: 110px !important;
                border-radius: 28px !important;
                
                /* Visual */
                background: #202124 !important; /* Material Dark */
                box-shadow: 0 40px 80px rgba(0,0,0,0.6) !important;
                padding: 0 !important;
                
                /* Layout */
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }

            /* Esconde os botões laterais durante a animação */
            .cw-pill.processing-center > .cw-btn,
            .cw-pill.processing-center > .cw-sep,
            .cw-pill.processing-center > .cw-grip {
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.2s ease; /* Some rápido */
            }

            /* --- BOTÕES E ÍCONES --- */
            .cw-btn {
                width: 42px; height: 42px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${COLORS.iconIdle};
                transition: all 0.2s ease;
            }
            .cw-btn:hover { background: rgba(255,255,255,0.1); color: #fff; transform: scale(1.1); }
            .cw-btn svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
            .cw-sep { width: 24px; height: 1px; background: rgba(255,255,255,0.1); margin: 4px 0; }
            
            /* Badges e Grip */
            .cw-grip { width: 100%; height: 20px; display: flex; justify-content: center; cursor: grab; opacity: 0.5; }
            .cw-grip:hover { opacity: 1; }
            .cw-grip-bar { width: 20px; height: 4px; background: #fff; border-radius: 2px; }
            .cw-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #d93025; border-radius: 50%; border: 1px solid #202124; }

            /* --- ELEMENTOS DO CENTRO (Injectados) --- */
            .cw-center-stage {
                position: absolute; width: 100%; height: 100%;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                gap: 16px;
                opacity: 0; animation: fadeInStage 0.6s ease forwards 0.2s;
            }

            /* AS BOLINHAS (Código Original Recuperado) */
            .cw-google-dots { display: flex; gap: 8px; }
            .cw-google-dots span {
                width: 10px; height: 10px; border-radius: 50%;
                /* Importante: animation-fill-mode both para manter estado */
                animation: bounce 1.4s infinite ease-in-out both; 
            }
            .cw-google-dots span:nth-child(1) { background-color: ${COLORS.blue}; animation-delay: -0.32s; }
            .cw-google-dots span:nth-child(2) { background-color: ${COLORS.red}; animation-delay: -0.16s; }
            .cw-google-dots span:nth-child(3) { background-color: ${COLORS.green}; }

            @keyframes bounce { 
                0%, 80%, 100% { transform: scale(0); } 
                40% { transform: scale(1); } 
            }

            /* O Texto da Dica */
            .cw-center-text {
                font-family: 'Google Sans', sans-serif;
                font-size: 14px; color: #E8EAED; text-align: center;
                max-width: 90%; line-height: 1.5; font-weight: 400;
                opacity: 0; transform: translateY(10px);
                animation: slideUpText 0.5s ease forwards 0.3s;
            }

            /* Ícone de Sucesso */
            .cw-center-success { display: none; color: ${COLORS.green}; }
            .cw-center-success svg { width: 48px; height: 48px; }
            .cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

            /* Animações de Entrada/Saída */
            @keyframes fadeInStage { to { opacity: 1; } }
            @keyframes slideUpText { to { opacity: 1; transform: translateY(0); } }
            @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }

            .cw-focus-backdrop {
                position: fixed; inset: 0; background: rgba(0,0,0,0.3); backdrop-filter: blur(2px);
                opacity: 0; pointer-events: none; transition: opacity 0.5s; z-index: 2147483646;
            }
            .cw-focus-backdrop.active { opacity: 1; }
        `;
    document.head.appendChild(style);
  }

  // 2. CONSTRUÇÃO DO DOM (Pílula Lateral)
  const ICONS = {
    notes: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    links: `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
    broadcast: `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`
  };

  const pill = document.createElement("div");
  pill.className = "cw-pill side-right";
  
  // HTML Limpo
  pill.innerHTML = `
        <div class="cw-grip"><div class="cw-grip-bar"></div></div>
        <button class="cw-btn notes" title="Notas">${ICONS.notes}</button>
        <button class="cw-btn email" title="Email">${ICONS.email}</button>
        <button class="cw-btn script" title="Script">${ICONS.script}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn links" title="Links">${ICONS.links}</button>
        <button class="cw-btn broadcast" title="Avisos">${ICONS.broadcast}</button>
  `;

  // Overlay para foco
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
      if(badge) badge.remove();
      if(actions.broadcastControl) actions.broadcastControl.toggle(); 
  };

  // Badge Inicial
  if (actions.broadcastControl && actions.broadcastControl.hasUnread) {
      const badge = document.createElement('div');
      badge.className = 'cw-badge';
      pill.querySelector('.broadcast').appendChild(badge);
  }

  // 4. ARRASTAR (Draggable)
  let isDragging = false, startX, startY, initialLeft, initialTop;
  pill.querySelector('.cw-grip').onmousedown = (e) => {
      e.preventDefault();
      isDragging = true;
      startX = e.clientX; startY = e.clientY;
      const rect = pill.getBoundingClientRect();
      initialLeft = rect.left; initialTop = rect.top;
      pill.style.transition = 'none'; // Remove transição para arrastar rápido
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
  };

  function onMove(e) {
      if(!isDragging) return;
      pill.style.left = `${initialLeft + (e.clientX - startX)}px`;
      pill.style.top = `${initialTop + (e.clientY - startY)}px`;
      pill.style.right = 'auto'; // Reseta right
  }

  function onUp() {
      isDragging = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      // Restaura a "Física Apple" ao soltar
      pill.style.transition = 'top 0.6s cubic-bezier(0.2,0.8,0.2,1), left 0.6s cubic-bezier(0.2,0.8,0.2,1), width 0.6s cubic-bezier(0.2,0.8,0.2,1), height 0.6s cubic-bezier(0.2,0.8,0.2,1)';
  }
}

// --- FUNÇÃO DE ANIMAÇÃO DO CENTRO (AQUI ESTÁ A MÁGICA) ---
export function triggerProcessingAnimation() {
    const pill = document.querySelector('.cw-pill');
    const overlay = document.querySelector('.cw-focus-backdrop');
    if (!pill) return () => {}; 

    // 1. Criar o Palco Central (DOM Fresco e Limpo)
    const stage = document.createElement('div');
    stage.className = 'cw-center-stage';
    
    // Texto da Dica
    const tipText = DataService.getRandomTip();

    // HTML INJETADO (Bolinhas Coloridas + Texto)
    stage.innerHTML = `
        <div class="cw-google-dots">
            <span></span><span></span><span></span>
        </div>
        <div class="cw-center-text">${tipText}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `;

    pill.appendChild(stage);

    // 2. Mover para o Centro (Ativa classe CSS)
    pill.classList.add('processing-center');
    if(overlay) overlay.classList.add('active');

    const startTime = Date.now();

    // RETORNA FUNÇÃO DE FINALIZAR
    return function finish() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 2000 - elapsed); // Mínimo 2s

        setTimeout(() => {
            // 3. Trocar Bolinhas por Sucesso
            const dots = stage.querySelector('.cw-google-dots');
            const text = stage.querySelector('.cw-center-text');
            const success = stage.querySelector('.cw-center-success');

            if(dots) dots.style.display = 'none';
            if(text) text.style.display = 'none';
            if(success) success.classList.add('show'); // Pop!

            // 4. Voltar para a Lateral (Após ver o sucesso)
            setTimeout(() => {
                pill.classList.remove('processing-center'); // CSS Cuida da transição fluida
                
                // Limpar DOM após a viagem de volta (0.6s é o tempo da transição CSS)
                setTimeout(() => {
                    stage.remove(); // Tchau palco
                    if(overlay) overlay.classList.remove('active');
                }, 600);

            }, 1000); // Tempo vendo o check verde

        }, remaining);
    };
}