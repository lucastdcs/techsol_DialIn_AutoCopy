// src/modules/lm-report/lm-repot.js

import {
  stylePopup,
} from "../shared/utils.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from '../shared/animations.js';
import { SoundManager } from "../shared/sound-manager.js";

// --- BANCO DE DADOS DE LINKS (Consolidado: Original + Novos Favoritos) ---
const LINKS_DB = {
  tasks: { // NOVA: Tarefas Diárias (Vinda dos favoritos)
    label: "Minhas Tarefas",
    links: [
      { name: "Web Clock Punch", url: "https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT", desc: "Ponto Eletrônico (Cognizant)" },
      { name: "Webão Help Deluxe", url: "http://go/webao-help-deluxe", desc: "Ferramenta de ajuda interna" },
      { name: "Moma Home", url: "https://moma.corp.google.com/", desc: "Intranet Google" },
      { name: "Plx DataSites", url: "https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/", desc: "Relatório de Follow-ups" },
      { name: "Escala & Aderência", url: "https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid", desc: "Dashboard WFM Team & LT" },
      { name: "Performance Individual", url: "https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce", desc: "Tech Solutions SAO (go/mymetricswebao)" },
      { name: "Dúvidas Ferzocos", url: "https://docs.google.com/forms/d/e/1FAIpQLSe3NejVJ2dNjGnW9S-s5mF57mF88eDV7lcd-rqLyEzT244ZMw/viewform", desc: "Formulário de dúvidas" }
    ]
  },
  lm: { // Mantido do original
    label: "LM Forms",
    links: [
      {
        name: "Relatório de Ocorrências e Pausas",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",
        desc: "Reportar problemas operacionais, quedas de sistema ou aviso de pausas emergenciais.",
      },
      {
        name: "Chamadas Excedidas (>50min)",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",
        desc: "Registro obrigatório para chamadas longas.",
      },
      {
        name: "Relatório de Bugs",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",
        desc: "Erros de sistema/ferramenta",
      },
      {
        name: "Suporte LM (BAU/Monitoria)",
        url: "https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",
        desc: "Enviar casos para BAU, Solicitar Descarte ou Abrir Monitoria.",
      },
    ],
  },
  qa: { // Mantido do original
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
  suporte: { // Mantido do original
    label: "Central de Ajuda",
    links: [
      {
        name: "Suporte Google Ads",
        url: "https://support.google.com/google-ads/",
        desc: "Central de Ajuda Oficial",
      },
      {
        name: "Suporte GA4",
        url: "https://support.google.com/analytics/",
        desc: "Central de Ajuda Oficial",
      },
      {
        name: "Suporte Merchant Center",
        url: "https://support.google.com/merchants/gethelp",
        desc: "Central de Ajuda Oficial",
      },
      {
        name: "Doc. CSP (Content Security Policy)",
        url: "https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",
        desc: "Documentação técnica para desenvolvedores.",
      },
      {
        name: "Conversões Otimizadas (EC)",
        url: "https://support.google.com/google-ads/answer/9888656?hl=en",
        desc: "Guia de implementação e funcionamento.",
      },
      {
        name: "Consent Mode (CoMo)",
        url: "https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",
        desc: "Documentação oficial de implementação.",
      },
      {
        name: "SkillShop",
        url: "https://skillshop.withgoogle.com/intl/pt-BR_ALL/",
        desc: "Portal de cursos e certificações.",
      },
    ],
  },
  processos: { // NOVA: Solicitada
    label: "Processos",
    links: [
       {
        name: "SOP Split & Transfer",
        url: "https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.oq8p11yo96dw",
        desc: "Instruções oficiais para transferência de casos.",
      },
    ],
  },
  tech: { // NOVA: Solicitada e populada
    label: "Tech Helper",
    links: [
       {
        name: "Soluções por CMS",
        url: "https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",
        desc: "Guias de implementação para WordPress, Shopify, Wix, etc.",
      },
      {
        name: "Iframes & Cross-Origin",
        url: "https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",
        desc: "Soluções técnicas para lidar com Iframes e contentDocument.",
      },
      { name: "JSFiddle", url: "https://jsfiddle.net/", desc: "Playground JS/CSS" },
      { name: "RegExr", url: "https://regexr.com/", desc: "Testador de Regex" },
      { name: "CodeShare", url: "https://codeshare.io/", desc: "Compartilhar código" },
      { name: "Gerador de Pessoas", url: "https://www.4devs.com.br/gerador_de_pessoas", desc: "Dados de teste (4Devs)" },
      { name: "Temp Mail", url: "https://temp-mail.org/en", desc: "Email Temporário" },
      { name: "Campaign URL Builder", url: "https://ga-dev-tools.google/ga4/campaign-url-builder/", desc: "Criador de UTMs" }
    ],
  },
  hr: { // NOVA: Vinda dos favoritos
    label: "RH / Cognizant",
    links: [
      { name: "Be.Cognizant", url: "https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx", desc: "Portal do Colaborador" },
      { name: "OneCognizant", url: "https://onecognizant.cognizant.com/Home", desc: "Apps e Sistemas" },
      { name: "ADP eXpert", url: "https://expert.cloud.brasil.adp.com/expert2/v4/", desc: "Folha de Pagamento" }
    ]
  },
  outros: { // Mantido do original
    label: "Diversos",
    links: [
      {
        name: "Solicitar Gravação",
        url: "https://support.google.com/policies/contact/sar",
        desc: "Formulário para solicitar áudio da chamada.",
      },
      {
        name: "Escalação de Sellers",
        url: "https://forms.gle/HWMhML56eE4CPZCs5",
        desc: "Formulário de escalação compartilhado pelo gpozzi@.",
      },
    ],
  },
};

export function initFeedbackAssistant() {
  const CURRENT_VERSION = "v3.0.0 Consolidado";

  let activeTab = "tasks"; // Começa na aba de tarefas (agora é a principal)
  let searchTerm = "";

  // --- DESIGN SYSTEM (HD) ---
  const COLORS = {
      bgApp: "#F8F9FA",
      bgSurface: "#FFFFFF",
      borderSubtle: "rgba(0, 0, 0, 0.08)",
      textPrimary: "#202124",
      textSecondary: "#5F6368",
      primary: "#1A73E8",
      primaryBg: "#E8F0FE",
      shadowCard: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      shadowHover: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
      transition: "all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"
  };

  // --- ESTILOS ---

  const styleSearchInput = {
    width: "100%", height: "40px",
    padding: "0 12px 0 40px",
    borderRadius: "10px",
    border: `1px solid transparent`,
    background: "#FFFFFF",
    fontSize: "14px", color: COLORS.textPrimary,
    boxSizing: "border-box", outline: "none",
    transition: COLORS.transition,
    boxShadow: "0 2px 5px rgba(0,0,0,0.03)", 
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
    backgroundRepeat: "no-repeat", backgroundPosition: "12px center",
  };

  const styleTabContainer = {
    display: "flex", flexWrap: "wrap", justifyContent: "center", 
    gap: "8px", padding: "4px 0 12px 0",
  };

  const styleTabButton = {
    padding: "6px 14px", borderRadius: "100px", 
    border: `1px solid #DADCE0`, background: "#FFFFFF",
    color: COLORS.textSecondary, fontSize: "13px", fontWeight: "500",
    cursor: "pointer", whiteSpace: "nowrap", transition: COLORS.transition,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    marginBottom: "0"
  };

  const styleActiveTab = {
    background: COLORS.primaryBg, color: COLORS.primary,
    borderColor: "transparent", fontWeight: "600",
    boxShadow: "0 1px 2px rgba(26, 115, 232, 0.15)"
  };

  const styleListItem = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: "12px", padding: "12px 16px", marginBottom: "8px",
    borderRadius: "12px", background: COLORS.bgSurface,
    border: `1px solid transparent`, boxShadow: COLORS.shadowCard,
    cursor: "pointer",
    transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s, border-color 0.2s",
    overflow: "hidden", minWidth: "0", opacity: "0", transform: "translateY(10px)", 
  };

  const styleListIcon = {
    width: "36px", height: "36px", flexShrink: "0",
    borderRadius: "10px", background: "#F1F3F4",
    color: COLORS.textSecondary, display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.2s, color 0.2s"
  };

  // --- POPUP ---
  const popup = document.createElement("div");
  popup.id = "feedback-popup";
  popup.classList.add("cw-module-window");
  Object.assign(popup.style, stylePopup, { 
      right: "100px", width: "460px", height: "640px", background: COLORS.bgApp 
  });

  const CATEGORY_ICONS = {
    tasks: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>', 
    lm: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>', 
    qa: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
    suporte: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>',
    processos: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z"/></svg>',
    tech: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
    outros: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c-1.49 0-2.61 1.12-2.61 2.5s1.12 2.5 2.61 2.5H2v4c0 1.1.9 2 2 2h4v1.5c0 1.49 1.12 2.61 2.5 2.61s2.5-1.12 2.5-2.61V19h4c1.1 0 2-.9 2-2v-4h1.5c1.49 0 2.61-1.12 2.61-2.5S21.99 11 20.5 11z"/></svg>',
    hr: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
  };

  const animRefs = { popup, googleLine: null, focusElement: null };
  let visible = false;

  // 1. HEADER
  const header = createStandardHeader(
    popup, "Links Úteis", CURRENT_VERSION,
    "Central de links, forms e tasks.",
    animRefs, () => toggleVisibility()
  );
  popup.appendChild(header);

  // 2. TOOLBAR
  const toolbar = document.createElement("div");
  Object.assign(toolbar.style, {
    padding: "20px 24px 12px 24px",
    display: "flex", flexDirection: "column", gap: "16px",
    borderBottom: `1px solid ${COLORS.borderSubtle}`,
    flexShrink: "0", backgroundColor: COLORS.bgApp,
  });

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Pesquisar...";
  Object.assign(searchInput.style, styleSearchInput);
  animRefs.focusElement = searchInput;

  searchInput.onfocus = () => {
    searchInput.style.borderColor = COLORS.primary;
    searchInput.style.backgroundColor = "#fff";
    searchInput.style.boxShadow = "0 0 0 4px rgba(26, 115, 232, 0.15)";
  };
  searchInput.onblur = () => {
    searchInput.style.borderColor = "transparent";
    searchInput.style.backgroundColor = "#fff";
    searchInput.style.boxShadow = "0 2px 5px rgba(0,0,0,0.03)";
  };

  const tabsContainer = document.createElement("div");
  Object.assign(tabsContainer.style, styleTabContainer);

  toolbar.appendChild(searchInput);
  toolbar.appendChild(tabsContainer);
  popup.appendChild(toolbar);

  // 3. CONTEÚDO
  const contentArea = document.createElement("div");
  Object.assign(contentArea.style, {
    padding: "16px 24px", overflowY: "auto", flexGrow: "1", backgroundColor: COLORS.bgApp
  });
  popup.appendChild(contentArea);
  document.body.appendChild(popup);

  function renderTabs() {
    tabsContainer.innerHTML = "";
    Object.keys(LINKS_DB).forEach((key) => {
      const cat = LINKS_DB[key];
      const btn = document.createElement("button");
      const icon = CATEGORY_ICONS[key] || '';
      
      btn.innerHTML = `<span style="display:inline-flex; align-items:center; margin-right:6px; opacity:0.9;">${icon}</span>${cat.label}`;
      Object.assign(btn.style, styleTabButton);

      if (activeTab === key && searchTerm === "") {
        Object.assign(btn.style, styleActiveTab);
      } else {
        btn.onmouseenter = () => { btn.style.background = "#F1F3F4"; btn.style.borderColor = "#DADCE0"; };
        btn.onmouseleave = () => { btn.style.background = "#FFFFFF"; btn.style.borderColor = "#DADCE0"; };
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
    const isSearching = searchTerm.trim() !== "";

    if (isSearching) {
      Object.entries(LINKS_DB).forEach(([key, cat]) => {
        const filtered = cat.links.filter(
          (l) =>
            l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.desc.toLowerCase().includes(searchTerm.toLowerCase())
        );
        filtered.forEach((item) => {
            item._catIcon = CATEGORY_ICONS[key];
        });
        linksToShow = [...linksToShow, ...filtered];
      });
    } else {
      linksToShow = LINKS_DB[activeTab].links;
      linksToShow.forEach(item => item._catIcon = CATEGORY_ICONS[activeTab]);
    }

    if (linksToShow.length === 0) {
      contentArea.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
            <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">🔍</div>
            <div style="font-size:14px; font-weight:500;">Nenhum link encontrado</div>
        </div>`;
      return;
    }

    linksToShow.forEach((link, index) => {
      const item = document.createElement("div");
      Object.assign(item.style, styleListItem);

      // Ícone
      const iconDiv = document.createElement("div");
      Object.assign(iconDiv.style, styleListIcon);
      iconDiv.innerHTML = link._catIcon || '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>';
      item.appendChild(iconDiv);
      
      // Texto
      const textDiv = document.createElement("div");
      textDiv.style.flexGrow = "1";
      textDiv.style.minWidth = "0"; 
      textDiv.style.display = "flex";
      textDiv.style.flexDirection = "column";
      textDiv.style.gap = "2px";

      const highlight = (text) => {
          if (!isSearching) return text;
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          return text.replace(regex, '<span style="color:#1a73e8; font-weight:700;">$1</span>');
      };

      const nameHTML = `<div style="font-size:14px; font-weight:600; color:${COLORS.textPrimary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${highlight(link.name)}</div>`;
      const descHTML = `<div style="font-size:12px; color:${COLORS.textSecondary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${highlight(link.desc)}</div>`;
      textDiv.innerHTML = nameHTML + descHTML;
      item.appendChild(textDiv);

      // Ações
      const actionsDiv = document.createElement("div");
      actionsDiv.style.display = "flex";
      actionsDiv.style.alignItems = "center";
      actionsDiv.style.gap = "8px";
      actionsDiv.style.flexShrink = "0"; 
      actionsDiv.style.opacity = "0.4"; 
      actionsDiv.style.transition = "opacity 0.2s";

      const copyBtn = document.createElement("div");
      copyBtn.title = "Copiar Link";
      copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      Object.assign(copyBtn.style, {
          width: "32px", height: "32px", borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: COLORS.textSecondary, cursor: "pointer", transition: "all 0.2s ease"
      });
      
      copyBtn.onclick = (e) => {
          SoundManager.playClick();
          e.stopPropagation();
          navigator.clipboard.writeText(link.url);
          copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          copyBtn.style.color = "#188038"; copyBtn.style.background = "#E6F4EA";
          setTimeout(() => {
              copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
              copyBtn.style.color = COLORS.textSecondary; copyBtn.style.background = "transparent";
          }, 1500);
      };
      
      copyBtn.onmouseenter = () => { copyBtn.style.background = "#F1F3F4"; };
      copyBtn.onmouseleave = () => { copyBtn.style.background = "transparent"; };
      actionsDiv.appendChild(copyBtn);
      
      const arrow = document.createElement("div");
      arrow.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
      Object.assign(arrow.style, {
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#DADCE0", width: "24px", height: "24px" 
      });
      actionsDiv.appendChild(arrow);
      item.appendChild(actionsDiv);

      item.onclick = () => window.open(link.url, '_blank');
      
      item.onmouseenter = () => {
          item.style.transform = "translateY(-2px)";
          item.style.boxShadow = COLORS.shadowHover;
          actionsDiv.style.opacity = "1";
          iconDiv.style.background = "#E8F0FE"; iconDiv.style.color = "#1967D2"; 
          arrow.style.color = "#1A73E8"; 
      };
      item.onmouseleave = () => {
          item.style.transform = "translateY(0)";
          item.style.boxShadow = COLORS.shadowCard;
          actionsDiv.style.opacity = "0.4";
          iconDiv.style.background = "#F1F3F4"; iconDiv.style.color = COLORS.textSecondary;
          arrow.style.color = "#DADCE0";
      };

      contentArea.appendChild(item);
      requestAnimationFrame(() => {
          setTimeout(() => {
              item.style.opacity = "1"; item.style.transform = "translateY(0)";
          }, index * 30); 
      });
    });
  }

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    if (searchTerm !== "") {
      Array.from(tabsContainer.children).forEach((c) => {
        Object.assign(c.style, styleTabButton); c.style.opacity = "0.6";
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