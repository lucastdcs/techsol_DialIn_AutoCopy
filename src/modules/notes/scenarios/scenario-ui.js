// src/modules/notes/scenarios/scenario-ui.js
import { ScenarioService } from "./scenario-service.js";
import { SoundManager } from "../../shared/sound-manager.js";
import { showToast, confirmDialog } from "../../shared/utils.js";
export function createScenarioSelector(onSelect, state) {
    const container = document.createElement("div"); container.className = "cw-scenario-module";
    let activeTab = 'default'; let searchQuery = '';
    const render = () => {
        container.innerHTML = `<div class="cw-scenario-header"><div class="cw-scenario-tabs"><div class="cw-tab ${activeTab === 'default' ? 'active' : ''}" data-tab="default">Padrão</div><div class="cw-tab ${activeTab === 'personal' ? 'active' : ''}" data-tab="personal">Meus</div><div class="cw-tab ${activeTab === 'community' ? 'active' : ''}" data-tab="community">Comunidade</div></div><div class="cw-scenario-search"><input type="text" placeholder="Buscar cenários..." value="${searchQuery}"></div></div><div class="cw-scenario-list"></div><div class="cw-scenario-preview">Passe o mouse para ver os detalhes</div>`;
        container.querySelectorAll('.cw-tab').forEach(tab => { tab.onclick = () => { activeTab = tab.dataset.tab; renderList(); SoundManager.playClick(); }; });
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
        else if (activeTab === 'community') {
            if (!customScenarios) {
                const searchLdapBtn = document.createElement('div');
                searchLdapBtn.className = "cw-scenario-chip";
                searchLdapBtn.innerHTML = "🔍 Buscar LDAP";
                searchLdapBtn.onclick = async () => {
                    const ldap = prompt("Digite o LDAP do colega:");
                    if (ldap) {
                        const shared = await ScenarioService.getSharedScenarios(ldap);
                        if (shared.length === 0) showToast("Nenhum cenário encontrado para este LDAP.");
                        else renderList(shared);
                    }
                };
                listContainer.appendChild(searchLdapBtn);
                scenarios = await ScenarioService.getSharedScenarios();
            } else {
                scenarios = customScenarios;
            }
        }
        scenarios = scenarios.filter(s => (s.title?.toLowerCase().includes(searchQuery) || (typeof s.content === 'string' && s.content.toLowerCase().includes(searchQuery))) && (activeTab !== 'default' || !s.content.type || s.content.type === 'all' || s.content.type === state.currentCaseType));
        listContainer.innerHTML = ""; if (scenarios.length === 0) { listContainer.innerHTML = "<div class='cw-empty'>Nenhum cenário encontrado.</div>"; return; }
        scenarios.forEach(s => {
            const chip = document.createElement("div"); chip.className = "cw-scenario-chip"; chip.textContent = s.title || s.id;
            chip.onmouseenter = () => { const preview = container.querySelector('.cw-scenario-preview'); preview.textContent = typeof s.content === 'object' ? s.content['field-REASON_COMMENTS'] || "Cenário de preenchimento múltiplo" : s.content.substring(0, 100); };
            chip.onclick = () => { SoundManager.playClick(); onSelect(s); };
            if (activeTab === 'personal') { const delBtn = document.createElement('span'); delBtn.innerHTML = ' &times;'; delBtn.onclick = async (e) => { e.stopPropagation(); if (await confirmDialog("Excluir cenário?")) { await ScenarioService.deleteScenario(s.id); renderList(); } }; chip.appendChild(delBtn); }
            else if (activeTab === 'community') { const addBtn = document.createElement('span'); addBtn.innerHTML = ' +'; addBtn.onclick = async (e) => { e.stopPropagation(); await ScenarioService.saveScenario(s); showToast("Adicionado!"); }; chip.appendChild(addBtn); }
            listContainer.appendChild(chip);
        });
    };
    render(); return container;
}
