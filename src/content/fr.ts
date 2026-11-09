import type { Content } from "./types";
import { CV_FR, DOCS, EMAIL, GITHUB, LINKEDIN, PATENT, REPOS, PORTRAIT } from "./shared";

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
      label: "EN, read this page in English",
      short: "EN",
      href: "/en/",
      hrefLang: "en",
    },
    newTab: "(nouvel onglet)",
    footer: "Yassine Fartassi",
  },

  demos: {
    common: {
      kicker: "Démonstration",
      back: "Retour aux projets",
      consent: "J'ai lu et j'accepte les conditions d'utilisation.",
      termsLink: "Lire les conditions",
      newTab: "(nouvel onglet)",
      start: "Activer la caméra et démarrer",
      stop: "Arrêter la caméra",
      loading: "Chargement du suivi du visage…",
      privacy:
        "La vidéo est traitée dans votre navigateur : aucune image n'est envoyée ni enregistrée. Le module de suivi du visage (MediaPipe) est téléchargé depuis les serveurs de jsDelivr et de Google.",
      videoLabel: "Aperçu de votre caméra",
      noFace: "Aucun visage détecté. Placez-vous face à la caméra, bien éclairé.",
      limitsHeading: "À savoir",
      errors: {
        denied: "L'accès à la caméra a été refusé. Autorisez la caméra pour ce site dans votre navigateur, puis réessayez.",
        nocamera: "Aucune caméra utilisable n'a été trouvée sur cet appareil.",
        model: "Le module de suivi du visage n'a pas pu être chargé. Vérifiez votre connexion, puis réessayez.",
        unsupported: "Ce navigateur ne permet pas d'utiliser la caméra sur cette page.",
      },
    },
    fatigue: {
      path: "/demo/fatigue/",
      title: "Démo : détection de fatigue",
      description: "Démonstration dans le navigateur du détecteur de fatigue : suivi des yeux et de la bouche, score de fatigue en direct.",
      intro:
        "Version navigateur du détecteur de fatigue. Elle suit vos yeux et votre bouche avec la caméra et calcule le score avec les mêmes poids et les mêmes seuils que le prototype sur Raspberry\u00a0Pi\u00a05.",
      warning: "Démonstration d'un prototype. Ce n'est pas un système de sécurité : ne l'utilisez pas en conduisant.",
      limits: [
        "Fermez les yeux 2 secondes pour voir l'alerte de micro-sommeil. Ouvrez grand la bouche une demi-seconde pour compter un bâillement.",
        "Le score reprend le moteur de fusion du dépôt public : clignements 35\u00a0%, bâillements 20\u00a0%, PERCLOS 15\u00a0%, ouverture des yeux 10\u00a0%.",
        "Il n'y a pas de capteur cardiaque ici : la part du rythme cardiaque (20\u00a0%) reste à zéro.",
        "Le suivi du visage utilise MediaPipe au lieu de dlib : les valeurs peuvent différer légèrement de celles du prototype.",
        "La fréquence des clignements s'affiche après 15 secondes d'observation.",
      ],
      source: { label: "Code source", href: REPOS.fatigue, srContext: "du détecteur de fatigue sur GitHub" },
      labels: {
        score: "Score de fatigue",
        ear: "Ouverture des yeux (EAR)",
        mar: "Ouverture de la bouche (MAR)",
        blinks: "Clignements par minute",
        yawns: "Bâillements (5 dernières minutes)",
        perclos: "Temps yeux fermés (PERCLOS)",
        sound: "Alerte sonore",
      },
      levels: {
        alert: "Éveillé",
        low: "Fatigue légère",
        moderate: "Fatigue modérée",
        high: "Fatigue élevée",
        critical: "Fatigue critique",
        microsleep: "Micro-sommeil détecté",
      },
    },
    nexus: {
      path: "/demo/nexus/",
      title: "Démo NEXUS : rythme cardiaque sans contact",
      description: "Démonstration dans le navigateur du module rPPG de NEXUS. Prototype de recherche, pas un dispositif médical.",
      intro:
        "Cette démo reprend le module rPPG de NEXUS : elle estime un rythme cardiaque à partir des infimes variations de couleur de votre front, avec deux méthodes publiées, CHROM et POS.",
      warning:
        "Ce n'est pas une mesure médicale. NEXUS est un prototype de recherche, pas un dispositif médical : la valeur affichée peut être fausse et ne doit servir à aucune décision de santé.",
      limits: [
        "Restez immobile, face à la caméra, avec un éclairage régulier. La première estimation arrive après environ 10 secondes.",
        "Si CHROM et POS donnent des valeurs éloignées, l'estimation n'est pas fiable.",
        "Cette méthode n'a pas encore été comparée à un oxymètre de pouls sur une vraie personne. Le mouvement, l'éclairage et la qualité de la caméra faussent facilement le résultat.",
        "Seul le module rPPG est proposé en démo. Les modèles d'analyse de la peau et de l'œil ne sont pas publiés.",
      ],
      source: { label: "Code source", href: REPOS.nexus, srContext: "de NEXUS sur GitHub" },
      labels: {
        buffer: "Signal collecté",
        waiting: "Collecte du signal, restez immobile…",
        ready: "Estimation mise à jour chaque seconde.",
        chrom: "Méthode CHROM",
        pos: "Méthode POS",
        unit: "BPM",
      },
      reminder: "Estimation expérimentale, pas une mesure médicale.",
    },
  },

  // Notice en langage clair, non relue par un juriste.
  terms: {
    path: "/conditions/",
    title: "Conditions d'utilisation",
    description: "Conditions d'utilisation du portfolio de Yassine Fartassi, de ses projets et de leurs démonstrations.",
    updated: "Dernière mise à jour : 9 novembre 2026",
    intro:
      "Ce site est le portfolio personnel de Yassine Fartassi. En le consultant, ou en utilisant les projets et démonstrations qu'il présente, vous acceptez les conditions ci-dessous.",
    sections: [
      {
        heading: "1. Objet du site",
        paragraphs: [
          "Le site présente un parcours, des projets et des documents à titre d'information. Il ne propose ni vente ni service commercial.",
        ],
      },
      {
        heading: "2. Projets et démonstrations",
        paragraphs: [
          "Les projets présentés sont des prototypes étudiants ou de recherche. Ils sont fournis en l'état, sans garantie de résultat, de disponibilité ni d'adéquation à un usage particulier.",
          "Une démonstration peut être modifiée, interrompue ou retirée à tout moment. Vous l'utilisez sous votre seule responsabilité.",
        ],
      },
      {
        heading: "3. NEXUS n'est pas un dispositif médical",
        paragraphs: [
          "NEXUS est un prototype de recherche. Il n'est ni certifié ni validé cliniquement.",
          "Il ne fournit ni diagnostic, ni avis médical, ni dépistage fiable. Ses résultats peuvent être faux : son modèle d'analyse de la peau, par exemple, n'atteint qu'environ 61,6 % d'exactitude lors de son évaluation.",
          "N'utilisez jamais NEXUS pour prendre une décision de santé, ni pour retarder une consultation. En cas de doute sur votre santé, consultez un professionnel de santé. En cas d'urgence, appelez les services d'urgence.",
          "N'y soumettez pas de photo d'une autre personne sans son accord.",
        ],
      },
      {
        heading: "4. Détection de fatigue du conducteur",
        paragraphs: [
          "Ce système est un prototype. Ce n'est pas un équipement de sécurité homologué et il ne remplace pas la vigilance du conducteur. Ne vous y fiez pas pour conduire.",
        ],
      },
      {
        heading: "5. Données personnelles",
        paragraphs: [
          "Ce site ne propose ni compte ni formulaire, et n'utilise ni cookie publicitaire ni outil de mesure d'audience. Seul votre choix de thème clair ou sombre est enregistré, dans votre navigateur.",
          "Les démonstrations utilisent votre caméra uniquement après votre accord. La vidéo est traitée dans votre navigateur : aucune image n'est envoyée ni enregistrée. Pour fonctionner, elles téléchargent un module de suivi du visage (MediaPipe) depuis les serveurs de jsDelivr et de Google, qui peuvent enregistrer des données techniques comme votre adresse IP.",
          "Le site est hébergé par GitHub Pages. À ce titre, GitHub peut enregistrer des données techniques, comme votre adresse IP.",
          "Si vous m'écrivez par e-mail, votre message et votre adresse ne servent qu'à vous répondre.",
        ],
      },
      {
        heading: "6. Propriété intellectuelle",
        paragraphs: [
          "Sauf mention contraire, les textes et les images de ce site appartiennent à Yassine Fartassi. Le code de chaque projet est soumis à la licence indiquée dans son dépôt.",
          "Le système de détection de fatigue du conducteur fait l'objet d'une demande de brevet déposée auprès de l'OMPIC (2025, n° 72322).",
          "Les jeux de données, modèles et outils de tiers restent la propriété de leurs auteurs et sont soumis à leurs propres licences.",
        ],
      },
      {
        heading: "7. Liens externes",
        paragraphs: ["Le site renvoie vers des sites tiers, comme GitHub ou LinkedIn. Je ne suis pas responsable de leur contenu."],
      },
      {
        heading: "8. Contact",
        paragraphs: [`Pour toute question sur ces conditions : ${EMAIL}.`],
      },
    ],
    back: "Retour au portfolio",
  },

  notFound: {
    title: "Page introuvable",
    text: "Cette page n'existe pas ou a été déplacée.",
    cta: "Retour à l'accueil",
  },

  nav: [
    { id: "projects", label: "Projets" },
    { id: "experience", label: "Expérience" },
    { id: "education", label: "Formation" },
    { id: "skills", label: "Compétences" },
    { id: "distinctions", label: "Distinctions" },
    { id: "contact", label: "Contact" },
  ],

  hero: {
    role: "Étudiant ingénieur IA",
    roleAccent: "IA",
    focus: ["Vision par ordinateur", "Apprentissage fédéré", "IA embarquée"],
    status: "Stage PFE dès février 2027",
    mobility: "Maroc, France ou Allemagne",
    cv: { label: "Télécharger le CV", href: CV_FR, srContext: "(PDF)" },
    contact: "Me contacter",
    portrait: { ...PORTRAIT, alt: "Yassine Fartassi, souriant, lors d'un salon technologique" },
    portraitPending: "Photo à venir",
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
      figures: "Chiffres clés",
    },
    flagships: [
      {
        id: "nexus",
        name: "NEXUS",
        subtitle: "Prototype de recherche : analyse d'images de santé et apprentissage fédéré",
        warning:
          "Prototype de recherche. Ce n'est pas un dispositif médical : il ne fournit ni diagnostic ni avis médical.",
        problem:
          "Étudier si l'on peut classer des images de peau et d'œil et estimer le rythme cardiaque sans contact, sans jamais centraliser d'images de personnes.",
        built:
          "Une même chaîne d'IA (dermatologie, ophtalmologie, rPPG) exécutée en local sur une application web, une application mobile Flutter et un Raspberry Pi 5, reliée à un serveur d'apprentissage fédéré (FedAvg) qui n'échange que des poids de modèles.",
        // TODO(fact): confirmer que NEXUS est un projet individuel, sinon préciser le rôle.
        doc: { label: "Lire la fiche technique", href: DOCS.nexusFr, srContext: "de NEXUS (PDF)" },
        demo: { label: "Essayer la démo", href: "/demo/nexus/", srContext: "du module rPPG de NEXUS" },
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
        // Chiffres tirés du dépôt public : README (« Model status »), docs/model_cards.md
        // et figures/latency_comparison_3platforms_fr.png (n = 30 exécutions).
        figures: [
          { value: "≈\u00a095,9\u00a0%", label: "d'exactitude du modèle oculaire (5 classes, 344 images d'évaluation)" },
          { value: "48\u00a0ms", label: "par inférence oculaire sur Raspberry\u00a0Pi\u00a05 (moyenne de 30 exécutions)" },
          { value: "3", label: "plateformes avec les mêmes modèles ONNX : web, mobile, embarqué" },
        ],
        flow: {
          label: "Architecture de NEXUS",
          stages: [
            { title: "Capture", items: ["Application web", "Mobile Flutter", "Raspberry\u00a0Pi\u00a05"] },
            { title: "Inférence locale", items: ["Dermatologie", "Ophtalmologie", "rPPG"] },
            { title: "Apprentissage fédéré", items: ["Serveur Flower (FedAvg)", "Poids uniquement, aucune image"] },
          ],
        },
      },
      {
        id: "fatigue",
        name: "Détection de fatigue du conducteur",
        subtitle: "Fatigue et micro-sommeil en temps réel sur Raspberry\u00a0Pi\u00a05",
        badge: `Brevet déposé · ${PATENT.office} ${PATENT.year} · n° ${PATENT.number}`,
        problem:
          "Repérer à temps la fatigue et les micro-sommeils d'un conducteur, sans dépendre d'une connexion au cloud.",
        // Décrit comme le dépôt public : repères faciaux dlib (EAR/MAR) + capteur cardiaque.
        built:
          "Un système embarqué qui suit les yeux et la bouche (repères faciaux dlib, ratios EAR/MAR), compte clignements et bâillements, lit la fréquence et la variabilité cardiaques d'un capteur, puis fusionne ces signaux en un score de fatigue pondéré avec alertes sonores graduées et tableau de bord.",
        // TODO(fact): confirmer que le projet est individuel, sinon préciser le rôle.
        stack: ["Python", "OpenCV", "dlib", "Raspberry Pi 5", "GPIO", "Capteur cardiaque"],
        links: [
          { label: "Code source", href: REPOS.fatigue, srContext: "du détecteur de fatigue sur GitHub" },
        ],
        doc: { label: "Lire la fiche technique", href: DOCS.fatigueFr, srContext: "du détecteur de fatigue (PDF)" },
        demo: { label: "Essayer la démo", href: "/demo/fatigue/", srContext: "du détecteur de fatigue" },
        // Chiffres tirés du code du dépôt public (modules/fatigue_fusion.py), qui fait foi :
        // le README du dépôt annonce encore 7 indicateurs et 0,5 s.
        // Ce sont des paramètres de conception, pas des résultats mesurés.
        figures: [
          { value: "5", label: "indicateurs fusionnés en un score de fatigue pondéré" },
          { value: "2\u00a0s", label: "d'yeux fermés déclenchent l'alerte de micro-sommeil" },
          { value: "100\u00a0%", label: "du traitement en local, sans cloud" },
        ],
        flow: {
          label: "Chaîne de traitement du détecteur de fatigue",
          stages: [
            { title: "Capteurs", items: ["Caméra", "Capteur cardiaque"] },
            { title: "Signaux", items: ["Yeux (EAR, PERCLOS)", "Bâillements (MAR)", "Fréquence et variabilité cardiaques"] },
            { title: "Fusion", items: ["Score de fatigue pondéré"] },
            { title: "Sorties", items: ["Alertes sonores graduées", "Tableau de bord"] },
          ],
        },
        // TODO(fact): résultats mesurés (taux de détection, images par seconde sur Raspberry Pi 5).
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

  // Source : CV_Yassine_Fartassi_fr.pdf (novembre 2026).
  experience: {
    heading: "Expérience",
    entries: [
      {
        company: "4D Business Consulting (4DBC)",
        role: "Développement logiciel et IoT",
        period: "Mai – juil. 2025",
        location: "Équipe KSF Space, Venezuela · À distance",
        bullets: [
          "Contribution au traitement et à la visualisation de la télémétrie d'un CubeSat : transformation des données brutes en informations exploitables pour le suivi et l'analyse.",
          "Participation à l'intégration matérielle et logicielle, aux tests et à la validation.",
          "Développement logiciel et firmware avec les protocoles LoRa, MQTT et UART.",
        ],
      },
      {
        company: "Atner",
        role: "Développement d'applications et automatisation",
        period: "Avr. 2023 – juin 2024",
        location: "Rabat, Maroc",
        bullets: [
          "Développement d'outils internes pour les RH et automatisation du traitement documentaire.",
          "Contribution à une application comptable facilitant le suivi des blocages financiers.",
          "Automatisation du suivi des achats, du fournisseur au chantier, avec PowerShell, Sage et Excel : meilleure traçabilité et meilleur suivi des projets entre départements.",
        ],
      },
      {
        company: "Afrogotech",
        role: "Développement web et mobile",
        period: "Déc. 2022 – févr. 2023",
        location: "Rabat, Maroc",
        bullets: [
          "Développement et déploiement du site vitrine de l'entreprise.",
          "Application mobile de gestion de flotte : suivi du carburant et de la vitesse, commandes de démarrage et d'arrêt.",
          "Traitement et présentation des données issues d'API.",
        ],
      },
    ],
  },

  // Le nom de l'école n'apparaît qu'ici (règle CLAUDE.md).
  education: {
    heading: "Formation",
    entries: [
      {
        degree: "Cycle d'ingénieur d'État en intelligence artificielle",
        school: "ISMAGI",
        period: "Oct. 2025 – juil. 2027",
        location: "Rabat, Maroc",
        note: "En cours",
      },
      {
        degree: "Licence professionnelle en IoT et systèmes intelligents",
        school: "ISMAGI",
        period: "Oct. 2024 – juil. 2025",
        location: "Rabat, Maroc",
      },
      {
        degree: "Diplôme de technicien spécialisé en développement informatique",
        school: "OFPPT NTIC",
        period: "Sept. 2020 – juil. 2022",
        location: "Rabat, Maroc",
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
        items: ["OpenCV", "MediaPipe", "YOLOv8", "dlib", "EfficientNetV2, ResNet-18", "rPPG"],
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
    // Source : CV_Yassine_Fartassi_fr.pdf.
    languages: {
      heading: "Langues",
      items: [
        { name: "Arabe", level: "Langue maternelle" },
        { name: "Français", level: "Professionnel" },
        { name: "Anglais", level: "Professionnel" },
      ],
    },
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
