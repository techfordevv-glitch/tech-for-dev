"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaYoutube,
  FaEye,
  FaClock,
  FaUser,
  FaPlay,
  FaShareAlt,
  FaTag,
  FaLightbulb,
  FaCheckCircle,
  FaSubscript,
  FaRss,
  FaBookmark,
  FaChartBar,
} from "react-icons/fa";
import ShareButtons from "@/components/ShareButtons";
import BookmarkButton from "@/components/BookmarkButton";
import ReadingProgress from "@/components/ReadingProgress";

// Extract topic tags from title + description
function extractTags(text) {
  const keywords = [
    "React", "Next.js", "JavaScript", "TypeScript", "Python", "Node.js", "Vue",
    "Angular", "CSS", "HTML", "Tailwind", "Bootstrap", "AI", "Machine Learning",
    "GPT", "LLM", "API", "REST", "GraphQL", "Docker", "Kubernetes", "DevOps",
    "AWS", "Cloud", "Git", "GitHub", "Linux", "Rust", "Go", "Swift", "Kotlin",
    "Android", "iOS", "Flutter", "MongoDB", "PostgreSQL", "Redis", "SQL",
    "Security", "Blockchain", "Web3", "Open Source", "Tutorial", "Crash Course",
    "TanStack", "Vite", "Webpack", "Bun", "Deno", "C++", "Java", "SaaS",
  ];
  const t = text.toLowerCase();
  return keywords.filter((k) => t.includes(k.toLowerCase())).slice(0, 6);
}

// Split description into readable paragraphs
function formatDescription(raw) {
  if (!raw) return [];
  return raw
    .split(/\n{2,}|\n(?=[A-Z])/)
    .map((p) => p.trim())
    .filter((p) => p.length > 20)
    .slice(0, 8);
}

// Generate "what you'll learn" bullet points from description / title
function getLearnPoints(title, desc) {
  const lines = desc
    .split(/\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith("✅") || l.startsWith("•") || l.startsWith("-") || l.startsWith("▸") || l.match(/^\d+\./));
  if (lines.length >= 2) return lines.slice(0, 6).map((l) => l.replace(/^[-•✅▸\d+\.]\s*/, "").trim());

  // fallback: generate from title keywords
  const map = {
    tutorial: ["Step-by-step hands-on walkthrough", "Real-world code examples", "Best practices explained"],
    "crash course": ["Full overview in minimal time", "Core concepts covered fast", "Quick-start friendly"],
    react: ["Component structure & hooks", "State management patterns", "React best practices"],
    "next.js": ["App Router & routing patterns", "Server vs Client components", "Deployment strategies"],
    python: ["Python syntax & features", "Practical coding examples", "Libraries & tools overview"],
    docker: ["Container basics explained", "Docker compose setup", "Image & volume management"],
    ai: ["AI concepts simplified", "Practical AI use cases", "Tools & frameworks overview"],
    llm: ["Large Language Model concepts", "Prompt engineering tips", "Integration patterns"],
  };
  const t = title.toLowerCase();
  for (const [key, vals] of Object.entries(map)) {
    if (t.includes(key)) return vals;
  }
  return ["Core concepts explained clearly", "Practical examples included", "Watch and learn at your own pace"];
}

