import { TASKS_DB } from '../notes-data.js';

// --- 1. DESIGN SYSTEM & CONFIG ---
const DS = {
    bg: '#F9FAFB', // Fundo Apple Gray
    white: '#FFFFFF',
    border: '#E5E7EB',
    textMain: '#111827',
    textSub: '#6B7280',
    blue: '#007AFF', // Apple Blue
    blueLight: '#EBF5FF',
    // Cores Oficiais das Ferramentas
    brands: {
        ads: { id: 'ads', label: 'Google Ads', color: '#1967D2', bg: '#E8F0FE', icon: 'ads' },
        ga4: { id: 'ga4', label: 'Google Analytics 4', color: '#E37400', bg: '#FEF7E0', icon: 'ga4' },
        gtm: { id: 'gtm', label: 'Tag Manager', color: '#00A1F1', bg: '#E2F4FD', icon: 'gtm' },
        gmc: { id: 'gmc', label: 'Merchant Center', color: '#0F9D58', bg: '#E6F4EA', icon: 'gmc' },
        default: { id: 'gen', label: 'Geral', color: '#5F6368', bg: '#F3F4F6', icon: 'default' }
    },
    shadowCard: '0 1px 2px rgba(0,0,0,0.05)',
    shadowFloat: '0 -4px 20px rgba(0,0,0,0.08)',
    font: "'Google Sans', -apple-system, Roboto, sans-serif"
};

