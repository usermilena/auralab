import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";
import { HomeLink } from "./HomeLink";
import { LanguageSwitcher } from "./LanguageSwitcher";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const linkClass =
  "rounded-sm text-[0.9375rem] text-white/65 transition-colors duration-200 hover:text-white";

type FooterProps = {
  /** Prefix for section anchors when rendered off the home page. */
  anchorBase?: string;
  /** Locale-less path the language switcher should keep the visitor on. */
  path?: string;
};

export async function Footer({
  anchorBase = "",
  path = "/",
}: FooterProps = {}) {
  const [t, tNav, tCommon, year] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
    getTranslations("common"),
    getCurrentYear(),
  ]);

  const navLinks = [
    {
      href: `${anchorBase}#${siteConfig.sections.builder}`,
      label: tNav("builder"),
    },
    {
      href: `${anchorBase}#${siteConfig.sections.services}`,
      label: tNav("services"),
    },
    {
      href: `${anchorBase}#${siteConfig.sections.contact}`,
      label: tNav("cta"),
    },
  ];

  const isExternal = (href: string) => href.startsWith("http");

  return (
    <footer className="border-t border-line bg-footer text-white">
      <div className="container-page pt-16 pb-10 md:pt-20">
        <div
          className={cn(
            // Link columns hug their content and sit near the right edge.
            "grid gap-12 sm:grid-cols-2 lg:gap-x-24 lg:pr-16 xl:pr-24",
            siteConfig.social.length > 0
              ? "lg:grid-cols-[1fr_auto_auto_auto]"
              : "lg:grid-cols-[1fr_auto_auto]",
          )}
        >
          <div className="max-w-xs">
            <HomeLink
              aria-label={tCommon("homeLabel")}
              className="inline-block text-white"
            >
              <Logo />
            </HomeLink>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/60">
              {t("description")}
            </p>
          </div>

          <nav aria-labelledby="footer-nav">
            <h2 id="footer-nav" className="text-sm font-semibold text-white">
              {t("navigation")}
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-white">
              {t("contacts")}
            </h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.contacts.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    className={linkClass}
                    {...(isExternal(c.href) && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {siteConfig.social.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-white">
                {t("social")}
              </h2>
              <ul className="mt-5 space-y-3">
                {siteConfig.social.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      className={linkClass}
                      {...(isExternal(s.href) && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year })}</p>
          <div className="flex items-center gap-6">
            <Link
              href={siteConfig.privacyPolicyPath}
              className="rounded-sm transition-colors hover:text-white"
            >
              {t("privacy")}
            </Link>
            <LanguageSwitcher path={path} />
          </div>
        </div>
      </div>
    </footer>
  );
}
