"use client";
import { use } from "react";
import Link from "next/link";
import {
  FaTools, FaStar, FaExternalLinkAlt, FaGithub, FaArrowLeft,
  FaCheckCircle, FaTag, FaDesktop, FaDollarSign, FaLightbulb, FaCode,
} from "react-icons/fa";
import { DEVTOOLS } from "@/lib/devtools-data";

const CATEGORY_COLORS = {
  Editor: "#3b82f6",
  AI: "#8b5cf6",
  "API Testing": "#10b981",
  DevOps: "#f59e0b",
  Design: "#ec4899",
  Productivity: "#06b6d4",
  Terminal: "#14b8a6",
  Database: "#6366f1",
  Documentation: "#84cc16",
  Diagramming: "#f97316",
  Deployment: "#3b82f6",
  Runtime: "#a855f7",
  "Build Tool": "#eab308",
  Validation: "#22c55e",
  Auth: "#ef4444",
  Monitoring: "#0ea5e9",
  Notes: "#d946ef",
  "Version Control": "#64748b",
  "Package Manager": "#f97316",
  Testing: "#10b981",
};

export default function DevToolDetailPage({ params }) {
  const { id } = use(params);
  const tool = DEVTOOLS.find((t) => t.id === id);

  if (!tool) {
    return (
      <div className="container py-5 text-center">
        <FaTools size={48} className="mb-4 opacity-25" />
        <h2 className="h3 fw-bold mb-2">Tool Not Found</h2>
        <p className="text-secondary mb-4">We couldn&apos;t find a tool with that ID.</p>
        <Link href="/devtools" className="btn btn-primary rounded-pill px-4">
          <FaArrowLeft className="me-2" /> Back to Dev Tools
        </Link>
      </div>
    );
  }

  const catColor = CATEGORY_COLORS[tool.category] || "#3b82f6";
  const relatedTools = tool.related ? DEVTOOLS.filter((t) => tool.related.includes(t.id)) : [];
  const paragraphs = tool.longDesc ? tool.longDesc.split(/\n\n+/).filter(Boolean) : [tool.desc];

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <Link
            href="/devtools"
            className="btn btn-outline-primary btn-sm mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft size={12} /> Back to Dev Tools
          </Link>

          {/* Badges */}
          <div className="d-flex gap-2 flex-wrap mb-2">
            <span className="badge rounded-pill"
              style={{ background: `${catColor}25`, color: catColor, fontSize: "0.75rem", padding: "5px 12px" }}>
              {tool.category}
            </span>
            <span className="badge rounded-pill"
              style={{ background: "rgba(99,102,241,0.18)", color: "#a5b4fc", fontSize: "0.75rem", padding: "5px 12px" }}>
              {tool.pricing}
            </span>
            {tool.badge && (
              <span className="badge rounded-pill"
                style={{ background: "rgba(245,158,11,0.18)", color: "#fbbf24", fontSize: "0.75rem", padding: "5px 12px" }}>
                {tool.badge}
              </span>
            )}
          </div>

          <h1 style={{ maxWidth: 700 }}>{tool.name}</h1>
          <p className="mb-2" style={{ maxWidth: 600, fontSize: "1.05rem", fontStyle: "italic", color: catColor }}>
            {tool.tagline}
          </p>
          <p className="mb-0" style={{ maxWidth: 650, fontSize: "0.95rem" }}>
            {tool.desc}
          </p>

          {/* Stars */}
          <div className="d-flex align-items-center gap-2 mt-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <FaStar key={n} size={15}
                style={{ color: n <= Math.round(tool.stars) ? "#f59e0b" : "rgba(255,255,255,0.2)" }} />
            ))}
            <span className="fw-bold ms-1">{tool.stars}</span>
            <span style={{ opacity: 0.5, fontSize: "0.85rem" }}>/ 5.0</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row g-5">

          {/* LEFT — Main Content */}
          <div className="col-lg-8">

            {/* About */}
            <section className="mb-5">
              <h4 className="section-header">
                <span className="icon" style={{ background: `${catColor}20`, color: catColor }}>
                  <FaLightbulb />
                </span>
                About {tool.name}
              </h4>
              {paragraphs.map((para, i) => (
                <p key={i} className="text-secondary" style={{ lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1rem" }}>
                  {para}
                </p>
              ))}
            </section>

            {/* Key Features */}
            {tool.features && tool.features.length > 0 && (
              <section className="mb-5">
                <h4 className="section-header">
                  <span className="icon" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>
                    <FaCheckCircle />
                  </span>
                  Key Features
                </h4>
                <div className="row g-2">
                  {tool.features.map((feature, i) => (
                    <div key={i} className="col-sm-6">
                      <div
                        className="d-flex align-items-start gap-3 rounded-3 px-3 py-2"
                        style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                      >
                        <FaCheckCircle size={13} style={{ color: "#10b981", marginTop: 4, flexShrink: 0 }} />
                        <span style={{ fontSize: "0.87rem", color: "var(--text-primary)", lineHeight: 1.5 }}>{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tags section */}
            <section className="mb-4">
              <h4 className="section-header">
                <span className="icon" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>
                  <FaTag />
                </span>
                Tags
              </h4>
              <div className="d-flex flex-wrap gap-2">
                {tool.tags.map((t) => (
                  <span key={t} className="badge"
                    style={{ background: "var(--bg-card)", color: "var(--text-secondary)", fontSize: "0.8rem", padding: "6px 12px", border: "1px solid var(--border-color)", borderRadius: 8 }}>
                    #{t}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT — Sticky Sidebar */}
          <div className="col-lg-4">
            <div style={{ position: "sticky", top: 80 }}>

              {/* CTA Buttons */}
              <div className="p-4 rounded-3 mb-4"
                style={{ background: "var(--bg-card)", border: `1px solid ${catColor}33` }}>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-100 py-2 mb-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                  style={{ background: catColor, color: "#fff", border: "none", borderRadius: 10, fontSize: "0.9rem" }}
                >
                  <FaExternalLinkAlt size={13} /> Visit Official Site
                </a>
                {tool.github && (
                  <a
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                    style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: 10, fontSize: "0.9rem" }}
                  >
                    <FaGithub size={14} /> GitHub Repo
                  </a>
                )}
              </div>

              {/* Info Card */}
              <div className="p-4 rounded-3"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>

                {/* Pricing */}
                <div className="mb-4">
                  <h6 style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.6rem" }}>
                    <FaDollarSign className="me-1" style={{ color: "#10b981" }} /> Pricing
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {tool.pricing.split("/").map((p) => (
                      <span key={p} className="badge rounded-pill"
                        style={{ background: "rgba(16,185,129,0.14)", color: "#10b981", fontSize: "0.8rem", padding: "5px 12px" }}>
                        {p.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <hr style={{ borderColor: "var(--border-color)", opacity: 1 }} />

                {/* Platforms */}
                <div className="mb-4">
                  <h6 style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.6rem" }}>
                    <FaDesktop className="me-1" style={{ color: "#6366f1" }} /> Platforms
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {tool.platform.map((p) => (
                      <span key={p} className="badge rounded-pill"
                        style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8", fontSize: "0.8rem", padding: "5px 12px" }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <hr style={{ borderColor: "var(--border-color)", opacity: 1 }} />

                {/* Rating */}
                <div>
                  <h6 style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.6rem" }}>
                    <FaStar className="me-1" style={{ color: "#f59e0b" }} /> Rating
                  </h6>
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <FaStar key={n} size={16}
                          style={{ color: n <= Math.round(tool.stars) ? "#f59e0b" : "var(--border-color)" }} />
                      ))}
                    </div>
                    <span className="fw-bold">{tool.stars}</span>
                    <span className="text-secondary" style={{ fontSize: "0.8rem" }}>/ 5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Tools */}
        {relatedTools.length > 0 && (
          <>
            <hr className="section-divider" />
            <section>
              <h4 className="section-header">
                <span className="icon" style={{ background: `${catColor}18`, color: catColor }}>
                  <FaCode />
                </span>
                Suggested Tools
              </h4>
              <div className="row g-4">
                {relatedTools.map((rt) => {
                  const rc = CATEGORY_COLORS[rt.category] || "#3b82f6";
                  return (
                    <div key={rt.id} className="col-md-6 col-lg-4">
                      <Link href={`/devtools/${rt.id}`} className="text-decoration-none">
                        <div
                          className="card h-100 p-3"
                          style={{ transition: "transform 0.15s, box-shadow 0.15s" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = `0 8px 24px ${rc}22`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "";
                            e.currentTarget.style.boxShadow = "";
                          }}
                        >
                          <div className="d-flex align-items-start gap-3 mb-2">
                            <div style={{
                              width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                              background: `${rc}18`, display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <FaTools size={14} style={{ color: rc }} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div className="fw-semibold" style={{ color: "var(--text-primary)", fontSize: "0.9rem" }}>{rt.name}</div>
                              <span className="badge rounded-pill" style={{ background: `${rc}18`, color: rc, fontSize: "0.62rem" }}>{rt.category}</span>
                            </div>
                          </div>
                          <p className="text-secondary small mb-2" style={{ lineHeight: 1.5 }}>
                            {rt.desc.length > 90 ? rt.desc.slice(0, 90) + "…" : rt.desc}
                          </p>
                          <div className="d-flex align-items-center gap-1 mt-auto">
                            <FaStar size={11} style={{ color: "#f59e0b" }} />
                            <span style={{ fontSize: "0.76rem", color: "var(--text-secondary)" }}>{rt.stars}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
