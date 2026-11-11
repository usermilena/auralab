import { ArrowUpRight } from "lucide-react";
import { ArchArt, CupArt, ShapesArt, VaseArt } from "@/components/ui/illustrations";
import type { BusinessTemplate } from "@/config/business-templates";
import { cn } from "@/lib/cn";
import type { TemplateCopy } from "./template-copy";

type PreviewHeroProps = {
  copy: TemplateCopy;
  hero: BusinessTemplate["hero"];
  color: string;
};

const arts = { vase: VaseArt, cup: CupArt, arch: ArchArt, shapes: ShapesArt } as const;

export function PreviewHero({ copy, hero, color }: PreviewHeroProps) {
  const Art = arts[hero.art];
  const reversed = hero.layout === "reversed";

  return (
    <div className="mt-2 overflow-hidden rounded-2xl bg-[linear-gradient(120deg,var(--preview-surface)_30%,color-mix(in_oklab,var(--brand)_12%,var(--preview-surface)))] @md:rounded-[1.25rem]">
      <div className="grid items-center @md:grid-cols-2">
        <div
          className={cn(
            "px-5 pt-6 pb-2 @md:py-8 @md:pr-2 @md:pl-7 @2xl:py-10 @2xl:pl-9",
            reversed && "@md:order-2 @md:pr-7 @md:pl-2",
          )}
        >
          <p className="max-w-[16ch] text-[1.375rem] leading-[1.1] font-semibold tracking-[-0.03em] text-[#1b1a18] @md:text-[1.5rem] @2xl:text-[1.875rem]">
            {copy.heading}
          </p>
          <p className="mt-3 max-w-[26ch] text-[0.8125rem] leading-relaxed text-black/55 @2xl:text-sm">
            {copy.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-(--brand) px-4 py-2 text-[0.75rem] font-medium text-(--brand-contrast) shadow-[0_8px_20px_-10px_var(--brand)]">
            {copy.cta}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>
        </div>
        <div className={cn("flex items-end justify-center px-6 pt-2 @md:px-0 @md:pt-6", reversed && "@md:order-1")}>
          <Art accent={color} className="h-auto w-full max-w-[15rem] @md:max-w-[17rem]" />
        </div>
      </div>
    </div>
  );
}
