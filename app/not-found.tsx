import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 lg:px-12">
      <div className="max-w-2xl w-full text-center">
        <ScrollReveal>
          <p className="text-xs font-mono uppercase tracking-wider text-primary mb-6">
            Erreur 404
          </p>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-bold mb-8 leading-tight">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 text-balance">
            Page non trouvée
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-secondary/70 mb-12 max-w-xl mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-foreground text-paper hover:bg-foreground/90 transition-colors duration-200 rounded-lg"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/portfolio"
              className="inline-block px-8 py-4 glass-surface hover:shadow-lg transition-shadow duration-200 rounded-lg"
            >
              Voir le portfolio
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
