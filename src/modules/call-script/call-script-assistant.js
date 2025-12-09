// src/modules/call-script/call-script-assistant.js

import {
    stylePopup,
    styleResizeHandle,
    makeResizable,
    makeDraggable
} from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";

// --- DADOS DO SCRIPT (Poderia vir de um JSON externo) ---
const SCRIPT_DATA = [
    {
        title: "👋 Abertura & Conexão",
        steps: [
            "Olá, bom dia/boa tarde! Gostaria de falar com <b>{CLIENT_NAME}</b>?",
            "Aqui é o <b>{AGENT_NAME}</b>, sou especialista de implementação do Google.",
            "O motivo do meu contato é para apoiar na implementação das tags no site <b>{URL}</b>.",
            "Você teria 10-15 minutos para realizarmos esse procedimento agora?"
        ]
    },
    {
        title: "🔍 Investigação (Sondagem)",
        steps: [
            "Para começarmos, você tem acesso administrativo ao <b>Google Ads</b>?",
            "E ao painel do site (WordPress/Shopify/Wix)?",
            "Atualmente, qual é a maior dificuldade que está encontrando na instalação?",
            "Podemos compartilhar a tela para eu te guiar melhor?"
        ]
    },
    {
        title: "🛠️ Ação Técnica",
        steps: [
            "Vou te enviar um convite de acesso para o Google Tag Manager.",
            "Poderia aceitar o convite no seu e-mail, por favor?",
            "Agora, vamos instalar o código base no <head> do site.",
            "Ótimo! Agora vamos criar a Tag de Conversão e o Vinculador."
        ]
    },
    {
        title: "✅ Validação & Fechamento",
        steps: [
            "Vamos usar o Tag Assistant para validar o disparo.",
            "Tudo funcionando! Você tem mais alguma dúvida técnica?",
            "Vou te enviar um e-mail com o resumo do que fizemos hoje.",
            "Obrigado pelo seu tempo e tenha um excelente dia!"
        ]
    }
];

