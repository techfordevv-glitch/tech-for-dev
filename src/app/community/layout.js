const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://techfordev.vercel.app";

export const metadata = {
  title: "Developer Community",
  description:
    "Join the TechForDev developer community. Discuss tech, share projects, ask questions, and connect with thousands of developers worldwide.",
  keywords: [
    "developer community",
    "programming forum",
    "tech discussions",
    "software engineers",
    "coding community",
    "TechForDev community",
    "developer network",
    "tech enthusiasts",
  ],
  alternates: { canonical: `${BASE_URL}/community` },
  openGraph: {
    title: "Developer Community | TechForDev",
    description:
      "Join the TechForDev developer community. Discuss tech, share projects, and connect with thousands of developers worldwide.",
    url: `${BASE_URL}/community`,
    siteName: "TechForDev",
    type: "website",
    images: [{ url: `${BASE_URL}/api/og?title=Developer+Community&desc=Connect+with+thousands+of+developers+worldwide&type=page`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Community | TechForDev",
    description: "Connect with thousands of developers worldwide on TechForDev.",
    images: [`${BASE_URL}/api/og?title=Developer+Community&type=page`],
  },
};

export default function CommunityLayout({ children }) {
  return children;
}
