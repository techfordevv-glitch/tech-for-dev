"use client";
import { useState } from "react";
import { FaUserTie, FaBolt, FaCheckCircle, FaSpinner, FaLightbulb } from "react-icons/fa";

const ROLES = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "Mobile Developer", "ML/AI Engineer", "Data Engineer"];
const LEVELS = ["Junior", "Mid-level", "Senior", "Lead/Staff"];
const TYPES = ["Technical", "Behavioral", "System Design"];

function renderMd(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^#{1,3} (.+)$/gm, "<strong style='font-size:15px'>$1</strong>")
    .replace(/\n/g, "<br/>")
    .replace(/`([^`]+)`/g, '<code style="background:rgba(0,0,0,0.3);padding:2px 6px;border-radius:4px;font-size:12px">$1</code>');
}

export default function InterviewCoachPage() {
  const [role, setRole] = useState(ROLES[0]);
  const [level, setLevel] = useState(LEVELS[0]);
  const [type, setType] = useState(TYPES[0]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loadingQ, setLoadingQ] = useState(false);
  const [loadingF, setLoadingF] = useState(false);
  const [session, setSession] = useState([]);

  async function getQuestion() {
    setLoadingQ(true); setQuestion(""); setAnswer(""); setFeedback("");
    try {
      const res = await fetch("/api/ai/interview", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "question", role, level, type }),
      });
      const data = await res.json();
      setQuestion(data.result || "Failed to generate question.");
    } catch { setQuestion("Error generating question."); }
    finally { setLoadingQ(false); }
  }

  async function getFeedback() {
    if (!answer.trim()) return;
    setLoadingF(true); setFeedback("");
    try {
      const res = await fetch("/api/ai/interview", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "feedback", role, level, type, question, answer }),
      });
      const data = await res.json();
      setFeedback(data.result || "Failed to generate feedback.");
      setSession(s => [...s, { question, answer, feedback: data.result, type, level }]);
    } catch { setFeedback("Error generating feedback."); }
    finally { setLoadingF(false); }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 860 }}>
      <div className="text-center mb-5">
        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: 64, height: 64, background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}>
          <FaUserTie size={26} color="#fff" />
        </div>
        <h1 className="fw-bold" style={{ color: "var(--text-primary)" }}>AI Interview Coach</h1>
        <p className="text-secondary">Practice real interview questions and get instant AI feedback on your answers</p>
      </div>

      {/* Config */}
      <div className="rounded-4 p-4 mb-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)" }}>
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label small fw-semibold text-secondary">Role</label>
            <select className="form-select border-secondary" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }} value={role} onChange={e => setRole(e.target.value)}>
              {ROLES.map(r => <option key={r} value={r} style={{ backgroundColor: "#1a1a2e" }}>{r}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label small fw-semibold text-secondary">Level</label>
            <select className="form-select border-secondary" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }} value={level} onChange={e => setLevel(e.target.value)}>
              {LEVELS.map(l => <option key={l} value={l} style={{ backgroundColor: "#1a1a2e" }}>{l}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label small fw-semibold text-secondary">Type</label>
            <select className="form-select border-secondary" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }} value={type} onChange={e => setType(e.target.value)}>
              {TYPES.map(t => <option key={t} value={t} style={{ backgroundColor: "#1a1a2e" }}>{t}</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 fw-bold" onClick={getQuestion} disabled={loadingQ}
              style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)", border: "none", borderRadius: 10 }}>
              {loadingQ ? <FaSpinner style={{ animation: "spin 1s linear infinite" }} size={14} /> : <FaBolt size={14} />}
              {loadingQ ? "" : "Go"}
            </button>
          </div>
        </div>
      </div>

      {/* Question */}
      {question && (
        <div className="rounded-4 p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(239,68,68,0.08))", border: "1px solid rgba(245,158,11,0.25)" }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <FaLightbulb style={{ color: "#f59e0b" }} />
            <span className="small fw-bold text-uppercase" style={{ color: "#f59e0b", letterSpacing: "0.08em" }}>{type} · {level} {role}</span>
          </div>
          <p className="mb-0 fw-semibold" style={{ fontSize: "1.1rem", color: "var(--text-primary)", lineHeight: 1.7 }}>{question}</p>
        </div>
      )}

      {/* Answer */}
      {question && (
        <div className="rounded-4 p-4 mb-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)" }}>
          <label className="form-label fw-semibold" style={{ color: "var(--text-primary)" }}>Your Answer</label>
          <textarea
            className="form-control border-secondary mb-3"
            style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)", minHeight: 160, resize: "vertical" }}
            placeholder="Type your answer here... Be thorough, use examples, demonstrate your knowledge."
            value={answer} onChange={e => setAnswer(e.target.value)}
          />
          <div className="d-flex align-items-center justify-content-between">
            <span className="small text-secondary">{answer.split(/\s+/).filter(Boolean).length} words</span>
            <button className="btn btn-success d-flex align-items-center gap-2 fw-bold px-4" onClick={getFeedback} disabled={!answer.trim() || loadingF}
              style={{ borderRadius: 10 }}>
              {loadingF ? <><FaSpinner style={{ animation: "spin 1s linear infinite" }} size={14} /> Analyzing...</>
                : <><FaCheckCircle size={14} /> Get AI Feedback</>}
            </button>
          </div>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className="rounded-4 p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(59,130,246,0.06))", border: "1px solid rgba(34,197,94,0.25)" }}>
          <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#22c55e" }}>
            <FaCheckCircle /> AI Feedback
          </h6>
          <div className="small" style={{ lineHeight: 1.85, color: "var(--text-secondary)" }} dangerouslySetInnerHTML={{ __html: renderMd(feedback) }} />
          <button className="btn btn-outline-warning btn-sm mt-3 d-flex align-items-center gap-2" onClick={getQuestion}>
            <FaBolt size={12} /> Next Question
          </button>
        </div>
      )}

      {/* Session history */}
      {session.length > 0 && (
        <div className="rounded-4 p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)" }}>
          <h6 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>Session History ({session.length} questions)</h6>
          {session.map((s, i) => (
            <div key={i} className="mb-3 pb-3" style={{ borderBottom: i < session.length - 1 ? "1px solid var(--border-color, #333)" : "none" }}>
              <p className="small fw-semibold mb-1" style={{ color: "var(--text-primary)" }}>Q{i + 1}: {s.question}</p>
              <p className="small text-secondary mb-0">✍️ {s.answer.substring(0, 80)}...</p>
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
