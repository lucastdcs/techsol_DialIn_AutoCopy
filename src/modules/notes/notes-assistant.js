import { createTagSupportModule } from "./tag-support.js";
import { buildNotesUI } from "./notes-ui.js";
import { showToast } from "../shared/utils.js";

import {
  TASKS_DB,
  SUBSTATUS_TEMPLATES,
  SUBSTATUS_SHORTCODES,
  textareaListFields,
  textareaParagraphFields,
  scenarioSnippets,
  translations,
} from "./notes-data.js";

import { runEmailAutomation } from "../email/email-automation.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { animationStyles, togglePopupAnimation } from "../shared/animations.js";

import * as NoteStyles from "./notes-styles.js";
import {
  copyHtmlToClipboard,
  ensureNoteCardIsOpen,
  triggerInputEvents,
} from "./notes-bridge.js";

export function initCaseNotesAssistant() {
  const CURRENT_VERSION = "v3.5.4";

  let currentCaseType = "bau";
  let currentLang = "pt";
  let isPortugalCase = false;

  // 1. INICIALIZAÇÃO DE MÓDULOS AUXILIARES
  const tagSupport = createTagSupportModule();

  // 2. CONSTRUÇÃO DA UI (Via Factory)
  // Passamos a versão e o callback de fechar
  const ui = buildNotesUI(CURRENT_VERSION, () => togglePopup(false));

  // 3. DESEMPACOTAMENTO (Mapeia a UI para as variáveis que sua lógica já usa)
  // Isso evita que você tenha que renomear variáveis no arquivo todo.

  const {
    popup,
    btn,
    btnContainer,
    animRefs,
    emailCheckbox,
    subStatusHelpLink,
  } = ui;

  const { main: mainStatusSelect, sub: subStatusSelect } = ui.selects;

  const {
    tasks: taskCheckboxesContainer,
    dynamicForms: dynamicFormFieldsContainer,
    screenshots: screenshotsListDiv,
    screenshotsRoot: screenshotsContainer,
    snippet: snippetContainer,
    tagSupportSlot, // O local reservado para o Tag Support
  } = ui.containers;

  const { copy: copyButton, generate: generateButton } = ui.buttons;

  const {
    portugalSim: portugalRadioSim,
    portugalNao: portugalRadioNao,
    consentSim: consentRadioSim,
    consentNao: consentRadioNao,
  } = ui.radios;

  const { typeBAU, typeLM, langPT, langES } = ui.toggleDivs;

  // Variáveis de Steps (para o resetSteps)
  const {
    snippets: stepSnippetsDiv,
    tasks: step2Div,
    forms: step3Div,
    email: emailAutomationDiv,
    buttons: buttonContainer,
    optionalTaskBtn: optionalTaskBtn,
  } = ui.steps;

  // 4. INJEÇÃO DE MÓDULOS EXTERNOS
  // Agora que a UI existe, colocamos o Tag Support no lugar reservado
  if (tagSupportSlot) {
    tagSupportSlot.appendChild(tagSupport.element);
  }

  // --- FUNÇÕES DE LÓGICA (TASKS) ---
  function checkTagSupportVisibility() {
    const selectedSubStatusKey = subStatusSelect.value;

    // 1. Validação Inicial: Se não tem substatus ou é Educação, esconde
    if (!selectedSubStatusKey || selectedSubStatusKey.includes("Education")) {
      tagSupport.style.display = "none";
      return;
    }

    // 2. Coleta de Dados das Tasks
    const checkedBoxes = Array.from(
      taskCheckboxesContainer.querySelectorAll(".task-checkbox:checked")
    );
    const tasks = checkedBoxes.map((cb) => cb.value);

    if (tasks.length === 0) {
      tagSupport.style.display = "none";
      return;
    }

    // 3. Verificação das Condições

    // Condição A: Enhanced Conversions (Prioridade máxima)
    const hasEnhanced = tasks.some(
      (t) => t.includes("enhanced") || t === "ec_google_ads"
    );

    // Condição B: Ads Conversion Only (Permite GTM, Bloqueia Analytics/Merchant)
    const hasAdsConversion = tasks.some(
      (t) =>
        (t.includes("conversion") || t.includes("ads")) &&
        !t.includes("enhanced")
    );
    const hasAnalytics = tasks.some(
      (t) => t.includes("ga4") || t.includes("analytics") || t.includes("ua")
    );
    const hasMerchant = tasks.some(
      (t) =>
        t.includes("merchant") || t.includes("gmc") || t.includes("shopping")
    );

    // É "Apenas Ads"? (Sim se tiver Ads E não tiver os proibidos)
    const isOnlyAds = hasAdsConversion && !hasAnalytics && !hasMerchant;

    // 4. Aplicação da Visibilidade
    // Mostra se for Enhanced OU se for Apenas Ads
    if (hasEnhanced || isOnlyAds) {
      tagSupport.style.display = "block";
    } else {
      tagSupport.style.display = "none";
    }
  }
  function populateTaskCheckboxes() {
    taskCheckboxesContainer.innerHTML = "";

    // 1. BARRA DE BUSCA
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Buscar task...";
    Object.assign(searchInput.style, NoteStyles.styleSearchInput);
    taskCheckboxesContainer.appendChild(searchInput);

    // 2. CHIPS (Populares)
    const chipsContainer = document.createElement("div");
    Object.assign(chipsContainer.style, NoteStyles.styleChipContainer);

    const popularTasks = Object.entries(TASKS_DB).filter(
      ([_, task]) => task.popular
    );

    popularTasks.forEach(([key, task]) => {
      const chip = document.createElement("div");
      chip.id = `chip-${key}`;
      const chipText = document.createElement("span");
      chipText.textContent = task.name;
      const chipRemove = document.createElement("span");
      chipRemove.textContent = "✕";
      Object.assign(chipRemove.style, NoteStyles.styleChipRemove);
      Object.assign(chip.style, NoteStyles.styleChip);

      chipRemove.onmouseover = () =>
        (chipRemove.style.backgroundColor = "white");
      chipRemove.onmouseout = () =>
        (chipRemove.style.backgroundColor = "rgba(255,255,255,0.6)");

      chip.appendChild(chipText);
      chip.appendChild(chipRemove);

      chip.onclick = () => {
        const checkbox = document.getElementById(`chk-${key}`);
        if (!checkbox) return;
        const stepperDiv =
          checkbox.parentNode.querySelector(".stepper-container");
        const countSpan = stepperDiv.querySelector(".stepper-count");
        if (!checkbox.checked) {
          checkbox.checked = true;
          stepperDiv.style.display = "flex";
          countSpan.textContent = "1";
          // Update visual do item da lista também
          checkbox.closest("label").style.background = "#e8f0fe";
        } else {
          let currentCount = parseInt(countSpan.textContent);
          countSpan.textContent = currentCount + 1;
        }
        updateChipVisual(
          chip,
          chipText,
          chipRemove,
          parseInt(countSpan.textContent)
        );
        renderScreenshotInputs();
        checkTagSupportVisibility();
      };

      chipRemove.onclick = (e) => {
        e.stopPropagation();
        const checkbox = document.getElementById(`chk-${key}`);
        const btnMinus =
          checkbox.parentNode.querySelector("button:first-child");
        if (btnMinus) btnMinus.click();
        const countSpan = checkbox.parentNode.querySelector(".stepper-count");
        updateChipVisual(
          chip,
          chipText,
          chipRemove,
          checkbox.checked ? parseInt(countSpan.textContent) : 0
        );
      };

      chipsContainer.appendChild(chip);
    });

    if (popularTasks.length > 0)
      taskCheckboxesContainer.appendChild(chipsContainer);

    // 3. BOTÃO "VER TODAS"
    const toggleListBtn = document.createElement("button");
    const iconDown = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#1a73e8"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>`;
    const iconUp = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#1a73e8"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>`;

    toggleListBtn.innerHTML = `Ver lista completa (${
      Object.keys(TASKS_DB).length
    }) ${iconDown}`;
    Object.assign(toggleListBtn.style, NoteStyles.styleLinkButton);
    toggleListBtn.onmouseover = () =>
      (toggleListBtn.style.backgroundColor = "#f1f8ff");
    toggleListBtn.onmouseout = () =>
      (toggleListBtn.style.backgroundColor = "transparent");

    taskCheckboxesContainer.appendChild(toggleListBtn);

    // 4. LISTA DE CHECKBOXES (ESTILO SECUNDÁRIO)
    const listContainer = document.createElement("div");
    listContainer.id = "tasks-list-scroll";
    // Aplica o estilo de "Gaveta/Drawer"
    Object.assign(listContainer.style, NoteStyles.styleTaskListContainer);

    for (const taskKey in TASKS_DB) {
      const task = TASKS_DB[taskKey];
      const label = document.createElement("label");
      label.className = "task-row-item";

      // Aplica o estilo de item de lista compacto
      Object.assign(label.style, NoteStyles.styleTaskListItem);

      label.onmouseover = () => {
        if (!checkbox.checked) label.style.backgroundColor = "#f8f9fa";
      }; // Hover sutil
      label.onmouseout = () => {
        if (!checkbox.checked) label.style.backgroundColor = "transparent";
        else label.style.backgroundColor = "#e8f0fe";
      };

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = taskKey;
      checkbox.id = `chk-${taskKey}`;
      checkbox.className = "task-checkbox";
      Object.assign(checkbox.style, NoteStyles.styleCheckboxInput);

      const taskName = document.createElement("span");
      taskName.textContent = task.name;
      Object.assign(taskName.style, { flexGrow: "1" });

      const stepperDiv = document.createElement("div");
      stepperDiv.className = "stepper-container";
      Object.assign(stepperDiv.style, NoteStyles.styleStepper);
      const btnMinus = document.createElement("button");
      btnMinus.type = "button";
      btnMinus.textContent = "−";
      btnMinus.classList.add("no-drag");
      Object.assign(btnMinus.style, NoteStyles.styleStepperBtn);
      const countSpan = document.createElement("span");
      countSpan.className = "stepper-count";
      countSpan.textContent = "1";
      Object.assign(countSpan.style, NoteStyles.styleStepperCount);
      const btnPlus = document.createElement("button");
      btnPlus.type = "button";
      btnPlus.textContent = "+";
      btnPlus.classList.add("no-drag");
      Object.assign(btnPlus.style, NoteStyles.styleStepperBtn);

      stepperDiv.appendChild(btnMinus);
      stepperDiv.appendChild(countSpan);
      stepperDiv.appendChild(btnPlus);
      label.appendChild(checkbox);
      label.appendChild(taskName);
      label.appendChild(stepperDiv);
      listContainer.appendChild(label);

      const syncChip = () => {
        const chip = document.getElementById(`chip-${taskKey}`);
        if (chip) {
          const textSpan = chip.querySelector("span:first-child");
          const removeSpan = chip.querySelector("span:last-child");
          const count = checkbox.checked ? parseInt(countSpan.textContent) : 0;
          updateChipVisual(chip, textSpan, removeSpan, count);
        }
      };

      checkbox.onchange = () => {
        if (checkbox.checked) {
          stepperDiv.style.display = "flex";
          countSpan.textContent = "1";
          label.style.backgroundColor = "#e8f0fe"; // Selecionado (Azul Claro)
        } else {
          stepperDiv.style.display = "none";
          countSpan.textContent = "0";
          label.style.backgroundColor = "transparent"; // Deselecionado (Transparente no fundo branco)
        }
        syncChip();
        renderScreenshotInputs();
        checkTagSupportVisibility();
      };

      btnMinus.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let count = parseInt(countSpan.textContent);
        if (count > 1) {
          countSpan.textContent = count - 1;
        } else {
          checkbox.checked = false;
          checkbox.dispatchEvent(new Event("change"));
          return;
        }
        syncChip();
        renderScreenshotInputs();
        checkTagSupportVisibility();
      };
      btnPlus.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let count = parseInt(countSpan.textContent);
        countSpan.textContent = count + 1;
        syncChip();
        renderScreenshotInputs();
        checkTagSupportVisibility();
      };
    }

    taskCheckboxesContainer.appendChild(listContainer);

    toggleListBtn.onclick = () => {
      if (listContainer.style.display === "none") {
        listContainer.style.display = "block";
        toggleListBtn.innerHTML = `Ocultar lista ${iconUp}`;
      } else {
        listContainer.style.display = "none";
        toggleListBtn.innerHTML = `Ver lista completa (${
          Object.keys(TASKS_DB).length
        }) ${iconDown}`;
      }
    };

    searchInput.oninput = (e) => {
      const term = e.target.value.toLowerCase();
      if (term.length > 0) {
        listContainer.style.display = "block";
        toggleListBtn.style.display = "none";
      } else {
        listContainer.style.display = "none";
        toggleListBtn.style.display = "flex";
        toggleListBtn.innerHTML = `Ver lista completa (${
          Object.keys(TASKS_DB).length
        }) ${iconDown}`;
      }
      const rows = listContainer.querySelectorAll(".task-row-item");
      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? "flex" : "none";
      });
    };
  }

  function updateChipVisual(chip, textSpan, removeSpan, count) {
    let originalName = textSpan.textContent.split(" (")[0]; // Limpa contador anterior

    if (count > 0) {
      Object.assign(chip.style, NoteStyles.styleChipSelected); // Fica Azul
      textSpan.textContent =
        count > 1 ? `${originalName} (${count})` : originalName;
      removeSpan.style.display = "flex"; // Mostra o X
      chip.style.paddingRight = "4px";
    } else {
      Object.assign(chip.style, NoteStyles.styleChip); // Volta ao Branco
      textSpan.textContent = originalName;
      removeSpan.style.display = "none"; // Esconde o X
      chip.style.paddingRight = "12px";
    }
  }

  optionalTaskBtn.onclick = () => {
    optionalTaskBtn.style.display = "none";
    step2Title.style.display = "block";
    taskCheckboxesContainer.style.display = "block";
    populateTaskCheckboxes();
  };

  function renderScreenshotInputs() {
    // --- FALLBACK DE ESTILO (Segurança) ---
    const localStyleInput =
      typeof styleInput !== "undefined"
        ? styleInput
        : {
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #dadce0",
            fontSize: "14px",
            marginBottom: "12px",
            boxSizing: "border-box",
            fontFamily: "'Poppins', sans-serif",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          };

    screenshotsListDiv.innerHTML = "";
    const selectedCheckboxes = taskCheckboxesContainer.querySelectorAll(
      ".task-checkbox:checked"
    );
    const selectedSubStatusKey = subStatusSelect.value;

    const isEducation =
      selectedSubStatusKey && selectedSubStatusKey.includes("Education");
    const screenshotType = isEducation ? "education" : "implementation";

    let hasScreenshots = false;

    selectedCheckboxes.forEach((checkbox) => {
      const taskKey = checkbox.value;
      const task = TASKS_DB[taskKey];
      const label = checkbox.closest("label");
      const countSpan = label.querySelector(".stepper-count");
      const count = countSpan ? parseInt(countSpan.textContent) : 1;
      const screenshotList = task.screenshots
        ? task.screenshots[screenshotType] || []
        : [];

      if (screenshotList.length > 0) {
        hasScreenshots = true;

        // Bloco Principal (Fundo Cinza)
        const taskBlock = document.createElement("div");
        Object.assign(taskBlock.style, {
          marginBottom: "16px",
          background: "#f8f9fa",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
        });

        // Cabeçalho do Bloco
        const taskHeader = document.createElement("div");
        taskHeader.innerHTML = `<strong style="color:#5f6368">${task.name}</strong> <small style="color:#1a73e8">(${count}x)</small>`;
        taskHeader.style.marginBottom = "12px";
        taskBlock.appendChild(taskHeader);

        for (let i = 1; i <= count; i++) {
          // Card Branco Individual
          const instanceContainer = document.createElement("div");
          Object.assign(instanceContainer.style, {
            background: "white",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "12px",
            border: "1px solid #dadce0",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          });

          // --- UX: CAMPO DE NOME EDITÁVEL ---
          const nameWrapper = document.createElement("div");
          Object.assign(nameWrapper.style, {
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
            gap: "8px",
          });

          // Ícone de Lápis
          const editIcon = document.createElement("span");
          editIcon.textContent = "✎";
          Object.assign(editIcon.style, {
            fontSize: "14px",
            color: "#9aa0a6",
            cursor: "text",
          });

          const nameInput = document.createElement("input");
          nameInput.type = "text";
          const suffix = count > 1 ? ` #${i}` : "";
          nameInput.value = `${task.name}${suffix}`;
          nameInput.id = `name-${taskKey}-${i}`;

          // Estilo Especial para parecer um Título Editável
          Object.assign(nameInput.style, localStyleInput, {
            fontWeight: "600",
            color: "#1a73e8", // Azul Google
            marginBottom: "0", // Remove margem do input base
            border: "none",
            borderBottom: "1px dashed #ccc", // Tracejado indica "clique para editar"
            borderRadius: "0",
            padding: "4px 0",
            background: "transparent",
            width: "100%",
          });

          // Efeitos de Foco
          nameInput.onfocus = () => {
            nameInput.style.borderBottom = "2px solid #1a73e8";
            editIcon.style.color = "#1a73e8";
            editIcon.style.opacity = "1";
          };
          nameInput.onblur = () => {
            nameInput.style.borderBottom = "1px dashed #ccc";
            editIcon.style.color = "#9aa0a6";
          };

          // Tooltip nativo
          nameInput.title = "Renomear esta ação";

          // Ao clicar no ícone, foca no input
          editIcon.onclick = () => nameInput.focus();

          nameWrapper.appendChild(editIcon);
          nameWrapper.appendChild(nameInput);
          instanceContainer.appendChild(nameWrapper);
          // ---------------------------------------

          // Inputs de Screenshots
          screenshotList.forEach((reqPrint, index) => {
            const row = document.createElement("div");
            Object.assign(row.style, {
              display: "flex",
              flexDirection: "column",
              marginBottom: "8px",
            });

            const printLabel = document.createElement("label");
            // Adicionei um ícone de câmera para ficar mais visual
            printLabel.innerHTML = `📷 ${reqPrint}:`;
            Object.assign(printLabel.style, {
              fontSize: "11px",
              color: "#5f6368",
              marginBottom: "4px",
              fontWeight: "500",
            });

            const printInput = document.createElement("input");
            printInput.type = "text";
            printInput.placeholder = "Cole o link...";
            printInput.id = `screen-${taskKey}-${i}-${index}`;
            printInput.className = "screenshot-input-field";

            // Usa o estilo padrão seguro
            Object.assign(printInput.style, localStyleInput);
            printInput.style.marginBottom = "4px";
            printInput.style.fontSize = "12px";

            row.appendChild(printLabel);
            row.appendChild(printInput);
            instanceContainer.appendChild(row);
          });
          taskBlock.appendChild(instanceContainer);
        }
        screenshotsListDiv.appendChild(taskBlock);
      }
    });
    screenshotsContainer.style.display = hasScreenshots ? "block" : "none";

    // No final da função renderScreenshotInputs
    const checkedValues = Array.from(
      taskCheckboxesContainer.querySelectorAll(".task-checkbox:checked")
    ).map((cb) => cb.value);
    tagSupport.updateVisibility(subStatusSelect.value, checkedValues);
  }

  function generateOutputHtml() {
    const selectedSubStatusKey = subStatusSelect.value;
    if (!selectedSubStatusKey) return null;
    const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
    let outputText = templateData.template.replace(/\n/g, "<br>");
    const ulStyle = 'style="margin-bottom: 12px; padding-left: 30px;"';

    // 1. Processamento de Tasks e Screenshots
    if (
      templateData.requiresTasks ||
      taskCheckboxesContainer.querySelectorAll(".task-checkbox:checked")
        .length > 0
    ) {
      const selectedCheckboxes = taskCheckboxesContainer.querySelectorAll(
        ".task-checkbox:checked"
      );
      let tagNames = [];
      let screenshotsText = "";
      const isEducation = selectedSubStatusKey.includes("Education");
      const screenshotType = isEducation ? "education" : "implementation";

      selectedCheckboxes.forEach((checkbox) => {
        const taskKey = checkbox.value;
        const task = TASKS_DB[taskKey];
        const label = checkbox.closest("label");
        const countSpan = label.querySelector(".stepper-count");
        const count = parseInt(countSpan.textContent);

        if (count > 1) tagNames.push(`${task.name} (x${count})`);
        else tagNames.push(task.name);

        const screenshotList = task.screenshots
          ? task.screenshots[screenshotType] || []
          : [];

        if (screenshotList.length > 0) {
          for (let i = 1; i <= count; i++) {
            const nameInput = document.getElementById(`name-${taskKey}-${i}`);
            const customName = nameInput
              ? nameInput.value
              : `${task.name} #${i}`;

            screenshotsText += `<b>${customName}</b>`;

            let itemsHtml = "";
            screenshotList.forEach((reqPrint, index) => {
              const inputId = `screen-${taskKey}-${i}-${index}`;
              const inputEl = document.getElementById(inputId);
              const userValue = inputEl ? inputEl.value.trim() : "";
              const displayValue = userValue ? ` ${userValue}` : "";
              itemsHtml += `<li>${reqPrint} -${displayValue}</li>`;
            });
            screenshotsText += `<ul ${ulStyle}>${itemsHtml}</ul>`;
          }
        }
      });
      outputText = outputText.replace(
        /{TAGS_IMPLEMENTED}/g,
        tagNames.join(", ") || "N/A"
      );
      outputText = outputText.replace(
        /{SCREENSHOTS_LIST}/g,
        screenshotsText ? `${screenshotsText}` : "N/A"
      );
    } else {
      outputText = outputText.replace(/{TAGS_IMPLEMENTED}/g, "N/A");
      outputText = outputText.replace(/{SCREENSHOTS_LIST}/g, "N/A");
    }

    // 2. Campos de Portugal e Consentimento
    if (currentLang === "pt" && isPortugalCase) {
      const consentValue = consentRadioSim.checked ? t("sim") : t("nao");
      const consentHtml = `<br><b>${t(
        "consentiu_gravacao"
      )}</b> ${consentValue}<br><br>`;
      outputText = outputText.replace(/{CONSENTIU_GRAVACAO}/g, consentHtml);
      outputText = outputText.replace(
        /{CASO_PORTUGAL}/g,
        `<br><b>${t("caso_portugal")}</b> ${t("sim")}<br>`
      );
    } else if (currentLang === "pt" && !isPortugalCase) {
      outputText = outputText.replace(
        /{CASO_PORTUGAL}/g,
        `<br><b>${t("caso_portugal")}</b> ${t("nao")}<br>`
      );
      outputText = outputText.replace(/{CONSENTIU_GRAVACAO}/g, "");
    } else {
      outputText = outputText.replace(/{CASO_PORTUGAL}/g, "");
      outputText = outputText.replace(/{CONSENTIU_GRAVACAO}/g, "");
    }

    // 3. Campos Dinâmicos com Limpeza Inteligente
    const inputs =
      dynamicFormFieldsContainer.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      const fieldName = input.id.replace("field-", "");
      const placeholderStr = `{${fieldName}}`;
      const placeholderRegex = new RegExp(placeholderStr, "g");

      let value = input.value;

      // Lógica para Radio Buttons (REASON_COMMENTS)
      if (
        fieldName === "REASON_COMMENTS" &&
        (selectedSubStatusKey.startsWith("NI_") ||
          selectedSubStatusKey.startsWith("IN_"))
      ) {
        const checkedRadio = snippetContainer.querySelector(
          'input[type="radio"]:checked'
        );
        if (
          checkedRadio &&
          scenarioSnippets[checkedRadio.id] &&
          scenarioSnippets[checkedRadio.id]["field-REASON_COMMENTS"]
        ) {
          value = scenarioSnippets[checkedRadio.id]["field-REASON_COMMENTS"];
        }
      }

      // Formatação de Listas e Parágrafos
      if (textareaListFields.includes(fieldName) && value.trim() !== "") {
        const lines = value
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line !== "" && line !== "•")
          .map((line) =>
            line.startsWith("• ") ? line.substring(2).trim() : line.trim()
          )
          .filter((line) => line !== "")
          .map((line) => `<li>${line}</li>`)
          .join("");
        value = lines ? `<ul ${ulStyle}>${lines}</ul>` : "";
      } else if (
        textareaParagraphFields.includes(fieldName) &&
        value.trim() !== ""
      ) {
        value = value
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line) => `<p style="margin: 0 0 8px 0;">${line}</p>`)
          .join("");
      } else if (
        input.tagName === "TEXTAREA" &&
        !textareaListFields.includes(fieldName) &&
        !textareaParagraphFields.includes(fieldName)
      ) {
        value = value.replace(/\n/g, "<br>");
      }

      // Normalização de valores vazios
      if (input.tagName === "TEXTAREA" && value.trim() === "") {
        value = "";
      } else if (fieldName === "ON_CALL" && value.trim() === "") {
        value = "N/A";
      } else if (fieldName === "GTM_GA4_VERIFICADO" && value.trim() === "") {
        value = "N/A";
      }

      // === LÓGICA DE LIMPEZA INTELIGENTE ===
      // Remove tags HTML para checar se o conteúdo real é vazio ou N/A
      const textContent = value
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();
      const isEffectivelyEmpty =
        textContent === "" ||
        textContent === "•" ||
        textContent.toLowerCase() === "n/a" ||
        textContent.toLowerCase() === "na";

      if (isEffectivelyEmpty) {
        // Se vazio, tenta remover a LINHA INTEIRA (Rótulo + Placeholder)
        // Regex para: (Quebra opcional) + <b>Label:</b> + Placeholder + (Quebra opcional)
        const lineRemoverRegex = new RegExp(
          `(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${fieldName}\\}(?:<br>\\s*)?`,
          "gi"
        );

        if (lineRemoverRegex.test(outputText)) {
          outputText = outputText.replace(lineRemoverRegex, ""); // Remove a linha
        } else {
          outputText = outputText.replace(placeholderRegex, ""); // Remove só o placeholder
        }
      } else {
        // Se tem conteúdo, substitui normal
        const safeValue = (value || "").replace(/\$/g, "$$$$");
        outputText = outputText.replace(placeholderRegex, safeValue);
      }
    });

    // Limpeza final de placeholders perdidos e quebras duplas
    outputText = outputText.replace(/{([A-Z0-9_]+)}/g, "");
    outputText = outputText.replace(/(<br>){3,}/g, "<br><br>");

    outputText += tagSupport.getOutput();

    return outputText;
  }
  // --- FUNÇÕES LÓGICAS DO FORMULÁRIO ---

  function enableAutoBullet(textarea) {
    if (textarea.value.trim() === "" || textarea.value.trim() === "•") {
      textarea.value = "• ";
    }
    textarea.onkeydown = function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const start = this.selectionStart,
          end = this.selectionEnd,
          value = this.value;
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const currentLine = value.substring(lineStart, start);
        const insertText =
          currentLine.trim() === "•" || currentLine.trim() === ""
            ? "\n"
            : "\n• ";

        this.value =
          value.substring(0, start) + insertText + value.substring(end);
        const newPos = start + insertText.length;
        this.selectionStart = newPos;
        this.selectionEnd = newPos;
      } else if (e.key === "Backspace") {
        const start = this.selectionStart;
        if (start === this.selectionEnd && start > 0) {
          const textBefore = this.value.substring(0, start);
          if (textBefore.endsWith("\n• ")) {
            e.preventDefault();
            this.value =
              textBefore.substring(0, start - 3) +
              this.value.substring(this.selectionEnd);
            this.selectionStart = start - 3;
            this.selectionEnd = start - 3;
          } else if (textBefore === "• ") {
            e.preventDefault();
            this.value = "";
            this.selectionStart = 0;
            this.selectionEnd = 0;
          }
        }
      }
    };
  }

  function updateFieldsFromScenarios() {
    const activeScenarioInputs = snippetContainer.querySelectorAll(
      'input[type="checkbox"]:checked, input[type="radio"]:checked'
    );
    const targetFieldsContent = {};
    const activeLinkedTasks = new Set();

    activeScenarioInputs.forEach((input) => {
      const scenarioId = input.id;
      const snippets = scenarioSnippets[scenarioId];
      if (snippets) {
        for (const fieldId in snippets) {
          if (fieldId !== "linkedTask" && fieldId !== "type") {
            if (!targetFieldsContent[fieldId]) {
              targetFieldsContent[fieldId] = [];
            }
            if (!targetFieldsContent[fieldId].includes(snippets[fieldId])) {
              targetFieldsContent[fieldId].push(snippets[fieldId]);
            }
          } else if (fieldId === "linkedTask") {
            activeLinkedTasks.add(snippets.linkedTask);
          }
        }
      }
    });

    const allPossibleTargetFields = new Set();
    Object.values(scenarioSnippets).forEach((snippets) => {
      Object.keys(snippets).forEach((key) => {
        if (key !== "linkedTask" && key !== "type")
          allPossibleTargetFields.add(key);
      });
    });

    allPossibleTargetFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (field) {
        const combinedTextArray = targetFieldsContent[fieldId] || [];
        let finalValue = "";

        if (textareaListFields.includes(fieldId.replace("field-", ""))) {
          finalValue = combinedTextArray
            .map((line) => (line.startsWith("• ") ? line : "• " + line))
            .join("\n");

          if (finalValue === "") {
            finalValue = "• ";
          } else if (!finalValue.endsWith("\n• ")) {
            finalValue += "\n• ";
          }
        } else {
          finalValue = combinedTextArray.join("\n\n");
        }

        // Preenche
        if (finalValue.trim() !== "•" && finalValue.trim() !== "") {
          field.value = finalValue;
        } else if (textareaListFields.includes(fieldId.replace("field-", ""))) {
          field.value = "• ";
        } else {
          field.value = "";
        }

        // CORREÇÃO: Chama a função que agora existe
        if (
          field.tagName === "TEXTAREA" &&
          textareaListFields.includes(fieldId.replace("field-", ""))
        ) {
          enableAutoBullet(field);
        }
      }
    });

    const taskCheckboxes =
      taskCheckboxesContainer.querySelectorAll(".task-checkbox");
    taskCheckboxes.forEach((taskCheckbox) => {
      // Não reseta se já estiver marcado manualmente, apenas se for linkedTask
      if (activeLinkedTasks.has(taskCheckbox.value)) {
        taskCheckbox.checked = true;
        taskCheckbox.dispatchEvent(new Event("change"));
      }
    });
  }

  mainStatusSelect.onchange = () => {
    const selectedStatus = mainStatusSelect.value;

    // Reseta os passos seguintes
    resetSteps(1.5);

    // Limpa e reseta o texto do segundo select
    subStatusSelect.innerHTML = `<option value="">${
      t("select_substatus") || "-- Selecione --"
    }</option>`;

    if (!selectedStatus) {
      subStatusSelect.disabled = true;
      return;
    }

    // Filtra os templates baseados na seleção (NI, SO, IN, AS)
    let optionsFound = false;
    for (const key in SUBSTATUS_TEMPLATES) {
      const template = SUBSTATUS_TEMPLATES[key];
      if (template.status === selectedStatus) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = template.name;
        subStatusSelect.appendChild(option);
        optionsFound = true;
      }
    }

    // Habilita o campo se encontrou opções
    if (optionsFound) {
      subStatusSelect.disabled = false;
    } else {
      subStatusSelect.disabled = true;
    }
  };

  subStatusSelect.onchange = () => {
    const selectedSubStatusKey = subStatusSelect.value;
    resetSteps(1.5);
    if (!selectedSubStatusKey) return;

    const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
    snippetContainer.innerHTML = "";
    let snippetAdded = false;

    const addSnippetInput = (scenario, type, container) => {
      const label = document.createElement("label");
      Object.assign(label.style, NoteStyles.styleCheckboxLabel);
      label.onmouseover = () => (label.style.backgroundColor = "#e8eaed");
      label.onmouseout = () => (label.style.backgroundColor = "#f8f9fa");
      const input = document.createElement("input");
      input.type = type;
      input.id = scenario.id;
      Object.assign(input.style, NoteStyles.styleCheckboxInput);
      label.appendChild(input);
      label.appendChild(document.createTextNode(` ${scenario.text}`));
      container.appendChild(label);
      return input;
    };

    let scenarios = [];
    let inputType = "radio";
    if (selectedSubStatusKey === "NI_Awaiting_Inputs") {
      scenarios = [
        { id: "quickfill-ni-inicio-manual", text: "Início 2/6 (Manual)" },
        {
          id: "quickfill-ni-cms-access",
          text: "Início 2/6 (ADV sem acesso ao CMS)",
        },
        { id: "quickfill-ni-followup-bau", text: "Follow-up 2/6 (BAU)" },
        { id: "quickfill-ni-followup-lm", text: "Follow-up 2/6 (LM)" },
      ];
    } else if (selectedSubStatusKey.startsWith("SO_")) {
      inputType = "checkbox";
      scenarios = [
        { id: "quickfill-gtm-install", text: "Instalação do GTM" },
        { id: "quickfill-whatsapp", text: "Conversão de WhatsApp" },
        { id: "quickfill-form", text: "Conversão de Formulário (Padrão)" },
        { id: "quickfill-ecw4-close", text: "Fechamento ECW4 (Pós 7 dias)" },
      ];
    } else if (selectedSubStatusKey.startsWith("AS_")) {
      inputType = "checkbox";
      const reasonTitle = document.createElement("label");
      reasonTitle.textContent = t("cenarios_comuns");
      Object.assign(reasonTitle.style, NoteStyles.styleLabel);
      snippetContainer.appendChild(reasonTitle);
      scenarios = [
        {
          id: "quickfill-as-no-show",
          text: "Anunciante não compareceu (respondeu e-mail)",
        },
        { id: "quickfill-as-insufficient-time", text: "Tempo insuficiente" },
        {
          id: "quickfill-as-no-access",
          text: "Anunciante sem acessos necessários",
        },
      ];
    } else if (selectedSubStatusKey.startsWith("IN_")) {
      scenarios = [
        { id: "quickfill-in-nrp-bau", text: "NRP (BAU - 3 tentativas)" },
        { id: "quickfill-in-nrp-lm", text: "NRP (LM - Sem tentativas)" },
        {
          id: "quickfill-in-no-show-bau",
          text: "No-Show (BAU - 3 tentativas)",
        },
        {
          id: "quickfill-in-2-6-final",
          text: "Finalização 2/6 (Sem Resposta)",
        },
        { id: "quickfill-in-manual", text: "Outro (Manual)" },
      ];
    }

    const filteredScenarios = scenarios.filter((s) => {
      const sd = scenarioSnippets[s.id];
      return !sd.type || sd.type === "all" || sd.type === currentCaseType;
    });
    filteredScenarios.forEach((scenario, index) => {
      const input = addSnippetInput(scenario, inputType, snippetContainer);
      if (inputType === "radio") {
        input.name = "scenario-radio-group";
        if (index === 0) input.checked = true;
      }
    });
    snippetAdded = filteredScenarios.length > 0;

    if (snippetAdded) stepSnippetsDiv.style.display = "block";

    if (templateData.requiresTasks) {
      optionalTaskBtn.style.display = "none";
      step2Title.style.display = "block";
      taskCheckboxesContainer.style.display = "block";
      populateTaskCheckboxes();
      step2Div.style.display = "block";
    } else {
      optionalTaskBtn.style.display = "block";
      step2Title.style.display = "none";
      taskCheckboxesContainer.style.display = "none";
      step2Div.style.display = "block";
    }

    dynamicFormFieldsContainer.innerHTML = "";
    const placeholders = templateData.template.match(/{([A-Z0-9_]+)}/g) || [];
    const uniquePlaceholders = [...new Set(placeholders)];
    uniquePlaceholders.forEach((placeholder) => {
      if (
        placeholder === "{TAGS_IMPLEMENTED}" ||
        placeholder === "{SCREENSHOTS_LIST}" ||
        placeholder === "{CONSENTIU_GRAVACAO}" ||
        placeholder === "{CASO_PORTUGAL}"
      )
        return;
      const fieldName = placeholder.slice(1, -1);
      const label = document.createElement("label");
      const translatedLabel = t(fieldName.toLowerCase());
      label.textContent =
        translatedLabel !== fieldName.toLowerCase()
          ? translatedLabel
          : fieldName
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()) + ":";
      Object.assign(label.style, NoteStyles.styleLabel);
      let field;
      if (textareaListFields.includes(fieldName)) {
        field = document.createElement("textarea");
        Object.assign(field.style, NoteStyles.styleTextarea);
        field.classList.add("bullet-textarea");
        enableAutoBullet(field);
      } else if (textareaParagraphFields.includes(fieldName)) {
        field = document.createElement("textarea");
        Object.assign(field.style, NoteStyles.styleTextarea);
      } else {
        field = document.createElement("input");
        field.type = "text";
        Object.assign(field.style, NoteStyles.styleInput);
        if (
          fieldName === "REASON_COMMENTS" &&
          (selectedSubStatusKey === "NI_Awaiting_Inputs" ||
            selectedSubStatusKey.startsWith("IN_"))
        ) {
          Object.assign(label.style, { display: "none" });
          Object.assign(field.style, { display: "none" });
        }
      }
      if (fieldName === "ON_CALL" && currentCaseType === "lm") {
        Object.assign(label.style, { display: "none" });
        Object.assign(field.style, { display: "none" });
        field.value = "N/A"; // Define valor padrão para não quebrar o template
      }
      field.id = `field-${fieldName}`;
      dynamicFormFieldsContainer.appendChild(label);
      dynamicFormFieldsContainer.appendChild(field);
    });

    const snippetInputs = snippetContainer.querySelectorAll(
      'input[type="checkbox"], input[type="radio"]'
    );
    if (snippetInputs.length > 0) {
      snippetInputs.forEach((input) => {
        input.removeEventListener("change", updateFieldsFromScenarios);
        input.addEventListener("change", updateFieldsFromScenarios);
      });
      updateFieldsFromScenarios();
    }

    step3Div.style.display = "block";
    if (SUBSTATUS_SHORTCODES[selectedSubStatusKey])
      emailAutomationDiv.style.display = "block";
    else emailAutomationDiv.style.display = "none";
    buttonContainer.style.display = "flex";
    const checked = Array.from(
      taskCheckboxesContainer.querySelectorAll(".task-checkbox:checked")
    ).map((c) => c.value);
    tagSupport.updateVisibility(subStatusSelect.value, checked);
  };

  copyButton.onclick = () => {
    const htmlOutput = generateOutputHtml();
    if (htmlOutput) {
      copyHtmlToClipboard(htmlOutput);
      showToast(t("copiado_sucesso"));
    } else {
      showToast(t("selecione_substatus"), { error: true });
    }
  };

  generateButton.onclick = async () => {
    const selectedSubStatusKey = subStatusSelect.value;
    const htmlOutput = generateOutputHtml();

    if (!htmlOutput) {
      showToast(t("selecione_substatus"), { error: true });
      return;
    }

    copyHtmlToClipboard(htmlOutput);

    // 1. Abertura Automática
    const campo = await ensureNoteCardIsOpen();

    if (campo) {
      try {
        campo.focus();

        // 2. Limpeza Segura (Range)
        const isEmpty =
          campo.innerHTML.trim() === "<p><br></p>" ||
          campo.innerHTML.trim() === "<br>" ||
          campo.innerText.trim() === "";

        if (isEmpty) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(campo);
          selection.removeAllRanges();
          selection.addRange(range);
          document.execCommand("delete", false, null);
        } else {
          if (!campo.innerHTML.endsWith("<br><br>")) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(campo);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("insertHTML", false, "<br><br>");
          }
        }

        // 3. Inserção
        const success = document.execCommand("insertHTML", false, htmlOutput);
        if (!success) {
          campo.innerHTML += htmlOutput;
        }

        // 4. Notifica Angular
        triggerInputEvents(campo);
        setTimeout(() => {
          showToast(t("inserido_copiado"));
        }, 600);

        // 5. Dispara Email (Se ativado)
        const emailEnabled =
          typeof emailCheckbox !== "undefined" && emailCheckbox
            ? emailCheckbox.checked
            : true;

        if (
          selectedSubStatusKey &&
          SUBSTATUS_SHORTCODES[selectedSubStatusKey] &&
          emailEnabled
        ) {
          const emailCode = SUBSTATUS_SHORTCODES[selectedSubStatusKey];
          setTimeout(() => {
            runEmailAutomation(emailCode);
          }, 1000);
        }

        togglePopup(false);
        resetSteps(1.5);
        mainStatusSelect.value = "";
        subStatusSelect.innerHTML = `<option value="">${t(
          "select_substatus"
        )}</option>`;
        subStatusSelect.disabled = true;
      } catch (err) {
        console.error("Erro ao inserir texto:", err);
        showToast("Erro ao inserir. Texto copiado.", { error: true });
      }
    } else {
      showToast(t("campo_nao_encontrado"), { error: true, duration: 4000 });
    }
  };

  function resetSteps(startFrom = 1.5) {
    if (startFrom <= 1.5) {
      stepSnippetsDiv.style.display = "none";
      snippetContainer.innerHTML = "";
    }
    if (startFrom <= 2) {
      step2Div.style.display = "none";
      taskCheckboxesContainer.innerHTML = "";
      optionalTaskBtn.style.display = "none";
    }
    if (startFrom <= 3) {
      step3Div.style.display = "none";
      dynamicFormFieldsContainer.innerHTML = "";
      if (typeof screenshotsContainer !== "undefined") {
        screenshotsContainer.style.display = "none";
        screenshotsListDiv.innerHTML = "";
      }
      buttonContainer.style.display = "none";
      emailAutomationDiv.style.display = "none";
      tagSupport.reset();
    }
  }

  function togglePopup(show) {
    if (show) {
      popup.style.opacity = "1";
      popup.style.pointerEvents = "auto";
      popup.style.transform = "scale(1)";
    } else {
      popup.style.opacity = "0";
      popup.style.pointerEvents = "none";
      popup.style.transform = "scale(0.95)";
      isExpanded = false;
      popup.style.width = `${initialWidth}px`;
      if (popup.style.right !== "auto") {
        popup.style.right = "24px";
      }
    }
  }

  btn.onclick = () => {
    // Proteção contra arrasto
    if (btnContainer.getAttribute("data-dragging") === "true") return;

    visible = !visible;
    togglePopupAnimation(visible, animRefs);
  };

  setLanguage(currentLang);
}
