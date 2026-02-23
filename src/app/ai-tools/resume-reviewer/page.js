"use client";
import { useState } from "react";
import { FaFileAlt, FaSpinner, FaBolt, FaCopy, FaCheck } from "react-icons/fa";

const SAMPLE = `John Doe | Full Stack Developer
john@email.com | github.com/johndoe | linkedin.com/in/johndoe

SUMMARY
Full Stack Developer with 3 years of experience building web applications using React, Node.js, and PostgreSQL.

SKILLS
Languages: JavaScript, TypeScript, Python
Frameworks: React, Next.js, Express, Node.js
Databases: PostgreSQL, MongoDB, Redis
Tools: Docker, Git, AWS (EC2, S3), REST APIs

EXPERIENCE
Software Engineer — TechCorp Inc. (2022 - Present)
- Built REST APIs with Node.js serving 100k+ daily requests
- Migrated legacy jQuery frontend to React, reducing load time by 40%
- Managed PostgreSQL databases with 500k+ records

Junior Developer — StartupXYZ (2021 - 2022)
- Developed features for e-commerce platform using React and Express
- Wrote unit tests achieving 80% code coverage

EDUCATION
B.Sc. Computer Science — State University (2021)
GPA: 3.7/4.0

PROJECTS
TechForDev — Developer news aggregator (Next.js, API integration)
Portfolio — Personal website (React, Tailwind CSS)`;

export default function ResumeReviewerPage() {
  const [resumeText, setResumeText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const review = async () => {
    if (!resumeText.trim()) return;
    setLoading(true); setError(""); setFeedback("");
    try {
      const res = await fetch("/api/ai/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setFeedback(data.feedback);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(feedback);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderMd = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("# ")) return <h5 key={i} className="fw-bold mt-3 mb-1">{line.slice(2)}</h5>;
      if (line.startsWith("## ")) return <h6 key={i} className="fw-bold mt-3 mb-1" style={{ color: "#3b82f6" }}>{line.slice(3)}</h6>;
      if (line.startsWith("### ")) return <div key={i} className="fw-600 mt-2 mb-1" style={{ color: "#8b5cf6" }}>{line.slice(4)}</div>;
      if (line.startsWith("- ") || line.startsWith("* ")) {
        const isPos = line.toLowerCase().includes("strength") || line.includes("✅") || line.includes("✓");
        const isNeg = line.toLowerCase().includes("miss") || line.includes("❌") || line.includes("weak");
        return (
          <div key={i} className="d-flex gap-2 mb-1">
            <span style={{ color: isNeg ? "#ef4444" : isPos ? "#10b981" : "var(--text-secondary)" }}>•</span>
            <span style={{ fontSize: "0.85rem" }}>{renderInline(line.slice(2))}</span>
          </div>
        );
      }
      if (/^\d+\./.test(line)) return <div key={i} className="mb-1 small">{renderInline(line)}</div>;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="mb-1" style={{ fontSize: "0.88rem" }}>{renderInline(line)}</p>;
    });
  };

  const renderInline = (text) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`"))
        return <code key={i} style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", padding: "1px 5px", borderRadius: 4, fontSize: "0.82rem" }}>{part.slice(1, -1)}</code>;
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      return part;
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-3 mb-2">
        <FaFileAlt size={28} className="text-primary" />
        <h1 className="h2 mb-0 fw-bold">AI Resume Reviewer</h1>
        <span className="badge px-3 py-2 rounded-pill" style={{ background: "rgba(139,92,246,0.15)", color: "#8b5cf6", fontSize: "0.72rem" }}>
          <FaBolt size={9} className="me-1" />Powered by Groq · LLaMA 3
        </span>
      </div>
      <p className="text-secondary mb-4">Paste your developer resume and get ATS score, strengths, weaknesses, and improvement tips.</p>

      <div className="row g-4">
        {/* Left: Input */}
        <div className="col-lg-6">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Your Resume</h6>
              <button className="btn btn-sm" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.3)", fontSize: "0.75rem" }}
                onClick={() => setResumeText(SAMPLE)}>
                Load Sample
              </button>
            </div>
            <textarea
              className="form-control"
              rows={20}
              placeholder="Paste your resume text here (plain text format works best)..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              style={{ fontFamily: "inherit", fontSize: "0.82rem", background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", resize: "vertical", lineHeight: 1.7 }}
            />
            <div className="text-secondary small mt-1">{resumeText.trim().split(/\s+/).filter(Boolean).length} words</div>
            <button
              className="btn mt-3 w-100 fw-bold"
              onClick={review}
              disabled={loading || !resumeText.trim()}
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", color: "#fff", border: "none", padding: "12px", borderRadius: 10, fontSize: "0.9rem" }}
            >
              {loading ? (
                <span><FaSpinner className="me-2" style={{ animation: "spin 1s linear infinite" }} />Analyzing Resume...</span>
              ) : (
                <span><FaBolt size={13} className="me-2" />Review My Resume</span>
              )}
            </button>
            {error && <div className="alert alert-danger mt-3 small">{error}</div>}
          </div>
        </div>

        {/* Right: Feedback */}
        <div className="col-lg-6">
          <div className="card p-4 h-100" style={{ minHeight: 500 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">AI Feedback</h6>
              {feedback && (
                <button className="btn btn-sm" onClick={copy}
                  style={{ background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-color)", fontSize: "0.75rem" }}>
                  {copied ? <><FaCheck size={10} className="me-1" />Copied</> : <><FaCopy size={10} className="me-1" />Copy</>}
                </button>
              )}
            </div>

            {loading && (
              <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <div style={{ width: 48, height: 48, border: "3px solid rgba(139,92,246,0.3)", borderTopColor: "#8b5cf6", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <p className="text-secondary mt-3 small">Reading your resume...</p>
              </div>
            )}

            {!loading && !feedback && (
              <div className="d-flex flex-column align-items-center justify-content-center py-5 text-secondary">
                <FaFileAlt size={48} className="mb-3 opacity-25" />
                <p className="small">Detailed feedback will appear here</p>
                <ul className="small text-start ps-4 mt-2">
                  <li>Overall score out of 10</li>
                  <li>Strengths & weaknesses</li>
                  <li>ATS keyword suggestions</li>
                  <li>Actionable improvements</li>
                </ul>
              </div>
            )}

            {!loading && feedback && (
              <div style={{ lineHeight: 1.85, color: "var(--text-primary)" }}>
                {renderMd(feedback)}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
