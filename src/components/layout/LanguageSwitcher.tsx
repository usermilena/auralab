import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("languageLabel")} className={cn("flex items-center", className)}>
      <ul className="flex items-center gap-1">
        {routing.locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href="/"
                locale={l}
                scroll={false}
                hrefLang={l}
                lang={l}
                aria-current={active ? "true" : undefined}
                aria-label={t(`languages.${l}`)}
                className={cn(
                  "inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-[0.8125rem] font-semibold tracking-wide uppercase transition-colors",
                  active
                    ? "text-foreground"
                    : "text-foreground/40 hover:text-foreground/80",
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
