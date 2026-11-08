// Small presentational primitives shared by the sections (server components).
import type { ReactNode } from "react";
import type { LinkItem } from "@/content/types";
import { ArrowUpRight } from "./icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} data-section aria-labelledby={`${id}-title`} tabIndex={-1} className="py-24 sm:py-32">
      <Container>
        <header data-reveal className="mb-12 max-w-[42rem] sm:mb-16">
          <h2 id={`${id}-title`} className="type-title">
            {title}
          </h2>
          {intro ? <p className="mt-4 text-muted">{intro}</p> : null}
        </header>
        {children}
      </Container>
    </section>
  );
}

/** External link: new tab, announced to screen readers, with optional context and icon. */
export function ExternalLink({
  link,
  newTab,
  icon,
  className = "",
}: {
  link: LinkItem;
  newTab: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`pressable group inline-flex min-h-11 items-center gap-2 rounded-full font-medium ${className}`}
    >
      {icon}
      <span>
        {link.label}
        {link.srContext ? <span className="sr-only"> {link.srContext}</span> : null}
        <span className="sr-only"> {newTab}</span>
      </span>
      <ArrowUpRight size={16} className="opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export function Chips({ items, label, strong = false }: { items: string[]; label?: string; strong?: boolean }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={
            strong
              ? "rounded-full border border-fg/15 bg-chip px-4 py-2 text-[1rem] font-medium"
              : "rounded-full bg-chip px-3 py-1.5 text-[0.875rem] leading-snug"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
