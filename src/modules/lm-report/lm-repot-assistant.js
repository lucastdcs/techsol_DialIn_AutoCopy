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


  // --- NOVOS ESTILOS ---
  
  // Animação de entrada dos itens (Keyframes injetados via JS ou CSS global)
  const styleListItem = {
    display: "flex",
    alignItems: "center", // Centraliza verticalmente
    padding: "10px 14px", // Mais compacto e elegante
    borderRadius: "12px", // Google Material 3
    cursor: "pointer",
    border: "1px solid transparent",
    marginBottom: "6px",
    background: "#ffffff", // Cards brancos sobre fundo cinza ficam ótimos
    transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s",
    boxShadow: "0 1px 2px rgba(0,0,0,0.02)", // Sombra sutilíssima
    
    // Preparação para animação de entrada
    opacity: "0",
    transform: "translateY(10px)",
  };

  // Ícone Lateral (Anchor)
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

const CATEGORY_ICONS = {
    lm: '📝',      // Forms
    qa: '🛡️',      // QA/Quality
    suporte: '📚', // Docs
    outros: '⚡'   // Diversos
};


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
      // Adiciona ícone da aba ativa
      linksToShow.forEach(item => item._catIcon = CATEGORY_ICONS[activeTab]);
    }

    // Empty State Bonito
    if (linksToShow.length === 0) {
      contentArea.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; opacity:0.6;">
            <div style="font-size:32px; margin-bottom:10px;">🔍</div>
            <div style="font-size:13px; color:#5f6368;">Nenhum link encontrado.</div>
        </div>`;
      return;
    }

    // 2. Renderização
    linksToShow.forEach((link, index) => {
      const item = document.createElement("div");
      Object.assign(item.style, styleListItem);

      // --- ESTRUTURA DO CARD ---
      
      // A. Ícone Lateral (Visual Anchor)
      const iconDiv = document.createElement("div");
      Object.assign(iconDiv.style, styleListIcon);
      iconDiv.textContent = link._catIcon || '🔗'; // Fallback
      item.appendChild(iconDiv);

      // B. Texto Central
      const textDiv = document.createElement("div");
      textDiv.style.flexGrow = "1";
      
      // Função Highlight
      const highlight = (text) => {
          if (!isSearching) return text;
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          return text.replace(regex, '<span style="color:#1a73e8; font-weight:700;">$1</span>');
      };

      const nameHTML = `<div style="font-size:14px; font-weight:500; color:#202124;">${highlight(link.name)}</div>`;
      const descHTML = `<div style="font-size:11px; color:#5f6368; margin-top:2px;">${highlight(link.desc)}</div>`;
      
      textDiv.innerHTML = nameHTML + descHTML;
      item.appendChild(textDiv);

      // C. Ações (Copiar + Abrir)
      const actionsDiv = document.createElement("div");
      actionsDiv.style.display = "flex";
      actionsDiv.style.gap = "4px";
      actionsDiv.style.opacity = "0"; // Esconde actions inicialmente
      actionsDiv.style.transition = "opacity 0.2s";

      // Botão Copiar (Refinado)
      const copyBtn = document.createElement("div");
      copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      Object.assign(copyBtn.style, {
          width: "32px", height: "32px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#5f6368", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"
      });
      
      // Lógica de Copiar com Feedback Tátil
      copyBtn.onclick = (e) => {
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

      // --- ANIMAÇÃO EM CASCATA (STAGGER) ---
      // Atraso baseado no índice (0ms, 50ms, 100ms...)
      requestAnimationFrame(() => {
          item.style.transition = "opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)"; // Spring
          setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
          }, index * 40); // 40ms de delay entre cada item
      });
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
