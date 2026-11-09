"""Builds the project technical sheets (PDF) for the portfolio from the public repos."""
import sys, os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Image,
                                Table, TableStyle, KeepTogether, PageBreak)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image as PILImage

OUT, NEXUS, SITE = sys.argv[1], sys.argv[2], "yassinefartassi.github.io"
F = "/System/Library/Fonts/Supplemental/"
pdfmetrics.registerFont(TTFont("A", F + "Arial.ttf"))
pdfmetrics.registerFont(TTFont("AB", F + "Arial Bold.ttf"))
pdfmetrics.registerFont(TTFont("AI", F + "Arial Italic.ttf"))
pdfmetrics.registerFontFamily("A", normal="A", bold="AB", italic="AI", boldItalic="AB")

INK, CREAM, ORANGE, RUST, MUTED = (colors.HexColor(x) for x in ("#111111", "#F3EEE3", "#D9541E", "#A33B0C", "#504F4C"))
HAIR = colors.HexColor("#D9D3C6")
W, H = A4
M = 18 * mm
CW = W - 2 * M

st = lambda name, **k: ParagraphStyle(name, fontName=k.pop("fontName", "A"), textColor=k.pop("textColor", INK), alignment=TA_LEFT, **k)
S_KICK = st("kick", fontName="AB", fontSize=8.5, leading=11, textColor=RUST)
S_TITLE = st("title", fontName="AB", fontSize=24, leading=28, spaceAfter=3)
S_SUB = st("sub", fontSize=11.5, leading=15.5, textColor=MUTED, spaceAfter=8)
S_H = st("h", fontName="AB", fontSize=13.5, leading=17, spaceBefore=12, spaceAfter=5)
S_P = st("p", fontSize=9.6, leading=13.6, spaceAfter=5)
S_SM = st("sm", fontSize=8.2, leading=11, textColor=MUTED)
S_CAP = st("cap", fontName="AI", fontSize=8.2, leading=11, textColor=MUTED, spaceBefore=3, spaceAfter=8)
S_TD = st("td", fontSize=8.8, leading=11.6)
S_TH = st("th", fontName="AB", fontSize=8.6, leading=11.4)
S_BOX = st("box", fontSize=9.4, leading=13.2)
S_BIG = st("big", fontName="AB", fontSize=17, leading=20)
S_LI = st("li", fontSize=9.6, leading=13.6, leftIndent=10, bulletIndent=0, spaceAfter=2.5)

P = lambda t, s=S_P: Paragraph(t, s)

def img(path, width, max_h=None):
    w, h = PILImage.open(path).size
    hh = width * h / w
    if max_h and hh > max_h:
        width, hh = max_h * w / h, max_h
    i = Image(path, width=width, height=hh); i.hAlign = "LEFT"
    return i

def table(rows, widths, head=True):
    data = [[Paragraph(str(c), S_TH if (head and r == 0) else S_TD) for c in row] for r, row in enumerate(rows)]
    t = Table(data, colWidths=[CW * w for w in widths], repeatRows=1 if head else 0)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.5, HAIR),
        ("LINEBELOW", (0, 0), (-1, 0), 0.9, INK) if head else ("LINEBELOW", (0, 0), (-1, 0), 0.5, HAIR),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 4.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
    ]))
    return t

def box(title, text):
    t = Table([[[Paragraph(f"<b>{title}</b>", S_BOX), Spacer(1, 2), Paragraph(text, S_BOX)]]], colWidths=[CW])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), CREAM), ("LINEBEFORE", (0, 0), (0, -1), 3, ORANGE),
                           ("LEFTPADDING", (0, 0), (-1, -1), 11), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                           ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 9)]))
    return t

def figures(items):
    n = len(items)
    t = Table([[[Paragraph(v, S_BIG), Spacer(1, 2), Paragraph(l, S_SM)] for v, l in items]], colWidths=[CW / n] * n)
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEABOVE", (0, 0), (-1, 0), 0.9, INK),
                           ("LINEBELOW", (0, 0), (-1, 0), 0.5, HAIR), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 8),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 9)]))
    return t

