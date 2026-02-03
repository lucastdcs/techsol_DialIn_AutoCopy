// src/modules/timezone/timezone-assistant.js

import { stylePopup, styleSelect, showToast } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { SoundManager } from "../shared/sound-manager.js";

const PINNED_STORAGE_KEY = "cw_timezone_pinned";

const HUBS = [
    // --- EUROPA (Foco Ibérico) ---
    { id: 'pt', name: 'Portugal', flag: '🇵🇹', zone: 'Europe/Lisbon', label: 'Lisboa' },
    { id: 'es', name: 'Espanha', flag: '🇪🇸', zone: 'Europe/Madrid', label: 'Madrid' },

    // --- AMÉRICA DO SUL ---
    { id: 'ar', name: 'Argentina', flag: '🇦🇷', zone: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires' },
    { id: 'bo', name: 'Bolívia', flag: '🇧🇴', zone: 'America/La_Paz', label: 'La Paz' },
    { id: 'cl', name: 'Chile', flag: '🇨🇱', zone: 'America/Santiago', label: 'Santiago' },
    { id: 'co', name: 'Colômbia', flag: '🇨🇴', zone: 'America/Bogota', label: 'Bogotá' },
    { id: 'ec', name: 'Equador', flag: '🇪🇨', zone: 'America/Guayaquil', label: 'Guayaquil' },
    { id: 'py', name: 'Paraguai', flag: '🇵🇾', zone: 'America/Asuncion', label: 'Assunção' },
    { id: 'pe', name: 'Peru', flag: '🇵🇪', zone: 'America/Lima', label: 'Lima' },
    { id: 'uy', name: 'Uruguai', flag: '🇺🇾', zone: 'America/Montevideo', label: 'Montevidéu' },
    { id: 've', name: 'Venezuela', flag: '🇻🇪', zone: 'America/Caracas', label: 'Caracas' },

    // --- AMÉRICA DO NORTE & CENTRAL ---
    { id: 'mx', name: 'México', flag: '🇲🇽', zone: 'America/Mexico_City', label: 'CDMX' },
    { id: 'cr', name: 'Costa Rica', flag: '🇨🇷', zone: 'America/Costa_Rica', label: 'San José' },
    { id: 'sv', name: 'El Salvador', flag: '🇸🇻', zone: 'America/El_Salvador', label: 'San Salvador' },
    { id: 'gt', name: 'Guatemala', flag: '🇬🇹', zone: 'America/Guatemala', label: 'C. da Guatemala' },
    { id: 'hn', name: 'Honduras', flag: '🇭🇳', zone: 'America/Tegucigalpa', label: 'Tegucigalpa' },
    { id: 'ni', name: 'Nicarágua', flag: '🇳🇮', zone: 'America/Managua', label: 'Manágua' },
    { id: 'pa', name: 'Panamá', flag: '🇵🇦', zone: 'America/Panama', label: 'C. do Panamá' },
    { id: 'do', name: 'Rep. Dominicana', flag: '🇩🇴', zone: 'America/Santo_Domingo', label: 'Santo Domingo' },
    { id: 'pr', name: 'Porto Rico', flag: '🇵🇷', zone: 'America/Puerto_Rico', label: 'San Juan' }
];

export function initTimezoneAssistant() {
    const CURRENT_VERSION = "v2.1 "; // Bump version
    let visible = false;
    let updateInterval = null;
    
    // Estado
    let selectedHubId = 'mx'; 
    let pinnedHubs = JSON.parse(localStorage.getItem(PINNED_STORAGE_KEY) || "[]");
    
    // Data Base para o Planejador (Começa hoje 14h)
    let plannerDate = new Date();
    plannerDate.setHours(14, 0, 0, 0);

    // --- DESIGN SYSTEM (GOOGLE COLORS & APPLE FEEL) ---
    const COLORS = {
        bg: "#F8F9FA",           // Google Grey 50
        surface: "#FFFFFF",
        primary: "#1A73E8",      // Google Blue 600
        primaryBg: "#E8F0FE",    // Google Blue 50
        text: "#202124",         // Google Grey 900
        textSub: "#5F6368",      // Google Grey 700
        border: "#DADCE0",       // Google Grey 300
        success: "#1E8E3E",      // Google Green 700
        successBg: "#E6F4EA",    // Google Green 50
        warning: "#E37400",      // Google Yellow 800
        warningBg: "#FEF7E0",    // Google Yellow 50
        error: "#D93025",        // Google Red 600
        errorBg: "#FCE8E6",      // Google Red 50
        night: "#1F2937",        // Azul noturno
        day: "#FFF7ED"           // Laranja solar
    };

    const styles = {
        // Layout
        container: { 
            display: 'flex', flexDirection: 'column', height: '100%', 
            background: COLORS.bg, fontFamily: "'Google Sans', Roboto, sans-serif" 
        },
        
        // Tabs (Estilo Segmented Control do iOS)
        tabHeader: { 
            display: 'flex', background: COLORS.surface, 
            borderBottom: `1px solid ${COLORS.border}`, padding: '8px 16px' 
        },
        tabBtn: { 
            flex: 1, padding: '10px', textAlign: 'center', cursor: 'pointer', 
            fontSize: '13px', fontWeight: '500', color: COLORS.textSub, 
            borderRadius: '8px', transition: 'all 0.2s ease',
            background: 'transparent', userSelect: 'none'
        },
        tabActive: { 
            color: COLORS.primary, background: COLORS.primaryBg, fontWeight: '600' 
        },

        // Live View (Lista Limpa)
        listContainer: { 
            padding: '16px', overflowY: 'auto', flex: 1, 
            display: 'flex', flexDirection: 'column', gap: '12px',
            scrollbarWidth: 'none' // Firefox
        },
        hubCard: { 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
            padding: '16px 20px', background: COLORS.surface, borderRadius: '16px', 
            border: `1px solid transparent`, // Borda transparente para transição suave
            boxShadow: '0 2px 6px rgba(60,64,67,0.05)', // Sombra Google suave
            transition: 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease, border-color 0.2s',
            cursor: 'pointer', position: 'relative', overflow: 'hidden'
        },
        hubCardPinned: { 
            borderLeft: `4px solid ${COLORS.primary}`, // Indicador visual claro
            paddingLeft: '16px' 
        },
        
        // Planner View
        plannerWrapper: { 
            padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', 
            flex: 1, overflowY: 'auto' 
        },
        
        // Time Cards (Cards Grandes e Claros)
        timeComparisonRow: { display: 'flex', gap: '16px', alignItems: 'stretch' },
        timeCard: { 
            flex: 1, padding: '20px', borderRadius: '20px', background: COLORS.surface, 
            border: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column', 
            alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(60,64,67,0.05)',
            transition: 'transform 0.2s'
        },
        
        // Timeline Slider (Estilo iOS Slider)
        timelineContainer: { position: 'relative', height: '60px', marginTop: '16px', userSelect: 'none' },
        timelineTrack: { 
            position: 'absolute', top: '26px', left: '0', right: '0', height: '6px', 
            borderRadius: '3px', background: '#E0E0E0', overflow: 'hidden' 
        },
        dayZone: { 
            position: 'absolute', top: '0', bottom: '0', left: '37.5%', width: '37.5%', 
            background: 'rgba(52, 168, 83, 0.3)', pointerEvents: 'none' // Verde Google
        },
        
        // Inputs & Displays
        hdInput: {
            fontSize: '28px', fontWeight: '700', color: COLORS.text, border: 'none', 
            background: 'transparent', width: '100%', textAlign: 'center', outline: 'none',
            fontFamily: "'Google Sans', sans-serif", cursor: 'text'
        },
        
        // Status Badge (Pílula Informativa)
        statusBadge: {
            padding: '8px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '600',
            display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px',
            alignSelf: 'center', transition: 'background-color 0.3s'
        }
    };

    // --- POPUP ---
    const popup = document.createElement("div");
    popup.id = "timezone-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, { 
        right: "100px", width: "450px", height: "720px", overflow: "hidden", 
        borderRadius: "24px" // Mais arredondado (Apple style)
    });

    const animRefs = { popup };
    const header = createStandardHeader(
        popup, "Time Zone Traveler", CURRENT_VERSION,
        "Monitoramento global e planejamento de chamadas.",
        animRefs, () => toggleVisibility()
    );
    popup.appendChild(header);

    const container = document.createElement("div");
    Object.assign(container.style, styles.container);
    popup.appendChild(container);

    // --- TABS ---
    const tabContainer = document.createElement("div");
    Object.assign(tabContainer.style, styles.tabHeader);
    
    const btnLive = document.createElement("div");
    btnLive.textContent = "Monitoramento";
    Object.assign(btnLive.style, styles.tabBtn, styles.tabActive);
    
    const btnPlan = document.createElement("div");
    btnPlan.textContent = "Planejador";
    Object.assign(btnPlan.style, styles.tabBtn);

    tabContainer.appendChild(btnLive);
    tabContainer.appendChild(btnPlan);
    container.appendChild(tabContainer);

    // --- VIEWS ---
    const viewLive = document.createElement("div");
    Object.assign(viewLive.style, styles.listContainer);
    // Esconde scrollbar nativa
    viewLive.style.cssText += `
        &::-webkit-scrollbar { display: none; }
        -ms-overflow-style: none;
    `;
    
    const viewPlan = document.createElement("div");
    Object.assign(viewPlan.style, styles.plannerWrapper, { display: 'none' });

    container.appendChild(viewLive);
    container.appendChild(viewPlan);

    // --- LOGICA TABS ---
    btnLive.onclick = () => switchTab('live');
    btnPlan.onclick = () => switchTab('plan');

    function switchTab(tab) {
        SoundManager.playClick();
        if (tab === 'live') {
            Object.assign(btnLive.style, styles.tabActive);
            Object.assign(btnPlan.style, styles.tabBtn);
            viewLive.style.display = 'flex';
            viewPlan.style.display = 'none';
            startClock();
        } else {
            Object.assign(btnPlan.style, styles.tabActive);
            Object.assign(btnLive.style, styles.tabBtn);
            viewPlan.style.display = 'flex';
            viewLive.style.display = 'none';
            stopClock(); // Economia de recursos
            renderPlanner();
        }
    }

    // ============================================================
    //  VIEW 1: MONITORAMENTO (LIVE)
    // ============================================================
    
    function getBusinessStatus(hours) {
        // Cores Google Material Design
        if (hours >= 9 && hours < 17) return { color: COLORS.success, bg: COLORS.successBg, label: 'Aberto', icon: '🟢' };
        if (hours >= 8 && hours < 9) return { color: COLORS.warning, bg: COLORS.warningBg, label: 'Abrindo', icon: '🟡' };
        if (hours >= 17 && hours < 19) return { color: COLORS.warning, bg: COLORS.warningBg, label: 'Fechando', icon: '🟡' };
        return { color: COLORS.textSub, bg: '#F1F3F4', label: 'Fechado', icon: '🔴' }; // Fechado mais neutro
    }

    function togglePin(hubId) {
        if (pinnedHubs.includes(hubId)) {
            pinnedHubs = pinnedHubs.filter(id => id !== hubId);
        } else {
            pinnedHubs.push(hubId);
        }
        localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(pinnedHubs));
        renderLive(); // Re-renderiza para ordenar
        SoundManager.playClick();
    }

    function renderLive() {
        viewLive.innerHTML = "";
        const now = new Date();

        // Ordena: Pinados primeiro, depois ordem alfabética
        const sortedHubs = [...HUBS].sort((a, b) => {
            const aPinned = pinnedHubs.includes(a.id);
            const bPinned = pinnedHubs.includes(b.id);
            if (aPinned && !bPinned) return -1;
            if (!aPinned && bPinned) return 1;
            return a.name.localeCompare(b.name);
        });

        sortedHubs.forEach(hub => {
            const isPinned = pinnedHubs.includes(hub.id);
            const timeString = now.toLocaleTimeString('pt-BR', { timeZone: hub.zone, hour: '2-digit', minute: '2-digit' });
            const hour = parseInt(timeString.split(':')[0]);
            const status = getBusinessStatus(hour);
            const isNight = hour < 6 || hour > 18;

            const card = document.createElement("div");
            Object.assign(card.style, styles.hubCard);
            if (isPinned) Object.assign(card.style, styles.hubCardPinned);

            // Ícone de Pin (Estrela)
            const pinIcon = isPinned ? '★' : '☆';
            const pinColor = isPinned ? '#F9AB00' : '#DADCE0'; // Amarelo Google

            card.innerHTML = `
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:20px; color:${pinColor}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${pinIcon}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${hub.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${COLORS.text}; letter-spacing:-0.2px;">${hub.name}</div>
                        <div style="font-size:12px; color:${COLORS.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${isNight ? '🌙' : '☀️'} ${hub.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${COLORS.text}; font-family:'Google Sans', sans-serif;">${timeString}</div>
                    <div style="font-size:11px; font-weight:600; color:${status.color}; background:${status.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${status.label}
                    </div>
                </div>
            `;

            // Hover effect
            card.onmouseenter = () => { 
                card.style.transform = "translateY(-2px)";
                card.style.boxShadow = "0 6px 12px rgba(60,64,67,0.1)";
            };
            card.onmouseleave = () => { 
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "0 2px 6px rgba(60,64,67,0.05)";
            };

            // Pin Action
            const btnPin = card.querySelector('.cw-pin-btn');
            btnPin.onmouseenter = () => { btnPin.style.backgroundColor = "#F1F3F4"; };
            btnPin.onmouseleave = () => { btnPin.style.backgroundColor = "transparent"; };
            btnPin.onclick = (e) => {
                e.stopPropagation();
                togglePin(hub.id);
            };

            // Quick Jump to Planner
            card.onclick = () => {
                selectedHubId = hub.id;
                switchTab('plan');
            };

            viewLive.appendChild(card);
        });
    }

    // ============================================================
    //  VIEW 2: PLANEJADOR (CALCULADORA REVERSA)
    // ============================================================
    
    function renderPlanner() {
        viewPlan.innerHTML = "";

        // 1. Selector de País Alvo
        const selectContainer = document.createElement("div");
        const selectLabel = document.createElement("label");
        selectLabel.textContent = "Onde está o cliente?";
        selectLabel.style.cssText = "display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";
        
        const select = document.createElement("select");
        Object.assign(select.style, styleSelect);
        select.style.padding = "14px"; // Mais touch-friendly
        
        HUBS.forEach(hub => {
            const opt = document.createElement("option");
            opt.value = hub.id;
            opt.textContent = `${hub.flag} ${hub.name} (${hub.zone})`;
            if (hub.id === selectedHubId) opt.selected = true;
            select.appendChild(opt);
        });

        select.onchange = (e) => {
            selectedHubId = e.target.value;
            updatePlannerUI();
            SoundManager.playClick();
        };

        selectContainer.appendChild(selectLabel);
        selectContainer.appendChild(select);
        viewPlan.appendChild(selectContainer);

        // 2. Os Relógios (Cards Lado a Lado)
        const clockRow = document.createElement("div");
        Object.assign(clockRow.style, styles.timeComparisonRow);

        // MEU HORÁRIO
        const myCard = document.createElement("div");
        Object.assign(myCard.style, styles.timeCard);
        // Fundo sutilmente azul para "Meu Lado"
        myCard.style.backgroundColor = "#F8FAFF"; 
        myCard.style.borderColor = "#E8F0FE";
        
        myCard.innerHTML = `
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">🇧🇷 Você</div>
            <input type="time" id="cw-time-input-br" style="${objectToCss(styles.hdInput)} color:#1A73E8;">
            <div style="font-size:12px; color:#5F6368;">Brasília (GMT-3)</div>
        `;
        
        // HORÁRIO CLIENTE
        const clientCard = document.createElement("div");
        Object.assign(clientCard.style, styles.timeCard);
        // Fundo sutilmente laranja para "Lado Cliente"
        clientCard.style.backgroundColor = "#FFF8E1"; 
        clientCard.style.borderColor = "#FEF7E0";

        clientCard.innerHTML = `
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="${objectToCss(styles.hdInput)}; color:#E37400;">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `;

        clockRow.appendChild(myCard);
        clockRow.appendChild(clientCard);
        viewPlan.appendChild(clockRow);

        // 3. Status Badge (Bom/Ruim para ligar)
        const statusBadge = document.createElement("div");
        statusBadge.id = "cw-planner-status";
        Object.assign(statusBadge.style, styles.statusBadge);
        viewPlan.appendChild(statusBadge);

        // 4. Timeline Slider (A Experiência Visual)
        const timelineWrapper = document.createElement("div");
        Object.assign(timelineWrapper.style, { padding: '0 4px', marginTop: '12px' });
        
        const rangeLabel = document.createElement("div");
        rangeLabel.textContent = "Arraste para simular o horário:";
        rangeLabel.style.cssText = "font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";
        
        const sliderContainer = document.createElement("div");
        Object.assign(sliderContainer.style, styles.timelineContainer);

        // Fundo Visual (Track com marcação de dia/noite)
        const track = document.createElement("div");
        Object.assign(track.style, styles.timelineTrack);
        
        // Day Zone (Visualização das horas úteis)
        const dayZone = document.createElement("div");
        Object.assign(dayZone.style, styles.dayZone);
        track.appendChild(dayZone);

        // O slider real (invisível mas clicável por cima)
        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "0";
        slider.max = "1439"; // Minutos do dia
        slider.step = "15";  // Steps de 15 min
        slider.style.cssText = "position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";
        
        // Marcadores de hora (00, 06, 12, 18, 24)
        const markers = document.createElement("div");
        markers.style.cssText = "position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;";
        markers.innerHTML = `<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>`;

        sliderContainer.appendChild(track);
        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(markers);
        timelineWrapper.appendChild(rangeLabel);
        timelineWrapper.appendChild(sliderContainer);
        viewPlan.appendChild(timelineWrapper);

        // --- LÓGICA DO PLANEJADOR ---
        const timeInputBR = myCard.querySelector('#cw-time-input-br');
        const clientDisplay = clientCard.querySelector('#cw-time-display-client');
        const clientLabel = clientCard.querySelector('#cw-client-label');

        function updatePlannerUI() {
            const hub = HUBS.find(h => h.id === selectedHubId);
            clientLabel.textContent = `${hub.flag} ${hub.label} (${hub.zone})`;

            // Sincroniza inputs
            const hours = plannerDate.getHours();
            const minutes = plannerDate.getMinutes();
            const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            
            timeInputBR.value = timeStr;
            slider.value = (hours * 60) + minutes;

            // Calcula hora do cliente
            const clientTimeString = plannerDate.toLocaleTimeString('pt-BR', { 
                timeZone: hub.zone, hour: '2-digit', minute: '2-digit' 
            });
            clientDisplay.textContent = clientTimeString;

            // Verifica status comercial do cliente
            const clientHour = parseInt(clientTimeString.split(':')[0]);
            
            // Lógica de "Bom para Ligar"
            if (clientHour >= 9 && clientHour < 17) {
                // Excelente
                statusBadge.style.background = COLORS.successBg;
                statusBadge.style.color = COLORS.success;
                statusBadge.innerHTML = `<span style="font-size:16px">✅</span> Horário Comercial Ideal`;
            } else if ((clientHour >= 8 && clientHour < 9) || (clientHour >= 17 && clientHour < 19)) {
                // Risco
                statusBadge.style.background = COLORS.warningBg;
                statusBadge.style.color = COLORS.warning;
                statusBadge.innerHTML = `<span style="font-size:16px">⚠️</span> Horário Limite (Atenção)`;
            } else {
                // Ruim
                statusBadge.style.background = COLORS.errorBg;
                statusBadge.style.color = COLORS.error;
                statusBadge.innerHTML = `<span style="font-size:16px">⛔</span> Fora de Horário`;
            }
        }

        // Listeners
        slider.oninput = (e) => {
            const totalMins = parseInt(e.target.value);
            plannerDate.setHours(Math.floor(totalMins / 60));
            plannerDate.setMinutes(totalMins % 60);
            updatePlannerUI();
        };

        timeInputBR.oninput = (e) => {
            const [h, m] = e.target.value.split(':');
            if (h && m) {
                plannerDate.setHours(parseInt(h));
                plannerDate.setMinutes(parseInt(m));
                updatePlannerUI();
            }
        };

        // Inicializa
        updatePlannerUI();
    }

    // --- CONTROLES GERAIS ---
    function startClock() {
        renderLive();
        if (!updateInterval) updateInterval = setInterval(renderLive, 60000);
    }

    function stopClock() {
        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
    }

    // Helper CSS
    function objectToCss(obj) {
        return Object.entries(obj).map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${v}`).join(';');
    }

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-timezone'); 
        
        if (visible) {
            // Default: abre no Live
            switchTab('live');
        } else {
            stopClock();
        }
    }

    // Mount
    document.body.appendChild(popup);
    return toggleVisibility;
}