import {
  FaChartBar,
  FaNewspaper,
  FaRobot,
  FaBookOpen,
  FaGithub,
  FaFire,
  FaReddit,
  FaStackOverflow,
  FaBriefcase,
  FaPodcast,
  FaYoutube,
  FaCalendarAlt,
  FaDatabase,
  FaClock,
  FaGlobe,
} from "react-icons/fa";
import { fetchTechNews, fetchDevToArticles, fetchGitHubTrending, fetchHackerNewsTop } from "@/lib/api";
import { aiTools } from "@/lib/aitools";
import { fetchRedditPosts, fetchStackOverflow, fetchRemoteJobs, getTechEvents } from "@/lib/newApis";
import Link from "next/link";

export const metadata = {
  title: "Platform Dashboard",
  description: "TechForDev platform analytics — view statistics across all 12+ content categories including news sources, API count, model count, job listings and more.",
  keywords: ["developer dashboard", "tech platform stats", "TechForDev analytics"],
  robots: { index: false, follow: false },
};

export const revalidate = 1800;

export default async function DashboardPage() {
  const [news, articles, projects, hn, reddit, soQuestions, jobs] = await Promise.all([
    fetchTechNews(1, 1),
    fetchDevToArticles("technology", 1, 1),
    fetchGitHubTrending("", "weekly"),
    fetchHackerNewsTop(1),
    fetchRedditPosts("programming", 1),
    fetchStackOverflow("", 1, 1),
    fetchRemoteJobs("software-dev", 1),
  ]);

  const events = getTechEvents();

  const dataSources = [
    { name: "Tech News", icon: <FaNewspaper />, status: news.length > 0, api: "GNews API", href: "/news", count: "~100+", color: "primary" },
    { name: "AI Tools", icon: <FaRobot />, status: true, api: "Static Data", href: "/ai-tools", count: aiTools.length, color: "info" },
    { name: "Articles", icon: <FaBookOpen />, status: articles.length > 0, api: "Dev.to API", href: "/articles", count: "~500+", color: "success" },
    { name: "Projects", icon: <FaGithub />, status: projects.length > 0, api: "GitHub API", href: "/projects", count: projects.length, color: "dark" },
    { name: "Hacker News", icon: <FaFire />, status: hn.length > 0, api: "HN Firebase API", href: "/", count: "~500", color: "warning" },
    { name: "Reddit Posts", icon: <FaReddit />, status: reddit.length > 0, api: "Reddit JSON API", href: "/reddit", count: "~100+", color: "warning" },
    { name: "Stack Overflow", icon: <FaStackOverflow />, status: soQuestions.length > 0, api: "Stack Exchange API", href: "/stackoverflow", count: "~50+", color: "warning" },
    { name: "Developer Jobs", icon: <FaBriefcase />, status: jobs.length > 0, api: "Remotive API", href: "/jobs", count: "~200+", color: "primary" },
    { name: "Podcasts", icon: <FaPodcast />, status: true, api: "iTunes API", href: "/podcasts", count: "~30+", color: "purple" },
    { name: "Tech Videos", icon: <FaYoutube />, status: true, api: "Invidious API", href: "/videos", count: "~36+", color: "danger" },
    { name: "Tech Events", icon: <FaCalendarAlt />, status: true, api: "Curated Data", href: "/events", count: events.length, color: "info" },
  ];

  const totalActive = dataSources.filter((s) => s.status).length;
  const now = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="text-white">
            <FaChartBar className="me-2 text-info" /> Analytics Dashboard
          </h1>
          <p>Platform overview and data source status</p>
        </div>
      </div>

      <div className="container py-5">
        {/* Stats Row */}
        <div className="row g-4 mb-5">
          <div className="col-md-3 col-6">
            <div className="stat-card">
              <div className="stat-number">{dataSources.length}</div>
              <div className="stat-label">
                <FaDatabase size={12} className="me-1" /> Data Sources
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="stat-card">
              <div className="stat-number">{totalActive}</div>
              <div className="stat-label">
                <FaGlobe size={12} className="me-1" /> Active APIs
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="stat-card">
              <div className="stat-number">{aiTools.length}</div>
              <div className="stat-label">
                <FaRobot size={12} className="me-1" /> AI Tools
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="stat-card">
              <div className="stat-number">30m</div>
              <div className="stat-label">
                <FaClock size={12} className="me-1" /> Refresh Interval
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <h2 className="section-header mb-4">
          <span className="icon bg-info bg-opacity-10 text-info">
            <FaDatabase />
          </span>
          Data Sources Status
        </h2>

        <div className="row g-4 mb-5">
          {dataSources.map((source) => (
            <div key={source.name} className="col-md-6 col-lg-4">
              <Link href={source.href} className="text-decoration-none">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <span className={`text-${source.color}`} style={{ fontSize: "1.3rem" }}>
                          {source.icon}
                        </span>
                        <h6 className="mb-0 fw-bold">{source.name}</h6>
                      </div>
                      <span
                        className={`badge ${source.status ? "bg-success" : "bg-danger"} bg-opacity-10 ${source.status ? "text-success" : "text-danger"}`}
                      >
                        {source.status ? "Online" : "Offline"}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between text-muted small">
                      <span>API: {source.api}</span>
                      <span>Items: {source.count}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Platform Info */}
        <h2 className="section-header mb-4">
          <span className="icon bg-primary bg-opacity-10 text-primary">
            <FaChartBar />
          </span>
          Platform Info
        </h2>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <small className="text-muted d-block">Framework</small>
                <span className="fw-semibold">Next.js 16.1.6 (App Router)</span>
              </div>
              <div className="col-md-4">
                <small className="text-muted d-block">React Version</small>
                <span className="fw-semibold">React 19.2.3</span>
              </div>
              <div className="col-md-4">
                <small className="text-muted d-block">UI Framework</small>
                <span className="fw-semibold">Bootstrap 5.3.8</span>
              </div>
              <div className="col-md-4">
                <small className="text-muted d-block">Last Data Refresh</small>
                <span className="fw-semibold">{now}</span>
              </div>
              <div className="col-md-4">
                <small className="text-muted d-block">Rendering Strategy</small>
                <span className="fw-semibold">ISR + SSR + Static</span>
              </div>
              <div className="col-md-4">
                <small className="text-muted d-block">Features</small>
                <span className="fw-semibold">Dark/Light Mode, i18n, PWA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
