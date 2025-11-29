// src/modules/notes/tag-support.js

// 1. Importa styleLabel do utils (geral)
import { styleLabel } from '../shared/utils.js'; 

// 2. Importa o resto do arquivo de estilos que criamos agora
import { 
    styleInput, 
    styleRadioContainer, 
    styleCheckboxInput, 
    styleTagSupportContainer, 
    styleWarningText 
} from './notes-styles.js';

export function createTagSupportModule() {
    // 1. Construção da UI
    const container = document.createElement("div");
    Object.assign(container.style, styleTagSupportContainer);

    const mainLabel = document.createElement("label");
    mainLabel.textContent = "Utilizou o Tag Support para criar/verificar?";
    Object.assign(mainLabel.style, styleLabel, { marginTop: "0" });

    // Radios
    const radioContainer = document.createElement("div");
    Object.assign(radioContainer.style, styleRadioContainer);

    // Sim
    const divSim = document.createElement("div"); Object.assign(divSim.style, { display: 'flex', alignItems: 'center' });
    const rSim = document.createElement("input"); rSim.type = "radio"; rSim.name = "ts_usage_mod"; rSim.value = "Sim"; 
    Object.assign(rSim.style, styleCheckboxInput);
    const lSim = document.createElement("label"); lSim.textContent = "Sim";
    divSim.appendChild(rSim); divSim.appendChild(lSim);
    
    // Não
    const divNao = document.createElement("div"); Object.assign(divNao.style, { display: 'flex', alignItems: 'center' });
    const rNao = document.createElement("input"); rNao.type = "radio"; rNao.name = "ts_usage_mod"; rNao.value = "Não"; rNao.checked = true;
    Object.assign(rNao.style, styleCheckboxInput);
    const lNao = document.createElement("label"); lNao.textContent = "Não";
    divNao.appendChild(rNao); divNao.appendChild(lNao);

    radioContainer.appendChild(divSim); radioContainer.appendChild(divNao);

    // Motivo e Aviso
    const reasonDiv = document.createElement("div");
    reasonDiv.style.display = "block"; // Default

    const reasonLabel = document.createElement("label");
    reasonLabel.textContent = "Qual foi o Motivo?";
    Object.assign(reasonLabel.style, styleLabel, { fontSize: "12px" });

    const reasonInput = document.createElement("input");
    reasonInput.type = "text";
    Object.assign(reasonInput.style, styleInput);

    const warningText = document.createElement("div");
    warningText.innerHTML = `⚠️ <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400">Link aqui</a>`;
    Object.assign(warningText.style, styleWarningText);

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

    function updateVisibility(subStatus, selectedTasksArray) {
        // 1. Filtros Básicos (Se for Educação ou vazio, esconde)
        if (!subStatus || subStatus.includes('Education')) {
            container.style.display = 'none';
            return;
        }
        
        if (!selectedTasksArray || selectedTasksArray.length === 0) {
            container.style.display = 'none';
            return;
        }

        // 2. Identificação das Tasks
        const hasEnhanced = selectedTasksArray.some(t => 
            t.includes('enhanced') || t === 'ec_google_ads'
        );

        const hasAdsConversion = selectedTasksArray.some(t => 
            (t.includes('conversion') || t.includes('ads')) && !t.includes('enhanced')
        );

        // GTM é neutro nesta lógica (permitido), então não precisamos verificar ele explicitamente
        // para bloquear, apenas garantimos que não vamos bloquear se ele estiver lá.

        const hasAnalytics = selectedTasksArray.some(t => 
            t.includes('ga4') || t.includes('analytics') || t.includes('ua')
        );

        const hasMerchant = selectedTasksArray.some(t => 
            t.includes('merchant') || t.includes('gmc') || t.includes('shopping')
        );
        
        // --- REGRA FINAL ---
        
        // CASO 1: Tem Enhanced Conversion? (Soberano)
        if (hasEnhanced) {
            container.style.display = 'block';
            return;
        }

        // CASO 2: Ads Conversion (Permite GTM, Bloqueia Analytics/Merchant)
        // Lógica: Tem Ads Conversion E (Não tem Analytics E Não tem Merchant)
        if (hasAdsConversion && !hasAnalytics && !hasMerchant) {
            container.style.display = 'block';
            return;
        }

        // Se não caiu em nenhum caso acima
        container.style.display = 'none';
    }

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
        rSim.checked = false;
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