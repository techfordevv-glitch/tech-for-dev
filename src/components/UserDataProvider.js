"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTheme } from "./ThemeProvider";

const defaultPrefs = {
  emailDigest: "weekly",
  notifications: true,
  pushNotifications: false,
  darkModeSchedule: false,
  homepageWidgets: [
    "news",
    "ai-tools",
    "articles",
    "projects",
    "hn",
    "reddit",
    "jobs",
    "videos",
  ],
  contentSources: {
    gnews: true,
    devto: true,
    github: true,
    hackernews: true,
    reddit: true,
    stackoverflow: true,
    remotive: true,
    itunes: true,
    invidious: true,
  },
};

const UserDataContext = createContext({
  preferences: defaultPrefs,
  collections: [],
  readQueue: [],
  alerts: [],
  updatePreferences: () => {},
  toggleSource: () => {},
  addCollection: () => {},
  removeCollection: () => {},
  addToCollection: () => {},
  removeFromCollection: () => {},
  addToQueue: () => {},
  removeFromQueue: () => {},
  addAlert: () => {},
  removeAlert: () => {},
  exportData: () => "",
  importData: () => false,
});

export function useUserData() {
  return useContext(UserDataContext);
}

export default function UserDataProvider({ children }) {
  const { theme, toggleTheme } = useTheme();
  const [preferences, setPreferences] = useState(defaultPrefs);
  const [collections, setCollections] = useState([]);
  const [readQueue, setReadQueue] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [mounted, setMounted] = useState(false);

  // ── Dark-mode auto-schedule ──────────────────────────────────────────────
  // When enabled: 7 AM–7 PM → light mode; outside that → dark mode
  useEffect(() => {
    if (!preferences.darkModeSchedule) return;
    const applySchedule = () => {
      const hour = new Date().getHours();
      const shouldBeLight = hour >= 7 && hour < 19;
      if (shouldBeLight && theme === "dark") toggleTheme();
      if (!shouldBeLight && theme === "light") toggleTheme();
    };
    applySchedule();
    const interval = setInterval(applySchedule, 60_000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferences.darkModeSchedule]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("techfordev-userdata");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.preferences) {
          setPreferences({
            ...defaultPrefs,
            ...parsed.preferences,
            contentSources: {
              ...defaultPrefs.contentSources,
              ...(parsed.preferences?.contentSources || {}),
            },
          });
        }
        if (Array.isArray(parsed.collections)) setCollections(parsed.collections);
        if (Array.isArray(parsed.readQueue)) setReadQueue(parsed.readQueue);
        if (Array.isArray(parsed.alerts)) setAlerts(parsed.alerts);
      }
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(
      "techfordev-userdata",
      JSON.stringify({
        preferences,
        collections,
        readQueue,
        alerts,
      })
    );
  }, [preferences, collections, readQueue, alerts, mounted]);

  const updatePreferences = useCallback((patch) => {
    setPreferences((prev) => ({ ...prev, ...patch }));
  }, []);

  const toggleSource = useCallback((sourceKey) => {
    setPreferences((prev) => ({
      ...prev,
      contentSources: {
        ...prev.contentSources,
        [sourceKey]: !prev.contentSources[sourceKey],
      },
    }));
  }, []);

  const addCollection = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCollections((prev) => {
      if (prev.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) return prev;
      return [
        {
          id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
          name: trimmed,
          items: [],
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });
  }, []);

  const removeCollection = useCallback((collectionId) => {
    setCollections((prev) => prev.filter((c) => c.id !== collectionId));
  }, []);

  const addToCollection = useCallback((collectionId, item) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id !== collectionId) return c;
        const key = `${item.type}-${item.id || item.url || item.title}`;
        const exists = c.items.some((i) => `${i.type}-${i.id || i.url || i.title}` === key);
        if (exists) return c;
        return {
          ...c,
          items: [{ ...item, addedAt: new Date().toISOString() }, ...c.items],
        };
      })
    );
  }, []);

  const removeFromCollection = useCallback((collectionId, itemKey) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id !== collectionId) return c;
        return {
          ...c,
          items: c.items.filter((i) => `${i.type}-${i.id || i.url || i.title}` !== itemKey),
        };
      })
    );
  }, []);

  const addToQueue = useCallback((item) => {
    setReadQueue((prev) => {
      const key = `${item.type}-${item.id || item.url || item.title}`;
      const exists = prev.some((q) => `${q.type}-${q.id || q.url || q.title}` === key);
      if (exists) return prev;
      return [{ ...item, queuedAt: new Date().toISOString(), done: false }, ...prev];
    });
  }, []);

  const removeFromQueue = useCallback((itemKey) => {
    setReadQueue((prev) => prev.filter((q) => `${q.type}-${q.id || q.url || q.title}` !== itemKey));
  }, []);

  const addAlert = useCallback((keyword) => {
    const normalized = keyword.trim().toLowerCase();
    if (!normalized) return;
    setAlerts((prev) => {
      if (prev.includes(normalized)) return prev;
      return [normalized, ...prev];
    });
  }, []);

  const removeAlert = useCallback((keyword) => {
    setAlerts((prev) => prev.filter((k) => k !== keyword));
  }, []);

  const exportData = useCallback(() => {
    return JSON.stringify(
      {
        preferences,
        collections,
        readQueue,
        alerts,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  }, [preferences, collections, readQueue, alerts]);

  const importData = useCallback((jsonText) => {
    try {
      const parsed = JSON.parse(jsonText);
      setPreferences({
        ...defaultPrefs,
        ...(parsed.preferences || {}),
        contentSources: {
          ...defaultPrefs.contentSources,
          ...(parsed.preferences?.contentSources || {}),
        },
      });
      setCollections(Array.isArray(parsed.collections) ? parsed.collections : []);
      setReadQueue(Array.isArray(parsed.readQueue) ? parsed.readQueue : []);
      setAlerts(Array.isArray(parsed.alerts) ? parsed.alerts : []);
      return true;
    } catch {
      return false;
    }
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      collections,
      readQueue,
      alerts,
      updatePreferences,
      toggleSource,
      addCollection,
      removeCollection,
      addToCollection,
      removeFromCollection,
      addToQueue,
      removeFromQueue,
      addAlert,
      removeAlert,
      exportData,
      importData,
    }),
    [
      preferences,
      collections,
      readQueue,
      alerts,
      updatePreferences,
      toggleSource,
      addCollection,
      removeCollection,
      addToCollection,
      removeFromCollection,
      addToQueue,
      removeFromQueue,
      addAlert,
      removeAlert,
      exportData,
      importData,
    ]
  );

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}
