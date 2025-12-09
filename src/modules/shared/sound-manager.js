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

    playGenieOpen: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;
        const duration = 0.35;

        // 1. O AR (Noise Filtered)
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        // O filtro abre rapidamente: de fechado (100Hz) para aberto (1200Hz)
        noiseFilter.frequency.setValueAtTime(100, t);
        noiseFilter.frequency.exponentialRampToValueAtTime(1200, t + duration);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.04, t); // Volume baixo
        noiseGain.gain.linearRampToValueAtTime(0, t + duration);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(t);

        // 2. A MÁGICA (Sine Wave Rising)
        // Dá a sensação de "subida" ou "surgimento"
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        
        osc.type = 'sine';
        // Sobe de 200Hz para 400Hz (Ascendente)
        osc.frequency.setValueAtTime(200, t); 
        osc.frequency.exponentialRampToValueAtTime(400, t + duration);
        
        // Envelope de volume muito suave
        oscGain.gain.setValueAtTime(0, t);
        oscGain.gain.linearRampToValueAtTime(0.03, t + 0.1); // Ataque
        oscGain.gain.linearRampToValueAtTime(0, t + duration); // Decay

        osc.start(t);
        osc.stop(t + duration);
    },
    playStartup: () => {
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        // Notas do acorde: C4, E4, G4, B4 (Dó Maior com 7ª)
        // Frequências: 261.63, 329.63, 392.00, 493.88
        const notes = [261.63, 329.63, 392.00, 493.88];

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            // Mistura ondas para um som mais "sintetizador" e menos "laboratório"
            osc.type = i % 2 === 0 ? 'sine' : 'triangle'; 
            osc.frequency.value = freq;

            // Envelope de "Pad" (Ataque lento, decay longo)
            gain.gain.setValueAtTime(0, t);
            // Cada nota entra um pouquinho depois da outra (Arpejo ultra-rápido imperceptível)
            gain.gain.linearRampToValueAtTime(0.05, t + 0.3 + (i * 0.05)); 
            gain.gain.exponentialRampToValueAtTime(0.001, t + 3.0); // Fica soando por 3 segundos

            osc.start(t);
            osc.stop(t + 3.5);
        });

        // Adiciona um "Brilho" agudo (Sparkle)
        const sparkle = ctx.createOscillator();
        const sparkleGain = ctx.createGain();
        sparkle.connect(sparkleGain);
        sparkleGain.connect(ctx.destination);
        sparkle.type = 'sine';
        sparkle.frequency.setValueAtTime(1500, t); // Nota alta
        
        sparkleGain.gain.setValueAtTime(0, t);
        sparkleGain.gain.linearRampToValueAtTime(0.02, t + 0.1); // Entra rápido
        sparkleGain.gain.exponentialRampToValueAtTime(0.001, t + 1.5); // Sai rápido

        sparkle.start(t);
        sparkle.stop(t + 1.5);
    }
};