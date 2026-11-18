/**
 * Central site configuration.
 *
 * Contact details and external URLs below are placeholders. Replace them
 * with real values before going live; nothing here refers to real accounts.
 */
const PLACEHOLDER_HOST = "your-domain.example";

/**
 * Public site URL (no trailing slash). Falls back to localhost in development;
 * a production build fails loudly instead of shipping localhost in the
 * sitemap, link previews and privacy policy.
 */
function resolveSiteUrl(): string {
  // Direct access so Next.js can inline the value at build time.
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw || raw.includes(PLACEHOLDER_HOST)) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL is not set. Set it to the live address, e.g. " +
          "NEXT_PUBLIC_SITE_URL=https://auralab.ru, in the hosting settings " +
          "(Vercel: Settings → Environment Variables) or in .env.local for a local build.",
      );
    }
    return "http://localhost:3000";
  }

  try {
    new URL(raw);
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL is not a valid URL: "${raw}". Expected e.g. https://auralab.ru`);
  }
  return raw.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "auralab",
  url: resolveSiteUrl(),

  /** Section anchors used by navigation. */
  sections: {
    services: "services",
    builder: "builder",
    contact: "contact",
  },

  contacts: [
    { id: "email", label: "auralab.site@gmail.com", href: "mailto:auralab.site@gmail.com" },
    { id: "telegram", label: "Telegram", href: "https://t.me/notmilena" },
    { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/79150535477" },
  ],

  /** Footer "Follow us" column is hidden while this list is empty. */
  social: [
    // { id: "instagram", label: "Instagram", href: "https://www.instagram.com/auralab.team?srtk=MWMyY3c5OHMzam0zdw%3D%3D&utm_source=qr" },
  ] as readonly ExternalLink[],

  /** Locale-less path; rendered through the i18n `Link`. */
  privacyPolicyPath: "/privacy",

  /**
   * Operator details shown in the privacy policy. Under 152-FZ the policy must
   * name the operator: fill in the legal name / ИП and ИНН before launch.
   */
  legal: {
    operatorName: "auralab",
    email: "auralab.site@gmail.com",
    policyUpdated: "2026-11-16",
  },
} as const satisfies SiteConfig;

type ExternalLink = { id: string; label: string; href: string };

type SiteConfig = {
  name: string;
  url: string;
  sections: Record<"services" | "builder" | "contact", string>;
  contacts: readonly (ExternalLink & { id: "email" | "telegram" | "whatsapp" | "phone" })[];
  social: readonly ExternalLink[];
  privacyPolicyPath: string;
  legal: { operatorName: string; email: string; policyUpdated: string };
};
