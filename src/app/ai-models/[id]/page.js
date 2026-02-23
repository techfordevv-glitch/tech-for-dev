import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function fetchModelDetail(modelId) {
  try {
    const res = await fetch(`https://huggingface.co/api/models/${modelId}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

async function fetchRelatedModels(pipeline, excludeId, limit = 3) {
  try {
    if (!pipeline) return [];
    const url = `https://huggingface.co/api/models?limit=6&sort=downloads&direction=-1&filter=${encodeURIComponent(pipeline)}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.filter((m) => (m.modelId || m.id) !== excludeId).slice(0, limit);
  } catch { return []; }
}

function formatNum(n) {
  if (!n && n !== 0) return "—";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

const PIPELINE_META = {
  "text-generation":               { color: "#6f42c1", emoji: "✍️",  label: "Text Generation" },
  "text-to-image":                 { color: "#d63384", emoji: "🎨",  label: "Text to Image" },
  "image-classification":          { color: "#0dcaf0", emoji: "🖼️", label: "Image Classification" },
  "text-classification":           { color: "#fd7e14", emoji: "🏷️", label: "Text Classification" },
  "translation":                   { color: "#20c997", emoji: "🌐",  label: "Translation" },
  "summarization":                 { color: "#0d6efd", emoji: "📝",  label: "Summarization" },
  "automatic-speech-recognition":  { color: "#ffc107", emoji: "🎙️", label: "Speech Recognition" },
  "object-detection":              { color: "#dc3545", emoji: "🔍",  label: "Object Detection" },
};

function SideCard({ title, children }) {
  return (
    <div className="card border-0 shadow-sm mb-3" style={{ backgroundColor: "var(--bg-card)", borderRadius: 12 }}>
      <div className="card-body p-3">
        <h6 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>{title}</h6>
        {children}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: "1px solid var(--border-color, #2a2a2a)" }}>
      <span className="small fw-semibold" style={{ color: "var(--text-secondary)" }}>{label}</span>
      <span className="small text-end" style={{ color: "var(--text-primary)", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const modelId = id.replace(/--/g, "/");
  const shortName = modelId.split("/").pop();
  const author = modelId.split("/")[0] || "Hugging Face";
  const desc = `Explore the ${shortName} AI model by ${author} on Hugging Face. View model details, pipeline type, downloads, and try it on TechForDev.`;
  return {
    title: shortName,
    description: desc.slice(0, 160),
    keywords: [shortName, author, "AI model", "Hugging Face", "machine learning", "open source AI"],
    openGraph: {
      title: `${shortName} — AI Model by ${author}`,
      description: desc.slice(0, 155),
      type: "website",
      url: `/ai-models/${id}`,
      images: [{ url: `/api/og?title=${encodeURIComponent(shortName)}&desc=AI+Model+by+${encodeURIComponent(author)}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: `${shortName} — Hugging Face AI Model`, description: desc.slice(0, 155) },
    alternates: { canonical: `/ai-models/${id}` },
  };
}

export default async function AIModelDetailPage({ params }) {
  const { id } = await params;
  const modelId = id.replace(/--/g, "/");
  const [model, related] = await Promise.all([
    fetchModelDetail(modelId),
    fetchRelatedModels("", modelId), // will be replaced after we know pipeline
  ]);

  if (!model) notFound();

  const hfUrl = `https://huggingface.co/${model.modelId || modelId}`;
  const displayName = (model.modelId || modelId).split("/").pop();
  const pipeline = model.pipeline_tag || "";
  const pipeMeta = PIPELINE_META[pipeline] || { color: "#6c757d", emoji: "🤖", label: pipeline || "AI Model" };

  // Fetch related based on actual pipeline
  const relatedModels = await fetchRelatedModels(pipeline, model.modelId || modelId);

  const tags = model.tags || [];
  const cardTags = model.cardData?.tags || [];
  const allTags = Array.from(new Set([...tags, ...cardTags]));

  const infoRows = [
    { label: "Full Model ID", value: model.modelId || modelId },
    { label: "Pipeline / Task", value: pipeline || "—" },
    { label: "Library", value: model.library_name || "—" },
    { label: "Downloads (all-time)", value: formatNum(model.downloads) },
    { label: "Likes", value: formatNum(model.likes) },
    { label: "Last Modified", value: model.lastModified ? new Date(model.lastModified).toLocaleDateString() : "—" },
    { label: "Author / Org", value: (model.modelId || modelId).includes("/") ? (model.modelId || modelId).split("/")[0] : "—" },
    { label: "Private", value: model.private ? "Yes" : "No — public" },
  ];

  const usageSnippet = `from transformers import pipeline

# Load the model
pipe = pipeline("${pipeline || "text-generation"}", model="${model.modelId || modelId}")

# Run inference
result = pipe("Your input here")
print(result)`;

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="breadcrumb small mb-0">
          <li className="breadcrumb-item">
            <Link href="/ai-models" className="text-decoration-none" style={{ color: pipeMeta.color }}>AI Models</Link>
          </li>
          {pipeline && (
            <li className="breadcrumb-item">
              <Link href={`/ai-models?pipeline=${pipeline}`} className="text-secondary text-decoration-none">{pipeMeta.label}</Link>
            </li>
          )}
          <li className="breadcrumb-item active text-secondary">{displayName}</li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* ── MAIN COLUMN ── */}
        <div className="col-lg-8">
          {/* Hero card */}
          <div className="card border-0 shadow mb-4" style={{ backgroundColor: "var(--bg-card)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ height: 5, background: `linear-gradient(90deg, ${pipeMeta.color}, ${pipeMeta.color}99)` }} />
            <div className="card-body p-4">
              <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap mb-3">
                <div>
                  {pipeline && (
                    <Link
                      href={`/ai-models?pipeline=${pipeline}`}
                      className="badge text-decoration-none mb-2 d-inline-block"
                      style={{ backgroundColor: pipeMeta.color + "22", color: pipeMeta.color, fontSize: 12 }}
                    >
                      {pipeMeta.emoji} {pipeMeta.label}
                    </Link>
                  )}
                  <h1 className="fw-bold mb-1" style={{ color: "var(--text-primary)", fontSize: "1.75rem" }}>{displayName}</h1>
                  <p className="small mb-0 opacity-75" style={{ color: "var(--text-secondary)", fontFamily: "monospace" }}>
                    {model.modelId || modelId}
                  </p>
                </div>
                <a href={hfUrl} target="_blank" rel="noopener noreferrer" className="btn fw-bold px-4 flex-shrink-0"
                  style={{ backgroundColor: pipeMeta.color, color: "#fff", border: "none" }}>
                  Get AI Model →
                </a>
              </div>

              {/* Stats row */}
              <div className="row g-3 mt-1">
                {[
                  { icon: "⬇", label: "Downloads", value: formatNum(model.downloads) },
                  { icon: "❤️", label: "Likes", value: formatNum(model.likes) },
                  { icon: "🏷️", label: "Tags", value: allTags.length || "—" },
                  { icon: "📦", label: "Library", value: model.library_name || "—" },
                ].map((stat) => (
                  <div key={stat.label} className="col-6 col-sm-3">
                    <div className="text-center p-2 rounded" style={{ backgroundColor: "var(--bg-primary)" }}>
                      <div className="fs-5">{stat.icon}</div>
                      <div className="fw-bold small" style={{ color: "var(--text-primary)" }}>{stat.value}</div>
                      <div className="text-secondary" style={{ fontSize: 11 }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Model card description */}
          {model.cardData?.description && (
            <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: "var(--bg-card)", borderRadius: 14 }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>📄 About This Model</h5>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 15 }}>
                  {String(model.cardData.description).slice(0, 800)}
                  {model.cardData.description.length > 800 && (
                    <a href={hfUrl} target="_blank" rel="noopener noreferrer" className="text-warning ms-1">Read more on HF ↗</a>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Details table */}
          <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: "var(--bg-card)", borderRadius: 14 }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>Model Details</h5>
              <div className="rounded overflow-hidden" style={{ border: "1px solid var(--border-color, #333)" }}>
                {infoRows.map((row) => <InfoRow key={row.label} label={row.label} value={row.value} />)}
              </div>
            </div>
          </div>

          {/* Usage snippet */}
          {pipeline && (
            <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: "var(--bg-card)", borderRadius: 14 }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>⚡ Quick Usage (Python)</h5>
                <p className="small mb-3" style={{ color: "var(--text-secondary)" }}>
                  Using the 🤗 Transformers library. Install with{" "}
                  <code style={{ color: pipeMeta.color, backgroundColor: "var(--bg-primary)", padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>
                    pip install transformers
                  </code>
                </p>
                <pre className="rounded p-3 mb-0"
                  style={{ backgroundColor: "#0d1117", color: "#58a6ff", fontSize: 13, overflowX: "auto", lineHeight: 1.8, border: "1px solid #30363d", borderRadius: 10 }}>
                  <code>{usageSnippet}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: "var(--bg-card)", borderRadius: 14 }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>🏷️ Tags</h5>
                <div className="d-flex flex-wrap gap-2">
                  {allTags.slice(0, 30).map((tag) => (
                    <span key={tag} className="badge"
                      style={{ backgroundColor: pipeMeta.color + "18", color: pipeMeta.color, border: `1px solid ${pipeMeta.color}33`, fontSize: 12, padding: "5px 10px" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Related models */}
          {relatedModels.length > 0 && (
            <div className="mb-2">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold mb-0" style={{ color: "var(--text-primary)" }}>
                  More {pipeMeta.label} Models
                </h5>
                <Link href={`/ai-models?pipeline=${pipeline}`} className="btn btn-sm" style={{ color: pipeMeta.color, border: `1px solid ${pipeMeta.color}55` }}>
                  See all →
                </Link>
              </div>
              <div className="row g-3">
                {relatedModels.map((m) => {
                  const rid = m.modelId || m.id || "";
                  const rName = rid.split("/").pop();
                  return (
                    <div key={rid} className="col-md-4">
                      <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: "var(--bg-card)", borderRadius: 12, overflow: "hidden" }}>
                        <div style={{ height: 3, backgroundColor: pipeMeta.color }} />
                        <div className="card-body p-3 d-flex flex-column">
                          <h6 className="fw-bold mb-1 text-truncate" title={rid} style={{ color: "var(--text-primary)" }}>{rName}</h6>
                          <p className="small mb-2 text-truncate opacity-75" style={{ color: "var(--text-secondary)" }}>{rid}</p>
                          <div className="d-flex gap-3 small mb-3 flex-grow-1" style={{ color: "var(--text-secondary)" }}>
                            <span>⬇ {formatNum(m.downloads)}</span>
                            <span>❤️ {formatNum(m.likes)}</span>
                          </div>
                          <Link href={`/ai-models/${encodeURIComponent(rid)}`} className="btn btn-sm fw-semibold"
                            style={{ backgroundColor: pipeMeta.color, color: "#fff", border: "none" }}>
                            Get AI Model →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="col-lg-4">
          <SideCard title="🚀 Use This Model">
            <p className="small mb-3" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Access model files, inference API, and full documentation on Hugging Face.
            </p>
            <a href={hfUrl} target="_blank" rel="noopener noreferrer" className="btn fw-bold w-100 mb-2"
              style={{ backgroundColor: pipeMeta.color, color: "#fff", border: "none" }}>
              Open on Hugging Face →
            </a>
            <a href={`${hfUrl}/tree/main`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary w-100 btn-sm mb-2">
              Browse Model Files ↗
            </a>
            <Link href="/ai-models" className="btn btn-outline-secondary w-100 btn-sm">← Browse All Models</Link>
          </SideCard>

          {pipeline && (
            <SideCard title={`${pipeMeta.emoji} Task: ${pipeMeta.label}`}>
              <p className="small mb-3" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                This model is designed for the <strong style={{ color: pipeMeta.color }}>{pipeMeta.label}</strong> task.
                Explore more models for this use case.
              </p>
              <Link href={`/ai-models?pipeline=${pipeline}`} className="btn btn-sm w-100"
                style={{ backgroundColor: pipeMeta.color + "22", color: pipeMeta.color, border: `1px solid ${pipeMeta.color}44` }}>
                All {pipeMeta.label} Models →
              </Link>
            </SideCard>
          )}

          <SideCard title="📊 Popularity">
            <div className="d-flex flex-column gap-3">
              {[
                { label: "Downloads", value: formatNum(model.downloads), icon: "⬇", color: "#0d6efd" },
                { label: "Community Likes", value: formatNum(model.likes), icon: "❤️", color: "#dc3545" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small" style={{ color: "var(--text-secondary)" }}>{s.icon} {s.label}</span>
                    <span className="fw-bold small" style={{ color: s.color }}>{s.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </SideCard>

          <SideCard title="🛠️ Requirements">
            <ul className="list-unstyled mb-0">
              {[
                model.library_name ? `Install: pip install ${model.library_name}` : "Check docs for installation steps.",
                "Python 3.8+ recommended for Transformers.",
                "GPU (CUDA) speeds up inference significantly.",
                "Use model.half() for fp16 on limited VRAM.",
              ].map((tip, i) => (
                <li key={i} className="d-flex gap-2 mb-2 small" style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  <span style={{ color: pipeMeta.color }} className="flex-shrink-0">→</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </SideCard>

          <SideCard title="🔗 Quick Links">
            <div className="d-flex flex-column gap-2">
              {[
                { label: "Model Card", url: hfUrl },
                { label: "Model Files", url: `${hfUrl}/tree/main` },
                { label: "Inference API", url: `${hfUrl}?inference_api=true` },
                { label: "Community Discussions", url: `${hfUrl}/discussions` },
              ].map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="d-flex justify-content-between align-items-center small text-decoration-none py-1"
                  style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color, #2a2a2a)" }}>
                  <span>{link.label}</span>
                  <span style={{ color: pipeMeta.color }}>↗</span>
                </a>
              ))}
            </div>
          </SideCard>
        </div>
      </div>
    </div>
  );
}
