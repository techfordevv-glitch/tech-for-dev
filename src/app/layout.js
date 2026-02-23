import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import BookmarkProvider from "@/components/BookmarkProvider";
import LanguageProvider from "@/components/LanguageProvider";
import UserDataProvider from "@/components/UserDataProvider";
import BackToTop from "@/components/BackToTop";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import ChatWidget from "@/components/ChatWidget";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://techfordev.vercel.app";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TechForDev — Daily Tech News, AI Tools & Developer Hub",
    template: "%s | TechForDev",
  },
  description:
    "TechForDev is your all-in-one developer hub — real-time tech news, 30+ AI tools, trending GitHub projects, remote jobs, dev articles, podcasts, videos, and more. Always free. Auto-updated every 30 minutes.",
  keywords: [
    "tech news", "developer tools", "AI tools", "open source", "GitHub trending",
    "remote developer jobs", "programming articles", "tech podcasts", "tech videos",
    "free public APIs", "AI models", "stack overflow", "hacker news", "developer hub",
    "software engineering", "web development", "machine learning", "devops",
  ],
  authors: [{ name: "Md Mijanur Molla", url: BASE_URL }],
  creator: "Md Mijanur Molla",
  publisher: "TechForDev",
  category: "Technology",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon.svg", type: "image/svg+xml", sizes: "192x192" },
    ],
    apple: [{ url: "/icons/icon.svg", sizes: "180x180" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "TechForDev — Daily Tech News, AI Tools & Developer Hub",
    description:
      "Real-time tech news, AI tools, trending GitHub projects, remote jobs, dev articles and more — all in one place. Free & open.",
    url: BASE_URL,
    siteName: "TechForDev",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/api/og?title=TechForDev&desc=Your+Daily+Tech+News%2C+AI+Tools+%26+Developer+Hub",
        width: 1200,
        height: 630,
        alt: "TechForDev — Developer Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@techfordevhq",
    creator: "@techfordevhq",
    title: "TechForDev — Daily Tech News, AI Tools & Developer Hub",
    description: "Real-time tech news, AI tools, trending repos, remote jobs and more. Free & open.",
    images: ["/api/og?title=TechForDev&desc=Your+Daily+Tech+News%2C+AI+Tools+%26+Developer+Hub"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "TechForDev",
    "application-name": "TechForDev",
    "msapplication-TileColor": "#3b82f6",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "TechForDev",
      description:
        "Your all-in-one developer hub — real-time tech news, AI tools, trending projects, remote jobs and more.",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "TechForDev",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icons/icon.svg`,
        width: 192,
        height: 192,
      },
      sameAs: [
        "https://twitter.com/techfordevhq",
        "https://github.com/techfordevhq",
      ],
      founder: {
        "@type": "Person",
        name: "Md Mijanur Molla",
        jobTitle: "Software Engineer",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <BookmarkProvider>
            <LanguageProvider>
              <UserDataProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <BackToTop />
                <KeyboardShortcuts />
                <ChatWidget />
              </UserDataProvider>
            </LanguageProvider>
          </BookmarkProvider>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.getRegistrations().then(registrations => {
                    registrations.forEach(r => r.unregister());
                  }).then(() => {
                    navigator.serviceWorker.register('/sw.js').then(reg => {
                      reg.update();
                    }).catch(() => {});
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
