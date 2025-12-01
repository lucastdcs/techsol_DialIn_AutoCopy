
let highestZIndex = 10000; 

export function initGlobalStylesAndFont() {
    if (document.getElementById('google-font-poppins') && document.getElementById('techsol-global-styles')) {
        return;
    }
    const link = document.createElement('link');
    link.id = 'google-font-poppins';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.id = 'techsol-global-styles';
    style.textContent = `
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        
        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: #1a73e8 !important;
            box-shadow: 0 0 0 1px #1a73e8 !important;
        }
        button:active { transform: translateY(1px); }
        textarea.bullet-textarea { padding-left: 10px; }
        
        .csa-group-container { border-left: 3px solid transparent; padding-left: 5px; transition: all 0.3s ease-out; }
        .csa-group-title { transition: color 0.3s ease-out; }
        .csa-group-container.csa-group-completed { border-left: 3px solid #34a853; }
        .csa-group-container.csa-group-completed .csa-group-title { color: #34a853; }
        
        .csa-li { 
            margin: 8px 0 !important; 
            padding: 8px 10px; border-radius: 6px; border: 2px solid transparent;
            transition: all 0.2s ease; font-size: 14px; cursor: pointer; user-select: none;
            background-color: #f8f9fa; color: #202124; line-height: 1.4;
            text-decoration: none; transform: scale(1);
        }
        .csa-li:hover { background-color: #f1f3f4; transform: scale(1.02); }
        .csa-li.csa-completed { text-decoration: line-through; color: #5f6368; transform: scale(0.98); }
    `;
    document.head.appendChild(style);
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

export function makeDraggable(element, handle = null) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const dragHandle = handle || element;
    
    dragHandle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        // Ignora inputs e botões internos
        if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(e.target.tagName) || 
            e.target.classList.contains('no-drag')) {
            return; 
        }

        e = e || window.event;
        e.preventDefault();

        // === CORREÇÃO 1: O PULO ===
        // Captura a posição visual ATUAL exata
        const rect = element.getBoundingClientRect();
        
        // 1. Fixa a posição usando Left/Top ANTES de remover o Right
        element.style.left = rect.left + "px";
        element.style.top = rect.top + "px";
        
        // 2. Agora sim, remove as âncoras que causam conflito
        element.style.right = 'auto';
        element.style.bottom = 'auto';
        
        // 3. Fixa a largura para evitar deformação ao encostar na borda
        element.style.width = rect.width + "px";
        // ===========================

        // Z-Index e Inicialização
        highestZIndex++;
        element.style.zIndex = highestZIndex;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Reseta flag de arrasto
        element.setAttribute('data-dragging', 'false');
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        
        // Calcula quanto moveu
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // === CORREÇÃO 2: DETECTAR ARRASTO ===
        // Se moveu, marca como 'arrastando' para não disparar o click depois
        element.setAttribute('data-dragging', 'true');
        // ====================================
        
        // Aplica nova posição
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        
        // Remove a flag de arrasto após um breve delay
        // Isso permite que o evento 'click' verifique a flag antes dela sumir
        setTimeout(() => {
            element.setAttribute('data-dragging', 'false');
        }, 100);
    }
}

// =========================================================
//           ESTILOS PADRÃO
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
    transition: "background-color 0.2s ease, transform 0.2s ease-out", 
    transform: 'scale(1)', 
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
    transition: "opacity 0.2s ease-out, transform 0.2s ease-out, width 0.3s ease-out", 
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
    fontSize: "18px",
    color: "#5f6368",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "50%",
    transition: "background-color 0.2s ease, color 0.2s ease",
    lineHeight: "1",
    zIndex: "10"
};

// ===== ESTILO COMPARTILHADO (BAU/LT/LM/PT/ES) =====
export const typeBtnStyle = { 
    padding: '6px 12px', 
    cursor: 'pointer', 
    fontSize: '14px', 
    fontWeight: '500', 
    color: '#5f6368', 
    background: '#f8f9fa', 
    transition: 'all 0.2s ease' ,
    width: "100%",
    textAlign: "center"
};

// ===== CORES DO GOOGLE (Para sorteio) =====
const GOOGLE_COLORS_LIST = [
    { background: '#E8F0FE', color: '#1967D2' }, // Azul
    { background: '#FCE8E6', color: '#C5221F' }, // Vermelho
    { background: '#FEF7E0', color: '#F29900' }, // Amarelo
    { background: '#E6F4EA', color: '#1E8E3E' }  // Verde
];

let lastColorIndex = -1;

export function getRandomGoogleStyle() {
    let newIndex = Math.floor(Math.random() * GOOGLE_COLORS_LIST.length);
    
    if (newIndex === lastColorIndex) {
        newIndex = (newIndex + 1) % GOOGLE_COLORS_LIST.length;
    }
    
    lastColorIndex = newIndex;
    return GOOGLE_COLORS_LIST[newIndex]; 
}

// =========================================
// --- ANIMAÇÕES GOOGLE (Novo) ---
// =========================================

