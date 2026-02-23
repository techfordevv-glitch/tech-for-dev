"use client";

import Link from "next/link";
import { FaHeart, FaComment, FaExternalLinkAlt, FaClock } from "react-icons/fa";
import { timeAgo } from "@/lib/api";
import BookmarkButton from "./BookmarkButton";

export default function ArticleCard({ article }) {
  const {
    title,
    description,
    url,
    cover_image,
    social_image,
    user,
    published_at,
    positive_reactions_count,
    comments_count,
    tag_list,
    reading_time_minutes,
  } = article;

  const image = cover_image || social_image;

  return (
    <div className="card h-100 shadow-sm border-0 article-card">
      {image && (
        <img
          src={image}
          alt={title}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center gap-2 mb-2">
          {user?.profile_image && (
            <img
              src={user.profile_image}
              alt={user.name}
              className="rounded-circle"
              style={{ width: 28, height: 28, objectFit: "cover" }}
            />
          )}
          <div>
            <small className="fw-semibold d-block" style={{ lineHeight: 1.2 }}>
              {user?.name}
            </small>
            <small className="text-muted" style={{ fontSize: "0.7rem" }}>
              <FaClock size={8} className="me-1" />
              {timeAgo(published_at)} &bull; {reading_time_minutes} min read
            </small>
          </div>
        </div>

        <h6 className="card-title fw-bold">{title}</h6>

        <p className="card-text text-muted small flex-grow-1">
          {description?.substring(0, 100)}
          {description?.length > 100 ? "..." : ""}
        </p>

        <div className="d-flex flex-wrap gap-1 mb-3">
          {tag_list?.slice(0, 4).map((tag, i) => (
            <span key={i} className="badge bg-light text-dark border small">
              #{tag}
            </span>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 text-muted small">
            <span className="d-flex align-items-center gap-1">
              <FaHeart className="text-danger" size={12} /> {positive_reactions_count}
            </span>
            <span className="d-flex align-items-center gap-1">
              <FaComment size={12} /> {comments_count}
            </span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <BookmarkButton
              item={{
                id: article.id,
                type: "article",
                title,
                description,
                image,
                url: `/articles/${article.id}`,
              }}
              size={14}
            />
            <Link
              href={`/articles/${article.id}`}
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
            >
              Read More <FaExternalLinkAlt size={9} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
