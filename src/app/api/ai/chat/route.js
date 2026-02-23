import { NextResponse } from "next/server";

export async function POST(req) {
  const { messages } = await req.json();
  if (!messages?.length) return NextResponse.json({ error: "No messages" }, { status: 400 });

  const systemPrompt = {
    role: "system",
    content: `You are TechBot, a friendly and expert AI assistant for developers on TechForDev. 
You help with coding questions, debugging, tech concepts, career advice, and anything dev-related.
Keep answers concise but complete. Use code blocks with language tags when sharing code.
Be friendly, practical, and helpful. Format with markdown when it improves readability.`,
  };

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [systemPrompt, ...messages],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data }, { status: res.status });
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
