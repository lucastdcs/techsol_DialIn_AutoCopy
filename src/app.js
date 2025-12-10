// src/app.js

// 1. Importação dos Módulos
import { initCaseNotesAssistant } from './modules/notes/notes-assistant.js';
import { initQuickEmailAssistant } from './modules/quick-email/quick-email-assistant.js';
import { initCallScriptAssistant } from './modules/call-script/call-script-assistant.js';
import { initFeedbackAssistant } from './modules/lm-report/lm-repot-assistant.js'; 
import { initBroadcastAssistant } from './modules/broadcast/broadcast-assistant.js'; // <--- NOVO
import { initMagicWand } from "./modules/ai/magic-wand.js";

// 2. Importação do Núcleo Compartilhado
import { initCommandCenter } from './modules/shared/command-center.js';
import { initGlobalStylesAndFont, playStartupAnimation, showToast } from './modules/shared/utils.js';

function initApp() {
    if (window.techSolInitialized) {
        playStartupAnimation();
        return;
    }
    window.techSolInitialized = true;

    console.log('🚀 TechSol Suite Initializing...');

    try {
        // A. Injeta estilos globais
        initGlobalStylesAndFont();

        // B. Animação de Entrada
        playStartupAnimation();

        // C. Inicializa os Módulos
        const toggleNotes = initCaseNotesAssistant();
        const toggleEmail = initQuickEmailAssistant();
        const toggleScript = initCallScriptAssistant();
        const toggleLinks = initFeedbackAssistant();
        
        // Broadcast retorna um objeto: { toggle: fn, hasUnread: bool }
        const broadcastControl = initBroadcastAssistant(); // <--- NOVO

        initMagicWand(); // <--- Faltava essa linha no seu código!

        // D. Inicializa a Barra de Comando
        initCommandCenter({
            toggleNotes,
            toggleEmail,
            toggleScript,
            toggleLinks,
            broadcastControl,
             // <--- Passamos o objeto inteiro para lá
        });

    } catch (error) {
        console.error("Erro fatal na inicialização:", error);
        showToast("Erro crítico ao iniciar o Case Wizard.", { error: true });
    }
}

initApp();