// 1. Injeta os estilos da animação na página (roda uma vez só)
let googleStylesInjected = false;
function injectGoogleAnimationStyles() {
    if (googleStylesInjected) return;

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes google-pulse-ring {
            0% {
                box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.7); /* Azul */
            }
            25% {
                box-shadow: 0 0 0 10px rgba(234, 67, 53, 0); /* Vermelho */
            }
            50% {
                box-shadow: 0 0 0 20px rgba(251, 188, 5, 0); /* Amarelo */
            }
            100% {
                box-shadow: 0 0 0 30px rgba(52, 168, 83, 0); /* Verde */
            }
        }

        .google-animate-click {
            animation: google-pulse-ring 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
    `;
    document.head.appendChild(style);
    googleStylesInjected = true;
}

// 2. Função que os módulos vão chamar para animar um botão
export function triggerGoogleAnimation(element) {
    // Garante que os estilos existem
    injectGoogleAnimationStyles();

    // Remove a classe se já estiver rodando (para poder reiniciar)
    element.classList.remove('google-animate-click');

    // Força um "reflow" para o navegador perceber que removemos a classe
    void element.offsetWidth; 

    // Adiciona a classe que roda a animação
    element.classList.add('google-animate-click');

    // Limpa a classe depois que a animação termina
    setTimeout(() => {
        element.classList.remove('google-animate-click');
    }, 600); // O mesmo tempo da duração da animação no CSS
}

// =========================================
// --- STARTUP ANIMATION (Splash Screen) ---
// =========================================
export function playStartupAnimation() {
    if (document.getElementById('techsol-splash-screen')) return;

    // 1. Container (Overlay)
    const splash = document.createElement('div');
    splash.id = 'techsol-splash-screen';
    Object.assign(splash.style, {
        position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
        backgroundColor: '#ffffff', // Fundo branco puro (Google Style)
        zIndex: '2147483647',
        display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center',
        opacity: '0', transition: 'opacity 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
        fontFamily: "'Poppins', 'Roboto', sans-serif" // Fonte limpa
    });

    // 2. Conteúdo Central
    const content = document.createElement('div');
    content.style.textAlign = 'center';
    
    // Logo "Cases Wizard" (Tipografia Google: Cinza Escuro, Peso Médio)
    const logoHTML = `
        <div style="
            font-size: 36px; 
            font-weight: 500; 
            color: #5f6368; 
            margin-bottom: 24px; 
            letter-spacing: -0.5px;
            animation: slide-up 0.6s cubic-bezier(0.0, 0.0, 0.2, 1);
        ">
            Cases Wizard
        </div>
    `;

    // Barra de Progresso (Material Design Indeterminate)
    const loaderHTML = `
        <div class="google-material-loader">
            <div class="indeterminate"></div>
        </div>
    `;
    
    content.innerHTML = logoHTML + loaderHTML;

    // 3. Créditos (Discreto no rodapé)
    const credit = document.createElement('div');
    credit.innerHTML = "created by <span style='color: #1a73e8; font-weight: 500;'>@lucaste</span>";
    Object.assign(credit.style, {
        position: 'absolute', bottom: '40px',
        fontSize: '12px', color: '#9aa0a6',
        opacity: '0', // Começa invisível
        animation: 'fade-in 0.8s ease-out 0.5s forwards' // Aparece com delay
    });

    // 4. CSS Injetado (Animações e Cores Oficiais)
    const style = document.createElement('style');
    style.innerHTML = `
        /* Container da Barra */
        .google-material-loader {
            position: relative;
            height: 4px;
            display: block;
            width: 240px; /* Largura elegante */
            background-color: #e0e0e0; /* Cinza claro fundo */
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
        }

        /* A Barra Animada */
        .google-material-loader .indeterminate {
            background-color: #4285F4; /* Google Blue Principal */
        }
        
        .google-material-loader .indeterminate:before {
            content: '';
            position: absolute;
            background-color: inherit;
            top: 0; left: 0; bottom: 0;
            will-change: left, right;
            animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        }
        
        .google-material-loader .indeterminate:after {
            content: '';
            position: absolute;
            background-color: inherit;
            top: 0; left: 0; bottom: 0;
            will-change: left, right;
            animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
            animation-delay: 1.15s;
        }

        /* Keyframes da Barra (Movimento Fluido Google) */
        @keyframes indeterminate {
            0% { left: -35%; right: 100%; }
            60% { left: 100%; right: -90%; }
            100% { left: 100%; right: -90%; }
        }
        @keyframes indeterminate-short {
            0% { left: -200%; right: 100%; }
            60% { left: 107%; right: -8%; }
            100% { left: 107%; right: -8%; }
        }

        /* Keyframes de Entrada */
        @keyframes slide-up {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
            to { opacity: 1; }
        }
    `;
    
    splash.appendChild(style);
    splash.appendChild(content);
    splash.appendChild(credit);
    document.body.appendChild(splash);

    // 5. Sequência de Execução
    
    // Entrada Suave
    requestAnimationFrame(() => {
        splash.style.opacity = '1';
    });

    // Saída Elegante (Após 2.5s para dar tempo de ler "Cases Wizard")
    setTimeout(() => {
        splash.style.opacity = '0'; // Fade out da tela toda
        
        // Remove do DOM
        setTimeout(() => {
            if (splash.parentNode) splash.parentNode.removeChild(splash);
        }, 400); // Tempo da transição CSS
    }, 2500);
}