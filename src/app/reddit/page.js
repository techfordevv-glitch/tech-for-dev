import { FaReddit, FaArrowRight } from "react-icons/fa";
import { fetchRedditPosts } from "@/lib/newApis";
import RedditCard from "@/components/RedditCard";

export const metadata = {
  title: "Reddit Tech Discussions",
  description: "browse trending developer discussions from the top tech subreddits — r/programming, r/webdev, r/MachineLearning, r/javascript, and more — curated for developers.",
  keywords: ["reddit programming", "reddit webdev", "reddit tech", "r/programming", "r/javascript", "developer discussions", "tech subreddit"],
  openGraph: {
    title: "Trending Reddit Tech Discussions | TechForDev",
    description: "Top developer discussions from r/programming, r/webdev, r/MachineLearning and more tech subreddits.",
    type: "website",
    url: "/reddit",
    images: [{ url: "/api/og?title=Reddit+Tech&desc=Top+discussions+from+programming+subreddits", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trending Reddit Tech Discussions | TechForDev",
    description: "Best developer discussions from r/programming, r/webdev, r/MachineLearning.",
  },
  alternates: { canonical: "/reddit" },
};

export const revalidate = 1800;

export default async function RedditPage() {
  const [programming, webdev, ml] = await Promise.all([
    fetchRedditPosts("programming", 8),
    fetchRedditPosts("webdev", 8),
    fetchRedditPosts("MachineLearning", 8),
  ]);

  const sections = [
    { title: "r/programming", posts: programming, color: "warning" },
    { title: "r/webdev", posts: webdev, color: "primary" },
    { title: "r/MachineLearning", posts: ml, color: "success" },
  ];

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="text-white">
            <FaReddit className="me-2 text-warning" /> Reddit Tech Posts
          </h1>
          <p>Hot posts from the best tech subreddits</p>
        </div>
      </div>

      <div className="container py-5">
        {sections.map((section) => (
          <section key={section.title} className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="section-header mb-0">
                <span className={`icon bg-${section.color} bg-opacity-10 text-${section.color}`}>
                  <FaReddit />
                </span>
                {section.title}
              </h2>
              <a
                href={`https://reddit.com/${section.title}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
              >
                Visit <FaArrowRight size={10} />
              </a>
            </div>
            <div className="row g-4">
              {section.posts.length > 0 ? (
                section.posts.map((post) => (
                  <div key={post.id} className="col-md-6 col-lg-4">
                    <RedditCard post={post} />
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="d-flex align-items-center gap-3 py-4 px-4 rounded-3" style={{
                    background: "var(--bg-card)",
                    border: "1px dashed var(--border-color)"
                  }}>
                    <span style={{ fontSize: 32 }}>🕐</span>
                    <div>
                      <div className="fw-semibold" style={{ color: "var(--text-primary)" }}>Posts temporarily unavailable</div>
                      <div className="text-muted small mt-1">Reddit limits API requests periodically. Content will reload automatically — or <a href="/reddit" className="text-warning text-decoration-none fw-semibold">refresh the page</a>.</div>
                    </div>
                  </div>
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
