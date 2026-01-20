// src/modules/lm-report/lm-repot-assistant.js

import {
  stylePopup,
  showToast
} from "../shared/utils.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from '../shared/animations.js';
import { SoundManager } from "../shared/sound-manager.js";

// --- DADOS (Mantidos) ---
const LINKS_DB = {
  tasks: {
    label: "Minhas Tarefas",
    links: [
      { name: "Web Clock Punch", url: "https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT", desc: "Ponto Eletrônico (Cognizant)" },
      { name: "Webão Help Deluxe", url: "http://go/webao-help-deluxe", desc: "Ferramenta de ajuda interna" },
      { name: "Moma Home", url: "https://moma.corp.google.com/", desc: "Intranet Google" },
      { name: "Plx DataSites", url: "https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/", desc: "Relatório de Follow-ups" },
      { name: "Escala & Aderência", url: "https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid", desc: "Dashboard WFM Team & LT" },
      { name: "Performance Individual", url: "https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce", desc: "Tech Solutions SAO (go/mymetricswebao)" },
      { name: "Solicitar Gravação", url: "https://support.google.com/policies/contact/sar", desc: "Form para solicitar gravação." },
      { name: "Escalação de Sellers", url: "https://forms.gle/HWMhML56eE4CPZCs5", desc: "Form para escalação de Sellers." },
      { name: "[SOP] Split", url: "https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o", desc: "Instruções para o split." },
    ]
  },
  ads: {
    label: "Google Ads",
    links: [
      { name: "SPA (Tag Support)", url: "https://tagsupport.corp.google.com/create-session", desc: "Single Page Application" },
      { name: "[SOP] Ads Conversion Tracking", url: "https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit", desc: "Procedimento Padrão" },
      { name: "Win Criteria: Conversion Code", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit", desc: "Validação de código" },
      { name: "[SOP] Website Call Conversion", url: "https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit", desc: "Conversão de Chamada" },
      { name: "Win Criteria: WCC", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15", desc: "Validação WCC" },
      { name: "[SOP] Enhanced Conversions", url: "https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit", desc: "Conversões Otimizadas" },
      { name: "Ads EC Dashboard", url: "https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69", desc: "Monitoramento de EC" },
      { name: "[SOP] Troubleshooting", url: "https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit", desc: "Resolução de problemas" },
      { name: "Win Criteria: Troubleshooting", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=B4:B7", desc: "Validação de Troubleshoot" },
      { name: "[SOP] Ads Remarketing", url: "https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit", desc: "Implementação de RMKT" },
      { name: "[SOP] Dynamic Remarketing", url: "https://docs.google.com/document/d/1NVGBhJ-bYAq-F-55Te2T7Kz1HOTuj0KZc-SBbdfyfyM/edit", desc: "RMKT Varejo" },
      { name: "[SOP] Customer Match", url: "https://docs.google.com/document/d/1945XuWXxAnfQyIBK0-46cPf2brxhbu1-mMbKjvs_EOU/edit", desc: "Lista de Clientes" },
      { name: "[SOP] Lead Scoring", url: "https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit", desc: "Pontuação de Leads" },
      { name: "[SOP] GTM Installation", url: "https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit", desc: "Instalação do Container" }
    ]
  },
  analytics: {
    label: "Analytics (GA4)",
    links: [
      { name: "[SOP] GA4 Setup", url: "https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit", desc: "Instalação e Configuração" },
      { name: "Win Criteria: GA4 Setup", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51", desc: "Validação GA4" },
      { name: "GA4 E-commerce Guide", url: "https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br", desc: "Guia de Dev" },
      { name: "[SOP] Troubleshooting GA4", url: "https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit", desc: "Resolução de Problemas" },
      { name: "[SOP] Cross Domain", url: "https://support.google.com/ads-help/answer/12282402", desc: "Domínio Cruzado" },
      { name: "Eventos Recomendados", url: "https://developers.google.com/analytics/devguides/collection/ga4/reference/events", desc: "Lista oficial" },
      { name: "UTM Builder", url: "https://ga-dev-tools.google/ga4/campaign-url-builder/", desc: "Criador de URLs" }
    ]
  },
  shopping: {
    label: "Shopping",
    links: [
      { name: "[SOP] Onboarding MC 2.0", url: "https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit", desc: "Setup Inicial" },
      { name: "[SOP] Feed Optimization", url: "https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit", desc: "Otimização de Feed" },
      { name: "Consult ShopTroubleshooting", url: "http://go/shoptroubleshooting", desc: "Ferramenta Interna" },
      { name: "[SOP] Product Reviews", url: "https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit", desc: "Avaliações" },
      { name: "[SOP] Offline Feed (GSS)", url: "https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit", desc: "Feeds Offline" },
      { name: "Especificação de Dados", url: "https://support.google.com/merchants/answer/7052112", desc: "Help Center" }
    ]
  },
  tech: {
    label: "Tech Helper",
    links: [
       { name: "Soluções por CMS", url: "https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0", desc: "Guias por CMS" },
       { name: "Iframes & Cross-Origin", url: "https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0", desc: "Soluções Iframes" },
       { name: "Ads ICS Ghost", url: "http://go/pqp", desc: "Ghost Ads" },
       { name: "Analytics ICS Ghost", url: "http://go/analytics-ics", desc: "Ghost Analytics" },
       { name: "GTM ICS Ghost", url: "http://go/tagmanager-ics", desc: "Ghost GTM" },
       { name: "Gearloose", url: "http://go/gearloose", desc: "Ferramenta Gearloose" },
       { name: "MC ICS Ghost", url: "https://mcn-ics.corp.google.com/mc/overview", desc: "Ghost MC" },
       { name: "JSFiddle", url: "https://jsfiddle.net/", desc: "Playground Código" },
       { name: "RegExr", url: "https://regexr.com/", desc: "Testador de Regex" },
       { name: "Gerador de Pessoas", url: "https://www.4devs.com.br/gerador_de_pessoas", desc: "Dados de teste" },
       { name: "Doc. CSP", url: "https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.", desc: "Doc. CSP" },
       { name: "Doc. Enhanced Conversion", url: "https://support.google.com/google-ads/answer/9888656?hl=pt", desc: "Doc. ECW4" },
       { name: "Doc. CoMo", url: "https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br", desc: "Doc. Consent Mode" },
       { name: "Cursos SkillShop", url: "https://skillshop.withgoogle.com/intl/pt-BR_ALL/", desc: "Treinamentos" },
       { name: "Consent Mode - Instalação", url: "https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced", desc: "Guia Instalação CoMo" },
       { name: "CMPs - Consent Mode", url: "https://cmppartnerprogram.withgoogle.com/", desc: "Lista de CMPs" },
       { name: "Consent Mode - Testes", url: "https://developers.google.com/tag-platform/security/guides/consent-debugging", desc: "Debug CoMo" },
    ]
  },
  hr: {
    label: "RH / Cognizant",
    links: [
      { name: "Be.Cognizant", url: "https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx", desc: "Portal do Colaborador" },
      { name: "OneCognizant", url: "https://onecognizant.cognizant.com/Home", desc: "Apps e Sistemas" },
      { name: "ADP eXpert", url: "https://expert.cloud.brasil.adp.com/expert2/v4/", desc: "Folha de Pagamento" }
    ]
  },
  lm: {
    label: "LM Forms",
    links: [
      { name: "Ocorrências e Pausas", url: "https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform", desc: "Reportar problemas" },
      { name: "Chamadas >50min", url: "https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform", desc: "Registro de chamadas" },
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
    tasks: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
    lm: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>', 
    qa: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
    suporte: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>',
    ads: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
    analytics: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',
    shopping: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',
    tech: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
    hr: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
    history: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'
};

// --- LOGICA DE HISTÓRICO ---
const HISTORY_KEY = 'cw_link_history_v2';

function addToHistory(linkObj, catKey) {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    
    // Remove se já existe para jogar pro topo
    history = history.filter(h => h.url !== linkObj.url);
    
    // Adiciona no topo com a categoria original
    history.unshift({ ...linkObj, _originalCat: catKey });
    
    // Mantém apenas os últimos 3
    history = history.slice(0, 3);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function getHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
}

// --- APP INIT ---
export function initFeedbackAssistant() {
  const CURRENT_VERSION = "v3.3.0 (Anchor Mode)";
  let searchTerm = "";
  let visible = false;

  // --- DESIGN SYSTEM ---
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

  // Correção do Scroll Horizontal
  const styleTabContainer = {
    display: "flex", 
    flexWrap: "nowrap",       
    overflowX: "auto",        
    gap: "8px", 
    padding: "4px 24px 12px 24px",
    scrollbarWidth: "none", 
    msOverflowStyle: "none",
    maskImage: "linear-gradient(to right, transparent, black 12px, black 95%, transparent)",
    webkitMaskImage: "linear-gradient(to right, transparent, black 12px, black 95%, transparent)",
  };

  const styleTabButton = {
    padding: "6px 12px",
    borderRadius: "8px",
    border: `1px solid #DADCE0`, 
    background: "#FFFFFF",
    color: COLORS.textSecondary, 
    fontSize: "13px", fontWeight: "500",
    cursor: "pointer", whiteSpace: "nowrap", transition: COLORS.transition,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    marginBottom: "0",
    flexShrink: "0" // Vital para o scroll horizontal funcionar
  };

  const styleListItem = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: "12px", padding: "12px 16px", marginBottom: "8px",
    borderRadius: "12px", background: COLORS.bgSurface,
    border: `1px solid transparent`, boxShadow: COLORS.shadowCard,
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    overflow: "hidden", minWidth: "0"
  };

  const styleListIcon = {
    width: "36px", height: "36px", flexShrink: "0",
    borderRadius: "10px", background: "#F1F3F4",
    color: COLORS.textSecondary, display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.2s, color 0.2s"
  };

  const styleSectionTitle = {
      fontSize: "11px", fontWeight: "700", textTransform: "uppercase", 
      color: COLORS.textSecondary, margin: "24px 0 8px 0", letterSpacing: "0.5px",
      display: "flex", alignItems: "center", gap: "8px"
  };

  const styleHistoryItem = {
      ...styleListItem,
      background: "#FFF8E1", // Amarelo suave para destacar
      border: "1px solid #FFE082"
  };

  // --- POPUP ---
  const popup = document.createElement("div");
  popup.id = "feedback-popup";
  popup.classList.add("cw-module-window");
  Object.assign(popup.style, stylePopup, { 
      right: "100px", width: "460px", height: "640px", background: COLORS.bgApp 
  });

  // Remove scrollbar visualmente
  const hideScrollStyle = document.createElement('style');
  hideScrollStyle.innerHTML = `#feedback-popup div::-webkit-scrollbar { display: none; }`;
  document.head.appendChild(hideScrollStyle);

  const animRefs = { popup, googleLine: null, focusElement: null };

  // 1. HEADER
  const header = createStandardHeader(
    popup, "Links & Bookmarks", CURRENT_VERSION,
    "Acesso rápido às ferramentas. Use a busca ou navegue pelas categorias.",
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
  searchInput.placeholder = "Pesquisar em tudo...";
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
    padding: "16px 24px", overflowY: "auto", flexGrow: "1", backgroundColor: COLORS.bgApp, scrollBehavior: "smooth"
  });
  popup.appendChild(contentArea);
  document.body.appendChild(popup);

  // --- RENDERIZAÇÃO DOS BOTÕES (NAV) ---
  function renderNav() {
    tabsContainer.innerHTML = "";
    Object.keys(LINKS_DB).forEach((key) => {
      const cat = LINKS_DB[key];
      const btn = document.createElement("button");
      const icon = CATEGORY_ICONS[key] || '';
      const count = cat.links.length;
      
      btn.innerHTML = `
        <span style="display:flex; align-items:center; margin-right:6px; opacity:0.8;">${icon}</span>
        ${cat.label}
        <span style="font-size:10px; opacity:0.5; margin-left:6px; background:rgba(0,0,0,0.05); padding:1px 5px; border-radius:4px;">${count}</span>
      `;
      
      Object.assign(btn.style, styleTabButton);

      btn.onmouseenter = () => { btn.style.background = "#F1F3F4"; btn.style.borderColor = "#DADCE0"; };
      btn.onmouseleave = () => { btn.style.background = "#FFFFFF"; btn.style.borderColor = "#DADCE0"; };

      // LÓGICA DE ÂNCORA
      btn.onclick = () => {
        SoundManager.playClick();
        const target = document.getElementById(`cat-header-${key}`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Flash visual
            target.style.color = COLORS.primary;
            setTimeout(() => target.style.color = COLORS.textSecondary, 1000);
        }
      };
      tabsContainer.appendChild(btn);
    });
  }

  // --- RENDERIZAÇÃO DO CONTEÚDO ---
  function renderContent() {
    contentArea.innerHTML = "";
    
    // A. Busca (Modo Filtro)
    if (searchTerm.trim() !== "") {
        let results = [];
        Object.entries(LINKS_DB).forEach(([key, cat]) => {
            const filtered = cat.links.filter(l => 
                l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                l.desc.toLowerCase().includes(searchTerm.toLowerCase())
            );
            results.push(...filtered.map(l => ({...l, _cat: key})));
        });

        if (results.length === 0) {
            contentArea.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">🔍</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum link encontrado</div>
                </div>`;
            return;
        }

        results.forEach((link, idx) => {
            const item = createLinkItem(link, CATEGORY_ICONS[link._cat], false);
            contentArea.appendChild(item);
            animateItem(item, idx);
        });
        return;
    }

    // B. Modo Padrão (Histórico + Todas as Categorias)

    // 1. Histórico
    const history = getHistory();
    if (history.length > 0) {
        const histTitle = document.createElement("div");
        Object.assign(histTitle.style, styleSectionTitle);
        histTitle.innerHTML = `<span style="opacity:0.7;">${CATEGORY_ICONS.history}</span> 🕒 Recentes`;
        contentArea.appendChild(histTitle);

        history.forEach((link, idx) => {
            const item = createLinkItem(link, CATEGORY_ICONS[link._originalCat] || CATEGORY_ICONS.home, true);
            contentArea.appendChild(item);
            animateItem(item, idx);
        });
    }

    // 2. Todas as Categorias (Lista Infinita)
    Object.entries(LINKS_DB).forEach(([key, cat], sectionIdx) => {
        // Título da Seção (Âncora)
        const title = document.createElement("div");
        title.id = `cat-header-${key}`;
        Object.assign(title.style, styleSectionTitle);
        if (sectionIdx === 0 && history.length === 0) title.style.marginTop = "0"; // Remove margem se for o primeiro
        title.innerHTML = `<span style="opacity:0.7;">${CATEGORY_ICONS[key]}</span> ${cat.label}`;
        contentArea.appendChild(title);

        // Links da Categoria
        cat.links.forEach((link, linkIdx) => {
            const item = createLinkItem(link, CATEGORY_ICONS[key], false, key);
            contentArea.appendChild(item);
            // Pequeno delay cascata para animação bonita
            //animateItem(item, linkIdx); // Pode ficar pesado animar tudo, deixamos estático ou animação CSS simples
        });
    });
  }

  function createLinkItem(link, iconSvg, isHistory, catKey) {
      const item = document.createElement("div");
      Object.assign(item.style, isHistory ? styleHistoryItem : styleListItem);

      // Ícone
      const iconDiv = document.createElement("div");
      Object.assign(iconDiv.style, styleListIcon);
      if(isHistory) iconDiv.style.background = "#fff";
      iconDiv.innerHTML = iconSvg || '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>';
      item.appendChild(iconDiv);
      
      // Texto
      const textDiv = document.createElement("div");
      textDiv.style.flexGrow = "1";
      textDiv.style.minWidth = "0"; 
      textDiv.style.display = "flex";
      textDiv.style.flexDirection = "column";
      textDiv.style.gap = "2px";

      const highlight = (text) => {
          if (!searchTerm) return text;
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
      
      // COPY ACTION
      copyBtn.onclick = (e) => {
          SoundManager.playClick();
          e.stopPropagation();
          navigator.clipboard.writeText(link.url);
          
          if (!isHistory && catKey) addToHistory(link, catKey); // Salva no histórico se não estiver nele
          renderContent(); // Re-renderiza para atualizar histórico

          showToast("Link copiado!");
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

      // CLICK ACTION (OPEN)
      item.onclick = () => {
          if (!isHistory && catKey) addToHistory(link, catKey);
          renderContent(); 
          window.open(link.url, '_blank');
      };

      item.onmouseenter = () => {
          item.style.transform = "translateY(-2px)";
          item.style.boxShadow = COLORS.shadowHover;
          actionsDiv.style.opacity = "1";
          iconDiv.style.background = "#E8F0FE"; iconDiv.style.color = "#1967D2"; 
          arrow.style.color = "#1A73E8"; 
      };
      item.onmouseleave = () => {
          item.style.transform = "translateY(0)";
          item.style.boxShadow = isHistory ? "none" : COLORS.shadowCard;
          actionsDiv.style.opacity = "0.4";
          iconDiv.style.background = isHistory ? "#fff" : "#F1F3F4"; 
          iconDiv.style.color = COLORS.textSecondary;
          arrow.style.color = "#DADCE0";
      };

      return item;
  }

  function animateItem(item, index) {
      item.style.opacity = "0";
      item.style.transform = "translateY(10px)";
      requestAnimationFrame(() => {
          setTimeout(() => {
              item.style.transition = "all 0.3s cubic-bezier(0.2, 0.0, 0.2, 1)";
              item.style.opacity = "1"; 
              item.style.transform = "translateY(0)";
          }, index * 30); 
      });
  }

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderContent();
  });

  function toggleVisibility() {
      visible = !visible;
      toggleGenieAnimation(visible, popup, 'cw-btn-links'); 
  }

  renderNav();
  renderContent();

  return toggleVisibility;
}