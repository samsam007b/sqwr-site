# SQWR Studio — Site web

Site vitrine de **SQWR Studio**, agence créative bruxelloise spécialisée en branding, web sur-mesure et social media.

**URL de production :** [sqwr.be](https://sqwr.be)

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript 5.9 |
| Styles | Tailwind CSS 3 |
| Animations | Framer Motion 11 + GSAP 3 |
| Smooth scroll | Lenis 1 |
| Polices | Space Grotesk (display) · Inter (corps) · JetBrains Mono (mono) — via `next/font` |
| Email | Resend API |
| Déploiement | Vercel |
| Tests | Vitest |

---

## Architecture des dossiers

```
sqwr-site/
├── app/
│   ├── layout.tsx          # Root layout — next/font, JSON-LD, hreflang
│   ├── page.tsx            # Homepage
│   ├── portfolio/
│   │   ├── page.tsx        # Liste des projets (PixelRowCanvas)
│   │   ├── loading.tsx     # Skeleton portfolio
│   │   └── [id]/page.tsx   # Page projet dynamique + JSON-LD CreativeWork
│   ├── services/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── about/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── contact/page.tsx    # Formulaire (accessibilité ARIA, mention RGPD)
│   ├── api/contact/        # API route Resend + rate limiting
│   ├── data/projects.ts    # Source de vérité des projets
│   ├── opengraph-image.tsx # OG image 1200×630 via next/og (edge)
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── mentions-legales/
│   └── politique-confidentialite/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx          # Liens légaux
│   ├── PixelWipeTransition.tsx
│   ├── PixelRevealAnimation.tsx
│   └── ScrollReveal.tsx
├── context/
│   └── LanguageContext.tsx # i18n client-side (fr/en/nl/de)
├── locales/
│   └── translations.ts
├── tests/
│   └── utils.test.ts       # Vitest — hexToRgba, projects utils
└── public/
    └── Logo SQWR/
```

---

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
# Obligatoire — envoi du formulaire de contact
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Optionnel — analytics RGPD-compliant (sans cookies)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=sqwr.be

# Optionnel — error monitoring
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

## Commandes

```bash
# Développement
npm run dev

# Build production
npm run build

# Lancement en production
npm start

# Vérification TypeScript
npm run type-check

# Linting
npm run lint

# Tests unitaires
npm run test

# Tests en watch mode
npm run test:watch
```

---

## Internationalisation

L'i18n est géré côté client via `LanguageContext` (4 langues : fr, en, nl, de).
Les traductions sont centralisées dans `locales/translations.ts`.
Pas de routes séparées `/fr/` `/en/` — la langue est persistée dans `localStorage` et détectée via `navigator.language`.

---

## API Contact

`POST /api/contact` — Rate limited (3 req/min par IP, in-memory).

**Body :**
```json
{
  "name": "string",
  "email": "string",
  "company": "string (optionnel)",
  "service": "string",
  "budget": "string (optionnel)",
  "message": "string"
}
```

L'email est envoyé via **Resend** à `studio@sqwr.be`.

---

## Déploiement

Le site est déployé sur **Vercel** via CI/CD automatique depuis la branche `main`.

Pour activer Plausible Analytics ou Sentry, ajouter les variables d'environnement correspondantes dans les paramètres du projet Vercel.

---

## Sécurité

- En-têtes HTTP : HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- CSP restrictive : `font-src 'self'` (polices self-hostées via next/font, zéro requête Google Fonts)
- Rate limiting sur l'API contact
- `robots: noindex` sur les pages légales
