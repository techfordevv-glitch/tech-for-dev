"use client";
import { useState, useCallback } from "react";
import { FaCode, FaCompress, FaExpand, FaCopy, FaTrash, FaCheckCircle, FaTimesCircle, FaDownload } from "react-icons/fa";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState(null); // null | "valid" | "error"
  const [errorMsg, setErrorMsg] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState(null);

  function getStats(obj, depth = 0) {
    let keys = 0, arrays = 0, depth_ = depth;
    if (typeof obj === "object" && obj !== null) {
      const entries = Array.isArray(obj) ? obj : Object.values(obj);
      keys += Array.isArray(obj) ? 0 : Object.keys(obj).length;
      arrays += Array.isArray(obj) ? 1 : 0;
      for (const v of entries) {
        const child = getStats(v, depth + 1);
        keys += child.keys; arrays += child.arrays; depth_ = Math.max(depth_, child.depth);
      }
    }
    return { keys, arrays, depth: depth_ };
  }

  function format() {
    if (!input.trim()) { setOutput(""); setStatus(null); setStats(null); return; }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setStatus("valid");
      setErrorMsg("");
      const s = getStats(parsed);
      setStats({ keys: s.keys, arrays: s.arrays, depth: s.depth, chars: formatted.length, lines: formatted.split("\n").length });
    } catch (e) {
      setOutput("");
      setStatus("error");
      setErrorMsg(e.message);
      setStats(null);
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input);
      const mini = JSON.stringify(parsed);
      setOutput(mini);
      setStatus("valid");
      setErrorMsg("");
    } catch (e) {
      setStatus("error");
      setErrorMsg(e.message);
    }
  }

  function copy() {
    navigator.clipboard.writeText(output || input);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    const blob = new Blob([output || input], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "formatted.json"; a.click();
  }

  function loadSample() {
    setInput(JSON.stringify({
      "name": "TechForDev",
      "version": "2.0.0",
      "features": ["news", "ai-tools", "projects", "jobs"],
      "config": { "theme": "dark", "lang": "en", "notifications": true },
      "stats": { "users": 5000, "articles": 1200, "tools": 30 }
    }));
    setOutput(""); setStatus(null); setStats(null);
  }

  const colorizeJson = useCallback((json) => {
    return json
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = "color:#a3e635";
        if (/^"/.test(match)) cls = /:$/.test(match) ? "color:#60a5fa" : "color:#fde047";
        else if (/true|false/.test(match)) cls = "color:#f472b6";
        else if (/null/.test(match)) cls = "color:#9ca3af";
        return `<span style="${cls}">${match}</span>`;
      });
  }, []);

  return (
    <div className="container-fluid py-4" style={{ maxWidth: 1400 }}>
      <div className="text-center mb-4">
        <h1 className="fw-bold" style={{ color: "var(--text-primary)" }}>
          <FaCode className="me-2 text-primary" />JSON Formatter & Validator
        </h1>
        <p className="text-secondary">Format, minify, validate and inspect JSON data instantly</p>
      </div>

      {/* Toolbar */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3 justify-content-center">
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={format}>
          <FaExpand size={13} /> Format / Beautify
        </button>
        <button className="btn btn-outline-secondary d-flex align-items-center gap-2" onClick={minify}>
          <FaCompress size={13} /> Minify
        </button>
        <button className="btn btn-outline-info d-flex align-items-center gap-2" onClick={loadSample}>
          Load Sample
        </button>
        <div className="d-flex align-items-center gap-2">
          <span className="small text-secondary">Indent:</span>
          {[2, 4].map(n => (
            <button key={n} onClick={() => setIndent(n)}
              className={`btn btn-sm ${indent === n ? "btn-primary" : "btn-outline-secondary"}`}
              style={{ minWidth: 36 }}>{n}</button>
          ))}
        </div>
        {output && <>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2" onClick={copy}>
            <FaCopy size={12} /> {copied ? "Copied!" : "Copy"}
          </button>
          <button className="btn btn-outline-success d-flex align-items-center gap-2" onClick={download}>
            <FaDownload size={12} /> Download
          </button>
        </>}
        <button className="btn btn-outline-danger d-flex align-items-center gap-2" onClick={() => { setInput(""); setOutput(""); setStatus(null); setStats(null); }}>
          <FaTrash size={12} /> Clear
        </button>
      </div>

      {/* Status */}
      {status && (
        <div className={`alert ${status === "valid" ? "alert-success" : "alert-danger"} d-flex align-items-center gap-2 py-2 mb-3`}>
          {status === "valid" ? <FaCheckCircle /> : <FaTimesCircle />}
          {status === "valid" ? "✓ Valid JSON" : `✗ Invalid JSON: ${errorMsg}`}
          {stats && status === "valid" && (
            <span className="ms-auto small">
              {stats.keys} keys · {stats.arrays} arrays · depth {stats.depth} · {stats.lines} lines · {stats.chars} chars
            </span>
          )}
        </div>
      )}

      {/* Editor */}
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="rounded-3 overflow-hidden" style={{ border: "1px solid var(--border-color, #333)" }}>
            <div className="px-3 py-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-color, #333)" }}>
              <span className="small fw-semibold text-secondary">INPUT</span>
              <span className="small text-secondary">{input.length} chars</span>
            </div>
            <textarea
              className="w-100 p-3 font-monospace"
              style={{ minHeight: 500, backgroundColor: "#0d1117", color: "#e6edf3", border: "none", outline: "none", resize: "vertical", fontSize: 13, lineHeight: 1.6 }}
              placeholder={'Paste your JSON here...\n\n{\n  "key": "value"\n}'}
              value={input}
              onChange={e => { setInput(e.target.value); setStatus(null); setOutput(""); }}
              onKeyDown={e => e.key === "Tab" && (e.preventDefault(), setInput(i => i + " ".repeat(indent)))}
              spellCheck={false}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="rounded-3 overflow-hidden" style={{ border: "1px solid var(--border-color, #333)" }}>
            <div className="px-3 py-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-color, #333)" }}>
              <span className="small fw-semibold text-secondary">OUTPUT</span>
              {output && <span className="small text-secondary">{output.split("\n").length} lines</span>}
            </div>
            <pre
              className="p-3 m-0 font-monospace"
              style={{ minHeight: 500, backgroundColor: "#0d1117", color: "#e6edf3", fontSize: 13, lineHeight: 1.6, overflow: "auto", whiteSpace: "pre" }}
              dangerouslySetInnerHTML={{ __html: output ? colorizeJson(output.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")) : '<span style="color:#4b5563">Output will appear here after formatting...</span>' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
