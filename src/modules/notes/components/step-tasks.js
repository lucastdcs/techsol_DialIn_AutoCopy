// src/modules/notes/components/step-tasks.js

import { TASKS_DB } from '../notes-data.js';

// --- ESTILOS LOCAIS (Copiados e Isolados para garantir segurança) ---
const styles = {
    searchInput: {
        width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px", border: "1px solid #dadce0", background: "#f8f9fa",
        fontSize: "14px", marginBottom: "12px", boxSizing: "border-box", outline: "none",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: "no-repeat", backgroundPosition: "10px center"
    },
    chipContainer: { display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px", marginBottom: "8px", scrollbarWidth: "none", borderBottom: "1px solid #f1f3f4" },
    chip: { padding: "6px 12px", borderRadius: "16px", border: "1px solid #dadce0", background: "#fff", color: "#3c4043", fontSize: "12px", fontWeight: "500", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s", userSelect: "none", display: "flex", alignItems: "center", gap: "6px" },
    chipSelected: { background: "#e8f0fe", color: "#1967d2", borderColor: "#1967d2" },
    chipRemove: { marginLeft: "2px", width: "16px", height: "16px", borderRadius: "50%", display: "none", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#1967d2", backgroundColor: "rgba(255,255,255,0.6)", transition: "background 0.2s", lineHeight: "1" },
    
    // Lista Expansível
    listContainer: { maxHeight: "220px", overflowY: "auto", border: "1px solid #dadce0", borderRadius: "8px", marginTop: "8px", backgroundColor: "#ffffff", display: "none" },
    listItem: { display: "flex", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #f1f3f4", cursor: "pointer", fontSize: "13px", color: "#3c4043", transition: "background 0.1s", userSelect: "none" },
    linkBtn: { background: 'transparent', border: '1px solid #dadce0', borderRadius: '18px', color: '#1a73e8', cursor: 'pointer', fontSize: '13px', fontWeight: '500', padding: '6px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', margin: '12px auto 0 auto', transition: 'background-color 0.2s ease', width: "fit-content" },
    
    // Stepper
    stepper: { display: 'none', alignItems: 'center', gap: '5px', marginLeft: 'auto' },
    stepperBtn: { width: '24px', height: '24px', border: '1px solid #dadce0', borderRadius: '50%', backgroundColor: '#f8f9fa', color: '#3c4043', cursor: 'pointer', padding: '0', fontSize: '16px', lineHeight: '22px', textAlign: 'center' },
    stepperCount: { fontSize: '14px', fontWeight: '500', color: '#1a73e8', minWidth: '15px', textAlign: 'center' },
    
    // Screenshots
    screenshotInput: { width: "100%", padding: "6px 0", borderRadius: "0", border: "none", borderBottom: "1px dashed #ccc", fontSize: "12px", marginBottom: "4px", background: "transparent" }
};

/**
 * Cria o componente de Seleção de Tasks e Screenshots.
 * @param {function} onUpdateCallback - Chamado sempre que uma task é alterada (para atualizar Tag Support, etc)
 */
export function createStepTasksComponent(onUpdateCallback) {
    // --- ESTADO INTERNO ---
    let currentSubStatus = ""; // Para saber se é Education ou Implementation

    // --- ELEMENTOS DO DOM ---
    const containerTasks = document.createElement("div"); // Onde fica a busca e lista
    const containerScreenshots = document.createElement("div"); // Onde ficam os prints
    
    // Configuração inicial do container de screenshots
    Object.assign(containerScreenshots.style, { marginTop: "16px", borderTop: "1px dashed #ccc", paddingTop: "12px", display: "none" });
    const screenTitle = document.createElement("h4");
    Object.assign(screenTitle.style, { fontSize: "14px", fontWeight: "600", color: "#202124", margin: "0 0 12px 0" });
    screenTitle.textContent = "Evidências / Screenshots";
    const screenList = document.createElement("div");
    containerScreenshots.appendChild(screenTitle);
    containerScreenshots.appendChild(screenList);

    // --- INICIALIZAÇÃO ---
    function init() {
        containerTasks.innerHTML = '';

        // 1. Busca
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = "Buscar task...";
        Object.assign(searchInput.style, styles.searchInput);
        containerTasks.appendChild(searchInput);

        // 2. Chips (Populares)
        const chipsContainer = document.createElement("div");
        Object.assign(chipsContainer.style, styles.chipContainer);
        
        const popularTasks = Object.entries(TASKS_DB).filter(([_, t]) => t.popular);
        
        popularTasks.forEach(([key, task]) => {
            const chip = document.createElement("div"); chip.id = `chip-${key}`;
            const txt = document.createElement("span"); txt.textContent = task.name;
            const rmv = document.createElement("span"); rmv.textContent = "✕";
            Object.assign(rmv.style, styles.chipRemove);
            Object.assign(chip.style, styles.chip);
            
            // Eventos do Chip
            chip.onclick = () => toggleTask(key, 1); // 1 = Ativar/Incrementar
            rmv.onclick = (e) => { e.stopPropagation(); toggleTask(key, -1); }; // -1 = Decrementar/Remover

            // Hover no X
            rmv.onmouseover = () => rmv.style.backgroundColor = 'white';
            rmv.onmouseout = () => rmv.style.backgroundColor = 'rgba(255,255,255,0.6)';
            
            chip.append(txt, rmv);
            chipsContainer.appendChild(chip);
        });
        
        if(popularTasks.length > 0) containerTasks.appendChild(chipsContainer);

        // 3. Botão Ver Mais
        const toggleBtn = document.createElement("button");
        const iconDown = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#1a73e8"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>`;
        const iconUp = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#1a73e8"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>`;
        
        toggleBtn.innerHTML = `Ver lista completa (${Object.keys(TASKS_DB).length}) ${iconDown}`;
        Object.assign(toggleBtn.style, styles.linkBtn);
        
        toggleBtn.onmouseover = () => toggleBtn.style.backgroundColor = '#f1f8ff';
        toggleBtn.onmouseout = () => toggleBtn.style.backgroundColor = 'transparent';
        
        containerTasks.appendChild(toggleBtn);

        // 4. Lista Completa (Drawer)
        const listContainer = document.createElement("div");
        listContainer.id = "tm-list-scroll"; // ID interno para referência
        Object.assign(listContainer.style, styles.listContainer);

        for (const key in TASKS_DB) {
            const task = TASKS_DB[key];
            const label = document.createElement("label");
            label.className = "task-row-item"; // Classe para filtro
            Object.assign(label.style, styles.listItem);
            
            // Checkbox
            const chk = document.createElement("input"); 
            chk.type = "checkbox"; chk.value = key; chk.id = `chk-${key}`; chk.className = "task-checkbox";
            Object.assign(chk.style, { width: "auto", marginRight: "10px", cursor: "pointer", accentColor: "#1a73e8" });

            const name = document.createElement("span"); name.textContent = task.name; Object.assign(name.style, { flexGrow: "1" });

            // Stepper (+/-)
            const stepDiv = document.createElement("div"); stepDiv.className = "stepper-container"; Object.assign(stepDiv.style, styles.stepper);
            const bMinus = document.createElement("button"); bMinus.textContent = "−"; Object.assign(bMinus.style, styles.stepperBtn);
            const count = document.createElement("span"); count.className = "stepper-count"; count.textContent = "1"; Object.assign(count.style, styles.stepperCount);
            const bPlus = document.createElement("button"); bPlus.textContent = "+"; Object.assign(bPlus.style, styles.stepperBtn);

            // Eventos da Lista
            chk.onchange = () => toggleTask(key, chk.checked ? 1 : 0);
            bMinus.onclick = (e) => { e.preventDefault(); toggleTask(key, -1); };
            bPlus.onclick = (e) => { e.preventDefault(); toggleTask(key, 2); };

            // Hover
            label.onmouseover = () => { if(!chk.checked) label.style.backgroundColor = '#f8f9fa'; };
            label.onmouseout = () => { label.style.backgroundColor = chk.checked ? '#e8f0fe' : 'transparent'; };

            stepDiv.append(bMinus, count, bPlus);
            label.append(chk, name, stepDiv);
            listContainer.appendChild(label);
        }
        containerTasks.appendChild(listContainer);

        // Eventos de Busca e Toggle
        toggleBtn.onclick = () => {
            const isHidden = listContainer.style.display === "none";
            listContainer.style.display = isHidden ? "block" : "none";
            toggleBtn.innerHTML = isHidden ? `Ocultar lista ${iconUp}` : `Ver lista completa (${Object.keys(TASKS_DB).length}) ${iconDown}`;
        };

        searchInput.oninput = (e) => {
            const term = e.target.value.toLowerCase();
            if (term) {
                listContainer.style.display = "block";
                toggleBtn.style.display = "none";
            } else {
                listContainer.style.display = "none";
                toggleBtn.style.display = "flex";
                toggleBtn.innerHTML = `Ver lista completa (${Object.keys(TASKS_DB).length}) ${iconDown}`;
            }
            
            listContainer.querySelectorAll(".task-row-item").forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(term) ? "flex" : "none";
            });
        };
    }

    // --- LÓGICA DE CONTROLE ---
    
    function toggleTask(key, action) {
        // action: 1 (check/inc), -1 (dec), 2 (force inc), 0 (uncheck)
        const chk = containerTasks.querySelector(`#chk-${key}`);
        if (!chk) return;

        const label = chk.parentNode;
        const stepper = label.querySelector(".stepper-container");
        const counter = stepper.querySelector(".stepper-count");
        let val = parseInt(counter.textContent);

        if (action === 1) { // Toggle ou Incrementa
            if (!chk.checked) { chk.checked = true; val = 1; }
            else { val++; }
        } else if (action === 2) { // Força +
            val++;
        } else if (action === -1) { // Força -
            val--;
        } else if (action === 0) { // Desmarcar
            val = 0;
        }

        // Aplica estado visual
        if (val <= 0) {
            chk.checked = false;
            val = 1; // Reseta contador visual para 1
            stepper.style.display = 'none';
            label.style.backgroundColor = 'transparent';
        } else {
            chk.checked = true;
            stepper.style.display = 'flex';
            label.style.backgroundColor = '#e8f0fe';
        }
        counter.textContent = val;

        updateChip(key, chk.checked, val);
        renderScreenshots();
        
        // Notifica o pai
        if (onUpdateCallback) onUpdateCallback();
    }

    function updateChip(key, isChecked, count) {
        const chip = containerTasks.querySelector(`#chip-${key}`);
        if (!chip) return;
        const txt = chip.querySelector("span:first-child");
        const rmv = chip.querySelector("span:last-child");
        const baseName = TASKS_DB[key].name;

        if (isChecked) {
            Object.assign(chip.style, styles.chipSelected);
            txt.textContent = count > 1 ? `${baseName} (${count})` : baseName;
            rmv.style.display = "flex";
        } else {
            Object.assign(chip.style, styles.chip);
            txt.textContent = baseName;
            rmv.style.display = "none";
        }
    }

    function renderScreenshots() {
        screenList.innerHTML = "";
        const checked = Array.from(containerTasks.querySelectorAll(".task-checkbox:checked"));
        
        if (checked.length === 0) {
            containerScreenshots.style.display = "none";
            return;
        }

        const isEducation = currentSubStatus && currentSubStatus.includes('Education');
        const type = isEducation ? 'education' : 'implementation';
        let hasAny = false;

        checked.forEach(chk => {
            const task = TASKS_DB[chk.value];
            const count = parseInt(chk.parentNode.querySelector(".stepper-count").textContent);
            const prints = task.screenshots ? (task.screenshots[type] || []) : [];

            if (prints.length > 0) {
                hasAny = true;
                // Bloco Cinza
                const block = document.createElement("div");
                Object.assign(block.style, { marginBottom: '12px', background: '#f8f9fa', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0' });
                block.innerHTML = `<strong style="color:#5f6368">${task.name}</strong> <small style="color:#1a73e8">(${count}x)</small>`;
                
                for(let i=1; i<=count; i++) {
                    // Card Branco
                    const card = document.createElement("div");
                    Object.assign(card.style, { background: 'white', padding: '12px', borderRadius: '6px', marginTop: '8px', border: '1px solid #dadce0' });
                    
                    // Nome Editável
                    const nameBox = document.createElement("div");
                    Object.assign(nameBox.style, { display: 'flex', alignItems: 'center', marginBottom: '8px', gap: '6px' });
                    const pen = document.createElement("span"); pen.textContent = "✎"; Object.assign(pen.style, { fontSize: '14px', color: '#9aa0a6', cursor: 'pointer' });
                    
                    const input = document.createElement("input"); 
                    input.id = `name-${chk.value}-${i}`;
                    input.value = `${task.name}${count > 1 ? ' #'+i : ''}`;
                    Object.assign(input.style, styles.screenshotInput, { fontWeight: '600', color: '#1a73e8', marginBottom: '0' });
                    
                    pen.onclick = () => input.focus();
                    nameBox.append(pen, input);
                    card.appendChild(nameBox);

                    // Inputs
                    prints.forEach((req, idx) => {
                        const row = document.createElement("div");
                        row.innerHTML = `<div style="font-size:11px; color:#5f6368; margin-bottom:2px">📷 ${req}:</div>`;
                        const pInput = document.createElement("input");
                        pInput.id = `screen-${chk.value}-${i}-${idx}`;
                        pInput.placeholder = "Cole o link...";
                        Object.assign(pInput.style, styles.screenshotInput);
                        row.appendChild(pInput);
                        card.appendChild(row);
                    });
                    block.appendChild(card);
                }
                screenList.appendChild(block);
            }
        });
        containerScreenshots.style.display = hasAny ? "block" : "none";
    }

    // Inicializa a UI interna
    init();

    // --- API PÚBLICA ---
    return {
        selectionElement: containerTasks,       // Coloque no Step 2
        screenshotsElement: containerScreenshots, // Coloque no Step 3
        
        updateSubStatus: (newSubStatus) => {
            currentSubStatus = newSubStatus;
            renderScreenshots(); // Re-renderiza pois pode mudar de Education p/ Imp
        },
        
        reset: () => {
            const checked = containerTasks.querySelectorAll(".task-checkbox:checked");
            checked.forEach(c => toggleTask(c.value, 0)); // 0 = uncheck
            renderScreenshots();
        },

        // Retorna os elementos marcados para o Controller principal verificar
        getCheckedElements: () => Array.from(containerTasks.querySelectorAll(".task-checkbox:checked"))
    };
}