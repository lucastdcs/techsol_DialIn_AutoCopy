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

// --- FUNÇÃO AUXILIAR: ENCONTRAR EDITOR VISÍVEL ---
function getVisibleEditor() {
    // Pega todos os candidatos a corpo de email
    const todos = Array.from(document.querySelectorAll('[id="email-body-content-top-content"]'));
    // Retorna apenas aquele que tem dimensão na tela (está visível)
    return todos.find(el => el.offsetParent !== null);
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
                
                // Busca novamente após abrir menu
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

    // === CORREÇÃO CRÍTICA: ESPERAR PELO VISÍVEL ===
    let tentativas = 0;
    let editorVisivel = getVisibleEditor();

    console.log("⏳ Aguardando editor VISÍVEL...");
    
    while (!editorVisivel && tentativas < 30) { // Espera até 15s
        await esperar(500);
        editorVisivel = getVisibleEditor();
        tentativas++;
    }

    if (!editorVisivel) {
        showToast("Erro: Editor de email não apareceu na tela.", { error: true });
        return false;
    }
    // ==============================================

    // 2. DESCARTAR RASCUNHO
    const btnDiscardDraft = document.querySelector('material-button[debug-id="discard-prewrite-draft-button"]');
    if (btnDiscardDraft && btnDiscardDraft.offsetParent !== null) {
        simularCliqueReal(btnDiscardDraft);
        await esperar(800);
        const btnConfirm = document.querySelector('material-button[debug-id="confirm-button"]');
        if (btnConfirm) {
            simularCliqueReal(btnConfirm);
            await esperar(1500);
            // Atualiza referência após descarte (o DOM pode ter mudado)
            editorVisivel = getVisibleEditor();
        }
    }

    // 3. LIMPEZA RADICAL (TOP LEVEL) NO ELEMENTO VISÍVEL
    if (editorVisivel) {
        // Sobe para o container pai ('top') para limpar assinaturas
        const containerTopo = editorVisivel.closest('[id="email-body-content-top"]');
        
        // Tenta achar o contenteditable correspondente a este editor visível
        // Usamos .closest para garantir que estamos no contexto certo
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
            
            // REPOSICIONA CURSOR (No elemento visível)
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
    
    showToast("Erro ao acessar estrutura do editor.", { error: true });
    return false;
}

// ============================================================
// FUNÇÃO 1: PARA NOTAS (CANNED RESPONSE)
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

                // Substituir Nome - Busca apenas no container VISÍVEL
                function encontrarNoDeTexto(elemento, textoParaAchar) {
                    if (elemento.nodeType === 3 && elemento.nodeValue.includes(textoParaAchar)) return elemento;
                    if (!elemento.childNodes) return null;
                    for (let child of elemento.childNodes) {
                        const achou = encontrarNoDeTexto(child, textoParaAchar);
                        if (achou) return achou;
                    }
                    return null;
                }

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
// FUNÇÃO 2: PARA QUICK EMAIL (HTML DIRETO)
// ============================================================
export async function runQuickEmail(template) {
    console.log(`🚀 Iniciando automação (Quick): ${template.name}`);
    showToast(`Preparando email...`, { duration: 3000 });

    const pageData = getPageData(); 
    const emailPronto = await openAndClearEmail(); 
    
    if (!emailPronto) return;

    // 1. Preencher Assunto
    const subjectInput = document.querySelector('input[aria-label="Subject"]');
    if (subjectInput && template.subject) {
        subjectInput.focus();
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(subjectInput, template.subject);
        subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
        await esperar(300);
    }

    // 2. Inserir Corpo (No editor VISÍVEL)
    // openAndClearEmail já deixou o cursor no lugar certo do editor visível.
    // Mas por segurança, vamos focar no contenteditable correto.
    
    const editorVisivel = getVisibleEditor();
    if (editorVisivel) {
         // Sobe até achar o contenteditable pai deste elemento visível
         const wrapperGeral = editorVisivel.closest('.email-body-content') || document.body;
         const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');
         
         if (editorPai) editorPai.focus();
    }

    // Substituição de Placeholders
    let finalBody = template.body;
    finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
    finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");
    finalBody = finalBody.replace(/\[Seu Nome\]/g, "Agente Google"); 
    
    // INSERÇÃO
    document.execCommand('insertHTML', false, finalBody);
    
    // Dispara eventos
    if (editorVisivel) {
        const editorPai = editorVisivel.closest('div[contenteditable="true"]');
        if (editorPai) {
            editorPai.dispatchEvent(new Event('input', { bubbles: true }));
            editorPai.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
    
    showToast("Email preenchido com sucesso!", { duration: 2000 });
}