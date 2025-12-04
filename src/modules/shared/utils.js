// No Topo:
import { captureNameWithMagic, getSmartGreeting } from "./page-data.js";

let highestZIndex = 10000;

export function initGlobalStylesAndFont() {
  if (
    document.getElementById("google-font-poppins") &&
    document.getElementById("techsol-global-styles")
  ) {
    return;
  }
  const link = document.createElement("link");
  link.id = "google-font-poppins";
  link.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  const style = document.createElement("style");
  style.id = "techsol-global-styles";
  style.textContent = `
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        
        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: #1a73e8 !important;
            box-shadow: 0 0 0 1px #1a73e8 !important;
        }
        button:active { transform: translateY(1px); }
        textarea.bullet-textarea { padding-left: 10px; }
        
        .csa-group-container { border-left: 3px solid transparent; padding-left: 5px; transition: all 0.3s ease-out; }
        .csa-group-title { transition: color 0.3s ease-out; }
        .csa-group-container.csa-group-completed { border-left: 3px solid #34a853; }
        .csa-group-container.csa-group-completed .csa-group-title { color: #34a853; }
        
        .csa-li { 
            margin: 8px 0 !important; 
            padding: 8px 10px; border-radius: 6px; border: 2px solid transparent;
            transition: all 0.2s ease; font-size: 14px; cursor: pointer; user-select: none;
            background-color: #f8f9fa; color: #202124; line-height: 1.4;
            text-decoration: none; transform: scale(1);
        }
        .csa-li:hover { background-color: #f1f3f4; transform: scale(1.02); }
        .csa-li.csa-completed { text-decoration: line-through; color: #5f6368; transform: scale(0.98); }
    `;
  document.head.appendChild(style);
}

export function showToast(message, opts = {}) {
  const toast = document.createElement("div");
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%) translateY(20px)",
    background: opts.error ? "#d93025" : "#323232",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0,0,0,.3)",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    lineHeight: "20px",
    zIndex: "9999999",
    opacity: "0",
    transition: "opacity .3s ease, transform .3s ease",
  });
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, opts.duration || 4000);
}

export function makeDraggable(element, handle = null) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const dragHandle = handle || element;

  dragHandle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    // Ignora inputs e botões internos
    if (
      ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(e.target.tagName) ||
      e.target.classList.contains("no-drag")
    ) {
      return;
    }

    e = e || window.event;
    e.preventDefault();

    // === CORREÇÃO 1: O PULO ===
    // Captura a posição visual ATUAL exata
    const rect = element.getBoundingClientRect();

    // 1. Fixa a posição usando Left/Top ANTES de remover o Right
    element.style.left = rect.left + "px";
    element.style.top = rect.top + "px";

    // 2. Agora sim, remove as âncoras que causam conflito
    element.style.right = "auto";
    element.style.bottom = "auto";

    // 3. Fixa a largura para evitar deformação ao encostar na borda
    element.style.width = rect.width + "px";
    // ===========================

    // Z-Index e Inicialização
    highestZIndex++;
    element.style.zIndex = highestZIndex;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Reseta flag de arrasto
    element.setAttribute("data-dragging", "false");

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // Calcula quanto moveu
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // === CORREÇÃO 2: DETECTAR ARRASTO ===
    // Se moveu, marca como 'arrastando' para não disparar o click depois
    element.setAttribute("data-dragging", "true");
    // ====================================

    // Aplica nova posição
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;

    // Remove a flag de arrasto após um breve delay
    // Isso permite que o evento 'click' verifique a flag antes dela sumir
    setTimeout(() => {
      element.setAttribute("data-dragging", "false");
    }, 100);
  }
}

// =========================================================
//           ESTILOS PADRÃO
// =========================================================

export const styleFloatingButton = {
  position: "fixed",
  right: "20px",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "#1a73e8",
  color: "#fff",
  fontSize: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
  zIndex: "9999",
  border: "none",
  transition: "background-color 0.2s ease, transform 0.2s ease-out",
  transform: "scale(1)",
  fontFamily: "'Poppins', sans-serif",
};

export const stylePopup = {
  position: "fixed",
  top: "calc(50% - 250px)",
  width: "380px",
  maxHeight: "90vh",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.2), 0 0 4px rgba(0,0,0,0.08)",
  zIndex: "9999",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  transition:
    "opacity 0.2s ease-out, transform 0.2s ease-out, width 0.3s ease-out",
  opacity: "0",
  transform: "scale(0.95)",
  pointerEvents: "none",
  fontFamily: "'Poppins', sans-serif",
};

export const stylePopupTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#202124",
  flexGrow: "1",
};

export const stylePopupVersion = {
  fontSize: "12px",
  fontWeight: "400",
  color: "#70757a",
  marginTop: "4px",
};

export const stylePopupCloseBtn = {
  fontSize: "20px",
  color: "#5f6368",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "50%",
  transition: "background-color 0.2s ease, color 0.2s ease",
  lineHeight: "1",
  zIndex: "10",
  marginLeft: "8px",
};

