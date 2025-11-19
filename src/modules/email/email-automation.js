// src/modules/email/email-automation.js
import { showToast } from '../shared/utils.js';

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function simularCliqueReal(elemento) {
    const opts = { bubbles: true, cancelable: true, view: window };
    elemento.dispatchEvent(new MouseEvent('mouseover', opts));
    elemento.dispatchEvent(new MouseEvent('mousedown', opts));
    elemento.dispatchEvent(new MouseEvent('mouseup', opts));
    elemento.dispatchEvent(new MouseEvent('click', opts));
}

export async function runEmailAutomation(cannedResponseText) {
    if (!cannedResponseText) return;

    console.log(`🚀 Iniciando automação: ${cannedResponseText}`);
    showToast(`Iniciando automação de email...`, { duration: 3000 });

    // --- PASSO 0: CAPTURAR NOME ---
    let nomeCliente = "Cliente";
    try {
        const xpath = "//div[contains(text(), 'Given name')]";
        const labelNode = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (labelNode && labelNode.nextElementSibling) {
            nomeCliente = labelNode.nextElementSibling.innerText.trim();
        }
    } catch (e) {}

    // --- PASSO 1 e 2: ABRIR EMAIL ---
    const speedDial = document.querySelector('material-fab-speed-dial');
    if (speedDial) {
        const triggerBtn = speedDial.querySelector('.trigger');
        if (triggerBtn) {
            triggerBtn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            simularCliqueReal(triggerBtn);
            await esperar(1000);
            
            if (!document.getElementById('email-body-content-top-content')) {
                const icones = Array.from(document.querySelectorAll('i.material-icons-extended'))
                    .filter(el => el.offsetParent !== null);
                const emailBtn = icones.find(el => el.innerText.trim() === 'email');

                if (emailBtn) {
                    const botaoClicavel = emailBtn.closest('material-button') || emailBtn;
                    simularCliqueReal(botaoClicavel);
                } else {
                    console.error("❌ Erro: Ícone 'email' não apareceu.");
                    return;
                }
            }
        } else {
             speedDial.click();
        }
    } else {
        console.error("❌ Erro: Botão (+) não encontrado.");
        return;
    }

    // Aguarda o carregamento inicial da janela
    await esperar(4000); 

    // ===== NOVO: VERIFICAÇÃO DE RASCUNHO/SUGESTÃO (Pre-write Draft) =====
    const btnDiscardDraft = document.querySelector('material-button[debug-id="discard-prewrite-draft-button"]');
    
    if (btnDiscardDraft) {
        console.log("⚠️ Sugestão de rascunho detectada. Descartando...");
        simularCliqueReal(btnDiscardDraft);
        
        // Espera o modal de confirmação aparecer
        await esperar(1000);
        
        const btnConfirm = document.querySelector('material-button[debug-id="confirm-button"]');
        if (btnConfirm) {
            console.log("✅ Confirmando descarte...");
            simularCliqueReal(btnConfirm);
            // Espera o editor real carregar após o descarte
            await esperar(2000);
        }
    }
    // ====================================================================

    // --- PASSO 3: LIMPEZA E FOCO ---
    // Agora sim buscamos o editor, pois a sugestão já foi removida se existia
    const divConteudoTexto = document.getElementById('email-body-content-top-content');
    const editorPai = document.getElementById('email-body-content-top-content'); 

    if (divConteudoTexto && editorPai) {
        const ancestral = editorPai.closest('[aria-hidden="true"]');
        if (ancestral) ancestral.removeAttribute('aria-hidden');
        
        editorPai.focus();
        simularCliqueReal(document.getElementById('email-body-content-top-content'));
        await esperar(500); 

        const elementoSagrado = document.getElementById('cases-body-field');

        if (elementoSagrado) {
            // Limpa vizinhos
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

            // --- PASSO 4: CANNED RESPONSE ---
            await esperar(500);
            const btnCanned = document.querySelector('material-button[debug-id="canned_response_button"]');
            
            if (btnCanned) {
                btnCanned.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await esperar(200); 
                simularCliqueReal(btnCanned);
                
                // --- PASSO 5: PESQUISAR ---
                await esperar(2000); 
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
                             // 1. Tenta encontrar pela string exata (o que já fazíamos)
                             opcaoAlvo = opcoes.find(opt => 
                                opt.innerText.toLowerCase().includes(cannedResponseText.toLowerCase())
                            );

                            // 2. FALLBACK INTELIGENTE:
                            // Se não achou pelo texto exato, mas só tem 1 opção na lista, é ela!
                            if (!opcaoAlvo && opcoes.length === 1) {
                                console.log("⚠️ Match exato não encontrado, mas apenas 1 opção disponível. Selecionando-a.");
                                opcaoAlvo = opcoes[0];
                            }

                            if (opcaoAlvo) break; // Sai do loop se encontrou
                        }
                    }

                    if (opcaoAlvo) {
                        simularCliqueReal(opcaoAlvo);
                        await esperar(2000); 

                        // --- PASSO 7: SUBSTITUIR NOME ---
                        function encontrarNoDeTexto(elemento, textoParaAchar) {
                            if (elemento.nodeType === 3) { 
                                if (elemento.nodeValue.includes(textoParaAchar)) return elemento;
                            }
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
                            const resultado = encontrarNoDeTexto(span, '{%ADVERTISER_NAME%}');
                            if (resultado) {
                                noAlvo = resultado;
                                break;
                            }
                        }

                        if (!noAlvo && elSagradoAtualizado) {
                             noAlvo = encontrarNoDeTexto(elSagradoAtualizado, '{%ADVERTISER_NAME%}');
                        }

                        if (noAlvo) {
                            const rangeToken = document.createRange();
                            const startOffset = noAlvo.nodeValue.indexOf('{%ADVERTISER_NAME%}');
                            const endOffset = startOffset + '{%ADVERTISER_NAME%}'.length;
                            
                            rangeToken.setStart(noAlvo, startOffset);
                            rangeToken.setEnd(noAlvo, endOffset);
                            
                            selection.removeAllRanges();
                            selection.addRange(rangeToken);
                            
                            document.execCommand('insertText', false, nomeCliente);
                            showToast("Email preenchido e personalizado!");
                        } else {
                            showToast("Email preenchido, mas nome não substituído.", { error: true });
                        }

                    } else {
                        showToast(`Template '${cannedResponseText}' não encontrado.`, { error: true });
                    }
                }
            }
        } else {
             showToast("Botão de Canned Response não encontrado.", { error: true });
        }
    } else {
        showToast("Editor de email não encontrado.", { error: true });
    }
}