import Link from "next/link";
import {
  FaFileContract,
  FaCheckCircle,
  FaTimesCircle,
  FaUserShield,
  FaExclamationTriangle,
  FaGavel,
  FaEdit,
  FaEnvelope,
  FaArrowRight,
  FaBolt,
  FaGlobe,
  FaServer,
} from "react-icons/fa";

export const metadata = {
  title: "Terms of Service",
  description: "Read TechForDev's Terms of Service. Understand the rules and guidelines for using our developer platform. Free to use, no account required.",
  keywords: ["terms of service", "terms and conditions", "TechForDev terms"],
  openGraph: { title: "Terms of Service | TechForDev", description: "Rules and guidelines for using TechForDev. Free to use, no account required.", type: "website", url: "/terms-of-service" },
  alternates: { canonical: "/terms-of-service" },
};

const sections = [
  {
    id: "acceptance",
    icon: <FaCheckCircle />,
    color: "#10b981",
    title: "Acceptance of Terms",
    content: [
      {
        subtitle: "Agreement to Terms",
        text: "By accessing or using TechForDev (the 'Platform'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, please discontinue your use of the Platform immediately. These Terms apply to all visitors and users of TechForDev.",
      },
      {
        subtitle: "Eligibility",
        text: "You must be at least 13 years of age to use TechForDev. By using the Platform, you represent and warrant that you meet this age requirement. If you are between 13 and 18 years of age, you may use TechForDev only with the involvement and consent of a parent or legal guardian.",
      },
    ],
  },
  {
    id: "use-of-platform",
    icon: <FaGlobe />,
    color: "#3b82f6",
    title: "Use of the Platform",
    content: [
      {
        subtitle: "Permitted Use",
        text: "TechForDev grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for your personal, non-commercial purposes. You may browse, read, bookmark, and share content available on TechForDev in accordance with these Terms.",
      },
      {
        subtitle: "Acceptable Use",
        list: [
          "Use the Platform for lawful purposes only",
          "Respect intellectual property rights of content creators",
          "Access the Platform through its intended interfaces only",
          "Maintain the security of any credentials or settings",
          "Report any bugs, security vulnerabilities, or abuse through appropriate channels",
        ],
      },
      {
        subtitle: "Prohibited Activities",
        list: [
          "Scraping, crawling, or automated data extraction without permission",
          "Attempting to circumvent security measures or rate limits",
          "Using the Platform to distribute malware, spam, or harmful content",
          "Impersonating TechForDev or its administrator",
          "Reverse engineering any part of the Platform",
          "Using the Platform for any commercial purpose without written consent",
          "Attempting to gain unauthorized access to any portion of the Platform",
        ],
      },
    ],
  },
  {
    id: "content",
    icon: <FaServer />,
    color: "#8b5cf6",
    title: "Content & Intellectual Property",
    content: [
      {
        subtitle: "Third-Party Content",
        text: "TechForDev aggregates content from third-party sources including news articles, developer posts, GitHub repositories, YouTube videos, podcasts, and job listings. This content remains the intellectual property of its respective owners. TechForDev does not claim ownership over any third-party content displayed on the Platform.",
      },
      {
        subtitle: "TechForDev Content",
        text: "The TechForDev platform design, logo, original text, code, and user interface elements are owned by TechForDev and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from TechForDev's original content without explicit written permission.",
      },
      {
        subtitle: "Content Accuracy",
        text: "TechForDev strives to provide accurate and up-to-date content but makes no warranties about the completeness, accuracy, or reliability of any content displayed. Content is sourced from third-party APIs and TechForDev is not responsible for errors, omissions, or outdated information in third-party content.",
      },
    ],
  },
  {
    id: "disclaimers",
    icon: <FaExclamationTriangle />,
    color: "#f59e0b",
    title: "Disclaimers & Limitations",
    content: [
      {
        subtitle: "No Warranty",
        text: "TechForDev is provided on an 'AS IS' and 'AS AVAILABLE' basis without any warranties of any kind, either express or implied. We do not warrant that the Platform will be uninterrupted, error-free, secure, or free of viruses or other harmful components.",
      },
      {
        subtitle: "Limitation of Liability",
        text: "To the maximum extent permitted by applicable law, TechForDev and its administrator shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of or inability to use the Platform.",
      },
      {
        subtitle: "External Links",
        text: "TechForDev may contain links to external websites and services. We are not responsible for the content, privacy practices, or terms of these external sites. Visiting external links is at your own risk and subject to those sites' respective terms and policies.",
      },
    ],
  },
  {
    id: "user-conduct",
    icon: <FaUserShield />,
    color: "#ef4444",
    title: "User Conduct",
    content: [
      {
        subtitle: "Respectful Use",
        text: "You agree to use TechForDev in a manner that does not interfere with other users' experience or the normal operation of the Platform. Any attempt to disrupt, overload, or damage the Platform's infrastructure is strictly prohibited.",
      },
      {
        subtitle: "Account Preferences",
        text: "If you use TechForDev features that store preferences locally (such as bookmarks, reading history, or theme settings), you are responsible for maintaining the confidentiality of your browser environment. These preferences are stored locally and TechForDev has no access to them.",
      },
    ],
  },
  {
    id: "api-usage",
    icon: <FaServer />,
    color: "#06b6d4",
    title: "API & Data Usage",
    content: [
      {
        subtitle: "Third-Party API Compliance",
        text: "Content displayed on TechForDev is sourced from third-party APIs (GNews, Dev.to, GitHub, YouTube, Hugging Face, etc.). Your use of such third-party content is also subject to the terms of service and usage restrictions of those respective platforms. TechForDev operates within the permitted use guidelines of each API provider.",
      },
      {
        subtitle: "Free APIs Directory",
        text: "The Free APIs directory on TechForDev is provided for informational purposes only. TechForDev does not endorse or guarantee the quality, reliability, or uptime of any listed API. Use of any listed API is governed by that API's own terms of service.",
      },
    ],
  },
  {
    id: "termination",
    icon: <FaTimesCircle />,
    color: "#f97316",
    title: "Termination",
    content: [
      {
        subtitle: "Right to Terminate",
        text: "TechForDev reserves the right to suspend or terminate access to the Platform, at our sole discretion, if we believe you have violated these Terms or engaged in conduct that is harmful to the Platform or other users. Since TechForDev does not require accounts, termination primarily refers to IP-level access restrictions.",
      },
      {
        subtitle: "Effect of Termination",
        text: "Upon termination of access, your right to use the Platform ceases immediately. Locally stored preferences and data may remain in your browser but will not be accessible if access is restricted at the network level.",
      },
    ],
  },
  {
    id: "governing-law",
    icon: <FaGavel />,
    color: "#6366f1",
    title: "Governing Law & Disputes",
    content: [
      {
        subtitle: "Governing Law",
        text: "These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from your use of TechForDev shall first be attempted to be resolved through good-faith negotiation. If resolution cannot be reached informally, disputes will be subject to binding arbitration.",
      },
      {
        subtitle: "Dispute Resolution",
        text: "Before initiating any formal dispute resolution, you agree to contact us at legal@techfordev.dev to describe the issue and allow us 30 days to resolve it. We are committed to resolving disputes amicably and in a timely manner.",
      },
    ],
  },
  {
    id: "changes",
    icon: <FaEdit />,
    color: "#84cc16",
    title: "Changes to Terms",
    content: [
      {
        subtitle: "Updates & Notifications",
        text: "TechForDev reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting the updated Terms on the Platform. We will update the 'Last Updated' date to reflect the most recent revision. Your continued use of TechForDev after any changes constitutes your acceptance of the new Terms. We recommend reviewing these Terms periodically.",
      },
    ],
  },
];

