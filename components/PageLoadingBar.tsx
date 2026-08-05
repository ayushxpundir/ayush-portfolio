"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Resolves once all pending images AND web fonts on the page are loaded or timed out.
 */
function waitForPageAssets(signal: AbortSignal): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();

  // 1. Image loading promise
  const imgs = Array.from(document.images);
  const pendingImgs = imgs.filter((img) => !img.complete);

  const imagePromise =
    pendingImgs.length === 0
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          let remaining = pendingImgs.length;
          const done = () => {
            remaining -= 1;
            if (remaining <= 0) resolve();
          };

          pendingImgs.forEach((img) => {
            img.addEventListener("load", done, { once: true, signal });
            img.addEventListener("error", done, { once: true, signal });
          });
        });

  // 2. Web fonts promise
  const fontPromise =
    typeof document.fonts !== "undefined"
      ? document.fonts.ready
      : Promise.resolve();

  // 3. Safety timeout (5s max)
  const timeoutPromise = new Promise<void>((resolve) => {
    const timer = setTimeout(resolve, 5000);
    signal.addEventListener("abort", () => clearTimeout(timer), { once: true });
  });

  return Promise.race([
    Promise.all([imagePromise, fontPromise]).then(() => {}),
    timeoutPromise,
  ]);
}

function BarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const trickleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const showDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  const clearAllTimers = useCallback(() => {
    if (showDelayRef.current) clearTimeout(showDelayRef.current);
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    if (trickleIntervalRef.current) clearInterval(trickleIntervalRef.current);
  }, []);

  const start = useCallback(() => {
    clearAllTimers();

    if (typeof document !== "undefined") {
      document.documentElement.classList.add("loading-route-active");
    }

    // 120ms threshold to prevent flash of loading bar on fast transitions
    showDelayRef.current = setTimeout(() => {
      setIsVisible(true);
      setProgress((prev) => (prev > 0 ? prev : 15));

      trickleIntervalRef.current = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + (90 - prev) * 0.15 : prev));
      }, 150);
    }, 120);
  }, [clearAllTimers]);

  const finish = useCallback(() => {
    clearAllTimers();

    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("loading-route-active");
    }

    setProgress(100);

    finishTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      setProgress(0);
    }, 200);
  }, [clearAllTimers]);

  // Handle document initial load state
  useEffect(() => {
    if (document.readyState === "complete") {
      finish();
    } else {
      start();
      const onLoad = () => finish();
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
  }, [start, finish]);

  // Global click delegate for intercepting cross-route navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      if (
        !href ||
        targetAttr === "_blank" ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      try {
        const targetUrl = new URL(anchor.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Skip internal/same-page links
        if (
          targetUrl.origin === currentUrl.origin &&
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search
        ) {
          return;
        }

        // Internal cross-page link detected
        if (targetUrl.origin === currentUrl.origin) {
          start();
        }
      } catch {
        // Invalid URL fallback
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [start]);

  // Complete loading cycle when route/params mutate
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const abortController = new AbortController();

    waitForPageAssets(abortController.signal).then(() => {
      if (!abortController.signal.aborted) {
        finish();
      }
    });

    return () => {
      abortController.abort();
    };
  }, [pathname, searchParams, finish]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("loading-route-active");
      }
    };
  }, [clearAllTimers]);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[99999] h-[2px] w-full bg-transparent"
    >
      <div
        className="h-full bg-zinc-900 shadow-[0_0_8px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out dark:bg-zinc-100"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}

export default function PageLoadingBar() {
  return (
    <Suspense fallback={null}>
      <BarInner />
    </Suspense>
  );
}