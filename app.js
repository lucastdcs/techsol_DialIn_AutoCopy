(function () {
  // --------- Fonte Poppins ---------
  const fontId = "poppins-google-font";
  if (!document.getElementById(fontId)) {
    const link = document.createElement("link");
    link.id = fontId;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }

  // --------- Evita duplicar botão ---------
  if (document.getElementById("autofill-floating-btn")) return;

  // --------- Função Toast ---------
  function showToast(message, opts = {}) {
    const toast = document.createElement("div");
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    Object.assign(toast.style, {
      position: "fixed", bottom: "24px", left: "50%",
      transform: "translateX(-50%) translateY(20px)",
      background: opts.error ? "#d93025" : "#323232",
      color: "#fff", padding: "14px 24px", borderRadius: "4px",
      boxShadow: "0 2px 8px rgba(0,0,0,.3)", fontFamily: "'Poppins', sans-serif",
      fontSize: "14px", lineHeight: "20px", zIndex: "999999",
      opacity: "0", transition: "opacity .3s ease, transform .3s ease"
    });
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, opts.duration || 4000);
  }

  // --------- Função para Copiar HTML (Rich Text) ---------
  function copyHtmlToClipboard(html) {
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.innerHTML = html;
      document.body.appendChild(container);
      const range = document.createRange();
      range.selectNodeContents(container);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        document.execCommand('copy');
        showToast("Texto copiado com sucesso");
      } catch (err) {
        showToast("Falha ao copiar", { error: true });
      }
      selection.removeAllRanges();
      document.body.removeChild(container);
  }

  // --------- Função para tornar elementos arrastáveis ---------
  function makeDraggable(element, handle) {
    const dragHandle = handle || element;
    let isDragging = false, initialMouseX, initialMouseY, initialElemX, initialElemY;
    dragHandle.onmousedown = function(e) {
      e.preventDefault(); isDragging = true;
      dragHandle.style.cursor = 'grabbing';
      initialMouseX = e.clientX; initialMouseY = e.clientY;
      const rect = element.getBoundingClientRect();
      initialElemX = rect.left; initialElemY = rect.top;
      element.style.top = initialElemY + 'px'; element.style.left = initialElemX + 'px';
      element.style.right = 'auto'; element.style.bottom = 'auto';
      if (element.id === 'autofill-popup') element.style.transform = 'scale(1)';
      document.onmousemove = onMouseMove; document.onmouseup = onMouseUp;
    };
    function onMouseMove(e) {
      if (!isDragging) return;
      const deltaX = e.clientX - initialMouseX, deltaY = e.clientY - initialMouseY;
      let newElemX = initialElemX + deltaX, newElemY = initialElemY + deltaY;
      const vpWidth = window.innerWidth, vpHeight = window.innerHeight;
      const elemWidth = element.offsetWidth, elemHeight = element.offsetHeight;
      if (newElemX < 0) newElemX = 0; if (newElemY < 0) newElemY = 0;
      if (newElemX + elemWidth > vpWidth) newElemX = vpWidth - elemWidth;
      if (newElemY + elemHeight > vpHeight) newElemY = vpHeight - elemHeight;
      element.style.top = newElemY + 'px'; element.style.left = newElemX + 'px';
    }
    function onMouseUp() {
      isDragging = false; dragHandle.style.cursor = 'grab';
      document.onmousemove = null; document.onmouseup = null;
    }
  }
  
  // 1. O "Banco de Dados" de Tasks e seus Screenshots
  const TASKS_DB = {
    'gtm_installation': { name: 'GTM Installation', screenshots: ['GTM Instalado', 'Vinculador de conversões'] },
    'ads_conversion_tracking': { name: 'Ads Conversion Tracking', screenshots: ['Tag criada', 'Teste GTM', 'Teste Ads', 'Versão Publicada', 'Status Ads'] },
    'ads_enhanced_conversions': { name: 'Ads Enhanced Conversions (ECW4)', screenshots: ['Termos aceitos no Ads', 'Tag implementada', 'Teste GTM', 'Teste Ads', 'Versão Publicada', 'Painel do Ads (após 7 dias)'] },
  };

  // 2. Os "Templates" de Substatus
  const SUBSTATUS_TEMPLATES = {
    'SO_Implementation_Only': {
        status: 'SO', name: 'SO - Implementation Only', requiresTasks: true,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}
<b>On Call (Call Started) signaled on time?</b> {ON_CALL}
<b>Substatus:</b> SO - Implementation Only
<b>Reason/comments:</b> Task implementada com sucesso
<b>OnCall Comments:</b>
<b>Task(s) solicitada(s):</b>
{TASKS_SOLICITADAS}
<b>Seguimos com os passos:</b>
{PASSOS_EXECUTADOS}
<b>Resultado:</b>
{RESULTADO}
<b>Tag Implemented:</b> {TAGS_IMPLEMENTED}
<b>Screenshots:</b>
{SCREENSHOTS_LIST}
<b>Multiple CIDs:</b> {CIDS}`
    },
    'SO_Education_Only': {
        status: 'SO', name: 'SO - Education Only', requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}
<b>On Call (Call Started) signaled on time?</b> {ON_CALL}
<b>Substatus:</b> SO - Education Only
<b>Reason/comments:</b> Consultoria utilizada para tirar dúvidas do anunciante.
<b>OnCall Comments:</b>
<b>Dúvidas do anunciante:</b>
{DUVIDAS}
<b>Resoluções/Explicações:</b>
{RESOLUCOES}
<b>Tag Implemented:</b> N/A
<b>Screenshots:</b> N/A
<b>Multiple CIDs:</b> {CIDS}`
    },
    'NI_Awaiting_Validations': {
        status: 'NI', name: 'NI - Awaiting Validations (ECW4)', requiresTasks: true,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}
