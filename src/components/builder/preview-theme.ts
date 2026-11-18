import type { CSSProperties } from "react";
import type { PreviewMode, PreviewStyle } from "@/config/business-templates";
import { readableTextColor } from "@/lib/color";

/**
 * The preview is themed entirely through CSS variables, so every template
 * reacts to style, mode and colour without branching on them for basics.
 */
const styleVars: Record<PreviewStyle, Record<string, string>> = {
  minimal: {
    "--p-head": "var(--ff-display), var(--ff-text), sans-serif",
    "--p-head-weight": "600",
    "--p-head-track": "-0.035em",
    "--p-head-case": "none",
    "--p-head-scale": "1",
    "--p-head-leading": "1.06",
    "--p-btn-case": "none",
    "--p-btn-track": "0",
    "--p-r": "14px",
    "--p-r-sm": "10px",
    "--p-btn-r": "999px",
  },
  classic: {
    "--p-head": "var(--ff-serif), Georgia, serif",
    "--p-head-weight": "500",
    "--p-head-track": "-0.005em",
    "--p-head-case": "none",
    "--p-head-scale": "1.22",
    "--p-head-leading": "1",
    "--p-btn-case": "uppercase",
    "--p-btn-track": "0.12em",
    "--p-r": "3px",
    "--p-r-sm": "2px",
    "--p-btn-r": "2px",
  },
  bold: {
    "--p-head": "var(--ff-display), var(--ff-text), sans-serif",
    "--p-head-weight": "800",
    "--p-head-track": "-0.03em",
    "--p-head-case": "uppercase",
    "--p-head-scale": "0.92",
    "--p-head-leading": "0.96",
    "--p-btn-case": "uppercase",
    "--p-btn-track": "0.02em",
    "--p-r": "26px",
    "--p-r-sm": "16px",
    "--p-btn-r": "999px",
  },
};

const modeVars: Record<PreviewMode, Record<string, string>> = {
  light: {
    // Ivory, not pure white: the preview sits on a warm page.
    "--p-bg": "#faf8f4",
    "--p-fg": "#161616",
    "--p-muted": "rgb(22 22 22 / 0.56)",
    "--p-line": "rgb(0 0 0 / 0.08)",
    "--p-line-strong": "rgb(0 0 0 / 0.16)",
    "--p-card": "#fdfcf9",
  },
  dark: {
    "--p-bg": "#121314",
    "--p-fg": "#f3f3f1",
    "--p-muted": "rgb(243 243 241 / 0.6)",
    "--p-line": "rgb(255 255 255 / 0.09)",
    "--p-line-strong": "rgb(255 255 255 / 0.2)",
    "--p-card": "#1b1c1e",
  },
};

export function previewVars({
  color,
  style,
  mode,
  surface,
}: {
  color: string;
  style: PreviewStyle;
  mode: PreviewMode;
  surface: string;
}): CSSProperties {
  return {
    ...styleVars[style],
    ...modeVars[mode],
    "--brand": color,
    "--brand-contrast": readableTextColor(color),
    "--brand-soft": "color-mix(in oklab, var(--brand) 14%, var(--p-bg))",
    "--brand-ink": "color-mix(in oklab, var(--brand) 78%, var(--p-fg))",
    "--p-surface":
      mode === "light"
        ? `color-mix(in oklab, ${surface} 88%, var(--brand))`
        : "color-mix(in oklab, var(--brand) 16%, #1a1b1d)",
  } as CSSProperties;
}
