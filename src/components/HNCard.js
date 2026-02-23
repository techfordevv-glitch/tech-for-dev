"use client";

import Link from "next/link";
import { FaExternalLinkAlt, FaArrowUp, FaClock } from "react-icons/fa";
import BookmarkButton from "./BookmarkButton";

export default function HNCard({ story }) {
  if (!story) return null;

  const { title, url, score, by, time, descendants } = story;
  const domain = url
    ? (() => { try { return new URL(url).hostname.replace("www.", ""); } catch { return "news.ycombinator.com"; } })()
    : "news.ycombinator.com";
  const timeStr = time
    ? new Date(time * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="card h-100 shadow-sm border-0 hn-card">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge bg-warning bg-opacity-10 text-warning small">
            {domain}
          </span>
          <span className="d-flex align-items-center gap-1 text-muted small">
            <FaClock size={10} /> {timeStr}
          </span>
        </div>

        <h6 className="card-title fw-bold flex-grow-1">{title}</h6>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="d-flex gap-3 text-muted small">
            <span className="d-flex align-items-center gap-1">
              <FaArrowUp className="text-warning" size={12} /> {score}
            </span>
            <span>{descendants || 0} comments</span>
            <span>by {by}</span>
          </div>
          <Link
            href={`/hn/${story.id}`}
            className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
          >
            Details <FaExternalLinkAlt size={9} />
          </Link>
          <BookmarkButton
            item={{
              id: story.id,
              type: "hn",
              title,
              description: `${score} points by ${by}`,
              url: `/hn/${story.id}`,
            }}
            size={14}
          />
        </div>
      </div>
    </div>
  );
}
