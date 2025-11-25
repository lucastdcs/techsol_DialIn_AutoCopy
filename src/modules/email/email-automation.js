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
    // 1. ABRIR EMAIL
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

    // 3. LIMPEZA RADICAL E FOCO
    const divConteudoTexto = document.getElementById('email-body-content-top-content');
    const editorPai = document.querySelector('div[contenteditable="true"][aria-label="Email body"]');

    if (divConteudoTexto && editorPai) {
        const ancestral = editorPai.closest('[aria-hidden="true"]');
        if (ancestral) ancestral.removeAttribute('aria-hidden');
        
        editorPai.focus();
        await esperar(300);

        // --- LIMPEZA VIA INNERHTML ---
        // Esvazia o HTML e recria o span obrigatório (para Canned Responses)
        // Para Quick Email, vamos escrever sobre isso, então não atrapalha.
        divConteudoTexto.innerHTML = '<span id="cases-body-field"><br></span>';
        
        // Coloca o cursor DENTRO do span
        const elementoSagrado = document.getElementById('cases-body-field');
        const range = document.createRange();
        range.selectNodeContents(elementoSagrado);
        range.collapse(true); 
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        
        return true; // Sucesso
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
                const containerBusca = elSagradoAtualizado || document.getElementById('email-body-content-top-content');
                
                let noAlvo = encontrarNoDeTexto(containerBusca, '{%ADVERTISER_NAME%}');

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

    // 2. Inserir Corpo
    const divConteudoTexto = document.getElementById('email-body-content-top-content');
    const editorPai = document.querySelector('div[contenteditable="true"][aria-label="Email body"]') || divConteudoTexto;
    
    if (editorPai) {
        editorPai.focus();
        
        // Substituição de Placeholders
        let finalBody = template.body;
        finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
        finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");
        // Substitui seu nome
        finalBody = finalBody.replace(/\[Seu Nome\]/g, "Agente Google"); 

        // CORREÇÃO: Inserção Simples
        // Como openAndClearEmail já deixou o cursor no lugar certo (dentro do span vazio),
        // basta inserir o HTML.
        document.execCommand('insertHTML', false, finalBody);
        
        // Dispara eventos para o Angular registrar a mudança
        editorPai.dispatchEvent(new Event('input', { bubbles: true }));
        editorPai.dispatchEvent(new Event('change', { bubbles: true }));
        
        showToast("Email preenchido com sucesso!", { duration: 2000 });
    } else {
        showToast("Erro ao focar no editor.", { error: true });
    }
}