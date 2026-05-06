import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are the AI Assistant for Latheef Fiber Mills, a premium exporter of Sri Lankan coconut fiber products since 1998.
Your goal is to assist users with information about products, quality standards, and export logistics.

Key Information:
- Products: Twisted Fiber, Mattress Fiber, Bristle Fiber, Coir Pith, Coir Pots.
- Quality: ISO 9001:2015, moisture < 15%, impurity < 3%.
- Export: Serving 15+ countries, 50 tons daily capacity, based in Sri Lanka's coconut triangle.
- Tone: Professional, helpful, premium, and eco-conscious.

Lead Generation Strategy:
- If a user expresses interest in buying or pricing, PROACTIVELY suggest they use our "Smart Quote" tool at /get-quote.
- Explain that the Smart Quote tool uses AI to analyze their requirements and provide the most cost-effective industrial grade.
- If they are unsure about a product, offer to help them choose the right grade based on their industry (e.g., automotive, horticulture, bedding).
`;

export async function getChatResponse(message: string, history: { role: string; parts: { text: string }[] }[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I am the Latheef Fiber Mills AI Assistant. How can I help you today?" }] },
        ...history
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our team directly.";
  }
}
