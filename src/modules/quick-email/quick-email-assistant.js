// src/modules/quick-email/quick-email-assistant.js

import { 
    makeDraggable,
    stylePopup,
    stylePopupHeader,
    stylePopupTitle,
    stylePopupCloseBtn,
    stylePopupVersion,
    styleCredit
} from '../shared/utils.js';

import { QUICK_EMAILS } from './quick-email-data.js';
import { runQuickEmail } from '../email/email-automation.js';

export function initQuickEmailAssistant() {
    const CURRENT_VERSION = "v2.9.0"; 

    // --- ESTADO ---
    let activeCategory = Object.keys(QUICK_EMAILS)[0]; 
    let searchTerm = "";

    // --- ESTILOS LOCAIS (Material Design Clean) ---
    const styleSearchInput = {
        width: "100%", padding: "10px 12px 10px 36px", // Espaço para ícone
        borderRadius: "8px", border: "1px solid #dadce0", background: "#f8f9fa",
        fontSize: "14px", boxSizing: "border-box", outline: "none",
        color: "#3c4043", transition: "background 0.2s, border-color 0.2s",
        marginBottom: "12px",
        // Ícone SVG via CSS
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: "no-repeat", backgroundPosition: "10px center"
    };

    // Estilo Chip (Substitui Tabs)
    const styleChipContainer = {
        display: "flex", gap: "8px", overflowX: "auto", 
        paddingBottom: "8px", marginBottom: "8px",
        scrollbarWidth: "none", borderBottom: "1px solid #f1f3f4"
    };

    const styleChip = {
        padding: "6px 16px", borderRadius: "16px", 
        border: "1px solid #dadce0", background: "#fff", 
        color: "#3c4043", fontSize: "13px", fontWeight: "500", 
        cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
        userSelect: "none"
    };

    const styleChipActive = {
        background: "#e8f0fe", color: "#1967d2", borderColor: "#e8f0fe"
    };

    // --- UI: Botão Flutuante ---
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
        position: "fixed", top: "50%", right: "24px", zIndex: "9999",
        display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px",
        cursor: "pointer"
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
    tooltip.textContent = "Emails Rápidos";
    Object.assign(tooltip.style, {
        background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 8px",
        borderRadius: "4px", fontSize: "12px", opacity: "0", pointerEvents: "none",
        transition: "opacity 0.2s", whiteSpace: "nowrap", fontWeight: "500"
    });

    // Eventos no Container (Para funcionar no hover do texto também)
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

    // --- POPUP (Tamanho Ajustado) ---
    const popup = document.createElement("div");
    popup.id = "quick-email-popup";
    Object.assign(popup.style, stylePopup, { 
        right: "80px", 
        width: "550px", // Mais largo
        maxHeight: "85vh", // Mais alto
        borderRadius: "12px",
        display: "flex", flexDirection: "column",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)" // Sombra melhor
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
    searchInput.placeholder = "Filtrar emails..."; // Sem emoji (já tem no CSS)
    Object.assign(searchInput.style, styleSearchInput);
    header.appendChild(searchInput);

    const tabsContainer = document.createElement("div");
    // Usa estilo Chip agora
    Object.assign(tabsContainer.style, styleChipContainer);
    header.appendChild(tabsContainer);

    popup.appendChild(header);

    const contentArea = document.createElement("div");
    Object.assign(contentArea.style, { 
        padding: "16px", overflowY: "auto", flexGrow: "1", position: "relative" 
    });
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
            const chip = document.createElement("div"); // Div para chip
            chip.textContent = catData.title;
            
            Object.assign(chip.style, styleChip);
            
            if (activeCategory === catKey && searchTerm === "") {
                Object.assign(chip.style, styleChipActive);
            }
            
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
        contentArea.innerHTML = ""; 
        let emailsToShow = [];

        // Filtro de Busca
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

        // Empty State
        if (emailsToShow.length === 0) {
            const emptyState = document.createElement("div");
            emptyState.textContent = "Nenhum email encontrado.";
            Object.assign(emptyState.style, { 
                textAlign: "center", padding: "20px", color: "#9aa0a6", fontSize: "13px" 
            });
            contentArea.appendChild(emptyState);
            return;
        }

        // Ícones SVG
        const iconEye = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        const iconSend = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

        emailsToShow.forEach(email => {
            // Container da Linha
            const row = document.createElement("div");
            Object.assign(row.style, {
                display: "flex", marginBottom: "8px", position: "relative", alignItems: "stretch"
            });

            // 1. BOTÃO DE AÇÃO (Esquerda - Maior)
            const actionBtn = document.createElement("div");
            Object.assign(actionBtn.style, {
                flexGrow: "1", textAlign: "left", padding: "10px 12px",
                background: "#fff", border: "1px solid #dadce0", 
                borderRadius: "8px 0 0 8px", borderRight: "1px solid #f1f3f4",
                cursor: "pointer", transition: "background 0.1s",
                display: "flex", flexDirection: "column", gap: "2px"
            });

            // Texto do Botão (Nome + Snippet do Assunto)
            const shortDesc = email.subject.length > 45 ? email.subject.substring(0, 45) + "..." : email.subject;
            
            actionBtn.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px; color:#202124; font-weight:500; fontSize:13px;">
                    <span style="color:#1a73e8">${iconSend}</span> ${email.name}
                </div>
                <div style="color:#5f6368; font-size:11px; padding-left:24px;">
                    ${shortDesc}
                </div>
            `;

            actionBtn.onmouseenter = () => actionBtn.style.background = "#f8f9fa";
            actionBtn.onmouseleave = () => actionBtn.style.background = "#fff";
            
            // Click -> Insere Email
            actionBtn.onclick = () => {
                actionBtn.style.background = "#e8f0fe"; // Feedback
                setTimeout(() => actionBtn.style.background = "#fff", 200);
                runQuickEmail(email);
            };

            // 2. BOTÃO DE PREVIEW (Direita - Menor)
            const previewBtn = document.createElement("div");
            previewBtn.innerHTML = iconEye;
            Object.assign(previewBtn.style, {
                width: "40px", display: "flex", alignItems: "center", justifyContent: "center",
                background: "#f8f9fa", border: "1px solid #dadce0", borderLeft: "none",
                borderRadius: "0 8px 8px 0", cursor: "pointer", transition: "all 0.2s",
                color: "#5f6368"
            });

            previewBtn.onmouseenter = () => { previewBtn.style.background = "#e8eaed"; previewBtn.style.color = "#202124"; };
            previewBtn.onmouseleave = () => { 
                if (!row.querySelector('.preview-card')) {
                    previewBtn.style.background = "#f8f9fa"; 
                    previewBtn.style.color = "#5f6368";
                }
            };

            // Click -> Abre/Fecha Preview
            previewBtn.onclick = (e) => {
                e.stopPropagation();
                const existingCard = row.querySelector('.preview-card');

                // Fecha TODOS os outros
                const allCards = contentArea.querySelectorAll('.preview-card');
                const allBtns = contentArea.querySelectorAll('[data-preview-active="true"]');
                
                allCards.forEach(c => c.remove());
                allBtns.forEach(b => {
                    b.style.background = "#f8f9fa";
                    b.style.color = "#5f6368";
                    b.removeAttribute('data-preview-active');
                });

                if (existingCard) return;

                // Abre Novo Preview
                const card = document.createElement("div");
                card.className = 'preview-card';
                Object.assign(card.style, {
                    position: "absolute", top: "100%", left: "0", width: "95%", zIndex: "100",
                    background: "#fff", border: "1px solid #1a73e8", borderRadius: "8px",
                    padding: "12px", marginTop: "4px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    fontSize: "12px", color: "#3c4043", lineHeight: "1.5"
                });

                card.innerHTML = `
                    <div style="font-weight:600; margin-bottom:6px; color:#1a73e8; font-size:11px; text-transform:uppercase; letter-spacing:0.5px;">Assunto</div>
                    <div style="margin-bottom:12px; color:#202124;">${email.subject}</div>
                    <div style="font-weight:600; margin-bottom:6px; color:#1a73e8; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-top:1px solid #eee; padding-top:8px;">Corpo</div>
                    <div style="max-height:150px; overflow-y:auto; color:#5f6368;">${email.body}</div>
                `;

                row.appendChild(card);
                
                previewBtn.style.background = "#e8f0fe";
                previewBtn.style.color = "#1a73e8";
                previewBtn.setAttribute('data-preview-active', 'true');
            };

            row.appendChild(actionBtn);
            row.appendChild(previewBtn);
            contentArea.appendChild(row);
        });
    }

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        if (searchTerm !== "") {
            // Se buscando, reseta visual dos chips
            Array.from(tabsContainer.children).forEach(child => {
                child.style.background = "#fff";
                child.style.color = "#3c4043";
                child.style.borderColor = "#dadce0";
            });
        } else {
            renderTabs(); // Restaura estado ativo
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
        visible = !visible;
        togglePopup(visible);
    };

    renderTabs();
    renderEmailList();
}