// utils.js

// --- 1. FUNÇÕES GLOBAIS EXPORTADAS ---

export function initGlobalStylesAndFont() {
    // Carrega a fonte Poppins
    const fontId = "poppins-google-font";
    if (!document.getElementById(fontId)) {
        const link = document.createElement("link");
        link.id = fontId;
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap";
        document.head.appendChild(link);
    }

    // Carrega os estilos globais do CSA
    const csaStyleId = "call-script-assistant-styles";
    if (!document.getElementById(csaStyleId)) {
        const styleEl = document.createElement("style");
        styleEl.id = csaStyleId;
        styleEl.textContent = `
            .csa-group-container { border-left: 3px solid transparent; padding-left: 5px; transition: all 0.3s ease-out; }
            .csa-group-title { transition: color 0.3s ease-out; }
            .csa-group-container.csa-group-completed { border-left: 3px solid #34a853; }
            .csa-group-container.csa-group-completed .csa-group-title { color: #34a853; }
            .csa-li { margin: 4px 0; padding: 8px 10px; border-radius: 6px; border: 2px solid transparent; transition: all 0.2s ease; font-size: 14px; cursor: pointer; user-select: none; background-color: #f8f9fa; color: #202124; line-height: 1.4; text-decoration: none; transform: scale(1); }
            .csa-li:hover { background-color: #f1f3f4; }
            .csa-li.csa-completed { text-decoration: line-through; color: #5f6368; transform: scale(0.98); }
        `;
        document.head.appendChild(styleEl);
    }
}

export function showToast(message, opts = {}) {
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

export function makeDraggable(element, handle) {
    const dragHandle = handle || element;
    let isDragging = false, initialMouseX, initialMouseY, initialElemX, initialElemY;
    dragHandle.onmousedown = function(e) {
        e.preventDefault(); isDragging = true;
        dragHandle.style.cursor = 'grabbing';
        initialMouseX = e.clientX; initialMouseY = e.clientY;
        const rect = element.getBoundingClientRect();
        initialElemX = rect.left; initialElemY = rect.top;
        element.style.top = initialElemY + 'px';
        element.style.left = initialElemX + 'px';
        element.style.right = 'auto';
        element.style.bottom = 'auto';
        if (element.id === 'autofill-popup' || element.id === 'call-script-popup') {
            element.style.transform = 'scale(1)';
        }
        document.onmousemove = onMouseMove;
        document.onmouseup = onMouseUp;
    };
    function onMouseMove(e) {
        if (!isDragging) return;
        const deltaX = e.clientX - initialMouseX, deltaY = e.clientY - initialMouseY;
        let newElemX = initialElemX + deltaX, newElemY = initialElemY + deltaY;
        const vpWidth = window.innerWidth, vpHeight = window.innerHeight;
        const elemWidth = element.offsetWidth, elemHeight = element.offsetHeight;
        if (newElemX < 0) newElemX = 0;
        if (newElemY < 0) newElemY = 0;
        if (newElemX + elemWidth > vpWidth) newElemX = vpWidth - elemWidth;
        if (newElemY + elemHeight > vpHeight) newElemY = vpHeight - elemHeight;
        element.style.top = newElemY + 'px';
        element.style.left = newElemX + 'px';
    }
    function onMouseUp() {
        isDragging = false;
        dragHandle.style.cursor = 'grab';
        document.onmousemove = null;
        document.onmouseup = null;
    }
}



export const styleSelect = {
    width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0",
    fontSize: "14px", marginBottom: "16px", background: "#fff", color: "#202124",
    outline: "none", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif"
};
export const styleLabel = {
    fontSize: "13px", fontWeight: "500", color: "#3c4043",
    marginBottom: "4px", display: "block"
};
export const stylePopup = {
    position: "fixed", top: "24px", padding: "16px",
    background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,.2)",
    fontFamily: "'Poppins', sans-serif", zIndex: "999999",
    width: "360px", border: "1px solid #dadce0",
    maxHeight: "90vh", overflowY: "auto", textAlign: "left",
    transition: "opacity .3s ease, transform .3s ease", opacity: "0",
    pointerEvents: "none", transform: "scale(0.95)"
};
export const stylePopupHeader = {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "8px", marginBottom: "16px", textAlign: "center", cursor: "grab"
};
export const stylePopupTitle = {
    fontSize: "16px", fontWeight: "600", color: "#202124"
};
export const stylePopupCloseBtn = {
    position: "absolute", top: "8px", right: "10px", fontSize: "18px",
    color: "#5f6368", cursor: "pointer"
};
export const styleFloatingButton = {
    position: "fixed", right: "20px", width: "48px", height: "48px",
    borderRadius: "50%", border: "none", background: "#1a73e8", color: "#fff",
    fontSize: "22px", fontWeight: "500", boxShadow: "0 4px 10px rgba(0,0,0,.3)",
    cursor: "grab", zIndex: "999998", transition: "background .2s"
};