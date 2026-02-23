"use client";
import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaTrash, FaExpand, FaCompress } from "react-icons/fa";

function renderMarkdown(text) {
  return text
    .replace(/```(\w+)?\n?([\s\S]*?)```/g, '<pre style="background:var(--bg-secondary,#f3f4f6);border:1px solid var(--border-color,#e5e7eb);border-radius:8px;padding:12px;overflow-x:auto;font-size:12px;margin:8px 0"><code style="color:var(--text-primary)">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code style="background:var(--bg-secondary,#f3f4f6);color:var(--text-primary);padding:2px 5px;border-radius:4px;font-size:12px">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^#{1,3} (.+)$/gm, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [teaserIdx, setTeaserIdx] = useState(0);
  const [teaserVisible, setTeaserVisible] = useState(true);
  const TEASERS = [
    "👋 Need help with code?",
    "💡 Ask me anything dev-related!",
    "🚀 Stuck on a bug? I'm here!",
    "🧠 Learn something new today!",
    "⚡ Powered by Groq AI",
  ];

  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      setTeaserVisible(false);
      setTimeout(() => {
        setTeaserIdx(i => (i + 1) % TEASERS.length);
        setTeaserVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [open]);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hey! I'm TechForDev Bot. Ask me anything about coding, tech, or your career!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.filter(m => m.role !== "assistant" || newMessages.indexOf(m) > 0) }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply || "Sorry, something went wrong." }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  const widgetWidth = expanded ? 480 : 360;
  const widgetHeight = expanded ? 600 : 480;

  return (
    <>
      {/* Floating Button + teaser */}
      {!open && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1200, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
          {/* Teaser bubble */}
          <div style={{
            background: "var(--bg-card, #fff)",
            border: "1px solid var(--border-color, #e5e7eb)",
            borderRadius: "14px 14px 4px 14px",
            padding: "8px 14px",
            fontSize: 13,
            color: "var(--text-primary)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            whiteSpace: "nowrap",
            opacity: teaserVisible ? 1 : 0,
            transform: teaserVisible ? "translateY(0) scale(1)" : "translateY(6px) scale(0.95)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            pointerEvents: "none",
          }}>
            {TEASERS[teaserIdx]}
          </div>

          {/* Ripple + button wrapper */}
          <div style={{ position: "relative", width: 56, height: 56 }}>
            <span className="chat-ripple chat-ripple-1" />
            <span className="chat-ripple chat-ripple-2" />
            <span className="chat-ripple chat-ripple-3" />
            <button
              onClick={() => setOpen(true)}
              style={{
                position: "relative", zIndex: 2,
                width: 56, height: 56, borderRadius: "50%", border: "none",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                boxShadow: "0 4px 20px rgba(99,102,241,0.5)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
              title="Chat with TechForDev Bot"
            >
              <FaRobot color="#fff" size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 1200,
            width: widgetWidth, height: widgetHeight,
            borderRadius: 16, overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            display: "flex", flexDirection: "column",
            border: "1px solid rgba(99,102,241,0.3)",
            background: "var(--bg-card, #1a1a2e)",
            transition: "width 0.2s, height 0.2s",
          }}
        >
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            padding: "12px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <FaRobot color="#fff" size={16} />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: "#fff", fontSize: 14 }}>TechForDev Bot</p>
                <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.75)" }}>
                  {loading ? "Typing..." : "Online • Powered by Groq"}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setMessages([{ role: "assistant", content: "👋 Hey! I'm TechForDev Bot. Ask me anything!" }])}
                style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: "#fff" }}
                title="Clear chat">
                <FaTrash size={12} />
              </button>
              <button onClick={() => setExpanded(!expanded)}
                style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: "#fff" }}
                title={expanded ? "Shrink" : "Expand"}>
                {expanded ? <FaCompress size={12} /> : <FaExpand size={12} />}
              </button>
              <button onClick={() => setOpen(false)}
                style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: "#fff" }}>
                <FaTimes size={12} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%",
                  padding: "8px 12px",
                  borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #3b82f6, #6366f1)"
                    : "var(--bg-secondary, #f3f4f6)",
                  border: msg.role === "user" ? "none" : "1px solid var(--border-color, #e5e7eb)",
                  color: msg.role === "user" ? "#fff" : "var(--text-primary)",
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                />
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "10px 14px", borderRadius: "14px 14px 14px 4px",
                  background: "var(--bg-secondary, #f3f4f6)", border: "1px solid var(--border-color, #e5e7eb)",
                  display: "flex", gap: 4,
                }}>
                  {[0,1,2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6",
                      animation: `dotBounce 1.2s ${i*0.2}s infinite`,
                      display: "inline-block",
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length === 1 && (
            <div style={{ padding: "0 12px 8px", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Explain async/await", "Best React practices", "How to crack interviews", "Recommend a tech stack"].map(s => (
                <button key={s} onClick={() => { setInput(s); inputRef.current?.focus(); }}
                  style={{
                    fontSize: 11, padding: "4px 10px", borderRadius: 20, cursor: "pointer",
                    background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.35)",
                    color: "#6366f1", whiteSpace: "nowrap",
                  }}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: "10px 12px", borderTop: "1px solid var(--border-color, #e5e7eb)",
            display: "flex", gap: 8, flexShrink: 0, background: "var(--bg-card)",
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask anything dev-related..."
              disabled={loading}
              style={{
                flex: 1, background: "var(--bg-secondary, #f3f4f6)", border: "1px solid var(--border-color, #e5e7eb)",
                borderRadius: 10, padding: "8px 12px", color: "var(--text-primary)", fontSize: 13, outline: "none",
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                border: "none", borderRadius: 10, padding: "8px 14px",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                opacity: input.trim() && !loading ? 1 : 0.5,
                color: "#fff",
              }}
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .chat-ripple {
          position: absolute;
          top: 50%; left: 50%;
          width: 56px; height: 56px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: rgba(99,102,241,0.35);
          animation: chatWave 2.4s ease-out infinite;
        }
        .chat-ripple-2 { animation-delay: 0.8s; }
        .chat-ripple-3 { animation-delay: 1.6s; }
        @keyframes chatWave {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
