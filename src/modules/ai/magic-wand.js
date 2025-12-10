import { GeminiService } from "./gemini-service.js";
import { SoundManager } from "../shared/sound-manager.js"; // Certifique-se que o SoundManager tem o método playKey()

export function initMagicWand() {
  let currentTarget = null;
  let wandBtn = null;
  let wandMenu = null;

  // --- ESTILOS INJETADOS ---
  const styleId = "cw-magic-wand-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .cw-wand-btn {
        position: absolute; width: 32px; height: 32px; background: #fff;
        border: 1px solid #ddd; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        z-index: 9999; font-size: 16px; transition: transform 0.2s, opacity 0.2s;
        opacity: 0; pointer-events: none; color: #5f6368;
      }
      .cw-wand-btn.visible { opacity: 1; pointer-events: auto; transform: scale(1); }
      .cw-wand-btn:hover { background: #f0faff; color: #1a73e8; transform: scale(1.1); }
      .cw-wand-btn.thinking { animation: cw-spin 1s linear infinite; cursor: wait; color: #1a73e8; border-color: #1a73e8; }
      
      .cw-wand-menu {
        position: absolute; background: #fff; border: 1px solid #ddd; border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; display: none;
        flex-direction: column; min-width: 180px; overflow: hidden; font-family: 'Google Sans', sans-serif;
      }
      .cw-wand-item {
        padding: 10px 16px; cursor: pointer; font-size: 13px; color: #333; display: flex; align-items: center; gap: 8px;
        border-bottom: 1px solid #f1f3f4; transition: background 0.1s;
      }
      .cw-wand-item:last-child { border-bottom: none; }
      .cw-wand-item:hover { background: #f1f3f4; color: #1a73e8; }
      .cw-wand-item svg { width: 14px; height: 14px; opacity: 0.7; }
      
      @keyframes cw-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
  }

  // --- ELEMENTOS UI ---
  wandBtn = document.createElement("div");
  wandBtn.className = "cw-wand-btn";
  wandBtn.innerHTML = "✨";
  wandBtn.title = "IA Assistant";
  document.body.appendChild(wandBtn);

  wandMenu = document.createElement("div");
  wandMenu.className = "cw-wand-menu";
  document.body.appendChild(wandMenu);

  // --- LÓGICA DE POSICIONAMENTO ---
  function positionWand(target) {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    // Posiciona no canto superior direito do input
    const top = rect.top + window.scrollY + 8;
    const left = rect.right + window.scrollX - 40; 
    
    wandBtn.style.top = `${top}px`;
    wandBtn.style.left = `${left}px`;
    wandBtn.classList.add("visible");
  }

  function hideUI() {
    wandBtn.classList.remove("visible");
    wandMenu.style.display = "none";
    // Pequeno delay para limpar target, caso seja clique dentro do menu
    setTimeout(() => { if(wandMenu.style.display === 'none') currentTarget = null; }, 200);
  }

  // --- EVENT LISTENERS GLOBAIS ---
  document.addEventListener("focusin", (e) => {
    const el = e.target;
    // Ativa apenas em Textareas e Inputs de texto que não sejam senha/hidden
    if ((el.tagName === "TEXTAREA" || (el.tagName === "INPUT" && el.type === "text")) && !el.readOnly) {
      currentTarget = el;
      positionWand(el);
    }
  }, true); // Use capture para pegar eventos de shadow DOM se houver

  document.addEventListener("click", (e) => {
    // Se clicar fora do input e fora da varinha, esconde
    if (currentTarget && !currentTarget.contains(e.target) && !wandBtn.contains(e.target) && !wandMenu.contains(e.target)) {
      hideUI();
    }
  }, true);

  // --- MENUS E AÇÕES ---
  const ACTIONS = [
    { label: "Profissionalizar", prompt: "Reescreva este texto de forma mais profissional, corporativa e empática, mantendo o sentido original. Corrija gramática e pontuação.", icon: "👔" },
    { label: "Resumir Caso", prompt: "Resuma o texto abaixo focando nos pontos principais para um log de atendimento.", icon: "📝" },
    { label: "Traduzir p/ Inglês", prompt: "Traduza este texto para inglês corporativo (Business English).", icon: "🇺🇸" },
    { label: "Expandir/Detalhar", prompt: "Expanda este texto adicionando detalhes explicativos e tornando-o mais completo.", icon: "➕" }
  ];

  function renderMenu() {
    wandMenu.innerHTML = "";
    
    // Header do menu (Status da Chave)
    if (!GeminiService.hasKey()) {
      const item = document.createElement("div");
      item.className = "cw-wand-item";
      item.innerHTML = "🔑 <b>Configurar API Key</b>";
      item.onclick = () => {
        const key = prompt("Cole sua Google Gemini API Key aqui:");
        if (GeminiService.setKey(key)) alert("Chave salva! Tente novamente.");
        hideUI();
      };
      wandMenu.appendChild(item);
      return;
    }

    ACTIONS.forEach(action => {
      const item = document.createElement("div");
      item.className = "cw-wand-item";
      item.innerHTML = `<span>${action.icon}</span> ${action.label}`;
      item.onclick = () => runAction(action);
      wandMenu.appendChild(item);
    });
  }

  wandBtn.onclick = (e) => {
    e.stopPropagation(); // Não perde o foco
    const rect = wandBtn.getBoundingClientRect();
    wandMenu.style.top = `${rect.bottom + 5 + window.scrollY}px`;
    wandMenu.style.left = `${rect.left - 150 + window.scrollX}px`; // Abre para a esquerda
    wandMenu.style.display = "flex";
    renderMenu();
  };

  // --- EXECUÇÃO E EFEITO TYPEWRITER ---
  async function runAction(action) {
    if (!currentTarget) return;
    wandMenu.style.display = "none";
    wandBtn.classList.add("thinking"); // Estado de carregamento

    const originalText = currentTarget.value;
    if (!originalText || originalText.trim().length === 0) {
      alert("Escreva algo no campo para a IA processar.");
      wandBtn.classList.remove("thinking");
      return;
    }

    try {
      const prompt = `${action.prompt}\n\nTexto original: "${originalText}"`;
      const result = await GeminiService.generateText(prompt);
      
      // Efeito Ghostwriter
      wandBtn.classList.remove("thinking");
      typeWriterEffect(currentTarget, result);

    } catch (error) {
      wandBtn.classList.remove("thinking");
      console.error(error);
      if (error.message === "INVALID_KEY") alert("Chave API inválida ou expirada.");
      else alert("Erro na IA: " + error.message);
    }
  }

  function typeWriterEffect(element, text) {
    element.focus();
    element.value = ""; // Limpa (ou poderia append)
    let i = 0;
    
    // Velocidade variável para parecer humano
    function type() {
      if (i < text.length) {
        element.value += text.charAt(i);
        i++;
        
        // Som de tecla (Opcional, se o SoundManager tiver)
        if (Math.random() > 0.5) SoundManager.playClick(); 
        
        // Scroll para o fim
        element.scrollTop = element.scrollHeight;
        
        // Randomiza velocidade (entre 10ms e 50ms)
        setTimeout(type, Math.random() * 40 + 10);
      }
    }
    type();
  }
}