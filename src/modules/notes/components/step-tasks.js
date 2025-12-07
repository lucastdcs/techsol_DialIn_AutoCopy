// src/modules/notes/components/step-tasks.js

import { TASKS_DB } from "../notes-data.js";

// --- CONFIGURAÇÃO DE DESIGN SYSTEM ---
const DS = {
  font: "'Google Sans', Roboto, sans-serif",
  bg: "#F8F9FA",
  white: "#FFFFFF",
  border: "#DADCE0",
  textMain: "#202124",
  textSub: "#5F6368",
  // Cores de Marca (Google Official)
  brands: {
    ads: { color: "#1967D2", bg: "#E8F0FE" }, // Azul Ads
    ga4: { color: "#E37400", bg: "#FEF7E0" }, // Laranja Analytics
    gtm: { color: "#00A1F1", bg: "#E2F4FD" }, // Azul GTM
    gmc: { color: "#0F9D58", bg: "#E6F4EA" }, // Verde Merchant
    default: { color: "#5F6368", bg: "#F1F3F4" }, // Cinza Genérico
  },
  shadowCard: "0 1px 3px rgba(60,64,67,0.1)",
  shadowActive: "0 4px 12px rgba(26, 115, 232, 0.2)",
  shadowFooter: "0 -4px 16px rgba(0,0,0,0.08)",
};

// Ícones SVGs Otimizados
const ICONS = {
  ads: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
  ga4: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2v-3h2v3zm4 0h-2v-5h2v5z"/></svg>`,
  gtm: `<svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>`,
  gmc: `<svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
  default: `<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
};

