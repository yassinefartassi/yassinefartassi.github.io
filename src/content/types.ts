// One typed shape for every language. Components only read from this.
// Optional fields are optional because the fact is not known yet:
// leave them out (with a TODO(fact) comment) rather than inventing a value.

export type Locale = "fr" | "en";

export interface LinkItem {
  label: string;
  href: string;
  /** Text appended for screen readers only, e.g. the project name. */
  srContext?: string;
  /** Marks a repository owned by a teammate. */
  team?: boolean;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional responsive candidates, e.g. "/a-420.webp 420w, /a.webp 700w". */
  srcSet?: string;
}

/** A verified number from the project's repository, e.g. { value: "48 ms", label: "…" }. */
export interface KeyFigure {
  value: string;
  label: string;
}

/** A small pipeline diagram drawn in HTML: ordered stages, each with a few parts. */
export interface ProjectFlow {
  /** Accessible name of the diagram. */
  label: string;
  stages: { title: string; items: string[] }[];
}

export interface Flagship {
  id: string;
  name: string;
  subtitle: string;
  /** A verified distinction shown as a badge (patent filed, 1st place). */
  badge?: string;
  /** Shown above the role when the project was a team effort. */
  teamNote?: string;
  problem: string;
  built: string;
  /** Your personal role. Required for team projects. */
  role?: string;
  note?: string;
  stack: string[];
  links: LinkItem[];
  image?: ProjectImage;
  /** Measured or documented numbers only. Never invented. */
  figures?: KeyFigure[];
  flow?: ProjectFlow;
  /** Technical sheet (PDF in public/docs) with the full numbers and screenshots. */
  doc?: LinkItem;
  /** Browser demo hosted on this site. */
  demo?: LinkItem;
  /** Shown as a highlighted notice on the card, e.g. "not a medical device". */
  warning?: string;
}

export interface SmallProject {
  name: string;
  summary: string;
  stack: string[];
  link: LinkItem;
  image?: ProjectImage;
}

export interface ExperienceEntry {
  company: string;
  /** Square company mark from the company's own website. Without it, a monogram is shown. */
  logo?: string;
  /** Company website, opened from the logo and the name. */
  website?: string;
  /** Contract type as told by Yassine, e.g. "Stage" or "Temps plein". */
  kind?: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  /** School name: only ever rendered in the Education section (CLAUDE.md). */
  school: string;
  period: string;
  location: string;
  note?: string;
}

export interface DemoCopy {
  path: string;
  title: string;
  description: string;
  intro: string;
  warning: string;
  limits: string[];
  source: LinkItem;
}

export interface Content {
  locale: Locale;
  htmlLang: string;
  ogLocale: string;
  path: string;

  meta: {
    title: string;
    description: string;
    siteName: string;
    ogImageAlt: string;
    ogKicker: string;
  };

  person: {
    name: string;
    givenName: string;
    familyName: string;
    jobTitle: string;
    email: string;
    github: string;
    linkedin: string;
    knowsAbout: string[];
  };

  ui: {
    skipLink: string;
    primaryNav: string;
    homeLink: string;
    menuOpen: string;
    menuClose: string;
    themeToggle: string;
    langToggle: { label: string; short: string; href: string; hrefLang: string };
    newTab: string;
    footer: string;
  };

  /** 404 page: both languages are shown on the same page. */
  notFound: { title: string; text: string; cta: string };

  /** Browser demos: camera processing happens on the visitor's device. */
  demos: {
    common: {
      kicker: string;
      back: string;
      consent: string;
      termsLink: string;
      newTab: string;
      start: string;
      stop: string;
      loading: string;
      privacy: string;
      videoLabel: string;
      noFace: string;
      limitsHeading: string;
      errors: { denied: string; nocamera: string; model: string; unsupported: string };
    };
    fatigue: DemoCopy & {
      labels: { score: string; ear: string; mar: string; blinks: string; yawns: string; perclos: string; sound: string };
      levels: { alert: string; low: string; moderate: string; high: string; critical: string; microsleep: string };
    };
    nexus: DemoCopy & {
      labels: { buffer: string; waiting: string; ready: string; chrom: string; pos: string; unit: string };
      /** Repeated next to the readings. */
      reminder: string;
    };
  };

  /** Terms of use page. Plain-language notice, not reviewed by a lawyer. */
  terms: {
    path: string;
    title: string;
    description: string;
    updated: string;
    intro: string;
    sections: { heading: string; paragraphs: string[] }[];
    back: string;
  };

  nav: { id: SectionId; label: string }[];

  hero: {
    role: string;
    /** One word inside `role`, set in italic serif with the orange underline stroke. */
    roleAccent: string;
    focus: string[];
    status: string;
    mobility: string;
    cv: LinkItem;
    contact: string;
    /** Portrait on the right of the hero, outlined in orange. Own photo only. */
    portrait?: ProjectImage;
    /** Shown inside the empty frame until `portrait` is set. */
    portraitPending: string;
  };

  projects: {
    heading: string;
    intro: string;
    labels: { problem: string; built: string; role: string; stack: string; figures: string };
    flagships: Flagship[];
    moreHeading: string;
    more: SmallProject[];
  };

  experience: {
    heading: string;
    entries: ExperienceEntry[];
  };

  education: {
    heading: string;
    entries: EducationEntry[];
  };

  skills: {
    heading: string;
    topHeading: string;
    top: string[];
    groups: { name: string; items: string[] }[];
    /** Spoken languages, from the CV. */
    languages: { heading: string; items: { name: string; level: string }[] };
  };

  distinctions: {
    heading: string;
    items: { kind: string; title: string; detail: string; meta?: string }[];
  };

  contact: {
    heading: string;
    text: string;
    emailCta: string;
    links: LinkItem[];
  };
}

export type SectionId =
  | "projects"
  | "experience"
  | "education"
  | "skills"
  | "distinctions"
  | "contact";
