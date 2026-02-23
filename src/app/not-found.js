import Link from "next/link";
import { FaBolt, FaHome, FaNewspaper, FaRobot, FaArrowRight } from "react-icons/fa";

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Return to TechForDev — your developer hub for tech news, AI tools, projects and more.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container text-center py-5">
        {/* Glowing 404 */}
        <div className="mb-4" style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              fontSize: "clamp(6rem, 20vw, 12rem)",
              fontWeight: 900,
              letterSpacing: "-4px",
              lineHeight: 1,
              background: "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
            }}
          >
            404
          </span>
        </div>

        <FaBolt
          size={40}
          className="text-warning mb-3"
          style={{ filter: "drop-shadow(0 0 12px #fbbf24)" }}
        />

        <h1 className="fw-bold mb-2" style={{ fontSize: "1.8rem" }}>
          Oops! Page Not Found
        </h1>
        <p className="text-secondary mb-5" style={{ maxWidth: 460, margin: "0 auto 2.5rem" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
          you back to the pulse.
        </p>

        {/* Quick nav */}
        <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
          <Link href="/" className="btn btn-primary px-4 d-flex align-items-center gap-2">
            <FaHome /> Go Home
          </Link>
          <Link href="/news" className="btn btn-outline-primary px-4 d-flex align-items-center gap-2">
            <FaNewspaper /> Latest News
          </Link>
          <Link href="/ai-tools" className="btn btn-outline-info px-4 d-flex align-items-center gap-2">
            <FaRobot /> AI Tools
          </Link>
        </div>

        {/* Popular sections */}
        <div
          className="card border-0 mx-auto"
          style={{ maxWidth: 560, background: "var(--bg-card)" }}
        >
          <div className="card-body py-4">
            <h6 className="fw-semibold text-secondary mb-3">Popular Sections</h6>
            <div className="row g-2 text-start">
              {[
                { href: "/articles", label: "Dev Articles" },
                { href: "/projects", label: "GitHub Trending" },
                { href: "/reddit", label: "Reddit Tech" },
                { href: "/jobs", label: "Remote Jobs" },
                { href: "/videos", label: "Tech Videos" },
                { href: "/podcasts", label: "Podcasts" },
                { href: "/events", label: "Events" },
                { href: "/saved", label: "Saved Items" },
              ].map((item) => (
                <div className="col-6 col-sm-3" key={item.href}>
                  <Link
                    href={item.href}
                    className="d-flex align-items-center gap-1 text-decoration-none small"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <FaArrowRight size={9} className="text-primary" />
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
