import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MoodEntry, NoteEntry, AIInsight, Language } from "../types";

// Initialize the client
// Note: In a real production app, ensure the key is valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'YOUR_API_KEY_HERE' });

export const generateDailyInsight = async (
  moods: MoodEntry[],
  notes: NoteEntry[],
  language: Language = 'en'
): Promise<AIInsight> => {
  try {
    // Prepare context for the AI
    const recentMoods = moods.slice(0, 5).map(m => `Level: ${m.level}, Note: ${m.note}`).join('; ');
    const recentNotes = notes.slice(0, 5).map(n => `Title: ${n.title}, Content: ${n.content.substring(0, 50)}...`).join('; ');
    
    const langInstruction = language === 'zh' ? 'Respond in Chinese (Simplified).' : 'Respond in English.';

    const prompt = `
      Analyze the following user data from their LifeOS system.
      Recent Moods: ${recentMoods}
      Recent Notes: ${recentNotes}
      
      ${langInstruction}
      Provide a JSON response with three fields:
      1. "summary": A brief summary of the user's recent state (max 20 words).
      2. "sentiment": One word (Positive, Neutral, Negative).
      3. "suggestion": A constructive suggestion for the rest of the day based on their mood and tasks.
      
      Return ONLY raw JSON.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as AIInsight;
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Fallback mock data based on language
    if (language === 'zh') {
        return {
            summary: "暂时无法分析数据，请检查网络连接。",
            sentiment: "中性",
            suggestion: "深呼吸，专注于当前最重要的任务。"
        };
    }

    return {
      summary: "Unable to analyze data at this moment. Please check your connection.",
      sentiment: "Neutral",
      suggestion: "Take a deep breath and focus on your top priority."
    };
  }
};