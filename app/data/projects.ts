export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'branding' | 'web' | 'print' | 'social';
  categoryLabel: string;
  year: string;
  description: string;
  services: string[];
  color: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'terra-nova',
    title: 'Terra Nova',
    client: 'Restaurant Gastronomique',
    category: 'branding',
    categoryLabel: 'Branding',
    year: '2024',
    description: 'Identité visuelle complète pour un restaurant gastronomique fusion. Logo, charte graphique, menu, signalétique.',
    services: ['Identité Visuelle', 'Logo', 'Charte Graphique', 'Menu Design'],
    color: '#2C5F2D',
    featured: true,
  },
  {
    id: 'luxe-immo',
    title: 'Luxe Immo',
    client: 'Agence Immobilière',
    category: 'web',
    categoryLabel: 'Web Design',
    year: '2024',
    description: 'Site web premium pour une agence immobilière de luxe. Design élégant, animations subtiles, recherche avancée.',
    services: ['Web Design', 'UI/UX', 'Développement'],
    color: '#1A1A2E',
    featured: true,
  },
  {
    id: 'festival-lumiere',
    title: 'Festival Lumière',
    client: 'Événement Culturel',
    category: 'print',
    categoryLabel: 'Print',
    year: '2024',
    description: 'Campagne print pour un festival de lumière. Affiches, flyers, programme, merchandising.',
    services: ['Affiches', 'Flyers', 'Programme', 'Merchandising'],
    color: '#FFB400',
    featured: true,
  },
  {
    id: 'zen-yoga',
    title: 'Zen Yoga Studio',
    client: 'Studio de Yoga',
    category: 'social',
    categoryLabel: 'Social Media',
    year: '2024',
    description: 'Stratégie de contenu et templates pour Instagram et Facebook. Posts, stories, réels.',
    services: ['Content Strategy', 'Templates Instagram', 'Community Management'],
    color: '#E8DED2',
    featured: false,
  },
  {
    id: 'roastery-coffee',
    title: 'The Roastery',
    client: 'Coffee Shop',
    category: 'branding',
    categoryLabel: 'Branding',
    year: '2023',
    description: 'Refonte complète de l\'identité d\'un coffee shop artisanal. Packaging, signalétique, merchandising.',
    services: ['Rebranding', 'Packaging', 'Signalétique'],
    color: '#6F4E37',
    featured: true,
  },
  {
    id: 'tech-startup',
    title: 'NexaTech',
    client: 'Startup SaaS',
    category: 'web',
    categoryLabel: 'Web Design',
    year: '2023',
    description: 'Landing page et dashboard pour une startup tech B2B. Design moderne, data visualisation.',
    services: ['Landing Page', 'Dashboard Design', 'Illustrations'],
    color: '#4A90E2',
    featured: false,
  },
  {
    id: 'editions-atlas',
    title: 'Éditions Atlas',
    client: 'Maison d\'Édition',
    category: 'print',
    categoryLabel: 'Print',
    year: '2023',
    description: 'Collection de couvertures de livres pour une maison d\'édition contemporaine.',
    services: ['Couvertures', 'Typographie', 'Mise en Page'],
    color: '#8B4513',
    featured: false,
  },
  {
    id: 'fitness-pro',
    title: 'Fitness Pro',
    client: 'Salle de Sport',
    category: 'social',
    categoryLabel: 'Social Media',
    year: '2023',
    description: 'Campagne social media pour le lancement d\'une nouvelle salle de sport premium.',
    services: ['Campagne Digitale', 'Vidéos', 'Stories'],
    color: '#E01919',
    featured: false,
  },
  {
    id: 'organic-beauty',
    title: 'Organic Beauty',
    client: 'Cosmétiques Bio',
    category: 'branding',
    categoryLabel: 'Branding',
    year: '2023',
    description: 'Identité et packaging pour une ligne de cosmétiques biologiques haut de gamme.',
    services: ['Branding', 'Packaging', 'Photographie'],
    color: '#A8D5BA',
    featured: true,
  },
  {
    id: 'archi-studio',
    title: 'Archi Studio',
    client: 'Cabinet d\'Architecture',
    category: 'web',
    categoryLabel: 'Web Design',
    year: '2024',
    description: 'Portfolio en ligne pour un cabinet d\'architecture. Design minimaliste, focus sur les projets.',
    services: ['Portfolio Web', 'Photographie', 'Motion Design'],
    color: '#2D3436',
    featured: true,
  },
  {
    id: 'magazine-culture',
    title: 'Culture Mag',
    client: 'Magazine Culturel',
    category: 'print',
    categoryLabel: 'Print',
    year: '2024',
    description: 'Direction artistique et mise en page d\'un magazine culturel trimestriel.',
    services: ['Direction Artistique', 'Mise en Page', 'Typographie'],
    color: '#95A5A6',
    featured: false,
  },
  {
    id: 'green-energy',
    title: 'Green Energy',
    client: 'Énergies Renouvelables',
    category: 'branding',
    categoryLabel: 'Branding',
    year: '2023',
    description: 'Identité visuelle pour une startup dans les énergies renouvelables.',
    services: ['Logo', 'Charte Graphique', 'Site Web'],
    color: '#27AE60',
    featured: false,
  },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: string) =>
  category === 'all' ? projects : projects.filter(p => p.category === category);
export const getProjectById = (id: string) => projects.find(p => p.id === id);
