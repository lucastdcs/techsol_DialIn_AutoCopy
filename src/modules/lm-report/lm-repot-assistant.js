// src/modules/feedback/feedback-assistant.js

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

  // --- ESTILOS LOCAIS ---
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

  // Estilo Chips (Abas)
  const styleTabContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    paddingBottom: "8px",
    // O marginTop e borderBottom são cuidados pelo container da toolbar agora
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
    flexDirection: "column",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "1px solid transparent",
    marginBottom: "4px",
    transition: "background 0.1s",
  };

  // --- POPUP (Com Animação) ---
  const popup = document.createElement("div");
  popup.id = "feedback-popup";
    Object.assign(popup.style, stylePopup, { 
        right: "100px", // Afastado da pílula
        width: "400px",
        boxShadow: "none", // A classe .open põe a sombra
        opacity: "0", 
        pointerEvents: "none" 
    });



  // Refs para animação
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
    padding: "0 16px 16px 16px",
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

  // --- LÓGICA DE RENDERIZAÇÃO ---
  function renderTabs() {
    tabsContainer.innerHTML = "";
    Object.keys(LINKS_DB).forEach((key) => {
      const cat = LINKS_DB[key];
      const btn = document.createElement("button");
      btn.textContent = cat.label;
      Object.assign(btn.style, styleTabButton);
      if (activeTab === key && searchTerm === "") {
        Object.assign(btn.style, styleActiveTab);
      }
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

    if (searchTerm.trim() !== "") {
      Object.values(LINKS_DB).forEach((cat) => {
        const filtered = cat.links.filter(
          (l) =>
            l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.desc.toLowerCase().includes(searchTerm.toLowerCase())
        );
        filtered.forEach((item) => (item._categoryName = cat.label));
        linksToShow = [...linksToShow, ...filtered];
      });
    } else {
      linksToShow = LINKS_DB[activeTab].links;
    }

    if (linksToShow.length === 0) {
      contentArea.innerHTML = `<div style="text-align:center; padding:20px; color:#9aa0a6; fontSize:13px;">Nenhum link encontrado.</div>`;
      return;
    }

    linksToShow.forEach((link) => {
      const item = document.createElement("div");
      Object.assign(item.style, styleListItem);

      const titleRow = document.createElement("div");
      Object.assign(titleRow.style, {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2px",
      });

      // Container Esquerdo (Texto)
      const textContainer = document.createElement("div");
      Object.assign(textContainer.style, {
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
      });

      const nameSpan = document.createElement("span");
      nameSpan.textContent = link.name;
      Object.assign(nameSpan.style, {
        fontSize: "14px",
        color: "#202124",
        fontWeight: "500",
      });

      const descSpan = document.createElement("span");
      descSpan.textContent =
        link.desc + (link._categoryName ? ` • ${link._categoryName}` : "");
      Object.assign(descSpan.style, {
        fontSize: "11px",
        color: "#5f6368",
        marginTop: "2px",
      });

      textContainer.appendChild(nameSpan);
      textContainer.appendChild(descSpan);

      // Container Direito (Ações: Copiar + Abrir)
      const actionsContainer = document.createElement("div");
      Object.assign(actionsContainer.style, {
        display: "flex",
        alignItems: "center",
        gap: "8px",
      });

      // --- BOTÃO DE COPIAR (NOVO) ---
      const copyBtn = document.createElement("div");
      // Ícone SVG de Copiar (Content Copy)
      const copyIconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      const checkIconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e8e3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

      copyBtn.innerHTML = copyIconSvg;
      Object.assign(copyBtn.style, {
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#5f6368",
        cursor: "pointer",
        transition: "all 0.2s",
        opacity: "0", // Escondido por padrão, aparece no hover do item
      });

      copyBtn.onclick = (e) => {
        e.stopPropagation(); // Não abre o link

        // Copia para o clipboard
        const tempInput = document.createElement("input");
        tempInput.value = link.url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        // Feedback Visual
        copyBtn.innerHTML = checkIconSvg;
        copyBtn.style.backgroundColor = "#e6f4ea"; // Fundo verde claro

        // Importante: showToast precisa ser importado do utils.js
        // Se não estiver importado, use console.log ou adicione o import no topo
        // showToast("Link copiado!");

        setTimeout(() => {
          copyBtn.innerHTML = copyIconSvg;
          copyBtn.style.backgroundColor = "transparent";
        }, 1500);
      };

      copyBtn.onmouseenter = () => {
        copyBtn.style.backgroundColor = "#e8eaed";
        copyBtn.style.color = "#202124";
      };
      copyBtn.onmouseleave = () => {
        copyBtn.style.backgroundColor = "transparent";
        copyBtn.style.color = "#5f6368";
      };

      // Ícone de Seta (Abrir)
      const openIcon = document.createElement("span");
      openIcon.innerHTML = "&#8599;";
      Object.assign(openIcon.style, {
        fontSize: "18px",
        color: "#dadce0",
        marginLeft: "4px",
      });

      actionsContainer.appendChild(copyBtn);
      actionsContainer.appendChild(openIcon);

      titleRow.appendChild(textContainer);
      titleRow.appendChild(actionsContainer);

      item.appendChild(titleRow);

      // Eventos do Item
      item.onmouseenter = () => {
        item.style.backgroundColor = "#f1f3f4";
        openIcon.style.color = "#1a73e8";
        copyBtn.style.opacity = "1"; // Mostra o botão de copiar no hover
      };
      item.onmouseleave = () => {
        item.style.backgroundColor = "transparent";
        openIcon.style.color = "#dadce0";
        copyBtn.style.opacity = "0"; // Esconde
      };

      // Clique no item abre o link
      item.onclick = () => window.open(link.url, "_blank");

      contentArea.appendChild(item);
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
