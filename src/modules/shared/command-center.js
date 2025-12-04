// src/modules/shared/command-center.js

const COLORS = {
  glassBg: "rgba(61, 61, 61, 0.77)", // Vidro escuro e sólido
  glassBorder: "rgba(255, 255, 255, 0.15)",
  glassActive: "rgba(79, 79, 79, 0.89)", // Quando agarra
  glassHighlight: "rgba(255, 255, 255, 0.08)",
  iconIdle: "#c2c5c8ff",
  iconActive: "#FFFFFF",
  // Cores para o "System Check"
  blue: "#8AB4F8",
  red: "#F28B82",
  purple: "#C58AF9",
  green: "#81C995",
};

// Helper interno de tempo
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export function initCommandCenter(actions) {
  // actions = { toggleNotes, toggleEmail, toggleScript, toggleLinks }

  // 1. ESTILOS
  const styleId = "cw-command-center-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            /* --- A BASE (O Vidro) --- */
            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 16px 8px;
                
                background: ${COLORS.glassBg};
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${COLORS.glassBorder};
                border-radius: 50px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                z-index: 2147483647;

                /* ESTADO INICIAL: Fora da tela (Direita) e levemente menor */
                opacity: 0;
                transform: translateX(40px) scale(0.95);
                
                /* A Transição de Entrada "Firme" */
                transition: 
                    opacity 0.4s ease-out,
                    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1); /* Curva Exponencial */
            }

            /* ESTADO FINAL */
            .cw-pill.docked {
                opacity: 1;
                transform: translateX(0) scale(1);
            }

            /* --- OS ÍCONES (As Ferramentas) --- */
            .cw-btn {
                width: 40px; height: 40px;
                display: flex; align-items: center; justify-content: center;
                color: ${COLORS.iconIdle};
                background: transparent; border: none; cursor: pointer; position: relative;
                
                /* Começam invisíveis e pequenos */
                opacity: 0;
                transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* Efeito de "Pop" elástico */
            }

            .cw-btn.popped {
                opacity: 1;
                transform: scale(1);
            }
            
            .cw-btn:hover { 
                background: ${COLORS.glassHighlight}; 
                color: ${COLORS.iconActive}; 
                transform: scale(1.15);
            }

            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            /* Cores de Marca */
            .cw-btn.notes:hover { color: ${COLORS.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${COLORS.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${COLORS.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${COLORS.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }

            /* --- O DIVISOR --- */
            .cw-sep {
                width: 20px; height: 1px; background: rgba(255,255,255,0.2);
                opacity: 0; transition: opacity 0.5s ease;
            }
            .cw-sep.visible { opacity: 1; }

          /* --- O GRIP (System Check) --- */
            .cw-grip {
                display: flex; 
                align-items: center; /* Centraliza */
                justify-content: center; /* Centraliza */
                color: ${COLORS.iconIdle}; 
                opacity: 0.5; 
                cursor: grab; /* Cursor de mãozinha */
                pointer-events: auto; /* Garante que o mouse pegue aqui */
                padding-bottom: 4px; /* Espaço extra embaixo */
                width: 100%;
            }

            /* ESTA É A REGRA QUE FALTAVA: */
            .cw-grip svg {
                width: 24px; 
                height: 24px; 
                fill: currentColor;
            }

            .cw-grip:active { cursor: grabbing; color: #fff; }
            
            /* Animação de "Sistema Pronto" (Luz verde corre) */
            .cw-dot.system-check {
                background: #81C995; /* Verde Suave */
                box-shadow: 0 0 8px #81C995;
            }
            
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
        `;
    document.head.appendChild(style);
  }

  // 2. CONSTRUÇÃO DO DOM
  const ICONS = {
    notes: `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
    grip: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="11" width="14" height="2" rx="1"/></svg>`,
  };

  const pill = document.createElement("div");
  pill.className = "cw-pill side-right";
  pill.innerHTML = `
        <div class="cw-grip" title="Arrastar">
            ${ICONS.grip}
        </div>
        <div class="cw-sep"></div>
        <button class="cw-btn notes" data-label="Case Notes">${ICONS.notes}</button>
        <button class="cw-btn email" data-label="Quick Email">${ICONS.email}</button>
        <button class="cw-btn script" data-label="Call Script">${ICONS.script}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn links" data-label="Links">${ICONS.links}</button>
    `;
  document.body.appendChild(pill);

  // Ligando os eventos de clique (A única diferença do seu script)
  pill.querySelector(".notes").onclick = (e) => {
    e.stopPropagation();
    actions.toggleNotes();
  };
  pill.querySelector(".email").onclick = (e) => {
    e.stopPropagation();
    actions.toggleEmail();
  };
  pill.querySelector(".script").onclick = (e) => {
    e.stopPropagation();
    actions.toggleScript();
  };
  pill.querySelector(".links").onclick = (e) => {
    e.stopPropagation();
    actions.toggleLinks();
  };

  // 3. A COREOGRAFIA (Docking Sequence)
  // Envelopado em função async auto-executável para manter o escopo limpo
  (async function startAnimation() {
    // Simula o fim da splash screen
    await esperar(2600);

    // ETAPA 1: A Base "Atraca" (Dock)
    pill.classList.add("docked");

    await esperar(300); // A base se estabiliza

    // ETAPA 2: Ferramentas Carregam (Cascata)
    const items = pill.querySelectorAll(".cw-btn");
    const seps = pill.querySelectorAll(".cw-sep");

    // Mostra divisores
    seps.forEach((s) => s.classList.add("visible"));

    // Loop de "Pop" dos botões
    for (let i = 0; i < items.length; i++) {
      items[i].classList.add("popped");
      await esperar(60); // O ritmo "tec-tec-tec-tec"
    }

    // ETAPA 3: Confirmação (Luz Verde)
    await esperar(200);
    const d1 = pill.querySelector("#dot1");
    const d2 = pill.querySelector("#dot2");

    d1.classList.add("system-check");
    await esperar(100);
    d2.classList.add("system-check");

    await esperar(400);
    d1.classList.remove("system-check");
    d2.classList.remove("system-check");
  })();

  // 4. FÍSICA DE ARRASTO (Exatamente a do seu código)
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  const DRAG_THRESHOLD = 3;

  pill.onmousedown = (e) => {
    // Se clicar num botão, não inicia drag imediatamente
    if (e.target.closest("button")) return;

    e.preventDefault();

    startX = e.clientX;
    startY = e.clientY;
    const rect = pill.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (!isDragging && Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
      isDragging = true;
      // Remove transições durante o arrasto para não travar
      pill.style.transition = "none";
    }

    if (isDragging) {
      // Movimento 1:1
      pill.style.left = `${initialLeft + dx}px`;
      pill.style.top = `${initialTop + dy}px`;

      // Remove âncoras antigas
      pill.style.right = "auto";
      pill.style.bottom = "auto";
      pill.style.transform = "none"; // Garante que o translate não some
    }
  }

  function onMouseUp(e) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    if (isDragging) {
      isDragging = false;

      // Restaura as transições para o efeito magnético
      pill.style.transition =
        "left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const rect = pill.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;

      // 1. Define o lado (Magnetismo)
      let targetLeft;
      if (centerX < screenW / 2) {
        targetLeft = 24;
        pill.classList.remove("side-right");
        pill.classList.add("side-left");
      } else {
        targetLeft = screenW - rect.width - 24;
        pill.classList.remove("side-left");
        pill.classList.add("side-right");
      }

      // 2. Limites Verticais
      let targetTop = rect.top;
      if (targetTop < 24) targetTop = 24;
      if (targetTop > screenH - rect.height - 24)
        targetTop = screenH - rect.height - 24;

      // 3. Aplica o Pulo
      pill.style.left = `${targetLeft}px`;
      pill.style.top = `${targetTop}px`;

      // Limpa estilos inline desnecessários após o snap
      setTimeout(() => {
        // Mantemos left/top, mas podemos limpar transform se necessário
      }, 600);
    } else {
      // Clique estático (Click nos botões é tratado pelos event listeners acima)
      const btn = e.target.closest("button");
      if (btn) {
        btn.style.transform = "scale(0.9)";
        setTimeout(() => (btn.style.transform = ""), 150);
      }
    }
  }
}
