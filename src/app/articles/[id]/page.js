import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaHeart,
  FaComment,
  FaClock,
  FaBookOpen,
  FaUser,
  FaCalendar,
} from "react-icons/fa";
import { fetchArticleById, fetchDevToArticles } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";
import ShareButtons from "@/components/ShareButtons";
import ReadingProgress from "@/components/ReadingProgress";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = await fetchArticleById(id);
  if (!article) return { title: "Article Not Found" };
  const desc = article.description?.slice(0, 155) || `${article.title} — read on TechForDev`;
  return {
    title: article.title,
    description: desc,
    keywords: article.tags?.map((t) => t.name || t) || ["developer article", "tech tutorial"],
    authors: [{ name: article.user?.name || "Dev.to Author" }],
    openGraph: {
      title: article.title,
      description: desc,
      type: "article",
      url: `/articles/${id}`,
      images: article.cover_image || article.social_image
        ? [{ url: article.cover_image || article.social_image, width: 1200, height: 630, alt: article.title }]
        : [{ url: `/api/og?title=${encodeURIComponent(article.title)}&desc=${encodeURIComponent(desc)}`, width: 1200, height: 630 }],
      publishedTime: article.published_at,
      authors: [article.user?.name],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: desc,
      images: [article.social_image || `/api/og?title=${encodeURIComponent(article.title)}`],
    },
    alternates: { canonical: `/articles/${id}` },
  };
}

export default async function ArticleDetailPage({ params }) {
  const { id } = await params;
  const article = await fetchArticleById(id);
  if (!article) notFound();

  const {
    title,
    description,
    cover_image,
    social_image,
    body_html,
    url,
    user,
    published_at,
    edited_at,
    positive_reactions_count,
    comments_count,
    reading_time_minutes,
    tag_list,
    tags,
  } = article;

  const image = cover_image || social_image;
  const rawTags = tag_list || tags || [];
  const tagArray = typeof rawTags === "string" ? rawTags.split(",").map(t => t.trim()).filter(Boolean) : Array.isArray(rawTags) ? rawTags : [];

  // Fetch related articles based on first tag
  const relatedTag = tagArray.length > 0 ? tagArray[0] : "technology";
  const relatedArticles = await fetchDevToArticles(relatedTag, 1, 9);
  const suggestedArticles = relatedArticles
    .filter((a) => a.id !== Number(id))
    .slice(0, 6);

  const publishDate = new Date(published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleUrl = `https://techfordev.dev/articles/${id}`;

  return (
    <>
      <ReadingProgress />
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <Link
            href="/articles"
            className="btn btn-outline-primary btn-sm mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft size={12} /> Back to Articles
          </Link>
          <h1 style={{ maxWidth: 800 }}>{title}</h1>
          {description && (
            <p className="mb-0" style={{ maxWidth: 700, fontSize: "1.1rem" }}>
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Cover Image */}
            {image && (
              <div className="mb-4 rounded-3 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-100"
                  style={{ maxHeight: 400, objectFit: "cover" }}
                />
              </div>
            )}

            {/* Article Body */}
            <article
              className="article-content"
              dangerouslySetInnerHTML={{ __html: body_html }}
            />

            {/* Tags */}
            {tagArray.length > 0 && (
              <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <h6 className="text-muted mb-3">Tags</h6>
                <div className="d-flex flex-wrap gap-2">
                  {tagArray.map((tag, i) => (
                    <Link
                      key={i}
                      href={`/articles?tag=${tag}`}
                      className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 text-decoration-none"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-4 mb-4">
              <ShareButtons url={articleUrl} title={title} description={description || ""} />
            </div>

            {/* Read on Dev.to CTA */}
            <div className="mt-4 p-4 rounded-3 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="mb-3 text-secondary">Read the original article and join the discussion on Dev.to</p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary px-4 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
              >
                Read on Dev.to <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="p-4 rounded-3 mb-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "sticky",
                top: 80,
              }}>
              
              {/* Author */}
              {user && (
                <div className="mb-4">
                  <h6 className="text-muted text-uppercase small mb-3">Author</h6>
                  <div className="d-flex align-items-center gap-3">
                    {user.profile_image && (
                      <img
                        src={user.profile_image}
                        alt={user.name}
                        className="rounded-circle"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    )}
                    <div>
                      <div className="fw-bold">{user.name}</div>
                      {user.username && (
                        <small className="text-muted">@{user.username}</small>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <hr style={{ borderColor: "rgba(255,255,255,0.06)" }} />

              {/* Stats */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-3">Stats</h6>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between">
                    <span className="d-flex align-items-center gap-2 text-secondary">
                      <FaHeart className="text-danger" /> Reactions
                    </span>
                    <span className="fw-bold">{positive_reactions_count}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="d-flex align-items-center gap-2 text-secondary">
                      <FaComment className="text-primary" /> Comments
                    </span>
                    <span className="fw-bold">{comments_count}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="d-flex align-items-center gap-2 text-secondary">
                      <FaClock className="text-warning" /> Read Time
                    </span>
                    <span className="fw-bold">{reading_time_minutes} min</span>
                  </div>
                </div>
              </div>

              <hr style={{ borderColor: "rgba(255,255,255,0.06)" }} />

              {/* Published Date */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Published</h6>
                <div className="d-flex align-items-center gap-2">
                  <FaCalendar className="text-muted" size={12} />
                  <span>{publishDate}</span>
                </div>
              </div>

              {/* Visit Button */}
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
              >
                Read on Dev.to <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Suggested Articles */}
        {suggestedArticles.length > 0 && (
          <>
            <hr className="section-divider" />
            <section>
              <h4 className="section-header">
                <span className="icon bg-success bg-opacity-10 text-success">
                  <FaBookOpen />
                </span>
                You Might Also Like
              </h4>
              <div className="row g-4">
                {suggestedArticles.map((a) => (
                  <div key={a.id} className="col-md-6 col-lg-4">
                    <ArticleCard article={a} />
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
