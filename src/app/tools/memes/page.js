"use client";
import { useState, useEffect } from "react";
import { FaLaugh, FaHeart, FaShare, FaRandom } from "react-icons/fa";

const MEMES = [
  { id: 1, category: "General", emoji: "🤣", title: "Works on My Machine™", text: "Developer ships a bug. QA finds it.\nDev: 'Works fine on my machine.'\nQA: 'Ship your machine then.'" },
  { id: 2, category: "Git", emoji: "😱", title: "git commit -m 'fix'", text: "Monday: git commit -m 'refactored codebase'\nTuesday: git commit -m 'minor cleanup'\nWednesday: git commit -m 'fix'\nThursday: git commit -m 'fix2'\nFriday: git commit -m 'PLEASE WORK'" },
  { id: 3, category: "Frontend", emoji: "💀", title: "Center a div", text: "CS Student: I want to work on something challenging.\nInternet: Can you center a div in CSS?\nCS Student: ...I chose the wrong career." },
  { id: 4, category: "General", emoji: "😴", title: "99 bugs in the code", text: "99 little bugs in the code,\n99 little bugs.\nTake one down, patch it around,\n127 little bugs in the code." },
  { id: 5, category: "Meetings", emoji: "😤", title: "This meeting could've been an email", text: "'Let's schedule a sync to discuss the possibility of potentially maybe having a meeting to look at whether we might consider examining the option of talking about it.'" },
  { id: 6, category: "Deadlines", emoji: "🔥", title: "Estimation", text: "Project Manager: How long will this take?\nDev: 2 weeks.\n3 months later...\nPM: Is it done?\nDev: I just need 2 more weeks." },
  { id: 7, category: "Backend", emoji: "🗃️", title: "Database NULL", text: "Database engineer's least favorite joke:\n'Why did the programmer quit his job?'\n'Because he didn't get arrays.'\nActually their least fave: 'NULL pointer exception'" },
  { id: 8, category: "General", emoji: "😎", title: "Senior vs Junior", text: "Junior Dev: This code is terrible, who wrote this mess?\n*checks git blame*\nJunior Dev: ...ah." },
  { id: 9, category: "Frontend", emoji: "🎨", title: "CSS Zen", text: "CSS is like a magic spell:\nYou write position: absolute;\n...turns out everything else on the page was possessed." },
  { id: 10, category: "Git", emoji: "😬", title: "Force Push", text: "git push --force\n\n'I am not throwing away my shot.' — Hamilton\n'I am not throwing away my shot.' — Developer about to overwrite prod" },
  { id: 11, category: "Deadlines", emoji: "🤡", title: "Technical Debt", text: "Tech debt is like eating fast food.\n'We'll clean it up later.'\nLater is now 3 years, 5 devs, and a complete rewrite." },
  { id: 12, category: "General", emoji: "☕", title: "Human == Coffee", text: "A developer is a machine\nthat converts coffee → code.\n\nBug reports convert code → coffee again." },
  { id: 13, category: "Meetings", emoji: "🕐", title: "Standup", text: "Standup meeting:\nEvery dev: 'Working on ticket #1234, no blockers.'\nAlso every dev: *has 47 blockers, too tired to explain*" },
  { id: 14, category: "Frontend", emoji: "🌐", title: "Browser Support", text: "Design: It should look amazing on all browsers!\n*works perfectly in Chrome*\n*looks like abstract art in Internet Explorer*\nDev: Works on all MODERN browsers." },
  { id: 15, category: "Backend", emoji: "📈", title: "Scale", text: "'We need to make this scale to millions of users.'\nCurrent users: 17\n(including the dev team, their moms, and a cat named Whiskers)" },
  { id: 16, category: "General", emoji: "🐛", title: "Debugging", text: "Debugging: Removing the needles from a haystack.\nDebugging with console.log: Adding more hay to find the needle." },
  { id: 17, category: "Git", emoji: "⚡", title: "Merge Conflicts", text: "Git says: CONFLICT in user.js — 43 conflicts.\nDev: picks 'accept incoming'\nAlso dev: *breaks production*\nAlso dev: git stash && git push -f" },
  { id: 18, category: "Deadlines", emoji: "🚀", title: "MVP", text: "MVP means:\n- Startup: minimum viable product\n- Dev: maximum viable procrastination\n- Designer: make visuals prettier\n- PM: ship it yesterday" },
  { id: 19, category: "General", emoji: "🧠", title: "Senior Dev Secret", text: "What makes a Senior Dev senior?\n1. They've made every mistake before.\n2. They Google slower because they're more confident.\n3. They have better excuses." },
  { id: 20, category: "Meetings", emoji: "📊", title: "Agile", text: "'We practice Agile.'\nMeaning: Daily standups that last 45 minutes,\nSprints that end with 60% done,\nand a backlog the size of War and Peace." },
  { id: 21, category: "Backend", emoji: "🔐", title: "Password '123456'", text: "User signup:\nPassword: 123456\nSystem: Password too weak.\nUser: Password123!\nSystem: OK!\nSecurity: 😭" },
  { id: 22, category: "Frontend", emoji: "📱", title: "Mobile First", text: "Design: 'Here's the desktop design.'\nDev: 'What about mobile?'\nDesign: 'Oh just make it smaller.'\nDev: *internal screaming*" },
];

