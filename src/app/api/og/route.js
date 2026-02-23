import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "TechForDev";
    const description = searchParams.get("desc") || "Your Daily Tech News, AI Tools & Developer Hub";
    const type = searchParams.get("type") || "page";

    const typeColors = {
      news: "#3b82f6",
      article: "#10b981",
      "ai-tool": "#8b5cf6",
      project: "#f59e0b",
      job: "#0ea5e9",
      event: "#f97316",
      video: "#ef4444",
      podcast: "#ec4899",
      page: "#3b82f6",
    };

    const accentColor = typeColors[type] || "#3b82f6";

    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(135deg, #0a0f1a 0%, #1a1040 60%, #0a0f1a 100%)",
            color: "white",
            fontFamily: "sans-serif",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent bar */}
          <div style={{ width: "100%", height: "5px", background: `linear-gradient(90deg, ${accentColor}, #8b5cf6, #ec4899)`, display: "flex" }} />

          {/* Grid pattern (simulated with small dots via background) */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 15% 50%, rgba(59,130,246,0.12) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(139,92,246,0.10) 0%, transparent 50%)", display: "flex" }} />

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", padding: "50px 80px", flex: 1, position: "relative" }}>
            {/* Brand row */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px" }}>
              <div style={{ fontSize: "30px", color: "#fbbf24", fontWeight: 900, letterSpacing: "-1px" }}>⚡</div>
              <div style={{ fontSize: "26px", fontWeight: 800, letterSpacing: "-0.5px", color: "#f0f4f8" }}>TechForDev</div>
              {type !== "page" && (
                <div style={{ fontSize: "12px", fontWeight: 700, background: accentColor, padding: "4px 14px", borderRadius: "20px", marginLeft: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {type}
                </div>
              )}
            </div>

            {/* Title */}
            <div style={{ fontSize: title.length > 50 ? "42px" : "52px", fontWeight: 900, lineHeight: 1.15, marginBottom: "22px", maxWidth: "1000px", letterSpacing: "-1.5px", color: "#f0f4f8" }}>
              {title.length > 80 ? title.substring(0, 80) + "…" : title}
            </div>

            {/* Description */}
            <div style={{ fontSize: "22px", color: "#94a3b8", maxWidth: "880px", lineHeight: 1.5, fontWeight: 400 }}>
              {description.length > 120 ? description.substring(0, 120) + "…" : description}
            </div>

            {/* Bottom domain */}
            <div style={{ position: "absolute", bottom: "0px", right: "0px", fontSize: "15px", color: "#475569", fontWeight: 500, padding: "50px 80px" }}>
              techfordev.vercel.app
            </div>

            {/* Decorative accent circle */}
            <div style={{ position: "absolute", right: "-80px", top: "-40px", width: "340px", height: "340px", borderRadius: "50%", background: `radial-gradient(circle, ${accentColor}22, transparent 70%)`, display: "flex" }} />
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch {
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
