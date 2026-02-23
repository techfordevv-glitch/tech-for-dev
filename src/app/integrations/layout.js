const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://techfordev.vercel.app";

export const metadata = {
  title: "Developer Integrations & Tools",
  description:
    "Discover the best developer integrations, APIs, and productivity tools. Connect your workflow with the most powerful developer services and platforms.",
  keywords: [
    "developer integrations",
    "API integrations",
    "developer tools",
    "productivity tools",
    "workflow automation",
    "developer services",
    "CI/CD integrations",
    "GitHub integrations",
    "Slack developer tools",
  ],
  alternates: { canonical: `${BASE_URL}/integrations` },
  openGraph: {
    title: "Developer Integrations & Tools | TechForDev",
    description:
      "Discover the best developer integrations, APIs, and tools to supercharge your workflow.",
    url: `${BASE_URL}/integrations`,
    siteName: "TechForDev",
    type: "website",
    images: [{ url: `${BASE_URL}/api/og?title=Developer+Integrations+%26+Tools&desc=Supercharge+your+developer+workflow+with+top+integrations&type=page`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Integrations & Tools | TechForDev",
    description: "Discover top integrations and tools to supercharge your developer workflow.",
    images: [`${BASE_URL}/api/og?title=Developer+Integrations&type=page`],
  },
};

export default function IntegrationsLayout({ children }) {
  return children;
}
