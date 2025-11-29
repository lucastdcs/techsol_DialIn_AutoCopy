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

// IMPORTANTE: Importa a função do módulo de email
import { runQuickEmail } from '../email/email-automation.js';

export function initQuickEmailAssistant() {
    const CURRENT_VERSION = "v2.8.8"; 

    // --- ESTADO ---
    let activeCategory = Object.keys(QUICK_EMAILS)[0]; 
    let searchTerm = "";

    // --- ESTILOS ---
const styleSearchInput = {
        width: "100%", 
        padding: "10px 12px 10px 36px", // Espaço na esquerda para o ícone
        borderRadius: "8px", 
        border: "1px solid #dadce0", 
        background: "#f8f9fa",
        fontSize: "14px", 
        boxSizing: "border-box", 
        outline: "none",
        color: "#3c4043", 
        transition: "background 0.2s, border-color 0.2s",
        marginBottom: "8px",
        // Ícone SVG Clean (Material Design)
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "10px center"
    };

    const styleTabContainer = {
        display: "flex", flexWrap: "wrap", gap: "8px", 
        paddingBottom: "8px", marginTop: "0",
        borderBottom: "1px solid #dadce0"
    };

    const styleTabButton = {
        padding: "6px 12px", borderRadius: "16px", border: "1px solid #dadce0",
        background: "transparent", color: "#5f6368", fontSize: "12px",
        fontWeight: "500", cursor: "pointer", whiteSpace: "nowrap",
        transition: "all 0.2s ease", marginBottom: "4px"
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
    // --- UI: Botão Flutuante ---
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
        position: "fixed", bottom: "20%", right: "24px", zIndex: "9999",
        display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px",
        cursor: "pointer" // Importante para indicar que é interativo
    });

    const btn = document.createElement("button");
    btn.id = "email-floating-btn";
    btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z"/></svg>`;
    Object.assign(btn.style, {
        width: "48px", height: "48px", borderRadius: "50%",
        background: "#ea4335", color: "white", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"
    });

    const tooltip = document.createElement("span");
    tooltip.textContent = "Emails Rápidos"; // <--- O TÍTULO QUE VOCÊ QUER
    Object.assign(tooltip.style, {
        background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 8px",
        borderRadius: "4px", fontSize: "12px", opacity: "0", pointerEvents: "none",
        transition: "opacity 0.2s", whiteSpace: "nowrap", fontWeight: "500"
    });

    // --- CORREÇÃO: Eventos no Container ---
    // Assim o texto aparece mesmo se o mouse estiver "chegando perto" ou em cima do texto
    btnContainer.onmouseenter = () => { 
        btn.style.transform = "scale(1.1)"; 
        tooltip.style.opacity = "1"; 
    };
    
    btnContainer.onmouseleave = () => { 
        btn.style.transform = "scale(1)"; 
        tooltip.style.opacity = "0"; 
    };

    btnContainer.appendChild(btn);
    btnContainer.appendChild(tooltip);
    document.body.appendChild(btnContainer);
    makeDraggable(btnContainer);

    // --- POPUP ---
    const popup = document.createElement("div");
    popup.id = "quick-email-popup";
    Object.assign(popup.style, stylePopup, { 
        right: "100px", width: "420px", borderRadius: "12px",
        display: "flex", flexDirection: "column", maxHeight: "600px"
    });

    const header = document.createElement("div");
    Object.assign(header.style, stylePopupHeader, { padding: "16px", height: "auto", flexDirection: "column", alignItems: "stretch" });
    makeDraggable(popup, header);

    const headerTopRow = document.createElement("div");
    Object.assign(headerTopRow.style, { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" });
    
    const headerLeft = document.createElement("div");
    Object.assign(headerLeft.style, { display: "flex", alignItems: "center", gap: "10px" });
    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "24px", height: "24px" });
    const titleDiv = document.createElement("div");
    Object.assign(titleDiv.style, { display: 'flex', flexDirection: 'column' });
    const titleText = document.createElement("span");
    titleText.textContent = "Emails Rápidos";
    Object.assign(titleText.style, stylePopupTitle);
    const verText = document.createElement("span");
    verText.textContent = CURRENT_VERSION;
    Object.assign(verText.style, stylePopupVersion);
    titleDiv.appendChild(titleText);
    titleDiv.appendChild(verText);
    headerLeft.appendChild(logo);
    headerLeft.appendChild(titleDiv);

    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✕";
    Object.assign(closeBtn.style, stylePopupCloseBtn);
    closeBtn.onclick = () => togglePopup(false);
    
    headerTopRow.appendChild(headerLeft);
    headerTopRow.appendChild(closeBtn);
    header.appendChild(headerTopRow);

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Filtrar emails...";
    Object.assign(searchInput.style, styleSearchInput);
    header.appendChild(searchInput);

    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, styleTabContainer);
    header.appendChild(tabsContainer);

    popup.appendChild(header);

    const contentArea = document.createElement("div");
    Object.assign(contentArea.style, { padding: "16px", overflowY: "auto", maxHeight: "400px", flexGrow: "1" });
    popup.appendChild(contentArea);

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
            const emptyState = document.createElement("div");
            emptyState.textContent = "Nenhum email encontrado.";
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
            
            // CHAMA A FUNÇÃO CENTRALIZADA
            btn.onclick = () => runQuickEmail(email);

            contentArea.appendChild(btn);
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
        // --- PROTEÇÃO CONTRA ARRASTO ---
        if (btnContainer.getAttribute('data-dragging') === 'true') {
            return; 
        }
        // -------------------------------

        visible = !visible;
        togglePopup(visible);
    };

    renderTabs();
    renderEmailList();
}