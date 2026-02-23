"use client";
import { useState } from "react";
import { FaRobot, FaMagic, FaDownload, FaCopy, FaEye, FaSpinner } from "react-icons/fa";

const STYLES = ["Modern Dark", "Clean Light", "Cyberpunk", "Minimal", "Colorful Gradient"];
const ROLES = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile Developer", "DevOps Engineer", "ML/AI Engineer", "UI/UX Designer"];

export default function PortfolioGeneratorPage() {
  const [form, setForm] = useState({ name: "", role: ROLES[0], bio: "", skills: "", projects: "", contact: "", style: STYLES[0] });
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function update(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function generate() {
    if (!form.name || !form.bio || !form.skills) { setError("Please fill in Name, Bio, and Skills at minimum."); return; }
    setError(""); setLoading(true); setHtml(""); setPreview(false);
    try {
      const res = await fetch("/api/ai/portfolio", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.html) { setHtml(data.html); setPreview(true); }
      else setError("AI failed to generate portfolio. Try again.");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  }

  function download() {
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `${form.name.replace(/\s+/g, "_")}_portfolio.html`; a.click();
  }

  function copy() {
    navigator.clipboard.writeText(html);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="container py-5" style={{ maxWidth: 1100 }}>
      <div className="text-center mb-5">
        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: 64, height: 64, background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}>
          <FaRobot size={26} color="#fff" />
        </div>
        <h1 className="fw-bold" style={{ color: "var(--text-primary)" }}>AI Portfolio Generator</h1>
        <p className="text-secondary">Fill in your details → AI builds a complete portfolio website for you</p>
      </div>

      <div className="row g-4">
        {/* Form */}
        <div className={preview ? "col-lg-5" : "col-lg-8 mx-auto"}>
          <div className="rounded-4 p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text-primary)" }}>Your Information</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-secondary">Full Name *</label>
                <input className="form-control bg-transparent text-white border-secondary" placeholder="John Doe" value={form.name} onChange={e => update("name", e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-secondary">Role *</label>
                <select className="form-select bg-transparent text-white border-secondary" value={form.role} onChange={e => update("role", e.target.value)} style={{ backgroundColor: "var(--bg-card)" }}>
                  {ROLES.map(r => <option key={r} value={r} style={{ backgroundColor: "#1a1a2e" }}>{r}</option>)}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label small fw-semibold text-secondary">Bio / About Me *</label>
                <textarea className="form-control bg-transparent text-white border-secondary" rows={3} placeholder="Passionate developer with 3 years experience building scalable web apps..." value={form.bio} onChange={e => update("bio", e.target.value)} />
              </div>
              <div className="col-12">
                <label className="form-label small fw-semibold text-secondary">Skills *</label>
                <input className="form-control bg-transparent text-white border-secondary" placeholder="React, Node.js, TypeScript, PostgreSQL, Docker, AWS" value={form.skills} onChange={e => update("skills", e.target.value)} />
              </div>
              <div className="col-12">
                <label className="form-label small fw-semibold text-secondary">Projects (describe 2-3)</label>
                <textarea className="form-control bg-transparent text-white border-secondary" rows={3} placeholder="1. E-commerce app with React & Node.js — 1000+ users&#10;2. Real-time chat app using Socket.io&#10;3. ML model for sentiment analysis" value={form.projects} onChange={e => update("projects", e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-secondary">Contact / Links</label>
                <input className="form-control bg-transparent text-white border-secondary" placeholder="github.com/johndoe, john@email.com" value={form.contact} onChange={e => update("contact", e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-secondary">Style</label>
                <select className="form-select bg-transparent text-white border-secondary" value={form.style} onChange={e => update("style", e.target.value)} style={{ backgroundColor: "var(--bg-card)" }}>
                  {STYLES.map(s => <option key={s} value={s} style={{ backgroundColor: "#1a1a2e" }}>{s}</option>)}
                </select>
              </div>
            </div>

            {error && <div className="alert alert-danger mt-3 py-2 small">{error}</div>}

            <button className="btn btn-primary w-100 mt-4 d-flex align-items-center justify-content-center gap-2 py-3 fw-bold" onClick={generate} disabled={loading}
              style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)", border: "none", borderRadius: 12, fontSize: 15 }}>
              {loading ? <><FaSpinner style={{ animation: "spin 1s linear infinite" }} size={16} /> Generating Portfolio...</>
                : <><FaMagic size={16} /> Generate My Portfolio</>}
            </button>
            {loading && <p className="text-center text-secondary small mt-2">This may take 15-20 seconds...</p>}
          </div>
        </div>

        {/* Preview */}
        {preview && html && (
          <div className="col-lg-7">
            <div className="rounded-4 overflow-hidden" style={{ border: "1px solid var(--border-color, #333)" }}>
              <div className="d-flex align-items-center justify-content-between px-3 py-2" style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-color, #333)" }}>
                <div className="d-flex align-items-center gap-2">
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
                  <span className="small text-secondary ms-2"><FaEye size={11} /> Preview</span>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1" onClick={copy} style={{ fontSize: 12 }}>
                    <FaCopy size={11} /> {copied ? "Copied!" : "Copy HTML"}
                  </button>
                  <button className="btn btn-sm btn-success d-flex align-items-center gap-1" onClick={download} style={{ fontSize: 12 }}>
                    <FaDownload size={11} /> Download
                  </button>
                </div>
              </div>
              <iframe srcDoc={html} style={{ width: "100%", height: 520, border: "none" }} title="Portfolio Preview" sandbox="allow-scripts" />
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
