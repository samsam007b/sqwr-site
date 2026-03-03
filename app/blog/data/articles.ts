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
  à 50 000€ dans une grande agence internationale. Cette fourchette impressionne — et sème souvent
  la confusion. Avant de vous décourager ou de choisir la première option à bas prix, il faut
  comprendre ce qui justifie ces écarts.
</p>
<p>
  Trois facteurs principaux expliquent cette variabilité : l'expérience et la réputation du prestataire,
  la complexité et l'étendue du projet, et le positionnement commercial du studio. Un logo conçu en
  2 heures par un étudiant et un système de marque développé sur 6 semaines par une équipe spécialisée
  ne sont tout simplement pas des produits comparables — même s'ils portent le même nom.
</p>

<h2>Les fourchettes de prix en Belgique (2025)</h2>
<p>
  Voici une cartographie réaliste du marché belge, basée sur notre expérience et nos observations du secteur.
</p>

<h3>Freelances débutants — 200€ à 800€</h3>
<p>
  Pour un projet simple avec peu de révisions. Risque plus élevé sur la qualité finale et
  la pérennité du prestataire. À réserver pour des projets de test ou des micro-budgets.
  Attention : un logo mal conçu coûte souvent plus cher à corriger qu'à refaire.
</p>

<h3>Freelances confirmés — 800€ à 3 000€</h3>
<p>
  Bon rapport qualité/prix. Idéal pour les startups et les indépendants. Le principal
  inconvénient : un seul interlocuteur qui peut être indisponible, débordé, ou changer
  de direction professionnelle. La continuité du service n'est pas garantie.
</p>

<h3>Studios créatifs (taille SQWR Studio) — 1 500€ à 5 000€</h3>
<p>
  Équipe pluridisciplinaire (designer + stratège), processus structuré, livrables professionnels.
  Chez SQWR Studio, nos packages identité visuelle démarrent à 1 500€ et incluent : logo principal,
  déclinaisons couleur et noir-blanc, palette de couleurs, système typographique, charte graphique PDF
  et fichiers sources dans tous les formats. Cette gamme représente selon nous le meilleur rapport
  qualité/prix pour les PME, startups et indépendants belges.
</p>

<h3>Agences mid-market — 3 000€ à 15 000€</h3>
<p>
  Processus formalisé, équipes dédiées, management de projet, études de marché incluses. Adapté aux PME
  établies et aux entreprises qui ont besoin d'un accompagnement stratégique complet. À ce niveau,
  vous payez aussi la structure overhead de l'agence — bureaux, account managers, chefs de projet.
</p>

<h3>Grandes agences et cabinets de conseil — 15 000€ à 100 000€+</h3>
<p>
  Pour les entreprises du Fortune 500, les rebrands stratégiques complexes, ou quand l'identité de marque
  doit couvrir des dizaines de déclinaisons produits dans plusieurs pays. Ces budgets incluent des études
  qualitatives, des workshops clients, des tests utilisateurs et une gestion de projet étendue.
</p>

<h2>Qu'est-ce qu'une identité visuelle comprend vraiment ?</h2>
<p>
  C'est la question que tout client devrait poser avant de signer. Un "logo" seul n'est pas une identité visuelle.
  Une identité visuelle complète et exploitable devrait inclure :
</p>
<ul>
  <li><strong>Logo principal</strong> — la version principale de votre logo en couleur</li>
  <li><strong>Déclinaisons</strong> — version couleur, noir, blanc, et version simplifiée (pour le favicon ou les petits formats)</li>
  <li><strong>Palette de couleurs</strong> — codes HEX, RVB et CMJN pour chaque couleur primaire, secondaire et neutre</li>
  <li><strong>Système typographique</strong> — polices principales et secondaires avec règles d'usage (hiérarchie, tailles, espacements)</li>
  <li><strong>Charte graphique</strong> — guide d'utilisation visuel avec exemples de bons et mauvais usages</li>
  <li><strong>Fichiers sources</strong> — AI (Adobe Illustrator), SVG, PNG haute résolution, PDF imprimable</li>
