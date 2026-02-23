"use client";

import Link from "next/link";
import { FaStackOverflow, FaArrowUp, FaEye, FaComment, FaExternalLinkAlt } from "react-icons/fa";
import BookmarkButton from "@/components/BookmarkButton";

export default function SOCard({ question }) {
  if (!question) return null;

  const {
    title,
    link,
    score,
    answer_count,
    view_count,
    tags,
    owner,
    is_answered,
    creation_date,
  } = question;

  const timeStr = creation_date
    ? new Date(creation_date * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";

  const formatViews = (v) => {
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
    if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
    return v?.toString() || "0";
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center gap-2">
            <FaStackOverflow className="text-warning" size={16} />
            {is_answered && (
              <span className="badge bg-success bg-opacity-10 text-success small">
                Answered
              </span>
            )}
          </div>
          <small className="text-muted">{timeStr}</small>
        </div>

        <h6
          className="card-title fw-bold flex-grow-1"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <div className="d-flex flex-wrap gap-1 mb-3">
          {tags?.slice(0, 4).map((tag, i) => (
            <span key={i} className="badge bg-primary bg-opacity-10 text-primary small">
              {tag}
            </span>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="d-flex gap-3 text-muted small">
            <span className="d-flex align-items-center gap-1">
              <FaArrowUp size={12} /> {score}
            </span>
            <span className="d-flex align-items-center gap-1">
              <FaComment size={11} /> {answer_count}
            </span>
            <span className="d-flex align-items-center gap-1">
              <FaEye size={12} /> {formatViews(view_count)}
            </span>
          </div>
          <BookmarkButton item={{ id: question.question_id, type: "stackoverflow", title: title.replace(/<[^>]*>/g, ""), url: link }} />
        </div>

        <Link
          href={`/stackoverflow/question?title=${encodeURIComponent(title)}&link=${encodeURIComponent(link || "")}&score=${score || 0}&answers=${answer_count || 0}&views=${view_count || 0}&tags=${encodeURIComponent((tags || []).join(","))}&answered=${is_answered || false}&body=${encodeURIComponent((question.body || "").substring(0, 2000))}&owner=${encodeURIComponent(owner?.display_name || "")}&rep=${owner?.reputation || ""}&avatar=${encodeURIComponent(owner?.profile_image || "")}&created=${creation_date || ""}`}
          className="btn btn-outline-warning btn-sm mt-3 w-100 d-flex align-items-center justify-content-center gap-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
