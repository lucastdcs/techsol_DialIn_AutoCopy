// src/modules/broadcast/broadcast-assistant.js

import {
  stylePopup,
  styleResizeHandle,
  makeResizable,
  showToast,
  parseEmojiCodes 
} from "../shared/utils.js";
import { SoundManager } from "../shared/sound-manager.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { BROADCAST_MESSAGES, setBroadcastMessages } from "./broadcast-data.js"; 
import { DataService } from "../shared/data-service.js";

export function initBroadcastAssistant() {
  const CURRENT_VERSION = "v2.8 (Dual Lang BAU)";
  let visible = false;
  let pollInterval = null;

  const POLL_TIME_MS = 60 * 1000; 

  function formatFriendlyDate(dateInput) {
      if (!dateInput) return "";
      try {
          const date = new Date(dateInput);
          if (isNaN(date.getTime())) return String(dateInput); 
          return date.toLocaleString('pt-BR', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
          }).replace(',', ' às'); 
      } catch (e) { return String(dateInput); }
  }

  // --- ESTILOS ---
  if (!document.getElementById('cw-pulse-anim')) {
      const s = document.createElement("style");
      s.id = 'cw-pulse-anim';
      s.innerHTML = `
        @keyframes cw-pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(147, 51, 234, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0); }
        }
      `;
      document.head.appendChild(s);
  }

  const TYPE_THEMES = {
      critical: { bg: "#FEF2F2", border: "#FECACA", text: "#991B1B", icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>` },
      info: { bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF", icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>` },
      success: { bg: "#F0FDF4", border: "#BBF7D0", text: "#166534", icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` }
  };

  const styles = {
      feedContainer: { padding: "24px", overflowY: "auto", flexGrow: "1", background: "#FAFAFA", display: "flex", flexDirection: "column", gap: "20px" },
      card: { background: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)", overflow: "hidden", transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)", position: "relative", width: "100%", boxSizing: "border-box", flexShrink: "0" },
      cardHistory: { background: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "none", opacity: "0.8", filter: "grayscale(0.3)", marginBottom: "16px", flexShrink: "0" },
      cardHeader: { padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.04)", fontSize: "12px", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" },
      msgTitle: { padding: "20px 20px 8px 20px", fontSize: "16px", fontWeight: "700", color: "#202124", letterSpacing: "-0.01em", lineHeight: "1.4" },
      metaContainer: { padding: "0 20px 12px 20px", display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#5f6368" },
      cardBody: { padding: "0 20px 24px 20px", fontSize: "14px", color: "#3c4043", lineHeight: "1.6", whiteSpace: "pre-wrap", fontFamily: "'Google Sans', Roboto, sans-serif", wordBreak: "break-word", overflowWrap: "break-word" },
      dismissBtn: { width: "28px", height: "28px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", background: "#fff", color: "#5f6368", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", marginLeft: "12px" },
      markAllBtn: { fontSize: "12px", color: "#1a73e8", cursor: "pointer", fontWeight: "600", background: "transparent", border: "none", padding: "8px", transition: "opacity 0.2s" },
      emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", color: "#bdc1c6", gap: "16px", textAlign: "center" },
      historyDivider: { display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0 20px 0", cursor: "pointer", color: "#1a73e8", fontSize: "13px", fontWeight: "500", gap: "8px", padding: "10px", borderRadius: "8px", transition: "background 0.2s" },
      historyContainer: { display: "none", flexDirection: "column", gap: "16px", paddingTop: "10px", borderTop: "1px dashed rgba(0,0,0,0.1)" },
      
      // --- WIDGET BAU ---
      bauContainer: {
          margin: "16px 24px 0 24px",
          padding: "16px",
          background: "#F3E8FD", 
          border: "1px solid #D8B4FE",
          borderRadius: "16px",
          display: "flex", flexDirection: "column", gap: "10px",
          position: "relative", flexShrink: "0",
          boxShadow: "0 2px 8px rgba(147, 51, 234, 0.08)"
      },
      bauHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
      bauLabel: { fontSize: "11px", fontWeight: "800", color: "#7E22CE", textTransform: "uppercase", letterSpacing: "0.8px" },
      liveIndicator: { display: "flex", alignItems: "center", gap: "8px" },
      pulseDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#9333EA", boxShadow: "0 0 0 0 rgba(147, 51, 234, 0.7)", animation: "cw-pulse 2s infinite" },
      
      // Novo: Linha de Slot com Bandeira
      bauSlotRow: {
          display: "flex", alignItems: "center", gap: "10px", 
          padding: "8px 12px", background: "rgba(255,255,255,0.5)", 
          borderRadius: "8px", marginBottom: "4px"
      },
      bauFlag: { fontSize: "18px", lineHeight: "1" },
      bauDate: { fontSize: "16px", fontWeight: "700", color: "#581C87", letterSpacing: "-0.5px" }
  };

  const styleScrollId = "cw-scrollbar-style";
  if (!document.getElementById(styleScrollId)) {
      const s = document.createElement("style");
      s.id = styleScrollId;
      s.innerHTML = `.cw-nice-scroll::-webkit-scrollbar { width: 5px; } .cw-nice-scroll::-webkit-scrollbar-track { background: transparent; } .cw-nice-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }`;
      document.head.appendChild(s);
  }

  function parseMessageText(rawText) {
      if (!rawText || typeof rawText !== 'string') return ""; 
      let html = rawText;
      const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;
      html = html.replace(urlRegex, (url) => {
          let href = url;
          if (!href.startsWith('http')) href = 'http://' + href;
          return `<a href="${href}" target="_blank" style="color:#1967d2; text-decoration:underline;">${url}</a>`;
      });
      html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      html = html.replace(/_(.*?)_/g, '<i>$1</i>');
      html = html.replace(/\n/g, '<br>');
      html = parseEmojiCodes(html);
      html = html.replace(/@todos|@all/gi, '<span style="background:#e8f0fe; color:#1967d2; padding:1px 5px; border-radius:4px; font-weight:600; font-size:12px;">@todos</span>');
      return html;
  }

  function objectToCss(obj) {
      return Object.entries(obj).map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${v}`).join(';');
  }

  // --- UI SETUP ---
  const popup = document.createElement("div");
  popup.id = "broadcast-popup";
  popup.classList.add("cw-module-window");
  Object.assign(popup.style, stylePopup, {
    right: "auto", left: "50%", width: "450px", height: "650px", 
    display: "flex", flexDirection: "column", transform: "translateX(-50%) scale(0.05)", 
    backgroundColor: '#fafafa'
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
          updateBadge(); 
      };
      actionContainer.insertBefore(markAll, actionContainer.firstChild);
  }

  popup.appendChild(header);
  const feed = document.createElement("div");
  feed.className = "cw-nice-scroll";
  Object.assign(feed.style, styles.feedContainer);
  popup.appendChild(feed);

  async function checkForUpdates() {
      let statusEl = document.getElementById('cw-update-status');
      if (visible) {
          if (!statusEl) {
              statusEl = document.createElement('div');
              statusEl.id = 'cw-update-status';
              statusEl.style.cssText = "padding: 6px; text-align: center; font-size: 11px; color: #5f6368; background: #f8f9fa; border-bottom: 1px solid #e0e0e0;";
              feed.parentNode.insertBefore(statusEl, feed); 
          }
          statusEl.innerHTML = '⏳ Verificando atualizações...';
          statusEl.style.display = 'block';
      }

      const currentIds = BROADCAST_MESSAGES.map(m => m.id);
      const readIds = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");

      try {
          const data = await DataService.fetchData();
          if (data && data.broadcast) {
              if (visible && statusEl) {
                  const temNovidade = data.broadcast.some(m => !currentIds.includes(m.id));
                  if (temNovidade) {
                      statusEl.innerHTML = '✅ Sincronizado.';
                      statusEl.style.backgroundColor = '#e6f4ea';
                      statusEl.style.color = '#137333';
                  } else {
                      statusEl.innerHTML = '🔹 Tudo atualizado.';
                  }
                  setTimeout(() => { if(statusEl) statusEl.style.display = 'none'; }, 1000);
              }
              if (currentIds.length > 0) { 
                  const newMessages = data.broadcast.filter(m => !currentIds.includes(m.id));
                  const unreadNew = newMessages.filter(m => !readIds.includes(m.id));
                  if (unreadNew.length > 0) {
                      console.log("🔔 Novo aviso detectado!");
                      SoundManager.playNotification(); 
                  }
              }
              setBroadcastMessages(data.broadcast);
              updateBadge();
              if (visible) renderFeed(); 
          }
      } catch (error) {
          console.error("Erro no update:", error);
          if (visible && statusEl) {
              statusEl.innerHTML = '⚠️ Falha na conexão.';
              statusEl.style.backgroundColor = '#fce8e6';
          }
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

  // --- RENDERIZADOR ---
  function renderFeed() {
      feed.innerHTML = "";
      const oldBau = popup.querySelector('#cw-bau-widget');
      if (oldBau) oldBau.remove();

      const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      let allMessages = [...BROADCAST_MESSAGES].sort((a, b) => {
          const dateA = new Date(a.date).getTime() || 0;
          const dateB = new Date(b.date).getTime() || 0;
          return dateB - dateA;
      });

      // --- FILTRO DE DISPONIBILIDADE ---
      const bauIndex = allMessages.findIndex(m => m.title && m.title.toLowerCase().includes("disponibilidade bau"));
      let bauMessage = null;

      if (bauIndex !== -1) {
          bauMessage = allMessages[bauIndex];
          allMessages.splice(bauIndex, 1);
      }

      // Renderiza Widget BAU
      if (bauMessage) {
          const bauWidget = document.createElement("div");
          bauWidget.id = "cw-bau-widget";
          Object.assign(bauWidget.style, styles.bauContainer);

          // LÓGICA DE DETECÇÃO DE IDIOMA E DATA (Smart Parsing)
          const extractedSlots = [];
          const lines = bauMessage.text.split('\n');
          const dateRegex = /\d{1,2}\/\d{1,2}/;
          
          lines.forEach(line => {
             const dateMatch = line.match(dateRegex);
             if (dateMatch) {
                 const date = dateMatch[0];
                 let flag = "📅"; // Default
                 if (/🇧🇷|🇵🇹|PT|BR/i.test(line)) flag = "🇧🇷";
                 else if (/🇪🇸|🇲🇽|ES|LATAM/i.test(line)) flag = "🇪🇸";
                 
                 // Evita duplicatas se a pessoa repetiu
                 const exists = extractedSlots.some(s => s.flag === flag && s.date === date);
                 if (!exists) extractedSlots.push({ flag, date });
             }
          });

          // Se não achou nada por linha, tenta o método bruto antigo
          if (extractedSlots.length === 0) {
             const anyDates = bauMessage.text.match(/\d{1,2}\/\d{1,2}/g);
             if (anyDates) {
                 [...new Set(anyDates)].forEach(d => extractedSlots.push({ flag: "📅", date: d }));
             }
          }

          let contentHTML = "";
          
          if (extractedSlots.length > 0) {
              // GERA OS CHIPS (Adicionei margin-bottom: 0 para não empurrar nada)
              let slotsHTML = extractedSlots.map(slot => `
                  <div style="${objectToCss(styles.bauSlotRow)}; margin-bottom: 0; flex: 1; min-width: 100px; justify-content: center;">
                      <span style="${objectToCss(styles.bauFlag)}">${slot.flag}</span>
                      <span style="${objectToCss(styles.bauDate)}">${slot.date}</span>
                  </div>
              `).join('');

              contentHTML = `
                  <div style="display:flex; align-items:flex-start; justify-content:space-between; width:100%;">
                      <div style="display:flex; flex-direction:column; width:100%;">
                         <span style="font-size:12px; opacity:0.8; color:#581C87; margin-bottom:6px;">Slots disponíveis:</span>
                         
                         <div style="display:flex; flex-direction:row; gap:8px; width: 100%;">
                            ${slotsHTML}
                         </div>

                      </div>
                      <button id="cw-bau-toggle-btn" style="background:rgba(255,255,255,0.6); border:1px solid rgba(139, 92, 246, 0.4); border-radius:8px; padding:6px 12px; cursor:pointer; color:#6D28D9; font-size:12px; font-weight:600; transition:all 0.2s; white-space:nowrap; margin-left:8px; height:38px;">
                       Detalhes
                      </button>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">
                      ${parseMessageText(bauMessage.text)}
                  </div>
              `;
          } else {
              // FALLBACK (Sem data detectável)
              contentHTML = `<div style="font-size:13px; color:#581C87; line-height:1.5; white-space:pre-wrap;">${parseMessageText(bauMessage.text)}</div>`;
          }

          bauWidget.innerHTML = `
              <div style="${objectToCss(styles.bauHeader)} margin-bottom:8px;">
                  <div style="${objectToCss(styles.liveIndicator)}">
                      <div style="${objectToCss(styles.pulseDot)}"></div>
                      <span style="${objectToCss(styles.bauLabel)}, margin-right:2px">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.6; font-weight:500; color:#7E22CE;">${formatFriendlyDate(bauMessage.date)}</div>
              </div>
              ${contentHTML}
          `;

          header.after(bauWidget);

          const toggleBtn = bauWidget.querySelector('#cw-bau-toggle-btn');
          const fullText = bauWidget.querySelector('#cw-bau-full');
          if (toggleBtn && fullText) {
              toggleBtn.onclick = () => {
                  const isHidden = fullText.style.display === "none";
                  fullText.style.display = isHidden ? "block" : "none";
                  toggleBtn.textContent = isHidden ? "Ocultar" : "Detalhes";
                  toggleBtn.style.background = isHidden ? "#fff" : "rgba(255,255,255,0.6)";
              };
          }
      }

      // Resto do Feed
      const sortedMessages = allMessages.sort((a, b) => {
          const aRead = readMessages.includes(a.id);
          const bRead = readMessages.includes(b.id);
          return aRead === bRead ? 0 : aRead ? 1 : -1;
      });

      if (sortedMessages.length === 0 && !bauMessage) {
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

  const cachedData = DataService.getCachedBroadcasts();
  if (cachedData.length > 0) {
      setBroadcastMessages(cachedData);
      renderFeed();
  }
  checkForUpdates();
  if (!pollInterval) pollInterval = setInterval(checkForUpdates, POLL_TIME_MS);

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