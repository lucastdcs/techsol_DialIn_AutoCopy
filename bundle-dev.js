// ---------------------------------------------------------------------------
// SHIM DE COMPATIBILIDADE — este repositório foi renomeado para `case-wizard`.
//
// O código real vive em https://github.com/lucastdcs/case-wizard
//
// Este repositório existe só para manter viva a URL antiga do GitHub Pages.
// O GitHub redireciona a URL de um repositório renomeado para sempre, mas NÃO
// redireciona o site do Pages: sem este arquivo, todo bookmarklet salvo antes
// do rename viraria um 404 silencioso — o <script> injetado não carrega e nada
// acontece na tela, o pior modo de falha possível para quem dá suporte.
//
// NÃO APAGUE este repositório enquanto houver bookmarklets antigos em
// circulação. Ele também ocupa o nome antigo, o que impede que outra pessoa o
// reivindique e quebre o redirect do repositório renomeado.
//
// Nota sobre Trusted Types: este shim NÃO cria a policy 'default'. O
// bookmarklet de produção já a criou antes deste script rodar, e criar uma
// policy chamada 'default' duas vezes lança erro. Como ela já existe, a
// atribuição simples de `s.src` abaixo passa por ela.
// ---------------------------------------------------------------------------
(function () {
    var s = document.createElement('script');
    s.src = 'https://lucastdcs.github.io/case-wizard/bundle-dev.js?t=' + Date.now();
    s.onerror = function () {
        console.error('[Case Wizard] shim: falha ao carregar o bundle no endereço novo.');
    };
    document.body.appendChild(s);
})();
