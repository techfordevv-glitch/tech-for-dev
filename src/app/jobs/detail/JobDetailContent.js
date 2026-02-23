"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
  FaBuilding,
  FaTag,
} from "react-icons/fa";
import ShareButtons from "@/components/ShareButtons";
import BookmarkButton from "@/components/BookmarkButton";

export default function JobDetailContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const company = searchParams.get("company") || "";
  const companyLogo = searchParams.get("logo") || "";
  const category = searchParams.get("category") || "";
  const jobType = searchParams.get("type") || "Full Time";
  const location = searchParams.get("location") || "";
  const salary = searchParams.get("salary") || "";
  const url = searchParams.get("url") || "";
  const description = searchParams.get("desc") || "";
  const date = searchParams.get("date") || "";
  const tags = searchParams.get("tags") || "";

  if (!title) {
    return (
      <div className="container py-5 text-center">
        <FaBriefcase size={60} className="mb-3 opacity-25" />
        <h3>Job listing not found</h3>
        <p className="text-secondary">The job listing you&apos;re looking for is unavailable.</p>
        <Link href="/jobs" className="btn btn-primary mt-3">
          Back to Jobs
        </Link>
      </div>
    );
  }

  const tagArray = tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [];
  const publishDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <Link
            href="/jobs"
            className="btn btn-outline-success btn-sm mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft size={12} /> Back to Jobs
          </Link>
          <div className="d-flex align-items-center gap-3 mb-3">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={company}
                className="rounded bg-light"
                style={{ width: 60, height: 60, objectFit: "contain", padding: 5 }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            ) : (
              <div
                className="rounded d-flex align-items-center justify-content-center"
                style={{ width: 60, height: 60, background: "rgba(255,255,255,0.1)" }}
              >
                <FaBriefcase size={24} />
              </div>
            )}
            <div>
              <h1 className="mb-1">{title}</h1>
              <p className="mb-0 text-secondary d-flex align-items-center gap-2">
                <FaBuilding size={12} /> {company}
              </p>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">{jobType}</span>
            {category && (
              <span className="badge bg-info bg-opacity-10 text-info px-3 py-2">{category}</span>
            )}
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Job Description */}
            {description && (
              <section className="mb-5">
                <h4 className="fw-bold mb-3">Job Description</h4>
                <div
                  className="article-content text-secondary"
                  style={{ fontSize: "1.05rem", lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </section>
            )}

            {/* Tags */}
            {tagArray.length > 0 && (
              <section className="mb-5">
                <h4 className="fw-bold mb-3">
                  <FaTag className="text-primary me-2" size={16} />
                  Required Skills
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {tagArray.map((tag, i) => (
                    <span key={i} className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 fs-6">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Share Buttons */}
            <div className="mb-4">
              <ShareButtons url={url} title={`${title} at ${company}`} description={`Remote ${jobType} position`} />
            </div>

            {/* Apply CTA */}
            <div
              className="p-4 rounded-3 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(5,150,105,0.08) 100%)",
                border: "1px solid rgba(16,185,129,0.15)",
              }}
            >
              <FaBriefcase size={30} className="text-success mb-3" />
              <h5 className="fw-bold mb-2">Interested in this role?</h5>
              <p className="text-secondary mb-3">
                Apply directly on the company&apos;s website
              </p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-success px-5 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
              >
                Apply Now <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div
              className="p-4 rounded-3 mb-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "sticky",
                top: 80,
              }}
            >
              {/* Company */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Company</h6>
                <div className="d-flex align-items-center gap-2 fs-5">
                  <FaBuilding className="text-primary" />
                  <span className="fw-bold">{company}</span>
                </div>
              </div>

              {/* Location */}
              {location && (
                <div className="mb-4">
                  <h6 className="text-muted text-uppercase small mb-2">Location</h6>
                  <div className="d-flex align-items-center gap-2">
                    <FaMapMarkerAlt className="text-danger" size={14} />
                    <span>{location}</span>
                  </div>
                </div>
              )}

              {/* Salary */}
              {salary && (
                <div className="mb-4">
                  <h6 className="text-muted text-uppercase small mb-2">Salary</h6>
                  <div className="d-flex align-items-center gap-2">
                    <FaDollarSign className="text-success" size={14} />
                    <span className="fw-semibold">{salary}</span>
                  </div>
                </div>
              )}

              {/* Job Type */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Job Type</h6>
                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                  {jobType}
                </span>
              </div>

              {/* Posted Date */}
              {publishDate && (
                <div className="mb-4">
                  <h6 className="text-muted text-uppercase small mb-2">Posted</h6>
                  <div className="d-flex align-items-center gap-2">
                    <FaClock className="text-muted" size={12} />
                    <span>{publishDate}</span>
                  </div>
                </div>
              )}

              <hr style={{ borderColor: "rgba(255,255,255,0.06)" }} />

              {/* Bookmark */}
              <div className="mb-3 d-flex justify-content-center">
                <BookmarkButton
                  item={{ title, company, url, location, salary }}
                  type="job"
                />
              </div>

              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-success w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
              >
                Apply Now <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
