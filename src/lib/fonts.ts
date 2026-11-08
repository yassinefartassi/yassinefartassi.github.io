import { Inter, Instrument_Serif } from "next/font/google";

// Body/headings: Apple devices render the system font (SF Pro) first in the
// stack; Inter is the fallback elsewhere. Variable font: one file, one preload.
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

// The hero's single accent word. Only the italic 400 face is loaded, so it is
// one small file; it is preloaded because the hero uses it above the fold.
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-instrument-serif",
});
