"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useRouter } from "next/navigation";
import { FaKeyboard, FaTimes } from "react-icons/fa";

const shortcuts = [
  { key: "/",      desc: "Focus search bar" },
  { key: "Alt+D",  desc: "Cycle theme (dark/light/sepia/oled)" },
  { key: "h",      desc: "Go to Home" },
  { key: "n",      desc: "Go to News" },
  { key: "a",      desc: "Go to AI Tools" },
  { key: "r",      desc: "Go to Roadmaps" },
  { key: "c",      desc: "Go to Challenges" },
  { key: "t",      desc: "Go to Dev Tools" },
  { key: "p",      desc: "Go to Profile" },
  { key: "s",      desc: "Go to Saved" },
  { key: "?",      desc: "Show this help" },
  { key: "Esc",    desc: "Dismiss search / this modal" },
];

export default function KeyboardShortcuts() {
  const { cycleTheme } = useTheme();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) return;

      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const searchInput = document.querySelector(".global-search-input");
        if (searchInput) searchInput.focus();
      }
      if (e.key === "d" && e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        cycleTheme();
      }
      if (e.key === "h" && !e.ctrlKey && !e.metaKey && !e.shiftKey) router.push("/");
      if (e.key === "n" && !e.ctrlKey && !e.metaKey && !e.shiftKey) router.push("/news");
      if (e.key === "a" && !e.ctrlKey && !e.metaKey && !e.shiftKey) router.push("/ai-tools");
      if (e.key === "r" && !e.ctrlKey && !e.metaKey && !e.shiftKey) router.push("/roadmaps");
      if (e.key === "c" && !e.ctrlKey && !e.metaKey && !e.shiftKey) router.push("/challenges");
      if (e.key === "t" && !e.ctrlKey && !e.metaKey && !e.shiftKey) router.push("/devtools");
      if (e.key === "p" && !e.ctrlKey && !e.metaKey && !e.shiftKey) router.push("/profile");
      if (e.key === "s" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        router.push("/saved");
      }
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        setShowModal((prev) => !prev);
      }
      if (e.key === "Escape") {
        setShowModal(false);
        const searchInput = document.querySelector(".global-search-input");
        if (searchInput) searchInput.blur();
        document.querySelectorAll(".search-dropdown.show").forEach((el) => {
          el.classList.remove("show");
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cycleTheme, router]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  return (
    <>
      {/* Keyboard shortcuts modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: 12,
              padding: "1.5rem",
              minWidth: 320,
              maxWidth: 440,
              width: "100%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <FaKeyboard className="text-primary" /> Keyboard Shortcuts
              </h5>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", fontSize: 18 }}
              >
                <FaTimes />
              </button>
            </div>
            <div className="d-flex flex-column gap-2">
              {shortcuts.map((sc) => (
                <div key={sc.key} className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <span style={{ color: "var(--text-secondary)", fontSize: 14 }}>{sc.desc}</span>
                  <kbd style={{
                    background: "var(--filter-bg)",
                    border: "1px solid var(--filter-border)",
                    borderRadius: 6,
                    padding: "2px 10px",
                    fontSize: 13,
                    fontFamily: "monospace",
                    color: "var(--text-primary)",
                    minWidth: 36,
                    textAlign: "center",
                  }}>{sc.key}</kbd>
                </div>
              ))}
            </div>
            <p className="text-muted small mt-3 mb-0 text-center">Press <kbd style={{ fontSize: 11, padding: "1px 6px", borderRadius: 4, border: "1px solid var(--border-color)", background: "var(--filter-bg)" }}>?</kbd> or <kbd style={{ fontSize: 11, padding: "1px 6px", borderRadius: 4, border: "1px solid var(--border-color)", background: "var(--filter-bg)" }}>Esc</kbd> to close</p>
          </div>
        </div>
      )}
    </>
  );
}

