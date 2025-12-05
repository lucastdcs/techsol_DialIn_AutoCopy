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
  const CURRENT_VERSION = "v3.1.0"; // Versão Scalable UI

  // --- ESTADO ---
  let activeCategory = Object.keys(QUICK_EMAILS)[0];
  let searchTerm = "";

  // --- 1. ESTILOS REFINADOS ---
  
  // Container de Filtros (Busca + Categoria)
  const styleFilterBar = {
      display: "flex", gap: "12px", padding: "16px 20px",
      borderBottom: "1px solid #f1f3f4", background: "#fff",
      alignItems: "center"
  };

  const styleSearchInput = {
    flexGrow: "1", padding: "10px 12px 10px 36px", 
    borderRadius: "8px", border: "1px solid #dadce0", background: "#f1f3f4",
    fontSize: "14px", color: "#202124", boxSizing: "border-box", outline: "none",
    transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
    backgroundRepeat: "no-repeat", backgroundPosition: "10px center",
  };

  // Select de Categoria (Substitui os Chips para Escalabilidade)
  const styleCategorySelect = {
      width: "160px", padding: "10px 32px 10px 12px",
      borderRadius: "8px", border: "1px solid #dadce0", background: "#fff",
      fontSize: "13px", fontWeight: "500", color: "#3c4043", cursor: "pointer",
      outline: "none", appearance: "none", // Remove estilo nativo
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')`,
      backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center",
      transition: "background 0.2s ease, border-color 0.2s ease",
      flexShrink: "0"
  };

  const styleRow = {
    display: "flex", flexDirection: "column", marginBottom: "12px",
    position: "relative", background: "transparent",
  };

  const styleButtonWrapper = {
    display: "flex", flexDirection: "row", alignItems: "stretch", width: "100%",
    boxShadow: "0 1px 3px rgba(60,64,67, 0.1), 0 2px 8px rgba(60,64,67, 0.05)", 
    borderRadius: "8px", background: "#fff", 
    // Transição suave para a borda voltar a ser redonda
    transition: "box-shadow 0.2s ease, border-radius 0.3s ease", 
    overflow: "hidden", zIndex: "2"
  };

  const styleActionBtn = {
    flexGrow: "1", display: "flex", flexDirection: "column", 
    justifyContent: "center", alignItems: "flex-start",
    textAlign: "left", padding: "14px 16px",
    background: "transparent", border: "1px solid #dadce0", borderRight: "none",
    // Removemos border-radius fixo aqui, quem manda é o Wrapper
    cursor: "pointer", color: "#3c4043", 
    fontSize: "14px", fontWeight: "500",
    transition: "background 0.1s linear", 
  };

  const stylePreviewBtn = {
    width: "52px", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#f8f9fa", border: "1px solid #dadce0", borderLeft: "1px solid #f1f3f4",
    cursor: "pointer", color: "#5f6368", 
    transition: "all 0.2s ease", flexShrink: "0"
  };

  const stylePreviewCard = {
    width: "100%", maxHeight: "0", opacity: "0", overflow: "hidden",
    background: "#ffffff", border: "1px solid #dadce0", borderTop: "none",
    borderRadius: "0 0 8px 8px", marginTop: "-1px", padding: "0 20px",
    fontSize: "13px", color: "#3c4043", lineHeight: "1.6", boxSizing: "border-box",
    transition: "all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)", 
    zIndex: "1", position: "relative",
    boxShadow: "inset 0 4px 6px -4px rgba(0,0,0,0.1)",
    whiteSpace: "normal", wordWrap: "break-word"
  };

  // --- CRIAÇÃO DO POPUP ---
  let visible = false;
  const popup = document.createElement("div");
  popup.id = "quick-email-popup";
  
  // LARGURA AUMENTADA PARA 500PX (Mais conforto)
  Object.assign(popup.style, stylePopup, { 
      right: "100px", width: "500px",
      boxShadow: "none", opacity: "0", pointerEvents: "none" 
  });

  const animRefs = { popup, googleLine: null, focusElement: null };

  function toggleVisibility() {
      visible = !visible;
      toggleGenieAnimation(visible, popup, 'cw-btn-email'); 
  }

  // 1. Header
  const header = createStandardHeader(
    popup, "Emails Rápidos", CURRENT_VERSION,
    "Selecione a categoria no dropdown e filtre. Clique na linha para inserir.",
    animRefs, () => toggleVisibility()
  );

  // 2. Toolbar (Layout Novo: Search + Select)
  const toolbar = document.createElement("div");
  Object.assign(toolbar.style, styleFilterBar);

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Buscar template...";
  Object.assign(searchInput.style, styleSearchInput);
  
  searchInput.onfocus = () => { searchInput.style.background = "#fff"; searchInput.style.borderColor = "#1a73e8"; };
  searchInput.onblur = () => { searchInput.style.background = "#f1f3f4"; searchInput.style.borderColor = "#dadce0"; };
  animRefs.focusElement = searchInput;

  // Dropdown de Categorias (Escalável)
  const categorySelect = document.createElement("select");
  Object.assign(categorySelect.style, styleCategorySelect);
  
  categorySelect.onmouseenter = () => categorySelect.style.background = "#f8f9fa";
  categorySelect.onmouseleave = () => categorySelect.style.background = "#fff";
  categorySelect.onchange = (e) => {
      activeCategory = e.target.value;
      searchTerm = "";
      searchInput.value = "";
      renderEmailList();
  };

  toolbar.appendChild(searchInput);
  toolbar.appendChild(categorySelect);

  popup.appendChild(header);
  popup.appendChild(toolbar);

  // 3. Conteúdo
  const contentArea = document.createElement("div");
  Object.assign(contentArea.style, {
    padding: "20px", overflowY: "auto", flexGrow: "1", position: "relative",
    // Fundo levemente cinza para destacar os cartões brancos
    background: "#FAFAFA" 
  });
  popup.appendChild(contentArea);

  // 4. Footer
  const footer = document.createElement("div");
  Object.assign(footer.style, {
    padding: "12px 16px", borderTop: "1px solid #eee", textAlign: "center",
    fontSize: "11px", color: "#9aa0a6", background: "#fff"
  });
  footer.textContent = "created by lucaste@";
  popup.appendChild(footer);

  document.body.appendChild(popup);

  // --- RENDERIZAÇÃO ---

  function renderCategories() {
    categorySelect.innerHTML = "";
    Object.keys(QUICK_EMAILS).forEach((catKey) => {
        const option = document.createElement("option");
        option.value = catKey;
        option.textContent = QUICK_EMAILS[catKey].title;
        categorySelect.appendChild(option);
    });
    categorySelect.value = activeCategory;
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
      contentArea.innerHTML = `<div style="text-align:center; padding:40px 20px; color:#9aa0a6; fontSize:14px">Nenhum template encontrado.</div>`;
      return;
    }

    const iconEye = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const iconSend = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

    emailsToShow.forEach((email) => {
      const row = document.createElement("div");
      Object.assign(row.style, styleRow);

      const btnWrapper = document.createElement("div");
      Object.assign(btnWrapper.style, styleButtonWrapper);

      const actionBtn = document.createElement("div");
      Object.assign(actionBtn.style, styleActionBtn);
      
      const shortDesc = email.subject.length > 55 ? email.subject.substring(0, 55) + "..." : email.subject;

      actionBtn.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px; color:#202124; font-weight:600; fontSize:14px; margin-bottom: 2px;">
              <span style="color:#1a73e8; display:flex;">${iconSend}</span> ${email.name}
          </div>
          <div style="color:#5f6368; font-size:12px; padding-left:24px;">${shortDesc}</div>
      `;

      actionBtn.onmouseenter = () => { if(!row.classList.contains('expanded')) actionBtn.style.background = "#f8f9fa"; };
      actionBtn.onmouseleave = () => { if(!row.classList.contains('expanded')) actionBtn.style.background = "transparent"; };
      
      actionBtn.onclick = () => {
        actionBtn.style.background = "#e8f0fe";
        setTimeout(() => actionBtn.style.background = "transparent", 200);
        runQuickEmail(email);
        toggleVisibility();
      };

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
        
        // Fecha outros
        const allOpenRows = contentArea.querySelectorAll(".expanded");
        allOpenRows.forEach((r) => {
            if (r !== row) {
                const closeBtn = r.querySelector('.preview-btn-ref');
                if(closeBtn) closeBtn.click();
            }
        });

        const existingCard = row.querySelector(".preview-card");
        
        if (existingCard) {
          // FECHAR (Animação de saída)
          existingCard.style.maxHeight = "0";
          existingCard.style.opacity = "0";
          existingCard.style.padding = "0 20px";
          row.classList.remove("expanded");
          
          previewBtn.style.background = "#f8f9fa";
          previewBtn.style.color = "#5f6368";
          actionBtn.style.background = "transparent";
          btnWrapper.style.boxShadow = "0 1px 3px rgba(60,64,67, 0.1), 0 2px 8px rgba(60,64,67, 0.05)";
          
          // AQUI ESTÁ O FIX DA BORDA QUADRADA:
          // Só arredonda de volta quando a animação do card terminar (300ms)
          // Isso evita que a borda "pule" antes do card sumir
          setTimeout(() => {
             btnWrapper.style.borderRadius = "8px"; 
             existingCard.remove();
          }, 300);

        } else {
          // ABRIR
          row.classList.add("expanded");
          previewBtn.style.background = "#e8f0fe";
          previewBtn.style.color = "#1a73e8";
          actionBtn.style.background = "#f8f9fa";
          
          btnWrapper.style.boxShadow = "0 4px 12px rgba(60,64,67, 0.15)";
          
          // Deixa quadrado embaixo IMEDIATAMENTE para conectar com o card
          btnWrapper.style.borderRadius = "8px 8px 0 0";

          const card = document.createElement("div");
          card.className = "preview-card";
          Object.assign(card.style, stylePreviewCard);
          
          card.innerHTML = `
            <div style="padding: 20px 0;">
                <div style="font-weight:600; margin-bottom:4px; color:#1a73e8; font-size:11px; text-transform:uppercase;">Assunto</div>
                <div style="margin-bottom:16px; color:#202124; font-size:14px; font-weight:500;">${email.subject}</div>
                
                <div style="font-weight:600; margin-bottom:8px; color:#1a73e8; font-size:11px; text-transform:uppercase; border-top:1px solid #eee; padding-top:12px;">Conteúdo</div>
                
                <div style="color:#3c4043; font-size:13px; line-height:1.6; background:#f8f9fa; padding:12px; border-radius:8px; border:1px solid #eee;">
                    ${email.body}
                </div>
            </div>
          `;
          row.appendChild(card);
          
          requestAnimationFrame(() => {
            // max-height grande para garantir que mostre tudo
            card.style.maxHeight = "1000px"; 
            card.style.opacity = "1";
          });
        }
      };
      
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
    // Se buscar, libera filtro de categoria visualmente
    renderEmailList();
  });

  renderCategories();
  renderEmailList();

  return toggleVisibility;
}