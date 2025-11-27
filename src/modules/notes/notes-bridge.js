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

export function getVisibleEditor() {
    // 1. Procura o Card que está no topo da pilha (visível)
    const activeCard = document.querySelector('card.write-card.is-top');
    if (!activeCard) {
        // Fallback
        const allEditors = Array.from(document.querySelectorAll('div[contenteditable="true"]'));
        return allEditors.find(e => e.offsetParent !== null);
    }
    return activeCard.querySelector('div[contenteditable="true"]');
}

export function triggerInputEvents(element) {
    const events = ['input', 'change', 'keydown', 'keyup'];
    events.forEach(eventType => {
        const event = new Event(eventType, { bubbles: true, cancelable: true });
        element.dispatchEvent(event);
    });
}

export async function ensureNoteCardIsOpen() {
    // 1. Verifica se já está aberta
    let editor = getVisibleEditor();
    if (editor) return editor;

    console.log("Nota fechada. Tentando abrir...");

    // 2. Busca o botão 'description' (Nota)
    const icones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeNota = icones.find(el => el.innerText.trim() === 'description');

    if (iconeNota) {
        const btnAlvo = iconeNota.closest('material-fab') || iconeNota.closest('material-button');
        
        if (btnAlvo) {
            // Hack de visibilidade
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

    // 3. Aguarda o editor aparecer (Polling)
    let tentativas = 0;
    while (!editor && tentativas < 15) {
        await esperar(300);
        editor = getVisibleEditor();
        tentativas++;
    }
    return editor;
}