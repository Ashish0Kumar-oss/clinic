import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper for Gemini AI initialization
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Route: AI Health & Symptom Assistant
app.post('/api/ai/symptom-checker', async (req, res) => {
  try {
    const { symptoms, age, gender, duration } = req.body;
    if (!symptoms) {
      return res.status(400).json({ error: 'Symptoms description is required.' });
    }

    const ai = getGenAI();
    if (!ai) {
      // Fallback empathetic response if API key isn't provided
      return res.json({
        summary: "Based on your input, here is a general overview.",
        recommendation: "We recommend scheduling a consultation with our Primary Care or Internal Medicine specialists for a comprehensive evaluation.",
        triageLevel: "Routine Consultation",
        department: "General Medicine",
        tips: [
          "Stay hydrated and rest comfortably.",
          "Keep a log of when symptoms occur.",
          "Seek immediate emergency care if you experience severe shortness of breath, chest pain, or high fever."
        ]
      });
    }

    const prompt = `
You are LuminaCare's Senior AI Medical Triage Specialist. Provide a reassuring, empathetic, highly professional preliminary health assessment based on the user's details:
- Symptoms: ${symptoms}
- Age: ${age || 'Not specified'}
- Gender: ${gender || 'Not specified'}
- Duration: ${duration || 'Not specified'}

Return a JSON object with EXACTLY the following structure:
{
  "summary": "A 2-sentence compassionate clinical summary of the reported symptoms.",
  "possibleCauses": ["Potential non-diagnostic cause 1", "Potential non-diagnostic cause 2", "Potential non-diagnostic cause 3"],
  "recommendation": "Detailed guidance on next steps and which LuminaCare department to visit.",
  "department": "One of: Cardiology | Neurology | Orthopedics | Pediatrics | Dermatology | General Medicine | Gynecology | Diagnostics | Physiotherapy",
  "triageLevel": "Routine Consultation | Priority Assessment | Immediate Urgent Care",
  "tips": ["Care tip 1", "Care tip 2", "Care tip 3"],
  "disclaimer": "This AI consultation is for informational triage purposes and does not substitute for formal clinical diagnosis."
}
Do not include markdown formatting around JSON. Output raw JSON only.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const text = response.text || '';
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch {
      return res.json({
        summary: text,
        department: "General Medicine",
        triageLevel: "Routine Consultation",
        tips: ["Rest and monitor symptoms closely.", "Stay hydrated."]
      });
    }
  } catch (err: any) {
    console.error('Error in AI Symptom Checker:', err);
    return res.status(500).json({ error: err.message || 'Failed to complete AI consultation' });
  }
});

// API Route: Quick Doctor Assistant / Q&A
app.post('/api/ai/ask-doctor', async (req, res) => {
  try {
    const { question, context } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.json({
        answer: "Thank you for asking LuminaCare Medical Assistant. Our clinic specializes in integrative, cutting-edge healthcare across 15+ medical disciplines. Please book an appointment with our specialist for tailored clinical guidance."
      });
    }

    const prompt = `
You are LuminaCare's expert Medical AI Assistant. Answer the user's healthcare query clearly, politely, and with luxury medical accuracy. Keep response concise (3-4 sentences max), empathetic, and informative. Context: ${context || 'LuminaCare Luxury Clinic'}.
Question: ${question}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    return res.json({ answer: response.text });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Error processing request' });
  }
});

// Start Express Server
async function main() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LuminaCare Luxury Clinic Server running at http://0.0.0.0:${PORT}`);
  });
}

main();
