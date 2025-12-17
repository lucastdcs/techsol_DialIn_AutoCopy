// src/modules/quick-email/quick-email-assistant.js

import {
    stylePopup,
} from "../shared/utils.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from '../shared/animations.js';
import { QUICK_EMAILS } from "./quick-email-data.js"; // Pode manter o nome do arquivo de dados ou renomear se preferir
import { runQuickEmail } from "../email/email-automation.js";
import { triggerProcessingAnimation } from "../shared/command-center.js";

export function initCRAssistant() { // Renomeado para refletir CR Assistant
    const CURRENT_VERSION = "v4.1.0 CR"; // Versão focada em CRs

    // --- ESTADO ---
    let activeCategory = Object.keys(QUICK_EMAILS)[0];
    let searchTerm = "";
    let currentView = 'list'; // 'list' ou 'detail'
    let visible = false;

    // --- 1. ESTILOS (Refinados: Apple Spring & Google Colors) ---

    const styleContainer = {
        display: "flex", 
        flexDirection: "column", 
        height: "100%", 
        position: "relative", 
        overflow: "hidden",
        background: "#FAFAFA"
    };

    const styleNavView = {
        display: "flex", 
        width: "200%", 
        height: "100%", 
        transition: "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)", // Apple Spring
        transform: "translateX(0)",
        willChange: "transform"
    };

    const styleViewPage = {
        width: "50%", 
        height: "100%", 
        display: "flex", 
        flexDirection: "column",
        overflow: "hidden",
        position: "relative"
    };

    const styleSearchInput = {
        width: "100%", 
        padding: "12px 12px 12px 40px", // Um pouco mais alto para facilidade de toque
        borderRadius: "12px", // Bordas mais arredondadas (estilo iOS Moderno)
        border: "1px solid transparent", 
        background: "#F0F2F5",
        fontSize: "14px", 
        color: "#202124", 
        boxSizing: "border-box", 
        outline: "none",
        transition: "all 0.2s ease",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: "no-repeat", 
        backgroundPosition: "12px center",
    };

    const styleTabs = {
        display: "flex", 
        gap: "8px", 
        padding: "8px 4px 12px 4px",
        overflowX: "auto", 
        scrollbarWidth: "none"
    };

    const styleTabBtn = {
        padding: "6px 14px", 
        borderRadius: "20px", 
        border: "1px solid #dadce0", // Borda sutil para parecer "Tags"
        background: "#fff", 
        color: "#5f6368", 
        fontSize: "12px", 
        fontWeight: "500",
        cursor: "pointer", 
        transition: "all 0.2s ease", 
        flexShrink: "0"
    };

    const styleTabActive = {
        background: "#E8F0FE", 
        color: "#1967D2",      
        borderColor: "#E8F0FE",
        fontWeight: "600"
    };

    const styleCRRow = {
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        padding: "14px 16px", 
        marginBottom: "8px", 
        borderRadius: "12px", // Cards mais modernos
        background: "#fff", 
        border: "1px solid #dadce0",
        cursor: "pointer", 
        transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
        position: "relative", 
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
    };

    // --- CRIAÇÃO DO POPUP ---
    const popup = document.createElement("div");
    popup.id = "cr-assistant-popup"; // ID atualizado
    popup.classList.add("cw-module-window");

    Object.assign(popup.style, stylePopup, {
        right: "100px", 
        width: "480px", 
        height: "600px",
        transition: "width 0.3s ease, height 0.3s ease" 
    });

    const animRefs = { popup, googleLine: null, focusElement: null };

    function toggleVisibility() {
        visible = !visible;
        // Assume que existe um botão com ID 'cw-btn-cr' ou mantém 'cw-btn-email'
        toggleGenieAnimation(visible, popup, 'cw-btn-email'); 
        if (!visible) setTimeout(() => showListView(), 300);
    }

    // HEADER (Atualizado para "Smart CRs")
    const header = createStandardHeader(
        popup, "Smart CRs", CURRENT_VERSION,
        "Biblioteca de Respostas Prontas (Canned Responses)",
        animRefs, () => toggleVisibility()
    );

    // CONTAINER PRINCIPAL
    const mainContainer = document.createElement("div");
    Object.assign(mainContainer.style, styleContainer);
    
    const slider = document.createElement("div");
    Object.assign(slider.style, styleNavView);

    // --- PÁGINA 1: LISTA (CR CATALOG) ---
    const pageList = document.createElement("div");
    Object.assign(pageList.style, styleViewPage);

    const toolbar = document.createElement("div");
    Object.assign(toolbar.style, {
        padding: "20px 20px 4px 20px", // Mais respiro
        flexShrink: "0", 
        background: "#fff", 
        zIndex: "10",
        display: "flex", 
        flexDirection: "column", 
        gap: "10px",
        borderBottom: "1px solid #f1f3f4"
    });

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Buscar CR por nome ou assunto...";
    Object.assign(searchInput.style, styleSearchInput);
    
    // Efeito de foco mais "Apple"
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
    Object.assign(listContent.style, { 
        padding: "16px 20px", 
        overflowY: "auto", 
        flexGrow: "1" 
    });

    toolbar.appendChild(searchInput);
    toolbar.appendChild(tabsContainer);
    pageList.appendChild(toolbar);
    pageList.appendChild(listContent);

    // --- PÁGINA 2: DETALHE (CR PREVIEW) ---
    const pageDetail = document.createElement("div");
    Object.assign(pageDetail.style, styleViewPage);
    
    const detailContent = document.createElement("div");
    Object.assign(detailContent.style, { 
        padding: "0", 
        overflowY: "auto", 
        flexGrow: "1", 
        background: "#fff" 
    });
    pageDetail.appendChild(detailContent);

    // Montagem
    slider.appendChild(pageList);
    slider.appendChild(pageDetail);
    mainContainer.appendChild(slider);
    popup.appendChild(header);
    popup.appendChild(mainContainer);

    // Footer
    const footer = document.createElement("div");
    Object.assign(footer.style, {
        padding: "10px 16px", 
        borderTop: "1px solid #eee", 
        textAlign: "center",
        fontSize: "11px", 
        color: "#9aa0a6", 
        background: "#fff", 
        flexShrink: "0",
        fontFamily: "monospace" // Estilo tech
    });
    footer.textContent = "CR MANAGER SYSTEM • BY LUCASTE@";
    popup.appendChild(footer);

    document.body.appendChild(popup);

    // --- FUNÇÕES DE NAVEGAÇÃO E LÓGICA ---

    async function handleExecution(email, finishCallback) {
        try {
            if (visible) toggleVisibility();
            const finishLoading = triggerProcessingAnimation();
            
            // Simula o tempo de "Fetching CR..."
            await new Promise(resolve => setTimeout(resolve, 800));
            
            await runQuickEmail(email);
            finishLoading();
        } catch (error) {
            console.error("❌ Erro ao aplicar CR:", error);
            const elOverlay = document.querySelector('.cw-focus-backdrop');
            if (elOverlay) elOverlay.classList.remove('active');
        } finally {
            if (finishCallback) finishCallback();
        }
    }

    function showDetailView(email) {
        currentView = 'detail';
        slider.style.transform = "translateX(-50%)";
        
        const iconBack = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
        const iconCheck = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

        detailContent.innerHTML = `
        <style>
            .cw-cr-content p { margin: 0 0 10px 0 !important; line-height: 1.6 !important; }
            .cw-cr-content br { display: block; content: ""; margin-top: 0; }
        </style>

        <div style="
            position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
            border-bottom: 1px solid #f1f3f4; padding: 16px 20px; z-index: 10;
            display: flex; align-items: center; gap: 12px;
        ">
            <button id="csa-back-btn" style="
                background: #f1f3f4; border:none; cursor:pointer; display:flex; align-items:center; justify-content: center;
                color:#5f6368; width: 36px; height: 36px; border-radius:50%; transition:all 0.2s;
            ">
                ${iconBack}
            </button>
            <div style="flex-grow:1;">
                <div style="font-size:10px; font-weight:700; color:#9aa0a6; text-transform:uppercase; letter-spacing:0.5px;">Visualizando CR</div>
                <div style="font-size:16px; font-weight:600; color:#202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width:320px;">
                    ${email.name}
                </div>
            </div>
        </div>

        <div style="padding: 24px 24px 0 24px;">
            <div style="margin-bottom: 20px;">
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto (Subject)</div>
                <div style="font-size:14px; font-weight:400; color:#202124; padding: 12px 16px; background: #fff; border-radius: 8px; border: 1px solid #dadce0; box-shadow: inset 0 1px 2px rgba(0,0,0,0.03);">
                    ${email.subject}
                </div>
            </div>
            
            <div>
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Corpo (Body)</div>
                <div class="cw-cr-content" style="
                    font-size:13px; color:#3c4043; white-space: normal; padding: 16px;
                    background: #f8f9fa; border-radius: 8px; border: 1px dashed #dadce0;
                ">
                    ${email.body}
                </div>
            </div>
        </div>

        <div style="
            position: sticky; bottom: 0; left: 0; width: 100%; 
            padding: 20px; box-sizing: border-box;
            background: linear-gradient(to top, #ffffff 90%, rgba(255,255,255,0)); 
            margin-top: auto; display: flex; flex-direction: column; gap: 8px;
        ">
            <button id="csa-insert-btn" style="
                width: 100%; padding: 14px; 
                background: #1a73e8; color: white; border: none; border-radius: 12px; 
                font-weight: 600; font-size: 14px; cursor: pointer; 
                box-shadow: 0 4px 12px rgba(26, 115, 232, 0.25);
                display: flex; align-items: center; justify-content: center; gap: 8px;
                transition: transform 0.1s, background 0.2s;
            ">
                ${iconCheck} Aplicar esta CR
            </button>
        </div>
      `;
      
        const backBtn = detailContent.querySelector('#csa-back-btn');
        backBtn.onclick = showListView;
        backBtn.onmouseenter = () => backBtn.style.background = "#e8eaed";
        backBtn.onmouseleave = () => backBtn.style.background = "#f1f3f4";

        const insertBtn = detailContent.querySelector('#csa-insert-btn');
        insertBtn.onmouseover = () => insertBtn.style.backgroundColor = "#174ea6";
        insertBtn.onmouseout = () => insertBtn.style.backgroundColor = "#1a73e8";
        
        insertBtn.onclick = () => {
            insertBtn.style.transform = "scale(0.96)";
            handleExecution(email, () => {
                setTimeout(() => {
                    insertBtn.style.transform = "scale(1)";
                    showListView(); 
                }, 300);
            });
        };
    }

    function showListView() {
        currentView = 'list';
        slider.style.transform = "translateX(0)";
    }

    // --- RENDERIZAÇÃO DA LISTA ---
    function renderTabs() {
        tabsContainer.innerHTML = "";
        Object.keys(QUICK_EMAILS).forEach((catKey) => {
            const catData = QUICK_EMAILS[catKey];
            const chip = document.createElement("button");
            chip.textContent = catData.title; // Ex: "Projetos", "Financeiro"
            Object.assign(chip.style, styleTabBtn);
            if (activeCategory === catKey && searchTerm === "") Object.assign(chip.style, styleTabActive);
            
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
        
        // Lógica de busca refinada
        if (searchTerm.trim() !== "") {
            Object.values(QUICK_EMAILS).forEach((cat) => {
                const found = cat.emails.filter((e) => 
                    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    e.subject.toLowerCase().includes(searchTerm.toLowerCase())
                );
                emailsToShow = [...emailsToShow, ...found];
            });
        } else if (QUICK_EMAILS[activeCategory]) {
            emailsToShow = QUICK_EMAILS[activeCategory].emails;
        }

        if (emailsToShow.length === 0) {
            listContent.innerHTML = `
                <div style="text-align:center; padding:80px 20px; color:#9aa0a6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">📂</div>
                    <div style="font-size:15px; font-weight:500;">Nenhuma CR encontrada</div>
                    <div style="font-size:12px; margin-top:4px;">Tente buscar por outro termo.</div>
                </div>`;
            return;
        }

        const iconArrow = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
        const iconDoc = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;

        emailsToShow.forEach((email) => {
            const row = document.createElement("div");
            Object.assign(row.style, styleCRRow);
            const shortDesc = email.subject.length > 45 ? email.subject.substring(0, 45) + "..." : email.subject;
            
            row.innerHTML = `
                <div style="
                    width:36px; height:36px; border-radius:8px; background:#E8F0FE; 
                    display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:14px;
                ">
                    ${iconDoc}
                </div>
                <div style="flex-grow: 1; min-width: 0;">
                    <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${email.name}
                    </div>
                    <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${shortDesc}
                    </div>
                </div>
                <div style="margin-left:8px;">${iconArrow}</div>
            `;
            
            row.onmouseenter = () => { 
                row.style.background = "#fff"; 
                row.style.borderColor = "#1a73e8"; 
                row.style.boxShadow = "0 4px 12px rgba(26,115,232,0.1)";
                row.style.transform = "translateY(-1px)";
            };
            row.onmouseleave = () => { 
                row.style.background = "#fff"; 
                row.style.borderColor = "#dadce0"; 
                row.style.boxShadow = "0 1px 2px rgba(0,0,0,0.02)";
                row.style.transform = "translateY(0)";
            };

            row.onclick = () => showDetailView(email);
            listContent.appendChild(row);
        });
    }

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        if (searchTerm !== "") Array.from(tabsContainer.children).forEach(c => Object.assign(c.style, styleTabBtn));
        else renderTabs();
        renderEmailList();
    });

    renderTabs();
    renderEmailList();
    return toggleVisibility;
}