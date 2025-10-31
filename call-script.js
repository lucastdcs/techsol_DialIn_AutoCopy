

// Importa as funções e estilos necessários do utils.js
import { 
    makeDraggable,
    styleSelect,
    styleLabel,
    stylePopup,
    stylePopupHeader,
    stylePopupTitle,
    stylePopupCloseBtn,
    styleFloatingButton,
    stylePopupVersion, // Importa os novos estilos
    styleCredit        // Importa os novos estilos
} from 'utils';

// Envolve todo o módulo em uma função exportada
export function initCallScriptAssistant() {
    const CURRENT_VERSION = "v1.1"; // Defina a versão aqui

    // --- Dados e Estado (Módulo 2) ---
    const csaChecklistData = {
        "PT BAU": {
            color: "#6c1199",
            inicio: ["Apresentação (Nome e Time)", "A ligação poderá ser gravada para fins de treinamento e qualidade de acordo com nossa política de privacidade.", "Informar site registrado no caso", "Confirmar os 10 dígitos do CID e e-mail do anunciante.", "Confirmar a task e o AM", "Informar tempo da ligação", "Confirmar backup e acessos admin", "Fechar conteúdo sensível", ],
            fim: ["Resumo da chamada.", "Ajuda Adicional.", "Fechar compartilhamento de tela.", "Próximos passos (quanto tempo irá acompanhar o caso).", "Pesquisa de Satisfação.", "Durante esse tempo, nossa equipede qualidade poderá realizar um teste de conversão para validar a implementação. Você concorda com esse teste para garantirmos a efetividade da implementação?"]
        },
        "PT LT": {
            color: "#004f67",
            inicio: ["Apresentação (Nome e Time)", "Tempo de ligação", "Informar o site fornecido pelo AM", "Confirmar os 10 dígitos do CID e e-mail do anunciante.", "Confirmar a Task e o AM", "Termos e condições.", "Confirmar acessos Admin e Backup", "Fechar conteúdo sensível"],
            fim: ["Resumo da chamada", "Ajuda adicional", "Fechar compartilhamento de tela","Próximos passos (quanto tempo irá acompanhar)", "Pesquisa de satisfação", "Durante esse tempo, nossa equipe de qualidade poderá realizar um teste de conversão para validar a implementação. Você concorda com esse teste para garantirmos a efetividade da implemetação?"]
        },
        "ES BAU": {
            color: "#00bbff",
            inicio: ["Introducción (Nombre y  Equipo).", "La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra política de privacidad.", "Informar sitio web registrado en el caso.", "Confirmación: Solicitar al Anunciante que confirme los 10 dígitos del CID el email del anunciante.", "Confirmaciones: Tarea, AM", "Informar el tiempo que va a durar la reunión.", "Confirmación: Copia de seguridad y acceso de ADM", "Cerrar conteúdo sensível antes de compartir la pantalla.", ],
            fim: ["Resumen de la llamada.", "Ayuda adicional.", "Cerrar la pantalla compartida.", "Próximos passos (¿Cuánto tempo seguirá el caso?)", "Encuesta de satisfacción.", "Estaré monitoreando su caso durante XX días para asegurarme de que todo esté funcionando correctamente. Durante este tiempo, nuestro equipo de qualidade podría realizar una prueba de conversión para validar la implementación. ¿Estás de acuerdo con esta prueba para garantizar la efectividad de la implementación? Perfecto, ¡gracias!", ]
        },
        "ES LT": {
            color: "#f269ff",
            inicio: ["Presentación (Nombre y equipo).", "Informar al cliente sobre la llamada grabada.", "Tiempo de duración de la llamada.", "Solicitar al anunciante que confirme lo siguiente: \n A) 10 dígitos de la cuenta \n B) Correo electrónico \n C) Número de teléfono y \n D) Nombre del sitio web.", "autenticar la cuenta del anunciante en el cases, si corresponde.", "Términos y condições.", "Informar las Task solicitadas y AM.", "Cerrar contenido sensible.", "Confirmación de copia de seguridad y acceso de administrador a las ferramentas.", "Resumen de llamada."],
            fim: ["Ofrecer ayuda adicional.", "Dejar de compartir la pantalla.", "Pasos siguientes  (Si se le hará seguimiento al caso).", "Encuesta de Satisfacción.", "Informar al cliente que el equipo de QA irá a realizar pruebas en los siguientes dias."]
        },
        "EN BAU": {
            color: "#ff0011",
            inicio: ["Example 1", "Example 2"],
            fim: ["Example 3", "Example 4"]
        }
    };
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
    csaBtn.onmouseenter = () => (csaBtn.style.background = "#4a4d50");
    csaBtn.onmouseleave = () => (csaBtn.style.background = "#5f6368");
    document.body.appendChild(csaBtn);
    makeDraggable(csaBtn);

    const csaPopup = document.createElement("div");
    csaPopup.id = "call-script-popup";
    Object.assign(csaPopup.style, stylePopup, { right: "80px" });

    const csaHeader = document.createElement("div");
    Object.assign(csaHeader.style, stylePopupHeader);
    const csaLogo = document.createElement("div");
    csaLogo.textContent = "📋";
    Object.assign(csaLogo.style, { fontSize: "20px" });
    
    // --- NOVO CABEÇALHO COM VERSÃO E TÍTULO ---
    const titleContainer = document.createElement("div");
    Object.assign(titleContainer.style, { display: 'flex', flexDirection: 'column', flexGrow: '1' });
    const csaTitle = document.createElement("div");
    csaTitle.textContent = "Call Script Assistant";
    Object.assign(csaTitle.style, stylePopupTitle);
    titleContainer.appendChild(csaTitle);

    const versionDisplay = document.createElement("div");
    versionDisplay.textContent = CURRENT_VERSION;
    Object.assign(versionDisplay.style, stylePopupVersion);
    titleContainer.appendChild(versionDisplay);
    
    csaHeader.appendChild(csaLogo);
    csaHeader.appendChild(titleContainer);
    // --- FIM DO NOVO CABEÇALHO ---
    
    csaPopup.appendChild(csaHeader);
    makeDraggable(csaPopup, csaHeader);

    const csaCloseBtn = document.createElement("div");
    csaCloseBtn.textContent = "✕";
    Object.assign(csaCloseBtn.style, stylePopupCloseBtn);
    csaCloseBtn.onclick = () => csaTogglePopup(false);
    csaPopup.appendChild(csaCloseBtn);

    const csaContent = document.createElement("div");
    csaContent.id = "csa-content";
    Object.assign(csaContent.style, {
        padding: "0 16px 16px 16px",
        overflowY: "auto",
        flexGrow: "1"
    });
    csaPopup.appendChild(csaContent);

    // --- NOVO CRÉDITO ---
    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, styleCredit);
    csaPopup.appendChild(credit);
    // --- FIM DO CRÉDITO ---

    const csaControlsDiv = document.createElement("div");
    Object.assign(csaControlsDiv.style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '8px' });

    const csaTypeContainer = document.createElement("div");
    Object.assign(csaTypeContainer.style, { display: 'flex', borderRadius: '8px', border: '1px solid #dadce0', overflow: 'hidden' });

    const csaTypeBAU = document.createElement("div");
    csaTypeBAU.textContent = "BAU";
    const csaTypeLT = document.createElement("div");
    csaTypeLT.textContent = "LT";

    const typeBtnStyle = { padding: '6px 12px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#5f6368', background: '#f8f9fa', transition: 'all 0.2s ease' };
    Object.assign(csaTypeBAU.style, typeBtnStyle);
    Object.assign(csaTypeLT.style, typeBtnStyle);

    csaTypeContainer.appendChild(csaTypeBAU);
    csaTypeContainer.appendChild(csaTypeLT);

    const csaLangSelect = document.createElement("select");
    Object.assign(csaLangSelect.style, styleSelect, { marginBottom: '0', width: 'auto', padding: '6px' });
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

    // A FUNÇÃO makeDraggable() FOI REMOVIDA DAQUI. ELA AGORA É IMPORTADA.

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
            li.style.backgroundColor = hexToRgba(color, 0.1);
        } else {
            li.style.borderColor = 'transparent';
            li.style.backgroundColor = '#f8f9fa';
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
         csaTypeBAU.style.background = (type === 'BAU') ? '#e8f0fe' : '#f8f9fa';
         csaTypeBAU.style.color = (type === 'BAU') ? '#1967d2' : '#5f6368';
         csaTypeLT.style.background = (type === 'LT') ? '#e8f0fe' : '#f8f9fa';
         csaTypeLT.style.color = (type === 'LT') ? '#1967d2' : '#5f6368';
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

} // Fim do initCallScriptAssistant()