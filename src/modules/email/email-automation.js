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

    // --- PASSO 0: CAPTURAR NOME (Estratégia Múltipla) ---
    let nomeCliente = "Cliente"; // Valor padrão
    
    // Estratégia 1: Tenta pegar do "Given name" na tela de detalhes
    try {
        const xpath = "//div[contains(text(), 'Given name')]";
        const labelNode = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (labelNode && labelNode.nextElementSibling) {
            const nome = labelNode.nextElementSibling.innerText.trim();
            if (nome) {
                nomeCliente = nome;
                console.log(`✅ Nome capturado (Given name): "${nomeCliente}"`);
            }
        }
    } catch (e) { console.warn("Falha ao capturar Given name", e); }

    // Estratégia 2: Se falhar, tenta pegar do título do caso (se houver) ou do chip de email depois
    // (A estratégia do chip de email será tentada no passo 7 se esta falhar)

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
        await esperar(1000);
        const btnConfirm = document.querySelector('material-button[debug-id="confirm-button"]');
        if (btnConfirm) {
            simularCliqueReal(btnConfirm);
            await esperar(2000);
        }
    }

    // --- PASSO 3: LIMPEZA E FOCO ---
    const divConteudoTexto = document.getElementById('email-body-content-top-content');
    const editorPai = document.getElementById('email-body-content-top-content'); 

    if (divConteudoTexto && editorPai) {
        // Se ainda não temos um nome válido, tentamos pegar do campo "To" agora que a janela abriu
        if (nomeCliente === "Cliente") {
             const chipTo = document.querySelector('email-address-chip user-chip span.address, email-address-chip span.name');
             if (chipTo) {
                 // Pega o primeiro nome ou o texto antes do @
                 const rawName = chipTo.innerText.trim();
                 nomeCliente = rawName.split(' ')[0].split('@')[0];
                 console.log(`✅ Nome capturado (Chip To): "${nomeCliente}"`);
             }
        }

        const ancestral = editorPai.closest('[aria-hidden="true"]');
        if (ancestral) ancestral.removeAttribute('aria-hidden');
        
        editorPai.focus();
        simularCliqueReal(document.getElementById('email-body-content-top-content'));
        await esperar(500); 

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
                            if (opcaoAlvo) break;
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

                        // Fallback: Procura em todo o elemento sagrado se não achar nos fields
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
                            
                            console.log(`📝 Substituindo por: ${nomeCliente}`); // DEBUG
                            document.execCommand('insertText', false, nomeCliente);
                            showToast(`Email pronto! (Cliente: ${nomeCliente})`);
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