export default function VideoDetailContent() {
  const searchParams = useSearchParams();

  const videoId       = searchParams.get("v")         || "";
  const title         = searchParams.get("title")      || "";
  const author        = searchParams.get("author")     || "";
  const authorId      = searchParams.get("authorId")   || "";
  const description   = searchParams.get("desc")       || "";
  const viewCount     = searchParams.get("views")      || "0";
  const lengthSeconds = searchParams.get("length")     || "0";
  const publishedText = searchParams.get("published")  || "";

  if (!videoId || !title) {
    return (
      <div className="container py-5 text-center">
        <FaYoutube size={60} className="mb-3 opacity-25" />
        <h3>Video not found</h3>
        <p className="text-secondary">The video you&apos;re looking for is unavailable.</p>
        <Link href="/videos" className="btn btn-danger mt-3">Back to Videos</Link>
      </div>
    );
  }

  const youtubeUrl  = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl    = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  const channelUrl  = authorId ? `https://www.youtube.com/channel/${authorId}` : `https://www.youtube.com/@${author}`;

  const formatDuration = (s) => {
    const sec = Number(s);
    if (!sec) return null;
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const ss = sec % 60;
    return h > 0
      ? `${h}:${m.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}`
      : `${m}:${ss.toString().padStart(2, "0")}`;
  };

  const formatViews = (v) => {
    const n = Number(v);
    if (!n) return typeof v === "string" ? v : "—";
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toLocaleString();
  };

  const duration      = formatDuration(lengthSeconds);
  const tags          = extractTags(title + " " + description);
  const descParagraphs= formatDescription(description);
  const learnPoints   = getLearnPoints(title, description);
  const channelInitial= author ? author.charAt(0).toUpperCase() : "Y";

  return (
    <>
      <ReadingProgress />

      {/* ── HERO STRIP ── */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(30,30,30,0.95) 60%)",
          borderBottom: "1px solid rgba(220,38,38,0.15)",
        }}
      >
        <div className="container py-4">
          <Link
            href="/videos"
            className="btn btn-sm mb-3 d-inline-flex align-items-center gap-2"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "#ccc", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <FaArrowLeft size={11} /> Back to Videos
          </Link>

          <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
            <span className="badge px-3 py-2 d-flex align-items-center gap-1" style={{ backgroundColor: "#dc2626", fontSize: 12 }}>
              <FaYoutube size={13} /> YouTube
            </span>
            {publishedText && (
              <span className="small text-secondary d-flex align-items-center gap-1">
                <FaClock size={10} /> {publishedText}
              </span>
            )}
            {duration && (
              <span className="small text-secondary d-flex align-items-center gap-1">
                <FaPlay size={9} /> {duration}
              </span>
            )}
          </div>

          <h1
            className="fw-bold lh-sm mb-2"
            style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", color: "var(--text-primary)", maxWidth: 860 }}
          >
            {title}
          </h1>

          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle fw-bold text-white"
              style={{ width: 28, height: 28, background: "#dc2626", fontSize: 13, flexShrink: 0 }}
            >
              {channelInitial}
            </div>
            <span className="fw-semibold" style={{ color: "var(--text-primary)" }}>{author}</span>
            {Number(viewCount) > 0 && (
              <span className="ms-2 small text-secondary d-flex align-items-center gap-1">
                <FaEye size={11} /> {formatViews(viewCount)} views
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div className="container py-4 py-lg-5">
        <div className="row g-4 g-lg-5">

          {/* ── LEFT COLUMN ── */}
          <div className="col-lg-8">

            {/* ▶ Embedded Player */}
            <div
              className="rounded-3 overflow-hidden mb-4"
              style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000", boxShadow: "0 8px 40px rgba(220,38,38,0.18)" }}
            >
              <iframe
                src={embedUrl}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              />
            </div>

            {/* ✅ What You'll Learn */}
            <div
              className="rounded-3 p-4 mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(220,38,38,0.06) 0%, rgba(30,30,30,0.6) 100%)",
                border: "1px solid rgba(220,38,38,0.18)",
                borderLeft: "4px solid #dc2626",
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaLightbulb className="text-warning" size={15} />
                <span className="fw-bold text-uppercase small" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}>
                  What You&apos;ll Learn
                </span>
              </div>
              <div className="row g-2">
                {learnPoints.map((point, i) => (
                  <div key={i} className="col-12 col-sm-6">
                    <div className="d-flex align-items-start gap-2">
                      <FaCheckCircle className="text-danger mt-1 flex-shrink-0" size={13} />
                      <span className="small" style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>{point}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 📄 About This Video */}
            {descParagraphs.length > 0 && (
              <div className="mb-4">
                <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded"
                    style={{ width: 28, height: 28, backgroundColor: "rgba(220,38,38,0.12)" }}
                  >
                    <FaPlay className="text-danger" size={11} />
                  </span>
                  About This Video
                </h5>
                <div
                  className="rounded-3 p-4"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #2a2a2a)" }}
                >
                  {descParagraphs.map((para, i) => (
                    <p
                      key={i}
                      className="mb-3"
                      style={{
                        fontSize: "1.02rem",
                        lineHeight: 1.85,
                        color: "var(--text-secondary)",
                        marginBottom: i === descParagraphs.length - 1 ? 0 : undefined,
                      }}
                    >
                      {i === 0
                        ? <><span style={{ fontSize: "1.45em", fontWeight: 700, float: "left", lineHeight: 1, marginRight: 5, color: "#dc2626" }}>{para.charAt(0)}</span>{para.slice(1)}</>
                        : para
                      }
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* 🏷 Tags */}
            {tags.length > 0 && (
              <div className="mb-4 d-flex flex-wrap align-items-center gap-2">
                <FaTag size={12} className="text-secondary" />
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge"
                    style={{ backgroundColor: "rgba(220,38,38,0.1)", color: "#f87171", border: "1px solid rgba(220,38,38,0.25)", fontSize: 12, padding: "5px 10px" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* 📤 Share Row */}
            <div
              className="rounded-3 p-3 mb-4 d-flex align-items-center gap-3 flex-wrap"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #2a2a2a)" }}
            >
              <span className="small fw-semibold d-flex align-items-center gap-2 text-secondary">
                <FaShareAlt size={12} /> Share this video
              </span>
              <ShareButtons url={youtubeUrl} title={title} description={`Watch "${title}" by ${author} on YouTube`} />
            </div>

            {/* 🔴 Watch on YouTube CTA */}
            <div
              className="rounded-3 p-4 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(220,38,38,0.04) 100%)",
                border: "1px solid rgba(220,38,38,0.2)",
              }}
            >
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                style={{ width: 54, height: 54, backgroundColor: "#dc2626" }}
              >
                <FaYoutube size={24} color="#fff" />
              </div>
              <h5 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>Watch on YouTube</h5>
              <p className="text-secondary small mb-3">
                Like, comment, subscribe and support <strong style={{ color: "var(--text-primary)" }}>{author}</strong> on YouTube.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-danger px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
                >
                  <FaPlay size={12} /> Watch Now
                </a>
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-danger px-4 py-2 d-inline-flex align-items-center gap-2"
                >
                  Visit Channel <FaExternalLinkAlt size={11} />
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-lg-4">
            <div style={{ position: "sticky", top: 84 }}>

              {/* Channel Card */}
              <div
                className="rounded-3 p-4 mb-3"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #2a2a2a)" }}
              >
                <h6 className="fw-bold text-uppercase small mb-3" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}>
                  Channel
                </h6>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle fw-bold text-white flex-shrink-0"
                    style={{ width: 46, height: 46, background: "linear-gradient(135deg, #dc2626, #991b1b)", fontSize: 18 }}
                  >
                    {channelInitial}
                  </div>
                  <div>
                    <div className="fw-bold" style={{ color: "var(--text-primary)" }}>{author}</div>
                    <div className="small text-secondary d-flex align-items-center gap-1">
                      <FaYoutube size={11} className="text-danger" /> YouTube Channel
                    </div>
                  </div>
                </div>
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <FaRss size={11} /> Visit Channel
                </a>
              </div>

              {/* Video Stats */}
              <div
                className="rounded-3 p-4 mb-3"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #2a2a2a)" }}
              >
                <h6 className="fw-bold text-uppercase small mb-3" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}>
                  Video Stats
                </h6>
                {[
                  Number(viewCount) > 0 && { icon: <FaEye className="text-info" size={14} />, label: "Views", value: formatViews(viewCount) + " views" },
                  duration && { icon: <FaClock className="text-warning" size={14} />, label: "Duration", value: duration },
                  publishedText && { icon: <FaChartBar className="text-success" size={14} />, label: "Published", value: publishedText },
                ].filter(Boolean).map((row, i, arr) => (
                  <div
                    key={row.label}
                    className="d-flex align-items-center gap-3 py-2"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border-color, #2a2a2a)" : "none" }}
                  >
                    <span className="flex-shrink-0">{row.icon}</span>
                    <div>
                      <div className="text-secondary" style={{ fontSize: 11 }}>{row.label}</div>
                      <div className="small fw-semibold" style={{ color: "var(--text-primary)" }}>{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Topics */}
              {tags.length > 0 && (
                <div
                  className="rounded-3 p-4 mb-3"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #2a2a2a)" }}
                >
                  <h6 className="fw-bold text-uppercase small mb-3" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}>
                    Topics
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge"
                        style={{ backgroundColor: "rgba(220,38,38,0.1)", color: "#f87171", border: "1px solid rgba(220,38,38,0.2)", fontSize: 12, padding: "5px 9px" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div
                className="rounded-3 p-4"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #2a2a2a)" }}
              >
                <h6 className="fw-bold text-uppercase small mb-3" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}>
                  Actions
                </h6>
                <div className="d-grid gap-2">
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-danger py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaPlay size={12} /> Watch on YouTube
                  </a>
                  <BookmarkButton
                    item={{ id: videoId, type: "video", title, description: author, url: youtubeUrl }}
                  />
                  <Link
                    href="/videos"
                    className="btn btn-outline-secondary py-2 d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaArrowLeft size={11} /> More Videos
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
