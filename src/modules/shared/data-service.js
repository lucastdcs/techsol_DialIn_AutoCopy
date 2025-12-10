// src/modules/shared/data-service.js

// SUA URL DO GOOGLE APPS SCRIPT
const API_URL = "https://script.google.com/a/macros/google.com/s/AKfycbwojbYGOUlE6g2HEMLAtF6U7caJX355Y3dzJaKqD3UOpztRjH0LmBldXa1lb0gNRbGT8w/exec";
// src/modules/shared/data-service.js

const CACHE_KEY_BROADCAST = "cw_data_broadcast";
const CACHE_KEY_TIPS = "cw_data_tips";

export const DataService = {
    
    // 1. BUSCAR DADOS (Via JSONP - O "Cavalo de Troia")
    fetchData: () => {
        return new Promise((resolve, reject) => {
            // Cria um nome de função único temporário
            const callbackName = "cw_callback_" + Math.round(100000 * Math.random());
            
            // Cria a função global que o Google vai chamar
            window[callbackName] = (data) => {
                // 1. Salva no Cache
                if (data.broadcast) localStorage.setItem(CACHE_KEY_BROADCAST, JSON.stringify(data.broadcast));
                if (data.tips) localStorage.setItem(CACHE_KEY_TIPS, JSON.stringify(data.tips));
                
                // 2. Limpa a sujeira (remove o script e a função global)
                document.body.removeChild(script);
                delete window[callbackName];
                
                resolve(data);
            };

            // Cria a tag <script> invisível
            const script = document.createElement('script');
            script.src = `${API_URL}?callback=${callbackName}`;
            script.onerror = (err) => {
                reject(err);
                document.body.removeChild(script);
                delete window[callbackName];
            };
            
            document.body.appendChild(script);
        }).catch(err => {
            console.warn("TechSol: Erro na nuvem (JSONP), usando cache.", err);
            return {
                broadcast: JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]"),
                tips: JSON.parse(localStorage.getItem(CACHE_KEY_TIPS) || "[]")
            };
        });
    },

    getCachedBroadcasts: () => JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]"),
    getCachedTips: () => JSON.parse(localStorage.getItem(CACHE_KEY_TIPS) || "[]"),

    // 2. LOG USAGE (Via no-cors)
    // Para escrever (POST), usamos fetch com mode: 'no-cors'.
    // Isso manda o dado, mas não espera resposta (não gera erro de CORS).
    logUsage: (actionType, details = "") => {
        const user = window._USER_ID || document.querySelector('meta[name="user-login"]')?.content || "unknown_agent";
        const payload = { user, action: actionType, details };

        // Transformamos em form-data para garantir que passe pelos firewalls chatos
        const formData = new FormData();
        formData.append('data', JSON.stringify(payload));

        fetch(API_URL, {
            method: "POST",
            mode: "no-cors", // <--- O Segredo para não dar erro no POST
            body: formData
        }).catch(e => console.log("Log error (ignorable)", e));
    }
};