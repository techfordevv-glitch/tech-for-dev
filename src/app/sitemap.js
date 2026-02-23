const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://techfordev.vercel.app";

// Static high-priority routes
const STATIC_ROUTES = [
  { url: "/", priority: 1.0, changeFrequency: "hourly" },
  { url: "/news", priority: 0.9, changeFrequency: "hourly" },
  { url: "/articles", priority: 0.9, changeFrequency: "daily" },
  { url: "/ai-tools", priority: 0.9, changeFrequency: "weekly" },
  { url: "/ai-models", priority: 0.8, changeFrequency: "daily" },
  { url: "/projects", priority: 0.9, changeFrequency: "daily" },
  { url: "/videos", priority: 0.8, changeFrequency: "daily" },
  { url: "/podcasts", priority: 0.8, changeFrequency: "weekly" },
  { url: "/jobs", priority: 0.8, changeFrequency: "daily" },
  { url: "/events", priority: 0.8, changeFrequency: "weekly" },
  { url: "/reddit", priority: 0.7, changeFrequency: "hourly" },
  { url: "/stackoverflow", priority: 0.7, changeFrequency: "daily" },
  { url: "/free-apis", priority: 0.8, changeFrequency: "weekly" },
  { url: "/community", priority: 0.6, changeFrequency: "monthly" },
  { url: "/mobile", priority: 0.7, changeFrequency: "daily" },
  { url: "/integrations", priority: 0.7, changeFrequency: "weekly" },
  { url: "/insights", priority: 0.7, changeFrequency: "weekly" },
  { url: "/collections", priority: 0.7, changeFrequency: "weekly" },
  { url: "/extensions", priority: 0.6, changeFrequency: "monthly" },
  { url: "/premium", priority: 0.6, changeFrequency: "monthly" },
  { url: "/about", priority: 0.7, changeFrequency: "monthly" },
  { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { url: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
  { url: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap() {
  const now = new Date();

  return STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
