// src/modules/quick-email/quick-email-assistant.js

import {
    stylePopup,
    styleCredit,
} from "../shared/utils.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from '../shared/animations.js';
import { QUICK_EMAILS } from "./quick-email-data.js";
import { runQuickEmail } from "../email/email-automation.js";
import { triggerProcessingAnimation } from "../shared/command-center.js";

export function initQuickEmailAssistant() {
    const CURRENT_VERSION = "v4.0.0"; // Versão Master-Detail Final

    // --- ESTADO ---
    let activeCategory = Object.keys(QUICK_EMAILS)[0];
    let searchTerm = "";
    let currentView = 'list'; // 'list' ou 'detail'

    // --- 1. ESTILOS (Refinados) ---

    const styleContainer = {
        display: "flex", flexDirection: "column", height: "100%", position: "relative", overflow: "hidden",
        background: "#FAFAFA" // Fundo geral levemente cinza para destacar os cards brancos
    };

    const styleNavView = {
        display: "flex", width: "200%", height: "100%", // Slider
        transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)", // Apple Spring
        transform: "translateX(0)"
    };

    const styleViewPage = {
        width: "50%", height: "100%", display: "flex", flexDirection: "column",
        overflow: "hidden",
        position: "relative"
    };

    const styleSearchInput = {
        width: "100%", padding: "10px 12px 10px 36px",
        borderRadius: "8px", border: "none", background: "#F0F2F5",
        fontSize: "14px", color: "#202124", boxSizing: "border-box", outline: "none",
        transition: "all 0.2s ease",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: "no-repeat", backgroundPosition: "10px center",
    };

    const styleTabs = {
        display: "flex", gap: "6px", padding: "4px 4px 8px 4px",
        overflowX: "auto", scrollbarWidth: "none"
    };

    const styleTabBtn = {
        padding: "6px 12px", borderRadius: "16px", border: "1px solid transparent",
        background: "transparent", color: "#5f6368", fontSize: "12px", fontWeight: "500",
        cursor: "pointer", transition: "all 0.2s ease", flexShrink: "0"
    };

    const styleTabActive = {
        background: "#E8F0FE", color: "#1967D2", fontWeight: "600"
    };

    const styleEmailRow = {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px", marginBottom: "6px", borderRadius: "8px",
        background: "#fff", border: "1px solid #dadce0",
        cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
        position: "relative", overflow: "hidden"
    };

    // --- CRIAÇÃO DO POPUP ---
    let visible = false;
    const popup = document.createElement("div");
    popup.id = "quick-email-popup";

    Object.assign(popup.style, stylePopup, {
        right: "100px", width: "480px", height: "600px",
        boxShadow: "none", opacity: "0", pointerEvents: "none"
    });

    const animRefs = { popup, googleLine: null, focusElement: null };

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-email');
        if (!visible) setTimeout(() => showListView(), 300);
    }

    // HEADER
    const header = createStandardHeader(
        popup, "Emails Rápidos", CURRENT_VERSION,
        "Selecione, visualize e insira com um clique.",
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
        padding: "16px 16px 4px 16px",
        flexShrink: "0", background: "#fff", zIndex: "10",
        display: "flex", flexDirection: "column", gap: "8px",
        borderBottom: "1px solid #f1f3f4"
    });

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Buscar template...";
    Object.assign(searchInput.style, styleSearchInput);
    searchInput.onfocus = () => { searchInput.style.background = "#fff"; searchInput.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; };
    searchInput.onblur = () => { searchInput.style.background = "#F0F2F5"; searchInput.style.boxShadow = "none"; };
    animRefs.focusElement = searchInput;

    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, styleTabs);

    const listContent = document.createElement("div");
    Object.assign(listContent.style, { padding: "12px 16px", overflowY: "auto", flexGrow: "1" });

    toolbar.appendChild(searchInput);
    toolbar.appendChild(tabsContainer);
    pageList.appendChild(toolbar);
    pageList.appendChild(listContent);

    // --- PÁGINA 2: DETALHE ---
    const pageDetail = document.createElement("div");
    Object.assign(pageDetail.style, styleViewPage);
    const detailContent = document.createElement("div");
    Object.assign(detailContent.style, { padding: "0", overflowY: "auto", flexGrow: "1", background: "#fff" });
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
        padding: "8px 16px", borderTop: "1px solid #eee", textAlign: "center",
        fontSize: "10px", color: "#9aa0a6", background: "#fff", flexShrink: "0"
    });
    footer.textContent = "created by lucaste@";
    popup.appendChild(footer);

    document.body.appendChild(popup);

    // --- NAVEGAÇÃO ---
    function showDetailView(email) {
        currentView = 'detail';
        slider.style.transform = "translateX(-50%)";
        const iconBack = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
        const iconSendWhite = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

        detailContent.innerHTML = `
        <div style="
            position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
            border-bottom: 1px solid #f1f3f4; padding: 12px 20px; z-index: 10;
            display: flex; align-items: center; gap: 8px;
        ">
            <button id="csa-back-btn" style="
                background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content: center;
                color:#5f6368; width: 32px; height: 32px; margin-left:-8px; border-radius:50%; transition:background 0.2s;
            ">
                ${iconBack}
            </button>
            <div style="font-size:15px; font-weight:600; color:#202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${email.name}
            </div>
        </div>

        <div style="padding: 20px 20px 0 20px;">
            <div style="margin-bottom: 16px;">
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Assunto</div>
                <div style="font-size:13px; font-weight:500; color:#202124; padding: 10px; background: #F8F9FA; border-radius: 8px; border: 1px solid #eee;">
                    ${email.subject}
                </div>
            </div>
            
            <div>
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Mensagem</div>
                <div style="
                    font-size:13px; 
                    line-height:1.35; /* <--- AJUSTE DE ESPAÇAMENTO (Mais compacto) */
                    color:#3c4043; 
                    white-space: pre-wrap; 
                    padding: 0 4px;
                ">${email.body}</div>
            </div>
        </div>

        <div style="
            position: sticky; bottom: 0; left: 0; width: 100%; 
            padding: 20px; box-sizing: border-box;
            background: linear-gradient(to top, #ffffff 80%, rgba(255,255,255,0)); /* Fade out no topo */
            margin-top: auto; /* Empurra para o fim se sobrar espaço */
        ">
            <button id="csa-insert-btn" style="
                width: 100%; padding: 12px; 
                background: #1a73e8; color: white; border: none; border-radius: 8px; 
                font-weight: 600; font-size: 14px; cursor: pointer; 
                box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
                display: flex; align-items: center; justify-content: center; gap: 8px;
                transition: transform 0.1s, background 0.2s;
            ">
                ${iconSendWhite} Inserir Template
            </button>
        </div>
      `;
        const backBtn = detailContent.querySelector('#csa-back-btn');
        backBtn.onmouseover = () => backBtn.style.backgroundColor = "#f1f3f4";
        backBtn.onmouseout = () => backBtn.style.backgroundColor = "transparent";
        backBtn.onclick = showListView;
        const insertBtn = detailContent.querySelector('#csa-insert-btn');
        insertBtn.onmouseover = () => insertBtn.style.backgroundColor = "#174ea6";
        insertBtn.onmouseout = () => insertBtn.style.backgroundColor = "#1a73e8";
        insertBtn.onclick = async () => {
            console.log("🔍 DEBUG: Clique detectado");

            // Teste do Import
            console.log("🔍 DEBUG: triggerProcessingAnimation é:", typeof triggerProcessingAnimation);

            insertBtn.style.transform = "scale(0.96)";
            toggleVisibility();
            console.log("🔍 DEBUG: Janela fechada");

            try {
                console.log("🔍 DEBUG: Chamando animação...");
                const finishLoading = triggerProcessingAnimation();

                // Verifica se a função retornou algo (se retornou, é porque achou os elementos)
                console.log("🔍 DEBUG: finishLoading é:", typeof finishLoading);

                console.log("🔍 DEBUG: Iniciando espera de 1s...");
                await new Promise(resolve => setTimeout(resolve, 1000));

                console.log("🔍 DEBUG: Rodando lógica do email...");
                await runQuickEmail(email);

                console.log("🔍 DEBUG: Finalizando animação...");
                if (typeof finishLoading === 'function') {
                    finishLoading();
                } else {
                    console.error("❌ ERRO: finishLoading não é uma função! A animação falhou ao iniciar.");
                }

            } catch (error) {
                console.error("❌ ERRO NO PROCESSO:", error);
                // Tenta limpar mesmo assim
                const elOverlay = document.querySelector('.cw-focus-backdrop');
                if (elOverlay) elOverlay.classList.remove('active');
            }

            setTimeout(() => {
                insertBtn.style.transform = "scale(1)";
                if (typeof showListView === 'function') showListView();
            }, 300);
        }
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
            chip.textContent = catData.title;
            Object.assign(chip.style, styleTabBtn);
            if (activeCategory === catKey && searchTerm === "") Object.assign(chip.style, styleTabActive);
            chip.onclick = () => { activeCategory = catKey; searchTerm = ""; searchInput.value = ""; renderTabs(); renderEmailList(); };
            tabsContainer.appendChild(chip);
        });
    }

    function renderEmailList() {
        listContent.innerHTML = "";
        let emailsToShow = [];
        if (searchTerm.trim() !== "") {
            Object.values(QUICK_EMAILS).forEach((cat) => {
                const found = cat.emails.filter((e) => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
                emailsToShow = [...emailsToShow, ...found];
            });
        } else if (QUICK_EMAILS[activeCategory]) {
            emailsToShow = QUICK_EMAILS[activeCategory].emails;
        }

        if (emailsToShow.length === 0) {
            listContent.innerHTML = `<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px; margin-bottom:8px;">🔍</div><div style="font-size:14px;">Nenhum template encontrado.</div></div>`;
            return;
        }

        const iconSend = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
        const iconEye = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;

        emailsToShow.forEach((email) => {
            const row = document.createElement("div");
            Object.assign(row.style, styleEmailRow);
            const shortDesc = email.subject.length > 50 ? email.subject.substring(0, 50) + "..." : email.subject;
            row.innerHTML = `
        <div style="flex-grow: 1; margin-right: 12px; min-width: 0;">
            <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${email.name}</div>
            <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${shortDesc}</div>
        </div>
        <div style="display:flex; gap:6px;">
            <button class="action-btn view" title="Visualizar" style="width:32px; height:32px; border-radius:50%; border:none; background:#f1f3f4; color:#5f6368; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${iconEye}</button>
            <button class="action-btn send" title="Inserir Agora" style="width:32px; height:32px; border-radius:50%; border:none; background:#e8f0fe; color:#1a73e8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${iconSend}</button>
        </div>
      `;
            row.onmouseenter = () => { row.style.background = "#F8F9FA"; row.style.borderColor = "#1a73e8"; };
            row.onmouseleave = () => { row.style.background = "#fff"; row.style.borderColor = "#dadce0"; };

            const btnView = row.querySelector('.view');
            btnView.onclick = (e) => { e.stopPropagation(); showDetailView(email); };
            btnView.onmouseenter = () => { btnView.style.background = "#d2e3fc"; btnView.style.color = "#174ea6"; };
            btnView.onmouseleave = () => { btnView.style.background = "#f1f3f4"; btnView.style.color = "#5f6368"; };

            const btnSend = row.querySelector('.send');
            // ... (criação do botão acima) ...

            btnSend.onclick = async (e) => { 
                e.stopPropagation(); 
                
                // 1. Feedback Tátil
                btnSend.style.transform = "scale(0.9)"; 
                setTimeout(() => btnSend.style.transform = "scale(1)", 150); 
                
                // 2. Fecha a Janela IMEDIATAMENTE
                toggleVisibility(); 

                // 3. LIGA A ANIMAÇÃO (O passo que faltava)
                // Certifique-se que triggerProcessingAnimation está importado no topo deste arquivo!
                const finishLoading = triggerProcessingAnimation();

                try {
                    // 4. PAUSA DRAMÁTICA (800ms)
                    // Essencial para o usuário ver o loader antes do Gmail abrir
                    await new Promise(resolve => setTimeout(resolve, 800));

                    // 5. Executa o Email
                    await runQuickEmail(email);
                    
                    // 6. Finaliza (Check Verde)
                    finishLoading();

                } catch (err) {
                    console.error("Erro no envio rápido:", err);
                    finishLoading(); // Destrava em caso de erro
                }
            };
            
            // ... (os onmouseenter/leave continuam iguais) ...
            btnSend.onmouseenter = () => { btnSend.style.background = "#1a73e8"; btnSend.style.color = "#fff"; btnSend.style.boxShadow = "0 2px 6px rgba(26,115,232,0.3)"; };
            btnSend.onmouseleave = () => { btnSend.style.background = "#e8f0fe"; btnSend.style.color = "#1a73e8"; btnSend.style.boxShadow = "none"; };

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