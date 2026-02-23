import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, role, bio, skills, projects, contact, style } = await req.json();

  const prompt = `Create a complete, beautiful, single-file HTML portfolio page for a developer with these details:

Name: ${name}
Role: ${role}
Bio: ${bio}
Skills: ${skills}
Projects: ${projects}
Contact: ${contact}
Style preference: ${style || "modern dark theme"}

Requirements:
- Complete standalone HTML with embedded CSS (no external dependencies except Google Fonts)
- Dark/modern design with gradient accents
- Sections: Hero, About, Skills, Projects, Contact
- Responsive for mobile
- Smooth scroll, subtle animations with CSS
- Professional and visually impressive
- Use the actual info provided, don't use placeholder text

Return ONLY the complete HTML code, nothing else — no explanation, no markdown fences.`;

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
        max_tokens: 4096,
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data }, { status: res.status });
    let html = data.choices[0].message.content.trim();
    // Strip accidental markdown fences if present
    html = html.replace(/^```html\n?/i, "").replace(/\n?```$/i, "").trim();
    return NextResponse.json({ html });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
