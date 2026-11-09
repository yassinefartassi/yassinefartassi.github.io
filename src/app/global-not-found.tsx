// 404 for every unmatched URL. GitHub Pages serves this single file (404.html) for both
// languages, so it shows French first and English second, each with its own lang.
import type { Metadata } from "next";
import BackgroundFields from "@/components/BackgroundFields";
import RootShell from "@/components/RootShell";
import { Container } from "@/components/ui";
import en from "@/content/en";
import fr from "@/content/fr";
import type { Content } from "@/content/types";

export { viewport } from "@/lib/seo";
export const metadata: Metadata = {
  title: `404 · ${fr.notFound.title} · ${en.notFound.title}`,
  robots: { index: false, follow: false },
};

function Block({ c, primary = false }: { c: Content; primary?: boolean }) {
  const Title = primary ? "h1" : "h2";
  return (
    <div lang={c.htmlLang} className={primary ? "" : "mt-12 border-t border-hairline pt-12"}>
      <Title className="type-title">{c.notFound.title}</Title>
      <p className="mt-3 text-muted">{c.notFound.text}</p>
      <a
        href={c.path}
        className={
          primary
            ? "pressable mt-6 inline-flex min-h-12 items-center rounded-full bg-accent-fill px-6 font-medium text-on-accent hover:bg-accent-fill-hover"
            : "glass pressable mt-6 inline-flex min-h-12 items-center rounded-full px-6 font-medium"
        }
      >
        <span className="relative z-[2]">{c.notFound.cta}</span>
      </a>
    </div>
  );
}

export default function GlobalNotFound() {
  return (
    <RootShell content={fr}>
      <BackgroundFields />
      <main className="flex min-h-svh items-center py-24">
        <Container className="max-w-[40rem]">
          <p className="type-label text-accent" aria-hidden="true">
            404
          </p>
          <div className="mt-4">
            <Block c={fr} primary />
            <Block c={en} />
          </div>
        </Container>
      </main>
    </RootShell>
  );
}
