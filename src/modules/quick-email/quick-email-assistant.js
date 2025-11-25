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
    const CURRENT_VERSION = "v1.8"; // Versão com UI Ajustada e Lógica Sniper

    // --- ESTADO DO MÓDULO ---
    let activeCategory = Object.keys(QUICK_EMAILS)[0]; 
    let searchTerm = "";

    const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function simularCliqueReal(elemento) {
        const opts = { bubbles: true, cancelable: true, view: window };
        ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(evt => 
            elemento.dispatchEvent(new MouseEvent(evt, opts))
        );
    }

    async function applyEmailTemplate(template) {
        showToast(`Carregando: ${template.name}...`);
        const pageData = getPageData();
        let emailAberto = false;
        
        // 1. Lógica Sniper (Tenta clicar direto)
        const todosIcones = Array.from(document.querySelectorAll('i.material-icons-extended'));
        const iconeEmail = todosIcones.find(el => el.innerText.trim() === 'email');

        if (iconeEmail) {
            const botaoAlvo = iconeEmail.closest('material-button') || iconeEmail.closest('material-fab') || iconeEmail;
            if (botaoAlvo.style) {
                botaoAlvo.style.display = 'block';
                botaoAlvo.style.visibility = 'visible';
            }
            simularCliqueReal(botaoAlvo);
            emailAberto = true;
        } else {
            // Fallback Menu
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

        // Espera editor abrir
        let tentativas = 0;
        while (!document.getElementById('email-body-content-top-content') && tentativas < 15) {
            await esperar(500);
            tentativas++;
        }

        if (!document.getElementById('email-body-content-top-content')) {
             showToast("Erro: Editor de email não abriu.", { error: true });
             return;
        }

        // Descarte de rascunho
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

        // Limpeza e Inserção
        const divConteudoTexto = document.getElementById('email-body-content-top-content');
        const editorPai = document.querySelector('div[contenteditable="true"][aria-label="Email body"]') || divConteudoTexto;

        if (divConteudoTexto && editorPai) {
            const ancestral = editorPai.closest('[aria-hidden="true"]');
            if (ancestral) ancestral.removeAttribute('aria-hidden');

            editorPai.focus();
            simularCliqueReal(divConteudoTexto);
            await esperar(300); 
            
            // Limpeza usando a técnica de isolamento de ID
            const elementoSagrado = document.getElementById('cases-body-field');
            if (elementoSagrado) {
                while (elementoSagrado.nextSibling) elementoSagrado.nextSibling.remove();
                while (elementoSagrado.previousSibling) elementoSagrado.previousSibling.remove();
                
                const avo = divConteudoTexto.parentElement; 
                Array.from(avo.childNodes).forEach(tio => {
                    if (tio !== divConteudoTexto) avo.removeChild(tio);
                });

                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(elementoSagrado);
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('delete', false, null);

                // Assunto
                const subjectInput = document.querySelector('input[aria-label="Subject"]');
                if (subjectInput && template.subject) {
                    subjectInput.value = template.subject;
                    subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
                }

                // Substituição de Placeholders
                let finalBody = template.body;
                finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
                finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");

                document.execCommand('insertHTML', false, finalBody);
                showToast("Email preenchido com sucesso!", { duration: 2000 });
            }
        }
    }

    // --- ESTILOS DA UI ---
    const styleSearchInput = {
        width: "100%", padding: "10px 12px",
        borderRadius: "8px", border: "1px solid #dadce0", background: "#f8f9fa",
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
        padding: "12px", borderRadius: "8px", cursor: "pointer",
        transition: "background 0.1s", marginBottom: "4px",
        border: "none", background: "transparent", width: "100%", textAlign: "left"
    };

    // --- UI: Botão Flutuante ---
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
        position: "fixed", top: "50%", right: "24px", zIndex: "9999",
        display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px"
    });

    const btn = document.createElement("button");
    btn.id = "email-floating-btn";
    btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z"/></svg>`;
    Object.assign(btn.style, {
        width: "48px", height: "48px", borderRadius: "50%",
        background: "#ea4335", color: "white", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
    });
    btn.onmouseenter = () => { btn.style.transform = "scale(1.1)"; };
    btn.onmouseleave = () => { btn.style.transform = "scale(1)"; };
    btnContainer.appendChild(btn);
    document.body.appendChild(btnContainer);
    makeDraggable(btnContainer);

    // --- POPUP ---
    const popup = document.createElement("div");
    popup.id = "quick-email-popup";
    
    // CORREÇÃO: Largura aumentada para 420px
    Object.assign(popup.style, stylePopup, { 
        right: "100px", width: "max-content", borderRadius: "12px",
        display: "flex", flexDirection: "column", maxHeight: "600px"
    });

    // Header
    const header = document.createElement("div");
    Object.assign(header.style, stylePopupHeader, { padding: "16px", height: "auto", flexDirection: "column", alignItems: "stretch" });
    makeDraggable(popup, header);

    // Linha 1: Logo/Titulo
    const headerTop = document.createElement("div");
    Object.assign(headerTop.style, { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" });
    
    const headerLeft = document.createElement("div");
    Object.assign(headerLeft.style, { display: "flex", alignItems: "center", gap: "10px" });
    
    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "24px", height: "24px" });

    const titleContainer = document.createElement("div");
    Object.assign(titleContainer.style, { display: 'flex', flexDirection: 'column', flexGrow: '1' });
    const title = document.createElement("div");
    title.textContent = "Emails Rápidos";
    Object.assign(title.style, stylePopupTitle);
    const versionDisplay = document.createElement("div");
    versionDisplay.textContent = CURRENT_VERSION;
    Object.assign(versionDisplay.style, stylePopupVersion);
    titleContainer.appendChild(title);
    titleContainer.appendChild(versionDisplay);
    
    headerLeft.appendChild(logo);
    headerLeft.appendChild(titleContainer);

    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✕";
    Object.assign(closeBtn.style, stylePopupCloseBtn);
    closeBtn.onclick = () => togglePopup(false);
    
    headerTop.appendChild(headerLeft);
    headerTop.appendChild(closeBtn);
    header.appendChild(headerTop);

    // Linha 2: Busca
    const searchInput = document.createElement("input");
    searchInput.placeholder = "🔍 Filtrar emails...";
    Object.assign(searchInput.style, styleSearchInput);
    header.appendChild(searchInput);

    // Linha 3: Abas (Categorias)
    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, styleTabContainer);
    header.appendChild(tabsContainer);

    popup.appendChild(header);

    // Conteúdo
    const contentArea = document.createElement("div");
    Object.assign(contentArea.style, { padding: "8px", overflowY: "auto", flexGrow: "1" });
    popup.appendChild(contentArea);

    // Footer
    const footer = document.createElement("div");
    Object.assign(footer.style, { 
        padding: "8px 16px", borderTop: "1px solid #eee", 
        textAlign: "center", fontSize: "10px", color: "#9aa0a6"
    });
    footer.textContent = "created by lucaste@";
    popup.appendChild(footer);

    document.body.appendChild(popup);

    // --- RENDERIZAÇÃO ---
    function renderTabs() {
        tabsContainer.innerHTML = "";
        Object.keys(QUICK_EMAILS).forEach(catKey => {
            const catData = QUICK_EMAILS[catKey];
            const tabBtn = document.createElement("button");
            tabBtn.textContent = catData.title;
            Object.assign(tabBtn.style, styleTabButton);
            
            if (activeCategory === catKey && searchTerm === "") {
                Object.assign(tabBtn.style, styleActiveTab);
            }
            
            tabBtn.onclick = () => {
                activeCategory = catKey;
                searchTerm = "";
                searchInput.value = "";
                renderTabs();
                renderEmailList();
            };
            tabsContainer.appendChild(tabBtn);
        });
    }

    function renderEmailList() {
        contentArea.innerHTML = "";
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
            const empty = document.createElement("div");
            empty.textContent = "Nenhum email encontrado.";
            Object.assign(empty.style, { padding: "20px", textAlign: "center", color: "#999", fontSize: "13px" });
            contentArea.appendChild(empty);
            return;
        }

        emailsToShow.forEach(email => {
            const itemBtn = document.createElement("button");
            Object.assign(itemBtn.style, styleEmailItem);
            
            const textSpan = document.createElement("span");
            textSpan.textContent = email.name;
            Object.assign(textSpan.style, { fontSize: "13px", color: "#3c4043" });

            const iconSpan = document.createElement("span");
            iconSpan.textContent = "›";
            Object.assign(iconSpan.style, { fontSize: "18px", color: "#dadce0" });

            itemBtn.appendChild(textSpan);
            itemBtn.appendChild(iconSpan);
            
            itemBtn.onmouseenter = () => {
                itemBtn.style.background = "#f1f3f4";
                iconSpan.style.color = "#1a73e8";
            };
            itemBtn.onmouseleave = () => {
                itemBtn.style.background = "transparent";
                iconSpan.style.color = "#dadce0";
            };
            
            itemBtn.onclick = () => applyEmailTemplate(email);

            contentArea.appendChild(itemBtn);
        });
    }

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        renderTabs();
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