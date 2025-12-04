import { initCaseNotesAssistant } from './modules/notes/notes-assistant.js';
import { initCallScriptAssistant } from './modules/call-script/call-script-assistant.js';
import { initQuickEmailAssistant } from './modules/quick-email/quick-email-assistant.js';
import { initFeedbackAssistant } from './modules/lm-report/lm-repot-assistant.js';
import { initGlobalStylesAndFont, showToast } from './modules/shared/utils.js'; // <--- IMPORT AQUI
import { playStartupAnimation } from './modules/shared/utils.js';

// ... dentro de initApp ...

// Roda a Splash Screen

// ... continua inicializando os módulos ...
function initApp() {
    console.log('🚀 TechSol Suite Initializing...');
playStartupAnimation();


    // 1. Injeta Fonte e Estilos Globais
    initGlobalStylesAndFont();

    // 2. Roda a Animação de Abertura (Splash Screen)
    playStartupAnimation(); // <--- CHAMADA AQUI

    // 3. Inicializa os Módulos
    try {
        initCaseNotesAssistant();
        initCallScriptAssistant();
        initQuickEmailAssistant();
        initFeedbackAssistant();
        
        // Não precisamos mais do Toast inicial aqui, a animação já faz esse papel!
        // showToast("TechSol Suite Carregado! 🚀"); 

    } catch (error) {
        console.error("Erro fatal na inicialização:", error);
        showToast("Erro ao carregar TechSol. Verifique o console.", { error: true });
    }
}

// Verifica se já rodou para não duplicar botões
if (!window.techSolInitialized) {
    window.techSolInitialized = true;
    initApp();
} else {
    // Se o usuário clicar de novo no bookmarklet, podemos rodar a animação de novo
    // ou apenas avisar que já está ativo.
    playStartupAnimation(); 
}