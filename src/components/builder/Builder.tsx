"use client";

import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { useProjectBrief } from "@/components/providers/ProjectBriefProvider";
import { ArrowIcon, Button } from "@/components/ui/Button";
import {
  defaultBrandColor,
  defaultBusinessType,
  type BusinessType,
} from "@/config/business-templates";
import { scrollToSection } from "@/lib/scroll";
import { BuilderControls } from "./BuilderControls";
import { WebsitePreview } from "./WebsitePreview";

export type BuilderState = {
  businessType: BusinessType;
  companyName: string;
  color: string;
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
    color: defaultBrandColor,
  });

  const update = (patch: Partial<BuilderState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const displayName = state.companyName.trim() || t("defaultCompanyName");

  const handleWantSite = () => {
    setBrief({ ...state, companyName: displayName });
    scrollToSection(contactId, "#contact-field-contact");
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] xl:gap-20">
      <div className="flex flex-col gap-8">
        {intro}
        <BuilderControls state={state} onChange={update} />
        <Button size="lg" onClick={handleWantSite} className="self-start">
          {t("cta")}
          <ArrowIcon className="size-4" />
        </Button>
      </div>

      <div className="flex min-w-0 flex-col gap-4 lg:pt-2">
        <WebsitePreview
          businessType={state.businessType}
          companyName={displayName}
          color={state.color}
          label={t("previewLabel")}
        />
        <p className="text-center text-[0.8125rem] text-muted lg:text-right">{t("previewNote")}</p>
      </div>
    </div>
  );
}
