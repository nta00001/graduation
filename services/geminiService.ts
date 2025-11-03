
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Caption generation will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateCaption = async (base64Data: string, mimeType: string): Promise<string> => {
    if (!API_KEY) {
        return "Một khoảnh khắc tốt nghiệp thật đẹp.";
    }

    try {
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: mimeType,
            },
        };
        const textPart = {
            text: "Hãy viết một chú thích ngắn, ấm áp cho bức ảnh tốt nghiệp này. Hãy sáng tạo và lạc quan. Giữ trong dưới 20 từ. Viết bằng tiếng Việt.",
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

    const caption = response.text.trim();
    return caption || "Chương mới vừa bắt đầu!";

    } catch (error) {
        console.error("Error generating caption with Gemini:", error);
        // Fallback caption in case of API error
        return "Chúc mừng một thành tựu tuyệt vời!";
    }
};
