import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QuickContactButton } from "@/components/layout/QuickContactButton";
import { siteConfig } from "@/config/site";
import { privacyPolicy } from "@/content/privacy";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const path = siteConfig.privacyPolicyPath;
  return {
    title: `${privacyPolicy[locale].title} — ${siteConfig.name}`,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
    },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  const policy = privacyPolicy[hasLocale(routing.locales, locale) ? locale : routing.defaultLocale];
  const updated = new Date(siteConfig.legal.policyUpdated).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header anchorBase={`/${locale}`} />
      <main id="main" className="container-page pt-14 pb-20 md:pt-20 md:pb-28">
        <article className="mx-auto max-w-[44rem]">
          <p className="text-sm text-muted">
            {policy.updatedLabel} {updated}
          </p>
          <h1 className="mt-3 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
            {policy.title}
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">{policy.intro}</p>

          <div className="mt-12 space-y-10">
            {policy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold tracking-[-0.01em]">{section.title}</h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-foreground/80">
                    {p}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-foreground/80 marker:text-secondary">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.after?.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-foreground/80">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer anchorBase={`/${locale}`} path={siteConfig.privacyPolicyPath} />
      <QuickContactButton anchorBase={`/${locale}`} />
    </>
  );
}
