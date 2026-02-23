"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const translations = {
  en: {
    home: "Home",
    techNews: "Tech News",
    aiTools: "AI Tools",
    articles: "Articles",
    projects: "Projects",
    videos: "Videos",
    jobs: "Jobs",
    podcasts: "Podcasts",
    reddit: "Reddit",
    stackoverflow: "Stack Overflow",
    events: "Events",
    dashboard: "Dashboard",
    saved: "Saved",
    search: "Search everything...",
    heroTitle: "Your Daily",
    heroHighlight: "Tech Pulse",
    heroDesc: "Stay ahead with real-time tech news, explore 30+ AI tools, read developer articles, and discover trending open-source projects — all in one place, auto-updated every 30 minutes.",
    latestNews: "Latest Tech News",
    viewAll: "View All",
    popularAITools: "Popular AI Tools",
    devArticles: "Developer Articles",
    trendingProjects: "Trending Projects",
    hnTopStories: "Hacker News Top Stories",
    readMore: "Read More",
    details: "Details",
    visitOriginal: "Visit Original",
    shareOn: "Share on",
    bookmark: "Bookmark",
    removeBookmark: "Remove Bookmark",
    savedItems: "Saved Items",
    noSavedItems: "No saved items yet",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    newsletter: "Newsletter",
    newsletterDesc: "Get weekly tech updates in your inbox",
    subscribe: "Subscribe",
    emailPlaceholder: "Enter your email",
    allTools: "All Tools",
    free: "Free",
    loading: "Loading...",
    notFound: "Not Found",
    backToHome: "Back to Home",
    pressSlash: "Press / to search",
    relatedArticles: "Related Articles",
    suggestedProjects: "Similar Projects",
    moreNews: "More Tech News",
    techVideos: "Tech Videos",
    remoteJobs: "Remote Developer Jobs",
    techPodcasts: "Tech Podcasts",
    redditPosts: "Reddit Tech Posts",
    trendingQuestions: "Trending Questions",
    techEvents: "Tech Events & Conferences",
    analytics: "Analytics Dashboard",
    totalItems: "Total Items",
    dataSources: "Data Sources",
    lastUpdated: "Last Updated",
    language: "Language",
    bengali: "বাংলা",
    english: "English",
  },
  bn: {
    home: "হোম",
    techNews: "টেক নিউজ",
    aiTools: "AI টুলস",
    articles: "আর্টিকেল",
    projects: "প্রজেক্ট",
    videos: "ভিডিও",
    jobs: "চাকরি",
    podcasts: "পডকাস্ট",
    reddit: "রেডিট",
    stackoverflow: "স্ট্যাক ওভারফ্লো",
    events: "ইভেন্ট",
    dashboard: "ড্যাশবোর্ড",
    saved: "সেভ করা",
    search: "সব কিছু খুঁজুন...",
    heroTitle: "আপনার দৈনিক",
    heroHighlight: "টেক পালস",
    heroDesc: "রিয়েল-টাইম টেক নিউজ, ৩০+ AI টুল, ডেভেলপার আর্টিকেল, এবং ট্রেন্ডিং ওপেন-সোর্স প্রজেক্ট — সব এক জায়গায়, প্রতি ৩০ মিনিটে আপডেট।",
    latestNews: "সর্বশেষ টেক নিউজ",
    viewAll: "সব দেখুন",
    popularAITools: "জনপ্রিয় AI টুলস",
    devArticles: "ডেভেলপার আর্টিকেল",
    trendingProjects: "ট্রেন্ডিং প্রজেক্ট",
    hnTopStories: "হ্যাকার নিউজ টপ স্টোরি",
    readMore: "আরও পড়ুন",
    details: "বিস্তারিত",
    visitOriginal: "মূল লিংক",
    shareOn: "শেয়ার করুন",
    bookmark: "সেভ করুন",
    removeBookmark: "সেভ সরান",
    savedItems: "সেভ করা আইটেম",
    noSavedItems: "এখনো কিছু সেভ করা হয়নি",
    darkMode: "ডার্ক মোড",
    lightMode: "লাইট মোড",
    newsletter: "নিউজলেটার",
    newsletterDesc: "সাপ্তাহিক টেক আপডেট পান আপনার ইমেইলে",
    subscribe: "সাবস্ক্রাইব",
    emailPlaceholder: "আপনার ইমেইল দিন",
    allTools: "সব টুলস",
    free: "ফ্রি",
    loading: "লোড হচ্ছে...",
    notFound: "খুঁজে পাওয়া যায়নি",
    backToHome: "হোমে ফিরুন",
    pressSlash: "/ চেপে খুঁজুন",
    relatedArticles: "সম্পর্কিত আর্টিকেল",
    suggestedProjects: "একই ধরনের প্রজেক্ট",
    moreNews: "আরও টেক নিউজ",
    techVideos: "টেক ভিডিও",
    remoteJobs: "রিমোট ডেভেলপার চাকরি",
    techPodcasts: "টেক পডকাস্ট",
    redditPosts: "রেডিট টেক পোস্ট",
    trendingQuestions: "ট্রেন্ডিং প্রশ্ন",
    techEvents: "টেক ইভেন্ট ও কনফারেন্স",
    analytics: "অ্যানালিটিক্স ড্যাশবোর্ড",
    totalItems: "মোট আইটেম",
    dataSources: "ডেটা সোর্স",
    lastUpdated: "শেষ আপডেট",
    language: "ভাষা",
    bengali: "বাংলা",
    english: "English",
  },
};

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("techfordev-lang");
    if (saved === "en" || saved === "bn") setLangState(saved);
    setMounted(true);
  }, []);

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem("techfordev-lang", newLang);
  }, []);

  const t = useCallback(
    (key) => translations[lang]?.[key] || translations.en[key] || key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
