"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { awardPoints } from "@/lib/devpoints";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaNewspaper,
  FaClock,
  FaGlobe,
  FaCalendarAlt,
  FaTag,
  FaBookOpen,
  FaShareAlt,
  FaRegLightbulb,
  FaLink,
  FaRobot,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import ShareButtons from "@/components/ShareButtons";
import ReadingProgress from "@/components/ReadingProgress";

// Derive keyword tags from title
function extractTags(title) {
  const tech = [
    "AI", "Machine Learning", "GPT", "LLM", "Cloud", "Cybersecurity", "Security",
    "Python", "JavaScript", "React", "Node", "Rust", "Go", "DevOps", "Kubernetes",
    "Docker", "GitHub", "Open Source", "Startup", "Apple", "Google", "Microsoft",
    "Meta", "OpenAI", "Android", "iOS", "5G", "Blockchain", "Crypto", "API",
    "Database", "Backend", "Frontend", "Mobile", "AR", "VR", "Quantum", "Chip",
    "Semiconductor", "Data", "Privacy", "Linux", "Windows", "Web3", "Neural",
  ];
  const t = title.toLowerCase();
  return tech.filter((kw) => t.includes(kw.toLowerCase())).slice(0, 5);
}

// Estimate reading time
function readingTime(text) {
  const words = text?.trim().split(/\s+/).length || 0;
  return Math.max(1, Math.round(words / 200));
}

// Format content into readable paragraphs
function parseContent(raw) {
  if (!raw) return [];
  // GNews appends "[+X chars]" — strip it
  const cleaned = raw.replace(/\[\+\d+ chars?\]/gi, "").trim();
  // Split on double newlines or sentences ending with "." followed by capital
  const chunks = cleaned
    .split(/\n{2,}/)
    .flatMap((p) =>
      p.length > 600
        ? p.match(/[^.!?]+[.!?]+/g)?.reduce((acc, s) => {
            const last = acc[acc.length - 1];
            if (last && last.length + s.length < 500) acc[acc.length - 1] += s;
            else acc.push(s.trim());
            return acc;
          }, []) || [p]
        : [p.trim()]
    )
    .filter((p) => p.length > 30);
  return chunks;
}

