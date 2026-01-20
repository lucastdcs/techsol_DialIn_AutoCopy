// src/modules/lm-report/lm-repot-assistant.js

import { stylePopup, showToast } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from '../shared/animations.js';
import { SoundManager } from "../shared/sound-manager.js";

// --- DADOS (Links) ---
const LINKS_DB = {
  tasks: {
    label: "Tarefas",
    links: [
      { name: "Web Clock Punch", url: "https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT", desc: "Ponto Eletrônico" },
      { name: "Webão Help Deluxe", url: "http://go/webao-help-deluxe", desc: "Ferramenta de ajuda" },
      { name: "Moma Home", url: "https://moma.corp.google.com/", desc: "Intranet Google" },
      { name: "Plx DataSites", url: "https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/", desc: "Relatório Follow-ups" },
      { name: "Escala & Aderência", url: "https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid", desc: "Dashboard WFM" },
      { name: "Performance Indiv.", url: "https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce", desc: "Tech Solutions SAO" },
      { name: "Solicitar Gravação", url: "https://support.google.com/policies/contact/sar", desc: "Form Gravação" },
      { name: "Escalação Sellers", url: "https://forms.gle/HWMhML56eE4CPZCs5", desc: "Form Escalação" },
      { name: "[SOP] Split", url: "https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o", desc: "Instruções Split" },
    ]
  },
  ads: {
    label: "Google Ads",
    links: [
      { name: "SPA (Tag Support)", url: "https://tagsupport.corp.google.com/create-session", desc: "Single Page App" },
      { name: "[SOP] Conv. Tracking", url: "https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit", desc: "Procedimento Padrão" },
      { name: "Win Criteria: Code", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit", desc: "Validação Código" },
      { name: "[SOP] Call Conv.", url: "https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit", desc: "Conversão Chamada" },
      { name: "Win Criteria: WCC", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15", desc: "Validação WCC" },
      { name: "[SOP] Enhanced Conv.", url: "https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit", desc: "ECW4" },
      { name: "Ads EC Dashboard", url: "https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69", desc: "Monitoramento EC" },
      { name: "[SOP] Troubleshooting", url: "https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit", desc: "Resolução problemas" },
      { name: "[SOP] Remarketing", url: "https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit", desc: "Implementação RMKT" },
      { name: "[SOP] Lead Scoring", url: "https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit", desc: "Pontuação Leads" },
      { name: "[SOP] GTM Install", url: "https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit", desc: "Instalação Container" }
    ]
  },
  analytics: {
    label: "Analytics",
    links: [
      { name: "[SOP] GA4 Setup", url: "https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit", desc: "Instalação Config." },
      { name: "Win Criteria: GA4", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51", desc: "Validação GA4" },
      { name: "GA4 E-commerce", url: "https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br", desc: "Guia Dev" },
      { name: "[SOP] Troubleshoot GA4", url: "https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit", desc: "Resolução Problemas" },
      { name: "[SOP] Cross Domain", url: "https://support.google.com/ads-help/answer/12282402", desc: "Domínio Cruzado" },
      { name: "Eventos Recomendados", url: "https://developers.google.com/analytics/devguides/collection/ga4/reference/events", desc: "Lista Oficial" },
      { name: "UTM Builder", url: "https://ga-dev-tools.google/ga4/campaign-url-builder/", desc: "Criador URLs" }
    ]
  },
  shopping: {
    label: "Shopping",
    links: [
      { name: "[SOP] Onboarding MC", url: "https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit", desc: "Setup Inicial" },
      { name: "[SOP] Feed Opt", url: "https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit", desc: "Otimização Feed" },
      { name: "ShopTroubleshooting", url: "http://go/shoptroubleshooting", desc: "Ferramenta Interna" },
      { name: "[SOP] Product Reviews", url: "https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit", desc: "Avaliações" },
      { name: "[SOP] Offline Feed", url: "https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit", desc: "Feeds Offline" },
      { name: "Especificação Dados", url: "https://support.google.com/merchants/answer/7052112", desc: "Help Center" }
    ]
  },
  tech: {
    label: "Tech Helper",
    links: [
       { name: "Soluções por CMS", url: "https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0", desc: "Guias CMS" },
       { name: "Iframes & Cross-Origin", url: "https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0", desc: "Soluções Iframes" },
       { name: "Ads ICS Ghost", url: "http://go/pqp", desc: "Ghost Ads" },
       { name: "Analytics ICS Ghost", url: "http://go/analytics-ics", desc: "Ghost Analytics" },
       { name: "GTM ICS Ghost", url: "http://go/tagmanager-ics", desc: "Ghost GTM" },
       { name: "Gearloose", url: "http://go/gearloose", desc: "Ferramenta" },
       { name: "MC ICS Ghost", url: "https://mcn-ics.corp.google.com/mc/overview", desc: "Ghost MC" },
       { name: "JSFiddle", url: "https://jsfiddle.net/", desc: "Playground JS" },
       { name: "RegExr", url: "https://regexr.com/", desc: "Testador Regex" },
       { name: "Doc. CSP", url: "https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.", desc: "Doc. CSP" },
       { name: "Consent Mode Install", url: "https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced", desc: "Guia CoMo" },
       { name: "Consent Mode Debug", url: "https://developers.google.com/tag-platform/security/guides/consent-debugging", desc: "Debug CoMo" },
    ]
  },
  hr: {
    label: "RH",
    links: [
      { name: "Be.Cognizant", url: "https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx", desc: "Portal Colaborador" },
      { name: "OneCognizant", url: "https://onecognizant.cognizant.com/Home", desc: "Apps e Sistemas" },
      { name: "ADP eXpert", url: "https://expert.cloud.brasil.adp.com/expert2/v4/", desc: "Folha Pagamento" }
    ]
  },
  lm: {
    label: "Formulários",
    links: [
      { name: "Ocorrências e Pausas", url: "https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform", desc: "Reportar problemas" },
      { name: "Chamadas >50min", url: "https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform", desc: "Registro chamadas" },
      { name: "Relatório de Bugs", url: "https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform", desc: "Erros de sistema" },
      { name: "Suporte LM", url: "https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec", desc: "BAU/Descarte/Monitoria" },
    ]
  },
  qa: {
    label: "QA",
    links: [
      { name: "Elogios", url: "https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform", desc: "Feedback positivo" },
      { name: "Casos Complexos", url: "https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw", desc: "Casos difíceis" },
    ]
  },
  suporte: {
    label: "Suportes",
    links: [
      { name: "Fale Conosco Ads", url: "https://support.google.com/google-ads/gethelp", desc: "Chat/Email Ads" },
      { name: "Fale Conosco Merchant", url: "https://support.google.com/merchants/gethelp", desc: "Chat/Email Shopping" },
      { name: "Fale Conosco GMB", url: "https://support.google.com/business/gethelp", desc: "Perfil da Empresa" },
      { name: "Suporte API", url: "https://support.google.com/googleapi", desc: "Console API" },
      { name: "Telefones Suporte", url: "https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers", desc: "Lista de números" }
    ]
  }
};

const CATEGORY_ICONS = {
    tasks: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    lm: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`, 
    qa: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`,
    suporte: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>`,
    ads: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    analytics: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`,
    shopping: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
    tech: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
    hr: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    history: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>`
};

// --- LOGICA DE HISTÓRICO ---
const HISTORY_KEY = 'cw_link_history_v4';

function addToHistory(linkObj, catKey) {
    try {
        let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        // Remove duplicado para jogar pro topo
        history = history.filter(h => h.url !== linkObj.url);
        // Adiciona no topo
        history.unshift({ ...linkObj, _originalCat: catKey });
        // Mantém apenas 3
        history = history.slice(0, 3);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) { console.warn("Erro ao salvar histórico", e); }
}

function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch (e) { return []; }
}

// --- APP INIT ---
export function initFeedbackAssistant() {
  const CURRENT_VERSION = "v4.2 (Nav Rail Fixed)";
  let searchTerm = "";
  let visible = false;
  let activeCategoryKey = null; // Para highlight visual

  // --- DESIGN SYSTEM (Apple + Google) ---
  const COLORS = {
      bgApp: "#F8F9FA",
      bgSidebar: "#F0F3F8", // Cinza azulado bem leve
      bgSurface: "#FFFFFF",
      textPrimary: "#202124",
      textSecondary: "#5F6368",
      primary: "#1A73E8",
      primaryBg: "#E8F0FE",
      borderSubtle: "rgba(0,0,0,0.08)"
  };

  // --- POPUP ---
  const popup = document.createElement("div");
  popup.id = "links-popup";
  popup.classList.add("cw-module-window");
  Object.assign(popup.style, stylePopup, { 
      right: "100px", width: "580px", height: "650px", 
      background: COLORS.bgApp, overflow: "hidden" 
  });

  const animRefs = { popup, googleLine: null };

  // 1. HEADER
  const header = createStandardHeader(
    popup, "Central de Links", CURRENT_VERSION,
    "Navegue pelas categorias laterais para acesso rápido.",
    animRefs, () => toggleVisibility()
  );
  popup.appendChild(header);

  // --- LAYOUT PRINCIPAL (Flex Row) ---
  const mainLayout = document.createElement("div");
  mainLayout.style.cssText = "display: flex; height: calc(100% - 56px); width: 100%; position: relative;";
  popup.appendChild(mainLayout);

  // 2. SIDEBAR (Navigation Rail)
  const sidebar = document.createElement("div");
  sidebar.style.cssText = `
      width: 80px; flex-shrink: 0; background: ${COLORS.bgSidebar};
      border-right: 1px solid ${COLORS.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 4px;
      scrollbar-width: none;
  `;
  mainLayout.appendChild(sidebar);

  // 3. ÁREA DE CONTEÚDO
  const contentWrapper = document.createElement("div");
  contentWrapper.style.cssText = "flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative;";
  mainLayout.appendChild(contentWrapper);

  // 3.1. Barra de Busca
  const searchBar = document.createElement("div");
  searchBar.style.cssText = "padding: 16px 24px; flex-shrink: 0; border-bottom: 1px solid rgba(0,0,0,0.04); background: #FFF;";
  
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Buscar link, SOP ou ferramenta...";
  searchInput.style.cssText = `
      width: 100%; height: 40px; padding: 0 16px 0 42px;
      border-radius: 12px; border: 1px solid ${COLORS.borderSubtle};
      background: #F1F3F4; font-size: 14px; color: ${COLORS.textPrimary};
      outline: none; transition: all 0.2s;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
      background-repeat: no-repeat; background-position: 14px center;
  `;
  
  searchInput.onfocus = () => { searchInput.style.background = "#FFF"; searchInput.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; searchInput.style.borderColor = "transparent"; };
  searchInput.onblur = () => { searchInput.style.background = "#F1F3F4"; searchInput.style.boxShadow = "none"; searchInput.style.borderColor = COLORS.borderSubtle; };
  
  searchBar.appendChild(searchInput);
  contentWrapper.appendChild(searchBar);

  // 3.2. Scroll Content
  const scrollContent = document.createElement("div");
  scrollContent.style.cssText = "flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;";
  contentWrapper.appendChild(scrollContent);

  // --- RENDERIZADORES ---

  function renderSidebar() {
      sidebar.innerHTML = "";
      
      // Botão "Recentes" (Topo)
      const histBtn = createNavBtn('history', 'Recentes', CATEGORY_ICONS.history);
      // Divisor
      const div = document.createElement('div');
      div.style.cssText = "width: 40px; height: 1px; background: rgba(0,0,0,0.06); margin: 8px 0;";
      
      sidebar.appendChild(histBtn);
      sidebar.appendChild(div);

      // Botões de Categoria
      Object.keys(LINKS_DB).forEach(key => {
          const cat = LINKS_DB[key];
          const btn = createNavBtn(key, cat.label, CATEGORY_ICONS[key]);
          sidebar.appendChild(btn);
      });
  }

  function createNavBtn(key, label, iconSvg) {
      const btn = document.createElement("div");
      // Estilo Base (Apple Style Icon)
      btn.style.cssText = `
          width: 64px; height: 56px; border-radius: 12px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${COLORS.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          margin-bottom: 4px; position: relative;
      `;
      btn.title = label;
      btn.dataset.key = key;

      const iconDiv = document.createElement("div");
      iconDiv.style.cssText = "width: 24px; height: 24px; margin-bottom: 4px; transition: transform 0.2s;";
      iconDiv.innerHTML = iconSvg || CATEGORY_ICONS.tasks;

      const labelDiv = document.createElement("div");
      labelDiv.style.cssText = "font-size: 10px; font-weight: 500; opacity: 0.8;";
      labelDiv.textContent = label;

      btn.appendChild(iconDiv);
      btn.appendChild(labelDiv);

      // Eventos
      btn.onmouseenter = () => { 
          if(activeCategoryKey !== key) {
              btn.style.background = "rgba(0,0,0,0.04)";
              iconDiv.style.transform = "scale(1.1)";
          }
      };
      btn.onmouseleave = () => { 
          if(activeCategoryKey !== key) {
              btn.style.background = "transparent";
              iconDiv.style.transform = "scale(1)";
          }
      };
      
      btn.onclick = () => {
          SoundManager.playClick();
          scrollToSection(key);
      };

      return btn;
  }

  function scrollToSection(key) {
      const targetId = key === 'history' ? 'section-history' : `cat-anchor-${key}`;
      const target = document.getElementById(targetId);
      if(target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Highlight visual no sidebar
          updateActiveSidebar(key);
      }
  }

  function updateActiveSidebar(key) {
      activeCategoryKey = key;
      Array.from(sidebar.children).forEach(child => {
          if(!child.dataset.key) return;
          const icon = child.querySelector('div:first-child');
          
          if (child.dataset.key === key) {
              // Ativo (Google Blue Pill Style)
              child.style.background = "#E8F0FE";
              child.style.color = "#1967D2";
              child.style.fontWeight = "600";
              if(icon) icon.style.transform = "scale(1.1)";
          } else {
              // Inativo
              child.style.background = "transparent";
              child.style.color = COLORS.textSecondary;
              child.style.fontWeight = "500";
              if(icon) icon.style.transform = "scale(1)";
          }
      });
  }

  function renderContent() {
      scrollContent.innerHTML = "";

      // A. MODO BUSCA
      if (searchTerm.trim() !== "") {
          let results = [];
          Object.entries(LINKS_DB).forEach(([key, cat]) => {
              const filtered = cat.links.filter(l => 
                  l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  l.desc.toLowerCase().includes(searchTerm.toLowerCase())
              );
              results.push(...filtered.map(l => ({...l, _cat: key})));
          });

          if(results.length === 0) {
              scrollContent.innerHTML = `<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nenhum link encontrado.</div>`;
              return;
          }

          const searchHeader = document.createElement("div");
          searchHeader.innerHTML = "Resultados da busca";
          searchHeader.style.cssText = "font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase;";
          scrollContent.appendChild(searchHeader);

          results.forEach(link => {
              const card = createLinkCard(link, CATEGORY_ICONS[link._cat], false);
              scrollContent.appendChild(card);
          });
          return;
      }

      // B. MODO NORMAL (Lista Infinita)

      // 1. Histórico (Recentes)
      const history = getHistory();
      if (history.length > 0) {
          const histSection = document.createElement("div");
          histSection.id = "section-history";
          
          const histHeader = document.createElement("div");
          histHeader.innerHTML = `<span style="font-size:14px; margin-right:6px;">🕒</span> Recentes`;
          histHeader.style.cssText = "font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; margin: 24px 0 12px 0; letter-spacing:0.5px;";
          histSection.appendChild(histHeader);

          history.forEach(link => {
              // Ícone da categoria original ou padrão
              const icon = CATEGORY_ICONS[link._originalCat] || CATEGORY_ICONS.tasks;
              const card = createLinkCard(link, icon, true); // true = isHistory
              histSection.appendChild(card);
          });
          
          scrollContent.appendChild(histSection);
          
          // Divisor
          const div = document.createElement("div");
          div.style.cssText = "height: 1px; background: #E0E0E0; margin: 24px 0;";
          scrollContent.appendChild(div);
      }

      // 2. Categorias
      Object.entries(LINKS_DB).forEach(([key, cat]) => {
          const catSection = document.createElement("div");
          
          // Header (Âncora)
          const catHeader = document.createElement("div");
          catHeader.id = `cat-anchor-${key}`;
          catHeader.innerHTML = `<span style="opacity:0.6; margin-right:8px;">${CATEGORY_ICONS[key]}</span> ${cat.label}`;
          catHeader.style.cssText = `
              display: flex; align-items: center;
              font-size: 12px; font-weight: 700; color: #1a73e8; 
              text-transform: uppercase; margin: 32px 0 12px 0;
              padding-top: 10px; /* Ajuda no scroll snap */
          `;
          catSection.appendChild(catHeader);

          // Links Grid (opcional, aqui mantemos lista)
          cat.links.forEach(link => {
              const card = createLinkCard(link, CATEGORY_ICONS[key], false, key);
              catSection.appendChild(card);
          });
          
          scrollContent.appendChild(catSection);
      });
      
      // Espaço final
      const spacer = document.createElement("div");
      spacer.style.height = "60px";
      scrollContent.appendChild(spacer);
  }

  function createLinkCard(link, iconSvg, isHistory, catKey) {
      const card = document.createElement("div");
      
      // Visual do Card
      const bg = isHistory ? "#FFF8E1" : "#FFFFFF";
      const border = isHistory ? "1px solid #FFE082" : "1px solid rgba(0,0,0,0.08)";

      card.style.cssText = `
          display: flex; align-items: center; gap: 14px;
          padding: 12px 16px; margin-bottom: 8px;
          background: ${bg}; border: ${border};
          border-radius: 12px; cursor: pointer;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s;
          position: relative; overflow: hidden;
      `;

      // Icon Box
      const iconBox = document.createElement("div");
      iconBox.style.cssText = `
          width: 36px; height: 36px; border-radius: 10px;
          background: #F1F3F4; color: ${COLORS.textSecondary};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `;
      if(isHistory) iconBox.style.background = "#FFFFFF";
      
      iconBox.innerHTML = iconSvg || CATEGORY_ICONS.tasks;
      // Ajuste SVG
      const svg = iconBox.querySelector('svg');
      if(svg) { svg.style.width = "20px"; svg.style.height = "20px"; }

      // Info
      const meta = document.createElement("div");
      meta.style.cssText = "flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";
      
      const title = document.createElement("div");
      title.style.cssText = `font-size: 13px; font-weight: 600; color: ${COLORS.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
      title.textContent = link.name;

      const desc = document.createElement("div");
      desc.style.cssText = `font-size: 11px; color: ${COLORS.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
      desc.textContent = link.desc;

      meta.appendChild(title);
      meta.appendChild(desc);

      // Copy Action (Aparece no Hover)
      const copyBtn = document.createElement("div");
      copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      copyBtn.style.cssText = `
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0.6;
      `;
      copyBtn.title = "Copiar URL";

      // Hover Effects
      card.onmouseenter = () => {
          card.style.transform = "translateY(-2px)";
          card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
          // Highlight Icon
          iconBox.style.background = COLORS.primaryBg;
          iconBox.style.color = COLORS.primary;
          // Show Copy
          copyBtn.style.opacity = "1";
          copyBtn.style.color = COLORS.primary;
          copyBtn.style.background = "#F1F3F4";
      };
      card.onmouseleave = () => {
          card.style.transform = "translateY(0)";
          card.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
          
          iconBox.style.background = isHistory ? "#FFFFFF" : "#F1F3F4";
          iconBox.style.color = COLORS.textSecondary;
          
          copyBtn.style.opacity = "0.6";
          copyBtn.style.color = "#9AA0A6";
          copyBtn.style.background = "transparent";
      };

      // Actions
      card.onclick = () => {
          if(!isHistory && catKey) addToHistory(link, catKey);
          renderContent(); 
          window.open(link.url, '_blank');
      };

      copyBtn.onclick = (e) => {
          e.stopPropagation();
          SoundManager.playClick();
          navigator.clipboard.writeText(link.url);
          
          if(!isHistory && catKey) addToHistory(link, catKey);
          renderContent();

          showToast("Link copiado!");
      };

      card.appendChild(iconBox);
      card.appendChild(meta);
      card.appendChild(copyBtn);

      return card;
  }

  // --- LISTENERS ---
  searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      renderContent();
  });

  // --- INIT ---
  function toggleVisibility() {
      visible = !visible;
      toggleGenieAnimation(visible, popup, 'cw-btn-links');
  }

  document.body.appendChild(popup);
  renderSidebar();
  renderContent();

  return toggleVisibility;
}