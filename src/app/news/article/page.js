import { Suspense } from "react";
import { fetchTechNews } from "@/lib/api";
import NewsDetailContent from "./NewsDetailContent";
import NewsCard from "@/components/NewsCard";
import { FaNewspaper } from "react-icons/fa";

export const metadata = {
  title: "Tech News Article",
  description: "Read the latest tech news article on TechForDev — curated from top technology sources worldwide.",
  robots: { index: false, follow: true },
};

export default async function NewsArticlePage() {
  // Fetch related news server-side
  const relatedNews = await fetchTechNews(1, 9);

  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center">
          <div className="loading-skeleton mx-auto" style={{ maxWidth: 800, height: 400 }}></div>
        </div>
      }
    >
      <NewsDetailContent />

      {/* Suggested News - Server rendered */}
      <div className="container pb-5">
        <hr className="section-divider" />
        <section>
          <h4 className="section-header">
            <span className="icon bg-primary bg-opacity-10 text-primary">
              <FaNewspaper />
            </span>
            More Tech News
          </h4>
          {relatedNews.length > 0 ? (
            <div className="row g-4">
              {relatedNews.slice(0, 6).map((article, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">
              Explore more latest headlines from the tech world
            </p>
          )}
        </section>
      </div>
    </Suspense>
  );
}
