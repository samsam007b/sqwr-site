export interface Article {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: string; // HTML string or markdown
  publishedAt: string; // ISO 8601
  updatedAt: string;
  category: 'branding' | 'web' | 'strategy' | 'design';
  categoryLabel: string;
  author: string;
  authorTitle: string;
  readingTime: number; // minutes
  featured: boolean;
  image?: string;
}

export const articles: Article[] = [
  {
    slug: 'combien-coute-identite-visuelle-belgique-2025',
    title: 'Combien coûte une identité visuelle en Belgique en 2025 ?',
    description:
      'Guide complet des tarifs de branding en Belgique : logo, charte graphique, identité visuelle. Prix agences, freelances et studios créatifs comme SQWR Studio.',
    excerpt:
      "Vous envisagez de faire créer votre identité visuelle mais vous ne savez pas quel budget prévoir ? Voici un guide honnête des tarifs du marché belge en 2025.",
    content: `
<h2>Pourquoi les prix varient autant ?</h2>
<p>
  En Belgique, le tarif pour une identité visuelle peut aller de 200€ chez un freelance débutant
  à 50 000€ dans une grande agence internationale. Cette fourchette s'explique par trois facteurs
  principaux : l'expérience du prestataire, la complexité du projet, et le positionnement
  commercial du studio.
</p>

<h2>Les fourchettes de prix en Belgique (2025)</h2>
<h3>Freelances débutants — 200€ à 800€</h3>
<p>
  Pour un projet simple avec peu de révisions. Risque plus élevé sur la qualité finale et
  la pérennité du prestataire. À réserver pour des projets de test ou des micro-budgets.
</p>
<h3>Freelances confirmés — 800€ à 3 000€</h3>
<p>
  Bon rapport qualité/prix. Idéal pour les startups et les indépendants. Le principal
  inconvénient : un seul interlocuteur qui peut être indisponible.
</p>
<h3>Studios créatifs (taille SQWR Studio) — 800€ à 5 000€</h3>
<p>
  Équipe pluridisciplinaire (designer + stratège), processus structuré, livrables professionnels.
  Chez SQWR Studio, nos packages identité visuelle démarrent à 800€ et incluent : logo principal,
  déclinaisons couleur et noir-blanc, charte graphique et fichiers sources.
</p>
<h3>Agences mid-market — 3 000€ à 15 000€</h3>
<p>
  Processus formalisé, équipes dédiées, management de projet. Adapté aux PME et entreprises
  établies.
</p>
<h3>Grandes agences — 15 000€ à 100 000€+</h3>
<p>
  Pour les entreprises du CAC 40, les rebrands complets, ou quand l'identité de marque
  doit couvrir des dizaines de déclinaisons produits.
</p>

<h2>Qu'est-ce qu'une identité visuelle comprend vraiment ?</h2>
<p>Une identité visuelle complète devrait inclure :</p>
<ul>
  <li><strong>Logo principal</strong> — la version principale de votre logo</li>
  <li><strong>Déclinaisons</strong> — couleur, noir-blanc, version simplifiée (favicon)</li>
  <li><strong>Palette de couleurs</strong> — primaires, secondaires, neutres</li>
  <li><strong>Typographie</strong> — polices principales et secondaires avec règles d'usage</li>
  <li><strong>Charte graphique</strong> — guide d'utilisation des éléments visuels</li>
  <li><strong>Fichiers sources</strong> — AI, SVG, PNG, PDF en haute résolution</li>
</ul>

<h2>Comment choisir son prestataire ?</h2>
<p>
  Au-delà du prix, évaluez : la qualité du portfolio (des projets similaires au vôtre ?),
  la clarté du processus (combien de révisions incluses ?), la pérennité (sera-t-il encore
  disponible dans 2 ans pour des ajustements ?), et la capacité à comprendre votre secteur.
</p>
<p>
  Chez SQWR Studio, nous travaillons directement avec vous — sans intermédiaire — ce qui
  permet une meilleure compréhension de votre vision et un résultat plus cohérent.
</p>

<h2>Notre recommandation</h2>
<p>
  Pour la plupart des startups, PME et indépendants belges, un budget de 800€ à 3000€ représente
  le meilleur point d'entrée. En dessous, vous risquez de devoir recommencer l'exercice dans
  18 mois. Au-dessus, les gains marginaux sont souvent difficiles à justifier tant que votre
  marque n'a pas prouvé sa traction sur le marché.
</p>
    `.trim(),
    publishedAt: '2026-03-01T09:00:00+01:00',
    updatedAt: '2026-03-01T09:00:00+01:00',
    category: 'branding',
    categoryLabel: 'Branding',
    author: 'Samuel Baudon',
    authorTitle: 'Directeur Stratégie, SQWR Studio',
    readingTime: 5,
    featured: true,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}
