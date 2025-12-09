// src/modules/shared/utils.js

import { captureNameWithMagic, getSmartGreeting } from "./page-data.js";

// Variável global para controlar a pilha de janelas
let highestZIndex = 10000;

export function initGlobalStylesAndFont() {
    // Evita duplicidade
    if (document.getElementById('google-font-roboto') && document.getElementById('techsol-global-styles')) {
        return;
    }

    // 1. Carrega a ROBOTO do Google Fonts (Backup seguro e profissional)
    const link = document.createElement('link');
    link.id = 'google-font-roboto';
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. Define a Família de Fontes Global e Variáveis de Design System
    const style = document.createElement('style');
    style.id = 'techsol-global-styles';
    style.textContent = `
        :root {
            --cw-primary: #1a73e8;
            --cw-primary-hover: #1557b0;
            --cw-surface: #ffffff;
            --cw-surface-glass: rgba(255, 255, 255, 0.95);
            --cw-border: #dadce0;
            --cw-text: #202124;
            --cw-text-sub: #5f6368;
            --cw-ease-elastic: cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* Rollbar e Ajustes Globais */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.4); }
        
        /* FONTE GOOGLE OFICIAL & RENDERING APPLE */
        body, button, input, select, textarea, .cw-pill, .cw-module, .cw-btn::after {
            font-family: 'Google Sans', 'Roboto', sans-serif !important;
            -webkit-font-smoothing: antialiased;
        }

        /* FOCUS STATES (Anel Google) */
        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: var(--cw-primary) !important;
            box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2) !important;
        }

        /* FEEDBACK TÁTIL GLOBAL (Clique Físico) */
        button:active, .cw-clickable:active { 
            transform: scale(0.96) translateY(1px); 
            transition: transform 0.1s var(--cw-ease-elastic);
        }

        textarea.bullet-textarea { padding-left: 10px; }
        
        /* Classes utilitárias do Script Assistant (Refinadas) */
        .csa-group-container { border-left: 3px solid transparent; padding-left: 8px; transition: all 0.3s ease-out; }
        .csa-group-title { transition: color 0.3s ease-out; }
        .csa-group-container.csa-group-completed { border-left: 3px solid #34a853; }
        .csa-group-container.csa-group-completed .csa-group-title { color: #34a853; }
        
        .csa-li { 
            margin: 6px 0 !important; 
            padding: 10px 12px; border-radius: 8px; 
            border: 1px solid transparent;
            transition: all 0.2s var(--cw-ease-elastic); 
            font-size: 14px; cursor: pointer; user-select: none;
            background-color: #f8f9fa; color: var(--cw-text); line-height: 1.4;
            text-decoration: none; transform: scale(1);
        }
        .csa-li:hover { 
            background-color: #e8f0fe; 
            color: var(--cw-primary);
            transform: translateX(4px); 
        }
        .csa-li.csa-completed { 
            text-decoration: line-through; 
            color: var(--cw-text-sub); 
            opacity: 0.7;
            background: transparent;
            border: 1px dashed var(--cw-border);
        }
    `;
    document.head.appendChild(style);
}

export function showToast(message, opts = {}) {
  const toast = document.createElement("div");
  
  // Cores com transparência para o Glassmorphism
  const bg = opts.error 
    ? "rgba(217, 48, 37, 0.90)" // Vermelho Google Glass
    : "rgba(32, 33, 36, 0.85)"; // Preto Google Glass

  Object.assign(toast.style, {
    position: "fixed",
    bottom: "32px",
    left: "50%",
    transform: "translateX(-50%) scale(0.9)", // Começa menor (Pop effect)
    background: bg,
    backdropFilter: "blur(12px)", // O toque Apple
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "50px", // Pílula completa
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    fontFamily: "'Google Sans', 'Roboto'",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "20px",
    zIndex: "9999999",
    opacity: "0",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Efeito Mola
    pointerEvents: "none",
  });
  
  toast.textContent = message;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) scale(1)";
  });
  
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) scale(0.9) translateY(10px)";
    setTimeout(() => toast.remove(), 400);
  }, opts.duration || 4000);
}

