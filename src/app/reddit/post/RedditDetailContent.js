"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaReddit,
  FaArrowUp,
  FaComment,
  FaClock,
  FaUser,
  FaGlobe,
} from "react-icons/fa";
import ShareButtons from "@/components/ShareButtons";
import BookmarkButton from "@/components/BookmarkButton";

export default function RedditDetailContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const selftext = searchParams.get("selftext") || "";
  const author = searchParams.get("author") || "";
  const subreddit = searchParams.get("subreddit") || "";
  const score = searchParams.get("score") || "0";
  const numComments = searchParams.get("comments") || "0";
  const permalink = searchParams.get("permalink") || "";
  const url = searchParams.get("url") || "";
  const thumbnail = searchParams.get("thumbnail") || "";
  const flair = searchParams.get("flair") || "";
  const created = searchParams.get("created") || "";

  if (!title) {
    return (
      <div className="container py-5 text-center">
        <FaReddit size={60} className="mb-3 opacity-25" />
        <h3>Post not found</h3>
        <p className="text-secondary">The Reddit post you&apos;re looking for is unavailable.</p>
        <Link href="/reddit" className="btn btn-primary mt-3">
          Back to Reddit
        </Link>
      </div>
    );
  }

  const redditUrl = `https://reddit.com${permalink}`;
  const publishDate = created
    ? new Date(Number(created) * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const showThumb =
    thumbnail && thumbnail.startsWith("http") && !thumbnail.includes("self") && !thumbnail.includes("default");

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <Link
            href="/reddit"
            className="btn btn-outline-warning btn-sm mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft size={12} /> Back to Reddit
          </Link>
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2">
              <FaReddit className="me-1" /> {subreddit || "r/programming"}
            </span>
            {flair && (
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                {flair}
              </span>
            )}
          </div>
          <h1 style={{ maxWidth: 800 }}>{title}</h1>
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
                  <div className="stat-label">Upvotes</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaComment className="text-info" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                    {Number(numComments).toLocaleString()}
                  </div>
                  <div className="stat-label">Comments</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaUser className="text-success" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.3rem" }}>
                    {author}
                  </div>
                  <div className="stat-label">Author</div>
                </div>
              </div>
            </div>

            {/* Thumbnail/Image */}
            {showThumb && (
              <div className="mb-4 rounded-3 overflow-hidden">
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-100"
                  style={{ maxHeight: 450, objectFit: "cover" }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
            )}

            {/* Self Text Content */}
            {selftext && (
              <section className="mb-5">
                <h4 className="fw-bold mb-3">Post Content</h4>
                <div className="text-secondary" style={{ fontSize: "1.05rem", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                  {selftext}
                </div>
              </section>
            )}

            {/* External Link */}
            {url && url !== redditUrl && !url.includes("reddit.com") && (
              <section className="mb-5">
                <h4 className="fw-bold mb-3">Linked Content</h4>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex align-items-center gap-2 text-primary"
                >
                  <FaGlobe /> {url.length > 80 ? url.substring(0, 80) + "..." : url}
                </a>
              </section>
            )}

            {/* Share Buttons */}
            <div className="mb-4">
              <ShareButtons url={redditUrl} title={title} />
            </div>

            {/* Visit Reddit CTA */}
            <div
              className="p-4 rounded-3 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(255,69,0,0.08) 0%, rgba(255,140,0,0.08) 100%)",
                border: "1px solid rgba(255,69,0,0.15)",
              }}
            >
              <FaReddit size={30} className="text-warning mb-3" />
              <h5 className="fw-bold mb-2">Join the Discussion</h5>
              <p className="text-secondary mb-3">
                Read the full post and all comments on Reddit
              </p>
              <a
                href={redditUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-warning px-5 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
              >
                Open on Reddit <FaExternalLinkAlt size={12} />
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
              {/* Subreddit */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Subreddit</h6>
                <div className="d-flex align-items-center gap-2 fs-5">
                  <FaReddit className="text-warning" />
                  <span className="fw-bold">{subreddit || "r/programming"}</span>
                </div>
              </div>

              {/* Author */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Author</h6>
                <a href={`https://reddit.com/u/${author}`} target="_blank" rel="noreferrer" className="fw-semibold text-decoration-none">
                  u/{author}
                </a>
              </div>

              {/* Posted */}
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
                  item={{ title, url: redditUrl, author, subreddit }}
                  type="reddit"
                />
              </div>

              <a
                href={redditUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-warning w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
              >
                Open on Reddit <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
