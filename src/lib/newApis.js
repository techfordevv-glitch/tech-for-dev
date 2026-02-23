// ============ REDDIT TECH POSTS ============
export async function fetchRedditPosts(subreddit = "programming", limit = 12) {
  try {
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}&raw_json=1`;
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      headers: { "User-Agent": "TechForDev/1.0" },
    });
    if (!res.ok) throw new Error("Reddit API failed");
    const data = await res.json();
    return (data?.data?.children || [])
      .map((c) => c.data)
      .filter((p) => !p.stickied && p.title);
  } catch (error) {
    console.error("Reddit Error:", error);
    return [];
  }
}

// ============ STACK OVERFLOW TRENDING ============
export async function fetchStackOverflow(tag = "", page = 1, pageSize = 12) {
  try {
    const tagParam = tag ? `&tagged=${tag}` : "";
    const url = `https://api.stackexchange.com/2.3/questions?order=desc&sort=hot&site=stackoverflow&pagesize=${pageSize}&page=${page}${tagParam}&filter=withbody`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error("Stack Overflow API failed");
    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("Stack Overflow Error:", error);
    return [];
  }
}

// ============ REMOTE DEVELOPER JOBS ============
export async function fetchRemoteJobs(category = "software-dev", limit = 12) {
  try {
    const url = `https://remotive.com/api/remote-jobs?category=${category}&limit=${limit}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Remotive API failed");
    const data = await res.json();
    return data.jobs || [];
  } catch (error) {
    console.error("Remote Jobs Error:", error);
    return [];
  }
}

// ============ TECH PODCASTS (iTunes) ============
export async function fetchTechPodcasts(term = "technology programming", limit = 12) {
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=podcast&genreId=1318&limit=${limit}&entity=podcast`;
    const res = await fetch(url, { next: { revalidate: 86400 } }); // 24hr cache
    if (!res.ok) throw new Error("iTunes API failed");
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Podcasts Error:", error);
    return [];
  }
}

// ============ TECH YOUTUBE VIDEOS (YouTube RSS — no API key needed) ============

// Channel IDs are loaded from environment variables (see .env.local / .env.example)
// Fallback defaults are used when env vars are not set
const YT_CHANNELS = {
  tech: (process.env.YT_CHANNELS_TECH || "UCsBjURrPoezykLs9EqgamOA,UCBJycsmduvYEL83R_U4JriQ,UCXuqSBlHAE6Xw-yeJA0Tunw").split(",").map((s) => s.trim()).filter(Boolean),
  programming: (process.env.YT_CHANNELS_PROGRAMMING || "UC29ju8bIPH5as8OGnQzwJyA,UCFbNIlppjAuEX4znoulh0Cw,UCJZv4d5rbIKd4QHMPkcABDQ,UC8ENHE5xdFSwx71WHd4FfyQ").split(",").map((s) => s.trim()).filter(Boolean),
  ai: (process.env.YT_CHANNELS_AI || "UCbRP3rIRkiuZkLKuuds0o9A,UCsTcErHg8oDvUnTzoqsYeNw,UCbfYPyITQ-7l4upoX8nvctg").split(",").map((s) => s.trim()).filter(Boolean),
};

function guessCategory(query = "") {
  const q = query.toLowerCase();
  if (q.includes("ai") || q.includes("artificial") || q.includes("machine")) return "ai";
  if (q.includes("program") || q.includes("tutorial") || q.includes("code")) return "programming";
  return "tech";
}

async function fetchChannelRSS(channelId) {
  try {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
    return entries.slice(0, 4).map(([, entry]) => {
      const get = (tag) =>
        (entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)) || [])[1] || "";
      const videoId = get("yt:videoId");
      const rawTitle = get("title");
      const title = rawTitle
        .replace(/&amp;/g, "&").replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
      const author = get("name");
      const published = get("published");
      return {
        videoId,
        title,
        author,
        publishedText: published ? new Date(published).toLocaleDateString() : "",
        thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        viewCount: 0,
        lengthSeconds: 0,
      };
    }).filter((v) => v.videoId);
  } catch {
    return [];
  }
}

