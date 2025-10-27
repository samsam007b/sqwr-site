# Créative Design - Site Web Minimaliste

Site web architectural et minimaliste pour l'agence Créative Design, spécialisée en communication visuelle et design graphique.

## 🎨 Caractéristiques

- **Design Minimaliste** : Inspiré de sites comme Stoempstudio, avec espaces blancs généreux et typographie épurée
- **Animations Subtiles** : Transitions fluides et micro-interactions avec Framer Motion
- **100% Responsive** : Optimisé pour tous les appareils (mobile, tablette, desktop)
- **Performance Optimisée** : Code optimisé pour des performances maximales
- **SEO-Friendly** : Métadonnées et structure optimisées pour le référencement
- **Accessibilité** : Conforme aux standards WCAG AA

## 🛠️ Technologies

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique pour un code plus robuste
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations fluides et performantes
- **Google Fonts** - Inter & Playfair Display

## 📁 Structure du Projet

```
skwr-agency/
├── app/                      # Pages Next.js (App Router)
│   ├── page.tsx             # Page d'accueil
│   ├── services/            # Page Services
│   ├── portfolio/           # Page Portfolio
│   ├── about/               # Page À propos
│   ├── contact/             # Page Contact
│   ├── layout.tsx           # Layout principal
│   └── globals.css          # Styles globaux
├── components/              # Composants réutilisables
│   ├── Header.tsx          # En-tête avec navigation
│   ├── Footer.tsx          # Pied de page
│   ├── ScrollReveal.tsx    # Animations au scroll
│   └── ProjectCard.tsx     # Carte de projet
├── public/                 # Assets statiques
└── README.md              # Documentation
```

## 🚀 Installation et Démarrage

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

1. Cloner le repository :
```bash
git clone <repository-url>
cd skwr-agency
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📝 Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm start` - Lance l'application en mode production
- `npm run lint` - Vérifie le code avec ESLint

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.ts` :

```typescript
colors: {
  primary: "#000000",    // Noir
  secondary: "#FFFFFF",  // Blanc
  accent: "#2563eb",     // Bleu (personnalisable)
}
```

### Typographie

Les polices sont configurées dans `app/layout.tsx` :
- **Inter** : Police sans-serif pour le corps du texte
- **Playfair Display** : Police serif pour les titres

Pour changer les polices, modifiez les imports dans `layout.tsx`.

### Contenu

Pour modifier le contenu :
- **Page d'accueil** : `app/page.tsx`
- **Services** : `app/services/page.tsx`
- **Portfolio** : `app/portfolio/page.tsx`
- **À propos** : `app/about/page.tsx`
- **Contact** : `app/contact/page.tsx`

## 📱 Pages

### 1. Accueil (`/`)
- Hero section avec baseline forte
- Présentation de l'agence
- Grille de services
- Showcase de projets phares
- CTA vers contact

### 2. Services (`/services`)
- Liste détaillée des 6 services principaux
- Méthodologie en 4 étapes
- CTA pour obtenir un devis

### 3. Portfolio (`/portfolio`)
- Grille de projets avec filtres par catégorie
- Système de filtrage interactif
- Cartes de projets avec animations hover

### 4. À propos (`/about`)
- Histoire de l'agence
- Statistiques clés
- Valeurs et philosophie
- Présentation de l'équipe

### 5. Contact (`/contact`)
- Formulaire de contact complet
- Informations de contact
- Liens réseaux sociaux
- Section carte (placeholder)

## 🚀 Déploiement

### Vercel (Recommandé)

Le moyen le plus simple de déployer une application Next.js :

1. Push le code sur GitHub
2. Connecter le repository à [Vercel](https://vercel.com)
3. Vercel détectera automatiquement Next.js et configurera le build

### Netlify

```bash
npm run build
```

Puis déployer le dossier `.next` sur Netlify.

### Autres plateformes

Consulter la [documentation Next.js](https://nextjs.org/docs/deployment) pour d'autres options.

## 📊 Performance

Le site est optimisé pour atteindre d'excellents scores Lighthouse :
- Performance : 90+
- Accessibility : 95+
- Best Practices : 100
- SEO : 100

## 🔧 Améliorations Futures

- [ ] Ajouter un système de gestion de contenu (CMS)
- [ ] Intégrer de vraies images pour les projets
- [ ] Ajouter des pages de détail pour chaque projet
- [ ] Intégrer l'API de formulaire de contact
- [ ] Ajouter Google Analytics
- [ ] Ajouter des tests unitaires et e2e
- [ ] Implémenter l'internationalisation (i18n)
- [ ] Ajouter un blog

## 📄 Licence

Tous droits réservés - Créative Design © 2024

## 🤝 Support

Pour toute question ou support, contactez :
- Email : contact@creative-design.com
- Téléphone : +33 1 23 45 67 89

---

Développé avec ❤️ pour Créative Design
