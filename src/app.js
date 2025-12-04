// src/app.js

// 1. Importação dos Módulos
import { initCaseNotesAssistant } from './modules/notes/notes-assistant.js';
import { initQuickEmailAssistant } from './modules/quick-email/quick-email-assistant.js';
import { initCallScriptAssistant } from './modules/call-script/call-script-assistant.js';
import { initFeedbackAssistant } from './modules/feedback/feedback-assistant.js'; 

// 2. Importação do Núcleo Compartilhado
import { initCommandCenter } from './modules/shared/command-center.js';
import { initGlobalStylesAndFont, playStartupAnimation, showToast } from './modules/shared/utils.js';

function initApp() {
    // Evita múltiplas inicializações
    if (window.techSolInitialized) {
        // Se clicar de novo, apenas roda a animação "bonitinha" novamente
        playStartupAnimation();
        return;
    }
    window.techSolInitialized = true;

    console.log('🚀 TechSol Suite Initializing...');

    try {
        // A. Injeta estilos globais (Fontes, Scrollbar)
        initGlobalStylesAndFont();

        // B. Roda a Animação de Entrada (Splash Screen)
        playStartupAnimation();

        // C. Inicializa os Módulos e Captura os Toggles
        // IMPORTANTE: Agora esses módulos retornam uma função para abrir/fechar
        // e NÃO criam mais seus próprios botões flutuantes.
        const toggleNotes = initCaseNotesAssistant();
        const toggleEmail = initQuickEmailAssistant();
        const toggleScript = initCallScriptAssistant();
        const toggleLinks = initFeedbackAssistant();

        // D. Inicializa a Barra de Comando (Command Center)
        // Passamos as funções de controle para os botões da barra
        initCommandCenter({
            toggleNotes,
            toggleEmail,
            toggleScript,
            toggleLinks
        });

    } catch (error) {
        console.error("Erro fatal na inicialização:", error);
        showToast("Erro crítico ao iniciar o Case Wizard.", { error: true });
    }
}

// Ponto de entrada
initApp();