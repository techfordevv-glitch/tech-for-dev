import { Suspense } from "react";
import { fetchRedditPosts } from "@/lib/newApis";
import RedditCard from "@/components/RedditCard";
import { FaReddit } from "react-icons/fa";
import RedditDetailContent from "./RedditDetailContent";

export const metadata = {
  title: "Reddit Tech Discussion",
  description: "Join the developer discussion on TechForDev — trending posts from top programming and tech subreddits.",
  robots: { index: false, follow: true },
};

export const revalidate = 1800;

export default async function RedditPostPage() {
  const relatedPosts = await fetchRedditPosts("programming", 9);

  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center">
          <div className="loading-skeleton mx-auto" style={{ maxWidth: 800, height: 400 }}></div>
        </div>
      }
    >
      <RedditDetailContent />

      {/* Suggested Posts - Server rendered */}
      <div className="container pb-5">
        <hr className="section-divider" />
        <section>
          <h4 className="section-header">
            <span className="icon bg-warning bg-opacity-10 text-warning">
              <FaReddit />
            </span>
            More Reddit Discussions
          </h4>
          {relatedPosts.length > 0 ? (
            <div className="row g-4">
              {relatedPosts.slice(0, 6).map((post, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <RedditCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">Explore more trending discussions from Reddit</p>
          )}
        </section>
      </div>
    </Suspense>
  );
}