export function makeDraggable(element, handle = null) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const dragHandle = handle || element;

  dragHandle.style.cursor = "grab";
  dragHandle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    // Ignora cliques em inputs ou botões
    if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(e.target.tagName) || e.target.closest('.no-drag')) return;

    e = e || window.event;
    // e.preventDefault(); // Mantenha comentado se precisar de foco em inputs
    
    dragHandle.style.cursor = "grabbing";

    // --- A CORREÇÃO DO "PULO" (CSS FIX) ---
    
    // 1. Desliga a transição IMEDIATAMENTE
    // Se não fizer isso, o navegador tenta animar a mudança de posição, causando lag visual.
    element.style.transition = "none";

    // 2. Captura a posição visual atual exata na tela
    const rect = element.getBoundingClientRect();

    // 3. Reseta o Transform! (O Grande Vilão)
    // Removemos o translate(-50%, -50%) que centralizava o elemento.
    element.style.transform = "none";

    // 4. Converte a posição visual para coordenadas absolutas fixas
    // Como removemos o transform acima, agora top/left são literais.
    element.style.left = rect.left + "px";
    element.style.top = rect.top + "px";
    
    // 5. Garante que margin/bottom/right não interfiram
    element.style.margin = "0";
    element.style.bottom = "auto";
    element.style.right = "auto";
    
    // --------------------------------------

    highestZIndex++;
    element.style.zIndex = highestZIndex;
    pos3 = e.clientX;
    pos4 = e.clientY;

    element.setAttribute("data-dragging", "true");
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    
    // Calcula o deslocamento
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Posição desejada
    let nextTop = element.offsetTop - pos2;
    let nextLeft = element.offsetLeft - pos1;

    // --- A TRAVA DE SEGURANÇA (HARD WALL) ---
    const padding = 16; // Margem mínima da borda
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const elW = element.offsetWidth;
    const elH = element.offsetHeight;

    // Trava Horizontal
    if (nextLeft < padding) nextLeft = padding; // Borda Esquerda
    else if (nextLeft + elW > winW - padding) nextLeft = winW - elW - padding; // Borda Direita

    // Trava Vertical
    if (nextTop < padding) nextTop = padding; // Topo
    else if (nextTop + elH > winH - padding) nextTop = winH - elH - padding; // Base

    // Aplica a posição travada
    element.style.top = nextTop + "px";
    element.style.left = nextLeft + "px";
  }

function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    dragHandle.style.cursor = "grab";
    
    setTimeout(() => {
        // ... (seu código existente de restaurar transition) ...
        element.style.transition = "all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease";
        element.setAttribute("data-dragging", "false");

        // --- ADICIONE ESTA LINHA ---
        // Marca que o usuário escolheu uma posição personalizada
        element.setAttribute("data-moved", "true"); 
    }, 50);
  }
}

// =========================================================
//           ESTILOS PADRÃO (UI Styles - Refined)
// =========================================================
export const styleFloatingButton = {
  position: "fixed",
  right: "24px", // Mais margem
  bottom: "24px",
  width: "56px", // Tamanho FAB Padrão
  height: "56px",
  borderRadius: "16px", // Squircle moderno
  background: "linear-gradient(135deg, #1a73e8, #0059c1)", // Gradiente sutil
  color: "#fff",
  fontSize: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  boxShadow: "0 4px 16px rgba(26, 115, 232, 0.4)", // Glow azul
  zIndex: "9999",
  border: "none",
  transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease",
  transform: "scale(1)",
  fontFamily: "'Google Sans', 'Roboto'",
};

