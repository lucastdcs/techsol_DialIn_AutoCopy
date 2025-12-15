// src/modules/automation/case-log-scraper.js
import { showToast } from '../../shared/utils.js';
import { SoundManager } from '../../shared/sound-manager.js';

const esperar = (ms) => new Promise(r => setTimeout(r, ms));

function simularClique(el) {
    if (!el) return;
    ['mousedown', 'mouseup', 'click'].forEach(evt => 
        el.dispatchEvent(new MouseEvent(evt, { bubbles: true, cancelable: true, view: window }))
    );
}

/**
 * Executa a varredura no Case Log e insere o ID no input alvo.
 * @param {string} targetInputId - O ID do input do SEU widget onde o texto deve ser colado.
 */
export async function fetchAndInsertSpeakeasyId(targetInputId) {
    console.log("🚀 Iniciando extração automática de Speakeasy ID...");
    showToast("Buscando ID nos logs...", { duration: 2000 });
    
    // Feedback sonoro de início (opcional)
    // SoundManager.playClick(); 

    // ============================================================
    // FASE 1: NAVEGAÇÃO E PREPARAÇÃO
    // ============================================================
    
    // 1. Garante aba Case Log
    const btnCaseLog = document.querySelector('material-button[debug-id="dock-item-case-log"]');
    if (btnCaseLog && !btnCaseLog.classList.contains('selected')) {
        simularClique(btnCaseLog);
        await esperar(1200);
    }

    // 2. Verifica Filtros (Otimizado: só clica se não estiver em All)
    const btnFiltro = document.querySelector('search-filter dropdown-button .button');
    if (btnFiltro) {
        const texto = btnFiltro.innerText || "";
        if (!texto.includes("All")) {
            simularClique(btnFiltro);
            await esperar(600);
            
            const checkAll = document.querySelector('material-checkbox[debug-id="check-all-box"]');
            if (checkAll && checkAll.getAttribute('aria-checked') !== 'true') {
                simularClique(checkAll);
                await esperar(300);
            }
            
            const btnApply = document.querySelector('material-button[debug-id="apply-filter"]');
            if (btnApply) {
                simularClique(btnApply);
                await esperar(1500); // Tempo de renderização
            }
        }
    }

    // 3. Scroll Tático (Força renderização dos últimos itens)
    const scrollContainer = document.querySelector('.scroll-container') || document.querySelector('.case-log-container');
    if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
        await esperar(500);
    }

    // ============================================================
    // FASE 2: EXTRAÇÃO (BOTTOM-UP)
    // ============================================================
    
    const seletor = '.preview, .speakeasy-agent-activity, .message-body';
    const elementos = Array.from(document.querySelectorAll(seletor));
    const regexID = /Speakeasy.*?(P\d{15,25})/i;

    let idEncontrado = null;

    // Varre de baixo para cima (Pega o mais recente)
    for (let i = elementos.length - 1; i >= 0; i--) {
        const el = elementos[i];
        if (el.offsetParent === null) continue; // Ignora invisíveis

        const match = (el.innerText || "").match(regexID);
        if (match && match[1]) {
            idEncontrado = match[1];
            break;
        }
    }

    // ============================================================
    // FASE 3: INSERÇÃO NO WIDGET
    // ============================================================

    if (idEncontrado) {
        // 1. Copia para Clipboard (Backup)
        try { await navigator.clipboard.writeText(idEncontrado); } catch(e){}

        // 2. Insere no Input do Widget
        const inputWidget = document.getElementById(targetInputId);
        
        if (inputWidget) {
            // Foca no input primeiro (para ativar animações do Material Design se houver)
            inputWidget.focus();
            
            // Define o valor
            inputWidget.value = idEncontrado;
            
            // Dispara eventos para que frameworks (React/Angular/Vanilla) detectem a mudança
            inputWidget.dispatchEvent(new Event('input', { bubbles: true }));
            inputWidget.dispatchEvent(new Event('change', { bubbles: true }));
            inputWidget.dispatchEvent(new Event('blur', { bubbles: true })); // Sai do foco

            SoundManager.playSuccess(); // Toca som de sucesso
            showToast(`ID Inserido: ${idEncontrado}`);
            console.log(`✅ Sucesso: ${idEncontrado} inserido em #${targetInputId}`);
        } else {
            console.error(`❌ Input com ID #${targetInputId} não encontrado no DOM do widget.`);
            showToast(`ID achado (${idEncontrado}), mas input não localizado.`, { error: true });
        }

    } else {
        SoundManager.playError();
        showToast("Nenhum ID Speakeasy encontrado.", { error: true });
    }
}