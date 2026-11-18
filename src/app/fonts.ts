import { Cormorant_Garamond, Wix_Madefor_Display, Wix_Madefor_Text } from "next/font/google";

/** Body copy: a humanist grotesk tuned for small sizes. */
export const fontText = Wix_Madefor_Text({
  variable: "--ff-text",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

/** Headings: the display cut of the same family, tighter and more characterful. */
export const fontDisplay = Wix_Madefor_Display({
  variable: "--ff-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

/** Serif used by the "classic" style in the website builder preview. */
export const fontSerif = Cormorant_Garamond({
  variable: "--ff-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  display: "swap",
});

export const fontVariables = `${fontText.variable} ${fontDisplay.variable} ${fontSerif.variable}`;
