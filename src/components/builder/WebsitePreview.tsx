"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { BrowserFrame } from "@/components/ui/frames";
import { businessTemplates, type BusinessType } from "@/config/business-templates";
import { readableTextColor } from "@/lib/color";
import { toSlug } from "@/lib/slug";
import { PreviewCategories } from "./PreviewCategories";
import { PreviewHeader } from "./PreviewHeader";
import { PreviewHero } from "./PreviewHero";
import { useTemplateCopy } from "./template-copy";

type WebsitePreviewProps = {
  businessType: BusinessType;
  companyName: string;
  color: string;
  label: string;
};

/**
 * Live miniature website. One reusable layout, themed through CSS variables
 * and driven by the business template configuration.
 */
export function WebsitePreview({ businessType, companyName, color, label }: WebsitePreviewProps) {
  const template = businessTemplates[businessType];
  const copy = useTemplateCopy(businessType);

  const themeVars = {
    "--brand": color,
    "--brand-contrast": readableTextColor(color),
    "--brand-soft": "color-mix(in oklab, var(--brand) 14%, white)",
    "--brand-tint": "color-mix(in oklab, var(--brand) 6%, white)",
    "--brand-ink": "color-mix(in oklab, var(--brand) 70%, #111)",
    "--preview-surface": template.hero.surface,
  } as CSSProperties;

  return (
    <figure aria-label={label} className="m-0" style={themeVars}>
      <BrowserFrame
        url={
          <span className="truncate">
            <span className="text-black/30">https://</span>
            {toSlug(companyName)}.ru
          </span>
        }
        className="shadow-[0_2px_4px_rgb(16_61_46/0.04),0_40px_100px_-40px_rgb(16_61_46/0.4)]"
        bodyClassName="@container bg-white [&_*]:transition-[background-color,color,border-color] [&_*]:duration-500"
      >
        <div className="px-4 pt-3 pb-5 @md:px-6 @md:pt-4 @md:pb-7 @2xl:px-7">
          <PreviewHeader
            companyName={companyName}
            nav={copy.nav}
            icons={template.headerIcons}
          />
          <motion.div
            key={businessType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <PreviewHero copy={copy} hero={template.hero} color={color} />
            <PreviewCategories copy={copy} variant={template.list} />
          </motion.div>
        </div>
      </BrowserFrame>
    </figure>
  );
}
