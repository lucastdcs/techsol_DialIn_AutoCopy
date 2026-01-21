// src/modules/timezone/timezone-assistant.js

import { stylePopup, styleSelect } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";

// --- CONFIGURAÇÃO DOS FUSOS ---
const HUBS = [
    { id: 'pt', name: 'Portugal', flag: '🇵🇹', zone: 'Europe/Lisbon', label: 'Lisboa' },
    { id: 'es', name: 'Espanha', flag: '🇪🇸', zone: 'Europe/Madrid', label: 'Madrid' },
    { id: 'mx', name: 'México', flag: '🇲🇽', zone: 'America/Mexico_City', label: 'CDMX' },
    { id: 'co', name: 'Colômbia/Peru', flag: '🇨🇴', zone: 'America/Bogota', label: 'Bogotá' },
    { id: 'cl', name: 'Chile', flag: '🇨🇱', zone: 'America/Santiago', label: 'Santiago' },
    { id: 'ar', name: 'Argentina', flag: '🇦🇷', zone: 'America/Argentina/Buenos_Aires', label: 'B. Aires' },
    { id: 'ie', name: 'Irlanda', flag: '🇮🇪', zone: 'Europe/Dublin', label: 'Dublin' }, // Comum para Tech
    { id: 'uk', name: 'Reino Unido', flag: '🇬🇧', zone: 'Europe/London', label: 'Londres' }
];

