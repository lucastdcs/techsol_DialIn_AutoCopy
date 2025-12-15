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

// --- FUNÇÃO VISUAL: OVERLAY DE CARREGAMENTO (Estilo Apple/Glass) ---
function toggleLoadingOverlay(show, message = "Analisando logs...") {
    const existingOverlay = document.getElementById('cw-loading-overlay');
    
    if (show) {
        if (existingOverlay) return; // Já existe

        const overlay = document.createElement('div');
        overlay.id = 'cw-loading-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 999999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Spinner Moderno (Google Blue Ring)
        const spinner = document.createElement('div');
        spinner.innerHTML = `
            <svg viewBox="0 0 50 50" style="width: 50px; height: 50px; animation: rotate 2s linear infinite;">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#1a73e8" stroke-width="4" stroke-dasharray="80" stroke-dashoffset="60"></circle>
            </svg>
            <style>
                @keyframes rotate { 100% { transform: rotate(360deg); } }
            </style>
        `;

        // Texto
        const text = document.createElement('div');
        text.innerText = message;
        text.style.cssText = `
            margin-top: 20px;
            font-family: 'Google Sans', Roboto, sans-serif;
            font-size: 16px;
            color: #202124;
            font-weight: 500;
            background: white;
            padding: 8px 16px;
            border-radius: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        `;

        overlay.appendChild(spinner);
        overlay.appendChild(text);
        document.body.appendChild(overlay);

        // Trigger animation
        requestAnimationFrame(() => overlay.style.opacity = '1');

    } else {
        if (existingOverlay) {
            existingOverlay.style.opacity = '0';
            setTimeout(() => existingOverlay.remove(), 300);
        }
    }
}

/**
 * Executa a varredura no Case Log e insere o ID no input alvo.
 */
export async function fetchAndInsertSpeakeasyId(targetInputId) {
    console.log("🚀 Iniciando extração automática...");
    
    // 1. ATIVA O MODO FOCO (Blur)
    toggleLoadingOverlay(true, "Buscando Speakeasy ID...");
    
    try {
        // ============================================================
        // FASE 1: NAVEGAÇÃO
        // ============================================================
        
        // Garante aba Case Log
        const btnCaseLog = document.querySelector('material-button[debug-id="dock-item-case-log"]');
        if (btnCaseLog && !btnCaseLog.classList.contains('selected')) {
            simularClique(btnCaseLog);
            await esperar(1200);
        }

        // Verifica Filtros
        const btnFiltro = document.querySelector('search-filter dropdown-button .button');
        if (btnFiltro) {
            const texto = btnFiltro.innerText || "";
            if (!texto.includes("All")) {
                toggleLoadingOverlay(true, "Ajustando filtros..."); // Atualiza texto
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
                    await esperar(1500); 
                }
            }
        }

        // Scroll Tático
        const scrollContainer = document.querySelector('.scroll-container') || document.querySelector('.case-log-container');
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
            await esperar(500);
        }

        // ============================================================
        // FASE 2: EXTRAÇÃO
        // ============================================================
        
        const seletor = '.preview, .speakeasy-agent-activity, .message-body';
        const elementos = Array.from(document.querySelectorAll(seletor));
        const regexID = /Speakeasy.*?(P\d{15,25})/i;

        let idEncontrado = null;

        for (let i = elementos.length - 1; i >= 0; i--) {
            const el = elementos[i];
            if (el.offsetParent === null) continue; 

            const match = (el.innerText || "").match(regexID);
            if (match && match[1]) {
                idEncontrado = match[1];
                break;
            }
        }

        // ============================================================
        // FASE 3: INSERÇÃO
        // ============================================================

        if (idEncontrado) {
            try { await navigator.clipboard.writeText(idEncontrado); } catch(e){}

            const inputWidget = document.getElementById(targetInputId);
            
            if (inputWidget) {
                inputWidget.focus();
                inputWidget.value = idEncontrado;
                inputWidget.dispatchEvent(new Event('input', { bubbles: true }));
                inputWidget.dispatchEvent(new Event('change', { bubbles: true }));
                inputWidget.dispatchEvent(new Event('blur', { bubbles: true }));

                SoundManager.playSuccess();
                showToast(`ID Localizado: ${idEncontrado}`);
            } else {
                showToast(`ID achado (${idEncontrado}), mas input sumiu.`, { error: true });
            }

        } else {
            SoundManager.playError();
            showToast("Nenhum ID encontrado no histórico.", { error: true });
        }

    } catch (error) {
        console.error("Erro na automação:", error);
        showToast("Erro ao buscar ID.", { error: true });
    } finally {
        // 2. DESATIVA O MODO FOCO (Remove Blur)
        // Pequeno delay para usuário ver que acabou
        setTimeout(() => toggleLoadingOverlay(false), 500);
    }
}