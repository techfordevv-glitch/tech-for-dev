import { Suspense } from "react";
import { fetchTechPodcasts } from "@/lib/newApis";
import PodcastCard from "@/components/PodcastCard";
import { FaPodcast } from "react-icons/fa";
import PodcastDetailContent from "./PodcastDetailContent";

export const metadata = {
  title: "Tech Podcast Episode",
  description: "Listen to tech and programming podcast episodes on TechForDev — software engineering, AI, startups, and developer careers.",
  robots: { index: false, follow: true },
};

export const revalidate = 86400;

export default async function PodcastDetailPage() {
  const relatedPodcasts = await fetchTechPodcasts("technology programming", 9);

  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center">
          <div className="loading-skeleton mx-auto" style={{ maxWidth: 800, height: 400 }}></div>
        </div>
      }
    >
      <PodcastDetailContent />

      <div className="container pb-5">
        <hr className="section-divider" />
        <section>
          <h4 className="section-header">
            <span className="icon bg-primary bg-opacity-10 text-primary">
              <FaPodcast />
            </span>
            More Tech Podcasts
          </h4>
          {relatedPodcasts.length > 0 ? (
            <div className="row g-4">
              {relatedPodcasts.slice(0, 6).map((podcast, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <PodcastCard podcast={podcast} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">Discover more tech podcasts</p>
          )}
        </section>
      </div>
    </Suspense>
  );
}
