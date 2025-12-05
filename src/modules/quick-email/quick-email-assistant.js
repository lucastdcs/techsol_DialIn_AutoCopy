// src/modules/quick-email/quick-email-assistant.js

import {
  makeDraggable,
  stylePopup,
  stylePopupHeader,
  stylePopupTitle,
  stylePopupCloseBtn,
  stylePopupVersion,
  styleCredit,
} from "../shared/utils.js";

import { createStandardHeader } from "../shared/header-factory.js"; // <--- IMPORTANTE
import { toggleGenieAnimation } from '../shared/animations.js';
import { QUICK_EMAILS } from "./quick-email-data.js";
import { runQuickEmail } from "../email/email-automation.js";

export function initQuickEmailAssistant() {
  const CURRENT_VERSION = "v2.9.6";

  // --- ESTADO ---
  let activeCategory = Object.keys(QUICK_EMAILS)[0];
  let searchTerm = "";

  // --- ESTILOS LOCAIS ---
 // --- 1. BUSCA (Estilo Material Input) ---
// 1. O WRAPPER (Garante que os dois botões fiquem lado a lado na mesma altura)
  const styleButtonWrapper = {
    display: "flex",
    flexDirection: "row", // Lado a lado
    alignItems: "stretch", // Força o botão de texto e o de olho a terem a mesma altura
    width: "100%",
    boxShadow: "0 1px 3px rgba(60,64,67, 0.1), 0 2px 8px rgba(60,64,67, 0.05)",
    borderRadius: "8px",
    transition: "box-shadow 0.2s ease",
    background: "#fff", // Fundo base
  };

  // 2. O BOTÃO DE TEXTO (Esquerda)
  const styleActionBtn = {
    flexGrow: "1",         // Ocupa todo o espaço restante
    display: "flex",       // Transforma o interior em Flex
    alignItems: "center",  // <--- O SEGREDO: Centraliza o texto verticalmente
    justifyContent: "flex-start", // Alinha texto à esquerda
    textAlign: "left",
    padding: "12px 16px",  // Padding confortável
    
    background: "transparent", // Transparente para não cobrir o wrapper (ou #fff)
    border: "1px solid #dadce0",
    borderRight: "none",   // Sem borda na direita (conecta com o olho)
    borderRadius: "8px 0 0 8px",
    
    cursor: "pointer",
    color: "#3c4043",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background 0.1s linear",
    zIndex: "2",
  };

  // 3. O BOTÃO DE PREVIEW/OLHO (Direita)
  const stylePreviewBtn = {
    width: "48px",         // Largura fixa
    display: "flex",       // Flex para centralizar o ícone
    alignItems: "center",  // Centraliza verticalmente
    justifyContent: "center", // Centraliza horizontalmente
    
    background: "#f8f9fa", // Cor levemente diferente
    border: "1px solid #dadce0",
    borderLeft: "1px solid #f1f3f4", // Divisória sutil
    borderRadius: "0 8px 8px 0",
    
    cursor: "pointer",
    color: "#5f6368",
    transition: "all 0.2s ease",
    zIndex: "2",
    flexShrink: "0", // Garante que o botão não encolha se o texto for grande
  };

  let visible = false;
const popup = document.createElement("div");
    popup.id = "quick-email-popup"; // ID único do módulo
    Object.assign(popup.style, stylePopup, { 
        right: "100px", // Afastado da pílula
        width: "400px",
        boxShadow: "none", // A classe .open põe a sombra
        opacity: "0", 
        pointerEvents: "none" 
    });

  // Objeto de referências para a animação
  const animRefs = {
    popup,
    googleLine: null,
    focusElement: null,
  };


  // 1. HEADER (Criado pela Factory)
  const header = createStandardHeader(
    popup,
    "Emails Rápidos",
    CURRENT_VERSION,
    "Templates de e-mail prontos para uso (NRP, Contato, Agendamento). Clique no olho para visualizar ou na linha para inserir.", // <--- NOVO
    animRefs,
    () => toggleVisibility()
  );

  // 2. TOOLBAR (Busca + Chips)
  const toolbar = document.createElement("div");
  Object.assign(toolbar.style, {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    borderBottom: "1px solid #f1f3f4",
    flexShrink: "0",
    backgroundColor: "#fff",
  });

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Filtrar emails...";
  Object.assign(searchInput.style, styleSearchInput);
  animRefs.focusElement = searchInput; // Salva para focar ao abrir

  const tabsContainer = document.createElement("div");
  Object.assign(tabsContainer.style, styleChipContainer);
  tabsContainer.style.marginBottom = "0";
  tabsContainer.style.borderBottom = "none";

  toolbar.appendChild(searchInput);
  toolbar.appendChild(tabsContainer);

  // Montagem do DOM
  popup.appendChild(header);
  popup.appendChild(toolbar);

  const contentArea = document.createElement("div");
  Object.assign(contentArea.style, {
    padding: "16px",
    overflowY: "auto",
    flexGrow: "1",
    position: "relative",
  });
  popup.appendChild(contentArea);

  const footer = document.createElement("div");
  Object.assign(footer.style, {
    padding: "8px 16px",
    borderTop: "1px solid #eee",
    textAlign: "center",
    fontSize: "10px",
    color: "#9aa0a6",
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
      contentArea.innerHTML = `<div style="text-align:center; padding:20px; color:#9aa0a6; fontSize:13px">Nenhum email encontrado.</div>`;
      return;
    }

    const iconEye = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const iconSend = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

    emailsToShow.forEach((email) => {
      const row = document.createElement("div");
      Object.assign(row.style, styleRow);

      const actionBtn = document.createElement("div");
      Object.assign(actionBtn.style, styleActionBtn);
      const shortDesc =
        email.subject.length > 45
          ? email.subject.substring(0, 45) + "..."
          : email.subject;

      actionBtn.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px; color:#202124; font-weight:500; fontSize:13px;">
                    <span style="color:#1a73e8">${iconSend}</span> ${email.name}
                </div>
                <div style="color:#5f6368; font-size:11px; padding-left:24px; margin-top:2px;">${shortDesc}</div>
            `;

      actionBtn.onmouseenter = () => (actionBtn.style.background = "#f8f9fa");
      actionBtn.onmouseleave = () => (actionBtn.style.background = "#fff");
      actionBtn.onclick = () => {
        actionBtn.style.background = "#e8f0fe";
        setTimeout(() => (actionBtn.style.background = "#fff"), 200);
        runQuickEmail(email);
      };

      const previewBtn = document.createElement("div");
      previewBtn.innerHTML = iconEye;
      Object.assign(previewBtn.style, stylePreviewBtn);

      previewBtn.onmouseenter = () => {
        previewBtn.style.background = "#e8eaed";
        previewBtn.style.color = "#202124";
      };
      previewBtn.onmouseleave = () => {
        if (!row.querySelector(".preview-card")) {
          previewBtn.style.background = "#f8f9fa";
          previewBtn.style.color = "#5f6368";
        }
      };

      previewBtn.onclick = (e) => {
        e.stopPropagation();
        const existingCard = row.querySelector(".preview-card");
        if (existingCard) {
          existingCard.style.maxHeight = "0";
          existingCard.style.opacity = "0";
          existingCard.style.padding = "0";
          row.classList.remove("expanded");
          previewBtn.style.background = "#f8f9fa";
          previewBtn.style.color = "#5f6368";
          setTimeout(() => existingCard.remove(), 300);
          return;
        }
        const allOpenRows = contentArea.querySelectorAll(".expanded");
        allOpenRows.forEach((r) => {
          const btn = r.children[1];
          if (btn) btn.click();
        });

        row.classList.add("expanded");
        previewBtn.style.background = "#e8f0fe";
        previewBtn.style.color = "#1a73e8";
        actionBtn.style.borderRadius = "8px 0 0 0";
        previewBtn.style.borderRadius = "0 8px 0 0";

        const card = document.createElement("div");
        card.className = "preview-card";
        Object.assign(card.style, stylePreviewCard);
        card.innerHTML = `
                    <div style="padding: 16px;">
                        <div style="font-weight:600; margin-bottom:4px; color:#1a73e8; font-size:11px; text-transform:uppercase;">Assunto</div>
                        <div style="margin-bottom:12px; color:#202124; font-size:13px;">${email.subject}</div>
                        <div style="font-weight:600; margin-bottom:4px; color:#1a73e8; font-size:11px; text-transform:uppercase; border-top:1px solid #eee; padding-top:8px;">Conteúdo</div>
                        <div style="color:#3c4043; font-size:12px; line-height:1.5;">${email.body}</div>
                    </div>
                `;
        row.appendChild(card);
        requestAnimationFrame(() => {
          card.style.maxHeight = "500px";
          card.style.opacity = "1";
        });
      };

      row.appendChild(actionBtn);
      row.appendChild(previewBtn);
      contentArea.appendChild(row);
    });
  }

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    if (searchTerm !== "") {
      Array.from(tabsContainer.children).forEach((child) => {
        child.style.background = "#fff";
        child.style.color = "#3c4043";
        child.style.borderColor = "#dadce0";
      });
    } else {
      renderTabs();
    }
    renderEmailList();
  });

function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-email'); 
    }

  renderTabs();
  renderEmailList();

  return toggleVisibility;
}
