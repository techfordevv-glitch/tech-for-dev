import { FaNewspaper, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fetchTechNews, searchNews } from "@/lib/api";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";

export const revalidate = 1800;

export const metadata = {
  title: "Tech News",
  description: "Stay ahead with real-time technology news from 50+ sources worldwide. Breaking news in AI, software, cybersecurity, and more — auto-updated every 30 minutes.",
  keywords: ["tech news", "technology news", "AI news", "programming news", "software news", "developer news", "cybersecurity", "latest tech"],
  openGraph: {
    title: "Latest Tech News | TechForDev",
    description: "Real-time technology news from 50+ sources worldwide. AI, software, cybersecurity, and more.",
    type: "website",
    url: "/news",
    images: [{ url: "/api/og?title=Tech+News&desc=Real-time+technology+news+from+50%2B+sources", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Tech News | TechForDev",
    description: "Real-time technology news from 50+ sources. AI, software, cybersecurity updated every 30 min.",
  },
  alternates: { canonical: "/news" },
};

export default async function NewsPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";
  const page = Math.max(1, parseInt(params?.page || "1", 10));
  const news = query
    ? await searchNews(query, 20)
    : await fetchTechNews(page, 20);

  const prevHref = page > 1 ? `/news?page=${page - 1}` : null;
  const nextHref = news.length === 20 ? `/news?page=${page + 1}` : null;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="live-dot"></span>
            <small className="text-success fw-semibold">Auto-Updated Every 30 Min</small>
          </div>
          <h1>
            <FaNewspaper className="text-primary me-2" />
            Tech News
          </h1>
          <p className="mb-0">Latest technology headlines from around the globe</p>
        </div>
      </div>

      <div className="container py-4">
        {/* Search */}
        <form className="mb-4" action="/news" method="GET">
          <div className="input-group" style={{ maxWidth: 500 }}>
            <input
              type="text"
              name="q"
              className="form-control search-input"
              placeholder="Search news... (e.g., AI, Apple, Blockchain)"
              defaultValue={query}
            />
            <button className="btn btn-primary" type="submit">
              <FaSearch />
            </button>
          </div>
        </form>

        {query && (
          <p className="text-muted mb-4">
            Showing results for: <strong className="text-primary">&quot;{query}&quot;</strong>
          </p>
        )}

        <div className="row g-4">
          {news.length > 0 ? (
            news.map((article, i) => (
              <div key={article.url || i} className="col-md-6 col-lg-4">
                <NewsCard article={article} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center py-5" style={{
                background: "var(--bg-card)",
                borderRadius: 16,
                border: "1px solid var(--border-color)",
                padding: "3rem 2rem"
              }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>📰</div>
                <h4 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  {query ? `No results for "${query}"` : "News Temporarily Unavailable"}
                </h4>
                <p className="text-muted mb-4" style={{ maxWidth: 420, margin: "0 auto 1.5rem" }}>
                  {query
                    ? "Try a different keyword — e.g. AI, JavaScript, or Cybersecurity."
                    : "Our news feed is taking a short break. We automatically refresh every 30 minutes. Please check back soon!"
                  }
                </p>
                {!query && (
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {["AI", "JavaScript", "Python", "Cybersecurity", "Open Source"].map((topic) => (
                      <a
                        key={topic}
                        href={`/news?q=${topic}`}
                        className="badge rounded-pill px-3 py-2 text-decoration-none"
                        style={{ background: "var(--accent-blue)", color: "#fff", fontSize: 13 }}
                      >
                        🔍 {topic}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!query && (prevHref || nextHref) && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
            {prevHref ? (
              <Link href={prevHref} className="btn btn-outline-primary d-inline-flex align-items-center gap-2">
                <FaChevronLeft size={12} /> Previous
              </Link>
            ) : <span />}
            <span className="text-muted small">Page {page}</span>
            {nextHref ? (
              <Link href={nextHref} className="btn btn-outline-primary d-inline-flex align-items-center gap-2">
                Next <FaChevronRight size={12} />
              </Link>
            ) : <span />}
          </div>
        )}
      </div>
    </>
  );
}

