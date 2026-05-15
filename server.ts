import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Chat Route
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return res.status(500).json({ error: "AI service not configured" });
    }

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        }
      });

      const systemPrompt = `
You are the AI Assistant for Latheef Fiber Mills, a premium exporter of Sri Lankan coconut fiber products since 1998.
Your goal is to assist users with information about products, quality standards, and export logistics.

Language Support:
- You MUST respond in the language the user uses. If the user speaks Tamil, reply in clear, professional Tamil.
- The user has specifically requested Tamil support ("tamilla pesu"), so be ready to assist in Tamil.

Company Details:
- Products: Twisted Fiber (for brushes/brooms), Mattress Fiber (for bedding), Bristle Fiber (high-density), Coir Pith (horticulture), Coir Pots.
- Quality: ISO 9001:2015 certified. We maintain moisture levels < 15% and impurity levels < 3%.
- Capacity: 50+ tons daily production capacity.
- Location: Headquartered in the "Coconut Triangle" of Sri Lanka (Kurunegala/Puttalam region).
- Global Reach: Serving 15+ countries including markets in Europe, Asia, and the Middle East.

Tone & Style:
- Professional, efficient, and eco-conscious. 
- Use formatting (bullet points) for product details to make them readable.

Lead Generation:
- If a user expresses interest in buying or pricing, PROACTIVELY suggest they use our "Smart Quote" tool at /get-quote.
- Explain that our Smart Quote tool analyzes their requirements (volume, destination, grade) to provide accurate industrial pricing.
`;

      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: systemPrompt }] },
          { role: "model", parts: [{ text: "Understood. I am the Latheef Fiber Mills AI Assistant. I can assist in English and Tamil. How can I help today?" }] },
          ...(history || [])
        ],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      res.json({ text: response.text() });
    } catch (error) {
      console.error("AI Chat Error:", error);
      res.status(500).json({ error: "Failed to generate AI response" });
    }
  });

  // API route for inquiries
  app.post("/api/inquiry", async (req, res) => {
    const { name, email, country, product, message, subject: bodySubject } = req.body;

    console.log("Receiving inquiry:", { name, email, country, product, message, bodySubject });

    // Configure transporter - Using direct credentials as fallback
    const smtpUser = "nawshad14064@gmail.com";
    const smtpPass = "wwqq xive fjei cfby".replace(/\s+/g, "");

    console.log("Attempting SMTP connection with user:", smtpUser);
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    try {
      console.log("Verifying SMTP connection...");
      // Verify transporter configuration
      await transporter.verify();
      console.log("SMTP Connection verified successfully");

      const emailSubject = bodySubject || `New Inquiry from ${name} - Latheef Fiber Mills`;

      console.log("Sending email to:", process.env.RECIPIENT_EMAIL || "nawshad14064@gmail.com");
      const info = await transporter.sendMail({
        from: `"Website Inquiry" <${smtpUser}>`,
        to: process.env.RECIPIENT_EMAIL || "nawshad14064@gmail.com",
        replyTo: email,
        subject: emailSubject,
        text: `
          New inquiry from website:
          Name: ${name}
          Email: ${email}
          Country: ${country || 'N/A'}
          Product: ${product || 'N/A'}
          Subject: ${bodySubject || 'N/A'}
          Message: ${message}
        `,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #d4af37;">New Inquiry from Website</h2>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Country:</strong> ${country || 'N/A'}</p>
            <p><strong>Product:</strong> ${product || 'N/A'}</p>
            <p><strong>Subject:</strong> ${bodySubject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #d4af37;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
        `,
      });

      console.log("Email sent! MessageID:", info.messageId);
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error: any) {
      console.error("CRITICAL SMTP ERROR:", {
        message: error.message,
        code: error.code,
        command: error.command,
        response: error.response,
        stack: error.stack
      });
      res.status(500).json({ 
        success: false, 
        error: "Failed to send email", 
        details: error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
