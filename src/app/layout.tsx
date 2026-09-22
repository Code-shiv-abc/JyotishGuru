import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import Script from "next/script";
import "./globals.css";
import { WebMCPProvider } from "@/components/WebMCPProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import InstallAppButton from "./components/InstallAppButton";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JyotishGuru | Expert Vedic Astrologer in Ayodhya Dham",
    template: "%s | JyotishGuru",
  },
  description: "Consult Acharya Shri Pankaj Shukla, an expert Vedic Astrologer based in Ayodhya Dham, India. Services include Kundali Reading, Kundali Matching, and Horoscope Consultation.",
  keywords: ["Vedic Astrology", "Ayodhya Dham", "Acharya Shri Pankaj Shukla", "Kundali", "Horoscope", "Kundali Matching", "JyotishGuru"],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "JyotishGuru | Expert Vedic Astrologer in Ayodhya Dham",
    description: "Expert Vedic Astrology consultation in Ayodhya Dham. Understand your karmic path with Acharya Shri Pankaj Shukla.",
    url: SITE_URL,
    siteName: "JyotishGuru",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JyotishGuru | Expert Vedic Astrologer in Ayodhya Dham",
    description: "Consult Acharya Shri Pankaj Shukla for Kundali Reading, Kundali Matching, and Horoscope Consultation in Ayodhya Dham.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${outfit.variable} antialiased font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": `${SITE_URL}/#organization`,
                  "name": "JyotishGuru",
                  "url": SITE_URL,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Ayodhya Dham",
                    "addressRegion": "Uttar Pradesh",
                    "addressCountry": "IN",
                  },
                },
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  "name": "Acharya Shri Pankaj Shukla",
                  "jobTitle": "Vedic Astrologer",
                  "url": SITE_URL,
                  "worksFor": {
                    "@id": `${SITE_URL}/#organization`,
                  },
                },
                {
                  "@type": "Service",
                  "name": "Kundali Reading",
                  "provider": {
                    "@id": `${SITE_URL}/#organization`,
                  },
                },
                {
                  "@type": "Service",
                  "name": "Kundali Matching",
                  "provider": {
                    "@id": `${SITE_URL}/#organization`,
                  },
                },
                {
                  "@type": "Service",
                  "name": "Horoscope Consultation",
                  "provider": {
                    "@id": `${SITE_URL}/#organization`,
                  },
                },
              ],
            }),
          }}
        />
        {/* Load WebMCP script using Next.js Script component */}
        <Script src="/webmcp.js" strategy="beforeInteractive" />
        {/* Initialize the WebMCP Provider to register tools */}
        <WebMCPProvider />
        <ServiceWorkerRegister />
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen-dynamic pt-20 flex flex-col">
          {children}
        </main>
        <Footer />
        <InstallAppButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
