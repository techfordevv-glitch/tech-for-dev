"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaTools, FaThumbsUp, FaStar, FaSearch, FaArrowRight } from "react-icons/fa";
import { DEVTOOLS, CATEGORIES } from "@/lib/devtools-data";

export default function DevToolsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [upvotes, setUpvotes] = useState({});

  useEffect(() => {
    try { setUpvotes(JSON.parse(localStorage.getItem("devtools_upvotes") || "{}")); } catch {}
  }, []);

  const upvote = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setUpvotes((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem("devtools_upvotes", JSON.stringify(next));
      return next;
    });
  };

  const filtered = DEVTOOLS.filter((t) => {
    const matchCat = category === "All" || t.category === category;
    const matchSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-1">
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#3b82f6,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FaTools size={20} color="#fff" />
        </div>
        <div>
          <h1 className="h3 mb-0 fw-bold">Dev Tools Directory</h1>
          <p className="text-secondary mb-0" style={{ fontSize: "0.85rem" }}>Handpicked tools used by modern developers worldwide</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="d-flex gap-3 flex-wrap mt-3 mb-4">
        {[
          { label: "Total Tools", value: DEVTOOLS.length },
          { label: "Categories", value: CATEGORIES.length - 1 },
          { label: "Showing", value: filtered.length },
        ].map((s) => (
          <div key={s.label} className="px-3 py-2 rounded-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", minWidth: 90 }}>
            <div className="fw-bold" style={{ fontSize: "1.1rem", color: "#3b82f6" }}>{s.value}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + Category Filter */}
      <div className="row g-3 mb-4 align-items-start">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRight: "none", color: "var(--text-secondary)" }}>
              <FaSearch size={13} />
            </span>
            <input
              type="search"
              className="form-control"
              placeholder="Search tools, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderLeft: "none" }}
            />
          </div>
        </div>
        <div className="col">
          <div className="d-flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="btn btn-sm rounded-pill"
                style={{
                  background: category === c ? "#3b82f6" : "var(--bg-card)",
                  color: category === c ? "#fff" : "var(--text-secondary)",
                  border: "1px solid " + (category === c ? "#3b82f6" : "var(--border-color)"),
                  fontSize: "0.74rem",
                  transition: "all 0.15s",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="row g-3">
        {filtered.length === 0 && (
          <div className="col-12 text-center py-5 text-secondary">
            <FaTools size={32} className="mb-3 opacity-25" />
            <p>No tools match your search. Try a different keyword.</p>
          </div>
        )}
        {filtered.map((tool) => (
          <div key={tool.id} className="col-sm-6 col-lg-4">
            <Link href={`/devtools/${tool.id}`} className="text-decoration-none">
              <div
                className="card h-100 p-3"
                style={{ transition: "transform 0.18s, box-shadow 0.18s", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,130,246,0.13)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                {/* Top row: name + upvote */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                      <h6 className="fw-bold mb-0" style={{ color: "var(--text-primary)" }}>{tool.name}</h6>
                      {tool.badge && (
                        <span className="badge rounded-pill" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", fontSize: "0.62rem" }}>{tool.badge}</span>
                      )}
                    </div>
                    <div className="d-flex gap-1 flex-wrap">
                      <span className="badge rounded-pill" style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6", fontSize: "0.62rem" }}>{tool.category}</span>
                      <span className="badge rounded-pill" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", fontSize: "0.62rem" }}>{tool.pricing.split("/")[0]}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => upvote(tool.id, e)}
                    className="btn btn-sm p-1 rounded-circle ms-2 flex-shrink-0"
                    title="Upvote"
                    style={{
                      background: upvotes[tool.id] ? "rgba(59,130,246,0.18)" : "transparent",
                      color: upvotes[tool.id] ? "#3b82f6" : "var(--text-secondary)",
                      border: "1px solid " + (upvotes[tool.id] ? "#3b82f6" : "var(--border-color)"),
                      width: 32, height: 32,
                    }}
                  >
                    <FaThumbsUp size={11} />
                  </button>
                </div>

                {/* Tagline */}
                <p style={{ fontSize: "0.78rem", color: "#6366f1", fontStyle: "italic", marginBottom: "0.4rem" }}>{tool.tagline}</p>

                {/* Description */}
                <p className="text-secondary small mb-3" style={{ lineHeight: 1.5 }}>{tool.desc}</p>

                {/* Tags */}
                <div className="d-flex gap-1 flex-wrap mb-3">
                  {tool.tags.slice(0, 4).map((t) => (
                    <span key={t} className="badge" style={{ background: "var(--bg-primary)", color: "var(--text-secondary)", fontSize: "0.6rem", borderRadius: 6 }}>{t}</span>
                  ))}
                </div>

                {/* Bottom row */}
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div className="d-flex align-items-center gap-1">
                    <FaStar size={11} style={{ color: "#f59e0b" }} />
                    <span style={{ fontSize: "0.76rem", color: "var(--text-secondary)" }}>{tool.stars}</span>
                    {tool.stars >= 4.8 && <span style={{ fontSize: "0.6rem", color: "#10b981" }}>★ Top Rated</span>}
                  </div>
                  <span className="d-flex align-items-center gap-1" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 6, padding: "3px 10px", fontSize: "0.73rem" }}>
                    Details <FaArrowRight size={9} className="ms-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
