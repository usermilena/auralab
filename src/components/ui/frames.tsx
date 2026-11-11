import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Browser window chrome used for website mockups and the live preview. */
export function BrowserFrame({
  children,
  url,
  className,
  bodyClassName,
}: {
  children: ReactNode;
  url?: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "@container overflow-hidden rounded-[clamp(0.75rem,2cqw,1.25rem)] border border-black/[0.06] bg-white shadow-float",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-black/[0.05] bg-[#f4f5f3] px-[3%] py-[1.6%]">
        <div className="flex gap-[0.4em] text-[clamp(6px,1.1cqw,10px)]">
          <span className="size-[1em] rounded-full bg-[#ec6a5e]" />
          <span className="size-[1em] rounded-full bg-[#f4bf4f]" />
          <span className="size-[1em] rounded-full bg-[#61c554]" />
        </div>
        {url && (
          <div className="mx-auto flex min-w-0 max-w-[60%] flex-1 items-center justify-center truncate rounded-full bg-white/80 px-3 py-[0.3em] text-[clamp(8px,1.3cqw,12px)] text-black/45">
            {url}
          </div>
        )}
        {url && <span className="w-[3.4em]" />}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/** Minimal phone frame. Size is controlled by the parent (width). */
export function PhoneFrame({
  children,
  className,
  screenClassName,
}: {
  children: ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div className={cn("@container", className)}>
      <div className="relative aspect-[9/19] rounded-[16cqw] bg-[#121614] p-[3.2cqw] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.45)]">
        <div
          className={cn(
            "@container relative h-full overflow-hidden rounded-[13cqw] bg-white",
            screenClassName,
          )}
        >
          <span className="absolute top-[2.4cqw] left-1/2 z-10 h-[6cqw] w-[28cqw] -translate-x-1/2 rounded-full bg-[#121614]" />
          {children}
        </div>
      </div>
    </div>
  );
}
