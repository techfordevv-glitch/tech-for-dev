import Link from "next/link";
import {
  FaCookieBite,
  FaToggleOn,
  FaToggleOff,
  FaChartBar,
  FaShieldAlt,
  FaCog,
  FaTrash,
  FaEnvelope,
  FaArrowRight,
  FaInfoCircle,
  FaDatabase,
  FaBan,
} from "react-icons/fa";

export const metadata = {
  title: "Cookie Policy",
  description: "TechForDev uses minimal browser localStorage (not third-party cookies) to remember your theme, bookmarks, and preferences. Zero advertising cookies. Read our full cookie policy.",
  keywords: ["cookie policy", "localStorage", "browser cookies", "TechForDev cookies"],
  openGraph: { title: "Cookie Policy | TechForDev", description: "TechForDev uses minimal localStorage — no ad cookies, no third-party tracking.", type: "website", url: "/cookie-policy" },
  alternates: { canonical: "/cookie-policy" },
};

const cookieTypes = [
  {
    name: "Essential / Functional",
    color: "#10b981",
    required: true,
    icon: <FaCog />,
    desc: "Required for the Platform to function correctly.",
    examples: [
      { name: "techfordev-theme", purpose: "Remembers your dark/light mode preference", expires: "Persistent (localStorage)", type: "localStorage" },
      { name: "techfordev-bookmarks", purpose: "Stores your saved/bookmarked items", expires: "Persistent (localStorage)", type: "localStorage" },
      { name: "techfordev-language", purpose: "Remembers your selected language", expires: "Persistent (localStorage)", type: "localStorage" },
      { name: "techfordev-history", purpose: "Tracks recently viewed items for better navigation", expires: "Persistent (localStorage)", type: "localStorage" },
    ],
  },
  {
    name: "Analytics",
    color: "#3b82f6",
    required: false,
    icon: <FaChartBar />,
    desc: "Help us understand how visitors use the Platform so we can improve it.",
    examples: [
      { name: "va_*", purpose: "Vercel Analytics — anonymized page view statistics", expires: "Session", type: "Cookie" },
      { name: "__vercel_live_token", purpose: "Vercel deployment tracking (dev only)", expires: "Session", type: "Cookie" },
    ],
  },
];

const sections = [
  {
    id: "what-are-cookies",
    icon: <FaInfoCircle />,
    color: "#f59e0b",
    title: "What Are Cookies?",
    content: [
      {
        subtitle: "Definition",
        text: "Cookies are small text files that websites place on your device to store information. They help websites remember your preferences, keep you logged in, and collect analytics data. Cookies can be 'session cookies' (deleted when you close your browser) or 'persistent cookies' (remain until they expire or you delete them).",
      },
      {
        subtitle: "Local Storage vs Cookies",
        text: "TechForDev primarily uses browser localStorage rather than traditional cookies for storing your preferences. LocalStorage is a web technology that stores data directly in your browser, similar to cookies but with a larger capacity and no automatic expiration. Unlike cookies, localStorage data is never sent to servers automatically — it stays entirely in your browser.",
      },
    ],
  },
  {
    id: "how-we-use",
    icon: <FaDatabase />,
    color: "#3b82f6",
    title: "How TechForDev Uses Cookies & Storage",
    content: [
      {
        subtitle: "Our Approach",
        text: "TechForDev takes a privacy-first approach to cookies. We use the absolute minimum — only what's needed to give you a good experience. We do NOT use advertising cookies, tracking pixels, or cross-site tracking technologies. Everything we store is either essential to platform functionality or helps us understand aggregate (anonymized) usage patterns.",
      },
      {
        subtitle: "No Third-Party Advertising Cookies",
        text: "TechForDev does not run advertising networks and does not allow third-party advertising cookies on the Platform. You will never see cookies from Google Ads, Facebook Pixel, or similar ad networks on TechForDev.",
      },
    ],
  },
  {
    id: "types",
    icon: <FaCookieBite />,
    color: "#8b5cf6",
    title: "Types of Storage We Use",
    isTable: true,
  },
  {
    id: "third-party",
    icon: <FaShieldAlt />,
    color: "#10b981",
    title: "Third-Party Cookies",
    content: [
      {
        subtitle: "Vercel Analytics",
        text: "Our hosting provider Vercel may set minimal analytics cookies to track aggregate page views and performance metrics. These are anonymized and do not identify individual users. Vercel's analytics are designed to be privacy-friendly and GDPR compliant.",
      },
      {
        subtitle: "Embedded YouTube Videos",
        text: "When you watch videos embedded from YouTube on TechForDev's video detail pages, YouTube may set cookies on your device according to YouTube's (Google's) cookie and privacy policies. These cookies are set by YouTube's embed player, not by TechForDev. You can avoid these cookies by watching videos directly on YouTube.",
      },
      {
        subtitle: "External API Content",
        text: "TechForDev fetches content from third-party APIs (GNews, Dev.to, GitHub, etc.) server-side. These requests happen on our servers, not your browser, so no third-party API cookies are set on your device during normal Platform use.",
      },
    ],
  },
  {
    id: "control",
    icon: <FaToggleOn />,
    color: "#06b6d4",
    title: "Your Control Over Cookies",
    content: [
      {
        subtitle: "Browser Settings",
        text: "Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies, accept only certain cookies, or notify you when a cookie is being set. However, blocking all cookies may affect the functionality of TechForDev (e.g., your theme preference won't be saved).",
      },
      {
        subtitle: "Do Not Track",
        text: "TechForDev respects the 'Do Not Track' (DNT) browser signal. When DNT is enabled, we disable any non-essential analytics tracking for your session.",
      },
      {
        subtitle: "Opt-Out of Analytics",
        text: "To opt out of Vercel Analytics, you can install a browser content blocker or enable DNT. For YouTube cookies on video pages, you can use a browser extension like uBlock Origin or watch videos directly on YouTube to avoid embed cookies.",
      },
    ],
  },
  {
    id: "manage",
    icon: <FaTrash />,
    color: "#ef4444",
    title: "How to Delete / Clear Storage",
    content: [
      {
        subtitle: "Clear TechForDev LocalStorage",
        text: "To remove all data TechForDev has stored in your browser: Open DevTools (F12) → Application tab → Local Storage → select the TechForDev domain → click 'Clear All'. This will reset your theme, bookmarks, language preference, and reading history.",
      },
      {
        subtitle: "Clear Browser Cookies",
        text: "To clear all cookies for TechForDev: In Chrome/Edge, go to Settings → Privacy → Clear browsing data → Cookies. In Firefox, go to Settings → Privacy & Security → Clear Data. In Safari, go to Preferences → Privacy → Manage Website Data.",
      },
      {
        subtitle: "Browser-Specific Instructions",
        list: [
          "Chrome: Settings → Privacy & Security → Third-party cookies → Block all",
          "Firefox: Settings → Privacy & Security → Enhanced Tracking Protection → Strict",
          "Safari: Preferences → Privacy → Prevent cross-site tracking",
          "Edge: Settings → Privacy → Tracking prevention → Strict",
          "Brave: Shields → Block Cookies → Block all cookies",
        ],
      },
    ],
  },
  {
    id: "no-tracking",
    icon: <FaBan />,
    color: "#f97316",
    title: "What We Don't Do",
    content: [
      {
        subtitle: "Our Commitments",
        list: [
          "We do not use advertising or retargeting cookies",
          "We do not use tracking pixels or web beacons for ad targeting",
          "We do not share cookie data with advertisers",
          "We do not fingerprint your browser or device",
          "We do not track you across other websites",
          "We do not sell data derived from cookies",
          "We do not use cookies to build personal profiles for commercial use",
        ],
      },
    ],
  },
];

