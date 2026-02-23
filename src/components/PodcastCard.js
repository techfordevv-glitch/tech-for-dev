"use client";

import Link from "next/link";
import { FaPodcast, FaExternalLinkAlt } from "react-icons/fa";
import BookmarkButton from "@/components/BookmarkButton";

export default function PodcastCard({ podcast }) {
  if (!podcast) return null;

  const {
    trackName,
    artistName,
    artworkUrl100,
    artworkUrl600,
    collectionViewUrl,
    genres,
    trackCount,
    averageUserRating,
  } = podcast;

  const image = artworkUrl600 || artworkUrl100;

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center gap-3 mb-3">
          {image ? (
            <img
              src={image}
              alt={trackName}
              className="rounded"
              style={{ width: 60, height: 60, objectFit: "cover" }}
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <div
              className="rounded d-flex align-items-center justify-content-center"
              style={{ width: 60, height: 60, background: "var(--filter-bg)", color: "var(--accent-purple)" }}
            >
              <FaPodcast size={24} />
            </div>
          )}
          <div style={{ overflow: "hidden", flex: 1 }}>
            <h6 className="card-title fw-bold mb-1 text-truncate">{trackName}</h6>
            <small className="text-muted d-block text-truncate">{artistName}</small>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-1 mb-3">
          {genres?.slice(0, 3).map((genre, i) => (
            <span key={i} className="badge bg-primary bg-opacity-10 text-primary small">
              {genre}
            </span>
          ))}
        </div>

        <div className="d-flex gap-3 text-muted small mb-3">
          {trackCount && (
            <span>{trackCount} episodes</span>
          )}
          <BookmarkButton item={{ id: podcast.trackId || trackName, type: "podcast", title: trackName, description: artistName, url: collectionViewUrl, image }} />
        </div>

        <Link
          href={`/podcasts/show?name=${encodeURIComponent(trackName)}&artist=${encodeURIComponent(artistName || "")}&artwork=${encodeURIComponent(image || "")}&url=${encodeURIComponent(collectionViewUrl || "")}&genres=${encodeURIComponent((genres || []).join(","))}&episodes=${trackCount || ""}&rating=${averageUserRating || ""}&feed=${encodeURIComponent(podcast.feedUrl || "")}&date=${encodeURIComponent(podcast.releaseDate || "")}`}
          className="btn btn-outline-primary btn-sm mt-auto d-flex align-items-center justify-content-center gap-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
