"use client";

import Link from "next/link";
import { FaStar, FaCodeBranch, FaExternalLinkAlt, FaCircle } from "react-icons/fa";
import BookmarkButton from "./BookmarkButton";

export default function ProjectCard({ repo }) {
  const {
    name,
    full_name,
    description,
    html_url,
    stargazers_count,
    forks_count,
    language,
    owner,
    topics,
  } = repo;

  const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Rust: "#dea584",
    Go: "#00ADD8",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    Vue: "#41b883",
    Svelte: "#ff3e00",
  };

  return (
    <div className="card h-100 shadow-sm border-0 project-card">
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center gap-2 mb-3">
          <img
            src={owner?.avatar_url}
            alt={owner?.login}
            className="rounded-circle"
            style={{ width: 32, height: 32 }}
          />
          <div style={{ overflow: "hidden" }}>
            <small className="text-muted d-block text-truncate">{full_name}</small>
          </div>
        </div>

        <h6 className="card-title fw-bold">{name}</h6>
        <p className="card-text text-muted small flex-grow-1">
          {description?.substring(0, 120)}
          {description?.length > 120 ? "..." : ""}
        </p>

        <div className="d-flex flex-wrap gap-1 mb-3">
          {topics?.slice(0, 4).map((topic, i) => (
            <span key={i} className="badge bg-primary bg-opacity-10 text-primary small">
              {topic}
            </span>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 small">
            {language && (
              <span className="d-flex align-items-center gap-1">
                <FaCircle
                  size={8}
                  style={{ color: languageColors[language] || "#888" }}
                />
                {language}
              </span>
            )}
            <span className="d-flex align-items-center gap-1 text-muted">
              <FaStar className="text-warning" size={12} />
              {stargazers_count?.toLocaleString()}
            </span>
            <span className="d-flex align-items-center gap-1 text-muted">
              <FaCodeBranch size={12} />
              {forks_count?.toLocaleString()}
            </span>
          </div>
          <Link
            href={`/projects/${full_name}`}
            className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1"
          >
            Details <FaExternalLinkAlt size={9} />
          </Link>
          <BookmarkButton
            item={{
              id: full_name,
              type: "project",
              title: name,
              description,
              image: owner?.avatar_url,
              url: `/projects/${full_name}`,
            }}
            size={14}
          />
        </div>
      </div>
    </div>
  );
}
