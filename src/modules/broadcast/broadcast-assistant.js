// src/modules/broadcast/broadcast-assistant.js

import {
    stylePopup,
    styleResizeHandle,
    makeResizable,
    showToast
} from "../shared/utils.js";
import { SoundManager } from "../shared/sound-manager.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { BROADCAST_MESSAGES, EMOJI_MAP } from "./broadcast-data.js";

export function initBroadcastAssistant() {
    const CURRENT_VERSION = "v1.0";
    let visible = false;

    // --- ESTILOS LOCAIS ---
    const styles = {
        feedContainer: {
            padding: "16px",
            overflowY: "auto",
            flexGrow: "1",
            background: "#f8f9fa",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
        },
        card: {
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #dadce0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            overflow: "hidden",
            transition: "all 0.2s ease",
            position: "relative"
        },
        // Faixa lateral colorida baseada no tipo
        cardCritical: { borderLeft: "4px solid #d93025" }, // Vermelho
        cardInfo: { borderLeft: "4px solid #1a73e8" },     // Azul
        cardSuccess: { borderLeft: "4px solid #1e8e3e" },  // Verde

        cardHeader: {
            padding: "12px 16px 8px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f1f3f4"
        },
        authorName: { fontSize: "12px", fontWeight: "700", color: "#202124" },
        date: { fontSize: "11px", color: "#5f6368" },
        
        cardBody: {
            padding: "16px",
            fontSize: "14px",
            color: "#3c4043",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap" // IMPORTANTE: Respeita os enters do texto original
        },
        
        // Estilo para o GIF dentro do texto
        emojiImg: "height: 24px; vertical-align: middle; margin: 0 2px;",
        
        readButton: {
            width: "100%",
            padding: "10px",
            background: "#f8f9fa",
            border: "none",
            borderTop: "1px solid #eee",
            color: "#1a73e8",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.2s"
        },
        newBadge: {
            background: "#d93025",
            color: "#fff",
            fontSize: "10px",
            padding: "2px 6px",
            borderRadius: "4px",
            fontWeight: "bold",
            marginLeft: "8px"
        }
    };

    // --- PARSER DE TEXTO (A Mágica) ---
    function parseMessageText(rawText) {
        let html = rawText;

        // 1. Substitui Emojis (:shortcode: -> <img>)
        Object.keys(EMOJI_MAP).forEach(shortcode => {
            const url = EMOJI_MAP[shortcode];
            // Se for URL de imagem/gif
            if (url.startsWith('http')) {
                const imgTag = `<img src="${url}" style="${styles.emojiImg}" alt="${shortcode}">`;
                // Replace All global
                html = html.split(shortcode).join(imgTag);
            } else {
                // Se for emoji nativo (ex: 🏠)
                html = html.split(shortcode).join(url);
            }
        });

        // 2. Mentions (@todos -> highlight)
        html = html.replace(/@todos|@all/gi, '<span style="background:#e8f0fe; color:#1967d2; padding:0 4px; border-radius:4px; font-weight:500;">@todos</span>');

        return html;
    }

    // --- UI ---
    const popup = document.createElement("div");
    popup.id = "broadcast-popup";
    Object.assign(popup.style, stylePopup, {
        right: "100px", // Posição
        width: "400px",
        height: "600px",
        display: "flex", 
        flexDirection: "column",
        opacity: "0",
        pointerEvents: "none"
    });

    const animRefs = { popup, googleLine: null };

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-broadcast');
        
        if (visible) {
            // Ao abrir, remove o badge de "Não lido" do botão principal (lógica externa)
            const btn = document.getElementById('cw-btn-broadcast');
            if(btn) btn.classList.remove('has-new');
        }
    }

    // Header
    const header = createStandardHeader(
        popup,
        "Avisos da Operação",
        CURRENT_VERSION,
        "Fique por dentro das novidades e alertas.",
        animRefs,
        () => toggleVisibility()
    );
    popup.appendChild(header);

    // Feed
    const feed = document.createElement("div");
    Object.assign(feed.style, styles.feedContainer);
    popup.appendChild(feed);

    // Renderiza Cards
    // Pega os lidos do LocalStorage
    const readMessages = JSON.parse(localStorage.getItem('cw_read_broadcasts') || '[]');

    BROADCAST_MESSAGES.forEach(msg => {
        const isRead = readMessages.includes(msg.id);
        
        const card = document.createElement("div");
        Object.assign(card.style, styles.card);
        
        // Cor da borda
        if(msg.type === 'critical') Object.assign(card.style, styles.cardCritical);
        if(msg.type === 'info') Object.assign(card.style, styles.cardInfo);
        if(msg.type === 'success') Object.assign(card.style, styles.cardSuccess);

        // Header do Card
        const cardHead = document.createElement("div");
        Object.assign(cardHead.style, styles.cardHeader);
        
        const leftSide = document.createElement("div");
        leftSide.innerHTML = `<span style="${stringifyStyle(styles.authorName)}">${msg.author}</span>`;
        if (!isRead) {
            leftSide.innerHTML += `<span style="${stringifyStyle(styles.newBadge)}">NOVO</span>`;
        }
        
        const rightSide = document.createElement("div");
        Object.assign(rightSide.style, styles.date);
        rightSide.textContent = msg.date;

        cardHead.appendChild(leftSide);
        cardHead.appendChild(rightSide);
        card.appendChild(cardHead);

        // Título (Opcional)
        if (msg.title) {
            const titleDiv = document.createElement("div");
            titleDiv.style.padding = "12px 16px 0 16px";
            titleDiv.style.fontWeight = "700";
            titleDiv.style.color = "#202124";
            titleDiv.textContent = msg.title;
            card.appendChild(titleDiv);
        }

        // Corpo
        const body = document.createElement("div");
        Object.assign(body.style, styles.cardBody);
        body.innerHTML = parseMessageText(msg.text); // <--- AQUI A MÁGICA
        card.appendChild(body);

        // Botão de Ação (Marcar como lido)
        if (!isRead) {
            const btn = document.createElement("button");
            btn.textContent = "Marcar como lido";
            Object.assign(btn.style, styles.readButton);
            
            btn.onmouseenter = () => btn.style.background = "#e8f0fe";
            btn.onmouseleave = () => btn.style.background = "#f8f9fa";
            
            btn.onclick = () => {
                SoundManager.playClick();
                // Salva no storage
                readMessages.push(msg.id);
                localStorage.setItem('cw_read_broadcasts', JSON.stringify(readMessages));
                
                // Animação de saída do badge e botão
                btn.style.height = "0";
                btn.style.padding = "0";
                btn.style.opacity = "0";
                leftSide.querySelector('span:last-child').style.display = 'none'; // Esconde badge NOVO
                
                // Reduz opacidade do card
                card.style.opacity = "0.8";
            };
            card.appendChild(btn);
        } else {
            card.style.opacity = "0.7"; // Mensagens lidas ficam mais apagadas
        }

        feed.appendChild(card);
    });
    
    // Resize Handle
    const resizeHandle = document.createElement('div');
    Object.assign(resizeHandle.style, styleResizeHandle);
    resizeHandle.className = "no-drag";
    popup.appendChild(resizeHandle);
    makeResizable(popup, resizeHandle);

    document.body.appendChild(popup);

    // Helper para converter objeto de estilo em string (para innerHTML)
    function stringifyStyle(styleObj) {
        return Object.entries(styleObj).map(([k, v]) => 
            k.replace(/[A-Z]/g, m => "-" + m.toLowerCase()) + ":" + v
        ).join(";");
    }

    // Checa se tem novos para tocar som de notificação
    const hasUnread = BROADCAST_MESSAGES.some(m => !readMessages.includes(m.id));
    if (hasUnread) {
        // Dispara evento ou retorna info para o Command Center acender a luzinha
        // SoundManager.playNotification(); (Idealmente chamado apenas uma vez no load da pagina)
    }

    return { toggle: toggleVisibility, hasUnread };
}