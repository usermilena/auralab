import { Flame, Flower2, Heart, Menu, Plus, Search, ShoppingBag, Sofa, Coffee } from "lucide-react";
import { useTranslations } from "next-intl";
import { VaseArt } from "@/components/ui/illustrations";
import { cn } from "@/lib/cn";
import type { TemplateProps } from "./types";
import { PvButton, PvEyebrow, PvHeading, PvLogo, PvNav } from "./parts";

const products = [
  { id: "p1", icon: Flower2 },
  { id: "p2", icon: Sofa },
  { id: "p3", icon: Flame },
  { id: "p4", icon: Coffee },
] as const;

/** Online store: promo bar, centred logo, product-led hero and a product grid. */
export function ShopTemplate({ name, style, color, copy }: TemplateProps) {
  const t = useTranslations("builder.types.shop");
  const bold = style === "bold";
  const classic = style === "classic";

  return (
    <div>
      <p className="bg-(--brand) py-1.5 text-center text-[0.625rem] font-medium tracking-wide text-(--brand-contrast)">
        {t("promo")}
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-(--p-line) px-4 py-3 @md:px-6">
        <div className="flex items-center">
          <Menu className="size-4 text-(--p-fg) @lg:hidden" aria-hidden="true" />
          <PvNav items={copy.nav} />
        </div>
        <PvLogo name={name} className="justify-center" />
        <div className="flex items-center justify-end gap-3 text-(--p-fg)">
          <Search className="size-4" strokeWidth={1.7} aria-hidden="true" />
          <Heart className="hidden size-4 @md:block" strokeWidth={1.7} aria-hidden="true" />
          <span className="relative">
            <ShoppingBag className="size-4" strokeWidth={1.7} aria-hidden="true" />
            <span className="absolute -top-1.5 -right-1.5 grid size-3.5 place-items-center rounded-full bg-(--brand) text-[0.5rem] font-bold text-(--brand-contrast)">
              2
            </span>
          </span>
        </div>
      </div>

      <div className="px-4 pt-4 @md:px-6 @md:pt-5">
        {bold ? (
          <div className="relative grid items-center overflow-hidden rounded-(--p-r) bg-(--brand) text-(--brand-contrast) @md:grid-cols-[1.2fr_1fr]">
            <div className="p-5 @md:p-7">
              <p className="text-[0.625rem] font-semibold tracking-[0.14em] uppercase opacity-70">{t("collection")}</p>
              <PvHeading className="mt-2 [--s:1.75rem] @md:[--s:2.4rem]">{copy.heading}</PvHeading>
              <div className="mt-5 flex items-center gap-3">
                <PvButton variant="inverse" arrow>
                  {copy.cta}
                </PvButton>
              </div>
            </div>
            <div className="relative flex justify-center px-6 pb-2 @md:pt-6">
              <span className="absolute inset-x-[15%] bottom-[8%] top-[10%] rounded-full bg-(--brand-contrast) opacity-10" />
              <VaseArt accent={color} className="relative w-full max-w-[13rem]" />
            </div>
          </div>
        ) : (
          <div className={cn("grid gap-3 @md:grid-cols-[1fr_1.05fr] @md:gap-5", classic && "@md:grid-cols-[1.05fr_1fr]")}>
            <div
              className={cn(
                "relative flex items-end justify-center overflow-hidden rounded-(--p-r) bg-(--p-surface) px-6 pt-8",
                classic && "@md:order-2",
              )}
            >
              <span className="absolute top-3 left-3 rounded-(--p-btn-r) bg-(--p-bg) px-2.5 py-1 text-[0.625rem] font-semibold text-(--p-fg)">
                {t("badge")}
              </span>
              <VaseArt accent={color} className="w-full max-w-[12rem]" />
            </div>
            <div className={cn("flex flex-col justify-center py-2", classic && "@md:text-center @md:items-center")}>
              <PvEyebrow>{t("collection")}</PvEyebrow>
              <PvHeading className="mt-2 text-(--p-fg) [--s:1.5rem] @md:[--s:1.9rem]">{copy.heading}</PvHeading>
              <p className="mt-3 max-w-[28ch] text-[0.75rem] leading-relaxed text-(--p-muted)">{copy.description}</p>
              <div className="mt-5 flex items-center gap-4">
                <PvButton arrow>{copy.cta}</PvButton>
                <PvButton variant="ghost">{t("secondaryCta")}</PvButton>
              </div>
            </div>
          </div>
        )}
      </div>

      <ul className="mt-4 flex gap-2 overflow-hidden px-4 @md:px-6">
        {copy.items.map(({ id, title, icon: Icon }) => (
          <li
            key={id}
            className="flex shrink-0 items-center gap-1.5 rounded-(--p-btn-r) border border-(--p-line) px-3 py-1.5 text-[0.6875rem] text-(--p-fg)"
          >
            <Icon className="size-3.5 text-(--brand-ink)" strokeWidth={1.8} aria-hidden="true" />
            {title}
          </li>
        ))}
      </ul>

      <div className="px-4 pt-5 pb-5 @md:px-6 @md:pb-6">
        <div className="flex items-baseline justify-between">
          <PvHeading className="text-(--p-fg) [--s:1rem]">{t("productsTitle")}</PvHeading>
          <span className="text-[0.6875rem] text-(--p-muted)">{t("secondaryCta")} →</span>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-2.5 @lg:grid-cols-4">
          {products.map(({ id, icon: Icon }) => (
            <li key={id}>
              <div className="relative grid aspect-[4/3] place-items-center rounded-(--p-r-sm) bg-(--p-surface) @lg:aspect-square">
                <Icon className="size-7 text-(--brand-ink) opacity-80" strokeWidth={1.3} aria-hidden="true" />
                <span className="absolute right-2 bottom-2 grid size-6 place-items-center rounded-full bg-(--p-bg) text-(--p-fg) shadow-sm">
                  <Plus className="size-3.5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-2 truncate text-[0.6875rem] text-(--p-fg)">{t(`products.${id}.title`)}</p>
              <p className="text-[0.6875rem] font-semibold text-(--p-fg)">{t(`products.${id}.price`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
