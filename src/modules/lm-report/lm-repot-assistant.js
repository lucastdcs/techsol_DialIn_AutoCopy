// src/modules/feedback/feedback-assistant.js

import { 
    makeDraggable,
    stylePopup,
    stylePopupHeader,
    stylePopupTitle,
    stylePopupCloseBtn,
    stylePopupVersion,
    styleCredit,
    styleFloatingButton
} from '../shared/utils.js';

// ... (código do LINKS_DB mantido igual) ...
// (Mantenha o seu LINKS_DB aqui)

// --- BANCO DE DADOS DE LINKS ---
const LINKS_DB = {
    lm: {
        label: "LM Forms",
        links: [
            { name: "Relatório de Ocorrências", url: "https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform", desc: "Reportar problemas operacionais | Aviso de pausas" },
            { name: "Chamadas Excedidas (>50min)", url: "https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform", desc: "Registro de chamadas longas" },
            { name: "Relatório de Bugs", url: "https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform", desc: "Erros de sistema/ferramenta" },
             { name: "Suporte LM", url: "https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec", desc: "Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs" }
        ]
    },
    qa: {
        label: "QA",
        links: [
            { name: "Elogios", url: "https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform", desc: "Feedback positivo dos Anunciantes" },
            { name: "Casos Complexos", url: "https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw", desc: "Casos complicados de atender" }
        ]
    },
    suporte: {
        label: "Central de Ajuda",
        links: [
            { name: "Suporte Google Ads", url: "https://support.google.com/google-ads/", desc: "Oficial" },
            { name: "Suporte GA4", url: "https://support.google.com/analytics/", desc: "Oficial" },
            { name: "Suporte Merchant Center", url: "https://support.google.com/merchants/gethelp", desc: "Oficial" },
            { name: "Doc. CSP", url: "https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.", desc: "Doc. oficial sobre CSP" },
            { name: "Doc. Enhanced Conversion", url: "https://support.google.com/google-ads/answer/9888656?hl=pt-BR", desc: "Como funcionam as conversões otimizadas?" },
            { name: "Doc. CoMo", url: "https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br", desc: "Doc. oficial sobre Consent Mode" },

  
        ]
    },
    outros: {
        label: "Diversos",
        links: [
            { name: "Solicitar Gravação", url: "https://support.google.com/policies/contact/sar", desc: "Form para solicitar gravação da chamada." }
        ]
    }
};