export async function fetchTechVideos(query = "tech news", page = 1) {
  const category = guessCategory(query);
  const channels = YT_CHANNELS[category] || YT_CHANNELS.tech;
  // page > 1 → rotate channels to show different content
  const offset = (page - 1) % channels.length;
  const rotated = [...channels.slice(offset), ...channels.slice(0, offset)];

  const results = await Promise.allSettled(rotated.map(fetchChannelRSS));
  const videos = results
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .slice(0, 12);
  return videos;
}


// ============ TECH EVENTS / CONFERENCES ============
export function getTechEvents() {
  // Static curated list of major tech events (updated periodically)
  return [
    {
      id: 1,
      name: "Google I/O 2026",
      date: "May 2026",
      location: "Mountain View, CA",
      type: "Conference",
      url: "https://io.google",
      description: "Google's annual developer conference featuring the latest in Android, AI, Cloud, and Web technologies.",
      tags: ["AI", "Android", "Cloud", "Web"],
      free: true,
    },
    {
      id: 2,
      name: "Apple WWDC 2026",
      date: "June 2026",
      location: "Cupertino, CA (Online)",
      type: "Conference",
      url: "https://developer.apple.com/wwdc/",
      description: "Apple's worldwide developer conference with sessions on iOS, macOS, watchOS and more.",
      tags: ["iOS", "macOS", "Swift", "Apple"],
      free: true,
    },
    {
      id: 3,
      name: "Microsoft Build 2026",
      date: "May 2026",
      location: "Seattle, WA",
      type: "Conference",
      url: "https://build.microsoft.com",
      description: "Microsoft's flagship developer conference covering Azure, .NET, AI, and developer tools.",
      tags: ["Azure", "AI", ".NET", "DevTools"],
      free: false,
    },
    {
      id: 4,
      name: "AWS re:Invent 2026",
      date: "November 2026",
      location: "Las Vegas, NV",
      type: "Conference",
      url: "https://reinvent.awsevents.com",
      description: "Amazon Web Services' premier cloud computing and tech event with hands-on labs and keynotes.",
      tags: ["Cloud", "AWS", "DevOps", "Serverless"],
      free: false,
    },
    {
      id: 5,
      name: "React Summit 2026",
      date: "June 2026",
      location: "Amsterdam, Netherlands",
      type: "Conference",
      url: "https://reactsummit.com",
      description: "The biggest React conference worldwide. Expert talks on React, Next.js, and the JS ecosystem.",
      tags: ["React", "JavaScript", "Next.js", "Frontend"],
      free: false,
    },
    {
      id: 6,
      name: "PyCon US 2026",
      date: "April 2026",
      location: "Pittsburgh, PA",
      type: "Conference",
      url: "https://us.pycon.org",
      description: "The largest annual gathering of the Python community with tutorials, talks, and sprints.",
      tags: ["Python", "Data Science", "AI", "Open Source"],
      free: false,
    },
    {
      id: 7,
      name: "GitHub Universe 2026",
      date: "October 2026",
      location: "San Francisco, CA",
      type: "Conference",
      url: "https://githubuniverse.com",
      description: "GitHub's annual event featuring the future of software development, Copilot, and open source.",
      tags: ["Open Source", "DevTools", "AI", "GitHub"],
      free: true,
    },
    {
      id: 8,
      name: "KubeCon + CloudNativeCon 2026",
      date: "March 2026",
      location: "London, UK",
      type: "Conference",
      url: "https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/",
      description: "The CNCF's flagship conference on Kubernetes, cloud-native technologies, and DevOps.",
      tags: ["Kubernetes", "Cloud", "DevOps", "Containers"],
      free: false,
    },
    {
      id: 9,
      name: "JSConf 2026",
      date: "September 2026",
      location: "Berlin, Germany",
      type: "Conference",
      url: "https://jsconf.com",
      description: "One of the premier JavaScript conferences featuring cutting-edge talks and community events.",
      tags: ["JavaScript", "TypeScript", "Node.js", "Frontend"],
      free: false,
    },
    {
      id: 10,
      name: "RustConf 2026",
      date: "September 2026",
      location: "Montreal, Canada",
      type: "Conference",
      url: "https://rustconf.com",
      description: "The annual Rust programming language conference with talks from the Rust community.",
      tags: ["Rust", "Systems", "WebAssembly", "Performance"],
      free: false,
    },
    {
      id: 11,
      name: "Hacktoberfest 2026",
      date: "October 2026",
      location: "Online (Global)",
      type: "Hackathon",
      url: "https://hacktoberfest.com",
      description: "Month-long celebration of open source. Contribute to projects and earn rewards.",
      tags: ["Open Source", "Hackathon", "Community"],
      free: true,
    },
    {
      id: 12,
      name: "AI/ML Summit 2026",
      date: "July 2026",
      location: "New York, NY",
      type: "Summit",
      url: "https://ai-ml-summit.com",
      description: "Leading AI & Machine Learning summit with workshops, demos, and networking.",
      tags: ["AI", "Machine Learning", "Deep Learning", "NLP"],
      free: false,
    },
  ];
}

