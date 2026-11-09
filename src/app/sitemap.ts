import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const terms = { fr: absoluteUrl("/conditions/"), en: absoluteUrl("/en/terms/"), "x-default": absoluteUrl("/conditions/") };
const languages = { fr: absoluteUrl("/"), en: absoluteUrl("/en/"), "x-default": absoluteUrl("/") };

const demo = (name: string) => {
  const fr = absoluteUrl(`/demo/${name}/`);
  const en = absoluteUrl(`/en/demo/${name}/`);
  return { fr, en, "x-default": fr };
};
const demos = [demo("fatigue"), demo("nexus")];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: absoluteUrl("/en/"), lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
    { url: terms.fr, lastModified, changeFrequency: "yearly", priority: 0.2, alternates: { languages: terms } },
    { url: terms.en, lastModified, changeFrequency: "yearly", priority: 0.2, alternates: { languages: terms } },
    ...demos.flatMap((d) => [
      { url: d.fr, lastModified, changeFrequency: "monthly" as const, priority: 0.6, alternates: { languages: d } },
      { url: d.en, lastModified, changeFrequency: "monthly" as const, priority: 0.5, alternates: { languages: d } },
    ]),
  ];
}
