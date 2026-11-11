"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Sticky floating "pill" header: a light translucent capsule over the hero so the
 * aura shows through, getting a denser frosted background and shadow once scrolled.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header data-scrolled={scrolled} className="sticky top-0 z-50 pt-3">
      <div className="container-page">
        <div
          className={cn(
            "relative rounded-full border backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300",
            scrolled
              ? "border-line bg-background/80 shadow-[0_8px_30px_-12px_rgb(17_17_17/0.18)] supports-[backdrop-filter]:bg-background/65"
              : "border-line bg-white/40",
          )}
        >
          {children}
        </div>
      </div>
    </header>
  );
}
