import Link from "next/link";
import { fetchAIModels } from "@/lib/newApis";

export const revalidate = 3600;

export const metadata = {
  title: "AI Models Explorer",
  description: "Explore 100,000+ AI models from Hugging Face — text generation, image synthesis, translation, summarization, speech recognition and more. Search, filter, and try models directly.",
  keywords: ["AI models", "Hugging Face models", "text generation AI", "image generation AI", "machine learning models", "NLP models", "open source AI", "transformer models"],
  openGraph: {
    title: "AI Models Explorer — 100k+ Models | TechForDev",
    description: "Search 100,000+ open-source AI models — text generation, image AI, NLP, speech and more.",
    type: "website",
    url: "/ai-models",
    images: [{ url: "/api/og?title=AI+Models+Explorer&desc=100k%2B+open+source+AI+models", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Models Explorer — 100k+ Models | TechForDev",
    description: "100,000+ open-source AI models from Hugging Face.",
  },
  alternates: { canonical: "/ai-models" },
};

const PIPELINES = [
  { tag: "text-generation", label: "Text Generation", emoji: "✍️", color: "#6f42c1" },
  { tag: "text-to-image", label: "Text to Image", emoji: "🎨", color: "#d63384" },
  { tag: "image-classification", label: "Image Classification", emoji: "🖼️", color: "#0dcaf0" },
  { tag: "text-classification", label: "Text Classification", emoji: "🏷️", color: "#fd7e14" },
  { tag: "translation", label: "Translation", emoji: "🌐", color: "#20c997" },
  { tag: "summarization", label: "Summarization", emoji: "📝", color: "#0d6efd" },
  { tag: "automatic-speech-recognition", label: "Speech Recognition", emoji: "🎙️", color: "#ffc107" },
  { tag: "object-detection", label: "Object Detection", emoji: "🔍", color: "#dc3545" },
];

function formatNum(n) {
  if (!n && n !== 0) return "—";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

function ModelCard({ model, pipelineColor }) {
  const modelSlug = encodeURIComponent(model.modelId || model.id || "");
  const displayId = (model.modelId || model.id || "").split("/").pop();

  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{ backgroundColor: "var(--bg-card)", borderRadius: 12, overflow: "hidden" }}
    >
      {/* color bar */}
      <div style={{ height: 4, backgroundColor: pipelineColor }} />
      <div className="card-body d-flex flex-column p-3">
        <h6
          className="fw-bold mb-1 text-truncate"
          title={model.modelId || model.id}
          style={{ color: "var(--text-primary)" }}
        >
          {displayId}
        </h6>
        <p className="small mb-2 text-truncate opacity-75" style={{ color: "var(--text-secondary)" }}>
          {model.modelId || model.id}
        </p>

        {/* Stats */}
        <div className="d-flex gap-3 mb-3 small" style={{ color: "var(--text-secondary)" }}>
          <span title="Downloads">⬇ {formatNum(model.downloads)}</span>
          <span title="Likes">❤️ {formatNum(model.likes)}</span>
        </div>

        {/* Tags */}
        <div className="d-flex flex-wrap gap-1 mb-3 flex-grow-1" style={{ maxHeight: 48, overflow: "hidden" }}>
          {(model.tags || []).slice(0, 4).map((tag) => (
            <span key={tag} className="badge small" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)", fontSize: 10 }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="d-flex gap-2">
          <Link
            href={`/ai-models/${modelSlug}`}
            className="btn btn-sm fw-semibold flex-grow-1"
            style={{ backgroundColor: pipelineColor, color: "#fff", border: "none" }}
          >
            Get AI Model →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function AIModelsPage({ searchParams }) {
  const params = await searchParams;
  const selectedTag = params?.pipeline || "";

  // Fetch selected pipeline or all at once
  let sections = [];

  if (selectedTag) {
    const pipe = PIPELINES.find((p) => p.tag === selectedTag) || { tag: selectedTag, label: selectedTag, emoji: "🤖", color: "#6c757d" };
    const models = await fetchAIModels(selectedTag, 24);
    sections = [{ ...pipe, models }];
  } else {
    // Top 4 pipelines on homepage view (parallel fetch)
    const featured = PIPELINES.slice(0, 4);
    const results = await Promise.all(featured.map((p) => fetchAIModels(p.tag, 8)));
    sections = featured.map((p, i) => ({ ...p, models: results[i] }));
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-bold display-6 mb-1">
          🤖 AI Models
        </h1>
        <p className="text-secondary">
          Trending AI models from Hugging Face — sorted by most downloads.
        </p>
      </div>

      {/* Pipeline Filter */}
      <div className="mb-4 d-flex flex-wrap gap-2">
        <Link
          href="/ai-models"
          className={`btn btn-sm ${!selectedTag ? "btn-warning text-dark fw-semibold" : "btn-outline-secondary"}`}
        >
          All Categories
        </Link>
        {PIPELINES.map((p) => (
          <Link
            key={p.tag}
            href={`/ai-models?pipeline=${p.tag}`}
            className="btn btn-sm"
            style={
              selectedTag === p.tag
                ? { backgroundColor: p.color, color: "#fff", border: "none", fontWeight: 600 }
                : { backgroundColor: p.color + "22", color: p.color, border: `1px solid ${p.color}55` }
            }
          >
            {p.emoji} {p.label}
          </Link>
        ))}
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.tag} className="mb-5">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold mb-0" style={{ color: "var(--text-primary)" }}>
              <span>{section.emoji}</span>{" "}
              <span style={{ color: section.color }}>{section.label}</span>
            </h5>
            {!selectedTag && (
              <Link
                href={`/ai-models?pipeline=${section.tag}`}
                className="btn btn-sm"
                style={{ color: section.color, border: `1px solid ${section.color}55` }}
              >
                See all →
              </Link>
            )}
          </div>

          {section.models.length === 0 ? (
            <p className="text-secondary small">No models loaded right now.</p>
          ) : (
            <div className="row g-3">
              {section.models.map((model) => (
                <div key={model.modelId || model.id} className="col-sm-6 col-lg-3">
                  <ModelCard model={model} pipelineColor={section.color} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
