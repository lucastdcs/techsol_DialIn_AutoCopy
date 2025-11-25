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

// --- FUNÇÃO COMPARTILHADA: ABRIR E LIMPAR ---
async function openAndClearEmail() {
    // 1. ABRIR EMAIL (Lógica Sniper / V48)
    let emailAberto = false;
    const todosIcones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeEmail = todosIcones.find(el => el.innerText.trim() === 'email');

    if (iconeEmail) {
        const botaoAlvo = iconeEmail.closest('material-button') || iconeEmail.closest('material-fab') || iconeEmail;
        if (botaoAlvo.style) {
            botaoAlvo.style.display = 'block';
            botaoAlvo.style.visibility = 'visible';
        }
        simularCliqueReal(botaoAlvo);
        emailAberto = true;
    } else {
        // Fallback Menu
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

    // Verifica abertura
    let tentativas = 0;
    while (!document.getElementById('email-body-content-top-content') && tentativas < 15) {
        await esperar(500);
        tentativas++;
    }

    if (!document.getElementById('email-body-content-top-content')) {
        showToast("Erro: Editor de email não abriu.", { error: true });
        return false;
    }

    // 2. DESCARTAR RASCUNHO
    const btnDiscardDraft = document.querySelector('material-button[debug-id="discard-prewrite-draft-button"]');
    if (btnDiscardDraft) {
        simularCliqueReal(btnDiscardDraft);
        await esperar(800);
        const btnConfirm = document.querySelector('material-button[debug-id="confirm-button"]');
        if (btnConfirm) {
            simularCliqueReal(btnConfirm);
            await esperar(1500);
        }
    }

    // 3. LIMPEZA CIRÚRGICA (Baseada na V49/V50 - Sem SelectAll)
    const divConteudoTexto = document.getElementById('email-body-content-top-content');
    const editorPai = document.querySelector('div[contenteditable="true"][aria-label="Email body"]') || divConteudoTexto;

    if (divConteudoTexto && editorPai) {
        const ancestral = editorPai.closest('[aria-hidden="true"]');
        if (ancestral) ancestral.removeAttribute('aria-hidden');
        
        editorPai.focus();
        simularCliqueReal(divConteudoTexto); // Garante foco interno
        await esperar(500); 

        // Limpa usando o ID sagrado se existir
        const elementoSagrado = document.getElementById('cases-body-field');
        if (elementoSagrado) {
            while (elementoSagrado.nextSibling) elementoSagrado.nextSibling.remove();
            while (elementoSagrado.previousSibling) elementoSagrado.previousSibling.remove();
            
            const avo = divConteudoTexto.parentElement; 
            Array.from(avo.childNodes).forEach(tio => {
                if (tio !== divConteudoTexto) avo.removeChild(tio);
            });

            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(elementoSagrado);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('delete', false, null);
            
            return true; 
        } else {
            // Limpeza segura do container (sem apagar header/footer)
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(divConteudoTexto);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('delete', false, null);
            
            // Insere quebra de linha para manter foco
            if (divConteudoTexto.innerHTML.trim() === "") {
                document.execCommand('insertHTML', false, '<br>');
            }
            return true;
        }
    }
    
    showToast("Erro ao acessar editor.", { error: true });
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

    // Recria span se necessário
    const divConteudoTexto = document.getElementById('email-body-content-top-content');
    if (divConteudoTexto && !document.getElementById('cases-body-field')) {
        divConteudoTexto.innerHTML = '<span id="cases-body-field"><br></span>';
    }
    
    // Foca no span
    const elementoSagrado = document.getElementById('cases-body-field');
    if (elementoSagrado) {
        const range = document.createRange();
        range.selectNodeContents(elementoSagrado);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

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

                const elSagradoAtualizado = document.getElementById('cases-body-field');
                const spansFields = elSagradoAtualizado ? elSagradoAtualizado.querySelectorAll('span.field') : [];
                let noAlvo = null;

                for (let span of spansFields) {
                    const res = encontrarNoDeTexto(span, '{%ADVERTISER_NAME%}');
                    if (res) { noAlvo = res; break; }
                }
                
                if (!noAlvo && elSagradoAtualizado) noAlvo = encontrarNoDeTexto(elSagradoAtualizado, '{%ADVERTISER_NAME%}');

                if (noAlvo) {
                    const range = document.createRange();
                    const start = noAlvo.nodeValue.indexOf('{%ADVERTISER_NAME%}');
                    range.setStart(noAlvo, start);
                    range.setEnd(noAlvo, start + '{%ADVERTISER_NAME%}'.length);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    
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
    const emailPronto = await openAndClearEmail(); // Usa a limpeza segura
    
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

    // 2. Focar no Corpo para Inserção
    const divConteudoTexto = document.getElementById('email-body-content-top-content');
    const editorPai = document.querySelector('div[contenteditable="true"][aria-label="Email body"]') || divConteudoTexto;
    
    if (editorPai && divConteudoTexto) {
        editorPai.focus();
        
        // Garante seleção interna (SEM SELECT ALL)
        const range = document.createRange();
        range.selectNodeContents(divConteudoTexto);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        // Substituição de Placeholders
        let finalBody = template.body;
        finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
        finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");
        finalBody = finalBody.replace(/\[Seu Nome\]/g, "Agente Google"); 

        // Insere sobre a seleção
        document.execCommand('insertHTML', false, finalBody);
        
        editorPai.dispatchEvent(new Event('input', { bubbles: true }));
        showToast("Email preenchido com sucesso!", { duration: 2000 });
    } else {
        showToast("Erro ao focar no editor.", { error: true });
    }
}