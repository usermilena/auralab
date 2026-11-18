"use client";

import { AnimatePresence, motion } from "motion/react";
import { BrowserFrame } from "@/components/ui/frames";
import {
  businessTemplates,
  type BusinessType,
  type PreviewMode,
  type PreviewStyle,
} from "@/config/business-templates";
import { toSlug } from "@/lib/slug";
import { previewVars } from "./preview-theme";
import { useTemplateCopy } from "./template-copy";
import { CoffeeTemplate } from "./templates/CoffeeTemplate";
import { SalonTemplate } from "./templates/SalonTemplate";
import { ServicesTemplate } from "./templates/ServicesTemplate";
import { ShopTemplate } from "./templates/ShopTemplate";

type WebsitePreviewProps = {
  businessType: BusinessType;
  companyName: string;
  color: string;
  style: PreviewStyle;
  mode: PreviewMode;
  label: string;
};

const templates = {
  shop: ShopTemplate,
  coffee: CoffeeTemplate,
  salon: SalonTemplate,
  services: ServicesTemplate,
} as const;

/**
 * Live miniature website. Each business type has its own layout; style, mode
 * and colour are applied through CSS variables (see `preview-theme.ts`).
 */
export function WebsitePreview({ businessType, companyName, color, style, mode, label }: WebsitePreviewProps) {
  const copy = useTemplateCopy(businessType);
  const Template = templates[businessType];

  return (
    <figure
      aria-label={label}
      className="m-0 min-h-0 flex-1"
      style={previewVars({ color, style, mode, surface: businessTemplates[businessType].surface })}
    >
      <BrowserFrame
        url={
          <span className="truncate">
            <span className="opacity-60">https://</span>
            {toSlug(companyName)}.ru
          </span>
        }
        className="shadow-[0_2px_4px_rgb(0_0_0/0.04),0_40px_100px_-40px_rgb(0_0_0/0.35)] flex h-full flex-col"
        bodyClassName="@container bg-(--p-bg) min-h-0 flex-1 overflow-hidden font-sans transition-colors duration-500 [&_*]:transition-[background-color,color,border-color,border-radius] [&_*]:duration-500"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${businessType}-${style}`}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Template name={companyName} style={style} color={color} copy={copy} />
          </motion.div>
        </AnimatePresence>
      </BrowserFrame>
    </figure>
  );
}
