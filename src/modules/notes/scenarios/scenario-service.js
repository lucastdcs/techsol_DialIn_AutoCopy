// src/modules/notes/scenarios/scenario-service.js
import { SnippetService } from "../../personal-library/snippet-service.js";
import { DataService } from "../../shared/data-service.js";
import { scenarioSnippets } from "../data/notes-data.js";

const CONFIG = {
    COMMUNITY_LDAP: 'community-scenarios@google.com'
};

export const ScenarioService = {
    getPersonalScenarios: () => SnippetService.getSnippets('scenario'),
    saveScenario: async (scenario) => SnippetService.save({ ...scenario, type: 'scenario' }),
    deleteScenario: async (id) => SnippetService.delete(id),
    getSharedScenarios: async (ldap = CONFIG.COMMUNITY_LDAP) => {
        try {
            const response = await DataService.getUserSnippets(ldap);
            if (response?.status === 'success') return response.snippets || [];
        } catch (e) {}
        return [];
    },
    getDefaultScenarios: () => scenarioSnippets
};