export default function NewsDetailContent() {
  const searchParams = useSearchParams();
  const [aiSummary, setAiSummary] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiExpanded, setAiExpanded] = useState(false);

  const title      = searchParams.get("title")   || "";
  const description= searchParams.get("desc")    || "";

  // Award dev points on article read
  useEffect(() => {
    if (title) awardPoints("article_read", 5);
  }, [title]);
  const content    = searchParams.get("content") || "";
  const url        = searchParams.get("url")     || "";
  const image      = searchParams.get("image")   || "";
  const source     = searchParams.get("source")  || "";
  const publishedAt= searchParams.get("date")    || "";

  if (!title) {
    return (
      <div className="container py-5 text-center">
        <FaNewspaper size={60} className="mb-3 opacity-25" />
        <h3>Article not found</h3>
        <p className="text-secondary">The news article you&apos;re looking for is unavailable.</p>
        <Link href="/news" className="btn btn-primary mt-3">Back to News</Link>
      </div>
    );
  }

  const publishDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "";
  const publishTime = publishedAt
    ? new Date(publishedAt).toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit",
      })
    : "";

  const timeAgoStr = (() => {
    if (!publishedAt) return "";
    const s = Math.floor((new Date() - new Date(publishedAt)) / 1000);
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
    return publishDate;
  })();

  const domain = url ? (() => { try { return new URL(url).hostname.replace("www.", ""); } catch { return ""; } })() : "";
  const tags = extractTags(title + " " + description);
  const fullText = [description, content].filter(Boolean).join(" ");
  const readMins = readingTime(fullText);
  const contentParagraphs = parseContent(content && content !== description ? content : "");
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=32` : null;

  async function fetchAiSummary() {
    if (aiSummary) { setAiExpanded(!aiExpanded); return; }
    setAiLoading(true);
    setAiExpanded(true);
    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, content }),
      });
      const data = await res.json();
      setAiSummary(data.summary || "Could not generate summary.");
    } catch {
      setAiSummary("Failed to fetch AI summary. Please try again.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <>
      <ReadingProgress />

      {/* ── HERO BANNER ── */}
      <div
        style={{
          position: "relative",
          minHeight: image ? 340 : 180,
          overflow: "hidden",
          background: image
            ? "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)"
            : "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.12) 100%)",
        }}
      >
        {image && (
          <img
            src={image}
            alt={title}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", zIndex: 0, filter: "brightness(0.45)",
            }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
        <div className="container py-4 py-lg-5" style={{ position: "relative", zIndex: 1 }}>
          <Link
            href="/news"
            className="btn btn-sm mb-4 d-inline-flex align-items-center gap-2"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
          >
            <FaArrowLeft size={11} /> Back to News
          </Link>

          {/* Source + time row */}
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
            <span
              className="badge d-flex align-items-center gap-1 px-3 py-2"
              style={{ backgroundColor: "#3b82f6", fontSize: 12 }}
            >
              {faviconUrl && (
                <img src={faviconUrl} alt="" width={14} height={14} style={{ borderRadius: 2 }}
                  onError={(e) => { e.target.style.display = "none"; }} />
              )}
              {source || "Tech News"}
            </span>
            {timeAgoStr && (
              <span className="small d-flex align-items-center gap-1" style={{ color: "rgba(255,255,255,0.75)" }}>
                <FaClock size={10} /> {timeAgoStr}
              </span>
            )}
            <span className="small d-flex align-items-center gap-1" style={{ color: "rgba(255,255,255,0.75)" }}>
              <FaBookOpen size={10} /> {readMins} min read
            </span>
          </div>

          <h1
            className="fw-bold lh-sm"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", color: image ? "#fff" : "var(--text-primary)", maxWidth: 820 }}
          >
            {title}
          </h1>

          {publishDate && (
            <p className="small mt-2 mb-0 d-flex align-items-center gap-1" style={{ color: "rgba(255,255,255,0.65)" }}>
              <FaCalendarAlt size={10} /> {publishDate}{publishTime && ` at ${publishTime}`}
            </p>
          )}
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div className="container py-4 py-lg-5">
        <div className="row g-4 g-lg-5">

          {/* ── LEFT CONTENT ── */}
          <div className="col-lg-8">

            {/* Summary card */}
            <div
              className="rounded-3 p-4 mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.07) 100%)",
                border: "1px solid rgba(59,130,246,0.18)",
                borderLeft: "4px solid #3b82f6",
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaRegLightbulb className="text-primary" size={14} />
                <span className="fw-bold small text-uppercase" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}>
                  Quick Summary
                </span>
              </div>
              <p className="mb-0" style={{ fontSize: "1.08rem", lineHeight: 1.85, color: "var(--text-primary)" }}>
                {description}
              </p>
            </div>

            {/* AI Summarizer */}
            <div className="mb-4">
              <button
                className="btn btn-sm d-flex align-items-center gap-2 w-100 justify-content-between"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.12) 100%)",
                  border: "1px solid rgba(139,92,246,0.35)",
                  color: "var(--text-primary)",
                  borderRadius: aiExpanded ? "10px 10px 0 0" : 10,
                  padding: "10px 16px",
                }}
                onClick={fetchAiSummary}
              >
                <span className="d-flex align-items-center gap-2 fw-semibold">
                  <FaRobot size={14} style={{ color: "#a855f7" }} />
                  Summarize with AI
                </span>
                {aiLoading
                  ? <span className="spinner-border spinner-border-sm" style={{ color: "#a855f7" }} />
                  : aiExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
                }
              </button>
              {aiExpanded && (
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(59,130,246,0.06) 100%)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    borderTop: "none",
                    borderRadius: "0 0 10px 10px",
                    padding: "16px",
                  }}
                >
                  {aiLoading ? (
                    <div className="d-flex align-items-center gap-2 text-secondary small">
                      <span className="spinner-border spinner-border-sm" />
                      Generating AI summary...
                    </div>
                  ) : (
                    <div>
                      {aiSummary?.split("\n").filter(Boolean).map((line, i) => (
                        <p key={i} className="mb-2 small" style={{ lineHeight: 1.75, color: "var(--text-secondary)" }}>
                          {line}
                        </p>
                      ))}
                      <p className="mb-0 mt-2" style={{ fontSize: 11, color: "var(--text-secondary)", opacity: 0.6 }}>
                        ✨ AI-generated summary via Groq LLaMA 3
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Full content */}
            {contentParagraphs.length > 0 && (
              <article className="mb-4">
                <h4 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <FaBookOpen className="text-primary" size={16} /> Full Story
                </h4>
                <div style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "var(--text-secondary)" }}>
                  {contentParagraphs.map((para, i) => (
                    <p key={i} style={{ marginBottom: "1.25rem" }}>
                      {i === 0
                        ? <><span style={{ fontSize: "1.5em", fontWeight: 700, float: "left", lineHeight: 1, marginRight: 6, color: "var(--text-primary)" }}>
                            {para.charAt(0)}
                          </span>{para.slice(1)}</>
                        : para
                      }
                    </p>
                  ))}
                </div>
              </article>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mb-4 d-flex flex-wrap align-items-center gap-2">
                <FaTag size={13} className="text-secondary" />
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge"
                    style={{ backgroundColor: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border-color, #333)", fontSize: 12, padding: "5px 10px" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <div
              className="rounded-3 p-3 mb-4 d-flex align-items-center gap-3 flex-wrap"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)" }}
            >
              <span className="small fw-semibold d-flex align-items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                <FaShareAlt size={12} /> Share this article
              </span>
              <ShareButtons url={url} title={title} description={description} />
            </div>

            {/* Read Full Article CTA */}
            <div
              className="rounded-3 p-4 text-center mb-2"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                style={{ width: 52, height: 52, backgroundColor: "rgba(59,130,246,0.12)" }}
              >
                <FaGlobe size={22} className="text-primary" />
              </div>
              <h5 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>Continue Reading</h5>
              <p className="text-secondary small mb-3">
                This is a preview. Read the complete article with all details, images, and comments on{" "}
                <strong style={{ color: "var(--text-primary)" }}>{source || domain || "the source"}</strong>.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary px-5 py-2 fw-semibold d-inline-flex align-items-center gap-2"
              >
                Read Full Article <FaExternalLinkAlt size={11} />
              </a>
              {domain && (
                <p className="small mt-2 mb-0 d-flex align-items-center justify-content-center gap-1 text-secondary">
                  <FaLink size={10} /> {domain}
                </p>
              )}
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-lg-4">
            <div style={{ position: "sticky", top: 84 }}>

              {/* Article meta card */}
              <div
                className="rounded-3 p-4 mb-3"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)" }}
              >
                <h6 className="fw-bold text-uppercase small mb-3" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}>
                  Article Info
                </h6>

                {[
                  {
                    icon: <FaNewspaper className="text-primary" size={14} />,
                    label: "Source",
                    value: source || "Unknown",
                    bold: true,
                  },
                  domain && {
                    icon: <FaGlobe className="text-info" size={14} />,
                    label: "Website",
                    value: domain,
                  },
                  publishDate && {
                    icon: <FaCalendarAlt className="text-warning" size={14} />,
                    label: "Published",
                    value: publishDate,
                  },
                  publishTime && {
                    icon: <FaClock className="text-success" size={14} />,
                    label: "Time",
                    value: publishTime,
                  },
                  {
                    icon: <FaBookOpen className="text-secondary" size={14} />,
                    label: "Reading Time",
                    value: `~${readMins} min`,
                  },
                ].filter(Boolean).map((row, i, arr) => (
                  <div
                    key={row.label}
                    className="d-flex align-items-start gap-2 py-2"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border-color, #2a2a2a)" : "none" }}
                  >
                    <span className="mt-1 flex-shrink-0">{row.icon}</span>
                    <div>
                      <div className="text-secondary" style={{ fontSize: 11 }}>{row.label}</div>
                      <div className={`small ${row.bold ? "fw-bold" : ""}`} style={{ color: "var(--text-primary)" }}>
                        {row.value}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-3">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  >
                    Read Full Article <FaExternalLinkAlt size={11} />
                  </a>
                </div>
              </div>

              {/* Tags sidebar */}
              {tags.length > 0 && (
                <div
                  className="rounded-3 p-4 mb-3"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)" }}
                >
                  <h6 className="fw-bold text-uppercase small mb-3" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}>
                    Topics
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge"
                        style={{ backgroundColor: "rgba(59,130,246,0.12)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.25)", fontSize: 12, padding: "5px 10px" }}
                      >
                        # {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share sidebar */}
              <div
                className="rounded-3 p-4"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)" }}
              >
                <h6 className="fw-bold text-uppercase small mb-3" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}>
                  Share
                </h6>
                <ShareButtons url={url} title={title} description={description} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
