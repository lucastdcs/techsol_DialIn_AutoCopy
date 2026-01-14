// src/modules/shared/data-service.js

// SUA URL (Mantida)
const API_URL = "https://script.google.com/a/macros/google.com/s/AKfycbzvMsa4kGkE1r7uRQQzyxqteNXMuYpJLhkjJRRF0le7b5e7KXrTVzNOpmvOyfF4oXhmnQ/exec";
// src/modules/shared/data-service.js

const CACHE_KEY_BROADCAST = "cw_data_broadcast";
const CACHE_KEY_TIPS = "cw_data_tips";

const FALLBACK_TIPS = [
    "Processando sua solicitação...",
    "Dica: Mantenha suas notas organizadas.",
    "Aguarde um momento...",
    "Quase lá..."
];

// --- Helper Interno para JSONP (Leitura sem bloqueio CORS) ---
function jsonpFetch(operation) {
    return new Promise((resolve, reject) => {
        // 1. Cria nome único para a função de callback
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
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
            delete window[callbackName];
            reject(new Error("JSONP Load Error"));
        };

        // 5. Dispara a requisição
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
                // console.log("✅ Dicas atualizadas:", data.tips.length);
            }
        } catch (err) {
            console.warn("TechSol: Erro ao baixar dicas (Offline/Network).", err);
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
        // Fallback Cache se der erro
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
        const user = window._USER_ID || "agente_anonimo"; 
        const payload = { op: "log", user, action: actionType, meta: details };
        
        fetch(API_URL, {
            method: "POST",
            mode: "no-cors", 
            cache: "no-cache", // Evita cache de redirect 302
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
        }).catch(e => console.log("Log fail", e));
    },

    // 3. ENVIAR NOVO BROADCAST (Admin - POST)
    sendBroadcast: async (payload) => {
        // payload = { title, type, text, author }
        const fullPayload = {
            op: "new_broadcast", // Gatilho para o doPost no Apps Script
            ...payload,
            date: new Date().toISOString(),
            id: Date.now().toString() 
        };

        try {
            console.log("📤 Enviando Broadcast (POST)...", fullPayload);
            
            // Usamos 'no-cors' pois o Google Script não retorna headers CORS em POST
            // O navegador vai acusar "Opaque Response", mas o dado chega no servidor.
            await fetch(API_URL, {
                method: "POST",
                mode: "no-cors",
                cache: "no-cache", // Importante: força o navegador a não cachear o redirect
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(fullPayload)
            });
            
            console.log("✅ Requisição de envio disparada.");
            return true;
        } catch (e) {
            console.error("❌ Erro ao enviar broadcast:", e);
            return false;
        }
    },
};