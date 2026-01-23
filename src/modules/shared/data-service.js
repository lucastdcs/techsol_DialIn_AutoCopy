// src/modules/shared/data-service.js

import { getAgentEmail } from './page-data.js'; 

// URL da API atualizada
const API_URL = "https://script.google.com/a/macros/google.com/s/AKfycbxFxh1cVk6r0t_JTA2TBfHBLJe_mOBQFsidwL1jwsUDcBtQYk3afu25SN-FR3vafJChHw/exec";

const CACHE_KEY_BROADCAST = "cw_data_broadcast";
const CACHE_KEY_TIPS = "cw_data_tips";

const FALLBACK_TIPS = ["Processando...", "Mantenha o foco!", "Aguarde..."];

// --- Helper JSONP Poderoso (Core do Sistema) ---
function jsonpFetch(operation, params = {}) {
    return new Promise((resolve, reject) => {
        const callbackName = 'cw_cb_' + Math.round(100000 * Math.random());
        const script = document.createElement('script');
        
        window[callbackName] = (data) => {
            if (document.body.contains(script)) document.body.removeChild(script);
            delete window[callbackName];
            resolve(data);
        };

        // Converte objeto params em string query
        const queryString = Object.keys(params)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join('&');

        // Monta URL com Cache Buster (t=...)
        const finalUrl = `${API_URL}?op=${operation}&callback=${callbackName}&t=${Date.now()}&${queryString}`;
        
        script.src = finalUrl;
        
        script.onerror = () => {
            if (document.body.contains(script)) document.body.removeChild(script);
            delete window[callbackName];
            // Em scripts corporativos, as vezes o onerror dispara mesmo com sucesso 
            // se o mimetype variar, mas geralmente é bloqueio.
            reject(new Error("JSONP Error (Check Corp Login)"));
        };

        document.body.appendChild(script);
    });
}

export const DataService = {
    
    fetchTips: async () => {
        try {
            const data = await jsonpFetch('tips');
            if (data?.tips) localStorage.setItem(CACHE_KEY_TIPS, JSON.stringify(data.tips));
        } catch (err) { console.warn("Tips offline", err); }
    },

    fetchData: async () => {
        try {
            const data = await jsonpFetch('broadcast');
            if (data?.broadcast) {
                localStorage.setItem(CACHE_KEY_BROADCAST, JSON.stringify(data.broadcast));
                return data;
            }
        } catch (err) { console.warn("Broadcast offline", err); }
        return { broadcast: JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]") };
    },

    getCachedBroadcasts: () => JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]"),
    
    getRandomTip: () => {
        let tips = FALLBACK_TIPS;
        const cached = localStorage.getItem(CACHE_KEY_TIPS);
        if (cached) try { tips = JSON.parse(cached); } catch(e){}
        return tips[Math.floor(Math.random() * tips.length)];
    },

   // 3. ENVIAR (CREATE)
    sendBroadcast: async (payload) => {
        const fullPayload = {
            ...payload,
            date: new Date().toISOString(),
            id: Date.now().toString() 
        };
        return await DataService._performOp('new_broadcast', fullPayload);
    },

    // 4. ATUALIZAR (UPDATE)
    updateBroadcast: async (id, payload) => {
        const fullPayload = { id, ...payload };
        return await DataService._performOp('update_broadcast', fullPayload);
    },

    // 5. DELETAR (DELETE)
    deleteBroadcast: async (id) => {
        return await DataService._performOp('delete_broadcast', { id });
    },

    // Helper genérico para Broadcast
    _performOp: async (op, params) => {
        try {
            console.log(`📤 Executando ${op}...`, params);
            const response = await jsonpFetch(op, params);
            if (response && response.status === 'success') {
                console.log("✅ Sucesso:", op);
                return true;
            }
            console.warn("⚠️ Falha:", response);
            return false;
        } catch (e) {
            console.error("❌ Erro JSONP:", e);
            return false;
        }
    },
    
    // --- ANALYTICS VIA JSONP (A Correção) ---
    logEvent: (category, action, label = "", value = null) => {
        try {
            let user = "anon";
            try {
                const email = getAgentEmail(); 
                if (email) user = email.split('@')[0].toLowerCase();
            } catch(e){}

            // Prepara o payload
            const payload = {
                timestamp: new Date().toISOString(),
                user: user,
                version: "v5.0",
                category: category,
                action: action,
                label: label,
                value: value || ''
            };

            // USA O JSONP FETCH (Canal Seguro)
            // Não usamos await porque é "fire and forget" (não queremos travar a UI)
            jsonpFetch('log', payload).catch(e => {
                // Silencioso no console para não assustar o usuário, mas útil para debug
                // console.warn("Analytics não enviado:", e); 
            });

        } catch (err) {
            console.warn("Analytics error", err);
        }
    },

    logUsage: () => {} 
};