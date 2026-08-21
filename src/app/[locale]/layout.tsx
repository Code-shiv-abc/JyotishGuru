import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { WebMCPProvider } from "@/components/WebMCPProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import InstallAppButton from "../components/InstallAppButton";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jyotishguru.in"),
  title: {
    default: "JyotishGuru | Expert Vedic Astrologer in Ayodhya Dham",
    template: "%s | JyotishGuru",
  },
  description: "Consult Acharya Shri Ravindra Shukla Shastri, an expert Vedic Astrologer based in Ayodhya Dham, India. Services include Kundali Reading, Kundali Matching, and Horoscope Consultation.",
  keywords: ["Vedic Astrology", "Ayodhya Dham", "Acharya Shri Ravindra Shukla Shastri", "Kundali", "Horoscope", "Kundali Matching", "JyotishGuru"],
  alternates: {
    canonical: "https://jyotishguru.in",
  },
  openGraph: {
    title: "JyotishGuru | Expert Vedic Astrologer in Ayodhya Dham",
    description: "Expert Vedic Astrology consultation in Ayodhya Dham. Understand your karmic path with Acharya Shri Ravindra Shukla Shastri.",
    url: "https://jyotishguru.in",
    siteName: "JyotishGuru",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JyotishGuru | Expert Vedic Astrologer in Ayodhya Dham",
    description: "Consult Acharya Shri Ravindra Shukla Shastri for Kundali Reading, Kundali Matching, and Horoscope Consultation in Ayodhya Dham.",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "JyotishGuru",
    statusBarStyle: "default",
  },
};

export const viewport = {
  themeColor: "#1A1040",
};

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "hi")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://jyotishguru.in/#organization",
                  "name": "JyotishGuru",
                  "url": "https://jyotishguru.in",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Ayodhya Dham",
                    "addressRegion": "Uttar Pradesh",
                    "addressCountry": "IN",
                  },
                },
                {
                  "@type": "Person",
                  "@id": "https://jyotishguru.in/#person",
                  "name": "Acharya Shri Ravindra Shukla Shastri",
                  "jobTitle": "Vedic Astrologer",
                  "url": "https://jyotishguru.in",
                  "worksFor": {
                    "@id": "https://jyotishguru.in/#organization",
                  },
                },
                {
                  "@type": "Service",
                  "name": "Kundali Reading",
                  "provider": {
                    "@id": "https://jyotishguru.in/#organization",
                  },
                },
                {
                  "@type": "Service",
                  "name": "Kundali Matching",
                  "provider": {
                    "@id": "https://jyotishguru.in/#organization",
                  },
                },
                {
                  "@type": "Service",
                  "name": "Horoscope Consultation",
                  "provider": {
                    "@id": "https://jyotishguru.in/#organization",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${outfit.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        {/* Load WebMCP script using Next.js Script component */}
        <Script src="/webmcp.js" />
        {/* Initialize the WebMCP Provider to register tools */}
        <WebMCPProvider />
        <NextIntlClientProvider messages={messages}>
          <ServiceWorkerRegister />
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen-dynamic pt-20 flex flex-col">
            {children}
          </main>
          <Footer />
          <InstallAppButton />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
