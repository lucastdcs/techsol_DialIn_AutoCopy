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

  // --------- Textos ---------
 const textos = {
    texto1: `<b>Speakeasy ID:</b>

<b>On Call (Call Started) signaled on time?</b>

<b>Substatus:</b>

<b>Reason/comments:</b>

<b>OnCall Comments:</b>

<b>Tag Implemented:</b>

<b>Screenshots:</b>

<b>Multiple CIDs:</b>`,
    texto2: `<b>Speakeasy ID:</b>

<b>On Call (Call Started) signaled on time?</b>

<b>Substatus:</b> IN - Not Reachable

<b>Reason/comments:</b> NRP

<b>OnCall Comments:</b>

<b>Tag Implemented:</b>

<b>Screenshots:</b>
Tentativa 1 -
Tentativa 2 -
Tentativa 3 -

<b>Multiple CIDs:</b>`,
    texto3: `<b>Speakeasy ID:</b>

<b>On Call (Call Started) signaled on time?</b>

<b>Substatus:</b> NI - Awaiting Inputs

<b>Reason/comments:</b> Aguardando informações por parte do anunciante para concluir a implementação

<b>OnCall Comments:</b>
<b>Tasks solicitadas:</b>
<br>• (task 1)
<br>• (task 2)
<br>
<br><b>Avançamos até a seguinte etapa:</b>
<br>• (descrever o que foi feito)
<br>
<br><b>Impedimento (Não concluímos pois):</b>
<br>• (descrever o bloqueio)
<br>
<br><b>Próximos passos (Aguardando anunciante):</b>
<br>• (descrever a ação necessária do anunciante)
<br>
<br>Obs.: Inicio hoje o processo de <b>2/6</b>.

<b>Tag Implemented:</b> N/A

<b>Screenshots:</b>

<b>Multiple CIDs:</b> N/A`,
    texto4: `<b>Speakeasy ID:</b> N/A

<b>On Call (Call Started) signaled on time?</b> N/A

<b>Substatus:</b> NI - Awaiting Inputs

<b>Reason/comments:</b> Aguardando informações por parte do anunciante para concluir a implementação (2/6)

<b>OnCall Comments:</b>
No dia (dia) do 2/6 fiz duas tentativas de contatos seguidas, mas não obtive resposta. Envio na sequência o email referente ao dia respectivo.

<b>Tag Implemented:</b> N/A

<b>Screenshots:</b>
Tentativa 1 -
Tentativa 2 -

<b>Multiple CIDs:</b>`,
    texto5: `<b>Speakeasy ID:</b>

<b>On Call (Call Started) signaled on time?</b>

<b>Substatus:</b> NI - Awaiting Validations (ECW4)

<b>Reason/comments:</b> Aguardando Validações no Google Ads

<b>OnCall Comments:</b>
<b>Tasks solicitadas pelo AM:</b>
<br>• (task 1)
<br>• (task 2)
<br>
<br><b>Tasks implementadas na call:</b>
<br>• (task A)
<br>• (task B)
<br>
<br><b>Seguimos com os passos:</b>
<br>• (ex: Criamos a conta e instalamos o GTM. Configuramos o Vinculador de Conversões.)
<br>• (ex: Criamos a Tag de conversão otimizada de [formulário/compra], enviando dados do usuário [manualmente/automaticamente].)
<br>• (ex: Fizemos todos os testes e validamos o funcionamento do envio dos dados, e a conversão enviada com sucesso.)
<br>
<br><b>Próximos passos (Acompanhamento):</b>
<br>• Seguirei com o acompanhamento de 7 dias para validar a mudança de status do Ads da conversão otimizada.
<br>
<br><b>Considerações adicionais:</b>
<br>• (opcional: ex: tempo de call, perfil do cliente, etc.)
<br>
<br><b>Obs.:</b> (opcional: ex: caso BAU aberto para tasks pendentes)

<b>Tag Implemented:</b> (ex: Ads Enhanced Conversions, GTM Installation, Ads Conversion Tracking)

<b>Screenshots:</b>
<br><b>[Nome da Tag 1, ex: Ads Enhanced Conversions]</b>
<br>Termos aceitos no Ads -
<br>Tag implementada -
<br>Teste GTM -
<br>Teste Ads -
<br>Versão Publicada -
<br>Painel do Ads (após 7 dias) -
<br>
<br><b>[Nome da Tag 2, ex: Ads Conversion Tracking]</b>
<br>Tag implementada -
<br>Teste GTM -
<br>Teste Ads -
<br>Versão Publicada -
<br>Painel do Ads -
<br>
<br><b>[Nome da Tag 3, ex: GTM Installation]</b>
<br>GTM Instalado -
<br>Vinculador de conversões -

<b>Multiple CIDs:</b>`,
    texto6: `<b>Speakeasy ID:</b>

<b>On Call (Call Started) signaled on time?</b>

<b>Substatus:</b> SO - Implementation Only

<b>Reason/comments:</b>
Task implementada com sucesso

<b>OnCall Comments:</b>
<br><b>Task solicitada:</b>
<br>• (descrever a task, ex: criação de conversão para [objetivo])
<br>
<br><b>Seguimos com os passos:</b>
<br>• Fizemos a criação da conversão no Ads.
<br>• Implementamos a Tag no GTM usando acionadores com base em (tipo de acionador).
<br>• Realizamos os testes e validamos o funcionamento.
<br>
<br><b>Resultado:</b>
<br>• Task implementada com sucesso. Fechando o caso sem acompanhamento.

<b>Tag Implemented:</b> (ex: Ads Conversion Tracking)

<b>Screenshots:</b>
<br><b>[Nome da Tag, ex: Ads Conversion Tracking]</b>
<br>Tag criada -
<br>Teste GTM -
<br>Teste Ads -
<br>Versão Publicada -
<br>Status Ads -

<b>Multiple CIDs:</b>`,
    texto7: `<b>Speakeasy ID:</b> N/A

<b>On Call (Call Started) signaled on time?</b> N/A

<b>Substatus:</b> IN - Not Reachable

<b>Reason/comments:</b> Anunciante não retornou e não concluiu a implementação.

<b>OnCall Comments:</b>
Após o acompanhamento do 2/6, e o anunciante não ter respondido à nenhuma das tentativas de contato - tanto por telefone, como por email - e não termos conseguido concluir a implementação, o caso será inativado.

<b>Tag Implemented:</b> N/A

<b>Screenshots:</b> N/A

<b>Multiple CIDs:</b> N/A`,
    texto8: `<b>Speakeasy ID:</b> 

<b>On Call (Call Started) signaled on time?</b> 

<b>Substatus:</b> SO - Education Only

<b>Reason/comments:</b> Consultoria utilizada para tirar dúvidas do anunciante.

<b>OnCall Comments:</b>
<b>Dúvidas do anunciante:</b>
<br>• (dúvida 1)
<br>• (dúvida 2)
<br>
<br><b>Resoluções/Explicações:</b>
<br>• Expliquei detalhadamente sobre o funcionamento de (tópico 1).
<br>• Esclareci (tópico 2).
<br>
<br><b>Ajustes realizados (se houver):</b>
<br>• (opcional: ex: Aproveitando a consultoria, verifiquei que [problema] e ajustamos a configuração [descrever ajuste].)

<b>Tag Implemented:</b> N/A

<b>Screenshots:</b> N/A

<b>Multiple CIDs:</b> N/A`,
    texto9: `<b>Speakeasy ID:</b> 

<b>On Call (Call Started) signaled on time?</b> 

<b>Substatus:</b> AS - Reschedule 1

<b>Reason/comments:</b> Caso Reagendado.

<b>OnCall Comments:</b>
Precisamos readgendar o caso, já que ...

Data do reagendamento:
<b>Tag Implemented:</b> N/A

<b>Screenshots:</b> N/A

<b>Multiple CIDs:</b> N/A`,
};

  // --------- Cria botão flutuante ---------
  const btn = document.createElement("button");
  btn.id = "autofill-floating-btn";
  btn.textContent = "✎";
  Object.assign(btn.style, {
    position: "fixed",
    top: "60%",
    right: "20px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "none",
    background: "#1a73e8",
    color: "#fff",
    fontSize: "22px",
    fontWeight: "500",
    boxShadow: "0 4px 10px rgba(0,0,0,.3)",
    cursor: "pointer",
    zIndex: "999999",
    transition: "background .2s, transform .2s"
  });
  btn.onmouseenter = () => (btn.style.background = "#1765c0");
  btn.onmouseleave = () => (btn.style.background = "#1a73e8");
  document.body.appendChild(btn);

  // --------- Popup (inicialmente oculto) ---------
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
    cursor: "grab",
    transition: "opacity .3s ease, transform .3s ease",
    opacity: "0",
    pointerEvents: "none",
    transform: "scale(0.95)"
  });

  // ---------- Header ----------
  const header = document.createElement("div");
  Object.assign(header.style, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "16px"
  });

  const logo = document.createElement("img");
  logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
  Object.assign(logo.style, { width: "24px", height: "24px" });
  const title = document.createElement("div");
  title.textContent = "Case Notes Assistant";
  Object.assign(title.style, {
    fontSize: "16px",
    fontWeight: "600",
    color: "#202124"
  });
  header.appendChild(logo);
  header.appendChild(title);
  popup.appendChild(header);

  // ---------- Fechar ----------
  const closeBtn = document.createElement("div");
  closeBtn.textContent = "✕";
  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "8px",
    right: "10px",
    fontSize: "18px",
    color: "#5f6368",
    cursor: "pointer"
  });
  closeBtn.onclick = () => togglePopup(false);
  popup.appendChild(closeBtn);

  // ---------- Select ----------
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
    outline: "none"
  });
  popup.appendChild(select);

  // ---------- Botão Preencher ----------
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
    cursor: "pointer"
  });
  button.onmouseover = () => (button.style.backgroundColor = "#1765c0");
  button.onmouseout = () => (button.style.backgroundColor = "#1a73e8");
  button.onclick = () => {
    const opcao = select.value;
    if (!opcao || !textos[opcao]) {
      showToast("Selecione uma opção válida", { error: true });
      return;
    }
    const campo = document.querySelector('div[contenteditable="true"]');
    if (campo) {
      campo.innerHTML += (campo.innerHTML ? "<br><br>" : "") + textos[opcao].replace(/\n/g, "<br>");
      campo.dispatchEvent(new Event("input", { bubbles: true }));
      showToast("Texto inserido com sucesso");
      togglePopup(false);
    } else {
      showToast("Campo de edição não encontrado", { error: true });
    }
  };
  popup.appendChild(button);
  document.body.appendChild(popup);

  // ---------- Toggle popup ----------
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

  // ---------- Clique botão abre/fecha ----------
  let visible = false;
  btn.onclick = () => {
    visible = !visible;
    togglePopup(visible);
  };
})();
