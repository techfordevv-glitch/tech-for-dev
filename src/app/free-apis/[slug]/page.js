import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPublicAPIs } from "@/lib/newApis";

export const revalidate = 86400;

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entries = await fetchPublicAPIs();
  const api = entries.find((e) => slugify(e.API) === slug);
  if (!api) return { title: "API Not Found" };
  const desc = api.Description?.slice(0, 155) || `${api.API} — free public API in the ${api.Category} category.`;
  return {
    title: `${api.API} API`,
    description: desc,
    keywords: [api.API, api.Category, "free API", "public API", "REST API", api.Auth ? `${api.Auth} auth` : "no auth"],
    openGraph: {
      title: `${api.API} API — Free & Public`,
      description: desc,
      type: "website",
      url: `/free-apis/${slug}`,
      images: [{ url: `/api/og?title=${encodeURIComponent(api.API + " API")}&desc=${encodeURIComponent(api.Category)}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: `${api.API} API`, description: desc },
    alternates: { canonical: `/free-apis/${slug}` },
  };
}

function InfoRow({ label, value }) {
  return (
    <div
      className="d-flex justify-content-between align-items-center py-2"
      style={{ borderBottom: "1px solid var(--border-color, #2a2a2a)" }}
    >
      <span className="small fw-semibold" style={{ color: "var(--text-secondary)" }}>{label}</span>
      <span className="small text-end" style={{ color: "var(--text-primary)", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}

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

function AuthGuide({ auth }) {
  if (!auth) return (
    <>
      <span className="badge bg-success d-inline-block mb-2">No Authentication</span>
      <p className="small mb-0" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
        Call this API directly from any frontend or backend — no sign-up required.
      </p>
    </>
  );
  if (auth === "apiKey") return (
    <>
      <span className="badge bg-warning text-dark d-inline-block mb-2">API Key Required</span>
      <p className="small mb-2" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
        Register on the provider site to get a free key, then pass it in your request:
      </p>
      <pre className="rounded p-2 mb-0 small" style={{ backgroundColor: "#0d1117", color: "#ffc107", fontSize: 11, border: "1px solid #30363d" }}>
{`Authorization: Bearer YOUR_KEY
// or as query param:
?api_key=YOUR_KEY`}
      </pre>
    </>
  );
  if (auth === "OAuth") return (
    <>
      <span className="badge bg-primary d-inline-block mb-2">OAuth 2.0</span>
      <p className="small mb-0" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
        Register an app to get client ID + secret, then exchange them for an access token.
      </p>
    </>
  );
  return (
    <>
      <span className="badge bg-secondary d-inline-block mb-2">{auth}</span>
      <p className="small mb-0" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
        Check the official documentation for authentication details.
      </p>
    </>
  );
}

export default async function FreeAPIDetailPage({ params }) {
  const { slug } = await params;
  const entries = await fetchPublicAPIs();
  const api = entries.find((e) => slugify(e.API) === slug);
  if (!api) notFound();

  const related = entries.filter((e) => e.Category === api.Category && e.API !== api.API).slice(0, 3);

  const quickStart = api.Auth
    ? `const res = await fetch("${api.Link}", {\n  headers: { "Authorization": "Bearer YOUR_API_KEY" }\n});\nconst data = await res.json();\nconsole.log(data);`
    : `const res = await fetch("${api.Link}");\nconst data = await res.json();\nconsole.log(data);`;

  const corsColor = api.Cors === "yes" ? "#20c997" : api.Cors === "no" ? "#dc3545" : "#6c757d";
  const corsLabel = api.Cors === "yes" ? "✓ CORS Enabled" : api.Cors === "no" ? "✗ CORS Blocked" : "CORS Unknown";

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="breadcrumb small mb-0">
          <li className="breadcrumb-item">
            <Link href="/free-apis" className="text-warning text-decoration-none">Free APIs</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href={`/free-apis?cat=${encodeURIComponent(api.Category)}`} className="text-secondary text-decoration-none">
              {api.Category}
            </Link>
          </li>
          <li className="breadcrumb-item active text-secondary">{api.API}</li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* ── MAIN COLUMN ── */}
        <div className="col-lg-8">
          {/* Hero */}
          <div className="card border-0 shadow mb-4" style={{ backgroundColor: "var(--bg-card)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ height: 5, background: "linear-gradient(90deg, #ffc107, #fd7e14, #dc3545)" }} />
            <div className="card-body p-4">
              <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap mb-3">
                <div>
                  <Link
                    href={`/free-apis?cat=${encodeURIComponent(api.Category)}`}
                    className="badge text-decoration-none mb-2 d-inline-block"
                    style={{ backgroundColor: "#ffc10720", color: "#ffc107", fontSize: 12 }}
                  >
                    {api.Category}
                  </Link>
                  <h1 className="fw-bold mb-1" style={{ color: "var(--text-primary)", fontSize: "1.75rem" }}>{api.API}</h1>
                </div>
                <a href={api.Link} target="_blank" rel="noopener noreferrer" className="btn btn-warning fw-bold px-4 flex-shrink-0">
                  Get API →
                </a>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.8 }} className="mb-4">{api.Description}</p>
              <div className="d-flex flex-wrap gap-2">
                {!api.Auth
                  ? <span className="badge bg-success px-3 py-2">🔓 No Auth Required</span>
                  : <span className="badge bg-warning text-dark px-3 py-2">🔑 {api.Auth}</span>}
                <span className={`badge px-3 py-2 ${api.HTTPS ? "bg-primary" : "bg-secondary"}`}>
                  {api.HTTPS ? "🔒 HTTPS" : "⚠️ HTTP Only"}
                </span>
                <span className="badge px-3 py-2" style={{ backgroundColor: corsColor + "22", color: corsColor, border: `1px solid ${corsColor}44` }}>
                  🌐 {corsLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Details table */}
          <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: "var(--bg-card)", borderRadius: 14 }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>API Details</h5>
              <div className="rounded overflow-hidden" style={{ border: "1px solid var(--border-color, #333)" }}>
                <InfoRow label="API Name" value={api.API} />
                <InfoRow label="Category" value={
                  <Link href={`/free-apis?cat=${encodeURIComponent(api.Category)}`} className="text-warning text-decoration-none">{api.Category}</Link>
                } />
                <InfoRow label="Authentication" value={api.Auth || "None required"} />
                <InfoRow label="HTTPS Support" value={api.HTTPS ? "✅ Yes — secured" : "❌ No — plain HTTP"} />
                <InfoRow label="CORS Policy" value={
                  api.Cors === "yes" ? "✅ Enabled — browser-safe"
                  : api.Cors === "no" ? "❌ Blocked — server-side only"
                  : "❓ Unknown — check docs"
                } />
                <InfoRow label="Documentation" value={
                  <a href={api.Link} target="_blank" rel="noopener noreferrer" className="text-warning text-decoration-none">Open Docs ↗</a>
                } />
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: "var(--bg-card)", borderRadius: 14 }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>⚡ Quick Start</h5>
              <p className="small mb-3" style={{ color: "var(--text-secondary)" }}>
                Copy this JavaScript snippet to start using the API immediately.
              </p>
              <pre
                className="rounded p-3 mb-0"
                style={{ backgroundColor: "#0d1117", color: "#58a6ff", fontSize: 13, overflowX: "auto", lineHeight: 1.8, border: "1px solid #30363d", borderRadius: 10 }}
              >
                <code>{quickStart}</code>
              </pre>
            </div>
          </div>

          {/* More APIs from same category */}
          {related.length > 0 && (
            <div className="mb-2">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold mb-0" style={{ color: "var(--text-primary)" }}>More {api.Category} APIs</h5>
                <Link href={`/free-apis?cat=${encodeURIComponent(api.Category)}`} className="btn btn-sm btn-outline-warning">See all →</Link>
              </div>
              <div className="row g-3">
                {related.map((rel) => (
                  <div key={rel.API} className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: "var(--bg-card)", borderRadius: 12 }}>
                      <div className="card-body p-3 d-flex flex-column">
                        <h6 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>{rel.API}</h6>
                        <p className="small flex-grow-1 mb-3" style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                          {rel.Description.length > 80 ? rel.Description.slice(0, 80) + "…" : rel.Description}
                        </p>
                        <div className="d-flex gap-1 flex-wrap mb-2">
                          {!rel.Auth
                            ? <span className="badge bg-success" style={{ fontSize: 10 }}>No Auth</span>
                            : <span className="badge bg-warning text-dark" style={{ fontSize: 10 }}>{rel.Auth}</span>}
                          {rel.HTTPS && <span className="badge bg-primary" style={{ fontSize: 10 }}>HTTPS</span>}
                        </div>
                        <Link href={`/free-apis/${slugify(rel.API)}`} className="btn btn-sm btn-warning fw-semibold text-dark">
                          Get API →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="col-lg-4">
          <SideCard title="🚀 Access This API">
            <p className="small mb-3" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
              View endpoints, request formats, rate limits, and full response schemas in the official docs.
            </p>
            <a href={api.Link} target="_blank" rel="noopener noreferrer" className="btn btn-warning fw-bold w-100 mb-2">
              Open Documentation →
            </a>
            <Link href="/free-apis" className="btn btn-outline-secondary w-100 btn-sm">← Browse All APIs</Link>
          </SideCard>

          <SideCard title="🔐 Authentication Guide">
            <AuthGuide auth={api.Auth} />
          </SideCard>

          <SideCard title="⚙️ Compatibility">
            <div className="d-flex flex-column gap-2">
              {[
                {
                  label: "Browser (Frontend)",
                  ok: api.Cors === "yes",
                  unknown: api.Cors !== "yes" && api.Cors !== "no",
                  okLabel: "✓ Supported", noLabel: "✗ CORS Blocked", unknownLabel: "❓ Verify first",
                },
                { label: "Server (Node / Python)", ok: true, okLabel: "✓ Always works" },
                { label: "HTTPS / SSL", ok: api.HTTPS, okLabel: "✓ Secured", noLabel: "✗ HTTP only" },
              ].map((row) => (
                <div key={row.label} className="d-flex justify-content-between align-items-center">
                  <span className="small" style={{ color: "var(--text-secondary)" }}>{row.label}</span>
                  <span className="badge" style={{
                    fontSize: 11,
                    backgroundColor: row.unknown ? "#6c757d22" : row.ok ? "#20c99722" : "#dc354522",
                    color: row.unknown ? "#6c757d" : row.ok ? "#20c997" : "#dc3545",
                  }}>
                    {row.unknown ? row.unknownLabel : row.ok ? row.okLabel : row.noLabel}
                  </span>
                </div>
              ))}
            </div>
          </SideCard>

          <SideCard title="💡 Developer Tips">
            <ul className="list-unstyled mb-0">
              {[
                api.Auth ? "Store keys in .env — never expose them in client-side code." : "No key needed — safe to call from browser or server.",
                api.Cors !== "yes" ? "Use a server-side proxy or Next.js API route to avoid CORS errors." : "Direct browser fetch calls work — no proxy needed.",
                "Handle rate limits with retry logic and exponential backoff.",
                "Cache responses locally to minimize calls and stay on free tier.",
              ].map((tip, i) => (
                <li key={i} className="d-flex gap-2 mb-2 small" style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  <span className="text-warning flex-shrink-0">→</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </SideCard>

          <SideCard title={`📂 ${api.Category} Category`}>
            <p className="small mb-2" style={{ color: "var(--text-secondary)" }}>
              Explore all free APIs in the {api.Category} category.
            </p>
            <Link href={`/free-apis?cat=${encodeURIComponent(api.Category)}`} className="btn btn-sm btn-outline-warning w-100">
              Browse {api.Category} →
            </Link>
          </SideCard>
        </div>
      </div>
    </div>
  );
}
