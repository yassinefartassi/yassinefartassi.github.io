// All page sections. Copy comes only from the Content object.
import Image from "next/image";
import type { ReactNode } from "react";
import { preload } from "react-dom";
import type { Content, Flagship, KeyFigure, ProjectFlow, ProjectImage } from "@/content/types";
import GlassCard from "./GlassCard";
import { DocIcon, DownloadIcon, PlayIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { Chips, Container, ExternalLink, Section } from "./ui";

/* ─────────────── Hero ─────────────── */
const PORTRAIT_SIZES = "(min-width: 1024px) 380px, 340px";

/**
 * Portrait in an orange outline. Not animated. On desktop it sits beside the name
 * and is often the LCP element, so it is preloaded there with high priority; on
 * phones it comes right after the first screen.
 * A plain <img> because the static export serves images unoptimized; srcSet gives
 * phones the 420px file. The preload carries the same srcSet so only one file loads.
 */
function HeroPortrait({ portrait, pending }: { portrait?: ProjectImage; pending: string }) {
  if (portrait) {
    // Desktop only: there the portrait is above the fold beside the name.
    preload(portrait.src, {
      as: "image",
      fetchPriority: "high",
      media: "(min-width: 1024px)",
      ...(portrait.srcSet ? { imageSrcSet: portrait.srcSet, imageSizes: PORTRAIT_SIZES } : {}),
    });
  }
  return (
    <figure className="portrait-frame glass mx-auto w-full max-w-[340px] lg:max-w-none">
      <div className="portrait-inner">
        {portrait ? (
          <img
            src={portrait.src}
            srcSet={portrait.srcSet}
            sizes={portrait.srcSet ? PORTRAIT_SIZES : undefined}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            className="block h-full w-full object-cover"
          />
        ) : (
          <figcaption className="type-label flex h-full items-center justify-center text-muted">{pending}</figcaption>
        )}
      </div>
    </figure>
  );
}

/** Splits the role around its accent word (first match); plain text if the word is absent. */
function RoleWithAccent({ role, accent }: { role: string; accent: string }) {
  const i = accent ? role.indexOf(accent) : -1;
  if (i < 0) return <span>{role}</span>;
  return (
    <span>
      {role.slice(0, i)}
      <span className="accent-word">{accent}</span>
      {role.slice(i + accent.length)}
    </span>
  );
}

export function Hero({ content }: { content: Content }) {
  const { hero, person } = content;
  return (
    <section aria-labelledby="hero-title" className="flex min-h-[92svh] items-center pt-32 pb-20 sm:pt-40">
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16">
        {/* Phones: the text fills the first screen and the portrait follows on scroll,
            so the name paints first. Desktop: side by side. */}
        <div className="flex min-h-[calc(100svh-11rem)] flex-col justify-center lg:block lg:min-h-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="type-label inline-flex min-h-8 items-center gap-2.5 rounded-full bg-chip px-3.5 py-1.5 text-fg">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent-fill" aria-hidden="true" />
              {hero.status}
            </p>
            <p className="type-label text-muted">{hero.mobility}</p>
          </div>

          {/* Not animated: it is the LCP element and must paint immediately. */}
          <h1 id="hero-title" className="type-display mt-6 max-w-[14ch] sm:mt-8">
            {person.name}
          </h1>

          <p className="type-lead mt-6 max-w-[40rem] sm:mt-8">
            <RoleWithAccent role={hero.role} accent={hero.roleAccent} />
            <span className="text-muted" aria-hidden="true"> | </span>
            <span className="sr-only">: </span>
            <span className="text-muted">{hero.focus.join(" · ")}</span>
          </p>

          <div className="mt-10 flex flex-wrap gap-3 sm:mt-12">
            <a
              href={hero.cv.href}
              className="pressable inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-fill px-6 font-medium text-on-accent hover:bg-accent-fill-hover"
            >
              <DownloadIcon />
              {hero.cv.label}
              {hero.cv.srContext ? <span className="sr-only"> {hero.cv.srContext}</span> : null}
            </a>
            <a href="#contact" className="glass pressable inline-flex min-h-12 items-center rounded-full px-6 font-medium">
              <span className="relative z-[2]">{hero.contact}</span>
            </a>
          </div>
        </div>

        <HeroPortrait portrait={hero.portrait} pending={hero.portraitPending} />
      </Container>
    </section>
  );
}

/* ─────────────── Projects ─────────────── */
/** Verified numbers. The value is shown first, but read after its label would be
 *  backwards, so each pair is one sentence: "48 ms par inférence…". */
function KeyFigures({ figures, label }: { figures: KeyFigure[]; label: string }) {
  return (
    <ul aria-label={label} className="mt-6 grid gap-x-6 gap-y-4 border-y border-hairline py-5 sm:grid-cols-3">
      {figures.map((f) => (
        <li key={f.label}>
          <span className="block text-[1.625rem] font-bold leading-tight tracking-[-0.02em] tabular-nums">{f.value}</span>{" "}
          <span className="mt-1 block text-[0.875rem] leading-snug text-muted">{f.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Pipeline diagram in plain HTML: an ordered list on a rail, so it stays legible
 *  at any width and in both themes, and screen readers get the real order. */
function FlowDiagram({ flow }: { flow: ProjectFlow }) {
  return (
    <ol aria-label={flow.label} className="flow mt-6">
      {flow.stages.map((s) => (
        <li key={s.title} className="flow-stage">
          <p className="type-label text-fg">{s.title}</p>
          <Chips items={s.items} />
        </li>
      ))}
    </ol>
  );
}

function FlagshipCard({ p, content }: { p: Flagship; content: Content }) {
  const { labels } = content.projects;
  const headingId = `project-${p.id}`;
  return (
    <GlassCard as="article" interactive aria-labelledby={headingId} className="rounded-[28px]">
      <div className="flex h-full flex-col p-7 sm:p-8">
        {p.badge || p.teamNote ? (
          <p className="type-label mb-4 flex flex-wrap gap-x-3 gap-y-1">
            {p.badge ? <span className="text-accent">{p.badge}</span> : null}
            {p.teamNote ? <span className="text-muted">{p.teamNote}</span> : null}
          </p>
        ) : null}

        <h3 id={headingId} className="type-heading">
          {p.name}
        </h3>
        <p className="mt-1 text-muted">{p.subtitle}</p>

        {p.warning ? (
          <p className="mt-5 rounded-[14px] border-l-[3px] border-accent-fill bg-chip px-4 py-3 text-[0.9375rem] font-medium">
            {p.warning}
          </p>
        ) : null}

        {p.image ? (
          <Image
            src={p.image.src}
            alt={p.image.alt}
            width={p.image.width}
            height={p.image.height}
            sizes="(min-width: 768px) 520px, 100vw"
            className="mt-6 h-auto w-full rounded-[18px]"
          />
        ) : null}

        {p.figures?.length ? <KeyFigures figures={p.figures} label={labels.figures} /> : null}

        <dl className="mt-6 space-y-5">
          <div>
            <dt className="type-label text-muted">{labels.problem}</dt>
            <dd className="mt-1">{p.problem}</dd>
          </div>
          <div>
            <dt className="type-label text-muted">{labels.built}</dt>
            <dd className="mt-1">{p.built}</dd>
          </div>
          {p.role ? (
            <div>
              <dt className="type-label text-muted">{labels.role}</dt>
              <dd className="mt-1">{p.role}</dd>
            </div>
          ) : null}
          <div>
            <dt className="type-label text-muted">{labels.stack}</dt>
            <dd className="mt-2">
              <Chips items={p.stack} />
            </dd>
          </div>
        </dl>

        {p.flow ? <FlowDiagram flow={p.flow} /> : null}

        {p.note ? <p className="mt-5 text-[0.9375rem] text-muted">{p.note}</p> : null}

        <div className="mt-auto flex flex-wrap gap-x-6 pt-6">
          {p.demo ? (
            <a href={p.demo.href} className="pressable inline-flex min-h-11 items-center gap-2 rounded-full font-semibold text-accent hover:text-fg">
              <PlayIcon />
              <span>
                {p.demo.label}
                {p.demo.srContext ? <span className="sr-only"> {p.demo.srContext}</span> : null}
              </span>
            </a>
          ) : null}
          {p.doc ? (
            <a
              href={p.doc.href}
              target="_blank"
              rel="noopener"
              className="pressable inline-flex min-h-11 items-center gap-2 rounded-full font-medium text-fg hover:text-accent"
            >
              <DocIcon />
              <span>
                {p.doc.label}
                {p.doc.srContext ? <span className="sr-only"> {p.doc.srContext}</span> : null}
                <span className="sr-only"> {content.ui.newTab}</span>
              </span>
            </a>
          ) : null}
          {p.links.map((l) => (
            <ExternalLink key={l.href} link={l} newTab={content.ui.newTab} icon={<GitHubIcon />} className="text-fg hover:text-accent" />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

export function Projects({ content }: { content: Content }) {
  const { projects } = content;
  return (
    <Section id="projects" title={projects.heading} intro={projects.intro}>
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.flagships.map((p) => (
          <li key={p.id} data-reveal>
            <FlagshipCard p={p} content={content} />
          </li>
        ))}
      </ul>

      <div className="mt-20" data-reveal>
        <h3 className="type-heading">{projects.moreHeading}</h3>
        <GlassCard className="mt-6 rounded-[24px]">
          <ul className="divide-y divide-hairline">
            {projects.more.map((p) => (
              <li key={p.name} className="grid gap-2 px-6 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:px-8">
                <div>
                  <h4 className="font-semibold tracking-[-0.01em]">{p.name}</h4>
                  <p className="mt-1 text-muted">{p.summary}</p>
                  <p className="mt-2 text-[0.875rem] text-muted">{p.stack.join(" · ")}</p>
                </div>
                <ExternalLink link={p.link} newTab={content.ui.newTab} icon={<GitHubIcon />} className="text-fg hover:text-accent sm:justify-self-end" />
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </Section>
  );
}

/* ─────────────── Experience & education ─────────────── */
/**
 * One timeline row. Desktop: dates and place in a left column, details on the right.
 * Mobile: heading first, then a compact dates · place line (only one of the two
 * meta blocks is displayed at a time, so screen readers hear it once).
 */
function TimelineItem({
  period,
  location,
  heading,
  children,
}: {
  period: string;
  location: string;
  heading: ReactNode;
  children?: ReactNode;
}) {
  const places = location.split(" · ");
  return (
    <li data-reveal className="grid gap-x-12 border-t border-hairline py-8 first:border-t-0 first:pt-0 md:grid-cols-[13rem_1fr]">
      <div className="hidden md:block">
        <p className="type-label text-fg">{period}</p>
        {places.map((pl) => (
          <p key={pl} className="mt-1 text-[0.9375rem] text-muted">
            {pl}
          </p>
        ))}
      </div>
      <div className="max-w-[44rem]">
        {heading}
        <p className="type-label mt-2 text-muted md:hidden">
          <span className="text-fg">{period}</span> · {location}
        </p>
        {children}
      </div>
    </li>
  );
}

/** Employer mark on a light tile (logos are drawn for light backgrounds), or a monogram. */
function CompanyMark({ name, logo }: { name: string; logo?: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-hairline bg-white text-[1.125rem] font-bold text-[#111111]"
    >
      {logo ? <img src={logo} alt="" width={48} height={48} loading="lazy" decoding="async" className="h-full w-full object-contain p-1.5" /> : name.charAt(0)}
    </span>
  );
}

export function Experience({ content }: { content: Content }) {
  const { experience } = content;
  return (
    <Section id="experience" title={experience.heading}>
      <ol>
        {experience.entries.map((e) => (
          <TimelineItem
            key={e.company}
            period={e.period}
            location={e.location}
            heading={
              <div className="flex items-start gap-4">
                <CompanyMark name={e.company} logo={e.logo} />
                <div>
                  <h3 className="type-heading">
                    {e.website ? (
                      <a href={e.website} target="_blank" rel="noopener noreferrer" className="pressable rounded-[6px] hover:text-accent">
                        {e.company}
                        <span className="sr-only"> {content.ui.newTab}</span>
                      </a>
                    ) : (
                      e.company
                    )}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-medium text-muted">
                    <span>{e.role}</span>
                    {e.kind ? <span className="type-label rounded-full bg-chip px-2.5 py-0.5 text-accent">{e.kind}</span> : null}
                  </p>
                </div>
              </div>
            }
          >
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-accent">
              {e.bullets.map((b) => (
                <li key={b} className="pl-1">
                  {b}
                </li>
              ))}
            </ul>
          </TimelineItem>
        ))}
      </ol>
    </Section>
  );
}

export function Education({ content }: { content: Content }) {
  const { education } = content;
  return (
    <Section id="education" title={education.heading}>
      <ol>
        {education.entries.map((e) => (
          <TimelineItem
            key={e.degree}
            period={e.period}
            location={e.location}
            heading={
              <>
                <h3 className="type-heading">{e.degree}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-medium text-muted">
                  <span>{e.school}</span>
                  {e.note ? <span className="type-label rounded-full bg-chip px-2.5 py-0.5 text-accent">{e.note}</span> : null}
                </p>
              </>
            }
          />
        ))}
      </ol>
    </Section>
  );
}

/* ─────────────── Skills ─────────────── */
export function Skills({ content }: { content: Content }) {
  const { skills } = content;
  return (
    <Section id="skills" title={skills.heading}>
      <div data-reveal>
        <h3 className="type-heading">{skills.topHeading}</h3>
        <div className="mt-5">
          <Chips items={skills.top} strong />
        </div>
      </div>
      <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((g) => (
          <div key={g.name} data-reveal>
            <h3 className="font-semibold tracking-[-0.01em]">{g.name}</h3>
            <div className="mt-3">
              <Chips items={g.items} />
            </div>
          </div>
        ))}
        <div data-reveal>
          <h3 className="font-semibold tracking-[-0.01em]">{skills.languages.heading}</h3>
          <ul className="mt-3 space-y-1.5">
            {skills.languages.items.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between gap-4 border-b border-hairline pb-1.5 last:border-b-0">
                <span className="font-medium">{l.name}</span>
                <span className="text-[0.875rem] text-muted">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────── Distinctions ─────────────── */
export function Distinctions({ content }: { content: Content }) {
  const { distinctions } = content;
  return (
    <Section id="distinctions" title={distinctions.heading}>
      <ul className="grid gap-6 md:grid-cols-2">
        {distinctions.items.map((d) => (
          <li key={d.title} data-reveal>
            <GlassCard interactive className="rounded-[28px]">
              <div className="p-7 sm:p-8">
                <p className="type-label text-muted">{d.kind}</p>
                <h3 className="type-heading mt-2">{d.title}</h3>
                <p className="mt-2 text-muted">{d.detail}</p>
                {d.meta ? <p className="type-label mt-4 text-fg">{d.meta}</p> : null}
              </div>
            </GlassCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ─────────────── Contact ─────────────── */
export function Contact({ content }: { content: Content }) {
  const { contact, person, ui } = content;
  const icons: Record<string, ReactNode> = {
    GitHub: <GitHubIcon />,
    LinkedIn: <LinkedInIcon />,
  };
  return (
    <Section id="contact" title={contact.heading}>
      <GlassCard className="rounded-[32px]" data-reveal>
        <div className="p-8 sm:p-12">
          <p className="type-lead max-w-[36rem]">{contact.text}</p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <a
              href={`mailto:${person.email}`}
              className="pressable inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-fill px-6 font-medium text-on-accent hover:bg-accent-fill-hover"
            >
              <MailIcon />
              {contact.emailCta}
            </a>
            <p className="text-muted select-all break-all">{person.email}</p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-1 border-t border-hairline pt-6">
            {contact.links.map((l) => (
              <li key={l.label}>
                {l.href.startsWith("http") ? (
                  <ExternalLink link={l} newTab={ui.newTab} icon={icons[l.label]} className="text-fg hover:text-accent" />
                ) : (
                  <a href={l.href} className="pressable inline-flex min-h-11 items-center gap-2 rounded-full font-medium hover:text-accent">
                    <DownloadIcon />
                    {l.label}
                    {l.srContext ? <span className="sr-only"> {l.srContext}</span> : null}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </GlassCard>
    </Section>
  );
}

export function Footer({ content }: { content: Content }) {
  return (
    <footer className="pb-12 pt-8">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-hairline pt-6 text-[0.875rem] text-muted">
          <p>
            © {new Date().getFullYear()} {content.ui.footer}
          </p>
          <a href={content.terms.path} className="pressable inline-flex min-h-11 items-center rounded-full underline underline-offset-4 hover:text-accent">
            {content.terms.title}
          </a>
        </div>
      </Container>
    </footer>
  );
}
