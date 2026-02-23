"use client";
import { useState } from "react";
import { FaBalanceScale, FaCheck, FaTimes, FaMinus } from "react-icons/fa";

const STACKS = {
  "React": {
    category: "Frontend Framework",
    color: "#61dafb",
    logo: "⚛️",
    language: "JavaScript / TypeScript",
    license: "MIT",
    creator: "Meta",
    learning: 3,
    performance: 4,
    ecosystem: 5,
    jobMarket: 5,
    bundleSize: 3,
    pros: ["Huge ecosystem & community", "Flexible — choose your own tools", "React Native for mobile", "Strong job market demand"],
    cons: ["Just a library, need extra tools", "Frequent updates", "JSX learning curve"],
  },
  "Vue": {
    category: "Frontend Framework",
    color: "#42b883",
    logo: "💚",
    language: "JavaScript / TypeScript",
    license: "MIT",
    creator: "Evan You",
    learning: 5,
    performance: 4,
    ecosystem: 3,
    jobMarket: 3,
    bundleSize: 4,
    pros: ["Gentle learning curve", "Great documentation", "Options + Composition API", "Smaller bundle size"],
    cons: ["Smaller community than React", "Fewer enterprise adoptions", "Less job market compared to React"],
  },
  "Angular": {
    category: "Frontend Framework",
    color: "#dd0031",
    logo: "🅰️",
    language: "TypeScript",
    license: "MIT",
    creator: "Google",
    learning: 2,
    performance: 4,
    ecosystem: 4,
    jobMarket: 4,
    bundleSize: 2,
    pros: ["Full opinionated framework", "Built-in DI, routing, forms", "Great for large enterprise apps", "Strong TypeScript support"],
    cons: ["Steep learning curve", "Verbose & complex", "Larger bundle size", "Slower development pace"],
  },
  "Next.js": {
    category: "React Framework",
    color: "#000000",
    logo: "▲",
    language: "JavaScript / TypeScript",
    license: "MIT",
    creator: "Vercel",
    learning: 3,
    performance: 5,
    ecosystem: 5,
    jobMarket: 5,
    bundleSize: 4,
    pros: ["SSR + SSG + ISR", "App Router (React Server Components)", "API routes built-in", "Edge deployment"],
    cons: ["Vendor lock-in risk (Vercel)", "Complex caching behavior", "Rapid changes in versions"],
  },
  "PostgreSQL": {
    category: "SQL Database",
    color: "#336791",
    logo: "🐘",
    language: "SQL",
    license: "PostgreSQL License",
    creator: "PostgreSQL Global",
    learning: 3,
    performance: 5,
    ecosystem: 5,
    jobMarket: 5,
    bundleSize: null,
    pros: ["ACID compliant", "Advanced features (JSONB, full-text)", "Excellent performance", "Most popular SQL DB"],
    cons: ["More complex setup than MySQL", "Higher memory usage", "Less simple for small apps"],
  },
  "MongoDB": {
    category: "NoSQL Database",
    color: "#47a248",
    logo: "🍃",
    language: "JavaScript-like",
    license: "SSPL",
    creator: "MongoDB Inc.",
    learning: 4,
    performance: 4,
    ecosystem: 4,
    jobMarket: 4,
    bundleSize: null,
    pros: ["Flexible schema", "Easy horizontal scaling", "JSON-like documents", "Great for rapid prototyping"],
    cons: ["No ACID by default (v4+ has it)", "License changed to SSPL", "Complex joins", "High memory usage"],
  },
  "Python": {
    category: "Programming Language",
    color: "#3776ab",
    logo: "🐍",
    language: "Python",
    license: "PSF",
    creator: "Guido van Rossum",
    learning: 5,
    performance: 2,
    ecosystem: 5,
    jobMarket: 5,
    bundleSize: null,
    pros: ["Most beginner-friendly", "Huge AI/ML ecosystem", "Versatile (web, scripting, data)", "Massive library support"],
    cons: ["Slow execution (GIL)", "Not ideal for mobile", "Dynamic typing can cause bugs"],
  },
  "Rust": {
    category: "Programming Language",
    color: "#ce422b",
    logo: "🦀",
    language: "Rust",
    license: "MIT/Apache",
    creator: "Mozilla",
    learning: 1,
    performance: 5,
    ecosystem: 3,
    jobMarket: 3,
    bundleSize: null,
    pros: ["Memory safe without GC", "Blazing fast performance", "Zero-cost abstractions", "Great for systems programming"],
    cons: ["Very steep learning curve", "Slower development speed", "Smaller ecosystem than Go/Python"],
  },
  "Docker": {
    category: "DevOps Tool",
    color: "#2496ed",
    logo: "🐳",
    language: "YAML / Dockerfile",
    license: "Apache 2.0",
    creator: "Docker Inc.",
    learning: 3,
    performance: 4,
    ecosystem: 5,
    jobMarket: 5,
    bundleSize: null,
    pros: ["Consistent environments", "Easy microservices", "Huge registry (Docker Hub)", "Industry standard"],
    cons: ["Resource overhead", "Security concerns if misconfigured", "Complexity with networking"],
  },
  "Kubernetes": {
    category: "Container Orchestration",
    color: "#326ce5",
    logo: "☸️",
    language: "YAML",
    license: "Apache 2.0",
    creator: "Google / CNCF",
    learning: 1,
    performance: 5,
    ecosystem: 5,
    jobMarket: 5,
    bundleSize: null,
    pros: ["Auto-scaling & self-healing", "Industry standard for orchestration", "Huge CNCF ecosystem", "Multi-cloud support"],
    cons: ["Extremely complex to learn", "Overkill for small apps", "High operational overhead"],
  },
};

