"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaPodcast,
  FaStar,
  FaListOl,
  FaUser,
  FaMusic,
} from "react-icons/fa";
import ShareButtons from "@/components/ShareButtons";
import BookmarkButton from "@/components/BookmarkButton";

export default function PodcastDetailContent() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const artist = searchParams.get("artist") || "";
  const artwork = searchParams.get("artwork") || "";
  const url = searchParams.get("url") || "";
  const genres = searchParams.get("genres") || "";
  const trackCount = searchParams.get("episodes") || "";
  const rating = searchParams.get("rating") || "";
  const feedUrl = searchParams.get("feed") || "";
  const releaseDate = searchParams.get("date") || "";

  if (!name) {
    return (
      <div className="container py-5 text-center">
        <FaPodcast size={60} className="mb-3 opacity-25" />
        <h3>Podcast not found</h3>
        <p className="text-secondary">The podcast you&apos;re looking for is unavailable.</p>
        <Link href="/podcasts" className="btn btn-primary mt-3">
          Back to Podcasts
        </Link>
      </div>
    );
  }

  const genreArray = genres ? genres.split(",").map(g => g.trim()).filter(Boolean) : [];
  const publishDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString("en-US", {
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
            href="/podcasts"
            className="btn btn-outline-primary btn-sm mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft size={12} /> Back to Podcasts
          </Link>
          <div className="d-flex align-items-center gap-4 mb-3">
            {artwork ? (
              <img
                src={artwork}
                alt={name}
                className="rounded-3"
                style={{ width: 120, height: 120, objectFit: "cover" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            ) : (
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: 120, height: 120, background: "rgba(255,255,255,0.1)" }}
              >
                <FaPodcast size={40} />
              </div>
            )}
            <div>
              <h1 className="mb-1">{name}</h1>
              <p className="mb-2 text-secondary d-flex align-items-center gap-2">
                <FaUser size={12} /> {artist}
              </p>
              <div className="d-flex flex-wrap gap-2">
                {genreArray.map((genre, i) => (
                  <span key={i} className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Stats */}
            <div className="row g-3 mb-5">
              {trackCount && (
                <div className="col-4">
                  <div className="stat-card">
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                      <FaListOl className="text-primary" />
                    </div>
                    <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                      {trackCount}
                    </div>
                    <div className="stat-label">Episodes</div>
                  </div>
                </div>
              )}
              {rating && (
                <div className="col-4">
                  <div className="stat-card">
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                      <FaStar className="text-warning" />
                    </div>
                    <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                      {Number(rating).toFixed(1)}
                    </div>
                    <div className="stat-label">Rating</div>
                  </div>
                </div>
              )}
              <div className="col-4">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaMusic className="text-info" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.2rem" }}>
                    {genreArray[0] || "Tech"}
                  </div>
                  <div className="stat-label">Genre</div>
                </div>
              </div>
            </div>

            {/* Podcast Info */}
            <section className="mb-5">
              <h4 className="fw-bold mb-3">About this Podcast</h4>
              <p className="text-secondary" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                <strong>{name}</strong> by {artist} is a podcast focused on{" "}
                {genreArray.length > 0 ? genreArray.join(", ") : "technology"}.
                {trackCount ? ` With ${trackCount} episodes available, ` : " "}
                {rating ? `rated ${Number(rating).toFixed(1)}/5 by listeners.` : ""}
                {" "}Tune in for insights on the latest in tech.
              </p>
            </section>

            {/* RSS Feed Link */}
            {feedUrl && (
              <section className="mb-5">
                <h4 className="fw-bold mb-3">RSS Feed</h4>
                <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <code className="text-muted small" style={{ wordBreak: "break-all" }}>{feedUrl}</code>
                </div>
              </section>
            )}

            {/* Share Buttons */}
            <div className="mb-4">
              <ShareButtons url={url} title={`${name} - Podcast`} description={`By ${artist}`} />
            </div>

            {/* Listen CTA */}
            <div
              className="p-4 rounded-3 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(168,85,247,0.08) 100%)",
                border: "1px solid rgba(139,92,246,0.15)",
              }}
            >
              <FaPodcast size={30} className="text-primary mb-3" />
              <h5 className="fw-bold mb-2">Start Listening</h5>
              <p className="text-secondary mb-3">
                Listen to {name} on Apple Podcasts or your favorite podcast app
              </p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary px-5 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
              >
                Listen Now <FaExternalLinkAlt size={12} />
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
              {/* Artist */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Host / Producer</h6>
                <div className="fw-bold fs-5">{artist}</div>
              </div>

              {/* Genres */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Categories</h6>
                <div className="d-flex flex-wrap gap-2">
                  {genreArray.map((genre, i) => (
                    <span key={i} className="badge bg-info bg-opacity-10 text-info px-3 py-2">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Last Updated */}
              {publishDate && (
                <div className="mb-4">
                  <h6 className="text-muted text-uppercase small mb-2">Last Released</h6>
                  <span>{publishDate}</span>
                </div>
              )}

              <hr style={{ borderColor: "rgba(255,255,255,0.06)" }} />

              {/* Bookmark */}
              <div className="mb-3 d-flex justify-content-center">
                <BookmarkButton
                  item={{ title: name, artist, url, artwork }}
                  type="podcast"
                />
              </div>

              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
              >
                Listen on Apple Podcasts <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
