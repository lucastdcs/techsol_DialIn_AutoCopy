// src/modules/email/email-automation.js
import { showToast } from '../shared/utils.js';
import { getPageData } from '../shared/page-data.js'; 

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function simularCliqueReal(elemento) {
    if (!elemento) return;
    const opts = { bubbles: true, cancelable: true, view: window };
    ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(evt => 
        elemento.dispatchEvent(new MouseEvent(evt, opts))
    );
}

// --- FUNÇÃO AUXILIAR: ENCONTRAR EDITOR VISÍVEL E EDITÁVEL ---
function getVisibleEditor() {
    // Pega todos os candidatos a corpo de email
    const todos = Array.from(document.querySelectorAll('[id="email-body-content-top-content"]'));
    
    // FILTRO DE SEGURANÇA:
    // 1. Deve estar visível (offsetParent !== null)
    // 2. NÃO pode estar dentro de um 'case-message-view' (email enviado/leitura)
    // 3. DEVE estar dentro de um 'editor' ou 'write-card' (email sendo escrito)
    
    return todos.find(el => {
        const isVisible = el.offsetParent !== null;
        const isReadOnly = el.closest('case-message-view') !== null;
        const isEditable = el.closest('.editor') !== null || el.closest('write-card') !== null;
        
        return isVisible && !isReadOnly && isEditable;
    });
}

