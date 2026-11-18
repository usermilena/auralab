"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/theme/script";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

/**
 * Light/dark switch. The current theme is already on <html> (set by the inline
 * script), so both icons render and CSS shows the right one — no hydration
 * mismatch and no flash.
 */
export function ThemeToggle({ labels, className }: { labels: { toDark: string; toLight: string }; className?: string }) {
  const toggle = () => {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    // Swap colours instantly rather than animating every transition at once.
    const root = document.documentElement;
    root.classList.add("[&_*]:!transition-none");
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("[&_*]:!transition-none")));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground",
        className,
      )}
    >
      <span className="sr-only dark:hidden">{labels.toDark}</span>
      <span className="sr-only hidden dark:inline">{labels.toLight}</span>
      <Moon className="size-[1.125rem] dark:hidden" strokeWidth={1.7} aria-hidden="true" />
      <Sun className="hidden size-[1.125rem] dark:block" strokeWidth={1.7} aria-hidden="true" />
    </button>
  );
}
