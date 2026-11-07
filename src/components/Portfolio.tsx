import type { Content } from "@/content/types";
import { buildJsonLd, serializeJsonLd } from "@/lib/seo";

export default function Portfolio({ content }: { content: Content }) {
  return (
    <>
      <main id="main">
        <h1>{content.person.name}</h1>
        <p>{content.hero.role}</p>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd(content)) }} />
    </>
  );
}
