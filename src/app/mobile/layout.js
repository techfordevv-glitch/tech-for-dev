const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://techfordev.vercel.app";

export const metadata = {
  title: "Mobile Development",
  description:
    "Stay up-to-date with the latest mobile development news, tutorials, and resources. Covering React Native, Flutter, iOS, and Android development.",
  keywords: [
    "mobile development",
    "React Native",
    "Flutter",
    "iOS development",
    "Android development",
    "cross-platform apps",
    "mobile apps 2025",
    "mobile developer resources",
  ],
  alternates: { canonical: `${BASE_URL}/mobile` },
  openGraph: {
    title: "Mobile Development | TechForDev",
    description:
      "Latest mobile development news covering React Native, Flutter, iOS, and Android.",
    url: `${BASE_URL}/mobile`,
    siteName: "TechForDev",
    type: "website",
    images: [{ url: `${BASE_URL}/api/og?title=Mobile+Development&desc=React+Native%2C+Flutter%2C+iOS+%26+Android+resources&type=page`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Development | TechForDev",
    description: "React Native, Flutter, iOS & Android resources for developers.",
    images: [`${BASE_URL}/api/og?title=Mobile+Development&type=page`],
  },
};

export default function MobileLayout({ children }) {
  return children;
}
