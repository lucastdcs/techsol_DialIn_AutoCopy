// src/modules/quick-email/quick-email-assistant.js

import {
    stylePopup,
} from "../shared/utils.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from '../shared/animations.js';
import { QUICK_EMAILS } from "./quick-email-data.js";
import { triggerProcessingAnimation } from "../shared/command-center.js";
import { SUBSTATUS_SHORTCODES } from '../notes/notes-data.js';
import { runQuickEmail, runEmailAutomation } from "../email/email-automation.js";

export function initQuickEmailAssistant() {
    const CURRENT_VERSION = "v4.2.0 CR-Hybrid"; 

    // --- ESTADO ---
    const CR_CATEGORY_KEY = 'CANNED_RESPONSES';
    
    let activeCategory = Object.keys(QUICK_EMAILS)[0];
    let searchTerm = "";
    let currentView = 'list';
    let visible = false;

    // --- 1. DESIGN SYSTEM & ESTILOS HD ---

    const COLORS = {
        bgApp: "#F8F9FA",
        bgSurface: "#FFFFFF",
        borderSubtle: "rgba(0, 0, 0, 0.08)",
        borderFocus: "rgba(26, 115, 232, 0.4)",
        textPrimary: "#202124",
        textSecondary: "#5F6368",
        primary: "#1A73E8",
        primaryBg: "#E8F0FE",
        shadowCard: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        shadowHover: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        transition: "all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"
    };

    const styleContainer = {
        display: "flex", flexDirection: "column", height: "100%", 
        position: "relative", overflow: "hidden",
        background: COLORS.bgApp
    };

    const styleNavView = {
        display: "flex", width: "200%", height: "100%", 
        transition: "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)", 
        transform: "translateX(0)", willChange: "transform"
    };

    const styleViewPage = {
        width: "50%", height: "100%", display: "flex", flexDirection: "column",
        overflow: "hidden", position: "relative"
    };

    // Barra de Ferramentas
    const styleToolbar = {
        padding: "20px 24px 12px 24px",
        flexShrink: "0", 
        background: COLORS.bgApp, 
        zIndex: "10",
        display: "flex", flexDirection: "column", gap: "16px",
        borderBottom: `1px solid ${COLORS.borderSubtle}`
    };

    // Input de Busca
    const styleSearchInput = {
        width: "100%", height: "44px",
        padding: "0 16px 0 48px",
        borderRadius: "12px", 
        border: `1px solid transparent`, 
        background: "#FFFFFF",
        fontSize: "14px", fontWeight: "400", color: COLORS.textPrimary,
        boxSizing: "border-box", outline: "none",
        transition: COLORS.transition,
        boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: "no-repeat", backgroundPosition: "16px center",
    };

    // Container de Abas (Chips) - CORRIGIDO: WRAP
    const styleTabs = {
        display: "flex", 
        flexWrap: "wrap", // Permite quebrar linha
        justifyContent: "center",
        gap: "8px",       // Espaço consistente
        paddingBottom: "4px",
        // Removido overflowX e maskImage pois agora usamos wrap
    };

    // Chip Individual
    const styleTabBtn = {
        padding: "6px 14px", // Levemente mais compacto para caber melhor
        borderRadius: "100px", 
        border: `1px solid #DADCE0`,
        background: "#FFFFFF", 
        color: COLORS.textSecondary, 
        fontSize: "13px", fontWeight: "500", letterSpacing: "0.3px",
        cursor: "pointer", transition: COLORS.transition, 
        flexShrink: "0", // Impede amassar
        display: "flex", alignItems: "center", justifyContent: "center"
    };

    // Chip Ativo
    const styleTabActive = {
        background: COLORS.primaryBg, 
        color: COLORS.primary, 
        borderColor: "transparent", 
        fontWeight: "600",
        boxShadow: "0 1px 2px rgba(26, 115, 232, 0.15)"
    };

    // Lista de Itens
    const styleListContent = {
        padding: "16px 24px 80px 24px", 
        overflowY: "auto", 
        flexGrow: "1",
        display: "flex", flexDirection: "column", gap: "12px"
    };

    // Cartão da Lista (Row) - CORRIGIDO: ALTURA FIXA
    const styleRow = {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", // Padding lateral apenas, altura define o vertical
        height: "72px",    // Altura Fixa para todos os itens (Email ou CR)
        minHeight: "72px", // Garante consistência
        borderRadius: "16px", 
        background: COLORS.bgSurface, 
        border: `1px solid transparent`, 
        boxShadow: COLORS.shadowCard,
        cursor: "pointer", transition: "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
        position: "relative", overflow: "hidden"
    };

    // --- CRIAÇÃO DO POPUP ---
    const popup = document.createElement("div");
    popup.id = "quick-email-popup";
    popup.classList.add("cw-module-window");

    Object.assign(popup.style, stylePopup, {
        right: "100px", width: "440px", height: "640px",
        borderRadius: "20px", 
        boxShadow: "0 24px 64px rgba(0,0,0,0.2)", 
        border: "1px solid rgba(255,255,255,0.4)"
    });

    const animRefs = { popup, googleLine: null, focusElement: null };

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-email');
        if (!visible) setTimeout(() => showListView(), 300);
    }

    // HEADER
    const header = createStandardHeader(
        popup, "Quick Email", CURRENT_VERSION,
        "Templates & Automações",
        animRefs, () => toggleVisibility()
    );

    // LAYOUT PRINCIPAL
    const mainContainer = document.createElement("div");
    Object.assign(mainContainer.style, styleContainer);
    
    const slider = document.createElement("div");
    Object.assign(slider.style, styleNavView);

    // --- PÁGINA 1: LISTA ---
    const pageList = document.createElement("div");
    Object.assign(pageList.style, styleViewPage);

    const toolbar = document.createElement("div");
    Object.assign(toolbar.style, styleToolbar);

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Pesquisar templates...";
    Object.assign(searchInput.style, styleSearchInput);
    
    searchInput.onfocus = () => { 
        searchInput.style.borderColor = COLORS.primary;
        searchInput.style.boxShadow = "0 0 0 4px rgba(26, 115, 232, 0.15)"; 
        searchInput.style.background = "#fff";
    };
    searchInput.onblur = () => { 
        searchInput.style.borderColor = "transparent";
        searchInput.style.boxShadow = "0 2px 5px rgba(0,0,0,0.03)"; 
        searchInput.style.background = "#fff";
    };
    animRefs.focusElement = searchInput;

    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, styleTabs);

    const listContent = document.createElement("div");
    Object.assign(listContent.style, styleListContent);

    toolbar.appendChild(searchInput);
    toolbar.appendChild(tabsContainer);
    pageList.appendChild(toolbar);
    pageList.appendChild(listContent);

    // --- PÁGINA 2: DETALHE ---
    const pageDetail = document.createElement("div");
    Object.assign(pageDetail.style, styleViewPage);
    
    const detailContent = document.createElement("div");
    Object.assign(detailContent.style, { 
        padding: "0", overflowY: "auto", flexGrow: "1", background: "#fff" 
    });
    pageDetail.appendChild(detailContent);

    slider.appendChild(pageList);
    slider.appendChild(pageDetail);
    mainContainer.appendChild(slider);
    popup.appendChild(header);
    popup.appendChild(mainContainer);
    document.body.appendChild(popup);

    // --- HANDLERS ---

    async function handleExecution(data, type) {
        try {
            if (visible) toggleVisibility(); 
            const finishLoading = triggerProcessingAnimation(); 

            await new Promise(resolve => setTimeout(resolve, 800)); 

            if (type === 'email') {
                await runQuickEmail(data);
            } else if (type === 'cr') {
                await runEmailAutomation(data);
            }

            finishLoading();
        } catch (error) {
            console.error("❌ Erro:", error);
            const elOverlay = document.querySelector('.cw-focus-backdrop');
            if (elOverlay) elOverlay.classList.remove('active');
        }
    }

    function showDetailView(email) {
        currentView = 'detail';
        slider.style.transform = "translateX(-50%)";
        
        const iconBack = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
        const iconSend = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

        detailContent.innerHTML = `
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${iconBack}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${email.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${email.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${email.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${iconSend} Usar Template
                </button>
            </div>
        `;
        
        const backBtn = detailContent.querySelector('#csa-back-btn');
        backBtn.onmouseenter = () => backBtn.style.background = "#f1f3f4";
        backBtn.onmouseleave = () => backBtn.style.background = "none";
        backBtn.onclick = showListView;

        const btn = detailContent.querySelector('#csa-insert-btn');
        btn.onmouseenter = () => { btn.style.transform = "translateY(-1px)"; btn.style.boxShadow = "0 6px 16px rgba(26,115,232,0.4)"; };
        btn.onmouseleave = () => { btn.style.transform = "translateY(0)"; btn.style.boxShadow = "0 4px 12px rgba(26,115,232,0.3)"; };
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
        const iconHTML = icon ? `<span style="margin-right:6px; font-size:14px; opacity:0.9;">${icon}</span>` : "";
        chip.innerHTML = `${iconHTML}${text}`;
        
        Object.assign(chip.style, styleTabBtn);
        
        if (activeCategory === key && searchTerm === "") {
            Object.assign(chip.style, styleTabActive);
        } else {
            chip.onmouseenter = () => { chip.style.background = "#F1F3F4"; chip.style.borderColor = "#DADCE0"; };
            chip.onmouseleave = () => { chip.style.background = "#FFFFFF"; chip.style.borderColor = "#DADCE0"; };
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
        tabsContainer.appendChild(createChip("Smart CRs", CR_CATEGORY_KEY, "⚡"));
        Object.keys(QUICK_EMAILS).forEach((catKey) => {
            tabsContainer.appendChild(createChip(QUICK_EMAILS[catKey].title, catKey));
        });
    }

    function renderList() {
        listContent.innerHTML = "";
        let itemsToRender = [];
        const isSearch = searchTerm.trim() !== "";

        if (isSearch) {
            const term = searchTerm.toLowerCase();
            Object.values(QUICK_EMAILS).forEach(cat => {
                cat.emails.forEach(email => {
                    if (email.name.toLowerCase().includes(term) || email.subject.toLowerCase().includes(term)) {
                        itemsToRender.push({ type: 'email', data: email });
                    }
                });
            });
            Object.entries(SUBSTATUS_SHORTCODES).forEach(([key, code]) => {
                if (!code) return;
                const cleanName = key.replace(/_/g, ' ');
                if (cleanName.toLowerCase().includes(term) || code.toLowerCase().includes(term)) {
                    itemsToRender.push({ type: 'cr', key: key, code: code });
                }
            });
        } else {
            if (activeCategory === CR_CATEGORY_KEY) {
                Object.entries(SUBSTATUS_SHORTCODES).forEach(([key, code]) => {
                    if (!code) return;
                    itemsToRender.push({ type: 'cr', key: key, code: code });
                });
            } else if (QUICK_EMAILS[activeCategory]) {
                QUICK_EMAILS[activeCategory].emails.forEach(email => {
                    itemsToRender.push({ type: 'email', data: email });
                });
            }
        }

        if (itemsToRender.length === 0) {
            listContent.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">🔍</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;
            return;
        }

        const iconEmail = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
        const iconBolt = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
        const iconArrow = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

        itemsToRender.forEach(item => {
            const row = document.createElement("div");
            Object.assign(row.style, styleRow);

            if (item.type === 'email') {
                const email = item.data;
                const shortDesc = email.subject.length > 45 ? email.subject.substring(0, 45) + "..." : email.subject;
                
                row.innerHTML = `
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${iconEmail}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${email.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${shortDesc}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${iconArrow}</div>
                `;
                row.onclick = () => showDetailView(email);
            } else {
                const cleanName = item.key.replace(/_/g, ' ').replace('AS ', 'AS - ').replace('NI ', 'NI - ');
                
                row.innerHTML = `
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${iconBolt}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${cleanName}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${item.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `;
                row.onclick = () => {
                    row.style.transform = "scale(0.98)";
                    row.style.background = "#FEF7E0";
                    setTimeout(() => { 
                        row.style.transform = "scale(1)"; 
                        row.style.background = "#fff"; 
                        handleExecution(item.code, 'cr');
                    }, 150);
                };
            }

            // Row Animations
            row.onmouseenter = () => { 
                row.style.transform = "translateY(-2px)";
                row.style.boxShadow = COLORS.shadowHover;
                if(item.type === 'cr') row.style.borderLeft = "3px solid #Fbbc04";
                else row.style.borderLeft = "3px solid #1a73e8";
            };
            row.onmouseleave = () => { 
                row.style.transform = "translateY(0)";
                row.style.boxShadow = COLORS.shadowCard;
                row.style.borderLeft = "1px solid transparent";
            };

            listContent.appendChild(row);
        });
    }

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        if (searchTerm !== "") {
            Array.from(tabsContainer.children).forEach(c => {
                Object.assign(c.style, styleTabBtn);
                c.style.opacity = "0.6";
            });
        } else {
            renderTabs();
        }
        renderList();
    });

    renderTabs();
    renderList();

    return toggleVisibility;
}