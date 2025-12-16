// src/modules/lm-report/lm-repot.js

import {
  makeDraggable,
  stylePopup,
  stylePopupHeader,
  stylePopupTitle,
  stylePopupCloseBtn,
  stylePopupVersion,
  styleCredit,
  styleFloatingButton,
} from "../shared/utils.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from '../shared/animations.js';
import { SoundManager } from "../shared/sound-manager.js";

// --- BANCO DE DADOS DE LINKS ---
const LINKS_DB = {
  lm: {
    label: "LM Forms",
    links: [
      {
        name: "Relatório de Ocorrências",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",
        desc: "Reportar problemas operacionais | Aviso de pausas",
      },
      {
        name: "Chamadas Excedidas (>50min)",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",
        desc: "Registro de chamadas longas",
      },
      {
        name: "Relatório de Bugs",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",
        desc: "Erros de sistema/ferramenta",
      },
      {
        name: "Suporte LM",
        url: "https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",
        desc: "Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs",
      },
    ],
  },
  qa: {
    label: "QA",
    links: [
      {
        name: "Elogios",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",
        desc: "Feedback positivo dos Anunciantes",
      },
      {
        name: "Casos Complexos",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",
        desc: "Casos complicados de atender",
      },
    ],
  },
  suporte: {
    label: "Central de Ajuda",
    links: [
      {
        name: "Suporte Google Ads",
        url: "https://support.google.com/google-ads/",
        desc: "Oficial",
      },
      {
        name: "Suporte GA4",
        url: "https://support.google.com/analytics/",
        desc: "Oficial",
      },
      {
        name: "Suporte Merchant Center",
        url: "https://support.google.com/merchants/gethelp",
        desc: "Oficial",
      },
      {
        name: "Doc. CSP",
        url: "https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",
        desc: "Doc. oficial sobre CSP",
      },
      {
        name: "Doc. Enhanced Conversion",
        url: "https://support.google.com/google-ads/answer/9888656?hl=en",
        desc: "Como funcionam as conversões otimizadas?",
      },
      {
        name: "Doc. CoMo",
        url: "https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",
        desc: "Doc. oficial sobre Consent Mode",
      },
    ],
  },
  outros: {
    label: "Diversos",
    links: [
      {
        name: "Solicitar Gravação",
        url: "https://support.google.com/policies/contact/sar",
        desc: "Form para solicitar gravação da chamada.",
      },
    ],
  },
};

export function initFeedbackAssistant() {
  const CURRENT_VERSION = "v2.4.5";

  let activeTab = "lm";
  let searchTerm = "";

  
  const styleSearchInput = {
    width: "100%",
    padding: "10px 12px 10px 36px",
    borderRadius: "8px",
    border: "1px solid #dadce0",
    background: "#f8f9fa",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
    color: "#3c4043",
    transition: "background 0.2s, border-color 0.2s",
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "10px center",
  };

 
  const styleTabContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    paddingBottom: "8px",
 
  };

  const styleTabButton = {
    padding: "6px 16px",
    borderRadius: "16px",
    border: "1px solid #dadce0",
    background: "transparent",
    color: "#5f6368",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
    marginBottom: "4px",
  };

  const styleActiveTab = {
    background: "#e8f0fe",
    color: "#1967d2",
    borderColor: "#e8f0fe",
    fontWeight: "600",
  };


  
  const styleListItem = {
    display: "flex",
    alignItems: "center", 
    padding: "10px 14px", 
    borderRadius: "12px", 
    cursor: "pointer",
    border: "1px solid transparent",
    marginBottom: "6px",
    background: "#ffffff",
    transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s",
    boxShadow: "0 1px 2px rgba(0,0,0,0.02)",

    opacity: "0",
    transform: "translateY(10px)",
  };

 
  const styleListIcon = {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "#f1f3f4",
    color: "#5f6368",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "14px",
    fontSize: "18px",
    flexShrink: "0"
  };


const popup = document.createElement("div");
  popup.id = "feedback-popup";
  
  // 1. Conecta ao animations.js
  popup.classList.add("cw-module-window");

  Object.assign(popup.style, stylePopup, { 
      right: "100px", // Afastado da pílula
      width: "400px",
      // Removemos opacity/pointerEvents daqui
  });

  // (Seus ícones permanecem iguais)
