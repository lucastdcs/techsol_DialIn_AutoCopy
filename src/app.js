// src/app.js

import { initGlobalStylesAndFont } from './modules/shared/utils.js';
import { initCaseNotesAssistant } from './modules/notes/notes-assistant.js';
import { initCallScriptAssistant } from './modules/call-script/call-script-assistant.js';
import { initFeedbackAssistant } from './modules/lm-report/lm-repot-assistant.js';
import { initQuickEmailAssistant } from './modules/quick-email/quick-email-assistant.js';
// --- 1. VERIFICAÇÕES GLOBAIS ---
if (document.getElementById("autofill-floating-btn") || document.getElementById("call-script-floating-btn")) {
    console.log("Assistentes já carregados.");
} else {
    // 1. Carrega fontes e estilos globais
    initGlobalStylesAndFont();
    
    // 2. Inicializa o Módulo 1 (Notas)
    initCaseNotesAssistant();
    
    // 3. Inicializa o Módulo 2 (Script)
    initCallScriptAssistant();

    initFeedbackAssistant();

    initQuickEmailAssistant();
}