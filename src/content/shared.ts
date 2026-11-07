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

// TODO(fact): add public/CV_Yassine_Fartassi_fr.pdf (the link 404s until then).
// TODO(fact): an English CV? Both languages link to the French PDF for now.
export const CV_FR = "/CV_Yassine_Fartassi_fr.pdf";

// Patent facts as provided. Say "brevet déposé" / "patent filed", never "patented".
export const PATENT = { office: "OMPIC", year: "2025", number: "72322" } as const;
