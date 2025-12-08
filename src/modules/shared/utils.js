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
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. Define a Família de Fontes Global
  const style = document.createElement('style');
    style.id = 'techsol-global-styles';
    style.textContent = `
        :root {
            --cw-primary: #1a73e8;
            --cw-primary-hover: #1557b0;
            --cw-surface: #ffffff;
            --cw-surface-glass: rgba(255, 255, 255, 0.92);
            --cw-border: #dadce0;
            --cw-text: #202124;
            --cw-text-sub: #5f6368;
            --cw-shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            --cw-shadow-lg: 0 12px 28px rgba(0,0,0,0.12);
            --cw-radius: 12px;
            --cw-ease-elastic: cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* Scrollbar Moderno (Estilo Mac/Android) */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.4); }

        /* Reset e Fonte */
        body, button, input, select, textarea, .cw-pill, .cw-module {
            font-family: 'Google Sans', 'Roboto', sans-serif !important;
            -webkit-font-smoothing: antialiased; /* Renderização Apple */
        }

        /* Foco Acessível e Bonito (Anel Google) */
        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: var(--cw-primary) !important;
            box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2) !important;
        }

        /* Feedback Tátil Global (Scale) */
        .cw-clickable:active, button:active { 
            transform: scale(0.96) !important; 
            transition: transform 0.1s var(--cw-ease-elastic);
        }

        /* Utilitários do Script Assistant (Refinados) */
        .csa-li { 
            margin: 6px 0 !important; 
            padding: 10px 12px; border-radius: 8px; 
            border: 1px solid transparent;
            transition: all 0.2s var(--cw-ease-elastic); 
            font-size: 14px; cursor: pointer; user-select: none;
            background-color: #f8f9fa; color: var(--cw-text);
        }
        .csa-li:hover { 
            background-color: #e8f0fe; 
            color: var(--cw-primary);
            transform: translateX(4px); /* Movimento sutil à direita */
        }
        .csa-li.csa-completed { 
            opacity: 0.6; 
            text-decoration: line-through; 
            background: transparent;
            border: 1px dashed var(--cw-border);
        }
    `;
    document.head.appendChild(style);
}

export function showToast(message, opts = {}) {
  const toast = document.createElement("div");
  // Determina cor baseada no tipo (sucesso vs erro)
  const bg = opts.error 
    ? "rgba(217, 48, 37, 0.95)" // Vermelho Google com transparência
    : "rgba(32, 33, 36, 0.90)"; // Cinza escuro Google com transparência

  Object.assign(toast.style, {
    position: "fixed",
    bottom: "32px", // Mais alto para respirar
    left: "50%",
    transform: "translateX(-50%) scale(0.9)", // Começa menor (pop effect)
    background: bg,
    backdropFilter: "blur(8px)", // Efeito Glass (Apple)
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "50px", // Pílula completa
    boxShadow: "0 6px 16px rgba(0,0,0,0.2)", // Sombra difusa
    fontFamily: "'Google Sans', sans-serif",
    fontSize: "14px",
    fontWeight: "500",
    zIndex: "2147483647",
    opacity: "0",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Efeito "Spring" (Mola)
    pointerEvents: "none" // Não bloqueia cliques embaixo
  });

  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) scale(1)"; // Pop!
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) scale(0.9) translateY(10px)";
    setTimeout(() => toast.remove(), 400);
  }, opts.duration || 4000);
}

export function makeDraggable(element, handle = null) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const dragHandle = handle || element;

  dragHandle.style.cursor = "grab";
  dragHandle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    if (
      ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(e.target.tagName) ||
      e.target.classList.contains("no-drag")
    )
      return;

    e = e || window.event;
    // e.preventDefault(); // Removido para permitir foco
    dragHandle.style.cursor = "grabbing";

    const rect = element.getBoundingClientRect();
    element.style.left = rect.left + "px";
    element.style.top = rect.top + "px";
    element.style.right = "auto";
    element.style.bottom = "auto";
    if (!element.style.width) element.style.width = rect.width + "px";

    highestZIndex++;
    element.style.zIndex = highestZIndex;
    pos3 = e.clientX;
    pos4 = e.clientY;

    element.setAttribute("data-dragging", "false");
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.setAttribute("data-dragging", "true");
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    dragHandle.style.cursor = "grab";
    setTimeout(() => {
      element.setAttribute("data-dragging", "false");
    }, 100);
  }
}

// =========================================================
//           ESTILOS PADRÃO (UI Styles)
// =========================================================
// =========================================================
//           ESTILOS UI (Refinados)
// =========================================================

