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
import { BROADCAST_MESSAGES, EMOJI_MAP, setBroadcastMessages } from "./broadcast-data.js"; 
import { DataService } from "../shared/data-service.js";

export function initBroadcastAssistant() {
  const CURRENT_VERSION = "v2.4 (Live & Pop)";
  let visible = false;
  let pollInterval = null;

  // --- 1. CONFIGURAÇÕES ---
  const POLL_TIME_MS = 60 * 1000; // 1 minuto

  // --- 2. FORMATADOR DE DATA (Corrigido) ---
  function formatFriendlyDate(dateInput) {
      if (!dateInput) return "";
      
      try {
          const date = new Date(dateInput);
          
          // Se data inválida, retorna original
          if (isNaN(date.getTime())) return String(dateInput); 

          // Formata usando o Locale do navegador (pt-BR)
          // Isso converte automaticamente o "Z" (UTC) para o horário do Brasil
          return date.toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
          }).replace(',', ' às'); // "10/12/2025 às 13:12"
          
      } catch (e) {
          return String(dateInput);
      }
  }

  const TYPE_THEMES = {
      critical: { bg: "#FEF2F2", border: "#FECACA", text: "#991B1B", icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>` },
      info: { bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF", icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>` },
      success: { bg: "#F0FDF4", border: "#BBF7D0", text: "#166534", icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` }
  };

  const styles = {
      feedContainer: { padding: "24px", overflowY: "auto", flexGrow: "1", background: "#FAFAFA", display: "flex", flexDirection: "column", gap: "20px" },
      
      // CARD CORRIGIDO (flexShrink: 0 impede o corte)
      card: { 
          background: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.06)", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)", 
          overflow: "hidden", transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)", 
          position: "relative", width: "100%", boxSizing: "border-box",
          flexShrink: "0" // <--- A CORREÇÃO DO CORTE
      },
      
      cardHistory: { background: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "none", opacity: "0.8", filter: "grayscale(0.3)", marginBottom: "16px", flexShrink: "0" },
      
      cardHeader: { padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.04)", fontSize: "12px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" },
      msgTitle: { padding: "20px 20px 8px 20px", fontSize: "16px", fontWeight: "700", color: "#202124", letterSpacing: "-0.01em", lineHeight: "1.4" },
      metaContainer: { padding: "0 20px 12px 20px", display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#5f6368" },
      
      // Card Body com word-break melhorado
      cardBody: { padding: "0 20px 24px 20px", fontSize: "14px", color: "#3c4043", lineHeight: "1.6", whiteSpace: "pre-wrap", fontFamily: "'Google Sans', Roboto, sans-serif", wordBreak: "break-word", overflowWrap: "break-word" },
      
      emojiImg: "height: 20px; vertical-align: text-bottom; margin: 0 2px;",
      dismissBtn: { width: "28px", height: "28px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", background: "#fff", color: "#5f6368", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", marginLeft: "12px" },
      markAllBtn: { fontSize: "12px", color: "#1a73e8", cursor: "pointer", fontWeight: "600", background: "transparent", border: "none", padding: "8px", transition: "opacity 0.2s" },
      emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", color: "#bdc1c6", gap: "16px", textAlign: "center" },
      historyDivider: { display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0 20px 0", cursor: "pointer", color: "#1a73e8", fontSize: "13px", fontWeight: "500", gap: "8px", padding: "10px", borderRadius: "8px", transition: "background 0.2s" },
      historyContainer: { display: "none", flexDirection: "column", gap: "16px", paddingTop: "10px", borderTop: "1px dashed rgba(0,0,0,0.1)" }
  };

  const styleScrollId = "cw-scrollbar-style";
  if (!document.getElementById(styleScrollId)) {
      const s = document.createElement("style");
      s.id = styleScrollId;
      s.innerHTML = `.cw-nice-scroll::-webkit-scrollbar { width: 5px; } .cw-nice-scroll::-webkit-scrollbar-track { background: transparent; } .cw-nice-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }`;
      document.head.appendChild(s);
  }

 function parseMessageText(rawText) {
    // --- PROTEÇÃO NOVA ---
    // Se rawText não existir ou não for uma string, retorna vazio para não quebrar
    if (!rawText || typeof rawText !== 'string') {
        return ""; 
    }
    // ---------------------

    let html = rawText;
    Object.keys(EMOJI_MAP).forEach((shortcode) => {
      const url = EMOJI_MAP[shortcode];
      if (url.startsWith("http")) {
        // Dica: use replaceAll se puder, ou o split/join está ok também
        const imgTag = `<img src="${url}" style="${styles.emojiImg}" alt="${shortcode}">`;
        html = html.split(shortcode).join(imgTag);
      } else {
        html = html.split(shortcode).join(url);
      }
    });
    
    // O replace já é seguro em strings, mas o split/join acima era o ponto crítico
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

  // --- 3. LÓGICA DE DADOS, POLLING E SOM ---
  
  async function checkForUpdates() {
      // 1. Guarda o estado atual antes de buscar
      const currentIds = BROADCAST_MESSAGES.map(m => m.id);
      const readIds = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");

      // 2. Busca na Nuvem
      const data = await DataService.fetchData();
      
      if (data && data.broadcast) {
          // Detecta se chegou algo NOVO que não estava na lista anterior E não foi lido
          // (Isso evita tocar som ao abrir a ferramenta pela primeira vez no dia)
          if (currentIds.length > 0) { // Só toca se já tinha carregado antes (evita som no boot)
              const newMessages = data.broadcast.filter(m => !currentIds.includes(m.id));
              const unreadNew = newMessages.filter(m => !readIds.includes(m.id));
              
              if (unreadNew.length > 0) {
                  console.log("🔔 Novo aviso detectado! Tocando som.");
                  SoundManager.playNotification(); // <--- O POP!
              }
          }

          setBroadcastMessages(data.broadcast);
          updateBadge();
          if (visible) renderFeed(); 
      }
  }

  function updateBadge() {
      const btn = document.getElementById("cw-btn-broadcast");
      if (!btn) return;

      const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      const hasUnread = BROADCAST_MESSAGES.some(m => !readMessages.includes(m.id));

      if (hasUnread) {
          btn.classList.add("has-new");
          if (!btn.querySelector('.cw-badge')) {
              const badge = document.createElement('div');
              badge.className = 'cw-badge';
              Object.assign(badge.style, {
                  position: "absolute", top: "8px", right: "8px",
                  width: "8px", height: "8px", backgroundColor: "#d93025",
                  borderRadius: "50%", border: "1px solid #fff", zIndex: "10"
              });
              btn.appendChild(badge);
          }
      } else {
          btn.classList.remove("has-new");
          const badge = btn.querySelector('.cw-badge');
          if (badge) badge.remove();
      }
  }

  // --- INICIALIZAÇÃO ---
  const cachedData = DataService.getCachedBroadcasts();
  if (cachedData.length > 0) {
      setBroadcastMessages(cachedData);
      renderFeed();
  }

  checkForUpdates();

  if (!pollInterval) {
      pollInterval = setInterval(checkForUpdates, POLL_TIME_MS);
  }

  // --- RENDERIZAÇÃO ---
  function renderFeed() {
      feed.innerHTML = "";
      const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      
      const sortedMessages = [...BROADCAST_MESSAGES].sort((a, b) => {
          const aRead = readMessages.includes(a.id);
          const bRead = readMessages.includes(b.id);
          return aRead === bRead ? 0 : aRead ? 1 : -1;
      });

      if (sortedMessages.every(m => readMessages.includes(m.id))) {
           const empty = document.createElement("div");
           Object.assign(empty.style, styles.emptyState);
           empty.innerHTML = `
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Você está em dia!</div>
            <div style="font-size:12px;">Nenhum aviso pendente.</div>
           `;
           feed.appendChild(empty);
      }
      
      const unreadMsgs = sortedMessages.filter(m => !readMessages.includes(m.id));
      const readMsgs = sortedMessages.filter(m => readMessages.includes(m.id));

      unreadMsgs.forEach(msg => feed.appendChild(createCard(msg, false)));

      if (readMsgs.length > 0) {
          const divider = document.createElement("div");
          Object.assign(divider.style, styles.historyDivider);
          divider.innerHTML = `<span>Visualizar ${readMsgs.length} avisos anteriores</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
          
          const historyContainer = document.createElement("div");
          Object.assign(historyContainer.style, styles.historyContainer);
          readMsgs.forEach(msg => historyContainer.appendChild(createCard(msg, true)));

          let isHistoryOpen = false;
          divider.onclick = () => {
              SoundManager.playClick();
              isHistoryOpen = !isHistoryOpen;
              historyContainer.style.display = isHistoryOpen ? "flex" : "none";
              divider.querySelector('svg').style.transform = isHistoryOpen ? "rotate(180deg)" : "rotate(0deg)";
              divider.querySelector('span').textContent = isHistoryOpen ? "Ocultar histórico" : `Visualizar ${readMsgs.length} avisos anteriores`;
          };
          feed.appendChild(divider);
          feed.appendChild(historyContainer);
      }
  }

  function createCard(msg, isHistory) {
    const card = document.createElement("div");
    Object.assign(card.style, isHistory ? styles.cardHistory : styles.card);
    const theme = TYPE_THEMES[msg.type] || TYPE_THEMES.info;

    const cardHead = document.createElement("div");
    Object.assign(cardHead.style, styles.cardHeader, {
        background: theme.bg, color: theme.text, borderBottom: `1px solid ${theme.border}`
    });

    const typeLabel = document.createElement("div");
    Object.assign(typeLabel.style, { display: "flex", alignItems: "center", gap: "6px" });
    typeLabel.innerHTML = `${theme.icon} <span>${msg.type.toUpperCase()}</span>`;
    cardHead.appendChild(typeLabel);

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
            card.style.transform = "translateX(20px)";
            card.style.opacity = "0";
            setTimeout(() => {
                const currentRead = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
                currentRead.push(msg.id);
                localStorage.setItem("cw_read_broadcasts", JSON.stringify(currentRead));
                renderFeed(); 
                updateBadge(); 
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

    if (msg.title) {
      const titleDiv = document.createElement("div");
      Object.assign(titleDiv.style, styles.msgTitle);
      titleDiv.textContent = msg.title;
      card.appendChild(titleDiv);
    }
    
    if (!isHistory) {
        const metaDiv = document.createElement("div");
        Object.assign(metaDiv.style, styles.metaContainer);
        metaDiv.innerHTML = `<span style="font-weight:600">${msg.author}</span> • <span>${formatFriendlyDate(msg.date)}</span>`;
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