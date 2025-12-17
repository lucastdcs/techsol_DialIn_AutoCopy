// src/modules/shared/page-data.js

// Variável que guarda o nome para usar nos emails depois
let cachedAgentName = "";

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- 1. SHERLOCK HOLMES (Captura Silenciosa do Nome do Agente) ---
export async function captureNameWithMagic() {
    if (cachedAgentName) return cachedAgentName;

    try {
        const btn = document.querySelector('profile-icon material-button') || 
                    document.querySelector('a[aria-label*="Account"]');
        
        if (!btn) return "Agente";

        btn.click();
        await esperar(100); 
        
        let name = "Consultor";
        
        const el = document.querySelector('profile-details .name');
        if (el) {
            const fullName = el.textContent.trim();
            name = fullName.split(' ')[0];
            name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        } else {
            const img = document.querySelector('profile-details img');
            if (img && img.src.includes('/photos/')) {
                const ldap = img.src.match(/\/photos\/([^\?]+)/)[1];
                name = ldap.charAt(0).toUpperCase() + ldap.slice(1);
            }
        }
        
        btn.click();
        document.body.click(); // Fecha qualquer menu aberto
        
        cachedAgentName = name;
        return name;

    } catch (e) {
        console.warn("Sherlock falhou:", e);
        return "Consultor";
    }
}

// --- 2. GETTER SIMPLES ---
export function getAgentName() {
    return cachedAgentName || "Consultor";
}

// --- 3. ENGINE DE SAUDAÇÃO ---
export function getSmartGreeting(name) {
    const now = new Date();
    const h = now.getHours();
    const d = now.getDay(); 
    
    let prefix = "Olá";
    let iconSVG = "";

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
        isFriday: (d === 5)
    };
}

// --- 4. CAPTURA DE EMAIL DO CLIENTE (Com Validação de @) ---
export async function captureClientEmail() {
    try {
        // 1. Acha o label "Contact email"
        const xpath = "//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]";
        const labelNode = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (!labelNode) return null; // Retorna null se não achar, para tratar depois

        // Sobe para o container pai que guarda Label e Valor
        const container = labelNode.parentElement;

        // 2. Verifica máscara e clica se necessário
        const unmaskBtn = container.querySelector('.unmask-button') || 
                          container.querySelector('[aria-label="Click to view"]');

        if (unmaskBtn) {
            unmaskBtn.click();
            // Espera o Angular renderizar o valor real
            await esperar(500); 
        }

        // 3. BUSCA INTELIGENTE (Procura por @ e ignora "Is this: Email?")
        const candidates = Array.from(container.querySelectorAll('a, span, div, pii-value'));
        
        // Filtramos o candidato vencedor
        const emailElement = candidates.find(el => {
            const text = el.innerText.trim();
            // REGRAS: Tem @, não é pergunta do feedback, não é placeholder "Email"
            return text.includes('@') && 
                   !text.includes('Is this:') && 
                   text.toLowerCase() !== 'email';
        });

        if (emailElement) {
            return emailElement.innerText.trim();
        }

        return null;

    } catch (e) {
        console.warn("Erro ao capturar email do cliente:", e);
        return null;
    }
}

// --- 5. CAPTURA DE EMAIL INTERNO (@google) ---
export function captureInternalEmail() {
    try {
        // Busca o input de busca/conta no topo
        const inputWrapper = document.querySelector('material-input[debug-id="account-id-input"]');
        
        if (inputWrapper) {
            const inputElement = inputWrapper.querySelector('input');
            if (inputElement) {
                const val = inputElement.value.trim();
                
                // Se tiver valor, verifica se precisa adicionar o domínio
                if (val) {
                     // Se tiver @ devolve, se for só ldap adiciona @google.com
                    return val.includes('@') ? val : `${val}@google.com`;
                }
            }
        }
    } catch (e) {
        console.warn("Erro ao capturar email interno:", e);
    }
    return null;
}

// --- 6. COMPILADOR DE DADOS DA PÁGINA ---
export async function getPageData() {
    let advertiserName = "Cliente";
    let websiteUrl = "[INSERIR URL]";

    // Captura NOME DO ANUNCIANTE
    try {
        const nameXpath = "//div[contains(text(), 'Given name')]";
        const nameNode = document.evaluate(nameXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        if (nameNode && nameNode.nextElementSibling) {
            const rawName = nameNode.nextElementSibling.innerText.trim();
            if (rawName) advertiserName = rawName;
        }
    } catch (e) { console.warn("Falha Nome:", e); }

    // Captura WEBSITE
    try {
        const urlXpath = "//div[contains(text(), 'Website')]";
        const urlNode = document.evaluate(urlXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        if (urlNode && urlNode.nextElementSibling) {
            const rawUrl = urlNode.nextElementSibling.innerText.trim();
            if (rawUrl) websiteUrl = rawUrl;
        }
    } catch (e) { console.warn("Falha URL:", e); }

    // Captura EMAILS (Novos Campos)
    const clientEmail = await captureClientEmail();
    const internalEmail = captureInternalEmail();

    return {
        advertiserName: advertiserName,
        websiteUrl: websiteUrl,
        clientEmail: clientEmail,     // Pode ser null
        internalEmail: internalEmail, // Pode ser null
        agentName: getAgentName()
    };
}