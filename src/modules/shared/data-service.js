// src/modules/shared/data-service.js

// SUA URL (Mantida)
const API_URL = "https://script.google.com/a/macros/google.com/s/AKfycbzC8qLjT9Ytpyjl_bes3gg5eO_aizPRSdWuExy6Ayc-ooWR2WJXfdeclLS_g6x0uJua/exec";
// src/modules/shared/data-service.js


const CACHE_KEY_BROADCAST = "cw_data_broadcast";
const CACHE_KEY_TIPS = "cw_data_tips";

const FALLBACK_TIPS = [
    "Processando sua solicitação...",
    "Dica: Mantenha suas notas organizadas.",
    "Aguarde um momento...",
    "Quase lá..."
];

// Função Helper Interna para JSONP
function jsonpFetch(operation) {
    return new Promise((resolve, reject) => {
        // 1. Cria nome único para a função
        const callbackName = 'cw_cb_' + Math.round(10000 * Math.random());
        const script = document.createElement('script');
        
        // 2. Define o que acontece quando o Google responder
        window[callbackName] = (data) => {
            document.body.removeChild(script);
            delete window[callbackName];
            resolve(data);
        };

        // 3. Monta a URL com callback e timestamp (anti-cache)
        script.src = `${API_URL}?op=${operation}&callback=${callbackName}&t=${Date.now()}`;
        
        // 4. Tratamento de erro
        script.onerror = () => {
            document.body.removeChild(script);
            delete window[callbackName];
            reject(new Error("JSONP Load Error"));
        };

        // 5. Dispara
        document.body.appendChild(script);
    });
}

export const DataService = {
    
    // 1. BUSCAR DICAS (Via JSONP)
    fetchTips: async () => {
        try {
            console.log("📥 Baixando dicas via JSONP...");
            const data = await jsonpFetch('tips');
            
            if (data && data.tips && Array.isArray(data.tips)) {
                localStorage.setItem(CACHE_KEY_TIPS, JSON.stringify(data.tips));
                console.log("✅ Dicas atualizadas:", data.tips.length);
            }
        } catch (err) {
            console.warn("TechSol: Erro ao baixar dicas (Offline).", err);
        }
    },

    // 2. BUSCAR BROADCASTS (Via JSONP)
    fetchData: async () => {
        try {
            console.log("📥 Baixando Broadcasts via JSONP...");
            const data = await jsonpFetch('broadcast');
            
            if (data && data.broadcast) {
                localStorage.setItem(CACHE_KEY_BROADCAST, JSON.stringify(data.broadcast));
                console.log("✅ Broadcasts atualizados:", data.broadcast.length);
                return data;
            }
        } catch (err) {
            console.warn("TechSol: Erro ao buscar Broadcasts.", err);
        }
        // Fallback Cache
        return {
            broadcast: JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]")
        };
    },

    getCachedBroadcasts: () => JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]"),
    
    getRandomTip: () => {
        let tips = FALLBACK_TIPS;
        const cached = localStorage.getItem(CACHE_KEY_TIPS);
        if (cached) {
            try { tips = JSON.parse(cached); } catch(e){}
        }
        return tips[Math.floor(Math.random() * tips.length)];
    },

    logUsage: (actionType, details = "") => {
        // Logs continuam via fetch no-cors (POST é mais chato com JSONP)
        const user = window._USER_ID || "agente_anonimo"; 
        const payload = { op: "log", user, action: actionType, meta: details };
        
        fetch(API_URL, {
            method: "POST",
            mode: "no-cors", 
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
        }).catch(e => console.log("Log fail", e));
    }
};