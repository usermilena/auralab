import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/** Compact, low-key locale toggle ("RU / EN") for the footer's bottom bar. */
export function LanguageSwitcher({ path = "/", className }: { path?: string; className?: string }) {
  const locale = useLocale();
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("languageLabel")} className={cn("flex items-center", className)}>
      <ul className="flex items-center">
        {routing.locales.map((l, i) => {
          const active = l === locale;
          return (
            <li key={l} className="flex items-center">
              {i > 0 && (
                <span aria-hidden="true" className="px-1 text-white/25">
                  /
                </span>
              )}
              <Link
                href={path}
                locale={l}
                scroll={false}
                hrefLang={l}
                lang={l}
                aria-current={active ? "true" : undefined}
                aria-label={t(`languages.${l}`)}
                className={cn(
                  "rounded-sm px-1 py-1 text-[0.75rem] font-medium tracking-[0.08em] uppercase transition-colors",
                  active ? "text-white/80" : "text-white/40 hover:text-white/80",
                )}
              >
                {l}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
