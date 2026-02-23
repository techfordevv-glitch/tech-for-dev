"use client";

import { useState } from "react";
import { FaMobileAlt, FaApple, FaGooglePlay, FaCheckCircle, FaBell, FaWifi, FaBolt, FaSync } from "react-icons/fa";

const features = [
  { icon: <FaWifi className="text-primary" />, title: "Offline Reading", desc: "Save articles and read without internet." },
  { icon: <FaBolt className="text-warning" />, title: "Push Alerts", desc: "Instant notifications for breaking tech news." },
  { icon: <FaSync className="text-success" />, title: "Cross-Device Sync", desc: "Bookmarks and queue synced across all devices." },
];

export default function MobilePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEarlyAccess = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><FaMobileAlt className="me-2 text-primary" />Mobile App</h1>
          <p className="mb-0">Offline-first iOS/Android app with push alerts and cross-device sync.</p>
        </div>
      </div>
      <div className="container py-5">

        {/* Feature highlights */}
        <div className="row g-4 mb-5">
          {features.map((f) => (
            <div className="col-md-4" key={f.title}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center py-4">
                  <div className="fs-2 mb-2">{f.icon}</div>
                  <h6 className="fw-bold mb-1">{f.title}</h6>
                  <p className="text-muted small mb-0">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div className="d-flex justify-content-center gap-4 mb-4">
              <div className="d-flex align-items-center gap-2 text-muted">
                <FaApple size={32} /> <span className="fw-semibold">iOS</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted">
                <FaGooglePlay size={32} className="text-success" /> <span className="fw-semibold">Android</span>
              </div>
            </div>
            <h4 className="fw-bold mb-1">App in Development</h4>
            <p className="text-muted mb-4">
              The TechForDev mobile app is being built. Sign up for early access beta.
            </p>
            {submitted ? (
              <div className="alert alert-success d-inline-flex align-items-center gap-2 px-4">
                <FaCheckCircle /> On the list! We&apos;ll send you a beta invite.
              </div>
            ) : (
              <form className="d-flex justify-content-center gap-2 flex-wrap" onSubmit={handleEarlyAccess}>
                <input
                  type="email"
                  className="form-control search-input"
                  style={{ maxWidth: 340 }}
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  <FaBell className="me-1" /> Get Early Access
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
