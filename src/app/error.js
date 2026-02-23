"use client";

import { useEffect } from "react";
import { FaExclamationTriangle, FaRedo, FaHome } from "react-icons/fa";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="container py-5 text-center" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <FaExclamationTriangle size={56} className="text-warning mb-4 opacity-75" />
        <h2 className="fw-bold mb-2">Something went wrong</h2>
        <p className="text-muted mb-4" style={{ maxWidth: 400, margin: "0 auto 1.5rem" }}>
          {error?.message || "An unexpected error occurred. Please try again or go back to the home page."}
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button
            className="btn btn-primary d-inline-flex align-items-center gap-2"
            onClick={() => reset()}
          >
            <FaRedo size={13} /> Try Again
          </button>
          <Link href="/" className="btn btn-outline-secondary d-inline-flex align-items-center gap-2">
            <FaHome size={13} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