export const stylePopup = {
  // ... (mantenha position, top, left, width, zIndex, etc) ...
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "400px",
  maxHeight: "85vh",
  zIndex: "99999",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(248, 249, 250, 0.96)",
  backdropFilter: "blur(20px) saturate(180%)",
  borderRadius: "20px",
  boxShadow: "0 20px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
  opacity: "0",
  pointerEvents: "none",
  fontFamily: "'Google Sans', 'Roboto'",
  transform: "translate(-50%, -50%)", 
  transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",

};

export const stylePopupHeader = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  
  // --- MUDANÇA AQUI (DNA da Pill) ---
  // Fundo escuro semi-transparente (Vidro Fumê)
  backgroundColor: "rgba(50, 50, 50, 0.95)", 
  
  // Blur para manter o efeito de vidro Apple sobre o site atrás
  backdropFilter: "blur(12px) saturate(180%)",
  
  // Uma linha sutil de luz na parte inferior para separar do conteúdo branco
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  
  // Cores de Texto (Invertidas para contraste)
  color: "#ffffff", 
  
  cursor: "grab",
  userSelect: "none",
  flexShrink: "0",
  position: "relative",
  
  // Garante que o header respeite o arredondamento do topo da janela
  // (Como o pai tem overflow hidden, isso é visualmente automático, mas bom garantir)
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
};

export const stylePopupTitle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#202124",
  flexGrow: "1",
  letterSpacing: "-0.01em",
};

export const stylePopupVersion = {
  fontSize: "12px",
  fontWeight: "400",
  color: "#70757a",
  marginLeft: "8px", // Ao lado do título
  marginTop: "0",
};

export const stylePopupCloseBtn = {
  fontSize: "20px",
  
  // Ícone claro
  color: "#bdc1c6", 
  
  cursor: "pointer",
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  
  // Fundo inicial transparente
  background: "transparent", 
  transition: "all 0.2s ease",
  lineHeight: "1",
  zIndex: "10",
  marginLeft: "12px",
  border: "none",
};

export const styleLabel = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#3c4043",
  marginBottom: "8px",
  marginTop: "16px",
};

export const styleSelect = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid #dadce0",
  backgroundColor: "#f8f9fa", // Fundo Input Google
  fontSize: "14px",
  color: "#3c4043",
  boxSizing: "border-box",
  appearance: "none",
  // Seta SVG mais fina e moderna
  backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "16px",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  fontFamily: "'Google Sans', 'Roboto'",
  cursor: "pointer",
};

export const styleButtonBase = {
  flex: "1 1 0",
  padding: "12px 0",
  color: "#fff",
  background: "#1a73e8", // Azul Google
  border: "none",
  borderRadius: "50px", // Botão Pílula
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "20px",
  transition: "transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease",
  boxShadow: "0 2px 6px rgba(26, 115, 232, 0.3)",
};

export const styleCredit = {
  fontSize: "11px",
  color: "#9aa0a6",
  textAlign: "center",
  padding: "12px 16px",
  borderTop: "1px solid rgba(0,0,0,0.05)",
  marginTop: "16px",
};

export const styleExpandButton = {
  fontSize: "20px",
  color: "#5f6368",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "50%",
  transition: "background-color 0.2s ease, color 0.2s ease",
  lineHeight: "1",
  zIndex: "10",
};

export const typeBtnStyle = {
  padding: "8px 12px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
  color: "#5f6368",
  background: "#f8f9fa",
  transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
  width: "100%",
  textAlign: "center",
  borderRadius: "8px", // Uniformidade
};

export const styleIconBtn = {
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer",
  color: "#5f6368",
  fontSize: "18px",
  transition: "background-color 0.2s ease, transform 0.1s ease",
  marginLeft: "8px",
};

export const styleHelpOverlay = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(8px)",
  zIndex: "50",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "24px",
  boxSizing: "border-box",
  opacity: "0",
  transition: "opacity 0.3s ease",
  pointerEvents: "none",
};

