import type { Metadata, Viewport } from "next";
import type { Content } from "@/content/types";
import { SITE_URL, absoluteUrl } from "./site";

const LANG_PATHS = { fr: "/", en: "/en/" } as const;

export function buildMetadata(c: Content): Metadata {
  const url = absoluteUrl(c.path);
  const other = c.locale === "fr" ? "en_US" : "fr_FR";

  return {
    metadataBase: new URL(`${SITE_URL}/`),
    title: c.meta.title,
    description: c.meta.description,
    applicationName: c.meta.siteName,
    authors: [{ name: c.person.name, url: absoluteUrl("/") }],
    creator: c.person.name,
    alternates: {
      canonical: url,
      languages: {
        fr: absoluteUrl(LANG_PATHS.fr),
        en: absoluteUrl(LANG_PATHS.en),
        "x-default": absoluteUrl(LANG_PATHS.fr),
      },
    },
    openGraph: {
      type: "profile",
      firstName: c.person.givenName,
      lastName: c.person.familyName,
      url,
      siteName: c.meta.siteName,
      title: c.meta.title,
      description: c.meta.description,
      locale: c.ogLocale,
      alternateLocale: [other],
      // Image comes from the opengraph-image.tsx file next to the layout.
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.title,
      description: c.meta.description,
    },
    robots: { index: true, follow: true },
    // No phone number anywhere: stop iOS from auto-linking digit runs (e.g. the patent number).
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d0d" },
  ],
};

/** Person + WebSite structured data. alumniOf is intentionally absent:
 *  the school name only belongs in the Education section.
 *  TODO(fact): add alumniOf once the school name is confirmed. */
export function buildJsonLd(c: Content) {
  const home = absoluteUrl("/");
  const personId = `${home}#person`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: c.person.name,
        givenName: c.person.givenName,
        familyName: c.person.familyName,
        jobTitle: c.person.jobTitle,
        url: home,
        email: `mailto:${c.person.email}`,
        sameAs: [c.person.github, c.person.linkedin],
        knowsAbout: c.person.knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": `${home}#website`,
        name: c.meta.siteName,
        url: home,
        inLanguage: ["fr", "en"],
        author: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl(c.path)}#page`,
        url: absoluteUrl(c.path),
        name: c.meta.title,
        description: c.meta.description,
        inLanguage: c.htmlLang,
        isPartOf: { "@id": `${home}#website` },
        mainEntity: { "@id": personId },
      },
    ],
  };
}

/** Serialize JSON-LD safely for an inline <script>. */
export const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
