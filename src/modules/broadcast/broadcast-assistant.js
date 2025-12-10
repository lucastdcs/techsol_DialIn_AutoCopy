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
  const CURRENT_VERSION = "v2.0 (System Feed)";
  let visible = false;

  // --- CONFIGURAÇÃO VISUAL POR TIPO ---
  // Define cores e ícones para cada nível de alerta
  const TYPE_THEMES = {
      critical: {
          bg: "#FEF2F2", // Vermelho muito pálido
          border: "#FECACA",
          text: "#991B1B",
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
      },
      info: {
          bg: "#EFF6FF", // Azul muito pálido
          border: "#BFDBFE",
          text: "#1E40AF",
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
      },
      success: {
          bg: "#F0FDF4", // Verde muito pálido
          border: "#BBF7D0",
          text: "#166534",
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      }
  };

  // --- ESTILOS VISUAIS (Refinados) ---
  const styles = {
    feedContainer: {
      padding: "24px",
      overflowY: "auto",
      flexGrow: "1",
      background: "#FAFAFA", // Fundo mais limpo
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    // Card Base
    card: {
      background: "#FFFFFF",
      borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.06)", 
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)", 
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      position: "relative",
      width: "100%",
      boxSizing: "border-box",
    },
    // Estado Lido (Diminui contraste)
    cardRead: {
        opacity: "0.6",
        filter: "grayscale(100%)",
        boxShadow: "none",
        border: "1px solid rgba(0,0,0,0.04)",
        background: "#F9FAFB"
    },

    // Header do Card (Onde fica o Tipo, Data e Botão de Ação)
    cardHeader: {
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid rgba(0,0,0,0.04)",
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "0.5px",
      textTransform: "uppercase"
    },
    
    // Título da Mensagem
    msgTitle: {
      padding: "20px 20px 8px 20px",
      fontSize: "16px",
      fontWeight: "700",
      color: "#202124",
      letterSpacing: "-0.01em",
      lineHeight: "1.4"
    },

    // Autor e Data (Metadados)
    metaContainer: {
        padding: "0 20px 12px 20px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "12px",
        color: "#5f6368"
    },

    cardBody: {
      padding: "0 20px 24px 20px", 
      fontSize: "14px", 
      color: "#3c4043", // Cinza Google texto
      lineHeight: "1.6", 
      whiteSpace: "pre-wrap",
      fontFamily: "'Google Sans', Roboto, sans-serif",
      wordBreak: "break-word", 
    },

    emojiImg: "height: 20px; vertical-align: text-bottom; margin: 0 2px;",

    // Botão de "Check" (Dispensar)
    dismissBtn: {
        width: "28px", height: "28px",
        borderRadius: "50%",
        border: "1px solid rgba(0,0,0,0.1)",
        background: "#fff",
        color: "#5f6368",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s ease",
        marginLeft: "12px"
    },
    
    markAllBtn: {
        fontSize: "12px", color: "#1a73e8", cursor: "pointer", fontWeight: "600",
        background: "transparent", border: "none", padding: "8px",
        transition: "opacity 0.2s"
    },

    // Empty State
    emptyState: {
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        height: "100%", color: "#bdc1c6", gap: "16px", marginTop: "60px",
        textAlign: "center"
    }
  };

  // --- HELPER: Scrollbar ---
  const styleScrollId = "cw-scrollbar-style";
  if (!document.getElementById(styleScrollId)) {
      const s = document.createElement("style");
      s.id = styleScrollId;
      s.innerHTML = `
        .cw-nice-scroll::-webkit-scrollbar { width: 5px; }
        .cw-nice-scroll::-webkit-scrollbar-track { background: transparent; }
        .cw-nice-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }
      `;
      document.head.appendChild(s);
  }

  // --- PARSER ---
  function parseMessageText(rawText) {
    let html = rawText;
    Object.keys(EMOJI_MAP).forEach((shortcode) => {
      const url = EMOJI_MAP[shortcode];
      if (url.startsWith("http")) {
        const imgTag = `<img src="${url}" style="${styles.emojiImg}" alt="${shortcode}">`;
        html = html.split(shortcode).join(imgTag);
      } else {
        html = html.split(shortcode).join(url);
      }
    });
    html = html.replace(/@todos|@all/gi, '<span style="background:#e8f0fe; color:#1967d2; padding:1px 5px; border-radius:4px; font-weight:600; font-size:12px;">@todos</span>');
    return html;
  }

  // --- UI ---
  const popup = document.createElement("div");
  popup.id = "broadcast-popup";
  Object.assign(popup.style, stylePopup, {
    right: "auto",
    left: "50%", 
    width: "450px", 
    height: "650px", 
    display: "flex", flexDirection: "column",
    opacity: "0", pointerEvents: "none",
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
    "Operations Feed", // Nome mais técnico
    CURRENT_VERSION,
    "Atualizações oficiais da operação.",
    animRefs,
    () => toggleVisibility()
  );
  
  // Ação "Mark All" no Header
  const actionContainer = header.querySelector('.cw-header-actions') || header.lastElementChild;
  if(actionContainer) {
      const markAll = document.createElement("button");
      markAll.textContent = "Limpar tudo";
      Object.assign(markAll.style, styles.markAllBtn);
      markAll.onmouseenter = () => markAll.style.opacity = "0.7";
      markAll.onmouseleave = () => markAll.style.opacity = "1";
      markAll.onclick = (e) => {
          e.stopPropagation();
          SoundManager.playSuccess();
          const allIds = BROADCAST_MESSAGES.map(m => m.id);
          localStorage.setItem("cw_read_broadcasts", JSON.stringify(allIds));
          renderFeed(); 
      };
      actionContainer.insertBefore(markAll, actionContainer.firstChild);
  }

  popup.appendChild(header);

  // Feed
  const feed = document.createElement("div");
  feed.className = "cw-nice-scroll";
  Object.assign(feed.style, styles.feedContainer);
  popup.appendChild(feed);

  function renderFeed() {
      feed.innerHTML = "";
      const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      
      const sortedMessages = [...BROADCAST_MESSAGES].sort((a, b) => {
          const aRead = readMessages.includes(a.id);
          const bRead = readMessages.includes(b.id);
          return aRead === bRead ? 0 : aRead ? 1 : -1;
      });

      // Se todas lidas, mostra empty state
      if (sortedMessages.every(m => readMessages.includes(m.id))) {
           const empty = document.createElement("div");
           Object.assign(empty.style, styles.emptyState);
           // Ícone SVG de "Tudo Limpo" (Check Shield)
           empty.innerHTML = `
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Você está em dia!</div>
            <div style="font-size:12px;">Nenhum aviso pendente.</div>
           `;
           feed.appendChild(empty);
           return;
      }
      
      sortedMessages.forEach((msg) => {
        const isRead = readMessages.includes(msg.id);
        
        // Se já leu, não mostra no feed principal (ou mostra no final, aqui optamos por esconder para limpar a visão)
        if (isRead) return; 

        const card = document.createElement("div");
        Object.assign(card.style, styles.card);
        
        // Tema (Cores e Ícone)
        const theme = TYPE_THEMES[msg.type] || TYPE_THEMES.info;

        // --- 1. HEADER DO CARD (TINTED) ---
        const cardHead = document.createElement("div");
        Object.assign(cardHead.style, styles.cardHeader, {
            background: theme.bg,
            color: theme.text,
            borderBottom: `1px solid ${theme.border}`
        });

        const typeLabel = document.createElement("div");
        Object.assign(typeLabel.style, { display: "flex", alignItems: "center", gap: "6px" });
        typeLabel.innerHTML = `${theme.icon} <span>${msg.type.toUpperCase()}</span>`;
        
        // Botão Check (Dismiss)
        const dismissBtn = document.createElement("button");
        dismissBtn.title = "Marcar como lido";
        Object.assign(dismissBtn.style, styles.dismissBtn);
        dismissBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        
        // Hover do Check
        dismissBtn.onmouseenter = () => { dismissBtn.style.color = "#1e8e3e"; dismissBtn.style.background = "#e6f4ea"; dismissBtn.style.borderColor = "#1e8e3e"; };
        dismissBtn.onmouseleave = () => { dismissBtn.style.color = "#5f6368"; dismissBtn.style.background = "#fff"; dismissBtn.style.borderColor = "rgba(0,0,0,0.1)"; };
        
        // Ação de Dispensar
        dismissBtn.onclick = (e) => {
            e.stopPropagation(); // Evita cliques indesejados
            SoundManager.playClick();
            
            // Animação de Saída (Slide Out Right)
            card.style.transform = "translateX(20px)";
            card.style.opacity = "0";
            
            setTimeout(() => {
                readMessages.push(msg.id);
                localStorage.setItem("cw_read_broadcasts", JSON.stringify(readMessages));
                renderFeed(); // Re-renderiza para atualizar a lista
            }, 250);
        };

        cardHead.appendChild(typeLabel);
        cardHead.appendChild(dismissBtn);
        card.appendChild(cardHead);

        // --- 2. CONTEÚDO ---
        // Título
        if (msg.title) {
          const titleDiv = document.createElement("div");
          Object.assign(titleDiv.style, styles.msgTitle);
          titleDiv.textContent = msg.title;
          card.appendChild(titleDiv);
        }
        
        // Metadados (Autor e Data)
        const metaDiv = document.createElement("div");
        Object.assign(metaDiv.style, styles.metaContainer);
        metaDiv.innerHTML = `<span style="font-weight:600">${msg.author}</span> • <span>${msg.date}</span>`;
        card.appendChild(metaDiv);

        // Corpo
        const body = document.createElement("div");
        Object.assign(body.style, styles.cardBody);
        body.innerHTML = parseMessageText(msg.text);
        card.appendChild(body);

        feed.appendChild(card);
      });
  }

  renderFeed();

  // Resize Handle
  const resizeHandle = document.createElement("div");
  Object.assign(resizeHandle.style, styleResizeHandle);
  resizeHandle.className = "no-drag";
  popup.appendChild(resizeHandle);
  makeResizable(popup, resizeHandle);

  document.body.appendChild(popup);

  const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
  const hasUnread = BROADCAST_MESSAGES.some((m) => !readMessages.includes(m.id));

  return { toggle: toggleVisibility, hasUnread };
}