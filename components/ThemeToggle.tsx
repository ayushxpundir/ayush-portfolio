"use client";

import { useTheme } from "next-themes";
import MoonIcon from '@iconify-react/pixelarticons/moon';
import SunIcon from '@iconify-react/pixelarticons/sun';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="cursor-pointer"
    >
      <MoonIcon className="hidden dark:block w-5 h-auto text-zinc-400" />
      <SunIcon className="block dark:hidden w-5 h-auto text-zinc-600" />
    </button>
  );
}