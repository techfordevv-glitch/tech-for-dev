import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaArrowUp,
  FaClock,
  FaComment,
  FaUser,
  FaGlobe,
  FaRocket,
  FaHackerNews,
} from "react-icons/fa";
import { fetchHackerNewsTop } from "@/lib/api";
import HNCard from "@/components/HNCard";
import ShareButtons from "@/components/ShareButtons";

async function fetchHNStory(id) {
  try {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function fetchHNComments(ids, limit = 5) {
  if (!ids || ids.length === 0) return [];
  try {
    const comments = await Promise.all(
      ids.slice(0, limit).map(async (id) => {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        if (!res.ok) return null;
        return await res.json();
      })
    );
    return comments.filter((c) => c && c.text && !c.deleted && !c.dead);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const story = await fetchHNStory(id);
  if (!story) return { title: "Story Not Found" };
  const desc = `${story.title} — ${story.score} points, ${story.descendants || 0} comments on Hacker News. Curated on TechForDev.`;
  return {
    title: story.title,
    description: desc.slice(0, 160),
    keywords: ["Hacker News", "Show HN", story.by, "tech discussion", "developer news"],
    openGraph: {
      title: story.title,
      description: desc.slice(0, 155),
      type: "article",
      url: `/hn/${id}`,
      images: [{ url: `/api/og?title=${encodeURIComponent(story.title.slice(0,60))}&desc=Hacker+News+%E2%80%94+${story.score}+points`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: story.title, description: desc.slice(0, 155) },
    alternates: { canonical: `/hn/${id}` },
  };
}

export default async function HNDetailPage({ params }) {
  const { id } = await params;
  const [story, relatedStories] = await Promise.all([
    fetchHNStory(id),
    fetchHackerNewsTop(9),
  ]);

  if (!story) notFound();

  const { title, url, score, by, time, descendants, kids } = story;
  const domain = url
    ? new URL(url).hostname.replace("www.", "")
    : "news.ycombinator.com";
  const publishDate = time
    ? new Date(time * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const hnUrl = `https://news.ycombinator.com/item?id=${id}`;

  const comments = await fetchHNComments(kids, 8);
  const suggested = relatedStories
    .filter((s) => s.id !== Number(id))
    .slice(0, 6);

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <Link
            href="/projects"
            className="btn btn-outline-warning btn-sm mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft size={12} /> Back to Projects
          </Link>
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2">
              {domain}
            </span>
            {publishDate && (
              <small className="text-muted d-flex align-items-center gap-1">
                <FaClock size={10} /> {publishDate}
              </small>
            )}
          </div>
          <h1 style={{ maxWidth: 800 }}>{title}</h1>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Stats */}
            <div className="row g-3 mb-5">
              <div className="col-4">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaArrowUp className="text-warning" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                    {score}
                  </div>
                  <div className="stat-label">Points</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaComment className="text-info" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                    {descendants || 0}
                  </div>
                  <div className="stat-label">Comments</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaUser className="text-success" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.3rem" }}>
                    {by}
                  </div>
                  <div className="stat-label">Author</div>
                </div>
              </div>
            </div>

            {/* Top Comments */}
            {comments.length > 0 && (
              <section className="mb-5">
                <h4 className="fw-bold mb-3">
                  <FaComment className="text-info me-2" size={18} />
                  Top Comments
                </h4>
                <div className="d-flex flex-column gap-3">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-3 rounded-3"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <FaUser size={10} className="text-muted" />
                        <small className="fw-semibold">{comment.by}</small>
                        <small className="text-muted">
                          {new Date(comment.time * 1000).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </small>
                      </div>
                      <div
                        className="text-secondary small"
                        style={{ lineHeight: 1.7 }}
                        dangerouslySetInnerHTML={{ __html: comment.text }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Share Buttons */}
            <div className="mb-4">
              <ShareButtons url={hnUrl} title={title} />
            </div>

            {/* Visit Link CTA */}
            <div
              className="p-4 rounded-3 text-center mb-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(245,158,11,0.08) 100%)",
                border: "1px solid rgba(251,191,36,0.15)",
              }}
            >
              <FaGlobe size={30} className="text-warning mb-3" />
              <h5 className="fw-bold mb-2">Visit the Original Link</h5>
              <p className="text-secondary mb-3">Read the full content on {domain}</p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-warning px-4 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
                  >
                    Visit {domain} <FaExternalLinkAlt size={12} />
                  </a>
                )}
                <a
                  href={hnUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-warning px-4 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
                >
                  View on Hacker News <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div
              className="p-4 rounded-3 mb-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "sticky",
                top: 80,
              }}
            >
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Source</h6>
                <div className="d-flex align-items-center gap-2 fs-5">
                  <FaGlobe className="text-warning" />
                  <span className="fw-bold">{domain}</span>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Author</h6>
                <span className="fw-semibold">{by}</span>
              </div>

              {publishDate && (
                <div className="mb-4">
                  <h6 className="text-muted text-uppercase small mb-2">Posted</h6>
                  <div className="d-flex align-items-center gap-2">
                    <FaClock className="text-muted" size={12} />
                    <span>{publishDate}</span>
                  </div>
                </div>
              )}

              <hr style={{ borderColor: "rgba(255,255,255,0.06)" }} />

              <div className="d-grid gap-2">
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-warning py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                  >
                    Visit Original <FaExternalLinkAlt size={12} />
                  </a>
                )}
                <a
                  href={hnUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-warning py-2 d-flex align-items-center justify-content-center gap-2"
                >
                  Hacker News Thread <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Stories */}
        {suggested.length > 0 && (
          <>
            <hr className="section-divider" />
            <section>
              <h4 className="section-header">
                <span className="icon bg-warning bg-opacity-10 text-warning">
                  <FaRocket />
                </span>
                More Top Stories
              </h4>
              <div className="row g-4">
                {suggested.map((s) => (
                  <div key={s.id} className="col-md-6 col-lg-4">
                    <HNCard story={s} />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
