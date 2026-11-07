// Single source of truth for the public URL. Canonical, hreflang, Open Graph,
// sitemap, robots and JSON-LD all read from here. Set NEXT_PUBLIC_SITE_URL
// at build time (see .env.example); no trailing slash.
const FALLBACK = "https://yassinefartassi.github.io";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK).replace(/\/+$/, "");

/** Absolute URL for a site path such as "/" or "/en/". */
export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
