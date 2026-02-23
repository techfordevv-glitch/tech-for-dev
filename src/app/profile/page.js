"use client";
import { useEffect, useState } from "react";
import { getPointsData, getBadge, awardPoints } from "@/lib/devpoints";
import {
  FaTrophy, FaFire, FaBookOpen, FaCode, FaTools, FaPoll,
  FaCalendarAlt, FaStar, FaChartLine,
} from "react-icons/fa";

export default function ProfilePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Award a visit point on load
    awardPoints("visit", 1);
    setData(getPointsData());
  }, []);

  if (!data) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  const badge = getBadge(data.total);
  const nextBadge = getNextBadge(data.total);

  const stats = [
    { label: "Articles Read", value: data.articlesRead, icon: <FaBookOpen />, pts: 5, color: "#3b82f6" },
    { label: "Challenges Solved", value: data.challengesSolved, icon: <FaCode />, pts: 20, color: "#8b5cf6" },
    { label: "Tools Upvoted", value: data.toolsUpvoted, icon: <FaTools />, pts: 2, color: "#f59e0b" },
    { label: "Polls Voted", value: data.pollsVoted, icon: <FaPoll />, pts: 3, color: "#22c55e" },
    { label: "Total Visits", value: data.visits, icon: <FaCalendarAlt />, pts: 1, color: "#ec4899" },
  ];

  const actionLabels = {
    visit: "Site Visit",
    article_read: "Article Read",
    challenge_solved: "Challenge Solved",
    tool_upvoted: "Tool Upvoted",
    poll_voted: "Poll Voted",
  };

  return (
    <div className="container py-5" style={{ maxWidth: 860 }}>
      {/* Header */}
      <div className="text-center mb-5">
        <div
          className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle fw-bold"
          style={{
            width: 90, height: 90, fontSize: 38,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            boxShadow: "0 0 30px rgba(139,92,246,0.4)",
          }}
        >
          {badge.emoji}
        </div>
        <h2 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>Your Dev Profile</h2>
        <span
          className="badge px-3 py-2 fw-semibold"
          style={{ backgroundColor: badge.color + "22", color: badge.color, border: `1px solid ${badge.color}44`, fontSize: 14, borderRadius: 20 }}
        >
          {badge.emoji} {badge.label}
        </span>
      </div>

      {/* Total Points */}
      <div
        className="rounded-4 p-4 mb-4 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))",
          border: "1px solid rgba(99,102,241,0.25)",
        }}
      >
        <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
          <FaTrophy style={{ color: "#f59e0b" }} size={22} />
          <span className="fw-bold" style={{ fontSize: "2.5rem", color: "var(--text-primary)" }}>
            {data.total}
          </span>
        </div>
        <p className="text-secondary mb-2">Total Dev Points</p>
        {nextBadge && (
          <div>
            <div className="d-flex justify-content-between small text-secondary mb-1">
              <span>{badge.label}</span>
              <span>{nextBadge.label} at {nextBadge.threshold} pts</span>
            </div>
            <div className="progress" style={{ height: 6, borderRadius: 10 }}>
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min(100, (data.total / nextBadge.threshold) * 100)}%`,
                  background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                  borderRadius: 10,
                }}
              />
            </div>
            <p className="small text-secondary mt-1 mb-0">
              {nextBadge.threshold - data.total} more points to <strong>{nextBadge.label}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Stats grid */}
      <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "var(--text-primary)" }}>
        <FaChartLine style={{ color: "#3b82f6" }} /> Activity Stats
      </h5>
      <div className="row g-3 mb-5">
        {stats.map((s) => (
          <div className="col-6 col-md-4" key={s.label}>
            <div
              className="rounded-3 p-3 h-100"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)" }}
            >
              <div className="d-flex align-items-center gap-2 mb-1" style={{ color: s.color }}>
                {s.icon}
                <span className="small fw-semibold" style={{ color: "var(--text-secondary)" }}>{s.label}</span>
              </div>
              <div className="fw-bold" style={{ fontSize: "1.6rem", color: "var(--text-primary)" }}>{s.value}</div>
              <div className="small text-secondary">{s.pts} pts each</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "var(--text-primary)" }}>
        <FaFire style={{ color: "#f59e0b" }} /> Recent Activity
      </h5>
      <div
        className="rounded-3"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color, #333)", overflow: "hidden" }}
      >
        {data.log.length === 0 ? (
          <div className="p-4 text-center text-secondary">No activity yet. Start exploring!</div>
        ) : (
          data.log.slice(0, 15).map((entry, i) => (
            <div
              key={i}
              className="d-flex align-items-center justify-content-between px-3 py-2"
              style={{ borderBottom: i < data.log.length - 1 ? "1px solid var(--border-color, #333)" : "none" }}
            >
              <span className="small" style={{ color: "var(--text-secondary)" }}>
                {actionLabels[entry.action] || entry.action}
              </span>
              <div className="d-flex align-items-center gap-3">
                <span className="small text-secondary" style={{ fontSize: 11 }}>
                  {new Date(entry.ts).toLocaleDateString()}
                </span>
                <span className="badge bg-success bg-opacity-10 text-success" style={{ fontSize: 11 }}>
                  +{entry.points} pts
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-center text-secondary small">
        <FaStar style={{ color: "#f59e0b" }} /> Points are stored locally. Keep exploring to earn more!
      </div>
    </div>
  );
}

function getNextBadge(total) {
  const milestones = [
    { threshold: 10, label: "Newbie" },
    { threshold: 50, label: "Junior Dev" },
    { threshold: 100, label: "Mid Dev" },
    { threshold: 200, label: "Senior Dev" },
    { threshold: 500, label: "Legendary Dev" },
  ];
  return milestones.find((m) => m.threshold > total) || null;
}