export default function CookiePolicyPage() {
  const lastUpdated = "February 23, 2026";

  return (
    <>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(139,92,246,0.08) 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container py-5">
          <div className="text-center" style={{ maxWidth: 680, margin: "0 auto" }}>
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: 68, height: 68, background: "linear-gradient(135deg, #f59e0b, #8b5cf6)" }}>
              <FaCookieBite size={28} color="#fff" />
            </div>
            <h1 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>Cookie Policy</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.75 }}>
              We believe in transparency. Here's exactly what we store in your browser, why, and how you can control it.
            </p>
            <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
              <span className="badge px-3 py-2" style={{ backgroundColor: "rgba(245,158,11,0.12)", color: "#f59e0b", fontSize: 12 }}>
                Last Updated: {lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">

          {/* Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <div style={{ position: "sticky", top: 84 }}>
              <div className="rounded-3 p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #222)" }}>
                <h6 className="fw-bold text-uppercase small mb-3" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}>Contents</h6>
                <div className="d-flex flex-column gap-2">
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="text-decoration-none small d-flex align-items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                      <span style={{ color: s.color, fontSize: 12 }}>{s.icon}</span>
                      {s.title}
                    </a>
                  ))}
                </div>
              </div>
              {/* Cookie status card */}
              <div className="rounded-3 p-4 mt-3" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #222)" }}>
                <h6 className="fw-bold text-uppercase small mb-3" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}>Cookie Status</h6>
                {[
                  { label: "Ad Cookies", status: false },
                  { label: "Tracking Pixels", status: false },
                  { label: "Cross-site Tracking", status: false },
                  { label: "Essential Storage", status: true },
                  { label: "Anonymized Analytics", status: true },
                ].map((item) => (
                  <div key={item.label} className="d-flex align-items-center justify-content-between mb-2">
                    <span className="small" style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                    {item.status
                      ? <FaToggleOn className="text-success" size={18} />
                      : <FaToggleOff className="text-danger" size={18} />
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="col-lg-9">
            {sections.map((section, idx) => (
              <div key={section.id} id={section.id} className="mb-5">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ width: 44, height: 44, backgroundColor: `${section.color}18`, color: section.color, fontSize: 18 }}>
                    {section.icon}
                  </div>
                  <h2 className="fw-bold mb-0" style={{ color: "var(--text-primary)", fontSize: "1.4rem" }}>
                    {idx + 1}. {section.title}
                  </h2>
                </div>

                {section.isTable ? (
                  <div>
                    {cookieTypes.map((type) => (
                      <div key={type.name} className="rounded-3 mb-4 overflow-hidden" style={{ border: "1px solid var(--border-color, #222)" }}>
                        <div style={{ height: 3, background: `linear-gradient(90deg, ${type.color}, transparent)` }} />
                        <div className="p-4" style={{ backgroundColor: "var(--bg-card)" }}>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center gap-2">
                              <span style={{ color: type.color, fontSize: 16 }}>{type.icon}</span>
                              <h6 className="fw-bold mb-0" style={{ color: "var(--text-primary)" }}>{type.name}</h6>
                            </div>
                            <span className="badge px-3 py-1" style={{ backgroundColor: type.required ? "rgba(16,185,129,0.12)" : "rgba(59,130,246,0.12)", color: type.required ? "#10b981" : "#3b82f6", fontSize: 11 }}>
                              {type.required ? "Required" : "Optional"}
                            </span>
                          </div>
                          <p className="small mb-3" style={{ color: "var(--text-secondary)" }}>{type.desc}</p>
                          <div className="table-responsive">
                            <table className="table table-sm mb-0" style={{ fontSize: 12 }}>
                              <thead>
                                <tr style={{ borderColor: "var(--border-color, #333)" }}>
                                  <th style={{ color: "var(--text-secondary)", fontWeight: 600, backgroundColor: "transparent", borderColor: "var(--border-color, #333)" }}>Name</th>
                                  <th style={{ color: "var(--text-secondary)", fontWeight: 600, backgroundColor: "transparent", borderColor: "var(--border-color, #333)" }}>Purpose</th>
                                  <th style={{ color: "var(--text-secondary)", fontWeight: 600, backgroundColor: "transparent", borderColor: "var(--border-color, #333)" }}>Expiry</th>
                                  <th style={{ color: "var(--text-secondary)", fontWeight: 600, backgroundColor: "transparent", borderColor: "var(--border-color, #333)" }}>Type</th>
                                </tr>
                              </thead>
                              <tbody>
                                {type.examples.map((ex) => (
                                  <tr key={ex.name} style={{ borderColor: "var(--border-color, #333)" }}>
                                    <td style={{ color: "#10b981", fontFamily: "monospace", backgroundColor: "transparent", borderColor: "var(--border-color, #333)" }}>{ex.name}</td>
                                    <td style={{ color: "var(--text-secondary)", backgroundColor: "transparent", borderColor: "var(--border-color, #333)" }}>{ex.purpose}</td>
                                    <td style={{ color: "var(--text-secondary)", backgroundColor: "transparent", borderColor: "var(--border-color, #333)" }}>{ex.expires}</td>
                                    <td style={{ backgroundColor: "transparent", borderColor: "var(--border-color, #333)" }}>
                                      <span className="badge" style={{ backgroundColor: ex.type === "localStorage" ? "rgba(139,92,246,0.15)" : "rgba(59,130,246,0.15)", color: ex.type === "localStorage" ? "#8b5cf6" : "#3b82f6", fontSize: 10 }}>
                                        {ex.type}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3 overflow-hidden" style={{ border: "1px solid var(--border-color, #222)" }}>
                    <div style={{ height: 3, background: `linear-gradient(90deg, ${section.color}, transparent)` }} />
                    <div className="p-4" style={{ backgroundColor: "var(--bg-card)" }}>
                      {section.content.map((block, i) => (
                        <div key={i} className={i < section.content.length - 1 ? "mb-4 pb-4" : ""} style={i < section.content.length - 1 ? { borderBottom: "1px solid var(--border-color, #222)" } : {}}>
                          <h6 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>{block.subtitle}</h6>
                          {block.text && <p className="mb-0" style={{ color: "var(--text-secondary)", lineHeight: 1.85 }}>{block.text}</p>}
                          {block.list && (
                            <ul className="mb-0 ps-3" style={{ color: "var(--text-secondary)" }}>
                              {block.list.map((item, j) => (
                                <li key={j} className="mb-1" style={{ lineHeight: 1.75 }}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="rounded-3 p-4 text-center" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(139,92,246,0.08) 100%)", border: "1px solid rgba(245,158,11,0.18)" }}>
              <FaEnvelope size={28} className="text-warning mb-3" />
              <h4 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>Cookie Questions?</h4>
              <p className="text-secondary mb-3">Have concerns about cookies or data storage? We're happy to help.</p>
              <a href="mailto:privacy@techfordev.dev" className="btn btn-warning px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                Contact Us <FaArrowRight size={11} />
              </a>
            </div>

            <div className="d-flex gap-3 mt-4 flex-wrap">
              <Link href="/privacy-policy" className="text-decoration-none small d-flex align-items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                <FaArrowRight size={10} /> Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-decoration-none small d-flex align-items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                <FaArrowRight size={10} /> Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
