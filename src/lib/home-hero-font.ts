import { Oswald } from "next/font/google";

/**
 * Homepage hero H1 only — Oswald reads as a deliberate display face (condensed, strong),
 * full Cyrillic in `next/font/google`. Not wired in root layout; body stays Commissioner / Unbounded.
 */
export const homeHeroDisplayFont = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-home-hero-display",
  display: "swap",
});