// ===== CORES DO GOOGLE =====
const GOOGLE_COLORS_LIST = [
  { background: "#E8F0FE", color: "#1967D2" },
  { background: "#FCE8E6", color: "#C5221F" },
  { background: "#FEF7E0", color: "#F29900" },
  { background: "#E6F4EA", color: "#1E8E3E" },
];
let lastColorIndex = -1;
export function getRandomGoogleStyle() {
  let newIndex = Math.floor(Math.random() * GOOGLE_COLORS_LIST.length);
  if (newIndex === lastColorIndex)
    newIndex = (newIndex + 1) % GOOGLE_COLORS_LIST.length;
  lastColorIndex = newIndex;
  return GOOGLE_COLORS_LIST[newIndex];
}

// =========================================
// --- ANIMAÇÕES GOOGLE (Utils) ---
// =========================================
let googleStylesInjected = false;
export function injectGoogleAnimationStyles() {
  if (googleStylesInjected || document.getElementById("techsol-google-styles"))
    return;
  const style = document.createElement("style");
  style.id = "techsol-google-styles";
  style.innerHTML = `
        @keyframes google-pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.7); }
            25% { box-shadow: 0 0 0 10px rgba(234, 67, 53, 0); }
            50% { box-shadow: 0 0 0 20px rgba(251, 188, 5, 0); }
            100% { box-shadow: 0 0 0 30px rgba(52, 168, 83, 0); }
        }
        .google-animate-click { animation: google-pulse-ring 0.6s cubic-bezier(0.215, 0.61, 0.355, 1); }
        .google-active-state { position: relative !important; overflow: visible !important; }
        .google-active-state::before {
            content: ''; position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px; border-radius: 50%;
            background: conic-gradient(from 0deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4); z-index: -1; opacity: 0.25; filter: blur(3px);
        }
    `;
  document.head.appendChild(style);
  googleStylesInjected = true;
}

export function triggerGoogleAnimation(element) {
  injectGoogleAnimationStyles();
  element.classList.remove("google-animate-click");
  void element.offsetWidth;
  element.classList.add("google-animate-click");
  setTimeout(() => {
    element.classList.remove("google-animate-click");
  }, 600);
}

// =========================================
// --- SPLASH SCREEN (Animation Engine) ---
// =========================================

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

async function humanTypeWriter(element, text) {
  if (!element) return;
  element.style.opacity = "1";
  element.innerHTML = '<span class="cursor">|</span>';
  const cursor = element.querySelector(".cursor");

  await esperar(200);

  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    const span = document.createElement("span");
    span.textContent = char;

    // INSERÇÃO SEGURA (Evita NotFoundError)
    if (cursor && cursor.parentNode === element) cursor.before(span);
    else element.appendChild(span);

    let speed = Math.floor(Math.random() * 60) + 30;
    if (i === 0) speed = 150;
    if (i > text.length - 3) speed = 30;
    await esperar(speed);
  }

  await esperar(600);
  if (cursor) cursor.style.display = "none";
}

