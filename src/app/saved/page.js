"use client";

import { useState } from "react";
import { FaBookmark, FaTrash, FaExternalLinkAlt, FaClock, FaListOl } from "react-icons/fa";
import { useBookmarks } from "@/components/BookmarkProvider";
import { useUserData } from "@/components/UserDataProvider";
import Link from "next/link";
import { timeAgo } from "@/lib/api";

const TYPES = [
  { key: "all", label: "All" },
  { key: "news", label: "News" },
  { key: "article", label: "Articles" },
  { key: "ai-tool", label: "AI Tools" },
  { key: "project", label: "Projects" },
  { key: "hn", label: "Hacker News" },
  { key: "reddit", label: "Reddit" },
  { key: "video", label: "Videos" },
  { key: "job", label: "Jobs" },
  { key: "podcast", label: "Podcasts" },
  { key: "stackoverflow", label: "Stack Overflow" },
];

export default function SavedPage() {
  const { bookmarks, getBookmarksByType, toggleBookmark, clearBookmarks, bookmarkCount } = useBookmarks();
  const { addToQueue } = useUserData();
  const [activeType, setActiveType] = useState("all");
  const filtered = getBookmarksByType(activeType);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-white">
                <FaBookmark className="me-2 text-warning" /> Saved Items
              </h1>
              <p>{bookmarkCount} items saved</p>
            </div>
            {bookmarkCount > 0 && (
              <button
                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                onClick={() => {
                  if (confirm("Clear all saved items?")) clearBookmarks();
                }}
              >
                <FaTrash size={12} /> Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Type Filters */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {TYPES.map((t) => (
            <button
              key={t.key}
              className={`filter-btn ${activeType === t.key ? "active" : ""}`}
              onClick={() => setActiveType(t.key)}
            >
              {t.label}
              {t.key !== "all" && (
                <span className="ms-1 opacity-75">
                  ({getBookmarksByType(t.key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bookmarked Items */}
        {filtered.length > 0 ? (
          <div className="row g-4">
            {filtered.map((item) => (
              <div key={`${item.type}-${item.id}`} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-img-top"
                      style={{ height: 160, objectFit: "cover" }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-primary bg-opacity-10 text-primary small">
                        {item.type}
                      </span>
                      <small className="text-muted d-flex align-items-center gap-1">
                        <FaClock size={10} /> {timeAgo(item.savedAt)}
                      </small>
                    </div>
                    <h6 className="card-title fw-bold flex-grow-1">{item.title}</h6>
                    {item.description && (
                      <p className="card-text text-muted small">
                        {item.description.substring(0, 100)}...
                      </p>
                    )}
                    <div className="d-flex gap-2 mt-auto">
                      {item.url && (
                        <Link
                          href={item.url}
                          className="btn btn-outline-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                        >
                          View <FaExternalLinkAlt size={9} />
                        </Link>
                      )}
                      <button
                        className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                        onClick={() => addToQueue(item)}
                        title="Add to read queue"
                      >
                        <FaListOl size={10} />
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                        onClick={() => toggleBookmark(item)}
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <FaBookmark size={48} className="text-muted opacity-25 mb-3" />
            <h5 className="text-muted">No saved items</h5>
            <p className="text-muted">
              Click the bookmark icon on any card to save it here for later.
            </p>
            <Link href="/" className="btn btn-primary mt-2">
              Browse Content
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
