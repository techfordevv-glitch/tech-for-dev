import Link from "next/link";
import {
  FaBolt,
  FaCode,
  FaBrain,
  FaNewspaper,
  FaRocket,
  FaStar,
  FaUsers,
  FaGlobe,
  FaShieldAlt,
  FaSync,
  FaHeart,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaLaptopCode,
  FaChartLine,
  FaLayerGroup,
  FaMobileAlt,
  FaBookOpen,
  FaVideo,
  FaBriefcase,
  FaPodcast,
  FaStackOverflow,
  FaReddit,
  FaArrowRight,
  FaCheckCircle,
  FaUserShield,
} from "react-icons/fa";

export const metadata = {
  title: "About TechForDev",
  description: "TechForDev is a free, open developer hub aggregating tech news, AI tools, open-source projects, remote jobs, dev articles, podcasts, and more. Built by Md Mijanur Molla.",
  keywords: ["about TechForDev", "developer hub", "tech platform", "Md Mijanur Molla", "free developer tools", "tech aggregator"],
  openGraph: {
    title: "About TechForDev — Free Developer Hub",
    description: "Meet the team behind TechForDev — a free, always-updated platform for developers.",
    type: "profile",
    url: "/about",
    images: [{ url: "/api/og?title=About+TechForDev&desc=Free+open+developer+hub", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TechForDev — Free Developer Hub",
    description: "Meet the team behind TechForDev — free, open platform for developers.",
  },
  alternates: { canonical: "/about" },
};

const features = [
  { icon: <FaNewspaper />, color: "#3b82f6", title: "Tech News", desc: "Real-time tech headlines from top sources via GNews API, auto-updated every 30 minutes." },
  { icon: <FaBrain />, color: "#8b5cf6", title: "AI Tools & Models", desc: "Curated AI tools directory + Hugging Face model explorer with 100k+ models across all pipelines." },
  { icon: <FaCode />, color: "#f59e0b", title: "Free APIs", desc: "59+ curated public APIs across 12 categories with Quick Start code snippets and auth guides." },
  { icon: <FaBookOpen />, color: "#10b981", title: "Dev Articles", desc: "Developer articles from Dev.to, fully rendered with code highlighting and reading time estimates." },
  { icon: <FaRocket />, color: "#ef4444", title: "GitHub Projects", desc: "Trending open-source projects from GitHub, updated daily with stars, forks and contributor info." },
  { icon: <FaVideo />, color: "#dc2626", title: "Tech Videos", desc: "Curated YouTube tech tutorials and channels, playable directly inside the platform." },
  { icon: <FaBriefcase />, color: "#0ea5e9", title: "Remote Jobs", desc: "Latest remote developer job listings aggregated from top job boards worldwide." },
  { icon: <FaPodcast />, color: "#f97316", title: "Podcasts", desc: "Tech podcast discovery via iTunes API with episode listings and direct listening links." },
  { icon: <FaReddit />, color: "#ff6314", title: "Reddit Tech", desc: "Hot posts from r/programming, r/technology and other top tech subreddits." },
  { icon: <FaStackOverflow />, color: "#f59e0b", title: "Stack Overflow", desc: "Trending developer Q&A threads from Stack Overflow's top questions feed." },
  { icon: <FaMobileAlt />, color: "#6366f1", title: "PWA Support", desc: "Installable as a Progressive Web App on any device — works offline with service worker caching." },
  { icon: <FaLayerGroup />, color: "#14b8a6", title: "Dashboard", desc: "Personalized dashboard with saved items, reading history and custom preferences." },
];

const stats = [
  { value: "12+", label: "Content Categories" },
  { value: "59+", label: "Curated APIs" },
  { value: "100k+", label: "AI Models" },
  { value: "30 min", label: "Update Interval" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.1) 50%, rgba(16,185,129,0.08) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container py-5">
          <div className="text-center" style={{ maxWidth: 720, margin: "0 auto" }}>
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
              style={{ width: 72, height: 72, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            >
              <FaBolt size={32} color="#fff" />
            </div>
            <h1 className="fw-bold mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text-primary)" }}>
              About TechForDev
            </h1>
            <p style={{ fontSize: "1.15rem", lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "2rem" }}>
              TechForDev is your all-in-one developer hub — aggregating tech news, AI tools, open-source projects,
              articles, videos, jobs and more into a single, beautiful, always-updated platform.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link href="/" className="btn btn-primary px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                <FaRocket size={13} /> Explore Platform
              </Link>
              <Link href="/dashboard" className="btn btn-outline-secondary px-4 py-2 d-inline-flex align-items-center gap-2">
                <FaChartLine size={13} /> Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">

        {/* ── STATS ── */}
        <div className="row g-3 mb-5">
          {stats.map((s) => (
            <div key={s.label} className="col-6 col-lg-3">
              <div
                className="rounded-3 p-4 text-center"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #222)" }}
              >
                <div className="fw-bold mb-1" style={{ fontSize: "2rem", color: "#3b82f6" }}>{s.value}</div>
                <div className="small text-secondary">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── MISSION ── */}
        <div className="row g-4 mb-5 align-items-center">
          <div className="col-lg-6">
            <span className="badge mb-3 px-3 py-2" style={{ backgroundColor: "rgba(59,130,246,0.12)", color: "#3b82f6", fontSize: 12 }}>
              🎯 Our Mission
            </span>
            <h2 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
              One hub for every developer
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.85, fontSize: "1.05rem" }}>
              Developers waste hours jumping between dozens of tabs — HackerNews, Reddit, Dev.to, GitHub, YouTube, job boards, AI tool sites.
              TechForDev solves that by aggregating everything in one fast, clean, always-updated platform.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.85, fontSize: "1.05rem" }}>
              Every section automatically pulls fresh content from top APIs — so you never miss what matters. No manual curation. No stale links.
            </p>
            <div className="d-flex flex-column gap-2 mt-4">
              {["Auto-updated every 30 minutes via live APIs", "Zero login required — open and free", "Bookmark, save and track your reading", "Dark & light mode, PWA installable"].map((item) => (
                <div key={item} className="d-flex align-items-center gap-2">
                  <FaCheckCircle className="text-success flex-shrink-0" size={14} />
                  <span className="small" style={{ color: "var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="rounded-3 p-4"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.07) 100%)",
                border: "1px solid rgba(59,130,246,0.15)",
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaShieldAlt className="text-primary" size={16} />
                <span className="fw-bold" style={{ color: "var(--text-primary)" }}>Platform Values</span>
              </div>
              {[
                { icon: <FaSync className="text-info" />, title: "Always Fresh", desc: "Live API feeds with ISR caching — content stays current without manual updates." },
                { icon: <FaGlobe className="text-success" />, title: "Open & Accessible", desc: "No paywalls, no signups. Everything is free and accessible to every developer." },
                { icon: <FaHeart className="text-danger" />, title: "Developer First", desc: "Built by a developer, for developers. Every feature solves a real pain point." },
                { icon: <FaStar className="text-warning" />, title: "Quality Curated", desc: "Best-in-class sources selected — no spam, no clickbait, no low quality content." },
              ].map((item) => (
                <div key={item.title} className="d-flex gap-3 mb-3">
                  <span className="mt-1 flex-shrink-0 fs-5">{item.icon}</span>
                  <div>
                    <div className="fw-semibold small mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</div>
                    <div className="small" style={{ color: "var(--text-secondary)" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FEATURES GRID ── */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <span className="badge mb-3 px-3 py-2" style={{ backgroundColor: "rgba(139,92,246,0.12)", color: "#8b5cf6", fontSize: 12 }}>
              ⚡ Features
            </span>
            <h2 className="fw-bold" style={{ color: "var(--text-primary)" }}>Everything in one place</h2>
            <p className="text-secondary">12 content categories, all auto-updated from the best sources on the web.</p>
          </div>
          <div className="row g-3">
            {features.map((f) => (
              <div key={f.title} className="col-sm-6 col-lg-4 col-xl-3">
                <div
                  className="rounded-3 p-3 h-100"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #222)", transition: "border-color 0.2s" }}
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded mb-2"
                    style={{ width: 36, height: 36, backgroundColor: `${f.color}18`, color: f.color, fontSize: 16 }}
                  >
                    {f.icon}
                  </div>
                  <div className="fw-semibold small mb-1" style={{ color: "var(--text-primary)" }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PLATFORM ADMIN ── */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <span className="badge mb-3 px-3 py-2" style={{ backgroundColor: "rgba(251,191,36,0.12)", color: "#fbbf24", fontSize: 12 }}>
              👤 Platform Admin
            </span>
            <h2 className="fw-bold" style={{ color: "var(--text-primary)" }}>The person behind TechForDev</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="rounded-4 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  boxShadow: "0 8px 40px rgba(59,130,246,0.1)",
                }}
              >
                {/* Top bar */}
                <div
                  style={{
                    height: 6,
                    background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981)",
                  }}
                />

                <div className="p-4 p-lg-5">
                  <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">

                    {/* Profile pic */}
                    <div className="flex-shrink-0 text-center">
                      <div
                        className="rounded-circle overflow-hidden mx-auto"
                        style={{
                          width: 130,
                          height: 130,
                          border: "3px solid rgba(59,130,246,0.4)",
                          boxShadow: "0 0 0 6px rgba(59,130,246,0.08)",
                        }}
                      >
                        <img
                          src="https://media.geeksforgeeks.org/auth/profile/fi1t8nnyh9spuyq9w9oy"
                          alt="Md Mijanur Molla"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      {/* Admin badge */}
                      <div
                        className="d-inline-flex align-items-center gap-1 rounded-pill px-3 py-1 mt-3"
                        style={{ backgroundColor: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", fontSize: 12 }}
                      >
                        <FaUserShield size={11} /> Platform Admin
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-grow-1 text-center text-md-start">
                      <h3 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>
                        Md Mijanur Molla
                      </h3>
                      <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3">
                        <FaLaptopCode className="text-primary" size={14} />
                        <span className="fw-semibold" style={{ color: "#3b82f6" }}>Software Engineer</span>
                      </div>

                      <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.02rem" }}>
                        Passionate full-stack developer and tech enthusiast who built TechForDev from the ground up.
                        With a deep love for open-source, AI, and the developer community, TechForDev was created to give
                        every developer a single go-to place for everything tech — without the noise.
                      </p>

                      <div className="row g-2 mt-3">
                        {[
                          { icon: <FaCode />, label: "Full-Stack Dev", color: "#3b82f6" },
                          { icon: <FaBrain />, label: "AI Enthusiast", color: "#8b5cf6" },
                          { icon: <FaRocket />, label: "Open Source", color: "#10b981" },
                          { icon: <FaUsers />, label: "Community Builder", color: "#f59e0b" },
                        ].map((badge) => (
                          <div key={badge.label} className="col-auto">
                            <span
                              className="d-inline-flex align-items-center gap-1 rounded-pill px-3 py-1 small"
                              style={{ backgroundColor: `${badge.color}18`, color: badge.color, border: `1px solid ${badge.color}30`, fontSize: 12 }}
                            >
                              {badge.icon} {badge.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="d-flex gap-2 mt-4 justify-content-center justify-content-md-start flex-wrap">
                        <a
                          href="https://github.com"
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm d-inline-flex align-items-center gap-2"
                          style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "var(--text-primary)", border: "1px solid var(--border-color, #333)" }}
                        >
                          <FaGithub size={13} /> GitHub
                        </a>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm d-inline-flex align-items-center gap-2"
                          style={{ backgroundColor: "rgba(10,102,194,0.12)", color: "#0a85d1", border: "1px solid rgba(10,102,194,0.25)" }}
                        >
                          <FaLinkedin size={13} /> LinkedIn
                        </a>
                        <a
                          href="mailto:contact@techfordev.dev"
                          className="btn btn-sm d-inline-flex align-items-center gap-2"
                          style={{ backgroundColor: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}
                        >
                          <FaEnvelope size={13} /> Contact
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA BOTTOM ── */}
        <div
          className="rounded-4 p-5 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)",
            border: "1px solid rgba(59,130,246,0.18)",
          }}
        >
          <FaRocket size={36} className="text-primary mb-3" />
          <h3 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>Ready to explore?</h3>
          <p className="text-secondary mb-4">
            Dive into the latest tech news, explore AI models, discover open-source projects and more.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link href="/" className="btn btn-primary px-5 py-2 fw-semibold d-inline-flex align-items-center gap-2">
              Get Started <FaArrowRight size={12} />
            </Link>
            <Link href="/news" className="btn btn-outline-secondary px-4 py-2 d-inline-flex align-items-center gap-2">
              <FaNewspaper size={12} /> Latest News
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
