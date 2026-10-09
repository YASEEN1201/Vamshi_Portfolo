import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Recipient is strictly fixed to Vamsi's email as mandated
const FIXED_RECIPIENT = 'vamshiramavarapu@gmail.com';

// Middleware
app.use(express.json({ limit: '100kb' }));

// In-memory rate limiting map: ip -> array of request timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
};

// Periodic cleanup of rate limit map
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}, 5 * 60 * 1000);

// Basic HTML escaping helper for email body safety
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Diagnostic status endpoint to verify configuration without exposing secrets
app.get('/api/contact/status', (_req: Request, res: Response) => {
  const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  const hasResend = Boolean(process.env.RESEND_API_KEY);

  let provider = 'none';
  if (hasSmtp) {
    provider = `smtp (${process.env.SMTP_HOST || 'default'})`;
  } else if (hasResend) {
    provider = 'resend';
  }

  res.json({
    configured: hasSmtp || hasResend,
    provider,
    recipient: FIXED_RECIPIENT,
  });
});

// Contact endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown';

    // 1. Rate limiting check
    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        success: false,
        error:
          'Too many message attempts. Please wait a few minutes before trying again.',
      });
    }

    const { name, email, subject, message, honeypot } = req.body;

    // 2. Honeypot check (anti-bot trap)
    if (honeypot && String(honeypot).trim().length > 0) {
      // Quietly succeed without sending anything to protect against automated bots
      return res.json({
        success: true,
        message: "Thank you! Your message has been sent successfully. I'll get back to you soon.",
      });
    }

    // 3. Validation & Sanitization
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid name (at least 2 characters).',
      });
    }
    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name is too long (maximum 100 characters).',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }
    if (email.length > 150) {
      return res.status(400).json({
        success: false,
        error: 'Email is too long (maximum 150 characters).',
      });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a subject (at least 2 characters).',
      });
    }
    if (subject.length > 200) {
      return res.status(400).json({
        success: false,
        error: 'Subject is too long (maximum 200 characters).',
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a message (at least 5 characters).',
      });
    }
    if (message.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long (maximum 5000 characters).',
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    // 4. Provider Selection & Delivery
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpSecure =
      process.env.SMTP_SECURE === 'true' || smtpPort === 465;
    const smtpFrom =
      process.env.SMTP_FROM ||
      (smtpUser ? `"Portfolio Contact" <${smtpUser}>` : `"Portfolio Contact" <no-reply@portfolio.local>`);

    const resendApiKey = process.env.RESEND_API_KEY;

    // A. Deliver via SMTP (Nodemailer)
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
      });

      const mailOptions = {
        from: smtpFrom,
        to: FIXED_RECIPIENT,
        replyTo: `"${cleanName}" <${cleanEmail}>`,
        subject: `[Portfolio Inquiry] ${cleanSubject}`,
        text: `You have received a new contact inquiry from your portfolio website.\n\nFrom: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}\n\n---\nSent from Portfolio Contact Form (IP: ${clientIp})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
            <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #0f172a; font-size: 20px;">New Portfolio Inquiry</h2>
              <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Received via Portfolio Contact Form</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 120px; font-weight: 600;">Visitor Name:</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${escapeHtml(cleanName)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Visitor Email:</td>
                <td style="padding: 8px 0; color: #2563eb; font-weight: 500;">
                  <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(cleanEmail)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td>
                <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(cleanSubject)}</td>
              </tr>
            </table>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <h3 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b;">Message:</h3>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #1e293b; font-size: 14px;">${escapeHtml(cleanMessage)}</p>
            </div>

            <div style="padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              You can reply directly to this email to reach <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #2563eb;">${escapeHtml(cleanEmail)}</a>.
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.json({
        success: true,
        message: "Thank you! Your message has been sent successfully. I'll get back to you soon.",
      });
    }

    // B. Deliver via Resend API (if configured)
    if (resendApiKey) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: smtpFrom || 'onboarding@resend.dev',
          to: FIXED_RECIPIENT,
          reply_to: cleanEmail,
          subject: `[Portfolio Inquiry] ${cleanSubject}`,
          text: `From: ${cleanName} (${cleanEmail})\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}`,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json().catch(() => ({}));
        console.error('Resend delivery error:', errorData);
        return res.status(502).json({
          success: false,
          error:
            'Sorry, your message could not be sent. Please try again or email vamshiramavarapu@gmail.com directly.',
        });
      }

      return res.json({
        success: true,
        message: "Thank you! Your message has been sent successfully. I'll get back to you soon.",
      });
    }

    // C. Neither SMTP nor Resend configured on the server
    console.warn(
      'Email inquiry received, but no SMTP_USER/SMTP_PASS or RESEND_API_KEY is configured on the server.'
    );
    return res.status(503).json({
      success: false,
      error:
        'Sorry, your message could not be sent. Please try again or email vamshiramavarapu@gmail.com directly.',
      unconfigured: true,
    });
  } catch (error: any) {
    console.error('Email sending error:', error?.message || error);
    return res.status(500).json({
      success: false,
      error:
        'Sorry, your message could not be sent. Please try again or email vamshiramavarapu@gmail.com directly.',
    });
  }
});

// Serve frontend in development or production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
