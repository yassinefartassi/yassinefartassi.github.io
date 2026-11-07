# Project: Yassine Fartassi portfolio

Goal: single-page portfolio that helps land a PFE internship in AI (from 1 Feb 2027; Morocco, France, Germany).
Audience: recruiters and engineers who spend under 60 seconds on the page.

## Hard rules
- Never invent results, metrics, dates, company names or quotes. If a fact is missing, leave a visible `TODO(fact)` comment in the code and list it at the end.
- Say "patent filed" / "brevet déposé", never "patented". Use "Étudiant" (masculine) in French.
- Do not show the school name in the hero, headline or meta tags (it only appears in the Education section).
- No phone number anywhere in the page, metadata or JSON-LD.
- Do not publish datasets, model weights, secrets or other people's images.
- Default language is French; English via a toggle. All copy lives in `src/content/{fr,en}.ts`, never hardcoded in components.

## Stack
Next.js (App Router, TypeScript), Tailwind CSS, Lenis (smooth scroll), Motion (animation). Static export (`output: "export"`) so it deploys to GitHub Pages.

## Skills to use
- apple-design: typography, spacing, hierarchy, motion feel.
- ui-ux-pro-max: layout, accessibility, interaction states, responsive behaviour.
- seo: metadata, structured data, sitemap, performance.
Read each skill before the related work and follow it. When skills conflict, accessibility and SEO win over decoration.