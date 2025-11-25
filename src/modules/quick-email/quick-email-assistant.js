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
    showToast
} from '../shared/utils.js';

import { QUICK_EMAILS } from './quick-email-data.js';
import { getPageData } from '../shared/page-data.js';

export function initQuickEmailAssistant() {
    const CURRENT_VERSION = "v2.0 (Material)"; 

    // --- ESTADO DO MÓDULO ---
    let activeCategory = Object.keys(QUICK_EMAILS)[0]; // Primeira categoria ativa por padrão
    let searchTerm = "";

    // --- UTILITÁRIOS ---
    const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function simularCliqueReal(elemento) {
        const opts = { bubbles: true, cancelable: true, view: window };
        ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(evt => 
            elemento.dispatchEvent(new MouseEvent(evt, opts))
        );
    }

    // --- LÓGICA DE APLICAÇÃO (Mantida a Lógica Sniper Sólida) ---
    async function applyEmailTemplate(template) {
        showToast(`Carregando: ${template.name}...`);
        
        const pageData = getPageData();
        let emailAberto = false;
        
        // 1. Tenta achar ícone de email visível ou no DOM
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
            // Fallback: Menu SpeedDial
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

        // Aguarda carregamento do editor
        let tentativas = 0;
        while (!document.getElementById('email-body-content-top-content') && tentativas < 10) {
            await esperar(500);
            tentativas++;
        }

        if (!document.getElementById('email-body-content-top-content')) {
             showToast("Erro: Editor de email não abriu.", { error: true });
             return;
        }

        // Verifica rascunho pendente
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
            editorPai.focus();
            simularCliqueReal(divConteudoTexto);
            await esperar(300); 

            // Limpeza Agressiva
            document.execCommand('selectAll', false, null);
            document.execCommand('delete', false, null);

            // Inserção Assunto
            const subjectInput = document.querySelector('input[aria-label="Subject"]');
            if (subjectInput && template.subject) {
                subjectInput.value = template.subject;
                subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
            }

            // Tratamento do Template
            let finalBody = template.body;
            finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
            finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");

            // Inserção Corpo
            document.execCommand('insertHTML', false, finalBody);
            
            showToast("Email preenchido com sucesso!", { duration: 2000 });
        }
    }

    // --- ESTILOS EXTRAS (Material UI) ---
    const styleSearchInput = {
        width: "100%", padding: "10px 12px 10px 36px", // Padding left para o ícone
        borderRadius: "8px", border: "none", background: "#f1f3f4",
        fontSize: "14px", boxSizing: "border-box", outline: "none",
        color: "#3c4043", marginBottom: "12px", transition: "background 0.2s"
    };

    const styleTabContainer = {
        display: "flex", gap: "8px", overflowX: "auto", 
        paddingBottom: "8px", marginBottom: "8px",
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

    // --- MONTAGEM DA UI ---
    
  // --- UI: Botão Flutuante (Material Design Pro) ---
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
        position: "fixed", top: "25%", right: "24px", zIndex: "9999",
        display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px"
    });

    const btn = document.createElement("button");
    btn.id = "email-floating-btn";
    // Ícone SVG: Zap/Email
    btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z"/></svg>`;

    Object.assign(btn.style, {
        width: "48px", height: "48px", borderRadius: "50%",
        background: "#ea4335", color: "white", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 12px rgba(234, 67, 53, 0.4)", // Sombra avermelhada
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
    makeDraggable(btn, btnContainer);

    // Popup Container
    const popup = document.createElement("div");
    popup.id = "quick-email-popup";
    Object.assign(popup.style, stylePopup, { 
        right: "100px", width: "340px", borderRadius: "12px",
        display: "flex", flexDirection: "column", maxHeight: "550px"
    });

    // Header
    const header = document.createElement("div");
    Object.assign(header.style, stylePopupHeader, { padding: "16px 16px 8px 16px", borderBottom: "none" });
    makeDraggable(popup, header);

    // Título e Ícone Google
    const headerTop = document.createElement("div");
    Object.assign(headerTop.style, { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "12px" });
    
    const titleGroup = document.createElement("div");
    Object.assign(titleGroup.style, { display: "flex", alignItems: "center", gap: "8px" });
    
    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "20px", height: "20px" });
    
    const titleText = document.createElement("span");
    titleText.textContent = "Quick Email";
    Object.assign(titleText.style, stylePopupTitle, { fontSize: "16px" });

    const closeIcon = document.createElement("div");
    closeIcon.textContent = "✕";
    Object.assign(closeIcon.style, stylePopupCloseBtn, { fontSize: "14px", color: "#5f6368" });
    closeIcon.onclick = () => togglePopup(false);

    titleGroup.appendChild(logo);
    titleGroup.appendChild(titleText);
    headerTop.appendChild(titleGroup);
    headerTop.appendChild(closeIcon);
    header.appendChild(headerTop);

    // Barra de Pesquisa (Dentro do Header para não scrollar)
    const searchContainer = document.createElement("div");
    Object.assign(searchContainer.style, { position: "relative", width: "100%" });
    
    const searchIcon = document.createElement("span");
    searchIcon.innerHTML = "🔍"; // Ou SVG se preferir
    Object.assign(searchIcon.style, { 
        position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", 
        fontSize: "12px", opacity: "0.5", pointerEvents: "none"
    });

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Buscar template...";
    Object.assign(searchInput.style, styleSearchInput);
    
    searchContainer.appendChild(searchIcon);
    searchContainer.appendChild(searchInput);
    header.appendChild(searchContainer);

    // Container de Abas
    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, styleTabContainer);
    // Remove scrollbar visualmente mas mantém funcional
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `#quick-email-popup ::-webkit-scrollbar { display: none; }`;
    popup.appendChild(styleSheet);
    header.appendChild(tabsContainer);

    popup.appendChild(header);

    // Área de Conteúdo (Lista de Emails)
    const contentArea = document.createElement("div");
    Object.assign(contentArea.style, { 
        padding: "0 8px 8px 8px", 
        overflowY: "auto", 
        flexGrow: "1" 
    });
    popup.appendChild(contentArea);

    // Footer
    const footer = document.createElement("div");
    Object.assign(footer.style, { 
        padding: "8px 16px", borderTop: "1px solid #eee", 
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: "10px", color: "#9aa0a6"
    });
    footer.innerHTML = `<span>${CURRENT_VERSION}</span><span>by lucaste@</span>`;
    popup.appendChild(footer);

    document.body.appendChild(popup);

    // --- FUNÇÕES DE RENDERIZAÇÃO ---

    function renderTabs() {
        tabsContainer.innerHTML = "";
        
        // Adiciona aba "Todos" se quiser, ou apenas as categorias
        // Vamos iterar as categorias
        Object.keys(QUICK_EMAILS).forEach(catKey => {
            const catData = QUICK_EMAILS[catKey];
            const btn = document.createElement("button");
            btn.textContent = catData.title;
            
            // Estilo Base
            Object.assign(btn.style, styleTabButton);
            
            // Estilo Ativo
            if (activeCategory === catKey && searchTerm === "") {
                Object.assign(btn.style, styleActiveTab);
            }

            btn.onclick = () => {
                activeCategory = catKey;
                searchTerm = ""; // Limpa busca ao trocar aba
                searchInput.value = "";
                renderTabs(); // Re-renderiza para atualizar estilo
                renderEmailList();
            };

            tabsContainer.appendChild(btn);
        });
    }

    function renderEmailList() {
        contentArea.innerHTML = "";
        
        let emailsToShow = [];

        if (searchTerm.trim() !== "") {
            // Se tem busca, ignora categorias e busca em TUDO
            Object.values(QUICK_EMAILS).forEach(cat => {
                const found = cat.emails.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
                emailsToShow = [...emailsToShow, ...found];
            });
        } else {
            // Se não tem busca, mostra da categoria ativa
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
            contentArea.appendChild(emptyState);
            return;
        }

        emailsToShow.forEach(email => {
            const btn = document.createElement("button");
            Object.assign(btn.style, styleEmailItem);

            const textSpan = document.createElement("span");
            textSpan.textContent = email.name;
            Object.assign(textSpan.style, { fontSize: "13px", color: "#3c4043", fontWeight: "400" });
            
            // Ícone seta sutil
            const iconSpan = document.createElement("span");
            iconSpan.textContent = "›"; // Arrow simples
            Object.assign(iconSpan.style, { fontSize: "18px", color: "#dadce0", fontWeight: "300" });

            btn.appendChild(textSpan);
            btn.appendChild(iconSpan);

            // Hover effect
            btn.onmouseenter = () => {
                btn.style.background = "#f1f3f4";
                iconSpan.style.color = "#1a73e8"; // Azul Google no hover
            };
            btn.onmouseleave = () => {
                btn.style.background = "transparent";
                iconSpan.style.color = "#dadce0";
            };

            btn.onclick = () => applyEmailTemplate(email);

            contentArea.appendChild(btn);
        });
    }

    // --- EVENTOS ---

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        // Se começar a buscar, desmarca visualmente as abas (opcional, ou mantém a atual)
        if (searchTerm !== "") {
            Array.from(tabsContainer.children).forEach(child => {
                child.style.background = "transparent";
                child.style.color = "#5f6368";
                child.style.borderColor = "#dadce0";
            });
        } else {
            renderTabs(); // Restaura estilo da aba ativa
        }
        renderEmailList();
    });

    function togglePopup(show) {
        if (show) {
            popup.style.opacity = "1";
            popup.style.pointerEvents = "auto";
            popup.style.transform = "scale(1)";
            searchInput.focus(); // Auto-foco na busca
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

    // Inicialização
    renderTabs();
    renderEmailList();
}