// Ícones SVG Inline (Material Design 24px)
// fill="currentColor" permite que eles herdem a cor do texto onde estiverem inseridos
const CATEGORY_ICONS = {
    lm: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>', // Assignment
    
    qa: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>', // Verified/Shield
    
    suporte: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>', // Menu Book
    
    outros: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c-1.49 0-2.61 1.12-2.61 2.5s1.12 2.5 2.61 2.5H2v4c0 1.1.9 2 2 2h4v1.5c0 1.49 1.12 2.61 2.5 2.61s2.5-1.12 2.5-2.61V19h4c1.1 0 2-.9 2-2v-4h1.5c1.49 0 2.61-1.12 2.61-2.5S21.99 11 20.5 11z"/></svg>' // Extension
};

  const animRefs = {
    popup,
    googleLine: null,
    focusElement: null,
  };
  let visible = false;

  // 1. HEADER (Factory)
  const header = createStandardHeader(
    popup,
    "Links Úteis",
    CURRENT_VERSION,
    "Acesso rápido a formulários internos (Ocorrências, Bugs) e documentações oficiais de suporte.", // <--- NOVO
    animRefs,
    () => toggleVisibility()
  );
  popup.appendChild(header);

  // 2. TOOLBAR (Busca + Abas)
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
  searchInput.type = "text";
  searchInput.placeholder = "Buscar link, form ou ajuda...";
  Object.assign(searchInput.style, styleSearchInput);
  animRefs.focusElement = searchInput;

  searchInput.onfocus = () => {
    searchInput.style.borderColor = "#1a73e8";
    searchInput.style.backgroundColor = "#fff";
  };
  searchInput.onblur = () => {
    searchInput.style.borderColor = "#dadce0";
    searchInput.style.backgroundColor = "#f8f9fa";
  };

  const tabsContainer = document.createElement("div");
  Object.assign(tabsContainer.style, styleTabContainer);

  toolbar.appendChild(searchInput);
  toolbar.appendChild(tabsContainer);
  popup.appendChild(toolbar);

  // 3. CONTEÚDO
  const contentArea = document.createElement("div");
  Object.assign(contentArea.style, {
    padding: "0 8px 8px 8px",
    overflowY: "auto",
    flexGrow: "1",
  });
  popup.appendChild(contentArea);

  // 4. FOOTER
  const footer = document.createElement("div");
  Object.assign(footer.style, {
    padding: "8px 16px",
    borderTop: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "10px",
    color: "#9aa0a6",
  });
  footer.innerHTML = `<span>by lucaste@</span>`;
  popup.appendChild(footer);

  document.body.appendChild(popup);