def side(paths, caps, max_h=None):
    n = len(paths); w = (CW - 8 * (n - 1)) / n
    t = Table([[img(p, w, max_h) for p in paths], [Paragraph(c, S_CAP) for c in caps]], colWidths=[w + 8] * (n - 1) + [w])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    return t

def bullets(items):
    return [Paragraph(x, S_LI, bulletText="•") for x in items]

def build(filename, meta, story):
    def deco(c, d):
        c.saveState()
        c.setFillColor(ORANGE); c.rect(0, H - 5, W, 5, stroke=0, fill=1)
        c.setFont("A", 7.6); c.setFillColor(MUTED)
        c.drawString(M, 10 * mm, meta["footer"])
        c.drawRightString(W - M, 10 * mm, f"{meta['page']} {d.page}")
        c.restoreState()
    doc = BaseDocTemplate(os.path.join(OUT, filename), pagesize=A4, leftMargin=M, rightMargin=M, topMargin=16 * mm, bottomMargin=18 * mm,
                          title=meta["title"], author="Yassine Fartassi", subject=meta["subject"], creator="", lang=meta["lang"])
    doc.addPageTemplates(PageTemplate(id="p", frames=[Frame(M, 18 * mm, CW, H - 34 * mm, id="f", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)], onPage=deco))
    doc.build(story)
    print("wrote", filename)

fig = lambda n: os.path.join(NEXUS, "figures", n)
shot = lambda n: os.path.join(NEXUS, "Screenshot_app", n)

