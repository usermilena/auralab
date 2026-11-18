import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${siteConfig.url}/${locale}`]),
  );
  const privacyPath = siteConfig.privacyPolicyPath;
  const privacyLanguages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${siteConfig.url}/${locale}${privacyPath}`]),
  );
  return [
    ...routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}`,
      changeFrequency: "monthly" as const,
      priority: locale === routing.defaultLocale ? 1 : 0.8,
      alternates: { languages },
    })),
    ...routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${privacyPath}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: { languages: privacyLanguages },
    })),
  ];
}
