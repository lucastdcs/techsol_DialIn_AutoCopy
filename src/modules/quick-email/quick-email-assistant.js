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

import { createStandardHeader } from '../shared/header-factory.js'; // <--- IMPORTANTE
import { animationStyles, togglePopupAnimation } from '../shared/animations.js';
import { QUICK_EMAILS } from './quick-email-data.js';
import { runQuickEmail } from '../email/email-automation.js';

export function initQuickEmailAssistant() {
    const CURRENT_VERSION = "v2.9.6"; 

    // --- ESTADO ---
    let activeCategory = Object.keys(QUICK_EMAILS)[0]; 
    let searchTerm = "";

    // --- ESTILOS LOCAIS ---
   const styleSearchInput = {
        width: "100%", padding: "10px 12px 10px 36px", 
        borderRadius: "8px", border: "1px solid #dadce0", background: "#f8f9fa",
        fontSize: "14px", boxSizing: "border-box", outline: "none",
        color: "#3c4043", transition: "background 0.2s, border-color 0.2s",
        marginBottom: "12px",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: "no-repeat", backgroundPosition: "10px center"
    };

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

    const styleRow = { 
        display: "flex", flexWrap: "wrap", marginBottom: "8px", 
        position: "relative", alignItems: "stretch", 
        background: "transparent", borderRadius: "8px", transition: "background 0.2s"
    };

    const styleActionBtn = {
        flexGrow: "1", textAlign: "left", padding: "12px",
        background: "#fff", border: "1px solid #dadce0", 
        borderRight: "none", borderRadius: "8px 0 0 8px", 
        cursor: "pointer", transition: "background 0.1s", 
        zIndex: "2", display: "flex", flexDirection: "column", justifyContent: "center"
    };

    const stylePreviewBtn = {
        width: "44px", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#f8f9fa", border: "1px solid #dadce0", borderLeft: "1px solid #f1f3f4",
        borderRadius: "0 8px 8px 0", cursor: "pointer", transition: "all 0.2s",
        color: "#5f6368", zIndex: "2"
    };

    const stylePreviewCard = {
        width: "100%", maxHeight: "0", opacity: "0", overflow: "hidden", 
        background: "#f8f9fa", border: "1px solid #dadce0", borderTop: "none", 
        borderRadius: "0 0 8px 8px", marginTop: "-1px", 
        fontSize: "12px", color: "#3c4043", lineHeight: "1.5",
        transition: "max-height 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.3s linear, padding 0.3s step-start"
    };

    // --- UI: Botão Flutuante ---
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
        position: "fixed", bottom: "20%", right: "24px", zIndex: "9999",
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

    // --- POPUP (USANDO FACTORY E ANIMAÇÃO) ---
    const popup = document.createElement("div");
    popup.id = "quick-email-popup";
    
    // Configura estilo + estado inicial da animação
    Object.assign(popup.style, stylePopup, { 
        right: "80px", width: "550px", maxHeight: "85vh", 
        borderRadius: "12px", display: "flex", flexDirection: "column",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
    }, animationStyles.popupInitial); // <--- ANIMAÇÃO AQUI

    // Objeto de referências para a animação
    const animRefs = { popup, btnContainer, googleLine: null, focusElement: null };

    let visible = false;

    // 1. HEADER (Criado pela Factory)
    const header = createStandardHeader(
        popup,                  
        "Emails Rápidos",       
        CURRENT_VERSION,        
        animRefs, // Passa refs para a Factory injetar a googleLine
        () => { visible = false; } 
    );
    
    // 2. TOOLBAR (Busca + Chips)
    const toolbar = document.createElement("div");
    Object.assign(toolbar.style, { 
        padding: "0 16px 16px 16px", 
        display: "flex", flexDirection: "column", gap: "12px",
        borderBottom: "1px solid #f1f3f4", flexShrink: "0", backgroundColor: "#fff" 
    });

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Filtrar emails...";
    Object.assign(searchInput.style, styleSearchInput);
    animRefs.focusElement = searchInput; // Salva para focar ao abrir
    
    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, styleChipContainer);
    tabsContainer.style.marginBottom = "0"; 
    tabsContainer.style.borderBottom = "none";

    toolbar.appendChild(searchInput);
    toolbar.appendChild(tabsContainer);
    
    // Montagem do DOM
    popup.appendChild(header);
    popup.appendChild(toolbar);

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
            const chip = document.createElement("div"); 
            chip.textContent = catData.title;
            Object.assign(chip.style, styleChip);
            if (activeCategory === catKey && searchTerm === "") { Object.assign(chip.style, styleChipActive); }
            chip.onclick = () => { activeCategory = catKey; searchTerm = ""; searchInput.value = ""; renderTabs(); renderEmailList(); };
            tabsContainer.appendChild(chip);
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
            contentArea.innerHTML = `<div style="text-align:center; padding:20px; color:#9aa0a6; fontSize:13px">Nenhum email encontrado.</div>`;
            return;
        }

        const iconEye = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        const iconSend = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

        emailsToShow.forEach(email => {
            const row = document.createElement("div");
            Object.assign(row.style, styleRow);

            const actionBtn = document.createElement("div");
            Object.assign(actionBtn.style, styleActionBtn);
            const shortDesc = email.subject.length > 45 ? email.subject.substring(0, 45) + "..." : email.subject;
            
            actionBtn.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px; color:#202124; font-weight:500; fontSize:13px;">
                    <span style="color:#1a73e8">${iconSend}</span> ${email.name}
                </div>
                <div style="color:#5f6368; font-size:11px; padding-left:24px; margin-top:2px;">${shortDesc}</div>
            `;

            actionBtn.onmouseenter = () => actionBtn.style.background = "#f8f9fa";
            actionBtn.onmouseleave = () => actionBtn.style.background = "#fff";
            actionBtn.onclick = () => {
                actionBtn.style.background = "#e8f0fe"; 
                setTimeout(() => actionBtn.style.background = "#fff", 200);
                runQuickEmail(email);
            };

            const previewBtn = document.createElement("div");
            previewBtn.innerHTML = iconEye;
            Object.assign(previewBtn.style, stylePreviewBtn);

            previewBtn.onmouseenter = () => { previewBtn.style.background = "#e8eaed"; previewBtn.style.color = "#202124"; };
            previewBtn.onmouseleave = () => { 
                if (!row.querySelector('.preview-card')) { previewBtn.style.background = "#f8f9fa"; previewBtn.style.color = "#5f6368"; }
            };

            previewBtn.onclick = (e) => {
                e.stopPropagation();
                const existingCard = row.querySelector('.preview-card');
                if (existingCard) {
                    existingCard.style.maxHeight = "0"; existingCard.style.opacity = "0"; existingCard.style.padding = "0";
                    row.classList.remove('expanded'); previewBtn.style.background = "#f8f9fa"; previewBtn.style.color = "#5f6368";
                    setTimeout(() => existingCard.remove(), 300);
                    return;
                }
                const allOpenRows = contentArea.querySelectorAll('.expanded');
                allOpenRows.forEach(r => { const btn = r.children[1]; if(btn) btn.click(); });

                row.classList.add('expanded');
                previewBtn.style.background = "#e8f0fe"; previewBtn.style.color = "#1a73e8";
                actionBtn.style.borderRadius = "8px 0 0 0"; previewBtn.style.borderRadius = "0 8px 0 0";

                const card = document.createElement("div");
                card.className = 'preview-card';
                Object.assign(card.style, stylePreviewCard);
                card.innerHTML = `
                    <div style="padding: 16px;">
                        <div style="font-weight:600; margin-bottom:4px; color:#1a73e8; font-size:11px; text-transform:uppercase;">Assunto</div>
                        <div style="margin-bottom:12px; color:#202124; font-size:13px;">${email.subject}</div>
                        <div style="font-weight:600; margin-bottom:4px; color:#1a73e8; font-size:11px; text-transform:uppercase; border-top:1px solid #eee; padding-top:8px;">Conteúdo</div>
                        <div style="color:#3c4043; font-size:12px; line-height:1.5;">${email.body}</div>
                    </div>
                `;
                row.appendChild(card);
                requestAnimationFrame(() => { card.style.maxHeight = "500px"; card.style.opacity = "1"; });
            };

            row.appendChild(actionBtn); row.appendChild(previewBtn); contentArea.appendChild(row);
        });
    }

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        if (searchTerm !== "") {
            Array.from(tabsContainer.children).forEach(child => {
                child.style.background = "#fff"; child.style.color = "#3c4043"; child.style.borderColor = "#dadce0";
            });
        } else {
            renderTabs();
        }
        renderEmailList();
    });

    btn.onclick = () => {
        if (btnContainer.getAttribute('data-dragging') === 'true') return; 
        visible = !visible;
        togglePopupAnimation(visible, animRefs); // <--- AQUI A MÁGICA
    };

    renderTabs();
    renderEmailList();
}