export default function TermsOfServicePage() {
  const lastUpdated = "February 23, 2026";

  return (
    <>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(59,130,246,0.08) 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container py-5">
          <div className="text-center" style={{ maxWidth: 680, margin: "0 auto" }}>
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: 68, height: 68, background: "linear-gradient(135deg, #10b981, #3b82f6)" }}>
              <FaFileContract size={28} color="#fff" />
            </div>
            <h1 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>Terms of Service</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.75 }}>
              Please read these terms carefully before using TechForDev. They govern your use of our platform and services.
            </p>
            <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
              <span className="badge px-3 py-2" style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981", fontSize: 12 }}>
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
              <div className="rounded-3 p-4 mt-3" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #222)" }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FaBolt className="text-warning" size={14} />
                  <span className="fw-semibold small" style={{ color: "var(--text-primary)" }}>TechForDev</span>
                </div>
                <p className="small mb-2" style={{ color: "var(--text-secondary)" }}>Your daily developer hub.</p>
                <Link href="/" className="btn btn-warning btn-sm w-100 fw-semibold">Explore Platform</Link>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="col-lg-9">
            {/* Summary box */}
            <div className="rounded-3 p-4 mb-5" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(59,130,246,0.07) 100%)", border: "1px solid rgba(16,185,129,0.2)", borderLeft: "4px solid #10b981" }}>
              <h6 className="fw-bold mb-2 d-flex align-items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <FaCheckCircle className="text-success" /> Summary (TL;DR)
              </h6>
              <ul className="mb-0 ps-3" style={{ color: "var(--text-secondary)" }}>
                {[
                  "TechForDev is free to use — no account, no subscription required",
                  "Content is aggregated from third-party sources; we don't own it",
                  "Don't scrape, abuse, or misuse the platform",
                  "We're not liable for third-party content accuracy",
                  "We may update these terms — check back periodically",
                ].map((item, i) => (
                  <li key={i} className="mb-1" style={{ lineHeight: 1.75 }}>{item}</li>
                ))}
              </ul>
            </div>

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

            <div className="rounded-3 p-4 text-center" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(59,130,246,0.08) 100%)", border: "1px solid rgba(16,185,129,0.18)" }}>
              <FaEnvelope size={28} className="text-success mb-3" />
              <h4 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>Questions about these Terms?</h4>
              <p className="text-secondary mb-3">Reach out and we'll clarify anything you need.</p>
              <a href="mailto:legal@techfordev.dev" className="btn btn-success px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                Contact Us <FaArrowRight size={11} />
              </a>
            </div>

            <div className="d-flex gap-3 mt-4 flex-wrap">
              <Link href="/privacy-policy" className="text-decoration-none small d-flex align-items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                <FaArrowRight size={10} /> Privacy Policy
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
