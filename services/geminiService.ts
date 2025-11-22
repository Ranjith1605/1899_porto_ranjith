import { GoogleGenAI } from "@google/genai";

// Initialize with empty key, will be populated via env or window.aistudio
let genAI: GoogleGenAI | null = null;

export const getGenAI = () => {
  if (!genAI && process.env.API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const generateChatResponseStream = async (
  history: { role: 'user' | 'model', text: string }[],
  newMessage: string,
  modelType: 'fast' | 'thinking' = 'fast'
) => {
  const ai = getGenAI();
  if (!ai) throw new Error("AI functionality not initialized. API Key missing.");

  let modelName = 'gemini-2.5-flash-lite';
  let config: any = {
      systemInstruction: "You are CipherBot, a futuristic AI assistant for Ranjith Ramadass (CipherPolice). You speak in a concise, slightly robotic but helpful tone. You know about Ranjith's skills in AI, React, Python, and his work at LensAI. Keep answers short and related to his portfolio.",
  };

  if (modelType === 'thinking') {
      modelName = 'gemini-3-pro-preview';
      config = {
          ...config,
          thinkingConfig: { thinkingBudget: 32768 } // Max budget for Gemini 3 Pro
      };
      // Note: maxOutputTokens is explicitly NOT set to allow full thinking capacity
  }

  // Initialize chat with history
  const chat = ai.chats.create({
    model: modelName,
    config: config,
    history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
    }))
  });
  
  const resultStream = await chat.sendMessageStream({ message: newMessage });
  return resultStream;
};

export const generateVeoVideo = async (prompt: string, aspectRatio: '16:9' | '9:16' = '16:9') => {
   // Always re-instantiate for Veo to ensure we catch the window key if selected
   const key = process.env.API_KEY;
   if (!key) throw new Error("API Key required for Video Generation");
   
   const ai = new GoogleGenAI({ apiKey: key });

   let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio
    }
  });

  // Polling logic
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  if (operation.error) {
      throw new Error(operation.error.message as string);
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) throw new Error("No video generated");

  // Append key for download
  return `${videoUri}&key=${key}`;
};