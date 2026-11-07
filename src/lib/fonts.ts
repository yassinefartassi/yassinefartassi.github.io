import { Inter } from "next/font/google";

// The only web font, and the only preloaded one. Apple devices render the
// system font (SF Pro) first in the stack; Inter is the fallback elsewhere.
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  // Variable font: one file covers every weight, so only one preload.
});
