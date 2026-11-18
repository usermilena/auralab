"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "auralab-cookie-notice";
const GAP_PX = 12;

/**
 * Cookie notice. The site only uses functional storage (language, theme), so
 * this informs rather than asks for consent; if analytics such as Yandex
 * Metrica are added later, it must become a real opt-in before they load.
 *
 * While open it publishes its height as `--cookie-notice-h` so the mobile
 * quick-contact button can sit above it.
 */
export function CookieNotice() {
  const t = useTranslations("cookies");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    // Shown after mount only, so server and client HTML match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!seen) setOpen(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!open || !el) {
      root.style.removeProperty("--cookie-notice-h");
      return;
    }
    const observer = new ResizeObserver(() => {
      root.style.setProperty("--cookie-notice-h", `${el.offsetHeight + GAP_PX}px`);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--cookie-notice-h");
    };
  }, [open]);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="region"
          aria-label={t("label")}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-60 flex flex-col gap-3 rounded-3xl border border-line bg-background/90 p-4 shadow-float backdrop-blur-xl sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-md sm:flex-row sm:items-center sm:gap-5 sm:p-5"
        >
          <p className="text-[0.875rem] leading-relaxed text-foreground/80">
            {t.rich("text", {
              link: (chunks) => (
                <Link
                  href={siteConfig.privacyPolicyPath}
                  className="text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <button
            type="button"
            onClick={accept}
            className={buttonClasses({ size: "sm", className: "shrink-0 self-end sm:self-auto" })}
          >
            {t("accept")}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
