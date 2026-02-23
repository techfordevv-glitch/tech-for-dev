"use client";

import { useState } from "react";
import { FaUsers, FaDiscord, FaTwitter, FaGithub, FaHeart, FaRocket, FaComments } from "react-icons/fa";

const channels = [
  {
    icon: "discord",
    name: "Discord Server",
    desc: "Join real-time discussions, share finds, and ask questions.",
    href: "https://discord.gg/techfordev",
    label: "Join Discord",
    color: "info",
  },
  {
    icon: "twitter",
    name: "Twitter / X",
    desc: "Follow @TechForDevHQ for updates, tips, and latest features.",
    href: "https://twitter.com/techfordevhq",
    label: "Follow on X",
    color: "primary",
  },
  {
    icon: "github",
    name: "GitHub",
    desc: "Star the repo, open issues, or contribute a feature.",
    href: "https://github.com/techfordev",
    label: "View on GitHub",
    color: "secondary",
  },
];

const values = [
  { key: "open", title: "Open by default", desc: "Free forever for personal use. No paywalls on content." },
  { key: "community", title: "Community-driven", desc: "Feature requests and bug reports from users shape the roadmap." },
  { key: "honest", title: "Honest & transparent", desc: "No fake stats, no dark patterns. Just a useful tool." },
];

export default function CommunityPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><FaUsers className="me-2 text-primary" />Community</h1>
          <p className="mb-0">Connect with tech enthusiasts, share feedback, and shape TechForDev.</p>
        </div>
      </div>

      <div className="container py-5">

        {/* Values */}
        <div className="row g-4 mb-5">
          {values.map((v) => (
            <div className="col-md-4" key={v.key}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center py-4">
                  <h6 className="fw-bold mb-1">{v.title}</h6>
                  <p className="text-muted small mb-0">{v.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social channels */}
        <h2 className="section-header mb-4">
          <span className="icon bg-primary bg-opacity-10 text-primary"><FaUsers /></span>
          Join the Community
        </h2>
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex flex-column align-items-center text-center py-4">
                <FaDiscord size={28} className="text-info mb-3" />
                <h5 className="fw-bold mb-1">Discord Server</h5>
                <p className="text-muted small mb-3">Join real-time discussions, share finds, and ask questions.</p>
                <a href="https://discord.gg/techfordev" target="_blank" rel="noopener noreferrer" className="btn btn-outline-info btn-sm mt-auto">Join Discord</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex flex-column align-items-center text-center py-4">
                <FaTwitter size={28} className="text-primary mb-3" />
                <h5 className="fw-bold mb-1">Twitter / X</h5>
                <p className="text-muted small mb-3">Follow @TechForDevHQ for updates, tips, and latest features.</p>
                <a href="https://twitter.com/techfordevhq" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm mt-auto">Follow on X</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex flex-column align-items-center text-center py-4">
                <FaGithub size={28} className="mb-3" />
                <h5 className="fw-bold mb-1">GitHub</h5>
                <p className="text-muted small mb-3">Star the repo, open issues, or contribute a feature.</p>
                <a href="https://github.com/techfordev" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm mt-auto">View on GitHub</a>
              </div>
            </div>
          </div>
        </div>

        {/* Notify form */}
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <h4 className="fw-bold mb-1">Stay in the loop</h4>
            <p className="text-muted mb-4">Get notified about new features, integrations, and community highlights.</p>
            {submitted ? (
              <div className="alert alert-success d-inline-flex align-items-center gap-2 px-4">
                <FaHeart className="text-danger" /> Thanks! We&apos;ll be in touch.
              </div>
            ) : (
              <form className="d-flex justify-content-center gap-2 flex-wrap" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="form-control search-input"
                  style={{ maxWidth: 340 }}
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">Notify Me</button>
              </form>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