<b>On Call (Call Started) signaled on time?</b> {ON_CALL}
<b>Substatus:</b> NI - Awaiting Validations (ECW4)
<b>Reason/comments:</b> Aguardando Validações no Google Ads
<b>OnCall Comments:</b>
<b>Tasks solicitadas pelo AM:</b>
{TASKS_SOLICITADAS}
<b>Tasks implementadas na call:</b>
{TASKS_IMPLEMENTADAS_CALL}
<b>Seguimos com os passos:</b>
{PASSOS_EXECUTADOS}
<b>Próximos passos (Acompanhamento):</b>
{PROXIMOS_PASSOS}
<b>Considerações adicionais:</b>
{CONSIDERACOES}
<b>Tag Implemented:</b> {TAGS_IMPLEMENTED}
<b>Screenshots:</b>
{SCREENSHOTS_LIST}
<b>Multiple CIDs:</b> {CIDS}`
    },
    'NI_Awaiting_Inputs_Initial': {
        status: 'NI', name: 'NI - Awaiting Inputs (Início 2/6)', requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}
<b>On Call (Call Started) signaled on time?</b> {ON_CALL}
<b>Substatus:</b> NI - Awaiting Inputs
<b>Reason/comments:</b> Aguardando informações por parte do anunciante para concluir a implementação
<b>OnCall Comments:</b>
<b>Tasks solicitadas pelo AM:</b>
{TASKS_SOLICITADAS}
<b>Contexto/O que foi feito:</b>
{CONTEXTO_CALL}
<b>Impedimento / Próximo passo (Anunciante):</b>
{IMPEDIMENTO_CLIENTE}
<b>Minha Ação:</b>
{MINHA_ACAO}
<b>Considerações adicionais:</b>
{CONSIDERACOES}
<b>Tag Implemented:</b> N/A
<b>Screenshots:</b>
{SCREENSHOTS}
<b>Multiple CIDs:</b> {CIDS}`
    },
    'NI_Awaiting_Inputs_Followup': {
        status: 'NI', name: 'NI - Awaiting Inputs (Follow-up 2/6)', requiresTasks: false,
        template: `<b>Speakeasy ID:</b> N/A
<b>On Call (Call Started) signaled on time?</b> N/A
<b>Substatus:</b> NI - Awaiting Inputs
<b>Reason/comments:</b> Aguardando informações por parte do anunciante para concluir a implementação (2/6)
<b>OnCall Comments:</b>
No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas não obtive resposta. Envio na sequência o email referente ao dia respectivo.
<b>Tag Implemented:</b> N/A
<b>Screenshots:</b>
Tentativa 1 -
Tentativa 2 -
<b>Multiple CIDs:</b>`
    },
    'IN_Not_Reachable': {
        status: 'IN', name: 'IN - Not Reachable (NRP)', requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}
