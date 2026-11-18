"use client";

import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { useProjectBrief } from "@/components/providers/ProjectBriefProvider";
import { ArrowIcon, Button } from "@/components/ui/Button";
import {
  businessTemplates,
  defaultBusinessType,
  type BusinessType,
  type PreviewMode,
  type PreviewStyle,
} from "@/config/business-templates";
import { scrollToSection } from "@/lib/scroll";
import { BuilderControls } from "./BuilderControls";
import { WebsitePreview } from "./WebsitePreview";

export type BuilderState = {
  businessType: BusinessType;
  companyName: string;
  color: string;
  style: PreviewStyle;
  mode: PreviewMode;
};

type BuilderProps = {
  intro: ReactNode;
  contactId: string;
};

export function Builder({ intro, contactId }: BuilderProps) {
  const t = useTranslations("builder");
  const { setBrief } = useProjectBrief();
  const [state, setState] = useState<BuilderState>({
    businessType: defaultBusinessType,
    companyName: t("defaultCompanyName"),
    ...businessTemplates[defaultBusinessType].defaults,
    mode: "light",
  });
  // Once the visitor picks a style or colour themselves, type changes keep it.
  const [customized, setCustomized] = useState({ style: false, color: false });

  const update = (patch: Partial<BuilderState>) => {
    if (patch.businessType && patch.businessType !== state.businessType) {
      const defaults = businessTemplates[patch.businessType].defaults;
      patch = {
        ...(customized.style ? {} : { style: defaults.style }),
        ...(customized.color ? {} : { color: defaults.color }),
        ...patch,
      };
    }
    if (patch.style && !("businessType" in patch))
      setCustomized((c) => ({ ...c, style: true }));
    if (patch.color && !("businessType" in patch))
      setCustomized((c) => ({ ...c, color: true }));
    setState((prev) => ({ ...prev, ...patch }));
  };

  const displayName = state.companyName.trim() || t("defaultCompanyName");

  const handleWantSite = () => {
    setBrief({ ...state, companyName: displayName });
    scrollToSection(contactId, "#contact-field-contact");
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10 lg:gap-7">
      {intro}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-16">
        <div className="flex flex-col gap-6 lg:gap-5">
          <p className="text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {t("description")}
          </p>
          <BuilderControls state={state} onChange={update} />
          <Button size="lg" onClick={handleWantSite} className="w-full lg:h-12">
            {t("cta")}
            <ArrowIcon className="size-4" />
          </Button>
          <p className="-mt-2 text-center text-[0.8125rem] text-muted lg:hidden">
            {t("previewNote")}
          </p>
        </div>

        {/*
          Phones/tablets: the preview comes first and sticks under the header,
          so every change in the controls below is visible at once.
          Desktop: it fills the left column's height (cropping its bottom), so
          the whole section fits one screen.
        */}
        <div className="sticky top-[calc(var(--header-height)+0.5rem)] z-10 order-first h-[clamp(15rem,44svh,28rem)] min-w-0 lg:relative lg:top-auto lg:z-auto lg:order-none lg:h-auto">
          <div className="flex h-full flex-col gap-4 lg:absolute lg:inset-0">
            <WebsitePreview
              businessType={state.businessType}
              companyName={displayName}
              color={state.color}
              style={state.style}
              mode={state.mode}
              label={t("previewLabel")}
            />
            <p className="hidden text-right text-[0.8125rem] text-muted lg:block">
              {t("previewNote")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
