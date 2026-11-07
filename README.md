# Yassine Fartassi portfolio

Single-page portfolio built with Next.js (App Router), Tailwind CSS v4, Lenis and Motion.
It is a fully static export: `npm run build` writes plain HTML, CSS and JS to `out/`, so it
can be hosted on Vercel, GitHub Pages, Netlify or any static host. There are no server features.

- French (default): `/`
- English: `/en/`

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm start          # serve out/ on http://localhost:3000
```

Node 20.9 or later is required.

## Edit content

All copy lives in two files with the same typed shape (`src/content/types.ts`):

| File | What it holds |
| --- | --- |
| `src/content/fr.ts` | French copy (served at `/`) |
| `src/content/en.ts` | English copy (served at `/en/`) |
| `src/content/shared.ts` | Facts shared by both: email, GitHub, LinkedIn, repo URLs, CV path, patent number |

Components never contain copy. Search for `TODO(fact)` to find every missing fact:

```bash
grep -rn "TODO(fact)" src
```

Common edits:

- **Experience**: edit `experience.entries` (company, role, period, location, bullets). Copied from the CVs; keep both languages in sync with the PDFs.
- **Education**: edit `education.entries` (degree, school, period, location, optional note). The school name may only appear here.
- **Your role on a team project**: set `role` on the flagship (HoldIt). It shows under "Mon rôle" / "My role".
- **Hackathon details**: add them to `badge` on the HoldIt flagship and to `meta` on the hackathon item in `distinctions`.
- **Screenshot on a project card**: put the image in `public/projects/` and set `image: { src, alt, width, height }` on the flagship. Use your own screenshots only, with no faces of other people and no dataset images.
- **Demo link**: add a second item to the flagship's `links`.
- **CV**: `public/CV_Yassine_Fartassi_fr.pdf` (French page) and `public/CV_Yassine_Fartassi_EN.pdf` (English page). Paths are in `shared.ts`. The page itself never shows a phone number, but anything inside these PDFs is public once deployed.

House rules (see `CLAUDE.md`): say "brevet déposé" / "patent filed", never "patented". Keep the school
name only in the Education section, never in the hero or meta tags. Never add a phone number.
Keep the meta title at 60 characters or fewer and the description at 155 or fewer.

## Site URL

Every absolute URL (canonical, hreflang, Open Graph, sitemap, robots, JSON-LD) is built from one
variable, read at build time:

```bash
cp .env.example .env.local   # then edit NEXT_PUBLIC_SITE_URL
```

If it is not set, the build uses `https://yassinefartassi.github.io`.

## Deploy on Vercel

1. On vercel.com, choose **Add New → Project** and import this GitHub repository. Vercel detects Next.js; keep the default build settings.
2. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` with the production URL, for example `https://yassine-fartassi.vercel.app` (no trailing slash).
3. Deploy. Redeploy whenever you change that variable, because it is baked in at build time.

## When you add a custom domain

1. Add the domain in Vercel under **Settings → Domains** and follow the DNS instructions.
2. Set `NEXT_PUBLIC_SITE_URL` to the new domain, for example `https://yassinefartassi.me`, then redeploy.
3. Check the result: `/sitemap.xml`, `/robots.txt`, and the `<link rel="canonical">` and `og:image` tags in the page source should all use the new domain.
4. In Google Search Console, add the domain and submit `https://<domain>/sitemap.xml`.
5. Only if you host on GitHub Pages instead of Vercel: add a `public/CNAME` file containing the domain.

## Structure

```
src/app/(fr)/        French root layout, page, og.png route, icon
src/app/en/          English root layout, page, og.png route, icon
src/app/sitemap.ts   sitemap with fr / en / x-default alternates
src/app/robots.ts
src/app/globals.css  design tokens, glass material, motion and fallbacks
src/components/      Portfolio, Nav, sections, GlassCard, MotionLayer, BackgroundFields, icons
src/content/         all copy (fr, en, shared, types)
src/lib/             site URL, metadata + JSON-LD, OG image renderer, font
```

Each language has its own root layout, so `<html lang>` is correct in the static HTML.
Because of that, switching language reloads the page; the toggle keeps the section you were on.
