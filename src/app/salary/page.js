"use client";
import { useState } from "react";
import { FaMoneyBillWave, FaGlobe, FaBriefcase } from "react-icons/fa";

const SALARY_DATA = [
  // role, country, remote (USD/yr), onsite (USD/yr), yoe (years of exp range), source
  { role: "Frontend Developer", country: "USA", remote: 110000, onsite: 105000, yoe: "2-4 yrs", currency: "$" },
  { role: "Frontend Developer", country: "Germany", remote: 62000, onsite: 58000, yoe: "2-4 yrs", currency: "€" },
  { role: "Frontend Developer", country: "India", remote: 18000, onsite: 14000, yoe: "2-4 yrs", currency: "$" },
  { role: "Frontend Developer", country: "UK", remote: 72000, onsite: 68000, yoe: "2-4 yrs", currency: "£" },
  { role: "Frontend Developer", country: "Canada", remote: 85000, onsite: 80000, yoe: "2-4 yrs", currency: "CA$" },
  { role: "Backend Developer", country: "USA", remote: 125000, onsite: 120000, yoe: "2-5 yrs", currency: "$" },
  { role: "Backend Developer", country: "Germany", remote: 72000, onsite: 68000, yoe: "2-5 yrs", currency: "€" },
  { role: "Backend Developer", country: "India", remote: 22000, onsite: 18000, yoe: "2-5 yrs", currency: "$" },
  { role: "Backend Developer", country: "UK", remote: 82000, onsite: 78000, yoe: "2-5 yrs", currency: "£" },
  { role: "Backend Developer", country: "Canada", remote: 95000, onsite: 90000, yoe: "2-5 yrs", currency: "CA$" },
  { role: "Full Stack Developer", country: "USA", remote: 130000, onsite: 125000, yoe: "3-6 yrs", currency: "$" },
  { role: "Full Stack Developer", country: "Germany", remote: 75000, onsite: 70000, yoe: "3-6 yrs", currency: "€" },
  { role: "Full Stack Developer", country: "India", remote: 25000, onsite: 20000, yoe: "3-6 yrs", currency: "$" },
  { role: "Full Stack Developer", country: "UK", remote: 88000, onsite: 84000, yoe: "3-6 yrs", currency: "£" },
  { role: "Full Stack Developer", country: "Canada", remote: 100000, onsite: 96000, yoe: "3-6 yrs", currency: "CA$" },
  { role: "ML / AI Engineer", country: "USA", remote: 165000, onsite: 160000, yoe: "3-7 yrs", currency: "$" },
  { role: "ML / AI Engineer", country: "Germany", remote: 90000, onsite: 85000, yoe: "3-7 yrs", currency: "€" },
  { role: "ML / AI Engineer", country: "India", remote: 35000, onsite: 28000, yoe: "3-7 yrs", currency: "$" },
  { role: "ML / AI Engineer", country: "UK", remote: 110000, onsite: 105000, yoe: "3-7 yrs", currency: "£" },
  { role: "ML / AI Engineer", country: "Canada", remote: 130000, onsite: 125000, yoe: "3-7 yrs", currency: "CA$" },
  { role: "DevOps / SRE", country: "USA", remote: 135000, onsite: 130000, yoe: "3-6 yrs", currency: "$" },
  { role: "DevOps / SRE", country: "Germany", remote: 80000, onsite: 75000, yoe: "3-6 yrs", currency: "€" },
  { role: "DevOps / SRE", country: "India", remote: 28000, onsite: 22000, yoe: "3-6 yrs", currency: "$" },
  { role: "DevOps / SRE", country: "UK", remote: 92000, onsite: 88000, yoe: "3-6 yrs", currency: "£" },
  { role: "DevOps / SRE", country: "Canada", remote: 105000, onsite: 100000, yoe: "3-6 yrs", currency: "CA$" },
  { role: "Mobile Developer", country: "USA", remote: 120000, onsite: 115000, yoe: "2-5 yrs", currency: "$" },
  { role: "Mobile Developer", country: "Germany", remote: 68000, onsite: 64000, yoe: "2-5 yrs", currency: "€" },
  { role: "Mobile Developer", country: "India", remote: 20000, onsite: 16000, yoe: "2-5 yrs", currency: "$" },
  { role: "Mobile Developer", country: "UK", remote: 78000, onsite: 74000, yoe: "2-5 yrs", currency: "£" },
  { role: "Mobile Developer", country: "Canada", remote: 92000, onsite: 88000, yoe: "2-5 yrs", currency: "CA$" },
  { role: "Tech Lead", country: "USA", remote: 180000, onsite: 175000, yoe: "7+ yrs", currency: "$" },
  { role: "Tech Lead", country: "Germany", remote: 105000, onsite: 100000, yoe: "7+ yrs", currency: "€" },
  { role: "Tech Lead", country: "India", remote: 45000, onsite: 38000, yoe: "7+ yrs", currency: "$" },
  { role: "Tech Lead", country: "UK", remote: 130000, onsite: 125000, yoe: "7+ yrs", currency: "£" },
  { role: "Tech Lead", country: "Canada", remote: 145000, onsite: 140000, yoe: "7+ yrs", currency: "CA$" },
];

