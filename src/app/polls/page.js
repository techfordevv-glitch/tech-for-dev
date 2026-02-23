"use client";
import { useState, useEffect } from "react";
import { FaPoll, FaCheck } from "react-icons/fa";

const POLLS = [
  {
    id: "framework-2025",
    question: "Which frontend framework are you using in 2025?",
    emoji: "⚛️",
    options: ["React / Next.js", "Vue / Nuxt", "Angular", "Svelte", "SolidJS"],
    votes: [620, 180, 140, 95, 45],
  },
  {
    id: "ai-daily",
    question: "Which AI coding assistant do you use daily?",
    emoji: "🤖",
    options: ["GitHub Copilot", "Cursor AI", "ChatGPT", "Gemini", "None"],
    votes: [480, 210, 350, 120, 95],
  },
  {
    id: "db-preference",
    question: "What is your preferred database for new projects?",
    emoji: "🗄️",
    options: ["PostgreSQL", "MongoDB", "MySQL", "Supabase", "SQLite"],
    votes: [390, 260, 180, 220, 75],
  },
  {
    id: "deploy-platform",
    question: "Where do you deploy your apps most often?",
    emoji: "🚀",
    options: ["Vercel", "AWS", "Netlify", "Railway", "DigitalOcean"],
    votes: [440, 310, 185, 120, 95],
  },
  {
    id: "remote-vs-onsite",
    question: "What work setup do you prefer?",
    emoji: "💼",
    options: ["Full remote", "Hybrid", "Onsite", "Freelance"],
    votes: [580, 320, 95, 210],
  },
  {
    id: "lang-2025",
    question: "Which language do you want to learn / improve in 2025?",
    emoji: "📚",
    options: ["Python", "Rust", "Go", "TypeScript", "Kotlin"],
    votes: [410, 230, 195, 340, 110],
  },
];

export default function PollsPage() {
  const [votes, setVotes] = useState({});
  const [pollVotes, setPollVotes] = useState(() => POLLS.reduce((acc, p) => ({ ...acc, [p.id]: [...p.votes] }), {}));

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("community_votes") || "{}");
      setVotes(saved);
      // Apply saved votes to counts
      const updated = POLLS.reduce((acc, p) => ({ ...acc, [p.id]: [...p.votes] }), {});
      Object.entries(saved).forEach(([pollId, optIdx]) => {
        if (updated[pollId] !== undefined) updated[pollId][optIdx]++;
      });
      setPollVotes(updated);
    } catch {}
  }, []);

  const vote = (pollId, optIdx) => {
    if (votes[pollId] !== undefined) return; // already voted
    setVotes((prev) => {
      const next = { ...prev, [pollId]: optIdx };
      localStorage.setItem("community_votes", JSON.stringify(next));
      return next;
    });
    setPollVotes((prev) => {
      const updated = [...(prev[pollId] || [])];
      updated[optIdx] = (updated[optIdx] || 0) + 1;
      return { ...prev, [pollId]: updated };
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-3 mb-2">
        <FaPoll size={28} className="text-primary" />
        <h1 className="h2 mb-0 fw-bold">Community Polls</h1>
      </div>
      <p className="text-secondary mb-4">Vote on weekly tech polls. See what the developer community thinks!</p>

      <div className="row g-4">
        {POLLS.map((poll) => {
          const userVote = votes[poll.id];
          const counts = pollVotes[poll.id] || poll.votes;
          const total = counts.reduce((a, b) => a + b, 0);
          const hasVoted = userVote !== undefined;

          return (
            <div key={poll.id} className="col-md-6">
              <div className="card p-4 h-100">
                <h5 className="fw-bold mb-1">{poll.emoji} {poll.question}</h5>
                <p className="text-secondary small mb-3">{total.toLocaleString()} total votes</p>

                {poll.options.map((opt, i) => {
                  const pct = total > 0 ? Math.round((counts[i] / total) * 100) : 0;
                  const isChosen = userVote === i;
                  const isWinner = hasVoted && counts[i] === Math.max(...counts);

                  return (
                    <div key={i} className="mb-2">
                      <button
                        className="w-100 text-start p-0 bg-transparent border-0"
                        onClick={() => vote(poll.id, i)}
                        disabled={hasVoted}
                        style={{ cursor: hasVoted ? "default" : "pointer" }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <div className="d-flex align-items-center gap-2">
                            {isChosen && <FaCheck size={10} style={{ color: "#3b82f6" }} />}
                            <span style={{ fontSize: "0.85rem", fontWeight: isChosen ? 700 : 400, color: isChosen ? "#3b82f6" : "var(--text-primary)" }}>{opt}</span>
                            {isWinner && hasVoted && <span style={{ fontSize: "0.65rem", background: "#f59e0b", color: "#000", borderRadius: 8, padding: "1px 6px", fontWeight: 700 }}>🏆 Leading</span>}
                          </div>
                          {hasVoted && <span className="text-secondary small">{pct}%</span>}
                        </div>
                        <div className="rounded" style={{ height: 6, background: "var(--border-color)", overflow: "hidden" }}>
                          {hasVoted && (
                            <div style={{ width: `${pct}%`, height: "100%", background: isChosen ? "#3b82f6" : "#10b981", transition: "width 0.8s ease" }} />
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}

                {!hasVoted && (
                  <p className="text-secondary small mt-2 mb-0" style={{ fontSize: "0.72rem" }}>👆 Click an option to vote and see results</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
