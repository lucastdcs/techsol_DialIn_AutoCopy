// src/modules/quick-email/quick-email-assistant.js

import { 
    makeDraggable,
    stylePopup,
    stylePopupHeader,
    stylePopupTitle,
    stylePopupCloseBtn,
    styleFloatingButton,
    stylePopupVersion,
    styleCredit,
    styleButtonBase,
    styleLabel,
    showToast
} from '../shared/utils.js';

import { QUICK_EMAILS } from './quick-email-data.js';
import { getPageData } from '../shared/page-data.js';

export function initQuickEmailAssistant() {
    const CURRENT_VERSION = "v1.8"; // Versão com Lógica Sniper

    const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function simularCliqueReal(elemento) {
        const opts = { bubbles: true, cancelable: true, view: window };
        elemento.dispatchEvent(new MouseEvent('mouseover', opts));
        elemento.dispatchEvent(new MouseEvent('mousedown', opts));
        elemento.dispatchEvent(new MouseEvent('mouseup', opts));
        elemento.dispatchEvent(new MouseEvent('click', opts));
    }

    async function applyEmailTemplate(template) {
        showToast("Abrindo e preenchendo email...");
        
        // 0. Captura Dados
        const pageData = getPageData();
        
        // --- PASSO 1: ABRIR EMAIL (Lógica Sniper / Direta) ---
        let emailAberto = false;
        
        // 1. Busca ícone de email em todo o DOM (mesmo se o menu estiver fechado)
        const todosIcones = Array.from(document.querySelectorAll('i.material-icons-extended'));
        const iconeEmail = todosIcones.find(el => el.innerText.trim() === 'email');

        if (iconeEmail) {
            console.log("⚡ Modo Rápido: Ícone de email encontrado. Clicando direto...");
            // Tenta achar o botão pai para clicar nele (mais seguro para o Angular)
            const botaoAlvo = iconeEmail.closest('material-button') || iconeEmail.closest('material-fab') || iconeEmail;
            
            // Hack: Força visibilidade caso esteja oculto pelo menu fechado
            if (botaoAlvo.style) {
                botaoAlvo.style.display = 'block';
                botaoAlvo.style.visibility = 'visible';
            }
            
            simularCliqueReal(botaoAlvo);
            emailAberto = true;
        } else {
            console.log("⚠️ Modo Rápido falhou (botão não achado). Tentando via Menu (+)...");
            
            // Fallback: Lógica antiga (Abrir menu +)
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
                } else {
                    speedDial.click();
                }
            }
        }

        if (!emailAberto && !document.getElementById('email-body-content-top-content')) {
             // Se não achou botão e o email não tá aberto, tenta esperar um pouco mais ou falha
             await esperar(1000);
             if (!document.getElementById('email-body-content-top-content')) {
                showToast("Erro ao abrir email.", { error: true });
                return;
             }
        }

        await esperar(3000); 

        // ===== VERIFICAÇÃO DE RASCUNHO (Pre-write Draft) =====
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
        // ============================================================

        // 2. LIMPEZA E FOCO
        const divConteudoTexto = document.getElementById('email-body-content-top-content');
        // Seletor corrigido para o ID exato do wrapper
        const editorPai = document.querySelector('div[contenteditable="true"][aria-label="Email body"]') || document.getElementById('email-body-content-top-content');

        if (divConteudoTexto && editorPai) {
            const ancestral = editorPai.closest('[aria-hidden="true"]');
            if (ancestral) ancestral.removeAttribute('aria-hidden');
            
            editorPai.focus();
            simularCliqueReal(divConteudoTexto); // Garante foco interno
            await esperar(500); 

            // Limpeza usando a técnica de isolamento de ID
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

                // 3. INSERÇÃO DO CONTEÚDO
                const subjectInput = document.querySelector('input[aria-label="Subject"]');
                if (subjectInput && template.subject) {
                    subjectInput.value = template.subject;
                    subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
                }

                // Substitui os placeholders pelos dados reais
                let finalBody = template.body;
                finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName);
                finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl);

                document.execCommand('insertHTML', false, finalBody);
                
                showToast("Email preenchido!");
            }
        } else {
            showToast("Erro: Editor não encontrado.", { error: true });
        }
    }

    // --- UI (Mantida Igual) ---
    const btn = document.createElement("button");
    btn.id = "quick-email-floating-btn";
    btn.textContent = "✉️";
    Object.assign(btn.style, styleFloatingButton, {
        top: "50%",
        background: "#db4437"
    });
    btn.onmouseenter = () => {
        btn.style.background = "#c5221f";
        btn.style.transform = "scale(1.1)";
    };
    btn.onmouseleave = () => {
        btn.style.background = "#db4437";
        btn.style.transform = "scale(1)";
    };
    document.body.appendChild(btn);
    makeDraggable(btn);

    const popup = document.createElement("div");
    popup.id = "quick-email-popup";
    Object.assign(popup.style, stylePopup, { right: "160px" }); 

    // HEADER COMPLETO
    const header = document.createElement("div");
    Object.assign(header.style, stylePopupHeader);
    makeDraggable(popup, header);

    const headerLeft = document.createElement("div");
    Object.assign(headerLeft.style, { display: 'flex', alignItems: 'center', gap: '10px' });
    
    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "24px", height: "24px" });

    const titleContainer = document.createElement("div");
    Object.assign(titleContainer.style, { display: 'flex', flexDirection: 'column', flexGrow: '1' });
    const title = document.createElement("div");
    title.textContent = "Emails Rápidos";
    Object.assign(title.style, stylePopupTitle);
    const versionDisplay = document.createElement("div");
    versionDisplay.textContent = CURRENT_VERSION;
    Object.assign(versionDisplay.style, stylePopupVersion);
    
    titleContainer.appendChild(title);
    titleContainer.appendChild(versionDisplay);
    headerLeft.appendChild(logo);
    headerLeft.appendChild(titleContainer);
    
    const headerRight = document.createElement("div");
    Object.assign(headerRight.style, { display: 'flex', alignItems: 'center' });

    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✕";
    Object.assign(closeBtn.style, stylePopupCloseBtn);
    closeBtn.onclick = () => togglePopup(false);
    headerRight.appendChild(closeBtn);
    
    header.appendChild(headerLeft);
    header.appendChild(headerRight);
    popup.appendChild(header);

    const content = document.createElement("div");
    Object.assign(content.style, { padding: "16px", overflowY: "auto", maxHeight: "400px", flexGrow: "1" });
    popup.appendChild(content);

    // RODAPÉ
    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, styleCredit);
    popup.appendChild(credit);

    for (const categoryKey in QUICK_EMAILS) {
        const category = QUICK_EMAILS[categoryKey];
        
        const catTitle = document.createElement("div");
        catTitle.textContent = category.title;
        Object.assign(catTitle.style, styleLabel, { 
            borderBottom: "1px solid #eee", 
            paddingBottom: "4px",
            marginTop: "12px",
            color: "#1a73e8"
        });
        content.appendChild(catTitle);

        category.emails.forEach(email => {
            const emailBtn = document.createElement("button");
            emailBtn.textContent = email.name;
            Object.assign(emailBtn.style, styleButtonBase, {
                marginTop: "8px",
                background: "#f1f3f4",
                color: "#3c4043",
                border: "1px solid #dadce0",
                textAlign: "left",
                paddingLeft: "12px"
            });
            
            emailBtn.onmouseover = () => emailBtn.style.background = "#e8eaed";
            emailBtn.onmouseout = () => emailBtn.style.background = "#f1f3f4";
            
            emailBtn.onclick = () => {
                applyEmailTemplate(email);
            };

            content.appendChild(emailBtn);
        });
    }

    document.body.appendChild(popup);

    function togglePopup(show) {
        if (show) {
            popup.style.opacity = "1";
            popup.style.pointerEvents = "auto";
            popup.style.transform = "scale(1)";
        } else {
            popup.style.opacity = "0";
            popup.style.pointerEvents = "none";
            popup.style.transform = "scale(0.95)";
        }
    }

    let visible = false;
    btn.onclick = () => {
        visible = !visible;
        togglePopup(visible);
    };
}