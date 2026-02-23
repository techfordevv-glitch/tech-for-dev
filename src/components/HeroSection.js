"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaNewspaper, FaRobot, FaGithub, FaYoutube, FaBriefcase,
  FaMicrophone, FaReddit, FaCode, FaArrowRight, FaBolt,
  FaStackOverflow, FaTerminal, FaCircle, FaLayerGroup,
} from "react-icons/fa";

const WORDS = ["Tech News", "AI Tools", "Open Source", "Remote Jobs", "Dev Articles", "Tech Videos"];

const STATS = [
  { target: 30,  suffix: "+", label: "AI Tools",   color: "#8b5cf6" },
  { target: 12,  suffix: "+", label: "Categories", color: "#3b82f6" },
  { target: 59,  suffix: "+", label: "Free APIs",  color: "#06b6d4" },
  { target: 100, suffix: "%", label: "Free",       color: "#10b981" },
];

const TERMINAL_LINES = [
  { delay: 0,    text: "$ fetching tech headlines...",          color: "#94a3b8" },
  { delay: 600,  text: " 20 articles from GNews API",          color: "#10b981" },
  { delay: 1100, text: "$ syncing GitHub trending repos...",    color: "#94a3b8" },
  { delay: 1700, text: " 12 repos fetched (weekly top)",       color: "#10b981" },
  { delay: 2200, text: "$ loading AI tools directory...",       color: "#94a3b8" },
  { delay: 2700, text: " 30+ tools indexed",                   color: "#8b5cf6" },
  { delay: 3200, text: "$ polling HackerNews top stories...",   color: "#94a3b8" },
  { delay: 3700, text: " 12 HN stories ready",                color: "#10b981" },
  { delay: 4200, text: "$ streaming remote jobs...",            color: "#94a3b8" },
  { delay: 4700, text: " 200+ job listings cached",           color: "#f59e0b" },
  { delay: 5200, text: "",        color: "#1e3a5f" },
  { delay: 5400, text: " All feeds live. Revalidates: 30m",   color: "#3b82f6" },
];

const CATEGORIES = [
  { icon: FaNewspaper,     label: "Tech News",     href: "/news",          color: "#3b82f6" },
  { icon: FaRobot,         label: "AI Tools",      href: "/ai-tools",      color: "#8b5cf6" },
  { icon: FaGithub,        label: "Projects",      href: "/projects",      color: "#10b981" },
  { icon: FaYoutube,       label: "Videos",        href: "/videos",        color: "#ef4444" },
  { icon: FaBriefcase,     label: "Jobs",          href: "/jobs",          color: "#0ea5e9" },
  { icon: FaMicrophone,    label: "Podcasts",      href: "/podcasts",      color: "#f59e0b" },
  { icon: FaReddit,        label: "Reddit",        href: "/reddit",        color: "#f97316" },
  { icon: FaStackOverflow, label: "Stack Overflow",href: "/stackoverflow", color: "#f97316" },
  { icon: FaCode,          label: "Free APIs",     href: "/free-apis",     color: "#06b6d4" },
  { icon: FaLayerGroup,    label: "AI Models",     href: "/ai-models",     color: "#ec4899" },
];

const RINGS = [
  { sz: 180, rgb: "59,130,246",  dur: "2.8s", del: "0s"   },
  { sz: 320, rgb: "139,92,246",  dur: "3.4s", del: "0.3s" },
  { sz: 460, rgb: "6,182,212",   dur: "4.0s", del: "0.6s" },
  { sz: 600, rgb: "16,185,129",  dur: "5.0s", del: "0.9s" },
  { sz: 740, rgb: "59,130,246",  dur: "6.0s", del: "1.2s" },
  { sz: 880, rgb: "139,92,246",  dur: "7.0s", del: "1.5s" },
];

