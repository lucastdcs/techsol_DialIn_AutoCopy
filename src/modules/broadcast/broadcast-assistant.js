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
  const CURRENT_VERSION = "v1.0";
  let visible = false;

  const styles = {
    feedContainer: {
      padding: "20px", // Mais respiro nas bordas
      overflowY: "auto",
      flexGrow: "1",
      background: "#F5F5F7", // Cinza "Apple Background"
      display: "flex",
      flexDirection: "column",
      gap: "20px", // Espaço generoso entre mensagens
    },
    card: {
      background: "#FFFFFF",
      borderRadius: "18px", // Curva suave estilo iOS
      border: "none", // Removemos a borda cinza dura
      boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 0 1px rgba(0,0,0,0.1)", // Sombra difusa
      overflow: "hidden",
      transition: "transform 0.2s ease, opacity 0.2s ease",
      position: "relative",
      width: "100%", // Ocupa a largura disponível
      boxSizing: "border-box",
    },
    // Faixas laterais (Agora mais sutis ou mantidas para identificação rápida)
    cardCritical: { borderLeft: "5px solid #FF3B30" }, // Vermelho Apple
    cardInfo: { borderLeft: "5px solid #007AFF" }, // Azul Apple
    cardSuccess: { borderLeft: "5px solid #34C759" }, // Verde Apple

    cardHeader: {
      padding: "16px 20px 8px 20px", // Mais espaço interno
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // Removemos a borda inferior para parecer uma bolha única
      // borderBottom: "1px solid #f1f3f4"
    },
    authorName: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#1D1D1F", // Preto Apple (quase preto)
      letterSpacing: "-0.01em",
    },
    date: {
      fontSize: "11px",
      color: "#86868b", // Cinza metálico
      fontWeight: "500",
    },

    cardBody: {
      padding: "8px 20px 20px 20px", // Continuação do fluxo do header
      fontSize: "15px", // Fonte levemente maior para leitura fácil
      color: "#1D1D1F",
      lineHeight: "1.6", // Entrelinha generosa (Segredo da elegância)
      whiteSpace: "pre-wrap",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      wordBreak: "break-word", // Evita que URLs quebrem o layout
    },

    // Estilo para o GIF/Emoji (Alinhamento perfeito com texto)
    emojiImg: "height: 22px; vertical-align: bottom; margin: 0 1px;",

    readButton: {
      width: "100%",
      padding: "12px",
      background: "#FAFAFA", // Quase branco
      border: "none",
      borderTop: "1px solid #F0F0F0",
      color: "#007AFF", // Azul Link
      fontSize: "13px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
      outline: "none",
    },
    newBadge: {
      background: "#007AFF", // Azul em vez de vermelho para ser menos agressivo (ou mantenha vermelho se preferir alerta)
      color: "#fff",
      fontSize: "10px",
      padding: "3px 8px",
      borderRadius: "12px",
      fontWeight: "600",
      marginLeft: "8px",
      letterSpacing: "0.5px",
      boxShadow: "0 2px 4px rgba(0,122,255,0.2)",
    },
    // Estilo para o Título da mensagem (dentro do body ou separado)
    msgTitle: {
      padding: "0 20px",
      marginTop: "5px",
      fontSize: "16px",
      fontWeight: "700",
      color: "#1D1D1F",
      letterSpacing: "-0.02em",
    },
  };

  // --- PARSER DE TEXTO (A Mágica) ---
  function parseMessageText(rawText) {
    let html = rawText;

    // 1. Substitui Emojis (:shortcode: -> <img>)
    Object.keys(EMOJI_MAP).forEach((shortcode) => {
      const url = EMOJI_MAP[shortcode];
      // Se for URL de imagem/gif
      if (url.startsWith("http")) {
        const imgTag = `<img src="${url}" style="${styles.emojiImg}" alt="${shortcode}">`;
        // Replace All global
        html = html.split(shortcode).join(imgTag);
      } else {
        // Se for emoji nativo (ex: 🏠)
        html = html.split(shortcode).join(url);
      }
    });

    // 2. Mentions (@todos -> highlight)
    html = html.replace(
      /@todos|@all/gi,
      '<span style="background:#e8f0fe; color:#1967d2; padding:0 4px; border-radius:4px; font-weight:500;">@todos</span>'
    );

    return html;
  }

  // --- UI ---
  const popup = document.createElement("div");
  popup.id = "broadcast-popup";
  Object.assign(popup.style, stylePopup, {
    right: "auto",
    left: "50%", // Centralizado (já que vamos permitir resize)
    width: "480px", // <--- AUMENTADO (Era 400px)
    height: "700px", // Mais alto para ver mais feed
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
      // Ao abrir, remove o badge de "Não lido" do botão principal (lógica externa)
      const btn = document.getElementById("cw-btn-broadcast");
      if (btn) btn.classList.remove("has-new");
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
  const readMessages = JSON.parse(
    localStorage.getItem("cw_read_broadcasts") || "[]"
  );

  BROADCAST_MESSAGES.forEach((msg) => {
    const isRead = readMessages.includes(msg.id);

    const card = document.createElement("div");
    Object.assign(card.style, styles.card);

    // Cor da borda
    if (msg.type === "critical") Object.assign(card.style, styles.cardCritical);
    if (msg.type === "info") Object.assign(card.style, styles.cardInfo);
    if (msg.type === "success") Object.assign(card.style, styles.cardSuccess);

    // Header do Card
    const cardHead = document.createElement("div");
    Object.assign(cardHead.style, styles.cardHeader);

    const leftSide = document.createElement("div");
    leftSide.innerHTML = `<span style="${stringifyStyle(styles.authorName)}">${
      msg.author
    }</span>`;
    if (!isRead) {
      leftSide.innerHTML += `<span style="${stringifyStyle(
        styles.newBadge
      )}">NOVO</span>`;
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
      Object.assign(titleDiv.style, styles.msgTitle); // <--- Use o estilo novo
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

      btn.onmouseenter = () => (btn.style.background = "#e8f0fe");
      btn.onmouseleave = () => (btn.style.background = "#f8f9fa");

      btn.onclick = () => {
        SoundManager.playClick();
        // Salva no storage
        readMessages.push(msg.id);
        localStorage.setItem(
          "cw_read_broadcasts",
          JSON.stringify(readMessages)
        );

        // Animação de saída do badge e botão
        btn.style.height = "0";
        btn.style.padding = "0";
        btn.style.opacity = "0";
        leftSide.querySelector("span:last-child").style.display = "none"; // Esconde badge NOVO

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
  const resizeHandle = document.createElement("div");
  Object.assign(resizeHandle.style, styleResizeHandle);
  resizeHandle.className = "no-drag";
  popup.appendChild(resizeHandle);
  makeResizable(popup, resizeHandle);

  document.body.appendChild(popup);

  // Helper para converter objeto de estilo em string (para innerHTML)
  function stringifyStyle(styleObj) {
    return Object.entries(styleObj)
      .map(
        ([k, v]) => k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()) + ":" + v
      )
      .join(";");
  }

  // Checa se tem novos para tocar som de notificação
  const hasUnread = BROADCAST_MESSAGES.some(
    (m) => !readMessages.includes(m.id)
  );
  if (hasUnread) {
    // Dispara evento ou retorna info para o Command Center acender a luzinha
    // SoundManager.playNotification(); (Idealmente chamado apenas uma vez no load da pagina)
  }

  return { toggle: toggleVisibility, hasUnread };
}
