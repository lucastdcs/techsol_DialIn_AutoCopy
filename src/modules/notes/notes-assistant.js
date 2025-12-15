// src/modules/notes/notes-assistant.js

import {
  showToast,
  makeDraggable,
  styleSelect,
  styleLabel,
  stylePopup,
  stylePopupHeader,
  stylePopupTitle,
  stylePopupCloseBtn,
  styleFloatingButton,
  stylePopupVersion,
  styleCredit,
  styleExpandButton,
  typeBtnStyle,
  getRandomGoogleStyle,
  styleResizeHandle, 
  makeResizable      
} from "../shared/utils.js";

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
import { toggleGenieAnimation } from "../shared/animations.js";
import { triggerProcessingAnimation } from "../shared/command-center.js";
import { constrainToViewport } from '../shared/utils.js';
import { createScenariosComponent } from "./components/step-scenarios.js"; 
import {
  copyHtmlToClipboard,
  ensureNoteCardIsOpen,
  triggerInputEvents,
  createGoogleSelect
} from "./notes-bridge.js";

// MÓDULOS DE LÓGICA
import { createTagSupportModule } from "./tag-support.js";
import { createStepTasksComponent } from "./components/step-tasks.js"; 

export function initCaseNotesAssistant() {
  const CURRENT_VERSION = "v3.6.0";

  let currentCaseType = "bau";
  let currentLang = "pt";
  let isPortugalCase = false;
  let visible = false;

  const styles = {
    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "8px",
      border: "1px solid #dadce0",
      fontSize: "14px",
      marginBottom: "12px",
      boxSizing: "border-box",
      fontFamily: "'Google Sans', Roboto, sans-serif",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    },
    textarea: {
      width: "100%",
      padding: "8px",
      borderRadius: "8px",
      border: "1px solid #dadce0",
      fontSize: "14px",
      marginBottom: "12px",
      boxSizing: "border-box",
      fontFamily: "'Google Sans', Roboto, sans-serif",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      height: "100px",
      resize: "vertical",
    },
    h3: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#202124",
      margin: "0 0 12px 0",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#3c4043",
      marginBottom: "8px",
      marginTop: "16px",
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
      fontSize: "14px",
      fontWeight: "400",
      cursor: "pointer",
      padding: "8px",
      background: "#f8f9fa",
      borderRadius: "6px",
      transition: "background-color 0.2s ease, box-shadow 0.2s ease",
      userSelect: "none",
    },
    checkboxInput: {
      width: "auto",
      marginRight: "10px",
      marginBottom: "0",
      cursor: "pointer",
      accentColor: "#1a73e8",
    },
    buttonBase: {
      flex: "1 1 0",
      padding: "10px 0",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      marginTop: "16px",
    },
    stepBlock: {
      borderTop: "1px solid #eee",
      paddingTop: "12px",
      marginTop: "12px",
    },
    radioContainer: { display: "flex", gap: "15px", marginBottom: "10px" },
    optionalBtn: {
      width: "100%",
      padding: "10px",
      background: "white",
      border: "1px dashed #1a73e8",
      color: "#1a73e8",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      fontSize: "13px",
      marginBottom: "10px",
      transition: "all 0.2s",
    },
    helpLink: {
      fontSize: "12px",
      color: "#1a73e8",
      textDecoration: "none",
      cursor: "pointer",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      marginLeft: "auto",
      transition: "color 0.2s",
    },
  };



  const tagSupport = createTagSupportModule();


  const stepTasks = createStepTasksComponent(() => {

  
    const checkedElements = stepTasks.getCheckedElements();
    const checkedValues = checkedElements.map((c) => c.value);

    if (subStatusSelect && subStatusSelect.value) {
      tagSupport.updateVisibility(subStatusSelect.value, checkedValues);
    }
  });


  // --- Popup ---
  const popup = document.createElement("div");
  popup.id = "autofill-popup";
  Object.assign(popup.style, stylePopup, {
    right: "100px", 
    width: "400px", 
    opacity: "0",
    pointerEvents: "none",
    transition:
      "width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, transform 0.3s ease",
  });
  popup.style.transition += ", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";

  const animRefs = { popup, googleLine: null };

  // Header (Factory)
  const header = createStandardHeader(
    popup,
    "Case Notes Assistant",
    CURRENT_VERSION,
    "Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",
    animRefs,
    () => toggleVisibility()
  );


  popup.appendChild(header);

  const popupContent = document.createElement("div");
  Object.assign(popupContent.style, {
    padding: "0 16px 16px 16px",
    overflowY: "auto",
    flexGrow: "1",
  });
  popup.appendChild(popupContent);

  const credit = document.createElement("div");
  credit.textContent = "created by lucaste@";
  Object.assign(credit.style, styleCredit);
  popup.appendChild(credit);

  // --- STEP -1: Idioma ---
  const langToggleDiv = document.createElement("div");
  langToggleDiv.id = "step-lang-type";
  const langLabel = document.createElement("label");
  Object.assign(langLabel.style, styles.label);
  langToggleDiv.appendChild(langLabel);
  const langContainer = document.createElement("div");
  Object.assign(langContainer.style, {
    display: "flex",
    borderRadius: "8px",
    border: "1px solid #dadce0",
    overflow: "hidden",
    marginBottom: "16px",
  });
  const langPT = document.createElement("div");
  langPT.textContent = "Português";
  langPT.classList.add("no-drag");
  Object.assign(langPT.style, typeBtnStyle);
  const langES = document.createElement("div");
  langES.textContent = "Español";
  langES.classList.add("no-drag");
  Object.assign(langES.style, typeBtnStyle);
  langPT.onclick = () => setLanguage("pt");
  langES.onclick = () => setLanguage("es");
  langContainer.appendChild(langPT);
  langContainer.appendChild(langES);
  langToggleDiv.appendChild(langContainer);
  popupContent.appendChild(langToggleDiv);

  // --- STEP 0: Tipo ---
  const step0Div = document.createElement("div");
  step0Div.id = "step-0-case-type";
  const typeLabel = document.createElement("label");
  Object.assign(typeLabel.style, styles.label);
  step0Div.appendChild(typeLabel);
  const typeContainer = document.createElement("div");
  Object.assign(typeContainer.style, {
    display: "flex",
    borderRadius: "8px",
    border: "1px solid #dadce0",
    overflow: "hidden",
    marginBottom: "16px",
  });
  const typeBAU = document.createElement("div");
  typeBAU.textContent = "BAU";
  typeBAU.classList.add("no-drag");
  Object.assign(typeBAU.style, typeBtnStyle);
  const typeLM = document.createElement("div");
  typeLM.textContent = "LM";
  typeLM.classList.add("no-drag");
  Object.assign(typeLM.style, typeBtnStyle);
  typeBAU.onclick = () => setCaseType("bau");
  typeLM.onclick = () => setCaseType("lm");
  typeContainer.appendChild(typeBAU);
  typeContainer.appendChild(typeLM);
  step0Div.appendChild(typeContainer);
  popupContent.appendChild(step0Div);

  // --- STEP 1: Status---
  const step1Div = document.createElement("div");
  step1Div.id = "step-1-selection";

  // 1. LABEL PRINCIPAL
  const mainStatusLabel = document.createElement("label");
  mainStatusLabel.className = "cw-input-label"; 
  mainStatusLabel.textContent = "Status Principal"; 

  // 2. SELECT PRINCIPAL
  const mainStatusSelect = document.createElement("select");
  mainStatusSelect.id = "main-status";
  mainStatusSelect.className = "cw-select";
  

  mainStatusSelect.innerHTML = `
      <option value="" disabled selected hidden>Selecione uma opção...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
  `;

  // 3. HEADER DO SUB-STATUS (Label + Link)
  const subStatusHeader = document.createElement("div");

  subStatusHeader.style.cssText = "display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";

  const subStatusLabel = document.createElement("label");
  subStatusLabel.className = "cw-input-label"; 
  subStatusLabel.textContent = "Sub-status";
  subStatusLabel.style.marginBottom = "0"; 


  const subStatusHelpLink = document.createElement("a");
  subStatusHelpLink.href = "https://seu-link-do-guia-aqui.com"; 
  subStatusHelpLink.target = "_blank";
  subStatusHelpLink.className = "cw-info-link"; 

  subStatusHelpLink.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus`;

  Object.assign(subStatusHelpLink.style, styles.helpLink); 

  subStatusHeader.appendChild(subStatusLabel);
  subStatusHeader.appendChild(subStatusHelpLink);

  // 4. SELECT SUB-STATUS
  const subStatusSelect = document.createElement("select");
  subStatusSelect.id = "sub-status";
  subStatusSelect.className = "cw-select"; 
  subStatusSelect.disabled = true;

  subStatusSelect.innerHTML = `<option value="" disabled selected hidden>Aguardando status principal...</option>`;

  // 5. MONTAGEM
  step1Div.appendChild(mainStatusLabel);
  step1Div.appendChild(mainStatusSelect);
  step1Div.appendChild(subStatusHeader);
  step1Div.appendChild(subStatusSelect);
  
  popupContent.appendChild(step1Div);

  // --- STEPS OCULTOS ---
  const stepPortugalDiv = document.createElement("div");
  stepPortugalDiv.id = "step-1-1-portugal";
  Object.assign(stepPortugalDiv.style, styles.stepBlock, { display: "none" });
  const portugalLabel = document.createElement("label");
  Object.assign(portugalLabel.style, styles.label);
  stepPortugalDiv.appendChild(portugalLabel);
  const portugalRadioGroup = document.createElement("div");
  Object.assign(portugalRadioGroup.style, styles.radioContainer);
  const divPtSim = document.createElement("div");
  Object.assign(divPtSim.style, { display: "flex", alignItems: "center" });
  const portugalRadioSim = document.createElement("input");
  portugalRadioSim.type = "radio";
  portugalRadioSim.name = "portugal-group";
  portugalRadioSim.value = "sim";
  Object.assign(portugalRadioSim.style, styles.checkboxInput);
  const portugalLabelSim = document.createElement("label");
  portugalLabelSim.htmlFor = "portugal-sim";
  Object.assign(portugalLabelSim.style, { cursor: "pointer" });
  divPtSim.appendChild(portugalRadioSim);
  divPtSim.appendChild(portugalLabelSim);
  const divPtNao = document.createElement("div");
  Object.assign(divPtNao.style, { display: "flex", alignItems: "center" });
  const portugalRadioNao = document.createElement("input");
  portugalRadioNao.type = "radio";
  portugalRadioNao.name = "portugal-group";
  portugalRadioNao.value = "nao";
  portugalRadioNao.checked = true;
  Object.assign(portugalRadioNao.style, styles.checkboxInput);
  const portugalLabelNao = document.createElement("label");
  portugalLabelNao.htmlFor = "portugal-nao";
  Object.assign(portugalLabelNao.style, { cursor: "pointer" });
  divPtNao.appendChild(portugalRadioNao);
  divPtNao.appendChild(portugalLabelNao);
  portugalRadioGroup.appendChild(divPtSim);
  portugalRadioGroup.appendChild(divPtNao);
  stepPortugalDiv.appendChild(portugalRadioGroup);
  popupContent.appendChild(stepPortugalDiv);
  function setPortugalCase(isPT) {
    isPortugalCase = isPT;
    if (isPT) {
      stepConsentDiv.style.display = "block";
    } else {
      stepConsentDiv.style.display = "none";
    }
  }
  portugalRadioSim.onchange = () => setPortugalCase(true);
  portugalRadioNao.onchange = () => setPortugalCase(false);

  const stepConsentDiv = document.createElement("div");
  stepConsentDiv.id = "step-1-2-consent";
  Object.assign(stepConsentDiv.style, styles.stepBlock, { display: "none" });
  const consentLabel = document.createElement("label");
  Object.assign(consentLabel.style, styles.label);
  stepConsentDiv.appendChild(consentLabel);
  const consentRadioGroup = document.createElement("div");
  Object.assign(consentRadioGroup.style, styles.radioContainer);
  const divCSim = document.createElement("div");
  Object.assign(divCSim.style, { display: "flex", alignItems: "center" });
  const consentRadioSim = document.createElement("input");
  consentRadioSim.type = "radio";
  consentRadioSim.name = "consent-group";
  consentRadioSim.value = "Sim";
  consentRadioSim.checked = true;
  Object.assign(consentRadioSim.style, styles.checkboxInput);
  const consentLabelSim = document.createElement("label");
  consentLabelSim.htmlFor = "consent-sim";
  Object.assign(consentLabelSim.style, { cursor: "pointer" });
  divCSim.appendChild(consentRadioSim);
  divCSim.appendChild(consentLabelSim);
  const divCNao = document.createElement("div");
  Object.assign(divCNao.style, { display: "flex", alignItems: "center" });
  const consentRadioNao = document.createElement("input");
  consentRadioNao.type = "radio";
  consentRadioNao.name = "consent-group";
  consentRadioNao.value = "Não";
  Object.assign(consentRadioNao.style, styles.checkboxInput);
  const consentLabelNao = document.createElement("label");
  consentLabelNao.htmlFor = "consent-nao";
  Object.assign(consentLabelNao.style, { cursor: "pointer" });
  divCNao.appendChild(consentRadioNao);
  divCNao.appendChild(consentLabelNao);
  consentRadioGroup.appendChild(divCSim);
  consentRadioGroup.appendChild(divCNao);
  stepConsentDiv.appendChild(consentRadioGroup);
  popupContent.appendChild(stepConsentDiv);


  // 1. CRIAÇÃO: Usamos o nome 'snippetContainer' para manter compatibilidade
// --- STEP 1.5: Cenários Comuns (ATUALIZADO) ---
  const stepSnippetsDiv = document.createElement("div");
  stepSnippetsDiv.id = "step-1-5-snippets";
  // Mantemos display: none pois a lógica de mostrar/esconder (baseada no Status SO) ainda vai controlar isso
  Object.assign(stepSnippetsDiv.style, styles.stepBlock, { display: "none" });

  const stepSnippetsTitle = document.createElement("h3");
  Object.assign(stepSnippetsTitle.style, styles.h3);
  stepSnippetsTitle.textContent = "Cenários Comuns";

  // --- AQUI A MÁGICA ACONTECE ---
  // Chamamos o componente visual (Chips + Preview)
  const snippetContainer = createScenariosComponent((selectedText) => {
      // Callback: O que fazer quando o usuário clica num chip?
      
      // Tenta achar o textarea principal (ajuste o seletor conforme sua necessidade)
      // Se seu textarea tiver um ID específico, use-o aqui.
      const target = document.querySelector('textarea'); 
      
      if (target) {
          // Injeta o texto
          target.value = selectedText;
          
          // Dispara evento para o React/DOM saber que mudou
          target.dispatchEvent(new Event('input'));
          
          // Feedback Visual no campo (Piscar azul)
          target.style.transition = "background-color 0.2s";
          target.style.backgroundColor = "#e8f0fe";
          setTimeout(() => target.style.backgroundColor = "#fff", 300);
      }
  });

  // Mantemos o ID antigo no container wrapper caso alguma lógica externa precise
  snippetContainer.id = "snippet-container";

  stepSnippetsDiv.appendChild(stepSnippetsTitle);
  stepSnippetsDiv.appendChild(snippetContainer);
  
  popupContent.appendChild(stepSnippetsDiv);

  // --- STEP 2: TASKS (Integrado com Componente) ---
  const step2Div = document.createElement("div");
  step2Div.id = "step-2-tasks";
  Object.assign(step2Div.style, styles.stepBlock, { display: "none" });
  const optionalTaskBtn = document.createElement("button");
  optionalTaskBtn.textContent = "+ Gostaria de selecionar uma task?";
  Object.assign(optionalTaskBtn.style, styles.optionalBtn);
  optionalTaskBtn.onmouseover = () => {
    optionalTaskBtn.style.background = "#e8f0fe";
  };
  optionalTaskBtn.onmouseout = () => {
    optionalTaskBtn.style.background = "white";
  };
  const step2Title = document.createElement("h3");
  Object.assign(step2Title.style, styles.h3);

  const taskCheckboxesContainer = document.createElement("div");
  taskCheckboxesContainer.id = "task-checkboxes-container";

  step2Div.appendChild(optionalTaskBtn);
  step2Div.appendChild(taskCheckboxesContainer);
  step2Div.appendChild(step2Title);
  step2Div.appendChild(stepTasks.selectionElement); // <--- ELEMENTO DO COMPONENTE AQUI
  popupContent.appendChild(step2Div);

  // --- STEP 3: FORMS ---
  const step3Div = document.createElement("div");
  step3Div.id = "step-3-form";
  Object.assign(step3Div.style, styles.stepBlock, { display: "none" });
  const step3Title = document.createElement("h3");
  Object.assign(step3Title.style, styles.h3);
  step3Div.appendChild(step3Title);
  const dynamicFormFieldsContainer = document.createElement("div");
  dynamicFormFieldsContainer.id = "dynamic-form-fields-container";
  step3Div.appendChild(dynamicFormFieldsContainer);

  // Injeta Módulos
  step3Div.appendChild(tagSupport.element); // Tag Support
  step3Div.appendChild(stepTasks.screenshotsElement); // Screenshots do Componente

  popupContent.appendChild(step3Div);

  // Email
  const emailAutomationDiv = document.createElement("div");
  emailAutomationDiv.id = "step-4-email";
  Object.assign(emailAutomationDiv.style, {
    display: "none",
    marginTop: "16px",
    paddingTop: "12px",
    borderTop: "1px solid #eee",
  });
  const emailLabel = document.createElement("label");
  emailLabel.style.display = "flex";
  emailLabel.style.alignItems = "center";
  emailLabel.style.cursor = "pointer";
  emailLabel.style.fontSize = "14px";
  const emailCheckbox = document.createElement("input");
  emailCheckbox.type = "checkbox";
  emailCheckbox.checked = true;
  Object.assign(emailCheckbox.style, styles.checkboxInput);
  emailLabel.appendChild(emailCheckbox);
  emailLabel.appendChild(
    document.createTextNode("Preencher email automaticamente?")
  );
  emailAutomationDiv.appendChild(emailLabel);
  popupContent.appendChild(emailAutomationDiv);

  const buttonContainer = document.createElement("div");
  Object.assign(buttonContainer.style, {
    display: "none",
    gap: "8px",
    padding: "0",
  });
  popupContent.appendChild(buttonContainer);
  const copyButton = document.createElement("button");
  Object.assign(copyButton.style, styles.buttonBase, {
    backgroundColor: "#5f6368",
  });
  copyButton.textContent = "Copiar";
  const generateButton = document.createElement("button");
  Object.assign(generateButton.style, styles.buttonBase, {
    backgroundColor: "#1a73e8",
  });
  generateButton.textContent = "Preencher";
  buttonContainer.appendChild(copyButton);
  buttonContainer.appendChild(generateButton);

  // --- RESIZE HANDLE (A Nova Alça) ---
  const resizeHandle = document.createElement('div');
  Object.assign(resizeHandle.style, styleResizeHandle); // Importado do utils
  resizeHandle.className = "no-drag"; // Garante que o draggable ignore
  resizeHandle.title = "Redimensionar";
  
  popup.appendChild(resizeHandle);

  // Ativa a lógica
  // Importe makeResizable do utils.js no topo do arquivo!
  makeResizable(popup, resizeHandle);

  document.body.appendChild(popup);

  // =========================================================================
  // 4. LÓGICA DE NEGÓCIO
  // =========================================================================

  function setCaseType(type) {
    currentCaseType = type;

    // 1. Sorteia uma cor do Google
    const activeStyle = getRandomGoogleStyle();

    // 2. Reseta ambos para o padrão cinza
    Object.assign(typeBAU.style, typeBtnStyle);
    Object.assign(typeLM.style, typeBtnStyle);

    // 3. Aplica a cor no selecionado e define o link
    if (type === "bau") {
      Object.assign(typeBAU.style, activeStyle);
      subStatusHelpLink.href =
        "https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657";
    } else {
      Object.assign(typeLM.style, activeStyle);
      subStatusHelpLink.href =
        "https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243";
    }

    if (subStatusSelect.value) {
      subStatusSelect.dispatchEvent(new Event("change"));
    }
  }

  function t(key) {
    try {
      if (
        translations &&
        translations[currentLang] &&
        translations[currentLang][key]
      )
        return translations[currentLang][key];
      if (translations && translations["pt"] && translations["pt"][key])
        return translations["pt"][key];
    } catch (e) {}
    return key;
  }

  function updateUIText() {
    langLabel.textContent = t("idioma");
    typeLabel.textContent = t("fluxo");
    mainStatusLabel.textContent = t("status_principal");
    subStatusLabel.textContent = t("substatus");
    stepSnippetsTitle.textContent = t("cenarios_comuns");
    step2Title.textContent = t("selecione_tasks");
    step3Title.textContent = t("preencha_detalhes");
    copyButton.textContent = t("copiar");
    generateButton.textContent = t("preencher");
    if (mainStatusSelect.querySelector('option[value=""]'))
      mainStatusSelect.querySelector('option[value=""]').textContent =
        t("select_status");
    if (subStatusSelect.querySelector('option[value=""]'))
      subStatusSelect.querySelector('option[value=""]').textContent =
        t("select_substatus");
    portugalLabel.textContent = t("caso_portugal");
    portugalLabelSim.textContent = t("sim");
    portugalLabelNao.textContent = t("nao");
    consentLabel.textContent = t("consentiu_gravacao");
    consentLabelSim.textContent = t("sim");
    consentLabelNao.textContent = t("nao");
    dynamicFormFieldsContainer.querySelectorAll("label").forEach((label) => {
      const fieldName = label.nextElementSibling.id.replace("field-", "");
      const translatedLabel = t(fieldName.toLowerCase());
      if (translatedLabel !== fieldName.toLowerCase())
        label.textContent = translatedLabel;
      else
        label.textContent =
          fieldName
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()) + ":";
    });
    optionalTaskBtn.textContent =
      "+ " +
      (currentLang === "pt"
        ? "Gostaria de selecionar uma task?"
        : "Quisiera seleccionar una tarea?");
  }

  function setLanguage(lang) {
    currentLang = lang;

    // 1. Sorteia uma cor do Google
    const activeStyle = getRandomGoogleStyle();

    // 2. Reseta ambos para o padrão cinza
    Object.assign(langPT.style, typeBtnStyle);
    Object.assign(langES.style, typeBtnStyle);

    // 3. Aplica a cor no selecionado e gerencia visibilidade
    if (lang === "pt") {
      Object.assign(langPT.style, activeStyle);
      stepPortugalDiv.style.display = "block";
      setPortugalCase(isPortugalCase);
    } else {
      Object.assign(langES.style, activeStyle);
      stepPortugalDiv.style.display = "none";
      stepConsentDiv.style.display = "none";
    }

    updateUIText();
    if (subStatusSelect.value) {
      subStatusSelect.dispatchEvent(new Event("change"));
    }
  }

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
        this.selectionStart = this.selectionEnd = start + insertText.length;
      } else if (e.key === "Backspace") {
        const start = this.selectionStart;
        if (start === this.selectionEnd && start > 0) {
          const textBefore = this.value.substring(0, start);
          if (textBefore.endsWith("\n• ")) {
            e.preventDefault();
            this.value =
              textBefore.substring(0, start - 3) +
              this.value.substring(this.selectionEnd);
            this.selectionStart = this.selectionEnd = start - 3;
          } else if (textBefore === "• ") {
            e.preventDefault();
            this.value = "";
            this.selectionStart = this.selectionEnd = 0;
          }
        }
      }
    };
  }

  function updateFieldsFromScenarios() {
    // 1. Identifica quais cenários estão marcados
    const container = typeof snippetContainer !== "undefined" ? snippetContainer : document.getElementById("snippet-container");
    if (!container) return;

    const activeScenarioInputs = container.querySelectorAll(
      'input[type="checkbox"]:checked, input[type="radio"]:checked'
    );

    const targetFieldsContent = {};
    const activeLinkedTasks = new Set();

    // 2. Lê os dados dos cenários marcados
    activeScenarioInputs.forEach((input) => {
      const scenarioId = input.id;
      const snippets = scenarioSnippets[scenarioId];
      if (snippets) {
        for (const fieldId in snippets) {
          // AQUI: Captura a task vinculada
          if (fieldId === "linkedTask") {
            activeLinkedTasks.add(snippets.linkedTask);
          }
          else if (fieldId !== "type") {
            if (!targetFieldsContent[fieldId]) targetFieldsContent[fieldId] = [];
            if (!targetFieldsContent[fieldId].includes(snippets[fieldId])) {
              targetFieldsContent[fieldId].push(snippets[fieldId]);
            }
          }
        }
      }
    });

    // 3. Preenche os campos de texto (Mantido igual)
    const allPossibleTargetFields = new Set();
    Object.values(scenarioSnippets).forEach((snippets) => {
      Object.keys(snippets).forEach((key) => {
        if (key !== "linkedTask" && key !== "type") allPossibleTargetFields.add(key);
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
          if (finalValue === "") finalValue = "• ";
          else if (!finalValue.endsWith("\n• ")) finalValue += "\n• ";
        } else {
          finalValue = combinedTextArray.join("\n\n");
        }

        // Limpeza
        if (finalValue.trim() !== "•" && finalValue.trim() !== "") field.value = finalValue;
        else if (textareaListFields.includes(fieldId.replace("field-", ""))) field.value = "• ";
        else field.value = "";

        if (field.tagName === "TEXTAREA" && typeof enableAutoBullet === "function") {
            enableAutoBullet(field);
        }
      }
    });

    // 4. (CORREÇÃO) Marca as Tasks no Novo Componente
    const tasksToEnable = new Set();
    const tasksToDisable = new Set();

    // Varre TODOS os inputs de cenário disponíveis na tela (marcados ou não)
    const allScenarioInputs = container.querySelectorAll('input[type="checkbox"], input[type="radio"]');

    allScenarioInputs.forEach(input => {
        const snippet = scenarioSnippets[input.id];
        if (snippet && snippet.linkedTask) {
            if (input.checked) {
                // Se marcado, entra na lista para LIGAR
                tasksToEnable.add(snippet.linkedTask);
            } else {
                // Se desmarcado, entra na lista para DESLIGAR
                tasksToDisable.add(snippet.linkedTask);
            }
        }
    });

  
    tasksToDisable.forEach(taskId => {
        if (!tasksToEnable.has(taskId)) {
            stepTasks.toggleTask(taskId, false); 
        }
    });


    tasksToEnable.forEach(taskId => {
        stepTasks.toggleTask(taskId, true); 
    });
  }

  mainStatusSelect.onchange = () => {
    const selectedStatus = mainStatusSelect.value;
    resetSteps(1.5);
    subStatusSelect.innerHTML = `<option value="">${t(
      "select_substatus"
    )}</option>`;
    if (!selectedStatus) {
      subStatusSelect.disabled = true;
      return;
    }
    for (const key in SUBSTATUS_TEMPLATES) {
      const template = SUBSTATUS_TEMPLATES[key];
      if (template.status === selectedStatus) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = template.name;
        subStatusSelect.appendChild(option);
      }
    }
    subStatusSelect.disabled = false;
  };

  subStatusSelect.onchange = () => {
    const selectedSubStatusKey = subStatusSelect.value;
    resetSteps(1.5);
    if (!selectedSubStatusKey) return;

    // Atualiza o Componente de Tasks
    stepTasks.updateSubStatus(selectedSubStatusKey);

    const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
    snippetContainer.innerHTML = "";

    const addSnippetInput = (scenario, type, container) => {
      const label = document.createElement("label");
      Object.assign(label.style, styles.checkboxLabel);
      label.onmouseover = () => (label.style.backgroundColor = "#e8eaed");
      label.onmouseout = () => (label.style.backgroundColor = "#f8f9fa");
      const input = document.createElement("input");
      input.type = type;
      input.id = scenario.id;
      Object.assign(input.style, styles.checkboxInput);
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
      Object.assign(reasonTitle.style, styles.label);
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
    if (filteredScenarios.length > 0) stepSnippetsDiv.style.display = "block";

    if (templateData.requiresTasks) {
      optionalTaskBtn.style.display = "none";
      step2Title.style.display = "block";
      stepTasks.selectionElement.style.display = "block";
      step2Div.style.display = "block";
    } else {
      optionalTaskBtn.style.display = "block";
      step2Title.style.display = "none";
      stepTasks.selectionElement.style.display = "none";
      step2Div.style.display = "block";
    }

    dynamicFormFieldsContainer.innerHTML = "";
    const placeholders = templateData.template.match(/{([A-Z0-9_]+)}/g) || [];
    const uniquePlaceholders = [...new Set(placeholders)];
    uniquePlaceholders.forEach((placeholder) => {
      if (
        [
          "{TAGS_IMPLEMENTED}",
          "{SCREENSHOTS_LIST}",
          "{CONSENTIU_GRAVACAO}",
          "{CASO_PORTUGAL}",
        ].includes(placeholder)
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
      Object.assign(label.style, styles.label);
      let field;
      if (textareaListFields.includes(fieldName)) {
        field = document.createElement("textarea");
        Object.assign(field.style, styles.textarea);
        field.classList.add("bullet-textarea");
        enableAutoBullet(field);
      } else if (textareaParagraphFields.includes(fieldName)) {
        field = document.createElement("textarea");
        Object.assign(field.style, styles.textarea);
      } else {
        field = document.createElement("input");
        field.type = "text";
        Object.assign(field.style, styles.input);
        if (
          fieldName === "REASON_COMMENTS" &&
          (selectedSubStatusKey.startsWith("NI_") ||
            selectedSubStatusKey.startsWith("IN_"))
        ) {
          Object.assign(label.style, { display: "none" });
          Object.assign(field.style, { display: "none" });
        }
      }

      if (fieldName === "ON_CALL" && currentCaseType === "lm") {
        Object.assign(label.style, { display: "none" });
        Object.assign(field.style, { display: "none" });
        field.value = "N/A";
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


    const checked = stepTasks.getCheckedElements().map((c) => c.value);
    tagSupport.updateVisibility(selectedSubStatusKey, checked);
  };


  optionalTaskBtn.onclick = () => {
    optionalTaskBtn.style.display = "none";
    step2Title.style.display = "block";
    stepTasks.selectionElement.style.display = "block"; 
  };
function generateOutputHtml() {
        const selectedSubStatusKey = subStatusSelect.value;
        if (!selectedSubStatusKey) return null;
        
        const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
        let outputText = templateData.template.replace(/\n/g, "<br>");
        const ulStyle = "style=\"margin-bottom: 12px; padding-left: 30px;\"";

        let tagNames = [];
        let screenshotsText = '';


        const checkedBoxes = stepTasks.getCheckedElements();
        
        if (checkedBoxes.length > 0) {
            checkedBoxes.forEach(cb => {
                const taskKey = cb.value;
                const task = TASKS_DB[taskKey];
                
                const countSpan = cb.closest().querySelector('.stepper-count'); 
                const count = countSpan ? parseInt(countSpan.textContent) : 1;

                if (count > 1) tagNames.push(`${task.name} (x${count})`);
                else tagNames.push(task.name);
            });
        }


       const screenshotsContainer = stepTasks.screenshotsElement;
        
        if (screenshotsContainer) {

            const nameInputs = Array.from(screenshotsContainer.querySelectorAll('input[id^="name-"]'));

            
            if (nameInputs.length > 0) {
                nameInputs.forEach(nameInput => {
                    const customName = nameInput.value;

                    const card = nameInput.closest('.cw-screen-card');
                    
                    if (card) {
                        const printInputs = card.querySelectorAll('input[id^="screen-"]');
                        
                        let hasPrints = false;
                        let itemsHtml = '';

                        printInputs.forEach(printInput => {

                            const group = printInput.closest('.cw-input-group');
                            const labelEl = group ? group.querySelector('.cw-input-label') : null;
                            
                            const labelText = labelEl ? labelEl.textContent : 'Evidência';
                            const val = printInput.value.trim();
                            const displayVal = val ? ` ${val}` : '';

                            itemsHtml += `<li>${labelText} -${displayVal}</li>`;
                            hasPrints = true;
                        });

                        if (hasPrints) {
                            screenshotsText += `<b>${customName}</b>`;
                            screenshotsText += `<ul ${ulStyle}>${itemsHtml}</ul>`;
                        }
                    }
                });
            }
        }



        // Tags
        if (outputText.includes('{TAGS_IMPLEMENTED}')) {
            outputText = outputText.replace(/{TAGS_IMPLEMENTED}/g, tagNames.join(', ') || 'N/A');
        } else if (tagNames.length > 0) {
            outputText += `<br><b>Tags:</b> ${tagNames.join(', ')}<br>`;
        }

        // Screenshots
        if (outputText.includes('{SCREENSHOTS_LIST}')) {
            outputText = outputText.replace(/{SCREENSHOTS_LIST}/g, screenshotsText ? `${screenshotsText}` : 'N/A');
        } else if (screenshotsText !== '') {
            outputText += `<br>${screenshotsText}`;
        }


        if (currentLang === 'pt' && isPortugalCase) {
            const consentValue = consentRadioSim.checked ? t('sim') : t('nao');
            outputText = outputText.replace(/{CONSENTIU_GRAVACAO}/g, `<br><b>${t('consentiu_gravacao')}</b> ${consentValue}<br><br>`);
            outputText = outputText.replace(/{CASO_PORTUGAL}/g, `<br><b>${t('caso_portugal')}</b> ${t('sim')}<br>`);
        } else if (currentLang === 'pt' && !isPortugalCase) {
            outputText = outputText.replace(/{CASO_PORTUGAL}/g, `<br><b>${t('caso_portugal')}</b> ${t('nao')}<br>`);
            outputText = outputText.replace(/{CONSENTIU_GRAVACAO}/g, ''); 
        } else {
            outputText = outputText.replace(/{CASO_PORTUGAL}/g, '');
            outputText = outputText.replace(/{CONSENTIU_GRAVACAO}/g, '');
        }


        const inputs = dynamicFormFieldsContainer.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const fieldName = input.id.replace('field-', '');
            const placeholderRegex = new RegExp(`{${fieldName}}`, 'g');
            let value = input.value;
            

            if (fieldName === 'REASON_COMMENTS' && (selectedSubStatusKey.startsWith('NI_') || selectedSubStatusKey.startsWith('IN_'))) {
                const checkedRadio = snippetContainer.querySelector('input[type="radio"]:checked');
                if (checkedRadio && scenarioSnippets[checkedRadio.id]) {
                    value = scenarioSnippets[checkedRadio.id]['field-REASON_COMMENTS'];
                }
            }

            if (textareaListFields.includes(fieldName) && value.trim() !== '') {
                const lines = value.split('\n').map(l => l.trim()).filter(l => l !== '' && l !== '•')
                    .map(l => l.startsWith('• ') ? l.substring(2) : l)
                    .map(l => `<li>${l}</li>`).join('');
                value = lines ? `<ul ${ulStyle}>${lines}</ul>` : '';
            } else if (textareaParagraphFields.includes(fieldName)) {
                value = value.split('\n').filter(l => l.trim() !== '').map(l => `<p style="margin: 0 0 8px 0;">${l}</p>`).join('');
            } else if (input.tagName === 'TEXTAREA') { 
                value = value.replace(/\n/g, '<br>'); 
            }
            

            const textContent = value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
            const isEmpty = textContent === '' || textContent === '•' || textContent.toLowerCase() === 'n/a';

            if (isEmpty) {

                const lineRegex = new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${fieldName}\\}(?:<br>\\s*)?`, 'gi');
                if (lineRegex.test(outputText)) outputText = outputText.replace(lineRegex, '');
                else outputText = outputText.replace(placeholderRegex, '');
            } else {
                outputText = outputText.replace(placeholderRegex, value.replace(/\$/g, '$$$$'));
            }
        });
        

        outputText = outputText.replace(/{([A-Z0-9_]+)}/g, ''); 
        outputText = outputText.replace(/(<br>){3,}/g, '<br><br>');
        

        if (typeof tagSupport !== 'undefined' && tagSupport.getOutput) {
            outputText += tagSupport.getOutput();
        }

        return outputText;
    }

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
    toggleVisibility();

    const finishLoading = triggerProcessingAnimation();

 
    const campo = await ensureNoteCardIsOpen();
    
    if (campo) {
      try {
        campo.focus();
        

        const isEmpty =
          campo.innerHTML.trim() === "<p><br></p>" ||
          campo.innerHTML.trim() === "<br>" ||
          campo.innerText.trim() === "";

        if (isEmpty) {
          const range = document.createRange();
          range.selectNodeContents(campo);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          document.execCommand("delete", false, null);
        } else if (!campo.innerHTML.endsWith("<br><br>")) {
          const range = document.createRange();
          range.selectNodeContents(campo);
          range.collapse(false);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          document.execCommand("insertHTML", false, "<br><br>");
        }

        // Inserção
        document.execCommand("insertHTML", false, htmlOutput);
        triggerInputEvents(campo);
        
        // Toast de backup (opcional, já que teremos o check verde)
        setTimeout(() => { showToast(t("inserido_copiado")); }, 600);

// 1. Verifica se vai ter email
        const emailEnabled = typeof emailCheckbox !== "undefined" && emailCheckbox ? emailCheckbox.checked : true;
        const hasEmailToRun = selectedSubStatusKey && SUBSTATUS_SHORTCODES[selectedSubStatusKey] && emailEnabled;

        if (hasEmailToRun) {
            const emailCode = SUBSTATUS_SHORTCODES[selectedSubStatusKey];

            await runEmailAutomation(emailCode);

            await new Promise(r => setTimeout(r, 500)); 
        }

        // 2. FINALIZA A ANIMAÇÃO

        finishLoading();

        // 3. Limpeza Final
        resetSteps(1.5);
        mainStatusSelect.value = "";
        subStatusSelect.innerHTML = `<option value="">${t("select_substatus")}</option>`;
        subStatusSelect.disabled = true;

      } catch (err) {
        console.error(err);
        showToast("Erro ao inserir.", { error: true });
        finishLoading(); 
      }
  };
}

  function resetSteps(startFrom = 1.5) {
    if (startFrom <= 1.5) {
      stepSnippetsDiv.style.display = "none";
      snippetContainer.innerHTML = "";
    }
    if (startFrom <= 2) {
      step2Div.style.display = "none";
      stepTasks.reset(); 
      optionalTaskBtn.style.display = "none";
    }
    if (startFrom <= 3) {
      step3Div.style.display = "none";
      dynamicFormFieldsContainer.innerHTML = "";
      tagSupport.reset(); 
      buttonContainer.style.display = "none";
      emailAutomationDiv.style.display = "none";
    }
  }

function toggleVisibility() {
    visible = !visible;
    
    if (visible) {

        const btnExpand = popup.querySelector('.cw-expand-btn');

        if (btnExpand && typeof btnExpand.resetState === 'function') {
            btnExpand.resetState();
        }
    }

    toggleGenieAnimation(visible, popup, "cw-btn-notes"); 
  }

  setCaseType("bau");
  setLanguage("pt");

  return toggleVisibility;
}