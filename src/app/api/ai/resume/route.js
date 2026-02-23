import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { resumeText } = await req.json();
    if (!resumeText) return NextResponse.json({ error: "No resume text provided" }, { status: 400 });

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
            content: "You are an expert tech recruiter and career coach. Review this developer resume and provide structured feedback. Include: 1) Overall Score (out of 10) with brief reason, 2) Strengths (3 bullet points), 3) Weaknesses / Missing sections (3 bullet points), 4) ATS Optimization tips (keywords to add), 5) One-line summary verdict. Use markdown formatting.",
          },
          { role: "user", content: `Review this resume:\n\n${resumeText}` },
        ],
        max_tokens: 1200,
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    const feedback = data.choices?.[0]?.message?.content || "Could not generate feedback.";
    return NextResponse.json({ feedback });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
