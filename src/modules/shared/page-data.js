// src/modules/shared/page-data.js

// Variável que guarda o nome para usar nos emails depois
let cachedAgentName = "";

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- 1. SHERLOCK HOLMES (Captura Silenciosa) ---
export async function captureNameWithMagic() {
    // Se já temos o nome, não precisa rodar a mágica de novo
    if (cachedAgentName) return cachedAgentName;

    try {
        const btn = document.querySelector('profile-icon material-button') || 
                    document.querySelector('a[aria-label*="Account"]');
        
        if (!btn) return "Consultor";

        // Clica (Abre)
        btn.click();
        await esperar(100); // Espera renderizar
        
        let name = "Consultor";
        
        // Tenta ler do HTML
        const el = document.querySelector('profile-details .name');
        if (el) {
            const fullName = el.textContent.trim();
            // Pega o primeiro nome e Capitaliza (LUCAS -> Lucas)
            name = fullName.split(' ')[0];
            name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        } else {
            // Fallback: URL da foto
            const img = document.querySelector('profile-details img');
            if (img && img.src.includes('/photos/')) {
                const ldap = img.src.match(/\/photos\/([^\?]+)/)[1];
                name = ldap.charAt(0).toUpperCase() + ldap.slice(1);
            }
        }
        
        // Fecha
        btn.click();
        document.body.click();
        
        // SALVA NA MEMÓRIA PARA USAR NOS EMAILS
        cachedAgentName = name;
        
        return name;

    } catch (e) {
        console.warn("Sherlock falhou:", e);
        return "Consultor";
    }
}

// --- 2. GETTER SIMPLES (Para usar nos E-mails) ---
export function getAgentName() {
    // Retorna o nome capturado ou um fallback se a animação não rodou
    return cachedAgentName || "Consultor";
}

// --- 3. ENGINE DE SAUDAÇÃO (Bom dia / Sextou) ---
export function getSmartGreeting(name) {
    const now = new Date();
    const h = now.getHours();
    const d = now.getDay(); 
    
    let prefix = "Olá";
    let iconSVG = "";

    // Ícones (Sol/Lua)
    if (h >= 5 && h < 12) {
        prefix = "Bom dia";
        iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>`;
    } else if (h >= 12 && h < 18) {
        prefix = "Boa tarde";
        iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>`;
    } else {
        prefix = "Boa noite";
        iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }

    // Frases Contextuais
    let phrases = [];
    if (h >= 0 && h < 5) {
        phrases = ["Guerreiro da madrugada.", "O mundo dorme, você avança.", "Foco total."];
    } else if (h < 12) {
        if (d === 1) phrases = ["Vamos definir o tom da semana.", "Nova semana, novas conquistas."];
        else if (d === 5) phrases = ["O último gás antes do descanso.", "Vamos fechar com chave de ouro."];
        else phrases = ["Que seu dia seja produtivo.", "Foco e café para hoje."];
    } else if (h < 18) {
        phrases = ["Mantenha o ritmo.", "Tarde produtiva pela frente.", "Seguimos avançando."];
    } else {
        phrases = ["Encerrando o dia com produtividade.", "Excelente dedicação."];
    }
    
    if (d === 0 || d === 6) phrases = ["Sua dedicação no fim de semana é inspiradora.", "Trabalho excepcional."];

    const randomSuffix = phrases[Math.floor(Math.random() * phrases.length)];

    return {
        prefix: `${prefix},`,
        name: name,
        suffix: randomSuffix,
        icon: iconSVG,
        isFriday: (d === 5) // Gatilho do Sextou
    };
}

// Mantém a função antiga de dados da página
export function getPageData() {
    return {
        advertiserName: "Cliente", // Sua lógica de xpath aqui se quiser
        websiteUrl: "URL",
        agentName: getAgentName() // <--- AGORA USA O NOME GUARDADO
    };
}