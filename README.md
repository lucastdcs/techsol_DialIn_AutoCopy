

# Assistente de Produtividade - Projeto Cognizant em nome do Google - TechSolutions

[](https://www.google.com/search?q=https://github.com/lucastdcs/techsol_DialIn_AutoCopy/actions)
[](https://www.google.com/search?q=https://github.com/lucastdcs/techsol_DialIn_AutoCopy/commits/main)
[](https://github.com/lucastdcs/techsol_DialIn_AutoCopy)

Um conjunto de ferramentas (via *bookmarklet*) para automatizar e padronizar o preenchimento de notas de caso e scripts de chamada, aumentando a produtividade e a consistência.

Este projeto injeta dois assistentes flutuantes e arrastáveis em qualquer página:

1.  **✎ Case Notes Assistant (Assistente de Notas de Caso)**
2.  **📋 Call Script Assistant (Assistente de Script de Chamada)**

-----

## ✨ Funcionalidades Principais

### ✎ Assistente de Notas de Caso (v2.7.1)

Este módulo foca em gerar notas de caso complexas em HTML rico com o mínimo de esforço.

  * **Formulários Dinâmicos:** A interface muda com base no Status (`SO`, `NI`, `IN`, `AS`) e Substatus selecionado.
  * **Cenários Comuns:** Preenchimento automático para cenários recorrentes, como:
      * `NI`: Início de 2/6, Falta de acesso ao CMS, Follow-up.
      * `SO`: Implementação de WhatsApp, Formulário Padrão, Fechamento de ECW4.
      * `IN`: NRP Padrão (3 tentativas), No-Show, Finalização 2/6.
  * **Gerador de HTML:** Converte automaticamente listas de *bullet points* (`•`) em listas `<ul><li>` formatadas.
  * **Cópia Inteligente:** O botão "Preencher" tenta injetar o HTML diretamente no campo `contenteditable` da página. Se não encontrar o campo, ele **copia automaticamente** o HTML para a sua área de transferência, evitando a perda de trabalho.
  * **Modo Conforto:** Um botão `↔` que expande o pop-up horizontalmente para o dobro do tamanho, facilitando a digitação de textos longos.

### 📋 Assistente de Script de Chamada (v1.2.7)

Este módulo fornece um checklist interativo para garantir a conformidade e a qualidade durante as chamadas.

  * **Checklist Interativo:** Marque os itens (`Início` e `Fim`) e obtenha feedback visual imediato.
  * **Animações:** Feedback visual suave ao passar o mouse e ao completar itens.
  * **Multi-Suporte:**
      * **Idiomas:** PT, ES, EN.
      * **Tipo de Caso:** BAU e LT.
  * **Status de Grupo:** O título do grupo (ex: "Início") fica verde quando todos os seus itens são concluídos.

-----

## 🚀 Como Instalar e Usar (Produção)

Este é o guia para usuários finais.

### 1\. Instalação (Apenas uma vez)

1.  No seu navegador (Chrome, Edge, etc.), crie um novo Favorito.
2.  No campo **Nome**, digite algo fácil de lembrar, como `[Assistente TechSol]`.
3.  No campo **URL**, copie e cole o código abaixo:

<!-- end list -->

```javascript
javascript:(function(){
    const cacheBuster = '?t=' + new Date().getTime();
    const scriptUrl = 'https://lucastdcs.github.io/techsol_DialIn_AutoCopy/bundle.js' + cacheBuster;
    
    const policy = trustedTypes.createPolicy('default', { 
        createHTML: (string) => string, 
        createScriptURL: string => string, 
        createScript: string => string, 
    });

    const oldScript = document.getElementById('techsol-app-bundle');
    if(oldScript) oldScript.remove();
    
    const script = document.createElement('script');
    script.id = 'techsol-app-bundle';
    script.src = policy.createScriptURL(scriptUrl);
    document.body.appendChild(script);
})();
```

### 2\. Como Usar

1.  Esteja na página da ferramenta de trabalho (o CRM onde você escreve as notas).
2.  Clique no favorito `[Assistente TechSol]` que você acabou de criar.
3.  Os dois ícones flutuantes (✎ e 📋) aparecerão no canto da tela.

-----

## ⚙️ Arquitetura Técnica (Como Funciona)

Este projeto é um *bookmarklet* moderno que carrega módulos JavaScript (ESM) de forma dinâmica.

1.  **Código-Fonte:** O código é totalmente modularizado em arquivos (`notes-assistant.js`, `utils.js`, etc.) para facilitar a manutenção.
2.  **Build (Empacotamento):** Uma **GitHub Action** (`.github/workflows/deploy.yml`) é disparada a cada `push` no branch `main`.
3.  **Bundler:** A Action usa `esbuild` (um empacotador de JS) para ler o `app.js`, seguir todos os `imports` e combinar tudo em um único arquivo otimizado: `dist/bundle.js`.
4.  **Deploy:** A Action automaticamente faz o "push" desse `bundle.js` para o branch `gh-pages`.
5.  **Hospedagem:** O **GitHub Pages** serve o `bundle.js` desse branch (quase instantaneamente) no link: `https://lucastdcs.github.io/techsol_DialIn_AutoCopy/bundle.js`.
6.  **Bookmarklet:** O bookmarklet de produção (acima) simplesmente baixa e executa esse `bundle.js`.

Esse fluxo garante que as atualizações sejam enviadas aos usuários em \~1-2 minutos após um push, sem que eles precisem alterar o bookmarklet.

-----

## 📚 Como Desenvolver e Testar (Ambiente de DEV)

Para evitar ter que esperar a GitHub Action rodar a cada alteração, use um ambiente de desenvolvimento (Replit ou Local).

### 1\. Ambiente de Teste (Recomendado: Replit)

1.  Crie um novo "Static Site" no **Replit.com**.
2.  Faça o upload de todos os 5 arquivos `.js` do repositório (`app.js`, `utils.js`, `notes-data.js`, `notes-assistant.js`, `call-script.js`).
3.  Clique em "Run" e copie a URL do seu "Webview" (ex: `https://meu-projeto.lucas.repl.co/`).
4.  Use o **Bookmarklet de Teste (Import Map)** abaixo, substituindo a `baseUrl` pela sua URL do Replit.

### 2\. Bookmarklet de Teste (Import Map)

Este bookmarklet é **diferente** do de produção. Ele usa um "Import Map" para carregar os arquivos separadamente, permitindo testes instantâneos.

```javascript
javascript:(function(){
    const cacheBuster = '?t=' + new Date().getTime();
    
    /* Troque pela sua URL de teste (Replit ou localhost). 
      Certifique-se de que termina com /
    */
    const baseUrl = 'https://techsol-bookmarklet-dev.lucastdcs.repl.co/';
    
    const policy = trustedTypes.createPolicy('default', { 
        createHTML: (string) => string, 
        createScriptURL: string => string, 
        createScript: string => string, 
    });

    // 1. Injeta o Mapa de Importação
    const oldMap = document.getElementById('techsol-importmap');
    if (oldMap) oldMap.remove();
    const importMap = document.createElement('script');
    importMap.type = 'importmap';
    importMap.id = 'techsol-importmap';
    importMap.textContent = JSON.stringify({
        "imports": {
            "utils": baseUrl + "utils.js" + cacheBuster,
            "notes-data": baseUrl + "notes-data.js" + cacheBuster,
            "notes-assistant": baseUrl + "notes-assistant.js" + cacheBuster,
            "call-script": baseUrl + "call-script.js" + cacheBuster
        }
    });
    document.head.appendChild(importMap);

    // 2. Carrega o app.js, que vai usar o mapa
    const oldScript = document.getElementById('techsol-app');
    if(oldScript) oldScript.remove();
    
    const script = document.createElement('script');
    script.id = 'techsol-app';
    script.type = 'module';
    script.src = policy.createScriptURL(baseUrl + 'app.js' + cacheBuster);
    document.body.appendChild(script);
})();
```

> **Nota:** Os arquivos no repositório (`app.js`, `notes-assistant.js`, etc.) **devem** usar caminhos relativos (ex: `import './utils.js'`) para que o "robô" (`esbuild`) funcione. O "Import Map" no bookmarklet de teste acima irá falhar se os arquivos não forem alterados para usar nomes curtos (ex: `import 'utils'`). Para o fluxo de trabalho atual, o teste local com o `bundle.js` (após rodar a Action) é o mais confiável.

-----

### 🤝 Autor

Criado e mantido por **lucaste@**
