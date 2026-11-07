import en from "@/content/en";
import { renderOgImage } from "@/lib/og";

// Generated at build time and exported as a real .png file, so every static
// host serves it as image/png (the opengraph-image.tsx convention exports a
// file with no extension, which some hosts serve as application/octet-stream).
export const dynamic = "force-static";

export function GET() {
  return renderOgImage(en);
}
