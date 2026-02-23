import Link from "next/link";
import {
  FaShieldAlt,
  FaUserSecret,
  FaDatabase,
  FaCookieBite,
  FaShareAlt,
  FaLock,
  FaChild,
  FaEnvelope,
  FaEdit,
  FaEye,
  FaServer,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";

export const metadata = {
  title: "Privacy Policy",
  description: "Read TechForDev's privacy policy. Learn how we collect and use minimal data, store preferences locally, and protect your privacy. No account needed, no tracking.",
  keywords: ["privacy policy", "data privacy", "GDPR", "TechForDev privacy"],
  openGraph: { title: "Privacy Policy | TechForDev", description: "How TechForDev handles your data — minimal collection, local storage, no tracking.", type: "website", url: "/privacy-policy" },
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    id: "information-we-collect",
    icon: <FaDatabase />,
    color: "#3b82f6",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information You Provide",
        text: "TechForDev does not require account registration. We collect minimal data — only what is necessary to improve your experience on the platform. This includes preferences you set (such as theme, bookmarks, and saved items) which are stored locally in your browser's localStorage and never transmitted to our servers.",
      },
      {
        subtitle: "Automatically Collected Information",
        text: "When you visit TechForDev, we may automatically collect certain technical information including your browser type and version, operating system, IP address (anonymized), pages visited, time spent on pages, and referring URLs. This data is collected in aggregate form and cannot be used to personally identify you.",
      },
      {
        subtitle: "Cookies & Local Storage",
        text: "We use browser localStorage to save your preferences such as dark/light mode, bookmarked items, and reading history. We may also use session cookies for basic analytics. No login credentials or sensitive personal data are stored.",
      },
    ],
  },
  {
    id: "how-we-use",
    icon: <FaEye />,
    color: "#8b5cf6",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Platform Operation",
        text: "The information we collect is used solely to operate and improve TechForDev. This includes personalizing your content experience, remembering your preferences, displaying relevant content, and diagnosing technical issues.",
      },
      {
        subtitle: "Analytics & Improvement",
        text: "We use anonymized, aggregated analytics data to understand how users interact with the platform — which sections are most visited, what content is popular, and where users experience difficulties. This helps us continuously improve TechForDev.",
      },
      {
        subtitle: "We Do NOT:",
        list: [
          "Sell your personal data to third parties",
          "Use your data for targeted advertising",
          "Share your information with advertisers",
          "Build personal profiles for commercial resale",
          "Track you across other websites",
        ],
      },
    ],
  },
  {
    id: "third-party",
    icon: <FaShareAlt />,
    color: "#10b981",
    title: "Third-Party Services",
    content: [
      {
        subtitle: "Content APIs",
        text: "TechForDev aggregates content from third-party APIs including GNews, Dev.to, GitHub, YouTube, Hugging Face, iTunes, Reddit, Stack Overflow, and others. When you interact with content from these sources, you may be subject to their respective privacy policies. We encourage you to review the privacy policies of these services.",
      },
      {
        subtitle: "Analytics",
        text: "We may use privacy-respecting analytics tools (such as Vercel Analytics) that collect anonymized, aggregated visitor statistics. These tools do not use cookies for tracking and are GDPR compliant.",
      },
      {
        subtitle: "Content Delivery",
        text: "TechForDev is deployed on Vercel's infrastructure. Vercel may collect standard server logs including IP addresses for security and performance purposes. Please review Vercel's privacy policy at vercel.com/legal/privacy-policy for details.",
      },
    ],
  },
  {
    id: "data-security",
    icon: <FaLock />,
    color: "#f59e0b",
    title: "Data Security",
    content: [
      {
        subtitle: "Security Measures",
        text: "TechForDev is served entirely over HTTPS (SSL/TLS encryption). We implement industry-standard security measures to protect our infrastructure. Since we store your preferences locally in your browser rather than on servers, the risk of data breach affecting your personal data is minimal.",
      },
      {
        subtitle: "Data Retention",
        text: "Your locally stored preferences (bookmarks, theme, history) persist in your browser until you clear your browser data. Server-side analytics data, if collected, is retained in anonymized form for no longer than 12 months.",
      },
      {
        subtitle: "No Account Required",
        text: "TechForDev operates without user accounts, meaning we never store passwords, email addresses, or personal profile data on our servers. All personalization is handled client-side.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: <FaUserSecret />,
    color: "#ef4444",
    title: "Your Rights",
    content: [
      {
        subtitle: "GDPR & Privacy Rights",
        text: "If you are located in the European Union, you have rights under the General Data Protection Regulation (GDPR) including the right to access, rectify, erase, restrict processing of, and port your data. Since TechForDev stores preferences only in your browser, you can exercise most of these rights directly by clearing your browser's localStorage.",
      },
      {
        subtitle: "Opt-Out of Analytics",
        text: "You can opt out of analytics collection by enabling your browser's 'Do Not Track' setting. TechForDev respects DNT signals. You may also use browser extensions to block analytics scripts.",
      },
      {
        subtitle: "Data Deletion",
        text: "To delete all locally stored TechForDev data, open your browser's Developer Tools → Application → Local Storage, and clear all entries for techfordev.vercel.app. This will reset all your preferences, bookmarks, and history.",
      },
    ],
  },
  {
    id: "children",
    icon: <FaChild />,
    color: "#06b6d4",
    title: "Children's Privacy",
    content: [
      {
        subtitle: "Age Requirement",
        text: "TechForDev is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately and we will take steps to remove that information.",
      },
    ],
  },
  {
    id: "changes",
    icon: <FaEdit />,
    color: "#f97316",
    title: "Changes to This Policy",
    content: [
      {
        subtitle: "Policy Updates",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make material changes, we will update the 'Last Updated' date at the top of this page. We encourage you to review this policy periodically. Your continued use of TechForDev after any changes constitutes your acceptance of the updated policy.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 23, 2026";

  return (
    <>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.08) 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container py-5">
          <div className="text-center" style={{ maxWidth: 680, margin: "0 auto" }}>
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: 68, height: 68, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
              <FaShieldAlt size={28} color="#fff" />
            </div>
            <h1 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>Privacy Policy</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.75 }}>
              Your privacy matters to us. This policy explains how TechForDev handles your data — transparently and responsibly.
            </p>
            <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
              <span className="badge px-3 py-2" style={{ backgroundColor: "rgba(59,130,246,0.12)", color: "#3b82f6", fontSize: 12 }}>
                Last Updated: {lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">

          {/* Sidebar TOC */}
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
              <div className="rounded-3 p-4 mt-3" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #222)" }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FaEnvelope className="text-primary" size={14} />
                  <span className="fw-semibold small" style={{ color: "var(--text-primary)" }}>Questions?</span>
                </div>
                <p className="small mb-3" style={{ color: "var(--text-secondary)" }}>Contact us about privacy concerns.</p>
                <a href="mailto:privacy@techfordev.dev" className="btn btn-primary btn-sm w-100">Email Us</a>
              </div>
            </div>
          </div>

          {/* Main Content */}
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
              </div>
            ))}

            {/* Contact */}
            <div className="rounded-3 p-4 text-center" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)", border: "1px solid rgba(59,130,246,0.18)" }}>
              <FaEnvelope size={28} className="text-primary mb-3" />
              <h4 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>Have Questions?</h4>
              <p className="text-secondary mb-3">If you have any questions about this Privacy Policy, please reach out to us.</p>
              <a href="mailto:privacy@techfordev.dev" className="btn btn-primary px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                Contact Us <FaArrowRight size={11} />
              </a>
            </div>

            <div className="d-flex gap-3 mt-4 flex-wrap">
              <Link href="/terms-of-service" className="text-decoration-none small d-flex align-items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                <FaArrowRight size={10} /> Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-decoration-none small d-flex align-items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                <FaArrowRight size={10} /> Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
