// src/modules/shared/data-service.js

// SUA URL DO GOOGLE APPS SCRIPT (Verifique se é a implantação 'exec', não 'dev')
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
    
    // 1. BUSCAR TODAS AS DICAS (Tips)
    // Usamos fetch normal pois seu Apps Script retorna JSON
    fetchTips: async () => {
        try {
            // Chama a operação 'tips' no script
            const response = await fetch(`${API_URL}?op=tips`);
            const data = await response.json();

            if (data && data.tips && Array.isArray(data.tips)) {
                localStorage.setItem(CACHE_KEY_TIPS, JSON.stringify(data.tips));
                console.log("✅ Dicas atualizadas da nuvem.");
            }
        } catch (err) {
            console.warn("TechSol: Falha ao baixar dicas (usando offline).", err);
            // Não faz nada, deixa o sistema usar o cache antigo ou o fallback
        }
    },

    // 2. BUSCAR BROADCASTS
    fetchData: async () => {
        try {
            // Chama a operação padrão (broadcast)
            const response = await fetch(`${API_URL}?op=broadcast`);
            const data = await response.json();

            if (data && data.broadcast) {
                localStorage.setItem(CACHE_KEY_BROADCAST, JSON.stringify(data.broadcast));
            }
            return data;
        } catch (err) {
            console.warn("TechSol: Erro ao buscar Broadcasts.", err);
            // Retorna o que tem no cache para não deixar a tela em branco
            return {
                broadcast: JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]")
            };
        }
    },

    // 3. RECUPERAR DO CACHE (Leitura rápida)
    getCachedBroadcasts: () => JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]"),
    
    // 4. OBTER DICA ALEATÓRIA (Inteligente: Cache > Fallback)
    getRandomTip: () => {
        let tips = FALLBACK_TIPS;
        
        const cached = localStorage.getItem(CACHE_KEY_TIPS);
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                if (parsed.length > 0) tips = parsed;
            } catch (e) {
                console.error("Cache de dicas corrompido, resetando.");
                localStorage.removeItem(CACHE_KEY_TIPS);
            }
        }
        
        return tips[Math.floor(Math.random() * tips.length)];
    },

    // 5. ENVIAR LOGS (Analytics)
    // Usa no-cors para enviar dados sem esperar resposta (Fire & Forget)
    logUsage: (actionType, details = "") => {
        const user = window._USER_ID || "agente_anonimo"; 
        
        // Payload simples em JSON para o doPost
        const payload = { 
            op: "log", // Importante avisar que é log
            user: user, 
            action: actionType, 
            meta: details 
        };

        // O 'no-cors' com text/plain é a forma mais robusta de passar por CSP corporativo
        fetch(API_URL, {
            method: "POST",
            mode: "no-cors", 
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
        }).catch(e => console.log("Log error (ignorable)", e));
    }
};