const CATEGORIES = ["All", "General", "Frontend", "Backend", "Git", "Meetings", "Deadlines"];
const CATEGORY_COLORS = { General: "#6366f1", Frontend: "#3b82f6", Backend: "#8b5cf6", Git: "#f97316", Meetings: "#ef4444", Deadlines: "#f59e0b" };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemesPage() {
  const [category, setCategory] = useState("All");
  const [liked, setLiked] = useState({});
  const [order, setOrder] = useState(MEMES.map(m => m.id));
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("meme-likes");
    if (saved) setLiked(JSON.parse(saved));
  }, []);

  const toggleLike = (id) => {
    const next = { ...liked, [id]: !liked[id] };
    setLiked(next);
    localStorage.setItem("meme-likes", JSON.stringify(next));
  };

  const handleShare = (meme) => {
    navigator.clipboard.writeText(`${meme.emoji} ${meme.title}\n\n${meme.text}`);
    setCopied(meme.id);
    setTimeout(() => setCopied(null), 2000);
  };

  const displayMemes = order
    .map(id => MEMES.find(m => m.id === id))
    .filter(m => m && (category === "All" || m.category === category));

  return (
    <div className="container py-5" style={{ maxWidth: 960 }}>
      <div className="text-center mb-5">
        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: 64, height: 64, background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}>
          <FaLaugh size={26} color="#fff" />
        </div>
        <h1 className="fw-bold" style={{ color: "var(--text-primary)" }}>Dev Memes & Humor</h1>
        <p className="text-secondary">Because programming is either debugging or laughing at debugging.</p>
      </div>

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div className="d-flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`btn btn-sm ${category === c ? "btn-primary" : "btn-outline-secondary"}`}
              style={{ borderRadius: 20, fontSize: 12 }}>{c}</button>
          ))}
        </div>
        <button className="btn btn-sm btn-outline-warning d-flex align-items-center gap-2"
          style={{ borderRadius: 20 }}
          onClick={() => setOrder(shuffle(MEMES.map(m => m.id)))}>
          <FaRandom size={12} /> Shuffle
        </button>
      </div>

      <div className="row g-3">
        {displayMemes.map(m => (
          <div key={m.id} className="col-12 col-md-6">
            <div className="rounded-4 h-100 d-flex flex-column" style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color, #333)",
              transition: "transform .15s, box-shadow .15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div className="px-4 pt-4 pb-2">
                <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                  <div>
                    <span style={{ fontSize: 28 }}>{m.emoji}</span>
                    <span className="badge ms-2" style={{
                      backgroundColor: (CATEGORY_COLORS[m.category] || "#6b7280") + "22",
                      color: CATEGORY_COLORS[m.category] || "#6b7280",
                      border: `1px solid ${(CATEGORY_COLORS[m.category] || "#6b7280")}44`,
                      fontSize: 11,
                    }}>{m.category}</span>
                  </div>
                </div>
                <h6 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>{m.title}</h6>
                <p style={{ color: "var(--text-secondary)", fontSize: 13.5, lineHeight: 1.9, whiteSpace: "pre-line" }}>
                  {m.text}
                </p>
              </div>
              <div className="px-4 pb-3 mt-auto d-flex align-items-center gap-3">
                <button onClick={() => toggleLike(m.id)}
                  className="btn btn-sm d-flex align-items-center gap-1"
                  style={{
                    color: liked[m.id] ? "#ef4444" : "var(--text-secondary)",
                    backgroundColor: liked[m.id] ? "#ef444415" : "transparent",
                    border: `1px solid ${liked[m.id] ? "#ef444466" : "var(--border-color, #444)"}`,
                    borderRadius: 20, fontSize: 12,
                  }}>
                  <FaHeart size={11} /> {liked[m.id] ? "Liked!" : "Like"}
                </button>
                <button onClick={() => handleShare(m)}
                  className="btn btn-sm d-flex align-items-center gap-1"
                  style={{
                    color: copied === m.id ? "#22c55e" : "var(--text-secondary)",
                    backgroundColor: "transparent",
                    border: "1px solid var(--border-color, #444)",
                    borderRadius: 20, fontSize: 12,
                  }}>
                  <FaShare size={11} /> {copied === m.id ? "Copied!" : "Share"}
                </button>
              </div>
            </div>
          </div>
        ))}
        {displayMemes.length === 0 && (
          <div className="text-center py-5 text-secondary col-12">
            <FaLaugh size={40} className="mb-3 opacity-25" />
            <p>No memes in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
