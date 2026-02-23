"use client";
import { useState } from "react";
import { FaCode, FaCopy, FaCheck, FaSpinner, FaBolt } from "react-icons/fa";

const LANGUAGES = ["javascript", "python", "typescript", "java", "c++", "c#", "go", "rust", "php", "ruby", "swift", "kotlin", "sql", "bash", "other"];

const EXAMPLES = {
  javascript: `function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}`,
  python: `def binary_search(arr, target):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return -1`,
};

export default function CodeExplainerPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const explain = async () => {
    if (!code.trim()) return;
    setLoading(true); setError(""); setExplanation("");
    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setExplanation(data.explanation);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(explanation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    setCode(EXAMPLES[language] || EXAMPLES.javascript);
    setExplanation("");
  };

  // Simple markdown renderer (bold, code, bullets)
  const renderMd = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("```")) return null;
      if (line.startsWith("# ")) return <h5 key={i} className="fw-bold mt-3 mb-1">{line.slice(2)}</h5>;
      if (line.startsWith("## ")) return <h6 key={i} className="fw-bold mt-3 mb-1">{line.slice(3)}</h6>;
      if (line.startsWith("### ")) return <div key={i} className="fw-bold mt-2 mb-1" style={{ color: "#3b82f6" }}>{line.slice(4)}</div>;
      if (line.startsWith("- ") || line.startsWith("* ")) return <div key={i} className="d-flex gap-2 mb-1"><span>•</span><span>{renderInline(line.slice(2))}</span></div>;
      if (/^\d+\./.test(line)) return <div key={i} className="mb-1">{renderInline(line)}</div>;
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
        <FaCode size={28} className="text-primary" />
        <h1 className="h2 mb-0 fw-bold">AI Code Explainer</h1>
        <span className="badge px-3 py-2 rounded-pill" style={{ background: "rgba(139,92,246,0.15)", color: "#8b5cf6", fontSize: "0.72rem" }}>
          <FaBolt size={9} className="me-1" />Powered by Groq · LLaMA 3
        </span>
      </div>
      <p className="text-secondary mb-4">Paste any code snippet and get a clear, detailed explanation instantly.</p>

      <div className="row g-4">
        {/* Left: Input */}
        <div className="col-lg-6">
          <div className="card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Your Code</h6>
              <div className="d-flex gap-2">
                <select className="form-select form-select-sm" value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: "auto", fontSize: "0.78rem" }}>
                  {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                <button className="btn btn-sm" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.3)", fontSize: "0.75rem" }}
                  onClick={loadExample}>
                  Load Example
                </button>
              </div>
            </div>
            <textarea
              className="form-control font-monospace"
              rows={18}
              placeholder="// Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace", fontSize: "0.82rem", background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", resize: "vertical", lineHeight: 1.7 }}
            />
            <button
              className="btn mt-3 w-100 fw-bold"
              onClick={explain}
              disabled={loading || !code.trim()}
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", color: "#fff", border: "none", padding: "12px", borderRadius: 10, fontSize: "0.9rem" }}
            >
              {loading ? (
                <span><FaSpinner className="me-2" style={{ animation: "spin 1s linear infinite" }} />Explaining...</span>
              ) : (
                <span><FaBolt size={13} className="me-2" />Explain this Code</span>
              )}
            </button>
            {error && <div className="alert alert-danger mt-3 small" style={{ fontSize: "0.8rem" }}>{error}</div>}
          </div>
        </div>

        {/* Right: Output */}
        <div className="col-lg-6">
          <div className="card p-4 h-100" style={{ minHeight: 400 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">AI Explanation</h6>
              {explanation && (
                <button className="btn btn-sm" onClick={copy}
                  style={{ background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-color)", fontSize: "0.75rem" }}>
                  {copied ? <><FaCheck size={10} className="me-1" />Copied</> : <><FaCopy size={10} className="me-1" />Copy</>}
                </button>
              )}
            </div>

            {loading && (
              <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <div style={{ width: 48, height: 48, border: "3px solid rgba(59,130,246,0.3)", borderTopColor: "#3b82f6", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <p className="text-secondary mt-3 small">Analyzing your code...</p>
              </div>
            )}

            {!loading && !explanation && (
              <div className="d-flex flex-column align-items-center justify-content-center py-5 text-secondary">
                <FaCode size={48} className="mb-3 opacity-25" />
                <p className="small">Your explanation will appear here</p>
              </div>
            )}

            {!loading && explanation && (
              <div style={{ lineHeight: 1.8, color: "var(--text-primary)" }}>
                {renderMd(explanation)}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
