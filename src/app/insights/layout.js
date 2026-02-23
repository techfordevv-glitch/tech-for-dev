const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://techfordev.vercel.app";

export const metadata = {
  title: "Tech Insights & Analytics",
  description:
    "Deep-dive tech insights, analytics, and trends for developers. Understand what's shaping the software industry with curated data and analysis.",
  keywords: [
    "tech insights",
    "developer analytics",
    "technology trends 2025",
    "software industry analysis",
    "programming trends",
    "developer statistics",
    "tech market insights",
  ],
  alternates: { canonical: `${BASE_URL}/insights` },
  openGraph: {
    title: "Tech Insights & Analytics | TechForDev",
    description:
      "Deep-dive insights and analytics on the latest technology trends and software industry data.",
    url: `${BASE_URL}/insights`,
    siteName: "TechForDev",
    type: "website",
    images: [{ url: `${BASE_URL}/api/og?title=Tech+Insights+%26+Analytics&desc=Technology+trends+and+software+industry+analysis&type=page`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Insights & Analytics | TechForDev",
    description: "Technology trends and software industry analysis for developers.",
    images: [`${BASE_URL}/api/og?title=Tech+Insights+%26+Analytics&type=page`],
  },
};

export default function InsightsLayout({ children }) {
  return children;
}
