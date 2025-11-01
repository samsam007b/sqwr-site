import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import IntroAnimation from "@/components/IntroAnimation";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#FAFAF8' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Créative Design - Agence de Communication Visuelle & Design",
    template: "%s | Créative Design",
  },
  description: "Agence créative spécialisée en communication visuelle, design graphique, création de logos, sites web, flyers et design réseaux sociaux. Excellence et innovation depuis 2016.",
  keywords: ["design", "graphique", "communication visuelle", "logo", "site web", "flyers", "réseaux sociaux", "branding", "identité visuelle", "UI/UX", "agence créative", "Paris"],
  authors: [{ name: "Créative Design" }],
  creator: "Créative Design",
  metadataBase: new URL('https://creative-design.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Créative Design - Agence de Communication Visuelle",
    description: "Agence créative spécialisée en communication visuelle et design graphique. Excellence et innovation.",
    url: 'https://creative-design.com',
    siteName: 'Créative Design',
    locale: 'fr_FR',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Créative Design - Agence de Communication Visuelle",
    description: "Agence créative spécialisée en communication visuelle et design graphique.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col font-sans relative">
        <IntroAnimation />
        <SmoothScroll>
          <Header />
          <main className="flex-grow relative z-10">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
