export default function robots() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://techfordev.vercel.app";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/",
          "/dashboard",
          "/settings",
          "/queue",
          "/saved",
          "/_next/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 2,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
