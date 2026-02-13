// src/modules/notes/scenarios/scenario-ui.js
import { ScenarioService } from "./scenario-service.js";
import { SoundManager } from "../../shared/sound-manager.js";
import { showToast, confirmDialog } from "../../shared/utils.js";
export function createScenarioSelector(onSelect, state) {
    const container = document.createElement("div"); container.className = "cw-scenario-module";
    const selectedScenarios = new Set();

    // Apple-style Glassmorphism and refined UI
    const styles = `
        .cw-scenario-module {
            background: rgba(255, 255, 255, 0.7) !important;
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            border-radius: 16px !important;
            padding: 16px !important;
            box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.1);
        }
        .cw-scenario-tabs {
            background: rgba(120, 120, 128, 0.12) !important;
            padding: 2px !important;
            border-radius: 10px !important;
            margin-bottom: 16px !important;
        }
        .cw-tab {
            flex: 1;
            border-radius: 8px !important;
            padding: 8px 0 !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            color: #5f6368 !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
            cursor: pointer;
            text-align: center;
        }
        .cw-tab.active {
            background: #ffffff !important;
            color: #1a73e8 !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1) !important;
        }
        .cw-scenario-chip.selected {
            background: #e8f0fe !important;
            border-color: #1a73e8 !important;
            color: #1a73e8 !important;
            box-shadow: 0 2px 4px rgba(26, 115, 232, 0.2) !important;
        }
        .cw-scenario-chip {
            background: #ffffff !important;
            border: 1px solid #e5e5ea !important;
            border-radius: 12px !important;
            padding: 6px 12px !important;
            font-size: 13px !important;
            color: #1c1c1e !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .cw-scenario-chip:hover {
            background: #f2f2f7 !important;
            transform: translateY(-1px);
        }
        .cw-scenario-search input {
            width: 100%;
            padding: 8px 12px;
            border-radius: 10px;
            border: none;
            background: rgba(120, 120, 128, 0.1);
            font-size: 13px;
            margin-bottom: 12px;
            outline: none;
        }
    `;
    if (!document.getElementById('cw-scenario-refined-styles')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'cw-scenario-refined-styles';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    let activeTab = 'default'; let searchQuery = '';
    const render = () => {
        container.innerHTML = `<div class="cw-scenario-header"><div class="cw-scenario-tabs"><div class="cw-tab ${activeTab === 'default' ? 'active' : ''}" data-tab="default">Padrão</div><div class="cw-tab ${activeTab === 'personal' ? 'active' : ''}" data-tab="personal">Meus</div></div><div class="cw-scenario-search"><input type="text" placeholder="Buscar cenários..." value="${searchQuery}"></div></div><div class="cw-scenario-list"></div><div class="cw-scenario-preview">Passe o mouse para ver os detalhes</div>`;
        container.querySelectorAll('.cw-tab').forEach(tab => {
            tab.onclick = () => {
                activeTab = tab.dataset.tab;
                render(); // Re-render to update tab active state
                SoundManager.playClick();
            };
        });
        container.querySelector('.cw-scenario-search input').oninput = (e) => { searchQuery = e.target.value.toLowerCase(); renderList(); };
        renderList();
    };
    const handleAddPersonal = async () => {
        const name = prompt("Nome do seu cenário:");
        if (!name) return;
        const currentData = { ...state.formData };
        // Capture active tasks
        const activeTasks = state.activeTasks || [];
        await ScenarioService.saveScenario({
            title: name,
            content: { ...currentData, activeTasks }
        });
        showToast("Cenário salvo!");
        renderList();
    };
    const renderList = async (customScenarios = null) => {
        const listContainer = container.querySelector('.cw-scenario-list'); listContainer.innerHTML = "<div class='cw-loading'>Carregando...</div>";
        let scenarios = [];
        if (activeTab === 'personal') {
            const addBtn = document.createElement('div');
            addBtn.className = "cw-scenario-chip";
            addBtn.innerHTML = "<b>+ Novo</b>";
            addBtn.style.borderColor = "#1a73e8";
            addBtn.style.color = "#1a73e8";
            addBtn.onclick = handleAddPersonal;
            listContainer.appendChild(addBtn);
        }
        if (activeTab === 'default') {
            const defaults = ScenarioService.getDefaultScenarios(); const subStatus = state.currentSubStatus;
            scenarios = Object.entries(defaults).filter(([id]) => {
                if (subStatus.startsWith('NI_')) return id.includes('-ni-') || id.includes('attempted');
                if (subStatus.startsWith('SO_')) return id.includes('gtm') || id.includes('whatsapp') || id.includes('form') || id.includes('ecw4') || id.includes('ga4');
                if (subStatus.startsWith('AS_')) return id.includes('-as-');
                if (subStatus.startsWith('IN_')) return id.includes('-in-');
                if (subStatus.startsWith('DC_')) return id.includes('-dc-');
                return true;
            }).map(([id, data]) => ({ id, title: id.replace('quickfill-', '').replace(/-/g, ' '), content: data }));
        } else if (activeTab === 'personal') scenarios = ScenarioService.getPersonalScenarios();
        scenarios = scenarios.filter(s => (s.title?.toLowerCase().includes(searchQuery) || (typeof s.content === 'string' && s.content.toLowerCase().includes(searchQuery))) && (activeTab !== 'default' || !s.content.type || s.content.type === 'all' || s.content.type === state.currentCaseType));
        listContainer.innerHTML = ""; if (scenarios.length === 0) { listContainer.innerHTML = "<div class='cw-empty'>Nenhum cenário encontrado.</div>"; return; }
        scenarios.forEach(s => {
            const chip = document.createElement("div");
            chip.className = "cw-scenario-chip";
            if (selectedScenarios.has(s.id)) chip.classList.add("selected");
            chip.textContent = s.title || s.id;

            chip.onmouseenter = () => { const preview = container.querySelector('.cw-scenario-preview'); preview.textContent = typeof s.content === 'object' ? s.content['field-REASON_COMMENTS'] || "Cenário de preenchimento múltiplo" : s.content.substring(0, 100); };

            chip.onclick = () => {
                SoundManager.playClick();
                if (selectedScenarios.has(s.id)) {
                    selectedScenarios.delete(s.id);
                    chip.classList.remove("selected");
                } else {
                    selectedScenarios.add(s.id);
                    chip.classList.add("selected");
                }
                onSelect(s, selectedScenarios.has(s.id));
            };

            if (activeTab === 'personal') { const delBtn = document.createElement('span'); delBtn.innerHTML = ' &times;'; delBtn.onclick = async (e) => { e.stopPropagation(); if (await confirmDialog("Excluir cenário?")) { await ScenarioService.deleteScenario(s.id); renderList(); } }; chip.appendChild(delBtn); }
            listContainer.appendChild(chip);
        });
    };
    render(); return container;
}
