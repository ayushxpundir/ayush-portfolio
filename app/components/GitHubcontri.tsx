"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from 'next-themes';

interface GitHubcontriProps {
  months?: number; // how many recent months to display, defaults to 8
}

const GitHubcontri = ({ months = 8 }: GitHubcontriProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [fontSize, setFontSize] = useState(15)

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // 768px matches Tailwind's 'md' breakpoint
      setFontSize(window.innerWidth < 768 ? 11 : 15)
    }
    handleResize() // Set initial size
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const explicitTheme = {
    light: ['#e4e4e7', '#d4d4d8', '#a1a1aa', '#52525b', '#18181b'], // zinc-100 to zinc-900
    dark: ['#27272a', '#3f3f46', '#71717a', '#a1a1aa', '#f4f4f5'],  // zinc-800 to zinc-100
  };

  // Only keep contribution days from the last `months` months (real calendar
  // dates straight from GitHub's data, so day counts per month stay accurate)
  const cutoffDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - months);
    d.setDate(1); // snap to the 1st so the earliest month isn't cut mid-month
    return d;
  }, [months]);

  // Prevent hydration mismatch by rendering a placeholder until mounted on client
  if (!mounted) {
    return (
      <div className="flex flex-col gap-4 p-5 pt-0 text-zinc-800 dark:text-zinc-200">
        <div className="flex items-center justify-between">
          <h2 className="font-pixel text-base ">
            GitHub Contributions
          </h2>
        </div>
        <div className="w-full h-160px animate-pulse bg-zinc-100 dark:bg-zinc-800/50" />
      </div>
    );
  }

  const currentColorScheme = resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <div className="flex flex-col gap-4 p-5 text-zinc-800 dark:text-zinc-200">
      {/* Header with Title */}
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-base text-zinc-600 dark:text-zinc-400 w-full">
          GitHub Contributions
        </h2>
      </div>
      {/* Contribution Heatmap Calendar */}
      <div className="w-full overflow-x-auto [&_rect]:stroke-none! [&_rect]:stroke-width:0! [&_rect]:outline-none!">
        <GitHubCalendar
          username="ayushxpundir"
          colorScheme={currentColorScheme}
          theme={explicitTheme}
          blockSize={15}
          blockMargin={4}
          blockRadius={3}
          fontSize={fontSize}
          transformData={(contributions) =>
            contributions.filter((day) => new Date(day.date) >= cutoffDate)
          }
          style={{
            color: resolvedTheme === 'dark' ? '#a1a1aa' : '#52525b',
          }}
        />
      </div>
    </div>
  );
};

export default GitHubcontri;