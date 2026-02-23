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
            <div className="col-12 text-center text-muted py-5">
              <FaNewspaper size={50} className="mb-3 opacity-25" />
              <h5>No news available</h5>
              <p>Add your GNews API key in .env.local to see live tech news.</p>
              <code className="d-block mt-2">GNEWS_API_KEY=your_api_key_here</code>
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

