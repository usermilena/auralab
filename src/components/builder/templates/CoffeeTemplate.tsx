import { Bike, Clock, Coffee, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { CupArt } from "@/components/ui/illustrations";
import { cn } from "@/lib/cn";
import type { TemplateProps } from "./types";
import { PvButton, PvHeading, PvLogo, PvNav } from "./parts";

/** Café: atmospheric hero, a printed-menu style list and an info strip. */
export function CoffeeTemplate({ name, style, color, copy }: TemplateProps) {
  const t = useTranslations("builder.types.coffee");
  const bold = style === "bold";
  const centered = style === "classic";

  const status = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-(--p-btn-r) px-2.5 py-1 text-[0.625rem] font-medium",
        bold ? "bg-(--brand-contrast)/15 text-(--brand-contrast)" : "bg-(--p-bg) text-(--p-fg)",
      )}
    >
      <span className="size-1.5 rounded-full bg-[#3fbf6f]" />
      {t("status")}
    </span>
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-4 px-4 py-3 @md:px-6 @md:py-4">
        <PvLogo name={name} icon={style === "classic" ? undefined : Coffee} />
        <PvNav items={copy.nav} />
        <PvButton variant="outline">{t("order")}</PvButton>
      </div>

      <div className="px-4 @md:px-6">
        <div
          className={cn(
            "relative overflow-hidden rounded-(--p-r)",
            bold ? "bg-(--brand) text-(--brand-contrast)" : "bg-(--p-surface) text-(--p-fg)",
          )}
        >
          {centered ? (
            <div className="flex flex-col items-center px-6 pt-7 text-center @md:pt-9">
              {status}
              <PvHeading className="mt-3 max-w-[18ch] [--s:1.6rem] @md:[--s:2.1rem]">{copy.heading}</PvHeading>
              <p className="mt-3 max-w-[34ch] text-[0.75rem] leading-relaxed text-(--p-muted)">{copy.description}</p>
              <div className="mt-5 flex items-center gap-3">
                <PvButton>{copy.cta}</PvButton>
                <PvButton variant="outline">{t("secondaryCta")}</PvButton>
              </div>
              <CupArt accent={color} className="mt-3 -mb-3 w-full max-w-[12rem]" />
            </div>
          ) : (
            <div className="grid items-center @md:grid-cols-[1.15fr_1fr]">
              <div className="px-5 pt-6 pb-2 @md:py-9 @md:pl-7">
                {status}
                <PvHeading className="mt-3 [--s:1.6rem] @md:[--s:2.2rem]">{copy.heading}</PvHeading>
                <p className={cn("mt-3 max-w-[30ch] text-[0.75rem] leading-relaxed", bold ? "opacity-75" : "text-(--p-muted)")}>
                  {copy.description}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <PvButton variant={bold ? "inverse" : "solid"} arrow>
                    {copy.cta}
                  </PvButton>
                </div>
              </div>
              <div className="relative flex justify-center px-6 pb-3 @md:px-2">
                <span
                  className={cn(
                    "absolute top-[6%] right-[12%] bottom-[10%] left-[12%] rounded-full",
                    bold ? "bg-(--brand-contrast) opacity-10" : "bg-(--p-bg) opacity-60",
                  )}
                />
                <CupArt accent={color} className="relative w-full max-w-[13rem]" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pt-5 @md:px-6">
        <div className={cn("flex items-center gap-3", centered && "justify-center")}>
          {centered && <span className="h-px w-8 bg-(--p-line-strong)" />}
          <PvHeading className="text-(--p-fg) [--s:1.05rem]">{copy.sectionTitle}</PvHeading>
          <span className={cn("h-px flex-1 bg-(--p-line)", centered && "w-8 flex-none bg-(--p-line-strong)")} />
        </div>
        <ul className="mt-2 grid gap-x-8 @lg:grid-cols-2">
          {copy.items.map(({ id, title, meta }) => (
            <li key={id} className="flex items-baseline gap-2 py-2">
              <span className="text-[0.75rem] font-medium text-(--p-fg)">{title}</span>
              <span aria-hidden="true" className="h-px flex-1 translate-y-[-3px] border-b border-dotted border-(--p-line-strong)" />
              <span className="text-[0.75rem] text-(--brand-ink) tabular-nums">{meta}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mx-4 mt-3 mb-5 grid grid-cols-1 gap-2 border-t border-(--p-line) pt-4 text-[0.6875rem] text-(--p-muted) @md:mx-6 @md:mb-6 @md:grid-cols-3">
        {[
          { icon: MapPin, text: t("address") },
          { icon: Clock, text: t("hours") },
          { icon: Bike, text: t("delivery") },
        ].map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2">
            <Icon className="size-3.5 shrink-0 text-(--brand-ink)" strokeWidth={1.8} aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
