// src/modules/quick-email/quick-email-assistant.js

import {
  stylePopup,
  styleCredit,
} from "../shared/utils.js";

import { createStandardHeader } from "../shared/header-factory.js"; 
import { toggleGenieAnimation } from '../shared/animations.js';
import { QUICK_EMAILS } from "./quick-email-data.js";
import { runQuickEmail } from "../email/email-automation.js";

export function initQuickEmailAssistant() {
  const CURRENT_VERSION = "v2.9.7";

  // --- ESTADO ---
  let activeCategory = Object.keys(QUICK_EMAILS)[0];
  let searchTerm = "";

  // --- 1. ESTILOS LOCAIS REFINADOS ---
  
  // Busca (Google Input Style)
  const styleSearchInput = {
    width: "100%", padding: "12px 12px 12px 40px", 
    borderRadius: "8px", border: "1px solid #dadce0", background: "#f1f3f4",
    fontSize: "14px", color: "#202124", boxSizing: "border-box", outline: "none",
    transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
    backgroundRepeat: "no-repeat", backgroundPosition: "12px center",
  };

  // Chips (Pílulas)
  const styleChipContainer = {
    display: "flex", gap: "8px", overflowX: "auto",
    padding: "4px 4px 12px 4px", marginBottom: "4px", scrollbarWidth: "none",
  };

  const styleChip = {
    padding: "6px 14px", borderRadius: "18px", border: "1px solid #dadce0",
    background: "#ffffff", color: "#5f6368", fontSize: "13px", fontWeight: "500",
    cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s ease", userSelect: "none",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)" 
  };

  const styleChipActive = {
    background: "#e8f0fe", color: "#1967d2", borderColor: "#1967d2",
    boxShadow: "0 1px 3px rgba(26, 115, 232, 0.2)"
  };

  // Linha Principal
  const styleRow = {
    display: "flex", flexDirection: "column", marginBottom: "8px",
    position: "relative", background: "transparent",
  };

  // Wrapper do Split Button (Une Texto e Olho)
  const styleButtonWrapper = {
    display: "flex", flexDirection: "row", alignItems: "stretch", width: "100%",
    boxShadow: "0 1px 3px rgba(60,64,67, 0.1), 0 2px 8px rgba(60,64,67, 0.05)", 
    borderRadius: "8px", background: "#fff", transition: "box-shadow 0.2s ease",
  };

  // Botão Ação (Esquerda)
  const styleActionBtn = {
    flexGrow: "1", display: "flex", alignItems: "center", justifyContent: "flex-start",
    textAlign: "left", padding: "12px 16px",
    background: "transparent", border: "1px solid #dadce0", borderRight: "none",
    borderRadius: "8px 0 0 8px", cursor: "pointer",
    color: "#3c4043", fontSize: "14px", fontWeight: "500",
    transition: "background 0.1s linear", zIndex: "2",
  };

  // Botão Preview (Direita)
  const stylePreviewBtn = {
    width: "48px", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#f8f9fa", border: "1px solid #dadce0", borderLeft: "1px solid #f1f3f4",
    borderRadius: "0 8px 8px 0", cursor: "pointer",
    color: "#5f6368", transition: "all 0.2s ease", zIndex: "2", flexShrink: "0"
  };

  // Card de Preview (Expandível)
  const stylePreviewCard = {
    width: "100%", maxHeight: "0", opacity: "0", overflow: "hidden",
    background: "#ffffff", border: "1px solid #dadce0", borderTop: "none",
    borderRadius: "0 0 8px 8px", marginTop: "-4px", padding: "0 16px",
    fontSize: "13px", color: "#3c4043", lineHeight: "1.6", boxSizing: "border-box",
    transition: "all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)", 
    zIndex: "1", position: "relative",
    boxShadow: "inset 0 4px 6px -4px rgba(0,0,0,0.1)"
  };

  // --- CRIAÇÃO DO POPUP ---
  let visible = false;
  const popup = document.createElement("div");
  popup.id = "quick-email-popup";
  Object.assign(popup.style, stylePopup, { 
      right: "100px", width: "400px",
      boxShadow: "none", opacity: "0", pointerEvents: "none" 
  });

  const animRefs = { popup, googleLine: null, focusElement: null };

  // Função Toggle
  function toggleVisibility() {
      visible = !visible;
      toggleGenieAnimation(visible, popup, 'cw-btn-email'); 
  }

  // 1. Header
  const header = createStandardHeader(
    popup, "Emails Rápidos", CURRENT_VERSION,
    "Templates prontos. Clique na linha para inserir, ou no olho para ver.",
    animRefs, () => toggleVisibility()
  );

  // 2. Toolbar
  const toolbar = document.createElement("div");
  Object.assign(toolbar.style, {
    padding: "16px", display: "flex", flexDirection: "column", gap: "12px",
    borderBottom: "1px solid #f1f3f4", flexShrink: "0", backgroundColor: "#fff",
  });

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Filtrar emails...";
  Object.assign(searchInput.style, styleSearchInput);
  
  // Foco visual no input
  searchInput.onfocus = () => { searchInput.style.background = "#fff"; searchInput.style.borderColor = "#1a73e8"; searchInput.style.boxShadow = "0 1px 4px rgba(26,115,232,0.2)"; };
  searchInput.onblur = () => { searchInput.style.background = "#f1f3f4"; searchInput.style.borderColor = "#dadce0"; searchInput.style.boxShadow = "none"; };
  
  animRefs.focusElement = searchInput;

  const tabsContainer = document.createElement("div");
  Object.assign(tabsContainer.style, styleChipContainer);

  toolbar.appendChild(searchInput);
  toolbar.appendChild(tabsContainer);

  popup.appendChild(header);
  popup.appendChild(toolbar);

  // 3. Área de Conteúdo
  const contentArea = document.createElement("div");
  Object.assign(contentArea.style, {
    padding: "16px", overflowY: "auto", flexGrow: "1", position: "relative",
  });
  popup.appendChild(contentArea);

  // 4. Footer
  const footer = document.createElement("div");
  Object.assign(footer.style, {
    padding: "8px 16px", borderTop: "1px solid #eee", textAlign: "center",
    fontSize: "10px", color: "#9aa0a6",
  });
  footer.textContent = "created by lucaste@";
  popup.appendChild(footer);

  document.body.appendChild(popup);

  // --- RENDERIZAÇÃO ---

  function renderTabs() {
    tabsContainer.innerHTML = "";
    Object.keys(QUICK_EMAILS).forEach((catKey) => {
      const catData = QUICK_EMAILS[catKey];
      const chip = document.createElement("div");
      chip.textContent = catData.title;
      Object.assign(chip.style, styleChip);
      
      if (activeCategory === catKey && searchTerm === "") {
        Object.assign(chip.style, styleChipActive);
      }
      
      chip.onmouseover = () => { if(activeCategory !== catKey) chip.style.background = "#f1f3f4"; };
      chip.onmouseout = () => { if(activeCategory !== catKey) chip.style.background = "#fff"; };
      
      chip.onclick = () => {
        activeCategory = catKey;
        searchTerm = "";
        searchInput.value = "";
        renderTabs();
        renderEmailList();
      };
      tabsContainer.appendChild(chip);
    });
  }

  function renderEmailList() {
    contentArea.innerHTML = "";
    let emailsToShow = [];

    if (searchTerm.trim() !== "") {
      Object.values(QUICK_EMAILS).forEach((cat) => {
        const found = cat.emails.filter((e) =>
          e.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        emailsToShow = [...emailsToShow, ...found];
      });
    } else {
      if (QUICK_EMAILS[activeCategory]) {
        emailsToShow = QUICK_EMAILS[activeCategory].emails;
      }
    }

    if (emailsToShow.length === 0) {
      contentArea.innerHTML = `<div style="text-align:center; padding:30px; color:#9aa0a6; fontSize:13px">Nenhum email encontrado.</div>`;
      return;
    }

    const iconEye = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const iconSend = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

    emailsToShow.forEach((email) => {
      const row = document.createElement("div");
      Object.assign(row.style, styleRow);

      // Wrapper para alinhar Botão e Olho
      const btnWrapper = document.createElement("div");
      Object.assign(btnWrapper.style, styleButtonWrapper);

      // Botão de Ação (Texto)
      const actionBtn = document.createElement("div");
      Object.assign(actionBtn.style, styleActionBtn);
      
      const shortDesc = email.subject.length > 40 ? email.subject.substring(0, 40) + "..." : email.subject;

      actionBtn.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px; color:#202124; font-weight:500; fontSize:13px;">
              <span style="color:#1a73e8; display:flex;">${iconSend}</span> ${email.name}
          </div>
          <div style="color:#5f6368; font-size:11px; padding-left:24px; margin-top:2px;">${shortDesc}</div>
      `;

      actionBtn.onmouseenter = () => { if(!row.classList.contains('expanded')) actionBtn.style.background = "#f8f9fa"; };
      actionBtn.onmouseleave = () => { if(!row.classList.contains('expanded')) actionBtn.style.background = "transparent"; };
      
      actionBtn.onclick = () => {
        // Feedback Visual Rápido
        actionBtn.style.background = "#e8f0fe";
        setTimeout(() => actionBtn.style.background = "transparent", 200);
        runQuickEmail(email);
        toggleVisibility(); // Fecha após inserir
      };

      // Botão de Preview (Olho)
      const previewBtn = document.createElement("div");
      previewBtn.innerHTML = iconEye;
      Object.assign(previewBtn.style, stylePreviewBtn);

      previewBtn.onmouseenter = () => { previewBtn.style.background = "#e8eaed"; previewBtn.style.color = "#202124"; };
      previewBtn.onmouseleave = () => { 
          if (!row.classList.contains('expanded')) {
              previewBtn.style.background = "#f8f9fa"; previewBtn.style.color = "#5f6368"; 
          }
      };

      previewBtn.onclick = (e) => {
        e.stopPropagation();
        
        // Fecha outros abertos
        const allOpenRows = contentArea.querySelectorAll(".expanded");
        allOpenRows.forEach((r) => {
            if (r !== row) {
                const closeBtn = r.querySelector('.preview-btn-ref'); // Usamos classe ref
                if(closeBtn) closeBtn.click(); // Simula clique para fechar
            }
        });

        const existingCard = row.querySelector(".preview-card");
        
        if (existingCard) {
          // Fechar
          existingCard.style.maxHeight = "0";
          existingCard.style.opacity = "0";
          existingCard.style.padding = "0";
          row.classList.remove("expanded");
          
          // Reseta estilos
          previewBtn.style.background = "#f8f9fa";
          previewBtn.style.color = "#5f6368";
          actionBtn.style.background = "transparent";
          
          // Remove bordas arredondadas especiais
          btnWrapper.style.boxShadow = "0 1px 3px rgba(60,64,67, 0.1), 0 2px 8px rgba(60,64,67, 0.05)";
          
          setTimeout(() => existingCard.remove(), 300);
        } else {
          // Abrir
          row.classList.add("expanded");
          previewBtn.style.background = "#e8f0fe";
          previewBtn.style.color = "#1a73e8";
          actionBtn.style.background = "#f8f9fa"; // Leve destaque no texto também
          
          // Eleva o wrapper
          btnWrapper.style.boxShadow = "0 4px 12px rgba(60,64,67, 0.15)";
          
          // Ajusta bordas para conectar com o card
          actionBtn.style.borderRadius = "8px 0 0 0";
          previewBtn.style.borderRadius = "0 8px 0 0";
          btnWrapper.style.borderRadius = "8px 8px 0 0"; // O wrapper também precisa mudar

          const card = document.createElement("div");
          card.className = "preview-card";
          Object.assign(card.style, stylePreviewCard);
          
          card.innerHTML = `
            <div style="padding: 16px;">
                <div style="font-weight:600; margin-bottom:4px; color:#1a73e8; font-size:11px; text-transform:uppercase;">Assunto</div>
                <div style="margin-bottom:12px; color:#202124; font-size:13px; font-weight:500;">${email.subject}</div>
                <div style="font-weight:600; margin-bottom:4px; color:#1a73e8; font-size:11px; text-transform:uppercase; border-top:1px solid #eee; padding-top:8px;">Conteúdo</div>
                <div style="color:#3c4043; font-size:12px; line-height:1.5; white-space: pre-wrap;">${email.body.replace(/</g, "&lt;").substring(0, 300)}...</div>
            </div>
          `;
          row.appendChild(card);
          
          requestAnimationFrame(() => {
            card.style.maxHeight = "500px";
            card.style.opacity = "1";
          });
        }
      };
      
      // Adiciona classe de referência para lógica de fechar outros
      previewBtn.classList.add('preview-btn-ref');

      btnWrapper.appendChild(actionBtn);
      btnWrapper.appendChild(previewBtn);
      
      row.appendChild(btnWrapper);
      contentArea.appendChild(row);
    });
  }

  // Listeners
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    if (searchTerm !== "") {
      Array.from(tabsContainer.children).forEach((child) => {
        Object.assign(child.style, styleChip); // Reseta estilo de ativo
      });
    } else {
      renderTabs();
    }
    renderEmailList();
  });

  renderTabs();
  renderEmailList();

  return toggleVisibility;
}