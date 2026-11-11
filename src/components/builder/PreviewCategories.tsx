import { ArrowUpRight, Plus } from "lucide-react";
import type { BusinessTemplate } from "@/config/business-templates";
import type { TemplateCopy } from "./template-copy";

type PreviewCategoriesProps = {
  copy: TemplateCopy;
  variant: BusinessTemplate["list"];
};

const iconBadge =
  "grid shrink-0 place-items-center rounded-xl bg-(--brand-soft) text-(--brand-ink)";

export function PreviewCategories({ copy, variant }: PreviewCategoriesProps) {
  return (
    <div className="mt-5 @md:mt-6">
      <p className="text-[0.8125rem] font-semibold text-foreground">{copy.sectionTitle}</p>
      <div className="mt-3">{renderList(copy.items, variant)}</div>
    </div>
  );
}

function renderList(items: TemplateCopy["items"], variant: PreviewCategoriesProps["variant"]) {
  switch (variant) {
    case "tiles":
      return (
        <ul className="grid grid-cols-2 gap-2 @lg:grid-cols-4">
          {items.map(({ id, title, meta, icon: Icon }) => (
            <li
              key={id}
              className="flex flex-col items-center gap-2 rounded-xl bg-(--brand-tint) px-2 py-4 text-center"
            >
              <span className={`${iconBadge} size-9`}>
                <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="text-[0.75rem] font-medium text-foreground">{title}</span>
              <span className="-mt-1.5 text-[0.6875rem] text-black/45">{meta}</span>
            </li>
          ))}
        </ul>
      );

    case "menu":
      return (
        <ul className="grid gap-x-6 @lg:grid-cols-2">
          {items.map(({ id, title, meta, icon: Icon }) => (
            <li key={id} className="flex items-center gap-3 border-b border-black/[0.06] py-2.5">
              <span className={`${iconBadge} size-8 rounded-full`}>
                <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="text-[0.8125rem] font-medium text-foreground">{title}</span>
              <span aria-hidden="true" className="mx-1 h-px flex-1 border-b border-dotted border-black/20" />
              <span className="text-[0.8125rem] text-black/60 tabular-nums">{meta}</span>
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-(--brand) text-(--brand-contrast)">
                <Plus className="size-3.5" aria-hidden="true" />
              </span>
            </li>
          ))}
        </ul>
      );

    case "cards":
      return (
        <ul className="grid gap-2 @lg:grid-cols-2">
          {items.map(({ id, title, meta, icon: Icon }) => (
            <li
              key={id}
              className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white p-3"
            >
              <span className={`${iconBadge} size-10`}>
                <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.8125rem] font-medium text-foreground">{title}</span>
                <span className="block text-[0.6875rem] text-black/45">{meta}</span>
              </span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-(--brand) text-(--brand-ink)">
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="grid grid-cols-2 gap-2 @lg:grid-cols-4">
          {items.map(({ id, title, meta }, i) => (
            <li key={id} className="flex flex-col rounded-xl bg-(--brand-tint) p-3.5">
              <span className="text-[1.25rem] leading-none font-semibold tracking-tight text-(--brand-ink) tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-5 text-[0.8125rem] font-medium text-foreground">{title}</span>
              <span className="text-[0.6875rem] text-black/45">{meta}</span>
            </li>
          ))}
        </ol>
      );
  }
}
