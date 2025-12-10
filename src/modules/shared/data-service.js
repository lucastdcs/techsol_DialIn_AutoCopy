// src/modules/shared/data-service.js

// SUA URL DO GOOGLE APPS SCRIPT
const API_URL = "https://script.google.com/a/macros/google.com/s/AKfycbyMRSU73aP76rZCw-dVLjFh7LLskfwPOiQLM1mzrbNuMX0mhsdSzd75_sbJSWfocGF95A/exec";

// Cache Keys (Para salvar no navegador)
const CACHE_KEY_BROADCAST = "cw_data_broadcast";
const CACHE_KEY_TIPS = "cw_data_tips";

export const DataService = {
    
    // 1. BUSCAR DADOS (Broadcast + Tips)
    fetchData: async () => {
        try {
            // Tenta buscar na nuvem
            // 'credentials: "include"' tenta passar o login do usuário (SSO) automaticamente
            const response = await fetch(API_URL, { 
                method: "GET",
                // mode: 'cors', // Às vezes necessário, mas tente padrão primeiro
            });
            
            if (!response.ok) throw new Error("Erro na rede");

            const data = await response.json();

            // Se deu certo, salva no cache local para a próxima vez ser rápida
            if (data.broadcast) {
                localStorage.setItem(CACHE_KEY_BROADCAST, JSON.stringify(data.broadcast));
            }
            if (data.tips) {
                localStorage.setItem(CACHE_KEY_TIPS, JSON.stringify(data.tips));
            }

            return data;
        } catch (error) {
            console.warn("TechSol: Falha ao atualizar dados da nuvem. Usando cache.", error);
            // Se falhar (offline/erro), retorna o que tem no cache
            return {
                broadcast: JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]"),
                tips: JSON.parse(localStorage.getItem(CACHE_KEY_TIPS) || "[]")
            };
        }
    },

    // 2. OBTER DADOS DO CACHE (Para loading instantâneo)
    getCachedBroadcasts: () => {
        return JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]");
    },
    
    getCachedTips: () => {
        return JSON.parse(localStorage.getItem(CACHE_KEY_TIPS) || "[]");
    },

    // 3. ENVIAR LOGS (Analytics)
    // "Fire and Forget" - Dispara e não espera resposta para não travar a UI
    logUsage: (actionType, details = "") => {
        // Tenta detectar o usuário (Simples)
        const user = window._USER_ID || document.querySelector('meta[name="user-login"]')?.content || "unknown_agent";
        
        const payload = {
            user: user,
            action: actionType,
            details: details
        };

        // Envia via POST sem esperar (no-cors para evitar bloqueios de segurança)
        fetch(API_URL, {
            method: "POST",
            mode: "no-cors", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).catch(err => console.error("Log failed", err));
    }
};