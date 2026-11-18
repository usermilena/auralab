"use client";

import { Check, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, type ReactNode } from "react";
import {
  brandColors,
  businessTemplates,
  businessTypes,
  previewModes,
  previewStyles,
  type PreviewStyle,
} from "@/config/business-templates";
import { cn } from "@/lib/cn";
import { readableTextColor } from "@/lib/color";
import type { BuilderState } from "./Builder";

type BuilderControlsProps = {
  state: BuilderState;
  onChange: (patch: Partial<BuilderState>) => void;
};

const legendClass = "mb-3 text-sm font-semibold text-foreground lg:mb-2";
const focusRing =
  "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-secondary";

/**
 * Tiny wireframe of each style's hero layout, so the option reads as
 * "different layout", not just "different font". Mirrors the templates:
 * minimal = image left / text right, classic = centred text / image right
 * with sharp corners, bold = full-width colour banner.
 */
function StyleThumb({ style }: { style: PreviewStyle }) {
  const line = "rounded-full bg-current";
  if (style === "bold") {
    return (
      <span className="flex h-8 w-14 lg:h-7 lg:w-12 flex-col justify-center gap-[3px] rounded-[7px] bg-current/20 px-1.5">
        <span className={cn(line, "h-[4px] w-4/5")} />
        <span className={cn(line, "h-[4px] w-3/5")} />
        <span className={cn(line, "mt-[2px] h-[5px] w-4")} />
      </span>
    );
  }
  const classic = style === "classic";
  return (
    <span
      className={cn(
        "flex h-8 w-14 lg:h-7 lg:w-12 gap-1 border border-current/25 p-[3px]",
        classic ? "flex-row-reverse rounded-[2px]" : "rounded-[6px]",
      )}
    >
      <span
        className={cn(
          "w-1/2 bg-current/25",
          classic ? "rounded-[1px]" : "rounded-[3px]",
        )}
      />
      <span
        className={cn(
          "flex flex-1 flex-col justify-center gap-[3px]",
          classic && "items-center",
        )}
      >
        <span
          className={cn(
            line,
            "h-[2px] w-full opacity-70",
            classic && "rounded-none",
          )}
        />
        <span
          className={cn(
            line,
            "h-[2px] w-3/4 opacity-70",
            classic && "rounded-none",
          )}
        />
        <span
          className={cn(
            "mt-[2px] h-[4px] w-3 bg-current",
            classic ? "rounded-none" : "rounded-full",
          )}
        />
      </span>
    </span>
  );
}

export function BuilderControls({ state, onChange }: BuilderControlsProps) {
  const t = useTranslations("builder");
  const id = useId();
  const isCustomColor = !brandColors.some((c) => c.value === state.color);

  return (
    <div className="flex flex-col gap-5 rounded-panel border border-line bg-surface/80 p-4 shadow-soft backdrop-blur-sm sm:gap-6 sm:p-6 lg:gap-5 lg:p-5">
      {/* Business type */}
      <fieldset>
        <legend className={legendClass}>{t("businessType")}</legend>
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {businessTypes.map((type) => {
            const Icon = businessTemplates[type].icon;
            const checked = state.businessType === type;
            return (
              <Option
                key={type}
                checked={checked}
                className="flex-col gap-1.5 px-1 py-2.5 sm:gap-2 sm:py-3.5 lg:gap-1.5 lg:py-2"
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
              </Option>
            );
          })}
        </div>
      </fieldset>

      {/* Company name */}
      <div>
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
          className="h-12 w-full rounded-xl lg:h-11 border border-line-strong bg-surface px-4 text-[0.9375rem] transition-[border-color,box-shadow] outline-none placeholder:text-foreground/35 hover:border-foreground/25 focus:border-secondary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--secondary)_15%,transparent)]"
        />
      </div>

      {/* Style */}
      <fieldset>
        <legend className={legendClass}>{t("style")}</legend>
        <div className="grid grid-cols-3 gap-2">
          {previewStyles.map((style) => {
            const checked = state.style === style;
            return (
              <Option
                key={style}
                checked={checked}
                className="flex-col gap-1.5 py-3 lg:gap-1 lg:py-2"
              >
                <input
                  type="radio"
                  name={`${id}-style`}
                  value={style}
                  checked={checked}
                  onChange={() => onChange({ style })}
                  className="sr-only"
                />
                <span aria-hidden="true">
                  <StyleThumb style={style} />
                </span>
                <span className="text-[0.75rem] font-medium">
                  {t(`styles.${style}`)}
                </span>
              </Option>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8 lg:gap-6">
        {/* Mode */}
        <fieldset>
          <legend className={legendClass}>{t("mode")}</legend>
          <div className="inline-flex rounded-full border border-line-strong p-1">
            {previewModes.map((mode) => {
              const checked = state.mode === mode;
              const Icon = mode === "light" ? Sun : Moon;
              return (
                <label
                  key={mode}
                  title={t(`modes.${mode}`)}
                  className={cn(
                    "flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-[0.8125rem] lg:px-2.5 font-medium transition-colors",
                    focusRing,
                    checked
                      ? "bg-primary text-on-primary"
                      : "text-foreground/65 hover:text-foreground",
                  )}
                >
                  <input
                    type="radio"
                    name={`${id}-mode`}
                    value={mode}
                    checked={checked}
                    onChange={() => onChange({ mode })}
                    className="sr-only"
                  />
                  <Icon className="size-3.5" aria-hidden="true" />
                  <span className="lg:sr-only">{t(`modes.${mode}`)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Colour */}
        <fieldset>
          <legend className={legendClass}>{t("primaryColor")}</legend>
          <div className="flex flex-wrap items-center gap-2">
            {brandColors.map((color) => {
              const checked = state.color === color.value;
              return (
                <label
                  key={color.id}
                  title={t(`colors.${color.id}`)}
                  className={cn(
                    "relative cursor-pointer rounded-full",
                    focusRing,
                  )}
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
                      "flex size-8 items-center justify-center rounded-full ring-1 ring-foreground/10 transition-[box-shadow,transform] duration-300 hover:scale-105",
                      checked &&
                        "shadow-[0_0_0_3px_var(--surface),0_0_0_5px_var(--foreground)]",
                    )}
                    style={{ background: color.value }}
                  >
                    {checked && (
                      <Check
                        className="size-3.5"
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
              className={cn("relative cursor-pointer rounded-full", focusRing)}
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
                  "pointer-events-none flex size-8 items-center justify-center rounded-full bg-[conic-gradient(from_180deg,#ff6b6b,#ffd166,#06d6a0,#4cc9f0,#7b61ff,#ff6bd6,#ff6b6b)] ring-1 ring-foreground/10 transition-shadow duration-300",
                  isCustomColor &&
                    "shadow-[0_0_0_3px_var(--surface),0_0_0_5px_var(--foreground)]",
                )}
              >
                <span
                  className="size-3.5 rounded-full border-2 border-white"
                  style={{ background: isCustomColor ? state.color : "white" }}
                />
              </span>
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

function Option({
  checked,
  className,
  children,
}: {
  checked: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-2xl border text-center transition-[background-color,border-color,color,box-shadow] duration-300",
        focusRing,
        checked
          ? "border-foreground bg-soft text-foreground shadow-[inset_0_0_0_1px_var(--foreground)]"
          : "border-line-strong bg-surface text-foreground/70 hover:border-foreground/25 hover:text-foreground",
        className,
      )}
    >
      {children}
    </label>
  );
}
