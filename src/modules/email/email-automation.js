// src/modules/email/email-automation.js
import { showToast } from '../shared/utils.js';
import { getPageData } from '../shared/page-data.js'; 
import { getAgentName } from '../shared/page-data.js';

// --- UTILITÁRIOS ---
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function log(msg, type = 'info') {
    const styles = {
        info: 'background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;',
        warn: 'background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;',
        error: 'background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;',
        success: 'background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;'
    };
    console.log(`%c[EMAIL-BOT] ${msg}`, styles[type] || styles.info);
}

function simularCliqueReal(elemento) {
    if (!elemento) return;
    const opts = { bubbles: true, cancelable: true, view: window };
    ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(evt => 
        elemento.dispatchEvent(new MouseEvent(evt, opts))
    );
}

function getVisibleEditor() {
    // Procura por qualquer área de conteúdo de email
    const todos = Array.from(document.querySelectorAll('[id="email-body-content-top-content"]'));
    
    const editor = todos.find(el => {
        // Verifica se o elemento ocupa espaço na tela (não está display:none)
        const isVisible = el.offsetParent !== null;
        // Verifica se não está dentro de uma mensagem antiga (histórico)
        const isReadOnly = el.closest('case-message-view') !== null;
        // Verifica se está dentro de uma estrutura de edição
        const isEditable = el.closest('.editor') !== null || el.closest('write-card') !== null;
        
        return isVisible && !isReadOnly && isEditable;
    });

    if (editor) log("Editor visualmente detectado.", 'success');
    return editor;
}

