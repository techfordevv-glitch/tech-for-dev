"use client";

import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useBookmarks } from "./BookmarkProvider";

export default function BookmarkButton({ item, size = 16, className = "" }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(item.id, item.type);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(item);
      }}
      className={`bookmark-btn ${saved ? "bookmarked" : ""} ${className}`}
      title={saved ? "Remove Bookmark" : "Save Bookmark"}
      aria-label={saved ? "Remove bookmark" : "Add bookmark"}
    >
      {saved ? <FaBookmark size={size} /> : <FaRegBookmark size={size} />}
    </button>
  );
}
