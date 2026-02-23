import { NextResponse } from "next/server";

export async function POST(req) {
  const { mode, role, level, type, question, answer } = await req.json();

  let prompt = "";

  if (mode === "question") {
    prompt = `Generate a single ${type} interview question for a ${level} ${role} developer.
- The question should be realistic and commonly asked in actual interviews
- For "technical" type: ask about concepts, code, or problem-solving
- For "behavioral" type: use STAR-method style situational questions
- For "system design" type: ask about designing a real system
Return ONLY the question text, nothing else.`;
  } else if (mode === "feedback") {
    prompt = `You are a senior tech interviewer. Evaluate this interview answer:

Question: ${question}
Candidate Answer: ${answer}

Provide structured feedback with:
1. **Score**: X/10 with brief justification
2. **Strengths**: What was good about the answer (2-3 points)
3. **Improvements**: What could be better (2-3 points)
4. **Ideal Answer Hints**: Key points a strong answer should include
5. **Tips**: One actionable tip for next time

Be honest but encouraging. Use markdown formatting.`;
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data }, { status: res.status });
    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