export function initTimezoneAssistant() {
    const CURRENT_VERSION = "v1.0";
    let visible = false;
    let updateInterval = null;
    let selectedHubId = 'mx'; // Default para o Planejador

    // --- ESTILOS ---
    const styles = {
        container: { padding: '0', display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FA' },
        tabBar: { display: 'flex', borderBottom: '1px solid #E0E0E0', background: '#FFF' },
        tab: { flex: 1, padding: '14px', textAlign: 'center', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#5F6368', borderBottom: '2px solid transparent', transition: 'all 0.2s' },
        tabActive: { color: '#1A73E8', borderBottom: '2px solid #1A73E8', fontWeight: '600', background: '#F8F9FA' },
        
        // Tela 1: Live Status
        gridContainer: { padding: '20px', display: 'grid', gridTemplateColumns: '1fr', gap: '12px', overflowY: 'auto' },
        hubCard: { 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
            padding: '16px', background: '#FFF', borderRadius: '12px', 
            border: '1px solid #E0E0E0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s'
        },
        hubInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
        flag: { fontSize: '24px' },
        hubName: { fontSize: '14px', fontWeight: '600', color: '#202124' },
        hubTime: { fontSize: '20px', fontWeight: '700', color: '#3C4043', fontVariantNumeric: 'tabular-nums' },
        statusDot: { width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '6px' },
        
        // Tela 2: Planejador
        plannerContainer: { padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', flex: 1 },
        clockCard: { 
            width: '100%', padding: '20px', borderRadius: '16px', 
            background: '#FFF', border: '1px solid #E0E0E0', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        },
        clockLabel: { fontSize: '12px', textTransform: 'uppercase', color: '#5F6368', fontWeight: '700', letterSpacing: '0.5px' },
        clockDisplay: { fontSize: '36px', fontWeight: '700', color: '#1A73E8', fontFamily: 'monospace' },
        
        sliderContainer: { width: '100%', padding: '0 10px' },
        slider: { width: '100%', cursor: 'pointer', accentColor: '#1A73E8' },
        
        helperText: { fontSize: '13px', color: '#5F6368', textAlign: 'center', lineHeight: '1.5', marginTop: 'auto', marginBottom: '20px' }
    };

    // --- POPUP SETUP ---
    const popup = document.createElement("div");
    popup.id = "timezone-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, { 
        right: "100px", width: "400px", height: "550px", overflow: "hidden" 
    });

    const animRefs = { popup };

    // Header
    const header = createStandardHeader(
        popup, "Time Zone Traveler", CURRENT_VERSION,
        "Consulte fusos horários e planeje ligações internacionais.",
        animRefs, () => toggleVisibility()
    );
    popup.appendChild(header);

    // Layout
    const mainContent = document.createElement("div");
    Object.assign(mainContent.style, styles.container);
    popup.appendChild(mainContent);

    // Tabs
    const tabBar = document.createElement("div");
    Object.assign(tabBar.style, styles.tabBar);
    
    const tab1 = document.createElement("div");
    tab1.textContent = "🚦 Agora (Ao Vivo)";
    Object.assign(tab1.style, styles.tab, styles.tabActive);
    
    const tab2 = document.createElement("div");
    tab2.textContent = "📅 Planejador";
    Object.assign(tab2.style, styles.tab);

    tabBar.appendChild(tab1);
    tabBar.appendChild(tab2);
    mainContent.appendChild(tabBar);

    // Views
    const viewLive = document.createElement("div");
    Object.assign(viewLive.style, styles.gridContainer);
    
    const viewPlanner = document.createElement("div");
    Object.assign(viewPlanner.style, styles.plannerContainer, { display: 'none' });

    mainContent.appendChild(viewLive);
    mainContent.appendChild(viewPlanner);

    // --- LÓGICA DAS TABS ---
    tab1.onclick = () => {
        Object.assign(tab1.style, styles.tabActive);
        Object.assign(tab2.style, styles.tab);
        viewLive.style.display = 'grid';
        viewPlanner.style.display = 'none';
        startLiveClock();
    };

    tab2.onclick = () => {
        Object.assign(tab2.style, styles.tabActive);
        Object.assign(tab1.style, styles.tab);
        viewLive.style.display = 'none';
        viewPlanner.style.display = 'flex';
        stopLiveClock(); // Economiza recurso
        renderPlanner();
    };

    // --- VIEW 1: LIVE STATUS ---
    function getStatusColor(hours) {
        // Regra de Negócio:
        // 09-17: Verde (Horário Nobre)
        // 08-09 ou 17-18: Amarelo (Risco)
        // Outros: Vermelho (Fechado)
        if (hours >= 9 && hours < 17) return '#1E8E3E'; // Verde
        if (hours === 8 || hours === 17 || hours === 18) return '#F9AB00'; // Amarelo
        return '#D93025'; // Vermelho
    }

    function renderLiveView() {
        viewLive.innerHTML = "";
        const now = new Date();

        HUBS.forEach(hub => {
            const timeString = now.toLocaleTimeString('pt-BR', { timeZone: hub.zone, hour: '2-digit', minute: '2-digit' });
            const hour = parseInt(timeString.split(':')[0]);
            const color = getStatusColor(hour);
            const isNight = hour < 6 || hour > 19;

            const card = document.createElement("div");
            Object.assign(card.style, styles.hubCard);
            
            // Ícone de Lua/Sol baseado na hora
            const weatherIcon = isNight ? '🌙' : '☀️';

            card.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="${objectToCss(styles.flag)}">${hub.flag}</div>
                    <div>
                        <div style="${objectToCss(styles.hubName)}">${hub.name}</div>
                        <div style="font-size:11px; color:#5F6368;">${hub.label}</div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="${objectToCss(styles.hubTime)}">${timeString}</div>
                    <div style="font-size:11px; font-weight:600; color:${color}; margin-top:2px;">
                        <span style="${objectToCss(styles.statusDot)}; background:${color}"></span>
                        ${isNight ? 'Noite' : 'Dia'} ${weatherIcon}
                    </div>
                </div>
            `;
            viewLive.appendChild(card);
        });
    }

    // --- VIEW 2: PLANEJADOR ---
    function renderPlanner() {
        viewPlanner.innerHTML = "";

        // 1. Seletor de País
        const selectWrapper = document.createElement("div");
        selectWrapper.style.width = "100%";
        
        const label = document.createElement("label");
        label.textContent = "Onde está o cliente?";
        label.style.cssText = "display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase;";
        
        const select = document.createElement("select");
        Object.assign(select.style, styleSelect); // Usa estilo padrão do utils
        
        HUBS.forEach(hub => {
            const opt = document.createElement("option");
            opt.value = hub.id;
            opt.textContent = `${hub.flag} ${hub.name} (${hub.zone})`;
            if (hub.id === selectedHubId) opt.selected = true;
            select.appendChild(opt);
        });

        select.onchange = (e) => {
            selectedHubId = e.target.value;
            updatePlanner(slider.value);
        };

        selectWrapper.appendChild(label);
        selectWrapper.appendChild(select);
        viewPlanner.appendChild(selectWrapper);

        // 2. Relógios (Meu vs Cliente)
        const clocksRow = document.createElement("div");
        clocksRow.style.cssText = "display:flex; gap:16px; width:100%; align-items:stretch;";

        // Meu Relógio
        const myClock = document.createElement("div");
        Object.assign(myClock.style, styles.clockCard);
        myClock.innerHTML = `
            <div style="${objectToCss(styles.clockLabel)}">🇧🇷 VOCÊ (BRT)</div>
            <div id="cw-my-time" style="${objectToCss(styles.clockDisplay)}">--:--</div>
        `;

        // Relógio Cliente
        const clientClock = document.createElement("div");
        Object.assign(clientClock.style, styles.clockCard);
        // Destaca mais o relógio do cliente
        clientClock.style.background = "#E8F0FE";
        clientClock.style.borderColor = "#D2E3FC";
        
        clientClock.innerHTML = `
            <div style="${objectToCss(styles.clockLabel)}">CLIENTE</div>
            <div id="cw-client-time" style="${objectToCss(styles.clockDisplay)}">--:--</div>
        `;

        clocksRow.appendChild(myClock);
        clocksRow.appendChild(clientClock);
        viewPlanner.appendChild(clocksRow);

        // 3. Slider de Tempo
        const sliderContainer = document.createElement("div");
        Object.assign(sliderContainer.style, styles.sliderContainer);
        
        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "0";
        slider.max = "1439"; // Minutos no dia (24 * 60 - 1)
        slider.step = "15"; // Pula de 15 em 15 min
        Object.assign(slider.style, styles.slider);
        
        // Define o valor inicial como a hora atual
        const now = new Date();
        const currentMinutes = (now.getHours() * 60) + now.getMinutes();
        slider.value = currentMinutes;

        slider.oninput = (e) => updatePlanner(e.target.value);

        sliderContainer.appendChild(slider);
        viewPlanner.appendChild(sliderContainer);

        // Texto de ajuda
        const helper = document.createElement("div");
        Object.assign(helper.style, styles.helperText);
        helper.innerHTML = "Arraste a barra para simular horários.<br>Os relógios mudam juntos.";
        viewPlanner.appendChild(helper);

        // Init inicial
        updatePlanner(currentMinutes);

        function updatePlanner(minutesVal) {
            const totalMinutes = parseInt(minutesVal);
            const hours = Math.floor(totalMinutes / 60);
            const mins = totalMinutes % 60;

            // Cria uma data base (hoje) com o horário do slider
            const baseDate = new Date();
            baseDate.setHours(hours);
            baseDate.setMinutes(mins);

            // 1. Atualiza Meu Relógio
            const myTime = baseDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            myClock.querySelector('#cw-my-time').textContent = myTime;

            // 2. Atualiza Relógio Cliente
            const hub = HUBS.find(h => h.id === selectedHubId);
            const clientTime = baseDate.toLocaleTimeString('pt-BR', { 
                timeZone: hub.zone, 
                hour: '2-digit', minute: '2-digit' 
            });
            
            const clientDisplay = clientClock.querySelector('#cw-client-time');
            clientDisplay.textContent = clientTime;

            // Muda cor se for fora de horário
            // Gambiarra inteligente: Pegamos a hora (string) do cliente e convertemos pra int
            const clientHour = parseInt(clientTime.split(':')[0]);
            if (clientHour < 9 || clientHour >= 18) {
                clientDisplay.style.color = '#D93025'; // Vermelho (Fora)
                clientClock.style.background = '#FCE8E6';
                clientClock.style.borderColor = '#FAD2CF';
            } else {
                clientDisplay.style.color = '#1A73E8'; // Azul (OK)
                clientClock.style.background = '#E8F0FE';
                clientClock.style.borderColor = '#D2E3FC';
            }
        }
    }

    // --- CONTROLES GERAIS ---
    function startLiveClock() {
        renderLiveView(); // Renderiza já
        if (!updateInterval) updateInterval = setInterval(renderLiveView, 60000); // Atualiza a cada 1min
    }

    function stopLiveClock() {
        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
    }

    // Helper para converter objeto de estilo em string CSS
    function objectToCss(obj) {
        return Object.entries(obj).map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${v}`).join(';');
    }

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-timezone'); // ID do botão que criaremos
        
        if (visible) {
            startLiveClock();
        } else {
            stopLiveClock();
        }
    }

    document.body.appendChild(popup);
    return toggleVisibility;
}