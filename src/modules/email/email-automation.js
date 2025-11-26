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

// --- FUNÇÃO AUXILIAR: ENCONTRAR CONTAINER VISÍVEL ---
// Resolve o problema de múltiplas abas (IDs duplicados no DOM)
function getVisibleEmailContainer() {
    const todosTops = Array.from(document.querySelectorAll('[id="email-body-content-top"]'));
    return todosTops.find(el => el.offsetParent !== null);
}

// --- FUNÇÃO COMPARTILHADA: ABRIR E LIMPAR ---
async function openAndClearEmail() {
    // 1. ABRIR EMAIL
    let emailAberto = false;
    const todosIcones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeEmail = todosIcones.find(el => el.innerText.trim() === 'email');

    // Tenta achar botão de email VISÍVEL e clicar
    if (iconeEmail && iconeEmail.offsetParent !== null) {
        const botaoAlvo = iconeEmail.closest('material-button') || iconeEmail.closest('material-fab') || iconeEmail;
        // Hack de visibilidade para o Angular
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

    // === ESPERA PELO EDITOR VISÍVEL ===
    let tentativas = 0;
    let containerVisivel = getVisibleEmailContainer();

    // Espera até 15s (o carregamento pode ser lento)
    while (!containerVisivel && tentativas < 30) {
        await esperar(500);
        containerVisivel = getVisibleEmailContainer();
        tentativas++;
    }

    if (!containerVisivel) {
        showToast("Erro: Editor de email não apareceu na tela.", { error: true });
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
            // Atualiza referência após descarte (DOM mudou)
            containerVisivel = getVisibleEmailContainer();
        }
    }

    // 3. LIMPEZA NUCLEAR (NO CONTAINER VISÍVEL)
    if (containerVisivel) {
        // Tenta achar o editor pai para garantir o foco
        // Usamos closest a partir do container visível para não pegar de outra aba
        const wrapperGeral = containerVisivel.closest('.email-body-content') || document.body;
        const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');

        if (editorPai) {
            const ancestral = editorPai.closest('[aria-hidden="true"]');
            if (ancestral) ancestral.removeAttribute('aria-hidden');
            editorPai.focus();
        }
        
        await esperar(300);

        // === A LIMPEZA PERFEITA ===
        // Substitui todo o HTML do container 'top'.
        // Remove texto antigo, assinaturas, espaçadores e avisos de ID.
        containerVisivel.innerHTML = `
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;
        
        // REPOSICIONA CURSOR (Dentro do novo span)
        const novoElementoSagrado = containerVisivel.querySelector('#cases-body-field');
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
    // Chama a limpeza perfeita
    const emailPronto = await openAndClearEmail();
    if (!emailPronto) return;

    // --- LÓGICA CANNED RESPONSE ---
    await esperar(500);
    const btnCanned = document.querySelector('material-button[debug-id="canned_response_button"]');
    
    if (btnCanned) {
        btnCanned.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await esperar(200); 
        simularCliqueReal(btnCanned);
        
        // Espera o input de busca
        await esperar(1500); 
        const searchInput = document.querySelector('material-auto-suggest-input input');
        
        if (searchInput) {
            simularCliqueReal(searchInput);
            await esperar(200);
            
            // === INSERÇÃO ROBUSTA DO TEXTO ===
            // Usa execCommand para simular digitação humana (Angular detecta isso)
            document.execCommand('insertText', false, cannedResponseText);
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            // Espera Ativa pela Lista (Polling)
            let opcaoAlvo = null;
            let tentativas = 0;
            while (tentativas < 20) { 
                await esperar(500);
                tentativas++;
                const opcoes = Array.from(document.querySelectorAll('material-select-dropdown-item'));
                if (opcoes.length > 0) {
                     // 1. Busca exata
                     opcaoAlvo = opcoes.find(opt => 
                        opt.innerText.toLowerCase().includes(cannedResponseText.toLowerCase())
                    );
                    // 2. Fallback: Se só tem 1 opção, usa ela
                    if (!opcaoAlvo && opcoes.length === 1) opcaoAlvo = opcoes[0];
                    if (opcaoAlvo) break;
                }
            }

            if (opcaoAlvo) {
                simularCliqueReal(opcaoAlvo);
                await esperar(2000); // Espera template carregar

                // --- SUBSTITUIR NOME ---
                function encontrarNoDeTexto(elemento, textoParaAchar) {
                    if (elemento.nodeType === 3 && elemento.nodeValue.includes(textoParaAchar)) return elemento;
                    if (!elemento.childNodes) return null;
                    for (let child of elemento.childNodes) {
                        const achou = encontrarNoDeTexto(child, textoParaAchar);
                        if (achou) return achou;
                    }
                    return null;
                }

                // Busca o elemento VISÍVEL atualizado
                const containerVisivel = getVisibleEmailContainer();
                let noAlvo = encontrarNoDeTexto(containerVisivel, '{%ADVERTISER_NAME%}');

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
    // Chama a limpeza perfeita. O cursor já volta posicionado no lugar certo.
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
    // Precisamos apenas focar no editor, o cursor já está no span limpo
    const containerVisivel = getVisibleEmailContainer();
    const wrapperGeral = containerVisivel.closest('.email-body-content') || document.body;
    const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');
    
    if (editorPai) {
        editorPai.focus();

        // Substituição de Placeholders
        let finalBody = template.body;
        finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
        finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");
        finalBody = finalBody.replace(/\[Seu Nome\]/g, "Agente Google"); 

        // INSERÇÃO
        document.execCommand('insertHTML', false, finalBody);
        
        // Dispara eventos para garantir persistência
        editorPai.dispatchEvent(new Event('input', { bubbles: true }));
        editorPai.dispatchEvent(new Event('change', { bubbles: true }));
        
        showToast("Email preenchido com sucesso!", { duration: 2000 });
    } else {
        showToast("Erro ao focar no editor.", { error: true });
    }
}