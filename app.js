// app.js

// Importa usando os NOMES do "importmap", e não os caminhos
import { initGlobalStylesAndFont } from 'utils';
import { initCaseNotesAssistant } from 'notes-assistant';
import { initCallScriptAssistant } from 'call-script';

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