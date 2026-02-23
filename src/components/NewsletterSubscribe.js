"use client";
import { useState } from "react";
import { FaEnvelope, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

export default function NewsletterSubscribe({ compact = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg(data.message || "You're subscribed! Check your inbox.");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again.");
    }
  }

  if (compact) {
    return (
      <div className="d-flex flex-column gap-2">
        {status === "success" ? (
          <div className="d-flex align-items-center gap-2 text-success small fw-semibold">
            <FaCheckCircle /> {msg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="d-flex gap-2">
            <input
              type="email"
              className="form-control form-control-sm"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              style={{ minWidth: 0, flex: 1 }}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm d-flex align-items-center gap-1"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                <><FaPaperPlane size={11} /> Sub</>
              )}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mb-0 text-danger" style={{ fontSize: 11 }}>{msg}</p>
        )}
      </div>
    );
  }

  return (
    <section
      className="py-5 my-5 rounded-4 text-center"
      style={{
        background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)",
        border: "1px solid rgba(99,102,241,0.2)",
      }}
    >
      <div className="container" style={{ maxWidth: 560 }}>
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
          style={{ width: 60, height: 60, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
        >
          <FaEnvelope size={22} color="#fff" />
        </div>
        <h3 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>Stay in the Loop</h3>
        <p className="text-secondary mb-4">
          Get the latest developer news, tools, and resources delivered to your inbox weekly. No spam, ever.
        </p>

        {status === "success" ? (
          <div
            className="d-flex align-items-center justify-content-center gap-2 py-3 px-4 rounded-3 fw-semibold"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}
          >
            <FaCheckCircle size={18} /> {msg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="d-flex gap-2 justify-content-center flex-wrap">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
              disabled={status === "loading"}
              style={{ maxWidth: 320 }}
            />
            <button
              type="submit"
              className="btn btn-primary d-flex align-items-center gap-2"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <><span className="spinner-border spinner-border-sm" /> Subscribing...</>
              ) : (
                <><FaPaperPlane size={13} /> Subscribe</>
              )}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 mb-0 text-danger small">{msg}</p>
        )}
        <p className="mt-3 mb-0 text-secondary" style={{ fontSize: 12 }}>
          Join 5,000+ developers • Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
