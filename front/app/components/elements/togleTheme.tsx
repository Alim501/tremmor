import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Иконки из Heroicons
import { useSwitchTheme } from "~/hooks/useSwitchTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useSwitchTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 transition-colors"
    >
      {theme === "dark" ? (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-900" />
      )}
    </button>
  );
}
