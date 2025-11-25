// src/modules/feedback/feedback-assistant.js

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

// --- BANCO DE DADOS DE LINKS (Escalável) ---
const LINKS_DB = {
    lm: {
        label: "LM Forms",
        icon: "📊", // Pode substituir por SVG
        links: [
            { name: "Relatório de Ocorrências", url: "https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform", desc: "Reportar problemas operacionais" },
            { name: "Chamadas Excedidas (>50min)", url: "https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform", desc: "Registro de chamadas longas" },
            { name: "Relatório de Bugs", url: "https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform", desc: "Erros de sistema/ferramenta" }
        ]
    },
    qa: {
        label: "QA & Quality",
        icon: "✅",
        links: [
            { name: "Elogios", url: "https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform", desc: "Feedback positivo" },
            { name: "Casos Complexos", url: "https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw", desc: "Escalonamento técnico" }
        ]
    },
    suporte: {
        label: "Central de Ajuda",
        icon: "🔧",
        links: [
            { name: "Suporte Google Ads", url: "https://support.google.com/google-ads/", desc: "Help Center Oficial" },
            { name: "Suporte GA4", url: "https://support.google.com/analytics/", desc: "Documentação do Analytics" },
            { name: "Suporte Merchant Center", url: "https://support.google.com/merchants/gethelp", desc: "GMC Help" }
        ]
    },
    outros: {
        label: "Diversos",
        icon: "📂",
        links: [
            { name: "Solicitar Gravação", url: "https://support.google.com/policies/contact/sar", desc: "SAR Request" }
        ]
    }
};

