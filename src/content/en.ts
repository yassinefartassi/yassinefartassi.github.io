import type { Content } from "./types";
import { CV_EN, DOCS, EMAIL, EMPLOYERS, GITHUB, LINKEDIN, PATENT, REPOS, PORTRAIT } from "./shared";

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

  demos: {
    common: {
      kicker: "Demo",
      back: "Back to projects",
      consent: "I have read and accept the terms of use.",
      termsLink: "Read the terms",
      newTab: "(new tab)",
      start: "Turn on the camera and start",
      stop: "Stop the camera",
      loading: "Loading face tracking…",
      privacy:
        "The video is processed in your browser: no image is sent or saved. The face-tracking module (MediaPipe) is downloaded from jsDelivr's and Google's servers.",
      videoLabel: "Your camera preview",
      noFace: "No face detected. Face the camera, in good light.",
      limitsHeading: "Good to know",
      errors: {
        denied: "Camera access was denied. Allow the camera for this site in your browser, then try again.",
        nocamera: "No usable camera was found on this device.",
        model: "The face-tracking module could not be loaded. Check your connection, then try again.",
        unsupported: "This browser cannot use the camera on this page.",
      },
    },
    fatigue: {
      path: "/en/demo/fatigue/",
      title: "Demo: fatigue detection",
      description: "In-browser demo of the fatigue detector: eye and mouth tracking with a live fatigue score.",
      intro:
        "Browser version of the fatigue detector. It tracks your eyes and mouth with the camera and computes the score with the same weights and thresholds as the Raspberry\u00a0Pi\u00a05 prototype.",
      warning: "A demo of a prototype. It is not a safety system: do not use it while driving.",
      limits: [
        "Close your eyes for 2 seconds to see the micro-sleep alert. Open your mouth wide for half a second to count a yawn.",
        "The score uses the fusion engine from the public repository: blinks 35%, yawns 20%, PERCLOS 15%, eye opening 10%.",
        "There is no heart-rate sensor here: the heart-rate share (20%) stays at zero.",
        "Face tracking uses MediaPipe instead of dlib, so values can differ slightly from the prototype.",
        "The blink rate appears after 15 seconds of observation.",
      ],
      source: { label: "Source code", href: REPOS.fatigue, srContext: "for the fatigue detector on GitHub" },
      labels: {
        score: "Fatigue score",
        ear: "Eye opening (EAR)",
        mar: "Mouth opening (MAR)",
        blinks: "Blinks per minute",
        yawns: "Yawns (last 5 minutes)",
        perclos: "Time with eyes closed (PERCLOS)",
        sound: "Sound alert",
      },
      levels: {
        alert: "Alert",
        low: "Mild fatigue",
        moderate: "Moderate fatigue",
        high: "High fatigue",
        critical: "Critical fatigue",
        microsleep: "Micro-sleep detected",
      },
    },
    nexus: {
      path: "/en/demo/nexus/",
      title: "NEXUS demo: contactless heart rate",
      description: "In-browser demo of the NEXUS rPPG module. A research prototype, not a medical device.",
      intro:
        "This demo uses the rPPG module from NEXUS: it estimates a heart rate from tiny colour changes on your forehead, with two published methods, CHROM and POS.",
      warning:
        "This is not a medical measurement. NEXUS is a research prototype, not a medical device: the value shown can be wrong and must not be used for any health decision.",
      limits: [
        "Stay still, facing the camera, in even light. The first estimate arrives after about 10 seconds.",
        "If CHROM and POS give values far apart, the estimate is not reliable.",
        "This method has not yet been compared with a pulse oximeter on a real person. Movement, lighting and camera quality easily distort the result.",
        "Only the rPPG module is offered as a demo. The skin and eye analysis models are not published.",
      ],
      source: { label: "Source code", href: REPOS.nexus, srContext: "for NEXUS on GitHub" },
      labels: {
        buffer: "Signal collected",
        waiting: "Collecting signal, stay still…",
        ready: "Estimate updated every second.",
        chrom: "CHROM method",
        pos: "POS method",
        unit: "BPM",
      },
      reminder: "Experimental estimate, not a medical measurement.",
    },
  },

  // Plain-language notice, not reviewed by a lawyer.
  terms: {
    path: "/en/terms/",
    title: "Terms of use",
    description: "Terms of use for Yassine Fartassi's portfolio, its projects and their demos.",
    updated: "Last updated: November 9, 2026",
    intro:
      "This site is the personal portfolio of Yassine Fartassi. By browsing it, or by using the projects and demos it presents, you accept the terms below.",
    sections: [
      {
        heading: "1. Purpose of the site",
        paragraphs: [
          "The site presents a background, projects and documents for information. It offers no sale and no commercial service.",
        ],
      },
      {
        heading: "2. Projects and demos",
        paragraphs: [
          "The projects shown are student or research prototypes. They are provided as is, with no guarantee of results, availability or fitness for a particular purpose.",
          "A demo may be changed, interrupted or removed at any time. You use it at your own risk.",
        ],
      },
      {
        heading: "3. NEXUS is not a medical device",
        paragraphs: [
          "NEXUS is a research prototype. It is not certified and has not been clinically validated.",
          "It gives no diagnosis, no medical advice and no reliable screening. Its results can be wrong: its skin analysis model, for example, reaches only about 61.6% accuracy in its evaluation.",
          "Never use NEXUS to make a health decision or to delay seeing a doctor. If you have a concern about your health, see a healthcare professional. In an emergency, call the emergency services.",
          "Do not submit a photo of another person without their consent.",
        ],
      },
      {
        heading: "4. Driver fatigue detection",
        paragraphs: [
          "This system is a prototype. It is not approved safety equipment and it does not replace the driver's attention. Do not rely on it to drive.",
        ],
      },
      {
        heading: "5. Personal data",
        paragraphs: [
          "This site has no accounts and no forms, and it uses no advertising cookies and no analytics. Only your light or dark theme choice is saved, in your browser.",
          "The demos use your camera only after you agree. The video is processed in your browser: no image is sent or saved. To work, they download a face-tracking module (MediaPipe) from jsDelivr's and Google's servers, which may record technical data such as your IP address.",
          "The site is hosted on GitHub Pages. As the host, GitHub may record technical data such as your IP address.",
          "If you email me, your message and address are used only to reply to you.",
        ],
      },
      {
        heading: "6. Intellectual property",
        paragraphs: [
          "Unless stated otherwise, the text and images on this site belong to Yassine Fartassi. The code of each project is covered by the licence in its repository.",
          "The driver fatigue detection system is the subject of a patent application filed with OMPIC (2025, no. 72322).",
          "Third-party datasets, models and tools remain the property of their authors and are covered by their own licences.",
        ],
      },
      {
        heading: "7. External links",
        paragraphs: ["The site links to third-party sites such as GitHub and LinkedIn. I am not responsible for their content."],
      },
      {
        heading: "8. Contact",
        paragraphs: [`For any question about these terms: ${EMAIL}.`],
      },
    ],
    back: "Back to the portfolio",
  },

  notFound: {
    title: "Page not found",
    text: "This page does not exist or has moved.",
    cta: "Back to the home page",
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
      figures: "Key figures",
    },
    flagships: [
      {
        id: "nexus",
        name: "NEXUS",
        subtitle: "Research prototype: health image analysis and federated learning",
        warning: "Research prototype. It is not a medical device: it gives no diagnosis and no medical advice.",
        problem:
          "Explore whether skin and eye images can be classified, and heart rate estimated without contact, without ever centralizing images of people.",
        built:
          "One AI pipeline (dermatology, eye, rPPG) running locally on a web app, a Flutter mobile app and a Raspberry Pi 5, connected to a federated learning server (FedAvg) that only exchanges model weights.",
        // TODO(fact): confirm NEXUS is a solo project, otherwise state your role.
        doc: { label: "Read the technical sheet", href: DOCS.nexusEn, srContext: "for NEXUS (PDF)" },
        demo: { label: "Try the demo", href: "/en/demo/nexus/", srContext: "of the NEXUS rPPG module" },
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
        // Numbers from the public repo: README ("Model status"), docs/model_cards.md
        // and figures/latency_comparison_3platforms_fr.png (n = 30 runs).
        figures: [
          { value: "≈\u00a095.9%", label: "accuracy for the eye model (5 classes, 344 evaluation images)" },
          { value: "48\u00a0ms", label: "per eye-model inference on Raspberry\u00a0Pi\u00a05 (mean of 30 runs)" },
          { value: "3", label: "platforms running the same ONNX models: web, mobile, edge" },
        ],
        flow: {
          label: "NEXUS architecture",
          stages: [
            { title: "Capture", items: ["Web app", "Flutter mobile app", "Raspberry\u00a0Pi\u00a05"] },
            { title: "Local inference", items: ["Dermatology", "Ophthalmology", "rPPG"] },
            { title: "Federated learning", items: ["Flower server (FedAvg)", "Weights only, no images"] },
          ],
        },
      },
      {
        id: "fatigue",
        name: "Driver fatigue detection",
        subtitle: "Real-time fatigue and micro-sleep detection on Raspberry\u00a0Pi\u00a05",
        badge: `Patent filed · ${PATENT.office} ${PATENT.year} · No. ${PATENT.number}`,
        problem:
          "Catch driver fatigue and micro-sleeps in time, without relying on a cloud connection.",
        // Described as in the public repo: dlib facial landmarks (EAR/MAR) + heart sensor.
        built:
          "An embedded system that tracks eyes and mouth (dlib facial landmarks, EAR/MAR ratios), counts blinks and yawns, reads heart rate and variability from a sensor, then fuses these signals into a weighted fatigue score with graded buzzer alerts and a live dashboard.",
        // TODO(fact): confirm this is a solo project, otherwise state your role.
        stack: ["Python", "OpenCV", "dlib", "Raspberry Pi 5", "GPIO", "Heart-rate sensor"],
        links: [
          { label: "Source code", href: REPOS.fatigue, srContext: "for the fatigue detector on GitHub" },
        ],
        doc: { label: "Read the technical sheet", href: DOCS.fatigueEn, srContext: "for the fatigue detector (PDF)" },
        demo: { label: "Try the demo", href: "/en/demo/fatigue/", srContext: "of the fatigue detector" },
        // Numbers from the code in the public repo (modules/fatigue_fusion.py), which is the
        // reference: the repo README still says 7 indicators and 0.5 s.
        // These are design parameters, not measured results.
        figures: [
          { value: "5", label: "indicators fused into one weighted fatigue score" },
          { value: "2\u00a0s", label: "of closed eyes triggers the micro-sleep alert" },
          { value: "100%", label: "of the processing runs locally, with no cloud" },
        ],
        flow: {
          label: "Processing chain of the fatigue detector",
          stages: [
            { title: "Sensors", items: ["Camera", "Heart-rate sensor"] },
            { title: "Signals", items: ["Eyes (EAR, PERCLOS)", "Yawns (MAR)", "Heart rate and variability"] },
            { title: "Fusion", items: ["Weighted fatigue score"] },
            { title: "Outputs", items: ["Graded sound alerts", "Dashboard"] },
          ],
        },
        // TODO(fact): measured results (detection rate, frames per second on Raspberry Pi 5).
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
        ...EMPLOYERS.fourDbc,
        kind: "Internship",
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
        ...EMPLOYERS.atner,
        kind: "Full-time",
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
        ...EMPLOYERS.afrogotech,
        kind: "Internship",
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
    // Source: CV_Yassine_Fartassi_EN.pdf.
    languages: {
      heading: "Languages",
      items: [
        { name: "Arabic", level: "Native" },
        { name: "French", level: "Professional" },
        { name: "English", level: "Professional" },
      ],
    },
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
