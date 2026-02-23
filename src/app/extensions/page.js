import { FaChrome, FaFirefoxBrowser, FaSafari, FaPuzzlePiece } from "react-icons/fa";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://techfordev.vercel.app";

export const metadata = {
  title: "Browser Extensions",
  description:
    "Install the TechForDev browser extension for Chrome, Firefox, and Safari. One-click save articles, smart highlights, and instant access to dev resources.",
  keywords: [
    "TechForDev extension",
    "browser extension for developers",
    "Chrome developer extension",
    "Firefox dev extension",
    "save articles browser extension",
    "developer productivity extension",
  ],
  alternates: { canonical: `${BASE_URL}/extensions` },
  openGraph: {
    title: "Browser Extensions | TechForDev",
    description: "One-click save and smart highlights with the TechForDev browser extension.",
    url: `${BASE_URL}/extensions`,
    siteName: "TechForDev",
    type: "website",
    images: [{ url: `${BASE_URL}/api/og?title=Browser+Extensions&desc=One-click+save+%26+smart+highlights+for+developers&type=page`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browser Extensions | TechForDev",
    description: "One-click save and smart highlights with the TechForDev browser extension.",
    images: [`${BASE_URL}/api/og?title=Browser+Extensions&type=page`],
  },
};

export default function ExtensionsPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><FaPuzzlePiece className="me-2 text-primary" />Browser Extensions</h1>
          <p className="mb-0">Install extension support for one-click save and smart highlights.</p>
        </div>
      </div>
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body text-center"><FaChrome size={34} className="mb-2 text-danger" /><h5>Chrome</h5><button className="btn btn-outline-primary">Coming Soon</button></div></div></div>
          <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body text-center"><FaFirefoxBrowser size={34} className="mb-2 text-warning" /><h5>Firefox</h5><button className="btn btn-outline-primary">Coming Soon</button></div></div></div>
          <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body text-center"><FaSafari size={34} className="mb-2 text-info" /><h5>Safari</h5><button className="btn btn-outline-primary">Coming Soon</button></div></div></div>
        </div>
      </div>
    </>
  );
}
