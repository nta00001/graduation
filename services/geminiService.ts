
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Caption generation will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateCaption = async (base64Data: string, mimeType: string): Promise<string> => {
    if (!API_KEY) {
        return "A wonderful graduation memory.";
    }

    try {
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: mimeType,
            },
        };
        const textPart = {
            text: "Generate a short, heartwarming caption for this graduation photo. Be creative and optimistic. Keep it under 20 words.",
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        const caption = response.text.trim();
        return caption || "A new chapter begins!";

    } catch (error) {
        console.error("Error generating caption with Gemini:", error);
        // Fallback caption in case of API error
        return "Celebrating a great achievement!";
    }
};