// ─── FREE PUBLIC APIs ────────────────────────────────────────────────────────
const STATIC_APIS = [
  // AI & Machine Learning
  { API: "OpenAI", Description: "GPT models for text generation, chat, code, and embeddings.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://platform.openai.com/docs", Category: "AI & Machine Learning" },
  { API: "Hugging Face Inference", Description: "Run thousands of open-source AI models via a simple REST API.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://huggingface.co/docs/api-inference", Category: "AI & Machine Learning" },
  { API: "Cohere", Description: "NLP API for text generation, summarization, and classification.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://docs.cohere.com", Category: "AI & Machine Learning" },
  { API: "Replicate", Description: "Run open-source machine learning models in the cloud.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://replicate.com/docs", Category: "AI & Machine Learning" },
  { API: "Together AI", Description: "Fast inference API for open-source LLMs like Llama and Mistral.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://docs.together.ai", Category: "AI & Machine Learning" },
  { API: "Groq", Description: "Ultra-fast inference for Llama, Mixtral, and Gemma models.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://console.groq.com/docs", Category: "AI & Machine Learning" },
  { API: "Stability AI", Description: "Generate images, video, and 3D assets using Stable Diffusion.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://platform.stability.ai/docs", Category: "AI & Machine Learning" },
  { API: "Mistral AI", Description: "Efficient open-weight language models via REST API.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://docs.mistral.ai", Category: "AI & Machine Learning" },
  // Weather
  { API: "Open-Meteo", Description: "Free weather forecast API with no API key required. Hourly and daily data.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://open-meteo.com/en/docs", Category: "Weather" },
  { API: "OpenWeatherMap", Description: "Current weather, forecasts, and historical data for any location.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://openweathermap.org/api", Category: "Weather" },
  { API: "WeatherAPI", Description: "Real-time, forecast, and historical weather data with timezone info.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.weatherapi.com/docs", Category: "Weather" },
  { API: "Tomorrow.io", Description: "Weather data with high-resolution forecasting and air quality.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://docs.tomorrow.io", Category: "Weather" },
  // Finance
  { API: "Alpha Vantage", Description: "Free APIs for real-time and historical stock, forex, and crypto data.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.alphavantage.co/documentation", Category: "Finance" },
  { API: "Polygon.io", Description: "Real-time and historical stock market data, aggregates, and news.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://polygon.io/docs", Category: "Finance" },
  { API: "CoinGecko", Description: "Cryptocurrency prices, market caps, charts, and exchange data.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.coingecko.com/api/documentation", Category: "Finance" },
  { API: "ExchangeRate-API", Description: "Simple API for currency conversion with 160+ currencies.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.exchangerate-api.com/docs", Category: "Finance" },
  { API: "Frankfurter", Description: "Free, open-source currency rates from the European Central Bank.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.frankfurter.app/docs", Category: "Finance" },
  // News & Media
  { API: "GNews", Description: "Real-time news API from Google News with full article content.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://gnews.io/docs", Category: "News & Media" },
  { API: "NewsAPI", Description: "Search and retrieve news articles from 80,000+ sources.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://newsapi.org/docs", Category: "News & Media" },
  { API: "The Guardian", Description: "Access all Guardian articles, sections, and tags since 1999.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://open-platform.theguardian.com/documentation", Category: "News & Media" },
  { API: "New York Times", Description: "Search NYT articles, reviews, and best-sellers lists.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developer.nytimes.com/docs", Category: "News & Media" },
  // Development Tools
  { API: "GitHub REST API", Description: "Access repositories, issues, pull requests, users, and more.", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://docs.github.com/en/rest", Category: "Development" },
  { API: "GitLab API", Description: "Manage GitLab projects, pipelines, issues, and merge requests.", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://docs.gitlab.com/ee/api", Category: "Development" },
  { API: "npm Registry", Description: "Query npm package metadata, downloads, and version history.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://github.com/nicolo-ribaudo/npm-registry-documentation", Category: "Development" },
  { API: "PyPI JSON API", Description: "Get metadata for any Python package hosted on PyPI.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://warehouse.pypa.io/api-reference/json.html", Category: "Development" },
  { API: "Shields.io", Description: "Generate SVG and PNG badges for GitHub READMEs. No key needed.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://shields.io", Category: "Development" },
  { API: "Hacker News", Description: "Access HN stories, comments, polls, and user profiles.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://github.com/HackerNews/API", Category: "Development" },
  { API: "Dev.to", Description: "Read and publish articles, comments, and listings on dev.to.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developers.forem.com/api", Category: "Development" },
  { API: "StackExchange", Description: "Access Stack Overflow questions, answers, and user profiles.", Auth: "OAuth", HTTPS: true, Cors: "unknown", Link: "https://api.stackexchange.com/docs", Category: "Development" },
  // Maps & Geo
  { API: "OpenStreetMap Nominatim", Description: "Free geocoding and reverse-geocoding using OpenStreetMap data.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://nominatim.org/release-docs/develop/api/Overview", Category: "Maps & Geo" },
  { API: "ipify", Description: "Simple public IP address API. Returns your current IP.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://www.ipify.org", Category: "Maps & Geo" },
  { API: "ip-api", Description: "IP geolocation — country, city, ISP, timezone, lat/lng.", Auth: "", HTTPS: false, Cors: "yes", Link: "https://ip-api.com/docs", Category: "Maps & Geo" },
  { API: "RestCountries", Description: "Get data about countries: name, capital, currencies, languages.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://restcountries.com", Category: "Maps & Geo" },
  { API: "Timezone DB", Description: "Convert timezone by city name, coordinates, or IANA zone name.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://timezonedb.com/api", Category: "Maps & Geo" },
  // Entertainment
  { API: "The Movie Database (TMDb)", Description: "Movies, TV shows, people data, ratings, and trailers.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developer.themoviedb.org/docs", Category: "Entertainment" },
  { API: "Open Library", Description: "Access millions of books from the Internet Archive's Open Library.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://openlibrary.org/developers/api", Category: "Entertainment" },
  { API: "iTunes Search API", Description: "Search the iTunes catalog for music, apps, books, and podcasts.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://performance-partners.apple.com/search-api", Category: "Entertainment" },
  { API: "Spotify Web API", Description: "Access Spotify music catalog, playlists, user data, and playback.", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://developer.spotify.com/documentation/web-api", Category: "Entertainment" },
  { API: "YouTube Data API", Description: "Search videos, channels, playlists, and retrieve video metadata.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developers.google.com/youtube/v3", Category: "Entertainment" },
  { API: "Jikan", Description: "Unofficial MyAnimeList REST API — anime, manga, characters.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://jikan.moe", Category: "Entertainment" },
  // Science & Education
  { API: "NASA APIs", Description: "APOD, Mars rover photos, asteroid data, EPIC Earth imagery, and more.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://api.nasa.gov", Category: "Science & Education" },
  { API: "Open Notify", Description: "Real-time position of the ISS and number of people in space.", Auth: "", HTTPS: false, Cors: "yes", Link: "http://open-notify.org/Open-Notify-API", Category: "Science & Education" },
  { API: "Wikipedia", Description: "Extract article summaries, full text, and media from Wikipedia.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://en.wikipedia.org/w/api.php", Category: "Science & Education" },
  { API: "arXiv API", Description: "Search and retrieve scientific preprints across CS, math, physics.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://arxiv.org/help/api", Category: "Science & Education" },
  { API: "Open Disease", Description: "COVID-19 statistics for countries, US states, and vaccines.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://disease.sh/docs", Category: "Science & Education" },
  // Utilities
  { API: "QR Code Generator", Description: "Generate QR codes for URLs, text, and vCards for free.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://goqr.me/api", Category: "Utilities" },
  { API: "Short.io", Description: "URL shortening, branded links, and click analytics.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developers.short.io", Category: "Utilities" },
  { API: "Abstract API — Email Validation", Description: "Validate email addresses, detect disposable emails and typos.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.abstractapi.com/api/email-validation-verification-api", Category: "Utilities" },
  { API: "PDF.co", Description: "PDF generation, merging, splitting, and text extraction API.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developer.pdf.co", Category: "Utilities" },
  { API: "Cloudinary", Description: "Image and video upload, transformation, optimization, and delivery.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://cloudinary.com/documentation", Category: "Utilities" },
  // Social
  { API: "Reddit JSON API", Description: "Browse subreddits, posts, and comments — no key needed.", Auth: "", HTTPS: true, Cors: "unknown", Link: "https://www.reddit.com/dev/api", Category: "Social" },
  { API: "Twitter/X API v2", Description: "Read and write tweets, search timelines, and manage accounts.", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://developer.x.com/en/docs/x-api", Category: "Social" },
  { API: "Mastodon", Description: "Open-source social network API for posting, timelines, and search.", Auth: "OAuth", HTTPS: true, Cors: "yes", Link: "https://docs.joinmastodon.org/api", Category: "Social" },
  // Jobs
  { API: "Remotive", Description: "Remote job listings across engineering, design, and product roles.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://remotive.com/api", Category: "Jobs" },
  { API: "The Muse", Description: "Job listings with company profiles, culture, and career advice.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://www.themuse.com/developers/api/v2", Category: "Jobs" },
  { API: "Arbeitnow", Description: "European job board with visa sponsorship and remote filters.", Auth: "", HTTPS: true, Cors: "yes", Link: "https://arbeitnow.com/api", Category: "Jobs" },
  // Security
  { API: "Have I Been Pwned", Description: "Check if emails or passwords have appeared in data breaches.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://haveibeenpwned.com/API/v3", Category: "Security" },
  { API: "Shodan", Description: "Search engine for internet-connected devices and open ports.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developer.shodan.io", Category: "Security" },
  { API: "VirusTotal", Description: "Scan files, URLs, IPs, and domains for malware and threats.", Auth: "apiKey", HTTPS: true, Cors: "yes", Link: "https://developers.virustotal.com/reference", Category: "Security" },
];

export async function fetchPublicAPIs() {
  // Try live API first; fall back to curated static list
  try {
    const res = await fetch("https://api.publicapis.org/entries", {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined,
    });
    if (!res.ok) throw new Error("publicapis fetch failed");
    const data = await res.json();
    const entries = data.entries || [];
    if (entries.length > 0) return entries;
    throw new Error("empty response");
  } catch {
    return STATIC_APIS;
  }
}

// ─── AI MODELS (Hugging Face) ─────────────────────────────────────────────────
export async function fetchAIModels(pipeline = "", limit = 24) {
  try {
    const filter = pipeline ? `&filter=${encodeURIComponent(pipeline)}` : "";
    const url = `https://huggingface.co/api/models?limit=${limit}&sort=downloads&direction=-1${filter}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("HuggingFace fetch failed");
    return await res.json();
  } catch {
    return [];
  }
}
