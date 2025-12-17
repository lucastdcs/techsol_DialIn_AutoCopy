// src/modules/quick-email/quick-email-assistant.js

import {
    stylePopup,
} from "../shared/utils.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from '../shared/animations.js';
import { QUICK_EMAILS } from "./quick-email-data.js";
import { triggerProcessingAnimation } from "../shared/command-center.js";

// --- NOVAS IMPORTAÇÕES (Baseado no seu snippet) ---
import { SUBSTATUS_SHORTCODES } from '../notes/notes-data.js';
import { runQuickEmail, runEmailAutomation } from "../email/email-automation.js";

export function initQuickEmailAssistant() {
    const CURRENT_VERSION = "v4.2.0 CR-Hybrid"; 

    // --- ESTADO ---
    // Adicionamos uma chave especial para as CRs
    const CR_CATEGORY_KEY = 'CANNED_RESPONSES';
    
    let activeCategory = Object.keys(QUICK_EMAILS)[0];
    let searchTerm = "";
    let currentView = 'list'; // 'list' ou 'detail'
    let visible = false;

    // --- 1. ESTILOS (Mantendo a base visual Apple/Google) ---

    const styleContainer = {
        display: "flex", flexDirection: "column", height: "100%", position: "relative", overflow: "hidden",
        background: "#FAFAFA"
    };

    const styleNavView = {
        display: "flex", width: "200%", height: "100%", 
        transition: "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)", // Apple Spring
        transform: "translateX(0)", willChange: "transform"
    };

    const styleViewPage = {
        width: "50%", height: "100%", display: "flex", flexDirection: "column",
        overflow: "hidden", position: "relative"
    };

    const styleSearchInput = {
        width: "100%", padding: "12px 12px 12px 40px",
        borderRadius: "12px", border: "1px solid transparent", background: "#F0F2F5",
        fontSize: "14px", color: "#202124", boxSizing: "border-box", outline: "none",
        transition: "all 0.2s ease",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: "no-repeat", backgroundPosition: "12px center",
    };

    const styleTabs = {
        display: "flex", gap: "8px", padding: "8px 16px 12px 16px", // Ajuste no padding
        overflowX: "auto", scrollbarWidth: "none", 
        borderBottom: "1px solid #f1f3f4"
    };

    const styleTabBtn = {
        padding: "6px 14px", borderRadius: "20px", border: "1px solid #dadce0",
        background: "#fff", color: "#5f6368", fontSize: "12px", fontWeight: "500",
        cursor: "pointer", transition: "all 0.2s ease", flexShrink: "0"
    };

    const styleTabActive = {
        background: "#E8F0FE", color: "#1967D2", borderColor: "#E8F0FE", fontWeight: "600"
    };

    const styleRow = {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px", marginBottom: "8px", borderRadius: "12px",
        background: "#fff", border: "1px solid #dadce0",
        cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
        position: "relative", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
    };

    // --- CRIAÇÃO DO POPUP ---
    const popup = document.createElement("div");
    popup.id = "quick-email-popup";
    popup.classList.add("cw-module-window");

    Object.assign(popup.style, stylePopup, {
        right: "100px", width: "480px", height: "600px",
        transition: "width 0.3s ease, height 0.3s ease" 
    });

    const animRefs = { popup, googleLine: null, focusElement: null };

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-email');
        if (!visible) setTimeout(() => showListView(), 300);
    }

    // HEADER
    const header = createStandardHeader(
        popup, "Assistente de Resposta", CURRENT_VERSION,
        "Templates de Email e CRs Rápidas",
        animRefs, () => toggleVisibility()
    );

    // CONTAINER
    const mainContainer = document.createElement("div");
    Object.assign(mainContainer.style, styleContainer);
    const slider = document.createElement("div");
    Object.assign(slider.style, styleNavView);

    // --- PÁGINA 1: LISTA ---
    const pageList = document.createElement("div");
    Object.assign(pageList.style, styleViewPage);

    const toolbar = document.createElement("div");
    Object.assign(toolbar.style, {
        padding: "20px 0 0 0", // Padding removido das laterais para as Tabs irem até a borda se quiser
        flexShrink: "0", background: "#fff", zIndex: "10",
        display: "flex", flexDirection: "column", gap: "10px"
    });

    const searchContainer = document.createElement("div");
    searchContainer.style.padding = "0 20px";
    
    const searchInput = document.createElement("input");
    searchInput.placeholder = "Buscar Email ou CR...";
    Object.assign(searchInput.style, styleSearchInput);
    
    searchInput.onfocus = () => { 
        searchInput.style.background = "#fff"; 
        searchInput.style.border = "1px solid #1a73e8";
        searchInput.style.boxShadow = "0 0 0 4px rgba(26, 115, 232, 0.1)"; 
    };
    searchInput.onblur = () => { 
        searchInput.style.background = "#F0F2F5"; 
        searchInput.style.border = "1px solid transparent";
        searchInput.style.boxShadow = "none"; 
    };
    animRefs.focusElement = searchInput;

    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, styleTabs);

    const listContent = document.createElement("div");
    Object.assign(listContent.style, { padding: "16px 20px", overflowY: "auto", flexGrow: "1" });

    searchContainer.appendChild(searchInput);
    toolbar.appendChild(searchContainer);
    toolbar.appendChild(tabsContainer);
    pageList.appendChild(toolbar);
    pageList.appendChild(listContent);

    // --- PÁGINA 2: DETALHE (Apenas para Emails Normais) ---
    const pageDetail = document.createElement("div");
    Object.assign(pageDetail.style, styleViewPage);
    const detailContent = document.createElement("div");
    Object.assign(detailContent.style, { padding: "0", overflowY: "auto", flexGrow: "1", background: "#fff" });
    pageDetail.appendChild(detailContent);

    slider.appendChild(pageList);
    slider.appendChild(pageDetail);
    mainContainer.appendChild(slider);
    popup.appendChild(header);
    popup.appendChild(mainContainer);
    document.body.appendChild(popup);

    // --- LÓGICA DE EXECUÇÃO ---

    // Unifica a execução (Email objeto ou CR string)
    async function handleExecution(data, type) {
        try {
            if (visible) toggleVisibility(); // Fecha visualmente
            const finishLoading = triggerProcessingAnimation(); // Inicia animação global

            await new Promise(resolve => setTimeout(resolve, 800)); // Delay UX

            if (type === 'email') {
                await runQuickEmail(data);
            } else if (type === 'cr') {
                // 'data' aqui é o shortcode (ex: 'AS_Reschedule_1')
                await runEmailAutomation(data);
            }

            finishLoading();
        } catch (error) {
            console.error("❌ Erro na execução:", error);
            const elOverlay = document.querySelector('.cw-focus-backdrop');
            if (elOverlay) elOverlay.classList.remove('active');
        }
    }

    function showDetailView(email) {
        currentView = 'detail';
        slider.style.transform = "translateX(-50%)";
        
        const iconBack = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
        const iconSend = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

        detailContent.innerHTML = `
            <div style="position:sticky; top:0; background:rgba(255,255,255,0.95); backdrop-filter:blur(10px); border-bottom:1px solid #f1f3f4; padding:12px 20px; z-index:10; display:flex; align-items:center; gap:8px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:4px; margin-left:-8px; border-radius:50%;">${iconBack}</button>
                <div style="font-weight:600; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${email.name}</div>
            </div>
            <div style="padding:20px;">
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; margin-bottom:6px;">Assunto</div>
                <div style="font-size:13px; color:#202124; padding:12px; background:#F8F9FA; border-radius:8px; border:1px solid #eee; margin-bottom:20px;">${email.subject}</div>
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; margin-bottom:6px;">Mensagem</div>
                <div style="font-size:13px; color:#3c4043; line-height:1.5;">${email.body.replace(/\n/g, '<br>')}</div>
            </div>
            <div style="position:sticky; bottom:0; padding:20px; background:linear-gradient(to top, #fff 80%, transparent);">
                <button id="csa-insert-btn" style="width:100%; padding:12px; background:#1a73e8; color:fff; border:none; border-radius:8px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:8px; color:white;">
                    ${iconSend} Inserir Template
                </button>
            </div>
        `;
        
        detailContent.querySelector('#csa-back-btn').onclick = showListView;
        const btn = detailContent.querySelector('#csa-insert-btn');
        btn.onclick = () => {
            btn.style.transform = "scale(0.96)";
            handleExecution(email, 'email');
            setTimeout(() => { btn.style.transform = "scale(1)"; showListView(); }, 300);
        };
    }

    function showListView() {
        currentView = 'list';
        slider.style.transform = "translateX(0)";
    }

    // --- RENDERIZAÇÃO ---

    function createChip(text, key, icon = null) {
        const chip = document.createElement("button");
        chip.innerHTML = icon ? `<span style="margin-right:4px">${icon}</span>${text}` : text;
        Object.assign(chip.style, styleTabBtn);
        
        if (activeCategory === key && searchTerm === "") {
            Object.assign(chip.style, styleTabActive);
        }
        
        chip.onclick = () => { 
            activeCategory = key; 
            searchTerm = ""; 
            searchInput.value = ""; 
            renderTabs(); 
            renderList(); 
        };
        return chip;
    }

    function renderTabs() {
        tabsContainer.innerHTML = "";
        
        // 1. Aba Especial de CRs (Nova Ideia)
        tabsContainer.appendChild(createChip("Smart CRs", CR_CATEGORY_KEY, "⚡"));

        // 2. Abas de Emails Normais (Do arquivo base)
        Object.keys(QUICK_EMAILS).forEach((catKey) => {
            tabsContainer.appendChild(createChip(QUICK_EMAILS[catKey].title, catKey));
        });
    }

    function renderList() {
        listContent.innerHTML = "";
        let itemsToRender = [];
        const isSearch = searchTerm.trim() !== "";

        // --- LÓGICA DE COLETA DE DADOS ---
        if (isSearch) {
            // Busca Global: Varre Emails e CRs
            const term = searchTerm.toLowerCase();

            // 1. Busca em Emails
            Object.values(QUICK_EMAILS).forEach(cat => {
                cat.emails.forEach(email => {
                    if (email.name.toLowerCase().includes(term) || email.subject.toLowerCase().includes(term)) {
                        itemsToRender.push({ type: 'email', data: email });
                    }
                });
            });

            // 2. Busca em CRs
            Object.entries(SUBSTATUS_SHORTCODES).forEach(([key, code]) => {
                if (!code) return;
                const cleanName = key.replace(/_/g, ' ');
                if (cleanName.toLowerCase().includes(term) || code.toLowerCase().includes(term)) {
                    itemsToRender.push({ type: 'cr', key: key, code: code });
                }
            });

        } else {
            // Navegação por Categoria
            if (activeCategory === CR_CATEGORY_KEY) {
                // Renderiza CRs
                Object.entries(SUBSTATUS_SHORTCODES).forEach(([key, code]) => {
                    if (!code) return;
                    itemsToRender.push({ type: 'cr', key: key, code: code });
                });
            } else if (QUICK_EMAILS[activeCategory]) {
                // Renderiza Emails
                QUICK_EMAILS[activeCategory].emails.forEach(email => {
                    itemsToRender.push({ type: 'email', data: email });
                });
            }
        }

        // --- RENDERIZAÇÃO DOS ITEMS ---
        if (itemsToRender.length === 0) {
            listContent.innerHTML = `<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px;">🔍</div><div style="font-size:14px; margin-top:8px;">Nada encontrado.</div></div>`;
            return;
        }

        const iconEmail = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
        const iconBolt = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbc04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
        const iconArrow = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

        itemsToRender.forEach(item => {
            const row = document.createElement("div");
            Object.assign(row.style, styleRow);

            if (item.type === 'email') {
                // Layout Template de Email
                const email = item.data;
                const shortDesc = email.subject.length > 40 ? email.subject.substring(0, 40) + "..." : email.subject;
                
                row.innerHTML = `
                    <div style="width:36px; height:36px; border-radius:8px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:12px;">${iconEmail}</div>
                    <div style="flex-grow:1; min-width:0;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${email.name}</div>
                        <div style="font-size:12px; color:#5f6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${shortDesc}</div>
                    </div>
                    <div style="margin-left:8px;">${iconArrow}</div>
                `;
                // Ação: Vai para o detalhe
                row.onclick = () => showDetailView(email);

            } else {
                // Layout CR (Shortcode)
                const cleanName = item.key.replace(/_/g, ' ').replace('AS ', 'AS - ').replace('NI ', 'NI - ');
                
                row.innerHTML = `
                    <div style="width:36px; height:36px; border-radius:8px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:12px;">${iconBolt}</div>
                    <div style="flex-grow:1; min-width:0;">
                        <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px;">${cleanName}</div>
                        <div style="font-size:11px; color:#ea8600; font-family:monospace;">${item.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#dadce0; text-transform:uppercase;">APLICAR</div>
                `;
                // Ação: Executa direto (com animação)
                row.onclick = () => {
                    // Feedback visual
                    row.style.background = "#fff8e1";
                    setTimeout(() => row.style.background = "#fff", 200);
                    handleExecution(item.code, 'cr');
                };
            }

            // Hover Efeitos Genéricos
            row.onmouseenter = () => { 
                row.style.borderColor = item.type === 'cr' ? "#fbbc04" : "#1a73e8"; 
                row.style.transform = "translateY(-1px)";
                row.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
            };
            row.onmouseleave = () => { 
                row.style.borderColor = "#dadce0"; 
                row.style.transform = "translateY(0)";
                row.style.boxShadow = "0 1px 2px rgba(0,0,0,0.02)";
            };

            listContent.appendChild(row);
        });
    }

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        if (searchTerm !== "") {
            // Reseta visual das abas quando busca
            Array.from(tabsContainer.children).forEach(c => Object.assign(c.style, styleTabBtn));
        } else {
            renderTabs();
        }
        renderList();
    });

    // Init
    renderTabs();
    renderList();

    return toggleVisibility;
}