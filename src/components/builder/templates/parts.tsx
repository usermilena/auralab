import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared atoms for the preview templates. Sizes are tuned for a ~640px frame. */

export function PvHeading({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  /** Set the base size with `[--s:…]`; the style's scale is applied on top. */
  className?: string;
  as?: "p" | "span";
}) {
  return (
    <Tag className={cn("pv-head text-[calc(var(--s,1.5rem)*var(--p-head-scale))] text-balance", className)}>
      {children}
    </Tag>
  );
}

export function PvButton({
  children,
  variant = "solid",
  arrow = false,
  className,
}: {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost" | "inverse";
  arrow?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-(--p-btn-r) px-4 py-2 text-[0.6875rem] font-medium whitespace-nowrap [letter-spacing:var(--p-btn-track)] [text-transform:var(--p-btn-case)] @md:text-[0.75rem]",
        variant === "solid" && "bg-(--brand) text-(--brand-contrast) shadow-[0_8px_20px_-12px_var(--brand)]",
        variant === "outline" && "border border-(--p-line-strong) text-(--p-fg)",
        variant === "ghost" && "px-0 text-(--p-fg) underline decoration-(--p-line-strong) underline-offset-4",
        variant === "inverse" && "bg-(--brand-contrast) text-(--brand)",
        className,
      )}
    >
      {children}
      {arrow && <ArrowUpRight className="size-3.5" aria-hidden="true" />}
    </span>
  );
}

export function PvLogo({ name, icon: Icon, className }: { name: string; icon?: LucideIcon; className?: string }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2", className)}>
      {Icon && (
        <span
          aria-hidden="true"
          className="grid size-6 shrink-0 place-items-center rounded-(--p-r-sm) bg-(--brand) text-(--brand-contrast)"
        >
          <Icon className="size-3.5" strokeWidth={2} />
        </span>
      )}
      <span className="pv-head truncate text-[calc(1rem*var(--p-head-scale))] leading-none text-(--p-fg)">{name}</span>
    </span>
  );
}

export function PvNav({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("hidden items-center gap-4 text-[0.75rem] text-(--p-muted) @lg:flex", className)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function PvEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[0.625rem] font-semibold tracking-[0.14em] text-(--brand-ink) uppercase", className)}>
      {children}
    </p>
  );
}
