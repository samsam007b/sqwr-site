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
    image: '/projet-izzico/hero.png',
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
    id: 'nanou',
    title: 'Massages & Naissance',
    client: 'Nanou Mendels',
    category: 'web',
    categoryLabel: 'Web Design',
    year: '2025',
    description: 'Site vitrine 7 pages pour une praticienne en massage, haptonomie et thérapie psycho-corporelle. Multilingue FR/NL/EN/IT, moteur i18n custom, animations orchestrées et design system cuivre × beige — déployé sur massages-et-naissance.com.',
    impact: 'Un site qui reflète la douceur et le professionnalisme de la praticienne : navigation fluide, esthétique apaisante et accès immédiat à toutes les informations. La version multilingue (4 langues) ouvre la clientèle à toute la Belgique et au-delà.',
    metrics: 'Livré en 3 semaines — 4 langues, design sur-mesure',
    services: ['Web Design', 'Développement', 'Multilingue (4 langues)', 'Animations', 'SEO', 'Déploiement'],
    color: '#B8956A',
    image: '/projet-nanou/hero.png',
    video: '/projet-nanou/hero-massage.mp4',
    mockup: {
      navLeft: ['Prestations', 'À propos'],
      navRight: ['Tarifs', 'Contact'],
      brandName: 'Massages & Naissance',
      brandSub: 'Nanou Mendels',
      eyebrow: 'Bruxelles · Bien-être',
      heroTitle: 'Un accompagnement\nvers votre essence',
      heroSub: 'Massage · Haptonomie · Thérapie psycho-corporelle',
      cta: 'Prendre rendez-vous',
    },
    url: 'https://massages-et-naissance.com',
    featured: true,
    translations: {
      en: {
        categoryLabel: 'Web Design',
        description: '7-page showcase website for a practitioner in massage, haptonomy and psycho-corporeal therapy. Multilingual FR/NL/EN/IT, custom i18n engine, orchestrated animations and copper × beige design system — deployed on massages-et-naissance.com.',
        impact: 'A site that reflects the practitioner\'s gentleness and professionalism: fluid navigation, soothing aesthetics and immediate access to all information. The multilingual version (4 languages) opens the client base to all of Belgium and beyond.',
        metrics: 'Delivered in 3 weeks — 4 languages, bespoke design',
        services: ['Web Design', 'Development', 'Multilingual (4 languages)', 'Animations', 'SEO', 'Deployment'],
      },
      nl: {
        categoryLabel: 'Web Design',
        description: 'Showcase website van 7 pagina\'s voor een therapeute in massage, haptonomie en psycho-lichamelijke therapie. Meertalig FR/NL/EN/IT, aangepaste i18n-motor, georchestreerde animaties en koper × beige ontwerpsysteem — geïmplementeerd op massages-et-naissance.com.',
        impact: 'Een site die de zachtheid en het professionalisme van de therapeute weerspiegelt: vloeiende navigatie, rustgevende esthetiek en onmiddellijke toegang tot alle informatie. De meertalige versie (4 talen) opent het klantenbestand voor heel België en daarbuiten.',
        metrics: 'Geleverd in 3 weken — 4 talen, op maat design',
        services: ['Web Design', 'Ontwikkeling', 'Meertalig (4 talen)', 'Animaties', 'SEO', 'Implementatie'],
      },
      de: {
        categoryLabel: 'Web Design',
        description: '7-seitige Showcase-Website für eine Praktikerin in Massage, Haptonomie und psycho-körperlicher Therapie. Mehrsprachig FR/NL/EN/IT, benutzerdefinierte i18n-Engine, orchestrierte Animationen und kupfer × beiges Designsystem — auf massages-et-naissance.com bereitgestellt.',
        impact: 'Eine Website, die die Sanftheit und Professionalität der Praktikerin widerspiegelt: flüssige Navigation, beruhigende Ästhetik und sofortiger Zugang zu allen Informationen. Die mehrsprachige Version (4 Sprachen) öffnet den Kundenstamm für ganz Belgien und darüber hinaus.',
        metrics: 'In 3 Wochen geliefert — 4 Sprachen, maßgeschneidertes Design',
        services: ['Web Design', 'Entwicklung', 'Mehrsprachig (4 Sprachen)', 'Animationen', 'SEO', 'Deployment'],
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
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: string) =>
  category === 'all' ? projects : projects.filter(p => p.category === category);
export const getProjectById = (id: string) => projects.find(p => p.id === id);
