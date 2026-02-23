import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaStar,
  FaCodeBranch,
  FaEye,
  FaExclamationCircle,
  FaCircle,
  FaCalendar,
  FaGithub,
  FaLink,
  FaBalanceScale,
  FaCode,
} from "react-icons/fa";
import { fetchRepoDetails, fetchRepoReadme, fetchGitHubTrending } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard";
import ShareButtons from "@/components/ShareButtons";

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug || slug.length < 2) return { title: "Project Not Found" };
  const [owner, repo] = slug;
  const data = await fetchRepoDetails(owner, repo);
  if (!data) return { title: "Project Not Found" };
  const desc = (data.description || `${data.full_name} open-source GitHub repository`).slice(0, 155);
  return {
    title: `${data.full_name}`,
    description: desc,
    keywords: [data.full_name, owner, repo, data.language || "open source", "GitHub", "open source project"],
    openGraph: {
      title: `${data.full_name} — GitHub Project`,
      description: desc,
      type: "website",
      url: `/projects/${owner}/${repo}`,
      images: [{ url: `/api/og?title=${encodeURIComponent(data.full_name)}&desc=${encodeURIComponent(desc.slice(0,60))}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: data.full_name, description: desc },
    alternates: { canonical: `/projects/${owner}/${repo}` },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  if (!slug || slug.length < 2) notFound();
  const [owner, repo] = slug;

  const [repoData, readme] = await Promise.all([
    fetchRepoDetails(owner, repo),
    fetchRepoReadme(owner, repo),
  ]);

  if (!repoData) notFound();

  const trendingProjects = await fetchGitHubTrending(repoData.language || "", "weekly");
  const suggestedProjects = trendingProjects
    .filter((p) => p.full_name !== `${owner}/${repo}`)
    .slice(0, 6);

  const {
    full_name,
    name,
    description,
    html_url,
    homepage,
    stargazers_count,
    forks_count,
    watchers_count,
    open_issues_count,
    language,
    license,
    topics,
    created_at,
    updated_at,
    default_branch,
    owner: repoOwner,
  } = repoData;

  const createdDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedDate = new Date(updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <Link
            href="/projects"
            className="btn btn-outline-primary btn-sm mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft size={12} /> Back to Projects
          </Link>
          <div className="d-flex align-items-center gap-3 mb-3">
            <img
              src={repoOwner?.avatar_url}
              alt={repoOwner?.login}
              className="rounded-circle"
              style={{ width: 60, height: 60 }}
            />
            <div>
              <h1 className="mb-1">{name}</h1>
              <p className="mb-0 text-secondary">{full_name}</p>
            </div>
          </div>
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
            {/* Stats Cards */}
            <div className="row g-3 mb-5">
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaStar className="text-warning" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                    {stargazers_count?.toLocaleString()}
                  </div>
                  <div className="stat-label">Stars</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaCodeBranch className="text-info" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                    {forks_count?.toLocaleString()}
                  </div>
                  <div className="stat-label">Forks</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaEye className="text-success" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                    {watchers_count?.toLocaleString()}
                  </div>
                  <div className="stat-label">Watchers</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <FaExclamationCircle className="text-danger" />
                  </div>
                  <div className="stat-number" style={{ fontSize: "1.5rem" }}>
                    {open_issues_count?.toLocaleString()}
                  </div>
                  <div className="stat-label">Issues</div>
                </div>
              </div>
            </div>

            {/* Topics */}
            {topics && topics.length > 0 && (
              <section className="mb-5">
                <h4 className="fw-bold mb-3">Topics</h4>
                <div className="d-flex flex-wrap gap-2">
                  {topics.map((topic, i) => (
                    <span key={i} className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                      {topic}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* README */}
            {readme && (
              <section className="mb-5">
                <h4 className="fw-bold mb-3">
                  <FaCode className="me-2" size={18} />
                  README
                </h4>
                <div
                  className="p-4 rounded-3 article-content"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    maxHeight: 600,
                    overflowY: "auto",
                  }}
                >
                  <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: "var(--text-secondary)", margin: 0 }}>
                    {readme}
                  </pre>
                </div>
              </section>
            )}

            {/* Share Buttons */}
            <div className="mb-4">
              <ShareButtons url={`https://techfordev.dev/projects/${owner}/${repo}`} title={`${full_name} - GitHub Project`} description={description || ""} />
            </div>

            {/* View on GitHub CTA */}
            <div className="p-4 rounded-3 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="mb-3 text-secondary">
                View the full source code, contribute, and explore on GitHub
              </p>
              <a
                href={html_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary px-4 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
              >
                <FaGithub /> View on GitHub <FaExternalLinkAlt size={12} />
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

              {/* Language */}
              {language && (
                <div className="mb-4">
                  <h6 className="text-muted text-uppercase small mb-2">Language</h6>
                  <div className="d-flex align-items-center gap-2 fs-5">
                    <FaCircle size={10} style={{ color: languageColors[language] || "#888" }} />
                    <span className="fw-bold">{language}</span>
                  </div>
                </div>
              )}

              {/* License */}
              {license && (
                <div className="mb-4">
                  <h6 className="text-muted text-uppercase small mb-2">License</h6>
                  <div className="d-flex align-items-center gap-2">
                    <FaBalanceScale className="text-muted" />
                    <span>{license.name || license.spdx_id}</span>
                  </div>
                </div>
              )}

              {/* Default Branch */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Default Branch</h6>
                <span className="badge bg-secondary bg-opacity-10 text-secondary px-3 py-2">
                  {default_branch}
                </span>
              </div>

              {/* Dates */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Created</h6>
                <div className="d-flex align-items-center gap-2">
                  <FaCalendar className="text-muted" size={12} />
                  <span>{createdDate}</span>
                </div>
              </div>
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Last Updated</h6>
                <div className="d-flex align-items-center gap-2">
                  <FaCalendar className="text-muted" size={12} />
                  <span>{updatedDate}</span>
                </div>
              </div>

              {/* Homepage */}
              {homepage && (
                <div className="mb-4">
                  <h6 className="text-muted text-uppercase small mb-2">Website</h6>
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="d-flex align-items-center gap-2 text-info text-decoration-none"
                  >
                    <FaLink size={12} /> {homepage}
                  </a>
                </div>
              )}

              <hr style={{ borderColor: "rgba(255,255,255,0.06)" }} />

              {/* CTA Buttons */}
              <div className="d-grid gap-2">
                <a
                  href={html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                >
                  <FaGithub /> View on GitHub
                </a>
                {homepage && (
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary py-2 d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaLink /> Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Projects */}
        {suggestedProjects.length > 0 && (
          <>
            <hr className="section-divider" />
            <section>
              <h4 className="section-header">
                <span className="icon bg-warning bg-opacity-10 text-warning">
                  <FaGithub />
                </span>
                Similar Trending Projects
              </h4>
              <div className="row g-4">
                {suggestedProjects.map((p) => (
                  <div key={p.id} className="col-md-6 col-lg-4">
                    <ProjectCard repo={p} />
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