// --- CORE: ABRIR E LIMPAR ---
async function openAndClearEmail() {
    log("🚀 FASE 1: Tentando abrir a janela de email...");

    let emailAberto = false;
    
    // Tenta achar o botão de email pelo ícone
    const todosIcones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeEmail = todosIcones.find(el => el.innerText.trim() === 'email');

    if (iconeEmail && iconeEmail.offsetParent !== null) {
        log("Botão de email direto encontrado.");
        const botaoAlvo = iconeEmail.closest('material-button') || iconeEmail.closest('material-fab') || iconeEmail;
        simularCliqueReal(botaoAlvo);
        emailAberto = true;
    } else {
        log("Botão direto não visível. Tentando Speed Dial (+)...", 'warn');
        const speedDial = document.querySelector('material-fab-speed-dial');
        if (speedDial) {
            const triggerBtn = speedDial.querySelector('.trigger');
            if (triggerBtn) {
                simularCliqueReal(triggerBtn);
                await esperar(800);
                
                // Re-escaneia ícones após abrir o menu
                const iconesNovos = Array.from(document.querySelectorAll('i.material-icons-extended'));
                const emailBtnNovo = iconesNovos.find(el => el.innerText.trim() === 'email');
                if (emailBtnNovo) {
                    log("Botão de email no Speed Dial encontrado.");
                    simularCliqueReal(emailBtnNovo);
                    emailAberto = true;
                }
            }
        }
    }

    if (!emailAberto) {
        log("FATAL: Não consegui clicar no botão de email.", 'error');
        showToast("Erro: Botão de email não encontrado.", { error: true });
        return false;
    }
    
    // ============================================================
    // FASE 2: CAÇA AO RASCUNHO (A parte crítica)
    // ============================================================
    log("🚀 FASE 2: Verificando existência de rascunhos...");
    
    let draftButton = null;
    let attempts = 0;
    const MAX_ATTEMPTS = 20; // Aumentei para dar tempo da UI renderizar

    while (attempts < MAX_ATTEMPTS) {
        await esperar(250); // Polling a cada 250ms
        
        // Seletor específico do botão de lixeira do rascunho
        const candidates = document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');
        draftButton = Array.from(candidates).find(el => el.offsetParent !== null);    

        if (draftButton) {
            log(`⚠️ Rascunho detectado na tentativa ${attempts + 1}!`, 'warn');
            break;
        }
        
        // Log para saber que ainda está procurando
        if (attempts % 5 === 0) log(`Procurando botão de descartar... (${attempts}/${MAX_ATTEMPTS})`);
        
        attempts++;
    }

    // SE ACHOU O BOTÃO DE DESCARTAR
    if (draftButton) {
        log("🗑️ Iniciando protocolo de descarte...");
        
        // 1. Clica na Lixeira
        simularCliqueReal(draftButton);
        draftButton.click(); // Redundância

        // 2. Espera o Modal de Confirmação (Pode demorar)
        log("⏳ Aguardando Modal de Confirmação...");
        let confirmBtn = null;
        let confirmAttempts = 0;
        
        while (confirmAttempts < 15) {
            await esperar(300);
            const confirms = document.querySelectorAll('material-button[debug-id="confirm-button"]');
            confirmBtn = Array.from(confirms).find(el => el.offsetParent !== null);
            if (confirmBtn) break;
            confirmAttempts++;
        }

        if (confirmBtn) {
            log("✅ Modal encontrado. Confirmando exclusão...", 'success');
            simularCliqueReal(confirmBtn);
            
            showToast("Limpando rascunho antigo...", { duration: 2000 });
            
            // 3. ESPERA O RASCUNHO MORRER
            // Isso é crucial. Se o script continuar antes do rascunho sumir, ele quebra.
            log("⏳ Esperando o editor antigo ser destruído...");
            await esperar(2500); 
        } else {
            log("❌ ERRO: Cliquei na lixeira, mas o confirmar não apareceu.", 'error');
        }
    } else {
        log("ℹ️ Nenhum botão de rascunho encontrado após varredura. Assumindo editor limpo.");
    }

    // ============================================================
    // FASE 3: INJEÇÃO NO EDITOR NOVO
    // ============================================================
    log("🚀 FASE 3: Buscando editor final para escrita...");

    let tentativasEditor = 0;
    let editorVisivel = null;
    
    // Tenta achar o editor por até 5 segundos
    while (tentativasEditor < 20) {
        editorVisivel = getVisibleEditor();
        if (editorVisivel) break;
        
        await esperar(250);
        tentativasEditor++;
    }

    if (!editorVisivel) {
        log("FATAL: O editor não apareceu na tela a tempo.", 'error');
        showToast("Erro: Editor não carregou.", { error: true });
        return false;
    }

    log("📝 Editor localizado! Preparando para limpar...", 'success');

    // Seleciona o container pai para garantir foco
    const containerTopo = editorVisivel.closest('[id="email-body-content-top"]');
    const wrapperGeral = editorVisivel.closest('.email-body-content') || document.body;
    const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');

    if (containerTopo) {
        if (editorPai) {
            // Remove atributo que as vezes bloqueia a escrita
            const ancestral = editorPai.closest('[aria-hidden="true"]');
            if (ancestral) ancestral.removeAttribute('aria-hidden');
            
            editorPai.focus();
            simularCliqueReal(editorPai); // Garante foco real
        }
        
        await esperar(300);

        // Reseta o HTML do editor para garantir pureza
        containerTopo.innerHTML = `
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;
        
        // Coloca o cursor no lugar certo
        const novoElementoSagrado = containerTopo.querySelector('#cases-body-field');
        if (novoElementoSagrado) {
            const range = document.createRange();
            range.selectNodeContents(novoElementoSagrado);
            range.collapse(true); 
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        
        log("✨ Editor limpo e pronto.");
        return true; 
    }
    
    return false;
}

// --- FUNÇÕES DE APLICAÇÃO (Canned & Quick) ---

export async function runEmailAutomation(cannedResponseText) {
    if (!cannedResponseText) return;
    
    const emailPronto = await openAndClearEmail();
    if (!emailPronto) return;

    log(`Iniciando Canned Response: ${cannedResponseText}`);
    const pageData = getPageData();

    await esperar(500);
    const btnCanned = document.querySelector('material-button[debug-id="canned_response_button"]');
    
    if (btnCanned) {
        simularCliqueReal(btnCanned);
        
        await esperar(1000); // Espera popup abrir
        const searchInput = document.querySelector('material-auto-suggest-input input');
        
        if (searchInput) {
            simularCliqueReal(searchInput);
            document.execCommand('insertText', false, cannedResponseText);
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            // Espera filtrar
            await esperar(800);

            // Tenta clicar na primeira opção visível
            const primeiraOpcao = document.querySelector('material-select-dropdown-item');
            if (primeiraOpcao) {
                simularCliqueReal(primeiraOpcao);
                await esperar(10000); // Espera o texto entrar

                // Substituição de variáveis do Canned
                const editorVisivel = getVisibleEditor();
                if (editorVisivel && pageData.advertiserName) {
                    const html = editorVisivel.innerHTML;
                    if (html.includes('{%ADVERTISER_NAME%}')) {
                        editorVisivel.innerHTML = html.replace(/{%ADVERTISER_NAME%}/g, pageData.advertiserName);
                    }
                }
                showToast("Canned Response aplicada!");
            } else {
                log("Opção de Canned não encontrada no dropdown.", 'warn');
                showToast(`Template '${cannedResponseText}' não encontrado.`, { error: true });
            }
        }
    } else {
        log("Botão Canned Response não encontrado na toolbar.", 'error');
    }
}

export async function runQuickEmail(template) {
    log(`🚀 Iniciando Quick Email: ${template.name}`);
    
    const emailPronto = await openAndClearEmail(); 
    if (!emailPronto) return;

    const pageData = getPageData(); 
    const agentName = getAgentName();

    await esperar(600); 

    // Preenche Assunto
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
         // Garante foco
         const wrapperGeral = editorVisivel.closest('.email-body-content') || document.body;
         const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');
         
         if (editorPai) {
             editorPai.focus();
             simularCliqueReal(editorPai);
         }

        // Calcula Data (+3 dias úteis simplificado)
        const date = new Date();
        date.setDate(date.getDate() + 3); 
        const day = date.getDay();
        if (day === 6) date.setDate(date.getDate() + 2);
        else if (day === 0) date.setDate(date.getDate() + 1);
        const dataFormatada = date.toLocaleDateString('pt-BR');
        
        // Substituição de Variáveis
        let finalBody = template.body;
        finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
        finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");
        finalBody = finalBody.replace(/\[URL\]/g, pageData.websiteUrl || "seu site");
        finalBody = finalBody.replace(/\[Seu Nome\]/g, agentName); 
        finalBody = finalBody.replace(/\[MM\/DD\/YYYY\]/g, dataFormatada);

        // Insere HTML
        document.execCommand('insertHTML', false, finalBody);
        
        // Dispara eventos de mudança
        if (editorPai) {
            editorPai.dispatchEvent(new Event('input', { bubbles: true }));
            editorPai.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        showToast("Email preenchido com sucesso!", { duration: 2000 });
        log("✅ Processo finalizado com sucesso.", 'success');

    } else {
        log("Erro final: Editor não encontrado para inserção.", 'error');
        showToast("Erro ao focar no editor.", { error: true });
    }
}