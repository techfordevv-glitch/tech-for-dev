import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { code, language } = await req.json();
    if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "GROQ_API_KEY not set" }, { status: 500 });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are an expert developer. Explain code clearly in simple terms. Structure your response with: 1) What it does (1-2 sentences), 2) How it works (step-by-step), 3) Key concepts used, 4) Potential improvements. Use markdown formatting.",
          },
          {
            role: "user",
            content: `Explain this ${language || "code"}:\n\n\`\`\`${language || ""}\n${code}\n\`\`\``,
          },
        ],
        max_tokens: 1024,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    const explanation = data.choices?.[0]?.message?.content || "Could not generate explanation.";
    return NextResponse.json({ explanation });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
