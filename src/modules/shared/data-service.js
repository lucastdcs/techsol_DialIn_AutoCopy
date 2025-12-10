// src/modules/shared/data-service.js

// SUA URL DO GOOGLE APPS SCRIPT
const API_URL = "https://script.google.com/a/macros/google.com/s/AKfycbyMRSU73aP76rZCw-dVLjFh7LLskfwPOiQLM1mzrbNuMX0mhsdSzd75_sbJSWfocGF95A/exec";

const CACHE_KEY_BROADCAST = "cw_data_broadcast";
const CACHE_KEY_TIPS = "cw_data_tips";

export const DataService = {
    
    // 1. BUSCAR DADOS
    fetchData: async () => {
        try {
            // Adicionamos um timestamp para evitar cache do navegador na requisição
            const bustCache = "?t=" + new Date().getTime();
            
            const response = await fetch(API_URL + bustCache, { 
                method: "GET",
                // IMPORTANTE:
                // 1. 'follow': Segue o redirecionamento do Google
                // 2. SEM headers customizados para evitar preflight OPTIONS que falha no Google
                redirect: "follow" 
            });
            
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

            const data = await response.json();

            // Validação simples para garantir que veio o que esperamos
            if (data && (data.broadcast || data.tips)) {
                if (data.broadcast) localStorage.setItem(CACHE_KEY_BROADCAST, JSON.stringify(data.broadcast));
                if (data.tips) localStorage.setItem(CACHE_KEY_TIPS, JSON.stringify(data.tips));
                return data;
            } else {
                throw new Error("JSON inválido recebido");
            }

        } catch (error) {
            console.warn("TechSol: Falha na nuvem, usando cache.", error);
            // Retorna cache silenciosamente
            return {
                broadcast: JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]"),
                tips: JSON.parse(localStorage.getItem(CACHE_KEY_TIPS) || "[]")
            };
        }
    },

    // ... (Mantenha o resto: getCachedBroadcasts, logUsage, etc iguais) ...
    getCachedBroadcasts: () => {
        return JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]");
    },
    
    getCachedTips: () => {
        return JSON.parse(localStorage.getItem(CACHE_KEY_TIPS) || "[]");
    },

    logUsage: (actionType, details = "") => {
        const user = window._USER_ID || document.querySelector('meta[name="user-login"]')?.content || "unknown_agent";
        const payload = { user, action: actionType, details };

        // Log usa POST com no-cors (Fire and Forget)
        fetch(API_URL, {
            method: "POST",
            mode: "no-cors", 
            headers: { "Content-Type": "text/plain" }, // Text/plain evita preflight
            body: JSON.stringify(payload)
        }).catch(err => console.error("Log failed", err));
    }
};