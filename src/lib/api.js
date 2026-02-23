const GNEWS_API_KEY = process.env.GNEWS_API_KEY || "";

// ============ TECH NEWS (GNews API) ============
export async function fetchTechNews(page = 1, max = 10) {
  if (!GNEWS_API_KEY) return [];
  try {
    const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&max=${max}&page=${page}&apikey=${GNEWS_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 1800 } }); // 30 min cache
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.error("Tech News Error:", error);
    return [];
  }
}

// ============ SEARCH NEWS ============
export async function searchNews(query = "artificial intelligence", max = 10) {
  if (!GNEWS_API_KEY) return [];
  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=${max}&apikey=${GNEWS_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.error("Search News Error:", error);
    return [];
  }
}

// ============ DEV.TO ARTICLES ============
export async function fetchDevToArticles(tag = "technology", page = 1, perPage = 12) {
  try {
    const url = `https://dev.to/api/articles?tag=${tag}&page=${page}&per_page=${perPage}&top=7`;
    const res = await fetch(url, { next: { revalidate: 3600 } }); // 1 hr cache
    if (!res.ok) throw new Error("Dev.to API failed");
    return await res.json();
  } catch (error) {
    console.error("Dev.to Error:", error);
    return [];
  }
}

export async function fetchLatestArticles(page = 1, perPage = 12) {
  try {
    const url = `https://dev.to/api/articles/latest?page=${page}&per_page=${perPage}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Dev.to Latest API failed");
    return await res.json();
  } catch (error) {
    console.error("Dev.to Latest Error:", error);
    return [];
  }
}

// ============ GITHUB TRENDING PROJECTS ============
export async function fetchGitHubTrending(language = "", since = "weekly") {
  try {
    // Using GitHub search API as a proxy for trending
    const langQuery = language ? `+language:${language}` : "";
    const url = `https://api.github.com/search/repositories?q=stars:>100+pushed:>${getDateDaysAgo(7)}${langQuery}&sort=stars&order=desc&per_page=12`;
    const headers = process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {};
    const res = await fetch(url, { next: { revalidate: 3600 }, headers });
    if (!res.ok) throw new Error("GitHub API failed");
    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("GitHub Trending Error:", error);
    return [];
  }
}

// ============ HACKER NEWS (Tech Products & Discussions) ============
export async function fetchHackerNewsTop(limit = 12) {
  try {
    const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error("HN API failed");
    const ids = await res.json();
    const topIds = ids.slice(0, limit);

    const stories = await Promise.all(
      topIds.map(async (id) => {
        const storyRes = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          { next: { revalidate: 1800 } }
        );
        return storyRes.json();
      })
    );

    return stories.filter((s) => s && s.type === "story");
  } catch (error) {
    console.error("Hacker News Error:", error);
    return [];
  }
}

export async function fetchHackerNewsShowHN(limit = 12) {
  try {
    const res = await fetch("https://hacker-news.firebaseio.com/v0/showstories.json", {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error("HN Show API failed");
    const ids = await res.json();
    const topIds = ids.slice(0, limit);

    const stories = await Promise.all(
      topIds.map(async (id) => {
        const storyRes = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          { next: { revalidate: 1800 } }
        );
        return storyRes.json();
      })
    );

    return stories.filter((s) => s && s.type === "story");
  } catch (error) {
    console.error("HN Show Error:", error);
    return [];
  }
}

// ============ PRODUCT HUNT (Daily Tech Products) ============
export async function fetchProductHuntDaily() {
  try {
    // Using unofficial endpoint for daily products
    const res = await fetch(
      "https://api.producthunt.com/v2/api/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{ posts(order: RANKING) { edges { node { name tagline url thumbnail { url } votesCount website } } } }`,
        }),
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error("PH API requires auth");
    const data = await res.json();
    return data?.data?.posts?.edges?.map((e) => e.node) || [];
  } catch {
    // Fallback - PH requires auth, so we return empty
    return [];
  }
}

// ============ INDIVIDUAL ARTICLE (Dev.to) ============
export async function fetchArticleById(id) {
  try {
    const res = await fetch(`https://dev.to/api/articles/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Article not found");
    return await res.json();
  } catch (error) {
    console.error("Article Detail Error:", error);
    return null;
  }
}

// ============ INDIVIDUAL REPO (GitHub) ============
export async function fetchRepoDetails(owner, repo) {
  try {
    const headers = process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {};
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      next: { revalidate: 3600 },
      headers,
    });
    if (!res.ok) throw new Error("Repo not found");
    return await res.json();
  } catch (error) {
    console.error("Repo Detail Error:", error);
    return null;
  }
}

export async function fetchRepoReadme(owner, repo) {
  try {
    const headers = {
      Accept: "application/vnd.github.v3.raw",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    };
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      next: { revalidate: 3600 },
      headers,
    });
    if (!res.ok) return null;
    return await res.text();
  } catch (error) {
    console.error("README Error:", error);
    return null;
  }
}

// ============ HELPERS ============
function getDateDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(dateStr);
}
