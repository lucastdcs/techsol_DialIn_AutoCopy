// app.js

// CORREÇÃO: Usando caminhos relativos para o 'esbuild' (robô) funcionar
import { initGlobalStylesAndFont } from './utils.js';
import { initCaseNotesAssistant } from './notes-assistant.js';
import { initCallScriptAssistant } from './call-script.js';

// --- 1. VERIFICAÇÕES GLOBAIS ---
if (document.getElementById("autofill-floating-btn") || document.getElementById("call-script-floating-btn")) {
    console.log("Assistentes já carregados.");
} else {
    // 1. Carrega fontes e estilos globais
    initGlobalStylesAndFont();
    
    // 2. Inicializa o Módulo 1
    initCaseNotesAssistant();
    
    // 3. Inicializa o Módulo 2
    initCallScriptAssistant();
}