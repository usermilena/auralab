import { useTranslations } from "next-intl";
import { ArrowIcon, buttonClasses } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { HeaderShell } from "./HeaderShell";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const links = [
    { href: `#${siteConfig.sections.projects}`, label: t("projects") },
    { href: `#${siteConfig.sections.services}`, label: t("services") },
  ];
  const ctaHref = `#${siteConfig.sections.contact}`;

  return (
    <HeaderShell>
      <div className="flex h-16 items-center justify-between gap-6 pr-2.5 pl-5 sm:pl-6">
        <Link
          href="/"
          aria-label={tCommon("homeLabel")}
          className="rounded-md text-foreground"
        >
          <Logo />
        </Link>

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
          <span aria-hidden="true" className="mx-3 h-5 w-px bg-line-strong" />
          <LanguageSwitcher />
          <a href={ctaHref} className={buttonClasses({ size: "sm", className: "ml-4 bg-foreground hover:bg-primary" })}>
            {t("cta")}
            <ArrowIcon />
          </a>
        </div>

        <MobileMenu
          links={links}
          cta={{ href: ctaHref, label: t("cta") }}
          labels={{ open: t("openMenu"), close: t("closeMenu"), nav: t("label") }}
        >
          <LanguageSwitcher />
        </MobileMenu>
      </div>
    </HeaderShell>
  );
}