export function initCallScriptAssistant() {
    const CURRENT_VERSION = "v2.0";
    let visible = false;

    // --- ESTILOS LOCAIS (Teleprompter UI) ---
    const styles = {
        progressBarContainer: {
            height: "4px",
            background: "#f1f3f4",
            width: "100%",
            position: "relative",
            overflow: "hidden"
        },
        progressBarFill: {
            height: "100%",
            background: "linear-gradient(90deg, #4285F4, #34A853)",
            width: "0%",
            transition: "width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
            borderRadius: "0 2px 2px 0"
        },
        card: {
            background: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "12px",
            transition: "all 0.3s ease",
            cursor: "pointer",
            position: "relative",
            opacity: "0.7", // Estado inativo
            transform: "scale(0.98)"
        },
        cardActive: {
            borderColor: "#1a73e8",
            boxShadow: "0 4px 12px rgba(26, 115, 232, 0.15)",
            opacity: "1",
            transform: "scale(1)",
            backgroundColor: "#fff"
        },
        cardTitle: {
            fontSize: "14px",
            fontWeight: "600",
            color: "#202124",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
        },
        stepRow: {
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            marginBottom: "8px",
            fontSize: "14px",
            lineHeight: "1.5",
            color: "#3c4043"
        },
        checkbox: {
            marginTop: "3px",
            cursor: "pointer",
            accentColor: "#1a73e8",
            width: "16px",
            height: "16px"
        }
    };

    // --- CONSTRUÇÃO DO DOM ---
    const popup = document.createElement("div");
    popup.id = "call-script-popup";
    // Usa estilos globais + ajustes de posição
    Object.assign(popup.style, stylePopup, {
        right: "auto", 
        left: "50%",
        width: "420px",
        height: "600px", // Altura inicial boa para leitura
        opacity: "0",
        pointerEvents: "none"
    });

    const animRefs = { popup, googleLine: null };

    // 1. HEADER
    const header = createStandardHeader(
        popup,
        "Call Script",
        CURRENT_VERSION,
        "Guia interativo para condução de chamadas.",
        animRefs,
        () => toggleVisibility()
    );
    popup.appendChild(header);

    // 2. PROGRESS BAR (Gamification)
    const progressContainer = document.createElement("div");
    Object.assign(progressContainer.style, styles.progressBarContainer);
    const progressFill = document.createElement("div");
    Object.assign(progressFill.style, styles.progressBarFill);
    progressContainer.appendChild(progressFill);
    popup.appendChild(progressContainer);

    // 3. CONTEÚDO (Scrollable)
    const contentArea = document.createElement("div");
    Object.assign(contentArea.style, {
        padding: "16px",
        overflowY: "auto",
        flexGrow: "1",
        scrollBehavior: "smooth"
    });
    popup.appendChild(contentArea);

    // 4. FOOTER (Opcional - Reset)
    const footer = document.createElement("div");
    Object.assign(footer.style, {
        padding: "10px 16px",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "flex-end",
        background: "#f8f9fa"
    });
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Resetar Script";
    resetBtn.style.cssText = "background:none; border:none; color:#5f6368; font-size:12px; cursor:pointer; font-weight:500;";
    resetBtn.onclick = resetAll;
    footer.appendChild(resetBtn);
    popup.appendChild(footer);

    // --- RESIZE HANDLE (Padrão Novo) ---
    const resizeHandle = document.createElement('div');
    Object.assign(resizeHandle.style, styleResizeHandle);
    resizeHandle.className = "no-drag";
    resizeHandle.title = "Redimensionar";
    popup.appendChild(resizeHandle);
    makeResizable(popup, resizeHandle);

    document.body.appendChild(popup);

    // --- LÓGICA DE RENDERIZAÇÃO ---
    let totalSteps = 0;
    let completedSteps = 0;

    function renderScript() {
        contentArea.innerHTML = "";
        totalSteps = 0;
        completedSteps = 0;

        SCRIPT_DATA.forEach((section, sIndex) => {
            const card = document.createElement("div");
            Object.assign(card.style, styles.card);
            
            // Título da Seção
            const title = document.createElement("div");
            Object.assign(title.style, styles.cardTitle);
            title.textContent = section.title;
            card.appendChild(title);

            // Container dos Passos
            const stepsContainer = document.createElement("div");
            
            section.steps.forEach((stepText, stepIndex) => {
                totalSteps++;
                const row = document.createElement("div");
                Object.assign(row.style, styles.stepRow);

                const chk = document.createElement("input");
                chk.type = "checkbox";
                chk.id = `step-${sIndex}-${stepIndex}`;
                Object.assign(chk.style, styles.checkbox);

                const label = document.createElement("label");
                label.htmlFor = `step-${sIndex}-${stepIndex}`;
                label.innerHTML = stepText; // Permite <b>
                label.style.cursor = "pointer";

                // Evento de Check
                chk.onchange = (e) => {
                    if (e.target.checked) {
                        completedSteps++;
                        row.style.opacity = "0.5"; // Diminui opacidade do que já foi
                        row.style.textDecoration = "line-through";
                    } else {
                        completedSteps--;
                        row.style.opacity = "1";
                        row.style.textDecoration = "none";
                    }
                    updateProgress();
                    focusCard(card); // Garante foco ao interagir
                };

                row.appendChild(chk);
                row.appendChild(label);
                stepsContainer.appendChild(row);
            });

            card.appendChild(stepsContainer);

            // Evento de Foco no Card (Clique em qualquer lugar)
            card.onclick = (e) => {
                if(e.target.type !== 'checkbox') focusCard(card);
            };

            contentArea.appendChild(card);
        });
        
        // Foca no primeiro card inicialmente
        if(contentArea.firstChild) focusCard(contentArea.firstChild);
    }

    function focusCard(activeCard) {
        // Remove foco de todos
        Array.from(contentArea.children).forEach(c => {
            Object.assign(c.style, styles.card); // Volta ao estilo base (opacidade 0.7)
        });
        // Adiciona foco no atual
        Object.assign(activeCard.style, styles.cardActive);
        
        // Scroll suave para garantir visibilidade
        // activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function updateProgress() {
        const pct = totalSteps === 0 ? 0 : (completedSteps / totalSteps) * 100;
        progressFill.style.width = `${pct}%`;
        
        // Mudança de cor dinâmica (Azul -> Verde)
        if (pct === 100) {
            progressFill.style.background = "#34A853"; // Verde Sucesso
        } else {
            progressFill.style.background = "linear-gradient(90deg, #4285F4, #34A853)";
        }
    }

    function resetAll() {
        const checks = contentArea.querySelectorAll('input[type="checkbox"]');
        checks.forEach(c => {
            c.checked = false;
            c.dispatchEvent(new Event('change')); // Dispara lógica visual
        });
        // Foca no primeiro de novo
        if(contentArea.firstChild) focusCard(contentArea.firstChild);
        showToast("Script reiniciado");
    }

    // Toggle
    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-script');
    }

    // Inicialização
    renderScript();

    return toggleVisibility;
}