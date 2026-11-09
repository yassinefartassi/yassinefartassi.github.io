// Facts that are identical in every language.
// No phone number anywhere (CLAUDE.md hard rule).

export const EMAIL = "yassinefartassi01@gmail.com";
export const GITHUB = "https://github.com/yassinefartassi";
export const LINKEDIN = "https://www.linkedin.com/in/yassine-fartassi";

const repo = (name: string) => `${GITHUB}/${name}`;

export const REPOS = {
  nexus: repo("nexus-health-screening"),
  fatigue: repo("driver-fatigue-detection"),
  tuteur: repo("tuteur-ia-course-pdf"),
  // Team repository owned by a teammate; linked as-is.
  holdit: "https://github.com/killpathic/holdit-game4health",
  roadRisk: repo("road-accident-risk-dashboard"),
  fruit: repo("fruit_quality_detector"),
  buzzer: repo("Competition-buzzer-firmware"),
  flight: repo("System-distribue-flight-management"),
} as const;

// CVs live in public/. Web versions: no phone number, no age.
export const CV_FR = "/CV_Yassine_Fartassi_fr.pdf";
export const CV_EN = "/CV_Yassine_Fartassi_EN.pdf";
/** Own photo, cropped to 4:5 with no brand logos; badge QR code blurred. */
export const PORTRAIT = {
  src: "/yassine-fartassi.webp",
  srcSet: "/yassine-fartassi-420.webp 420w, /yassine-fartassi.webp 700w",
  width: 700,
  height: 875,
} as const;

/** Spoken languages as BCP 47 codes, for JSON-LD (labels live in fr.ts / en.ts). */
export const SPOKEN_LANGUAGES = ["ar", "fr", "en"] as const;

// Technical sheets, built by scripts/make_docs.py from the public repositories.
export const DOCS = {
  nexusFr: "/docs/NEXUS_fiche_technique_fr.pdf",
  nexusEn: "/docs/NEXUS_technical_sheet_en.pdf",
  fatigueFr: "/docs/Detection_fatigue_fiche_technique_fr.pdf",
  fatigueEn: "/docs/Driver_fatigue_technical_sheet_en.pdf",
} as const;

// Patent facts as provided. Say "brevet déposé" / "patent filed", never "patented".
export const PATENT = { office: "OMPIC", year: "2025", number: "72322" } as const;
