import { fetchTechNews, fetchDevToArticles } from "@/lib/api";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://techfordev.vercel.app";

  const [news, articles] = await Promise.all([
    fetchTechNews(1, 20),
    fetchDevToArticles("technology", 1, 20),
  ]);

  const newsItems = news.map(
    (item) => `
    <item>
      <title><![CDATA[${item.title || ""}]]></title>
      <link>${item.url || baseUrl}</link>
      <description><![CDATA[${item.description || ""}]]></description>
      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
      <source url="${baseUrl}/news">TechForDev News</source>
    </item>`
  );

  const articleItems = articles.map(
    (item) => `
    <item>
      <title><![CDATA[${item.title || ""}]]></title>
      <link>${baseUrl}/articles/${item.id}</link>
      <description><![CDATA[${item.description || ""}]]></description>
      <pubDate>${new Date(item.published_at).toUTCString()}</pubDate>
      <source url="${baseUrl}/articles">TechForDev Articles</source>
    </item>`
  );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TechForDev — Tech News &amp; Developer Articles</title>
    <link>${baseUrl}</link>
    <description>Your daily source for tech news, AI tools, developer articles, and trending projects.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml"/>
    ${newsItems.join("")}
    ${articleItems.join("")}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=1800",
    },
  });
}
