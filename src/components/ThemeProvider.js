"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {}, cycleTheme: () => {}, setTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

const THEMES = ["dark", "light", "sepia", "oled"];

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("techfordev-theme");
    if (THEMES.includes(saved)) setThemeState(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme === "oled" ? "dark" : theme === "sepia" ? "light" : theme);
    localStorage.setItem("techfordev-theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  const cycleTheme = () => setThemeState((prev) => THEMES[(THEMES.indexOf(prev) + 1) % THEMES.length]);
  const setTheme = (t) => { if (THEMES.includes(t)) setThemeState(t); };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, cycleTheme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

