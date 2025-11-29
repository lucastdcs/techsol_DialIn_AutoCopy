// src/modules/notes/notes-bridge.js
import { showToast } from '../shared/utils.js';

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function simularCliqueReal(elemento) {
    if (!elemento) return;
    const opts = { bubbles: true, cancelable: true, view: window };
    ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(evt => 
        elemento.dispatchEvent(new MouseEvent(evt, opts))
    );
}

export function copyHtmlToClipboard(html) {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.innerHTML = html;
    document.body.appendChild(container);
    const range = document.createRange();
    range.selectNodeContents(container);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
        document.execCommand('copy');
    } catch (err) {
        showToast("Falha ao copiar", { error: true });
    }
    selection.removeAllRanges();
    document.body.removeChild(container);
}

export function triggerInputEvents(element) {
    const events = ['input', 'change', 'keydown', 'keyup'];
    events.forEach(eventType => {
        const event = new Event(eventType, { bubbles: true, cancelable: true });
        element.dispatchEvent(event);
    });
}

// --- FUNÇÃO HELPER INTERNA ---
// Retorna uma lista de todos os editores atualmente na página
function getAllEditors() {
    return Array.from(document.querySelectorAll('div[contenteditable="true"]'));
}

// --- LÓGICA BLINDADA: ABRIR NOVA NOTA ---
export async function ensureNoteCardIsOpen() {
    console.log("Iniciando processo de Nova Nota...");

    // 1. SNAPSHOT: Guarda quem já estava na tela antes do clique
    const editoresAntes = getAllEditors();
    const qtdAntes = editoresAntes.length;
    
    // 2. BUSCA E CLICA NO BOTÃO
    const icones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeNota = icones.find(el => el.innerText.trim() === 'description');

    if (iconeNota) {
        const btnAlvo = iconeNota.closest('material-fab') || iconeNota.closest('material-button');
        if (btnAlvo) {
            // Garante que o botão está clicável (tira o hidden do Angular)
            if (btnAlvo.style) {
                btnAlvo.style.display = 'block';
                btnAlvo.style.visibility = 'visible';
            }
            simularCliqueReal(btnAlvo);
        } else {
            simularCliqueReal(iconeNota);
        }
    } else {
        // Fallback: Menu (+)
        const speedDial = document.querySelector('material-fab-speed-dial');
        if (speedDial) {
            const trigger = speedDial.querySelector('.trigger');
            if(trigger) {
                trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                simularCliqueReal(trigger);
            } else {
                speedDial.click();
            }
            await esperar(800);
            const iconesAgora = Array.from(document.querySelectorAll('i.material-icons-extended'));
            const btnAgora = iconesAgora.find(el => el.innerText.trim() === 'description');
            if(btnAgora) simularCliqueReal(btnAgora);
        }
    }

    // 3. ESPERA ATIVA INTELIGENTE (Differential Check)
    // Espera até que apareça um editor NOVO (que não estava na lista 'editoresAntes')
    let novoEditor = null;
    let tentativas = 0;
    
    while (!novoEditor && tentativas < 20) {
        await esperar(300);
        
        const editoresAgora = getAllEditors();
        
        // Se a quantidade aumentou, achamos o novo!
        if (editoresAgora.length > qtdAntes) {
            // O novo editor é aquele que está em 'Agora' mas não estava em 'Antes'
            // Geralmente é o último, mas vamos filtrar para garantir
            novoEditor = editoresAgora.find(e => !editoresAntes.includes(e));
            
            // Fallback: Se por algum motivo a lógica de includes falhar, pega o último
            if (!novoEditor) novoEditor = editoresAgora[editoresAgora.length - 1];
        }
        // Se a quantidade for igual, talvez ele tenha reaberto um fechado?
        // Nesse caso, pegamos o último visível como fallback
        else if (tentativas > 10) {
             const visible = editoresAgora.filter(e => e.offsetParent !== null);
             if (visible.length > 0) novoEditor = visible[visible.length - 1];
        }
        
        tentativas++;
    }
    
    // Retorna explicitamente o novo editor encontrado
    return novoEditor;
}