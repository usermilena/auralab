import { cn } from "@/lib/cn";

/**
 * Atmospheric mint/turquoise aura. Pure CSS: layered radial gradients with
 * slow, GPU-friendly transform animations (disabled for reduced motion).
 */
export function HeroAura({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none select-none", className)}>
      <div className="relative size-full">
        {/* Soft outer bloom */}
        <div className="animate-aura-c absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgb(181_245_176/0.55)_0%,rgb(221_244_230/0.35)_40%,transparent_68%)] blur-3xl will-change-transform" />
        {/* Turquoise body */}
        <div className="animate-aura-b absolute inset-[12%] translate-x-[8%] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgb(111_227_196/0.8)_0%,rgb(111_227_196/0.35)_38%,transparent_66%)] blur-2xl will-change-transform" />
        {/* Bright mint core */}
        <div className="animate-aura-a absolute inset-[24%] -translate-x-[6%] rounded-full bg-[radial-gradient(circle_at_45%_45%,#52e8a8_0%,rgb(82_232_168/0.6)_28%,rgb(82_232_168/0.1)_55%,transparent_70%)] blur-xl will-change-transform" />
        {/* Thin orbit line with a single point */}
        <div className="animate-orbit absolute hidden sm:block inset-[14%] translate-x-[24%] rounded-full border border-primary/15">
          <span className="absolute top-1/2 -left-[4px] size-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_4px_rgb(248_250_248)]" />
        </div>
      </div>
    </div>
  );
}
