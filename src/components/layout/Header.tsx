import { useTranslations } from "next-intl";
import { ArrowIcon, buttonClasses } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { HeaderShell } from "./HeaderShell";
import { HomeLink } from "./HomeLink";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

/** `anchorBase` prefixes section anchors when the header is used off the home page. */
export function Header({ anchorBase = "" }: { anchorBase?: string }) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const links = [
    {
      href: `${anchorBase}#${siteConfig.sections.builder}`,
      label: t("builder"),
    },
    {
      href: `${anchorBase}#${siteConfig.sections.services}`,
      label: t("services"),
    },
  ];
  const ctaHref = `${anchorBase}#${siteConfig.sections.contact}`;
  const themeLabels = { toDark: t("themeDark"), toLight: t("themeLight") };

  return (
    <HeaderShell>
      <div className="flex h-16 items-center justify-between gap-6 pr-2.5 pl-5 sm:pl-6">
        <HomeLink
          aria-label={tCommon("homeLabel")}
          className="rounded-md text-foreground"
        >
          <Logo />
        </HomeLink>

        <div className="hidden items-center gap-2 md:flex">
          <nav aria-label={t("label")}>
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex h-10 items-center rounded-full px-4 text-[0.9375rem] text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle labels={themeLabels} className="ml-1" />
          <a
            href={ctaHref}
            className={buttonClasses({ size: "sm", className: "ml-2" })}
          >
            {t("cta")}
            <ArrowIcon />
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle labels={themeLabels} />
          <MobileMenu
            links={links}
            cta={{ href: ctaHref, label: t("cta") }}
            labels={{
              open: t("openMenu"),
              close: t("closeMenu"),
              nav: t("label"),
              responseTime: tCommon("responseTime"),
            }}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
