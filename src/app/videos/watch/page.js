import { Suspense } from "react";
import { fetchTechVideos } from "@/lib/newApis";
import VideoCard from "@/components/VideoCard";
import { FaYoutube } from "react-icons/fa";
import VideoDetailContent from "./VideoDetailContent";

export const metadata = {
  title: "Tech Video",
  description: "Watch tech tutorials, programming courses, and developer talks curated on TechForDev.",
  robots: { index: false, follow: true },
};

export const revalidate = 3600;

export default async function VideoDetailPage() {
  const relatedVideos = await fetchTechVideos("tech news", 1);

  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center">
          <div className="loading-skeleton mx-auto" style={{ maxWidth: 800, height: 400 }}></div>
        </div>
      }
    >
      <VideoDetailContent />

      <div className="container pb-5">
        <hr className="section-divider" />
        <section>
          <h4 className="section-header">
            <span className="icon bg-danger bg-opacity-10 text-danger">
              <FaYoutube />
            </span>
            More Tech Videos
          </h4>
          {relatedVideos.length > 0 ? (
            <div className="row g-4">
              {relatedVideos.slice(0, 6).map((video, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">Explore more tech videos</p>
          )}
        </section>
      </div>
    </Suspense>
  );
}
