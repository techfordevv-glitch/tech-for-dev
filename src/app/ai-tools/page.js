import AIToolsClient from "./AIToolsClient";

export const metadata = {
  title: "AI Tools Directory",
  description:
    "Explore 30+ curated AI tools across chat, image generation, coding, video, audio, writing, and more. Compare features, pricing, and capabilities of the best AI tools in 2026.",
  keywords: [
    "AI tools", "artificial intelligence tools", "ChatGPT alternatives", "AI image generators",
    "AI coding tools", "AI writing tools", "best AI tools 2026", "free AI tools",
    "Midjourney", "GitHub Copilot", "AI directory",
  ],
  openGraph: {
    title: "AI Tools Directory — 30+ Tools | TechForDev",
    description:
      "Compare 30+ AI tools for chat, image gen, coding, video, audio & writing. Find the best AI tool for your workflow.",
    type: "website",
    url: "/ai-tools",
    images: [{ url: "/api/og?title=AI+Tools+Directory&desc=30%2B+curated+AI+tools+compared", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Directory — 30+ Tools | TechForDev",
    description: "Compare 30+ AI tools — chat, image gen, coding, video, audio & writing.",
  },
  alternates: { canonical: "/ai-tools" },
};

export default function AIToolsPage() {
  return <AIToolsClient />;
}
