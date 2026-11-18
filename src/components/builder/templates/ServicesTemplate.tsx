import { LayoutGrid, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { ShapesArt } from "@/components/ui/illustrations";
import { cn } from "@/lib/cn";
import type { TemplateProps } from "./types";
import { PvButton, PvEyebrow, PvHeading, PvLogo, PvNav } from "./parts";

const stats = ["s1", "s2", "s3"] as const;
/** Fictional client wordmarks, rendered as text placeholders. */
const clients = ["Nordline", "KVADRAT", "polar.", "Atlas&Co"];

/** Professional services: corporate hero with key figures, client logos and process steps. */
export function ServicesTemplate({ name, style, color, copy }: TemplateProps) {
  const t = useTranslations("builder.types.services");
  const bold = style === "bold";
  const classic = style === "classic";

  const statRow = (
    <dl className={cn("grid grid-cols-3", classic ? "divide-x divide-(--p-line) border-y border-(--p-line)" : "gap-2")}>
      {stats.map((s) => (
        <div key={s} className={cn(classic ? "px-3 py-3 text-center" : "rounded-(--p-r-sm) p-3", bold && "bg-white/[0.06]")}>
          <dt className="sr-only">{t(`stats.${s}.label`)}</dt>
          <dd>
            <span className={cn("pv-head block text-[calc(1.15rem*var(--p-head-scale))] leading-none", bold ? "text-(--brand)" : "text-(--brand-ink)")}>
              {t(`stats.${s}.value`)}
            </span>
            <span className={cn("mt-1 block text-[0.625rem]", bold ? "text-white/55" : "text-(--p-muted)")}>
              {t(`stats.${s}.label`)}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-4 px-4 py-3 @md:px-6 @md:py-4">
        <PvLogo name={name} icon={classic ? undefined : LayoutGrid} />
        <PvNav items={copy.nav} />
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 text-[0.6875rem] text-(--p-fg) @2xl:flex">
            <Phone className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
            {t("phone")}
          </span>
          <PvButton variant={classic ? "outline" : "solid"}>{copy.cta}</PvButton>
        </div>
      </div>

      <div className="px-4 @md:px-6">
        {bold ? (
          <div className="overflow-hidden rounded-(--p-r) bg-[#0f1012] p-5 text-white @md:p-7">
            <div className="grid items-center gap-4 @md:grid-cols-[1.4fr_1fr]">
              <div>
                <PvHeading className="[--s:1.7rem] @md:[--s:2.3rem]">{copy.heading}</PvHeading>
                <p className="mt-3 max-w-[34ch] text-[0.75rem] leading-relaxed text-white/60">{copy.description}</p>
                <div className="mt-5">
                  <PvButton arrow>{copy.cta}</PvButton>
                </div>
              </div>
              <ShapesArt accent={color} className="hidden w-full max-w-[12rem] justify-self-end @md:block" />
            </div>
            <div className="mt-6">{statRow}</div>
          </div>
        ) : classic ? (
          <div className="pt-5 text-center">
            <PvEyebrow>{copy.sectionTitle}</PvEyebrow>
            <PvHeading className="mx-auto mt-3 max-w-[20ch] text-(--p-fg) [--s:1.7rem] @md:[--s:2.3rem]">{copy.heading}</PvHeading>
            <p className="mx-auto mt-3 max-w-[40ch] text-[0.75rem] leading-relaxed text-(--p-muted)">{copy.description}</p>
            <div className="mt-5 flex justify-center gap-3">
              <PvButton>{copy.cta}</PvButton>
              <PvButton variant="outline">{t("phone")}</PvButton>
            </div>
            <div className="mt-6">{statRow}</div>
          </div>
        ) : (
          <div className="grid items-center gap-4 overflow-hidden rounded-(--p-r) bg-(--p-surface) p-5 @md:grid-cols-[1.3fr_1fr] @md:p-7">
            <div>
              <PvHeading className="text-(--p-fg) [--s:1.6rem] @md:[--s:2.1rem]">{copy.heading}</PvHeading>
              <p className="mt-3 max-w-[32ch] text-[0.75rem] leading-relaxed text-(--p-muted)">{copy.description}</p>
              <div className="mt-5">
                <PvButton arrow>{copy.cta}</PvButton>
              </div>
            </div>
            <div className="hidden @md:block">
              <ShapesArt accent={color} className="mx-auto w-full max-w-[11rem]" />
            </div>
            <div className="@md:col-span-2">{statRow}</div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 pt-5 @md:px-6">
        <span className="text-[0.625rem] tracking-[0.12em] text-(--p-muted) uppercase">{t("trust")}</span>
        {clients.map((c, i) => (
          <span
            key={c}
            className={cn(
              "text-[0.8125rem] text-(--p-fg) opacity-45",
              i % 2 ? "font-semibold tracking-tight" : "font-serif italic",
              i > 1 && "hidden @md:inline",
            )}
          >
            {c}
          </span>
        ))}
      </div>

      <ol className="grid grid-cols-2 gap-2 px-4 pt-4 pb-5 @md:px-6 @md:pb-6 @lg:grid-cols-4">
        {copy.items.map(({ id, title, meta }, i) => (
          <li key={id} className="flex flex-col border-t-2 border-(--brand) pt-3">
            <span className="pv-head text-[calc(0.95rem*var(--p-head-scale))] leading-none text-(--brand-ink) tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-3 text-[0.75rem] font-medium text-(--p-fg)">{title}</span>
            <span className="text-[0.625rem] text-(--p-muted)">{meta}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
