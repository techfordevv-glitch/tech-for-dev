import { FaYoutube, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fetchTechVideos } from "@/lib/newApis";
import VideoCard from "@/components/VideoCard";
import Link from "next/link";

export const metadata = {
  title: "Tech Videos",
  description: "Watch the best tech videos, programming tutorials, conference talks, and developer content — curated from YouTube and top tech channels.",
  keywords: ["tech videos", "programming tutorials", "coding videos", "developer youtube", "tech talks", "software engineering videos", "AI tutorials"],
  openGraph: {
    title: "Tech Videos & Tutorials | TechForDev",
    description: "Best programming tutorials, conference talks, and developer content from top YouTube channels.",
    type: "website",
    url: "/videos",
    images: [{ url: "/api/og?title=Tech+Videos&desc=Programming+tutorials+%26+developer+content", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Videos & Tutorials | TechForDev",
    description: "Best programming tutorials and developer content from top YouTube channels.",
  },
  alternates: { canonical: "/videos" },
};

export const revalidate = 3600;

export default async function VideosPage({ searchParams }) {
  const page = Math.max(1, parseInt((await searchParams)?.page || "1", 10));

  const [techNews, tutorials, aiVideos] = await Promise.all([
    fetchTechVideos("tech news 2026", page),
    fetchTechVideos("programming tutorial", page),
    fetchTechVideos("artificial intelligence", page),
  ]);

  const sections = [
    { title: "Tech News", videos: techNews, color: "danger" },
    { title: "Programming Tutorials", videos: tutorials, color: "primary" },
    { title: "AI & Machine Learning", videos: aiVideos, color: "info" },
  ];

  const hasContent = sections.some((s) => s.videos.length > 0);
  const prevHref = page > 1 ? `/videos?page=${page - 1}` : null;
  const nextHref = hasContent ? `/videos?page=${page + 1}` : null;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="text-white">
            <FaYoutube className="me-2 text-danger" /> Tech Videos
          </h1>
          <p>Latest tech videos, tutorials, and conference talks</p>
        </div>
      </div>

      <div className="container py-5">
        {sections.map((section) => (
          <section key={section.title} className="mb-5">
            <h2 className="section-header mb-4">
              <span className={`icon bg-${section.color} bg-opacity-10 text-${section.color}`}>
                <FaYoutube />
              </span>
              {section.title}
            </h2>
            <div className="row g-4">
              {section.videos.length > 0 ? (
                section.videos.map((video) => (
                  <div key={video.videoId} className="col-md-6 col-lg-4">
                    <VideoCard video={video} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-muted py-4">
                  <p>Unable to load videos. Video API may be unavailable.</p>
                </div>
              )}
            </div>
            <hr className="section-divider" />
          </section>
        ))}

        {/* Pagination */}
        {(prevHref || nextHref) && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-2 mb-3">
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
