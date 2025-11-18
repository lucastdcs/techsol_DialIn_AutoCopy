// src/modules/email/email-automation.js
import { showToast } from '../shared/utils.js';

// Função auxiliar de espera
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função de clique real (Mouse events)
function simularCliqueReal(elemento) {
    const opts = { bubbles: true, cancelable: true, view: window };
    elemento.dispatchEvent(new MouseEvent('mouseover', opts));
    elemento.dispatchEvent(new MouseEvent('mousedown', opts));
    elemento.dispatchEvent(new MouseEvent('mouseup', opts));
    elemento.dispatchEvent(new MouseEvent('click', opts));
}

/**
 * Executa a automação de limpeza e inserção de Canned Response.
 * @param {string} cannedResponseText - O código da resposta (ex: "ts so verif")
 */
export async function runEmailAutomation(cannedResponseText) {
    if (!cannedResponseText) {
        console.log("Nenhum código de Canned Response fornecido.");
        return;
    }

    console.log(`🚀 Iniciando automação de email para: ${cannedResponseText}`);
    showToast(`Iniciando automação de email: ${cannedResponseText}...`, { duration: 3000 });

    // --- PASSO 0: CAPTURAR NOME ---
    let nomeCliente = "Cliente";
    try {
        const xpath = "//div[contains(text(), 'Given name')]";
        const labelNode = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (labelNode && labelNode.nextElementSibling) {
            nomeCliente = labelNode.nextElementSibling.innerText.trim();
            console.log(`✅ Nome capturado: "${nomeCliente}"`);
        }
    } catch (e) {}

    // --- PASSO 1 e 2: ABRIR EMAIL ---
    const speedDial = document.querySelector('material-fab-speed-dial');
    if (speedDial) {
        const triggerBtn = speedDial.querySelector('.trigger');
        if (triggerBtn) {
            // Dispara o evento de hover para garantir que o menu "acorde"
            triggerBtn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            simularCliqueReal(triggerBtn);
            
            await esperar(1000);
            
            // Verifica se o email JÁ está aberto antes de tentar clicar no ícone
            if (!document.getElementById('email-body-content-top-content')) {
                const icones = Array.from(document.querySelectorAll('i.material-icons-extended'))
                    .filter(el => el.offsetParent !== null);
                const botaoEmailIcone = icones.find(el => el.innerText.trim() === 'email');

                if (botaoEmailIcone) {
                    const botaoClicavel = botaoEmailIcone.closest('material-button') || botaoEmailIcone;
                    console.log("📧 Clicando no Email...");
                    simularCliqueReal(botaoClicavel);
                } else {
                    console.error("❌ Erro: Ícone 'email' não apareceu.");
                    return;
                }
            }
        } else {
             speedDial.click(); // Fallback
        }
    } else {
        console.error("❌ Erro: Botão (+) não encontrado.");
        return;
    }

    // --- PASSO 3: LIMPEZA E FOCO ---
    console.log("⏳ Aguardando editor (3.5s)...");
    await esperar(3500); 

    // Busca os elementos (usando a lógica validada do V49)
    const divConteudoTexto = document.getElementById('email-body-content-top-content');
    // IMPORTANTE: Mantendo o seletor exato que funcionou no seu teste
    const editorPai = document.getElementById('email-body-content-top-content'); 

    if (divConteudoTexto && editorPai) {
        // Destrava
        const ancestral = editorPai.closest('[aria-hidden="true"]');
        if (ancestral) ancestral.removeAttribute('aria-hidden');
        
        editorPai.focus();
        // Clica dentro da área de texto para garantir cursor
        simularCliqueReal(document.getElementById('email-body-content-top-content'));
        await esperar(500); 

        // Elemento Sagrado (ID Obrigatório)
        const elementoSagrado = document.getElementById('cases-body-field');

        if (elementoSagrado) {
            console.log("✅ Limpando vizinhos e mantendo ID...");
            
            // Limpa vizinhos internos (Olá, Atentamente)
            while (elementoSagrado.nextSibling) elementoSagrado.nextSibling.remove();
            while (elementoSagrado.previousSibling) elementoSagrado.previousSibling.remove();

            // Limpa vizinhos externos (gTech, ID, Espaços)
            const avo = divConteudoTexto.parentElement; 
            Array.from(avo.childNodes).forEach(tio => {
                if (tio !== divConteudoTexto) avo.removeChild(tio);
            });

            // Limpa DENTRO do sagrado (Apaga o placeholder)
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
                console.log("🤖 Abrindo Canned Response...");
                simularCliqueReal(btnCanned);
                
                // --- PASSO 5: PESQUISAR ---
                await esperar(2000); 
                const searchInput = document.querySelector('material-auto-suggest-input input');
                
                if (searchInput) {
                    console.log(`🔍 Digitando '${cannedResponseText}'...`);
                    simularCliqueReal(searchInput);
                    await esperar(200);
                    
                    document.execCommand('insertText', false, cannedResponseText);
                    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                    
                    // ===== ESPERA ATIVA PELA LISTA =====
                    console.log("⏳ Aguardando opções...");
                    let opcaoAlvo = null;
                    let tentativas = 0;
                    
                    while (tentativas < 20) { // Tenta por 10s
                        await esperar(500);
                        tentativas++;
                        const opcoes = Array.from(document.querySelectorAll('material-select-dropdown-item'));
                        
                        if (opcoes.length > 0) {
                             // Busca pelo texto exato passado como argumento
                             opcaoAlvo = opcoes.find(opt => 
                                opt.innerText.toLowerCase().includes(cannedResponseText.toLowerCase())
                            );
                            if (opcaoAlvo) break;
                        }
                    }
                    // ====================================

                    if (opcaoAlvo) {
                        console.log("🎯 Clicando na opção...");
                        simularCliqueReal(opcaoAlvo);
                        
                        await esperar(2000); // Espera template carregar

                        // --- PASSO 7: SUBSTITUIR NOME (Com a Correção do Loop) ---
                        
                        function encontrarNoDeTexto(elemento, textoParaAchar) {
                            if (elemento.nodeType === 3) { 
                                if (elemento.nodeValue.includes(textoParaAchar)) return elemento;
                            }
                            // Proteção extra: se não tiver filhos, retorna null
                            if (!elemento.childNodes) return null;

                            for (let child of elemento.childNodes) {
                                const achou = encontrarNoDeTexto(child, textoParaAchar);
                                if (achou) return achou;
                            }
                            return null;
                        }

                        // 1. Pega TODOS os spans candidatos (pois o template pode ter mudado o ID)
                        const spansFields = document.querySelectorAll('span.field');
                        let noAlvo = null;

                        // 2. Procura o texto em cada um deles até achar
                        for (let span of spansFields) {
                            const resultado = encontrarNoDeTexto(span, '{%ADVERTISER_NAME%}');
                            if (resultado) {
                                noAlvo = resultado;
                                break; 
                            }
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
                            console.log("🎉 SUCESSO TOTAL! Email pronto.");
                            showToast("Email preenchido e personalizado!");
                        } else {
                            console.warn("⚠️ Token {%ADVERTISER_NAME%} não encontrado.");
                            showToast("Email preenchido, mas nome não substituído.", { error: true });
                        }

                    } else {
                        console.error("❌ Erro: A opção não apareceu na lista.");
                        showToast("Opção de email não encontrada.", { error: true });
                    }
                } else {
                    console.error("❌ Erro: Input de busca não encontrado.");
                }
            }
        } else {
             // Fallback
             console.warn("⚠️ ID 'cases-body-field' sumiu? Tentando limpeza de fallback...");
        }

    } else {
        console.error("❌ Erro: Editor de email não encontrado.");
    }
}