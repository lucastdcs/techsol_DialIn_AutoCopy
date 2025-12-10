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
import { BROADCAST_MESSAGES, EMOJI_MAP, setBroadcastMessages } from "./broadcast-data.js"; // Adicione setBroadcastMessages
import { DataService } from "../shared/data-service.js"; // <--- NOVO

export function initBroadcastAssistant() {
 const CURRENT_VERSION = "v2.3 (Live)";
  let visible = false;
  let pollInterval = null;

  // --- 1. CONFIGURAÇÕES ---
const POLL_TIME_MS = 60 * 1000;

  // --- 2. FORMATADOR DE DATA (A Correção Visual) ---
  function formatFriendlyDate(isoString) {
      if (!isoString) return "";
      try {
          const date = new Date(isoString);
          // Verifica se a data é válida
          if (isNaN(date.getTime())) return isoString; 

          // Formata para o padrão brasileiro: DD/MM/AAAA às HH:MM
          return new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
          }).format(date).replace(',', ' às');
      } catch (e) {
          return isoString; // Fallback se der erro
      }
  }

  const TYPE_THEMES = {
      critical: {
          bg: "#FEF2F2", border: "#FECACA", text: "#991B1B",
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
      },
      info: {
          bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF",
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
      },
      success: {
          bg: "#F0FDF4", border: "#BBF7D0", text: "#166534",
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      }
  };

  const styles = {
    feedContainer: {
      padding: "24px",
      overflowY: "auto",
      flexGrow: "1",
      background: "#FAFAFA",
      display: "flex", flexDirection: "column", gap: "20px",
    },
    // CARD ATIVO (Novo) - Flutuante e Brilhante
    card: {
      background: "#FFFFFF",
      borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.06)", 
      boxShadow: "0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)", 
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      position: "relative", width: "100%", boxSizing: "border-box",
    },
    // CARD ARQUIVADO (Histórico) - Plano e Discreto
    cardHistory: {
      background: "#FFFFFF",
      borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.04)", 
      boxShadow: "none", // Sem sombra (plano)
      opacity: "0.8",    // Levemente transparente
      filter: "grayscale(0.3)", // Levemente desaturado
      marginBottom: "16px"
    },
    
    cardHeader: {
      padding: "12px 20px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      borderBottom: "1px solid rgba(0,0,0,0.04)",
      fontSize: "12px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase"
    },
    msgTitle: {
      padding: "20px 20px 8px 20px",
      fontSize: "16px", fontWeight: "700", color: "#202124", letterSpacing: "-0.01em", lineHeight: "1.4"
    },
    metaContainer: {
        padding: "0 20px 12px 20px",
        display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#5f6368"
    },
    cardBody: {
      padding: "0 20px 24px 20px", 
      fontSize: "14px", color: "#3c4043", lineHeight: "1.6", 
      whiteSpace: "pre-wrap", fontFamily: "'Google Sans', Roboto, sans-serif", wordBreak: "break-word", 
    },
    emojiImg: "height: 20px; vertical-align: text-bottom; margin: 0 2px;",

    // Botões e Ações
    dismissBtn: {
        width: "28px", height: "28px", borderRadius: "50%",
        border: "1px solid rgba(0,0,0,0.1)", background: "#fff", color: "#5f6368",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s ease", marginLeft: "12px"
    },
    markAllBtn: {
        fontSize: "12px", color: "#1a73e8", cursor: "pointer", fontWeight: "600",
        background: "transparent", border: "none", padding: "8px", transition: "opacity 0.2s"
    },

    // Empty State (Inbox Zero)
    emptyState: {
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "40px 0", color: "#bdc1c6", gap: "16px", textAlign: "center"
    },
    
    // ÁREA DE HISTÓRICO
    historyDivider: {
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "10px 0 20px 0", cursor: "pointer", color: "#1a73e8",
        fontSize: "13px", fontWeight: "500", gap: "8px",
        padding: "10px", borderRadius: "8px", transition: "background 0.2s"
    },
    historyContainer: {
        display: "none", // Começa fechado
        flexDirection: "column",
        gap: "16px",
        paddingTop: "10px",
        borderTop: "1px dashed rgba(0,0,0,0.1)"
    }
  };

  // --- Scrollbar ---
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

  // --- UI SETUP ---
  const popup = document.createElement("div");
  popup.id = "broadcast-popup";
  Object.assign(popup.style, stylePopup, {
    right: "auto", left: "50%", width: "450px", height: "650px", 
    display: "flex", flexDirection: "column", opacity: "0", pointerEvents: "none",
  });
  const animRefs = { popup, googleLine: null };

 function toggleVisibility() {
    visible = !visible;
    toggleGenieAnimation(visible, popup, "cw-btn-broadcast");
    
    if (visible) {
      const btn = document.getElementById("cw-btn-broadcast");
      if (btn) btn.classList.remove("has-new");
      
      checkForUpdates(); 
    }
  }

  const header = createStandardHeader(
    popup, "Operations Feed", CURRENT_VERSION, "Atualizações oficiais da operação.",
    animRefs, () => toggleVisibility()
  );
  
  // Limpar Tudo
  const actionContainer = header.querySelector('.cw-header-actions') || header.lastElementChild;
  if(actionContainer) {
      const markAll = document.createElement("button");
      markAll.textContent = "Limpar tudo";
      Object.assign(markAll.style, styles.markAllBtn);
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

  const feed = document.createElement("div");
  feed.className = "cw-nice-scroll";
  Object.assign(feed.style, styles.feedContainer);
  popup.appendChild(feed);

  // --- 3. LÓGICA DE DADOS E POLLING (O Cérebro) ---
  
  // Função para buscar novidades silenciosamente
  async function checkForUpdates() {
      // console.log("📡 Buscando novos avisos...");
      const data = await DataService.fetchData();
      if (data && data.broadcast) {
          setBroadcastMessages(data.broadcast);
          updateBadge(); // Atualiza a bolinha vermelha
          if (visible) renderFeed(); // Se a janela estiver aberta, atualiza a lista na cara do usuário
      }
  }

  // Atualiza o Badge no Command Center
  function updateBadge() {
      const btn = document.getElementById("cw-btn-broadcast");
      if (!btn) return;

      const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      const hasUnread = BROADCAST_MESSAGES.some(m => !readMessages.includes(m.id));

      if (hasUnread) {
          btn.classList.add("has-new");
          if (!btn.querySelector('.cw-badge')) {
              // Cria badge se não existir (Replicando estilo do command-center)
              const badge = document.createElement('div');
              badge.className = 'cw-badge'; // Classe CSS já definida globalmente
              // Se não tiver classe global, injete o estilo inline aqui
              Object.assign(badge.style, {
                  position: "absolute", top: "8px", right: "8px",
                  width: "8px", height: "8px", backgroundColor: "#d93025",
                  borderRadius: "50%", border: "1px solid #fff", zIndex: "10"
              });
              btn.appendChild(badge);
              // Opcional: Tocar som suave de notificação se quiser
              // SoundManager.playNotification();
          }
      } else {
          btn.classList.remove("has-new");
          const badge = btn.querySelector('.cw-badge');
          if (badge) badge.remove();
      }
  }

  // --- INICIALIZAÇÃO HÍBRIDA ---
  // 1. Mostra Cache Imediato
  const cachedData = DataService.getCachedBroadcasts();
  if (cachedData.length > 0) {
      setBroadcastMessages(cachedData);
      renderFeed();
  }

  // 2. Busca Nuvem Imediato
  checkForUpdates();

  // 3. Inicia o Loop Infinito (Polling)
  if (!pollInterval) {
      pollInterval = setInterval(checkForUpdates, POLL_TIME_MS);
  }
  // --- RENDERIZAÇÃO INTELIGENTE (Split Unread/Read) ---
  function renderFeed() {
      feed.innerHTML = "";
      const readIds = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      
      // Separa os Arrays
      const unreadMsgs = BROADCAST_MESSAGES.filter(m => !readIds.includes(m.id));
      const readMsgs = BROADCAST_MESSAGES.filter(m => readIds.includes(m.id));

      // 1. Renderiza NÃO LIDOS (Destaque)
      if (unreadMsgs.length > 0) {
          unreadMsgs.forEach(msg => {
              feed.appendChild(createCard(msg, false));
          });
      } else {
          // Estado Inbox Zero
          const empty = document.createElement("div");
          Object.assign(empty.style, styles.emptyState);
          empty.innerHTML = `
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Você está em dia!</div>
            <div style="font-size:12px;">Nenhum aviso pendente.</div>
           `;
           feed.appendChild(empty);
      }

      // 2. Renderiza HISTÓRICO (Se houver)
      if (readMsgs.length > 0) {
          // Divisor / Botão
          const divider = document.createElement("div");
          Object.assign(divider.style, styles.historyDivider);
          divider.innerHTML = `
            <span>Visualizar ${readMsgs.length} avisos anteriores</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s"><polyline points="6 9 12 15 18 9"></polyline></svg>
          `;
          
          const historyContainer = document.createElement("div");
          Object.assign(historyContainer.style, styles.historyContainer);

          // Popula o container oculto
          readMsgs.forEach(msg => {
              historyContainer.appendChild(createCard(msg, true));
          });

          // Lógica de Toggle
          let isHistoryOpen = false;
          divider.onclick = () => {
              SoundManager.playClick();
              isHistoryOpen = !isHistoryOpen;
              
              if (isHistoryOpen) {
                  historyContainer.style.display = "flex";
                  // Animação simples de entrada
                  historyContainer.style.opacity = "0";
                  historyContainer.style.transform = "translateY(-10px)";
                  requestAnimationFrame(() => {
                      historyContainer.style.transition = "all 0.3s ease";
                      historyContainer.style.opacity = "1";
                      historyContainer.style.transform = "translateY(0)";
                  });
                  // Gira a seta
                  divider.querySelector('svg').style.transform = "rotate(180deg)";
                  divider.querySelector('span').textContent = "Ocultar histórico";
              } else {
                  historyContainer.style.display = "none";
                  divider.querySelector('svg').style.transform = "rotate(0deg)";
                  divider.querySelector('span').textContent = `Visualizar ${readMsgs.length} avisos anteriores`;
              }
          };

          // Hover effect no divider
          divider.onmouseenter = () => divider.style.background = "rgba(0,0,0,0.03)";
          divider.onmouseleave = () => divider.style.background = "transparent";

          feed.appendChild(divider);
          feed.appendChild(historyContainer);
      }
  }

  // --- FACTORY DE CARD ---
  function createCard(msg, isHistory) {
    const card = document.createElement("div");
    // Escolhe o estilo base (Ativo vs Histórico)
    Object.assign(card.style, isHistory ? styles.cardHistory : styles.card);
    
    // Tema
    const theme = TYPE_THEMES[msg.type] || TYPE_THEMES.info;

    // Header Colorido
    const cardHead = document.createElement("div");
    Object.assign(cardHead.style, styles.cardHeader, {
        background: theme.bg, color: theme.text,
        borderBottom: `1px solid ${theme.border}`
    });

    const typeLabel = document.createElement("div");
    Object.assign(typeLabel.style, { display: "flex", alignItems: "center", gap: "6px" });
    typeLabel.innerHTML = `${theme.icon} <span>${msg.type.toUpperCase()}</span>`;
    
    cardHead.appendChild(typeLabel);

    // Botão de Dispensar (Só aparece se NÃO for histórico)
    if (!isHistory) {
        const dismissBtn = document.createElement("button");
        dismissBtn.title = "Marcar como lido";
        Object.assign(dismissBtn.style, styles.dismissBtn);
        dismissBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        
        dismissBtn.onmouseenter = () => { dismissBtn.style.color = "#1e8e3e"; dismissBtn.style.background = "#e6f4ea"; dismissBtn.style.borderColor = "#1e8e3e"; };
        dismissBtn.onmouseleave = () => { dismissBtn.style.color = "#5f6368"; dismissBtn.style.background = "#fff"; dismissBtn.style.borderColor = "rgba(0,0,0,0.1)"; };
        
        dismissBtn.onclick = (e) => {
            e.stopPropagation();
            SoundManager.playClick();
            // Animação de Saída
            card.style.transform = "translateX(20px)";
            card.style.opacity = "0";
            setTimeout(() => {
                const currentRead = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
                currentRead.push(msg.id);
                localStorage.setItem("cw_read_broadcasts", JSON.stringify(currentRead));
                renderFeed(); 
                updateBadge(); // Atualiza o sino
            }, 250);
        };
        cardHead.appendChild(dismissBtn);
    } else {

        const dateHist = document.createElement("span");
        dateHist.textContent = formatFriendlyDate(msg.date);
        dateHist.style.opacity = "0.7";
        cardHead.appendChild(dateHist);
    }

    card.appendChild(cardHead);

    // Conteúdo
    if (msg.title) {
      const titleDiv = document.createElement("div");
      Object.assign(titleDiv.style, styles.msgTitle);
      titleDiv.textContent = msg.title;
      card.appendChild(titleDiv);
    }
    
    // Meta (Só mostra autor e data se for novo, no histórico simplificamos para reduzir ruído)
    if (!isHistory) {
        const metaDiv = document.createElement("div");
        Object.assign(metaDiv.style, styles.metaContainer);
        metaDiv.innerHTML = `<span style="font-weight:600">${msg.author}</span> • <span>${msg.date}</span>`;
        card.appendChild(metaDiv);
    }

    const body = document.createElement("div");
    Object.assign(body.style, styles.cardBody);
    body.innerHTML = parseMessageText(msg.text);
    card.appendChild(body);

    return card;
  }

  renderFeed();

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