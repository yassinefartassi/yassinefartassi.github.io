import type { Content } from "./types";
import { CV_EN, EMAIL, GITHUB, LINKEDIN, PATENT, REPOS, PORTRAIT } from "./shared";

// English content, served at /en/.
// Rules: "patent filed" (never "patented"), no school name in hero/title/meta, no phone.

const en: Content = {
  locale: "en",
  htmlLang: "en",
  ogLocale: "en_US",
  path: "/en/",

  meta: {
    // 56 characters (max 60)
    title: "Yassine Fartassi · AI Engineering Student, Vision & Edge",
    // 150 characters (max 155)
    description:
      "AI engineering student in computer vision, federated learning and embedded AI. Patent filed, hackathon winner. Seeking a PFE internship from Feb 2027.",
    siteName: "Yassine Fartassi",
    ogImageAlt:
      "Yassine Fartassi, AI engineering student. Computer vision, federated learning, embedded AI. PFE internship from February 2027.",
    ogKicker: "AI engineering student",
  },

  person: {
    name: "Yassine Fartassi",
    givenName: "Yassine",
    familyName: "Fartassi",
    jobTitle: "Artificial intelligence engineering student",
    email: EMAIL,
    github: GITHUB,
    linkedin: LINKEDIN,
    knowsAbout: [
      "Machine Learning",
      "Computer Vision",
      "Deep Learning",
      "Federated Learning",
      "Edge AI",
      "MLOps",
      "Python",
      "PyTorch",
    ],
  },

  ui: {
    skipLink: "Skip to content",
    primaryNav: "Main navigation",
    homeLink: "Yassine Fartassi, back to top",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    themeToggle: "Switch between light and dark theme",
    langToggle: {
      label: "FR, lire cette page en français",
      short: "FR",
      href: "/",
      hrefLang: "fr",
    },
    newTab: "(opens in a new tab)",
    footer: "Yassine Fartassi",
  },

  nav: [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "distinctions", label: "Awards" },
    { id: "contact", label: "Contact" },
  ],

  hero: {
    role: "AI engineering student",
    roleAccent: "AI",
    focus: ["Computer vision", "Federated learning", "Embedded AI"],
    status: "PFE (final-year) internship from February 2027",
    mobility: "Morocco, France or Germany",
    cv: { label: "Download CV", href: CV_EN, srContext: "(PDF)" },
    contact: "Get in touch",
    portrait: { ...PORTRAIT, alt: "Yassine Fartassi smiling at a technology trade show" },
    portraitPending: "Photo coming soon",
  },

  projects: {
    heading: "Projects",
    intro:
      "Four projects that sum up my work: from computer vision to federated learning, deployed all the way down to embedded hardware.",
    labels: {
      problem: "Problem",
      built: "What I built",
      role: "My role",
      stack: "Stack",
    },
    flagships: [
      {
        id: "nexus",
        name: "NEXUS",
        subtitle: "Multimodal health screening with federated learning",
        problem:
          "Screen for skin and eye conditions and estimate vital signs without contact, without ever centralising patient images.",
        built:
          "One AI pipeline (dermatology, eye, rPPG) running locally on a web app, a Flutter mobile app and a Raspberry Pi 5, connected to a federated learning server (FedAvg) that only exchanges model weights.",
        // TODO(fact): confirm NEXUS is a solo project, otherwise state your role.
        note: "Research prototype, not a medical device.",
        stack: [
          "PyTorch",
          "TensorFlow / Keras",
          "ONNX Runtime",
          "Flower",
          "MediaPipe",
          "Flutter",
          "Raspberry Pi 5",
        ],
        links: [{ label: "Source code", href: REPOS.nexus, srContext: "for NEXUS on GitHub" }],
        // TODO(fact): add a NEXUS screenshot or diagram with no faces or dataset images
        // (the architecture diagram in the repo contains both).
        // TODO(fact): demo link (none yet, so no demo button is rendered).
      },
      {
        id: "fatigue",
        name: "Driver fatigue detection",
        subtitle: "Real-time fatigue and micro-sleep detection on Raspberry\u00a0Pi\u00a05",
        badge: `Patent filed · ${PATENT.office} ${PATENT.year} · No. ${PATENT.number}`,
        problem:
          "Catch driver fatigue and micro-sleeps in time, without relying on a cloud connection.",
        // Described as in the public repo: dlib facial landmarks (EAR/MAR) + heart sensor.
        // TODO(fact): the CV mentions YOLO, the repo uses dlib. Confirm which is right.
        built:
          "An embedded system that tracks eyes and mouth (dlib facial landmarks, EAR/MAR ratios), counts blinks and yawns, reads heart rate and variability from a sensor, then fuses these signals into a weighted fatigue score with graded buzzer alerts and a live dashboard.",
        // TODO(fact): confirm this is a solo project, otherwise state your role.
        stack: ["Python", "OpenCV", "dlib", "Raspberry Pi 5", "GPIO", "Heart-rate sensor"],
        links: [
          { label: "Source code", href: REPOS.fatigue, srContext: "for the fatigue detector on GitHub" },
        ],
        // TODO(fact): dashboard screenshot (no other person's face).
        // TODO(fact): demo link.
      },
      {
        id: "holdit",
        name: "HoldIt",
        subtitle: "EMG-driven serious game for motor rehabilitation",
        // TODO(fact): hackathon name, year, city and organizer.
        badge: "1st place, hackathon",
        teamNote: "Team project",
        problem:
          "Upper-limb rehabilitation is repetitive and hard to dose, and therapists lack an objective measure of effort between sessions.",
        built:
          "A serious game where the patient fires a cannon by holding a muscle contraction: an ESP32 streams the EMG signal, a FastAPI backend adapts the contraction sequence to the patient's profile, and a Unity game turns it into gameplay.",
        // TODO(fact): your exact role in the team (e.g. ESP32 firmware, backend, ML model).
        // The `role` field is not rendered while it is empty.
        stack: ["ESP32", "EMG", "FastAPI", "scikit-learn", "Unity", "PostgreSQL", "Docker"],
        links: [
          {
            label: "Team repository",
            href: REPOS.holdit,
            srContext: "for HoldIt on GitHub, hosted by a teammate",
            team: true,
          },
        ],
        // TODO(fact): demo link.
      },
      {
        id: "tuteur",
        name: "Tuteur IA",
        subtitle: "From course PDFs to an interactive AI tutor",
        problem:
          "Turn course material in PDF form into a tutor that answers questions, explains concepts and generates quizzes.",
        built:
          "An end-to-end MLOps pipeline: PDF ingestion and validation, three models tracked in MLflow, a FAISS RAG index, a FastAPI service (/ask, /quiz, /explain) and drift monitoring with Evidently.",
        // TODO(fact): confirm this is a solo project, otherwise state your role.
        stack: ["Python", "FAISS", "MLflow", "DVC", "FastAPI", "Docker", "Evidently"],
        links: [{ label: "Source code", href: REPOS.tuteur, srContext: "for Tuteur IA on GitHub" }],
        // TODO(fact): API or interface screenshot.
        // TODO(fact): demo link.
      },
    ],
    moreHeading: "More projects",
    more: [
      {
        name: "Road accident risk",
        summary:
          "Streamlit dashboard that estimates road-accident risk from weather, route and traffic data.",
        stack: ["Python", "Streamlit", "scikit-learn", "Web scraping"],
        link: { label: "Source code", href: REPOS.roadRisk, srContext: "for the road accident risk dashboard" },
      },
      {
        name: "Fruit quality detector",
        summary:
          "YOLOv8 detection plus OpenCV defect, colour and texture analysis, with a live camera interface.",
        stack: ["YOLOv8", "OpenCV", "Python"],
        link: { label: "Source code", href: REPOS.fruit, srContext: "for the fruit quality detector" },
      },
      {
        name: "Competition buzzer",
        summary:
          "Two-team ESP32 quiz buzzer with LEDs, sound and a web dashboard for scores, rounds and timer.",
        stack: ["ESP32", "C++", "Arduino"],
        link: { label: "Source code", href: REPOS.buzzer, srContext: "for the competition buzzer firmware" },
      },
      {
        name: "Distributed flight booking",
        summary: "Flight reservation system in Java: JavaFX client, JAX-RS REST service and PostgreSQL.",
        stack: ["Java", "JavaFX", "JAX-RS", "PostgreSQL"],
        link: { label: "Source code", href: REPOS.flight, srContext: "for the distributed flight booking system" },
      },
    ],
  },

  // Source: CV_Yassine_Fartassi_EN.pdf (November 2026).
  experience: {
    heading: "Experience",
    entries: [
      {
        company: "4D Business Consulting (4DBC)",
        role: "Software Development & IoT",
        period: "May – Jul. 2025",
        location: "KSF Space team, Venezuela · Remote",
        bullets: [
          "Contributed to CubeSat telemetry processing and visualization software, turning raw data into actionable information for monitoring and analysis.",
          "Participated in hardware/software integration, testing and validation.",
          "Software and firmware development using LoRa, MQTT and UART protocols.",
        ],
      },
      {
        company: "Atner",
        role: "Application Development & Automation",
        period: "Apr. 2023 – Jun. 2024",
        location: "Rabat, Morocco",
        bullets: [
          "Developed internal HR tools and automated document processing.",
          "Contributed to an accounting application to help identify and track financial bottlenecks.",
          "Automated purchase tracking from suppliers to construction sites using PowerShell, Sage and Excel, improving traceability and project monitoring across departments.",
        ],
      },
      {
        company: "Afrogotech",
        role: "Web & Mobile Development",
        period: "Dec. 2022 – Feb. 2023",
        location: "Rabat, Morocco",
        bullets: [
          "Developed and deployed the company website.",
          "Built a mobile fleet management application for fuel monitoring, speed tracking and vehicle start/stop control.",
          "Processed and presented API data.",
        ],
      },
    ],
  },

  // The school name only appears here (CLAUDE.md rule).
  education: {
    heading: "Education",
    entries: [
      {
        degree: "State Engineering Degree in Artificial Intelligence",
        school: "ISMAGI",
        period: "Oct. 2025 – Jul. 2027",
        location: "Rabat, Morocco",
        note: "In progress, expected graduation July 2027",
      },
      {
        degree: "Professional Bachelor's Degree in IoT & Intelligent Systems",
        school: "ISMAGI",
        period: "Oct. 2024 – Jul. 2025",
        location: "Rabat, Morocco",
      },
      {
        degree: "Specialized Technician Diploma in Software Development",
        school: "OFPPT NTIC",
        period: "Sep. 2020 – Jul. 2022",
        location: "Rabat, Morocco",
      },
    ],
  },

  skills: {
    heading: "Skills",
    topHeading: "Core",
    top: ["Machine Learning", "Computer Vision", "Deep Learning", "Python", "PyTorch"],
    // Tools taken from the public repos. TODO(fact): remove anything you would not defend in an interview.
    groups: [
      {
        name: "Computer vision",
        items: ["OpenCV", "MediaPipe", "YOLOv8", "dlib", "EfficientNetV2, ResNet-18", "rPPG"],
      },
      {
        name: "Federated learning",
        items: ["Flower", "FedAvg", "Non-IID data", "Data privacy"],
      },
      {
        name: "Edge AI / embedded ML",
        items: ["Raspberry Pi 5", "ONNX Runtime", "ESP32", "On-device inference (Flutter)"],
      },
      {
        name: "MLOps",
        items: ["MLflow", "DVC", "FastAPI", "Docker", "Prometheus", "Grafana", "Evidently"],
      },
      {
        name: "Languages and tools",
        items: ["TensorFlow / Keras", "scikit-learn", "XGBoost", "FAISS", "C++", "Java", "Git"],
      },
    ],
  },

  distinctions: {
    heading: "Awards",
    items: [
      {
        kind: "Patent filed",
        title: "Driver fatigue detection system",
        detail: "Patent application filed with OMPIC (Moroccan IP office).",
        meta: `${PATENT.office} · ${PATENT.year} · No. ${PATENT.number}`,
      },
      {
        kind: "1st place",
        title: "HoldIt, hackathon",
        detail: "EMG-driven rehabilitation serious game, built as a team.",
        // TODO(fact): hackathon name, year, city, organizer and team size.
      },
    ],
  },

  contact: {
    heading: "Contact",
    text: "I am looking for a final-year (PFE) internship in AI starting February 2027, in Morocco, France or Germany. Email is the quickest way to reach me.",
    emailCta: "Send an email",
    links: [
      { label: "GitHub", href: GITHUB, srContext: "profile of Yassine Fartassi" },
      { label: "LinkedIn", href: LINKEDIN, srContext: "profile of Yassine Fartassi" },
      { label: "CV", href: CV_EN, srContext: "as a PDF" },
    ],
  },
};

export default en;
