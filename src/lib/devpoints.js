// Dev Points utility — use in client components
// Call these functions to award points and track activity

const POINTS_KEY = "dev_points_data";

export function getPointsData() {
  if (typeof window === "undefined") return defaultData();
  try {
    const raw = localStorage.getItem(POINTS_KEY);
    return raw ? JSON.parse(raw) : defaultData();
  } catch {
    return defaultData();
  }
}

function defaultData() {
  return {
    total: 0,
    visits: 0,
    articlesRead: 0,
    challengesSolved: 0,
    toolsUpvoted: 0,
    pollsVoted: 0,
    log: [], // [{ action, points, ts }]
  };
}

function save(data) {
  if (typeof window !== "undefined") {
    localStorage.setItem(POINTS_KEY, JSON.stringify(data));
  }
}

export function awardPoints(action, pts) {
  const data = getPointsData();
  data.total += pts;
  const key = {
    visit: "visits",
    article_read: "articlesRead",
    challenge_solved: "challengesSolved",
    tool_upvoted: "toolsUpvoted",
    poll_voted: "pollsVoted",
  }[action];
  if (key) data[key] = (data[key] || 0) + 1;
  data.log = [{ action, points: pts, ts: Date.now() }, ...data.log].slice(0, 50);
  save(data);
  return data;
}

export function getBadge(total) {
  if (total >= 500) return { label: "Legendary Dev", color: "#f59e0b", emoji: "🏆" };
  if (total >= 200) return { label: "Senior Dev", color: "#8b5cf6", emoji: "💜" };
  if (total >= 100) return { label: "Mid Dev", color: "#3b82f6", emoji: "💙" };
  if (total >= 50)  return { label: "Junior Dev", color: "#22c55e", emoji: "💚" };
  if (total >= 10)  return { label: "Newbie", color: "#6b7280", emoji: "🌱" };
  return { label: "Explorer", color: "#9ca3af", emoji: "🚀" };
}
