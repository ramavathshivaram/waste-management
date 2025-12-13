import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  // Initial load (runs once)
  useEffect(() => {
    const savedTheme = localStorage.theme;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldUseDark =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    setIsDarkMode(shouldUseDark);
    applyTheme(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      applyTheme(!prev);
      return !prev;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
};

export default DarkMode;
