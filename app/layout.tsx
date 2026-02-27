import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DesktopOnlyProviders from "@/components/DesktopOnlyProviders";
import PixelWipeTransition from "@/components/PixelWipeTransition";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import { LanguageProvider } from "@/context/LanguageContext";

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
    canonical: '/',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head />
      <body className="min-h-screen font-sans relative">
        <LanguageProvider>
          <DesktopOnlyProviders>
            <Header />
            <PixelWipeTransition />
            <main className="relative z-10">
              {children}
            </main>
            <Footer />
          </DesktopOnlyProviders>
          <MobileFloatingCTA />
        </LanguageProvider>
      </body>
    </html>
  );
}
