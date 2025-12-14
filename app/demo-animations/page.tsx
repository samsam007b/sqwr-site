'use client';

import { useState } from 'react';
import PixelLogoAnimation from '@/components/PixelLogoAnimation';
import Link from 'next/link';

export default function DemoAnimationsPage() {
  const [currentDemo, setCurrentDemo] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const demos = [
    {
      id: 'pixel-chaos',
      name: 'Pixel Chaos → Structured',
      description: 'Pixels apparaissent aléatoirement puis se réorganisent pour former le logo',
      component: PixelLogoAnimation,
    },
    // On peut ajouter d'autres animations ici plus tard
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Show animation if active */}
      {showAnimation && currentDemo === 'pixel-chaos' && (
        <PixelLogoAnimation
          onComplete={() => {
            setShowAnimation(false);
            setCurrentDemo(null);
          }}
        />
      )}

      {/* Demo selection page */}
      {!showAnimation && (
        <div className="container mx-auto px-6 py-24">
          <div className="mb-12">
            <Link
              href="/"
              className="text-sm text-foreground/60 hover:text-primary transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </div>

          <h1 className="text-5xl font-display font-normal mb-4">
            Démo Animations Logo
          </h1>
          <p className="text-foreground/60 text-lg mb-16 max-w-2xl">
            Différentes animations pour le logo sqwr. Cliquez sur une animation pour la tester.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demos.map((demo) => (
              <div
                key={demo.id}
                className="glass-surface p-8 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  setCurrentDemo(demo.id);
                  setShowAnimation(true);
                }}
              >
                <div className="mb-4">
                  <div className="w-16 h-16 bg-foreground/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-xl font-display font-normal mb-2">
                    {demo.name}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    {demo.description}
                  </p>
                </div>
                <button className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                  Tester l'animation →
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 glass-surface rounded-xl">
            <h2 className="text-2xl font-display font-normal mb-4">
              À propos des animations
            </h2>
            <div className="text-foreground/60 space-y-3">
              <p>
                Ces animations utilisent le logo PNG original (<code className="px-2 py-1 bg-foreground/5 rounded">sqwr-logo.png</code>)
                sans le copier ni le recréer.
              </p>
              <p>
                L'animation Canvas lit chaque pixel du logo et les anime individuellement
                pour créer des effets visuels dynamiques.
              </p>
              <p className="text-sm">
                <strong>Performance :</strong> Les pixels sont échantillonnés (scale: 2) pour
                optimiser les performances tout en gardant un rendu net.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
