(function () {

  const fontId = "poppins-google-font";
  if (!document.getElementById(fontId)) {
    const link = document.createElement("link");
    link.id = fontId;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }

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
Durante a consultoria <b>avançamos até a seguinte etapa:</b> ...
<b>Não conseguimos concluir a implementação</b>, pois ...
Portanto, <b>aguardo o anunciante</b> concluir a seguinte tarefa: ...
Após a conclusão, irei enviar o email com as datas de reagendamento mais próximas para concluir a implementação.

Obs.: Inicio hoje o processo de <b>2/6</b>.

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

<b>OnCall Comments:</b> Criamos a Tag de conversão otimizada de (formulário ou compra), enviando dados do usuário (manualmente/automaticamente). Fizemos todos os testes e validamos o funcionamento do envio dos dados, e a conversão enviada com sucesso. Agora seguirei com o acompanhamento de 7 dias para validar a mudança de status do Ads.

<b>Tag Implemented:</b> Ads Enhanced Conversions

<b>Screenshots:</b>
Termos aceitos no Ads -
Tag implementada -
Teste GTM -
Teste Ads -
Versão Publicada -
Painel do Ads (após 7 dias)

<b>Multiple CIDs:</b>`,

    texto6: `<b>Speakeasy ID:</b>

<b>On Call (Call Started) signaled on time?</b>

<b>Substatus:</b> SO - Implementation Only

<b>Reason/comments:</b>
Task implementada com sucesso

<b>OnCall Comments:</b><br>O anunciante solicitou a criação de uma conversão para (task). Fizemos a criação da conversão no Ads, e da Tag no GTM usando acionadores com base em (tipo de acionador). Realizamos os testes e validamos o funcionamento. Sendo assim, fecho o caso sem acompanhamento.

<b>Task:</b> Ads Conversion Tracking

<b>Tag Implemented:</b>

<b>Screenshots:</b>
Tag criada -
Teste GTM -
Teste Ads -
Versão Publicada -
Status Ads -

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
O anunciante tinha dúvidas sobre ....
Expliquei detalhadamente sobre o funcionamento de ....
(Caso tenha feito alguma alteração)
Aproveitando a consultoria verifiquei que ....
Portanto ajustamos a configuração que estava incorreta.

<b>Tag Implemented:</b> N/A

<b>Screenshots:</b> N/A

<b>Multiple CIDs:</b> N/A`,

    texto9: `<b>Speakeasy ID:</b>

<b>On Call (Call Started) signaled on time?</b>

<b>Substatus:</b> AS Reschedule 1

<b>Reason/comments:</b> Caso reagendado.

<b>OnCall Comments:</b>
O caso precisou ser reagendado, pois ...

Data de reagendamento:

<b>Tag Implemented:</b> N/A

<b>Screenshots:</b> N/A

<b>Multiple CIDs:</b> N/A`
  };

  const antigo = document.getElementById("autofill-popup");
  if (antigo) antigo.remove();
  if (!document.body) return;

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

  // ---------- LOGO ----------
  const logo = document.createElement("img");
  logo.src = "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg";
  Object.assign(logo.style, {
    width: "92px",
    height: "auto",
    marginBottom: "12px"
  });
  popup.appendChild(logo);

  // ---------- TÍTULO ----------
  const title = document.createElement("div");
  title.textContent = "Case Notes Assistant";
  Object.assign(title.style, {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#202124"
  });
  popup.appendChild(title);

  // ---------- SELECT ----------
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

  // ---------- BOTÃO ----------
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
      alert("Selecione uma opção válida!");
      return;
    }
    const campo = document.querySelector('div[contenteditable="true"]');
    if (campo) {
      campo.innerHTML += (campo.innerHTML ? "<br><br>" : "") +
                         textos[opcao].replace(/\n/g, "<br>");
      campo.dispatchEvent(new Event("input", { bubbles: true }));
      popup.remove();
    } else {
      alert('Campo div[contenteditable="true"] não encontrado!');
    }
  };
  popup.appendChild(button);

  document.body.appendChild(popup);
})();
