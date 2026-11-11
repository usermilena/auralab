import { ArrowIcon, buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { SlideData } from "./ServicesSlider";

type ServiceSlideProps = {
  slide: SlideData;
  conceptNote: string;
  ctaHref: string;
  onCtaClick: () => void;
};

export function ServiceSlide({ slide, conceptNote, ctaHref, onCtaClick }: ServiceSlideProps) {
  const dark = slide.tone === "dark";

  return (
    <div className="grid md:h-[30rem] md:grid-cols-2 lg:h-[33rem] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div className="flex min-h-[15.5rem] flex-col justify-center px-6 pt-9 pb-4 sm:px-10 md:min-h-0 md:py-12 md:pr-0 md:pl-12 lg:pl-14">
        <h3
          className={cn(
            "max-w-[17ch] text-[clamp(1.75rem,1.3rem+1.6vw,2.625rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance",
            dark ? "text-white" : "text-foreground",
          )}
        >
          {slide.title}
        </h3>
        <p
          className={cn(
            "mt-4 max-w-[30ch] text-base leading-relaxed md:mt-5 md:text-[1.0625rem]",
            dark ? "text-white/70" : "text-muted",
          )}
        >
          {slide.description}
        </p>
        <div className="mt-7 md:mt-9">
          <a
            href={ctaHref}
            onClick={onCtaClick}
            draggable={false}
            className={buttonClasses({
              variant: dark ? "ghost-light" : "outline",
              size: "md",
            })}
          >
            {slide.cta}
            <ArrowIcon />
          </a>
        </div>
      </div>

      <div className="relative h-[17rem] select-none sm:h-[22rem] md:h-auto" draggable={false}>
        {slide.visual}
        <span
          className={cn(
            "absolute top-4 right-4 rounded-full px-3 py-1 text-[0.6875rem] font-medium tracking-wide backdrop-blur-md md:top-6 md:right-6",
            dark ? "bg-white/10 text-white/70" : "bg-white/60 text-foreground/55",
          )}
        >
          {conceptNote}
        </span>
      </div>
    </div>
  );
}
