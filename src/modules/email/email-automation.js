// src/modules/email/email-automation.js
import { showToast } from '../shared/utils.js';
import { getPageData } from '../shared/page-data.js'; 

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function simularCliqueReal(elemento) {
    const opts = { bubbles: true, cancelable: true, view: window };
    ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(evt => 
        elemento.dispatchEvent(new MouseEvent(evt, opts))
    );
}

// --- FUNÇÃO COMPARTILHADA: ABRIR E LIMPAR ---
// Esta função é usada tanto pelas Notas quanto pelo Quick Email
async function openAndClearEmail() {
    // 1. ABRIR EMAIL (Lógica Sniper mantida)
    let emailAberto = false;
    const todosIcones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeEmail = todosIcones.find(el => el.innerText.trim() === 'email');

    if (iconeEmail) {
        console.log("⚡ Modo Rápido: Ícone encontrado.");
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

    // Verifica abertura do EDITOR (Espera até 7.5s no total)
    let tentativas = 0;
    while (!document.getElementById('email-body-content-top-content') && tentativas < 15) {
        await esperar(500);
        tentativas++;
    }

    const divConteudoTexto = document.getElementById('email-body-content-top-content');

    if (!divConteudoTexto) {
        showToast("Erro: Editor de email não abriu.", { error: true });
        return false;
    }

    // 2. DESCARTAR RASCUNHO (Mantido)
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

    // 3. LIMPEZA E FOCO (AQUI ESTÁ A CORREÇÃO)
    const editorPai = document.querySelector('div[contenteditable="true"][aria-label="Email body"]') || divConteudoTexto;

    if (divConteudoTexto && editorPai) {
        const ancestral = editorPai.closest('[aria-hidden="true"]');
        if (ancestral) ancestral.removeAttribute('aria-hidden');
        
        editorPai.focus();
        simularCliqueReal(divConteudoTexto);
        await esperar(500); 

        // === MUDANÇA: Espera Ativa pelo Elemento Sagrado ===
        console.log("⏳ Procurando 'cases-body-field'...");
        let elementoSagrado = document.getElementById('cases-body-field');
        let checks = 0;
        
        // Tenta achar o elemento por mais 2 segundos antes de desistir
        while (!elementoSagrado && checks < 10) {
            await esperar(200);
            elementoSagrado = document.getElementById('cases-body-field');
            checks++;
        }
        // ===================================================

        if (elementoSagrado) {
            console.log("✅ Elemento encontrado. Limpando vizinhos.");
            
            // Limpa vizinhos internos
            while (elementoSagrado.nextSibling) elementoSagrado.nextSibling.remove();
            while (elementoSagrado.previousSibling) elementoSagrado.previousSibling.remove();
            
            // Limpa vizinhos externos
            const avo = divConteudoTexto.parentElement; 
            Array.from(avo.childNodes).forEach(tio => {
                if (tio !== divConteudoTexto) avo.removeChild(tio);
            });

            // Limpa conteúdo do sagrado
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(elementoSagrado);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('delete', false, null);
            
            return true; // Sucesso (Modo Ideal)
        } else {
            // === FALLBACK: Se o elemento sagrado não apareceu, limpa tudo na força bruta ===
            console.warn("⚠️ 'cases-body-field' não encontrado. Executando limpeza total de fallback.");
            
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(divConteudoTexto); // Seleciona a div inteira
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('delete', false, null);
            
            return true; // Sucesso (Modo Fallback)
        }
    }
    
    showToast("Erro fatal ao acessar editor.", { error: true });
    return false;
}

// ============================================================
// FUNÇÃO 1: PARA NOTAS (CANNED RESPONSE)
// ============================================================
export async function runEmailAutomation(cannedResponseText) {
    if (!cannedResponseText) return;
    console.log(`🚀 Iniciando automação (Canned): ${cannedResponseText}`);
    showToast(`Preparando email...`, { duration: 3000 });

    const pageData = getPageData(); // Captura dados

    // Chama a função compartilhada de abertura/limpeza
    const emailPronto = await openAndClearEmail();
    if (!emailPronto) return;

    // --- LÓGICA ESPECÍFICA DE CANNED RESPONSE ---
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
            
            // Espera Ativa
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

                // Substituir Nome (Lógica específica do Canned Response)
                function encontrarNoDeTexto(elemento, textoParaAchar) {
                    if (elemento.nodeType === 3 && elemento.nodeValue.includes(textoParaAchar)) return elemento;
                    if (!elemento.childNodes) return null;
                    for (let child of elemento.childNodes) {
                        const achou = encontrarNoDeTexto(child, textoParaAchar);
                        if (achou) return achou;
                    }
                    return null;
                }

                const elSagrado = document.getElementById('cases-body-field');
                const spansFields = elSagrado ? elSagrado.querySelectorAll('span.field') : [];
                let noAlvo = null;

                for (let span of spansFields) {
                    const res = encontrarNoDeTexto(span, '{%ADVERTISER_NAME%}');
                    if (res) { noAlvo = res; break; }
                }
                if (!noAlvo && elSagrado) noAlvo = encontrarNoDeTexto(elSagrado, '{%ADVERTISER_NAME%}');

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

    const pageData = getPageData(); // Captura dados

    // Chama a função compartilhada de abertura/limpeza
    const emailPronto = await openAndClearEmail();
    if (!emailPronto) return;

    // --- LÓGICA ESPECÍFICA DE HTML ---
    
    // Preencher Assunto
    const subjectInput = document.querySelector('input[aria-label="Subject"]');
    if (subjectInput && template.subject) {
        subjectInput.value = template.subject;
        subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Substituição de Placeholders nos dados brutos
    let finalBody = template.body;
    finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
    finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");
    // Pode adicionar outros replaces aqui se necessário

    // Inserção
    document.execCommand('insertHTML', false, finalBody);
    
    showToast("Email preenchido com sucesso!", { duration: 2000 });
}