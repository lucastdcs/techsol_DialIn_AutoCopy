// utils.js

export function initGlobalStylesAndFont() {
    // Verifica se os estilos já foram injetados
    if (document.getElementById('google-font-poppins') && document.getElementById('techsol-global-styles')) {
        return;
    }

    // Adiciona a fonte Poppins do Google Fonts
    const link = document.createElement('link');
    link.id = 'google-font-poppins';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Injeta estilos globais para scrollbar e outros defaults
    const style = document.createElement('style');
    style.id = 'techsol-global-styles';
    style.textContent = `
        /* Estilos da Scrollbar (WebKit) */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
        
        /* Estilos de input/textarea para focar na fonte */
        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: #1a73e8 !important;
            box-shadow: 0 0 0 1px #1a73e8 !important;
        }

        /* Estilos para o efeito de click dos botões */
        button:active {
            transform: translateY(1px);
        }

        /* Estilos para campos de texto com bullet */
        textarea.bullet-textarea {
            padding-left: 10px; /* Ajuste para o bullet */
        }
        
        /* ===== CORREÇÃO CALL SCRIPT: LINHAS JUNTAS ===== */
        .csa-li { 
            margin: 8px 0 !important; /* Aumentado de 4px para 8px */
        }
    `;
    document.head.appendChild(style);
}

export function showToast(message, opts = {}) {
    // ... (código showToast sem alterações) ...
    const toast = document.createElement("div");
    Object.assign(toast.style, {
        position: "fixed", bottom: "24px", left: "50%",
        transform: "translateX(-50%) translateY(20px)",
        background: opts.error ? "#d93025" : "#323232",
        color: "#fff", padding: "14px 24px", borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0,0,0,.3)", fontFamily: "'Poppins', sans-serif",
        fontSize: "14px", lineHeight: "20px", zIndex: "9999999",
        opacity: "0", transition: "opacity .3s ease, transform .3s ease"
    });
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateX(-50%) translateY(0)";
    });
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(20px)";
        setTimeout(() => toast.remove(), 300);
    }, opts.duration || 4000);
}

// ===== CORREÇÃO HEADER: LÓGICA DE ARRASTAR ATUALIZADA =====
export function makeDraggable(element, handle = null) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const dragHandle = handle || element;

    dragHandle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        // Impede o drag se o alvo for um botão, input, ou tiver a classe 'no-drag'
        if (e.target.tagName === 'INPUT' || 
            e.target.tagName === 'TEXTAREA' || 
            e.target.tagName === 'SELECT' || 
            e.target.tagName === 'BUTTON' || 
            e.target.classList.contains('no-drag')) { // <-- MUDANÇA AQUI
            return; 
        }
        
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
// ========================================================


// =========================================================
//           ESTILOS PADRÃO (Com atualizações)
// =========================================================

export const styleFloatingButton = {
    position: "fixed",
    right: "20px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#1a73e8",
    color: "#fff",
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
    zIndex: "9999",
    border: "none",
    transition: "background-color 0.2s ease, transform 0.2s ease",
    fontFamily: "'Poppins', sans-serif"
};

export const stylePopup = {
    position: "fixed",
    top: "calc(50% - 250px)",
    width: "380px", 
    maxHeight: "90vh",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2), 0 0 4px rgba(0,0,0,0.08)",
    zIndex: "9999",
    overflow: "hidden", 
    display: "flex",
    flexDirection: "column",
    transition: "opacity 0.3s ease-out, transform 0.3s ease-out, width 0.3s ease-out", 
    opacity: "0",
    transform: "scale(0.95)",
    pointerEvents: "none",
    fontFamily: "'Poppins', sans-serif"
};

// ===== CORREÇÃO HEADER: Estilo do Header =====
export const stylePopupHeader = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // <-- MUDANÇA AQUI
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dadce0",
    cursor: "grab",
    userSelect: "none",
    gap: "10px"
};
// ===========================================

export const stylePopupTitle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#202124",
    flexGrow: "1" // Permite que o container do título cresça
};

export const stylePopupVersion = {
    fontSize: "12px",
    fontWeight: "400",
    color: "#70757a",
    marginTop: "4px",
    // marginLeft: "34px" // Não é mais necessário com flex
};

// ===== CORREÇÃO HEADER: Estilo do Botão Fechar =====
export const stylePopupCloseBtn = {
    // Posição absoluta removida
    fontSize: "20px",
    color: "#5f6368",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "50%",
    transition: "background-color 0.2s ease, color 0.2s ease",
    lineHeight: "1",
    zIndex: "10",
    marginLeft: "8px" // Adiciona espaço entre os botões
};
// ===============================================

export const styleLabel = {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#3c4043",
    marginBottom: "8px",
    marginTop: "16px"
};

export const styleSelect = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #dadce0",
    backgroundColor: "#fff",
    fontSize: "14px",
    color: "#3c4043",
    boxSizing: "border-box",
    appearance: "none", 
    backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%233c4043%22%20d%3D%22M287%20197.3l-116.5-116.5c-4.7-4.7-12.4-4.7-17.1%200L5.4%20197.3c-4.7%204.7-4.7%2012.4%200%2017.1l17.1%2017.1c4.7%204.7%2012.4%204.7%2017.1%200l94.3-94.3c4.7-4.7%2012.4-4.7%2017.1%200l94.3%2094.3c4.7%204.7%2012.4%204.7%2017.1%200l17.1-17.1c4.7-4.7%204.7-12.4%200-17.1z%22%2F%3E%3C%2Fsvg%3E')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    backgroundSize: "10px",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    fontFamily: "'Poppins', sans-serif"
};

export const styleButtonBase = {
    flex: "1 1 0",
    padding: "10px 0",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "16px",
    transition: "background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
};

export const styleCredit = {
    fontSize: "10px",
    color: "#9aa0a6",
    textAlign: "center",
    padding: "8px 16px",
    borderTop: "1px solid #eee",
    marginTop: "16px"
};

// ===== CORREÇÃO HEADER: Estilo do Botão Expandir =====
export const styleExpandButton = {
    // Posição absoluta removida
    fontSize: "18px",
    color: "#5f6368",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "50%",
    transition: "background-color 0.2s ease, color 0.2s ease",
    lineHeight: "1",
    zIndex: "10",
    marginRight: "10px"
};
// ================================================