const STACK_NAMES = Object.keys(STACKS);

function ScoreBar({ score, color }) {
  if (score === null) return <span className="text-secondary">N/A</span>;
  return (
    <div className="d-flex align-items-center gap-2">
      {[1,2,3,4,5].map((i) => (
        <div key={i} style={{ width: 20, height: 8, borderRadius: 4, background: i <= score ? color : "var(--border-color)", transition: "background 0.3s" }} />
      ))}
      <span className="text-secondary" style={{ fontSize: "0.72rem" }}>{score}/5</span>
    </div>
  );
}

export default function ComparePage() {
  const [left, setLeft] = useState("React");
  const [right, setRight] = useState("Vue");

  const L = STACKS[left];
  const R = STACKS[right];

  const metrics = [
    { key: "learning", label: "Learning Curve" },
    { key: "performance", label: "Performance" },
    { key: "ecosystem", label: "Ecosystem" },
    { key: "jobMarket", label: "Job Market" },
    { key: "bundleSize", label: "Bundle/Size Score" },
  ];

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-3 mb-2">
        <FaBalanceScale size={28} className="text-primary" />
        <h1 className="h2 mb-0 fw-bold">Tech Stack Comparator</h1>
      </div>
      <p className="text-secondary mb-4">Compare two technologies side-by-side to make the right choice for your project.</p>

      {/* Selectors */}
      <div className="row g-3 mb-4 align-items-center">
        <div className="col">
          <select className="form-select form-select-lg" value={left} onChange={(e) => setLeft(e.target.value)}>
            {STACK_NAMES.map((n) => <option key={n} value={n}>{STACKS[n].logo} {n}</option>)}
          </select>
        </div>
        <div className="col-auto">
          <div className="fw-bold text-secondary text-center px-2" style={{ fontSize: "1.2rem" }}>VS</div>
        </div>
        <div className="col">
          <select className="form-select form-select-lg" value={right} onChange={(e) => setRight(e.target.value)}>
            {STACK_NAMES.map((n) => <option key={n} value={n}>{STACKS[n].logo} {n}</option>)}
          </select>
        </div>
      </div>

      {/* Header cards */}
      <div className="row g-3 mb-4">
        {[{ stack: L, name: left }, { stack: R, name: right }].map(({ stack, name }) => (
          <div className="col-6" key={name}>
            <div className="card p-4 text-center h-100" style={{ borderColor: stack.color, borderWidth: 2 }}>
              <div style={{ fontSize: "3rem" }}>{stack.logo}</div>
              <h3 className="h4 fw-bold mt-2 mb-1" style={{ color: stack.color }}>{name}</h3>
              <span className="badge mb-2" style={{ background: stack.color, color: "#fff", borderRadius: 20 }}>{stack.category}</span>
              <div className="text-secondary small">by {stack.creator}</div>
              <div className="text-secondary small">{stack.language} · {stack.license}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Metrics comparison */}
      <div className="card p-4 mb-4">
        <h5 className="fw-bold mb-3">📊 Scores Comparison</h5>
        <div className="table-responsive">
          <table className="table table-borderless align-middle mb-0">
            <thead>
              <tr>
                <th className="text-secondary fw-500" style={{ fontSize: "0.8rem", width: "25%" }}>Metric</th>
                <th style={{ color: L.color, width: "37.5%" }}>{left}</th>
                <th style={{ color: R.color, width: "37.5%" }}>{right}</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map(({ key, label }) => (
                <tr key={key} style={{ borderTop: "1px solid var(--border-color)" }}>
                  <td className="text-secondary small">{label}</td>
                  <td><ScoreBar score={L[key]} color={L.color} /></td>
                  <td><ScoreBar score={R[key]} color={R.color} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pros / Cons */}
      <div className="row g-3">
        {[{ stack: L, name: left }, { stack: R, name: right }].map(({ stack, name }) => (
          <div className="col-md-6" key={name}>
            <div className="card p-4 h-100">
              <h5 className="fw-bold mb-3" style={{ color: stack.color }}>{stack.logo} {name}</h5>
              <div className="mb-3">
                <div className="fw-600 small mb-2 text-success">✅ Pros</div>
                {stack.pros.map((p, i) => (
                  <div key={i} className="d-flex align-items-start gap-2 mb-1">
                    <FaCheck size={10} style={{ color: "#10b981", marginTop: 4, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.82rem" }}>{p}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="fw-600 small mb-2 text-danger">❌ Cons</div>
                {stack.cons.map((c, i) => (
                  <div key={i} className="d-flex align-items-start gap-2 mb-1">
                    <FaTimes size={10} style={{ color: "#ef4444", marginTop: 4, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.82rem" }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
