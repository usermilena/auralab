import { cn } from "@/lib/cn";

/**
 * Atmospheric pastel aura (WebGL fallback). Pure CSS: layered radial gradients with
 * slow, GPU-friendly transform animations (disabled for reduced motion).
 */
export function HeroAura({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none select-none", className)}>
      <div className="relative size-full">
        {/* Soft outer bloom */}
        <div className="animate-aura-c absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgb(220_200_251/0.55)_0%,rgb(230_225_250/0.35)_40%,transparent_68%)] blur-3xl will-change-transform" />
        {/* Turquoise body */}
        <div className="animate-aura-b absolute inset-[12%] translate-x-[8%] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgb(185_200_255/0.8)_0%,rgb(185_200_255/0.35)_38%,transparent_66%)] blur-2xl will-change-transform" />
        {/* Bright mint core */}
        <div className="animate-aura-a absolute inset-[24%] -translate-x-[6%] rounded-full bg-[radial-gradient(circle_at_45%_45%,#ffd6c2_0%,rgb(255_214_194/0.6)_28%,rgb(255_214_194/0.1)_55%,transparent_70%)] blur-xl will-change-transform" />
        {/* Thin orbit line with a single point */}
        <div className="animate-orbit absolute hidden sm:block inset-[14%] translate-x-[24%] rounded-full border border-foreground/10">
          <span className="absolute top-1/2 -left-[4px] size-2 -translate-y-1/2 rounded-full bg-foreground shadow-[0_0_0_4px_var(--background)]" />
        </div>
      </div>
    </div>
  );
}
