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

// --- HELPER DE DOM / EDITOR (CORRIGIDO PARA PEGAR O ÚLTIMO) ---
    function getVisibleEditor() {
        // 1. Tenta achar o card que o sistema diz ser o "topo" (ativo)
        const activeCard = document.querySelector('card.write-card.is-top');
        
        if (activeCard) {
            return activeCard.querySelector('div[contenteditable="true"]');
        }

        // 2. ESTRATÉGIA LIFO (Last In, First Out)
        // Se não achou classe 'is-top', pega TODOS os cards de escrita
        const allCards = Array.from(document.querySelectorAll('card.write-card'));
        
        // Filtra apenas os que estão visíveis na tela
        const visibleCards = allCards.filter(c => c.offsetParent !== null);

        // Pega o ÚLTIMO da lista (o mais recente adicionado ao DOM)
        // Isso evita pegar notas antigas que ficaram "para trás" no HTML
        if (visibleCards.length > 0) {
            const newestCard = visibleCards[visibleCards.length - 1];
            return newestCard.querySelector('div[contenteditable="true"]');
        }

        return null;
    }

export function triggerInputEvents(element) {
    const events = ['input', 'change', 'keydown', 'keyup'];
    events.forEach(eventType => {
        const event = new Event(eventType, { bubbles: true, cancelable: true });
        element.dispatchEvent(event);
    });
}

// --- MUDANÇA AQUI: Sempre força a abertura de uma nova nota ---
export async function ensureNoteCardIsOpen() {
    console.log("Forçando abertura de nova nota...");

    // 1. Busca o botão 'description' (Nota)
    const icones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeNota = icones.find(el => el.innerText.trim() === 'description');

    if (iconeNota) {
        // Pega o botão pai
        const btnAlvo = iconeNota.closest('material-fab') || iconeNota.closest('material-button');
        
        if (btnAlvo) {
            // Hack de visibilidade: força display block se estiver hidden
            // Isso permite clicar mesmo que o menu (+) esteja fechado
            if (btnAlvo.style) {
                btnAlvo.style.display = 'block';
                btnAlvo.style.visibility = 'visible';
            }
            simularCliqueReal(btnAlvo);
        } else {
            simularCliqueReal(iconeNota);
        }
    } else {
        // Fallback: Tenta abrir via Menu (+) se o botão direto não for achado
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
            // Tenta achar de novo com menu aberto
            const iconesAgora = Array.from(document.querySelectorAll('i.material-icons-extended'));
            const btnAgora = iconesAgora.find(el => el.innerText.trim() === 'description');
            if(btnAgora) simularCliqueReal(btnAgora);
        }
    }

    // 2. Aguarda o NOVO editor aparecer (Polling)
    let tentativas = 0;
    let editor = null;
    
    // Espera até que o editor (provavelmente com a classe .is-top) apareça
    while (!editor && tentativas < 15) {
        await esperar(300);
        editor = getVisibleEditor();
        tentativas++;
    }
    
    return editor;
}