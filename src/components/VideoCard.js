"use client";

import Link from "next/link";
import { FaPlay, FaEye, FaClock, FaExternalLinkAlt } from "react-icons/fa";
import BookmarkButton from "@/components/BookmarkButton";

export default function VideoCard({ video }) {
  if (!video) return null;

  const { videoId, title, author, viewCount, lengthSeconds, publishedText, thumbnail } = video;

  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const formatViews = (views) => {
    if (!views) return "0";
    if (typeof views === "string") return views;
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="position-relative">
        <img
          src={thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
        {lengthSeconds > 0 && (
          <span
            className="position-absolute badge bg-dark"
            style={{ bottom: 8, right: 8, fontSize: "0.75rem" }}
          >
            {formatDuration(lengthSeconds)}
          </span>
        )}
        <div className="video-play-overlay">
          <FaPlay size={24} />
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-bold flex-grow-1" style={{ fontSize: "0.9rem" }}>
          {title}
        </h6>

        <div className="text-muted small mt-auto">
          <div className="d-flex justify-content-between mb-1">
            <span className="fw-semibold">{author}</span>
            <BookmarkButton item={{ id: videoId, type: "video", title, description: author, url: `https://www.youtube.com/watch?v=${videoId}` }} />
          </div>
          <div className="d-flex gap-3">
            <span className="d-flex align-items-center gap-1">
              <FaEye size={11} /> {formatViews(viewCount)}
            </span>
            {publishedText && (
              <span className="d-flex align-items-center gap-1">
                <FaClock size={10} /> {publishedText}
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/videos/watch?v=${videoId}&title=${encodeURIComponent(title)}&author=${encodeURIComponent(author || "")}&authorId=${encodeURIComponent(video.authorId || "")}&desc=${encodeURIComponent((video.description || "").substring(0, 1500))}&views=${viewCount || 0}&length=${lengthSeconds || 0}&published=${encodeURIComponent(publishedText || "")}`}
          className="btn btn-danger btn-sm mt-3 d-flex align-items-center justify-content-center gap-2 fw-semibold"
        >
          <FaPlay size={11} /> Watch Video
        </Link>
      </div>
    </div>
  );
}
