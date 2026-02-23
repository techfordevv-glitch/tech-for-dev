"use client";
import { useState, useCallback } from "react";
import { FaGithub, FaStar, FaCode, FaSearch, FaExternalLinkAlt, FaTag, FaSpinner, FaFire } from "react-icons/fa";

const LANGUAGES = ["Any", "JavaScript", "TypeScript", "Python", "Go", "Rust", "Java", "C++", "C#", "PHP", "Ruby", "Swift", "Kotlin", "Dart"];
const LABELS = ["good first issue", "help wanted", "beginner", "easy", "starter", "hacktoberfest"];
const CATEGORIES = ["Any", "Web", "CLI", "Library", "Framework", "DevTools", "AI/ML", "Mobile", "Database"];

const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  Go: "#00ADD8", Rust: "#dea584", Java: "#b07219", "C++": "#f34b7d",
  "C#": "#178600", PHP: "#4F5D95", Ruby: "#701516", Swift: "#FA7343",
  Kotlin: "#A97BFF", Dart: "#00B4AB",
};

export default function OpenSourceFinderPage() {
  const [lang, setLang] = useState("Any");
  const [label, setLabel] = useState("good first issue");
  const [query, setQuery] = useState("");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const search = useCallback(async (p = 1) => {
    setLoading(true); setError("");
    try {
      let q = `is:open is:issue label:"${label}"`;
      if (lang !== "Any") q += ` language:${lang}`;
      if (query) q += ` ${query}`;
      const url = `https://api.github.com/search/issues?q=${encodeURIComponent(q)}&sort=created&order=desc&per_page=12&page=${p}`;
      const res = await fetch(url, { headers: { Accept: "application/vnd.github.v3+json" } });
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const data = await res.json();
      setIssues(data.items || []);
      setTotal(data.total_count || 0);
      setPage(p);
    } catch (e) {
      setError(e.message === "GitHub API error: 403" ? "GitHub API rate limit reached. Please wait a minute and try again." : e.message);
      setIssues([]);
    } finally { setLoading(false); }
  }, [lang, label, query]);

  function timeAgo(date) {
    const s = Math.floor((new Date() - new Date(date)) / 1000);
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  }

  return (
    <div className="container py-5" style={{ maxWidth: 1100 }}>
      <div className="text-center mb-5">
        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: 64, height: 64, background: "linear-gradient(135deg, #1f2937, #374151)", border: "2px solid #4b5563" }}>
          <FaGithub size={30} color="#fff" />
        </div>
        <h1 className="fw-bold" style={{ color: "var(--text-primary)" }}>Open Source Finder</h1>
        <p className="text-secondary">Find beginner-friendly GitHub issues to start contributing to open source</p>
      </div>

      {/* Filters */}
      <div className="rounded-4 p-4 mb-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)" }}>
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label small fw-semibold text-secondary">Language</label>
            <select className="form-select border-secondary" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }} value={lang} onChange={e => setLang(e.target.value)}>
              {LANGUAGES.map(l => <option key={l} value={l} style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }}>{l}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label small fw-semibold text-secondary">Label / Difficulty</label>
            <select className="form-select border-secondary" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }} value={label} onChange={e => setLabel(e.target.value)}>
              {LABELS.map(l => <option key={l} value={l} style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }}>{l}</option>)}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-semibold text-secondary">Search (repo name / topic)</label>
            <div className="input-group">
              <input className="form-control border-secondary" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }}
                placeholder="e.g. react, nextjs, cli..." value={query} onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && search(1)} />
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 fw-bold" onClick={() => search(1)} disabled={loading}
              style={{ borderRadius: 10 }}>
              {loading ? <FaSpinner style={{ animation: "spin 1s linear infinite" }} size={14} /> : <FaSearch size={14} />}
              {loading ? "" : "Find"}
            </button>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      {total > 0 && (
        <p className="text-secondary small mb-3">
          <FaFire className="me-1 text-warning" />
          Found <strong>{total.toLocaleString()}</strong> open issues matching your filter
        </p>
      )}

      {/* Issues grid */}
      <div className="row g-3">
        {issues.map(issue => {
          const repoFull = issue.repository_url?.replace("https://api.github.com/repos/", "") || "";
          const repoName = repoFull.split("/")[1] || "";
          const owner = repoFull.split("/")[0] || "";
          const avatarUrl = `https://github.com/${owner}.png?size=32`;
          const langColor = LANG_COLORS[issue.langName] || "#6b7280";

          return (
            <div key={issue.id} className="col-md-6 col-lg-4">
              <div className="rounded-3 p-3 h-100 d-flex flex-column" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#3b82f6"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color, #333)"}
              >
                {/* Repo info */}
                <div className="d-flex align-items-center gap-2 mb-2">
                  <img src={avatarUrl} alt={owner} width={20} height={20} style={{ borderRadius: "50%" }} onError={e => e.target.style.display = "none"} />
                  <span className="small text-secondary">{repoFull}</span>
                </div>

                {/* Issue title */}
                <h6 className="fw-semibold mb-2 flex-grow-1" style={{ color: "var(--text-primary)", fontSize: 13, lineHeight: 1.5 }}>
                  {issue.title}
                </h6>

                {/* Labels */}
                <div className="d-flex flex-wrap gap-1 mb-2">
                  {issue.labels?.slice(0, 3).map(l => (
                    <span key={l.id} className="badge" style={{ backgroundColor: `#${l.color}22`, color: `#${l.color}`, border: `1px solid #${l.color}44`, fontSize: 10 }}>
                      {l.name}
                    </span>
                  ))}
                </div>

                <div className="d-flex align-items-center justify-content-between mt-auto pt-2" style={{ borderTop: "1px solid var(--border-color, #333)" }}>
                  <span className="small text-secondary">{timeAgo(issue.created_at)}</span>
                  <a href={issue.html_url} target="_blank" rel="noreferrer"
                    className="btn btn-sm d-flex align-items-center gap-1"
                    style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.25)", fontSize: 12, borderRadius: 8 }}>
                    View Issue <FaExternalLinkAlt size={9} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {issues.length === 12 && (
        <div className="d-flex justify-content-center gap-2 mt-4">
          {page > 1 && <button className="btn btn-outline-secondary" onClick={() => search(page - 1)}>← Previous</button>}
          <span className="btn btn-outline-secondary disabled">Page {page}</span>
          <button className="btn btn-outline-primary" onClick={() => search(page + 1)}>Next →</button>
        </div>
      )}

      {/* Empty state */}
      {!loading && issues.length === 0 && !error && (
        <div className="text-center py-5 text-secondary">
          <FaGithub size={50} className="mb-3 opacity-25" />
          <p>Select filters and click <strong>Find</strong> to discover beginner-friendly issues</p>
          <p className="small">Great for Hacktoberfest, resume building, and learning from real codebases</p>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
