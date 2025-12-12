// src/modules/shared/sound-manager.js

let audioCtx = null;

// Configurações Globais de Mixagem (O "Equalizador" do Sistema)
const MIXER = {
    masterVolume: 0.2, // Volume geral baixo para não irritar
    rolloff: 0.05,     // Tempo padrão de decaimento suave
};

function getContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// Helper: Cria um oscilador com envelope padrão (ADSR Simplificado)
// Garante que todos os sons tenham o mesmo "ataque" e "fechamento" suave.
function playTone({ type = 'sine', freq, duration, vol = 1.0, slideTo = null }) {
    const ctx = getContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);

    // Efeito de "Slide" (Pitch Bend) - Dá a sensação de movimento físico
    if (slideTo) {
        osc.frequency.exponentialRampToValueAtTime(slideTo, t + duration);
    }

    // Envelope de Volume (Evita "cliques" digitais no inicio/fim)
    const masterVol = vol * MIXER.masterVolume;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(masterVol, t + 0.01); // Ataque rápido (10ms)
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration); // Decaimento exponencial

    osc.start(t);
    osc.stop(t + duration + 0.1);
}

// Helper: Gera Ruído Branco/Rosa (Para texturas de ar e papel)
function createNoiseBuffer(ctx) {
    const bufferSize = ctx.sampleRate * 2.0; // 2 segundos
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        // Pink Noise aproximado (mais suave que White Noise)
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; 
    }
    return buffer;
}
let lastOut = 0;
let noiseBufferCache = null;

export const SoundManager = {
    
    // 1. CLICK (Material: Vidro/Cerâmica)
    // Sensação: Toque preciso em tela de vidro. Curto, agudo, mas sem ser estridente.
    playClick: () => {
        // Um "tap" de alta frequência com queda rápida de tom
        playTone({
            type: 'sine',
            freq: 800,
            slideTo: 600, // Leve queda para dar "peso"
            duration: 0.08,
            vol: 0.6
        });
    },

    // 2. SWOOSH (Material: Seda/Ar)
    // Sensação: Movimento rápido e leve. Filtrado para não chiar.
    playSwoosh: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        if (!noiseBufferCache) noiseBufferCache = createNoiseBuffer(ctx);

        const source = ctx.createBufferSource();
        source.buffer = noiseBufferCache;

        // Filtro Bandpass que se move (o segredo do swoosh)
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.value = 1.0; 
        filter.frequency.setValueAtTime(400, t);
        filter.frequency.exponentialRampToValueAtTime(1200, t + 0.2);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(MIXER.masterVolume * 0.5, t + 0.1);
        gain.gain.linearRampToValueAtTime(0, t + 0.3);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        source.start(t);
        source.stop(t + 0.4);
    },

    // 3. SUCCESS (Material: Cristal)
    // Sensação: Dopamina elegante. Um acorde maior dedilhado rapidamente (Arpeggio).
    // Notas: C6, E6, G6 (Tríade de Dó Maior em oitava alta)
    playSuccess: () => {
        const now = getContext()?.currentTime || 0;
        const notes = [1046.50, 1318.51, 1567.98]; // C6, E6, G6
        
        notes.forEach((freq, i) => {
            setTimeout(() => {
                playTone({
                    type: 'sine', // Senoidal pura = som de sino/cristal
                    freq: freq,
                    duration: 0.6, // Cauda longa (sustain)
                    vol: 0.4
                });
            }, i * 40); // 40ms de atraso entre notas (dedilhado)
        });
    },

    // 4. RESET (Material: Papel amassando/Voltando)
    // Sensação: Desfazer algo. Som reverso ou oco.
    playReset: () => {
        playTone({
            type: 'triangle', // Triangulo tem mais harmônicos, soa mais "oco"
            freq: 300,
            slideTo: 100, // Queda brusca de tom = "desligando" ou "limpando"
            duration: 0.15,
            vol: 0.5
        });
    },

    // 5. ERROR (Material: Borracha/Madeira Maciça)
    // Sensação: Bloqueio físico. Não é um alarme, é um "bater na parede".
    playError: () => {
        // Som grave e seco.
        playTone({
            type: 'sine', 
            freq: 150, // Grave
            duration: 0.1, // Muito curto
            vol: 0.8
        });
        
        // Adiciona uma segunda camada para textura (vibração)
        setTimeout(() => {
             playTone({ type: 'square', freq: 50, duration: 0.05, vol: 0.1 });
        }, 10);
    },

    // 6. NOTIFICATION (Material: Metal Polido)
    // Sensação: Um "Ping" educado pedindo atenção.
    playNotification: () => {
        // Duas notas rápidas (Intervalo de terça menor = elegante)
        // A5 (880) -> C6 (1046)
        playTone({ type: 'sine', freq: 880, duration: 0.3, vol: 0.5 });
        setTimeout(() => {
            playTone({ type: 'sine', freq: 1046, duration: 0.6, vol: 0.5 });
        }, 100);
    },

    // 7. TYPING (Material: Teclado Mecânico Silencioso)
    // Sensação: Produtividade. Quase imperceptível.
    playTyping: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        if (!noiseBufferCache) noiseBufferCache = createNoiseBuffer(ctx);

        const source = ctx.createBufferSource();
        source.buffer = noiseBufferCache;

        // Filtro Highpass tira o "grave", deixa só o "clique" agudo
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 2000;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(MIXER.masterVolume * 0.2, t); // Bem baixinho
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05); // Ultra curto (50ms)

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        source.start(t);
        source.stop(t + 0.06);
    },

    // 8. GENIE OPEN (Material: Magia Sci-Fi)
    // Sensação: Abertura de portal. O som assinatura da ferramenta.
    playGenieOpen: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        // Camada 1: O "Pop" de abertura (impacto inicial)
        playTone({ type: 'triangle', freq: 200, slideTo: 600, duration: 0.2, vol: 0.5 });

        // Camada 2: O "Brilho" (textura mágica)
        if (!noiseBufferCache) noiseBufferCache = createNoiseBuffer(ctx);
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBufferCache;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, t);
        filter.frequency.exponentialRampToValueAtTime(3000, t + 0.4); // O filtro abre revelando o brilho

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(MIXER.masterVolume * 0.4, t + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(t);
    },

    // 9. STARTUP (Material: Cinema / THX)
    // Sensação: Poder e Carregamento. Um "Drone" que sobe e estabiliza.
    playStartup: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        // Acorde Suspenso (C4 + F4 + G4) - Cria expectativa e modernidade
        const freqs = [261.63, 349.23, 392.00];

        freqs.forEach((f, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            // Onda Sawtooth filtrada = som de sintetizador analógico quente
            osc.type = 'sawtooth';
            osc.frequency.value = f * 0.5; // Começa uma oitava abaixo
            osc.frequency.linearRampToValueAtTime(f, t + 2); // Sobe para a nota correta

            // Filtro Lowpass que abre devagar (efeito "nascer do sol")
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(50, t);
            filter.frequency.exponentialRampToValueAtTime(1500, t + 1.5);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(MIXER.masterVolume * 0.3, t + 1);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 4);

            osc.start(t);
            osc.stop(t + 4.1);
        });
    }
};