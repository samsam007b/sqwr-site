import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de SQWR Studio, agence créative à Bruxelles.',
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-36 pb-24">
      <p className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8">
        Légal
      </p>
      <h1 className="font-display font-normal text-4xl lg:text-5xl text-foreground mb-16 leading-tight">
        Mentions légales
      </h1>

      <div className="space-y-12 text-secondary/70 font-light leading-relaxed">

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            1. Éditeur du site
          </h2>
          <p>Le site <strong className="font-medium text-foreground">sqwr.be</strong> est édité par :</p>
          <ul className="mt-3 space-y-1">
            <li><strong className="font-medium text-foreground">SQWR Studio</strong></li>
            <li>Bruxelles, Belgique</li>
            <li>Email : <a href="mailto:studio@sqwr.be" className="text-primary hover:underline">studio@sqwr.be</a></li>
            <li>Téléphone : <a href="tel:+32493302752" className="text-primary hover:underline">+32 493 30 27 52</a></li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            2. Hébergement
          </h2>
          <p>Le site est hébergé par :</p>
          <ul className="mt-3 space-y-1">
            <li><strong className="font-medium text-foreground">Vercel Inc.</strong></li>
            <li>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
            <li><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vercel.com</a></li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            3. Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, images, visuels, logos, animations) sont la propriété exclusive de SQWR Studio, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable écrite est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            4. Responsabilité
          </h2>
          <p>
            SQWR Studio s&apos;efforce de maintenir les informations publiées exactes et à jour. Cependant, nous ne pouvons garantir l&apos;exactitude, la complétude ou l&apos;actualité des informations diffusées. SQWR Studio décline toute responsabilité pour tout dommage résultant de l&apos;utilisation du site.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            5. Liens externes
          </h2>
          <p>
            Ce site peut contenir des liens vers des sites tiers. SQWR Studio n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            6. Droit applicable
          </h2>
          <p>
            Les présentes mentions légales sont régies par le droit belge. Tout litige relatif à l&apos;utilisation du site sera soumis à la compétence exclusive des tribunaux de Bruxelles.
          </p>
        </section>

        <p className="text-xs font-mono text-secondary/30 pt-8 border-t border-secondary/10">
          Dernière mise à jour : mars 2026
        </p>

      </div>
    </main>
  );
}
