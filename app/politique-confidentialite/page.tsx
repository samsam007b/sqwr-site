import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et traitement des données personnelles de SQWR Studio.',
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-36 pb-24">
      <p aria-hidden="true" className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8">
        Légal
      </p>
      <h1 className="font-display font-normal text-4xl lg:text-5xl text-foreground mb-16 leading-tight">
        Politique de<br />confidentialité
      </h1>

      <div className="space-y-12 text-secondary/70 font-light leading-relaxed">

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            1. Responsable du traitement
          </h2>
          <ul className="space-y-1">
            <li><strong className="font-medium text-foreground">SQWR Studio</strong></li>
            <li>Bruxelles, Belgique</li>
            <li>Contact : <a href="mailto:studio@sqwr.be" className="text-primary hover:underline">studio@sqwr.be</a></li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            2. Données collectées
          </h2>
          <p>
            Nous collectons uniquement les données que vous nous transmettez volontairement via le formulaire de contact :
          </p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Nom d&apos;entreprise (optionnel)</li>
            <li>Type de service souhaité</li>
            <li>Budget indicatif (optionnel)</li>
            <li>Message libre</li>
          </ul>
          <p className="mt-4">
            Ce site utilise <strong className="font-medium text-foreground">Plausible Analytics</strong>, un outil d&apos;analyse d&apos;audience respectueux de votre vie privée, sans cookies. Les données collectées (page visitée, référent, navigateur, OS, pays) sont anonymisées et ne permettent pas de vous identifier personnellement. Aucun cookie de suivi n&apos;est déposé. Pour en savoir plus ou exercer votre droit d&apos;opposition : <a href="https://plausible.io/data-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">plausible.io/data-policy</a>.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            3. Finalités et base légale
          </h2>
          <p>
            Les données collectées via le formulaire de contact sont traitées aux fins suivantes :
          </p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>Répondre à votre demande de contact — <em>base légale : intérêt légitime</em></li>
            <li>Établir un devis ou un contrat de prestation — <em>base légale : exécution d&apos;un contrat</em></li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            4. Durée de conservation
          </h2>
          <p>
            Les données de contact sont conservées pendant <strong className="font-medium text-foreground">3 ans</strong> à compter du dernier échange, conformément aux obligations légales belges. En cas de relation contractuelle, les données sont conservées <strong className="font-medium text-foreground">7 ans</strong> à des fins comptables et fiscales.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            5. Destinataires des données
          </h2>
          <p>
            Vos données sont traitées par SQWR Studio et transmises à <strong className="font-medium text-foreground">Resend Inc.</strong> (service d&apos;envoi d&apos;emails, États-Unis) dans le cadre du traitement de votre demande de contact. Aucune vente ni partage commercial de vos données n&apos;est effectué.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            6. Vos droits (RGPD)
          </h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD / UE 2016/679) et à la loi belge du 30 juillet 2018, vous disposez des droits suivants :
          </p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>Droit d&apos;accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l&apos;effacement (&laquo; droit à l&apos;oubli &raquo;)</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit d&apos;opposition au traitement</li>
            <li>Droit à la limitation du traitement</li>
          </ul>
          <p className="mt-4">
            Pour exercer ces droits, contactez-nous à :{' '}
            <a href="mailto:studio@sqwr.be" className="text-primary hover:underline">studio@sqwr.be</a>.
            Nous nous engageons à répondre dans un délai d&apos;un mois.
          </p>
          <p className="mt-4">
            Vous avez également le droit d&apos;introduire une réclamation auprès de l&apos;Autorité de protection des données (APD) belge :{' '}
            <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              autoriteprotectiondonnees.be
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            7. Sécurité
          </h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou destruction : HTTPS, protection des serveurs, accès restreint aux données.
          </p>
        </section>

        <p className="text-xs font-mono text-secondary/30 pt-8 border-t border-secondary/10">
          Dernière mise à jour : mars 2026
        </p>

      </div>
    </main>
  );
}