export async function playStartupAnimation() {
  if (document.getElementById("techsol-splash-screen")) return;

  // 1. Injeta CSS da Splash (Modernizado)
  if (!document.getElementById("google-splash-style")) {
    const style = document.createElement("style");
    style.id = "google-splash-style";
    style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: 2147483647; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
            .splash-exit { animation: focus-out 0.9s cubic-bezier(0.4, 0.0, 0.2, 1) forwards; }
            @keyframes focus-out { 0% { opacity: 1; transform: scale(1); filter: blur(0); } 100% { opacity: 0; transform: scale(1.15); filter: blur(15px); } }
            
            .sentence-wrapper { display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 10px; max-width: 80%; position: relative; }
            .text-part { font-size: 32px; color: #E8EAED; opacity: 0; transition: opacity 0.8s ease; }
            .text-name { font-size: 32px; font-weight: 700; background: linear-gradient(90deg, #8AB4F8, #C58AF9, #F28B82); -webkit-background-clip: text; -webkit-text-fill-color: transparent; opacity: 0; }
            .text-footer { font-size: 20px; color: #9AA0A6; font-weight: 400; width: 100%; text-align: center; margin-top: 12px; opacity: 0; transform: translateY(10px); transition: all 1s cubic-bezier(0.0, 0.0, 0.2, 1); }
            
            .sextou-badge { display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; padding: 6px 16px; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #F28B82; font-size: 14px; font-weight: 500; opacity: 0; transform: scale(0.8); transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1); }
            .cursor { color: #8AB4F8; -webkit-text-fill-color: #8AB4F8; font-weight: 100; margin-left: 1px; animation: blink 1s infinite; }
            
            .brand-logo { position: absolute; top: 40px; font-size: 20px; font-weight: 500; color: #5f6368; letter-spacing: 1px; text-transform: uppercase; opacity: 0; animation: fade-in-down 0.8s ease forwards; }
            .weather-icon { width: 42px; height: 42px; margin-bottom: 24px; opacity: 0; transform: scale(0.8); transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
            .credit-pro { position: absolute; bottom: 30px; font-size: 11px; color: #5f6368; letter-spacing: 0.5px; opacity: 0; animation: fade-in-simple 1.5s ease 1s forwards; }
            .credit-pro span { color: #8AB4F8; font-weight: 500; opacity: 0.9; }
            
            .loader-line { position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853); transform: scaleX(0); transform-origin: left; animation: load-line 4s linear forwards; }
            
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes load-line { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
            @keyframes fade-in-simple { to { opacity: 1; } }
        `;
    document.head.appendChild(style);
  }

  // 2. Monta HTML
  const splash = document.createElement("div");
  splash.className = "splash-container";
  splash.innerHTML = `
        <div class="brand-logo">Case Wizard</div>
        <div id="w-icon"></div>
        <div class="sentence-wrapper">
            <div id="p1" class="text-part"></div>
            <div id="p2" class="text-name"></div>
            <div id="p3" class="text-footer"></div>
            <div id="p-sextou" style="width: 100%; text-align: center; display: none;">
                <div class="sextou-badge">🎉 Sextou!</div>
            </div>
        </div>
        <div class="credit-pro">created by <span>@lucaste</span></div>
        <div class="loader-line"></div>
    `;
  document.body.appendChild(splash);

  requestAnimationFrame(() => (splash.style.opacity = "1"));

  // 3. Orquestração
  try {
    await esperar(200);
    const rawName = await captureNameWithMagic();
    const data = getSmartGreeting(rawName);

    // Busca Elementos (Limitado ao container do splash para evitar conflitos)
    const wIcon = splash.querySelector("#w-icon");
    const el1 = splash.querySelector("#p1");
    const el2 = splash.querySelector("#p2");
    const el3 = splash.querySelector("#p3");
    const elSextou = splash.querySelector("#p-sextou");

    if (wIcon) wIcon.innerHTML = data.icon;
    if (el1) el1.textContent = data.prefix;
    if (el3) el3.textContent = data.suffix;

    await esperar(300);

    // Ícone
    const svg = wIcon ? wIcon.querySelector("svg") : null;
    if (svg) {
      svg.style.opacity = "1";
      svg.style.transform = "scale(1)";
    }

    await esperar(400);
    if (el1) el1.style.opacity = "1"; // Bom dia

    // Digitação
    if (el2) await humanTypeWriter(el2, data.name);

    // Frase final
    if (el3) {
      el3.style.opacity = "1";
      el3.style.transform = "translateY(0)";
    }

    // Sextou
    if (data.isFriday && elSextou) {
      await esperar(400);
      elSextou.style.display = "block";
      void elSextou.offsetWidth;
      const badge = elSextou.querySelector(".sextou-badge");
      if (badge) {
        badge.style.opacity = "1";
        badge.style.transform = "scale(1)";
      }
    }

    await esperar(1500);
  } catch (e) {
    console.warn("Splash error, skipping...", e);
  } finally {
    splash.classList.add("splash-exit");
    await esperar(900);
    if (splash.parentNode) splash.parentNode.removeChild(splash);
  }
}

// Função Utilitária: Garante que o elemento nunca saia da tela
export function constrainToViewport(element) {
    if (!element) return;

    // 1. Pega as dimensões atuais
    const rect = element.getBoundingClientRect();
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const padding = 24; // Margem de segurança (respiro)

    // 2. Calcula os limites máximos
    // (A janela não pode estar mais à direita do que a largura da tela menos a largura dela mesma)
    const maxLeft = winW - rect.width - padding;
    const maxTop = winH - rect.height - padding;

    // 3. Verifica e corrige (Matemática de "Clamp")
    // Math.max(padding, ...) -> Não deixa passar da esquerda/topo
    // Math.min(..., maxLeft) -> Não deixa passar da direita/baixo
    
    // Precisamos ler o left/top atuais baseados no style (para não quebrar lógica de drag)
    // ou usar o rect.left se não tiver style definido.
    let currentLeft = parseFloat(element.style.left) || rect.left;
    let currentTop = parseFloat(element.style.top) || rect.top;

    let newLeft = Math.max(padding, Math.min(currentLeft, maxLeft));
    let newTop = Math.max(padding, Math.min(currentTop, maxTop));

    // 4. Aplica a correção APENAS se necessário (para não acionar reflow à toa)
    if (newLeft !== currentLeft || newTop !== currentTop) {
        // Adiciona uma transição rápida para o "pulo" ser suave se for um resize
        const originalTransition = element.style.transition;
        element.style.transition = "left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";
        
        element.style.left = `${newLeft}px`;
        element.style.top = `${newTop}px`;

        // Restaura a transição original depois do pulo
        setTimeout(() => {
            element.style.transition = originalTransition;
        }, 300);
    }
}

export const styleResizeHandle = {
  position: "absolute",
  bottom: "0",
  right: "0",
  width: "24px",
  height: "24px",
  cursor: "nwse-resize", // Cursor diagonal padrão do SO
  zIndex: "10",
  display: "flex",
  alignItems: "end",
  justifyContent: "end",
  padding: "4px",
  opacity: "0.5",
  transition: "opacity 0.2s",
  // Ícone de "risquinhos" em SVG via Data URI (Cinza Google)
  backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="none" stroke="%239aa0a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom right",
  borderBottomRightRadius: "20px" // Acompanha a borda da janela
};

export function makeResizable(element, handle) {
  handle.onmousedown = initResize;

  function initResize(e) {
    // 1. Impede que o clique propague para o Drag (não queremos arrastar, queremos redimensionar)
    e.stopPropagation(); 
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    
    // Captura dimensões atuais (Computadas, para precisão)
    const startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
    const startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);

    // Função de movimento
    function doResize(e) {
      // Calcula quanto o mouse andou
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);

      // Aplica com limites (Mínimo de 350px para não quebrar layout)
      if (newWidth > 350) {
          element.style.width = newWidth + 'px';
      }
      
      // Opcional: Se quiser controlar altura também. 
      // Se preferir altura automática pelo conteúdo, remova esse bloco IF.
      // Geralmente notes é bom ter resize vertical também.
      if (newHeight > 200) {
          element.style.height = newHeight + 'px';
      }
    }

    // Função de parada
    function stopResize() {
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
      
      // Opcional: Salvar preferência de tamanho no localStorage aqui
    }

    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
  }
  
  // Efeito visual no hover
  handle.onmouseenter = () => handle.style.opacity = "1";
  handle.onmouseleave = () => handle.style.opacity = "0.5";
}