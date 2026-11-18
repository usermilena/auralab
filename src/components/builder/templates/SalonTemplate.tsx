import { ArrowUpRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { ArchArt } from "@/components/ui/illustrations";
import { cn } from "@/lib/cn";
import type { TemplateProps } from "./types";
import { PvButton, PvHeading, PvLogo, PvNav } from "./parts";

const days = ["d1", "d2", "d3", "d4"] as const;
const slots = ["10:00", "12:30", "15:00", "17:30"];

/** Beauty salon: editorial arch imagery, an online booking widget and service cards. */
export function SalonTemplate({ name, style, color, copy }: TemplateProps) {
  const t = useTranslations("builder.types.salon");
  const bold = style === "bold";
  const classic = style === "classic";

  return (
    <div>
      {classic ? (
        <div className="flex flex-col items-center gap-2 border-b border-(--p-line) px-4 pt-4 pb-3">
          <PvLogo name={name} className="[&>span]:text-[calc(1.15rem*var(--p-head-scale))]" />
          <PvNav items={copy.nav} className="tracking-[0.12em] uppercase [font-size:0.625rem]" />
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4 px-4 py-3 @md:px-6 @md:py-4">
          <PvLogo name={name} />
          <PvNav items={copy.nav} />
          <PvButton>{copy.cta}</PvButton>
        </div>
      )}

      <div
        className={cn(
          "mx-4 mt-4 grid gap-4 @md:mx-6 @md:grid-cols-[0.9fr_1.1fr] @md:gap-6",
          bold && "rounded-(--p-r) bg-(--brand) p-4 text-(--brand-contrast) @md:p-5",
        )}
      >
        <div
          className={cn(
            "relative hidden overflow-hidden rounded-t-full @md:flex @md:items-end @md:justify-center",
            bold ? "bg-(--brand-contrast)/12" : "bg-(--p-surface)",
          )}
        >
          <ArchArt accent={color} className="w-[85%]" />
        </div>

        <div className="flex flex-col justify-center">
          <p className={cn("flex items-center gap-1 text-[0.6875rem]", bold ? "opacity-80" : "text-(--p-muted)")}>
            <Star className="size-3 fill-current text-[#f2b33d]" aria-hidden="true" />
            {t("rating")}
          </p>
          <PvHeading className={cn("mt-2 [--s:1.6rem] @md:[--s:2rem]", !bold && "text-(--p-fg)")}>{copy.heading}</PvHeading>
          <p className={cn("mt-2 text-[0.75rem] leading-relaxed", bold ? "opacity-75" : "text-(--p-muted)")}>
            {copy.description}
          </p>

          <div className="mt-4 rounded-(--p-r-sm) border border-(--p-line) bg-(--p-card) p-3 text-(--p-fg) shadow-[0_12px_30px_-18px_rgb(0_0_0/0.35)]">
            <div className="flex items-center justify-between">
              <p className="text-[0.6875rem] font-semibold">{t("bookingTitle")}</p>
              <p className="text-[0.625rem] text-(--p-muted)">{t("master")}</p>
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-1.5">
              {days.map((d, i) => (
                <span
                  key={d}
                  className={cn(
                    "rounded-(--p-r-sm) border py-1.5 text-center text-[0.625rem]",
                    i === 1
                      ? "border-(--brand) bg-(--brand) text-(--brand-contrast)"
                      : "border-(--p-line) text-(--p-fg)",
                  )}
                >
                  {t(`days.${d}`)}
                </span>
              ))}
            </div>
            <div className="mt-1.5 grid grid-cols-4 gap-1.5">
              {slots.map((slot, i) => (
                <span
                  key={slot}
                  className={cn(
                    "rounded-(--p-r-sm) py-1 text-center text-[0.625rem] tabular-nums",
                    i === 1 ? "bg-(--brand-soft) font-semibold text-(--brand-ink)" : "text-(--p-muted)",
                  )}
                >
                  {slot}
                </span>
              ))}
            </div>
            <PvButton className="mt-2.5 w-full">{t("book")}</PvButton>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 pb-5 @md:px-6 @md:pb-6">
        <PvHeading className={cn("text-(--p-fg) [--s:1.05rem]", classic && "text-center")}>{copy.sectionTitle}</PvHeading>
        <ul className="mt-3 grid grid-cols-2 gap-2 @lg:grid-cols-4">
          {copy.items.map(({ id, title, meta, icon: Icon }) => (
            <li
              key={id}
              className={cn(
                "flex flex-col gap-3 rounded-(--p-r-sm) p-3",
                classic ? "border border-(--p-line)" : "bg-(--p-surface)",
              )}
            >
              <span className="flex items-center justify-between">
                <Icon className="size-4 text-(--brand-ink)" strokeWidth={1.6} aria-hidden="true" />
                <ArrowUpRight className="size-3.5 text-(--p-muted)" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[0.75rem] font-medium text-(--p-fg)">{title}</span>
                <span className="block text-[0.625rem] text-(--p-muted)">{meta}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
