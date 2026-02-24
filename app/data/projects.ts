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
  color: string;
  image: string;
  video?: string;
  mockup?: ProjectMockup;
  url?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'nanou',
    title: 'Massages & Naissance',
    client: 'Nanou Mendels',
    category: 'web',
    categoryLabel: 'Web Design',
    year: '2025',
    description: 'Site vitrine 7 pages pour une praticienne en massage, haptonomie et thérapie psycho-corporelle. Multilingue FR/NL/EN/IT, moteur i18n custom, animations orchestrées et design system cuivre × beige — déployé sur massages-et-naissance.com.',
    impact: 'Un site qui reflète la douceur et le professionnalisme de la praticienne : navigation fluide, esthétique apaisante et accès immédiat à toutes les informations. La version multilingue (4 langues) ouvre la clientèle à toute la Belgique et au-delà.',
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
    services: ['Brand Identity', 'Design System', 'Font & Color System', 'UI/UX Design', 'Web App', 'iOS App'],
    color: '#9c5698',
    image: '/projet-izzico/hero.png',
    featured: true,
  },
  {
    id: 'villa-coladeira',
    title: 'Villa Coladeira',
    client: 'Villa Coladeira',
    category: 'web',
    categoryLabel: 'Web Design',
    year: '2025',
    description: 'Site vitrine multilingue pour une villa de luxe à São Vicente, Cap-Vert — 6 suites avec vue mer, piscine à débordement et expériences exclusives. Architecture Next.js avec internationalisation (FR/EN/NL/DE/PT), animations cinématographiques et design system inspiré de l\'océan atlantique.',
    impact: 'Une présence digitale à la hauteur de l\'expérience : visuels immersifs, vidéo cinemagraph en hero, et parcours de réservation simplifié. Le site positionne la villa dans le segment ultra-luxe et facilite les réservations directes depuis l\'Europe.',
    services: ['Web Design', 'Développement', 'Multilingue (5 langues)', 'Vidéo cinemagraph', 'SEO', 'Déploiement'],
    color: '#1B3A4B',
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
    services: ['Logo Design', 'Charte Graphique', 'Direction Artistique', 'Illustration', 'Print Design', 'Social Media'],
    color: '#0000FF',
    image: '/projet-la-villa/hero-triptyque.png',
    featured: true,
  },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: string) =>
  category === 'all' ? projects : projects.filter(p => p.category === category);
export const getProjectById = (id: string) => projects.find(p => p.id === id);
