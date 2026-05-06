import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for inquiries
  app.post("/api/inquiry", async (req, res) => {
    const { name, email, country, product, message } = req.body;

    console.log("Receiving inquiry:", { name, email, country, product, message });

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      if (!user || !pass || user.trim() === "" || pass.trim() === "") {
        console.warn("SMTP credentials not configured or empty. Inquiry logged but not sent.");
        console.log("Inquiry Content:", { name, email, country, product, message });
        return res.status(200).json({ 
          success: true, 
          message: "Demo Mode: Inquiry logged to server console (Set SMTP_USER and SMTP_PASS in Settings to send real emails)" 
        });
      }

      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.RECIPIENT_EMAIL || "nawshadniloofar@gmail.com",
        replyTo: email,
        subject: `New Inquiry from ${name} - Latheef Fiber Mills`,
        text: `
          New inquiry from website:
          Name: ${name}
          Email: ${email}
          Country: ${country}
          Product: ${product}
          Message: ${message}
        `,
        html: `
          <h3>New Inquiry from Website</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Product:</strong> ${product}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message}
          </div>
        `,
      });

      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: "Failed to send email" });
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
