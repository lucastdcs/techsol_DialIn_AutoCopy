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

// --- NOVO: Gerenciador de Som ---
import { SoundManager } from './modules/shared/sound-manager.js';

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

        // --- NOVO: Inicialização Sonora ---
        try {
            // 1. Liga o "Ouvido Global" para Hovers em todos os botões
            SoundManager.initGlobalListeners(); 
            
            // 2. Toca o som de Startup (THX Style)
            // Nota: Navegadores podem bloquear se não houver interação prévia, 
            // mas como é um bookmarklet clicado, costuma passar.
            SoundManager.playStartup(); 
        } catch (audioErr) {
            console.warn("Áudio não pôde ser iniciado automaticamente:", audioErr);
        }
        // ---------------------------------
        
        // B. Busca as Dicas em Background (Silenciosamente)
        DataService.fetchTips();

        // C. Animação de Entrada Visual
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