export const styleLabel = {
  display: "block",
  fontSize: "14px",
  fontWeight: "500",
  color: "#3c4043",
  marginBottom: "8px",
  marginTop: "16px",
};

export const styleSelect = {
  width: "100%",
  padding: "10px 36px 10px 12px",
  borderRadius: "8px",
  border: "1px solid #dadce0",
  backgroundColor: "#fff",
  fontSize: "14px",
  color: "#3c4043",
  boxSizing: "border-box",
  appearance: "none",
  backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%233c4043%22%20d%3D%22M287%20197.3l-116.5-116.5c-4.7-4.7-12.4-4.7-17.1%200L5.4%20197.3c-4.7%204.7-4.7%2012.4%200%2017.1l17.1%2017.1c4.7%204.7%2012.4%204.7%2017.1%200l94.3-94.3c4.7-4.7%2012.4-4.7%2017.1%200l94.3%2094.3c4.7%204.7%2012.4%204.7%2017.1%200l17.1-17.1c4.7-4.7%204.7-12.4%200-17.1z%22%2F%3E%3C%2Fsvg%3E')`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "10px",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  fontFamily: "'Poppins', sans-serif",
};

export const styleButtonBase = {
  flex: "1 1 0",
  padding: "10px 0",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  marginTop: "16px",
  transition:
    "background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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

// ===== ESTILO COMPARTILHADO (BAU/LT/LM/PT/ES) =====
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

// ===== CORES DO GOOGLE (Para sorteio) =====
const GOOGLE_COLORS_LIST = [
  { background: "#E8F0FE", color: "#1967D2" }, // Azul
  { background: "#FCE8E6", color: "#C5221F" }, // Vermelho
  { background: "#FEF7E0", color: "#F29900" }, // Amarelo
  { background: "#E6F4EA", color: "#1E8E3E" }, // Verde
];

let lastColorIndex = -1;

export function getRandomGoogleStyle() {
  let newIndex = Math.floor(Math.random() * GOOGLE_COLORS_LIST.length);

  if (newIndex === lastColorIndex) {
    newIndex = (newIndex + 1) % GOOGLE_COLORS_LIST.length;
  }

  lastColorIndex = newIndex;
  return GOOGLE_COLORS_LIST[newIndex];
}

// =========================================
// --- ANIMAÇÕES GOOGLE (Novo) ---
// =========================================

// 1. Injeta os estilos da animação na página (roda uma vez só)
let googleStylesInjected = false;

export function injectGoogleAnimationStyles() {
  if (googleStylesInjected || document.getElementById("techsol-google-styles"))
    return;

  const style = document.createElement("style");
  style.id = "techsol-google-styles";
  style.innerHTML = `
        /* Animação de Pulso (Mantida) */
        @keyframes google-pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.7); }
            25% { box-shadow: 0 0 0 10px rgba(234, 67, 53, 0); }
            50% { box-shadow: 0 0 0 20px rgba(251, 188, 5, 0); }
            100% { box-shadow: 0 0 0 30px rgba(52, 168, 83, 0); }
        }

        .google-animate-click {
            animation: google-pulse-ring 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        /* --- BORDA ATIVA SUTIL (Ajustada) --- */
        .google-active-state {
            position: relative !important; 
            overflow: visible !important;
        }

        .google-active-state::before {
            content: '';
            position: absolute;
            /* Apenas 1px para fora (borda finíssima) */
            top: -1px; left: -1px; right: -1px; bottom: -1px; 
            border-radius: 50%;
            /* O Arco-íris */
            background: conic-gradient(from 0deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4);
            z-index: -1;
            /* A mágica do "Meio Apagado" */
            opacity: 0.25; /* Bem transparente */
            filter: blur(3px); /* Difuso */
        }
    `;
  document.head.appendChild(style);
  googleStylesInjected = true;
}

// 2. Função que os módulos vão chamar para animar um botão
export function triggerGoogleAnimation(element) {
  // Garante que os estilos existem
  injectGoogleAnimationStyles();

  // Remove a classe se já estiver rodando (para poder reiniciar)
  element.classList.remove("google-animate-click");

  // Força um "reflow" para o navegador perceber que removemos a classe
  void element.offsetWidth;

  // Adiciona a classe que roda a animação
  element.classList.add("google-animate-click");

  // Limpa a classe depois que a animação termina
  setTimeout(() => {
    element.classList.remove("google-animate-click");
  }, 600); // O mesmo tempo da duração da animação no CSS
}



// Atualize o Header para ser Branco
export const stylePopupHeader = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  padding: "0",
  backgroundColor: "#ffffff",
  cursor: "grab",
  userSelect: "none",
  borderRadius: "12px 12px 0 0",
  flexShrink: "0",
  position: "relative",
};

// Novo estilo para botões de ícone (Help, Close, Expand)
export const styleIconBtn = {
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer",
  color: "#5f6368", // Cinza Google
  fontSize: "18px", // Tamanho do ícone
  transition: "background-color 0.2s ease",
  marginLeft: "4px",
};

