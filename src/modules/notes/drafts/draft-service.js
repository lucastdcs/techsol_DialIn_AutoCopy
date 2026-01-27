// src/modules/notes/drafts/draft-service.js

const STORAGE_KEY = "cw_notes_parking_lot";
const MAX_DRAFTS = 5;

export const DraftService = {
    getAll: () => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch (e) { return []; }
    },

    save: (data) => {
        const drafts = DraftService.getAll();
        
        const newDraft = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...data // clientName, cid, status, formData...
        };

        // Adiciona no topo
        drafts.unshift(newDraft);

        // Limite de segurança
        if (drafts.length > MAX_DRAFTS) {
            drafts.pop(); // Remove o mais antigo
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
        return newDraft;
    },

    delete: (id) => {
        let drafts = DraftService.getAll();
        drafts = drafts.filter(d => d.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
        return drafts;
    },

    getCount: () => {
        return DraftService.getAll().length;
    }
};