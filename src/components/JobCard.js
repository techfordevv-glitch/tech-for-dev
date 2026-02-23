"use client";

import Link from "next/link";
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaExternalLinkAlt, FaDollarSign } from "react-icons/fa";
import { timeAgo } from "@/lib/api";
import BookmarkButton from "@/components/BookmarkButton";

export default function JobCard({ job }) {
  if (!job) return null;

  const {
    title,
    company_name,
    company_logo,
    category,
    job_type,
    publication_date,
    candidate_required_location,
    salary,
    url,
    tags,
  } = job;

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center gap-3 mb-3">
          {company_logo ? (
            <img
              src={company_logo}
              alt={company_name}
              className="rounded"
              style={{ width: 40, height: 40, objectFit: "contain" }}
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <div
              className="rounded d-flex align-items-center justify-content-center"
              style={{
                width: 40,
                height: 40,
                background: "var(--filter-bg)",
                color: "var(--accent-blue)",
              }}
            >
              <FaBriefcase />
            </div>
          )}
          <div style={{ overflow: "hidden" }}>
            <small className="fw-semibold d-block text-truncate">{company_name}</small>
            <small className="text-muted" style={{ fontSize: "0.75rem" }}>
              {job_type || "Full Time"}
            </small>
          </div>
        </div>

        <h6 className="card-title fw-bold flex-grow-1">{title}</h6>

        <div className="d-flex flex-wrap gap-1 mb-2">
          {tags?.slice(0, 3).map((tag, i) => (
            <span key={i} className="badge bg-primary bg-opacity-10 text-primary small">
              {tag}
            </span>
          ))}
        </div>

        <div className="d-flex flex-column gap-1 mb-3 text-muted small">
          {candidate_required_location && (
            <span className="d-flex align-items-center gap-1">
              <FaMapMarkerAlt size={11} /> {candidate_required_location}
            </span>
          )}
          {salary && (
            <span className="d-flex align-items-center gap-1">
              <FaDollarSign size={11} /> {salary}
            </span>
          )}
          {publication_date && (
            <span className="d-flex align-items-center gap-1">
              <FaClock size={10} /> {timeAgo(publication_date)}
            </span>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <BookmarkButton item={{ id: job.id || url, type: "job", title, description: company_name, url }} />
        </div>

        <Link
          href={`/jobs/detail?title=${encodeURIComponent(title)}&company=${encodeURIComponent(company_name || "")}&logo=${encodeURIComponent(company_logo || "")}&category=${encodeURIComponent(category || "")}&type=${encodeURIComponent(job_type || "Full Time")}&location=${encodeURIComponent(candidate_required_location || "")}&salary=${encodeURIComponent(salary || "")}&url=${encodeURIComponent(url || "")}&date=${encodeURIComponent(publication_date || "")}&tags=${encodeURIComponent((tags || []).join(","))}&desc=${encodeURIComponent((job.description || "").substring(0, 2000))}`}
          className="btn btn-outline-primary btn-sm mt-2 w-100 d-flex align-items-center justify-content-center gap-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
