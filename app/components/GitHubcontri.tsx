"use client";
import React, { useEffect, useState, useMemo, useCallback, useSyncExternalStore } from 'react';
import { GitHubCalendar, type Activity } from 'react-github-calendar';
import { useTheme } from 'next-themes';

// Returns false on the server and on the very first client render, then true
// after hydration — without ever calling setState synchronously inside an
// effect (which is what triggered the "cascading renders" warning). The
// subscribe function is a no-op since this value never changes after mount.
const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

interface GitHubcontriProps {
  username?: string;
  months?: number; // how many recent months to display, defaults to 8
}

// Static theme config — doesn't depend on props/state, so define once
// outside the component instead of recreating it on every render.
const EXPLICIT_THEME = {
  light: ['#e4e4e7', '#d4d4d8', '#a1a1aa', '#52525b', '#18181b'], // zinc-100 to zinc-900
  dark: ['#27272a', '#3f3f46', '#71717a', '#a1a1aa', '#f4f4f5'],  // zinc-800 to zinc-100
};

const GitHubcontri = ({ username = 'ayushxpundir', months = 8 }: GitHubcontriProps) => {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const [fontSize, setFontSize] = useState(15);

  // Use matchMedia instead of a raw resize listener: it only fires when the
  // breakpoint is actually crossed, instead of on every pixel of resizing.
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const applySize = () => setFontSize(mql.matches ? 11 : 15);

    applySize(); // set initial size
    mql.addEventListener('change', applySize);
    return () => mql.removeEventListener('change', applySize);
  }, []);

  // Only keep contribution days from the last `months` months (real calendar
  // dates straight from GitHub's data, so day counts per month stay accurate)
  const cutoffDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - months);
    d.setDate(1); // snap to the 1st so the earliest month isn't cut mid-month
    return d;
  }, [months]);

  // Memoized so GitHubCalendar doesn't see a new function reference (and
  // potentially redo work) on every render.
  const transformData = useCallback(
    (contributions: Activity[]) =>
      contributions.filter((day) => new Date(day.date) >= cutoffDate),
    [cutoffDate]
  );

  // Prevent hydration mismatch by rendering a placeholder until mounted on client
  if (!mounted) {
    return (
      <div className="flex flex-col gap-4 p-5 pt-0 text-zinc-800 dark:text-zinc-200">
        <div className="flex items-center justify-between">
          <h2 className="font-pixel text-base">GitHub Contributions</h2>
        </div>
        <div className="w-full h-40 animate-pulse bg-zinc-100 dark:bg-zinc-800/50" />
      </div>
    );
  }

  const currentColorScheme = resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <div className="flex flex-col gap-4 p-5 text-zinc-800 dark:text-zinc-200">
      {/* Header with Title */}
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-base text-zinc-600 dark:text-zinc-400">
          GitHub Contributions
        </h2>
      </div>

      {/* Contribution Heatmap Calendar */}
      <div className="w-full overflow-x-auto [&_rect]:stroke-none! [&_rect]:stroke-0! [&_rect]:outline-none!">
        <GitHubCalendar
          username={username}
          colorScheme={currentColorScheme}
          theme={EXPLICIT_THEME}
          blockSize={15}
          blockMargin={4}
          blockRadius={3}
          fontSize={fontSize}
          transformData={transformData}
          style={{
            color: resolvedTheme === 'dark' ? '#a1a1aa' : '#52525b',
          }}
        />
      </div>
    </div>
  );
};

export default GitHubcontri;