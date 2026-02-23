const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://techfordev.vercel.app";

export const metadata = {
  title: "Curated Dev Collections",
  description:
    "Explore curated collections of the best developer resources, articles, tools, and projects. Handpicked content organized by topic for every developer.",
  keywords: [
    "developer collections",
    "curated resources",
    "programming resources",
    "developer reading list",
    "tech resource library",
    "curated dev tools",
    "developer bookmarks",
  ],
  alternates: { canonical: `${BASE_URL}/collections` },
  openGraph: {
    title: "Curated Dev Collections | TechForDev",
    description:
      "Handpicked collections of the best developer resources, articles, tools, and projects.",
    url: `${BASE_URL}/collections`,
    siteName: "TechForDev",
    type: "website",
    images: [{ url: `${BASE_URL}/api/og?title=Curated+Dev+Collections&desc=Handpicked+developer+resources+organized+by+topic&type=page`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curated Dev Collections | TechForDev",
    description: "Handpicked developer resources, articles, and tools organized by topic.",
    images: [`${BASE_URL}/api/og?title=Curated+Dev+Collections&type=page`],
  },
};

export default function CollectionsLayout({ children }) {
  return children;
}
