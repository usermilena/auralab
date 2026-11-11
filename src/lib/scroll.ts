/** Smoothly scrolls to a section, respecting reduced-motion preferences. */
export function scrollToSection(id: string, focusSelector?: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  if (focusSelector) {
    const el = target.querySelector<HTMLElement>(focusSelector);
    el?.focus({ preventScroll: true });
  }
  history.replaceState(null, "", `#${id}`);
}
