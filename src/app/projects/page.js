import { FaFire, FaGithub } from "react-icons/fa";
import { fetchGitHubTrending, fetchHackerNewsShowHN } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard";
import HNCard from "@/components/HNCard";

export const revalidate = 3600;

export const metadata = {
  title: "Trending Open Source Projects",
  description: "Discover this week's trending open-source projects on GitHub. Explore repositories in JavaScript, Python, Rust, Go, and more — filtered by language and activity.",
  keywords: ["trending github", "open source projects", "github trending", "javascript projects", "python projects", "rust", "golang", "open source repositories", "developer tools"],
  openGraph: {
    title: "Trending Open Source Projects | TechForDev",
    description: "This week's hottest GitHub repositories across all languages. Discover new tools and libraries.",
    type: "website",
    url: "/projects",
    images: [{ url: "/api/og?title=Trending+Projects&desc=Hottest+GitHub+repositories+this+week", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trending Open Source Projects | TechForDev",
    description: "This week's hottest GitHub repos — JS, Python, Rust, Go and more.",
  },
  alternates: { canonical: "/projects" },
};

const LANGUAGES = [
  { label: "All", value: "" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "Python", value: "Python" },
  { label: "Rust", value: "Rust" },
  { label: "Go", value: "Go" },
  { label: "Java", value: "Java" },
  { label: "C++", value: "C++" },
  { label: "Swift", value: "Swift" },
];

export default async function ProjectsPage({ searchParams }) {
  const lang = (await searchParams)?.lang || "";

  const [projects, showHN] = await Promise.all([
    fetchGitHubTrending(lang, "weekly"),
    fetchHackerNewsShowHN(12),
  ]);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="live-dot"></span>
            <small className="text-success fw-semibold">Updated Hourly</small>
          </div>
          <h1>
            <FaFire className="text-warning me-2" />
            Trending Projects & Products
          </h1>
          <p className="mb-0">
            Hot open-source repos from GitHub + Show HN launches
          </p>
        </div>
      </div>

      <div className="container py-4">
        {/* ===== GITHUB TRENDING ===== */}
        <h3 className="section-header">
          <FaGithub className="me-2" />
          GitHub Trending
        </h3>

        {/* Language Filters */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {LANGUAGES.map((l) => (
            <a
              key={l.label}
              href={l.value ? `/projects?lang=${l.value}` : "/projects"}
              className={`filter-btn ${
                lang === l.value || (!lang && !l.value) ? "active" : ""
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="row g-4 mb-5">
          {projects.length > 0 ? (
            projects.map((repo) => (
              <div key={repo.id} className="col-md-6 col-lg-4">
                <ProjectCard repo={repo} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted py-5">
              <FaGithub size={50} className="mb-3 opacity-25" />
              <h5>No projects found</h5>
              <p>Try selecting a different language</p>
            </div>
          )}
        </div>

        <hr className="section-divider" />

        {/* ===== SHOW HN ===== */}
        <h3 className="section-header">
          <FaFire className="text-warning me-2" />
          Show HN — New Tech Products
        </h3>

        <div className="row g-4">
          {showHN.map((story) => (
            <div key={story.id} className="col-md-6 col-lg-4">
              <HNCard story={story} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
