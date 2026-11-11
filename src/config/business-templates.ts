import {
  Armchair,
  BriefcaseBusiness,
  CakeSlice,
  CalendarDays,
  ChartNoAxesColumn,
  Coffee,
  Croissant,
  CupSoda,
  Gift,
  Handshake,
  Heart,
  Laptop,
  LayoutGrid,
  Lightbulb,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Scissors,
  Search,
  ShoppingBag,
  Sparkles,
  Watch,
  Flower2,
  type LucideIcon,
} from "lucide-react";

import type messages from "@/messages/ru.json";

type TypeMessages = (typeof messages)["builder"]["types"];
export type BusinessType = keyof TypeMessages;

/**
 * Structural configuration for each preview template. All copy lives in the
 * translation files under `builder.types.<type>`; only ids are stored here.
 */
type TemplateShape<
  Nav extends string,
  Item extends string,
> = {
  icon: LucideIcon;
  nav: readonly Nav[];
  items: readonly { id: Item; icon: LucideIcon }[];
  headerIcons: readonly LucideIcon[];
  /** Hero composition and illustration. */
  hero: {
    layout: "split" | "reversed";
    art: "vase" | "cup" | "arch" | "shapes";
    /** Warm or cool neutral that sits behind the brand colour. */
    surface: string;
  };
  /** How the item list is rendered. */
  list: "tiles" | "menu" | "cards" | "steps";
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
    headerIcons: [Search, Heart, ShoppingBag],
    hero: { layout: "split", art: "vase", surface: "#efe9e1" },
    list: "tiles",
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
    headerIcons: [MapPin, ShoppingBag],
    hero: { layout: "split", art: "cup", surface: "#f1e8de" },
    list: "menu",
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
    headerIcons: [CalendarDays],
    hero: { layout: "reversed", art: "arch", surface: "#f3ebea" },
    list: "cards",
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
    headerIcons: [Phone, BriefcaseBusiness],
    hero: { layout: "split", art: "shapes", surface: "#e9eef0" },
    list: "steps",
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

export type BrandColor = { id: ColorId; value: string };
export type ColorId =
  | "forest"
  | "emerald"
  | "mint"
  | "lavender"
  | "sand"
  | "graphite"
  | "terracotta";

export const brandColors: readonly BrandColor[] = [
  { id: "forest", value: "#103d2e" },
  { id: "emerald", value: "#1f8a70" },
  { id: "mint", value: "#8fe3b0" },
  { id: "lavender", value: "#a996ec" },
  { id: "sand", value: "#cdb9a0" },
  { id: "graphite", value: "#2e2e2e" },
  { id: "terracotta", value: "#c0603e" },
];

export const defaultBrandColor = brandColors[0].value;
export const defaultBusinessType: BusinessType = "shop";
