"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowIcon, buttonClasses } from "@/components/ui/Button";

type NavLink = { href: string; label: string };

type MobileMenuProps = {
  links: NavLink[];
  cta: NavLink;
  labels: { open: string; close: string; nav: string };
  /** Slot for the language switcher (rendered on the server). */
  children: ReactNode;
};

export function MobileMenu({ links, cta, labels, children }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 48rem)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-10 inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-white/60 text-foreground transition-colors hover:bg-white"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={panelId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            // Absolute, not fixed: the pill's backdrop-filter makes it the containing block.
            className="absolute inset-x-0 top-full mt-2 h-[calc(100dvh-var(--header-height)-1.25rem)] overflow-y-auto rounded-3xl border border-line bg-background shadow-[0_8px_30px_-12px_rgb(17_17_17/0.18)]"
          >
            <div className="flex h-full flex-col gap-8 px-5 pt-4 pb-6">
              <nav aria-label={labels.nav}>
                <ul className="flex flex-col">
                  {links.map((link) => (
                    <li key={link.href} className="border-b border-line">
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-5 text-2xl font-medium tracking-tight"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              {children}
              <a
                href={cta.href}
                onClick={() => setOpen(false)}
                className={buttonClasses({ size: "lg", className: "mt-auto w-full" })}
              >
                {cta.label}
                <ArrowIcon />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