export function initFeedbackAssistant() {
    const CURRENT_VERSION = "v2.3.1";

    let activeTab = 'lm'; 
    let searchTerm = "";

   // --- ESTILOS LOCAIS ---
const styleSearchInput = {
        width: "100%", padding: "10px 12px 10px 36px",
        borderRadius: "8px", border: "1px solid #dadce0", background: "#f8f9fa",
        fontSize: "14px", boxSizing: "border-box", outline: "none",
        color: "#3c4043", transition: "background 0.2s, border-color 0.2s",
        // SVG Clean
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: "no-repeat", backgroundPosition: "10px center"
    };

    // CORREÇÃO: Adicionado flexWrap e removido overflowX
    const styleTabContainer = {
        display: "flex", 
        flexWrap: "wrap", // <--- Isso faz os botões caírem para a linha de baixo
        gap: "8px", 
        paddingBottom: "8px", 
        marginTop: "12px",
        borderBottom: "1px solid #dadce0"
        // Removido: overflowX: "auto" e scrollbarWidth: "none"
    };

    const styleTabButton = {
        padding: "6px 16px", borderRadius: "16px", border: "1px solid #dadce0",
        background: "transparent", color: "#5f6368", fontSize: "13px",
        fontWeight: "500", cursor: "pointer", whiteSpace: "nowrap",
        transition: "all 0.2s ease",
        marginBottom: "4px" // <--- Adicionado para dar espaço vertical quando quebrar linha
    };

    const styleActiveTab = {
        background: "#e8f0fe", color: "#1967d2", borderColor: "#e8f0fe", fontWeight: "600"
    };

    const styleListItem = {
        display: "flex", flexDirection: "column", padding: "12px",
        borderRadius: "8px", cursor: "pointer", border: "1px solid transparent",
        marginBottom: "4px", transition: "background 0.1s"
    };
    // --- UI: Botão Flutuante ---
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
        position: "fixed", bottom: "10%", right: "24px", zIndex: "9999",
        display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px"
    });

    const btn = document.createElement("button");
    btn.id = "feedback-floating-btn";
    btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19 18l2 1V3c0-1.1-.9-2-2-2H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13zM15 5H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z"/></svg>`;

    Object.assign(btn.style, {
        width: "48px", height: "48px", borderRadius: "50%",
        background: "#34a853", color: "white", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 12px rgba(52, 168, 83, 0.4)", 
        transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s"
    });

    const tooltip = document.createElement("span");
    tooltip.textContent = "Links & Forms";
    Object.assign(tooltip.style, {
        background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 8px",
        borderRadius: "4px", fontSize: "12px", opacity: "0", pointerEvents: "none",
        transition: "opacity 0.2s", whiteSpace: "nowrap", fontWeight: "500"
    });

    btn.onmouseenter = () => {
        btn.style.transform = "scale(1.1)";
        btn.style.boxShadow = "0 6px 16px rgba(52, 168, 83, 0.5)";
        tooltip.style.opacity = "1";
    };
    btn.onmouseleave = () => {
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "0 4px 12px rgba(52, 168, 83, 0.4)";
        tooltip.style.opacity = "0";
    };

    btnContainer.appendChild(btn);
    btnContainer.appendChild(tooltip);
    document.body.appendChild(btnContainer);
    makeDraggable(btnContainer);

    // --- POPUP ---
    const popup = document.createElement("div");
    popup.id = "feedback-popup";
    // CORREÇÃO: Largura aumentada para 420px
    Object.assign(popup.style, stylePopup, { 
        right: "100px", width: "max-content", maxHeight: "600px",
        display: "flex", flexDirection: "column", borderRadius: "12px"
    }); 

    // Header Principal
    const header = document.createElement("div");
    Object.assign(header.style, stylePopupHeader, { 
        padding: "16px", 
        borderBottom: "none", 
        flexDirection: "column", 
        alignItems: "stretch",
        height: "auto"
    });
    makeDraggable(popup, header);

    // Linha 1: Topo
    const headerTopRow = document.createElement("div");
    Object.assign(headerTopRow.style, { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" });

    const headerLeft = document.createElement("div");
    Object.assign(headerLeft.style, { display: "flex", alignItems: "center", gap: "12px" });
    
    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "24px", height: "24px" });
    
    const titleContainer = document.createElement("div");
    Object.assign(titleContainer.style, { display: 'flex', flexDirection: 'column' });
    
    const titleText = document.createElement("span");
    titleText.textContent = "Links Úteis";
    Object.assign(titleText.style, stylePopupTitle, { fontSize: "16px", lineHeight: "1.2" });
    
    const versionDisplay = document.createElement("div");
    versionDisplay.textContent = CURRENT_VERSION;
    Object.assign(versionDisplay.style, stylePopupVersion);

    titleContainer.appendChild(titleText);
    titleContainer.appendChild(versionDisplay);
    
    headerLeft.appendChild(logo);
    headerLeft.appendChild(titleContainer);

    const closeIcon = document.createElement("div");
    closeIcon.textContent = "✕";
    Object.assign(closeIcon.style, stylePopupCloseBtn, { fontSize: "14px", color: "#5f6368" });
    closeIcon.onclick = () => togglePopup(false);

    headerTopRow.appendChild(headerLeft);
    headerTopRow.appendChild(closeIcon);
    header.appendChild(headerTopRow);

    // Linha 2: Busca
    const searchContainer = document.createElement("div");
    Object.assign(searchContainer.style, { position: "relative", width: "100%" });
    const searchIcon = document.createElement("span");
    searchIcon.innerHTML = "Filtrar links..."; 
    Object.assign(searchIcon.style, { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", opacity: "0.5", pointerEvents: "none" });
// Linha 2: Busca (Simplificada e Clean)
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Buscar link, form ou ajuda..."; // Sem emoji
    Object.assign(searchInput.style, styleSearchInput);
    
    searchInput.onfocus = () => {
        searchInput.style.borderColor = "#1a73e8"; // Azul no foco
        searchInput.style.backgroundColor = "#fff";
    };
    searchInput.onblur = () => {
        searchInput.style.borderColor = "#dadce0";
        searchInput.style.backgroundColor = "#f8f9fa";
    };

    // Adiciona direto no header, sem container extra
    header.appendChild(searchInput);

    // Linha 3: Abas
    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, styleTabContainer);
    
    // Esconde scrollbar
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `#feedback-popup ::-webkit-scrollbar { display: none; }`;
    popup.appendChild(styleSheet);
    
    header.appendChild(tabsContainer);
    popup.appendChild(header);

    // Conteúdo
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
    footer.innerHTML = `<span>by lucaste@</span>`;
    popup.appendChild(footer);

    document.body.appendChild(popup);

    // --- LÓGICA DE RENDERIZAÇÃO ---
    function renderTabs() {
        tabsContainer.innerHTML = '';
        Object.keys(LINKS_DB).forEach(key => {
            const cat = LINKS_DB[key];
            const btn = document.createElement('button');
            btn.textContent = cat.label;
            Object.assign(btn.style, styleTabButton);
            if (activeTab === key && searchTerm === "") {
                Object.assign(btn.style, styleActiveTab);
            }
            btn.onclick = () => {
                activeTab = key;
                searchTerm = "";
                searchInput.value = "";
                renderTabs();
                renderList();
            };
            tabsContainer.appendChild(btn);
        });
    }

    function renderList() {
        contentArea.innerHTML = '';
        let linksToShow = [];

        if (searchTerm.trim() !== "") {
            Object.values(LINKS_DB).forEach(cat => {
                const filtered = cat.links.filter(l => 
                    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    l.desc.toLowerCase().includes(searchTerm.toLowerCase())
                );
                filtered.forEach(item => item._categoryName = cat.label);
                linksToShow = [...linksToShow, ...filtered];
            });
        } else {
            linksToShow = LINKS_DB[activeTab].links;
        }

        if (linksToShow.length === 0) {
            contentArea.innerHTML = `<div style="text-align:center; padding:20px; color:#9aa0a6; fontSize:13px;">Nenhum link encontrado.</div>`;
            return;
        }

        linksToShow.forEach(link => {
            const item = document.createElement('div');
            Object.assign(item.style, styleListItem);

            const titleRow = document.createElement('div');
            Object.assign(titleRow.style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' });
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = link.name;
            Object.assign(nameSpan.style, { fontSize: '14px', color: '#202124', fontWeight: '500' });

            const iconSpan = document.createElement('span');
            iconSpan.innerHTML = '&#8599;'; 
            Object.assign(iconSpan.style, { fontSize: '14px', color: '#dadce0' });

            titleRow.appendChild(nameSpan);
            titleRow.appendChild(iconSpan);

            const descSpan = document.createElement('span');
            descSpan.textContent = link.desc + (link._categoryName ? ` • ${link._categoryName}` : '');
            Object.assign(descSpan.style, { fontSize: '11px', color: '#5f6368' });

            item.appendChild(titleRow);
            item.appendChild(descSpan);

            item.onmouseenter = () => {
                item.style.backgroundColor = '#f1f3f4';
                iconSpan.style.color = '#1a73e8';
            };
            item.onmouseleave = () => {
                item.style.backgroundColor = 'transparent';
                iconSpan.style.color = '#dadce0';
            };
            item.onclick = () => window.open(link.url, '_blank');

            contentArea.appendChild(item);
        });
    }

    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        if (searchTerm !== "") {
            Array.from(tabsContainer.children).forEach(c => {
                c.style.backgroundColor = 'transparent';
                c.style.color = '#5f6368';
                c.style.borderColor = '#dadce0';
            });
        } else {
            renderTabs();
        }
        renderList();
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
    renderList();
}