# ───────────────────────── NEXUS ─────────────────────────
def nexus(L):
    fr = L == "fr"
    T = lambda a, b: a if fr else b
    s = []
    s += [P(T("FICHE TECHNIQUE · PROJET", "TECHNICAL SHEET · PROJECT"), S_KICK), P("NEXUS", S_TITLE),
          P(T("Prototype de recherche : analyse d'images de peau et d'œil, mesure du rythme cardiaque sans contact et apprentissage fédéré, sur le web, sur mobile et sur Raspberry Pi 5.",
              "Research prototype: skin and eye image analysis, contactless heart-rate measurement and federated learning, on the web, on mobile and on a Raspberry Pi 5."), S_SUB),
          box(T("NEXUS n'est pas un dispositif médical", "NEXUS is not a medical device"),
              T("C'est un prototype de recherche réalisé dans un cadre étudiant. Il n'est ni certifié ni validé cliniquement. Il ne fournit ni diagnostic, ni avis médical, ni dépistage fiable, et ses résultats peuvent être faux. Il ne doit pas servir à prendre une décision de santé. En cas de doute sur votre santé, consultez un professionnel de santé.",
                "It is a research prototype built as a student project. It is not certified and has not been clinically validated. It gives no diagnosis, no medical advice and no reliable screening, and its results can be wrong. It must not be used to make a health decision. If you have a concern about your health, see a healthcare professional.")),
          Spacer(1, 10),
          figures([("≈ 95,9 %" if fr else "≈ 95.9%", T("exactitude du modèle oculaire, 5 classes, 344 images d'évaluation", "eye-model accuracy, 5 classes, 344 evaluation images")),
                   ("61,6 %" if fr else "61.6%", T("exactitude du modèle de peau, 11 classes (tâche plus difficile)", "skin-model accuracy, 11 classes (a harder task)")),
                   ("48 ms", T("par inférence oculaire sur Raspberry Pi 5, moyenne de 30 exécutions", "per eye inference on Raspberry Pi 5, mean of 30 runs")),
                   ("3", T("plateformes avec les mêmes fichiers ONNX : web, mobile, embarqué", "platforms sharing the same ONNX files: web, mobile, edge"))]),
          P(T("1. Ce que fait le système", "1. What the system does"), S_H),
          P(T("La même chaîne d'inférence tourne en local sur trois plateformes : une application web (Streamlit), une application mobile (Flutter, Android) et un Raspberry Pi 5. Un serveur d'apprentissage fédéré (Flower, FedAvg) agrège des poids de modèles. Les images brutes ne quittent jamais l'appareil qui les a capturées.",
              "The same inference chain runs locally on three platforms: a web app (Streamlit), a mobile app (Flutter, Android) and a Raspberry Pi 5. A federated learning server (Flower, FedAvg) aggregates model weights. Raw images never leave the device that captured them.")),
          img(fig(T("system_architecture_fr.png", "system_architecture.png")), CW, 95 * mm),
          P(T("Figure 1. Architecture globale. Source : dépôt public du projet.", "Figure 1. Overall architecture. Source: the project's public repository."), S_CAP),
          PageBreak(),
          P(T("2. Modèles et résultats", "2. Models and results"), S_H),
          table([[T("Module", "Module"), T("Modèle", "Model"), T("Classes", "Classes"), T("Résultat", "Result"), T("À savoir", "Notes")],
                 [T("Oculaire", "Eye"), "ResNet-18 (PyTorch) → ONNX", "5", T("≈ 95,9 % d'exactitude", "≈ 95.9% accuracy"),
                  T("F1 par classe ≥ 0,93. Matrice de confusion sur 344 images. Le dépôt précise qu'il reste à confirmer s'il s'agit d'un vrai jeu de test ou d'un jeu de validation.",
                    "Per-class F1 ≥ 0.93. Confusion matrix over 344 images. The repository notes it is not yet confirmed whether this is a true held-out test set or a validation split.")],
                 [T("Peau", "Skin"), "EfficientNetV2-S (TensorFlow/Keras) → ONNX", "11", T("61,6 % d'exactitude", "61.6% accuracy"),
                  T("Précision 0,79 et rappel 0,46 (macro). Classe la plus faible : psoriasis (F1 0,39). 42 époques, affinage à partir de l'époque 31.",
                    "Precision 0.79 and recall 0.46 (macro). Weakest class: psoriasis (F1 0.39). 42 epochs, fine-tuning from epoch 31.")],
                 ["rPPG", T("CHROM et POS, traitement du signal, aucun poids entraîné", "CHROM and POS, signal processing, no trained weights"), "–",
                  T("73,4 BPM retrouvés pour 72 BPM injectés", "73.4 BPM recovered for 72 BPM injected"),
                  T("Mesuré sur un clip synthétique uniquement. Pas encore comparé à un oxymètre de pouls sur une vraie personne.",
                    "Measured on a synthetic clip only. Not yet compared with a pulse oximeter on a real person.")]],
                [0.11, 0.24, 0.09, 0.2, 0.36]),
          Spacer(1, 10),
          side([fig(T("ocular_confusion_matrix_fr.png", "ocular_confusion_matrix.png")), fig(T("dermatology_confusion_matrix_fr.png", "dermatology_confusion_matrix.png"))],
               [T("Figure 2. Matrice de confusion, modèle oculaire (5 classes).", "Figure 2. Confusion matrix, eye model (5 classes)."),
                T("Figure 3. Matrice de confusion, modèle de peau (11 classes).", "Figure 3. Confusion matrix, skin model (11 classes).")], 78 * mm),
          img(fig(T("dermatology_learning_curves_fr.png", "dermatology_learning_curves.png")), CW, 62 * mm),
          P(T("Figure 4. Courbes d'apprentissage du modèle de peau.", "Figure 4. Learning curves of the skin model."), S_CAP),
          PageBreak(),
          P(T("3. Mesures sur les trois plateformes", "3. Measurements on the three platforms"), S_H),
          P(T("30 exécutions chronométrées par plateforme, après 5 exécutions de préchauffe écartées.", "30 timed runs per platform, after 5 discarded warm-up runs.")),
          table([[T("Plateforme", "Platform"), T("Latence peau", "Skin latency"), T("Latence œil", "Eye latency"), T("Mémoire peau", "Skin memory"), T("Mémoire œil", "Eye memory"), T("Chargement peau", "Skin load"), T("Chargement œil", "Eye load")],
                 ["Web (Streamlit)", "46 ms", "16 ms", T("229 Mo", "229 MB"), T("173 Mo", "173 MB"), "802 ms", "135 ms"],
                 ["Mobile (Flutter)", "386 ms", "245 ms", T("487 Mo", "487 MB"), T("442 Mo", "442 MB"), "3 143 ms" if fr else "3,143 ms", "409 ms"],
                 ["Raspberry Pi 5", "105 ms", "48 ms", T("250 Mo", "250 MB"), T("229 Mo", "229 MB"), "1 263 ms" if fr else "1,263 ms", "39 ms"]],
                [0.2, 0.13, 0.13, 0.14, 0.13, 0.15, 0.12]),
          Spacer(1, 8),
          img(fig("latency_comparison_3platforms_fr.png"), CW, 70 * mm),
          P(T("Figure 5. Latence, mémoire et temps de chargement sur les trois plateformes.", "Figure 5. Latency, memory and load time on the three platforms (figure labels are in French)."), S_CAP),
          P(T("Sur 6 images testées à l'identique sur les trois plateformes, 5 donnent exactement la même prédiction. Le seul écart est une erreur du modèle lui-même, pas un défaut de portage.",
              "Of 6 images tested identically on the three platforms, 5 give exactly the same prediction. The one mismatch is an error of the model itself, not a porting defect.")),
          P(T("4. Apprentissage fédéré", "4. Federated learning"), S_H),
          P(T("Deux clients s'entraînent en local et n'envoient que des poids au serveur (FedAvg). Sur 3 tours, mesurés sur des données réelles mises de côté, le modèle de peau reste autour de 59 % et le modèle oculaire entre 99,5 % et 99,7 %. Les performances se maintiennent donc en régime fédéré. Sur mobile, l'entraînement n'est pas réalisé sur l'appareil : l'écran affiche l'historique réel du serveur.",
              "Two clients train locally and send only weights to the server (FedAvg). Over 3 rounds, measured on held-out real data, the skin model stays around 59% and the eye model between 99.5% and 99.7%. Performance therefore holds in a federated setting. On mobile, training does not run on the device: the screen shows the server's real history.")),
          img(fig("fl_convergence_real_fr.png"), CW, 62 * mm),
          P(T("Figure 6. Convergence de l'apprentissage fédéré sur données réelles.", "Figure 6. Federated learning convergence on real data (figure labels are in French)."), S_CAP),
          PageBreak(),
          P(T("5. Captures d'écran", "5. Screenshots"), S_H),
          P(T("Captures issues du dépôt public. Les images d'entrée y sont volontairement floutées.", "Screenshots from the public repository. The input images are blurred there on purpose.")),
          img(shot("streamlit/streamlit_ocular_tab.png"), CW, 50 * mm),
          P(T("Figure 7. Application web, onglet oculaire : image importée et scores par classe.", "Figure 7. Web app, eye tab: uploaded image and per-class scores."), S_CAP),
          side([shot("Mobile/mobile_home_screen.jpeg"), shot("Mobile/mobile_ocular_screen.jpeg"), shot("Mobile/mobile_rppg_screen.jpeg")],
               [T("Figure 8. Mobile : accueil.", "Figure 8. Mobile: home."), T("Figure 9. Mobile : module oculaire.", "Figure 9. Mobile: eye module."),
                T("Figure 10. Mobile : rPPG, estimations CHROM et POS.", "Figure 10. Mobile: rPPG, CHROM and POS estimates.")], 56 * mm),
          P(T("6. Matériel", "6. Hardware"), S_H),
          table([[T("Élément", "Item"), T("Rôle", "Role")],
                 ["Raspberry Pi 5", T("Déploiement embarqué : même code d'inférence et mêmes fichiers ONNX que l'application web.", "Edge deployment: same inference code and same ONNX files as the web app.")],
                 [T("Caméras", "Cameras"), T("Webcam USB, caméra IP ou module caméra du Raspberry Pi, au choix. Détection de visage MediaPipe avec repli automatique sur OpenCV (cascade de Haar).", "USB webcam, IP camera or the Raspberry Pi camera module. MediaPipe face detection with automatic fallback to OpenCV (Haar cascade).")],
                 [T("Téléphone Android", "Android phone"), T("Application Flutter avec ONNX Runtime en local, sans appel à un serveur pour l'inférence.", "Flutter app with on-device ONNX Runtime, no server call for inference.")]],
                [0.24, 0.76]),
          P(T("Le dépôt ne contient pas encore de photo du montage matériel.", "The repository does not yet contain a photo of the hardware setup."), S_CAP),
          KeepTogether([P(T("7. Limites connues", "7. Known limitations"), S_H)] + bullets([
              T("Le modèle de peau reste peu fiable (61,6 %) : onze affections visuellement proches.", "The skin model is still unreliable (61.6%): eleven visually similar conditions."),
              T("Le rPPG n'a pas encore été comparé à une mesure de référence sur une personne réelle.", "rPPG has not yet been compared with a reference measurement on a real person."),
              T("D'après ses auteurs, le jeu de données oculaire provient d'images en ligne, équilibrées par SMOTE : l'exactitude annoncée doit être lue avec prudence.", "According to its authors, the eye dataset comes from online images balanced with SMOTE: the reported accuracy should be read with caution."),
              T("Aucune validation clinique, aucune certification.", "No clinical validation, no certification.")])),
          KeepTogether([P(T("8. Sources et crédits", "8. Sources and credits"), S_H),
              P(T("Tous les chiffres et figures viennent du dépôt public : github.com/yassinefartassi/nexus-health-screening (README, docs/model_cards.md, figures/). Jeux de données : DermNet (dermnetnz.org, copie Kaggle de S. Goel) ; M. Ahmed, Image Dataset on Eye Diseases Classification, Mendeley Data, 2024. Algorithmes rPPG adaptés de rPPG-Toolbox (de Haan et Jeanne, 2013 ; Wang et al., 2017). Apprentissage fédéré : McMahan et al., 2017, avec Flower. Ni les jeux de données ni les poids des modèles ne sont publiés.",
                  "All numbers and figures come from the public repository: github.com/yassinefartassi/nexus-health-screening (README, docs/model_cards.md, figures/). Datasets: DermNet (dermnetnz.org, Kaggle copy by S. Goel); M. Ahmed, Image Dataset on Eye Diseases Classification, Mendeley Data, 2024. rPPG algorithms adapted from rPPG-Toolbox (de Haan and Jeanne, 2013; Wang et al., 2017). Federated learning: McMahan et al., 2017, with Flower. Neither the datasets nor the model weights are published."), S_SM)])]
    build(T("NEXUS_fiche_technique_fr.pdf", "NEXUS_technical_sheet_en.pdf"),
          dict(title=T("NEXUS · Fiche technique", "NEXUS · Technical sheet"), subject=T("Prototype de recherche, pas un dispositif médical", "Research prototype, not a medical device"), lang=L,
               footer=T(f"Yassine Fartassi · NEXUS, prototype de recherche, pas un dispositif médical · {SITE}", f"Yassine Fartassi · NEXUS, research prototype, not a medical device · {SITE}"), page="Page"), s)

