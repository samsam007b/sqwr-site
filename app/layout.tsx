import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PixelMigrationIntro from "@/components/PixelMigrationIntro";
import CustomCursorTrail from "@/components/CustomCursorTrail";
import CursorManager from "@/components/CursorManager";
import LivingGrid from "@/components/LivingGrid";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

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
    default: "SQWR Studio — Agence créative Bruxelles | Branding & Web sur-mesure",
    template: "%s | SQWR Studio",
  },
  description: "Studio créatif familial à Bruxelles. Identités visuelles, sites web sur-mesure (React/Next.js), stratégie social media. Qualité agence, prix accessible. Depuis 2016.",
  keywords: ["design", "graphique", "communication visuelle", "logo", "site web", "branding", "identité visuelle", "UI/UX", "agence créative", "Bruxelles", "Brussels", "Belgique", "Belgium", "sqwr", "sqwr studio", "React", "Next.js", "dashboards", "studio familial", "social media"],
  authors: [{ name: "SQWR Studio" }],
  creator: "SQWR Studio",
  metadataBase: new URL('https://sqwr.be'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "SQWR Studio — Agence créative Bruxelles | Branding & Web sur-mesure",
    description: "Studio créatif familial à Bruxelles. Identités visuelles, sites web sur-mesure (React/Next.js), stratégie social media. Qualité agence, prix accessible. Depuis 2016.",
    url: 'https://sqwr.be',
    siteName: 'SQWR Studio',
    locale: 'fr_BE',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "SQWR Studio — Agence créative Bruxelles",
    description: "Studio créatif familial à Bruxelles. Identités visuelles, sites web sur-mesure, stratégie social media. Depuis 2016.",
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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans relative">
        <ThemeProvider>
          <LanguageProvider>
            <LivingGrid />
            <CursorManager />
            <CustomCursorTrail />
            <PixelMigrationIntro />
            <SmoothScroll>
              <Header />
              <main className="flex-grow relative z-10">
                {children}
              </main>
              <Footer />
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
