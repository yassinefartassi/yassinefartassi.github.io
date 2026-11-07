import type { Content } from "@/content/types";
import { buildJsonLd, serializeJsonLd } from "@/lib/seo";
import BackgroundFields from "./BackgroundFields";
import MotionLayer from "./MotionLayer";
import Nav from "./Nav";
import { Contact, Distinctions, Education, Experience, Footer, Hero, Projects, Skills } from "./sections";

/** The whole single page. Same component for every language; only `content` changes. */
export default function Portfolio({ content }: { content: Content }) {
  return (
    <>
      <a
        href="#main"
        className="glass sr-only z-[60] rounded-full px-5 py-3 font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {content.ui.skipLink}
      </a>
      <div id="top" />
      <BackgroundFields />
      <Nav content={content} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero content={content} />
        <Projects content={content} />
        <Experience content={content} />
        <Education content={content} />
        <Skills content={content} />
        <Distinctions content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
      <MotionLayer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd(content)) }}
      />
    </>
  );
}
