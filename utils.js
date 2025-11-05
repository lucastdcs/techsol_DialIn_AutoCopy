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

    // Injeta estilos globais
    const style = document.createElement('style');
    style.id = 'techsol-global-styles';
    style.textContent = `
        /* ... (estilos da scrollbar mantidos) ... */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        
        /* ... (estilos de input/textarea mantidos) ... */
        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: #1a73e8 !important;
            box-shadow: 0 0 0 1px #1a73e8 !important;
        }
        button:active { transform: translateY(1px); }
        textarea.bullet-textarea { padding-left: 10px; }
        
        /* ===== CORREÇÃO: ESPAÇAMENTO E ANIMAÇÃO DO CALL SCRIPT ===== */
        .csa-group-container { border-left: 3px solid transparent; padding-left: 5px; transition: all 0.3s ease-out; }
        .csa-group-title { transition: color 0.3s ease-out; }
        .csa-group-container.csa-group-completed { border-left: 3px solid #34a853; }
        .csa-group-container.csa-group-completed .csa-group-title { color: #34a853; }
        
        .csa-li { 
            margin: 8px 0 !important; /* <<< CORRIGIDO (era 4px) */
            padding: 8px 10px;
            border-radius: 6px;
            border: 2px solid transparent;
            transition: all 0.2s ease; /* Transição geral */
            font-size: 14px;
            cursor: pointer;
            user-select: none;
            background-color: #f8f9fa;
            color: #202124;
            line-height: 1.4;
            text-decoration: none;
            transform: scale(1);
        }
        /* ANIMAÇÃO DE HOVER (SALTO) */
        .csa-li:hover { 
            background-color: #f1f3f4;
            transform: scale(1.02); 
        }
        .csa-li.csa-completed { 
            text-decoration: line-through; 
            color: #5f6368; 
            transform: scale(0.98); 
        }
        /* ======================================================== */
    `;
    document.head.appendChild(style);
}

export function showToast(message, opts = {}) {
    // ... (código showToast mantido) ...
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

export function makeDraggable(element, handle = null) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const dragHandle = handle || element;

    dragHandle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (e.target.tagName === 'INPUT' || 
            e.target.tagName === 'TEXTAREA' || 
            e.target.tagName === 'SELECT' || 
            e.target.tagName === 'BUTTON' || 
            e.target.classList.contains('no-drag')) {
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


// ===== ESTILOS PADRÃO (Com atualizações de animação) =====

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
    transition: "background-color 0.2s ease, transform 0.2s ease-out", // <-- Transição atualizada
    transform: 'scale(1)', // <-- Estado base
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
    transition: "opacity 0.2s ease-out, transform 0.2s ease-out, width 0.3s ease-out", // <-- Transição mais rápida
    opacity: "0",
    transform: "scale(0.95)",
    pointerEvents: "none",
    fontFamily: "'Poppins', sans-serif"
};

export const stylePopupHeader = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dadce0",
    cursor: "grab",
    userSelect: "none",
    gap: "10px"
};

export const stylePopupTitle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#202124",
    flexGrow: "1"
};

export const stylePopupVersion = {
    fontSize: "12px",
    fontWeight: "400",
    color: "#70757a",
    marginTop: "4px",
};

export const stylePopupCloseBtn = {
    fontSize: "20px",
    color: "#5f6368",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "50%",
    transition: "background-color 0.2s ease, color 0.2s ease",
    lineHeight: "1",
    zIndex: "10",
    marginLeft: "8px"
};

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
    padding: "10px 36px 10px 12px", 
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

export const styleExpandButton = {
    fontSize: "22px",
    lineHeight: '50px',
    textAlign: 'center',
    color: "#5f6368",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "50%",
    transition: "background-color 0.2s ease, color 0.2s ease",
    lineHeight: "1",
    zIndex: "10"
};