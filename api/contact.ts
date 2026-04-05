import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message, turnstileToken } = req.body as {
    name: string;
    email: string;
    subject: string;
    message: string;
    turnstileToken: string;
  };

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim() || !turnstileToken) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Verify Cloudflare Turnstile token
  const verifyRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    }
  );

  const verifyData = (await verifyRes.json()) as { success: boolean };

  if (!verifyData.success) {
    return res.status(400).json({ error: "CAPTCHA verification failed" });
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeSubject = escapeHtml(subject.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: ["dawid.mularczykk@gmail.com"],
    replyTo: email.trim(),
    subject: `[Portfolio] ${safeSubject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
        <h2 style="font-size:20px;font-weight:700;margin-bottom:24px;">New portfolio message</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr>
            <td style="padding:8px 0;color:#666;width:70px;vertical-align:top;font-size:13px;">Name</td>
            <td style="padding:8px 0;font-size:14px;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;vertical-align:top;font-size:13px;">Email</td>
            <td style="padding:8px 0;font-size:14px;">
              <a href="mailto:${safeEmail}" style="color:#0070f3;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;vertical-align:top;font-size:13px;">Subject</td>
            <td style="padding:8px 0;font-size:14px;">${safeSubject}</td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin-bottom:24px;">
        <p style="font-size:14px;line-height:1.7;margin:0;">${safeMessage}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }

  return res.status(200).json({ success: true });
}
