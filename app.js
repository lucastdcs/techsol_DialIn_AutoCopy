// app.js

// Importa os inicializadores dos outros arquivos
import { initGlobalStylesAndFont } from './utils.js';
import { initCaseNotesAssistant } from './notes-assistant.js';
import { initCallScriptAssistant } from './call-script.js';

// --- 1. VERIFICAÇÕES GLOBAIS ---
// (Esta verificação fica aqui para parar tudo se já estiver carregado)
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