export function initFeedbackAssistant() {
    const CURRENT_VERSION = "v2.0 ";

    // --- ESTADO ---
    let activeTab = 'lm'; // Tab inicial
    let searchTerm = "";

    // --- ESTILOS LOCAIS (Material Design) ---
    const styleSearchInput = {
        width: "100%", padding: "10px 12px 10px 36px",
        borderRadius: "8px", border: "none", background: "#f1f3f4",
        fontSize: "14px", boxSizing: "border-box", outline: "none",
        color: "#3c4043", marginBottom: "8px", transition: "background 0.2s"
    };

    const styleTabContainer = {
        display: "flex", gap: "8px", overflowX: "auto", 
        paddingBottom: "8px", marginBottom: "8px",
        borderBottom: "1px solid #dadce0", scrollbarWidth: "none"
    };

    const styleTabButton = {
        padding: "6px 16px", borderRadius: "16px", border: "1px solid #dadce0",
        background: "transparent", color: "#5f6368", fontSize: "13px",
        fontWeight: "500", cursor: "pointer", whiteSpace: "nowrap",
        transition: "all 0.2s ease"
    };

    const styleActiveTab = {
        background: "#e8f0fe", color: "#1967d2", borderColor: "#e8f0fe", fontWeight: "600"
    };

    const styleListItem = {
        display: "flex", flexDirection: "column", padding: "12px",
        borderRadius: "8px", cursor: "pointer", border: "1px solid transparent",
        marginBottom: "4px", transition: "background 0.1s"
    };

    // --- UI PRINCIPAL ---
    
    // --- UI: Botão Flutuante (Material Design Pro) ---
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
        position: "fixed", top: "35%", right: "24px", zIndex: "9999",
        display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px"
    });

    const btn = document.createElement("button");
    btn.id = "feedback-floating-btn";
    // Ícone SVG: Bookmarks
    btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19 18l2 1V3c0-1.1-.9-2-2-2H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13zM15 5H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z"/></svg>`;

    Object.assign(btn.style, {
        width: "48px", height: "48px", borderRadius: "50%",
        background: "#34a853", color: "white", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 12px rgba(52, 168, 83, 0.4)", // Sombra esverdeada
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
    makeDraggable(btn, btnContainer);

    // 2. Popup Container
    const popup = document.createElement("div");
    popup.id = "feedback-popup";
    Object.assign(popup.style, stylePopup, { 
        right: "100px", width: "320px", maxHeight: "500px",
        display: "flex", flexDirection: "column", borderRadius: "12px"
    }); 

    // 3. Header
    const header = document.createElement("div");
    Object.assign(header.style, stylePopupHeader, { padding: "16px 16px 0 16px", borderBottom: "none", flexDirection: "column", alignItems: "flex-start" });
    makeDraggable(popup, header);

    // Top Header (Logo + Title + Close)
    const headerTop = document.createElement("div");
    Object.assign(headerTop.style, { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "12px" });

    const titleGroup = document.createElement("div");
    Object.assign(titleGroup.style, { display: "flex", alignItems: "center", gap: "8px" });
    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "20px", height: "20px" });
    const title = document.createElement("div");
    title.textContent = "Links Úteis";
    Object.assign(title.style, stylePopupTitle);

    titleGroup.appendChild(logo);
    titleGroup.appendChild(title);

    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✕";
    closeBtn.classList.add('no-drag');
    Object.assign(closeBtn.style, stylePopupCloseBtn, { fontSize: "14px", color: "#5f6368" });
    closeBtn.onclick = () => togglePopup(false);

    headerTop.appendChild(titleGroup);
    headerTop.appendChild(closeBtn);
    header.appendChild(headerTop);

    // Search Bar
    const searchContainer = document.createElement("div");
    Object.assign(searchContainer.style, { position: "relative", width: "100%" });
    const searchIcon = document.createElement("span");
    searchIcon.innerHTML = "🔍"; 
    Object.assign(searchIcon.style, { position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", opacity: "0.5", pointerEvents: "none" });
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Buscar link, form ou ajuda...";
    Object.assign(searchInput.style, styleSearchInput);
    
    searchContainer.appendChild(searchIcon);
    searchContainer.appendChild(searchInput);
    header.appendChild(searchContainer);

    // Tabs Container
    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, styleTabContainer);
    header.appendChild(tabsContainer);

    popup.appendChild(header);

    // 4. Content Area
    const contentArea = document.createElement("div");
    Object.assign(contentArea.style, {
        padding: "0 8px 8px 8px", 
        overflowY: "auto",
        flexGrow: "1"
    });
    popup.appendChild(contentArea);

    // 5. Footer
    const footer = document.createElement("div");
    Object.assign(footer.style, { 
        padding: "8px 16px", borderTop: "1px solid #eee", 
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: "10px", color: "#9aa0a6"
    });
    footer.innerHTML = `<span>${CURRENT_VERSION}</span><span>by lucaste@</span>`;
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
            // Busca Global
            Object.values(LINKS_DB).forEach(cat => {
                const filtered = cat.links.filter(l => 
                    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    l.desc.toLowerCase().includes(searchTerm.toLowerCase())
                );
                // Adiciona o nome da categoria para contexto
                filtered.forEach(item => item._categoryName = cat.label);
                linksToShow = [...linksToShow, ...filtered];
            });
        } else {
            // Busca por Categoria Ativa
            linksToShow = LINKS_DB[activeTab].links;
        }

        if (linksToShow.length === 0) {
            contentArea.innerHTML = `<div style="text-align:center; padding:20px; color:#9aa0a6; fontSize:13px;">Nenhum link encontrado.</div>`;
            return;
        }

        linksToShow.forEach(link => {
            const item = document.createElement('div');
            Object.assign(item.style, styleListItem);

            // Título
            const titleRow = document.createElement('div');
            Object.assign(titleRow.style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' });
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = link.name;
            Object.assign(nameSpan.style, { fontSize: '14px', color: '#202124', fontWeight: '500' });

            // Ícone "External Link"
            const iconSpan = document.createElement('span');
            iconSpan.innerHTML = '&#8599;'; // Seta NE
            Object.assign(iconSpan.style, { fontSize: '14px', color: '#dadce0' });

            titleRow.appendChild(nameSpan);
            titleRow.appendChild(iconSpan);

            // Descrição
            const descSpan = document.createElement('span');
            descSpan.textContent = link.desc + (link._categoryName ? ` • ${link._categoryName}` : '');
            Object.assign(descSpan.style, { fontSize: '11px', color: '#5f6368' });

            item.appendChild(titleRow);
            item.appendChild(descSpan);

            // Interações
            item.onmouseenter = () => {
                item.style.backgroundColor = '#f1f3f4';
                iconSpan.style.color = '#1a73e8';
            };
            item.onmouseleave = () => {
                item.style.backgroundColor = 'transparent';
                iconSpan.style.color = '#dadce0';
            };
            
            item.onclick = () => {
                window.open(link.url, '_blank');
                // Opcional: fechar popup ao clicar?
                // togglePopup(false); 
            };

            contentArea.appendChild(item);
        });
    }

    // --- EVENTOS ---
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        if (searchTerm !== "") {
            // Visualmente desmarca abas durante a busca
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
        visible = !visible;
        togglePopup(visible);
    };

    // INICIALIZAÇÃO
    renderTabs();
    renderList();
}