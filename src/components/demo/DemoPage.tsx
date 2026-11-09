import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { Content } from "@/content/types";
import { absoluteUrl } from "@/lib/site";
import BackgroundFields from "../BackgroundFields";
import { GitHubIcon } from "../icons";
import { Footer } from "../sections";
import { Container, ExternalLink } from "../ui";

type DemoKey = "fatigue" | "nexus";
const PATHS: Record<DemoKey, { fr: string; en: string }> = {
  fatigue: { fr: "/demo/fatigue/", en: "/en/demo/fatigue/" },
  nexus: { fr: "/demo/nexus/", en: "/en/demo/nexus/" },
};

export function buildDemoMetadata(c: Content, key: DemoKey): Metadata {
  const demo = c.demos[key];
  return {
    title: `${demo.title} · ${c.person.name}`,
    description: demo.description,
    alternates: {
      canonical: absoluteUrl(demo.path),
      languages: { fr: absoluteUrl(PATHS[key].fr), en: absoluteUrl(PATHS[key].en), "x-default": absoluteUrl(PATHS[key].fr) },
    },
    openGraph: { title: demo.title, description: demo.description, url: absoluteUrl(demo.path) },
  };
}

/** Page around a browser demo: back link, title, warning, the demo itself, then what to know. */
export default function DemoPage({ content, demo, children }: { content: Content; demo: DemoKey; children: ReactNode }) {
  const copy = content.demos[demo];
  const { common } = content.demos;
  const { ui } = content;
  const other = content.locale === "fr" ? PATHS[demo].en : PATHS[demo].fr;
  return (
    <>
      <BackgroundFields />
      <header className="pt-8">
        <Container className="flex items-center justify-between gap-4">
          <a href={`${content.path}#projects`} className="pressable inline-flex min-h-11 items-center rounded-full font-semibold tracking-[-0.01em]">
            <span aria-hidden="true" className="mr-2">
              ←
            </span>
            {common.back}
          </a>
          <a
            href={other}
            hrefLang={ui.langToggle.hrefLang}
            lang={ui.langToggle.hrefLang}
            aria-label={ui.langToggle.label}
            className="glass pressable inline-flex min-h-11 items-center rounded-full px-4 font-medium"
          >
            <span className="relative z-[2]">{ui.langToggle.short}</span>
          </a>
        </Container>
      </header>
      <main id="main" className="py-12 sm:py-16">
        <Container>
          <div className="max-w-[44rem]">
            <p className="type-label text-accent">{common.kicker}</p>
            <h1 className="type-title mt-3">{copy.title}</h1>
            <p className="type-lead mt-5">{copy.intro}</p>
            <p className="mt-6 rounded-[14px] border-l-[3px] border-accent-fill bg-chip px-4 py-3 font-medium">{copy.warning}</p>
          </div>
          <div className="mt-10">{children}</div>
          <section className="mt-14 max-w-[44rem]">
            <h2 className="type-heading">{common.limitsHeading}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-accent">
              {copy.limits.map((l) => (
                <li key={l} className="pl-1">
                  {l}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <ExternalLink link={copy.source} newTab={ui.newTab} icon={<GitHubIcon />} className="text-fg hover:text-accent" />
            </div>
          </section>
        </Container>
      </main>
      <Footer content={content} />
    </>
  );
}
