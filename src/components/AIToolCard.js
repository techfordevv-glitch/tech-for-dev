"use client";

import Link from "next/link";
import { FaExternalLinkAlt, FaCheck, FaDollarSign } from "react-icons/fa";

export default function AIToolCard({ tool }) {
  const { name, company, category, description, logo, url, pricing, features, tags } = tool;

  return (
    <div className="card h-100 shadow-sm border-0 ai-tool-card">
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-start gap-3 mb-3">
          <div
            className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: 50, height: 50, overflow: "hidden" }}
          >
            <img
              src={logo}
              alt={name}
              style={{ width: 40, height: 40, objectFit: "contain" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = `<span class="fw-bold text-primary fs-4">${name[0]}</span>`;
              }}
            />
          </div>
          <div>
            <h6 className="card-title fw-bold mb-0">{name}</h6>
            <small className="text-muted">{company}</small>
          </div>
        </div>

        <span className="badge bg-info bg-opacity-10 text-info mb-2 align-self-start">
          {category}
        </span>

        <p className="card-text text-muted small flex-grow-1">
          {description?.substring(0, 140)}
          {description?.length > 140 ? "..." : ""}
        </p>

        <div className="mb-3">
          <div className="d-flex align-items-center gap-1 mb-2 text-success small">
            <FaDollarSign size={12} />
            <span className="fw-semibold">{pricing}</span>
          </div>
          <div className="d-flex flex-wrap gap-1">
            {features?.slice(0, 4).map((f, i) => (
              <span key={i} className="badge bg-light text-dark border small">
                <FaCheck size={8} className="text-success me-1" />
                {f}
              </span>
            ))}
            {features?.length > 4 && (
              <span className="badge bg-light text-muted border small">
                +{features.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="d-flex flex-wrap gap-1 mb-3">
          {tags?.map((tag, i) => (
            <span key={i} className="badge bg-secondary bg-opacity-10 text-secondary small">
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/ai-tools/${tool.id}`}
          className="btn btn-primary btn-sm mt-auto d-flex align-items-center justify-content-center gap-2"
        >
          View Details <FaExternalLinkAlt size={10} />
        </Link>
      </div>
    </div>
  );
}