function renderTabs() {
    tabsContainer.innerHTML = "";
    
    Object.keys(LINKS_DB).forEach((key) => {
      const cat = LINKS_DB[key];
      const btn = document.createElement("button");

      const icon = CATEGORY_ICONS[key] || '';
      
      // Ajuste o innerHTML para incluir o container flex para o ícone
      btn.innerHTML = `
        <span style="display:inline-flex; align-items:center; margin-right:6px; vertical-align:middle;">
            ${icon}
        </span> 
        ${cat.label}
      `;
      
      Object.assign(btn.style, styleTabButton);
      
      // Precisamos garantir que o botão também alinhe tudo ao centro
      btn.style.display = "inline-flex";
      btn.style.alignItems = "center";
      

      if (activeTab === key && searchTerm === "") {
        Object.assign(btn.style, styleActiveTab);
      }
      

      btn.onmousedown = () => btn.style.transform = "scale(0.95)";
      btn.onmouseup = () => btn.style.transform = "scale(1)";
      btn.onmouseleave = () => btn.style.transform = "scale(1)";

      btn.onclick = () => {
        activeTab = key;
        searchTerm = "";
        searchInput.value = ""; 

        renderTabs();
        renderList();
      };
      
      tabsContainer.appendChild(btn);
    });
  }

  function renderList() {
    contentArea.innerHTML = "";
    let linksToShow = [];
    const isSearching = searchTerm.trim() !== "";

    // 1. Filtragem
    if (isSearching) {
      Object.entries(LINKS_DB).forEach(([key, cat]) => {
        const filtered = cat.links.filter(
          (l) =>
            l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.desc.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Passa o ícone da categoria pai para o item filho
        filtered.forEach((item) => {
            item._catIcon = CATEGORY_ICONS[key];
            item._categoryName = cat.label;
        });
        linksToShow = [...linksToShow, ...filtered];
      });
    } else {
      linksToShow = LINKS_DB[activeTab].links;

      linksToShow.forEach(item => item._catIcon = CATEGORY_ICONS[activeTab]);
    }

    if (linksToShow.length === 0) {
      contentArea.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; opacity:0.6;">
            <div style="font-size:32px; margin-bottom:10px;">🔍</div>
            <div style="font-size:13px; color:#5f6368;">Nenhum link encontrado.</div>
        </div>`;
      return;
    }

    // 2. Renderização
// ... dentro de renderList ...
    linksToShow.forEach((link, index) => {
      const item = document.createElement("div");
      Object.assign(item.style, styleListItem);

      // --- ICON DIV (Estilização) ---
      const iconDiv = document.createElement("div");
      Object.assign(iconDiv.style, styleListIcon);
      
      // [NOVO] INJETA O SVG EM VEZ DE TEXTO
      // Usamos innerHTML porque o CATEGORY_ICONS agora contém strings SVG completas (<svg>...</svg>)
      iconDiv.innerHTML = link._catIcon || '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>'; // Link Icon Default
      
      // [NOVO] ALINHAMENTO FLEXBOX PARA SVGs
      // Garante que o ícone fique centralizado e na cor certa
      iconDiv.style.display = "flex";
      iconDiv.style.alignItems = "center";
      iconDiv.style.justifyContent = "center";
      iconDiv.style.color = "#5f6368"; // Cinza Google Padrão

      item.appendChild(iconDiv);
      // ...

      // C. Ações (Copiar + Abrir)
      const actionsDiv = document.createElement("div");
      actionsDiv.style.display = "flex";
      actionsDiv.style.gap = "4px";
      actionsDiv.style.opacity = "0"; 
      actionsDiv.style.transition = "opacity 0.2s";

      const copyBtn = document.createElement("div");
      copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      Object.assign(copyBtn.style, {
          width: "32px", height: "32px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#5f6368", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"
      });
      
      // Lógica de Copiar com Feedback Tátil
      copyBtn.onclick = (e) => {
        SoundManager.playClick();
          e.stopPropagation();
          navigator.clipboard.writeText(link.url);
          
          // Animação de Sucesso
          copyBtn.style.transform = "scale(1.2)";
          copyBtn.style.color = "#1e8e3e"; // Verde
          copyBtn.style.backgroundColor = "#e6f4ea";
          
          // Volta ao normal
          setTimeout(() => {
              copyBtn.style.transform = "scale(1)";
              copyBtn.style.color = "#5f6368";
              copyBtn.style.backgroundColor = "transparent";
          }, 800);
      };
      
      copyBtn.onmouseenter = () => copyBtn.style.backgroundColor = "#f1f3f4";
      copyBtn.onmouseleave = () => copyBtn.style.backgroundColor = "transparent";

      actionsDiv.appendChild(copyBtn);
      
      // Seta de Abrir (Decorativa)
      const arrow = document.createElement("div");
      arrow.innerHTML = "↗";
      Object.assign(arrow.style, {
          width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#dadce0", fontSize: "16px"
      });
      actionsDiv.appendChild(arrow);

      item.appendChild(actionsDiv);

      // --- EVENTOS DO CARD ---
      item.onclick = () => window.open(link.url, '_blank');
      
      item.onmouseenter = () => {
          item.style.backgroundColor = "#f8f9fa"; // Hover leve
          item.style.transform = "scale(1.01)"; // Micro-zoom Apple
          actionsDiv.style.opacity = "1";
          arrow.style.color = "#1a73e8";
      };
      item.onmouseleave = () => {
          item.style.backgroundColor = "#ffffff";
          item.style.transform = "scale(1)";
          actionsDiv.style.opacity = "0";
          arrow.style.color = "#dadce0";
      };

      contentArea.appendChild(item);

      requestAnimationFrame(() => {
          item.style.transition = "opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)"; // Spring
          setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
          }, index * 40); 
      });
    });
  }

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    if (searchTerm !== "") {
      Array.from(tabsContainer.children).forEach((c) => {
        c.style.backgroundColor = "transparent";
        c.style.color = "#5f6368";
        c.style.borderColor = "#dadce0";
      });
    } else {
      renderTabs();
    }
    renderList();
  });

function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-links'); 
    }

  renderTabs();
  renderList();

  return toggleVisibility;
}
