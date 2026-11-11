"use client";

import { useMessages } from "next-intl";
import { businessTemplates, type BusinessType } from "@/config/business-templates";
import type { LucideIcon } from "lucide-react";

export type TemplateCopy = {
  heading: string;
  description: string;
  cta: string;
  sectionTitle: string;
  nav: string[];
  items: { id: string; title: string; meta: string; icon: LucideIcon }[];
};

/**
 * Resolves the translated copy for a business template. The template config
 * defines the order of ids; the messages provide the text.
 */
export function useTemplateCopy(type: BusinessType): TemplateCopy {
  const messages = useMessages();
  // Widen per-type message shapes to string records; ids come from the
  // template config, which is checked against the messages at compile time.
  const raw: {
    heading: string;
    description: string;
    cta: string;
    sectionTitle: string;
    nav: Record<string, string>;
    items: Record<string, { title: string; meta: string }>;
  } = messages.builder.types[type];
  const template = businessTemplates[type];

  return {
    heading: raw.heading,
    description: raw.description,
    cta: raw.cta,
    sectionTitle: raw.sectionTitle,
    nav: template.nav.map((id: string) => raw.nav[id]),
    items: template.items.map((item: { id: string; icon: LucideIcon }) => ({
      id: item.id,
      icon: item.icon,
      ...raw.items[item.id],
    })),
  };
}
