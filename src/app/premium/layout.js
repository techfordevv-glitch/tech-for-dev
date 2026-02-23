const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://techfordev.vercel.app";

export const metadata = {
  title: "TechForDev Premium",
  description:
    "Upgrade to TechForDev Premium. Get ad-free browsing, exclusive content, priority support, early access to new features, and an enhanced developer experience.",
  keywords: [
    "TechForDev premium",
    "developer subscription",
    "ad-free tech news",
    "premium developer tools",
    "exclusive tech content",
    "developer membership",
  ],
  alternates: { canonical: `${BASE_URL}/premium` },
  openGraph: {
    title: "TechForDev Premium — Unlock the Full Developer Experience",
    description:
      "Get ad-free browsing, exclusive content, and premium features for developers.",
    url: `${BASE_URL}/premium`,
    siteName: "TechForDev",
    type: "website",
    images: [{ url: `${BASE_URL}/api/og?title=TechForDev+Premium&desc=Unlock+ad-free+browsing+%26+exclusive+developer+content&type=page`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechForDev Premium",
    description: "Unlock ad-free browsing and exclusive content for developers.",
    images: [`${BASE_URL}/api/og?title=TechForDev+Premium&type=page`],
  },
};

export default function PremiumLayout({ children }) {
  return children;
}
