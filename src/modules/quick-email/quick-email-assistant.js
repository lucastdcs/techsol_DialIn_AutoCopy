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
  const CURRENT_VERSION = "v4.0.0"; // Versão Master-Detail UI

  // --- ESTADO ---
  let activeCategory = Object.keys(QUICK_EMAILS)[0];
  let searchTerm = "";
  let currentView = 'list'; // 'list' ou 'detail'

  // --- 1. ESTILOS ---
  
  const styleContainer = {
      display: "flex", flexDirection: "column", height: "100%", position: "relative", overflow: "hidden"
  };

  // Navigation View (O container que desliza)
  const styleNavView = {
      display: "flex", width: "200%", height: "100%", // 2x a largura para caber as duas telas
      transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)", // Apple Spring
      transform: "translateX(0)"
  };

  const styleViewPage = {
      width: "50%", height: "100%", display: "flex", flexDirection: "column",
      overflow: "hidden" // Scroll interno
  };

  // Busca (Google Style)
  const styleSearchInput = {
    width: "100%", padding: "12px 12px 12px 44px", 
    borderRadius: "12px", border: "none", background: "#F0F2F5",
    fontSize: "14px", color: "#202124", boxSizing: "border-box", outline: "none",
    transition: "all 0.2s ease",
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
    backgroundRepeat: "no-repeat", backgroundPosition: "14px center",
  };

  // Categorias (Segmented Control)
  const styleTabs = {
      display: "flex", gap: "8px", padding: "0 4px 12px 4px", 
      overflowX: "auto", scrollbarWidth: "none"
  };
  
  const styleTabBtn = {
      padding: "8px 16px", borderRadius: "20px", border: "1px solid transparent",
      background: "transparent", color: "#5f6368", fontSize: "13px", fontWeight: "500",
      cursor: "pointer", transition: "all 0.2s ease", flexShrink: "0"
  };

  const styleTabActive = {
      background: "#E8F0FE", color: "#1967D2", fontWeight: "600"
  };

  // Lista de Emails (Cards Interativos)
  const styleEmailRow = {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px", marginBottom: "8px", borderRadius: "12px",
      background: "#fff", border: "1px solid #dadce0",
      cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
      position: "relative", overflow: "hidden"
  };

  // Visualização de Detalhe (Leitura)
  const styleDetailHeader = {
      padding: "10px 0 20px 0", display: "flex", alignItems: "center", gap: "12px",
      borderBottom: "1px solid #f1f3f4", marginBottom: "16px", flexShrink: "0"
  };

  const styleBackBtn = {
      background: "transparent", border: "none", cursor: "pointer", 
      color: "#1a73e8", display: "flex", alignItems: "center", gap: "4px",
      fontSize: "14px", fontWeight: "500", padding: "8px 0"
  };

  // --- CRIAÇÃO DO POPUP ---
  let visible = false;
  const popup = document.createElement("div");
  popup.id = "quick-email-popup";
  
  // Tamanho Confortável para Leitura
  Object.assign(popup.style, stylePopup, { 
      right: "100px", width: "480px", height: "600px", // Altura fixa para o scroll funcionar bem
      boxShadow: "none", opacity: "0", pointerEvents: "none" 
  });

  const animRefs = { popup, googleLine: null, focusElement: null };

  function toggleVisibility() {
      visible = !visible;
      toggleGenieAnimation(visible, popup, 'cw-btn-email'); 
      // Reseta para a lista ao fechar
      if(!visible) setTimeout(() => showListView(), 300);
  }

  // HEADER
  const header = createStandardHeader(
    popup, "Emails Rápidos", CURRENT_VERSION,
    "Selecione, visualize e insira com um clique.",
    animRefs, () => toggleVisibility()
  );

  // CONTAINER PRINCIPAL (View Slider)
  const mainContainer = document.createElement("div");
  Object.assign(mainContainer.style, styleContainer);

  const slider = document.createElement("div");
  Object.assign(slider.style, styleNavView);

  // --- PÁGINA 1: LISTA ---
  const pageList = document.createElement("div");
  Object.assign(pageList.style, styleViewPage);

  const toolbar = document.createElement("div");
  Object.assign(toolbar.style, { padding: "20px 20px 0 20px", flexShrink: "0", background: "#fff", zIndex: "10" });

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Buscar template...";
  Object.assign(searchInput.style, styleSearchInput);
  searchInput.onfocus = () => { searchInput.style.background = "#fff"; searchInput.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"; };
  searchInput.onblur = () => { searchInput.style.background = "#F0F2F5"; searchInput.style.boxShadow = "none"; };
  
  animRefs.focusElement = searchInput;

  const tabsContainer = document.createElement("div");
  Object.assign(tabsContainer.style, styleTabs);

  const listContent = document.createElement("div");
  Object.assign(listContent.style, { padding: "0 20px 20px 20px", overflowY: "auto", flexGrow: "1" });

  toolbar.appendChild(searchInput);
  toolbar.appendChild(tabsContainer);
  pageList.appendChild(toolbar);
  pageList.appendChild(listContent);

  // --- PÁGINA 2: DETALHE (PREVIEW) ---
  const pageDetail = document.createElement("div");
  Object.assign(pageDetail.style, styleViewPage);
  
  const detailContent = document.createElement("div");
  Object.assign(detailContent.style, { padding: "20px", overflowY: "auto", flexGrow: "1", background: "#fff" });

  pageDetail.appendChild(detailContent);

  // Montagem
  slider.appendChild(pageList);
  slider.appendChild(pageDetail);
  mainContainer.appendChild(slider);
  popup.appendChild(header);
  popup.appendChild(mainContainer);

  // Footer Fixo
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
      slider.style.transform = "translateX(-50%)"; // Desliza para a esquerda

      // Renderiza o detalhe
      const iconBack = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
      
      detailContent.innerHTML = `
        <div style="display:flex; align-items:center; border-bottom:1px solid #eee; padding-bottom:16px; margin-bottom:20px;">
            <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; align-items:center; color:#5f6368; padding:8px; margin-left:-8px; border-radius:50%; transition:background 0.2s;">
                ${iconBack}
            </button>
            <div style="font-size:16px; font-weight:600; color:#202124; margin-left:8px;">${email.name}</div>
        </div>

        <div style="background:#f8f9fa; border:1px solid #dadce0; border-radius:8px; padding:20px;">
            <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
            <div style="font-size:14px; font-weight:500; color:#202124; margin-bottom:24px;">${email.subject}</div>
            
            <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px; border-top:1px solid #e0e0e0; padding-top:16px;">Mensagem</div>
            <div style="font-size:14px; line-height:1.6; color:#3c4043; white-space: pre-wrap;">${email.body}</div>
        </div>

        <button id="csa-insert-btn" style="
            margin-top: 24px; width: 100%; padding: 12px; 
            background: #1a73e8; color: white; border: none; border-radius: 8px; 
            font-weight: 500; font-size: 14px; cursor: pointer; 
            box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
            transition: transform 0.1s;
        ">
            Inserir no Caso
        </button>
      `;

      // Eventos do Detalhe
      const backBtn = detailContent.querySelector('#csa-back-btn');
      backBtn.onmouseover = () => backBtn.style.backgroundColor = "#f1f3f4";
      backBtn.onmouseout = () => backBtn.style.backgroundColor = "transparent";
      backBtn.onclick = showListView;

      const insertBtn = detailContent.querySelector('#csa-insert-btn');
      insertBtn.onclick = () => {
          insertBtn.style.transform = "scale(0.98)";
          runQuickEmail(email);
          toggleVisibility(); // Fecha tudo
          setTimeout(() => {
              insertBtn.style.transform = "scale(1)";
              showListView(); // Reseta p/ próxima vez
          }, 300);
      };
  }

  function showListView() {
      currentView = 'list';
      slider.style.transform = "translateX(0)"; // Desliza de volta
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

    const iconSend = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
    const iconEye = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;

    emailsToShow.forEach((email) => {
      const row = document.createElement("div");
      Object.assign(row.style, styleEmailRow);
      
      const shortDesc = email.subject.length > 60 ? email.subject.substring(0, 60) + "..." : email.subject;

      // Layout do Card: Título + Descrição + Ações
      row.innerHTML = `
        <div style="flex-grow: 1; margin-right: 12px;">
            <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:4px; display:flex; align-items:center; gap:8px;">
                ${email.name}
            </div>
            <div style="font-size:12px; color:#5f6368; line-height:1.4;">${shortDesc}</div>
        </div>
        <div style="display:flex; gap:4px;">
            <button class="action-btn view" title="Visualizar" style="width:36px; height:36px; border-radius:50%; border:none; background:#f1f3f4; color:#5f6368; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">
                ${iconEye}
            </button>
            <button class="action-btn send" title="Inserir Agora" style="width:36px; height:36px; border-radius:50%; border:none; background:#e8f0fe; color:#1a73e8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">
                ${iconSend}
            </button>
        </div>
      `;

      // Hover Efeito no Card
      row.onmouseenter = () => { 
          row.style.boxShadow = "0 4px 12px rgba(60,64,67,0.15)"; 
          row.style.transform = "translateY(-1px)";
          row.style.borderColor = "#1a73e8"; // Borda azul sutil
      };
      row.onmouseleave = () => { 
          row.style.boxShadow = "none"; 
          row.style.transform = "translateY(0)";
          row.style.borderColor = "#dadce0";
      };

      // Botão Ver (Abre Detalhe)
      const btnView = row.querySelector('.view');
      btnView.onclick = (e) => {
          e.stopPropagation();
          showDetailView(email);
      };
      btnView.onmouseenter = () => { btnView.style.background = "#d2e3fc"; btnView.style.color = "#174ea6"; };
      btnView.onmouseleave = () => { btnView.style.background = "#f1f3f4"; btnView.style.color = "#5f6368"; };

      // Botão Enviar (Ação Direta)
      const btnSend = row.querySelector('.send');
      btnSend.onclick = (e) => {
          e.stopPropagation();
          // Efeito Ripple Simples
          btnSend.style.transform = "scale(0.9)";
          setTimeout(() => btnSend.style.transform = "scale(1)", 150);
          
          runQuickEmail(email);
          toggleVisibility();
      };
      btnSend.onmouseenter = () => { btnSend.style.background = "#1a73e8"; btnSend.style.color = "#fff"; btnSend.style.boxShadow = "0 2px 6px rgba(26,115,232,0.3)"; };
      btnSend.onmouseleave = () => { btnSend.style.background = "#e8f0fe"; btnSend.style.color = "#1a73e8"; btnSend.style.boxShadow = "none"; };

      // Clique no Card todo (Padrão: Inserir ou Ver? Vamos deixar Ver como padrão para segurança)
      row.onclick = () => showDetailView(email);

      listContent.appendChild(row);
    });
  }

  // Setup
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    if (searchTerm !== "") {
       // Reseta estilo dos chips
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