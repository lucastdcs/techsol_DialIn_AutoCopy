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

  const textos = {
    texto1: `<b>Speakeasy ID:</b> ...`,
    texto2: `...`, texto3: `...`, texto4: `...`,
    texto5: `...`, texto6: `...`,
    texto7: `...`, texto8: `...`, texto9: `...`
  };

  // --------- Função Toast ---------
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

  // --------- Popup principal ---------
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
    textAlign: "center",
    cursor: "grab",            // indica que é arrastável
    transition: "transform .2s ease"
  });

  // --------- Drag & Drop ---------
  let offsetX, offsetY, dragging = false;
  popup.addEventListener("mousedown", startDrag);
  popup.addEventListener("touchstart", startDrag, { passive: true });

  function startDrag(e) {
    dragging = true;
    popup.style.cursor = "grabbing";
    const evt = e.touches ? e.touches[0] : e;
    const rect = popup.getBoundingClientRect();
    offsetX = evt.clientX - rect.left;
    offsetY = evt.clientY - rect.top;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", stopDrag);
  }

  function drag(e) {
    if (!dragging) return;
    const evt = e.touches ? e.touches[0] : e;
    popup.style.left = evt.clientX - offsetX + "px";
    popup.style.top  = evt.clientY - offsetY + "px";
    popup.style.right = "auto"; // remove fixo
  }

  function stopDrag() {
    dragging = false;
    popup.style.cursor = "grab";
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", stopDrag);
  }

  // --------- Logo (Material Icon) ---------
  const logo = document.createElement("img");
  logo.src = "https://fonts.gstatic.com/s/i/materialiconsoutlined/description/v13/24px.svg";
  Object.assign(logo.style, {
    width: "40px",
    height: "40px",
    marginBottom: "8px",
    opacity: "0.9"
  });
  popup.appendChild(logo);

  // --------- Título ---------
  const title = document.createElement("div");
  title.textContent = "Case Notes Assistant";
  Object.assign(title.style, {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#3c4043" // Blue Gray 700
  });
  popup.appendChild(title);

  // --------- Botão Fechar (X) ---------
  const closeBtn = document.createElement("div");
  closeBtn.textContent = "✕";
  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "8px",
    right: "10px",
    fontSize: "18px",
    color: "#5f6368",
    cursor: "pointer",
    transition: "transform .2s ease, opacity .2s ease"
  });
  closeBtn.onmouseenter = () => {
    closeBtn.style.transform = "scale(1.2)";
    closeBtn.style.opacity = "0.7";
  };
  closeBtn.onmouseleave = () => {
    closeBtn.style.transform = "scale(1)";
    closeBtn.style.opacity = "1";
  };
  closeBtn.onclick = () => {
    popup.style.opacity = "0";
    popup.style.transform = "scale(0.95)";
    setTimeout(() => popup.remove(), 200);
  };
  popup.appendChild(closeBtn);

  // --------- Select ---------
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

  // --------- Botão Preencher ---------
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
