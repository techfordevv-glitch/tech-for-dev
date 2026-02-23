"use client";

import Link from "next/link";
import { FaExternalLinkAlt, FaClock, FaBookOpen } from "react-icons/fa";
import { timeAgo } from "@/lib/api";
import BookmarkButton from "./BookmarkButton";

function readMins(text) {
  return Math.max(1, Math.round((text?.trim().split(/\s+/).length || 0) / 200));
}

export default function NewsCard({ article }) {
  const { title, description, content, url, image, publishedAt, source } = article;
  const mins = readMins((description || "") + " " + (content || ""));

  const detailUrl = `/news/article?title=${encodeURIComponent(title || "")}&desc=${encodeURIComponent(description || "")}&content=${encodeURIComponent(content || "")}&url=${encodeURIComponent(url || "")}&image=${encodeURIComponent(image || "")}&source=${encodeURIComponent(source?.name || "")}&date=${encodeURIComponent(publishedAt || "")}`;

  return (
    <div className="card h-100 shadow-sm border-0 news-card">
      {image && (
        <div className="card-img-top-wrapper">
          <img
            src={image}
            alt={title}
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-primary">{source?.name || "Tech"}</span>
          <div className="d-flex align-items-center gap-2">
            <small className="text-muted d-flex align-items-center gap-1">
              <FaClock size={10} /> {timeAgo(publishedAt)}
            </small>
            <small className="text-muted d-flex align-items-center gap-1">
              <FaBookOpen size={10} /> {mins} min
            </small>
            <BookmarkButton
              item={{
                id: title,
                type: "news",
                title,
                description,
                image,
                url: detailUrl,
              }}
              size={14}
            />
          </div>
        </div>
        <h6 className="card-title fw-bold">{title}</h6>
        <p className="card-text text-muted small flex-grow-1">
          {description?.substring(0, 120)}
          {description?.length > 120 ? "..." : ""}
        </p>
        <Link
          href={detailUrl}
          className="btn btn-outline-primary btn-sm mt-auto d-flex align-items-center justify-content-center gap-2"
        >
          Read More <FaExternalLinkAlt size={10} />
        </Link>
      </div>
    </div>
  );
}
