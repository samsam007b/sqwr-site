# SQWR — Synthèse Méthodologique & Questionnaire Stratégique

## Basé sur 4 axes de recherche :
1. **Psychologie cognitive du luxe** — Kapferer, Kahneman, Berlyne, Reber, Von Restorff
2. **Méthodologie créative** — Pentagram, Sagmeister & Walsh, GV Brand Sprint, Aaker
3. **Principes techniques** — GSAP, Lenis, typographie, théorie des couleurs, grilles
4. **Analyse Awwwards** — Resn, Dogstudio, 14islands, Order, Locomotive, Basic/Agency

---

## PARTIE 1 : SYNTHÈSE DES 9 PRINCIPES FONDATEURS

### Principe 1 — Le site est l'œuvre, pas la brochure
> *"The role of advertising is not to sell"* — Kapferer, Anti-loi #9

Le site sqwr.be ne doit pas vendre des services. Il doit être une **expérience en soi** — une démonstration vivante du talent de SQWR. Chaque pixel, chaque interaction, chaque transition est une preuve de compétence. Le visiteur qui ne deviendra jamais client doit quand même être impressionné (Anti-loi #4 : "Communiquer à ceux à qui on ne vendra jamais").

**Implication concrète :** Supprimer tout langage de vente, toute comparaison, tout CTA agressif. Le contact doit ressembler à une candidature, pas à un checkout.

---

### Principe 2 — Une seule convention brisée, tout le reste impeccable
> *"Optimal complexity lives on the inverted U-curve"* — Berlyne (1971)

Berlyne a démontré que le plaisir esthétique est maximal à un niveau de complexité intermédiaire. Trop simple = ennuyeux. Trop complexe = confus. La formule gagnante : **un système visuel très cohérent + une rupture délibérée**.

Order.design (ex-Pentagram) a gagné un SOTD avec ZÉRO animation. Resn a gagné avec 100% WebGL. Les deux fonctionnent parce que leur choix est **intentionnel et total**.

**Implication pour SQWR :** Choisir UNE convention à briser radicalement, et exécuter tout le reste avec une précision suisse.

---

### Principe 3 — SQWR = SQUARE : le carré comme ADN
> *"The problem contains its own solution"* — Michael Bierut, Pentagram

Le nom SQWR contient déjà l'identité. Le curseur carré, les GridSquare 3×3, le PixelMigrationIntro — tout converge vers le carré. Ce n'est pas un accident, c'est un **système** qui attend d'être formalisé.

Le carré est :
- **Architecturalement** : stabilité, précision, modernisme (De Stijl, Bauhaus)
- **Psychologiquement** : confiance, structure, fiabilité (étude Jiang et al., 2016)
- **Typographiquement** : grille, pixel, digital-native

---

### Principe 4 — Peak-End Rule : un seul moment exceptionnel
> *"People judge experiences by their peak and their end"* — Kahneman (1999)

Au lieu de saupoudrer des animations médiocres partout (ScrollReveal ×47), concentrer l'effort sur **UN moment peak** qui restera gravé + **polir la fin** (le footer).

Les sites primés Awwwards ont tous UN moment signature :
- Resn : les particules qui forment du texte
- Dogstudio : le chien 3D
- 14islands : la transition fluide
- Locomotive : le smooth scroll + parallax

**SQWR doit avoir son moment.** Candidats : l'explosion de pixels du ProjectCard, une transition de page en dissolution carrée, un hero en grille qui se réarrange.

---

### Principe 5 — Conspicuous Craft > Conspicuous Consumption
> *"Perceived production cost IS the Veblen signal in digital"* — Veblen appliqué au web

En luxe physique, le signal est le prix. En luxe digital, le signal est le **craft visible** — les détails que seul un visiteur attentif remarque. Le coût perçu de production.

Cela signifie :
- Courbes d'easing personnalisées (pas `ease-in-out` par défaut)
- Typographie avec vraie hiérarchie (pas tout en `font-weight: 400`)
- Micro-interactions intentionnelles (pas des hover génériques)
- Textures et matérialité (grain, ombres subtiles)

---

### Principe 6 — Processing Fluency = Beauté perçue
> *"Visual coherence triggers beauty judgment in < 3 seconds"* — Reber (2004)

La fluence de traitement (processing fluency) démontre que les choses faciles à traiter visuellement sont perçues comme plus belles ET plus fiables. C'est la base scientifique de la cohérence visuelle.

**Implication :** Chaque élément doit appartenir au même système de design. La glassmorphie, le grain, les carrés, les typographies — tout doit parler le même langage. Actuellement, sqwr.be mélange trop de vocabulaires visuels.

---

### Principe 7 — L'isolation crée la valeur (Von Restorff)
> *"A distinctive item among homogeneous items is better remembered"* — Von Restorff (1933)

Pour qu'un élément se distingue, il faut d'abord un **fond homogène**. La baseline doit être si cohérente que la moindre rupture devient mémorable.

**Application :** Si tout est animé, rien n'est spécial. Si 95% du site est sobre et typographique, et que le portfolio explose en interactions — le contraste crée la valeur.

---

### Principe 8 — La contrainte comme moteur créatif
> *"The best work comes from limitations"* — Sagmeister & Walsh

Les plus grands designers s'imposent des contraintes :
- Massimo Vignelli : 5 polices, 5 tailles
- Dieter Rams : 10 principes, jamais dérogé
- Bottega Veneta : supprimé TOUS ses réseaux sociaux → ventes +19%

**Contrainte proposée pour SQWR :** Le carré. Tout est carré. Les images, les boutons, les grilles, les transitions. Un seul ratio. Un seul shape language.

---

### Principe 9 — Le paradoxe du studio : invisibilité de la marque propre
> *"A studio's brand must be a container, not content"* — Pentagram philosophy

Le paradoxe : une agence créative doit montrer sa créativité sans voler la vedette à ses clients. 5 stratégies identifiées :
1. **Le caméléon** (Pentagram) : pas de style, le style c'est le client
2. **Le manifeste** (Sagmeister) : la personnalité du fondateur EST la marque
3. **Le méta-designer** (Collins) : montrer le processus, pas le résultat
4. **Le silent luxury** (Bottega) : le produit parle, la marque se tait
5. **Le showreel** (Resn) : le site EST la démonstration

**SQWR doit choisir une de ces postures.**

---

## PARTIE 2 : TECHNICAL STACK RECOMMANDÉ

| Composant | Actuel | Recommandé | Raison |
|-----------|--------|------------|--------|
| Animation | Framer Motion | **GSAP + Framer Motion** | GSAP pour ScrollTrigger/timelines, FM pour layout |
| Smooth Scroll | Aucun | **Lenis** | 7/10 sites primés l'utilisent |
| Page Transitions | Aucune | **Framer Motion AnimatePresence** | Intégré à Next.js App Router |
| Easing | ease-in-out défaut | **Customs** : `cubic-bezier(0.22, 1, 0.36, 1)` | Signal de craft premium |
| Typographie | 3 polices, hiérarchie plate | **2 polices, hiérarchie forte** | Moins = plus intentionnel |
| Grille | Symétrique | **Asymétrique mathématique** | Golden ratio ou rule of thirds |

---

## PARTIE 3 : QUESTIONNAIRE STRATÉGIQUE

Ce questionnaire s'inspire du **GV Brand Sprint** (Google Ventures), des **5 dimensions de personnalité de marque d'Aaker**, et de la méthodologie **"Find Your Weird"** de Jessica Walsh.

