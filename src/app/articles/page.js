import { FaBookOpen } from "react-icons/fa";
import { fetchDevToArticles, fetchLatestArticles } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";
import LoadMoreArticles from "@/components/LoadMoreArticles";

export const revalidate = 3600;

export const metadata = {
  title: "Developer Articles",
  description: "Explore thousands of developer articles, tutorials, and technical guides from Dev.to — covering JavaScript, Python, React, AI/ML, DevOps, and web development.",
  keywords: ["developer articles", "programming tutorials", "web development", "javascript", "python", "react", "nextjs", "devops", "AI ML", "technical guides"],
  openGraph: {
    title: "Developer Articles & Tutorials | TechForDev",
    description: "Thousands of articles and tutorials on JavaScript, Python, React, AI/ML, DevOps from the dev community.",
    type: "website",
    url: "/articles",
    images: [{ url: "/api/og?title=Dev+Articles&desc=JavaScript%2C+Python%2C+React%2C+AI%2FML+tutorials", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Articles & Tutorials | TechForDev",
    description: "Thousands of developer articles on JS, Python, React, AI/ML, DevOps.",
  },
  alternates: { canonical: "/articles" },
};

const TAGS = [
  { label: "Latest", tag: null },
  { label: "AI / ML", tag: "ai" },
  { label: "JavaScript", tag: "javascript" },
  { label: "Python", tag: "python" },
  { label: "React", tag: "react" },
  { label: "Next.js", tag: "nextjs" },
  { label: "Web Dev", tag: "webdev" },
  { label: "DevOps", tag: "devops" },
  { label: "Cloud", tag: "cloud" },
];

export default async function ArticlesPage({ searchParams }) {
  const activeTag = (await searchParams)?.tag || null;
  
  const articles = activeTag
    ? await fetchDevToArticles(activeTag, 1, 24)
    : await fetchLatestArticles(1, 24);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="live-dot"></span>
            <small className="text-success fw-semibold">From Dev.to Community</small>
          </div>
          <h1>
            <FaBookOpen className="text-success me-2" />
            Tech Articles
          </h1>
          <p className="mb-0">
            Curated developer articles, tutorials, and guides — auto-updated hourly
          </p>
        </div>
      </div>

      <div className="container py-4">
        {/* Tag Filters */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {TAGS.map((t) => (
            <a
              key={t.label}
              href={t.tag ? `/articles?tag=${t.tag}` : "/articles"}
              className={`filter-btn ${
                (activeTag === t.tag) || (!activeTag && !t.tag) ? "active" : ""
              }`}
            >
              {t.label}
            </a>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="row g-4">
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id} className="col-md-6 col-lg-4">
                <ArticleCard article={article} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted py-5">
              <FaBookOpen size={50} className="mb-3 opacity-25" />
              <h5>No articles found</h5>
              <p>Try selecting a different tag</p>
            </div>
          )}
        </div>

        {/* Load More */}
        {articles.length >= 24 && (
          <LoadMoreArticles tag={activeTag} initialPage={1} perPage={24} />
        )}
      </div>
    </>
  );
}
