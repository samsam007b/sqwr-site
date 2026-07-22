export interface ProjectMockup {
  navLeft: string[];
  navRight: string[];
  brandName: string;
  brandSub: string;
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  cta: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface ProjectLocale {
  categoryLabel: string;
  description: string;
  impact: string;
  services: string[];
  metrics?: string;
  process?: ProcessStep[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'branding' | 'web' | 'print' | 'social';
  categoryLabel: string;
  year: string;
  description: string;
  impact: string;
  services: string[];
  metrics?: string;
  process?: ProcessStep[];
  color: string;
  colors?: string[];   // palette complète du projet (optionnel, révélée au hover)
  image: string;
  video?: string;
  mockup?: ProjectMockup;
  url?: string;
  featured: boolean;
  translations?: {
    en: ProjectLocale;
    nl: ProjectLocale;
    de: ProjectLocale;
  };
}

export const projects: Project[] = [
  {
    id: 'villa-coladeira',
    title: 'Villa Coladeira',
    client: 'Villa Coladeira',
    category: 'web',
    categoryLabel: 'Web Design',
    year: '2025',
    description: 'Site vitrine multilingue pour une villa de luxe à São Vicente, Cap-Vert — 6 suites avec vue mer, piscine à débordement et expériences exclusives. Architecture Next.js avec internationalisation (FR/EN/NL/DE/PT), animations cinématographiques et design system inspiré de l\'océan atlantique.',
    impact: 'Une présence digitale à la hauteur de l\'expérience : visuels immersifs, vidéo cinemagraph en hero, et parcours de réservation simplifié. Le site positionne la villa dans le segment ultra-luxe et facilite les réservations directes depuis l\'Europe.',
    metrics: '5 langues · OCR intégré · Réservation Stripe — 1 plateforme unifiée',
    process: [
      {
        title: 'La découverte textile',
        body: 'Le premier rendu ressemblait à cent autres sites de villas — photos d\'eau turquoise, serif élégant, promesse générique. On a recommencé. La deuxième session de recherche nous a emmenés vers le pano, le textile artisanal capverdien tissé à la main selon des motifs géométriques centenaires à São Vicente. Ce n\'est pas une décoration locale : c\'est la signature culturelle de l\'île. Le design system est né de là.',
      },
      {
        title: 'Du motif au SVG paramétrique',
        body: 'Transformer des motifs textiles en éléments numériques n\'est pas de la vectorisation automatique. Chaque motif pano a une logique interne de grille et de répétition. On a analysé cette logique, puis reconstruit chaque pattern en SVG paramétrique — capable de se décaler, de se fondre, d\'animer à 60fps sans perdre sa cohérence structurelle.',
      },
      {
        title: 'La carte interactive, pas la galerie',
        body: 'Le brief initial : une galerie photo des suites avec description. Notre proposition : une carte SVG interactive de la villa où chaque zone cliquable révèle une suite, sa vue, son atmosphère. L\'argument au client : une galerie, on la fait défiler une fois. Une carte, on l\'explore. Les mêmes contenus — une logique d\'engagement radicalement différente.',
      },
      {
        title: '5 langues, une seule performance',
        body: 'Cibler l\'Europe entière depuis le Cap-Vert implique FR, EN, NL, DE et PT. Le défi : embarquer 5 bundles de traduction sans alourdir le Time-to-Interactive. Solution : moteur i18n custom, chargement sélectif par locale côté serveur, génération statique par route. Chaque langue charge aussi vite que si le site était monolingue.',
      },
    ],
    services: ['Web Design', 'Développement', 'Multilingue (5 langues)', 'Vidéo cinemagraph', 'SEO', 'Déploiement'],
    color: '#1B3A4B',
    colors: ['#1B3A4B', '#2E86AB', '#C4A882', '#F0E6D3'],
    image: '/projet-villa-coladeira/hero.jpg',
    video: '/projet-villa-coladeira/hero-cinemagraph.mp4',
    mockup: {
      navLeft: ['La Villa', 'Chambres'],
      navRight: ['Expériences', 'Réserver'],
      brandName: 'Villa Coladeira',
      brandSub: 'São Vicente, Cap-Vert',
      eyebrow: 'Cap-Vert · Luxe · Vue mer',
      heroTitle: 'Là où l\'Atlantique\nrencontre le ciel',
      heroSub: 'Villa privée · Piscine à débordement · 6 suites',
      cta: 'Découvrir la villa',
    },
    featured: true,
    translations: {
      en: {
        categoryLabel: 'Web Design',
        description: 'Multilingual showcase website for a luxury villa in São Vicente, Cape Verde — 6 suites with sea views, infinity pool and exclusive experiences. Next.js architecture with internationalisation (FR/EN/NL/DE/PT), cinematic animations and Atlantic ocean-inspired design system.',
        impact: 'A digital presence worthy of the experience: immersive visuals, cinemagraph hero video, and simplified booking journey. The site positions the villa in the ultra-luxury segment and facilitates direct bookings from Europe.',
        metrics: '5 languages · Integrated OCR · Stripe booking — 1 unified platform',
        services: ['Web Design', 'Development', 'Multilingual (5 languages)', 'Cinemagraph video', 'SEO', 'Deployment'],
        process: [
          {
            title: 'The textile discovery',
            body: 'The first render looked like a hundred other villa websites — turquoise water photos, elegant serif, generic promise. We started over. The second research session led us to pano, the Cape Verdean handwoven textile made from centuries-old geometric patterns in São Vicente. This isn\'t local decoration: it\'s the cultural signature of the island. The design system grew from there.',
          },
          {
            title: 'From textile pattern to parametric SVG',
            body: 'Turning textile patterns into digital elements isn\'t automated vectorisation. Each pano motif has an internal grid and repetition logic. We analysed that logic, then rebuilt every pattern as parametric SVG — capable of shifting, blending, animating at 60fps without losing structural coherence.',
          },
          {
            title: 'The interactive map, not the gallery',
            body: 'Original brief: a photo gallery of the suites with descriptions. Our proposal: an interactive SVG map of the villa where each clickable zone reveals a suite, its view, its atmosphere. The argument to the client: a gallery, you scroll through once. A map, you explore. Same content — radically different engagement logic.',
          },
          {
            title: '5 languages, one performance',
            body: 'Targeting all of Europe from Cape Verde means FR, EN, NL, DE and PT. The challenge: loading 5 translation bundles without slowing Time-to-Interactive. Solution: custom i18n engine, server-side selective locale loading, static generation per route. Every language loads as fast as if the site were monolingual.',
          },
        ],
      },
      nl: {
        categoryLabel: 'Web Design',
        description: 'Meertalige showcase-website voor een luxevilla in São Vicente, Kaapverdië — 6 suites met zeezicht, overloopzwembad en exclusieve ervaringen. Next.js-architectuur met internationalisering (FR/EN/NL/DE/PT), cinematografische animaties en door de Atlantische Oceaan geïnspireerd ontwerpsysteem.',
        impact: 'Een digitale aanwezigheid die recht doet aan de ervaring: meeslepende visuals, cinemagraph hero-video en vereenvoucigte reserveringsroute. De site positioneert de villa in het ultra-luxesegment en vergemakkelijkt directe boekingen vanuit Europa.',
        metrics: '5 talen · Geïntegreerde OCR · Stripe reservering — 1 geünificeerd platform',
        services: ['Web Design', 'Ontwikkeling', 'Meertalig (5 talen)', 'Cinemagraph video', 'SEO', 'Implementatie'],
        process: [
          {
            title: 'De textielontdekking',
            body: 'De eerste versie zag eruit als honderd andere villawebsites — foto\'s van turquoise water, elegante serif, generieke belofte. We begonnen opnieuw. De tweede onderzoekssessie bracht ons bij de pano, het Kaapverdische handgeweven textiel met eeuwenoude geometrische patronen uit São Vicente. Dit is geen lokale decoratie: het is de culturele handtekening van het eiland. Het ontwerpsysteem is daaruit geboren.',
          },
          {
            title: 'Van textielpatroon naar parametrische SVG',
            body: 'Textielpatronen omzetten naar digitale elementen is geen geautomatiseerde vectorisatie. Elk pano-motief heeft een interne raster- en herhalingslogica. We analyseerden die logica en herbouwden elk patroon als parametrische SVG — in staat om te verschuiven, samen te smelten, te animeren op 60fps zonder structurele coherentie te verliezen.',
          },
          {
            title: 'De interactieve kaart, niet de galerij',
            body: 'Oorspronkelijke briefing: een fotogalerij van de suites met beschrijvingen. Ons voorstel: een interactieve SVG-kaart van de villa waar elke klikbare zone een suite onthult, zijn uitzicht, zijn sfeer. Het argument aan de klant: een galerij scrol je één keer door. Een kaart verken je. Dezelfde inhoud — radicaal andere betrokkenheidslogica.',
          },
          {
            title: '5 talen, één performance',
            body: 'Heel Europa targeten vanuit Kaapverdië betekent FR, EN, NL, DE en PT. De uitdaging: 5 vertalingsbundels laden zonder de Time-to-Interactive te vertragen. Oplossing: aangepaste i18n-engine, server-side selectief laden van locale, statische generatie per route. Elke taal laadt even snel als een eentalige website.',
          },
        ],
      },
      de: {
        categoryLabel: 'Web Design',
        description: 'Mehrsprachige Showcase-Website für eine Luxusvilla in São Vicente, Kap Verde — 6 Suiten mit Meerblick, Infinity-Pool und exklusiven Erlebnissen. Next.js-Architektur mit Internationalisierung (FR/EN/NL/DE/PT), filmischen Animationen und vom Atlantik inspiriertem Designsystem.',
        impact: 'Eine digitale Präsenz, die dem Erlebnis gerecht wird: immersive Visuals, Cinemagraph-Hero-Video und vereinfachter Buchungsprozess. Die Website positioniert die Villa im Ultra-Luxus-Segment und erleichtert Direktbuchungen aus Europa.',
        metrics: '5 Sprachen · Integrierte OCR · Stripe-Buchung — 1 einheitliche Plattform',
        services: ['Web Design', 'Entwicklung', 'Mehrsprachig (5 Sprachen)', 'Cinemagraph-Video', 'SEO', 'Deployment'],
        process: [
          {
            title: 'Die Textilentdeckung',
            body: 'Das erste Ergebnis sah aus wie hundert andere Villawebsites — Fotos von türkisblauem Wasser, elegante Serifenschrift, generisches Versprechen. Wir fingen von vorne an. Die zweite Recherchesitzung führte uns zum Pano, dem handgewebten kapverdischen Textil mit jahrhundertealten geometrischen Mustern aus São Vicente. Das ist keine lokale Dekoration: es ist die kulturelle Signatur der Insel. Das Designsystem entstand daraus.',
          },
          {
            title: 'Vom Textilmuster zur parametrischen SVG',
            body: 'Textilmuster in digitale Elemente umzuwandeln ist keine automatisierte Vektorisierung. Jedes Pano-Motiv hat eine interne Raster- und Wiederholungslogik. Wir analysierten diese Logik und rekonstruierten jedes Muster als parametrische SVG — fähig zu verschieben, zu überblenden, bei 60fps zu animieren ohne strukturelle Kohärenz zu verlieren.',
          },
          {
            title: 'Die interaktive Karte, nicht die Galerie',
            body: 'Ursprüngliches Briefing: eine Fotogalerie der Suiten mit Beschreibungen. Unser Vorschlag: eine interaktive SVG-Karte der Villa, wo jede anklickbare Zone eine Suite enthüllt, ihre Aussicht, ihre Atmosphäre. Das Argument an den Kunden: durch eine Galerie scrollt man einmal. Eine Karte erkundet man. Gleicher Inhalt — radikal andere Engagement-Logik.',
          },
          {
            title: '5 Sprachen, eine Performance',
            body: 'Ganz Europa von Kap Verde aus anzusprechen bedeutet FR, EN, NL, DE und PT. Die Herausforderung: 5 Übersetzungspakete laden ohne die Time-to-Interactive zu verlangsamen. Lösung: benutzerdefinierte i18n-Engine, serverseitiges selektives Locale-Laden, statische Generierung pro Route. Jede Sprache lädt so schnell wie eine einsprachige Website.',
          },
        ],
      },
    },
  },
  {
    id: 'izzico',
    title: 'izzico',
    client: 'Projet fondateur',
    category: 'branding',
    categoryLabel: 'Branding & Product',
    year: '2025',
    description: 'Création complète d\'une marque tech from scratch — brand identity, design system (typographie, couleurs, grille), UI/UX de l\'application web et développement de l\'app iOS. Le projet le plus ambitieux du studio : une vision cohérente du logo jusqu\'à l\'expérience produit.',
    impact: 'izzico représente l\'aboutissement d\'une démarche créative totale — chaque décision visuelle découle d\'une réflexion stratégique. Du naming au design system en passant par l\'expérience mobile, ce projet pose les fondations d\'une marque appelée à lever des fonds et à s\'imposer sur son marché.',
    metrics: 'Branding complet + app iOS & web — de la page blanche au TestFlight',
    services: ['Brand Identity', 'Design System', 'Font & Color System', 'UI/UX Design', 'Web App', 'iOS App'],
    color: '#9c5698',
    colors: ['#9c5698', '#E87C4E', '#F2C94C', '#4A90D9'],
    image: '/projet-izzico/web-hero-live.png',
    mockup: {
      navLeft: ['Seekers', 'Residents'],
      navRight: ['Owners', 'Contact'],
      brandName: 'izzico',
      brandSub: 'Co-living, réinventé',
      eyebrow: 'App iOS & Web · Co-living',
      heroTitle: 'Trouvez votre\ncommunauté',
      heroSub: 'Matching · Colocation · Gestion propriétaire',
      cta: 'Rejoindre izzico',
    },
    featured: true,
    translations: {
      en: {
        categoryLabel: 'Branding & Product',
        description: 'Complete creation of a tech brand from scratch — brand identity, design system (typography, colors, grid), web app UI/UX and iOS app development. The studio\'s most ambitious project: a coherent vision from logo to product experience.',
        impact: 'izzico represents the culmination of a total creative approach — every visual decision stems from strategic thinking. From naming to design system through the mobile experience, this project lays the foundations of a brand set to raise funds and establish itself in its market.',
        metrics: 'Full branding + iOS & web app — from blank page to TestFlight',
        services: ['Brand Identity', 'Design System', 'Font & Color System', 'UI/UX Design', 'Web App', 'iOS App'],
      },
      nl: {
        categoryLabel: 'Branding & Product',
        description: 'Volledige creatie van een tech-merk from scratch — merkidentiteit, ontwerpsysteem (typografie, kleuren, raster), web-app UI/UX en iOS-app-ontwikkeling. Het meest ambitieuze project van het studio: een coherente visie van logo tot productervaring.',
        impact: 'izzico vertegenwoordigt de culminatie van een totale creatieve aanpak — elke visuele beslissing vloeit voort uit strategisch denken. Van naamgeving tot ontwerpsysteem via de mobiele ervaring legt dit project de basis van een merk dat fondsen wil werven en zich wil vestigen op zijn markt.',
        metrics: 'Volledige branding + iOS & web app — van blanco pagina tot TestFlight',
        services: ['Merkidentiteit', 'Ontwerpsysteem', 'Font & Kleursysteem', 'UI/UX Design', 'Web App', 'iOS App'],
      },
      de: {
        categoryLabel: 'Branding & Produkt',
        description: 'Vollständige Erstellung einer Tech-Marke from scratch — Markenidentität, Designsystem (Typografie, Farben, Raster), Web-App UI/UX und iOS-App-Entwicklung. Das ambitionierteste Projekt des Studios: eine kohärente Vision vom Logo bis zur Produkterfahrung.',
        impact: 'izzico repräsentiert den Höhepunkt eines totalen kreativen Ansatzes — jede visuelle Entscheidung ergibt sich aus strategischem Denken. Von der Namensgebung über das Designsystem bis zur mobilen Erfahrung legt dieses Projekt das Fundament einer Marke, die Investitionen gewinnen und sich auf ihrem Markt etablieren will.',
        metrics: 'Vollständiges Branding + iOS & Web App — von der leeren Seite bis TestFlight',
        services: ['Markenidentität', 'Designsystem', 'Schrift & Farbsystem', 'UI/UX Design', 'Web App', 'iOS App'],
      },
    },
  },
  {
    id: 'la-villa',
    title: 'La Villa',
    client: 'Fondation Culturelle',
    category: 'branding',
    categoryLabel: 'Branding',
    year: '2024',
    description: 'Identité visuelle complète pour une fondation culturelle du Jura suisse — en collaboration avec mon frère. Logo, charte graphique, système d\'illustrations géométriques et déclinaisons sur l\'ensemble des supports : affiches, flyers, posts Instagram.',
    impact: 'Une identité forte et mémorable qui a permis à la fondation de s\'imposer visuellement dans le paysage culturel régional. Le système d\'illustrations géométriques crée une reconnaissance immédiate sur tous les supports, du digital au print.',
    metrics: 'Système d\'identité modulaire — déclinaisons infinies, cohérence garantie',
    services: ['Logo Design', 'Charte Graphique', 'Direction Artistique', 'Illustration', 'Print Design', 'Social Media'],
    color: '#0000FF',
    image: '/projet-la-villa/hero-triptyque.png',
    featured: true,
    translations: {
      en: {
        categoryLabel: 'Branding',
        description: 'Complete visual identity for a cultural foundation in the Swiss Jura — in collaboration with my brother. Logo, brand guidelines, geometric illustration system and applications across all materials: posters, flyers, Instagram posts.',
        impact: 'A strong and memorable identity that allowed the foundation to establish itself visually in the regional cultural landscape. The geometric illustration system creates immediate recognition across all formats, from digital to print.',
        metrics: 'Modular identity system — infinite variations, guaranteed consistency',
        services: ['Logo Design', 'Brand Guidelines', 'Art Direction', 'Illustration', 'Print Design', 'Social Media'],
      },
      nl: {
        categoryLabel: 'Branding',
        description: 'Volledige visuele identiteit voor een culturele stichting in de Zwitserse Jura — in samenwerking met mijn broer. Logo, huisstijlgids, geometrisch illustratiesysteem en toepassingen op alle dragers: posters, flyers, Instagram-posts.',
        impact: 'Een sterke en gedenkwaardige identiteit die de stichting in staat stelde zich visueel te vestigen in het regionale culturele landschap. Het geometrische illustratiesysteem zorgt voor onmiddellijke herkenning op alle formaten, van digitaal tot print.',
        metrics: 'Modulair identiteitssysteem — oneindige variaties, gegarandeerde consistentie',
        services: ['Logo Design', 'Huisstijlgids', 'Art Direction', 'Illustratie', 'Print Design', 'Social Media'],
      },
      de: {
        categoryLabel: 'Branding',
        description: 'Vollständige visuelle Identität für eine Kulturstiftung im Schweizer Jura — in Zusammenarbeit mit meinem Bruder. Logo, Corporate Design, geometrisches Illustrationssystem und Anwendungen auf allen Medien: Plakate, Flyer, Instagram-Posts.',
        impact: 'Eine starke und einprägsame Identität, die es der Stiftung ermöglichte, sich visuell in der regionalen Kulturlandschaft zu etablieren. Das geometrische Illustrationssystem schafft sofortige Wiedererkennung auf allen Formaten, von Digital bis Print.',
        metrics: 'Modulares Identitätssystem — unendliche Variationen, garantierte Konsistenz',
        services: ['Logo Design', 'Corporate Design', 'Art Direction', 'Illustration', 'Print Design', 'Social Media'],
      },
    },
  },
  {
    id: 'aw-construct',
    title: 'A.W Construct',
    client: 'Amaury Waty',
    category: 'web',
    categoryLabel: 'Site Web',
    year: '2026',
    description: 'Refonte complète du site d\'une entreprise générale de construction à Bruxelles — 5 ans d\'expérience, plus de 70 chantiers réalisés (gros œuvre, rénovation complète, béton ciré, parquet). Le site précédent, monté sur un constructeur low-code, ne générait ni visibilité ni demandes de devis qualifiées.',
    impact: 'Une identité "blueprint industriel" — béton, structure, matière — qui traduit en ligne la rigueur du chantier réel. Architecture Next.js orientée conversion, galerie de chantiers organisée par corps de métier, et un parcours devis clair pour un secteur où la confiance se construit sur la preuve, pas la promesse.',
    metrics: '70+ chantiers réalisés · 5 ans d\'activité — traduits en un site qui convertit',
    services: ['Web Design', 'Développement Next.js', 'Direction Artistique', 'SEO local', 'Galerie chantiers', 'Devis en ligne'],
    color: '#0D0C0A',
    colors: ['#0D0C0A', '#E4DFD5', '#7A3322', '#5E5B54', '#BDB7AE'],
    image: '/projet-aw-construct/hero.png',
    mockup: {
      navLeft: ['Réalisations', 'Services'],
      navRight: ['À propos', 'Devis'],
      brandName: 'A.W Construct',
      brandSub: 'Bruxelles, Belgique',
      eyebrow: 'Construction générale · Bruxelles',
      heroTitle: 'La rigueur du\nchantier, en ligne',
      heroSub: '5 ans d\'activité · 70+ chantiers réalisés',
      cta: 'Voir le site',
    },
    url: 'https://aw-construct.com',
    featured: true,
    translations: {
      en: {
        categoryLabel: 'Web Design',
        description: 'Complete website redesign for a general contracting company in Brussels — 5 years of activity, 70+ completed projects (structural work, full renovation, polished concrete, parquet flooring). The previous site, built on a low-code platform, generated neither visibility nor qualified quote requests.',
        impact: 'An "industrial blueprint" identity — concrete, structure, matter — that translates the rigor of the actual jobsite online. Conversion-oriented Next.js architecture, a jobsite gallery organized by trade, and a clear quote pathway for an industry where trust is built on proof, not promises.',
        metrics: '70+ completed projects · 5 years of activity — turned into a site that converts',
        services: ['Web Design', 'Next.js Development', 'Art Direction', 'Local SEO', 'Jobsite Gallery', 'Online Quotes'],
      },
      nl: {
        categoryLabel: 'Webdesign',
        description: 'Volledige herwerking van de website van een algemeen aannemersbedrijf in Brussel — 5 jaar activiteit, 70+ afgeronde werven (ruwbouw, volledige renovatie, gepolierd beton, parket). De vorige site, gebouwd op een low-code platform, genereerde noch zichtbaarheid noch gekwalificeerde offerteaanvragen.',
        impact: 'Een "industrieel blauwdruk"-identiteit — beton, structuur, materie — die de striktheid van de echte werf online vertaalt. Conversiegerichte Next.js-architectuur, een werfgalerij per vakgebied georganiseerd, en een duidelijk offertetraject voor een sector waar vertrouwen op bewijs wordt gebouwd, niet op beloftes.',
        metrics: '70+ afgeronde werven · 5 jaar activiteit — omgezet in een converterende site',
        services: ['Webdesign', 'Next.js Ontwikkeling', 'Art Direction', 'Lokale SEO', 'Werfgalerij', 'Online Offertes'],
      },
      de: {
        categoryLabel: 'Webdesign',
        description: 'Komplette Neugestaltung der Website eines Brüsseler Bauunternehmens — 5 Jahre Tätigkeit, über 70 abgeschlossene Baustellen (Rohbau, Komplettrenovierung, polierter Beton, Parkett). Die vorherige Low-Code-Website erzeugte weder Sichtbarkeit noch qualifizierte Angebotsanfragen.',
        impact: 'Eine "industrielle Blaupausen"-Identität — Beton, Struktur, Materie —, die die Strenge der realen Baustelle online übersetzt. Konversionsorientierte Next.js-Architektur, eine nach Gewerk organisierte Baustellengalerie und ein klarer Angebotsweg für eine Branche, in der Vertrauen auf Beweisen basiert, nicht auf Versprechen.',
        metrics: '70+ abgeschlossene Baustellen · 5 Jahre Tätigkeit — in eine konvertierende Website übersetzt',
        services: ['Webdesign', 'Next.js-Entwicklung', 'Art Direction', 'Lokales SEO', 'Baustellengalerie', 'Online-Angebote'],
      },
    },
  },
  {
    id: 'cartouche',
    title: 'Cartouche',
    client: 'Cartouche',
    category: 'branding',
    categoryLabel: 'Branding & Site Charter',
    year: '2026',
    description: 'Identité de marque et site de charter pour Cartouche, un catamaran de luxe Blue Coast 95 (28,8m, refit 2022) proposé à la location en Méditerranée pour une clientèle UHNW. Site multi-pages (le yacht, à bord, destinations, équipage, tarifs charter) accompagné d\'un dashboard d\'administration bilingue EN/FR avec support PWA iOS pour la gestion des réservations.',
    impact: 'Un territoire "luxe nautique feutré" — navy profond, calcaire, laiton — qui restitue le niveau d\'exigence attendu par une clientèle charter international sans jamais tomber dans le cliché doré du yachting. Le dashboard admin donne à l\'équipe à terre un outil de gestion quotidien pensé pour l\'usage mobile.',
    metrics: '28,8m Blue Coast 95 · 9 pages site · Dashboard admin bilingue + PWA iOS',
    services: ['Brand Identity', 'Web Design', 'Développement Next.js', 'Dashboard Admin', 'PWA iOS', 'Bilingue EN/FR'],
    color: '#0B1C2C',
    colors: ['#0B1C2C', '#F3EEE7', '#B89B5E', '#2A2A2A', '#F0E8D8'],
    image: '/projet-cartouche/hero.png',
    url: 'https://cartouche95.com',
    featured: true,
    translations: {
      en: {
        categoryLabel: 'Branding & Charter Site',
        description: 'Brand identity and charter website for Cartouche, a luxury Blue Coast 95 catamaran (28.8m, 2022 refit) offered for charter in the Mediterranean to a UHNW clientele. A multi-page site (the yacht, on board, destinations, crew, charter rates) paired with a bilingual EN/FR admin dashboard with iOS PWA support for booking management.',
        impact: 'A "quiet nautical luxury" territory — deep navy, limestone, brass — that meets the standard expected by an international charter clientele without falling into gold-plated yachting clichés. The admin dashboard gives the shore team a daily management tool built for mobile use.',
        metrics: '28.8m Blue Coast 95 · 9-page site · Bilingual admin dashboard + iOS PWA',
        services: ['Brand Identity', 'Web Design', 'Next.js Development', 'Admin Dashboard', 'iOS PWA', 'Bilingual EN/FR'],
      },
      nl: {
        categoryLabel: 'Branding & Chartersite',
        description: 'Merkidentiteit en chartersite voor Cartouche, een luxe Blue Coast 95-catamaran (28,8m, refit 2022) verhuurd in de Middellandse Zee aan een UHNW-clientèle. Een meerpagige site (het jacht, aan boord, bestemmingen, bemanning, chartertarieven) gecombineerd met een tweetalig EN/FR admin-dashboard met iOS PWA-ondersteuning voor boekingsbeheer.',
        impact: 'Een territorium van "ingetogen nautische luxe" — diep marineblauw, kalksteen, messing — dat het niveau weerspiegelt dat een internationale chartercliëntele verwacht, zonder in het gouden yachting-cliché te vervallen. Het admin-dashboard geeft het team aan wal een dagelijks beheersinstrument gebouwd voor mobiel gebruik.',
        metrics: '28,8m Blue Coast 95 · 9 pagina\'s · Tweetalig admin-dashboard + iOS PWA',
        services: ['Brand Identity', 'Webdesign', 'Next.js Ontwikkeling', 'Admin Dashboard', 'iOS PWA', 'Tweetalig EN/FR'],
      },
      de: {
        categoryLabel: 'Branding & Charter-Website',
        description: 'Markenidentität und Charter-Website für Cartouche, einen luxuriösen Blue Coast 95-Katamaran (28,8m, Refit 2022), der im Mittelmeer an eine UHNW-Klientel vercharter wird. Eine mehrseitige Website (die Yacht, an Bord, Reiseziele, Crew, Charterpreise) kombiniert mit einem zweisprachigen EN/FR-Admin-Dashboard mit iOS-PWA-Unterstützung für die Buchungsverwaltung.',
        impact: 'Ein Territorium "leiser nautischer Luxus" — tiefes Marineblau, Kalkstein, Messing —, das dem Anspruchsniveau einer internationalen Charter-Klientel entspricht, ohne in das goldene Yachting-Klischee zu verfallen. Das Admin-Dashboard gibt dem Team an Land ein für mobile Nutzung konzipiertes Verwaltungstool.',
        metrics: '28,8m Blue Coast 95 · 9-seitige Website · Zweisprachiges Admin-Dashboard + iOS-PWA',
        services: ['Markenidentität', 'Webdesign', 'Next.js-Entwicklung', 'Admin-Dashboard', 'iOS-PWA', 'Zweisprachig EN/FR'],
      },
    },
  },
  {
    id: 'flows-studio',
    title: 'Flows Studio',
    client: 'Flows Studio (co-fondation)',
    category: 'branding',
    categoryLabel: 'Branding & Site Web',
    year: '2026',
    description: 'Identité de marque et site web pour Flows Studio, un studio B2B d\'agents IA co-fondé par Samuel avec Alexandre Wirtz (AW&CO). Pas un mandat client classique : une co-construction de marque depuis zéro, pensée pour une disponibilité permanente et une exécution qui ne s\'arrête jamais.',
    impact: 'Un territoire éditorial chaleureux — encre, crème, sauge — qui évite le double écueil du SaaS générique et du dark-mode tech froid. La signature "Toujours là. Même quand tu ne le vois pas." traduit en une phrase le positionnement du studio : des agents IA qui travaillent en continu, sans jamais être visibles pour être crus.',
    metrics: 'Co-fondation · Identité complète + site web — de zéro à la marque',
    services: ['Brand Identity', 'Web Design', 'Direction Artistique', 'Développement', 'Copywriting', 'Design System'],
    color: '#0E0D0A',
    colors: ['#0E0D0A', '#EDE8DF', '#7A9977', '#C45C2B', '#1A1814'],
    image: '/projet-flows-studio/hero.png',
    url: 'https://flows-studio.com',
    featured: true,
    translations: {
      en: {
        categoryLabel: 'Branding & Website',
        description: 'Brand identity and website for Flows Studio, a B2B AI agent studio co-founded by Samuel with Alexandre Wirtz (AW&CO). Not a standard client mandate: a from-scratch brand build, designed around permanent availability and execution that never stops.',
        impact: 'A warm editorial territory — ink, cream, sage — that avoids both the generic-SaaS trap and the cold dark-mode tech cliché. The line "Always there. Even when you don\'t see it." captures the studio\'s positioning in one sentence: AI agents that work continuously, without needing to be visible to be trusted.',
        metrics: 'Co-founded venture · Full identity + website — from zero to brand',
        services: ['Brand Identity', 'Web Design', 'Art Direction', 'Development', 'Copywriting', 'Design System'],
      },
      nl: {
        categoryLabel: 'Branding & Website',
        description: 'Merkidentiteit en website voor Flows Studio, een B2B AI-agentstudio mede opgericht door Samuel met Alexandre Wirtz (AW&CO). Geen klassiek klantmandaat: een merkopbouw vanaf nul, ontworpen rond permanente beschikbaarheid en uitvoering die nooit stopt.',
        impact: 'Een warm redactioneel territorium — inkt, crème, salie — dat zowel de generieke SaaS-val als het koude dark-mode techcliché vermijdt. De lijn "Altijd aanwezig. Ook als je het niet ziet." vat de positionering van de studio in één zin samen: AI-agenten die continu werken, zonder zichtbaar te moeten zijn om vertrouwd te worden.',
        metrics: 'Mede-oprichting · Volledige identiteit + website — van nul tot merk',
        services: ['Brand Identity', 'Webdesign', 'Art Direction', 'Ontwikkeling', 'Copywriting', 'Design System'],
      },
      de: {
        categoryLabel: 'Branding & Website',
        description: 'Markenidentität und Website für Flows Studio, ein B2B-KI-Agentenstudio, das Samuel gemeinsam mit Alexandre Wirtz (AW&CO) mitgegründet hat. Kein klassisches Kundenmandat: ein Markenaufbau von Grund auf, konzipiert für permanente Verfügbarkeit und eine Ausführung, die nie stoppt.',
        impact: 'Ein warmes redaktionelles Territorium — Tinte, Creme, Salbei —, das sowohl die generische SaaS-Falle als auch das kalte Dark-Mode-Tech-Klischee vermeidet. Die Zeile "Immer da. Auch wenn du es nicht siehst." bringt die Positionierung des Studios auf den Punkt: KI-Agenten, die kontinuierlich arbeiten, ohne sichtbar sein zu müssen, um vertrauenswürdig zu sein.',
        metrics: 'Mitgründung · Vollständige Identität + Website — von null zur Marke',
        services: ['Markenidentität', 'Webdesign', 'Art Direction', 'Entwicklung', 'Copywriting', 'Design System'],
      },
    },
  },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: string) =>
  category === 'all' ? projects : projects.filter(p => p.category === category);
export const getProjectById = (id: string) => projects.find(p => p.id === id);
