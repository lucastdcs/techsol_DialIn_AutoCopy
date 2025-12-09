// src/modules/shared/sound-manager.js

let audioCtx = null;

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

export const SoundManager = {
    // 1. CLICK (Mecânico)
    playClick: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);

        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

        osc.start(t);
        osc.stop(t + 0.05);
    },

    // 2. SWOOSH (Ar / Movimento)
    playSwoosh: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;
        
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, t);
        filter.frequency.linearRampToValueAtTime(800, t + 0.1);
        filter.frequency.linearRampToValueAtTime(200, t + 0.25);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.25);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(t);
    },

    // 3. SUCCESS (Acorde Brilhante)
    playSuccess: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;
        
        [523.25, 659.25, 783.99].forEach((freq, i) => { 
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            const start = t + (i * 0.03);
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(0.05, start + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);
            osc.start(start);
            osc.stop(start + 0.7);
        });
    },

    // 4. RESET (Limpeza / Oco)
    playReset: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.2);
        
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
        
        osc.start(t);
        osc.stop(t + 0.2);
    },

    // --- NOVOS EFEITOS ---

    // 5. ERROR (Parede de Borracha / Bloqueio)
    // Usado quando falta campo obrigatório ou ação inválida
    playError: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        // Onda Sawtooth filtrada soa como um "buzz" ou "bump"
        osc.type = 'sawtooth'; 
        osc.frequency.setValueAtTime(100, t);
        osc.frequency.exponentialRampToValueAtTime(50, t + 0.15);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 150; // Abafa o som para não ser agressivo
        osc.disconnect();
        osc.connect(filter);
        filter.connect(gain);

        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

        osc.start(t);
        osc.stop(t + 0.15);
    },

    // 6. NOTIFICATION (Sino de Atenção)
    // Para o futuro Módulo de Avisos
    playNotification: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, t); // Lá (A5) - Alta frequência

        // Envelope de Sino (Decay longo)
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.05, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

        osc.start(t);
        osc.stop(t + 1.5);
    },

    // 7. TYPING (Teclado Mecânico Suave)
    // Para quando a IA estiver escrevendo
    playTyping: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        // Ruído curto e seco
        const bufferSize = ctx.sampleRate * 0.03; // 30ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass'; // Tira o grave, deixa só o "click"
        filter.frequency.value = 1000;

        const gain = ctx.createGain();
        gain.gain.value = 0.03; // Muito baixo

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(t);
    },

    // 8. GENIE OPEN (Dinâmico / Variação Tonal)
playGenieOpen: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;
        const duration = 0.3; // Curto e rápido

        // --- VARIAÇÃO SUTIL DE TEXTURA (Não musical) ---
        // Em vez de mudar a nota (Dó, Ré, Mi), mudamos o "Brilho" do filtro.
        // Isso faz o som parecer ligeiramente diferente a cada clique, 
        // mas sem parecer que está tocando uma música.
        const brightness = 800 + (Math.random() * 400); // Entre 800Hz e 1200Hz

        // 1. O DESLOCAMENTO DE AR (Swoosh de Alta Qualidade)
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        // Pink Noise (Mais suave e agradável que o White Noise)
        let b0, b1, b2, b3, b4, b5, b6;
        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            data[i] *= 0.11; // Compensa o ganho do Pink Noise
            b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        // Filtro Bandpass: Cria a sensação de "movimento" sem nota musical
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.Q.value = 1.0; // Largura de banda suave
        
        // O filtro se move, simulando a abertura rápida
        noiseFilter.frequency.setValueAtTime(200, t);
        noiseFilter.frequency.exponentialRampToValueAtTime(brightness, t + 0.15);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.08, t); // Volume discreto
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(t);

        // 2. O "SNAP" MECÂNICO (Substitui o som de "fiuuu")
        // Um clique ultra-curto grave para dar "peso" ao início da animação
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        
        // Onda triangular filtrada soa como madeira ou plástico batendo
        clickOsc.type = 'triangle'; 
        clickOsc.frequency.setValueAtTime(150, t); // Grave e seco
        
        // Envelope ultra-rápido (apenas um estalo)
        clickGain.gain.setValueAtTime(0.05, t);
        clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

        clickOsc.start(t);
        clickOsc.stop(t + 0.05);
    },
    playStartup: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        // 1. O SUB-GRAVE (Peso Físico)
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.type = 'sine';
        subOsc.frequency.value = 65.41; // C2 (Grave profundo)
        
        // Envelope Sub
        subGain.gain.setValueAtTime(0, t);
        subGain.gain.linearRampToValueAtTime(0.4, t + 1.0); // Demora 1s para encher
        subGain.gain.exponentialRampToValueAtTime(0.001, t + 4.0); // Longo decay
        subOsc.start(t);
        subOsc.stop(t + 4.0);

        // 2. A TEXTURA (Drone Cinematográfico)
        // Criamos 2 osciladores levemente desafinados para dar efeito "Stereo/Largo"
        const freqs = [130.81, 131.5]; // C3 e C3 levemente desafinado
        
        // Filtro Lowpass (O segredo do som "abafado" que abre)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, t); // Começa fechado (abafado)
        filter.frequency.exponentialRampToValueAtTime(2000, t + 2.5); // Abre devagar

        freqs.forEach(f => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sawtooth'; // Onda com "rasgo"
            osc.frequency.value = f;

            osc.connect(filter); // Passa pelo filtro primeiro
            filter.connect(gain);
            gain.connect(ctx.destination);

            // Envelope
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.08, t + 0.5); // Volume baixo pois sawtooth é forte
            gain.gain.exponentialRampToValueAtTime(0.001, t + 3.5);

            osc.start(t);
            osc.stop(t + 4.0);
        });
    }
};