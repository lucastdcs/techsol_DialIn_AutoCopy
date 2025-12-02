import { 
    makeDraggable,
    styleSelect,
    styleLabel,
    stylePopup,
    stylePopupHeader,
    stylePopupTitle,
    stylePopupCloseBtn,
    stylePopupVersion,
    styleCredit,
    typeBtnStyle,          
    getRandomGoogleStyle    
} from '../shared/utils.js';

import { createStandardHeader } from '../shared/header-factory.js';
import { animationStyles, togglePopupAnimation } from '../shared/animations.js';
import { csaChecklistData } from './call-script-data.js';

export function initCallScriptAssistant() {
    const CURRENT_VERSION = "v1.2.7"; 

    // --- Dados e Estado ---
    const csaCompletedTasks = {};
    let csaCurrentLang = "PT";
    let csaCurrentType = "BAU";

    // --- UI: Botão Flutuante (Material Design Pro) ---
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
        position: "fixed", bottom: "30%", right: "24px", zIndex: "9999",
        display: "flex", alignItems: "center", flexDirection: "row-reverse", gap: "12px"
    });

    const btn = document.createElement("button");
    btn.id = "script-floating-btn";
    btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M21,12.22C21,6.73,16.74,2.2,11.5,2.2C6.4,2.2,2.3,6.49,2.3,11.77C2.3,13.82,2.95,15.73,4.06,17.3L3,21L7.08,19.5C8.45,20.02,9.95,20.32,11.5,20.32C16.74,20.32,21,15.81,21,12.22M15,12H16.5C16.5,13.38,15.38,14.5,14,14.5V16H18V12H15V12M9,12H10V16H9V12M13,12V16H11V12H13M13,9.5C13,8.67,12.33,8,11.5,8C10.67,8,10,8.67,10,9.5H8.5C8.5,7.84,9.84,6.5,11.5,6.5C13.16,6.5,14.5,7.84,14.5,9.5H13Z"/></svg>`;

    Object.assign(btn.style, {
        width: "48px", height: "48px", borderRadius: "50%",
        background: "#9c27b0", color: "white", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 12px rgba(156, 39, 176, 0.4)", // Roxo
        transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s"
    });

    const tooltip = document.createElement("span");
    tooltip.textContent = "Call Scripts";
    Object.assign(tooltip.style, {
        background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 8px",
        borderRadius: "4px", fontSize: "12px", opacity: "0", pointerEvents: "none",
        transition: "opacity 0.2s", whiteSpace: "nowrap", fontWeight: "500"
    });

    btn.onmouseenter = () => {
        btn.style.transform = "scale(1.1)";
        btn.style.boxShadow = "0 6px 16px rgba(156, 39, 176, 0.5)";
        tooltip.style.opacity = "1";
    };
    btn.onmouseleave = () => {
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "0 4px 12px rgba(156, 39, 176, 0.4)";
        tooltip.style.opacity = "0";
    };

    btnContainer.appendChild(btn);
    btnContainer.appendChild(tooltip);
    document.body.appendChild(btnContainer);
    
    // CORREÇÃO: Arrastar o container inteiro
    makeDraggable(btnContainer);

  // --- POPUP (Com Animação) ---
    const csaPopup = document.createElement("div");
    csaPopup.id = "call-script-popup";
    
    // Estilos base + Estado Inicial Animação
    Object.assign(csaPopup.style, stylePopup, { 
        right: "80px" 
    }, animationStyles.popupInitial);

    // Refs para animação
    const animRefs = { popup: csaPopup, btnContainer, googleLine: null };
    let csaVisible = false;

    // 1. HEADER (Factory)
const csaHeader = createStandardHeader(
        csaPopup,
        "Call Script Assistant",
        CURRENT_VERSION,
        "Checklists guiados para início e fim de chamada em PT, ES e EN. Marque os itens conforme fala com o cliente.", // <--- NOVO
        animRefs,
        () => { csaVisible = false; }
    );
    csaPopup.appendChild(csaHeader);

    // 2. CONTEÚDO
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

    // --- Lógica Auxiliar ---
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

btn.onclick = () => {
        if (btnContainer.getAttribute('data-dragging') === 'true') return; 

        csaVisible = !csaVisible;
        togglePopupAnimation(csaVisible, animRefs);
    };

    function setActiveType(type) {
         csaCurrentType = type;
         
         const newActiveStyle = getRandomGoogleStyle();
         
         Object.assign(csaTypeBAU.style, typeBtnStyle);
         Object.assign(csaTypeLT.style, typeBtnStyle);

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
    setActiveType(csaCurrentType);

}