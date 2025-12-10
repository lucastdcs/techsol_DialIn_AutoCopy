// src/app.js

// 1. Importação dos Módulos
import { initCaseNotesAssistant } from './modules/notes/notes-assistant.js';
import { initQuickEmailAssistant } from './modules/quick-email/quick-email-assistant.js';
import { initCallScriptAssistant } from './modules/call-script/call-script-assistant.js';
import { initFeedbackAssistant } from './modules/lm-report/lm-repot-assistant.js'; 
import { initBroadcastAssistant } from './modules/broadcast/broadcast-assistant.js'; 
// import { initMagicWand } from "./modules/ai/magic-wand.js"; <--- PODE REMOVER ESTA LINHA

// Importação do Serviço de Dados
import { DataService } from './modules/shared/data-service.js';

// 2. Importação do Núcleo Compartilhado
import { initCommandCenter } from './modules/shared/command-center.js';
import { initGlobalStylesAndFont, playStartupAnimation, showToast } from './modules/shared/utils.js';

function initApp() {
    if (window.techSolInitialized) {
        // Se já iniciou, só toca a animação de novo (opcional)
        playStartupAnimation();
        return;
    }
    window.techSolInitialized = true;

    console.log('🚀 TechSol Suite Initializing...');

    try {
        // A. Injeta estilos globais
        initGlobalStylesAndFont();
        
        // B. Busca as Dicas em Background (Silenciosamente)
        // Isso garante que o cache esteja pronto quando o usuário clicar nos botões
        DataService.fetchTips();

        // C. Animação de Entrada
        playStartupAnimation();

        // D. Inicializa os Módulos
        const toggleNotes = initCaseNotesAssistant();
        const toggleEmail = initQuickEmailAssistant();
        const toggleScript = initCallScriptAssistant();
        const toggleLinks = initFeedbackAssistant();
        
        // Broadcast
        const broadcastControl = initBroadcastAssistant(); 

        // E. Inicializa a Barra de Comando
        initCommandCenter({
            toggleNotes,
            toggleEmail,
            toggleScript,
            toggleLinks,
            broadcastControl
        });

    } catch (error) {
        console.error("Erro fatal na inicialização:", error);
        showToast("Erro crítico ao iniciar o Case Wizard.", { error: true });
    }
}

initApp();