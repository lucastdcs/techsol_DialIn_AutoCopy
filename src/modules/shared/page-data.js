// src/modules/shared/page-data.js

export function getPageData() {
    let advertiserName = "Cliente";
    let websiteUrl = "[INSERIR URL]";

    // 1. Captura NOME DO ANUNCIANTE (via Given name)
    try {
        const nameXpath = "//div[contains(text(), 'Given name')]";
        const nameNode = document.evaluate(nameXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        if (nameNode && nameNode.nextElementSibling) {
            const rawName = nameNode.nextElementSibling.innerText.trim();
            if (rawName) advertiserName = rawName;
        }
    } catch (e) {
        console.warn("Falha ao capturar Nome:", e);
    }

    // 2. Captura WEBSITE (via Website)
    try {
        const urlXpath = "//div[contains(text(), 'Website')]";
        const urlNode = document.evaluate(urlXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        if (urlNode && urlNode.nextElementSibling) {
            const rawUrl = urlNode.nextElementSibling.innerText.trim();
            if (rawUrl) websiteUrl = rawUrl;
        }
    } catch (e) {
        console.warn("Falha ao capturar Website:", e);
    }

    return {
        advertiserName,
        websiteUrl
    };
}