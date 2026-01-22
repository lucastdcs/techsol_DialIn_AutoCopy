style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

    .cw-focus-backdrop {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
        z-index: 2147483646; opacity: 0; pointer-events: none;
        transition: opacity 0.4s ease;
    }
    .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

    /* --- PILL PRINCIPAL --- */
    .cw-pill {
        position: fixed; top: 30%; right: 24px;
        display: flex; flex-direction: column; align-items: center; gap: 12px;
        padding: 16px 8px;
        
        background: ${COLORS.glassBg};
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        border: 1px solid ${COLORS.glassBorder}; border-radius: 50px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
        
        opacity: 0; 
        min-width: 50px; 
        
        /* CORREÇÃO AQUI: Visible para mostrar os tooltips laterais */
        overflow: visible; 

        /* ABRIR: Efeito "Elástico" (Overshoot) */
        transition: 
            width 0.6s cubic-bezier(0.47, 1.64, 0.41, 0.8), 
            height 0.6s cubic-bezier(0.47, 1.64, 0.41, 0.8),
            padding 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8),
            border-radius 0.5s ease,
            opacity 0.3s ease,
            transform 0.6s cubic-bezier(0.47, 1.64, 0.41, 0.8);
    }
    .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

    /* --- ESTADO COLAPSADO --- */
    .cw-pill.collapsed {
        width: 50px !important; 
        height: 50px !important;
        padding: 0 !important;
        border-radius: 50% !important;
        gap: 0;
        cursor: pointer;
        
        /* CORREÇÃO AQUI: Hidden para manter a bolinha perfeita */
        overflow: hidden !important;

        /* FECHAR: Efeito "Back-in" */
        transition: 
            width 0.5s cubic-bezier(0.36, 0, 0.66, -0.56),
            height 0.5s cubic-bezier(0.36, 0, 0.66, -0.56),
            padding 0.4s ease,
            border-radius 0.4s ease,
            opacity 0.3s ease,
            transform 0.5s cubic-bezier(0.36, 0, 0.66, -0.56) !important;
    }
    
    /* --- LOGO DA BOLINHA --- */
    .cw-main-logo {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; 
        transform: scale(2) rotate(180deg);
        color: #fff;
        transition: all 0.3s ease;
    }
    .cw-main-logo svg { width: 24px; height: 24px; fill: currentColor; }
    
    .cw-pill.collapsed .cw-main-logo { 
        opacity: 1; 
        transform: scale(1) rotate(0deg);
        transition: all 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8) 0.2s;
    }

    /* --- CONTEÚDO INTERNO --- */
    .cw-pill > *:not(.cw-main-logo) {
        opacity: 1;
        transform: scale(1);
        /* ABRIR: Itens pulam para fora */
        transition: 
            opacity 0.4s ease 0.2s, 
            transform 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8) 0.2s;
    }

    .cw-pill.collapsed > *:not(.cw-main-logo) {
        opacity: 0; 
        pointer-events: none; 
        /* FECHAR: Sugados para o centro */
        transform: scale(0); 
        transition: 
            opacity 0.25s ease 0s, 
            transform 0.3s cubic-bezier(0.36, 0, 0.66, -0.56) 0s;
    }

    /* --- BOTÕES E TOOLTIPS --- */
    .cw-btn {
        width: 40px; height: 40px; 
        border-radius: 50%; border: none; background: transparent;
        display: flex; align-items: center; justify-content: center; 
        cursor: pointer; position: relative; color: ${COLORS.iconIdle};
        flex-shrink: 0;
    }
    .cw-btn:hover { background: ${COLORS.glassHighlight}; color: ${COLORS.iconActive}; transform: scale(1.1) !important; }

    /* Cores dos Botões */
    .cw-btn.notes.active { color: ${COLORS.blue} !important; background: rgba(138, 180, 248, 0.15); }
    .cw-btn.email.active { color: ${COLORS.red} !important; background: rgba(242, 139, 130, 0.15); }
    .cw-btn.script.active { color: ${COLORS.purple} !important; background: rgba(197, 138, 249, 0.15); }
    .cw-btn.links.active { color: ${COLORS.green} !important; background: rgba(129, 201, 149, 0.15); }
    .cw-btn.broadcast.active { color: ${COLORS.orange} !important; background: rgba(249, 171, 0, 0.15); }
    .cw-btn.timezone.active { color: ${COLORS.teal} !important; background: rgba(0, 191, 165, 0.15); }

    .cw-btn.notes:hover { color: ${COLORS.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
    .cw-btn.email:hover { color: ${COLORS.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
    .cw-btn.script:hover { color: ${COLORS.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
    .cw-btn.links:hover { color: ${COLORS.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
    .cw-btn.broadcast:hover { color: ${COLORS.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); }
    .cw-btn.timezone:hover { color: ${COLORS.teal}; filter: drop-shadow(0 0 5px rgba(0, 191, 165, 0.5)); }

    /* LED Indicador */
    .cw-btn::before {
        content: ''; position: absolute; bottom: 2px; left: 50%; 
        width: 4px; height: 4px; border-radius: 50%;
        background-color: currentColor; box-shadow: 0 0 6px currentColor;
        transform: translateX(-50%) scale(0);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); pointer-events: none;
    }
    .cw-btn.active::before { transform: translateX(-50%) scale(1); }
    
    .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

    /* TOOLTIP (O Nome do Módulo) */
    .cw-btn::after { 
        content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); 
        padding: 6px 12px; border-radius: 6px; 
        background: #202124; color: #fff; 
        font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; 
        opacity: 0; pointer-events: none; 
        transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1); 
        box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap; 
        border: 1px solid rgba(255,255,255,0.15);
        z-index: 2147483648; /* Acima de tudo */
    }
    
    /* Posição do Tooltip baseada no lado da tela */
    .cw-pill.side-right .cw-btn::after { right: 55px; transform-origin: right center; }
    .cw-pill.side-right .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
    
    .cw-pill.side-left .cw-btn::after { left: 55px; transform-origin: left center; }
    .cw-pill.side-left .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }

    /* Outros Elementos */
    .cw-badge {
        position: absolute; top: 8px; right: 8px;
        width: 8px; height: 8px;
        background-color: #d93025; border-radius: 50%;
        border: 1px solid #fff; pointer-events: none;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        z-index: 10;
        animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

    .cw-sep {
        width: 20px; height: 1px; background: rgba(255,255,255,0.2);
        transition: opacity 0.3s ease 0.3s;
        margin: 4px 0;
    }
    .cw-sep.visible { opacity: 1; }
    .cw-pill.collapsed .cw-sep { opacity: 0; transition: opacity 0.1s ease 0s; }

    .cw-grip {
        width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; 
        cursor: grab; margin-bottom: 2px; 
    }
    .cw-grip-bar { 
        width: 24px; height: 4px; background-color: ${COLORS.iconIdle}; border-radius: 4px; 
        opacity: 0.4; transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); 
    }
    .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
    .cw-grip:active { cursor: grabbing; }
    .cw-pill.dragging .cw-grip-bar { background-color: ${COLORS.blue}; width: 16px; opacity: 1; }

    @keyframes successPop {
        0% { box-shadow: 0 0 0 transparent; transform: scale(1); }
        50% { box-shadow: 0 0 15px #81C995; transform: scale(1.05); border-color: #81C995; }
        100% { box-shadow: 0 0 0 transparent; transform: scale(1); }
    }
    .cw-pill.system-check { animation: successPop 0.6s ease-out; }

    /* Processing Center Styles */
    .cw-pill.processing-center {
        top: 50% !important; left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 320px !important; height: 110px !important;
        border-radius: 28px !important;
        background: #202124 !important;
        padding: 0 !important;
        box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important;
        display: flex !important; flex-direction: column !important;
        justify-content: center !important; align-items: center !important;
    }
    .cw-pill.processing-center.collapsed { background: #202124 !important; overflow: visible !important; }
    .cw-pill.processing-center .cw-main-logo { display: none !important; }
    .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
    .cw-center-stage {
        display: flex; flex-direction: column; align-items: center; gap: 14px;
        width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.1s;
        position: relative;
    }
    .cw-center-dots { display: flex; gap: 8px; }
    .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
    .cw-center-dots span:nth-child(1) { background-color: ${COLORS.blue}; animation-delay: -0.32s; }
    .cw-center-dots span:nth-child(2) { background-color: ${COLORS.red}; animation-delay: -0.16s; }
    .cw-center-dots span:nth-child(3) { background-color: ${COLORS.green}; }
    .cw-center-text {
        font-size: 13px; color: #E8EAED; text-align: center; max-width: 90%;
        font-weight: 500; line-height: 1.4; opacity: 0; transform: translateY(10px);
        animation: textSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.2s;
    }
    .cw-center-success { display: none; color: ${COLORS.green}; }
    .cw-center-success svg { width: 40px; height: 40px; }
    .cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .cw-abort-btn {
        position: absolute; bottom: -32px; font-size: 10px; color: rgba(255, 255, 255, 0.2);
        cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; 
        transition: all 0.3s ease; user-select: none; margin-bottom: 8px;
    }
    .cw-abort-btn:hover { color: #F28B82; opacity: 1; }
    @keyframes fadeIn { to { opacity: 1; } }
    @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes googleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }
`;