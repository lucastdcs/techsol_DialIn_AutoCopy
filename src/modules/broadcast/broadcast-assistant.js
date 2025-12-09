// src/modules/broadcast/broadcast-assistant.js

import {
  stylePopup,
  styleResizeHandle,
  makeResizable,
  showToast,
} from "../shared/utils.js";
import { SoundManager } from "../shared/sound-manager.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { BROADCAST_MESSAGES, EMOJI_MAP } from "./broadcast-data.js";

export function initBroadcastAssistant() {
  const CURRENT_VERSION = "v1.1 (Feed)";
  let visible = false;

  // --- ESTILOS VISUAIS (Refinados) ---
  const styles = {
    feedContainer: {
      padding: "20px",
      overflowY: "auto",
      flexGrow: "1",
      background: "#F2F2F7", // Cinza Apple System (Dark Mode friendly base)
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      // Scrollbar Customizada será injetada via CSS class
    },
    // Estado Vazio (Zero Inbox)
    emptyState: {
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        height: "100%", color: "#86868b", gap: "12px", marginTop: "40px"
    },
    card: {
      background: "#FFFFFF",
      borderRadius: "20px", // Mais arredondado (iOS 16 style)
      border: "1px solid rgba(0,0,0,0.02)", // Micro borda para definição
      boxShadow: "0 4px 12px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)", 
      overflow: "hidden",
      transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease, opacity 0.3s ease",
      position: "relative",
      width: "100%",
      boxSizing: "border-box",
    },
    
    // Faixas laterais (Indicadores de tipo)
    cardCritical: { borderLeft: "5px solid #FF3B30" }, 
    cardInfo: { borderLeft: "5px solid #007AFF" }, 
    cardSuccess: { borderLeft: "5px solid #34C759" }, 

    cardHeader: {
      padding: "18px 20px 8px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    authorName: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#1D1D1F",
      letterSpacing: "-0.01em",
    },
    date: {
      fontSize: "11px",
      color: "#86868b",
      fontWeight: "500",
      background: "#f5f5f7",
      padding: "2px 8px",
      borderRadius: "10px"
    },

    cardBody: {
      padding: "8px 20px 24px 20px", 
      fontSize: "15px", 
      color: "#1D1D1F",
      lineHeight: "1.6", 
      whiteSpace: "pre-wrap",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Google Sans', Roboto, Helvetica, Arial, sans-serif",
      wordBreak: "break-word", 
    },

    emojiImg: "height: 24px; vertical-align: bottom; margin: 0 1px;",

    // Botão de Ação Integrado
    readButton: {
      width: "100%",
      padding: "14px",
      background: "#FAFAFA", 
      border: "none",
      borderTop: "1px solid #F0F0F0",
      color: "#007AFF", 
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)", // Transição suave
      outline: "none",
      // Propriedades para animação de colapso
      maxHeight: "50px", 
      opacity: "1",
      overflow: "hidden"
    },

    newBadge: {
      background: "#007AFF", 
      color: "#fff",
      fontSize: "10px",
      padding: "3px 8px",
      borderRadius: "12px",
      fontWeight: "700",
      marginLeft: "8px",
      boxShadow: "0 2px 4px rgba(0,122,255,0.2)",
      display: "inline-block",
      verticalAlign: "middle"
    },

    msgTitle: {
      padding: "0 20px",
      marginTop: "4px",
      fontSize: "17px", // Título maior
      fontWeight: "700",
      color: "#1D1D1F",
      letterSpacing: "-0.02em",
    },
    
    markAllBtn: {
        fontSize: "12px", color: "#007AFF", cursor: "pointer", fontWeight: "600",
        background: "transparent", border: "none", padding: "8px"
    }
  };

  // --- HELPER: Scrollbar CSS ---
  // Injetamos um estilo específico para a scrollbar ficar bonita
  const styleScrollId = "cw-scrollbar-style";
  if (!document.getElementById(styleScrollId)) {
      const s = document.createElement("style");
      s.id = styleScrollId;
      s.innerHTML = `
        .cw-nice-scroll::-webkit-scrollbar { width: 6px; }
        .cw-nice-scroll::-webkit-scrollbar-track { background: transparent; }
        .cw-nice-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }
        .cw-nice-scroll::-webkit-scrollbar-thumb:hover { background-color: rgba(0,0,0,0.2); }
      `;
      document.head.appendChild(s);
  }

  // --- PARSER DE TEXTO ---
  function parseMessageText(rawText) {
    let html = rawText;
    // Emojis
    Object.keys(EMOJI_MAP).forEach((shortcode) => {
      const url = EMOJI_MAP[shortcode];
      if (url.startsWith("http")) {
        const imgTag = `<img src="${url}" style="${styles.emojiImg}" alt="${shortcode}">`;
        html = html.split(shortcode).join(imgTag);
      } else {
        html = html.split(shortcode).join(url);
      }
    });
    // Mentions
    html = html.replace(/@todos|@all/gi, '<span style="background:#e8f0fe; color:#1967d2; padding:2px 6px; border-radius:6px; font-weight:600; font-size:13px;">@todos</span>');
    return html;
  }

  // --- UI ---
  const popup = document.createElement("div");
  popup.id = "broadcast-popup";
  Object.assign(popup.style, stylePopup, {
    right: "auto",
    left: "50%", 
    width: "480px", // Largura generosa
    height: "700px", 
    display: "flex",
    flexDirection: "column",
    opacity: "0",
    pointerEvents: "none",
  });
  const animRefs = { popup, googleLine: null };

  function toggleVisibility() {
    visible = !visible;
    toggleGenieAnimation(visible, popup, "cw-btn-broadcast");
    if (visible) {
      const btn = document.getElementById("cw-btn-broadcast");
      if (btn) btn.classList.remove("has-new");
    }
  }

  // Header
  const header = createStandardHeader(
    popup,
    "Avisos",
    CURRENT_VERSION,
    "Central de Notificações.",
    animRefs,
    () => toggleVisibility()
  );
  
  // Botão "Marcar todos como lido" no header (Action Container)
  const actionContainer = header.querySelector('.cw-header-actions') || header.lastElementChild;
  if(actionContainer) {
      const markAll = document.createElement("button");
      markAll.textContent = "Limpar tudo";
      Object.assign(markAll.style, styles.markAllBtn);
      markAll.onclick = (e) => {
          e.stopPropagation();
          SoundManager.playSuccess();
          // Marca tudo
          const allIds = BROADCAST_MESSAGES.map(m => m.id);
          localStorage.setItem("cw_read_broadcasts", JSON.stringify(allIds));
          renderFeed(); // Re-renderiza
      };
      // Insere antes do fechar
      actionContainer.insertBefore(markAll, actionContainer.firstChild);
  }

  popup.appendChild(header);

  // Feed Container
  const feed = document.createElement("div");
  feed.className = "cw-nice-scroll"; // Usa nossa classe de scrollbar
  Object.assign(feed.style, styles.feedContainer);
  popup.appendChild(feed);

  // Função de Renderização (Para permitir refresh)
  function renderFeed() {
      feed.innerHTML = "";
      const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      
      // Ordenação: Não lidos primeiro
      const sortedMessages = [...BROADCAST_MESSAGES].sort((a, b) => {
          const aRead = readMessages.includes(a.id);
          const bRead = readMessages.includes(b.id);
          return aRead === bRead ? 0 : aRead ? 1 : -1;
      });

      // Contador de visíveis (para Empty State)
      // Se quiser esconder os lidos totalmente, filtre aqui. 
      // Por enquanto mostraremos lidos com opacidade baixa.
      
      sortedMessages.forEach((msg) => {
        const isRead = readMessages.includes(msg.id);

        const card = document.createElement("div");
        Object.assign(card.style, styles.card);
        
        // Efeito Hover (Levitação Apple)
        card.onmouseenter = () => { if(!isRead) card.style.transform = "translateY(-2px)"; };
        card.onmouseleave = () => { card.style.transform = "translateY(0)"; };

        if (msg.type === "critical") Object.assign(card.style, styles.cardCritical);
        if (msg.type === "info") Object.assign(card.style, styles.cardInfo);
        if (msg.type === "success") Object.assign(card.style, styles.cardSuccess);

        // Header
        const cardHead = document.createElement("div");
        Object.assign(cardHead.style, styles.cardHeader);

        const leftSide = document.createElement("div");
        
        // Autor
        const authorSpan = document.createElement("span");
        Object.assign(authorSpan.style, styles.authorName);
        authorSpan.textContent = msg.author;
        leftSide.appendChild(authorSpan);

        // Badge NOVO
        if (!isRead) {
            const badge = document.createElement("span");
            Object.assign(badge.style, styles.newBadge);
            badge.textContent = "NOVO";
            leftSide.appendChild(badge);
        }

        const rightSide = document.createElement("div");
        Object.assign(rightSide.style, styles.date);
        rightSide.textContent = msg.date;

        cardHead.appendChild(leftSide);
        cardHead.appendChild(rightSide);
        card.appendChild(cardHead);

        // Título
        if (msg.title) {
          const titleDiv = document.createElement("div");
          Object.assign(titleDiv.style, styles.msgTitle);
          titleDiv.textContent = msg.title;
          card.appendChild(titleDiv);
        }

        // Corpo
        const body = document.createElement("div");
        Object.assign(body.style, styles.cardBody);
        body.innerHTML = parseMessageText(msg.text);
        card.appendChild(body);

        // Botão de Ação
        if (!isRead) {
          const btn = document.createElement("button");
          btn.textContent = "Marcar como lido";
          Object.assign(btn.style, styles.readButton);

          btn.onmouseenter = () => (btn.style.background = "#F5F5F7");
          btn.onmouseleave = () => (btn.style.background = "#FAFAFA");

          btn.onclick = () => {
            SoundManager.playClick();
            
            // Lógica de dados
            readMessages.push(msg.id);
            localStorage.setItem("cw_read_broadcasts", JSON.stringify(readMessages));

            // ANIMAÇÃO DE COLAPSO SUAVE
            btn.style.maxHeight = "0px";
            btn.style.padding = "0px";
            btn.style.opacity = "0";
            
            // Remove badge visualmente
            const badge = leftSide.querySelector("span:last-child");
            if(badge && badge.textContent === "NOVO") badge.style.display = "none";

            // Diminui destaque do card
            card.style.opacity = "0.6";
            card.style.transform = "translateY(0)"; // Remove hover effect
            card.onmouseenter = null; // Remove listener
          };
          card.appendChild(btn);
        } else {
          card.style.opacity = "0.6"; 
          card.style.filter = "grayscale(0.8)"; // Lidos ficam preto e branco
        }

        feed.appendChild(card);
      });

      // Empty State (Se não houver mensagens ou todas lidas e quiser esconder)
      // Aqui vamos mostrar um "Tudo limpo" se não houver NENHUMA mensagem no array
      if (BROADCAST_MESSAGES.length === 0) {
          const empty = document.createElement("div");
          Object.assign(empty.style, styles.emptyState);
          empty.innerHTML = `<div style="font-size:40px;">🎉</div><div>Nada por aqui!</div>`;
          feed.appendChild(empty);
      }
  }

  // Inicializa
  renderFeed();

  // Resize Handle
  const resizeHandle = document.createElement("div");
  Object.assign(resizeHandle.style, styleResizeHandle);
  resizeHandle.className = "no-drag";
  popup.appendChild(resizeHandle);
  makeResizable(popup, resizeHandle);

  document.body.appendChild(popup);

  // Status para o Command Center
  const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
  const hasUnread = BROADCAST_MESSAGES.some((m) => !readMessages.includes(m.id));

  return { toggle: toggleVisibility, hasUnread };
}