const ROLES = ["All", ...new Set(SALARY_DATA.map((d) => d.role))];
const COUNTRIES = ["All", ...new Set(SALARY_DATA.map((d) => d.country))];

const MAX_SALARY = 200000;
const COLORS = { remote: "#3b82f6", onsite: "#10b981" };

function BarChart({ remote, onsite, currency }) {
  const remPct = (remote / MAX_SALARY) * 100;
  const onsPct = (onsite / MAX_SALARY) * 100;
  const fmt = (n) => currency + (n >= 1000 ? (n / 1000).toFixed(0) + "k" : n);
  return (
    <div>
      {[["Remote", remote, remPct, COLORS.remote], ["Onsite", onsite, onsPct, COLORS.onsite]].map(([label, val, pct, color]) => (
        <div key={label} className="mb-2">
          <div className="d-flex justify-content-between mb-1">
            <span className="small text-secondary">{label}</span>
            <span className="small fw-bold" style={{ color }}>{fmt(val)}</span>
          </div>
          <div className="rounded" style={{ height: 8, background: "var(--border-color)", overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: color, transition: "width 0.6s ease" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SalaryPage() {
  const [role, setRole] = useState("All");
  const [country, setCountry] = useState("All");

  const filtered = SALARY_DATA.filter(
    (d) => (role === "All" || d.role === role) && (country === "All" || d.country === country)
  );

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-3 mb-2">
        <FaMoneyBillWave size={28} className="text-primary" />
        <h1 className="h2 mb-0 fw-bold">Tech Salary Insights</h1>
      </div>
      <p className="text-secondary mb-1">Approximate annual salary ranges for developer roles worldwide.</p>
      <p className="text-secondary small mb-4" style={{ fontSize: "0.75rem" }}>
        📊 Data sourced from Levels.fyi, Glassdoor, LinkedIn — approximate averages (2024-25). USD equivalent.
      </p>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <label className="form-label text-secondary small mb-1"><FaBriefcase size={11} className="me-1" />Role</label>
          <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label text-secondary small mb-1"><FaGlobe size={11} className="me-1" />Country</label>
          <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Stats summary */}
      {filtered.length > 0 && (
        <div className="row g-3 mb-4">
          {[
            { label: "Avg Remote", val: Math.round(filtered.reduce((a, d) => a + d.remote, 0) / filtered.length), color: "#3b82f6", icon: "🌍" },
            { label: "Avg Onsite", val: Math.round(filtered.reduce((a, d) => a + d.onsite, 0) / filtered.length), color: "#10b981", icon: "🏢" },
            { label: "Highest", val: Math.max(...filtered.map((d) => d.remote)), color: "#8b5cf6", icon: "🏆" },
            { label: "Lowest", val: Math.min(...filtered.map((d) => d.remote)), color: "#f59e0b", icon: "📉" },
          ].map(({ label, val, color, icon }) => (
            <div key={label} className="col-6 col-md-3">
              <div className="card p-3 text-center">
                <div style={{ fontSize: "1.4rem" }}>{icon}</div>
                <div className="fw-bold mt-1" style={{ color, fontSize: "1.3rem" }}>
                  {val >= 1000 ? "$" + (val / 1000).toFixed(0) + "k" : "$" + val}
                </div>
                <div className="text-secondary small">{label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Data cards */}
      <div className="row g-3">
        {filtered.map((d, i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="card p-4 h-100">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="fw-bold mb-0">{d.role}</h6>
                  <div className="d-flex gap-2 mt-1">
                    <span className="badge rounded-pill" style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6", fontSize: "0.65rem" }}>🌍 {d.country}</span>
                    <span className="badge rounded-pill" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", fontSize: "0.65rem" }}>⏱ {d.yoe}</span>
                  </div>
                </div>
              </div>
              <BarChart remote={d.remote} onsite={d.onsite} currency={d.currency} />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-5 text-secondary">
          <FaMoneyBillWave size={40} className="mb-3 opacity-25" />
          <p>No data found for selected filters.</p>
        </div>
      )}

      <div className="text-center mt-4 text-secondary small">
        💡 Salaries are approximate ranges. Actual compensation varies with experience, company size, and skills.
      </div>
    </div>
  );
}
