import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Créative Design - Agence de Communication Visuelle & Design",
  description: "Agence créative spécialisée en communication visuelle, design graphique, création de logos, sites web, flyers et design réseaux sociaux.",
  keywords: ["design", "graphique", "communication visuelle", "logo", "site web", "flyers", "réseaux sociaux"],
  authors: [{ name: "Créative Design" }],
  openGraph: {
    title: "Créative Design - Agence de Communication Visuelle",
    description: "Agence créative spécialisée en communication visuelle et design graphique.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
