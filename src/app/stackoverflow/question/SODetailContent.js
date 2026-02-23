"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaStackOverflow,
  FaArrowUp,
  FaComment,
  FaEye,
  FaCheck,
  FaClock,
  FaUser,
  FaTag,
} from "react-icons/fa";
import ShareButtons from "@/components/ShareButtons";
import BookmarkButton from "@/components/BookmarkButton";

export default function SODetailContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const link = searchParams.get("link") || "";
  const score = searchParams.get("score") || "0";
  const answers = searchParams.get("answers") || "0";
  const views = searchParams.get("views") || "0";
  const tags = searchParams.get("tags") || "";
  const isAnswered = searchParams.get("answered") === "true";
  const body = searchParams.get("body") || "";
  const ownerName = searchParams.get("owner") || "";
  const ownerRep = searchParams.get("rep") || "";
  const ownerAvatar = searchParams.get("avatar") || "";
  const created = searchParams.get("created") || "";

  if (!title) {
    return (
      <div className="container py-5 text-center">
        <FaStackOverflow size={60} className="mb-3 opacity-25" />
        <h3>Question not found</h3>
        <p className="text-secondary">The question you&apos;re looking for is unavailable.</p>
        <Link href="/stackoverflow" className="btn btn-primary mt-3">
          Back to Stack Overflow
        </Link>
      </div>
    );
  }

  const tagArray = tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [];
  const publishDate = created
    ? new Date(Number(created) * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const formatViews = (v) => {
    const n = Number(v);
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toLocaleString();
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <Link
            href="/stackoverflow"
            className="btn btn-outline-warning btn-sm mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft size={12} /> Back to Stack Overflow
          </Link>
          <div className="d-flex align-items-center gap-2 mb-3">
            <FaStackOverflow className="text-warning" size={20} />
            {isAnswered && (
              <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                <FaCheck size={10} className="me-1" /> Answered
              </span>
            )}
            {!isAnswered && (
              <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2">
                Unanswered
              </span>
            )}
          </div>
          <h1 style={{ maxWidth: 800 }} dangerouslySetInnerHTML={{ __html: title }} />
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Stats */}
            <div className="row g-3 mb-5">
              <div className="col-4">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaArrowUp className="text-warning" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                    {Number(score).toLocaleString()}
                  </div>
                  <div className="stat-label">Score</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaComment className="text-info" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                    {answers}
                  </div>
                  <div className="stat-label">Answers</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaEye className="text-success" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                    {formatViews(views)}
                  </div>
                  <div className="stat-label">Views</div>
                </div>
              </div>
            </div>

            {/* Question Body */}
            {body && (
              <section className="mb-5">
                <h4 className="fw-bold mb-3">Question</h4>
                <div
                  className="article-content text-secondary"
                  style={{ fontSize: "1.05rem", lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </section>
            )}

            {/* Tags */}
            {tagArray.length > 0 && (
              <section className="mb-5">
                <h4 className="fw-bold mb-3">
                  <FaTag className="text-primary me-2" size={16} />
                  Tags
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
              <ShareButtons url={link} title={title.replace(/<[^>]*>/g, "")} />
            </div>

            {/* View on SO CTA */}
            <div
              className="p-4 rounded-3 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(244,128,36,0.08) 0%, rgba(188,95,22,0.08) 100%)",
                border: "1px solid rgba(244,128,36,0.15)",
              }}
            >
              <FaStackOverflow size={30} className="text-warning mb-3" />
              <h5 className="fw-bold mb-2">View Full Question & Answers</h5>
              <p className="text-secondary mb-3">
                See all answers, comments, and vote on Stack Overflow
              </p>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="btn btn-warning px-5 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
              >
                View on Stack Overflow <FaExternalLinkAlt size={12} />
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
              {/* Author */}
              {ownerName && (
                <div className="mb-4">
                  <h6 className="text-muted text-uppercase small mb-2">Asked by</h6>
                  <div className="d-flex align-items-center gap-3">
                    {ownerAvatar && (
                      <img
                        src={ownerAvatar}
                        alt={ownerName}
                        className="rounded-circle"
                        style={{ width: 40, height: 40 }}
                      />
                    )}
                    <div>
                      <div className="fw-bold">{ownerName}</div>
                      {ownerRep && (
                        <small className="text-muted">{Number(ownerRep).toLocaleString()} reputation</small>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Status</h6>
                {isAnswered ? (
                  <span className="badge bg-success px-3 py-2">
                    <FaCheck size={10} className="me-1" /> Answered
                  </span>
                ) : (
                  <span className="badge bg-warning px-3 py-2">Unanswered</span>
                )}
              </div>

              {/* Posted */}
              {publishDate && (
                <div className="mb-4">
                  <h6 className="text-muted text-uppercase small mb-2">Asked</h6>
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
                  item={{ title: title.replace(/<[^>]*>/g, ""), url: link, tags: tagArray }}
                  type="stackoverflow"
                />
              </div>

              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="btn btn-warning w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
              >
                View on Stack Overflow <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
