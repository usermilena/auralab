import type { ProjectType } from "@/lib/contact/schema";

export type ServiceId = "sites" | "stores" | "apps" | "design";
export type ServiceVisual = "laptop" | "store" | "phones" | "canvas";

export type ServiceSlideConfig = {
  id: ServiceId;
  /** Which concept mockup to render. Swap for real portfolio imagery later. */
  visual: ServiceVisual;
  /** Dark slides switch text and controls to light colours. */
  tone: "light" | "dark";
  /** CSS background of the showcase card. */
  background: string;
  /** Background used in the dark theme (light-tone slides turn dark too). */
  darkBackground: string;
  /** Pre-selects the project type in the contact form. */
  projectType: ProjectType;
};

export const serviceSlides: readonly ServiceSlideConfig[] = [
  {
    id: "sites",
    visual: "laptop",
    tone: "light",
    background:
      "radial-gradient(120% 140% at 100% 100%, #d8cfbf 0%, transparent 55%), linear-gradient(110deg, #eef1ec 0%, #e9e6dd 55%, #ddd5c6 100%)",
    darkBackground:
      "radial-gradient(120% 140% at 100% 100%, #3a3328 0%, transparent 55%), linear-gradient(110deg, #18191a 0%, #1d1c19 55%, #25221c 100%)",
    projectType: "website",
  },
  {
    id: "stores",
    visual: "store",
    tone: "light",
    background:
      "radial-gradient(90% 120% at 85% 20%, #dfe3fb 0%, transparent 60%), linear-gradient(115deg, #f4f4f6 0%, #eceef6 60%, #e2e5f3 100%)",
    darkBackground:
      "radial-gradient(90% 120% at 85% 20%, #262a45 0%, transparent 60%), linear-gradient(115deg, #161719 0%, #191b22 60%, #1d2030 100%)",
    projectType: "ecommerce",
  },
  {
    id: "apps",
    visual: "phones",
    tone: "dark",
    background:
      "radial-gradient(70% 110% at 80% 30%, rgb(140 150 255 / 0.28) 0%, transparent 60%), linear-gradient(120deg, #1b1c22 0%, #111216 100%)",
    darkBackground:
      "radial-gradient(70% 110% at 80% 30%, rgb(140 150 255 / 0.22) 0%, transparent 60%), linear-gradient(120deg, #1b1c22 0%, #111216 100%)",
    projectType: "mobile",
  },
  {
    id: "design",
    visual: "canvas",
    tone: "light",
    background:
      "radial-gradient(80% 120% at 90% 90%, #f3dfe0 0%, transparent 60%), linear-gradient(115deg, #f4f2ef 0%, #efece8 55%, #f0e6e3 100%)",
    darkBackground:
      "radial-gradient(80% 120% at 90% 90%, #3a2628 0%, transparent 60%), linear-gradient(115deg, #171717 0%, #1b1919 55%, #221b1b 100%)",
    projectType: "design",
  },
];
