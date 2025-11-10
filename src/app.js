import { initGlobalStylesAndFont } from './modules/utils.js';
import { initCaseNotesAssistant } from './modules/notes/notes-assistant.js';
import { initCallScriptAssistant } from './modules/call-script/call-script.js';


if (document.getElementById("autofill-floating-btn") || document.getElementById("call-script-floating-btn")) {
    console.log("Assistentes já carregados.");
} else {
    
    initGlobalStylesAndFont();
    
    initCaseNotesAssistant();
    
    initCallScriptAssistant();
}