export function createStepTasksComponent(onUpdateCallback) {
  // --- ESTADO INTERNO ---
  const selection = {}; // { taskKey: { count, data, brand } }

  // --- DETECÇÃO DE MARCA ---
  function getBrandStyle(name) {
    const n = name.toLowerCase();
    if (
      n.includes("ads") ||
      n.includes("conversion") ||
      n.includes("remarketing")
    )
      return { ...DS.brands.ads, icon: ICONS.ads };
    if (n.includes("ga4") || n.includes("analytics"))
      return { ...DS.brands.ga4, icon: ICONS.ga4 };
    if (n.includes("gtm") || n.includes("tag manager"))
      return { ...DS.brands.gtm, icon: ICONS.gtm };
    if (n.includes("merchant") || n.includes("shopping"))
      return { ...DS.brands.gmc, icon: ICONS.gmc };
    return { ...DS.brands.default, icon: ICONS.default };
  }

  // --- INJEÇÃO DE CSS ---
  const styleId = "cw-step-tasks-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
            /* Container Principal */
            .cw-tasks-container {
                display: flex; flex-direction: column; height: 100%; position: relative;
                font-family: ${DS.font}; background: ${DS.bg};
                margin: -16px; /* Compensa padding do popup pai */
                width: calc(100% + 32px); /* Largura total */
            }

            /* Header de Seção */
            .cw-section-title {
                padding: 20px 24px 12px 24px; font-size: 11px; font-weight: 700; 
                color: ${DS.textSub}; text-transform: uppercase; letter-spacing: 0.8px;
            }

            /* HERO GRID */
            .cw-hero-grid {
                display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
                padding: 0 24px; flex-shrink: 0;
            }
            .cw-hero-card {
                background: ${DS.white}; border: 1px solid ${DS.border}; border-radius: 16px;
                padding: 12px; cursor: pointer; position: relative;
                display: flex; flex-direction: column; gap: 8px; height: 70px;
                transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
                box-shadow: ${DS.shadowCard}; overflow: hidden;
            }
            .cw-hero-card:hover { transform: translateY(-2px); border-color: ${DS.brands.ads.color}; }
            .cw-hero-card:active { transform: scale(0.97); }

            /* Hero Elements */
            .cw-hero-icon { 
                width: 28px; 
                height: 28px;
                border-radius: 10px; background: #F1F3F4; 
                color: ${DS.textSub}; display: flex; align-items: center; justify-content: center;
                transition: background 0.2s, color 0.2s;
            }
            .cw-hero-icon svg { width: 20px; height: 20px; fill: currentColor; }
            .cw-hero-name { font-size: 13px; font-weight: 500; color: ${DS.textMain}; line-height: 1.3; }

            /* Hero Active State */
            .cw-hero-card.active { border-color: transparent; box-shadow: ${DS.shadowActive}; }
            .cw-hero-card.active .cw-hero-icon { background: ${DS.white}; }

            /* Hero Stepper (Reveal) */
            .cw-hero-stepper {
                position: absolute; bottom: 12px; right: 12px;
                display: flex; align-items: center; gap: 8px;
                opacity: 0; transform: translateY(10px); pointer-events: none;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-hero-card.active .cw-hero-stepper { opacity: 1; transform: translateY(0); pointer-events: auto; }
            
            /* LISTA */
            .cw-list-area {
                flex: 1; overflow-y: auto; padding: 0 24px 80px 24px; /* Espaço p/ footer */
                margin-top: 8px;
            }
            .cw-search-box {
                position: sticky; top: 0; background: ${DS.bg}; z-index: 5;
                padding: 10px 0; margin-bottom: 8px;
            }
            .cw-search-input {
                width: 100%; padding: 10px 12px 10px 36px;
                border: 1px solid ${DS.border}; border-radius: 10px; background: ${DS.white};
                font-size: 13px; color: ${DS.textMain}; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: all 0.2s;
            }
            .cw-search-input:focus { border-color: #1A73E8; box-shadow: 0 2px 8px rgba(26,115,232,0.15); }

            .cw-list-row {
                display: flex; align-items: center; justify-content: space-between;
                padding: 12px 16px; margin-bottom: 8px;
                background: ${DS.white}; border-radius: 12px; border: 1px solid transparent;
                cursor: pointer; transition: background 0.1s;
            }
            .cw-list-row:hover { background: #F1F3F4; }
            .cw-list-row.selected { background: #E8F0FE; border-color: #1967D2; }

            /* FOOTER (Smart Cart) */
            .cw-smart-footer {
                position: absolute; bottom: 0; left: 0; width: 100%;
                background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
                border-top: 1px solid ${DS.border};
                padding: 12px 24px; display: flex; align-items: center; justify-content: space-between;
                box-shadow: ${DS.shadowFooter};
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
                z-index: 10;
            }
            .cw-smart-footer.visible { transform: translateY(0); }
            
            .cw-footer-icons { display: flex; gap: -8px; }
            .cw-mini-icon { 
                width: 24px; height: 24px; border-radius: 50%; color: white;
                display: flex; align-items: center; justify-content: center; 
                border: 2px solid #FFF; font-size: 10px;
            }
            .cw-mini-icon svg { width: 14px; height: 14px; fill: currentColor; }
            
            /* Botões Genéricos de Stepper */
            .cw-step-btn {
                width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.8);
                border: 1px solid rgba(0,0,0,0.1); color: inherit;
                display: flex; align-items: center; justify-content: center;
                font-weight: bold; cursor: pointer; transition: transform 0.1s;
            }
            .cw-step-btn:active { transform: scale(0.9); }
            .cw-step-val { font-size: 13px; font-weight: 700; min-width: 16px; text-align: center; }
        `;
    document.head.appendChild(style);
  }

  // --- CRIAÇÃO DO DOM ---
  const container = document.createElement("div");
  container.className = "cw-tasks-container";

  // Containers internos (sem screenshots aqui)
  const screenshotsContainer = document.createElement("div");
  Object.assign(screenshotsContainer.style, {
    marginTop: "16px",
    borderTop: "1px dashed #ccc",
    paddingTop: "12px",
    display: "none",
  });
  const screenTitle = document.createElement("h4");
  Object.assign(screenTitle.style, {
    fontSize: "14px",
    fontWeight: "600",
    color: "#202124",
    margin: "0 0 12px 0",
  });
  screenTitle.textContent = "Evidências / Screenshots";
  const screenList = document.createElement("div");
  screenshotsContainer.appendChild(screenTitle);
  screenshotsContainer.appendChild(screenList);

  // Layout Principal
  container.innerHTML = `
        <div class="cw-section-title">Acesso Rápido</div>
        <div class="cw-hero-grid"></div>
        <div class="cw-list-area">
            <div class="cw-search-box">
                <input class="cw-search-input" placeholder="Buscar outras tasks...">
            </div>
            <div class="cw-list-items"></div>
        </div>
        <div class="cw-smart-footer">
            <div style="display:flex; align-items:center; gap:12px;">
                <div class="cw-footer-count" style="font-size:13px; font-weight:600; color:#202124">0 Selecionados</div>
                <div class="cw-footer-icons"></div>
            </div>
            <div style="font-size:11px; color:#5F6368;">Role para ver os prints abaixo</div>
        </div>
    `;

  const heroGrid = container.querySelector(".cw-hero-grid");
  const listItems = container.querySelector(".cw-list-items");
  const searchInput = container.querySelector(".cw-search-input");
  const footer = container.querySelector(".cw-smart-footer");
  const footerCount = container.querySelector(".cw-footer-count");
  const footerIcons = container.querySelector(".cw-footer-icons");

  // --- RENDERIZAÇÃO ---

  // 1. Hero Cards (Populares)
  const popularTasks = Object.entries(TASKS_DB).filter(([_, t]) => t.popular);
  popularTasks.forEach(([key, task]) => {
    const brand = getBrandStyle(task.name);
    const card = document.createElement("div");
    card.className = "cw-hero-card";
    card.id = `hero-${key}`;

    card.innerHTML = `
            <div style="display:flex; gap:10px; align-items:center;">
                <div class="cw-hero-icon">${brand.icon}</div>
                <div class="cw-hero-name">${task.name}</div>
            </div>
            <div class="cw-hero-stepper" style="color:${brand.color}">
                <div class="cw-step-btn minus">−</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `;

    // Eventos
    card.onclick = (e) => {
      if (e.target.classList.contains("cw-step-btn")) return;
      toggleTask(key, 1);
    };
    card.querySelector(".minus").onclick = () => toggleTask(key, -1);
    card.querySelector(".plus").onclick = () => toggleTask(key, 1);

    // Salva estilos no elemento p/ ativar depois
    card.dataset.color = brand.color;
    card.dataset.bg = brand.bg;

    heroGrid.appendChild(card);
  });

  // 2. Lista Completa (Restante)
  const otherTasks = Object.entries(TASKS_DB).filter(([_, t]) => !t.popular);
  const renderList = (filter = "") => {
    listItems.innerHTML = "";
    otherTasks.forEach(([key, task]) => {
      if (filter && !task.name.toLowerCase().includes(filter.toLowerCase()))
        return;

      const brand = getBrandStyle(task.name);
      const row = document.createElement("div");
      row.className = "cw-list-row";
      row.id = `list-${key}`;

      row.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:4px; height:24px; border-radius:2px; background:${brand.color}33;"></div>
                    <div style="font-size:13px; font-weight:500; color:#3C4043;">${task.name}</div>
                </div>
                <div class="cw-list-status" style="color:${brand.color}; font-weight:700; font-size:12px;"></div>
            `;

      row.onclick = () =>
        toggleTask(key, selection[key] ? -selection[key].count : 1); // Toggle simples na lista
      listItems.appendChild(row);
    });
  };
  renderList();

  searchInput.addEventListener("input", (e) => {
    // Oculta Heroes na busca para focar
    heroGrid.style.display = e.target.value ? "none" : "grid";
    container.querySelector(".cw-section-title").style.display = e.target.value
      ? "none"
      : "block";
    renderList(e.target.value);
    updateUI(); // Re-aplica estados visuais na lista filtrada
  });

  // --- LÓGICA DE CONTROLE ---

  function toggleTask(key, delta) {
    if (!selection[key]) {
      if (delta > 0)
        selection[key] = {
          count: delta,
          data: TASKS_DB[key],
          brand: getBrandStyle(TASKS_DB[key].name),
        };
    } else {
      selection[key].count += delta;
      if (selection[key].count <= 0) delete selection[key];
    }

    updateUI();
    renderScreenshots();
    if (onUpdateCallback) onUpdateCallback();
  }

  function updateUI() {
    // Atualiza Heroes
    popularTasks.forEach(([key]) => {
      const card = heroGrid.querySelector(`#hero-${key}`);
      if (!card) return;
      const item = selection[key];

      if (item) {
        card.classList.add("active");
        card.style.backgroundColor = card.dataset.bg;
        card.style.borderColor = card.dataset.color;
        const icon = card.querySelector(".cw-hero-icon");
        icon.style.backgroundColor = card.dataset.color;
        icon.style.color = "#FFF";
        card.querySelector(".cw-hero-name").style.color = card.dataset.color;
        card.querySelector(".cw-hero-name").style.fontWeight = "700";
        card.querySelector(".cw-step-val").textContent = item.count;
      } else {
        card.classList.remove("active");
        card.style.backgroundColor = "#FFF";
        card.style.borderColor = DS.border;
        const icon = card.querySelector(".cw-hero-icon");
        icon.style.backgroundColor = "#F1F3F4";
        icon.style.color = DS.textSub;
        card.querySelector(".cw-hero-name").style.color = DS.textMain;
        card.querySelector(".cw-hero-name").style.fontWeight = "500";
      }
    });

    // Atualiza Lista
    const rows = listItems.querySelectorAll(".cw-list-row");
    rows.forEach((row) => {
      const key = row.id.replace("list-", "");
      const item = selection[key];
      const status = row.querySelector(".cw-list-status");
      if (item) {
        row.classList.add("selected");
        status.textContent = item.count > 1 ? `${item.count}x` : "✔";
      } else {
        row.classList.remove("selected");
        status.textContent = "";
      }
    });

    // Atualiza Footer
    const keys = Object.keys(selection);
    if (keys.length > 0) {
      footer.classList.add("visible");
      footerCount.textContent = `${keys.length} Task${
        keys.length > 1 ? "s" : ""
      }`;
      footerIcons.innerHTML = "";
      keys.slice(0, 5).forEach((k) => {
        const mini = document.createElement("div");
        mini.className = "cw-mini-icon";
        mini.style.backgroundColor = selection[k].brand.color;
        mini.innerHTML = selection[k].brand.icon;
        footerIcons.appendChild(mini);
      });
    } else {
      footer.classList.remove("visible");
    }
  }

  // Lógica de Prints (Mantida a original, apenas adaptada ao novo container)
  function renderScreenshots() {
    screenList.innerHTML = "";
    const keys = Object.keys(selection);

    if (keys.length === 0) {
      screenshotsContainer.style.display = "none";
      return;
    }

    let hasAny = false;
    // Simula a lógica de substatus que vem de fora (usando variável global ou assumindo padrão)
    // O ideal seria o updateSubStatus atualizar uma variável local aqui.
    const type = "implementation"; // Default

    keys.forEach((key) => {
      const task = TASKS_DB[key];
      const count = selection[key].count;
      const prints = task.screenshots ? task.screenshots[type] || [] : [];

      if (prints.length > 0) {
        hasAny = true;
        const block = document.createElement("div");
        Object.assign(block.style, {
          marginBottom: "12px",
          background: "#f8f9fa",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
        });
        block.innerHTML = `<strong style="color:#5f6368">${task.name}</strong> <small style="color:#1a73e8">(${count}x)</small>`;

        for (let i = 1; i <= count; i++) {
          const card = document.createElement("div");
          Object.assign(card.style, {
            background: "white",
            padding: "12px",
            borderRadius: "6px",
            marginTop: "8px",
            border: "1px solid #dadce0",
          });

          // Inputs com IDs corretos para o notes-assistant ler
          const nameBox = document.createElement("div");
          Object.assign(nameBox.style, {
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            gap: "6px",
          });
          const pen = document.createElement("span");
          pen.textContent = "✎";
          Object.assign(pen.style, {
            fontSize: "14px",
            color: "#9aa0a6",
            cursor: "pointer",
          });

          const input = document.createElement("input");
          input.id = `name-${key}-${i}`;
          input.value = `${task.name}${count > 1 ? " #" + i : ""}`;
          Object.assign(input.style, {
            width: "100%",
            border: "none",
            borderBottom: "1px dashed #ccc",
            fontSize: "12px",
            fontWeight: "600",
            color: "#1a73e8",
            background: "transparent",
            outline: "none",
          });

          nameBox.append(pen, input);
          card.appendChild(nameBox);

          prints.forEach((req, idx) => {
            const row = document.createElement("div");
            row.innerHTML = `<div style="font-size:11px; color:#5f6368; margin-bottom:2px">📷 ${req}:</div>`;
            const pInput = document.createElement("input");
            pInput.id = `screen-${key}-${i}-${idx}`;
            pInput.placeholder = "Cole o link...";
            Object.assign(pInput.style, {
              width: "100%",
              border: "none",
              borderBottom: "1px dashed #ccc",
              fontSize: "12px",
              marginBottom: "4px",
              background: "transparent",
              outline: "none",
            });
            row.appendChild(pInput);
            card.appendChild(row);
          });
          block.appendChild(card);
        }
        screenList.appendChild(block);
      }
    });
    screenshotsContainer.style.display = hasAny ? "block" : "none";
  }

  // Inicializa
  updateUI();

  // --- API PÚBLICA ---
  return {
    selectionElement: container, // O Módulo Visual (Vai no Step 2)
    screenshotsElement: screenshotsContainer, // Os Prints (Vai no Step 3)

    updateSubStatus: (newSubStatus) => {
      // Se precisar diferenciar Education/Implementation, atualize a lógica de renderScreenshots aqui
      renderScreenshots();
    },

    // O Notes Assistant usa isso para saber quais checkboxes foram marcados.
    // Como agora usamos um objeto de seleção interno, criamos um "Proxy" que finge ser inputs.
    getCheckedElements: () => {
      return Object.keys(selection).map((key) => ({
        value: key,
        // Hack para o notes-assistant ler o count sem quebrar
        closest: () => ({
          querySelector: () => ({ textContent: selection[key].count }),
        }),
      }));
    },

    reset: () => {
      for (const key in selection) delete selection[key];
      updateUI();
      renderScreenshots();
    },
  };
}
