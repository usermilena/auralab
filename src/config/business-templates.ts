import {
  Armchair,
  CakeSlice,
  ChartNoAxesColumn,
  Coffee,
  Croissant,
  CupSoda,
  Gift,
  Handshake,
  Laptop,
  LayoutGrid,
  Lightbulb,
  MessageCircle,
  Palette,
  Scissors,
  ShoppingBag,
  Sparkles,
  Watch,
  Flower2,
  type LucideIcon,
} from "lucide-react";

import type messages from "@/messages/ru.json";

type TypeMessages = (typeof messages)["builder"]["types"];
export type BusinessType = keyof TypeMessages;

export type PreviewStyle = "minimal" | "classic" | "bold";
export type PreviewMode = "light" | "dark";
export const previewStyles: readonly PreviewStyle[] = ["minimal", "classic", "bold"];
export const previewModes: readonly PreviewMode[] = ["light", "dark"];

/**
 * Structural configuration for each preview template. All copy lives in the
 * translation files under `builder.types.<type>`; only ids are stored here.
 * Each type renders its own layout (see `components/builder/templates`).
 */
type TemplateShape<Nav extends string, Item extends string> = {
  icon: LucideIcon;
  nav: readonly Nav[];
  items: readonly { id: Item; icon: LucideIcon }[];
  /** Warm or cool neutral that sits behind imagery. */
  surface: string;
  /** Style and colour applied when the type is picked, unless the visitor chose their own. */
  defaults: { style: PreviewStyle; color: string };
};

export const businessTemplates = {
  shop: {
    icon: ShoppingBag,
    nav: ["catalog", "about", "delivery"],
    items: [
      { id: "home", icon: Armchair },
      { id: "accessories", icon: Watch },
      { id: "tech", icon: Laptop },
      { id: "gifts", icon: Gift },
    ],
    surface: "#efe9e1",
    defaults: { style: "minimal", color: "#c0603e" },
  },
  coffee: {
    icon: Coffee,
    nav: ["menu", "about", "address"],
    items: [
      { id: "espresso", icon: Coffee },
      { id: "cappuccino", icon: CupSoda },
      { id: "croissant", icon: Croissant },
      { id: "cake", icon: CakeSlice },
    ],
    surface: "#f1e8de",
    defaults: { style: "classic", color: "#6b4a3a" },
  },
  salon: {
    icon: Scissors,
    nav: ["services", "team", "contacts"],
    items: [
      { id: "haircut", icon: Scissors },
      { id: "coloring", icon: Palette },
      { id: "care", icon: Sparkles },
      { id: "nails", icon: Flower2 },
    ],
    surface: "#f3e9e8",
    defaults: { style: "classic", color: "#c96f84" },
  },
  services: {
    icon: LayoutGrid,
    nav: ["services", "approach", "contacts"],
    items: [
      { id: "consulting", icon: MessageCircle },
      { id: "planning", icon: Lightbulb },
      { id: "support", icon: Handshake },
      { id: "reports", icon: ChartNoAxesColumn },
    ],
    surface: "#e9edf3",
    defaults: { style: "bold", color: "#2f5bea" },
  },
} as const satisfies {
  // Nav and item ids must exist in the translation files for that type.
  [T in BusinessType]: TemplateShape<
    keyof TypeMessages[T]["nav"] & string,
    keyof TypeMessages[T]["items"] & string
  >;
};

export type BusinessTemplate = (typeof businessTemplates)[BusinessType];

export const businessTypes = Object.keys(businessTemplates) as BusinessType[];

export type ColorId = keyof (typeof messages)["builder"]["colors"];
export type BrandColor = { id: ColorId; value: string };

export const brandColors: readonly BrandColor[] = [
  { id: "ink", value: "#1d1d1f" },
  { id: "blue", value: "#2f5bea" },
  { id: "lavender", value: "#8f7ae6" },
  { id: "rose", value: "#c96f84" },
  { id: "terracotta", value: "#c0603e" },
  { id: "chocolate", value: "#6b4a3a" },
  { id: "forest", value: "#1f5c4a" },
  { id: "sand", value: "#c9a77c" },
];

export const defaultBusinessType: BusinessType = "shop";
