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

    console.log(`🚀 Iniciando automação rápida: ${cannedResponseText}`);
    showToast(`Preparando email...`, { duration: 3000 });

    // --- PASSO 0: CAPTURAR NOME ---
    let nomeCliente = "Cliente";
    try {
        const xpath = "//div[contains(text(), 'Given name')]";
        const labelNode = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (labelNode && labelNode.nextElementSibling) {
            nomeCliente = labelNode.nextElementSibling.innerText.trim();
        }
    } catch (e) {}

    // --- PASSO 1: ABRIR EMAIL (ESTRATÉGIA SNIPER / DIRETA) ---
    // Tenta achar o botão de email imediatamente, sem abrir o menu (+)
    
    // 1. Busca ícone de email em todo o DOM
    const todosIcones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeEmail = todosIcones.find(el => el.innerText.trim() === 'email');
    
    let emailAberto = false;

    if (iconeEmail) {
        console.log("⚡ Modo Rápido: Ícone de email encontrado. Clicando direto...");
        // Tenta achar o botão pai para clicar nele (mais seguro)
        const botaoAlvo = iconeEmail.closest('material-button') || iconeEmail.closest('material-fab') || iconeEmail;
        
        // Força visibilidade caso esteja oculto (hack para Angular)
        if (botaoAlvo.style) {
            botaoAlvo.style.display = 'block';
            botaoAlvo.style.visibility = 'visible';
        }
        
        simularCliqueReal(botaoAlvo);
        emailAberto = true;
    } else {
        console.log("⚠️ Modo Rápido falhou. Tentando via Menu (+)...");
        // Fallback: Método antigo (Abrir menu +)
        const speedDial = document.querySelector('material-fab-speed-dial');
        if (speedDial) {
            const triggerBtn = speedDial.querySelector('.trigger');
            if (triggerBtn) {
                triggerBtn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                simularCliqueReal(triggerBtn);
                await esperar(1000);
                
                // Tenta achar de novo agora que o menu abriu
                const iconesNovos = Array.from(document.querySelectorAll('i.material-icons-extended'));
                const emailBtnNovo = iconesNovos.find(el => el.innerText.trim() === 'email');
                if (emailBtnNovo) {
                    simularCliqueReal(emailBtnNovo);
                    emailAberto = true;
                }
            }
        }
    }

    if (!emailAberto && !document.getElementById('email-body-content-top-content')) {
        console.error("❌ Não foi possível abrir o email.");
        showToast("Erro ao abrir email.", { error: true });
        return;
    }

    // Aguarda carregamento
    await esperar(3000); 

    // --- PASSO 2: DESCARTAR RASCUNHO (ESTRATÉGIA DIRETA) ---
    const btnDiscardDraft = document.querySelector('material-button[debug-id="discard-prewrite-draft-button"]');
    if (btnDiscardDraft) {
        console.log("🗑️ Descartando rascunho...");
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
    // Seletor corrigido para o ID exato que o Angular usa para o wrapper
    const editorPai = document.querySelector('div[contenteditable="true"][aria-label="Email body"]') || document.getElementById('email-body-content-top-content');

    if (divConteudoTexto && editorPai) {
        // Destrava acessibilidade
        const ancestral = editorPai.closest('[aria-hidden="true"]');
        if (ancestral) ancestral.removeAttribute('aria-hidden');
        
        editorPai.focus();
        // Clica dentro para garantir o cursor
        simularCliqueReal(divConteudoTexto);
        await esperar(500); 

        // Limpeza usando Elemento Sagrado
        const elementoSagrado = document.getElementById('cases-body-field');

        if (elementoSagrado) {
            // Limpa vizinhos
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

            // --- PASSO 4: CANNED RESPONSE (CLIQUE DIRETO) ---
            await esperar(500);
            const btnCanned = document.querySelector('material-button[debug-id="canned_response_button"]');
            
            if (btnCanned) {
                // Não precisamos de scroll se usarmos clique direto simulado, mas ajuda a trazer para a viewport
                btnCanned.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await esperar(200); 
                simularCliqueReal(btnCanned);
                
                // --- PASSO 5: PESQUISAR ---
                await esperar(1500); // Tempo reduzido pois o menu costuma ser rápido
                const searchInput = document.querySelector('material-auto-suggest-input input');
                
                if (searchInput) {
                    simularCliqueReal(searchInput);
                    await esperar(200);
                    
                    // Digita o código
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
                             // 1. Tenta encontrar pela string exata
                             opcaoAlvo = opcoes.find(opt => 
                                opt.innerText.toLowerCase().includes(cannedResponseText.toLowerCase())
                            );

                            // 2. Fallback: Se só tem 1 opção, usa ela
                            if (!opcaoAlvo && opcoes.length === 1) {
                                opcaoAlvo = opcoes[0];
                            }

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

                        // Busca o elemento atualizado
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
                            showToast("Email pronto! ✨");
                        } else {
                             // Às vezes o template não tem nome, tudo bem.
                             showToast("Email inserido.");
                        }
                    } else {
                        showToast(`Template '${cannedResponseText}' não encontrado.`, { error: true });
                    }
                }
            }
        } else {
             showToast("Erro no ID do corpo do email.", { error: true });
        }
    }
}