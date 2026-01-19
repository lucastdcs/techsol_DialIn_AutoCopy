// src/modules/onboarding/onboarding-wizard.js

import { stylePopup, showToast } from "../shared/utils.js";
import { SoundManager } from "../shared/sound-manager.js";

export function initOnboarding() {
    // 1. Verificação de Segurança (Já viu?)
    if (localStorage.getItem("cw_onboarding_seen_v1")) {
        return; // Sai se já viu
    }

    // --- CONFIGURAÇÃO DOS SLIDES ---
    const SLIDES = [
        {
            icon: "🚀",
            title: "Bem-vindo ao TechSol Suite",
            text: "Sua nova central de operações para maximizar produtividade e padronização no CRM."
        },
        {
            icon: "📝",
            title: "Notas Automáticas",
            text: "Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto técnico para você."
        },
        {
            icon: "⚡",
            title: "Quick Email & Scripts",
            text: "Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."
        },
        {
            icon: "📢",
            title: "Fique Informado",
            text: "O módulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."
        },
        {
            icon: "✅",
            title: "Tudo Pronto!",
            text: "Explore o Menu Flutuante para começar. Bom trabalho!",
            isLast: true
        }
    ];

    let currentSlide = 0;

    // --- ESTILOS LOCAIS ---
    const styles = {
        overlay: {
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
            zIndex: "2147483647", // Acima de tudo
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: "0", transition: "opacity 0.3s ease"
        },
        card: {
            width: "380px", background: "#fff", borderRadius: "24px",
            padding: "32px", textAlign: "center", position: "relative",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            fontFamily: "'Google Sans', Roboto, sans-serif",
            transform: "translateY(20px)", transition: "all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"
        },
        icon: { fontSize: "48px", marginBottom: "20px", display: "block" },
        title: { fontSize: "22px", fontWeight: "700", color: "#202124", marginBottom: "12px" },
        text: { fontSize: "15px", color: "#5f6368", lineHeight: "1.6", marginBottom: "32px" },
        dotsContainer: { display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px" },
        dot: { width: "8px", height: "8px", borderRadius: "50%", background: "#dadce0", transition: "all 0.3s" },
        dotActive: { background: "#1a73e8", width: "24px", borderRadius: "4px" },
        btnContainer: { display: "flex", justifyContent: "space-between", alignItems: "center" },
        btn: {
            padding: "10px 24px", borderRadius: "20px", border: "none", cursor: "pointer",
            fontSize: "14px", fontWeight: "600", transition: "background 0.2s"
        },
        btnSkip: { background: "transparent", color: "#5f6368" },
        btnNext: { background: "#1a73e8", color: "#fff", boxShadow: "0 4px 12px rgba(26,115,232,0.3)" }
    };

    // --- CONSTRUÇÃO DA UI ---
    const overlay = document.createElement("div");
    Object.assign(overlay.style, styles.overlay);

    const card = document.createElement("div");
    Object.assign(card.style, styles.card);

    // Elementos Internos
    const iconEl = document.createElement("div");
    Object.assign(iconEl.style, styles.icon);

    const titleEl = document.createElement("div");
    Object.assign(titleEl.style, styles.title);

    const textEl = document.createElement("div");
    Object.assign(textEl.style, styles.text);

    const dotsEl = document.createElement("div");
    Object.assign(dotsEl.style, styles.dotsContainer);

    const actionsEl = document.createElement("div");
    Object.assign(actionsEl.style, styles.btnContainer);

    // Botões
    const btnSkip = document.createElement("button");
    btnSkip.textContent = "Pular";
    Object.assign(btnSkip.style, styles.btn, styles.btnSkip);
    btnSkip.onmouseover = () => btnSkip.style.color = "#202124";
    btnSkip.onmouseout = () => btnSkip.style.color = "#5f6368";

    const btnNext = document.createElement("button");
    btnNext.textContent = "Próximo";
    Object.assign(btnNext.style, styles.btn, styles.btnNext);
    btnNext.onmouseover = () => btnNext.style.transform = "scale(1.05)";
    btnNext.onmouseout = () => btnNext.style.transform = "scale(1)";

    // Montagem
    actionsEl.appendChild(btnSkip);
    actionsEl.appendChild(btnNext);

    card.appendChild(iconEl);
    card.appendChild(titleEl);
    card.appendChild(textEl);
    card.appendChild(dotsEl);
    card.appendChild(actionsEl);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // --- LÓGICA DE RENDERIZAÇÃO ---
    function renderSlide(index) {
        const slide = SLIDES[index];
        
        // Conteúdo
        iconEl.textContent = slide.icon;
        titleEl.textContent = slide.title;
        textEl.textContent = slide.text;

        // Dots
        dotsEl.innerHTML = "";
        SLIDES.forEach((_, i) => {
            const d = document.createElement("div");
            Object.assign(d.style, styles.dot);
            if (i === index) Object.assign(d.style, styles.dotActive);
            dotsEl.appendChild(d);
        });

        // Botões
        if (slide.isLast) {
            btnSkip.style.display = "none";
            btnNext.textContent = "Começar 🚀";
            btnNext.style.width = "100%";
        } else {
            btnSkip.style.display = "block";
            btnNext.textContent = "Próximo";
            btnNext.style.width = "auto";
        }
    }

    function closeWizard() {
        localStorage.setItem("cw_onboarding_seen_v1", "true");
        overlay.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => overlay.remove(), 400);
        SoundManager.playSuccess();
        showToast("Tudo pronto! Use o menu flutuante.");
    }

    // --- LISTENERS ---
    btnNext.onclick = () => {
        SoundManager.playClick();
        if (currentSlide < SLIDES.length - 1) {
            currentSlide++;
            renderSlide(currentSlide);
        } else {
            closeWizard();
        }
    };

    btnSkip.onclick = () => {
        if(confirm("Pular o tutorial?")) closeWizard();
    };

    // Iniciar Animação de Entrada
    renderSlide(0);
    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        card.style.transform = "translateY(0)";
    });
}