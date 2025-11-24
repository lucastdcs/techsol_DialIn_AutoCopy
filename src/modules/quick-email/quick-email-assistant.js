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

export function initQuickEmailAssistant() {
    const CURRENT_VERSION = "v1.5";

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
        
        // 1. ABRIR EMAIL
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
                        const clickTarget = emailBtn.closest('material-button') || emailBtn;
                        simularCliqueReal(clickTarget);
                    }
                }
            }
        }

        await esperar(3000); 

        // ===== NOVO: VERIFICAÇÃO DE RASCUNHO (Pre-write Draft) =====
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
        const editorPai = document.querySelector('div[contenteditable="true"][aria-label="Email body"]');

        if (divConteudoTexto && editorPai) {
            const ancestral = editorPai.closest('[aria-hidden="true"]');
            if (ancestral) ancestral.removeAttribute('aria-hidden');
            
            editorPai.focus();
            simularCliqueReal(divConteudoTexto);
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

                document.execCommand('insertHTML', false, template.body);
                
                showToast("Email preenchido!");
            }
        } else {
            showToast("Erro: Editor não encontrado.", { error: true });
        }
    }

    // --- UI ---
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

    const header = document.createElement("div");
    Object.assign(header.style, stylePopupHeader);
    makeDraggable(popup, header);

    const titleContainer = document.createElement("div");
    Object.assign(titleContainer.style, { display: 'flex', flexDirection: 'column', flexGrow: '1' });
    const title = document.createElement("div");
    title.textContent = "Emails Rápidos";
    Object.assign(title.style, stylePopupTitle);
    titleContainer.appendChild(title);

    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✕";
    Object.assign(closeBtn.style, stylePopupCloseBtn);
    closeBtn.onclick = () => togglePopup(false);
    
    header.appendChild(titleContainer);
    header.appendChild(closeBtn);
    popup.appendChild(header);

    const content = document.createElement("div");
    Object.assign(content.style, { padding: "16px", overflowY: "auto", maxHeight: "400px" });
    popup.appendChild(content);

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