export default function HeroSection() {
  const [wordIdx, setWordIdx]     = useState(0);
  const [sliding, setSliding]     = useState(false);
  const [counts, setCounts]       = useState(STATS.map(() => 0));
  const [termLines, setTermLines] = useState([]);
  const [termKey, setTermKey]     = useState(0);
  const [mounted, setMounted]     = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const dur = 2000, start = Date.now(), tgts = STATS.map((s) => s.target);
    const t = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCounts(tgts.map((v) => Math.floor(v * ease)));
      if (p >= 1) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(() => {
      setSliding(true);
      setTimeout(() => { setWordIdx((i) => (i + 1) % WORDS.length); setSliding(false); }, 400);
    }, 2800);
    return () => clearInterval(t);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    setTermLines([]);
    const timers = TERMINAL_LINES.map((line) =>
      setTimeout(() => setTermLines((prev) => [...prev, line]), line.delay)
    );
    const restart = setTimeout(
      () => setTermKey((k) => k + 1),
      TERMINAL_LINES[TERMINAL_LINES.length - 1].delay + 2400
    );
    return () => { timers.forEach(clearTimeout); clearTimeout(restart); };
  }, [mounted, termKey]);

  return (
    <section className="hv3">

      {/*  Cyber Aura BG  */}
      <div className="hv3-aura-bg">
        <div className="hv3-core" />
        {RINGS.map((r, i) => (
          <div
            key={i}
            className="hv3-ring"
            style={{
              width: r.sz, height: r.sz,
              borderColor: `rgba(${r.rgb},0.32)`,
              boxShadow: `0 0 22px rgba(${r.rgb},0.18), inset 0 0 22px rgba(${r.rgb},0.06)`,
              animationDuration: r.dur,
              animationDelay: r.del,
            }}
          />
        ))}
        <div className="hv3-hex-grid" />
        <div className="hv3-scan" />
      </div>

      <div className="container hv3-inner">
        <div className="row align-items-center g-0">

          {/*  LEFT  */}
          <div className="col-lg-6 hv3-left">

            <div className="hv3-badge">
              <span className="hv3-badge-dot" />
              <FaBolt size={9} />
              <span>LIVE  Auto-Updated Every 30 Min</span>
            </div>

            <h1 className="hv3-h1">
              <span className="hv3-h1-line1">The Dev Hub for</span>
              <span className="hv3-word-track">
                <span className={`hv3-word${sliding ? " hv3-word-out" : ""}`}>
                  {WORDS[wordIdx]}
                </span>
              </span>
            </h1>

            <p className="hv3-sub">
              12+ categories  real-time news, AI tools, trending repos &amp; remote jobs.{" "}
              <strong>Always free.</strong>
            </p>

            <div className="hv3-ctas">
              <Link href="/news" className="hv3-cta-primary">
                <FaNewspaper size={13} /> Latest News <FaArrowRight size={10} />
              </Link>
              <Link href="/ai-tools" className="hv3-cta-outline">
                <FaRobot size={13} /> AI Tools
              </Link>
              <Link href="/projects" className="hv3-cta-outline">
                <FaGithub size={13} /> Projects
              </Link>
            </div>

            <div className="hv3-stats">
              {STATS.map((s, i) => (
                <div className="hv3-stat" key={i} style={{ "--sc": s.color }}>
                  <span className="hv3-stat-n">{mounted ? counts[i] : 0}{s.suffix}</span>
                  <span className="hv3-stat-l">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/*  RIGHT — Terminal  */}
          <div className="col-lg-6 d-none d-lg-flex justify-content-center hv3-right">
            <div className="hv3-term">
              <div className="hv3-term-bar">
                <div className="hv3-term-dots">
                  <span style={{ background: "#ef4444" }} />
                  <span style={{ background: "#f59e0b" }} />
                  <span style={{ background: "#10b981" }} />
                </div>
                <span className="hv3-term-title">
                  <FaTerminal size={10} style={{ marginRight: 6, opacity: 0.6 }} />
                  techfordev  live-feeds.js
                </span>
                <span className="hv3-term-badge"> LIVE</span>
              </div>
              <div className="hv3-term-body">
                {termLines.map((line, i) => (
                  <div key={i} className="hv3-term-line" style={{ "--lc": line.color, animationDelay: `${i * 0.03}s` }}>
                    {line.text}
                  </div>
                ))}
                <span className="hv3-term-cursor"></span>
              </div>
              <div className="hv3-term-status">
                <span><FaCircle size={6} style={{ color: "#10b981", marginRight: 5 }} />All systems operational</span>
                <span>Next refresh in 30:00</span>
              </div>
              <div className="hv3-term-glow" />
            </div>
          </div>

        </div>

        {/*  Category strip  */}
        <div className="hv3-cats">
          {CATEGORIES.map(({ icon: Icon, label, href, color }, i) => (
            <Link key={i} href={href} className="hv3-cat" style={{ "--cc": color, animationDelay: `${0.05 + i * 0.05}s` }}>
              <Icon style={{ color }} />
              <span>{label}</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
