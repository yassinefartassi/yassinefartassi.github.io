import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const languages = { fr: absoluteUrl("/"), en: absoluteUrl("/en/"), "x-default": absoluteUrl("/") };

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: absoluteUrl("/en/"), lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
