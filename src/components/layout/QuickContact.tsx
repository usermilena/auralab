"use client";

import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, MessageCircleMore, PenLine, Send, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type QuickContactProps = {
  telegramHref: string;
  whatsappHref: string;
  formHref: string;
  /** Id of the contact section; the button hides while it is on screen. */
  contactSectionId: string;
  labels: { open: string; close: string; telegram: string; whatsapp: string; form: string };
};

/**
 * Mobile-only floating "write to us" button. Always visible except over the
 * contact form, and expands into quick links. Sits above the cookie notice
 * while that is open (`--cookie-notice-h`, set by `CookieNotice`).
 */
export function QuickContact({
  telegramHref,
  whatsappHref,
  formHref,
  contactSectionId,
  labels,
}: QuickContactProps) {
  const [open, setOpen] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    const section = document.getElementById(contactSectionId);
    const observer = section
      ? new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), {
          threshold: 0.15,
        })
      : null;
    if (section) observer?.observe(section);

    return () => observer?.disconnect();
  }, [contactSectionId]);

  const shown = !contactVisible;
  // The menu collapses whenever the button itself hides.
  const expanded = open && shown;

  useEffect(() => {
    if (!expanded) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  const items: { href: string; label: string; icon: ReactNode; external: boolean }[] = [
    { href: telegramHref, label: labels.telegram, icon: <Send className="size-[1.05rem]" />, external: true },
    { href: whatsappHref, label: labels.whatsapp, icon: <MessageCircle className="size-[1.1rem]" />, external: true },
    { href: formHref, label: labels.form, icon: <PenLine className="size-[1.05rem]" />, external: false },
  ];

  return (
    <div
      ref={rootRef}
      className={cn(
        "fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom)+var(--cookie-notice-h,0px))] z-40 flex flex-col items-end gap-3 transition-[opacity,transform,bottom] duration-500 ease-out md:hidden",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
      inert={!shown}
    >
      <AnimatePresence>
        {expanded && (
          <motion.ul
            id={menuId}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex origin-bottom-right flex-col gap-1 rounded-3xl border border-line bg-background/90 p-1.5 shadow-float backdrop-blur-xl"
          >
            {items.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex h-12 items-center gap-3 rounded-2xl pr-5 pl-3 text-[0.9375rem] font-medium text-foreground transition-colors active:bg-soft"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-8 place-items-center rounded-full bg-soft text-foreground"
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={expanded}
        aria-controls={menuId}
        aria-label={expanded ? labels.close : labels.open}
        onClick={() => setOpen(!expanded)}
        className="grid size-14 place-items-center rounded-full bg-primary text-on-primary shadow-[0_12px_32px_-10px_rgb(var(--shadow-rgb)/0.55)] transition-transform duration-200 active:scale-95"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={expanded ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="grid place-items-center"
          >
            {expanded ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <MessageCircleMore className="size-6" aria-hidden="true" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
