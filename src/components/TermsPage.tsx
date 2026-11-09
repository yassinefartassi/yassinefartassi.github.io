import type { Metadata } from "next";
import type { Content } from "@/content/types";
import { absoluteUrl } from "@/lib/site";
import BackgroundFields from "./BackgroundFields";
import { Footer } from "./sections";
import { Container } from "./ui";

const TERMS_PATHS = { fr: "/conditions/", en: "/en/terms/" } as const;

export function buildTermsMetadata(c: Content): Metadata {
  return {
    title: `${c.terms.title} · ${c.person.name}`,
    description: c.terms.description,
    alternates: {
      canonical: absoluteUrl(c.terms.path),
      languages: {
        fr: absoluteUrl(TERMS_PATHS.fr),
        en: absoluteUrl(TERMS_PATHS.en),
        "x-default": absoluteUrl(TERMS_PATHS.fr),
      },
    },
    openGraph: { title: c.terms.title, description: c.terms.description, url: absoluteUrl(c.terms.path) },
  };
}

/** Terms of use. Same component for both languages; copy comes from content.terms. */
export default function TermsPage({ content }: { content: Content }) {
  const { terms, ui } = content;
  const other = content.locale === "fr" ? TERMS_PATHS.en : TERMS_PATHS.fr;
  return (
    <>
      <BackgroundFields />
      <header className="pt-8">
        <Container className="flex items-center justify-between gap-4">
          <a href={content.path} className="pressable inline-flex min-h-11 items-center rounded-full font-semibold tracking-[-0.01em]">
            <span aria-hidden="true" className="mr-2">
              ←
            </span>
            {terms.back}
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
      <main id="main" className="py-16 sm:py-24">
        <Container>
          <div className="max-w-[44rem]">
            <h1 className="type-title">{terms.title}</h1>
            <p className="type-label mt-4 text-muted">{terms.updated}</p>
            <p className="type-lead mt-8">{terms.intro}</p>
            {terms.sections.map((s) => (
              <section key={s.heading} className="mt-12">
                <h2 className="type-heading">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-3">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </main>
      <Footer content={content} />
    </>
  );
}
