import type { NextConfig } from "next";

// Fully static: `next build` writes plain HTML/CSS/JS to /out.
// Deployable on Vercel, GitHub Pages, Netlify or any static host.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // One 404 page for both root layouts (src/app/global-not-found.tsx).
  experimental: { globalNotFound: true },
};

export default nextConfig;