export const styleFloatingButton = {
  position: "fixed",
  right: "24px",
  bottom: "24px", // Se certifique que tem bottom ou top definido
  width: "56px", // Tamanho padrão FAB Google
  height: "56px",
  borderRadius: "16px", // Squircle (Apple style) ao invés de circulo perfeito fica mais moderno
  background: "linear-gradient(135deg, #1a73e8, #0059c1)", // Profundidade sutil
  color: "#fff",
  fontSize: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(26, 115, 232, 0.4)", // Sombra colorida (Glow)
  zIndex: "9999",
  border: "none",
  transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease",
  fontFamily: "'Google Sans', sans-serif",
  // Adicionar via JS no hover: transform: scale(1.05)
  // Adicionar via JS no active: transform: scale(0.95)
};

export const stylePopup = {
  position: "fixed",
  top: "50%",
  left: "50%",
  // Centralização perfeita via transform, ajustada depois pelo JS do drag
  transform: "translate(-50%, -50%) scale(0.95)", 
  width: "400px",
  maxHeight: "85vh",

  zIndex: "99999",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",

  // O "Vidro" Sólido
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px) saturate(180%)", // O segredo do visual Apple
  borderRadius: "20px", // Cantos mais arredondados
  boxShadow: "0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)", // Borda sutil + Sombra profunda

  opacity: "0",
  pointerEvents: "none", // Controlado pelo JS de animação
  fontFamily: "'Google Sans', sans-serif",
  transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)",
};

export const stylePopupHeader = {
  display: "flex",
  alignItems: "center", // Centralizado verticalmente
  justifyContent: "space-between",
  padding: "16px 20px",
  background: "transparent", // Deixa o vidro do pai aparecer
  borderBottom: "1px solid rgba(0,0,0,0.06)",
  cursor: "grab",
  userSelect: "none",
  flexShrink: "0",
};

export const stylePopupTitle = {
  fontSize: "16px", // Um pouco menor, mais elegante
  fontWeight: "600",
  color: "#202124",
  letterSpacing: "-0.01em",
};

export const stylePopupCloseBtn = {
  fontSize: "24px",
  color: "#5f6368",
  cursor: "pointer",
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background: "rgba(0,0,0,0.05)", // Fundo sutil
  transition: "all 0.2s ease",
  border: "none",
};

export const styleSelect = {
  width: "100%",
  padding: "12px 16px", // Mais gordinho (touch target)
  borderRadius: "12px",
  border: "1px solid #dadce0",
  backgroundColor: "#f8f9fa", // Fundo levemente cinza (Input Google)
  fontSize: "14px",
  color: "#3c4043",
  boxSizing: "border-box",
  appearance: "none",
  // SVG atualizado para uma seta mais fina
  backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "16px",
  transition: "all 0.2s ease",
  fontFamily: "'Google Sans', sans-serif",
  cursor: "pointer",
};

export const styleButtonBase = {
  flex: "1",
  padding: "12px 20px",
  background: "#1a73e8",
  color: "#fff",
  border: "none",
  borderRadius: "100px", // Botão Pílula (Tendência Google/Apple atual)
  fontSize: "14px",
  fontWeight: "500",
  letterSpacing: "0.25px",
  cursor: "pointer",
  marginTop: "20px",
  // Sombra suave, sem contorno preto duro
  boxShadow: "0 2px 6px rgba(26, 115, 232, 0.3)",
  transition: "transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease, background 0.2s",
  // IMPORTANTE: Adicionar no JS: element.onmousedown = () => el.style.transform = 'scale(0.96)'
};

export const styleLabel = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: COLORS.text,
  marginBottom: "8px",
  marginTop: "16px",
};






export const styleCredit = {
  fontSize: "10px",
  color: "#9aa0a6",
  textAlign: "center",
  padding: "8px 16px",
  borderTop: "1px solid #eee",
  marginTop: "16px",
};
export const styleExpandButton = {
  fontSize: "18px",
  color: "#5f6368",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "50%",
  transition: "background-color 0.2s ease, color 0.2s ease",
  lineHeight: "1",
  zIndex: "10",
};
export const typeBtnStyle = {
  padding: "6px 12px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  color: "#5f6368",
  background: "#f8f9fa",
  transition: "all 0.2s ease",
  width: "100%",
  textAlign: "center",
};
export const styleIconBtn = {
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer",
  color: "#5f6368",
  fontSize: "18px",
  transition: "background-color 0.2s ease",
  marginLeft: "4px",
};
export const styleHelpOverlay = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  backdropFilter: "blur(4px)",
  zIndex: "50",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "20px",
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

  // 1. Injeta CSS da Splash (Kebab-Case Corrigido)
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