(function () {
  const joinBtn = [...document.querySelectorAll('button, div[role="button"]')]
    .find(el => /join.*phone.*audio/i.test(el.textContent));

  if (joinBtn) {
    joinBtn.click();
  } else {
    console.warn('Botão "Join and use phone for audio" não encontrado.');
    return;
  }

  setTimeout(() => {
    const dialInBtn = [...document.querySelectorAll('button, div[role="button"]')]
      .find(el => /dial.*in/i.test(el.textContent));

    if (dialInBtn) {
      dialInBtn.click();
    } else {
      console.warn('Botão "Dial In" não encontrado.');
      return;
    }

    setTimeout(() => {
      const phoneText = document.body.innerText.match(/\+\d[\d\s()-]+/);

      if (phoneText) {
        navigator.clipboard.writeText(phoneText[0])
          .then(() => alert("Número copiado: " + phoneText[0]))
          .catch(() => alert("Falha ao copiar. Número: " + phoneText[0]));
      } else {
        alert("Não encontrei nenhum telefone na página.");
      }
    }, 1500);
  }, 1000);
})();
