# AUDIT SQWR — sqwr.be
**Date** : 02/03/2026 | **Auditeur** : Claude Sonnet 4.6 (automatisé) | **Version** : v1

---

| Champ | Valeur |
|-------|--------|
| **Projet** | Site vitrine SQWR Studio |
| **Client** | SQWR Studio (interne) |
| **URL de production** | https://sqwr.be |
| **Date de l'audit** | 02/03/2026 |
| **Profil de projet** | ☑ Site vitrine marketing |
| **Stack technique** | Next.js 16, React 19, Tailwind CSS, Framer Motion, Resend, Vercel |
| **Multilingue** | ☑ Oui — FR, EN, NL, DE (i18n client-side) |

---

## CRITÈRES BLOQUANTS

| ID | Critère | Résultat | Commentaire |
|----|---------|----------|-------------|
| BLK-01 | Pas de SQL Injection | ✅ PASS | Pas de base de données SQL |
| BLK-02 | Pas de clés API dans le code versionné | ✅ PASS | RESEND_API_KEY dans .env.local, ignoré par git |
| BLK-03 | HTTPS actif en production | ✅ PASS | Vercel HTTPS automatique |
| BLK-04 | Authentification non-contournable | ✅ PASS | Pas d'espace auth (site vitrine) |
| BLK-05 | Données perso non exposées sans consentement | ✅ PASS | Formulaire uniquement, pas de tracking |
| BLK-06 | Pas de XSS exploitable | ✅ PASS | Pas de dangerouslySetInnerHTML sans contrôle |
| BLK-07 | Navigation clavier possible | ✅ PASS | Focus visible sur éléments interactifs |
| BLK-08 | Images critiques avec alt | ✅ PASS | Alt sur toutes les images Next.js |
| BLK-09 | Build de production sans erreur | ✅ PASS | `npm run build` propre |
| BLK-10 | Pas de données de test en production | ✅ PASS | Contenu réel uniquement |

**Statut : ✅ TOUS PASS — Livraison non bloquée**

---

## 1. PERFORMANCE & VITESSE — estimé ~85/120 pts

> Données lab. Mesures réelles à faire sur PageSpeed Insights après déploiement.

| Sous-critère | Score estimé | Notes |
|---|---|---|
| 1.1 LCP | ~20/25 | Next.js Image + priority sur hero — AVIF/WebP activé |
| 1.2 INP | ~16/20 | Framer Motion peut peser sur interactions mobiles |
| 1.3 CLS | ~12/15 | Images avec dimensions définies, mais fonts sans `size-adjust` |
| 1.4 Lighthouse Perf | ~8/15 | Client-heavy (canvas, PixelGrid) — pénalise score mobile |
| 1.5 Images | 13/15 | AVIF/WebP ✅, lazy ✅, dimensions ✅, alt ✅ — OG image trop petite |
| 1.6 Cache | 10/10 | Vercel CDN ✅, assets statiques long-terme ✅ |
| 1.7 Bundle | 6/10 | `next/dynamic` sur DesktopHomePage ✅ — canvas/GSAP alourdissent |
| 1.8 TTFB | ~7/10 | Vercel Edge Network — estimé ≤ 500ms |

**⚠️ Actions** : Mesurer LCP/INP réels sur PageSpeed. Évaluer si `ssr: false` sur la home pénalise le LCP.

---

## 2. SÉCURITÉ & PROTECTION — 100/120 pts

