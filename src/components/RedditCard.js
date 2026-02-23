"use client";

import Link from "next/link";
import { FaReddit, FaArrowUp, FaComment, FaExternalLinkAlt } from "react-icons/fa";
import BookmarkButton from "@/components/BookmarkButton";

export default function RedditCard({ post }) {
  if (!post) return null;

  const {
    title,
    subreddit_name_prefixed,
    score,
    num_comments,
    permalink,
    url,
    thumbnail,
    author,
    created_utc,
    selftext,
    link_flair_text,
  } = post;

  const timeStr = created_utc
    ? new Date(created_utc * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";

  const showThumb =
    thumbnail && thumbnail.startsWith("http") && !thumbnail.includes("self") && !thumbnail.includes("default");

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center gap-2">
            <FaReddit className="text-warning" size={18} />
            <span className="badge bg-warning bg-opacity-10 text-warning small">
              {subreddit_name_prefixed}
            </span>
          </div>
          {link_flair_text && (
            <span className="badge bg-primary bg-opacity-10 text-primary small">
              {link_flair_text}
            </span>
          )}
        </div>

        {showThumb && (
          <img
            src={thumbnail}
            alt=""
            className="rounded mb-2"
            style={{ height: 120, objectFit: "cover", width: "100%" }}
            onError={(e) => (e.target.style.display = "none")}
          />
        )}

        <h6 className="card-title fw-bold flex-grow-1">{title}</h6>

        {selftext && (
          <p className="card-text text-muted small">
            {selftext.substring(0, 100)}
            {selftext.length > 100 ? "..." : ""}
          </p>
        )}

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="d-flex gap-3 text-muted small">
            <span className="d-flex align-items-center gap-1">
              <FaArrowUp className="text-warning" size={12} /> {score?.toLocaleString()}
            </span>
            <span className="d-flex align-items-center gap-1">
              <FaComment size={12} /> {num_comments}
            </span>
            <span>u/{author}</span>
          </div>
          <BookmarkButton item={{ id: post.id || permalink, type: "reddit", title, url: `https://reddit.com${permalink}`, description: selftext, author }} />
        </div>

        <Link
          href={`/reddit/post?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author || "")}&subreddit=${encodeURIComponent(subreddit_name_prefixed || "")}&score=${score || 0}&comments=${num_comments || 0}&permalink=${encodeURIComponent(permalink || "")}&url=${encodeURIComponent(url || "")}&thumbnail=${encodeURIComponent(thumbnail || "")}&flair=${encodeURIComponent(link_flair_text || "")}&created=${created_utc || ""}&selftext=${encodeURIComponent((selftext || "").substring(0, 1500))}`}
          className="btn btn-outline-warning btn-sm mt-3 w-100 d-flex align-items-center justify-content-center gap-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
