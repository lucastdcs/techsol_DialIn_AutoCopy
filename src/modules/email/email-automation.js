// src/modules/email/email-automation.js
import { showToast } from '../shared/utils.js';
import { getPageData } from '../shared/page-data.js'; 
import { getAgentName } from '../shared/page-data.js';

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function simularCliqueReal(elemento) {
    if (!elemento) return;
    const opts = { bubbles: true, cancelable: true, view: window };
    ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(evt => 
        elemento.dispatchEvent(new MouseEvent(evt, opts))
    );
}

function getFollowUpDate() {
    const date = new Date();
    date.setDate(date.getDate() + 3); // Soma 3 dias corridos

    const dayOfWeek = date.getDay(); // 0 = Domingo, 6 = Sábado

    if (dayOfWeek === 6) { 
        // Se cair no Sábado, joga para Segunda (+2 dias)
        date.setDate(date.getDate() + 2);
    } else if (dayOfWeek === 0) { 
        // Se cair no Domingo, joga para Segunda (+1 dia)
        date.setDate(date.getDate() + 1);
    }

    // Formata para DD/MM/AAAA (Padrão BR/PT)
    return date.toLocaleDateString('pt-BR');
}

function getVisibleEditor() {

    const todos = Array.from(document.querySelectorAll('[id="email-body-content-top-content"]'));
    
    return todos.find(el => {
        const isVisible = el.offsetParent !== null;
        const isReadOnly = el.closest('case-message-view') !== null;
        const isEditable = el.closest('.editor') !== null || el.closest('write-card') !== null;
        
        return isVisible && !isReadOnly && isEditable;
    });
}

async function openAndClearEmail() {
    console.log("🚀 FASE 1: Abrindo janela de email...");

    let emailAberto = false;
    const todosIcones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeEmail = todosIcones.find(el => el.innerText.trim() === 'email');

    if (iconeEmail && iconeEmail.offsetParent !== null) {
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

    if (!emailAberto) {
        showToast("Erro: Botão de email não encontrado.", { error: true });
        return false;
    }
    
    console.log("🚀 FASE 2: Verificando rascunhos (Polling de 3s)...");
    
    let draftButton = null;
    let attempts = 0;
    
    while (attempts < 15) { 
        await esperar(200);
        
        const candidates = document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');
        draftButton = Array.from(candidates).find(el => el.offsetParent !== null);    

        if (draftButton) break;
        
        const editorJaApareceu = getVisibleEditor();
        if (editorJaApareceu) {
            console.log("ℹ️ Editor apareceu limpo. Sem rascunhos.");
            break; 
        }

        attempts++;
    }

    if (draftButton) {
        console.log("⚠️ RASCUNHO LOCALIZADO! Executando descarte...");
        

        simularCliqueReal(draftButton);
        const textInside = draftButton.querySelector('.buttonText');
        if (textInside) simularCliqueReal(textInside);
        draftButton.click();

        // 2. Espera o Modal de Confirmação
        console.log("⏳ Aguardando Confirm...");
        let confirmBtn = null;
        let confirmAttempts = 0;
        
        while (confirmAttempts < 20) { // Espera até 4s (modais são lentos)
            await esperar(200);
            const confirms = document.querySelectorAll('material-button[debug-id="confirm-button"]');
            confirmBtn = Array.from(confirms).find(el => el.offsetParent !== null);
            if (confirmBtn) break;
            confirmAttempts++;
        }

        if (confirmBtn) {
            console.log("✅ Confirmando...");
            simularCliqueReal(confirmBtn);
            const confirmContent = confirmBtn.querySelector('.content');
            if (confirmContent) simularCliqueReal(confirmContent);
            
            showToast("Limpando rascunho...", { duration: 2000 });
            
            // O PULO DO GATO:
            // Depois de confirmar, TEMOS que esperar o editor antigo morrer e o novo nascer.
            console.log("⏳ Aguardando reload do editor pós-descarte...");
            await esperar(3000); 
        } else {
            console.warn("❌ Confirm não apareceu.");
        }
    }

    
    console.log("🚀 FASE 3: Buscando editor final para limpeza...");

    let tentativasEditor = 0;
    let editorVisivel = getVisibleEditor(); 
    
    while (!editorVisivel && tentativasEditor < 20) {
        await esperar(500);
        editorVisivel = getVisibleEditor();
        tentativasEditor++;
    }

    if (!editorVisivel) {
        showToast("Erro: Editor não carregou após a abertura.", { error: true });
        return false;
    }


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

        containerTopo.innerHTML = `
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;
        
        const novoElementoSagrado = containerTopo.querySelector('#cases-body-field');
        if (novoElementoSagrado) {
            const range = document.createRange();
            range.selectNodeContents(novoElementoSagrado);
            range.collapse(true); 
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        
        return true; 
    }
    
    return false;
}

export async function runEmailAutomation(cannedResponseText) {
    if (!cannedResponseText) return;
    showToast(`Preparando email...`, { duration: 3000 });

    const pageData = getPageData();
    const emailPronto = await openAndClearEmail();
    if (!emailPronto) return;


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


export async function runQuickEmail(template) {
    console.log(`🚀 Iniciando automação (Quick): ${template.name}`);
    showToast(`Preparando email...`, { duration: 3000 });

    const pageData = getPageData(); 
    const agentName = getAgentName();
    
    const emailPronto = await openAndClearEmail(); 
    
    if (!emailPronto) return;

    await esperar(600); 


    const subjectInput = document.querySelector('input[aria-label="Subject"]');
    if (subjectInput && template.subject) {
        subjectInput.focus();
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(subjectInput, template.subject);
        subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
        

        await esperar(300); 
    }


    const editorVisivel = getVisibleEditor();
    
    if (editorVisivel) {
         const wrapperGeral = editorVisivel.closest('.email-body-content') || document.body;
         const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');
         
         if (editorPai) {
             editorPai.focus();

             editorPai.click(); 
             editorPai.dispatchEvent(new Event('input', { bubbles: true }));
         }


        await esperar(400);


        const date = new Date();
        date.setDate(date.getDate() + 3); 
        const day = date.getDay();
        
        if (day === 6) date.setDate(date.getDate() + 2);
        else if (day === 0) date.setDate(date.getDate() + 1);
        
        const dataFormatada = date.toLocaleDateString('pt-BR');
        
        let finalBody = template.body;
        finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
        finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");
        finalBody = finalBody.replace(/\[URL\]/g, pageData.websiteUrl || "seu site");
        finalBody = finalBody.replace(/\[Seu Nome\]/g, agentName); 
        finalBody = finalBody.replace(/\[MM\/DD\/YYYY\]/g, dataFormatada);


        document.execCommand('insertHTML', false, finalBody);
        
        if (editorPai) {
            editorPai.dispatchEvent(new Event('input', { bubbles: true }));
            editorPai.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        showToast("Email preenchido com sucesso!", { duration: 2000 });

        await esperar(800); 

    } else {
        showToast("Erro ao focar no editor.", { error: true });
    }
}