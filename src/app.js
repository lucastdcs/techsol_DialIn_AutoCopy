// src/app.js

// CORREÇÃO: Usando os caminhos corretos da pasta 'modules'
import { initGlobalStylesAndFont } from './modules/shared/utils.js';
import { initCaseNotesAssistant } from './modules/notes/notes-assistant.js';
import { initCallScriptAssistant } from './modules/call-script/call-script-assistant.js';

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
}