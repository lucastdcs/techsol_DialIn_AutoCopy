// src/modules/quick-email/quick-email-assistant.js

import { 
    makeDraggable,
    stylePopup,
    stylePopupHeader,
    stylePopupTitle,
    stylePopupCloseBtn,
    styleFloatingButton,
    stylePopupVersion,
    styleCredit,
    styleButtonBase,
    styleLabel,
    showToast
} from '../shared/utils.js';

import { QUICK_EMAILS } from './quick-email-data.js';
import { getPageData } from '../shared/page-data.js';

export function initQuickEmailAssistant() {
    const CURRENT_VERSION = "v2.1"; 

    // --- ESTADO DO MÓDULO ---
    let activeCategory = Object.keys(QUICK_EMAILS)[0]; 
    let searchTerm = "";

    // --- UTILITÁRIOS ---
    const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function simularCliqueReal(elemento) {
        const opts = { bubbles: true, cancelable: true, view: window };
        ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(evt => 
            elemento.dispatchEvent(new MouseEvent(evt, opts))
        );
    }

    // --- LÓGICA DE APLICAÇÃO ---
    async function applyEmailTemplate(template) {
        showToast(`Carregando: ${template.name}...`);
        
        // CORREÇÃO 1: Captura os dados da página ANTES de tudo
        const pageData = getPageData(); 
        console.log("Dados capturados:", pageData);

        let emailAberto = false;
        
        // 1. Tenta achar ícone de email
        const todosIcones = Array.from(document.querySelectorAll('i.material-icons-extended'));
        const iconeEmail = todosIcones.find(el => el.innerText.trim() === 'email');

        if (iconeEmail) {
            console.log("⚡ Modo Rápido: Ícone encontrado.");
            const botaoAlvo = iconeEmail.closest('material-button') || iconeEmail.closest('material-fab') || iconeEmail;
            
            if (botaoAlvo.style) {
                botaoAlvo.style.display = 'block';
                botaoAlvo.style.visibility = 'visible';
            }
            simularCliqueReal(botaoAlvo);
            emailAberto = true;
        } else {
            console.log("⚠️ Modo Menu: Tentando abrir SpeedDial.");
            const speedDial = document.querySelector('material-fab-speed-dial');
            if (speedDial) {
                const triggerBtn = speedDial.querySelector('.trigger');
                if (triggerBtn) {
                    triggerBtn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                    simularCliqueReal(triggerBtn);
                    await esperar(800);
                    
                    const iconesNovos = Array.from(document.querySelectorAll('i.material-icons-extended'));
                    const emailBtnNovo = iconesNovos.find(el => el.innerText.trim() === 'email');
                    if (emailBtnNovo) {
                        simularCliqueReal(emailBtnNovo);
                        emailAberto = true;
                    }
                } else {
                    speedDial.click();
                }
            }
        }

        let tentativas = 0;
        while (!document.getElementById('email-body-content-top-content') && tentativas < 15) {
            await esperar(500);
            tentativas++;
        }

        if (!document.getElementById('email-body-content-top-content')) {
             showToast("Erro: Editor de email não abriu.", { error: true });
             return;
        }

        const btnDiscardDraft = document.querySelector('material-button[debug-id="discard-prewrite-draft-button"]');
        if (btnDiscardDraft) {
            simularCliqueReal(btnDiscardDraft);
            await esperar(800);
            const btnConfirm = document.querySelector('material-button[debug-id="confirm-button"]');
            if (btnConfirm) {
                simularCliqueReal(btnConfirm);
                await esperar(1500);
            }
        }

        const divConteudoTexto = document.getElementById('email-body-content-top-content');
        const editorPai = document.querySelector('div[contenteditable="true"][aria-label="Email body"]') || divConteudoTexto;

        if (divConteudoTexto && editorPai) {
            // Destrava
            const ancestral = editorPai.closest('[aria-hidden="true"]');
            if (ancestral) ancestral.removeAttribute('aria-hidden');

            editorPai.focus();
            simularCliqueReal(divConteudoTexto);
            await esperar(300); 

            // Limpeza Segura (via Select All)
            document.execCommand('selectAll', false, null);
            document.execCommand('delete', false, null);

            const subjectInput = document.querySelector('input[aria-label="Subject"]');
            if (subjectInput && template.subject) {
                subjectInput.value = template.subject;
                subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
            }

            // Substituição de Placeholders
            let finalBody = template.body;
            // Usa dados capturados (com fallback)
            finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
            finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");

            document.execCommand('insertHTML', false, finalBody);
            
            showToast("Email preenchido com sucesso!", { duration: 2000 });
        }
    }

    // --- ESTILOS EXTRAS ---
    const styleSearchInput = {
        width: "100%", padding: "10px 12px 10px 36px",
        borderRadius: "8px", border: "1px solid #f1f3f4", background: "#f8f9fa",
        fontSize: "14px", boxSizing: "border-box", outline: "none",
        color: "#3c4043", transition: "background 0.2s, border-color 0.2s",
        marginBottom: "8px"
    };

    const styleTabContainer = {
        display: "flex", gap: "8px", overflowX: "auto", 
        paddingBottom: "8px", marginTop: "0",
        borderBottom: "1px solid #dadce0", scrollbarWidth: "none"
    };

    const styleTabButton = {
        padding: "6px 12px", borderRadius: "16px", border: "1px solid #dadce0",
        background: "transparent", color: "#5f6368", fontSize: "12px",
        fontWeight: "500", cursor: "pointer", whiteSpace: "nowrap",
        transition: "all 0.2s ease"
    };

    const styleActiveTab = {
        background: "#e8f0fe", color: "#1967d2", borderColor: "#e8f0fe", fontWeight: "600"
    };

    const styleEmailItem = {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 12px", borderRadius: "8px", cursor: "pointer",
        transition: "background 0.1s", marginBottom: "4px",
        border: "none", background: "transparent", width: "100%", textAlign: "left"
    };

    // --- UI: Botão Flutuante ---
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
        position: "fixed", top: "25%", right: "24px", zIndex: "9999",
        display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px"
    });

    const btn = document.createElement("button");
    btn.id = "email-floating-btn";
    btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z"/></svg>`;

    Object.assign(btn.style, {
        width: "48px", height: "48px", borderRadius: "50%",
        background: "#ea4335", color: "white", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 12px rgba(234, 67, 53, 0.4)",
        transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s"
    });

    const tooltip = document.createElement("span");
    tooltip.textContent = "Quick Email";
    Object.assign(tooltip.style, {
        background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 8px",
        borderRadius: "4px", fontSize: "12px", opacity: "0", pointerEvents: "none",
        transition: "opacity 0.2s", whiteSpace: "nowrap", fontWeight: "500"
    });

    btn.onmouseenter = () => {
        btn.style.transform = "scale(1.1)";
        btn.style.boxShadow = "0 6px 16px rgba(234, 67, 53, 0.5)";
        tooltip.style.opacity = "1";
    };
    btn.onmouseleave = () => {
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "0 4px 12px rgba(234, 67, 53, 0.4)";
        tooltip.style.opacity = "0";
    };

    btnContainer.appendChild(btn);
    btnContainer.appendChild(tooltip);
    document.body.appendChild(btnContainer);
    makeDraggable(btnContainer);

    // --- POPUP ---
    const popup = document.createElement("div");
    popup.id = "quick-email-popup";
    // CORREÇÃO 2: Largura fixa para evitar problemas visuais
    Object.assign(popup.style, stylePopup, { 
        right: "100px", width: "420px", borderRadius: "12px",
        display: "flex", flexDirection: "column", maxHeight: "600px"
    });

    // Header
    const header = document.createElement("div");
    Object.assign(header.style, stylePopupHeader, { padding: "16px", height: "auto", flexDirection: "column", alignItems: "stretch" });
    makeDraggable(popup, header);

    // Linha 1: Logo/Titulo
    const headerTopRow = document.createElement("div");
    Object.assign(headerTopRow.style, { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" });
    
    const headerLeft = document.createElement("div");
    Object.assign(headerLeft.style, { display: "flex", alignItems: "center", gap: "12px" });

    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "24px", height: "24px" });

    const titleContainer = document.createElement("div");
    Object.assign(titleContainer.style, { display: 'flex', flexDirection: 'column' });
    const title = document.createElement("div");
    title.textContent = "Emails Rápidos";
    Object.assign(title.style, stylePopupTitle, { fontSize: "16px", lineHeight: "1.2" });
    const versionDisplay = document.createElement("div");
    versionDisplay.textContent = CURRENT_VERSION;
    Object.assign(versionDisplay.style, stylePopupVersion);
    
    titleContainer.appendChild(title);
    titleContainer.appendChild(versionDisplay);
    headerLeft.appendChild(logo);
    headerLeft.appendChild(titleContainer);

    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✕";
    Object.assign(closeBtn.style, stylePopupCloseBtn, { fontSize: "14px", color: "#5f6368" });
    closeBtn.onclick = () => togglePopup(false);

    headerTopRow.appendChild(headerLeft);
    headerTopRow.appendChild(closeBtn);
    header.appendChild(headerTopRow);

    // Linha 2: Busca
    const searchInput = document.createElement("input");
    searchInput.placeholder = "🔍 Filtrar emails...";
    Object.assign(searchInput.style, styleSearchInput);
    header.appendChild(searchInput);

    // Linha 3: Abas
    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, styleTabContainer);
    header.appendChild(tabsContainer);

    popup.appendChild(header);

    const content = document.createElement("div");
    Object.assign(content.style, { padding: "16px", overflowY: "auto", maxHeight: "400px", flexGrow: "1" });
    popup.appendChild(content);

    const footer = document.createElement("div");
    Object.assign(footer.style, { 
        padding: "8px 16px", borderTop: "1px solid #eee", 
        textAlign: "center", fontSize: "10px", color: "#9aa0a6"
    });
    footer.textContent = "created by lucaste@";
    popup.appendChild(footer);

    document.body.appendChild(popup);

    function renderTabs() {
        tabsContainer.innerHTML = "";
        Object.keys(QUICK_EMAILS).forEach(catKey => {
            const catData = QUICK_EMAILS[catKey];
            const btn = document.createElement("button");
            btn.textContent = catData.title;
            Object.assign(btn.style, styleTabButton);
            if (activeCategory === catKey && searchTerm === "") {
                Object.assign(btn.style, styleActiveTab);
            }
            btn.onclick = () => {
                activeCategory = catKey;
                searchTerm = ""; 
                searchInput.value = "";
                renderTabs(); 
                renderEmailList();
            };
            tabsContainer.appendChild(btn);
        });
    }

    function renderEmailList() {
        content.innerHTML = ""; // CORREÇÃO: Usando 'content' em vez de 'contentArea'
        let emailsToShow = [];

        if (searchTerm.trim() !== "") {
            Object.values(QUICK_EMAILS).forEach(cat => {
                const found = cat.emails.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
                emailsToShow = [...emailsToShow, ...found];
            });
        } else {
            if (QUICK_EMAILS[activeCategory]) {
                emailsToShow = QUICK_EMAILS[activeCategory].emails;
            }
        }

        if (emailsToShow.length === 0) {
            const emptyState = document.createElement("div");
            emptyState.textContent = "Nenhum template encontrado.";
            Object.assign(emptyState.style, { 
                textAlign: "center", padding: "20px", color: "#9aa0a6", fontSize: "13px" 
            });
            content.appendChild(emptyState);
            return;
        }

        emailsToShow.forEach(email => {
            const btn = document.createElement("button");
            Object.assign(btn.style, styleEmailItem);

            const textSpan = document.createElement("span");
            textSpan.textContent = email.name;
            Object.assign(textSpan.style, { fontSize: "13px", color: "#3c4043", fontWeight: "400" });
            
            const iconSpan = document.createElement("span");
            iconSpan.textContent = "›"; 
            Object.assign(iconSpan.style, { fontSize: "18px", color: "#dadce0", fontWeight: "300" });

            btn.appendChild(textSpan);
            btn.appendChild(iconSpan);

            btn.onmouseenter = () => {
                btn.style.background = "#f1f3f4";
                iconSpan.style.color = "#1a73e8"; 
            };
            btn.onmouseleave = () => {
                btn.style.background = "transparent";
                iconSpan.style.color = "#dadce0";
            };
            btn.onclick = () => applyEmailTemplate(email);

            content.appendChild(btn);
        });
    }

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        if (searchTerm !== "") {
            Array.from(tabsContainer.children).forEach(child => {
                child.style.background = "transparent";
                child.style.color = "#5f6368";
                child.style.borderColor = "#dadce0";
            });
        } else {
            renderTabs();
        }
        renderEmailList();
    });

    function togglePopup(show) {
        if (show) {
            popup.style.opacity = "1";
            popup.style.pointerEvents = "auto";
            popup.style.transform = "scale(1)";
            searchInput.focus(); 
        } else {
            popup.style.opacity = "0";
            popup.style.pointerEvents = "none";
            popup.style.transform = "scale(0.95)";
        }
    }

    let visible = false;
    btn.onclick = () => {
        visible = !visible;
        togglePopup(visible);
    };

    renderTabs();
    renderEmailList();
}