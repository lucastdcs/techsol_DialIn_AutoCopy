// src/modules/shared/data-service.js

// SUA URL (Mantida)
const API_URL = "https://script.google.com/a/macros/google.com/s/AKfycbyWu0rzLNjeJL64FtuFsfMOoNP-kL-r4pLjacQrqtkT_POEgpxRymhmoqKU8_SwmQ7b/exec";

const CACHE_KEY_BROADCAST = "cw_data_broadcast";
const CACHE_KEY_TIPS = "cw_data_tips";

const FALLBACK_TIPS = [
    "Processando sua solicitação...",
    "Dica: Mantenha suas notas organizadas.",
    "Sincronizando com a base de dados...",
    "Aguarde um momento...",
    "Dica: Use os Templates de Email para ganhar tempo.",
    "Quase lá...",
    "Dica: Respire fundo e beba água."
];

export const DataService = {
    
    // 1. BUSCAR DICAS
    fetchTips: async () => {
        try {
            // 'credentials: include' é vital para scripts corporativos (/a/google.com)
            const response = await fetch(`${API_URL}?op=tips`, { credentials: 'include' });
            
            // Verifica se deu erro de rede ou Auth (Google retornando página de login)
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            
            // Segurança: Lê texto primeiro para garantir que é JSON
            const text = await response.text();
            if (text.trim().startsWith("<")) throw new Error("Auth Error: Recebido HTML em vez de JSON");

            const data = JSON.parse(text);

            if (data && data.tips && Array.isArray(data.tips)) {
                localStorage.setItem(CACHE_KEY_TIPS, JSON.stringify(data.tips));
                console.log("✅ Dicas atualizadas.");
            }
        } catch (err) {
            console.warn("TechSol: Falha ao baixar dicas (Offline/Auth).", err);
        }
    },

    // 2. BUSCAR BROADCASTS
    fetchData: async () => {
        try {
            const response = await fetch(`${API_URL}?op=broadcast`, { credentials: 'include' });
            
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const text = await response.text();
            if (text.trim().startsWith("<")) throw new Error("Auth Error: Recebido HTML em vez de JSON");

            const data = JSON.parse(text);

            if (data && data.broadcast) {
                localStorage.setItem(CACHE_KEY_BROADCAST, JSON.stringify(data.broadcast));
            }
            return data;
        } catch (err) {
            console.warn("TechSol: Erro ao buscar Broadcasts.", err);
            // Retorna cache como fallback
            return {
                broadcast: JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]")
            };
        }
    },

    // 3. CACHE GETTERS
    getCachedBroadcasts: () => JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]"),
    
    // 4. GET RANDOM TIP
    getRandomTip: () => {
        let tips = FALLBACK_TIPS;
        const cached = localStorage.getItem(CACHE_KEY_TIPS);
        
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                if (parsed.length > 0) tips = parsed;
            } catch (e) {
                localStorage.removeItem(CACHE_KEY_TIPS);
            }
        }
        return tips[Math.floor(Math.random() * tips.length)];
    },

    // 5. LOG USAGE (Fire & Forget)
    logUsage: (actionType, details = "") => {
        const user = window._USER_ID || "agente_anonimo"; 
        
        const payload = { 
            op: "log", 
            user: user, 
            action: actionType, 
            meta: details 
        };

        // Usa text/plain para evitar Preflight (OPTIONS) que o Apps Script não suporta
        fetch(API_URL, {
            method: "POST",
            mode: "no-cors", 
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
        }).catch(e => console.log("Log error (ignorable)", e));
    }
};