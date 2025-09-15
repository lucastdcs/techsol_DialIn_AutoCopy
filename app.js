(function () {

  // --------- Carrega a fonte Poppins ---------
  const fontId = "poppins-google-font";
  if (!document.getElementById(fontId)) {
    const link = document.createElement("link");
    link.id = fontId;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }

  // --------- Textos pré-definidos ---------
  const textos = {
    texto1: `<b>Speakeasy ID:</b> ...`,
    // (mantenha aqui todos os textos já existentes – não alterei o conteúdo)
    texto2: `...`,
    texto3: `...`,
    texto4: `...`,
    texto5: `...`,
    texto6: `...`,
    texto7: `...`,
    texto8: `...`,
    texto9: `...`
  };

  // --------- Função Toast Material ---------
  function showToast(message, opts = {}) {
    const toast = document.createElement("div");
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");

    Object.assign(toast.style, {
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%) translateY(20px)",
      background: opts.error ? "#d93025" : "#323232",
      color: "#fff",
      padding: "14px 24px",
      borderRadius: "4px",
      boxShadow: "0 2px 8px rgba(0,0,0,.3)",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "14px",
      lineHeight: "20px",
      zIndex: "999999",
      opacity: "0",
      transition: "opacity .3s ease, transform .3s ease"
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

  // --------- Remove popup anterior ---------
  const antigo = document.getElementById("autofill-popup");
  if (antigo) antigo.remove();
  if (!document.body) return;

  // --------- Popup principal (seleção) ---------
  const popup = document.createElement("div");
  popup.id = "autofill-popup";
  Object.assign(popup.style, {
    position: "fixed",
    top: "24px",
    right: "24px",
    padding: "16px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,.2)",
    fontFamily: "'Poppins', sans-serif",
    zIndex: "999999",
    minWidth: "260px",
    textAlign: "center"
  });

  const logo = document.createElement("img");
  logo.src = "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg";
  Object.assign(logo.style, {
    width: "92px",
    height: "auto",
    marginBottom: "12px"
  });
  popup.appendChild(logo);

  const title = document.createElement("div");
  title.textContent = "Case Notes Assistant";
  Object.assign(title.style, {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#202124"
  });
  popup.appendChild(title);

  const select = document.createElement("select");
  select.innerHTML = `
    <option value="">Selecione...</option>
    <option value="texto1">Vazio</option>
    <option value="texto9">AS - Reschedule 1</option>
    <option value="texto2">IN - Not Reachable (NRP)</option>
    <option value="texto7">IN - Not Reachable (2/6)</option>
    <option value="texto3">NI - Awaiting Inputs</option>
    <option value="texto4">NI - Awaiting Inputs (2/6)</option>
    <option value="texto5">NI - Awaiting Validations (ECW4)</option>
    <option value="texto6">SO - Implementation Only (ACT)</option>
    <option value="texto8">SO - Education Only</option>`;
  Object.assign(select.style, {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #dadce0",
    fontSize: "14px",
    marginBottom: "16px",
    background: "#fff",
    color: "#202124",
    outline: "none",
    fontFamily: "'Poppins', sans-serif"
  });
  popup.appendChild(select);

  const button = document.createElement("button");
  button.textContent = "Preencher";
  Object.assign(button.style, {
    width: "100%",
    padding: "10px 0",
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color .2s",
    fontFamily: "'Poppins', sans-serif"
  });
  button.onmouseover = () => (button.style.backgroundColor = "#1765c0");
  button.onmouseout  = () => (button.style.backgroundColor = "#1a73e8");

  // ---- Clique do botão com Toast ----
  button.onclick = () => {
    const opcao = select.value;
    if (!opcao || !textos[opcao]) {
      showToast("Selecione uma opção válida", { error: true });
      return;
    }
    const campo = document.querySelector('div[contenteditable="true"]');
    if (campo) {
      campo.innerHTML += (campo.innerHTML ? "<br><br>" : "") +
                         textos[opcao].replace(/\n/g, "<br>");
      campo.dispatchEvent(new Event("input", { bubbles: true }));
      showToast("Texto inserido com sucesso");
      popup.remove();
    } else {
      showToast("Campo de edição não encontrado", { error: true });
    }
  };
  popup.appendChild(button);

  document.body.appendChild(popup);
})();
