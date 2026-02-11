// src/modules/ai/gemini-service.js

export const GeminiService = {
  STORAGE_KEY: "cw_gemini_api_key",

  // --- 1. GERENCIAMENTO DA CHAVE (O COFRE) ---
  
  hasKey() {
    return !!localStorage.getItem(this.STORAGE_KEY);
  },

  setKey(key) {
    if (!key || key.length < 30) {
      return false;
    }
    localStorage.setItem(this.STORAGE_KEY, key.trim());
    return true;
  },

  getKey() {
    return localStorage.getItem(this.STORAGE_KEY);
  },

  clearKey() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  // --- 2. O MOTOR DE GERAÇÃO (API REST) ---

  async generateText(prompt, systemInstruction = "") {
    const apiKey = this.getKey();
    if (!apiKey) throw new Error("API_KEY_MISSING");

    // Endpoint oficial do Gemini 1.5 Flash (mais rápido e barato para essa função)
    // Se quiser o Pro, mude para gemini-1.5-pro
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      // Configurações de segurança para evitar bloqueios bobos em texto corporativo
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
      ],
      generationConfig: {
        temperature: 0.7, // Criatividade equilibrada
        maxOutputTokens: 800,
      }
    };

    // Adiciona instrução de sistema se houver (para dar personalidade)
    if (systemInstruction) {
        payload.systemInstruction = {
            parts: [{ text: systemInstruction }]
        };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error?.message || "Erro desconhecido na API";
        // Se o erro for de chave inválida, limpa para pedir de novo
        if (errorMsg.includes("API key not valid")) {
            this.clearKey();
            throw new Error("INVALID_KEY");
        }
        throw new Error(errorMsg);
      }

      // Extrai o texto da resposta complexa do Google
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("NO_TEXT_GENERATED");

      return text;

    } catch (error) {
      console.error("Gemini Error:", error);
      throw error;
    }
  }
};