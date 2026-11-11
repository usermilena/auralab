import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const linkClass =
  "rounded-sm text-[0.9375rem] text-white/65 transition-colors duration-200 hover:text-white";

export async function Footer() {
  const [t, tNav, tCommon, year] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
    getTranslations("common"),
    getCurrentYear(),
  ]);

  const navLinks = [
    { href: `#${siteConfig.sections.projects}`, label: tNav("projects") },
    { href: `#${siteConfig.sections.services}`, label: tNav("services") },
    { href: `#${siteConfig.sections.contact}`, label: tNav("cta") },
  ];

  const isExternal = (href: string) => href.startsWith("http");

  return (
    <footer className="bg-footer text-white">
      <div className="container-page pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label={tCommon("homeLabel")} className="inline-block text-white">
              <Logo />
            </Link>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/60">{t("description")}</p>
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
            <h2 className="text-sm font-semibold text-white">{t("contacts")}</h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.contacts.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    className={linkClass}
                    {...(isExternal(c.href) && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{t("social")}</h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.social.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    className={linkClass}
                    {...(isExternal(s.href) && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year })}</p>
          <a href={siteConfig.privacyPolicyHref} className="rounded-sm transition-colors hover:text-white">
            {t("privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
}
