import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DesktopOnlyProviders from "@/components/DesktopOnlyProviders";
import PixelWipeTransition from "@/components/PixelWipeTransition";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import CookieConsent from "@/components/CookieConsent";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FAFAF8',
};

export const metadata: Metadata = {
  title: {
    default: "SQWR Studio — Agence créative Bruxelles | Branding & Web sur-mesure",
    template: "%s | SQWR Studio",
  },
  description: "Studio créatif familial à Bruxelles. Identités visuelles, sites web sur-mesure (React/Next.js), stratégie social media. Qualité agence, prix accessible.",
  keywords: ["design", "graphique", "communication visuelle", "logo", "site web", "branding", "identité visuelle", "UI/UX", "agence créative", "Bruxelles", "Brussels", "Belgique", "Belgium", "sqwr", "sqwr studio", "React", "Next.js", "dashboards", "studio familial", "social media"],
  authors: [{ name: "SQWR Studio" }],
  creator: "SQWR Studio",
  metadataBase: new URL('https://sqwr.be'),
  alternates: {
    canonical: 'https://sqwr.be',
  },
  openGraph: {
    title: "SQWR Studio — Agence créative Bruxelles | Branding & Web sur-mesure",
    description: "Studio créatif familial à Bruxelles. Identités visuelles, sites web sur-mesure (React/Next.js), stratégie social media. Qualité agence, prix accessible.",
    url: 'https://sqwr.be',
    siteName: 'SQWR Studio',
    locale: 'fr_BE',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "SQWR Studio — Agence créative Bruxelles",
    description: "Studio créatif familial à Bruxelles. Identités visuelles, sites web sur-mesure, stratégie social media.",
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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://sqwr.be/#organization',
      name: 'SQWR Studio',
      url: 'https://sqwr.be',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sqwr.be/Logo%20SQWR/sqwr-logo.png',
        width: 200,
        height: 60,
      },
      email: 'studio@sqwr.be',
      telephone: '+32493302752',
      foundingDate: '2024',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bruxelles',
        addressRegion: 'Bruxelles-Capitale',
        postalCode: '1000',
        addressCountry: 'BE',
      },
      founders: [
        {
          '@type': 'Person',
          name: 'Samuel Baudon',
          jobTitle: 'Directeur Stratégie',
        },
        {
          '@type': 'Person',
          name: 'Joakim Baudon',
          jobTitle: 'Directeur Créatif',
        },
      ],
      knowsAbout: ['Branding', 'Identité Visuelle', 'Web Design', 'React', 'Next.js', 'Direction Artistique'],
      areaServed: ['Bruxelles', 'Belgique'],
      sameAs: [
        'https://www.instagram.com/sqwr.studio/',
        'https://www.linkedin.com/company/sqwr-studio/',
      ],
    },
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://sqwr.be/#localbusiness',
      name: 'SQWR Studio',
      image: 'https://sqwr.be/Logo%20SQWR/sqwr-logo.png',
      url: 'https://sqwr.be',
      email: 'studio@sqwr.be',
      telephone: '+32493302752',
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bruxelles',
        addressRegion: 'Bruxelles-Capitale',
        postalCode: '1000',
        addressCountry: 'BE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 50.8503,
        longitude: 4.3517,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services créatifs SQWR Studio',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Identité visuelle & Branding',
              description: 'Conception complète de votre identité de marque : logo, charte graphique, guidelines.',
            },
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: 800,
              priceCurrency: 'EUR',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Site web React/Next.js sur-mesure',
              description: "Développement de sites web performants et modernes avec React et Next.js.",
            },
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: 1000,
              priceCurrency: 'EUR',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://sqwr.be/#website',
      url: 'https://sqwr.be',
      name: 'SQWR Studio',
      description: 'Agence créative bruxelloise — Branding & Web sur-mesure',
      publisher: { '@id': 'https://sqwr.be/#organization' },
      inLanguage: 'fr-BE',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          defer
          data-domain="sqwr.be"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen font-sans relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-foreground focus:text-background focus:px-4 focus:py-2 focus:text-sm focus:rounded"
        >
          Aller au contenu principal
        </a>
        <LanguageProvider>
          <DesktopOnlyProviders>
            <Header />
            <PixelWipeTransition />
            <main id="main-content" className="relative z-10">
              {children}
            </main>
            <Footer />
          </DesktopOnlyProviders>
          <MobileFloatingCTA />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
