/**
 * Central site configuration.
 *
 * Contact details and external URLs below are placeholders. Replace them
 * with real values before going live; nothing here refers to real accounts.
 */
export const siteConfig = {
  name: "auralab",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Section anchors used by navigation. */
  sections: {
    services: "services",
    projects: "builder",
    contact: "contact",
  },

  contacts: [
    { id: "email", label: "auralab.site@gmail.com", href: "mailto:auralab.site@gmail.com" },
    { id: "telegram", label: "Telegram", href: "https://t.me/notmilena" },
    { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/79150535477" },
  ],

  social: [
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/auralab.team?srtk=MWMyY3c5OHMzam0zdw%3D%3D&utm_source=qr" },
  ],

  privacyPolicyHref: "#",
} as const satisfies SiteConfig;

type ExternalLink = { id: string; label: string; href: string };

type SiteConfig = {
  name: string;
  url: string;
  sections: Record<"services" | "projects" | "contact", string>;
  contacts: readonly (ExternalLink & { id: "email" | "telegram" | "whatsapp" | "phone" })[];
  social: readonly ExternalLink[];
  privacyPolicyHref: string;
};
