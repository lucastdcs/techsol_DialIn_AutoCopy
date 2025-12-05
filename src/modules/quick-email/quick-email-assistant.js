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
  const CURRENT_VERSION = "v4.0.1"; // Spacing Polish

  // --- ESTADO ---
  let activeCategory = Object.keys(QUICK_EMAILS)[0];
  let searchTerm = "";
  let currentView = 'list'; 

  // =================================================================
  // 1. ESTILOS REFINADOS (Apple Rhythm)
  // =================================================================
  
  const styleContainer = {
      display: "flex", flexDirection: "column", height: "100%", position: "relative", overflow: "hidden"
  };

  const styleNavView = {
      display: "flex", width: "200%", height: "100%",
      transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
      transform: "translateX(0)"
  };

  const styleViewPage = {
      width: "50%", height: "100%", display: "flex", flexDirection: "column",
      overflow: "hidden"
  };

  // Busca (Mais compacta visualmente)
  const styleSearchInput = {
    width: "100%", padding: "10px 12px 10px 40px", 
    borderRadius: "10px", border: "none", background: "#F0F2F5",
    fontSize: "14px", color: "#202124", boxSizing: "border-box", outline: "none",
    transition: "all 0.2s ease",
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
    backgroundRepeat: "no-repeat", backgroundPosition: "12px center",
  };

  // Categorias (Pílulas mais baixas e largas)
  const styleTabs = {
      display: "flex", gap: "8px", padding: "0 4px 8px 4px", // Menos padding bottom
      overflowX: "auto", scrollbarWidth: "none"
  };
  
  const styleTabBtn = {
      padding: "6px 14px", borderRadius: "16px", border: "1px solid transparent",
      background: "transparent", color: "#5f6368", fontSize: "12px", fontWeight: "500",
      cursor: "pointer", transition: "all 0.2s ease", flexShrink: "0"
  };

  const styleTabActive = {
      background: "#E8F0FE", color: "#1967D2", fontWeight: "600"
  };

  // Lista de Emails (Densidade Confortável)
  const styleEmailRow = {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 16px", // Reduzi de 16px para 12px verticalmente
      marginBottom: "6px",  // Gap menor entre cards
      borderRadius: "12px",
      background: "#fff", border: "1px solid #dadce0",
      cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
      position: "relative", overflow: "hidden"
  };

  // --- CRIAÇÃO DO POPUP ---
  let visible = false;
  const popup = document.createElement("div");
  popup.id = "quick-email-popup";
  
  Object.assign(popup.style, stylePopup, { 
      right: "100px", width: "480px", height: "580px",
      boxShadow: "none", opacity: "0", pointerEvents: "none" 
  });

  const animRefs = { popup, googleLine: null, focusElement: null };

  function toggleVisibility() {
      visible = !visible;
      toggleGenieAnimation(visible, popup, 'cw-btn-email'); 
      if(!visible) setTimeout(() => showListView(), 300);
  }

  // HEADER
  const header = createStandardHeader(
    popup, "Emails Rápidos", CURRENT_VERSION,
    "Selecione, visualize e insira com um clique.",
    animRefs, () => toggleVisibility()
  );

  // CONTAINER PRINCIPAL
  const mainContainer = document.createElement("div");
  Object.assign(mainContainer.style, styleContainer);

  const slider = document.createElement("div");
  Object.assign(slider.style, styleNavView);

  // --- PÁGINA 1: LISTA ---
  const pageList = document.createElement("div");
  Object.assign(pageList.style, styleViewPage);

  // Toolbar mais compacta
  const toolbar = document.createElement("div");
  Object.assign(toolbar.style, { 
      padding: "16px 20px 4px 20px", // Topo maior, baixo menor (os chips dão o resto)
      flexShrink: "0", background: "#fff", zIndex: "10",
      display: "flex", flexDirection: "column", gap: "10px"
  });

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Buscar template...";
  Object.assign(searchInput.style, styleSearchInput);
  searchInput.onfocus = () => { searchInput.style.background = "#fff"; searchInput.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; };
  searchInput.onblur = () => { searchInput.style.background = "#F0F2F5"; searchInput.style.boxShadow = "none"; };
  
  animRefs.focusElement = searchInput;

  const tabsContainer = document.createElement("div");
  Object.assign(tabsContainer.style, styleTabs);

  const listContent = document.createElement("div");
  // Padding ajustado para o conteúdo não colar nas bordas
  Object.assign(listContent.style, { padding: "8px 20px 20px 20px", overflowY: "auto", flexGrow: "1" });

  toolbar.appendChild(searchInput);
  toolbar.appendChild(tabsContainer);
  pageList.appendChild(toolbar);
  pageList.appendChild(listContent);

  // --- PÁGINA 2: DETALHE (PREVIEW) ---
  const pageDetail = document.createElement("div");
  Object.assign(pageDetail.style, styleViewPage);
  
  const detailContent = document.createElement("div");
  Object.assign(detailContent.style, { padding: "0", overflowY: "auto", flexGrow: "1", background: "#fff" });

  pageDetail.appendChild(detailContent);

  // Montagem
  slider.appendChild(pageList);
  slider.appendChild(pageDetail);
  mainContainer.appendChild(slider);
  popup.appendChild(header);
  popup.appendChild(mainContainer);

  // Footer
  const footer = document.createElement("div");
  Object.assign(footer.style, {
    padding: "8px 16px", borderTop: "1px solid #eee", textAlign: "center",
    fontSize: "10px", color: "#9aa0a6", background: "#fff", flexShrink: "0"
  });
  footer.textContent = "created by lucaste@";
  popup.appendChild(footer);

  document.body.appendChild(popup);

  // --- LÓGICA DE NAVEGAÇÃO ---

  function showDetailView(email) {
      currentView = 'detail';
      slider.style.transform = "translateX(-50%)"; 

      const iconBack = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
      const iconSendWhite = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
      
      // Layout do Detalhe: Mais estruturado e com menos "buracos"
      detailContent.innerHTML = `
        <div style="
            position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
            border-bottom: 1px solid #f1f3f4; padding: 12px 20px; z-index: 10;
            display: flex; align-items: center; gap: 8px;
        ">
            <button id="csa-back-btn" style="
                background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content: center;
                color:#5f6368; width: 32px; height: 32px; margin-left:-8px; border-radius:50%; transition:background 0.2s;
            ">
                ${iconBack}
            </button>
            <div style="font-size:15px; font-weight:600; color:#202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${email.name}
            </div>
        </div>

        <div style="padding: 20px;">
            <div style="margin-bottom: 20px;">
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Assunto</div>
                <div style="font-size:14px; font-weight:500; color:#202124; padding: 12px; background: #F8F9FA; border-radius: 8px; border: 1px solid #eee;">
                    ${email.subject}
                </div>
            </div>
            
            <div>
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Mensagem</div>
                <div style="font-size:14px; line-height:1.6; color:#3c4043; white-space: pre-wrap; padding: 0 4px;">${email.body}</div>
            </div>

            <div style="height: 80px;"></div>
        </div>

        <div style="
            position: absolute; bottom: 20px; left: 0; width: 100%; 
            padding: 0 20px; box-sizing: border-box; pointer-events: none;
        ">
            <button id="csa-insert-btn" style="
                pointer-events: auto;
                width: 100%; padding: 14px; 
                background: #1a73e8; color: white; border: none; border-radius: 12px; 
                font-weight: 600; font-size: 14px; cursor: pointer; 
                box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
                display: flex; align-items: center; justify-content: center; gap: 8px;
                transition: transform 0.1s, background 0.2s;
            ">
                ${iconSendWhite} Inserir Template
            </button>
        </div>
      `;

      const backBtn = detailContent.querySelector('#csa-back-btn');
      backBtn.onmouseover = () => backBtn.style.backgroundColor = "#f1f3f4";
      backBtn.onmouseout = () => backBtn.style.backgroundColor = "transparent";
      backBtn.onclick = showListView;

      const insertBtn = detailContent.querySelector('#csa-insert-btn');
      insertBtn.onmouseover = () => insertBtn.style.backgroundColor = "#174ea6";
      insertBtn.onmouseout = () => insertBtn.style.backgroundColor = "#1a73e8";
      insertBtn.onclick = () => {
          insertBtn.style.transform = "scale(0.96)";
          runQuickEmail(email);
          toggleVisibility();
          setTimeout(() => {
              insertBtn.style.transform = "scale(1)";
              showListView();
          }, 300);
      };
  }

  function showListView() {
      currentView = 'list';
      slider.style.transform = "translateX(0)"; 
  }

  // --- RENDERIZAÇÃO ---

  function renderTabs() {
    tabsContainer.innerHTML = "";
    Object.keys(QUICK_EMAILS).forEach((catKey) => {
      const catData = QUICK_EMAILS[catKey];
      const chip = document.createElement("button");
      chip.textContent = catData.title;
      Object.assign(chip.style, styleTabBtn);
      
      if (activeCategory === catKey && searchTerm === "") {
        Object.assign(chip.style, styleTabActive);
      }
      
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
    listContent.innerHTML = "";
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
      listContent.innerHTML = `<div style="text-align:center; padding:60px 20px; color:#9aa0a6;">
        <div style="font-size:24px; margin-bottom:8px;">🔍</div>
        <div style="font-size:14px;">Nenhum email encontrado.</div>
      </div>`;
      return;
    }

    const iconChevron = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DADCE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;

    emailsToShow.forEach((email) => {
      const row = document.createElement("div");
      Object.assign(row.style, styleEmailRow);
      
      const shortDesc = email.subject.length > 50 ? email.subject.substring(0, 50) + "..." : email.subject;

      row.innerHTML = `
        <div style="flex-grow: 1; margin-right: 12px; min-width: 0;">
            <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${email.name}
            </div>
            <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${shortDesc}</div>
        </div>
        <div style="flex-shrink: 0; color: #DADCE0;">
            ${iconChevron}
        </div>
      `;

      row.onmouseenter = () => { 
          row.style.background = "#F8F9FA";
          row.style.borderColor = "#1a73e8"; // Highlight sutil
          row.querySelector('svg').style.stroke = "#1a73e8"; // Acende a seta
      };
      row.onmouseleave = () => { 
          row.style.background = "#fff"; 
          row.style.borderColor = "#dadce0";
          row.querySelector('svg').style.stroke = "#DADCE0";
      };

      row.onclick = () => showDetailView(email);

      listContent.appendChild(row);
    });
  }

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    if (searchTerm !== "") {
       Array.from(tabsContainer.children).forEach(c => Object.assign(c.style, styleTabBtn));
    } else {
       renderTabs();
    }
    renderEmailList();
  });

  renderTabs();
  renderEmailList();

  return toggleVisibility;
}