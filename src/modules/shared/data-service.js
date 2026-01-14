// src/modules/shared/data-service.js

// MANTENHA A URL QUE VOCÊ JÁ TEM (A VERSÃO /a/macros/... É IMPORTANTE AGORA)
const API_URL = "https://script.google.com/a/macros/google.com/s/AKfycbypA8Rn86cg50mtwwzOQVTH8nabRpQnumplWxNYvNEDNRdf4CZdWxSPeEKMsnvD1E4Vtg/exec";

const CACHE_KEY_BROADCAST = "cw_data_broadcast";
const CACHE_KEY_TIPS = "cw_data_tips";

const FALLBACK_TIPS = ["Processando...", "Mantenha o foco!", "Aguarde..."];

// --- Helper JSONP Poderoso (Aceita dados) ---
function jsonpFetch(operation, params = {}) {
    return new Promise((resolve, reject) => {
        const callbackName = 'cw_cb_' + Math.round(100000 * Math.random());
        const script = document.createElement('script');
        
        window[callbackName] = (data) => {
            if (document.body.contains(script)) document.body.removeChild(script);
            delete window[callbackName];
            resolve(data);
        };

        // Converte objeto params em string query (ex: &title=Oi&text=TudoBem)
        const queryString = Object.keys(params)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join('&');

        // Monta URL
        const finalUrl = `${API_URL}?op=${operation}&callback=${callbackName}&t=${Date.now()}&${queryString}`;
        
        script.src = finalUrl;
        
        script.onerror = () => {
            if (document.body.contains(script)) document.body.removeChild(script);
            delete window[callbackName];
            // Em scripts corporativos, as vezes o onerror dispara mesmo com sucesso se o mimetype variar,
            // mas geralmente é bloqueio.
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

    // 3. ENVIAR NOVO BROADCAST (Via GET/JSONP para bypass Auth Corp)
    sendBroadcast: async (payload) => {
        console.log("📤 Enviando via JSONP (Corp Bypass)...", payload);
        
        const fullPayload = {
            ...payload,
            date: new Date().toISOString(),
            id: Date.now().toString() 
        };

        try {
            // Agora chamamos jsonpFetch passando os dados como parâmetros de URL
            const response = await jsonpFetch('new_broadcast', fullPayload);
            
            if (response && response.status === 'success') {
                console.log("✅ Sucesso confirmado pelo servidor!");
                return true;
            } else {
                console.warn("⚠️ Servidor recebeu mas retornou:", response);
                return false;
            }
        } catch (e) {
            console.error("❌ Erro no envio JSONP:", e);
            // Dica: Se der erro aqui, verifique se está logado no Google na mesma aba
            return false;
        }
    },
    
    logUsage: () => {} // Logs desabilitados temporariamente para evitar complexidade
};