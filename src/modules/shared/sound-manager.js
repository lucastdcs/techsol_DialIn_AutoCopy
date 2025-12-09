// src/modules/shared/sound-manager.js

let audioCtx = null;

function getContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    // Garante que o áudio esteja ativo (navegadores pausam se não houver interação)
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

export const SoundManager = {
    // 1. O "Click" Tátil (Checkboxes, Chips, Tabs)
    // Curto, seco, alta frequência que cai rápido. Imita um switch físico.
    playClick: () => {
        const ctx = getContext();
        if (!ctx) return;

        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        // Pitch Drop rápido (800Hz -> 100Hz em 0.05s)
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);

        // Envelope de Volume (Ataque imediato, decay rápido)
        gain.gain.setValueAtTime(0.1, t); // Volume baixo (não irritar)
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

        osc.start(t);
        osc.stop(t + 0.05);
    },

    // 2. O "Swoosh" (Abrir/Fechar Janelas)
    // Ruído branco filtrado que simula ar deslocando.
    playSwoosh: () => {
        const ctx = getContext();
        if (!ctx) return;

        const t = ctx.currentTime;
        const duration = 0.25;

        // Cria Ruído Branco
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        // Filtro Lowpass (Para soar como vento, não como chiado de TV)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        // O filtro abre e fecha
        filter.frequency.setValueAtTime(200, t);
        filter.frequency.linearRampToValueAtTime(800, t + (duration / 2));
        filter.frequency.linearRampToValueAtTime(200, t + duration);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.05, t); // Muito sutil
        gain.gain.linearRampToValueAtTime(0, t + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(t);
    },

    // 3. O "Sucesso" (Copiar, Concluir, Toast)
    // Um acorde suave e brilhante (Glassy Ping).
    playSuccess: () => {
        const ctx = getContext();
        if (!ctx) return;

        const t = ctx.currentTime;
        
        // Acorde de Dó Maior (C5, E5, G5) com leve atraso (arpejo)
        const notes = [523.25, 659.25, 783.99]; 
        
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.value = freq;

            const start = t + (i * 0.03); // Stagger (efeito harpa)
            
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(0.05, start + 0.05); // Ataque
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6); // Decay longo

            osc.start(start);
            osc.stop(start + 0.6);
        });
    },
    
    // 4. O "Delete/Reset" (Limpar formulário)
    // Um som grave e "oco".
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
    }
};