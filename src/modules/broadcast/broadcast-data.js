// src/modules/broadcast/broadcast-data.js

// 1. O MAPA DE EMOJIS (O Segredo dos GIFs)
// Substitui :codigo: por <img src="...">
export const EMOJI_MAP = {
    // Alertas
    ":alarmred:": "https://media.giphy.com/media/vfB0liiCJqbTAUNpIX/giphy.gif", // Sirene vermelha
    ":warning:": "https://fonts.gstatic.com/s/e/notoemoji/latest/26a0_fe0f/512.gif", // Triângulo alerta
    
    // Setas e Ícones
    ":arrow-right-2:": "➡️", // Podemos usar nativos também
    ":home:": "🏠",
    
    // Fun / Google Style
    ":cat-dance-dance-dance:": "https://media.tenor.com/On7kvXhzml4AAAAj/loading-cat.gif", // Gato dançando
    ":party_blob:": "https://cdn.discordapp.com/emojis/856942472909291530.gif?size=96&quality=lossless", // Blob Roxo festejando
    ":consolation-prize:": "🎁",
    
    // Adicione quantos quiser aqui...
    ":fire:": "🔥",
    ":check:": "✅"
};

// 2. OS AVISOS (Cópia fiel do Chat)
export const BROADCAST_MESSAGES = [
    {
        id: "msg_002",
        type: "info", // critical, info, success
        author: "Coordenação",
        date: "Hoje, 14:30",
        title: "HO de Presente! 🏠",
        // Aqui colamos o texto EXATAMENTE como vem do chat
        text: `Olá, time, boa tarde! 💜
@all 
:alarmred: :alarmred: [IMPORTANTE] :alarmred: :alarmred:

:home: HO de Presente: Nosso Desafio de Excelência e Foco Total! :home:

Temos três pilares de foco total para esta semana:

<b>1. Backlog Zero:</b>
Nossa meta principal é zerar o nosso backlog. O trabalho só conta respeitando 100% às regras. 🔙

<b>2. Aderência nas Pausas (Live Meet):</b>
Foco é 100% de adesão às Pausas de LM. Combinado? ⏸️

:arrow-right-2: Se conseguirmos bater consistentemente estes três pontos (prazo final Sexta, 12/12):

:consolation-prize: <b>Home Office (HO) garantido a partir de Segunda!</b>

Vamos fechar a semana com este presente incrível! :cat-dance-dance-dance:`
    },
    {
        id: "msg_001",
        type: "critical",
        author: "Quality Team",
        date: "Ontem",
        title: "Puxão de Orelha (SO) ⚠️",
        text: `@todos Fala gente linda! 
Mesmo com natal batendo na porta recebemos um pequeno puxão de orelha do Google por usar errado o Substatus de <b>SO - Troubleshooting Only</b> =(

Acabei de enviar um email com o titulo: <i>[Teste de Conhecimento]</i>.
O teste está disponivel até o dia 19/12!

Muito obrigada meu polvo! ❤️ :party_blob:`
    }
];