# ───────────────────────── Fatigue ─────────────────────────
def fatigue(L):
    fr = L == "fr"
    T = lambda a, b: a if fr else b
    s = [P(T("FICHE TECHNIQUE · PROJET", "TECHNICAL SHEET · PROJECT"), S_KICK),
         P(T("Détection de fatigue du conducteur", "Driver fatigue detection"), S_TITLE),
         P(T("Fatigue et micro-sommeil en temps réel sur Raspberry Pi 5, sans connexion au cloud. Brevet déposé : OMPIC, 2025, n° 72322.",
             "Real-time fatigue and micro-sleep detection on a Raspberry Pi 5, with no cloud connection. Patent filed: OMPIC, 2025, no. 72322."), S_SUB),
         box(T("Prototype, pas un système de sécurité certifié", "A prototype, not a certified safety system"),
             T("Ce système est un prototype. Il ne remplace ni la vigilance du conducteur ni un équipement de sécurité homologué, et il ne mesure rien à des fins médicales. Les seuils ci-dessous sont des paramètres de conception : le dépôt ne publie pas encore de résultats mesurés (taux de détection, images par seconde).",
               "This system is a prototype. It replaces neither the driver's attention nor approved safety equipment, and it measures nothing for medical purposes. The thresholds below are design parameters: the repository does not yet publish measured results (detection rate, frames per second).")),
         Spacer(1, 10),
         figures([("5", T("indicateurs fusionnés en un score pondéré", "indicators fused into one weighted score")),
                  ("2 s", T("d'yeux fermés déclenchent l'alerte de micro-sommeil", "of closed eyes triggers the micro-sleep alert")),
                  ("3 + 1", T("niveaux d'alerte sonore, dont une alerte prioritaire", "sound alert levels, including one priority alert")),
                  ("100 %" if fr else "100%", T("du traitement en local", "of the processing runs locally"))]),
         P(T("1. Chaîne de traitement", "1. Processing chain"), S_H),
         table([[T("Étape", "Stage"), T("Contenu", "What happens")],
                [T("Capteurs", "Sensors"), T("Module caméra du Raspberry Pi (ou webcam USB) et capteur cardiaque à 3 broches.", "Raspberry Pi camera module (or USB webcam) and a 3-pin heart-rate sensor.")],
                [T("Signaux", "Signals"), T("Repères faciaux dlib à 68 points, puis ratios d'ouverture des yeux (EAR) et de la bouche (MAR). Fréquence cardiaque et variabilité (RMSSD).", "dlib 68-point facial landmarks, then eye (EAR) and mouth (MAR) aspect ratios. Heart rate and variability (RMSSD).")],
                [T("Fusion", "Fusion"), T("Somme pondérée de cinq indicateurs, donnant un score de fatigue. Un micro-sommeil force le score au niveau critique.", "Weighted sum of five indicators, giving a fatigue score. A micro-sleep forces the score to the critical level.")],
                [T("Sorties", "Outputs"), T("Buzzer à alertes graduées, tableau de bord en temps réel, journal de données en option.", "Buzzer with graded alerts, real-time dashboard, optional data log.")]],
               [0.18, 0.82]),
         P(T("2. Indicateurs et seuils", "2. Indicators and thresholds"), S_H),
         table([[T("Indicateur", "Indicator"), T("Repères", "Reference points"), T("Poids", "Weight")],
                [T("Fréquence des clignements", "Blink rate"), T("Normale : 12 à 20 par minute. Fatigue maximale sous 5 ou au-dessus de 30.", "Normal: 12 to 20 per minute. Maximum fatigue below 5 or above 30."), "35 %" if fr else "35%"],
                [T("Fréquence cardiaque", "Heart rate"), T("Normale : 60 à 100 BPM. Somnolence sous 50 BPM.", "Normal: 60 to 100 BPM. Drowsiness below 50 BPM."), "20 %" if fr else "20%"],
                [T("Bâillements (MAR)", "Yawns (MAR)"), T("MAR > 0,6. Normal : 0 ou 1 en 5 minutes ; fatigue élevée à partir de 4.", "MAR > 0.6. Normal: 0 or 1 in 5 minutes; high fatigue from 4."), "20 %" if fr else "20%"],
                ["PERCLOS", T("Part du temps yeux fermés sur 1 minute. Éveillé sous 8 % ; fatigue sévère au-dessus de 30 %.", "Share of time with eyes closed over 1 minute. Alert below 8%; severe fatigue above 30%."), "15 %" if fr else "15%"],
                [T("Ouverture des yeux (EAR)", "Eye opening (EAR)"), T("EAR < 0,21 : œil fermé. Bien ouvert à partir de 0,30.", "EAR < 0.21: eye closed. Wide open from 0.30."), "10 %" if fr else "10%"],
                [T("Micro-sommeil", "Micro-sleep"), T("Yeux fermés pendant 2 s ou plus, visage détecté : le score passe à 80 % au moins.", "Eyes closed for 2 s or more with a face detected: the score rises to at least 80%."), T("Prioritaire", "Override")]],
               [0.3, 0.54, 0.16]),
         P(T("3. Niveaux d'alerte", "3. Alert levels"), S_H),
         table([[T("Niveau", "Level"), T("Score de fatigue", "Fatigue score"), T("Signal du buzzer", "Buzzer pattern")],
                [T("Faible", "Low"), T("Au-dessus de 25 %", "Above 25%"), T("2 bips courts", "2 short beeps")],
                [T("Moyen", "Medium"), T("À partir de 40 %", "From 40%"), T("3 bips moyens", "3 medium beeps")],
                [T("Élevé", "High"), T("À partir de 60 %", "From 60%"), T("5 bips rapides", "5 rapid beeps")],
                [T("Micro-sommeil", "Micro-sleep"), T("Prioritaire", "Priority"), T("10 bips rapides à volume maximal", "10 rapid beeps at full volume")]],
               [0.3, 0.3, 0.4]),
         PageBreak(),
         P(T("4. Matériel et câblage", "4. Hardware and wiring"), S_H),
         table([[T("Composant", "Component"), T("Branchement", "Connection")],
                ["Raspberry Pi 5", T("4 Go de mémoire ou plus recommandés.", "4 GB of memory or more recommended.")],
                [T("Module caméra Pi 2", "Pi Camera Module 2"), T("Ou webcam USB compatible.", "Or a compatible USB webcam.")],
                [T("Capteur cardiaque 3 broches", "3-pin heart-rate sensor"), T("VCC sur 3,3 V (broche 1), GND sur la masse (broche 6), signal sur GPIO 17 (broche 11).", "VCC to 3.3 V (pin 1), GND to ground (pin 6), signal to GPIO 17 (pin 11).")],
                [T("Buzzer actif", "Active buzzer"), T("VCC sur 5 V (broche 2), GND sur la masse (broche 14), signal sur GPIO 18 (broche 12, PWM).", "VCC to 5 V (pin 2), GND to ground (pin 14), signal to GPIO 18 (pin 12, PWM).")]],
               [0.34, 0.66]),
         P(T("Le dépôt ne contient pas encore de photo du montage ni de capture du tableau de bord.", "The repository does not yet contain a photo of the setup or a screenshot of the dashboard."), S_CAP),
         P(T("5. Logiciel", "5. Software"), S_H),
         P(T("Python, OpenCV, dlib, NumPy, SciPy, Flask pour le tableau de bord, RPi.GPIO. Un mode simulation permet de lancer le programme sans le matériel, et un mode sans écran affiche les résultats dans la console. Tous les seuils et poids se règlent dans config.py.",
             "Python, OpenCV, dlib, NumPy, SciPy, Flask for the dashboard, RPi.GPIO. A simulation mode runs the program without the hardware, and a headless mode prints results to the console. All thresholds and weights are set in config.py.")),
         KeepTogether([P(T("6. Limites connues", "6. Known limitations"), S_H)] + bullets([
             T("Pas encore de résultats mesurés publiés : taux de détection, fausses alertes, images par seconde.", "No measured results published yet: detection rate, false alerts, frames per second."),
             T("Les seuils sont des valeurs de conception, à régler selon la personne, la caméra et l'éclairage.", "The thresholds are design values, to be tuned to the person, the camera and the lighting."),
             T("Prototype non homologué pour un usage routier.", "A prototype that is not approved for road use.")])),
         KeepTogether([P(T("7. Sources", "7. Sources"), S_H),
             P(T("Toutes les informations viennent du dépôt public : github.com/yassinefartassi/driver-fatigue-detection. Les poids, seuils et niveaux d'alerte sont ceux du code (modules/fatigue_fusion.py, config.py). Code source sous licence MIT. Le modèle de repères faciaux dlib a ses propres conditions (usage non commercial) et n'est pas redistribué.",
                 "All information comes from the public repository: github.com/yassinefartassi/driver-fatigue-detection. The weights, thresholds and alert levels are those in the code (modules/fatigue_fusion.py, config.py). Source code under the MIT licence. The dlib facial landmark model has its own terms (non-commercial use) and is not redistributed."), S_SM)])]
    build(T("Detection_fatigue_fiche_technique_fr.pdf", "Driver_fatigue_technical_sheet_en.pdf"),
          dict(title=T("Détection de fatigue du conducteur · Fiche technique", "Driver fatigue detection · Technical sheet"), subject=T("Prototype, brevet déposé", "Prototype, patent filed"), lang=L,
               footer=T(f"Yassine Fartassi · Détection de fatigue, prototype · {SITE}", f"Yassine Fartassi · Driver fatigue detection, prototype · {SITE}"), page="Page"), s)

for L in ("fr", "en"):
    nexus(L); fatigue(L)