// Estilo do Overlay de Ajuda (Backdrop)
export const styleHelpOverlay = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.92)", // Branco translúcido
  backdropFilter: "blur(4px)", // Desfoque chique
  zIndex: "50", // Fica acima do conteúdo, abaixo do header
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "20px",
  boxSizing: "border-box",
  opacity: "0",
  transition: "opacity 0.3s ease",
  pointerEvents: "none", // Começa invisível e não clicável
};

// ... (resto do arquivo) ...

// --- STARTUP ANIMATION ---
export async function playStartupAnimation() {
  if (document.getElementById("techsol-splash-screen")) return;

  // 1. CSS (Injetado apenas uma vez)
  if (!document.getElementById("google-splash-style")) {
    const style = document.createElement("style");
    style.id = "google-splash-style";
    style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: 2147483647; display: flex; flex-direction: column; alignItems: center; justifyContent: center; opacity: 0; }
            .splash-exit { animation: focusOut 0.9s cubic-bezier(0.4, 0.0, 0.2, 1) forwards; }
            @keyframes focusOut { 0% { opacity: 1; transform: scale(1); filter: blur(0); } 100% { opacity: 0; transform: scale(1.15); filter: blur(15px); } }
            .sentence-wrapper { display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 10px; max-width: 80%; position: relative; }
            .text-part { font-size: 32px; color: #E8EAED; opacity: 0; transition: opacity 0.8s ease; }
            .text-name { font-size: 32px; font-weight: 700; background: linear-gradient(90deg, #8AB4F8, #C58AF9, #F28B82); -webkit-background-clip: text; -webkit-text-fill-color: transparent; opacity: 0; }
            .text-footer { font-size: 20px; color: #9AA0A6; font-weight: 400; width: 100%; text-align: center; margin-top: 12px; opacity: 0; transform: translateY(10px); transition: all 1s cubic-bezier(0.0, 0.0, 0.2, 1); }
            .sextou-badge { display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; padding: 6px 16px; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #F28B82; font-size: 14px; font-weight: 500; opacity: 0; transform: scale(0.8); transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
            .cursor { color: #8AB4F8; -webkit-text-fill-color: #8AB4F8; font-weight: 100; margin-left: 1px; animation: blink 1s infinite; }
            .brand-logo { position: absolute; top: 40px; font-size: 20px; font-weight: 500; color: #5f6368; letter-spacing: 1px; text-transform: uppercase; opacity: 0; animation: fadeInDown 0.8s ease forwards; }
            .weather-icon { width: 42px; height: 42px; margin-bottom: 24px; opacity: 0; transform: scale(0.8); transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
            .credit-pro { position: absolute; bottom: 30px; font-size: 11px; color: #5f6368; letter-spacing: 0.5px; opacity: 0; animation: fadeInSimple 1.5s ease 1s forwards; }
            .credit-pro span { color: #8AB4F8; font-weight: 500; opacity: 0.9; }
            .loader-line { position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853); transform: scaleX(0); transform-origin: left; animation: loadLine 4s linear forwards; }
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes loadLine { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
            @keyframes fadeInSimple { to { opacity: 1; } }
        `;
    document.head.appendChild(style);
  }

  // 2. Estrutura HTML
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

  // 3. Execução
  requestAnimationFrame(() => (splash.style.opacity = "1"));

  const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

  // Chama o Sherlock (Isso vai popular a variável cachedAgentName)
  await esperar(200);
  const name = await captureNameWithMagic();
  const data = getSmartGreeting(name);

  const wIcon = document.getElementById("w-icon");
  const el1 = document.getElementById("p1");
  const el2 = document.getElementById("p2");
  const el3 = document.getElementById("p3");
  const elSextou = document.getElementById("p-sextou");

  wIcon.innerHTML = data.icon;
  el1.textContent = data.prefix;
  el3.textContent = data.suffix;

  await esperar(300);

  // Ícone
  const svg = wIcon.querySelector("svg");
  if (svg) {
    svg.style.opacity = "1";
    svg.style.transform = "scale(1)";
  }

  await esperar(400);
  el1.style.opacity = "1"; // Bom dia

  // Typewriter
  el2.style.opacity = "1";
  el2.innerHTML = '<span class="cursor">|</span>';
  const cursor = el2.querySelector(".cursor");
  await esperar(300);
  for (let i = 0; i < data.name.length; i++) {
    const char = data.name.charAt(i);
    const span = document.createElement("span");
    span.textContent = char;
    el2.insertBefore(span, cursor);
    let speed = Math.floor(Math.random() * 60) + 30;
    if (i === 0) speed = 150;
    if (i > data.name.length - 3) speed = 30;
    await esperar(speed);
  }
  await esperar(600);
  cursor.style.display = "none";

  // Frase final
  el3.style.opacity = "1";
  el3.style.transform = "translateY(0)";

  // Sextou
  if (data.isFriday) {
    await esperar(400);
    elSextou.style.display = "block";
    // Reflow
    void elSextou.offsetWidth;
    const badge = elSextou.querySelector(".sextou-badge");
    badge.style.opacity = "1";
    badge.style.transform = "scale(1)";
  }

  // Saída
  await esperar(1500);
  splash.classList.add("splash-exit");
  await esperar(900);
  splash.remove();
}
