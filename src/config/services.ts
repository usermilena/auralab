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
    projectType: "website",
  },
  {
    id: "stores",
    visual: "store",
    tone: "light",
    background:
      "radial-gradient(90% 120% at 85% 20%, #c8f3dc 0%, transparent 60%), linear-gradient(115deg, #f1f7f2 0%, #e2f4e9 60%, #cfeedd 100%)",
    projectType: "ecommerce",
  },
  {
    id: "apps",
    visual: "phones",
    tone: "dark",
    background:
      "radial-gradient(70% 110% at 80% 30%, rgb(91 228 176 / 0.35) 0%, transparent 60%), linear-gradient(120deg, #0f3a2c 0%, #0b2a20 100%)",
    projectType: "mobile",
  },
  {
    id: "design",
    visual: "canvas",
    tone: "light",
    background:
      "radial-gradient(80% 120% at 90% 90%, #d9e9f1 0%, transparent 60%), linear-gradient(115deg, #f3f2ee 0%, #ebefe9 55%, #dfeee6 100%)",
    projectType: "design",
  },
];
