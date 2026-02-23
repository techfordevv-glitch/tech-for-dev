import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, description, content } = await req.json();
    if (!title) return NextResponse.json({ error: "No article data provided" }, { status: 400 });

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "GROQ_API_KEY not set" }, { status: 500 });

    const text = `Title: ${title}\n\nDescription: ${description || ""}\n\nContent: ${content || ""}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a tech news summarizer. Summarize the given article in exactly 3 concise bullet points. Each bullet should be one sentence. Start each bullet with •. Focus on the most important technical facts. No intro text, just the 3 bullets.",
          },
          { role: "user", content: `Summarize this tech article:\n\n${text}` },
        ],
        max_tokens: 300,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || "Could not generate summary.";
    return NextResponse.json({ summary });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
