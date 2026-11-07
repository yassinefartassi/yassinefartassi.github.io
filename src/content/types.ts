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
}

export interface SmallProject {
  name: string;
  summary: string;
  stack: string[];
  link: LinkItem;
}

export interface ExperienceEntry {
  company: string;
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

  nav: { id: SectionId; label: string }[];

  hero: {
    role: string;
    focus: string[];
    status: string;
    mobility: string;
    cv: LinkItem;
    contact: string;
  };

  projects: {
    heading: string;
    intro: string;
    labels: { problem: string; built: string; role: string; stack: string };
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
