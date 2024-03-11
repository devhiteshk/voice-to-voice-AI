import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_REACT_GEMINI_KEY);

export const GeminiAPI = async (history, message) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  const prompt = message;
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};
