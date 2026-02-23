import { fetchTechNews, fetchDevToArticles, fetchGitHubTrending } from "@/lib/api";
import { aiTools } from "@/lib/aitools";

export const revalidate = 1800;

export async function GET() {
  const [news, articles, projects] = await Promise.all([
    fetchTechNews(1, 5),
    fetchDevToArticles("technology", 1, 5),
    fetchGitHubTrending("", "weekly"),
  ]);

  return Response.json({
    success: true,
    data: {
      news: news.slice(0, 5),
      articles: articles.slice(0, 5),
      projects: projects.slice(0, 5),
      aiToolsCount: aiTools.length,
    },
    updatedAt: new Date().toISOString(),
  });
}
