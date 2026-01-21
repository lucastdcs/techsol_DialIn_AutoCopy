// src/modules/timezone/timezone-assistant.js

import { stylePopup, styleSelect, showToast } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { SoundManager } from "../shared/sound-manager.js";

// --- DADOS E CONFIGURAÇÃO ---
const PINNED_STORAGE_KEY = "cw_timezone_pinned";

const HUBS = [
    { id: 'pt', name: 'Portugal', flag: '🇵🇹', zone: 'Europe/Lisbon', label: 'Lisboa' },
    { id: 'es', name: 'Espanha', flag: '🇪🇸', zone: 'Europe/Madrid', label: 'Madrid' },
    { id: 'mx', name: 'México', flag: '🇲🇽', zone: 'America/Mexico_City', label: 'CDMX' },
    { id: 'co', name: 'Colômbia', flag: '🇨🇴', zone: 'America/Bogota', label: 'Bogotá' },
    { id: 'pe', name: 'Peru', flag: '🇵🇪', zone: 'America/Lima', label: 'Lima' },
    { id: 'cl', name: 'Chile', flag: '🇨🇱', zone: 'America/Santiago', label: 'Santiago' },
    { id: 'ar', name: 'Argentina', flag: '🇦🇷', zone: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires' },
    { id: 'ie', name: 'Irlanda', flag: '🇮🇪', zone: 'Europe/Dublin', label: 'Dublin' },
    { id: 'uk', name: 'Reino Unido', flag: '🇬🇧', zone: 'Europe/London', label: 'Londres' },
    { id: 'us_ny', name: 'EUA (Leste)', flag: '🇺🇸', zone: 'America/New_York', label: 'Nova York' },
    { id: 'us_ca', name: 'EUA (Oeste)', flag: '🇺🇸', zone: 'America/Los_Angeles', label: 'Califórnia' }
];

export function initTimezoneAssistant() {
    const CURRENT_VERSION = "v2.0 Pro";
    let visible = false;
    let updateInterval = null;
    
    // Estado
    let selectedHubId = 'mx'; 
    let pinnedHubs = JSON.parse(localStorage.getItem(PINNED_STORAGE_KEY) || "[]");
    
    // Data Base para o Planejador (Começa hoje meio-dia)
    let plannerDate = new Date();
    plannerDate.setHours(14, 0, 0, 0);

    // --- DESIGN SYSTEM (CSS IN-JS) ---
    const COLORS = {
        bg: "#F8F9FA",
        surface: "#FFFFFF",
        primary: "#1A73E8",
        primaryBg: "#E8F0FE",
        text: "#202124",
        textSub: "#5F6368",
        border: "#DADCE0",
        success: "#1E8E3E",
        warning: "#E37400",
        error: "#D93025",
        night: "#1F2937", // Azul noturno escuro
        day: "#FFF7ED"    // Laranja solar suave
    };

    const styles = {
        // Layout
        container: { display: 'flex', flexDirection: 'column', height: '100%', background: COLORS.bg },
        
        // Tabs
        tabHeader: { display: 'flex', background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: '0 4px' },
        tabBtn: { 
            flex: 1, padding: '14px', textAlign: 'center', cursor: 'pointer', 
            fontSize: '13px', fontWeight: '500', color: COLORS.textSub, 
            borderBottom: '3px solid transparent', transition: 'all 0.2s ease'
        },
        tabActive: { color: COLORS.primary, borderBottomColor: COLORS.primary, fontWeight: '600' },

        // Live View (Lista)
        listContainer: { padding: '16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' },
        hubCard: { 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
            padding: '14px 18px', background: COLORS.surface, borderRadius: '12px', 
            border: `1px solid ${COLORS.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'transform 0.2s, box-shadow 0.2s'
        },
        hubCardPinned: { borderLeft: `4px solid ${COLORS.primary}` },
        
        // Planner View
        plannerWrapper: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, overflowY: 'auto' },
        
        // Time Cards (Planejador)
        timeComparisonRow: { display: 'flex', gap: '12px', alignItems: 'stretch' },
        timeCard: { 
            flex: 1, padding: '16px', borderRadius: '16px', background: COLORS.surface, 
            border: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column', 
            alignItems: 'center', gap: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            position: 'relative', overflow: 'hidden'
        },
        
        // Timeline Slider
        timelineContainer: { position: 'relative', height: '48px', marginTop: '8px' },
        timelineTrack: { 
            position: 'absolute', top: '20px', left: '0', right: '0', height: '8px', 
            borderRadius: '4px', background: '#E5E7EB', overflow: 'hidden' 
        },
        // O "Daylight" na timeline
        dayZone: { 
            position: 'absolute', top: '0', bottom: '0', left: '37.5%', width: '37.5%', // 09h as 18h (aprox)
            background: 'rgba(52, 168, 83, 0.2)', pointerEvents: 'none' 
        },
        
        // Inputs
        hdInput: {
            fontSize: '24px', fontWeight: '700', color: COLORS.primary, border: 'none', 
            background: 'transparent', width: '100%', textAlign: 'center', outline: 'none',
            fontFamily: 'monospace', cursor: 'pointer'
        },
        
        // Status Badge
        statusBadge: {
            padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
            display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '12px',
            alignSelf: 'center'
        }
    };

    // --- POPUP ---
    const popup = document.createElement("div");
    popup.id = "timezone-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, { 
        right: "100px", width: "440px", height: "620px", overflow: "hidden" 
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
    btnPlan.textContent = "Planejador de Chamada";
    Object.assign(btnPlan.style, styles.tabBtn);

    tabContainer.appendChild(btnLive);
    tabContainer.appendChild(btnPlan);
    container.appendChild(tabContainer);

    // --- VIEWS ---
    const viewLive = document.createElement("div");
    Object.assign(viewLive.style, styles.listContainer);
    
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
            btnPlan.style.borderBottomColor = 'transparent';
            viewLive.style.display = 'flex';
            viewPlan.style.display = 'none';
            startClock();
        } else {
            Object.assign(btnPlan.style, styles.tabActive);
            Object.assign(btnLive.style, styles.tabBtn);
            btnLive.style.borderBottomColor = 'transparent';
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
        // Lógica de "Semáforo"
        if (hours >= 9 && hours < 17) return { color: COLORS.success, label: 'Aberto', icon: '🟢' };
        if (hours >= 8 && hours < 9) return { color: COLORS.warning, label: 'Abrindo', icon: '🟡' };
        if (hours >= 17 && hours < 19) return { color: COLORS.warning, label: 'Fechando', icon: '🟡' };
        return { color: COLORS.error, label: 'Fechado', icon: '🔴' };
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
            const pinColor = isPinned ? '#F9AB00' : '#BDC1C6';

            card.innerHTML = `
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:18px; color:${pinColor}; width:24px; text-align:center;">${pinIcon}</div>
                    <div style="font-size:28px;">${hub.flag}</div>
                    <div>
                        <div style="font-size:14px; font-weight:700; color:${COLORS.text};">${hub.name}</div>
                        <div style="font-size:12px; color:${COLORS.textSub}; display:flex; align-items:center; gap:4px;">
                            ${isNight ? '🌙' : '☀️'} ${hub.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:22px; font-weight:700; color:${COLORS.text}; font-family:'Roboto Mono', monospace;">${timeString}</div>
                    <div style="font-size:11px; font-weight:600; color:${status.color}; display:flex; align-items:center; justify-content:flex-end; gap:4px;">
                        ${status.label} ${status.icon}
                    </div>
                </div>
            `;

            // Hover effect
            card.onmouseenter = () => { card.style.backgroundColor = "#F8F9FA"; };
            card.onmouseleave = () => { card.style.backgroundColor = COLORS.surface; };

            // Pin Action
            const btnPin = card.querySelector('.cw-pin-btn');
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
        selectLabel.textContent = "Planejar com:";
        selectLabel.style.cssText = "display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase;";
        
        const select = document.createElement("select");
        Object.assign(select.style, styleSelect);
        
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
        myCard.innerHTML = `
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase;">🇧🇷 Seu Horário</div>
            <input type="time" id="cw-time-input-br" style="${objectToCss(styles.hdInput)}">
            <div style="font-size:11px; color:#5F6368;">Horário de Brasília</div>
        `;
        
        // HORÁRIO CLIENTE
        const clientCard = document.createElement("div");
        Object.assign(clientCard.style, styles.timeCard);
        // Fundo sutilmente diferente para diferenciar
        clientCard.style.backgroundColor = "#F8F9FA"; 
        clientCard.innerHTML = `
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase;">Cliente</div>
            <div id="cw-time-display-client" style="${objectToCss(styles.hdInput)}; color:#202124;">--:--</div>
            <div id="cw-client-label" style="font-size:11px; color:#5F6368;">...</div>
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
        Object.assign(timelineWrapper.style, { padding: '0 8px' });
        
        const rangeLabel = document.createElement("div");
        rangeLabel.textContent = "Arraste para simular o horário:";
        rangeLabel.style.cssText = "font-size:12px; color:#5F6368; text-align:center; margin-bottom:8px;";
        
        const sliderContainer = document.createElement("div");
        Object.assign(sliderContainer.style, styles.timelineContainer);

        // Fundo Visual (Track com marcação de dia/noite)
        const track = document.createElement("div");
        Object.assign(track.style, styles.timelineTrack);
        
        // O slider real (invisível mas clicável por cima)
        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "0";
        slider.max = "1439"; // Minutos do dia
        slider.step = "15";  // Steps de 15 min
        slider.style.cssText = "position:absolute; top:14px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";
        
        // Marcadores de hora (00, 06, 12, 18, 24)
        const markers = document.createElement("div");
        markers.style.cssText = "position:absolute; top:32px; width:100%; display:flex; justify-content:space-between; font-size:10px; color:#9AA0A6; padding:0 2px;";
        markers.innerHTML = `<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>23h</span>`;

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
                statusBadge.style.background = "#E6F4EA";
                statusBadge.style.color = "#137333";
                statusBadge.innerHTML = `✅ Horário Comercial Ideal`;
            } else if ((clientHour >= 8 && clientHour < 9) || (clientHour >= 17 && clientHour < 19)) {
                // Risco
                statusBadge.style.background = "#FEF7E0";
                statusBadge.style.color = "#B06000";
                statusBadge.innerHTML = `⚠️ Horário Limite (Atenção)`;
            } else {
                // Ruim
                statusBadge.style.background = "#FCE8E6";
                statusBadge.style.color = "#C5221F";
                statusBadge.innerHTML = `⛔ Fora de Horário (Noite/Fechado)`;
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