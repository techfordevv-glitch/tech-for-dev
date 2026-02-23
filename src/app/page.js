import Link from "next/link";
import {
  FaNewspaper,
  FaRobot,
  FaBookOpen,
  FaGithub,
  FaFire,
  FaArrowRight,
  FaBolt,
  FaRocket,
  FaReddit,
  FaBriefcase,
  FaYoutube,
  FaRoute,
  FaCode,
  FaTools,
  FaDollarSign,
  FaPoll,
  FaBalanceScale,
  FaFileAlt,
} from "react-icons/fa";
import { fetchTechNews, fetchDevToArticles, fetchGitHubTrending, fetchHackerNewsTop } from "@/lib/api";
import { fetchRedditPosts, fetchRemoteJobs, fetchTechVideos } from "@/lib/newApis";
import { aiTools } from "@/lib/aitools";
import NewsCard from "@/components/NewsCard";
import AIToolCard from "@/components/AIToolCard";
import ArticleCard from "@/components/ArticleCard";
import ProjectCard from "@/components/ProjectCard";
import HNCard from "@/components/HNCard";
import RedditCard from "@/components/RedditCard";
import JobCard from "@/components/JobCard";
import VideoCard from "@/components/VideoCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import HeroSection from "@/components/HeroSection";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

export const revalidate = 1800; // Auto-revalidate every 30 minutes