const ICONS = {
    ads: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    ga4: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2v-3h2v3zm4 0h-2v-5h2v5z"/></svg>`,
    gtm: `<svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>`,
    gmc: `<svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
    default: `<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`
};

export function createStepTasksComponent(onUpdateCallback) {
    const selection = {}; // { taskId: { count, data, brand } }

    // --- HEURÍSTICA DE MARCA (Auto-Categorização) ---
    function getBrand(name) {
        const n = name.toLowerCase();
        if (n.includes('ads') || n.includes('conversion') || n.includes('remarketing')) return DS.brands.ads;
        if (n.includes('ga4') || n.includes('analytics')) return DS.brands.ga4;
        if (n.includes('gtm') || n.includes('tag manager') || n.includes('container')) return DS.brands.gtm;
        if (n.includes('merchant') || n.includes('shopping') || n.includes('feed')) return DS.brands.gmc;
        return DS.brands.default;
    }

    // --- ORGANIZAÇÃO DOS DADOS ---
    // 1. Populares (Hero)
    const heroTasks = Object.entries(TASKS_DB).filter(([_, t]) => t.popular);
    
    // 2. Agrupamento por Categoria (Accordion)
    const groupedTasks = {};
    Object.entries(TASKS_DB).forEach(([key, task]) => {
        if (task.popular) return; // Não duplica os heróis na lista
        const brand = getBrand(task.name);
        if (!groupedTasks[brand.label]) groupedTasks[brand.label] = { brand, tasks: [] };
        groupedTasks[brand.label].tasks.push({ key, ...task });
    });

    // --- INJEÇÃO DE CSS (Zen Style) ---
    const styleId = 'cw-zen-tasks';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${DS.font}; background: ${DS.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espaço para o Status Bar */

            /* HERO SECTION */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${DS.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD (Compacto & Tátil) */
            .cw-hero-card {
                background: ${DS.white}; border-radius: 12px; padding: 10px 12px;
                box-shadow: ${DS.shadowCard}; border: 1px solid transparent;
                cursor: pointer; position: relative; height: 60px;
                display: flex; align-items: center; gap: 10px;
                transition: all 0.2s ease;
            }
            .cw-hero-card:hover { transform: translateY(-1px); box-shadow: 0 4px 6px rgba(0,0,0,0.04); }
            .cw-hero-card:active { transform: scale(0.98); }
            
            .cw-hero-icon { 
                width: 32px; height: 32px; border-radius: 8px; background: #F3F4F6; color: ${DS.textSub};
                display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s;
            }
            .cw-hero-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-hero-label { font-size: 12px; font-weight: 500; color: ${DS.textMain}; line-height: 1.2; }

            /* Hero Active */
            .cw-hero-card.active { background: ${DS.white}; border-color: ${DS.blue}; }
            .cw-hero-card.active .cw-hero-icon { background: ${DS.blue}; color: white; }
            .cw-hero-card.active .cw-hero-label { color: ${DS.blue}; font-weight: 600; }

            /* Hero Stepper (Overlay) */
            .cw-hero-stepper {
                position: absolute; right: 4px; top: 4px; bottom: 4px;
                background: ${DS.white}; border-radius: 8px; padding: 0 4px;
                display: flex; align-items: center; gap: 4px;
                box-shadow: -2px 0 10px rgba(0,0,0,0.05);
                opacity: 0; pointer-events: none; transform: translateX(10px);
                transition: all 0.2s ease;
            }
            .cw-hero-card.active .cw-hero-stepper { opacity: 1; pointer-events: auto; transform: translateX(0); }

            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${DS.border}; border-radius: 10px; background: ${DS.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${DS.blue}; box-shadow: 0 0 0 3px ${DS.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${DS.border}; border-radius: 10px; background: ${DS.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${DS.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${DS.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${DS.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${DS.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px 10px 32px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${DS.blueLight}; }
            .cw-task-label { font-size: 13px; color: ${DS.textSub}; transition: color 0.1s; font-weight: 400; }
            .cw-task-item.selected .cw-task-label { color: ${DS.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS (+ / -) */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${DS.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${DS.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${DS.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${DS.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${DS.textMain}; }
            .cw-status-icons { display: flex; gap: -6px; }
            .cw-status-mini { 
                width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;
                color: white; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }
            .cw-status-mini svg { width: 12px; height: 12px; fill: currentColor; }

            @keyframes cwSlideDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(style);
    }

    // --- CRIAÇÃO DO DOM ---
    const container = document.createElement('div');
    container.className = 'cw-zen-container';
    
    // Container Invisível de Prints (Para lógica original)
    const screenshotsContainer = document.createElement("div");
    Object.assign(screenshotsContainer.style, { display: "none" }); // Oculto mas funcional
    const screenList = document.createElement("div");
    screenshotsContainer.appendChild(screenList);

    container.innerHTML = `
        <div class="cw-zen-content">
            <div class="cw-hero-section">
                <div class="cw-section-subtitle" style="font-size:11px; font-weight:700; color:#6B7280; text-transform:uppercase; letter-spacing:0.8px;">Acesso Rápido</div>
                <div class="cw-hero-grid"></div>
                <div class="cw-helper-text">Atalhos para as implementações mais frequentes.<br>Use a busca abaixo para o catálogo completo.</div>
            </div>

            <div class="cw-list-section">
                <div class="cw-search-wrapper">
                    <input class="cw-search-input" placeholder="Buscar no catálogo...">
                </div>
                <div class="cw-acc-container"></div>
                <div class="cw-results-container" style="display:none"></div>
            </div>
        </div>

        <div class="cw-status-bar">
            <div class="cw-status-text">0 ações definidas</div>
            <div class="cw-status-icons"></div>
        </div>
    `;

    const heroGrid = container.querySelector('.cw-hero-grid');
    const accContainer = container.querySelector('.cw-acc-container');
    const resultsContainer = container.querySelector('.cw-results-container');
    const searchInput = container.querySelector('.cw-search-input');
    const statusBar = container.querySelector('.cw-status-bar');
    const statusText = container.querySelector('.cw-status-text');
    const statusIcons = container.querySelector('.cw-status-icons');

    // --- RENDERIZAÇÃO ---

    // 1. Render Heroes
    heroTasks.forEach(([key, task]) => {
        const brand = getBrand(task.name);
        const card = document.createElement('div');
        card.className = 'cw-hero-card';
        card.id = `hero-${key}`;
        
        card.innerHTML = `
            <div class="cw-hero-icon">${ICONS[brand.icon]}</div>
            <div class="cw-hero-label">${task.name}</div>
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">−</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `;
        
        // Zonas de Clique: Corpo = Toggle, Botões = Stepper
        card.onclick = (e) => {
            if(e.target.closest('.cw-step-btn')) return;
            const current = selection[key] ? selection[key].count : 0;
            updateTask(key, current > 0 ? -current : 1, task);
        };
        card.querySelector('.minus').onclick = () => updateTask(key, -1, task);
        card.querySelector('.plus').onclick = () => updateTask(key, 1, task);
        
        // Dados para estilo
        card.dataset.color = brand.color;
        
        heroGrid.appendChild(card);
    });

    // 2. Render Accordions
    Object.entries(groupedTasks).forEach(([catName, data]) => {
        const group = document.createElement('div');
        group.className = 'cw-acc-group';
        
        // Header
        const header = document.createElement('div');
        header.className = 'cw-acc-header';
        header.innerHTML = `
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${data.brand.color}"></div>
                ${catName}
            </div>
            <div class="cw-acc-icon">▼</div>
        `;
        header.onclick = () => {
            // Accordion Exclusivo: Fecha os outros
            accContainer.querySelectorAll('.cw-acc-group.open').forEach(g => {
                if(g !== group) g.classList.remove('open');
            });
            group.classList.toggle('open');
        };

        // Body
        const body = document.createElement('div');
        body.className = 'cw-acc-body';
        
        data.tasks.forEach(item => {
            const row = createListItem(item.key, item);
            body.appendChild(row);
        });

        group.appendChild(header);
        group.appendChild(body);
        accContainer.appendChild(group);
    });

    // --- HELPERS ---

    function createListItem(key, task) {
        const row = document.createElement('div');
        row.className = 'cw-task-item';
        row.dataset.id = key;
        row.innerHTML = `
            <div class="cw-task-label">${task.name}</div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">−</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `;
        
        row.onclick = (e) => {
            if(e.target.closest('.cw-step-btn')) return;
            const current = selection[key] ? selection[key].count : 0;
            updateTask(key, current > 0 ? -current : 1, task);
        };
        row.querySelector('.minus').onclick = () => updateTask(key, -1, task);
        row.querySelector('.plus').onclick = () => updateTask(key, 1, task);

        return row;
    }

    function updateTask(key, delta, taskData) {
        if (!selection[key]) selection[key] = { count: 0, data: taskData, brand: getBrand(taskData.name) };
        selection[key].count += delta;
        if (selection[key].count <= 0) delete selection[key];
        
        updateUI();
        renderScreenshots();
        if (onUpdateCallback) onUpdateCallback();
    }

    function updateUI() {
        // 1. Heroes
        heroTasks.forEach(([key]) => {
            const card = heroGrid.querySelector(`#hero-${key}`);
            if(!card) return;
            const sel = selection[key];
            
            if (sel) {
                card.classList.add('active');
                card.style.borderColor = card.dataset.color;
                const icon = card.querySelector('.cw-hero-icon');
                icon.style.backgroundColor = card.dataset.color;
                icon.style.color = 'white';
                card.querySelector('.cw-step-val').textContent = sel.count;
            } else {
                card.classList.remove('active');
                card.style.borderColor = 'transparent';
                const icon = card.querySelector('.cw-hero-icon');
                icon.style.backgroundColor = '#F3F4F6';
                icon.style.color = DS.textSub;
            }
        });

        // 2. List Items (Accordion & Search)
        const allItems = container.querySelectorAll('.cw-task-item');
        allItems.forEach(row => {
            const key = row.dataset.id;
            const sel = selection[key];
            if (sel) {
                row.classList.add('selected');
                row.querySelector('.cw-step-val').textContent = sel.count;
            } else {
                row.classList.remove('selected');
            }
        });

        // 3. Status Bar
        const keys = Object.keys(selection);
        if (keys.length > 0) {
            statusBar.classList.add('visible');
            statusText.textContent = `${keys.length} ações definidas`;
            statusIcons.innerHTML = '';
            keys.slice(0, 5).forEach(k => {
                const item = selection[k];
                const div = document.createElement('div');
                div.className = 'cw-status-mini';
                div.style.backgroundColor = item.brand.color;
                div.innerHTML = ICONS[item.brand.icon] || ICONS.default; // Reuso do SVG
                // Ajuste de tamanho do SVG no mini
                div.querySelector('svg').style.width = '12px';
                div.querySelector('svg').style.height = '12px';
                statusIcons.appendChild(div);
            });
        } else {
            statusBar.classList.remove('visible');
        }
    }

    // Busca
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        if (term.length > 0) {
            accContainer.style.display = 'none';
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = '';
            
            let found = false;
            Object.entries(TASKS_DB).forEach(([key, task]) => {
                if (task.name.toLowerCase().includes(term)) {
                    found = true;
                    const item = createListItem(key, task);
                    // Re-apply state
                    if(selection[key]) {
                        item.classList.add('selected');
                        item.querySelector('.cw-step-val').textContent = selection[key].count;
                    }
                    resultsContainer.appendChild(item);
                }
            });
            if(!found) resultsContainer.innerHTML = '<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>';
        } else {
            accContainer.style.display = 'block';
            resultsContainer.style.display = 'none';
        }
    });

    // Lógica de Prints (Inputs Ocultos para o Notes ler)
    function renderScreenshots() {
        screenList.innerHTML = "";
        const keys = Object.keys(selection);
        let hasAny = false;
        const type = 'implementation'; 

        keys.forEach(key => {
            const task = selection[key].data;
            const count = selection[key].count;
            const prints = task.screenshots ? (task.screenshots[type] || []) : [];

            if (prints.length > 0) {
                hasAny = true;
                const block = document.createElement("div");
                for(let i=1; i<=count; i++) {
                    const card = document.createElement("div");
                    const nameInput = document.createElement("input"); 
                    nameInput.id = `name-${key}-${i}`;
                    nameInput.value = `${task.name}${count > 1 ? ' #'+i : ''}`;
                    card.appendChild(nameInput); // Name precisa estar no DOM

                    prints.forEach((req, idx) => {
                        const label = document.createElement("label"); label.textContent = req;
                        const pInput = document.createElement("input");
                        pInput.id = `screen-${key}-${i}-${idx}`;
                        card.appendChild(label); card.appendChild(pInput);
                    });
                    block.appendChild(card);
                }
                screenList.appendChild(block);
            }
        });
        screenshotsContainer.style.display = hasAny ? "block" : "none";
    }

    return {
        selectionElement: container,
        screenshotsElement: screenshotsContainer,
        updateSubStatus: () => renderScreenshots(), // Pode refinar se precisar mudar tipo de print
        getCheckedElements: () => {
            // Adapter para o notes-assistant
            return Object.keys(selection).map(key => ({
                value: key,
                closest: () => ({ querySelector: () => ({ textContent: selection[key].count }) })
            }));
        },
        reset: () => {
            for(const k in selection) delete selection[k];
            updateUI();
            renderScreenshots();
            searchInput.value = '';
            accContainer.style.display = 'block';
            resultsContainer.style.display = 'none';
        }
    };
}