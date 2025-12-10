// Apenas o Mapa de Emojis fica aqui
export const EMOJI_MAP = {
    ":alarmred:": "https://media.giphy.com/media/vfB0liiCJqbTAUNpIX/giphy.gif",
    ":warning:": "https://fonts.gstatic.com/s/e/notoemoji/latest/26a0_fe0f/512.gif",
    ":arrow-right-2:": "➡️",
    ":home:": "🏠",
    ":cat-dance-dance-dance:": "https://media.tenor.com/On7kvXhzml4AAAAj/loading-cat.gif",
    ":party_blob:": "https://cdn.discordapp.com/emojis/856942472909291530.gif",
    ":consolation-prize:": "🎁",
    ":fire:": "🔥",
    ":check:": "✅"
};

// Deixe vazia ou com uma mensagem de boas-vindas local
export let BROADCAST_MESSAGES = [];

export function setBroadcastMessages(newData) {
    BROADCAST_MESSAGES = newData;
}