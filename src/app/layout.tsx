import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Editha - Dashboard redaktorů",
  description: "Profesionální dashboard pro redaktory s přehledem článků z redakčních zdrojů. Filtrování, klasifikace a správa obsahu v reálném čase.",
  keywords: ["dashboard", "redakce", "články", "zpravodajství", "editační systém", "content management"],
  authors: [{ name: "Editha Team" }],
  creator: "Editha",
  publisher: "Editha",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://editha.vercel.app",
    title: "Editha - Dashboard redaktorů",
    description: "Profesionální dashboard pro redaktory s přehledem článků z redakčních zdrojů",
    siteName: "Editha",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editha - Dashboard redaktorů",
    description: "Profesionální dashboard pro redaktory s přehledem článků z redakčních zdrojů",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#ffffff",
  colorScheme: "light",
  category: "news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Editha" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Editha" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#ef4444" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