// --- FUNÇÃO COMPARTILHADA: ABRIR E LIMPAR ---
async function openAndClearEmail() {
    // 1. ABRIR EMAIL
    let emailAberto = false;
    const todosIcones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeEmail = todosIcones.find(el => el.innerText.trim() === 'email');

    // Tenta achar botão de email VISÍVEL
    if (iconeEmail && iconeEmail.offsetParent !== null) {
        const botaoAlvo = iconeEmail.closest('material-button') || iconeEmail.closest('material-fab') || iconeEmail;
        if (botaoAlvo.style) {
            botaoAlvo.style.display = 'block';
            botaoAlvo.style.visibility = 'visible';
        }
        simularCliqueReal(botaoAlvo);
        emailAberto = true;
    } else {
        // Fallback Menu (+)
        const speedDial = document.querySelector('material-fab-speed-dial');
        if (speedDial) {
            const triggerBtn = speedDial.querySelector('.trigger');
            if (triggerBtn) {
                triggerBtn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                simularCliqueReal(triggerBtn);
                await esperar(1000);
                
                const iconesNovos = Array.from(document.querySelectorAll('i.material-icons-extended'));
                const emailBtnNovo = iconesNovos.find(el => el.innerText.trim() === 'email');
                if (emailBtnNovo) {
                    simularCliqueReal(emailBtnNovo);
                    emailAberto = true;
                }
            } else {
                speedDial.click();
            }
        }
    }

    // === ESPERA PELO EDITOR VISÍVEL E VÁLIDO ===
    let tentativas = 0;
    let editorVisivel = getVisibleEditor(); // Usa a nova função filtrada

    console.log("⏳ Aguardando editor EDITÁVEL...");
    
    while (!editorVisivel && tentativas < 30) {
        await esperar(500);
        editorVisivel = getVisibleEditor();
        tentativas++;
    }

    if (!editorVisivel) {
        showToast("Erro: Editor de email não apareceu.", { error: true });
        return false;
    }

    // 2. DESCARTAR RASCUNHO
    const btnDiscardDraft = document.querySelector('material-button[debug-id="discard-prewrite-draft-button"]');
    if (btnDiscardDraft && btnDiscardDraft.offsetParent !== null) {
        simularCliqueReal(btnDiscardDraft);
        await esperar(800);
        const btnConfirm = document.querySelector('material-button[debug-id="confirm-button"]');
        if (btnConfirm) {
            simularCliqueReal(btnConfirm);
            await esperar(1500);
            editorVisivel = getVisibleEditor(); // Recaptura após refresh
        }
    }

    // 3. LIMPEZA NUCLEAR NO EDITOR CORRETO
    if (editorVisivel) {
        const containerTopo = editorVisivel.closest('[id="email-body-content-top"]');
        const wrapperGeral = editorVisivel.closest('.email-body-content') || document.body;
        const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');

        if (containerTopo) {
            if (editorPai) {
                const ancestral = editorPai.closest('[aria-hidden="true"]');
                if (ancestral) ancestral.removeAttribute('aria-hidden');
                editorPai.focus();
            }
            
            await esperar(300);

            // LIMPEZA
            containerTopo.innerHTML = `
                <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                    <span id="cases-body-field"><br></span>
                </div>
            `;
            
            // REPOSICIONA CURSOR
            const novoElementoSagrado = containerTopo.querySelector('#cases-body-field');
            if (novoElementoSagrado) {
                const range = document.createRange();
                range.selectNodeContents(novoElementoSagrado);
                range.collapse(true); 
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
            
            return true; // Sucesso
        }
    }
    
    showToast("Erro crítico ao acessar editor.", { error: true });
    return false;
}

// ============================================================
// FUNÇÃO 1: CANNED RESPONSE
// ============================================================
export async function runEmailAutomation(cannedResponseText) {
    if (!cannedResponseText) return;
    showToast(`Preparando email...`, { duration: 3000 });

    const pageData = getPageData();
    const emailPronto = await openAndClearEmail();
    if (!emailPronto) return;

    // --- LÓGICA CANNED RESPONSE ---
    await esperar(500);
    const btnCanned = document.querySelector('material-button[debug-id="canned_response_button"]');
    
    if (btnCanned) {
        btnCanned.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await esperar(200); 
        simularCliqueReal(btnCanned);
        
        await esperar(1500); 
        const searchInput = document.querySelector('material-auto-suggest-input input');
        
        if (searchInput) {
            simularCliqueReal(searchInput);
            await esperar(200);
            
            document.execCommand('insertText', false, cannedResponseText);
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            let opcaoAlvo = null;
            let tentativas = 0;
            while (tentativas < 20) { 
                await esperar(500);
                tentativas++;
                const opcoes = Array.from(document.querySelectorAll('material-select-dropdown-item'));
                if (opcoes.length > 0) {
                     opcaoAlvo = opcoes.find(opt => 
                        opt.innerText.toLowerCase().includes(cannedResponseText.toLowerCase())
                    );
                    if (!opcaoAlvo && opcoes.length === 1) opcaoAlvo = opcoes[0];
                    if (opcaoAlvo) break;
                }
            }

            if (opcaoAlvo) {
                simularCliqueReal(opcaoAlvo);
                await esperar(2000); 

                // Substituir Nome
                function encontrarNoDeTexto(elemento, textoParaAchar) {
                    if (elemento.nodeType === 3 && elemento.nodeValue.includes(textoParaAchar)) return elemento;
                    if (!elemento.childNodes) return null;
                    for (let child of elemento.childNodes) {
                        const achou = encontrarNoDeTexto(child, textoParaAchar);
                        if (achou) return achou;
                    }
                    return null;
                }

                // Busca no container visível
                const editorVisivel = getVisibleEditor();
                const containerTopo = editorVisivel ? editorVisivel.closest('[id="email-body-content-top"]') : document.body;
                
                let noAlvo = encontrarNoDeTexto(containerTopo, '{%ADVERTISER_NAME%}');

                if (noAlvo) {
                    const rangeToken = document.createRange();
                    const start = noAlvo.nodeValue.indexOf('{%ADVERTISER_NAME%}');
                    rangeToken.setStart(noAlvo, start);
                    rangeToken.setEnd(noAlvo, start + '{%ADVERTISER_NAME%}'.length);
                    
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(rangeToken);
                    
                    document.execCommand('insertText', false, pageData.advertiserName);
                    showToast("Email preenchido!");
                } else {
                    showToast("Email inserido (Nome não substituído).");
                }
            } else {
                showToast(`Template '${cannedResponseText}' não encontrado.`, { error: true });
            }
        }
    } else {
        showToast("Botão Canned Response não achado.", { error: true });
    }
}

// ============================================================
// FUNÇÃO 2: QUICK EMAIL
// ============================================================
export async function runQuickEmail(template) {
    console.log(`🚀 Iniciando automação (Quick): ${template.name}`);
    showToast(`Preparando email...`, { duration: 3000 });

    const pageData = getPageData(); 
    const emailPronto = await openAndClearEmail(); 
    
    if (!emailPronto) return;

    // 1. Assunto
    const subjectInput = document.querySelector('input[aria-label="Subject"]');
    if (subjectInput && template.subject) {
        subjectInput.focus();
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(subjectInput, template.subject);
        subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
        await esperar(300);
    }

    // 2. Corpo
    const editorVisivel = getVisibleEditor();
    
    if (editorVisivel) {
         const wrapperGeral = editorVisivel.closest('.email-body-content') || document.body;
         const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');
         if (editorPai) {
             editorPai.focus();
             editorPai.dispatchEvent(new Event('input', { bubbles: true }));
         }

        let finalBody = template.body;
        finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
        finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");
        finalBody = finalBody.replace(/\[Seu Nome\]/g, "Agente Google"); 

        document.execCommand('insertHTML', false, finalBody);
        
        if (editorPai) {
            editorPai.dispatchEvent(new Event('input', { bubbles: true }));
            editorPai.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        showToast("Email preenchido com sucesso!", { duration: 2000 });
    } else {
        showToast("Erro ao focar no editor.", { error: true });
    }
}