<b>On Call (Call Started) signaled on time?</b> {ON_CALL}
<b>Substatus:</b> IN - Not Reachable
<b>Reason/comments:</b> NRP
<b>OnCall Comments:</b>
{COMENTARIOS}
<b>Tag Implemented:</b> N/A
<b>Screenshots:</b>
Tentativa 1 -
Tentativa 2 -
Tentativa 3 -
<b>Multiple CIDs:</b> {CIDS}`
    }
  };

  // --------- Cria botão flutuante ---------
  const btn = document.createElement("button");
  btn.id = "autofill-floating-btn";
  btn.textContent = "✎";
  Object.assign(btn.style, {
    position: "fixed", top: "60%", right: "20px", width: "48px", height: "48px",
    borderRadius: "50%", border: "none", background: "#1a73e8", color: "#fff",
    fontSize: "22px", fontWeight: "500", boxShadow: "0 4px 10px rgba(0,0,0,.3)",
    cursor: "grab", zIndex: "999999", transition: "background .2s"
  });
  btn.onmouseenter = () => (btn.style.background = "#1765c0");
  btn.onmouseleave = () => (btn.style.background = "#1a73e8");
  document.body.appendChild(btn);
  makeDraggable(btn);

  // --------- Popup (inicialmente oculto) ---------
  const popup = document.createElement("div");
  popup.id = "autofill-popup";
  Object.assign(popup.style, {
    position: "fixed", top: "24px", right: "24px", padding: "16px",
    background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,.2)",
    fontFamily: "'Poppins', sans-serif", zIndex: "999999", width: "320px",
    maxHeight: "90vh", overflowY: "auto", textAlign: "left",
    transition: "opacity .3s ease, transform .3s ease", opacity: "0",
    pointerEvents: "none", transform: "scale(0.95)"
  });

  // ---------- Header ----------
  const header = document.createElement("div");
  Object.assign(header.style, {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "8px", marginBottom: "16px", textAlign: "center", cursor: "grab"
  });
  const logo = document.createElement("img");
  logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
  Object.assign(logo.style, { width: "24px", height: "24px" });
  const title = document.createElement("div");
  title.textContent = "Case Notes Assistant";
  Object.assign(title.style, { fontSize: "16px", fontWeight: "600", color: "#202124" });
  header.appendChild(logo);
  header.appendChild(title);
  popup.appendChild(header);
  makeDraggable(popup, header);

  // ---------- Fechar ----------
  const closeBtn = document.createElement("div");
  closeBtn.textContent = "✕";
  Object.assign(closeBtn.style, {
    position: "absolute", top: "8px", right: "10px", fontSize: "18px",
    color: "#5f6368", cursor: "pointer"
  });
  closeBtn.onclick = () => togglePopup(false);
  popup.appendChild(closeBtn);

  // ---------- ESTILOS DOS FORMULÁRIOS (Reutilizáveis) ----------
  const styleSelect = {
    width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0",
    fontSize: "14px", marginBottom: "16px", background: "#fff", color: "#202124",
    outline: "none", boxSizing: "border-box"
  };
  const styleLabel = {
    fontSize: "13px", fontWeight: "500", color: "#3c4043",
    marginBottom: "4px", display: "block"
  };
  const styleInput = {
    width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0",
    fontSize: "14px", marginBottom: "12px", boxSizing: "border-box"
  };
  const styleTextarea = { ...styleInput, height: "100px", resize: "vertical", fontFamily: "'Poppins', sans-serif" };
  const styleStepBlock = {
    borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px"
  };
  const styleH3 = {
    fontSize: "14px", fontWeight: "600", color: "#202124", margin: "0 0 12px 0"
  };
  const styleCheckboxLabel = {
    display: "flex", alignItems: "center", marginBottom: "10px",
    fontSize: "14px", fontWeight: "400", cursor: "pointer",
    padding: "8px", background: "#f8f9fa", borderRadius: "6px"
  };
  const styleCheckboxInput = {
    width: "auto", marginRight: "8px", marginBottom: "0"
  };
  const styleButtonBase = {
    flex: "1 1 0", padding: "10px 0", color: "#fff", border: "none",
    borderRadius: "8px", fontSize: "14px", fontWeight: "500",
    cursor: "pointer", marginTop: "16px"
  };
  
  // Listas de campos para <textarea>
  const textareaListFields = [
      'TASKS_SOLICITADAS', 'PASSOS_EXECUTADOS', 'RESULTADO', 'DUVIDAS', 'RESOLUCOES',
      'TASKS_IMPLEMENTADAS_CALL', 'PROXIMOS_PASSOS', 'CONTEXTO_CALL', 
      'IMPEDIMENTO_CLIENTE', 'MINHA_ACAO', 'SCREENSHOTS'
  ];
  const textareaParagraphFields = ['CONSIDERACOES', 'COMENTARIOS'];
  
  // Função de auto-bullet para textareas
  function enableAutoBullet(textarea) {
      if(textarea.value === '') {
          textarea.value = '• ';
      }
      textarea.onkeydown = function(e) {
          if (e.key === 'Enter') {
              e.preventDefault();
              const start = this.selectionStart, end = this.selectionEnd, value = this.value;
              this.value = value.substring(0, start) + '\n• ' + value.substring(end);
              const newPos = start + 3;
              this.selectionStart = newPos; this.selectionEnd = newPos;
          } else if (e.key === 'Backspace') {
              const start = this.selectionStart;
              if (start === this.selectionEnd && start > 0) {
                  const textBefore = this.value.substring(0, start);
                  if (textBefore.endsWith('\n• ') || textBefore.endsWith('• ')) {
                      e.preventDefault();
                      const isAtStart = textBefore.endsWith('• ');
                      const charsToRemove = isAtStart ? 2 : 3;
                      this.value = textBefore.substring(0, start - charsToRemove) + this.value.substring(this.selectionEnd);
                      const newPos = start - charsToRemove;
                      this.selectionStart = newPos; this.selectionEnd = newPos;
                  }
              }
          }
      };
  }

  // ---------- ETAPA 1: SELEÇÃO DE STATUS ----------
  const step1Div = document.createElement("div");
  step1Div.id = "step-1-selection";
  const mainStatusLabel = document.createElement("label");
  mainStatusLabel.textContent = "Status Principal:";
  Object.assign(mainStatusLabel.style, styleLabel);
  const mainStatusSelect = document.createElement("select");
  mainStatusSelect.id = "main-status";
  mainStatusSelect.innerHTML = `
    <option value="">-- Selecione --</option>
    <option value="NI">NI - Need Info</option>
    <option value="SO">SO - Solution Offered</option>
    <option value="IN">IN - Inactive</option>
    <option value="AS">AS - Awaiting Schedule</option>`;
  Object.assign(mainStatusSelect.style, styleSelect);
  const subStatusLabel = document.createElement("label");
  subStatusLabel.textContent = "Substatus:";
  Object.assign(subStatusLabel.style, styleLabel);
  const subStatusSelect = document.createElement("select");
  subStatusSelect.id = "sub-status";
  subStatusSelect.innerHTML = `<option value="">-- Selecione o Status --</option>`;
  Object.assign(subStatusSelect.style, styleSelect);
  subStatusSelect.disabled = true;
  step1Div.appendChild(mainStatusLabel);
  step1Div.appendChild(mainStatusSelect);
  step1Div.appendChild(subStatusLabel);
  step1Div.appendChild(subStatusSelect);
  popup.appendChild(step1Div);

  // ---------- ETAPA 2: SELEÇÃO DE TASKS (Oculto) ----------
  const step2Div = document.createElement("div");
  step2Div.id = "step-2-tasks";
  Object.assign(step2Div.style, { ...styleStepBlock, display: 'none' });
  const step2Title = document.createElement("h3");
  step2Title.textContent = "Selecione as Tasks";
  Object.assign(step2Title.style, styleH3);
  const taskCheckboxesContainer = document.createElement("div");
  taskCheckboxesContainer.id = "task-checkboxes-container";
  step2Div.appendChild(step2Title);
  step2Div.appendChild(taskCheckboxesContainer);
  popup.appendChild(step2Div);

  // ---------- ETAPA 3: FORMULÁRIO DINÂMICO (Oculto) ----------
  const step3Div = document.createElement("div");
  step3Div.id = "step-3-form";
  Object.assign(step3Div.style, { ...styleStepBlock, display: 'none' });
  const step3Title = document.createElement("h3");
  step3Title.textContent = "Preencha os Detalhes";
  Object.assign(step3Title.style, styleH3);
  const dynamicFormFieldsContainer = document.createElement("div");
  dynamicFormFieldsContainer.id = "dynamic-form-fields-container";
  step3Div.appendChild(step3Title);
  step3Div.appendChild(dynamicFormFieldsContainer);
  popup.appendChild(step3Div);
  
  // ---------- Container para Botões ----------
  const buttonContainer = document.createElement("div");
  Object.assign(buttonContainer.style, { display: "flex", gap: "8px", display: "none" });
  popup.appendChild(buttonContainer);

  // ---------- Botão Copiar ----------
  const copyButton = document.createElement("button");
  copyButton.textContent = "Copiar";
  Object.assign(copyButton.style, { ...styleButtonBase, backgroundColor: "#5f6368" });
  copyButton.onmouseover = () => (copyButton.style.backgroundColor = "#4a4d50");
  copyButton.onmouseout = () => (copyButton.style.backgroundColor = "#5f6368");
  buttonContainer.appendChild(copyButton);
  
  // ---------- Botão Preencher (Gerador) ----------
  const generateButton = document.createElement("button");
  generateButton.textContent = "Preencher";
  Object.assign(generateButton.style, { ...styleButtonBase, backgroundColor: "#1a73e8" });
  generateButton.onmouseover = () => (generateButton.style.backgroundColor = "#1765c0");
  generateButton.onmouseout = () => (generateButton.style.backgroundColor = "#1a73e8");
  buttonContainer.appendChild(generateButton);

  document.body.appendChild(popup);

  // --------------------------------------------------
  // ---------- LÓGICA DINÂMICA DO WIZARD ----------
  // --------------------------------------------------

  function resetSteps(startFrom = 2) {
    if (startFrom <= 2) {
      step2Div.style.display = 'none';
      taskCheckboxesContainer.innerHTML = '';
    }
    if (startFrom <= 3) {
      step3Div.style.display = 'none';
      dynamicFormFieldsContainer.innerHTML = '';
      buttonContainer.style.display = 'none';
    }
  }

  mainStatusSelect.onchange = () => {
    const selectedStatus = mainStatusSelect.value;
    resetSteps(2);
    subStatusSelect.innerHTML = '<option value="">-- Selecione o Substatus --</option>';
    if (!selectedStatus) {
      subStatusSelect.disabled = true;
      return;
    }
    for (const key in SUBSTATUS_TEMPLATES) {
      const template = SUBSTATUS_TEMPLATES[key];
      if (template.status === selectedStatus) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = template.name;
        subStatusSelect.appendChild(option);
      }
    }
    subStatusSelect.disabled = false;
  };

  subStatusSelect.onchange = () => {
    const selectedSubStatusKey = subStatusSelect.value;
    resetSteps(2);
    if (!selectedSubStatusKey) return;

    const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];

    // **Etapa 2: Tasks**
    if (templateData.requiresTasks) {
      taskCheckboxesContainer.innerHTML = '';
      for (const taskKey in TASKS_DB) {
        const task = TASKS_DB[taskKey];
        const label = document.createElement('label');
        Object.assign(label.style, styleCheckboxLabel);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = taskKey;
        Object.assign(checkbox.style, styleCheckboxInput);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${task.name}`));
        taskCheckboxesContainer.appendChild(label);
      }
      step2Div.style.display = 'block';
    }

    dynamicFormFieldsContainer.innerHTML = '';
    
    // --- Início: Bloco de Snippets ---
    const snippetContainer = document.createElement("div");
    Object.assign(snippetContainer.style, { marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' });
    let snippetAdded = false;

    // Snippet "Cenário Comum: ADV sem acesso"
    if (selectedSubStatusKey === 'NI_Awaiting_Inputs_Initial') {
      const quickFillLabel = document.createElement('label');
      Object.assign(quickFillLabel.style, styleCheckboxLabel);
      const quickFillCheckbox = document.createElement('input');
      quickFillCheckbox.type = 'checkbox';
      quickFillCheckbox.id = 'quickfill-cms-access';
      Object.assign(quickFillCheckbox.style, styleCheckboxInput);
      quickFillLabel.appendChild(quickFillCheckbox);
      quickFillLabel.appendChild(document.createTextNode(" Cenário: ADV sem acesso ao CMS"));
      snippetContainer.appendChild(quickFillLabel);
      snippetAdded = true;
    }
    
    // Snippets "SO - Implementation Only"
    if (selectedSubStatusKey === 'SO_Implementation_Only') {
      // Snippet WhatsApp
      const quickFillLabelWA = document.createElement('label');
      Object.assign(quickFillLabelWA.style, styleCheckboxLabel);
      const quickFillCheckboxWA = document.createElement('input');
      quickFillCheckboxWA.type = 'checkbox';
      quickFillCheckboxWA.id = 'quickfill-whatsapp';
      Object.assign(quickFillCheckboxWA.style, styleCheckboxInput);
      quickFillLabelWA.appendChild(quickFillCheckboxWA);
      quickFillLabelWA.appendChild(document.createTextNode(" Cenário: Conversão de WhatsApp"));
      snippetContainer.appendChild(quickFillLabelWA);

      // *** NOVO: Snippet Fechamento ECW4 ***
      const quickFillLabelECW4 = document.createElement('label');
      Object.assign(quickFillLabelECW4.style, styleCheckboxLabel);
      const quickFillCheckboxECW4 = document.createElement('input');
      quickFillCheckboxECW4.type = 'checkbox';
      quickFillCheckboxECW4.id = 'quickfill-ecw4-close';
      Object.assign(quickFillCheckboxECW4.style, styleCheckboxInput);
      quickFillLabelECW4.appendChild(quickFillCheckboxECW4);
      quickFillLabelECW4.appendChild(document.createTextNode(" Cenário: Fechamento ECW4 (Pós 7 dias)"));
      snippetContainer.appendChild(quickFillLabelECW4);
      // *** FIM NOVO SNIPPET ***
      
      snippetAdded = true;
    }

    if (snippetAdded) {
      dynamicFormFieldsContainer.appendChild(snippetContainer);
    }
    // --- Fim: Bloco de Snippets ---


    // **Etapa 3: Formulário Dinâmico**
    const placeholders = templateData.template.match(/{([A-Z_]+)}/g) || [];
    const uniquePlaceholders = [...new Set(placeholders)];
    uniquePlaceholders.forEach(placeholder => {
      if (placeholder === '{TAGS_IMPLEMENTED}' || placeholder === '{SCREENSHOTS_LIST}') {
        return;
      }
      const fieldName = placeholder.slice(1, -1);
      const label = document.createElement('label');
      label.textContent = fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ':';
      Object.assign(label.style, styleLabel);
      let field;
      if (textareaListFields.includes(fieldName)) {
          field = document.createElement('textarea');
          Object.assign(field.style, styleTextarea);
          enableAutoBullet(field);
      } else if (textareaParagraphFields.includes(fieldName)) {
          field = document.createElement('textarea');
          Object.assign(field.style, styleTextarea);
      } else {
          field = document.createElement('input');
          field.type = 'text';
          Object.assign(field.style, styleInput);
      }
      field.id = `field-${fieldName}`;
      dynamicFormFieldsContainer.appendChild(label);
      dynamicFormFieldsContainer.appendChild(field);
    });

    // **Listener para o Snippet "ADV sem acesso"**
    const quickFillCheckbox = document.getElementById('quickfill-cms-access');
    if (quickFillCheckbox) {
      quickFillCheckbox.onchange = (e) => {
        const isChecked = e.target.checked;
        const tasksField = document.getElementById('field-TASKS_SOLICITADAS');
        const contextoField = document.getElementById('field-CONTEXTO_CALL');
        const impedimentoField = document.getElementById('field-IMPEDIMENTO_CLIENTE');
        const acaoField = document.getElementById('field-MINHA_ACAO');
        const screenshotsField = document.getElementById('field-SCREENSHOTS');
        if (isChecked) {
          if (tasksField) tasksField.value = "• Instalação do GTM\n• Configuração de Conversões";
          if (contextoField) contextoField.value = "• Percebi que o(a) anunciante não tinha GTM Instalado.\n• Seguimos com a criação de conta no GTM.\n• Entretanto, a conta de acesso ao painel do site (ex: WordPress) não tinha permissão para instalar plugins ou editar o código.";
          if (impedimentoField) impedimentoField.value = "• Anunciante precisa conseguir acesso de administrador ao painel do site.\n• OU\n• Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.";
          if (acaoField) acaoField.value = "• Coloco o caso em 2/6.\n• Assim que o anunciante tiver o acesso ou a instalação for feita, abrirei um caso em BAU para dar continuidade.";
          if (screenshotsField) screenshotsField.value = "• Print do painel do CMS mostrando a falta de permissão (opcional).";
        } else {
          if (tasksField) { tasksField.value = ""; enableAutoBullet(tasksField); }
          if (contextoField) { contextoField.value = ""; enableAutoBullet(contextoField); }
          if (impedimentoField) { impedimentoField.value = ""; enableAutoBullet(impedimentoField); }
          if (acaoField) { acaoField.value = ""; enableAutoBullet(acaoField); }
          if (screenshotsField) { screenshotsField.value = ""; enableAutoBullet(screenshotsField); }
        }
      };
    }
    
    // **Listener para o Snippet "WhatsApp"**
    const quickFillWhatsappCheckbox = document.getElementById('quickfill-whatsapp');
    if (quickFillWhatsappCheckbox) {
      quickFillWhatsappCheckbox.onchange = (e) => {
        const isChecked = e.target.checked;
        const taskCheckbox = document.querySelector('#step-2-tasks input[value="ads_conversion_tracking"]');
        if (taskCheckbox) {
            taskCheckbox.checked = isChecked;
        }
        const tasksField = document.getElementById('field-TASKS_SOLICITADAS');
        const passosField = document.getElementById('field-PASSOS_EXECUTADOS');
        const resultadoField = document.getElementById('field-RESULTADO');
        if (isChecked) {
          if (tasksField) tasksField.value = "• Criação de conversão para WHATSAPP";
          if (passosField) passosField.value = "• Fizemos a criação da conversão no Ads.\n• Criamos a Tag no GTM usando acionadores de clique (ex: Click URL / Click Text) para os botões de WhatsApp.\n• Realizamos os testes e validamos o funcionamento.";
          if (resultadoField) resultadoField.value = "• Task implementada com sucesso. Fecho o caso sem acompanhamento.";
        } else {
          if (taskCheckbox) taskCheckbox.checked = false;
          if (tasksField) { tasksField.value = ""; enableAutoBullet(tasksField); }
          if (passosField) { passosField.value = ""; enableAutoBullet(passosField); }
          if (resultadoField) { resultadoField.value = ""; enableAutoBullet(resultadoField); }
        }
      };
    }

    // *** NOVO: Listener para o Snippet "Fechamento ECW4" ***
    const quickFillECW4Checkbox = document.getElementById('quickfill-ecw4-close');
    if (quickFillECW4Checkbox) {
      quickFillECW4Checkbox.onchange = (e) => {
        const isChecked = e.target.checked;
        
        // 1. Auto-check the correct task
        const taskCheckbox = document.querySelector('#step-2-tasks input[value="ads_enhanced_conversions"]');
        if (taskCheckbox) {
            taskCheckbox.checked = isChecked;
        }

        // 2. Fill the form fields
        const tasksField = document.getElementById('field-TASKS_SOLICITADAS');
        const passosField = document.getElementById('field-PASSOS_EXECUTADOS');
        const resultadoField = document.getElementById('field-RESULTADO');

        if (isChecked) {
          if (tasksField) tasksField.value = "• Acompanhamento da conversão otimizada (ECW4) após 7 dias.";
          if (passosField) passosField.value = "• Após o período de 7 dias de acompanhamento, verifiquei o painel do Ads.\n• A conversão está sendo registrada corretamente.";
          if (resultadoField) resultadoField.value = "• Valido o bom funcionamento da conversão otimizada.\n• Assim, fecho o caso.";
        } else {
          // Clear fields
          if (taskCheckbox) taskCheckbox.checked = false;
          if (tasksField) { tasksField.value = ""; enableAutoBullet(tasksField); }
          if (passosField) { passosField.value = ""; enableAutoBullet(passosField); }
          if (resultadoField) { resultadoField.value = ""; enableAutoBullet(resultadoField); }
        }
      };
    }

    step3Div.style.display = 'block';
    buttonContainer.style.display = 'flex';
  };

  // --- Função central para gerar o HTML ---
  function generateOutputHtml() {
    const selectedSubStatusKey = subStatusSelect.value;
    if (!selectedSubStatusKey) return null;

    const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
    let outputText = templateData.template;
    
    const ulStyle = "style=\"margin-bottom: 12px; padding-left: 30px;\"";

    // 3.1: Processa campos automáticos (Tasks e Screenshots)
    if (templateData.requiresTasks) {
      const selectedCheckboxes = taskCheckboxesContainer.querySelectorAll('input[type="checkbox"]:checked');
      let tagNames = [];
      let screenshotsText = '';

      selectedCheckboxes.forEach(checkbox => {
        const taskKey = checkbox.value;
        const task = TASKS_DB[taskKey];
        tagNames.push(task.name);
        screenshotsText += `<b>${task.name}</b>`;
        const screenItems = task.screenshots.map(print => `<li>${print} - </li>`).join('');
        screenshotsText += `<ul ${ulStyle}>${screenItems}</ul>`;
      });
      outputText = outputText.replace(/{TAGS_IMPLEMENTED}/g, tagNames.join(', ') || 'N/A');
      outputText = outputText.replace(/{SCREENSHOTS_LIST}/g, screenshotsText ? `<br>${screenshotsText}` : 'N/A');
    }

    // 3.2: Processa campos manuais (Formulário)
    const inputs = dynamicFormFieldsContainer.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      const fieldName = input.id.replace('field-', '');
      const placeholder = new RegExp(`{${fieldName}}`, 'g');
      let value = input.value;
      
      if (textareaListFields.includes(fieldName) && value.trim() !== '') {
          const lines = value.split('\n')
                           .map(line => line.trim())
                           .filter(line => line !== '' && line !== '•')
                           .map(line => line.startsWith('• ') ? line.substring(2) : line)
                           .map(line => `<li>${line.trim()}</li>`)
                           .join('');
          value = `<br><ul ${ulStyle}>${lines}</ul>`;
      } else if (textareaParagraphFields.includes(fieldName) && value.trim() !== '') {
          value = '<br>' + value.split('\n')
                       .filter(line => line.trim() !== '')
                       .map(line => `<p style="margin: 0 0 8px 0;">${line}</p>`)
                       .join('');
      } else if (input.tagName === 'TEXTAREA') {
          value = '';
      } else if (fieldName === 'ON_CALL' && value.trim() === '') {
          // *** NOVO: Default "N/A" para ON_CALL ***
          value = 'N/A';
      }
      
      const safeValue = (value || '').replace(/\$/g, '$$$$');
      outputText = outputText.replace(placeholder, safeValue);
    });
    
    // 3.3: Remove placeholders restantes
    outputText = outputText.replace(/{([A-Z_]+)}/g, '');

    // 3.4: Converte \n do *template* para <br>
    return outputText.replace(/\n/g, "<br>");
  }

  // --- EVENTO 3.A: Clique em "Copiar" ---
  copyButton.onclick = () => {
      const htmlOutput = generateOutputHtml();
      if (htmlOutput) {
          copyHtmlToClipboard(htmlOutput);
      } else {
          showToast("Nenhum substatus selecionado", { error: true });
      }
  };

  // --- EVENTO 3.B: Clique em "Preencher" ---
  generateButton.onclick = () => {
    const htmlOutput = generateOutputHtml();
    if (!htmlOutput) {
      showToast("Nenhum substatus selecionado", { error: true });
      return;
    }
    const campo = document.querySelector('div[contenteditable="true"]');
    if (campo) {
      campo.focus();
      if (campo.innerHTML.trim() !== '' && !campo.innerHTML.endsWith('<br><br>')) {
          document.execCommand('insertHTML', false, '<br><br>');
      }
      document.execCommand('insertHTML', false, htmlOutput);
      campo.dispatchEvent(new Event("input", { bubbles: true }));
      showToast("Texto inserido com sucesso");
      togglePopup(false);
      resetSteps(2);
      mainStatusSelect.value = "";
      subStatusSelect.innerHTML = '<option value="">-- Selecione o Status --</option>';
      subStatusSelect.disabled = true;
    } else {
      showToast("Campo de edição [contenteditable] não encontrado", { error: true });
    }
  };

  // ---------- CONTROLES DO POPUP ----------
  function togglePopup(show) {
    if (show) {
      popup.style.opacity = "1";
      popup.style.pointerEvents = "auto";
      popup.style.transform = "scale(1)";
    } else {
      popup.style.opacity = "0";
      popup.style.pointerEvents = "none";
      popup.style.transform = "scale(0.95)";
    }
  }

  let visible = false;
  btn.onclick = () => {
    visible = !visible;
    togglePopup(visible);
  };
})();
