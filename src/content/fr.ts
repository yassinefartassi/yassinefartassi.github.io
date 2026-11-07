import type { Content } from "./types";
import { CV_FR, EMAIL, GITHUB, LINKEDIN, PATENT, REPOS } from "./shared";

// Contenu français (langue par défaut, servi sur /).
// Règles : "brevet déposé" (jamais "breveté"), "Étudiant" au masculin,
// pas de nom d'école dans le hero, le titre ou les meta. Pas de téléphone.

const fr: Content = {
  locale: "fr",
  htmlLang: "fr",
  ogLocale: "fr_FR",
  path: "/",

  meta: {
    // 55 caractères (max 60)
    title: "Yassine Fartassi · Étudiant ingénieur IA, vision & edge",
    // 151 caractères (max 155)
    description:
      "Étudiant ingénieur IA : vision par ordinateur, apprentissage fédéré et IA embarquée. Brevet déposé, 1re place en hackathon. Stage PFE dès février 2027.",
    siteName: "Yassine Fartassi",
    ogImageAlt:
      "Yassine Fartassi, étudiant ingénieur IA. Vision par ordinateur, apprentissage fédéré, IA embarquée. Stage PFE dès février 2027.",
    ogKicker: "Étudiant ingénieur IA",
  },

  person: {
    name: "Yassine Fartassi",
    givenName: "Yassine",
    familyName: "Fartassi",
    jobTitle: "Étudiant ingénieur en intelligence artificielle",
    email: EMAIL,
    github: GITHUB,
    linkedin: LINKEDIN,
    knowsAbout: [
      "Machine Learning",
      "Vision par ordinateur",
      "Deep Learning",
      "Apprentissage fédéré",
      "IA embarquée",
      "MLOps",
      "Python",
      "PyTorch",
    ],
  },

  ui: {
    skipLink: "Aller au contenu",
    primaryNav: "Navigation principale",
    homeLink: "Yassine Fartassi, retour en haut de page",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    themeToggle: "Basculer entre thème clair et sombre",
    langToggle: {
      label: "Read this page in English",
      short: "EN",
      href: "/en/",
      hrefLang: "en",
    },
    newTab: "(nouvel onglet)",
    footer: "Yassine Fartassi",
  },

  nav: [
    { id: "projects", label: "Projets" },
    { id: "experience", label: "Parcours" },
    { id: "skills", label: "Compétences" },
    { id: "distinctions", label: "Distinctions" },
    { id: "contact", label: "Contact" },
  ],

  hero: {
    role: "Étudiant ingénieur IA",
    focus: ["Vision par ordinateur", "Apprentissage fédéré", "IA embarquée"],
    status: "Stage PFE dès février 2027",
    mobility: "Maroc, France ou Allemagne",
    cv: { label: "Télécharger le CV", href: CV_FR, srContext: "(PDF)" },
    contact: "Me contacter",
  },

  projects: {
    heading: "Projets",
    intro:
      "Quatre projets qui résument mon travail : de la vision par ordinateur à l'apprentissage fédéré, déployés jusque sur du matériel embarqué.",
    labels: {
      problem: "Problème",
      built: "Ce que j'ai construit",
      role: "Mon rôle",
      stack: "Stack",
    },
    flagships: [
      {
        id: "nexus",
        name: "NEXUS",
        subtitle: "Dépistage de santé multimodal et apprentissage fédéré",
        problem:
          "Dépister des affections cutanées et oculaires et estimer les signes vitaux sans contact, sans jamais centraliser d'images de patients.",
        built:
          "Une même chaîne d'IA (dermatologie, ophtalmologie, rPPG) exécutée en local sur une application web, une application mobile Flutter et un Raspberry Pi 5, reliée à un serveur d'apprentissage fédéré (FedAvg) qui n'échange que des poids de modèles.",
        // TODO(fact): confirmer que NEXUS est un projet individuel, sinon préciser le rôle.
        note: "Prototype de recherche, pas un dispositif médical.",
        stack: [
          "PyTorch",
          "TensorFlow / Keras",
          "ONNX Runtime",
          "Flower",
          "MediaPipe",
          "Flutter",
          "Raspberry Pi 5",
        ],
        links: [{ label: "Code source", href: REPOS.nexus, srContext: "de NEXUS sur GitHub" }],
        // TODO(fact): ajouter une capture ou un schéma de NEXUS sans visage ni image
        // de jeu de données (le schéma d'architecture du dépôt en contient).
        // TODO(fact): lien de démo (aucun pour l'instant, pas de bouton affiché).
      },
      {
        id: "fatigue",
        name: "Détection de fatigue du conducteur",
        subtitle: "Fatigue et micro-sommeil en temps réel sur Raspberry Pi 5",
        badge: `Brevet déposé · ${PATENT.office} ${PATENT.year} · n° ${PATENT.number}`,
        problem:
          "Repérer à temps la fatigue et les micro-sommeils d'un conducteur, sans dépendre d'une connexion au cloud.",
        // Décrit comme le dépôt public : repères faciaux dlib (EAR/MAR) + capteur cardiaque.
        // TODO(fact): le CV mentionne YOLO, le dépôt utilise dlib. Confirmer la bonne version.
        built:
          "Un système embarqué qui suit les yeux et la bouche (repères faciaux dlib, ratios EAR/MAR), compte clignements et bâillements, lit la fréquence et la variabilité cardiaques d'un capteur, puis fusionne ces signaux en un score de fatigue pondéré avec alertes sonores graduées et tableau de bord.",
        // TODO(fact): confirmer que le projet est individuel, sinon préciser le rôle.
        stack: ["Python", "OpenCV", "dlib", "Raspberry Pi 5", "GPIO", "Capteur cardiaque"],
        links: [
          { label: "Code source", href: REPOS.fatigue, srContext: "du détecteur de fatigue sur GitHub" },
        ],
        // TODO(fact): capture du tableau de bord (sans visage d'une autre personne).
        // TODO(fact): lien de démo.
      },
      {
        id: "holdit",
        name: "HoldIt",
        subtitle: "Jeu sérieux de rééducation motrice piloté par l'EMG",
        // TODO(fact): nom, année, ville et organisateur du hackathon.
        badge: "1re place en hackathon",
        teamNote: "Projet d'équipe",
        problem:
          "La rééducation du membre supérieur est répétitive et difficile à doser, et les thérapeutes manquent d'une mesure objective de l'effort entre les séances.",
        built:
          "Un jeu sérieux où le patient tire au canon en maintenant une contraction musculaire : un ESP32 transmet le signal EMG, un backend FastAPI adapte la séquence de contractions au profil du patient et un jeu Unity la transforme en gameplay.",
        // TODO(fact): votre rôle exact dans l'équipe (ex. firmware ESP32, backend, modèle ML).
        // Le champ `role` n'est pas affiché tant qu'il est vide.
        stack: ["ESP32", "EMG", "FastAPI", "scikit-learn", "Unity", "PostgreSQL", "Docker"],
        links: [
          {
            label: "Dépôt de l'équipe",
            href: REPOS.holdit,
            srContext: "HoldIt sur GitHub, hébergé par un coéquipier",
            team: true,
          },
        ],
        // TODO(fact): lien de démo.
      },
      {
        id: "tuteur",
        name: "Tuteur IA",
        subtitle: "Des supports de cours PDF à un tuteur interactif",
        problem:
          "Transformer des supports de cours en PDF en un tuteur capable de répondre aux questions, d'expliquer des notions et de générer des quiz.",
        built:
          "Un pipeline MLOps de bout en bout : ingestion et validation des PDF, trois modèles suivis dans MLflow, index RAG FAISS, API FastAPI (/ask, /quiz, /explain) et surveillance de la dérive avec Evidently.",
        // TODO(fact): confirmer que le projet est individuel, sinon préciser le rôle.
        stack: ["Python", "FAISS", "MLflow", "DVC", "FastAPI", "Docker", "Evidently"],
        links: [{ label: "Code source", href: REPOS.tuteur, srContext: "du Tuteur IA sur GitHub" }],
        // TODO(fact): capture de l'API ou de l'interface.
        // TODO(fact): lien de démo.
      },
    ],
    moreHeading: "Autres projets",
    more: [
      {
        name: "Risque d'accident routier",
        summary:
          "Tableau de bord Streamlit qui estime le risque d'accident à partir de la météo, de l'itinéraire et du trafic.",
        stack: ["Python", "Streamlit", "scikit-learn", "Web scraping"],
        link: { label: "Code source", href: REPOS.roadRisk, srContext: "du tableau de bord de risque routier" },
      },
      {
        name: "Contrôle qualité des fruits",
        summary:
          "Détection YOLOv8 et analyse OpenCV des défauts, de la couleur et de la texture, avec interface caméra en direct.",
        stack: ["YOLOv8", "OpenCV", "Python"],
        link: { label: "Code source", href: REPOS.fruit, srContext: "du détecteur de qualité des fruits" },
      },
      {
        name: "Buzzer de compétition",
        summary:
          "Buzzer de quiz pour deux équipes sur ESP32, avec LED, sons et tableau de bord web pour les scores, manches et minuteur.",
        stack: ["ESP32", "C++", "Arduino"],
        link: { label: "Code source", href: REPOS.buzzer, srContext: "du firmware du buzzer de compétition" },
      },
      {
        name: "Réservation de vols distribuée",
        summary:
          "Système de réservation en Java : client JavaFX, service REST JAX-RS et base PostgreSQL.",
        stack: ["Java", "JavaFX", "JAX-RS", "PostgreSQL"],
        link: { label: "Code source", href: REPOS.flight, srContext: "du système de réservation de vols" },
      },
    ],
  },

  timeline: {
    heading: "Parcours",
    experienceHeading: "Expérience",
    educationHeading: "Formation",
    experience: [
      // TODO(fact): intitulé du poste, dates, lieu et 1 à 3 réalisations pour chaque entrée.
      { org: "4DBC" },
      { org: "Atner" },
      { org: "Afrogotech" },
    ],
    education: [
      {
        org: "Cycle ingénieur en intelligence artificielle",
        period: "2025 – 2027",
        // TODO(fact): nom de l'école (autorisé uniquement ici, dans Formation) et ville.
      },
      {
        org: "Licence professionnelle IoT et systèmes intelligents",
        period: "2024 – 2025",
        // TODO(fact): nom de l'établissement et ville.
      },
    ],
  },

  skills: {
    heading: "Compétences",
    topHeading: "Essentiel",
    top: ["Machine Learning", "Vision par ordinateur", "Deep Learning", "Python", "PyTorch"],
    // Outils tirés des dépôts publics. TODO(fact): retirer ce que vous ne maîtrisez pas.
    groups: [
      {
        name: "Vision par ordinateur",
        items: ["OpenCV", "MediaPipe", "YOLOv8", "dlib", "Classification d'images (EfficientNetV2, ResNet)", "rPPG"],
      },
      {
        name: "Apprentissage fédéré",
        items: ["Flower", "FedAvg", "Données non IID", "Confidentialité des données"],
      },
      {
        name: "IA embarquée",
        items: ["Raspberry Pi 5", "ONNX Runtime", "ESP32", "Inférence sur mobile (Flutter)"],
      },
      {
        name: "MLOps",
        items: ["MLflow", "DVC", "FastAPI", "Docker", "Prometheus", "Grafana", "Evidently"],
      },
      {
        name: "Langages et outils",
        items: ["TensorFlow / Keras", "scikit-learn", "XGBoost", "FAISS", "C++", "Java", "Git"],
      },
    ],
  },

  distinctions: {
    heading: "Distinctions",
    items: [
      {
        kind: "Brevet déposé",
        title: "Système de détection de fatigue du conducteur",
        detail: "Demande de brevet déposée auprès de l'OMPIC.",
        meta: `${PATENT.office} · ${PATENT.year} · n° ${PATENT.number}`,
      },
      {
        kind: "1re place",
        title: "HoldIt, hackathon",
        detail: "Jeu sérieux de rééducation piloté par l'EMG, réalisé en équipe.",
        // TODO(fact): nom du hackathon, année, ville, organisateur et taille de l'équipe.
      },
    ],
  },

  contact: {
    heading: "Contact",
    text: "Je cherche un stage de fin d'études (PFE) en IA à partir de février 2027, au Maroc, en France ou en Allemagne. Le plus simple est de m'écrire.",
    emailCta: "Écrire un e-mail",
    links: [
      { label: "GitHub", href: GITHUB, srContext: "profil de Yassine Fartassi" },
      { label: "LinkedIn", href: LINKEDIN, srContext: "profil de Yassine Fartassi" },
      { label: "CV", href: CV_FR, srContext: "en PDF" },
    ],
  },
};

export default fr;