</ul>
<p>
  Certains prestataires n'incluent que le fichier PNG final. Si vous n'avez pas les fichiers vectoriels (AI ou SVG),
  vous ne pourrez pas modifier ou agrandir votre logo sans perte de qualité — et vous devrez recommencer à zéro
  si vous changez de prestataire.
</p>

<h2>Les délais : à quoi s'attendre ?</h2>
<p>
  Le temps est une dimension souvent oubliée dans la comparaison des devis. Voici des fourchettes réalistes :
</p>
<ul>
  <li><strong>Freelance débutant</strong> — 1 à 3 semaines (mais disponibilité variable)</li>
  <li><strong>Freelance confirmé</strong> — 2 à 6 semaines selon sa charge de travail</li>
  <li><strong>Studio créatif</strong> — 3 à 6 semaines pour un projet complet bien cadré</li>
  <li><strong>Agence mid-market</strong> — 6 à 12 semaines avec les phases de validation</li>
</ul>
<p>
  Chez SQWR Studio, un projet branding Signature (notre offre d'entrée à 1 500€) est généralement
  livré en 3 à 4 semaines. Un projet Flagship incluant le système de design complet prend 5 à 7 semaines.
  Ces délais incluent 2 rounds de révisions.
</p>

<h2>Les 7 questions à poser avant de signer</h2>
<p>
  Avant de valider un devis, posez ces questions à n'importe quel prestataire — et évaluez la clarté des réponses :
</p>
<ol>
  <li><strong>Combien de révisions sont incluses ?</strong> — Sans limite définie, le projet peut dériver indéfiniment.</li>
  <li><strong>Quels formats de fichiers me livrerez-vous ?</strong> — Insistez pour les fichiers sources AI ou SVG.</li>
  <li><strong>Est-ce que je possède les droits sur le logo final ?</strong> — La réponse devrait être oui, sans restriction.</li>
  <li><strong>Qui sera mon interlocuteur principal ?</strong> — Dans une agence, le commercial qui vend n'est pas toujours le créatif qui conçoit.</li>
  <li><strong>Avez-vous des références dans mon secteur ?</strong> — Un portfolio varié est bon signe, mais des références proches de votre industrie sont encore mieux.</li>
  <li><strong>Comment se déroule le processus de brief ?</strong> — Un bon prestataire prend le temps de comprendre votre marché avant de dessiner quoi que ce soit.</li>
  <li><strong>Que se passe-t-il si je ne suis pas satisfait à la livraison ?</strong> — Clarifiez les conditions de révision supplémentaire ou de remboursement.</li>
</ol>

<h2>Les 5 pièges à éviter absolument</h2>

<h3>Piège 1 : Choisir uniquement sur le prix</h3>
<p>
  Un logo à 200€ peut vous coûter 2 000€ à refaire 18 mois plus tard — quand votre marque commence à avoir
  de la visibilité et que vous réalisez que le design ne tient pas la route. Le coût réel d'un mauvais logo
  inclut la perte de crédibilité, la confusion client, et les frais de refonte.
</p>

<h3>Piège 2 : Ne pas demander les fichiers sources</h3>
<p>
  Certains prestataires ne livrent que des JPG ou PNG. Sans le fichier vectoriel source, vous êtes dépendant
  d'eux pour toute modification future. Exigez toujours les fichiers AI, SVG ou EPS.
</p>

<h3>Piège 3 : Confondre logo et identité visuelle</h3>
<p>
  Un logo seul ne constitue pas une identité de marque. Sans charte graphique, palette de couleurs et
  système typographique définis, chaque nouveau document que vous créerez sera incohérent — et votre
  marque perdra en crédibilité.
</p>

<h3>Piège 4 : Ignorer la cohérence avec votre stratégie</h3>
<p>
  Une identité visuelle efficace n'est pas qu'un beau logo — c'est la traduction visuelle de votre
  positionnement. Si votre positionnement est "luxe abordable" et que votre logo ressemble à un supermarché
  discount, il y a un problème stratégique que le design seul ne peut pas résoudre.
</p>

<h3>Piège 5 : Négliger l'adaptabilité digitale</h3>
<p>
  Votre logo sera utilisé sur Instagram, dans des emails, sur votre site web, en favicon, et peut-être
  en impression. Assurez-vous qu'il fonctionne dans tous ces contextes — notamment en très petit format
  et en version monochrome.
</p>

<h2>Comment se passe concrètement un projet chez SQWR Studio ?</h2>
<p>
  Pour être transparents sur notre processus, voici comment nous travaillons avec chaque client :
</p>
<ol>
  <li>
    <strong>Brief stratégique (1h)</strong> — Un appel ou une rencontre pour comprendre votre activité,
    vos clients cibles, vos concurrents, et ce que vous voulez transmettre avec votre marque.
  </li>
  <li>
    <strong>Recherche et inspiration (1 semaine)</strong> — Nous construisons une planche d'ambiance
    (moodboard) et définissons les directions créatives possibles avant de commencer à dessiner.
  </li>
  <li>
    <strong>Exploration créative (1-2 semaines)</strong> — Joakim développe 2 à 3 pistes créatives
    distinctes, que nous vous présentons avec leur rationale stratégique.
  </li>
  <li>
    <strong>Révisions (1 semaine)</strong> — Vous choisissez une direction, nous affinons jusqu'à
    ce que le résultat soit parfait. Deux rounds de révisions inclus dans nos forfaits.
  </li>
  <li>
    <strong>Livraison</strong> — Tous les fichiers sources + la charte graphique en PDF, organisés
    dans un dossier Drive partagé.
  </li>
</ol>

<h2>Notre recommandation finale</h2>
<p>
  Pour la plupart des startups, PME et indépendants belges, un budget de 1 500€ à 3 000€ représente
  le meilleur point d'entrée. En dessous, vous risquez de devoir recommencer l'exercice dans
  18 mois. Au-dessus, les gains marginaux sont souvent difficiles à justifier tant que votre
  marque n'a pas prouvé sa traction sur le marché.
</p>
<p>
  Ce qui compte davantage que le prix, c'est l'adéquation entre votre prestataire et votre vision.
  Regardez leur portfolio : est-ce que leurs projets vous parlent ? Est-ce qu'ils posent des questions
  stratégiques ou seulement esthétiques ? Est-ce qu'ils comprennent votre marché ?
</p>
<p>
  Si vous souhaitez en savoir plus sur nos services et nos tarifs exacts, ou simplement discuter
  de votre projet, <a href="/contact">contactez-nous</a> — nous répondons sous 24h ouvrables.
</p>
    `.trim(),
    publishedAt: '2026-03-01T09:00:00+01:00',
    updatedAt: '2026-03-03T10:00:00+01:00',
    category: 'branding',
    categoryLabel: 'Branding',
    author: 'Samuel Baudon',
    authorTitle: 'Directeur Stratégie, SQWR Studio',
    readingTime: 10,
    featured: true,
  },
  {
    slug: 'choisir-agence-branding-bruxelles',
    title: 'Comment choisir une agence de branding à Bruxelles : 7 critères essentiels',
    description:
      "Guide pratique pour choisir la bonne agence créative ou studio de branding à Bruxelles. Critères de sélection, questions à poser, erreurs à éviter. Par SQWR Studio.",
    excerpt:
      "Il existe des dizaines d'agences créatives à Bruxelles. Comment distinguer celles qui livreront une marque solide de celles qui vendent surtout de beaux PDF ? Voici notre guide.",
    content: `
<h2>Le marché du branding à Bruxelles : un aperçu réaliste</h2>
<p>
  Bruxelles concentre une densité remarquable d'agences créatives, de studios indépendants et de
  freelances en design. La capitale européenne, carrefour de cultures et siège des institutions
  communautaires, a développé un écosystème créatif vivant — des grandes agences de publicité
  aux micro-studios spécialisés.
</p>
<p>
  Cette richesse de l'offre est une bonne nouvelle pour les entreprises qui cherchent un partenaire
  créatif. Mais elle complique aussi la sélection : comment distinguer un studio qui comprend
  réellement votre marché d'un prestataire qui maîtrise surtout la rhétorique commerciale ?
</p>

<h2>Critère 1 : La qualité et la cohérence du portfolio</h2>
<p>
  C'est le premier filtre, et il ne s'applique pas de la façon dont on pourrait croire. Ce n'est pas
  parce qu'un portfolio est "beau" qu'il est bon. Posez-vous ces questions en regardant les projets :
</p>
<ul>
  <li>Est-ce que le design semble adapté à chaque client, ou est-ce que tous les projets ont le même "look" ?</li>
  <li>Est-ce que les projets incluent une explication du problème client et de la solution créative — ou seulement des images ?</li>
  <li>Y a-t-il des exemples dans des secteurs proches du vôtre ?</li>
  <li>Est-ce que les livrables vont au-delà du logo — chartes, motion, assets digitaux ?</li>
</ul>
<p>
  Un portfolio qui montre des projets divers avec des approches différentes signale une équipe
  capable de s'adapter à votre contexte. Un portfolio monolithique — où tout se ressemble —
  indique un prestataire qui impose son style plutôt que de servir votre identité.
</p>

<h2>Critère 2 : La compréhension stratégique, pas seulement esthétique</h2>
<p>
  Une agence de branding sérieuse vous posera des questions qui vont au-delà des couleurs et des polices.
  Elle cherchera à comprendre votre positionnement, votre clientèle cible, vos concurrents directs,
  et ce que vous voulez que les gens ressentent en voyant votre marque.
</p>
<p>
  Si au premier contact on vous demande principalement "quelles couleurs vous aimez ?" sans explorer
  votre marché, méfiez-vous. Un bon studio commence par le "pourquoi" avant le "quoi".
</p>

<h2>Critère 3 : La transparence sur le processus</h2>
<p>
  Avant de signer, vous devriez pouvoir répondre à ces questions :
</p>
<ul>
  <li>Combien d'étapes compte le projet et combien de temps dure chacune ?</li>
  <li>Combien de révisions sont incluses dans le devis ?</li>
  <li>Qui sera mon interlocuteur tout au long du projet ?</li>
  <li>Comment se passent les présentations créatives — à distance ou en présentiel ?</li>
  <li>Quels formats de fichiers reçois-je à la livraison ?</li>
</ul>
<p>
  Un prestataire qui hésite, qui reste vague, ou qui présente son processus comme "flexible selon les besoins"
  sans cadre précis risque de vous mener vers des délais prolongés et des frustrations de part et d'autre.
</p>

<h2>Critère 4 : Les références et avis clients</h2>
<p>
  Demandez des références — pas seulement des logos clients à qui vous n'avez aucun accès, mais des
  contacts réels que vous pouvez appeler ou des avis vérifiables sur Google, Clutch ou LinkedIn.
</p>
<p>
  Les questions à poser à une référence : Comment s'est passée la collaboration au quotidien ? Le délai
  annoncé a-t-il été respecté ? Le résultat final correspond-il à ce qui avait été promis ? Recommanderiez-vous
  ce studio ?
</p>

<h2>Critère 5 : L'adéquation culturelle</h2>
<p>
  Bruxelles est une ville multilingue, multiculturelle, avec une sensibilité particulière à l'équilibre
  entre créativité et pragmatisme. Assurez-vous que l'agence que vous choisissez comprend votre marché
  cible — que vous visiez des clients francophones, néerlandophones, ou internationaux.
</p>
<p>
  Pour une entreprise bruxelloise qui opère principalement en français, un studio local avec une
  vraie compréhension du marché belge sera souvent plus efficace qu'une grande agence parisienne
  ou une plateforme internationale généraliste.
</p>

<h2>Critère 6 : La clarté des droits et de la propriété</h2>
<p>
  Ce point est souvent négligé jusqu'à ce qu'il devienne un problème. Assurez-vous que le contrat
  précise clairement :
</p>
<ul>
  <li>Que vous possédez intégralement le logo et l'identité visuelle à la livraison</li>
  <li>Que les fichiers sources (AI, SVG, EPS) vous seront transmis — pas seulement les exports PNG</li>
  <li>Qu'il n'y a pas de clause de réutilisation qui permettrait à l'agence de réutiliser vos éléments pour d'autres clients</li>
</ul>
<p>
  Chez SQWR Studio, la propriété des livrables est intégralement transférée au client dès la livraison finale,
  sans restriction d'utilisation.
</p>

<h2>Critère 7 : Le rapport qualité/prix réel (pas seulement le prix)</h2>
<p>
  Ne comparez pas des prix, comparez des périmètres. Un devis à 800€ qui ne comprend que le logo PNG
  et un devis à 1 500€ qui comprend le système complet (logo + charte + fichiers sources + assets sociaux)
  ne sont pas comparables — le second est probablement moins cher au final.
</p>
<p>
  Demandez à chaque prestataire de décrire précisément ce que comprend son devis. Puis faites le ratio
  valeur/coût — pas seulement le coût.
</p>

<h2>Les erreurs classiques dans la sélection d'une agence</h2>

<h3>Erreur 1 : Choisir l'agence la plus connue par défaut</h3>
<p>
  La notoriété d'une agence n'est pas toujours corrélée à la qualité du service rendu aux petits clients.
  Les grandes agences bruxelloises réservent souvent leurs meilleures équipes à leurs plus gros comptes.
  Votre projet de 3 000€ sera peut-être géré par un junior.
</p>

<h3>Erreur 2 : Décider seul sans impliquer l'équipe</h3>
<p>
  L'identité visuelle sera utilisée par toute votre organisation. Si vous avez des associés, des équipes
  commerciales ou des collaborateurs, impliquez-les dans le processus de sélection — au moins pour valider
  les directions créatives finales.
</p>

<h3>Erreur 3 : Ne pas prévoir d'évolutions futures</h3>
<p>
  Votre identité de marque devra s'adapter. Choisissez un prestataire avec qui vous pourrez continuer
  à travailler — pour ajouter un asset, ajuster une couleur, ou développer votre système de marque
  quand votre activité grandit.
</p>

<h2>Notre approche chez SQWR Studio</h2>
<p>
  Nous sommes un studio bruxellois fondé par deux frères — Samuel (stratégie) et Joakim (création,
  formation La Cambre). Notre taille nous permet de rester directement impliqués dans chaque projet,
  sans déléguer à une équipe junior que vous ne rencontrerez jamais.
</p>
<p>
  Nous travaillons avec des startups, PME et marques qui veulent une identité visuelle professionnelle
  sans payer les overhead d'une grande agence. Nos projets branding démarrent à 1 500€.
</p>
<p>
  Si vous cherchez une agence de branding à Bruxelles pour votre projet, nous serions heureux d'en
  discuter. <a href="/contact">Contactez-nous</a> pour un premier échange sans engagement.
</p>
    `.trim(),
    publishedAt: '2026-03-03T09:00:00+01:00',
    updatedAt: '2026-03-03T09:00:00+01:00',
    category: 'branding',
    categoryLabel: 'Branding',
    author: 'Samuel Baudon',
    authorTitle: 'Directeur Stratégie, SQWR Studio',
    readingTime: 9,
    featured: false,
  },
  {
    slug: 'site-web-sur-mesure-vs-wordpress-wix-belgique',
    title: 'Site web sur-mesure vs WordPress vs Wix : que choisir en 2025 ?',
    description:
      "Comparatif complet entre site web sur-mesure (React/Next.js), WordPress et Wix pour les entreprises belges. Coûts, performances, SEO, flexibilité. Guide SQWR Studio.",
    excerpt:
      "WordPress, Wix, Shopify, ou site sur-mesure en React/Next.js ? Chaque option a ses avantages. Voici un comparatif honnête pour les entreprises belges qui doivent choisir.",
    content: `
<h2>La question que chaque entrepreneur se pose</h2>
<p>
  Quand vient le moment de créer ou refaire son site web, la première question qui surgit est souvent :
  "Est-ce que j'ai vraiment besoin d'un site sur-mesure, ou est-ce que WordPress ou Wix feront l'affaire ?"
</p>
<p>
  C'est une bonne question — et la réponse honnête est : ça dépend. Chaque option a des avantages réels,
  et le choix optimal dépend de vos objectifs, de votre budget, et de vos contraintes techniques.
  Voici un comparatif sans langue de bois.
</p>

<h2>Option 1 : Wix, Squarespace, Webflow — les constructeurs no-code</h2>

<h3>Pour qui ?</h3>
<p>
  Idéal pour les auto-entrepreneurs, les artisans, les professions libérales qui ont besoin d'une
  présence en ligne simple et rapide. Si votre site est principalement une carte de visite digitale
  avec quelques pages et un formulaire de contact, ces outils peuvent suffire.
</p>

<h3>Avantages</h3>
<ul>
  <li>Démarrage rapide — un site fonctionnel en quelques jours</li>
  <li>Coût initial faible — les plans de base démarrent autour de 15-30€/mois</li>
  <li>Pas de maintenance technique requise — les mises à jour sont automatiques</li>
  <li>Interface visuelle intuitive pour modifier le contenu</li>
</ul>

<h3>Inconvénients réels</h3>
<ul>
  <li>Coût total élevé sur la durée — sur 5 ans, 15€/mois = 900€ + les plans plus chers selon les fonctionnalités</li>
  <li>Performances médiocres — les scores Core Web Vitals (LCP, INP, CLS) sont généralement entre 40 et 70/100</li>
  <li>SEO limité — les outils no-code génèrent du code mal structuré qui pénalise l'indexation Google</li>
  <li>Design générique — vos concurrents utilisent peut-être les mêmes templates</li>
  <li>Pas de propriété réelle — si la plateforme disparaît ou change ses conditions, vous perdez tout</li>
</ul>

<h2>Option 2 : WordPress — le CMS dominant</h2>

<h3>Pour qui ?</h3>
<p>
  WordPress est une bonne option pour les blogs, les sites éditoriaux, les sites institutionnels
  qui ont besoin d'une gestion de contenu fréquente par des équipes non-techniques.
</p>

<h3>Avantages</h3>
<ul>
  <li>Énorme écosystème de plugins et de thèmes</li>
  <li>Gestion de contenu accessible pour les non-développeurs</li>
  <li>Hébergement flexible — vous choisissez votre hébergeur</li>
  <li>Large communauté et documentation abondante</li>
</ul>

<h3>Inconvénients réels</h3>
<ul>
  <li>Sécurité — WordPress est la cible principale des cyberattaques par sa popularité. Sans maintenance régulière, votre site est vulnérable.</li>
  <li>Performance — un WordPress avec 20+ plugins charge lentement. Les scores Lighthouse sont rarement au-dessus de 70 sans optimisation poussée.</li>
  <li>Coût total — thème premium (60-200€) + plugins payants (50-300€/an) + hébergement (5-30€/mois) + maintenance (0-200€/mois) s'accumulent vite.</li>
  <li>Dette technique — les mises à jour WordPress peuvent casser vos plugins, et les mises à jour de plugins peuvent casser votre thème.</li>
</ul>

<h2>Option 3 : Site sur-mesure React/Next.js</h2>

<h3>Pour qui ?</h3>
<p>
  Pour les entreprises qui veulent un site performant, différencié, propriétaire, et optimisé pour
  le SEO et les Core Web Vitals. Idéal pour les PME, les startups, les agences, et toute entreprise
  pour qui son site est un outil de génération de leads — pas juste une plaquette.
</p>

<h3>Avantages</h3>
<ul>
  <li>
    <strong>Performances exceptionnelles</strong> — les sites Next.js bien développés atteignent
    90+ en Core Web Vitals, contre 40-70 pour les builders. Google favorise les sites rapides dans son classement.
  </li>
  <li>
    <strong>SEO optimal</strong> — le rendu côté serveur (SSR) garantit que Google indexe tout votre contenu.
    Les builders no-code et WordPress mal configurés peuvent laisser du contenu non-indexé.
  </li>
  <li>
    <strong>Propriété totale</strong> — vous possédez votre code. Pas d'abonnement perpétuel.
    Si vous changez d'hébergeur ou d'agence dans 5 ans, vous emportez votre site.
  </li>
  <li>
    <strong>Design unique</strong> — votre site ne ressemble à aucun autre. Impossible avec un template partagé.
  </li>
  <li>
    <strong>Sécurité supérieure</strong> — pas de base de données WordPress à maintenir, pas de plugins
    tiers vulnérables. Un site Next.js statique ou hybride est fondamentalement plus sûr.
  </li>
  <li>
    <strong>Hébergement économique</strong> — Vercel (créateur de Next.js) propose un plan gratuit
    généreux. Pour la plupart des PME, l'hébergement coûte 0-20€/mois.
  </li>
</ul>

<h3>Inconvénients réels</h3>
<ul>
  <li>Coût initial plus élevé — un site sur-mesure Next.js démarre généralement à 1 500€</li>
  <li>Modifications de contenu nécessitent un développeur — à moins d'intégrer un CMS headless (Sanity, Contentful)</li>
  <li>Délai de développement plus long — 3 à 6 semaines vs 1 à 2 semaines pour un template</li>
</ul>

<h2>Comparaison chiffrée sur 5 ans</h2>
<p>Prenons un exemple réaliste pour une PME belge :</p>

<h3>Wix Pro</h3>
<ul>
  <li>Coût mensuel : 25€/mois</li>
  <li>Total sur 5 ans : 1 500€</li>
  <li>Score Lighthouse moyen : 55/100</li>
  <li>Propriété du code : Non</li>
</ul>

<h3>WordPress (géré)</h3>
<ul>
  <li>Développement initial : 2 000-4 000€ + thème : 100€ + hébergement : 15€/mois + maintenance : 50€/mois</li>
  <li>Total sur 5 ans : ~6 000-8 000€</li>
  <li>Score Lighthouse moyen : 60-75/100 (avec optimisation)</li>
  <li>Propriété du code : Oui, mais dépendant de l'écosystème WordPress</li>
</ul>

<h3>Site sur-mesure Next.js (SQWR Studio)</h3>
<ul>
  <li>Développement initial : 1 500-3 000€ + hébergement Vercel : 0-20€/mois</li>
  <li>Total sur 5 ans : 1 500-4 200€</li>
  <li>Score Lighthouse moyen : 90+/100</li>
  <li>Propriété du code : Oui, totalement</li>
</ul>

<h2>Notre recommandation selon votre profil</h2>

<h3>Vous êtes auto-entrepreneur ou artisan avec un budget très serré</h3>
<p>
  Un Wix ou Squarespace peut suffire dans un premier temps. Mais prévoyez de migrer vers une
  solution plus sérieuse quand votre activité se développe — le SEO seul justifiera le changement.
</p>

<h3>Vous avez beaucoup de contenu à gérer régulièrement</h3>
<p>
  Un CMS headless (Sanity + Next.js) ou WordPress avec un thème optimisé peut être la bonne option.
  Vous conservez la facilité d'édition tout en gagnant en performances.
</p>

<h3>Vous voulez maximiser vos conversions et votre visibilité SEO</h3>
<p>
  Un site sur-mesure React/Next.js est l'investissement le plus rentable sur le long terme.
  Chez SQWR Studio, nos sites atteignent systématiquement 90+ en Core Web Vitals — ce qui
  se traduit par un meilleur classement Google et un meilleur taux de conversion.
</p>
<p>
  Vous voulez en savoir plus sur nos solutions web sur-mesure ? <a href="/services">Découvrez nos services</a>
  ou <a href="/contact">contactez-nous</a> pour discuter de votre projet.
</p>
    `.trim(),
    publishedAt: '2026-03-03T14:00:00+01:00',
    updatedAt: '2026-03-03T14:00:00+01:00',
    category: 'web',
    categoryLabel: 'Web',
    author: 'Samuel Baudon',
    authorTitle: 'Directeur Stratégie, SQWR Studio',
    readingTime: 10,
    featured: false,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}