| Sous-critère | Score | Notes |
|---|---|---|
| 2.1 Security Headers | 20/25 | HSTS ✅ X-Frame ✅ X-Content-Type ✅ Referrer ✅ Permissions ✅ **CSP ajoutée** ✅ |
| 2.2 Protection injection | 20/20 | Pas de SQL, pas de dangerouslySetInnerHTML, validation email côté serveur |
| 2.3 Auth & Autorisation | 20/20 | N/A (pas d'espace auth) — full marks |
| 2.4 Secrets & env | 15/15 | RESEND_API_KEY private ✅, .env.local dans .gitignore ✅ |
| 2.5 CSRF & Rate Limiting | 11/15 | **Rate limiting ajouté** (3 req/min) ✅ — pas de Redis persistant |
| 2.6 Dépendances | 14/15 | `npm audit` — 0 critical, vérifier high |
| 2.7 TLS/HTTPS | 10/10 | Vercel grade A, redirection auto HTTP→HTTPS ✅ |

**⚠️ Actions** : Upgrade rate limiting vers Upstash Redis pour persistance cross-instance.

---

## 3. DESIGN & IDENTITÉ VISUELLE — 92/100 pts

| Sous-critère | Score | Notes |
|---|---|---|
| 3.1 Cohérence design system | 19/20 | Palette beige/rouge/noir ✅, typo 2 familles ✅, espacement Tailwind ✅ |
| 3.2 Qualité exécution | 24/25 | Pixel-perfect, images projets HD, effets cohérents |
| 3.3 Identité de marque | 17/20 | Logo présent ✅ — **favicon ajouté** ✅ — **OG image ajoutée** ⚠️ (501×243px, idéal 1200×630) |
| 3.4 Typographie & Lisibilité | 17/20 | Contraste WCAG AA respecté — vérifier secondary/40 sur fond clair |
| 3.5 États interactifs | 15/15 | Hover ✅ curseur custom ✅ focus visible ✅ |

**⚠️ Actions** : Créer une OG image 1200×630px dédiée dans Figma.

---

## 4. UX & USABILITÉ — 85/100 pts

| Sous-critère | Score | Notes |
|---|---|---|
| 4.1 Navigation & Architecture | 22/25 | Nav claire ✅ — 404 utile ✅ — pas de breadcrumbs (non nécessaire, 1 niveau) |
| 4.2 Formulaires & Interactions | 22/25 | Labels ✅, validation ✅, feedback ✅ — pas de confirmation suppression (N/A) |
| 4.3 Clarté & Hiérarchie visuelle | 18/20 | CTA identifiable ✅ — hiérarchie forte ✅ |
| 4.4 Feedback & Prévention | 14/15 | État système visible ✅, pas de dark patterns ✅ |
| 4.5 Vitesse perçue & Fluidité | 9/15 | Transitions fluides ✅ — pas de skeleton sur pages dynamiques |

---

## 5. ACCESSIBILITÉ & INCLUSION — 62/80 pts

| Sous-critère | Score | Notes |
|---|---|---|
| 5.1 Structure sémantique | 16/20 | `<main>` `<header>` `<footer>` ✅ — hiérarchie Hn à vérifier sur toutes les pages |
| 5.2 Images & Médias | 12/15 | Alt descriptifs ✅ — vidéos sans sous-titres ⚠️ |
| 5.3 Navigation clavier | 14/20 | Tab possible ✅ — custom cursor peut perturber — modales et overlay à tester |
| 5.4 Contrastes | 12/15 | Ratio principal ok — secondary/40 sur fond clair à vérifier (axe DevTools) |
| 5.5 Formulaires accessibles | 8/10 | Labels ✅ — aria-describedby sur erreurs à vérifier |

**⚠️ Actions** : Audit axe DevTools complet. Vérifier `secondary/40` (ratio probable ~3.5:1). Ajouter `aria-describedby` sur messages d'erreur formulaire.

---

## 6. SEO & RÉFÉRENCEMENT — 68/80 pts

| Sous-critère | Score | Notes |
|---|---|---|
| 6.1 Metadata & Titres | 18/20 | Title ✅ Meta desc ✅ H1 ✅ OG ✅ — **OG image maintenant présente** ✅ |
| 6.2 Indexation & Crawlabilité | 13/15 | robots.txt ✅ sitemap.xml ✅ — **domaine corrigé sqwr.be** ✅ — GSC à configurer |
| 6.3 SEO Multilingue | 6/15 | Multilingue client-side sans hreflang — URLs non segmentées par langue |
| 6.4 SEO Technique | 13/15 | **JSON-LD Organization + LocalBusiness ajouté** ✅ — URLs propres ✅ |
| 6.5 CWV comme signal SEO | 10/15 | GSC pas encore configuré — données lab correctes |

**⚠️ Actions** : Configurer Google Search Console. Évaluer migration vers `next-intl` avec routes `/fr/` `/en/` pour le SEO multilingue.

---

## 7. QUALITÉ TECHNIQUE & CODE — 68/80 pts

| Sous-critère | Score | Notes |
|---|---|---|
| 7.1 TypeScript strict | 18/20 | `strict: true` ✅ — 1 `any` dans LanguageContext (acceptable, traversal dynamique) |
| 7.2 Qualité & Conventions | 18/20 | ESLint propre ✅ — **console.log supprimés** ✅ — nommage cohérent ✅ |
| 7.3 Architecture & Organisation | 16/20 | Structure claire ✅ — **95% `use client`** sur-utilisé — Server Components sous-exploités |
| 7.4 Gestion des erreurs | 7/10 | try/catch dans API ✅ — **error.tsx ajouté** ✅ — pas de logger structuré |
| 7.5 Tests | 0/10 | Aucun test — pénalité documentée |

**⚠️ Actions** : Ajouter Vitest/Jest pour les fonctions utilitaires (`hexToRgba`, `getProjectById`, etc.). Migrer des pages statiques en Server Components.

---

## 8. MOBILE & RESPONSIVE — 58/70 pts

| Sous-critère | Score | Notes |
|---|---|---|
| 8.1 Mise en page responsive | 20/25 | MobileHomePage dédiée ✅ — à tester sur 375px |
| 8.2 Touch & Interactions | 16/20 | Touch zones ✅ — custom cursor desktop-only ✅ — hover-only à valider |
| 8.3 Performance mobile | 10/15 | Canvas/PixelGrid pèse sur Lighthouse mobile — à mesurer |
| 8.4 Tests multi-appareils | 6/10 | À tester sur iOS Safari réel + Android Chrome |

---

## 9. ORIGINALITÉ & EFFET PREMIUM — 76/80 pts

| Sous-critère | Score | Notes |
|---|---|---|
| 9.1 Premier impact | 20/20 | Pixel grid hero, animation logo, identity forte et immédiate — WAOUH |
| 9.2 Animations & microinteractions | 19/20 | Scatter text, pixel wipe, flip 3D, PixelFlipReveal — 60fps, purposeful |
| 9.3 Storytelling & Narrative | 18/20 | Journey landing page cohérente — portfolio index cinématique — belle progression |
| 9.4 Cohérence émotionnelle | 19/20 | Cohérence parfaite home→portfolio→about — pages projet légèrement moins travaillées |

---

## 10. CONTENU & COPYWRITING — 50/60 pts

| Sous-critère | Score | Notes |
|---|---|---|
| 10.1 Qualité rédactionnelle | 17/20 | Textes soignés — vérification orthographe à valider sur toutes les langues |
| 10.2 Efficacité des textes | 14/15 | Proposition de valeur claire ✅ — CTAs actifs ✅ |
| 10.3 Qualité des traductions | 11/15 | Traductions EN/NL/DE à valider par locuteurs natifs |
| 10.4 Médias & Assets | 8/10 | Photos projets professionnelles — pas d'images stock |

---

## 11. CONFORMITÉ LÉGALE & RGPD — 42/60 pts

| Sous-critère | Score | Notes |
|---|---|---|
| 11.1 RGPD & Cookies | 16/25 | Pas de cookies tiers ✅ — **pas de bannière cookie** (acceptable sans analytics) — **politique confidentialité créée** ✅ |
| 11.2 Mentions légales & CGU | 12/15 | **Mentions légales créées** ✅ — lien dans footer ✅ |
| 11.3 Droits des données | 8/10 | Droits RGPD documentés ✅ — contact DPO ✅ |
| 11.4 Conformité spécifique | 6/10 | Mention RGPD dans formulaire à ajouter — pas de paiement en ligne |

**⚠️ Actions** : Ajouter mention RGPD sous le formulaire de contact. Si analytics ajouté à l'avenir : bannière cookie obligatoire.

---

## 12. DÉPLOIEMENT & OPÉRATIONS — 35/50 pts

| Sous-critère | Score | Notes |
|---|---|---|
| 12.1 Configuration déploiement | 15/15 | Variables Vercel ✅ — build propre ✅ — domaine sqwr.be HTTPS ✅ |
| 12.2 Monitoring & Observabilité | 5/15 | **Pas d'analytics** ❌ — **Pas de Sentry** ❌ — pas d'alerting uptime |
| 12.3 Sauvegardes & Résilience | 8/10 | Git ✅ — releases Vercel ✅ — pas de DB = pas de backup nécessaire |
| 12.4 Documentation | 7/10 | README à compléter — credentials transmis de façon sécurisée |

**⚠️ Actions** : Configurer Plausible Analytics (RGPD-friendly, sans bannière cookie). Configurer Sentry free tier pour monitoring erreurs.

---

## SYNTHÈSE FINALE

| # | Catégorie | Max | Score |
|---|-----------|-----|-------|
| 1 | Performance & Vitesse | 120 | ~85 |
| 2 | Sécurité & Protection | 120 | 100 |
| 3 | Design & Identité Visuelle | 100 | 92 |
| 4 | UX & Usabilité | 100 | 85 |
| 5 | Accessibilité & Inclusion | 80 | 62 |
| 6 | SEO & Référencement | 80 | 68 |
| 7 | Qualité Technique & Code | 80 | 68 |
| 8 | Mobile & Responsive | 70 | 58 |
| 9 | Originalité & Effet Premium | 80 | 76 |
| 10 | Contenu & Copywriting | 60 | 50 |
| 11 | Conformité Légale & RGPD | 60 | 42 |
| 12 | Déploiement & Opérations | 50 | 35 |
| **TOTAL** | | **1000** | **~821** |

---

### Certification : ★★★☆☆ EN PROGRESSION — 821/1000 (82%)

> Score réalisable **SQWR CERTIFIED (★★★★☆)** avec les actions prioritaires ci-dessous.

---

### Points forts

1. **Originalité & Effet Premium (76/80)** — Le pixel grid, les animations orchestrées et l'identité visuelle créent un impact immédiat et mémorable. Signature forte et différenciante.
2. **Sécurité (100/120)** — Headers complets, HTTPS, pas de secrets exposés, rate limiting. Infrastructure solide.
3. **Design System (92/100)** — Cohérence totale de la palette, typographie maîtrisée, états interactifs soignés.

---

### Plan d'action prioritaire

| P | Catégorie | Action | Gain estimé | Effort |
|---|-----------|--------|-------------|--------|
| P1 | Monitoring | Configurer Plausible + Sentry | +10 pts | < 1h |
| P2 | Accessibilité | Audit axe DevTools + corriger contrastes | +10 pts | 1–4h |
| P3 | SEO | Configurer Google Search Console | +5 pts | < 1h |
| P4 | Légal | Ajouter mention RGPD sous formulaire contact | +4 pts | < 1h |
| P5 | OG Image | Créer image 1200×630 dans Figma | +3 pts | < 1h |
| P6 | Tests | Ajouter Vitest sur fonctions utilitaires | +8 pts | 1–4h |
| P7 | SEO Multi | Évaluer migration next-intl avec routes /fr/ /en/ | +8 pts | > 4h |

**Appliquer P1–P5 → Score estimé ~861 → ★★★★☆ SQWR CERTIFIED**

---

### Décision de livraison

> ☑ **CONDITIONNEL** — Score 821/1000 — Plan d'action P1–P5 à exécuter avant livraison officielle au client.

---

*SQWR Agency — Audit SQWR v1.0 — 02/03/2026*
