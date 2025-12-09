// src/modules/call-script/call-script-assistant.js

import {
  styleSelect,
  stylePopup,
  styleCredit,
  typeBtnStyle,
  getRandomGoogleStyle,
  styleResizeHandle,
  makeResizable
} from "../shared/utils.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";

// Importa os textos
import { csaChecklistData } from "./call-script-data.js";

export function initCallScriptAssistant() {
  const CURRENT_VERSION = "v2.1 (Apple Motion)";

  // --- ESTILOS LOCAIS (Refinados para Feedback Tátil) ---
  const styles = {
    // Barra de Progresso "Líquida"
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
        transition: "width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)", // Física suave
        borderRadius: "0 2px 2px 0"
    },
    // Container de Conteúdo
    contentArea: {
        padding: "16px",
        overflowY: "auto",
        flexGrow: "1",
        background: "#f8f9fa", // Contraste com os cards brancos
        scrollBehavior: "smooth"
    },
    // Cards (Ilhas de Informação)
    card: {
        background: "#ffffff",
        border: "1px solid #dadce0",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
    },
    cardTitle: {
        fontSize: "13px",
        fontWeight: "700",
        color: "#5f6368",
        textTransform: "uppercase",
        letterSpacing: "0.6px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        userSelect: "none"
    },
    // Linha do Item
    itemRow: {
        display: "flex",
        alignItems: "flex-start",
        padding: "10px 8px", // Área de clique maior
        cursor: "pointer",
        borderRadius: "8px",
        transition: "background-color 0.15s ease, opacity 0.3s ease",
        color: "#202124",
        fontSize: "14px",
        lineHeight: "1.5",
        marginBottom: "2px"
    },
    // Estado Completado
    itemCompleted: {
        opacity: "0.5",
        textDecoration: "line-through",
        color: "#5f6368"
    },
    // Checkbox Customizado (Quadrado Arredondado)
    checkbox: {
        minWidth: "20px",
        height: "20px",
        borderRadius: "6px", // Squircle Apple
        border: "2px solid #dadce0",
        marginRight: "14px",
        marginTop: "1px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", // Efeito "Pop" Elástico
        background: "#fff"
    },
    // Footer do Reset
    footer: {
        padding: "12px 16px",
        borderTop: "1px solid #eee",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between", // Créditos na esq, Reset na dir
        alignItems: "center"
    },
    resetBtn: {
        background: "transparent",
        border: "none",
        color: "#d93025", // Vermelho Google (Atenção suave)
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
        padding: "6px 12px",
        borderRadius: "20px",
        transition: "background 0.2s ease",
        display: "flex",
        alignItems: "center",
        gap: "4px"
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
        left: "50%", 
        width: "400px",
        height: "650px", // Um pouco mais alto para caber o footer
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

  // 2. PROGRESS BAR
  const progressContainer = document.createElement("div");
  Object.assign(progressContainer.style, styles.progressBarContainer);
  const progressFill = document.createElement("div");
  Object.assign(progressFill.style, styles.progressBarFill);
  progressContainer.appendChild(progressFill);
  csaPopup.appendChild(progressContainer);

  // 3. CONTEÚDO (Scrollable)
  const csaContent = document.createElement("div");
  csaContent.id = "csa-content";
  Object.assign(csaContent.style, styles.contentArea);
  csaPopup.appendChild(csaContent);

  // 4. FOOTER (Reset + Créditos)
  const footer = document.createElement("div");
  Object.assign(footer.style, styles.footer);
  
  // Créditos
  const credit = document.createElement("span");
  credit.textContent = "by lucaste@";
  Object.assign(credit.style, { fontSize: "10px", color: "#bdc1c6" });
  
  // Botão Reset (Novo)
  const resetBtn = document.createElement("button");
  resetBtn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `;
  Object.assign(resetBtn.style, styles.resetBtn);
  
  // Hover do Reset
  resetBtn.onmouseenter = () => resetBtn.style.background = "#fce8e6"; // Fundo vermelho claro
  resetBtn.onmouseleave = () => resetBtn.style.background = "transparent";
  
  // Ação de Reset
  resetBtn.onclick = () => {
      // Feedback Visual no botão
      resetBtn.style.transform = "scale(0.9)";
      setTimeout(() => resetBtn.style.transform = "scale(1)", 150);
      
      // Limpa dados
      for (let key in csaCompletedTasks) delete csaCompletedTasks[key];
      
      // Re-renderiza com animação
      csaBuildChecklist();
  };

  footer.appendChild(credit);
  footer.appendChild(resetBtn);
  csaPopup.appendChild(footer);

  // --- CONTROLES (Dentro do Content) ---
  const csaControlsDiv = document.createElement("div");
  Object.assign(csaControlsDiv.style, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    gap: "8px",
  });

  // Toggle BAU/LT
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

  // Select Idioma
  const csaLangSelect = document.createElement("select");
  Object.assign(csaLangSelect.style, styleSelect, {
    marginBottom: "0",
    width: "auto",
    minWidth: "90px",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingRight: "30px",
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

  // --- RESIZE HANDLE ---
  const resizeHandle = document.createElement('div');
  Object.assign(resizeHandle.style, styleResizeHandle);
  resizeHandle.className = "no-drag";
  resizeHandle.title = "Redimensionar";
  csaPopup.appendChild(resizeHandle);
  makeResizable(csaPopup, resizeHandle);

  document.body.appendChild(csaPopup);

  // --- LÓGICA & RENDERIZAÇÃO ---

  // Simula "Smart Variables"
  function formatScriptText(text) {
      return text;
  }

  function csaBuildChecklist() {
    csaChecklistArea.innerHTML = "";
    const combinedKey = `${csaCurrentLang} ${csaCurrentType}`;
    const data = csaChecklistData[combinedKey];

    if (!data) {
      csaChecklistArea.innerHTML = `<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">☕</div>
        <div>Script não configurado.</div>
      </div>`;
      progressFill.style.width = "0%";
      return;
    }

    const activeColor = data.color || "#1a73e8";

    // 1. Calcula Progresso
    let totalItems = 0;
    let completedItems = 0;
    ["inicio", "fim"].forEach(k => { if(data[k]) totalItems += data[k].length; });

    // 2. Renderiza Cards
    ["inicio", "fim"].forEach((groupKey, groupIndex) => {
      const items = data[groupKey];
      if (!items || items.length === 0) return;

      const card = document.createElement("div");
      Object.assign(card.style, styles.card);
      
      // Título
      const cardTitle = document.createElement("div");
      Object.assign(cardTitle.style, styles.cardTitle);
      
      let titleText = groupKey === "inicio" ? "Abertura" : "Fechamento";
      if (csaCurrentLang.includes("ES")) titleText = groupKey === "inicio" ? "Apertura" : "Cierre";
      if (csaCurrentLang.includes("EN")) titleText = groupKey === "inicio" ? "Opening" : "Closing";
      
      cardTitle.textContent = titleText;
      
      // Contador (ex: 2/5)
      const counter = document.createElement("span");
      counter.style.fontSize = "11px";
      counter.style.opacity = "0.7";
      counter.style.fontWeight = "500";
      counter.style.background = "#f1f3f4";
      counter.style.padding = "2px 8px";
      counter.style.borderRadius = "10px";
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
        
        // Checkbox
        const chk = document.createElement("div");
        Object.assign(chk.style, styles.checkbox);
        
        // Texto
        const textSpan = document.createElement("span");
        textSpan.innerHTML = formatScriptText(itemText);
        textSpan.style.flex = "1";

        // Aplica Estilos baseados no Estado
        if (isDone) {
            Object.assign(row.style, styles.itemCompleted);
            chk.style.background = activeColor;
            chk.style.borderColor = activeColor;
            chk.style.transform = "scale(1)"; // Estado normal após animação
            // Ícone Check SVG
            chk.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        } else {
            row.style.textDecoration = "none";
            row.style.opacity = "1";
            chk.style.background = "transparent";
            chk.style.borderColor = "#dadce0";
            chk.style.transform = "scale(1)";
            chk.innerHTML = "";
        }

        // Interação (Clique na Linha)
        row.onclick = () => {
            const newState = !csaCompletedTasks[key];
            csaCompletedTasks[key] = newState;

            // Feedback Tátil Imediato (Sem re-render total para manter a física)
            if (newState) {
                // Animação de Check "Pop"
                chk.style.transform = "scale(1.2)";
                setTimeout(() => chk.style.transform = "scale(1)", 150);
                
                // Atualiza visual da linha
                Object.assign(row.style, styles.itemCompleted);
                chk.style.background = activeColor;
                chk.style.borderColor = activeColor;
                chk.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            } else {
                // Uncheck
                row.style.textDecoration = "none";
                row.style.opacity = "1";
                chk.style.background = "transparent";
                chk.style.borderColor = "#dadce0";
                chk.innerHTML = "";
            }

            // Atualiza Lógica Global (Progresso e Contadores)
            // Fazemos um 'mini-update' em vez de re-renderizar tudo para não perder o foco
            updateProgressAndCounters(combinedKey, data);
        };

        // Hover
        row.onmouseenter = () => { 
            if(!csaCompletedTasks[key]) {
                row.style.background = "#f1f3f4"; 
                chk.style.borderColor = activeColor; // Cor ao passar o mouse
            }
        };
        row.onmouseleave = () => { 
            if(!csaCompletedTasks[key]) {
                row.style.background = "transparent"; 
                chk.style.borderColor = "#dadce0";
            }
        };

        row.appendChild(chk);
        row.appendChild(textSpan);
        card.appendChild(row);
      });

      // Status Visual do Card (Borda Lateral)
      if (groupDoneCount === items.length && items.length > 0) {
          counter.style.color = "#1e8e3e";
          counter.style.background = "#e6f4ea";
          card.style.boxShadow = "inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)";
      }

      counter.textContent = `${groupDoneCount}/${items.length}`;
      csaChecklistArea.appendChild(card);
    });

    // Atualiza Barra (Inicial)
    updateProgressUI(totalItems, completedItems);
  }

  // Função Auxiliar para atualizar UI sem destruir DOM
  function updateProgressAndCounters(combinedKey, data) {
      let total = 0;
      let completed = 0;
      
      ["inicio", "fim"].forEach(groupKey => {
          const items = data[groupKey] || [];
          total += items.length;
          
          let groupDone = 0;
          items.forEach((_, idx) => {
              if (csaCompletedTasks[`${combinedKey}-${groupKey}-${idx}`]) {
                  completed++;
                  groupDone++;
              }
          });

          // Atualiza contador do card específico via DOM ID
          // (Nota: Isso exige que a gente tenha referências, mas o re-render 
          // é rápido o suficiente se a lista for pequena. Para "Apple Feel",
          // vamos apenas atualizar a barra de progresso aqui).
      });

      updateProgressUI(total, completed);
      
      // Nota: Para os contadores de card (2/5) atualizarem, 
      // precisaríamos selecioná-los. Se preferir 100% de precisão visual,
      // chame csaBuildChecklist() no onclick, mas perde a animação do scale(1.2).
      // SOLUÇÃO HÍBRIDA: A animação visual já aconteceu no onclick. 
      // Agora chamamos o rebuild depois de um delay imperceptível.
      setTimeout(() => csaBuildChecklist(), 200);
  }

  function updateProgressUI(total, completed) {
    const pct = total === 0 ? 0 : (completed / total) * 100;
    progressFill.style.width = `${pct}%`;
    
    if (pct === 100) {
        progressFill.style.background = "#34A853";
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