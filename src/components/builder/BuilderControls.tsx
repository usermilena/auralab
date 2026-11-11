"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId } from "react";
import {
  brandColors,
  businessTemplates,
  businessTypes,
} from "@/config/business-templates";
import { cn } from "@/lib/cn";
import { readableTextColor } from "@/lib/color";
import type { BuilderState } from "./Builder";

type BuilderControlsProps = {
  state: BuilderState;
  onChange: (patch: Partial<BuilderState>) => void;
};

const legendClass = "mb-3 text-sm font-semibold text-foreground";

export function BuilderControls({ state, onChange }: BuilderControlsProps) {
  const t = useTranslations("builder");
  const id = useId();
  const isCustomColor = !brandColors.some((c) => c.value === state.color);

  return (
    <div className="rounded-panel border border-line bg-white/80 p-5 shadow-soft backdrop-blur-sm sm:p-6">
      {/* Business type */}
      <fieldset>
        <legend className={legendClass}>{t("businessType")}</legend>
        <div className="grid grid-cols-2 gap-2 min-[25rem]:grid-cols-4">
          {businessTypes.map((type) => {
            const Icon = businessTemplates[type].icon;
            const checked = state.businessType === type;
            return (
              <label
                key={type}
                className={cn(
                  "group relative flex cursor-pointer flex-col items-center gap-2 rounded-2xl border px-1 py-3.5 text-center transition-[background-color,border-color,box-shadow] duration-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-secondary",
                  checked
                    ? "border-primary bg-light-green/70 text-primary shadow-[inset_0_0_0_1px_var(--primary)]"
                    : "border-line-strong bg-white text-foreground/75 hover:border-foreground/25 hover:text-foreground",
                )}
              >
                <input
                  type="radio"
                  name={`${id}-type`}
                  value={type}
                  checked={checked}
                  onChange={() => onChange({ businessType: type })}
                  className="sr-only"
                />
                <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                <span className="text-[0.75rem] leading-tight font-medium sm:text-[0.8125rem]">
                  {t(`types.${type}.label`)}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Company name */}
      <div className="mt-6">
        <label htmlFor={`${id}-name`} className={cn(legendClass, "block")}>
          {t("companyName")}
        </label>
        <input
          id={`${id}-name`}
          type="text"
          value={state.companyName}
          maxLength={40}
          autoComplete="organization"
          placeholder={t("companyNamePlaceholder")}
          onChange={(e) => onChange({ companyName: e.target.value })}
          className="h-12 w-full rounded-xl border border-line-strong bg-white px-4 text-[0.9375rem] transition-[border-color,box-shadow] outline-none placeholder:text-foreground/35 hover:border-foreground/25 focus:border-secondary focus:shadow-[0_0_0_4px_rgb(32_125_108/0.12)]"
        />
      </div>

      {/* Colour */}
      <fieldset className="mt-6">
        <legend className={legendClass}>{t("primaryColor")}</legend>
        <div className="flex flex-wrap items-center gap-2.5">
          {brandColors.map((color) => {
            const checked = state.color === color.value;
            return (
              <label
                key={color.id}
                title={t(`colors.${color.id}`)}
                className="relative cursor-pointer rounded-full has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-secondary"
              >
                <input
                  type="radio"
                  name={`${id}-color`}
                  value={color.value}
                  checked={checked}
                  onChange={() => onChange({ color: color.value })}
                  className="sr-only"
                />
                <span className="sr-only">{t(`colors.${color.id}`)}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full ring-1 ring-black/10 transition-[box-shadow,transform] duration-300 hover:scale-105",
                    checked && "shadow-[0_0_0_3px_white,0_0_0_5px_var(--primary)]",
                  )}
                  style={{ background: color.value }}
                >
                  {checked && (
                    <Check
                      className="size-4"
                      strokeWidth={2.5}
                      style={{ color: readableTextColor(color.value) }}
                    />
                  )}
                </span>
              </label>
            );
          })}

          <label
            title={t("customColor")}
            className="relative cursor-pointer rounded-full has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-secondary"
          >
            <span className="sr-only">{t("customColor")}</span>
            <input
              type="color"
              value={state.color}
              onChange={(e) => onChange({ color: e.target.value })}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
            />
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none flex size-9 items-center justify-center rounded-full bg-[conic-gradient(from_180deg,#ff6b6b,#ffd166,#06d6a0,#4cc9f0,#7b61ff,#ff6bd6,#ff6b6b)] ring-1 ring-black/10 transition-shadow duration-300",
                isCustomColor && "shadow-[0_0_0_3px_white,0_0_0_5px_var(--primary)]",
              )}
            >
              <span
                className="size-4 rounded-full border-2 border-white"
                style={{ background: isCustomColor ? state.color : "white" }}
              />
            </span>
          </label>
        </div>
      </fieldset>
    </div>
  );
}
