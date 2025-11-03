const { GoogleGenAI } = require('@google/genai');

// Use server-side env var for API key (do NOT expose this to client)
const API_KEY = process.env.GENAI_API_KEY || process.env.API_KEY;

if (!API_KEY) {
  console.warn('GENAI API key is not set. generate-caption will not work.');
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const { base64, mimeType } = body;
  if (!base64 || !mimeType) {
    return res.status(400).json({ error: 'base64 and mimeType are required in request body' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'Server not configured with Gemini API key.' });
  }

  try {
    const imagePart = {
      inlineData: {
        data: base64,
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

    const caption = response.text?.trim() || '';
    return res.status(200).json({ caption });
  } catch (err) {
    console.error('Gemini caption error:', err);
    return res.status(500).json({ error: err.message || 'Caption generation failed' });
  }
};
