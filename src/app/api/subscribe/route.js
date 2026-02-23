import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "RESEND_API_KEY not set" }, { status: 500 });

    // Send welcome email via Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: "TechForDev <onboarding@resend.dev>",
        to: [email],
        subject: "🚀 Welcome to TechForDev Weekly Digest!",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0f1a;color:#e2e8f0;padding:32px;border-radius:12px;">
            <div style="text-align:center;margin-bottom:28px;">
              <h1 style="color:#3b82f6;font-size:28px;margin:0;">⚡ TechForDev</h1>
              <p style="color:#64748b;margin:8px 0 0;">Your Weekly Developer Digest</p>
            </div>
            <h2 style="color:#f1f5f9;">Welcome aboard! 🎉</h2>
            <p>You've successfully subscribed to the <strong>TechForDev Weekly Digest</strong>.</p>
            <p>Every week you'll receive:</p>
            <ul style="padding-left:20px;line-height:2;">
              <li>🗞️ Top 10 tech news stories</li>
              <li>🤖 Hottest AI tools</li>
              <li>📦 Trending GitHub repos</li>
              <li>💼 Remote dev jobs</li>
              <li>📚 Best developer articles</li>
            </ul>
            <div style="text-align:center;margin:28px 0;">
              <a href="https://techfordev.vercel.app" style="background:#3b82f6;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;">Visit TechForDev →</a>
            </div>
            <p style="color:#64748b;font-size:12px;text-align:center;">You can unsubscribe at any time.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json({ error: err.message || "Failed to send email" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Subscribed! Check your inbox for a welcome email." });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
