
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSupportResponse = async (history: ChatMessage[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are Amaano Exchange Assistant. 
        Help users with money transfers (local/international), EVC Plus integration, exchange rates (USD/EUR/SOS), and KYC issues.
        The app supports Somali users. Keep responses professional, helpful, and concise. 
        If asked about technical errors, tell them to contact help@amaano.com.`,
      },
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting right now. Please try again or contact support at help@amaano.com.";
  }
};
