// src/modules/quick-email/quick-email-assistant.js

import { 
    makeDraggable,
    stylePopup,
    stylePopupHeader,
    stylePopupTitle,
    stylePopupCloseBtn,
    stylePopupVersion,
    triggerGoogleAnimation
} from '../shared/utils.js';

import { animationStyles, togglePopupAnimation } from '../shared/animations.js';

import { QUICK_EMAILS } from './quick-email-data.js';
import { runQuickEmail } from '../email/email-automation.js';

export function initQuickEmailAssistant() {
    const CURRENT_VERSION = "v2.9.5"; 

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

    // Estilos da Lista (Com Animação Acordeão)
// --- ESTILOS ATUALIZADOS (Correção de Altura) ---
    
    const styleRow = { 
        display: "flex", 
        flexWrap: "wrap", 
        marginBottom: "8px", 
        position: "relative", 
        alignItems: "stretch", // <--- O SEGREDO: Força altura igual para os filhos
        background: "transparent",
        borderRadius: "8px",
        transition: "background 0.2s"
    };

    const styleActionBtn = {
        flexGrow: "1", 
        textAlign: "left", 
        padding: "12px",
        background: "#fff", 
        border: "1px solid #dadce0", 
        borderRight: "none", // Remove borda direita para colar no botão do olho
        borderRadius: "8px 0 0 8px", 
        cursor: "pointer", 
        transition: "background 0.1s", 
        zIndex: "2",
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center" // Centraliza texto verticalmente se o vizinho for maior
    };

    const stylePreviewBtn = {
        width: "44px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "#f8f9fa", 
        border: "1px solid #dadce0", 
        // A borda esquerda já é a do botão de ação, ou podemos deixar a borda aqui
        // Vamos deixar a borda aqui para garantir o divisor visual
        borderLeft: "1px solid #f1f3f4", 
        borderRadius: "0 8px 8px 0", 
        cursor: "pointer", 
        transition: "all 0.2s",
        color: "#5f6368", 
        zIndex: "2"
    };

    const stylePreviewCard = {
        width: "100%", // Força quebra para a próxima linha
        maxHeight: "0", 
        opacity: "0",
        overflow: "hidden", 
        background: "#f8f9fa", 
        border: "1px solid #dadce0", 
        borderTop: "none", 
        borderRadius: "0 0 8px 8px",
        marginTop: "-1px", 
        fontSize: "12px", 
        color: "#3c4043", 
        lineHeight: "1.5",
        transition: "max-height 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.3s linear, padding 0.3s step-start"
    };

   // --- POPUP (Com Animação) ---
    const popup = document.createElement("div");
    popup.id = "quick-email-popup";
    
    // Combina estilos locais + estilo base + ESTADO INICIAL DA ANIMAÇÃO
    Object.assign(popup.style, stylePopup, { 
        right: "80px", width: "550px", maxHeight: "85vh", 
        borderRadius: "12px", display: "flex", flexDirection: "column",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
    }, animationStyles.popupInitial); // <--- APLICAÇÃO DA ANIMAÇÃO

    const header = document.createElement("div");
    // Remove padding do header pai para a linha ficar na borda
    Object.assign(header.style, stylePopupHeader, { 
        padding: "0", height: "auto", flexDirection: "column", 
        alignItems: "stretch", overflow: "hidden", borderRadius: "12px 12px 0 0" 
    });
    makeDraggable(popup, header);

    // --- LINHA COLORIDA ---
    const googleLine = document.createElement("div");
    Object.assign(googleLine.style, animationStyles.googleLine);
    header.appendChild(googleLine);

    // Container interno para devolver o padding ao conteúdo
    const headerContent = document.createElement("div");
    Object.assign(headerContent.style, { 
        padding: "16px", display: "flex", flexDirection: "column", gap: "12px" 
    });

    const headerTopRow = document.createElement("div");
    Object.assign(headerTopRow.style, { display: "flex", justifyContent: "space-between", alignItems: "center" });
    
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
    
    // Fecha usando a nova animação
    closeBtn.onclick = () => {
        visible = false;
        togglePopupAnimation(false, { popup, btnContainer, googleLine });
    };
    
    headerTopRow.appendChild(headerLeft);
    headerTopRow.appendChild(closeBtn);
    
    // Montagem do Header Content
    headerContent.appendChild(headerTopRow);
    
    const searchInput = document.createElement("input");
    searchInput.placeholder = "Filtrar emails...";
    Object.assign(searchInput.style, styleSearchInput);
    headerContent.appendChild(searchInput); // Append no Content

    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, styleChipContainer);
    headerContent.appendChild(tabsContainer); // Append no Content

    header.appendChild(headerContent); // Append Content no Header
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
            const chip = document.createElement("div"); 
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
            // AQUI: Usa o estilo atualizado com alignItems: 'stretch'
            Object.assign(row.style, styleRow); 

            // 1. BOTÃO DE AÇÃO (Esquerda)
            const actionBtn = document.createElement("div");
            // AQUI: Usa o estilo atualizado com borderRight: 'none'
            Object.assign(actionBtn.style, styleActionBtn); 
            
            const shortDesc = email.subject.length > 45 ? email.subject.substring(0, 45) + "..." : email.subject;
            
            actionBtn.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px; color:#202124; font-weight:500; fontSize:13px;">
                    <span style="color:#1a73e8">${iconSend}</span> ${email.name}
                </div>
                <div style="color:#5f6368; font-size:11px; padding-left:24px; margin-top:2px;">
                    ${shortDesc}
                </div>
            `;

            actionBtn.onmouseenter = () => actionBtn.style.background = "#f8f9fa";
            actionBtn.onmouseleave = () => actionBtn.style.background = "#fff";
            
            actionBtn.onclick = () => {
                actionBtn.style.background = "#e8f0fe"; 
                setTimeout(() => actionBtn.style.background = "#fff", 200);
                runQuickEmail(email);
            };

            // ============================================================
            // 2. BOTÃO DE PREVIEW (AQUI ESTÁ ELE!)
            // ============================================================
            const previewBtn = document.createElement("div");
            previewBtn.innerHTML = iconEye;
            
            // AQUI: Aplica o estilo atualizado que força a altura igual
            Object.assign(previewBtn.style, stylePreviewBtn); 

            // Hover do Olho
            previewBtn.onmouseenter = () => { 
                previewBtn.style.background = "#e8eaed"; 
                previewBtn.style.color = "#202124"; 
            };
            previewBtn.onmouseleave = () => { 
                if (!row.classList.contains('expanded')) {
                    previewBtn.style.background = "#f8f9fa"; 
                    previewBtn.style.color = "#5f6368";
                }
            };

            // Clique do Olho (Lógica de Acordeão)
            previewBtn.onclick = (e) => {
                e.stopPropagation();
                const existingCard = row.querySelector('.preview-card');

                // Se já aberto, fecha
                if (existingCard) {
                    existingCard.style.maxHeight = "0";
                    existingCard.style.opacity = "0";
                    row.classList.remove('expanded');
                    
                    // Reseta cores
                    previewBtn.style.background = "#f8f9fa";
                    previewBtn.style.color = "#5f6368";
                    
                    setTimeout(() => existingCard.remove(), 300);
                    return;
                }

                // Fecha outros abertos na lista
                const allOpenRows = contentArea.querySelectorAll('.expanded');
                allOpenRows.forEach(r => {
                    // Encontra o botão de preview daquela linha e clica para fechar
                    // O botão de preview é o segundo filho da div row (índice 1)
                    const btn = r.children[1]; 
                    if(btn) btn.click(); 
                });

                // Abre Novo
                row.classList.add('expanded');
                previewBtn.style.background = "#e8f0fe"; // Ativo Azul
                previewBtn.style.color = "#1a73e8";

                // Ajuste fino de bordas para parecer conectado
                actionBtn.style.borderRadius = "8px 0 0 0";
                previewBtn.style.borderRadius = "0 8px 0 0";

                // Cria o Card de Conteúdo
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
                
                // Animação de entrada
                requestAnimationFrame(() => {
                    card.style.maxHeight = "500px";
                    card.style.opacity = "1";
                });
            };

            // ============================================================
            // MONTAGEM FINAL DA LINHA
            // ============================================================
            row.appendChild(actionBtn);  // Esquerda
            row.appendChild(previewBtn); // Direita
            contentArea.appendChild(row);
        });
    }

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        if (searchTerm !== "") {
            Array.from(tabsContainer.children).forEach(child => {
                child.style.background = "#fff";
                child.style.color = "#3c4043";
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
        // Proteção contra arrasto
        if (btnContainer.getAttribute('data-dragging') === 'true') {
            return; 
        }

        visible = !visible;
        
        // Chama a animação centralizada
        togglePopupAnimation(visible, { 
            popup, 
            btnContainer, 
            googleLine, 
            focusElement: searchInput 
        });
    };

    renderTabs();
    renderEmailList();
}