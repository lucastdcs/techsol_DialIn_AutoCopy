// src/modules/call-script/call-script-assistant.js

// CORREÇÃO: Usando caminhos relativos corretos
import { 
    makeDraggable,
    styleSelect,
    styleLabel,
    stylePopup,
    stylePopupHeader,
    stylePopupTitle,
    stylePopupCloseBtn,
    styleFloatingButton,
    stylePopupVersion,
    styleCredit,
    typeBtnStyle,           // <-- Importa o estilo INATIVO
    getRandomGoogleStyle    // <-- Importa a NOVA FUNÇÃO
} from '../shared/utils.js';

// CORREÇÃO: Usando caminhos relativos corretos
import { csaChecklistData } from './call-script-data.js';

export function initCallScriptAssistant() {
    const CURRENT_VERSION = "v1.2.7"; 

    // --- Dados e Estado (Módulo 2) ---
    const csaCompletedTasks = {};
    let csaCurrentLang = "PT";
    let csaCurrentType = "BAU";

    // --- UI (Módulo 2) ---
    const csaBtn = document.createElement("button");
    csaBtn.id = "call-script-floating-btn";
    csaBtn.textContent = "📋";
    Object.assign(csaBtn.style, styleFloatingButton, {
        top: "70%",
        background: "#5f6368"
    });
    csaBtn.onmouseenter = () => { // Animação
        csaBtn.style.background = "#4a4d50";
        csaBtn.style.transform = "scale(1.1)";
    };
    csaBtn.onmouseleave = () => { // Animação
        csaBtn.style.background = "#5f6368";
        csaBtn.style.transform = "scale(1)";
    };
    document.body.appendChild(csaBtn);
    makeDraggable(csaBtn);

    const csaPopup = document.createElement("div");
    csaPopup.id = "call-script-popup";
    Object.assign(csaPopup.style, stylePopup, { right: "80px" });

    // --- Header ---
    const csaHeader = document.createElement("div");
    Object.assign(csaHeader.style, stylePopupHeader);
    makeDraggable(csaPopup, csaHeader);

    const csaHeaderLeft = document.createElement("div");
    Object.assign(csaHeaderLeft.style, { display: 'flex', alignItems: 'center', gap: '10px' });
    
    const csaLogo = document.createElement("div");
    csaLogo.textContent = "📋";
    Object.assign(csaLogo.style, { fontSize: "20px" });
    
    const titleContainer = document.createElement("div");
    Object.assign(titleContainer.style, { display: 'flex', flexDirection: 'column' });
    const csaTitle = document.createElement("div");
    csaTitle.textContent = "Call Script Assistant";
    Object.assign(csaTitle.style, stylePopupTitle);
    titleContainer.appendChild(csaTitle);

    const versionDisplay = document.createElement("div");
    versionDisplay.textContent = CURRENT_VERSION;
    Object.assign(versionDisplay.style, stylePopupVersion);
    titleContainer.appendChild(versionDisplay);
    
    csaHeaderLeft.appendChild(csaLogo);
    csaHeaderLeft.appendChild(titleContainer);
    
    const csaHeaderRight = document.createElement("div");
    Object.assign(csaHeaderRight.style, { display: 'flex', alignItems: 'center' });

    const csaCloseBtn = document.createElement("div");
    csaCloseBtn.textContent = "✕";
    csaCloseBtn.classList.add('no-drag');
    Object.assign(csaCloseBtn.style, stylePopupCloseBtn);
    csaCloseBtn.onclick = () => csaTogglePopup(false);
    csaCloseBtn.onmouseover = () => csaCloseBtn.style.backgroundColor = '#e8eaed';
    csaCloseBtn.onmouseout = () => csaCloseBtn.style.backgroundColor = 'transparent';
    csaHeaderRight.appendChild(csaCloseBtn);
    
    csaPopup.appendChild(csaHeader);
    csaHeader.appendChild(csaHeaderLeft);
    csaHeader.appendChild(csaHeaderRight);
    // --- Fim do Header ---

    const csaContent = document.createElement("div");
    csaContent.id = "csa-content";
    Object.assign(csaContent.style, {
        padding: "16px", 
        overflowY: "auto",
        flexGrow: "1"
    });
    csaPopup.appendChild(csaContent);

    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, styleCredit);
    csaPopup.appendChild(credit);

    const csaControlsDiv = document.createElement("div");
    Object.assign(csaControlsDiv.style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '8px' });

    const csaTypeContainer = document.createElement("div");
    Object.assign(csaTypeContainer.style, { display: 'flex', borderRadius: '8px', border: '1px solid #dadce0', overflow: 'hidden' });

    const csaTypeBAU = document.createElement("div");
    csaTypeBAU.textContent = "BAU";
    const csaTypeLT = document.createElement("div");
    csaTypeLT.textContent = "LT";

    Object.assign(csaTypeBAU.style, typeBtnStyle);
    Object.assign(csaTypeLT.style, typeBtnStyle);

    csaTypeContainer.appendChild(csaTypeBAU);
    csaTypeContainer.appendChild(csaTypeLT);
    
    csaTypeBAU.onmouseover = () => { if (csaCurrentType !== 'BAU') csaTypeBAU.style.backgroundColor = '#f1f3f4'; };
    csaTypeBAU.onmouseout = () => { if (csaCurrentType !== 'BAU') csaTypeBAU.style.backgroundColor = '#f8f9fa'; };
    csaTypeLT.onmouseover = () => { if (csaCurrentType !== 'LT') csaTypeLT.style.backgroundColor = '#f1f3f4'; };
    csaTypeLT.onmouseout = () => { if (csaCurrentType !== 'LT') csaTypeLT.style.backgroundColor = '#f8f9fa'; };

    const csaLangSelect = document.createElement("select");
    Object.assign(csaLangSelect.style, styleSelect, { 
        marginBottom: '0', 
        width: 'auto', 
        minWidth:'85px',
        paddingTop: '6px',
        paddingBottom: '6px'
    });
    csaLangSelect.innerHTML = `<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>`;
    csaLangSelect.value = csaCurrentLang;

    csaControlsDiv.appendChild(csaTypeContainer);
    csaControlsDiv.appendChild(csaLangSelect);
    csaContent.appendChild(csaControlsDiv);

    const csaChecklistArea = document.createElement("div");
    csaChecklistArea.id = "csa-checklist-area";
    Object.assign(csaChecklistArea.style, {
        maxHeight: "60vh",
        overflowY: "auto",
        paddingRight: "5px"
    });
    csaContent.appendChild(csaChecklistArea);
    document.body.appendChild(csaPopup);

    // --- Lógica (Módulo 2) ---
    
    function hexToRgba(hex, alpha) {
        const clean = hex.replace("#","");
        const r = parseInt(clean.substring(0,2),16);
        const g = parseInt(clean.substring(2,4),16);
        const b = parseInt(clean.substring(4,6),16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function csaTogglePopup(show) {
        if (show) {
            csaPopup.style.opacity = "1";
            csaPopup.style.pointerEvents = "auto";
            csaPopup.style.transform = "scale(1)";
        } else {
            csaPopup.style.opacity = "0";
            csaPopup.style.pointerEvents = "none";
            csaPopup.style.transform = "scale(0.95)";
        }
    }

    function csaSetLiStyle(li, isCompleted, color) {
        li.classList.toggle('csa-completed', isCompleted);

        if (isCompleted) {
            li.style.borderColor = color;
            li.style.backgroundColor = hexToRgba(color, 0.4);
            li.style.textDecorationLine = 'line-through';
        } else {
            li.style.borderColor = 'transparent';
            li.style.backgroundColor = '#f8f9fa';
            li.style.textDecorationLine = 'none';
        }
    }

    function checkGroupCompletion(combinedKey, groupKey, groupDiv) {
        const data = csaChecklistData[combinedKey];
        if (!data) return;
        const items = data[groupKey];
        if (!items || items.length === 0) return;
        let allDone = true;
        for (let i = 0; i < items.length; i++) {
            const key = `${combinedKey}-${groupKey}-${i}`;
            if (!csaCompletedTasks[key]) {
                allDone = false;
                break;
            }
        }
        groupDiv.classList.toggle('csa-group-completed', allDone);
    }

    function csaBuildChecklist() {
        csaChecklistArea.innerHTML = "";
        const combinedKey = `${csaCurrentLang} ${csaCurrentType}`;
        const data = csaChecklistData[combinedKey];

        if (!data) {
            csaChecklistArea.innerHTML = `<div style="padding: 10px; color: #5f6368; font-family: 'Poppins', sans-serif;">Script não disponível para esta combinação.</div>`;
            return;
        }

        const color = data.color;

        ['inicio', 'fim'].forEach(groupKey => {
            const items = data[groupKey];
            if (!items || items.length === 0) return;

            const groupDiv = document.createElement('div');
            groupDiv.className = 'csa-group-container';
            Object.assign(groupDiv.style, { marginBottom: '16px' });

            const groupTitle = document.createElement('div');
            groupTitle.className = 'csa-group-title';
            let titleText = groupKey === 'inicio' ? 'Início' : 'Fim';
            if (csaCurrentLang.includes("ES")) titleText = groupKey === 'inicio' ? 'Inicio' : 'Fin';
            if (csaCurrentLang.includes("EN")) titleText = groupKey === 'inicio' ? 'Start' : 'End';

            groupTitle.textContent = titleText;
            Object.assign(groupTitle.style, styleLabel, {
                fontWeight: "600",
                fontSize: "14px",
                textDecoration: "underline",
                marginBottom: "8px"
            });
            groupDiv.appendChild(groupTitle);

            const list = document.createElement("ul");
            Object.assign(list.style, { listStyle: 'none', paddingLeft: '0', margin: '0' });

            items.forEach((item, index) => {
                const li = document.createElement("li");
                li.className = 'csa-li';
                li.textContent = item;

                const key = `${combinedKey}-${groupKey}-${index}`;
                const done = !!csaCompletedTasks[key];

                csaSetLiStyle(li, done, color);

                li.addEventListener("click", () => {
                    const newDone = !csaCompletedTasks[key];
                    csaCompletedTasks[key] = newDone;
                    csaSetLiStyle(li, newDone, color);
                    checkGroupCompletion(combinedKey, groupKey, groupDiv);
                });
                list.appendChild(li);
            });
            groupDiv.appendChild(list);
            csaChecklistArea.appendChild(groupDiv);

            checkGroupCompletion(combinedKey, groupKey, groupDiv);
        });
    }

    // --- Event Handlers (Módulo 2) ---
    let csaVisible = false;
    csaBtn.onclick = () => {
        csaVisible = !csaVisible;
        csaTogglePopup(csaVisible);
    };

    function setActiveType(type) {
         csaCurrentType = type;
         
         // ===== ATUALIZAÇÃO: Sorteia uma cor nova =====
         const newActiveStyle = getRandomGoogleStyle();
         // ===========================================
         
         // Reseta ambos para o estilo inativo
         Object.assign(csaTypeBAU.style, typeBtnStyle);
         Object.assign(csaTypeLT.style, typeBtnStyle);

         // Aplica o estilo ATIVO (e aleatório) ao botão correto
         if (type === 'BAU') {
             Object.assign(csaTypeBAU.style, newActiveStyle);
         } else {
             Object.assign(csaTypeLT.style, newActiveStyle);
         }
         csaBuildChecklist();
    }

    csaTypeBAU.onclick = () => setActiveType('BAU');
    csaTypeLT.onclick = () => setActiveType('LT');

    csaLangSelect.addEventListener("change", (e) => {
        csaCurrentLang = e.target.value;
        csaBuildChecklist();
    });

    // Carregamento inicial
    setActiveType(csaCurrentType); // Aplica a primeira cor

} // Fim do initCallScriptAssistant()