// src/modules/call-script/call-script-assistant.js

import {
  styleSelect,
  stylePopup,
  styleCredit,
  typeBtnStyle,
  getRandomGoogleStyle,
  styleResizeHandle, // <--- Novo
  makeResizable      // <--- Novo
} from "../shared/utils.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";

// Importa os textos originais
import { csaChecklistData } from "./call-script-data.js";

export function initCallScriptAssistant() {
  const CURRENT_VERSION = "v2.0 (Teleprompter)";

  // --- ESTILOS LOCAIS (UI Otimizada) ---
  const styles = {
    progressBarContainer: {
        height: "4px",
        background: "#f1f3f4",
        width: "100%",
        position: "relative",
        overflow: "hidden"
    },
    progressBarFill: {
        height: "100%",
        background: "linear-gradient(90deg, #4285F4, #34A853)",
        width: "0%",
        transition: "width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        borderRadius: "0 2px 2px 0"
    },
    card: {
        background: "#ffffff",
        border: "1px solid #dadce0",
        borderRadius: "12px", // Google Material 3
        padding: "16px",
        marginBottom: "16px",
        transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    },
    cardTitle: {
        fontSize: "13px",
        fontWeight: "700",
        color: "#5f6368",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    itemRow: {
        display: "flex",
        alignItems: "flex-start",
        padding: "8px 0",
        cursor: "pointer",
        transition: "opacity 0.2s",
        color: "#202124",
        fontSize: "14px",
        lineHeight: "1.5"
    },
    itemCompleted: {
        opacity: "0.5",
        textDecoration: "line-through",
        color: "#5f6368"
    },
    checkbox: {
        minWidth: "18px",
        height: "18px",
        borderRadius: "4px",
        border: "2px solid #5f6368",
        marginRight: "12px",
        marginTop: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)"
    }
  };

  // --- Estado ---
  const csaCompletedTasks = {};
  let csaCurrentLang = "PT";
  let csaCurrentType = "BAU";
  let csaVisible = false;

  // --- POPUP ---
  const csaPopup = document.createElement("div");
  csaPopup.id = "call-script-popup";

  Object.assign(csaPopup.style, stylePopup, { 
        right: "auto", 
        left: "50%", // Centralizado para o Genie funcionar
        width: "400px",
        height: "600px",
        display: "flex", 
        flexDirection: "column",
        boxShadow: "none",
        opacity: "0",
        pointerEvents: "none"
  });

  const animRefs = { popup: csaPopup, googleLine: null };

  function toggleVisibility() {
    csaVisible = !csaVisible;
    toggleGenieAnimation(csaVisible, csaPopup, 'cw-btn-script');
  }

  // 1. HEADER
  const csaHeader = createStandardHeader(
    csaPopup,
    "Call Script",
    CURRENT_VERSION,
    "Guia interativo para condução de chamadas.", 
    animRefs,
    () => { toggleVisibility(); }
  );
  csaPopup.appendChild(csaHeader);

  // 2. PROGRESS BAR (NOVO)
  const progressContainer = document.createElement("div");
  Object.assign(progressContainer.style, styles.progressBarContainer);
  const progressFill = document.createElement("div");
  Object.assign(progressFill.style, styles.progressBarFill);
  progressContainer.appendChild(progressFill);
  csaPopup.appendChild(progressContainer);

  // 3. CONTEÚDO
  const csaContent = document.createElement("div");
  csaContent.id = "csa-content";
  Object.assign(csaContent.style, {
    padding: "16px",
    overflowY: "auto",
    flexGrow: "1",
    background: "#f8f9fa" // Fundo leve para destacar os cards brancos
  });
  csaPopup.appendChild(csaContent);

  // Footer (Créditos)
  const credit = document.createElement("div");
  credit.textContent = "created by lucaste@";
  Object.assign(credit.style, styleCredit);
  csaPopup.appendChild(credit);

  // --- CONTROLES DE CONFIGURAÇÃO ---
  const csaControlsDiv = document.createElement("div");
  Object.assign(csaControlsDiv.style, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    gap: "8px",
  });

  const csaTypeContainer = document.createElement("div");
  Object.assign(csaTypeContainer.style, {
    display: "flex",
    borderRadius: "8px",
    border: "1px solid #dadce0",
    overflow: "hidden",
    background: "#fff"
  });

  const csaTypeBAU = document.createElement("div");
  csaTypeBAU.textContent = "BAU";
  const csaTypeLT = document.createElement("div");
  csaTypeLT.textContent = "LT";

  Object.assign(csaTypeBAU.style, typeBtnStyle);
  Object.assign(csaTypeLT.style, typeBtnStyle);

  csaTypeContainer.appendChild(csaTypeBAU);
  csaTypeContainer.appendChild(csaTypeLT);

  const csaLangSelect = document.createElement("select");
  Object.assign(csaLangSelect.style, styleSelect, {
    marginBottom: "0",
    width: "auto",
    minWidth: "90px",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingRight: "30px", // Espaço para seta
    height: "32px",
    backgroundPosition: "right 8px center"
  });
  csaLangSelect.innerHTML = `<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>`;
  csaLangSelect.value = csaCurrentLang;

  csaControlsDiv.appendChild(csaTypeContainer);
  csaControlsDiv.appendChild(csaLangSelect);
  csaContent.appendChild(csaControlsDiv);

  const csaChecklistArea = document.createElement("div");
  csaChecklistArea.id = "csa-checklist-area";
  csaContent.appendChild(csaChecklistArea);

  // --- RESIZE HANDLE (NOVO) ---
  const resizeHandle = document.createElement('div');
  Object.assign(resizeHandle.style, styleResizeHandle);
  resizeHandle.className = "no-drag";
  resizeHandle.title = "Redimensionar";
  csaPopup.appendChild(resizeHandle);
  makeResizable(csaPopup, resizeHandle);

  document.body.appendChild(csaPopup);

  // --- LÓGICA DO SCRIPT ---

  // Simula "Smart Variables" (Futuro: IA vai preencher isso)
  function formatScriptText(text) {
      // Exemplo: Substituir placeholders se existissem
      // return text.replace('{CLIENTE}', 'João'); 
      return text;
  }

  function csaBuildChecklist() {
    csaChecklistArea.innerHTML = "";
    const combinedKey = `${csaCurrentLang} ${csaCurrentType}`;
    const data = csaChecklistData[combinedKey];

    if (!data) {
      csaChecklistArea.innerHTML = `<div style="padding: 20px; text-align: center; color: #5f6368;">Script não disponível.</div>`;
      progressFill.style.width = "0%";
      return;
    }

    // Cores do tema (Google)
    const activeColor = data.color || "#1a73e8";

    // 1. Calcula Progresso Total
    let totalItems = 0;
    let completedItems = 0;
    
    // Varre para contar
    ["inicio", "fim"].forEach(groupKey => {
        if(data[groupKey]) totalItems += data[groupKey].length;
    });

    // 2. Renderiza Grupos (Cards)
    ["inicio", "fim"].forEach((groupKey) => {
      const items = data[groupKey];
      if (!items || items.length === 0) return;

      // Card Container
      const card = document.createElement("div");
      Object.assign(card.style, styles.card);
      
      // Título do Card
      const cardTitle = document.createElement("div");
      Object.assign(cardTitle.style, styles.cardTitle);
      
      let titleText = groupKey === "inicio" ? "Abertura" : "Fechamento";
      // Traduções simples para título do card
      if (csaCurrentLang.includes("ES")) titleText = groupKey === "inicio" ? "Apertura" : "Cierre";
      if (csaCurrentLang.includes("EN")) titleText = groupKey === "inicio" ? "Opening" : "Closing";
      
      cardTitle.textContent = titleText;
      
      // Indicador de progresso do card (ex: 2/5)
      const counter = document.createElement("span");
      counter.style.fontSize = "11px";
      counter.style.opacity = "0.7";
      counter.id = `counter-${groupKey}`;
      cardTitle.appendChild(counter);

      card.appendChild(cardTitle);

      let groupDoneCount = 0;

      // Lista de Itens
      items.forEach((itemText, index) => {
        const key = `${combinedKey}-${groupKey}-${index}`;
        const isDone = !!csaCompletedTasks[key];
        if(isDone) {
            completedItems++;
            groupDoneCount++;
        }

        const row = document.createElement("div");
        Object.assign(row.style, styles.itemRow);
        
        // Custom Checkbox (Visual)
        const chk = document.createElement("div");
        Object.assign(chk.style, styles.checkbox);
        
        // Texto
        const textSpan = document.createElement("span");
        textSpan.innerHTML = formatScriptText(itemText); // Aplica variáveis se houver
        textSpan.style.flex = "1";

        // Estado Inicial
        if (isDone) {
            Object.assign(row.style, styles.itemCompleted);
            chk.style.background = activeColor;
            chk.style.borderColor = activeColor;
            // Ícone Check SVG
            chk.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        } else {
            row.style.textDecoration = "none";
            row.style.opacity = "1";
            chk.style.background = "transparent";
            chk.style.borderColor = "#5f6368";
            chk.innerHTML = "";
        }

        // Interação
        row.onclick = () => {
            // Toggle estado
            csaCompletedTasks[key] = !csaCompletedTasks[key];
            
            // Re-renderiza tudo para atualizar progresso e visuais
            // (Poderia ser otimizado, mas para listas pequenas é instantâneo e seguro)
            csaBuildChecklist();
            
            // Feedback Sonoro (Espaço reservado para o Sound UX)
            // playSound(csaCompletedTasks[key] ? 'check' : 'uncheck');
        };

        // Hover Effect
        row.onmouseenter = () => { if(!csaCompletedTasks[key]) row.style.background = "#f1f3f4"; };
        row.onmouseleave = () => { row.style.background = "transparent"; };

        row.appendChild(chk);
        row.appendChild(textSpan);
        card.appendChild(row);
      });

      // Atualiza contador do card
      counter.textContent = `${groupDoneCount}/${items.length}`;
      if (groupDoneCount === items.length) {
          counter.style.color = "#1e8e3e"; // Verde completo
          card.style.borderLeft = "4px solid #1e8e3e"; // Indicador visual lateral
      }

      csaChecklistArea.appendChild(card);
    });

    // Atualiza Barra de Progresso Global
    const progressPct = totalItems === 0 ? 0 : (completedItems / totalItems) * 100;
    progressFill.style.width = `${progressPct}%`;
    
    if (progressPct === 100) {
        progressFill.style.background = "#34A853"; // Verde Sucesso
    } else {
        progressFill.style.background = "linear-gradient(90deg, #4285F4, #34A853)";
    }
  }

  function setActiveType(type) {
    csaCurrentType = type;
    const newActiveStyle = getRandomGoogleStyle();

    Object.assign(csaTypeBAU.style, typeBtnStyle);
    Object.assign(csaTypeLT.style, typeBtnStyle);

    if (type === "BAU") {
      Object.assign(csaTypeBAU.style, newActiveStyle);
    } else {
      Object.assign(csaTypeLT.style, newActiveStyle);
    }
    csaBuildChecklist();
  }

  csaTypeBAU.onclick = () => setActiveType("BAU");
  csaTypeLT.onclick = () => setActiveType("LT");

  csaLangSelect.addEventListener("change", (e) => {
    csaCurrentLang = e.target.value;
    csaBuildChecklist();
  });

  // Carregamento inicial
  setActiveType(csaCurrentType);

  return toggleVisibility;
}