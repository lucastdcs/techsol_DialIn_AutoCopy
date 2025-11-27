// src/modules/notes/tag-support.js

import { styleLabel, styleInput, styleRadioContainer, styleCheckboxInput } from '../shared/utils.js';

// Estilos locais específicos
const styleContainer = { 
    marginTop: "16px", marginBottom: "12px", padding: "10px", 
    background: "#fff8e1", borderRadius: "6px", border: "1px solid #ffecb3", 
    display: "none" 
};
const styleWarning = { fontSize: "12px", color: "#e37400", marginTop: "4px" };

export function createTagSupportModule() {
    // 1. Construção da UI
    const container = document.createElement("div");
    Object.assign(container.style, styleContainer);

    const mainLabel = document.createElement("label");
    mainLabel.textContent = "Utilizou o Tag Support para criar/verificar?";
    Object.assign(mainLabel.style, styleLabel, { marginTop: "0" });

    // Radios
    const radioContainer = document.createElement("div");
    Object.assign(radioContainer.style, styleRadioContainer);

    const rSim = document.createElement("input"); rSim.type = "radio"; rSim.name = "ts_usage_mod"; rSim.value = "Sim"; 
    Object.assign(rSim.style, styleCheckboxInput);
    const lSim = document.createElement("label"); lSim.textContent = "Sim";
    
    const rNao = document.createElement("input"); rNao.type = "radio"; rNao.name = "ts_usage_mod"; rNao.value = "Não"; rNao.checked = true;
    Object.assign(rNao.style, styleCheckboxInput);
    constlNao = document.createElement("label"); lNao.textContent = "Não";

    const divSim = document.createElement("div"); Object.assign(divSim.style, { display: 'flex', alignItems: 'center' });
    divSim.appendChild(rSim); divSim.appendChild(lSim);

    const divNao = document.createElement("div"); Object.assign(divNao.style, { display: 'flex', alignItems: 'center' });
    divNao.appendChild(rNao); divNao.appendChild(lNao);

    radioContainer.appendChild(divSim); radioContainer.appendChild(divNao);

    // Motivo e Aviso
    const reasonDiv = document.createElement("div");
    reasonDiv.style.display = "block"; // Default visível pois 'Não' é default

    const reasonLabel = document.createElement("label");
    reasonLabel.textContent = "Qual foi o Motivo?";
    Object.assign(reasonLabel.style, styleLabel, { fontSize: "12px" });

    const reasonInput = document.createElement("input");
    reasonInput.type = "text";
    Object.assign(reasonInput.style, styleInput);

    const warningText = document.createElement("div");
    warningText.innerHTML = `⚠️ <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400">Link aqui</a>`;
    Object.assign(warningText.style, styleWarning);

    reasonDiv.appendChild(reasonLabel);
    reasonDiv.appendChild(reasonInput);
    reasonDiv.appendChild(warningText);

    container.appendChild(mainLabel);
    container.appendChild(radioContainer);
    container.appendChild(reasonDiv);

    // Eventos Internos
    rSim.onchange = () => { reasonDiv.style.display = 'none'; };
    rNao.onchange = () => { reasonDiv.style.display = 'block'; };

    // --- LÓGICA PÚBLICA ---

    // Função para decidir se mostra ou esconde
    function updateVisibility(subStatus, selectedTasksArray) {
        if (!subStatus || subStatus.includes('Education')) {
            container.style.display = 'none';
            return;
        }
        
        if (selectedTasksArray.length === 0) {
            container.style.display = 'none';
            return;
        }

        // Regras
        const hasEnhanced = selectedTasksArray.some(t => t.includes('enhanced') || t === 'ec_google_ads');
        
        // Verifica se é APENAS Ads Conversion (sem GA4, sem Merchant)
        const hasAdsConv = selectedTasksArray.some(t => t.includes('conversion'));
        const hasAnalytics = selectedTasksArray.some(t => t.includes('ga4') || t.includes('analytics'));
        const hasMerchant = selectedTasksArray.some(t => t.includes('merchant') || t.includes('gmc'));
        
        const isOnlyAds = hasAdsConv && !hasAnalytics && !hasMerchant && !hasEnhanced;

        if (hasEnhanced || isOnlyAds) {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    }

    // Função para gerar o texto final
    function getOutput() {
        if (container.style.display === 'none') return '';

        let text = `<br><b>Utilizou Tag Support?</b> ${rSim.checked ? "Sim" : "Não"}`;
        if (rNao.checked && reasonInput.value.trim() !== "") {
            text += `<br><b>Motivo:</b> ${reasonInput.value}`;
        }
        text += `<br>`;
        return text;
    }

    function reset() {
        container.style.display = 'none';
        rNao.checked = true;
        reasonDiv.style.display = 'block';
        reasonInput.value = '';
    }

    return {
        element: container,
        updateVisibility,
        getOutput,
        reset
    };
}