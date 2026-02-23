"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const BookmarkContext = createContext({
  bookmarks: [],
  isBookmarked: () => false,
  toggleBookmark: () => {},
  getBookmarksByType: () => [],
  clearBookmarks: () => {},
  bookmarkCount: 0,
});

export function useBookmarks() {
  return useContext(BookmarkContext);
}

export default function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("techfordev-bookmarks");
      if (saved) setBookmarks(JSON.parse(saved));
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("techfordev-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks, mounted]);

  const isBookmarked = useCallback(
    (id, type) => bookmarks.some((b) => b.id === id && b.type === type),
    [bookmarks]
  );

  const toggleBookmark = useCallback((item) => {
    // item: { id, type, title, description, image, url, extra }
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id && b.type === item.type);
      if (exists) return prev.filter((b) => !(b.id === item.id && b.type === item.type));
      return [{ ...item, savedAt: new Date().toISOString() }, ...prev];
    });
  }, []);

  const getBookmarksByType = useCallback(
    (type) => (type === "all" ? bookmarks : bookmarks.filter((b) => b.type === type)),
    [bookmarks]
  );

  const clearBookmarks = useCallback(() => setBookmarks([]), []);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        toggleBookmark,
        getBookmarksByType,
        clearBookmarks,
        bookmarkCount: bookmarks.length,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
