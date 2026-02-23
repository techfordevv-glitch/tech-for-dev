"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaNewspaper, FaRobot, FaBookOpen, FaGithub, FaTimes } from "react-icons/fa";
import { aiTools } from "@/lib/aitools";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Search across data sources
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matched = [];

    // Search AI tools (instant, local data)
    aiTools.forEach((tool) => {
      if (
        tool.name.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
      ) {
        matched.push({
          type: "ai-tool",
          title: tool.name,
          desc: tool.category,
          icon: <FaRobot className="text-info" />,
          href: `/ai-tools/${tool.id}`,
        });
      }
    });

    // Quick links for sections
    const sections = [
      { name: "Tech News", icon: <FaNewspaper className="text-primary" />, href: `/news?q=${encodeURIComponent(query)}` },
      { name: "Articles", icon: <FaBookOpen className="text-success" />, href: `/articles?tag=${encodeURIComponent(query)}` },
      { name: "Projects", icon: <FaGithub className="text-warning" />, href: `/projects?lang=${encodeURIComponent(query)}` },
    ];

    sections.forEach((s) => {
      matched.push({
        type: "search",
        title: `Search "${query}" in ${s.name}`,
        desc: `Go to ${s.name}`,
        icon: s.icon,
        href: s.href,
      });
    });

    setResults(matched.slice(0, 8));
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (href) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <div className="global-search-wrapper" ref={dropdownRef}>
      <div className="global-search-box">
        <FaSearch className="search-icon" size={13} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          placeholder="Search... ( / )"
          className="global-search-input"
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(""); setOpen(false); }}>
            <FaTimes size={12} />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="search-dropdown show">
          {results.map((r, i) => (
            <button
              key={i}
              className="search-result-item"
              onClick={() => handleSelect(r.href)}
            >
              <span className="search-result-icon">{r.icon}</span>
              <div className="search-result-text">
                <span className="search-result-title">{r.title}</span>
                <span className="search-result-desc">{r.desc}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
