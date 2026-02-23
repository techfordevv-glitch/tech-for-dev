"use client";

import { useState } from "react";
import { FaPaperPlane, FaCheck } from "react-icons/fa";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="newsletter-form">
      <h6 className="fw-bold mb-2">📧 Newsletter</h6>
      <p className="text-secondary small mb-3">Get weekly tech updates in your inbox</p>
      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="form-control form-control-sm search-input"
          disabled={status === "loading" || status === "success"}
          required
        />
        <button
          type="submit"
          className={`btn btn-sm ${status === "success" ? "btn-success" : "btn-primary"} d-flex align-items-center gap-1`}
          disabled={status === "loading" || status === "success"}
          style={{ whiteSpace: "nowrap" }}
        >
          {status === "loading" ? (
            <span className="spinner-border spinner-border-sm" />
          ) : status === "success" ? (
            <>
              <FaCheck size={12} /> Done!
            </>
          ) : (
            <>
              <FaPaperPlane size={12} /> Join
            </>
          )}
        </button>
      </form>
      {status === "error" && (
        <small className="text-danger mt-1 d-block">Something went wrong. Try again.</small>
      )}
    </div>
  );
}
