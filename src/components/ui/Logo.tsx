import { cn } from "@/lib/cn";

/**
 * Auralab wordmark. Kept isolated so it can be swapped for an SVG logo
 * without touching the header or footer.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-[1.375rem] leading-none font-semibold tracking-[-0.04em]",
        className,
      )}
    >
      auralab
    </span>
  );
}
