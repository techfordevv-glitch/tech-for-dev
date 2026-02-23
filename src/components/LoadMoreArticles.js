"use client";

import { useState, useCallback } from "react";
import { FaSpinner, FaChevronDown } from "react-icons/fa";
import ArticleCard from "./ArticleCard";

export default function LoadMoreArticles({ tag, initialPage = 1, perPage = 12 }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(initialPage + 1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const endpoint = tag
        ? `https://dev.to/api/articles?tag=${tag}&page=${page}&per_page=${perPage}`
        : `https://dev.to/api/articles/latest?page=${page}&per_page=${perPage}`;
      
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      if (data.length < perPage) setHasMore(false);
      if (data.length === 0) { setHasMore(false); return; }
      
      setArticles((prev) => [...prev, ...data]);
      setPage((p) => p + 1);
    } catch (err) {
      console.error("Load more error:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, tag, perPage, loading]);

  return (
    <>
      {articles.length > 0 && (
        <div className="row g-4 mt-0">
          {articles.map((article) => (
            <div key={article.id} className="col-md-6 col-lg-4">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary px-5 py-2 d-inline-flex align-items-center gap-2"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner-rotate" /> Loading...
              </>
            ) : (
              <>
                <FaChevronDown /> Load More Articles
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
