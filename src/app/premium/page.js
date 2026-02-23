"use client";

import { useState } from "react";
import { FaCrown, FaCheckCircle, FaBell } from "react-icons/fa";

const plans = [
  {
    name: "Starter",
    price: "$0",
    badge: "Current",
    badgeColor: "success",
    features: ["All public feeds", "Bookmarks & Save", "Reading Queue", "Basic filters"],
  },
  {
    name: "Pro",
    price: "$9/mo",
    badge: "Coming Soon",
    badgeColor: "warning",
    features: ["Ad-free experience", "Advanced analytics", "Priority alerts", "Custom digest emails", "Unlimited collections"],
  },
  {
    name: "Team",
    price: "$29/mo",
    badge: "Coming Soon",
    badgeColor: "warning",
    features: ["Shared collections", "Team dashboards", "API access", "SSO-ready", "Priority support"],
  },
];

export default function PremiumPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><FaCrown className="me-2 text-warning" />Premium</h1>
          <p className="mb-0">Pro workflows, deeper analytics, and team collaboration — coming soon.</p>
        </div>
      </div>
      <div className="container py-5">
        <div className="row g-4 mb-5">
          {plans.map((plan) => (
            <div className="col-md-6 col-lg-4" key={plan.name}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h4 className="fw-bold mb-0">{plan.name}</h4>
                    <span className={`badge bg-${plan.badgeColor} small`} style={{ color: plan.badgeColor === "warning" ? "#000" : "#fff", fontWeight: 600 }}>{plan.badge}</span>
                  </div>
                  <div className="display-6 fw-bold text-primary mb-3">{plan.price}</div>
                  <div className="d-flex flex-column gap-2 mb-4 flex-grow-1">
                    {plan.features.map((f) => (
                      <div key={f} className="small d-flex align-items-center gap-2">
                        <FaCheckCircle className="text-success flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                  {plan.name === "Starter" ? (
                    <button className="btn btn-success mt-auto" disabled>Active Plan</button>
                  ) : (
                    <button
                      className="btn btn-outline-primary mt-auto"
                      onClick={() => document.getElementById('waitlist-form').scrollIntoView({ behavior: 'smooth' })}
                    >
                      Join Waitlist
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Waitlist form */}
        <div className="card border-0 shadow-sm" id="waitlist-form">
          <div className="card-body text-center py-5">
            <FaBell size={32} className="text-warning mb-3" />
            <h4 className="fw-bold mb-1">Get Early Access</h4>
            <p className="text-muted mb-4">
              Join the waitlist and be the first to know when Pro launches.
            </p>
            {submitted ? (
              <div className="alert alert-success d-inline-flex align-items-center gap-2 px-4">
                <FaCheckCircle /> You&apos;re on the list! We&apos;ll email you when Pro is ready.
              </div>
            ) : (
              <form className="d-flex justify-content-center gap-2 flex-wrap" onSubmit={handleWaitlist}>
                <input
                  type="email"
                  className="form-control search-input"
                  style={{ maxWidth: 340 }}
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-warning fw-semibold">Notify Me</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
