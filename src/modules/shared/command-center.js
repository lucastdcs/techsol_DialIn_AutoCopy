import { DataService } from './data-service.js'; 

// src/modules/shared/command-center.js

const COLORS = {
  glassBg: "rgba(40, 40, 40, 0.95)", // Fundo mais sólido para evitar ruído visual
  glassBorder: "rgba(255, 255, 255, 0.15)",
  glassHighlight: "rgba(255, 255, 255, 0.1)",
  
  // Cores originais
  iconIdle: "#bdc1c6",  
  iconActive: "#FFFFFF",
  
  blue: "#8AB4F8",
  red: "#F28B82",
  purple: "#C58AF9",
  green: "#81C995",
  orange: "#F9AB00",
};

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export function initCommandCenter(actions) {

  const styleId = "cw-command-center-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

        /* --- PÍLULA PRINCIPAL (CONTAINER) --- */
        .cw-pill {
            position: fixed; top: 100px; right: 24px;
            display: flex; flex-direction: column; align-items: center; 
            
            /* Largura Fixa para evitar balanço lateral */
            width: 56px; 
            
            padding: 8px 0; /* Padding vertical apenas */
            gap: 8px;
            
            background: ${COLORS.glassBg};
            backdrop-filter: blur(12px);
            border: 1px solid ${COLORS.glassBorder}; 
            border-radius: 28px; /* Arredondado completo */
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            z-index: 2147483647;
            
            /* Animação APENAS na Altura (Max-Height para performance) */
            transition: 
                max-height 0.4s cubic-bezier(0.2, 0, 0, 1), /* Expansão suave */
                background 0.3s ease,
                transform 0.1s linear, top 0.1s linear, left 0.1s linear; /* Drag */
            
            /* Estado Expandido (Altura máxima suficiente para caber tudo) */
            max-height: 400px; 
            overflow: hidden; /* Corta o conteúdo ao recolher */

            opacity: 0; transform: translateX(40px);
        }
        
        .cw-pill.docked { opacity: 1; transform: translateX(0); }

        /* --- ESTADO COLAPSADO (Só o topo visível) --- */
        .cw-pill.collapsed {
            max-height: 56px !important; /* Altura exata do botão principal + padding */
            background: rgba(30, 30, 30, 0.98);
            border-color: rgba(255,255,255,0.1);
        }

        /* --- LABEL DINÂMICO (TEXTO DENTRO DA PILL) --- */
        .cw-dynamic-label {
            position: absolute;
            top: 18px; /* Alinhado com o ícone principal */
            right: 64px; /* Sai para a esquerda da pill */
            
            background: rgba(0,0,0,0.8);
            color: #fff;
            padding: 6px 12px;
            border-radius: 6px;
            font-family: 'Google Sans', sans-serif;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            pointer-events: none;
            
            opacity: 0;
            transform: translateX(10px);
            transition: all 0.2s ease;
        }
        
        /* Mostra o label quando a classe 'visible' é adicionada via JS */
        .cw-dynamic-label.visible {
            opacity: 1;
            transform: translateX(0);
        }

        /* --- GRIP (Topo) --- */
        .cw-grip {
            width: 100%; height: 12px; 
            display: flex; align-items: center; justify-content: center; 
            cursor: grab; margin-top: 4px; flex-shrink: 0;
            opacity: 0.3; transition: opacity 0.2s;
        }
        .cw-grip:hover { opacity: 1; }
        .cw-grip-bar { 
            width: 20px; height: 3px; background-color: #fff; border-radius: 2px; 
        }

        /* Esconde o grip quando fechado para limpar o visual */
        .cw-pill.collapsed .cw-grip { opacity: 0; pointer-events: none; }

        /* --- BOTÃO DA MARCA (PRINCIPAL) --- */
        .cw-brand-btn {
            width: 44px; height: 44px; flex-shrink: 0;
            border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; position: relative; z-index: 20;
            color: #fff;
            transition: all 0.3s ease;
        }

        /* Gradiente no Hover (Apenas o fundo) */
        .cw-brand-btn::before {
            content: ''; position: absolute; inset: 0; border-radius: 50%;
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
            opacity: 0; transition: opacity 0.3s ease; z-index: -1;
        }
        .cw-brand-btn:hover::before { opacity: 1; }
        .cw-brand-btn:hover { transform: scale(1.05); }

        .cw-brand-btn svg {
            width: 24px; height: 24px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        /* Rotação suave ao fechar */
        .cw-pill.collapsed .cw-brand-btn { transform: rotate(0deg); } /* Estado normal */
        /* .cw-pill:not(.collapsed) .cw-brand-btn { transform: rotate(180deg); } Opcional: girar ao abrir */

        /* --- BOTÕES DE AÇÃO (ITENS) --- */
        .cw-module-list {
            display: flex; flex-direction: column; align-items: center; gap: 8px;
            width: 100%;
            /* Transição de opacidade para o conteúdo interno */
            opacity: 1; transition: opacity 0.2s ease 0.1s;
        }
        
        .cw-pill.collapsed .cw-module-list {
            opacity: 0; pointer-events: none; transition-delay: 0s;
        }

        .cw-btn {
            width: 40px; height: 40px; flex-shrink: 0;
            border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; 
            cursor: pointer; position: relative; 
            color: ${COLORS.iconIdle};
            transition: all 0.2s ease;
        }

        /* Ícones Preenchidos (Fill) */
        .cw-btn svg { 
            width: 20px; height: 20px; 
            fill: currentColor; /* Preenchimento Sólido */
            pointer-events: none; 
        }

        .cw-btn:hover { 
            background: rgba(255,255,255,0.1); 
            color: ${COLORS.iconActive}; 
            transform: scale(1.1);
        }

        /* Cores Ativas */
        .cw-btn.notes.active { color: ${COLORS.blue}; background: rgba(138, 180, 248, 0.2); }
        .cw-btn.email.active { color: ${COLORS.red}; background: rgba(242, 139, 130, 0.2); }
        .cw-btn.script.active { color: ${COLORS.purple}; background: rgba(197, 138, 249, 0.2); }
        .cw-btn.links.active { color: ${COLORS.green}; background: rgba(129, 201, 149, 0.2); }
        .cw-btn.broadcast.active { color: ${COLORS.orange}; background: rgba(249, 171, 0, 0.2); }

        /* Separador */
        .cw-sep {
            width: 24px; height: 1px; background: rgba(255,255,255,0.1);
            margin: 4px 0;
        }

        /* Badge */
        .cw-badge {
            position: absolute; top: 8px; right: 8px; width: 6px; height: 6px;
            background-color: #FA5252; border-radius: 50%;
            box-shadow: 0 0 0 2px ${COLORS.glassBg};
            pointer-events: none;
        }

        /* --- MODO ILHA DINÂMICA (Center) --- */
        .cw-pill.processing-center {
            /* Animação centralizada mantém-se separada */
            top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;
            width: 300px !important; max-height: 100px !important;
            border-radius: 20px !important; padding: 0 !important;
            display: flex !important; flex-direction: row !important; justify-content: center !important;
        }
        .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
        .cw-center-stage { display: flex; align-items: center; gap: 12px; color: #fff; font-size: 14px; opacity: 0; animation: fadeIn 0.3s forwards 0.2s; }
        @keyframes fadeIn { to { opacity: 1; } }
    `;
    document.head.appendChild(style);
  }

  // 2. DOM STRUCTURE
  const ICONS = {
    // Ícones ajustados para Fill
    check: `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
    notes: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`, // Ícone balão de fala sólido
    links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
    broadcast: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`, // Info preenchido
    nexus: `<svg viewBox="0 0 24 24"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>`
  };

  const pill = document.createElement("div");
  pill.className = "cw-pill side-right";
  
  pill.innerHTML = `
    <div class="cw-dynamic-label" id="cw-main-label">Menu</div>

    <div class="cw-grip" title="Arrastar">
        <div class="cw-grip-bar"></div>
    </div>

    <button class="cw-brand-btn" id="cw-brand-toggle" data-hint="Expandir">
        ${ICONS.nexus}
    </button>
    
    <div class="cw-module-list">
        <button class="cw-btn notes" data-hint="Notas">${ICONS.notes}</button>
        <button class="cw-btn email" data-hint="Emails">${ICONS.email}</button>
        <button class="cw-btn script" data-hint="Script">${ICONS.script}</button>
        <button class="cw-btn links" data-hint="Links">${ICONS.links}</button>
        
        <div class="cw-sep"></div>
        
        <button class="cw-btn broadcast" data-hint="Avisos">${ICONS.broadcast}</button>
    </div>
  `;

  document.body.appendChild(pill);

  // 3. LOGICA DO LABEL INTERNO/EXTERNO
  const labelEl = pill.querySelector('#cw-main-label');
  
  // Função para mostrar label
  const showLabel = (text) => {
      labelEl.textContent = text;
      labelEl.classList.add('visible');
  };
  const hideLabel = () => {
      labelEl.classList.remove('visible');
  };

  // Aplica aos botões
  const allBtns = pill.querySelectorAll('button');
  allBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => showLabel(btn.getAttribute('data-hint')));
      btn.addEventListener('mouseleave', hideLabel);
  });

  // 4. LISTENERS DE AÇÃO
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

  // Badge Logic
  if (actions.broadcastControl && actions.broadcastControl.hasUnread) {
      const badge = document.createElement('div');
      badge.className = 'cw-badge';
      pill.querySelector('.broadcast').appendChild(badge);
  }

  // 5. LÓGICA DE COLAPSO E ARRASTO
  const brandBtn = pill.querySelector("#cw-brand-toggle");
  let isCollapsed = false;
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  let hasMoved = false;

  // Toggle
  brandBtn.onclick = (e) => {
      if (hasMoved) return; 
      e.stopPropagation();
      
      isCollapsed = !isCollapsed;
      
      if (isCollapsed) {
          pill.classList.add("collapsed");
          brandBtn.setAttribute("data-hint", "Expandir");
          // Atualiza o label se o mouse ainda estiver em cima
          if(labelEl.classList.contains('visible')) showLabel("Expandir");
      } else {
          pill.classList.remove("collapsed");
          brandBtn.setAttribute("data-hint", "Recolher");
          if(labelEl.classList.contains('visible')) showLabel("Recolher");
      }
  };

  // Drag
  pill.onmousedown = (e) => {
      if (e.target.closest("button") && !e.target.closest("#cw-brand-toggle") && !isCollapsed) return;

      e.preventDefault();
      startX = e.clientX; startY = e.clientY;
      const rect = pill.getBoundingClientRect();
      initialLeft = rect.left; initialTop = rect.top;
      hasMoved = false; isDragging = false;
      pill.style.transition = "none"; // Remove animação para arraste instantâneo

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
  };

  function onMouseMove(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!isDragging && Math.sqrt(dx * dx + dy * dy) > 3) {
          isDragging = true;
          hasMoved = true;
      }
      if (isDragging) {
          pill.style.left = `${initialLeft + dx}px`;
          pill.style.top = `${initialTop + dy}px`;
          pill.style.right = "auto"; pill.style.transform = "none";
      }
  }

  function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      // Restaura transições suaves
      pill.style.transition = `max-height 0.4s cubic-bezier(0.2, 0, 0, 1), background 0.3s ease, top 0.1s linear, left 0.1s linear`;
      isDragging = false;
  }

  (async function startAnimation() {
    await esperar(1500); 
    pill.classList.add("docked");
  })();
}

// Processing Animation Simples
export function triggerProcessingAnimation() {
    const pill = document.querySelector('.cw-pill');
    if (!pill) return () => {}; 

    const stage = document.createElement('div');
    stage.className = 'cw-center-stage';
    stage.innerHTML = `<span>Processando...</span>`;

    pill.appendChild(stage);
    pill.classList.add('processing-center');

    return function finish() {
        setTimeout(() => {
            pill.classList.remove('processing-center');
            setTimeout(() => stage.remove(), 300);
        }, 1500);
    };
}