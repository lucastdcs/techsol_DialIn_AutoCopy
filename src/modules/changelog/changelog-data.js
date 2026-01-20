// src/modules/changelog/changelog-data.js

export const RELEASE_NOTES = {
    // A versão DEVE bater com a constante CURRENT_VERSION do seu app.js
    version: "v4.5", 
    
    title: "Novidades da Versão 4.5 🎉",
    
    // Slides do carrossel (mesma estrutura do tutorial)
    slides: [
        {
            icon: "🎨",
            title: "Novo Visual HD",
            text: "Refizemos toda a interface com design 'Glassmorphism' (estilo Apple) e modo escuro inteligente para melhor leitura."
        },
        {
            icon: "🗂️",
            title: "Menu Lateral & Histórico",
            text: "A Central de Links agora possui um menu lateral fixo para navegação rápida e uma seção 'Recentes' que lembra o que você usou."
        },
        {
            icon: "⚡",
            title: "Performance",
            text: "O carregamento está 30% mais rápido e a busca de links agora é instantânea."
        },
        {
            icon: "🤝",
            title: "Split & Transfer",
            text: "Novo módulo dedicado para gerar notas de transferência (S&T) com preenchimento automático de dados técnicos."
        }
    ]
};