export default async function Home() {
  // Fetch all data in parallel
  const [news, articles, projects, hnStories, redditPosts, jobs, videos] = await Promise.all([
    fetchTechNews(1, 6),
    fetchDevToArticles("technology", 1, 6),
    fetchGitHubTrending("", "weekly"),
    fetchHackerNewsTop(6),
    fetchRedditPosts("programming", 3).catch(() => []),
    fetchRemoteJobs("software-dev", 3).catch(() => []),
    fetchTechVideos("tech news", 1).catch(() => []),
  ]);

  const featuredTools = aiTools.slice(0, 6);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <HeroSection />

      {/* ===== TRENDING BANNER ===== */}
      <div style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-color, #222)" }}>
        <div className="container py-3">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <span className="d-flex align-items-center gap-1 fw-bold small" style={{ color: "#f59e0b", whiteSpace: "nowrap" }}>
              <FaFire size={13} /> Trending
            </span>
            {[
              { href: "/roadmaps",   label: "📍 Roadmaps",     color: "#3b82f6" },
              { href: "/challenges", label: "🧩 Challenges",   color: "#8b5cf6" },
              { href: "/compare",    label: "⚖️ Compare Tech", color: "#22c55e" },
              { href: "/salary",     label: "💰 Salary Data",  color: "#f59e0b" },
              { href: "/devtools",   label: "🛠 Dev Tools",    color: "#ec4899" },
              { href: "/polls",      label: "📊 Polls",        color: "#06b6d4" },
              { href: "/ai-tools/code-explainer", label: "🤖 Code AI", color: "#a855f7" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="badge text-decoration-none"
                style={{ backgroundColor: item.color + "18", color: item.color, border: `1px solid ${item.color}33`, padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* ===== TECH NEWS ===== */}
        <ScrollAnimation animation="fade-up">
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-header mb-0">
              <span className="icon bg-primary bg-opacity-10 text-primary">
                <FaNewspaper />
              </span>
              Latest Tech News
            </h2>
            <Link href="/news" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
              View All <FaArrowRight size={10} />
            </Link>
          </div>
          <div className="row g-4">
            {news.length > 0 ? (
              news.map((article) => (
                <div key={article.url || article.title} className="col-md-6 col-lg-4">
                  <NewsCard article={article} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted py-5">
                <FaNewspaper size={40} className="mb-3 opacity-25" />
                <p>Add your GNews API key in .env.local to see live tech news</p>
              </div>
            )}
          </div>
        </section>
        </ScrollAnimation>

        <hr className="section-divider" />

        {/* ===== AI TOOLS ===== */}
        <ScrollAnimation animation="fade-up" delay={100}>
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-header mb-0">
              <span className="icon bg-info bg-opacity-10 text-info">
                <FaRobot />
              </span>
              Popular AI Tools
            </h2>
            <Link href="/ai-tools" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
              All {aiTools.length} Tools <FaArrowRight size={10} />
            </Link>
          </div>
          <div className="row g-4">
            {featuredTools.map((tool) => (
              <div key={tool.id} className="col-md-6 col-lg-4">
                <AIToolCard tool={tool} />
              </div>
            ))}
          </div>
        </section>
        </ScrollAnimation>

        <hr className="section-divider" />

        {/* ===== ARTICLES ===== */}
        <ScrollAnimation animation="fade-up" delay={100}>
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-header mb-0">
              <span className="icon bg-success bg-opacity-10 text-success">
                <FaBookOpen />
              </span>
              Developer Articles
            </h2>
            <Link href="/articles" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
              View All <FaArrowRight size={10} />
            </Link>
          </div>
          <div className="row g-4">
            {articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.id} className="col-md-6 col-lg-4">
                  <ArticleCard article={article} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted py-5">
                <p>Loading articles...</p>
              </div>
            )}
          </div>
        </section>
        </ScrollAnimation>

        <hr className="section-divider" />

        {/* ===== TRENDING PROJECTS ===== */}
        <ScrollAnimation animation="fade-up" delay={100}>
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-header mb-0">
              <span className="icon bg-warning bg-opacity-10 text-warning">
                <FaFire />
              </span>
              Trending Projects
            </h2>
            <Link href="/projects" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
              View All <FaArrowRight size={10} />
            </Link>
          </div>
          <div className="row g-4">
            {projects.slice(0, 6).map((repo) => (
              <div key={repo.id} className="col-md-6 col-lg-4">
                <ProjectCard repo={repo} />
              </div>
            ))}
          </div>
        </section>
        </ScrollAnimation>

        <hr className="section-divider" />

        {/* ===== HACKER NEWS ===== */}
        <ScrollAnimation animation="fade-up" delay={100}>
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-header mb-0">
              <span className="icon bg-warning bg-opacity-10 text-warning">
                <FaRocket />
              </span>
              Hacker News Top Stories
            </h2>
            <a
              href="https://news.ycombinator.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
            >
              Visit HN <FaArrowRight size={10} />
            </a>
          </div>
          <div className="row g-4">
            {hnStories.map((story) => (
              <div key={story.id} className="col-md-6 col-lg-4">
                <HNCard story={story} />
              </div>
            ))}
          </div>
        </section>
        </ScrollAnimation>

        <hr className="section-divider" />

        {/* ===== REDDIT POSTS ===== */}
        {redditPosts.length > 0 && (
          <ScrollAnimation animation="fade-up" delay={100}>
          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="section-header mb-0">
                <span className="icon bg-danger bg-opacity-10 text-danger">
                  <FaReddit />
                </span>
                Reddit Tech Discussions
              </h2>
              <Link href="/reddit" className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1">
                View All <FaArrowRight size={10} />
              </Link>
            </div>
            <div className="row g-4">
              {redditPosts.map((post) => (
                <div key={post.id || post.permalink} className="col-md-6 col-lg-4">
                  <RedditCard post={post} />
                </div>
              ))}
            </div>
          </section>
          </ScrollAnimation>
        )}

        <hr className="section-divider" />

        {/* ===== REMOTE JOBS ===== */}
        {jobs.length > 0 && (
          <ScrollAnimation animation="fade-up" delay={100}>
          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="section-header mb-0">
                <span className="icon bg-success bg-opacity-10 text-success">
                  <FaBriefcase />
                </span>
                Remote Dev Jobs
              </h2>
              <Link href="/jobs" className="btn btn-outline-success btn-sm d-flex align-items-center gap-1">
                View All <FaArrowRight size={10} />
              </Link>
            </div>
            <div className="row g-4">
              {jobs.map((job) => (
                <div key={job.id || job.url} className="col-md-6 col-lg-4">
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          </section>
          </ScrollAnimation>
        )}

        <hr className="section-divider" />

        {/* ===== TECH VIDEOS ===== */}
        {videos.length > 0 && (
          <ScrollAnimation animation="fade-up" delay={100}>
          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="section-header mb-0">
                <span className="icon bg-danger bg-opacity-10 text-danger">
                  <FaYoutube />
                </span>
                Tech Videos
              </h2>
              <Link href="/videos" className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1">
                View All <FaArrowRight size={10} />
              </Link>
            </div>
            <div className="row g-4">
              {videos.slice(0, 3).map((video) => (
                <div key={video.videoId} className="col-md-6 col-lg-4">
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          </section>
          </ScrollAnimation>
        )}
      </div>

      {/* ===== NEWSLETTER ===== */}
      <div className="container">
        <NewsletterSubscribe />
      </div>
    </>
  );
}
