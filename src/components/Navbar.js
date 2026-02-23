"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaBolt,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaBookmark,
  FaChevronDown,
  FaHome,
  FaNewspaper,
  FaRobot,
  FaBookOpen,
  FaGithub,
  FaYoutube,
  FaBriefcase,
  FaPodcast,
  FaReddit,
  FaStackOverflow,
  FaCalendarAlt,
  FaChartBar,
  FaBookmark as FaBookmarkSolid,
  FaLayerGroup,
  FaCode,
  FaBrain,
  FaRoute,
  FaBalanceScale,
  FaTools,
  FaDollarSign,
  FaPoll,
  FaFileAlt,
  FaLeaf,
  FaCircle,
  FaComments,
  FaUserTie,
  FaBook,
  FaLaugh,
  FaUser,
} from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import { useBookmarks } from "./BookmarkProvider";
import GlobalSearch from "./GlobalSearch";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [othersOpen, setOthersOpen] = useState(false);
  const { theme, toggleTheme, cycleTheme } = useTheme();

  const themeIcon = theme === "dark" ? <FaMoon /> : theme === "light" ? <FaSun /> : theme === "sepia" ? <FaLeaf /> : <FaCircle />;
  const themeLabel = theme === "dark" ? "Dark" : theme === "light" ? "Light" : theme === "sepia" ? "Sepia" : "OLED";
  const { bookmarkCount } = useBookmarks();

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const close = () => setSidebarOpen(false);

  const mainLinks = [
    { href: "/", label: "Home", icon: <FaHome size={15} /> },
    { href: "/news", label: "Tech News", icon: <FaNewspaper size={15} /> },
    { href: "/devtools", label: "Dev Tools", icon: <FaTools size={15} /> },
    { href: "/free-apis", label: "Free APIs", icon: <FaCode size={15} /> },
    { href: "/ai-models", label: "AI Models", icon: <FaBrain size={15} /> },
    { href: "/projects", label: "Projects", icon: <FaGithub size={15} /> },
  ];

  const moreLinks = [
    { href: "/articles", label: "Articles", icon: <FaBookOpen size={15} /> },
    { href: "/videos", label: "Videos", icon: <FaYoutube size={15} /> },
    { href: "/jobs", label: "Jobs", icon: <FaBriefcase size={15} /> },
    { href: "/podcasts", label: "Podcasts", icon: <FaPodcast size={15} /> },
    { href: "/reddit", label: "Reddit", icon: <FaReddit size={15} /> },
    { href: "/stackoverflow", label: "Stack Overflow", icon: <FaStackOverflow size={15} /> },
    { href: "/events", label: "Events", icon: <FaCalendarAlt size={15} /> },
    { href: "/dashboard", label: "Dashboard", icon: <FaChartBar size={15} /> },
    { href: "/collections", label: "Collections", icon: <FaLayerGroup size={15} /> },
    { href: "/roadmaps", label: "Roadmaps", icon: <FaRoute size={15} /> },
    { href: "/compare", label: "Compare Tech", icon: <FaBalanceScale size={15} /> },
    { href: "/challenges", label: "Challenges", icon: <FaCode size={15} /> },
    { href: "/ai-tools", label: "AI Tools", icon: <FaRobot size={15} /> },
    { href: "/salary", label: "Salary", icon: <FaDollarSign size={15} /> },
    { href: "/polls", label: "Polls", icon: <FaPoll size={15} /> },
    { href: "/ai-tools/code-explainer", label: "Code Explainer", icon: <FaBolt size={15} /> },
    { href: "/ai-tools/resume-reviewer", label: "Resume AI", icon: <FaFileAlt size={15} /> },
    { href: "/profile", label: "My Profile", icon: <FaCode size={15} /> },
  ];

  const othersLinks = [
    { href: "/tools/portfolio", label: "Portfolio Gen", icon: <FaUser size={15} /> },
    { href: "/tools/interview", label: "Interview Coach", icon: <FaUserTie size={15} /> },
    { href: "/tools/json", label: "JSON Formatter", icon: <FaCode size={15} /> },
    { href: "/tools/opensource", label: "Open Source", icon: <FaGithub size={15} /> },
    { href: "/tools/glossary", label: "Tech Glossary", icon: <FaBook size={15} /> },
    { href: "/tools/memes", label: "Dev Memes", icon: <FaLaugh size={15} /> },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
        <div className="container">
          <Link href="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold">
            <img src="/icons/icon.svg" alt="TechForDev" width={28} height={28} style={{ borderRadius: 7 }} />
            <span>TechForDev</span>
          </Link>

          {/* Mobile top-right controls */}
          <div className="d-flex align-items-center gap-2 d-lg-none">
            <Link href="/saved" className="position-relative text-light" title="Saved">
              <FaBookmark size={16} />
              {bookmarkCount > 0 && (
                <span className="bookmark-badge">{bookmarkCount}</span>
              )}
            </Link>
            <button
              className="theme-toggle-btn"
              onClick={cycleTheme}
              aria-label="Cycle theme"
              title={themeLabel}
            >
              {themeIcon}
            </button>
            <button
              className="sidebar-hamburger"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <FaBars size={18} />
            </button>
          </div>

          {/* Desktop nav */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {mainLinks.map((link) => (
                <li className="nav-item" key={link.href}>
                  <Link href={link.href} className="nav-link px-2 d-flex align-items-center gap-1">
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
              {/* More Dropdown (desktop only) */}
              <li
                className="nav-item dropdown"
                style={{ position: "relative" }}
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  className="nav-link px-2 d-flex align-items-center gap-1 bg-transparent border-0"
                  tabIndex={0}
                  onFocus={() => setMoreOpen(true)}
                  onBlur={() => setMoreOpen(false)}
                >
                  More <FaChevronDown size={10} style={{ transition: "transform 0.2s", transform: moreOpen ? "rotate(180deg)" : "none" }} />
                </button>
                {moreOpen && (
                  <div className="more-dropdown">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="more-dropdown-item"
                        onClick={() => setMoreOpen(false)}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Others Dropdown (desktop only) */}
              <li
                className="nav-item dropdown"
                style={{ position: "relative" }}
                onMouseEnter={() => setOthersOpen(true)}
                onMouseLeave={() => setOthersOpen(false)}
              >
                <button
                  className="nav-link px-2 d-flex align-items-center gap-1 bg-transparent border-0"
                  tabIndex={0}
                  onFocus={() => setOthersOpen(true)}
                  onBlur={() => setOthersOpen(false)}
                >
                  Others <FaChevronDown size={10} style={{ transition: "transform 0.2s", transform: othersOpen ? "rotate(180deg)" : "none" }} />
                </button>
                {othersOpen && (
                  <div className="more-dropdown">
                    {othersLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="more-dropdown-item"
                        onClick={() => setOthersOpen(false)}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>

            <div className="d-none d-lg-block me-3">
              <GlobalSearch />
            </div>

            <div className="d-flex align-items-center gap-2">
              <Link
                href="/saved"
                className="position-relative text-light d-none d-lg-flex align-items-center"
              >
                <FaBookmark size={16} />
                {bookmarkCount > 0 && (
                  <span className="bookmark-badge">{bookmarkCount}</span>
                )}
              </Link>
              <button
                className="theme-toggle-btn d-none d-lg-flex"
                onClick={cycleTheme}
                title={themeLabel}
              >
                {themeIcon}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE SIDEBAR OVERLAY ===== */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={close}
      />

      {/* ===== MOBILE SIDEBAR ===== */}
      <aside className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <Link href="/" className="sidebar-brand" onClick={close}>
            <img src="/icons/icon.svg" alt="TechForDev" width={26} height={26} style={{ borderRadius: 6 }} />
            <span>TechForDev</span>
          </Link>
          <button className="sidebar-close-btn" onClick={close} aria-label="Close menu">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="sidebar-search">
          <GlobalSearch />
        </div>

        {/* Nav Links */}
        <nav className="sidebar-nav">
          <p className="sidebar-section-label">Main</p>
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className="sidebar-link" onClick={close}>
              <span className="sidebar-link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          <p className="sidebar-section-label mt-3">Explore More</p>
          {moreLinks.map((link) => (
            <Link key={link.href} href={link.href} className="sidebar-link" onClick={close}>
              <span className="sidebar-link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          <p className="sidebar-section-label mt-3">Tools & Fun</p>
          {othersLinks.map((link) => (
            <Link key={link.href} href={link.href} className="sidebar-link" onClick={close}>
              <span className="sidebar-link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <Link href="/saved" className="sidebar-footer-btn" onClick={close}>
            <FaBookmarkSolid size={15} />
            <span>Saved</span>
            {bookmarkCount > 0 && (
              <span className="sidebar-badge">{bookmarkCount}</span>
            )}
          </Link>
          <button className="sidebar-footer-btn" onClick={cycleTheme}>
            {themeIcon}
            <span>{themeLabel}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
