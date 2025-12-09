// src/modules/notes/components/step-scenarios.js

import { scenarioSnippets } from "../notes-data.js";

export function createScenariosComponent(onSelectCallback) {
  // Container Principal
  const container = document.createElement("div");
  container.className = "cw-step-scenarios";
  
  // 1. Área de Chips (Grid)
  const grid = document.createElement("div");
  Object.assign(grid.style, {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "12px"
  });

  // 2. Área de Preview (Onde o texto aparece ao passar o mouse)
  const previewBox = document.createElement("div");
  Object.assign(previewBox.style, {
    padding: "12px",
    background: "#f8f9fa",
    border: "1px dashed #dadce0",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#5f6368",
    lineHeight: "1.5",
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    fontStyle: "italic",
    transition: "all 0.2s ease"
  });
  previewBox.innerHTML = "<span>Passe o mouse sobre um cenário para visualizar o texto...</span>";

  // Estado interno
  let activeValue = null;

  // Renderiza os Snippets
  // scenarioSnippets vem do notes-data.js: { "key": "Texto...", "key2": "Texto..." }
  Object.entries(scenarioSnippets).forEach(([label, textValue]) => {
    const chip = document.createElement("div");
    chip.textContent = label; // Ex: "Sem Acesso", "Cliente Ausente"
    
    // Estilo Base do Chip (Google Material)
    Object.assign(chip.style, {
      padding: "6px 12px",
      borderRadius: "16px",
      border: "1px solid #dadce0",
      background: "#ffffff",
      fontSize: "13px",
      color: "#3c4043",
      cursor: "pointer",
      userSelect: "none",
      transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    });

    // Eventos
    
    // 1. Hover (Preview)
    chip.onmouseenter = () => {
      if (activeValue !== textValue) {
        previewBox.style.background = "#fff";
        previewBox.style.borderColor = "#1a73e8";
        previewBox.style.color = "#202124";
        previewBox.textContent = `"${textValue.substring(0, 120)}${textValue.length > 120 ? '...' : ''}"`;
      }
      // Efeito tátil
      if (activeValue !== textValue) chip.style.background = "#f1f3f4";
    };

    chip.onmouseleave = () => {
      if (activeValue !== textValue) {
        // Reseta preview se não tiver nada selecionado
        if (!activeValue) {
             previewBox.style.background = "#f8f9fa";
             previewBox.style.borderColor = "#dadce0";
             previewBox.style.color = "#5f6368";
             previewBox.innerHTML = "<span>Passe o mouse sobre um cenário para visualizar o texto...</span>";
        } else {
            // Volta a mostrar o selecionado
            // (Opcional, depende da preferência. Eu prefiro limpar para não confundir)
        }
        chip.style.background = "#ffffff";
      }
    };

    // 2. Clique (Seleção)
    chip.onclick = () => {
      // Toggle (Se clicar no mesmo, desmarca)
      if (activeValue === textValue) {
        activeValue = null;
        updateVisuals();
        onSelectCallback(""); // Envia vazio
      } else {
        activeValue = textValue;
        updateVisuals();
        
        // Efeito de "Pulo" ao selecionar
        chip.style.transform = "scale(0.95)";
        setTimeout(() => chip.style.transform = "scale(1)", 150);
        
        onSelectCallback(textValue); // Envia o texto
      }
    };

    grid.appendChild(chip);
  });

  // Função para atualizar classes visuais (Ativo/Inativo)
  function updateVisuals() {
    Array.from(grid.children).forEach(child => {
        // Precisamos achar o texto correspondente ao chip. 
        // Como o chip.textContent é a chave, buscamos no scenarioSnippets
        const chipText = scenarioSnippets[child.textContent];
        
        if (chipText === activeValue) {
            // Ativo
            child.style.background = "#e8f0fe";
            child.style.borderColor = "#1a73e8";
            child.style.color = "#1967d2";
            child.style.fontWeight = "500";
        } else {
            // Inativo
            child.style.background = "#ffffff";
            child.style.borderColor = "#dadce0";
            child.style.color = "#3c4043";
            child.style.fontWeight = "400";
        }
    });
  }

  container.appendChild(grid);
  container.appendChild(previewBox);

  return container;
}