import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaCheck,
  FaDollarSign,
  FaTag,
  FaBuilding,
  FaRobot,
} from "react-icons/fa";
import { aiTools } from "@/lib/aitools";
import AIToolCard from "@/components/AIToolCard";
import ShareButtons from "@/components/ShareButtons";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const tool = aiTools.find((t) => t.id === Number(id));
  if (!tool) return { title: "AI Tool Not Found" };
  const desc = tool.description?.slice(0, 155) || `${tool.name} by ${tool.company} — AI tool on TechForDev`;
  return {
    title: `${tool.name} by ${tool.company}`,
    description: desc,
    keywords: [tool.name, tool.company, tool.category, "AI tool", "artificial intelligence", ...( tool.tags || [])],
    openGraph: {
      title: `${tool.name} — ${tool.category} AI Tool`,
      description: desc,
      type: "website",
      url: `/ai-tools/${id}`,
      images: [{ url: `/api/og?title=${encodeURIComponent(tool.name)}&desc=${encodeURIComponent(desc)}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} by ${tool.company} — AI Tool`,
      description: desc,
    },
    alternates: { canonical: `/ai-tools/${id}` },
  };
}

export function generateStaticParams() {
  return aiTools.map((tool) => ({ id: String(tool.id) }));
}

export default async function AIToolDetailPage({ params }) {
  const { id } = await params;
  const tool = aiTools.find((t) => t.id === Number(id));
  if (!tool) notFound();

  const relatedTools = aiTools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <Link
            href="/ai-tools"
            className="btn btn-outline-primary btn-sm mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft size={12} /> Back to AI Tools
          </Link>
          <div className="d-flex align-items-center gap-3 mb-3">
            <div
              className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: 70, height: 70, overflow: "hidden" }}
            >
              <img
                src={tool.logo}
                alt={tool.name}
                style={{ width: 55, height: 55, objectFit: "contain" }}
              />
            </div>
            <div>
              <h1 className="mb-1">{tool.name}</h1>
              <p className="mb-0 d-flex align-items-center gap-2">
                <FaBuilding size={12} className="text-muted" />
                <span className="text-secondary">{tool.company}</span>
              </p>
            </div>
          </div>
          <span className="badge bg-info bg-opacity-10 text-info fs-6">
            {tool.category}
          </span>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Left Column - Main Content */}
          <div className="col-lg-8">
            {/* Description */}
            <section className="mb-5">
              <h4 className="fw-bold mb-3">About {tool.name}</h4>
              <p className="text-secondary" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                {tool.description}
              </p>
            </section>

            {/* Features */}
            <section className="mb-5">
              <h4 className="fw-bold mb-3">
                <FaCheck className="text-success me-2" size={18} />
                Key Features
              </h4>
              <div className="row g-3">
                {tool.features.map((feature, i) => (
                  <div key={i} className="col-md-6">
                    <div className="d-flex align-items-start gap-2 p-3 rounded-3"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <FaCheck className="text-success mt-1 flex-shrink-0" size={12} />
                      <span>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tags */}
            <section className="mb-5">
              <h4 className="fw-bold mb-3">
                <FaTag className="text-primary me-2" size={16} />
                Tags
              </h4>
              <div className="d-flex flex-wrap gap-2">
                {tool.tags.map((tag, i) => (
                  <span key={i} className="badge bg-secondary bg-opacity-10 text-secondary px-3 py-2 fs-6">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Share Buttons */}
            <div className="mb-4">
              <ShareButtons url={`https://techfordev.dev/ai-tools/${tool.id}`} title={`${tool.name} - AI Tool`} description={tool.description} />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-lg-4">
            <div className="p-4 rounded-3 mb-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              
              {/* Pricing */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Pricing</h6>
                <div className="d-flex align-items-center gap-2 fs-5">
                  <FaDollarSign className="text-success" />
                  <span className="fw-bold">{tool.pricing}</span>
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Category</h6>
                <span className="badge bg-info bg-opacity-10 text-info px-3 py-2">
                  {tool.category}
                </span>
              </div>

              {/* Company */}
              <div className="mb-4">
                <h6 className="text-muted text-uppercase small mb-2">Company</h6>
                <span className="fw-semibold">{tool.company}</span>
              </div>

              {/* Visit Button */}
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
              >
                Visit {tool.name} <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <>
            <hr className="section-divider" />
            <section>
              <h4 className="section-header">
                <span className="icon bg-info bg-opacity-10 text-info">
                  <FaRobot />
                </span>
                Related Tools in {tool.category}
              </h4>
              <div className="row g-4">
                {relatedTools.map((t) => (
                  <div key={t.id} className="col-md-6 col-lg-4">
                    <AIToolCard tool={t} />
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
