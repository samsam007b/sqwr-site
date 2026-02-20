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
  url?: string;
  featured: boolean;
}

export const projects: Project[] = [
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
