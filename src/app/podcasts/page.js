import { FaPodcast } from "react-icons/fa";
import { fetchTechPodcasts } from "@/lib/newApis";
import PodcastCard from "@/components/PodcastCard";

export const metadata = {
  title: "Tech Podcasts",
  description: "Discover the best technology and programming podcasts. From software engineering to AI, machine learning, startup culture, and developer career advice — all in one place.",
  keywords: ["tech podcasts", "programming podcasts", "software engineering podcast", "AI podcast", "developer podcast", "coding podcast", "machine learning podcast"],
  openGraph: {
    title: "Best Tech & Programming Podcasts | TechForDev",
    description: "Top podcasts on software engineering, AI, machine learning, startups and developer careers.",
    type: "website",
    url: "/podcasts",
    images: [{ url: "/api/og?title=Tech+Podcasts&desc=Software+engineering%2C+AI+%26+dev+career+podcasts", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Tech & Programming Podcasts | TechForDev",
    description: "Top podcasts on software engineering, AI, ML and developer careers.",
  },
  alternates: { canonical: "/podcasts" },
};

export const revalidate = 86400;

export default async function PodcastsPage() {
  const [techPods, devPods, aiPods] = await Promise.all([
    fetchTechPodcasts("technology news", 12),
    fetchTechPodcasts("software development programming", 12),
    fetchTechPodcasts("artificial intelligence machine learning", 12),
  ]);

  const sections = [
    { title: "Technology & News", podcasts: techPods, color: "primary" },
    { title: "Software Development", podcasts: devPods, color: "success" },
    { title: "AI & Machine Learning", podcasts: aiPods, color: "info" },
  ];

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="text-white">
            <FaPodcast className="me-2 text-purple" style={{ color: "#8b5cf6" }} /> Tech Podcasts
          </h1>
          <p>Discover the best technology podcasts to stay informed</p>
        </div>
      </div>

      <div className="container py-5">
        {sections.map((section) => (
          <section key={section.title} className="mb-5">
            <h2 className="section-header mb-4">
              <span className={`icon bg-${section.color} bg-opacity-10 text-${section.color}`}>
                <FaPodcast />
              </span>
              {section.title}
            </h2>
            <div className="row g-4">
              {section.podcasts.length > 0 ? (
                section.podcasts.map((pod) => (
                  <div key={pod.trackId || pod.collectionId} className="col-md-6 col-lg-4">
                    <PodcastCard podcast={pod} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-muted py-4">
                  <p>Unable to load podcasts. Try again later.</p>
                </div>
              )}
            </div>
            <hr className="section-divider" />
          </section>
        ))}
      </div>
    </>
  );
}
