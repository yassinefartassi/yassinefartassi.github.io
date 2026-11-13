# Yassine Fartassi portfolio

Single-page portfolio built with Next.js (App Router), Tailwind CSS v4, Lenis and Motion.
It is a fully static export: `npm run build` writes plain HTML, CSS and JS to `out/`, so it
can be hosted on any static host. It deploys to GitHub Pages (see below). There are no server features.

- French (default): `/`
- English: `/en/`

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm start          # serve out/ on http://localhost:3000
```

Node 20.9 or later is required (the deploy workflow uses Node 24).

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

- **Experience**: edit `experience.entries` (company, role, period, location, bullets). Copied from the CVs; keep both languages in sync with the PDFs. Employer logos and websites are in `EMPLOYERS` in `shared.ts` (square files in `public/logos/`, taken from each company's own site, or supplied by Yassine for Afrogotech); an entry without a logo shows the company's first letter.
- **Education**: edit `education.entries` (degree, school, period, location, optional note). The school name may only appear here.
- **Your role on a team project**: set `role` on the flagship (HoldIt). It shows under "Mon rôle" / "My role".
- **Hackathon details**: add them to `badge` on the HoldIt flagship and to `meta` on the hackathon item in `distinctions`.
- **Banner on a project**: files are in `public/projects/` in two widths (`name-520.webp`, `name-1040.webp`), listed in `BANNERS` in `shared.ts`; set `image: { ...BANNERS.name, alt }` on a flagship or on an entry in `projects.more`.
- **Key figures on a project card**: set `figures: [{ value, label }]` on the flagship. Only numbers you can point to in the repo or a report; the source goes in a comment above them.
- **Pipeline diagram on a project card**: set `flow: { label, stages: [{ title, items }] }`. It is drawn in HTML, so it needs no image.
- **Spoken languages**: edit `skills.languages` (and `SPOKEN_LANGUAGES` in `shared.ts` for structured data).
- **404 page**: copy is in `notFound` in both content files; the page is `src/app/global-not-found.tsx` and shows both languages.
- **Technical sheet (PDF) on a project card**: set `doc: { label, href }`; paths are in `DOCS` in `shared.ts`. The PDFs in `public/docs/` are built by `scripts/make_docs.py` from the public repos (needs `reportlab` and `pillow`): `python scripts/make_docs.py public/docs <path to nexus-health-screening>`. Only blurred screenshots and charts go in; no dataset images, no weights.
- **Warning on a project card**: set `warning` (used for "not a medical device" on NEXUS).
- **Terms of use**: copy is in `terms` in both content files; pages are `/conditions/` and `/en/terms/`. It is a plain-language notice, not reviewed by a lawyer.
- **Browser demo on a project card**: set `demo: { label, href }`. The two demos live in `src/app/(fr)/demo/` and `src/app/en/demo/`; their copy is in `demos` in both content files. The maths is in `src/lib/demo/` (`fatigue.ts` ports the repo's fusion engine, `rppg.ts` ports the NEXUS Dart rPPG code) and is covered by `npm test`. The camera never leaves the browser; face tracking (MediaPipe) is fetched from jsDelivr and Google at a pinned version in `useFaceCamera.ts`.
- **CV**: `public/CV_Yassine_Fartassi_fr.pdf` (French page) and `public/CV_Yassine_Fartassi_EN.pdf` (English page). Paths are in `shared.ts`. These are web versions with no phone number and no age; anything inside them is public once deployed, so check any new version before replacing them.

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

## Deploy on GitHub Pages

`.github/workflows/deploy.yml` builds the site and publishes `out/` on every push to `main`
(or by hand from the **Actions** tab, "Deploy to GitHub Pages" → **Run workflow**).
It runs the typecheck, the build, and a check that fails the deploy if a phone number appears in the output.

One-time setup on GitHub:

1. **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions**
   (not "Deploy from a branch", which would serve the raw source code).
2. **Settings → Secrets and variables → Actions → Variables**: add `SITE_URL` with the public URL,
   no trailing slash. It is baked in at build time, so re-run the workflow after changing it.
   - With a custom domain: `https://yassinefartassi.me`
   - Without one: `https://yassinefartassi.github.io` (also the default if the variable is missing)

## Custom domain

1. In **Settings → Pages → Custom domain**, enter the domain and follow GitHub's DNS instructions,
   then tick **Enforce HTTPS**. With the GitHub Actions source, no `CNAME` file is needed.
2. Set the `SITE_URL` variable to the same domain and re-run the workflow. If `SITE_URL` and the Pages
   domain differ, canonical and Open Graph URLs will point at the wrong host.
3. Check the result: `/sitemap.xml`, `/robots.txt`, and the `<link rel="canonical">` and `og:image` tags in the page source should all use the domain.
4. In Google Search Console, add the domain and submit `https://<domain>/sitemap.xml`.

To remove the custom domain, clear it in the Pages settings and set `SITE_URL` back to `https://yassinefartassi.github.io`.

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
