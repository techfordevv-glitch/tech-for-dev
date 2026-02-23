import Link from "next/link";
import { fetchPublicAPIs } from "@/lib/newApis";

export const revalidate = 86400;

export const metadata = {
  title: "Free Public APIs Directory",
  description: "Browse 500+ free public APIs across 40+ categories — Weather, Finance, Sports, AI, Entertainment, Science, and more. Includes auth type, HTTPS support, and quick start guides.",
  keywords: ["free public APIs", "REST APIs", "open APIs", "no auth APIs", "weather API", "finance API", "public API directory", "API list"],
  openGraph: {
    title: "Free Public APIs Directory | TechForDev",
    description: "500+ free public APIs across 40+ categories with auth type, HTTPS info and quick start guides.",
    type: "website",
    url: "/free-apis",
    images: [{ url: "/api/og?title=Free+Public+APIs&desc=500%2B+APIs+across+40%2B+categories", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Public APIs Directory | TechForDev",
    description: "500+ free public APIs across 40+ categories with quick start guides.",
  },
  alternates: { canonical: "/free-apis" },
};

function slugify(name) {
  return encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""));
}

function AuthBadge({ auth }) {
  if (!auth) return <span className="badge bg-success me-1">No Auth</span>;
  return <span className="badge bg-warning text-dark me-1">{auth}</span>;
}

function HttpsBadge({ https }) {
  return https
    ? <span className="badge bg-primary me-1">HTTPS</span>
    : <span className="badge bg-secondary me-1">HTTP</span>;
}

function CorsBadge({ cors }) {
  const c = (cors || "").toLowerCase();
  if (c === "yes") return <span className="badge bg-info text-dark me-1">CORS ✓</span>;
  if (c === "no") return <span className="badge bg-danger me-1">CORS ✗</span>;
  return <span className="badge bg-secondary me-1">CORS?</span>;
}

export default async function FreeAPIsPage({ searchParams }) {
  const params = await searchParams;
  const selectedCat = params?.cat || "All";
  const entries = await fetchPublicAPIs();

  // Group by category
  const categories = ["All", ...Array.from(new Set(entries.map((e) => e.Category))).sort()];
  const filtered = selectedCat === "All" ? entries : entries.filter((e) => e.Category === selectedCat);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-bold display-6 mb-1">
          <span className="text-warning">{"</>"}</span> Free Public APIs
        </h1>
        <p className="text-secondary">
          {entries.length} free APIs across {categories.length - 1} categories — no payment required.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-4 d-flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = cat === selectedCat;
          return (
            <Link
              key={cat}
              href={cat === "All" ? "/free-apis" : `/free-apis?cat=${encodeURIComponent(cat)}`}
              className={`btn btn-sm ${isActive ? "btn-warning text-dark fw-semibold" : "btn-outline-secondary"}`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ms-1 opacity-75">
                  ({entries.filter((e) => e.Category === cat).length})
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Results Count */}
      <p className="text-secondary small mb-3">
        Showing <strong className="text-primary">{filtered.length}</strong> APIs
        {selectedCat !== "All" && <> in <strong>{selectedCat}</strong></>}
      </p>

      {/* API Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-5 text-secondary">No APIs found in this category.</div>
      ) : (
        <div className="row g-3">
          {filtered.map((api) => (
            <div key={api.API} className="col-sm-6 col-lg-4">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{ backgroundColor: "var(--bg-card)", borderRadius: 12 }}
              >
                <div className="card-body d-flex flex-column p-3">
                  {/* Category pill */}
                  <div className="mb-2">
                    <Link
                      href={`/free-apis?cat=${encodeURIComponent(api.Category)}`}
                      className="badge text-decoration-none"
                      style={{ backgroundColor: "var(--accent-muted, #0d6efd22)", color: "var(--text-secondary)" }}
                    >
                      {api.Category}
                    </Link>
                  </div>

                  {/* Name */}
                  <h6 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>
                    {api.API}
                  </h6>

                  {/* Description */}
                  <p
                    className="small mb-3 flex-grow-1"
                    style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}
                  >
                    {api.Description}
                  </p>

                  {/* Badges */}
                  <div className="mb-3">
                    <AuthBadge auth={api.Auth} />
                    <HttpsBadge https={api.HTTPS} />
                    <CorsBadge cors={api.Cors} />
                  </div>

                  {/* Action */}
                  <Link
                    href={`/free-apis/${slugify(api.API)}`}
                    className="btn btn-sm btn-warning fw-semibold text-dark"
                  >
                    Get API →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
