# sqwr-site — Contrat IA

> Site officiel SQWR Studio (sqwr.be)
> Généré depuis SQWR Project Kit — mis à jour manuellement selon l'évolution du projet.

---

## Qui travaille avec toi

**Samuel Baudon** — fondateur SQWR Studio, directeur stratégie.
**Joakim Baudon** — co-fondateur, directeur créatif (La Cambre).

| Contact | Valeur |
|---------|--------|
| Email SQWR | studio@sqwr.be |
| Tél | +32 493 30 27 52 |
| Adresse | Square Coghen 16, 1180 Uccle |

Identité complète : `/Users/samuelbaudon/Desktop/SQWR/Project-Kit/SAMUEL-IDENTITY.md`

---

## Ce projet

**Nom :** sqwr-site
**Description :** Site vitrine de l'agence créative SQWR Studio. Showcase des services (branding, web, custom), portfolio clients, et contact.
**URL prod :** https://sqwr.be
**Statut :** Production (Vercel, auto-deploy depuis `main`)

**Stack :**
- Next.js 16 + React 19 + TypeScript 5.9
- Tailwind CSS 3 + Framer Motion 11 + GSAP 3
- Vercel (déploiement) + Resend (emails contact) + Plausible (analytics, no-cookie)
- Internationalisation : 4 langues (fr/en/nl/de) via LanguageContext client-side

---

## Architecture

```
sqwr-site/
├── src/
│   ├── app/              → Routes Next.js App Router
│   │   ├── layout.tsx    → Layout racine + metadata globale
│   │   ├── page.tsx      → Homepage (SSR obligatoire)
│   │   └── api/
│   │       └── contact/  → Route Handler email Resend
│   ├── components/
│   │   ├── animations/   → PixelWipeTransition, PixelReveal, ScrollReveal
│   │   └── sections/     → HeroSection, ServicesSection, etc.
│   └── lib/
│       └── i18n/         → Fichiers de traduction (fr/en/nl/de)
├── public/
│   └── projects/         → Assets clients (images portfolio)
└── AUDIT-SQWR-2026-03-02.md → Dernier audit SEO (score 25/100)
```

**Fichiers critiques :**

| Fichier | Rôle |
|---------|------|
| `src/app/layout.tsx` | Layout racine, metadata, JSON-LD |
| `src/app/page.tsx` | Homepage — DOIT être Server Component |
| `src/app/api/contact/route.ts` | API email — rate limiting actif |
| `src/lib/i18n/` | Traductions — modifier les 4 langues en sync |

---

## Contrats actifs

Lire avant toute intervention sur ce projet :
- `/Users/samuelbaudon/Desktop/SQWR/Project-Kit/contracts/CONTRACT-NEXTJS.md`
- `/Users/samuelbaudon/Desktop/SQWR/Project-Kit/contracts/CONTRACT-VERCEL.md`
- `/Users/samuelbaudon/Desktop/SQWR/Project-Kit/contracts/CONTRACT-DESIGN.md`
- `/Users/samuelbaudon/Desktop/SQWR/Project-Kit/contracts/CONTRACT-TYPESCRIPT.md`

---

## Règles absolues

### Ne jamais faire

- **Passer la homepage (`page.tsx`) en `'use client'`** — c'est la page SEO la plus critique
- **Utiliser `dynamic(..., { ssr: false })` sur des pages indexées** — casse le SEO (audit : score 25/100)
- **Modifier les traductions dans une seule langue** — toujours modifier les 4 (fr/en/nl/de) en sync
- **Supprimer les JSON-LD schemas** (CreativeWork, LocalBusiness) — critiques pour le SEO local Bruxelles
- **Écrire des prix ou données SQWR sans source** — utiliser `GRILLE-TARIFAIRE.md` comme référence
- **Ajouter des animations sur des éléments texte SEO-critiques** — pénalise le Core Web Vitals

### Toujours faire

- Vérifier que toute nouvelle page exporte `metadata` ou `generateMetadata`
- Après modification du contact form : tester le rate limiting
- Après modification des animations : vérifier que `prefers-reduced-motion` est respecté
- Avant merge sur `main` : `npm run build` doit passer sans erreur

---

## Contexte SEO critique

**Score actuel : 25/100** (audit 2026-03-03)

Problème principal : contenu non indexé par Google car pages en `'use client'`.

Mots-clés cibles :
- "agence branding bruxelles"
- "site web react bruxelles"
- "création logo belgique"

Sprints SEO en cours :
- Sprint 0 : Architecture (convertir pages en Server Components) → **EN COURS**
- Sprint 1 : Foundations techniques (Core Web Vitals, structured data)
- Sprint 2 : Content & Authority (blog, backlinks)

---

## Historique des erreurs

| Date | Erreur | Statut |
|------|--------|--------|
| 2026-03-03 | `ssr: false` sur homepage détecté en audit — contenu non indexé | À corriger (Sprint 0) |
| 2026-03-03 | Toutes les pages `'use client'` → pas de SSR → Google ne voit pas le contenu | En cours |
